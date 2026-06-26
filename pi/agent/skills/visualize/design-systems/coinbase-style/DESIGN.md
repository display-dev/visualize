---
slug: coinbase-style
name: Coinbase Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://www.coinbase.com/
  - https://www.coinbase.com/advanced
  - https://www.coinbase.com/blog
  - https://www.coinbase.com/careers/
  - https://www.coinbase.com/developer-platform
  - https://help.coinbase.com/coinbase/trading-and-funding/advanced-trade/dashboard-overview
canonical-canvas: light
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: high
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Coinbase Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Retail marketing | https://www.coinbase.com/ | White commerce canvas with pale gray product bands | The global page is a white financial-services shell: top navigation, blue account CTA, product tiles, asset rows, and trust cards all sit on white or near-white. |
| Advanced trading marketing | https://www.coinbase.com/advanced | Mixed light/dark | The Advanced path presents professional trading through dark chart/product imagery inside the same light Coinbase site chrome. |
| Blog / newsroom | https://www.coinbase.com/blog | White editorial | The blog uses white navigation, category tabs, article cards, and dated bylines; the brand voice stays restrained rather than campaign-heavy. |
| Careers | https://www.coinbase.com/careers/ | White editorial with high-contrast culture copy | Careers keeps the same direct, black-on-white editorial posture and uses blue only for action/navigation emphasis. |
| Developer platform | https://www.coinbase.com/developer-platform | Blue-to-dark infrastructure surface plus light sections | Developer marketing introduces high-contrast infrastructure blocks and code/product modules, so the catalog entry cannot be light-only. |
| Help / Advanced dashboard | https://help.coinbase.com/coinbase/trading-and-funding/advanced-trade/dashboard-overview | Product-documentation white | Help content documents the Advanced dashboard rather than exposing the logged-in UI; it confirms chart-heavy, control-dense product vocabulary. |

Coinbase is `both`: the public brand is light-canonical for retail, editorial, careers, and help, but trading/developer/product storytelling repeatedly uses dark chart surfaces and dark infrastructure panels. Treat the dark mode as a real Coinbase product polarity, not as a pure inversion of the white homepage.

## §2 Palette

Each value below is derived from first-party Coinbase surfaces sampled on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.5282 0.2628 262.8699)` (= `#0052ff`). Live: `https://www.coinbase.com/` — sign-up CTAs, active navigation accents, link emphasis, and the Coinbase logo/glyph family.
- `--brand-primary-active`: `oklch(0.4676 0.2309 262.7887)` (= `#0045d8`). Live: `https://www.coinbase.com/` — darker button hover/pressed state implied by blue action controls.
- `--brand-primary-ink`: `oklch(0.2594 0.1151 261.4161)` (= `#001d5a`). Live: `https://www.coinbase.com/developer-platform` — deep blue infrastructure panels and dark-blue product accents.

### Documented secondary brand colours

- `--brand-semantic-up`: `oklch(0.6393 0.1604 154.2669)` (= `#00a75d`). Live: `https://www.coinbase.com/` — asset rows and market movement affordances use green for gains.
- `--brand-semantic-down`: `oklch(0.5507 0.2062 24.0010)` (= `#cf202f`). Live: `https://www.coinbase.com/` and Advanced-trade documentation — loss/delta language is red, not a general brand accent.
- `--accent`: `oklch(0.8505 0.1472 88.6724)` (= `#f5c84b`). Live: `https://www.coinbase.com/` — promotional membership and reward imagery uses warm yellow/gold as a campaign support colour, not a core action colour.

### Canvas + neutrals

- `--background`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: `https://www.coinbase.com/`, `https://www.coinbase.com/blog`, `https://www.coinbase.com/careers/` — primary document canvas.
- `--foreground`: `oklch(0.1493 0.0046 264.4735)` (= `#0a0b0d`). Live: `https://www.coinbase.com/` — headline/body ink and the dark product canvas.
- `--card`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: retail product cards and blog article cards.
- `--card-foreground`: `oklch(0.1493 0.0046 264.4735)` (= `#0a0b0d`). Live: card headings across retail and editorial surfaces.
- `--muted`: `oklch(0.9789 0.0029 264.5421)` (= `#f7f8fa`). Live: soft section bands on retail and editorial surfaces.
- `--muted-foreground`: `oklch(0.4921 0.0221 265.8169)` (= `#5b616e`). Live: footer links, disclaimers, article metadata, and secondary product copy.
- `--secondary`: `oklch(0.9545 0.0046 258.3249)` (= `#eef0f3`). Live: secondary button fills, table row dividers, and quiet tile backgrounds.
- `--secondary-foreground`: `oklch(0.1493 0.0046 264.4735)` (= `#0a0b0d`). Live: secondary controls and neutral card labels.
- `--border` / `--input`: `oklch(0.9151 0.0117 264.5077)` (= `#dfe3eb`). Live: nav separators, card outlines, table rules, and form-like market controls.
- `--ring`: `oklch(0.5282 0.2628 262.8699)` (= `#0052ff`). Live: keyboard/action affordance should follow the brand action blue.

### Polarity-locked surfaces

- `--brand-canvas-night`: `oklch(0.1493 0.0046 264.4735)` (= `#0a0b0d`). Live: `https://www.coinbase.com/advanced` and developer/product hero modules — chart and product mockup surfaces.
- `--brand-canvas-night-elevated`: `oklch(0.1779 0.0064 271.0422)` (= `#101114`). Live: dark product cards over near-black trading surfaces.
- `--brand-canvas-blue-deep`: `oklch(0.2594 0.1151 261.4161)` (= `#001d5a`). Live: developer platform infrastructure modules.
- `--brand-on-dark`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: dark hero/product text.
- `--brand-on-dark-soft`: `oklch(0.7434 0.0110 261.7836)` (= approximately `#a8adb7`). Live: secondary labels on dark chart/product cards.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9545 0.0046 258.3249)` (= `#eef0f3`). Live: site navigation and article/card dividers.
- `--brand-hairline-strong`: `oklch(0.9151 0.0117 264.5077)` (= `#dfe3eb`). Live: data rows, market tables, and bordered cards.

### Drift vs `tokens.css`

- `canonical-canvas` was imported as `light`; live sampling now warrants `both` because developer/product/trading storytelling uses dark first-party surfaces.
- `--brand-surface-dark` already matches the live night canvas, but the token name should become `--brand-canvas-night` in a future cascade so consumers read as polarity-locked surfaces rather than imported generic "surface-dark" extras.
- `--accent` is acceptable as a warm campaign support value, but it should stay out of structural eyebrows and CTAs. Coinbase Blue remains the only default action colour.
- Existing dark-mode overrides are directionally right: they use the real near-black Coinbase product canvas instead of naive OKLCH inversion. No immediate token value change is required for this refresh beyond the frontmatter/canonical-canvas update.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Coinbase Display, system sans fallback | 400 | 64-80px marketing hero | 1.0-1.08 | -0.02em to -0.03em |
| Heading | Coinbase Display, system sans fallback | 400-500 | 40-64px section heads | 1.05-1.15 | -0.015em to -0.025em |
| Title | Coinbase Sans, system sans fallback | 500-600 | 18-24px cards and modules | 1.25-1.35 | 0 |
| Body | Coinbase Sans, system sans fallback | 400 | 15-18px | 1.45-1.6 | 0 |
| Caption | Coinbase Sans, system sans fallback | 400-500 | 12-14px | 1.35-1.5 | 0 |
| Mono | ui-monospace fallback | 500 | 11-13px | 1.3-1.5 | 0.04em-0.08em for uppercase labels |

The live site does not expose the licensed font binaries through this catalog workflow. The preview should keep the Coinbase family names first and fall back to Inter/system. The important behavior is calm weight, tight display leading, and sparse tracking only on utility labels.

## §4 Component vocabulary

### global-navigation

**Status:** current
**Live source:** `https://www.coinbase.com/` — top-level navigation and mega-menu labels
**Description:** White 64px-class navigation with Coinbase logo at left, segmented audience groups, neutral text links, and one blue sign-up action. Dropdown content is structured by audience columns: Individuals, Businesses, Institutions, Developers, and Company.
**States:** default white canvas, hover darkens neutral link ink, active/promotional links use Coinbase Blue, mobile collapses into icon navigation.

### blue-primary-pill

**Status:** current
**Live source:** `https://www.coinbase.com/` — Sign up / Create account CTA
**Description:** Solid Coinbase Blue rounded pill or rounded rectangle, white label, medium-weight sans text, 44-56px touch height. It is the highest-energy item in otherwise quiet sections.
**States:** default blue, hover/pressed darker blue, focus blue ring, disabled low-chroma pale blue/gray.

### neutral-secondary-button

**Status:** current
**Live source:** `https://www.coinbase.com/` — secondary marketing and support CTAs
**Description:** Pale gray or white button with low-contrast border/fill, dark label, and matching pill radius. It reads as a secondary financial-services control rather than a marketing badge.
**States:** default soft gray/white, hover slightly darker gray, focus blue ring.

### text-link-with-arrow

**Status:** current
**Live source:** `https://www.coinbase.com/`, `https://www.coinbase.com/blog` — Learn more / article links
**Description:** Inline blue or dark text link with small arrow/external marker. Links are compact and rarely decorated; the arrow supplies movement instead of underlines or icon-heavy buttons.
**States:** default blue or inherited ink, hover darkens/underlines only when needed for clarity.

### trust-hero

**Status:** current
**Live source:** `https://www.coinbase.com/` — "The most trusted crypto trading app"
**Description:** Centered or split hero with oversized calm headline, short regulated-trust subcopy, and one blue conversion CTA. Visual support comes from product/mobile imagery, not abstract ornament.
**States:** desktop balanced around large visual, mobile stacks with CTA immediately after text.

### market-asset-row

**Status:** current
**Live source:** `https://www.coinbase.com/` — Bitcoin/Ethereum/Tether market list
**Description:** Dense data row with asset name, price, and directional delta. Rows use white background, faint separators, and compact icon circles so the market feed remains legible inside a consumer landing page.
**States:** default neutral row, gain green, loss red, hover row tint/linked state.

### product-feature-card

**Status:** current
**Live source:** `https://www.coinbase.com/` — Coinbase One, staking, Advanced Trade, security cards
**Description:** Rounded card or section tile pairing product imagery with short headline and restrained body copy. Cards use white or soft-gray surfaces, generous padding, and minimal shadow.
**States:** static card, linked card may lift via image/link treatment rather than heavy shadow.

### advanced-trading-module

**Status:** current
**Live source:** `https://www.coinbase.com/advanced`, `https://help.coinbase.com/coinbase/trading-and-funding/advanced-trade/dashboard-overview`
**Description:** Professional trading module with dark chart/product imagery, order-type language, compact controls, and data-heavy layout. The dark product surface is treated as a real brand surface.
**States:** dark chart canvas, green/red deltas, selected controls in blue or strong neutral.

### promotional-membership-panel

**Status:** current
**Live source:** `https://www.coinbase.com/` — Coinbase One promotional section
**Description:** Campaign panel that keeps the Coinbase shell but introduces warmer imagery and reward language. It may use gold/yellow assets, but the actionable control remains blue or neutral.
**States:** default campaign image/card, CTA blue, footnotes muted.

### editorial-article-card

**Status:** current
**Live source:** `https://www.coinbase.com/blog` — featured posts and article lists
**Description:** White card/list entry with image thumbnail, category, headline, author/date metadata, and short dek. The layout is newsroom-like: broad white margins, black headlines, light dividers.
**States:** default article card, hover image/link emphasis, category tab active state.

### blog-category-tabs

**Status:** current
**Live source:** `https://www.coinbase.com/blog` — Product / Company / Policy / Engineering / International / Ventures filters
**Description:** Horizontal text tabs with compact spacing. Active category is indicated by text weight/underline or subtle blue emphasis, not a filled capsule.
**States:** default neutral text, active stronger ink/blue, hover darkens.

### careers-culture-section

**Status:** current
**Live source:** `https://www.coinbase.com/careers/` — culture tenets and open roles
**Description:** Direct editorial blocks with blunt headlines, long-form copy, and simple action links. The surface is mostly white with high contrast type and minimal decorative treatment.
**States:** default text-first section, linked role/actions use blue.

### role-list-row

**Status:** current
**Live source:** `https://www.coinbase.com/careers/positions/`
**Description:** Job listing row with title, team/location metadata, and clear navigation. It follows the market-row pattern: list density, strong title, muted secondary data.
**States:** default row, hover row/link emphasis, filters as compact controls.

### developer-infrastructure-hero

**Status:** current
**Live source:** `https://www.coinbase.com/developer-platform`
**Description:** Higher-contrast developer surface presenting platform primitives with blue/dark infrastructure imagery, API/product modules, and technical solution cards.
**States:** light marketing sections alternate with dark/blue infrastructure bands; code/product modules should keep dark polarity.

### solution-grid-card

**Status:** current
**Live source:** `https://www.coinbase.com/developer-platform` — Payments, Trading, Wallets, Stablecoins
**Description:** Grid card with icon, terse product title, and one-line capability text. The card is quiet enough for enterprise browsing and technical enough for developer routing.
**States:** default card, hover border/link emphasis, icon often blue or neutral.

### footer-link-column

**Status:** current
**Live source:** `https://www.coinbase.com/` — footer index
**Description:** Large utilitarian footer with many product/support/company links grouped under simple headings. It uses muted text hierarchy, not brand-colour section labels.
**States:** default muted links, hover darker/blue depending on context.

### legal-footnote-block

**Status:** current
**Live source:** `https://www.coinbase.com/` — offer footnotes and legal disclosures
**Description:** Small muted copy under promotional or financial claims. Footnotes are visually subordinate but remain readable; they carry regulatory trust.
**States:** static muted text, inline legal links darker/blue.

### icon-circle

**Status:** current
**Live source:** `https://www.coinbase.com/` — product and trust modules
**Description:** Minimal geometric icon inside a circular or rounded container. Icons are monochrome, blue, or neutral; the brand does not lean on multicolour illustration for core navigation.
**States:** default neutral/blue icon, selected/action state blue fill or blue glyph.

### product-ui-mockup-card

**Status:** current
**Live source:** `https://www.coinbase.com/`, `https://www.coinbase.com/advanced`
**Description:** Screen-like card showing portfolio, chart, or mobile product UI. Uses layered panels, dark canvases for trading, rounded corners, and crisp data labels.
**States:** static mockup, semantic deltas green/red, focus on readable financial data.

### search-filter-control

**Status:** current
**Live source:** `https://www.coinbase.com/blog`, `https://www.coinbase.com/careers/positions/`
**Description:** Compact input/filter affordance for list navigation. White or soft-gray fill, subtle border, dark text, blue focus.
**States:** default, focused blue ring/border, selected filters stronger ink.

### disclosure-menu-item

**Status:** current
**Live source:** `https://www.coinbase.com/` — mega-menu entries
**Description:** Menu row with small icon, product label, and one-line descriptor. The hierarchy is practical: audience headings, product rows, and a short promotional callout.
**States:** default row, hover soft-gray background/darker text, external links include arrow marker.

### security-trust-card

**Status:** current
**Live source:** `https://www.coinbase.com/` — account/data protection, customer assets, public company cards
**Description:** Trust module that pairs conservative copy with simple imagery. The palette stays white/neutral so claims feel institutional rather than speculative.
**States:** default card, linked "Learn more" state.

### chart-delta-chip

**Status:** current
**Live source:** `https://www.coinbase.com/` market rows and Advanced-trade documentation
**Description:** Compact percent/arrow indicator in green or red. The chip is a data semantic, not decoration; it must be readable against both white rows and dark product cards.
**States:** gain green, loss red, unchanged muted neutral.

### app-store-badge

**Status:** current
**Live source:** `https://www.coinbase.com/` — mobile app acquisition paths
**Description:** Store/download affordance appears as a compact badge or linked button, usually in neutral black/white platform styling adjacent to Coinbase CTAs.
**States:** default platform badge, hover opacity/contrast change.

### documentation-help-article

**Status:** current
**Live source:** `https://help.coinbase.com/coinbase/trading-and-funding/advanced-trade/dashboard-overview`
**Description:** Help article with simple title, body copy, explanatory sections, and support navigation. It keeps the same restrained Coinbase typography but reduces marketing imagery.
**States:** static article, inline links blue, navigation items neutral.

## §5 Surface inventory

- `https://www.coinbase.com/` — primary retail marketing, global nav, blue CTA, market rows, trust cards, footer, legal footnotes.
- `https://www.coinbase.com/advanced` — professional trading marketing, dark chart/product vocabulary, order-type and data-density language.
- `https://www.coinbase.com/blog` — editorial surface, article cards, category tabs, author/date metadata.
- `https://www.coinbase.com/careers/` — text-first culture and recruiting surface; confirms white editorial canvas and blunt institutional tone.
- `https://www.coinbase.com/developer-platform` — developer/business infrastructure surface; confirms mixed polarity and technical product-card vocabulary.
- `https://help.coinbase.com/coinbase/trading-and-funding/advanced-trade/dashboard-overview` — help/docs article for Advanced Trade dashboard concepts.

## §6 Notes

- Coinbase Blue is the single default action voltage. Do not promote campaign gold, semantic green, or semantic red into primary controls.
- Dark surfaces are polarity-locked product/developer/trading surfaces. They should not become a chromatic inversion of the white homepage.
- Green and red are financial semantics. Keep them on deltas, charts, and market movement; avoid using them as decorative accents.
- The visual system gets its confidence from restraint: white space, short copy, real product data, and one blue action.
- Avoid lifting live Coinbase product names, promotional offers, asset prices, or trust claims into Halcyon content. Use neutral financial/data placeholders.

## §Known gaps

- Logged-in Coinbase app, Advanced Trade, Prime, and institutional dashboards were not accessed. Public marketing/help surfaces document the product vocabulary, but exact app chrome requires authenticated sampling.
- Chrome DevTools MCP was unavailable in this session, so persistent screenshot capture was deferred. The refresh used first-party page fetches and accessible text from Coinbase-owned URLs.
- Coinbase's licensed font files were not extracted. The catalog should keep Coinbase family names as first-choice labels and provide system fallbacks.
