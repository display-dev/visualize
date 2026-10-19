import { createHash, randomUUID } from 'node:crypto';
import { constants as fsConstants } from 'node:fs';
import {
  access,
  lstat,
  open,
  realpath,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { deflateSync, inflateSync } from 'node:zlib';

export const IMAGE_ROUTES = Object.freeze([
  'codex-native',
  'antigravity-native',
  'codex-mcp',
  'codex-cli',
  'antigravity-cli',
  'openai-api',
  'gemini-api',
  'fake',
]);
export const SCRIPT_ROUTES = Object.freeze([
  'codex-cli',
  'antigravity-cli',
  'openai-api',
  'gemini-api',
  'fake',
]);
export const RECORDER_ROUTES = Object.freeze([
  'codex-native',
  'antigravity-native',
  'codex-mcp',
]);
export const BILLING_VALUES = Object.freeze(['host-managed', 'api-key', 'none', 'unknown']);
export const COMMON_SIZES = Object.freeze(['1024x1024', '1536x1024', '1024x1536']);
export const COMMON_QUALITIES = Object.freeze(['low', 'medium', 'high']);

export const LIMITS = Object.freeze({
  promptBytes: 32 * 1024,
  referenceCount: 4,
  referenceBytes: 10 * 1024 * 1024,
  totalReferenceBytes: 24 * 1024 * 1024,
  imageBytes: 32 * 1024 * 1024,
  pixels: 8_294_400,
  responseBytes: 48 * 1024 * 1024,
  requestBytes: 256 * 1024,
  processOutputBytes: 256 * 1024,
  processTimeoutMs: 180_000,
});

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const COLOR_CHANNELS = new Map([[0, 1], [2, 3], [3, 1], [4, 2], [6, 4]]);
const VALID_DEPTHS = new Map([[0, [1, 2, 4, 8, 16]], [2, [8, 16]], [3, [1, 2, 4, 8]], [4, [8, 16]], [6, [8, 16]]]);

export class ImageContractError extends Error {
  constructor(code, message, { ambiguous = false } = {}) {
    super(message);
    this.name = 'ImageContractError';
    this.code = code;
    this.ambiguous = ambiguous;
  }
}

function fail(code, message, options) {
  throw new ImageContractError(code, message, options);
}

function assertPlainObject(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('invalid-schema', `${label} must be an object`);
  return value;
}

function assertOnlyKeys(value, allowed, label) {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) fail('invalid-schema', `${label} contains unsupported field ${key}`);
  }
}

function boundedString(value, label, maxBytes = LIMITS.promptBytes, { nullable = false } = {}) {
  if (nullable && value === null) return null;
  if (typeof value !== 'string' || value.length === 0 || Buffer.byteLength(value, 'utf8') > maxBytes || value.includes('\0')) {
    fail('invalid-schema', `${label} must be non-empty bounded UTF-8 text`);
  }
  return value;
}

function boundedIdentifier(value, label) {
  if (value === null) return null;
  boundedString(value, label, 256);
  if (!/^[A-Za-z0-9][A-Za-z0-9._: ()-]{0,255}$/.test(value) || value.includes('/') || value.includes('\\')) fail('invalid-schema', `${label} is not a safe identifier`);
  return value;
}

function assertSerializedBound(value, maxBytes, label) {
  if (Buffer.byteLength(JSON.stringify(value), 'utf8') > maxBytes) fail('invalid-schema', `${label} exceeds the supported serialized byte boundary`);
  return value;
}

function isWithin(root, candidate) {
  const rel = relative(root, candidate);
  return rel === '' || (!rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel));
}

async function rejectSymlinkSegments(root, candidate, { allowMissingLeaf = false } = {}) {
  const rel = relative(root, candidate);
  if (!isWithin(root, candidate)) fail('path-outside-approved-root', 'path escapes approved root');
  const parts = rel === '' ? [] : rel.split(sep);
  let current = root;
  for (let index = 0; index < parts.length; index += 1) {
    current = resolve(current, parts[index]);
    try {
      const info = await lstat(current);
      if (info.isSymbolicLink()) fail('symlink-not-allowed', 'approved paths must not traverse symbolic links');
    } catch (error) {
      if (error?.code === 'ENOENT' && allowMissingLeaf && index === parts.length - 1) return;
      throw error;
    }
  }
}

export async function resolveApprovedRoot(input) {
  const root = await realpath(resolve(boundedString(input, 'approved root', 4096)));
  const info = await stat(root);
  if (!info.isDirectory()) fail('invalid-approved-root', 'approved root must be an existing directory');
  await access(root, fsConstants.R_OK | fsConstants.W_OK);
  return root;
}

export async function resolveContainedPath(root, input, { mustExist = false, regularFile = false } = {}) {
  let candidate = resolve(root, boundedString(input, 'path', 4096));
  if (mustExist) {
    if (isWithin(root, candidate)) await rejectSymlinkSegments(root, candidate);
    else if ((await lstat(candidate)).isSymbolicLink()) fail('symlink-not-allowed', 'approved paths must not traverse symbolic links');
    const resolved = await realpath(candidate);
    if (!isWithin(root, resolved)) fail('path-outside-approved-root', 'path resolves outside approved root');
    if (regularFile && !(await stat(resolved)).isFile()) fail('invalid-file', 'path must be a regular file');
    return resolved;
  }
  const parent = await realpath(dirname(candidate));
  candidate = resolve(parent, basename(candidate));
  await rejectSymlinkSegments(root, candidate, { allowMissingLeaf: true });
  if (!isWithin(root, parent)) fail('path-outside-approved-root', 'path parent resolves outside approved root');
  return candidate;
}

export async function readBoundedFile(path, maxBytes, label = 'file') {
  const handle = await open(path, 'r');
  try {
    const info = await handle.stat();
    if (!info.isFile() || info.size > maxBytes) fail('file-too-large', `${label} exceeds the supported byte boundary`);
    const buffer = Buffer.allocUnsafe(Math.max(1, Math.min(maxBytes + 1, info.size + 1)));
    let offset = 0;
    while (offset < buffer.length) {
      const { bytesRead } = await handle.read(buffer, offset, Math.min(64 * 1024, buffer.length - offset), offset);
      if (bytesRead === 0) break;
      offset += bytesRead;
    }
    if (offset > maxBytes || offset > info.size) fail('file-too-large', `${label} changed while crossing the supported byte boundary`);
    return Buffer.from(buffer.subarray(0, offset));
  } finally { await handle.close(); }
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const name = Buffer.from(type, 'ascii');
  const out = Buffer.allocUnsafe(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  name.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([name, data])), 8 + data.length);
  return out;
}

export function createDeterministicPng({ width = 64, height = 64, seed }) {
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width * height > LIMITS.pixels) fail('invalid-size', 'fake PNG dimensions are invalid');
  const digest = createHash('sha256').update(seed).digest();
  const scanlines = Buffer.allocUnsafe((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    scanlines[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const at = row + 1 + x * 4;
      scanlines[at] = (digest[0] + x) & 255;
      scanlines[at + 1] = (digest[1] + y) & 255;
      scanlines[at + 2] = digest[(x + y) % digest.length];
      scanlines[at + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(scanlines, { level: 9 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

export function validatePng(bytes, limits = LIMITS) {
  if (!Buffer.isBuffer(bytes)) fail('invalid-png', 'PNG input must be bytes');
  if (bytes.length < 45 || bytes.length > limits.imageBytes) fail('invalid-png', 'PNG byte length is outside the supported boundary');
  if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) fail('invalid-png', 'PNG signature is invalid');
  let offset = 8;
  let ihdr = null;
  let sawIdat = false;
  let endedIdat = false;
  let sawIend = false;
  let paletteEntries = null;
  let sawTrns = false;
  const compressed = [];
  const chunks = [];
  while (offset < bytes.length) {
    if (offset + 12 > bytes.length) fail('invalid-png', 'PNG chunk framing is truncated');
    const length = bytes.readUInt32BE(offset);
    if (length > limits.imageBytes || offset + 12 + length > bytes.length) fail('invalid-png', 'PNG chunk length is invalid');
    const typeBytes = bytes.subarray(offset + 4, offset + 8);
    const type = typeBytes.toString('ascii');
    if (!/^[A-Za-z]{4}$/.test(type)) fail('invalid-png', 'PNG chunk type is invalid');
    if ((typeBytes[2] & 0x20) !== 0) fail('invalid-png', 'PNG chunk type uses the reserved bit');
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    const expectedCrc = bytes.readUInt32BE(offset + 8 + length);
    if (crc32(Buffer.concat([typeBytes, data])) !== expectedCrc) fail('invalid-png', `PNG ${type} CRC is invalid`);
    if (!ihdr && type !== 'IHDR') fail('invalid-png', 'IHDR must be the first PNG chunk');
    if (sawIend) fail('invalid-png', 'PNG contains data after IEND');
    if (type === 'IHDR') {
      if (ihdr || length !== 13) fail('invalid-png', 'PNG must contain exactly one 13-byte IHDR');
      const width = data.readUInt32BE(0);
      const height = data.readUInt32BE(4);
      const bitDepth = data[8];
      const colorType = data[9];
      if (!width || !height || width > Number.MAX_SAFE_INTEGER / height || width * height > limits.pixels) fail('invalid-png', 'PNG dimensions exceed the supported boundary');
      if (!VALID_DEPTHS.get(colorType)?.includes(bitDepth)) fail('invalid-png', 'PNG bit-depth/color-type pair is unsupported');
      if (data[10] !== 0 || data[11] !== 0 || data[12] !== 0) fail('invalid-png', 'PNG compression, filter, or interlace method is unsupported');
      ihdr = { width, height, bitDepth, colorType };
    } else if (type === 'PLTE') {
      if (sawIdat || paletteEntries !== null || length === 0 || length % 3 !== 0 || length > 768 || [0, 4].includes(ihdr.colorType)) fail('invalid-png', 'PNG PLTE is invalid or out of order');
      paletteEntries = length / 3;
      if (ihdr.colorType === 3 && paletteEntries > 2 ** ihdr.bitDepth) fail('invalid-png', 'indexed PNG palette exceeds bit depth');
    } else if (type === 'tRNS') {
      if (sawIdat || sawTrns || [4, 6].includes(ihdr.colorType)) fail('invalid-png', 'PNG tRNS is invalid or out of order');
      if ((ihdr.colorType === 0 && length !== 2) || (ihdr.colorType === 2 && length !== 6) || (ihdr.colorType === 3 && (!paletteEntries || length === 0 || length > paletteEntries))) fail('invalid-png', 'PNG tRNS length is invalid');
      const maxSample = ihdr.bitDepth === 16 ? 65_535 : (1 << ihdr.bitDepth) - 1;
      if (ihdr.colorType === 0 && data.readUInt16BE(0) > maxSample) fail('invalid-png', 'PNG tRNS grayscale sample exceeds bit depth');
      if (ihdr.colorType === 2 && [0, 2, 4].some((position) => data.readUInt16BE(position) > maxSample)) fail('invalid-png', 'PNG tRNS truecolor sample exceeds bit depth');
      sawTrns = true;
    } else if (type === 'IDAT') {
      if (endedIdat || (ihdr.colorType === 3 && !paletteEntries)) fail('invalid-png', 'PNG IDAT is invalid or out of order');
      sawIdat = true;
      compressed.push(data);
    } else if (type === 'IEND') {
      if (!sawIdat || length !== 0) fail('invalid-png', 'PNG IEND is invalid');
      sawIend = true;
    } else {
      if (sawIdat) endedIdat = true;
      if ((typeBytes[0] & 0x20) === 0) fail('invalid-png', `unsupported critical PNG chunk ${type}`);
    }
    chunks.push(type);
    offset += 12 + length;
  }
  if (!ihdr || !sawIdat || !sawIend || offset !== bytes.length || chunks.at(-1) !== 'IEND') fail('invalid-png', 'PNG is incomplete or has a trailing payload');
  const channels = COLOR_CHANNELS.get(ihdr.colorType);
  const rowBytes = Math.ceil((ihdr.width * channels * ihdr.bitDepth) / 8);
  const expectedInflated = (rowBytes + 1) * ihdr.height;
  if (!Number.isSafeInteger(expectedInflated) || expectedInflated > limits.imageBytes * 8) fail('invalid-png', 'PNG decompressed size exceeds the supported boundary');
  let inflated;
  const compressedBytes = Buffer.concat(compressed);
  try {
    const result = inflateSync(compressedBytes, { maxOutputLength: expectedInflated, info: true });
    if (result.engine.bytesWritten !== compressedBytes.length) fail('invalid-png', 'PNG compressed stream contains a trailing payload');
    inflated = result.buffer;
  } catch {
    fail('invalid-png', 'PNG compressed image data is invalid');
  }
  if (inflated.length !== expectedInflated) fail('invalid-png', 'PNG scanline byte count is invalid');
  for (let row = 0; row < ihdr.height; row += 1) if (inflated[row * (rowBytes + 1)] > 4) fail('invalid-png', 'PNG scanline filter is invalid');
  const decoded = Buffer.allocUnsafe(rowBytes * ihdr.height);
  const bytesPerPixel = Math.max(1, Math.ceil((channels * ihdr.bitDepth) / 8));
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a); const pb = Math.abs(p - b); const pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < ihdr.height; y += 1) {
    const inputRow = y * (rowBytes + 1);
    const outputRow = y * rowBytes;
    const filter = inflated[inputRow];
    for (let x = 0; x < rowBytes; x += 1) {
      const raw = inflated[inputRow + 1 + x];
      const left = x >= bytesPerPixel ? decoded[outputRow + x - bytesPerPixel] : 0;
      const up = y > 0 ? decoded[outputRow - rowBytes + x] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel ? decoded[outputRow - rowBytes + x - bytesPerPixel] : 0;
      const prediction = filter === 0 ? 0 : filter === 1 ? left : filter === 2 ? up : filter === 3 ? Math.floor((left + up) / 2) : paeth(left, up, upperLeft);
      decoded[outputRow + x] = (raw + prediction) & 255;
    }
  }
  if (ihdr.colorType === 3) {
    const mask = (1 << ihdr.bitDepth) - 1;
    for (let y = 0; y < ihdr.height; y += 1) {
      const row = decoded.subarray(y * rowBytes, (y + 1) * rowBytes);
      for (let x = 0; x < ihdr.width; x += 1) {
        const bitOffset = x * ihdr.bitDepth;
        const shift = 8 - ihdr.bitDepth - (bitOffset % 8);
        const sample = (row[Math.floor(bitOffset / 8)] >>> shift) & mask;
        if (sample >= paletteEntries) fail('invalid-png', 'indexed PNG selects a missing palette entry');
      }
    }
  }
  return { ...ihdr, bytes: bytes.length, mimeType: 'image/png', chunks };
}

const JPEG_SOF_MARKERS = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);

export function validateJpeg(bytes, limits = LIMITS) {
  if (!Buffer.isBuffer(bytes)) fail('invalid-jpeg', 'JPEG input must be bytes');
  if (bytes.length < 14 || bytes.length > limits.imageBytes) fail('invalid-jpeg', 'JPEG byte length is outside the supported boundary');
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) fail('invalid-jpeg', 'JPEG SOI marker is invalid');
  let offset = 2;
  let frame = null;
  let sawScan = false;
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) fail('invalid-jpeg', 'JPEG marker framing is invalid');
    while (offset < bytes.length && bytes[offset] === 0xff) offset += 1;
    if (offset >= bytes.length) fail('invalid-jpeg', 'JPEG marker is truncated');
    const marker = bytes[offset++];
    if (marker === 0x00 || marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) fail('invalid-jpeg', 'JPEG marker is invalid outside scan data');
    if (marker === 0x01) continue;
    if (marker === 0xd9) {
      if (!frame || !sawScan || offset !== bytes.length) fail('invalid-jpeg', 'JPEG is incomplete or has a trailing payload');
      return { width: frame.width, height: frame.height, bytes: bytes.length, mimeType: 'image/jpeg' };
    }
    if (offset + 2 > bytes.length) fail('invalid-jpeg', 'JPEG segment length is truncated');
    const length = bytes.readUInt16BE(offset);
    if (length < 2 || offset + length > bytes.length) fail('invalid-jpeg', 'JPEG segment length is invalid');
    const dataOffset = offset + 2;
    const dataLength = length - 2;
    if (JPEG_SOF_MARKERS.has(marker)) {
      if (frame || dataLength < 6) fail('invalid-jpeg', 'JPEG must contain exactly one bounded frame');
      const precision = bytes[dataOffset];
      const height = bytes.readUInt16BE(dataOffset + 1);
      const width = bytes.readUInt16BE(dataOffset + 3);
      const components = bytes[dataOffset + 5];
      if (!precision || !components || dataLength !== 6 + components * 3) fail('invalid-jpeg', 'JPEG frame layout is invalid');
      if (!width || !height || width * height > limits.pixels) fail('invalid-jpeg', 'JPEG dimensions exceed the supported boundary');
      frame = { width, height };
    } else if ((marker >= 0xc0 && marker <= 0xcf) && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      fail('invalid-jpeg', 'JPEG frame type is unsupported');
    }
    offset += length;
    if (marker === 0xda) {
      if (!frame || dataLength < 6) fail('invalid-jpeg', 'JPEG scan header is invalid');
      const componentCount = bytes[dataOffset];
      if (!componentCount || dataLength !== 4 + componentCount * 2) fail('invalid-jpeg', 'JPEG scan layout is invalid');
      sawScan = true;
      let scanBytes = 0;
      while (offset < bytes.length) {
        if (bytes[offset] !== 0xff) { scanBytes += 1; offset += 1; continue; }
        const markerOffset = offset;
        while (offset < bytes.length && bytes[offset] === 0xff) offset += 1;
        if (offset >= bytes.length) fail('invalid-jpeg', 'JPEG scan data is truncated');
        const scanMarker = bytes[offset];
        if (scanMarker === 0x00) { scanBytes += 1; offset += 1; continue; }
        if (scanMarker >= 0xd0 && scanMarker <= 0xd7) {
          offset += 1;
          continue;
        }
        offset = markerOffset;
        break;
      }
      if (scanBytes === 0) fail('invalid-jpeg', 'JPEG scan contains no data');
    }
  }
  fail('invalid-jpeg', 'JPEG EOI marker is missing');
}

export function validateImage(bytes, limits = LIMITS) {
  if (!Buffer.isBuffer(bytes)) fail('invalid-image', 'image input must be bytes');
  if (bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) return validatePng(bytes, limits);
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return validateJpeg(bytes, limits);
  fail('invalid-image', 'image format is not supported');
}

export function outputMimeType(path) {
  const extension = extname(path).toLowerCase();
  if (extension === '.png') return 'image/png';
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg';
  fail('invalid-output-extension', 'output must use .png, .jpg, or .jpeg');
}

export function validateRequestObject(input) {
  const value = assertPlainObject(input, 'request');
  assertOnlyKeys(value, ['prompt', 'size', 'quality'], 'request');
  const prompt = boundedString(value.prompt, 'request.prompt');
  const size = value.size ?? null;
  const quality = value.quality ?? null;
  if (size !== null && !COMMON_SIZES.includes(size)) fail('unsupported-size', `size must be one of ${COMMON_SIZES.join(', ')}`);
  if (quality !== null && !COMMON_QUALITIES.includes(quality)) fail('unsupported-quality', `quality must be one of ${COMMON_QUALITIES.join(', ')}`);
  return assertSerializedBound({ prompt, size, quality }, LIMITS.requestBytes, 'request');
}

export async function buildRequest({ prompt, referencePaths = [], size = null, quality = null }) {
  const text = boundedString(prompt, 'prompt');
  if (referencePaths.length > LIMITS.referenceCount) fail('too-many-references', `at most ${LIMITS.referenceCount} references are supported`);
  let total = 0;
  const referenceFiles = [];
  for (const input of referencePaths) {
    const resolvedPath = await realpath(resolve(input));
    const info = await stat(resolvedPath);
    if (!info.isFile() || info.size > LIMITS.referenceBytes) fail('invalid-reference', 'reference must be a bounded regular PNG or JPEG file');
    const bytes = await readBoundedFile(resolvedPath, LIMITS.referenceBytes, 'reference image');
    const parsed = validateImage(bytes);
    total += bytes.length;
    if (total > LIMITS.totalReferenceBytes) fail('references-too-large', 'combined reference bytes exceed the supported boundary');
    referenceFiles.push({ path: resolvedPath, bytes, mimeType: parsed.mimeType });
  }
  return {
    request: validateRequestObject({ prompt: text, size, quality }),
    referenceFiles,
  };
}

async function pathExists(path) {
  try { await lstat(path); return true; } catch (error) { if (error?.code === 'ENOENT') return false; throw error; }
}

export async function reserveImageOutput({ approvedRoot, out, replace = false }) {
  const root = await resolveApprovedRoot(approvedRoot);
  if (typeof out !== 'string') fail('invalid-output-extension', 'output must use .png, .jpg, or .jpeg');
  outputMimeType(out);
  const outPath = await resolveContainedPath(root, out);
  await access(dirname(outPath), fsConstants.R_OK | fsConstants.W_OK);
  const lockPath = await resolveContainedPath(root, `${outPath}.visualize.lock`);
  let lock;
  try { lock = await open(lockPath, 'wx', 0o600); } catch (error) {
    if (error?.code === 'EEXIST') fail('output-locked', 'another image finalizer is using this output');
    throw error;
  }
  try {
    await lock.writeFile(`${JSON.stringify({ schemaVersion: 1, pid: process.pid, createdAt: new Date().toISOString() })}\n`);
  } catch (error) {
    await lock.close().catch(() => {});
    await rm(lockPath, { force: true }).catch(() => {});
    throw error;
  }
  let released = false;
  const release = async () => {
    if (released) return;
    released = true;
    await lock.close();
    await rm(lockPath, { force: true });
  };
  try {
    if ((await pathExists(outPath)) && !replace) fail('output-exists', 'output already exists; pass --replace to replace it');
    return { root, outPath, replace, release };
  } catch (error) { await release(); throw error; }
}

async function installImage({ imageTemp, out, replace }) {
  const existed = await pathExists(out);
  if (existed && !replace) fail('output-exists', 'output already exists; pass --replace to replace it');
  const backup = join(dirname(out), `.visualize-backup-${randomUUID()}${extname(out).toLowerCase()}`);
  let installed = false;
  const rollback = async () => {
    if (installed) await rm(out, { force: true });
    if (await pathExists(backup)) await rename(backup, out);
  };
  try {
    if (existed) await rename(out, backup);
    await rename(imageTemp, out);
    installed = true;
    return { rollback, commit: async () => { await rm(backup, { force: true }).catch(() => {}); } };
  } catch (error) {
    await rollback();
    throw error;
  }
}

export async function finalizeImage({ approvedRoot, source, out, route, provider = null, tool = null, model = null, billing, replace = false, reservation = null, afterInstall = null }) {
  if (!IMAGE_ROUTES.includes(route)) fail('invalid-route', 'route is unsupported');
  if (!BILLING_VALUES.includes(billing)) fail('invalid-billing', 'billing category is unsupported');
  if (provider !== null && !['openai', 'google'].includes(provider)) fail('invalid-schema', 'provider is not recognized');
  tool = boundedIdentifier(tool, 'tool');
  model = boundedIdentifier(model, 'model');
  const held = reservation ?? await reserveImageOutput({ approvedRoot, out, replace });
  const { root, outPath } = held;
  const imageTemp = `${outPath}.visualize-tmp-${randomUUID()}`;
  let transaction = null;
  try {
    const sourcePath = await resolveContainedPath(root, source, { mustExist: true, regularFile: true });
    if (sourcePath === outPath) fail('invalid-source', 'source must be staged separately from final output');
    const sourceBytes = await readBoundedFile(sourcePath, LIMITS.imageBytes, 'source image');
    const parsed = validateImage(sourceBytes);
    if (parsed.mimeType !== outputMimeType(outPath)) fail('output-format-mismatch', 'output extension does not match the detected image format');
    const actualPath = relative(root, outPath).replaceAll(sep, '/');
    const result = {
      route,
      provider,
      tool,
      model,
      billing,
      actual: { path: actualPath, mimeType: parsed.mimeType, width: parsed.width, height: parsed.height, bytes: parsed.bytes },
    };
    await writeFile(imageTemp, sourceBytes, { flag: 'wx', mode: 0o600 });
    const copied = await readBoundedFile(imageTemp, LIMITS.imageBytes, 'staged image');
    if (!copied.equals(sourceBytes)) fail('finalization-mismatch', 'staged and source image bytes differ');
    transaction = await installImage({ imageTemp, out: outPath, replace: held.replace });
    if (afterInstall) await afterInstall({ out: outPath });
    const finalBytes = await readBoundedFile(outPath, LIMITS.imageBytes, 'final image');
    if (!finalBytes.equals(sourceBytes)) fail('finalization-mismatch', 'final image bytes differ from source bytes');
    await transaction.commit();
    transaction = null;
    return { result, out: outPath };
  } catch (error) {
    if (transaction) await transaction.rollback();
    await rm(imageTemp, { force: true });
    throw error;
  } finally {
    // Lock cleanup is best-effort after the output transaction is authoritative.
    await held.release().catch(() => {});
  }
}

export function createImageRuntime(overrides = {}) {
  return {
    fetch: overrides.fetch ?? globalThis.fetch,
    spawn: overrides.spawn,
    writeFile: overrides.writeFile,
    remove: overrides.remove ?? rm,
    env: overrides.env ?? process.env,
    timeoutMs: overrides.timeoutMs ?? LIMITS.processTimeoutMs,
    terminationGraceMs: overrides.terminationGraceMs ?? 2_000,
  };
}
