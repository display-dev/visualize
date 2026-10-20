---
slug: replicate-style
name: Replicate Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://replicate.com/
  - https://replicate.com/explore
  - https://replicate.com/docs
  - https://replicate.com/pricing
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

# Replicate Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://replicate.com/ | Warm cream API/product landing | Current title: "Replicate - Run AI with an API." Metadata: "Run open-source machine learning models with a cloud API." Live inventory emphasizes image, video, deploy, fine-tune, models, and API. |
| Explore | https://replicate.com/explore | Model marketplace | Current metadata: "Discover and share machine learning models that you can run in the cloud using Replicate." Live inventory emphasizes models, image, video, audio, language. |
| Docs | https://replicate.com/docs | Developer documentation | Current metadata: "Learn how to run machine learning models with a cloud API." Live inventory includes JavaScript, Python, deploy, webhooks, API, predictions, and training. |
| Pricing | https://replicate.com/pricing | Usage/hardware pricing | Current metadata: "You only pay for what you use on Replicate. Some models are billed by time, others by input and output." Live inventory emphasizes hardware, CPU, GPU, billing, training, and models. |

Replicate is an API-first model marketplace. The design should feel like a warm lab notebook with model outputs and code close together: cream canvas, large editorial display type, orange action, model cards, run forms, prediction logs, and pricing tied directly to hardware and usage.

## §2 Palette

### Warm Developer Core

- `--background`: warm cream page canvas.
- `--foreground`: dark ink for primary text.
- `--card`: white card surface for model cards, docs panels, and pricing rows.
- `--secondary` / `--muted`: cream/bone section backgrounds and code wells.
- `--primary`: Replicate orange for primary run/deploy/sign-up actions.
- `--primary-foreground`: white on orange.
- `--border`: low-alpha ink hairline.

### Support Surfaces

- `--brand-surface-bone`: warmer inset panel for examples, docs, and marketplace shelves.
- `--brand-surface-dark` / `--brand-surface-deep`: dark code/demo panels and footer surfaces.
- `--brand-badge-success`: completion/success state for predictions, deployments, or billing.
- `--brand-link`: orange link/action family.
- `--brand-github-dark`: GitHub/repo-specific dark badge or callout.

### Drift vs `tokens.css`

- The token package remains aligned: cream canvas, orange CTA, white cards, large Freigeist display type, Basier body, JetBrains Mono code, and hand-tuned dark preview.
- Current source inventory should emphasize Run AI with an API, open-source models, Explore, image, video, audio, language, docs, JavaScript, Python, HTTP/API, predictions, webhooks, training, deploy, fine-tune, pricing, billing, CPU, GPU, and hardware.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | rb-freigeist-neue | 700 | 64-128px | 0.95-1.05 | 0 |
| Heading | rb-freigeist-neue | 700 | 40-72px | 0.95-1.08 | 0 |
| Title | basier-square | 600 | 20-28px | 1.25-1.4 | 0 |
| Body | basier-square | 400 | 15-17px | 1.45-1.65 | 0 |
| Label | basier-square | 500-600 | 12-14px | 1.2-1.4 | 0 |
| Code | jetbrains-mono | 400 | 12-14px | 1.45-1.65 | 0 |

Use oversized display type for product claims and smaller practical type for model, pricing, docs, and API details.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://replicate.com/`
**Description:** Header with Replicate glyph/wordmark, Explore, docs, pricing, models/deploy routes, account, and primary action.
**States:** desktop, mobile, signed out, signed in, search open, active route.

### api-hero

**Status:** current
**Live source:** Homepage
**Description:** Hero for "Run AI with an API" with code snippet, model-output examples, and orange primary action.
**States:** default, code copied, model selected, reduced-motion.

### orange-primary-button

**Status:** current
**Live source:** Replicate CTAs
**Description:** Orange action for Run, Get started, Deploy, Train, or Sign up.
**States:** default, hover, focus, loading, disabled.

### model-output-grid

**Status:** current
**Live source:** Homepage and Explore surfaces
**Description:** Grid of generated image/video/audio/language outputs tied to model cards and examples.
**States:** loading, generated, failed, selected, expanded.

### explore-search

**Status:** current
**Live source:** `https://replicate.com/explore`
**Description:** Search/filter surface for discovering models by task, modality, owner, popularity, or tag.
**States:** empty, focused, typed, filtered, no results.

### model-card

**Status:** current
**Live source:** Explore page
**Description:** Model card with output thumbnail, model name, owner, short description, modality tags, run count or popularity, and route.
**States:** default, hover, selected, private, deprecated.

### modality-filter-chip

**Status:** current
**Live source:** Explore page
**Description:** Filter chip for image, video, audio, language, music, speech, or utility models.
**States:** default, selected, disabled, removable.

### model-detail-header

**Status:** current
**Live source:** Model detail conventions
**Description:** Model page header with owner/name, description, version, license/context, GitHub link where present, and run action.
**States:** default, latest version, private, deprecated.

### run-form

**Status:** current
**Live source:** Model run UI
**Description:** Input form for model parameters, files, prompts, seeds, dimensions, and submit/run action.
**States:** empty, valid, invalid, running, disabled.

### prediction-result-card

**Status:** current
**Live source:** Predictions/API workflow
**Description:** Result card for generated output, prediction status, logs, seed/parameters, and download/copy actions.
**States:** starting, processing, succeeded, failed, canceled.

### prediction-log-panel

**Status:** current
**Live source:** Docs/predictions workflow
**Description:** Mono panel for logs, status changes, duration, hardware, and error messages.
**States:** streaming, complete, error, copied.

### code-example-tabs

**Status:** current
**Live source:** `https://replicate.com/docs`
**Description:** Tabbed code block for JavaScript, Python, HTTP/cURL, and SDK examples.
**States:** selected language, copied, expanded, error.

### docs-shell

**Status:** current
**Live source:** Docs
**Description:** Documentation layout with sidebar, article body, code examples, model/API concepts, next links, and search.
**States:** desktop, mobile, search open, active nav, copied code.

### api-reference-table

**Status:** current
**Live source:** Docs API references
**Description:** Table for endpoint, method, parameters, response fields, and error cases.
**States:** default, expanded, required field, deprecated.

### webhook-card

**Status:** current
**Live source:** Docs webhooks inventory
**Description:** Card/panel explaining webhook URL, events, signature/security, retries, and delivery logs.
**States:** configured, testing, delivered, failed.

### deploy-model-card

**Status:** current
**Live source:** Homepage/docs deploy references
**Description:** Card for deploying a custom model with container, hardware, scaling, version, and health status.
**States:** draft, building, deployed, failed, paused.

### training-job-card

**Status:** current
**Live source:** Docs/pricing training references
**Description:** Card for training/fine-tuning job with dataset, base model, hardware, status, output version, and cost.
**States:** queued, running, succeeded, failed, canceled.

### hardware-pricing-row

**Status:** current
**Live source:** `https://replicate.com/pricing`
**Description:** Pricing row for CPU/GPU hardware, rate, billing unit, use case, and availability.
**States:** default, selected, unavailable, highlighted.

### usage-billing-panel

**Status:** current
**Live source:** Pricing page
**Description:** Explanation panel for pay-as-you-go billing by time or input/output, model-level pricing, and spending controls.
**States:** default, estimated, free credit, limit reached.

### model-version-list

**Status:** current
**Live source:** Model/deploy workflow
**Description:** Version list with hash/tag, created date, schema changes, and deployment status.
**States:** latest, selected, archived, failed.

### collection-shelf

**Status:** current
**Live source:** Explore/model marketplace
**Description:** Horizontal shelf for featured models, trending image models, video models, language models, and staff picks.
**States:** default, scrolled, loading, empty.

### github-repo-badge

**Status:** current
**Live source:** Open-source model pages
**Description:** Badge/link for source repository, license, stars/owner, or model card provenance.
**States:** default, external, unavailable.

### status-badge

**Status:** current
**Live source:** Predictions/deploy/training workflows
**Description:** Small badge for queued, processing, succeeded, failed, private, public, or deprecated states.
**States:** neutral, running, success, error, warning.

### footer-doc-columns

**Status:** current
**Live source:** Replicate footer conventions
**Description:** Footer columns for product, explore, docs, pricing, company, community, GitHub, and legal routes.
**States:** desktop, mobile accordion, dark, legal.

## §5 Composition Rules

1. Keep code and output near each other. Replicate is strongest when API calls immediately produce visible model results.
2. Use warm cream as the default page floor and white cards for model/docs/pricing surfaces.
3. Orange is the action signal; use it sparingly for run/deploy/train.
4. Prefer real model names, modalities, hardware, predictions, and pricing units over generic AI claims.
5. Code panels should use dark or bone surfaces with mono text and copy affordances.
6. Marketplace density is acceptable when organized by modality, search, and model cards.

## §6 Accessibility And States

- Orange CTAs need white text and clear focus rings.
- Generated-output grids require loading, failed, and alt/label context.
- Long model names, versions, and hashes need wrapping or truncation rules.
- Pricing rows need explicit units and billing basis.
- Prediction statuses must include text labels, not colour only.

## §7 Anti-Patterns

- Do not use generic AI gradient/glow surfaces.
- Do not make the page feel like chat-first AI; Replicate is API/model-first.
- Do not hide hardware or billing mechanics behind vague plan cards.
- Do not separate code examples from output examples.
- Do not over-polish model outputs into stock imagery; keep the lab/workbench feel.
