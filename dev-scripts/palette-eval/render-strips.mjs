#!/usr/bin/env node
// Renders a composed tokens.css into a fixed-layout brand strip (light +
// dark halves: heading, body, muted, primary button, accent pill, chart
// row, destructive chip) so mood-fit judges compare palettes on identical
// structure — the only variable is the color system.
//
// Usage:
//   node dev-scripts/palette-eval/render-strips.mjs <tokens.css> <out.html> [--shot <out.png>]
//
// --shot screenshots via headless Chrome (system binary; no puppeteer).

import { readFileSync, writeFileSync } from 'node:fs';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const [tokensPath, outPath] = process.argv.slice(2);
const shotIdx = process.argv.indexOf('--shot');
const shotPath = shotIdx >= 0 ? process.argv[shotIdx + 1] : null;
if (!tokensPath || !outPath) {
  console.error('usage: render-strips.mjs <tokens.css> <out.html> [--shot <out.png>]');
  process.exit(2);
}

const raw = readFileSync(tokensPath, 'utf8');
const css = /<style/i.test(raw)
  ? [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n')
  : raw;

function blockTokens(selectorRe) {
  const m = selectorRe.exec(css);
  if (!m) return {};
  const out = {};
  for (const d of m[1].matchAll(/--([\w-]+)\s*:\s*([^;}]+)/g)) out[d[1]] = d[2].trim();
  return out;
}
const light = blockTokens(/:root[^{]*\{([^}]*)\}/);
const dark = blockTokens(/\[data-theme=["']?dark["']?\][^{]*\{([^}]*)\}/);

const get = (t, name, fb) => t[name] || fb;
function half(t, label) {
  const bg = get(t, 'background', '#fff');
  const fg = get(t, 'foreground', '#111');
  const muted = get(t, 'muted-foreground', fg);
  const primary = get(t, 'primary', fg);
  const pfg = get(t, 'primary-foreground', bg);
  const accent = get(t, 'accent', primary);
  const afg = get(t, 'accent-foreground', fg);
  const border = get(t, 'border', muted);
  const destructive = get(t, 'destructive', '#c00');
  const dfg = get(t, 'destructive-foreground', '#fff');
  const charts = [1, 2, 3, 4, 5].map((i) => get(t, `chart-${i}`, primary));
  return `
  <section style="background:${bg};color:${fg};padding:34px 38px;display:flex;flex-direction:column;gap:16px">
    <div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${muted}">${label}</div>
    <h1 style="margin:0;font-size:26px;line-height:1.15;letter-spacing:-0.01em">Quarterly platform review</h1>
    <p style="margin:0;max-width:52ch;font-size:14px;line-height:1.5">Sixty days of measured rollout. The numbers below are real, the chrome is not the point — read whether this brand fits the brief.</p>
    <p style="margin:0;max-width:52ch;font-size:13px;color:${muted}">Secondary copy in the muted role. It should recede without disappearing.</p>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <span style="background:${primary};color:${pfg};border-radius:7px;padding:9px 18px;font-size:13px;font-weight:600">Primary action</span>
      <span style="background:${accent};color:${afg};border-radius:99px;padding:5px 12px;font-size:12px">accent surface</span>
      <span style="background:${destructive};color:${dfg};border-radius:99px;padding:5px 12px;font-size:12px">sev-1</span>
      <span style="color:${primary};font-size:13px;text-decoration:underline;text-underline-offset:3px">Inline link</span>
    </div>
    <div style="display:flex;gap:6px;align-items:flex-end;height:64px;border-bottom:1px solid ${border};padding-bottom:0">
      ${charts.map((c, i) => `<div style="background:${c};width:34px;height:${[58, 40, 50, 28, 44][i]}px;border-radius:3px 3px 0 0"></div>`).join('')}
    </div>
    <div style="border:1px solid ${border};border-radius:8px;padding:12px 14px;font-size:12.5px;color:${muted}">Card surface · border + muted text + <b style="color:${fg}">emphasis</b></div>
  </section>`;
}

const html = `<!doctype html><html><head><meta charset="utf-8"><title>strip</title>
<style>body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}</style></head>
<body><div style="display:grid;grid-template-columns:1fr 1fr;width:980px">${half(light, 'light')}${half(dark, 'dark')}</div></body></html>`;
writeFileSync(outPath, html);
console.log(`wrote ${outPath}`);

if (shotPath) {
  const chromes = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'google-chrome', 'chromium',
  ];
  const chrome = chromes.find((c) => c.includes('/') ? existsSync(c) : true);
  try {
    execFileSync(chrome, [
      '--headless=new', `--screenshot=${shotPath}`, '--window-size=1000,760',
      '--hide-scrollbars', '--default-background-color=00000000', `file://${process.cwd()}/${outPath.startsWith('/') ? '' : ''}${outPath}`,
    ], { stdio: 'pipe' });
    console.log(`wrote ${shotPath}`);
  } catch (e) {
    console.error(`screenshot failed (${chrome}): ${e.message}`);
    process.exit(1);
  }
}
