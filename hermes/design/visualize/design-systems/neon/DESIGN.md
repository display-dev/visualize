---
name: Neon
description: Dark-canonical cyberpunk register — deep canvases, high-chroma magenta + cyan accents, glow vocabulary instead of shadow vocabulary, mono-prominent typography. The off-state is light mode; artifacts using Neon are reaching for futuristic-dark, not dev-default-dark.

# Neon sits on a slight purple-leaning neutral (hue ~280) so the dark
# surfaces don't read as pure-grey terminal but as deep-space midnight.
# OKLCH; light mode is the documented off-state with shifted L for
# surfaces but preserved hue + chroma for accents.
canonical-canvas: dark
selection:
  mood: [cyberpunk, gradient]
  tone: [dramatic, bold]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a dramatic, bold register with cyberpunk, gradient visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

colors:
  background: "oklch(0.97 0.006 280)"
  foreground: "oklch(0.15 0.012 280)"
  card: "oklch(0.99 0.004 280)"
  card-foreground: "oklch(0.15 0.012 280)"
  popover: "oklch(0.99 0.004 280)"
  popover-foreground: "oklch(0.15 0.012 280)"
  primary: "oklch(0.55 0.22 340)"
  primary-foreground: "oklch(0.99 0 0)"
  secondary: "oklch(0.93 0.012 280)"
  secondary-foreground: "oklch(0.15 0.012 280)"
  muted: "oklch(0.94 0.006 280)"
  muted-foreground: "oklch(0.48 0.012 280)"
  accent: "oklch(0.55 0.20 200)"
  accent-foreground: "oklch(0.99 0 0)"
  destructive: "oklch(0.55 0.25 25)"
  destructive-foreground: "oklch(0.99 0 0)"
  border: "oklch(0.88 0.008 280)"
  input: "oklch(0.88 0.008 280)"
  ring: "oklch(0.55 0.22 340)"
  chart-1: "oklch(0.68 0.22 340)"
  chart-2: "oklch(0.66 0.20 200)"
  chart-3: "oklch(0.72 0.18 280)"
  chart-4: "oklch(0.74 0.16 90)"
  chart-5: "oklch(0.62 0.20 150)"
  sidebar: "oklch(0.94 0.006 280)"
  sidebar-foreground: "oklch(0.15 0.012 280)"
  sidebar-primary: "oklch(0.55 0.22 340)"
  sidebar-primary-foreground: "oklch(0.99 0 0)"
  sidebar-accent: "oklch(0.55 0.20 200)"
  sidebar-accent-foreground: "oklch(0.99 0 0)"
  sidebar-border: "oklch(0.88 0.008 280)"
  sidebar-ring: "oklch(0.55 0.22 340)"

typography:
  display:
    fontFamily: "var(--font-mono)"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "0.02em"
    textTransform: "uppercase"
  heading:
    fontFamily: "var(--font-mono)"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.02em"
    textTransform: "uppercase"
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.01em"
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-mono)"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.125rem"
  md: "0.25rem"
  lg: "0.375rem"
  xl: "0.5rem"

spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1.25rem"
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

# Design System: Neon

## 1. Overview: Glow Vocabulary

**Creative North Star: "Glow Over Depth"**

Neon is visualize's dark-canonical futuristic register. Where Console / Terminal / IDE are *dev-default-dark* (the workman's terminal aesthetic), Neon is *cyberpunk-dark* — deep midnight canvases punctuated by magenta and cyan accents that don't just sit on the page but *glow*. The signature of Neon isn't the colour palette; it's that surfaces use a **glow shadow vocabulary** (outer-glow box-shadows colour-matched to the accent) where every other visualize system uses a depth shadow vocabulary.

Neon is the system to reach for when the artifact's voice is futuristic, sci-fi, or technically opinionated in a stylised register — product launches for AI-adjacent tooling, technical roadmaps that want to feel ambitious, retrospective writeups of complex incidents, "the future of X" essays. It's not for everyday tech docs (Console / IDE handle those calmly); it's for documents that want to *announce* themselves.

Neon explicitly rejects: light-canonical use (the off-state exists but the identity is gone — pink-on-light reads anaemic rather than glowing), mixed-system layouts (Neon paired with Editorial reads as theme-park signage), and any artifact where the content should outweigh the chrome (long-form prose suffocates under the glow).

**Key Characteristics:**
- Hue-280 chassis (slight purple-leaning neutrals) — distinguishes Neon's "midnight" from Console's pure-grey.
- High-chroma magenta primary (`oklch(0.68 0.22 340)` in dark; `oklch(0.55 0.22 340)` in light) + cyan accent (`hue 200`) — neon's two voltage poles.
- Mono-prominent typography: Display + Heading + Label all use `--font-mono` with positive tracking and uppercase. Body stays sans for readability.
- Tight radius scale (0.125rem to 0.5rem) — Neon's edges are sharp; soft corners would soften the cyberpunk read.
- Glow shadows (`--glow-primary`, `--glow-accent`) replace the usual depth-shadow scale at hover / focus / featured states.

## 2. Colors: Hue-280 Midnight + Two Voltage Poles

A purple-leaning dark chassis (hue 280) paired with magenta primary (hue 340) and cyan accent (hue 200). The midnight chassis is what keeps Neon distinct from Console's pure-grey dark — even at saturation 0.006, the hue-280 read is "deep space" rather than "terminal".

### Surface Ramp (dark-canonical)
- **Background** (`oklch(0.12 0.012 280)`): The midnight canvas. Hue-280 keeps the dark from reading as pure black.
- **Card** (`oklch(0.16 0.014 280)`): Card surfaces, slightly lifted from background — small lightness shift, but the contrast with the accent-glow shadow is what reads.
- **Muted** (`oklch(0.18 0.012 280)`): Recessed panels.

### Two Voltage Poles
- **Magenta Primary** (`oklch(0.68 0.22 340)` in dark): The hot voltage. CTAs, focus rings, glow-shadow source. Hue 340 is at the magenta-pink boundary — pure magenta reads too saturated; pure pink reads too playful.
- **Cyan Accent** (`oklch(0.72 0.20 200)` in dark): The cool voltage. Inline highlights, alternate badges, "active" state indicators. Hue 200 is teal-leaning cyan — pure cyan reads chlorine-blue.

### Foreground & Border (dark)
- **Bright Foreground** (`oklch(0.92 0.005 280)`): Primary text. Slight hue-280 tint keeps it integrated with the midnight chassis.
- **Mid Foreground** (`oklch(0.65 0.012 280)`): Muted text, captions.
- **Soft Border** (`oklch(0.22 0.012 280)`): Card seams. Borders in Neon are subtle — the glow shadows do the heavy edge work.

### Chart Palette
Five-stop high-chroma ramp: magenta (chart-1) → cyan (chart-2) → purple (chart-3) → yellow (chart-4) → green (chart-5). All at L ≈ 0.66-0.74 and C ≥ 0.16. Distinct from Clean's single-hue ramp and Bento's two-tone — Neon's chart palette is *deliberately polychrome*, matching the cyberpunk register.

### Named Rules

**The Hue-280 Midnight Rule.** Every dark surface in Neon sits at hue 280 (slight purple). Pure-grey dark (hue 0, chroma 0) belongs to Console. The hue is what keeps Neon's dark from reading as a terminal — even at 0.006 chroma, the eye reads "space" rather than "screen".

**The Two-Voltage-Pole Rule.** Magenta primary + cyan accent are Neon's identity. They appear together in artifacts (primary CTA = magenta; "active state" badge = cyan). Single-accent Neon reads incomplete.

**The Glow-Over-Depth Rule.** Where every other visualize system uses depth shadows (cards lift off the page), Neon uses glow shadows (cards radiate their accent). `--shadow-md` is replaced by `--glow-primary`. The shadow scale becomes a *glow* scale.

## 3. Typography: Mono-Prominent, Uppercased

**Display Font:** mono (`var(--font-mono)`) — uppercased, tracked
**Body Font:** sans (`var(--font-sans)`) — readable, not stylised
**Mono Font:** mono (`var(--font-mono)`)

**Character:** Display, Heading, and Label all run in mono with positive tracking and `text-transform: uppercase`. Body stays sans for legibility — Neon doesn't want to fight the reader on prose. The mono/sans split is the typographic signature: chrome looks coded, content reads naturally.

### Hierarchy

- **Display** (mono, weight 500, `clamp(2rem, 5vw, 3rem)`, leading 1.1, tracking +0.02em, uppercased): Hero titles. Mono + uppercased is the cyberpunk-signal voice.
- **Heading** (mono, weight 500, 1.75rem, leading 1.2, tracking +0.02em, uppercased): Section headings.
- **Title** (sans, weight 600, 1.125rem, leading 1.3, tracking +0.01em): Sub-heads. Sans because uppercased mono everywhere reads as monolithic.
- **Body** (sans, weight 400, 15px, leading 1.55): Paragraph copy. Sans, normal case, regular weight.
- **Label** (mono, weight 500, 0.8125rem, tracking +0.06em, uppercased): Buttons, badges, metadata.
- **Mono** (mono, weight 400, 0.875rem): Inline code.

### Named Rules

**The Mono-Chrome / Sans-Content Rule.** Chrome (Display, Heading, Label) is mono + uppercased. Content (Title, Body) is sans + normal-case. Mixing — body in mono, label in sans — breaks Neon's coded/human voice split.

**The Positive-Tracking Display Rule.** Display + Heading + Label all run positive tracking (+0.02 to +0.06em). Neon's mono uppercase needs the air to breathe; tight tracking turns it into a brick.

## 4. Elevation: Glow, Not Shadow

The shadow vocabulary is *glow*. Each interactive surface that would carry `--shadow-sm` in Clean carries `--glow-primary` or `--glow-accent` instead. Depth shadows still exist (`--shadow-md` for floating UI like dropdowns) but they're rare — Neon's identity is the colour-emanating edge, not the physical lift.

### Glow Vocabulary

- **`--glow-primary`** (`0 0 12px oklch(0.68 0.22 340 / 0.40), 0 0 32px oklch(0.68 0.22 340 / 0.20)`): Magenta glow for primary CTAs, focus rings, featured cards.
- **`--glow-accent`** (`0 0 12px oklch(0.72 0.20 200 / 0.40), 0 0 32px oklch(0.72 0.20 200 / 0.20)`): Cyan glow for accent-state surfaces.
- **`--glow-soft`** (`0 0 8px oklch(0.50 0.04 280 / 0.30)`): Subtle ambient glow on resting card edges (optional — used sparingly).

### Named Rules

**The Glow-On-Hover Rule.** Interactive cards / buttons grow their glow on hover (e.g. from `--glow-soft` to `--glow-primary`). The growth is the affordance; depth shadows are reserved for floating UI.

**The No-Glassmorphism Rule.** Neon does not stack backdrop-filter on its surfaces. Glassmorphism + glow read as "every AI-generated cyberpunk template ever". Neon's surfaces are opaque; the glow does the depth read alone.

## 5. Components

### Buttons

- **Shape:** `--radius-sm` (0.125rem) — near-square. Sharp edges are part of the cyberpunk read.
- **Primary:** Magenta background, white text, mono label uppercased, padding 0.5rem 1rem, `--glow-primary` shadow on hover.
- **Secondary:** Transparent fill, magenta border + text, same shape. The outline-style button is Neon's secondary signature.

### Cards & Containers

- **Corner Style:** `--radius-md` (0.25rem). Tight corners.
- **Background:** `--card` (slightly lifted from `--background`).
- **Border:** 1px hairline in `--border` — subtle.
- **Shadow:** `--glow-soft` at rest (optional); `--glow-primary` on hover for interactive cards.
- **Internal Padding:** 1.25rem default.

### Inputs / Fields

- **Style:** `--radius-sm`, hairline `--border`, `--background` fill.
- **Focus:** `--ring` (magenta) outline + `--glow-primary` shadow. The focused field literally glows.

### Navigation

- **Style:** Mono family, uppercased, label scale, tracked +0.06em.
- **States:** Default `--foreground`; hover shifts to `--primary` (magenta).

### Chart Palette

Five-stop high-chroma ramp. Use chart-1 (magenta) for primary series, chart-2 (cyan) for comparison, chart-3-5 for additional categorical breakdowns. Don't sequence by lightness — Neon's chart vocabulary is categorical, not gradient.

## 6. Do's and Don'ts

### Do:

- **Do** treat Neon as dark-canonical. The light-mode token block exists so the data-theme toggle works, but artifacts authored in Neon should default to dark.
- **Do** use the glow vocabulary in place of depth shadows. Surfaces emanate; they don't lift.
- **Do** pair magenta primary with cyan accent. Two-pole voltage is Neon's identity.
- **Do** keep typography mono-for-chrome / sans-for-content. The split is the read.
- **Do** keep radius tight (≤0.5rem). Sharp edges hold the cyberpunk register.

### Don't:

- **Don't** use Neon for long-form prose. The high-chroma chrome suffocates running text. Use Editorial or Whitepaper instead.
- **Don't** add backdrop-filter glassmorphism. Glow + glass is the generic-AI-cyberpunk fingerprint. Neon stays opaque.
- **Don't** soften the corners. Generous radius belongs to Bento. Neon's edges are sharp by identity.
- **Don't** drop one of the two voltage poles. Single-accent Neon reads anaemic.
- **Don't** mix Neon with Editorial / Paper-ink / Whitepaper in the same artifact. The registers cancel each other.
