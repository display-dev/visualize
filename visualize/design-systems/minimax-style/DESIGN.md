---
slug: minimax-style
name: MiniMax Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.minimax.io/
  - https://www.minimax.io/agent
  - https://www.minimax.io/platform
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

# MiniMax Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.minimax.io/ | Light AI-lab marketing | Current metadata: "Building AGI with our mission Intelligence with Everyone. Global leader in multi-modal models and AI-native products with over 200 million users." |
| Agent | https://www.minimax.io/agent | Light product/agent marketing | Agent page shares the same product ecosystem, emphasizing MiniMax Agent, task execution, model access, and AI-native workflow. |
| Platform / API Docs | https://www.minimax.io/platform | Documentation / model catalogue | Current title is "Models - MiniMax API Docs" with model overview content across text, video, music, speech, image, MCP, and agent capabilities. |

MiniMax is light-canonical: white and pale gray surfaces, deep near-black text and CTAs, technical docs structure, and vibrant product/model identity colours. Dark mode in previews should be a synthesis from the black footer/promo register, not a replacement for the public marketing identity.

## §2 Palette

Values were sampled from first-party MiniMax pages on 2026-05-28 and aligned to current tokens.

### Neutral shell

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Live: marketing/documentation canvas.
- `--foreground`: `oklch(0.1448 0 0)`. Near-black primary ink.
- `--primary`: `oklch(0.1448 0 0)`. Black pill CTA/action.
- `--secondary`: `oklch(0.9640 0.0029 264.5420)` (= `#F2F3F5`). Pale gray page band.
- `--brand-surface`: `oklch(0.9640 0.0029 264.5420)`. Soft documentation/product background.
- Live pale surface `#F7F8FA`: `oklch(0.9789 0.0029 264.5421)`.
- `--border`: `oklch(0.9276 0.0058 264.5313)`. Soft gray hairline.
- `--brand-footer-bg`: `oklch(0.1448 0 0)` and live deep/nav values `#181E25` (`oklch(0.2322 0.0162 252.4609)`) / `#171717` (`oklch(0.2046 0 0)`).
- `--brand-charcoal`: `oklch(0.2500 0.0060 260.0000)`. Strong body copy.
- `--brand-stone`: `oklch(0.7389 0.0117 274.8375)` and live `#86909C` / `#AAB1BA`. Muted metadata and docs chrome.

### Model and product identity colours

- `--brand-brand-coral`: MiniMax M2/M-series high-energy coral/orange-red identity.
- `--brand-brand-magenta`: Music or creative-model magenta identity.
- `--brand-brand-blue`: Hailuo/video blue identity.
- `--brand-brand-purple`: Speech/agent purple identity.
- Live red: `#D01316` (`oklch(0.5444 0.2150 28.0191)`).
- Live deep indigo: `#050038` (`oklch(0.1597 0.1032 271.6232)`).
- Live yellow: `#FFD388` (`oklch(0.8887 0.1054 80.0938)`).
- Live lavender: `#CAC9FF` (`oklch(0.8548 0.0747 285.5529)`).
- Docs/platform blue: `#1F3EAA` (`oklch(0.4163 0.1764 266.1354)`) and `#EBF3FF` (`oklch(0.9616 0.0183 258.3527)`).

### Drift vs `tokens.css`

- `tokens.css` remains a good fit: light-canonical, black-pill primary action, pale gray sections, DM Sans, product-identity accent colours, and a synthesized dark preview based on footer black.
- Live MiniMax source has more explicit AGI/global/multimodal positioning and stronger API-docs vocabulary than the imported version.
- No token cascade is required. The refresh updates the source inventory and component vocabulary.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | DM Sans / Inter / Helvetica Neue | 600-700 | 64-88px | 1.05-1.12 | 0 |
| Heading | DM Sans / Inter / Helvetica Neue | 600 | 40-60px | 1.12-1.24 | 0 |
| Title | DM Sans / Inter / Helvetica Neue | 600 | 22-34px | 1.22-1.38 | 0 |
| Body | DM Sans / Inter / Helvetica Neue | 400-500 | 16-18px | 1.45-1.65 | 0 |
| Caption | DM Sans / Inter / Helvetica Neue | 500-600 | 12-14px | 1.35-1.5 | 0.02em |
| Mono | JetBrains Mono / system mono | 400-500 | 12-14px | 1.45-1.65 | 0 |

MiniMax can carry large, ambitious AI-lab headlines, but the supporting system should pivot quickly into model taxonomy, docs, examples, and API structure.

## §4 Component vocabulary

### global-product-header

**Status:** current
**Live source:** `https://www.minimax.io/`
**Description:** Header for MiniMax product ecosystem with logo, products/models, API/platform, agent, docs, and account/CTA routes.
**States:** default, nav open, docs active, signed in, mobile drawer.

### agi-mission-hero

**Status:** current
**Live source:** `https://www.minimax.io/`
**Description:** Hero for "Building AGI" and "Intelligence with Everyone" positioning with crisp black CTA and multimodal proof.
**States:** default, media loaded, CTA hover, mobile.

### multimodal-model-grid

**Status:** current
**Live source:** `https://www.minimax.io/` and platform docs
**Description:** Product/model grid for text, video, music, speech, image, agent, and API capabilities.
**States:** default, category hover, model selected, mobile carousel.

### minimax-agent-hero

**Status:** current
**Live source:** `https://www.minimax.io/agent`
**Description:** Agent product hero for AI-native task execution, automation, and model-backed workflows.
**States:** default, prompt running, result visible, CTA hover.

### black-primary-pill

**Status:** current
**Live source:** MiniMax marketing CTAs
**Description:** Near-black rounded primary button. It is the dominant action surface on the white canvas.
**States:** default, hover, focus, disabled, loading.

### outline-secondary-pill

**Status:** current
**Live source:** MiniMax marketing CTAs
**Description:** Secondary outlined pill for learn-more, docs, or compare actions.
**States:** default, hover, focus, disabled.

### model-identity-card

**Status:** current
**Live source:** MiniMax model/product sections
**Description:** Vibrant card for one model family using coral, magenta, blue, or purple identity accents.
**States:** default, hover, selected, new, deprecated.

### m2-model-card

**Status:** current
**Live source:** MiniMax homepage/platform references to M2
**Description:** Model card for M2 text/reasoning/generation capabilities.
**States:** default, API CTA, benchmark visible, selected.

### m1-reasoning-card

**Status:** current
**Live source:** MiniMax homepage/platform references to M1 and reasoning
**Description:** Model card for M1/reasoning capabilities and technical proof.
**States:** default, benchmark, docs link, selected.

### hailuo-video-card

**Status:** current
**Live source:** MiniMax homepage/platform references to Hailuo and video
**Description:** Blue-accent product card for Hailuo/video generation.
**States:** default, preview playing, create CTA, API CTA.

### music-generation-card

**Status:** current
**Live source:** MiniMax homepage/platform references to Music
**Description:** Magenta/creative card for music generation capabilities.
**States:** default, sample playing, prompt visible, API CTA.

### speech-voice-card

**Status:** current
**Live source:** MiniMax platform docs references to Speech, Voice, and T2A
**Description:** Purple/speech card for voice, speech, and text-to-audio model capabilities.
**States:** default, sample playing, language selected, API CTA.

### image-model-card

**Status:** current
**Live source:** MiniMax platform docs references to Image
**Description:** Image-generation model card with preview, prompt metadata, and docs route.
**States:** default, generated, loading, failed.

### talkie-product-card

**Status:** current
**Live source:** MiniMax homepage references to Talkie
**Description:** AI-native product card for Talkie with user-scale/product proof.
**States:** default, app link, product proof, localized.

### api-docs-shell

**Status:** current
**Live source:** `https://www.minimax.io/platform` — Models API Docs
**Description:** Documentation shell with left nav, content column, model overview, code examples, and quick links.
**States:** default, nav active, search open, code copied, mobile.

### model-overview-table

**Status:** current
**Live source:** `https://www.minimax.io/platform` — model catalogue
**Description:** Table/list summarizing model names, modalities, capabilities, endpoints, and availability.
**States:** default, filtered, sorted, deprecated, new.

### endpoint-code-block

**Status:** current
**Live source:** MiniMax API docs
**Description:** Code block for API request/response examples with copy and language tabs.
**States:** curl, python, javascript, copied, error.

### quickstart-card

**Status:** current
**Live source:** MiniMax API docs
**Description:** Docs quickstart card for obtaining keys, selecting model, making first request, and viewing response.
**States:** incomplete, complete, copy key, next step.

### mcp-integration-card

**Status:** current
**Live source:** MiniMax platform references to MCP
**Description:** Integration card for MCP/server usage and agent-tool wiring.
**States:** default, configured, connected, error.

### benchmark-proof-row

**Status:** current
**Live source:** MiniMax model/product proof sections
**Description:** Compact proof row for performance, quality, latency, usage, or adoption claims.
**States:** default, highlighted, footnoted, loading.

### user-scale-stat

**Status:** current
**Live source:** MiniMax homepage metadata
**Description:** Stat block for over 200 million users and global model/product scale.
**States:** default, animated, footnoted.

### product-logo-cloud

**Status:** current
**Live source:** MiniMax product ecosystem
**Description:** Logo or app/product cloud for MiniMax, Hailuo, Talkie, and related products.
**States:** default, hover, linked product.

### prompt-demo-panel

**Status:** current
**Live source:** MiniMax agent/model demos
**Description:** Interactive prompt/result panel showing model input and generated output.
**States:** empty, typing, generating, complete, failed.

### agent-task-card

**Status:** current
**Live source:** `https://www.minimax.io/agent`
**Description:** Agent task card for goals, steps, tools, output, and completion status.
**States:** queued, running, blocked, complete, failed.

### pricing-plan-card

**Status:** current
**Live source:** MiniMax platform/pricing surfaces
**Description:** Plan/usage card for API or product pricing with quota, modality, and CTA.
**States:** free, pay-as-you-go, enterprise, selected.

### status-badge

**Status:** current
**Live source:** Docs/model UI
**Description:** Small badge for new, beta, stable, deprecated, or unavailable model states.
**States:** new, beta, stable, deprecated, unavailable.

### footer-mega-columns

**Status:** current
**Live source:** MiniMax homepage footer
**Description:** Deep black footer with company, products, resources, docs, legal, and social routes.
**States:** desktop columns, mobile accordion, localized.

### dark-footer-band

**Status:** current
**Live source:** MiniMax dark footer/promo register
**Description:** Deep near-black band used for footer, promo, or high-contrast closeout.
**States:** default, CTA, link columns, legal.

## §5 Usage rules

- Start from a white or pale gray canvas, then reserve black for primary CTAs and footer/promo structure.
- Use vibrant model colours as identities, not random decoration.
- Keep model taxonomy explicit: M1, M2, Hailuo, Video, Music, Speech, Voice, Image, Agent, API, MCP.
- Put docs and code examples in real developer structures: side nav, model table, endpoint examples, quickstarts.
- Avoid soft pastel SaaS cards without model identity. MiniMax wants clean surfaces plus sharp product voltage.
- Keep type large on launch surfaces and denser in docs.

## §6 Preview guidance

- Light preview should show white canvas, black pills, pale gray bands, vivid model cards, and API/doc structure.
- Dark preview should feel like the black footer/promo register expanded into a plausible product dark mode.
- Include at least one model matrix and one API/docs component in substantial MiniMax artifacts.
- A correct MiniMax preview reads as a multimodal AI lab and platform, not just a generic model provider.
