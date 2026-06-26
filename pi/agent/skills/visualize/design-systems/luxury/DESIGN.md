---
name: Luxury
description: Dark-canonical premium register. Near-black canvas, champagne-gold primary, high-contrast serif display, refined sans body, generous whitespace and tracking. Investor decks, awards announcements, premium product pages, annual reports.

# Surfaces carry a hair of warm chroma (hue 80) — the eye reads
# "deep coffee" rather than "pure black", which separates Luxury
# from Brutalist's pure-black register. Gold primary at hue 90 is
# the canonical champagne register; serif display + sans body
# carries the editorial-luxury voice.
canonical-canvas: dark
selection:
  mood: [editorial, high-contrast, brand-system, luxury]
  tone: [dramatic, bold]
  formality: medium
  density: low
  canonical_canvas: dark
  best_for: |
    Use for high-impact, low-copy artifacts that need a dramatic, bold register with editorial, high-contrast, brand-system, luxury visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

colors:
  background: "oklch(0.98 0.005 80)"
  foreground: "oklch(0.18 0.012 90)"
  card: "oklch(0.995 0.003 80)"
  card-foreground: "oklch(0.18 0.012 90)"
  popover: "oklch(0.995 0.003 80)"
  popover-foreground: "oklch(0.18 0.012 90)"
  primary: "oklch(0.55 0.13 85)"
  primary-foreground: "oklch(0.98 0.005 80)"
  secondary: "oklch(0.94 0.008 80)"
  secondary-foreground: "oklch(0.18 0.012 90)"
  muted: "oklch(0.94 0.008 80)"
  muted-foreground: "oklch(0.45 0.012 90)"
  accent: "oklch(0.65 0.10 85)"
  accent-foreground: "oklch(0.98 0.005 80)"
  destructive: "oklch(0.50 0.20 25)"
  destructive-foreground: "oklch(0.98 0.005 80)"
  border: "oklch(0.82 0.012 80)"
  input: "oklch(0.82 0.012 80)"
  ring: "oklch(0.55 0.13 85)"
  chart-1: "oklch(0.55 0.13 85)"
  chart-2: "oklch(0.65 0.10 85)"
  chart-3: "oklch(0.40 0.08 250)"
  chart-4: "oklch(0.55 0.10 30)"
  chart-5: "oklch(0.50 0.06 200)"
  sidebar: "oklch(0.96 0.006 80)"
  sidebar-foreground: "oklch(0.18 0.012 90)"
  sidebar-primary: "oklch(0.55 0.13 85)"
  sidebar-primary-foreground: "oklch(0.98 0.005 80)"
  sidebar-accent: "oklch(0.65 0.10 85)"
  sidebar-accent-foreground: "oklch(0.98 0.005 80)"
  sidebar-border: "oklch(0.82 0.012 80)"
  sidebar-ring: "oklch(0.55 0.13 85)"

typography:
  display:
    fontFamily: "'Tiempos Headline', 'Source Serif Pro', 'Charter', Georgia, serif"
    fontSize: "clamp(2.75rem, 6.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "'Tiempos Headline', 'Source Serif Pro', Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Tiempos Headline', 'Source Serif Pro', Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.14em"
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

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "2rem"
  input-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"

spacing:
  xs: "0.5rem"
  sm: "0.875rem"
  md: "1.5rem"
  lg: "2.5rem"
  xl: "4rem"
---

# Design System: Luxury

## 1. Overview: Restrained Premium

**Creative North Star: "Confidence Through Restraint"**

Luxury is visualize's premium register — the design language of an investor deck cover, an annual-report opening, a Patek Philippe announcement page. Restraint is the defining move: a single chromatic accent (champagne gold), high-contrast display serif, generous whitespace + tracking, and a surface palette that whispers warmth rather than shouting colour. Dark-canonical (premium aesthetics lean dark); the light variant is "after the gallery closes" — same warmth, inverted.

Use Luxury for board-deck cover slides, fund announcements, awards-ceremony pages, premium-product launches, annual reports that want to feel like a museum publication. Not for everyday SaaS marketing (too restrained — Bento or Clean fit better), not for technical content (the serif display fights documentation register), not for high-density data (the generous spacing wastes screen real estate).

**Key Characteristics:**
- Surface hue 80 (warm-neutral) at very low chroma — reads as "deep coffee" or "champagne cream" rather than pure black/white.
- Single champagne-gold accent at hue 85 (chroma 0.13 light, 0.16 dark). No second chromatic; the restraint is doctrinal.
- High-contrast display serif (Tiempos Headline / Source Serif Pro / Georgia fallback) at weight 400 — confident-but-not-blocky. The weight choice differentiates Luxury (400, refined) from Riso (700, chunky) and Editorial (400 standard).
- Label tracking generous (`+0.14em`) and uppercased — the "engraved" feel of museum signage.
- Tight radius scale (0.125rem to 0.5rem) — Luxury's edges are sharp; soft corners are casual.
- Generous spacing (`--space-xl` = 4rem) — luxury communicates through what *isn't* on the page.

## 2. Colors: Warm-Neutral + Champagne Gold

A two-tier surface ramp (background → card) at hue 80 with sub-perceptible chroma. The gold accent does ALL of the colour work; even the chart palette is gold-progression with one cool stop for differentiation.

### Surfaces
- **Background** (`oklch(0.18 0.012 90)` dark / `oklch(0.98 0.005 80)` light): The canvas. Warm-neutral; pure black/white would read corporate, not premium.
- **Card** (`oklch(0.22 0.014 90)` dark / `oklch(0.995 0.003 80)` light): Slight lift from background — the seam reads "framed", not "elevated".

### Accent
- **Champagne Gold** (`oklch(0.82 0.16 85)` dark / `oklch(0.55 0.13 85)` light): The single voltage. Headlines' accent words, CTA fills, focus rings, divider rules.

### Named Rules

**The One-Accent Rule.** Luxury ships a single chromatic. A second colour belongs to other registers — Bento's two-tone, Brutalist's cadmium-shout, Editorial's navy. Luxury's restraint asks the gold to carry every chromatic moment.

**The Generous-Tracking Rule.** Labels run `+0.14em` letter-spacing, uppercased. The wide tracking is the "engraved" feel — Patek Philippe ad layouts, museum exhibit text. Tight tracking reads modern-tech; Luxury wants timeless.

**The Sharp-Edge Rule.** Radius caps at 0.5rem. Soft corners read casual; Luxury's edges are deliberate.

## 3. Typography: Display Serif + Sans Body

**Display Font:** Tiempos Headline / Source Serif Pro / Charter / Georgia fallback (high-contrast serif)
**Body Font:** system sans
**Mono Font:** system mono

Display + heading + title run a high-contrast display serif at weight 400 (heading) or 500 (title). Body is sans for long-form readability — Luxury isn't an essay register, but the body text should never fight reading. Label is wide-tracked uppercased sans, "engraved" feel.

## 4. Elevation

Flat at rest. No shadows on cards. Elevation comes from generous spacing and the gold-rule divider, never from depth. The premium register asks the eye to slow down; shadow effects rush it.

## 5. Components

### Buttons
- **Primary:** Gold fill, dark-canvas text, generous padding, label-style tracking + uppercase.
- **Outline:** Transparent fill, 1px gold border, gold text. Same shape.

### Cards
- **Background:** `--card` (slight lift from canvas).
- **Border:** Hairline `--border` (warm-neutral).
- **Shadow:** None. Generous internal padding (1.5rem default; 2.5rem for hero cards).

### Dividers
- 1px gold horizontal rule, used sparingly between major sections. The rule IS the design element.

## 6. Do's and Don'ts

### Do:
- **Do** use one accent (champagne gold). Restraint is the identity.
- **Do** keep tracking generous on labels (+0.14em uppercased). The "engraved" feel matters.
- **Do** use display serif on display + heading + title. Sans body for readability.
- **Do** let whitespace carry the page. Luxury communicates through what isn't there.

### Don't:
- **Don't** use Luxury for casual SaaS marketing. Bento or Clean fit better.
- **Don't** add a second chromatic accent. The restraint is doctrinal.
- **Don't** soften the corners beyond 0.5rem. Sharp edges are part of the register.
- **Don't** add depth shadows. Premium = restrained, not lifted.
