#!/usr/bin/env node
// Resolve one reference package from the bundled fallback or a pinned public snapshot.
import { readFile, writeFile, mkdir, mkdtemp, rename, rm, lstat, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(await readFile(join(skillRoot, 'design-systems', 'catalog-source.json'), 'utf8'));
const index = JSON.parse(await readFile(join(skillRoot, 'design-systems', 'catalog-index.json'), 'utf8'));
const referenceFiles = ['README.md', 'DESIGN.md', 'tokens.css'];
const previewFiles = ['preview.html', 'preview-dark.html'];
const digest = bytes => createHash('sha256').update(bytes).digest('hex');

async function stat(path) {
  try { return await lstat(path); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function directory(path) {
  await mkdir(path).catch(error => { if (error.code !== 'EEXIST') throw error; });
  const info = await lstat(path);
  if (!info.isDirectory() || info.isSymbolicLink()) throw new Error(`Catalog cache directory is not a regular directory: ${path}`);
}

function result(slug, path, names, origin) {
  return {
    slug, revision: source.revision, directory: path, source: origin,
    files: Object.fromEntries(names.map(name => [name, join(path, name)])),
  };
}

async function cached(path, names, origin) {
  const info = await stat(path);
  if (!info) return null;
  try {
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('not a regular directory');
    const manifestPath = join(path, '.catalog.json');
    const manifestInfo = await lstat(manifestPath);
    if (!manifestInfo.isFile() || manifestInfo.isSymbolicLink()) throw new Error('invalid manifest');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    if (manifest.source !== origin || !manifest.files || typeof manifest.files !== 'object') throw new Error('wrong source');
    const present = Object.keys(manifest.files);
    if (present.some(name => !names.includes(name)) || names.some(name => name !== 'README.md' && !present.includes(name))) throw new Error('incomplete package');
    for (const name of present) {
      const file = join(path, name);
      const entry = await lstat(file);
      if (!entry.isFile() || entry.isSymbolicLink() || digest(await readFile(file)) !== manifest.files[name]) throw new Error(`invalid ${name}`);
    }
    return present;
  } catch (error) {
    throw new Error(`Invalid catalog cache at ${path}: ${error.message}. Remove that cache directory and retry.`, { cause: error });
  }
}

async function download(url, fetchImpl, signal, optional) {
  const response = await fetchImpl(url, { signal, redirect: 'error' });
  if (optional && response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const chunks = []; let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > 4 * 1024 * 1024) {
      await response.body.cancel?.().catch(() => {});
      throw new Error(`Catalog file exceeds 4 MiB: ${url}`);
    }
    chunks.push(chunk);
  }
  const bytes = Buffer.concat(chunks);
  if (!bytes.length) throw new Error(`Empty catalog file: ${url}`);
  new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  return bytes;
}

export async function resolveCatalog(slug, {
  previews = false,
  cacheRoot = process.env.VISUALIZE_CATALOG_CACHE_DIR || join(homedir(), '.cache', 'visualize-skill', 'catalog'),
  fetchImpl = globalThis.fetch,
  timeoutMs = 30000,
} = {}) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !index.systems.some(system => system.slug === slug)) throw new Error(`Unknown catalog package: ${slug}`);
  if (!/^[a-f0-9]{40}$/.test(source.revision) || !/^(visualize|catalog)\/design-systems$/.test(source.root)) throw new Error('Catalog source must name an immutable published revision and supported path');
  const origin = `https://raw.githubusercontent.com/display-dev/visualize/${source.revision}/${source.root}/${slug}/`;
  if (slug === 'clean' && !previews) {
    const path = join(skillRoot, 'design-systems', 'clean');
    for (const name of referenceFiles) await readFile(join(path, name));
    return result(slug, path, referenceFiles, origin);
  }
  const names = previews ? [...referenceFiles, ...previewFiles] : referenceFiles;
  await mkdir(cacheRoot, { recursive: true });
  const base = await realpath(cacheRoot);
  const revision = join(base, source.revision); await directory(revision);
  const variant = join(revision, previews ? 'previews' : 'references'); await directory(variant);
  const target = join(variant, slug);
  const existing = await cached(target, names, origin);
  if (existing) return result(slug, target, existing, origin);
  const stage = await mkdtemp(join(variant, `.${slug}-`));
  try {
    const signal = AbortSignal.timeout(timeoutMs);
    const hashes = {};
    for (const name of names) {
      const bytes = await download(new URL(name, origin).href, fetchImpl, signal, name === 'README.md');
      if (bytes === null) continue;
      await writeFile(join(stage, name), bytes, { flag: 'wx' });
      hashes[name] = digest(bytes);
    }
    await writeFile(join(stage, '.catalog.json'), JSON.stringify({ source: origin, files: hashes }) + '\n', { flag: 'wx' });
    try { await rename(stage, target); } catch (error) {
      // Another resolver can finish the same immutable package first.
      if (!['EEXIST', 'ENOTEMPTY'].includes(error.code)) throw error;
    }
    const present = await cached(target, names, origin);
    return result(slug, target, present, origin);
  } catch (error) {
    throw new Error(`Catalog package ${slug} at ${source.revision} is unavailable: ${error.message}`, { cause: error });
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

// Installers may expose the skill through a symlink; compare resolved paths.
const invokedPath = process.argv[1] ? await realpath(process.argv[1]).catch(() => null) : null;
if (invokedPath && await realpath(fileURLToPath(import.meta.url)) === invokedPath) {
  const [slug, ...flags] = process.argv.slice(2);
  if (!slug || flags.some(flag => flag !== '--previews')) {
    console.error('usage: node scripts/catalog.mjs <slug> [--previews]'); process.exitCode = 2;
  } else {
    try { console.log(JSON.stringify(await resolveCatalog(slug, { previews: flags.includes('--previews') }), null, 2)); }
    catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
