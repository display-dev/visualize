---
name: Dithered
description: 80s/90s computing aesthetic — limited CGA-inspired palette (cyan + magenta + black + white), dither-pattern fills, pixel-grid typography. The artifact reads as a system message from a 16-colour video mode.

# Modern OKLCH translation of CGA palette. Light-canonical (the CGA
# monitor's bright variant); dark is the deep-phosphor CRT register.
# Surfaces carry just-perceptible cool tint; the chromatic primary
# (magenta) and accent (cyan) are the canonical CGA two-tone.
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

colors:
  background: "oklch(0.96 0.010 200)"
  foreground: "oklch(0.18 0.020 250)"
  card: "oklch(0.98 0.008 200)"
  card-foreground: "oklch(0.18 0.020 250)"
  popover: "oklch(0.98 0.008 200)"
  popover-foreground: "oklch(0.18 0.020 250)"
  primary: "oklch(0.55 0.20 320)"
  primary-foreground: "oklch(0.98 0.008 200)"
  secondary: "oklch(0.92 0.012 200)"
  secondary-foreground: "oklch(0.18 0.020 250)"
  muted: "oklch(0.92 0.012 200)"
  muted-foreground: "oklch(0.42 0.020 250)"
  accent: "oklch(0.62 0.16 200)"
  accent-foreground: "oklch(0.18 0.020 250)"
  destructive: "oklch(0.55 0.22 25)"
  destructive-foreground: "oklch(0.98 0.008 200)"
  border: "oklch(0.18 0.020 250)"
  input: "oklch(0.18 0.020 250)"
  ring: "oklch(0.55 0.20 320)"
  chart-1: "oklch(0.55 0.20 320)"
  chart-2: "oklch(0.62 0.16 200)"
  chart-3: "oklch(0.78 0.12 320)"
  chart-4: "oklch(0.38 0.18 200)"
  chart-5: "oklch(0.18 0.020 250)"
  sidebar: "oklch(0.94 0.010 200)"
  sidebar-foreground: "oklch(0.18 0.020 250)"
  sidebar-primary: "oklch(0.55 0.20 320)"
  sidebar-primary-foreground: "oklch(0.98 0.008 200)"
  sidebar-accent: "oklch(0.62 0.16 200)"
  sidebar-accent-foreground: "oklch(0.18 0.020 250)"
  sidebar-border: "oklch(0.18 0.020 250)"
  sidebar-ring: "oklch(0.55 0.20 320)"

typography:
  display:
    fontFamily: "var(--font-mono)"
    fontSize: "clamp(2rem, 5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.005em"
    textTransform: "uppercase"
  heading:
    fontFamily: "var(--font-mono)"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.1
    textTransform: "uppercase"
  title:
    fontFamily: "var(--font-mono)"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  body:
    fontFamily: "var(--font-mono)"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-mono)"
    fontSize: "0.75rem"
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

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "1rem"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.625rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"

spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
---

# Design System: Dithered

## 1. Overview: 16-Colour Video Mode

**Creative North Star: "The Constraint of the Bit-Plane"**

Dithered is visualize's 80s/90s computing register — the aesthetic of a system message rendered in 16 colours on a phosphor monitor. Limited palette (cyan + magenta + black + white per the canonical CGA pairing), pixelated dither-pattern fills for depth, all-mono typography that reads as a BIOS-era system notice or floppy-disk installer screen.

Use Dithered for self-aware retro artifacts — release notes for a tool that *wants* to feel terminal-era, post-mortems with a "system fault" register, conference handouts for indie-game / hacker-culture contexts, jokey internal "404" pages. Not for serious customer-facing content (the retro register reads as joke or pastiche), not for long-form prose (mono everywhere fights reading), not for data dashboards (the limited palette can't carry multi-series chart distinction at scale).

**Key Characteristics:**
- Two-tone CGA-derived primary + accent: magenta (hue 320, chroma 0.20) + cyan (hue 200, chroma 0.16). The same pairing the original IBM CGA mode 4 palette was built on.
- All typography mono. Display + heading + title + label all uppercased; tracking compressed for the dense terminal-block feel.
- Zero radius everywhere. Pixel grids don't round.
- Borders carry full-strength foreground (`--border` = `--foreground`). 2-bit borders, not antialiased hairlines.
- Dither-pattern fills (via SVG / repeating linear-gradient) on accent surfaces — adds the "we only have 16 colours but we need shading" texture.

## 2. Colors: Two-Tone CGA + Dither

A two-tone chromatic primary + accent atop near-monochrome surfaces. The dither patterns are doing the "soft surface" work — surfaces themselves are flat.

### Two-Tone
- **Magenta Primary** (`oklch(0.55 0.20 320)`): The hot voltage. CGA mode 4's first chromatic register.
- **Cyan Accent** (`oklch(0.62 0.16 200)`): The cool counterpart. CGA mode 4's second register.

### Surfaces
- **Background** (`oklch(0.96 0.010 200)`): Cool off-white "monitor phosphor" base.
- **Card** (`oklch(0.98 0.008 200)`): Slightly brighter — but the visual differentiation between background and card comes from the BORDER (full-strength foreground), not surface lightness.

### Named Rules

**The Two-Tone-Only Rule.** Magenta + cyan are the chromatic vocabulary. Adding a third chromatic accent breaks the CGA fidelity.

**The Border-Is-Foreground Rule.** `--border` equals `--foreground` (deep cool ink). Cards / inputs / dividers all carry full-strength 2px borders in the foreground value — visible, pixelated, intentional.

**The Dither-For-Shading Rule.** When a surface needs "shading" (subtle tonal variation), use a dither pattern (2-bit dot fill, repeating gradient) rather than a softened colour. The constraint is the identity.

## 3. Typography: All Mono, All Uppercased

Every chrome role runs mono. Display + heading + title + label are uppercased. Body stays mono but normal-case for readability. The split is mono-everywhere (uniform pixel-grid feel) with case as the hierarchy signal.

## 4. Elevation: None

No shadows, no depth lift. Dithered is a 2D surface like a phosphor screen. Elevation comes from border + dither contrast, never from `box-shadow`.

## 5. Components

### Buttons
- Zero radius. Mono uppercased label. Magenta primary fill or transparent + 2px magenta border secondary.

### Cards
- Zero radius. 2px solid `--foreground` border. Optional dither overlay on accent cards.

### Notices / Banners
- Full-bleed coloured strip (magenta or cyan), foreground text, 2px border top + bottom. Maximum BIOS-message energy.

## 6. Do's and Don'ts

### Do:
- **Do** keep palette to two chromatic tones + black + white. The constraint is the identity.
- **Do** use mono everywhere. The pixel-grid uniformity is the read.
- **Do** use 2px full-strength borders. Hairlines belong to modern systems.
- **Do** add dither-pattern fills for visual texture instead of soft surfaces.

### Don't:
- **Don't** use Dithered for serious customer-facing content. The retro register reads as pastiche.
- **Don't** soften the corners. Zero radius is the identity.
- **Don't** add a third chromatic accent.
- **Don't** use sans-serif for any role. Mono is the rule.
