---
slug: cursor-style
name: Cursor Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://www.cursor.com/
  - https://www.cursor.com/pricing
  - https://www.cursor.com/en/changelog
  - https://docs.cursor.com/
canonical-canvas: light
selection:
  mood: [developer, technical]
  tone: [precise, pragmatic]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a precise, pragmatic register with developer, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Cursor Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing homepage | https://www.cursor.com/ | Mixed warm dark product chrome and cream/light editorial sections | Current homepage opens with a dark AI-editor demo, then alternates product/editor panels, cream sections, photo/testimonial areas, and feature cards. |
| Product demo chrome | https://www.cursor.com/ | Warm near-black `#14120b` / `#141414` | The editor, agent pane, Slack-like PR cards, sidebar, composer input, and code windows are dark product surfaces even on the marketing site. |
| Pricing | https://www.cursor.com/pricing | Warm cream/light commerce | Pricing preserves the cream `#f7f7f4` document canvas and near-black ink, with orange reserved for action. |
| Changelog | https://www.cursor.com/en/changelog | Warm cream/light editorial with product screenshots | Changelog posts use cream editorial framing and product screenshots/code blocks, not a pure IDE-dark page. |
| Docs | https://docs.cursor.com/ | Light docs shell with optional dark/system assets | Docs use a separate Cursor Sans/Berkeley Mono stack, conventional sidebar/search navigation, and code-heavy article layout. |

Cursor is `both`: the brand's prose and commerce surface is warm cream/light, while its product identity is dark IDE/agent chrome. Do not force every artifact into either a cream landing page or a dark code editor; the current system depends on the contrast between them.

## §2 Palette

Values were sampled from first-party Cursor marketing/docs pages on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.6522 0.2135 37.9903)` (= `#f54e00`). Live: `https://www.cursor.com/` — Cursor Orange for primary CTAs, logo/action emphasis, and brand voltage.
- `--brand-primary-active`: `oklch(0.5778 0.1879 38.3117)` (= deeper orange). Live: action hover/pressed states should darken the same orange lineage.
- `--brand-docs-blue`: `oklch(0.6231 0.1880 259.8145)` (= `#3b82f6`). Live: `https://docs.cursor.com/` and marketing fallback UI — conventional docs/link blue appears as a utility colour, not the brand CTA.

### Documented secondary brand colours

- `--brand-timeline-thinking`: `oklch(0.8754 0.1196 85.1207)` (= `#fad075`). Live: homepage code/product examples — yellow/gold syntax and agent-stage accents.
- `--brand-timeline-edit`: `oklch(0.7495 0.1280 287.9905)` (= `#aaa0fa`). Live: product syntax / edit-stage highlights.
- `--brand-semantic-success`: `oklch(0.5654 0.1101 164.4991)` (= `#1f8a65`). Live: product state labels, diffs, and success/check indications.
- `--brand-product-text-muted`: `oklch(0.7187 0.0000 0.0000)` (= `#a4a4a4`). Live: dark product chrome secondary labels and code punctuation.

### Canvas + neutrals

- `--background`: `oklch(0.9753 0.0040 106.4729)` (= `#f7f7f4`). Live: pricing and light marketing/editorial page floor.
- `--foreground`: `oklch(0.2631 0.0127 100.5120)` (= `#26251e`). Live: light-surface headings/body.
- `--card`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: light feature/pricing cards.
- `--muted`: `oklch(0.9439 0.0011 17.1771)` (= `#edecec`). Live: product chrome panels and light secondary surfaces.
- `--muted-foreground`: `oklch(0.5890 0.0168 94.3231)`. Live: secondary editorial copy and metadata.
- `--border` / `--input`: `oklch(0.9213 0.0068 97.3577)`. Live: warm hairlines around cards, inputs, and media frames.
- `--ring`: `oklch(0.6522 0.2135 37.9903)` (= `#f54e00`). Live: focus/action affordances should follow Cursor Orange.

### Polarity-locked surfaces

- `--brand-canvas-product`: `oklch(0.1821 0.0139 94.0303)` (= `#14120b`). Live: homepage product/editor demo shell.
- `--brand-product-chrome`: `oklch(0.1913 0.0000 0.0000)` (= `#141414`). Live: editor chrome and dark panes.
- `--brand-product-ink`: `oklch(0.9189 0.0000 0.0000)` (= `#e4e4e4`). Live: dark product code/editor text.
- `--brand-product-muted`: `oklch(0.7187 0.0000 0.0000)` (= `#a4a4a4`). Live: dark product secondary labels.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9482 0.0081 98.8820)`. Live: light card and editorial separators.
- `--brand-hairline-strong`: `oklch(0.8474 0.0125 96.4490)`. Live: stronger light dividers and card outlines.
- `--brand-product-border`: `oklch(0.2400 0.0050 80)`. Live: dark IDE/editor panes and composer input borders.

### Drift vs `tokens.css`

- The imported frontmatter said `canonical-canvas: light`; live sampling requires `both`. The current `tokens.css` already has a hand-edited warm near-black `[data-theme="dark"]` block, so the value model is mostly ahead of the old prose.
- Add product-surface aliases in a future cleanup if preview consumers need clarity: `--brand-canvas-product`, `--brand-product-chrome`, `--brand-product-ink`, and `--brand-product-muted` better describe the current editor shell than generic `canvas-soft` / `surface-strong`.
- `--primary-foreground` correctly uses dark ink on Cursor Orange; white-on-orange is below AA for body text.
- Docs expose Cursor Sans/Berkeley Mono while marketing exposes CursorGothic/Berkeley Mono/CursorIcons. Keep CursorGothic for the brand-style preview unless a docs-specific artifact is being generated.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | CursorGothic / Cursor Sans fallback | 400 | 56-72px marketing hero | 1.05-1.12 | -0.03em |
| Heading | CursorGothic / Cursor Sans fallback | 400-500 | 30-44px sections | 1.1-1.25 | -0.02em |
| Title | CursorGothic / Cursor Sans fallback | 500-600 | 17-22px cards | 1.3-1.45 | 0 |
| Body | CursorGothic / Cursor Sans fallback | 400 | 15-18px | 1.45-1.65 | 0 |
| Caption | CursorGothic / Cursor Sans fallback | 400-500 | 12-14px | 1.35-1.5 | 0 |
| Mono | Berkeley Mono / JetBrains Mono fallback | 400-500 | 12-14px | 1.45-1.65 | 0 |

Cursor's editorial type is quiet and warm, closer to a magazine/tool hybrid than a loud developer landing page. The product surface is mono-heavy: code blocks, composer prompts, sidebar rows, command hints, and diff badges all rely on the mono/editor stack.

## §4 Component vocabulary

### warm-editorial-nav

**Status:** current
**Live source:** `https://www.cursor.com/` — global marketing nav
**Description:** Compact top navigation with Cursor mark, product/docs/pricing/changelog routes, and download/get-started action. It can sit on warm light or dark product backgrounds.
**States:** default neutral link, hover stronger ink, active route, mobile collapsed.

### orange-primary-cta

**Status:** current
**Live source:** `https://www.cursor.com/` and `https://www.cursor.com/pricing`
**Description:** Cursor Orange action control with dark text for contrast, modest radius, and direct command copy. It is the only saturated brand CTA.
**States:** default orange, hover deeper orange, focus orange ring, disabled muted.

### secondary-outline-command

**Status:** current
**Live source:** `https://www.cursor.com/` — download/docs secondary actions
**Description:** Neutral button with hairline border and warm text. On dark product surfaces it becomes a subtle chrome-outline control.
**States:** default, hover surface lift, focus ring.

### ai-editor-hero

**Status:** current
**Live source:** `https://www.cursor.com/` — main hero/product demo
**Description:** Hero pairs short editorial headline with a large interactive-looking editor/agent mockup. The value prop is product behavior, not abstract AI art.
**States:** light editorial copy, dark editor mockup, animated/stepped agent states.

### agent-composer-input

**Status:** current
**Live source:** `https://www.cursor.com/` — "Plan, search, build anything..." composer
**Description:** Rounded editor input inside dark product chrome with mode/model pills, command hints, and send affordance.
**States:** empty placeholder, focused orange/primary border, disabled send, active agent mode.

### agent-sidebar-row

**Status:** current
**Live source:** `https://www.cursor.com/` — agent sidebar task rows
**Description:** Dense sidebar row with task title, timestamp, status text, diff counts, and subtle icon. It reads like an IDE list, not a marketing card.
**States:** default row, selected row, ready-for-review group, generating/fetching/reading status.

### product-window-frame

**Status:** current
**Live source:** `https://www.cursor.com/` — editor and agent mockups
**Description:** Rounded rectangular product window with dark chrome, resizable handles, sidebars, split panes, and code/editor content.
**States:** static demo, focused pane, resize-handle affordances, dark/light syntax variant.

### code-editor-pane

**Status:** current
**Live source:** `https://www.cursor.com/` — syntax-highlighted code examples
**Description:** Monaco-like code pane with line rhythm, syntax colours, muted punctuation, and no decorative frame beyond editor chrome.
**States:** dark syntax, light syntax, selected line, generated diff.

### diff-summary-chip

**Status:** current
**Live source:** `https://www.cursor.com/` — PR / agent task rows
**Description:** Compact `+135 -21` style diff token in green/red inside product UI. It is a developer signal, not decorative colour.
**States:** additions green, deletions red, neutral file label.

### slack-pr-card

**Status:** current
**Live source:** `https://www.cursor.com/` — product workflow examples
**Description:** Slack-like message card showing Cursor app output with short summary and action buttons such as View PR / Open in Cursor.
**States:** app message, action buttons, disabled/preview-only state.

### changelog-entry-card

**Status:** current
**Live source:** `https://www.cursor.com/en/changelog` — release entries
**Description:** Warm editorial release block with date/version title, feature bullets, screenshots, and links back into docs/editor flows.
**States:** collapsed/list view, full article, anchor-linked version.

### pricing-plan-card

**Status:** current
**Live source:** `https://www.cursor.com/pricing` — plan tiers
**Description:** Light commerce card with plan name, price/usage copy, feature list, and clear CTA. Hairlines and whitespace carry the structure.
**States:** default, selected/featured, CTA hover, enterprise/contact variant.

### docs-sidebar

**Status:** current
**Live source:** `https://docs.cursor.com/` — docs navigation
**Description:** Dense documentation sidebar with Get started, Changelog, CLI, Concepts, Models, Guides, Downloads, and Forum sections.
**States:** default item, active page, expanded group, mobile drawer.

### docs-search-command

**Status:** current
**Live source:** `https://docs.cursor.com/` — docs topbar/search
**Description:** Search/command affordance in docs shell. It uses conventional docs styling rather than marketing orange emphasis.
**States:** default, focused search, keyboard shortcut hint.

### docs-card-grid

**Status:** current
**Live source:** `https://docs.cursor.com/` — welcome page cards
**Description:** Grid of navigation cards for Get started, Changelog, CLI, Concepts, Models, Guides, Downloads, Forum, and Support.
**States:** default card, hover border/surface emphasis, active link.

### model-selector-pill

**Status:** current
**Live source:** `https://www.cursor.com/` — Composer model selector
**Description:** Small pill/control showing model or mode such as Composer and Agent. It belongs to product chrome and uses muted surfaces.
**States:** default, open menu, selected, disabled.

### mode-pill

**Status:** current
**Live source:** `https://www.cursor.com/` — Agent mode pill
**Description:** Rounded pill with icon and mode label, sometimes with warm tinted background. It visually anchors the current AI behavior.
**States:** default, selected, hover, menu open.

### command-hint-row

**Status:** current
**Live source:** `https://www.cursor.com/` — `/ commands`, `@ files`, `! shell`
**Description:** Bottom hint row inside composer/editor chrome showing keyboard-style command affordances.
**States:** default hint, active slash/file/shell invocation.

### feature-card

**Status:** current
**Live source:** `https://www.cursor.com/` — Tab/autocomplete and feature sections
**Description:** Large card with text block and adjacent product screenshot/animation. It uses warm light surfaces and minimal borders.
**States:** default card, linked card, image/product media state.

### media-border-container

**Status:** current
**Live source:** `https://www.cursor.com/` — product screenshot frames
**Description:** Framed media container with image/screenshot and subtle border. It lets product screenshots carry the brand instead of adding extra ornament.
**States:** static screenshot, dark/light wallpaper variant.

### testimonial-photo-band

**Status:** current
**Live source:** `https://www.cursor.com/` — team/customer imagery sections
**Description:** Warm editorial image band with rounded media and restrained copy. It softens the product-heavy page without becoming lifestyle-first.
**States:** static image, quote/card pairing.

### code-syntax-sample

**Status:** current
**Live source:** `https://www.cursor.com/` and docs — Shiki code samples
**Description:** Syntax-highlighted block with paired dark/light themes. Cursor uses real syntax colours heavily; avoid flattening code to monochrome.
**States:** dark syntax, light syntax, copied/selected, overflow scroll.

### download-platform-button

**Status:** current
**Live source:** `https://www.cursor.com/` and docs downloads
**Description:** Platform-specific download control for Mac/Windows/Linux. It is direct and product-oriented.
**States:** default platform, hover, alternate platform menu.

### forum-support-link

**Status:** current
**Live source:** `https://docs.cursor.com/` — Forum / Support routes
**Description:** Docs route card/link for community and account support. It uses the docs shell's restrained link styling.
**States:** default route, hover, external/open state.

### usage-limit-notice

**Status:** current
**Live source:** `https://docs.cursor.com/account/rate-limits` — models/pricing and usage docs
**Description:** Documentation callout explaining model usage, limits, upgrades, and usage-based pricing. It is practical and text-heavy.
**States:** static note, warning/callout, link to billing.

### changelog-anchor-link

**Status:** current
**Live source:** `https://www.cursor.com/en/changelog` — version anchors
**Description:** Deep link into a specific release entry. The visual pattern is an editorial heading with stable anchor behavior.
**States:** default heading, hovered anchor, direct-linked section.

## §5 Surface inventory

- `https://www.cursor.com/` — marketing nav, dark product/editor demo, agent composer, code panes, feature cards, testimonials/media.
- `https://www.cursor.com/pricing` — light commerce surface and plan-card vocabulary.
- `https://www.cursor.com/en/changelog` — release-note/editorial surface with product screenshots.
- `https://docs.cursor.com/` — docs shell, sidebar, search, card grid, CLI/changelog/concepts routing.

## §6 Notes

- Cursor Orange is the brand action colour. Docs blue and syntax colours are utility/product colours; do not promote them into primary CTAs.
- The product mockup is load-bearing. A Cursor-style artifact should include editor, agent, code, diff, or composer structure rather than only warm editorial cards.
- Warm cream is not beige decoration; it is the reading/commercial surface that contrasts with dark IDE chrome.
- Avoid copying live model names, real user names, customer quotes, changelog promises, or exact pricing claims into preview content.
- Keep the UI quiet: minimal hairlines, little/no shadow, warm black ink, code-heavy density where the product surface appears.

## §Known gaps

- Logged-in Cursor editor state, organization admin, billing dashboard, and live in-app changelog were not accessed. Public marketing/docs/changelog pages provide the visual vocabulary but not every app state.
- Chrome DevTools MCP screenshot capture was not available in this session; live verification used first-party page fetches and local preview screenshot checks.
- Several first-party routes returned Next.js 404 payloads for guessed paths; only the listed verified URLs were used as source surfaces.
