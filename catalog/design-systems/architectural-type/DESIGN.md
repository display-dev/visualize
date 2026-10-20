---
slug: architectural-type
name: Architectural Type
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/architectural-type/raw.md (verbatim style prompt, layout sections, component
      specs, and special notes captured from the source publication "Architectural Type System
      Style" by Shirley Lou)
  - principles: Swiss-Brutalist register — engineering-first dark canvas, hairline-defined
      grid matrix, oversized split-clipped display type, fixed-width metadata, single
      functional accent. Persistent fractal-noise overlay at 5% opacity for tactile texture.
canonical-canvas: both
selection:
  mood: [editorial, high-contrast]
  tone: [authoritative, serious]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a authoritative, serious register with editorial, high-contrast visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Architectural Type

## §1 Canonical canvas

The register is authored dark-canonical. Pure black (`#000000`) is the canvas across every
section; white is the foreground; a single indigo functional accent is reserved for one
primary CTA or a specific data point per surface. The spec describes four sequential
sections that share this canvas: a translucent topnav, a 2×2 hero grid where each cell
holds one viewport-clipped word segment, a four-column command bar, and a three-column
bento feature grid. None of them flip polarity. The whole interface carries a 5%-opacity
fractal-noise SVG overlay so that pure-black does not read as photographic void.

A light-mode variant is included as a synthesised inverse because the showcase shell needs
both branches and the source's grid-matrix logic carries over cleanly to a near-white
canvas with rgba(0,0,0,0.15) hairlines. The accent stays chromatically identical across
both modes. Where the spec is silent on a light variant, the dark surface is authoritative.

| Surface | Source citation | Canvas | Notes |
|---|---|---|---|
| Navigation bar | raw.md §Layout sections — Section 1 | `#000000` at 80% alpha + backdrop-blur | Wordmark in Inter Tight 900, mono version tag after a 6 px dot, social-icon hairline circles, pill CTA |
| Hero (the Grid) | raw.md §Layout sections — Section 2 | `#000000`, 2×2 hairline-divided cells | Each cell carries one segment of a single display word at `clamp(5rem, 18vw, 24vw)` |
| Command Bar | raw.md §Layout sections — Section 3 | `#000000`, 4-column hairline strip | Borderless email input, white pill `JOIN`, mono countdown, stacked 8 px labels |
| Bento Feature Grid | raw.md §Layout sections — Section 4 | `#000000`, 3-column hairline grid | Mono `SYSTEM_NN` tag top-left, low-opacity centre glyph, title + caption bottom-left |

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, source citation. Hex values are
verbatim from raw.md; OKLCH values are derived via vendored culori. Utility neutrals that
the spec leaves to the implementation (e.g., light-mode body shades) are marked
`(synthesised)`.

### Brand primary

- `--primary` (functional accent / indigo): `oklch(0.5854 0.2041 277.12)` (= `#6366f1`).
  Source: raw.md §Style prompt — "Accents #6366f1"; §Style prose — "a single functional
  accent (Indigo #6366f1)"; §Special Notes — "only use the accent color for one primary
  action or specific data points."

### Documented secondary brand colours

The system declares no secondary brand colour. The spec is emphatic that monochrome
balance is the rule and that indigo is the single functional accent. There is no
yellow / red / green / amber sibling token to add to the brand-extras layer.

### Canvas + neutrals

- `--background` (dark canvas): `oklch(0 0 0)` (= `#000000`). Source: raw.md §Style prose
  — "pure black (#000000)"; §Style prompt — "Background #000000."
- `--foreground` (dark canvas): `oklch(1 0 0)` (= `#FFFFFF`). Source: raw.md §Style prose
  — "and white (#FFFFFF)"; §Style prompt — "Foreground #FFFFFF."
- `--background` (light canvas): `oklch(1 0 0)` (= `#FFFFFF`) — light-mode inverse,
  `(synthesised)` against the spec's silent treatment of a light variant.
- `--foreground` (light canvas): `oklch(0.16 0 0)` (= near-`#1A1A1A`) — `(synthesised)`
  off-black so display-weight 900 type does not over-render at the largest sizes.
- `--card`, `--card-foreground`: track `--background` / `--foreground`. The spec defines
  no card surface above the canvas; hairlines, not elevation, separate content.
- `--popover`, `--popover-foreground`: track card surface; no popover register in the spec.
- `--muted` (dark): `oklch(0.18 0 0)` `(synthesised)` — utility neutral for muted fills
  on dark canvas; chroma 0, sub-brand utility per AUTHORING utility-neutral exception.
- `--muted-foreground` (dark): `oklch(0.62 0 0)` `(synthesised)` — utility neutral for
  caption / mono-metadata at the dark `0.4 opacity` register the spec describes in
  raw.md §Layout sections — Section 4.
- `--muted` (light): `oklch(0.95 0 0)` `(synthesised)`.
- `--muted-foreground` (light): `oklch(0.42 0 0)` `(synthesised)`.
- `--accent`, `--accent-foreground`: track `--primary` / `--background`. The functional
  indigo is the only accent surface declared.
- `--secondary` (dark): `oklch(0.22 0 0)` `(synthesised)` — utility neutral filling the
  rare secondary-button surface; pure-monochrome.
- `--secondary-foreground` (dark): `oklch(1 0 0)`.
- `--destructive`: `oklch(0.5854 0.2041 277.12)` — the spec declares only one accent;
  destructive surfaces re-home to a foreground-on-background fill with an indigo focus
  ring rather than introducing a red. `(synthesised)` substitution noted.
- `--destructive-foreground`: tracks `--foreground`.
- `--border` (dark): `oklch(0.34 0 0)` (= the rendered solid equivalent of
  `rgba(255,255,255,0.15)` over `#000`). Source: raw.md §Style prompt — "Use 'hairlines'
  (0.5px width, color rgba(255, 255, 255, 0.15))"; §Components — "The Hairline Border".
- `--border` (light): `oklch(0.85 0 0)` (= the rendered solid equivalent of
  `rgba(0,0,0,0.15)` over `#FFF`) `(synthesised)`.
- `--input`: tracks `--border`.
- `--ring`: tracks `--primary` per AUTHORING primary-family-asymmetry rule.

### Polarity-locked surfaces

- `--brand-canvas-night`: `oklch(0 0 0)` (= `#000000`). The hero-grid quadrants and
  command bar stay on this canvas in both modes (the spec defines them dark-only and
  the light variant treats them as a locked signature surface). Source: raw.md §Style
  prose, §Style prompt.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#FFFFFF`). The text-on-canvas-night role.
  Source: raw.md §Style prose, §Style prompt.
- `--brand-on-dark-faint`: `oklch(1 0 0 / 0.4)` (= `#FFFFFF` at 40 % alpha). Source:
  raw.md §Layout sections — Section 4: "subtext in 'Inter' 400 (14px, 40% opacity)."
- `--brand-on-dark-mute`: `oklch(1 0 0 / 0.2)`. Source: raw.md §Components — "Status
  Countdown" — separators (`:`) at 20 % opacity; §Layout sections — Section 4: "large
  icon or geometric shape with low opacity (20%)."

### Hairlines / dividers

- `--brand-hairline-soft` (dark): `oklch(1 0 0 / 0.15)` (= `rgba(255, 255, 255, 0.15)`).
  Source: raw.md §Style prompt — "rgba(255, 255, 255, 0.15)"; §Components — "The Hairline
  Border" — "Border-color: rgba(255, 255, 255, 0.15)."
- `--brand-hairline-strong` (dark): `oklch(1 0 0 / 0.3)` `(synthesised)` — twice the soft
  hairline alpha for the rare two-tier divider case (e.g., a section break inside a card
  versus the card border itself). Spec does not enumerate a stronger weight.
- `--brand-hairline-soft` (light): `oklch(0 0 0 / 0.15)` `(synthesised)` inverse.

### Hero accent / quadrant rule

- `--brand-hero-overflow`: `oklch(1 0 0 / 0.08)` `(synthesised)` — the optional ghost-fill
  applied to a single hero quadrant to break the otherwise uniform 4-cell rhythm; the spec
  describes "slight overflow/clipping" of the display word segments but does not specify a
  fill, so this is a derivation per the architectural-clipping principle.

### Drift vs `tokens.css`

Not applicable — this is a first authoring cycle from a spec, not a refresh against an
existing `tokens.css`.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (hero word segments) | Inter Tight | 900 | `clamp(5rem, 18vw, 24vw)` | 0.85 | `-0.06em` |
| Heading | Inter Tight | 900 | `1.5rem` (24 px) | 1.0 | `-0.04em` |
| Title (card titles) | Inter Tight | 900 | `1.5rem` (24 px) | 1.05 | `-0.04em` |
| Body | Inter | 300 – 400 | `0.875rem` (14 px) | 1.5 | `0` |
| Caption (subtext) | Inter | 400 | `0.875rem` (14 px) | 1.5 | `0` |
| Mono (metadata + labels) | JetBrains Mono | 500 | `0.5rem` – `0.6875rem` (8 – 11 px) | 1.4 | `0.2em` – `0.4em` |
| Mono numeric (countdown) | JetBrains Mono | 500 | `1.5rem` (24 px) | 1.0 | `0` (tabular-nums) |
| CTA label (pill button) | JetBrains Mono | 700 | `0.625rem` (10 px) | 1.0 | `0.3em` |

Sources for every row trace to raw.md §Style prompt and §Layout sections. Inter Tight at
weight 900 with tracking `-0.06em` is the spec's display posture; Inter 300 – 400 is the
body register; JetBrains Mono at 500 weight with 0.2 – 0.4 em tracking covers metadata,
labels, and the system-status indicators. Underscored mono labels (`NO_CREDIT_CARD`,
`FREE_ACCESS`, `SYSTEM_01`) are a spec rule, not a stylistic choice — the §Special Notes
section is explicit: "Use underscores instead of spaces in mono-spaced metadata labels."

**Font sources.** Inter Tight and Inter ship via Google Fonts under the SIL Open Font
Licence. JetBrains Mono ships via Google Fonts (and is also catalog-default for any system
that needs a developer-tool mono). The template loads all three from Google Fonts in its
own `<head>` — `preview-kit/template.html`'s loader already covers JetBrains Mono and
generic Inter, but per-system templates do not inherit it (per AUTHORING gotcha), so the
per-system `<head>` declares all three.

**Numeric handling.** Countdown digits and any mono-numeric metadata must carry
`font-variant-numeric: tabular-nums` to defeat the variable-width-zero jitter that the
spec calls out in raw.md §Notes — Technical risks: "Fixed-width mono countdown requires
`font-variant-numeric: tabular-nums` to actually stop jitter."

**Compound type tokens.** The catalog's standard `--text-display`, `--text-heading`, etc.
slots map onto the six rows above. `--text-display` carries the hero `clamp(...)` value
directly so consumers can opt into the architectural treatment without restating the ramp.

## §4 Component vocabulary

Twelve entries — three source-declared (raw.md §Components 1–3), one source-declared per
named layout section (raw.md §Layout sections 1–4 = four entries), and four derived
under the spec's principles (hairline-stitched topnav button shape, mono-label vertical
stack, hero overflow rule, persistent noise overlay treated as a system-level component).

### Hairline Border

**Status:** `current`
**Source:** raw.md §Components 2 — "The Hairline Border"
**Description:** A 0.5 px line whose colour is `rgba(255, 255, 255, 0.15)` on the dark
canvas (the synthesised solid equivalent is `oklch(0.34 0 0)`). The construction rule is
to apply the border to single sides (`border-bottom`, `border-right`) so a grid of N
cells stitches with N hairlines rather than 2N — doubling at cell junctions reads as a
heavier line and breaks the architectural register. The spec calls out subpixel
rendering as a known DPR / browser risk: Safari often promotes a 0.5 px declared border
to 1 px. Where exact-pixel control matters, fall back to `box-shadow: inset 0 -0.5px 0
var(--brand-hairline-soft)` which respects the subpixel value at most DPRs.
**States:** default (visible at all times); a hairline never has a hover or focus state —
it is structural chrome, not interactive surface.

### Grid Matrix layout

**Status:** `current`
**Source:** raw.md §Layout sections — "Layout philosophy" + Section 2 (Hero) + Section 4
(Bento Feature Grid)
**Description:** The page is divided into quadrants and zones by hairlines. Cells are
either viewport-anchored (`100vh` desktop fold for the hero) or fixed-height (~400 px
desktop card height for the feature grid). Content inside each cell aligns to the cell's
corners — top-left or bottom-left for the hero word segments, bottom-left for the bento
card title block. Centred alignment is reserved for low-opacity geometric glyphs and the
command-bar pill button. The architectural feel comes from corner-pinning with slight
overflow / clipping at the cell edge, not from centring.
**States:** the grid itself has no state; individual cells flip to a `hover` register
that lifts a centre glyph from 20 % opacity to 100 % (see §Interactive Geometric Card).

### Persistent Noise Overlay

**Status:** `current`
**Source:** raw.md §Style prose, §Style prompt — "global noise texture overlay using a
fractal noise SVG at 0.05 opacity"; raw.md §Notes — Technical risks: "a tiled raster
fallback is safer."
**Description:** A page-fixed pseudo-element (`body::before`) that renders an SVG
`<filter>` of `feTurbulence` (`baseFrequency` around 0.9, `numOctaves` 2) over the entire
viewport at 5 % opacity. The overlay sits above the background canvas and below all
content. The spec flags GPU paint-cost as a low-end risk and recommends a tiled raster
fallback; for the catalog preview, the SVG is small enough not to need the fallback, but
the template encodes the noise once and references it so it is trivially swappable.
**States:** none — the overlay is decorative chrome and ignores interaction.

### Topnav (full-width hairline bar)

**Status:** `current`
**Source:** raw.md §Layout sections — Section 1 (Navigation)
**Description:** 72 px tall, full-width bar. Background is `var(--background)` at 80 %
alpha with `backdrop-filter: blur(...)`. A 0.5 px bottom hairline separates the bar from
the hero. The left edge carries the wordmark in Inter Tight 900 uppercase, followed by a
6 px white dot, then a JetBrains Mono version tag at 10 px with 0.3 em tracking. The
right edge carries social-icon circles (40 px diameter hairline borders, no fill) and a
pill-shaped CTA button.
**States:** default (80 % alpha background); on page scroll the alpha can lift to 95 %
to maintain readability against denser content underneath (a derivation, not a spec
declaration).

### Topnav social-icon circles

**Status:** `current`
**Source:** raw.md §Layout sections — Section 1 (Navigation)
**Description:** 40 px-diameter circles defined by a 0.5 px hairline. No fill on
default. The glyph inside is at `var(--foreground)`. Spacing between circles is
12 px. The shape is the spec's clearest exception to the "no rounded corners" rule —
the §Special Notes prohibits rounded corners on grid cells and input fields but allows
pill buttons; circular hairline containers fall under the same exception.
**States:** default (transparent fill); `hover` lifts the fill to
`var(--brand-on-dark-mute)` (20 % white) over 300 ms per the spec's hover-transition
rule (raw.md §Style prompt — "Hover states should transition over 300ms").

### Pill CTA Button

**Status:** `current`
**Source:** raw.md §Layout sections — Section 1 (Navigation), Section 3 (Command Bar:
Cell 2 — Full-width 'JOIN' button)
**Description:** A pill-shaped button (border-radius `999px`) with white fill on dark
canvas and dark canvas-coloured label. Padding is 14 px vertical, 24 px horizontal. The
label is JetBrains Mono at 10 px (topnav) or 12 px (command-bar primary), weight 700,
tracking 0.3 em, uppercase. The button is the system's only deviation from the
zero-radius rule — pill is the explicit exception named in raw.md §Style prompt.
**States:** default (white fill, dark text); `hover` swaps to indigo (`var(--primary)`)
fill with white text over 300 ms — this is the one primary-action surface where the
functional accent appears, per the §Special Notes "only use the accent color for one
primary action" rule. `focus-visible` overlays a 2 px indigo outline offset 2 px from
the pill edge.

### Email Input (borderless)

**Status:** `current`
**Source:** raw.md §Layout sections — Section 3 (Command Bar: Cell 1 — Email input with
'JetBrains Mono' placeholder text, no borders)
**Description:** A bare text input with no border, no background fill, and no radius.
The placeholder is JetBrains Mono at 10 – 11 px with 0.3 em tracking (e.g.,
`YOUR@EMAIL.COM`). The input sits inside a hairline-bounded grid cell, so the cell's
own borders carry the visual frame — the input itself has no chrome. On focus the
placeholder remains visible until the first keystroke, and a 2 px indigo bottom rule
appears under the typed text (a derivation, not a spec declaration, because the spec
gives no focus treatment for the input).
**States:** default (no chrome); `focus-visible` (2 px indigo bottom rule);
`disabled` lowers the placeholder alpha to 20 % (`var(--brand-on-dark-mute)`).

### Status Countdown

**Status:** `current`
**Source:** raw.md §Components 1 — "Status Countdown"
**Description:** A monospaced timer in `HH : MM : SS` format. The separators (the colons)
sit at 20 % opacity (`var(--brand-on-dark-mute)`) so the digits read as the load-bearing
characters. Glyphs are fixed-width via `font-variant-numeric: tabular-nums`. Colour is
white on dark canvas; size 24 px; weight 500. The format is decorative — the timer's
register is "system status indicator", not "countdown to a specific event" — so the
displayed value can be a non-decreasing fixture for showcase purposes.
**States:** default; an `expired` state where the digits flip to indigo
(`var(--primary)`) — the system's permitted single-data-point use of the accent under
the §Special Notes rule. Spec does not declare an expired state explicitly; this is a
derivation that respects the single-accent constraint.

### Mono Label Stack

**Status:** `current`
**Source:** raw.md §Layout sections — Section 3 (Command Bar: Cell 4 — Vertical stack
of three system labels)
**Description:** A vertical column of 8 px JetBrains Mono labels at 0.4 em tracking, each
on its own line, uppercase, underscored (`FREE_ACCESS`, `NO_CREDIT_CARD`, `OPT_OUT_ANY`).
Spacing between rows is 6 px. The whole stack is right-aligned to the cell's right
edge — corner-pinned per the architectural register. Colour is white at full opacity (the
spec does not specify, so this is the most-prominent monochrome reading).
**States:** none — the stack is structural copy, not interactive.

### Interactive Geometric Card

**Status:** `current`
**Source:** raw.md §Components 3 — "Interactive Geometric Card"
**Description:** A square card with a 0.5 px hairline border. The centre carries a
45-degree rotated square (also defined by a hairline, no fill) at 20 % opacity. The
parent card has no fill, no radius, no shadow. A small mono `SYSTEM_NN` tag sits at the
top-left (per Section 4 — Bento Feature Grid). The bottom-left carries a card title in
Inter Tight 900 at 24 px and a caption in Inter 400 at 14 px / 40 % opacity. The
combination of fixed grid, mono tag, minimal centre glyph, and corner-pinned text block
is the system's most recognisable composition.
**States:** default (glyph at 20 % opacity); `hover` rotates the inner square to 90
degrees and lifts both the glyph opacity to 100 % and the card background to
`var(--foreground)` at 5 % alpha — a `#FFFFFF05` background shift per Section 4 spec —
over 700 ms with `cubic-bezier(0.4, 0, 0.2, 1)`.

### Hero Word-Segment Cell

**Status:** `current`
**Source:** raw.md §Layout sections — Section 2 (Hero Section — The Grid)
**Description:** One quadrant of a 2×2 grid. Each cell holds one segment of a single
display word, set in Inter Tight 900, font-size `clamp(5rem, 18vw, 24vw)`, tracking
`-0.06em`, uppercase. Segments align to the bottom-left or top-left corner of their
cell, allowing slight overflow at the cell edge. The cell itself has no fill and no
radius. Hairlines separate adjacent cells. The spec flags the overflow / clipping as
the architectural touch — straight bottom-pinning without overflow reads as "centred
display type", which the system explicitly rejects.
**States:** none — the hero cells are static display chrome.

### Topnav Version Tag

**Status:** `current`
**Source:** raw.md §Layout sections — Section 1 (Navigation) — "a 6px white dot and
'JetBrains Mono' versioning tag (e.g., BETA_V.01)"
**Description:** A small mono tag adjacent to the wordmark, separated by a 6 px-diameter
white dot. JetBrains Mono at ~10 px, weight 500, tracking 0.3 em, uppercase, underscore
delimited (e.g., `BETA_V.01`, `RC_2026.05`). The dot is decorative — it visually
brackets the wordmark from the version tag without using a punctuation glyph.
**States:** none — the tag is static metadata.

## §5 Surface inventory

This is a spec-derived authoring; no live URLs were sampled. The source materials for
every component, palette value, and layout decision are documented in raw.md, which is
itself a verbatim record of the spec publication.

- `temp/refs/architectural-type/raw.md` — the only source. Contains §Source, §Description,
  §Summary, §Style prose, §Style prompt, §Layout sections (4 named sections with verbatim
  copy), §Components (3 named components with verbatim copy), §Special Notes, §Tags, and
  §Notes (register identity, defining signature, use case, technical risks).

## §6 Notes

- **Monochrome rule is structural, not stylistic.** The §Special Notes paragraph in
  raw.md states: "Maintain strict monochrome balance; only use the accent color for one
  primary action or specific data points." This is the system's single hardest rule and
  governs every component choice. A "second accent" never enters the vocabulary — even
  destructive surfaces route to white-on-dark with an indigo focus ring, not to red.
- **Pill button is the lone radius exception.** raw.md §Special Notes prohibits rounded
  corners on grid cells and input fields. The pill button (border-radius `999px`) is the
  named exception. The topnav social-icon circles fall under the same exception by
  shape — a fully-round container — but the spec does not enumerate them as a separate
  carve-out. Beyond pill / circle, every other shape is zero-radius.
- **No shadows, no gradients.** Depth comes from line-work and contrast alone. The
  brand-extras layer carries no shadow tokens. The component vocabulary uses inset
  hairlines or background-alpha shifts for emphasis instead.
- **Underscored mono labels.** raw.md §Special Notes: "Use underscores instead of spaces
  in mono-spaced metadata labels (e.g., NO_CREDIT_CARD)." All authored mono copy follows
  this — `SYSTEM_01`, `FREE_ACCESS`, `RC_2026.05`, `BETA_V.01`. The convention reads as
  filename-shape, reinforcing the engineering-first register.
- **Edge alignment is architectural.** raw.md §Special Notes: "Align text to the very
  edges of grid cells for the 'architectural' feel." Centred display type breaks the
  register; corner-pinning is the rule.
- **Subpixel hairlines have known DPR risk.** raw.md §Notes — Technical risks: "Subpixel
  0.5px borders render inconsistently across DPRs/browsers (Safari often promotes to
  1px)." The preview template should use `box-shadow: inset 0 0 0 0.5px var(--border)`
  for any border that must hold its weight across DPR shifts; ordinary `border` is
  acceptable where pixel-perfect rendering is not load-bearing.
- **Hero text-overflow needs an `overflow-x: hidden` parent.** raw.md §Notes: "Massive
  18vw type needs an overflow-x: hidden parent to avoid horizontal scroll." The hero
  word-segment cells clip on the right; the page body must contain the overflow.
- **Tabular-nums on every mono numeric.** raw.md §Components 1 — "Status Countdown" and
  §Notes — Technical risks both call this out. JetBrains Mono ships with a
  `tnum` OpenType feature; `font-variant-numeric: tabular-nums` activates it.
- **Noise overlay should stay paint-cheap.** raw.md §Notes recommends a tiled raster
  fallback on low-end GPUs. For the catalog preview the SVG is small enough not to need
  the fallback, but the per-system template encodes the noise once and references it so
  it is trivially swappable for a tiled raster `<img>` if a downstream consumer needs
  the cheaper path.

## §Known gaps

- **No live source.** This is a spec-derived authoring. The system has no public live
  deployment to sample. The spec's verbatim text in raw.md is the authority; any
  divergence between this DESIGN.md and a future live deployment is a fresh authoring
  cycle, not a refresh.
- **Light-mode variant is synthesised.** The spec is dark-canonical and silent on a
  light variant. The canvas + neutrals declared under §2 for the light branch are an
  inverse derivation, not a documented brand surface. The indigo accent and the polarity-
  locked hero / command-bar surfaces stay dark across both modes.
- **Destructive register is folded into the monochrome rule.** Most catalog systems carry
  a documented red for destructive surfaces. This system declares only one accent and
  the §Special Notes monochrome rule forbids a second; destructive surfaces re-home to
  a foreground-on-background fill with an indigo focus ring. A `(synthesised)` token
  value covers the shadcn-semantic-core slot.
- **No tertiary type role.** The spec declares Inter Tight (display), Inter (body), and
  JetBrains Mono (metadata). No serif, no display-italic, no decorative cut. Catalog
  consumers expecting a fourth family will need to pick one of the three.
- **Chart palette is monochromatic.** The five `--chart-*` slots are derived from
  white / indigo / neutral-grey lightness stops, not a five-hue palette. The system's
  monochrome rule forbids the typical chart-rainbow approach. Visualisations that need
  more than two categorical series will need to encode the additional series through
  shape, weight, or hairline pattern rather than hue.
</content>
</invoke>