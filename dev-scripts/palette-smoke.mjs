#!/usr/bin/env node
// Smoke test for visualize/scripts/palette.mjs (schemaVersion 2).
//
// Verifies: inline color math against vendored culori, seed library
// integrity (gamut, fields, zone coverage), deterministic sampling
// (--from / --vary / --not), stratified-zone distribution over random
// runs, derived-block invariants (ladders hit their WCAG floors, accent
// suggestions remain usable), and the --check validator on clean / dirty
// / HTML fixtures.
//
// Run: node dev-scripts/palette-smoke.mjs
// Exit non-zero on any failure.

import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { detect } from '../visualize/scripts/detect.mjs';
import { parse as parseColor, converter, wcagContrast, wcagLuminance } from '../visualize/scripts/vendor/culori.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PALETTE = join(__dirname, '..', 'visualize', 'scripts', 'palette.mjs');
const toRgb = converter('rgb');

let failures = 0;
function check(cond, msg) {
  if (!cond) { failures++; console.error(`  ✖ ${msg}`); }
}

function run(args, opts = {}) {
  return execFileSync(process.execPath, [PALETTE, ...args], { encoding: 'utf8', ...opts });
}

function runExpectFail(args, input) {
  try {
    execFileSync(process.execPath, [PALETTE, ...args], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], input });
    return null;
  } catch (e) {
    return e.status;
  }
}

function pick(args) {
  return JSON.parse(run(args));
}

// ------------------------------------------------------------
console.log('1. schema + seed library integrity');
const all = run(['--list']).trim().split('\n');
check(all.length === 200, `--list has 200 seeds (got ${all.length})`);

const ids = all.map((l) => l.split(/\s+/)[0]);
check(new Set(ids).size === ids.length, 'seed ids unique');

const zonesSeen = new Set(all.map((l) => l.split(/\s+/)[1]));
const ALL_ZONES = ['red', 'orange', 'gold', 'yellow', 'lime', 'green', 'teal', 'azure', 'blue', 'violet', 'purple', 'pink', 'neutral'];
for (const z of ALL_ZONES) check(zonesSeen.has(z), `zone "${z}" occupied`);

for (const id of ids) {
  const out = pick(['--id', id]);
  check(out.schemaVersion === 2, `${id}: schemaVersion 2`);
  check(out.invocation.mode === 'id', `${id}: invocation.mode id`);
  const s = out.seed;
  check(typeof s.mood === 'string' && s.mood.length > 8, `${id}: mood present`);
  check(typeof s.strategy === 'string' && s.strategy.length > 20, `${id}: strategy present`);
  check(['light-first', 'dark-first', 'both'].includes(s.polarity), `${id}: polarity valid`);
  check(['white', 'dark'].includes(s.textOnSolid), `${id}: textOnSolid valid`);
  check(['warm', 'cool', 'neutral'].includes(s.register.temperature), `${id}: register.temperature valid`);

  // culori must parse the seed and agree it is inside sRGB.
  const col = parseColor(s.oklch);
  check(col != null, `${id}: culori parses ${s.oklch}`);
  if (col) {
    const rgb = toRgb(col);
    const inGamut = ['r', 'g', 'b'].every((ch) => rgb[ch] >= -0.001 && rgb[ch] <= 1.001);
    check(inGamut, `${id}: ${s.oklch} inside sRGB per culori (r=${rgb.r?.toFixed(3)} g=${rgb.g?.toFixed(3)} b=${rgb.b?.toFixed(3)})`);
    check(s.oklch.match(/oklch\(([\d.]+)/)[1] <= 1, `${id}: L in 0-1 notation`);
  }

  // derived invariants
  const d = out.derived;
  check(d.chromaBudget.length === 5, `${id}: chromaBudget 5 entries`);
  check(d.accentHues.length >= 1 && d.accentHues.length <= 2, `${id}: 1-2 accentHues`);
  check(d.chartHues.length === 5, `${id}: 5 chartHues`);
  check(d.seedMaxC >= 0, `${id}: seedMaxC present`);

  for (const hue of d.accentHues) {
    check(Number.isFinite(hue) && hue >= 0 && hue < 360, `${id}: usable accent hue ${hue}`);
  }

}

// ------------------------------------------------------------
console.log('2. inline color math vs vendored culori');
{
  // WCAG luminance + contrast agreement on every seed against white/black.
  for (const id of ids) {
    const out = pick(['--id', id]);
    const c = out.seed.oklch;
    const vsWhite = wcagContrast(c, '#ffffff');
    const vsBlack = wcagContrast(c, '#000000');
    const dw = Math.abs(vsWhite - out.derived.contrast.vsWhite.wcag);
    const db = Math.abs(vsBlack - out.derived.contrast.vsBlack.wcag);
    check(dw < 0.06, `${id}: wcag vsWhite matches culori (${out.derived.contrast.vsWhite.wcag} vs ${vsWhite.toFixed(2)})`);
    check(db < 0.06, `${id}: wcag vsBlack matches culori (${out.derived.contrast.vsBlack.wcag} vs ${vsBlack.toFixed(2)})`);
  }
  // Ladder floors really hit their ratios (neutral colors, culori math).
  const d = pick(['--id', 'oxide-red']).derived;
  const lf = d.ladders.light, df = d.ladders.dark;
  check(wcagContrast(`oklch(${lf.ink} 0 0)`, 'oklch(1 0 0)') >= 7, `light ladder ink ${lf.ink} >= 7:1 on white`);
  check(wcagContrast(`oklch(${lf.muted} 0 0)`, 'oklch(1 0 0)') >= 4.5, `light ladder muted ${lf.muted} >= 4.5:1 on white`);
  check(wcagContrast(`oklch(${lf.inkCeil} 0 0)`, 'oklch(1 0 0)') >= 6.9, `light inkCeil ${lf.inkCeil} ~7:1 bound`);
  check(wcagContrast(`oklch(${df.ink} 0 0)`, `oklch(${df.bg} 0 0)`) >= 7, `dark ladder ink ${df.ink} >= 7:1 on bg ${df.bg}`);
  check(wcagContrast(`oklch(${df.muted} 0 0)`, `oklch(${df.bg} 0 0)`) >= 4.5, `dark ladder muted ${df.muted} >= 4.5:1`);
}

// APCA canonical value check via --check on a black-on-white fixture:
// foreground oklch(0 0 0) on background oklch(1 0 0) must NOT produce
// contrast findings (Lc ~106, ratio 21). A mid-gray must.
{
  const tmp = mkdtempSync(join(tmpdir(), 'palette-smoke-'));
  try {
    const good = `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.48 0.19 265); }
[data-theme="dark"] { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); } }`;
    writeFileSync(join(tmp, 'bw.css'), good);
    const out = run(['--check', join(tmp, 'bw.css'), '--json']);
    const findings = out.trim() ? out.trim().split('\n').map((l) => JSON.parse(l)) : [];
    check(findings.filter((f) => f.severity === 'error').length === 0, `black-on-white fixture has no errors (got: ${JSON.stringify(findings)})`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ------------------------------------------------------------
console.log('3. textOnSolid sanity');
{
  const expect = { 'hazard-yellow': 'dark', 'celadon': 'dark', 'ultramarine': 'white', 'oxide-red': 'white', 'cobalt-vault': 'white', 'ochre-index': 'dark' };
  for (const [id, want] of Object.entries(expect)) {
    const got = pick(['--id', id]).seed.textOnSolid;
    check(got === want, `${id}: textOnSolid ${want} (got ${got})`);
  }
}

// ------------------------------------------------------------
console.log('4. deterministic sampling');
{
  const a = run(['--from', 'display.dev launch recap']);
  const b = run(['--from', 'display.dev launch recap']);
  check(a === b, '--from is byte-identical across runs');

  const base = JSON.parse(a).seed.id;
  const varied = new Set([1, 2, 3, 4, 5].map((n) => pick(['--from', 'display.dev launch recap', '--vary', String(n)]).seed.id));
  check([...varied, base].length > 1 && (varied.size > 1 || !varied.has(base)), `--vary explores (base=${base}, varied=${[...varied].join(',')})`);

  const v2a = run(['--from', 'display.dev launch recap', '--vary', '2']);
  const v2b = run(['--from', 'display.dev launch recap', '--vary', '2']);
  check(v2a === v2b, '--vary is itself deterministic');

  for (let i = 0; i < 40; i++) {
    const out = pick(['--from', `veto-test-${i}`, '--not', 'red,orange,pink']);
    check(!['red', 'orange', 'pink'].includes(out.seed.zone), `--not respected (run ${i} → ${out.seed.zone})`);
    check(out.invocation.excluded.join(',') === 'red,orange,pink', 'invocation echoes exclusions');
    if (failures) break;
  }

  check(runExpectFail(['--id', 'nope']) === 2, 'unknown --id exits 2');
  check(runExpectFail(['--not', 'bogus-zone']) === 2, 'unknown --not token exits 2');
  check(runExpectFail(['--vary', '1']) === 2, '--vary without --from exits 2');
  check(runExpectFail(['--frm', 'typo']) === 2, 'unknown flag exits 2');
}

// ------------------------------------------------------------
console.log('5. zone distribution over random runs (stratified fairness)');
{
  const counts = {};
  const N = 260;
  for (let i = 0; i < N; i++) {
    const z = pick([]).seed.zone;
    counts[z] = (counts[z] || 0) + 1;
  }
  const expected = N / ALL_ZONES.length; // 20
  for (const z of ALL_ZONES) {
    const n = counts[z] || 0;
    check(n >= expected * 0.3 && n <= expected * 2.2, `zone ${z}: ${n} picks within loose fairness band (expected ~${expected})`);
  }
  console.log('   distribution:', ALL_ZONES.map((z) => `${z}:${counts[z] || 0}`).join(' '));
}

// ------------------------------------------------------------
console.log('6. --check on dirty fixture');
{
  const tmp = mkdtempSync(join(tmpdir(), 'palette-smoke-'));
  try {
    // low-contrast fg, out-of-gamut chart-1, no dark block
    const bad = `:root {
      --background: oklch(1 0 0);
      --foreground: oklch(0.60 0.02 260);
      --primary: oklch(0.55 0.20 280);
      --primary-foreground: oklch(0.98 0 0);
      --accent: oklch(0.70 0.15 195);
      --chart-1: oklch(0.65 0.30 210);
    }`;
    writeFileSync(join(tmp, 'bad.css'), bad);
    const out = run(['--check', join(tmp, 'bad.css'), '--json']);
    const findings = out.trim().split('\n').map((l) => JSON.parse(l));
    const idsFound = new Set(findings.map((f) => f.ruleId));
    for (const want of ['palette/contrast-wcag', 'palette/out-of-gamut', 'palette/missing-dark-block']) {
      check(idsFound.has(want), `dirty fixture triggers ${want} (got: ${[...idsFound].join(', ')})`);
    }
    check(runExpectFail(['--check', join(tmp, 'bad.css'), '--strict']) === 2, '--strict exits 2 on errors');

    // HTML wrapping: same CSS inside <style> is parsed identically
    writeFileSync(join(tmp, 'bad.html'), `<!doctype html><html><head><style>${bad}</style></head><body></body></html>`);
    const htmlOut = run(['--check', join(tmp, 'bad.html'), '--json']);
    const htmlIds = new Set(htmlOut.trim().split('\n').map((l) => JSON.parse(l).ruleId));
    check(htmlIds.has('palette/out-of-gamut') && htmlIds.has('palette/contrast-wcag'), 'HTML artifact input parsed (<style> extraction)');

    check(runExpectFail(['--check', join(tmp, 'missing.css')]) === 1, 'unreadable input exits 1');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ------------------------------------------------------------
console.log('7. regressions from adversarial + consumer testing');
{
  const tmp = mkdtempSync(join(tmpdir(), 'palette-smoke-'));
  try {
    const writeRun = (name, css) => {
      writeFileSync(join(tmp, name), css);
      const out = run(['--check', join(tmp, name), '--json']);
      return out.trim() ? out.trim().split('\n').map((l) => JSON.parse(l)) : [];
    };

    // B1: no NUL byte in source
    const srcBytes = readFileSync(PALETTE);
    check(!srcBytes.includes(0), 'source contains no NUL byte');

    // B2: last declaration without trailing semicolon is still parsed
    const f2 = writeRun('no-semi.css', `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.55 0.20 280); --accent: oklch(0.70 0.40 195) }`);
    check(f2.some((f) => f.ruleId === 'palette/out-of-gamut' && f.locator.includes('--accent')), `semicolon-less final declaration still checked (got: ${f2.map((f) => f.ruleId).join(',')})`);

    // B3: var() fallback must not mask the resolved value
    const f3 = writeRun('var-fallback.css', `:root { --brand: oklch(0.95 0.02 100); --background: oklch(1 0 0); --foreground: var(--brand, oklch(0 0 0)); --primary: oklch(0.4 0.1 250); }`);
    check(f3.some((f) => f.ruleId === 'palette/contrast-wcag' && f.severity === 'error'), 'var() fallback does not mask a pale resolved foreground');

    // B4: translucent color token warns
    const f4 = writeRun('alpha.css', `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0 / 0.5); --primary: oklch(0.4 0.1 250); }`);
    check(f4.some((f) => f.ruleId === 'palette/translucent-token'), 'alpha < 1 on color token warns');

    // B5: CSS whose comment mentions <style> is not misdetected as HTML
    const f5 = writeRun('comment-style.css', `/* paste this into a <style> tag */\n:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.4 0.1 250); }`);
    check(Array.isArray(f5), 'comment mentioning <style> still parses as CSS');

    // S1: hex on a contrast-critical token escalates to error
    const f6 = writeRun('hex-core.css', `:root { --background: #ffffff; --foreground: #888888; --primary: oklch(0.4 0.1 250); }`);
    check(f6.some((f) => f.ruleId === 'palette/non-oklch' && f.severity === 'error'), 'hex on core token is an error, not a warn');

    // Composer P0: detect.mjs-mandated OS-dark selector classifies as the
    // OS-dark path → no missing-dark-variant warn when both paths exist.
    const dual = `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.48 0.19 265); }
[data-theme="dark"] { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]):not([data-theme="dark"]) { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); } }`;
    const f7 = writeRun('detect-selector.css', dual);
    check(!f7.some((f) => f.ruleId === 'palette/missing-dark-variant'), `detect-mandated :not() selector recognized as OS-dark path (got: ${f7.map((f) => f.ruleId).join(',') || 'clean'})`);

    // S3: diverging OS-dark block gets its own value pass
    const f8 = writeRun('diverging-os.css', `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.48 0.19 265); }
[data-theme="dark"] { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]):not([data-theme="dark"]) { --background: oklch(0.19 0 0); --foreground: oklch(0.25 0 0); --primary: oklch(0.83 0.08 265); } }`);
    check(f8.some((f) => f.ruleId === 'palette/contrast-wcag' && f.locator.includes('@media')), 'broken OS-dark block is value-checked when it diverges');

    // S4: scoped selectors don't pollute root blocks
    const f9 = writeRun('scoped.css', `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.48 0.19 265); }
[data-theme="dark"] { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); }
@media (prefers-color-scheme: dark) { :root { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); } }
[data-theme="dark"] .card { --primary: oklch(0.9 0.4 200); }`);
    check(!f9.some((f) => f.ruleId === 'palette/out-of-gamut'), 'component-scoped override not merged into the dark root block');

    // S4b: Tailwind-style :root.dark classifies as explicit dark, not light
    const f10 = writeRun('root-dark.css', `:root { --background: oklch(1 0 0); --foreground: oklch(0 0 0); --primary: oklch(0.48 0.19 265); }
:root.dark { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); }
@media (prefers-color-scheme: dark) { :root { --background: oklch(0.19 0 0); --foreground: oklch(0.93 0 0); --primary: oklch(0.83 0.08 265); } }`);
    check(!f10.some((f) => f.severity === 'error'), `:root.dark block does not pollute the light map (got: ${f10.filter((f) => f.severity === 'error').map((f) => f.ruleId).join(',') || 'none'})`);

    // Hue relationships are not validation failures. Keep real palette checks.
    for (const [name, primary, accent] of [
      ['purple-cyan', 315, 195], ['indigo-pink-wrap', 280, 2],
      ['cyan-purple', 195, 280], ['red-gray-multicolor', 29, 145],
    ]) {
      const roles = `--primary: oklch(0.60 0.08 ${primary}); --accent: oklch(0.70 0.08 ${accent});
        --chart-1: oklch(0.65 0.08 85); --chart-2: oklch(0.65 0.08 255);`;
      const dark = `--background: oklch(0.12 0 0); --foreground: oklch(0.98 0 0); ${roles}`;
      const css = `:root { --background: oklch(0.98 0 0); --foreground: oklch(0.12 0 0); ${roles} }
        [data-theme="dark"] { ${dark} }
        @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]):not([data-theme="dark"]) { ${dark} } }`;
      const findings = writeRun(`${name}.css`, css);
      check(!findings.some((f) => f.severity === 'error'), `${name}: valid palette is accepted (${findings.map((f) => f.ruleId).join(',')})`);
      check(runExpectFail(['--check', join(tmp, `${name}.css`), '--strict']) === null, `${name}: strict validation succeeds`);
    }

    // Ladder self-consistency: tokens composed verbatim from the script's own
    // ladders/neutrals must produce ZERO findings (warns included).
    const p = pick(['--id', 'ultramarine']);
    const n = p.derived.neutrals, lad = p.derived.ladders;
    const selfTokens = `:root {
  --background: oklch(1 0 0);
  --foreground: oklch(${lad.light.ink} ${n.chroma} ${n.hue});
  --muted-foreground: oklch(${lad.light.muted} ${n.chroma} ${n.hue});
  --border: oklch(${lad.light.border} ${n.chroma} ${n.hue});
  --primary: ${p.seed.oklch};
  --primary-foreground: oklch(1 0 0);
  --accent: oklch(0.78 0.12 ${p.derived.accentHues[0]});
  --accent-foreground: oklch(0.2 0.02 ${p.derived.accentHues[0]});
}
[data-theme="dark"] {
  --background: oklch(${lad.dark.bg} ${n.chroma} ${n.hue});
  --foreground: oklch(${lad.dark.ink} 0.01 ${n.hue});
  --muted-foreground: oklch(${lad.dark.muted} 0.015 ${n.hue});
  --border: oklch(${lad.dark.border} ${n.chroma} ${n.hue});
  --primary: oklch(0.72 0.13 ${n.hue});
  --primary-foreground: oklch(0.16 0.01 ${n.hue});
  --accent: oklch(0.78 0.1 ${p.derived.accentHues[0]});
  --accent-foreground: oklch(0.2 0.02 ${p.derived.accentHues[0]});
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]):not([data-theme="dark"]) {
  --background: oklch(${lad.dark.bg} ${n.chroma} ${n.hue});
  --foreground: oklch(${lad.dark.ink} 0.01 ${n.hue});
  --muted-foreground: oklch(${lad.dark.muted} 0.015 ${n.hue});
  --border: oklch(${lad.dark.border} ${n.chroma} ${n.hue});
  --primary: oklch(0.72 0.13 ${n.hue});
  --primary-foreground: oklch(0.16 0.01 ${n.hue});
  --accent: oklch(0.78 0.1 ${p.derived.accentHues[0]});
  --accent-foreground: oklch(0.2 0.02 ${p.derived.accentHues[0]});
} }`;
    const f13 = writeRun('self-consistent.css', selfTokens);
    check(f13.length === 0, `ladder-derived tokens are self-consistent: zero findings (got: ${JSON.stringify(f13.map((f) => f.ruleId + ':' + f.locator))})`);

    // schema additions present
    check(Array.isArray(p.zones) && p.zones.length === 13, 'pick output carries zones list');
    check(p.derived.hueBudgets && Object.keys(p.derived.hueBudgets).length >= 3, 'pick output carries hueBudgets');
    check(p.derived.stateHues && p.derived.stateHues.destructive === 27, 'pick output carries stateHues');

    // B6 + combo validation
    check(runExpectFail(['--from', 'x', '--vary', '1.5']) === 2, '--vary 1.5 rejected');
    check(runExpectFail(['--from', 'x', '--vary', '1abc']) === 2, '--vary 1abc rejected');
    check(runExpectFail(['--id', 'clay', '--from', 'x']) === 2, '--id + --from rejected');
    check(runExpectFail(['--id', 'clay', '--not', 'red']) === 2, '--id + --not rejected');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// ------------------------------------------------------------
console.log('8. color freedom does not disable detector safety checks');
{
  const purple = pick(['--id', 'ultramarine']);
  check(purple.derived.accentHues.some((hue) => hue >= 315 || hue < 5), 'purple seed may suggest a pink companion rather than filtering it by hue');
  const document = (css, body) => `<!doctype html><html lang="en"><head><title>Color fixture</title><style>body { color: #111; background: #fff; font: 16px Georgia; } ${css}</style></head><body><h1>Color study</h1>${body}</body></html>`;
  const allowed = await detect({ html: document('body { background: #f5eee4; } .field { background: linear-gradient(90deg, #6633cc, #ee33bb, #00bbdd); height: 100px; }', '<p>Paper and colored fields.</p><div class="field"></div>') });
  check(!allowed.some((f) => ['slop/generic-gradient', 'slop/cream-palette'].includes(f.ruleId)), 'gradient hue and warm paper are not detector findings');
  const unsafe = await detect({ html: document('p { color: #aaa; background: #fff; }', '<h2 style="background:linear-gradient(90deg,red,blue);background-clip:text;color:transparent">Gradient text</h2><p>Low-contrast text.</p><img src="missing.png" width="10" height="10">') });
  for (const id of ['slop/gradient-text', 'a11y/low-contrast', 'a11y/missing-alt']) {
    check(unsafe.some((f) => f.ruleId === id && f.severity === 'error'), `retained detector catches ${id}`);
  }
}

// ------------------------------------------------------------
if (failures) {
  console.error(`\npalette-smoke: ${failures} failure(s)`);
  process.exit(1);
}
console.log('\npalette-smoke: all checks passed');
