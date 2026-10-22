import { createHash } from 'node:crypto';
import { builtinModules } from 'node:module';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import { parseAst } from 'rollup/parseAst';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';
import { build as esbuild } from 'esbuild';
import { readableChunks } from './chunks.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const repo = resolve(root, '../..');
const work = join(root, 'node_modules/.visualize-build');
const vendor = resolve(process.argv[2] ?? join(repo, 'skills/visualize/scripts/vendor'));
const axeRevision = 'dfbc245856cc78289e74195ec1ef04bb33f60ffd';
const archiveHash = '45239583d1af3f66c935b2ab0da739881e99d5c4e643266a1a30b7c4f377f501';
const sourceUrl = `https://codeload.github.com/dequelabs/axe-core/tar.gz/${axeRevision}`;
const sha256 = data => createHash('sha256').update(data).digest('hex');
const write = (path, text) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); };
mkdirSync(work, { recursive: true }); mkdirSync(vendor, { recursive: true });
const archive = join(work, 'axe.tar.gz');
if (!existsSync(archive)) {
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`axe source download: HTTP ${response.status}`);
  write(archive, Buffer.from(await response.arrayBuffer()));
}
if (sha256(readFileSync(archive)) !== archiveHash) throw new Error('axe source archive checksum mismatch');
const axeRoot = join(work, `axe-core-${axeRevision}`);
rmSync(axeRoot, { recursive: true, force: true });
execFileSync('tar', ['-xzf', archive, '-C', work]);
const axeLib = join(axeRoot, 'lib');
const walk = dir => readdirSync(dir, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name, 'en')).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);

// Same generated metadata map as upstream build/tasks/metadata-function-map.js.
const metadata = walk(join(axeLib, 'checks')).filter(p => /-(evaluate|after)\.js$/.test(p))
  .concat(walk(join(axeLib, 'rules')).filter(p => /-matches\.js$/.test(p))).sort();
const names = metadata.map(p => p.split(sep).at(-1).slice(0, -3));
const symbol = name => name.replace(/-\w/g, value => value[1].toUpperCase());
write(join(axeLib, 'core/base/metadata-function-map.js'), metadata.map((path, i) =>
  `import ${symbol(names[i])} from ${JSON.stringify(relative(join(axeLib, 'core/base'), path).split(sep).join('/'))};`
).join('\n') + '\nexport default {\n' + names.map(name => `${JSON.stringify(name)}: ${symbol(name)}`).join(',\n') + '\n};\n');

// Use the complete release configuration, not a hand-maintained contrast subset.
const release = readFileSync(join(root, 'node_modules/axe-core/axe.js'), 'utf8');
let config;
function findConfiguration(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' &&
      node.callee.object.name === 'axe' && node.callee.property.name === '_load') {
    if (config || node.arguments.length !== 1 || node.arguments[0].type !== 'ObjectExpression') {
      throw new Error('unexpected axe release configuration');
    }
    config = release.slice(node.arguments[0].start, node.arguments[0].end);
  }
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(findConfiguration);
    else if (value && typeof value === 'object') findConfiguration(value);
  }
}
findConfiguration(parseAst(release));
if (!config) throw new Error('axe release configuration not found');
const globals = join(work, 'axe-globals.mjs');
write(globals, "export const axe = { version: '4.11.4' };\nexport const global = window;\n");
const axeEntry = join(work, 'axe-entry.mjs');
write(axeEntry, `import { axe } from './axe-globals.mjs';
import './axe-core-${axeRevision}/lib/core/core.js';
axe._load(${config});
window.axe = axe;
export default axe;
`);

const parserEntry = join(work, 'parser-entry.mjs');
write(parserEntry, "export { parse, HTMLElement, NodeType, TextNode, valid } from 'node-html-parser';\n");
const puppeteerEntry = join(work, 'puppeteer-entry.mjs');
write(puppeteerEntry, `import puppeteer from 'puppeteer-core';
export { puppeteer };
export { computeSystemExecutablePath, install, resolveBuildId, detectBrowserPlatform,
  Browser, BrowserTag } from '@puppeteer/browsers';
`);

// axe's release build applies this pinned upstream patch before bundling Color.js.
const colorPatchPath = 'patches/colorjs.io+0.4.3.patch';
const colorPatch = readFileSync(join(axeRoot, colorPatchPath), 'utf8');
const removedLines = colorPatch.split('\n').filter(line => line.startsWith('-') && !line.startsWith('---')).map(line => line.slice(1));
const addedLines = colorPatch.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++')).map(line => line.slice(1));
if (removedLines.length !== 2 || addedLines.length !== 2) throw new Error('Unexpected upstream Color.js patch');
const colorModule = join(root, 'node_modules/colorjs.io/dist/color.js');

const usedPackages = new Map();
const builtins = new Set([...builtinModules, ...builtinModules.map(name => `node:${name}`)]);
// Preserve the entire upstream copyright notice in every axe output file.
const axeBanner = readFileSync(join(axeLib, 'intro.stub'), 'utf8').split('(function axeFunction')[0]
  .replace('<%= pkg.version %>', '4.11.4')
  .replace('<%= grunt.template.today("yyyy") %>', '2026') +
  '// Adapted for readable module packaging; sources and licenses: ../manifest.json and ../LICENSES.txt.\n';
async function bundle(name, entry, browser = false) {
  const out = join(vendor, name);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const injectedModule = join(root, 'node_modules/puppeteer-core/lib/puppeteer/generated/injected.js');
  const plugins = [
    {
      name: 'pinned-inputs',
      load(id) {
        if (browser && id === colorModule) {
          let code = readFileSync(id, 'utf8');
          for (let i = 0; i < removedLines.length; i++) {
            if (code.split(removedLines[i]).length !== 2) throw new Error('Upstream Color.js patch no longer applies');
            code = code.replace(removedLines[i], addedLines[i]);
          }
          return code;
        }
        if (id === injectedModule) return `import { readFileSync } from 'node:fs';
export const source = readFileSync(new URL('./injected.cjs', import.meta.url), 'utf8');`;
      },
      moduleParsed(info) {
        if (info.id.startsWith('\0')) return;
        if (!info.id.startsWith(root + sep)) throw new Error(`input outside pinned build directory: ${info.id}`);
        let dir = dirname(info.id);
        while (dir.startsWith(root + sep)) {
          const packageFile = join(dir, 'package.json');
          if (existsSync(packageFile)) {
            const pkg = JSON.parse(readFileSync(packageFile, 'utf8'));
            if (pkg.name && pkg.version) usedPackages.set(dir, pkg);
            break;
          }
          dir = dirname(dir);
        }
      }
    },
    nodeResolve({ browser, preferBuiltins: !browser, jail: root, modulePaths: [join(root, 'node_modules')] }),
    commonjs({ transformMixedEsModules: true }), json({ compact: false })
  ];
  if (browser) plugins.push(inject({ axe: [globals, 'axe'], global: [globals, 'global'] }));
  const build = await rollup({
    input: entry,
    external: id => !browser && (builtins.has(id) || id === 'proxy-agent'),
    plugins,
    onwarn(warning) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return; // upstream cycles are kept together
      if (warning.code === 'EMPTY_BUNDLE') return; // a dependency group was fully tree-shaken
      if (warning.code === 'THIS_IS_UNDEFINED') return; // TypeScript decorator helpers test top-level this
      throw new Error(`${name}: ${warning.message}`);
    }
  });
  try {
    await build.write({ dir: out, format: browser ? 'cjs' : 'es',
      entryFileNames: browser ? 'index.cjs' : 'index.mjs',
      chunkFileNames: browser ? '[name].cjs' : '[name].mjs',
      manualChunks: readableChunks(entry, root), onlyExplicitManualChunks: true,
      banner: browser ? axeBanner : '// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.',
      generatedCode: 'es2015', sourcemap: false });
  } finally { await build.close(); }
  if (name === 'puppeteer') {
    await esbuild({
      absWorkingDir: root,
      entryPoints: [join(root, 'node_modules/puppeteer-core/lib/puppeteer/injected/injected.js')],
      bundle: true, format: 'cjs', platform: 'browser', target: 'es2022', minify: false,
      legalComments: 'inline', outfile: join(out, 'injected.cjs')
    });
  }
}
await bundle('node-html-parser', parserEntry);
await bundle('puppeteer', puppeteerEntry);
await bundle('axe', axeEntry, true);
for (const name of ['node-html-parser', 'puppeteer']) {
  write(join(vendor, `${name}.mjs`), `// Generated readable vendor entry. See README.md.\nexport * from './${name}/index.mjs';\n`);
}
rmSync(join(vendor, 'axe.min.js'), { force: true });

// Include complete license files, rather than relying only on retained comments.
let licenses = '';
for (const [dir, pkg] of [...usedPackages].sort((a,b) => a[1].name.localeCompare(b[1].name))) {
  const files = readdirSync(dir).filter(file => /^(licen[cs]e|copying|notice)([.-]|$)/i.test(file));
  // Puppeteer's npm packages carry SPDX headers but omit the root LICENSE.
  if (!files.length && ['puppeteer-core', '@puppeteer/browsers'].includes(pkg.name) && pkg.license === 'Apache-2.0') {
    licenses += `\n===== ${pkg.name}@${pkg.version} (Apache-2.0) =====\n` + readFileSync(join(root, 'licenses/Apache-2.0.txt'), 'utf8');
    continue;
  }
  if (!files.length && pkg.name === 'boolbase' && pkg.version === '1.0.0' && pkg.license === 'ISC') {
    licenses += '\n' + readFileSync(join(root, 'licenses/boolbase-ISC.txt'), 'utf8');
    continue;
  }
  if (!files.length) throw new Error(`no license file: ${pkg.name}`);
  licenses += `\n===== ${pkg.name}@${pkg.version} (${pkg.license ?? 'see license'}) =====\n`;
  for (const file of files.sort()) licenses += `\n--- ${file} ---\n${readFileSync(join(dir, file), 'utf8')}\n`;
}
write(join(vendor, 'LICENSES.txt'), licenses);
const generated = walk(vendor).filter(path => /\.(mjs|cjs)$/.test(path) && !path.endsWith('/culori.mjs')).concat(join(vendor, 'LICENSES.txt'));
const files = Object.fromEntries(generated.sort().map(path => {
  const bytes = readFileSync(path);
  if (bytes.length >= 256 * 1024) throw new Error(`vendor file too large: ${path} (${bytes.length})`);
  return [relative(vendor, path).split(sep).join('/'), { bytes: bytes.length, sha256: sha256(bytes) }];
}));
write(join(vendor, 'manifest.json'), JSON.stringify({
  format: 1, axe: { version: '4.11.4', revision: axeRevision, sourceUrl, archiveSha256: archiveHash, patches: [{ path: colorPatchPath, sha256: sha256(colorPatch) }] },
  buildLockSha256: sha256(readFileSync(join(root, 'package-lock.json'))),
  packages: [...usedPackages.values()].map(({ name, version, license }) => ({ name, version, license })).sort((a,b) => a.name.localeCompare(b.name)),
  files
}, null, 2) + '\n');
console.log(`Built ${Object.keys(files).length} readable vendor files; largest ${Math.max(...Object.values(files).map(f => f.bytes))} bytes.`);
