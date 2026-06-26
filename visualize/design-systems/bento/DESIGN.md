---
name: Bento
description: Modular card-grid register — cards are the spatial unit, not a decoration on top of one. Warm-neutral background, lifted card surfaces, generous radius, recessive borders.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention. Bento leans warm: hue
# ~70 across the neutral ramp (cream-tinted), with a warm coral primary
# at hue ~35 and a soft cool-teal accent that gives the card grid a
# two-tone rhythm without competing with the primary.
canonical-canvas: light
selection:
  mood: [playful, tactile, organic, industrial]
  tone: [calm, warm]
  formality: medium
  density: high
  canonical_canvas: light
  best_for: |
    Use for information-dense artifacts that need a calm, warm register with playful, tactile, organic, industrial visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

colors:
  background: "oklch(0.97 0.006 70)"
  foreground: "oklch(0.18 0.008 70)"
  card: "oklch(0.99 0.004 70)"
  card-foreground: "oklch(0.18 0.008 70)"
  popover: "oklch(0.99 0.004 70)"
  popover-foreground: "oklch(0.18 0.008 70)"
  primary: "oklch(0.65 0.15 35)"
  primary-foreground: "oklch(0.99 0 0)"
  secondary: "oklch(0.93 0.012 220)"
  secondary-foreground: "oklch(0.18 0.008 70)"
  muted: "oklch(0.94 0.006 70)"
  muted-foreground: "oklch(0.50 0.008 70)"
  accent: "oklch(0.88 0.030 200)"
  accent-foreground: "oklch(0.18 0.008 70)"
  destructive: "oklch(0.55 0.20 25)"
  destructive-foreground: "oklch(0.99 0 0)"
  border: "oklch(0.90 0.008 70)"
  input: "oklch(0.90 0.008 70)"
  ring: "oklch(0.65 0.15 35)"
  chart-1: "oklch(0.78 0.12 35)"
  chart-2: "oklch(0.70 0.13 60)"
  chart-3: "oklch(0.65 0.10 200)"
  chart-4: "oklch(0.60 0.12 230)"
  chart-5: "oklch(0.70 0.10 150)"
  sidebar: "oklch(0.94 0.006 70)"
  sidebar-foreground: "oklch(0.18 0.008 70)"
  sidebar-primary: "oklch(0.65 0.15 35)"
  sidebar-primary-foreground: "oklch(0.99 0 0)"
  sidebar-accent: "oklch(0.88 0.030 200)"
  sidebar-accent-foreground: "oklch(0.18 0.008 70)"
  sidebar-border: "oklch(0.90 0.008 70)"
  sidebar-ring: "oklch(0.65 0.15 35)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.25rem"
    fontWeight: 600
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
    letterSpacing: "0.005em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "1rem"
  xl: "1.5rem"

spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.125rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.125rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
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

# Design System: Bento

## 1. Overview: Cards as the Spatial Unit

**Creative North Star: "Modular Rhythm"**

Bento is visualize's card-grid register. Where Clean treats cards as containers for content, Bento treats cards as the spatial language itself — every section is a card, every card has its own visual weight, and the layout's job is to compose them like a Japanese lunchbox into a single legible composition. Card sizes vary deliberately; spacing between cards is the only horizontal rhythm; whitespace is dispensed *inside* cards, not between them.

Bento is the system to reach for when the artifact has parallel concerns of comparable importance — feature grids, product overviews, dashboard tiles, OKR summaries, comparison matrices. The card grid lets each concern hold its own without subordinating to the next; the warm-neutral palette keeps the composition reading as a single page rather than a wall of widgets.

Bento explicitly rejects: long uninterrupted prose blocks (use Editorial or Whitepaper instead), dense data tables (the card-per-row read becomes overwhelming above ~12 rows — use IDE or Console), and any layout where one section should clearly dominate (Bento's egalitarian card weight fights you).

**Key Characteristics:**
- Warm-neutral surface ramp (background → card → muted) at hue ~70 — cream-tinted, not cool grey.
- Cards lifted from background by a 0.02-lightness shift, not by shadows or hard borders. The eye reads the seam, not the box.
- Generous radius scale (`--radius-lg` at 1rem; `--radius-xl` at 1.5rem) — cards have soft corners, which is what makes the grid feel modular rather than gridded.
- Warm coral primary (`--primary`, hue 35) paired with a soft cool-teal accent (`--accent`, hue 200) — two-tone rhythm without competing voices.
- Type weights tighter than Clean (display 700 vs 600) — display headings need to anchor cards visually.

## 2. Colors: Warm Surfaces, Two-Tone Accent

A three-step warm-neutral surface ramp anchored on hue 70 (slight peach/cream), paired with a warm coral primary and a soft cool-teal accent. The cool-teal is deliberately *cool* to give the card grid a two-tone read — warm cards on warm background, cool highlight punctuating.

### Surface Ramp
- **Background** (`oklch(0.97 0.006 70)`): The page floor. Warm cream — distinguishable from cards in side-by-side comparison.
- **Card** (`oklch(0.99 0.004 70)`): The card surface. Near-white but still hue-70, so the warmth carries through.
- **Muted** (`oklch(0.94 0.006 70)`): Recessed card surfaces, sidebar bodies, ambient sections.

### Brand & Accent
- **Coral Primary** (`oklch(0.65 0.15 35)`): The warm voltage. CTAs, focus rings, primary-emphasis cards, anchor links.
- **Cool Teal Accent** (`oklch(0.88 0.030 200)`): The cool counterpoint. Inline highlights, badges, secondary-emphasis card tiles. Deliberately cool to give the warm grid breathing room.

### Foreground & Border
- **Warm Foreground** (`oklch(0.18 0.008 70)`): Primary text. Warm-shifted to match the cream surfaces — pure black would read cold against the warm cards.
- **Mid Warm-Grey Muted-Foreground** (`oklch(0.50 0.008 70)`): Captions, metadata.
- **Soft Warm Border** (`oklch(0.90 0.008 70)`): Card seams when borders are used (they're optional — the lightness shift between background and card often does the separation work alone).

### Chart Palette
Two warm tones (chart-1/2) + two cool (chart-3/4) + one green (chart-5). Reads as a two-tone progression rather than a single-hue ramp — fits Bento's two-tone identity. Distinct from Clean's single-hue blue-violet.

### Named Rules

**The Warm-Hue-70 Surface Rule.** Every surface in Bento sits on hue 70 (warm cream). Pure-neutral surfaces (hue 0, chroma 0) belong to Clean. Bento's identity is the warm chassis — even pure white would read out-of-register.

**The Two-Tone Accent Rule.** Bento ships a warm primary (hue 35) AND a cool accent (hue 200). Both are needed for the card-grid rhythm — a single-accent system reads flat as cards stack. Use accent for at-most one card per visible viewport.

**The Lightness-Shift Separation Rule.** Cards lift from background by lightness alone (0.97 → 0.99). Shadows and full-strength borders both fight Bento's modular calm. If a card needs more separation, scale spacing — never raise shadow weight.

## 3. Typography: Tight, Anchored, Modern

**Display Font:** system sans (`var(--font-sans)`, system stack)
**Body Font:** system sans (`var(--font-sans)`)
**Mono Font:** system mono (`var(--font-mono)`)

**Character:** Same system stack as Clean, but tighter weights and tracking. Cards are visual containers; the type inside has to anchor without sprawl. Display sits at weight 700 (vs Clean's 600) so card titles hold against the generous radius.

### Hierarchy

- **Display** (sans, weight 700, `clamp(2rem, 5vw, 3rem)`, leading 1.15, tracking −0.02em): Card grid hero titles.
- **Heading** (sans, weight 600, 1.875rem, leading 1.2, tracking −0.01em): Card titles in the dominant tile.
- **Title** (sans, weight 600, 1.25rem, leading 1.3): Card titles in supporting tiles.
- **Body** (sans, weight 400, 16px, leading 1.6): Card body copy.
- **Label** (sans, weight 500, 0.875rem, tracking +0.005em): Card labels, metadata, badges.
- **Mono** (mono, weight 400, 0.875rem): Inline code in tech cards.

### Named Rules

**The Card-Title-At-Heading-Or-Title Rule.** Card titles use `heading` for the dominant card on the page, `title` for everything else. Display is reserved for the top-of-document hero; never as a card-internal title.

**The Tight-Tracking Display Rule.** Display + Heading use negative tracking (−0.01em to −0.02em). Bento's display is anchored, not airy. Loosen tracking and the card-grid composition reads soft — which fights the modular identity.

## 4. Elevation

Flat at rest, lifted on hover only. Bento's card separation comes from the lightness shift between `--background` and `--card`, not from shadows. Shadows appear on `--shadow-sm` for interactive card hover state and on `--shadow-md` for floating UI; never as decoration.

### Named Rules

**The Lightness-Before-Shadow Rule.** When a card needs to stand out at rest, raise its background lightness (use `--card` over `--muted`), not shadow weight. Shadows are state-only.

## 5. Components

### Cards & Containers

- **Corner Style:** `--radius-lg` (1rem) at rest. Bento's signature — generous corners are part of the modular feel.
- **Background:** `--card` for the standard tile, `--muted` for recessed tiles, `--secondary` for highlighted tiles.
- **Border:** Optional hairline 1px in `--border`. The card-vs-background lightness shift often does the seam work alone.
- **Shadow:** Flat at rest; `--shadow-sm` on hover for interactive cards.
- **Internal Padding:** 1.5rem default; tighter (1rem) for dense card grids of 4+ tiles per row.

### Buttons

- **Shape:** `--radius-md` (0.625rem) — softer than Clean's middle but tighter than the card corner.
- **Primary:** Coral background, near-white text, weight 500. Wider padding (0.625rem 1.125rem) to match the card-grid rhythm.
- **Secondary:** Soft cool-teal-tinted background; same shape.

### Inputs / Fields

- **Style:** `--radius-md`, hairline `--border`, `--background` fill (not `--card` — inputs are recessed, not elevated).
- **Focus:** `--ring` (coral) outline.

### Navigation

- **Style:** Body family, weight 500, label scale.
- **States:** Default `--foreground`; hover shifts to `--primary` (coral). No underline at rest.

### Chart Palette

Two-tone progression (warm chart-1/2 + cool chart-3/4 + green chart-5). Use chart-1/2 for primary series, chart-3/4 for comparison or secondary, chart-5 for "good/positive" state.

## 6. Do's and Don'ts

### Do:

- **Do** treat the card as the spatial unit. Compose card sizes deliberately; let spacing between cards carry the rhythm.
- **Do** keep surfaces on hue 70 — cream-tinted warm neutrals. Pure white belongs to Clean.
- **Do** pair the warm coral primary with the cool teal accent, sparingly. Two-tone is Bento's identity.
- **Do** lift cards via lightness shift first, shadow second.
- **Do** use generous radius (`--radius-lg`, `--radius-xl`) on cards. Soft corners are part of the read.

### Don't:

- **Don't** use Bento for long uninterrupted prose — Editorial or Whitepaper handle that. Bento's card-per-section read fights long-form.
- **Don't** add a third accent. Two-tone is the rule; a third hue makes the card grid noisy.
- **Don't** use pure-neutral surfaces (hue 0, chroma 0). Pure white reads cold against Bento's warm cards.
- **Don't** stack heavy shadows on cards at rest. Bento separates with light, not depth.
- **Don't** use Display for card-internal titles. Display is hero-only; cards get Heading or Title.
