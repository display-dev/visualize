#!/usr/bin/env node
// pattern-fixture-smoke.mjs — browser smoke for pattern fixtures.
//
// Checks:
//   - no document-level horizontal overflow at desktop and mobile widths
//   - no clustered duplicate full-width horizontal separators at each width

import { existsSync, statSync } from 'node:fs';
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
const DEFAULT_FIXTURE = resolve(__dirname, '..', 'fixtures', 'patterns', 'table.html');
const CACHE_DIR =
  process.env.VISUALIZE_PUPPETEER_CACHE_DIR ||
  join(homedir(), '.cache', 'visualize-skill', 'puppeteer');

function parseArgs(argv) {
  const args = argv.slice(2);
  const strict = args.includes('--strict');
  const help = args.includes('--help') || args.includes('-h');
  const viewportFlagIndex = args.indexOf('--viewport');
  const viewport = viewportFlagIndex >= 0 ? args[viewportFlagIndex + 1] : 'all';
  if (!['all', 'desktop', 'mobile'].includes(viewport)) {
    throw new Error(`invalid --viewport value: ${viewport}`);
  }
  const viewportValueIndex = viewportFlagIndex >= 0 ? viewportFlagIndex + 1 : -1;
  const files = args.filter((arg, index) => (
    !arg.startsWith('--') &&
    index !== viewportValueIndex
  ));
  const unknown = args.find((arg) => arg.startsWith('--') && !['--strict', '--viewport', '--help', '-h'].includes(arg));
  if (unknown) throw new Error(`unknown argument: ${unknown}`);
  return { strict, help, viewport, files: files.length > 0 ? files : [DEFAULT_FIXTURE] };
}

function printUsage() {
  console.log(`usage:
  node visualize/scripts/pattern-fixture-smoke.mjs [--strict] [--viewport desktop|mobile|all] [fixture.html ...]`);
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
  if (!platform) throw new Error('unsupported platform for managed Chromium fallback');
  const buildId = await resolveBuildId(Browser.CHROME, platform, BrowserTag.STABLE);
  const result = await install({
    browser: Browser.CHROME,
    cacheDir: CACHE_DIR,
    buildId,
    buildIdAlias: BrowserTag.STABLE,
  });
  return result.executablePath;
}

const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

async function checkFile(browser, filePath, viewportName) {
  const page = await browser.newPage();
  try {
    await page.setViewport(VIEWPORTS[viewportName]);
    await page.goto(pathToFileURL(resolve(filePath)).href, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));

    const result = await page.evaluate(() => {
      const viewportWidth = window.innerWidth;
      const documentWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body?.scrollWidth || 0,
      );
      const overflowPx = documentWidth - viewportWidth;
      const findings = [];
      if (overflowPx > 1) {
        findings.push(`document scrollWidth exceeds mobile viewport by ${Math.round(overflowPx)}px`);
      }

      const visible = (el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          parseFloat(style.opacity || '1') > 0
        );
      };
      const borderWidth = (value) => {
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : 0;
      };
      const separators = [];
      for (const el of document.body.querySelectorAll('*')) {
        if (!visible(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < viewportWidth * 0.55) continue;
        const style = getComputedStyle(el);
        const top = borderWidth(style.borderTopWidth);
        const bottom = borderWidth(style.borderBottomWidth);
        if (top >= 1) separators.push({ y: Math.round(rect.top), width: Math.round(rect.width), tag: el.tagName.toLowerCase() });
        if (bottom >= 1) separators.push({ y: Math.round(rect.bottom), width: Math.round(rect.width), tag: el.tagName.toLowerCase() });
      }

      separators.sort((a, b) => a.y - b.y);
      const clusters = [];
      for (const separator of separators) {
        const cluster = clusters.find((candidate) => Math.abs(candidate.y - separator.y) <= 24);
        if (cluster) {
          cluster.items.push(separator);
          cluster.y = Math.round(cluster.items.reduce((sum, item) => sum + item.y, 0) / cluster.items.length);
        } else {
          clusters.push({ y: separator.y, items: [separator] });
        }
      }
      const duplicate = clusters.find((cluster) => cluster.items.length > 1);
      if (duplicate) {
        const detail = duplicate.items.map((item) => `${item.tag}@${item.y}px/${item.width}px`).join(', ');
        findings.push(`duplicate mobile separators clustered near y=${duplicate.y}px: ${detail}`);
      }

      return { ok: findings.length === 0, findings };
    });

    return { ...result, viewportName };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printUsage();
    return 0;
  }
  const files = args.files.map((file) => resolve(file));
  const viewports = args.viewport === 'all' ? ['desktop', 'mobile'] : [args.viewport];
  for (const file of files) {
    if (!existsSync(file)) throw new Error(`input does not exist: ${file}`);
    if (!statSync(file).isFile()) throw new Error(`input is not a file: ${file}`);
  }

  const executablePath = await resolveChromeExecutable();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    let failures = 0;
    for (const file of files) {
      for (const viewport of viewports) {
        const result = await checkFile(browser, file, viewport);
        if (result.ok) {
          console.log(`OK    ${basename(file)}  ${viewport} pattern fixture`);
        } else {
          failures += 1;
          console.error(`FAIL  ${basename(file)}  ${viewport}: ${result.findings.join('; ')}`);
        }
      }
    }
    if (failures > 0 && args.strict) return 2;
    return failures > 0 ? 0 : 0;
  } finally {
    await browser.close().catch(() => {});
  }
}

main().then((code) => process.exit(code)).catch((err) => {
  console.error(`pattern-fixture-smoke failed: ${err.message}`);
  process.exit(1);
});
