---
slug: meta-style
name: Meta Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.meta.com/
  - https://www.meta.com/quest/
  - https://www.meta.com/ai-glasses/
canonical-canvas: light
selection:
  mood: [industrial, spatial]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with industrial, spatial visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Meta Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Meta Store | https://www.meta.com/ | White consumer-commerce shell | Current source title is "Meta - Shop AI glasses and VR headsets"; page promotes AI glasses, wearable technology, Ray-Ban Meta, Oakley Meta, display glasses, and VR headsets. |
| Quest | https://www.meta.com/quest/ | White/gray VR commerce | Quest page title is "Meta Quest VR Headsets and Accessories"; messaging centers Quest 3S, VR gaming, digital entertainment, accessories, and headset comparison. |
| AI glasses | https://www.meta.com/ai-glasses/ | Lifestyle product commerce | AI glasses page title is "Meta AI Glasses: Ray-Ban Meta & Oakley Meta"; messaging centers built-in Meta AI, open-ear audio, camera, and everyday-life styling. |

Meta Store is light-canonical. The brand uses stark white, cool gray, near-black ink, saturated cobalt commerce actions, rounded product cards, full-bleed product photography, and hardware configurator patterns. Dark appears as photo overlays or promo strips rather than a published system-wide dark theme.

## §2 Palette

Values were sampled from current Meta Store pages on 2026-05-28 and aligned to existing tokens.

### Commerce neutrals

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Live: primary page canvas.
- `--foreground`: `oklch(0.2342 0.0065 258.3633)`. Charcoal text register from existing token set.
- `--secondary`: `oklch(0.9657 0.0051 247.8773)` and live `#F2F4F6` (`oklch(0.9662 0.0034 247.8586)`). Cool gray section and card background.
- `--border`: `oklch(0.8572 0.0059 264.5291)` with live `#D0D3D6` (`oklch(0.8654 0.0053 247.8855)`). Hairline and input border.
- `--brand-ink-deep`: `oklch(0.1798 0.0158 227.4213)` and live `#111112` (`oklch(0.1781 0.0020 286.1918)`). Deep promo strip / dark overlay ink.
- `--brand-charcoal`: `oklch(0.4034 0.0135 256.7574)`. Body/supporting copy.
- `--brand-stone`: `oklch(0.6621 0.0289 246.5215)` and live `#9FA4AB` (`oklch(0.7168 0.0116 256.7118)`). Metadata, disabled, and quiet labels.

### Meta blue and product accents

- `--primary`: `oklch(0.4700 0.2049 258.8101)`. Accessibility-deepened Meta cobalt action. Live source also carries `#0064E0` (`oklch(0.5334 0.2049 258.8101)`).
- `--brand-primary-deep`: `oklch(0.4898 0.1935 259.7076)`. Deep cobalt.
- `--brand-primary-soft`: `oklch(0.6515 0.1920 251.4696)`. Soft/lighter cobalt.
- `--brand-fb-blue`: `oklch(0.5871 0.2040 258.1007)` and live `#1877F2`. Facebook-family blue used sparingly.
- `--brand-meta-link`: `oklch(0.4685 0.1107 262.8139)`. Link blue.
- `--brand-oculus-purple`: `oklch(0.5409 0.2461 314.6351)` with live purple `#6B1EFD`.
- `--destructive`: `oklch(0.5308 0.2178 29.2339)` with live red `#D31130`.
- `--brand-success`: `oklch(0.6296 0.1598 147.6777)` and live green family `#076D29`.
- `--brand-warning`: `oklch(0.8214 0.1600 82.5337)`. Promo/warning emphasis.

### Drift vs `tokens.css`

- `tokens.css` is aligned: light canonical canvas, cobalt primary, cool gray surfaces, Optimistic/Inter stack, pill buttons, and dark-mode synthesis based on the deep ink surface.
- The live product mix has shifted further toward AI glasses and wearable technology: Ray-Ban Meta, Oakley Meta, display glasses, open-ear audio, camera, Meta AI, and Quest 3S.
- No token cascade is required. The refresh updates content vocabulary and live source framing.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Optimistic VF / Inter / Helvetica Neue | 500-600 | 48-72px | 1.05-1.16 | 0 |
| Heading | Optimistic VF / Inter / Helvetica Neue | 500-600 | 32-52px | 1.12-1.24 | 0 |
| Title | Optimistic VF / Inter / Helvetica Neue | 500-600 | 20-30px | 1.25-1.4 | 0 |
| Body | Optimistic VF / Inter / Helvetica Neue | 400-500 | 15-18px | 1.45-1.6 | 0 |
| Caption | Optimistic VF / Inter / Helvetica Neue | 400-500 | 12-14px | 1.3-1.5 | 0 |
| Mono | JetBrains Mono / system mono | 400 | 12-14px | 1.45-1.65 | 0 |

Meta Store typography should be clean and consumer-commerce readable. It can be large, but it should not become editorially expressive or developer-dense.

## §4 Component vocabulary

### store-global-header

**Status:** current
**Live source:** `https://www.meta.com/` — global store header
**Description:** Header for Meta Store with product categories, account/cart support, search, and commerce navigation.
**States:** default, mega-menu open, search open, cart count, mobile drawer.

### ai-glasses-hero

**Status:** current
**Live source:** `https://www.meta.com/ai-glasses/`
**Description:** Hero for Ray-Ban Meta and Oakley Meta AI glasses using lifestyle imagery, product name, short AI/audio/camera value proposition, and shop/learn actions.
**States:** default, image loaded, shop CTA, learn-more CTA, mobile.

### meta-store-hero

**Status:** current
**Live source:** `https://www.meta.com/`
**Description:** Commerce hero for shopping AI glasses, wearable technology, display glasses, and VR headsets.
**States:** default, product category active, seasonal promo, media loaded.

### quest-hero

**Status:** current
**Live source:** `https://www.meta.com/quest/`
**Description:** Quest VR headset hero for gaming, entertainment, Quest 3S, and headset exploration.
**States:** default, buy CTA, compare CTA, video/image loaded.

### cobalt-buy-button

**Status:** current
**Live source:** Meta Store product CTAs
**Description:** Saturated cobalt commerce action. Use for Buy now, Add to bag, Pre-order, and primary checkout paths.
**States:** default, hover, focus, disabled, loading.

### black-secondary-pill

**Status:** current
**Live source:** Meta Store hero/product CTAs
**Description:** Black or deep-ink pill button for high-contrast hero actions.
**States:** default, hover, focus, disabled.

### outlined-secondary-pill

**Status:** current
**Live source:** Meta Store CTA pairs
**Description:** White or transparent rounded secondary action with gray/black border and compact text.
**States:** default, hover, focus, disabled.

### category-card-grid

**Status:** current
**Live source:** `https://www.meta.com/` — store categories
**Description:** Rounded card grid for AI glasses, VR headsets, accessories, refurbished devices, and apps/services.
**States:** default, hover, selected, image loaded, mobile carousel.

### product-photography-card

**Status:** current
**Live source:** Meta Store product pages
**Description:** Large rounded image card with product photography, concise copy, and paired CTA.
**States:** default, hover, media loading, video overlay, dark photo overlay.

### ai-glasses-comparison-card

**Status:** current
**Live source:** `https://www.meta.com/ai-glasses/`
**Description:** Comparison card for Ray-Ban Meta and Oakley Meta, showing frame style, features, and purchase route.
**States:** Ray-Ban selected, Oakley selected, colorway selected, prescription note.

### display-glasses-card

**Status:** current
**Live source:** `https://www.meta.com/` — display glasses mention
**Description:** Product card for display glasses/wearable technology category.
**States:** default, learn more, coming soon, product image.

### meta-ai-feature-band

**Status:** current
**Live source:** `https://www.meta.com/ai-glasses/`
**Description:** Feature band explaining built-in Meta AI for everyday use.
**States:** default, voice prompt example, privacy note, image loaded.

### open-ear-audio-card

**Status:** current
**Live source:** `https://www.meta.com/ai-glasses/`
**Description:** Feature card for open-ear audio on AI glasses with lifestyle/product imagery.
**States:** default, audio active, spec link.

### camera-capture-card

**Status:** current
**Live source:** `https://www.meta.com/ai-glasses/`
**Description:** Feature card for camera/capture use cases on wearable glasses.
**States:** default, capture preview, privacy indicator, learn more.

### quest-3s-product-card

**Status:** current
**Live source:** `https://www.meta.com/quest/`
**Description:** Product card for Quest 3S with price, storage/configuration, hero image, and buy route.
**States:** default, selected storage, sale, out of stock.

### headset-comparison-table

**Status:** current
**Live source:** `https://www.meta.com/quest/`
**Description:** Comparison module for Quest headsets, accessories, capabilities, and price points.
**States:** desktop table, mobile cards, selected product, sticky CTA.

### accessory-card

**Status:** current
**Live source:** Meta Store Quest/accessory pages
**Description:** Commerce card for straps, controllers, charging docks, carrying cases, lenses, and other accessories.
**States:** default, sale, bundled, compatible, out of stock.

### configurator-option

**Status:** current
**Live source:** Meta Store PDP/buy flows
**Description:** Selection tile for size, storage, color, lens, strap, or bundle.
**States:** unselected, selected, unavailable, error, recommended.

### colorway-swatch-row

**Status:** current
**Live source:** Meta Store product configurators
**Description:** Rounded swatch row for glasses/headset colorways with active ring and accessible labels.
**States:** default, hover, selected, unavailable.

### price-summary-card

**Status:** current
**Live source:** Meta Store checkout/PDP
**Description:** Sticky or side summary showing product, selected options, price, financing, delivery, and add-to-bag action.
**States:** default, financing selected, promo applied, error, loading.

### promo-strip

**Status:** current
**Live source:** Meta Store promotional surfaces
**Description:** Promotional strip for discounts, bundles, financing, seasonal offers, or limited-time messages.
**States:** light, dark, warning/yellow, expired, dismissed.

### app-entertainment-card

**Status:** current
**Live source:** `https://www.meta.com/quest/`
**Description:** Card for VR games, entertainment, fitness, apps, or experiences.
**States:** default, featured, rating, price, trailer.

### horizon-worlds-card

**Status:** current
**Live source:** Quest ecosystem surfaces
**Description:** Ecosystem card for Horizon/social VR destinations and experiences.
**States:** default, event, live, featured world.

### education-support-card

**Status:** current
**Live source:** Meta Store support flows
**Description:** Support/help card for product setup, device help, warranty, returns, and account support.
**States:** default, category hover, article linked.

### account-cart-control

**Status:** current
**Live source:** Meta Store header
**Description:** Header control for account, cart, order state, and commerce session.
**States:** signed out, signed in, cart empty, cart has items.

### search-overlay

**Status:** current
**Live source:** Meta Store header
**Description:** Site search overlay for products, support, accessories, and categories.
**States:** closed, open, results, empty, loading.

### legal-privacy-footnote

**Status:** current
**Live source:** Meta Store product pages
**Description:** Dense footnote/legal block for availability, age requirements, financing, compatibility, and privacy disclosures.
**States:** collapsed, expanded, localized.

### footer-mega-links

**Status:** current
**Live source:** Meta Store footer
**Description:** Footer link system for products, apps, services, support, company, and policies.
**States:** desktop columns, mobile accordion, locale selected.

### dark-promo-panel

**Status:** current
**Live source:** Meta Store dark photo/promo moments
**Description:** Deep ink panel for product photography overlays, campaign moments, or hardware hero contrast.
**States:** default, image overlay, white CTA, cobalt CTA.

## §5 Usage rules

- Anchor the page in product commerce: product name, image, price or action, and concise proof.
- Use cobalt only for primary commerce and selected links. Do not turn Meta into a blue monochrome UI.
- Keep surfaces white and cool gray with generous rounded cards.
- Prefer real hardware photography or realistic product mockups. Abstract gradients do not carry this brand.
- Use pills for core commerce actions, but keep cards and comparison modules precise.
- Keep AI-glasses language practical: Meta AI, open-ear audio, camera, everyday use, Ray-Ban Meta, Oakley Meta.
- Keep Quest language spatial and entertainment-led: VR headsets, gaming, mixed reality, accessories, comparison.

## §6 Preview guidance

- Light preview should show white/cool-gray commerce surfaces, cobalt CTA, dark text, rounded product cards, and hardware-category modules.
- Dark preview may use deep ink as a synthesized store dark mode, but preserve product-card clarity and cobalt action.
- Include at least one AI glasses component and one Quest/VR component in substantial artifacts.
- A correct Meta preview feels like polished consumer hardware commerce, not Facebook app UI.
