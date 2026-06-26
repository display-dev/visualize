#!/usr/bin/env node
// Stage 4 of the seed-curation pipeline: turn swipe keeps into library seeds.
//
// --prep   groups the kept candidates into authoring batches
//          (temp/curation-batches/batch-<n>.json), each carrying the full
//          existing library as style exemplars + the reserved-id list.
//          An agent session fans one authoring subagent out per batch;
//          each writes out-<n>.json: [{candId, id, mood, strategy, polarity}].
//
// --merge  validates the authored batches (unique ids, polarity enum,
//          register bans, full coverage of keeps), then regenerates the
//          SEEDS array and the coverage-matrix header comment inside
//          visualize/scripts/palette.mjs, preserving the shipped seeds.
//
// Usage:
//   node dev-scripts/palette-curate/build-library.mjs --prep
//   node dev-scripts/palette-curate/build-library.mjs --merge temp/curation-batches

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseOklch, zoneOf, bandOf, ALL_ZONES } from './oklch-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const PALETTE = join(REPO, 'visualize', 'scripts', 'palette.mjs');
const BATCH_DIR = join(REPO, 'temp', 'curation-batches');
const MAX_BATCH = 35;

function readJsonl(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

// The runtime script exports nothing by design; lift its SEEDS literal.
function readShippedSeeds(src) {
  const m = /const SEEDS = (\[[\s\S]*?\n\]);/.exec(src);
  if (!m) throw new Error('cannot locate SEEDS array in palette.mjs');
  return new Function(`return ${m[1]}`)();
}

function keeps() {
  const candidates = readJsonl(join(__dirname, 'data', 'candidates.jsonl'));
  const verdicts = {};
  for (const v of readJsonl(join(__dirname, 'data', 'verdicts.jsonl'))) {
    if (v.verdict === 'undo') delete verdicts[v.id];
    else verdicts[v.id] = v.verdict;
  }
  return candidates.filter((c) => verdicts[c.id] === 'keep');
}

const mode = process.argv[2];

if (mode === '--prep') {
  const src = readFileSync(PALETTE, 'utf8');
  const shipped = readShippedSeeds(src);
  const kept = keeps();
  // zone-grouped batches, capped at MAX_BATCH
  const byZone = new Map();
  for (const c of kept) {
    if (!byZone.has(c.zone)) byZone.set(c.zone, []);
    byZone.get(c.zone).push(c);
  }
  const batches = [];
  let current = [];
  for (const zone of ALL_ZONES) {
    const group = byZone.get(zone) || [];
    if (current.length && current.length + group.length > MAX_BATCH) {
      batches.push(current); current = [];
    }
    current.push(...group);
  }
  if (current.length) batches.push(current);

  mkdirSync(BATCH_DIR, { recursive: true });
  batches.forEach((cands, i) => {
    writeFileSync(join(BATCH_DIR, `batch-${i + 1}.json`), JSON.stringify({
      batch: i + 1,
      reservedIds: shipped.map((s) => s.id),
      exemplars: shipped,
      candidates: cands,
    }, null, 2));
  });
  console.log(`${kept.length} keeps → ${batches.length} batches in ${BATCH_DIR}`);
  batches.forEach((b, i) => console.log(`  batch-${i + 1}: ${b.length} (${[...new Set(b.map((c) => c.zone))].join(', ')})`));
} else if (mode === '--merge') {
  const dir = process.argv[3] || BATCH_DIR;
  const src = readFileSync(PALETTE, 'utf8');
  const shipped = readShippedSeeds(src);
  const kept = keeps();
  const keptById = new Map(kept.map((c) => [c.id, c]));

  const authored = [];
  for (const f of readdirSync(dir).filter((f) => /^out-\d+\.json$/.test(f)).sort()) {
    authored.push(...JSON.parse(readFileSync(join(dir, f), 'utf8')));
  }

  // validation
  const errors = [];
  const seenIds = new Set(shipped.map((s) => s.id));
  const seenCand = new Set();
  for (const a of authored) {
    const cand = keptById.get(a.candId);
    if (!cand) { errors.push(`${a.candId}: not a kept candidate`); continue; }
    if (seenCand.has(a.candId)) errors.push(`${a.candId}: authored twice`);
    seenCand.add(a.candId);
    if (!/^[a-z][a-z0-9]*(-[a-z0-9]+){0,3}$/.test(a.id || '')) errors.push(`${a.candId}: bad id "${a.id}"`);
    if (seenIds.has(a.id)) errors.push(`${a.candId}: id "${a.id}" collides`);
    seenIds.add(a.id);
    if (!['light-first', 'dark-first', 'both'].includes(a.polarity)) errors.push(`${a.id}: bad polarity "${a.polarity}"`);
    if (!a.mood || a.mood.length < 15 || a.mood.length > 110) errors.push(`${a.id}: mood length ${a.mood ? a.mood.length : 0}`);
    if (!a.strategy || a.strategy.length < 40 || a.strategy.length > 260) errors.push(`${a.id}: strategy length ${a.strategy ? a.strategy.length : 0}`);
    for (const banned of ['modern and clean', 'sleek', 'pops of color']) {
      if ((a.mood + ' ' + a.strategy).toLowerCase().includes(banned)) errors.push(`${a.id}: banned phrase "${banned}"`);
    }
  }
  for (const c of kept) {
    if (!seenCand.has(c.id)) errors.push(`${c.id}: kept but not authored`);
  }
  if (errors.length) {
    console.error(`merge blocked — ${errors.length} problem(s):`);
    for (const e of errors) console.error(`  ✖ ${e}`);
    process.exit(2);
  }

  // combined library, zone-major, hue-sorted within zone
  const newSeeds = authored.map((a) => {
    const cand = keptById.get(a.candId);
    return { id: a.id, oklch: cand.oklch, mood: a.mood, strategy: a.strategy, polarity: a.polarity };
  });
  const all = [...shipped, ...newSeeds].map((s) => ({ ...s, _c: parseOklch(s.oklch) }));
  for (const s of all) { s._zone = zoneOf(s._c.L, s._c.C, s._c.H); }
  all.sort((a, b) =>
    ALL_ZONES.indexOf(a._zone) - ALL_ZONES.indexOf(b._zone) || a._c.H - b._c.H || a._c.L - b._c.L);

  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const seedsLiteral = '[\n' + all.map((s) =>
    `  {\n    id: '${s.id}',\n    oklch: '${s.oklch}',\n    mood: '${esc(s.mood)}',\n    strategy: '${esc(s.strategy)}',\n    polarity: '${s.polarity}',\n  },`).join('\n') + '\n]';

  // matrix comment
  const cells = {};
  for (const s of all) {
    cells[s._zone] = cells[s._zone] || { n: 0, lf: 0, both: 0, df: 0 };
    cells[s._zone].n++;
    cells[s._zone][s.polarity === 'light-first' ? 'lf' : s.polarity === 'dark-first' ? 'df' : 'both']++;
  }
  const matrixLines = [];
  const zoneEntries = ALL_ZONES.filter((z) => cells[z]);
  for (let i = 0; i < zoneEntries.length; i += 4) {
    matrixLines.push('//   ' + zoneEntries.slice(i, i + 4)
      .map((z) => `${z} ${cells[z].n} (${cells[z].lf}|${cells[z].both}|${cells[z].df})`.padEnd(19)).join('').trimEnd());
  }

  let out = src.replace(/const SEEDS = \[[\s\S]*?\n\];/, `const SEEDS = ${seedsLiteral};`);
  out = out.replace(/(\/\/ Coverage matrix \(zone: seeds \/ polarity light-first\|both\|dark-first\):\n)(\/\/.*\n)+?(\/\/ All 13 zones occupied\.)/,
    `$1${matrixLines.join('\n')}\n$3`);
  if (out === src) { console.error('splice produced no change — marker drift?'); process.exit(2); }
  writeFileSync(PALETTE, out);
  console.log(`library: ${shipped.length} shipped + ${newSeeds.length} new = ${all.length} seeds → ${PALETTE}`);
  console.log('next: node dev-scripts/palette-smoke.mjs && bash bin/sync-mounts.sh');
} else {
  console.error('usage: build-library.mjs --prep | --merge [dir]');
  process.exit(2);
}
