---
slug: nature
name: Nature (Organic Brutalist)
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/nature/raw.md (Superdesign "Nature Inspired Style" by Shirley Lou — verbatim style prompt, layout sections, and component notes)
  - imagery: none — system is documented in spec text only, no reference imagery in the input set
  - principles: Organic Brutalist register — heavy condensed display type (Anton) softened by extreme rounding (5rem) and a persistent 4% SVG noise overlay; locked 5-colour earthy palette anchored on Forest #01472e; reveal motion uses a single cubic-bezier(0.16, 1, 0.3, 1) over 1.2s
canonical-canvas: light
selection:
  mood: [high-contrast, industrial, organic]
  tone: [dramatic, bold, calm, warm]
  formality: medium
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a dramatic, bold, calm, warm register with high-contrast, industrial, organic visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Nature (Organic Brutalist)

## §1 Canonical canvas

The system ships a vertically stacked, multi-canvas page that swaps colour-blocked sections separated by ultra-rounded top corners (5rem). The hero canvas is Sage; the feature grid is Olive; the footer is Forest. No single neutral carries every surface — the page is colour-blocked by design — but the **Sage canvas is the recognisable anchor**: it carries the massive Anton headline that defines the system, and Sage + Olive + Cream rotate as the three light canvases. Forest appears as the footer alone.

| Surface | Reference | Canvas | Notes |
|---|---|---|---|
| Hero band | spec §Section 2 | Sage `#ccd5ae` | The recognisability surface — Anton 23vw headline, floating Sage-Olive-Moss organic cards, 4% noise overlay on top |
| Product / feature grid | spec §Section 3 | Olive `#e9edc9` | 5rem rounded top corner against the Sage hero; 3-column card grid with 2.5rem image radius |
| Editorial / interlude | spec §Description ("warm cream") | Cream `#fefae0` | Lightest canvas in the system — paper-tone for descriptive text and origin labels |
| Footer | spec §Section 4 | Forest `#01472e` | Only dark surface in the canonical page; Sage text on Forest, 12-column grid newsletter signup |

Canonical canvas decision: **light**. The system is designed around three light canvases (Sage, Olive, Cream) and a single dark footer band; there is no documented dark-mode flip in the source spec.

## §2 Palette

The palette is locked to the five hex values in the spec prompt — Forest, Sage, Olive, Cream, Moss. Each entry below is sourced from `temp/refs/nature/raw.md` §"Style prompt".

### Brand primary

- `--primary`: `oklch(0.3519 0.0770 161.65)` (= `#01472e`, "Forest"). Live: spec §Style prompt — "earthy, organic palette: Forest (#01472e)". Forest is the dark anchor; per spec §Notes "dark text is always Forest #01472e — never pure black." It carries primary CTAs, body ink on light canvases, and the footer canvas.

### Documented secondary brand colours

- `--brand-accent-sage`: `oklch(0.8560 0.0532 118.09)` (= `#ccd5ae`). Live: spec §Style prompt — "Sage (#ccd5ae)". The recognisability canvas; carries the hero band, footer text on Forest, and one row of the floating organic cards.
- `--brand-accent-olive`: `oklch(0.9338 0.0475 112.47)` (= `#e9edc9`). Live: spec §Style prompt — "Olive (#e9edc9)". The feature-grid canvas; separates from Sage via a 5rem rounded top corner.
- `--brand-accent-moss`: `oklch(0.7390 0.0564 123.81)` (= `#a3b18a`). Live: spec §Style prompt — "Moss (#a3b18a)". The mid-tone; carries hairline-strong dividers and the second row of floating organic cards.

### Canvas + neutrals

- `--background`: `oklch(0.9814 0.0342 99.83)` (= `#fefae0`, "Cream"). Live: spec §Style prompt — "Cream (#fefae0)". The lightest canvas; default page background outside the colour-blocked sections.
- `--foreground`: `oklch(0.3519 0.0770 161.65)` (= `#01472e`, "Forest"). Live: spec §Notes — "dark text is always Forest #01472e — never pure black." Body ink + section heading ink on every light canvas.
- `--card`: `oklch(0.9338 0.0475 112.47)` (= `#e9edc9`, Olive). Cards inherit the feature-grid canvas — Olive surfaces hold the product tiles, with image children at 2.5rem radius.
- `--card-foreground`: `oklch(0.3519 0.0770 161.65)` (Forest). Same body-ink rule as `--foreground`.
- `--popover`: `oklch(0.9814 0.0342 99.83)` (Cream). (synthesised) — no popover surface documented in the spec; defaults to lightest canvas.
- `--popover-foreground`: `oklch(0.3519 0.0770 161.65)` (Forest). (synthesised).
- `--muted`: `oklch(0.8560 0.0532 118.09)` (Sage). Muted backgrounds use Sage as the soft neutral — same tone as the hero canvas.
- `--muted-foreground`: `oklch(0.4935 0.0371 131.01)` (= `#5a6650`, synthesised mid-Moss). (synthesised) — no muted-text colour declared in spec; computed as a Moss-family near-neutral that reads at body-text contrast against Cream and Sage. Documented as utility neutral per AUTHORING.md.
- `--accent`: `oklch(0.7390 0.0564 123.81)` (Moss). Accent surfaces route to Moss for the mid-tone moment.
- `--accent-foreground`: `oklch(0.3519 0.0770 161.65)` (Forest).
- `--secondary`: `oklch(0.9338 0.0475 112.47)` (Olive). Secondary buttons sit on Olive over a Sage / Cream canvas.
- `--secondary-foreground`: `oklch(0.3519 0.0770 161.65)` (Forest).
- `--destructive`: `oklch(0.3519 0.0770 161.65)` (Forest). (synthesised) — no destructive colour declared in spec. The locked palette has no red / amber, so destructive routes to Forest with weight + label as the differentiation. Documented in §6.
- `--destructive-foreground`: `oklch(0.9814 0.0342 99.83)` (Cream).
- `--border`: `oklch(0.8755 0.0277 93.13)` (= `#dcd6c2`, synthesised warm graygreen). (synthesised) — no hairline colour declared in spec; computed as a Cream-leaning warm gray that sits between Cream and Sage in lightness.
- `--input`: `oklch(0.8755 0.0277 93.13)` (same as `--border`).
- `--ring`: `oklch(0.3519 0.0770 161.65)` (Forest). Focus rings track `--primary`.

### Polarity-locked surfaces

The dark footer band is polarity-locked — Forest stays Forest in every mode, Sage stays Sage as the text colour on Forest. Per spec §Section 4 ("Background: #01472e. Text color: #ccd5ae"), this surface pair is identity-defining.

- `--brand-canvas-night`: `oklch(0.3519 0.0770 161.65)` (Forest). Live: spec §Section 4. The footer canvas.
- `--brand-on-dark`: `oklch(0.8560 0.0532 118.09)` (Sage). Live: spec §Section 4 — "Text color: #ccd5ae". Sage-on-Forest is the readable pair the spec ships; foreground for every Forest-canvas surface.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.8755 0.0277 93.13)` (= `#dcd6c2`, synthesised). (synthesised) — no hairline declared in spec; computed as a warm graygreen one step lighter than Sage.
- `--brand-hairline-strong`: `oklch(0.6601 0.0460 128.00)` (= `#8a987a`, synthesised Moss-darker). (synthesised) — same rule, one step darker than Moss for stronger dividers.

### Identity-defining motion + texture tokens

The spec encodes motion + texture as system identity, not as polish. These are surface-named brand tokens.

- `--brand-noise-opacity`: `0.04`. Live: spec §Texture & Effects — "persistent SVG noise overlay (4% opacity)". Always-on, fixed to the viewport.
- `--brand-radius-section`: `5rem` (= 80px). Live: spec §Texture & Effects — "border-radius: 5rem for large sections". The identity-defining corner; **NOT zero — the system reads as Brutalist via type, not via hard corners**.
- `--brand-radius-card`: `2.5rem` (= 40px). Live: spec §Texture & Effects — "border-radius: 2.5rem for cards/images".
- `--brand-radius-organic`: `3rem` (= 48px). Live: spec §Component 1 — "Implement images with border-radius: 3rem" for floating organic cards.
- `--brand-radius-pill`: `9999px`. Live: spec §Section 1 — "Pill-shaped navigation bar".
- `--brand-shadow-deep`: `0 25px 50px -12px rgba(1, 71, 46, 0.2)`. Live: spec §Texture & Effects — "Soft, deep shadows for floating elements: shadow-2xl with a tint of the 'Forest' color (rgba(1, 71, 46, 0.2))".
- `--brand-motion-curve`: `cubic-bezier(0.16, 1, 0.3, 1)`. Live: spec §Animation — "using cubic-bezier(0.16, 1, 0.3, 1) over 1.2s".
- `--brand-motion-duration`: `1200ms`. Live: spec §Animation — "over 1.2s".

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero display | Anton | 400 (regular — Anton ships single weight) | `clamp(4rem, 23vw, 16rem)` | 0.75 | -0.05em |
| Section display | Anton | 400 | `clamp(3rem, 15vw, 10rem)` | 0.85 | -0.04em |
| Heading | Anton | 400 | `clamp(2rem, 4vw, 3.5rem)` | 1.0 | -0.03em |
| Title | Inter | 700 | 18px | 1.3 | 0 |
| Body | Inter | 400 | 16px | 1.55 | 0 |
| Label / button | Inter | 700 | 11px | 1 | 0.25em uppercase |
| Caption / footer | Inter | 400 | 14px | 1.45 | 0 |
| Mono | ui-monospace fallback | 400 | 13px | 1.5 | 0 |

Notes:

- **Anton** is a heavy industrial condensed display sans available on Google Fonts (one weight, 400). Hero size hits 23vw and section titles 15vw per spec §Typography, with `letter-spacing: -0.05em` and `line-height: 0.75` on the hero. The condensed shape carries the brutalist weight that the rounded corners alone don't.
- **Inter** carries body, UI, and label roles. Labels and buttons run uppercase with `letter-spacing: 0.2em – 0.4em` per spec §Typography ("Use uppercase with letter-spacing 0.2em - 0.4em for all labels and buttons"). The 11px button-size + wide tracking is the editorial-utility register the system pairs against Anton.
- The spec leaves "mono" undeclared. Default to a `ui-monospace` system stack — the system is editorial-utility, not code-first.

## §4 Component vocabulary

The spec describes a documented vocabulary. Each entry below cites the spec section it is derived from.

### Fixed pill navigation

**Status:** `current`
**Live source:** spec §Section 1
**Description:** Fixed top navigation, full viewport width. Three regions — left logo (bold uppercase with hyphen prefix), centre pill-shaped link bar with `backdrop-filter: blur(20px)` and a semi-transparent white fill (`#ffffff1a`), right cart button with numeric counter badge in a white pill. Link text runs uppercase, 11px, bold, with wide tracking. The pill rests `1rem` below the viewport top; corners are fully rounded (`--brand-radius-pill`).
**States:** `default` — frosted white-on-canvas pill; `hover` — link colour shifts to Forest, no underline; `focus-visible` — Forest 2px outline at 3px offset.

### Hero with stagger-reveal Anton headline

**Status:** `current`
**Live source:** spec §Section 2
**Description:** Full viewport height, Sage canvas (`#ccd5ae`). Centerpiece is the Anton headline at 23vw with letters revealed via staggered animation (0.05s delay per letter). Headline copy is short — 1 to 3 words — so the type carries the section weight rather than narrative. Below the headline: dual-column descriptive text with a location/origin label.
**States:** `default` — letters at `opacity: 1, translateY(0)`; `entering` — letters animate from `opacity: 0, translateY(100px)` to default at 0.05s/letter using `--brand-motion-curve` over `--brand-motion-duration`; `reduced-motion` — letters render at default immediately, no stagger.

### Floating Organic Cards

**Status:** `current` (signature component)
**Live source:** spec §Components §1
**Description:** Images with extreme rounding (`--brand-radius-organic` = 3rem). Sit on the Sage hero canvas, 2-3 cards arranged loosely around the centre Anton headline. Each card runs a CSS `float` keyframe — `translateY(0) rotate(0deg)` ↔ `translateY(-20px) rotate(5deg)` on an infinite loop — and accepts a scroll-listener that adds extra `translateY` based on scroll depth (speed factor 0.05). Soft deep shadow tinted Forest (`--brand-shadow-deep`).
**States:** `default` — at `0deg, 0px`; `floating` — animation runs at `--brand-motion-duration` × variable; `reduced-motion` — animation disabled, cards rest at default.

### Blur-Reveal Button (on product card hover)

**Status:** `current` (signature component)
**Live source:** spec §Components §2
**Description:** Hover interaction layered over the product card grid. The card overlay carries `background: rgba(1, 71, 46, 0.3)` and `backdrop-filter: blur(2px)`. Inside the overlay sits a white pill — uppercase Inter at wide tracking, Forest text, fully rounded — that translates up 32px on hover. Overlay opacity transitions from 0 to 1 over `--brand-motion-duration` using `--brand-motion-curve`.
**States:** `default` — overlay opacity 0, button at `translateY(32px)`; `hover` — overlay opacity 1, button at `translateY(0)`; `focus-visible` — same as hover, plus the button carries a 2px Forest outline at 3px offset.

### Product card (image + Blur-Reveal Button)

**Status:** `current`
**Live source:** spec §Section 3
**Description:** Aspect-ratio 4:5 image card with `border-radius: 2.5rem`. Sits inside the 3-column Olive feature grid. Hover scales the image `1.1x` and the Blur-Reveal Button rises from the bottom with the blur overlay above.
**States:** `default` — image at scale 1, no overlay; `hover` — image at scale 1.1, overlay + button visible; `focus-within` — same as hover.

### Section divider — 5rem rounded top corner

**Status:** `current`
**Live source:** spec §Layout overview, §Section 3
**Description:** When one colour-blocked section transitions to the next, the lower section's top edge carries a 5rem (`--brand-radius-section`) rounded corner on both top-left and top-right. This is the only way the system separates colour blocks — there are no hairlines, no dividers. The rounding is identity-defining.

### Pill chips (utility chrome)

**Status:** `current` (derived from spec's pill nav + cart counter pattern)
**Live source:** spec §Section 1 — "white pill" cart-counter pattern
**Description:** Small pill chips at `--brand-radius-pill`. Uppercase Inter 700 at 11px, 0.25em tracking. Tone variants — Sage / Olive / Moss / Forest — each pairs with the readable ink rule (Forest text on light tones, Cream text on Forest).

### Primary button (filled Forest)

**Status:** `current` (derived from spec's pill + Forest anchor)
**Live source:** spec §Style prose + §Section 1 button pattern
**Description:** Filled Forest pill with Cream text. Uppercase Inter 700 at 12px with 0.25em letter-spacing. Touch target 44px floor. Radius is fully rounded — the system runs no rectangular buttons.
**States:** `default` — Forest fill, Cream text; `hover` — slight Forest-to-deeper transition over 200ms; `focus-visible` — 2px Forest outline at 3px offset; `disabled` — 0.55 opacity.

### Secondary button (hairline-outlined on Cream)

**Status:** `current`
**Live source:** spec §Section 1 pair pattern (deduced — the spec pairs CTAs in the nav)
**Description:** Cream pill with a `--brand-hairline-soft` outline and Forest text. Same uppercase / tracking / 44px floor as primary. Used in pairings with the primary CTA.
**States:** `default` — Cream fill, soft hairline; `hover` — hairline strengthens to Forest; `focus-visible` — 2px Forest outline at 3px offset.

### Newsletter input (uppercase underline)

**Status:** `current`
**Live source:** spec §Section 4 — "Large newsletter signup with an uppercase underline-only input field"
**Description:** Underline-only input — no fill, no rounded box. The bottom border is a 1px Sage line on the Forest canvas. Placeholder text is uppercase Inter at wide tracking, 14px. Submit button sits inline at the right or below.
**States:** `default` — Sage 1px underline; `focus-visible` — Sage 2px underline, no outline (the underline carries the focus signal); `filled` — input text in Sage.

### Footer link list (12-column grid)

**Status:** `current`
**Live source:** spec §Section 4
**Description:** 12-column grid on Forest canvas. Two columns of links — bold uppercase Inter at 11px, 0.25em tracking, Sage text. Bottom strip carries copyright + legal links at 30% opacity.

### Persistent SVG noise overlay

**Status:** `current` (identity-defining texture)
**Live source:** spec §Texture & Effects
**Description:** SVG fractal noise rendered as a fixed full-viewport overlay at 0.04 (`--brand-noise-opacity`) opacity. Not a section background — a viewport-locked layer that sits above every canvas and below interactive elements. Implemented via `position: fixed; inset: 0; pointer-events: none; mix-blend-mode: multiply;`.

## §5 Surface inventory

The source spec documents one synthetic page composition. Each canvas-blocked section contributes one component pattern to the system.

- spec §Section 1 (Header/Navigation) — fixed pill nav, cart counter pill, brand mark wordmark
- spec §Section 2 (Hero) — Anton headline with stagger reveal, Floating Organic Cards, dual-column copy
- spec §Section 3 (Product/Feature Grid) — colour-blocked Olive canvas, 5rem rounded top, 3-column product card grid, Blur-Reveal Button hover
- spec §Section 4 (Footer) — Forest canvas, Sage text, 12-column grid, underline-only newsletter input

## §6 Notes

- **Organic Brutalist tension** — the spec explicitly frames the system as "brutalist" (heavy condensed Anton type) while specifying 5rem corners on every primary container. This is **not zero radius**. The brutality lives in type weight + colour blocking + viewport-scale headlines; the rounding softens the impact into something "tactile, premium paper-like." If a future author reaches for sharp corners to "honour the brutalist label," that's wrong — the spec is explicit on 5rem.
- **Locked palette, no decorative accent** — the five colours are the whole system. Red / amber / blue / any third-hue accent breaks the brand. Destructive routes to Forest with label + weight as the differentiator. Status colour ladders are tone-shifted across Sage / Olive / Moss / Forest, not hue-shifted.
- **Dark text is always Forest, never pure black** — per spec §Notes. The `--foreground` token holds `oklch(0.3519 0.0770 161.65)` = `#01472e`, not a near-black neutral. The slight green chroma is identity.
- **Motion vocabulary is sacrosanct** — every animated transition uses `cubic-bezier(0.16, 1, 0.3, 1)` over 1.2s. Single source of truth across stagger letters, Floating Organic Cards, Blur-Reveal Buttons, section reveals. Don't introduce a second curve.
- **The persistent 4% SVG noise overlay is non-negotiable** — it is identity, not polish. Without it the system reads as "earthy editorial CMS template" rather than "Organic Brutalist."
- **Footer is polarity-locked** — Forest canvas + Sage text on the footer band hold across light and dark modes. If a future author authors a dark variant, the rest of the page may flip but the footer relationship stays the same.
- **No documented dark mode in spec** — the system canonical-canvas is light. Any dark variant we synthesise should deepen Sage / Olive / Cream into a Forest-leaning canvas family (not a neutral near-black), preserving the warm chroma.

## §Known gaps

- **No reference imagery in the input set.** All values trace to spec prose only. Floating Organic Card photography (the spec implies "ingredient images") is unsampled; a future cycle with real product photography would sharpen the card aspect-ratio / framing convention.
- **No declared mono family.** Default ui-monospace stack is a defensible fallback for an editorial system, but a future cycle could fix on something more deliberate (e.g., JetBrains Mono).
- **No declared dark mode.** Section §6 documents the synthesis we apply if a dark variant becomes necessary; that's an authored decision, not a sampled one.
- **No declared destructive colour.** §6 documents the Forest + label fallback. If destructive UI becomes a needed surface, the system would either route through tone+weight or break the locked-five rule deliberately.
- **No declared form-input fill states.** Spec §Section 4 documents only the newsletter underline input. Filled inputs / textareas / selects are derived from the underline pattern; a future cycle with a real form surface in the input set could replace these.
