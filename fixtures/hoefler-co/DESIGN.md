---
name: Hoefler & Co
description: Letterpress / hand-set typography register — the foundry's specimen-page voice, with Hoefler green as the structural accent.

# Light-mode values from the fixture. Shadcn-semantic slugs map onto
# visualize's `--background` / `--foreground` / `--primary` / etc. The
# foundry's marketing surface runs dark-canonical; those values live in
# the sidecar. OKLCH per visualize's palette convention.
colors:
  background: "oklch(0.97 0.008 85)"
  foreground: "oklch(0.18 0.01 245)"
  card: "oklch(0.97 0.008 85)"
  card-foreground: "oklch(0.18 0.01 245)"
  primary: "oklch(0.62 0.18 145)"
  primary-foreground: "oklch(0.97 0.008 85)"
  secondary: "oklch(0.7 0.18 60)"
  secondary-foreground: "oklch(0.18 0.01 245)"
  muted: "oklch(0.93 0.008 85)"
  muted-foreground: "oklch(0.42 0.01 245)"
  accent: "oklch(0.62 0.18 145)"
  accent-foreground: "oklch(0.97 0.008 85)"
  destructive: "oklch(0.577 0.245 27.325)"
  destructive-foreground: "oklch(0.97 0.008 85)"
  border: "oklch(0.85 0.008 85)"
  input: "oklch(0.85 0.008 85)"
  ring: "oklch(0.62 0.18 145)"

typography:
  display:
    fontFamily: "'Sentinel', 'Mercury Text', Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.1
  heading:
    fontFamily: "'Sentinel', 'Mercury Text', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "'Whitney', 'Whitney Display', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    letterSpacing: "0.08em"
  body:
    fontFamily: "'Mercury Text', Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Whitney', 'Whitney Display', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "0"
  md: "0"
  lg: "0"

spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.625rem 1.25rem"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.625rem 1.25rem"
---

# Design System: Hoefler & Co

## 1. Overview: The Specimen Page

**Creative North Star: "The Specimen Page"**

Hoefler & Co's visual identity is the letterpress / hand-set typography register — the voice of a foundry whose product *is* the typeface, and whose canonical artifact is a specimen page where running text demonstrates the work at multiple sizes and grades. The system reads as restrained, historically-grounded, and confident that the typography carries the page. Whitespace is a typographic element; chrome is minimal; the type does the work.

This system explicitly rejects the SaaS-landing-page vocabulary that would smother a specimen — no gradient washes, no decorative cards with elevated shadows, no rounded everything, no icon-per-heading. The foundry's audience already values typography; the design's job is to respect that by getting out of the way.

**Key Characteristics:**
- Type-led hierarchy via family, weight, size, and small-caps — never via color on headings.
- Warm-paper background paired with near-black ink; Hoefler green appears as the one structural accent on chrome and CTAs.
- Square corners across components — letterpress doesn't round.
- Optical-sizing distinctions preserved: text-grade and display-grade are different glyphs.
- Motion-free at rest on specimen pages.

## 2. Colors: Paper, Ink, and Hoefler Green

A two-step paper-ink palette: warm-paper background, near-black foreground, with Hoefler green as the one structural accent. Warm orange appears as a decorative secondary in typographic-ornament showcases.

### Primary
- **Hoefler Green** (`oklch(0.62 0.18 145)`): The structural accent — the live foundry's accent on the `&` mark in the logo, the "Sign In" chrome, the cart icon, and primary CTAs. Replaced the earlier deep-crimson accent the brand once carried.

### Secondary
- **Warm Orange** (`oklch(0.7 0.18 60)`): Decorative — typographic ornaments and showcase glyphs. Not used on chrome.

### Neutral
- **Warm Paper Background** (`oklch(0.97 0.008 85)`): Body, card, and surface — the specimen-page canvas.
- **Near-Black Foreground** (`oklch(0.18 0.01 245)`): Primary text. Slightly slate-cool to read as ink-on-paper.
- **Muted Paper** (`oklch(0.93 0.008 85)`): Recessed panels, callouts.
- **Muted Foreground** (`oklch(0.42 0.01 245)`): Captions, metadata, supporting copy.
- **Hairline Border** (`oklch(0.85 0.008 85)`): Structural seams in specimen tables — 1px, never decorative.

### Named Rules

**The Paper-Ink Rule.** Surfaces stay warm-paper; ink stays near-black. Color appears as the green accent on chrome and CTAs — not as a surface wash.

**The One-Accent Rule.** Hoefler green is the only chrome color. No second accent on links, headings, or section markers.

## 3. Typography: The Catalogue Voice

**Display Font:** Sentinel (with Mercury Text, Georgia fallback) — serif display at large sizes.
**Body Font:** Mercury Text (with Georgia fallback) — drawn for editorial running text at 17px.
**Label/Chrome Font:** Whitney — small-caps and tracked labels for section headers and chrome.
**Mono Font:** `ui-monospace` system stack — only when the artifact demands code.

**Character:** The foundry's own typefaces carry the page. Sentinel-grade serifs hold display; Mercury Text holds running prose at 17px; Whitney holds chrome with the small-caps treatment that's a brand signal.

### Hierarchy

- **Display** (Sentinel, weight 400, `clamp(2.5rem, 6vw, 4rem)`, leading 1.1): Hero titles, specimen headlines.
- **Heading** (Sentinel, weight 500, 2rem, leading 1.2): Section headings.
- **Title** (Whitney, weight 500, 1.0625rem, tracked 0.08em): Sub-section labels — often set in small-caps.
- **Body** (Mercury Text, weight 400, 17px, leading 1.55): Running prose. Max ~65ch for readable line length.
- **Label** (Whitney, weight 500, 0.8125rem, tracked 0.1em): Chrome labels, metadata, button text — small-caps canonical.
- **Mono** (system mono, 0.875rem): Inline code only when needed; the foundry doesn't ship a monospace.

### Named Rules

**The Small-Caps Rule.** Whitney small-caps on section headers is a brand signal, not a typographic affectation. The slop rule against small-caps on section headers is whitelisted here.

**The Optical-Sizing Rule.** Text-grade and display-grade are different glyphs. Don't unify to a single grade — the foundry distinguishes them in every specimen, and the prose pipeline preserves the distinction.

## 4. Elevation

Flat. The foundry's public surface is paper-shaped — specimen pages don't lift, hover, or animate. Depth is conveyed by the hairline border in specimen tables and by the typographic rhythm between sections. The marketing-site showcase panels carry subtle transitions; the specimen-page register this design system codifies does not.

### Named Rules

**The Paper Rule.** No box-shadows on specimen content. Depth is typographic — leading, weight, and tracking — not optical lift.

## 5. Components

### Buttons

- **Shape:** Square (`--radius-sm` = 0). Letterpress doesn't round.
- **Primary:** Hoefler green background, warm-paper text, Whitney label at 0.8125rem tracked 0.1em — small-caps canonical. Padding 0.625rem 1.25rem.
- **Secondary:** Warm-paper background, near-black text, hairline border. Same shape, lower visual weight.
- **Focus:** Hoefler green ring outline; keyboard focus is non-negotiable.

### Cards & Containers

- **Corner Style:** Square (`--radius-sm` = 0).
- **Background:** Warm-paper `--card`.
- **Border:** Hairline 1px in `--border` for specimen tables; bare prose otherwise.
- **Shadow:** None.
- **Internal Padding:** 2rem default; specimen tables compress to 1rem for font-weight-grid density.

### Inputs / Fields

- **Style:** Square corners, hairline `--border`, warm-paper background.
- **Focus:** Hoefler green border + soft outline at low alpha.

### Navigation

- **Style:** Whitney small-caps, 0.8125rem, tracked 0.1em.
- **States:** Default near-black; hover shifts to Hoefler green. No underline at rest; underline appears on hover for prose links only.

### Specimen Table

- Decimal-aligned pricing column is canonical, not a generic data-table chrome decision. Hairline 1px row dividers; Whitney small-caps column headers; Mercury Text for body content.

## 6. Do's and Don'ts

### Do:

- **Do** keep surfaces warm-paper and ink near-black. Hoefler green is the only chrome accent — see The Paper-Ink Rule.
- **Do** carry hierarchy through family, weight, size, and tracking. Type does the work.
- **Do** use Whitney small-caps on section headers and chrome labels — it's a brand signal.
- **Do** preserve text-grade vs display-grade optical-sizing distinctions. Don't unify glyphs.
- **Do** respect whitespace as a typographic element — generous between sections, compact in specimen tables.
- **Do** treat decimal-aligned pricing tables as canonical, not as generic data chrome.

### Don't:

- **Don't** introduce gradient washes, glassmorphism, or decorative drop shadows. The foundry's surface is paper-shaped.
- **Don't** add a second chrome accent. Hoefler green is the one — no crimson, no purple, no link-blue.
- **Don't** round corners. Letterpress doesn't round; `--radius` stays at 0 across buttons, cards, and inputs.
- **Don't** decorate section headers with icons, rules, or color. Small-caps and tracking carry the break.
- **Don't** animate specimen content. Motion belongs to the marketing showcase sub-register, not the specimen page.
- **Don't** soften typographic terminology in prose pipelines — ligature, x-height, optical size, grade, hinting, kerning pair are the audience's vocabulary.

---

<!-- Captured: 2026-05-19 from https://www.typography.com — Hoefler green verified as the live primary accent (logo `&` mark, sign-in chrome, cart icon). The earlier fixture incorrectly claimed deep-crimson + warm-paper background; the live marketing surface uses dark slate + green. The paper-ink register the fixture above codifies still holds for *specimen pages*, where designers actually evaluate typefaces; the dark-slate editorial-showcase wrapper is a marketing sub-register (`marketing / showcase`) that lives outside this design system. Slop exceptions: `slop/serif-on-display` and `slop/small-caps-on-section-headers` are whitelisted here — the register *is* serif display and small-caps. -->
