#!/usr/bin/env node
// print-check.mjs — verify the slide-canvas print-to-PDF contract owned
// by the <slide-canvas> component.
//
// For each variant, asserts:
//   (a) pageCount == slideCount (one printed page per <section> slide)
//   (b) no slide's printed bounding box exceeds the design canvas
//       (1920×1080) — a slide must fit cleanly on one page, no
//       overflow into a follower page
//
// Chrome resolution mirrors browser-contrast.mjs: prefers a locally
// installed Google Chrome (channel: stable), falls back to a managed
// Chromium downloaded via @puppeteer/browsers into the same cache
// directory the sidecar already uses.
//
// Usage:
//   node visualize/scripts/print-check.mjs ./variant.html
//   node visualize/scripts/print-check.mjs --strict ./a.html ./b.html
//   node visualize/scripts/print-check.mjs --all          (slide-canvas fixtures from manifest.json)
//   node visualize/scripts/print-check.mjs --all --strict (CI shape)
//
// Env vars:
//   VISUALIZE_PUPPETEER_CACHE_DIR    Override the managed-Chromium cache.
//                                    Default: ~/.cache/visualize-skill/puppeteer/
//   VISUALIZE_SKIP_SYSTEM_CHROME=1   Force the managed-install path.
//
// Exit codes:
//   0 — clean (or assertions failed but --strict not set)
//   1 — unreadable input / Chrome acquisition failure / browser crash
//   2 — assertion failure with --strict

import { existsSync, readFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  Browser,
  BrowserTag,
  computeSystemExecutablePath,
  detectBrowserPlatform,
  install,
  puppeteer,
  resolveBuildId,
} from './vendor/puppeteer.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..', '..');

const DEFAULT_DESIGN_W = 1920;
const DEFAULT_DESIGN_H = 1080;
// Sub-pixel rendering tolerance — Chrome occasionally rounds rects by
// fractions of a pixel; treat anything within 0.5px as "fits exactly."
const OVERFLOW_TOLERANCE_PX = 0.5;

const CACHE_DIR =
  process.env.VISUALIZE_PUPPETEER_CACHE_DIR ||
  join(homedir(), '.cache', 'visualize-skill', 'puppeteer');

async function resolveChromeExecutable() {
  if (process.env.VISUALIZE_SKIP_SYSTEM_CHROME !== '1') {
    try {
      return computeSystemExecutablePath({
        browser: Browser.CHROME,
        channel: 'stable',
      });
    } catch {
      // Fall through to managed install.
    }
  }
  const platform = detectBrowserPlatform();
  if (!platform) {
    throw new Error('unsupported platform for managed Chromium fallback');
  }
  const buildId = await resolveBuildId(Browser.CHROME, platform, BrowserTag.STABLE);
  const result = await install({
    browser: Browser.CHROME,
    cacheDir: CACHE_DIR,
    buildId,
    buildIdAlias: BrowserTag.STABLE,
  });
  return result.executablePath;
}

// Count Page objects in a Chrome-generated PDF byte stream. Two paths:
//   1. Direct: regex on `/Type /Page` excluding `/Type /Pages` (the
//      page-tree root). Works when Chrome leaves objects uncompressed
//      at the object-stream level.
//   2. Fallback: read the page-tree root's `/Count N` entry. PDF spec
//      guarantees `/Pages` dict carries the leaf count.
//
// page.pdf() returns a Uint8Array (not a Buffer); Uint8Array.toString()
// emits a comma-separated decimal list ("37,80,68,..."), so wrap in
// Buffer.from() before decoding to latin1.
function countPdfPages(uint8) {
  const text = Buffer.from(uint8).toString('latin1');
  const direct = text.match(/\/Type\s*\/Page(?!s)/g);
  if (direct && direct.length > 0) return direct.length;
  const fallback = text.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/);
  if (fallback) return parseInt(fallback[1], 10);
  return 0;
}

async function checkFile(browser, filePath) {
  const page = await browser.newPage();
  try {
    // Fixed viewport so the in-page transform-scale never gets in the
    // way of bounding-box measurement. The print CSS removes the
    // transform anyway, but consistent viewport keeps the screen-mode
    // first-load layout stable across runs.
    await page.setViewport({ width: DEFAULT_DESIGN_W, height: DEFAULT_DESIGN_H });
    const fileUrl = pathToFileURL(resolve(filePath)).href;
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);

    const probe = await page.evaluate(() => {
      const stage = document.querySelector('slide-canvas');
      if (!stage) return { reason: 'no <slide-canvas> element in document' };
      if (!customElements.get('slide-canvas')) {
        return { reason: '<slide-canvas> custom element is not defined (component script did not load or threw)' };
      }
      const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
      if (!canvas) {
        return { reason: '<slide-canvas> did not wrap children in .slide-canvas-canvas (connectedCallback did not run or failed)' };
      }
      const slideCount = Array.from(canvas.children).filter((el) => el.tagName === 'SECTION').length;
      // Belt-and-braces: the component exposes total on the instance.
      // If it disagrees with the canvas-child count, the contract is
      // broken in a way we want to surface.
      const reported = typeof stage.total === 'number' ? stage.total : null;
      if (reported !== null && reported !== slideCount) {
        return { reason: `slideCanvas.total (${reported}) disagrees with <section> count in canvas (${slideCount})` };
      }
      const width = parseInt(stage.getAttribute('width') || '', 10);
      const height = parseInt(stage.getAttribute('height') || '', 10);
      return {
        slideCount,
        designWidth: Number.isFinite(width) && width > 0 ? width : 1920,
        designHeight: Number.isFinite(height) && height > 0 ? height : 1080,
      };
    });

    if (probe.reason) {
      return { ok: false, reason: probe.reason };
    }
    const slideCount = probe.slideCount;
    const designW = probe.designWidth;
    const designH = probe.designHeight;
    if (slideCount === 0) {
      return { ok: false, reason: 'no <section> slides found inside .slide-canvas-canvas' };
    }

    // Emulate print media for the rect measurement so we observe the
    // same layout the PDF will use.
    await page.emulateMediaType('print');

    const printChrome = await page.evaluate(() => {
      const hidden = Array.from(document.body.children)
        .filter((el) => el.tagName !== 'SLIDE-CANVAS')
        .every((el) => getComputedStyle(el).display === 'none');
      const overlay = document.querySelector('slide-canvas .slide-canvas-overlay');
      const overlayHidden = !overlay || getComputedStyle(overlay).display === 'none';
      return { hidden, overlayHidden };
    });
    if (!printChrome.hidden || !printChrome.overlayHidden) {
      return {
        ok: false,
        reason: `print chrome visibility failed: pageChromeHidden=${printChrome.hidden}, overlayHidden=${printChrome.overlayHidden}`,
      };
    }

    const overflows = await page.evaluate((designW, designH, tolerance) => {
      const stage = document.querySelector('slide-canvas');
      const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
      const canvasRect = canvas.getBoundingClientRect();
      const slides = Array.from(canvas.children).filter((el) => el.tagName === 'SECTION');
      const round1 = (n) => Math.round(n * 10) / 10;
      const offenders = [];
      slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();
        // Each slide's expected print slot is the i'th authored-size
        // rectangle inside the canvas (sections stack via
        // `position: relative` + `break-after: page` in print).
        // Compare against the slot, not the whole canvas — otherwise
        // a vertical shift like `transform: translateY(10px)` spills
        // into the next page but stays within the full canvas height
        // (slideCount × 1080) and is missed.
        const slotLeft = canvasRect.left;
        const slotTop = canvasRect.top + i * designH;
        const slotRight = slotLeft + designW;
        const slotBottom = slotTop + designH;
        const overflowLeft = slotLeft - rect.left;
        const overflowTop = slotTop - rect.top;
        const overflowRight = rect.right - slotRight;
        const overflowBottom = rect.bottom - slotBottom;
        const sides = [];
        if (overflowLeft > tolerance) sides.push(`left+${round1(overflowLeft)}`);
        if (overflowTop > tolerance) sides.push(`top+${round1(overflowTop)}`);
        if (overflowRight > tolerance) sides.push(`right+${round1(overflowRight)}`);
        if (overflowBottom > tolerance) sides.push(`bottom+${round1(overflowBottom)}`);
        if (sides.length > 0) {
          offenders.push({
            index: i,
            width: round1(rect.width),
            height: round1(rect.height),
            sides: sides.join(','),
          });
        }
      });
      return offenders;
    }, designW, designH, OVERFLOW_TOLERANCE_PX);

    if (overflows.length > 0) {
      const detail = overflows
        .map((o) => `slide ${o.index + 1} ${o.width}×${o.height} [${o.sides}]`)
        .join(', ');
      return {
        ok: false,
        reason: `${overflows.length} slide(s) exceed the ${designW}×${designH} canvas: ${detail}`,
      };
    }

    const pdfBuffer = await page.pdf({
      width: `${designW}px`,
      height: `${designH}px`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      // Honour the component's `@page { size: 1920px 1080px }` rule;
      // the width/height options are a fallback when CSS is missing.
      preferCSSPageSize: true,
    });
    const pageCount = countPdfPages(pdfBuffer);

    if (pageCount !== slideCount) {
      return {
        ok: false,
        reason: `pageCount(${pageCount}) != slideCount(${slideCount})`,
      };
    }

    return { ok: true, pageCount, slideCount };
  } finally {
    await page.close().catch(() => {});
  }
}

function collectAllSlideCanvasFixtures() {
  const manifestPath = resolve(REPO_ROOT, 'visualize', 'fixtures', 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  return (manifest.shellFixtures || [])
    .filter((entry) => entry.shell === 'slide-canvas')
    .map((entry) => resolve(REPO_ROOT, 'visualize', 'fixtures', entry.file))
    .sort();
}

function printUsage() {
  console.log(`Usage:
  node visualize/scripts/print-check.mjs [--strict] <file.html> [<file2.html> ...]
  node visualize/scripts/print-check.mjs --all [--strict]

Asserts pageCount == slideCount and no slide's printed bounding box
exceeds the authored design canvas.

Exit codes:
  0 — clean (or failures without --strict)
  1 — unreadable input / Chrome acquisition / browser crash
  2 — failures present with --strict
`);
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  let strict = false;
  let all = false;
  const files = [];
  for (const a of argv) {
    if (a === '--strict') strict = true;
    else if (a === '--all') all = true;
    else if (a.startsWith('--')) {
      console.error(`error: unknown flag: ${a}`);
      process.exit(1);
    } else {
      files.push(a);
    }
  }

  if (all) {
    files.push(...collectAllSlideCanvasFixtures());
  }

  if (files.length === 0) {
    if (all) {
      console.error('error: --all did not find any slide-canvas fixtures in visualize/fixtures/manifest.json');
      process.exit(1);
    }
    printUsage();
    process.exit(0);
  }

  for (const f of files) {
    if (!existsSync(f)) {
      console.error(`error: file not found: ${f}`);
      process.exit(1);
    }
    if (!statSync(f).isFile()) {
      console.error(`error: not a file: ${f}`);
      process.exit(1);
    }
  }

  const startedAt = Date.now();

  let executablePath;
  try {
    executablePath = await resolveChromeExecutable();
  } catch (err) {
    console.error(`error: could not resolve Chrome: ${err.message}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ executablePath, headless: true });

  let okCount = 0;
  let failures = 0;

  try {
    for (const file of files) {
      let result;
      try {
        result = await checkFile(browser, file);
      } catch (err) {
        if (!browser.isConnected()) {
          console.error(`error: browser disconnected mid-run: ${err.message}`);
          await browser.close().catch(() => {});
          process.exit(1);
        }
        failures += 1;
        console.error(`FAIL  ${basename(file)}  ${err.message}`);
        continue;
      }
      if (result.ok) {
        okCount += 1;
        console.log(`OK    ${basename(file)}  ${result.pageCount} pages, ${result.slideCount} slides`);
      } else {
        failures += 1;
        console.error(`FAIL  ${basename(file)}  ${result.reason}`);
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

  const durationMs = Date.now() - startedAt;
  console.log(`\n${okCount}/${files.length} clean · ${failures} failed · ${durationMs}ms`);

  if (failures > 0 && strict) process.exit(2);
  process.exit(0);
}

main().catch((err) => {
  console.error(`error: ${err.message}`);
  process.exit(1);
});
