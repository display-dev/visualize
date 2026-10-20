---
slug: framer-style
name: Framer Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://www.framer.com/
  - https://www.framer.com/pricing
  - https://www.framer.com/marketplace/templates/
  - https://www.framer.com/blog/
canonical-canvas: dark
selection:
  mood: [industrial, spatial]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with industrial, spatial visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Framer Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.framer.com/ | Dark product-builder canvas | Current homepage is black/near-black with white type, blue links/selection, website-builder product screenshots, AI/design/publish feature sections, and many showcase surfaces. |
| Pricing | https://www.framer.com/pricing | Dark commerce | Pricing keeps the black shell, white plan cards/text, blue accent links, and product-led comparison sections. |
| Templates marketplace | https://www.framer.com/marketplace/templates/ | Marketplace/catalogue surface | Template listing is lighter in available HTML but still belongs to Framer's builder/catalogue vocabulary: template cards, categories, creator attribution, preview links. |
| Blog | https://www.framer.com/blog/ | Dark editorial / product updates | Blog keeps the same dark shell, Framer typography, cards, and update/news rhythm. |

Framer is dark-canonical. Current live HTML repeatedly exposes `rgb(0,0,0)`, `rgb(8,8,8)`, `#141414`, `#171717`, `#1d1d1d`, white text, and `#0099ff` links. The existing token file is right to mirror dark mode rather than synthesize a light Framer.

## §2 Palette

Values were sampled from first-party Framer homepage, pricing, marketplace, and blog HTML on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(1 0 0)` (= `#ffffff`). Live: primary CTA fill on dark surfaces.
- `--primary-foreground`: `oklch(0 0 0)` (= `#000000`). Live: text on white pills.
- `--accent`: `oklch(0.6690 0.1837 248.8066)` (= `#0099ff`). Live: blue hyperlinks, selection states, product-highlight accents.
- `--brand-blue-strong`: `oklch(0.5332 0.2596 262.6358)` (= `#0055ff`). Live: deeper blue gradient/interactive state.

### Dark surfaces

- `--background`: `oklch(0.1398 0 0)` (= `#090909`). Live: dominant page floor / dark shell.
- `--brand-canvas-deep`: `oklch(0.1344 0 0)` (= `#080808`). Live: deepest hero/product floors.
- `--brand-surface-0`: `oklch(0.1776 0 0)` (= `#111111`). Live: subtle section/card surfaces.
- `--brand-surface-1`: `oklch(0.1913 0 0)` (= `#141414`). Live: card / nav / panel backgrounds.
- `--brand-surface-2`: `oklch(0.2046 0 0)` (= `#171717`). Live: raised card surfaces.
- `--brand-surface-3`: `oklch(0.2308 0 0)` (= `#1d1d1d`). Live: stronger panel fills.
- `--border`: `oklch(0.2178 0 0)` (= `#1a1a1a`). Live: hairlines and separators.
- `--brand-border-strong`: `oklch(0.3092 0 0)` (= `#303030`). Live: stronger boundaries.

### Text and neutral

- `--foreground`: `oklch(1 0 0)` (= `#ffffff`). Live: display and primary text.
- `--brand-ink-muted`: `oklch(0.6830 0 0)` (= `#999999`). Live: secondary text.
- `--brand-ink-soft`: `oklch(0.6268 0 0)` (= `#888888`). Live: quieter captions.
- `--brand-ink-dim`: `oklch(0.5103 0 0)` (= `#666666`). Live: low-emphasis captions and disabled states.
- `--brand-inverse-canvas`: `oklch(1 0 0)` (= `#ffffff`). Live: occasional white card/input surface.
- `--brand-inverse-ink`: `oklch(0 0 0)` (= `#000000`). Live: text on white pills/cards.

### Product colour

- `--brand-gradient-cyan`: `oklch(0.8341 0.1325 200.3840)` (= `#35E2EB`). Live: bright product/gradient highlight.
- `--brand-gradient-violet`: `oklch(0.6421 0.2152 296.6494)` (= `#9D66FD`). Live: violet gradient atmosphere.
- `--brand-semantic-success`: `oklch(0.7018 0.1473 165.1295)` (= `#00bb88`). Live: success/state accent.
- `--brand-lime`: `oklch(0.9301 0.2290 123.3145)` (= `#cbff00`). Live: rare high-voltage template/product accent.

### Drift vs `tokens.css`

- `tokens.css` is structurally correct: Framer is dark-canonical and both modes mirror `:root`.
- Add current surface aliases in a future cascade only if preview consumers need more precision: `--brand-canvas-deep`, `--brand-surface-0`, `--brand-surface-3`, `--brand-border-strong`, `--brand-blue-strong`, `--brand-gradient-cyan`, and `--brand-lime`.
- The old prose emphasized magenta/violet/orange atmosphere. Current live pages are more product-builder and catalogue oriented: blue links, white CTAs, gray surfaces, template/product screenshots, AI/CMS/publish sections.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | GT Walsheim Framer Medium / Inter Display fallback | 500 | 80-120px | 0.85-0.98 | -0.05em |
| Heading | GT Walsheim Medium / Inter Display fallback | 500 | 48-88px | 0.9-1.05 | -0.04em |
| Title | Inter Variable / Inter | 500-700 | 20-28px | 1.15-1.35 | -0.01em |
| Body | Inter Variable / Inter | 400 | 14-18px | 1.3-1.55 | -0.01em |
| Caption | Inter Variable / Inter | 400-500 | 12-14px | 1.2-1.45 | 0 |
| Mono | JetBrains Mono / Geist Mono / ui-monospace | 400-500 | 12-14px | 1.45-1.65 | 0 |

Framer mixes huge GT Walsheim display type with Inter product/body type. Marketplace templates can introduce many fonts inside preview cards; the Framer chrome itself should stay GT Walsheim / Inter.

## §4 Component vocabulary

### dark-builder-nav

**Status:** current
**Live source:** `https://www.framer.com/` — global navigation
**Description:** Dark top navigation for Product, Resources, Enterprise, Pricing, Login, Contact, and Get started.
**States:** default, hover, menu open, sticky, mobile drawer.

### white-primary-pill

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** White rounded CTA on black canvas with black text. This is the primary Framer action.
**States:** default, hover, active, focus, disabled.

### blue-text-link

**Status:** current
**Live source:** `https://www.framer.com/` and `https://www.framer.com/pricing`
**Description:** Bright `#0099ff` inline/product link. Use for learn-more routes, selected states, and subtle emphasis.
**States:** default, hover, active/current.

### product-mega-menu

**Status:** current
**Live source:** `https://www.framer.com/` — Product menu
**Description:** Navigation surface for Features, AI, Design, CMS, Collaboration, Localization, Publishing, Analytics, Updates, SEO, Navigation, Effects, and more.
**States:** default, open, product row hover, current product.

### resources-mega-menu

**Status:** current
**Live source:** `https://www.framer.com/` — Resources menu
**Description:** Menu linking Templates, Marketplace, Developers, Plugins, Partners, Academy, Experts, Blog, Updates, Help, Community, Awards, Gallery, and Glossary.
**States:** default, open, external route, badge/new.

### ai-builder-hero

**Status:** current
**Live source:** `https://www.framer.com/` — AI / generate and publish messaging
**Description:** Hero or product block for prompting a website, editing visually, and publishing from Framer.
**States:** prompt idle, generating, preview ready, published.

### canvas-artboard-panel

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** Large product screenshot/artboard surface with dark chrome, panels, selection handles, and site preview.
**States:** selected layer, drag/resize, preview, responsive breakpoint.

### template-card-grid

**Status:** current
**Live source:** `https://www.framer.com/marketplace/templates/`
**Description:** Marketplace grid of template cards with preview image, template name, creator, category, and price/free state.
**States:** default, hover preview, category filtered, paid/free, featured.

### marketplace-category-filter

**Status:** current
**Live source:** `https://www.framer.com/marketplace/templates/`
**Description:** Filter/navigation system for template categories and marketplace search.
**States:** default, active filter, search typed, no results.

### pricing-plan-card

**Status:** current
**Live source:** `https://www.framer.com/pricing`
**Description:** Dark pricing card with plan name, monthly price, features, and CTA. White/gray hierarchy, blue links.
**States:** mini/basic/pro/scale/enterprise, selected billing, popular, disabled.

### pricing-comparison-row

**Status:** current
**Live source:** `https://www.framer.com/pricing`
**Description:** Feature comparison row for sites, traffic, CMS, localization, bandwidth, and support.
**States:** included, not included, expandable, sticky header.

### cms-feature-card

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** Product block for structured CMS collections, fields, pages, and connected content.
**States:** collection selected, item editing, field type visible.

### localization-card

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** Localization/product card for multi-locale pages and translated content.
**States:** locale selected, translation pending, published.

### analytics-card

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** Analytics surface for visits, performance, SEO, and site health. Use dark cards and compact charts.
**States:** loading, hover point, empty, comparison.

### effects-showcase

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** Visual section for motion, scroll, interaction, and animation effects.
**States:** idle, hover, playing, reduced motion.

### plugin-card

**Status:** current
**Live source:** `https://www.framer.com/marketplace/plugins/`
**Description:** Marketplace tile for plugins with icon, description, install/open action, and creator attribution.
**States:** default, installed, hover, external.

### developers-code-card

**Status:** current
**Live source:** `https://www.framer.com/` — Developers / code examples
**Description:** Code/product card for custom code, components, and developer APIs. Use mono and dark surface.
**States:** default, copied, selected language, error.

### awards-gallery-card

**Status:** current
**Live source:** `https://www.framer.com/` — Awards / Gallery resources
**Description:** Showcase card for sites built with Framer, usually preview-first with creator/site metadata.
**States:** featured, hover, external site, award winner.

### blog-article-card

**Status:** current
**Live source:** `https://www.framer.com/blog/`
**Description:** Dark editorial card for product updates, launch notes, and design/build guidance.
**States:** default, hover, featured, category.

### update-note-row

**Status:** current
**Live source:** `https://www.framer.com/updates/`
**Description:** Release/update row with date, short title, and product impact. Keep it practical and compact.
**States:** default, new, linked, archived.

### academy-lesson-card

**Status:** current
**Live source:** `https://www.framer.com/academy/`
**Description:** Learning card for tutorials and course modules. Use screenshot thumbnail plus concise title.
**States:** default, started, completed, locked.

### expert-profile-card

**Status:** current
**Live source:** `https://www.framer.com/experts/`
**Description:** Creator/agency profile card with avatar/work preview, specialty, and contact path.
**States:** default, verified, featured, contacted.

### publish-status-chip

**Status:** current
**Live source:** Framer publish/product surfaces
**Description:** Small status chip for published, draft, syncing, or domain state.
**States:** published, draft, syncing, error.

### domain-connect-card

**Status:** current
**Live source:** Framer publishing/domain surfaces
**Description:** Settings-style card for custom domains, DNS, SSL, and site publish path.
**States:** connected, pending DNS, failed, verified.

### responsive-breakpoint-tabs

**Status:** current
**Live source:** Framer product/builder surfaces
**Description:** Tabs/segmented control for desktop, tablet, and mobile breakpoints.
**States:** desktop, tablet, mobile, custom breakpoint.

### seo-settings-card

**Status:** current
**Live source:** `https://www.framer.com/`
**Description:** Product card for title, description, OG image, sitemap, and SEO controls.
**States:** valid, missing metadata, preview, published.

## §5 Composition rules

- Keep the canvas black or near-black. A light Framer page should be treated as marketplace/card content, not the main brand system.
- Use white pills for primary actions and `#0099ff` for links and selected states.
- Product screenshots should look like a live web-builder: artboards, properties, CMS panels, breakpoints, publish status, and generated pages.
- Large GT Walsheim headings can be tight and poster-like; body copy should stay Inter and more controlled.
- Use gradients and chromatic highlights as showcase media or product atmosphere, not as generic background decoration.
- For template/marketplace pages, cards can host many visual styles, but Framer chrome remains dark and neutral.

## §6 Accessibility notes

- White text on `#090909` and black text on white pills clear AA.
- `#0099ff` on black clears link contrast; avoid using it for small text on mid-gray panels without checking.
- Muted `#666` is too dim for small body on black. Use `#999` or brighter for running secondary copy.
- Gradient cards need a dark overlay or high-contrast caption zone before placing small text over them.
