#!/usr/bin/env node
// Stage 2 of the seed-curation pipeline: the human tinder-pass.
//
// Serves a keyboard-driven swipe UI for judging seed candidates in context
// (light + dark scaffolds, real button/pill/link usage — not naked
// swatches). Verdicts append to data/verdicts.jsonl: one JSON object per
// line, last verdict per candidate wins, `undo` clears. The file is the
// curation taste record and gets committed with the resulting seeds.
//
// Usage:
//   node dev-scripts/palette-curate/swipe-server.mjs            # http://127.0.0.1:4747
//   node dev-scripts/palette-curate/swipe-server.mjs --port 5050
//
// Keys in the UI:  ← kill   → keep   z undo
//
// Stateless beyond the JSONL: stop and restart any time; judged candidates
// don't reappear.

import { createServer } from 'node:http';
import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const PALETTE = join(REPO, 'visualize', 'scripts', 'palette.mjs');
const DATA = join(__dirname, 'data');
const CANDIDATES = join(DATA, 'candidates.jsonl');
const VERDICTS = join(DATA, 'verdicts.jsonl');

const portIdx = process.argv.indexOf('--port');
const PORT = portIdx >= 0 ? parseInt(process.argv[portIdx + 1], 10) : 4747;

if (!existsSync(CANDIDATES)) {
  console.error('no candidates.jsonl — run generate-candidates.mjs first');
  process.exit(1);
}
mkdirSync(DATA, { recursive: true });

function readJsonl(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

function state() {
  const candidates = readJsonl(CANDIDATES);
  const verdictLog = readJsonl(VERDICTS);
  const verdicts = {};
  let lastJudged = null;
  for (const v of verdictLog) {
    if (v.verdict === 'undo') { delete verdicts[v.id]; lastJudged = null; }
    else { verdicts[v.id] = v.verdict; lastJudged = v.id; }
  }
  const existing = execFileSync(process.execPath, [PALETTE, '--list'], { encoding: 'utf8' })
    .trim().split('\n').map((line) => {
      const [id, zone, polarity, ...rest] = line.split(/\s+/);
      return { id, zone, polarity, oklch: rest.join(' ') };
    });
  return { candidates, verdicts, lastJudged, existing };
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(readFileSync(join(__dirname, 'swipe.html'), 'utf8'));
    return;
  }
  if (req.method === 'GET' && url.pathname === '/api/state') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(state()));
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/verdict') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      try {
        const { id, verdict } = JSON.parse(body);
        if (typeof id !== 'string' || !['keep', 'kill', 'undo'].includes(verdict)) {
          res.writeHead(400); res.end('bad verdict'); return;
        }
        appendFileSync(VERDICTS, JSON.stringify({ ts: new Date().toISOString(), id, verdict }) + '\n');
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end('{"ok":true}');
      } catch {
        res.writeHead(400); res.end('bad json');
      }
    });
    return;
  }
  res.writeHead(404); res.end('not found');
});

server.listen(PORT, '127.0.0.1', () => {
  const { candidates, verdicts } = state();
  const judged = Object.keys(verdicts).length;
  console.log(`swipe UI → http://127.0.0.1:${PORT}`);
  console.log(`${candidates.length} candidates, ${judged} already judged, ${candidates.length - judged} to go`);
  console.log('keys: ← kill · → keep · z undo');
});
