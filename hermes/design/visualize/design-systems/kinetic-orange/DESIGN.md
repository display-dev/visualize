---
slug: kinetic-orange
name: Kinetic Orange
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/kinetic-orange/raw.md (description, summary, style prose, style prompt, layout sections, components, special notes)
  - imagery: none provided — spec text only
  - principles: three-colour brutalism with continuous motion vocabulary (linear marquees, 12s spin indicators, -2deg skewed sections) as the identity move; not a still register
canonical-canvas: both
selection:
  mood: [cyberpunk, gradient]
  tone: [energetic, fast]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a energetic, fast register with cyberpunk, gradient visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Kinetic Orange

## §1 Canonical canvas

The system is single-polarity by construction. The brand prose names a three-colour ladder: Kinetic Orange `#FF4D00` as the dominant fill, Solid Black `#000000` as text + dividers, Pure White `#FFFFFF` as the accent on dark sections. There is no documented dark variant — the system already cycles through both polarities within a single layout (orange-on-orange hero, black-on-orange typographic surfaces, white-on-black marquee, white-on-black service list).

| Surface | Origin | Canvas | Notes |
|---|---|---|---|
| Floating navigation | Spec §Layout Section 1 | White page floor, black pill container | Floating black `rounded-full` pill houses Space Mono 12px links in white; hover flips to black-on-white |
| Typographic hero | Spec §Layout Section 2 | Orange ground (`#FF4D00`) | Archivo Black headline at 16vw, centered; 2px black hairline divides the headline from the metadata row |
| Skewed marquee | Spec §Layout Section 3 | Solid Black `#000000`, section rotated -2deg | Two infinite-scroll rows; row 1 orange Archivo Black 10vw, row 2 white at 80% opacity reversed |
| Vertical service list | Spec §Layout Section 4 | Solid Black `#000000`, white ink | Items separated by 1px white-at-20% borders; numbered index in orange Space Mono; title in white Archivo Black at 7vw |
| Giant CTA + footer | Spec §Layout Section 5 | White canvas, 14vw black heading, black pill button | 2px black top border separates footer; horizontal social links in Space Mono 12px |

The hero surface uses orange as canvas; the marquee + service list use black as canvas. The shell author should treat the white-with-black-ink surface as the "rest" state and reach for the orange canvas only at signature moments — matching the spec's mention of orange as "dominant background" without flooding every section in it.

## §2 Palette

Each entry traces to the raw spec under `temp/refs/kinetic-orange/raw.md`. Hex → OKLCH conversion via vendored `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.6677 0.2235 36.99)` (= `#FF4D00`). Live: spec §Style prompt — "primary background color of #FF4D00"; spec §Notes — "Brand Orange #FF4D00 (dominant background)".

### Documented secondary brand colours

There are no documented secondary brand colours. The spec is explicit: three colours only (`#FF4D00` orange, `#000000` black, `#FFFFFF` white). Every accent that would otherwise warrant a `--brand-accent-*` entry resolves to one of these three.

### Canvas + neutrals

- `--background`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §Notes — "Pure White #FFFFFF (accents on dark sections)" + spec §Layout Section 5 — giant CTA renders white-canvas. The shell treats white as the page canvas and reaches for orange / black at signature moments.
- `--foreground`: `oklch(0 0 0)` (= `#000000`). Live: spec §Style prompt — "deep black #000000 text"; spec §Notes — "Solid Black #000000 (primary text + dividers)".
- `--card`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §Layout Section 5 — footer + content surfaces render on white canvas (synthesised — spec does not name a separate card token).
- `--card-foreground`: `oklch(0 0 0)`. Mirrors `--foreground` (synthesised — spec does not name a separate ink for cards).
- `--popover`: `oklch(1 0 0)`. Mirrors `--card` (synthesised).
- `--popover-foreground`: `oklch(0 0 0)`. Mirrors `--foreground` (synthesised).
- `--muted`: `oklch(1 0 0)`. The spec is three-colour; there is no documented muted surface, so this collapses to white (synthesised).
- `--muted-foreground`: `oklch(0 0 0)` at consumer-side opacity. The spec's only "muted" pattern is `white at 80% opacity` (row 2 of the marquee, Section 3), which is a consumer-side opacity application against a black canvas — not a brand-defined neutral. Resolves to black against white for body chrome use (synthesised).
- `--accent`: `oklch(0.6677 0.2235 36.99)` (= `#FF4D00`). The spec uses orange both as primary fill and as the accent that lifts on dark canvases (orange marquee row, orange service-index number, orange reveal arrow). Mirrors `--primary`.
- `--accent-foreground`: `oklch(0 0 0)` (= `#000000`). Live: spec §Style prompt + spec §Style prose — black text on orange ground is the headline pattern.
- `--secondary`: `oklch(0 0 0)` (= `#000000`). The pill nav and CTA button both use black-on-white as the secondary surface. Live: spec §Layout Section 1 + Section 5.
- `--secondary-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §Layout Section 1 — "links in white 'Space Mono'" + Section 5 — "rounded-full button (#000000 background, white text)".
- `--destructive`: `oklch(0.6677 0.2235 36.99)` (= `#FF4D00`). The spec carries no separate destructive hue. In a three-colour brutalist register, destructive surfaces fall back to the brand primary at full chroma — orange already reads as a high-energy alert (synthesised; cite this lineage to future authors).
- `--destructive-foreground`: `oklch(0 0 0)`. Mirrors `--accent-foreground` (synthesised).
- `--border`: `oklch(0 0 0)`. Live: spec §Style prompt — "2px solid #000000 for section dividers and buttons".
- `--input`: `oklch(0 0 0)`. Mirrors `--border` (synthesised — spec does not document a separate input chrome).
- `--ring`: `oklch(0.6677 0.2235 36.99)`. Tracks `--primary`. Focus rings adopt orange against white / black canvases for the highest-contrast keyboard-affordance hit (synthesised; this is the AUTHORING-compliant default).

### Polarity-locked surfaces

The spec's three-colour register collapses the typical light/dark polarity question. There is no canvas flip — every surface within a single layout is already in its locked polarity:

- `--brand-canvas-orange`: `oklch(0.6677 0.2235 36.99)` (= `#FF4D00`). The hero / typographic-canvas fill. Always orange.
- `--brand-canvas-night`: `oklch(0 0 0)` (= `#000000`). The skewed marquee + service list canvas. Always black.
- `--brand-on-orange`: `oklch(0 0 0)` (= `#000000`). Ink locked to the orange canvas (Archivo Black headlines on the hero).
- `--brand-on-dark`: `oklch(1 0 0)` (= `#FFFFFF`). Ink locked to the black canvas (white service titles, white marquee row).
- `--brand-on-light`: `oklch(0 0 0)` (= `#000000`). Ink locked to the white canvas (footer copyright, CTA heading).

### Hairlines / dividers

- `--brand-hairline-strong`: `oklch(0 0 0)` (= `#000000`). 2px solid black. Live: spec §Style prompt — "2px solid #000000 for section dividers and buttons" + spec §Layout Section 2 — "2px black horizontal border separates the hero from a metadata row".
- `--brand-hairline-on-dark`: `oklch(1 0 0 / 0.2)`. The 1px white-at-20% rule observed in Section 4's service-list item separators.

### Selection

- `--brand-selection-bg`: `oklch(0 0 0)` (= `#000000`).
- `--brand-selection-fg`: `oklch(0.6677 0.2235 36.99)` (= `#FF4D00`). Live: spec §Style prompt — "Selection color should be background: black; color: #FF4D00".

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Archivo Black | 900 | 14–16vw (hero, CTA) | 0.85 | -0.04em |
| Heading | Archivo Black | 900 | 7–10vw (service list, marquee) | 0.85–0.9 | -0.04em |
| Title | Archivo Black | 900 | clamp(2rem, 5vw, 3rem) | 0.9 | -0.04em |
| Body | Inter | 400–500 | 14–16px | 1.5 | 0 |
| Caption / Label | Space Mono | 700 | 9–12px | 1.4 | -0.02em |
| Mono | Space Mono | 400–700 | 12–13px | 1.5 | -0.02em |

All Archivo Black headlines are uppercase by rule. Space Mono runs the metadata + nav-link + caption register; the spec explicitly pins it at 12px on the floating navigation and 9px on the rotating scroll-indicator textPath. Inter handles body prose only — no headlines, no chrome.

## §4 Component vocabulary

### Floating pill navigation

**Status:** `current`
**Source:** spec §Layout Section 1
**Description:** Fixed top navigation. Logo glyph on the left, social icons on the right, a floating black pill container (`background: #000000`, `border-radius: 9999px`) anchored center. Inside the pill: links rendered in white Space Mono 12px, spaced by a generous horizontal gap. The pill is the only rounded shape on the page; everything else is sharp.
**States:** `default` — black background, white text. `hover` — link cell flips to white background with black text. `focus` — orange outline (2px), offset 2px.

### Typographic hero

**Status:** `current`
**Source:** spec §Layout Section 2
**Description:** Full-bleed orange canvas. Archivo Black headline centered at 16vw, uppercase, tracking -0.04em, line-height 0.85–0.9, in solid black ink. Below the headline: a 2px black hairline. Beneath the hairline: a three-cell metadata row — `Based in <city>` label (left, Space Mono 12px), the rotating circular Scroll-Down indicator (center), and a multi-line title/role block (right, Space Mono 12px).
**States:** `default` only — this is a hero surface, not interactive.

### Rotating scroll indicator

**Status:** `current`
**Source:** spec §Components 1
**Description:** A 144px-diameter SVG circle. Inside, an SVG `<textPath>` traces the circle's perimeter, repeating the string `SCROLL DOWN •` 3–4 times in uppercase Space Mono at 9px bold. A static Lucide `arrow-down` icon sits in the geometric center. The SVG text container is animated with a linear 360deg rotation across 12s, infinite. Reduced-motion environments halt the rotation.
**States:** `default` — spinning. `reduced-motion` — static, arrow + text still visible.

### Skewed marquee section

**Status:** `current`
**Source:** spec §Layout Section 3
**Description:** Full-bleed black canvas, the entire section rotated -2deg via `transform`. Two stacked horizontal marquee rows scroll continuously: row 1 in orange Archivo Black at 10vw, scrolling left → right; row 2 in white at 80% opacity, also Archivo Black at 10vw, scrolling right → left. Bleeds beyond the viewport edges so the skew never reveals a corner.
**States:** `default` — both marquees scrolling. `reduced-motion` — marquees halt, content snaps to a static centered position so text remains readable.

### Brutalist service card

**Status:** `current`
**Source:** spec §Components 2
**Description:** A list item, 100% width, separated from siblings by a 1px white-at-20% top border. Three-cell horizontal layout: `[Index (Orange, Space Mono)] [Title + Tags (White, Archivo Black 7vw)] [Arrow Icon (Hidden, Orange)]`. The index is a leading numeric label (`/01`, `/02`, …). The title cell stacks an Archivo Black uppercase headline above a row of pill-shaped Space Mono tags. The arrow icon is hidden in the default state — a Lucide `arrow-up-right` glyph in orange.
**States:** `default` — background transparent on black canvas, arrow hidden. `hover` — background lifts to white-at-5% opacity, title translates +16px to the right, arrow opacity transitions to 1 and rotates 45deg, all under 200ms. `focus-visible` — orange 2px outline, offset 4px. `reduced-motion` — hover still applies background + reveal, transforms collapse to instant.

### Pill CTA button

**Status:** `current`
**Source:** spec §Layout Section 5
**Description:** A large `border-radius: 9999px` button. Black fill, white Space Mono text uppercase, generous horizontal padding (~2.5–3rem) and ~48–56px minimum height. Used standalone in the CTA section beneath a 14vw Archivo Black heading.
**States:** `default` — black-on-white-canvas. `hover` — scales to 1.10 (per the spec's hover language). `focus-visible` — orange 2px outline, offset 3px. `pressed` — scale snaps back to 1. `reduced-motion` — scale transform disabled, weight or border shift substitutes.

### Tag pill

**Status:** `current`
**Source:** spec §Components 2 — "row of pill-shaped tags" on the service card
**Description:** Inline pill-shaped tag (`border-radius: 9999px`) with hairline border, Space Mono 11–12px text uppercase, ~0.4rem × 0.9rem padding. On the service-card black canvas the tag is bordered in white-at-30% with white text; on the white canvas the tag is bordered in solid black with black text.
**States:** `default` — bordered, no fill. `hover` — fill flips to the brand orange with black text. `focus-visible` — orange 2px outline, offset 2px.

### Sharp section divider

**Status:** `current`
**Source:** spec §Style prompt — "2px solid #000000 for section dividers"
**Description:** A 2px solid black horizontal hairline used between major regions on the white canvas. Never with a soft fade; always a sharp line.
**States:** `default` only.

### Selection (text)

**Status:** `current`
**Source:** spec §Style prompt — "Selection color should be background: black; color: #FF4D00"
**Description:** Browser text selection is inverted to a black background with orange foreground — the opposite of the default browser blue. Applied via `::selection` on `<body>` or the entire shell.
**States:** `default` only.

## §5 Surface inventory

The system has no live brand site to enumerate. The surfaces are derived from the spec:

- `temp/refs/kinetic-orange/raw.md` §Layout sections — five sections of the documented one-page layout, plus two named components.
- `temp/refs/kinetic-orange/raw.md` §Style prompt — colour + typography + border + motion + interaction rules.
- `temp/refs/kinetic-orange/raw.md` §Special Notes — MUST / DO NOT constraints (high contrast, uppercase Archivo Black headers, sharp borders only, no gradients / drop shadows / pastels / sans-serif headlines).

## §6 Notes

- **The kinetic move is the identity.** The system shares the three-colour orange + black + white palette with shipped brutalism conventions, but the differentiator is *motion*, not the palette. Continuous 12s linear spin on the circular scroll indicator. Two infinite text marquees on every black section, one row reversed. -2deg skew breaking the grid on the marquee section. The brand's other shipped brutalism entry (`brutalist/`) is the still / shouted version of the same primitive register — large red type on cream, no marquees, no rotating SVG textPath, no skewed sections. Authors picking between the two should ask whether the page wants to *vibrate* (kinetic-orange) or to *plant flag* (brutalist).
- **Three colours, by rule.** The spec is unambiguous: orange, black, white. No `--brand-accent-*` ladder. Every secondary "accent" in the system resolves to one of these three at a different polarity (orange on white = brand fill; orange on black = brand accent; white on black = inverted text). Don't synthesise `--brand-orange-deep`, `--brand-orange-soft`, or `--brand-orange-mute` for "muted body text" — the spec doesn't model body text on orange or muted text against any canvas. Body prose at the default Inter weight on white is the only body register, and it uses `--foreground`.
- **Sharp by default.** Borders are 2px solid black, no rounded corners except for pill-shaped buttons + nav + tags + the rotating SVG indicator. No drop shadows except as a nav-depth lift (very subtle, possibly an opacity-tinted shadow). No gradients. No softening at section boundaries — the marquee section's -2deg skew is the only "transition" between sections, and it's a hard rotation, not a fade.
- **Selection is inverted.** Text selection on the whole shell flips to `background: #000000; color: #FF4D00`. This is the spec's own pattern; preserve it everywhere selection can fire.
- **Uppercase Archivo Black is non-negotiable.** Headers are always uppercase. Don't use Archivo Black in mixed-case or sentence-case anywhere.
- **Single-polarity dark-mode strategy.** Because the system already cycles canvas polarity within a single layout, there is no separate "dark mode" to author. The `[data-theme="dark"]` block in `tokens.css` mirrors `:root`. The hero stays orange; the marquee stays black; the CTA stays white. Authors building dark-mode previews against this system should not synthesise a "dark-mode" canvas — the system has already shipped both polarities at the same time.
- **Motion is opt-in via `prefers-reduced-motion`.** The 12s spin and the two marquees collapse to static states in reduced-motion environments. The hover-side transforms (translate-x-4, scale-110, arrow-rotate-45) also collapse to instant.

## §Known gaps

- **No live brand surface to verify drift.** The system is spec-derived; there is no deployed marketing site to capture. Any drift between this `DESIGN.md` and an authored `tokens.css` is settled by the spec text under `temp/refs/kinetic-orange/raw.md`, not by a live brand canvas.
- **No reference imagery provided.** The dispatcher delivered the spec as prose only — no screenshots, no scans of a portfolio piece, no photograph of a printed surface. Surfaces and components are reconstructed from the prose alone. If imagery surfaces later, an author should add a Drift subsection to §2 and reconcile.
- **No surface beyond the documented one-page layout.** The spec covers a single deployable page (nav → hero → marquee → service list → CTA + footer). Components for forms, tables, deep navigation hierarchies, dashboards, or any auth-walled surface are not documented; an author extending the system into those territories should re-derive from the spec's primitive rules (orange canvas / black canvas / 2px hairlines / pill chrome / Archivo Black + Space Mono + Inter type stack) rather than invent a fourth chromatic surface.
