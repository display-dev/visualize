#!/usr/bin/env node
// Diversity audit for the greenfield seed pipeline.
//
// Seed level (default): does the picker actually spread? Runs the picker N
// times in random mode and N times with distinct --from keys, then reports
// zone histograms (max/min fairness ratio) and pairwise OKLab spread of the
// picked seed colors. Catches library skew and sampler bugs.
//
// Composition level (--dir): given a directory of composed tokens.css /
// artifact .html files (one per topic, produced by agent runs), reports
// pairwise OKLab distance between the composed primaries (are different
// topics actually getting different brands?), the background-doctrine
// distribution (target ≈ 50% pure white / 25% near-black / 25% tinted
// across many artifacts), and the --check error count per file.
//
// Usage:
//   node dev-scripts/palette-eval/diversity-audit.mjs [--n 300]
//   node dev-scripts/palette-eval/diversity-audit.mjs --dir temp/compositions/

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { oklchToOklab, oklabDist, parseOklch } from '../palette-curate/oklch-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const PALETTE = join(REPO, 'visualize', 'scripts', 'palette.mjs');

const args = process.argv.slice(2);
const dirIdx = args.indexOf('--dir');
const nIdx = args.indexOf('--n');
const N = nIdx >= 0 ? parseInt(args[nIdx + 1], 10) : 300;

function pairwiseStats(labs) {
  if (labs.length < 2) return { mean: 0, min: 0 };
  let sum = 0, count = 0, min = Infinity;
  for (let i = 0; i < labs.length; i++) {
    for (let j = i + 1; j < labs.length; j++) {
      const d = oklabDist(labs[i], labs[j]);
      sum += d; count++; min = Math.min(min, d);
    }
  }
  return { mean: sum / count, min };
}

function histo(zones) {
  const h = {};
  for (const z of zones) h[z] = (h[z] || 0) + 1;
  return h;
}

function report(label, picks) {
  const zones = picks.map((p) => p.seed.zone);
  const h = histo(zones);
  const counts = Object.values(h);
  const uniqueSeeds = [...new Map(picks.map((p) => [p.seed.id, p])).values()];
  const labs = uniqueSeeds.map((p) => {
    const c = parseOklch(p.seed.oklch);
    return oklchToOklab(c.L, c.C, c.H);
  });
  const stats = pairwiseStats(labs);
  console.log(`\n${label} (${picks.length} runs)`);
  console.log('  zone histogram:', Object.entries(h).sort().map(([z, n]) => `${z}:${n}`).join(' '));
  console.log(`  zone fairness max/min: ${(Math.max(...counts) / Math.max(1, Math.min(...counts))).toFixed(2)} (1.0 = perfectly even)`);
  console.log(`  distinct seeds surfaced: ${uniqueSeeds.length}`);
  console.log(`  pairwise OKLab spread of surfaced seeds: mean ${stats.mean.toFixed(3)}, min ${stats.min.toFixed(3)}`);
}

if (dirIdx === -1) {
  const random = [], keyed = [];
  for (let i = 0; i < N; i++) {
    random.push(JSON.parse(execFileSync(process.execPath, [PALETTE], { encoding: 'utf8' })));
    keyed.push(JSON.parse(execFileSync(process.execPath, [PALETTE, '--from', `audit-topic-${i}`], { encoding: 'utf8' })));
  }
  report('random mode', random);
  report('keyed mode (distinct --from topics)', keyed);
} else {
  const dir = args[dirIdx + 1];
  const files = readdirSync(dir).filter((f) => /\.(css|html)$/.test(f)).sort();
  if (files.length === 0) { console.error(`no .css/.html files in ${dir}`); process.exit(1); }

  const rows = [];
  for (const f of files) {
    const path = join(dir, f);
    const text = readFileSync(path, 'utf8');
    const css = /<style/i.test(text)
      ? [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n')
      : text;
    const rootBody = /:root[^{]*\{([^}]*)\}/.exec(css)?.[1] || '';
    const grab = (name) => parseOklch((new RegExp(`--${name}\\s*:\\s*([^;}]+)`).exec(rootBody)?.[1] || '').trim());
    const bg = grab('background'), primary = grab('primary');
    let checkErrors = 0;
    try {
      const out = execFileSync(process.execPath, [PALETTE, '--check', path, '--json'], { encoding: 'utf8' });
      checkErrors = out.trim() ? out.trim().split('\n').map((l) => JSON.parse(l)).filter((x) => x.severity === 'error').length : 0;
    } catch { checkErrors = -1; }
    rows.push({ file: f, bg, primary, checkErrors });
  }

  const labs = rows.filter((r) => r.primary).map((r) => oklchToOklab(r.primary.L, r.primary.C, r.primary.H));
  const stats = pairwiseStats(labs);
  const doctrine = { white: 0, black: 0, tinted: 0, missing: 0 };
  for (const r of rows) {
    if (!r.bg) doctrine.missing++;
    else if (r.bg.L >= 0.99 && r.bg.C <= 0.005) doctrine.white++;
    else if (r.bg.L <= 0.32) doctrine.black++;
    else doctrine.tinted++;
  }
  console.log(`composition audit — ${rows.length} files in ${dir}\n`);
  for (const r of rows) {
    console.log(`  ${r.file.padEnd(36)} primary ${r.primary ? `h${Math.round(r.primary.H)} C${r.primary.C}` : '—'}  bg ${r.bg ? r.bg.L : '—'}  check-errors ${r.checkErrors}`);
  }
  console.log(`\n  primary pairwise OKLab spread: mean ${stats.mean.toFixed(3)}, min ${stats.min.toFixed(3)}`);
  console.log(`  (min < 0.05 means two topics composed near-identical brands)`);
  console.log(`  bg doctrine: white ${doctrine.white} / black ${doctrine.black} / tinted ${doctrine.tinted}${doctrine.missing ? ` / missing ${doctrine.missing}` : ''} — target ≈ 50/25/25 over many runs`);
}
