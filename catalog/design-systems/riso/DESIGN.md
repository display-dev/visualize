---
name: Riso
description: Risograph-print register — 2-3 fluorescent spot colours on warm off-white paper. No muted-grey ramp; every accent is a spot. Chunky display serif + clean sans body. Zine / poster / opinionated-essay voice.

# Riso's defining choice is no muted-grey scale — the surface ramp is
# paper-shifted off-white, and every "accent" is one of the spot colours
# (fluorescent pink + teal + optional yellow). Hue-50 warm chassis for
# the paper feel. OKLCH; "fluorescent" reads as high chroma at moderate
# lightness, the closest visualize's gamut gets to actual fluorescent
# ink.
canonical-canvas: light
selection:
  mood: [minimal, productivity, editorial, high-contrast]
  tone: [dramatic, bold, friendly, optimistic]
  formality: low
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a dramatic, bold, friendly, optimistic register with minimal, productivity, editorial, high-contrast visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

colors:
  background: "oklch(0.96 0.012 70)"
  foreground: "oklch(0.22 0.014 30)"
  card: "oklch(0.98 0.008 70)"
  card-foreground: "oklch(0.22 0.014 30)"
  popover: "oklch(0.98 0.008 70)"
  popover-foreground: "oklch(0.22 0.014 30)"
  primary: "oklch(0.65 0.27 350)"
  primary-foreground: "oklch(0.96 0.012 70)"
  secondary: "oklch(0.92 0.020 200)"
  secondary-foreground: "oklch(0.22 0.014 30)"
  muted: "oklch(0.93 0.010 70)"
  muted-foreground: "oklch(0.40 0.014 30)"
  accent: "oklch(0.65 0.18 200)"
  accent-foreground: "oklch(0.96 0.012 70)"
  destructive: "oklch(0.60 0.24 25)"
  destructive-foreground: "oklch(0.96 0.012 70)"
  border: "oklch(0.86 0.014 70)"
  input: "oklch(0.86 0.014 70)"
  ring: "oklch(0.65 0.27 350)"
  chart-1: "oklch(0.65 0.27 350)"
  chart-2: "oklch(0.65 0.18 200)"
  chart-3: "oklch(0.80 0.18 90)"
  chart-4: "oklch(0.55 0.20 340)"
  chart-5: "oklch(0.50 0.16 200)"
  sidebar: "oklch(0.93 0.010 70)"
  sidebar-foreground: "oklch(0.22 0.014 30)"
  sidebar-primary: "oklch(0.65 0.27 350)"
  sidebar-primary-foreground: "oklch(0.96 0.012 70)"
  sidebar-accent: "oklch(0.65 0.18 200)"
  sidebar-accent-foreground: "oklch(0.96 0.012 70)"
  sidebar-border: "oklch(0.86 0.014 70)"
  sidebar-ring: "oklch(0.65 0.27 350)"

typography:
  display:
    fontFamily: "'Recoleta', 'Bagnard', Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "'Recoleta', 'Bagnard', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.005em"
    textTransform: "uppercase"
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.08em"
    textTransform: "uppercase"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0"
  md: "0"
  lg: "0"
  xl: "0"

spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.75rem"
  xl: "3rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "2px solid {colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.125rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
    border: "2px solid {colors.foreground}"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
    border: "2px solid {colors.foreground}"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"
---

# Design System: Riso

## 1. Overview: Spot Ink on Warm Paper

**Creative North Star: "Two Spots and the Page"**

Riso is visualize's risograph-print register. The aesthetic reference is the small-run zine, the conference-room poster pinned to drywall, the opinionated single-page essay — print artifacts where the printer only had three ink drums and the constraint became the identity. Riso ships with **two spot colours** (fluorescent pink + teal) on a **warm off-white paper** chassis, **no muted-grey ramp**, **zero radius**, and **chunky display serif** anchored by clean sans body copy.

The "no muted grey" rule is the structural commitment that separates Riso from Paper-ink and Editorial. Where those systems carry a soft neutral ramp for ambient panels and recessed text, Riso replaces every grey beat with a tint of one of the two spots. Muted text is a desaturated tone of the primary; sidebar surfaces are tinted with the accent; even the page's "softer" sections live as washes of pink or teal, not grey.

Riso is the system to reach for when the artifact wants to **shout opinion**. Manifestos, zine-shaped essays, conference-talk handouts, opinionated single-page pitches, "here's what we believe" landing pages. Not for technical content (the chunky serif fights legibility for documentation), not for long-form prose (Editorial / Whitepaper own that), not for data-dense tables (the high-chroma spots clash with structured data).

**Key Characteristics:**
- Warm off-white paper background (hue 70, L 0.96) + dark warm-grey print foreground (hue 30, L 0.22) — the print register feels like ink-on-paper, not pixel-on-screen.
- Two spot colours: fluorescent pink primary (hue 350, chroma 0.27 — visualize's highest-chroma primary) + teal accent (hue 200, chroma 0.18). No third systematic spot, though `chart-3` carries an optional yellow wash for data viz.
- Zero radius everywhere. Riso prints have sharp edges; soft corners read out-of-register.
- 2px hard borders on cards / buttons-secondary / inputs — bordered rectangles, not subtle hairlines.
- Chunky display serif (`Recoleta` / `Bagnard` / Georgia) at weight 700, leading 1.0. Body stays sans for legibility.
- All-caps tracked labels at +0.08em — the zine-headline voice.

## 2. Colors: Two Spots, No Greys

A paper chassis + dark print foreground + two high-chroma spots. The chassis-vs-print contrast does the structural work; the spots punctuate. No systematic muted-grey ramp — `muted` is a desaturated near-paper, `muted-foreground` is a desaturated near-print, neither carries the cool-grey neutrality of Clean's ramp.

### Paper Ramp
- **Paper Background** (`oklch(0.96 0.012 70)`): The off-white page. Hue-70 warm; not pure white.
- **Card** (`oklch(0.98 0.008 70)`): Card surface. Slightly lighter than paper — barely.
- **Muted** (`oklch(0.93 0.010 70)`): Ambient panel — a tint darker than paper.

### Spot Colours
- **Fluorescent Pink** (`oklch(0.65 0.27 350)`): Primary. CTAs, focus rings, highlight headlines. The chroma 0.27 is visualize's highest-saturation primary — riso ink is genuinely *fluorescent*.
- **Teal** (`oklch(0.65 0.18 200)`): Accent. Secondary spots, alternate-state badges, callout blocks. Less saturated than pink so the pink dominates.

### Print Ramp
- **Print Foreground** (`oklch(0.22 0.014 30)`): Primary text. Hue-30 warm-shifted dark — the eye reads "ink" rather than "near-black".
- **Muted Print** (`oklch(0.40 0.014 30)`): Captions, metadata, supporting prose. Still warm-shifted; not a cool grey.

### Chart Palette
Five-stop categorical ramp using the two spots + variations: pink (chart-1) → teal (chart-2) → yellow (chart-3, an optional third spot for data viz only) → magenta-pink (chart-4) → deep teal (chart-5). The data-viz palette is the one place a yellow appears in Riso's vocabulary — the rest of the system is two-spot.

### Named Rules

**The No-Grey-Ramp Rule.** Riso replaces every cool-grey beat with a warm-tinted near-paper or near-print value. `--muted` is `oklch(0.93 0.010 70)`, not `oklch(0.93 0 0)`. `--muted-foreground` is `oklch(0.40 0.014 30)`, not `oklch(0.40 0 0)`. Pure-neutral greys belong to Clean / Brutalist; Riso's grey is always slightly warm or slightly tinted.

**The Two-Spot Rule.** Pink + teal are the entire spot palette. A third spot (yellow) appears only in the chart palette — never in chrome, buttons, or page sections. Adding a third spot to chrome breaks the small-print-run identity.

**The High-Chroma Primary Rule.** Riso's primary at chroma 0.27 deliberately exceeds the genre-reflex chroma ceiling (≤0.22 in most visualize systems). The exception is identity-load-bearing: riso ink is *fluorescent*; restraining the chroma reads as "pink", not "riso".

## 3. Typography: Chunky Serif + Clean Sans

**Display Font:** chunky display serif (`Recoleta`, `Bagnard`, fallback Georgia)
**Body Font:** system sans (`var(--font-sans)`)
**Mono Font:** system mono (`var(--font-mono)`)

**Character:** Two-typeface system. Display + Heading run a chunky display serif at weight 700 with negative tracking — anchoring the page like a zine headline. Body stays sans for readability — Riso's chrome is opinionated; the body shouldn't fight you on legibility. Label runs all-caps sans at +0.08em tracking, doubling the chunky-serif headline's voice in miniature.

### Hierarchy

- **Display** (chunky serif, weight 700, `clamp(2.5rem, 6vw, 4rem)`, leading 1.0, tracking −0.025em): Zine-headline scale. Leading 1.0 — display headlines should pack like a poster.
- **Heading** (chunky serif, weight 700, 2rem, leading 1.1, tracking −0.015em): Section heads.
- **Title** (sans, weight 700, 1.125rem, uppercased, tracking +0.005em): Sub-section heads. Sans + uppercased pairs visually with Label.
- **Body** (sans, weight 400, 17px, leading 1.55): Paragraph copy. Slightly larger than Clean's 16px — Riso pages favour generous body type.
- **Label** (sans, weight 700, 0.8125rem, uppercased, tracking +0.08em): The zine-headline voice in miniature. Buttons, badges, navigation.
- **Mono** (mono, weight 400, 0.875rem): Inline code (rare in Riso).

### Named Rules

**The Chunky-Display Rule.** Display + Heading run a chunky display serif (Recoleta / Bagnard / Georgia). Thin display serifs (Didone, Tiempos) belong to Editorial; light sans display (Inter at weight 400) belongs to Whitepaper. Riso's display is *blocky*.

**The 17px Body Rule.** Body is 17px (vs Clean's 16px). The zine register favours one-step-up body type. Smaller body shrinks the page; Riso wants generous reading length.

## 4. Elevation: Bordered, Not Lifted

Riso surfaces don't lift. There is no shadow scale — cards and buttons use 2px hard borders in `--foreground` (the print colour) to define edges. Borders are the elevation vocabulary.

### Named Rules

**The 2px-Border Rule.** Cards, inputs, and secondary buttons all carry 2px solid `--foreground` borders. Hairline (1px) borders belong to Clean / Bento; Riso's borders are *printed*, which means visible.

**The No-Shadow Rule.** No shadows at any level — at rest or on state. Hovering a card may shift its border colour (e.g. from `--foreground` to `--primary`) but doesn't add depth. Riso is a 2D surface.

## 5. Components

### Buttons

- **Shape:** `--radius-sm` (0 — zero radius, sharp corners).
- **Primary:** Pink fill, paper-foreground text, label-style typography (uppercased weight 700 tracked +0.08em), padding 0.625rem 1.25rem. No shadow.
- **Secondary:** Transparent fill, 2px pink border + pink text, same shape.

### Cards & Containers

- **Corner Style:** `--radius-md` (0).
- **Background:** `--card` or `--muted` (warm-tinted near-paper).
- **Border:** 2px solid `--foreground` (the print colour) — visible, intentional, ink-on-paper.
- **Shadow:** None.
- **Internal Padding:** 1.5rem default.

### Inputs / Fields

- **Style:** Zero radius, 2px `--foreground` border, `--background` fill.
- **Focus:** Border shifts to `--primary` (pink). No glow.

### Navigation

- **Style:** Label (sans, weight 700, uppercased, tracked +0.08em).
- **States:** Default `--foreground`; hover shifts to `--primary` (pink). Underline on hover via 2px decoration.

### Chart Palette

Five-stop categorical. Use chart-1 (pink) for primary series, chart-2 (teal) for comparison, chart-3 (yellow) for "different category — caution / pending state", chart-4/5 for additional series. Don't sequence by lightness; Riso's chart palette is categorical, like its spot palette.

## 6. Do's and Don'ts

### Do:

- **Do** treat Riso as opinion-loaded. The register is "this is what I think" — manifestos, single-page essays, conference-talk handouts.
- **Do** keep every grey *warm*. Riso's grey ramp is always tinted hue-30 or hue-70 — never pure cool grey.
- **Do** lean into the two-spot constraint. Adding a third chrome colour reads as Bento, not Riso.
- **Do** ship the chunky display serif at weight 700 with leading 1.0. The packed display is the zine-poster signature.
- **Do** use 2px hard borders. Riso's elevation is bordered, not lifted.

### Don't:

- **Don't** use Riso for technical documentation. The chunky display + high-chroma spots fight prose legibility on long content. Use Whitepaper / Editorial / Clean instead.
- **Don't** add a third chrome spot colour. Pink + teal are the system. Yellow appears only in chart-3.
- **Don't** soften the radius. Zero radius is part of the print register; even `--radius-sm: 2px` reads off.
- **Don't** introduce shadow elevation. Riso surfaces are 2D; borders carry the edge.
- **Don't** thin out the display serif (e.g., weight 400). Riso's display is blocky; thin serifs belong to Editorial.
