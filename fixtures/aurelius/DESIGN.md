---
name: Aurelius Institute
description: Institutional / academic register — long-form working papers, policy briefs, dataset releases. Sober, hedged, citation-heavy.

# Light-mode values from the fixture Palette + Typography blocks.
# OKLCH per visualize palette convention; Stitch's linter validates hex
# sRGB only and will warn — accepted trade for one source of truth.
colors:
  background: "oklch(0.99 0.005 232)"
  foreground: "oklch(0.20 0.02 232)"
  card: "oklch(0.99 0.005 232)"
  card-foreground: "oklch(0.20 0.02 232)"
  primary: "oklch(0.34 0.13 245)"
  primary-foreground: "oklch(0.99 0.005 232)"
  muted: "oklch(0.96 0.008 232)"
  muted-foreground: "oklch(0.45 0.02 232)"
  destructive: "oklch(0.55 0.20 27)"
  border: "oklch(0.90 0.01 232)"
  ring: "oklch(0.34 0.13 245)"

typography:
  display:
    fontFamily: "ui-serif, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: "ui-serif, Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "ui-serif, Georgia, serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  md: "0.125rem"

spacing:
  md: "1rem"
  lg: "1.5rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
---

# Design System: Aurelius Institute

## 1. Overview

**Creative North Star: "The Working Paper"**

A small not-for-profit publishing peer-reviewed working papers on macroeconomics, climate finance, and labour-market structure. Audience reads on the institute's website and on academic-search aggregators (SSRN, RePEc). The design must read as trustworthy and reproducible — not as marketing.

Built on the Whitepaper theme (cool-slate hue 232, near-square radii, type-base 16.5px) with `--primary` overlaid as a deep institutional slate-navy. Long-form prose is serif; sans is reserved for chrome (chips, captions, dataset-version tags); mono surfaces only on DOIs, citation IDs, figure numbers, and ISO timestamps.

**Key Characteristics:**
- Cool-slate surface temperature (hue 232).
- Near-square radii (0.125rem) — printable, not playful.
- Serif-led hierarchy across display, heading, and body.
- Motion is near-zero — smooth-scroll on permalink hash-target only.

## 2. Colors

Cool-slate neutral palette with a single deep slate-navy primary. No second accent.

### Primary
- **Deep Institutional Slate-Navy** (`oklch(0.34 0.13 245)`): Hyperlinks, focus rings, section-rule, dropcap, callout border-left.

### Neutral
- **Cool Paper Background** (`oklch(0.99 0.005 232)`): Body and card surfaces.
- **Slate Foreground** (`oklch(0.20 0.02 232)`): Primary text.
- **Muted Surface** (`oklch(0.96 0.008 232)`): Callouts, ambient panels, table stripes.
- **Hairline Border** (`oklch(0.90 0.01 232)`): Structural seams, 1px.

### State
- **Revision Red** (`oklch(0.55 0.20 27)`): Revision-tracking chrome only — struck-out figures, retraction stamps.

**The One-Accent Rule.** `--primary` is the only structural accent. No second hue.

## 3. Typography

**Display + Body Font:** ui-serif (Georgia fallback)
**Label Font:** ui-sans-serif (chrome only)
**Mono Font:** ui-monospace (identifiers + computational appendices)

### Hierarchy
- **Display** (serif, 600, `clamp(2rem, 5vw, 3rem)`, leading 1.2): Paper titles.
- **Heading** (serif, 600, 1.75rem, leading 1.25): Section heads.
- **Body** (serif, 400, 16.5px, leading 1.65): Paragraph copy.
- **Label** (sans, 500, 0.8125rem): Chips, captions, dataset-version tags.
- **Mono** (mono, 400, 0.875rem): DOIs, citation IDs, figure numbers, ISO timestamps.

**The Serif-Body Rule.** Body prose is serif. Sans never carries paragraph text.

## 4. Elevation

Flat. Hairline borders and tonal layering on `--muted` carry every seam. Print-aware: shadows would not survive a PDF render.

**The No-Shadow Rule.** Surfaces are flat. Depth comes from `--border` hairlines and `--muted` tonal shift, never from box-shadow.

## 5. Components

### Buttons
- **Shape:** Near-square (`--radius-md`, ~0.125rem).
- **Primary:** Slate-navy background, paper-cool foreground, label typography, padding 0.5rem 1rem.
- **Focus:** `--ring` outline in slate-navy.

### Cards & Containers
- **Background:** `--card` (cool paper). **Border:** Hairline 1px. **Padding:** 1.5rem default; 1rem in compact (quarterly-review) mode.

### Citation chrome (signature)
- Dataset DOIs, citation IDs, figure numbers, ISO timestamps are always mono. Inline citation links carry slate-navy `--primary`; surrounding prose does not.

## 6. Do's and Don'ts

### Do:
- **Do** keep surfaces on the cool-slate hue (232) — the institutional register does not warm.
- **Do** carry body prose in serif; sans is chrome only.
- **Do** use mono for every identifier (DOI, citation ID, figure number, ISO timestamp).
- **Do** keep radii near-square (0.125rem). Printable beats playful.
- **Do** earn formality through type, hierarchy, and disclosure.

### Don't:
- **Don't** dress up as an academic paper — no two-column equations layout, no all-greyscale, no JSTOR-as-aesthetic. The genre-reflex check applies strictly.
- **Don't** introduce a second accent.
- **Don't** use marketing chrome — no "huge win" / "game-changer" copy, no decorative gradients, no hero composition.
- **Don't** add shadows for depth.
- **Don't** animate first paint. Smooth-scroll on permalink hash-target is the only sanctioned transition.

---

> **Captured:** 2026-05-20, migrated from the free-form fixture brand profile at `fixtures/aurelius/DESIGN.md` (Whitepaper theme + slate-navy `--primary` overlay).
