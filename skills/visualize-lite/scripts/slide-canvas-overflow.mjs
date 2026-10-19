#!/usr/bin/env node
// slide-canvas-overflow.mjs — validate slide-canvas screen-mode slide text.
//
// Checks every slide-canvas slide tagged with:
//   data-visualize-validate="no-overflowing-text no-overflowing-content no-overlapping-text slide-sized-text"
//
// Usage:
//   node visualize/scripts/slide-canvas-overflow.mjs ./variant.html
//   node visualize/scripts/slide-canvas-overflow.mjs --strict ./a.html ./b.html
//   node visualize/scripts/slide-canvas-overflow.mjs --all --strict
//   node visualize/scripts/slide-canvas-overflow.mjs --self-test
//
// Exit codes:
//   0 — clean (or findings without --strict)
//   1 — unreadable input / Chrome acquisition failure / browser crash
//   2 — validation finding with --strict

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
const DESIGN_W = 1920;
const DESIGN_H = 1080;
const DEFAULT_VARIANT = resolve(__dirname, '..', 'fixtures', 'shells', 'slide-canvas.html');
const FIXTURE_GOOD = resolve(__dirname, 'fixtures', 'slide-canvas-overflow-good.html');
const FIXTURE_BAD = resolve(__dirname, 'fixtures', 'slide-canvas-overflow-bad.html');
const MIN_TEXT_PX = 10;
const EDGE_TOLERANCE_PX = 1;
const OVERLAP_TOLERANCE_PX = 3;

const CACHE_DIR =
  process.env.VISUALIZE_PUPPETEER_CACHE_DIR ||
  join(homedir(), '.cache', 'visualize-skill', 'puppeteer');

function parseArgs(argv) {
  const args = argv.slice(2);
  const flags = new Set(args.filter((arg) => arg.startsWith('--')));
  for (const flag of flags) {
    if (!['--all', '--strict', '--self-test', '--help', '-h'].includes(flag)) {
      throw new Error(`unknown argument: ${flag}`);
    }
  }
  return {
    all: flags.has('--all'),
    strict: flags.has('--strict'),
    selfTest: flags.has('--self-test'),
    help: flags.has('--help') || flags.has('-h'),
    files: args.filter((arg) => !arg.startsWith('--')),
  };
}

function printUsage() {
  console.log(`usage:
  node visualize/scripts/slide-canvas-overflow.mjs [--strict] [variant.html ...]
  node visualize/scripts/slide-canvas-overflow.mjs --all --strict
  node visualize/scripts/slide-canvas-overflow.mjs --self-test`);
}

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

function allSlideCanvasFixtures() {
  const manifestPath = resolve(REPO_ROOT, 'visualize', 'fixtures', 'manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  return (manifest.shellFixtures || [])
    .filter((entry) => entry.shell === 'slide-canvas')
    .map((entry) => resolve(REPO_ROOT, 'visualize', 'fixtures', entry.file))
    .sort();
}

async function checkFile(browser, filePath) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: DESIGN_W, height: DESIGN_H, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(resolve(filePath)).href, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));

    return await page.evaluate((minTextPx, edgeTolerancePx, overlapTolerancePx) => {
      const VALIDATORS = new Set(['no-overflowing-text', 'no-overflowing-content', 'no-overlapping-text', 'slide-sized-text']);
      const round1 = (n) => Math.round(n * 10) / 10;
      const stage = document.querySelector('slide-canvas');
      if (!stage) return { ok: false, infrastructure: true, findings: [{ rule: 'slide-canvas', message: 'no <slide-canvas> element in document' }] };
      if (!customElements.get('slide-canvas')) {
        return { ok: false, infrastructure: true, findings: [{ rule: 'slide-canvas', message: '<slide-canvas> custom element is not defined' }] };
      }
      stage.setAttribute('noscale', '');
      const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
      if (!canvas) {
        return { ok: false, infrastructure: true, findings: [{ rule: 'slide-canvas', message: 'missing .slide-canvas-canvas wrapper' }] };
      }

      const slides = Array.from(canvas.children).filter((el) => el.tagName === 'SECTION');
      if (slides.length === 0) {
        return { ok: false, infrastructure: true, findings: [{ rule: 'slide-canvas', message: 'no <section> slides found inside .slide-canvas-canvas' }] };
      }

      function validationTokens(slide) {
        const raw = slide.getAttribute('data-visualize-validate') || '';
        if (raw.trim() === 'none') return [];
        return raw.trim().split(/\s+/).filter((part) => VALIDATORS.has(part));
      }

      function wants(tokens, rule) {
        return tokens.includes(rule);
      }

      function visibleElement(el) {
        if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
        if (el.closest('[aria-hidden="true"], script, style, template, noscript')) return false;
        const style = getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || '1') > 0.01;
      }

      function textRects(slide) {
        const out = [];
        const walker = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!visibleElement(parent)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        });
        let node;
        while ((node = walker.nextNode())) {
          const range = document.createRange();
          range.selectNodeContents(node);
          const parent = node.parentElement;
          const style = getComputedStyle(parent);
          const fontSize = parseFloat(style.fontSize) || 0;
          const snippet = node.nodeValue.trim().replace(/\s+/g, ' ').slice(0, 80);
          for (const rect of range.getClientRects()) {
            if (rect.width <= 0.5 || rect.height <= 0.5) continue;
            out.push({
              node,
              snippet,
              fontSize,
              rect: {
                left: rect.left,
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height,
              },
            });
          }
          range.detach();
        }
        return out;
      }

      function contentRects(slide) {
        return Array.from(slide.querySelectorAll('*'))
          .filter((el) => visibleElement(el) && !el.hasAttribute('data-visualize-overflow-ok'))
          .flatMap((el) => Array.from(el.getClientRects()).map((rect) => ({
            element: el,
            label: el.getAttribute('aria-label') ||
              el.getAttribute('data-screen-label') ||
              el.className ||
              el.tagName.toLowerCase(),
            rect: {
              left: rect.left,
              top: rect.top,
              right: rect.right,
              bottom: rect.bottom,
              width: rect.width,
              height: rect.height,
            },
          })))
          .filter((entry) => entry.rect.width > 0.5 && entry.rect.height > 0.5);
      }

      function intersection(a, b) {
        const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (width <= overlapTolerancePx || height <= overlapTolerancePx) return { area: 0, ratio: 0 };
        const area = width * height;
        const smaller = Math.min(a.width * a.height, b.width * b.height);
        return { area, ratio: smaller > 0 ? area / smaller : 0 };
      }

      const findings = [];
      let skipped = 0;
      slides.forEach((slide, index) => {
        const tokens = validationTokens(slide);
        if ((slide.getAttribute('data-visualize-validate') || '').trim() === 'none') {
          skipped += 1;
          return;
        }

        const previousStates = slides.map((candidate) => ({
          el: candidate,
          inert: candidate.hasAttribute('inert'),
          visibility: candidate.style.visibility,
          opacity: candidate.style.opacity,
          pointerEvents: candidate.style.pointerEvents,
        }));
        slides.forEach((candidate) => {
          candidate.setAttribute('inert', '');
          candidate.style.visibility = 'hidden';
          candidate.style.opacity = '0';
          candidate.style.pointerEvents = 'none';
        });
        slide.removeAttribute('inert');
        slide.style.visibility = 'visible';
        slide.style.opacity = '1';
        slide.style.pointerEvents = 'auto';

        const slideRect = slide.getBoundingClientRect();
        const rects = textRects(slide);
        const boxes = contentRects(slide);
        const label = slide.getAttribute('data-screen-label') || slide.id || `slide-${index + 1}`;

        if (wants(tokens, 'no-overflowing-text')) {
          rects.forEach((entry) => {
            const r = entry.rect;
            const sides = [];
            if (slideRect.left - r.left > edgeTolerancePx) sides.push(`left+${round1(slideRect.left - r.left)}`);
            if (slideRect.top - r.top > edgeTolerancePx) sides.push(`top+${round1(slideRect.top - r.top)}`);
            if (r.right - slideRect.right > edgeTolerancePx) sides.push(`right+${round1(r.right - slideRect.right)}`);
            if (r.bottom - slideRect.bottom > edgeTolerancePx) sides.push(`bottom+${round1(r.bottom - slideRect.bottom)}`);
            if (sides.length > 0) {
              findings.push({
                slide: index + 1,
                label,
                rule: 'slide/no-overflowing-text',
                message: `${sides.join(', ')}: "${entry.snippet}"`,
              });
            }
          });
        }

        if (wants(tokens, 'no-overflowing-content')) {
          boxes.forEach((entry) => {
            const r = entry.rect;
            const sides = [];
            if (slideRect.left - r.left > edgeTolerancePx) sides.push(`left+${round1(slideRect.left - r.left)}`);
            if (slideRect.top - r.top > edgeTolerancePx) sides.push(`top+${round1(slideRect.top - r.top)}`);
            if (r.right - slideRect.right > edgeTolerancePx) sides.push(`right+${round1(r.right - slideRect.right)}`);
            if (r.bottom - slideRect.bottom > edgeTolerancePx) sides.push(`bottom+${round1(r.bottom - slideRect.bottom)}`);
            if (sides.length > 0) {
              findings.push({
                slide: index + 1,
                label,
                rule: 'slide/no-overflowing-content',
                message: `${sides.join(', ')}: ${entry.label}`,
              });
            }
          });
        }

        if (wants(tokens, 'slide-sized-text')) {
          rects.forEach((entry) => {
            if (entry.fontSize < minTextPx) {
              findings.push({
                slide: index + 1,
                label,
                rule: 'slide/slide-sized-text',
                message: `${round1(entry.fontSize)}px text below ${minTextPx}px floor: "${entry.snippet}"`,
              });
            }
          });
        }

        if (wants(tokens, 'no-overlapping-text')) {
          for (let a = 0; a < rects.length; a += 1) {
            for (let b = a + 1; b < rects.length; b += 1) {
              if (rects[a].node === rects[b].node) continue;
              const hit = intersection(rects[a].rect, rects[b].rect);
              const largerFont = Math.max(rects[a].fontSize, rects[b].fontSize);
              const smallerFont = Math.max(1, Math.min(rects[a].fontSize, rects[b].fontSize));
              const comparableTextScale = largerFont / smallerFont <= 1.75;
              if (hit.area > 0 && hit.ratio >= 0.75 && comparableTextScale) {
                findings.push({
                  slide: index + 1,
                  label,
                  rule: 'slide/no-overlapping-text',
                  message: `${round1(hit.area)}px^2 overlap (${round1(hit.ratio * 100)}% of smaller text box): "${rects[a].snippet}" / "${rects[b].snippet}"`,
                });
              }
            }
          }
        }

        previousStates.forEach((state) => {
          if (state.inert) state.el.setAttribute('inert', '');
          else state.el.removeAttribute('inert');
          state.el.style.visibility = state.visibility;
          state.el.style.opacity = state.opacity;
          state.el.style.pointerEvents = state.pointerEvents;
        });
      });

      return { ok: findings.length === 0, infrastructure: false, slideCount: slides.length, skipped, findings };
    }, MIN_TEXT_PX, EDGE_TOLERANCE_PX, OVERLAP_TOLERANCE_PX);
  } finally {
    await page.close().catch(() => {});
  }
}

function printResult(filePath, result) {
  const rel = filePath.startsWith(REPO_ROOT) ? filePath.slice(REPO_ROOT.length + 1) : filePath;
  if (result.ok) {
    const skipped = result.skipped ? `, ${result.skipped} skipped` : '';
    console.log(`OK ${rel} (${result.slideCount} slides${skipped})`);
    return;
  }
  console.log(`FAIL ${rel}`);
  result.findings.slice(0, 20).forEach((finding) => {
    const where = finding.slide ? `slide ${finding.slide}` : 'document';
    console.log(`  ${where} ${finding.rule}: ${finding.message}`);
  });
  if (result.findings.length > 20) {
    console.log(`  ... ${result.findings.length - 20} more findings`);
  }
}

async function runSelfTest(browser) {
  const good = await checkFile(browser, FIXTURE_GOOD);
  const bad = await checkFile(browser, FIXTURE_BAD);
  printResult(FIXTURE_GOOD, good);
  printResult(FIXTURE_BAD, bad);
  const badRules = new Set((bad.findings || []).map((finding) => finding.rule));
  const expectedBad =
    !bad.ok &&
    badRules.has('slide/no-overflowing-text') &&
    badRules.has('slide/no-overflowing-content') &&
    badRules.has('slide/no-overlapping-text') &&
    badRules.has('slide/slide-sized-text');
  if (!good.ok || good.skipped !== 1 || !expectedBad) {
    return {
      ok: false,
      message: `self-test expected good fixture to pass with one skip and bad fixture to trigger all rules; got good=${good.ok}, goodSkipped=${good.skipped}, badRules=${Array.from(badRules).join(',')}`,
    };
  }
  return { ok: true };
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    return 0;
  }

  let files;
  if (args.selfTest) {
    files = [];
  } else if (args.all) {
    files = allSlideCanvasFixtures();
  } else {
    files = args.files.length > 0 ? args.files.map((file) => resolve(file)) : [DEFAULT_VARIANT];
  }

  for (const file of files) {
    if (!existsSync(file)) throw new Error(`input does not exist: ${file}`);
    if (!statSync(file).isFile()) throw new Error(`input is not a file: ${file}`);
  }
  if (!args.selfTest && files.length === 0) {
    throw new Error('--all did not find any slide-canvas fixtures in visualize/fixtures/manifest.json');
  }

  const executablePath = await resolveChromeExecutable();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    if (args.selfTest) {
      const result = await runSelfTest(browser);
      if (!result.ok) {
        console.error(result.message);
        return 2;
      }
      console.log('slide-canvas-overflow self-test OK');
      return 0;
    }

    let failures = 0;
    let infraFailures = 0;
    for (const file of files) {
      const result = await checkFile(browser, file);
      printResult(file, result);
      if (!result.ok) {
        failures += 1;
        if (result.infrastructure) infraFailures += 1;
      }
    }
    if (infraFailures > 0) return 1;
    if (failures > 0 && args.strict) return 2;
    return 0;
  } finally {
    await browser.close().catch(() => {});
  }
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.error(`slide-canvas-overflow failed: ${err.message}`);
    process.exitCode = 1;
  });
