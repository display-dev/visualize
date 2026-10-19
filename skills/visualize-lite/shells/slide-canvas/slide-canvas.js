/**
 * <slide-canvas> — visualize web component for fixed-canvas slide decks.
 *
 * The component renders an inner stage at a fixed design size (default
 * 1920×1080) and applies `transform: scale(N)` based on the viewport to
 * fit the host element. Letterboxes on narrow viewports, pillarboxes on
 * tall ones, never reflows slide content.
 *
 * Slides are direct-child <section> elements. The component manages
 * navigation, hash sync, accessibility attributes, print CSS, and default
 * slide navigation chrome. Legacy page-level chrome elements
 * (`data-slide-counter`, `data-slide-total`, `data-slide-progress`,
 * `data-slide-nav="prev"|"next"`) are still looked up from the parent
 * document and updated on slide change; when none are present, the shell
 * renders canonical chrome itself.
 *
 * The component supersedes the inline-IIFE slide-controller used across
 * visualize's 25 pitch-deck variants. Preserves the existing visualize
 * a11y contract (aria-current + inert + #slide-N hash format) and adds:
 *
 *   - number-key 1-9 jumps to slide N
 *   - R resets to slide 1
 *   - horizontal touch swipe advances/reverses on mobile
 *   - data-screen-label="NN Label" auto-tagged per slide
 *   - data-visualize-validate="no-overflowing-text no-overflowing-content no-overlapping-text slide-sized-text"
 *     auto-tagged per slide (hook for sibling spec's overflow validator)
 *   - slidechange CustomEvent on <slide-canvas> with detail {
 *       index, previousIndex, total, slide, previousSlide, reason
   *     } where reason ∈ 'init' | 'keyboard' | 'click' | 'hash' | 'swipe' | 'api'
 *
 * Print: a @media print stylesheet is injected into document.head once.
 * Removes the transform:scale, lays out every slide one per page at the
 * authored design size, strips animations.
 *
 * Browser support: Chromium, WebKit, Firefox. No polyfills.
 *
 * Usage:
 *   <slide-canvas width="1920" height="1080" aria-label="…">
 *     <section id="slide-1" class="slide is-title">…</section>
 *     <section id="slide-2" class="slide is-content" inert>…</section>
 *     …
 *   </slide-canvas>
 *
 * Per AUTHORING-FLOW originality rule: adapted from
 * frontend-slides bold-template-pack reference component, NOT copied.
 */

(() => {
  if (customElements.get('slide-canvas')) return;

  const DEFAULT_WIDTH = 1920;
  const DEFAULT_HEIGHT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no-overflowing-text no-overflowing-content no-overlapping-text slide-sized-text';
  const STYLE_TAG_ID = 'slide-canvas-styles';
  const PRINT_STYLE_TAG_ID = 'slide-canvas-print-styles';
  const CHROME_ATTR = 'data-slide-canvas-chrome';

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const pad2 = (n) => String(n).padStart(2, '0');

  /**
   * Component-scoped stylesheet, injected once into document.head.
   * Uses element selectors only — no class names — so per-variant CSS
   * never collides.
   */
  const STYLES = `
slide-canvas {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  overflow: hidden;
  touch-action: pan-y;
  background: var(--slide-canvas-letterbox, #000);
}

slide-canvas[noscale] {
  min-height: auto;
  overflow: visible;
}

slide-canvas .slide-canvas-canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  will-change: transform;
}

slide-canvas[noscale] .slide-canvas-canvas {
  position: static;
  top: auto;
  left: auto;
  transform: none !important;
}

slide-canvas .slide-canvas-canvas > section {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
}

slide-canvas .slide-canvas-canvas > section[inert] {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

slide-canvas .slide-canvas-canvas > section:not([inert]) {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}

slide-canvas .slide-canvas-overlay {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background: rgba(20, 20, 20, 0.78);
  color: #f5f5f5;
  font: 500 12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.06em;
  padding: 8px 14px;
  border-radius: 999px;
  pointer-events: none;
  z-index: 9999;
  opacity: 1;
  transition: opacity 360ms ease;
}

slide-canvas .slide-canvas-overlay[data-faded="true"] {
  opacity: 0;
}

slide-canvas .slide-canvas-chrome {
  --slide-canvas-chrome-accent: var(--primary, oklch(0.690 0.205 38.8));
  --slide-canvas-chrome-fg: var(--slide-canvas-nav-fg, oklch(0.880 0.006 75));
  --slide-canvas-chrome-muted: var(--slide-canvas-nav-muted, oklch(0.620 0.006 75));
  --slide-canvas-chrome-disabled: var(--slide-canvas-nav-disabled, oklch(0.440 0.006 75));
  --slide-canvas-chrome-border: var(--slide-canvas-nav-border, rgba(255, 255, 255, 0.18));
  --slide-canvas-chrome-surface: var(--slide-canvas-nav-surface, color-mix(in srgb, var(--slide-canvas-letterbox, #111) 78%, white 8%));
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9990;
  height: 58px;
  padding: 0 24px;
  background: var(--slide-canvas-letterbox, #111);
  color: var(--slide-canvas-chrome-muted);
  display: grid;
  grid-template-columns: auto minmax(120px, 1fr) auto;
  align-items: center;
  gap: 18px;
  font: 500 14px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: 0.04em;
}

slide-canvas .slide-canvas-chrome-counter {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

slide-canvas .slide-canvas-chrome-counter [data-slide-counter] {
  color: var(--slide-canvas-chrome-accent);
  font-weight: 750;
}

slide-canvas .slide-canvas-chrome-progress {
  height: 2px;
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;
  border-radius: 999px;
}

slide-canvas .slide-canvas-chrome-progress-bar {
  display: block;
  height: 100%;
  width: 0;
  background: var(--slide-canvas-chrome-accent);
  transition: width 220ms ease;
}

slide-canvas .slide-canvas-chrome-controls {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 2px;
  border: 1px solid var(--slide-canvas-chrome-border);
  border-radius: 10px;
  background: var(--slide-canvas-chrome-surface);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 10px 24px rgba(0, 0, 0, 0.26);
}

slide-canvas .slide-canvas-chrome-button {
  appearance: none;
  width: 44px;
  height: 42px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--slide-canvas-chrome-fg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: none;
  transition: background 140ms ease, color 140ms ease, transform 120ms ease;
}

slide-canvas .slide-canvas-chrome-button:first-child {
  border-radius: 7px 0 0 7px;
}

slide-canvas .slide-canvas-chrome-button:last-child {
  border-radius: 0 7px 7px 0;
}

slide-canvas .slide-canvas-chrome-button + .slide-canvas-chrome-button {
  border-left: 1px solid rgba(255, 255, 255, 0.13);
}

slide-canvas .slide-canvas-chrome-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.09);
  color: #fff;
}

slide-canvas .slide-canvas-chrome-button:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--slide-canvas-chrome-accent) 72%, white 8%);
  outline-offset: 3px;
}

slide-canvas .slide-canvas-chrome-button:active:not(:disabled) {
  background: rgba(255, 255, 255, 0.13);
  transform: translateY(1px);
}

slide-canvas .slide-canvas-chrome-button:disabled {
  cursor: not-allowed;
  color: var(--slide-canvas-chrome-disabled);
  background: transparent;
}

slide-canvas .slide-canvas-chrome-button svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2.45;
  fill: none;
}

@media (prefers-reduced-motion: reduce) {
  slide-canvas .slide-canvas-canvas,
  slide-canvas .slide-canvas-canvas > section,
  slide-canvas .slide-canvas-overlay,
  slide-canvas .slide-canvas-chrome-progress-bar,
  slide-canvas .slide-canvas-chrome-button {
    transition: none;
  }
}

@media (max-width: 640px), (pointer: coarse) {
  slide-canvas .slide-canvas-overlay {
    display: none;
  }

  slide-canvas .slide-canvas-chrome {
    left: max(12px, env(safe-area-inset-left));
    right: max(126px, calc(env(safe-area-inset-right) + 126px));
    bottom: max(16px, env(safe-area-inset-bottom));
    height: 44px;
    grid-template-columns: auto 48px minmax(72px, 1fr);
    gap: 10px;
    padding: 0;
    background: transparent;
    font-size: 12px;
  }

  slide-canvas .slide-canvas-chrome-controls {
    order: -1;
  }

  slide-canvas .slide-canvas-chrome-button {
    width: 46px;
    height: 44px;
  }
}

@media print {
  html, body {
    background: #fff !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  body > *:not(slide-canvas) {
    display: none !important;
  }

  slide-canvas {
    background: #fff !important;
    width: auto !important;
    height: auto !important;
    min-height: 0 !important;
    overflow: visible !important;
  }

  slide-canvas .slide-canvas-canvas {
    position: static !important;
    transform: none !important;
    width: auto !important;
    height: auto !important;
  }

  slide-canvas .slide-canvas-overlay,
  slide-canvas .slide-canvas-chrome {
    display: none !important;
  }

  slide-canvas .slide-canvas-canvas > section {
    position: relative !important;
    inset: auto !important;
    width: var(--slide-canvas-print-width, 1920px) !important;
    height: var(--slide-canvas-print-height, 1080px) !important;
    /* The component owns slide geometry in print, including padding.
       Per-variant @media print rules historically added inch-based
       padding (.slide { padding: 0.75in 0.5in }) that left empty
       margins inside each printed page — different from the screen
       full-bleed layout. Force padding: 0 here so per-variant print
       padding can't slip back in via class-selector specificity. */
    padding: 0 !important;
    margin: 0 !important;
    visibility: visible !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    break-after: page;
    page-break-after: always;
    overflow: hidden;
  }

  slide-canvas .slide-canvas-canvas > section:last-of-type {
    break-after: auto;
    page-break-after: auto;
  }
}
`;

  /**
   * Compute the largest uniform scale factor that fits a (designW × designH)
   * canvas inside a (viewportW × viewportH) host. Exported via the
   * component's static API for testing.
   */
  function computeScale(designW, designH, viewportW, viewportH) {
    if (designW <= 0 || designH <= 0 || viewportW <= 0 || viewportH <= 0) return 1;
    const sx = viewportW / designW;
    const sy = viewportH / designH;
    return Math.min(sx, sy);
  }

  /**
   * Parse a hash like `#slide-7` into a 0-based slide index. Returns 0
   * if the hash is missing or malformed.
   */
  function parseSlideHash(hash, total) {
    if (!hash) return 0;
    const m = String(hash).match(/^#slide-(\d+)$/);
    if (!m) return 0;
    return clamp(parseInt(m[1], 10) - 1, 0, Math.max(0, total - 1));
  }

  function parseValidationTokens(value) {
    if (!value || value === 'none') return [];
    return String(value).trim().split(/\s+/).filter(Boolean);
  }

  function injectStylesheetOnce() {
    if (document.getElementById(STYLE_TAG_ID)) return;
    const styleEl = document.createElement('style');
    styleEl.id = STYLE_TAG_ID;
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);
  }

  function syncPrintStylesheet(width, height) {
    let styleEl = document.getElementById(PRINT_STYLE_TAG_ID);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = PRINT_STYLE_TAG_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `@page { size: ${width}px ${height}px; margin: 0; }`;
  }

  function keypressOwnedByFocusedElement(target) {
    if (!target || !target.closest) return false;
    if (target.isContentEditable) return true;
    const owner = target.closest('input, textarea, select, button, [role="button"], [contenteditable]');
    return Boolean(owner);
  }

  class SlideCanvas extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale'];
    }

    constructor() {
      super();
      this._current = 0;
      this._slides = [];
      this._canvas = null;
      this._overlay = null;
      this._overlayTimer = null;
      this._resizeObs = null;
      this._chrome = null;
      this._ownsChrome = false;
      this._swipeStart = null;
      this._initScheduled = false;
      this._initialized = false;
      this._onKeyDown = this._onKeyDown.bind(this);
      this._onHashChange = this._onHashChange.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onPrevClick = this._onPrevClick.bind(this);
      this._onNextClick = this._onNextClick.bind(this);
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);
      this._onPointerCancel = this._onPointerCancel.bind(this);
    }

    connectedCallback() {
      injectStylesheetOnce();
      // When the element is upgraded mid-parse (the common case — the
      // component script is inlined in <head>, so the element is
      // upgraded the instant the parser opens its tag, BEFORE any of
      // its <section> children are parsed), defer setup until the
      // document finishes parsing. Otherwise _wrapCanvas wraps zero
      // children and _collectSlides finds none.
      if (this._initialized) return;
      if (document.readyState === 'loading') {
        if (this._initScheduled) return;
        this._initScheduled = true;
        document.addEventListener('DOMContentLoaded', () => this._initStage(), { once: true });
      } else {
        this._initStage();
      }
    }

    _initStage() {
      // Guard against a disconnect happening between connectedCallback
      // and DCL (rare, but possible if the element is moved during
      // parsing) or against double-init (the DCL listener fires once,
      // but defense-in-depth keeps the contract clean).
      if (!this.isConnected || this._initialized) return;
      this._initialized = true;
      this._syncPrintSize();
      this._wrapCanvas();
      this._collectSlides();
      this._tagSlides();
      this._ensureChrome();
      this._collectChrome();
      this._renderOverlay();
      this._bindEvents();
      this._applyScale();
      const initial = parseSlideHash(location.hash, this._slides.length);
      this._goTo(initial, 'init', { force: true });
    }

    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKeyDown);
      window.removeEventListener('hashchange', this._onHashChange);
      window.removeEventListener('resize', this._onResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', this._onResize);
        window.visualViewport.removeEventListener('scroll', this._onResize);
      }
      this.removeEventListener('pointerdown', this._onPointerDown);
      this.removeEventListener('pointerup', this._onPointerUp);
      this.removeEventListener('pointercancel', this._onPointerCancel);
      if (this._resizeObs) {
        try { this._resizeObs.disconnect(); } catch (_) {}
        this._resizeObs = null;
      }
      if (this._chrome) {
        if (this._chrome.prev) this._chrome.prev.removeEventListener('click', this._onPrevClick);
        if (this._chrome.next) this._chrome.next.removeEventListener('click', this._onNextClick);
      }
      if (this._overlayTimer) {
        clearTimeout(this._overlayTimer);
        this._overlayTimer = null;
      }
      // Remove the overlay element so a future reconnect doesn't
      // accumulate stale fixed-position overlays.
      if (this._overlay && this._overlay.parentNode === this) {
        this.removeChild(this._overlay);
      }
      this._overlay = null;
      // Reset the init guards so a future reconnect re-binds listeners
      // and re-renders the overlay. _wrapCanvas, _collectSlides,
      // _tagSlides, and _renderOverlay are all idempotent (they reuse
      // existing wrappers); the value of re-running is the event
      // bindings + overlay element this disconnect just tore down.
      this._initialized = false;
      this._initScheduled = false;
    }

    attributeChangedCallback(name) {
      if (name === 'width' || name === 'height' || name === 'noscale') {
        if (name === 'width' || name === 'height') this._syncPrintSize();
        this._applyScale();
      }
    }

    /* Public API */

    get total() { return this._slides.length; }
    get current() { return this._current; }
    goTo(index, reason = 'api') { this._goTo(index, reason); }
    next(reason = 'api') { this._goTo(this._current + 1, reason); }
    prev(reason = 'api') { this._goTo(this._current - 1, reason); }
    reset(reason = 'api') { this._goTo(0, reason); }

    /* Internals */

    _designSize() {
      const w = parseInt(this.getAttribute('width'), 10);
      const h = parseInt(this.getAttribute('height'), 10);
      return {
        width: Number.isFinite(w) && w > 0 ? w : DEFAULT_WIDTH,
        height: Number.isFinite(h) && h > 0 ? h : DEFAULT_HEIGHT,
      };
    }

    _syncPrintSize() {
      const { width, height } = this._designSize();
      this.style.setProperty('--slide-canvas-print-width', `${width}px`);
      this.style.setProperty('--slide-canvas-print-height', `${height}px`);
      syncPrintStylesheet(width, height);
    }

    _wrapCanvas() {
      // If a canvas wrapper already exists (re-connect), reuse it.
      let canvas = this.querySelector(':scope > .slide-canvas-canvas');
      if (canvas) {
        this._canvas = canvas;
        return;
      }
      canvas = document.createElement('div');
      canvas.className = 'slide-canvas-canvas';
      // Move every direct child (sections, scripts, etc.) into the canvas
      // wrapper so the transform applies uniformly.
      const children = Array.from(this.childNodes);
      for (const child of children) canvas.appendChild(child);
      this.appendChild(canvas);
      this._canvas = canvas;
    }

    _collectSlides() {
      // Direct-child <section> elements inside the canvas are slides.
      // Other tags (script, style) are passed through unchanged.
      const sections = this._canvas
        ? Array.from(this._canvas.children).filter((el) => el.tagName === 'SECTION')
        : [];
      this._slides = sections;
    }

    _tagSlides() {
      this._slides.forEach((slide, i) => {
        const idx = i + 1;
        const label = slide.getAttribute('aria-label') || slide.getAttribute('data-label') || `Slide ${idx}`;
        if (!slide.hasAttribute('data-screen-label')) {
          slide.setAttribute('data-screen-label', `${pad2(idx)} ${label}`);
        }
        if (!slide.hasAttribute('data-visualize-validate')) {
          slide.setAttribute('data-visualize-validate', VALIDATE_ATTR);
        }
        if (!slide.id) {
          slide.id = `slide-${idx}`;
        }
        if (!slide.hasAttribute('aria-roledescription')) {
          slide.setAttribute('aria-roledescription', 'slide');
        }
      });
    }

    _collectChrome() {
      // Prefer page-level legacy chrome when present; otherwise use the
      // shell-owned canonical chrome. Each hook is optional — variants
      // without chrome still get keyboard and swipe navigation.
      this._chrome = {
        counter: document.querySelector('[data-slide-counter]'),
        total: document.querySelector('[data-slide-total]'),
        progress: document.querySelector('[data-slide-progress]'),
        prev: document.querySelector('[data-slide-nav="prev"]'),
        next: document.querySelector('[data-slide-nav="next"]'),
      };
      if (this._chrome.total) {
        this._chrome.total.textContent = String(this._slides.length);
      }
    }

    _ensureChrome() {
      this._ownsChrome = false;
      if (this.hasAttribute('nochrome')) return;
      const legacyChrome = document.querySelector(
        '[data-slide-counter], [data-slide-total], [data-slide-progress], [data-slide-nav]');
      if (legacyChrome && !this.contains(legacyChrome)) return;

      let chrome = this.querySelector(`:scope > [${CHROME_ATTR}]`);
      if (!chrome) {
        chrome = document.createElement('nav');
        chrome.className = 'slide-canvas-chrome';
        chrome.setAttribute(CHROME_ATTR, '');
        chrome.setAttribute('aria-label', 'Slide navigation');
        chrome.innerHTML = `
          <span class="slide-canvas-chrome-counter"><span data-slide-counter>1</span> / <span data-slide-total>0</span></span>
          <div class="slide-canvas-chrome-progress" aria-hidden="true"><span class="slide-canvas-chrome-progress-bar" data-slide-progress></span></div>
          <div class="slide-canvas-chrome-controls" role="group" aria-label="Slide controls">
            <button type="button" class="slide-canvas-chrome-button" data-slide-nav="prev" aria-label="Previous slide" title="Previous slide">
              <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 6 9 12 15 18"/></svg>
            </button>
            <button type="button" class="slide-canvas-chrome-button" data-slide-nav="next" aria-label="Next slide" title="Next slide">
              <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>
        `;
        this.appendChild(chrome);
      }
      this._ownsChrome = true;
    }

    _renderOverlay() {
      if (this._chrome && (this._chrome.prev || this._chrome.next || this._chrome.counter || this._chrome.progress)) {
        if (this._overlay && this._overlay.parentNode === this) this.removeChild(this._overlay);
        this._overlay = null;
        return;
      }
      // Reuse an existing overlay on reconnect (avoids stale-overlay
      // leak when the same element is moved in the DOM).
      let overlay = this.querySelector(':scope > .slide-canvas-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'slide-canvas-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        this.appendChild(overlay);
      }
      overlay.textContent = `${pad2(1)} / ${pad2(this._slides.length)}  swipe  ·  ←/→ space  ·  1-9 jump  ·  r reset`;
      this._overlay = overlay;
      this._scheduleOverlayHide();
    }

    _scheduleOverlayHide() {
      if (!this._overlay) return;
      this._overlay.removeAttribute('data-faded');
      if (this._overlayTimer) clearTimeout(this._overlayTimer);
      this._overlayTimer = setTimeout(() => {
        if (this._overlay) this._overlay.setAttribute('data-faded', 'true');
      }, OVERLAY_HIDE_MS);
    }

    _updateOverlay() {
      if (!this._overlay) return;
      this._overlay.textContent = `${pad2(this._current + 1)} / ${pad2(this._slides.length)}  swipe  ·  ←/→ space  ·  1-9 jump  ·  r reset`;
      this._scheduleOverlayHide();
    }

    _bindEvents() {
      window.addEventListener('keydown', this._onKeyDown);
      window.addEventListener('hashchange', this._onHashChange);
      window.addEventListener('resize', this._onResize);
      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', this._onResize);
        window.visualViewport.addEventListener('scroll', this._onResize);
      }
      this.addEventListener('pointerdown', this._onPointerDown, { passive: true });
      this.addEventListener('pointerup', this._onPointerUp, { passive: true });
      this.addEventListener('pointercancel', this._onPointerCancel, { passive: true });
      if (typeof ResizeObserver === 'function') {
        this._resizeObs = new ResizeObserver(this._onResize);
        this._resizeObs.observe(this);
      }
      if (this._chrome && this._chrome.prev) this._chrome.prev.addEventListener('click', this._onPrevClick);
      if (this._chrome && this._chrome.next) this._chrome.next.addEventListener('click', this._onNextClick);
    }

    _onKeyDown(e) {
      const target = e.target;
      // Skip when focus is on a control that owns the keypress (text
      // input, select, contenteditable, or a focused button — Space /
      // Enter would otherwise advance the deck instead of activating
      // the focused chrome control).
      if (keypressOwnedByFocusedElement(target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          this._goTo(this._current + 1, 'keyboard');
          return;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          this._goTo(this._current - 1, 'keyboard');
          return;
        case 'Home':
          e.preventDefault();
          this._goTo(0, 'keyboard');
          return;
        case 'End':
          e.preventDefault();
          this._goTo(this._slides.length - 1, 'keyboard');
          return;
        case 'r':
        case 'R':
          e.preventDefault();
          this._goTo(0, 'keyboard');
          return;
        default:
          if (/^[1-9]$/.test(e.key)) {
            const n = parseInt(e.key, 10) - 1;
            if (n < this._slides.length) {
              e.preventDefault();
              this._goTo(n, 'keyboard');
            }
          }
      }
    }

    _onHashChange() {
      this._goTo(parseSlideHash(location.hash, this._slides.length), 'hash');
    }

    _onResize() { this._applyScale(); }

    _onPrevClick() { this._goTo(this._current - 1, 'click'); }
    _onNextClick() { this._goTo(this._current + 1, 'click'); }

    _onPointerDown(e) {
      if (e.pointerType && e.pointerType !== 'touch' && e.pointerType !== 'pen') return;
      if (keypressOwnedByFocusedElement(e.target)) return;
      this._swipeStart = {
        x: e.clientX,
        y: e.clientY,
        pointerId: e.pointerId,
      };
    }

    _onPointerUp(e) {
      if (!this._swipeStart) return;
      if (e.pointerId !== this._swipeStart.pointerId) return;
      const dx = e.clientX - this._swipeStart.x;
      const dy = e.clientY - this._swipeStart.y;
      this._swipeStart = null;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (absX < 48 || absX < absY * 1.35) return;
      this._goTo(dx < 0 ? this._current + 1 : this._current - 1, 'swipe');
    }

    _onPointerCancel() {
      this._swipeStart = null;
    }

    _applyScale() {
      if (!this._canvas) return;
      const { width, height } = this._designSize();
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = '';
        this._canvas.style.width = `${width}px`;
        this._canvas.style.height = `${height}px`;
        this._canvas.style.top = '';
        this._canvas.style.left = '';
        return;
      }
      const { width: hostW, height: hostH } = this._effectiveHostSize(width, height);
      const chromeReserve = this._chromeReservePx(hostH);
      const fitH = Math.max(1, hostH - chromeReserve);
      const scale = computeScale(width, height, hostW, fitH);
      this._canvas.style.width = `${width}px`;
      this._canvas.style.height = `${height}px`;
      this._canvas.style.left = `${hostW / 2}px`;
      this._canvas.style.top = `${fitH / 2}px`;
      this._canvas.style.transform = `translate(${-width * scale / 2}px, ${-height * scale / 2}px) scale(${scale})`;
    }

    _effectiveHostSize(fallbackW, fallbackH) {
      const rect = this.getBoundingClientRect();
      let width = rect.width || window.innerWidth || fallbackW;
      let height = rect.height || window.innerHeight || fallbackH;
      const viewport = window.visualViewport;
      if (viewport) {
        const visibleWidth = viewport.width - Math.max(0, rect.left - viewport.offsetLeft);
        const visibleHeight = viewport.height - Math.max(0, rect.top - viewport.offsetTop);
        if (visibleWidth > 0) width = Math.min(width, visibleWidth);
        if (visibleHeight > 0) height = Math.min(height, visibleHeight);
      }
      return {
        width: Math.max(1, width),
        height: Math.max(1, height),
      };
    }

    _chromeReservePx(hostH) {
      const chrome = this.querySelector(`:scope > [${CHROME_ATTR}]`);
      if (!chrome) return 0;
      const style = window.getComputedStyle ? window.getComputedStyle(chrome) : null;
      if (style && style.display === 'none') return 0;
      const rect = chrome.getBoundingClientRect();
      if (!rect.height) return 0;
      const viewportBottom = window.visualViewport?.height || window.innerHeight || hostH;
      const occupied = Math.max(rect.height, viewportBottom - rect.top);
      return Math.min(hostH - 1, Math.max(0, occupied + 8));
    }

    _goTo(index, reason, { force = false } = {}) {
      if (!this._slides.length) return;
      const next = clamp(index, 0, this._slides.length - 1);
      if (!force && next === this._current && this._slides[next].hasAttribute('aria-current')) return;
      const previousIndex = this._current;
      // No "previous" slide exists when the deck first initializes.
      // Subscribers can distinguish init from a real navigation by the
      // null previousSlide (the README documents this contract).
      const previousSlide = reason === 'init' ? null : (this._slides[previousIndex] || null);
      this._current = next;
      this._slides.forEach((slide, i) => {
        if (i === next) {
          slide.setAttribute('aria-current', 'true');
          slide.removeAttribute('inert');
        } else {
          slide.removeAttribute('aria-current');
          slide.setAttribute('inert', '');
        }
      });
      this._updateChrome();
      this._updateHash();
      this._updateOverlay();
      this.dispatchEvent(new CustomEvent('slidechange', {
        bubbles: true,
        composed: true,
        detail: {
          index: next,
          previousIndex,
          total: this._slides.length,
          slide: this._slides[next],
          previousSlide,
          reason,
        },
      }));
    }

    _updateChrome() {
      if (!this._chrome) return;
      const idx1 = this._current + 1;
      if (this._chrome.counter) this._chrome.counter.textContent = String(idx1);
      if (this._chrome.progress) this._chrome.progress.style.width = `${(idx1 / this._slides.length) * 100}%`;
      if (this._chrome.prev) this._chrome.prev.disabled = this._current === 0;
      if (this._chrome.next) this._chrome.next.disabled = this._current === this._slides.length - 1;
    }

    _updateHash() {
      const expected = `#slide-${this._current + 1}`;
      if (location.hash !== expected) {
        try {
          history.replaceState(null, '', expected);
        } catch (_err) {
          // history API may be unavailable in some sandboxes; fall through.
          location.hash = expected;
        }
      }
    }

  }

  // Static API surface for testing — re-exposed on the constructor so
  // unit tests can import slide-canvas.js and call SlideCanvas.computeScale
  // and SlideCanvas.parseSlideHash without instantiating the element.
  SlideCanvas.computeScale = computeScale;
  SlideCanvas.parseSlideHash = parseSlideHash;
  SlideCanvas.parseValidationTokens = parseValidationTokens;
  SlideCanvas.DEFAULT_WIDTH = DEFAULT_WIDTH;
  SlideCanvas.DEFAULT_HEIGHT = DEFAULT_HEIGHT;

  customElements.define('slide-canvas', SlideCanvas);

  // ESM-style export for test runners that load the file as a module.
  // The block is a no-op in script context (typeof module === 'undefined').
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SlideCanvas, computeScale, parseSlideHash, parseValidationTokens };
  }
})();
