---
slug: posthog-style
name: PostHog Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://posthog.com/
  - https://posthog.com/docs
  - https://posthog.com/pricing
canonical-canvas: light
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: medium
  density: high
  canonical_canvas: light
  best_for: |
    Use for information-dense artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# PostHog Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://posthog.com/ | Warm cream product suite | Live page foregrounds PostHog, surveys, data warehouse, CDP, experiments, feature flags, and product suite language. |
| Docs | https://posthog.com/docs | Developer documentation | Live docs foreground session replay, feature flags, experiments, surveys, SDKs, and implementation references. |
| Pricing | https://posthog.com/pricing | Usage pricing | Live pricing foregrounds Free, feature flags, session replay, experiments, surveys, and PostHog product modules. |

PostHog is a playful but serious developer-product system. It pairs dense product analytics surfaces with warm cream paper, olive ink, yellow-orange action, hand-drawn mascots, and direct copy. The UI should feel like a technical company that is comfortable being useful and weird, not a generic analytics vendor.

## §2 Palette

### Product Core

- `--background`: warm cream canvas.
- `--foreground`: olive-charcoal primary ink.
- `--card`: white card surface for charts, docs panels, pricing cards, and product modules.
- `--secondary` / `--muted`: darker cream for sidebars, filters, code wells, and secondary panels.
- `--primary`: yellow-orange CTA and highlighted product state.
- `--primary-foreground`: dark olive ink on yellow.
- `--border`: olive-tinted hairline.

### Product Accents

- `--brand-link-blue` and `--brand-link-teal`: links and product routes.
- `--brand-accent-red`, `--brand-accent-green`, `--brand-accent-purple` plus their soft variants: charts, product icons, status chips, and module accents.
- `--brand-surface-dark`: dark panel/footer/product app surface.
- `--brand-focus-ring`: accessible focus ring.

### Drift vs `tokens.css`

- The token package matches current PostHog: warm cream, IBM Plex Sans, olive ink, yellow-orange CTA, bordered cards, product accent palette, docs surfaces, and calibrated dark mode.
- Current source inventory should emphasize product analytics, session replay, feature flags, experiments, surveys, data warehouse, CDP, docs, SDK, pricing, Free, open-source, and product modules.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | IBM Plex Sans Variable | 700-800 | 32-44px | 1.2-1.45 | 0 |
| Heading | IBM Plex Sans Variable | 700-800 | 22-32px | 1.25-1.45 | 0 |
| Title | IBM Plex Sans Variable | 600-700 | 17-22px | 1.3-1.5 | 0 |
| Body | IBM Plex Sans Variable | 400 | 15-17px | 1.45-1.65 | 0 |
| Label | IBM Plex Sans Variable | 600-700 | 12-14px | 1.25-1.5 | 0 |
| Code | ui-monospace | 400 | 12-14px | 1.45-1.65 | 0 |

Use clear, slightly conversational headings. Dense product and docs content can be compact, but not cramped.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://posthog.com/`
**Description:** Header for Products, Docs, Pricing, Customers/Resources, GitHub/open-source routes, sign in, and yellow primary CTA.
**States:** desktop, mobile, product menu open, docs active, signed in.

### product-suite-hero

**Status:** current
**Live source:** `https://posthog.com/`
**Description:** Warm cream hero introducing the PostHog product suite with product modules, direct claim, mascot/illustration support, and primary CTA.
**States:** default, product module highlighted, CTA hover, reduced-motion.

### yellow-primary-button

**Status:** current
**Live source:** PostHog CTAs
**Description:** Yellow-orange action button with olive text for start, sign up, deploy, or contact actions.
**States:** default, hover, focus, loading, disabled.

### bordered-product-card

**Status:** current
**Live source:** Product module sections
**Description:** White card with olive border, compact title, module accent colour, short description, and route.
**States:** default, hover, selected, beta, enterprise.

### product-analytics-card

**Status:** current
**Live source:** Homepage/product inventory
**Description:** Module card for product analytics with events, funnels, trends, cohorts, and dashboards.
**States:** default, chart preview, selected, docs link.

### session-replay-card

**Status:** current
**Live source:** Homepage/docs/pricing inventory
**Description:** Module card for session replay with recording preview, user/session metadata, and replay CTA.
**States:** default, playing, paused, filtered, sampled.

### feature-flags-card

**Status:** current
**Live source:** Homepage/docs/pricing inventory
**Description:** Module card for flags with rollout percentage, targeting, environment, and status.
**States:** off, on, gradual rollout, archived, error.

### experiments-card

**Status:** current
**Live source:** Homepage/docs/pricing inventory
**Description:** Module card for experiments with hypothesis, variants, exposure, significance, and winner state.
**States:** draft, running, inconclusive, winner, stopped.

### surveys-card

**Status:** current
**Live source:** Homepage/docs/pricing inventory
**Description:** Module card for in-app/user surveys with question type, responses, audience, and status.
**States:** draft, live, paused, results, archived.

### data-warehouse-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Module card for data warehouse and SQL-style data access.
**States:** default, connected, syncing, query, error.

### cdp-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Module card for CDP/customer data pipelines, destinations, sources, and event forwarding.
**States:** source, destination, active, paused, failed.

### llm-analytics-card

**Status:** current
**Live source:** Current product-suite references where surfaced
**Description:** Module card for LLM/product AI analytics when present, with prompt traces, cost, latency, and quality metrics.
**States:** default, filtered, high cost, error.

### analytics-dashboard

**Status:** current
**Live source:** Product analytics conventions
**Description:** Dashboard with trend chart, insight cards, filters, date range, breakdowns, and saved views.
**States:** loading, filtered, empty, shared, error.

### funnel-chart

**Status:** current
**Live source:** Product analytics conventions
**Description:** Funnel visualization with step labels, conversion rates, drop-off, and segment comparison.
**States:** default, compared, filtered, no data.

### cohort-table

**Status:** current
**Live source:** Product analytics conventions
**Description:** Retention/cohort table with time buckets, percentage cells, and tooltip detail.
**States:** default, loading, highlighted row, exported.

### replay-timeline

**Status:** current
**Live source:** Session replay conventions
**Description:** Replay player timeline with events, console/network markers, rage clicks, and playback controls.
**States:** playing, paused, scrubbed, filtered, error.

### docs-shell

**Status:** current
**Live source:** `https://posthog.com/docs`
**Description:** Documentation layout with sidebar, article content, SDK examples, product guides, and next/previous links.
**States:** desktop, mobile, search open, active nav, version note.

### sdk-code-tabs

**Status:** current
**Live source:** Docs SDK references
**Description:** Code tabset for JavaScript, Python, Node, mobile, backend, or framework SDK examples.
**States:** default, language selected, copied, install step.

### pricing-product-row

**Status:** current
**Live source:** `https://posthog.com/pricing`
**Description:** Pricing row/card per product with free allowance, usage unit, included features, and expansion details.
**States:** collapsed, expanded, free tier, paid usage, enterprise.

### usage-estimator

**Status:** current
**Live source:** Pricing conventions
**Description:** Calculator/estimator for events, recordings, flags, surveys, warehouse usage, and projected cost.
**States:** default, edited, free, overage, enterprise.

### free-tier-badge

**Status:** current
**Live source:** Pricing page
**Description:** Badge for Free allowance, included usage, or startup-friendly entry point.
**States:** default, highlighted, exhausted, eligible.

### changelog-card

**Status:** current
**Live source:** Product/dev-tool conventions
**Description:** Card for release notes, product updates, migration notes, and feature launches.
**States:** default, breaking, new, fixed, beta.

### mascot-illustration-slot

**Status:** current
**Live source:** PostHog brand conventions
**Description:** Reserved slot for mascot/hand-drawn illustration that supports the content without replacing product UI.
**States:** default, small, sidebar, empty.

### open-source-repo-card

**Status:** current
**Live source:** Open-source/GitHub route conventions
**Description:** Card showing repository, license/community signal, docs route, and contribution link.
**States:** default, starred, loading stats, external.

### footer-product-columns

**Status:** current
**Live source:** PostHog footer conventions
**Description:** Footer columns for products, docs, resources, company, community, and legal routes on warm or dark canvas.
**States:** desktop, mobile accordion, dark, legal.

## §5 Composition Rules

1. Show product UI: charts, replays, flags, experiments, surveys, and pricing units should be concrete.
2. Use warm cream as the page floor and white cards for data-heavy content.
3. Keep yellow-orange as the primary action and highlight colour; do not make the whole page yellow.
4. Mascot/illustration moments should add personality around useful product surfaces.
5. Product modules need distinct accent colours, but dense text stays olive/charcoal.
6. Pricing needs transparent usage units and free allowance clarity.

## §6 Accessibility And States

- Yellow buttons require dark olive text and visible focus.
- Accent colours on cream can fail at small sizes; use them for icons/chips, not body copy.
- Charts need labels/tooltips, not colour-only interpretation.
- Docs code blocks require copy feedback and readable contrast in both themes.
- Pricing rows need clear free/paid/enterprise states.

## §7 Anti-Patterns

- Do not turn PostHog into a dark analytics dashboard by default.
- Do not use generic SaaS gradient hero sections.
- Do not replace product evidence with mascot-only illustration.
- Do not over-round cards; PostHog’s cards are friendly but still technical.
- Do not hide pricing mechanics behind vague plan cards.
