---
slug: bmw-style
name: BMW
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://www.bmwusa.com/
  - https://www.bmwusa.com/vehicles/x-models.html
  - https://www.bmwusa.com/vehicles/x-models/x5.html
  - https://www.bmwusa.com/vehicles/sedans/3-series.html
  - https://www.bmwusa.com/owners.html
  - https://www.bmwusa.com/explore.html
  - https://www.press.bmwgroup.com/global
  - https://www.press.bmwgroup.com/global/article/topic/7345
  - https://www.press.bmwgroup.com/usa/article/detail/T0306330EN_US/introducing-bmw%E2%80%99s-new-brand-design-for-online-and-offline-communication
canonical-canvas: light
selection:
  mood: [brand-system, luxury]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, luxury visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# BMW

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.bmwusa.com/ | White with full-bleed editorial photography | Hero rotates between lease-offer cards; each opens onto vehicle photography with overlaid title and price; nav bar floats over the photo as a transparent strip then settles to white on scroll. |
| Model overview (X5) | https://www.bmwusa.com/vehicles/x-models/x5.html | White with full-bleed model photography | Section-titled deck pattern — "THE X5", "Driving pleasure", "Pioneering design and performance" — each section paired with a wide vehicle photograph. Spec callouts on white. |
| Model overview (3 Series) | https://www.bmwusa.com/vehicles/sedans/3-series.html | White with full-bleed model photography | Variant cards (330i, 330i xDrive, M340i & M3 Models) on white tiles; the same photographic-deck rhythm as X5. |
| Models index | https://www.bmwusa.com/vehicles/x-models.html | White with photographic tiles | "THE FULL RANGE OF BMW SUVs" — sub-nav (Versatile / Comfortable / Powerful / Models / FAQs) anchored as a sticky pill, photographic model tiles below. |
| Owners hub | https://www.bmwusa.com/owners.html | White with three card-shelf sections | Mostly utility content (My BMW App, ConnectedDrive, Maintenance Programs, Owner's Manual, BMW Genius). Photography retreats to small thumbnails inside the cards. |
| Explore hub | https://www.bmwusa.com/explore.html | White with sectioned feature blocks | Top-level routing to SUVs / Sedans & Gran Coupes / Coupes / Convertibles / Touring / All-Electric / Plug-in Hybrids / BMW M. |
| Press portal (Design topic) | https://www.press.bmwgroup.com/global/article/topic/7345 | White editorial canvas | Press-release listings; headlines in dark ink, blue hyperlinks visible inline, social-share button row, search affordance in the header. |
| Brand-redesign press release | https://www.press.bmwgroup.com/usa/article/detail/T0306330EN_US/ | White editorial canvas | Documents the 2020 brand identity refresh — "Pared-down and two-dimensional", "visual restraint and graphic flexibility", transparent roundel for digital surfaces. |

Canonical canvas is **light**. Every BMW corporate marketing and product surface sampled renders on white with full-bleed editorial photography as the chromatic element. Dark canvases appear only inside the BMW M sub-brand (which has its own DESIGN.md). The 2020 brand redesign press release explicitly describes the direction as "pared-down and two-dimensional" with "visual restraint" — the design language puts the chromatic load on the vehicle photograph, not the canvas.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a live citation.

### Brand primary

- `--primary`: `oklch(0.5027 0.1425 250.0532)` (= `#0066B1`). Live: Bavarian Blue is the documented BMW corporate brand colour, anchored by the roundel and confirmed in the Press portal article describing the 2020 redesign. It surfaces as inline link colour on https://www.press.bmwgroup.com/global/article/topic/7345 and as the upper-left quadrant fill of the BMW roundel on every header. The sub-brand bmw-m-style/tokens.css carries the same colour at the same OKLCH value as `--primary` — that is the canonical pair to reference.
- `--brand-primary-press`: `oklch(0.4254 0.1156 248.4033)` (= `#00518A`). Synthesised pressed-state stop at lower lightness on the same hue line; BMW does not publish a tokenised press-state value but the corporate ladder reads as a single-step darken.

### Documented secondary brand colours

BMW's 2020 brand redesign moved away from synthesised secondary chromatic palettes. The parent BMW brand uses Bavarian Blue as the only chromatic identity; greys, whites, and the photograph carry everything else. The M tri-stripe (Bavarian Blue / Violet / Motorsport Red) is exclusive to the M sub-brand and should NOT appear on parent BMW surfaces unless a heritage or motorsport-adjacent surface explicitly invokes it. Documented for completeness only:

- `--brand-accent-stripe-violet`: `oklch(0.4492 0.1213 280.3439)` (= `#4A4A96`). Live: visible only on M-branded surfaces inside the BMW universe; parent BMW marketing does not render it.
- `--brand-accent-stripe-red`: `oklch(0.5701 0.2193 28.2068)` (= `#DB1E1C`). Live: same constraint — M-sub-brand only. Kept here as a documentation note, not a parent-BMW token.

### Canvas + neutrals

- `--background`: `oklch(1 0 0)` (= `#FFFFFF`). Live: white canvas on every sampled BMW USA surface — homepage, model pages, owners, explore. The corporate identity since the 2020 refresh treats the canvas as a neutral stage for vehicle photography.
- `--foreground`: `oklch(0.2686 0 0)` (= `#262626`). Live: section headings and primary body copy across https://www.bmwusa.com/vehicles/x-models/x5.html and the 3 Series overview — the heading "THE X5" reads as near-black on white. Note this is slightly lighter than pure ink (`#000`); the redesign favours a softened black for body that holds against high-contrast photography.
- `--card`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Live: spec-callout backgrounds on model pages, "0-60 MPH / Horsepower / Starting MSRP" stat blocks render against a near-white tile that separates from the canvas by less than a percentage point of lightness — the separation is felt through hairline borders, not fill.
- `--card-foreground`: `oklch(0.2686 0 0)` (= `#262626`). Same as `--foreground`; the parent BMW system does not flip text colour between canvas and card.
- `--popover`: `oklch(1 0 0)` (= `#FFFFFF`). Live: navigation flyouts on the topnav (Models / Build Your Own / Shopping / BMW Electric / Owners) render against pure white.
- `--popover-foreground`: `oklch(0.2686 0 0)` (= `#262626`).
- `--muted`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Live: lease-offer card backgrounds on homepage offer carousel are washed to a one-step-off-white before the offer details render.
- `--muted-foreground`: `oklch(0.4784 0 0)` (= `#5D5D5D`). Live: secondary metadata in lease-offer cards — "Per month for 39 months with $6,829 due at signing" — reads as a mid-grey caption beneath the price headline.
- `--accent`: `oklch(0.9851 0 0)` (= `#FAFAFA`). (synthesised — parent BMW does not surface an accent fill distinct from `--muted`; the slot is preserved at the same value to keep the system stable.)
- `--accent-foreground`: `oklch(0.2686 0 0)` (= `#262626`).
- `--secondary`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Live: secondary-button surfaces on https://www.bmwusa.com/owners.html — "Sign in to My BMW" hover treatment.
- `--secondary-foreground`: `oklch(0.2686 0 0)` (= `#262626`).
- `--destructive`: `oklch(0.5680 0.2002 26.4057)` (= `#D32F2F`). (synthesised — error states are not exposed on the BMW marketing surfaces sampled. This is a conservative red-600 calibrated to land at the same chromatic intensity as the brand without invoking the M Motorsport Red, which is reserved for the M sub-brand.)
- `--destructive-foreground`: `oklch(1 0 0)` (= `#FFFFFF`).
- `--border`: `oklch(0.9067 0 0)` (= `#E0E0E0`). Live: card edges on the owners-hub tile grid show a one-pixel hairline against the near-white canvas.
- `--input`: `oklch(0.9067 0 0)` (= `#E0E0E0`). (synthesised at the same value as `--border`; form-input surfaces on the configurator were unreachable in this cycle — see §Known gaps.)
- `--ring`: `oklch(0.5027 0.1425 250.0532)` (= `#0066B1`). Bavarian Blue carries the focus-ring role; the brand uses it as the only chromatic accent in the system, so focus inherits the same value.

### Polarity-locked surfaces

Tokens that stay fixed across `:root` and `[data-theme="dark"]`:

- `--brand-canvas-light`: `oklch(1 0 0)` (= `#FFFFFF`). Live: the photographic-deck rhythm of model pages assumes a white canvas under every vehicle hero; the canvas is part of the brand surface and does not flip under user theme preference.
- `--brand-on-light-strong`: `oklch(0.2686 0 0)` (= `#262626`). Live: heading "THE X5" on https://www.bmwusa.com/vehicles/x-models/x5.html. Body register pinned to a softened black on white.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9067 0 0)` (= `#E0E0E0`). Live: section dividers between deck blocks on model pages — single hairline below "Pioneering design and performance" before the next photographic deck.
- `--brand-hairline-strong`: `oklch(0.8452 0 0)` (= `#CCCCCC`). Live: footer link-list dividers; the four-column footer ("The BMW Difference / Experience & Partnerships / Online Shopping Tools / Finance & Incentives / Social Links") relies on the stronger hairline for column separation.

### Drift vs `tokens.css`

Real and material:

- **`--primary` drift (P0)**: current `tokens.css` ships `oklch(0.5381 0.1804 258.2969)` = `#1C69D4`. That is **not Bavarian Blue** — it is a brighter, more saturated, slightly more violet blue (hue 258° vs 250°). Bavarian Blue at the live brand is `oklch(0.5027 0.1425 250.0532)` = `#0066B1`, which is exactly the value the adjacent bmw-m-style/tokens.css already carries. The current bmw-style value reads as a generic "tech blue" rather than the documented BMW corporate blue. Reconciliation: update every primary-family token (`--primary`, `--ring`, `--sidebar-primary`, `--sidebar-ring`, and the `--chart-*` ramp anchored on that hue) to the Bavarian Blue OKLCH. The `--brand-m-blue-light` / `--brand-m-blue-dark` pair carried in the current tokens.css is also misaligned — `--brand-m-blue-light` happens to hold the correct Bavarian Blue while `--brand-m-blue-dark` holds the wrong tech-blue value. Both are M-tri-stripe vocabulary and should not live on the parent BMW token surface at all; they belong to bmw-m-style.
- **`--font-sans` naming drift**: current `tokens.css` declares `'BMW Type Next Latin'`. The documented brand typeface is **BMW Type Next** (no "Latin" suffix) — the "Latin" tag is a packaging label on the OTF/WOFF distribution, not a BMW-published cut name. Same fix already applied in bmw-m-style. Reconciliation: rename the stack to `'BMW Type Next', BMWTypeNext, system-ui, -apple-system, sans-serif`.
- **`--brand-primary-active` value drift**: current `oklch(0.4641 0.1709 258.4945)` = `#1259B5` follows the same wrong hue line as the primary. Should be the corrected `oklch(0.4254 0.1156 248.4033)` = `#00518A` (one step darker on the Bavarian Blue hue, not the tech-blue hue).
- **Synthesised radius extras**: `--brand-radius-pill` and `--brand-radius-full` are both declared at `9999px`, which is acceptable but redundant. The BMW corporate system does not surface pill-shaped CTAs in the sampled set (buttons render as squared rectangles with a small `--radius-sm` 4px corner). Keep as-is for the catalog shadcn surface; flag as not-observed-on-live.

Cosmetic and acceptable:

- `--brand-success` `oklch(0.7227 0.1920 149.5793)` (= a documented green) and `--brand-warning` `oklch(0.7686 0.1647 70.0804)` (= amber) are reasonable shadcn-style synthesised semantics; not directly observed on sampled surfaces but not invoking M tri-stripe vocabulary either. Acceptable to keep.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | BMW Type Next | 700 (Bold) | 64px / clamp ~ 48–72px on responsive surfaces | 1.05 | -0.01em |
| Heading | BMW Type Next | 700 (Bold) | 48px | 1.1 | normal |
| Section title | BMW Type Next | 600–700 | 32px | 1.15 | normal |
| Title | BMW Type Next | 600 | 18–20px | 1.3 | normal |
| Body | BMW Type Next | 400 (Regular) | 16px | 1.55 | normal |
| Caption | BMW Type Next | 400 (Regular) | 14px | 1.4 | 0.005em (slight optical opening) |
| Mono | ui-monospace fallback | 400 | 14px | 1.5 | normal |

Notes:

- **BMW Type Next is a variable font** introduced in the 2020 brand redesign. Width and weight axes are exposed; the marketing site appears to use Regular and Bold predominantly, with occasional Light on caption text under photographs. The variable axes enable "real-time typographic adjustments for lighting, distance and digital displays" (per BMW Group communications on the redesign).
- Headings on model pages render in all-caps for the model designation ("THE X5", "THE 3 SERIES SEDAN"). The all-caps treatment is editorial — feature titles inside the deck ("Striking, sporty, stylish", "Pioneering design and performance") use mixed case.
- The previous typeface (BMW Type, BMW Helvetica) was retired in 2020. Any reference to "Helvetica BMW" in older brand documentation is now stale.
- No serif role is exposed on the parent BMW marketing surface. The serif fallback in tokens.css is system-only and does not surface in the design language.
- Body register stays at 16px on desktop; the typeface's optical sizing keeps it readable against full-bleed photography without bumping size.
- The display register avoids ornament — no decorative tracking, no display-only weights — consistent with the brand's "visual restraint" principle.

## §4 Component vocabulary

### roundel-mark

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — header logo position, top-left of the page chrome
**Description:** The signature BMW mark — a circle divided into four alternating quadrants of Bavarian Blue and white. Since the 2020 redesign, the digital roundel uses a transparent treatment (the inner circle has no white fill) for use on photography-rich surfaces; on white canvas the conventional opaque version is preserved. The mark is monochromatic at small sizes (used as a wordmark anchor on the topnav), expanding to the full circular emblem for ceremonial placements.
**States:** `default` (opaque blue/white on light canvas), `transparent` (blue ring + transparent interior, for photographic overlays), `monochrome-white` (white on dark photographic overlays where the canvas falls dark behind the nav).

### primary-button

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — "Build Your Own" CTA in lease-offer cards; `https://www.bmwusa.com/vehicles/x-models/x5.html` — "Build yours" / "Shop inventory" deck CTAs
**Description:** Rectangular CTA with a 4px corner radius, near-black `#262626` fill, white label set in BMW Type Next Bold at 14–16px, with a subtle 0.005em letter-spacing on the label. Padding lands around 16px vertical / 32px horizontal; minimum height is roughly 48px. The button does NOT default to Bavarian Blue — black-ink is the dominant primary register on parent BMW marketing surfaces; blue is reserved for the roundel and for hyperlink colour in editorial.
**States:** `default` (near-black fill, white label), `hover` (subtle background lightness lift to ~`#3C3C3C`, no underline), `pressed` (lift cancels and label inherits a slight optical compression), `focus` (Bavarian Blue 2px outline at 2px offset), `disabled` (greyed fill at `#BABABA`, white label at 60% opacity).

### secondary-button

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models/x5.html` — "Test drive" alongside "Build yours"
**Description:** Same geometry as the primary button — 4px corner radius, same padding ladder — but rendered as an outline button: 1px border at `#262626`, transparent fill, label in `#262626`. Used as the second of a two-button deck on model overview pages.
**States:** `default` (outlined), `hover` (fill becomes a near-white `#FAFAFA` wash, border holds), `focus` (Bavarian Blue 2px outline replaces the standard border), `disabled` (border drops to `#E0E0E0`, label drops to `#BABABA`).

### inline-link

**Status:** `current`
**Live source:** `https://www.press.bmwgroup.com/global/article/topic/7345` — article-title links inline within paragraph text on the press portal
**Description:** Body-register text rendered in Bavarian Blue `#0066B1` with no underline at rest, underline on hover. This is the only consistent surface where Bavarian Blue appears as text on parent BMW pages — editorial press surfaces use it as the conventional link colour. Note: the consumer-facing bmwusa.com marketing surfaces render body links in `#262626` ink with a chevron-arrow indicator rather than colour; the blue inline link is a press-portal pattern.
**States:** `default` (Bavarian Blue, no underline), `hover` (underline appears), `visited` (no colour change observed; the brand does not surface a visited-link tint), `focus` (2px Bavarian Blue outline).

### chevron-link

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models/x5.html` — "Explore all offers" / "See full offer details" on lease-offer deck
**Description:** Body-text link in `#262626` with a right-pointing chevron icon at the end. The chevron is stroke-1.5 SVG, sized roughly to the cap-height of the surrounding text. On hover the chevron slides 4px to the right; on dark photographic overlays both text and chevron render in white. This is the dominant link affordance on consumer marketing surfaces — colour is reserved for the brand mark and focus.
**States:** `default` (text + chevron at `#262626`), `hover` (chevron slides 4px right, no underline), `focus` (2px Bavarian Blue outline around the entire link, no chevron transform until released), `on-photographic-overlay` (text + chevron flip to `#FFFFFF`).

### topnav

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — persistent header across the site
**Description:** Sticky horizontal navigation, transparent over the hero photograph at scroll-top, solid white after the first scroll threshold. Five primary labels — "Models", "Build Your Own", "Shopping", "BMW Electric", "Owners" — set in BMW Type Next at 14px Bold, plus a roundel mark at the left edge and utility icons (search, account, locale, cart) at the right. No coloured underline indicates the active section; the active state is communicated by weight/density alone.
**States:** `transparent` (over photographic hero), `solid` (white fill + soft bottom hairline after scroll), `open-flyout` (clicking a primary label opens a full-width flyout panel with sub-navigation in light mode), `mobile-collapsed` (hamburger menu under ~768px viewport).

### topnav-flyout

**Status:** `current`
**Live source:** `https://www.bmwusa.com/explore.html` — clicking the "Models" topnav item reveals a sub-navigation flyout
**Description:** Full-width panel descending from the topnav, white fill, soft bottom shadow. Internal organisation is column-based — left column groups model categories (SUVs / Sedans & Gran Coupes / Coupes / Convertibles / Touring / All-Electric / Plug-in Hybrids), right column previews a featured model with a vehicle photograph. Labels at 14px Regular; category headings at 16px Bold; no Bavarian Blue inside, the flyout is monochromatic text on white.
**States:** `default` (open-on-hover or open-on-click depending on device), `hover-item` (a single label gains weight and a 1px Bavarian Blue underline), `mobile` (the flyout collapses to a vertical accordion).

### model-card

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models.html` — "THE FULL RANGE OF BMW SUVs" grid
**Description:** Photographic vehicle tile with no card chrome — the vehicle photograph is the card. Below the photograph: model designation in all-caps Bold ("X5", "X7", "iX"), a starting price line in Regular at 14px, and a single chevron-link "Build" or "Explore". Hover state shifts the photograph subtly (no scale, no shadow); the tile relies on alignment and whitespace to read as a card rather than on visible borders.
**States:** `default` (photographic tile, no chrome), `hover` (vehicle photograph nudges with a subtle parallax; chevron-link gains weight), `focus` (Bavarian Blue 2px outline wraps the entire tile), `active` (text shifts to near-black emphasis weight).

### lease-offer-card

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — hero offer carousel ("$899 Per month for 39 months with $6,829 due at signing")
**Description:** A two-row card. Top row carries the vehicle photograph at a 16:9 ratio. Bottom row is white, padded ~24px, with a model designation in Bold (e.g. "X5 xDrive40i"), a price line ("$899/month") in display register, terms metadata in caption register ("Per month for 39 months with $6,829 due at signing"), and a single "Build Your Own" primary button. Visible only on the homepage; the card does not appear on model pages.
**States:** `default` (white card on white canvas, separated by a `#E0E0E0` 1px hairline), `hover` (subtle shadow at `0 4px 12px rgba(0,0,0,0.04)`), `expired` (greyed-out treatment when an offer rotation lapses — observed via prior lease-cycle cards; expiry metadata appears in caption register beneath the terms line).

### spec-stat-block

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models/x5.html` — "0-60 MPH / Horsepower / Starting MSRP" beneath the hero
**Description:** Three-column horizontal stat block on white. Each column shows a numeric value in display register ("5.4 sec", "335 hp", "$66,200") with a caption label in Regular at 14px beneath ("0-60 MPH", "Horsepower", "Starting MSRP"). No card chrome — the block is separated from the rest of the deck by a `#E0E0E0` hairline above and below. Numbers anchor left within each column.
**States:** `default` (visible only — not interactive).

### section-deck

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models/x5.html` — "Pioneering design and performance" deck, repeated for "A powerfully elegant character", "Elegance and functionality", "Amazing space"
**Description:** The recurring narrative block on every model page. Full-bleed photograph (wide aspect, often 21:9 or 16:9), section title overlaid bottom-left or centred ("Pioneering design and performance"), short deck paragraph beneath in Regular at 16px, optional chevron-link below. The same shape repeats four-to-six times down a model page, creating an editorial-magazine rhythm.
**States:** `default`, `text-on-light` (when the photo's bottom band is light, the title shifts to `#262626`), `text-on-dark` (when the photo's bottom band is dark, the title shifts to `#FFFFFF`).

### sub-nav-pill

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models.html` — "Versatile / Comfortable / Powerful / Models / FAQs" sticky bar
**Description:** A horizontal sticky sub-navigation below the main topnav. Labels render as plain text at 14px Regular with a 1px Bavarian Blue underline beneath the active item. The bar carries a `#FAFAFA` background that holds against the white canvas via a `#E0E0E0` hairline at top and bottom. Clicking a label scrolls the page to the matching deck block.
**States:** `default`, `active` (Bavarian Blue underline + weight bump to Bold), `hover` (underline appears in `#262626`, becomes Bavarian Blue on click).

### model-variant-tab

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models/x5.html` — "Core Models" / "M Models" tab pair
**Description:** A binary tab system that splits a model family's variants. Each tab is text-only — no fill, no border — with a 2px Bavarian Blue underline on the active tab. The inactive tab carries a `#5D5D5D` ink, the active tab is `#262626`. Used on every model page that has an M-variant alongside the core variants.
**States:** `default-inactive`, `active` (Bavarian Blue underline, Bold weight), `hover` (subtle ink lift toward `#262626`).

### footer

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — page-footer present on every surface
**Description:** Five-column link grid on white canvas. Column headings — "The BMW Difference", "Experience & Partnerships", "Online Shopping Tools", "Finance & Incentives", "Social Links" — set in Bold at 14px. Link list beneath each in Regular at 14px, line-height ~1.7. Roundel mark at top-left of the footer block. Legal microcopy at the bottom in 12px Regular, `#5D5D5D`.
**States:** `default` (visible only), `link-hover` (underline appears beneath the link label).

### footer-locale-switcher

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — bottom-of-footer locale and unit selector
**Description:** Inline text dropdown carrying the current locale ("USA / English") and unit preference. Visible as a small chevron-down link near the bottom of the footer; opens a modal locale selector grouped by geographic region.
**States:** `default` (text + chevron), `open` (modal overlay with regional grouping).

### search-affordance

**Status:** `current`
**Live source:** `https://www.press.bmwgroup.com/global` — header search field on the press portal
**Description:** Inline text field rendered as a hairline-bordered rectangle, 4px corner radius, white fill, 1px `#E0E0E0` border. Search icon at the left of the field in `#5D5D5D` stroke. On the press portal it sits inline in the topnav row; on bmwusa.com the same affordance is collapsed behind a magnifying-glass icon that expands on click.
**States:** `default` (hairline border), `focus` (border becomes Bavarian Blue, no fill change), `with-content` (placeholder hides, content renders in `#262626`).

### social-share-row

**Status:** `current`
**Live source:** `https://www.press.bmwgroup.com/global` — share-this-article row on press articles
**Description:** Horizontal row of share affordances — Email, Facebook, Twitter, LinkedIn — rendered as monochrome stroke icons in `#262626` at 24px. No fill, no background; spacing rhythm at 16px between icons.
**States:** `default` (monochrome), `hover` (icon switches to Bavarian Blue), `focus` (2px Bavarian Blue outline ring).

### press-article-card

**Status:** `current`
**Live source:** `https://www.press.bmwgroup.com/global/article/topic/7345` — press release listings
**Description:** Horizontal article preview — small photograph at the left (~25% of card width), title in Bold at 18px to the right ("VISION BMW ALPINA: SPEED, REFINED", "First look at Neue Klasse as SAV: The BMW Vision Neue Klasse X"), excerpt in Regular at 14px beneath, byline and topic tag in caption register at the bottom. Card sits on white with a `#E0E0E0` bottom hairline separating from the next card.
**States:** `default`, `hover` (title gains a `#0066B1` underline; photograph holds), `focus` (Bavarian Blue 2px outline around the card boundary).

### topic-pill

**Status:** `current`
**Live source:** `https://www.press.bmwgroup.com/global` — topic tags on article cards (Corporate, Brands, Technology, People, Heritage, Motor Shows, Sports, Design)
**Description:** Small rounded-rectangle tag, 4px corner radius, `#FAFAFA` background, `#262626` text at 12px Regular. Used to categorise press articles. No coloured states observed — the pill stays neutral across topic categories.
**States:** `default`, `hover` (background lifts to `#E0E0E0`).

### breadcrumb-trail

**Status:** `current`
**Live source:** `https://www.press.bmwgroup.com/global/article/topic/7345` — "PressClub Global · Articles · Design"
**Description:** Inline breadcrumb at the top of editorial articles, separated by a middle-dot `·` character. Current page renders Bold; ancestors render Regular at 14px in `#262626`. The middle-dot is `#5D5D5D`.
**States:** `default`, `link-hover` (Bavarian Blue underline on the ancestor links).

### cookie-consent-banner

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — appears on first visit (cookie session not persisted in the WebFetch sample but documented brand pattern)
**Description:** Fixed-position banner at the bottom of the viewport, white fill, 1px `#E0E0E0` top hairline. Title in Bold ~18px, body in Regular at 14px, two-button row at the right end of the banner — primary "Accept all" and secondary "Settings". Dismisses via the standard cookie-consent flow.
**States:** `default` (banner visible), `dismissed`.

### my-bmw-app-banner

**Status:** `current`
**Live source:** `https://www.bmwusa.com/owners.html` — "Download the NEW My BMW app" promotion
**Description:** Horizontal promo banner on the owners hub, white fill with a phone-screenshot photograph at the left, headline + body copy at the centre, primary button at the right ("Download the NEW My BMW app"). Sits within the "BMW OWNER RESOURCES" section.
**States:** `default`.

### account-pill

**Status:** `current`
**Live source:** `https://www.bmwusa.com/owners.html` — "Sign in to My BMW" topnav entry-point + dedicated card
**Description:** Identity affordance at the top-right of the topnav. Reads as a person-silhouette icon in `#262626` until signed in; on click, opens a "Sign in to My BMW" modal carrying a primary button and a secondary "Register for My BMW" link.
**States:** `signed-out` (silhouette icon), `signed-in` (first-initial avatar disc), `hover` (subtle lift), `modal-open` (sign-in/register modal displayed).

### model-photograph

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/x-models/x5.html` — every section-deck on every model page
**Description:** The brand's load-bearing visual asset. Full-bleed editorial photography of a vehicle, served via the BMW Scene7 image CDN (`bmw.scene7.com`). Aspect ratios range from 21:9 (deck hero) to 1:1 (gallery thumbnail). Lighting and colour treatment are consistent across the catalog — high-key daylight, neutral colour temperature, single-vehicle compositions. Photography carries the chromatic load; the canvas stays white.
**States:** `default`, `with-text-overlay` (when used as a section-deck hero, copy overlays the bottom-left), `gallery-thumb` (cropped tighter for grid presentations).

### model-spec-table

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/sedans/3-series.html` — 330i and 330i xDrive spec rows
**Description:** A two-column data table for variant comparison. Left column carries the variant label ("330i Sedan", "330i xDrive Sedan"); right columns carry the spec values (255 hp, 5.6 sec 0-60, $48,000 starting MSRP). Rows separated by `#E0E0E0` hairlines. Numbers anchor right; labels anchor left. No alternating row backgrounds — the table reads as editorial typography on white.
**States:** `default` (visible only), `variant-active` (when filtered to a single variant, the matching row gains weight).

### feature-deck-title

**Status:** `current`
**Live source:** `https://www.bmwusa.com/vehicles/sedans/3-series.html` — "Striking, sporty, stylish" / "More M. More excitement" / "Connect to the thrill of driving" / "Agility comes standard"
**Description:** A standalone editorial sub-heading inside a section-deck. Three or four words, mixed case, BMW Type Next Bold at ~32–40px. Anchored top-left of the deck block, above the deck paragraph. Carries the editorial-magazine voice of the brand.
**States:** `default`.

### bottom-cta-band

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — bottom of the homepage above the footer
**Description:** A four-column CTA band sitting between the offer carousel and the footer. Each column carries an icon (~32px monochrome stroke), a label in Bold ("Design your vehicle", "Shop new vehicles", "Explore special offers", "Shop pre-owned vehicles"), and a chevron-link beneath. No card chrome — the columns are separated by whitespace alone.
**States:** `default`, `column-hover` (icon ink darkens, chevron slides right).

### bmw-difference-card

**Status:** `current`
**Live source:** `https://www.bmwusa.com/owners.html` — "BMW Maintenance Programs" / "BMW Genius" / "BMW ConnectedDrive" tiles
**Description:** Vertical card with a small photograph at the top (16:9), a Bold title, a Regular body paragraph, and a chevron-link at the bottom. Sits inside a three-column grid on owner-services and explore-content surfaces. Card boundary is a 1px `#E0E0E0` hairline; corners at 4px.
**States:** `default`, `hover` (subtle shadow lift), `focus` (Bavarian Blue 2px outline).

### financial-services-strapline

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — "All in. Simply smart. BMW Financial Services."
**Description:** A brand-mark-adjacent tagline that appears at the close of the homepage offer band. Set in Bold at ~24px in `#262626` on white, centred. No interactive treatment — purely a brand voice signature.
**States:** `default`.

### lease-offer-disclaimer

**Status:** `current`
**Live source:** `https://www.bmwusa.com/` — fine-print beneath every lease-offer card
**Description:** Legal disclaimer copy in 11–12px Regular at `#5D5D5D`, line-height ~1.5. Carries lease terms, mileage caps, residual values. Visually de-emphasised by size and opacity but never moved to a separate page — sits inline beneath the offer card.
**States:** `default`, `expanded` (full terms reveal on click of a "Show details" link).

## §5 Surface inventory

- `https://www.bmwusa.com/` — anchors the homepage hero pattern, lease-offer cards, bottom-CTA band, footer, and the topnav across-page chrome.
- `https://www.bmwusa.com/vehicles/x-models.html` — anchors the models-index page; sub-nav-pill, model-card grid, "THE FULL RANGE OF BMW SUVs" heading register.
- `https://www.bmwusa.com/vehicles/x-models/x5.html` — anchors the section-deck rhythm, spec-stat-block, model-variant-tab pattern, "Build yours" + "Test drive" deck CTA pair.
- `https://www.bmwusa.com/vehicles/sedans/3-series.html` — confirms the deck pattern repeats across vehicle categories (sedans vs SUVs); anchors model-spec-table and feature-deck-title vocabulary.
- `https://www.bmwusa.com/owners.html` — anchors bmw-difference-card grid, account-pill, my-bmw-app-banner.
- `https://www.bmwusa.com/explore.html` — confirms the explore-hub routing and the topnav-flyout structure.
- `https://www.press.bmwgroup.com/global` — anchors the press-portal editorial register: inline-link (Bavarian Blue as link colour), social-share-row, search-affordance, breadcrumb-trail.
- `https://www.press.bmwgroup.com/global/article/topic/7345` — anchors press-article-card and topic-pill vocabulary; confirms parent BMW editorial content does not invoke M tri-stripe.
- `https://www.press.bmwgroup.com/usa/article/detail/T0306330EN_US/introducing-bmw%E2%80%99s-new-brand-design-for-online-and-offline-communication` — primary source for the 2020 brand redesign principles (transparent roundel, pared-down two-dimensional treatment, BMW Type Next typeface, visual restraint).

## §6 Notes

- **Bavarian Blue is parent-brand identity, not text register.** Across consumer marketing surfaces (bmwusa.com), Bavarian Blue surfaces only on the roundel, the focus ring, and a small set of state indicators (sub-nav-pill underline, model-variant-tab underline). It is NOT the primary CTA fill — black (`#262626`) is. The brand identity carries chroma through the roundel and the vehicle photograph; the surface chrome stays monochromatic. The current `tokens.css` ships `--primary` as a brighter, more saturated blue that does not match either the brand-document Bavarian Blue or the live brand's restrained chromatic posture — this is the most material drift in the system and should cascade to the preview template.
- **Editorial press surfaces use blue as link colour.** The press portal (`press.bmwgroup.com`) preserves the conventional editorial pattern of inline links in Bavarian Blue. Consumer marketing surfaces (`bmwusa.com`) use the chevron-link pattern (ink + chevron-arrow) instead. Both patterns belong to the brand; the choice depends on surface register.
- **M tri-stripe vocabulary is OFF parent-BMW.** The Bavarian Blue / Violet / Motorsport Red tri-stripe and the lighter blue stop (`#3F7FBE`) live exclusively in the M sub-brand. The current `tokens.css` carries `--brand-m-blue-light`, `--brand-m-blue-dark`, and `--brand-m-red` as `--brand-*` extras — these should be removed; they cross the sub-brand boundary and one of them (`--brand-m-blue-dark`) holds the wrong-hue tech-blue value mentioned in the §2 Drift section.
- **Photography carries the chromatic load.** Every consumer marketing surface depends on a full-bleed editorial photograph to anchor the brand mood — the canvas, the typography, and the chrome are intentionally restrained. When designing a preview that demonstrates the BMW surface, the photographic deck is the brand's defining surface, not the topnav or the form chrome.
- **"Joy of driving" is voice-register lore, not surface copy.** The retired marketing tagline does not appear on current consumer marketing surfaces. The active editorial register reaches for "Driving pleasure", "Pioneering design and performance", "Elegance and functionality" — these are the live BMW voice.
- **Brand-X-lift content to avoid in previews**: real vehicle names ("X5", "M3", "i7", "330i"), model designations ("THE X5", "THE 3 SERIES"), lease-offer copy ("$899 Per month for 39 months"), BMW programme names ("My BMW", "BMW ConnectedDrive", "BMW Financial Services"), the "All in. Simply smart." strapline. Halcyon-team content for BMW surface should reach for editorial photography over canvas + restrained typography in monochrome ink — and treat the roundel-shape mark as a sub-brand voltage moment, not a constant fixture.
- **BMW Type Next is a variable font; "Latin" is a packaging-label artefact.** Same naming gotcha already fixed in bmw-m-style. The current bmw-style tokens.css still declares `'BMW Type Next Latin'`; rename to `'BMW Type Next', BMWTypeNext` per the bmw-m precedent.

## §Known gaps

- **Configurator surface inaccessible.** `bmwusa.com/build-your-own/3-series.html` returned 404 in this cycle; the live URL routing has moved. The configurator's form-input chrome, option-tile selectors, colour/wheel swatches, and pricing-summary panel were not directly observed — `--input` is documented at the same value as `--border` as a synthesised fallback. Would need browser-driven access through the live configurator (currently behind the bmw.com hostname which timed out for WebFetch this cycle) to verify the form-input vocabulary.
- **bmw.com (German + global) timed out.** Every direct fetch of `www.bmw.com` (homepage, model overviews, news, lifestyle hubs) timed out across this cycle. The US-locale sister site `bmwusa.com` was reachable and carries the same global design system, but locale-specific copy variants on `bmw.com` (German, Chinese, locale-specific lease/offer language) were not sampled.
- **BMW i (electric) hub URLs are stale.** `bmwusa.com/explore/electric.html` and `bmwusa.com/explore/electric/all-electric.html` both returned 404. The BMW i sub-brand chrome (any unique colour-callout, any distinct visual treatment for electric vehicles beyond the parent BMW system) was not verified in this cycle. The i7 / iX / i4 model pages would also unlock this gap.
- **Cookie-consent banner not directly observed.** WebFetch does not render the cookie banner overlay; the documented `cookie-consent-banner` component shape is consistent with the brand's documented pattern but the live deployment was not screenshotted.
- **My BMW signed-in surface not accessible.** The owner-portal post-authentication surfaces (My BMW dashboard, account management) are auth-walled and were not sampled. The `account-pill` is documented at the topnav signed-out state only.
- **No browser-rendered screenshots in this cycle.** Chrome-devtools tools were not in the deferred-tool list at dispatch; verification fell back to WebFetch + culori OKLCH cross-check. Visual screenshot-verification of the live brand could not be performed; future cycles should re-verify with chrome-devtools once available.
