---
slug: bmw-m-style
name: BMW M
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://www.bmwusa.com/vehicles/bmw-m/overview.html
  - https://www.bmwusa.com/vehicles/bmw-m/models.html
  - https://www.bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html
  - https://www.bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html
  - https://www.bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan-technical-highlights.html
  - https://www.bmwusa.com/vehicles/m-series/xm/bmw-xm.html
  - https://www.bmwusa.com/vehicles/m-series/bmw-i4-m60/bmw-i4-m60-gran-coupe.html
  - https://www.bmwusa.com/limited-edition-vehicles/m4-csl.html
  - https://shop.bmwusa.com
  - https://upload.wikimedia.org/wikipedia/commons/b/b3/BMW_M_logo.svg
canonical-canvas: both
selection:
  mood: [brand-system, luxury]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, luxury visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# BMW M

BMW M is the performance arm of BMW AG. Its marketing surface across `bmwusa.com/vehicles/m-series/*` and the `bmwusa.com/vehicles/bmw-m/*` family is a mixed-polarity property: the M overview, the M models index, the M5 Sedan, and the M4 CSL limited-edition page render on a near-black canvas with full-bleed performance photography, while the M3 Sedan, the XM, the i4 M60, and the M Performance Parts shop render on a white canvas with the same photography style sitting against a light ground. The signature decorative element — the BMW M tri-stripe (Bavarian Blue / Violet / Motorsport Red) — appears on both polarities, lifted from the corporate BMW Bavarian heritage on one side and the Texaco-sponsored Motorsport-team origin on the other, with the centre violet emerging from the overlap of the two.

The point of this file: capture what is actually deployed. BMW M is not single-polarity dark: that holds for marquee surfaces, but breaks the M3 / XM / electric-M / shop half of the catalogue.

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| M overview | `bmwusa.com/vehicles/bmw-m/overview.html` | dark (near-black) with white logo, white text | Marquee surface — "THE MOST POWERFUL LETTER" hero on full-bleed performance photography |
| M models index | `bmwusa.com/vehicles/bmw-m/models.html` | dark (near-black) | Three-block grid (High-Performance / Electrified-Performance / Performance) over the dark canvas; bold numerical "hp" + "0-60" per card |
| M5 Sedan | `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` | dark | Full-bleed video hero; "717" hp + "3.4 sec" 0-60 in large bold numerals |
| M3 Sedan | `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` | **light (white)** | "THE M3" headline in dark grey/black on white; M-stripe rendered in topnav + section headers |
| M3 Sedan technical highlights | `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan-technical-highlights.html` | light (white / #f5f5f5 alternating spec-table rows) | Spec table with subtle vertical column dividers, alternating row backgrounds |
| BMW XM | `bmwusa.com/vehicles/m-series/xm/bmw-xm.html` | **light (white)** | "THE NEW XM" hero photograph; 11 paint-swatch chips below the hero; "738 hp / 3.6 sec / 738 lb-ft" in large bold |
| i4 M60 Gran Coupé | `bmwusa.com/vehicles/m-series/bmw-i4-m60/bmw-i4-m60-gran-coupe.html` | light (white) | Electric-M variant; "Looks like an M / Drives like an M" copy — no separate electric-blue accent, retains the standard tri-stripe |
| M4 CSL limited-edition | `bmwusa.com/limited-edition-vehicles/m4-csl.html` | dark | "KNOW NO BOUNDS / THE LIMITED EDITION BMW M4 CSL" — heritage / carbon-fiber language; matte-black + carbon-weave imagery |
| M Performance Parts shop | `shop.bmwusa.com` | light (white) | Product cards over white, BMW corporate dark CTA on white |
| BMW M canonical logo | `commons.wikimedia.org/wiki/File:BMW_M_logo.svg` | n/a (asset) | Three-stripe tri-colour with dimensional / metallic gradient rendering; flat brand stops are the bright stops of each gradient family |

**Canonical canvas decision: `both`.** Five sampled surfaces ship on dark, four ship on light. The dark surfaces carry the marquee + halo identity (M overview, M5, M4 CSL); the light surfaces carry the per-model + electric-M + commerce identity. A single-polarity dark token surface (which is what `tokens.css` currently ships) breaks half the deployed catalogue.

## §2 Palette

All OKLCH values verified to round-trip to the cited hex via `visualize/scripts/vendor/culori.mjs`.

### Brand primary

The brand primary is the **BMW corporate Bavarian Blue**, lifted from BMW AG and reused as the interactive primary in M-context (links, primary CTA, focus). The M-stripe colours are decorative identity (the M-mark itself), not interactive primary.

- `--primary` (Bavarian Blue, BMW corporate): `oklch(0.5028 0.1424 250.1265)` (= `#0166b1`). Source: BMW Pantone-equivalent corporate Blue 2144 C (RGB 1 / 102 / 177). Live: `bmwusa.com` topnav CTA + link colour (`#0066CC` was inferred from the M3 technical highlights page as the BMW signature blue used on interactive elements; canonical brand-doc value is `#0166B1`).

### M-stripe — signature decorative tri-colour

Derived from the canonical Wikimedia Commons BMW M logo SVG (`commons.wikimedia.org/wiki/File:BMW_M_logo.svg`). The SVG is a gradient-shaded vector reproduction; the flat brand-stripe colours used in marketing (topnav stripe, section-header stripe, vehicle-badge stripe) are the **bright mid-stop** of each gradient family.

- `--brand-m-stripe-light-blue` (Bavarian Blue, bright mid-stop): `oklch(0.5834 0.1175 250.2006)` (= `#3f7fbe`). Live: SVG gradient `linearGradient1213` mid-stop. Brand origin: BMW's Bavarian heritage (the blue of the corporate roundel, reduced one stop in saturation).
- `--brand-m-stripe-light-blue-tint` (Bavarian Blue, highlight): `oklch(0.8383 0.0807 258.3407)` (= `#aaccff`). Live: SVG `linearGradient1161` high stop. Used as the dimensional highlight on the metallic logo; not the flat brand stripe.
- `--brand-m-stripe-violet` (centre stripe — overlap of blue + red): `oklch(0.3507 0.0930 247.3571)` (= `#003d68`). Live: SVG `linearGradient1169` mid-stop. Brand origin: optical-mix product of overlaying the bright Bavarian Blue and the Motorsport Red — reads as deep blue-violet at flat solid scale.
- `--brand-m-stripe-violet-deep` (centre stripe, deepest stop): `oklch(0.2768 0.0720 246.5285)` (= `#002a49`). Live: SVG `linearGradient1169` low stop. The dimensional shadow on the metallic logo.
- `--brand-m-stripe-red` (Motorsport Red, bright stop): `oklch(0.5701 0.2193 28.2068)` (= `#db1e1c`). Live: SVG `linearGradient1133` bright stop. Brand origin: tribute to Texaco oil corporation, which sponsored the early BMW Motorsport GmbH years.
- `--brand-m-stripe-red-deep` (Motorsport Red, deep stop): `oklch(0.5323 0.2052 28.4272)` (= `#c81a17`). Live: SVG `linearGradient1133` low stop. The dimensional shadow on the metallic logo.

### Documented secondary brand colours

The M-series performance figure typography and the limited-edition heritage pages don't introduce a discrete fourth chromatic colour — they let the M-stripe carry the chroma against monochrome typography. The closest thing to a secondary brand colour observed in the M-models catalogue:

- `--brand-accent-yellow` (M3 Yellow Accent interior leather, M Performance brake calipers): not stated as a hex in any sampled page; described on the M3 Sedan page as "Yellow Accent" leather option and high-gloss yellow brake calipers. Treat as a **product/option colour**, not a brand-document colour — do not synthesise a token without a sampled value.

### Canvas + neutrals

- `--background` (dark canvas): `oklch(0 0 0)` (= `#000000`). Live: M overview, M models index, M5 Sedan, M4 CSL — full-bleed near-black page canvas.
- `--background` (light canvas): `oklch(1 0 0)` (= `#ffffff`). Live: M3 Sedan, XM, i4 M60, shop — white page canvas with dark text.
- `--foreground` (white on dark): `oklch(1 0 0)` (= `#ffffff`). Live: M5 hero "THE M5", M overview "THE MOST POWERFUL LETTER".
- `--foreground` (dark on light): `oklch(0 0 0)` (= `#000000`) effectively, with the M3 page using "dark grey/black" — exact value not exposed in source CSS. Treat as `#000000` until a sampled value contradicts.
- `--card` (elevated card on dark canvas): `oklch(0.2178 0 0)` (= `#1a1a1a`). Inferred from the M-models index card grid; not directly observed in inline CSS.
- `--card-foreground`: `oklch(1 0 0)` (= `#ffffff`). White text on dark cards.
- `--muted` (sidebar / muted bg on dark): `oklch(0.1591 0 0)` (= `#0d0d0d`). Carried from existing tokens; close-enough match to the visible footer / muted-band tone on the dark surfaces.
- `--muted-foreground`: `oklch(0.5931 0 0)` (= `#7e7e7e`). The mid-grey legal / "European model shown" caption tone.
- `--accent`: not separately exposed in BMW M's surface — the M-stripe occupies the decorative-accent slot, but it's polychromatic, not a single token. Carry the existing `oklch(0 0 0)` value but mark `(synthesised)`.
- `--accent-foreground`: `oklch(1 0 0)`.
- `--secondary` (secondary outline button): inferred white-on-dark / dark-on-light; surface-specific.
- `--secondary-foreground`: matches the canvas polarity.
- `--destructive` (warning-red — shop ZIP validation "warning-red" class observed on `shop.bmwusa.com`): `oklch(0.5308 0.2178 29.2339)` (= approximately the M-stripe red; existing token preserved). `(synthesised — close-to-stripe-red)`.
- `--destructive-foreground`: `oklch(0 0 0)` on light, `oklch(1 0 0)` on dark.
- `--border` (hairline on dark): `oklch(0.3562 0 0)` (= `#3c3c3c`). Carried — close to the observed mid-grey on dark-canvas card borders.
- `--input`: matches `--border`.
- `--ring` (focus ring): `oklch(0.5028 0.1424 250.1265)` (= `#0166b1`). Routes through `--primary` (Bavarian Blue) on both polarities so focus stays brand-true.

### Polarity-locked surfaces

The M-stripe colours and the M-mark itself stay fixed across `:root` and `[data-theme="dark"]`. They're identity, not theme-aware decoration.

- `--brand-m-stripe-light-blue`: `oklch(0.5834 0.1175 250.2006)` (= `#3f7fbe`). Locked.
- `--brand-m-stripe-violet`: `oklch(0.3507 0.0930 247.3571)` (= `#003d68`). Locked.
- `--brand-m-stripe-red`: `oklch(0.5701 0.2193 28.2068)` (= `#db1e1c`). Locked.

### Hairlines / dividers

- `--brand-hairline-strong` (dark canvas, ~10% white on near-black): `oklch(0.2686 0 0)` (= `#262626`). Carried — visible at footer dividers and card-edge separators on M overview.
- `--brand-hairline-soft` (light canvas, ~6% black on white): not directly carried in current `tokens.css`; suggest `oklch(0.92 0 0)` (= `#e4e4e4`) for the M3 / XM spec-table row separators.

### Drift vs `tokens.css`

Current `tokens.css` treats BMW M as **single-polarity dark** (both `:root` and `[data-theme="dark"]` carry the dark variant; the header comment explicitly notes the dark-canonical hand-edit). The live brand ships **both polarities** across the catalogue. The single-polarity dark file misrepresents half the deployed surface and should be split into a light `:root` + a dark `[data-theme="dark"]` override (per the AUTHORING.md `both` strategy).

Specific token-level drift to reconcile:

1. **`--brand-m-blue-light: oklch(0.5027 0.1425 250.0532)` (= `#0066b1`)** — this is **BMW corporate Bavarian Blue**, NOT the M-stripe light-blue. Rename to `--brand-bavarian-blue` (or fold into `--primary`) and add a separate `--brand-m-stripe-light-blue: oklch(0.5834 0.1175 250.2006)` (= `#3f7fbe`) for the actual stripe stop. The stripe is one optical stop more muted than the corporate blue.
2. **`--brand-m-blue-dark: oklch(0.5381 0.1804 258.2969)` (= `#1c69d4`)** and **`--brand-bmw-blue` (same value)** — `#1c69d4` is brighter and more saturated than either the SVG dark-blue/violet stops (`#002a49` / `#003d68`) or BMW corporate blue (`#0166b1`). Looks like a synthesised "more vivid blue" with no documented source. Suggest removing and using the canonical SVG stops (`#003d68` for the centre stripe at flat scale; `#002a49` for dimensional shadow only).
3. **`--brand-m-red: oklch(0.5876 0.2212 29.82)` (= `#e22718`)** — slightly brighter and more saturated than the canonical SVG bright stop `#db1e1c` (delta L +0.018, delta C +0.002). Tolerable, but the SVG stop is the more defensible value. Reconcile to `oklch(0.5701 0.2193 28.2068)`.
4. **`--brand-electric-blue: oklch(0.4641 0.1709 258.4945)` (= `#0653b6`)** — no documented source. The i4 M60 page explicitly does NOT use a separate electric-blue accent ("Looks like an M / Drives like an M" — retains the standard tri-stripe). Suggest removing.
5. **`--brand-warning: oklch(0.8077 0.1662 82.7023)` (= ~`#e3b340`, amber)** and **`--brand-success: oklch(0.6239 0.187 145.9275)` (= ~`#26a64a`, green)** — generic SaaS semantic tokens, not BMW M brand-documented. The shop page surfaced a `warning-red` class for ZIP validation which is closer to the M-stripe red than to amber. Recommend either dropping or marking `(synthesised — generic semantic)`.
6. **`--font-sans: BMWTypeNextLatin Light, BMWTypeNextLatin, sans-serif`** — the typography family name in `tokens.css` is plausible (BMW Group uses BMW Type Next across the corporate web). The live `bmwusa.com` pages did not expose explicit `font-family` declarations in HTML sampled via WebFetch (CSS bundled separately); typography family is asserted on the basis of the carried token and BMW Group brand-doc convention, not first-party observation in this cycle.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | BMW Type Next | Bold (700) | ~80px (`--text-display`) | ~1 (`--leading-tight`) | normal |
| Heading | BMW Type Next | Bold (700) | ~56px (`--text-heading`) | ~1 | normal |
| Title | BMW Type Next | Bold or Medium | 20px (`--text-title`) | ~1.5 | normal |
| Body | BMW Type Next | Regular (400) or Light (300) | 16px (`--text-base`) | 1.5 (`--leading-normal`) | normal |
| Caption | BMW Type Next | Regular (400) | 12–14px | 1.5 | normal |
| Mono | system (SFMono / Menlo) | Regular | inherited | inherited | normal |

**Headlines observed verbatim across the catalogue:** "THE MOST POWERFUL LETTER" (M overview), "THE MOST POWERFUL LETTER IN THE WORLD" (M-series search tagline), "THE M5", "THE M3", "THE NEW XM", "THE i4", "KNOW NO BOUNDS / THE LIMITED EDITION BMW M4 CSL". All-caps headlines are the brand's display register; sentence-case is reserved for body and supporting copy.

**Performance-figure treatment**: numerical figures ("717" hp, "738 hp", "3.4 sec", "3.6 seconds", "3.9s 0-60 MPH", "453 hp") are rendered in large, bold sans-serif numerals with the supporting unit/label set smaller beneath. Treats the number as the visual anchor of the spec section, the unit as caption-scale supporting text.

The `tokens.css` font stack declares `BMWTypeNextLatin Light, BMWTypeNextLatin, sans-serif` as a synthesised name pair — BMW Group brand-doc convention is **BMW Type Next**, in the cuts Light / Regular / Bold. The `Latin` suffix in the carried token is not a documented BMW cut; it may be a packaging label. The fallback to `sans-serif` is correct and lets the preview render even without the proprietary font loaded.

## §4 Component vocabulary

### topnav-bmwusa

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/bmw-m/overview.html` — topnav element (global header)
**Description:** Fixed top navigation rendering on a dark / charcoal canvas with white BMW corporate roundel logo (`BMW_White_Logo`), white wordmark links ("Models", "Build Your Own", "Shopping", "BMW Electric", "Owners"), and a search affordance to the right. Height visually ~60px. No M-stripe accent in the topnav itself — the stripe appears in section headers and badges, not chrome.
**States:** `default` (white text), `hover` (link colour shifts toward the BMW signature blue — `#0166b1` family).

### topnav-bmwm-mark

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/bmw-m/overview.html` — sub-brand mark (`BMW_M_Grey-Colour_RGB_new.SVG`)
**Description:** Sub-brand badge — the BMW M tri-stripe tucked under or beside the BMW roundel in topnav. Rendered in greyscale on dark surfaces and full tri-colour on light surfaces and in section-header callouts.

### hero-fullbleed-photo-dark

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/bmw-m/overview.html` — hero band ("THE MOST POWERFUL LETTER")
**Description:** Full-bleed photograph (M-vehicle on track or in motion) consuming the full viewport width and ~75–90% of viewport height. Headline overlays in white display-weight type, anchored bottom-left or centre. No tint/gradient overlay — the photograph's own darkness carries text legibility. Below the headline: short supporting paragraph ("Packed with power and made to maneuver, BMW M excels on the track and in the street") and a primary CTA.

### hero-fullbleed-video-dark

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — hero video container
**Description:** Same shape as `hero-fullbleed-photo-dark` but with an autoplay video container (M5 in motion). Aspect ratio optimised desktop / mobile separately. Headline "THE M5" overlays in white display-weight type. "Build yours" + "Shop inventory" CTAs sit immediately beneath the video.

### hero-fullbleed-photo-light

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` — hero band
**Description:** Same full-bleed photographic treatment, but the canvas around the photo is white and the headline ("THE M3") is rendered in dark grey/black display type. The photograph itself often has a darker subject against a lighter outdoor / racing-circuit backdrop, so text legibility comes from the canvas, not from the photo.

### m-stripe-section-header

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` — section header decorative bar
**Description:** The signature BMW M tri-stripe (Bavarian Blue `#3f7fbe` / Violet `#003d68` / Motorsport Red `#db1e1c`) rendered as a horizontal three-segment bar above or beside section headlines. Total bar height typically 4–6px; segments visually equal width. The brand's most recognisable decorative element — present on both light and dark canvases at full tri-colour saturation.

### m-stripe-vehicle-badge

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — vehicle badge / wheel-arch detail in photography
**Description:** Stripe appears as the leading-edge accent on physical M-vehicle badges (e.g. on the "M5" trunk badge, the "Competition" wheel-arch badge). In digital surfaces this maps to the way the tri-stripe leads a model-name badge or a heritage callout.

### button-primary-build

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` — "Build yours" CTA
**Description:** Solid-fill rectangular button with subtly-rounded corners. Background carries BMW signature blue (close to `#0166b1` family). White text label, sentence-case or all-caps depending on surface. Padding generous — ~14–16px vertical, ~24–32px horizontal. Used as the primary configurator-entry action across every model page.
**States:** `default` (solid blue), `hover` (slightly darkened / saturated), `focus` (focus ring in the same blue lineage), `disabled` (lower opacity).

### button-secondary-inventory

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — "Shop inventory" CTA
**Description:** Outline-style secondary button paired with the primary `button-primary-build`. On dark surfaces: white outline + white text. On light surfaces: dark outline + dark text. Same rectangular subtly-rounded shape as the primary. Used for inventory search, dealer lookup, alternative paths into the funnel.

### button-cta-signup

**Status:** `current`
**Live source:** `bmwusa.com/limited-edition-vehicles/m4-csl.html` — "Sign Up" CTA on limited-edition pages
**Description:** Same shape and palette as `button-primary-build`, but used for "Notify me when available" / "Sign Up" flows on limited-edition launches (M4 CSL, M3 CS, KITH M4).

### spec-card-tile

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — "717 / 3.4 sec" spec card
**Description:** Rounded-corner card containing one or two performance numerals in large bold display-weight type, with a smaller label beneath. Cards sit in a horizontal row or 2×2 grid below the hero. Card background: matches the surrounding section (semi-transparent or filled with `--card` on dark surfaces, `#f5f5f5` on light surfaces). Border: subtle / often borderless on dark, hairline on light.

### model-lineup-card

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/bmw-m/models.html` — "M2 Coupe | 453 hp | 3.9s 0-60 MPH | Starting MSRP $69,000" card
**Description:** Three-segment grid (High-Performance / Electrified-Performance / Performance) of vehicle cards. Each card: large product photograph at the top, model name (bold display type), key performance figures (hp, 0-60), starting MSRP, and a dual-CTA row at the bottom ("Explore" + "Build Yours"). Card background dark on `models.html`, white on per-model pages.

### vehicle-options-tile

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` — variant grid (M3, M3 Competition, M3 Competition xDrive)
**Description:** Smaller variant tile rendered as a clickable photo card with model name, three to four key specs (acceleration / horsepower / MSRP), and an inline "Build" button. Used to step the buyer between variants of the same nameplate.

### paint-swatch-chip

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/xm/bmw-xm.html` — 11 paint options including "Sao Paulo Yellow", "Carbon Black Metallic", "Marina Bay", "Black Sapphire Metallic", "Toronto", "Cape York"
**Description:** Small circular or square colour-swatch chip with the paint name labelled below or on hover. Pulled from BMW's CGI vehicle service (`prod.cosy.bmw.cloud`). Used in the configurator preview band and on every model page to communicate exterior paint range.

### interior-trim-chip

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — Kyalami Orange / Silverstone leather options
**Description:** Same chip mechanic as `paint-swatch-chip` but for interior leather / trim options. Often a small photographic crop of the actual material rather than a flat colour.

### tech-spec-table

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan-technical-highlights.html` — full technical specification table
**Description:** Two-column data table — spec name on left, spec value on right (right-aligned figures with consistent decimal/unit formatting). Subtle vertical column divider between the two columns. Alternating row backgrounds (light grey `#f5f5f5` and white) for readability. No card border around the table itself; it sits flush in a content-width container.

### feature-grid-card

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` — feature blocks describing engine / chassis / interior
**Description:** Photographic feature card with the photograph occupying the top half (often a detail shot — engine bay, brake calliper, steering wheel), a section title beneath ("Performance", "Design", "Technology" — common eyebrow vocabulary), and a one-paragraph supporting body. Sits in a 2 or 3 column grid below the hero.

### section-eyebrow

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — category labels ("Performance", "Design", "Technology")
**Description:** Small uppercase category label sitting above section headlines, in regular weight at ~12–14px. Carries the section's domain, lets the headline stay focused on the claim. Often paired with the M-stripe bar (`m-stripe-section-header`).

### performance-figure-jumbo

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/xm/bmw-xm.html` — "738 hp / 3.6 seconds / 738 lb-ft" trio
**Description:** Three-up performance-figure row sitting immediately under the hero. Each figure: numerical value in display-weight bold type (massive — 40–60px scale), unit/label in caption-scale beneath. Anchors the page's "this is how fast it is" claim.

### heritage-badge-callout

**Status:** `current`
**Live source:** `bmwusa.com/limited-edition-vehicles/m4-csl.html` — "signature CSL badging" / "high-performance legacy"
**Description:** Small badge-style callout pairing a model-heritage designator (CSL, CS, Competition, 50 Jahre) with the relevant model name. Often photographed in physical form on the vehicle and treated as an editorial inset rather than a pure UI element.

### configurator-launch-link

**Status:** `current`
**Live source:** `bmwusa.com/build-your-own.html` — primary configurator entry
**Description:** Routes to `/build-your-own.html#/studio/<studio-code>` per model. Visually a `button-primary-build` instance with the model's specific studio anchor. The configurator itself opens as a full-page tool — not sampled in this cycle.

### shop-product-card

**Status:** `current`
**Live source:** `shop.bmwusa.com` — M Performance Parts product grid
**Description:** White-background product card with full-width product photograph at the top, product name (semi-bold), price beneath (regular sans-serif), and a "Add to cart" / dark-fill primary action button. Subtle rounded corners, minimal-to-no border. Hover treatment lifts the card with a subtle shadow.

### shop-category-nav

**Status:** `current`
**Live source:** `shop.bmwusa.com` — top-level category nav
**Description:** Horizontal multi-level menu: "Vehicle Accessories", "Wheels & Accessories", "Lifestyle & Apparel", "M Performance Parts". M Performance Parts is its own root-level section, not buried under a generic accessories tree.

### dealer-locator-input

**Status:** `current`
**Live source:** `bmwusa.com/owners.html` — dealer locator
**Description:** ZIP-code input with placeholder "Search by location" / "Search by dealer name". Validation message in red ("warning-red" class observed: "Please enter a valid ZIP code"). Minimal-frame input, hairline border.

### footer-corporate

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/bmw-m/overview.html` — page footer
**Description:** Dark canvas footer with white text. Multi-column link organisation: Online Shopping Tools, Finance & Incentives, Owner Resources, Social Links (Facebook, X, YouTube, Instagram). Legal / compliance row beneath (Privacy Policy, Terms, Accessibility Statement, Cookie Settings, CA Do-Not-Sell). Same canvas across both light-canvas pages (M3, XM, shop) and dark-canvas pages (M overview, M5) — footer stays dark regardless of page-canvas polarity. **Polarity-locked.**

### faq-accordion

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/bmw-m/models.html` — FAQ section beneath the model grid ("M model distinctions, track capabilities, all-electric variants, warranty coverage")
**Description:** Expand-collapse Q&A blocks. Question in semi-bold, chevron-right affordance at the right edge that rotates to chevron-down on expand. Answer body in regular sans-serif. Subtle hairline divider between accordion items.

### "european-model-shown" caption

**Status:** `current`
**Live source:** `bmwusa.com/vehicles/m-series/xm/bmw-xm.html` and most other model pages — disclaimer beneath hero photography
**Description:** Small italic / muted-grey caption beneath full-bleed photography noting "European model shown" or "Some images may be computer generated". Brand-legal convention — every model page sampled carries this caption. Sets the photographic-vs-actual expectation.

### my-bmw-app-promo

**Status:** `current`
**Live source:** `bmwusa.com/owners.html` — "My BMW App" footer-adjacent promo
**Description:** Promotional block with the My BMW App icon, a one-line value claim, and platform-specific download buttons (App Store / Google Play). Used as a cross-link from owner pages and the global footer.

### page-loader

**Status:** `current`
**Live source:** `bmwusa.com` (visible class `loader-animation`)
**Description:** Page-load spinner element using the class `loader-animation`. Visual not directly inspected; presence of the class confirms the brand uses a custom-styled loader.

## §5 Surface inventory

- `bmwusa.com/vehicles/bmw-m/overview.html` — M overview marquee; dark canvas; "THE MOST POWERFUL LETTER" hero; explicit text on the M tri-stripe meaning ("The Bavarian Blue represents the ubiquitous BMW, the red stands for motorsports, and the violet is the combination of the two").
- `bmwusa.com/vehicles/bmw-m/models.html` — three-block model grid (High-Performance / Electrified-Performance / Performance); dark canvas; performance figures + MSRP per card; FAQ accordion beneath.
- `bmwusa.com/vehicles/m-series/m5-series/bmw-m5-sedan.html` — M5 Sedan page; dark canvas; full-bleed video hero; 717 hp / 3.4 sec spec cards; Kyalami Orange leather option.
- `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan.html` — M3 Sedan page; **light/white canvas with dark text**; tri-stripe in topnav + section headers; "Build yours" primary CTA in BMW blue.
- `bmwusa.com/vehicles/m-series/m3-series/bmw-m3-sedan-technical-highlights.html` — full technical spec table; alternating row backgrounds.
- `bmwusa.com/vehicles/m-series/xm/bmw-xm.html` — XM page; light canvas; 738 hp / 3.6 sec / 738 lb-ft performance trio; 11 paint-chip swatches.
- `bmwusa.com/vehicles/m-series/bmw-i4-m60/bmw-i4-m60-gran-coupe.html` — i4 M60 (electric M); light canvas; "Looks like an M / Drives like an M" copy; standard tri-stripe (no separate electric-blue accent).
- `bmwusa.com/limited-edition-vehicles/m4-csl.html` — M4 CSL limited-edition; dark canvas; "KNOW NO BOUNDS"; carbon-fiber / matte-black imagery; "Sign Up" CTA.
- `shop.bmwusa.com` — M Performance Parts shop; light canvas; product-card grid; multi-level category nav (M Performance Parts as root section).
- `bmwusa.com/owners.html` — owner portal; dealer locator with ZIP input + `warning-red` validation class.
- `commons.wikimedia.org/wiki/File:BMW_M_logo.svg` — canonical M-mark with metallic-gradient rendering; source of M-stripe hex stops.

## §6 Notes

- **Mixed-polarity catalogue.** The marquee surfaces (M overview, M models index, M5, M4 CSL) ship dark; the per-model surfaces (M3, XM, i4 M60) and the shop ship light. Token surface must support both — single-polarity dark (as the imported `tokens.css` does) breaks half the catalogue.
- **Footer is polarity-locked dark.** Across both light-canvas and dark-canvas pages, `bmwusa.com` ships the same dark footer. Don't lift it in dark mode — leave at `:root` value and treat it as a fixed-dark surface.
- **M-stripe is the only chromatic identity.** BMW M does not run a separate brand-accent palette — the tri-stripe (Bavarian Blue / Violet / Motorsport Red) carries 100% of the brand chroma; everything else is monochrome (black, white, near-black greys for cards, mid-greys for captions). Treat the three stripe colours as the brand-identity palette; do not synthesise additional chromatic accents.
- **Performance figures are typography, not chroma.** The "717 hp / 3.4 sec / 738 lb-ft" trio is rendered in display-weight monochrome numerals, not in a colour accent. Don't tint performance figures the way some auto brands tint stat displays.
- **No electric-blue accent for electric-M models.** The i4 M60 page deliberately retains the standard tri-stripe and uses copy ("Drives like an M") rather than a visual electric-blue treatment. Don't introduce one.
- **The tri-stripe origin is Texaco-sponsored, not purely Bavarian.** Logosbynick / 1000logos sources: the red stripe honours Texaco's sponsorship of BMW's early Motorsport years; the blue is the corporate Bavarian colour; the centre violet is the optical overlap of the two — *not* a documented standalone colour, which is why the centre stripe varies between `#003d68` (dark blue) and a more violet rendering across reproductions. BMW USA's own copy frames it as "Bavarian Blue / motorsports red / violet (combination)", consistent with the optical-overlap origin.
- **"BMW Type Next" is the brand typeface.** Carried in `tokens.css` as `BMWTypeNextLatin` — the `Latin` suffix is a packaging label, not a documented cut name. BMW Group brand-doc convention is BMW Type Next in Light / Regular / Bold. Live `bmwusa.com` pages did not expose explicit `font-family` declarations in HTML sampled (CSS bundled separately); typography family assertion rests on the carried token and BMW Group brand-doc convention.
- **All-caps display register.** "THE MOST POWERFUL LETTER", "THE M5", "THE M3", "THE NEW XM", "KNOW NO BOUNDS". Sentence-case is reserved for body copy and supporting paragraphs. When authoring brand-flavored aphorisms for the preview, mirror the all-caps register on hero headlines.
- **Brand-X-lift content to avoid:**
  - Specific model nameplates as content: M3, M4, M5, M2, X5 M, XM, i4 M60, M4 CSL, M3 CS, KITH M4 — these identify specific BMW products. Use generic "M-shaped" content if any vehicle-suggestive treatment is needed.
  - Performance figures lifted verbatim: "717 hp", "3.4 sec", "738 lb-ft", "453 hp", "3.9s 0-60 MPH". Use clearly-illustrative numerics that don't match any deployed M-vehicle's actual spec.
  - "THE MOST POWERFUL LETTER" tagline — verbatim BMW M property.
  - Paint names: "Sao Paulo Yellow", "Marina Bay", "Kyalami Orange", "Cape York", "Toronto", "Frozen Brilliant White", "Bilster Berg Grey" — every one of those is a BMW model paint option.
  - Texaco-origin language for the red stripe — accurate brand history, but lifting it verbatim into preview copy turns the preview into a BMW-marketing clone.

## §Known gaps

- **Live `bmw.com/en/m` not reachable.** The `bmw.com` primary domain and the `bmw-m.com` alias both timed out repeatedly through WebFetch and curl (HTTP/2 INTERNAL_ERROR and connection-timeout — characteristic of aggressive bot protection on the German-hosted BMW Group infrastructure). All live observations were sourced from `bmwusa.com` (the US-market mirror, which serves the same brand-identity surface on different infrastructure), the M Performance Parts shop (`shop.bmwusa.com`), and the canonical Wikimedia Commons BMW M logo SVG. Per the surface-inventory above, the US-market site carries the same tri-stripe, the same canvas-mix pattern, the same component vocabulary, and the same BMW Type Next typography — so the gap is in coverage of European-market launch surfaces (BMW M Festival, M Power Tour event pages, region-specific motorsport press) rather than in core brand-identity capture.
- **No first-party design-system documentation site.** BMW Group does not appear to publish a `developer.bmw.com` / `design.bmw.com` design-system reference. Token values are derived from the canonical M-logo SVG (`commons.wikimedia.org`) and from inferred observation of the live marketing surface. Brand-doc-canonical values (Pantone, RAL, BMW Group internal token names) are not in the public domain at the URLs sampled.
- **Configurator deep-link not sampled.** `/build-your-own.html#/studio/<code>` opens the configurator as a full-page tool. The configurator's internal component vocabulary (option selectors, price-running-total display, 3D-render viewport controls) was not sampled this cycle; the entry button + the routing pattern are what's captured.
- **`bmwusa.com/vehicles/m/<short>` URLs are 404.** The canonical model-page paths use `/vehicles/m-series/<series>/<full-name>.html`, not the shorter `/vehicles/m/<model>.html` form. The shorter paths in the original task prompt do not resolve on the US-market site.
- **M Festival / M Power Tour event pages not sampled.** These are seasonal / event-period surfaces and were not directly checked this cycle.
- **CSS bundle deep-inspection not performed.** WebFetch returned rendered HTML, not the linked CSS bundles. Exact `font-family` declarations, `background-color` computed values, and `box-shadow` definitions for cards / buttons are inferred from rendered observation rather than from CSS source. A chrome-devtools `evaluate_script` pass on each surface would tighten the §2 palette and §4 component vocabulary.
- **M3-page exact dark-text colour.** The M3 Sedan page renders headline text in "dark grey/black" per WebFetch summary — exact hex not exposed. Treat as `#000000` until a sampled value contradicts.
