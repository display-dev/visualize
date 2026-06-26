---
name: 37signals
description: Raw / opinionated-manifesto register. Full-bleed teal-cyan surface, heavy display sans, zero motion, content-as-content.

# Light-mode normative values. Brand-overlay sits on the Brutalist base
# design system; surface treatment (teal as full-bleed) is the brand's
# unusual move. OKLCH per the visualize palette convention.
colors:
  background: "oklch(0.62 0.10 205)"
  foreground: "oklch(1 0 0)"
  primary: "oklch(0.62 0.10 205)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.72 0.12 55)"
  border: "oklch(1 0 0)"
  destructive: "oklch(0.55 0.22 25)"

typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontWeight: 400

rounded:
  none: "0"

spacing:
  md: "1rem"
  lg: "2rem"

components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
---

# Design System: 37signals

## 1. Overview: The Opinionated Manifesto

**Creative North Star: "The Opinionated Manifesto"**

37signals is the canonical real-world example of bare-HTML manifesto layout — numbered lists, no decoration, no transitions, content-as-content. The design system carries the company's voice: short sentences, direct claims, position-taking as the default mode. The surface itself takes a position — a single full-bleed teal-cyan with white text on top, no marketing chrome, no logo wall, no hero illustration.

This sits on the Brutalist base design system as a brand overlay: Brutalist's flat hard-drop shadow, full-strength foreground borders (`--border` equals `--foreground`), and tightest-in-catalogue leading (`--leading-tight: 1.0`) stay theme-resolved. The brand-specific override is the teal as full-bleed surface — most Brutalist artifacts won't take it that far.

37signals explicitly rejects: neutral phrasing, "trusted by" logo walls, scroll-driven animation, hover-reveals, marketing gradients, soft rounded corners, and any "transforming the way teams work" prose chrome.

**Key Characteristics:**
- Full-bleed teal-cyan surface — the brand's unusual decision, not chrome-only accent.
- Heavy display sans, white-on-teal, tight tracking, type-base 17px.
- Zero motion: no transitions, no scroll effects, no hover choreography.
- Centered prose acceptable on the numbered-manifesto layout; body prose otherwise left-aligned.

## 2. Colors: The Single-Surface Palette

A one-colour brand: 37signals teal-cyan as the surface, white as the foreground. The previous orange/black identity is retired; one small orange accent remains on the signal-bars icon as a residual mark.

### Primary
- **37signals Teal-Cyan** (`oklch(0.62 0.10 205)`, ~`#329BAC`): The full-bleed surface colour. Used as the entire homepage background with white text on top. Chroma sits under the slop-detector ceiling; the unusual move is using it as a surface rather than as a chrome accent.

### Neutral
- **Pure White Foreground** (`oklch(1 0 0)`): Type, borders, all structural marks on the teal surface.

### Secondary (residual)
- **Muted Orange** (`oklch(0.72 0.12 55)`): The signal-bars icon next to the wordmark. Legacy brand colour kept as a small residual accent; not used on artifact chrome.

### State
- **Cadmium Red** (`oklch(0.55 0.22 25)`): Brutalist default, retained. The brand whitelists high-chroma red as a register signal (DHH writing about something he's mad about) on opinion-led pages, but the Postmortem genre-reflex guard still applies to operational artifacts.

### Named Rules

**The Single-Surface Rule.** The teal carries the whole page. No second surface colour, no card tinting, no gradient wash. White type and white borders do the structural work.

## 3. Typography: Heavy Geometric Sans

**Display Font:** heavy display-weight sans (`ui-sans-serif` family with display-weight loading)
**Body Font:** same family, lighter weight, white-on-teal
**Mono Font:** `ui-monospace` system stack — used sparingly for version numbers, identifiers, technical code

**Character:** Sturdy geometric sans, heavy display weight, tight tracking (-0.02em). The visual signal is *heavy display-weight sans*, not a specific licensed font — the spec treats this as the system stack with weight doing the work. Type-base 17px on the homepage manifesto.

### Named Rules

**The Tight-Tracking Rule.** Letter-spacing sits at -0.02em across display and body. Brutalist's tightest-in-catalogue leading (1.0) holds — headings stack with no air, sentences read as blocks.

## 4. Elevation

Flat. No shadows, no layering, no depth. Brutalist's hard-drop shadow is theme-resolved when used, but the 37signals homepage uses no elevation at all — everything sits on the one surface. Borders carry whatever separation the layout needs.

## 5. Components

### Buttons
- **Shape:** Sharp corners (`rounded: 0`). No radius, no softening.
- **Primary:** White background, teal text, weight 500, padding 0.75rem 1.5rem. Sits inverted against the teal surface.
- **No hover state.** The brand ships zero motion; buttons do not animate on hover.

### Borders
- **Style:** Full-strength white, 1px or thicker, no softening. `--border` equals `--foreground` per Brutalist. Used to separate manifesto sections and frame standalone callouts.

### Navigation
- **Style:** Heavy display sans, lowercase wordmark `37signals`, paired with the small signal-bars icon (legacy orange accent). White-on-teal is the current version; black-on-white was the previous identity.

## 6. Do's and Don'ts

### Do:
- **Do** use the teal-cyan as a full-bleed surface — see The Single-Surface Rule.
- **Do** keep tracking tight (-0.02em) and leading tight (1.0). Heavy sans, no air.
- **Do** ship zero motion. No transitions, no scroll effects, no hover-reveals.
- **Do** center prose on the numbered-manifesto layout; left-align body prose elsewhere.
- **Do** keep the edge in copy. The brand's value is the position.

### Don't:
- **Don't** introduce a second surface colour, card tint, or gradient wash. One surface.
- **Don't** soften corners. Sharp edges across all components.
- **Don't** add hover transitions, scroll-driven sequences, or animation of any kind.
- **Don't** sand the voice into neutral phrasing — neutral reads as betrayal to this audience.
- **Don't** apply the saturated-red wall to operational artifacts. Postmortem genre-reflex guard still applies.

<!--
Captured 2026-05-19 from https://37signals.com — primary value (teal-cyan,
~#329BAC) verified against the homepage background fill. The brand
redesigned away from its earlier orange/black brutalism; this fixture
replaces the 2026-04 capture.
-->
