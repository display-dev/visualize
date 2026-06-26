---
name: Terminal
description: CRT / dev-tool register — mono everywhere, warm-coal surfaces, CRT-green accent. Dark-canonical; a comfortable terminal emulator at rest.

# Colors carry the shadcn-semantic slug names visualize templates already
# read. OKLCH per the visualize palette convention; Stitch's linter
# validates hex sRGB only and will warn on these strings — accepted
# trade for one source of truth and wide-gamut fidelity. Light-mode
# values only here (the Solarized-light interpretation); dark-mode
# (the canonical Terminal register) lives in the sidecar `tokens.css`.
canonical-canvas: dark
selection:
  mood: [developer, technical, organic, retro-tech]
  tone: [precise, pragmatic, calm, warm]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a precise, pragmatic, calm, warm register with developer, technical, organic, retro-tech visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

colors:
  background: "oklch(0.965 0.018 85)"
  foreground: "oklch(0.30 0.04 50)"
  card: "oklch(0.945 0.022 85)"
  card-foreground: "oklch(0.30 0.04 50)"
  popover: "oklch(0.945 0.022 85)"
  popover-foreground: "oklch(0.30 0.04 50)"
  primary: "oklch(0.48 0.15 145)"
  primary-foreground: "oklch(0.965 0.018 85)"
  secondary: "oklch(0.90 0.025 85)"
  secondary-foreground: "oklch(0.30 0.04 50)"
  muted: "oklch(0.90 0.025 85)"
  muted-foreground: "oklch(0.48 0.025 65)"
  accent: "oklch(0.88 0.028 85)"
  accent-foreground: "oklch(0.30 0.04 50)"
  destructive: "oklch(0.50 0.20 25)"
  destructive-foreground: "oklch(0.965 0.018 85)"
  border: "oklch(0.82 0.025 85)"
  input: "oklch(0.82 0.025 85)"
  ring: "oklch(0.55 0.13 145)"
  chart-1: "oklch(0.48 0.15 145)"
  chart-2: "oklch(0.55 0.16 60)"
  chart-3: "oklch(0.50 0.18 25)"
  chart-4: "oklch(0.48 0.14 240)"
  chart-5: "oklch(0.45 0.16 310)"
  sidebar: "oklch(0.94 0.022 85)"
  sidebar-foreground: "oklch(0.30 0.04 50)"
  sidebar-primary: "oklch(0.48 0.15 145)"
  sidebar-primary-foreground: "oklch(0.965 0.018 85)"
  sidebar-accent: "oklch(0.88 0.028 85)"
  sidebar-accent-foreground: "oklch(0.30 0.04 50)"
  sidebar-border: "oklch(0.82 0.025 85)"
  sidebar-ring: "oklch(0.55 0.13 145)"

typography:
  display:
    fontFamily: "var(--font-mono)"
    fontSize: "clamp(1.875rem, 4vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.25
  heading:
    fontFamily: "var(--font-mono)"
    fontSize: "1.4375rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "var(--font-mono)"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-mono)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 500
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.0625rem"
  md: "0.125rem"
  lg: "0.1875rem"
  xl: "0.25rem"

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
    backgroundColor: "{colors.ring}"
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

# Design System: Terminal

## 1. Overview: The Comfortable Emulator

**Creative North Star: "A Comfortable Terminal at Rest"**

Terminal is visualize's dev-tool / CLI register — the aesthetic reference is a comfortable terminal emulator (iTerm / Ghostty / Alacritty) with a hand-tuned colorscheme, not the default-from-install screenshot. Everything renders mono — headings, body, chrome — and the palette pairs warm-coal surfaces with a restrained CRT-green accent. Tight near-square radii (0.125rem) reinforce the register: terminals are not rounded.

**Dark is the canonical state.** The light interpretation is real (a tuned Solarized-light / paper-terminal aesthetic with warm-cream backdrop + warm-coal ink), not a stripped grayscale fallback — but Terminal is designed *against* the dark surface. The `:root` block carries light values here so the load order resolves correctly on raw-HTML viewing; the dark register lives in the sidecar `[data-theme="dark"]` block.

Terminal explicitly rejects: serif headings (publishing register belongs to Editorial / Paper-ink), saturated surface fills, multi-hue chart-as-painting palettes, wide reading-measure prose paragraphs, and the rounded-corner-with-soft-shadow vocabulary that marks marketing chrome. The mono identity + restrained green + warm coal is what makes Terminal Terminal.

**Key Characteristics:**
- Mono everywhere via `--font-display: var(--font-mono)` (the single load-bearing identity choice).
- Warm-coal dark / warm-cream light pair (hue 80–85, low chroma) — not pure black/white.
- CRT-green `--primary` (oklch 0.48 / 0.15 / 145 light; brighter on dark) on focus rings, primary CTAs, and the one semantic emphasis per artifact.
- Near-square radius scale (0.0625rem → 0.25rem). Terminals are not rounded.
- Body type at 15px with leading 1.55 — dev-doc rhythm, not long-form reading rhythm.

## 2. Colors: The Coal-and-Cream Palette

A two-chord palette: warm-coal / warm-cream neutrals (low chroma, hue ~85) paired with a single CRT-green accent and a discrete five-hue chart vocabulary (green / amber / red / blue / magenta — classic terminal palette).

### Primary
- **CRT Green** (`oklch(0.48 0.15 145)` light, brighter on dark): The one accent — focus rings, primary CTAs, the rare semantic emphasis. The chroma is restrained enough to survive the warm-cream backdrop without screaming.

### Neutral
- **Warm Cream Background** (`oklch(0.965 0.018 85)`): Body surface in light mode. The Solarized-light interpretation, not a stripped grayscale.
- **Warm Dark Brown Foreground** (`oklch(0.30 0.04 50)`): Primary text on cream. Reads as coal-on-paper.
- **Coal-Adjacent Muted** (`oklch(0.90 0.025 85)`): Secondary surfaces — chips, callouts.
- **Mid Coal Muted Foreground** (`oklch(0.48 0.025 65)`): Captions, recessed text.
- **Hairline Coal Border** (`oklch(0.82 0.025 85)`): Structural seams.

### State
- **Terminal Red** (`oklch(0.50 0.20 25)`): Destructive actions and errors. The classic terminal red, restrained.

### Chart Palette (the Terminal-Classic Five)
- **`--chart-1` Green** (`oklch(0.48 0.15 145)`), **`--chart-2` Amber** (`oklch(0.55 0.16 60)`), **`--chart-3` Red** (`oklch(0.50 0.18 25)`), **`--chart-4` Blue** (`oklch(0.48 0.14 240)`), **`--chart-5` Magenta** (`oklch(0.45 0.16 310)`): Discrete five-hue palette borrowing from the classic terminal-emulator color vocabulary. Not a gradient ramp — each hue is its own signal.

### Named Rules

**The One-Voice-Green Rule.** Surfaces stay warm-coal/cream. The CRT-green primary is the only chroma in the surface vocabulary; if a second hue appears, it's in the chart palette doing data work.

**The Discrete-Chart Rule.** Terminal's chart palette is five discrete hues (the classic terminal color vocabulary), not a gradient ramp. Multi-hue belongs to Terminal / Console / IDE — single-hue ramps belong to Clean.

## 3. Typography: Mono Everywhere

**Display Font:** mono stack (JetBrains Mono / Fira Code / SF Mono / ui-monospace)
**Body Font:** same mono stack
**Mono Font:** same

**Character:** Mono is the identity. `--font-display: var(--font-mono)` is the single load-bearing decision in this design system — headings, body, and chrome all render mono, with tight tracking reinforcing the terminal aesthetic. The mono face renders ~92% the size of sans at the same px, so Terminal's type scale floor is intentionally smaller than Clean's, and leading gets a touch of slack (1.55) since mono benefits from breathing room.

### Hierarchy

- **Display** (mono, weight 600, `clamp(1.875rem, 4vw, 2.75rem)`, leading 1.25): Hero titles. Smaller than Clean's display floor — mono outsizes sans at the same px.
- **Heading** (mono, weight 600, 1.4375rem, leading 1.25): Section headings.
- **Title** (mono, weight 500, 1.0625rem, leading 1.3): Sub-section heads.
- **Body** (mono, weight 400, 15px, leading 1.55): Paragraph copy. Dev-doc rhythm.
- **Label** (mono, weight 500, 0.875rem): CTA labels, metadata.
- **Mono** (mono, weight 400, 0.875rem): Inline code, fenced blocks.

### Named Rules

**The Mono-Display Rule.** `--font-display: var(--font-mono)` is non-negotiable. Reverting to sans display reads as "Clean with a green accent" — not Terminal. The mono everywhere is what makes the register.

**The Dev-Doc-Rhythm Rule.** Body at 15px with leading 1.55. Tighter than Editorial (17px / 1.65) because Terminal is for dev-doc, not long-form reading. Don't widen the reading measure.

## 4. Elevation

Extremely flat. Shadow scale is restrained — the terminal aesthetic is the opposite of glossy chrome. When elevation is needed (modals, hover lifts), shadows use coal-tinted alpha at very low values.

### Shadow Vocabulary

- **`--shadow-sm`** (coal-tinted, very low alpha): Hairline lift for hover states.
- **`--shadow-md`** / **`--shadow-lg`**: Reserved for floating UI.

### Named Rules

**The Terminal-Flat Rule.** Surfaces sit flat. Glossy drop shadows belong to marketing chrome; terminals don't have shadow vocabularies. When elevation is needed, it's subtle and coal-tinted.

## 5. Components

### Buttons

- **Shape:** Near-square (`--radius-md`, 0.125rem). Terminals are not rounded.
- **Primary:** CRT-green background, cream text, mono label, padding 0.5rem 1rem.
- **Hover:** Shifts to the brighter `--ring` green.
- **Secondary:** Coal-adjacent muted background, warm-coal text. Same near-square shape.
- **Focus:** `--ring` (green) outline. Visible keyboard focus, mono-aesthetic.

### Cards & Containers

- **Corner Style:** `--radius-md` (0.125rem). Near-square at rest.
- **Background:** `--card` (warm cream slightly deeper than `--background`).
- **Border:** Hairline 1px in `--border`. Visible — Terminal uses borders to delineate panels.
- **Internal Padding:** 1.25rem default. Tighter than Editorial's 1.5rem.

### Inputs / Fields

- **Style:** `--radius-sm` (0.0625rem), hairline `--border`, transparent or `--background`.
- **Focus:** `--ring` (green) border + soft outline glow.

### Navigation

- **Style:** Mono family, weight 500, label scale.
- **States:** Default `--foreground`; hover shifts to CRT-green `--primary`.

### Chart Palette + Code Blocks

Discrete five-hue palette (green/amber/red/blue/magenta) reads as terminal colorscheme rather than gradient data viz. Code blocks are first-class — templates can override `--syntax-*` tokens for diff backgrounds and the like (Terminal can keep diff backgrounds monochrome or warm-saturate them per template intent).

## 6. Do's and Don'ts

### Do:

- **Do** render headings mono via `--font-display: var(--font-mono)`. This is the identity — see The Mono-Display Rule.
- **Do** keep the radius scale near-square (0.0625rem → 0.25rem). Terminals are not rounded.
- **Do** use the CRT-green `--primary` on focus rings, primary CTAs, and the one semantic emphasis per artifact. Restraint is the move.
- **Do** keep surfaces warm-coal / warm-cream (hue 80–85). Strip to pure gray and the register is gone.
- **Do** trust the discrete chart palette — green / amber / red / blue / magenta — for data viz. Classic terminal vocabulary.
- **Do** treat code blocks as first-class. Templates may override `--syntax-*` tokens.

### Don't:

- **Don't** use serif headings. That's Editorial / Paper-ink / Whitepaper territory; serif-on-cream reads off-register against the terminal identity.
- **Don't** saturate surface fills with chroma. The green-primary is the only voice on surfaces.
- **Don't** use multi-hue chart palettes that bleed into surface treatment. Terminal's chart vocabulary is discrete signal, not surface decoration.
- **Don't** widen reading measure to long-form-publishing dimensions. Dev-doc rhythm — see The Dev-Doc-Rhythm Rule.
- **Don't** drop rounded marketing-style cards into Terminal artifacts. Near-square is the identity.
- **Don't** add glossy drop shadows, glow, or backdrop-filter glassmorphism — see The Terminal-Flat Rule.
- **Don't** strip the light interpretation to grayscale. "Light Terminal" is a real register (warm-cream + warm-coal + green), not an apology for the dark default.
