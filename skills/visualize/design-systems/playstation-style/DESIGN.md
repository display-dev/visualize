---
slug: playstation-style
name: PlayStation Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.playstation.com/en-us/
  - https://www.playstation.com/en-us/ps5/
  - https://www.playstation.com/en-us/ps-plus/
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

# PlayStation Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Official site | https://www.playstation.com/en-us/ | White/dark product marketing | Current title: "PlayStation Official Site: Consoles, Games, Accessories & More." Metadata emphasizes PS4 and PS5 consoles, immersive gaming, and hit games. |
| PS5 | https://www.playstation.com/en-us/ps5/ | Console launch page | Current title: "PlayStation 5 | Play Has No Limits." Metadata emphasizes PS5, Digital Edition, slim design, best PS5 games, accessories, and DualSense wireless controller. |
| PS Plus | https://www.playstation.com/en-us/ps-plus/ | Membership commerce | Current metadata emphasizes Essential, Extra, Premium, hundreds of PS4/PS5 games, online multiplayer, classics catalog, discounts, and more. |

PlayStation is a product-and-entertainment system with alternating white, black, and PlayStation Blue chapters. The most important visual material is the console render, controller, game key art, subscription tier artwork, and product photography. Chrome should feel polished and light, never decorative for its own sake.

## §2 Palette

### Core Canvases

- `--background`: white product canvas.
- `--foreground`: black primary ink.
- `--primary`: PlayStation Blue for primary CTAs, tabs, focus, and product navigation.
- `--primary-foreground`: white on PlayStation Blue.
- `--brand-canvas-dark`: black signature band for game/key-art chapters, footer, and console launch moments.
- `--brand-surface-dark-card`: dark card inside dark chapters.
- `--card`: pale cool-tinted surface for product/filter cards.

### Commerce And Membership

- `--brand-commerce`: orange-red commerce action for buy/store moments where PlayStation uses purchase emphasis.
- `--brand-ps-plus-gold-*`: PS Plus membership gradient family. Reserve for Plus tier panels and subscription branding.
- `--brand-marathon-yellow`: title-specific campaign accent; do not generalize it.
- `--brand-link-light` and `--brand-link-dark`: link colour by canvas.

### Drift vs `tokens.css`

- The token package is aligned: PlayStation Blue, white/black chaptering, cool product cards, dark signature bands, PS Plus gold family, commerce orange, and hand-tuned dark mode.
- Current source inventory should emphasize PlayStation, PS5, PS4, Play Has No Limits, console, games, accessories, DualSense, PS5 Pro/Slim, PlayStation Store, PlayStation Plus, Essential, Extra, Premium, monthly games, classics catalog, game trials, and cloud streaming where surfaced.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | PlayStation SST | 300-600 | 44-64px | 1.15-1.3 | 0 |
| Heading | PlayStation SST | 300-600 | 32-48px | 1.15-1.3 | 0 |
| Title | PlayStation SST | 600-700 | 16-22px | 1.1-1.3 | 0 |
| Body | PlayStation SST | 400 | 16-19px | 1.45-1.65 | 0 |
| Label | PlayStation SST | 600-700 | 12-14px | 1.2-1.4 | 0 |
| Mono | system mono only for technical/legal snippets | 400 | 12-14px | 1.4-1.6 | 0 |

Use airy, premium headings. Game and product names can carry stronger weight; explanatory body copy should stay calm and readable.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://www.playstation.com/en-us/`
**Description:** PlayStation header with logo, Games, PS5, PS4, Services, Accessories, News, Store, support, search, and account routes.
**States:** desktop, mobile, menu open, search open, signed in, active route.

### ps5-hero

**Status:** current
**Live source:** `https://www.playstation.com/en-us/ps5/`
**Description:** PS5 product hero for Play Has No Limits, console render, key feature copy, and primary CTA.
**States:** default, product image loaded, video, buy CTA, learn-more CTA.

### console-product-card

**Status:** current
**Live source:** Official site and PS5 page
**Description:** Card for PS5, PS5 Digital Edition, PS5 Pro/Slim, or PS4 with image, product name, short copy, and route.
**States:** default, compare, selected, buy, unavailable.

### dualsense-feature-card

**Status:** current
**Live source:** PS5/accessories references
**Description:** Feature card for DualSense wireless controller, haptics, adaptive triggers, colorways, and purchase route.
**States:** default, color selected, accessory bundle, buy.

### accessories-grid

**Status:** current
**Live source:** Official site/accessories inventory
**Description:** Grid for controllers, headsets, charging stations, media remote, camera, and storage/accessory products.
**States:** default, filtered, selected, sale, out of stock.

### game-key-art-hero

**Status:** current
**Live source:** PlayStation games surfaces
**Description:** Full-bleed game chapter with key art, title lockup, platform badges, release timing, and CTA.
**States:** default, trailer, pre-order, available, mature content.

### game-card

**Status:** current
**Live source:** Official site game catalog
**Description:** Game tile with cover art, title, platform, subscription/store status, and route.
**States:** default, hover, wishlisted, included in Plus, sale.

### game-carousel

**Status:** current
**Live source:** PlayStation landing/catalog patterns
**Description:** Horizontal carousel for featured, new, top, PS5, PS4, and PlayStation Plus games.
**States:** default, scrolled, selected, loading, mobile.

### store-offer-card

**Status:** current
**Live source:** Store/purchase conventions
**Description:** Commerce card with edition, price, discount, platform, rating, and add-to-cart action.
**States:** default, sale, pre-order, in cart, unavailable.

### blue-primary-pill

**Status:** current
**Live source:** PlayStation marketing CTAs
**Description:** Fully rounded PlayStation Blue CTA for Learn More, Buy Now, Explore, or Join.
**States:** default, hover, focus, loading, disabled.

### commerce-button

**Status:** current
**Live source:** Purchase/store contexts
**Description:** Commerce-colored button for buy/add-to-cart moments where purchase is the primary task.
**States:** default, hover, in cart, loading, disabled.

### chapter-tabs

**Status:** current
**Live source:** Product pages
**Description:** Tab strip for Overview, Games, Accessories, Entertainment, Tech Specs, or membership details.
**States:** default, active, sticky, overflow, mobile dropdown.

### spec-comparison-table

**Status:** current
**Live source:** Console/product comparison conventions
**Description:** Table comparing console models, storage, output, performance, disc drive, controller, and included accessories.
**States:** default, highlighted column, sticky header, mobile stacked.

### ps-plus-hero

**Status:** current
**Live source:** `https://www.playstation.com/en-us/ps-plus/`
**Description:** Membership hero for PlayStation Plus with service promise, tier CTA, and game catalog artwork.
**States:** default, join CTA, upgrade CTA, signed in.

### ps-plus-tier-card

**Status:** current
**Live source:** PS Plus page
**Description:** Tier card for Essential, Extra, and Premium with benefits, price cadence, and join/upgrade action.
**States:** essential, extra, premium, current plan, selected.

### monthly-games-row

**Status:** current
**Live source:** PS Plus page
**Description:** Row/cards for monthly games included in the subscription.
**States:** default, claimable, claimed, expiring, platform filtered.

### classics-catalog-card

**Status:** current
**Live source:** PS Plus page
**Description:** Card for classics catalog content, platform generation, availability, and Premium gating.
**States:** default, premium-only, included, unavailable.

### game-trials-card

**Status:** current
**Live source:** PS Plus Premium references
**Description:** Card for timed game trials with duration, title, platform, and start/download action.
**States:** available, started, expired, premium-only.

### cloud-streaming-panel

**Status:** current
**Live source:** PS Plus Premium references
**Description:** Panel explaining cloud streaming availability, device/support requirements, and game catalog context.
**States:** supported, unsupported region, signed out, premium-only.

### news-card

**Status:** current
**Live source:** PlayStation news strips
**Description:** Editorial update card with image, category, title, date, and read-more route.
**States:** default, featured, video, press.

### rating-badge

**Status:** current
**Live source:** Game/store conventions
**Description:** ESRB/rating and content descriptor area for game/product pages.
**States:** default, pending, mature, expanded.

### platform-badge

**Status:** current
**Live source:** Game cards/product pages
**Description:** Compact badge for PS5, PS4, PS VR2, PC, or cross-gen availability.
**States:** default, selected, unavailable.

### vr2-feature-card

**Status:** current
**Live source:** Official site inventory references VR2/accessories
**Description:** Card for PlayStation VR2 hardware, games, and immersive features.
**States:** default, bundle, buy, game compatible.

### footer-mega-columns

**Status:** current
**Live source:** PlayStation footer conventions
**Description:** Footer with Support, About, Store, Services, legal, region, and social columns on dark or blue/white surface.
**States:** desktop, mobile accordion, region, legal.

## §5 Composition Rules

1. Use real product renders, console/controller photography, and game key art as the primary visual material.
2. Alternate full-width chapters: white product sections, dark cinematic sections, and occasional PlayStation Blue bands.
3. Keep CTAs rounded and clear; do not overdecorate them.
4. Put subscription complexity into tier cards and comparison tables, not prose blocks.
5. Reserve PS Plus gold for membership surfaces only.
6. Store/commerce moments can use orange purchase actions; marketing/explore moments stay blue.

## §6 Accessibility And States

- Blue CTAs need white text and visible focus on both light and dark canvases.
- Game key art needs text scrims or separate text panels where contrast is uncertain.
- Carousels require keyboard controls and non-hover navigation.
- Subscription tier comparisons need mobile-stacked labels.
- Store buttons and membership states must not rely on colour only.

## §7 Anti-Patterns

- Do not use abstract gaming gradients when game art or hardware renders are available.
- Do not turn every section dark; contrast comes from chapter alternation.
- Do not apply PS Plus gold to general PlayStation surfaces.
- Do not use technical-dashboard density for entertainment pages.
- Do not bury the console/game/product behind generic card grids.
