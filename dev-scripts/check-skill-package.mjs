#!/usr/bin/env node
// Check the single installable package, retaining the former transformer's
// frontmatter / command checks and exercising helpers outside the repository.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { cpSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const skill = join(root, 'skills', 'visualize');

function* files(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'temp'].includes(entry.name)) continue;
    const file = join(directory, entry.name);
    if (entry.isDirectory()) yield* files(file);
    else if (entry.isFile()) yield file;
  }
}

const EXPECTED_FRONTMATTER_FIELDS = [
  'name',
  'version',
  'license',
  'user-invocable',
  'argument-hint',
  'description',
];

function extractFrontmatterFieldNames(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    throw new Error('SKILL.md is missing YAML frontmatter');
  }
  const fields = [];
  for (const line of match[1].split(/\r?\n/)) {
    const fieldMatch = line.match(/^([a-zA-Z][a-zA-Z0-9_-]*):/);
    if (fieldMatch) {
      fields.push(fieldMatch[1]);
    }
  }
  return fields;
}

// Asserts the resolved SKILL.md frontmatter has the exact field set
// EXPECTED_FRONTMATTER_FIELDS — no missing, no extras.
function assertExpectedFrontmatterFields(content, label) {
  const actual = new Set(extractFrontmatterFieldNames(content));
  const expected = new Set(EXPECTED_FRONTMATTER_FIELDS);

  const missing = [...expected].filter((f) => !actual.has(f));
  const extras = [...actual].filter((f) => !expected.has(f));

  if (missing.length || extras.length) {
    const parts = [];
    if (missing.length) parts.push(`missing: ${missing.join(', ')}`);
    if (extras.length) parts.push(`extras: ${extras.join(', ')}`);
    throw new Error(`${label} frontmatter field-set drift — ${parts.join('; ')}`);
  }
}

// Asserts the argument-hint frontmatter field on canonical SKILL.md lists
// the same verb set as the Commands table in the body. Catches the case
// where someone adds a verb to the table but forgets to update the hint
// (or vice versa).
function assertArgumentHintFresh(canonicalContent) {
  const fmMatch = canonicalContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!fmMatch) {
    throw new Error('Canonical SKILL.md is missing YAML frontmatter');
  }
  const hintMatch = fmMatch[1].match(/^argument-hint:\s*"?\[([^\]]+)\]/m);
  if (!hintMatch) {
    throw new Error('Canonical SKILL.md is missing argument-hint frontmatter field (or shape mismatch)');
  }
  const hintVerbs = hintMatch[1].split('|').map((s) => s.trim()).filter(Boolean);

  // Commands table rows in the body have the verb in backticks in column 2.
  // Scope the scan to the section starting at "## Commands" so other tables
  // in the doc don't pollute the verb set.
  const commandsSectionMatch = canonicalContent.split(/^## Commands\b/m)[1];
  if (!commandsSectionMatch) {
    throw new Error('Canonical SKILL.md is missing "## Commands" section');
  }
  // Stop at the next H2 so we only look at rows inside the Commands section.
  const commandsSection = commandsSectionMatch.split(/^## /m)[0];
  const verbRowRegex = /^\|\s*\*?\*?[\w/ -]+\*?\*?\s*\|\s*`([a-z-]+)`\s*\|/gm;
  const tableVerbs = [];
  for (const m of commandsSection.matchAll(verbRowRegex)) {
    tableVerbs.push(m[1]);
  }
  if (!tableVerbs.length) {
    throw new Error('Canonical SKILL.md "## Commands" section has no verb rows in the expected shape');
  }

  const hintSet = new Set(hintVerbs);
  const tableSet = new Set(tableVerbs);
  const missing = [...tableSet].filter((v) => !hintSet.has(v));
  const extras = [...hintSet].filter((v) => !tableSet.has(v));

  if (missing.length || extras.length) {
    const parts = [];
    if (missing.length) parts.push(`argument-hint missing: ${missing.join(', ')}`);
    if (extras.length) parts.push(`argument-hint has extras not in table: ${extras.join(', ')}`);
    throw new Error(`Canonical SKILL.md drift between argument-hint and Commands table — ${parts.join('; ')}`);
  }
}

const entries = [...files(root)].filter(file => basename(file) === 'SKILL.md');
assert.deepEqual(entries, [join(skill, 'SKILL.md')], 'Expected exactly one authored skill');
const content = readFileSync(join(skill, 'SKILL.md'), 'utf8');
assertExpectedFrontmatterFields(content, 'skills/visualize/SKILL.md');
assertArgumentHintFresh(content);
for (const file of files(skill)) {
  if (!/\.(md|html)$/.test(file)) continue;
  assert(!/\{\{[^}]*\}\}/.test(readFileSync(file, 'utf8')), `Unresolved template placeholder: ${relative(root, file)}`);
}
for (const reference of new Set(content.match(/\breference\/[a-z0-9/-]+\.md\b/g))) {
  readFileSync(join(skill, reference));
}

// Readable vendor output must be complete and unchanged from the pinned build.
const vendor = join(skill, 'scripts', 'vendor');
const manifest = JSON.parse(readFileSync(join(vendor, 'manifest.json'), 'utf8'));
assert.equal(manifest.buildLockSha256, createHash('sha256').update(readFileSync(join(root, 'dev-scripts/vendor-build/package-lock.json'))).digest('hex'), 'Vendor build lock drift');
const generatedFiles = [...files(vendor)].filter(file =>
  (/\.(mjs|cjs)$/.test(file) && basename(file) !== 'culori.mjs') || basename(file) === 'LICENSES.txt');
assert.deepEqual(generatedFiles.map(file => relative(vendor, file).split('\\').join('/')).sort(), Object.keys(manifest.files).sort());
for (const [name, expected] of Object.entries(manifest.files)) {
  const bytes = readFileSync(join(vendor, name));
  assert(bytes.length < 256 * 1024, `Oversized vendor file: ${name}`);
  assert.equal(bytes.length, expected.bytes, `Vendor size drift: ${name}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, `Vendor build drift: ${name}`);
}
assert(![...files(vendor)].some(file => basename(file) === 'axe.min.js'), 'Minified axe must not be shipped');
assert([...files(skill)].length <= 512, 'Installed skill exceeds 512 files');

const isolated = mkdtempSync(join(tmpdir(), 'visualize-package-'));
try {
  const installed = join(isolated, 'installed skill', 'visualize');
  cpSync(skill, installed, { recursive: true });
  const run = (script, ...args) => execFileSync(process.execPath, [join(installed, 'scripts', script), ...args], { cwd: isolated, encoding: 'utf8' });
  const clean = JSON.parse(run('catalog.mjs', 'clean'));
  assert(clean.directory.startsWith(realpathSync(installed)), 'Clean must resolve inside the installed package');
  readFileSync(clean.files['DESIGN.md']);
  assert(run('detect.mjs', '--list-rules').length > 0);
  assert(JSON.parse(run('palette.mjs', '--from', 'Package smoke')).schemaVersion);
  const normalizeContrast = text => text.trim().split('\n').map(JSON.parse).map(record => {
    delete record.file;
    delete record.durationMs;
    return record;
  }).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
  for (const fixture of ['figma-style-preview', 'shopify-style-preview-dark', 'webflow-style-preview-dark']) {
    const actual = run('browser-contrast.mjs', '--json', join(installed, `scripts/fixtures/${fixture}.html`));
    const expected = readFileSync(join(installed, `scripts/fixtures/${fixture}.expected.ndjson`), 'utf8');
    assert.deepEqual(normalizeContrast(actual), normalizeContrast(expected), `Installed contrast regression: ${fixture}`);
  }
  const positiveFixture = readFileSync(join(installed, 'scripts/fixtures/webflow-style-preview-dark.html'), 'utf8');
  const positiveExpected = readFileSync(join(installed, 'scripts/fixtures/webflow-style-preview-dark.expected.ndjson'), 'utf8');
  for (const [name, setup] of [
    ['inline-only-csp', `<meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-inline'">`],
    ['null-css-global', '<script>window.CSS = null;</script>'],
  ]) {
    const fixture = join(isolated, `${name}.html`);
    writeFileSync(fixture, positiveFixture.replace('<head>', `<head>${setup}`));
    const actual = run('browser-contrast.mjs', '--json', fixture);
    assert.deepEqual(normalizeContrast(actual), normalizeContrast(positiveExpected), `${name} contrast regression`);
  }
  const shadowFixture = join(isolated, 'shadow-contrast.html');
  writeFileSync(shadowFixture, `<!doctype html><html lang="en"><head><title>Shadow contrast</title></head><body>
    <div id="host"></div><script>document.querySelector('#host').attachShadow({mode:'open'}).innerHTML=
    '<p style="color:#aaa;background:white;font:16px Arial">Shadow text</p>';</script></body></html>`);
  const shadow = normalizeContrast(run('browser-contrast.mjs', '--json', shadowFixture));
  assert.equal(shadow.find(record => record.type === 'summary').errors, 1, 'Shadow text must produce a contrast failure');
  assert.equal(shadow.find(record => record.type === 'summary').warnings, 0);
  run('slide-canvas-overflow.mjs', '--all', '--strict');
} finally {
  rmSync(isolated, { recursive: true, force: true });
}
console.log('OK · one standalone skill; metadata, routing, readable vendor integrity and isolated helpers pass');
