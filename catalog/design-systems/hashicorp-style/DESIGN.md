---
slug: hashicorp-style
name: HashiCorp Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://www.hashicorp.com/en
  - https://www.hashicorp.com/en/products
  - https://www.hashicorp.com/en/pricing
  - https://developer.hashicorp.com/
canonical-canvas: dark
selection:
  mood: [developer, technical]
  tone: [precise, pragmatic]
  formality: high
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a precise, pragmatic register with developer, technical visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# HashiCorp Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.hashicorp.com/en | Dark enterprise infrastructure | Current site presents HashiCorp as an IBM company, "Do cloud right", The Infrastructure Cloud, HCP, ILM/SLM, product families, integrations, certifications, resources, and enterprise CTAs. |
| Product navigation | https://www.hashicorp.com/en | Dark mega-menu with lifecycle grouping | Products are grouped into Infrastructure Lifecycle Management and Security Lifecycle Management, with Terraform, Packer, Waypoint, Nomad, Vault, Boundary, Vault Radar, and Consul. |
| Developer docs | https://developer.hashicorp.com/ | Developer documentation shell | Docs/tutorials/certifications/integrations sit in a separate developer surface and should be denser and more task-oriented than marketing. |
| Pricing | https://www.hashicorp.com/en/pricing | Enterprise commerce / plan discovery | Pricing is framed around cloud products and contact/get-started paths rather than consumer-style cards. |

HashiCorp is dark-canonical. The brand system is not a single-colour SaaS skin: it is an enterprise infrastructure shell with product-family accents and dense taxonomy.

## §2 Palette

Values come from existing HashiCorp tokens and current first-party page structure verified on 2026-05-27.

### Core dark shell

- `--background`: `oklch(0 0 0)` (= `#000000`). Live: canonical dark page floor.
- `--foreground`: `oklch(1 0 0)` (= `#ffffff`). Live: primary text on dark.
- `--brand-surface-1`: `oklch(0.2086 0.0128 264.2461)`. Live: dark blue/charcoal card surface.
- `--brand-surface-2`: `oklch(0.2556 0.0162 264.2320)`. Live: raised dark card.
- `--brand-surface-3`: `oklch(0.3612 0.0140 274.5258)`. Live: strong divider/input border.
- `--border`: `oklch(0.3612 0.0140 274.5258)`. Live: charcoal/blue-gray hairline.
- `--brand-hairline-soft`: `oklch(0.2772 0.0154 269.1227)`. Live: subtle card separators.
- `--brand-ink-muted`: `oklch(0.7752 0.0109 261.7847)`. Live: muted copy on dark.
- `--brand-ink-subtle`: `oklch(0.6500 0.0198 267.6317)`. Live: tertiary copy lifted for contrast.

### Product identity accents

- `--accent`: `oklch(0.6395 0.1954 256.5730)`. Live: HCP / generic blue accent.
- `--brand-product-terraform`: `oklch(0.5107 0.1841 301.6497)`. Terraform purple.
- `--brand-product-terraform-bright`: `oklch(0.6800 0.2400 302)`. Bright Terraform eyebrow/accent adjusted for dark contrast.
- `--brand-product-vault`: `oklch(0.8718 0.1713 90.9099)`. Vault yellow / warning security identity.
- `--brand-product-consul`: `oklch(0.5977 0.2219 29.4651)`. Consul red/pink.
- `--brand-product-waypoint`: `oklch(0.7512 0.1255 198.1010)`. Waypoint cyan.
- `--brand-product-vagrant`: `oklch(0.5589 0.2204 260.9937)`. Vagrant blue.
- `--brand-product-nomad`: `oklch(0.7422 0.1602 163.0915)`. Nomad green.
- `--brand-product-boundary`: `oklch(0.6518 0.2020 22.5152)`. Boundary orange/red.

### Drift vs `tokens.css`

- `tokens.css` is structurally correct: dark-canonical, mirrored dark mode, lifted subtle ink, and contrast-safe Terraform bright.
- The live site messaging now centers The Infrastructure Cloud, ILM/SLM, HCP, Infragraph, AI-agent security, partners/integrations, product certifications, and IBM-era enterprise routes. The DESIGN.md component vocabulary needed a product/content refresh, not a token cascade.
- If future previews need IBM-era content fidelity, add components for HCP/Infragraph/ILM/SLM rather than changing the colour model.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | hashicorpSans | 700 | 56-80px | 1.12-1.2 | -0.03em |
| Heading | hashicorpSans | 600-700 | 36-56px | 1.15-1.25 | -0.02em |
| Title | hashicorpSans | 600 | 18-24px | 1.25-1.4 | -0.01em |
| Body | hashicorpSans | 500 | 15-17px | 1.5-1.7 | 0 |
| Caption | hashicorpSans | 500 | 12-14px | 1.35-1.5 | 0.01em |
| Mono | ui-monospace fallback | 400-500 | 12-14px | 1.45-1.65 | 0 |

HashiCorp is a product-taxonomy brand. Type can be dense, but hierarchy must stay extremely explicit: product family, product name, outcome, proof, CTA.

## §4 Component vocabulary

### ibm-company-header

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — global header
**Description:** Header showing HashiCorp identity, IBM-company context, Solutions, Products, Pricing, Developers, Resources, Company, login, contact, and get-started actions.
**States:** default, product menu open, solution menu open, mobile drawer, logged-out.

### infrastructure-cloud-hero

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Do cloud right
**Description:** Enterprise hero for The Infrastructure Cloud with short value proposition and dark product/diagram imagery.
**States:** default, image loaded, CTA hover, mobile.

### agentic-security-banner

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Agentic runtime security
**Description:** Top content/announcement band for AI-agent or runtime-security thought leadership.
**States:** default, linked learn-more, dismissed/expired.

### solutions-mega-menu

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Solutions nav
**Description:** Menu for The Infrastructure Cloud, accelerate delivery, optimize cloud operations/ROI, and strengthen security/governance.
**States:** open, hover solution, selected, mobile accordion.

### product-lifecycle-menu

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Products nav
**Description:** Product menu grouped by Infrastructure Lifecycle Management and Security Lifecycle Management.
**States:** open, lifecycle group active, product hover, HCP link.

### product-identity-card

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — product groups
**Description:** Card for Terraform, Packer, Waypoint, Nomad, Vault, Boundary, Vault Radar, or Consul with product colour and concise job.
**States:** default, hover, active product, deprecated/external.

### hcp-platform-section

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — HashiCorp Cloud Platform
**Description:** Section explaining HCP as SaaS product suite and unified operating model.
**States:** default, try-now CTA, learn-more link, product image loaded.

### infragraph-callout

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — HCP Terraform powered by Infragraph
**Description:** Feature callout for Public Preview, knowledge graph, hybrid estate visibility, and infrastructure insights.
**States:** preview, learn-more, eligible-customer note.

### lifecycle-tab-panel

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Accelerate / Optimize / Strengthen
**Description:** Tabbed solution panel explaining business outcomes with product-backed workflow copy.
**States:** accelerate, optimize, strengthen, active tab, mobile stacked.

### ilm-slm-split

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Integrated lifecycle management
**Description:** Two-part explanation of Infrastructure Lifecycle Management and Security Lifecycle Management.
**States:** ILM active, SLM active, product list visible.

### customer-logo-marquee

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Trusted by leading organizations
**Description:** Enterprise logo strip for Walgreens, SeatGeek, Lufthansa, Indeed, GSK, Deutsche Bank, Airbnb, ADT, Wayfair, Samsung, Autodesk, BNP Paribas, AstraZeneca.
**States:** static, scrolling, wrapped.

### ecosystem-stat-block

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — partners and integrations
**Description:** Stat block for partners, integrations, and systems integrators.
**States:** default, linked ecosystem, animated count.

### integration-logo-cloud

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — ecosystem section
**Description:** Integration partner grid/cloud. Keep it structured and enterprise-grade.
**States:** default, hover integration, filtered.

### certification-card

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Product certifications
**Description:** Certification CTA for engineers, architects, and operators to validate product knowledge.
**States:** get-certified, view-docs, product selected.

### resource-tabs

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Resources & Events
**Description:** Tabs for What's new, Webinars & events, and other resource/event groupings.
**States:** active tab, resource hover, card grid.

### report-resource-card

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — reports / white papers
**Description:** Resource card for KuppingerCole, Cloud Complexity Report, cloud ROI white paper, and identity fabric content.
**States:** default, featured, gated asset, external.

### cta-dark-band

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — Accelerate speed, reduce risk, maximize ROI
**Description:** High-contrast CTA band with report/download and contact actions.
**States:** default, primary/secondary CTA, mobile.

### newsletter-signup

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — sign up for news
**Description:** Footer/news signup form with dark enterprise styling.
**States:** empty, valid, invalid, submitted.

### developer-docs-link

**Status:** current
**Live source:** `https://www.hashicorp.com/en` and `https://developer.hashicorp.com/`
**Description:** Link/control routing to docs, tutorials, integrations, and developer resources.
**States:** default, external developer domain, active.

### docs-sidebar-tree

**Status:** current
**Live source:** `https://developer.hashicorp.com/`
**Description:** Dense developer documentation navigation with product families, tutorials, and reference routes.
**States:** active page, expanded group, search, mobile drawer.

### code-command-block

**Status:** current
**Live source:** `https://developer.hashicorp.com/`
**Description:** Developer code/CLI block for Terraform, Vault, Consul, Nomad, and other product workflows.
**States:** default, copied, selected language, terminal output.

### pricing-product-table

**Status:** current
**Live source:** `https://www.hashicorp.com/en/pricing`
**Description:** Enterprise pricing/product comparison table for HCP and product-level offerings.
**States:** product selected, cloud/self-managed, contact-sales, get-started.

### status-link

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — footer system status
**Description:** Operational status link into `status.hashicorp.com`.
**States:** operational, degraded, incident.

### locale-selector

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — footer language list
**Description:** Footer locale selector for English, French, German, Japanese, Korean, Portuguese, Spanish, and Indonesian.
**States:** selected, open, translated route.

### partner-portal-link

**Status:** current
**Live source:** `https://www.hashicorp.com/en` — IBM partner portal login
**Description:** Enterprise partner login route now points through IBM surfaces.
**States:** default, external, authenticated.

### product-badge

**Status:** current
**Live source:** HashiCorp product sections
**Description:** Small badge or eyebrow that uses exact product accent colour for Terraform/Vault/Consul/Nomad/Boundary/etc.
**States:** product default, active, hover, disabled.

### lifecycle-diagram

**Status:** current
**Live source:** HashiCorp product/platform sections
**Description:** Architecture-style diagram for lifecycle workflows, infrastructure graph, security model, or hybrid estate.
**States:** default, highlighted node, step active, mobile simplified.

## §5 Composition rules

- Lead with product/system taxonomy: Infrastructure Cloud, ILM, SLM, HCP, product family, outcome.
- Use product colours as identity markers, not decorative gradients.
- Dense content is expected; use cards, tabs, tables, and diagrams to keep it navigable.
- Keep enterprise credibility: dark shell, high contrast, explicit CTAs, no playful illustration.
- Developer surfaces can be denser and more utilitarian than marketing surfaces.
- IBM-era partner/support routes should be treated as enterprise external paths, not consumer links.

## §6 Accessibility notes

- White text on black clears AA; tertiary grays must be lifted for body text.
- Product colours on black should be used for badges/icons/eyebrows or larger text; body copy should remain white or lifted gray.
- Yellow Vault accents need black text when used as filled badges.
- Dense tables and docs navigation need strong focus states and keyboard-visible active rows.
