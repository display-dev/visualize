---
slug: cyber-serif
name: Cyber Serif
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/cyber-serif/raw.md (Cyber Serif Style spec by Zhou Jason; description, summary, style prose, style prompt, layout sections, components, special notes)
  - imagery: none — spec is text-only; no reference imagery shipped with this cycle
  - principles: editorial-meets-cyberpunk register; classical serif display + technical mono labels + surgical emerald accent on a near-black canvas
canonical-canvas: dark
selection:
  mood: [editorial, high-contrast, cyberpunk, gradient]
  tone: [dramatic, bold]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a dramatic, bold register with editorial, high-contrast, cyberpunk, gradient visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Cyber Serif

A register-family invention. The spec frames it as "classical-tech hybrid" — Newsreader serif setting the editorial register, Space Grotesk handling all-caps technical labels at very small sizes, and an emerald accent (#10b981) used surgically against a deep near-black canvas (#050505). The register sits on top of the dark-canonical convention with strict rules about emerald never appearing as a block fill, glassmorphism on cards, and animation curves that converge gently (`cubic-bezier(0.16, 1, 0.3, 1)`).

## §1 Canonical canvas

The system ships dark-only. The spec's "primary text" (#EBEBEB) is a near-white that reads as warm-grey on the dominant #050505 canvas. There is no documented light variant; the surface vocabulary (glassmorphism via 2% white fills, 10% white hairlines, 100px blurred emerald glows behind cards) only makes sense on a near-black ground. Both `[data-theme="dark"]` and `:root` carry the same canvas values because there is no second polarity to flip to.

| Surface | Reference | Canvas | Notes |
|---|---|---|---|
| Hero / landing | spec §"Section 2: Hero Section" | `#050505` near-black with morphing emerald blob glows | 100vh; serif headline at 100px tracking-tighter leading-0.9; one italic emerald word inside |
| Feature grid | spec §"Section 3: Feature Grid" | `#050505` carrying glassmorphism cards (`rgba(255,255,255,0.02)` fill, `rgba(255,255,255,0.1)` border) | Shimmer Border + Spotlight Cursor signature on every card |
| Benchmark table | spec §"Section 4: Benchmark Table" | `#050505` with 1px `rgba(255,255,255,0.05)` row hairlines | Space Grotesk 10px header row; alternating muted-white / emerald column ink; count-up animations on numbers |
| CTA closer | spec §"Section 5: CTA Section" | `#050505` carrying a massive serif headline with white-to-emerald horizontal gradient text | Single full-pill button with continuous emerald pulse shadow |

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, source. Hex values converted to OKLCH via vendored culori at `visualize/scripts/vendor/culori.mjs`.

### Brand primary

The spec is explicit: emerald is a surgical accent. It must never appear as a fill on a large block, only as ink for a single emphasis word, as a 1px underline expanding on link hover, as a glow shadow under pill CTAs, as a 6×6 pulse dot on technical labels, as the second stop in shimmer-border gradients, and as the alternating-column ink inside the benchmark table.

- `--primary`: `oklch(0.6959 0.1491 162.48)` (= `#10b981`). Live: raw.md §"Style prose" — "Accent Emerald (#10b981)"; raw.md §"Style prompt" — "Accent color is #10B981 (Emerald)"; raw.md §"Special Notes" — "Use #10b981 sparingly as a surgical accent color, never as a large block background."
- `--brand-primary-deep`: `oklch(0.5960 0.1274 163.23)` (= `#059669`). Derived sibling at the pressed-state lightness for buttons that need a hairline-darker emerald on press — the spec doesn't enumerate a state ladder, but the "weighted-feel" cubic-bezier and the pulse-glow specification both imply a state cycle.
- `--brand-primary-soft`: `oklch(0.7729 0.1535 163.22)` (= `#34d399`). Lighter sibling for shimmer-border middle-stop tint variation. Same lineage rationale as `-deep`.

### Documented secondary brand colours

There are none. The spec is monochromatic-plus-emerald by design — every chromatic moment routes through `--primary`. The chart palette is a forced shrink-back to monochrome lightness steps with a single emerald anchor at chart-1.

### Canvas + neutrals

The canvas is one polarity-locked near-black. Foreground inks are stepped down by lightness over that canvas — the spec writes them as `text-white`, `text-white/50`, `text-white/40`, but the catalog stores opaque OKLCH equivalents so consumers don't need to resolve alpha at use site.

- `--background`: `oklch(0.1149 0 0)` (= `#050505`). Live: raw.md §"Style prose" — "Primary black (#050505)"; raw.md §"Special Notes" — "maintain the deep black (#050505) as the dominant tone."
- `--foreground`: `oklch(0.9401 0 0)` (= `#EBEBEB`). Live: raw.md §"Style prose" — "Text White (#EBEBEB)"; raw.md §"Style prompt" — "primary text of #EBEBEB."
- `--card`: `oklch(0.1591 0 0)` (= `#0d0d0d`, opaque equivalent of glassmorphism `rgba(255,255,255,0.02)` over canvas). Live: raw.md §"Components — Glassmorphism" — "background: rgba(255, 255, 255, 0.02)". `(synthesised as opaque equivalent)`
- `--card-foreground`: tracks `--foreground` at `oklch(0.9401 0 0)`.
- `--popover`: tracks `--card`.
- `--popover-foreground`: tracks `--foreground`.
- `--muted`: `oklch(0.1867 0 0)` (= `#131313`, the surface-2 step) `(synthesised — spec ladders surfaces by alpha, not by named stops)`
- `--muted-foreground`: `oklch(0.5521 0 0)` (= `#727272`, opaque equivalent of `text-white/40`). Live: raw.md §"Section 3: Feature Grid" — "description in muted sans-serif (text-white/40)".
- `--accent`: tracks `--primary` — emerald is the sole accent.
- `--accent-foreground`: `oklch(0.1149 0 0)` (= near-black). On the rare surface where emerald appears as a fill (the pulse dot, the link underline, the shimmer-border tinted stop) it does not carry text on top of it; the foreground value exists only for the shadcn-core contract.
- `--secondary`: `oklch(0.1867 0 0)` (= `#131313`, surface-2 step). `(synthesised — same source as --muted)`
- `--secondary-foreground`: tracks `--foreground`.
- `--destructive`: `oklch(0.6534 0.1835 23.6794)` (a warm crimson). `(synthesised — the spec doesn't enumerate a destructive role; this is a documented-shadcn-slot placeholder kept at a register-coherent saturation.)`
- `--destructive-foreground`: `oklch(1 0 0)`.
- `--border`: `oklch(0.2850 0 0)` (= `#2a2a2a`, opaque equivalent of `rgba(255,255,255,0.1)`). Live: raw.md §"Components — Glassmorphism" — "subtle border of rgba(255, 255, 255, 0.1) for cards."
- `--input`: tracks `--border`.
- `--ring`: tracks `--primary` — focus rings carry the emerald.

### Polarity-locked surfaces

Cyber Serif is single-polarity (dark-only), so every chromatic and surface token below is fixed across `:root` and the dark blocks. Listing them here for the §"Token naming conventions" surface-named contract.

- `--brand-canvas-night`: `oklch(0.1149 0 0)` (= `#050505`). Same as `--background`. Named separately so consumers naming polarity-locked dark surfaces have a self-documenting token.
- `--brand-on-dark`: `oklch(0.9401 0 0)` (= `#EBEBEB`). The opaque white-ink companion to `--brand-canvas-night`.
- `--brand-surface-glass-1`: `oklch(0.1591 0 0)` (= `#0d0d0d`, opaque equivalent of the spec's `rgba(255,255,255,0.02)` glassmorphism card fill).
- `--brand-surface-glass-2`: `oklch(0.1867 0 0)` (= `#131313`, opaque equivalent of `rgba(255,255,255,0.04)`).
- `--brand-surface-glass-3`: `oklch(0.2134 0 0)` (= `#191919`, opaque equivalent of `rgba(255,255,255,0.06)`).

### Hairlines / dividers

The spec gives two hairline weights: the always-1px `rgba(255,255,255,0.05)` row divider inside the benchmark table, and the always-1px `rgba(255,255,255,0.1)` card border for the glassmorphism shape.

- `--brand-hairline-soft`: `oklch(0.2178 0 0)` (= `#1a1a1a`, opaque equivalent of `rgba(255,255,255,0.05)`). Live: raw.md §"Section 4: Benchmark Table" — "Rows are separated by 1px borders (rgba(255,255,255,0.05))."
- `--brand-hairline-strong`: `oklch(0.2850 0 0)` (= `#2a2a2a`, opaque equivalent of `rgba(255,255,255,0.1)`). Live: raw.md §"Components — Glassmorphism" — "subtle border of rgba(255, 255, 255, 0.1) for cards."

### Body-text neutrals

The spec ladders foreground inks by alpha over the near-black canvas. Stored as opaque OKLCH so the rendered ink is independent of any consumer's overlay-stack assumption.

- `--brand-ink-strong`: `oklch(0.9401 0 0)` (= `#EBEBEB`). Same as `--foreground`.
- `--brand-ink-mute`: `oklch(0.7316 0 0)` (= `#a8a8a8`, opaque equivalent of `text-white/70`). Spec ladder midpoint between strong ink and the explicit `text-white/50` body callout.
- `--brand-ink-subtle`: `oklch(0.5521 0 0)` (= `#727272`, opaque equivalent of `text-white/40`). Live: raw.md §"Section 3: Feature Grid" — "description in muted sans-serif (text-white/40)".
- `--brand-ink-faint`: `oklch(0.3600 0 0)` (= `#3d3d3d`, opaque equivalent of `text-white/20`). For inactive nav labels and inert table-cell metadata; spec doesn't name an explicit token but ladders body text down through `/50` and `/40` weights, and the inert-state slot is necessary for the all-caps Space Grotesk label register.

## §3 Typography

The spec ships three families in deliberate role separation: a serif for headings, a sans for body, a mono for all-caps technical labels at small sizes. The serif sets the editorial gravitas; the all-caps mono at 10px with 0.2em tracking is the most identifiable single move in the register.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Newsreader (serif) | 200–800 variable; spec calls for tracking-tighter on the hero | 100px | 0.9 | tighter (~-0.04em) |
| Heading | Newsreader (serif) | 400–600 | 48–64px clamp | 1.05 | -0.02em |
| Title | Newsreader (serif) | 500 | 20–24px | 1.2 | normal |
| Body | Inter (sans) | 300–500 | 16–18px | 1.5 | -0.05px |
| Caption | Space Grotesk (sans) | 500 | 10px (technical labels) / 12px (body captions) | 1.4 | 0.2em (label) / normal (caption) |
| Mono | Space Grotesk (sans, used in mono role for all-caps labels) | 500 | 10px | 1.4 | 0.2em uppercase |

**Notes on custom axes and patterns.**

- Newsreader is shipped with an `opsz` (optical size) variable axis and italic subset, both required by the spec. The hero headline explicitly calls for one italic word in emerald inside an otherwise upright 100px serif — that depends on the italic being available at display weight.
- Space Grotesk is positioned as the "mono" role per the spec's "Space Grotesk for technical labels" framing, even though Space Grotesk is technically a proportional sans. The catalog uses it in `--font-mono` because the role it plays — all-caps technical metadata at 10px / 0.2em tracking — is mono-coded behaviour. A true monospace fallback (JetBrains Mono, SF Mono) sits behind it in the stack for any consumer that reaches for monospace code blocks.
- The hero's "one italic emerald word inside a 100px serif headline" is the system's voltage moment in typography form. Authoring should preserve it.

## §4 Component vocabulary

The spec enumerates layout sections and three named components. The vocabulary below covers each enumerated section plus the three named patterns, plus the derived primitives (pill button, glassmorphism card, all-caps technical label, eyebrow with pulse dot, alternating-ink data row) that the layout sections imply.

### Glassmorphism Card

**Status:** `current`
**Live source:** raw.md §"Style prose" — "Effects: Glassmorphism (blur: 12px)"; raw.md §"Style prompt" — "Implement glassmorphism using background: rgba(255, 255, 255, 0.02) and backdrop-filter: blur(12px). Use a subtle border of rgba(255, 255, 255, 0.1) for cards."
**Description:** Card surface with `rgba(255,255,255,0.02)` fill (= `--brand-surface-glass-1`), 12px backdrop-filter blur, 1px border at `rgba(255,255,255,0.1)` (= `--brand-hairline-strong`), and large radii (3xl ≈ 24px or larger — never standard rounded corners per the special note). The fill is intentionally close to transparent; the card reads as a faint lift over the canvas rather than as a panel.
**States:** `default` (fill 2% white, hairline 10% white); `hover` (Shimmer Border + Spotlight Cursor animations both activate — see entries below); `focus` (1px emerald ring at `--ring`); `disabled` (not enumerated by the spec).

### Shimmer Border Card

**Status:** `current`
**Live source:** raw.md §"Components — Shimmer Border Card" — verbatim spec: "Create a card with position:relative and a pseudo-element ::after that covers the inset -1px. Background is a 3-color linear gradient (transparent, rgba(16, 185, 129, 0.3), transparent) at 200% size. Animate background-position from 200% to -200% over 4s linearly."
**Description:** A variant of the Glassmorphism Card. The card gets `position: relative`; a pseudo-element `::after` covers `inset: -1px` (one pixel beyond the card on every side) and carries a horizontal 3-stop linear gradient — transparent, emerald at 30% alpha, transparent — sized to 200% so the colored band travels across more than the card width. `background-position` animates from `200%` to `-200%` over 4s linearly, giving a slow horizontal sweep of emerald light around the border edge. The animation is continuous, not hover-triggered.
**States:** Continuous animation; no separate hover or pressed state.

### Spotlight Cursor Tracking

**Status:** `current`
**Live source:** raw.md §"Components — Spotlight Cursor Tracking" — verbatim spec: "Implement a ::before pseudo-element on the card with a radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.15), transparent 40%). Set opacity to 0 and transition to 1 on hover. Update --mouse-x/y variables via JavaScript mousemove listener."
**Description:** A second variant of the Glassmorphism Card. A pseudo-element `::before` carries a 600px radial-gradient anchored to `var(--mouse-x) var(--mouse-y)` (CSS custom properties updated via a JS mousemove listener on the card). The gradient is emerald at 15% alpha fading to transparent at 40% radius. Opacity transitions from 0 to 1 on hover, so the spotlight only appears when the cursor enters the card.
**States:** `default` (spotlight pseudo-element at opacity 0); `hover` (transitions to opacity 1; the spotlight follows the mouse via the live CSS variables).

### Morphing Background Glows

**Status:** `current`
**Live source:** raw.md §"Components — Morphing Background Glows" — verbatim spec: "Fixed position div with 384px width/height, bg-emerald-500/10, and blur-100px. Apply an animation that alternates border-radius from '40% 60% 60% 40% / 70% 30% 70% 30%' to '60% 40% 40% 60% / 30% 70% 30% 70%' over 8s."
**Description:** Decorative atmospheric blob. A fixed-position 384×384 div carries an emerald-at-10%-alpha fill plus a 100px blur, so the actual visible footprint is much larger and very soft. The animation morphs `border-radius` between two organic asymmetric values over 8s, giving the blob a slow shape-shift. Used positioned behind hero and CTA sections to suggest WebGL-style backdrop without the bundle cost.
**States:** Continuous animation; no interactive states.

### Pulse-Glow Pill Button (primary CTA)

**Status:** `current`
**Live source:** raw.md §"Section 1: Navbar" — "Pill-shaped CTA button with pulse-glow animation (#10b981)"; raw.md §"Section 2: Hero Section" — "Dual button CTA: one solid white pill with emerald glow, one ghost pill with white border"; raw.md §"Section 5: CTA Section" — "Large pill button with a continuous emerald pulse shadow effect."
**Description:** Full-pill button (border-radius 9999px). The primary register uses a solid white fill with the spec-mandated `cubic-bezier(0.16, 1, 0.3, 1)` transition curve and a continuous emerald `box-shadow` that pulses in scale and opacity (the "pulse-glow"). On the hero, a paired ghost variant carries a 1px white border, transparent fill, and a quieter emerald glow only on hover. The spec explicitly forbids standard rounded corners — pills only.
**States:** `default` (white fill, low-amplitude continuous emerald pulse); `hover` (higher-amplitude pulse and slight scale lift); `pressed` (pulse contracts to baseline); `focus` (1px emerald ring at `--ring`); `disabled` (not enumerated).

### Ghost Pill Button (secondary CTA)

**Status:** `current`
**Live source:** raw.md §"Section 2: Hero Section" — "one ghost pill with white border."
**Description:** Full-pill button with transparent fill, 1px white border at full alpha, white ink, same pill radius as the primary. No continuous pulse-glow in the resting state.
**States:** `default` (transparent fill, 1px white border); `hover` (border thickens visually via an inset shadow or routes to a quiet emerald glow); `pressed` (border drops to 80% alpha); `focus` (1px emerald ring); `disabled` (not enumerated).

### Logo Mark with Rotating Glyph

**Status:** `current`
**Live source:** raw.md §"Section 1: Navbar" — "Left: Logo with a command icon in a white rounded square that rotates 360deg on hover."
**Description:** A 28–32px white rounded square (radius ≈ 8–10px) carrying a command-key glyph rendered in near-black. On hover the entire square rotates 360° using the spec's standard cubic-bezier curve. The hover animation is the navbar's only interactive ornament.
**States:** `default` (rounded square, glyph upright); `hover` (rotates 360° over the cubic-bezier curve).

### Top Navigation Bar

**Status:** `current`
**Live source:** raw.md §"Section 1: Navbar" — "Fixed header with transition from transparent to blurred glass (bg-black/80, backdrop-blur-md) on scroll."
**Description:** Fixed-position header. On initial load: transparent fill. On scroll past a small threshold: fill transitions to `bg-black/80` (80% black overlay) with `backdrop-blur-md` (~12px blur), turning the bar into a glass strip. Left: rotating logo mark + small wordmark. Center: text links in Inter at body size, each with the 1px emerald underline hover described below. Right: a pill-shaped primary CTA carrying the pulse-glow.
**States:** `default-scrolled-top` (transparent); `default-scrolled` (black/80 + blur); per-link `hover` triggers the 1px emerald underline expand.

### Emerald Underline Link

**Status:** `current`
**Live source:** raw.md §"Style prompt" — "Link hovers should feature a 1px emerald underline expanding from width 0 to 100%"; raw.md §"Section 1: Navbar" — "Text links with 1px emerald underline hover effect."
**Description:** Plain text link in the body ink. On hover, a 1px emerald underline animates from width 0 to width 100% under the link, anchored to one end. The expand uses the spec's cubic-bezier curve. No colour change on the text itself; the emerald appears only as the underline.
**States:** `default` (no underline); `hover` (1px emerald underline at full width); `focus` (same underline plus the ring); `visited` (no change — the spec doesn't distinguish).

### All-Caps Technical Label (eyebrow + table header)

**Status:** `current`
**Live source:** raw.md §"Style prose" — "'Space Grotesk' for technical labels (all-caps, high-tracking)"; raw.md §"Style prompt" — "Use 'Space Grotesk' for technical metadata (uppercase, tracking: 0.2em, font-size: 10px)"; raw.md §"Section 2: Hero Section" — "Uppercase tech label with emerald pulse dot."
**Description:** Space Grotesk, weight 500, 10px, uppercase, 0.2em letter-spacing. Used as section eyebrows above serif headlines, as benchmark-table column headers, as small metadata strings under the hero. When used as a section eyebrow it's typically prefixed with a 6×6 emerald pulse dot (a `::before` filled with `--primary` carrying a soft animated `box-shadow` glow). When used as a table header it appears bare.
**States:** Static; no interactive states.

### Emerald Pulse Dot

**Status:** `current`
**Live source:** raw.md §"Section 2: Hero Section" — "emerald pulse dot."
**Description:** A 6×6 (or 8×8) filled circle in `--primary` with an animated `box-shadow` halo that scales and fades in a continuous breathing rhythm. Used as a `::before` on technical labels and as the chrome dot at the start of section eyebrows.
**States:** Continuous animation; no interactive states.

### Serif Hero Headline with Italic Emerald Word

**Status:** `current`
**Live source:** raw.md §"Section 2: Hero Section" — "Headline in 'Newsreader' serif at 100px size, tracking-tighter, leading-0.9. Include one italic word in emerald."
**Description:** A 100px Newsreader headline at weight ~500–600 with tracking-tighter and leading 0.9. One word inside the headline is italicised and rendered in `--primary` (emerald). The italic word is typically a verb or adjective — the carrier of emphasis — and the chromatic emerald is the only colour shift inside the otherwise white headline.
**States:** Static.

### Benchmark Table (alternating-ink data row)

**Status:** `current`
**Live source:** raw.md §"Section 4: Benchmark Table" — "A data visualization table with a header row using Space Grotesk 10px text. Rows are separated by 1px borders (rgba(255,255,255,0.05)). Columns alternate between muted white text and vibrant emerald text. Include 'Count-up' animations for numerical values and pulsating check icons."
**Description:** Tabular layout. Header row: Space Grotesk 10px / 0.2em uppercase. Body rows: separated by 1px `--brand-hairline-soft` (= `rgba(255,255,255,0.05)`). Columns alternate the ink colour: odd columns in `--brand-ink-mute` (muted white), even columns in `--primary` (emerald). Numerical cells animate from 0 to the final value via a count-up easing tied to the spec's cubic-bezier. Cells that carry boolean states render a pulsating check glyph (`✓` in emerald with the same pulse-dot rhythm).
**States:** Static rows; count-up animation on numerical cells fires on scroll-into-view; check glyphs carry the continuous pulse.

### Spotlight Feature Card

**Status:** `current`
**Live source:** raw.md §"Section 3: Feature Grid" — "3-column grid of 'Spotlight Cards'. Each card has 40px padding, rounded-3xl corners, and a 'Shimmer Border'. Inside: An icon in a rounded-2xl container that rotates on card hover. Title in Serif, description in muted sans-serif (text-white/40). Cards should reveal with staggered upward motion on scroll."
**Description:** Composite component combining the Glassmorphism Card base + Shimmer Border decoration + Spotlight Cursor Tracking on hover. 40px internal padding, `border-radius: 1.5rem` (rounded-3xl, = 24px). Inside: an icon container at `border-radius: 1rem` (rounded-2xl, = 16px) carrying a glyph, rotates 360° (or 12°) on card hover. Title rendered in Newsreader serif at title size; description in Inter at body size in `--brand-ink-subtle` (the documented `text-white/40` tone). On scroll into view, cards animate with staggered upward motion using `cubic-bezier(0.16, 1, 0.3, 1)`.
**States:** `default` (resting glass surface, continuous shimmer-border sweep, spotlight at opacity 0); `hover` (icon rotates, spotlight fades in); `scroll-reveal` (staggered translate-y + fade on entry).

### CTA Gradient Headline

**Status:** `current`
**Live source:** raw.md §"Section 5: CTA Section" — "Massive serif headline with 'gradient-text' animation (linear-gradient of white and emerald shifting horizontally)."
**Description:** Large Newsreader headline (typically 80–120px) with a horizontal linear gradient applied as text colour: white at one end, `--primary` emerald at the other. The gradient position animates horizontally on a loop, so the emerald slowly drifts across the headline letters. The technique uses `background-clip: text` with `color: transparent`.
**States:** Continuous animation.

### Pill CTA with Continuous Pulse Shadow

**Status:** `current`
**Live source:** raw.md §"Section 5: CTA Section" — "Large pill button with a continuous emerald pulse shadow effect."
**Description:** A larger sibling of the Pulse-Glow Pill Button. Wider horizontal padding, slightly larger label, and a more amplified continuous `box-shadow` pulse. Used as the closing CTA on landing pages.
**States:** Same as Pulse-Glow Pill Button at the larger scale.

### Abstract Floating UI Mockup

**Status:** `current`
**Live source:** raw.md §"Section 2: Hero Section" — "Right column: Floating abstract UI mockup with glass cards, parallax layers, and animated pulse elements."
**Description:** Decorative parallax composition for the hero's right column. Stacked glassmorphism cards at different `transform: translateZ` depths, each carrying an animated emerald pulse element (the dot, a shimmer band, a count-up number). The composition reads as a faint hint of a product UI without showing any actual product surface — it's a register cue, not a screenshot.
**States:** Parallax responds to scroll; pulse elements run continuous animations.

## §5 Surface inventory

This is a spec-derived system; there are no live URLs. The reference materials sampled this cycle:

- `temp/refs/cyber-serif/raw.md` — the full spec, including description, summary, style prose, style prompt, five layout sections, three named components, special notes, and tags. This is the only source; no reference imagery was shipped with this authoring cycle.

## §6 Notes

- **Emerald is surgical, never a fill.** The spec's special note is the single hardest rule. Emerald appears as ink (one italic word, one alternating column, gradient stops, check icons), as a 1px underline that grows on link hover, as a `box-shadow` glow under buttons and behind atmospheric blobs, as 30%-alpha shimmer gradient stops, as 15%-alpha spotlight gradient stops, as a 10%-alpha blob fill softened behind a 100px blur. It never paints a large rectangle. Audit smell: any token-consuming surface where `background: var(--primary)` covers more than a 6×6 dot or a 1px line is wrong-shaped for this register.
- **Pills only, never standard rounds.** The special notes are explicit: "DO NOT: Use standard rounded corners; use large radii (3xl) or full-pill shapes for buttons." The radius scale documented in tokens leans into this — small radii are reserved for inputs and badges; cards take rounded-3xl (24px); CTAs take full-pill (9999px).
- **Single chromatic identity across the (single) polarity.** The system has only one canvas; there is no dark-mode flip, no light-mode flip. Both `:root` and `[data-theme="dark"]` carry the same values.
- **Animation curves converge.** All motion uses `cubic-bezier(0.16, 1, 0.3, 1)` — a curve that overshoots slightly and settles with a deceleration that reads as weighted rather than springy. Consumers that need a faster transition should still stay on this curve; switching to ease-out is a register break.
- **Halcyon-team content avoidance.** When authoring the preview, the spec's "high-end AI SaaS, creative agencies, fintech portfolios, developer tools" suggested verticals can be touched but never described as Halcyon's product. Halcyon is a name only — the team uses the register on its internal pages, the brand has no product feature that maps to the host product's actual surface.

## §Known gaps

- **No reference imagery shipped this cycle.** The spec is text-only; no screenshots, photographs, or rendered mockups were provided. Any component property the spec didn't enumerate is left to the author's reading of the prose (e.g., `--destructive` semantic colour, the `--brand-primary-soft`/`-deep`/`-press` ladder for emerald state cycles, the exact opacity ramp of `text-white/20` and similar). Each such gap is marked `(synthesised)` in §2 above.
- **No live brand site.** The system is invented; there is nothing to drift against and no `Drift vs tokens.css` reconciliation in §2.
- **Light variant not specified.** The spec is dark-only by construction. If a future cycle wants a light variant of Cyber Serif, that's a fresh authoring decision — there is no live brand polarity to mirror, and the system's signature surfaces (glassmorphism, blob glows, emerald pulse on dark) don't translate cleanly to a light canvas without a register break.
- **Font loading via Google Fonts.** Newsreader and Space Grotesk both ship from Google Fonts; the catalogue's per-system `<head>` is responsible for declaring the loader (the shared `preview-kit/template.html` loader currently carries Inter / Source Serif 4 / JetBrains Mono / Geist / Geist Mono / Oswald — Newsreader and Space Grotesk are not yet in the shared set, so the per-system template must declare them locally).
