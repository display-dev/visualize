---
slug: ibm-style
name: IBM Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.ibm.com/us-en
  - https://www.ibm.com/consulting
  - https://www.ibm.com/products/watsonx-orchestrate
  - https://www.ibm.com/think
  - https://carbondesignsystem.com/
canonical-canvas: dark
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: high
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# IBM Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.ibm.com/us-en | Mixed Carbon shell | Current homepage leads with "AI agents for your business", watsonx Orchestrate, promotional watsonx discount messaging, analyst proof, data/watsonx cards, and Inside IBM editorial modules. |
| Consulting | https://www.ibm.com/consulting | Light/dark enterprise service surface | Consulting pages use Carbon structure, blue CTAs, structured service taxonomy, client outcomes, and restrained editorial imagery. |
| watsonx Orchestrate | https://www.ibm.com/products/watsonx-orchestrate | Product page | Product framing centers agentic AI, automation, enterprise work orchestration, integrations, demos, pricing/contact routes, and proof modules. |
| Think | https://www.ibm.com/think | Editorial / event / research surface | Think and event content use IBM Plex, larger editorial rhythm, Carbon cards, and dark or white bands depending on story. |
| Carbon Design System | https://carbondesignsystem.com/ | System reference | Carbon supplies the interaction model: square tiles, low-radius controls, gray scales, IBM Blue, structured spacing, and explicit component states. |

IBM is dual-canonical because first-party IBM uses both white/gray Carbon pages and true near-black Carbon dark sections. Do not synthesize a glossy dark SaaS skin. Dark IBM is Carbon gray-100/gray-90 with IBM Blue 50/60, not neon.

## §2 Palette

Values were verified from first-party IBM pages and Carbon-compatible tokens on 2026-05-28.

### Carbon neutral ladder

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Live: default IBM marketing and Carbon white theme canvas.
- `--foreground`: `oklch(0.2002 0 0)` (= `#161616`). Live: Carbon gray-100 primary text.
- `--brand-surface-1`: `oklch(0.9672 0 0)` (= `#f4f4f4`). Live: gray-10 section and tile background.
- `--brand-surface-2`: `oklch(0.9067 0 0)` (= `#e0e0e0`). Live: gray-20 border/fill.
- `--border`: `oklch(0.9067 0 0)` (= `#e0e0e0`). Live: Carbon divider and input border on light.
- `--brand-ink-muted`: `oklch(0.4386 0 0)` (= `#525252`). Live: secondary body copy.
- `--brand-ink-subtle`: `oklch(0.5000 0 0)`. Contrast-safe tertiary copy aligned to Carbon gray copy behavior.
- `--brand-inverse-canvas`: `oklch(0.2002 0 0)` (= `#161616`). Live: Carbon gray-100 dark canvas.
- `--brand-inverse-surface-1`: `oklch(0.2686 0 0)` (= `#262626`). Live: Carbon gray-90 dark tile surface.
- `--brand-inverse-ink`: `oklch(1 0 0)` (= `#ffffff`). Live: text on dark IBM surfaces.
- `--brand-inverse-ink-muted`: `oklch(0.8266 0 0)` (= `#c6c6c6`). Live: secondary text on dark.

### IBM blue and semantic accents

- `--primary`: `oklch(0.5565 0.2430 261.9529)` (= `#0f62fe`). Live: IBM Blue 60 primary action and link colour.
- `--brand-blue-60`: `oklch(0.4540 0.2210 262.6322)` (= `#0043ce`). Live: darker action/hover blue family.
- `--brand-blue-hover`: `oklch(0.5005 0.2355 262.2260)`. Live: hover blue behavior.
- `--brand-blue-on-dark`: `oklch(0.6500 0.2000 261.9529)`. Carbon dark interactive blue, equivalent to the Blue 50 direction used on g90/g100 themes.
- `--destructive`: `oklch(0.5692 0.2174 25.9290)` (= `#da1e28`). Live: Carbon danger/red.
- `--brand-semantic-success`: `oklch(0.6234 0.1661 148.0893)` (= `#24a148`). Live: Carbon green success.
- `--brand-semantic-warning`: `oklch(0.8321 0.1655 90.4402)` (= `#f1c21b`). Live: Carbon yellow warning.
- `--brand-semantic-info`: `oklch(0.5565 0.2430 261.9529)` (= `#0f62fe`). Live: IBM informational blue.

### Current extended IBM accents

- Magenta appears in current IBM pages as `#EE5396` and `#ff7eb6`.
- Purple appears as `#8A3FFC` and `#a56eff`.
- Cyan appears as `#1192E8`, `#08bdba`, and `#009d9a`.
- Light blue appears as `#4589FF` and `#78a9ff`.
- Red, green, and yellow stay in the Carbon semantic family.

Use these extended accents sparingly for product category, chart, AI/research, or event modules. IBM should still read as black, white, gray, and blue first.

### Drift vs `tokens.css`

- `tokens.css` already matches the live IBM/Carbon structure: light Carbon defaults, gray-100/gray-90 dark mode, IBM Plex Sans, square radii, and primary IBM Blue.
- No token cascade is required for this refresh. The previous DESIGN.md needed a live-content and component-vocabulary rewrite, not a palette rebuild.
- If preview templates later need full chart fidelity, add explicit magenta, purple, cyan, and light-blue aliases rather than replacing the core Carbon ladder.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | IBM Plex Sans | 300-400 | 56-76px | 1.05-1.17 | 0 |
| Heading | IBM Plex Sans | 300-500 | 36-60px | 1.12-1.25 | 0 |
| Title | IBM Plex Sans | 400-600 | 20-28px | 1.25-1.4 | 0 |
| Body | IBM Plex Sans | 400 | 16-18px | 1.5-1.65 | 0 |
| Caption | IBM Plex Sans | 400-500 | 12-14px | 1.35-1.5 | 0.01em |
| Mono | IBM Plex Mono or system mono | 400 | 12-15px | 1.45-1.65 | 0 |

IBM Plex should feel engineered and economical. Avoid decorative tracking, pillowy type, oversized SaaS numerals, and playful variable-weight gimmicks.

## §4 Component vocabulary

### carbon-global-header

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — global header
**Description:** Carbon global header with IBM logo, product taxonomy, consulting, support, search, account, and navigation drawer behavior.
**States:** default, search open, menu open, account open, mobile drawer.

### ai-agent-hero

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — AI agents for your business
**Description:** Homepage hero for enterprise AI agents and watsonx Orchestrate, using direct headline, supporting copy, primary blue CTA, and product imagery or structured dark/light bands.
**States:** default, media loaded, primary CTA hover, mobile stacked.

### watsonx-promotion-banner

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — watsonx discount banner
**Description:** Promotional strip for limited-time watsonx offers. Keep copy compact and clearly linked.
**States:** active, expired, dismissed, locale-specific.

### blue-primary-button

**Status:** current
**Live source:** `https://www.ibm.com/us-en` and Carbon
**Description:** IBM Blue rectangular CTA with square corners, white text, and clear hover/focus affordance.
**States:** default, hover, focus, disabled, loading.

### carbon-secondary-button

**Status:** current
**Live source:** Carbon Design System
**Description:** Secondary rectangular action, usually outlined or black/dark depending on canvas.
**States:** default, hover, focus, disabled, danger variant.

### feature-card-grid

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — homepage feature cards
**Description:** Dense grid of Carbon tiles for analyst reports, AI transformation, data products, and technical proof.
**States:** default, hover, image loaded, mixed card heights, mobile one-column.

### analyst-report-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — Gartner Magic Quadrant card
**Description:** Proof card for analyst leadership or market reports, with report title, short claim, and link.
**States:** default, featured, gated, external report.

### consulting-feature-card

**Status:** current
**Live source:** `https://www.ibm.com/consulting`
**Description:** Consulting card for transformation services, AI strategy, hybrid cloud, and business operations.
**States:** default, hover, service category, case-study linked.

### watsonx-product-card

**Status:** current
**Live source:** `https://www.ibm.com/products/watsonx-orchestrate`
**Description:** Product tile for watsonx capabilities such as Orchestrate, data, assistants, governance, and AI workflows.
**States:** default, trial/demo CTA, pricing CTA, integration visible.

### data-gate-product-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — IBM Data Gate for watsonx
**Description:** Product card for extracting insights from business data, using technical copy and blue link treatment.
**States:** default, learn-more, product-family badge.

### magic-quadrant-proof-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — container management proof
**Description:** Analyst proof tile for IBM as a Leader in Gartner Magic Quadrant for Container Management.
**States:** default, download report, footnote/legal copy.

### inside-ibm-news-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — Inside IBM
**Description:** Editorial card for IBM research, news, events, and product announcements.
**States:** default, article hover, event variant, research variant.

### think-event-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` and `https://www.ibm.com/think`
**Description:** Event card for Think 2026 with date, location, and save-the-date CTA.
**States:** save date, register, expired, location visible.

### techxchange-event-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — TechXchange 2026
**Description:** Training/community event card for hands-on technical expertise.
**States:** default, registration open, training track, sold out.

### granite-model-news-card

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — Granite 4.0
**Description:** Research/news card for Granite model releases and enterprise AI performance claims.
**States:** default, research link, model-family badge.

### carbon-tile

**Status:** current
**Live source:** Carbon Design System
**Description:** Square-edged content tile with clear hit target, dense copy, and optional icon/image.
**States:** default, clickable, selectable, disabled, skeleton.

### carbon-data-table

**Status:** current
**Live source:** Carbon Design System
**Description:** Enterprise data table with sortable headers, row selection, toolbar, pagination, and batch actions.
**States:** empty, loading, sorted, selected rows, batch action, error.

### carbon-tabs

**Status:** current
**Live source:** Carbon Design System
**Description:** Tab control for product sections, technical views, or resource groupings.
**States:** default, active, hover, disabled, overflow.

### carbon-accordion

**Status:** current
**Live source:** Carbon Design System
**Description:** Dense disclosure stack for FAQs, specs, feature explanations, and legal/support copy.
**States:** collapsed, expanded, multiple open, disabled.

### carbon-notification

**Status:** current
**Live source:** Carbon Design System
**Description:** Inline or toast notification for informational, success, warning, and error messages.
**States:** info, success, warning, error, dismissible, action link.

### carbon-text-input

**Status:** current
**Live source:** Carbon Design System
**Description:** Square text field with label, helper text, validation, and focus ring.
**States:** empty, filled, focus, invalid, disabled, skeleton.

### carbon-select

**Status:** current
**Live source:** Carbon Design System
**Description:** Select/dropdown control with label, helper copy, menu, and validation.
**States:** closed, open, selected, invalid, disabled.

### carbon-breadcrumb

**Status:** current
**Live source:** Carbon Design System and IBM product pages
**Description:** Hierarchical breadcrumb for deep product, support, and documentation surfaces.
**States:** default, truncated, current page, mobile overflow.

### carbon-side-nav

**Status:** current
**Live source:** Carbon Design System
**Description:** Side navigation for documentation, product areas, settings, or technical workflows.
**States:** expanded, collapsed, active item, nested group, mobile.

### carbon-code-snippet

**Status:** current
**Live source:** Carbon Design System
**Description:** Code block or inline snippet for CLI/API examples with copy affordance.
**States:** single-line, multi-line, copy success, copy error.

### resource-link-list

**Status:** current
**Live source:** `https://www.ibm.com/us-en` and `https://www.ibm.com/think`
**Description:** Structured link list for reports, articles, product documentation, and thought leadership.
**States:** default, category grouped, external link, visited.

### consulting-cta-band

**Status:** current
**Live source:** `https://www.ibm.com/consulting`
**Description:** Full-width enterprise CTA band for contacting IBM Consulting or exploring services.
**States:** light, dark, primary CTA, secondary CTA, image-supported.

### dark-carbon-panel

**Status:** current
**Live source:** IBM dark sections and Carbon dark themes
**Description:** Near-black panel using gray-100 canvas, gray-90 tile surfaces, white text, muted gray copy, and blue interactive accents.
**States:** default, card grid, form embedded, chart embedded.

### footer-mega-columns

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — footer
**Description:** Multi-column footer with product, consulting, support, community, privacy, legal, and locale controls.
**States:** desktop columns, mobile accordion, locale open.

### locale-selector

**Status:** current
**Live source:** `https://www.ibm.com/us-en` — footer / global controls
**Description:** Locale and country selector using Carbon menu patterns and compact enterprise copy.
**States:** closed, open, selected locale, search/filter.

## §5 Usage rules

- Start with a Carbon grid and square tiles. IBM surfaces should feel assembled from engineered blocks.
- Use IBM Blue for action, navigation emphasis, and informational hierarchy. Do not flood whole pages blue.
- Keep gray surfaces exact and restrained: white, gray-10, gray-20, gray-90, gray-100.
- Use dark panels only where they behave like Carbon dark themes, not as a generic dramatic landing-page treatment.
- Keep copy direct and product-specific: AI agents, watsonx, consulting, data, research, hybrid cloud, security, and events.
- Use icons functionally. Prefer Carbon/Lucide-like line icons over illustrative mascot or decorative shapes.
- Avoid rounded cards, soft pastel gradients, floating glass panels, and marketing confetti.

## §6 Preview guidance

- Light preview should emphasize white canvas, gray-10 section bands, black IBM Plex typography, blue CTAs, square tiles, and dense proof/resource cards.
- Dark preview should use `#161616`/gray-100 as canvas, gray-90 cards, white text, muted gray copy, and Blue 50/60 interactive accents.
- A correct IBM preview looks more like an enterprise product/consulting system than a startup homepage.
- Include at least one data/table/control component when the artifact is technical. Carbon without operational UI feels incomplete.
