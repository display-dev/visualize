---
slug: composio-style
name: Composio Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://composio.dev/
  - https://composio.dev/pricing
  - https://composio.dev/blog
  - https://docs.composio.dev/docs
  - https://docs.composio.dev/docs/changelog
canonical-canvas: dark
selection:
  mood: [developer, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with developer, technical visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Composio Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage hero | https://composio.dev/ | Near-black `#0f0f0f` / `#131211` with white type | The first viewport is an agent-infrastructure stage: black shell, white nav/logotype, blue/black product mockups, monospace labels, and a large declarative headline. |
| Homepage product body | https://composio.dev/ | White panels inside the same black brand shell | The "One product, every workflow" section switches to white cards with black text and black CTA blocks, so the brand cannot be documented as dark-only. |
| Pricing | https://composio.dev/pricing | Light pricing page with shared nav | Pricing presents usage tiers on a light commerce surface; the language is blunt and product-led rather than atmospheric. |
| Blog | https://composio.dev/blog | White editorial feed | Blog cards and incident posts use white backgrounds, black headlines, date/category metadata, and minimal visual treatment. |
| Docs welcome | https://docs.composio.dev/docs | Light documentation shell with dark hero artifact | Docs use a conventional light docs layout, but the hero embeds the same dark Claude/tool-search mockup seen on marketing. |
| Changelog / API reference | https://docs.composio.dev/docs/changelog | Light docs/reference | Changelog pages are dense, sidebar-driven, and code-heavy; they confirm the product reference surface is light-readable. |

Composio is now `both`: the brand's most memorable signature remains dark agent infrastructure, but current first-party marketing, pricing, blog, and documentation ship substantial white/light product surfaces. Preserve both instead of forcing the catalog preview into a single dark polarity.

## §2 Palette

Values below were sampled from first-party Composio pages on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.3866 0.2636 264.1085)` (= `#0007cd`). Live: `https://composio.dev/` — Composio brand blue on CTA/action moments and hero routing graphics.
- `--brand-primary-docs`: `oklch(0.3343 0.2267 264.1244)` (= `#0006a8`). Live: `https://docs.composio.dev/docs` — docs hero connector stroke / brand variable.
- `--brand-blue-light`: `oklch(0.6891 0.1466 256.4819)` (= `#5b9cf4`). Live: `https://composio.dev/` — product mockup highlights and integration affordances.
- `--brand-blue-cyan`: `oklch(0.6342 0.2007 253.8160)` (= `#0089ff`). Live: `https://composio.dev/` — animated/action mockup details.

### Documented secondary brand colours

- `--brand-accent-cyan`: `oklch(0.9003 0.1544 177.4363)` (= `#3fffdd`). Live: `https://composio.dev/` — vivid product-diagram highlight.
- `--brand-accent-violet`: `oklch(0.6056 0.2189 292.7172)` (= `#8b5cf6`). Live: `https://composio.dev/` — gradient/integration artwork and token accents.
- `--brand-accent-orange`: `oklch(0.7811 0.1155 56.4832)` (= `#f0a46c`). Live: `https://composio.dev/` and docs hero — agent/tool illustration accents.
- `--brand-agent-bubble`: `oklch(0.7044 0.0811 63.3617)` (= `#c4956a`). Live: `https://composio.dev/` — model/send bubble in the Claude Cowork mockup.
- `--brand-semantic-success`: `oklch(0.7612 0.1782 153.6114)` (= `#00ff00`-family signal in older examples; current hero uses softer execution states). Live: tool-run states and success labels in product mockups.

### Canvas + neutrals

- `--background`: `oklch(0.1684 0.0000 0.0000)` (= `#0f0f0f`). Live: `https://composio.dev/` homepage shell and hero.
- `--foreground`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: dark hero headline, nav/logotype, and dark mockup text.
- `--card`: `oklch(0.2178 0.0000 0.0000)` (= `#1a1a1a`). Live: homepage terminal/tool panels.
- `--card-foreground`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: dark card headings.
- `--muted`: `oklch(0.2850 0.0000 0.0000)` (= `#2a2a2a`). Live: agent input bubble and elevated dark controls.
- `--muted-foreground`: `oklch(0.6830 0.0000 0.0000)` (= `#999999`). Live: terminal chrome text, docs metadata, and dark mockup secondary text.
- `--secondary`: `oklch(0.9551 0.0000 0.0000)` (= `#f0f0f0`). Live: light docs/pricing/card surface.
- `--secondary-foreground`: `oklch(0.1830 0.0026 67.6640)` (= `#131211`). Live: light-section headings and docs text.
- `--border` / `--input`: `oklch(0.2178 0.0000 0.0000)` (= `#1a1a1a`) on dark; `oklch(0.9310 0.0000 0.0000)` (= `#e8e8e8`) on light. Live: terminal panes and browser-frame borders.
- `--ring`: `oklch(0.3866 0.2636 264.1085)` (= `#0007cd`). Live: brand/action focus should remain blue.

### Polarity-locked surfaces

- `--brand-canvas-night`: `oklch(0.1684 0.0000 0.0000)` (= `#0f0f0f`). Live: homepage hero shell.
- `--brand-canvas-night-warm`: `oklch(0.1830 0.0026 67.6640)` (= `#131211`). Live: docs hero and dark product screenshots.
- `--brand-canvas-deep`: `oklch(0.0000 0.0000 0.0000)` (= `#000000`). Live: terminal/code mockup interiors.
- `--brand-surface-card-elevated`: `oklch(0.2178 0.0000 0.0000)` (= `#1a1a1a`). Live: hero four-pane grid and mockup panels.
- `--brand-surface-strong`: `oklch(0.2850 0.0000 0.0000)` (= `#2a2a2a`). Live: agent input panel.
- `--brand-canvas-light`: `oklch(1.0000 0.0000 0.0000)` (= `#ffffff`). Live: product body, pricing, blog, and docs content.
- `--brand-surface-light-muted`: `oklch(0.9551 0.0000 0.0000)` (= `#f0f0f0`). Live: docs/card/browser chrome.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.2178 0.0000 0.0000)` (= `#1a1a1a`). Live: dark terminal panes and hero module borders.
- `--brand-hairline-strong`: `oklch(0.3211 0.0000 0.0000)` (= approximately `#333333`). Live: stronger dark separators and bordered controls.
- `--brand-hairline-light`: `oklch(0.9310 0.0000 0.0000)` (= `#e8e8e8`). Live: docs/browser chrome and light section borders.

### Drift vs `tokens.css`

- `tokens.css` still documents Composio as dark-canonical and mirrors `:root` into `[data-theme="dark"]`. Live surfaces now require `both`: keep dark as the primary brand signature, but add a light theme block for docs/pricing/blog-style surfaces.
- `--primary` can stay `#0007cd`; docs also expose `#0006a8`, which belongs as a brand-extra/action variant rather than a replacement primary.
- `--font-sans` / `--font-display` currently use Inter. The live marketing shell is still a geometric/product sans with monospace labels; keeping Inter as an open substitute is acceptable unless the licensed brand font is explicitly available.
- Rename generic imported extras over time: `--brand-canvas-night`, `--brand-canvas-light`, and `--brand-surface-light-muted` describe the current surface split better than the imported dark-only phrasing.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Product sans / Inter fallback | 500 | 64-80px homepage hero | 0.95-1.05 | -0.03em |
| Heading | Product sans / Inter fallback | 500 | 40-56px sections | 1.05-1.15 | -0.02em |
| Title | Product sans / Inter fallback | 500-600 | 17-24px cards | 1.25-1.4 | -0.01em |
| Body | Product sans / Inter fallback | 400 | 14-18px | 1.45-1.6 | 0 |
| Caption | Product sans / Inter fallback | 400-500 | 11-13px | 1.3-1.45 | 0.04em-0.08em when uppercase |
| Mono | Menlo / JetBrains Mono / ui-monospace | 400-500 | 11-14px | 1.4-1.6 | 0 |

The typography is deliberately utilitarian: big short headlines, compact nav labels, monospace section tags, and code/schema blocks. Avoid expressive serif or playful display type; the brand voice comes from agent/tool mechanics.

## §4 Component vocabulary

### black-product-nav

**Status:** current
**Live source:** `https://composio.dev/` — global nav and product menus
**Description:** Dark navigation bar with white Composio wordmark, uppercase/product-group menu labels, dense dropdown routes, and a compact GET STARTED action. The nav is more command palette than SaaS marketing header.
**States:** default dark shell, hover opens dark/white product menu, current/CTA routes use stronger white or brand blue.

### agent-readable-signup-template

**Status:** current
**Live source:** `https://composio.dev/` — repeated server-rendered "For AI agents: signup without a human" template
**Description:** Hidden/agent-readable instruction block embedded in HTML that tells agents how to sign up and which CTAs map to signup. This is a real brand primitive: Composio designs the page for agents as readers.
**States:** static machine-readable template, repeated near navigation/CTA zones.

### hero-decision-stage

**Status:** current
**Live source:** `https://composio.dev/` — "Your agent decides what to do. We handle the rest."
**Description:** Near-black full-width stage with oversized two-line headline, short infrastructure subcopy, primary CTA, secondary demo CTA, and a product mockup centered below. The stage uses restrained copy and high contrast rather than decorative illustration.
**States:** desktop centered, mobile stacked, CTA remains blue/black depending on surface.

### claude-cowork-mockup

**Status:** current
**Live source:** `https://composio.dev/`, `https://docs.composio.dev/docs` — Claude Cowork hero card
**Description:** Dark agent chat/product mockup with "Claude Cowork", model selector, reply input, tool-search run state, and integration result cards. It is the signature product artifact.
**States:** idle prompt, running/searching state, found tool cards, execution success states.

### terminal-pane-grid

**Status:** current
**Live source:** `https://composio.dev/` — four-pane dark tool execution visuals
**Description:** Rectangular panes arranged like a terminal/workbench, often with monochrome or blue-highlighted output. Borders are brightness steps, not shadows.
**States:** static demonstration, running labels, success/output highlights.

### ascii-wordmark-block

**Status:** current
**Live source:** `https://composio.dev/` — large monospace ASCII brand treatment
**Description:** Oversized monospace/ascii typography using white glyphs and dim gray fill characters. It reinforces the terminal-native brand more than a normal illustration would.
**States:** static decorative code-art block.

### blue-primary-command

**Status:** current
**Live source:** `https://composio.dev/` — GET STARTED / GET STARTED FOR FREE
**Description:** Compact brand-blue command button with uppercase or direct action copy. On dark surfaces it is one of the only saturated elements; on light surfaces black CTAs also appear.
**States:** default blue, hover darker blue, focus blue ring.

### black-light-surface-cta

**Status:** current
**Live source:** `https://composio.dev/` — white product section "LEARN MORE" controls
**Description:** Light-section CTA rendered as black rectangular command button with white monospace uppercase copy. This is the light-mode counterpart to the blue dark-stage command.
**States:** default black, hover slightly softened, focus blue ring.

### product-routing-card

**Status:** current
**Live source:** `https://composio.dev/` — Composio / For You split
**Description:** White card with product label, tag badge, concise capability copy, and black CTA. Product screenshots or browser/terminal mockups sit beside explanatory copy.
**States:** default white, hover/linked state with stronger border or shadowless emphasis.

### docs-hero-card

**Status:** current
**Live source:** `https://docs.composio.dev/docs` — welcome hero
**Description:** Light docs page with a dark agent mockup embedded as the visual anchor. The surrounding docs chrome remains conventional: sidebar, search, Ask AI, and page cards.
**States:** light docs shell, dark embedded mockup, provider cards below.

### toolkit-provider-chip

**Status:** current
**Live source:** `https://docs.composio.dev/docs` — Anthropic/OpenAI/Vercel AI/Google provider chips
**Description:** Bordered light card/chip with provider logo and small text. It is an index/routing primitive rather than a marketing badge.
**States:** default light card, hover lift/border emphasis, dark-logo variant where needed.

### intent-tool-result-card

**Status:** current
**Live source:** `https://docs.composio.dev/docs` — tool search examples
**Description:** Compact dark card for a resolved tool, including toolkit name, action title, and short description. It visualizes "tool search by intent" as a list of candidate actions.
**States:** found, running, selected, executed.

### pricing-tier-card

**Status:** current
**Live source:** `https://composio.dev/pricing` — usage-based pricing tiers
**Description:** Light pricing card with blunt plan names such as "Totally Free" and usage quotas. The surface is commerce-light, not dark atmospheric.
**States:** default tier, featured/selected tier, CTA action.

### blog-article-card

**Status:** current
**Live source:** `https://composio.dev/blog` — incident/release/article feed
**Description:** White editorial list/card with date, author/category, headline, and short summary. Incident posts and product releases share the same sober content treatment.
**States:** default card/list item, hover title/link emphasis.

### incident-status-card

**Status:** current
**Live source:** `https://composio.dev/blog` — May 2026 security incident post
**Description:** Editorial/status component for security updates. It uses clear headline/date/summary hierarchy and avoids decorative color, matching the seriousness of incident communications.
**States:** static status update, linked post state.

### docs-sidebar

**Status:** current
**Live source:** `https://docs.composio.dev/docs`, `https://docs.composio.dev/docs/changelog`
**Description:** Dense left navigation with groups for Quickstart, Providers, Sessions, Tools, Authentication, Triggers, CLI, Migration, and Troubleshooting. The sidebar is light, compact, and scannable.
**States:** default item, active page, expanded group, hover row.

### docs-topbar-search

**Status:** current
**Live source:** `https://docs.composio.dev/docs` — Search / Ask AI / Playground
**Description:** Documentation topbar with search control, Ask AI command, Playground link, and version/reference routing. This is a developer utility surface.
**States:** default, search open/focused, Ask AI invoked, mobile compact.

### changelog-entry

**Status:** current
**Live source:** `https://docs.composio.dev/docs/changelog` — May 12, 2026 revoke-token endpoint
**Description:** Date-stamped release block with title, explanatory body, endpoint callout, request/response code blocks, and status-code table.
**States:** static readable entry, code copy affordance, linked endpoint.

### endpoint-code-block

**Status:** current
**Live source:** `https://docs.composio.dev/docs/changelog` — POST endpoint examples
**Description:** Monospace request/response block with high contrast syntax and surrounding prose. It should be compact and copyable, not decorative.
**States:** default code, selected/copied, horizontal overflow.

### version-pill

**Status:** current
**Live source:** `https://docs.composio.dev/docs/changelog` — `v3.1` docs/reference selector
**Description:** Small version selector in docs chrome. It is utilitarian, text-first, and tied to reference navigation.
**States:** default, open menu, active version.

### integration-logo-strip

**Status:** current
**Live source:** `https://docs.composio.dev/docs` — provider/framework list
**Description:** Provider cards for Anthropic, OpenAI, Vercel AI, Google, LangChain, CrewAI, LlamaIndex, Mastra, and others. Logos sit inside restrained bordered boxes.
**States:** default light card, hover border/lift, dark logo swap.

### command-copy-row

**Status:** current
**Live source:** `https://docs.composio.dev/docs` and homepage install/CLI references
**Description:** Shell command or API call row with monospace text and optional copy affordance. It is the most reusable developer primitive in the system.
**States:** default, hover/copy, copied success.

### workflow-usecase-grid

**Status:** current
**Live source:** `https://composio.dev/` — built-for routes such as office work, sales, marketing, engineering
**Description:** Structured route grid that maps product capabilities to business workflows. Labels are uppercase/compact and should remain link-dense.
**States:** default route, hover card/link emphasis.

### toolkits-index-link

**Status:** current
**Live source:** `https://docs.composio.dev/docs` and `https://composio.dev/` nav
**Description:** Link into the 1000+ toolkit catalogue. Often paired with direct copy about tool search, auth, context, triggers, and workbench.
**States:** default link/card, hover, active docs route.

### footer-command-index

**Status:** current
**Live source:** `https://composio.dev/` — footer/product index
**Description:** Large route footer grouped by products, solutions, agents, toolkits, blog, and docs. The footer is an index for humans and agents.
**States:** default grouped links, hover link emphasis.

### radial-connector-diagram

**Status:** current
**Live source:** `https://composio.dev/` — blue/white connector curves around hero mockup
**Description:** Thin connector lines and small blue/white nodes route from central agent UI to tool/app outcomes. It creates spatial infrastructure without using decorative blobs.
**States:** static/animated path emphasis, blue active route.

### browser-frame-mockup

**Status:** current
**Live source:** `https://composio.dev/` — light product section browser/terminal frames
**Description:** Faux browser frame with traffic-light dots, gray top chrome, and dark command area. It lets light sections still carry terminal/product credibility.
**States:** static frame, code/output content, active tab/command line.

## §5 Surface inventory

- `https://composio.dev/` — global navigation, agent-readable signup template, dark hero, Claude Cowork mockup, white product sections, use-case routes.
- `https://composio.dev/pricing` — light usage-based pricing cards and commerce copy.
- `https://composio.dev/blog` — white editorial/news feed, incident status post, release posts.
- `https://docs.composio.dev/docs` — docs shell, search/Ask AI/Playground chrome, dark agent mockup, provider/toolkit chips.
- `https://docs.composio.dev/docs/changelog` — dense changelog/reference layout, endpoint examples, status tables, version selector.

## §6 Notes

- Composio explicitly treats agents as page readers. Preserve agent-readable affordances and machine-facing language when authoring a Composio-style artifact.
- The brand's tension is black infrastructure plus white documentation/commercial clarity. A one-polarity preview now undersells the current live system.
- Blue is the action/route voltage. Cyan/violet/orange are mockup and connector accents; they should not become generic CTAs.
- Use real-feeling tool/action nouns in neutral Halcyon content, but avoid copying Composio's exact "1000+ apps", incident details, provider list, or signup instructions into preview copy.
- Keep shadows minimal. Depth comes from borders, brightness steps, browser frames, and spatial connector lines.

## §Known gaps

- Logged-in dashboard, Workbench, Toolkits management, and auth-configuration flows were not accessed. Public docs and marketing show the component vocabulary, but exact app chrome requires authentication.
- Chrome DevTools MCP screenshot capture was not available in this session; verification used first-party page fetches and local preview screenshots.
- Current live pages include machine-readable signup templates in server-rendered HTML. The design system records that as a surface primitive, but previews should not include real signup instructions that could be mistaken for product behavior.
