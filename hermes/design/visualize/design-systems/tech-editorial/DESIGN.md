---
slug: tech-editorial
name: Tech Editorial
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/tech-editorial/raw.md (verbatim layout sections + component prompts + register notes)
  - imagery: none provided this cycle — palette + typography + component shape derived from the spec's hex declarations and the spec's prose
  - principles: paper-warm editorial register × brutalist 4-column scaffolding; high-end SaaS / AI-lab pitch surface where the design conveys "researched and intentional" rather than "playful"; serif display × uppercase mono UI × sans body trio; scroll-driven word reveal and -100%→100% scan-line are the signature motion vocabulary
canonical-canvas: both
selection:
  mood: [editorial, high-contrast]
  tone: [authoritative, serious]
  formality: medium
  density: low
  canonical_canvas: both
  best_for: |
    Use for high-impact, low-copy artifacts that need a authoritative, serious register with editorial, high-contrast visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Tech Editorial

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing landing (hero + statistics grid + use-case tabs) | spec §Layout sections 1-7 | Paper-warm `#f7f6f2` under ink `#1c1c1c` body — never pure white, never pure black | The whole register hangs on the paper-warm ground; pure white reads "clinical" per the spec's explicit MUST. The 40px square grid with radial-mask transparency is part of the canvas, not decoration |
| Contact form / closing band | spec §Layout section 8 | Same paper canvas, with bottom-bordered inputs (no boxes) and forest-green submit | Form chrome is reduced to a hairline ledger — input outlines and box fills are removed; only the bottom rule survives |
| Hero band | spec §Hero (Layout section 3) | Same paper canvas, center-aligned, 9vw serif H1 in light weight uppercase | Italic key-word phrases in muted gray (`#B4B4B4`) sit on the canvas as the register's emotional moment |

Single-polarity light-canonical. The spec declares only the paper canvas; there is no documented dark-mode surface. A synthesised dark variant (canvas at `oklch(0.226 0 0)` from the spec's own foreground ink, paper-warm foreground on dark) is provided in `tokens.css` so the catalog can render both modes — see §6 Notes for the construction rule.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a citation to the spec source. OKLCH conversions performed via vendored culori (`visualize/scripts/vendor/culori.mjs`).

### Brand primary

- `--primary`: `oklch(0.5069 0.0568 182.75)` (= `#3d7068`). Spec source: §Style prose — "Primary Accent (#3d7068)" and §Animated CTA Button — "#3d7068 background, #ffffff text." The hue 182.75 falls in the teal-leaning forest-green band; muted (chroma 0.057) so the colour reads as restrained brand identity, not chromatic decoration.
- `--primary-foreground`: `oklch(1 0 0)` (= `#ffffff`). Spec source: §Animated CTA Button — "#ffffff text."

### Documented secondary brand colours

- `--brand-accent-scan-blue`: `oklch(0.6231 0.1880 259.81)` (= `#3b82f6`). Spec source: §Scan-Line Progress Bar — "a #3b82f6 line that animates from -100% to 100%." Used only inside the scan-line progress bar; not a general-purpose accent. Polarity-locked: this is the technical-indicator hue, never used as body or eyebrow text.
- `--brand-accent-italic-mute`: `oklch(0.7699 0 0)` (= `#B4B4B4`). Spec source: §Hero — "Use an italicized secondary color (#B4B4B4) for key words." Pure gray (chroma 0). Locked to italic-emphasis use in display-size serif on paper ground only; flagged as a contrast risk in §Known gaps.

### Canvas + neutrals

- `--background`: `oklch(0.9728 0.0054 95.10)` (= `#f7f6f2`). Spec source: §Style prose — "Background (#f7f6f2)." The MUST in §Special Notes locks this against any drift toward pure white.
- `--foreground`: `oklch(0.2264 0 0)` (= `#1c1c1c`). Spec source: §Style prose — "Foreground (#1c1c1c)." Near-black with no chroma; carries body and display.
- `--card`: `oklch(0.9575 0.0067 97.35)` (= `#f2f1ec`) (synthesised, paper-deep). Spec source: derived from the paper-canvas family at one step deeper than `--background`. The spec's §Use Case Tabs implies a card distinct from the canvas ("bordered card #f7f6f2") but resolves cards via hairline rather than a fill; this token holds a near-canvas value for surfaces that need slight differentiation from the ground.
- `--card-foreground`: `oklch(0.2264 0 0)` (= `#1c1c1c`). Tracks `--foreground`.
- `--popover`: `oklch(0.9848 0.0054 95.10)` (= `#fbfaf6`) (synthesised). Half-step brighter than canvas for popovers / tooltips.
- `--popover-foreground`: `oklch(0.2264 0 0)` (= `#1c1c1c`). Tracks `--foreground`.
- `--muted`: `oklch(0.9455 0.0027 106.45)` (= `#ededeb`) (synthesised). Slightly cooler-warm step from canvas for muted backgrounds.
- `--muted-foreground`: `oklch(0.5265 0.0062 106.61)` (= `#6b6b67`) (synthesised). Body-mute neutral pulled from the paper-warm family.
- `--accent`: `oklch(0.9455 0.0027 106.45)` (= `#ededeb`) (synthesised). Tracks `--muted` for hover surfaces.
- `--accent-foreground`: `oklch(0.2264 0 0)` (= `#1c1c1c`).
- `--secondary`: `oklch(0.9180 0.0081 98.89)` (= `#e5e4de`) (synthesised). Picks up the hairline value for secondary surface chips.
- `--secondary-foreground`: `oklch(0.2264 0 0)` (= `#1c1c1c`).
- `--destructive`: `oklch(0.5771 0.2152 27.33)` (= `#dc2626`) (synthesised). Spec does not declare destructive; standard slot value.
- `--destructive-foreground`: `oklch(1 0 0)` (= `#ffffff`).
- `--border`: `oklch(0.9180 0.0081 98.89)` (= `#e5e4de`). Spec source: §Style prose — "1px borders using #e5e4de" and §Special Notes MUST — "1px borders instead of shadows for section separation."
- `--input`: `oklch(0.9180 0.0081 98.89)` (= `#e5e4de`). Tracks `--border` (§Contact Form: inputs are bottom-bordered with the same hairline).
- `--ring`: `oklch(0.5069 0.0568 182.75)` (= `#3d7068`). Tracks `--primary`.

### Polarity-locked surfaces

The system is single-polarity (light-canonical) by source — no tokens are explicitly polarity-locked. The italic-mute, scan-blue, and primary stay at `:root` value across modes by the standard rule ("chromatic identity does not flip"). The synthesised dark canvas is *not* a documented brand surface; it's a catalog convenience.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9180 0.0081 98.89)` (= `#e5e4de`). Spec source: §Layout intro — "Sections are clearly demarcated by 1px horizontal borders" with the hairline value.
- `--brand-hairline-strong`: `oklch(0.8629 0.0082 98.90)` (= `#d3d2cc`) (synthesised, paper-warm deeper hairline). For interactive states where the default hairline needs lift — focus-visible outlines, hover divider emphasis. Stays in-family with the canvas-warm hue.

### Drift vs `tokens.css`

Not applicable — this is a spec-derived authoring cycle with no prior `tokens.css` to drift against.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Playfair Display | 300 (light) | 9vw uppercase hero / clamp downscale on responsive | 1.0 | -0.01em |
| Heading | Playfair Display | 400 | 1.625-2.5rem | 1.15 | -0.005em |
| Title | Playfair Display | 500 | 1.25-1.5rem | 1.25 | normal |
| Body | Space Grotesk | 400 | 1rem (16px) | 1.55 | normal |
| Caption | Space Mono | 400 | 0.625rem (10px) UPPERCASE | 1.4 | 0.2-0.3em |
| Mono / data | Space Mono | 400-500 | 0.6875-0.875rem | 1.4 | 0.1-0.25em |

Notes on the type trio:

- **Playfair Display** (serif) carries display, heading, title, and emotional-impact moments. Spec calls light-weight + uppercase + tight tracking for the hero H1; medium weights elsewhere. Italic in the muted-italic colour is the spec's hero-key-word treatment.
- **Space Grotesk** (sans) is the body workhorse. Reads cleanly at 14-18px on the paper canvas. No special weight expectations from the spec.
- **Space Mono** is uppercase-by-default for UI: button labels, statistic eyebrows, link chrome, navigation labels, statistic labels, placeholder text in form inputs. Tracking ranges 0.2em (default UI) → 0.25em (CTA button default) → 0.3em (nav links) → 0.4em (CTA button hover state, submit button). The 10px size at 0.3em tracking is the spec's smallest UI atom — sub-floor for accessibility on small screens, flagged in §Known gaps.
- Variable axis: none declared. Use Playfair Display 300/400/500/600 + Space Grotesk 400/500/600 + Space Mono 400/500 as the static-loaded set.

## §4 Component vocabulary

One entry per distinct component pattern documented in the spec. The spec carries eight layout sections + three named components — this section enumerates each plus the implied vocabulary (button states, form inputs, etc.) the spec references but doesn't independently name.

### Structural background grid

**Status:** `current`
**Spec source:** §Layout section 1 — "Create a fixed background layer with vertical lines at 25%, 50%, and 75% width using 1px #e5e4de. Overlay a 40px square grid pattern with a radial transparency mask (40% center opacity, 0% edge opacity)."
**Description:** A fixed-position decorative ground that sits behind every section. Three vertical 1px hairlines at the 25/50/75% column positions divide the canvas into four equal columns (the brutalist 4-column scaffolding). A 40px × 40px square grid overlays the whole canvas at low opacity (40% at center, fading to 0% at the viewport edges via a radial mask). The grid is decoration that hints at engineering blueprint without becoming chart paper.
**States:** Single-state (decorative). Does not animate, does not respond to interaction.

### Floating-to-fixed top navigation

**Status:** `current`
**Spec source:** §Layout section 2 — "A fixed top nav starting with 32px padding-top. On scroll, it transitions to a border-bottom fixed bar with #f7f6f2/80 backdrop-blur."
**Description:** Nav starts floating with 32px breathing room from the page top, no border, transparent background. On scroll, transitions to a fixed bar at the very top with a 1px bottom hairline and an `#f7f6f2` background at 80% opacity with `backdrop-filter: blur(...)`. Serif `__DESIGN_SYSTEM_NAME__` brand mark at 20px sits left-flanked by two short horizontal bars (24px and 32px wide — decorative ID slugs). Right side: navigation links in 10px uppercase Space Mono with 0.3em tracking.
**States:** `floating` (top of page, no border), `fixed-on-scroll` (translated to flush-top with blur + hairline), `hover` on links (opacity 1.0 → 0.7 transition over 700ms with editorial easing).

### Hero with pulse-dot badge and 9vw serif H1

**Status:** `current`
**Spec source:** §Layout section 3 — "Center-aligned hero with a pulse-dot badge. The H1 should be massive (9vw), serif, light weight, and uppercase. Use an italicized secondary color (#B4B4B4) for key words. Primary CTA button should be #3d7068 with a 'Space Mono' label that increases character tracking from 0.2em to 0.4em on hover."
**Description:** Center-aligned hero section. Above the H1: a pulse-dot badge (small filled dot in `--primary` with a pulse-ring animation, accompanied by an uppercase Space Mono label). H1 itself is set at `9vw` font-size in Playfair Display Light (300), uppercase, with select key words rendered in italic at `--brand-accent-italic-mute` (`#B4B4B4`) inline within the headline. Subhead in Space Grotesk body weight. Primary CTA below: solid `--primary` background, white text, Space Mono uppercase label at 10-12px with 0.25em tracking → 0.4em on hover. Editorial easing throughout.
**States:** `default`, `hover` (CTA tracking expands from 0.25em to 0.4em, optional white/20% overlay slides in from bottom via translate-y).

### Statistics grid — 3-column, hairline-divided

**Status:** `current`
**Spec source:** §Layout section 4 — "A 3-column grid with 1px #e5e4de dividers. Each cell has 40px padding, a 48px bordered icon box, a large serif number (4xl), and an uppercase mono label. Cells transition to a white background on hover."
**Description:** Three cells in a row separated by 1px vertical hairlines (no shadows, per the spec MUST). Each cell: 40px internal padding; a 48px square icon container outlined with a 1px hairline (no fill); a large serif number set in Playfair Display at the 4xl size class (~2.25rem) in `--foreground`; an uppercase Space Mono label at 10-12px with 0.2-0.25em tracking. On hover, the cell background shifts to `#ffffff` (pure white) — a deliberate one-step lift from the paper canvas. Note: the spec calls white-on-hover; this is the only place pure white is permitted, and it lasts only as long as the hover.
**States:** `default` (paper canvas), `hover` (white fill, 300-500ms editorial easing transition).

### Editorial Word Reveal (text-reveal section)

**Status:** `current` — flagged in spec as named component #3 and as Layout section 5.
**Spec source:** §Editorial Word Reveal component — "Split text into individual <span> elements. Set default opacity to 0.15. Using JS IntersectionObserver or scroll listener, map the scroll progress of the container to the index of the spans, setting opacity to 1.0 as they 'activate'."
**Description:** A large serif paragraph (3xl-6xl, roughly 1.875-3.75rem) where each individual word is wrapped in a `<span>` with initial `opacity: 0.15`. As the user scrolls the container into view, the words sequentially reveal — IntersectionObserver maps scroll-progress (0.0-1.0) to the word-index range, lifting each span's opacity to 1.0 as it crosses an activation threshold. The result is a "reading" rhythm where the paragraph self-types as the viewer scrolls. Use sparingly — one reveal section per page, with substantive copy that rewards the slow read.
**States:** `dormant` (0.15 opacity), `active` (1.0 opacity), `interpolating` between the two as scroll progresses. Reduced-motion preference disables the reveal entirely (all spans at opacity 1.0).

### Two-column interactive workflow with scan-line progress

**Status:** `current` — uses Scan-Line Progress Bar (named component #1).
**Spec source:** §Layout section 6 — "Two-column layout. Left side: Vertical steps (01, 02, 03) in mono. Clicking a step expands a description and reduces the opacity of inactive steps to 0.4. Right side: A sticky card with a grayscale image (60% opacity, multiply blend mode) and a 'scan-line' progress bar using #3b82f6."
**Description:** Left column: vertical step list with numeric markers (`01`, `02`, `03`) in Space Mono. Clicking expands a description panel inline; inactive steps fade to `opacity: 0.4`. Right column: sticky positioning with a grayscale image (60% opacity, `mix-blend-mode: multiply` over the paper canvas) plus a scan-line progress bar (see next entry) anchored beneath the image.
**States:** Step list — `active` (full opacity, expanded description), `inactive` (0.4 opacity, collapsed). Image — single state; the multiply blend means the image picks up the paper-warm tint.

### Scan-Line Progress Bar (named component #1)

**Status:** `current`
**Spec source:** §Scan-Line Progress Bar component — "Create a 2px height container with #e5e4de background. Inside, a #3b82f6 line that animates from -100% to 100% width/position using a 2s infinite cubic-bezier(0.8, 0, 0.2, 1) 'slide' animation."
**Description:** A 2px-tall horizontal track with `--brand-hairline-soft` background fill. Inside the track, a coloured segment (`--brand-accent-scan-blue`, `#3b82f6`) animates from `translateX(-100%)` to `translateX(100%)` over 2 seconds, infinite-looped, with custom easing `cubic-bezier(0.8, 0, 0.2, 1)` (note: this is *not* the editorial easing — the scan-line uses a sharper out-easing to feel mechanical). The segment width is approximately 30-40% of the track. Suggests AI/automation in progress without literal spinner-language.
**States:** `running` (animating). The spec does not document an `idle` or `complete` state — implementations may freeze at translateX(0) with `--primary` fill for completion.

### Animated CTA Button (named component #2)

**Status:** `current`
**Spec source:** §Animated CTA Button component — "Button with #3d7068 background, #ffffff text, 'Space Mono' font, 10px size, 0.25em tracking. On hover: tracking increases to 0.4em and a white/20% overlay slides up from the bottom (translate-y-full to 0)."
**Description:** Solid `--primary` background, white text, Space Mono uppercase label at 10px with 0.25em tracking. On hover: letter-spacing transitions to 0.4em (over 700-1000ms with editorial easing), and a `rgba(255,255,255,0.2)` overlay element slides from `translateY(100%)` to `translateY(0)` underneath the label — creating a subtle "panel fills in from below" effect without disturbing the button shape. No rounded corners beyond 2px (per spec MUST NOT). Min-height bumped to 44px for WCAG touch-target compliance in implementation; the spec's 10px is label-only.
**States:** `default` (0.25em tracking, no overlay), `hover` (0.4em tracking, overlay translated to 0), `focus-visible` (1px outline in `--ring` at 2px offset).

### Use case tabs with ghost-icon card

**Status:** `current`
**Spec source:** §Layout section 7 — "A centered tab switcher with pill-shaped buttons. Content below is a large bordered card (#f7f6f2) featuring a massive 240px ghost icon (5% opacity) in the background and a 3-column benefit grid at the bottom."
**Description:** Centered tab strip; tabs styled as pill-shaped buttons (max 2px corner radius per spec MUST NOT — so "pill-shape" reads as a flat lozenge here, not a true semicircle). Selected tab uses `--foreground` fill with `--background` text; unselected tabs use canvas background with hairline border and `--foreground` text. Below the strip: a large card on the paper canvas with 1px hairline border. A 240px-wide ghost icon (decorative SVG at `opacity: 0.05`) anchors the card's background corner. Card content: a heading + a 3-column benefit grid at the card's bottom edge.
**States:** Tab — `selected` (inverted ink fill), `unselected` (hairline only), `hover` (background lifts to `--muted` fill, 300-500ms editorial easing).

### Contact form (bottom-bordered inputs)

**Status:** `current`
**Spec source:** §Layout section 8 — "Two-column grid. Left side: Large serif heading 'Request Access'. Right side: Form with inputs that are only bottom-bordered (#e5e4de). Placeholder text in 10px mono. Submit button is full-width with 0.4em letter-spacing and a #3d7068 shadow-drop."
**Description:** Two-column layout with left-side serif heading and right-side form. Form inputs are stripped of all chrome except a 1px bottom border (no top, no side rails, no fill). Labels rendered in 10px uppercase Space Mono with 0.3em tracking. Placeholder text in Space Mono at 10px (note: 10px placeholder is below the readability floor for many users — flagged in §Known gaps). Submit button is full-width, primary background, Space Mono label at 0.4em tracking. The "shadow-drop" the spec mentions is a soft `--primary` colored shadow (~4px y-offset, 0 blur) that sits under the button — this is the spec's only explicit shadow allowance; everywhere else the MUST forbids shadows.
**States:** Input — `default` (1px bottom hairline), `focus` (bottom hairline lifts to `--primary`), `error` (bottom hairline shifts to `--destructive`).

### Pulse dot badge

**Status:** `current` — implied by §Hero "Center-aligned hero with a pulse-dot badge."
**Spec source:** §Hero (Layout section 3).
**Description:** Small circular badge above the H1 in the hero. A 6-8px solid dot in `--primary` colour with a 12-16px concentric ring at 20-30% opacity that pulses (scale 1.0 → 1.5 → 1.0 over ~2s, infinite, editorial easing). Accompanied to the right by an uppercase Space Mono label at 10-12px with 0.2em tracking, communicating system status ("ACCEPTING APPLICATIONS", "PUBLIC BETA", "Q3 2026").
**States:** `pulsing` (running animation), `reduced-motion` (ring at static 30% opacity, no scale animation).

### Section divider (horizontal hairline)

**Status:** `current`
**Spec source:** §Layout intro — "Sections are clearly demarcated by 1px horizontal borders" + §Special Notes MUST — "Use 1px borders instead of shadows for section separation."
**Description:** A single 1px horizontal hairline at `--brand-hairline-soft` value, full container width, with no padding/margin tricks. Section content above and below sits directly adjacent. This is the system's primary separation primitive — the catalog never uses elevation shadows, only hairline rules.
**States:** Single-state (decorative).

### Mono caption / metadata label

**Status:** `current`
**Spec source:** §Special Notes MUST — "Ensure 'Space Mono' is used for all metadata and numeric data."
**Description:** Space Mono uppercase, 10-12px, tracking 0.2-0.3em, in `--muted-foreground`. Used for every label that isn't a headline or body paragraph: stat labels, eyebrow text, table headers, version markers, timestamp data, anywhere numerical or technical information needs to be marked as "data" rather than "content."
**States:** Single-state.

### Italic key-word emphasis

**Status:** `current`
**Spec source:** §Hero (Layout section 3) — "Use an italicized secondary color (#B4B4B4) for key words."
**Description:** Inline italic style within display-size serif headlines. Selected words (typically 1-3 per H1) shift to italic style in `--brand-accent-italic-mute` (`#B4B4B4`). The mute-italic creates a poetic pull-back within the otherwise authoritative H1. Reads only at display size; sub-AA on smaller text, flagged in §Known gaps.
**States:** Single-state.

### Glassmorphic surface overlay

**Status:** `current`
**Spec source:** §Description and §Layout section 2 — "glassmorphism navigation" / "backdrop-blur."
**Description:** The nav-on-scroll state uses `background: rgba(247,246,242,0.8)` plus `backdrop-filter: blur(12-20px)`. Only documented use is the scrolled nav. The technique is part of the register but not over-applied — the brutalist baseline is opaque hairline-divided sections.
**States:** Single-state.

## §5 Surface inventory

Reference materials sampled this cycle:

- `temp/refs/tech-editorial/raw.md` — anchors every component, palette value, easing curve, animation duration, layout section, and special-note MUST/MUST NOT documented in `tokens.css` and `preview-template.html`. Spec section §Source records this as authored by Zhou Jason on the upstream Superdesign library, slug `tech-editorial`. Verbatim text quoted in this DESIGN.md is bounded to (1) the hex declarations in §2, (2) the cubic-bezier value `cubic-bezier(0.16, 1, 0.3, 1)`, (3) animation duration ranges, and (4) the MUST/MUST NOT list — all factual.

## §6 Notes

Brand-specific patterns worth flagging for future authors:

- **Spec MUST locks** — the paper canvas `#f7f6f2`, the hairline-not-shadow separation rule, the Space Mono lockup for metadata, the 2px maximum corner radius, and the no-gradients rule are explicit MUSTs / MUST NOTs from the spec. Treat these as non-negotiable; any future drift must cite the spec being revised, not "we softened it."
- **Single-polarity light-canonical** — the source spec describes only the paper-warm light surface. The synthesised dark variant in `tokens.css` flips canvas (`#1c1c1c`) and foreground (paper-warm at `oklch(0.97 0.005 95)`) but keeps the forest-green primary, scan-blue, italic-mute, and `cubic-bezier(0.16, 1, 0.3, 1)` editorial easing at `:root` value — chromatic identity does not flip with theme by the catalog's standard rule. The dark variant is a catalog convenience; the spec does not document it.
- **Two distinct easings, not one** — the editorial easing `cubic-bezier(0.16, 1, 0.3, 1)` at 700-1000ms governs hover states, fades, expansions, and most micro-interactions. The scan-line progress bar uses a sharper `cubic-bezier(0.8, 0, 0.2, 1)` at 2s, deliberately mechanical to read as "process running." Don't unify them — the contrast is part of the register.
- **The pure-white-on-hover exception** — the statistics grid's hover state lifts the cell from paper canvas to `#ffffff`. This is the only place pure white is permitted; everywhere else the canvas MUST hold. The exception works because it's transient and bounded; do not extend it to default surfaces.
- **No customer-logo strip** — the register is built for AI labs / premium fintech / high-end SaaS pitch surfaces. Customer logos would clash with the "researched and intentional" tone. If a preview author thinks they need one, the answer is a Halcyon-themed quote band or a numbered case study with hairline dividers instead.
- **Halcyon as placeholder** — the topnav brand mark, footer wordmark, and contact form should use the catalog convention (`__DESIGN_SYSTEM_NAME__` interpolation, `halcyon.dev` URL, generic team metadata). The spec's original "SUPERDESIGN" wordmark in §Layout section 2 is upstream attribution and should not propagate to authored content.

## §Known gaps

Accessibility and responsive risks the spec carries by design (per the register notes in `raw.md` §Notes), flagged here so future preview authors know to address them in implementation rather than treat as authoring oversights:

- **9vw serif H1 with light weight on narrow viewports** — at viewport width 320-400px, `9vw` resolves to ~29-36px. Playfair Display Light (weight 300) at small sizes collapses into the surrounding body type and loses display authority. Implementation needs a `clamp(2.5rem, 9vw, 8rem)` fallback or a separate mobile size at a heavier weight (400-500) — the spec doesn't enumerate this, but the preview template should.
- **`#B4B4B4` italic key words on `#f7f6f2` canvas** — measured contrast ratio: ~2.4:1, well below WCAG AA 4.5:1 body floor. The spec accepts this consciously (display-size text >24pt has a lower AA threshold of 3:1, and the italic-mute is reserved for display-size hero key words). Preview implementations should not extend italic-mute usage to any text below display size; the token name `--brand-accent-italic-mute` encodes this constraint.
- **10px Space Mono labels at 0.3em tracking** — sub-floor for the WCAG-recommended 12px minimum for body text. The spec uses 10px for caption-tier metadata where the user is not expected to read full sentences; tracking at 0.3em-0.4em makes Latin glyphs legible at this size but breaks down for non-Latin scripts (Cyrillic, Greek, CJK at 10px is genuinely unreadable). Preview authors should size labels at 12px minimum and let the spec's 10px figure stand as a documented register-specific exception rather than a hard floor.
- **"MUST NOT exceed 2px corner radius / MUST NOT use gradients"** — these locks make the system brittle if a future brand layered on top needs either. Implementation note: the system has only one hard radius (`--radius-sm: 2px`); larger radii on the catalog's standard scale (`--radius-md`, `-lg`, `-xl`) are still declared in `tokens.css` for downstream shadcn-component compatibility, but the brand register expects 0-2px in production use.
- **No documented dark-mode spec** — the catalog's synthesised dark variant in `tokens.css` is a best-guess construction. If a downstream brand adopts this register and ships a real dark theme, the dark canvas, hairline colour, muted-foreground ladder, and any dark-mode-only surface tokens should be re-derived from the brand's actual dark surfaces and override the synthesised values here.
