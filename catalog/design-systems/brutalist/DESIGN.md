---
name: Brutalist
description: Raw / high-contrast / grid-heavy / manifesto register. Light-canonical, pure white + near-pure black + cadmium-red shout. Hard borders, zero radius, tightest leading.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values here are the canonical Brutalist register; dark-mode is the
# inverted-binary register and lives in the sidecar `tokens.css`.
canonical-canvas: light
selection:
  mood: [high-contrast, industrial, spatial, monochrome]
  tone: [dramatic, bold, irreverent, experimental]
  formality: medium
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a dramatic, bold, irreverent, experimental register with high-contrast, industrial, spatial, monochrome visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.10 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.10 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.10 0 0)"
  primary: "oklch(0.55 0.22 25)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.95 0 0)"
  secondary-foreground: "oklch(0.10 0 0)"
  muted: "oklch(0.95 0 0)"
  muted-foreground: "oklch(0.40 0 0)"
  accent: "oklch(0.92 0 0)"
  accent-foreground: "oklch(0.10 0 0)"
  destructive: "oklch(0.45 0.22 25)"
  destructive-foreground: "oklch(1 0 0)"
  border: "oklch(0.10 0 0)"
  input: "oklch(0.10 0 0)"
  ring: "oklch(0.55 0.22 25)"
  chart-1: "oklch(0.55 0.22 25)"
  chart-2: "oklch(0.10 0 0)"
  chart-3: "oklch(0.45 0 0)"
  chart-4: "oklch(0.70 0 0)"
  chart-5: "oklch(0.35 0.10 25)"
  sidebar: "oklch(0.97 0 0)"
  sidebar-foreground: "oklch(0.10 0 0)"
  sidebar-primary: "oklch(0.55 0.22 25)"
  sidebar-primary-foreground: "oklch(1 0 0)"
  sidebar-accent: "oklch(0.92 0 0)"
  sidebar-accent-foreground: "oklch(0.10 0 0)"
  sidebar-border: "oklch(0.10 0 0)"
  sidebar-ring: "oklch(0.55 0.22 25)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.04em"
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
  lg: "1.5rem"
  xl: "2rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.875rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"
---

# Design System: Brutalist

## 1. Overview: The Manifesto Page

**Creative North Star: "The Manifesto Page"**

Brutalist is visualize's raw / high-contrast / grid-heavy / manifesto register — the aesthetic reference is late-2010s web brutalism on a confident day. Pure white background, near-pure-black foreground (oklch 0.10 — not the soft black of Clean's 0.145), a single cadmium-red `--primary` (hue 25, chroma 0.22 — exceeding the usual genre-reflex ceiling by design), hard borders carrying full-strength foreground, zero radius across the entire scale, the tightest leading in the catalogue (1.0 on display), and aggressive tracking (-0.02em) on the manifesto-headline stack.

This is the system for **opinionated reader-jobs** where the artifact has a point of view: manifesto-style One-pagers, raw-register Pitch decks (37signals-class brand fit), Comparison rolls with binary cell-states, grid-heavy Roadmap timelines, opinionated Release announcements. UPPERCASE display headings at 900 weight are the single load-bearing typographic move; reverting to sentence-case + 700 weight reads as "Clean with red trim," not manifesto.

Brutalist explicitly rejects: soft / pastel borders, rounded corners anywhere, gradient washes, multi-hue chart palettes, and conversational warmth in prose chrome. The hard-monochrome-plus-one-shout is the identity — anything that softens the contrast pulls the artifact out of register.

**Key Characteristics:**
- Pure-white background + near-pure-black foreground (oklch 0.10) — harder contrast than Clean (0.145) by design.
- Single cadmium-red `--primary` (hue 25, chroma 0.22) — the *single shout* of colour, deliberately exceeding the usual genre-reflex ceiling.
- Borders carry full-strength foreground (`--border` = `--foreground`) — hard-ruled blocks, not softened gray separators.
- Zero radius (`--radius: 0`) across the entire scale.
- Tightest leading in the catalogue: 1.0 on display, 1.5 on body. Aggressive tracking (-0.02em) on display.
- Hard-drop flat-offset shadows — zero-blur solid-color offsets evoking xerox-poster aesthetic. Cards sit *on* the page, not float above it.

## 2. Colors: The Black, White, and Shout

A binary palette: pure-white surface + near-pure-black foreground + a single cadmium-red shout. The chart palette stays monochrome with the red shout cameoing as chart-1.

### Primary
- **Cadmium Red** (`oklch(0.55 0.22 25)`): The single shout. Eyebrow chip on h1 + executive-summary, primary CTAs, inline emphasis, the rare red-pencil moment. Chroma 0.22 deliberately exceeds the usual genre-reflex cap — high chroma is the *point* of this register.

### Neutral
- **Pure White Background** (`oklch(1 0 0)`): Body surface. Not warm, not cream — pure white.
- **Near-Pure-Black Foreground** (`oklch(0.10 0 0)`): Primary text. Distinct from Clean's softer 0.145 — Brutalist is harder.
- **Pure Muted** (`oklch(0.95 0 0)`): Secondary surfaces, ambient panels.
- **Mid Gray Muted Foreground** (`oklch(0.40 0 0)`): Captions, supporting text.
- **Foreground Border** (`oklch(0.10 0 0)`): Borders share the foreground value — hard rules at full strength, not softened separators.

### State
- **Deeper Cadmium** (`oklch(0.45 0.22 25)`): Destructive actions. Same hue, deeper lightness — saturated enough that destructive feels load-bearing.

### Chart Palette (monochrome + the red shout)
- **`--chart-1` Cadmium Red** (`oklch(0.55 0.22 25)`, matches `--primary`), **`--chart-2` Black** (`oklch(0.10 0 0)`), **`--chart-3` Mid Gray** (`oklch(0.45 0 0)`), **`--chart-4` Light Gray** (`oklch(0.70 0 0)`), **`--chart-5` Dim Red** (`oklch(0.35 0.10 25)`): Monochrome chart palette with the red shout as chart-1. Categorical coding lives in weight + position, not hue.

### Named Rules

**The Single-Shout Rule.** Cadmium red is the only chroma in the system. `--chart-1` and the dim-red chart-5 are the same hue; every other surface and chart token stays 0-chroma. A second hue pulls Brutalist into "Clean with red trim" register — the manifesto identity dies.

**The Hard-Border Rule.** Borders share `--foreground` value (oklch 0.10). Softening borders to lighter gray reads as Clean; hard rules at full foreground strength are what makes the manifesto manifesto.

**The Genre-Reflex Opt-Out.** Brutalist's chroma-0.22 on `--primary` exceeds the usual ceiling by design. The opt-out is register-driven (high chroma IS the point), but template-by-template the genre-reflex guard still applies — *a Postmortem rendered on Brutalist must keep the calm retrospective register* (no full-bleed red escalate banner, no saturated red-fill destructive section).

## 3. Typography: UPPERCASE WEIGHT 900

**Display Font:** sans stack (Inter / Space Grotesk / IBM Plex Sans Condensed)
**Body Font:** same sans
**Mono Font:** mono stack (JetBrains Mono / Space Mono / ui-monospace)

**Character:** Sans everywhere. The manifesto identity comes from weight (900 on display, 800 on heading), tightest-in-catalogue leading (1.0 on display), aggressive tracking (-0.02em), and intentional UPPERCASE on display headings + section labels. Not from a face swap, not from a serif. Templates pair heavy weight with the cadmium-red eyebrow chip on opening sections.

### Hierarchy

- **Display** (sans, weight 900, `clamp(2.5rem, 6vw, 4rem)`, leading 1.0, tracking -0.02em): Hero manifesto titles. UPPERCASE is the convention here, not optional.
- **Heading** (sans, weight 800, 1.75rem, leading 1.05, tracking -0.02em): Section headings.
- **Title** (sans, weight 700, 1.125rem, leading 1.2, tracking -0.01em): Sub-section heads.
- **Body** (sans, weight 400, 16px, leading 1.5, tracking -0.02em): Paragraph copy. Tighter than Clean (-0.02em vs 0).
- **Label** (sans, weight 700, 0.8125rem, `letter-spacing: 0.04em`): UPPERCASE eyebrow / chip labels. Letter-spaced for the manifesto-chip feel.
- **Mono** (mono, weight 400, 0.875rem): Inline code.

### Named Rules

**The UPPERCASE-900-Rule.** Display headings render UPPERCASE at weight 900. Reverting to sentence-case or weight 700 reads as Clean with red trim — see Section 1. The manifesto-headline stack is identity-load-bearing.

**The Tightest-Leading Rule.** Display leading is 1.0. Tighter than Deck (1.05), tighter than every other system. Headlines stack as a wall of words.

## 4. Elevation

Hard-drop flat-offset shadows. Brutalist rejects soft blurred drop shadows — the shadow scale collapses to zero-blur solid-color offsets ("hard drop") evoking xerox-poster / risograph aesthetic. Cards sit *on* the page, not float above it.

### Shadow Vocabulary

- **`--shadow-sm`** (`0 2px 0 0 oklch(0.10 0 0)`): A 2px solid-black offset. The hairline manifesto card lift.
- **`--shadow-md`** (`0 6px 0 0 oklch(0.10 0 0)`), **`--shadow-lg`** (`0 8px 0 0`), **`--shadow-xl`** (`0 12px 0 0`), **`--shadow-2xl`** (`0 16px 0 0`): Stepped solid-color offsets.

### Named Rules

**The Hard-Drop Rule.** Shadows are zero-blur solid-color offsets. Soft blurred drop shadows belong to Clean / Editorial / Deck; Brutalist's shadows read as risograph / xerox poster, not as elevated chrome.

## 5. Components

### Buttons

- **Shape:** Square (`--radius: 0`). Brutalist has no rounded corners.
- **Primary:** Cadmium-red background, white text, weight 700 UPPERCASE label, padding 0.75rem 1.5rem. The CTA is the shout.
- **Hover:** Shifts to near-pure-black background.
- **Secondary:** White background, black text, full-foreground border. The ghost button with hard rules.
- **Focus:** Cadmium-red `--ring` outline.

### Cards & Containers

- **Corner Style:** Square (0). Cards rely on hard borders for separation.
- **Background:** `--card` (pure white, same as `--background`).
- **Border:** 1px or thicker in `--border` (= `--foreground`). Hard rules carry the structure.
- **Internal Padding:** 1.5rem default.
- **Hard-Drop Shadow:** Optional — `--shadow-sm` (2px solid-black offset) gives the manifesto-poster card lift.

### Inputs / Fields

- **Style:** Square (0 radius), 1px `--border` (full foreground), `--background`.
- **Focus:** Cadmium-red `--ring` border.

### Navigation

- **Style:** UPPERCASE sans label, weight 700, letter-spacing 0.04em.
- **States:** Default near-pure-black `--foreground`; hover shifts to cadmium-red `--primary`.

### Chart Palette + Inverted Panels

Monochrome + red-shout palette. Inverted panels ("EXECUTIVE SUMMARY") use foreground-fill background with primary-foreground text — the highest-contrast moment in any Brutalist artifact. Full-red-fill destructive alerts use `--destructive` as a fill, not a red-bordered card; the color does the work.

## 6. Do's and Don'ts

### Do:

- **Do** keep `--background` pure white and `--foreground` near-pure-black (oklch 0.10). The hard contrast is identity — harder than Clean's softer 0.145 by design.
- **Do** use UPPERCASE weight-900 display headings — see The UPPERCASE-900-Rule. Sentence-case + 700 weight reads as Clean with red trim.
- **Do** use the cadmium-red `--primary` as the single shout — eyebrow chip on h1 / executive-summary, primary CTAs, the one accent moment. The chroma-0.22 ceiling-bust is intentional.
- **Do** keep borders at full-foreground strength — hard ruled blocks, not soft separators.
- **Do** zero radius everywhere. Brutalist has no rounded corners.
- **Do** use hard-drop flat-offset shadows for card lift — see The Hard-Drop Rule.
- **Do** invert the executive-summary panel — foreground-fill background with primary-foreground text. Highest-contrast moment.

### Don't:

- **Don't** soften borders or use rounded corners. The hard rule + square edge IS the identity.
- **Don't** add gradient washes or backdrop-filter glassmorphism. Cadmium-red is the only chroma; everything else stays monochrome.
- **Don't** use multi-hue chart palettes. Monochrome plus the red-shout cameo as `--chart-1` is the move.
- **Don't** use soft blurred drop shadows. Hard-drop solid-color offsets only — see The Hard-Drop Rule.
- **Don't** soften the manifesto-headline stack to sentence-case + lighter weight. The UPPERCASE / 900 weight / tight leading is non-negotiable.
- **Don't** drop the genre-reflex guard for incident retrospectives. A Brutalist Postmortem keeps the calm register — no full-bleed red escalate banner.
- **Don't** pair Brutalist with conversational-warmth templates (Meeting notes, Onboarding module). The raw aesthetic undermines warm registers; reach for Editorial / Paper-ink instead.
