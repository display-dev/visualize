---
slug: intercom-style
name: Intercom Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.intercom.com/
  - https://www.intercom.com/suite/
  - https://www.intercom.com/help/en/articles/9515824-what-is-fin
  - https://www.intercom.com/blog/introducing-operator/
  - https://www.intercom.com/blog/introducing-the-fin-api-platform/
canonical-canvas: light
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Intercom Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.intercom.com/ | Warm light product marketing | Current page is titled "The only helpdesk designed for the AI Agent era" and frames Intercom as a natively integrated AI Agent plus helpdesk platform. |
| Suite | https://www.intercom.com/suite/ | Product suite / helpdesk | Suite messaging centers Fin, next-generation Helpdesk, unified tools, knowledge, data, insights, and workflows. |
| Fin help | https://www.intercom.com/help/en/articles/9515824-what-is-fin | Product help documentation | Fin is described as a Customer Agent across the customer journey and as usable with Intercom or other helpdesks. |
| Operator launch | https://www.intercom.com/blog/introducing-operator/ | Blog / product announcement | 2026 product story for Operator, an agent for customer operations across Fin and Intercom helpdesk. |
| Fin API platform | https://www.intercom.com/blog/introducing-the-fin-api-platform/ | Blog / platform announcement | 2026 platform story for deploying Fin-model capabilities through API and customer-agent use cases. |

Intercom is light-canonical. The current marketing system is cream/near-white with charcoal text, black or dark control fills, small-radius product chrome, and Fin orange as the high-voltage AI accent. Dark appears as product/inbox or callout register, not as the public marketing default.

## §2 Palette

Values come from current Intercom pages and existing Intercom tokens verified on 2026-05-28.

### Warm light shell

- `--background`: `oklch(0.9599 0.0079 73.7435)`. Warm cream/white marketing canvas.
- `--foreground`: `oklch(0.1776 0 0)`. Near-black charcoal for primary text.
- `--brand-surface-1`: `oklch(1 0 0)` (= `#ffffff`). White product card and mockup surface.
- `--brand-surface-2`: `oklch(0.9294 0.0091 78.2799)`. Slightly darker warm panel and hairline-adjacent surface.
- `--border`: `oklch(0.8532 0.0123 79.7789)`. Warm gray border for cards, inputs, and section separators.
- `--brand-hairline-soft`: `oklch(0.9294 0.0091 78.2799)`. Fine divider on cream.
- `--brand-ink-muted`: `oklch(0.4955 0.0031 106.5132)`. Secondary copy.
- `--brand-ink-subtle`: `oklch(0.5000 0.0045 106.5388)`. Tertiary copy adjusted for accessible preview text.
- `--brand-ink-tertiary`: `oklch(0.5000 0.0094 264.5055)`. Small helper/metadata copy lifted from the imported disabled register.

### Product and AI accents

- `--primary`: `oklch(0.1776 0 0)`. Dark filled CTA/control register on light canvas.
- `--primary-foreground`: `oklch(1 0 0)`. White text on dark controls.
- `--brand-fin-orange`: `oklch(0.6770 0.2167 39.0462)` (= `#ff5600`). Fin identity colour and high-voltage AI accent.
- `--brand-report-orange`: `oklch(0.6651 0.2233 36.7371)`. Report/product chart orange.
- `--brand-report-blue`: `oklch(0.7529 0.1332 248.3001)`. Product chart blue.
- `--brand-report-green`: `oklch(0.7874 0.2354 146.5134)`. Success/report green.
- `--brand-report-pink`: `oklch(0.6468 0.2462 11.4083)`. Report pink.
- `--brand-report-lime`: `oklch(0.8445 0.2024 123.2986)`. Report lime.
- `--brand-report-cyan`: `oklch(0.7012 0.1220 212.3209)`. Report cyan.
- `--brand-brand-blue`: `oklch(0.3838 0.2616 264.1096)`. Deep Intercom blue for product highlights when orange would overstate the moment.

### Inverse product register

- `--brand-inverse-canvas`: `oklch(0 0 0)` (= `#000000`). Always-dark callout or inbox strip.
- `--brand-inverse-surface-1`: `oklch(0.3128 0.0018 106.5006)` (= `#313130`). Dark product card or mockup surface.
- `--brand-inverse-ink`: `oklch(1 0 0)` (= `#ffffff`). Text on dark product/callout surfaces.
- `--brand-inverse-ink-muted`: `oklch(0.7019 0.0094 264.5055)`. Secondary text on dark product surfaces.

### Drift vs `tokens.css`

- `tokens.css` is structurally correct: warm light canonical, Saans typography, Fin orange, product/report palette, and a hand-tuned inverse dark mode for previews.
- Current live pages add stronger 2026 content direction: "AI Agent era", native Fin integration, Helpdesk, Copilot, workflows, insights, customer logos, Operator, and Fin API platform.
- No token cascade is required. The refresh is a source/content and component-vocabulary update.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Saans | 450-550 | 64-88px | 0.95-1.05 | -0.02em |
| Heading | Saans | 450-550 | 40-64px | 1.0-1.12 | -0.015em |
| Title | Saans | 400-520 | 20-28px | 1.25-1.4 | -0.005em |
| Body | Saans | 400 | 16-19px | 1.45-1.65 | 0 |
| Caption | Saans | 400-500 | 12-14px | 1.25-1.45 | 0 |
| Mono | system mono | 400 | 12-14px | 1.45-1.65 | 0 |

Intercom type is warm and high-confidence. Use large display type for a few core claims, then return to compact product UI copy quickly.

## §4 Component vocabulary

### shared-header

**Status:** current
**Live source:** `https://www.intercom.com/` — shared header
**Description:** Fixed Intercom header with logo, Fin link, product/company/resource navigation, login, contact sales, view demo, and start free trial actions.
**States:** default, menu open, Fin external hover, mobile drawer, scrolled.

### ai-agent-era-hero

**Status:** current
**Live source:** `https://www.intercom.com/` — homepage hero
**Description:** Hero for "The only helpdesk designed for the AI Agent era" with short proof copy, dark CTA, free-trial route, and product gallery imagery.
**States:** default, hero gallery loaded, CTA hover, reduced motion, mobile.

### fin-nav-link

**Status:** current
**Live source:** `https://www.intercom.com/` — Fin link in header
**Description:** Compact nav affordance routing from Intercom to Fin, with external-link treatment.
**States:** default, hover, focus, external opened.

### start-free-trial-button

**Status:** current
**Live source:** `https://www.intercom.com/` — primary CTA
**Description:** Dark rounded-rectangle CTA on warm light canvas. It should feel product-useful, not promotional.
**States:** default, hover, focus, loading, disabled.

### contact-sales-link

**Status:** current
**Live source:** `https://www.intercom.com/` — header CTA
**Description:** Secondary sales route paired with trial/demo actions.
**States:** default, hover, focus, active.

### view-demo-link

**Status:** current
**Live source:** `https://www.intercom.com/` — header CTA
**Description:** Low-friction demo route for customer-service teams evaluating the AI helpdesk.
**States:** default, hover, focus.

### hero-gallery-strip

**Status:** current
**Live source:** `https://www.intercom.com/` — home 2026 hero gallery assets
**Description:** Product/gallery strip using customer-service images, UI mockups, and tabbed product previews.
**States:** loading, image loaded, tab active, mobile carousel.

### helpdesk-product-panel

**Status:** current
**Live source:** `https://www.intercom.com/` and `https://www.intercom.com/suite/`
**Description:** Product panel for the next-generation Helpdesk with inbox, tickets, routing, and team workflow context.
**States:** default, screenshot loaded, feature selected, mobile stacked.

### fin-ai-agent-card

**Status:** current
**Live source:** `https://www.intercom.com/help/en/articles/9515824-what-is-fin`
**Description:** Card explaining Fin as the AI Customer Agent across the customer journey, available in Intercom or with existing helpdesks.
**States:** default, with Intercom, with external helpdesk, learn-more.

### copilot-resolution-panel

**Status:** current
**Live source:** `https://www.intercom.com/` — Copilot product imagery
**Description:** Product mockup showing agent-assist, resolution guidance, conversation context, and AI-assisted replies.
**States:** suggested reply, accepted, edited, escalated.

### inbox-conversation-card

**Status:** current
**Live source:** Intercom product imagery
**Description:** Conversation card with customer message, assignee, status, reply box, and AI context.
**States:** open, waiting, snoozed, resolved, priority.

### ticket-workflow-card

**Status:** current
**Live source:** Intercom Helpdesk / Suite messaging
**Description:** Ticket workflow card for routing, ownership, state, and SLA-like support operations.
**States:** new, assigned, pending, escalated, resolved.

### knowledge-source-card

**Status:** current
**Live source:** Fin help and suite pages
**Description:** Source card for help centers, PDFs, external sites, databases, custom data, and guidance powering Fin answers.
**States:** connected, syncing, error, stale, recommended.

### workflow-automation-card

**Status:** current
**Live source:** Intercom suite and help content
**Description:** Automation card for routing, escalation, qualification, and handoff rules.
**States:** enabled, disabled, draft, error, test run.

### insights-dashboard-panel

**Status:** current
**Live source:** `https://www.intercom.com/` — insights product imagery
**Description:** Monitoring dashboard for AI insights, resolution rates, topics, CSAT, and support volume.
**States:** loading, filtered, benchmark, empty, export.

### cx-score-metric

**Status:** current
**Live source:** Intercom help collection — AI insights and CX Score
**Description:** Metric block for customer experience score, automation rate, or support quality.
**States:** positive, neutral, negative, trend up, trend down.

### topics-explorer-list

**Status:** current
**Live source:** Intercom help collection — Topics Explorer
**Description:** Ranked list of support topics driving conversation volume and improvement opportunities.
**States:** default, filtered, rising topic, unresolved topic.

### operator-announcement-card

**Status:** current
**Live source:** `https://www.intercom.com/blog/introducing-operator/`
**Description:** Blog/product launch card for Operator, the customer-operations agent working across Fin and Helpdesk.
**States:** featured, blog linked, new badge.

### fin-api-platform-card

**Status:** current
**Live source:** `https://www.intercom.com/blog/introducing-the-fin-api-platform/`
**Description:** Platform card for deploying Fin AI capabilities through API and agent-builder workflows.
**States:** default, API docs CTA, platform beta, developer link.

### customer-logo-wall

**Status:** current
**Live source:** `https://www.intercom.com/` — logo proof
**Description:** Logo wall for Amazon, Anthropic, Autodesk, DoorDash, Linear, Monday.com, Perplexity, Vanta, WHOOP, and other customers surfaced on the current site.
**States:** static, filtered, marquee, dark strip.

### testimonial-quote-strip

**Status:** current
**Live source:** Intercom marketing/customer proof sections
**Description:** Warm quote/proof band with customer logo, short quote, person attribution, and product outcome.
**States:** light, inverse, carousel, single quote.

### report-stat-card

**Status:** current
**Live source:** Intercom report/product proof modules
**Description:** Stat card using the report palette for resolution rate, response time, automation, or workload reduction.
**States:** default, highlighted, animated count, footnoted.

### messenger-preview

**Status:** current
**Live source:** Intercom product family
**Description:** Messenger widget preview with launcher, conversation, AI answer, handoff, and compact product styling.
**States:** closed, opened, AI answering, handoff, resolved.

### onboarding-message-card

**Status:** current
**Live source:** `https://www.intercom.com/` — onboarding product imagery
**Description:** Proactive message or onboarding card for customer engagement workflows.
**States:** draft, scheduled, sent, viewed, clicked.

### product-tab-switcher

**Status:** current
**Live source:** `https://www.intercom.com/` — tabbed product galleries
**Description:** Tab switcher for Resolve, Engage, Monitor, and other product-story views.
**States:** active tab, hover, auto-advance, paused.

### pricing-resolution-card

**Status:** current
**Live source:** Intercom pricing/trial routes
**Description:** Pricing-related card for trial, sales, resolution-based AI pricing, or plan qualification.
**States:** trial, contact sales, popular, enterprise.

### help-article-shell

**Status:** current
**Live source:** `https://www.intercom.com/help/en/articles/9515824-what-is-fin`
**Description:** Help-center article layout with title, updated metadata, table of contents, article body, and related content.
**States:** default, search active, article feedback, related article.

### blog-announcement-shell

**Status:** current
**Live source:** Intercom blog launch posts
**Description:** Editorial shell for product announcements with large title, date, author, body, screenshots, and CTA.
**States:** featured, inline media, pull quote, related posts.

### inverse-product-callout

**Status:** current
**Live source:** Intercom dark product/callout strips
**Description:** Always-dark product section using black canvas, gray product cards, white ink, muted gray copy, and Fin orange accent.
**States:** default, screenshot, quote, CTA.

### footer-link-columns

**Status:** current
**Live source:** `https://www.intercom.com/` — footer
**Description:** Footer columns for product, company, resources, legal, and social routes.
**States:** desktop columns, mobile accordion, locale/legal focus.

## §5 Usage rules

- Lead with customer-service workflow language: helpdesk, Fin, AI Agent, Copilot, inbox, tickets, knowledge, workflows, insights.
- Use Fin orange for AI identity, launch emphasis, and selected high-energy moments. Do not use it as page background everywhere.
- Keep the primary canvas warm and light. Product screenshots and inverse strips can go dark.
- Round controls moderately, but avoid bubbly SaaS softness. Intercom's current UI is friendly and tight.
- Use real product modules and conversation structures. Generic abstract cards lose the brand quickly.
- Let customer logos and proof blocks feel editorial, not overproduced.
- Keep decorative illustration secondary to support-product UI and messaging surfaces.

## §6 Preview guidance

- Light preview should show warm cream canvas, charcoal type, dark CTAs, white product cards, Fin orange highlights, and customer-service modules.
- Dark preview should read as inverse product/inbox mode: black canvas, raised charcoal cards, white ink, muted gray metadata, and preserved Fin orange.
- Include at least one Fin/AI Agent module and one helpdesk workflow module in any substantial Intercom artifact.
- A correct Intercom preview feels like AI customer-service software with a human support team still in the loop.
