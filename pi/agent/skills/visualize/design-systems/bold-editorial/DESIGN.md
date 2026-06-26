---
slug: bold-editorial
name: Bold Editorial
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/bold-editorial/raw.md (Superdesign "Bold Editorial Design Style" by Shirley Lou — frozen description, palette, layout-section briefs, component briefs)
  - imagery: none provided; chromatic and layout decisions derive from the spec's per-section prose
  - principles: brutalist display typography crossed with luxury minimalism; massive Anton uppercase at viewport-relative scale; Navy / Sage anchor with Cyan, Taupe, Beige, Soft Blue, Charcoal as documented secondaries; ambient blurred-circle decoration; mix-blend-mode navigation; circular hover-reveal viewport
canonical-canvas: both
selection:
  mood: [editorial, high-contrast]
  tone: [authoritative, serious]
  formality: medium
  density: low
  canonical_canvas: both
  best_for: |
    Use for high-impact, low-copy artifacts that need a authoritative, serious register with editorial, high-contrast visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Bold Editorial

## §1 Canonical canvas

The system alternates between dark Navy hero / footer bands and light White / off-white portfolio bands within a single document. Spec §"Layout overview" calls this out verbatim: "multi-section structure alternating between dark and light backgrounds." Neither polarity dominates — the dark hero is half the page, the light masonry grid the other half. `canonical-canvas: both` follows from that. Dark mode flips the light bands to Navy / Charcoal; the dark bands (hero, featured, footer) already match.

| Surface | Source | Canvas | Notes |
|---|---|---|---|
| Hero | spec §"Hero Section" | Navy `#171e19` with Sage + Soft Blue ambient orbs at 20% | Full viewport. Anton uppercase at 18vw, line two as 1px Sage outline-stroke text |
| Portfolio grid | spec §"Portfolio Grid" | White `#ffffff` | 2-column masonry; even items offset 4rem down; image hover applies Navy 60% overlay + circular VIEW badge |
| Featured asymmetric | spec §"Featured Asymmetric Section" | Navy `#171e19` | Grayscale image with Cyan 20% offset square; Sage Anton label + 7xl heading + Taupe body |
| Capabilities | spec §"Capabilities Section" | Light Gray `#fafafa` | 12-col split; Taupe list with 40px line prefix extending to 64px on hover |
| Testimonial carousel | spec §"Testimonial Carousel" | Charcoal `#302b2f` | Decorative Navy quotation glyph at 30rem 30% opacity; Anton 5xl quote |
| Footer | spec §"Footer" | Navy `#171e19` | 9xl "Let's Create"; Sage email link 4xl with 8px underline offset |
| Navigation | spec §"Navigation" | Transparent overlay (`mix-blend-mode: difference`) | Fixed top bar; logo Anton 2xl tracking-widest; inverts against whichever band it sits on |

## §2 Palette

Every chromatic value is declared verbatim in the source spec's "Description (verbatim)", "Style prose", "Style prompt", or per-section briefs. Hex is the authored form; OKLCH below is converted via vendored culori (`visualize/scripts/vendor/culori.mjs`). No live observation exists — `spec-derived` cites the spec line that authored each value.

### Brand primary

- `--primary`: `oklch(0.226 0.014 154)` (= `#171e19`). Live: spec §"Style prompt" — "Colors: Navy (#171e19)"; spec §"Summary" — "dark navy base (#171e19)". The Navy is the dominant chromatic identity; hero, featured, footer, "Get in Touch" hover all share it.

### Documented secondary brand colours

- `--brand-accent-sage`: `oklch(0.814 0.017 178)` (= `#b7c6c2`). Live: spec §"Style prompt" — "Sage (#b7c6c2)"; deployed as the outline-stroke text on hero line two, the eyebrow label in the featured section, and the 4xl email link in the footer.
- `--brand-accent-cyan`: `oklch(0.946 0.033 208)` (= `#d5f4f9`). Live: spec §"Style prompt" — "Cyan (#d5f4f9)"; deployed as the 20% decorative square offset behind the featured grayscale image.
- `--brand-accent-soft-blue`: `oklch(0.891 0.048 229)` (= `#bbe2f5`). Live: spec §"Style prompt" — "Soft Blue (#bbe2f5)"; deployed as the second ambient orb fill on the hero.
- `--brand-accent-taupe`: `oklch(0.659 0.022 25)` (= `#9f8d8b`). Live: spec §"Style prompt" — "Taupe (#9f8d8b)"; deployed as muted body copy under the hero, capabilities-list labels, italicised accent words in capabilities heading.
- `--brand-accent-beige`: `oklch(0.833 0.033 69)` (= `#d7c5b2`). Live: spec §"Style prompt" — "Beige (#d7c5b2)"; not assigned to a deployed surface in the spec section briefs — held as a documented tertiary for chart slots and surface variation.
- `--brand-accent-charcoal`: `oklch(0.296 0.010 333)` (= `#302b2f`). Live: spec §"Style prompt" — "Charcoal (#302b2f)"; spec §"Testimonial Carousel" — "Background: Charcoal (#302b2f)".

### Canvas + neutrals

- `--background` (`:root`): `oklch(1 0 0)` (= `#ffffff`). Live: spec §"Portfolio Grid" — "Background: White (#ffffff)". The light surface that anchors the alternating layout.
- `--foreground` (`:root`): `oklch(0.226 0.014 154)` (= `#171e19`). Live: spec — Navy serves as the ink against White-canvas sections (portfolio "Selected Works" heading is "Anton, 9xl, Navy").
- `--background` (`[data-theme="dark"]`): `oklch(0.226 0.014 154)` (= `#171e19`). Live: spec §"Hero", §"Featured Asymmetric", §"Footer" — Navy is the canonical dark canvas.
- `--foreground` (`[data-theme="dark"]`): `oklch(1 0 0)` (= `#ffffff`). Live: spec §"Navigation" — "Ensure navigation items are white"; hero text is white on Navy.
- `--muted` (`:root`): `oklch(0.985 0 0)` (= `#fafafa`). Live: spec §"Capabilities Section" — "Background: Light Gray (#fafafa)". A barely-tinted off-white used for the capabilities band on light canvas.
- `--muted-foreground`: `oklch(0.659 0.022 25)` (= `#9f8d8b`). Routed to Taupe per spec §"Hero" — "Small uppercase Taupe text" — Taupe is the deployed muted-ink colour across both polarities.
- `--card`: `oklch(1 0 0)` on light, `oklch(0.296 0.010 333)` on dark. Card on dark routes to Charcoal so cards sit visibly above the Navy canvas (Charcoal is documented as a surface fill in §"Testimonial Carousel").
- `--card-foreground`: tracks `--foreground` per polarity.
- `--popover`, `--popover-foreground`: track `--card` / `--card-foreground` (synthesised — popover is not enumerated in the spec, so popover routes to the documented card surfaces).
- `--accent`: `oklch(0.946 0.033 208)` (Cyan; the decorative-square colour, used as a documented accent surface fill).
- `--accent-foreground`: `oklch(0.226 0.014 154)` (Navy on Cyan; Cyan is light, so the ink stays Navy).
- `--secondary`: `oklch(0.814 0.017 178)` (Sage).
- `--secondary-foreground`: `oklch(0.226 0.014 154)` (Navy on Sage; Sage is light, so the ink stays Navy).
- `--destructive`: `oklch(0.577 0.245 27.3)` (synthesised — the spec does not document a destructive colour; this matches the catalog default red. Marked `(synthesised)`).
- `--destructive-foreground`: `oklch(1 0 0)` (synthesised).
- `--border` (`:root`): `oklch(0.226 0.014 154 / 0.12)` — Navy at 12% alpha, derived from spec §"Navigation" "1px white border" inverted for light surfaces and the spec-wide pattern of hairline 1px dividers. (Synthesised opacity; the spec authors hairlines as "1px borders" without naming a colour for light backgrounds.)
- `--border` (`[data-theme="dark"]`): `oklch(1 0 0 / 0.1)` — White at 10%, from spec §"Footer" — "1px top border (White, 10% opacity)".
- `--input`: tracks `--border` per polarity.
- `--ring`: `oklch(0.226 0.014 154)` (Navy). Tracks `--primary`.

### Polarity-locked surfaces

- `--brand-canvas-night`: `oklch(0.226 0.014 154)` (= `#171e19`). The Navy hero / featured / footer canvas; locked to Navy across both modes.
- `--brand-canvas-charcoal`: `oklch(0.296 0.010 333)` (= `#302b2f`). The Charcoal testimonial canvas; locked across both modes.
- `--brand-canvas-paper`: `oklch(1 0 0)` (= `#ffffff`). The portfolio canvas; locked white across both modes for the photographic-presentation surface.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#ffffff`). The locked light ink for Navy / Charcoal surfaces.
- `--brand-on-light`: `oklch(0.226 0.014 154)` (= `#171e19`). The locked dark ink for paper-canvas surfaces.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(1 0 0 / 0.1)`. Live: spec §"Footer" — "1px top border (White, 10% opacity)". The hairline above footer-bottom legal links.
- `--brand-hairline-strong`: `oklch(1 0 0 / 0.25)`. Synthesised stronger variant for navigation underline / button stroke on dark; spec §"Navigation" describes a "1px white border" without alpha.
- `--brand-hairline-ink`: `oklch(0.226 0.014 154 / 0.18)`. The 1px Navy stroke on light surfaces — the spec describes 1px borders on the "Get in Touch" button (when not in mix-blend territory) and on capability list prefixes; the alpha is synthesised to match the dark-side soft pattern.

### Documented body / utility neutrals

- `--brand-body`: `oklch(0.226 0.014 154)`. Body text on light canvas = Navy.
- `--brand-body-mute`: `oklch(0.659 0.022 25)`. The Taupe muted-body role — spec deploys it as "max-width 320px" under the hero and as the Taupe italics in the capabilities heading.
- `--brand-stroke-sage`: `oklch(0.814 0.017 178)`. The 1px Sage stroke text colour for the hero outline-text treatment.

### Drift vs `tokens.css`

Not applicable. There is no prior `tokens.css` for `bold-editorial`. This DESIGN.md is the authoritative source for the first `tokens.css`.

## §3 Typography

Two families, both Google-served (no proprietary licence; the spec names both as standard Google Fonts catalogue entries).

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (hero) | Anton | 400 (single weight only) | `clamp(5rem, 18vw, 18rem)` | 0.85 | -0.02em (tracking-tighter) |
| Display (section) | Anton | 400 | `clamp(3.5rem, 9vw, 8rem)` | 0.9 | -0.015em |
| Heading | Anton | 400 | `clamp(2rem, 7vw, 4.5rem)` | 1 | -0.005em |
| Eyebrow / label | Anton | 400 | 0.75rem (12px) — 0.875rem (14px) | 1 | 0.18em (tracking-widest), uppercase |
| Body | Plus Jakarta Sans | 400 | 1rem (16px) — 1.125rem (18px) | 1.6 | 0 |
| Body emphasis | Plus Jakarta Sans | 600 | 1rem | 1.6 | 0 |
| Body soft | Plus Jakarta Sans | 300 | 0.875rem (14px) | 1.55 | 0 |
| Caption / footer fineprint | Plus Jakarta Sans | 500 | 0.75rem (12px) | 1.4 | 0.18em (tracking-widest), uppercase |

Notes:
- Anton is a single-weight Google Font (400 only). Every "weight" the spec asks for ("heavy", "tracking-tighter") is achieved at 400 via size + tracking + uppercasing — never via weight axis.
- Plus Jakarta Sans carries 300 / 400 / 600 (spec §"Style prose" — "Plus Jakarta Sans (weights 300, 400, 600)"). Spec doesn't request the variable axis, so the three discrete weights are sufficient.
- Hero scale is viewport-pegged at `18vw` (spec §"Hero Section" — "size 18vw"). The `clamp()` floor at 5rem prevents the display from collapsing below readable on narrow mobile.
- The hero second line is a stroked outline — 1px stroke in Sage, transparent fill — handled at the CSS level (not as a typography variant).
- All eyebrows / labels / footer-bottom legal lines are uppercase + 0.18em tracking. Mixed-case Anton is not used in the spec.

## §4 Component vocabulary

Sourced from spec sections + spec §"Components". Each entry cites the spec passage that authored it.

### Mix-blend fixed nav

**Status:** `current`
**Live source:** spec §"Navigation" — "Fixed top bar, full width, 32px-48px padding. Mix-blend-mode: difference. Logo in Anton font, 2xl, tracking-widest"
**Description:** Position fixed top, full viewport width, vertical padding 32px on mobile / 48px on desktop. Wordmark on the left in Anton 1.5rem (24px) uppercase, 0.18em tracking. Inline link row on the right in Plus Jakarta Sans 0.75rem (12px) uppercase, 0.18em tracking. A "Get in Touch" pill at the far right with a 1px white stroke and transparent fill. The entire bar runs `mix-blend-mode: difference` so links read white over dark bands and invert to black over light bands. No background fill — the difference operator is the chrome.
**States:** `default` (no fill, 1px stroke on CTA pill), `hover-link` (link transitions to 70% opacity), `hover-cta` (pill background flips to white, ink flips to black), `focus-visible` (2px outline at `--ring` offset 3px).

### Hero outline-text display

**Status:** `current`
**Live source:** spec §"Hero Section" — "Central text: Anton font, size 18vw, leading 0.85, uppercase. Second line of text uses '.text-outline' (1px Sage stroke, transparent fill)."
**Description:** Two-line headline composed entirely of Anton uppercase at 18vw with line-height 0.85. Line one is solid white. Line two has `color: transparent`, `-webkit-text-stroke: 1px var(--brand-accent-sage)`. The stroke is the line's only visual presence — the negative space inside the letterforms is the Navy canvas, the orbs visible behind.
**States:** `default` only — no hover / focus on the display block.

### Ambient background orb

**Status:** `current`
**Live source:** spec §"Components 2. Ambient Background Orbs" — "Create 384px (w/h) div elements with 120px Gaussian blur. Set opacity to 20%. Apply a CSS animation 'float' moving translateY from 0 to -20px over 6 seconds with ease-in-out infinite loop."
**Description:** Two `position: absolute` div elements at 384px square each, `filter: blur(120px)`, `opacity: 0.2`. One filled Sage, one filled Soft Blue. Each runs a 6-second `float` keyframe animating `translateY: 0` → `-20px` → `0` on `ease-in-out infinite`. Stacked behind the hero text and behind the featured-section grayscale image. Pointer-events disabled.
**States:** `default` (animating). `prefers-reduced-motion: reduce` halts the keyframe and locks at translateY 0.

### Portfolio masonry card

**Status:** `current`
**Live source:** spec §"Portfolio Grid" — "Grid: 2-column masonry; even-numbered items should have a 4rem (64px) top margin. Project cards: 3:4 or 4:5 aspect ratio images. On hover: Image scales 1.1x and a Navy 60% overlay appears with a white circular 'View' tag in the center."
**Description:** Two-column CSS grid. Every even-index card (`:nth-child(even)`) gets `margin-top: 4rem` to create the staggered masonry. Each card is a `position: relative; overflow: hidden` container at 3:4 or 4:5 aspect ratio. The image fills the card; on parent hover, the image scales to 1.1x over 0.5s `cubic-bezier(0.16, 1, 0.3, 1)`. Card metadata (title + label) sits below the image in Anton heading + Taupe body.
**States:** `default` (image at 1.0x, no overlay), `hover` (image 1.1x + overlay visible). `prefers-reduced-motion: reduce` disables the scale and reveals the overlay on hover without animation.

### Circular VIEW hover-reveal badge

**Status:** `current`
**Live source:** spec §"Components 1. Hover Reveal Viewport" — "Inside a relative container with overflow-hidden, create an absolute inset-0 overlay with background navy/60 and opacity-0. On parent hover, transition opacity to 100. Center a 96px x 96px white circle containing 'VIEW' in Anton font, 14px, tracking-widest."
**Description:** Absolute-positioned overlay filling its parent. Background `oklch(0.226 0.014 154 / 0.6)` (Navy at 60%). Opacity transitions 0 → 1 over 0.5s `cubic-bezier(0.16, 1, 0.3, 1)`. A 96px circle (`border-radius: 999px`, `background: white`) sits centred inside; inside the circle, "VIEW" in Anton 14px, 0.18em tracking.
**States:** `default` (overlay hidden), `hover` (overlay visible).

### Featured asymmetric pair

**Status:** `current`
**Live source:** spec §"Featured Asymmetric Section" — "Left: Grayscale image with a Cyan decorative background square (#d5f4f9, 20% opacity) offset by -48px. Right: Sage colored 'Anton' label, followed by a 7xl heading and Taupe body text. Include an arrow icon link that shifts +8px right on hover."
**Description:** Two-column grid. Left column contains a grayscale image (`filter: grayscale(1)`) with a Cyan square (filled `oklch(0.946 0.033 208 / 0.2)`) positioned at `top: -48px; left: -48px` behind the image, creating the offset-shadow composition. Right column holds an Anton Sage eyebrow at 0.875rem 0.18em tracking, a 7xl Anton heading in white, Plus Jakarta Sans body in Taupe, and an "→" link that translates `+8px` on hover over 0.3s.
**States:** `default`, `hover-link` (arrow translates +8px).

### Capabilities list row

**Status:** `current`
**Live source:** spec §"Capabilities Section" — "Columns 1-4: 'Capabilities' label in Taupe, followed by a list where items have a 40px horizontal line prefix that extends to 64px on hover."
**Description:** List rows on a 12-column grid (the list itself sits in columns 1-4). Each row is a flex line: a 40px hairline (1px tall, Navy ink) followed by a 12px gap, followed by the capability label in Anton 0.875rem uppercase 0.18em tracking. On row hover, the hairline extends to 64px over 0.3s. Beside the list, columns 5-12 carry a 6xl Plus Jakarta Sans 300-weight heading with italicised Taupe-coloured accent words inline.
**States:** `default` (hairline 40px), `hover` (hairline 64px, label colour shifts from Taupe to Navy).

### Capability-band heading with italic accents

**Status:** `current`
**Live source:** spec §"Capabilities Section" — "Columns 5-12: Large 6xl light-weight heading with italicized accent words in Taupe."
**Description:** Plus Jakarta Sans 300 at 6xl (clamp 2.25rem → 4rem). Body text in `--foreground`; specific words wrapped in `<em>` styled with `font-style: italic` + `color: var(--brand-accent-taupe)`. No underline, no decoration.
**States:** `default` only.

### Testimonial quote card

**Status:** `current`
**Live source:** spec §"Testimonial Carousel" — "Features a decorative quotation mark in the background (Navy, 30rem size, 30% opacity). Main quote: Anton font, 5xl, uppercase. Bio section: 64px colored circular avatar and Anton-style name title."
**Description:** Charcoal canvas. A `::before` decorative `"` glyph at 30rem in Navy `/ 0.3` sits behind the quote (`position: absolute; top: -3rem; left: -2rem; line-height: 0.7`). The quote itself is Anton 5xl uppercase in white, max-width 22ch for line wrapping. Below it, a 64px circular avatar (filled Sage / Beige / Soft Blue in rotation across the carousel) sits beside an Anton 1.25rem name title with a Taupe Plus Jakarta Sans role line under it.
**States:** `default`, `prev` / `next` (slide transitions handled by the carousel container).

### "Get in Touch" stroke pill

**Status:** `current`
**Live source:** spec §"Navigation" — "'Get in Touch' button with 1px white border, transitioning to white background on hover"
**Description:** Inline-flex pill with `border-radius: 999px`. 1px stroke in `--brand-on-dark`. Padding `0.5rem 1.25rem`. Anton 0.875rem uppercase 0.14em tracking inside. Min-height 44px to clear the WCAG touch-target floor.
**States:** `default` (transparent fill, white stroke + ink), `hover` (white fill, Navy ink, same stroke), `focus-visible` (2px outline at `--ring` offset 3px). Transition 0.5s `cubic-bezier(0.16, 1, 0.3, 1)`.

### Inline arrow-shift link

**Status:** `current`
**Live source:** spec §"Featured Asymmetric Section" — "arrow icon link that shifts +8px right on hover."
**Description:** Anchor with an inline `→` glyph in a `::after` pseudo-element. On hover, the `::after` translates `+8px` on the X axis over 0.3s `cubic-bezier(0.16, 1, 0.3, 1)`. Link text in Anton 0.875rem uppercase, tracking-widest.
**States:** `default`, `hover` (arrow shifts), `focus-visible` (underline appears beneath the text).

### Bouncing circle arrow

**Status:** `current`
**Live source:** spec §"Hero Section" — "bouncing arrow icon in a circular border on the right."
**Description:** 56px circle with 1px stroke in `--brand-on-dark`. Inside, a down-arrow glyph ("↓") in Anton 1.25rem. The circle runs an infinite `bounce` keyframe animating translateY 0 → +8px → 0 over 2s `ease-in-out`. Sits at the bottom-right of the hero, signalling scroll affordance.
**States:** `default` (bouncing). `prefers-reduced-motion: reduce` halts the keyframe.

### Section heading "Selected Works" type

**Status:** `current`
**Live source:** spec §"Portfolio Grid" — "Heading: 'Selected Works' in Anton, 9xl, Navy."
**Description:** Anton at 9xl (clamp 4rem → 8rem). Single line, uppercase, tracking-tighter (-0.02em). Sits at top-left of the white portfolio band with 4rem-6rem margin above it.
**States:** `default` only.

### Footer headline + email link

**Status:** `current`
**Live source:** spec §"Footer" — "Massive 'Let's Create' heading in Anton (9xl). Email link in Sage, size 4xl, underlined with 8px offset."
**Description:** Anton 9xl uppercase heading occupies the top of the Navy footer band. Below it, a single Sage email link in Plus Jakarta Sans 4xl (clamp 1.875rem → 2.5rem), underlined via `text-decoration: underline` + `text-underline-offset: 8px`.
**States:** `default`, `hover` (link shifts to white).

### Footer-bottom legal row

**Status:** `current`
**Live source:** spec §"Footer" — "Footer bottom: 1px top border (White, 10% opacity), copyright on left, legal links on right, all in 12px uppercase tracking-widest typography."
**Description:** Flex row separated from the headline by a `border-top: 1px solid oklch(1 0 0 / 0.1)`. Plus Jakarta Sans 500 at 12px, uppercase, 0.18em tracking. Copyright at flex-start; legal-link cluster at flex-end with 1.5rem gaps.
**States:** `default`, `hover-link` (link opacity goes from 70% to 100%).

### Crosshair cursor

**Status:** `current` (decorative, register-defining)
**Live source:** spec §"Style prompt" — "crosshair cursor style"
**Description:** `cursor: crosshair` applied to the document body. Interactive elements (links, buttons) override to `cursor: pointer` for accessibility — the crosshair is decorative chrome, not a wayfinding signal.
**States:** N/A (cursor state, not component state).

### Scroll-reveal block

**Status:** `current`
**Live source:** spec §"Style prompt" — "scroll reveals with transform: translateY(10px) and opacity transition over 1000ms"; spec §"Description" — "smooth scroll-triggered reveal animations"
**Description:** Block-level elements start at `transform: translateY(10px); opacity: 0`. When the intersection observer fires (or when CSS scroll-driven animation triggers), the block transitions to `translateY(0); opacity: 1` over 1000ms `cubic-bezier(0.16, 1, 0.3, 1)`. Stagger between sibling blocks via 100ms delay increments.
**States:** `pre-reveal` (translated + transparent), `revealed` (settled). `prefers-reduced-motion: reduce` shows blocks at `revealed` state from the start.

### Decorative offset accent square

**Status:** `current`
**Live source:** spec §"Featured Asymmetric Section" — "Cyan decorative background square (#d5f4f9, 20% opacity) offset by -48px"
**Description:** Absolutely-positioned div filled with `oklch(0.946 0.033 208 / 0.2)`. Sized to match its sibling image. Positioned `top: -48px; left: -48px` to peek out from behind. Pointer-events disabled.
**States:** `default` only.

### Grayscale-to-color image

**Status:** `current`
**Live source:** spec §"Description" — "subtle micro-interactions like mix-blend-mode navigation and grayscale-to-color image transitions."
**Description:** `<img>` with `filter: grayscale(1)` by default. On parent hover, the filter transitions to `grayscale(0)` over 0.5s `cubic-bezier(0.16, 1, 0.3, 1)`. Used in the featured asymmetric section and as an optional treatment on portfolio cards.
**States:** `default` (grayscale), `hover` (full colour).

### Capability label heading

**Status:** `current`
**Live source:** spec §"Capabilities Section" — "'Capabilities' label in Taupe"
**Description:** Anton uppercase at 0.75rem, 0.18em tracking, colour Taupe. Sits as the small label above the capabilities list.
**States:** `default` only.

### Eyebrow tag (Sage on Navy)

**Status:** `current`
**Live source:** spec §"Featured Asymmetric Section" — "Sage colored 'Anton' label"
**Description:** Inline Anton 0.875rem uppercase 0.18em tracking, colour Sage. The eyebrow that introduces the featured asymmetric heading on Navy canvas. Reused across any Navy band that wants a tag-line above the headline.
**States:** `default` only.

### Avatar disc (testimonial)

**Status:** `current`
**Live source:** spec §"Testimonial Carousel" — "64px colored circular avatar"
**Description:** 64px circle filled with one of the documented accent fills (Sage, Beige, Soft Blue, Taupe). Holds two-letter Anton initials in `--brand-canvas-night` ink.
**States:** `default`.

## §5 Surface inventory

The spec enumerates seven sections; no live URL or imagery exists. Each section contributes a discrete component subset:

- spec §"Navigation" — mix-blend nav, Get in Touch stroke pill, brand wordmark in Anton
- spec §"Hero Section" — outline-text display, ambient orbs, bouncing circle arrow, Taupe muted-body
- spec §"Portfolio Grid" — masonry card, hover-reveal VIEW badge, section heading type
- spec §"Featured Asymmetric Section" — asymmetric pair, decorative offset square, grayscale image, Sage eyebrow, arrow-shift link
- spec §"Capabilities Section" — capability label, capabilities list row, capability-band heading with italic accents
- spec §"Testimonial Carousel" — testimonial quote card, decorative quote-glyph background, avatar disc
- spec §"Footer" — footer headline + email link, footer-bottom legal row

## §6 Notes

- **Distinct from the existing `editorial` system.** `editorial` is a serif-display + warm-cream + deep-navy long-form-reading register, optimised for prose. `bold-editorial` is a sans-display brutalist + Navy / Sage portfolio register, optimised for photographic-presentation. The two share an editorial register name but ship different vocabularies — different display family (serif vs Anton sans), different palette anchor (warm cream vs cool navy), different signature surfaces (long-form reading vs masonry image grid + outline-stroke display type). Document both in the catalog because the register-family is large enough to carry two divergent voices.

- **Polarity-locked surfaces.** The Navy hero / featured / footer canvas, the Charcoal testimonial canvas, and the White portfolio canvas all stay polarity-locked across `:root` and `[data-theme="dark"]`. The alternation between them is the spec's defining structural pattern — the dark mode flips the *light* surface (capabilities band, portfolio band background, white card fills) to Navy / Charcoal, but keeps the dark surfaces as Navy. Specifically: `--brand-canvas-night`, `--brand-canvas-charcoal`, `--brand-canvas-paper`, `--brand-on-dark`, `--brand-on-light` do NOT lift in `[data-theme="dark"]`.

- **Mix-blend-mode caveat.** The fixed nav uses `mix-blend-mode: difference` to invert against the band it sits over. This breaks down on busy hero imagery or on low-contrast backgrounds. The spec assumes solid-coloured bands; if a future content surface ships textured / photographic top bands, the nav needs a fallback (solid backdrop appearing on scroll, or a polarity-locked white nav above 16px scroll).

- **Anton at 18vw mobile.** The hero display at `18vw` works on desktop but produces an ~70px display at 390px (iPhone 13). That's still readable, but tight. The clamp() lower bound at 5rem (80px) protects against narrower devices.

- **Brand-X-lift content to avoid when authoring previews.** The source spec is portfolio-shaped — it implicitly imagines architecture / agency / design-studio client names. Do not lift any client names, project titles, or portfolio captions from real architecture firms or design agencies into the preview. The Halcyon-team content rule applies — Halcyon's team using the bold-editorial register, neutral SaaS work, no real client names, no architecture-portfolio body copy. The signature mockup is the portfolio grid with the VIEW hover, not a clone of any real agency's case-study page.

- **`prefers-reduced-motion`.** The system carries four motion surfaces — ambient orbs, scroll reveals, bouncing arrow, image hover scale. All four must honour `prefers-reduced-motion: reduce`. The crosshair cursor is not a motion surface but is decorative-only; pointer affordances on links and buttons override.

- **Single-character glyphs as decoration.** The 30rem testimonial quote-mark glyph, the down-arrow in the hero circle, the inline `→` on the arrow-shift link, and the bullet glyphs in the folio decoration are all single-character pseudo-elements. axe will return `needs-review` on contrast for these; they're decorative and the warnings are acceptable per `AUTHORING.md` §"Detect-clean checklist".

- **Anton single-weight gotcha.** Anton ships at 400 only. Any code or copy that asks for "Anton Bold" or "Anton Black" is a misread — the perceived weight comes from uppercasing + tracking + size, not from a weight axis. Don't add `font-weight: 900` to Anton declarations.

## §Known gaps

- **No reference imagery.** The dispatcher provided no screenshots, photographs, or rendered examples. Every chromatic and layout decision derives from the spec's per-section prose; nothing is sampled from a live render. If imagery surfaces later — a portfolio piece from the original author, a Superdesign Library render — re-derive the palette positions and component proportions against the actual visual evidence.
- **Carousel mechanic unspecified.** The spec names the section "Testimonial Carousel" but doesn't describe transition direction, autoplay, pagination dots, or progress markers. The current §4 entry covers only the static card; transition / control vocabulary is held for a future spec revision.
- **Mobile breakpoints unspecified.** The spec describes desktop proportions throughout. Mobile downscaling — when the 18vw display stops being readable, when the 2-column masonry collapses to 1-column, when the asymmetric featured pair stacks — is held as implementation-derived. Conventional choices (1024px / 768px / 480px) apply.
- **No documented dark-mode portfolio band.** The portfolio canvas is polarity-locked to White in this iteration. If a future spec adds a dark-mode portfolio variant (Charcoal canvas with the masonry grid retained), the `--brand-canvas-paper` lock loosens accordingly. Held as a future-spec gap.
- **Destructive colour synthesised.** The spec does not document a destructive / error colour. The `--destructive` slot is held at the catalog default red `oklch(0.577 0.245 27.3)`; if a future spec adds a destructive vocabulary, replace with the documented value.
