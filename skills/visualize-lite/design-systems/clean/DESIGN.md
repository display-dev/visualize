---
name: Clean
description: Monochrome dev-default — the universal fallback register. 0-chroma surfaces, type-led hierarchy, single brand-overlay accent.

# Colors carry the shadcn-semantic slug names visualize templates already
# read (`var(--card)`, `var(--card-foreground)`, `var(--chart-1)`...).
# OKLCH per the visualize palette convention; Stitch's linter validates
# hex sRGB only and will warn on these strings — accepted trade for one
# source of truth and wide-gamut fidelity. Values here are the light-mode
# normative source; dark-mode values live in the sidecar `tokens.css`.
canonical-canvas: light
selection:
  mood: [minimal, productivity, monochrome]
  tone: [calm, warm]
  formality: medium
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a calm, warm register with minimal, productivity, monochrome visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.1450 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.1450 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.1450 0 0)"
  primary: "oklch(0.2050 0 0)"
  primary-foreground: "oklch(0.9850 0 0)"
  secondary: "oklch(0.9700 0 0)"
  secondary-foreground: "oklch(0.2050 0 0)"
  muted: "oklch(0.9700 0 0)"
  muted-foreground: "oklch(0.5560 0 0)"
  accent: "oklch(0.9700 0 0)"
  accent-foreground: "oklch(0.2050 0 0)"
  destructive: "oklch(0.5770 0.2450 27.3250)"
  destructive-foreground: "oklch(1 0 0)"
  border: "oklch(0.9220 0 0)"
  input: "oklch(0.9220 0 0)"
  ring: "oklch(0.7080 0 0)"
  chart-1: "oklch(0.8100 0.1000 252)"
  chart-2: "oklch(0.6200 0.1900 260)"
  chart-3: "oklch(0.5500 0.2200 263)"
  chart-4: "oklch(0.4900 0.2200 264)"
  chart-5: "oklch(0.4200 0.1800 266)"
  sidebar: "oklch(0.9850 0 0)"
  sidebar-foreground: "oklch(0.1450 0 0)"
  sidebar-primary: "oklch(0.2050 0 0)"
  sidebar-primary-foreground: "oklch(0.9850 0 0)"
  sidebar-accent: "oklch(0.9700 0 0)"
  sidebar-accent-foreground: "oklch(0.2050 0 0)"
  sidebar-border: "oklch(0.9220 0 0)"
  sidebar-ring: "oklch(0.7080 0 0)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.1875rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "calc(0.625rem - 4px)"
  md: "calc(0.625rem - 2px)"
  lg: "0.625rem"
  xl: "calc(0.625rem + 4px)"

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

# Design System: Clean

## 1. Overview: The Restrained Default

**Creative North Star: "The Restrained Default"**

Clean is visualize's monochrome fallback — the universal register for any reader job that doesn't demand a stronger voice. The system reads as confident-but-unadorned, the dev-tool aesthetic that earns the floor without claiming the ceiling. Every surface is 0-chroma; every accent is structural; type carries hierarchy.

This is the system to reach for when the artifact should read as **the unbranded dev-default**: an internal tooling note, a quick status update, a generic plan or report where the topic is the voice and the design's job is to stay out of the way. Clean is also the byte-identical baseline against which every other visualize design system proves its tokens-only swap — change `--primary`, `--background`, `--foreground`, and a Clean artifact reads as a different system without any structural edit.

Clean explicitly rejects: chroma in surfaces, decorative dividers between sections, icon-per-heading, multi-hue chart palettes, and the gradient/glow/glassmorphism vocabulary that marks generic AI-tool output. The restraint is the identity.

**Key Characteristics:**
- 0-chroma surfaces across light and dark — pure neutrals, no warm or cool bias.
- Single brand-overlay anchor on `--primary` — 0-chroma by default; if the brand profile injects a hue, it lands on CTAs and focus rings only, never on surfaces.
- Type-led hierarchy via weight + size + leading.
- Comfortable density — the unmarked default that trusts the template-local layout to set the rhythm.
- Drop-in token-swap proof: change the tokens, the structure holds.

## 2. Colors: The Pure-Monochrome Palette

A two-step neutral palette: pure white background, near-black foreground, with a single dark-gray primary that doubles as the brand-overlay anchor. No second accent in the core system — the restraint is doctrinal.

### Primary
- **Near-Black Primary** (`oklch(0.2050 0 0)`): The one structural accent — primary CTAs, focus rings, the brand-overlay anchor. 0-chroma by default; brand profiles inject hue via overlay, never via surfaces.

### Neutral
- **Pure White Background** (`oklch(1 0 0)`): Body, card, and popover surfaces. The page reads as a clean canvas.
- **Near-Black Foreground** (`oklch(0.1450 0 0)`): Primary text. Slightly softer than pure black for confident-but-not-harsh reading on white.
- **Light Muted** (`oklch(0.9700 0 0)`): Secondary surfaces — chips, callouts, ambient panels.
- **Mid-Gray Muted Foreground** (`oklch(0.5560 0 0)`): Captions, supporting metadata, recessed text.
- **Hairline Border** (`oklch(0.9220 0 0)`): Structural seams — 1px, never decorative.
- **Focus Ring** (`oklch(0.7080 0 0)`): Default mid-gray for keyboard focus outlines.

### State
- **Destructive Red** (`oklch(0.5770 0.2450 27.3250)`): The one chroma-carrying token. Used exclusively for destructive actions (delete confirms, error states).

### Chart Palette
- **`--chart-1` through `--chart-5`** (oklch lightness 0.42→0.81, hue 252→266): A single-hue blue-violet progression, ordered for sparkline + stacked-area + categorical-bar use. Multi-hue belongs to IDE / Console; Clean's chart vocabulary stays single-hue.

### Named Rules

**The Zero-Chroma Surface Rule.** Every surface token (`--background`, `--card`, `--popover`, `--muted`, `--secondary`) carries 0 chroma. Tinted surfaces belong to Editorial / Paper-ink / Whitepaper / Blueprint registers — not Clean.

**The One-Accent Rule.** Clean uses a single structural primary. If a brand-overlay injects hue, it lands on `--primary` only — CTAs, focus rings, the occasional inline emphasis. Never as a surface wash, never as a second accent.

**The Token-Swap Proof Rule.** Clean is the byte-identical baseline against which other design systems prove the tokens-only swap. Variation lives in tokens; the template structure stays constant.

## 3. Typography: System-Default Voice

**Display Font:** system sans (`ui-sans-serif`, system stack)
**Body Font:** system sans (`ui-sans-serif`, system stack)
**Mono Font:** system mono (`ui-monospace`, system stack)

**Character:** Pure system fonts. Clean assumes nothing about the host environment and renders crisply on every OS — the dev-default register. `--font-display` resolves to `--font-sans`; brand profiles swap to a serif or display face by overriding the token without restructuring.

### Hierarchy

- **Display** (sans, weight 600, `clamp(2rem, 5vw, 3rem)`, leading 1.2): Hero titles, top-of-document headlines.
- **Heading** (sans, weight 600, 1.75rem, leading 1.2): Section headings (h2-equivalent).
- **Title** (sans, weight 500, 1.1875rem, leading 1.3): Sub-section heads (h3-equivalent).
- **Body** (sans, weight 400, 16px, leading 1.6): Paragraph copy.
- **Label** (sans, weight 500, 0.875rem): CTA labels, metadata, small structural copy.
- **Mono** (mono, weight 400, 0.875rem): Inline code, technical metadata, fenced blocks.

### Named Rules

**The Type-Led Hierarchy Rule.** Hierarchy is carried by weight + size + leading. No decorative color on headings, no icon-per-heading, no all-caps section labels. The typeface does the work.

**The 1.6 Leading Rule.** Body line-height is 1.6 — readable across screen sizes, calm across long-form artifacts.

## 4. Elevation

Flat by default. Clean ships the full shadcn shadow scale (`--shadow-2xs` through `--shadow-2xl`) for elevation when explicitly needed, but the resting state of every surface is shadow-free.

### Shadow Vocabulary

- **`--shadow-sm`** (`0 1px 3px 0 hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)`): Hairline lift for hover states on cards and interactive surfaces.
- **`--shadow-md`** (`0 1px 3px 0 hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)`): Default card elevation when explicitly lifted.
- **`--shadow-lg` / `--shadow-xl`**: Reserved for floating UI (dropdowns, popovers, modals).

### Named Rules

**The Flat-By-Default Rule.** Surfaces rest flat. Shadows respond to state — hover, deliberate elevation, floating UI. A non-interactive resting element uses a `--border` hairline, not a shadow.

## 5. Components

### Buttons

- **Shape:** Soft-rounded (`--radius-md`, ~6px). Not pill, not square — visualize's neutral middle.
- **Primary:** Near-black background, white text, weight 500, padding 0.5rem 1rem. Shifts to pure-black background on hover.
- **Secondary:** Light muted background, near-black text. Same shape, lower visual weight. No boxed tertiary exists in Clean.
- **Focus:** Default browser focus ring + `--ring` (mid-gray) outline. Visible keyboard focus is non-negotiable.

### Cards & Containers

- **Corner Style:** `--radius-lg` (~10px) at rest. Nested cards collapse to a flat hierarchy; no card-in-card decoration.
- **Background:** `--card` (pure white).
- **Border:** Hairline 1px in `--border` (light gray).
- **Shadow:** Flat at rest; `--shadow-sm` on hover for interactive cards.
- **Internal Padding:** 1.5rem default; tighter (1rem) for dense card grids.

### Inputs / Fields

- **Style:** `--radius-md` (~6px), hairline `--border`, transparent or `--background`.
- **Focus:** `--ring` border + soft outline glow at low alpha.

### Navigation

- **Style:** Body family, weight 500, label scale.
- **States:** Default `--foreground`; hover shifts to `--primary`. No underline at rest.

### Chart Palette

Five-stop blue-violet progression (`--chart-1` through `--chart-5`) is the unmarked default. Single-hue. Brand profiles override to a brand-specific palette without restructuring the chart-rendering component.

## 6. Do's and Don'ts

### Do:

- **Do** keep every surface 0-chroma. Tinted surfaces belong to other design systems — see The Zero-Chroma Surface Rule.
- **Do** carry hierarchy through weight + size + leading. Type does the work — see The Type-Led Hierarchy Rule.
- **Do** reserve `--primary` for structural accent (CTAs, focus rings, the brand-overlay anchor). Brand-injected hue lands here.
- **Do** keep surfaces flat at rest — shadows respond to state.
- **Do** trust the template-local layout to set density. Clean is the unmarked default.
- **Do** treat Clean as the byte-identical baseline against which other design systems prove the tokens-only swap.

### Don't:

- **Don't** introduce chroma into surfaces (`--background`, `--card`, `--muted`). 0-chroma is the identity.
- **Don't** add a second accent color in core templates. A brand profile may inject one; Clean itself ships none.
- **Don't** decorate section breaks with rules, icons, or color blocks. The structure carries itself.
- **Don't** swap the chart palette to multi-hue. Single-hue progression is the data-viz default; multi-hue belongs to IDE / Console.
- **Don't** add gradient washes, backdrop-filter glassmorphism, or decorative drop shadows. The "could be any AI output" fingerprints don't belong on Clean.
- **Don't** structure variation into Clean's templates. Variation lives in tokens — the structure stays constant.
