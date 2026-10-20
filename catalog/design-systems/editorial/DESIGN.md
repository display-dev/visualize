---
name: Editorial
description: Magazine-publishing register — serif display, warm-neutral palette, deep-navy accent. Long-form reading at 1.65 leading on cream paper.

# Colors carry the shadcn-semantic slug names visualize templates already
# read (`var(--card)`, `var(--card-foreground)`, `var(--chart-1)`...).
# OKLCH per the visualize palette convention; Stitch's linter validates
# hex sRGB only and will warn on these strings — accepted trade for one
# source of truth and wide-gamut fidelity. Light-mode values only;
# dark-mode lives in the sidecar `tokens.css`.
canonical-canvas: light
selection:
  mood: [editorial, high-contrast, organic]
  tone: [authoritative, serious, calm, warm]
  formality: medium
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a authoritative, serious, calm, warm register with editorial, high-contrast, organic visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

colors:
  background: "oklch(0.985 0.004 75)"
  foreground: "oklch(0.18 0.008 50)"
  card: "oklch(0.975 0.006 75)"
  card-foreground: "oklch(0.18 0.008 50)"
  popover: "oklch(0.99 0.003 75)"
  popover-foreground: "oklch(0.18 0.008 50)"
  primary: "oklch(0.28 0.08 245)"
  primary-foreground: "oklch(0.97 0.004 75)"
  secondary: "oklch(0.94 0.008 75)"
  secondary-foreground: "oklch(0.18 0.008 50)"
  muted: "oklch(0.94 0.008 75)"
  muted-foreground: "oklch(0.42 0.008 50)"
  accent: "oklch(0.92 0.012 60)"
  accent-foreground: "oklch(0.18 0.008 50)"
  destructive: "oklch(0.50 0.18 28)"
  destructive-foreground: "oklch(0.97 0.004 75)"
  border: "oklch(0.86 0.008 70)"
  input: "oklch(0.86 0.008 70)"
  ring: "oklch(0.55 0.04 50)"
  chart-1: "oklch(0.55 0.14 35)"
  chart-2: "oklch(0.45 0.10 245)"
  chart-3: "oklch(0.62 0.10 95)"
  chart-4: "oklch(0.40 0.08 280)"
  chart-5: "oklch(0.55 0.06 25)"
  sidebar: "oklch(0.96 0.006 75)"
  sidebar-foreground: "oklch(0.18 0.008 50)"
  sidebar-primary: "oklch(0.28 0.08 245)"
  sidebar-primary-foreground: "oklch(0.97 0.004 75)"
  sidebar-accent: "oklch(0.92 0.012 60)"
  sidebar-accent-foreground: "oklch(0.18 0.008 50)"
  sidebar-border: "oklch(0.86 0.008 70)"
  sidebar-ring: "oklch(0.55 0.04 50)"

typography:
  display:
    fontFamily: "var(--font-serif)"
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.2
  heading:
    fontFamily: "var(--font-serif)"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "var(--font-serif)"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.875rem"
    fontWeight: 500
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "calc(0.375rem - 2px)"
  md: "0.375rem"
  lg: "calc(0.375rem + 2px)"
  xl: "calc(0.375rem + 4px)"

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
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"
---

# Design System: Editorial

## 1. Overview: The Reading Salon

**Creative North Star: "The Reading Salon"**

Editorial is visualize's long-form publishing register — the magazine that wants the reader to sit down with it rather than scroll past. Warm-cream surfaces, deep-navy accent, transitional serif display, body type at 17px with 1.65 leading. The aesthetic reference is NYT / Substack / The Atlantic / The New Yorker on a thoughtful day; the design's job is to invite a reading posture, not to demand attention.

This is the system to reach for when the artifact is **prose-led**: a Whitepaper, a Report, a Postmortem narrative, a long-form Research brief. The typography carries hierarchy; the navy primary appears on inline links and the occasional refined emphasis, never as a surface wash; horizontal rules and small-caps eyebrows do section work that other systems hand to icons or color blocks.

Editorial explicitly rejects: code-shop chrome (mono everywhere, tight tracking), dashboard KPI tiles, saturated color fills on surfaces, gradient accents, icon-per-heading section markers, and the AI-essay center-everything pattern. The warm-cream surface is load-bearing — strip it to white and the design reads as generic; the cream-plus-navy plus-serif triple is the identity.

**Key Characteristics:**
- Warm-cream surfaces (chroma 0.004-0.012, hue 75) — not pure white, not gray. Warmth invites reading posture.
- Deep-navy `--primary` (oklch 0.28 / 0.08 / 245) for inline links and the one refined accent moment per artifact.
- Serif display via `--font-display: var(--font-serif)` (Iowan Old Style / Apple Garamond / Baskerville stack).
- 17px serif body at leading 1.65 — generous reading measure, ~65-75ch cap.
- Tighter radius (0.375rem) than Clean — Editorial reads sharper, less rounded-UI register.

## 2. Colors: The Warm-Cream Palette

A two-chord palette: warm-cream neutrals (hue 75, very low chroma) carrying a deep-navy accent + a sepia-leaning chart range. The restraint is doctrinal — no second hue in the core system.

### Primary
- **Deep Editorial Navy** (`oklch(0.28 0.08 245)`): The one accent — inline links, primary CTAs, focus rings, the occasional pull-quote rule. Reads as serious-reading rather than marketing-emphatic.

### Neutral
- **Warm-Cream Background** (`oklch(0.985 0.004 75)`): Body + page surface. The cream is what makes the design read as paper rather than UI.
- **Warm Ink Foreground** (`oklch(0.18 0.008 50)`): Primary text. Carries a touch of warmth so it reads as ink-on-cream, not black-on-white.
- **Cream Card** (`oklch(0.975 0.006 75)`): Card surface — slightly deeper than background, near-imperceptible separation.
- **Muted Cream** (`oklch(0.94 0.008 75)`): Secondary surfaces, callouts, ambient panels.
- **Hairline Cream Border** (`oklch(0.86 0.008 70)`): Visible-but-restrained rule lines. Slightly heavier than Clean's borders — Editorial uses rules for section breaks.

### State
- **Editorial Red** (`oklch(0.50 0.18 28)`): Destructive actions and errors. Restrained — sits well below the genre-reflex ceiling.

### Chart Palette
- **`--chart-1` Terracotta** (`oklch(0.55 0.14 35)`), **`--chart-2` Navy** (`oklch(0.45 0.10 245)`), **`--chart-3` Olive** (`oklch(0.62 0.10 95)`), **`--chart-4` Plum** (`oklch(0.40 0.08 280)`), **`--chart-5` Clay** (`oklch(0.55 0.06 25)`): A warm-bias five-stop palette — terracotta + navy + olive + plum + clay. Reads as printed-publication editorial range, not dashboard data viz.

### Named Rules

**The Warmth-Is-Load-Bearing Rule.** The cream background carries the publishing register. Strip it to pure white and the navy primary reads as abrasive rather than refined; the serif display reads as ornamental rather than considered. The warmth is identity, not decoration.

**The One-Accent Rule.** Deep navy is the only chroma in core surfaces. No supporting accent. If the artifact needs a second emphasis, the typography (weight, size, italic) carries it — never a second hue.

## 3. Typography: The Serif-and-Sans Voice

**Display Font:** transitional serif stack (Iowan Old Style, Apple Garamond, Baskerville, Source Serif 4, Source Serif Pro, Georgia)
**Body Font:** humanist sans stack (Charter, Source Sans 3, system-ui)
**Mono Font:** system mono

**Character:** The display face is a refined transitional serif used for headings — stately without being stuffy, drawing on long-form editorial headline traditions. The body face is a clean humanist sans chosen to set long paragraphs without visual overhead at 17px. Mono is reserved for inline code and metadata; it doesn't drive display.

### Hierarchy

- **Display** (serif, weight 400, `clamp(2.25rem, 5vw, 3.25rem)`, leading 1.2): Hero titles, top-of-document headlines.
- **Heading** (serif, weight 400, 1.875rem, leading 1.25): Section headings.
- **Title** (serif, weight 500, 1.25rem, leading 1.3): Sub-section heads.
- **Body** (sans, weight 400, 17px, leading 1.65): Paragraph copy. 65-75ch cap.
- **Label** (sans, weight 500, 0.875rem): CTA labels, metadata, small structural copy.
- **Mono** (mono, weight 400, 0.875rem): Inline code.

### Named Rules

**The Serif-Display-Rule.** `--font-display` resolves to `--font-serif`. Headings render serif; body stays sans. Reversing this (sans heads, serif body) reads as generic-corporate; serif-heads-on-cream is what makes Editorial Editorial.

**The 17px-Body Rule.** Body sets at 17px, not 16px. The extra pixel makes long-form reading comfortable on cream paper at 1.65 leading.

**The 1.65 Leading Rule.** Body line-height is 1.65 — wider than Clean's 1.6 because serif body benefits from extra leading. Magazine-column rhythm, not UI-column rhythm.

## 4. Elevation

Flat at rest. Editorial uses subtle warm-tinted shadows (hsl(28 30% 10%) at low alpha) when elevation is needed — for hover lifts on cards or floating UI — but the resting state of every surface is shadow-free. Section breaks use horizontal rules in `--border`, not shadows.

### Shadow Vocabulary

- **`--shadow-sm`** (warm-tinted, low alpha): Hairline lift for interactive card hover states.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for floating UI (dropdowns, modals).

### Named Rules

**The Rule-Not-Shadow Rule.** Editorial uses 1px horizontal rules in `--border` for section breaks and structural seams. Reaching for a shadow on a non-interactive resting element reads as UI; rules read as printed page.

## 5. Components

### Buttons

- **Shape:** Soft-rounded (`--radius-md`, ~6px). Tighter than Clean's 10px — Editorial reads sharper.
- **Primary:** Deep-navy background, cream text, weight 500 label, padding 0.5rem 1rem.
- **Hover:** Shifts to warm-ink foreground (a small darkening, confirms interaction without shouting).
- **Secondary:** Muted-cream background, warm-ink text. Same shape, lower visual weight.
- **Focus:** `--ring` (warm-neutral) border + soft outline glow.

### Cards & Containers

- **Corner Style:** `--radius-lg` (~8px) at rest. Tighter than Clean.
- **Background:** `--card` (slightly deeper cream than `--background`).
- **Border:** Hairline 1px in `--border`. More visible than Clean — Editorial leans on rules.
- **Internal Padding:** 1.5rem default; tighter (1rem) for dense card grids.

### Inputs / Fields

- **Style:** `--radius-md` (~6px), hairline `--border`, transparent.
- **Focus:** `--ring` border + low-alpha cream-tinted outline glow.

### Navigation

- **Style:** Sans body family, weight 500, label scale.
- **States:** Default `--foreground`; hover shifts to deep-navy `--primary`. No underline at rest.

### Chart Palette

Warm-bias five-stop: terracotta + navy + olive + plum + clay. Editorial-range, not dashboard-range. Single-hue progression isn't used here — the warm-mixed palette is the identity.

## 6. Do's and Don'ts

### Do:

- **Do** keep `--background` warm cream (hue 75, chroma 0.004+). Strip to pure white and the design reads as generic — see The Warmth-Is-Load-Bearing Rule.
- **Do** render headings serif via `--font-display: var(--font-serif)`. The serif-on-cream is the identity — see The Serif-Display-Rule.
- **Do** set body at 17px with leading 1.65 for long-form prose comfort.
- **Do** use the deep-navy `--primary` on inline links and the one refined emphasis per artifact. Restraint reads as confident.
- **Do** use horizontal rules in `--border` for section breaks. Editorial rhythm.
- **Do** keep surfaces flat at rest. Shadows respond to state — see The Rule-Not-Shadow Rule.
- **Do** generous reading measure on body prose (~65-75ch).

### Don't:

- **Don't** use mono-everywhere headings, tight tracking, or square radii. That's Terminal / IDE territory; Editorial reads off-register against code-shop chrome.
- **Don't** drop dashboard-shaped KPI tiles, status pills, or sparkline strips into Editorial templates. Dashboard chrome reads off-key; if the artifact needs them, the derivation should reference Console or IDE.
- **Don't** saturate any surface with chroma. Editorial's surfaces stay near-zero chroma; only the navy primary and the chart palette carry color.
- **Don't** add icon-per-heading section markers. The serif display + Title hierarchy carries section work without iconography.
- **Don't** swap the chart palette to gradient stops (purple → pink, indigo → cyan). The Editorial warm-mixed range is intentional.
- **Don't** use gradient text or `background-clip: text` on headings. Banned across the design system.
- **Don't** center body prose section-after-section — that's the AI-essay tell. Editorial respects the left-aligned reading column.
