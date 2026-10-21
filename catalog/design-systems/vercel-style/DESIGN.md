---
slug: vercel-style
name: Vercel Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://vercel.com/
  - https://vercel.com/frameworks/nextjs
  - https://vercel.com/ai/
  - https://vercel.com/pricing
canonical-canvas: light
selection:
  mood: [minimal, productivity]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with minimal, productivity visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Vercel Style

_Independent reference inspired by Vercel's public product and platform surfaces. Not affiliated with or endorsed by Vercel._

## §1 Canonical Canvas

Vercel style is a precise frontend cloud: build, preview, deploy, observe, and scale web and AI applications. Current product surfaces span Next.js, v0, AI SDK, Fluid Compute, Functions, Edge, CDN, Observability, Speed Insights, Analytics, Preview Deployments, Rollbacks, Security, and usage-based pricing. The design is stark and minimal because the proof is code, previews, metrics, and deploy state.

Use black and white as the base, Geist type, thin borders, mono captions, deployment cards, CLI snippets, preview frames, and sparse colored states. Multi-color mesh is allowed as a hero/platform gesture, but never as gradient text or generic AI wallpaper.

### global-header

Use a compact developer nav: Products, Solutions, Resources, Enterprise, Docs, Pricing, Contact, Dashboard, Start Deploying. Product menus group Frontend Cloud, AI, v0, Next.js, Observability, Security, and Platform.

### frontend-cloud-hero

The hero should say what is being shipped: frontend cloud, AI apps, Next.js at scale, or secure deployments. Pair copy with a deployment graph, preview URL, code pane, and usage metrics. One primary CTA.

### triangle-mark

The triangle mark is the sharp brand signature. Use it sparingly as a logo or small state, not as repeated decoration.

### deploy-card

Deployment cards show commit, branch, environment, status, URL, region, build duration, framework, and who triggered it. This is a core component.

### preview-deployment-card

Preview cards show branch URL, screenshot, comments, checks, linked PR, and share action. Collaboration happens around the preview.

### rollback-card

Rollback cards show current production, previous deployment, diff, operator, and confirmation state. Keep the action clear and high-trust.

### nextjs-panel

Next.js panels show app router, ISR, server components, image optimization, middleware, route handlers, and examples. Vercel's framework story needs concrete framework capabilities.

### v0-workflow-card

v0 cards show prompt, generated UI, live preview, React code, design edits, and deploy action. It should feel like productized frontend generation, not a generic chatbot.

### ai-sdk-card

AI SDK cards show streaming UI, model provider, tool call, server action, and TypeScript snippet. The component should tie AI to frontend code.

### fluid-compute-card

Fluid Compute cards show function instance, concurrent requests, GB-hours, cold start avoidance, duration, region, and cost. This is infrastructure, so include units.

### functions-log-card

Function log cards show request id, route, runtime, status, duration, memory, region, and error trace. Use dark code/log panels when density rises.

### edge-network-card

Network cards show CDN edge, routing, cache hit, region, latency, and request path. Keep the map abstract and useful, not decorative.

### observability-dashboard

Observability dashboards show errors, traces, logs, invocations, latency, Web Vitals, and deployment correlation. Metrics must connect to releases.

### speed-insights-card

Speed Insights cards show Core Web Vitals, route, device, geography, and trend. Use clear thresholds and small charts.

### analytics-card

Analytics cards show visitors, routes, referrers, devices, conversions, and Web Analytics. Keep them quieter than production reliability metrics.

### security-gate-card

Security cards show firewall, bot protection, deployment protection, environment variables, secrets, SSO, audit logs, and team access.

### domains-dns-card

Domains cards show domain, DNS status, SSL, redirect, custom environment, and verification. Use exact states.

### storage-integration-card

Storage and database integrations show Postgres, KV, Blob, Edge Config, Neon, Supabase, AWS, and marketplace connections. Make ownership and region clear.

### cli-command-card

CLI cards show `vercel deploy`, `vercel env pull`, `vercel rollback`, and framework commands with output. Mono copy and copy buttons are expected.

### dashboard-sidebar

Dashboard sidebars list projects, deployments, analytics, observability, storage, domains, settings, team, and usage. Keep navigation compact.

### project-grid

Project grids show project name, framework, repo, last deployment, production URL, team, and status. Use plain cards with thin borders.

### usage-meter-card

Usage cards show bandwidth, function duration, edge requests, image optimization, ISR, build minutes, web analytics, and spend limits. Include units and thresholds.

### pricing-plan-card

Pricing cards compare Hobby, Pro, and Enterprise. Show included usage, seats, security, support, observability, network, and overage units.

### billing-detail-table

Billing tables show GB-hours, GB transferred, requests, image transformations, seats, and add-ons. Keep them readable; pricing is a technical interface.

### enterprise-governance-card

Enterprise cards show SAML/SCIM, RBAC, audit logs, deployment approvals, security controls, support, and compliance. Minimal does not mean vague.

#### incident-status-card

Status cards show affected product, region, severity, start time, update, and resolution. Reliability states need exact labels.

#### changelog-card

Changelog cards show feature, date, category, docs link, and code example when useful. Keep them tiny and frequent.

### docs-layout

Docs pages use left nav, article body, code blocks, right TOC, framework switches, and version states. The docs layout is dense but calm.

### customer-proof-card

Customer proof should connect brand names to performance, frontend velocity, AI app launch, global traffic, or reliability. Avoid empty logo walls.

#### footer-directory

Footer groups Products, Resources, Frameworks, Company, Compare, Legal, and social links. Keep it spare and table-like.

## §2 Palette

Vercel is black, white, neutral gray, state colors, and selective platform gradients. The UI should not look like a rainbow AI template.

#### black-white-core

Use black for primary action and dark mode; white for default canvas and cards. The duet is the brand.

#### neutral-grid

Use neutral grays for borders, table headers, skeletons, muted text, and background bands.

#### state-colors

Use blue, green, amber, red, and violet for links, success, warning, error, and product states. Keep them functional.

#### platform-gradient

Use mesh gradients for major platform/AI hero gestures only. Never apply gradient fill to headings or metrics.

## §3 Typography

Use Geist for product clarity and Geist Mono for technical labels.

#### geist-display

Headlines are compact, sharp, and sentence case. Use tight line-height but avoid excessive negative tracking.

#### geist-body

Body copy is clear and developer-native. Prefer exact product names over broad claims.

#### geist-mono

Use mono for deployment ids, CLI, code, logs, request ids, metric units, and table labels.

## §4 Composition Rules

Vercel compositions move from code to preview to production telemetry.

### deploy-pipeline

Show commit, build, preview, production, observe, and rollback as connected states.

### code-and-preview

Pair code snippets with visual preview or deployed URL. Code alone is too abstract.

### metrics-tied-to-release

Metrics should name route, deployment, region, or commit. Detached charts are weak.

### sparse-chrome

Use thin borders, modest radius, and whitespace. Avoid decorative cards inside cards.

### one-primary-action

Each section has one dominant action: Start Deploying, Try v0, View Docs, Contact Sales, or Open Dashboard.

## §5 Accessibility And States

Developer tooling must make status, errors, and cost states unambiguous.

### focus-state

Use visible black/white focus rings with offset. On dark canvas use white ring; on light use black.

### deploy-state

Deployment states need labels: building, ready, error, canceled, queued, promoted, rolled back.

### usage-state

Usage states need exact thresholds, spend limits, and warning labels before overages.

### security-state

Security states need explicit pass/fail labels, not only green or red dots.

## §6 Anti-Patterns

Vercel style fails when minimalism hides the platform details.

### avoid-gradient-text

Do not use gradients on headings or metrics. Use solid type and a separate hero gradient gesture.

### avoid-empty-minimalism

White space without code, preview, status, or metrics feels generic.

### avoid-generic-ai

AI surfaces must show v0, AI SDK, streaming UI, model provider, tool call, or deploy path.

### avoid-soft-saas-cards

Do not use pastel feature-card grids. Use platform cards, logs, previews, and tables.
