---
name: Helix
description: Open-source dev-tool brand on the IDE design system — keyword-blue overlay on code-shop chrome.

# Light-mode values are the normative source; dark-mode lives in the IDE
# design system's resolved tokens. Helix overlays --primary only; surfaces,
# radii, and the multi-hue chart palette stay IDE-resolved.
colors:
  background: "oklch(0.98 0.005 280)"
  foreground: "oklch(0.20 0.02 280)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.20 0.02 280)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.20 0.02 280)"
  primary: "oklch(0.48 0.18 230)"
  primary-foreground: "oklch(0.98 0.005 280)"
  secondary: "oklch(0.95 0.01 280)"
  secondary-foreground: "oklch(0.25 0.02 280)"
  muted: "oklch(0.95 0.01 280)"
  muted-foreground: "oklch(0.50 0.02 280)"
  accent: "oklch(0.95 0.01 280)"
  accent-foreground: "oklch(0.25 0.02 280)"
  destructive: "oklch(0.5770 0.2450 27.3250)"
  destructive-foreground: "oklch(1 0 0)"
  border: "oklch(0.90 0.01 280)"
  input: "oklch(0.90 0.01 280)"
  ring: "oklch(0.48 0.18 230)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(1.875rem, 4.5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 500
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.125rem"
  md: "0.1875rem"
  lg: "0.25rem"

spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.4375rem 0.875rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.4375rem 0.875rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1rem"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "0.375rem 0.625rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
---

# Design System: Helix

## 1. Overview: The Keyword-Blue Overlay

**Creative North Star: "Code-shop chrome, one keyword overlaid"**

Helix is an open-source dev-tool brand riding the IDE design system. The base register — slate-purple surfaces (hue 280–290), near-square radii, mono-heavy content density — comes from IDE; Helix overlays a vivid keyword-blue on `--primary` and lets every other token stay theme-resolved. CLI badges, doc anchors, focus rings, and primary CTAs carry the blue. Everything else is IDE.

The audience is staff and senior engineers who run the CLI before reading the docs. The brand surfaces match: code-first, prose-second, dense with technical identifiers. Helix explicitly rejects marketing-shaped prose chrome, bounce easing, scroll-driven reveals, and any aesthetic register that softens the manifesto voice declared in PRODUCT.md.

**Key Characteristics:**
- Single-overlay brand identity — only `--primary` shifts; IDE chrome stays intact.
- Mono-heavy content density — CLI commands, file paths, identifiers, version numbers all set in mono.
- Compact default density; long-form artifacts shift to comfortable.
- Near-square radii (`0.1875rem`) inherited from IDE; no soft-rounded surfaces.
- Multi-hue chart palette preserved — Helix's data viz is syntax-evocative on purpose.

## 2. Colors

A slate-purple base palette inherited from IDE, overlaid with a single vivid keyword-blue primary. No second accent.

### Primary
- **Keyword Blue** (`oklch(0.48 0.18 230)` light / `oklch(0.62 0.18 230)` dark): The one structural overlay — CLI badges, doc anchors, focus rings, primary CTA. Same hue family across modes, deepened for light-mode legibility.

### Neutral
- **Slate-Purple Background** (`oklch(0.98 0.005 280)`): Body surface — the IDE base with a tinted slate-purple cast.
- **Slate Foreground** (`oklch(0.20 0.02 280)`): Primary text.
- **Slate-Tinted Muted** (`oklch(0.95 0.01 280)`): Secondary surfaces, chips, ambient panels.
- **Hairline Border** (`oklch(0.90 0.01 280)`): Structural seams.

### State
- **Destructive Red** (`oklch(0.5770 0.2450 27.3250)`): `removed:` lines in diffs and CLI error chrome.

### Named Rules
**The Single-Overlay Rule.** Helix shifts `--primary` only. Surfaces, radii, chart palette — everything else stays IDE-resolved. The brand identity is the overlay, not a reskin.

**The Syntax-Evocative Chart Rule.** Multi-hue chart palette is preserved deliberately; data viz reads like syntax highlighting because the audience does too.

## 3. Typography

**Display Font:** system sans (IDE code-shop default, `ui-sans-serif`)
**Body Font:** system sans
**Mono Font:** system mono (`ui-monospace`) — used heavily for CLI examples, code blocks, file paths, identifiers, version numbers.

**Character:** Tight tracking on display (`-0.005em`). Type-base 15px matches IDE's density. Mono carries more weight than any narrative register because the content is dense with technical identifiers.

### Hierarchy
- **Display** (sans, weight 600, `clamp(1.875rem, 4.5vw, 2.75rem)`, leading 1.2, tracking -0.005em): Hero titles, manifesto headlines.
- **Heading** (sans, weight 600, 1.625rem, leading 1.2): Section headings.
- **Title** (sans, weight 500, 1.125rem, leading 1.3): Sub-section heads.
- **Body** (sans, weight 400, 15px, leading 1.55): Paragraph copy at IDE density.
- **Label** (sans, weight 500, 0.8125rem): CTA labels, metadata.
- **Mono** (mono, weight 400, 0.875rem): The workhorse — CLI, code, paths, identifiers.

### Named Rules
**The Sentence-Case Chrome Rule.** Headings are sentence-case regardless of voice register. The voice-level `slop/uppercase-body` whitelist (PRODUCT.md) covers short manifestos and "What we cut" lists in body copy only — it does not extend to display chrome.

## 4. Elevation

Flat by default. IDE's compact register relies on hairline borders and tonal layering, not shadows. Focus rings and state transitions are the only motion vocabulary; no bounce easing, no scroll-driven reveals.

### Named Rules
**The Low-Motion Rule.** State transitions and focus rings only. The audience scans rather than browses — motion would slow them.

## 5. Components

### Buttons
- **Shape:** Near-square (`--radius-md`, 0.1875rem) inherited from IDE.
- **Primary:** Keyword-blue background, light foreground text, weight 500, padding 0.4375rem 0.875rem.
- **Secondary:** Slate-tinted muted background, slate foreground.
- **Focus:** Keyword-blue ring on `--ring`. Visible keyboard focus is non-negotiable.

### Cards & Containers
- **Corner Style:** `--radius-md` (0.1875rem) — IDE's near-square geometry.
- **Background:** White card on slate-purple body.
- **Border:** Hairline 1px in `--border` (slate-tinted).
- **Internal Padding:** 1rem default — tighter than narrative registers, matching IDE density.

### Inputs / Fields
- **Style:** `--radius-sm` (0.125rem), hairline border, transparent background.
- **Focus:** Keyword-blue ring.

### Navigation
- **Style:** Sans, weight 500, label scale. Wordmark `helix` set lowercase on the website nav.
- **States:** Default foreground; hover shifts to keyword-blue.

### Logo
Wordmark `helix` (lowercase, sans display family) + monogram `⌬` (double-helix unicode glyph). Wordmark on website nav and CLI `--version` output; monogram on favicons and artifact-footer corner marks.

## 6. Do's and Don'ts

### Do:
- **Do** keep `--primary` as the only overlay — surfaces, radii, chart palette stay IDE-resolved.
- **Do** lean on mono for CLI commands, file paths, identifiers, version numbers. Mono is content, not decoration.
- **Do** preserve the multi-hue chart palette — data viz is syntax-evocative.
- **Do** keep headings sentence-case across every artifact.
- **Do** match IDE's compact density on technical artifacts; shift to comfortable on long-form manifestos and Whitepapers.

### Don't:
- **Don't** tint surfaces, swap radii, or reskin chrome — Helix is a single-overlay brand on IDE, not a separate design system.
- **Don't** introduce a second accent. Keyword-blue carries the brand alone.
- **Don't** add bounce easing or scroll-driven reveals. Motion is low by doctrine.
- **Don't** ship marketing-shaped prose ("trusted by", "loved by", "join thousands"). The voice register declared in PRODUCT.md governs chrome copy too.
- **Don't** extend `slop/uppercase-body` to headings or nav. The whitelist is body-copy only.

<!--
Captured: migrated from the legacy free-form fixture. Per the reference
design-system dispatch: `format_default: code-shop` + `voice: raw` → IDE,
vs. Terminal for single-pane-CRT voice. Light-mode token values are the
normative source; dark-mode lives in IDE's resolved tokens.
-->
