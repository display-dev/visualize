---
slug: mistral-ai-style
name: Mistral AI Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://mistral.ai/
  - https://mistral.ai/products/la-plateforme
  - https://mistral.ai/news
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

# Mistral AI Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://mistral.ai/ | Light frontier-AI editorial | Current title: "Frontier AI LLMs, assistants, agents, services | Mistral AI"; description names enterprise AI, customization, fine-tuning, deployment, assistants, agents, multimodal AI, and open models. |
| Mistral AI Studio | https://mistral.ai/products/la-plateforme | Warm product platform | Current title: "Mistral AI Studio - your AI production platform"; copy centers AI use cases, lifecycle management, confidence, privacy, security, and ownership of data. |
| News | https://mistral.ai/news | Editorial/news index | Current description: latest research, product releases, and company announcements from Mistral AI. |

Mistral is light-canonical with warm cream/orange editorial surfaces and a signature sunset stripe palette. The public identity is not a generic dark AI console; dark mode is plausible only as a warm near-black synthesis around code/platform surfaces.

## §2 Palette

Values were sampled from first-party Mistral pages on 2026-05-28 and aligned to existing tokens.

### Warm editorial base

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Main page canvas.
- `--foreground`: `oklch(0.2393 0 0)`. Charcoal primary text.
- Live charcoal `#3C3C3C`: `oklch(0.3562 0 0)`.
- Live near-black `#1E1E1E`: `oklch(0.2350 0 0)`.
- `--border`: `oklch(0.9219 0 0)`. Light section/input hairline.
- `--brand-surface`: `oklch(0.9851 0 0)`. Quiet neutral section.
- `--brand-surface-cream`: `oklch(0.9783 0.0322 93.5127)` and live cream `#FFF0C3` (`oklch(0.9560 0.0603 91.7956)`).
- Live beige `#ECDAA2`: `oklch(0.8897 0.0750 92.3682)`.
- Live beige-deep `#E2D19D`: `oklch(0.8621 0.0704 92.1127)`.

### Sunset stripe and action colours

- `--primary`: `oklch(0.6649 0.2141 37.6415)`, close to live orange `#FA500F` (`oklch(0.6628 0.2157 37.1632)`).
- Live CTA orange `#FF8205`: `oklch(0.7350 0.1841 53.5978)`.
- `--brand-sunshine-500`: `oklch(0.8293 0.1537 76.5192)`, live `#FFB83E`.
- Live yellow `#FFD800`: `oklch(0.8888 0.1827 95.7604)`.
- Live amber `#FFAF00`: `oklch(0.8106 0.1704 75.8706)`.
- Live red `#E10500`: `oklch(0.5723 0.2334 29.4359)`.
- Live stripe steps `#FFC452`, `#FFB83E`, `#FFAD2E` form the warm gradient/stripe family.

### Drift vs `tokens.css`

- `tokens.css` remains valid: warm orange primary, cream surface family, PP Editorial Old display, Inter UI, JetBrains Mono code, and synthesized warm dark preview.
- Live content now strongly centers enterprise AI platform capabilities: LLMs, assistants, autonomous agents, services, Mistral AI Studio, lifecycle management, security/privacy, deploy, coding, Le Chat, models, and research/news.
- No token cascade is required for this refresh.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | PP Editorial Old | 400 | 64-88px | 1.0-1.08 | 0 |
| Heading | PP Editorial Old | 400 | 42-68px | 1.08-1.18 | 0 |
| Title | Inter | 500-600 | 22-36px | 1.25-1.4 | 0 |
| Body | Inter | 400-500 | 16-18px | 1.5-1.65 | 0 |
| Caption | Inter | 500-600 | 12-14px | 1.35-1.5 | 0.02em |
| Mono | JetBrains Mono | 400-500 | 12-14px | 1.45-1.65 | 0 |

Mistral typography should feel editorial and technical at once: elegant display type for positioning, sober Inter for product/platform structure.

## §4 Component vocabulary

### global-site-header

**Status:** current
**Live source:** `https://mistral.ai/`
**Description:** Header for products, solutions, research, news, docs/platform routes, contact, and sign-in/developer actions.
**States:** default, menu open, product menu, mobile drawer, scrolled.

### frontier-ai-hero

**Status:** current
**Live source:** `https://mistral.ai/`
**Description:** Homepage hero for frontier AI LLMs, assistants, agents, services, and enterprise platform positioning.
**States:** default, gradient media loaded, CTA hover, mobile.

### sunset-stripe-bar

**Status:** current
**Live source:** Mistral site signature stripe
**Description:** Horizontal stripe/gradient using yellow, amber, orange, and red blocks as brand closeout or separator.
**States:** full width, compact, footer, hero.

### orange-primary-button

**Status:** current
**Live source:** Mistral CTAs
**Description:** Saturated orange CTA with dark ink when needed for contrast.
**States:** default, hover, focus, disabled, loading.

### charcoal-secondary-button

**Status:** current
**Live source:** Mistral CTA pairs
**Description:** Charcoal/outlined secondary action for docs, contact, or learn-more routes.
**States:** default, hover, focus, disabled.

### ai-studio-hero

**Status:** current
**Live source:** `https://mistral.ai/products/la-plateforme`
**Description:** Product hero for Mistral AI Studio and AI production platform.
**States:** default, product visual loaded, CTA hover, mobile.

### lifecycle-workflow-card

**Status:** current
**Live source:** Mistral AI Studio page
**Description:** Card for creating AI use cases, managing lifecycle, evaluating, deploying, and shipping with confidence.
**States:** design, evaluate, deploy, monitor, complete.

### enterprise-privacy-card

**Status:** current
**Live source:** Studio platform description
**Description:** Proof card for enterprise privacy, security, and full ownership of data.
**States:** default, expanded, compliance note, contact CTA.

### assistant-card

**Status:** current
**Live source:** Homepage description
**Description:** Product card for AI assistants built on Mistral models.
**States:** default, configured, deployed, analytics.

### autonomous-agent-card

**Status:** current
**Live source:** Homepage description
**Description:** Product card for autonomous agents and agentic workflows.
**States:** default, tool connected, running, complete, error.

### multimodal-ai-card

**Status:** current
**Live source:** Homepage description
**Description:** Card for multimodal AI capabilities in enterprise workflows.
**States:** default, image/text/audio selected, demo active.

### open-model-card

**Status:** current
**Live source:** Homepage description
**Description:** Model card for open model availability and customization.
**States:** default, download/docs, fine-tune, deploy.

### fine-tuning-panel

**Status:** current
**Live source:** Homepage and platform descriptions
**Description:** Configuration panel for fine-tuning/customization data, parameters, and evaluation.
**States:** empty, uploading, training, evaluated, deployed.

### deployment-option-card

**Status:** current
**Live source:** Mistral deploy/platform language
**Description:** Card for cloud, enterprise, private, or managed deployment paths.
**States:** cloud, private, hybrid, selected, unavailable.

### model-family-grid

**Status:** current
**Live source:** Mistral model/platform surfaces
**Description:** Grid for models such as Magistral, Codestral, Devstral, Ministral, Mistral Small, and Mistral Medium.
**States:** default, featured, new, deprecated, selected.

### codestral-card

**Status:** current
**Live source:** Current pages/news mentioning Codestral
**Description:** Product/model card for coding-specific model capabilities.
**States:** default, docs, benchmark, code example.

### devstral-card

**Status:** current
**Live source:** Current pages/news mentioning Devstral
**Description:** Model/news card for Devstral and development-agent use cases.
**States:** default, launch, docs, benchmark.

### le-chat-card

**Status:** current
**Live source:** Current pages/news mentioning Le Chat
**Description:** Product card for Le Chat assistant experience.
**States:** default, consumer, enterprise, launch/news linked.

### agents-api-card

**Status:** current
**Live source:** Current news references to Agents API
**Description:** Developer/platform card for agent API capabilities and tool orchestration.
**States:** default, beta, docs, tool connected.

### code-example-block

**Status:** current
**Live source:** Mistral developer/platform surfaces
**Description:** JetBrains Mono code block for API or SDK examples.
**States:** default, copied, highlighted, error.

### evaluation-metric-row

**Status:** current
**Live source:** AI lifecycle/evaluation workflows
**Description:** Row for quality, latency, cost, safety, or benchmark metrics.
**States:** passing, warning, failed, trending.

### research-news-card

**Status:** current
**Live source:** `https://mistral.ai/news`
**Description:** Editorial card for research, product releases, and company announcements.
**States:** default, research, product release, company news, featured.

### news-filter-tabs

**Status:** current
**Live source:** `https://mistral.ai/news`
**Description:** Filter tabs or category controls for news/research/product/company content.
**States:** all, research, product, company, active.

### article-shell

**Status:** current
**Live source:** Mistral news/article pages
**Description:** Editorial article shell with title, date, category, body, imagery, and related links.
**States:** default, footnotes, inline code, related posts.

### contact-sales-form

**Status:** current
**Live source:** Mistral enterprise/contact routes
**Description:** Enterprise contact form with organization, use case, region, and deployment needs.
**States:** empty, valid, invalid, submitting, submitted.

### solution-card-grid

**Status:** current
**Live source:** Current pages referencing solutions
**Description:** Grid of enterprise AI solution cards for industries, functions, and use cases.
**States:** default, hover, category selected, contact CTA.

### footer-cream-band

**Status:** current
**Live source:** Mistral warm footer/closeout register
**Description:** Warm cream footer/closeout with stripe, links, legal, and company routes.
**States:** desktop, mobile accordion, stripe visible.

### warm-dark-panel

**Status:** current
**Live source:** Synthesized from Mistral dark/code/platform surfaces
**Description:** Warm near-black panel for code, platform screenshots, or dark contrast sections.
**States:** default, code, metrics, CTA.

## §5 Usage rules

- Lead with enterprise AI substance: models, assistants, agents, fine-tuning, deploy, privacy, security, ownership.
- Use sunset orange/yellow/red as Mistral identity, not generic heat-map decoration.
- Keep cream surfaces warm and editorial; avoid cold blue AI gradients.
- Use PP Editorial Old for important positioning, then Inter for product mechanics.
- Include model/platform specificity where possible: Studio, Le Chat, Codestral, Devstral, Agents API, open models.
- Use code and lifecycle controls for platform artifacts; use news cards for research/product releases.

## §6 Preview guidance

- Light preview should show warm white/cream canvas, editorial display type, orange CTA, sunset stripe, model cards, and platform/lifecycle modules.
- Dark preview should stay warm near-black with orange accents and code/platform panels.
- Include at least one model/platform component and one enterprise lifecycle/security component in substantial Mistral artifacts.
- A correct Mistral preview feels like frontier enterprise AI with European editorial warmth.
