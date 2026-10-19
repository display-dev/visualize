#!/usr/bin/env node
// slide-canvas-smoke.mjs — headless-Chromium integration smoke for the
// <slide-canvas> component. Loads a sample variant and exercises:
//
//   - initial state (slide 1 active, all others inert)
//   - keyboard nav (ArrowRight, End, Home, number-key, R-reset)
//   - `slidechange` CustomEvent payload shape (reason, index, total,
//     previousIndex, slide, previousSlide)
//   - `noscale` mode renders the canvas at the authored 1920×1080
//     dimensions with no transform
//
// Unit tests (`slide-canvas.test.mjs`) cover the pure-logic helpers.
// shell fixtures cover the print contract end-to-end. This smoke
// covers the runtime DOM behavior the other two can't reach.
//
// Chrome resolution mirrors browser-contrast.mjs / print-check.mjs.
//
// Usage:
//   node visualize/scripts/slide-canvas-smoke.mjs [--strict] [variant.html]
//
// If no variant is provided, defaults to `fixtures/shells/slide-canvas.html`.
//
// Exit codes:
//   0 — all assertions pass (or failures without --strict)
//   1 — Chrome acquisition / browser crash
//   2 — assertions failed with --strict

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

const CACHE_DIR =
  process.env.VISUALIZE_PUPPETEER_CACHE_DIR ||
  join(homedir(), '.cache', 'visualize-skill', 'puppeteer');

const DEFAULT_VARIANT = resolve(__dirname, '..', 'fixtures', 'shells', 'slide-canvas.html');

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

async function runSmoke(browser, filePath) {
  const page = await browser.newPage();
  const results = [];
  const record = (name, ok, detail = '') => results.push({ name, ok, detail });
  const closeEnough = (actual, expected, tolerance = 0.001) => Math.abs(actual - expected) <= tolerance;

  try {
    await page.setViewport({ width: 1920, height: 1080 });

    // Attach the slidechange listener BEFORE the document starts
    // loading so we catch the 'init' event the component dispatches
    // during its DCL-deferred startup. slidechange bubbles + composes,
    // so a document-level capture-phase listener picks it up
    // regardless of where in the tree the slide-canvas element ends up.
    await page.evaluateOnNewDocument(() => {
      window.__deckEvents = [];
      document.addEventListener('slidechange', (e) => {
        window.__deckEvents.push({
          index: e.detail.index,
          previousIndex: e.detail.previousIndex,
          total: e.detail.total,
          reason: e.detail.reason,
          slideId: e.detail.slide && e.detail.slide.id,
          previousSlideId: e.detail.previousSlide && e.detail.previousSlide.id,
        });
      }, true);
    });

    const fileUrl = pathToFileURL(resolve(filePath)).href;
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);

    // === Initial state ===
    const initial = await page.evaluate(() => {
      const stage = document.querySelector('slide-canvas');
      const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
      const slides = Array.from(canvas.children).filter((el) => el.tagName === 'SECTION');
      return {
        total: stage.total,
        current: stage.current,
        activeId: slides[stage.current].id,
        inertCount: slides.filter((s) => s.hasAttribute('inert')).length,
        counter: document.querySelector('[data-slide-counter]')?.textContent,
        totalText: document.querySelector('[data-slide-total]')?.textContent,
        progressWidth: document.querySelector('[data-slide-progress]')?.style.width,
        prevDisabled: document.querySelector('[data-slide-nav="prev"]')?.disabled,
        nextDisabled: document.querySelector('[data-slide-nav="next"]')?.disabled,
        events: window.__deckEvents.slice(),
      };
    });
    record('initial state: slide 1 active, others inert',
      initial.current === 0 && initial.inertCount === initial.total - 1 && initial.activeId === 'slide-1',
      `current=${initial.current}, inert=${initial.inertCount}/${initial.total}, activeId=${initial.activeId}`);
    const initEvent = initial.events.find((e) => e.reason === 'init');
    record('init event fires once with reason=init, index=0',
      !!initEvent && initEvent.index === 0 && initEvent.previousIndex === 0,
      initEvent ? `index=${initEvent.index}, previousIndex=${initEvent.previousIndex}, total=${initEvent.total}` : 'no init event');
    record('chrome hooks initialize counter, total, progress, and nav state',
      initial.counter === '1' &&
        initial.totalText === String(initial.total) &&
        closeEnough(parseFloat(initial.progressWidth), (1 / initial.total) * 100) &&
        initial.prevDisabled === true &&
        initial.nextDisabled === false,
      `counter=${initial.counter}, total=${initial.totalText}, progress=${initial.progressWidth}, prevDisabled=${initial.prevDisabled}, nextDisabled=${initial.nextDisabled}`);

    // === Keyboard nav ===
    await page.keyboard.press('ArrowRight');
    const afterArrow = await page.evaluate(() => ({
      current: document.querySelector('slide-canvas').current,
      lastEvent: window.__deckEvents[window.__deckEvents.length - 1],
      counter: document.querySelector('[data-slide-counter]')?.textContent,
      progressWidth: document.querySelector('[data-slide-progress]')?.style.width,
      prevDisabled: document.querySelector('[data-slide-nav="prev"]')?.disabled,
    }));
    record('ArrowRight: current = 1',
      afterArrow.current === 1 &&
        afterArrow.lastEvent.reason === 'keyboard' &&
        afterArrow.lastEvent.index === 1 &&
        afterArrow.counter === '2' &&
        afterArrow.prevDisabled === false,
      `current=${afterArrow.current}, lastReason=${afterArrow.lastEvent.reason}, counter=${afterArrow.counter}, progress=${afterArrow.progressWidth}, prevDisabled=${afterArrow.prevDisabled}`);

    await page.evaluate(() => { location.hash = '#slide-3'; });
    await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
    const afterHash = await page.evaluate(() => ({
      current: document.querySelector('slide-canvas').current,
      lastEvent: window.__deckEvents[window.__deckEvents.length - 1],
    }));
    record('hash navigation: #slide-3 sets current = 2 with reason=hash',
      afterHash.current === 2 && afterHash.lastEvent.reason === 'hash' && afterHash.lastEvent.index === 2,
      `current=${afterHash.current}, lastReason=${afterHash.lastEvent.reason}`);

    await page.click('[data-slide-nav="next"]');
    const afterNextClick = await page.evaluate(() => ({
      current: document.querySelector('slide-canvas').current,
      lastEvent: window.__deckEvents[window.__deckEvents.length - 1],
    }));
    record('next chrome click advances with reason=click',
      afterNextClick.current === 3 && afterNextClick.lastEvent.reason === 'click' && afterNextClick.lastEvent.index === 3,
      `current=${afterNextClick.current}, lastReason=${afterNextClick.lastEvent.reason}`);

    await page.click('[data-slide-nav="prev"]');
    const afterPrevClick = await page.evaluate(() => ({
      current: document.querySelector('slide-canvas').current,
      lastEvent: window.__deckEvents[window.__deckEvents.length - 1],
    }));
    record('prev chrome click goes back with reason=click',
      afterPrevClick.current === 2 && afterPrevClick.lastEvent.reason === 'click' && afterPrevClick.lastEvent.index === 2,
      `current=${afterPrevClick.current}, lastReason=${afterPrevClick.lastEvent.reason}`);
    await page.evaluate(() => document.activeElement && document.activeElement.blur());

    await page.keyboard.press('End');
    const afterEnd = await page.evaluate(() => ({
      current: document.querySelector('slide-canvas').current,
      total: document.querySelector('slide-canvas').total,
      nextDisabled: document.querySelector('[data-slide-nav="next"]')?.disabled,
    }));
    record('End: current = total - 1',
      afterEnd.current === afterEnd.total - 1 && afterEnd.nextDisabled === true,
      `current=${afterEnd.current}, total=${afterEnd.total}, nextDisabled=${afterEnd.nextDisabled}`);

    await page.keyboard.press('Home');
    const afterHome = await page.evaluate(() => document.querySelector('slide-canvas').current);
    record('Home: current = 0', afterHome === 0, `current=${afterHome}`);

    await page.keyboard.press('5');
    const after5 = await page.evaluate(() => document.querySelector('slide-canvas').current);
    record('5: current = 4 (0-indexed slide N-1)', after5 === 4, `current=${after5}`);

    await page.keyboard.press('r');
    const afterR = await page.evaluate(() => document.querySelector('slide-canvas').current);
    record('r: current = 0', afterR === 0, `current=${afterR}`);

    // === scaled viewport framing ===
    const measureCanvasFit = async (viewport) => {
      await page.setViewport(viewport);
      await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
      return page.evaluate(() => {
        const stage = document.querySelector('slide-canvas');
        const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
        const slide = canvas.querySelector('section:not([inert])');
        const canvasRect = canvas.getBoundingClientRect();
        const slideRect = slide.getBoundingClientRect();
        const hostRect = stage.getBoundingClientRect();
        return {
          viewportW: window.innerWidth,
          viewportH: window.innerHeight,
          host: {
            left: hostRect.left,
            top: hostRect.top,
            right: hostRect.right,
            bottom: hostRect.bottom,
            width: hostRect.width,
            height: hostRect.height,
          },
          canvas: {
            left: canvasRect.left,
            top: canvasRect.top,
            right: canvasRect.right,
            bottom: canvasRect.bottom,
            width: canvasRect.width,
            height: canvasRect.height,
          },
          slide: {
            left: slideRect.left,
            top: slideRect.top,
            right: slideRect.right,
            bottom: slideRect.bottom,
            width: slideRect.width,
            height: slideRect.height,
          },
        };
      });
    };
    const assertCanvasFit = (fit) => {
      const tol = 1;
      const fillsOneAxis =
        closeEnough(fit.canvas.width, fit.host.width, tol) ||
        closeEnough(fit.canvas.height, fit.host.height, tol);
      const insideHost =
        fit.canvas.left >= fit.host.left - tol &&
        fit.canvas.top >= fit.host.top - tol &&
        fit.canvas.right <= fit.host.right + tol &&
        fit.canvas.bottom <= fit.host.bottom + tol;
      const activeSlideCoversCanvas =
        closeEnough(fit.slide.left, fit.canvas.left, tol) &&
        closeEnough(fit.slide.top, fit.canvas.top, tol) &&
        closeEnough(fit.slide.right, fit.canvas.right, tol) &&
        closeEnough(fit.slide.bottom, fit.canvas.bottom, tol);
      return { ok: fillsOneAxis && insideHost && activeSlideCoversCanvas, fillsOneAxis, insideHost, activeSlideCoversCanvas };
    };

    const scaledDesktop = await measureCanvasFit({ width: 1440, height: 900 });
    const desktopFit = assertCanvasFit(scaledDesktop);
    record('scaled desktop viewport: canvas is centered and fully visible',
      desktopFit.ok,
      `canvas=${JSON.stringify(scaledDesktop.canvas)}, host=${JSON.stringify(scaledDesktop.host)}, checks=${JSON.stringify(desktopFit)}`);

    const mobile = await measureCanvasFit({ width: 390, height: 844, isMobile: true });
    const mobileFit = assertCanvasFit(mobile);
    record('mobile viewport: canvas is centered and fully visible',
      mobileFit.ok,
      `canvas=${JSON.stringify(mobile.canvas)}, host=${JSON.stringify(mobile.host)}, checks=${JSON.stringify(mobileFit)}`);

    const measureViewportSafety = async (viewport, options = {}) => {
      await page.setViewport(viewport);
      if (options.visualViewport) {
        await page.evaluate((visualViewport) => {
          const listeners = new Map();
          Object.defineProperty(window, 'visualViewport', {
            configurable: true,
            enumerable: true,
            value: {
              width: visualViewport.width,
              height: visualViewport.height,
              offsetLeft: visualViewport.offsetLeft || 0,
              offsetTop: visualViewport.offsetTop || 0,
              addEventListener(type, listener) { listeners.set(`${type}:${listeners.size}`, listener); },
              removeEventListener() {},
            },
          });
          window.dispatchEvent(new Event('resize'));
        }, options.visualViewport);
      }
      await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
      return page.evaluate(async () => {
        const stage = document.querySelector('slide-canvas');
        const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
        const slides = Array.from(canvas.children).filter((el) => el.tagName === 'SECTION');
        const chrome = stage.querySelector('[data-slide-canvas-chrome]');
        const round1 = (n) => Math.round(n * 10) / 10;
        const rectFor = (el) => {
          const rect = el.getBoundingClientRect();
          return {
            left: round1(rect.left),
            top: round1(rect.top),
            right: round1(rect.right),
            bottom: round1(rect.bottom),
            width: round1(rect.width),
            height: round1(rect.height),
          };
        };
        const visibleElement = (el) => {
          if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
          if (el.closest('[aria-hidden="true"], script, style, template, noscript')) return false;
          const style = getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || '1') > 0.01;
        };
        const viewport = window.visualViewport
          ? {
              left: window.visualViewport.offsetLeft,
              top: window.visualViewport.offsetTop,
              right: window.visualViewport.offsetLeft + window.visualViewport.width,
              bottom: window.visualViewport.offsetTop + window.visualViewport.height,
              width: window.visualViewport.width,
              height: window.visualViewport.height,
            }
          : {
              left: 0,
              top: 0,
              right: window.innerWidth,
              bottom: window.innerHeight,
              width: window.innerWidth,
              height: window.innerHeight,
            };
        const textRangeRects = (root) => {
          const ranges = [];
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
              if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
              if (!visibleElement(node.parentElement)) return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            },
          });
          let node;
          while ((node = walker.nextNode())) {
            const range = document.createRange();
            range.selectNodeContents(node);
            const snippet = node.nodeValue.trim().replace(/\s+/g, ' ').slice(0, 80);
            for (const rect of range.getClientRects()) {
              if (rect.width <= 0.5 || rect.height <= 0.5) continue;
              ranges.push({
                label: `"${snippet}"`,
                rect,
              });
            }
            range.detach();
          }
          return ranges;
        };
        const failures = [];
        for (let index = 0; index < slides.length; index += 1) {
          stage.goTo(index, 'api');
          await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
          const slide = slides[index];
          const slideRect = slide.getBoundingClientRect();
          const chromeRect = chrome ? chrome.getBoundingClientRect() : null;
          const overlapsChrome = chromeRect
            ? !(slideRect.right < chromeRect.left ||
                slideRect.left > chromeRect.right ||
                slideRect.bottom < chromeRect.top ||
                slideRect.top > chromeRect.bottom)
            : false;
          const outsideViewport =
            slideRect.left < viewport.left - 1 ||
            slideRect.top < viewport.top - 1 ||
            slideRect.right > viewport.right + 1 ||
            slideRect.bottom > viewport.bottom + 1;
          const elementRects = Array.from(slide.querySelectorAll('*'))
            .filter((el) => visibleElement(el) && !el.hasAttribute('data-visualize-overflow-ok'))
            .flatMap((el) => Array.from(el.getClientRects()).map((rect) => ({
              label: el.getAttribute('aria-label') || el.className || el.tagName.toLowerCase(),
              rect,
            })));
          const escaped = elementRects.concat(textRangeRects(slide))
            .filter((entry) => entry.rect.width > 0.5 && entry.rect.height > 0.5)
            .filter((entry) => (
              entry.rect.left < slideRect.left - 1 ||
              entry.rect.top < slideRect.top - 1 ||
              entry.rect.right > slideRect.right + 1 ||
              entry.rect.bottom > slideRect.bottom + 1
            ))
            .slice(0, 3)
            .map((entry) => ({ label: String(entry.label), rect: rectFor({ getBoundingClientRect: () => entry.rect }) }));
          if (overlapsChrome || outsideViewport || escaped.length > 0) {
            failures.push({
              slide: index + 1,
              label: slide.getAttribute('aria-label') || slide.id || `slide-${index + 1}`,
              overlapsChrome,
              outsideViewport,
              escaped,
              slideRect: rectFor(slide),
              chromeRect: chrome ? rectFor(chrome) : null,
              viewport: {
                left: round1(viewport.left),
                top: round1(viewport.top),
                right: round1(viewport.right),
                bottom: round1(viewport.bottom),
                width: round1(viewport.width),
                height: round1(viewport.height),
              },
            });
          }
        }
        return {
          total: slides.length,
          failures,
        };
      });
    };

    const mobileLandscapeSafety = await measureViewportSafety({ width: 844, height: 390, isMobile: true, hasTouch: true });
    record('mobile landscape viewport: active slide content clears viewport and shell chrome',
      mobileLandscapeSafety.failures.length === 0,
      JSON.stringify(mobileLandscapeSafety.failures.slice(0, 3)));

    const mobilePortraitSafety = await measureViewportSafety({ width: 390, height: 844, isMobile: true, hasTouch: true });
    record('mobile portrait viewport: active slide content clears viewport and shell chrome',
      mobilePortraitSafety.failures.length === 0,
      JSON.stringify(mobilePortraitSafety.failures.slice(0, 3)));

    const constrainedVisualViewportSafety = await measureViewportSafety(
      { width: 844, height: 390, isMobile: true, hasTouch: true },
      { visualViewport: { width: 844, height: 322, offsetLeft: 0, offsetTop: 0 } });
    record('mobile visual viewport mismatch: active slide content clears reduced visual viewport',
      constrainedVisualViewportSafety.failures.length === 0,
      JSON.stringify(constrainedVisualViewportSafety.failures.slice(0, 3)));

    await page.evaluate(() => document.querySelector('slide-canvas').goTo(0, 'api'));
    await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));

    // === touch swipe nav ===
    const afterSwipeLeft = await page.evaluate(() => {
      const stage = document.querySelector('slide-canvas');
      const rect = stage.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      stage.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true,
        pointerId: 7,
        pointerType: 'touch',
        clientX: rect.left + rect.width * 0.78,
        clientY: y,
      }));
      stage.dispatchEvent(new PointerEvent('pointerup', {
        bubbles: true,
        pointerId: 7,
        pointerType: 'touch',
        clientX: rect.left + rect.width * 0.22,
        clientY: y + 4,
      }));
      return {
        current: stage.current,
        lastEvent: window.__deckEvents[window.__deckEvents.length - 1],
      };
    });
    record('touch swipe left advances with reason=swipe',
      afterSwipeLeft.current === 1 &&
        afterSwipeLeft.lastEvent.reason === 'swipe' &&
        afterSwipeLeft.lastEvent.index === 1,
      `current=${afterSwipeLeft.current}, lastReason=${afterSwipeLeft.lastEvent.reason}`);

    const afterSwipeRight = await page.evaluate(() => {
      const stage = document.querySelector('slide-canvas');
      const rect = stage.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      stage.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true,
        pointerId: 8,
        pointerType: 'touch',
        clientX: rect.left + rect.width * 0.22,
        clientY: y,
      }));
      stage.dispatchEvent(new PointerEvent('pointerup', {
        bubbles: true,
        pointerId: 8,
        pointerType: 'touch',
        clientX: rect.left + rect.width * 0.78,
        clientY: y + 4,
      }));
      return {
        current: stage.current,
        lastEvent: window.__deckEvents[window.__deckEvents.length - 1],
      };
    });
    record('touch swipe right goes back with reason=swipe',
      afterSwipeRight.current === 0 &&
        afterSwipeRight.lastEvent.reason === 'swipe' &&
        afterSwipeRight.lastEvent.index === 0,
      `current=${afterSwipeRight.current}, lastReason=${afterSwipeRight.lastEvent.reason}`);

    // === noscale mode ===
    await page.setViewport({ width: 1920, height: 1080 });
    await page.evaluate(() => document.querySelector('slide-canvas').setAttribute('noscale', ''));
    // Give attributeChangedCallback + the resulting _applyScale a frame.
    await page.evaluate(() => new Promise((res) => requestAnimationFrame(res)));
    const noscale = await page.evaluate(() => {
      const stage = document.querySelector('slide-canvas');
      const canvas = stage.querySelector(':scope > .slide-canvas-canvas');
      const style = canvas.style;
      return {
        width: style.width,
        height: style.height,
        transform: style.transform || '',
      };
    });
    record('noscale: canvas keeps authored dimensions, no transform',
      noscale.width === '1920px' && noscale.height === '1080px' && noscale.transform === '',
      `width=${noscale.width}, height=${noscale.height}, transform="${noscale.transform}"`);

    return results;
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
  node visualize/scripts/slide-canvas-smoke.mjs [--strict] [<variant.html> ...]
  node visualize/scripts/slide-canvas-smoke.mjs --all [--strict]

Default variant: fixtures/shells/slide-canvas.html

Exit codes:
  0 — pass (or fail without --strict)
  1 — Chrome acquisition / browser crash / variant not found
  2 — assertion failure with --strict
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
  const variants = [];
  for (const a of argv) {
    if (a === '--strict') strict = true;
    else if (a === '--all') all = true;
    else if (a.startsWith('--')) {
      console.error(`error: unknown flag: ${a}`);
      process.exit(1);
    } else {
      variants.push(resolve(a));
    }
  }

  if (all) {
    variants.push(...collectAllSlideCanvasFixtures());
  }
  if (variants.length === 0) {
    if (all) {
      console.error('error: --all did not find any slide-canvas fixtures in visualize/fixtures/manifest.json');
      process.exit(1);
    }
    variants.push(DEFAULT_VARIANT);
  }

  for (const v of variants) {
    if (!existsSync(v) || !statSync(v).isFile()) {
      console.error(`error: variant not found: ${v}`);
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

  let totalPassed = 0;
  let totalFailed = 0;
  let firstFailureVariant = null;
  try {
    for (const variant of variants) {
      let results;
      try {
        results = await runSmoke(browser, variant);
      } catch (err) {
        const browserConnected = typeof browser.isConnected === 'function'
          ? browser.isConnected()
          : browser.connected !== false;
        if (!browserConnected) {
          console.error(`error: browser disconnected: ${err.message}`);
          process.exit(1);
        }
        console.error(`error: smoke threw on ${basename(variant)}: ${err.message}`);
        totalFailed += 1;
        if (!firstFailureVariant) firstFailureVariant = basename(variant);
        continue;
      }
      const passed = results.filter((r) => r.ok).length;
      const failed = results.length - passed;
      totalPassed += passed;
      totalFailed += failed;
      if (failed > 0) {
        if (!firstFailureVariant) firstFailureVariant = basename(variant);
        for (const r of results) {
          if (!r.ok) console.error(`FAIL  ${basename(variant)}  ${r.name}  ${r.detail}`);
        }
      } else {
        console.log(`OK    ${basename(variant)}  ${passed}/${results.length}`);
      }
    }
  } finally {
    await browser.close().catch(() => {});
  }

  const durationMs = Date.now() - startedAt;
  console.log(`\n${totalPassed} passed · ${totalFailed} failed · ${variants.length} variant(s) · ${durationMs}ms`);

  if (totalFailed > 0 && strict) process.exit(2);
  process.exit(0);
}

main().catch((err) => {
  console.error(`error: ${err.message}`);
  process.exit(1);
});
