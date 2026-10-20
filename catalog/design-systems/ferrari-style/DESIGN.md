---
slug: ferrari-style
name: Ferrari Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://www.ferrari.com/en-US
  - https://www.ferrari.com/en-US/auto
  - https://www.ferrari.com/en-EN/formula1
  - https://www.ferrari.com/en-US/auto/sf90-stradale
  - https://store.ferrari.com/en-us/
  - https://preowned.ferrari.com/en-US
canonical-canvas: dark
selection:
  mood: [brand-system, luxury]
  tone: [dramatic, bold]
  formality: medium
  density: low
  canonical_canvas: dark
  best_for: |
    Use for high-impact, low-copy artifacts that need a dramatic, bold register with brand-system, luxury visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Ferrari Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Corporate / main site | https://www.ferrari.com/en-US | Dark cinematic editorial with full-bleed imagery | Official indexed content presents Sports Cars, Collections, Magazine, Ferrari Approved, Museums, and racing news as image-led editorial modules. |
| Sports-car range | https://www.ferrari.com/en-US/auto | Mixed dark hero, product imagery, and light specification/listing sections | Range pages prioritize model discovery, build-your-own, request-information actions, and full-bleed car photography. |
| Formula 1 | https://www.ferrari.com/en-EN/formula1 | Dark racing editorial with red/yellow team accents | Scuderia pages use news cards, countdown/race calendar modules, team routes, and racing-specific metadata. |
| Model detail | https://www.ferrari.com/en-US/auto/sf90-stradale | Cinematic model story with technical specification blocks | Product pages combine model narrative, WLTP/emissions data, performance stats, galleries, video, and dealer actions. |
| Official Store | https://store.ferrari.com/en-us/ | Light commerce | Store surfaces use category mega-nav, product grids, filter/sort controls, and service guarantees; this is a real light Ferrari surface. |
| Ferrari Approved | https://preowned.ferrari.com/en-US | Light premium marketplace / certification | Pre-owned pages use white editorial copy, certification proof, search, model filters, and dealership paths. |

Ferrari is `both`: the halo/corporate/auto/racing story is dark cinematic, while official store and certified pre-owned commerce are light. The dark canvas remains the strongest brand signature for dramatic artifacts, but a Ferrari system must also support white commerce/editorial surfaces.

## §2 Palette

Values were verified against first-party Ferrari surfaces and current imported token evidence on 2026-05-27. Ferrari's own pages are bot-gated for direct anonymous HTML fetch in this environment, so official indexed page text and first-party store/pre-owned surfaces were used alongside existing hex/OKLCH round-trips.

### Brand primary

- `--primary`: `oklch(0.5746 0.2126 29.5530)` (= `#da291c`). Rosso Corsa / Ferrari racing red. Use for CTA fills, racing highlights, underline strips, and key brand accents, not body copy.
- `--brand-primary-hover`: `oklch(0.4927 0.1918 26.4443)` (= `#b5121b`). Deeper red for hover/pressed states.
- `--brand-scuderia-red`: `oklch(0.5725 0.2332 29.4764)` (= `#e10600`). Formula 1 style brighter red for racing data/position accents.
- `--accent`: `oklch(0.9269 0.1951 103.2532)` (= `#ffeb00`). Giallo Modena / Ferrari yellow. Use as shield/team accent, not as broad canvas text.

### Dark canvas + neutrals

- `--background`: `oklch(0.2090 0 0)` (= `#181818`). Canonical dark marketing/racing canvas.
- `--card`: `oklch(0.2972 0 0)` (= `#2d2d2d`). Elevated dark card and overlay panel.
- `--foreground`: `oklch(1 0 0)` (= `#ffffff`). Primary text on dark.
- `--brand-body`: `oklch(0.7412 0 0)` (= `#ababab`). Secondary copy on dark.
- `--border`: `oklch(0.3092 0 0)`. Dark hairline / input boundary.
- `--brand-muted-soft`: `oklch(0.7500 0 0)`. Captions and metadata on dark.

### Light commerce / marketplace surfaces

- `--brand-canvas-light`: `oklch(1 0 0)` (= `#ffffff`). Official store / pre-owned page floor.
- `--brand-surface-soft-light`: `oklch(0.9761 0 0)` (= `#f7f7f7`). Store/filter/card soft background.
- `--brand-surface-strong-light`: `oklch(0.9461 0 0)` (= `#ededed`). Stronger light panel/background.
- `--brand-hairline-on-light`: `oklch(0.8853 0 0)` (= `#d9d9d9`). Commerce and listing dividers.
- `--brand-on-light`: `oklch(0.2090 0 0)` (= `#181818`). Text on light commerce surfaces.

### Supporting semantic colour

- `--brand-semantic-info`: `oklch(0.3715 0.1196 254.3486)` (= deep blue). Use sparingly for technical/info labels.
- `--brand-semantic-success`: `oklch(0.5604 0.1485 151.6783)` (= Italian green). Use only for completion/availability.
- `--brand-semantic-warning`: `oklch(0.5746 0.2126 29.5530)` (= red warning/action). Use with icon/text support.

### Drift vs `tokens.css`

- `tokens.css` currently declares Ferrari dark-canonical and mirrors dark mode. That remains correct for the cinematic marketing/racing preview, but the DESIGN.md should be `both` because official store and Ferrari Approved are live light surfaces.
- No immediate cascade is required: light-surface tokens already exist as `--brand-canvas-light`, `--brand-surface-soft-light`, `--brand-surface-strong-light`, and `--brand-on-light`.
- If a future Ferrari preview needs commerce/listing fidelity, add a light commerce section to `preview-template.html` using the existing light tokens rather than flipping `:root` to light.
- Keep red off normal body text on dark. The token file's warning is correct: Ferrari red is an accent/fill/outline colour, not long-form dark-canvas ink.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | FerrariSans / system fallback | 500 | 64-88px | 1.02-1.08 | -0.02em |
| Heading | FerrariSans / system fallback | 500 | 36-56px | 1.08-1.2 | -0.01em |
| Title | FerrariSans / system fallback | 600-700 | 16-22px | 1.2-1.35 | 0 |
| Body | FerrariSans / system fallback | 400 | 14-16px | 1.45-1.65 | 0 |
| Caption | FerrariSans / system fallback | 400-600 | 11-13px | 1.35-1.5 | 0.04-0.10em when uppercase |
| Mono | FerrariSans / system fallback | 400 | 12-14px | 1.4-1.6 | 0 |

Ferrari typography is controlled, not loud. The luxury effect comes from scale, whitespace, image quality, and restrained weight, not novelty type.

## §4 Component vocabulary

### cinematic-hero

**Status:** current
**Live source:** `https://www.ferrari.com/en-US` and `https://www.ferrari.com/en-US/auto`
**Description:** Full-bleed image/video hero with minimal copy, white display text, and a small action or discovery link.
**States:** image loaded, video playing, paused, dark overlay, mobile crop.

### prancing-horse-header

**Status:** current
**Live source:** `https://www.ferrari.com/en-US`
**Description:** Sparse global header with Ferrari identity, section navigation, and menu affordances. Keep chrome minimal over imagery.
**States:** transparent over hero, solid on scroll, menu open, locale switcher.

### model-discovery-card

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto`
**Description:** Car model card with product image, model name, Discover/Build your own/Request information links.
**States:** default, hover image, active model, sold/limited status.

### build-your-own-link

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto`
**Description:** Premium action link for configurator entry. Use uppercase or restrained label styling; avoid oversized button treatment.
**States:** default, hover underline/red accent, disabled/unavailable.

### request-information-action

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto`
**Description:** Secondary lead-generation action paired with model discovery. It should feel quieter than Discover or Build.
**States:** default, hover, submitted/unavailable.

### performance-stat-row

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Technical stat row for engine, 0-100 km/h, eDrive power, maximum power, weight, fuel, and emissions.
**States:** default, highlighted stat, mobile stacked, disclaimer attached.

### wltp-disclaimer-block

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Legal/technical emissions and consumption copy below model specifications. Must be legible and restrained.
**States:** collapsed, expanded, locale-specific units.

### image-gallery-modal

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Gallery thumbnails, full image modal, close control, and video play entry. Media is the core content.
**States:** thumbnail, active image, modal open, video, close.

### video-play-control

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Minimal play affordance over hero or gallery media. Use white/black contrast and keep red optional.
**States:** idle, hover, playing, paused.

### design-interior-jump-link

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Section jump link such as Discover the design / Discover the interior. It is editorial navigation, not a primary CTA.
**States:** default, hover, active section.

### dealer-finder-action

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Practical ownership action for nearest official dealers. Often appears after model story and technical detail.
**States:** default, hover, location permission, no results.

### accessory-catalogue-link

**Status:** current
**Live source:** `https://www.ferrari.com/en-US/auto/sf90-stradale`
**Description:** Secondary post-purchase link into accessories/catalogue. Keep it understated and text-led.
**States:** default, hover, external/catalogue.

### race-countdown-panel

**Status:** current
**Live source:** `https://www.ferrari.com/en-EN/formula1`
**Description:** Countdown module for next race start with DD/HH/MM/SS and race metadata.
**States:** counting, race weekend active, complete, no upcoming race.

### race-calendar-list

**Status:** current
**Live source:** `https://www.ferrari.com/en-EN/formula1`
**Description:** Season calendar list with date range and Grand Prix name. Use tight rows and clear hierarchy.
**States:** upcoming, current, completed, linked race.

### scuderia-news-card

**Status:** current
**Live source:** `https://www.ferrari.com/en-EN/formula1`
**Description:** Racing news card with category, date recency, title, and image. Red accents can mark Scuderia context.
**States:** default, hover, featured, read.

### team-member-card

**Status:** current
**Live source:** `https://www.ferrari.com/en-EN/formula1/team`
**Description:** Team/person card for drivers, principal, technical directors, and staff. Use portrait-first layout and concise title.
**States:** default, hover, official driver, view-more.

### newsletter-signup-band

**Status:** current
**Live source:** `https://www.ferrari.com/en-EN/formula1`
**Description:** Footer/editorial signup band with short copy and subscribe action.
**States:** empty, focused, invalid, submitted.

### store-mega-menu

**Status:** current
**Live source:** `https://store.ferrari.com/en-us/`
**Description:** Large light-commerce menu with categories for lifestyle, racing, bags, men, women, collectibles, gifts, and highlights.
**States:** default, open category, hover subcategory, mobile drawer.

### store-product-tile

**Status:** current
**Live source:** `https://store.ferrari.com/en-us/men/`
**Description:** Commerce tile for apparel, accessories, scale models, helmets, and collaborations with image, product name, and shop action.
**States:** default, hover image, sale/sold out, quick shop.

### filter-sort-toolbar

**Status:** current
**Live source:** `https://store.ferrari.com/en-us/collectibles/`
**Description:** Product-grid toolbar for filtering and sorting item lists. Keep controls crisp and light.
**States:** closed, open filter, active filter count, sorted.

### exclusive-services-strip

**Status:** current
**Live source:** `https://store.ferrari.com/en-us/`
**Description:** Store services row such as shipping, returns/exchanges, availability, pickup, and in-store return.
**States:** default, linked service, unavailable.

### store-locator-form

**Status:** current
**Live source:** `https://store.ferrari.com/en-us/stores`
**Description:** Search input plus store type filters, map/list split, and store result cards.
**States:** empty, searching, zero results, map/list active.

### preowned-hero

**Status:** current
**Live source:** `https://preowned.ferrari.com/en-US`
**Description:** Light premium marketplace hero for Ferrari Approved with certification copy and search entry.
**States:** default, search focused, model selected, region selected.

### approved-proof-card

**Status:** current
**Live source:** `https://preowned.ferrari.com/en-US`
**Description:** Certification proof block explaining identity, mileage, maintenance checks, warranty, and roadside assistance.
**States:** default, expanded detail, linked learn-more.

### vehicle-search-result

**Status:** current
**Live source:** `https://preowned.ferrari.com/en-US`
**Description:** Pre-owned listing row/card with model, image, key attributes, dealer, and favorite action.
**States:** default, favorited, unavailable, dealer contact.

### footer-link-columns

**Status:** current
**Live source:** `https://www.ferrari.com/en-US`
**Description:** Multi-column footer for Racing, Sports Cars, Collections, Experiences, About us, and legal/social links.
**States:** default, locale, collapsed mobile.

### red-accent-rule

**Status:** current
**Live source:** Ferrari site family
**Description:** Thin red rule, underline, or focus accent. It gives Ferrari identity without flooding the page red.
**States:** default, hover, active, selected.

### shield-accent-chip

**Status:** current
**Live source:** Ferrari racing/store surfaces
**Description:** Small Ferrari yellow/shield-associated chip or badge for racing/team/collection identity. Use sparingly.
**States:** default, featured, official, limited edition.

### legal-locale-selector

**Status:** current
**Live source:** `https://store.ferrari.com/en-us/`
**Description:** Footer control for country/language and legal/privacy links.
**States:** default, open selector, selected locale.

## §5 Composition rules

- Start with the car, team, or product image whenever possible. Ferrari's brand system is photography-first.
- Use red sparingly. A red page is less Ferrari than a dark/white page with one exact red action.
- Yellow is shield/team heritage, not a generic warning colour. Pair it with black text or keep it symbolic.
- Let white commerce pages stay white. Store and pre-owned surfaces should not be forced into cinematic dark.
- Keep type weights modest and spacing generous. Luxury here is restraint, not ornamental typography.
- Technical model data can be dense, but it should sit in disciplined stat rows with clear disclaimers.

## §6 Accessibility notes

- White text on `#181818` and dark text on white commerce surfaces clear AA comfortably.
- Rosso Corsa on dark is not suitable for normal body copy; use it as fill/outline/accent with white or dark text chosen by contrast.
- Ferrari yellow needs dark text on light/yellow fills. White text on yellow is not acceptable.
- Image heroes require overlay gradients or scrims before placing white text over bright car photography.
