---
slug: claude-style
name: Claude
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://www.anthropic.com/
  - https://www.anthropic.com/news
  - https://www.anthropic.com/research
  - https://www.anthropic.com/glasswing
  - https://claude.com/product/overview
  - https://claude.com/pricing
  - https://claude.com/pricing/enterprise
  - https://claude.ai/login
  - https://platform.claude.com/docs/en/home
canonical-canvas: light
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Claude

The brand spans two registered surface families: **Anthropic** (the parent
corporation, `anthropic.com`, with cream-canvas editorial + news + research)
and **Claude** (the product, `claude.com` + `claude.ai`, with dark-canvas
marketing + product chrome). Both families share the same typographic stack
(Anthropic Sans, Anthropic Serif, Anthropic Mono) and the same coral / clay
signature accent. Polarity inversion is the defining brand decision: the
parent corporation lives on warm cream `#faf9f5`; the consumer product lives
on near-black `#141413` / `#1f1f1e` / `#262624`. Both halves are first-class
— neither is a derived dark mode of the other.

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Anthropic homepage | `https://www.anthropic.com/` | `#faf9f5` cream | Sans-display h1 in `Anthropic Sans` weight 700; underlined inline links inside the headline; bottom of fold transitions into dark "Project Glasswing" editorial card with photographic backdrop. |
| Anthropic newsroom | `https://www.anthropic.com/news` | `#faf9f5` cream | Sans h1 "Newsroom" 32px / 700; press-inquiry rows with hairline dividers and small inline icons; featured article cards with serif h2. |
| Anthropic research | `https://www.anthropic.com/research` | `#faf9f5` cream | Sans h1 + serif body intro; inline tag-link cluster ("Alignment", "Economic Research", "Interpretability", "Societal Impacts" — all underlined link-styled); team-section list with sans h3 + serif body; featured article card with serif overlay on an image (yellow grid backdrop, "What if we could read an AI model's thoughts?"). |
| Project Glasswing | `https://www.anthropic.com/glasswing` | `#141413` near-black | Long-read editorial in dark canvas. Serif h1 48px / 400 on cream ink; Anthropic Sans for section h2; image insets keep the dark canvas. |
| Claude product overview | `https://claude.com/product/overview` | `#141413` near-black | Serif h1 "Meet your thinking partner" 43.15px / 500; sticky sub-nav ("Product / Explore here ▼"); dark elevated card with coral CTA pill "Ask Claude ↑" + chat-input mockup; large editorial section "How you can use Claude" with tabbed pill row (Tasks / Learn / Code / Research / Analyze / ⋯). |
| Claude pricing | `https://claude.com/pricing` | `#141413` near-black | Pricing-card grid (Free / Pro / Max / Team / Enterprise) — dark cards with small inline decorative icon, serif tier name, sans price, dashed-checkmark feature list, coral primary CTA. Long comparison table below ("Compare features across plans") with serif h2 and per-row check / cross glyphs. |
| Claude enterprise | `https://claude.com/pricing/enterprise` | `#141413` near-black | Serif h1 "Claude Enterprise" 43.15px / 500; breadcrumb subnav "Pricing / Enterprise / Explore here ▼"; two-column copy blocks with small leading icon (lightning bolt, people, bar chart) above sans h3. |
| Claude.ai login | `https://claude.ai/login` | `#1f1f1e` slightly-lighter near-black | Serif h1 "Think fast, build faster" display-size; centred auth card with white "Continue with Google" primary CTA (inverse polarity: white pill on dark), dark-fill input with "Enter your email" placeholder, dark "Continue with email" outline CTA, "Download desktop app" outlined pill at bottom. |
| Claude API docs | `https://platform.claude.com/docs/en/home` | `#262624` warmer-near-black | Serif h1 "Start building with Claude" 52px / 300 (light weight); search input pill `⌘K`; three outlined pill nav buttons "Quickstart / Get API key / API reference"; live code block with language tab strip (Python / TypeScript / Go / Java / Ruby / PHP / C# / cURL / CLI) and copy button; floating coral "Ask Docs" pill bottom-right; doc-section cards on dotted-grid backdrop ("Messages", "Managed Agents") with decorative SVG glyph. |

Three near-black dark surfaces appear across the catalog:

- `#141413` — `anthropic.com/glasswing`, `claude.com/product/overview`,
  `claude.com/pricing`, `claude.com/pricing/enterprise`. The canonical
  Claude marketing canvas.
- `#1f1f1e` — `claude.ai/login`. Slightly lighter; observed only on the
  pre-auth product surface.
- `#262624` — `platform.claude.com/docs`. Warmer / lighter still; the
  developer-docs canvas.

The three values are deliberate registers (Anthropic editorial dark / Claude
marketing dark / Claude.ai product dark / Anthropic developer-docs dark),
not synthesised variants. They appear together with no overlap.

## §2 Palette

Each entry: token name, OKLCH value (verified via culori round-trip), hex
equivalent, and a live citation. All OKLCH ↔ hex pairs below round-trip
exactly when re-encoded.

### Brand primary

- `--primary`: `oklch(0.6078 0.1379 39.0061)` (= `#c6613f`). The full-saturation
  Anthropic coral / Crail. Live: `https://www.anthropic.com/` — `<div class="btn_main_wrap is-nav">` containing the "Log in to Claude" nav pill (bg
  `rgb(198, 97, 63)`). Reappears as the floating "Ask Docs" pill on
  `platform.claude.com/docs`.
- `--brand-primary-soft`: `oklch(0.6724 0.1308 38.7559)` (= `#d97757`). The lighter
  coral used as the "Accept all cookies" CTA on `anthropic.com` cookie
  banner (`<button>Accept all cookies</button>`, bg `rgb(217, 119, 87)`).
  Also appears as the small inline coral pill on cookie-toggle UI and on
  some dark-card primary CTAs ("Ask Claude" composer button).

### Documented secondary brand colours

No second-chromatic brand colour is exposed at full chroma on the sampled
surfaces. Coral is the only saturated brand hue; everything else is the
cream-tan-near-black neutral ladder. Editorial article-card thumbnails
(e.g. the Glasswing voronoi image, "What if we could read an AI model's
thoughts?" yellow grid) sometimes carry decorative colour, but those are
photographic / illustration content rather than design-token chromatic
accents.

### Canvas + neutrals

- `--background`: `oklch(0.9818 0.0054 95.0986)` (= `#faf9f5`). Live:
  `https://www.anthropic.com/` — `getComputedStyle(document.body).backgroundColor`.
  The Anthropic cream canvas; the parent-brand canonical surface.
- `--foreground`: `oklch(0.1908 0.0020 106.5860)` (= `#141413`). Live:
  `https://www.anthropic.com/` — `body { color: rgb(20, 20, 19) }`. Doubles
  as the canonical Claude dark canvas (Claude marketing surfaces invert
  the polarity: this colour becomes the canvas, `--background` becomes the
  ink).
- `--brand-canvas-dark-deep`: `oklch(0.1908 0.0020 106.5860)` (= `#141413`).
  Polarity-locked dark canvas on `claude.com/product/overview`,
  `claude.com/pricing`, `claude.com/pricing/enterprise`, and the dark
  editorial card on `anthropic.com/` (Project Glasswing).
- `--brand-canvas-dark`: `oklch(0.2389 0.0019 106.5407)` (= `#1f1f1e`).
  Live: `https://claude.ai/login` — `body { background: rgb(31, 31, 30) }`.
  Used on `claude.ai/login`.
- `--brand-canvas-docs`: `oklch(0.2679 0.0036 106.6428)` (= `#262624`).
  Live: `https://platform.claude.com/docs/en/home` — `body { background:
  rgb(38, 38, 36) }`. The developer-docs canvas.
- `--brand-on-dark`: `oklch(0.9818 0.0054 95.0986)` (= `#faf9f5`). Live:
  `claude.com/product/overview` — h1 colour. Cream ink on every Claude
  dark canvas.
- `--brand-on-dark-soft`: `oklch(0.9786 0.0026 106.4483)` (= `#f8f8f6`).
  Live: `claude.ai/login` — `body { color: rgb(248, 248, 246) }`. A faintly
  cooler cream that the login surface uses in place of `#faf9f5`.
- `--card`: `oklch(0.9237 0.0135 97.4518)` (= `#e8e6dc`) — observed as the
  warm-tan elevated panel on `anthropic.com/`'s "Project Glasswing"
  surrounding rim and similar cream-on-cream editorial cards. Live:
  `anthropic.com/` — cream card surfaces around the article grid.
- `--card-foreground`: `oklch(0.1908 0.0020 106.5860)` (= `#141413`).
  Inherits `--foreground` on light canvas.
- `--popover`, `--popover-foreground`: assumed to mirror card (synthesised —
  no popover captured in this cycle).
- `--muted`: `oklch(0.9485 0.0109 95.1665)` (= `#f0eee6`). The lighter
  inset cream observed on form rows and on the "Read announcement →"
  card surfaces. Live: `anthropic.com/news` — press-inquiry row inset.
- `--muted-foreground`: `oklch(0.6188 0.0104 100.0882)` (= `#87867f`). The
  warm-stone mid-grey used for date / category metadata on article cards.
  Live: `anthropic.com/news` — "DATE / CATEGORY" label rows on the
  Latest-releases card.
- `--accent`: `oklch(0.8917 0.0213 79.0861)` (= `#e3dacc`). Tan-sand card
  accent observed on alternating editorial cards ("Claude is a space to
  think") and on cookie-banner background panels. Live: `anthropic.com/` —
  tan card below "Latest releases".
- `--accent-foreground`: `oklch(0.1908 0.0020 106.5860)` (= `#141413`).
- `--secondary`: `oklch(0.9237 0.0135 97.4518)` (= `#e8e6dc`). Doubled with
  `--card` — the same warm-cream surface.
- `--secondary-foreground`: `oklch(0.1908 0.0020 106.5860)` (= `#141413`).
- `--destructive`: not directly observed in this cycle (synthesised — keep
  current `tokens.css` red).
- `--destructive-foreground`: synthesised.
- `--border`: `oklch(0.8917 0.0213 79.0861)` (= `#e3dacc`) — same hue as
  `--accent`, observed as the warm hairline between newsroom rows and
  around cream cards. Live: `anthropic.com/news` — `<hr>`-like dividers
  between press-inquiry rows.
- `--input`: matches `--border`.
- `--ring`: `oklch(0.6078 0.1379 39.0061)` (= `#c6613f`). Same as `--primary`.

### Polarity-locked surfaces

Tokens that stay fixed across `:root` and `[data-theme="dark"]`:

- `--brand-canvas-dark-deep`: `oklch(0.1908 0.0020 106.5860)` (= `#141413`).
  The Claude marketing canvas does not flip with theme — it is the
  identity surface for `claude.com/pricing`, `claude.com/product/overview`,
  Project Glasswing, regardless of OS theme preference. Live: every dark
  Claude / Anthropic surface above.
- `--brand-on-dark`: `oklch(0.9818 0.0054 95.0986)` (= `#faf9f5`). Cream
  ink on the polarity-locked dark canvas. Live: every dark Claude /
  Anthropic surface above.

### Ink ladder (warm-neutral foreground stack)

- `--brand-ink-strong`: `oklch(0.3590 0.0051 106.6524)` (= `#3d3d3a`).
  Live: `anthropic.com/` — secondary-line body text inside cream cards.
- `--brand-ink-mute`: `oklch(0.6188 0.0104 100.0882)` (= `#87867f`).
  Live: `anthropic.com/news` — "DATE / CATEGORY" label rows.
- `--brand-ink-subtle`: `oklch(0.7499 0.0129 96.4777)` (= `#b0aea5`).
  Live: `anthropic.com/` — dimmest editorial caption text.
- `--brand-on-dark-soft`: `oklch(0.8066 0.0140 97.4858)` (= `#c2c0b6`).
  Live: `claude.com/product/overview` — top-nav muted link colour.
- `--brand-on-dark-faint`: `oklch(0.6855 0.0117 95.2290)` (= `#9c9a92`).
  Live: `platform.claude.com/docs` — eyebrow caption ("PLATFORM",
  "DEVELOPER JOURNEY") small-caps on dark canvas; also nav-dropdown
  labels on dark.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.8917 0.0213 79.0861)` (= `#e3dacc`).
  Live: `anthropic.com/news` — newsroom row separators on cream canvas.
- `--brand-hairline-on-dark`: observed as `color(srgb 1 1 1 / 0.1)` — a
  10%-opacity cream / white rule on dark canvases. Live:
  `claude.com/product/overview` — divider between hero and below-fold
  section; same value on `platform.claude.com/docs` between sections.

### Drift vs `tokens.css`

Cross-checked the live-observed values above against the current
`tokens.css`. Substantive disagreements:

- **`--primary`** drifts. `tokens.css` ships `oklch(0.6580 0.1131 39.1453)`
  (= `#cc785c`); the live brand uses **two** coral values, `#c6613f` (= the
  saturated Crail observed on the `anthropic.com` nav "Log in to Claude"
  pill, `oklch(0.6078 0.1379 39.0061)`) and `#d97757` (= the softer cookie
  CTA, `oklch(0.6724 0.1308 38.7559)`). The token's current `#cc785c` is
  midway between the two — neither is a verbatim sample. Reconciliation:
  replace `--primary` with the saturated coral (`oklch(0.6078 0.1379
  39.0061)`); introduce `--brand-primary-soft` (`oklch(0.6724 0.1308
  38.7559)`) for the lighter pill variant; document `--brand-primary-active`
  as the active-state ladder member rather than as a synthesised darker.
- **`--brand-primary-active`** in `tokens.css` is `oklch(0.5518 0.1133
  38.4596)` (= `#a44e34`) — not observed live in this cycle. Mark as
  synthesised in `tokens.css` until a live press / hover state is sampled.
- **`--background`** in `tokens.css` is `oklch(0.9818 0.0054 95.0986)`
  (= `#faf9f5`). Matches live cream canvas exactly — no drift.
- **`--foreground`** in `tokens.css` is `oklch(0.1908 0.0020 106.5860)`
  (= `#141413`). Matches live exactly — no drift.
- **`--brand-surface-dark`** in `tokens.css` is `oklch(0.2050 0.0042
  84.5898)` (= `#1f1f1d`). The live brand uses **three** distinct dark
  canvases (`#141413`, `#1f1f1e`, `#262624`). The current single
  `--brand-surface-dark` token collapses the three into one. Reconciliation:
  split into `--brand-canvas-dark-deep` (`#141413`), `--brand-canvas-dark`
  (`#1f1f1e`), and `--brand-canvas-docs` (`#262624`); decide which one
  drives `[data-theme="dark"]` and the preview canvas (recommendation:
  `#141413` because it carries the marketing identity).
- **`--brand-surface-dark-elevated`** in `tokens.css` is `oklch(0.2572
  0.0063 78.2148)` (= `#2c2a26`). Close to but not identical with the
  observed `#262624` docs canvas; treat as an elevated panel on top of
  `#141413`, not as the docs canvas itself.
- **`--accent`** in `tokens.css` is `oklch(0.7213 0.0918 178.9978)` — a
  saturated teal. **No teal observed live** across any sampled surface.
  Reconciliation: drop the teal and re-home `--accent` to the warm-tan
  card surface (`oklch(0.8917 0.0213 79.0861)` = `#e3dacc`) that
  `anthropic.com` actually ships.
- **`--brand-accent-amber`** in `tokens.css` is `oklch(0.7716 0.1212
  67.3858)`. **No saturated amber observed live** — the yellow appears
  only inside an illustration (the research-card grid). Mark as
  synthesised or remove.
- **`--brand-success`** (= green) and **`--brand-warning`** (= amber): not
  observed live; both are template inheritance, mark synthesised.
- **`--card`** in `tokens.css` is `oklch(0.9357 0.0161 82.7919)` (= `#eee9da`).
  Live observation: `#e8e6dc` (`oklch(0.9237 0.0135 97.4518)`). Minor
  drift, same warm-tan family — reconcile to the live value.
- **`--muted` / `--secondary`** in `tokens.css` is `oklch(0.9568 0.0119
  79.7842)` (= `#f3eee0`). Live observation: `#f0eee6` (`oklch(0.9485 0.0109
  95.1665)`). Slight chroma drift; the live value sits closer to the
  cream canvas. Reconcile to live.
- **`--brand-body`** in `tokens.css` is `oklch(0.3590 0.0051 106.6524)`
  (= `#3d3d3a`). Matches `--brand-ink-strong` observed live exactly — no
  drift.
- **`--brand-muted-soft`** in `tokens.css` is `oklch(0.5000 0.0136
  91.5842)` (= `#6e6c63`), with a comment noting it was darkened from
  `0.6366` for AA. The live brand uses a lighter `#87867f` (`oklch(0.6188
  0.0104 100.0882)`) for label / metadata text; the `0.5000` value is a
  contrast-fix override, not a live observation. Leave the override in
  place for AA but document the live-observed value as the brand-doc
  `--brand-ink-mute`.

## §3 Typography

The brand ships three proprietary families, each named in the CSS stack:

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (Claude marketing) | Anthropic Serif | 500 | 43.15px (~2.7rem) | tight (~1.05) | normal |
| Display (Claude docs) | Anthropic Serif | 300 | 52px | 1.1 | normal |
| Display (Anthropic homepage) | Anthropic Sans | 700 | 44.5px | 1.1 | normal |
| Heading (Anthropic editorial) | Anthropic Serif | 400 | 48px | 1.1 | normal |
| Heading (Claude enterprise sub) | Anthropic Serif | 500 | 38.6px | 1.1 | normal |
| Section title | Anthropic Sans | 600 / 700 | 23–32px | 1.2 | normal |
| Title / card | Anthropic Sans | 500 / 600 | 17–23px | 1.3 | normal |
| Body | Anthropic Sans | 400 | 16–19px | 1.55 | normal |
| Body (editorial intro) | Anthropic Serif | 400 | 19–22px | 1.4 | normal |
| Caption / eyebrow | Anthropic Sans | 400 | 12–14px | 1.4 | 0.12px (small-caps register) |
| Mono / code | Anthropic Mono | 400 | 13–14px | 1.5 | normal |

Notes on observed conventions:

- **Sans for the parent corporation hero, serif for the product**. The
  `anthropic.com` homepage h1 ("AI research and products that put safety
  at the frontier") is Anthropic Sans 700 with hyperlink underlines
  embedded in the headline ("research", "products"); the
  `claude.com/product/overview` h1 ("Meet your thinking partner") is
  Anthropic Serif 500. Editorial pages (`/news`, `/research`) on the
  cream canvas use sans bold for the section title and serif for body
  intro paragraphs.
- **Anthropic Sans falls back to Arial then sans-serif**. Anthropic Serif
  falls back to Georgia then serif. Anthropic Mono falls back to monospace
  generic. On `platform.claude.com/docs` the stack names appear as
  `anthropicSans` / `anthropicSerif` (no quotes, lowercased — a
  bundler-generated name). Both naming conventions point at the same
  proprietary family.
- **Tracking is mostly normal**. The 12px caption-eyebrow role used on
  navigation dropdowns and docs section eyebrows ("PLATFORM", "DEVELOPER
  JOURNEY") carries `letter-spacing: 0.12px` — small but enough to read
  as a small-caps register.
- **Serif weight 300 only on docs**. The `platform.claude.com/docs` h1
  uses Anthropic Serif at weight 300 (thin display) — the only sampled
  surface where the serif gets used at that lightness. Every other serif
  heading lands at 400 or 500.
- **No display-only variable axis observed**. Each family is referenced
  by named weight (300 / 400 / 460 / 500 / 600 / 700); weight 460 appears
  on docs h2 (CSS spec allows arbitrary integer weights, so this is
  literal-weight on a variable font, not a synthesised oblique).

## §4 Component vocabulary

### claude-wordmark

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — top-left
"Claude" wordmark; sibling logo `https://www.anthropic.com/` shows the
"A\\" Anthropic mark on cream.
**Description:** the Claude wordmark is the literal word "Claude" set in
Anthropic Serif at ~weight 500, preceded by a small **eight-pointed
sparkle / star glyph** rendered in coral. The glyph is a single
geometric mark, not a photographic logo. On dark surfaces the wordmark
ink is `#faf9f5` cream. The parent Anthropic mark (`anthropic.com`)
substitutes a two-character "A\\" monogram in solid black on cream, sans
the sparkle. Both marks live in a left-aligned top-nav slot with a
hamburger trigger at the right.
**States:** static. Hover behaviour not animated in this sample.

### anthropic-wordmark

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — top-left "A\\" monogram.
**Description:** the literal characters "A\\" — capital A followed by a
backslash — set in Anthropic Sans at ~24px / weight 700 in solid
`#141413` ink on cream. Functions as the parent corporate mark; appears
on every `anthropic.com` page including the Glasswing editorial (where
it inverts to cream on dark).
**States:** static.

### nav-top-anthropic

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — `<header>` with hamburger
trigger.
**Description:** minimal top bar. Left: wordmark. Right: a single
hamburger icon button (no inline link list at the sampled viewport
width). Background inherits canvas — no fill, no hairline below the
bar. Pad: 28px vertical / 24px horizontal.
**States:** sticky on scroll; the bar darkens its ink one step when the
page scrolls past the hero.

### nav-top-claude

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — `<header>`.
**Description:** dark-canvas top bar with cream wordmark left, hamburger
right. Inline drop-down triggers ("Meet Claude", "Platform", "Product")
appear at wider viewports (sampled as `<button>` rows in the DOM at the
captured width, but visually collapsed into the hamburger). Drop-down
labels carry `--brand-on-dark-soft` (= `#c2c0b6`) ink. The "Log in to
Claude" CTA at top-right is a coral pill.
**States:** default; the dropdown labels hover from `c2c0b6` to `#faf9f5`
on `transition-colors` (DOM class `hover:text-text-100`).

### subnav-breadcrumb

**Status:** `current`
**Live source:** `https://claude.com/product/overview`,
`https://claude.com/pricing/enterprise` — sticky strip below the top nav.
**Description:** thin sticky strip with section label left ("Product",
"Pricing / Enterprise") and a "Explore here ▼" trigger right.
Background inherits dark canvas with a 10%-opacity cream hairline
below. Font: Anthropic Sans 14px / weight 400 in `#c2c0b6` ink.
**States:** sticks to the top of the viewport when the hero scrolls past.

### button-primary-coral

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — `<div class="btn_main_wrap
is-nav">` containing "Log in to Claude". Also: cookie-banner "Accept
all cookies", `claude.com/product/overview` "Ask Claude ↑" composer
button.
**Description:** filled coral pill with cream ink. `background:
#c6613f` (the saturated Crail) on the corporate nav variant;
`background: #d97757` (the softer coral) on the cookie banner — the
brand ships **two coral tones** as button fills, both within the
`oklch(0.6 0.13 39)` neighbourhood. `border-radius: 8px` (nav) or
`border-radius: 12px` (cookie); never a full pill. Pad: 8–16px / 8px.
Font: Anthropic Sans 12–16px / weight 400. The "Ask Claude ↑" variant
carries an inline upward-arrow glyph after the label.
**States:** default; hover is a slight lightness lift (not measured on
this pass — would need a hover snapshot).

### button-primary-white-on-dark

**Status:** `current`
**Live source:** `https://claude.ai/login` — "Continue with Google"
inside the auth card.
**Description:** filled near-white pill with dark ink on the dark
canvas — the inverse-polarity primary. Used inside cards on dark
surfaces when the coral pill isn't appropriate (auth providers). Fill:
`#faf9f5`-ish cream; ink: `#141413`. `border-radius`: 8px. Pad: 12px /
24px. Font: Anthropic Sans 16px / weight 500.
**States:** default. Hover slightly dims the fill (not snapshotted).

### button-outline-dark

**Status:** `current`
**Live source:** `https://claude.ai/login` — "Continue with email"; same
shape as "Download desktop app" at the bottom of the login page.
**Description:** outlined pill on dark canvas. `border: 1px solid
rgba(255, 255, 255, 0.15)`; transparent fill; ink `#faf9f5`. `border-radius:
8px`. Pad: 12px / 24px. Font: Anthropic Sans 16px / weight 500.
**States:** hover lifts the border opacity to ~0.3.

### button-outline-light

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — "Reject all cookies"
(visible on the cookie modal). Also: card-internal CTAs like "Model
details →" with an inline right-arrow.
**Description:** outlined pill on cream canvas. `border: 1px solid
#141413`; ink `#141413`; transparent fill. `border-radius: 12px`. Pad:
8–12px / 16px. Font: Anthropic Sans 12–14px / weight 400. Arrow
variants include a small inline arrow glyph at the end of the label.
**States:** hover fills with `#141413` ink-on-cream inversion.

### button-pill-secondary-on-dark

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — "Start importing"
(inside the elevated dark card).
**Description:** filled cream-on-dark pill with dark ink. Fill: a slightly
muted cream — same family as the on-dark-soft token. Ink: `#141413`.
`border-radius: 9999px` (full pill, unlike the 8px corporate variant).
Pad: 8px / 24px. Used inside nested editorial cards on dark canvas where
a coral CTA would compete with the card's own background.
**States:** default.

### button-cta-arrow

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — "Read announcement →"
(latest-releases card); also "Model details →" inline.
**Description:** dark filled pill with cream ink and an inline right-arrow
icon. Fill: `#141413`. Ink: `#faf9f5`. `border-radius: 9999px` (full
pill). Pad: 12px / 20px. The right-arrow is a thin Lucide-style stroke
icon, not a glyph.
**States:** default.

### button-nav-pill

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — "Quickstart
/ Get API key / API reference" row.
**Description:** outlined pill with small leading icon (play triangle,
key, brace). `border: 1px solid rgba(255, 255, 255, 0.1)`; fill
transparent; ink `#9c9a92` default, `#faf9f5` on hover. `border-radius:
9999px` (full pill). Pad: 4px / 8px (compact). Font: Anthropic Sans 14px
/ weight 400.
**States:** default → hover lifts the ink to full cream and the border
to ~0.3 opacity.

### button-floating-pill

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — "Ask Docs"
bottom-right floating button.
**Description:** floating coral pill anchored to the bottom-right
viewport corner. Fill `#c6613f`. Ink `#faf9f5`. `border-radius: 9999px`.
Pad: 10px / 16px. Carries a small book-icon glyph on the right of the
label.
**States:** floats above content; click triggers an in-page docs
assistant.

### card-editorial-feature-cream

**Status:** `current`
**Live source:** `https://www.anthropic.com/news` — "Introducing Claude
Opus 4.7" feature card; `https://www.anthropic.com/research` — featured
article.
**Description:** large editorial card on cream canvas. Often anchors an
illustration / photographic image at the top (coral panel + grid panel
diptych on the Opus 4.7 card; yellow numerical grid on the Research
featured). Below the image: Anthropic Sans h2 ~23px / weight 600,
metadata row "Category · Date", body paragraph, hairline divider before
the next card. `border-radius: 16–20px`. No visible shadow — the card
distinguishes from canvas by a subtly darker surface tint.
**States:** linkified entire card; hover lifts no shadow but darkens
text underline on the title.

### card-editorial-feature-dark

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — "Project Glasswing"
hero card.
**Description:** large editorial card on dark canvas (`#141413`) with a
photographic backdrop (the voronoi cracked-glass illustration). Serif
h2 "Project Glasswing" 60.6px / weight 400 overlaid in cream. The card
itself fills the viewport width with `border-radius` matching the
section corner radius (~24px); the photographic content carries the
visual weight, not the card chrome.
**States:** click navigates to the editorial page.

### card-pricing-tier-dark

**Status:** `current`
**Live source:** `https://claude.com/pricing` — "Max" tier card (sampled);
sibling Free / Pro / Team / Enterprise.
**Description:** dark elevated card on `#141413` canvas. Inside,
top-to-bottom: a small monochrome decorative SVG glyph (anchor for Max,
seedling, sparkle for Claude — see below), serif tier name "Max" ~36px /
weight 500, sans subhead "Get the most out of Claude" ~16px / 400, large
price "From $100" sans weight 600, "Per month" caption in `#87867f`-ish
mute, **full-width coral primary CTA "Try Claude"**, then a divided list
of feature rows each preceded by a thin checkmark glyph and rendered in
cream ink. The card itself is the same fill as the canvas, distinguished
only by a subtle stroke and consistent pad. `border-radius`: ~24px. Pad:
32–40px.
**States:** default; CTA hover lightens the coral by one step.

### card-comparison-row

**Status:** `current`
**Live source:** `https://claude.com/pricing` — "Compare features across
plans" table.
**Description:** wide table card with a sticky four-column header row
(Free / Pro / Max 5x / Max 20x) in serif weight 500, separated from
following feature-row cells by a thin cream hairline. Feature names
left-aligned in Anthropic Sans 16px; per-column cells carry either a
filled circular check (cream on dark) or a hairline cross (mute) glyph.
Section dividers ("Features and capabilities", "Artifacts", "Projects")
are large headings with a `−` collapse glyph at the right edge. No
background bands — the dividers carry the structure.
**States:** sections collapse / expand via the trailing icon.

### card-doc-section

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — "Messages"
and "Managed Agents" feature cards.
**Description:** large dotted-grid-backdropped card on the docs canvas
(`#262624`). A subtle dotted background pattern fills the upper third;
a decorative monochrome SVG glyph (code window for Messages, cloud for
Managed Agents) sits centered in the dotted band. Below: serif h3
~24px / weight 500, sans body 16px, then a stack of inline-icon link
rows ("Quickstart", "API reference", "Client SDKs") each with a tiny
leading icon (play, book, brace) and ink in cream. `border-radius`:
24px. Pad: 32–40px.
**States:** entire card linkified; inline-link rows can be clicked
independently.

### card-newsroom-row

**Status:** `current`
**Live source:** `https://www.anthropic.com/news` — "Press inquires /
Non-media inquiries / Media assets" stack at the top of the Newsroom
page.
**Description:** narrow inline-list card on cream canvas. Each row
carries a leading caption label ("Press inquires", "Non-media
inquiries", "Media assets") in sans 12–14px ink-strong, then a wide
content row with a small leading icon (mailbox, question circle,
download arrow) and the response (`press@anthropic.com`, "How to get
support", "Download press kit") rendered as an underlined link in body
size. Hairlines (`--brand-hairline-soft` = `#e3dacc`) separate rows.
**States:** linkified per row.

### card-research-team

**Status:** `current`
**Live source:** `https://www.anthropic.com/research` — "Interpretability
/ Alignment / Societal Impacts / Frontier Red Team" section list.
**Description:** stacked list of team blocks. Each block: sans h3 28px /
weight 600 team name on its own line, then a serif-or-sans (sample
ambiguous) body paragraph ~16–17px describing the team's mission. Thin
hairline between blocks. No card chrome — pure typographic structure on
the cream canvas.
**States:** static.

### card-article-summary-thumb

**Status:** `current`
**Live source:** `https://www.anthropic.com/research` — article list
below the featured ("Natural Language Autoencoders", "Teaching Claude
why", "Project Deal" etc.).
**Description:** category-tag eyebrow ("Interpretability", "Alignment",
"Research") in sans 13px / weight 500 with `letter-spacing: 0.12px` and
ink-mute color, separated from the date by a thin spacer dot or simply
spaced. Sans h3 title 20px / weight 600. One-paragraph excerpt in body
size. No image thumbnail at the smallest variant; full-width article
sections include image. Cards are stacked vertically with hairline
dividers.
**States:** entire row linkified.

### input-text-cream

**Status:** `current`
**Live source:** `https://claude.ai/login` — "Enter your email" text
input.
**Description:** outlined text input on dark elevated card. `border: 1px
solid rgba(255, 255, 255, 0.15)`. Fill: same as card surface
(`rgba(0,0,0,0)` over the elevated panel). Ink `#faf9f5`. Placeholder
ink `#9c9a92`. `border-radius: 8px`. Pad: 12px / 16px. Font: Anthropic
Sans 14–16px.
**States:** focus lifts the border opacity to ~0.4 — no separate ring
colour observed (the border itself is the ring).

### input-textarea-composer

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — "How can I help
you today?" mockup composer at the bottom of the page.
**Description:** large dark composer card. Inside, a transparent
`<textarea>` with placeholder "How can I help you today?" in
`#9c9a92`-ish ink-mute; a coral pill button "Ask Claude ↑" anchored
bottom-right of the same card. The card itself has the `card-pricing-
tier-dark` chrome (24px border-radius, no visible border, dark fill).
The textarea has no border / no border-radius of its own — it's a
borderless typing zone inside the card.
**States:** placeholder visible until first keystroke (sampled with
empty value).

### input-search-pill

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — "What do
you want to build? ⌘K" search pill.
**Description:** dark fill pill with leading magnifying-glass icon and a
trailing `⌘K` keyboard shortcut hint chip. `border-radius: 9999px`. Pad:
12px / 16px. Font: Anthropic Sans 14px in cream. The keyboard hint
("⌘K") sits in a small inset chip with the docs canvas fill,
`border-radius: 6px`.
**States:** focus opens a command-palette overlay (not sampled).

### tab-strip-language-pill

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — code-block
language strip ("Python / TypeScript / Go / Java / Ruby / PHP / C# /
cURL / CLI").
**Description:** horizontal row of compact text-only tabs above a code
block. Selected tab ("Python") is rendered with cream ink and a thin
underline; unselected tabs in `#9c9a92` ink-mute. No fill, no border —
purely a typographic tab strip. Font: Anthropic Sans 14px.
**States:** active = full-ink + underline; inactive = mute.

### tab-strip-feature-pill-dark

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — "Tasks / Learn
/ Code / Research / Analyze / ⋯" row in the "How you can use Claude"
section.
**Description:** horizontal row of pill tabs with leading icon glyphs
(calendar, globe, code, document, chart, ellipsis). Selected "Tasks"
tab carries a faint `rgba(255, 255, 255, 0.05)` fill and full-cream ink;
unselected tabs ink-mute on transparent fill. `border-radius: 9999px`.
Pad: 6px / 12px.
**States:** active = subtle fill + full ink; inactive = transparent +
mute.

### code-block

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — Python /
TS / Go code samples below the search pill.
**Description:** monospace code block on a slightly elevated dark
surface (`oklch(0.22 ... 100)` family — one step lighter than the docs
canvas). Anthropic Mono 13px. Syntax highlighting uses:
- magenta-violet `oklch(0.7 0.15 305)` for keywords (`import`, `client`,
  `messages`)
- soft amber-orange `oklch(0.75 0.10 60)` for strings (`"claude-opus-4-7"`,
  `"role"`)
- mute cream for punctuation
- ink-mute for comments
(values approximated from screenshot; not DOM-sampled in this cycle).
A copy-button icon sits top-right of the block.
**States:** static; copy button fires on click.

### feature-row-icon-stack

**Status:** `current`
**Live source:** `https://claude.com/pricing/enterprise` — "Get work
done faster / Expand what your teams can do / Scale your institutional
knowledge" two-column copy blocks.
**Description:** vertical stack of two-column rows. Left column carries
a thin-stroke monochrome icon (lightning bolt, people, bar chart);
right column carries a serif h3 23–28px / weight 500 and a body
paragraph. Icons sit at ~24px stroke 1.5px. No card chrome — pure
typographic structure with generous vertical padding (~80px between
rows).
**States:** static.

### feature-decorative-glyph

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — the hand-drawn
"waving cloud / fingers on bell" glyph above "How you can use Claude".
Also: the "Compare features across plans" magnifier glyph on
`/pricing`; the hand-drawn cloud at the page foot.
**Description:** large monochrome cream-on-dark decorative SVG glyph,
hand-drawn style, ~80–120px square. Functions as a section opener; the
heading sits immediately below. The glyph stroke is thin (~1.5px),
non-filled, slightly imperfect linework reading as illustrative rather
than iconic. Used 1× per major section.
**States:** static decorative.

### feature-decorative-icon-pricing

**Status:** `current`
**Live source:** `https://claude.com/pricing` — small anchor / seedling /
sparkle glyph above each pricing-card tier name.
**Description:** ~40px square monochrome decorative SVG glyph at the
top of each pricing card. Each tier carries its own glyph (anchor for
Max, seedling for Pro?, sparkle for Free?). Stroke ~1.5px. Cream ink.
Acts as a per-tier visual differentiator.
**States:** static.

### pricing-row-feature-check

**Status:** `current`
**Live source:** `https://claude.com/pricing` — comparison table rows.
**Description:** per-column glyph indicating availability:
- `✓` = filled circular check, cream ink, ~16px diameter. Available
  feature.
- `×` = thin-stroke cross glyph, mute ink. Unavailable.
Both glyphs are centred horizontally within the column.
**States:** static.

### section-eyebrow-tracked-caps

**Status:** `current`
**Live source:** `https://platform.claude.com/docs/en/home` — "PLATFORM",
"DEVELOPER JOURNEY" labels above each section heading.
**Description:** small-caps eyebrow caption above a section h2. Font:
Anthropic Sans 12px / weight 400, `letter-spacing: 0.12px`, full-caps,
ink `#9c9a92` on dark / `#87867f` on cream. Sits 8–12px above the
heading.
**States:** static.

### definition-list-row

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — Latest-releases card
"DATE / CATEGORY" rows; `claude.com/pricing` "Per month*" caption row.
**Description:** two-column metadata row inside a card. Left column =
all-caps label in 12px sans weight 500 in ink-mute (`#87867f`); right
column = the value in body sans 14–16px. Hairline divider above and
below each row. Visible on both cream and dark cards.
**States:** static.

### blockquote-editorial-serif

**Status:** `current`
**Live source:** `https://www.anthropic.com/glasswing` — body text in
the dark editorial.
**Description:** body text on the editorial dark page is set in Anthropic
Serif 17–19px / weight 400 with `line-height` ~1.55. Long-form paragraphs
use serif; section headings use sans. No drop-caps; no quote-glyph
prefix on conventional paragraphs. The serif body register is the
editorial-pages tell.
**States:** static.

### link-inline-underline

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — h1 "AI **research** and
**products** that put safety at the frontier" with the underlined
inline links. Also `anthropic.com/research` — tag-link row
("Alignment / Economic Research / Interpretability / Societal Impacts").
**Description:** inline anchor links inherit the surrounding text's
weight, size and family but carry a `text-decoration: underline` rule.
Underline thickness matches the typeface stem. Ink colour matches the
surrounding text; no separate accent colour. On hover the underline can
go to thicker or to coral (not measured this pass).
**States:** default = underlined; hover (not snapshotted) likely
removes the underline or thickens it.

### cookie-banner

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — bottom-right modal
"Cookie Settings".
**Description:** rounded panel anchored bottom-right of the viewport.
`background: #e3dacc`-ish tan-cream, ~340px wide, 16px corner radius,
~24px pad. Heading "Cookie Settings" in sans h3. Body paragraph in
body 14px ink-strong. Two CTAs at the bottom: "Reject all cookies"
(outline-light pill, dark ink) on the left and "Accept all cookies"
(filled coral pill, cream ink) on the right. A "Customize cookie
settings" outline pill at the top spans the full inner width.
**States:** dismisses on click; reappears on next session.

### floating-claude-mcp-pill

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — bottom-right "Claude is
active in this tab group" floating pill.
**Description:** small floating capsule with a coral sparkle glyph
left, body text 14px sans cream-on-dark ("Claude is active in this tab
group"), and a close-X right. `border-radius: 9999px`, dark fill,
narrow pad. Anchored bottom-right; sits above the cookie banner when
both are present.
**States:** dismisses on close-X click; only appears on browsers running
the Claude in Chrome extension.

### auth-card

**Status:** `current`
**Live source:** `https://claude.ai/login` — centred auth panel.
**Description:** centred dark-elevated card on the `#1f1f1e` canvas.
~360px wide. `border-radius: 16px`. Pad: 32px. Contains: primary
"Continue with Google" button-primary-white-on-dark; horizontal "OR"
divider with hairline rules left and right; input-text-cream "Enter
your email"; button-outline-dark "Continue with email" full-width;
small caption "By continuing, you acknowledge Anthropic's Privacy
Policy" with the Privacy Policy as an underlined link. The whole card
floats centred under the h1 + tagline.
**States:** static.

### footer-claude

**Status:** `current`
**Live source:** `https://claude.com/product/overview` — bottom of page.
**Description:** dark footer with cream ink. Anthropic / Claude wordmark
+ small cloud doodle illustration top-left; multi-column link list
("Products / Features / Models / Use cases / Resources / Company /
Legal") in sans 14px. A bottom rule across the full width.
`background` continues the page canvas (`#141413`).
**States:** static.

### footer-anthropic

**Status:** `current`
**Live source:** `https://www.anthropic.com/` — bottom of page.
**Description:** cream-canvas footer with dark ink. Anthropic "A\\"
mark left, link list "Claude / API / Solutions / Research / Commitments
/ Learn / Careers / News / Pricing" in sans 14px. Lower row carries
small-print legal links and a country selector.
**States:** static.

## §5 Surface inventory

- `https://www.anthropic.com/` — parent corporate canvas. Confirms the
  cream canonical surface (`#faf9f5`), the editorial card stack on cream,
  the "Project Glasswing" dark-card-on-cream pattern, the
  cookie-banner + floating-Claude-mcp-pill chrome.
- `https://www.anthropic.com/news` — newsroom h1 in sans 700; press-row
  hairlines; featured editorial article card pattern.
- `https://www.anthropic.com/research` — research team list pattern;
  inline tag-link cluster; featured-article card with serif h2 overlaid
  on a yellow-grid illustration.
- `https://www.anthropic.com/glasswing` — dark long-read editorial. The
  one place I sampled where Anthropic puts dark-canvas behind serif
  body text. Serif h1 48px / 400.
- `https://claude.com/product/overview` — Claude consumer-marketing
  canonical. Confirms the dark `#141413` canvas, the chat-composer
  mockup, the section-decorative-glyph rhythm, the feature-tab pill
  row.
- `https://claude.com/pricing` — pricing-card grid pattern; comparison
  table; per-tier decorative glyphs; coral primary CTA inside cards.
- `https://claude.com/pricing/enterprise` — feature-row-icon-stack
  pattern; breadcrumb subnav.
- `https://claude.ai/login` — pre-auth product surface. Confirms the
  `#1f1f1e` lighter dark variant, the auth-card chrome, the inverse-
  polarity white-pill primary on dark.
- `https://platform.claude.com/docs/en/home` — developer-docs canonical.
  Confirms the `#262624` warm-near-black canvas, the dotted-grid
  backdrop on doc-section cards, the code-block + language-tab strip,
  the search-pill with `⌘K` hint, the "Ask Docs" floating coral pill.

## §6 Notes

- **The brand is two registers, not one.** Anthropic-on-cream is the
  parent corporate canvas; Claude-on-near-black is the product canvas.
  Both ship together (`anthropic.com/glasswing` is on the dark canvas
  even though the rest of `anthropic.com` is cream — the editorial /
  long-read register inverts polarity). When picking a preview canvas,
  either pole is canonical. The current `tokens.css` has the cream as
  `:root` and the dark as `[data-theme="dark"]`, which is the
  defensible default — but the "dark as primary" choice would equally
  reflect the brand identity.
- **Three dark canvases, not one**. `#141413` / `#1f1f1e` / `#262624`
  are distinct (Claude marketing / Claude.ai login / docs). The current
  `tokens.css` `--brand-surface-dark` collapses them to a single
  `#1f1f1d` which is close to the login canvas but not to the canonical
  marketing canvas. Split.
- **Coral lives in two specific places.** Saturated `#c6613f` on the
  corporate nav "Log in to Claude" pill; softer `#d97757` on the cookie
  CTA and small coral pills. Coral never appears as body text or as a
  large surface fill — only as button pills, the small wordmark sparkle
  glyph, and the "Claude is active" pill ornament. Treat coral as a
  CTA / accent identity, never as a tint or body colour.
- **No teal anywhere.** The current `tokens.css` ships a teal
  `oklch(0.7213 0.0918 178.9978)` as `--accent` — this is upstream
  inheritance, not a live brand colour. Re-home `--accent` to the
  warm-tan card surface.
- **Anthropic ships sans-display on the corporate hero, serif-display
  on the product hero.** Specifically: `anthropic.com/` uses Anthropic
  Sans 700 for the h1; every `claude.com/*` page uses Anthropic Serif
  for the h1. This is a deliberate split — sans = corporate /
  institutional / news / research; serif = product / consumer /
  editorial long-read.
- **The Claude wordmark is "Claude" set in Anthropic Serif weight 500,
  preceded by a small coral sparkle.** Not a logotype, not a custom
  glyph; just a typeset word with a leading ornament. The Anthropic
  wordmark is the "A\\" two-character monogram.
- **Decorative SVG glyphs read as illustrative rather than iconic.**
  Hand-drawn, thin-stroke, monochrome, slightly imperfect linework. They
  sit above section headings as a visual cue — not branded iconography,
  more like editorial ornaments.
- **Tracked-caps eyebrow** is the recurring section-opener device.
  12–14px sans weight 400–500 with `letter-spacing: 0.12px`. Carries
  no decoration beyond the tracking; ink in the mute step of the ink
  ladder.
- **Brand-X-lift content to avoid when authoring previews**: do not use
  "Anthropic", "Claude", "Opus", "Sonnet", "Haiku", "Anthropic Sans /
  Serif / Mono", "Crail" as content. Do not lift the model-card grid,
  the "Free / Pro / Max / Team / Enterprise" tier names, "Project
  Glasswing", or any sparkle-glyph wordmark as the showcase brand mark.
  Do not use the warm-cream `#faf9f5` + saturated coral combo to render
  any chat-composer mockup that looks like the Claude conversation UI.
- **Sub-AA opacity on dark canvas exists**. The `text-text-300` /
  `text-text-500` opacity layers on `claude.com/*` nav-dropdown labels
  (`color: rgb(194, 192, 182)` and lower) land under 4.5:1 against
  `#141413` for body-size text. Sampled the brand ships these — when
  carrying them into the preview the contrast story needs raising one
  step or moving the consumer to a different surface.

## §Known gaps

- **Screenshots not persisted to disk.** The `mcp__claude-in-chrome`
  `save_to_disk` mode returns an image ID and renders the screenshot
  inline, but the underlying JPEGs were not found in any of the standard
  on-disk paths searched (`~/Library/...`, `~/.claude/projects/...`,
  `/tmp/...`). The `temp/brand-refs/claude-style-live-light.png` and
  `claude-style-live-dark.png` filenames described in the workflow are
  empty. Visual verification was performed inline via the same
  screenshots; this is a tooling gap, not a verification gap.
- **`console.anthropic.com` not sampled**. The Anthropic API console is
  the authenticated counterpart to `platform.claude.com/docs`; sampling
  it would expose the in-app product chrome (dashboard, model picker,
  usage charts, billing). Reaching it requires a real account session.
  Falls under "behind-a-flag".
- **`careers.anthropic.com` not sampled**. Likely cream-canvas editorial;
  similar to the `/news` surface. Time-budget cut.
- **Pricing-tier card decorative glyphs not all confirmed**. Sampled
  the anchor (Max) glyph in DOM; the seedling (Pro), sparkle (Free), and
  briefcase (Team / Enterprise) variants are inferred from the visible
  card grid but not DOM-sampled individually.
- **Hover and focus states are mostly default-only**. The
  `:focus-visible` ring colour and the precise hover lift on coral
  primary buttons were not snapshotted (would need a hover-state capture
  pass). The buttons carry `transition-colors` classes which suggests
  colour transitions, but the destination colours are not captured.
- **Mobile / phone viewport not sampled**. The 606×813 viewport sits at
  a tablet-narrow width. The brand presumably has a phone breakpoint
  with a different nav and possibly different button sizes; not in
  scope this cycle.
- **Anthropic Serif weight ramp incomplete**. Observed 300, 400, 460,
  500 — variable axes possibly exist for weights between these (450,
  550). Not exhaustively sampled.
