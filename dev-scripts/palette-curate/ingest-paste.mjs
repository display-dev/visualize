#!/usr/bin/env node
// Decodes a verdict string copied from the published (standalone) swipe
// artifact and appends the verdicts to data/verdicts.jsonl.
//
// The string is positional over data/candidates.jsonl order:
//   PALETTE-SWIPE-V1 set=<fnv1a-of-candidate-ids> judged=<n> keep=<k> data=<K|X|. x N>
// K = keep, X = kill, . = unjudged (skipped). The set hash must match the
// current candidates.jsonl — a regenerated candidate set refuses the paste
// instead of mis-assigning verdicts.
//
// Usage:
//   node dev-scripts/palette-curate/ingest-paste.mjs 'PALETTE-SWIPE-V1 set=... data=...'
//   pbpaste | node dev-scripts/palette-curate/ingest-paste.mjs

import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CANDIDATES = join(__dirname, 'data', 'candidates.jsonl');
const VERDICTS = join(__dirname, 'data', 'verdicts.jsonl');

const input = (process.argv[2] || readFileSync(0, 'utf8')).trim();
const m = /PALETTE-SWIPE-V1\s+set=([0-9a-f]{8})\s+judged=(\d+)\s+keep=(\d+)\s+data=([KX.]+)/.exec(input);
if (!m) {
  console.error('input does not contain a PALETTE-SWIPE-V1 verdict string');
  process.exit(2);
}
const [, setHash, judgedClaim, keepClaim, data] = m;

const candidates = readFileSync(CANDIDATES, 'utf8').trim().split('\n').map((l) => JSON.parse(l));

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
const expected = fnv1a(candidates.map((c) => c.id).join(','));
if (setHash !== expected) {
  console.error(`set hash mismatch: paste is for candidate set ${setHash}, local candidates.jsonl is ${expected} — refusing to mis-assign positional verdicts`);
  process.exit(2);
}
if (data.length !== candidates.length) {
  console.error(`data length ${data.length} != ${candidates.length} candidates`);
  process.exit(2);
}

let keep = 0, kill = 0;
const ts = new Date().toISOString();
const lines = [];
for (let i = 0; i < data.length; i++) {
  const ch = data[i];
  if (ch === '.') continue;
  const verdict = ch === 'K' ? 'keep' : 'kill';
  if (verdict === 'keep') keep++; else kill++;
  lines.push(JSON.stringify({ ts, id: candidates[i].id, verdict, source: 'paste' }));
}
if (parseInt(judgedClaim, 10) !== keep + kill || parseInt(keepClaim, 10) !== keep) {
  console.error(`header counts (judged=${judgedClaim} keep=${keepClaim}) disagree with data (judged=${keep + kill} keep=${keep}) — corrupted paste?`);
  process.exit(2);
}

const before = existsSync(VERDICTS) ? readFileSync(VERDICTS, 'utf8') : '';
appendFileSync(VERDICTS, lines.join('\n') + '\n');
console.log(`ingested ${keep + kill} verdicts (${keep} keep / ${kill} kill)${before ? ' — appended after existing entries (last verdict per id wins)' : ''}`);
console.log('next: node dev-scripts/palette-curate/coverage.mjs');
