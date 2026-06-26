---
slug: playful
name: Playful Geometric
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/playful/raw.md (Playful Geometric — designprompts.dev / Superdesign library entry by Zhou Jason)
  - imagery: none provided; spec text is the sole source
  - principles: "Stable Grid, Wild Decoration" — content lives in clean readable areas, the world around it is alive with primitive shape, dot grids, squiggles, and confetti. References Memphis Group (80s) cleaned up for modern screens.
canonical-canvas: light
selection:
  mood: [playful, tactile]
  tone: [friendly, optimistic]
  formality: low
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a friendly, optimistic register with playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

---

# Playful Geometric

## §1 Canonical canvas

A single-polarity light system. The spec ships only a light canvas with one cream paper tint as the surface body; there is no documented dark variant. The register expects the warm cream to read as paper, so the saturated decorative palette stays high-contrast against it. A dark mode is synthesised here as a courtesy, kept conservative (warm-near-black canvas, the saturated palette held fixed at `:root`), and signed off in §6.

| Surface | Source | Canvas | Notes |
|---|---|---|---|
| Marketing body | spec §"Style prompt" — `background: #FFFDF5` | Warm cream `oklch(0.9934 0.0107 95.1593)` | The paper-tinted canvas all content sits on; the warmth distinguishes the system from a cool minimalist neutral |
| Card / input | spec §"Style prompt" — `card / input: #FFFFFF` | Pure white `oklch(1 0 0)` | Cards and inputs lift off cream by being a half-step lighter and chunkier-bordered; the gap is small, the border is loud |
| Footer / dark accent | none documented | (synthesised — none in spec) | The spec never declares a dark footer or dark interlude. Page rhythm stays light end-to-end |

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a citation against the spec text. All chromatic values trace to `temp/refs/playful/raw.md`'s "Style prompt" block unless noted.

### Brand primary

- `--primary`: `oklch(0.6056 0.2189 292.7172)` (= `#8B5CF6`). Live: spec §"Style prompt" — `accent: #8B5CF6 // Vivid Violet (Primary Brand)`. Used as the Candy Button fill, the focus ring, and the input focus-border colour.

### Documented secondary brand colours

The spec calls these "decorative, not semantic state colors" — they rotate across feature-card headers, sticker shadows, and ladder steps. Each is a full-chroma decorative tone, never a primary CTA.

- `--brand-accent-pink`: `oklch(0.7253 0.1752 349.7607)` (= `#F472B6`). Live: spec §"Style prompt" — `secondary: #F472B6 // Hot Pink (Playful pop)`. Appears as featured-card pink shadow, alternating feature-card headers, ladder rotation.
- `--brand-accent-amber`: `oklch(0.8369 0.1644 84.4286)` (= `#FBBF24`). Live: spec §"Style prompt" — `tertiary: #FBBF24 // Amber/Yellow (Optimism)`. Appears as the hero's "massive yellow circle" backdrop, the secondary-button hover fill, and the rotated "MOST POPULAR" star badge.
- `--brand-accent-mint`: `oklch(0.7729 0.1535 163.2231)` (= `#34D399`). Live: spec §"Style prompt" — `quaternary: #34D399 // Emerald/Mint (Freshness)`. Appears as alternating ladder step, success-state icon backplates, decorative confetti dots.

### Canvas + neutrals

- `--background`: `oklch(0.9934 0.0107 95.1593)` (= `#FFFDF5`). Live: spec §"Style prompt" — `background: #FFFDF5 // Warm Cream/Off-White (Paper feel)`.
- `--foreground`: `oklch(0.2795 0.0368 260.0310)` (= `#1E293B`). Live: spec §"Style prompt" — `foreground: #1E293B // Slate 800 (Softer than black)`. The spec is explicit: softer than black. Body text and every chunky border carry this colour, never `#000`.
- `--card`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §"Style prompt" — `card: #FFFFFF`.
- `--card-foreground`: `oklch(0.2795 0.0368 260.0310)` (= `#1E293B`). Live: inherits foreground rule. (synthesised pairing — not separately documented in the spec but follows the system's "ink on white" pattern.)
- `--popover`: `oklch(1 0 0)` (= `#FFFFFF`). (synthesised — mirrors card; spec doesn't enumerate popovers.)
- `--popover-foreground`: `oklch(0.2795 0.0368 260.0310)`. (synthesised — mirrors card-foreground.)
- `--muted`: `oklch(0.9683 0.0069 247.8957)` (= `#F1F5F9`). Live: spec §"Style prompt" — `muted: #F1F5F9 // Slate 100`.
- `--muted-foreground`: `oklch(0.5544 0.0407 257.4166)` (= `#64748B`). Live: spec §"Style prompt" — `mutedForeground: #64748B // Slate 500`.
- `--accent`: `oklch(0.6056 0.2189 292.7172)` (= `#8B5CF6`). Live: spec §"Style prompt" — `accent: #8B5CF6`. The spec models accent and primary as the same hue.
- `--accent-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §"Style prompt" — `accentForeground: #FFFFFF`.
- `--secondary`: `oklch(0.7253 0.1752 349.7607)` (= `#F472B6`). Live: spec §"Style prompt" — `secondary: #F472B6`.
- `--secondary-foreground`: `oklch(0.2795 0.0368 260.0310)`. (synthesised — slate-800 ink on hot-pink reads cleanly; spec doesn't enumerate a paired foreground but the dark-ink-on-pop-color pattern is consistent with the workflow-card register from analogous systems and the spec's own "ink on featured shadow" usage.)
- `--destructive`: `oklch(0.5870 0.2370 28.4)` (synthesised — no destructive in the spec). A warm coral red that holds the same chroma weight as the decorative tones without leaning into the magenta range already claimed by hot-pink.
- `--destructive-foreground`: `oklch(1 0 0)`. (synthesised.)
- `--border`: `oklch(0.9288 0.0126 255.5079)` (= `#E2E8F0`). Live: spec §"Style prompt" — `border: #E2E8F0 // Slate 200`. Used for the soft "Sticker" shadow tone (`8px 8px 0px #E2E8F0`); component-chunky-borders use foreground, not this token.
- `--input`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §"Style prompt" — `input: #FFFFFF`.
- `--ring`: `oklch(0.6056 0.2189 292.7172)` (= `#8B5CF6`). Live: spec §"Style prompt" — `ring: #8B5CF6 // Violet Focus`. Same value as `--primary`; the primary-family asymmetry rule is upheld.

### Polarity-locked surfaces

The system is light-canonical and does not enumerate polarity locks. The signature surface — hard-offset shadow on a chunky-bordered cream card — is the same value in both modes by virtue of being a relative offset from `--foreground`, not a fixed dark colour locked to a light card. No `--brand-canvas-night`-style locks are warranted; everything is allowed to flip with theme in the synthesised dark.

### Hairlines / dividers

The spec's chunky 2px borders dominate elevation work; hairlines exist mostly inside cards (input borders, list dividers).

- `--brand-hairline-soft`: `oklch(0.8690 0.0198 252.8943)` (= `#CBD5E1`). Live: spec §"Inputs" — `Border: 2px solid #CBD5E1`. The "soft input border" colour the spec names directly for the input default state.
- `--brand-hairline-strong`: `oklch(0.2795 0.0368 260.0310)` (= `#1E293B`). Live: spec §"Primary Button" / §"Sticker Card" — `Border: 2px solid #1E293B`. The chunky-border colour every primitive uses for the offset-shadow primitive.

### Drift vs `tokens.css`

Not applicable — this is the first authoring of the system. The token file is being authored against this DESIGN.md in Step 2.

## §3 Typography

The spec declares a two-family pairing and a 1.25 major-third scale.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Outfit | 800 | 3.5–4.5rem (clamp) | 1.0 | -0.03em |
| Heading | Outfit | 700 | 2–2.75rem (clamp) | 1.05 | -0.02em |
| Title | Plus Jakarta Sans | 500–600 | 18–20px | 1.4 | 0 |
| Body | Plus Jakarta Sans | 400 | 16px | 1.55 | 0 |
| Caption | Plus Jakarta Sans | 500 | 13px | 1.45 | 0 |
| Mono | (system mono) | 400 | 13px | 1.45 | 0 |

Notes on the pairing observed in the spec:

- **Outfit** carries display + heading roles in 700/800. The spec singles out "Bold Outfit font" for the Sticker Card title and the Candy Button label.
- **Plus Jakarta Sans** carries body + UI in 400/500. The spec's input labels are "Bold, uppercase, small tracking-wide" — that's title-weight Plus Jakarta Sans with letter-spacing ≈ 0.08–0.12em.
- The scale ratio is 1.25 (major third). Pairs with the chunky display sizes the system favours — display lines run 14ch wide, heading lines 22ch.
- No mono is specified in the spec; the system uses a generic system monospace stack where mono is needed (token preview, code samples). Not a brand role.

## §4 Component vocabulary

Eleven entries, derived from the spec's component declarations plus reasonable extensions for surfaces the spec implies but doesn't enumerate in isolation (badges, navigation, focus states on the Candy Button, etc.). The spec is structural; each entry below cites its source line.

### Candy Button — Primary

**Status:** `current`
**Live source:** spec §"1. Primary Button (The Candy Button)" — `Bg: accent (#8B5CF6) … Border: 2px solid #1E293B … Shadow: 4px 4px 0px #1E293B`
**Description:** Pill-shaped (`rounded-full`) violet button with a 2px chunky dark border around the colour. A hard 4×4 offset shadow in slate-800 sits below-right with no blur — it reads as a sticker peeled off the page. The button label is white at weight 700. An optional icon sits inside a white circular backplate at the trailing edge.
**States:** `default` — translation 0, shadow `4px 4px 0 #1E293B`. `hover` — translates -2/-2, shadow extends to `6px 6px 0 #1E293B` (the lift). `active` — translates +2/+2, shadow compresses to `2px 2px 0 #1E293B` (the press). `focus-visible` — outer ring at `oklch(0.6056 0.2189 292.7172)` (the violet primary itself, 2px offset). The translate motion drives the lift/press feel; the position animates, the blur never softens.

### Secondary Button — Outline-fills-yellow

**Status:** `current`
**Live source:** spec §"2. Secondary Button" — `Bg: transparent … Border: 2px solid #1E293B … Hover: bg-tertiary (#FBBF24)`
**Description:** Transparent pill with the same chunky dark border as the Candy Button, no shadow, foreground-ink label. On hover, the entire surface fills with amber — the border stays, the inside switches from transparent to `#FBBF24`. The hover state is a colour swap, not a translation; the button stays put while the surface changes.
**States:** `default` — transparent fill, foreground ink. `hover` — amber fill, foreground ink (slate-800 reads cleanly on amber). `pressed` — slight darkening of the amber (or a one-tick scale-down). `focus-visible` — outer ring matches the Candy Button. No active-translate.

### Sticker Card

**Status:** `current`
**Live source:** spec §"3. The Sticker Card" — `Bg: white … Border: 2px solid #1E293B … Shadow: 8px 8px 0px #E2E8F0 or #F472B6 (Pink shadow for featured)`
**Description:** White card with a 2px chunky dark border and a softer hard shadow — `8px 8px 0 #E2E8F0` for default cards, `8px 8px 0 #F472B6` for the featured variant. The shadow magnitude is larger than the button's (8px vs 4px) but follows the same no-blur sticker register. An icon may "float" half-in, half-out of the top border in a small white circle. The body type is Plus Jakarta Sans at 400; the title is Outfit at 700.
**States:** `default` — shadow at 8/8. `hover` — rotates -1deg and scales to 1.02 (the wiggle). `focus-within` — outer ring on the card itself when a contained interactive element receives focus. The wiggle is the system's signature card motion — every Sticker Card uses the same transform.

### Input

**Status:** `current`
**Live source:** spec §"4. Inputs" — `Border: 2px solid #CBD5E1 … Focus: Border accent, Shadow 4px 4px 0px accent`
**Description:** White input with a 2px softer slate border at rest (lighter than the button's slate-800 — it's `#CBD5E1`, the hairline-soft token). On focus, the border thickens conceptually by switching to the violet accent, and a 4×4 hard offset shadow in violet appears below-right — the input lifts to its own sticker. Radius is 8px (`rounded-lg`), one step less round than the buttons' pill.
**States:** `default` — `border #CBD5E1`, no shadow. `hover` — border darkens to foreground. `focus` — border switches to violet, shadow `4px 4px 0 var(--primary)` appears. `error` — border swaps to destructive coral, shadow swaps colour likewise. `disabled` — surface mutes to `#F1F5F9`, border to a softer slate.

### Label (paired with Input)

**Status:** `current`
**Live source:** spec §"4. Inputs" — `Label: Bold, uppercase, small tracking-wide`
**Description:** A small Plus Jakarta Sans label sitting above the input, set in uppercase at weight 600, tracking ≈ 0.1em, size 12px. The label is foreground-ink — never the accent colour even when the input is focused.

### Pop Shadow primitive

**Status:** `current`
**Live source:** spec §"5. The Pop Shadow" — `box-shadow: 4px 4px 0px 0px #1E293B`
**Description:** A hard-edged offset shadow with no blur, used as the shared elevation language across buttons and cards. The colour is slate-800 by default but can swap to any decorative tone (amber, pink, mint) when the underlying surface wants a coloured sticker shadow. The system's elevation language is offset, not blur — drop-shadows with blur are never used.
**States:** Three positions encode interaction: rest `4px 4px`, lift `6px 6px`, press `2px 2px`. The transition is `transform` (the surface moves) paired with `box-shadow` (the offset adjusts to match), both eased on a bouncy cubic-bezier.

### Iconography — Lucide enclosed

**Status:** `current`
**Live source:** spec §"9. Iconography (Lucide React)" — `Stroke Width: 2.5px (Bold/Chunky) … Enclosed in shapes. Never floating alone.`
**Description:** Lucide icons rendered at 2.5px stroke (chunkier than the Lucide default of 2), with round caps and round joins. Icons are not allowed to sit alone on the page — they're enclosed in a coloured backplate (mint circle for success, amber for warning, violet for primary). The ink inside the backplate is white or foreground depending on the backplate's lightness.
**States:** `default` — 2.5px stroke. `hover` — the wiggle keyframe (`rotate: 0 → 3 → -3 → 0`) on hover of the parent interactive element. `disabled` — backplate desaturates to muted slate.

### Badge — "MOST POPULAR" star

**Status:** `current`
**Live source:** spec §"8. Pricing Section" — `massive yellow star badge "MOST POPULAR" rotated 15deg`
**Description:** A signature pricing primitive — an amber star shape (multi-pointed, not a circle or pill) rotated 15deg counter-clockwise and sitting at the upper-right corner of the featured pricing card. The label inside is Outfit at 700–800, foreground ink. The star is decorative — it's the visual signal, the prose is secondary. No equivalent badge exists for warning / new / beta states in the spec; this is a pricing-only ornament.
**States:** `default` only — the star doesn't animate or change state.

### Pricing card — Featured (scaled)

**Status:** `current`
**Live source:** spec §"8. Pricing Section" — `middle card is scaled up (1.1)`
**Description:** The featured tier of a three-column pricing layout is uniformly scaled up by 1.1, lifting it visually above the other two. It carries the star badge plus a pink-shadow variant of the Sticker Card (per spec §"3. The Sticker Card" — `Shadow: 8px 8px 0px #F472B6 (Pink shadow for featured)`). Default tiers carry the soft slate-200 shadow; the featured tier swaps to hot pink.
**States:** `default` only.

### Hero — Yellow Circle Backdrop

**Status:** `current`
**Live source:** spec §"6. Hero Section" — `A massive yellow circle behind the text. A dotted pattern behind the image.`
**Description:** A signature hero composition. Text sits left over a massive amber circle (a `border-radius: 50%` shape, half off the viewport, sized so the circle reads as backdrop-art not chip). On the right, an image carries a "blob" mask (irregular border-radius like `40% 60% 65% 35% / 35% 50% 50% 65%`) over a dotted-pattern backdrop. Decoration owns the world around the content; the content itself stays on a clean grid.
**States:** `default` only — the composition is the rest state; entrance animations use the "pop" keyframe.

### Decorative shape vocabulary

**Status:** `current`
**Live source:** spec §"Notes" — `clean readable content areas surrounded by primitive shapes, squiggles, dot grids, and confetti SVGs`
**Description:** Not a single component but a vocabulary of decorative primitives — solid circles, dot-grid SVGs (small dot fills at 4–6px spacing), dashed connection lines between cards, single-line zigzag squiggles, scattered "confetti" rectangles in the rotational palette. Each piece is a solid-colour SVG with no blur, no gradient, no shadow. They live in the gaps between content blocks, never overlapping text.

### Animation vocabulary

**Status:** `current`
**Live source:** spec §"10. Animation Vocabulary" — `cubic-bezier(0.34,1.56,0.64,1) … pop (Scale 0->1 with bounce) … Wiggle: rotate: 0deg -> 3deg -> -3deg -> 0deg`
**Description:** A consistent bouncy easing curve drives every hover transition — `cubic-bezier(0.34, 1.56, 0.64, 1)` has overshoot built in, which is what produces the elastic feel on button lift / card wiggle. Entrance uses a "pop" keyframe (scale 0→1 with the same bouncy curve). A marquee animation runs infinite-scrolling text for client logos or keyword bands. Icon hover uses the wiggle keyframe (rotate 0 → 3 → -3 → 0). All motion respects `prefers-reduced-motion`.

## §5 Surface inventory

This is a spec-derived authoring; there are no live URLs to inventory. The reference material is one document:

- `temp/refs/playful/raw.md` — the spec text describing the system. Carries the palette block, the typography pairing, the ten-component vocabulary, and the "Stable Grid, Wild Decoration" framing. Authored by Zhou Jason for the Superdesign library (designprompts.dev source attribution per the description line). No live deployment to sample; the spec is frozen.

## §6 Notes

- **"Stable Grid, Wild Decoration" is the defining concept.** Content (text, forms, primary navigation) lives on a clean, readable grid; the world around it is alive with primitive shape, dotted patterns, dashed connectors, and confetti SVGs. Authoring for this system means resisting the urge to ornament the content itself — decoration belongs in the margins, the gutters, the backdrop shapes behind the hero text.
- **Hard offset shadows, no blur, ever.** This is the signature surface treatment. Every button, card, and focused input lifts off the page via a `Npx Npx 0 colour` shadow. The `0` blur is non-negotiable — adding even 1px of blur breaks the sticker register. The shadow's position is what animates between rest, hover, and pressed states; the offset shrinks for press, extends for hover.
- **Three decorative tones, one primary.** Violet is the only colour with a CTA role. Hot pink, amber, and mint rotate as decorative — alternating feature-card headers, ladder steps, sticker-shadow swaps, badge fills. They're not destructive / warning / success state colours; the spec is explicit about that. If a system consumer reaches for "success-mint" semantically, they're mis-reading the palette.
- **Slate-800 over pure black.** The spec calls out `#1E293B (Softer than black)` deliberately. Every chunky border, every body-ink usage carries this colour, never `#000`. The warm cream canvas plus a softer-than-black foreground is what keeps the system from reading as harsh; it's playful, not aggressive.
- **Synthesised dark mode is conservative by design.** The spec is single-polarity light. A dark variant is included for completeness — warm-near-black canvas, slate-700 borders, the decorative palette held at full chroma — but consumers should be aware the spec doesn't sanction it. The Candy Button's slate-800 hard shadow is invisible on a slate-950 canvas; the preview template flips the shadow colour to a light tone in dark via a local custom property, not by retuning the slate-800 token itself.
- **Lucide icons must be enclosed.** A bare Lucide icon sitting on the canvas violates the system — the spec is explicit. Every icon lives inside a coloured shape (mint circle for success, amber for warning, violet circle for primary). The "Check" icon isn't just a check; it's a check inside a green circle.
- **Two fonts, no more.** Outfit and Plus Jakarta Sans are the entire type system. The spec carries no mono role — when a token-preview or code surface needs mono, use the system stack (`ui-monospace`). Don't introduce a third brand font.

## §Known gaps

- **No live deployment to sample.** This is a spec-derived authoring; every value comes from the document at `temp/refs/playful/raw.md`. If a brand deploys this system in production, the live site might document additional patterns (date pickers, toasts, tables, side-nav) — none of those are in the spec.
- **No dark mode declared.** The spec is light-canonical with no documented dark variant. The dark mode synthesised in `tokens.css` is a conservative inversion (warm-near-black canvas, decorative palette held at `:root`), but consumers preferring a brand-faithful render should set the page to light explicitly.
- **No semantic palette beyond decorative.** The spec doesn't enumerate success / warning / info / destructive colours. The decorative rotation (pink / amber / mint) is explicitly NOT meant to carry semantic state. `--destructive` is synthesised here as a warm coral red that doesn't collide with the decorative palette; consumers shipping form validation in this register should be aware they're past the spec.
- **No focus-visible vocabulary on every component.** The spec describes focus on inputs (border switches to violet, shadow appears) but doesn't enumerate focus for every interactive element. The preview template applies a uniform outer-ring violet focus across all buttons; that's a sensible extension, not a spec mandate.
- **Decoration not enumerated exhaustively.** The spec mentions dotted patterns, dashed connector lines, squiggles, and confetti — but doesn't ship SVG patterns or vector files. Each decorative primitive is hand-authored from the description in §4 "Decorative shape vocabulary"; another author could legitimately interpret "confetti" differently.
