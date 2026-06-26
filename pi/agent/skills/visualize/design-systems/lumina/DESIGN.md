---
slug: lumina
name: Lumina
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/lumina/raw.md (Lumina SaaS Landing Page; Shirley Lou; superdesign.dev/library/lumina-saas-landing-page)
  - principles: Neo-Brutalist commercial-SaaS register — yellow #ffe17c as the dominant canvas (not an accent), 2px solid black borders on every interactive element, zero-blur hard offset shadows stepped 4 / 8 / 12 px, the signature "depress" interaction (translate(4px, 4px) on hover plus shadow shrink from 8 px to 4 px), Cabinet Grotesk + Satoshi via Fontshare
canonical-canvas: light
selection:
  mood: [organic]
  tone: [calm, warm]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a calm, warm register with organic visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Lumina

## §1 Canonical canvas

Lumina is light-canonical. The dominant surface is a saturated yellow (`#ffe17c`) that operates as a canvas, not an accent — the navigation, hero, feature grid, and final CTA all sit on it. Charcoal (`#171e19`) appears as a deliberate inversion band in the social-proof marquee and the "How it works" section, both of which read as high-contrast punctuation rather than a co-equal dark canvas. White acts as the neutral surface between yellow bands (problem-vs-solution, feature cards, testimonial card faces). The yellow canvas typically carries a 32 × 32 px radial dot pattern at 10% opacity.

| Surface | Canvas | Notes |
|---|---|---|
| Navigation | `#ffe17c` yellow | Fixed header, `h-20`, `border-b-2 border-black`. Spec §Section 1. |
| Hero | `#ffe17c` yellow + dot pattern | Two-column with browser mockup right. Spec §Section 2. |
| Social proof marquee | `#171e19` charcoal | Sage `#b7c6c2` wordmarks at 50% opacity. Spec §Section 3. |
| Problem vs solution | `#ffffff` white | Cards in `#f4f4f5` (dashed) and `#ffe17c` (solid + shadow). Spec §Section 4. |
| Feature grid | `#ffe17c` yellow, `border-y-2 border-black` | 3-column white cards. Spec §Section 5. |
| How it works | `#171e19` charcoal | Step circles with sage / yellow / white glow rims. Spec §Section 6. |
| Use case personas | `#ffffff` white | Bento grid: sage, yellow, dark gray cards. Spec §Section 7. |
| Testimonials | `#b7c6c2` sage | White cards with asymmetric corner rounding. Spec §Section 8. |
| Final CTA + footer | `#ffe17c` then `#171e19` | Yellow CTA, charcoal footer. Spec §Section 9. |

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and citation against the source spec.

### Brand primary

- `--primary`: `oklch(0.9142 0.1253 93.23)` (= `#ffe17c`). Live: spec §Description + §Summary + §Style prompt — declared as "primary background" and used as the dominant canvas on Navigation, Hero, Feature Grid, and Final CTA.

### Documented secondary brand colours

- `--brand-accent-sage`: `oklch(0.8139 0.0173 178.16)` (= `#b7c6c2`). Live: spec §Style prose — "balanced by #171e19 charcoal and #b7c6c2 sage." Used as marquee text colour, "How it works" step glow, persona card 1, testimonials canvas.
- `--brand-accent-amber`: `oklch(0.8358 0.1616 80.52)` (= `#ffbc2e`). Live: spec §Section 8 (Testimonials) — "Includes a 5-star rating in #ffbc2e yellow." See §Known gaps — this is the secondary-accent-on-branded-sections exception called out in spec §Notes (technical risks).

### Canvas + neutrals

- `--background`: `oklch(0.9142 0.1253 93.23)` (= `#ffe17c`). Live: spec §Canonical canvas — yellow operates as canvas, not accent.
- `--foreground`: `oklch(0 0 0)` (= `#000000`). Live: spec §Style prompt — "Text #000000 (Black)."
- `--card`: `oklch(1 0 0)` (= `#ffffff`). Live: spec §Style prompt — "UI #ffffff (White)" and recurring white card surface across §Sections 2, 5, 7, 8.
- `--card-foreground`: `oklch(0 0 0)` (= `#000000`). Live: spec implicit — black text on white cards across all sections.
- `--popover`: `oklch(1 0 0)` (= `#ffffff`). Synthesised (carries `--card` value — Lumina spec doesn't enumerate a distinct popover surface).
- `--popover-foreground`: `oklch(0 0 0)` (= `#000000`). Synthesised (mirrors `--card-foreground`).
- `--muted`: `oklch(0.9674 0.0013 286.37)` (= `#f4f4f5`). Live: spec §Section 4 (Problem vs Solution) — "Card A (Problem): #f4f4f5, 2px dashed gray border."
- `--muted-foreground`: `oklch(0.2727 0 0)` (= `#272727`). Live: spec §Section 7 (Use case personas) — "Card 3: Dark Gray (#272727) with white text" — and §Section 6 (How it works) — connector line at `#272727`. Reused as the muted ink token.
- `--accent`: `oklch(0.8139 0.0173 178.16)` (= `#b7c6c2`). Live: spec §Style prose — sage as the documented accent colour.
- `--accent-foreground`: `oklch(0 0 0)` (= `#000000`). Synthesised (spec doesn't show sage carrying text directly; default to black per spec §Style prompt's text rule).
- `--secondary`: `oklch(1 0 0)` (= `#ffffff`). Synthesised (carries `--card` value — Lumina ships a single white-card neutral, used as both card and secondary fill).
- `--secondary-foreground`: `oklch(0 0 0)` (= `#000000`). Synthesised.
- `--destructive`: `oklch(0.6936 0.1964 26.36)` (= `#ff5f57`). Live: spec §Components 2 (Browser Mockup Dashboard) — "three small colored circles (Red #ff5f57, Yellow #febc2e, Green #28c840)." Borrowed from the spec's Mac-window-chrome triplet (see §Known gaps).
- `--destructive-foreground`: `oklch(1 0 0)` (= `#ffffff`). Synthesised.
- `--border`: `oklch(0 0 0)` (= `#000000`). Live: spec §Style prose — "2px solid black borders" recurs on every card, button, badge, section divider.
- `--input`: `oklch(0 0 0)` (= `#000000`). Synthesised (Lumina's borders are uniformly 2 px black; input borders inherit the same value).
- `--ring`: `oklch(0.9142 0.1253 93.23)` (= `#ffe17c`). Tracks `--primary`.

### Polarity-locked surfaces

Tokens that stay fixed across `:root` and `[data-theme="dark"]` because the surface they describe doesn't flip with theme:

- `--brand-canvas-night`: `oklch(0.2261 0.0141 154.08)` (= `#171e19`). Live: spec §Section 3 (Social Proof Marquee) + §Section 6 (How it works) + §Section 9 (Footer) — the always-charcoal punctuation surface.
- `--brand-canvas-yellow`: `oklch(0.9142 0.1253 93.23)` (= `#ffe17c`). Live: spec §Canonical canvas. The signature canvas stays locked across modes (canvas-yellow is the brand identity surface; flipping it would erase Lumina).
- `--brand-on-dark`: `oklch(1 0 0)` (= `#ffffff`). Live: spec §Section 7 (Use case personas) — "Dark Gray (#272727) with white text"; and §Section 9 (Footer) implicit on charcoal.
- `--brand-on-light`: `oklch(0 0 0)` (= `#000000`). Live: spec §Style prompt — "Text #000000."

### Hairlines / dividers

Lumina doesn't use hairlines in the conventional 1px-soft-tint sense — every divider is a 2 px solid black border. The "hairline" role is replaced by the brand border weight:

- `--brand-border-weight`: `2px`. Live: spec §Special Notes — "MUST: Maintain a strict 2px border-width on all interactive elements."

### Shadow ladder (signature)

Lumina ships a documented three-step hard-shadow ladder. Every shadow is zero-blur, offset-only, black-on-yellow.

- `--brand-shadow-sm`: `4px 4px 0 0 #000000`. Live: spec §Style prompt — "box-shadow: 4px 4px 0px 0px #000000 for standard elements."
- `--brand-shadow-lg`: `8px 8px 0 0 #000000`. Live: spec §Style prompt — "8px 8px 0px 0px #000000 for large containers."
- `--brand-shadow-xl`: `12px 12px 0 0 #000000`. Live: spec §Section 2 (Hero) — "Browser mockup (White, 2px border, 12px hard shadow)."
- `--brand-shadow-pressed`: `4px 4px 0 0 #000000`. Live: spec §Components 1 (Neo-Brutalist Push Button) — depressed hover state target.

### Radii

Lumina ships geometric corners — small radii on buttons and cards, no rounded shapes larger than 12 px on buttons (spec §Special Notes). The exception is decorative card containers in §Section 4 + §Section 8.

- `--radius-sm`: `4px`.
- `--radius-md`: `8px`.
- `--radius-lg`: `12px`. Live: spec §Components 1 — "border-radius: 0.75rem."
- `--radius-xl`: `16px`. Synthesised (used for ornamental cards in §Section 4 — "Two large 3xl-rounded cards" maps to a larger radius family at the card scale).

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Cabinet Grotesk | 800 (Extrabold) | 6–8xl (~`clamp(2.75rem, 5vw + 1rem, 5.5rem)`) | 1.0 | tighter (-0.02em) |
| Heading | Cabinet Grotesk | 700 | 2xl (~1.5rem) – 4xl (~2.25rem) | 1.1 | -0.01em |
| Title | Cabinet Grotesk | 600 | 1.25rem | 1.2 | -0.005em |
| Body | Satoshi | 500 (Medium) | 1rem | 1.6 | 0 |
| Caption | Satoshi | 500–600 | 0.8125rem – 0.875rem | 1.4 | 0.01em |
| Mono | system mono (none declared) | 500 | 0.875rem | 1.4 | 0 |

Source declarations:

- Cabinet Grotesk weights 400–800 + Satoshi weight 500 — spec §Style prose + §Style prompt.
- 8xl display headings with one keyword in `-webkit-text-stroke: 2px black; color: transparent` — spec §Section 2 (Hero). The outlined-keyword treatment is signature.
- Both families are hosted on Fontshare (`fonts.cdnfonts.com` / `api.fontshare.com`), not Google Fonts — spec §Notes (technical risks).

The `tracking-tighter` declaration on display headings (spec §Style prompt) is the typographic move that complements the geometric hard shadows; loose tracking would soften the impact.

## §4 Component vocabulary

Eight distinct components are observed across the spec. The "depress" interaction (translate + shadow shrink on hover) is the brand's defining micro-interaction and recurs across every interactive surface.

### Neo-Brutalist push button

**Status:** `current`
**Live source:** spec §Components 1 — "A high-contrast button that visually 'depresses' when hovered or clicked."
**Description:** Black fill (`#000`), white text, `2px solid black` border, `border-radius: 0.75rem`. Resting shadow `8px 8px 0 0 #000`. Transition `0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)` — the cubic-bezier carries a slight overshoot, reinforcing the physical-key-press metaphor.
**States:**
- `default`: shadow `8px 8px 0 0 #000`
- `hover` / `:active`: `transform: translate(4px, 4px)`; shadow shrinks to `4px 4px 0 0 #000` (visually "fills" the shadow space)
- `:focus-visible`: dashed yellow outline or 2 px ring offset by 2 px (spec doesn't enumerate; derived from the brand's geometric vocabulary)
- `disabled`: not enumerated in spec

### Secondary push button

**Status:** `current`
**Live source:** spec §Section 2 (Hero) — "secondary white button with 4px hard shadow."
**Description:** White fill, black text, `2px solid black` border, `border-radius: 0.75rem`. Resting shadow `4px 4px 0 0 #000` (lighter than primary).
**States:** Same depress interaction as primary button — on hover the shadow shrinks toward zero and the button translates into it.

### Pill badge

**Status:** `current`
**Live source:** spec §Section 2 (Hero) — "Badge 'NEW: AI Content Assistant 2.0' (White, pill-shaped, 2px border)."
**Description:** White fill, black text, `2px solid black` border, fully rounded (`border-radius: 999px`). No shadow. Used for inline announcements above hero headings and as persona-card type indicators (§Section 7).
**States:** default only.

### Bento card (with hard shadow)

**Status:** `current`
**Live source:** spec §Section 7 (Use case personas) — "Card 2: Yellow (#ffe17c) with 8px hard shadow." + spec §Section 5 (Feature Grid) — "Each card: 2px border, 4px hard shadow."
**Description:** White / yellow / sage / dark-gray fill (depending on persona), `2px solid black` border, `border-radius: 12px`. Hard shadow varies by emphasis: 4 px standard, 8 px hero. Cards in §Section 5 carry a 16 × 16 icon box at the top that flips fill on hover (sage → yellow).
**States:**
- `default`: shadow `4px 4px 0 0 #000` or `8px 8px 0 0 #000`
- `hover`: depress (translate + shadow shrink)

### Asymmetric-corner card

**Status:** `current`
**Live source:** spec §Section 8 (Testimonials) — "Cards have asymmetric corner rounding (Top-Right and Bottom-Left are 3xl, Top-Left and Bottom-Right are 2px)."
**Description:** White fill, `2px solid black` border. Corner radii are asymmetric: TR + BL at `1.5rem`, TL + BR at `2px`. The "leaf-shape" is signature for branded sections (testimonials, optional personas).

### Browser mockup container

**Status:** `current`
**Live source:** spec §Components 2 — "A stylized application UI container for marketing visuals."
**Description:** White background, `2px solid black` border, `border-radius: 1rem`, shadow `12px 12px 0 0 #000`. Header bar: black fill, three small chrome circles (red `#ff5f57`, yellow `#febc2e`, green `#28c840`) — see §Known gaps. Content area mixes sage and charcoal internal cards.

### Marquee bar

**Status:** `current`
**Live source:** spec §Section 3 (Social Proof Marquee).
**Description:** Full-width band on charcoal canvas, `border-b-2 border-black`. Wordmarks in Cabinet Grotesk at sage colour, 50% opacity, infinite horizontal scroll at slow linear pace. `prefers-reduced-motion` must pause the animation.

### Step-circle with glow rim

**Status:** `current`
**Live source:** spec §Section 6 (How it works) — "Steps are marked by large 24x24 circles with 4px colored 'glow' borders (Sage, Yellow, White)."
**Description:** 96 × 96 px (24-unit) charcoal circles with a 4 px outer ring in sage / yellow / white. Connected by a `#272727` horizontal line. The "glow" reads as a solid coloured stroke, not a CSS `box-shadow` blur — it's still in the zero-blur Lumina vocabulary.

## §5 Surface inventory

This is a spec-derived system; the surfaces are sections enumerated in the source spec rather than URLs sampled from a live site.

- spec §Section 1 (Navigation) — fixed yellow header pattern with logo + horizontal links + CTA right.
- spec §Section 2 (Hero) — defines the two-column layout, 8xl display heading with outlined keyword, primary+secondary CTA pair, browser-mockup right column.
- spec §Section 3 (Social Proof Marquee) — anchors the charcoal-band-as-punctuation pattern and the sage-at-50%-opacity wordmark treatment.
- spec §Section 4 (Problem vs Solution) — anchors the side-by-side card composition and the dashed-border vs solid-shadowed-border contrast.
- spec §Section 5 (Feature Grid) — anchors the 3-column white-card-on-yellow grid + hover-fill-flip icon boxes.
- spec §Section 6 (How it works) — anchors the dark-mode-as-section-transition pattern and the step-circle glow-ring component.
- spec §Section 7 (Use case personas) — anchors the bento-grid composition (sage / yellow / dark gray) and the type-indicator pill placement.
- spec §Section 8 (Testimonials) — anchors the asymmetric-corner card and the amber star-rating accent.
- spec §Section 9 (Final CTA + Footer) — anchors the yellow→charcoal vertical handoff at the bottom of the flow.

## §6 Notes

Brand-specific patterns worth flagging for future authors:

- **Yellow is canvas, not accent.** The single most common misread of Neo-Brutalist palettes is to treat the saturated colour as a CTA fill. Lumina inverts this — yellow `#ffe17c` covers ~60% of the page surface area, and the primary CTA is **black** on yellow. Don't recolour the primary CTA back to yellow on white "for contrast"; the black-on-yellow CTA is correct.
- **Borders are uniformly 2 px black.** Spec §Special Notes is explicit: every interactive element. Don't introduce 1 px hairlines for tables or list separators — the brand's divider is the same 2 px black.
- **Shadows are zero-blur and black-on-yellow only.** Don't introduce blurred shadows for elevation hierarchy. The depth signal is the offset distance (4 / 8 / 12 px), not the blur.
- **The "depress" interaction is the brand's voltage moment.** Every button and shadowed card should translate(4px, 4px) and shrink its shadow on hover. Cubic-bezier `(0.175, 0.885, 0.32, 1.275)` with `0.2s` duration carries a slight overshoot — preserve it. Wrap a `@media (prefers-reduced-motion: reduce)` override that disables the transform.
- **Cabinet Grotesk + Satoshi are Fontshare-hosted.** Fontshare is the only legitimate origin for Cabinet Grotesk; Google Fonts doesn't ship it. The font loader must declare Fontshare, not Google. Self-host as a fallback for offline previews.
- **The outlined-keyword treatment is webkit-prefixed.** `-webkit-text-stroke: 2px black; color: transparent` works in Webkit + Gecko, but parsers may flag it. Single line per hero, not a layout-wide pattern.
- **Dark mode is a section transition, not a canvas flip.** §Sections 3, 6, and 9 establish the charcoal-band-as-punctuation rhythm. A "dark mode" for Lumina is the same yellow page with the charcoal sections promoted — not an inverted yellow-on-charcoal canvas. The dark variant should keep `--brand-canvas-yellow` polarity-locked and flip only the document-level surfaces.

## §Known gaps

**Palette-cap inconsistency (spec internal contradiction).** Spec §Special Notes declares: "MUST: Use only hex values #ffe17c, #171e19, and #b7c6c2 for branded sections." The spec itself violates the three-colour cap in two documented places:

1. **Amber `#ffbc2e`** — appears in §Section 8 (Testimonials) as the 5-star rating colour.
2. **Mac-window-chrome triplet `#ff5f57` / `#febc2e` / `#28c840`** — appears in §Components 2 (Browser Mockup Dashboard) as the three small UI circles.

The spec §Notes (technical risks) explicitly calls out this exception: "the strict 'MUST: Use only…' is a guideline for branded sections only — the spec itself smuggles in #ffbc2e (5-star rating) and Mac-window-chrome colours (#ff5f57, #febc2e, #28c840) in the browser mockup."

**Resolution applied here.** This system preserves the three-colour brand cap on **canvas + chrome surfaces** (yellow / charcoal / sage are the only brand-identity tokens), and admits the secondary accents as a **branded-sections-only exception** documented in §2 above:

- `--brand-accent-amber` (`#ffbc2e`) is exposed for star-rating + status-warning use, with the canonical citation pointing at §Section 8.
- `--destructive` (`#ff5f57`), the Mac-chrome amber (re-used through `--brand-accent-amber`), and the Mac-chrome green are admitted only inside the browser-mockup component context.

The strict three-colour cap remains the **authoring default** — when in doubt, work in yellow / charcoal / sage + white / black neutrals. The secondary accents are exceptions, not equal members of the palette.

**Reference imagery.** No reference imagery was provided alongside the spec; all observations derive from the spec prose itself. A future authoring pass with photographic / screenshot references (e.g., a rendered superdesign.dev preview) could validate proportions on the feature-grid icon hover-flip and the asymmetric-corner card geometry — both of which are described prosaically here.

**Live brand site.** This is a documented design publication, not a deployed product surface. There is no live Lumina-branded site to drift-check against; the spec is the authoritative source.
