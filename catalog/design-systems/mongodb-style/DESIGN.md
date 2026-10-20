---
slug: mongodb-style
name: MongoDB Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.mongodb.com/
  - https://www.mongodb.com/products/platform/atlas-database
  - https://www.mongodb.com/pricing
canonical-canvas: light
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: high
  density: high
  canonical_canvas: light
  best_for: |
    Use for information-dense artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# MongoDB Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.mongodb.com/ | Dark-teal + white product marketing | Current title: "MongoDB: The World's Leading Modern Data Platform"; description frames getting ideas to market faster with a flexible, AI-ready database. |
| Atlas Database | https://www.mongodb.com/products/platform/atlas-database | Atlas product page | Current description centers the document model, operational simplicity, resilience, scalability, and enterprise-grade security through Atlas cloud database. |
| Pricing | https://www.mongodb.com/pricing | Product pricing / comparison | Current description: "MongoDB Product Pricing"; page includes Free, Flex, Dedicated, Enterprise Advanced, Community, Serverless references, and product pricing routes. |

MongoDB is explicitly two-polarity: deep teal hero/product bands plus white documentation, pricing, and comparison surfaces. Do not force a synthetic monochrome dark theme. The identity lives in the dark teal canvas, bright green CTA, and crisp white product/content surfaces.

## §2 Palette

Values were sampled from current MongoDB pages on 2026-05-28 and aligned to existing tokens.

### Core MongoDB polarity

- `--brand-canvas-dark`: `oklch(0.2201 0.0440 230.1730)` (= live `#001E2B`). Deep teal hero and product canvas.
- `--background`: `oklch(1 0 0)` (= `#ffffff`). White docs/pricing/product canvas.
- `--foreground`: `oklch(0.2201 0.0440 230.1730)`. Deep teal primary text.
- `--card`: `oklch(1 0 0)`. White card surface on dark or light sections.
- `--secondary`: `oklch(0.9736 0.0034 174.4843)` with live `#F5F7FA` and `#fafbfc`. Pale product/pricing sections.
- `--border`: `oklch(0.9197 0.0059 239.8252)` and live `#e7eeec`. Quiet linework.
- `--brand-charcoal`: `oklch(0.2874 0.0303 237.6029)`, live `#21313c`. Strong body/card text.
- `--brand-slate`: live `#3d4f58`; `--brand-steel`: live `#5d6c74`; `--brand-stone`: muted copy.

### MongoDB green and action colours

- `--primary`: `oklch(0.8254 0.2367 148.3680)` (= live `#00ED64`). Bright MongoDB green CTA.
- `--brand-brand-green-dark`: `oklch(0.4584 0.0963 165.0871)` (= live `#00684A`). Link/pressed/strong green.
- Live green `#00AA57`: `oklch(0.6464 0.1696 152.1362)`.
- Live deep green `#014E3D`: `oklch(0.3778 0.0730 171.6818)`.
- `--brand-brand-teal-deep`: same family as deep teal hero canvas.
- `--brand-accent-blue`: live `#006CFA` / `#0066FF` for selected product links and UI accents.
- Live pale accents include `#E9FF99`, `#FFEC9E`, `#A6FFEC`, `#FFA1A1`, and `#F2C5EE`; use as small product/category chips, not core chrome.

### Drift vs `tokens.css`

- `tokens.css` is already intentional: both modes mirror the canvas-explicit two-polarity system. It should not be converted into a conventional dark-mode inversion.
- Live content now emphasizes modern data platform, AI-ready database, Atlas Database, document model, search/vector, Stream Processing, resilience, scalability, security, and pricing options.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Euclid Circular A | 500-600 | 56-76px | 1.05-1.14 | 0 |
| Heading | Euclid Circular A | 500-600 | 36-56px | 1.12-1.25 | 0 |
| Title | Euclid Circular A | 500-600 | 22-36px | 1.25-1.4 | 0 |
| Body | Euclid Circular A | 400-500 | 16-18px | 1.5-1.65 | 0 |
| Caption | Euclid Circular A | 500-600 | 12-14px | 1.35-1.5 | 0.02em |
| Mono | system mono | 400-500 | 12-14px | 1.45-1.65 | 0 |

MongoDB typography should be product-platform direct: rounded enough to be approachable, but dense and technical enough for enterprise data work.

## §4 Component vocabulary

### global-product-header

**Status:** current
**Live source:** `https://www.mongodb.com/`
**Description:** Header for products, solutions, resources, pricing, docs, login, and get-started/contact actions.
**States:** default, product menu open, search open, logged in, mobile drawer.

### modern-data-platform-hero

**Status:** current
**Live source:** `https://www.mongodb.com/`
**Description:** Homepage hero for MongoDB as the world's leading modern data platform and AI-ready database.
**States:** default, dark teal, white card inset, CTA hover, mobile.

### atlas-database-hero

**Status:** current
**Live source:** `https://www.mongodb.com/products/platform/atlas-database`
**Description:** Product hero for Atlas Database with document model, resilience, scalability, and enterprise security claims.
**States:** default, architecture visual, CTA hover, mobile.

### green-primary-button

**Status:** current
**Live source:** MongoDB CTAs
**Description:** Bright green filled CTA with deep teal text, used for start/build/signup actions.
**States:** default, hover, focus, disabled, loading.

### dark-secondary-button

**Status:** current
**Live source:** MongoDB CTA pairs
**Description:** Deep teal or outlined secondary action for learn-more, docs, or contact routes.
**States:** default, hover, focus, disabled.

### atlas-product-card

**Status:** current
**Live source:** Atlas product pages
**Description:** Product card for Atlas Database capabilities and related Atlas services.
**States:** default, hover, linked, featured.

### document-model-card

**Status:** current
**Live source:** Atlas Database page
**Description:** Card explaining document model flexibility and operational simplicity.
**States:** default, diagram visible, learn-more.

### resilience-proof-card

**Status:** current
**Live source:** Atlas Database page
**Description:** Proof card for resilience, availability, backups, and operational reliability.
**States:** default, metric, enterprise proof, expanded.

### scalability-card

**Status:** current
**Live source:** Atlas Database page
**Description:** Card for scaling applications and databases across workloads or regions.
**States:** default, region selected, cluster scale, metric.

### enterprise-security-card

**Status:** current
**Live source:** Atlas Database page
**Description:** Security/governance card for enterprise-grade security, privacy, compliance, and controls.
**States:** default, compliance expanded, contact CTA.

### vector-search-card

**Status:** current
**Live source:** Homepage/product references to vector and search
**Description:** Product card for vector search and AI retrieval features.
**States:** default, query visible, results, docs link.

### atlas-search-card

**Status:** current
**Live source:** Homepage/product references to search
**Description:** Search card for relevance, indexing, full-text search, and app search features.
**States:** default, indexed, query running, results.

### stream-processing-card

**Status:** current
**Live source:** Homepage references to Stream Processing
**Description:** Card for real-time data streams and event processing.
**States:** default, streaming, alert, lag.

### app-services-card

**Status:** current
**Live source:** MongoDB platform/product family
**Description:** Product card for app services, APIs, triggers, and backend integrations.
**States:** default, configured, deployed, error.

### charts-card

**Status:** current
**Live source:** MongoDB product family
**Description:** Visualization/analytics card for Charts and data insights.
**States:** default, chart loaded, filtered, exported.

### pricing-plan-card

**Status:** current
**Live source:** `https://www.mongodb.com/pricing`
**Description:** Pricing card for Free, Flex, Dedicated, or enterprise product pricing.
**States:** free, flex, dedicated, enterprise, selected.

### pricing-comparison-table

**Status:** current
**Live source:** `https://www.mongodb.com/pricing`
**Description:** Dense feature/pricing comparison for compute, storage, support, backups, security, and deployment options.
**States:** expanded group, sticky header, filtered, mobile.

### community-edition-card

**Status:** current
**Live source:** Homepage/pricing references to Community
**Description:** Card for Community Edition and self-managed/community options.
**States:** default, download, docs, version.

### enterprise-advanced-card

**Status:** current
**Live source:** Homepage/pricing references to Enterprise Advanced
**Description:** Enterprise Advanced card for self-managed enterprise database deployments.
**States:** default, contact sales, security proof, download.

### serverless-card

**Status:** current
**Live source:** Homepage/pricing references to Serverless
**Description:** Product/pricing card for serverless database usage.
**States:** default, usage estimate, inactive, deprecated/changed.

### cluster-status-panel

**Status:** current
**Live source:** Atlas app/database product conventions
**Description:** Panel for cluster health, region, nodes, backup, usage, and operations state.
**States:** healthy, scaling, warning, degraded, loading.

### query-code-block

**Status:** current
**Live source:** MongoDB docs/product examples
**Description:** Code block for MongoDB query, aggregation, or driver examples.
**States:** javascript, python, shell, copied, error.

### data-model-diagram

**Status:** current
**Live source:** Atlas/document model pages
**Description:** Diagram showing document collections, relationships, app services, and search/vector paths.
**States:** default, highlighted path, expanded.

### ai-ready-app-card

**Status:** current
**Live source:** Homepage AI-ready database language
**Description:** Card for AI application development on MongoDB data.
**States:** default, retrieval path, vector enabled, app deployed.

### university-course-card

**Status:** current
**Live source:** Homepage references to MongoDB University
**Description:** Course card for learning paths, certification, training, and developer education.
**States:** default, enrolled, completed, recommended.

### developer-resource-card

**Status:** current
**Live source:** MongoDB resource/docs routes
**Description:** Card for docs, tutorials, blog, examples, webinars, and product guides.
**States:** default, featured, external, saved.

### customer-proof-card

**Status:** current
**Live source:** MongoDB marketing proof surfaces
**Description:** Proof card for customer story, workload outcome, or enterprise adoption.
**States:** default, featured, case study linked.

### footer-mega-columns

**Status:** current
**Live source:** MongoDB footer
**Description:** Footer with product, resources, docs, solutions, company, legal, and social links.
**States:** desktop columns, mobile accordion, locale.

### dark-teal-panel

**Status:** current
**Live source:** MongoDB hero/footer dark canvas
**Description:** Deep teal panel with white/green content, cards, and product diagrams.
**States:** default, card inset, code inset, CTA.

## §5 Usage rules

- Treat MongoDB as a data platform, not just a database logo. Include Atlas, search/vector, streaming, pricing, security, or developer education where relevant.
- Use deep teal and white as explicit canvases. Do not invert everything automatically.
- Use bright MongoDB green for the primary action and selected accent. Keep it scarce enough to remain meaningful.
- Use blue for product links or secondary technical accents only.
- Keep product cards information-rich and enterprise-readable.
- Use code/query examples and cluster/data diagrams when the artifact is technical.

## §6 Preview guidance

- Light preview should show white pricing/docs surfaces plus a dark-teal hero or product band.
- Dark preview should preserve the canvas-explicit MongoDB system; it should not become a generic dark theme.
- Include at least one Atlas/database component and one pricing/search/vector/platform component in substantial artifacts.
- A correct MongoDB preview feels like an enterprise data platform for AI-ready applications.
