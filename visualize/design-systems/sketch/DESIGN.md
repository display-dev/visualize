---
name: Sketch
description: Hand-drawn wireframe register — pencil-grey foreground on warm paper, dashed/rough borders, off-axis shadows, handwriting-leaning display + mono body, intentional imperfection. The register that says "this is in-progress, not finished".

# Surfaces sit at hue 85 (slightly warm) at very low chroma — the
# warmth of newsprint or sketchbook paper. Foreground is pencil-grey
# (L 0.30) deliberately above pure-black; sketch ink isn't black,
# it's graphite. Primary is burnt-sienna (annotation pencil) and
# accent is chalk-blue (review marks).
canonical-canvas: light
selection:
  mood: [editorial, high-contrast, playful, tactile]
  tone: [calm, warm]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a calm, warm register with editorial, high-contrast, playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

colors:
  background: "oklch(0.97 0.005 85)"
  foreground: "oklch(0.30 0.006 85)"
  card: "oklch(0.99 0.003 85)"
  card-foreground: "oklch(0.30 0.006 85)"
  popover: "oklch(0.99 0.003 85)"
  popover-foreground: "oklch(0.30 0.006 85)"
  primary: "oklch(0.42 0.10 25)"
  primary-foreground: "oklch(0.97 0.005 85)"
  secondary: "oklch(0.93 0.008 85)"
  secondary-foreground: "oklch(0.30 0.006 85)"
  muted: "oklch(0.93 0.008 85)"
  muted-foreground: "oklch(0.55 0.006 85)"
  accent: "oklch(0.45 0.10 220)"
  accent-foreground: "oklch(0.97 0.005 85)"
  destructive: "oklch(0.52 0.20 25)"
  destructive-foreground: "oklch(0.97 0.005 85)"
  border: "oklch(0.55 0.010 85)"
  input: "oklch(0.55 0.010 85)"
  ring: "oklch(0.42 0.10 25)"
  chart-1: "oklch(0.42 0.10 25)"
  chart-2: "oklch(0.45 0.10 220)"
  chart-3: "oklch(0.50 0.08 140)"
  chart-4: "oklch(0.55 0.10 50)"
  chart-5: "oklch(0.40 0.08 280)"
  sidebar: "oklch(0.95 0.006 85)"
  sidebar-foreground: "oklch(0.30 0.006 85)"
  sidebar-primary: "oklch(0.42 0.10 25)"
  sidebar-primary-foreground: "oklch(0.97 0.005 85)"
  sidebar-accent: "oklch(0.45 0.10 220)"
  sidebar-accent-foreground: "oklch(0.97 0.005 85)"
  sidebar-border: "oklch(0.55 0.010 85)"
  sidebar-ring: "oklch(0.42 0.10 25)"

typography:
  display:
    fontFamily: "'Caveat', 'Patrick Hand', 'Comic Sans MS', cursive"
    fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0"
  heading:
    fontFamily: "'Caveat', 'Patrick Hand', cursive"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.15
  title:
    fontFamily: "var(--font-mono)"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  body:
    fontFamily: "var(--font-mono)"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "var(--font-mono)"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.06em"
    textTransform: "uppercase"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.625rem"

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
    padding: "0.5rem 0.875rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.primary}"

spacing:
  xs: "0.375rem"
  sm: "0.625rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.25rem"
---

# Design System: Sketch

## 1. Overview: In-Progress, Not Finished

**Creative North Star: "The Honest Wireframe"**

Sketch is visualize's intentionally-unfinished register — the wireframe a designer would draw on a notebook page, the prototype an engineer would mock up in a whiteboard photo, the "rough cut" feel that says explicitly *this is in-progress*. Pencil-grey foreground (not pure black), dashed borders, off-axis shadows, cursive-leaning display (Caveat / Patrick Hand fallback), and a body register that runs system mono — the "I scribbled this in a notebook" feel.

Use Sketch for early-stage proposals, prototype mockups, design crits, RFC drafts, internal "this isn't final" handouts — where the chrome's honesty matters more than the polish. The intentional imperfection is the trust signal: a Sketch artifact says "I haven't optimised this yet, please tell me what's wrong". Not for shipping content (the register reads as half-done — that's a feature for crits and a bug for production), not for high-trust contexts (annual reports, legal contracts).

**Key Characteristics:**
- Foreground at L 0.30 (pencil-grey, not pure black). Sketch ink is graphite, not jet.
- Borders dashed (`border-style: dashed`) by default in components — the wireframe register.
- Off-axis shadows on cards (`transform: rotate(-0.5deg)` on hero cards) — the "pinned to a wall" feel.
- Cursive display (Caveat / Patrick Hand / Comic Sans MS fallback) for H1/H2 — handwriting register.
- Body + label run mono — the engineering-notebook companion to the handwriting.
- Primary is burnt-sienna pencil at hue 25; accent is chalk-blue at hue 220. The annotation/review pencil pairing.

## 2. Colors: Pencil-Grey + Annotation Pair

A two-tier surface ramp (warm paper background + slightly-lighter sketch-sheet card) under pencil-grey foreground. Primary is an "annotation pencil" warm-burnt-sienna; accent is "review pencil" chalk-blue. Pencil ink doesn't print pure black; foreground at L 0.30 captures the graphite register.

### Surface Pair
- **Background** (`oklch(0.97 0.005 85)`): Warm sketchbook paper.
- **Card** (`oklch(0.99 0.003 85)`): Sketch sheet — slightly brighter, pinned to the page.

### Pencil Pair
- **Burnt-Sienna Primary** (`oklch(0.42 0.10 25)`): The annotation pencil. CTAs, important strokes, "this is the answer" marks.
- **Chalk-Blue Accent** (`oklch(0.45 0.10 220)`): The review pencil. Margin notes, alternates, "consider this" annotations.

### Named Rules

**The Pencil-Grey Foreground Rule.** `--foreground` sits at L 0.30 — graphite, not jet. Pure black foreground reads as printed type; the pencil-grey is the "scribbled" identity.

**The Dashed-Border Rule.** Borders default to `dashed`, not `solid`. The wireframe register asks the lines to read as "drawn quickly", not "manufactured precisely".

**The Off-Axis-Shadow Rule.** Cards may tilt slightly (`rotate(-0.5deg)` to `rotate(0.5deg)`) and cast a soft offset shadow. The "pinned to a wall" feel is part of the read. Use sparingly — every card tilted reads chaotic.

## 3. Typography: Handwriting Display + Mono Body

**Display Font:** cursive system fallback (Caveat / Patrick Hand / Comic Sans MS)
**Body Font:** system mono (`var(--font-mono)`)
**Mono Font:** system mono

Display + heading run a handwriting-leaning cursive font — the moment in a Sketch artifact that says "this came from a human's pen". Title runs uppercased mono (the engineering-notebook caption). Body + label run mono — Sketch is a sketchbook for *engineers and designers*, so the body register is the notebook-grid voice, not the prose-paragraph voice.

### Named Rules

**The Cursive-For-Display Rule.** Display + heading use cursive system fallback. The cursive is the load-bearing handwriting signal; replacing it with sans collapses the register.

**The Mono-Everywhere-Else Rule.** Body + title + label all mono. The split (cursive headlines + mono structure) IS the sketchbook voice.

## 4. Elevation: Off-Axis Soft

Cards may tilt and cast soft offset shadows (`box-shadow: 4px 4px 0 0 var(--border)`). The shadow is the "pinned" feel, not depth-lift. Sketch elevates by 2D offset, not 3D depth.

## 5. Components

### Buttons
- **Primary:** Burnt-sienna fill, paper text, dashed border, mono uppercased label.
- **Outline:** Transparent fill, 2px dashed primary border, primary text.

### Cards
- Dashed 2px `--border` border. Optional off-axis tilt (one direction per artifact). 4px offset shadow in `--border` colour.

### Annotations
- Margin comments in chalk-blue accent, mono italic. "←" arrow connectors via simple borders.

## 6. Do's and Don'ts

### Do:
- **Do** use Sketch for design crits, early-stage proposals, wireframe handouts.
- **Do** keep foreground at L 0.30 (graphite, not jet).
- **Do** use dashed borders. The wireframe register asks for them.
- **Do** tilt cards sparingly. One or two off-axis elements per page is the dose.

### Don't:
- **Don't** ship Sketch in production-facing content. The register reads as "not done yet".
- **Don't** use solid borders by default. The dashed pattern is the wireframe signal.
- **Don't** swap cursive display for sans. Cursive is the handwriting tell.
- **Don't** use Sketch for high-trust contexts (annual reports, legal docs, official announcements).
