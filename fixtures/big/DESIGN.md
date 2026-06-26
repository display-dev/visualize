---
name: Bjarke Ingels Group
description: Architecture-first monochrome — grayscale-on-white marketing wrapping a technical-drawing format-default.

colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.25 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.25 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.25 0 0)"
  primary: "oklch(0.25 0 0)"
  primary-foreground: "oklch(0.98 0 0)"
  secondary: "oklch(0.55 0 0)"
  secondary-foreground: "oklch(0.98 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.55 0 0)"
  accent: "oklch(0.97 0 0)"
  accent-foreground: "oklch(0.25 0 0)"
  destructive: "oklch(0.5770 0.2450 27.3250)"
  destructive-foreground: "oklch(1 0 0)"
  border: "oklch(0.92 0 0)"
  input: "oklch(0.92 0 0)"
  ring: "oklch(0.55 0 0)"

typography:
  display:
    fontFamily: "Aktiv Grotesk, Neue Haas Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Aktiv Grotesk, Neue Haas Grotesk, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Aktiv Grotesk, Neue Haas Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "Aktiv Grotesk, Neue Haas Grotesk, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Aktiv Grotesk, Neue Haas Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.05em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400

rounded:
  sm: "0"
  md: "0"
  lg: "0"

spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.625rem 1.25rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.sm}"
    padding: "1.5rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
---

# Design System: Bjarke Ingels Group

## 1. Overview: The Architectural Document

**Creative North Star: "The Architectural Document"**

BIG's visual identity reads as a working architectural document — monochrome on white, with project photography and silhouette icons carrying any colour the page needs. The marketing site stays grayscale; the firm's books (*Yes Is More*, *Hot to Cold*, *Formgiving*) stay paper-white. Density follows the artifact: comfortable on the project grid, compact on the densely-labelled axonometric drawings inside case studies.

The format-default is technical-drawing — Blueprint register — even though the live big.dk surface is grayscale-photography clean. The grayscale is the wrapper around the diagrams.

**Key Characteristics:**
- Monochrome charcoal-on-white; no chromatic brand accent.
- Sharp rectangular edges everywhere — no rounded corners.
- Project silhouette icons as a defining brand-graphic element.
- Type set in heavy geometric sans with tight display tracking.

## 2. Colors: The Monochrome Palette

A two-step neutral palette with no chromatic brand accent. Project photography and small black silhouette icons carry any colour the page needs.

### Primary
- **Charcoal** (`oklch(0.25 0 0)`): The single structural value — wordmark, headings, body text, button fills. Effectively the foreground colour.

### Neutral
- **White Background** (`oklch(1 0 0)`): Body, card, and surface fills.
- **Mid Gray** (`oklch(0.55 0 0)`): Caption text, project location labels, secondary navigation.
- **Hairline Border** (`oklch(0.92 0 0)`): 1px structural seams on the project grid.

### State
- **Planning Red** (`oklch(0.5770 0.2450 27.3250)`): Reserved for planning-context callouts in case studies ("infeasible site condition"), not for alarm chrome.

### Named Rules

**The No-Brand-Accent Rule.** The brand carries no chromatic primary. If a diagram inside a case study uses saturated red / yellow / blue for program / circulation / structure coding, those are diagram-internal accents — never promoted to brand chrome.

## 3. Typography: The Geometric Document

**Display Font:** Aktiv Grotesk / Neue Haas Grotesk (geometric sans)
**Body Font:** same family, lighter weight
**Mono Font:** `ui-monospace` for dimensions, coordinates, generative-design code

**Character:** A single geometric-sans family does the work across display, body, and small-caps eyebrows. Tight tracking on display sizes (-0.02em); loose tracking on small-caps tags (0.05em).

### Hierarchy

- **Display** (weight 700, `clamp(2rem, 5vw, 3rem)`, tracking -0.02em): Project titles, wordmark settings.
- **Heading** (weight 600, 1.5rem): Case-study section heads.
- **Title** (weight 500, 1.125rem): Sub-section heads, project meta.
- **Body** (weight 400, 15px, leading 1.55): Paragraph copy. The 15px base is slightly compressed for the dense-caption register architecture diagrams require.
- **Label** (weight 500, 0.75rem, tracking 0.05em): Nav small-caps ("ARCHITECTURE  INTERIORS  LANDSCAPE"), eyebrow tags.
- **Mono** (0.8125rem): Dimensions, site coordinates.

### Named Rules

**The Small-Caps Eyebrow Rule.** Nav and section tags are set in small-caps with 0.05em letterspacing — a specific BIG signal, not a generic-SaaS treatment.

## 4. Elevation

Flat. The firm's documents — case studies, books, marketing site — are paper-flat. No drop shadows, no card lift, no backdrop blur. Depth, when needed, comes from the diagram itself (plan + section pairs, axonometric stacking).

### Named Rules

**The Paper-Flat Rule.** No shadows on surfaces. The book and the architectural drawing are the reference, not the SaaS card.

## 5. Components

### Buttons
- **Shape:** Sharp rectangle (radius 0). No rounded corners anywhere.
- **Primary:** Charcoal background, white text, small-caps label (weight 500, tracking 0.05em), padding 0.625rem 1.25rem.

### Cards & Project Tiles
- **Corner Style:** Sharp rectangle (radius 0).
- **Background:** White.
- **Border:** Optional 1px hairline gray for grid structure.
- **Hover:** Subtle reveal on project tiles — photography or silhouette icon swaps; no transform, no scroll-driven choreography.

### Navigation
- **Style:** Small-caps, weight 500, 0.05em letterspacing, charcoal at rest.
- **States:** Mid-gray on hover. No underline.

### Project Silhouette Icons
- **Treatment:** Small black silhouette icons (stylised cropped views of each building) used as project-listing markers. A defining brand-graphic element — whitelisted as a slop-icon-tile-stack exception, not generic-SaaS icon decoration.

## 6. Do's and Don'ts

### Do:
- **Do** keep every surface monochrome on white. Photography and silhouette icons carry colour — see The No-Brand-Accent Rule.
- **Do** use sharp rectangles (radius 0) on every component. No rounded corners.
- **Do** set nav and section tags in small-caps with 0.05em letterspacing — see The Small-Caps Eyebrow Rule.
- **Do** treat project silhouette icons as first-class brand graphics on project listings.
- **Do** preserve diagram callouts and conceptual annotations as content, not chrome.

### Don't:
- **Don't** invent a blueprint-blue or any other chromatic brand accent. The live big.dk surface is monochrome; promoting a diagram-internal colour to brand chrome is the failure mode.
- **Don't** round corners. The architectural document is rectangular.
- **Don't** add drop shadows, backdrop-filter glassmorphism, or scroll-driven parallax — see The Paper-Flat Rule.
- **Don't** generalize project naming. `8 House`, `LEGO House`, `Mars Science City` are canonical.

<!--
Captured 2026-05-19 from https://big.dk — primary value verified as
monochrome (no blueprint-blue accent on the live site, contrary to the
earlier fixture which invented one from the architecture trope). The
Blueprint design-system pairing still holds because the firm's
format-default (case studies with axonometric diagrams) is
technical-drawing-register; the marketing-site grayscale is the wrapper
around that.
-->
