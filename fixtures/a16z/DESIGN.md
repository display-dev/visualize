---
name: Andreessen Horowitz
description: Restrained presentation register — tangerine on neutral chrome, lowercase wordmark, comfortable density.

colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.1450 0 0)"
  primary: "oklch(0.7 0.19 60)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.42 0.018 250)"
  secondary-foreground: "oklch(1 0 0)"
  muted: "oklch(0.9700 0 0)"
  muted-foreground: "oklch(0.5560 0 0)"
  border: "oklch(0.9220 0 0)"

typography:
  display:
    fontFamily: "Aktiv Grotesk, Söhne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Aktiv Grotesk, Söhne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Aktiv Grotesk, Söhne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  wordmark:
    fontFamily: "Aktiv Grotesk, Söhne, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"

rounded:
  sm: "2px"
  md: "4px"

spacing:
  md: "1rem"
  lg: "2rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.625rem 1.25rem"
---

# Design System: Andreessen Horowitz

## 1. Overview: The Restrained Position

**Creative North Star: "The Restrained Position"**

a16z's public surface is intellectual positioning — essays, research, podcasts — set in polished-restrained presentation chrome. The brand is loud through one signal (tangerine accent) and quiet everywhere else: generous whitespace, heavy lowercase wordmark, big-number tiles, no motion theatrics. The thesis is the artifact; chrome stays out of the way.

The register rejects: full-bleed tangerine washes, scroll-driven parallax, decorative gradients, capitalised wordmarks, neon-glow accents. The firm's voice is structural analysis; the design carries that same composure.

**Key Characteristics:**
- Tangerine on small chrome only — icon mark, eyebrow tags, CTAs, hover. Never as surface fill.
- Lowercase wordmark with period-between-names (`andreessen.horowitz`) is canonical brand signal.
- Comfortable density — generous whitespace around section headings and big-number tiles.
- Low motion — subtle hover transitions; no parallax, no bounce, no scroll-driven reveals.
- Heavy geometric sans throughout; type-base 17px for body.

## 2. Colors: Tangerine on Neutral Chrome

A monochrome chrome with one high-chroma accent. Tangerine is the defining signal — the icon mark and CTAs — and earns its chroma by brand identity.

### Primary
- **a16z Tangerine** (`oklch(0.7 0.19 60)`, `#ED8B00`): The brand accent. Icon square fill, CTAs, eyebrow tags, hover states. High-chroma by brand specification; lifted to `oklch(0.78 0.18 60)` in dark mode for contrast.

### Secondary
- **Abbey Slate** (`oklch(0.42 0.018 250)`, `#4B5058`): Softer-than-foreground tone for body chrome — footer text, secondary buttons, table-header surfaces.

### Neutral
- **White Background** (`oklch(1 0 0)`): Body and card surface.
- **Near-Black Foreground** (`oklch(0.1450 0 0)`): Primary text.
- **Mid-Gray Muted Foreground** (`oklch(0.5560 0 0)`): Captions, supporting metadata.
- **Hairline Border** (`oklch(0.9220 0 0)`): Section seams, table rules.

### Named Rules

**The Restrained-Tangerine Rule.** Tangerine lands on small chrome elements only — icon mark, eyebrow, CTAs, hover. Never as a full-bleed section fill or surface wash. The brand stays restrained.

## 3. Typography: Heavy Geometric Sans

**Display Font:** Aktiv Grotesk / Söhne (geometric sans, heavy weight)
**Body Font:** same family, lighter weight
**Mono Font:** rarely surfaces — essay code samples and tabular data only.

**Character:** One typeface across the surface, working through weight + size. Lowercase by brand convention on the wordmark; normal tracking on display and body; tight tracking (`-0.02em`) on the wordmark itself as part of its identity.

### Hierarchy
- **Display** (weight 700, `clamp(2rem, 5vw, 3rem)`, leading 1.1): Hero claims, thesis H1s.
- **Body** (weight 400, 17px, leading 1.6): Paragraph copy — calm long-form rhythm.
- **Label** (weight 500, 0.875rem, tracking 0.02em): Eyebrow tags, CTA labels, metadata.

### Named Rules

**The Lowercase Wordmark Rule.** `andreessen.horowitz` is set lowercase with the period-between-names as a brand signal. `a16z` is the short form. Never capitalise, never hyphenate.

## 4. Elevation

Flat by default. The marketing surface uses hairline borders (`--border`, 1px) to mark section seams and table rules — no resting shadows, no card lift. Shadows reserved for floating UI (dropdowns, modals) when present.

## 5. Components

### Buttons
- **Shape:** sharp (`--radius-sm`, ~2px). Not pill, not soft-rounded — the geometric posture extends to chrome.
- **Primary:** tangerine background, white text, weight 500, padding 0.625rem 1.25rem. Hover deepens chroma.
- **Secondary:** Abbey slate background, white text. Used on body chrome where tangerine would over-signal.

### Cards & Containers
- **Background:** white at rest.
- **Border:** hairline 1px in `--border`.
- **Padding:** generous — at least 2rem internal on big-number tiles.

### Wordmark / Icon
- **Wordmark:** lowercase heavy sans, period-between-names. White-on-tangerine or dark-on-white.
- **Icon:** white `a16z` lowercase on tangerine square. Favicon, avatar, social-share thumbnail.
- **Never combined** — pick one per context.

## 6. Do's and Don'ts

### Do:
- **Do** keep tangerine on small chrome — icon, eyebrow, CTA, hover. See The Restrained-Tangerine Rule.
- **Do** set the wordmark lowercase with the period-between-names. See The Lowercase Wordmark Rule.
- **Do** cite founder + company names directly when invoking a portfolio example.
- **Do** let big-number tiles breathe — generous whitespace around section heads.
- **Do** trust structural framing over rhetorical framing — the data point is the claim.

### Don't:
- **Don't** wash full-bleed sections in tangerine. The chroma is high; the surface area must stay small.
- **Don't** capitalise or hyphenate the wordmark. `Andreessen Horowitz` and `andreessen-horowitz` are off-brand.
- **Don't** combine wordmark and icon in the same composition.
- **Don't** add parallax, scroll-driven reveals, or bounce animation. The site is informational, not theatrical.
- **Don't** sand assertions into both-sides framing. The thesis is the artifact.
- **Don't** apply the marketing register to research reports — those carry their own serif + cream-paper sub-register documented separately.

<!--
Captured 2026-04-21 from a16z.com public surfaces (essays, podcast pages,
portfolio index) and the standalone State-of-* report microsites.
-->
