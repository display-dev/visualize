---
name: Deck
description: Presentation-marketing register — sans display, projection-tuned, warm-amber accent. Built for viewing from 5–15 feet, not laptop reading distance.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values only; dark-mode lives in the sidecar `tokens.css`.
canonical-canvas: light
selection:
  mood: [organic]
  tone: [calm, warm]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a calm, warm register with organic visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

colors:
  background: "oklch(0.99 0.005 65)"
  foreground: "oklch(0.13 0.012 50)"
  card: "oklch(0.985 0.006 65)"
  card-foreground: "oklch(0.13 0.012 50)"
  popover: "oklch(0.985 0.006 65)"
  popover-foreground: "oklch(0.13 0.012 50)"
  primary: "oklch(0.55 0.17 60)"
  primary-foreground: "oklch(0.99 0.005 65)"
  secondary: "oklch(0.95 0.008 65)"
  secondary-foreground: "oklch(0.13 0.012 50)"
  muted: "oklch(0.95 0.008 65)"
  muted-foreground: "oklch(0.42 0.014 55)"
  accent: "oklch(0.93 0.012 60)"
  accent-foreground: "oklch(0.13 0.012 50)"
  destructive: "oklch(0.55 0.22 25)"
  destructive-foreground: "oklch(0.99 0.005 65)"
  border: "oklch(0.88 0.012 65)"
  input: "oklch(0.88 0.012 65)"
  ring: "oklch(0.55 0.17 60)"
  chart-1: "oklch(0.55 0.17 60)"
  chart-2: "oklch(0.42 0.12 235)"
  chart-3: "oklch(0.50 0.18 25)"
  chart-4: "oklch(0.45 0.10 145)"
  chart-5: "oklch(0.45 0.14 295)"
  sidebar: "oklch(0.96 0.008 65)"
  sidebar-foreground: "oklch(0.13 0.012 50)"
  sidebar-primary: "oklch(0.55 0.17 60)"
  sidebar-primary-foreground: "oklch(0.99 0.005 65)"
  sidebar-accent: "oklch(0.93 0.012 60)"
  sidebar-accent-foreground: "oklch(0.13 0.012 50)"
  sidebar-border: "oklch(0.88 0.012 65)"
  sidebar-ring: "oklch(0.55 0.17 60)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
  display-sm:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
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
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "-0.005em"
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
    padding: "0.625rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "2rem"
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

# Design System: Deck

## 1. Overview: The Pitch from Fifteen Feet

**Creative North Star: "Built to Project"**

Deck is visualize's presentation-marketing register — designed for the artifact that's meant to be **seen from 5–15 feet**, not read from a laptop at desk distance. The aesthetic reference is Pitch.com / modern Keynote / Notion-deck on a confident day. Largest type-scale floor in the catalogue (display clamps up to 4.5rem), tightest leading (1.05 on display), and a warm-amber primary that reads "this is a pitch" rather than "this is documentation."

This is the system for **persuasive-marketing reader-jobs**: Pitch decks, Slide decks, One-pagers, Case studies presented (rather than read), Comparison rolls. Stat-bleed full-bleed numerics land naturally — the traction slide and the hero outcome both pull this primitive against Deck.

Deck explicitly rejects: dense prose paragraphs (Whitepaper / Research brief register), small body type, footnote-strip density, and mid-tone surfaces. Projection contrast is the identity — the warm-near-white / warm-near-coal delta is bigger than the other systems, tuned for visibility under a projector or on a screen at meeting distance.

**Key Characteristics:**
- Warm-near-white background (oklch 0.99 / 0.005 / 65) + deep-coal foreground (oklch 0.13) — projection-tuned high contrast.
- Warm-amber `--primary` (oklch 0.55 / 0.17 / 60) on hero CTAs, stat-bleed values, and the persuasive accent moment. Distinct hue from Editorial's navy (245) and Terminal's CRT-green (145).
- Sans `--font-display` (Inter / Geist family) — heaviness from weight + size, not from face swap.
- Largest display floor in the catalogue: `clamp(2.5rem, 6vw, 4.5rem)`.
- Tightest leading (1.05) on display headlines — slide titles read as a single block.

## 2. Colors: The Warm-Amber Voice

A two-chord palette: warm-near-white / warm-near-coal neutrals (low chroma, hue 50–65) carrying a deep warm-amber accent, plus a five-stop chart palette that leads with amber + reaches across complementary hues for category coding.

### Primary
- **Warm Amber** (`oklch(0.55 0.17 60)`): The persuasive-presentation accent. Hero CTAs, stat-bleed numeric values, the rare emphasis moment. Distinct hue family from Editorial's navy and Terminal's green — reads "marketing pitch" rather than "publishing" or "developer tool."

### Neutral
- **Warm Near-White Background** (`oklch(0.99 0.005 65)`): Body surface. Slightly warmer than pure white — keeps the warmth that makes the amber accent feel intentional.
- **Deep-Coal-Warmth Foreground** (`oklch(0.13 0.012 50)`): Primary text. Carries a hint of warmth so it doesn't read as cold-black on warm-white.
- **Muted Cream** (`oklch(0.95 0.008 65)`): Secondary surfaces, callout panels.
- **Mid Warm Muted Foreground** (`oklch(0.42 0.014 55)`): Captions, recessed text.
- **Hairline Warm Border** (`oklch(0.88 0.012 65)`): Structural seams.

### State
- **Deck Red** (`oklch(0.55 0.22 25)`): Destructive actions. Saturated enough to register at projection distance.

### Chart Palette
- **`--chart-1` Amber** (`oklch(0.55 0.17 60)`, matches `--primary`), **`--chart-2` Deep Teal** (`oklch(0.42 0.12 235)`), **`--chart-3` Warm Red** (`oklch(0.50 0.18 25)`), **`--chart-4` Muted Green** (`oklch(0.45 0.10 145)`), **`--chart-5` Dim Violet** (`oklch(0.45 0.14 295)`): Warm-bias five-stop — amber leads, complementary hues fill out the category-coding range.

### Named Rules

**The Projection-Contrast Rule.** Background-to-foreground delta is bigger here than in the other design systems — tuned for visibility from 5–15 feet, not for screen-reading comfort. Don't soften the contrast with mid-tone backgrounds or low-contrast pairings; they wash out under a projector.

**The Amber-Leads Rule.** Warm amber is the persuasive voice. Hero CTAs, stat-bleed values, and the one accent moment per slide. Distinct hue from every other system; reaching for navy or green pulls the artifact toward Editorial / Terminal register.

## 3. Typography: Built to Project

**Display Font:** sans stack (Inter / Geist / system sans)
**Body Font:** same sans stack
**Mono Font:** mono stack (JetBrains Mono / Fira Code / ui-monospace)

**Character:** Sans display, sans body. Heaviness from weight + size rather than face swap — the display weight runs 700 against body's 400 for a strong projection hierarchy. The display face also tightens leading aggressively (1.05) so slide titles read as a single block from across the room.

### Hierarchy

- **Display** (sans, weight 700, `clamp(2.5rem, 6vw, 4.5rem)`, leading 1.05): Hero slide titles. The biggest floor in the catalogue.
- **Display-sm** (sans, weight 700, `clamp(1.875rem, 4vw, 2.75rem)`, leading 1.1): Subordinate hero scale for two-deck cascades.
- **Heading** (sans, weight 600, 1.625rem, leading 1.2): Slide section headings.
- **Title** (sans, weight 500, 1.125rem, leading 1.3): Sub-titles.
- **Body** (sans, weight 400, 16px, leading 1.45): Slide body copy. Tighter than Editorial — slides aren't read-throughs.
- **Label** (sans, weight 600, 0.875rem, `letter-spacing: -0.005em`): CTA labels, slightly tight tracking for confident UI.
- **Mono** (mono, weight 400, 0.875rem): Code snippets and metadata.

### Named Rules

**The 4.5rem-Display-Ceiling Rule.** Hero slide titles clamp up to 4.5rem. Smaller (Editorial-class 3.25rem) reads as "presentation that wants to be a report"; smaller still reads as documentation. The big floor is the identity.

**The Tight-Leading Rule.** Display lines wrap at 1.05 leading — slide titles want to read as one block from across the room, not as a paragraph of headline.

## 4. Elevation

Presentation-flat. Deck uses warm-tinted shadows (hue 40) for explicit elevation moments (lifted cards, hero CTAs), but the resting state of every surface is shadow-free. Avoid mid-shadow drop-shadows that read as 2014-era Material — Deck reaches for warm subtle elevation when it reaches at all.

### Shadow Vocabulary

- **`--shadow-sm`** (warm-tinted, low alpha): Hairline lift for hover states.
- **`--shadow-md`** / **`--shadow-lg`**: Stat-bleed card elevation, modals, dropdowns.
- **`--shadow-xl`** / **`--shadow-2xl`**: Reserved for the deliberate "lifted hero card" moment on a pitch slide.

### Named Rules

**The Warm-Tinted-Shadow Rule.** When elevation appears, shadows carry the warm hue (hue 40, low chroma). Neutral-gray drop shadows read as 2014 Material; warm-tinted reads as considered.

## 5. Components

### Buttons

- **Shape:** `--radius-md` (~8px). Generous-modern, presentation-friendly.
- **Primary:** Warm-amber background, near-white text, weight 600 label, padding 0.625rem 1.25rem.
- **Hover:** Shifts to deep-coal background.
- **Secondary:** Muted-cream background, deep-coal text.
- **Focus:** Amber `--ring` outline.

### Cards & Containers

- **Corner Style:** `--radius-lg` (~10px). Slightly more generous than buttons.
- **Background:** `--card` (slightly deeper than `--background`).
- **Border:** Hairline 1px in `--border` — visible but restrained.
- **Internal Padding:** 2rem default — generous, slide-shape padding. Stat-bleed cards may run wider.

### Inputs / Fields

- **Style:** `--radius-md` (~8px), hairline `--border`, transparent.
- **Focus:** Amber `--ring` border + low-alpha amber outline glow.

### Navigation

- **Style:** Sans label, weight 600, slightly tight tracking.
- **States:** Default `--foreground`; hover shifts to warm-amber `--primary`.

### Chart Palette + Stat-Bleed

Amber-leading five-stop palette. Stat-bleed (the full-bleed numeric primitive — hero outcome on Case study, traction stat on Pitch deck) pairs the largest display scale with the amber primary; this is Deck's signature composition. Cards aren't required for stat-bleeds — the numeric stands alone against the warm-near-white surface.

## 6. Do's and Don'ts

### Do:

- **Do** trust the projection-tuned contrast. Background-to-foreground delta is bigger than the other design systems on purpose — see The Projection-Contrast Rule.
- **Do** reach for `--text-display`'s 4.5rem clamp on hero slide titles. Big-and-confident is the identity.
- **Do** use warm-amber `--primary` on hero CTAs, stat-bleed numerics, and the one persuasive accent. Restraint reads as confident — see The Amber-Leads Rule.
- **Do** keep leading tight on display (1.05). Slide titles want to read as one block.
- **Do** treat stat-bleed as a first-class primitive — full-bleed numeric, no card wrapper required.
- **Do** keep surfaces flat at rest; warm-tinted shadows respond to state — see The Warm-Tinted-Shadow Rule.

### Don't:

- **Don't** drop dense prose paragraphs or narrow reading measure into Deck templates. Whitepaper / Research brief / Postmortem long-form jobs read off-register here.
- **Don't** use small body type or footnote-strip density. Slide-shape artifacts don't carry footnote density.
- **Don't** use mid-tone backgrounds or low-contrast pairings — projection contrast is identity-load-bearing.
- **Don't** reach for navy or CRT-green as accent. Those are Editorial / Terminal hue families; using them pulls Deck out of register.
- **Don't** use neutral-gray drop shadows. Warm-tinted only — see The Warm-Tinted-Shadow Rule.
- **Don't** use gradient text on hero slide titles. Banned across the design system.
- **Don't** stack identical-card feature grids. Deck's compositions favor stat-bleed + hero + one-or-two-card moments, not endless grids.
