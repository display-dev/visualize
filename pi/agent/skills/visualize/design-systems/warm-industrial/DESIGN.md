---
slug: warm-industrial
name: Warm Industrial
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/warm-industrial/raw.md (Superdesign.dev catalog entry — "Warm Industrial Gray Style" by Zhou Jason, scoped at https://app.superdesign.dev/library/warm-industrial-gray-style)
  - principles: brutalist grid structures + editorial typography + warm concrete gray neutral register with a single electric-blue chromatic accent
canonical-canvas: light
selection:
  mood: [organic, industrial, spatial]
  tone: [calm, warm]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a calm, warm register with organic, industrial, spatial visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Warm Industrial

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Spec — primary register | spec §raw.md | warm gray `#EBEBE8` body | Author declares the warm-gray canvas as a `MUST` constant. Every documented section sits on this surface; only the marquee shifts to `#F4F4F5` and the footer flips to charcoal `#18181B`. |
| Spec — marquee ribbon | spec §Section 4 | zinc-100 `#F4F4F5` | Single off-canvas band carrying scrolling text + electric-blue star separators. |
| Spec — footer | spec §Section 6 | charcoal `#18181B` | Inverted closing band: charcoal canvas, `#EBEBE8` ink, oversized contact link, 20vw background marquee at 10% opacity. |

The spec carries no live URL beyond the Superdesign catalog page. Treating the spec text as the canonical surface: light register dominates (header → hero → marquee → project list → parallax → journal), with a single inverted footer. Canonical canvas is **light**.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and the spec citation that supplied the colour. OKLCH conversion via vendored culori (`visualize/scripts/vendor/culori.mjs`).

### Brand primary

- `--primary`: `oklch(0.5635 0.2408 260.82)` (= `#0066FF`). Live: spec §Style prompt — "Accent Blue #0066FF". Used sparingly: star separators in the marquee, hover overlays on revealed images (`#0066FF/20 mix-blend-multiply`), focus rings on interactive elements.

### Documented secondary brand colours

- `--brand-status-live`: `oklch(0.7227 0.1920 149.58)` (= `#22C55E`). Live: spec §Components/3 — "6px circle with background #22C55E (Green-500) [...] outer pulse animation [...] real-time availability or system status". The spec scopes this token narrowly: live/operational indicators only, never decorative.

### Canvas + neutrals

- `--background`: `oklch(0.9392 0.0040 106.48)` (= `#EBEBE8`). Live: spec §Style prompt — "Background #EBEBE8". MUST-preserved per §Special Notes.
- `--foreground`: `oklch(0.2103 0.0059 285.89)` (= `#18181B`). Live: spec §Style prompt — "Foreground #18181B" (zinc-900).
- `--card`: `oklch(0.9756 0.0026 106.45)` (= `#F7F7F5`). Synthesised one stop above the canvas to support card lifts. Spec doesn't enumerate a card surface; this carries the warm tint forward.
- `--card-foreground`: `oklch(0.2103 0.0059 285.89)` (= `#18181B`). Mirrors `--foreground`.
- `--popover`: `oklch(0.9392 0.0040 106.48)` (= `#EBEBE8`). Mirrors canvas; popovers in this register sit on the same warm gray with a hairline border, not a lifted fill.
- `--popover-foreground`: `oklch(0.2103 0.0059 285.89)` (= `#18181B`).
- `--muted`: `oklch(0.9674 0.0013 286.37)` (= `#F4F4F5`). Live: spec §Section 4 — "bg #F4F4F5" on the marquee ribbon. Zinc-100, the only documented off-canvas neutral on the light register.
- `--muted-foreground`: `oklch(0.4419 0.0146 285.79)` (= `#52525B`). (synthesised — zinc-600, the conventional Tailwind zinc step for muted body text). Spec describes "tiny caps" and "10px mono" labels without prescribing their colour; zinc-600 holds AA on `#EBEBE8`.
- `--accent`: `oklch(0.9674 0.0013 286.37)` (= `#F4F4F5`). Mirrors `--muted` — the marquee surface doubles as the brand's only accent fill in light mode.
- `--accent-foreground`: `oklch(0.2103 0.0059 285.89)` (= `#18181B`).
- `--secondary`: `oklch(0.9197 0.0040 286.32)` (= `#E4E4E7`). (synthesised — zinc-200, half-stop between border and canvas, conventional for secondary buttons).
- `--secondary-foreground`: `oklch(0.2103 0.0059 285.89)` (= `#18181B`).
- `--destructive`: `oklch(0.5771 0.2152 27.33)` (= `#DC2626`). (synthesised — Tailwind red-600. Spec doesn't document destructive surfaces; this is the conventional shadcn slot value).
- `--destructive-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). (synthesised).
- `--border`: `oklch(0.8711 0.0055 286.29)` (= `#D4D4D8`). Live: spec §Style prompt — "Borders #D4D4D8 (Zinc-300)" + "Borders should be 1px solid Zinc-300".
- `--input`: `oklch(0.8711 0.0055 286.29)` (= `#D4D4D8`). Mirrors `--border` — spec doesn't differentiate.
- `--ring`: `oklch(0.5635 0.2408 260.82)` (= `#0066FF`). Tracks `--primary` (focus ring uses the electric blue accent).

### Polarity-locked surfaces

Tokens that stay fixed across `:root` and `[data-theme="dark"]`:

- `--brand-canvas-night`: `oklch(0.2103 0.0059 285.89)` (= `#18181B`). Live: spec §Section 6 — "Background #18181B" on the footer. The footer reads as charcoal regardless of theme; it's the inverse-polarity moment in the light register.
- `--brand-on-dark`: `oklch(0.9392 0.0040 106.48)` (= `#EBEBE8`). Live: spec §Section 6 — "Text #EBEBE8". Ink locked to the always-dark footer surface; same value as `--background` because the spec uses the canvas colour as ink-on-charcoal.
- `--brand-canvas-marquee`: `oklch(0.9674 0.0013 286.37)` (= `#F4F4F5`). Live: spec §Section 4. Polarity-locked light surface (the marquee ribbon is always light grey, even in a dark variant — it's a register punctuation, not a canvas).

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9197 0.0040 286.32)` (= `#E4E4E7`). (synthesised — zinc-200, one stop above the documented `--border` to carry section breaks without competing with the structural 12-column grid lines).
- `--brand-hairline-strong`: `oklch(0.8711 0.0055 286.29)` (= `#D4D4D8`). Mirrors `--border` — spec uses a single hairline weight ("1px solid Zinc-300") for all structural dividers.

### Structural grid

- `--brand-grid-line`: `oklch(0.2103 0.0059 285.89 / 0.1)` (= `#18181B` at 10% opacity). Live: spec §Section 1 — "12 vertical grid lines (#18181B at 0.1 opacity) evenly spaced across a max-width of 1600px". The persistent background grid is a documented chromatic token, not a runtime calculation.

### Drift vs `tokens.css`

Not applicable — `tokens.css` is being authored fresh in this cycle from §2. No prior file to drift against.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Inter | 900 | 128–160px (8xl–10xl) | 0.95 | −0.05em |
| Display-italic | Playfair Display | 400 italic | 128–160px (8xl–10xl) | 0.95 | −0.025em |
| Heading | Inter | 700 | 60–72px | 1.05 | −0.03em |
| Title | Inter | 700 | 28–32px | 1.15 | −0.01em |
| Body | Inter | 400 | 16–18px | 1.55 | 0 |
| Label / readout | Inter (or mono fallback) | 700 uppercase | 10–11px | 1.2 | 0.2em–0.3em |

Notes:

- **Inter + Playfair Display Italic pairing.** Spec declares Inter at 400/700/900 for structural UI and Playfair Display Italic (weight 400) for editorial flair. Hero headings are explicitly split — heavy grotesque sans-serif on one line, italic serif on the next, with the serif italic carrying the "editorial" register against the brutalist grid.
- **Stroke-text variant.** §Components/1 specifies massive display text rendered as outline-only via `-webkit-text-stroke: 1px #18181B; color: transparent;`. Used at 8xl–10xl to "create visual lightness despite large scale". Not a separate role — a treatment applied to the Display role.
- **Uppercase label tracking.** Every label, eyebrow, status indicator, mono identifier sits at 10px Inter Bold uppercase with `letter-spacing: 0.2em–0.3em`. The spec lifts this from "all labels and small UI elements" wholesale — it's the register's signature small-type treatment.
- **Tracking-negative on display.** −0.05em on the 8xl–10xl tier is aggressive (the typical hero ceiling is −0.03em). The spec carries it explicitly; preserve it.

## §4 Component vocabulary

One entry per distinct component pattern documented in the spec. The spec enumerates four canonical components (§Components/1–3, plus the structural grid in §Section 1). Adjacent shapes drawn from the layout sections appear below; status `derived-from-spec` flags those.

### Structural grid

**Status:** `current`
**Live source:** spec §Section 1.
**Description:** Fixed full-page background layer. 12 evenly-spaced vertical lines at `#18181B / 0.1` opacity rendered as 1px columns across a max-width of 1600px, centered horizontally, persistent behind all content. Pages align text and surfaces to these lines explicitly (§Special Notes — "MUST: Use strict grid alignment").
**States:** static — no hover, no interaction.

### Stroke-text effect

**Status:** `current`
**Live source:** spec §Components/1.
**Description:** Outline-only display text rendered via `-webkit-text-stroke: 1px var(--foreground); color: transparent;`. Used at 8xl–10xl on hero headings to create visual lightness despite large scale. The technique appears in both the hero (sans-serif stroke against serif italic) and the marquee ribbon (stroke-text alternating with solid italic serif).
**States:** static treatment, not interactive. Hover state on revealed list items shifts from stroke to filled `var(--foreground)`.

### Clip-path project reveal

**Status:** `current`
**Live source:** spec §Components/2.
**Description:** List-row image reveal. Images sit hidden behind `clip-path: inset(0 0 0 100%)` by default. On parent row hover, the clip transitions to `inset(0 0 0 0)` over 0.6s using `cubic-bezier(0.16, 1, 0.3, 1)`. Revealed image receives `filter: grayscale(1)` plus a `#0066FF/20` overlay applied via `mix-blend-multiply`. A floating "View" circle with an arrow either tracks the cursor or anchors right of the row during hover.
**States:** default (clipped, invisible), hover (revealed with overlay), reduced-motion (skip transition, treat hover as instant or disable the reveal entirely).

### Status pulse

**Status:** `current`
**Live source:** spec §Components/3.
**Description:** 6px filled circle (`background: var(--brand-status-live)`, i.e. `#22C55E`) with an outer pulse animation driven by `box-shadow` or `scale`. Reserved for real-time availability or system status — never decorative. Sits inline with a 10px uppercase label ("AVAILABLE", "SYSTEM OPERATIONAL").
**States:** pulsing (default — animation runs continuously), reduced-motion (drop the pulse keyframe; the static green dot stands in).

### Sticky header

**Status:** `derived-from-spec`
**Live source:** spec §Section 2.
**Description:** 80px-tall sticky bar. Background `var(--background)` at 80% opacity with `backdrop-filter: blur(10px)`. 1px bottom hairline against `var(--border)`. Three zones: left-aligned tiny-caps nav links, absolute-centred logo (serif italic prefix + bold sans suffix), right-aligned rounded-full CTA button. The centred logo construction is the brand's signature header pattern — italic serif word + bold sans word, set in 10px uppercase caps register.
**States:** default (semi-transparent), scrolled (same — the spec doesn't document a scrolled shrink).

### Hero split block

**Status:** `derived-from-spec`
**Live source:** spec §Section 3.
**Description:** 12-column split. Left zone (7 columns): vertical stack of an `AVAILABLE` status pulse, a three-line hero heading mixing stroke-text + serif italic, 10px mono readout labels, and a large rectangular `Start` CTA with a hover-rotating arrow icon. Right zone (5 columns): full-height grayscale image with a 20px internal frame, overlaid by a glassmorphism card containing system-status bars and mono identifiers.
**States:** static — internal CTA carries its own hover (arrow rotation).

### Marquee ribbon

**Status:** `derived-from-spec`
**Live source:** spec §Section 4.
**Description:** Full-width 120px-tall band. Background `var(--brand-canvas-marquee)` (= zinc-100). Content is a horizontally scrolling 7xl-sized text row that alternates Inter stroke-text with Playfair Display italic, separated by 24px electric-blue (`var(--primary)`) star icons. The marquee never pauses; reduced-motion stops the scroll and leaves the visible substring static.
**States:** scrolling (default), reduced-motion (paused).

### Project list row

**Status:** `derived-from-spec`
**Live source:** spec §Section 5.
**Description:** Vertical stack of 300px-tall rows. Each row carries a 1px bottom hairline (`var(--brand-hairline-strong)`), a left-aligned title (Inter 700, shifts to Playfair Display Italic on hover), and an optional right-aligned client label. Hover triggers the clip-path project reveal (a grayscale image slides in from the right) and surfaces the floating "View" circle.
**States:** default (title in Inter, no image), hover (title in serif italic, image revealed, View circle visible).

### Rectangular CTA button

**Status:** `derived-from-spec`
**Live source:** spec §Section 3 (the "Start" button) + §Special Notes ("DO NOT: Use rounded corners on anything except the main CTA buttons and small status badges").
**Description:** Rectangular by default (the spec carves out an exception for "main CTA buttons" — those use a `--radius-pill` shape, per the header CTA description). The default action button is hard-cornered, `var(--foreground)` background, `var(--background)` text, 1.25rem horizontal padding, with a trailing arrow icon that rotates 45° on hover.
**States:** default, hover (arrow rotates), focus-visible (2px `var(--primary)` outline, 3px offset).

### Inverted footer

**Status:** `derived-from-spec`
**Live source:** spec §Section 6.
**Description:** Charcoal canvas (`var(--brand-canvas-night)`) with `var(--brand-on-dark)` ink. Anchored by an oversized contact link (4xl, Inter or Playfair italic) with a bottom-border hover indicator. Behind the foreground content, a 20vw-sized text marquee runs at 10% opacity as decorative atmosphere. Bottom row carries a green status pulse ("System Operational") + 10px tracked copyright text.
**States:** static.

## §5 Surface inventory

The spec is the only sampled surface this cycle. The §Layout sections list seven canonical section types — header, hero, marquee, project list, parallax, journal, footer — which the spec describes verbatim. No live brand URLs were resolved beyond the catalog page at https://app.superdesign.dev/library/warm-industrial-gray-style.

- spec §Section 1–6 — every documented surface, treated as the source-of-truth in lieu of a live brand site.
- spec §Components 1–3 — the three canonical components (stroke text, clip-path reveal, status pulse).
- spec §Special Notes — register constraints (canvas MUST preserve, rounded-corner restrictions, noise visibility).

## §6 Notes

Brand-specific patterns worth flagging for future authors:

- **Single chromatic accent, narrowly scoped.** `#0066FF` is the only saturated brand colour, used only as star separators in the marquee, as a 20%-opacity overlay tint on revealed images, and as the focus ring. Never as fill, never as body ink. `#22C55E` is reserved to status pulses. Authors should resist surfacing either as a generic accent fill — the spec's explicit constraint is "chromatic accent as state/action indicator, not decoration."
- **Polarity-locked footer.** The footer is the only inverted surface in the light register. It's not a "dark mode preview" — it's structurally always-charcoal. Treat `--brand-canvas-night` + `--brand-on-dark` as locked.
- **Noise overlay is part of the register.** Spec §Style prose declares "a constant 4% opacity fractal noise overlay [...] tactile, analog feel". Authors implementing previews must include an SVG `<feTurbulence>` overlay at 0.04 opacity, fixed-position over the full canvas. Without it the register collapses to a flat warm gray.
- **Stroke-text + serif italic is the typographic voltage moment.** The hero / marquee both stack heavy Inter outline against Playfair Display italic. Treat the pairing as the brand's recognizability — if a mockup only carries one of the two, it isn't reading as warm-industrial.
- **12-column grid lines are visible, not just structural.** Most design systems imply their grid; this one renders it. The 12 vertical hairlines at 10% opacity behind all content are a register signal and a structural alignment guide simultaneously.
- **Rounded corners restricted.** §Special Notes carves out exactly two exceptions to a default-rectangular shape language: "main CTA buttons" (pill-shape) and "small status badges" (full-rounded). Everything else — cards, inputs, popovers, image frames — stays sharp.
- **High-inertia easing.** `cubic-bezier(0.16, 1, 0.3, 1)` is the canonical timing function. The same curve carries clip-path reveals, hover state transitions, and any transform-based animation. Authors swapping in a default ease-out break the register.

## §Known gaps

- **No live brand site.** Source is a single catalog spec (Superdesign.dev). There's no deployed surface to verify the spec's prescriptions against — typography rendering at the documented sizes, the actual feel of the 4% noise overlay, the inertia curve in motion. Treat the spec as a complete specification: every value declared is the brand value; values not declared (destructive states, popover register, sidebar treatment, chart palette) are synthesised from the conventional Tailwind zinc ladder.
- **Chart palette undocumented.** Spec doesn't enumerate data-viz colours. `--chart-1` through `--chart-5` synthesised from `--foreground` + zinc-700 + zinc-600 + zinc-500 + `--primary` (the chromatic exception). Future authors with a documented data-viz surface should override.
- **Dark mode unspecified.** Spec carries no dark-mode variant; the inverted footer is the only dark surface, and it's polarity-locked rather than a theme. A dark theme synthesised below mirrors the warm-industrial register onto a near-black canvas (`#0A0A0B`) — the marquee surface flips to zinc-800, the footer flips to canvas (paradoxically the footer becomes the light-inverted moment in dark mode, since polarity-locks hold).
- **Component states partial.** Spec describes default + hover for most components; pressed, disabled, loading states are not documented. Authors implementing interactive surfaces should derive states from the register (pressed = 95% scale + foreground shift, disabled = 40% opacity, loading = pulse animation reusing the status-pulse keyframe).
