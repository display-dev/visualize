---
slug: elevenlabs-style
name: ElevenLabs Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://elevenlabs.io/
  - https://elevenlabs.io/pricing
  - https://elevenlabs.io/blog
  - https://elevenlabs.io/docs/overview/intro
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

# ElevenLabs Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing homepage | https://elevenlabs.io/ | Warm light editorial with dark product/code islands | The live page opens on light/off-white editorial surfaces, then moves through product modules for ElevenCreative, ElevenAgents, and ElevenAPI. |
| Pricing | https://elevenlabs.io/pricing | Light commerce | Pricing preserves cream/off-white plan cards, black CTAs, blue API accents, and warm gray dividers. |
| Blog | https://elevenlabs.io/blog | Light editorial | Blog surfaces use the same Waldenburg/Inter mix, light cards, and article-image grids. |
| Docs | https://elevenlabs.io/docs/overview/intro | Separate docs shell | Docs are built on a Fern-like technical shell with search, sidebar navigation, tabbed product families, light/dark toggle, and code/API reference surfaces. |
| API examples | https://elevenlabs.io/ | Dark code/product islands inside light page | Code snippets use a dark editor floor, red keywords, blue identifiers, deep-blue strings, and Geist Mono / code font behavior. |

ElevenLabs is `both`: the dominant public canvas is light editorial, but the brand now has real technical dark surfaces for API/code examples and a docs shell with explicit theme controls. Do not describe it as a dark developer brand, and do not flatten it into a purely pastel editorial site.

## §2 Palette

Values were sampled from first-party ElevenLabs marketing, pricing, blog, and docs HTML on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.2685 0.0063 34.2975)` (= `#292524`). Live: black/warm-ink primary pills, plan CTAs, and high-contrast action buttons.
- `--brand-primary-active`: `oklch(0.1469 0.0041 49.2499)` (= `#0c0a09`). Live: deeper ink press/strong emphasis.
- `--brand-api-blue`: `oklch(0.6187 0.2067 259.2316)` (= `#2B7FFF`). Live: docs/API rings, links, and developer UI accents.
- `--brand-api-blue-strong`: `oklch(0.5005 0.1994 260.3104)` (= `#0A59D2`). Live: code identifiers and stronger API accents.
- `--brand-syntax-red`: `oklch(0.6160 0.2403 25.0235)` (= `#F41A2F`). Live: code keywords in homepage API examples.

### Canvas + neutrals

- `--background`: `oklch(0.9651 0.0034 67.7826)` (= `#F5F3F1`). Live: marketing/pricing page floor.
- `--card`: `oklch(0.9918 0.0011 17.1759)` (= `#FDFCFC`). Live: elevated cards and product panels.
- `--muted`: `oklch(0.9408 0.0046 78.2974)` (= `#EDEBE8`). Live: muted bands and card interiors.
- `--brand-canvas-soft`: `oklch(0.9826 0.0017 67.8022)` (= `#FAF9F8`). Live: subtle alternate sections.
- `--brand-warm-panel`: `oklch(0.9322 0.0063 75.4048)` (= `#EBE8E4`). Live: soft panel backgrounds.
- `--brand-hairline-strong`: `oklch(0.8661 0.0099 72.6500)` (= `#D7D2CC`). Live: visible card/ring dividers.
- `--brand-muted-soft`: `oklch(0.7052 0.0134 75.3259)` (= `#A59F97`). Live: secondary metadata on light surfaces.
- `--muted-foreground`: `oklch(0.5516 0.0143 75.2758)` (= `#777169`). Live: accessible secondary text.
- `--foreground`: `oklch(0.1469 0.0041 49.2499)` (= `#0c0a09`). Live: warm near-black editorial ink.

### Dark and code surfaces

- `--brand-canvas-deep`: `oklch(0.1469 0.0041 49.2499)` (= `#0c0a09`). Live: deep warm product/callout floors.
- `--brand-surface-dark-elevated`: `oklch(0.2161 0.0061 56.0433)` (= `#1c1917`). Live: elevated cards on dark surfaces.
- `--brand-code-canvas`: `oklch(0.1652 0.0159 248.6884)` (= `#090F15`). Live: homepage API code islands.
- `--brand-code-string`: `oklch(0.3236 0.1212 259.7500)` (= `#052F70`). Live: deep-blue strings in code examples.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#ffffff`). Live: text on dark code/product surfaces.
- `--brand-on-dark-soft`: `oklch(0.7161 0.0091 56.2589)`. Live: muted text on dark panels.

### Atmospheric colour

- `--brand-cream-highlight`: `oklch(0.8988 0.0298 80.6514)` (= `#e8dcc8`). Live: warm highlight and image wash.
- `--brand-syntax-red-deep`: `oklch(0.5067 0.1709 30.0690)` (= `#b22e20`). Live: deeper red/code/error emphasis.
- Pastel orb tokens remain useful as optional atmosphere, but the current live site's stronger repeated chroma is API blue plus syntax red, not only mint/peach/lavender gradients.

### Drift vs `tokens.css`

- The imported frontmatter says `canonical-canvas: dark`; live sampling requires `both`, with light editorial as the dominant public canvas and dark code/product islands as real secondary surfaces.
- `tokens.css` already hand-edits the dark block around `--brand-canvas-deep` / `--brand-surface-dark-elevated`; keep that. Add code/API aliases in a future cascade only if preview consumers need to render homepage API islands directly: `--brand-api-blue`, `--brand-api-blue-strong`, `--brand-syntax-red`, `--brand-code-canvas`, and `--brand-code-string`.
- `--brand-muted-soft` was already darkened for AA in the token file. That remains correct because live `#A59F97` is mostly metadata/large UI, while body-secondary text should use the darker `#777169` stop.
- The preview should not be rebuilt just to rename tokens; current structural tokens are close enough for a Step 1 refresh.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Waldenburg / Waldenburg-ML fallback | 300 | 56-72px | 1.02-1.08 | -0.03em |
| Heading | Waldenburg / Waldenburg-FH fallback | 300 | 36-56px | 1.06-1.14 | -0.02em |
| Title | Inter | 500 | 18-24px | 1.25-1.4 | 0 |
| Body | Inter | 400 | 15-17px | 1.45-1.6 | 0 |
| Caption | Inter | 400-500 | 12-14px | 1.35-1.5 | 0 |
| Mono | Geist Mono / ui-monospace fallback | 400-500 | 12-14px | 1.45-1.65 | 0 |

The editorial signature is still Waldenburg at light weight. The technical signature is different: code examples use a compact mono stack and syntax colour, while docs use a more conventional product-documentation body rhythm.

## §4 Component vocabulary

### editorial-global-nav

**Status:** current
**Live source:** `https://elevenlabs.io/` — global nav
**Description:** Top navigation with product-family links, Resources menu, Enterprise/Pricing, and login/signup actions. Light canvas, low divider pressure, and compact Inter labels.
**States:** default, hover, active product family, mobile menu, authenticated login path.

### black-primary-pill

**Status:** current
**Live source:** `https://elevenlabs.io/` and `https://elevenlabs.io/pricing`
**Description:** Warm near-black pill button with white text. It is the primary CTA even when blue appears elsewhere.
**States:** default, hover deeper ink, focus ring, disabled.

### outline-sales-button

**Status:** current
**Live source:** `https://elevenlabs.io/` — Contact sales / Talk to sales
**Description:** Transparent or white-outline secondary button with restrained copy and no saturated fill.
**States:** default, hover surface tint, focus ring.

### product-family-card

**Status:** current
**Live source:** `https://elevenlabs.io/` — ElevenCreative / ElevenAgents / ElevenAPI cards
**Description:** Large image-led cards that split the platform into creative, agent, and API product families.
**States:** default, hover image lift, active family, stacked mobile.

### voice-category-carousel

**Status:** current
**Live source:** `https://elevenlabs.io/` — Narration / Advertisement / Characters / Conversational / Social Media
**Description:** Horizontal category picker with voice-use cases, short descriptions, and media thumbnails.
**States:** selected category, hover, auto-scroll, keyboard focus.

### logo-trust-strip

**Status:** current
**Live source:** `https://elevenlabs.io/` — trusted by section
**Description:** Dense enterprise/customer logo strip that keeps logos neutral and lets the surrounding editorial page carry the brand.
**States:** static row, wrap, grayscale/invert variants.

### creative-editor-module

**Status:** current
**Live source:** `https://elevenlabs.io/` — ElevenCreative section
**Description:** Product module for speech, video, music, and sound effects with editor screenshots and narrative sample text.
**States:** selected capability, preview playing, language/voice selected, media thumbnail active.

### voice-sample-player

**Status:** current
**Live source:** `https://elevenlabs.io/` — AI Voice Generator examples
**Description:** Player row for voice name, language, play control, and transcript sample. Use understated controls and text-first structure.
**States:** idle, playing, loading, selected language, disabled.

### language-selector-list

**Status:** current
**Live source:** `https://elevenlabs.io/` — language list inside voice demo
**Description:** Dense language picker with many options. It should read as a product control, not a decorative tag cloud.
**States:** selected language, hover, search/filtered, overflow.

### agent-conversation-card

**Status:** current
**Live source:** `https://elevenlabs.io/` — ElevenAgents examples
**Description:** Conversation transcript card showing human request, agent reply, order number, and outcome state.
**States:** incoming message, agent message, completed action, error/escalation.

### analytics-metric-panel

**Status:** current
**Live source:** `https://elevenlabs.io/` — Resolution Rate chart
**Description:** Simple analytics module for agent performance. Use warm surfaces, sparse labels, and line/bar charting.
**States:** default, comparison variant, hover point, empty/loading.

### guardrails-card

**Status:** current
**Live source:** `https://elevenlabs.io/` — Testing / Guardrails / Workflows
**Description:** Safety/workflow card with clear capability title and short explanation. Avoid heavy compliance decoration.
**States:** default, selected, linked, disabled.

### api-code-island

**Status:** current
**Live source:** `https://elevenlabs.io/` — ElevenAPI examples
**Description:** Dark code block embedded into a light editorial page. Use `#090F15` canvas, red keywords, blue identifiers, deep-blue strings, and mono text.
**States:** TypeScript tab, Python tab, copied, focused line.

### api-model-list

**Status:** current
**Live source:** `https://elevenlabs.io/` — Text to Speech API models
**Description:** Compact list of model names and capability claims such as latency, consistency, and expressiveness.
**States:** default, selected model, compare mode.

### docs-header-search

**Status:** current
**Live source:** `https://elevenlabs.io/docs/overview/intro`
**Description:** Docs header with search button, slash keyboard hint, Connect menu, Blog/Help/API Pricing links, signup, and theme toggle.
**States:** loading search, focused search, command palette open, dark/light theme.

### docs-product-tabs

**Status:** current
**Live source:** `https://elevenlabs.io/docs/overview/intro`
**Description:** Horizontal product tabs for Overview, ElevenCreative, ElevenAgents, ElevenAPI, API reference, and Changelog.
**States:** active tab, inactive tab, overflow, mobile stack.

### docs-sidebar-tree

**Status:** current
**Live source:** `https://elevenlabs.io/docs/overview/intro`
**Description:** Technical sidebar with Capabilities and Administration groups. Use compact rows and clear active-page state.
**States:** active page, expanded group, collapsed group, mobile drawer.

### docs-api-reference-link

**Status:** current
**Live source:** `https://elevenlabs.io/docs/overview/intro`
**Description:** Link/button treatment for API reference and quickstart paths. It belongs to docs chrome, so blue can be stronger here than on marketing CTAs.
**States:** default, hover, active, external.

### pricing-plan-card

**Status:** current
**Live source:** `https://elevenlabs.io/pricing`
**Description:** Warm light plan card with price, usage quota, CTA, and feature list. Strong borders and spacing do the organization.
**States:** default, featured, selected billing interval, enterprise/contact variant.

### pricing-toggle

**Status:** current
**Live source:** `https://elevenlabs.io/pricing`
**Description:** Billing-period or plan-family toggle using pill geometry and subdued active state.
**States:** monthly, annual, hover, disabled.

### api-pricing-accent

**Status:** current
**Live source:** `https://elevenlabs.io/pricing` and docs API Pricing
**Description:** Blue-accented affordance for developer/API pricing links. Keep it secondary to black primary CTAs on marketing pages.
**States:** default, hover blue, active, focused.

### blog-card-grid

**Status:** current
**Live source:** `https://elevenlabs.io/blog`
**Description:** Editorial grid of product/company/research posts with image, category, date, and title.
**States:** default, hover image, category filtered, featured post.

### update-link-list

**Status:** current
**Live source:** `https://elevenlabs.io/` — Latest updates
**Description:** Compact list of recent posts with category/date metadata and image or gradient thumbnail.
**States:** default, hover, all-posts link, mobile stacked.

### research-timeline

**Status:** current
**Live source:** `https://elevenlabs.io/` — research model chronology
**Description:** Timeline of foundational models and dates, from Multilingual through Scribe/Music/Agents. Keep it restrained and legible.
**States:** default, highlighted milestone, linked model, compact.

### safety-card-set

**Status:** current
**Live source:** `https://elevenlabs.io/` — Safety, built in
**Description:** Three-card set for Moderation, Accountability, and Provenance with image support and short statements.
**States:** default, hover, linked detail, dark-band variant.

### footer-mega-nav

**Status:** current
**Live source:** `https://elevenlabs.io/` — footer
**Description:** Large footer organized by ElevenCreative, ElevenAgents, ElevenAPI, Resources, Socials, and Company.
**States:** default, localized language selector, social links, legal links.

### theme-toggle-icon-button

**Status:** current
**Live source:** `https://elevenlabs.io/docs/overview/intro`
**Description:** Square icon button in docs chrome for light/dark/system theme. It should use a real icon and compact hit target.
**States:** light, dark, system, menu open.

### code-copy-button

**Status:** current
**Live source:** `https://elevenlabs.io/` and docs/API examples
**Description:** Small utility action attached to code samples. Keep it quiet until hover/focus.
**States:** idle, hover, copied, disabled.

### media-proof-card

**Status:** current
**Live source:** `https://elevenlabs.io/` — impact/customer examples
**Description:** Image-led customer story card with company name, outcome copy, and subtle link affordance.
**States:** default, hover, featured, external link.

### voice-agent-outcome-chip

**Status:** current
**Live source:** `https://elevenlabs.io/` — refund completed example
**Description:** Small success/status chip inside agent conversation UI. Use green only for actual completion states.
**States:** pending, completed, failed, escalated.

## §5 Composition rules

- Lead with human/product outcome copy, then reveal the technical surface. ElevenLabs' current page moves from platform promise to creative/agent/API details.
- Use black/warm-ink pills for primary marketing actions. Reserve blue for docs/API utilities and code-adjacent affordances.
- Treat Waldenburg as display, not body. Body, nav, controls, and dense documentation should stay Inter or the docs shell's own sans stack.
- Product screenshots and voice/player modules carry the brand more than decorative gradient orbs. Do not over-index on pastel atmosphere.
- Dark surfaces should be product/code islands or explicit docs dark mode, not the default marketing canvas.
- Keep code syntax literal: red keywords, blue identifiers, deep-blue strings, dark code floor, compact mono line rhythm.

## §6 Accessibility notes

- Black pills with white text clear AA on light surfaces; white pills on the documented dark block also clear.
- Live `#A59F97` is too light for normal body text on white/cream. Use `#777169` or darker for body-secondary copy, and reserve `#A59F97` for metadata, icons, hairlines, or larger UI.
- Blue-on-white is high contrast when using `#0A59D2`; `#2B7FFF` should be used for focus/ring/fill accents or larger text, not long body copy.
- Syntax red is acceptable as code colour but should not become the only error indicator; pair it with text or iconography.
