---
slug: figma-style
name: Figma Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://www.figma.com/
  - https://www.figma.com/design/
  - https://www.figma.com/figjam/
  - https://www.figma.com/pricing/
  - https://www.figma.com/blog/
canonical-canvas: light
selection:
  mood: [playful, tactile]
  tone: [friendly, optimistic]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a friendly, optimistic register with playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

---

# Figma Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.figma.com/ | Light monochrome base with colourful product/story modules | Current homepage leads with "Make anything possible, all in Figma", product mega-nav, logo proof, multi-product carousel, design systems, Dev Mode, MCP, Sites, Make, templates, and gallery sections. |
| Figma Design | https://www.figma.com/design/ | Light product page | Figma Design shares the same nav system and product-led sections for design/prototyping/collaboration. |
| FigJam | https://www.figma.com/figjam/ | Light collaborative whiteboard | FigJam keeps the same Figma type and black/white shell but leans into playful whiteboard colour and collaboration objects. |
| Pricing | https://www.figma.com/pricing/ | Light commerce with strong plan-colour accents | Pricing uses green heavily for the announcement/plan system, plus blue, orange, purple, pink, and neutral plan cards. |
| Blog / Shortcut | https://www.figma.com/blog/ | Dark editorial variant | Blog uses a dark `#131313` editorial shell with pale article/category colours, while still using figmaSans/figmaMono. |

Figma is light-canonical. The marketing and product pages are white/black with colour-block interruptions, while the blog has a legitimate dark editorial variant. Do not turn Figma into a generic dark SaaS product; dark appears as a specific editorial or media surface, not the system default.

## §2 Palette

Values were sampled from first-party Figma pages on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Monochrome core

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Live: main marketing, product, pricing, and FigJam canvas.
- `--foreground`: `oklch(0 0 0)` (= `#000000`). Live: primary text and CTA fill.
- `--primary`: `oklch(0 0 0)` (= `#000000`). Live: black pill/primary buttons and focus ink.
- `--primary-foreground`: `oklch(1 0 0)` (= `#ffffff`). Live: text on black buttons.
- `--border`: `oklch(0.9128 0 0)` (= `#E2E2E2`). Live: pricing cards, separators, product shell borders.
- `--muted-foreground`: `oklch(0.5558 0.0296 259.0367)` (= `#697485`). Live: secondary labels and muted UI copy.
- `--brand-blog-canvas`: `oklch(0.1867 0 0)` (= `#131313`). Live: Shortcut blog dark editorial canvas.
- `--brand-blog-surface`: `oklch(0.2520 0 0)` (= `#222222`). Live: dark blog surfaces.

### Current product accents

- `--brand-kelly-green`: `oklch(0.7417 0.1823 152.9898)` (= `#24CB71`). Live: announcement banner, pricing emphasis, success/product accents.
- `--brand-electric-blue`: `oklch(0.5351 0.2546 274.5279)` (= `#4D49FC`). Live: product/action colour and Figma AI/system accents.
- `--brand-sky`: `oklch(0.7346 0.1589 236.3575)` (= `#00B6FF`). Live: bright blue product accent.
- `--brand-orange`: `oklch(0.7140 0.1863 41.3336)` (= `#FF7237`). Live: orange product block/accent.
- `--brand-red`: `oklch(0.6520 0.2340 26.6909)` (= `#FF3737`). Live: red product/accent.
- `--accent`: `oklch(0.6763 0.2726 344.7739)` (= `#FF24BD`). Live: pink/magenta accent in pricing/product palette.

### Colour blocks

- `--brand-block-lime`: `oklch(0.9578 0.1325 120.8461)` (= `#E4FF97`). Live: lime story panel.
- `--brand-block-mint`: `oklch(0.9837 0.0387 126.0803)` (= `#F3FFE3`). Live: pale green/cream panel.
- `--brand-block-cyan`: `oklch(0.9462 0.0500 200.9687)` (= `#C7F8FB`). Live: cyan panel.
- `--brand-block-cream`: `oklch(0.9059 0.0812 83.5561)` (= `#FADCA2`). Live: warm yellow/cream panel.
- `--brand-block-lilac`: `oklch(0.7596 0.0863 321.7495)` (= `#CB9FD2`). Live: lilac/purple panel.
- `--brand-block-violet-soft`: `oklch(0.8214 0.0965 290.7548)` (= `#C4BAFF`). Live: soft violet panel.
- `--brand-error-deep`: `oklch(0.4454 0.1541 26.1313)` (= `#972121`). Live: deep error/danger text colour.

### Drift vs `tokens.css`

- The token file is already correctly light-canonical and mirrors `:root` for dark mode to prevent a false dark Figma identity.
- The live palette now uses stronger current product colours (`#24CB71`, `#4D49FC`, `#00B6FF`, `#FF7237`, `#FF3737`, `#FF24BD`) beyond the original pastel block set. Add explicit aliases in a future cascade only if preview components need current pricing/product-colour fidelity.
- The blog dark surface is real, but it should be a polarity-locked editorial/blog section token rather than a full dark-mode inversion.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | figmaSans / figmaSans Fallback | 320-380 variable | 64-96px | 0.96-1.08 | -0.02em |
| Heading | figmaSans / figmaSans Fallback | 330-540 variable | 36-64px | 1.05-1.2 | -0.01em |
| Title | figmaSans / figmaSans Fallback | 480-700 variable | 20-30px | 1.25-1.4 | 0 |
| Body | figmaSans / figmaSans Fallback | 320-340 variable | 16-20px | 1.4-1.55 | -0.01em |
| Caption | figmaMono / figmaMono Fallback | 400 | 12-14px | 1.0-1.35 | 0.04em uppercase |
| Mono | figmaMono / figmaMono Fallback | 330-400 | 13-16px | 1.35-1.6 | 0 |

Figma uses a variable sans with low-to-moderate weights and a proper mono for labels/code. It should feel like a product used by designers, not a brand deck with decorative typography.

## §4 Component vocabulary

### product-mega-menu

**Status:** current
**Live source:** `https://www.figma.com/` — Products menu
**Description:** Multi-column product menu listing Figma Design, Make, Dev Mode, Weave, FigJam, Draw, Slides, Sites, Buzz, AI, Downloads, and Release Notes.
**States:** default, menu open, product tile hover, beta/new badge.

### solutions-mega-menu

**Status:** current
**Live source:** `https://www.figma.com/` — Solutions menu
**Description:** Grouped navigation for use cases, roles, organizations, community, and resources.
**States:** default, menu open, group hover, mobile accordion.

### black-primary-pill

**Status:** current
**Live source:** `https://www.figma.com/` — Get started / Contact sales
**Description:** Black pill CTA on white canvas. It is the primary shell action despite the colourful brand palette.
**States:** default, hover, focus, disabled.

### outlined-secondary-pill

**Status:** current
**Live source:** `https://www.figma.com/` — Contact sales / secondary links
**Description:** White or transparent pill with black outline/text. Keep it crisp and monochrome.
**States:** default, hover, focus, disabled.

### homepage-product-carousel

**Status:** current
**Live source:** `https://www.figma.com/` — PromptDesignDrawBuildPublishPromoteJamPresent
**Description:** Multi-mode product carousel that cycles through prompt, design, draw, build, publish, promote, jam, and present stories.
**States:** selected mode, auto-advance, paused, reduced-motion.

### logo-proof-marquee

**Status:** current
**Live source:** `https://www.figma.com/` — customer logo strip
**Description:** Repeating customer logo row for Airbnb, Atlassian, Dropbox, Duolingo, GitHub, Microsoft, Netflix, NYT, Pentagram, Slack, Stripe, and Zoom.
**States:** scrolling, paused, static wrap.

### design-system-showcase

**Status:** current
**Live source:** `https://www.figma.com/` — Bring everyone together with systems that scale
**Description:** Product screenshot module showing component cards, icons, variables, colour libraries, and design-system reuse.
**States:** default, linked Explore design systems, responsive image.

### template-showcase-card

**Status:** current
**Live source:** `https://www.figma.com/` — on-brand templates / templates section
**Description:** Card for social media assets, display ads, one-pagers, websites, mobile apps, presentations, invitations, illustrations, plugins, web ads, icons.
**States:** category selected, hover, carousel position.

### dev-mode-card

**Status:** current
**Live source:** `https://www.figma.com/` — Create one source of truth for devs and designers
**Description:** Screenshot-led module for specs, annotations, code snippets, and developer handoff.
**States:** default, linked Dev Mode, code/spec visible.

### mcp-feature-card

**Status:** current
**Live source:** `https://www.figma.com/` — Turn Figma context into code
**Description:** Product card explaining Figma MCP server and agentic coding tool context.
**States:** default, linked Explore Figma MCP, code/progress visual.

### sites-feature-card

**Status:** current
**Live source:** `https://www.figma.com/` — Publish custom websites
**Description:** Figma Sites module with site-builder screenshot, responsive website preview, and code/AI tweak story.
**States:** default, linked Explore Figma Sites, beta.

### make-ai-card

**Status:** current
**Live source:** `https://www.figma.com/` — Ship products faster with AI
**Description:** Figma Make module showing prompt-to-app workflow, AI chat, and generated interactive UI.
**States:** thinking/loading, generated, linked Explore Figma Make.

### gallery-card

**Status:** current
**Live source:** `https://www.figma.com/` — Explore what people are making
**Description:** Community gallery card with project title, creator, source link, and thumbnail.
**States:** default, hover, external project, video/source.

### quote-proof-block

**Status:** current
**Live source:** `https://www.figma.com/` — Perplexity/GitHub quotes
**Description:** Quote plus logo/person/title. It supports product claims without becoming a conventional testimonial carousel.
**States:** default, image loaded, compact.

### announcement-banner

**Status:** current
**Live source:** `https://www.figma.com/` — Config banner
**Description:** Sitewide announcement strip with coloured background, short text, CTA, and optional logo/image. Current banner uses Kelly Green.
**States:** active, expired, dismissed, locale-specific.

### pricing-plan-card

**Status:** current
**Live source:** `https://www.figma.com/pricing/`
**Description:** Plan card with plan name, price, feature list, CTA, colour accent, and comparison affordances.
**States:** free, professional, organization, enterprise, selected billing, popular.

### pricing-feature-matrix

**Status:** current
**Live source:** `https://www.figma.com/pricing/`
**Description:** Dense pricing feature matrix with coloured product markers and plan availability.
**States:** expanded group, collapsed group, sticky plan header, mobile stacked.

### product-colour-badge

**Status:** current
**Live source:** `https://www.figma.com/pricing/`
**Description:** Small colour badge for product/plan availability. Use current Figma greens, blues, oranges, purples, and pinks.
**States:** available, unavailable, included, add-on, beta.

### figjam-whiteboard-hero

**Status:** current
**Live source:** `https://www.figma.com/figjam/`
**Description:** Collaborative whiteboard hero with playful objects, sticky notes, diagramming/brainstorming energy, and black/white shell.
**States:** default, collaboration cursors, template selected, mobile.

### sticky-note-block

**Status:** current
**Live source:** `https://www.figma.com/figjam/`
**Description:** Colourful rectangular note/card motif for FigJam collaboration. Use sparingly outside FigJam surfaces.
**States:** selected, edited, cursor hover, grouped.

### cursor-collaboration-chip

**Status:** current
**Live source:** `https://www.figma.com/` — collaborative screenshots
**Description:** Named cursor chip or annotation marker showing multiplayer work.
**States:** active cursor, commenting, selected object, offline.

### blog-dark-shell

**Status:** current
**Live source:** `https://www.figma.com/blog/`
**Description:** Shortcut blog dark editorial frame with `#131313` canvas, white/pale text, colour-coded article categories, and figmaSans type.
**States:** index, article, category, hover card.

### blog-article-card

**Status:** current
**Live source:** `https://www.figma.com/blog/`
**Description:** Article card with title, metadata, image/colour panel, and category accent.
**States:** default, hover, featured, dark shell.

### footer-link-columns

**Status:** current
**Live source:** `https://www.figma.com/`
**Description:** Large footer with Product, Plans, Use cases, Resources, Company, socials, language selector, and legal links.
**States:** default, language open, mobile collapse.

### language-selector

**Status:** current
**Live source:** `https://www.figma.com/`
**Description:** Footer/localization selector spanning many languages.
**States:** default, open, selected language.

### product-beta-badge

**Status:** current
**Live source:** `https://www.figma.com/` — Sites / Buzz product links
**Description:** Small Beta/New badge inside menus and product cards. Use mono or compact sans.
**States:** beta, new, default.

### download-app-link

**Status:** current
**Live source:** `https://www.figma.com/` — Downloads menu item
**Description:** Utility link for desktop/mobile/font installer downloads.
**States:** default, hover, external/platform.

### release-notes-link

**Status:** current
**Live source:** `https://www.figma.com/` — Release Notes menu item
**Description:** Product update route with practical release language.
**States:** default, hover, new-release badge.

### resource-tile

**Status:** current
**Live source:** `https://www.figma.com/` — Resources / Get started / Learn
**Description:** Navigation tile for plugins, UI kits, icons, widgets, templates, tools, partners, best practices, reports, demos, webinars, help center.
**States:** default, hover, external.

## §5 Composition rules

- Anchor the page in black and white first. Colour blocks should interrupt and organize, not become a rainbow wash.
- Use figmaSans for nearly all prose and figmaMono for labels, badges, code, and tiny system text.
- Product screenshots should look like Figma: components, variables, cursors, templates, code/spec panels, and generated app previews.
- Keep CTAs monochrome except for announcement/product-specific surfaces.
- Use current product vocabulary: Design, Make, Dev Mode, Weave, FigJam, Draw, Slides, Sites, Buzz, AI, MCP, templates, gallery.
- Let the blog be dark when needed, but keep normal marketing and pricing light.

## §6 Accessibility notes

- Black/white CTA pairs clear AA.
- Bright colour blocks often need black text, not white text.
- `#24CB71` can carry black text well, but small white text on it is not safe.
- Dark blog cards need white or pale text; do not carry light-page muted gray directly onto `#131313`.
