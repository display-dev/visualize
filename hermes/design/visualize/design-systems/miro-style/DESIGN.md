---
slug: miro-style
name: Miro Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://miro.com/
  - https://miro.com/pricing/
  - https://miro.com/ai/
canonical-canvas: light
selection:
  mood: [playful, tactile]
  tone: [friendly, optimistic]
  formality: low
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a friendly, optimistic register with playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

---

# Miro Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://miro.com/ | Light AI workspace marketing | Current title: "AI Innovation Workspace | Miro"; description centers speeding product development from ideation to launch, aligning teams, breaking tool silos, and shipping in an AI-powered visual platform. |
| Pricing | https://miro.com/pricing/ | Light pricing / comparison | Current pricing page exposes Free, Starter, Business, and Enterprise paths with dense feature comparison and board/canvas language. |
| AI Platform | https://miro.com/ai/ | Light AI/teamwork product page | Current title: "AI Platform for Teams | The Innovation Workspace | Miro"; copy frames context-aware AI, faster collaboration, and outcomes. |

Miro is light-canonical: white canvas, black pill CTAs, canary yellow identity, bright blue action, and pastel sticky-note/card colours. Dark preview can borrow from the near-black footer/product-app register, but marketing is primarily white and visual.

## §2 Palette

Values were sampled from current Miro pages on 2026-05-28 and aligned to existing tokens.

### Workspace neutrals

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Main marketing/pricing canvas.
- `--foreground`: `oklch(0.2273 0.0038 286.0916)` (= live `#1c1c1e`). Primary ink.
- `--primary`: `oklch(0.2273 0.0038 286.0916)`. Black pill CTA fill on light canvas.
- `--secondary`: `oklch(0.9876 0.0017 247.8393)`, with live `#fafafc` and `#f1f2f5`. Pale surface and card band.
- `--border`: `oklch(0.9130 0.0084 271.3224)` with live `#c7cad5` for stronger dividers.
- `--brand-footer-bg`: near-black footer/app dark family.
- `--brand-slate`: `oklch(0.4691 0.0267 271.6484)` and live `#555a6a`. Body/supporting copy.
- `--brand-stone`: muted captions and quiet UI text.

### Miro identity and collaboration colours

- `--brand-brand-yellow`: `oklch(0.8742 0.1682 90.9295)`, with live canary `#fde050` and `#FFDD33`. Wordmark/accent identity.
- `--brand-yellow-light`: pale sticky-note yellow.
- `--brand-brand-blue`: `oklch(0.5713 0.2346 268.6813)`, with live `#3859ff`, `#4262ff`, and `#314cd9`. Product/action blue.
- `--brand-brand-coral`: coral sticky-note/card accent, with live red/coral `#DB4F4F`.
- `--brand-brand-rose`: rose/pink collaboration card family, with live `#E87EF1` and pale `#fbd4d4`.
- `--brand-brand-teal`: teal/cyan collaboration card family, with live `#80D6F3`, `#72dfd5`, and pale `#d1f7ea`.
- Live purple/lavender: `#867aff`, `#7a90fe`. Use for pricing/AI feature accents and not as global chrome.

### Drift vs `tokens.css`

- `tokens.css` remains aligned: light canonical, Roobert PRO, black-pill CTAs, canary yellow, Miro blue, sticky-note pastel families, and a synthesized dark preview from the near-black footer/app surface.
- Live language now strongly emphasizes the AI Innovation Workspace, product development lifecycle, AI platform for teams, context-aware collaboration, boards/canvas/templates, and pricing tiers.
- No token cascade is required for this refresh.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Roobert PRO | 500-600 | 64-88px | 1.0-1.08 | 0 |
| Heading | Roobert PRO | 500-600 | 40-64px | 1.1-1.2 | 0 |
| Title | Roobert PRO | 500-600 | 24-40px | 1.2-1.35 | 0 |
| Body | Roobert PRO | 400-500 | 16-18px | 1.45-1.65 | 0 |
| Caption | Roobert PRO | 500-600 | 12-14px | 1.35-1.5 | 0.02em |
| Mono | system mono | 400 | 12-14px | 1.45-1.65 | 0 |

Miro can be big and friendly, but should still feel like a productivity workspace. Avoid novelty type or hand-drawn lettering.

## §4 Component vocabulary

### global-marketing-header

**Status:** current
**Live source:** `https://miro.com/`
**Description:** Header with product/workspace navigation, templates/resources, pricing, contact/sales, sign-in, and primary CTA.
**States:** default, menu open, signed in, scrolled, mobile drawer.

### ai-innovation-hero

**Status:** current
**Live source:** `https://miro.com/`
**Description:** Hero for "AI Innovation Workspace" positioning with product-development promise, visual board preview, and black/blue CTA pair.
**States:** default, board media loaded, CTA hover, mobile.

### ai-platform-hero

**Status:** current
**Live source:** `https://miro.com/ai/`
**Description:** AI platform hero for context-aware teamwork, faster collaboration, and outcome-driven work.
**States:** default, AI prompt active, workflow visible, mobile.

### black-primary-pill

**Status:** current
**Live source:** Miro marketing CTAs
**Description:** Black rounded primary CTA used for start/get/signup actions.
**States:** default, hover, focus, loading, disabled.

### blue-action-button

**Status:** current
**Live source:** Miro product/pricing action moments
**Description:** Miro blue CTA for selected workspace, pricing, or in-product action moments.
**States:** default, hover, focus, disabled.

### outline-secondary-pill

**Status:** current
**Live source:** Miro CTA pairs
**Description:** White/transparent rounded secondary action.
**States:** default, hover, focus, disabled.

### whiteboard-preview

**Status:** current
**Live source:** Miro marketing/product imagery
**Description:** Board mockup with sticky notes, frames, connectors, comments, cursors, and toolbar fragments.
**States:** default, zoomed, cursor active, comment open, mobile crop.

### sticky-note-card

**Status:** current
**Live source:** Miro whiteboard/product visuals
**Description:** Sticky-note style content card using yellow, rose, teal, coral, or lavender fills.
**States:** default, selected, dragging, editing, commented.

### board-frame-card

**Status:** current
**Live source:** Miro boards/canvas language
**Description:** Framed board section for workshops, diagrams, roadmaps, strategy, or agile rituals.
**States:** default, selected, locked, presentation mode.

### ai-prompt-panel

**Status:** current
**Live source:** `https://miro.com/ai/`
**Description:** AI input panel for generating ideas, diagrams, summaries, roadmaps, or workshop outputs.
**States:** empty, typing, generating, complete, failed.

### ai-workflow-stepper

**Status:** current
**Live source:** Miro AI workflow/product pages
**Description:** Stepper for AI-assisted workflow from prompt to board artifact to team alignment.
**States:** step active, complete, error, skipped.

### product-development-flow

**Status:** current
**Live source:** Homepage description
**Description:** Lifecycle module from ideation to launch, using boards, frames, and status cards.
**States:** ideate, plan, build, launch, retro.

### roadmap-board

**Status:** current
**Live source:** Miro roadmap/template references
**Description:** Roadmap board with timeline, initiatives, owners, and sticky-note clusters.
**States:** quarterly, filtered, owner selected, dependency highlighted.

### kanban-board

**Status:** current
**Live source:** Miro kanban/template references
**Description:** Kanban board for tasks, status columns, owners, and comments.
**States:** backlog, in progress, review, done, card dragging.

### diagramming-canvas

**Status:** current
**Live source:** Miro diagramming references
**Description:** Diagram canvas with nodes, connectors, swimlanes, and toolbar actions.
**States:** default, connector active, node selected, export.

### workshop-template-card

**Status:** current
**Live source:** Miro workshops/templates references
**Description:** Template card for workshops, retrospectives, brainstorms, strategy sessions, and product rituals.
**States:** default, hover, use template, saved.

### brainstorming-cluster

**Status:** current
**Live source:** Miro brainstorming/template references
**Description:** Cluster of sticky notes grouped by theme, votes, and AI summaries.
**States:** ungrouped, grouped, voted, summarized.

### comment-thread-pin

**Status:** current
**Live source:** Miro board collaboration patterns
**Description:** Board comment pin with thread preview, resolver, and mention support.
**States:** unread, open, resolved, mentioned.

### collaborator-cursor

**Status:** current
**Live source:** Miro collaborative board UI
**Description:** Named collaborator cursor and presence badge.
**States:** active, idle, following, editing.

### presentation-mode-control

**Status:** current
**Live source:** Miro board/presentation workflows
**Description:** Control for presenting frames or stepping through board sections.
**States:** start, next, previous, fullscreen, ended.

### pricing-plan-card

**Status:** current
**Live source:** `https://miro.com/pricing/`
**Description:** Pricing card for Free, Starter, Business, and Enterprise with plan copy and CTA.
**States:** free, starter, business, enterprise, selected billing, popular.

### pricing-comparison-table

**Status:** current
**Live source:** `https://miro.com/pricing/`
**Description:** Dense feature matrix for plan comparison across boards, AI, templates, integrations, security, and admin controls.
**States:** expanded, collapsed, sticky header, mobile stacked.

### enterprise-security-card

**Status:** current
**Live source:** Pricing/Enterprise sections
**Description:** Enterprise proof card for security, admin, governance, compliance, and company-wide collaboration.
**States:** default, contact sales, expanded.

### template-gallery-grid

**Status:** current
**Live source:** Miro template references
**Description:** Gallery of templates for agile, product, strategy, workshops, diagramming, and brainstorming.
**States:** category selected, hover, use template, search.

### integration-logo-strip

**Status:** current
**Live source:** Miro product/platform surfaces
**Description:** Integration strip for tools and workflows connected into Miro.
**States:** static, filtered, linked, hover.

### customer-story-card

**Status:** current
**Live source:** Miro customer/story surfaces
**Description:** Customer story card with company, quote, outcome, and visual workspace image.
**States:** default, featured, story linked.

### footer-mega-columns

**Status:** current
**Live source:** Miro footer
**Description:** Footer with product, solutions, resources, company, legal, and language controls.
**States:** desktop columns, mobile accordion, locale open.

### dark-board-panel

**Status:** current
**Live source:** Miro dark/footer/app register
**Description:** Near-black board or footer panel with white text and pastel sticky-note colour retained.
**States:** default, board preview, CTA, footer.

## §5 Usage rules

- Build around the board/canvas metaphor: frames, notes, connectors, cursors, comments, and templates.
- Use canary yellow as identity and selected accent, not as a full-page wash.
- Use Miro blue for action and focused product states.
- Keep pastel sticky-note colours tactile and legible; they should look like board artifacts.
- Include AI as a workflow accelerator, not as generic sparkle decoration.
- Pricing surfaces can be dense, but keep the visual language friendly and clear.
- Avoid overly formal enterprise dashboard chrome. Miro should feel collaborative and spatial.

## §6 Preview guidance

- Light preview should show white canvas, black pills, canary yellow identity, blue actions, pastel board elements, and collaborative UI.
- Dark preview should read as a whiteboard/product-app night mode, with pastel notes still carrying identity.
- Include at least one AI workflow component and one board/canvas component in substantial Miro artifacts.
- A correct Miro preview feels like teams visually organizing work from idea to launch.
