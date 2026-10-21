---
slug: supabase-style
name: Supabase Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://supabase.com/
  - https://supabase.com/database
  - https://supabase.com/auth
  - https://supabase.com/docs
  - https://supabase.com/pricing
canonical-canvas: dark
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Supabase Style

_Independent reference inspired by Supabase's public product and marketing surfaces. Not affiliated with or endorsed by Supabase._

## §1 Canonical Canvas

Supabase style is a developer platform around Postgres. The current public story is direct: build in a weekend, scale to millions; start with a Postgres database and add Auth, instant APIs, Edge Functions, Realtime, Storage, Vector, cron, queues, branching, logs, and observability. The visual system is quiet because the product details need to be legible.

Use white and near-black canvases, thin neutral borders, product screenshots, code snippets, SQL tables, terminal-like blocks, and one emerald primary. The brand should feel open source, precise, and useful. Do not make green the whole page. Green is a signal: create, connected, active, deployed, healthy.

### global-header

Use a clear developer nav: Product, Developers, Enterprise, Pricing, Docs, Blog, Support, Start your project, Sign in. Menus expose Database, Auth, Storage, Edge Functions, Realtime, Vector, Cron, Queues, Branching, Logs, and AI/MCP integrations.

### postgres-platform-hero

Hero copy should foreground Postgres and speed: build, ship, scale. Pair the headline with a dashboard or SQL editor composition, not photography. Primary action is Start your project; secondary is Request a demo or View docs.

### dashboard-shell

The product shell shows project selector, database objects, table editor, SQL editor, auth, storage, edge functions, logs, and settings. It should look like an actual dev dashboard with dark side nav and crisp panels.

### table-editor-card

Table editor cards show schema, rows, columns, types, filters, and row actions. Use dense grids, subtle row hover, and exact database labels.

### sql-editor-card

SQL cards use monospaced code, line numbers, tabs, run action, result table, and execution time. Green should mark success or run state; errors use red with precise messages.

### database-branching-card

Branching cards show main branch, preview branch, migration, diff, restore, and merge state. The card should feel like Git for Postgres.

### auth-user-card

Auth cards show providers, users, sessions, policies, MFA, magic links, and JWT claims. Keep the interface practical and security-aware.

### storage-bucket-card

Storage cards show buckets, files, access policies, transformations, CDN, and object metadata. Use file-table density rather than gallery decoration.

### realtime-channel-card

Realtime cards show subscriptions, channels, presence, broadcasts, and live row changes. Use streaming event rows and connection status.

### edge-function-card

Edge Function cards show function name, region, request count, latency, logs, deploy status, and a TypeScript snippet. This is code infrastructure, not generic serverless art.

### vector-search-card

Vector cards show embeddings table, similarity query, model source, index, and returned rows. Pair AI features with database evidence.

### cron-queue-card

Cron and Queues cards show scheduled jobs, retries, dead letters, run history, and worker state. Use operational labels and timestamps.

### instant-api-card

Instant API cards show generated REST, GraphQL, TypeScript client, policies, and API keys. The message is that Postgres schema becomes usable APIs.

### row-level-security-card

RLS cards show policy name, table, role, expression, and test result. Make security explicit and readable.

### logs-observability-card

Logs and observability cards show API requests, Postgres logs, edge logs, auth events, and slow queries. Rows need timestamps, status, route, source, and trace detail.

### local-dev-card

Local development cards show CLI commands, migrations, seed, functions serve, and local Postgres status. Use terminal UI and copy buttons.

### sdk-tabs

SDK tabs include JavaScript, Flutter, Python, Swift, Kotlin, and REST. Code snippets should be real and minimal.

### mcp-agent-card

MCP and agent cards show an AI agent inspecting schema, running safe queries, or creating a migration with approval. Keep permissions and project context visible.

### examples-gallery

Examples are practical starter templates: auth, AI chat, vector search, realtime multiplayer, file upload, SaaS starter, and analytics. Use repo links, deploy buttons, and stack tags.

### launch-week-card

Launch Week cards use crisp announcement tiles with date, product name, changelog excerpt, and docs link. Keep celebration restrained.

### community-proof-strip

Community proof uses GitHub stars, Discord, X, contributors, launches, and customer logos. The open-source signal is part of the brand.

### enterprise-card

Enterprise cards show compliance, access controls, dedicated support, SOC2, HIPAA eligibility, SSO, audit logs, and production scaling. Keep this serious but still developer-native.

### pricing-plan-card

Pricing cards cover Free, Pro, Team, and Enterprise. Show projects, compute, database size, storage, egress, auth MAUs, edge functions, branches, and support. Avoid hiding usage limits.

### usage-meter-card

Usage meters show database size, egress, storage, MAUs, function invocations, Realtime messages, and compute hours. Use small progress bars and exact limits.

### docs-article-layout

Docs pages use left navigation, article content, code blocks, right TOC, and version/platform switches. Keep docs quieter than marketing.

### cli-command-block

CLI blocks use dark surface, mono type, copy affordance, and exact commands: `supabase init`, `supabase start`, `supabase db push`, `supabase functions deploy`.

### status-health-card

Status cards show healthy, degraded, incident, maintenance, region, service, and update timestamps. Operational clarity matters.

#### footer-developer-directory

Footer groups Product, Resources, Developers, Company, Docs, Pricing, Changelog, GitHub, and social/community links. Keep it compact and technical.

## §2 Palette

The palette is near-monochrome plus emerald. Accent colors exist for charts and warnings, but they should never compete with database UI.

#### emerald-primary

Use emerald for primary CTA, active project state, success, healthy service, and key highlights. It should be saturated enough to identify Supabase.

#### near-black

Use near-black for dark dashboard surfaces, code blocks, terminal panels, and hero contrast. Avoid pure black unless the component is explicitly terminal-like.

#### white-surface

Use white for docs, pricing, tables, and dense cards. Thin borders carry structure.

#### neutral-ladder

Use neutral grays for every secondary role: borders, muted labels, table headers, disabled controls, and skeletons.

## §3 Typography

Supabase typography is modern and restrained. It needs to serve code and database content.

#### display-sans

Use a clean rounded grotesk for display with medium weight and tight spacing. The style is product-led, not editorial.

#### body-sans

Body copy is compact, direct, and developer-focused. Use clear nouns: database, auth, policies, migrations, functions, logs.

#### mono-code

Monospace is essential. Use it for SQL, CLI, API paths, keys, schema, and log rows.

## §4 Composition Rules

Supabase compositions should prove that the platform pieces connect around Postgres.

### product-ui-first

Use dashboard, table, SQL, logs, or code before abstract shapes. Product UI is the main visual asset.

### green-as-state

Green should mean action or health. Do not flood backgrounds with green.

### schema-to-api

Show schema changes leading to generated APIs, clients, policies, or app behavior. That relationship is central.

### dark-code-light-docs

Use dark panels for code and devtools; use light panels for docs, pricing, and comparison.

### exact-technical-labels

Labels should be real: RLS, JWT, Edge Function, replication, branch, migration, bucket, policy, queue, cron.

## §5 Accessibility And States

Developer platforms require legible small text and precise status states.

### focus-state

Focus states use emerald or blue-green rings with enough contrast on light and dark surfaces.

### success-state

Success uses emerald plus text: connected, deployed, healthy, applied, migrated.

### error-state

Errors use red and exact problem messages, especially in SQL, policies, and functions.

### loading-state

Loading states resemble table rows, logs, code lines, or dashboard cards. Avoid generic full-page spinners.

## §6 Anti-Patterns

Supabase style breaks when it becomes generic green SaaS.

### avoid-green-wash

Do not turn every card, chart, and section green. Emerald is high-signal.

### avoid-abstract-platform-art

Abstract cubes, orbs, and gradients do not explain Postgres. Use product UI.

### avoid-fake-code

Code and SQL must look plausible. Fake syntax undermines the developer audience.

### avoid-enterprise-vagueness

Avoid generic "unlock data" language. Say Postgres, auth, storage, functions, realtime, vector, policies, logs.
