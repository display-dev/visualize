---
slug: airtable-style
name: Airtable
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://airtable.com/
  - https://airtable.com/pricing
  - https://airtable.com/product
  - https://airtable.com/solutions
  - https://airtable.com/enterprise
  - https://airtable.com/login
  - https://airtable.com/developers
  - https://static.airtable.com/css/compiled/v2/brandkit-font.068c92a44c0dedb525c67796b57f0f8d253bec71.css
  - https://static.airtable.com/css/compiled/v2/pricing.2156716e96c377eb5066641e94d3424f0349f3c0.css
  - https://static.airtable.com/css/compiled/v2/helpers.2ff28a754de4b79168ebd72164c618efdb065b44.css
canonical-canvas: light
selection:
  mood: [minimal, productivity]
  tone: [confident, polished]
  formality: medium
  density: high
  canonical_canvas: light
  best_for: |
    Use for information-dense artifacts that need a confident, polished register with minimal, productivity visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# Airtable

## §1 Canonical canvas

Airtable ships two parallel canvases. The marketing surface (airtable.com) defaults to a white canvas with vivid hero stripes layered over it. The product surface (the actual base editor / app) wires up a complete `.theme-dark` token block — every semantic colour token has a documented dark counterpart in `pricing.css`. The signature voltage moments — the field-type-pill record grid, the cream/peach/forest hero stripes — stay polarity-locked and read as light-on-light identity rather than as theme-switchable surfaces.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Home | https://airtable.com/ | White (`#FFFFFF`) with stacked full-bleed bands in `#FCAB79` peach, `#C7E5F2` sky-blue, `#254FAD` navy, `#0A2E0E` forest | Hero band swaps colour per scroll section — the bands ARE the brand chrome, hero typography stays white-on-dark or black-on-light against whichever band |
| Pricing | https://airtable.com/pricing | White, plan cards on `gray25` (`#F9FAFB`) lift band | Pulls in `brandkit-font.css` + `helpers.css` + `pricing.css` — the canonical first-party design-system surface |
| Product | https://airtable.com/product | White with field-pill mockups | Field-type chip palette (the rainbow pill row) is the recognizability anchor |
| Solutions | https://airtable.com/solutions | White, cyan-anchored | Single-accent SVG illustrations all carry the cyan brand-accent fill |
| Enterprise | https://airtable.com/enterprise | White with dark `#181D26` nav | Layout mirrors home, hero stripes are tighter — single feature card per band |
| Login | https://airtable.com/login | White, centred form | Loads `compiled/all.css` only — minimal chrome, primary button uses `#2D7FF9` (historic Airtable action blue, distinct from the design-system `#166EE1`) |
| Developers | https://airtable.com/developers | White, docs-shape | Loads the same Next.js bundle but no inline accent palette — pure body content surface |
| Product app (auth-walled) | https://airtable.com/app/... | `.theme-dark` activates near-black `#1D1F25` canvas | Sampled indirectly via the `.theme-dark` block in `pricing.css` — every `--colors-*` token has a full dark override defined |

The `both` decision: marketing is light-canonical, but the product canvas has a complete first-party dark theme defined in the same stylesheet that drives the marketing nav. Treating Airtable as light-only erases half of the deployed token surface.

## §2 Palette

Airtable's identity has two distinct colour systems running in parallel. The **field-type rainbow palette** (`--palette-{hue}-{hue}` with `Dark1/Dusty/Light1/Light2/Light3` stops) is the historic record-pill vocabulary — ten hues at six stops each, vivid and saturated, used in the database UI to colour-code selects, kanban lanes, and gallery cards. The **gray scale** (`--palette-gray-gray{25..900}` plus `--palette-neutral-*` aliases) anchors product chrome — twelve cool-blue-tinted neutral stops, hue ≈ 264-271, that drive every surface, border, and body-text role through the `--colors-*` semantic alias layer.

Layered on top: the **marketing hero stripe palette** (peach `#FCAB79`, sky-blue `#C7E5F2`, navy `#254FAD`, forest `#0A2E0E`) is a separate four-colour set the homepage uses as alternating full-bleed bands. These are inline `backgroundColor` declarations on the home page hero, not tokenized anywhere in the brandkit — they're marketing-art-direction, not part of the design-system token surface. Treat them as documented accent surfaces for marketing-shape preview but route the product token vocabulary off the gray scale + palette-blue family.

### Brand primary

The semantic primary in the design system is `--palette-blue-blue` = `rgb(22, 110, 225)` = `#166EE1`, mapped to `--colors-background-primary-control` and `--colors-hyperlink-primary`. The marketing nav resolves to the lighter `#0768F8` for `--mainNavCtaBackground` / `--mainNavButtonBackgroundPrimary` in light mode and falls to `#1B61C9` in dark mode. The login page ships a separate historic value `#2D7FF9` (visible on the SSO continue button) — three blues coexist across surfaces, all readable as "Airtable Blue" but technically distinct.

- `--primary`: `oklch(0.5573 0.1921 257.9488)` (= `#166EE1`). Live: pricing.css — `--palette-blue-blue` token; resolves to `--colors-background-primary-control`, `--colors-hyperlink-primary`, `--colors-border-focus`.
- `--brand-primary-active`: `oklch(0.4548 0.1580 258.0044)` (= `#0D52AC`). Live: pricing.css — `--palette-blue-blueDark1`; used for `:active` and `:hover-emphasis` states.
- `--brand-primary-soft`: `oklch(0.8197 0.0907 258.3247)` (= `#A0C6FF`). Live: pricing.css — `--palette-blue-blueLight1`; used as the dark-mode hyperlink colour.
- `--brand-primary-tint`: `oklch(0.9700 0.0140 268.4943)` (= `#F1F5FF`). Live: pricing.css — `--palette-blue-blueLight3`; informational backgrounds.

### Documented secondary brand colours

The rainbow accent set. These are documented as `--palette-{hue}-{hue}` in the first-party token system and surface across the field-pill row, the kanban-lane colour pickers, and the marketing illustration accents. Each hue has a six-stop ladder; the headline (`{hue}`) value is the saturated full-chroma stop.

- `--brand-accent-cyan`: `oklch(0.7867 0.1390 227.8985)` (= `#39CAFF`). Live: pricing.css — `--palette-cyan-cyan`; also the dominant SVG-illustration accent on /solutions.
- `--brand-accent-teal`: `oklch(0.8100 0.1397 190.1305)` (= `#01DDD5`). Live: pricing.css — `--palette-teal-teal`.
- `--brand-accent-green`: `oklch(0.5496 0.1826 142.9867)` (= `#048A0E`). Live: pricing.css — `--palette-green-green`; mapped to `--colors-border-success`.
- `--brand-accent-yellow`: `oklch(0.8310 0.1708 81.4330)` (= `#FFBA05`). Live: pricing.css — `--palette-yellow-yellow`; the `--brand-signature-yellow` value upstream resolved this exact stop.
- `--brand-accent-orange`: `oklch(0.5884 0.1910 38.2861)` (= `#D54401`). Live: pricing.css — `--palette-orange-orange`.
- `--brand-accent-red`: `oklch(0.5670 0.2263 19.5952)` (= `#DC043B`). Live: pricing.css — `--palette-red-red`.
- `--brand-accent-pink`: `oklch(0.6021 0.2569 342.9448)` (= `#DD04A8`). Live: pricing.css — `--palette-pink-pink`; mapped to `--colors-foreground-accent-ai`.
- `--brand-accent-purple`: `oklch(0.5400 0.2514 292.9484)` (= `#7C37EF`). Live: pricing.css — `--palette-purple-purple`.

The marketing-only hero-stripe palette is separate from the field-pill set:

- `--brand-signature-peach`: `oklch(0.8092 0.1158 52.1184)` (= `#FCAB79`). Live: home.html — `backgroundColor: '#FCAB79'` on the first hero stripe section.
- `--brand-signature-skyblue`: `oklch(0.9041 0.0363 225.7806)` (= `#C7E5F2`). Live: home.html — second hero stripe.
- `--brand-signature-navy`: `oklch(0.4553 0.1579 263.3369)` (= `#254FAD`). Live: home.html — third hero stripe; also `--mainNavButtonTextSecondaryHover` light.
- `--brand-signature-forest`: `oklch(0.2667 0.0693 145.1375)` (= `#0A2E0E`). Live: home.html — fourth hero stripe and the deepest band on the page.
- `--brand-signature-cream`: `oklch(0.9705 0.0180 89.3563)` (= `#FAF5E8`). Live: home.html — interlude band between hero stripes.
- `--brand-signature-mustard`: `oklch(0.8175 0.1606 77.5964)` (= `#FCB42A`). Live: home.html — accent foreground on the forest hero stripe.

### Canvas + neutrals

The neutral spine is the `--palette-gray-gray{25..900}` ladder — cool-blue-tinted (hue ≈ 264-271), chroma 0.005-0.017. These drive every `--colors-*` semantic alias.

- `--background`: `oklch(1 0 0)` (= `#FFFFFF`). Live: pricing.css — `--colors-background-default` light maps to `--palette-neutral-white`. Dark variant: `oklch(0.2398 0.0119 270.8831)` (= `#1D1F25`) via `--palette-gray-gray800`.
- `--foreground`: `oklch(0.2398 0.0119 270.8831)` (= `#1D1F25`). Live: pricing.css — `--colors-foreground-default` light maps to `--palette-neutral-black` which aliases `--palette-gray-gray800`. Dark variant: `oklch(1 0 0)` (white).
- `--card`: `oklch(1 0 0)` (white). Live: pricing.css — `--colors-background-raised-surface` light. Dark variant: `oklch(0.2398 0.0119 270.8831)` (`gray800`).
- `--card-foreground`: tracks `--foreground`. Live: derived from `--colors-foreground-default`.
- `--popover`: tracks `--card`. Live: pricing.css — `--colors-background-raised-popover` light = white, dark = `gray800`.
- `--popover-foreground`: tracks `--foreground`.
- `--muted`: `oklch(0.9668 0.0058 264.5324)` (= `#F2F4F8`). Live: pricing.css — `--colors-background-subtle` light = `gray75`. Dark variant: `oklch(0.3287 0.0169 266.4281)` (= `#31353E`, `gray700`).
- `--muted-foreground`: `oklch(0.5094 0.0170 264.4134)` (= `#616670`). Live: pricing.css — `--colors-foreground-subtle` light = `gray500`. Dark variant: `oklch(0.6856 0.0094 264.5039)` (= `#979AA0`, `gray400`).
- `--accent`: `oklch(0.9787 0.0057 264.5327)` (= `#F6F8FC`). Live: pricing.css — `--colors-background-subtler` light = `gray50`. Dark variant: `oklch(0 0 0)` (true black).
- `--accent-foreground`: tracks `--foreground`.
- `--secondary`: tracks `--muted` (`gray75` light, `gray700` dark). Live: pricing.css — Airtable doesn't expose a distinct "secondary" surface token; the secondary button variant pulls from `--colors-background-raised-control`.
- `--secondary-foreground`: tracks `--foreground`.
- `--destructive`: `oklch(0.4895 0.1885 12.8578)` (= `#B10F41`). Live: pricing.css — `--colors-border-negative` = `--palette-red-redDark1`. Dark variant inherits same value (polarity-stable; this is the red-on-light + red-on-dark ink, not a fill).
- `--destructive-foreground`: `oklch(1 0 0)` (white) on filled destructive controls.
- `--border`: `oklch(0 0 0 / 0.05)` (synthesised — `--colors-border-subtle` light = `--palette-opacity-darken1`). Live: pricing.css — Airtable uses opacity-based borders (`rgba(0,0,0,0.05)` light / `rgba(255,255,255,0.05)` dark) rather than solid-colour borders.
- `--input`: tracks `--border`. Live: pricing.css — `--colors-border-default` = `--palette-opacity-darken2` (light) / `--palette-opacity-lighten2` (dark).
- `--ring`: `oklch(0.5573 0.1921 257.9488)` (= `#166EE1`). Live: pricing.css — `--colors-border-focus` = `--palette-blue-blue` in both themes.

### Polarity-locked surfaces

Marketing hero stripes are polarity-locked — Airtable never inverts these to a lighter peach or paler navy in a dark mode. They're brand-art direction baked into the marketing rhythm.

- `--brand-signature-peach`: `oklch(0.8092 0.1158 52.1184)` (= `#FCAB79`). Live: home.html stripe 1; never overridden across surfaces.
- `--brand-signature-navy`: `oklch(0.4553 0.1579 263.3369)` (= `#254FAD`). Live: home.html stripe 3; same value reused as `--mainNavButtonTextSecondaryHover` in light theme.
- `--brand-signature-forest`: `oklch(0.2667 0.0693 145.1375)` (= `#0A2E0E`). Live: home.html stripe 4; the deepest brand surface on the marketing site.
- `--brand-signature-cream`: `oklch(0.9705 0.0180 89.3563)` (= `#FAF5E8`). Live: home.html cream interlude band.
- `--brand-pricing-ink`: `oklch(0.2398 0.0119 270.8831)` (= `#1D1F25`). The always-dark ink for the polarity-locked light surfaces (pricing tier card body, field-pill labels on light chips). Same value as `--palette-gray-gray800` — coincidence of the same hex but role-distinct: locked-dark-on-locked-light, not theme-flippable.
- `--brand-surface-dark`: `oklch(0.2398 0.0119 270.8831)` (= `#1D1F25`). Live: pricing.css — `--mainNavBackground` resolves to this in dark / "theme-black" nav variant; also the product canvas itself.

### Hairlines / dividers

Airtable's dividers are opacity-based, not solid-colour. The pattern: black-at-low-alpha on light, white-at-low-alpha on dark — so they read as the same visual weight regardless of theme.

- `--brand-hairline-soft`: `rgba(0, 0, 0, 0.05)` = `--palette-opacity-darken1`. Live: pricing.css — `--colors-border-subtle` light. Dark counterpart: `rgba(255, 255, 255, 0.05)`.
- `--brand-hairline-strong`: `oklch(0.6665 0.0000 0.0000)` (= `#949494`, `--palette-gray-gray350`). Live: pricing.css — `--colors-border-emphasis` light; pure-gray no-chroma, the only such stop in the gray ladder. Dark counterpart: `rgba(255, 255, 255, 0.25)` = `--palette-opacity-lighten3`.

### Drift vs `tokens.css`

The current `tokens.css` has notable drift vs the live brand:

1. **`--primary` is set to the foreground ink (`oklch(0.2299 0.0191 262.1114)` = `#1D2129`), not the brand blue.** The live brand uses `#166EE1` as `--colors-background-primary-control` and as the primary interactive colour everywhere — buttons, links, focus rings. Reconciliation: swap `--primary` and `--ring` to `oklch(0.5573 0.1921 257.9488)`; the dark `#1D1F25` ink is what `--foreground` already encodes.
2. **`--brand-primary-active` value of `oklch(0.1799 0.0147 253.2188)` is darker than the live `--palette-blue-blueDark1`** which lands at `oklch(0.4548 0.1580 258.0044)` (`#0D52AC`). The current value is an over-darkened approximation of the brand-blue-active. Reconciliation: lift to the documented `palette-blue-blueDark1` value.
3. **`--brand-link` (`oklch(0.5125 0.1758 259.0877)`) is close but slightly off** from the documented `palette-blue-blue` `oklch(0.5573 0.1921 257.9488)`. Same ink, drift of 0.045 lightness. Reconciliation: snap to the canonical value.
4. **`--brand-signature-mint` (`oklch(0.8428 0.0573 167.5796)`)** doesn't appear in the live first-party palette. The closest documented stop is `--palette-teal-tealLight1` `oklch(~0.88 ~0.082 ~190)`. Likely a paraphrase of the mint/teal pill colour; reconcile to the documented teal stop if used, otherwise mark as "decorative-only, not in brandkit."
5. **`--brand-signature-coral` (`oklch(0.4894 0.1675 36.0214)` = `#AA2D00`)** matches `--palette-orange-orangeDark1` exactly — the labelling drift is the issue ("coral" reads warmer than this rust-orange value). Reconciliation: rename to `--brand-signature-rust` or `--brand-accent-orange-dark`, or shift the OKLCH value up to a true coral.
6. **`--font-display: Haas Groot Disp` is misspelled** — the live brand-kit ships `HaasDisplay` (`@font-face` family name in brandkit-font.css). The typo "Groot" should be "Grotesk Display" or simply "HaasDisplay" (which is what the brand-kit @font-face declares). The legacy synthesised `Haas, sans-serif` fallback for `--font-sans` is also wrong: live `--font-family-body` is `-apple-system, system-ui, BlinkMacSystemFont, ...` — Airtable ships HaasText for marketing chrome but defaults body to system stack. Reconciliation: declare `--font-sans: -apple-system, system-ui, ...; --font-display: 'Inter Display', 'HaasDisplay', system-ui, sans-serif;`.
7. **`--text-base: 14px` is one notch larger than the live brand** — the documented `--font-size-body-default: 13px` in pricing.css. Reconciliation: 13px aligns with the brandkit; 14px is the catalog default that doesn't match.

## §3 Typography

Airtable's documented type families across surfaces:

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (marketing) | `HaasDisplay` (Neue Haas Grot Display Round) → fallback `-apple-system, system-ui, BlinkMacSystemFont` | 500 (medium) | clamp(36px, 5vw, 64px) — observed `font-size-heading-xxxlarge: 35px` as the bottom of the range | 1.05-1.1 (tight) | -0.01em |
| Heading (app + product UI) | `Inter Display` → fallback `-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | 500-600 | `--font-size-heading-{xxsmall..xxxlarge}` ladder: 13/15/17/21/23/27/31/35px | 1.1-1.25 | normal |
| Heading (legacy) | `GT Eesti Display` → same fallback chain | 500-600 | same ladder | same | same |
| Title | `Inter Display` (heading family) | 500-600 | 17-23px | 1.2 | normal |
| Body | `HaasText` on marketing chrome; `-apple-system, system-ui` everywhere else | 400 (regular) / 500 (medium) | `--font-size-body-default: 13px`, `body-large: 15px`, `body-small: 11px`, `body-xsmall: 9px` | 1.4-1.5 | normal |
| Caption | system stack | 400 | 11-13px | 1.4 | normal |
| Mono | `Menlo, Courier, monospace` | 400 | 12-13px | 1.5 | normal |

Notes on type behaviour observed:

- **Three concurrent display families** — Haas Grot Round (marketing chrome via brandkit-font.css), Inter Display (semantic heading family in the design system), GT Eesti Display (legacy heading, still referenced as `--font-family-heading-legacy`). The brand is migrating from GT Eesti → Inter Display in the design system, with Haas Grot retained for marketing chrome. Author against `Inter Display` for current product feel; reach for HaasDisplay for marketing-mock surfaces.
- **Body-size floor of 13px**, not 14px. The brand specifies `--font-size-body-default: 13px` and `--font-size-body-small: 11px` — denser than most current product UIs. This density is part of the brand register; preserve it in mockups rather than upsizing to a 14/15px catalog default.
- **No variable-axis usage observed.** Inter Display ships variable-weight on the public CDN, but Airtable serves it via Google Fonts (or `@font-face` declarations not visible in the sampled CSS) without explicit variation-settings rules.
- **Heading sizes climb in 2-4px steps** — 13/15/17/21/23/27/31/35 (no 19, no 25, no 29). Unusual rhythm; the gaps suggest the system is hand-tuned to two distinct ramps that meet in the middle.

## §4 Component vocabulary

### Primary button (marketing — `data-variant="primary"`)

**Status:** `current`
**Live source:** `https://airtable.com/` — `<button data-variant="primary">` in hero CTA, `BkButton-module-scss-module__dZ-VXq__bkButton`
**Description:** Pill-rounded rectangle, height `~44px` at default size, padding ~14px x 24px, border-radius `--radius-round-big: 6px`. Background `#0768F8` (mainNav primary), text `#FFFFFF` weight 500, font-family Inter Display. Subtle inset shadow stack: `0px 0px 1px #00000052, 0px 0px 2px #00000014, 0px 1px 3px #2D7FF947, inset 0px 0px 0px 0.5px #0000000F`. Hover: gradient overlay `linear-gradient(0deg, #FFFFFF1F, #FFFFFF1F)` on top of `#0768F8`. Active: `#1A3866` deep navy.
**States:** default `#0768F8`, hover lightened overlay, active deep navy `#1A3866`, focus `#0768F8` with `2px #0768F880` ring + inset white 1px, disabled `#E0E2E6` with text `#41454D`, loading dim overlay.

### Primary button — inverse (`data-variant="primary-inverse"`)

**Status:** `current`
**Live source:** `https://airtable.com/` — "Explore all customer stories" CTA on dark/coloured hero sections, `BkButton-module-scss-module__dZ-VXq__primary-inverseTheme`
**Description:** Same shape as primary but background `#181D26` (deep ink) and text white. Used when the surrounding hero stripe is light enough (peach, cream, sky-blue) that the regular blue button doesn't carry. Class `blackBtnTheme` reinforces.
**States:** default `#181D26`, hover `#040E20B0` (semi-transparent), active `#070C14D1`, focus same with ring.

### Secondary button (`data-variant="secondary"`)

**Status:** `current`
**Live source:** `https://airtable.com/` — "Book demo" CTA next to primary
**Description:** Pill rectangle, transparent or low-opacity white background depending on nav theme. On light: 1px inset border `#0114351F` with shadow stack matching primary. On dark theme nav: `#FFFFFF29` (semi-transparent white) with no border. Text colour follows context — `#181D26` on light, white on dark.
**States:** default transparent/light, hover inset border lifts to `#458FFF` (blue), active deeper border, focus `2px #0768F880` ring.

### Tertiary / text link button

**Status:** `current`
**Live source:** `https://airtable.com/` — "Show less" / "See more" footer accordions
**Description:** No background, text in `#181D26` light / `#F9FCFFF7` dark, underline on hover. Used for low-emphasis affordances and footer navigation toggles.
**States:** default uncoloured text, hover underline + `#254FAD` light / `#95BEFC` dark tint, focus blue ring with inset visual.

### Marketing nav (`Nav-module_headerWrap__3rK1K`)

**Status:** `current`
**Live source:** `https://airtable.com/` — sticky top nav, height `--mainNavHeight: 79px`
**Description:** Full-width bar with white background `--mainNavBackground: #FFF` in light theme, `#181D26` in `themeBlack` variant. Logo on left (Airtable wordmark, dark on light), expandable menu groups (Platform / Solutions / Resources) middle, "Book demo" + "Sign in" CTAs right. Border-bottom is a 1px `--palette-opacity-darken2` hairline. Mobile drawer collapses via `Drawer-module_navDrawerWrap__2_nGi`.
**States:** static (no shrink-on-scroll observed), accordion-expand on hover for menu groups, drawer toggle on mobile.

### Field-type pill (single-select / multi-select chip)

**Status:** `current`
**Live source:** `https://airtable.com/product` and field-type docs at support.airtable.com — option-value pills in record cells
**Description:** Rounded rectangle, border-radius `100px` (full-pill), height ~24px, padding ~4px x 10px, text size 13px medium weight. Background uses one of ten `palette-{hue}-{hue}Light2` stops (blueLight2 / cyanLight2 / tealLight2 / greenLight2 / yellowLight2 / orangeLight2 / redLight2 / pinkLight2 / purpleLight2 / grayLight2). Text uses the matching `Dark1` stop for the same hue (e.g. `palette-cyan-cyanLight2` background + `palette-cyan-cyanDark1` foreground). This Light2/Dark1 pairing is the recognizability anchor of the brand — ten distinct hue pills, each self-contained.
**States:** default Light2 fill, hover Light1 fill (slightly more saturated), no border, no shadow.

### Card (raised surface)

**Status:** `current`
**Live source:** `https://airtable.com/pricing` — tier cards
**Description:** White background (`--colors-background-raised-surface`), border-radius `12px` (`--radius-round-huge`), padding 24-32px, elevation-low shadow `0 0 2px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.08)`. Internal hierarchy: eyebrow label small uppercase quiet, tier name large weight 500, price huge weight 500, feature list with check icons, primary CTA at bottom.
**States:** default white surface low-shadow, hover `--colors-background-raised-surface-hover` (no visible shift on light, `gray700` lift on dark), no pressed state.

### Pricing tier card (highlighted variant)

**Status:** `current`
**Live source:** `https://airtable.com/pricing` — "Team" or "Business" plan
**Description:** Same shape as base card but with subtle accent strip or inset border in `#166EE1` (action blue) along the top edge ~3px, plus an "Most popular" eyebrow badge above the eyebrow. Padding identical, elevation slightly higher (`--elevation-medium`). FAQ data confirms tier names "Free", "Team" ($20/user/mo), "Business" ($45/user/mo), "Enterprise Scale" (custom).
**States:** default highlighted, otherwise tracks the base card.

### Form input

**Status:** `current`
**Live source:** `https://airtable.com/login` — email field
**Description:** Single-line rectangle, height ~40px, border 1px `#0114351F` (opacity-darken-2), border-radius `6px` (`--radius-round-big`), padding 8px x 12px, font-size 13px Inter family. Background `#FFFFFF`. Focus ring `2px #0768F880` with border lifting to `--palette-blue-blue` `#166EE1`.
**States:** default white with hairline, hover slightly darker border, focus blue ring, disabled `#F2F4F8` (`gray75`) background + `--colors-foreground-subtle` text.

### SSO provider button (Google / Microsoft / SAML)

**Status:** `current`
**Live source:** `https://airtable.com/login` — provider buttons, `shadow-elevation-low colors-background-raised-control`
**Description:** Rectangular button, border-radius `6px` (`rounded-big`), height ~44px, white background, `elevation-low` shadow (`0 0 2px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.08)`), text colour `--colors-foreground-default` (`#1D1F25`), provider logo aligned left. No border — relies on shadow for surface separation. Continue button differs: filled `#2D7FF9` (historic Airtable blue, distinct from `#166EE1` design-system blue) with white text.
**States:** default low shadow, hover `shadow-elevation-low-hover` (slightly larger), focus blue ring.

### Checkbox

**Status:** `current`
**Live source:** Inferred from `--colors-background-checked-control: var(--palette-blue-blue)` and `--colors-background-switch-handle` in pricing.css; also visible on the marketing form modules.
**Description:** Square, 16px x 16px (default) or 20px x 20px (large), border-radius `2px` (`--brand-radius-xs`), 1px border `--colors-border-default` opacity-darken-2. When checked, background fills with `#166EE1` (`--colors-background-checked-control`) and shows white check glyph. Indeterminate state shows a horizontal bar instead of check.
**States:** unchecked white with hairline, hover border darkens, checked solid `#166EE1` with white glyph, disabled `gray75` background, focus blue ring.

### Switch / toggle

**Status:** `current`
**Live source:** Inferred from `--colors-background-switch-track` / `--colors-background-switch-handle` tokens in pricing.css
**Description:** Capsule track height ~20px width ~36px, border-radius full pill. Off-state track `--palette-gray-gray200` (`#DADEE6`); on-state track `--palette-blue-blue` (`#166EE1`). Handle is white circle 16px diameter with `elevation-low` shadow. Animates from left to right on toggle.
**States:** off gray track / left handle, on blue track / right handle, hover track darkens one stop, focus blue ring around handle.

### Foreign-key / linked-record pill

**Status:** `current`
**Live source:** Inferred from `.foreign-key-blue{background-color:var(--colors-background-raised-control)}` in pricing.css — linked-record cell visual
**Description:** Inline pill shaped like the field-type chip, but locked to the action-blue family in light or to `--colors-background-raised-control` (white with shadow) in dark. Used to render a linked-record reference in the database grid — name text with a "↗" right-pointing-arrow icon affordance.
**States:** default blue, hover slightly darker, clickable cursor on hover.

### Single-select dropdown trigger

**Status:** `current`
**Live source:** Same as field-type pill — dropdown trigger renders the currently-selected option as the pill itself, with a small chevron-down icon to its right.
**Description:** Same shape and Light2/Dark1 colour pairing as the pill, with caret-down icon (12-14px) right-aligned outside the pill but inside the cell. Opens a popover with the option list.
**States:** static pill default, hover row-cell highlight, open popover with item rows.

### Popover / dropdown menu

**Status:** `current`
**Live source:** Inferred from `--colors-background-raised-popover` token in pricing.css
**Description:** White card in light (`--palette-neutral-white`), `gray800` `#1D1F25` in dark. Border-radius `12px` (`--radius-round-huge`), shadow `--elevation-medium` (`0 0 0 1px gray700, ...`), padding 4-8px. Internal rows hover-highlight with `--colors-background-raised-surface-hover` (`gray700` dark / no-shift light) and 13px Inter body text.
**States:** open with shadow, item-row hover highlight, focused row with `--colors-background-selected-blue` `rgba(22,110,225,0.05)` tint.

### Modal / dialog

**Status:** `current`
**Live source:** Inferred from `--colors-background-modal-backdrop: rgba(0,0,0,0.25)` token
**Description:** Centred card on a 25%-opacity-black backdrop. Card uses `--colors-background-raised-surface` (white light / gray800 dark), `--radius-round-huge` (12px), elevation-high shadow. Header row with title (heading-large 23px) + close icon, scrolling body, footer with primary + secondary buttons right-aligned.
**States:** open with backdrop fade-in, close on backdrop click or icon.

### Table / database grid row

**Status:** `current`
**Live source:** `https://airtable.com/product` — embedded grid mockups; `pricing.css` carries the grid-cell + header tokens
**Description:** Header row uses `--colors-background-subtle` `#F2F4F8` `gray75` background, 13px font Inter weight 500, height ~32px. Data rows alternate `--colors-background-default` (white) — no zebra striping observed in mockups, plain white. Row height ~32px. Cell borders use `--colors-border-subtle` `rgba(0,0,0,0.05)` 1px hairlines on right + bottom. First column typically pins as primary field with name in foreground colour.
**States:** row hover lifts to `--colors-background-raised-surface-hover`, cell focus blue ring around the cell border.

### Database column header

**Status:** `current`
**Live source:** Inferred from `--font-size-heading-xxsmall: 13px` + the `gray75` subtle background pattern
**Description:** Compact label inside the table header row. Field-type icon on the left (Single line text → text-icon, Date → calendar-icon, Attachment → paperclip-icon, Number → hash-icon, Checkbox → check-square-icon), field name middle, sort/filter icon trigger on right. Text colour `--colors-foreground-default`, icon colour `--colors-foreground-subtle` `gray500`. Each field type icon is monochrome at column-header level — colour shows up in the data cell pills, not the header.
**States:** default static, hover reveals filter/sort affordances on right edge.

### Eyebrow label (`data-testid="bkEyebrow"`)

**Status:** `current`
**Live source:** `https://airtable.com/pricing` — eyebrow above tier card name
**Description:** Small uppercase text, ~11px (`--font-size-body-small`), letter-spacing wide, colour `--colors-foreground-subtle` `gray500` light / `gray400` dark. Used as section eyebrow on marketing surfaces (above section titles) and tier eyebrow on cards.
**States:** static only.

### Hero band (full-bleed marketing stripe)

**Status:** `current`
**Live source:** `https://airtable.com/` — stacked sections with inline `backgroundColor` `#FCAB79` / `#C7E5F2` / `#254FAD` / `#0A2E0E`
**Description:** Full-width section, no border-radius, padding-block 80-120px, padding-inline `max(5vw, 32px)`. Hosts a headline (display-size HaasDisplay or Inter Display 500), short body paragraph, primary CTA button, and an illustration or embedded video on the right half. The four colours rotate — peach, sky-blue, navy, forest — across the home page, then a cream interlude band between hero sequences. Foreground colour flips to maintain contrast: black-on-peach, black-on-sky, white-on-navy, white-on-forest, mustard-yellow accent on forest.
**States:** static.

### Logo strip / customer-logo band

**Status:** `current`
**Live source:** `https://airtable.com/` — customer-validation logo strip below hero (Glassdoor, Autodesk, Time, etc. — visible in /solutions hero too)
**Description:** Horizontal row of customer wordmark SVGs, ~6-8 per row, height ~32-40px, monochrome (dark grey or muted) against the section's canvas. Padding-block ~48px, padding-inline matches surrounding container. No card or border.
**States:** static.

### Accordion / FAQ row

**Status:** `current`
**Live source:** `https://airtable.com/pricing` — `data-testid="accordion panel body"` FAQ section at bottom of pricing
**Description:** Row with question text (heading-xsmall 15px Inter weight 500) left-aligned, chevron-right icon right-aligned that rotates to chevron-down when expanded. Border-bottom 1px `--palette-opacity-darken1` hairline. Expanded body uses `--font-size-body-default` 13px Inter regular, padding-block 16-24px, colour `--colors-foreground-subtle` `gray500`.
**States:** collapsed with chevron-right, hover row background `--colors-background-subtler`, expanded with chevron-down + body visible, focus blue ring around row.

### Tab / segmented control

**Status:** `current`
**Live source:** Inferred — Airtable uses tabbed sections on pricing comparison and feature-tour pages; the underlying token `--colors-background-selected: var(--palette-opacity-darken1)` drives the active-tab fill
**Description:** Horizontal row of text labels with `--colors-background-selected` `rgba(0,0,0,0.05)` background on the active tab, `transparent` on inactive. Border-radius `--radius-round-default` (3px) per tab in pill-segmented variant or a bottom 2px `--palette-blue-blue` border underline in tab-bar variant. Active tab text weight 500, inactive weight 400.
**States:** active filled, inactive transparent, hover slight darken, focus blue ring.

### Tag / status badge

**Status:** `current`
**Live source:** Inferred from the field-pill pattern + the various `--colors-background-informational` / `success` / `notice` / `negative` tokens
**Description:** Same pill shape as the field-type chip but tied to a semantic state. `--colors-background-informational` `palette-blue-blueLight3` `#F1F5FF` + foreground `palette-blue-blueDark1` `#0D52AC` for info. `--colors-background-success` `palette-green-greenLight3` `#E6FCE8` + foreground `palette-green-greenDark1` `#006400` for success. `--colors-background-notice` `palette-yellow-yellowLight3` `#FFF6DD` + foreground `palette-yellow-yellowDark1` `#AF6002` for warning. `--colors-background-negative` `palette-red-redLight3` `#FFF2FA` + foreground `palette-red-redDark1` `#B10F41` for error.
**States:** static only.

### Search input

**Status:** `current`
**Live source:** Inferred from form-input tokens + nav search affordance
**Description:** Same shape as the form input but with a leading search-glass icon (~14px) and rounded-full pill border-radius. Placeholder text in `--colors-foreground-subtle` (`gray500`).
**States:** default, focus blue ring, with-query shows clear-x button at right.

### Avatar

**Status:** `current`
**Live source:** Inferred — Airtable's user / collaborator chips render as initials-in-circle
**Description:** Circle, default 24px or 32px, border-radius `--brand-radius-pill` (full circle). Background colour pulled from the field-type rainbow palette deterministically by user-name hash (e.g. user "Jordan" might land on `palette-purple-purpleLight1`, user "Morgan" on `palette-teal-tealLight1`). Foreground is the matching `Dark1` ink for the same hue. Text content is the user's initials in 11-13px Inter weight 500.
**States:** static, with online-presence dot in `--palette-green-green` `#048A0E` at bottom-right when active.

### Tooltip

**Status:** `current`
**Live source:** Inferred — Airtable's grid surfaces show tooltips on icon hover; pricing.css carries the `--colors-foreground-default` pair for inverted-on-dark surface
**Description:** Small floating label, padding 6px x 10px, border-radius `--radius-round-default` 3px or `--radius-round-big` 6px, background `--colors-background-raised-popover` (white light / `gray800` dark), text `--colors-foreground-default` 11px Inter weight 400. Elevation-low shadow + 8-12px offset from anchor element with caret arrow pointing back at it.
**States:** appears on hover after ~600ms delay, disappears on mouse-leave.

### Footer

**Status:** `current`
**Live source:** `https://airtable.com/` — footer below CTA stripe, ~5 link groups
**Description:** Dark `#181D26` (`gray800`) background, full-width, padding-block 64-80px. Five column groups (Platform / Solutions / Resources / Learn / Company) with section titles in `--colors-foreground-default` (white on dark) weight 500 + 13px, link items in `--colors-foreground-subtle` (`gray400` on dark `#979AA0`) regular. Below: social-icon row (Facebook / LinkedIn / Twitter / Instagram / YouTube), legal links (Security / Privacy / Terms), App Store + Google Play badges.
**States:** link items hover lift to white foreground, social icons hover lift.

### Inline code

**Status:** `current`
**Live source:** `https://airtable.com/developers` — API docs code spans
**Description:** Background `--colors-background-subtle` (`gray75` light / `gray700` dark), padding 2px x 6px, border-radius `--brand-radius-xs` 2px, font `Menlo, Courier, monospace` 12-13px, colour `--colors-foreground-default`.
**States:** static.

### Code block (pre)

**Status:** `current`
**Live source:** `https://airtable.com/developers` — API request/response samples
**Description:** Larger code container, padding 16-24px, border-radius `--radius-round-big` 6px, background `--colors-background-subtle` (light) or `--colors-background-inset-surface` (dark `gray900` `#11121A`), `font-family-mono` 13px, optional language label at top-right, optional copy-button at right edge.
**States:** copy-button shows on hover, "Copied" feedback on click.

### Blog post card

**Status:** `current`
**Live source:** `https://blog.airtable.com/` (verified the redirect; full surface returned 403 on direct fetch — content sampled via marketing site link previews instead)
**Description:** Image-top card with rounded-big 6px image, title in heading-small 17px Inter weight 500, eyebrow tag (category chip from the rainbow palette), body excerpt in `--font-size-body-default` 13px gray500, author name + date below in body-small 11px.
**States:** card hover lifts shadow from low to medium.

### Inline link

**Status:** `current`
**Live source:** All marketing surfaces — `--colors-hyperlink-primary: var(--palette-blue-blue)` in pricing.css
**Description:** Underlined or no-decoration text in `--colors-hyperlink-primary` (`#166EE1` light / `#A0C6FF` dark), weight inheriting context. Hover `--colors-hyperlink-primary-hover` (`blueDark1` `#0D52AC` light / `blueLight2` `#D1E2FF` dark).
**States:** default blue, hover slightly darker, visited unchanged (no separate visited state observed), focus blue ring inset.

### Eyebrow chip — "New" / "Beta"

**Status:** `current`
**Live source:** Inferred — Airtable marks new product features (Field Agents, HyperDB, Omni) with small pill badges; same as the tag/status badge pattern in informational variant
**Description:** Mini pill (12-14px tall), padding 1px x 6px, background `--colors-background-informational` (blue tint), foreground `--colors-foreground-accent-informational` (`blueDark1` light / `blueLight1` dark), font-size `--font-size-body-xsmall` 9px Inter weight 500 uppercase, letter-spacing wide.
**States:** static.

### Empty-state illustration block

**Status:** `current`
**Live source:** `https://airtable.com/solutions` — team-category cards
**Description:** Square or 4:3 illustration container, padding 32-48px, illustration centred (single-accent SVG in cyan `#39CAFF` against light surface), heading-xsmall 15px below, body 13px below that, optional "Explore →" link in `--colors-hyperlink-primary`.
**States:** static, illustration may animate subtly on hover (observed in marketing-card mockups).

### Pagination / breadcrumb

**Status:** `current`
**Live source:** Inferred from /developers docs surface
**Description:** Horizontal text-link sequence separated by `/` glyph in `--colors-foreground-subtler` (gray400) at body-small 11px. Current page item in `--colors-foreground-default` weight 500. Used in nested docs structure.
**States:** static link, hover underlines or shifts to `--colors-hyperlink-primary-hover`.

### Toast notification

**Status:** `current`
**Live source:** Inferred from `--colors-background-raised-popover` + `--elevation-medium` tokens; pricing.css carries the dark-elevated surface
**Description:** Floating card at top-right or bottom-center, padding 12-16px, border-radius `--radius-round-huge` 12px, background `--colors-background-raised-popover` (white light / `gray800` dark), elevation-medium shadow. Icon left (`--colors-foreground-accent-success` for success, `accent-negative` for error), message text middle in 13px, optional dismiss-x on right.
**States:** slide-in from edge, auto-dismiss after 5s or on x-click, hover pauses dismiss timer.

## §5 Surface inventory

- `https://airtable.com/` — Home page; anchors the marketing-stripe palette (peach / sky-blue / navy / forest) plus the main nav, primary/secondary/inverse button system, customer-logo strip, and CTA footer pattern.
- `https://airtable.com/pricing` — Pricing page; anchors the canonical first-party design-system surface: pulls in `brandkit-font.css`, `helpers.css`, `pricing.css` directly. Tier cards, plan eyebrow labels, FAQ accordion. Tier names: Free / Team / Business / Enterprise Scale.
- `https://airtable.com/product` — Product overview; anchors field-pill chip palette, database grid mockups, illustration-heavy feature bands, the "Omni / Field Agents / HyperDB" feature surfaces.
- `https://airtable.com/solutions` — Solutions for teams; anchors the cyan-accent illustration system across team-category cards.
- `https://airtable.com/enterprise` — Enterprise pitch; mirrors home layout with denser feature stacks and enterprise-oriented CTAs.
- `https://airtable.com/login` — Auth; anchors form-input styling, SSO provider buttons, the historic `#2D7FF9` continue button (third blue beyond the design-system `#166EE1` and the marketing-nav `#0768F8`).
- `https://airtable.com/developers` — Developer docs; anchors mono-family usage, inline code chips, code blocks, breadcrumb pattern.
- `https://static.airtable.com/css/compiled/v2/brandkit-font.068c92a44c0dedb525c67796b57f0f8d253bec71.css` — First-party brandkit font declarations; ships HaasText + HaasDisplay (`NeueHaasGrotTextRound-55Roman-Web`, `NeueHaasGrotTextRound-65Medium-Web`, `NeueHaasGrotDispRound-65Medium-Web`).
- `https://static.airtable.com/css/compiled/v2/pricing.2156716e96c377eb5066641e94d3424f0349f3c0.css` — Pricing CSS bundle (~610KB minified); the densest concentration of `--palette-*`, `--colors-*`, `--mainNav*`, `--elevation-*`, `--font-family-*`, `--font-size-*`, `--radius-*` token definitions. The `.theme-dark { ... }` block in this file is the canonical dark-mode token surface.
- `https://static.airtable.com/css/compiled/v2/helpers.2ff28a754de4b79168ebd72164c618efdb065b44.css` — Atomic utility classes (margin / padding / flex / text helpers) + animation keyframes (the `complementary-pulse-{hue}` set; `progress` / `slideUp` / `spinScale` / `swayHorizontal` / `spin`).

## §6 Notes

- **The field-type rainbow palette is the brand's voltage moment, not the marketing stripes.** The four hero stripes (peach / sky-blue / navy / forest) are art-direction layered onto the marketing site; the ten-hue field-pill palette is the design-system identity. When authoring a preview, anchor on the rainbow pills (Light2 fill + Dark1 ink per hue) rather than over-indexing on the stripe palette which doesn't generalise beyond marketing chrome.
- **Three concurrent blues** — `#166EE1` (design-system primary), `#0768F8` (marketing nav primary), `#2D7FF9` (login continue button, historic). Treat `#166EE1` as canonical for the product token surface; the others are surface-specific variants the brand has not consolidated.
- **Three concurrent display families** — HaasDisplay (marketing chrome), Inter Display (current design system), GT Eesti Display (legacy). Authoring for "current Airtable" should reach for Inter Display first; HaasDisplay is appropriate for marketing-mock surfaces.
- **Border treatment is opacity-based, not solid-colour.** The `--colors-border-default` / `border-subtle` tokens resolve to `rgba(0,0,0,0.05..0.1)` light and `rgba(255,255,255,0.05..0.1)` dark — borders read at the same visual weight regardless of canvas. Avoid solid-gray hairlines (`#E5E9F0` etc.) when emulating the brand; use the opacity-pair pattern.
- **Body-size floor is 13px, not 14px.** The brand is denser than most modern SaaS UIs. `--font-size-body-default: 13px`, `body-large: 15px`. Mockups at 15px+ read as visually larger than Airtable's actual product UI.
- **`.theme-dark` is a full token swap, not a colour-scheme override.** Airtable ships a complete dark-mode token block in `pricing.css` that re-resolves every `--colors-*` semantic alias. The brand does have a documented dark mode; treat `[data-theme="dark"]` overrides as authoritative rather than synthesised.
- **No purple wordmark in the chrome.** The Airtable wordmark and logo glyph render in monochrome `#181D26` (gray800) on light and white on dark. Don't reach for "Airtable purple" — the historic purple-pink wordmark hasn't been the canonical mark for ~5 years.
- **Brand-X-lift content to avoid in previews:** the four marketing-stripe colour set in its exact four-band rotation (peach → sky-blue → navy → forest); actual customer logo names (Glassdoor, Autodesk, Time); product feature names "Omni", "Field Agents", "HyperDB", "Cobuilder"; the literal tier names "Team" / "Business" / "Enterprise Scale" (use generic SaaS tier shapes per the Halcyon convention); the field-type-pill option labels that match real Airtable record-field defaults (e.g. "In progress / Backlog / Done" kanban-lane stock labels).

## §Known gaps

- **The product app itself** (the base editor at `airtable.com/app/...`) is auth-walled and was not reachable in this cycle. Component vocabulary entries marked "inferred from tokens" (Checkbox, Switch, Modal, Toast, Tooltip, Avatar) are reconstructed from the documented `--colors-*` tokens and `--elevation-*` shadow declarations rather than direct DOM observation. Cross-check against a screen-recording or screenshot of the live product UI would tighten the shape claims.
- **Blog editorial surface** (`blog.airtable.com`) returned HTTP 403 on direct fetch. The blog-post card entry is reconstructed from generic marketing link-preview cards on airtable.com; verify with a browser session for the canonical editorial shape.
- **Field-type icon set.** Each of the 25+ field types (Single line text, Long text, Attachment, Checkbox, Multiple select, Single select, User, Date, Number, Currency, Percent, Duration, Rating, Formula, Rollup, Count, Lookup, Created time, Last modified time, Autonumber, Barcode, Button, Phone number, Email, URL, Linked record, Created by, Last modified by) has a distinct monochrome glyph in the column header. The exact glyph set wasn't sampled in this cycle; the column-header entry treats them as a category.
- **Chart / data-viz tokens.** `--chart-1` through `--chart-5` are filled in `tokens.css` as a monochrome blue ramp, but Airtable's actual chart-block extensions cycle through the rainbow palette. Live chart surfaces are inside the product app (auth-walled) — verification deferred.
- **GT Eesti Display legacy heading.** The token `--font-family-heading-legacy` still references this family but no surface in this cycle's sample loaded the actual GT Eesti webfont. May be fully migrated off; only the token name persists. Confirm with a render trace on the live product.
- **Mobile-specific chrome** (drawer behaviours, mobile nav stack, mobile pricing card stack) was inferred from class names (`Drawer-module_navDrawerWrap`, `Collapse-module_navCollapseWrap`) rather than direct device emulation. A mobile-viewport sample would verify breakpoint behaviour.
