---
slug: notion-style
name: Notion Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.notion.com/
  - https://www.notion.com/product/ai
  - https://www.notion.com/pricing
canonical-canvas: light
selection:
  mood: [minimal, productivity]
  tone: [confident, polished]
  formality: medium
  density: high
  canonical_canvas: light
  best_for: |
    Use for information-dense artifacts that need a confident, polished register with minimal, productivity visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# Notion Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.notion.com/ | Warm white AI workspace | Current metadata positions Notion as "The AI workspace that works for you" and emphasizes Custom Agents, app search, automation, and team productivity. |
| Product AI | https://www.notion.com/product/ai | Product walkthrough | Current metadata: "Meet your AI team" and "Search, generate, analyze, and chat-right inside Notion." |
| Pricing | https://www.notion.com/pricing | Comparison commerce | Current page anchors Free, Plus, Business, Enterprise, and Notion AI across workspace plans. |

Notion is a light-canvas workspace brand. The interface should feel like a page that can become many things: document, wiki, task board, AI answer, database, or site. The brand earns character through block structure, tiny glyphs, restrained illustration, warm gray surfaces, and database-property colour, not through heavy chrome.

## §2 Palette

### Workspace Neutrals

- `--background`: `oklch(1 0 0)`. White document canvas.
- `--foreground`: near-black workspace ink. Use for headings, page titles, database names, and primary controls.
- `--brand-surface`: warm paper gray for sidebars, template shelves, empty states, and product mockup background.
- `--border` / `--brand-hairline-soft`: quiet separators. Notion uses hairlines and spacing instead of boxed panels.
- `--brand-charcoal` and `--brand-slate`: muted body text, property labels, side navigation, and helper copy.

### Product Colour

- `--brand-link-blue`: inline links and current-page affordances.
- `--brand-brand-orange`, `--brand-brand-pink`, `--brand-brand-purple`, `--brand-brand-teal`, `--brand-brand-green`, `--brand-brand-yellow`, and `--brand-brand-brown`: database property fills, small badges, template accents, and product illustrations.
- Tinted card colours (`--brand-card-tint-peach`, `--brand-card-tint-rose`, `--brand-card-tint-mint`, `--brand-card-tint-lavender`, `--brand-card-tint-sky`, `--brand-card-tint-yellow`, `--brand-card-tint-cream`, `--brand-card-tint-gray`) should appear as page blocks, feature cards, and status backgrounds.

### Drift vs `tokens.css`

- The token package already carries Notion's white canvas, near-black ink, warm gray surfaces, blue links, property colours, pastel card tints, Notion Sans, and compact radius scale.
- Keep the purple `--primary` scoped to current marketing CTA moments. Do not let it become an all-purpose AI-gradient palette.
- No token cascade is required for this refresh.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Notion Sans / Inter-like sans | 600 | 56-80px | 1.0-1.1 | 0 |
| Heading | Notion Sans | 600 | 32-56px | 1.08-1.18 | 0 |
| Title | Notion Sans | 500-600 | 20-36px | 1.15-1.3 | 0 |
| Body | Notion Sans | 400 | 15-18px | 1.45-1.65 | 0 |
| Label | Notion Sans | 400-500 | 12-14px | 1.25-1.45 | 0 |
| Mono | system mono only when content is code | 400 | 12-14px | 1.45-1.65 | 0 |

Use calm sentence case. Notion headlines can be large, but product surfaces should read like a useful workspace, not an ad poster.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://www.notion.com/`
**Description:** Top navigation with Notion wordmark, product routes, download/resources/pricing, sign-in, and primary get-started action. Keep it plain, white, and text-led.
**States:** desktop, mobile drawer, signed out, signed in, product menu open, CTA hover.

### ai-workspace-hero

**Status:** current
**Live source:** `https://www.notion.com/`
**Description:** Homepage hero for "The AI workspace that works for you" with a large centered claim, compact supporting copy, CTA row, and product preview rather than abstract decoration.
**States:** default, loading preview, signed-in resume, reduced-motion.

### product-switcher-strip

**Status:** current
**Live source:** Homepage product inventory
**Description:** Horizontal product family strip for AI workspace, docs, wiki, projects, calendar, mail, forms, and sites. Each item is a small glyph plus text, not a large promotional card.
**States:** default, selected, overflow, mobile scroll.

### page-sidebar

**Status:** current
**Live source:** Notion workspace UI conventions
**Description:** Warm-gray sidebar with workspace switcher, search, inbox/activity, favorites, private/teamspaces, and nested pages.
**States:** expanded, collapsed, hover row, active row, unread, drag target.

### document-page

**Status:** current
**Live source:** Notion docs positioning
**Description:** White page canvas with icon/cover optionality, title, block stack, comments, and page properties.
**States:** empty, editing, read-only, shared, locked, comments visible.

### block-editor-surface

**Status:** current
**Live source:** Notion editor conventions
**Description:** Composable block stack where paragraphs, headings, images, callouts, toggles, tables, embeds, and database views share the same page rhythm.
**States:** placeholder, selected block, dragging, slash-menu open, comment anchor.

### slash-command-menu

**Status:** current
**Live source:** Notion editor conventions
**Description:** Floating command palette for inserting blocks. Use a white popover, search row, grouped commands, small icons, and keyboard selection.
**States:** closed, open, filtered, selected, empty result.

### ai-answer-panel

**Status:** current
**Live source:** `https://www.notion.com/product/ai`
**Description:** AI panel for search, generation, analysis, and chat inside the workspace. It should cite workspace context and preserve document flow.
**States:** asking, streaming, answered, citation expanded, error, regenerate.

### custom-agent-card

**Status:** current
**Live source:** Homepage metadata references Custom Agents
**Description:** Card for an AI agent that owns a repeatable workspace task, with title, connected sources, last run, and action affordance.
**States:** idle, running, needs approval, completed, failed.

### enterprise-search-result

**Status:** current
**Live source:** Product AI copy references search across apps
**Description:** Search result row blending Notion pages and connected app sources, with title, source chip, excerpt, and freshness metadata.
**States:** default, app-filtered, selected, no access, stale.

### meeting-notes-card

**Status:** current
**Live source:** Product AI page references meeting notes
**Description:** Notes card with meeting title, participants, summary bullets, decisions, and tasks generated into the workspace.
**States:** recording, processing, ready, shared, follow-up created.

### database-table

**Status:** current
**Live source:** Notion database conventions
**Description:** Spreadsheet-like database with page-title column, property chips, relation fields, checkboxes, dates, people, and filtered views.
**States:** empty, loading, row hover, cell editing, sorted, filtered, grouped.

### kanban-board

**Status:** current
**Live source:** Projects/workspace conventions
**Description:** Board view grouped by status with compact task cards, assignees, dates, and database property colours.
**States:** default, dragging card, collapsed group, empty group, filtered.

### timeline-roadmap

**Status:** current
**Live source:** Projects positioning
**Description:** Roadmap/timeline database view for project planning with bars, milestones, owners, and dependency hints.
**States:** month, quarter, drag resize, overdue, dependency hover.

### wiki-home

**Status:** current
**Live source:** Homepage product inventory
**Description:** Knowledge-base landing page with nested page cards, verified badges, owner metadata, and recently edited content.
**States:** default, stale content, verified, restricted, search active.

### docs-template-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Template card for meeting notes, launch plans, project briefs, wikis, docs, and team operating systems.
**States:** default, hover, preview, duplicate, category selected.

### calendar-event-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Calendar card that links events back to pages, projects, people, and meeting notes.
**States:** upcoming, in progress, completed, conflict, linked page.

### mail-thread-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Mail surface card with sender, subject, short body, attached workspace context, and AI action.
**States:** unread, selected, replied, summarized, archived.

### forms-response-table

**Status:** current
**Live source:** Homepage product inventory
**Description:** Form builder/results surface where responses land as database rows with properties and automation hooks.
**States:** builder, published, collecting, response selected, export.

### sites-page-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Publishable page/site card with page preview, domain/share status, visibility, and edit action.
**States:** draft, published, private, custom domain, updated.

### pricing-plan-card

**Status:** current
**Live source:** `https://www.notion.com/pricing`
**Description:** Plan card for Free, Plus, Business, and Enterprise. Keep plan differences scannable and avoid over-colouring the tiers.
**States:** free, plus, business, enterprise, current plan, annual toggle.

### pricing-comparison-table

**Status:** current
**Live source:** `https://www.notion.com/pricing`
**Description:** Dense comparison table for workspace features, AI add-ons, admin/security, and collaboration limits.
**States:** collapsed category, expanded category, included, limited, unavailable.

### comment-thread

**Status:** current
**Live source:** Notion workspace conventions
**Description:** Inline discussion attached to a page or block, with avatars, timestamps, replies, resolve state, and mention support.
**States:** open, focused, replying, resolved, reopened.

### mention-chip

**Status:** current
**Live source:** Notion editor conventions
**Description:** Inline chip for people, pages, dates, reminders, and database references. Use muted fill with readable text and small icon.
**States:** person, page, date, reminder, inaccessible.

### status-property

**Status:** current
**Live source:** Notion database conventions
**Description:** Database status pill using muted colour fills and plain labels such as Not started, In progress, Blocked, Done, or custom team states.
**States:** default, selected, menu open, custom colour, archived option.

### relation-property

**Status:** current
**Live source:** Notion database conventions
**Description:** Inline relation token linking one database row to another. It should feel like a page link, not a tag cloud.
**States:** empty, one relation, many relations, picker open, no access.

### formula-property

**Status:** current
**Live source:** Notion database conventions
**Description:** Read-only computed value cell for formulas, rollups, and derived status. Use tabular alignment when values compare.
**States:** text, number, date, error, loading.

### integration-card

**Status:** current
**Live source:** Product AI copy references search across apps
**Description:** Connected app card for Slack, Google Drive, GitHub, Jira, or other workspace sources, showing connection state and scope.
**States:** disconnected, connected, syncing, needs reauth, restricted.

### enterprise-security-card

**Status:** current
**Live source:** Pricing and enterprise surfaces
**Description:** Enterprise trust/admin card for SSO, SCIM, audit logs, permissions, security controls, and support.
**States:** default, enabled, configured, requires admin, enterprise-only.

### footer-link-columns

**Status:** current
**Live source:** notion.com footer conventions
**Description:** Product, teams, resources, company, and social links in compact columns with restrained text hierarchy.
**States:** desktop, mobile accordion, locale, legal links.

## §5 Composition Rules

1. Lead with a page or workspace surface. Notion artifacts should show the thing being organized.
2. Use tinted blocks sparingly: one or two product colours per screen, supported by warm neutrals.
3. Keep borders thin, shadows soft, and radii modest. The page structure should do most of the work.
4. Use icons as tiny anchors for object type, not as large section badges.
5. Prefer tables, boards, sidebars, and command menus over generic marketing cards.
6. AI features must stay inside the workspace context: search results, cited answers, agents, summaries, automations.

## §6 Accessibility And States

- Blue links need white or very light backgrounds; do not place them over saturated tints.
- Property fills need dark text unless the fill is intentionally deep.
- Every command menu, database cell, plan card, and sidebar row needs visible focus state.
- Preserve keyboard affordances for block editing, command menus, database navigation, and AI prompts.
- Dark previews are acceptable for artifact testing, but Notion's canonical brand read remains light.

## §7 Anti-Patterns

- Do not turn Notion into a purple AI startup surface.
- Do not use decorative gradient blobs, oversized icon tiles, or generic three-card feature grids.
- Do not over-round database rows or page cards; Notion's UI is tidy, not bubbly.
- Do not make colour carry hierarchy that should be carried by page structure.
- Do not bury the product behind abstract illustration.
