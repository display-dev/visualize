---
slug: modern-bold
name: Modern Bold
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/modern-bold/raw.md
  - principles: "Bold Typography Design System — typography-as-visual-language, restrained palette (background / foreground / vermillion accent), strict zero-radius / zero-shadow rule, dark-canonical, three-stack family (Inter Tight for UI + headlines, Playfair Display for pull quotes only, JetBrains Mono for labels and stats), poster-design-translated-to-web register."
canonical-canvas: dark
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Modern Bold

## §1 Canonical canvas

The system is single-polarity dark. The spec ships one token table — dark mode only — and the entire visual logic depends on a near-black canvas behind massive vermillion display type. Inverting to light is not described and would invert the contrast logic that makes the system read as "poster on a wall" rather than "marketing page."

| Surface | Source | Canvas | Role |
|---|---|---|---|
| Page canvas | raw.md "Colors (Dark Mode)" | `#0A0A0A` near-black with subtle 1.5% noise grain overlay | Frame around typography. White space is "the frame around your type," black space carries the same role on dark. |
| Card / panel | raw.md "card: #0F0F0F" | `#0F0F0F` slight lift off canvas | Sparingly used. Hairline border + transparent fill is the more common pattern. |
| Muted surface | raw.md "muted: #1A1A1A" | `#1A1A1A` | Section alternation, input fills, decorative blocks behind layered type. |
| Inverted CTA section | raw.md "Final CTA inverted section" | Foreground white as canvas, accent for focus borders | Single section near the page bottom; flips polarity for emphasis, then closes back to canvas in the footer. |

Marquee surfaces are **not** light bands inside a dark page — they are inverted-canvas sections (white bg, dark ink, accent borders) that act as punctuation before the footer.

## §2 Palette

Hex values are quoted from the spec. OKLCH conversions computed via vendored culori (`visualize/scripts/vendor/culori.mjs`). Citations point at the spec section since the system has no live deployment to sample.

### Brand primary (accent)

- `--primary` (Vermillion): `oklch(0.6535 0.2348 34.04)` (= `#FF3D00`). Live: spec §"Colors (Dark Mode)" — `accent: #FF3D00 // Vermillion—warm, urgent, visible`. Used on headline emphasis, primary CTA text, focus rings, accent bars, animated underlines. Not used as a fill except on featured-pricing badge.

### Canvas + neutrals

- `--background`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Live: spec — `background: #0A0A0A // Near-black, not pure black`.
- `--foreground`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Live: spec — `foreground: #FAFAFA // Warm white`.
- `--card`: `oklch(0.1684 0 0)` (= `#0F0F0F`). Live: spec — `card: #0F0F0F // Slight elevation from bg`.
- `--card-foreground`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Live: spec — `cardForeground: #FAFAFA`.
- `--popover`: `oklch(0.1684 0 0)` (= `#0F0F0F`). (synthesised — spec doesn't enumerate a popover slot; defaulted to card.)
- `--popover-foreground`: `oklch(0.9851 0 0)` (= `#FAFAFA`). (synthesised — mirrors card-foreground.)
- `--muted`: `oklch(0.2178 0 0)` (= `#1A1A1A`). Live: spec — `muted: #1A1A1A // Subtle surface elevation`.
- `--muted-foreground`: `oklch(0.5555 0 0)` (= `#737373`). Live: spec — `mutedForeground: #737373 // Secondary text (WCAG AA on dark)`. Spec verifies 5.3:1 contrast against canvas.
- `--accent`: `oklch(0.6535 0.2348 34.04)` (= `#FF3D00`). Live: spec — same vermillion as primary; the shadcn-core `--accent` slot tracks the brand's single chromatic accent.
- `--accent-foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Live: spec — `accentForeground: #0A0A0A // Dark text on accent`.
- `--secondary`: `oklch(0.2178 0 0)` (= `#1A1A1A`). (synthesised — spec doesn't separate "secondary" from muted; mirrors muted as the next-step neutral.)
- `--secondary-foreground`: `oklch(0.9851 0 0)` (= `#FAFAFA`). (synthesised — body weight on muted surface.)
- `--destructive`: `oklch(0.6535 0.2348 34.04)` (= `#FF3D00`). (synthesised — system runs a single accent; destructive routes to the same vermillion as primary. The spec says "Black, white, and one accent. Maybe two. More colors dilute the typographic impact." Destructive collapses to accent.)
- `--destructive-foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`). (synthesised — tracks accent-foreground.)
- `--border`: `oklch(0.2686 0 0)` (= `#262626`). Live: spec — `border: #262626 // Barely-there dividers`.
- `--input`: `oklch(0.2178 0 0)` (= `#1A1A1A`). Live: spec — `input: #1A1A1A // Input backgrounds`.
- `--ring`: `oklch(0.6535 0.2348 34.04)` (= `#FF3D00`). Live: spec — `ring: #FF3D00 // Focus states match accent`.

### Polarity-locked surfaces

These do not flip with theme — the system is single-polarity dark.

- `--brand-canvas-night`: `oklch(0.1448 0 0)` (= `#0A0A0A`). The fixed dark canvas; same as `--background`.
- `--brand-on-dark`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Foreground when placed on the dark canvas.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.2686 0 0)` (= `#262626`). Live: spec — "Border: 1px // Thin, precise dividers" — same value as `--border`; the hairline-soft alias names the role.
- `--brand-hairline-strong`: `oklch(0.5555 0 0)` (= `#737373`). Live: spec — derived from `mutedForeground`. Used for full-width section dividers and accent underlines below mid-tone text.
- `--brand-accent-bar`: `oklch(0.6535 0.2348 34.04)` (= `#FF3D00`). Live: spec — "Accent bars: thin horizontal accent-colored bars (h-1, w-16) as visual anchors on key elements." The vermillion thin-bar role; same chroma as `--primary`.

### Body text neutrals (utility, chroma ≈ 0)

- `--brand-body`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Tracks `--foreground` for default body weight.
- `--brand-body-muted`: `oklch(0.5555 0 0)` (= `#737373`). Tracks `--muted-foreground` for secondary body weight.

### Drift vs `tokens.css`

Not applicable in spec-derived mode — `tokens.css` is authored in Step 2 from this DESIGN.md, so there is no prior file to drift against.

## §3 Typography

The system runs three families with strict role separation. Inter Tight is the primary UI and headline cut; Playfair Display appears only in pull quotes and testimonials; JetBrains Mono carries labels, stats, and technical captions. The spec is explicit: "Three font stacks coexist."

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero statement | Inter Tight | 700 | 128px (8xl) — `6rem` to `8rem` clamp on desktop | 1.0 | -0.06em (tighter) |
| Display | Inter Tight | 700 | 96px (7xl) | 1.05 | -0.06em |
| Heading H1 | Inter Tight | 700 | 56-72px (5xl-6xl) | 1.1 | -0.04em (tight) |
| Heading H2 | Inter Tight | 700 | 40px (4xl) | 1.15 | -0.04em |
| Heading H3 | Inter Tight | 600 | 32px (3xl) | 1.2 | -0.04em |
| Subhead | Inter Tight | 500 | 20-24px (xl-2xl) | 1.25 (snug) | -0.01em (normal) |
| Lead paragraph | Inter Tight | 400 | 18px (lg) | 1.6 (normal) | -0.01em |
| Body | Inter Tight | 400 | 16px (base) | 1.6 | -0.01em |
| Caption | Inter Tight | 400 | 14px (sm) | 1.5 | -0.01em |
| Fine print | Inter Tight | 400 | 12px (xs) | 1.5 | -0.01em |
| Label / eyebrow | JetBrains Mono | 500 | 12-14px | 1.4 | 0.1em (wider) or 0.2em (widest) — UPPERCASE |
| Stat / KPI number | JetBrains Mono | 600 | 32-56px | 1 | -0.01em |
| Pull quote | Playfair Display | 400 | 28-40px | 1.3 | -0.02em |
| Inline code | JetBrains Mono | 400 | 14px | 1.5 | normal |

**Tracking ladder.** The spec encodes five steps: `tighter` (-0.06em) for display, `tight` (-0.04em) for large headings, `normal` (-0.01em) for body (slightly tightened from 0), `wide` (0.05em) for small labels, `wider` (0.1em) for all-caps labels, `widest` (0.2em) for sparse emphasis. Display and label tracking pull in opposite directions deliberately: tight on headlines, wide on labels — the contrast marks one as "headline" and the other as "taxonomy."

**Scale ratio.** Hero (128px) over body (16px) is 8:1, exceeding the spec's documented "6:1 or greater" rule for extreme scale contrast.

**Custom display weights.** Inter Tight is used at 700 (bold) for hero and display; the spec defines "No thin weights below 400" as an accessibility floor, so the body voice stays at 400+.

## §4 Component vocabulary

Eighteen entries. Spec-derived from raw.md "Component Stylings," "Effects & Animation," "Iconography" sections and the inline component list at the bottom of the source. Each entry cites the spec section that defines it.

### Primary button (text-only with animated underline)

**Status:** `current`
**Live source:** spec §"Component Stylings → Buttons → Primary button"
**Description:** No background fill. Vermillion accent text. Absolute-positioned underline span at `h-0.5` (2px) with `bg-accent`, base state `scale-x-100`. Uppercase, `tracking-wider` (0.1em), font-weight 600. Padding `py-2/3/4` by size (sm/default/lg), `px-0`. Gap between icon and label `gap-2/2.5/3`.
**States:**
- `default` — vermillion text, full-width underline at scale-x-100
- `hover` — underline scales to scale-x-110 (overshoots the text); text color unchanged
- `active` — `translate-y-px` for tactile press response
- `focus-visible` — 2px accent outline, 2px offset, no glow or fill change
- `disabled` — `pointer-events-none`, `opacity-50`

### Secondary / outline button (full inversion on hover)

**Status:** `current`
**Live source:** spec §"Component Stylings → Buttons → Secondary/outline button"
**Description:** 1px solid foreground border, foreground text, no fill initially. Sharp 0px corners. Padding `px-6` (needs horizontal padding unlike primary). Uppercase, `tracking-wider`.
**States:**
- `default` — transparent fill, foreground text + border
- `hover` — `bg-foreground`, text becomes `background` color (full inversion — white fill, dark ink)
- `active` — same `translate-y-px` press
- `focus-visible` — 2px accent ring, 2px offset
- `disabled` — `opacity-50`

### Ghost button (appearing underline)

**Status:** `current`
**Live source:** spec §"Component Stylings → Buttons → Ghost button"
**Description:** No border, no fill, muted-foreground text. Padding `px-4`. Underline appears via `scale-x-0` → `scale-x-100`, thinner than primary (`h-px`).
**States:**
- `default` — muted-foreground text, underline at scale-x-0 (invisible)
- `hover` — text becomes foreground; underline scales to scale-x-100
- `active` — `translate-y-px`
- `focus-visible` — 2px accent ring

### Default card (bordered, transparent, sharp-cornered)

**Status:** `current`
**Live source:** spec §"Component Stylings → Cards/Containers"
**Description:** 1px solid border (controlled by `bordered` prop), `bg-transparent`, 0px radius, no shadow. Padding `p-6` mobile → `p-8` desktop.
**States:**
- `default` — barely-there border, transparent fill
- `hover` — border color lightens to a `border-hover` token (transition 150ms)

### Highlighted card (featured pricing tier)

**Status:** `current`
**Live source:** spec §"Component Stylings → Cards → Highlighted cards"
**Description:** 2px solid accent border (overrides default 1px). Small accent badge above content: `bg-accent`, `px-3 py-1`, uppercase mono text. No background change — border is the differentiator.

### Product-detail card (depth via layered type)

**Status:** `current`
**Live source:** spec §"Component Stylings → Cards → Special depth technique"
**Description:** Accent top border (absolute `h-1 w-16 bg-accent`). Behind the foreground title element sits a duplicate text element at `-z-10` and border color, offset 1-2px — the offset gives subtle dimensionality without using a drop shadow.

### Input (standard)

**Status:** `current`
**Live source:** spec §"Component Stylings → Inputs"
**Description:** Background `#1A1A1A` (input token), 1px solid border, 0px radius, height `h-12` mobile → `h-14` desktop, `text-base` (16px — prevents iOS zoom), `px-4` padding.
**States:**
- `default` — barely-there border, muted-foreground placeholder
- `focus` — border becomes accent vermillion; no ring, no glow, `outline-none`
- `disabled` — `cursor-not-allowed`, `opacity-50`

### Input — inverted-section variant

**Status:** `current`
**Live source:** spec §"Component Stylings → Inputs → Special case (Final CTA inverted section)"
**Description:** Background transparent (sits on inverted white surface). Border `background/30` (semi-transparent canvas color). Text in background color. Placeholder at `background/50`. Focus border switches to accent so it stands out against the white canvas.

### FAQ accordion

**Status:** `current`
**Live source:** spec §"Effects & Animation → FAQ accordion"
**Description:** Height auto-animates with opacity fade. 200ms duration, ease-out. Trigger icons swap Plus ↔ Minus instantly (no rotation tween — the swap is the affordance).

### Step number (How It Works)

**Status:** `current`
**Live source:** spec §"Effects & Animation → Step number hover"
**Description:** Large mono numeral (e.g. `01`, `02`) initially in border color. On hover the number transitions to accent vermillion. No movement, no scale — pure color change over 150ms.

### Blog image hover

**Status:** `current`
**Live source:** spec §"Effects & Animation → Image hover (blog posts)"
**Description:** Image scales to `scale-105` over 500ms inside an `overflow-hidden` container. Container itself doesn't move — only the image scales behind the crop window.

### Decorative layered typography

**Status:** `current`
**Live source:** spec §"Textures & Patterns → Typographic layering for depth"
**Description:** Oversized numbers or words placed behind content at low opacity (e.g., the decorative "01" behind a section header at ~6-10% foreground opacity). Same technique as the product-detail card's duplicate-text offset but at gallery scale.

### Accent bar anchor

**Status:** `current`
**Live source:** spec §"Component Stylings → Cards → Product Detail card"
**Description:** Thin horizontal vermillion bar at `h-1 w-16` (4px tall, 64px wide). Used as a visual anchor above key elements — pricing tier headers, section openers, featured-card badges.

### Noise grain overlay

**Status:** `current`
**Live source:** spec §"Textures & Patterns → Subtle noise grain texture"
**Description:** Inline SVG data URL using `feTurbulence` filter, applied as a full-page overlay at 1.5% opacity. Adds tactile quality to the otherwise flat dark canvas. Sits above the canvas, below content, `pointer-events: none`.

### Full-width divider

**Status:** `current`
**Live source:** spec §"Shadows & Effects → Depth comes from → Dividers"
**Description:** 1px solid border-color horizontal rule spanning the full container width. Used between major sections in place of background alternation. No padding around it — the divider IS the section break.

### Icon (lucide-react, outline-only)

**Status:** `current`
**Live source:** spec §"Iconography"
**Description:** Stroke width 1.5px (thinner than lucide default 2px). Sizes by context: 16px inline with small text, 18px FAQ toggles / footer social, 20px navbar, 24-28px feature cards. Color `currentColor` inherited from parent. Accent icons explicitly `text-[var(--accent)]`. Never filled — always outline / stroke.

### Stat / KPI tile

**Status:** `current`
**Live source:** spec §"Layout sections → Implied page sections → Stats"
**Description:** Large mono numeral at 32-56px (Stats grid: 1 col mobile → 2 cols sm → 4 cols md). Uppercase mono caption below. Optional thin accent bar above. No card chrome — separated by the asymmetric grid alone.

### Inverted CTA section

**Status:** `current`
**Live source:** spec §"Component Stylings → Inputs → Special case (Final CTA inverted section)"
**Description:** Full-bleed section near page bottom. Canvas flips to foreground white. Headline and body text in `background` color (near-black on white). Input and CTA borders become `background/30`. Accent vermillion is the focus indicator and any in-section emphasis. Acts as the page's punctuation before the footer returns to dark.

## §5 Surface inventory

No live URLs — spec-derived. Reference materials:

- `temp/refs/modern-bold/raw.md` — the full Bold Typography spec from designprompts.dev (originally referenced via app.superdesign.dev/library/modern-bold). Anchors §1-§4 directly.

## §6 Notes

- **Single chromatic accent, no second hue.** The spec is permissive ("Maybe two") but ships one — vermillion. Adding a second chromatic token here would over-extend the system. Destructive collapses to accent. Status indicators use ink + accent + muted-foreground only.
- **Polarity-locked dark.** No light variant is documented. Building a light-mode for this system is a separate design exercise; don't synthesise one by inverting OKLCH lightness — the vermillion-on-near-black contrast logic is the design.
- **Inverted-CTA pattern is an inverted SECTION, not inverted MODE.** When the spec says "Final CTA inverted section," it means one section in the middle of a single dark page flips its canvas — the rest of the page stays dark. This is not a theme toggle.
- **The two-pixel borderThick value.** The spec defines `border: 1px` and `borderThick: 2px`. The 2px value is used for the animated primary-button underline (`h-0.5` ≈ 2px) and the featured-pricing-card border. Every other border is 1px.
- **Letter-spacing direction matters more than magnitude.** The visual signature is that headlines tighten and labels widen. Even at sm sizes, a label set at 0.05em+ tracking will read as taxonomy if the surrounding heading sits at -0.04em. The contrast is the story.
- **Noise grain is decorative, not functional.** The 1.5% opacity overlay adds tactile quality. Don't crank the opacity past 3% — the spec is precise about subtlety, and visible noise turns the surface from "matte paper" to "broken JPEG."
- **No emoji, no decorative icons inside body text.** Icons are utility — arrows in buttons, plus/minus in accordions, feature-card glyphs. Body text carries no inline icons.
- **Underline as primary affordance.** The spec is explicit: "Underlines as the primary interactive affordance." Buttons get them, link hovers get them, step numbers don't (they get color change instead). When in doubt, underline.

## §Known gaps

- **No live deployment.** All claims are spec-derived. Component values that lean on observed measurements (computed padding, exact stroke widths) are quoted from the spec text verbatim — they are not browser-verified.
- **Light-mode tokens not documented.** Spec ships one mode only. A light variant would require new design work, not a synthesised inversion.
- **No source imagery beyond the right-side preview panel description in raw.md.** The "ING / NG" massive vermillion display sample and "EXPLORE PROJECTS" outline button mentioned in `raw.md` §Notes are the only visual anchor; no actual screenshots are available.
- **Pull-quote / testimonial pattern (Playfair Display) is described by role but not by component.** Spec mentions the family is "For pull quotes and testimonials only" — the surrounding shape (attribution, layout, padding) is unspecified. A pull-quote component would need to be designed from typographic principles + the §6 "Editorial. Deliberate" vibe note.
- **Mobile-specific decorative hiding.** Spec says "Hide decorative overflow elements (large '01', 'ACME' text) on mobile to prevent horizontal scroll" — exact breakpoint logic is left to the implementer.
- **Token names for spec-described surfaces.** The spec doesn't pre-name `--brand-accent-bar` or `--brand-hairline-strong` — these are role names this DESIGN.md proposes for the surfaces the spec describes textually. `tokens.css` (Step 2) will validate the names against the AUTHORING.md taxonomy.
