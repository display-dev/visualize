#!/usr/bin/env node
// Builds the standalone (publishable) variant of the swipe UI: all
// candidates inlined, verdicts in localStorage, touch-first, and a
// "Copy results" button that exports a compact verdict string to paste
// back into an agent session (decoded by ingest-paste.mjs).
//
// For phone/away-from-keyboard curation via display.dev; the localhost
// swipe-server.mjs flow stays the at-desk path (writes verdicts.jsonl
// directly). The exported string is positional over the committed
// candidates.jsonl order, guarded by an FNV-1a hash of the candidate ids
// so a regenerated set can't be mis-ingested.
//
// Usage:
//   node dev-scripts/palette-curate/build-standalone.mjs [out.html]
//   (default out: temp/seed-swipe.html — gitignored; publish with dsp)

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const PALETTE = join(REPO, 'visualize', 'scripts', 'palette.mjs');
const OUT = process.argv[2] || join(REPO, 'temp', 'seed-swipe.html');

const candidates = readFileSync(join(__dirname, 'data', 'candidates.jsonl'), 'utf8')
  .trim().split('\n').map((l) => JSON.parse(l));
const existing = execFileSync(process.execPath, [PALETTE, '--list'], { encoding: 'utf8' })
  .trim().split('\n').map((line) => {
    const [id, zone, polarity, ...rest] = line.split(/\s+/);
    return { id, zone, polarity, oklch: rest.join(' ') };
  });

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
const setHash = fnv1a(candidates.map((c) => c.id).join(','));

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Seed swipe</title>
<style>
  * { box-sizing: border-box; margin: 0; -webkit-tap-highlight-color: transparent; }
  body { font: 14px/1.45 ui-monospace, "SF Mono", Menlo, monospace; background: #ececeb; color: #1c1c1b;
         padding: 14px 14px calc(86px + env(safe-area-inset-bottom)); max-width: 1020px; margin: 0 auto; }
  header { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap; }
  header h1 { font-size: 15px; font-weight: 600; }
  .meta { color: #6b6b68; font-size: 12px; }
  .meta b { color: #1c1c1b; }
  .copybtn { font: 600 12px/1 inherit; padding: 8px 13px; border-radius: 7px; border: 1px solid #c9c9c6; background: #fff; cursor: pointer; }
  .card { background: #fff; border: 1px solid #d6d6d3; border-radius: 12px; overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,.05); touch-action: pan-y; will-change: transform; }
  .cardhead { display: flex; gap: 8px; align-items: center; padding: 10px 14px; border-bottom: 1px solid #ececea; font-size: 11px; flex-wrap: wrap; min-width: 0; }\n  .cardhead .oklch { overflow: hidden; text-overflow: ellipsis; }
  .swatch { width: 24px; height: 24px; border-radius: 6px; border: 1px solid rgba(0,0,0,.12); flex: none; }
  .chip { background: #f1f1ef; border-radius: 99px; padding: 2px 8px; color: #555; white-space: nowrap; }
  .oklch { color: #6b6b68; }
  .panels { display: grid; grid-template-columns: 1fr; }
  @media (min-width: 760px) { .panels { grid-template-columns: 1fr 1fr; } }
  .panel { padding: 20px 22px; display: flex; flex-direction: column; gap: 11px; min-height: 188px; }
  .panel .rule { width: 40px; height: 4px; border-radius: 2px; }
  .panel h2 { font-size: 18px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em; }
  .panel p { font-size: 12.5px; max-width: 38ch; }
  .row { display: flex; gap: 9px; align-items: center; flex-wrap: wrap; }
  .btn { border: 0; border-radius: 7px; padding: 8px 15px; font: 600 12.5px/1 inherit; }
  .pill { border-radius: 99px; padding: 3px 10px; font-size: 11.5px; border: 1.5px solid; }
  .lnk { font-size: 12.5px; text-decoration: underline; text-underline-offset: 3px; }
  .zonectx { padding: 9px 14px; border-top: 1px solid #ececea; display: flex; gap: 7px; align-items: center; font-size: 11px; color: #6b6b68; flex-wrap: wrap; }
  .dot { width: 15px; height: 15px; border-radius: 4px; border: 1px solid rgba(0,0,0,.15); flex: none; }
  .actions { position: fixed; left: 0; right: 0; bottom: 0; padding: 12px 14px calc(12px + env(safe-area-inset-bottom));
             background: rgba(236,236,235,.94); backdrop-filter: blur(6px); border-top: 1px solid #d6d6d3; }
  .actions-inner { display: grid; grid-template-columns: 1fr 84px 1fr; gap: 10px; max-width: 560px; margin: 0 auto; }
  .actions button { font: 600 14px/1 inherit; padding: 14px 0; border-radius: 10px; border: 1px solid #c9c9c6; background: #fff; cursor: pointer; min-width: 0; }
  .actions .keep { border-color: #2c7a3f; color: #2c7a3f; }
  .actions .kill { border-color: #a33; color: #a33; }
  .actions .undo { color: #555; }
  .hint { text-align: center; color: #8a8a86; font-size: 11px; margin-top: 10px; }
  .done { background: #fff; border: 1px solid #d6d6d3; border-radius: 12px; padding: 22px; }
  .done h2 { margin-bottom: 10px; font-size: 17px; }
  table { border-collapse: collapse; font-size: 12px; margin: 8px 0 14px; }
  td, th { padding: 3px 12px 3px 0; text-align: left; }
  textarea { width: 100%; font: 11px/1.4 inherit; border: 1px solid #d6d6d3; border-radius: 7px; padding: 8px; height: 74px; color: #555; }
  .bigcopy { display: block; width: 100%; margin: 10px 0; font: 600 14px/1 inherit; padding: 14px; border-radius: 10px; border: 1px solid #2c7a3f; color: #2c7a3f; background: #fff; cursor: pointer; }
  .toast { position: fixed; top: 14px; left: 50%; transform: translateX(-50%); background: #1c1c1b; color: #fff;
           padding: 9px 16px; border-radius: 8px; font-size: 12.5px; opacity: 0; transition: opacity .2s; pointer-events: none; z-index: 9; }
  .toast.show { opacity: 1; }
  .resetlink { color: #a33; font-size: 11px; text-decoration: underline; cursor: pointer; }
</style>
</head>
<body>
<header>
  <h1>seed swipe</h1>
  <div class="meta" id="progress"></div>
  <button class="copybtn" onclick="copyResults()">Copy results</button>
</header>
<div id="stage"></div>
<div class="hint">swipe the card → keep / ← kill (or use the buttons) · results live in this browser — Copy results anytime and paste the string back into the Claude session</div>
<div class="actions" id="actions"><div class="actions-inner">
  <button class="kill" onclick="judge('kill')">← kill</button>
  <button class="undo" onclick="undo()">undo</button>
  <button class="keep" onclick="judge('keep')">keep →</button>
</div></div>
<div class="toast" id="toast"></div>
<script>
const SET_HASH = ${JSON.stringify(setHash)};
const CANDIDATES = ${JSON.stringify(candidates)};
const EXISTING = ${JSON.stringify(existing)};
const LS_KEY = 'palette-swipe-v1:' + SET_HASH;

let verdicts = {};
try { verdicts = JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch {}
let queue = CANDIDATES.filter((c) => !(c.id in verdicts));
let judgedStack = [];

function save() { localStorage.setItem(LS_KEY, JSON.stringify(verdicts)); }

function parseOklch(str) {
  const m = /oklch\\(([\\d.]+) ([\\d.]+) ([\\d.]+)\\)/.exec(str);
  return { L: +m[1], C: +m[2], H: +m[3] };
}

function card(c) {
  const { H } = parseOklch(c.oklch);
  const n = c.neutralChroma, seed = c.oklch;
  const onSeed = c.textOnSolid === 'white' ? 'oklch(0.99 0.005 ' + H + ')' : 'oklch(0.18 0.012 ' + H + ')';
  const lightInk = 'oklch(0.26 ' + n + ' ' + H + ')';
  const lightMuted = 'oklch(0.54 ' + n + ' ' + H + ')';
  const darkBg = 'oklch(0.19 ' + n + ' ' + H + ')';
  const darkInk = 'oklch(0.93 0.01 ' + H + ')';
  const darkMuted = 'oklch(0.78 0.015 ' + H + ')';
  const zoneSeeds = EXISTING.filter((s) => s.zone === c.zone);
  const kept = CANDIDATES.filter((x) => verdicts[x.id] === 'keep' && x.zone === c.zone);
  return '<div class="card" id="card">'
    + '<div class="cardhead"><div class="swatch" style="background:' + seed + '"></div>'
    + '<span class="oklch">' + seed + '</span>'
    + '<span class="chip">' + c.zone + ' · ' + c.band + '</span>'
    + '<span class="chip">text: ' + c.textOnSolid + '</span></div>'
    + '<div class="panels">'
    + panel('#fff', lightInk, lightMuted, seed, onSeed, 'light')
    + panel(darkBg, darkInk, darkMuted, seed, onSeed, 'dark')
    + '</div>'
    + '<div class="zonectx"><span>' + c.zone + ' today:</span>'
    + zoneSeeds.map((s) => '<span class="dot" style="background:' + s.oklch + '"></span>').join('')
    + '<span>' + (zoneSeeds.map((s) => s.id).join(', ') || 'empty') + '</span>'
    + '<span style="margin-left:auto">kept here: <b>' + kept.length + '</b></span></div></div>';
}

function panel(bg, ink, muted, seed, onSeed, label) {
  return '<div class="panel" style="background:' + bg + ';color:' + ink + '">'
    + '<div class="rule" style="background:' + seed + '"></div>'
    + '<h2>Quarterly platform review</h2>'
    + '<p style="color:' + muted + '">Body copy in the tinted neutral this seed derives (' + label + ' scaffold).</p>'
    + '<div class="row"><button class="btn" style="background:' + seed + ';color:' + onSeed + '">Primary action</button>'
    + '<span class="pill" style="border-color:' + seed + ';color:' + seed + '">status: live</span>'
    + '<span class="lnk" style="color:' + seed + '">Read the change</span></div></div>';
}

function doneScreen() {
  const zones = {};
  for (const c of CANDIDATES) {
    zones[c.zone] = zones[c.zone] || { keep: 0, kill: 0 };
    if (verdicts[c.id]) zones[c.zone][verdicts[c.id]]++;
  }
  const keeps = Object.values(verdicts).filter((v) => v === 'keep').length;
  const rows = Object.entries(zones).map(([z, n]) => '<tr><td>' + z + '</td><td>' + n.keep + '</td><td>' + n.kill + '</td></tr>').join('');
  return '<div class="done"><h2>Done — ' + keeps + ' keeps of ' + CANDIDATES.length + '</h2>'
    + '<table><tr><th>zone</th><th>keep</th><th>kill</th></tr>' + rows + '</table>'
    + '<button class="bigcopy" onclick="copyResults()">Copy results → paste into the Claude session</button>'
    + '<textarea readonly id="exportbox" onclick="this.select()">' + exportString() + '</textarea>'
    + '<p style="margin-top:10px;color:#6b6b68;font-size:12px">If copy fails, long-press the box above and copy manually. (undo still works) · <span class="resetlink" onclick="resetAll()">reset all verdicts</span></p>'
    + '</div>';
}

function exportString() {
  const data = CANDIDATES.map((c) => verdicts[c.id] === 'keep' ? 'K' : verdicts[c.id] === 'kill' ? 'X' : '.').join('');
  const judged = Object.keys(verdicts).length;
  const keeps = Object.values(verdicts).filter((v) => v === 'keep').length;
  return 'PALETTE-SWIPE-V1 set=' + SET_HASH + ' judged=' + judged + ' keep=' + keeps + ' data=' + data;
}

async function copyResults() {
  const s = exportString();
  let ok = false;
  try { await navigator.clipboard.writeText(s); ok = true; } catch {}
  if (!ok) {
    const ta = document.createElement('textarea');
    ta.value = s; document.body.appendChild(ta); ta.select();
    try { ok = document.execCommand('copy'); } catch {}
    ta.remove();
  }
  toast(ok ? 'copied — paste it into the Claude session' : 'copy blocked — use the text box on the end screen');
  const box = document.getElementById('exportbox');
  if (box) box.value = s;
}

function resetAll() {
  if (!confirm('Wipe all ' + Object.keys(verdicts).length + ' verdicts on this device?')) return;
  verdicts = {}; save();
  queue = CANDIDATES.slice(); judgedStack = [];
  render();
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function render() {
  const judged = Object.keys(verdicts).length;
  const keeps = Object.values(verdicts).filter((v) => v === 'keep').length;
  document.getElementById('progress').innerHTML = '<b>' + judged + '</b>/' + CANDIDATES.length + ' · <b>' + keeps + '</b> kept';
  document.getElementById('stage').innerHTML = queue.length ? card(queue[0]) : doneScreen();
  document.getElementById('actions').style.display = queue.length ? 'flex' : 'none';
  if (queue.length) attachSwipe();
}

function judge(verdict) {
  if (!queue.length) return;
  const c = queue.shift();
  verdicts[c.id] = verdict;
  judgedStack.push(c.id);
  save();
  render();
}

function undo() {
  const id = judgedStack.pop();
  if (!id) { toast('nothing to undo in this session'); return; }
  delete verdicts[id];
  save();
  queue.unshift(CANDIDATES.find((x) => x.id === id));
  render();
}

function attachSwipe() {
  const el = document.getElementById('card');
  let startX = null, dx = 0;
  el.addEventListener('pointerdown', (e) => { startX = e.clientX; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', (e) => {
    if (startX == null) return;
    dx = e.clientX - startX;
    el.style.transform = 'translateX(' + dx + 'px) rotate(' + dx / 40 + 'deg)';
    el.style.opacity = String(Math.max(0.4, 1 - Math.abs(dx) / 400));
  });
  const end = () => {
    if (startX == null) return;
    if (dx > 80) judge('keep');
    else if (dx < -80) judge('kill');
    else { el.style.transform = ''; el.style.opacity = ''; }
    startX = null; dx = 0;
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') judge('keep');
  else if (e.key === 'ArrowLeft') judge('kill');
  else if (e.key === 'z') undo();
});

render();
</script>
</body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`wrote ${OUT} (${(html.length / 1024).toFixed(0)}KB, ${candidates.length} candidates, set=${setHash})`);
