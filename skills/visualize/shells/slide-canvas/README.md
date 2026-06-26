# `<slide-canvas>`

Fixed-canvas shell for Visualize `slide-deck` and `pitch-deck` templates. It renders an inner canvas at a fixed design size, default 1920x1080, then applies `transform: scale()` to fit the host viewport. Slides letterbox or pillarbox; slide content never reflows.

## Usage

```html
<head>
  <script>
    /* inline contents of slide-canvas.js */
  </script>
</head>
<body>
  <slide-canvas width="1920" height="1080" aria-label="Launch plan deck">
    <section id="slide-1" data-label="Title">...</section>
    <section id="slide-2" data-label="Context" inert>...</section>
  </slide-canvas>
</body>
```

Templates declare the shell in frontmatter:

```yaml
---
shell: slide-canvas
---
```

Generated artifacts inline `slide-canvas.js` so the runtime, keyboard behavior, validation markers, and print CSS travel with the HTML snapshot. Inlined artifacts do not auto-update when this shell changes; regenerate affected artifacts after shell changes.

## Attributes

| Attribute | Default | Description |
| --------- | ------- | ----------- |
| `width` | `1920` | Inner-canvas design width in CSS pixels. |
| `height` | `1080` | Inner-canvas design height in CSS pixels. |
| `noscale` | absent | Renders the canvas at 1:1 with no transform scale. Used by checks that need authored-size geometry. |
| `nochrome` | absent | Suppresses shell-owned navigation chrome. Use only when a legacy page-level chrome implementation is intentionally provided. |

## Slide Contract

- Direct-child `<section>` elements are slides. Other direct children are moved into the internal canvas wrapper but are not treated as slides.
- Slides should carry `id="slide-N"` using 1-indexed numbering. The shell assigns missing IDs.
- Active slide has `aria-current="true"` and no `inert`.
- Inactive slides have `inert` and no `aria-current`.
- Slide switching never uses `display: none`.
- Missing `aria-roledescription` is set to `slide`.
- Missing `data-screen-label` is set from `aria-label`, `data-label`, or `Slide N`.
- Missing `data-visualize-validate` is set to `no-overflowing-text no-overflowing-content no-overlapping-text slide-sized-text`.
- Existing `data-visualize-validate` values are preserved exactly. Use `data-visualize-validate="none"` to skip a slide in the overflow validator.

## Chrome

The shell renders canonical bottom navigation chrome by default: current slide, total count, progress, previous/next buttons, disabled boundary states, keyboard/focus affordances, mobile-safe placement, and print hiding. Templates should not hand-author button/counter/progress markup for ordinary decks.

Theme the shell chrome with CSS variables on `slide-canvas`, `:root`, or the deck theme:

| Variable | Purpose |
| -------- | ------- |
| `--slide-canvas-letterbox` | letterbox and chrome band background |
| `--slide-canvas-nav-fg` | enabled arrow color |
| `--slide-canvas-nav-muted` | counter/progress text color |
| `--slide-canvas-nav-disabled` | disabled arrow color |
| `--slide-canvas-nav-border` | control group border |
| `--slide-canvas-nav-surface` | control group surface |
| `--primary` | default accent for current number, progress, and focus ring |

Legacy page-level hooks still work for existing artifacts. If the document already contains any of these hooks outside `<slide-canvas>`, the shell will not create canonical chrome:

| Selector | Updated to |
| -------- | ---------- |
| `[data-slide-counter]` | current 1-based slide number |
| `[data-slide-total]` | total slide count |
| `[data-slide-progress]` | `style.width = "${current / total * 100}%"` |
| `[data-slide-nav="prev"]` | `disabled` on the first slide |
| `[data-slide-nav="next"]` | `disabled` on the last slide |

## Keyboard

| Keys | Action |
| ---- | ------ |
| `ArrowRight`, `ArrowDown`, `PageDown`, `Space` | Next slide |
| `ArrowLeft`, `ArrowUp`, `PageUp` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `1`-`9` | Jump to slide N |
| `R` | Reset to slide 1 |

Keyboard handling skips controls that own the keypress: inputs, textareas, selects, buttons, `[role="button"]`, and contenteditable elements. Keys with `Meta`, `Ctrl`, or `Alt` modifiers are ignored.

## Hash Sync

The shell reads and writes URL hashes in `#slide-N` format. `#N` is not supported.

## `slidechange`

Every slide change dispatches a bubbling, composed `CustomEvent` from `<slide-canvas>`:

```js
document.querySelector('slide-canvas').addEventListener('slidechange', (event) => {
  event.detail.index;          // 0-based new index
  event.detail.previousIndex;  // 0-based previous index
  event.detail.total;
  event.detail.slide;
  event.detail.previousSlide;
  event.detail.reason;         // "init" | "keyboard" | "click" | "hash" | "swipe" | "api"
});
```

## Public API

```js
const canvas = document.querySelector('slide-canvas');
canvas.total;
canvas.current;
canvas.goTo(index, reason);
canvas.next(reason);
canvas.prev(reason);
canvas.reset(reason);
```

## Print

The shell injects `@media print` CSS into `document.head` once. On print:

- transform scale is removed
- every slide renders at the authored design size
- each slide starts a new page
- page-level chrome and shell overlays are hidden
- animations are stripped where they do not translate to print

## Testing

```sh
node --test visualize/shells/slide-canvas/slide-canvas.test.mjs
node visualize/scripts/slide-canvas-smoke.mjs --strict
node visualize/scripts/print-check.mjs --all --strict
node visualize/scripts/slide-canvas-overflow.mjs --self-test
```

## Originality

Adapted from `frontend-slides bold-template-pack reference component` per `AUTHORING-FLOW.md`. The reference shaped the API direction; this runtime is re-authored for Visualize's `#slide-N`, `aria-current` + `inert`, chrome hooks, validation markers, and print contract.
