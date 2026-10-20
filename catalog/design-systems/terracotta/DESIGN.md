---
name: Terracotta
description: Warm earthy register — sand chassis (hue 60), terracotta red-clay primary (hue 25), sage accent (hue 110), humanist serif display + warm sans body. Editorial flow, slow-pace voice. Distinct from Bento's coral / cool-teal modern grid.

# Terracotta is the warmest register in the catalogue — warmer hue
# (60 vs Paper-ink's 80, Bento's 70), deeper primary chroma, and an
# olive-sage accent that grounds the warmth in something growing.
# OKLCH; light-canonical; dark mode is designed (not synthesised) as
# warm-firelit-room with the same warm bias.
canonical-canvas: light
selection:
  mood: [editorial, high-contrast, playful, tactile]
  tone: [friendly, optimistic, authoritative, serious]
  formality: low
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a friendly, optimistic, authoritative, serious register with editorial, high-contrast, playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

colors:
  background: "oklch(0.94 0.014 60)"
  foreground: "oklch(0.22 0.020 40)"
  card: "oklch(0.96 0.012 60)"
  card-foreground: "oklch(0.22 0.020 40)"
  popover: "oklch(0.96 0.012 60)"
  popover-foreground: "oklch(0.22 0.020 40)"
  primary: "oklch(0.55 0.18 30)"
  primary-foreground: "oklch(0.96 0.012 60)"
  secondary: "oklch(0.88 0.024 60)"
  secondary-foreground: "oklch(0.22 0.020 40)"
  muted: "oklch(0.91 0.014 60)"
  muted-foreground: "oklch(0.46 0.018 40)"
  accent: "oklch(0.58 0.10 110)"
  accent-foreground: "oklch(0.96 0.012 60)"
  destructive: "oklch(0.50 0.20 25)"
  destructive-foreground: "oklch(0.96 0.012 60)"
  border: "oklch(0.84 0.018 60)"
  input: "oklch(0.84 0.018 60)"
  ring: "oklch(0.55 0.18 30)"
  chart-1: "oklch(0.55 0.18 30)"
  chart-2: "oklch(0.62 0.14 50)"
  chart-3: "oklch(0.58 0.10 110)"
  chart-4: "oklch(0.50 0.12 90)"
  chart-5: "oklch(0.65 0.10 70)"
  sidebar: "oklch(0.91 0.014 60)"
  sidebar-foreground: "oklch(0.22 0.020 40)"
  sidebar-primary: "oklch(0.55 0.18 30)"
  sidebar-primary-foreground: "oklch(0.96 0.012 60)"
  sidebar-accent: "oklch(0.88 0.024 60)"
  sidebar-accent-foreground: "oklch(0.22 0.020 40)"
  sidebar-border: "oklch(0.84 0.018 60)"
  sidebar-ring: "oklch(0.55 0.18 30)"

typography:
  display:
    fontFamily: "'Source Serif Pro', 'Charter', Georgia, serif"
    fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  heading:
    fontFamily: "'Source Serif Pro', 'Charter', Georgia, serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.005em"
  title:
    fontFamily: "'Source Serif Pro', 'Charter', Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.1875rem"
  md: "0.3125rem"
  lg: "0.5rem"
  xl: "0.75rem"

spacing:
  xs: "0.375rem"
  sm: "0.625rem"
  md: "1.125rem"
  lg: "1.75rem"
  xl: "2.75rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
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

# Design System: Terracotta

## 1. Overview: Warm Earth, Slow Pace

**Creative North Star: "Grounded Warmth"**

Terracotta is visualize's warmest editorial register — a sand-and-clay chassis paired with a humanist serif display and a sage-green accent that grounds the warmth in something growing. Where Paper-ink leans cool-cream (parchment) and Bento leans neutral-warm (modular grid), Terracotta leans **hot earth** — the colour of fired clay, the typography of slow long-form, the layout of a long-read essay rather than a dashboard.

Terracotta is the system to reach for when the artifact's voice is grounded, slow-paced, organic, or values-led: sustainability reports, slow-blog manifestos, food-and-craft writing, agency portfolios that want to feel artisanal, retrospectives that emphasize reflection over speed. The system suits content where the reader *wants* to slow down — the warm chassis and serif display do half that work; the body type sets a long-form rhythm.

Terracotta explicitly rejects: tech-document register (the warm-earthy chassis fights "console" / "terminal" content), high-energy product launches (Bento or Neon suit those better), and dashboard / data-table density (the slow-pace identity collapses under information density).

**Key Characteristics:**
- Hue-60 sand chassis (warmer than Bento's hue-70, warmer than Paper-ink's hue-80). The eye reads "warm earth" rather than "cream".
- Terracotta primary at hue 25 (red-clay) — distinct from Brutalist's cadmium-red (hue 25, chroma 0.22, *unrestrained*) and Bento's coral (hue 35, chroma 0.15, *warm-modern*). Terracotta's primary at hue 25 chroma 0.18 is *fired clay*: warm-red but earthy, not loud.
- Sage accent at hue 110 (olive-green). The growing-thing counterpart to the fired-clay primary.
- Humanist serif display (Source Serif Pro / Charter / Georgia) at weight 500 — confident-but-not-blocky. Distinct from Riso's chunky display serif at weight 700.
- Generous body leading (1.65) and 17px body type — slow-read register.
- Moderate radius (lg = 0.5rem) — softer than Brutalist's zero, harder than Bento's 1rem.

## 2. Colors: Hot-Earth Surface + Two-Tone Warm Voltage

A warm-earth surface ramp (hue 60) + terracotta primary (hue 25) + sage accent (hue 110). Where Bento's two-tone is warm/cool, Terracotta's is warm/green — both voltage poles sit on the warm side of the colour wheel, with sage providing the natural-world counterpoint rather than a cool-temperature contrast.

### Surface Ramp
- **Sand Background** (`oklch(0.94 0.014 60)`): The earth chassis. Warmer than Bento's cream; the hue-60 read is "sand" rather than "warm-white".
- **Card** (`oklch(0.96 0.012 60)`): Card surface. Slightly lighter than sand but still warm.
- **Muted** (`oklch(0.91 0.014 60)`): Recessed panels, sidebar bodies, ambient washes.

### Two-Tone Warm Voltage
- **Fired-Clay Primary** (`oklch(0.55 0.18 30)`): The terracotta. CTAs, focus rings, primary emphasis. Hue 30 (red-clay) at chroma 0.18 — distinct from Brutalist's louder cadmium (chroma 0.22) and Bento's softer coral (chroma 0.15).
- **Sage Accent** (`oklch(0.58 0.10 110)`): The growing-thing counterpart. Inline highlights, secondary badges, "active" state on data points. Olive-green leaning warm — pure cool green would fight the chassis.

### Foreground & Border
- **Warm Brown Foreground** (`oklch(0.22 0.020 40)`): Primary text. Hue 40 (dark warm brown) — reading as ink, not as cold black. Higher chroma than Clean's 0-chroma foreground; warmth has to carry through the body type.
- **Mid Brown Muted-Foreground** (`oklch(0.46 0.018 40)`): Captions, supporting metadata.
- **Soft Sand Border** (`oklch(0.84 0.018 60)`): Card seams. Slightly more chromatic than Bento's border so the warm chassis carries through even at low contrast.

### Chart Palette
Five-stop warm earth ramp: terracotta (chart-1) → amber (chart-2, hue 50) → sage (chart-3) → olive (chart-4) → warm tan (chart-5). All on the warm/earth side of the colour wheel. Distinct from Bento's two-tone (warm primary + cool accent) and Neon's polychrome categorical — Terracotta's chart is a *single-mood* ramp.

### Named Rules

**The Hue-60 Sand Chassis Rule.** Surface tokens sit at hue 60 (warm sand). Bento's hue-70 cream and Paper-ink's hue-80 parchment are cooler; Terracotta's hue is deliberately warmer. Pure-neutral surfaces (hue 0) read out-of-register.

**The Fired-Clay vs Cadmium Rule.** Terracotta's primary at hue 25 / chroma 0.18 is *fired clay*: warm-red but earthy. Brutalist's primary at hue 25 / chroma 0.22 is *cadmium*: the same hue but unrestrained, optimised for manifesto-shout. Don't push Terracotta's primary above chroma 0.18 — at 0.22 it reads "cadmium" rather than "clay" and breaks the slow-pace register.

**The Warm-Green Accent Rule.** Sage accent at hue 110 — the green that grounds. Pure cool green (hue 140-160) reads chlorophyll-clinical; Terracotta's green is olive-leaning, which sits warmly next to the clay.

## 3. Typography: Humanist Serif Display + Warm Sans Body

**Display Font:** humanist serif (`Source Serif Pro`, `Charter`, fallback Georgia)
**Body Font:** system sans (`var(--font-sans)`)
**Mono Font:** system mono (`var(--font-mono)`)

**Character:** Display + Heading + Title all run a humanist serif at weight 500 (Display + Heading) or 600 (Title). Body stays sans for long-form readability — Terracotta is editorial, but the body wants modern sans calm, not double-serif density. The contrast between serif display and sans body is the slow-pace signal.

### Hierarchy

- **Display** (humanist serif, weight 500, `clamp(2.25rem, 5.5vw, 3.5rem)`, leading 1.15, tracking −0.015em): Editorial-essay headlines. Weight 500 — confident but not blocky. Riso's weight 700 belongs to zine-poster; Editorial's lighter weight 400 belongs to longform-magazine; Terracotta's 500 is the middle.
- **Heading** (humanist serif, weight 500, 1.75rem, leading 1.25, tracking −0.005em): Section heads. Serif carries the slow-pace voice through the document hierarchy.
- **Title** (humanist serif, weight 600, 1.25rem, leading 1.35): Sub-section heads. One step up in weight from Heading — Title needs to anchor sections.
- **Body** (sans, weight 400, 17px, leading 1.65): Paragraph copy. Generous leading (1.65 vs Clean's 1.6) — long-read register.
- **Label** (sans, weight 600, 0.8125rem, uppercased, tracking +0.04em): Buttons, badges, navigation. Sans + uppercased gives chrome a different texture from the serif body — keeping chrome out of the editorial voice.
- **Mono** (mono, weight 400, 0.875rem): Inline code (rare in Terracotta).

### Named Rules

**The Serif-Display / Sans-Body Rule.** Display, Heading, and Title run the humanist serif. Body and Label run sans. Mixing — body in serif, label in serif — fights Terracotta's editorial register; the serif/sans contrast is the slow-pace signal.

**The Humanist-Serif-At-500 Rule.** Display weight 500 specifically. Weight 700 belongs to Riso (chunky display); weight 400 belongs to Editorial (long-form magazine); 500 is Terracotta's middle ground — anchored without being blocky.

**The Generous-Leading Rule.** Body leading is 1.65 (one step up from Clean's 1.6). The slow-pace register asks the reader to relax into the page; tight leading turns the document into a quick-scan, which fights the identity.

## 4. Elevation

Flat at rest, lifted modestly on state. Terracotta's elevation vocabulary is closer to Bento's (lightness-shift first, shadow second) than Riso's (bordered, no lift). Cards lift via lightness shift from background to card; shadows appear only on hover for interactive surfaces.

### Named Rules

**The Soft-Lift Rule.** Interactive cards lift via `--shadow-sm` on hover — a soft warm-shifted shadow (HSL hue 30 at low alpha). Hard depth shadows fight the warm-earth softness.

## 5. Components

### Buttons

- **Shape:** `--radius-md` (0.3125rem) — moderate, between Brutalist's 0 and Bento's 0.625rem.
- **Primary:** Fired-clay background, sand-foreground text, label-style typography (uppercased weight 600 tracked +0.04em), padding 0.5rem 1rem.
- **Secondary:** Secondary-surface (warm sand-tinted) background; same shape.

### Cards & Containers

- **Corner Style:** `--radius-lg` (0.5rem) — softer than Brutalist / Riso, harder than Bento.
- **Background:** `--card` (warm sand surface).
- **Border:** Hairline 1px in `--border` (soft sand). The card-vs-background lightness shift does most of the seam work.
- **Shadow:** Flat at rest; `--shadow-sm` on hover.
- **Internal Padding:** 1.5rem default.

### Inputs / Fields

- **Style:** `--radius-md`, hairline `--border`, `--background` fill.
- **Focus:** `--ring` (fired clay) outline.

### Navigation

- **Style:** Label (sans, weight 600, uppercased, tracked +0.04em).
- **States:** Default `--foreground` (warm brown); hover shifts to `--primary` (fired clay).

### Chart Palette

Warm-earth single-mood ramp. Use chart-1 (terracotta) for primary series, chart-3 (sage) for comparison or "positive trend", chart-2/4/5 for additional series. The ramp stays in the warm/earth band — don't sequence into cool hues.

## 6. Do's and Don'ts

### Do:

- **Do** treat Terracotta as slow-pace editorial. Long-form essays, sustainability reports, grounded retrospectives.
- **Do** keep surfaces at hue 60 (warm sand). Pure neutrals belong to Clean; hue-80 parchment belongs to Paper-ink.
- **Do** pair the fired-clay primary with the sage accent. Two-tone warm — both poles on the warm/earth side of the wheel.
- **Do** run Display, Heading, and Title in humanist serif at weight 500. The slow-pace voice is in the typography.
- **Do** use generous body leading (1.65). Terracotta is a slow read.

### Don't:

- **Don't** use Terracotta for tech docs. The warm chassis + serif display fight Console / Terminal / IDE register. Use those instead.
- **Don't** push primary chroma above 0.18. At 0.22 it reads as Brutalist's cadmium, not Terracotta's fired clay.
- **Don't** swap the sage accent for cool green. Hue 140+ reads chlorophyll-clinical; hue 110 (olive-leaning) sits warmly next to the chassis.
- **Don't** run Body in serif. The serif-display / sans-body contrast is the slow-pace signal — full serif kills the rhythm.
- **Don't** tighten body leading below 1.6. Terracotta asks the reader to settle in; tight leading rushes them.
