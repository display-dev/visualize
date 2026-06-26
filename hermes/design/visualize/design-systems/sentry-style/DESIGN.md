---
slug: sentry-style
name: Sentry Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://sentry.io/welcome/
  - https://sentry.io/pricing/
  - https://docs.sentry.io/product/explore/session-replay/replay-page-and-filters/
  - https://docs.sentry.io/product/explore/traces/
  - https://docs.sentry.io/product/ai-in-sentry/seer/
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

# Sentry Style

_Independent reference inspired by Sentry's public product and marketing surfaces. Not affiliated with or endorsed by Sentry._

## §1 Canonical Canvas

Sentry style is a developer debugging system with two hard polarities: a dark purple-violet marketing stage for code breaks, AI debugging, trace storytelling, and playful illustration; and a white product-commerce surface for pricing, plan comparison, documentation, and dense scan tables. Do not average them into a generic charcoal SaaS theme. The contrast between violet night and bright utility white is part of the brand.

The system should feel like a useful debugging console with a sense of humor. Headlines are blunt and human. Product cards carry real telemetry: issues, spans, replays, logs, owners, releases, suspect commits, SDK commands, and fix diffs. Lime is a syntax highlight, not decoration. Pink is an alert accent, not a general brand wash. Purple holds the atmospheric canvas and navigation chrome.

### global-header

Use a compact product nav with grouped menus: Platform, Products, Seer, Integrations, Solutions, Resources, Docs, Pricing, Sign In, Get Demo, and Get Started. On dark canvas, the header is transparent violet-black with white text and lime or white CTAs. On light canvas, it becomes a white utility bar with a fine lavender-gray divider. The header should feel like a developer tool, not a marketing mega-menu spectacle.

### code-breaks-hero

Lead with a dark violet canvas, a blunt headline, and one highlighted phrase. The canonical headline pattern is short, almost conversational: "Code breaks, fix it faster." Supporting copy should explain application monitoring without sounding like procurement copy. Pair the copy with an issue-detail or terminal composition, not an abstract gradient.

### lime-highlight-chip

Use lime as a typographic mark wrapped around one phrase, command token, or issue state. The chip is slightly rounded, tightly padded, and aligned to the text baseline. Never scatter lime chips across every card. One lime mark per section is usually enough.

### product-menu-grid

Product menus should expose the full observability set: Error Monitoring, Logs, Session Replay, Metrics, Tracing, Profiling, Size Analysis, Cron Monitoring, Uptime Monitoring, and Labs. Each item gets a short label, small icon area, and plain text description. The grid is dense, readable, and designed for developers who know what they are choosing.

### seer-ai-cluster

Seer surfaces are a named family: Seer, Agent, Autofix, and AI Code Review. Style them as connected debugging actions rather than generic AI sparkle cards. Use issue context, code diffs, root-cause summaries, and review comments as the visible proof. Accent with lime for the suggested fix and pink for the risky line.

### monitor-in-five-lines-card

SDK onboarding cards use real commands and code snippets as the visual anchor. Show install commands such as `npx @sentry/wizard@latest -i nextjs`, tabs for platforms, and a short proof line. The card should make setup feel concrete and low-friction.

### issue-context-card

Issue cards combine exception title, route, release, owner, suspect commit, event count, and user impact. The hierarchy starts with what broke, then where, then who owns it. Use violet borders, white or night surfaces, and a small lime status when a fix is available.

### trace-waterfall-panel

Trace panels are horizontal time stories. Use nested spans, duration bars, service labels, and clear culprit emphasis for slow queries, external calls, AI tool executions, and request timeouts. Avoid fake charts with no debugging semantics.

### replay-timeline-panel

Replay panels show a session timeline with click markers, navigation events, console errors, and backend links. The preview can look video-like, but the important part is the correlation: replay events connect to errors, spans, and releases.

### logs-stream

Logs use a compact console rhythm: timestamp, level, service, message, trace id, and linked issue. Keep rows tight. Highlight warnings with amber, fatal entries with pink, and selected context with violet. Logs must look searchable and filterable.

### metrics-card

Metrics are secondary telemetry, not the hero of the brand. Use small line charts, anomaly bands, metric monitor states, and quota counters. Keep the palette restrained: violet strokes, lime active points, pink anomaly marks.

### profiling-card

Profiling cards expose function names, flame shapes, sample percentages, and duration labels. Use monospaced labels and nested blocks. The tone is diagnostic, not data-art.

### uptime-cron-card

Cron and uptime cards should feel operational: monitor name, schedule, last check, response time, failure count, and alert route. Use strong status pills with clear text. The card is compact and pragmatic.

### mcp-integration-card

Sentry MCP and coding-agent surfaces show a conversation or agent request connected to issue context. The visual pattern is: developer asks, Sentry retrieves issue context, agent proposes a fix. Keep this as a workflow card, not a chatbot mascot.

### github-slack-linear-strip

Integrations appear as a workflow strip: GitHub, Slack, Jira, Linear, CLI, and MCP. Use brand marks sparingly and make Sentry the connective tissue. The copy should say that context travels from dev to prod and back.

### customer-logo-ribbon

Logo ribbons can be dense and credible. Include developer-loved and enterprise names in a simple marquee or grid. Keep the area low-contrast on dark canvas or black-on-white on pricing pages. Do not use oversized logo cards.

### testimonial-panel

Testimonials are compact proof blocks with a quote, company mark, person name, and role. Use large quotation marks only as a subtle graphic. The content should reinforce reliability, incident debugging, and signal quality.

### pricing-plan-card

Pricing cards use white canvas, black-violet type, clear plan names, and exact data entitlements. Plans are developer, team, business, and enterprise. Show price, user model, core telemetry included, and the strongest action. The featured plan can use a violet header or lime marker, but the matrix must stay readable.

### plan-comparison-table

The comparison table is a dense white utility surface. Columns are plans; rows are capabilities: users, projects, errors, logs, metrics, tracing, session replay, uptime, cron, metric monitors, profiling, attachments, user feedback, size analysis, Seer, ownership rules, code owners, and support. Use sticky headers and small text.

### quota-meter

Quota meters show event volumes, logs GB, spans, replay counts, uptime monitors, and overage rates. Use slim progress bars and explicit units. Avoid vague "usage" widgets.

### docs-code-example

Docs examples use Monaco-style mono, muted violet borders, line numbers, and copy buttons. The code should include realistic initialization snippets and comments. The visual treatment is quiet, because the code is the content.

### platform-tab-rail

Platform tabs are a long horizontal rail: Next.js, Angular, Android, iOS, Flutter, React Native, Python, Node.js, React, Go, Swift, Ruby, PHP, Laravel, Spring Boot, Vue, Svelte, Astro, JavaScript. Use small pills that can scroll on mobile.

### sandbox-preview

Sandbox links should look interactive and inspectable. Use a framed product screenshot with issue, replay, and trace regions connected by small lime lines. The CTA can say "See How In Sandbox" and should be secondary to Get Started.

### root-cause-summary

Root-cause summaries use a concise explanation, evidence bullets, impacted files, and one suggested next action. Highlight the sentence that explains why the bug happened. This component is central to the Seer story.

### fix-diff-card

Fix diffs use real diff colors sparingly: green additions, pink removals or risky lines, violet file headers, and monospaced code. Pair the diff with confidence, tests touched, and reviewer state. It should look merge-ready.

### alert-rule-card

Alert rule cards show condition, threshold, target, and escalation route. Use exact language: "when errors exceed baseline," "notify Slack," "assign owner," "link release." The design should make automation legible.

#### footer-resource-grid

Footers are dense navigation blocks: Products, AI Debugging, Integrations, Solutions, Learn, Support, Community, Docs, Pricing. Keep labels plain and grouped. Use dark violet for marketing pages and white for docs/pricing.

## §2 Palette

Use purple-violet as the brand's atmospheric foundation, lime as active syntax, pink as breakage or anomaly, white as the dense utility surface, and lavender gray as dividers. The palette should read as observability-specific, not neon cyberpunk.

#### token-canvas-dark

`--brand-canvas-dark: #2f2147` is the canonical purple night for hero, product story, and AI debugging sections. It may deepen to near-black in nav or screenshot frames, but it should keep a visible violet cast.

#### token-surface-night

`--brand-surface-night: #21172f` supports cards on the dark canvas. Use it for issue panels, traces, command blocks, and integration cards.

#### token-canvas-light

`--brand-canvas-light: #ffffff` is the pricing, docs, and matrix surface. It should stay crisp, not cream.

#### token-ink

`--brand-ink: #241636` is the primary text color on light. Use a violet-black rather than pure black for body text, headings, and table labels.

#### token-lime

`--brand-lime: #c8ff49` is the primary active accent. Use it for headline chips, selected pills, success states, connected trace markers, and fix-ready statuses. Do not use it as a full-page background.

#### token-pink

`--brand-pink: #ff5a9d` marks errors, anomaly highlights, removed diff lines, and urgent alerts. Keep it rare.

#### token-violet

`--brand-violet: #6c5dd3` supports navigation highlights, tags, links, and selected tabs when lime would be too loud.

#### token-border

`--brand-border: #ded9e8` on light and `--brand-border-dark: #4a3865` on dark create fine product structure. Borders are thin and deliberate.

## §3 Typography

The type system mixes chunky developer-marketing display with practical UI text and monospaced code. Headlines can be big and personality-forward; product labels and tables are compact and exact.

#### display-type

Use a rounded, slightly condensed display sans for hero and section headlines. If the exact brand display face is unavailable, use a heavy grotesk fallback with a compact width. Avoid delicate editorial serifs.

#### ui-type

Use Rubik-like rounded sans for UI labels, body copy, buttons, and navigation. Medium weight is common; regular weight is used for longer explanations.

#### mono-type

Use Monaco, Menlo, or a similar developer mono for commands, stack traces, span names, file paths, and trace ids. Code should look copied from a real debugging surface.

#### headline-rhythm

Headlines are short and punchy. Use sentence case, not title-case stiffness. Keep supporting copy direct and developer-native.

#### label-rhythm

Labels can use compact uppercase for product metadata: ISSUE, TRACE, REPLAY, RELEASE, OWNER, SEER, AUTOFIX. Letter spacing should be subtle, never decorative.

## §4 Composition Rules

Sentry composition is built from connected context. Every card should imply an investigation path: error to replay, replay to trace, trace to code, code to fix.

### context-connection-lines

Use fine lime or violet connector lines between related telemetry surfaces. The lines should show relationships, not decorate empty space.

### screenshot-as-proof

Product screenshots and UI fragments are proof objects. Put realistic issue detail, stack trace, replay, and trace content inside them. Avoid anonymous dashboard rectangles.

### playful-illustration

Use playful characters, stickers, or hand-drawn marks only at section breaks or empty-state accents. They should relieve density without replacing product proof.

### dense-then-human

Alternate dense product detail with direct human explanation. A trace panel can be followed by a blunt line like "Debug 500s, trace slow requests, replay fetch failures, and fix the broken code that caused it."

### one-primary-action

Each section has one strongest action. Get Started dominates acquisition flows; Get Demo is secondary; Sandbox is exploratory; Contact Sales belongs to enterprise or pricing.

## §5 Accessibility And States

High contrast is mandatory because the brand asks developers to read tiny operational details. Lime and pink must pass when used as text or be paired with labels and icons.

### focus-state

Focus rings use a bright blue-violet or lime outline with enough offset to appear on both dark and light surfaces. Do not rely on glow alone.

### selected-state

Selected tabs and filters use filled violet or lime chips plus text weight. Tables and logs should also show row selection with a subtle background.

### warning-state

Warnings use amber or pink with explicit labels. A color-only anomaly point is insufficient.

### loading-state

Loading states can use skeleton rows shaped like issue lists, trace bars, and code lines. Avoid generic spinners on dense product surfaces.

## §6 Anti-Patterns

Do not flatten Sentry into a generic observability dashboard. The current brand is opinionated: developer-first, connected telemetry, AI debugging, and a playful purple-lime identity.

### avoid-generic-saas-blue

Never replace the purple/lime/pink palette with blue enterprise defaults.

### avoid-empty-charts

Charts without issue names, span labels, owners, releases, or code context are off-brand.

### avoid-ai-sparkles

Seer is debugging context and code review, not a magic-wand visual trope.

### avoid-soft-marketing

Copy like "unlock insights" or "empower teams" weakens the voice. Prefer direct developer language.

### avoid-overusing-lime

Lime is a high-signal highlight. If everything is lime, nothing is active.
