#!/usr/bin/env node
// Stage 3 of the seed-curation pipeline: coverage report.
//
// Shows, per zone x lightness band: shipped seeds, swipe keeps so far, and
// unjudged candidates remaining — so the swipe session knows where taste
// has headroom and the library PR knows which cells are still thin.
//
// Usage:
//   node dev-scripts/palette-curate/coverage.mjs

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseOklch, bandOf, ALL_ZONES } from './oklch-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const PALETTE = join(REPO, 'visualize', 'scripts', 'palette.mjs');

function readJsonl(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

const existing = execFileSync(process.execPath, [PALETTE, '--list'], { encoding: 'utf8' })
  .trim().split('\n').map((line) => {
    const [id, zone, polarity, ...rest] = line.split(/\s+/);
    const c = parseOklch(rest.join(' '));
    return { id, zone, polarity, band: bandOf(c.L) || 'light' };
  });

const candidates = readJsonl(join(__dirname, 'data', 'candidates.jsonl'));
const verdictLog = readJsonl(join(__dirname, 'data', 'verdicts.jsonl'));
const verdicts = {};
for (const v of verdictLog) {
  if (v.verdict === 'undo') delete verdicts[v.id];
  else verdicts[v.id] = v.verdict;
}

const cell = () => ({ shipped: 0, kept: 0, pending: 0 });
const matrix = {};
const bump = (zone, band, key) => {
  matrix[zone] = matrix[zone] || { heavy: cell(), mid: cell(), light: cell() };
  if (matrix[zone][band]) matrix[zone][band][key]++;
};
for (const s of existing) bump(s.zone, s.band, 'shipped');
for (const c of candidates) {
  if (verdicts[c.id] === 'keep') bump(c.zone, c.band, 'kept');
  else if (!(c.id in verdicts)) bump(c.zone, c.band, 'pending');
}

const judged = Object.keys(verdicts).length;
const keeps = Object.values(verdicts).filter((v) => v === 'keep').length;
console.log(`shipped: ${existing.length} seeds · judged: ${judged}/${candidates.length} candidates · keeps: ${keeps}`);
console.log('\nzone        band    shipped  kept  pending');
for (const zone of ALL_ZONES) {
  if (!matrix[zone]) continue;
  for (const band of ['heavy', 'mid', 'light']) {
    const c = matrix[zone][band];
    if (c.shipped + c.kept + c.pending === 0) continue;
    console.log(`${zone.padEnd(12)}${band.padEnd(8)}${String(c.shipped).padStart(7)}${String(c.kept).padStart(6)}${String(c.pending).padStart(9)}`);
  }
}
const thin = [];
for (const zone of ALL_ZONES) {
  for (const band of ['heavy', 'mid', 'light']) {
    const c = matrix[zone]?.[band];
    if (c && c.shipped + c.kept < 2 && c.pending === 0) thin.push(`${zone}/${band}`);
  }
}
if (thin.length) console.log(`\nthin cells with no pending candidates (gamut-limited or fully judged): ${thin.join(', ')}`);
