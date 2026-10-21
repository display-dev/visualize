import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, readdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { resolveCatalog } from '../visualize/scripts/catalog.mjs';

async function cache(t) {
  const root = await mkdtemp(join(tmpdir(), 'visualize-catalog-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
const source = JSON.parse(await readFile(new URL('../catalog/source.json', import.meta.url), 'utf8'));
const body = url => `Pinned reference: ${new URL(url).pathname}\n`;
const success = async url => new Response(body(url));

test('bundled Clean works without a cache or network request', async () => {
  const value = await resolveCatalog('clean', { fetchImpl: () => assert.fail('unexpected network') });
  assert.match(await readFile(value.files['DESIGN.md'], 'utf8'), /Clean/);
  assert.match(value.directory, /design-systems[/\\]clean$/);
});

test('cold resolution fetches only the selected immutable package and cache reuses exact bytes', async t => {
  const root = await cache(t); const calls = [];
  const value = await resolveCatalog('editorial', { cacheRoot: root, fetchImpl: async (url, options) => {
    calls.push(url); assert.equal(options.redirect, 'error'); return success(url);
  } });
  assert.equal(calls.length, 3);
  assert(calls.every(url => url.startsWith(`https://raw.githubusercontent.com/display-dev/visualize/${source.revision}/${source.root}/editorial/`)));
  assert(!calls.some(url => url.includes('preview')));
  for (const [name, path] of Object.entries(value.files)) assert.equal(await readFile(path, 'utf8'), body(new URL(name, value.source).href));
  const warm = await resolveCatalog('editorial', { cacheRoot: root, fetchImpl: () => assert.fail('warm cache made a request') });
  assert.deepEqual(warm, value);
});

test('previews are fetched only when requested', async t => {
  const calls = [];
  const value = await resolveCatalog('editorial', { cacheRoot: await cache(t), previews: true, fetchImpl: async url => { calls.push(url); return success(url); } });
  assert.equal(calls.length, 5);
  assert(value.files['preview.html']); assert(value.files['preview-dark.html']);
});

test('a missing optional README does not make a reference unavailable', async t => {
  const options = { cacheRoot: await cache(t), fetchImpl: async url => url.endsWith('/README.md') ? new Response('', { status: 404 }) : success(url) };
  const value = await resolveCatalog('editorial', options);
  assert.deepEqual(Object.keys(value.files), ['DESIGN.md', 'tokens.css']);
  await resolveCatalog('editorial', { ...options, fetchImpl: () => assert.fail('missing README was not cached') });
});

test('HTTP failure leaves no partial package and does not silently return Clean', async t => {
  const root = await cache(t);
  await assert.rejects(resolveCatalog('editorial', { cacheRoot: root, fetchImpl: async url => url.endsWith('/tokens.css') ? new Response('', { status: 503 }) : success(url) }), /editorial.*unavailable.*HTTP 503/);
  const revision = (await readdir(root))[0];
  assert.deepEqual(await readdir(join(root, revision, 'references')), []);
});

test('request timeout is reported and staging is removed', async t => {
  const root = await cache(t);
  const fetchImpl = (_url, { signal }) => new Promise((_resolve, reject) => {
    const keepAlive = setTimeout(() => reject(new Error('request ignored abort')), 1000);
    signal.addEventListener('abort', () => { clearTimeout(keepAlive); reject(signal.reason); }, { once: true });
  });
  await assert.rejects(resolveCatalog('editorial', { cacheRoot: root, fetchImpl, timeoutMs: 10 }), /editorial.*unavailable/);
  const revision = (await readdir(root))[0];
  assert.deepEqual(await readdir(join(root, revision, 'references')), []);
});

test('unknown/traversal slugs fail before fetching or writing cache', async t => {
  const root = await cache(t);
  for (const slug of ['../clean', 'missing-reference', 'Editorial', '/etc']) {
    await assert.rejects(resolveCatalog(slug, { cacheRoot: root, fetchImpl: () => assert.fail('unexpected fetch') }), /Unknown catalog package/);
  }
  assert.deepEqual(await readdir(root), []);
});

test('cache corruption is reported rather than consumed or erased', async t => {
  const root = await cache(t);
  const value = await resolveCatalog('editorial', { cacheRoot: root, fetchImpl: success });
  await writeFile(value.files['tokens.css'], 'corrupt');
  await assert.rejects(resolveCatalog('editorial', { cacheRoot: root, fetchImpl: () => assert.fail('corrupt cache made a request') }), /Invalid catalog cache.*tokens.css/);
  assert.equal(await readFile(value.files['tokens.css'], 'utf8'), 'corrupt');
});

test('symlinked cache files are rejected without changing their targets', { skip: process.platform === 'win32' }, async t => {
  const root = await cache(t);
  const value = await resolveCatalog('editorial', { cacheRoot: root, fetchImpl: success });
  const outside = join(root, 'preserve.txt'); await writeFile(outside, 'preserve');
  await rm(value.files['tokens.css']); await symlink(outside, value.files['tokens.css']);
  await assert.rejects(resolveCatalog('editorial', { cacheRoot: root, fetchImpl: success }), /Invalid catalog cache/);
  assert.equal(await readFile(outside, 'utf8'), 'preserve');
});

test('concurrent resolutions publish complete packages', async t => {
  const options = { cacheRoot: await cache(t), fetchImpl: success };
  const values = await Promise.all([resolveCatalog('editorial', options), resolveCatalog('editorial', options)]);
  assert.deepEqual(values[0], values[1]);
  assert.deepEqual((await readdir(join(values[0].directory, '..'))).sort(), ['editorial']);
});

test('unpublished catalog additions do not change the installed snapshot', async t => {
  const { execFileSync } = await import('node:child_process');
  const { cp, mkdir } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const repo = fileURLToPath(new URL('../', import.meta.url));
  const root = await cache(t);
  await mkdir(join(root, 'dev-scripts'));
  await cp(join(repo, 'dev-scripts/catalog-index.mjs'), join(root, 'dev-scripts/catalog-index.mjs'));
  await cp(join(repo, 'catalog'), join(root, 'catalog'), { recursive: true, filter: path => !/\.(html|css)$/.test(path) });
  await cp(join(repo, 'visualize/design-systems'), join(root, 'visualize/design-systems'), { recursive: true });
  // git show reads the real published objects; all generator writes stay isolated.
  const gitDir = execFileSync('git', ['rev-parse', '--absolute-git-dir'], { cwd: repo, encoding: 'utf8' }).trim();
  await writeFile(join(root, '.git'), `gitdir: ${gitDir}\n`);
  const build = await readFile(join(repo, 'dev-scripts/build-previews.sh'), 'utf8');
  await writeFile(join(root, 'dev-scripts/build-previews.sh'), build.replace('DESIGN_SYSTEMS=(', 'DESIGN_SYSTEMS=(draft-reference '));
  await mkdir(join(root, 'catalog/design-systems/draft-reference'));
  await cp(join(repo, 'catalog/design-systems/clean/DESIGN.md'), join(root, 'catalog/design-systems/draft-reference/DESIGN.md'));
  const before = await readFile(join(root, 'visualize/design-systems/catalog-index.json'));
  execFileSync(process.execPath, ['dev-scripts/catalog-index.mjs'], { cwd: root });
  assert.deepEqual(await readFile(join(root, 'visualize/design-systems/catalog-index.json')), before);
  const check = execFileSync(process.execPath, ['dev-scripts/catalog-index.mjs', '--check'], { cwd: root, encoding: 'utf8' });
  assert.match(check, /104 authored/);
  const design = join(root, 'catalog/design-systems/draft-reference/DESIGN.md');
  await writeFile(design, (await readFile(design, 'utf8')).replace('selection:', 'invalid-selection:'));
  assert.throws(() => execFileSync(process.execPath, ['dev-scripts/catalog-index.mjs', '--check'], { cwd: root, stdio: 'pipe' }), /Command failed/);
});
