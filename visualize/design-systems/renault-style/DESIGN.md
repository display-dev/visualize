---
slug: renault-style
name: Renault Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.renault.co.uk/
  - https://www.renault.co.uk/electric-vehicles.html
  - https://www.renault.co.uk/cars/renault-5-e-tech-electric.html
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

# Renault Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| UK homepage | https://www.renault.co.uk/ | White/black/yellow automotive retail | Live inventory emphasizes Renault, cars, electric, hybrid, E-Tech, and offers. |
| Electric vehicles | https://www.renault.co.uk/electric-vehicles.html | EV education and range | Live inventory emphasizes Renault, E-Tech, electric, range, charging, hybrid, and cars. |
| Renault 5 E-Tech electric | https://www.renault.co.uk/cars/renault-5-e-tech-electric.html | Model launch/product page | Live inventory emphasizes Renault 5, E-Tech, electric, range, design, tech, and icon language. |

Renault is a product-led automotive system built from white utility surfaces, black cinematic product bands, and a single high-voltage yellow. The design needs real car imagery, model names, range/charging facts, configurator actions, and dealer/offer modules.

## §2 Palette

### Brand Core

- `--background`: white product/dealer canvas.
- `--foreground`: black primary ink.
- `--primary`: Renault yellow for primary CTA, badges, highlights, and charging/range emphasis.
- `--primary-foreground`: black text on yellow.
- `--brand-surface-dark`: black cinematic band for hero, footer, and model storytelling.
- `--brand-surface-deep`: dark raised panel inside black bands.
- `--secondary`: pale gray for filter bars, configurator cards, and comparison panels.

### Functional Signals

- `--brand-link`: blue link for utility/service routes.
- `--brand-success`, `--brand-warning`, `--brand-info`: range, offer, availability, and service status signals.
- `--brand-badge-new`: yellow new-model badge.

### Drift vs `tokens.css`

- The token package remains aligned: NouvelR typography, stark black/white canvas, Renault yellow, compact radii, pill CTAs, and black storytelling bands.
- Current source inventory should emphasize Renault, cars, electric, hybrid, E-Tech, range, charging, Renault 5 E-Tech electric, design, tech, offers, configurator, dealer, and accessories.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | NouvelR | 700 | 44-64px | 0.95-1.1 | 0 |
| Heading | NouvelR | 700 | 32-44px | 1.0-1.15 | 0 |
| Title | NouvelR | 600-700 | 18-24px | 1.1-1.3 | 0 |
| Body | NouvelR | 400 | 15-17px | 1.35-1.55 | 0 |
| Label | NouvelR | 600-700 | 12-14px | 1.2-1.4 | 0 |
| Mono | system mono only for technical values | 400 | 12-14px | 1.4-1.6 | 0 |

Use compact, bold product headings. Body copy should be dealership-clear: model, motor, range, charging, price/offer, and next action.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://www.renault.co.uk/`
**Description:** Renault header with diamond mark, model range, electric/hybrid, offers, owners/services, finance, search, and dealer actions.
**States:** desktop, mobile, model menu open, search open, active route.

### vehicle-range-hero

**Status:** current
**Live source:** UK homepage
**Description:** Hero for current Renault model range with car imagery, model name, short offer/range copy, and yellow/black CTA.
**States:** default, image loaded, video, configure CTA, offer CTA.

### renault-5-hero

**Status:** current
**Live source:** `https://www.renault.co.uk/cars/renault-5-e-tech-electric.html`
**Description:** Model launch hero for Renault 5 E-Tech electric with iconic design language, range/charging facts, and configurator action.
**States:** default, color selected, reserve/configure, media loaded.

### yellow-primary-button

**Status:** current
**Live source:** Renault CTAs
**Description:** Renault yellow action for configure, book a test drive, view offers, or order/reserve.
**States:** default, hover, focus, loading, disabled.

### black-secondary-button

**Status:** current
**Live source:** Dark/white automotive bands
**Description:** Black or outline action for learn more, compare, view stock, or download brochure.
**States:** default, hover, focus, disabled.

### model-card

**Status:** current
**Live source:** Homepage car range
**Description:** Vehicle card with model image, name, engine type, starting price/offer, range indicator, and CTA.
**States:** electric, hybrid, petrol, new, offer, unavailable.

### electric-range-card

**Status:** current
**Live source:** Electric vehicles page
**Description:** Card explaining EV range with model, WLTP range where provided, battery/efficiency context, and route.
**States:** default, model selected, range highlighted, footnoted.

### charging-explainer-panel

**Status:** current
**Live source:** Electric vehicles page
**Description:** Educational panel for home/public charging, time, connector, costs, and planning.
**States:** home, public, fast charge, calculator, region note.

### e-tech-badge

**Status:** current
**Live source:** Electric/hybrid pages
**Description:** Badge identifying E-Tech electric or hybrid technology.
**States:** electric, full hybrid, plug-in hybrid, unavailable.

### configurator-card

**Status:** current
**Live source:** Renault retail/conversion flows
**Description:** Configurator summary with trim, colour, wheels, powertrain, price, finance/monthly estimate, and next action.
**States:** empty, configured, finance selected, saved, error.

### trim-selector

**Status:** current
**Live source:** Model/configurator conventions
**Description:** Selector for trims/versions with feature highlights and price step.
**States:** default, selected, unavailable, recommended.

### colour-swatch-row

**Status:** current
**Live source:** Model/configurator conventions
**Description:** Swatch row for exterior colours with name, price, and selected state.
**States:** default, selected, premium, unavailable.

### finance-offer-card

**Status:** current
**Live source:** Offers/dealer conventions
**Description:** Offer card with monthly payment, deposit, APR, duration, exclusions, and CTA.
**States:** default, highlighted, expired, selected.

### dealer-locator-panel

**Status:** current
**Live source:** Retail/service flow
**Description:** Dealer search panel with postcode/location, nearest retailers, distance, availability, and appointment route.
**States:** empty, results, selected, no results, loading.

### test-drive-form

**Status:** current
**Live source:** Conversion flow
**Description:** Form for model, dealer, contact details, date preference, and consent.
**States:** empty, validating, submitted, error.

### comparison-table

**Status:** current
**Live source:** Vehicle range comparison
**Description:** Model comparison for powertrain, range, boot space, price, charging, dimensions, and features.
**States:** default, model selected, highlighted row, mobile stacked.

### spec-value-strip

**Status:** current
**Live source:** Model pages
**Description:** Compact strip for range, charging time, power, acceleration, boot space, and warranty.
**States:** default, footnoted, unavailable.

### accessories-card

**Status:** current
**Live source:** Vehicle/accessories flow
**Description:** Card for accessory bundles, charging cables, protection, roof bars, and interior options.
**States:** default, selected, included, unavailable.

### service-owner-card

**Status:** current
**Live source:** Owners/services routes
**Description:** Card for servicing, warranty, maintenance, connected services, and owner support.
**States:** default, signed in, booked, due.

### black-story-band

**Status:** current
**Live source:** Renault storytelling/product bands
**Description:** Full-width black section with car image, white text, yellow accent, and one focused product/design/tech message.
**States:** default, image loaded, feature selected, CTA.

### yellow-highlight-band

**Status:** current
**Live source:** Renault brand accent usage
**Description:** High-voltage yellow band for new model, offer, or E-Tech emphasis with black text only.
**States:** default, badge, CTA, footnote.

### technology-feature-card

**Status:** current
**Live source:** Renault 5 / electric model tech sections
**Description:** Card for infotainment, driver assistance, battery, connectivity, and safety features.
**States:** default, expanded, video, spec linked.

### news-offer-tile

**Status:** current
**Live source:** Homepage/offers sections
**Description:** Tile for promotions, model news, ownership updates, or limited-time offers.
**States:** default, new, expires soon, selected.

### footer-dealer-columns

**Status:** current
**Live source:** Renault footer conventions
**Description:** Footer for models, buying tools, owners, services, finance, legal, social, and region links.
**States:** desktop, mobile accordion, dark, legal.

## §5 Composition Rules

1. Lead with the car. Product photography/rendering must be the main visual object.
2. Use yellow as a sharp signal: CTA, new badge, E-Tech highlight, or range fact.
3. Alternate white utility sections with black storytelling bands.
4. Keep cards square or modestly rounded; avoid soft SaaS surfaces.
5. EV content needs concrete range/charging context and footnotes where claims require it.
6. Conversion flows should foreground configure, offers, dealer, and test drive.

## §6 Accessibility And States

- Yellow always carries black text; never white-on-yellow.
- Text over car photography needs scrims or separate panels.
- Finance/range claims need visible footnote handling.
- Configurator and dealer forms need clear focus, validation, and disabled states.
- Dark bands need white text and yellow accents with sufficient spacing.

## §7 Anti-Patterns

- Do not turn Renault yellow into a page-wide wash.
- Do not use luxury minimalism that hides retail tools.
- Do not use generic EV gradients or abstract green leaves.
- Do not detach range/charging claims from model context.
- Do not bury configurator/dealer actions behind editorial copy.
