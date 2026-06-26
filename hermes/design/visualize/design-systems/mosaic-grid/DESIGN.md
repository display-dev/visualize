---
slug: mosaic-grid
name: Mosaic Grid
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/mosaic-grid/raw.md (Superdesign "Mosaic Grid Architecture Style" by Shirley Lou)
  - principles: Technical Minimalist register — architectural / blueprint aesthetic on paper-textured cream canvas with prestige forest-green primary, 1px hairlines, zero shadows, mosaic-panel SVG background, L-shaped corner markers, monospaced numerical-index nav labels, mix-blend-luminosity images
canonical-canvas: light
selection:
  mood: [playful, tactile, industrial, spatial]
  tone: [confident, polished]
  formality: medium
  density: high
  canonical_canvas: light
  best_for: |
    Use for information-dense artifacts that need a confident, polished register with playful, tactile, industrial, spatial visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# Mosaic Grid

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Page chrome (all surfaces) | spec §"Style prose" | Paper cream `#F7F7F5` | Single canonical canvas across every documented section — hero, bento, form CTA, footer. Forest green appears only as ink, primary CTAs, and the topnav logo box. |
| Mosaic background (full-page) | spec §"Section 1: Mosaic Background" | Paper cream with `0.5px` hairlines at 0.3 opacity | SVG of interlocking rectangular panels (large squares, horizontal strips, vertical blocks). Hairlines in grid-gray `#3A3A38` at 30% alpha — visible as structure, not pattern noise. |
| Logo box | spec §"Section 2: Technical Navigation" | Solid forest green `#1A3C2B` | 32×32 with white glyph inside — the only solid-fill brand-colour surface in chrome. |

This system is light-canonical with no documented dark mode. The dark variant the template ships is a plausible inversion (near-black canvas, paper ink, brand chromatics preserved at `:root` values) following AUTHORING.md's "light-canonical, no documented dark mode" guidance — synthesised, not lifted from a brand surface that doesn't exist.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a citation against the spec. Conversions performed via `visualize/scripts/vendor/culori.mjs` `converter('oklch')` on 2026-05-26.

### Brand primary

- `--primary`: `oklch(0.3249 0.0505 159.94)` (= `#1A3C2B`). Live: spec §"Style prose" — "Forest" prestige-green primary; used for logo-box fill, primary CTA button fill, L-shaped corner-markers, hero headline ink, status-badge dot, network-graph nodes.

### Documented secondary brand colours

- `--brand-accent-coral`: `oklch(0.7584 0.1480 37.71)` (= `#FF8C69`). Live: spec §"Style prompt" — Palette declaration; restricted to bento-cell left-border accents and decorative chips per §"Section 4: Bento Feature Grid".
- `--brand-accent-mint`: `oklch(0.9232 0.1277 154.24)` (= `#9EFFBF`). Live: spec §"Style prompt" — Palette declaration; bento-cell left-border accent.
- `--brand-accent-gold`: `oklch(0.8730 0.1396 93.54)` (= `#F4D35E`). Live: spec §"Style prompt" — Palette declaration; bento-cell left-border accent.

The accent trio is decorative-only — per the spec's risk note, "once it migrates into chrome the 'blueprint' register collapses." Tokens are surface-named-accent because the spec ships them as named accents at full chroma, not as a ladder.

### Canvas + neutrals

- `--background`: `oklch(0.9756 0.0026 106.45)` (= `#F7F7F5`). Live: spec §"Style prose" — "Paper" canvas; the single canonical light canvas across all documented sections.
- `--foreground`: `oklch(0.3477 0.0034 106.58)` (= `#3A3A38`). Live: spec §"Style prose" — "Grid" ink; the body-text and hairline neutral. Forest-green `--primary` is used for headings, not body.
- `--card`: same as `--background`. Live: spec §"Section 4: Bento Feature Grid" — bento cells have "Paper (#F7F7F5) background"; cards are not elevated, they are separated by 1px gap-lines.
- `--card-foreground`: same as `--foreground`.
- `--popover`, `--popover-foreground`: mirror card slots — the spec ships no separate popover surface; popovers use the canvas + ink with hairline border (synthesised to mirror cards).
- `--muted`: `oklch(0.9756 0.0026 106.45)` (= `#F7F7F5`) — same as background. The spec ships no separate muted surface; muted regions are differentiated by hairline framing, not fill.
- `--muted-foreground`: `oklch(0.3477 0.0034 106.58)` at reduced opacity in template usage; token value matches `--foreground` because the spec declares hairlines at "20% opacity" — opacity is the differentiator, not a separate token.
- `--accent`: same as `--background` — accent surfaces in this register are hairline-framed, not fill-differentiated.
- `--accent-foreground`: same as `--foreground`.
- `--secondary`: `oklch(0.3249 0.0505 159.94)` (= `#1A3C2B`) — the spec's "ghost button" (1px border) pairs with a solid forest-green button, so secondary surfaces route through `--primary` ink with paper fill. The secondary fill role uses paper canvas (`--background`); foreground stays forest. Token value here matches `--primary` for cases where a non-ghost secondary surface is needed.
- `--secondary-foreground`: paper canvas `oklch(0.9756 0.0026 106.45)`.
- `--destructive`: `oklch(0.7584 0.1480 37.71)` (= `#FF8C69`). Live: spec §"Style prompt" — Coral is the documented warm accent and the closest documented colour to a destructive ink in this register (synthesised role; spec does not declare a separate destructive colour, but coral is the warm-spectrum chip).
- `--destructive-foreground`: `oklch(0.9756 0.0026 106.45)` paper.
- `--border`: `oklch(0.3477 0.0034 106.58)` (= `#3A3A38`). Live: spec §"Style prose" — "1px hairlines in #3A3A38 at 20% opacity for all dividers" — the token value is full-strength grid-gray; the 20% opacity is applied at the consumer (border-color via `color-mix` or `oklch(... / 0.2)`).
- `--input`: same as `--border`.
- `--ring`: same as `--primary` — the spec ships no separate focus-ring colour; brand primary doubles as the focus indicator. Forest at 0.32 lightness has sufficient contrast against paper canvas for a 2px ring.

### Polarity-locked surfaces

The spec ships no documented dark mode, so there are no canvas-night tokens to lock against `:root`. The dark-mode block in `tokens.css` is a synthesised plausible inversion per AUTHORING.md's guidance for light-canonical brands without documented dark.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.3477 0.0034 106.58 / 0.2)` (= `#3A3A38` at 20% alpha). Live: spec §"Style prose" — "1px hairlines in #3A3A38 at 20% opacity for all dividers."
- `--brand-hairline-strong`: `oklch(0.3477 0.0034 106.58 / 0.45)` (= `#3A3A38` at 45% alpha). Live: spec §"Section 1: Mosaic Background" — "0.5px hairlines (#3A3A38 at 0.3 opacity)" — the mosaic-panel hairlines run thinner at higher opacity; this token captures the stronger hairline weight used inside the SVG pattern and around card borders.

### Brand-extras

- `--brand-canvas-paper`: `oklch(0.9756 0.0026 106.45)` (= `#F7F7F5`). The named cream surface — paper-textured canvas. Aliased from `--background` for documents that read better with the brand name.
- `--brand-ink-forest`: `oklch(0.3249 0.0505 159.94)` (= `#1A3C2B`). The named forest ink — heading and brand-mark colour.
- `--brand-ink-grid`: `oklch(0.3477 0.0034 106.58)` (= `#3A3A38`). The named grid ink — body text, hairlines, mono labels.
- `--brand-radius-xs`: `2px`. Live: spec §"Style prompt" — "All components must have 0px or 2px (sm) border-radius." The 2px stop applies to inputs, buttons, mockup-boxes.

### Drift vs `tokens.css`

Not applicable — spec-derived, no live brand to drift against. `tokens.css` is being authored in the same cycle from this DESIGN.md.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Space Grotesk | 700 | 64–96px (clamp) | 0.9 | -0.02em (tight) |
| Heading | Space Grotesk | 600 | 32–48px | 1.05 | -0.015em |
| Title | Space Grotesk | 600 | 18–22px | 1.25 | -0.01em |
| Body | General Sans | 400 | 15–16px | 1.55 | 0 |
| Caption / Label | JetBrains Mono | 500 | 10–12px | 1.4 | 0.1em (uppercase) |
| Mono (code) | JetBrains Mono | 400–500 | 12–14px | 1.6 | 0 |

Notes on observed patterns:

- Space Grotesk on display sizes runs at line-height `0.9` (spec §"Section 3: Hero Section") — tight enough that the hero headline sits as a single optical block, not paragraphed lines.
- JetBrains Mono labels carry uppercase + `tracking: 0.1em` consistently — nav indices (`01. PRICING`), bento header labels, status-badge inner text, form labels (positioned directly above inputs).
- General Sans is the body family the spec declares explicitly; it has no Google Fonts equivalent. Fallback chain falls to Inter + system sans.
- The numerical-index prefix on nav labels (`01.`, `02.`, `03.`) is itself a typographic signature, not a list-counter — render as authored content with a hairline space separator.

## §4 Component vocabulary

### Topnav

**Status:** `current`
**Live source:** spec §"Section 2: Technical Navigation"
**Description:** Fixed top header with `1px` border-bottom in grid-gray at 20% opacity. Left side carries a `32×32` square logo box in forest green with a white glyph inside (no radius — square). Center carries nav links in JetBrains Mono at 10px, uppercase, prefixed with numerical indices (e.g., `01. PRICING`). Right side carries a ghost button (1px border, paper canvas, forest ink) and a solid forest-green button (paper text).
**States:** `default` ghost has paper canvas + forest ink + 1px forest border; `hover` ghost fills with forest at 8% alpha; primary solid stays at full forest fill across all states (spec implies flat — no hover lift).

### Logo box

**Status:** `current`
**Live source:** spec §"Section 2: Technical Navigation"
**Description:** `32×32` solid forest-green square with a white SVG glyph centered. Zero border-radius. The only solid-brand-fill surface in chrome — every other forest-green appearance is ink-on-paper.
**States:** static; no documented hover state.

### Hero section

**Status:** `current`
**Live source:** spec §"Section 3: Hero Section"
**Description:** Large-type editorial block. Headline in Space Grotesk at 8xl-ish (clamped 64–96px), tracking-tight, forest-green ink. Subhead in JetBrains Mono at 14px, all-caps, prefixed with a vertical 1px line on the left. Right column carries an abstract wireframe graphic — a square container with a dashed circular orbit and a luminosity-blended image inside.
**States:** static composition; image blends at `mix-blend-luminosity` 90% by default, shifts to full colour on hover.

### Bento feature grid

**Status:** `current`
**Live source:** spec §"Section 4: Bento Feature Grid"
**Description:** A 2×2 grid with `1px` grid-gray gap separating cells. Each cell has paper canvas, `32px` padding, a monospaced header label with a coloured left-border accent (one of coral / mint / gold per cell — never repeated within a single grid), and an internal "mockup box" that simulates code snippets or UI fragments using monospaced text and flat colour chips.
**States:** static; cells do not elevate on hover (zero shadows). The accent left-border is the only chromatic differentiator between cells.

### Mockup box (inside bento cells)

**Status:** `current`
**Live source:** spec §"Section 4: Bento Feature Grid"
**Description:** A `1px`-bordered inner panel inside a bento cell. Renders monospaced text (JetBrains Mono 12px) on paper canvas. Optional flat colour chips simulate UI state — error red, success forest, neutral grid-gray. No syntax highlighting beyond solid chips; this is a wireframe of code, not real code.
**States:** static.

### Technical form CTA

**Status:** `current`
**Live source:** spec §"Section 5: Technical Form CTA"
**Description:** Centered, 640px-wide form container on paper canvas with a `1px` hairline border. Four L-shaped corner markers (`10×10px`) in forest green sit at each corner of the container — these are decorative brackets, not interactive. Form fields use solid-white backgrounds, `1px` borders, `2px` radius, and monospaced labels positioned directly above each input.
**States:** input `default` is paper with grid border; `focus` swaps the border to forest green at full strength; corner markers stay constant.

### Status badge

**Status:** `current`
**Live source:** spec §"Components 1: Status Badge"
**Description:** Inline-flex container with `1px` border in forest-green at 20% opacity. Inside: an `8×8` square dot of solid forest green, followed by JetBrains Mono text at 10px, uppercase, tracking-widest. Padding `4px 12px`.
**States:** static; no hover.

### Network topology graph

**Status:** `current`
**Live source:** spec §"Components 2: Network Topology Graph"
**Description:** SVG visualization rendered inside a circular container (max-width `450px`) with `1px` border. A central `16px` solid forest-green node sits in the middle. Three orbiting nodes follow dashed paths at `140px` radius. Nodes connect to the centre via `1px` solid lines at 20% opacity. Orbiting nodes rotate via linear 20s infinite animation.
**States:** continuous rotation (linear, no easing); reduced-motion preference disables the animation.

### Monospaced testimonial card

**Status:** `current`
**Live source:** spec §"Components 3: Monospaced Testimonial Card"
**Description:** Square card (no radius) with `1px` border. Top region carries a quote glyph + 5 star icons at `10px` each. Body region carries monospaced text at `12px` with `line-height: 1.6`. Bottom region is separated by a `1px` top border and carries a square avatar (no radius) plus name + title in JetBrains Mono.
**States:** static; no hover lift (consistent with the zero-shadow rule).

### Buttons (solid + ghost)

**Status:** `current`
**Live source:** spec §"Section 2: Technical Navigation" + §"Style prompt"
**Description:** Two button variants. Solid: forest-green fill, paper ink, 2px radius. Ghost: paper canvas, forest ink, 1px forest border, 2px radius. Both render at JetBrains Mono 12px uppercase or General Sans 14px depending on context.
**States:** `default` flat-fill; `hover` shifts the surface only via opacity (no transform, no shadow); `focus-visible` adds a 2px forest ring offset by 2px.

### Hairline divider

**Status:** `current`
**Live source:** spec §"Layout intro" + §"Style prose"
**Description:** `1px` horizontal line in grid-gray at 20% opacity. The single section-divider primitive — no shadow, no double rule, no gradient.
**States:** static.

### Mosaic background pattern

**Status:** `current`
**Live source:** spec §"Section 1: Mosaic Background"
**Description:** Full-page SVG of interlocking rectangular panels (varying sizes — large squares, horizontal strips, vertical blocks) divided by `0.5px` hairlines at grid-gray 30% opacity. All panels fill with paper. The pattern repeats seamlessly. Renders as structural texture behind every section without competing with content.
**States:** static.

## §5 Surface inventory

The spec describes the system through six declared sections + three named components. No live URLs were sampled — this is a spec-derived system.

- `temp/refs/mosaic-grid/raw.md` — full spec from Superdesign library, captured 2026-05-26. Anchors §1 (canvas), §2 (palette), §3 (typography), §4 (component vocabulary). Cited inline against each section.

## §6 Notes

Patterns worth flagging for future authors:

- **Hairlines are the only elevation primitive.** Every container — bento cells, form box, testimonial card, status badge — is differentiated by 1px borders, never by shadow or surface lift. Reaching for `box-shadow` in this register collapses the blueprint identity.
- **Numerical-index nav labels are a signature, not decoration.** Render `01. PRICING` / `02. PRODUCT` / `03. DOCS` as authored content with a thin space between the index and the label. JetBrains Mono uppercase with `tracking: 0.1em` is the typographic shape.
- **L-shaped corner markers are decorative only.** Four `10×10px` brackets in forest-green at each corner of a form container. Don't elevate to a hover-state primitive; they're spec'd as static structural decoration.
- **Monospaced "mockup boxes" inside bento cells simulate UI fragments — they are not real code.** Use neutral SaaS-team content (a config snippet, a tenant id, a deploy timestamp), never the host product's product surface or any real customer's data.
- **Accent trio (coral / mint / gold) is decorative-only.** Restricted to bento-cell left-borders and inline chips. Migrating any of these into nav, primary CTAs, or hero ink breaks the prestige-green register.
- **Mix-blend-luminosity images by default.** Hero imagery and any photographic surface should ship at `mix-blend-luminosity` 90%, shifting to full colour on hover. This is the spec's defining image treatment.
- **No box-shadow, no gradients, no radial fades.** The spec is explicit: "No box shadows. … 0px or 2px (sm) border-radius."
- **Dark mode is not documented.** The `[data-theme="dark"]` block in `tokens.css` is a synthesised plausible inversion (near-black canvas, paper ink, brand chromatics preserved) — flagged in the file header. Don't treat it as brand-truth.

## §Known gaps

- **No live brand surface to verify against.** Spec-derived from a single Superdesign library entry; no deployed product surface exists. Component states beyond `default` / `hover` (e.g., `pressed`, `loading`, `disabled`) are inferred from the register, not observed.
- **General Sans has no Google Fonts equivalent.** The font is loaded from the Indian Type Foundry (Fontshare) when available; the fallback chain resolves to Inter + system sans. Future authors should confirm the Fontshare CDN URL is stable before relying on the proprietary face rendering.
- **Mosaic-panel SVG dimensions are not declared.** The spec calls for "varying sizes (large squares, horizontal strips, vertical blocks)" but provides no specific tile inventory. The preview template ships one author-derived tiling; brand-truth tilings would need a reference image.
- **Mix-blend-luminosity hover transitions are not declared.** The spec specifies the default blend mode and the on-hover destination ("full colour"), but not the easing or duration. The preview uses a `200ms ease-out` synthesis.
