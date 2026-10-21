---
slug: swiss
name: Swiss
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: /Users/carl/Development/visualize/temp/refs/swiss/raw.md (Superdesign library entry "Swiss Style", attributed to Zhou Jason via designprompts.dev — International Typographic Style)
  - imagery: none provided this cycle; vocabulary derived from the spec prose alone
  - principles: International Typographic Style as codified in 1950s Switzerland — objectivity over subjectivity, the grid as law, typography as the interface, active negative space, layered texture through pattern (not shadow), universal intelligibility
canonical-canvas: dark
selection:
  mood: [editorial, high-contrast]
  tone: [authoritative, serious]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a authoritative, serious register with editorial, high-contrast visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Swiss

## §1 Canonical canvas

The Swiss design system is single-polarity light. The spec is explicit: pure white background, pure black foreground, light gray (`#F2F2F2`) for secondary rhythm bands, and a single saturated red (`#FF3000`) reserved for functional signal — never decoration. There is no documented dark mode. A theme-flipped variant exists in this catalog only as a courtesy: canvas inverts to black, body ink inverts to white, hairlines invert to white, the muted band uses a very-dark neutral so its texture overlays still read. The Swiss Red holds its `:root` value across both canvases — it is the system's only chromatic anchor and the spec calls it a "stop sign" that "pierces the monochrome calm." Lifting or shifting it would dissolve the entire register.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Hero composition | spec §"The Vibe" + §"Layered Geometric Compositions" | pure white with 24px grid pattern at 3% | Bauhaus-style overlapping circles / rectangles / lines, one red disc, ragged-right massive type |
| Section labels | spec §"Numbered Section Labels" | red on white | `01. System` / `02. Method` / `03. Advantages` / `04. Journal` prefix in red with uppercase tracking |
| Muted rhythm band | spec §"Colors" + §"Application Strategy" | `#F2F2F2` gray | host for texture overlays (grid / dots / diagonal / noise); never overlays on pure-black or red surfaces |
| Card surface | spec §"Cards / Containers" | white or `#F2F2F2`, border-defined | thick visible border, generous uniform padding, hover inverts entire card to red or black |
| Primary CTA | spec §"Buttons" | solid black on white text | uppercase, bold, tracking-wide; hover snaps to Swiss Red or inverts |

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and the spec citation. Hex → OKLCH via the catalog's vendored culori at `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.6444 0.2426 32.25)` (= `#FF3000`). Live: spec §"Colors" — "Accent: #FF3000 (Swiss Red) - The only signal color." Also §"Visual Signatures" — "The 'Swiss Red' (#FF3000): Used not as decoration, but as a functional signal — a stop sign, a warning, a highlight — piercing the monochrome calm." This is the system's single chromatic value; every other token is monochromatic.
- `--brand-accent-red-ring`: `oklch(0.6444 0.2426 32.25 / 0.1)` (= `rgba(255, 48, 0, 0.1)`). Live: spec §"Shadows & Effects" — "Only use subtle ring shadows for compositional geometry (e.g., `shadow-[0_0_0_8px_rgba(255,48,0,0.1)]` for accent circles)." The translucent halo around the Bauhaus red disc in the hero composition. Same hue as `--primary`, alpha is documented at the source.

### Documented secondary brand colours

The spec is explicit that Swiss Red is "the only signal color" and that "no decorative fill" is permitted. There is no documented secondary chromatic ladder. Charts and data visualization fall back to the monochrome ladder + Swiss Red as the lone accent.

### Canvas + neutrals

- `--background`: `oklch(1.0000 0 0)` (= `#FFFFFF`). Live: spec §"Colors" — "Background: #FFFFFF (Pure White) - The canvas must be neutral." Reinforced by §"The Vibe" — "Brutally Precise: No gradients to hide bad layout."
- `--foreground`: `oklch(0 0 0)` (= `#000000`). Live: spec §"Colors" — "Foreground: #000000 (Pure Black) - Text is absolute." Body, headlines, borders, and hairlines all draw from this single ink.
- `--card`: `oklch(1.0000 0 0)` (= `#FFFFFF`). Live: spec §"Cards / Containers" — "Background: White or Muted Gray (#F2F2F2)." Default card surface is white; the gray variant is documented separately at `--brand-canvas-muted` below.
- `--card-foreground`: `oklch(0 0 0)` (= `#000000`). Same source as `--foreground`.
- `--popover`: `oklch(1.0000 0 0)` (= `#FFFFFF`). Synthesised from `--card` — the spec does not enumerate popovers separately; the system's flatness rule (no shadows, hairline-only elevation) means popovers and cards share a surface.
- `--popover-foreground`: `oklch(0 0 0)` (= `#000000`). Synthesised; same rationale.
- `--muted`: `oklch(0.9612 0 0)` (= `#F2F2F2`). Live: spec §"Colors" — "Muted: #F2F2F2 (Light Gray) - Used for secondary backgrounds to create rhythm." Also §"Textures & Patterns" — texture overlays are applied to "muted gray backgrounds (#F2F2F2) and occasionally on white surfaces."
- `--muted-foreground`: `oklch(0.2178 0 0)` (= `#2B2B2B`, synthesised). The spec doesn't enumerate a muted-text ink — it ships only pure black for body. A near-black mute exists in this token slot so secondary captions on `#F2F2F2` rhythm bands have a subtle weight differentiation without breaking the monochrome rule. Marked `(synthesised)`.
- `--accent`: `oklch(0.6444 0.2426 32.25)` (= `#FF3000`). Tracks `--primary` because the spec ships a single accent.
- `--accent-foreground`: `oklch(1.0000 0 0)` (= `#FFFFFF`). Live: spec §"Buttons" — hover "switch to Swiss Red (#FF3000)" with the same inverted-text rule as the black primary state, i.e. white text on red.
- `--secondary`: `oklch(0 0 0)` (= `#000000`). Live: spec §"Buttons" — "Solid Black background with White text (Primary). White background with Black border (Secondary)." Naming is inverted from the shadcn-core slot's typical reading: in Swiss, the *visual* primary is the solid black button, and the *visual* secondary is the white-with-black-border button. We park solid-black at `--secondary` because shadcn-core reserves `--primary` for the chromatic brand colour (Swiss Red here).
- `--secondary-foreground`: `oklch(1.0000 0 0)` (= `#FFFFFF`). Same source.
- `--destructive`: `oklch(0.6444 0.2426 32.25)` (= `#FF3000`). Tracks `--primary`. Live: spec §"Visual Signatures" — Swiss Red is "a stop sign, a warning, a highlight." Destructive intent is one of the documented uses of the single signal colour.
- `--destructive-foreground`: `oklch(1.0000 0 0)` (= `#FFFFFF`). Same source.
- `--border`: `oklch(0 0 0)` (= `#000000`). Live: spec §"Colors" — "Border: #000000 (Pure Black) - Structure is visible." Also §"Radius & Border" — "Thick, visible borders (border-2 or border-4). Used to define the grid."
- `--input`: `oklch(0 0 0)` (= `#000000`). Tracks `--border`. Live: spec §"Inputs" — "Underlined (border-b) or solid rectangular box with thick border." The input border is the same pure-black hairline / 2px / 4px stroke that defines every other surface.
- `--ring`: `oklch(0.6444 0.2426 32.25)` (= `#FF3000`). Tracks `--primary`. Live: spec §"Accessibility" — "High-contrast 2px ring in red (`focus-visible:ring-2 focus-visible:ring-swiss-accent focus-visible:ring-offset-2`)." Also §"Inputs" — focus "Sharp change in border color to Swiss Red."

### Polarity-locked surfaces

The spec is single-polarity; few surfaces are formally locked. The Bauhaus hero composition and the red signal colour stay fixed across themes by definition (no documented dark variant exists). Tokens that track those:

- `--brand-canvas-paper`: `oklch(1.0000 0 0)` (= `#FFFFFF`). The pure-white canvas used by the hero composition area regardless of theme. Lifting this away from white in dark mode would dissolve the Bauhaus geometric clarity.
- `--brand-canvas-muted`: `oklch(0.9612 0 0)` (= `#F2F2F2`). Live: spec §"Colors" — the light-gray rhythm band. In dark-mode courtesy variant this token does flip (see §6 Notes) because the spec is single-polarity and a true dark variant inverts the rhythm band as well.

### Hairlines / dividers

- `--brand-hairline-strong`: `oklch(0 0 0)` (= `#000000`). Live: spec §"Radius & Border" — "Thick, visible borders (border-2 or border-4). Used to define the grid." Spec also §"Responsive Strategy" — "Borders remain 4px thick (never thin out)."
- `--brand-hairline-fine`: `oklch(0 0 0)` (= `#000000`). Live: spec §"Layout Strategy" — "Use horizontal and vertical lines to divide sections." The 1px sectional divider variant; same hue as `--brand-hairline-strong`, distinguished by width at the consumer.

### Pattern token alpha values

The spec documents four CSS pattern overlays, each with a precise opacity. These are not chromatic values but they are token-documented application strengths:

- `--brand-pattern-grid-alpha`: `0.03`. Live: spec §"Grid Pattern" — "Subtle 24×24px grid lines at 3% opacity."
- `--brand-pattern-dots-alpha`: `0.04`. Live: spec §"Dot Matrix" — "Radial gradient dots, 16×16px spacing, 4% opacity."
- `--brand-pattern-diagonal-alpha`: `0.02`. Live: spec §"Diagonal Lines" — "45-degree repeating lines, 10px spacing, 2% opacity."
- `--brand-pattern-noise-alpha`: `0.015`. Live: spec §"Noise Texture" — "Fractal noise overlay via SVG filter, 1.5% opacity."

### Drift vs `tokens.css`

Not applicable — this is a spec-derived first-author cycle. The `tokens.css` authored in Step 2 will be the first artifact for this slug; there is no prior file to drift against, and there is no live brand to drift away from.

## §3 Typography

The Swiss register documents one type family, two body weights, two display weights, two tracking patterns, and an explicit case rule.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Inter (Helvetica / Akzidenz-Grotesk fallback) | 900 (Black) | `clamp(3rem, 12vw, 10rem)` | 0.85 | -0.04em (tracking-tighter) |
| Heading | Inter | 700 (Bold) | `clamp(2rem, 5vw, 4rem)` | 0.95 | -0.02em |
| Title | Inter | 700 (Bold) | 1.5rem (24px) | 1.1 | -0.01em |
| Body | Inter | 400 (Regular) | 1rem (16px) | 1.5 | 0 |
| Caption / Label | Inter | 500 (Medium), UPPERCASE | 0.75rem (12px) | 1.2 | 0.1em (tracking-widest) |
| Mono | system mono (SFMono-Regular, Menlo, Consolas) | 400 | 0.875rem (14px) | 1.5 | 0 |

Notes — derived from spec §"Typography" and §"Visual Signatures":

- **Family**: "Inter (Google Font). Ideally closest to Helvetica / Akzidenz-Grotesk." Grotesque sans-serif with high x-heights. The spec frames the family as a "neutral vessel for meaning" — the designer is "not an artist expressing themselves, but a conduit for information."
- **Weight ladder**: heavy use of Black (900) and Bold (700) for headings; Regular (400) or Medium (500) for body. The spec does not document Light, Thin, ExtraBold, or italic variants — Swiss restraint is explicit that "personal ornamentation is eliminated."
- **Case**: "UPPERCASE for almost all headings and labels." The Title role above is the exception; the Caption / Label role is always uppercase in deployment.
- **Tracking**: two patterns, no middle ground. Display headlines run `tracking-tighter` (negative ≈ -0.04em). Small labels run `tracking-widest` (≈ 0.1em). Body sits at 0.
- **Scale**: "Extreme contrast. Headlines should be massive (text-7xl to text-9xl+). Body text is legible and objective." The Display role above uses CSS `clamp()` to map mobile (≈ 48px) → desktop (≈ 160px), per spec §"Responsive Strategy" — "Typography scales down but remains bold: text-6xl for hero headlines" on mobile; "Maximum typography scale (text-9xl, text-[10rem])" on desktop.
- **Alignment**: "Flush-Left, Ragged-Right Text: Text blocks are strictly left-aligned to the grid." Centered text is non-canonical.

## §4 Component vocabulary

The Swiss spec is component-shaped — every component is described in terms of geometry, weight, alignment, and inversion behaviour rather than colour-state. The exhaustive list below derives from spec §"Component Stylings" + §"Non-Genericness" + §"Animation" + §"Layout Strategy" + §"Spacing & Iconography." Sixteen entries.

### Primary button

**Status:** `current`
**Live source:** spec §"Buttons" — "Solid Black background with White text (Primary)."
**Description:** Solid black rectangle, 0px radius (strictly rectangular). Uppercase label in bold Inter at tracking-wide. Minimum height 44px for touch-target compliance per spec §"Accessibility." Padding generous; the spec doesn't specify exact horizontal padding but the Halcyon-team convention pairs `0.75rem 1.5rem` (12px / 24px) with the 44px floor. No shadow; flatness is preserved by border-only elevation.
**States:** `default` — black bg, white ink. `hover` — instant background flip to Swiss Red (or full inversion: white bg / black ink). `focus-visible` — 2px red ring offset by 2px (per spec §"Accessibility"). `pressed` — no documented scale; spec §"Animation" says "Buttons: Instant background color changes, no scale transforms." `disabled` — not enumerated by spec; convention is 30% alpha on the entire element.

### Secondary button

**Status:** `current`
**Live source:** spec §"Buttons" — "White background with Black border (Secondary)."
**Description:** White rectangle with a thick black border (2px or 4px per the visible-grid rule). Same uppercase / bold / tracking-wide label as primary. Same 44px touch-target floor.
**States:** `default` — white bg, black ink, black border. `hover` — full color inversion (black bg, white ink) OR snap to Swiss Red bg with white ink — spec lists both as valid. `focus-visible` — 2px red ring offset by 2px. `pressed` — no scale, no shadow. `disabled` — 30% alpha convention.

### Tertiary / link button

**Status:** `current`
**Live source:** spec §"Animation" — "Navigation Links: Vertical slide animation with color change (text slides up, red replacement slides in from below)."
**Description:** Uppercase text-only affordance, no fill, no border. The hover micro-interaction is a vertical slide where the default-state ink (black) translates up out of view as a Swiss Red duplicate slides in from below — `duration-200 ease-out` per spec §"Transitions." Mechanical, geometric, no fade.
**States:** `default` — black ink, no decoration. `hover` — slide-up swap to red. `focus-visible` — 2px red ring (the same focus rule applies to every interactive element).

### Content card

**Status:** `current`
**Live source:** spec §"Cards / Containers" — full block. Spec §"Non-Genericness" — "Feature Cards: Color inversion on hover (white → accent red), arrow rotation (-45° → 0°)."
**Description:** Bordered rectangle (thick black border, 2px or 4px). 0px radius. Background is white OR `#F2F2F2`. Padding is generous and uniform: `p-8` (32px) or `p-12` (48px) on every side. No shadow. Internal content is left-aligned. May include a corner arrow icon at -45deg (a chevron / arrow that rotates to 0° on hover, signaling direction-of-travel).
**States:** `default` — white or muted-gray bg, black ink, black border. `hover` — entire card background inverts to Swiss Red OR black, with text colour flipping to white. The arrow icon rotates from -45° to 0°. Transition is mechanical (`duration-200 ease-out`), not eased. `focus-visible` — 2px red ring.

### Stat card

**Status:** `current`
**Live source:** spec §"Animation" — "Stats Cards: Scale transform on numbers (1.0 → 1.05), rotating plus icons (0° → 90°), background color snap (black → red)."
**Description:** Solid-black or solid-Swiss-Red rectangle (depending on emphasis tier) holding a very-large numeric value (Display-weight Inter at scale 4-8rem) plus an uppercase label below in tracking-widest caption. A plus-sign icon corner-pinned. 0px radius, no shadow. Generous internal padding.
**States:** `default` — black bg, white ink, plus icon at 0°. `hover` — bg snaps from black to Swiss Red (instant, not eased), the numeric scales to 1.05, the plus icon rotates 0° → 90°. `focus-visible` — 2px red ring.

### Testimonial card

**Status:** `current`
**Live source:** spec §"Animation" — "Testimonials: Subtle upward lift (-1px translateY), border color change (black → red), quote text color change."
**Description:** Bordered rectangle, uppercase byline label in tracking-widest above the quote body in Inter Regular. Border at default is black; lift micro-interaction on hover is the only "soft" motion in the system (-1px on the Y axis).
**States:** `default` — black border, black ink. `hover` — border flips to Swiss Red, quote ink also shifts to Swiss Red, card lifts by 1px. `focus-visible` — 2px red ring.

### FAQ accordion item

**Status:** `current`
**Live source:** spec §"Animation" — "FAQ Cards: Rotating plus icons, full background color inversion (white → red)."
**Description:** Horizontal row with a left-aligned question (Heading-weight Inter, tracking-tight), a right-pinned plus icon, and a thick bottom border. Expanded state reveals the answer body below in Inter Regular at body scale, with the plus icon rotated to 45° (or 90° — the spec mentions both).
**States:** `default` — white bg, black ink, black plus icon at 0°. `hover` — entire row bg inverts to Swiss Red, ink flips to white. `expanded` — plus rotates to indicate state. `focus-visible` — 2px red ring.

### Input — underlined

**Status:** `current`
**Live source:** spec §"Inputs" — "Underlined (border-b)."
**Description:** Single bottom-border at thick weight (2px). No background fill, no top / side borders. Placeholder text in Inter Regular at body scale, ink at 30-50% black for the muted-placeholder pattern. Label above in uppercase tracking-widest caption role.
**States:** `default` — black bottom border. `focus` — border colour snaps to Swiss Red. No glow ring (spec §"Inputs" — "No glow rings"). `error` — border is Swiss Red plus an inline label below in the destructive token. `disabled` — convention is 30% alpha.

### Input — solid rectangular

**Status:** `current`
**Live source:** spec §"Inputs" — "solid rectangular box with thick border."
**Description:** Full bordered rectangle, 0px radius, thick black border (2px). Generous internal padding. Same typography as the underlined variant.
**States:** Same set as the underlined variant; the difference is purely geometric.

### Numbered section label

**Status:** `current`
**Live source:** spec §"Non-Genericness" — "Numbered Section Labels: Every major section has a prefix (01. System, 02. Method, 03. Advantages, 04. Journal) in red accent with uppercase tracking."
**Description:** A two-part eyebrow: a zero-padded section number ("01.") in Swiss Red, followed by an uppercase short word (System / Method / Advantages / Journal) in tracking-widest. Sits above the section's display headline as a wayfinding device, like a print-magazine masthead foldout. One of the system's recognizable signatures.
**States:** Static (no hover behaviour on the label itself; the section it heads may carry hover interactions).

### Hero composition (Bauhaus)

**Status:** `current`
**Live source:** spec §"Non-Genericness" — "Hero features abstract Bauhaus-style composition with overlapping shapes. Each composition combines circles, rectangles, lines in purposeful arrangement."
**Description:** A purposeful arrangement of basic geometric shapes — typically one large red disc (with optional 8px translucent red ring), one or two black rectangles (one wide, one tall, asymmetric), one diagonal line crossing the composition, sometimes a smaller off-axis ring. The composition is rendered flat (no gradients, no shadows) atop the 24px grid pattern overlay. Asymmetric placement creates "dynamic visual rhythm and tension" per spec §"The Grid as Law." The signature voltage moment of the Swiss register.
**States:** Static. The hero composition does not animate; the system's mechanical-snap interactions are reserved for actionable elements.

### Layered geometric texture grid (2×2)

**Status:** `current`
**Live source:** spec §"Non-Genericness" — "Product detail uses 2×2 grid of geometric elements with different texture patterns."
**Description:** A 2×2 grid where each cell contains a geometric primitive (circle, square, line cluster, ring) overlaid on a different texture pattern — one cell uses the 24px grid pattern, one the 16px dot matrix, one the 45° diagonal, one fractal noise. Each cell carries a thick black border. Used as a system showcase or product-detail compositional anchor.
**States:** Static.

### Pattern texture surface — grid

**Status:** `current`
**Live source:** spec §"Grid Pattern" — "Subtle 24×24px grid lines at 3% opacity. Applied to hero composition area, blog sidebar, muted backgrounds."
**Description:** A CSS `background-image` of repeating horizontal + vertical 1px lines at 24px spacing, set at 3% opacity (`--brand-pattern-grid-alpha`). Always applied to white or `#F2F2F2` surfaces, never to pure-black or red.

### Pattern texture surface — dots

**Status:** `current`
**Live source:** spec §"Dot Matrix" — "Radial gradient dots, 16×16px spacing, 4% opacity. Applied to section headers, feature sidebars."
**Description:** A radial-gradient pattern of 1-2px dots at 16px spacing, 4% opacity (`--brand-pattern-dots-alpha`). Evokes traditional print halftone. Same surface restrictions as the grid pattern.

### Pattern texture surface — diagonal

**Status:** `current`
**Live source:** spec §"Diagonal Lines" — "45-degree repeating lines, 10px spacing, 2% opacity. Applied to benefits sidebar, accent backgrounds."
**Description:** A CSS `repeating-linear-gradient` of 45° lines at 10px spacing, 2% opacity (`--brand-pattern-diagonal-alpha`). Adds directional energy to otherwise-static layouts.

### Pattern texture surface — noise

**Status:** `current`
**Live source:** spec §"Noise Texture" — "Fractal noise overlay via SVG filter, 1.5% opacity. Applied globally to body background."
**Description:** A repeating fractal noise generated via inline SVG `<feTurbulence>` and rendered as a CSS `background-image`. Applied at 1.5% opacity (`--brand-pattern-noise-alpha`) to body background. Simulates paper grain, adding warmth to the stark white canvas without breaking the flatness rule.

## §5 Surface inventory

The system has no live deployment to sample. Inputs this cycle:

- `/Users/carl/Development/visualize/temp/refs/swiss/raw.md` — the Superdesign library entry titled "Swiss Style," credited to Zhou Jason via designprompts.dev. Carries the full prose spec under "Style prompt (verbatim)" plus structural annotation under "Layout sections" / "Components" / "Tags" / "Notes." The single authoritative source for this cycle.

No reference imagery was supplied — the vocabulary is derived from the spec prose alone. If imagery becomes available in a later cycle, sampling it would primarily inform the Bauhaus hero composition's specific shape arrangements, the exact stroke widths the spec describes only qualitatively ("thick"), and the application-strategy edge cases (where exactly the diagonal pattern shows up vs. the dots).

## §6 Notes

- **Single chromatic identity, no decoration.** Swiss Red (`#FF3000`) is the system's only chromatic value, and the spec is explicit that it is "never decorative fill." It appears as primary CTAs and hover states, ring shadows around accent circles in the hero composition, section number prefixes, and the focus-visible ring. Other surfaces (charts, badges, info banners, error states) all route through black + white + `#F2F2F2` + Swiss Red — never through invented variants.
- **The grid is God.** Spec §"Layout Strategy" — "The grid is God. It should often be visible (using borders on elements)." Asymmetric column ratios (8:4, 7:5, 5:7) are explicitly called out. Centered alignment is non-canonical except for the rare punctuation moment.
- **Mechanical, not eased, interactions.** All hover transitions are `duration-200 ease-out` or `duration-150 ease-linear` per spec §"Transitions" — "Instant, mechanical, snappy, precise. Movement is purposeful and geometric. No elastic or spring animations." Color inversions are instant snaps, not fades.
- **Flatness is enforced.** No drop shadows, no gradients (the lone exception is a `radial-gradient` inside the dot pattern, which is a texture not a colour fill), no 3D effects, no rounded corners. The only documented shadow is the 8px translucent red ring around the hero red disc — that's compositional geometry, not elevation.
- **Texture overlays carry depth.** Four CSS pattern surfaces (grid / dots / diagonal / noise) are the system's substitute for shadow-based elevation. Application rules: grid pattern on hero composition + blog sidebar + muted backgrounds; dot matrix on section headers + feature sidebars; diagonal on benefits sidebar + accent backgrounds; noise globally on body. Never on pure-black or red surfaces.
- **Single-polarity light.** No documented dark mode. A theme-flipped variant in this catalog inverts canvas + body ink + hairlines + muted band; Swiss Red stays at `:root` value (polarity-locked chromatic anchor). The Bauhaus hero composition and pattern surfaces are visually compromised in dark — the system was designed for paper-white, and the dark variant exists as catalog-level courtesy, not as a documented register.
- **Numbered section labels are the wayfinding signature.** Spec calls out four specific labels by name (`01. System`, `02. Method`, `03. Advantages`, `04. Journal`); the system uses two-digit zero-padded numbers (never `1.` or `i.`) and short uppercase single-word section names. The number portion is always in Swiss Red; the word portion is in tracking-widest black.
- **Bauhaus composition vocabulary is constrained.** Circles, squares, rectangles, lines, rings — no organic shapes, no curves beyond the perfect circle, no off-axis arcs. Spec §"Visual Signatures" — "Geometric Abstraction: Basic shapes (circles, squares, rectangles, lines) arranged in Bauhaus-inspired compositions."
- **Iconography uses Lucide.** Spec §"Spacing & Iconography" — "Use lucide-react icons, but treat them as functional symbols. Stroke width should match typography. Often enclosed in geometric shapes (squares/circles)." Filled-icon mixes are excluded by the flatness rule; all icons run at consistent stroke weight.
- **Distinct from `whitepaper` and `editorial`.** This entry was flagged for near-overlap. Audit: `whitepaper` is institutional cool-slate (different palette, cooler temperature, no signal red); `editorial` is magazine warm-cream serif (different family, different surface temperature, different center of gravity). Swiss is canonical asymmetric ITS — load-bearing single signal colour, mechanical interactions, "grid is God" ethos, and Bauhaus geometric compositions that neither sibling carries. No cross-contamination of vocabulary expected.

## §Known gaps

- **No reference imagery.** This cycle had only the prose spec available. Specific values that the spec describes qualitatively but not numerically — exact stroke widths beyond "2px or 4px," exact Bauhaus shape sizing, exact hover-state colour mixes — are filled by Halcyon-team convention rather than by sampling. A future cycle with reference imagery (Müller-Brockmann posters, Akzidenz-Grotesk specimens, contemporary ITS revival sites) could tighten these.
- **No live deployment.** Swiss style is a documented register with no canonical website to sample. Real-world deployments (Müller-Brockmann's Swiss Federal Railways work, Helvetica-era poster archives, contemporary studios like Bureau Borsche or Studio Dumbar) exist but are not first-party brand sites for the register itself.
- **No documented dark mode.** The dark-variant tokens added in Step 2 are catalog-level courtesy. Swiss is a paper-white register; a dark rendering compromises the Bauhaus + texture-pattern signatures that the spec calls "critical for depth." If a future spec revision documents a dark register, that becomes a fresh authoring cycle.
- **No documented chart palette.** The spec is silent on data visualization. The token slots `--chart-1` through `--chart-5` are filled with the monochrome ladder (pure black + three steps of gray + Swiss Red as the lone highlight). A real charting deployment would benefit from a documented multi-series palette; the spec's "no decorative colour" rule constrains the design choice.
