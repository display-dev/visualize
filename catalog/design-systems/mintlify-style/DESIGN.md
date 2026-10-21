---
slug: mintlify-style
name: Mintlify Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://mintlify.com/
  - https://mintlify.com/pricing
  - https://mintlify.com/docs
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

# Mintlify Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://mintlify.com/ | Light knowledge-platform marketing | Current title: "Mintlify - The Intelligent Knowledge Platform"; description: next-generation documentation that is AI-native, beautiful out of the box, and built for developers. |
| Pricing | https://mintlify.com/pricing | Light SaaS pricing | Pricing copy frames flexible plans from startups to enterprise, with customer proof and plan comparison. |
| Docs | https://mintlify.com/docs | Developer documentation shell | Current title: "Introduction - Mintlify"; description names an AI-native documentation platform with beautiful defaults, interactive API playgrounds, and smart search. |

Mintlify is light-canonical. The public brand uses white and soft warm-gray surfaces, near-black text, black primary pills, a signature mint/green accent, and dense developer documentation chrome. Dark surfaces are real for code and hero/dark-family moments, but a published full dark-mode system is not the default.

## §2 Palette

Values were sampled from current Mintlify pages on 2026-05-28 and aligned to existing tokens.

### Documentation shell

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Main docs and marketing canvas.
- `--foreground`: `oklch(0.1448 0 0)`. Near-black primary text and CTA fill.
- `--primary`: `oklch(0.1448 0 0)`. Black pill primary action.
- `--secondary`: `oklch(0.9851 0 0)`. Pale surface for sections and sidebar.
- Live warm surface `#F1EFED`: `oklch(0.9531 0.0034 67.7820)`.
- Live near-black `#231F20`: `oklch(0.2442 0.0064 0.5935)`.
- `--border`: `oklch(0.9219 0 0)`. Hairlines, docs dividers, input borders.
- `--brand-surface-code`: `oklch(0.2273 0.0038 286.0916)`. Code/dark surface.
- `--brand-canvas-dark`: `oklch(0.1448 0 0)`. Documented dark family canvas.
- `--brand-charcoal`, `--brand-slate`, `--brand-steel`, `--brand-stone`: the docs text ladder for body, secondary, muted, and metadata copy.

### Mint and docs pigments

- `--brand-brand-green`: `oklch(0.7732 0.1548 168.9679)` and live `#18E299` (`oklch(0.8073 0.1774 160.6476)`). Signature mint accent.
- Docs green variants from current docs include `#166E3F` (`oklch(0.4763 0.1101 154.2846)`) and `#26BD6C` (`oklch(0.7045 0.1688 153.5668)`).
- `--brand-brand-green-soft`: `oklch(0.8652 0.1129 172.5886)`. Soft mint highlight.
- `--brand-brand-tag`: `oklch(0.5616 0.1565 259.2488)`. Type/tag badge pigment.
- `--brand-brand-warn`: `oklch(0.6479 0.1376 69.8097)`. Warning/callout pigment.
- `--brand-brand-annotate`: `oklch(0.6436 0.1355 161.7761)`. Annotation/success docs pigment.
- `--brand-brand-error`: `oklch(0.6166 0.1597 22.9744)`. Error/danger docs pigment.
- Current page colour extraction also shows integration/customer-logo colours (`#003087`, `#4B73FF`, `#009CDE`, `#0070E0`, `#F26207`, `#0C8C5E`, `#FF7EB0`, `#FF66F4`, `#FF0105`). Treat them as partner/logo or illustration pigments, not core UI.

### Drift vs `tokens.css`

- `tokens.css` is structurally correct: light-canonical, black primary pills, mint accent, Inter/Geist Mono, docs surfaces, and a hand-tuned dark preview based on documented dark/code surfaces.
- Live copy has shifted to "The Intelligent Knowledge Platform" and stronger AI-native documentation language: smart search, interactive API playgrounds, editor, preview, analytics, OpenAPI, SDKs, MCP, Cursor, Claude, and ChatGPT.
- No token cascade is required for this refresh.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Inter | 600-700 | 56-76px | 1.0-1.08 | 0 |
| Heading | Inter | 600-700 | 36-56px | 1.1-1.22 | 0 |
| Title | Inter | 600 | 22-36px | 1.2-1.35 | 0 |
| Body | Inter | 400-500 | 15-17px | 1.5-1.7 | 0 |
| Caption | Inter | 500-600 | 12-14px | 1.35-1.5 | 0.02em |
| Mono | Geist Mono | 400-500 | 12-14px | 1.45-1.65 | 0 |

Mintlify type should feel exact and developer-readable. Use expressive display sparingly; docs pages should prioritize scan speed and code clarity.

## §4 Component vocabulary

### marketing-header

**Status:** current
**Live source:** `https://mintlify.com/`
**Description:** Top navigation for product, docs, pricing, customers, resources, login, and primary CTA.
**States:** default, menu open, signed in, mobile drawer, scrolled.

### intelligent-knowledge-hero

**Status:** current
**Live source:** `https://mintlify.com/`
**Description:** Homepage hero for "The Intelligent Knowledge Platform" with AI-native documentation positioning and black primary CTA.
**States:** default, hero media loaded, CTA hover, mobile.

### ai-native-docs-card

**Status:** current
**Live source:** `https://mintlify.com/`
**Description:** Feature card explaining AI-native docs, smart content, and developer-friendly defaults.
**States:** default, hover, highlighted, linked.

### black-primary-pill

**Status:** current
**Live source:** Mintlify marketing CTAs
**Description:** Near-black pill for primary actions such as Get started, Start for free, or Book a demo.
**States:** default, hover, focus, loading, disabled.

### outline-secondary-pill

**Status:** current
**Live source:** Mintlify CTA pairs
**Description:** White/transparent pill for secondary routes such as View docs or Contact sales.
**States:** default, hover, focus, disabled.

### docs-shell

**Status:** current
**Live source:** `https://mintlify.com/docs`
**Description:** Three-column docs layout with sidebar, main prose, table of contents, search, and navigation.
**States:** default, sidebar collapsed, active page, mobile drawer, dark code block.

### docs-sidebar-nav

**Status:** current
**Live source:** `https://mintlify.com/docs`
**Description:** Hierarchical sidebar for introduction, guides, components, API, snippets, templates, analytics, and settings.
**States:** expanded, collapsed, active item, nested group, search filtered.

### table-of-contents

**Status:** current
**Live source:** `https://mintlify.com/docs`
**Description:** Right-column anchor navigation for document sections.
**States:** default, active heading, sticky, mobile hidden.

### smart-search-dialog

**Status:** current
**Live source:** Mintlify docs search
**Description:** Search surface for docs content with AI-aware results and keyboard navigation.
**States:** closed, open, loading, results, empty, keyboard selected.

### ask-ai-panel

**Status:** current
**Live source:** Mintlify AI-native docs positioning
**Description:** AI answer panel for querying documentation with citations/source links.
**States:** empty, thinking, answered, sources expanded, failed.

### interactive-api-playground

**Status:** current
**Live source:** `https://mintlify.com/docs` description
**Description:** API playground with endpoint selector, auth, params/body, code generation, and response preview.
**States:** idle, editing, running, success, error, copied.

### openapi-import-card

**Status:** current
**Live source:** Docs mentions of OpenAPI
**Description:** Import card for OpenAPI specs and generated API reference structure.
**States:** upload, validating, success, schema error.

### sdk-example-tabs

**Status:** current
**Live source:** Docs references to SDKs
**Description:** Language tabs for SDK examples and snippets.
**States:** javascript, python, go, curl, copied.

### code-snippet-block

**Status:** current
**Live source:** Mintlify docs
**Description:** Geist Mono code block with syntax highlight, copy action, and optional filename.
**States:** default, copied, focused, highlighted line, error.

### component-preview-card

**Status:** current
**Live source:** Docs references to components and preview
**Description:** Documentation component preview with live example, props, and code.
**States:** preview, code, split, error.

### editor-preview-split

**Status:** current
**Live source:** Docs references to editor and preview
**Description:** Split editor/preview interface for docs authoring workflow.
**States:** editing, previewing, unsaved, saved, validation error.

### analytics-dashboard-card

**Status:** current
**Live source:** Docs references to analytics
**Description:** Analytics card for search queries, page views, feedback, conversions, or broken links.
**States:** loading, filtered, empty, positive trend, negative trend.

### mcp-integration-card

**Status:** current
**Live source:** Current Mintlify pages mentioning MCP
**Description:** Integration card for MCP-compatible docs/agent workflows.
**States:** default, connected, disconnected, docs link.

### cursor-integration-card

**Status:** current
**Live source:** Current Mintlify docs content mentioning Cursor
**Description:** Integration card for Cursor-assisted docs/code workflows.
**States:** default, install CTA, connected, external.

### claude-integration-card

**Status:** current
**Live source:** Current Mintlify docs content mentioning Claude
**Description:** Integration card for Claude/agent documentation consumption and authoring.
**States:** default, docs route, configured.

### chatgpt-integration-card

**Status:** current
**Live source:** Current Mintlify docs content mentioning ChatGPT
**Description:** Integration card for ChatGPT-connected docs/search workflows.
**States:** default, configured, external.

### pricing-plan-card

**Status:** current
**Live source:** `https://mintlify.com/pricing`
**Description:** Pricing plan card from startups through enterprise with plan name, features, CTA, and comparison hooks.
**States:** free/startup, growth, enterprise, popular, selected billing.

### pricing-comparison-table

**Status:** current
**Live source:** `https://mintlify.com/pricing`
**Description:** Feature comparison table for plan capabilities, seats, analytics, AI, and enterprise controls.
**States:** expanded group, collapsed group, sticky header, mobile cards.

### startup-program-card

**Status:** current
**Live source:** Pricing/home pages mentioning startups
**Description:** Card for startup pricing/program eligibility and benefits.
**States:** default, eligible, ineligible, apply CTA.

### customer-proof-grid

**Status:** current
**Live source:** Homepage/pricing customer sections
**Description:** Customer/logo grid and proof cards for docs teams using Mintlify.
**States:** static, filtered, hover, story linked.

### callout-box

**Status:** current
**Live source:** Mintlify docs callouts
**Description:** Docs callout for info, warning, success, note, and error using restrained pigments.
**States:** info, warning, success, error, collapsible.

### badge-chip

**Status:** current
**Live source:** Mintlify docs badges and required labels
**Description:** Small pill/chip for required, beta, type, version, or feature tags.
**States:** default, required, beta, deprecated, active.

### footer-link-columns

**Status:** current
**Live source:** Mintlify footer
**Description:** Footer for product, docs, resources, company, legal, and social links.
**States:** desktop columns, mobile accordion, locale/legal.

### dark-code-panel

**Status:** current
**Live source:** Mintlify code/docs dark surface family
**Description:** Dark panel for code, terminal, or hero technical preview with mint highlights.
**States:** default, copied, error, highlighted line.

## §5 Usage rules

- Treat documentation as the product. Always include docs navigation, content structure, code, API, search, or analytics where relevant.
- Use mint/green as the signature accent for active state, AI, success, or selected product moments. Do not overpaint the interface green.
- Keep the primary CTA black on light canvas; dark previews may flip to white.
- Use Geist Mono for code and compact technical metadata.
- Prefer structured docs components over generic marketing cards.
- Keep partner/logo colours isolated to logos and integration cards.

## §6 Preview guidance

- Light preview should show a white docs canvas, black CTAs, mint accent, code snippets, search, sidebar navigation, and API playgrounds.
- Dark preview should read as the documented dark/code surface promoted into a plausible dark product mode.
- Include at least one AI/search component and one API/docs component in substantial Mintlify artifacts.
- A correct Mintlify preview feels like intelligent documentation infrastructure, not a general SaaS homepage.
