---
name: Blueprint
description: Technical-drawing register — navy paper + warm gold, dark-canonical. Visible-chroma borders, annotation-feel leading, sans display.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values here are the drafting-paper interpretation; the canonical
# navy-paper register lives in the sidecar `tokens.css` `[data-theme="dark"]` block.
canonical-canvas: light
selection:
  mood: [editorial, high-contrast, organic, industrial]
  tone: [precise, pragmatic, calm, warm]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a precise, pragmatic, calm, warm register with editorial, high-contrast, organic, industrial visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

colors:
  background: "oklch(0.97 0.005 240)"
  foreground: "oklch(0.22 0.045 250)"
  card: "oklch(0.985 0.005 240)"
  card-foreground: "oklch(0.22 0.045 250)"
  popover: "oklch(0.985 0.005 240)"
  popover-foreground: "oklch(0.22 0.045 250)"
  primary: "oklch(0.55 0.13 75)"
  primary-foreground: "oklch(0.97 0.005 240)"
  secondary: "oklch(0.94 0.008 240)"
  secondary-foreground: "oklch(0.22 0.045 250)"
  muted: "oklch(0.94 0.008 240)"
  muted-foreground: "oklch(0.45 0.025 245)"
  accent: "oklch(0.92 0.012 240)"
  accent-foreground: "oklch(0.22 0.045 250)"
  destructive: "oklch(0.55 0.22 25)"
  destructive-foreground: "oklch(0.97 0.005 240)"
  border: "oklch(0.85 0.015 240)"
  input: "oklch(0.85 0.015 240)"
  ring: "oklch(0.55 0.13 75)"
  chart-1: "oklch(0.55 0.13 75)"
  chart-2: "oklch(0.50 0.12 230)"
  chart-3: "oklch(0.48 0.10 200)"
  chart-4: "oklch(0.45 0.08 165)"
  chart-5: "oklch(0.40 0.06 250)"
  sidebar: "oklch(0.95 0.008 240)"
  sidebar-foreground: "oklch(0.22 0.045 250)"
  sidebar-primary: "oklch(0.55 0.13 75)"
  sidebar-primary-foreground: "oklch(0.97 0.005 240)"
  sidebar-accent: "oklch(0.92 0.012 240)"
  sidebar-accent-foreground: "oklch(0.22 0.045 250)"
  sidebar-border: "oklch(0.85 0.015 240)"
  sidebar-ring: "oklch(0.55 0.13 75)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(1.875rem, 4.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "0.005em"
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.005em"
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.005em"
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "calc(0.25rem - 2px)"
  md: "0.25rem"
  lg: "calc(0.25rem + 2px)"
  xl: "calc(0.25rem + 4px)"

spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 0.75rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"
---

# Design System: Blueprint

## 1. Overview: The Drafting Page

**Creative North Star: "The Drafting Page"**

Blueprint is visualize's technical-drawing register — the aesthetic reference is a navy-paper drafting page with warm-gold ink, the oldest engineering-documentation convention that exists. **Dark is canonical**; the light interpretation reads as a blueprint printed onto white drafting paper for a review session. Borders carry visible cool-blue chroma (not neutral gray) so schematic diagrams read as *drawings on paper* rather than *rectangles on white*. The navy-paper / warm-gold pairing is pre-trained reader vocabulary: the moment the artifact resolves, the reader knows what register they're in.

This is the system for **structural-explanation and document-register reader-jobs**: Architecture overviews, Diagrams, ADRs, Plan reviews, Roadmap timelines, Org charts, Threat models. The annotation-feel leading (1.15 tight, 1.55 normal) plus slightly looser tracking (0.005em) gives prose a drawing-board-label rhythm rather than a long-form-publishing column.

Blueprint explicitly rejects: warm-cream surfaces (Editorial / Paper-ink territory), soft borderless cards (the visible grid is the identity), and marketing-register affordances. Pitch deck on Blueprint is the canonical mismatch — engineering tone undermines the persuasive job.

**Key Characteristics:**
- Dark-canonical navy-paper register; light is the drafting-paper companion (the `:root` here).
- Visible cool-blue chroma on surfaces (hue 240–250, chroma up to 0.08 in dark).
- Warm-gold `--primary` (hue 75–80) — distinct from Deck's warm amber (hue 60–65). Gold sits cooler and reads engineering, not marketing.
- Borders share the surface hue family (cool-blue) — grid-line feel from coloured borders, not neutral gray.
- Annotation-feel typography: leading 1.15 / 1.55, tracking 0.005em looser than Clean. Reads as drawing-board labels, not magazine column.
- Minimal radius (0.25rem) — drawings have sharp corners.

## 2. Colors: The Navy-and-Gold Palette

A two-chord palette: cool-blue navy surfaces (canonical in dark, drafting-paper-cool in light) paired with warm-gold accent + a five-stop chart palette that leads gold + reaches across the cool-blue technical range.

### Primary
- **Warm Gold** (`oklch(0.55 0.13 75)` light, brighter on dark): The engineering accent. Diagram-node fills, callout left-rules, the navy-gold pairing convention readers pre-train on. Distinct from Deck's warm amber by hue (75-80 vs 60-65) and register — gold reads engineering documentation, amber reads marketing pitch.

### Neutral
- **Cool Off-White Background** (`oklch(0.97 0.005 240)`): Drafting-paper surface in light. Strip to pure white and the register is gone.
- **Deep Navy Ink Foreground** (`oklch(0.22 0.045 250)`): Primary text. Reads as ink-on-paper.
- **Cool Muted** (`oklch(0.94 0.008 240)`): Secondary surfaces.
- **Mid-Cool Muted Foreground** (`oklch(0.45 0.025 245)`): Captions, annotation prose.
- **Visible-Chroma Border** (`oklch(0.85 0.015 240)`): Border tokens share the surface hue family. Cool-blue, not neutral gray.

### State
- **Blueprint Red** (`oklch(0.55 0.22 25)`): Destructive actions. Restrained warm coal-red — Blueprint's reader-job calls for clinical contrast, not alarm-shop saturation.

### Chart Palette (technical-cool range)
- **`--chart-1` Gold** (`oklch(0.55 0.13 75)`, matches `--primary`), **`--chart-2` Blue** (`oklch(0.50 0.12 230)`), **`--chart-3` Teal** (`oklch(0.48 0.10 200)`), **`--chart-4` Sage** (`oklch(0.45 0.08 165)`), **`--chart-5` Slate** (`oklch(0.40 0.06 250)`): Technical-cool five-stop. Gold leads; cool-blue range fills out. Doesn't compete with surface chroma — the gold-on-navy moments stay distinct.

### Named Rules

**The Visible-Chroma-Border Rule.** Borders share the surface hue family (cool-blue, not neutral gray). The grid-line feel comes from chroma-carrying borders; stripping them to neutral gray reads as "navy Clean" rather than blueprint.

**The Gold-Not-Amber Rule.** Blueprint's `--primary` is gold (hue 75-80). Reaching for amber (hue 60-65) pulls the artifact toward Deck's marketing register; reaching for green (145) pulls toward Terminal. Gold-on-navy is the engineering convention.

## 3. Typography: Annotation Voice

**Display Font:** sans stack (Inter / IBM Plex Sans / system sans)
**Body Font:** same sans
**Mono Font:** mono stack (IBM Plex Mono / JetBrains Mono / SFMono / ui-monospace)

**Character:** Sans display. The annotation-feel comes from leading (1.15 tight, 1.55 normal) and slightly looser tracking (0.005em) — not from a serif or mono face swap. Body reads as drafting-board labels rather than long-form-publishing copy; the rhythm invites scanning more than slow reading.

### Hierarchy

- **Display** (sans, weight 600, `clamp(1.875rem, 4.5vw, 2.75rem)`, leading 1.15, tracking 0.005em): Hero diagram captions, top-of-document headlines. Smaller than Editorial's display floor — Blueprint isn't a magazine.
- **Heading** (sans, weight 600, 1.5rem, leading 1.2, tracking 0.005em): Section headings.
- **Title** (sans, weight 500, 1.0625rem, leading 1.3): Sub-section heads.
- **Body** (sans, weight 400, 16px, leading 1.55, tracking 0.005em): Annotation prose.
- **Label** (sans, weight 500, 0.875rem, tracking 0.02em): Diagram labels. Slightly more letter-spaced than body.
- **Mono** (mono, weight 400, 0.875rem): Inline code, technical references.

### Named Rules

**The Tight-Leading Rule.** Body leading at 1.55, display at 1.15. Tighter than Editorial because Blueprint's prose is annotation-rhythm, not long-form-reading rhythm.

**The Looser-Tracking Rule.** Body + display add `letter-spacing: 0.005em`. The slight openness reads as drawing-board lettering rather than typeset prose.

## 4. Elevation

Flat or subtle. Blueprint uses cool-tinted shadows (hue 220, low alpha) when explicit elevation is needed, but drafting-pages don't have shadow vocabularies. The structural seams come from visible-chroma borders, not from shadows.

### Shadow Vocabulary

- **`--shadow-sm`** (cool-tinted, low alpha): Hairline lift for interactive card hover.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for floating UI (dropdowns, modals).

### Named Rules

**The Border-Not-Shadow Rule.** Blueprint uses visible-chroma borders for surface delineation. Shadows respond only to state (hover, deliberate elevation), never to structural separation.

## 5. Components

### Buttons

- **Shape:** `--radius-md` (0.25rem). Sharper than Clean's 10px and Editorial's 6px — drawings have sharp corners.
- **Primary:** Warm-gold background, near-white text, weight 500 label, padding 0.5rem 1rem.
- **Hover:** Shifts to deep-navy ink background.
- **Secondary:** Cool-muted background, deep-navy text.
- **Focus:** `--ring` (gold) outline.

### Cards & Containers

- **Corner Style:** `--radius-md` (0.25rem). Sharper than Editorial.
- **Background:** `--card` (slightly deeper than `--background`).
- **Border:** Hairline 1px in `--border` — visible cool-blue chroma. Card separation comes from borders.
- **Internal Padding:** 1.5rem default.

### Inputs / Fields

- **Style:** `--radius-sm` (0.125rem), hairline `--border`, transparent or `--background`.
- **Focus:** Gold `--ring` border + low-alpha cool-blue outline glow.

### Navigation

- **Style:** Sans label, weight 500, slightly tracked.
- **States:** Default `--foreground` (deep navy); hover shifts to warm-gold `--primary`.

### Chart Palette + Diagram Primitives

Gold-leading technical-cool five-stop. Diagram node fills + callout left-rules pull `--primary` (gold); border treatments + connectors use the cool-blue `--border` and chart-2..5 range. The navy-paper / warm-gold pairing is the reader's pre-trained vocabulary — lean on it.

## 6. Do's and Don'ts

### Do:

- **Do** carry visible cool-blue chroma on surfaces. Hue 240-250, chroma 0.005-0.08 — the cast is the identity, not chrome accent.
- **Do** use the warm-gold `--primary` (hue 75-80) on diagram nodes, callout rules, and the navy-gold accent moment — see The Gold-Not-Amber Rule.
- **Do** carry visible chroma on borders. The grid-line feel comes from coloured borders sharing the surface hue family — see The Visible-Chroma-Border Rule.
- **Do** keep leading tight (1.15 / 1.55) and tracking slightly looser (0.005em). Annotation-rhythm, not publishing-rhythm — see The Tight-Leading + Looser-Tracking Rules.
- **Do** design dark-first. The light interpretation inherits from the canonical navy-paper state.
- **Do** trust visible-chroma borders for surface separation — see The Border-Not-Shadow Rule.

### Don't:

- **Don't** use warm-cream surfaces. That's Editorial / Paper-ink territory; Blueprint sits cool.
- **Don't** strip borders to neutral gray. The grid-line feel is identity-load-bearing.
- **Don't** reach for marketing-register affordances — stat-bleed cards, persuasive amber accents, projection-contrast surfaces. Engineering tone undermines marketing reader-jobs and vice versa.
- **Don't** widen the radius scale. Drawings have sharp corners — 0.25rem is the ceiling.
- **Don't** use serif headings or mono headings. Blueprint's annotation-feel comes from sans + leading + tracking, not from face swap.
- **Don't** drop saturated chart palettes that compete with the gold-on-navy surface moments. The technical-cool range is intentional.
