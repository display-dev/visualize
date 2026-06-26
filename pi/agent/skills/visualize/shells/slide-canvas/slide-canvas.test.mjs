/**
 * Unit tests for <slide-canvas> pure-logic helpers.
 *
 * The component's DOM behavior requires a browser; those tests live in
 * the integration smoke at `slide-canvas.integration.test.mjs`. This file
 * covers the pure-logic helpers exported on the constructor:
 *
 *   - computeScale(designW, designH, viewportW, viewportH)
 *   - parseSlideHash(hash, total)
 *
 * Run with: `node --test visualize/shells/slide-canvas/slide-canvas.test.mjs`
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';

// Load the component as CommonJS so the module.exports fallback at the
// bottom of slide-canvas.js gives us the helpers without needing a browser.
// We provide minimal globals (window, document, customElements,
// HTMLElement) so the IIFE doesn't crash at import time.
const stubElement = () => ({
  setAttribute() {},
  getAttribute() { return null; },
  removeAttribute() {},
  hasAttribute() { return false; },
  appendChild() {},
  removeEventListener() {},
  addEventListener() {},
  querySelector() { return null; },
  textContent: '',
  id: '',
  style: {},
});

globalThis.window = globalThis.window || {
  addEventListener() {},
  removeEventListener() {},
  postMessage() {},
  innerWidth: 1920,
  innerHeight: 1080,
};
globalThis.document = globalThis.document || {
  head: { appendChild() {} },
  createElement() { return stubElement(); },
  getElementById() { return null; },
  querySelector() { return null; },
};
globalThis.customElements = globalThis.customElements || {
  _registry: new Map(),
  define(name, ctor) { this._registry.set(name, ctor); },
  get(name) { return this._registry.get(name); },
};
globalThis.HTMLElement = globalThis.HTMLElement || class {};
globalThis.ResizeObserver = globalThis.ResizeObserver || class { observe() {} disconnect() {} };

const { createRequire } = await import('node:module');
const require = createRequire(import.meta.url);
const componentPath = require.resolve('./slide-canvas.js');
const componentModule = require(componentPath);
const { computeScale, parseSlideHash, parseValidationTokens, SlideCanvas } = componentModule;

test('computeScale: fits 1920×1080 design exactly in 1920×1080 viewport', () => {
  assert.equal(computeScale(1920, 1080, 1920, 1080), 1);
});

test('computeScale: scales down when viewport is narrower than design', () => {
  // Half-width viewport, full-height: width is the binding constraint.
  assert.equal(computeScale(1920, 1080, 960, 1080), 0.5);
});

test('computeScale: scales down when viewport is shorter than design', () => {
  // Full-width viewport, half-height: height is the binding constraint.
  assert.equal(computeScale(1920, 1080, 1920, 540), 0.5);
});

test('computeScale: returns the smaller of width/height ratios (binding side)', () => {
  // Viewport is 1280×360. Width ratio 1280/1920 ≈ 0.667; height ratio
  // 360/1080 ≈ 0.333. Height binds.
  const scale = computeScale(1920, 1080, 1280, 360);
  assert.ok(Math.abs(scale - 360 / 1080) < 1e-9, `expected ${360 / 1080}, got ${scale}`);
});

test('computeScale: scales up beyond 1 when viewport is larger than design', () => {
  // Component does NOT clamp to 1 — uniform scale means decks fill huge
  // viewports too. The host controls clamping via CSS max-width if it
  // wants a 1:1 ceiling.
  assert.equal(computeScale(1920, 1080, 3840, 2160), 2);
});

test('computeScale: returns 1 for degenerate inputs (zero or negative)', () => {
  assert.equal(computeScale(0, 1080, 1920, 1080), 1);
  assert.equal(computeScale(1920, 0, 1920, 1080), 1);
  assert.equal(computeScale(1920, 1080, 0, 1080), 1);
  assert.equal(computeScale(1920, 1080, 1920, 0), 1);
  assert.equal(computeScale(-1, 1080, 1920, 1080), 1);
});

test('parseSlideHash: extracts 0-based index from #slide-N format', () => {
  // 1-based hash → 0-based index.
  assert.equal(parseSlideHash('#slide-1', 12), 0);
  assert.equal(parseSlideHash('#slide-7', 12), 6);
  assert.equal(parseSlideHash('#slide-12', 12), 11);
});

test('parseSlideHash: clamps to valid range', () => {
  assert.equal(parseSlideHash('#slide-99', 12), 11, 'overshoot clamps to last');
  assert.equal(parseSlideHash('#slide-0', 12), 0, 'undershoot clamps to first');
});

test('parseSlideHash: returns 0 for missing or malformed hashes', () => {
  assert.equal(parseSlideHash('', 12), 0);
  assert.equal(parseSlideHash(null, 12), 0);
  assert.equal(parseSlideHash(undefined, 12), 0);
  assert.equal(parseSlideHash('#slide-', 12), 0, 'no number');
  assert.equal(parseSlideHash('#slide-abc', 12), 0, 'non-numeric');
  assert.equal(parseSlideHash('#5', 12), 0, 'wrong format (frontend-slides #N, not adopted by visualize)');
  assert.equal(parseSlideHash('#some-other-anchor', 12), 0);
});

test('parseSlideHash: handles a zero-slide edge case', () => {
  // Component should never be invoked with 0 slides, but defensively:
  assert.equal(parseSlideHash('#slide-1', 0), 0);
});

test('parseValidationTokens: parses space-separated hyphenated rule tokens', () => {
  assert.deepEqual(parseValidationTokens('no-overflowing-text no-overflowing-content no-overlapping-text slide-sized-text'), [
    'no-overflowing-text',
    'no-overflowing-content',
    'no-overlapping-text',
    'slide-sized-text',
  ]);
  assert.deepEqual(parseValidationTokens('  no-overflowing-text   slide-sized-text  '), [
    'no-overflowing-text',
    'slide-sized-text',
  ]);
});

test('parseValidationTokens: treats empty and none markers as no checks', () => {
  assert.deepEqual(parseValidationTokens(''), []);
  assert.deepEqual(parseValidationTokens(null), []);
  assert.deepEqual(parseValidationTokens('none'), []);
});

test('SlideCanvas static API exposes the helpers and default constants', () => {
  assert.equal(typeof SlideCanvas.computeScale, 'function');
  assert.equal(typeof SlideCanvas.parseSlideHash, 'function');
  assert.equal(typeof SlideCanvas.parseValidationTokens, 'function');
  assert.equal(SlideCanvas.DEFAULT_WIDTH, 1920);
  assert.equal(SlideCanvas.DEFAULT_HEIGHT, 1080);
});

test('SlideCanvas is registered as a custom element under <slide-canvas>', () => {
  assert.equal(customElements.get('slide-canvas'), SlideCanvas);
});
