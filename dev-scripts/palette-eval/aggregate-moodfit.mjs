#!/usr/bin/env node
// Aggregates blind mood-fit rankings into a Borda-count table.
//
// Input: a rankings.jsonl where each line is one judge's verdict on one
// brief:
//   { "brief": "legal-trust", "judge": "j1",
//     "ranking": ["B", "A", "C"],                  // best → worst, blind labels
//     "map": { "A": "v2", "B": "impeccable", "C": "v1" } }
//
// Borda: rank 1 → 2 points, rank 2 → 1, rank 3 → 0. Reported per brief and
// in total. The map is recorded by the (non-judging) orchestrator at
// assignment time; judges only ever see A/B/C.
//
// Usage: node dev-scripts/palette-eval/aggregate-moodfit.mjs <rankings.jsonl>

import { readFileSync } from 'node:fs';

const path = process.argv[2];
if (!path) { console.error('usage: aggregate-moodfit.mjs <rankings.jsonl>'); process.exit(2); }

const rows = readFileSync(path, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
const totals = {}, perBrief = {};

for (const r of rows) {
  perBrief[r.brief] = perBrief[r.brief] || {};
  r.ranking.forEach((label, idx) => {
    const name = r.map[label];
    const pts = r.ranking.length - 1 - idx;
    totals[name] = (totals[name] || 0) + pts;
    perBrief[r.brief][name] = (perBrief[r.brief][name] || 0) + pts;
  });
}

console.log(`${rows.length} ranking(s)\n`);
for (const [brief, scores] of Object.entries(perBrief)) {
  const line = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([n, p]) => `${n}:${p}`).join('  ');
  console.log(`  ${brief.padEnd(24)}${line}`);
}
console.log('\ntotal (Borda):');
for (const [name, pts] of Object.entries(totals).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${name.padEnd(12)}${pts}`);
}
