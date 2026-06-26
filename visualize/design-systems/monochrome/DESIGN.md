---
slug: monochrome
name: Monochrome
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/monochrome/raw.md (Superdesign "Minimalist Monochrome" — author Zhou Jason, designprompt.dev)
  - principles: editorial-luxury register — high-end editorial print, exhibition monographs, gallery catalogues; strict #000 / #FFF palette with #F5F5F5 + #525252 as the only muted neutrals
canonical-canvas: dark
selection:
  mood: [minimal, productivity, monochrome]
  tone: [confident, polished]
  formality: medium
  density: low
  canonical_canvas: dark
  best_for: |
    Use for high-impact, low-copy artifacts that need a confident, polished register with minimal, productivity, monochrome visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Monochrome

A design system that strips chroma out entirely and lets typography, scale, and negative space carry the entire visual register. Editorial-luxury — the print logic of a high-end magazine spread or an exhibition monograph, ported to a screen and rendered without compromise. The discipline is the differentiator: there is no accent colour anywhere in the system, and the rule is not aspirational. The only colours in the token surface are pure black, pure white, and two near-zero-chroma greys that exist solely as muted body neutrals.

## §1 Canonical canvas

The canonical canvas is **light** — pure white (`#FFFFFF`) ground with pure black ink. The system also documents a second register, an **inverted dark surface** (`#000000` ground, `#FFFFFF` ink), but the dark surface is not a theme — it is a state-change vocabulary. Color inversion is how the system signals emphasis, hover, focus, and section punctuation in lieu of an accent colour. A whole page may be authored on the inverted ground (the Stats and final-CTA sections in the source spec do exactly this), but the inversion is a deliberate dramatic move, not a per-user preference.

| Surface | Source | Canvas | Notes |
|---|---|---|---|
| Article body / hero / pricing / blog grid | raw.md §"What This Design Is NOT", §"The DNA" | `#FFFFFF` ground, `#000000` ink | Default canvas — the editorial register lives here |
| Stats section | raw.md §"Inverted Stats Section" | `#000000` ground, `#FFFFFF` ink, vertical-line texture overlay (3% white) | Inverted as state-change, not as theme |
| Final CTA / closing band | raw.md §"Bold Choices" | `#000000` ground, `#FFFFFF` ink, radial-gradient white texture (5%) | Inversion + texture, paired |
| Hover surface (cards, buttons, pricing tiers) | raw.md §"Effects & Animation" | Inverts on hover (100 ms transition) | Color inversion replaces the conventional accent-colour hover lift |

The dark-mode block in `tokens.css` carries the inverted ground as the active theme so that a `[data-theme="dark"]` page reads as a coherent editorial dark, not as a one-section accent. The brand register itself is single-polarity at the conceptual level (the spec opens with "Pure black & white palette"); the inversion is what supplies dark-mode equivalence.

## §2 Palette

Every value in this section is documented in `raw.md` §"Design Token System". All hex values are converted to OKLCH via vendored culori. The strict no-chroma rule holds: every token in the palette has chroma `0.0000` and hue `0`.

### Brand primary

- `--primary`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: `temp/refs/monochrome/raw.md` — `accent: #000000 (Black IS the accent)`. The token is named `--primary` only because the shadcn-core contract requires the slot; black functions as the primary, the accent, and the foreground simultaneously in this system.

The system documents no secondary brand colours. Per raw.md: *"Rule: No other colors. Ever. The palette is absolute."* The synthesis anti-pattern (`--brand-black-deep`, `--brand-black-on-light`) is impossible here by construction — there is nothing to lighten or darken to.

### Canvas + neutrals

- `--background`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: raw.md — `background: #FFFFFF (Pure white)`.
- `--foreground`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: raw.md — `foreground: #000000 (Pure black)`.
- `--card`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: raw.md — `card: #FFFFFF (White cards)`.
- `--card-foreground`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: raw.md — `cardForeground: #000000`.
- `--popover`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Mirrors `--card`; popovers in this register are visually indistinguishable from a sharp-edged card.
- `--popover-foreground`: `oklch(0.0000 0.0000 0)` (= `#000000`).
- `--muted`: `oklch(0.9702 0.0000 0)` (= `#F5F5F5`). Live: raw.md — `muted: #F5F5F5 (Off-white for subtle backgrounds)`. The only documented muted-surface value.
- `--muted-foreground`: `oklch(0.4386 0.0000 0)` (= `#525252`). Live: raw.md — `mutedForeground: #525252 (Dark gray for secondary text)`. The only documented muted-ink value. AA-clear against `--background` (4.7:1) and `--muted` (4.4:1).
- `--accent`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: raw.md — `accent: #000000 (Black IS the accent)`.
- `--accent-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: raw.md — `accentForeground: #FFFFFF (White on black)`.
- `--secondary`: `oklch(0.9702 0.0000 0)` (= `#F5F5F5`). Synthesised utility — the shadcn slot is filled with the muted surface so secondary-styled buttons don't introduce a third grey.
- `--secondary-foreground`: `oklch(0.0000 0.0000 0)` (= `#000000`). Synthesised utility.
- `--destructive`: `oklch(0.0000 0.0000 0)` (= `#000000`). The spec admits no destructive accent colour; the destructive register is carried by the same black with a different surface treatment (e.g. an `ultra` 8px border).
- `--destructive-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`).
- `--border`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: raw.md — `border: #000000 (Black borders)`.
- `--input`: `oklch(0.0000 0.0000 0)` (= `#000000`). Inputs use the same 2 px black border as cards.
- `--ring`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: raw.md — `ring: #000000 (Black focus rings)`.

### Polarity-locked surfaces

These two tokens carry the inverted state-change vocabulary and never flip with `[data-theme="dark"]`. The dark theme inverts `--background` / `--foreground`; the polarity-locked tokens stay fixed because the Stats / Final-CTA inversion is intentional within either theme.

- `--brand-canvas-night`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: raw.md — `Inverted Card · Background: #000000`.
- `--brand-on-dark`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: raw.md — `Inverted Card · Text: #FFFFFF`.

### Hairlines / dividers

The spec documents two grades of subtle divider. Both carry the same `#E5E5E5` value but at different rendered weights — the weight ladder lives in `--brand-rule-*` below, not in chromatic tokens.

- `--brand-hairline-soft`: `oklch(0.9219 0.0000 0)` (= `#E5E5E5`). Live: raw.md — `hairline: 1px solid #E5E5E5 (Subtle dividers)` and `borderLight: #E5E5E5 (Light gray for subtle dividers)`.

### Brand rule-weight ladder (the line-based visual system)

The spec replaces conventional shadow / elevation with **four documented rule weights**, every one in `#000000`. This is the system's elevation language. Rendered as `border-*-width` or `border-top-width` (never as a shadow).

- `--brand-rule-thin`: `1px solid #000000`. Live: raw.md — `thin: 1px solid #000000 (Standard borders)`.
- `--brand-rule-medium`: `2px solid #000000`. Live: raw.md — `medium: 2px solid #000000 (Emphasis borders)`.
- `--brand-rule-thick`: `4px solid #000000`. Live: raw.md — `thick: 4px solid #000000 (Heavy rules, section dividers)`.
- `--brand-rule-ultra`: `8px solid #000000`. Live: raw.md — `ultra: 8px solid #000000 (Maximum impact)`.

### Body text neutrals

- `--brand-body`: `oklch(0.0000 0.0000 0)` (= `#000000`). Body copy is rendered at the same value as headings; the editorial register relies on weight and size to differentiate, not lightness.
- `--brand-body-muted`: `oklch(0.4386 0.0000 0)` (= `#525252`). Captions, byline meta, footnotes. Same value as `--muted-foreground`; the alias exists so downstream consumers can route to the body-muted role independently from the shadcn slot.

### Drift vs `tokens.css`

Not applicable — spec-derived mode, no prior `tokens.css` to drift against.

## §3 Typography

The spec mandates a serif-as-hero typeface trio: Playfair Display for display + headings (high-contrast didone-style serif with strong italics), Source Serif 4 for body (a more legible reading serif paired to the display face), and JetBrains Mono for metadata / dates / labels / small caps.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (oversized statements) | Playfair Display | 400 (regular weight on display sizes — counters take the visual weight) | 8–10rem (128–160px), responsive `clamp` to ~5rem on mobile | 1 (leading-none) | -0.05em (tracking-tighter) |
| Heading (page titles, hero subheadings) | Playfair Display | 600 | 3.5–6rem (56–96px) | 1.05 | -0.025em (tracking-tight) |
| Title (section titles, h2) | Playfair Display | 600 | 2–2.5rem (32–40px) | 1.15 | -0.015em |
| Body | Source Serif 4 | 400 | 1.125rem (18px preferred, 1rem minimum) | 1.625 (leading-relaxed) | 0 (tracking-normal) |
| Caption / lede | Source Serif 4, italic where editorial | 400 | 0.875–1rem | 1.5 | 0 |
| Mono / labels / dates | JetBrains Mono | 500 | 0.6875–0.875rem | 1.4 | 0.1em (tracking-widest) on uppercase labels |

**Type-scale ladder (raw.md §"Dramatic range"):** `xs 12px`, `sm 14px`, `base 16px`, `lg 18px`, `xl 20px`, `2xl 24px`, `3xl 32px`, `4xl 40px`, `5xl 56px`, `6xl 72px`, `7xl 96px`, `8xl 128px`, `9xl 160px`. Headlines routinely land at 8xl or 9xl on desktop; one defining-move bullet in the spec mandates *"at least one word in 8xl or larger (9xl on desktop)"* per page. Single-word headlines that fill an entire viewport width are an intentional pattern.

**Tracking rule:** small-caps and uppercase labels carry `tracking-widest` (0.1em); editorial headings carry `tracking-tight` to `tracking-tighter` (-0.025em to -0.05em). Body remains `tracking-normal`.

**Loaders:** Playfair Display and Source Serif 4 are Google Fonts; JetBrains Mono is already in the catalogue's shared loader (`preview-kit/template.html`). Source Serif 4 is the modern variable-font replacement for Source Serif Pro; the spec writes "Source Serif 4" verbatim and the family ships on Google Fonts under that name.

## §4 Component vocabulary

The list below is exhaustive of what the spec documents — buttons, cards, inputs, plus the structural-signature surfaces the spec calls out by name in the "Bold Choices" and "Layout sections" blocks.

### Primary Button

**Status:** `current`
**Live source:** `temp/refs/monochrome/raw.md` — §"Component Stylings · Buttons · Primary Button"
**Description:** Pure black fill (`#000000`), pure white text, no border, no radius. Padding `px-8 py-4` (generous — the button is meant to be read as a visual block, not a small UI control). Label is uppercase, `tracking-widest`, `font-medium`, `text-sm`. Optional arrow glyph (`→`) for CTA register.
**States:** Default — black on black, white text. Hover — full inversion to white background, black text, 2 px black border appears in place of the fill. Focus-visible — 3 px solid `#000000` outline, 3 px offset. Active — same as hover. Transition `transition-none` or 100 ms maximum; no easing, no fade.

### Secondary / Outline Button

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Buttons · Secondary/Outline Button"
**Description:** Transparent fill, 2 px solid `#000000` border, black text. Padding matches the primary. Label register matches the primary (uppercase, tracking-widest, font-medium, text-sm).
**States:** Default — transparent / black. Hover — inverts to black fill with white text, 2 px border becomes invisible against the fill. Focus-visible — 3 px solid outline, 3 px offset. Transition 100 ms.

### Ghost Button

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Buttons · Ghost Button"
**Description:** Reads as a text link. No border, no background. Black text, label register matches the other buttons.
**States:** Default — text only. Hover — underline appears (1 px, instant). Focus-visible — underline thickens and a 3 px outline at 2 px offset appears.

### Standard Card

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Cards/Containers · Standard Card"
**Description:** White ground, 1 px solid `#000000` border, padding `p-6` or `p-8`. No shadow, no radius. Internal hierarchy is carried by typography and rule weights, never by surface elevation.
**States:** Default — white, thin border. Hover — full inversion (black ground, white text, no border) over a 100 ms transition. Focus-visible (when the card is itself interactive) — 3 px outline at 3 px offset.

### Inverted Card

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Cards/Containers · Inverted Card"
**Description:** Black ground (`--brand-canvas-night`), white text (`--brand-on-dark`), no border, no radius. The spec marks this variant explicitly *"Use sparingly for highlighted content"* — the inversion is meant to read as a single moment of dramatic emphasis on a page, not a default.
**States:** Default — black / white. Hover — inverts to standard card on hover where the surface is interactive.

### Borderless Card

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Cards/Containers · Borderless Card"
**Description:** No border, no background. Content separated by generous whitespace; horizontal rules above and below the card supply the visual structure when needed. Useful in long-form editorial where bordered cards would read as too dense.

### Text Input

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Inputs · Text Input"
**Description:** White ground, 2 px solid `#000000` border (either all sides or bottom-only depending on register), no radius. Placeholder text is `#525252` and italic. The spec deliberately avoids a colored focus ring — focus is carried entirely by border thickness.
**States:** Default — 2 px black border. Focus — border thickens to 3 px or 4 px (bottom-only variant rolls all of its weight onto the bottom edge). Disabled — `#525252` border, italic placeholder grays back further. No outline on focus — the border change is the entire focus indicator.

### Textarea

**Status:** `current`
**Live source:** raw.md — §"Component Stylings · Inputs · Textarea"
**Description:** Same surface treatment as Text Input (white ground, 2 px black border, no radius, italic placeholder). Native browser resize handle is left visible — the system does not custom-render the resize affordance.

### Icon (Lucide, thin-stroke)

**Status:** `current`
**Live source:** raw.md — §"Iconography"
**Description:** Outlined Lucide icons rendered at `strokeWidth={1.5}` or `1`, never filled. Consistent size — 20 px or 24 px depending on context. Always `#000000`. Optionally enclosed in a circle with a 1 px black stroke and white fill (the "icon inside circle" pattern); otherwise stand-alone with no container.

### Horizontal section rule (the line-based visual system)

**Status:** `current`
**Live source:** raw.md — §"Section Spacing" and §"Borders & Lines"
**Description:** The architectural primitive that separates major sections is a `--brand-rule-thick` (4 px) or `--brand-rule-ultra` (8 px) black horizontal rule, full-width or container-width. Section vertical padding lands at `py-24` to `py-40` (96 px to 160 px) — the rule + the negative space supply the section structure together. This component is the system's substitute for shadow-based section elevation and is the most-used non-typographic primitive in the system.

### Boxed drop cap

**Status:** `current`
**Live source:** raw.md — §"Bold Choices (Non-Negotiable)" — *"Boxed Drop Cap: First paragraph of Product Detail has bordered box drop cap"*
**Description:** The first paragraph of a long-form section opens with a single oversized Playfair Display capital letter (typically `5rem` or larger), set inside a thin black-bordered box that floats to the left of the running body text. The drop cap reads as an editorial print convention transplanted; the bordered box is what distinguishes this from a conventional editorial drop cap.

### Editorial pull quote

**Status:** `current`
**Live source:** raw.md — §"Bold Choices" — *"Editorial Pull Quotes: Testimonials as large italic serif with oversized quotation marks"*
**Description:** Pulled testimonial or callout set in Playfair Display, italic, at title-scale (~2rem). Flanked by oversized quotation marks (typically 5–8rem) that sit at low opacity (~20%) or in subtle grey, acting as decorative typography rather than functional quotation marks. Top and bottom 1 px black rules bracket the quote.
**States:** Hover (where the quote is interactive — testimonial card register) — quote-mark opacity increases, bottom border thickens to 3 px (100 ms transition).

### Pricing-tier card with elevated featured tier

**Status:** `current`
**Live source:** raw.md — §"Bold Choices" — *"Elevated Pricing Tier: Highlighted tier extends vertically on desktop"*
**Description:** Three- or four-column pricing layout where the featured tier extends vertically beyond the row baseline — typically 16–24 px above and below the other tiers' bounds, so the featured tier reads as taller from the section's perspective. The featured tier itself inverts (black ground, white text, no border), the other tiers are Standard Cards. The price is rendered at title-scale Playfair Display; the per-feature list below is set in Source Serif 4 body with `--brand-rule-thin` rules separating each row.
**States:** Hover on a non-featured tier — full inversion (the tile becomes the featured tier's appearance for a moment, 100 ms transition).

### Inverted Stats section

**Status:** `current`
**Live source:** raw.md — §"Bold Choices" — *"Inverted Stats Section: Black background, white text, with subtle vertical line texture"*
**Description:** Full-bleed section on the `--brand-canvas-night` ground with `--brand-on-dark` ink. Vertical-line texture overlay at 3% white opacity (a `repeating-linear-gradient` at 90deg). Statistics laid out in a 3–4 column grid; each stat carries a giant Playfair Display number (`7xl` to `9xl`) above a small JetBrains Mono caption (`xs`, uppercase, tracking-widest). The vertical 1 px rules between columns are `--brand-on-dark` at 0.2 alpha.

### Final-CTA inverted band

**Status:** `current`
**Live source:** raw.md — §"Inverted Section Textures" — *"Radial gradient for Final CTA"*
**Description:** Closing-page band on `--brand-canvas-night` ground with a subtle radial-gradient white texture (5% opacity, radiating from top centre). Headline at `8xl`/`9xl` Playfair Display in white, single primary button rendered as an Inverted-Card-style white-fill / black-text button (the inversion-of-the-inversion — the only place the button polarity flips).

### Blog image card

**Status:** `current`
**Live source:** raw.md — §"Bold Choices" — *"Image Borders Thicken: Blog images border weight increases on hover with scale effect"*
**Description:** Standard Card composition (white ground, 1 px black border) wrapping an image rendered in grayscale (`filter: grayscale(1)`). Image is left grayscale at rest so the system stays monochrome at the surface; metadata below (date in JetBrains Mono, title in Playfair Display 2xl, lede in Source Serif 4).
**States:** Hover — border thickens from 2 px to 4 px (`--brand-rule-medium` → `--brand-rule-thick`), image scales to `1.05` and loses its grayscale filter (`scale-105 grayscale-0`, 300 ms transition — the only state in the system that uses a non-100ms timing, because the image transition needs to read as a slow reveal).

### Skip link (accessibility)

**Status:** `current`
**Live source:** raw.md — §"Accessibility" — *"Skip Links: Visible, black button at top of page"*
**Description:** Visible at all times (not visually-hidden / focusable-only as in most systems). Renders as a Primary Button at the top of the page. The visible-by-default treatment is itself an editorial choice — the skip link participates in the page rather than hiding behind a focus event.

## §5 Surface inventory

Spec-derived mode — no live URLs were sampled. The sources for every value above are:

- `temp/refs/monochrome/raw.md` — the full spec. Carries the design philosophy, the strict palette, the typography trio, the four required textures, the section-by-section signature surfaces (Hero, Product Detail, Process/Timeline, Stats, Pricing, Blog, Testimonials, Final CTA), and the component-level treatment specs (buttons, cards, inputs, icons).

The spec page only exposed a single "Prompt" view at the source URL (`app.superdesign.dev/library/monochrome`), so the entire design vocabulary was captured inline rather than across multiple URLs. The "Layout sections" block in raw.md enumerates the structural intent.

## §6 Notes

- **Editorial-luxury, not punk-manifesto.** The closest neighbour in the catalogue is `brutalist`; the systems are deliberately distinct. Brutalist (per the spec-derived register that name conventionally implies) admits a single shouty accent (cadmium red, blood orange) and embraces raw / imperfect aesthetics — manifesto-typography energy, photocopier crunch, exposed concrete. Monochrome refuses *all* chroma and lives in the editorial-luxury register: high-end editorial print, exhibition monographs, gallery catalogues, fine book typography. The register is calm and commanding, not loud and shouty.
- **"Black IS the accent."** The spec stakes this rule directly. The system has no `--brand-red`, `--brand-accent-yellow`, no documented secondary brand colour at all. The temptation when authoring is to reach for a single accent for hover or focus — the system's answer is colour inversion, which is why `--brand-canvas-night` and `--brand-on-dark` are first-class brand-extras and the hover-on-card pattern is full polarity flip.
- **Inversion as state-change vocabulary.** Where a conventional system uses brand-blue or brand-coral for hover, focus, and emphasis, this system uses the polarity flip. Cards invert on hover, buttons invert on hover, the Stats section is the inversion-as-section, the pricing featured tier is the inversion-as-tier. The 100 ms transition timing is what keeps the inversion legible as a state change rather than a section change — gradual inversion would read as ambient animation, instant inversion reads as deliberate hierarchy.
- **No shadow ladder.** Elevation is the rule-weight ladder (`--brand-rule-thin` / `-medium` / `-thick` / `-ultra`). Authors reaching for `box-shadow` on a card or button are violating the system; the four border weights are how depth is signalled.
- **No radius.** Every value is `0`. The spec writes the rule in capitals: *"ALL VALUES: 0px · No exceptions."* `--radius-sm` through `--radius-xl` in `tokens.css` all carry `0px` for this system, which is unusual for the shadcn-core contract but documented in the spec.
- **Four textures, all required.** Horizontal lines (global, 1.5% opacity), grid (editorial sections, 1.5%), diagonals (process/timeline, 1%), SVG noise (paper-like quality, 2%). The spec calls these *"REQUIRED to prevent flat design"*. The preview template implements them as decorative `::before` overlays scoped to specific sections.
- **No source-brand lift in prose.** The original spec namechecks a handful of luxury / fashion / editorial brands as register references for the *author of the spec*. Those brand names are not part of this design system and MUST NOT appear in `DESIGN.md`, `tokens.css`, or `preview-template.html`. Halcyon-team content only (per AUTHORING.md "Content shape: Halcyon is a name only").
- **Mobile rule:** the spec is explicit that the monochrome drama must survive on mobile — *"Don't default to generic mobile patterns."* 9xl headlines drop to 5xl, columns stack, borders become full-width horizontal rules; everything else holds.

## §Known gaps

- **Spec page only.** The Superdesign source URL exposed a single Prompt view; no separate Style / Layout / Components tabs were navigable, and no live-deployed brand site exists. Every value in §2-§4 is derived from the spec text and the spec's own component-level documentation. Reference imagery from real high-end editorial or exhibition-catalogue print would clarify rendered scale and texture intensity — none was provided to this cycle.
- **Destructive register undefined.** The spec admits no destructive colour. `--destructive` carries `#000000` so the shadcn contract holds, but a real destructive surface (a "Delete account" confirmation) is not modelled in the source. Authors using this system for a destructive action should reach for `--brand-rule-ultra` (8 px black border) plus an inverted card surface as the visual register for the destructive moment.
- **Charting palette.** No chart palette is documented in the source. `--chart-1` through `--chart-5` will route to greyscale stops in `tokens.css` (full black through `#525252`); data visualisations in this register lean on pattern-fill (hatching, stippling) rather than chromatic differentiation.
- **Form components beyond text input + textarea.** Select, checkbox, radio, switch, slider — none are documented in the source. Authors should derive these from the Text Input treatment: 2 px black border, no radius, label register in JetBrains Mono uppercase.
