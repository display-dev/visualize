---
slug: deep-red
name: Deep Red
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/deep-red/raw.md (Superdesign library entry "deep-red-style-5b01cb" by Zhou Jason; full HTML spec embedded including CSS tokens, layout sections, component breakdowns, and notes block)
  - principles: atmospheric-layering register — dark canvas, oversized Playfair Display italic, floating PNGs animated against a red-orange atmospheric backdrop, mix-blend-mode (overlay / hard-light / screen) text glow, parallax scroll offsets, fixed SVG noise overlay at z-50
canonical-canvas: dark
selection:
  mood: [cyberpunk, gradient]
  tone: [dramatic, bold]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a dramatic, bold register with cyberpunk, gradient visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Deep Red

## §1 Canonical canvas

The spec defines a single canvas: a near-black page (`--bg: #050505`) that hosts an atmospheric red-orange gradient image behind the hero, two surrealist hand PNGs floating over the gradient, and a fixed SVG noise overlay covering the entire viewport at z-50. Every documented section sits on the same near-black floor. There is no light variant — the system is dark-canonical.

| Surface | Canvas | Notes |
|---|---|---|
| Fixed navbar | Transparent → near-black-80 on scroll | Wordmark in Playfair italic; backdrop-blur added past 50px |
| Hero | Near-black with red-orange atmosphere image at 60% opacity in `mix-blend-mode: screen`; two floating hand PNGs at 80% opacity in `mix-blend-mode: hard-light`; headline ink `#ffe0e0` rendered with `mix-blend-mode: overlay` over the atmosphere | Surrealist atmospheric layering: image + blend + text glow stack |
| Mission | Solid near-black with Playfair statement headline at 90% white | Calm prose against the atmospheric act |
| Works/Cards | Near-black with radial-gradient dot pattern at 10% opacity; two parallax cards (one orange `#FF4500`, one matte `#111`) offset on scroll | Single chromatic surface in the system — the orange card |
| Footer | Near-black with an outsized translucent SUPERDESIGN wordmark at 10vw, `text-white/10` | Wordmark as decorative monument, not nav |

The noise overlay (5% opacity, `mix-blend-mode: overlay`) sits above everything at z-50 — a permanent grain across the canvas.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a source citation. Hex → OKLCH conversion via vendored culori at `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.6602 0.2294 35.40)` (= `#FF4500`). Source: spec §Notes — `--accent: #FF4500`. Used as the orange parallax card fill, as selection-bg, and as a hover glow blur behind the "Enter the Void" pill.

### Documented secondary brand colours

- `--brand-headline-tint`: `oklch(0.9322 0.0343 17.78)` (= `#ffe0e0`). Source: spec hero markup — `text-[#ffe0e0]` on the headline + subtitle, paired with `mix-blend-mode: overlay` and a `text-shadow: 0 0 12px rgba(255,255,255,0.71)`. The blush-pink ink is the system's only foreground tint apart from white; it carries the atmospheric register.

### Canvas + neutrals

- `--background`: `oklch(0.1149 0 0)` (= `#050505`). Source: spec §Notes — `--bg: #050505`; also used on `body`, footer, and as the gradient termination colour.
- `--foreground`: `oklch(1 0 0)` (= `#ffffff`). Source: spec — `body { color: white }`.
- `--card`: `oklch(0.1776 0 0)` (= `#111111`). Source: spec §Notes — `--card: #111111`; also used on the matte parallax card (Card 2 "Evolving Legacy").
- `--card-foreground`: `oklch(1 0 0)` (= `#ffffff`). Source: spec — `text-white` inside Card 2.
- `--popover`: `oklch(0.1776 0 0)` (= `#111111`). (synthesised — spec has no popover surface; mirror `--card`.)
- `--popover-foreground`: `oklch(1 0 0)`. (synthesised — mirror `--card-foreground`.)
- `--muted`: `oklch(0.1776 0 0)` (= `#111111`). (synthesised — mirror `--card` for filled muted surfaces.)
- `--muted-foreground`: `oklch(0.5510 0.0234 264.36)` (≈ Tailwind gray-500 `#6b7280`). Source: spec mission section — `text-gray-500` on the lede; also `text-gray-400` on hover-revealed nav links.
- `--accent`: `oklch(0.6602 0.2294 35.40)` (= `#FF4500`). Mirror `--primary` — shadcn `--accent` is the system's chromatic accent.
- `--accent-foreground`: `oklch(0 0 0)` (= `#000000`). Source: Card 1 ("Emerging Talent") — `text-black` over the `#FF4500` fill, matching the spec's contrast intent.
- `--secondary`: `oklch(0.1776 0 0)` (= `#111111`). Mirror `--card`.
- `--secondary-foreground`: `oklch(1 0 0)`.
- `--destructive`: `oklch(0.5659 0.1967 12.2626)` (≈ rose-600). (synthesised — spec has no destructive surface; pick a deeper rose adjacent to the brand orange so destructive reads as ill-omened rather than the brand accent.)
- `--destructive-foreground`: `oklch(1 0 0)`.
- `--border`: `oklch(1 0 0 / 0.05)` (white at 5% alpha). Source: spec footer — `border-t border-white/5`; also Card 2 — `border border-white/10` and `border-white/5` on the navbar's scrolled state.
- `--input`: `oklch(1 0 0 / 0.10)` (white at 10% alpha). (synthesised — spec has no form inputs; lift one stop from `--border`.)
- `--ring`: `oklch(0.6602 0.2294 35.40)` (= `#FF4500`). Mirror `--primary`.

### Polarity-locked surfaces

The spec ships a single-polarity dark canvas. The following stay fixed at `:root` (do not invert in dark-mode override; the system is already dark):

- `--brand-canvas-night`: `oklch(0.1149 0 0)` (= `#050505`). Source: spec — the universal page bg.
- `--brand-card-night`: `oklch(0.1776 0 0)` (= `#111111`). Source: spec — Card 2 fill.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#ffffff`). Source: spec — body and headline default ink.
- `--brand-on-dark-faint`: `oklch(1 0 0 / 0.40)`. Source: spec time-chip — `text-white/40` on the NYC `11:11 PM` cluster.
- `--brand-on-dark-mute`: `oklch(1 0 0 / 0.10)`. Source: spec footer wordmark — `text-white/10`, monumental translucent.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(1 0 0 / 0.05)`. Source: spec — `border-white/5` on the post-scroll navbar and `bg-black/10` divider inside Card 1.
- `--brand-hairline-strong`: `oklch(1 0 0 / 0.10)`. Source: spec — `border-white/10` on Card 2 and `bg-white/10` divider inside Card 2.
- `--brand-dot-grid`: `oklch(0.3211 0 0)` (= `#333333`). Source: spec works section — `background-image: radial-gradient(circle, #333 1px, transparent 1px)`; the radial dot pattern behind the parallax cards at 10% wrapper opacity.

### Primary lineage

The spec only ships one stop of the primary (`#FF4500`). The pressed / deep stops below are derived for state coverage and labelled as such; no doc-level brand ladder exists in the source.

- `--brand-primary-press`: `oklch(0.5596 0.1926 35.81)` (= `#cc3700`). (synthesised — pressed state for button surfaces consuming `--primary`.)
- `--brand-primary-deep`: `oklch(0.4544 0.1539 36.49)` (= `#992900`). (synthesised — deep stop for the atmospheric red-orange image's terminating gradient.)

### Atmospheric / decorative tokens

These name preview-level decorative roles. They are template-scoped local CSS custom properties at the preview surface, NOT brand-extras — keeping `tokens.css` pure to the spec while letting the atmospheric layering live in the shell:

- The atmosphere gradient stops, the noise overlay opacity, the hand-PNG float keyframe offsets, the parallax card translateY multipliers all stay at the preview-template `<style>` block (see `spacex-style` / `ferrari-style` for the same scoped-local pattern).

### Drift vs `tokens.css`

Not applicable — spec-derived, no prior `tokens.css` to drift against. This DESIGN.md is the first-pass source of truth for `tokens.css`.

## §3 Typography

| Role | Family | Weight | Size (spec) | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Playfair Display | 400 (incl. italic) – 700 | 5xl-7xl (≈3rem–4.5rem) | 1.1 | tight |
| Heading | Playfair Display | 400–600 | 3xl-6xl | tight | tight |
| Title | Playfair Display | 400 italic + 400/500 roman | 4xl-5xl | none-1.1 | tight |
| Body | Inter | 300–500 | base–lg (1rem–1.125rem) | 1.5+ | wide on subtitles, default elsewhere |
| Caption | Inter | 400 uppercase | 10px–xs | widest tracking | uppercase + tracking-widest |
| Mono | system mono | 400 | xs | default | widest tracking, uppercase |

Notes:

- **Two-family pair**: Inter (300, 400, 500, 600) for body and UI; Playfair Display (400, 500, 600, 700 — and italic at 400) for every display and section headline.
- **Italic is a signature axis**, not an emphasis treatment. The hero pulls the second line ("The design agent.") into Playfair italic 300/400, and the works section uses italic on the highlighted phrase ("digital presence"). Italic carries the atmospheric register — drop it and the system reads as a flat dark layout.
- **Text-shadow as type treatment**: hero headline and subtitle ship `text-shadow: 0 0 12px rgba(255,255,255,0.71)` paired with `mix-blend-mode: overlay`. This is documented type, not a decorative effect — the glow makes the blush-pink ink readable against the red atmosphere image.
- **Caption / time-chip**: `font-mono` only used on the live-clock + location cluster, uppercase with `tracking-widest` (≈0.16em).

## §4 Component vocabulary

The spec documents nine distinct patterns. Each below cites its source spec block.

### 1. Floating navbar with pill CTA

**Status:** current
**Source:** raw.md §Components §1; Layout sections §1
**Description:** Fixed top nav (`fixed top-0 left-0 right-0 z-50`), 32px vertical padding when not scrolled. Wordmark on the left renders in Playfair Display Bold with tight tracking. Three mid-aligned text links (`Expertise`, `Selected Works`, `Perspectives`) in 14px gray that brighten to white on hover. Right side carries a 24px-padded, fully-rounded pill CTA on white-on-black with a hover scale of 1.05.
**States:** default (transparent, py-8); scrolled (py-4, backdrop-blur-md, near-black-80 fill, hairline-soft bottom border, 500ms transition). Link hover: gray-400 → white over 300ms.

### 2. Atmospheric hero with parallax hands

**Status:** current
**Source:** raw.md §Components §2; Layout sections §2
**Description:** Full-viewport hero (`min-h-screen`). Behind the content: an atmospheric red-orange image at 60% opacity using `mix-blend-mode: screen`, with a vertical gradient fade `from-transparent via-transparent to-#050505` ensuring the section bleeds back into the canvas at the bottom. Two surrealist hand PNGs sit absolutely in the corners (left top, right bottom), each at 80% opacity using `mix-blend-mode: hard-light`, animated via custom CSS keyframes (`float-hand-left` 12s, `float-hand-right` 14s). Hero content centered: oversized Playfair Display headline ("Superdesign." in roman + "The design agent." in italic) at 5xl–7xl with the blush-pink tint and `mix-blend-mode: overlay` + the `text-shadow: 0 0 12px rgba(255,255,255,0.71)`. Subtitle in Inter 300 below at base–lg with the same blend stack. CTA below is a translucent pill ("Enter the Void") with a hover-only blurred orange glow (`bg-#FF4500/20 blur-xl`). A minor cluster of time + location below in mono at 10px.
**States:** initial reveal (opacity 0 + translateY 30px → opacity 1 + translateY 0 at 800ms ease-out); scroll parallax on hero content (translateY = scrollY × 0.4, opacity fades from 1 → 0 between 0–600px). CTA hover: pill bg lifts from `white/5` to `white/10`; glow blur fades 0 → 50% over 500ms.

### 3. Reveal-on-scroll wrapper

**Status:** current
**Source:** raw.md §Components §3
**Description:** Intersection-Observer driven fade-up. Elements with `.reveal` start at `opacity: 0` and `transform: translateY(30px)`, transitioning to active state when 10% visible (rootMargin `-50px` from bottom). Transition curve: `cubic-bezier(0.22, 1, 0.36, 1)` over 800ms. Staggered animation via inline `transition-delay` (typically 0ms / 200ms / 400ms in sequence).
**States:** dormant (off-canvas); active (in-canvas, full opacity).

### 4. Parallax content cards

**Status:** current
**Source:** raw.md §Components §4; Layout sections §4
**Description:** Two large `rounded-3xl` cards in a 1:1 grid at desktop, aspect `4/5`, with vertical offset to create depth. Card 1 (left): fills the brand orange `#FF4500`, dark ink (`text-black`), a circular 48px badge with a `lucide:star` icon, a numeric "01" badge with hairline border, an oversized Playfair Display headline ("Emerging / Talent"), a body paragraph at 18px, hairline divider at the bottom. Card 2 (right): matte `#111` fill with `white/10` hairline border, white ink, a rotated arrow icon in a translucent badge, "02" badge, parallel headline structure ("Evolving / Legacy"), gray-400 body. Both cards consume the scroll-offset CSS vars (`--scroll-offset-down` on the orange card, `--scroll-offset-up` on the matte) — translateY values updated from `scrollY × 0.05` and `scrollY × -0.05` respectively.
**States:** default; hover on Card 1 lifts shadow to `0 20px 50px rgba(255, 69, 0, 0.3)`; hover on Card 2 lifts the hairline border colour from `white/10` to `#FF4500/50` over 500ms; both cards spin their inner badge icon 45° or scale 1.1 on hover.

### 5. Logo grid (clients)

**Status:** current
**Source:** raw.md §Components §5; Layout sections §3
**Description:** Four-up text-only wordmark grid (`VOGUE`, `TESLA`, `MOOMA`, `AESOP`) — centered, tracking-widest, font-bold. The grid wraps with `opacity-40 grayscale`, transitioning to `opacity-100 grayscale-0` on hover (500ms). Stagger of 0/100/200/300ms via per-cell `transition-delay` on the reveal.
**States:** dormant grayscale 40% opacity; hover full colour at 100% opacity.

### 6. Dot-grid background pattern

**Status:** current
**Source:** raw.md §Components §6
**Description:** Decorative radial-gradient pattern behind the works/cards section. Positioned absolute, `120%` width and height, translated to centre, opacity 10%. Pattern: `radial-gradient(circle, #333 1px, transparent 1px)` at `40px 40px` repeat. Pointer-events disabled.
**States:** static.

### 7. Noise overlay

**Status:** current
**Source:** raw.md §Components §7
**Description:** Fixed full-viewport SVG noise texture (`grainy-gradients.vercel.app/noise.svg`), `opacity: 0.05`, `mix-blend-mode: overlay`, `z-50`, pointer-events disabled. Sits above the entire page including the navbar and CTA — a permanent grain across the canvas.
**States:** static, present on every surface.

### 8. Massive footer wordmark

**Status:** current
**Source:** raw.md §Components §8; Layout sections §5
**Description:** Decorative outsized wordmark in the footer — Playfair Display Bold, `10vw` (responsive — clamps to viewport), `leading-[0.8]`, `tracking-tighter`, `text-white/10`. Sits as a monument inside the footer, paired right-aligned with a vertical stack of social links (Instagram / Twitter / LinkedIn) in gray-400 and a copyright line in gray-600. Pointer-events disabled, user-select disabled.
**States:** static.

### 9. Time + Location chip

**Status:** current
**Source:** raw.md §Components §9
**Description:** Small uppercase monospace cluster below the hero CTA. Live-updating clock (`11:11 PM` shape, updated via `setInterval(updateTime, 60000)`), a 12px vertical divider line at `bg-white/20`, and a static location string (`NYC, USA`). All in `text-white/40` at 10–12px with `tracking-widest`.
**States:** live (clock advances every minute); otherwise static.

## §5 Surface inventory

The spec is a single self-contained HTML document. No public deployment exists; reference materials are limited to the embedded prompt + the layout/component/notes breakdowns.

- `temp/refs/deep-red/raw.md` — entire system in one file: tokens (§Notes), layout sections (§Layout sections), nine documented components (§Components), prose summary (§Description / §Summary / §Style prose). Single source of truth.

## §6 Notes

- **Dark-canonical, no light variant.** Both `:root` and `[data-theme="dark"]` mirror the same near-black canvas + same chromatic accent. The spec ships no light shop. Per AUTHORING "Dark-mode strategy" — dark-canonical brands (Linear / SpaceX / Ferrari pattern) mirror `:root` in `[data-theme="dark"]`.
- **Atmospheric-layering register.** The signature is not the orange accent in isolation — it's the stacked treatment: dark canvas + atmospheric image at 60% screen-blend + two floating hand PNGs at 80% hard-light + Playfair italic display at 90% white with overlay-blend + permanent noise overlay at 5% over everything. A preview that flattens this stack to "dark canvas + orange CTA" loses the system. The hero is the voltage moment; everything else is hairline / radius / dot-grid restraint.
- **Italic is the brand axis, not a decoration.** Playfair Display roman alone reads as generic dark editorial — the italic on "The design agent" / "digital presence" is what makes the system identifiable. Use italic on a slice of every Playfair headline in the preview shell.
- **Single primary stop.** The spec only documents `#FF4500` as the chromatic identity. No `-press` / `-deep` / `-darker` ladder is in the source. Press and deep stops in `tokens.css` are `(synthesised)` for state coverage and labelled as such; they should not be cited as brand documentation.
- **Time chip live-clock optional.** The chip is a documented component but renders a single static value ("11:11 PM" or current time) in the preview shell. A JS clock isn't required for token coverage; the chip exists to demonstrate the mono caption role.
- **Selection style is brand.** `selection:bg-[#FF4500] selection:text-white` is on `<body>` in the spec — drag-select renders the brand orange. Preview shell should honour this.

## §Known gaps

- No live brand site to verify the system in production. The spec is a frozen HTML template from the Superdesign library by Zhou Jason.
- No mobile-specific component variants documented in the spec beyond Tailwind's default responsive prefixes (`md:`, etc.).
- The atmosphere image (`framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png`) and the two hand PNGs are external CDN assets owned by the original author; the preview shell should NOT lift those URLs. A token-level atmospheric layer can be synthesised via a CSS radial-gradient (red-orange burn at top with `#050505` floor), keeping the visual register without lifting third-party imagery.
- Destructive surface treatment is not in the spec; the value in `tokens.css` is a deeper rose adjacent to the brand orange, picked so destructive reads as ill-omened rather than collapse-to-brand-accent.
- Form input chrome (text input, textarea, select, checkbox, switch) is not in the spec. `--input` is synthesised at one stop above `--border` (white/10) and should be used judiciously in the preview.
