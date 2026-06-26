---
name: IDE
description: Code-editor register — VS Code / JetBrains-Darcula lineage. Dark-canonical, slate-purple surfaces, vibrant cyan-blue accent, multi-hue syntax chart palette.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values here (VS Code Light+ register); dark (the canonical IDE
# slate-purple) lives in the sidecar `tokens.css`.
canonical-canvas: dark
selection:
  mood: [developer, technical]
  tone: [precise, pragmatic]
  formality: medium
  density: high
  canonical_canvas: dark
  best_for: |
    Use for information-dense artifacts that need a precise, pragmatic register with developer, technical visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

colors:
  background: "oklch(0.985 0.003 280)"
  foreground: "oklch(0.22 0.025 285)"
  card: "oklch(0.99 0.003 280)"
  card-foreground: "oklch(0.22 0.025 285)"
  popover: "oklch(0.99 0.003 280)"
  popover-foreground: "oklch(0.22 0.025 285)"
  primary: "oklch(0.55 0.18 230)"
  primary-foreground: "oklch(0.985 0.003 280)"
  secondary: "oklch(0.95 0.006 285)"
  secondary-foreground: "oklch(0.22 0.025 285)"
  muted: "oklch(0.95 0.006 285)"
  muted-foreground: "oklch(0.48 0.018 285)"
  accent: "oklch(0.93 0.012 285)"
  accent-foreground: "oklch(0.22 0.025 285)"
  destructive: "oklch(0.55 0.22 25)"
  destructive-foreground: "oklch(0.985 0.003 280)"
  border: "oklch(0.88 0.010 285)"
  input: "oklch(0.88 0.010 285)"
  ring: "oklch(0.55 0.18 230)"
  chart-1: "oklch(0.55 0.18 230)"
  chart-2: "oklch(0.58 0.18 55)"
  chart-3: "oklch(0.52 0.18 150)"
  chart-4: "oklch(0.55 0.20 330)"
  chart-5: "oklch(0.62 0.15 95)"
  sidebar: "oklch(0.96 0.006 285)"
  sidebar-foreground: "oklch(0.22 0.025 285)"
  sidebar-primary: "oklch(0.55 0.18 230)"
  sidebar-primary-foreground: "oklch(0.985 0.003 280)"
  sidebar-accent: "oklch(0.93 0.012 285)"
  sidebar-accent-foreground: "oklch(0.22 0.025 285)"
  sidebar-border: "oklch(0.88 0.010 285)"
  sidebar-ring: "oklch(0.55 0.18 230)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(1.875rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.005em"
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.4rem"
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
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "-0.005em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "calc(0.1875rem - 1px)"
  md: "0.1875rem"
  lg: "calc(0.1875rem + 2px)"
  xl: "calc(0.1875rem + 4px)"

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
    padding: "1.25rem"
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

# Design System: IDE

## 1. Overview: The Working Editor

**Creative North Star: "A Panel of My Editor"**

IDE is visualize's modern-multi-pane editor register — the artifact should read as a *panel of a working IDE*: sidebar, editor pane, status bar implied by the chrome rather than rendered explicitly. The aesthetic reference is VS Code (One Dark / Dark+) with a JetBrains-Darcula slate-purple cast on the surfaces. **Dark is canonical**; the light interpretation reads as VS Code Light+. Surfaces lean purple-slate (hue 280–290) rather than the cool-blue navy of Blueprint or the warm-coal of Terminal.

This is the system for **dev-tool reader-jobs** where the reader's mental model is "I am in my development environment": Diff reviews, Runbooks, Tutorials, API references, Changelogs, technical ADRs, code-shape architecture overviews. The multi-hue chart palette doubles as **syntax-token roles** — keyword blue / function orange / string green / number magenta / annotation yellow — so diffs, runbooks, and code-shape artifacts pick up multi-hue highlighting without further work.

IDE explicitly rejects: marketing chrome (Deck's territory), serif headings (Editorial / Paper-ink / Whitepaper territory), wide full-bleed prose paragraphs, and the warm-cream surfaces that pull artifacts into publishing register. The purple-slate slate-cool surface + vibrant cyan-blue + multi-hue syntax-evocative chart range is what makes IDE IDE.

**Key Characteristics:**
- Dark-canonical authoring; light is the VS Code Light+ companion (this `:root`).
- Purple-slate cool-chroma surfaces (hue 280–290, chroma 0.022–0.025) — distinct from Blueprint's navy (hue 245–250) and IDE's purple is the marker.
- Vibrant cyan-blue `--primary` (hue 230, chroma 0.18) — the VS Code keyword-highlight cue.
- Multi-hue syntax-evocative chart palette: keyword blue / function orange / string green / number magenta / annotation yellow.
- Near-square radius (0.1875rem) — panel-edged feel between Terminal (0.125rem) and Blueprint (0.25rem).
- Slightly denser type scale (15px body) + tighter tracking (-0.005em) — chrome feels editor-dense, not magazine-loose.

## 2. Colors: The Syntax Palette

A two-chord palette: purple-slate cool surfaces + vibrant cyan-blue accent + a five-hue syntax-evocative chart palette that doubles as code-token role coding.

### Primary
- **VS Code Blue** (`oklch(0.55 0.18 230)`): The cyan-blue keyword-highlight cue. Inline links, focus rings, primary CTAs, the one semantic emphasis per artifact. Distinct from Terminal's CRT-green (hue 145), Blueprint's warm-gold (hue 75-80), and Editorial's navy.

### Neutral
- **Cool Off-White Background** (`oklch(0.985 0.003 280)`): Light-mode surface. Slightly purple-tinted (hue 280) for register cohesion with the dark canonical state.
- **Slate-Purple Foreground** (`oklch(0.22 0.025 285)`): Primary text on light.
- **Cool Slate Muted** (`oklch(0.95 0.006 285)`): Secondary surfaces.
- **Mid Slate Muted Foreground** (`oklch(0.48 0.018 285)`): Captions, recessed text.
- **Hairline Slate Border** (`oklch(0.88 0.010 285)`): Panel-edge separation.

### State
- **IDE Red** (`oklch(0.55 0.22 25)`): Destructive actions, error highlights.

### Chart Palette (syntax-evocative)
- **`--chart-1` Keyword Blue** (`oklch(0.55 0.18 230)`, matches `--primary`), **`--chart-2` Function Orange** (`oklch(0.58 0.18 55)`), **`--chart-3` String Green** (`oklch(0.52 0.18 150)`), **`--chart-4` Number Magenta** (`oklch(0.55 0.20 330)`), **`--chart-5` Annotation Yellow** (`oklch(0.62 0.15 95)`): Reader pre-training pins each hue to its code-token role. The chart palette doubles as the syntax-token color vocabulary.

### Named Rules

**The Syntax-Chart Rule.** Chart-1..5 map to keyword / function / string / number / annotation roles. This isn't decoration — the palette IS the syntax vocabulary, and templates can override `--syntax-*` tokens to pick up the multi-hue highlight without further theme work.

**The Purple-Slate-Surface Rule.** Surfaces lean hue 280-290. Reaching for blue-navy (Blueprint hue 245-250) or pure neutral (Clean) pulls IDE out of register; the purple cast is identity.

## 3. Typography: Editor-Dense Sans

**Display Font:** sans stack (Inter / JetBrains Sans / system sans)
**Body Font:** same sans
**Mono Font:** mono stack (JetBrains Mono / Fira Code / Cascadia Code / SFMono / ui-monospace)

**Character:** Sans display, sans body, mono for code blocks. The editor-dense feel comes from a smaller type-scale floor (15px body, display capped at 2.5rem) plus tighter tracking (-0.005em). UI chrome — tabs, sidebar, status bar — is sans by convention; code blocks within artifacts use `--font-mono` via their own template-local CSS.

### Hierarchy

- **Display** (sans, weight 600, `clamp(1.875rem, 4vw, 2.5rem)`, leading 1.2, tracking -0.005em): Hero titles. Smaller floor than Deck's 4.5rem cap — IDE isn't a slide deck.
- **Heading** (sans, weight 600, 1.4rem, leading 1.2): Section headings.
- **Title** (sans, weight 500, 1rem, leading 1.3): Sub-section heads.
- **Body** (sans, weight 400, 15px, leading 1.55, tracking -0.005em): Paragraph copy. Dev-doc rhythm.
- **Label** (sans, weight 500, 0.8125rem, tracking -0.005em): CTA labels, metadata.
- **Mono** (mono, weight 400, 0.875rem): Inline code, fenced blocks, technical references.

### Named Rules

**The Editor-Dense Rule.** Body at 15px / 1.55 leading, display capped at 2.5rem. Wider reading measure or larger display floor pulls IDE into Whitepaper or Deck register; the density is identity-load-bearing.

**The Sans-Chrome-Mono-Code Rule.** Chrome is sans (tabs, headings, body); code is mono. Templates with code-shape content pull `--font-mono` via their own CSS for fenced blocks and inline code, without overriding `--font-display`.

## 4. Elevation

Panel-flat. IDE uses slate-cool tinted shadows (hue 280) at low alpha when explicit elevation appears (modals, dropdowns, hover lifts). Resting surfaces sit flat against the canvas; panel separation comes from visible-but-restrained borders sharing the surface hue family.

### Shadow Vocabulary

- **`--shadow-sm`** (slate-cool tinted, low alpha): Hairline lift for interactive states.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for dropdowns, tooltips, dialogs.

### Named Rules

**The Panel-Border-Not-Shadow Rule.** Visible-but-restrained borders separate panels; shadows respond to state. Reaching for shadow on a resting panel reads as marketing chrome, not editor.

## 5. Components

### Buttons

- **Shape:** `--radius-md` (0.1875rem). Near-square panel-edged feel.
- **Primary:** Cyan-blue background, near-white text, weight 500 label, padding 0.375rem 0.875rem. Tight chrome.
- **Hover:** Shifts to slate-purple foreground.
- **Secondary:** Cool-slate muted background, slate-purple text.
- **Focus:** `--ring` (cyan-blue) outline.

### Cards & Containers

- **Corner Style:** `--radius-md` (0.1875rem). Panel-edged.
- **Background:** `--card` (slightly deeper than `--background`).
- **Border:** Hairline 1px in `--border`. Visible, panel-edge feel.
- **Internal Padding:** 1.25rem default.

### Inputs / Fields

- **Style:** `--radius-sm` (~2px), hairline `--border`, transparent or `--background`.
- **Focus:** Cyan-blue `--ring` border + low-alpha outline glow.

### Navigation

- **Style:** Sans label, weight 500, tracking -0.005em.
- **States:** Default `--foreground` (slate-purple); hover shifts to cyan-blue `--primary`.

### Chart Palette + Code Blocks

Syntax-evocative five-hue palette. Code blocks pull `--font-mono` and may override `--syntax-*` tokens to render keyword-blue / function-orange / string-green / number-magenta / annotation-yellow highlight directly from the chart palette. This is IDE's signature affordance.

## 6. Do's and Don'ts

### Do:

- **Do** keep surfaces purple-slate (hue 280-290) — see The Purple-Slate-Surface Rule.
- **Do** use the cyan-blue `--primary` on inline links, focus rings, and the one semantic emphasis. Distinct from every other system's primary.
- **Do** treat the chart palette as syntax-token roles — see The Syntax-Chart Rule.
- **Do** keep body at 15px with leading 1.55, display capped at 2.5rem — see The Editor-Dense Rule.
- **Do** invoke `--font-mono` on code blocks via template-local CSS — see The Sans-Chrome-Mono-Code Rule.
- **Do** use visible-but-restrained panel borders for surface separation — see The Panel-Border-Not-Shadow Rule.

### Don't:

- **Don't** drop marketing chrome (hero stacks, oversized CTAs, projection-floor display type). That's Deck territory.
- **Don't** use serif headings. The publishing register belongs to Editorial / Paper-ink / Whitepaper.
- **Don't** widen reading measure or display floor — see The Editor-Dense Rule.
- **Don't** strip the purple cast on surfaces to plain neutral. The purple-slate is what reads "editor."
- **Don't** override the chart palette to single-hue — the multi-hue syntax-token mapping is identity-load-bearing.
- **Don't** stack soft drop shadows on resting cards. Panel-flat is the move.
- **Don't** use warm-cream surfaces or warm primary accents. Those pull into Editorial / Paper-ink register.
