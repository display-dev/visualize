import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, realpath, rm, symlink, truncate, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';
import { runRecordImage } from './record-image.mjs';
import { JPEG_FIXTURE } from './image-test-fixtures.mjs';
import {
  ImageContractError,
  buildRequest,
  createDeterministicPng,
  finalizeImage,
  reserveImageOutput,
  resolveContainedPath,
  validateImage,
  validateJpeg,
  validatePng,
  validateRequestObject,
} from './image-contract.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'visualize-contract-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'assets'));
  return root;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type);
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBytes.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 8 + data.length);
  return out;
}

function withAncillary(png) {
  const ihdrEnd = 8 + 12 + 13;
  return Buffer.concat([png.subarray(0, ihdrEnd), chunk('caBX', Buffer.from('provider metadata')), png.subarray(ihdrEnd)]);
}

function minimalPng({ bitDepth, colorType, pixelBytes, palette = null, transparency = null }) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(1, 0); ihdr.writeUInt32BE(1, 4); ihdr[8] = bitDepth; ihdr[9] = colorType;
  return Buffer.concat([signature, chunk('IHDR', ihdr), ...(palette ? [chunk('PLTE', palette)] : []), ...(transparency ? [chunk('tRNS', transparency)] : []), chunk('IDAT', deflateSync(Buffer.concat([Buffer.from([0]), pixelBytes]))), chunk('IEND', Buffer.alloc(0))]);
}

function request(prompt = 'A precise test image') {
  return { prompt, size: null, quality: null };
}

function jpegHeaderMarkers(bytes) {
  const markers = [];
  let offset = 2;
  while (offset < bytes.length) {
    assert.equal(bytes[offset], 0xff);
    const markerOffset = offset;
    while (bytes[offset] === 0xff) offset += 1;
    const marker = bytes[offset++];
    markers.push({ marker, offset: markerOffset });
    if (marker === 0xda || marker === 0xd9) break;
    const length = bytes.readUInt16BE(offset);
    offset += length;
  }
  return markers;
}

test('strict PNG validation accepts the supported subset and reports decoded facts', () => {
  const bytes = createDeterministicPng({ width: 37, height: 19, seed: 'seed' });
  const parsed = validatePng(bytes);
  assert.deepEqual({ width: parsed.width, height: parsed.height, bytes: parsed.bytes, mimeType: parsed.mimeType }, { width: 37, height: 19, bytes: bytes.length, mimeType: 'image/png' });
});

test('strict PNG validation rejects independent framing and decoding failures', () => {
  const valid = createDeterministicPng({ width: 4, height: 3, seed: 'corruptions' });
  const corruptions = [];
  const signature = Buffer.from(valid); signature[0] = 0; corruptions.push(signature);
  const crc = Buffer.from(valid); crc[29] ^= 1; corruptions.push(crc);
  corruptions.push(Buffer.concat([valid, Buffer.from('hidden')]));
  const interlaced = Buffer.from(valid); interlaced[28] = 1; interlaced.writeUInt32BE(crc32(interlaced.subarray(12, 29)), 29); corruptions.push(interlaced);
  const badPair = Buffer.from(valid); badPair[24] = 1; badPair.writeUInt32BE(crc32(badPair.subarray(12, 29)), 29); corruptions.push(badPair);
  for (const bytes of corruptions) assert.throws(() => validatePng(bytes), ImageContractError);
});

test('strict PNG validation rejects invalid scanline filters and trailing compressed data', () => {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(1, 0); ihdr.writeUInt32BE(1, 4); ihdr[8] = 8; ihdr[9] = 6;
  const badFilter = Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(Buffer.from([5, 0, 0, 0, 255]))), chunk('IEND', Buffer.alloc(0))]);
  assert.throws(() => validatePng(badFilter), /filter/);
  const stream = deflateSync(Buffer.from([0, 0, 0, 0, 255]));
  const trailing = Buffer.concat([signature, chunk('IHDR', ihdr), chunk('IDAT', Buffer.concat([stream, Buffer.from('hidden-compressed-payload')])), chunk('IEND', Buffer.alloc(0))]);
  assert.throws(() => validatePng(trailing), ImageContractError);
});

test('strict PNG validation accepts every supported color-type and bit-depth pair', () => {
  const cases = [
    ...[1, 2, 4, 8, 16].map((bitDepth) => ({ bitDepth, colorType: 0, pixelBytes: Buffer.alloc(bitDepth === 16 ? 2 : 1) })),
    ...[8, 16].map((bitDepth) => ({ bitDepth, colorType: 2, pixelBytes: Buffer.alloc(bitDepth === 16 ? 6 : 3) })),
    ...[1, 2, 4, 8].map((bitDepth) => ({ bitDepth, colorType: 3, pixelBytes: Buffer.alloc(1), palette: Buffer.from([0, 0, 0]) })),
    ...[8, 16].map((bitDepth) => ({ bitDepth, colorType: 4, pixelBytes: Buffer.alloc(bitDepth === 16 ? 4 : 2) })),
    ...[8, 16].map((bitDepth) => ({ bitDepth, colorType: 6, pixelBytes: Buffer.alloc(bitDepth === 16 ? 8 : 4) })),
  ];
  for (const entry of cases) assert.doesNotThrow(() => validatePng(minimalPng(entry)), `${entry.colorType}/${entry.bitDepth}`);
});

test('strict PNG validation enforces palette samples, chunk ordering, dimensions, and decompression limits', () => {
  const valid = createDeterministicPng({ width: 1, height: 1, seed: 'ordering' });
  const signature = valid.subarray(0, 8); const ihdr = valid.subarray(8, 33); const idat = valid.subarray(33, valid.length - 12); const iend = valid.subarray(valid.length - 12);
  assert.throws(() => validatePng(Buffer.concat([signature, idat, ihdr, iend])), /IHDR/);
  const zero = Buffer.from(valid); zero.writeUInt32BE(0, 16); zero.writeUInt32BE(crc32(zero.subarray(12, 29)), 29); assert.throws(() => validatePng(zero), /dimensions/);
  assert.throws(() => validatePng(minimalPng({ bitDepth: 1, colorType: 0, pixelBytes: Buffer.alloc(1), transparency: Buffer.from([0, 2]) })), /sample exceeds/);
  const indexed = minimalPng({ bitDepth: 1, colorType: 3, pixelBytes: Buffer.from([0b10000000]), palette: Buffer.from([0, 0, 0]) });
  assert.throws(() => validatePng(indexed), /palette/);
  assert.throws(() => validatePng(createDeterministicPng({ width: 2, height: 2, seed: 'limit' }), { imageBytes: 1024, pixels: 3 }), /dimensions/);
});

test('JPEG validation reports format facts and rejects malformed framing', () => {
  assert.deepEqual(validateJpeg(JPEG_FIXTURE), { width: 8, height: 8, bytes: JPEG_FIXTURE.length, mimeType: 'image/jpeg' });
  assert.equal(validateImage(JPEG_FIXTURE).mimeType, 'image/jpeg');
  assert.throws(() => validateJpeg(Buffer.concat([JPEG_FIXTURE, Buffer.from('trailing')])), /trailing/);
  const truncated = JPEG_FIXTURE.subarray(0, -2);
  assert.throws(() => validateJpeg(truncated), /EOI|truncated/);
  const duplicateSoi = Buffer.from(JPEG_FIXTURE);
  const sof = duplicateSoi.indexOf(Buffer.from([0xff, 0xc0]));
  duplicateSoi[sof + 1] = 0xd8;
  assert.throws(() => validateJpeg(duplicateSoi), /marker/);
  assert.throws(() => validateImage(Buffer.from('not an image')), /format/);
});

test('JPEG structural validation bounds framing while accepting progressive and multi-scan forms', () => {
  const markers = jpegHeaderMarkers(JPEG_FIXTURE);
  const sofOffset = markers.find(({ marker }) => marker === 0xc0).offset;
  const sosOffset = markers.find(({ marker }) => marker === 0xda).offset;

  const scanLength = JPEG_FIXTURE.readUInt16BE(sosOffset + 2);
  const scanDataOffset = sosOffset + 2 + scanLength;
  const noEntropy = Buffer.concat([JPEG_FIXTURE.subarray(0, sosOffset + 2 + scanLength), Buffer.from([0xff, 0xd9])]);
  assert.throws(() => validateJpeg(noEntropy), /no data/);
  const structurallyBoundedEntropy = Buffer.concat([JPEG_FIXTURE.subarray(0, scanDataOffset), Buffer.from([0x00, 0xff, 0xd9])]);
  assert.doesNotThrow(() => validateJpeg(structurallyBoundedEntropy));

  const progressive = Buffer.from(structurallyBoundedEntropy);
  progressive[sofOffset + 1] = 0xc2;
  assert.doesNotThrow(() => validateJpeg(progressive));

  const sofLength = JPEG_FIXTURE.readUInt16BE(sofOffset + 2);
  const duplicateFrame = Buffer.concat([JPEG_FIXTURE.subarray(0, sosOffset), JPEG_FIXTURE.subarray(sofOffset, sofOffset + 2 + sofLength), JPEG_FIXTURE.subarray(sosOffset)]);
  assert.throws(() => validateJpeg(duplicateFrame), /exactly one bounded frame/);

  const scanHeader = JPEG_FIXTURE.subarray(sosOffset, scanDataOffset);
  const multiScan = Buffer.concat([JPEG_FIXTURE.subarray(0, scanDataOffset), Buffer.from([0x00]), scanHeader, Buffer.from([0x00, 0xff, 0xd9])]);
  assert.doesNotThrow(() => validateJpeg(multiScan));
});

test('request validation bounds operational adapter input and rejects unknown fields', () => {
  const valid = request();
  assert.deepEqual(validateRequestObject(valid), valid);
  assert.throws(() => validateRequestObject({ ...valid, prompt: { text: valid.prompt } }), /prompt/);
  assert.throws(() => validateRequestObject({ ...valid, extra: true }), /unsupported field/);
  assert.throws(() => validateRequestObject({ ...valid, size: 'auto' }), /size/);
});

test('buildRequest validates internal and approved external reference files without copying path metadata into adapter input', async (t) => {
  const root = await fixture(t);
  const inside = join(root, 'assets', 'inside.png');
  const externalRoot = await mkdtemp(join(tmpdir(), 'visualize-external-test-'));
  t.after(() => rm(externalRoot, { recursive: true, force: true }));
  const outside = join(externalRoot, 'outside.jpg');
  const bytes = createDeterministicPng({ seed: 'ref' });
  await writeFile(inside, bytes); await writeFile(outside, JPEG_FIXTURE);
  const built = await buildRequest({ prompt: 'Use these references', referencePaths: [inside, outside] });
  assert.deepEqual(built.request, { prompt: 'Use these references', size: null, quality: null });
  assert.deepEqual(built.referenceFiles.map((reference) => reference.path), [await realpath(inside), await realpath(outside)]);
  assert.deepEqual(built.referenceFiles.map((reference) => reference.mimeType), ['image/png', 'image/jpeg']);
  assert.ok(built.referenceFiles[0].bytes.equals(bytes));
  assert.ok(built.referenceFiles[1].bytes.equals(JPEG_FIXTURE));
});

test('contained output paths reject traversal and symlink segments', async (t) => {
  const root = await fixture(t);
  await symlink(tmpdir(), join(root, 'link'));
  await assert.rejects(() => resolveContainedPath(root, '../escape.png'), /escapes/);
  await assert.rejects(() => resolveContainedPath(root, 'link/escape.png'), /symbolic|escapes/);
});

test('finalization preserves provider bytes, returns diagnostics, and writes only the requested output', async (t) => {
  const root = await fixture(t);
  const source = join(root, 'assets', 'source.png');
  const bytes = withAncillary(createDeterministicPng({ seed: 'ancillary' }));
  await writeFile(source, bytes);
  const finalized = await finalizeImage({ approvedRoot: root, source, out: 'assets/result.png', route: 'codex-native', provider: 'openai', tool: 'image_gen', billing: 'host-managed' });
  assert.deepEqual(await readFile(finalized.out), bytes);
  assert.deepEqual(finalized.result, { route: 'codex-native', provider: 'openai', tool: 'image_gen', model: null, billing: 'host-managed', actual: { path: 'assets/result.png', mimeType: 'image/png', width: 64, height: 64, bytes: bytes.length } });
  assert.deepEqual((await readdir(join(root, 'assets'))).sort(), ['result.png', 'source.png']);
  assert.ok(validatePng(await readFile(finalized.out)).chunks.includes('caBX'));
});

test('output reservation enforces containment, extension, and concurrent no-clobber', async (t) => {
  const root = await fixture(t);
  const jpeg = await reserveImageOutput({ approvedRoot: root, out: 'assets/result.jpg' });
  await jpeg.release();
  await assert.rejects(() => reserveImageOutput({ approvedRoot: root, out: 'assets/result.gif' }), /\.png, \.jpg, or \.jpeg/);
  await assert.rejects(() => reserveImageOutput({ approvedRoot: root, out: '../result.png' }), /escapes/);
  const first = await reserveImageOutput({ approvedRoot: root, out: 'assets/result.png' });
  const lock = JSON.parse(await readFile(join(root, 'assets', 'result.png.visualize.lock'), 'utf8'));
  assert.equal(lock.pid, process.pid);
  await assert.rejects(() => reserveImageOutput({ approvedRoot: root, out: 'assets/result.png' }), /another image finalizer/);
  await first.release();
});

test('JPEG finalization preserves bytes and requires a matching extension', async (t) => {
  const root = await fixture(t);
  const source = join(root, 'assets', 'source.jpg');
  await writeFile(source, JPEG_FIXTURE);
  const finalized = await finalizeImage({ approvedRoot: root, source, out: 'assets/result.jpeg', route: 'codex-native', provider: 'google', billing: 'host-managed' });
  assert.deepEqual(await readFile(finalized.out), JPEG_FIXTURE);
  assert.deepEqual(finalized.result.actual, { path: 'assets/result.jpeg', mimeType: 'image/jpeg', width: 8, height: 8, bytes: JPEG_FIXTURE.length });
  await assert.rejects(() => finalizeImage({ approvedRoot: root, source, out: 'assets/mismatch.png', route: 'codex-native', billing: 'host-managed' }), /extension/);
});

test('invalid replacement preserves the old image and source limits apply before allocation', async (t) => {
  const root = await fixture(t);
  const source = join(root, 'assets', 'source.png');
  const out = join(root, 'assets', 'result.png');
  const old = createDeterministicPng({ seed: 'old-image' });
  await writeFile(out, old); await writeFile(source, Buffer.from('not image'));
  await assert.rejects(() => finalizeImage({ approvedRoot: root, source, out, route: 'fake', billing: 'none', replace: true }), /format/);
  assert.deepEqual(await readFile(out), old);
  await truncate(source, 33 * 1024 * 1024);
  await assert.rejects(() => finalizeImage({ approvedRoot: root, source, out: 'assets/large.png', route: 'fake', billing: 'none' }), /byte boundary/);
});

test('post-install corruption rolls back the prior image', async (t) => {
  const root = await fixture(t);
  const source = join(root, 'assets', 'source.png');
  const out = join(root, 'assets', 'result.png');
  const old = createDeterministicPng({ seed: 'rollback-old' });
  await writeFile(source, createDeterministicPng({ seed: 'rollback-next' })); await writeFile(out, old);
  await assert.rejects(() => finalizeImage({ approvedRoot: root, source, out, route: 'fake', billing: 'none', replace: true, afterInstall: async ({ out: installed }) => writeFile(installed, 'corrupt') }), /final image/);
  assert.deepEqual(await readFile(out), old);
});

test('record-image validates native and MCP files with operational inputs only', async (t) => {
  const root = await fixture(t);
  const png = createDeterministicPng({ seed: 'record' });
  await writeFile(join(root, 'assets', 'source.png'), png);
  const native = await runRecordImage({ approved_root: root, source: 'assets/source.png', out: 'assets/native.png', route: 'codex-native', tool: 'image_gen', billing: 'host-managed' });
  assert.deepEqual(native.result.actual, { path: 'assets/native.png', mimeType: 'image/png', width: 64, height: 64, bytes: png.length });
  const mcp = await runRecordImage({ approved_root: root, source: 'assets/source.png', out: 'assets/mcp.png', route: 'codex-mcp', billing: 'host-managed' });
  assert.equal(mcp.result.route, 'codex-mcp');
  await writeFile(join(root, 'assets', 'source.jpg'), JPEG_FIXTURE);
  const jpeg = await runRecordImage({ approved_root: root, source: 'assets/source.jpg', out: 'assets/mcp.jpg', route: 'codex-mcp', billing: 'host-managed' });
  assert.equal(jpeg.result.actual.mimeType, 'image/jpeg');
  await writeFile(join(root, 'assets', 'invalid.png'), Buffer.from('not png'));
  await assert.rejects(
    () => runRecordImage({ approved_root: root, source: 'assets/invalid.png', out: 'assets/invalid-output.png', route: 'codex-mcp', billing: 'host-managed' }),
    (error) => error.code === 'invalid-image' && error.ambiguous,
  );
  await assert.rejects(
    () => runRecordImage({ approved_root: root, source: 'assets/missing.png', out: 'assets/missing-output.png', route: 'codex-mcp', billing: 'host-managed' }),
    (error) => error.code === 'post-dispatch-failure' && error.ambiguous,
  );
  await writeFile(join(root, 'assets', 'occupied.png'), png);
  await assert.rejects(
    () => runRecordImage({ approved_root: root, source: 'assets/source.png', out: 'assets/occupied.png', route: 'codex-mcp', billing: 'host-managed' }),
    (error) => error.code === 'output-exists' && error.ambiguous,
  );
  await assert.rejects(
    () => runRecordImage({ approved_root: root, source: 'assets/source.png', out: 'assets/unsupported.png', route: 'codex-native', unexpected: 'value' }),
    (error) => error.code === 'invalid-arguments' && !error.ambiguous,
  );
});

test('record-image CLI keeps its JSON envelope and runs through a symlink', async (t) => {
  const root = await fixture(t);
  const script = fileURLToPath(new URL('record-image.mjs', import.meta.url));
  const invalid = spawnSync(process.execPath, [script, '--json'], { encoding: 'utf8' });
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stderr, '');
  assert.equal(JSON.parse(invalid.stdout).error.code, 'invalid-arguments');
  assert.equal(JSON.parse(invalid.stdout).error.ambiguous, false);
  const oversized = spawnSync(process.execPath, [script, `--${'x'.repeat(100_000)}`], { encoding: 'utf8' });
  assert.equal(oversized.status, 1);
  assert.ok(oversized.stdout.length < 512);

  await writeFile(join(root, 'assets', 'source.png'), createDeterministicPng({ seed: 'record-symlink' }));
  const linked = join(root, 'record-image-link.mjs');
  await symlink(script, linked);
  const recorded = spawnSync(process.execPath, [linked, '--source', 'assets/source.png', '--out', 'assets/recorded.png', '--approved-root', root, '--route', 'codex-mcp'], { encoding: 'utf8' });
  assert.equal(recorded.status, 0, recorded.stderr);
  assert.equal(JSON.parse(recorded.stdout).ok, true);
  await writeFile(join(root, 'assets', 'invalid.png'), Buffer.from('not png'));
  const rejected = spawnSync(process.execPath, [linked, '--source', 'assets/invalid.png', '--out', 'assets/rejected.png', '--approved-root', root, '--route', 'codex-mcp'], { encoding: 'utf8' });
  assert.equal(rejected.status, 1);
  assert.equal(JSON.parse(rejected.stdout).error.code, 'invalid-image');
  assert.equal(JSON.parse(rejected.stdout).error.ambiguous, true);
});

test('verified success survives best-effort lock cleanup failure', async (t) => {
  const root = await fixture(t);
  const source = join(root, 'assets', 'source.png');
  const bytes = createDeterministicPng({ seed: 'release-failure' });
  await writeFile(source, bytes);
  const held = await reserveImageOutput({ approvedRoot: root, out: 'assets/result.png' });
  const release = held.release;
  held.release = async () => { await release(); throw new Error('lock cleanup failed'); };
  const finalized = await finalizeImage({ approvedRoot: root, source, out: 'assets/result.png', route: 'fake', billing: 'none', reservation: held });
  assert.equal(finalized.result.route, 'fake');
  assert.deepEqual(await readFile(finalized.out), bytes);
});

test('diagnostic identifiers are bounded and path-free', async (t) => {
  const root = await fixture(t);
  const source = join(root, 'assets', 'source.png'); await writeFile(source, createDeterministicPng({ seed: 'identifiers' }));
  await assert.rejects(() => finalizeImage({ approvedRoot: root, source, out: 'assets/provider.png', route: 'codex-native', provider: 'unknown', billing: 'unknown' }), /provider/);
  await assert.rejects(() => finalizeImage({ approvedRoot: root, source, out: 'assets/model.png', route: 'codex-native', model: '/Users/alice/model', billing: 'unknown' }), /safe identifier/);
});
