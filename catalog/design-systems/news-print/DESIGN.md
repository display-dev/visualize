---
slug: news-print
name: News Print
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/news-print/raw.md — full prompt text quoted from Zhou Jason (credited to designprompts.dev), captured from https://app.superdesign.dev/library/news-print
  - principles: broadsheet-journalism register — massive serif headlines, 12-column collapsed-border grids, vertical column dividers, edition metadata, marquee tickers, grayscale photography, halftone radial dots, Editorial Red used as a 1% accent
canonical-canvas: light
selection:
  mood: [editorial, high-contrast]
  tone: [authoritative, serious]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a authoritative, serious register with editorial, high-contrast visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# News Print

A broadsheet-journalism design language built for the web. The register is layout-and-hierarchy-led — the page is organised like a printed newspaper grid rather than a typical marketing landing. Massive Playfair Display headlines (up to 9xl on desktop), 12-column grids with deliberately collapsed shared borders, vertical column dividers, uppercase mono labels, edition-metadata strips ("Vol. 1 | NYC"), grayscale halftone photography, and a single Editorial Red accent used in roughly 1% of the surface for breaking-news badges and CTA underlines. Zero border radius anywhere. The signature interaction is a 4px hard offset shadow paired with a 2px translate on hover — a paper-cutout lift rather than a soft drop.

Distinction from `paper-ink`: news-print drives recognizability through **layout discipline and typographic drama**. Paper-ink (a sibling system) leans on **letterpress ink texture and tactile fibre**. The two share a "print" ancestor but diverge at the design centre — news-print's voltage moments are the collapsed grid, the 9xl headline, and the offset-shadow lift; paper-ink's voltage moments are ink saturation and fibre overlay.

## §1 Canonical canvas

| Surface | Source | Canvas | Notes |
|---|---|---|---|
| Body / sections (all) | Spec §2 Colors | Newsprint Off-White `#F9F9F7` | Warm off-white that mimics aged paper. Not pure white. Single permanent canvas — spec explicitly forbids a dark mode |
| Inverted "How It Works" band | Spec §4 item 9 | Ink Black `#111111` | One major section per page flips to black; numbered steps use the Editorial Red accent |
| Marquee ticker | Spec §4 item 3 | Ink Black `#111111` | Horizontal scroll with white text and red breaking-news badges |
| Image placeholders | Spec §2 Textures | Newsprint Off-White + halftone overlay | Radial dot pattern at 10% opacity simulating halftone print |

The spec carries an unambiguous statement: **"Mode: Light (Permanent - no dark mode)."** The catalog scaffolding still emits a dark preview (`build-previews.sh` regenerates both); the dark variant inverts canvas and neutrals while keeping the chromatic Editorial Red identity locked, and is best read as the after-hours / inverted-section register of the same system rather than a real product dark mode.

## §2 Palette

Each entry: token name, OKLCH value (converted from spec hex via vendored culori), hex equivalent, and the spec citation.

### Brand primary (Editorial Red)

- `--primary`: `oklch(0.5308 0.2178 29.23)` (= `#CC0000`). Source: spec §2 Colors > Accent. "Bright, unapologetic red used extremely sparingly — only for breaking news badges, CTAs, and hover states. 99% of the design is black and white."

The brand primary is **deliberately rare**: the spec calls for the accent to colour roughly 1% of the surface. Treat `--primary` as a CTA fill, link-decoration colour, focus-ring accent, and badge background — never as a flood.

### Canvas + foreground

- `--background`: `oklch(0.9816 0.0026 106.45)` (= `#F9F9F7`). Source: spec §2 Colors > Background. "Warm off-white that mimics aged paper."
- `--foreground`: `oklch(0.1776 0 0)` (= `#111111`). Source: spec §2 Colors > Foreground. "Very deep black, not pure `#000`. Used for all text and borders." Borders share this value with foreground — that's a deliberate grid choice, not a token collision.

### Neutrals (chroma ≈ 0 utility ladder)

- `--brand-neutral-100`: `oklch(0.9702 0 0)` (= `#F5F5F5`). Source: spec §2 Colors > neutral-100. "Hover backgrounds."
- `--brand-neutral-200`: `oklch(0.9219 0 0)` (= `#E5E5E5`). Source: spec §2 Colors > neutral-200. "Image placeholders."
- `--brand-neutral-400`: `oklch(0.7155 0 0)` (= `#A3A3A3`). Source: spec §2 Colors > neutral-400. "Muted text in dark sections."
- `--brand-neutral-500`: `oklch(0.5555 0 0)` (= `#737373`). Source: spec §2 Colors > neutral-500. "Metadata, captions."
- `--brand-neutral-600`: `oklch(0.4386 0 0)` (= `#525252`). Source: spec §2 Colors > neutral-600. "Body text variations."
- `--brand-neutral-700`: `oklch(0.3715 0 0)` (= `#404040`). Source: spec §2 Colors > neutral-700. "Secondary headings."

### Divider / muted surface

- `--muted`: `oklch(0.9205 0.0067 106.53)` (= `#E5E5E0`). Source: spec §2 Colors > Muted (Divider Grey). "Light grey for secondary borders and subtle backgrounds."
- `--brand-input-focus`: `oklch(0.9551 0 0)` (= `#F0F0F0`). Source: spec §3 Components > Inputs. "On focus: light grey background, no ring."

### Polarity-locked surfaces

- `--brand-canvas-night`: `oklch(0.1776 0 0)` (= `#111111`). Source: spec §4 item 9. The Ink Black canvas used for the "How It Works" inverted band and the marquee ticker — fixed at Ink Black regardless of mode.
- `--brand-on-dark`: `oklch(0.9816 0.0026 106.45)` (= `#F9F9F7`). Source: spec §3 Components > Buttons > Primary Button. Newsprint Off-White used as text colour on Ink Black surfaces.

### Hairlines / borders

- `--border`: `oklch(0.1776 0 0)` (= `#111111`). Source: spec §2 Colors > Border. "The primary structural element. Borders define the grid and create visual rhythm." 1px solid Ink Black is the standard structural border; spec §2 also documents 4px for major section dividers and a collapsed-border pattern where adjacent grid cells share borders to avoid doubles.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (H1 hero) | Playfair Display | 700–900 | 5xl → 6xl → 9xl (80px → 128px) | 0.9 | tracking-tighter |
| Heading (H2 section) | Playfair Display | 700–900 | 4xl → 5xl (36px → 48px) | 1.1 | normal or condensed |
| Title (H3 card) | Playfair Display | 700 | 2xl → 3xl (24px → 30px) | 1.2 | normal |
| Body (long-form) | Lora | 400 (italic 400 also documented) | sm → lg (14px → 18px) | 1.625 | normal |
| Caption / Metadata | JetBrains Mono | 400–500 | xs (12px) | 1.4 | tracking-widest |
| UI (nav, button, label) | Inter | 400–700 | xs → sm | 1.4 | tracking-widest (uppercase) |

Source: spec §2 Typography. Four families ship: Playfair Display (display + headlines, high-contrast serif with authoritative roman cut), Lora (body, highly legible humanist serif tuned for long-form reading), Inter (UI / sans), JetBrains Mono (data / metadata / edition strips / captions).

Spec calls out specific patterns: H1 hero headlines use `leading-[0.9]` plus `tracking-tighter` for a condensed broadsheet feel. Drop caps on key paragraphs are `text-7xl float-left` — Playfair Display set massive against the body. Uppercase labels are `text-xs font-mono` with `tracking-widest` and appear "liberally" across nav, section labels, badges, and bylines.

## §4 Component vocabulary

### Primary button
**Source:** spec §3 Buttons > Primary Button
**Description:** Solid Ink Black background, Newsprint Off-White text, transparent 1px border. Uppercase label, `tracking-widest`, sharp corners (zero radius enforced). Touch target floor `min-h-[44px]`.
**States:** default — black fill / off-white ink; hover — inverts to white background with black text and a 1px black border; transition `transition-all duration-200 ease-out`.

### Secondary button (outline)
**Source:** spec §3 Buttons > Secondary Button
**Description:** Transparent background, 1px solid Ink Black border, Ink Black uppercase label. Sharp corners.
**States:** default — transparent; hover — fills Ink Black with Newsprint Off-White text.

### Ghost button
**Source:** spec §3 Buttons > Ghost Button
**Description:** No border, no fill at rest. Sharp corners. Uppercase label.
**States:** default — invisible chrome; hover — Divider Grey `#E5E5E0` background fill, Ink Black text.

### Link button
**Source:** spec §3 Buttons > Link Button
**Description:** Text-only, Ink Black, no chrome. Editorial Red underline decoration appears on hover only; underline offset 4px, decoration thickness 2px.
**States:** default — no underline; hover — `text-decoration: underline` with `decoration-color: #CC0000`.

### Standard card
**Source:** spec §3 Cards/Containers > Standard Card
**Description:** 1px solid Ink Black border on Newsprint Off-White canvas. Tight internal padding (`p-4` to `p-8`). Zero border radius. Optional collapsed-border treatment (adjacent cards share a single border line).
**States:** default — flat; hover — Neutral-100 `#F5F5F5` background fill, OR the hard-shadow-hover treatment (see below).

### Hard offset shadow (hover lift)
**Source:** spec §2 Shadows/Effects > Hover Effects
**Description:** The signature interaction. `box-shadow: 4px 4px 0 0 #111111` paired with `transform: translate(-2px, -2px)`. No blur, no softness — a hard rectangle of ink offset to the lower-right while the element itself snaps up-left by 2px. Reads as a newspaper paper-cutout lift, not a soft UI elevation. Applied to cards and key interactive surfaces.

### Newspaper column grid
**Source:** spec §5 Grid System + §4 item 1
**Description:** 12-column base grid with `border-r` on all but the last column and `border-b` on all rows — adjacent cells deliberately share borders to avoid double lines. Common splits diverge from the 50/50 default: 8/4 hero, 5/7 benefits, asymmetric editorial. Vertical column dividers (border-r) run inside rows, not only between sections — that's what makes the page feel like a broadsheet grid rather than a stacked landing page.

### Edition metadata strip
**Source:** spec §4 item 4
**Description:** Header carries "Vol. 1 | [Date] | [Edition]" rendered in JetBrains Mono, uppercase, `tracking-widest`. Footer carries "Edition: Vol 1.0 | Printed in [Place]". Image captions read "Fig. 1.1" etc. Treats the page as a numbered, dated, located issue of a publication of record.

### Marquee ticker
**Source:** spec §4 item 3
**Description:** Horizontal scrolling band on Ink Black canvas (`--brand-canvas-night`) with Newsprint Off-White text. Editorial Red badges punctuate breaking-news items. Stock-ticker / news-crawl cadence. Mechanical motion, no easing softness.

### Inverted section
**Source:** spec §4 item 9
**Description:** One major section per page flips to Ink Black background with Newsprint Off-White text. Numbered steps use Editorial Red as the numeral colour or chip background. Frames sections like "How It Works" or "Editor's Note" as a dedicated typographic register.

### Underline input
**Source:** spec §3 Inputs
**Description:** Transparent background, 2px solid Ink Black bottom border only (no top, left, or right border). Internal padding `px-3 py-2`. JetBrains Mono at `text-sm`. Zero border radius enforced.
**States:** default — transparent; focus — Neutral `#F0F0F0` background fill, no ring, no outline.

### Bordered icon container
**Source:** spec §3 Icons > Icon Containers
**Description:** Lucide-style icon (`stroke-width: 1.5`, `h-6 w-6`) wrapped in a `h-12 w-12` square with 1px solid Ink Black border. Ink Black stroke on Newsprint Off-White at rest.
**States:** default — black on off-white; hover — fills Ink Black with off-white icon stroke, `transition-all`.

### Drop cap
**Source:** spec §4 item 2
**Description:** First letter of a key paragraph rendered at `text-7xl`, `float-left`, in Playfair Display. Optional Editorial Red accent on the cap itself. Body text wraps around the cap in newspaper-column register.

### Dot grid background pattern
**Source:** spec §2 Textures > Dot Grid Pattern
**Description:** SVG-encoded 4×4px Ink Black dot pattern at 4% opacity applied to the body background. Subtle, fibre-grain effect that sits below content without competing.

### Line grid texture overlay
**Source:** spec §2 Textures > Line Grid Overlay
**Description:** Fine 3×3px graph-paper crosshatch via two `linear-gradient` layers at 98% transparency, applied through a `::before` pseudo-element at 0.5 opacity. Used on major sections for a print-paper feel.

### Radial halftone placeholder
**Source:** spec §2 Textures > Radial Dot Pattern
**Description:** `radial-gradient(black 1px, transparent 1px)` at `16px 16px` tile, 10% opacity. Used on image-placeholder surfaces to simulate halftone-screen newspaper printing.

### Ornamental divider
**Source:** spec §2 Textures > Ornamental Dividers
**Description:** Serif glyphs centered between major sections — typical pattern `✧ ✧ ✧` rendered in Playfair Display at `text-2xl`, Neutral-400 colour, `tracking-[1em]` to space the ornaments apart. Replaces a horizontal rule between thematic blocks.

### Uppercase mono label
**Source:** spec §4 item 8
**Description:** `text-xs`, JetBrains Mono (or Inter for UI registers), `uppercase`, `tracking-widest`. Used for section eyebrows, navigation links, badges, bylines, and metadata strips. The most-repeated micro-typography pattern in the system.

### Grayscale image treatment
**Source:** spec §4 item 6
**Description:** `filter: grayscale(1)` applied to all editorial images by default; hover adds `sepia(50%)` for a vintage newspaper-photo recoloration. Combined with the halftone placeholder treatment for a consistent print-photography register.

### Justified text columns
**Source:** spec §4 item 5
**Description:** `text-align: justify` applied to multi-column body copy (blog descriptions, long-form sections). Pairs with `hyphens: auto` to mimic the typesetter's column flow.

### Accordion / FAQ disclosure
**Source:** spec §6 Effects + §3 Components > Accordion
**Description:** CSS Grid height-transition pattern: closed state `grid-template-rows: 0fr`, open state `1fr`, with `transition: grid-template-rows 300ms ease-in-out`. Plus icon rotates 45° to become an X when expanded. `<button>` with `aria-expanded`.

### Focus ring
**Source:** spec §9 Focus States
**Description:** `:focus-visible` only (no `:focus` flash on click). 2px solid Ink Black ring with 2px ring offset. No softness, no glow — same hard discipline as the rest of the system.

## §5 Surface inventory

This system has no live deployed site to sample. The surfaces below are the **conceptual surfaces the spec enumerates**, each of which should appear at least once across a representative preview:

- **Masthead** — wordmark, edition strip ("Vol. 1 | [Date] | [Edition]"), uppercase mono nav
- **Hero broadsheet** — massive Playfair headline up to 9xl, vertical column dividers carving the row into 8/4 or 5/7 splits, byline strip
- **Marquee ticker** — Ink Black canvas, white running text, Editorial Red badges punctuating breaking items
- **Newspaper column grid** — 12-col collapsed-border cards, each one a story tile with image placeholder + headline + byline + dek
- **Inverted "How It Works" section** — Ink Black canvas, off-white text, numbered steps with Editorial Red numerals
- **Editorial long-form** — drop cap, justified body, ornamental dividers between thematic blocks
- **Footer** — edition metadata closing strip, ornamental divider, link columns

## §6 Notes

- **Permanent light mode.** The spec is explicit: "Mode: Light (Permanent - no dark mode)." Catalog scaffolding still emits `preview-dark.html`; that variant inverts canvas + neutrals but **locks the Editorial Red identity, the Ink Black polarity-locked tokens (`--brand-canvas-night`, `--brand-on-dark`), and the structural border discipline**. Read the dark preview as the inverted-section register at full-page scale, not as a real product dark mode.

- **Editorial Red is rare by design.** The spec calls for the accent on roughly 1% of surface area — breaking-news badges, link underlines on hover, focus rings, the occasional drop-cap accent. Treat any flood-fill use of Editorial Red as a violation of the system.

- **Zero border radius everywhere.** No exceptions. Buttons, cards, inputs, images, badges, ornaments — every corner is a perfect 90 degrees. This is the single hardest visual discipline.

- **Borders define the grid, not the chrome.** Border colour equals foreground colour by deliberate choice (`#111111`). 1px is the standard weight, 2px on input underlines, 4px on major section dividers. The collapsed-border pattern — adjacent cells sharing a single border — is the structural signature; double lines are the visual smell.

- **Hard offset shadow is the only "elevation" the system ships.** No soft drop shadow, no blur, no glow. `4px 4px 0 0 #111111` paired with a 2px translate is the entire elevation vocabulary. Treat any `filter: drop-shadow` or `box-shadow` with non-zero blur as foreign.

- **Edition metadata is identity, not decoration.** "Vol. 1 | [Date] | [Edition]" and "Fig. 1.1" captions aren't optional flourishes — they're how the system signals its broadsheet-publication character. Strip them and the page reads as "a website with serifs" rather than as a newspaper.

- **Uppercase mono is the system's atomic label.** Section eyebrows, nav links, badges, bylines, metadata strips all reach for the same `uppercase tracking-widest font-mono text-xs` pattern. Variation is rare and earned.

- **Source-brand content avoidance.** The raw spec mentions "New York Edition" and "Printed in NYC" as example edition-metadata strings. The preview and any downstream consumer should **not lift those specific locations** — they're illustrative of the metadata shape, not the system's required vocabulary. Use generic placeholders (e.g., "Halcyon Edition", "Printed at HQ", "Vol. 1 | Issue 04") for any rendered example.

- **Distinction from `paper-ink`.** Sibling system in the catalog. News-print is layout-and-hierarchy-led (grid discipline, typographic drama, edition metadata, halftone photography). Paper-ink (judging by name and catalog convention) reads as letterpress / ink-saturation-led. When choosing between the two for a given consumer: news-print for editorial layouts that need the broadsheet grid; paper-ink for surfaces that need fibre and ink texture without the strict grid.

## §Known gaps

- **No live site to sample.** This system is spec-derived. The catalog's `verified-urls` mechanism is replaced by `reference-materials` in the frontmatter, and every chromatic value cites the spec rather than a DOM selector. If a downstream consumer needs a deployed example surface, the closest analogues in the public web are NYT, FT, and Guardian opinion sections — but the spec was not derived from those, and any drift between the spec and what those publishers ship today should be treated as a spec-versus-live-brand mismatch, not as a system bug.

- **No documented chart palette.** The spec does not enumerate data-visualization colours. Default to a grayscale chart ladder with Editorial Red reserved for a single highlighted series — matches the rest of the system's monochrome-with-1%-accent discipline.

- **No dark-mode citations.** Spec forbids a dark mode, so there is nothing to cite when filling the `[data-theme="dark"]` block. Values there are synthesised inversions of canvas and neutrals; the chromatic primary stays at `:root` per the canonical no-dark-mode-swap convention. This is the only category of token in `tokens.css` without a primary-source citation.
