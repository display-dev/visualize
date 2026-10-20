---
name: Whitepaper
description: Institutional / academic / formal-report register — cool-slate off-white, institutional slate-navy accent, serif display. Light-canonical, formal-density type scale.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values here are the canonical institutional register; dark-mode (the
# boardroom-at-night interpretation) lives in the sidecar `tokens.css`.
canonical-canvas: light
selection:
  mood: [editorial, high-contrast, monochrome]
  tone: [authoritative, serious]
  formality: high
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a authoritative, serious register with editorial, high-contrast, monochrome visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

colors:
  background: "oklch(0.98 0.004 232)"
  foreground: "oklch(0.20 0.020 245)"
  card: "oklch(0.985 0.004 232)"
  card-foreground: "oklch(0.20 0.020 245)"
  popover: "oklch(0.985 0.004 232)"
  popover-foreground: "oklch(0.20 0.020 245)"
  primary: "oklch(0.36 0.13 245)"
  primary-foreground: "oklch(0.98 0.004 232)"
  secondary: "oklch(0.94 0.006 232)"
  secondary-foreground: "oklch(0.20 0.020 245)"
  muted: "oklch(0.94 0.006 232)"
  muted-foreground: "oklch(0.46 0.018 240)"
  accent: "oklch(0.91 0.008 232)"
  accent-foreground: "oklch(0.20 0.020 245)"
  destructive: "oklch(0.50 0.20 25)"
  destructive-foreground: "oklch(0.98 0.004 232)"
  border: "oklch(0.86 0.012 232)"
  input: "oklch(0.86 0.012 232)"
  ring: "oklch(0.36 0.13 245)"
  chart-1: "oklch(0.36 0.13 245)"
  chart-2: "oklch(0.45 0.08 220)"
  chart-3: "oklch(0.40 0.06 60)"
  chart-4: "oklch(0.42 0.10 145)"
  chart-5: "oklch(0.45 0.06 300)"
  sidebar: "oklch(0.96 0.006 232)"
  sidebar-foreground: "oklch(0.20 0.020 245)"
  sidebar-primary: "oklch(0.36 0.13 245)"
  sidebar-primary-foreground: "oklch(0.98 0.004 232)"
  sidebar-accent: "oklch(0.91 0.008 232)"
  sidebar-accent-foreground: "oklch(0.20 0.020 245)"
  sidebar-border: "oklch(0.86 0.012 232)"
  sidebar-ring: "oklch(0.36 0.13 245)"

typography:
  display:
    fontFamily: "var(--font-serif)"
    fontSize: "clamp(1.875rem, 4vw, 2.875rem)"
    fontWeight: 500
    lineHeight: 1.15
  heading:
    fontFamily: "var(--font-serif)"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-serif)"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-serif)"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0"
  md: "0.125rem"
  lg: "calc(0.125rem + 2px)"
  xl: "calc(0.125rem + 4px)"

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
    padding: "0.5rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.25rem"
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

# Design System: Whitepaper

## 1. Overview: The Authoritative Report

**Creative North Star: "The Boardroom Document"**

Whitepaper is visualize's institutional / academic / formal-report register — the artifact that must read *authoritative*, not *warm*. The aesthetic reference is a Bloomberg / McKinsey / university-press report on a serious day. Cool-slate off-white surfaces (hue 232, very low chroma) carry deep institutional slate-navy ink; the primary is a restrained slate-navy that reads boardroom authority rather than publication identity. Serif display + formal-density type scale (16.5px body, 1.6 leading) — academic press doesn't waste page real estate the way a magazine column does.

This is the system for **institutional reader-jobs**: canonical Whitepapers, formal Reports, Research briefs, Postmortems written as institutional record, technical ADRs, Comparison documents that need to read as audited rather than persuasive. Abstract cards in restrained borders carry executive summaries; footnotes and references are first-class chrome (`[S-N]` citation markers into real source bibliographies); methodology + limitations sections sit at the front, not stuffed at the back.

Whitepaper explicitly rejects: warm-temperature surfaces (Editorial / Paper-ink territory), marketing-shaped chrome (Deck's hero CTAs and gradient washes), loose tracking on display headings (Brutalist's manifesto stack is the opposite of what Whitepaper wants). The cool-slate surface + serif + restrained navy is what makes the register; warmth pulls the design into publishing, and saturation pulls it into marketing.

**Key Characteristics:**
- Cool-slate off-white surfaces (hue 232, chroma 0.004) — the only design system whose light-mode surface leans cool rather than warm or neutral.
- Institutional slate-navy `--primary` (oklch 0.36 / 0.13 / 245) — deeper / cooler than Editorial's navy. Reads authority, not publication.
- Serif display + serif body via `--font-display: var(--font-serif)` (Source Serif Pro / Crimson Pro / EB Garamond).
- Body at 16.5px / leading 1.6 — denser than Editorial (17px / 1.65) and Paper-ink (17px / 1.65). Formal-report rhythm.
- Minimal radius (0.125rem) — slightly above Terminal's near-square, well below Clean's 0.625rem.
- Narrow publishing measure (~44rem cap) — academic page-discipline.

## 2. Colors: The Institutional-Slate Palette

A two-chord palette: cool-slate neutrals (hue 232) carrying a restrained institutional slate-navy accent + a restrained five-stop chart palette in the cool-cool-warm range typical of formal reports.

### Primary
- **Institutional Slate Navy** (`oklch(0.36 0.13 245)`): The institutional accent. Inline citations, section eyebrows, the rare pull-quote rule, primary CTAs. Deeper + cooler than Editorial's navy — the temperature shift reads authority rather than publication.

### Neutral
- **Cool Slate Off-White Background** (`oklch(0.98 0.004 232)`): The institutional surface. Strip the cool cast and the register is gone.
- **Deep Slate-Navy Foreground** (`oklch(0.20 0.020 245)`): Primary text — ink-on-cool-paper.
- **Cool Muted** (`oklch(0.94 0.006 232)`): Secondary surfaces, abstract callouts.
- **Mid Slate Muted Foreground** (`oklch(0.46 0.018 240)`): Captions, footnote prose.
- **Hairline Slate Border** (`oklch(0.86 0.012 232)`): Restrained rules. Abstract cards use bordered blocks rather than colored fills.

### State
- **Institutional Red** (`oklch(0.50 0.20 25)`): Destructive actions. Restrained — formal reports use red for "this changed" or "this needs attention," not for alarm chrome.

### Chart Palette (institutional-restrained)
- **`--chart-1` Institutional Navy** (`oklch(0.36 0.13 245)`, matches `--primary`), **`--chart-2` Slate Blue** (`oklch(0.45 0.08 220)`), **`--chart-3` Sepia** (`oklch(0.40 0.06 60)`), **`--chart-4` Muted Teal-Green** (`oklch(0.42 0.10 145)`), **`--chart-5` Dim Plum** (`oklch(0.45 0.06 300)`): Institutional-restrained five-stop. No saturated primaries; the palette reads as audited.

### Named Rules

**The Cool-Slate-Surface Rule.** Surfaces lean hue 230-240 with very low chroma (0.004-0.008). Pure white or warm cream pulls Whitepaper into Clean or Editorial register — the cool cast is what reads "institutional."

**The Restrained-Navy Rule.** `--primary` is institutional slate-navy at chroma 0.13. Brighter navy reads as publication-identity (Editorial) or keyword-blue (IDE); deeper / cooler reads as boardroom authority. Don't saturate.

## 3. Typography: Serif on Slate

**Display Font:** serif stack (Source Serif Pro / Crimson Pro / EB Garamond / system serif)
**Body Font:** same serif
**Mono Font:** mono stack (IBM Plex Mono / ui-monospace)

**Character:** Serif everywhere. The institutional identity comes from the serif face on cool-slate surface + tighter-than-publishing type scale (16.5px body, 1.6 leading) + neutral tracking. Distinct from Editorial (warm-neutral surface, slightly looser leading) and Paper-ink (warm-cream surface, letterpress tracking, zero radius) by the cool surface and the tighter rhythm — three serif-display design systems split by surface temperature + density.

### Hierarchy

- **Display** (serif, weight 500, `clamp(1.875rem, 4vw, 2.875rem)`, leading 1.15): Hero institutional titles. Smaller floor than Editorial — boardroom documents aren't magazines.
- **Heading** (serif, weight 500, 1.5rem, leading 1.2): Section headings.
- **Title** (serif, weight 500, 1.0625rem, leading 1.3): Sub-section heads.
- **Body** (serif, weight 400, 16.5px, leading 1.6): Paragraph copy. Tighter than Editorial / Paper-ink.
- **Label** (sans, weight 600, 0.8125rem, `letter-spacing: 0.06em`): Small-caps section eyebrows + abstract labels. Sans for the small-caps register, intentional contrast against serif body.
- **Mono** (mono, weight 400, 0.875rem): Inline code, technical references.

### Named Rules

**The Formal-Density Rule.** Body at 16.5px / leading 1.6 — denser than Editorial / Paper-ink. Academic press doesn't waste page real estate; the slightly denser rhythm reads as audited rather than relaxed.

**The Sans-Label-Eyebrow Rule.** Section eyebrows + abstract labels render small-caps sans (weight 600, letter-spacing 0.06em) on a serif body. The intentional sans contrast marks the label as institutional metadata.

## 4. Elevation

Restrained. Whitepaper uses cool-slate-tinted shadows (hue 230) at low alpha when explicit elevation is needed, but resting surfaces stay flat. Abstract cards and section panels rely on hairline `--border` + subtle background shift, not on shadows.

### Shadow Vocabulary

- **`--shadow-sm`** (cool-slate-tinted, low alpha): Hairline lift for interactive states.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for floating UI (dropdowns, dialogs).

### Named Rules

**The Border-Carries-Section Rule.** Abstract cards, executive summaries, and section panels use bordered blocks with `--border` for structure. Shadows are state-response only; the formal register doesn't lean on chrome.

## 5. Components

### Buttons

- **Shape:** `--radius-md` (0.125rem). Slightly above near-square — the formal register's restrained chrome.
- **Primary:** Institutional slate-navy background, near-white text, small-caps sans label, padding 0.5rem 1.25rem.
- **Hover:** Shifts to deep slate-navy foreground.
- **Secondary:** Cool muted background, slate-navy text.
- **Focus:** Slate-navy `--ring` outline.

### Cards & Containers

- **Corner Style:** `--radius-md` (0.125rem). Minimal — academic chrome doesn't round.
- **Background:** `--card` (slightly deeper than `--background`).
- **Border:** Hairline 1px in `--border` — visible-but-restrained. Abstract cards carry this border treatment as their primary structural cue.
- **Internal Padding:** 1.5rem default.

### Inputs / Fields

- **Style:** `--radius-md` (0.125rem), hairline `--border`, transparent or `--background`.
- **Focus:** Slate-navy `--ring` border.

### Navigation

- **Style:** Small-caps sans label, weight 600, letter-spacing 0.06em.
- **States:** Default deep slate-navy `--foreground`; hover shifts to institutional `--primary`.

### Footnotes + Citations

The signature affordance: every claim that needs sourcing gets a `[S-N]` marker tied to a source bibliography section. Methodology + limitations sections sit *at the front* (not stuffed at the back) as first-class chrome. Abstract cards live in restrained bordered blocks, not in colored fills.

## 6. Do's and Don'ts

### Do:

- **Do** keep surfaces cool-slate (hue 232, chroma 0.004) — see The Cool-Slate-Surface Rule.
- **Do** use the restrained institutional slate-navy `--primary` — see The Restrained-Navy Rule.
- **Do** render headings serif via `--font-display: var(--font-serif)` on cool-slate surface — institutional convention.
- **Do** set body at 16.5px / leading 1.6 — see The Formal-Density Rule.
- **Do** use sans small-caps labels (weight 600, letter-spacing 0.06em) for eyebrows and abstract labels — see The Sans-Label-Eyebrow Rule.
- **Do** treat footnotes + citations + methodology as first-class chrome. Whitepaper's honesty register requires them.
- **Do** keep `--radius` minimal (0.125rem). Academic chrome doesn't round.

### Don't:

- **Don't** use warm-temperature surfaces. Editorial / Paper-ink territory; Whitepaper sits cool.
- **Don't** drop marketing chrome — hero CTAs, oversized display type, gradient washes. The institutional register reads dry against marketing affordances.
- **Don't** use loose tracking on display headings. Brutalist's -0.02em manifesto stack is the opposite of what Whitepaper wants — neutral tracking is the formal default.
- **Don't** saturate `--primary` past institutional restraint. Brighter navy reads as publication (Editorial) or keyword (IDE).
- **Don't** stuff methodology / limitations / references at the back. They're first-class chrome.
- **Don't** rely on shadows for section structure — see The Border-Carries-Section Rule.
- **Don't** use saturated chart palettes that compete with the institutional surface. The institutional-restrained five-stop is intentional.
