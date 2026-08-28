#!/usr/bin/env node
// Stage 1 of the seed-curation pipeline: generate swipe candidates by
// farthest-point (maximin) sampling in OKLab, seeded with the existing
// library so every candidate lands in an under-covered region — the
// glasbey `extend_palette` pattern, zero-dep.
//
// Deterministic: fixed PRNG seed, so the candidate set Carl judges is
// reproducible and committable alongside the verdicts.
//
// Usage:
//   node dev-scripts/palette-curate/generate-candidates.mjs            # writes data/candidates.jsonl
//   node dev-scripts/palette-curate/generate-candidates.mjs --dry      # summary only
//
// Cell quotas: 12 chromatic zones x 3 lightness bands x 9 candidates,
// plus 8 neutral-zone candidates ≈ 330. At impeccable's ~32% human keep
// rate that yields ~100-120 keeps → a ~140-160 seed library.

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  oklchToOklab, oklabDist, maxChroma, textOnSolid,
  ZONE_NAMES, L_BANDS, mulberry32, fmtOklch, parseOklch, zoneOf, bandOf,
} from './oklch-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const PALETTE = join(REPO, 'visualize', 'scripts', 'palette.mjs');
const OUT = join(__dirname, 'data', 'candidates.jsonl');

const QUOTA_PER_CELL = 9;
const NEUTRAL_QUOTA = 8;
const SAMPLES_PER_CELL = 800;
const MIN_DIST_EXISTING = 0.05; // candidate too close to a shipped seed = duplicate
const MIN_DIST_CHOSEN = 0.04;   // spread among candidates themselves
const GAMUT_MARGIN = 0.015;     // headroom below the sRGB cusp
const MAX_C = 0.26;             // UI sanity cap

const dry = process.argv.includes('--dry');

// Existing library via the runtime CLI — no source parsing.
const existing = execFileSync(process.execPath, [PALETTE, '--list'], { encoding: 'utf8' })
  .trim().split('\n').map((line) => {
    const [id, zone, polarity, ...rest] = line.split(/\s+/);
    const c = parseOklch(rest.join(' '));
    return { id, zone, polarity, ...c };
  });

const repulsors = existing.map((s) => oklchToOklab(s.L, s.C, s.H));
const chosen = [];
const candidates = [];
let candSeq = 0;

function tryPick(rand, bounds, quota, zoneFilter) {
  const picks = [];
  // Sample the cell, then greedily take the point with the max min-distance
  // to everything already in the space (library + all chosen candidates).
  const pool = [];
  for (let i = 0; i < SAMPLES_PER_CELL; i++) {
    const L = bounds.lMin + rand() * (bounds.lMax - bounds.lMin);
    const H = bounds.hMin + rand() * (bounds.hMax - bounds.hMin);
    const cMax = Math.min(maxChroma(L, H) - GAMUT_MARGIN, bounds.cMax);
    if (cMax <= bounds.cMin) continue;
    const C = bounds.cMin + rand() * (cMax - bounds.cMin);
    if (zoneFilter && zoneOf(L, C, H) !== zoneFilter) continue;
    pool.push({ L, C, H, lab: oklchToOklab(L, C, H) });
  }
  for (let k = 0; k < quota; k++) {
    let best = null, bestDist = -1;
    for (const p of pool) {
      if (p.taken) continue;
      let dMin = Infinity;
      for (const r of repulsors) dMin = Math.min(dMin, oklabDist(p.lab, r));
      if (dMin < MIN_DIST_EXISTING) { p.taken = true; continue; }
      for (const c of chosen) dMin = Math.min(dMin, oklabDist(p.lab, c));
      if (dMin > bestDist) { bestDist = dMin; best = p; }
    }
    if (!best || bestDist < MIN_DIST_CHOSEN) break;
    best.taken = true;
    chosen.push(best.lab);
    picks.push(best);
  }
  return picks;
}

// Chromatic cells, band-major round-robin across zones so the greedy
// sequencing doesn't systematically advantage early zones.
for (const band of L_BANDS) {
  ZONE_NAMES.forEach((zone, zi) => {
    const rand = mulberry32(0xc0ffee ^ (zi * 31 + L_BANDS.indexOf(band) * 997));
    const picks = tryPick(rand, {
      lMin: band.lo, lMax: band.hi,
      hMin: zi * 30, hMax: zi * 30 + 30,
      cMin: 0.05, cMax: MAX_C,
    }, QUOTA_PER_CELL, zone);
    for (const p of picks) {
      candidates.push({
        id: `cand-${String(++candSeq).padStart(3, '0')}`,
        oklch: fmtOklch(p.L, p.C, p.H),
        zone, band: band.name,
        textOnSolid: textOnSolid(p.L, p.C, p.H),
        neutralChroma: Math.round(Math.min(0.03, Math.max(0.004, p.C / 6)) * 1000) / 1000,
      });
    }
  });
}

// Neutral zone: low-chroma tinted inks/grounds across the full hue circle.
{
  const rand = mulberry32(0xc0ffee ^ 0x5eed);
  const picks = tryPick(rand, {
    lMin: 0.18, lMax: 0.92, hMin: 0, hMax: 360, cMin: 0.005, cMax: 0.035,
  }, NEUTRAL_QUOTA, null);
  for (const p of picks) {
    candidates.push({
      id: `cand-${String(++candSeq).padStart(3, '0')}`,
      oklch: fmtOklch(p.L, p.C, p.H),
      zone: 'neutral', band: bandOf(p.L) || (p.L >= 0.92 ? 'light' : 'heavy'),
      textOnSolid: textOnSolid(p.L, p.C, p.H),
      neutralChroma: Math.round(Math.min(0.03, Math.max(0.004, p.C / 6)) * 1000) / 1000,
    });
  }
}

// Interleave zones in the output order so swipe fatigue doesn't land on
// one zone: round-robin across zones, shuffled within zone (seeded).
const byZone = new Map();
for (const c of candidates) {
  if (!byZone.has(c.zone)) byZone.set(c.zone, []);
  byZone.get(c.zone).push(c);
}
const shuffler = mulberry32(0xdeadbee5);
for (const list of byZone.values()) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(shuffler() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}
const ordered = [];
let added = true;
while (added) {
  added = false;
  for (const list of byZone.values()) {
    const next = list.shift();
    if (next) { ordered.push(next); added = true; }
  }
}

// Summary matrix
const matrix = {};
for (const c of ordered) {
  matrix[c.zone] = matrix[c.zone] || { heavy: 0, mid: 0, light: 0 };
  matrix[c.zone][c.band]++;
}
console.log(`${ordered.length} candidates (existing library: ${existing.length} seeds)`);
console.log('zone        heavy  mid  light');
for (const [zone, bands] of Object.entries(matrix)) {
  console.log(`${zone.padEnd(12)}${String(bands.heavy).padStart(5)}${String(bands.mid).padStart(5)}${String(bands.light).padStart(7)}`);
}

if (!dry) {
  mkdirSync(join(__dirname, 'data'), { recursive: true });
  writeFileSync(OUT, ordered.map((c) => JSON.stringify(c)).join('\n') + '\n');
  console.log(`\nwrote ${OUT}`);
}
