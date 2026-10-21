---
slug: nike-style
name: Nike Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.nike.com/
  - https://www.nike.com/w/mens-shoes-nik1zy7ok
  - https://www.nike.com/w/new-3n82y
canonical-canvas: dark
selection:
  mood: [brand-system, luxury]
  tone: [confident, polished]
  formality: medium
  density: low
  canonical_canvas: dark
  best_for: |
    Use for high-impact, low-copy artifacts that need a confident, polished register with brand-system, luxury visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Nike Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.nike.com/ | High-contrast commerce/editorial | Current metadata: "Nike. Just Do It" and "Inspiring the world's athletes, Nike delivers innovative products, experiences and services." |
| Men's Shoes | https://www.nike.com/w/mens-shoes-nik1zy7ok | Product grid commerce | Current page heavily surfaces Shoes, Men, Basketball, Jordan, Running, Air Max, Pegasus, Dunk, Training, Lifestyle, Sale, New Arrivals, and filters. |
| New Arrivals | https://www.nike.com/w/new-3n82y | New product feed | Current page centers Just In/New Arrivals across Men, Women, Kids, Shoes, Jordan, Basketball, Running, Training, Lifestyle, SNKRS, Member, and Sale. |

Nike is dual-canonical: white retail chrome and black/SNKRS editorial surfaces both exist. The system is near-monochrome by default, with colour reserved for product photography, sale/success signals, and occasional category/drop accents.

## §2 Palette

Values were sampled from current Nike pages on 2026-05-28 and aligned to existing tokens.

### Retail monochrome

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Retail/product grid canvas.
- `--foreground`: `oklch(0.1776 0 0)` (= live `#111111`). Primary Nike ink and black CTA.
- `--primary`: `oklch(0.1776 0 0)`. Black pill CTA on white.
- Dark mode `--background`: `oklch(0 0 0)`. SNKRS/editorial dark canvas.
- Live gray `#808080`: `oklch(0.5999 0 0)`. Muted labels, secondary filter text, unavailable copy.
- Live charcoal `#27292B`: `oklch(0.2797 0.0047 247.9948)`. Dark product chrome.
- `--brand-soft-cloud`: near-white gray for product tile backgrounds.
- `--border`: `oklch(0.8393 0.0014 286.3700)`. Retail hairline.

### Signals and category colour

- `--brand-success`: live sale/discount green `#007A44` (`oklch(0.5090 0.1260 154.9183)`).
- `--brand-info`: live blue `#1151FF` (`oklch(0.5284 0.2624 263.8098)`), used for campaign/link moments, not generic chrome.
- `--brand-sale`: sale red family, live `#E7352B` (`oklch(0.6075 0.2150 28.6355)`).
- Live orange `#F36B26`, yellow `#FED533`, high-vis lime `#d5ff44`, deep teal `#003344`, magenta `#FF00FF`, and purple `#472B7E` appear as category/product/campaign colour. Keep them image/campaign scoped.

### Drift vs `tokens.css`

- `tokens.css` remains aligned: black/white retail core, Nike Futura display, Helvetica Now UI, pill CTAs, dark SNKRS mode, and brand signal colours.
- Live content inventory should focus on current retail categories and product families: Jordan, New Arrivals, Men/Women/Kids, SNKRS, Air Max, Running, Basketball, Training, Pegasus, Dunk, Vomero, Metcon, Sale, and Member.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Nike Futura ND | 500-700 | 64-104px | 0.9-1.0 | 0 |
| Heading | Helvetica Now Display / Text | 500-700 | 32-56px | 1.05-1.18 | 0 |
| Title | Helvetica Now Text | 500-700 | 16-28px | 1.2-1.4 | 0 |
| Body | Helvetica Now Text | 400-500 | 15-18px | 1.45-1.6 | 0 |
| Caption | Helvetica Now Text | 500-700 | 12-14px | 1.25-1.45 | 0 |
| Mono | system mono | 400 | 12-14px | 1.45-1.65 | 0 |

Display type should be uppercase, compressed, and campaign-like. Retail UI type should be practical, quiet, and fast to scan.

## §4 Component vocabulary

### global-commerce-header

**Status:** current
**Live source:** `https://www.nike.com/`
**Description:** Header with Nike/Jordan/SNKRS routes, Men, Women, Kids, New & Featured, search, favorites, bag, and member actions.
**States:** default, mega-menu open, search open, cart count, signed in, mobile drawer.

### just-do-it-hero

**Status:** current
**Live source:** `https://www.nike.com/`
**Description:** Editorial campaign hero with product/lifestyle photography, oversized display headline, terse copy, and black/white CTA.
**States:** light, dark, image loaded, video, CTA hover.

### product-grid

**Status:** current
**Live source:** `https://www.nike.com/w/mens-shoes-nik1zy7ok`
**Description:** Dense product grid for shoes/apparel with image, product name, category, colour count, price, sale, and membership markers.
**States:** loading, filtered, sorted, sale, out of stock, hover.

### product-card

**Status:** current
**Live source:** Men's Shoes / New Arrivals pages
**Description:** Retail product card with square image crop, name, category, colour count, price, sale price, and member note.
**States:** default, hover, favorite, sale, unavailable, member exclusive.

### black-primary-pill

**Status:** current
**Live source:** Nike retail CTAs
**Description:** Black pill action for Shop, Buy, Add to Bag, Join Us, or Sign In.
**States:** default, hover, focus, loading, disabled.

### white-primary-pill

**Status:** current
**Live source:** Nike dark editorial/SNKRS surfaces
**Description:** White pill action on black/dark campaign surfaces.
**States:** default, hover, focus, loading, disabled.

### category-nav-chip

**Status:** current
**Live source:** Nike category pages
**Description:** Category/filter chip for Men, Women, Kids, Jordan, Running, Basketball, Training, Lifestyle, and Sale.
**States:** default, selected, hover, disabled.

### filter-drawer

**Status:** current
**Live source:** Product listing pages
**Description:** Filter drawer for size, colour, brand, collection, activity, price, and sale.
**States:** closed, open, selected filters, clear all, mobile.

### sort-control

**Status:** current
**Live source:** Product listing pages
**Description:** Sort menu for featured, newest, price, and relevance.
**States:** closed, open, selected.

### new-arrivals-feed

**Status:** current
**Live source:** `https://www.nike.com/w/new-3n82y`
**Description:** Feed/grid for newest products and drops across departments and sports.
**States:** default, just in, member exclusive, filtered.

### jordan-feature-card

**Status:** current
**Live source:** Nike home/category pages
**Description:** Jordan product/story card with black/red or photography-led identity.
**States:** default, shop, drop, story.

### snkrs-drop-card

**Status:** current
**Live source:** SNKRS route references
**Description:** Drop card for release date, product image, launch status, and notify/buy action.
**States:** upcoming, available, sold out, notify me, draw open.

### air-max-card

**Status:** current
**Live source:** Nike pages referencing Air Max
**Description:** Product-family card for Air Max footwear.
**States:** default, collection, sale, new colourway.

### running-card

**Status:** current
**Live source:** Nike running/category references
**Description:** Running category card for Pegasus, Vomero, racing, and training products.
**States:** default, shop shoes, shop apparel, guide.

### basketball-card

**Status:** current
**Live source:** Nike basketball/category references
**Description:** Basketball category card for performance shoes, apparel, and athlete/story surfaces.
**States:** default, shop, featured, sale.

### training-card

**Status:** current
**Live source:** Nike training/category references
**Description:** Training category card for Metcon, apparel, and workout products.
**States:** default, shop, new, sale.

### pegasus-product-card

**Status:** current
**Live source:** Current pages referencing Pegasus
**Description:** Product-family card for Pegasus running shoes.
**States:** default, selected colour, sale, compare.

### dunk-product-card

**Status:** current
**Live source:** Current pages referencing Dunk
**Description:** Product-family card for Dunk lifestyle shoes.
**States:** default, colourway selected, drop, sale.

### vomero-product-card

**Status:** current
**Live source:** Current pages referencing Vomero
**Description:** Product-family card for Vomero running shoes.
**States:** default, new, compare, sale.

### metcon-product-card

**Status:** current
**Live source:** Current pages referencing Metcon
**Description:** Product-family card for Metcon training shoes.
**States:** default, shop, new, sale.

### sale-price-row

**Status:** current
**Live source:** Nike product grids
**Description:** Price row with original price, sale price, discount marker, and sale green/red signal where applicable.
**States:** regular, sale, member price, sold out.

### member-benefit-card

**Status:** current
**Live source:** Nike member surfaces
**Description:** Card for member access, free shipping, early drops, or app benefits.
**States:** default, joined, sign in, exclusive.

### product-detail-gallery

**Status:** current
**Live source:** Nike PDP patterns
**Description:** Product-detail image gallery with thumbnails, large product images, video, and colourways.
**States:** image selected, video, zoomed, mobile carousel.

### size-selector

**Status:** current
**Live source:** Nike PDP patterns
**Description:** Size grid for footwear/apparel with availability and error messaging.
**States:** available, selected, unavailable, error, size guide open.

### bag-summary-card

**Status:** current
**Live source:** Nike cart/checkout patterns
**Description:** Bag summary with item count, subtotal, delivery, promo, and checkout action.
**States:** empty, item added, promo applied, checkout disabled.

### editorial-story-card

**Status:** current
**Live source:** Nike homepage/editorial modules
**Description:** Photo-led story card with short headline, category, CTA, and campaign imagery.
**States:** default, video, hover, linked.

### app-download-card

**Status:** current
**Live source:** Nike app/member/SNKRS routes
**Description:** Card for Nike App or SNKRS app download and member engagement.
**States:** default, app store links, QR code, signed in.

### footer-link-columns

**Status:** current
**Live source:** Nike footer
**Description:** Footer with resources, help, company, promotions, location, and legal links.
**States:** desktop columns, mobile accordion, location open.

### dark-snkrs-panel

**Status:** current
**Live source:** Nike dark/SNKRS editorial surfaces
**Description:** Black campaign/drop panel with white type, product photography, and white/black action pills.
**States:** default, drop card, product row, CTA.

## §5 Usage rules

- Lead with product photography or product grid structure. Nike without product imagery feels wrong.
- Keep UI chrome black, white, and gray. Use colour for product/campaign/sale signals.
- Use giant uppercase display only for true campaign/editorial moments.
- Product grids should be dense and retail-practical: name, category, colour count, price, sale, and filters.
- Use rounded pills for actions and filters, but keep product cards restrained.
- Avoid generic SaaS feature sections and decorative icons.

## §6 Preview guidance

- Light preview should show white retail chrome, black pills, product-grid cards, filters, and campaign photography placeholders.
- Dark preview should read as SNKRS/editorial black canvas, not a generic inverted commerce page.
- Include at least one product grid/listing component and one campaign/drop component in substantial Nike artifacts.
- A correct Nike preview feels like retail motion and athletic product discipline.
