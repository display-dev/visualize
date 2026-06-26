---
slug: raycast-style
name: Raycast Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.raycast.com/
  - https://www.raycast.com/store
  - https://www.raycast.com/pro
canonical-canvas: dark
selection:
  mood: [developer, technical]
  tone: [energetic, fast]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a energetic, fast register with developer, technical visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Raycast Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.raycast.com/ | Continuous dark product marketing | Current title: "Raycast - Your shortcut to everything." Metadata: "A collection of powerful productivity tools all within an extendable launcher." Live inventory emphasizes productivity, launcher, AI, Mac, notes, snippets, and extensions. |
| Store | https://www.raycast.com/store | Extension marketplace | Current title: "Raycast - Store." Metadata repeats powerful productivity tools in an extendable launcher. Live inventory includes Store, extensions, tools, AI, Linear, Slack, GitHub, and calendar. |
| Pro | https://www.raycast.com/pro | Subscription/productivity upgrade | Current title: "Raycast Pro: AI, Cloud Sync & Custom Themes, Your Way." Metadata emphasizes smarter AI, Cloud Sync, personalized themes, automation, and productivity. |

Raycast is dark-canonical. The marketing page should feel like an enlarged command palette: black canvas, crisp hairlines, Inter, polished product panels, white primary pill, and small saturated feature accents. The product itself is the visual system.

## §2 Palette

### Dark Core

- `--background`: near-black Raycast canvas.
- `--foreground`: near-white primary text.
- `--card`: raised command-card surface.
- `--border`: cool gray hairline for panels, command rows, and extension cards.
- `--primary`: white CTA/action fill.
- `--primary-foreground`: black text on white.
- `--brand-surface` and `--brand-surface-elevated`: nested app/command surfaces.

### Accent System

- `--accent`: soft blue for links, selected states, and AI highlights.
- `--brand-accent-red`, `--brand-accent-green`, `--brand-accent-yellow`, and soft variants: extension/category marks and small feature illustrations.
- `--brand-hero-stripe-start` / `--brand-hero-stripe-end`: Raycast red striping/brand motion moments. Use sparingly.
- `--brand-key-bg-*`: keyboard key/control surfaces.

### Drift vs `tokens.css`

- The token package matches current Raycast: dark-only canvas, Inter, white CTA, hairline cards, command-palette surfaces, extension accent colours, and mirrored dark mode.
- Current source inventory should emphasize launcher, productivity tools, Mac, AI, notes, snippets, extensions, Store, Linear, Slack, GitHub, calendar, Raycast Pro, Cloud Sync, custom themes, automation, and teams.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Inter | 500-650 | 48-72px | 1.05-1.15 | 0 |
| Heading | Inter | 500-650 | 32-56px | 1.12-1.24 | 0 |
| Title | Inter | 500-600 | 18-24px | 1.25-1.45 | 0 |
| Body | Inter | 400 | 15-17px | 1.5-1.7 | 0 |
| Label | Inter | 500-700 | 12-14px | 1.25-1.45 | 0 |
| Mono | system mono for command snippets only | 400 | 12-14px | 1.45-1.6 | 0 |

Use restrained type with generous spacing. Do not over-tighten; Raycast’s polish comes from dark rhythm and product surface clarity.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://www.raycast.com/`
**Description:** Dark header with Raycast wordmark, product routes, Store, Teams/Pro resources, sign-in, and white primary CTA.
**States:** desktop, mobile, active route, menu open, signed in.

### launcher-hero

**Status:** current
**Live source:** Homepage
**Description:** Hero for "Your shortcut to everything" with command palette/product screenshot and direct productivity claim.
**States:** default, product preview loaded, AI highlighted, reduced-motion.

### command-palette-panel

**Status:** current
**Live source:** Raycast product identity
**Description:** Central app surface with search input, command list, icons, shortcuts, metadata, and selected row.
**States:** empty, searching, selected, running, no results.

### white-primary-pill

**Status:** current
**Live source:** Raycast CTAs
**Description:** White rounded action for Download, Get Started, Try Pro, or Install.
**States:** default, hover, focus, loading, disabled.

### ghost-dark-button

**Status:** current
**Live source:** Secondary actions
**Description:** Dark outlined or transparent button for Learn More, View Store, Docs, or Sign in.
**States:** default, hover, focus, disabled.

### extension-store-grid

**Status:** current
**Live source:** `https://www.raycast.com/store`
**Description:** Marketplace grid/list for extensions and productivity tools with icon, name, author, installs/stats, and route.
**States:** default, filtered, searched, loading, empty.

### extension-card

**Status:** current
**Live source:** Store page
**Description:** Individual extension card for tools like Linear, Slack, GitHub, calendar, AI, and productivity workflows.
**States:** default, hover, installed, verified, featured.

### extension-detail-header

**Status:** current
**Live source:** Store/detail conventions
**Description:** Extension detail header with icon, name, description, author, install action, screenshots, and compatibility.
**States:** default, installed, update available, unavailable.

### ai-command-card

**Status:** current
**Live source:** Homepage/Pro AI positioning
**Description:** Card for AI commands, quick answers, writing, coding, automation, and prompt shortcuts.
**States:** idle, asking, streaming, answered, error.

### notes-panel

**Status:** current
**Live source:** Homepage notes references
**Description:** Notes surface with list, editor, tags, shortcuts, and quick capture.
**States:** empty, editing, saved, synced, search.

### snippets-panel

**Status:** current
**Live source:** Homepage snippets references
**Description:** Snippets manager with trigger, replacement text, app scope, and preview.
**States:** default, editing, copied, conflict, disabled.

### window-management-card

**Status:** current
**Live source:** Raycast productivity positioning
**Description:** Productivity feature card for window management and keyboard-driven Mac workflows.
**States:** default, shortcut shown, active layout, disabled permission.

### quicklink-card

**Status:** current
**Live source:** Launcher workflow conventions
**Description:** Card for opening URLs/actions with title, shortcut, icon, and parameter hints.
**States:** default, selected, edited, running.

### keyboard-shortcut-key

**Status:** current
**Live source:** Command palette UI
**Description:** Small keycap elements for keyboard shortcuts inside command rows, docs, and feature explanations.
**States:** default, active, pressed, disabled.

### pro-plan-card

**Status:** current
**Live source:** `https://www.raycast.com/pro`
**Description:** Subscription card for Raycast Pro with AI, Cloud Sync, custom themes, and productivity benefits.
**States:** default, current plan, selected, annual/monthly.

### cloud-sync-panel

**Status:** current
**Live source:** Raycast Pro page
**Description:** Panel for Cloud Sync behavior across Mac devices, settings, extensions, snippets, and notes.
**States:** synced, syncing, conflict, offline.

### custom-theme-card

**Status:** current
**Live source:** Raycast Pro page
**Description:** Theme preview card showing custom themes and interface personalization.
**States:** default, selected, preview, applied.

### team-workspace-card

**Status:** current
**Live source:** Pro/teams references
**Description:** Team productivity card for shared commands, extensions, snippets, onboarding, and admin controls.
**States:** default, member, admin, invite pending.

### integration-row

**Status:** current
**Live source:** Store inventory
**Description:** Row for integrations such as Linear, Slack, GitHub, calendar, and productivity apps.
**States:** connected, disconnected, needs auth, error.

### changelog-card

**Status:** current
**Live source:** Raycast product update conventions
**Description:** Release/update card with version, feature summary, screenshots, and changelog route.
**States:** latest, previous, breaking, beta.

### app-screenshot-frame

**Status:** current
**Live source:** Marketing screenshot surfaces
**Description:** Framed product screenshot with dark card, hairline border, subtle inner glow, and no decorative chrome.
**States:** default, zoomed, carousel, video.

### feature-accent-tile

**Status:** current
**Live source:** Product feature sections
**Description:** Small colored accent tile for feature identity. Use one saturated accent per tile and keep text white/gray.
**States:** blue, red, green, yellow, selected.

### footer-dark-columns

**Status:** current
**Live source:** Raycast footer conventions
**Description:** Dark footer with product, store, resources, company, legal, and social routes.
**States:** desktop, mobile accordion, external links.

## §5 Composition Rules

1. Stay dark-canonical. Light mode should still look like a Raycast surface, not a white SaaS page.
2. Make the product screenshot or command palette the main visual object.
3. Use white CTAs sparingly and keep secondary actions subdued.
4. Extensions need app icons and recognizable integration names.
5. AI belongs in command surfaces, answer panels, and Pro benefits, not glowing abstractions.
6. Accent colours should mark features/categories, not become page backgrounds.

## §6 Accessibility And States

- Hairline borders need enough contrast on near-black canvas.
- White primary buttons need black text and strong focus state.
- Command lists need keyboard focus, selected row, and no-results states.
- Extension cards need non-hover install/status access.
- AI streaming/error states must be readable without relying on blue alone.

## §7 Anti-Patterns

- Do not introduce a generic purple AI gradient.
- Do not use light marketing sections as the default.
- Do not hide the command palette behind abstract productivity copy.
- Do not use heavy shadows; Raycast uses hairlines and surface steps.
- Do not make every feature tile saturated.
