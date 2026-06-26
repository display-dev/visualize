---
slug: neon-velocity
name: Neon Velocity
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/neon-velocity/raw.md — Shirley Lou's "Neon Velocity Countdown" style guide (originally published at app.superdesign.dev/library/neon-velocity-countdown)
  - imagery: none supplied; spec carries exact hex tokens, fluid-clamp sizing, and named effect primitives ("Laser Button", "Luminosity Card", "3D Glass", "Refraction Glow") in prose form
  - principles: brutalist headlines + 3D glass + neon-lime over near-black, oriented to product-launch / waitlist / countdown surfaces
canonical-canvas: dark
selection:
  mood: [cyberpunk, gradient]
  tone: [dramatic, bold, energetic, fast]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a dramatic, bold, energetic, fast register with cyberpunk, gradient visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Neon Velocity

A countdown-register design system. Lime-on-near-black, brutalist headline mass, glass-card depth, tabular countdown digits, and a sweep-of-light hover that reads as "this button is alive and the launch is imminent." The spec frames it for waitlist and product-launch surfaces — high-velocity software introducing itself for the first time. Not a general-purpose neon refresh; a specific launch-page register that lives or dies on a single near-black canvas and a single lime accent.

## §1 Canonical canvas

The system is single-polarity dark by intent. The spec is explicit: the background must be near-black `#050505` rather than pure `#000000`, because the deployed surface carries a 3% SVG fractal-noise overlay that only resolves visually when the canvas has a small amount of value above zero. Pure black eats the texture; the slightly-lifted near-black lets it sit. Same logic for the secondary navigation surface at `#0A0A0A` (mobile bottom pill).

| Surface | Citation | Canvas | Notes |
|---|---|---|---|
| Page body | raw.md §Core Aesthetics, §Special Notes | `oklch(0.1149 0 0)` (`#050505`) | Near-black with SVG fractal-noise overlay at 3% opacity, fixed to viewport. No pure black. |
| Mobile bottom-nav pill | raw.md §5 Mobile Navigation | `oklch(0.1448 0 0)` at 80% alpha (`rgba(10, 10, 10, 0.8)`) | Backdrop-blur 20px elevates it above the body without breaking the near-black register. |
| Hero glass card backdrop | raw.md §2 Hero Section, §Components Luminosity Card analogue | Glass over `--background` | `backdrop-filter: blur(12px)`, 1px border at `rgba(255,255,255,0.08)`. Tilted via `perspective(1000px) rotateX(15deg)`. Sits as a 3D layer behind the brutalist hero box, not as its own canvas. |
| Refraction glow | raw.md §Core Aesthetics Visual Effects | Lime `#BFFF00` at 15% opacity, large blurred radial | Ambient backdrop wash. Punctuation, not surface. |

Dark-canonical strategy: `[data-theme="dark"]` mirrors `:root`. There is no light variant in the spec and the system's identity — near-black ground for the lime glow, the noise overlay, and the brutalist hero box's hard white border — depends on the dark canvas. A synthesised light variant would lose the glow, the noise, and the contrast premise.

## §2 Palette

Each entry traces to a spec citation in `temp/refs/neon-velocity/raw.md`. Hex tokens are converted to OKLCH via the vendored culori at `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.9225 0.2345 125.89)` (= `#BFFF00`). Live: raw.md §Core Aesthetics — "Accent Green: `#BFFF00`". The lime that carries every accent surface: Laser Button fill, focus ring, avatar-border outline, refraction-glow tint, hover-state border on Luminosity Card.

### Documented secondary brand colours

The spec ships a single chromatic identity — lime is the only chroma the system carries. Status indicators, decorative gradients, and stat-band chrome all route to either the lime or to a white/grey neutral. No secondary brand colour is documented.

### Canvas + neutrals

- `--background`: `oklch(0.1149 0 0)` (= `#050505`). Live: raw.md §Core Aesthetics — "Primary Background: `#050505`". Also enforced in §Special Notes ("DO NOT use pure black `#000` for backgrounds; stick to the slightly lighter `#050505`").
- `--foreground`: `oklch(1 0 0)` (= `#FFFFFF`). Live: raw.md §Core Aesthetics — "Text Primary: `#FFFFFF`".
- `--card`: same as `--background`. The spec uses glass-over-canvas, not a separate card colour. Glass borders + radial glow gradients carry the elevation work.
- `--card-foreground`: `oklch(1 0 0)`. Tracks `--foreground`.
- `--popover`, `--popover-foreground`: same as `--card`, `--card-foreground` (synthesised — spec doesn't document popovers; default to the card stack).
- `--muted`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Live: raw.md §5 — mobile-nav background `rgba(10, 10, 10, 0.8)` deconstructed to its solid base. Carries body-internal lift bands (form pill background, social-proof inset).
- `--muted-foreground`: `oklch(0.5208 0 0)`. Live: raw.md §Core Aesthetics — "Text Secondary: `rgba(255, 255, 255, 0.4)`". The pre-composited 40%-white-over-near-black resolves to a mid-grey; we encode the resolved value so it can sit on opaque backgrounds (form labels, footer captions) where layering an alpha would not.
- `--accent`: `oklch(0.9225 0.2345 125.89)`. Tracks `--primary` — the system's only chroma.
- `--accent-foreground`: `oklch(0 0 0)` (= `#000000`). Live: raw.md §Components Laser Button — "Color: `#000000`". The black ink that sits on the lime fill.
- `--secondary`: `oklch(0.1448 0 0)`. Tracks `--muted` — the lifted-black surface (synthesised utility default).
- `--secondary-foreground`: `oklch(1 0 0)`. Tracks `--foreground`.
- `--destructive`: `oklch(0.65 0.21 28)` (synthesised — spec doesn't document destructive). Standard red, encoded for shadcn-core completeness; not consumed by the signature surfaces.
- `--destructive-foreground`: `oklch(1 0 0)`. Tracks `--foreground`.
- `--border`: `oklch(0.235 0 0)`. Live: raw.md §Core Aesthetics — "Borders: `rgba(255, 255, 255, 0.1)`" — composited over `#050505` to the resolved opaque value. Carries default hairlines (deploy-card edges, surface-ladder separators).
- `--input`: `oklch(0.235 0 0)`. Tracks `--border`.
- `--ring`: `oklch(0.9225 0.2345 125.89)`. Tracks `--primary` — the focus outline is lime per the brutalist register.

### Polarity-locked surfaces

The whole system is polarity-locked dark. Every brand-extras token below stays at `:root` value in `[data-theme="dark"]`.

- `--brand-canvas-night`: `oklch(0.1149 0 0)` (= `#050505`). Live: raw.md §Core Aesthetics. Same value as `--background`; named separately for surfaces that must remain near-black regardless of any future light variant.
- `--brand-on-dark`: `oklch(1 0 0)`. Live: raw.md §Core Aesthetics — Text Primary. The white that sits on every dark surface.
- `--brand-on-primary`: `oklch(0 0 0)`. Live: raw.md §Components Laser Button — `Color: #000000`. The black ink that sits on the lime fill. Separate token because `--primary-foreground` tracks shadcn-core semantics; this names the role.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.18 0 0)`. Live: raw.md §Components Luminosity Card — "Border: 1px solid `rgba(255, 255, 255, 0.05)`" — composited resolution. Used on Luminosity Card edges and the soft separators inside the bento grid.
- `--brand-hairline-strong`: `oklch(0.235 0 0)`. Live: raw.md §Core Aesthetics Borders — `rgba(255, 255, 255, 0.1)` composited. The standard divider weight.
- `--brand-hairline-glass`: `oklch(0.2134 0 0)`. Live: raw.md §Core Aesthetics Visual Effects Glassmorphism — "1px solid white borders at 8% opacity" — composited. The hairline that defines glass-card edges.

### Brutalist signature surfaces

- `--brand-hero-frame-width`: `12px`. Live: raw.md §2 Hero Section — "wrapped in a white border box (border-width: 12px)". The hero's defining surface property; named so future authors don't confuse it with hairlines.
- `--brand-hero-frame-radius`: `0px`. Live: raw.md §Special Notes — "DO NOT use standard rounded corners on the large Hero border-box; keep them sharp (0px) to contrast with the rounded cards below". Sharp by mandate.
- `--brand-card-radius`: `2rem` (`32px`). Live: raw.md §3 Feature Bento Grid — "Each card (Luminosity Card) should have a 2rem border-radius". The rounded counter-pole to the sharp hero frame. The signature contrast.
- `--brand-pill-radius`: `9999px`. Live: raw.md §Components Laser Button — "Border-radius: 9999px". Also raw.md §4 Social Proof & Form ("pill-shaped container") and §5 Mobile Navigation ("fixed bottom navigation pill").

### Glow + atmospherics

- `--brand-glow-primary`: `oklch(0.9225 0.2345 125.89 / 0.30)`. Live: raw.md §Components Laser Button — "Box-shadow: `0 0 20px rgba(191, 255, 0, 0.3)`". Lime at 30% alpha — the spread that gives the Laser Button its halo.
- `--brand-glow-refraction`: `oklch(0.9225 0.2345 125.89 / 0.15)`. Live: raw.md §Core Aesthetics Visual Effects — "Large, blurred radial gradients (`#BFFF00` at 15% opacity) acting as background ambiance".
- `--brand-glow-soft`: `oklch(1 0 0 / 0.03)`. Live: raw.md §Components Luminosity Card — "Background: `radial-gradient(circle at top left, rgba(255, 255, 255, 0.03), transparent)`". The faint white wash at the top-left of each bento card.

### Typography neutrals

- `--brand-body`: `oklch(1 0 0)` (= `#FFFFFF`). Body text primary.
- `--brand-body-muted`: `oklch(0.5208 0 0)`. Tracks `--muted-foreground` — opaque resolution of the 40%-white secondary text.
- `--brand-mono-meta`: `oklch(0.5208 0 0)`. Live: raw.md §Core Aesthetics Typography — "Technical Meta: 'Geist Mono', weight 400-600, tracking 0.2em to 0.5em, uppercase, font-size: 10px-12px". The pale-grey label colour. Carries surface-section eyebrows, deploy-meta captions, footer wordmarks.

### Drift vs `tokens.css`

Not applicable. New-system spec-derived authoring; `DESIGN.md` becomes the authoritative source for the first `tokens.css`.

## §3 Typography

Three families. The spec is precise about role separation: brutalist Plus Jakarta Sans for headline mass, Geist Mono for technical labels, Inter for body. No overlap; each family has a single load-bearing job.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (hero) | Plus Jakarta Sans | 800 | `clamp(2.6rem, 10vw, 8.75rem)` | 0.95 | -0.05em |
| Heading | Plus Jakarta Sans | 800 | `clamp(2rem, 4.5vw, 3.5rem)` | 1.05 | -0.04em |
| Title | Plus Jakarta Sans | 700 | `clamp(1.25rem, 2vw, 1.625rem)` | 1.2 | -0.02em |
| Body | Inter | 300-400 | 1rem | 1.65 (leading-relaxed) | normal |
| Caption / mono meta | Geist Mono | 400-600 | 10-12px | 1.4 | 0.2em-0.5em, uppercase |
| Countdown digit | Plus Jakarta Sans | 800 | `clamp(2.5rem, 5vw, 4rem)` | 1 | `font-variant-numeric: tabular-nums` |

**Notes:**

- Headlines are uppercase by spec. "MUST: Use uppercase for all technical labels and headlines to maintain the brutalist feel" (raw.md §Special Notes). The display role lives in caps with negative tracking — together they read as compressed mass, not as titles.
- The countdown digit is its own typographic role because of `tabular-nums`. Without it, the value shifts horizontally on every tick (4→5, 9→10) and the launch banner pulses. The spec calls this out as a MUST. The hero countdown is the surface where this matters most; the same rule extends to any other digit field that ticks (deploy-card timestamps, stat-band counters when animated).
- Geist Mono carries every technical label. Tracking widens to 0.2em-0.5em, sized 10-12px. The widening is brutalist register — wide-tracked small caps reading as engineering caption rather than marketing eyebrow.

## §4 Component vocabulary

Sixteen distinct component patterns. The spec is explicit about the signature primitives ("Laser Button", "Luminosity Card", "3D Glass card", "Refraction Glow"); the supporting vocabulary is derived from the spec's layout sections plus brutalist + glassmorphism register conventions where the spec is silent.

### Laser Button (primary CTA)

**Status:** `current`
**Live source:** raw.md §Components 1 Laser Button + §1 Header (used as topnav CTA)
**Description:** Lime fill with black ink. Pill shape (border-radius `9999px`), padding `0.625rem 1.5rem`, height ~48px, font Plus Jakarta Sans weight 700 uppercase or Inter weight 500 (mixed in spec; brutalist register favours Plus Jakarta), tracking +0.04em. Lime halo at 30% alpha (`0 0 20px rgba(191,255,0,0.3)`). The signature move is the hover state.
**States:**
- `default` — lime fill `var(--primary)`, black text `var(--brand-on-primary)`, glow shadow.
- `hover` — absolute-positioned `::before` pseudo with `linear-gradient(transparent, white 40%, transparent)` translates across the button at a 45° angle over 0.6s. The button momentarily reads as struck by a beam. After the sweep, the button settles back to the default fill (the gradient is a transient pass, not a persistent state). Lime glow shadow intensifies subtly during transition.
- `focus-visible` — 2px lime outline at offset 3px, no glow change (focus is keyboard-visible without becoming a second hover).
- `pressed` — fill darkens to ~85% lightness for ~100ms; glow shadow tightens.
- `disabled` — fill drops to `--brand-hairline-strong` (opaque grey), text drops to `--muted-foreground`, glow removed.

### Secondary button (outline)

**Status:** `current` (derived from brutalist register; spec doesn't explicitly enumerate but every CTA system needs a secondary)
**Live source:** brutalist register convention + raw.md §Special Notes uppercase requirement
**Description:** Transparent fill, 1px lime border, lime text. Same pill shape as Laser. Geist Mono uppercase label at 11px tracking 0.2em. No halo.
**States:** `default` lime outline + lime text; `hover` lime at 8% alpha background wash; `focus-visible` 2px outline offset 3px; `disabled` border drops to `--brand-hairline-strong`, text to `--muted-foreground`.

### Ghost button (topnav inline link)

**Status:** `current`
**Live source:** raw.md §1 Header navigation links
**Description:** No fill, no border. Geist Mono 10px tracking 0.3em uppercase. White text.
**States:** `default` white; `hover` lime `var(--primary)`; `focus-visible` lime underline 1px offset 4px.

### Luminosity Card (bento tile)

**Status:** `current`
**Live source:** raw.md §Components 2 Luminosity Card + §3 Feature Bento Grid
**Description:** Near-square card. Background `radial-gradient(circle at top left, rgba(255,255,255,0.03), transparent)` — a faint white wash at the top-left that suggests a light source overhead. 1px border at `rgba(255,255,255,0.05)` (= `--brand-hairline-soft`). Border-radius `2rem` (= `--brand-card-radius`). Minimum height 450px. Content stack:
- Top — mono index in Geist Mono `01/ETHOS` style (numeric prefix + uppercase label, separated by `/`).
- Middle — large Plus Jakarta Sans headline weight 800 uppercase, tracking -0.04em.
- Bottom — Inter body description weight 300-400, leading-relaxed, `--brand-body-muted`.
Transition `0.5s ease` on all properties.
**States:**
- `default` — soft white-wash gradient, hairline-soft border.
- `hover` — border lifts to `rgba(191,255,0,0.3)` (lime at 30% alpha); background radial swaps to lime `#BFFF00` at 5% alpha at the top-left. The card visibly catches lime light.
- `focus-within` — 2px lime ring offset 4px; background stays default (focus is for keyboard nav, hover is mouse-driven; both should not stack).

### 3D Glass card (hero backdrop)

**Status:** `current`
**Live source:** raw.md §2 Hero Section + §Core Aesthetics Visual Effects Glassmorphism
**Description:** A backdrop card sitting behind the brutalist hero border box. `perspective(1000px) rotateX(15deg)` tilts it forward into the viewport like a slab. `backdrop-filter: blur(12px) saturate(150%)`. 1px border at `--brand-hairline-glass` (8% white). Background `rgba(255,255,255,0.02)`. The card is decorative — it never carries text directly; it sits as a depth cue under the hero brutalist box.
**States:** `default` only. The glass doesn't react to mouse — the layer above it (the brutalist box and countdown) carries every interaction.

### Hero brutalist frame

**Status:** `current`
**Live source:** raw.md §2 Hero Section — "headline wrapped in a white border box (border-width: 12px)" + §Special Notes sharp-corner mandate
**Description:** A 12px solid white border (= `--brand-hairline-glass` at full opacity, effectively `--brand-on-dark`) around the massive headline. 0px radius — sharp corners. Padding `2.5rem 3rem`. The box sits in front of the 3D glass card backdrop. This is the system's defining visual moment: brutalist mass, glass depth, sharp-vs-round contrast against the bento cards below.
**States:** `default` only. Static surface — the countdown beside it animates; the frame doesn't.

### Countdown timer

**Status:** `current`
**Live source:** raw.md §2 Hero Section — "large countdown timer in 'Plus Jakarta Sans' using `font-variant-numeric: tabular-nums`" + §Special Notes MUST `tabular-nums`
**Description:** Six tabular-aligned digit fields (DD:HH:MM:SS, or DAYS / HOURS / MINUTES with label captions beneath each digit pair). Plus Jakarta Sans weight 800, `clamp(2.5rem, 5vw, 4rem)`. Each digit pair sits in a slim glass cell (1px border at `--brand-hairline-glass`, 4px corner radius — small radius pulls it visually under the bento-card 2rem radius without going sharp). Label below each pair in Geist Mono 11px tracking 0.3em uppercase.
**States:** `default` ticks once per second; digits never reflow because `tabular-nums` locks the width. When a digit field reaches `00`, label colour briefly flashes to lime then back to mute (1.2s ease).

### Status / metadata tag

**Status:** `current`
**Live source:** raw.md §2 Hero Section — "split-row metadata section: left side contains a location/status tag"
**Description:** Geist Mono 10px tracking 0.3em uppercase. Left of countdown. Dot prefix (4px round, lime). Caption "LAUNCH WINDOW · BERLIN · 2026.06.14" or similar — uppercase, dot-separated.
**States:** `default` static. The dot can pulse on a 2s ease loop to signal "live" — optional, motion-reduced override drops the pulse.

### Mobile bottom-nav pill

**Status:** `current`
**Live source:** raw.md §5 Mobile Navigation
**Description:** Fixed-bottom horizontal pill. `background: rgba(10,10,10,0.8)` (= `--muted` at 80% alpha), `backdrop-filter: blur(20px)`, 1px border at `--brand-hairline-strong`. Centered icon row, gap `1.25rem`. Each icon 24×24 stroke-1.75. Minimum touch target 48×48px per spec. Border-radius `9999px`.
**States:**
- `default` — icon colour `--brand-body-muted`.
- `hover` / `active` — icon colour flips to `var(--primary)`. High-contrast per spec.
- `focus-visible` — 2px lime ring offset 2px around the icon's hit box.

### Form pill (waitlist input + Laser Button)

**Status:** `current`
**Live source:** raw.md §4 Social Proof & Form
**Description:** A horizontal pill container — `rgba(255,255,255,0.05)` background, `backdrop-filter: blur(20px)`, 1px border at `--brand-hairline-soft`, `9999px` radius, height ~64px, padding `0.5rem 0.5rem 0.5rem 1.5rem`. Inside: a borderless Geist Mono input (placeholder "EMAIL@DOMAIN.COM" tracking 0.2em uppercase) on the left, a Laser Button on the right. The input and button visually merge into a single capsule.
**States:**
- `default` — empty input, button shows "JOIN WAITLIST".
- `focus` (input focused) — container border lifts to lime at 30% alpha (`--brand-glow-primary`); input ring removed (the container carries focus).
- `submitting` — Laser Button shows a 2-char tabular-nums progress ("12%"); the sweep-of-light hover animates continuously, no longer triggered by hover.
- `success` — container border lime, label "ON THE LIST · CHECK YOUR INBOX" in Geist Mono replaces button.
- `error` — container border `--destructive` at 60% alpha, helper text below the pill in Geist Mono uppercase.

### Avatar stack (social proof)

**Status:** `current`
**Live source:** raw.md §4 Social Proof & Form — "5 overlapping images, each having a 2px `#BFFF00` border and neon shadow"
**Description:** Five circular avatars, 40×40, overlapping by 12px (negative margin). Each has a 2px lime border (= `--primary`) and a lime drop-shadow at 30% alpha (`0 0 12px var(--brand-glow-primary)`). Sits left of a caption "JOINED BY 1,247 BUILDERS" in Geist Mono tracking 0.3em uppercase.
**States:** `default` only. Static.

### Section eyebrow

**Status:** `current`
**Live source:** brutalist register convention + raw.md §Core Aesthetics Typography for Technical Meta
**Description:** Geist Mono 11px weight 500 tracking 0.3em uppercase, colour `--brand-mono-meta`. Numeric prefix optional ("01/", "02/"). Sits above each section title; bento cards use the same shape as a "top-aligned mono index" per spec.
**States:** `default` only.

### Surface ladder swatch (token demo)

**Status:** `current`
**Live source:** preview-template convention; not in spec
**Description:** Four-tile horizontal grid showing canvas, muted, hairline-soft, primary. Each tile is a 12rem × 7rem fill with a small Geist Mono label in the bottom-left (token name + role). Tiles sit edge-to-edge separated by hairlines.
**States:** `default` only.

### Stat tile / KPI band

**Status:** `current`
**Live source:** derived (KPI bands are conventional on launch surfaces)
**Description:** Three-column horizontal band. Each tile shows a Plus Jakarta Sans weight 800 numeric value at `clamp(2rem, 4vw, 3rem)` with `tabular-nums`, then a Geist Mono label beneath at 11px tracking 0.3em uppercase. Tiles separated by hairlines, no border.
**States:** `default` static. Optional `live` state where the digit ticks; same `tabular-nums` rule prevents reflow.

### Footer wordmark band

**Status:** `current`
**Live source:** preview-template convention; brutalist register
**Description:** Massive Plus Jakarta Sans weight 800 uppercase wordmark spanning the full width — `clamp(4rem, 12vw, 10rem)`. Optionally an outline-only variant (transparent fill, 2px lime stroke text). Sits above a Geist Mono legal row.
**States:** `default` only.

### Refraction glow (ambient)

**Status:** `current`
**Live source:** raw.md §Core Aesthetics Visual Effects — "Refraction Glow: Large, blurred radial gradients (`#BFFF00` at 15% opacity) acting as background ambiance"
**Description:** Not a component per se — an ambient background layer. Two large radial gradients positioned at the top-right and bottom-left of the viewport, blurred (`filter: blur(120px)`), lime at 15% alpha. Fixed to viewport, pointer-events `none`, z-index `-1`. Sits behind the noise overlay; both sit behind every other surface.
**States:** `default` only. No motion under prefers-reduced-motion; subtle drift (translate ±20px on a 30s cubic-bezier loop) when motion is allowed.

## §5 Surface inventory

This is a spec-derived system, so the "surface inventory" is the spec's enumerated layout sections, not URLs.

- `raw.md §1 Header` — full-width container max 1600px, Plus Jakarta wordmark, Geist Mono nav links, Laser Button CTA.
- `raw.md §2 Hero Section` — the system's signature surface: 3D glass card backdrop tilted 15°, 12px-bordered brutalist headline frame, split-row metadata with countdown.
- `raw.md §3 Feature Bento Grid` — 3-column Luminosity Card grid, mono index / large headline / body description content stack.
- `raw.md §4 Social Proof & Form` — overlapping lime-bordered avatars, capsule waitlist form merging input + Laser Button.
- `raw.md §5 Mobile Navigation` — fixed-bottom backdrop-blurred pill with high-contrast hover.
- `raw.md §Components` — Laser Button and Luminosity Card primitives.
- `raw.md §Special Notes` — the system's anti-rules: no pure black, no rounded hero frame, mandatory `tabular-nums`, 48px mobile touch target.

## §6 Notes

- **Mixed-radius signature.** The system's most identity-defining detail is the deliberate radius contrast: 0px sharp on the hero brutalist frame, 2rem rounded on every Luminosity Card below it. The spec calls this out as a MUST. Future authors must not unify radii — softening the hero frame or sharpening the bento cards collapses the contrast premise.
- **No pure black.** The 3% fractal-noise overlay only resolves visually when the canvas has lightness above zero. `oklch(0.1149 0 0)` (= `#050505`) is the floor; pure `#000` eats the texture. Same rule for the `--muted` lifted-black at `oklch(0.1448 0 0)` (= `#0A0A0A`).
- **`tabular-nums` is mandatory wherever digits tick.** Hero countdown, deploy-card timestamps, live KPI counters. The spec calls this out as a MUST for the countdown; the rule extends by register logic to any other tabular-numeric surface that animates. Without it the brutalist mass visibly pulses on each tick.
- **Sweep-of-light is the Laser Button's signature.** A 45° angled pseudo-element gradient translates across the button on hover over 0.6s. Future authors must not replace this with a fill-shift or a glow-pulse — the sweep is the brand-recognizability moment.
- **`prefers-reduced-motion` overrides.** The refraction-glow drift, the metadata-tag pulse, the avatar-stack glow, and the Laser Button sweep-of-light all need motion-reduced fallbacks. Sweep-of-light reduces to an opacity flash on hover (no transform); the other ambient motions disable.
- **Single-polarity dark only.** A light variant is meaningless for this system — the glow, the noise, and the lime-on-near-black premise all depend on the dark canvas. `[data-theme="dark"]` mirrors `:root` verbatim. `@media (prefers-color-scheme: dark)` mirrors the same. No light-variant authoring path.
- **Brand-X-lift content to avoid.** When authoring previews, don't lift Superdesign's portfolio prose, the original "Neon Velocity Countdown" name as a product, or any styled text that reads as a real product launch banner. Halcyon-themed content only; the system is a register, not a launch-page clone.

## §Known gaps

- **No published live deployment to verify against.** The system was published as a Superdesign portfolio entry only; there's no live site to capture computed styles, screenshot states, or measure actual rendered contrast against. Every token value traces to the spec's explicit hex declaration or to a compositing calculation; no DOM-sampled override exists.
- **No reference imagery supplied.** The dispatch provided only the prose spec. Surfaces like the avatar-stack glow, the 3D glass tilt, and the 45° sweep are described in CSS-property language but not visually shown. Implementation derives from the prose — future authors with imagery access should verify the tilt angle, sweep duration, and glow spread match what the spec author rendered.
- **Mobile-specific surfaces beyond the bottom-nav pill aren't enumerated.** Spec ships a desktop-first vocabulary plus the mobile bottom-nav primitive. Mobile hero behaviour (does the 12px brutalist frame scale down? does the 3D glass tilt disable for thumb-friendly tap targets?) is not specified.
- **No documented destructive / warning / success colour beyond lime.** The single chromatic identity is a register decision — every status flows to the lime primary or to a neutral. Authoring a destructive variant requires a register call: keep the chromatic lock and signal destructive via text + icon alone, or introduce a single documented red. Tokens currently synthesise the standard shadcn-core red for completeness; it's not surfaced in the signature preview.
