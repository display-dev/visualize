---
name: Paper-ink
description: Print / letterpress register — warm cream paper, ink-black foreground, restrained burnt-red rule. Light-canonical, zero radius, serif everywhere.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values here are the canonical paper-ink register; dark-mode (the
# printing-room interpretation) lives in the sidecar `tokens.css`.
canonical-canvas: light
selection:
  mood: [editorial, high-contrast, organic, monochrome]
  tone: [calm, warm]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a calm, warm register with editorial, high-contrast, organic, monochrome visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

colors:
  background: "oklch(0.965 0.018 80)"
  foreground: "oklch(0.18 0.008 60)"
  card: "oklch(0.955 0.020 80)"
  card-foreground: "oklch(0.18 0.008 60)"
  popover: "oklch(0.955 0.020 80)"
  popover-foreground: "oklch(0.18 0.008 60)"
  primary: "oklch(0.40 0.12 30)"
  primary-foreground: "oklch(0.965 0.018 80)"
  secondary: "oklch(0.92 0.018 78)"
  secondary-foreground: "oklch(0.18 0.008 60)"
  muted: "oklch(0.92 0.018 78)"
  muted-foreground: "oklch(0.42 0.012 65)"
  accent: "oklch(0.89 0.022 76)"
  accent-foreground: "oklch(0.18 0.008 60)"
  destructive: "oklch(0.45 0.20 25)"
  destructive-foreground: "oklch(0.965 0.018 80)"
  border: "oklch(0.78 0.018 70)"
  input: "oklch(0.85 0.020 75)"
  ring: "oklch(0.40 0.12 30)"
  chart-1: "oklch(0.40 0.12 30)"
  chart-2: "oklch(0.38 0.06 85)"
  chart-3: "oklch(0.32 0.04 220)"
  chart-4: "oklch(0.42 0.08 140)"
  chart-5: "oklch(0.28 0.02 60)"
  sidebar: "oklch(0.94 0.020 80)"
  sidebar-foreground: "oklch(0.18 0.008 60)"
  sidebar-primary: "oklch(0.40 0.12 30)"
  sidebar-primary-foreground: "oklch(0.965 0.018 80)"
  sidebar-accent: "oklch(0.89 0.022 76)"
  sidebar-accent-foreground: "oklch(0.18 0.008 60)"
  sidebar-border: "oklch(0.78 0.018 70)"
  sidebar-ring: "oklch(0.40 0.12 30)"

typography:
  display:
    fontFamily: "var(--font-serif)"
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.005em"
  heading:
    fontFamily: "var(--font-serif)"
    fontSize: "1.625rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-serif)"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-serif)"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.005em"
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.08em"
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
    padding: "0.625rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.5rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
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

# Design System: Paper-ink

## 1. Overview: The Letterpress Monograph

**Creative North Star: "The Letterpress Monograph"**

Paper-ink is visualize's print / letterpress register — the surface should read as *paper the reader could touch*, not a screen approximation of one. The aesthetic reference is a broadsheet, a letterpress monograph, an austere print-run book under reading-room light. Warm cream paper (hue 80, low chroma) + ink-black foreground + a restrained burnt-red rule that evokes red-pencil correction or letterpress stamp. Body type sets serif at 17px with 1.65 leading. Zero radius across the entire scale — print has no rounded corners.

This is the system for **print-publishing reader-jobs** where the artifact reads as a *publication*, not a SaaS interface: Whitepapers, Reports, Postmortems written as narrative, Research briefs, Fact-check reports. Drop-cap on the opening paragraph, small-caps section labels, full-bleed table rules with no card wrapper, figure-with-caption KPIs — all the letterpress-monograph affordances belong here.

Paper-ink explicitly rejects: card wrappers around standalone facts or KPIs (letterpress doesn't tile statistics), rounded corners anywhere (even Terminal's 0.125rem reads off-register), cool-temperature surfaces, saturated colour fills, dashboard chrome, code-shape templates, marketing-register affordances. The warm-cream + ink-black + restrained-burnt-red triple is the identity.

**Key Characteristics:**
- Warm cream surfaces (hue 80, chroma 0.018–0.022) — pushed warmer than Editorial. The paper *feels* like paper.
- Burnt-red `--primary` (hue 30, chroma 0.12) — distinct from every other system's primary. Reads as letterpress stamp, never as alarm.
- Serif display + serif body via `--font-display: var(--font-serif)` (EB Garamond / Crimson Pro / Source Serif Pro stack).
- Body at 17px serif with leading 1.65 + slightly looser tracking (0.005em) — letterpress spacing.
- Zero radius (`--radius: 0`). Print has no rounded corners.
- Light-canonical; the dark mode reads as letterpress under dim printing-room light, not as a strong second register.

## 2. Colors: The Cream-and-Ink Palette

A two-chord palette: warm cream surfaces + ink-black foreground + restrained burnt-red rule + a warm-print five-stop chart palette. No second hue in core surfaces.

### Primary
- **Burnt Red** (`oklch(0.40 0.12 30)`): The letterpress-stamp accent. Section rules, inline emphasis, primary CTAs, the rare red-pencil-correction emphasis. Chroma sits well below the genre-reflex ceiling so it never reads alarm — it reads ink.

### Neutral
- **Warm Cream Paper Background** (`oklch(0.965 0.018 80)`): Body surface. The cream is what makes the design read as paper. Strip to white and the design dies.
- **Ink-Black Foreground** (`oklch(0.18 0.008 60)`): Primary text. Slightly softer than pure black, with a touch of warmth — reads as ink-on-cream.
- **Muted Cream** (`oklch(0.92 0.018 78)`): Secondary surfaces, ambient panels.
- **Sepia Muted Foreground** (`oklch(0.42 0.012 65)`): Captions, footnotes, small recessed text.
- **Visible Rule Border** (`oklch(0.78 0.018 70)`): Visible — the broadsheet style. Darker than Clean's hairline borders; Paper-ink uses rules to do section work.

### State
- **Stamp Red** (`oklch(0.45 0.20 25)`): Destructive actions and errors. Sits between primary's burnt-red and a saturated warm coal-red — restraint applies here too.

### Chart Palette (warm-print range)
- **`--chart-1` Burnt Red** (`oklch(0.40 0.12 30)`, matches `--primary`), **`--chart-2` Sepia** (`oklch(0.38 0.06 85)`), **`--chart-3` Slate** (`oklch(0.32 0.04 220)`), **`--chart-4` Olive** (`oklch(0.42 0.08 140)`), **`--chart-5` Coal** (`oklch(0.28 0.02 60)`): A warm-print five-stop. Burnt-red leads; sepia + olive + coal fill out the printed-publication range. No bright primaries.

### Named Rules

**The Paper-Feel Rule.** The cream background carries the register. Hue 80, chroma 0.018+ — pushed warmer than Editorial. Strip the warmth and the design is generic.

**The Restrained-Burnt-Red Rule.** `--primary` stays at chroma 0.12 max, well below alarm-shop saturation. Letterpress-stamp tone, not red-banner tone. If a Paper-ink artifact needs alarm, that's a sign the wrong design system is being used.

## 3. Typography: Serif on Cream

**Display Font:** serif stack (EB Garamond / Crimson Pro / Source Serif Pro / Garamond)
**Body Font:** same serif stack
**Mono Font:** system mono

**Character:** Serif everywhere. The publishing-register identity comes from the serif face on cream paper at 17px with 1.65 leading — Editorial uses similar serif pairing but with refined neutral palette; Paper-ink's serif-on-warm-cream reads as letterpress monograph rather than magazine column. Slightly looser tracking (0.005em) evokes letterpress spacing. Drop-caps welcome on opening paragraphs of executive summaries; small-caps welcome on section labels.

### Hierarchy

- **Display** (serif, weight 500, `clamp(2rem, 4.5vw, 3.25rem)`, leading 1.15, tracking 0.005em): Hero monograph titles.
- **Heading** (serif, weight 500, 1.625rem, leading 1.2): Section headings.
- **Title** (serif, weight 500, 1.125rem, leading 1.3): Sub-section heads. Italic-subhead variants encouraged where the artifact wants a quieter shift.
- **Body** (serif, weight 400, 17px, leading 1.65, tracking 0.005em): Paragraph copy. 65–70ch cap.
- **Label** (sans, weight 600, 0.8125rem, `letter-spacing: 0.08em`): Small-caps section labels and eyebrow text. Sans is intentional — the small-caps register reads as section-label, not paragraph copy.
- **Mono** (mono, weight 400, 0.875rem): Inline code where the artifact carries any.

### Named Rules

**The Serif-Body Rule.** Body sets serif at 17px / 1.65 leading. Reverting to sans body strips the publication identity — Paper-ink's serif body is what makes it a monograph.

**The Small-Caps-Label Rule.** Section labels and eyebrow text render small-caps sans (weight 600, letter-spacing 0.08em). The intentional sans contrast against serif body marks the label as label.

## 4. Elevation

Paper-flat. Paper-ink uses extremely subtle warm-tinted shadows (hue 40, very low alpha) only when state explicitly demands it — letterpress monographs don't have glossy chrome. Section breaks use horizontal rules in `--border`, not shadows.

### Shadow Vocabulary

- **`--shadow-sm`** (warm-tinted, very low alpha): Restrained hairline lift.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for floating UI (dropdowns, dialogs).

### Named Rules

**The Rule-Not-Shadow Rule.** Section structure comes from horizontal rules in `--border`. Shadows respond only to state. Reaching for a shadow on a resting decorative element reads as UI; rules read as printed page.

## 5. Components

### Buttons

- **Shape:** Square (`--radius: 0`). Print doesn't have rounded corners.
- **Primary:** Burnt-red background, cream text, small-caps sans label, padding 0.625rem 1.5rem.
- **Hover:** Shifts to ink-black background.
- **Secondary:** Muted-cream background, ink-black text. Same square shape.
- **Focus:** Burnt-red `--ring` outline + low-alpha tint.

### Cards & Containers

- **Corner Style:** Square (0 radius). Cards lean on visible rule-borders for separation, not on chrome.
- **Background:** `--card` (slightly deeper cream than `--background`).
- **Border:** Visible 1px in `--border` — broadsheet rule. Section divisions also welcome.
- **Internal Padding:** 1.5rem default.
- **Note:** Cards are *not* the primary container for facts / KPIs — see Don'ts.

### Inputs / Fields

- **Style:** Square (0 radius), visible `--border`, transparent or `--background`.
- **Focus:** Burnt-red `--ring` border + low-alpha outline glow.

### Navigation

- **Style:** Small-caps sans label, weight 600, letter-spacing 0.08em.
- **States:** Default ink-black `--foreground`; hover shifts to burnt-red `--primary`.

### Chart Palette + Figure-Caption

Warm-print five-stop. Standalone facts and KPIs render as **figure-with-caption** — a numeric or quote sitting on the paper with a label below in small-caps. No card wrapper, no rounded tile, no surface fill. Tables sit on the paper with horizontal rules above and below; no card-wrapping borders, no zebra-stripe fills.

## 6. Do's and Don'ts

### Do:

- **Do** keep `--background` warm cream (hue 80, chroma 0.018+) — see The Paper-Feel Rule.
- **Do** set body serif at 17px / 1.65 leading via `--font-display: var(--font-serif)` — see The Serif-Body Rule.
- **Do** keep `--primary` at burnt-red restraint (chroma 0.12 max) — see The Restrained-Burnt-Red Rule.
- **Do** keep `--radius: 0` everywhere. Print has no rounded corners.
- **Do** use drop-caps on opening paragraphs of executive summaries; small-caps section labels via the sans label scale (letter-spacing 0.08em).
- **Do** use horizontal rules in `--border` for section breaks — see The Rule-Not-Shadow Rule.
- **Do** render standalone facts and KPIs as figure-with-caption; let tables sit on the paper with rules.

### Don't:

- **Don't** wrap standalone facts or KPIs in cards. Letterpress doesn't tile statistics — the figure-with-caption is the move.
- **Don't** add rounded corners anywhere. Even Terminal's 0.125rem reads off-register here.
- **Don't** use cool-temperature surfaces. Blueprint and Console territory — Paper-ink's identity is warm.
- **Don't** saturate `--primary` past the burnt-red restraint. Brighter reads as alarm-shop, not letterpress.
- **Don't** drop dashboard chrome (status pills, KPI tile grids, sparkline strips) into Paper-ink templates. Data-shape doesn't fit print register.
- **Don't** swap body to sans. Serif-on-cream is what makes Paper-ink Paper-ink — see The Serif-Body Rule.
- **Don't** use glossy drop shadows or backdrop-filter glass. Paper doesn't have glass.
- **Don't** drop code-shape templates (Diff review, Runbook, API reference) onto Paper-ink. Code-shape doesn't fit letterpress.
