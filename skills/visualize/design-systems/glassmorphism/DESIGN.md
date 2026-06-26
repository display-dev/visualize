---
name: Glassmorphism
description: Backdrop-filter blur on semi-transparent surfaces stacked over a vibrant background gradient. Cool palette (violet-cyan), light-canonical, modern marketing register. Surfaces carry alpha; the page beneath them is what the glass refracts.

# Surfaces deliberately carry alpha — the "glass" reads only when the
# background it sits over is non-uniform (gradient mesh, image, or
# coloured wash). The preview template provides a default mesh; real
# artifacts using glassmorphism are expected to supply their own
# coloured backdrop. OKLCH with alpha component on translucent slots.
canonical-canvas: light
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

colors:
  background: "oklch(0.96 0.020 240)"
  foreground: "oklch(0.22 0.025 250)"
  card: "oklch(0.99 0.005 240 / 0.55)"
  card-foreground: "oklch(0.22 0.025 250)"
  popover: "oklch(0.99 0.005 240 / 0.55)"
  popover-foreground: "oklch(0.22 0.025 250)"
  primary: "oklch(0.55 0.22 275)"
  primary-foreground: "oklch(0.99 0 0)"
  secondary: "oklch(0.95 0.020 200 / 0.50)"
  secondary-foreground: "oklch(0.22 0.025 250)"
  muted: "oklch(0.94 0.015 240 / 0.50)"
  muted-foreground: "oklch(0.48 0.025 245)"
  accent: "oklch(0.70 0.18 195)"
  accent-foreground: "oklch(0.22 0.025 250)"
  destructive: "oklch(0.58 0.22 25)"
  destructive-foreground: "oklch(0.99 0 0)"
  border: "oklch(0.85 0.020 240 / 0.45)"
  input: "oklch(0.85 0.020 240 / 0.45)"
  ring: "oklch(0.55 0.22 275)"
  chart-1: "oklch(0.62 0.22 275)"
  chart-2: "oklch(0.68 0.20 220)"
  chart-3: "oklch(0.72 0.18 195)"
  chart-4: "oklch(0.70 0.20 320)"
  chart-5: "oklch(0.65 0.18 160)"
  sidebar: "oklch(0.95 0.015 240 / 0.55)"
  sidebar-foreground: "oklch(0.22 0.025 250)"
  sidebar-primary: "oklch(0.55 0.22 275)"
  sidebar-primary-foreground: "oklch(0.99 0 0)"
  sidebar-accent: "oklch(0.70 0.18 195)"
  sidebar-accent-foreground: "oklch(0.22 0.025 250)"
  sidebar-border: "oklch(0.85 0.020 240 / 0.45)"
  sidebar-ring: "oklch(0.55 0.22 275)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(2.25rem, 5.5vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "var(--font-sans)"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.5rem"
  md: "0.875rem"
  lg: "1.25rem"
  xl: "1.75rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.625rem 1.25rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.lg}"
    padding: "1.75rem"
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
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "3rem"
---

# Design System: Glassmorphism

## 1. Overview: Glass Over Colour

**Creative North Star: "The Backdrop is the Brand"**

Glassmorphism is visualize's translucent-surface register. The defining mechanism is `backdrop-filter: blur()` on semi-transparent cards over a vibrant non-uniform background — a gradient mesh, an image, a coloured wash. The glass reads as glass *only because* the colour beneath it refracts through; on a solid background it collapses into a flat semi-transparent rectangle and the identity disappears.

Use Glassmorphism for marketing landing pages, product hero sections, premium SaaS announcements, AI-tool launch surfaces — content where the visual register is "polished, modern, layered." Not for long-form prose (the gradient backdrop competes for attention), not for technical documentation (the polish reads as marketing), not for dashboards (the blur cost on many surfaces is performance-prohibitive at scale).

**Key Characteristics:**
- Surface tokens carry alpha (`oklch(... / 0.55)` on `--card`, `--popover`, `--sidebar`; `oklch(... / 0.45)` on `--border` and `--input`).
- Backdrop is the responsibility of the artifact: every template using Glassmorphism must provide a coloured / gradient / image backdrop on `body` or a wrapper. The preview template ships a default mesh as an example.
- `--primary` is vivid violet-blue (hue 275) — the modern-web standard accent register paired against cyan accent (hue 195).
- Generous radius (`--radius-lg` = 1.25rem; `--radius-xl` = 1.75rem) — soft glass corners are part of the read.
- Typography is contemporary sans at modest weights — heavy display would fight the soft glass.

## 2. Colors: Cool Palette, Translucent Surfaces

A cool-leaning palette anchored on hue 240 (cool neutral) and pulled toward 275 (violet-blue primary) and 195 (cyan accent). Light-canonical; the dark register exists but glass-on-dark reads as "smoked glass" rather than the canonical clear-glass-on-bright register.

### Surfaces (with alpha)
- **Background** (`oklch(0.96 0.020 240)`): The base canvas. Solid (no alpha). Tinted cool — the preview template overlays a gradient mesh on top.
- **Card** (`oklch(0.99 0.005 240 / 0.55)`): Glass surface. 55% opaque white with a slight cool cast. `backdrop-filter: blur(20px)` applied at component level.
- **Border** (`oklch(0.85 0.020 240 / 0.45)`): Translucent borders that read as the edge of glass. Hairline 1px.

### Accents
- **Violet-blue Primary** (`oklch(0.55 0.22 275)`): The brand voltage. CTAs, focus rings, glow-shadow base.
- **Cyan Accent** (`oklch(0.70 0.18 195)`): The cool counterpart. Inline highlights, badges, "active state" indicators.

### Named Rules

**The Backdrop-Required Rule.** Glassmorphism only reads as glass when the page beneath it is non-uniform. Every artifact using Glassmorphism must supply a backdrop (gradient mesh, image, photographic background). The preview ships a default mesh; production templates must override or inherit.

**The Backdrop-Filter-On-Surfaces-Only Rule.** Apply `backdrop-filter: blur()` to `--card`, `--popover`, `--sidebar` surfaces — never to text. Blurred text becomes unreadable.

**The Two-Tone Accent Rule.** Violet-blue primary + cyan accent are the system's identity. A third high-chroma accent collapses the glass register into generic-tech.

## 3. Typography

**Display Font:** system sans (`var(--font-sans)`)
**Body Font:** system sans
**Mono Font:** system mono

Contemporary sans at modest weights (display 600, heading 500, body 400). The glass register asks the type to recede so the layered surfaces can do the work; heavy display would fight the soft, polished feel.

## 4. Elevation: Blur, Not Shadow

Replace depth shadows with `backdrop-filter: blur()`. Cards lift off the background by refracting it, not by casting a shadow downward. A subtle `box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset` on top edges adds a "highlight" that completes the glass illusion.

## 5. Components

### Cards
- **Background:** `var(--card)` (translucent white with backdrop-filter).
- **Border:** Hairline `var(--border)` (translucent edge).
- **Backdrop filter:** `blur(24px) saturate(120%)`.
- **Inner highlight:** `box-shadow: inset 0 1px 0 rgba(255,255,255,0.6)`.

### Buttons
- **Primary:** Violet-blue fill, white text, soft `--radius-md`.
- **Glass:** Translucent fill (same alpha pattern as cards), backdrop blur, primary border on hover.

## 6. Do's and Don'ts

### Do:
- **Do** supply a colourful backdrop (gradient mesh, image) on every Glassmorphism artifact. The glass needs something to refract.
- **Do** apply `backdrop-filter: blur()` to surfaces, not text.
- **Do** keep accents to violet-blue + cyan. Two-tone is the identity.
- **Do** use generous radius. Soft corners are part of the read.

### Don't:
- **Don't** use Glassmorphism for long-form prose. The backdrop competes for attention.
- **Don't** stack glass on glass on glass (three+ layers). Beyond two layers, the blur degrades to mud.
- **Don't** apply `backdrop-filter` to small UI like badges. Performance + visual mush.
- **Don't** use solid surfaces with this register — that's not glass, that's frosted plastic.
