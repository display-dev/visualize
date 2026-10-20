---
name: Console
description: NOC / ops-grid / status-board register — slate-blue surfaces, info-blue accent, traffic-light chart palette. Dark-canonical, tabular numerals on data.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values here are the daytime / printed-report interpretation; the
# canonical NOC register (deep slate-blue + info-blue) lives in the
# sidecar `tokens.css` `[data-theme="dark"]` block.
canonical-canvas: dark
selection:
  mood: [developer, technical, enterprise, data-rich]
  tone: [precise, pragmatic]
  formality: medium
  density: high
  canonical_canvas: dark
  best_for: |
    Use for information-dense artifacts that need a precise, pragmatic register with developer, technical, enterprise, data-rich visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

colors:
  background: "oklch(0.98 0.006 230)"
  foreground: "oklch(0.20 0.020 235)"
  card: "oklch(0.985 0.006 230)"
  card-foreground: "oklch(0.20 0.020 235)"
  popover: "oklch(0.985 0.006 230)"
  popover-foreground: "oklch(0.20 0.020 235)"
  primary: "oklch(0.45 0.14 225)"
  primary-foreground: "oklch(0.98 0.006 230)"
  secondary: "oklch(0.95 0.008 230)"
  secondary-foreground: "oklch(0.20 0.020 235)"
  muted: "oklch(0.95 0.008 230)"
  muted-foreground: "oklch(0.48 0.018 230)"
  accent: "oklch(0.93 0.012 230)"
  accent-foreground: "oklch(0.20 0.020 235)"
  destructive: "oklch(0.55 0.22 25)"
  destructive-foreground: "oklch(0.98 0.006 230)"
  border: "oklch(0.86 0.014 230)"
  input: "oklch(0.86 0.014 230)"
  ring: "oklch(0.45 0.14 225)"
  chart-1: "oklch(0.50 0.15 145)"
  chart-2: "oklch(0.62 0.15 75)"
  chart-3: "oklch(0.55 0.20 25)"
  chart-4: "oklch(0.45 0.14 225)"
  chart-5: "oklch(0.50 0.02 230)"
  sidebar: "oklch(0.96 0.008 230)"
  sidebar-foreground: "oklch(0.20 0.020 235)"
  sidebar-primary: "oklch(0.45 0.14 225)"
  sidebar-primary-foreground: "oklch(0.98 0.006 230)"
  sidebar-accent: "oklch(0.93 0.012 230)"
  sidebar-accent-foreground: "oklch(0.20 0.020 235)"
  sidebar-border: "oklch(0.86 0.014 230)"
  sidebar-ring: "oklch(0.45 0.14 225)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(1.625rem, 3.5vw, 2.625rem)"
    fontWeight: 600
    lineHeight: 1.15
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.8125rem"
    fontWeight: 400

rounded:
  sm: "calc(0.25rem - 2px)"
  md: "0.25rem"
  lg: "calc(0.25rem + 2px)"
  xl: "calc(0.25rem + 4px)"

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
    padding: "0.375rem 0.875rem"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.875rem"
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
  nav-link-hover:
    textColor: "{colors.primary}"
---

# Design System: Console

## 1. Overview: The Operations Console

**Creative North Star: "Mission Control at Rest"**

Console is visualize's NOC / ops-grid / status-board register — the artifact should read as an *operations console at rest*: status tiles, traffic-light coding, tabular numerals on every cell carrying a metric. The aesthetic reference is a network-operations console mid-watch, the kind of dashboard ops teams stare at for a full shift. **Dark is canonical** (mission-control consoles are universally dark); the light interpretation is the daytime / printed-report companion using the same status palette.

This is the system for **monitoring reader-jobs**: the reader is *watching state*, not typing into a terminal (Terminal's job) and not editing code (IDE's job). Templates that pull naturally on Console: Dashboard, Status page, Data explorer, Runbook (incident-response sub-shape), Roadmap timeline (status-tracking). The chart palette IS the layout vocabulary — `--chart-1` healthy-green, `--chart-2` warning-amber, `--chart-3` critical-red, `--chart-4` info-blue, `--chart-5` neutral-slate. Status-dot KPI tiles, traffic-light section bars, full-bleed status grids are all built directly on this five-hue mapping.

Console explicitly rejects: prose-led layouts, wide reading measures, large hero blocks, warm-temperature surfaces. The slate-blue surface + info-blue accent + traffic-light status palette is what makes the register; chrome supports the metrics, not the other way around.

**Key Characteristics:**
- Dark-canonical NOC register; light is the daytime / printed-report companion (the `:root` here).
- Slate-blue surfaces (hue 225-230, chroma 0.018) — distinct from Blueprint's deeper navy (hue 245-250) and IDE's purple-slate (hue 280-290).
- Info-blue `--primary` (oklch 0.45 / 0.14 / 225) — status-info convention. Distinct from IDE's keyword-blue (vibrant 0.55 / 0.18).
- Traffic-light chart palette: healthy-green / warning-amber / critical-red / info-blue / neutral-slate. The palette IS the status vocabulary.
- Dense type scale (15px body, display capped at 2.625rem) — titles support data, not vice versa.
- 0.25rem radius — status-tile chrome, neither pill nor square.

## 2. Colors: The Traffic-Light Palette

A two-chord palette: slate-blue surfaces + info-blue accent + a traffic-light chart palette that doubles as the layout's status vocabulary.

### Primary
- **Info Blue** (`oklch(0.45 0.14 225)`): The status-info convention. Inline links, focus rings, the executive-summary left rule, primary CTAs. Distinct from IDE's vibrant keyword-blue by hue + saturation — info-blue reads "this is information," not "this is a code keyword."

### Neutral
- **Slate-Blue Background** (`oklch(0.98 0.006 230)`): Daytime surface. Slightly cool-tinted (hue 230) for register cohesion with the dark canonical state.
- **Deep Slate Foreground** (`oklch(0.20 0.020 235)`): Primary text on light.
- **Cool Muted** (`oklch(0.95 0.008 230)`): Secondary surfaces, status-tile backgrounds.
- **Mid Slate Muted Foreground** (`oklch(0.48 0.018 230)`): Captions, recessed text.
- **Hairline Slate Border** (`oklch(0.86 0.014 230)`): Tile-edge separation.

### State
- **Critical Red** (`oklch(0.55 0.22 25)`): Destructive actions. The destructive token uses the same critical-red as `--chart-3` — single mapping rather than a separate destructive palette.

### Chart Palette (the Traffic-Light Five)
- **`--chart-1` Healthy Green** (`oklch(0.50 0.15 145)`), **`--chart-2` Warning Amber** (`oklch(0.62 0.15 75)`), **`--chart-3` Critical Red** (`oklch(0.55 0.20 25)`), **`--chart-4` Info Blue** (`oklch(0.45 0.14 225)`, matches `--primary`), **`--chart-5` Neutral Slate** (`oklch(0.50 0.02 230)`): Reader pre-training pins each hue to a status role. The chart palette is the status vocabulary, not just a trend hue.

### Named Rules

**The Traffic-Light-Chart Rule.** `--chart-1` through `--chart-5` walk healthy / warning / critical / info / neutral. Status-dot KPI tiles, traffic-light section bars, and alert primitives all read directly off this mapping. The palette IS the layout vocabulary.

**The Single-Critical-Red Rule.** `--destructive` shares value with `--chart-3` (critical red). One critical-red across the artifact — destructive actions, critical chart series, alert primitives all resolve to the same hue. Single mapping reads as audited; separate destructive vocabulary reads as chrome bloat.

## 3. Typography: Status-Grid Density

**Display Font:** sans stack (Inter / JetBrains Sans / system sans)
**Body Font:** same sans
**Mono Font:** mono stack (JetBrains Mono / IBM Plex Mono / ui-monospace) — used on every cell carrying a metric

**Character:** Sans display + sans body. Mono renders on **every cell carrying a metric** via template-local `font-feature-settings: "tnum"` (tabular numerals). UI chrome — status tiles, headers, navigation — is sans by convention; data cells pick mono with tabular numerals so numeric columns align under the same digit width regardless of values.

### Hierarchy

- **Display** (sans, weight 600, `clamp(1.625rem, 3.5vw, 2.625rem)`, leading 1.15): Hero dashboard titles. Smaller floor than every other system — chrome supports data.
- **Heading** (sans, weight 600, 1.375rem, leading 1.2): Section headings.
- **Title** (sans, weight 500, 1rem, leading 1.3): Sub-section heads.
- **Body** (sans, weight 400, 15px, leading 1.5): Paragraph copy. Tighter than Clean — dashboard rhythm.
- **Label** (sans, weight 600, 0.75rem, `letter-spacing: 0.06em`): UPPERCASE table headers + status-tile labels. The NOC-grid convention.
- **Mono** (mono, weight 400, 0.8125rem): Numeric cells, codes, timestamps. Tabular numerals via template CSS.

### Named Rules

**The Tabular-Numerals Rule.** Numeric cells use mono with `font-feature-settings: "tnum"`. Columns align under the same digit width. Status grids without tabular numerals read as broken-aligned spreadsheets.

**The Status-Grid-Density Rule.** Body at 15px / leading 1.5, display capped at 2.625rem. Titles support metrics; oversized display floors pull Console into Deck or Editorial register.

## 4. Elevation

Panel-flat. Status tiles, KPI cards, and section panels rely on borders + subtle background shift for structure, not on shadows. When elevation is needed (modals, tooltips), shadows use slate-cool tinted alpha at low values.

### Shadow Vocabulary

- **`--shadow-sm`** (slate-cool tinted, low alpha): Hairline lift for hover.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for floating UI.

### Named Rules

**The Border-Carries-Tile Rule.** Status tiles separate via hairline borders + status-dot indicators. Shadows respond to state; resting tiles sit flat. Reaching for drop shadows on status cards reads as marketing chrome.

## 5. Components

### Buttons

- **Shape:** `--radius-md` (0.25rem). Status-tile chrome.
- **Primary:** Info-blue background, near-white text, UPPERCASE small-caps sans label, padding 0.375rem 0.875rem. Tight chrome.
- **Hover:** Shifts to deep-slate foreground.
- **Secondary:** Cool muted background, deep-slate text.
- **Focus:** Info-blue `--ring` outline.

### Cards & Containers (Status Tiles)

- **Corner Style:** `--radius-md` (0.25rem).
- **Background:** `--card` (slightly deeper than `--background`).
- **Border:** Hairline 1px in `--border`.
- **Internal Padding:** 1rem default — denser than every other system (chrome supports metrics).
- **Status-Dot Affordance:** Each tile carries a small colour-coded dot at top-left, driven off `data-status="ok|warning|critical|info|neutral"`; the dot resolves to the matching chart-1..5 token.

### Inputs / Fields

- **Style:** `--radius-sm` (~2px), hairline `--border`, transparent or `--background`.
- **Focus:** Info-blue `--ring` border.

### Navigation

- **Style:** UPPERCASE sans label, weight 600, letter-spacing 0.06em.
- **States:** Default deep-slate `--foreground`; hover shifts to info-blue `--primary`.

### Tables + Section Bars

Tables: UPPERCASE monospace headers; tabular numerals on data cells. Section bars: left-border colour maps to section state (green healthy / amber warning / red critical / blue info / slate neutral) — `border-left` 4px in the matching chart token. The chart palette doing layout work is the Console signature.

### Alert Primitives

Restrained dotted-info-line: left-bordered alert (4px in matching chart token) + small status-dot, body in slate-foreground. Not a full-bleed banner — alerts read as one-line status notes, not as marketing.

## 6. Do's and Don'ts

### Do:

- **Do** map chart-1..5 to healthy / warning / critical / info / neutral — see The Traffic-Light-Chart Rule. The palette IS the layout vocabulary.
- **Do** use mono with `font-feature-settings: "tnum"` on numeric cells — see The Tabular-Numerals Rule.
- **Do** keep body at 15px / leading 1.5 and display capped at 2.625rem — see The Status-Grid-Density Rule.
- **Do** use the info-blue `--primary` (oklch 0.45 / 0.14 / 225) — status-info convention.
- **Do** share `--destructive` with `--chart-3` — single critical-red mapping.
- **Do** drive section-bar coding off the chart palette — `border-left` 4px maps to section state.
- **Do** use status-dot KPI tile cards — small dot at top-left resolving to a chart token by `data-status`.

### Don't:

- **Don't** drop prose-led layouts or wide reading measures into Console. Long-form prose reads off-register; reach for Editorial / Whitepaper.
- **Don't** scale `--text-display` past 2.625rem. Chrome supports the data, not vice versa.
- **Don't** use warm-temperature surfaces. Console's identity is the cool slate-blue; warm coal belongs to Terminal, purple-slate to IDE, deep navy to Blueprint.
- **Don't** introduce a second critical hue. One critical-red across the artifact — see The Single-Critical-Red Rule.
- **Don't** use full-bleed alert banners. Alerts are dotted-info-line — left-bordered + status-dot.
- **Don't** strip tabular numerals from data cells. Status grids without `tnum` read as broken-aligned spreadsheets.
- **Don't** reach for marketing-shaped CTAs or hero blocks. Console supports operators, not buyers.
