---
slug: expo-style
name: Expo Style
source: live-verified
verified-at: 2026-05-27
verified-by: codex
verified-urls:
  - https://expo.dev/
  - https://expo.dev/pricing
  - https://expo.dev/blog
  - https://docs.expo.dev/
canonical-canvas: dark
selection:
  mood: [industrial, spatial]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with industrial, spatial visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Expo Style

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing homepage | https://expo.dev/ | Adaptive, light-dominant | The live page uses a white/light default, black primary actions, neutral cards, device/product imagery, and a dark preference theme via `#151718`. |
| Pricing | https://expo.dev/pricing | Light commerce with dense comparison tables | Plan cards, feature grids, calculator tabs, and comparison rows keep the monochrome CTA system. |
| Docs | https://docs.expo.dev/ | Technical docs shell, adaptive | Docs use a fixed header/sidebar, Inter body, JetBrains Mono code, theme selector, blue docs accents, and compact utility buttons. |
| Blog | https://expo.dev/blog | Editorial/product update list | Blog keeps the same public-shell navigation, typography, and neutral card language. |
| Product visuals | https://expo.dev/ | Device/mockup-led | The strongest brand signal is real product imagery: develop/deploy mockups, device screenshots, workflow cards, Insights charts, and SDK/product tiles. |

Expo is `both`, with light as the public default and a real adaptive dark family. The old imported `canonical-canvas: dark` is wrong for current marketing, but the existing `tokens.css` has already corrected this by treating Expo as light-canonical with documented dark surfaces.

## §2 Palette

Values were sampled from first-party Expo marketing, pricing, blog, and docs HTML on 2026-05-27 and round-tripped through `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0 0 0)` (= `#000000`). Live: primary marketing buttons use black or high-contrast monochrome.
- `--foreground`: `oklch(0.2046 0 0)` (= `#171717`). Live: primary text and surface-dark token.
- `--brand-dark-adaptive`: `oklch(0.2029 0.0037 228.9980)` (= `#151718`). Live: theme meta colour for dark preference and adaptive shell.
- `--brand-surface-dark-elevated`: `oklch(0.2178 0 0)` (= `#1a1a1a`). Live: dark product/card elevation.

### Docs / developer accents

- `--brand-text-link`: `oklch(0.5614 0.1859 255.1545)` (= `#0072DE`). Live: docs/logo illustration fills and link accent.
- `--brand-link-active`: `oklch(0.6201 0.1842 252.0327)` (= `#0587F0`). Live: brighter docs/action blue.
- `--brand-platform-blue`: `oklch(0.4831 0.0985 262.8099)` (= `#405D96`). Live: repeated public-shell accent and icon tone.
- `--brand-success-bright`: `oklch(0.7794 0.1655 157.2865)` (= `#3DD68C`). Live: success/positive status accent.
- `--brand-success`: `oklch(0.5637 0.1157 161.1170)` (= `#1e8a5f`). Live: docs green / completion accent.
- `--accent`: `oklch(0.9210 0.0810 83.5765)` (= `#FFE1A7`). Live: docs callout warning fill.

### Canvas + neutrals

- `--background`: `oklch(1 0 0)` (= `#ffffff`). Live: public page floor and docs light mode.
- `--card`: `oklch(1 0 0)` (= `#ffffff`). Live: card/panel fills.
- `--brand-canvas-soft`: `oklch(0.9851 0 0)`. Live: subtle section bands and soft controls.
- `--border`: `oklch(0.9560 0.0040 286.3239)`. Live: light hairlines.
- `--brand-hairline-strong`: `oklch(0.8996 0.0035 247.8621)`. Live: stronger panel boundaries.
- `--brand-body`: `oklch(0.5025 0.0136 264.4450)`. Live: neutral-cool secondary text.
- `--brand-docs-muted`: `oklch(0.4858 0.0155 251.6929)` (= `#596068`). Live: docs body/secondary text.
- `--brand-docs-muted-light`: `oklch(0.6097 0.0166 251.2472)` (= `#7C848D`). Live: docs tertiary labels.

### Product colour moments

- `--brand-info-soft`: `oklch(0.9532 0.0218 239.4275)` (= `#E3F2FD`). Live: docs/product blue-tinted fills.
- `--brand-code-blue-soft`: `oklch(0.8633 0.0682 243.3158)` (= `#acd8fc`). Live: docs code/link tint.
- `--brand-warning-bright`: `oklch(0.9622 0.0866 100.7662)` (= `#FFF5B1`). Live: warning/callout emphasis.
- `--brand-orange`: `oklch(0.6579 0.2229 33.6239)` (= `#FC471E`). Live: rare product/illustration accent.
- `--brand-red`: `oklch(0.6307 0.2549 23.6145)` (= `#FF0033`). Live: error/red illustration accent.
- `--brand-purple`: `oklch(0.5910 0.2319 283.6760)` (= `#745BFF`). Live: product/illustration accent.

### Drift vs `tokens.css`

- Imported prose/frontmatter said dark-canonical. Current `tokens.css` correctly says Expo is light-canonical with a documented dark-surface family, so no cascade is needed for this refresh.
- The token file already lifts blue/green/purple ink in dark mode to avoid the L=0.5 contrast pinch. Keep that policy; it matches current adaptive docs/marketing behavior.
- If a future preview wants to mirror docs more closely, add explicit aliases for `--brand-dark-adaptive`, `--brand-platform-blue`, `--brand-link-active`, `--brand-docs-muted`, and `--brand-info-soft`. Do not rename the existing core tokens just for prose parity.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Inter | 600-700 | 56-72px | 1.02-1.1 | -0.03em |
| Heading | Inter | 600 | 32-48px | 1.08-1.18 | -0.02em |
| Title | Inter | 500-600 | 18-24px | 1.25-1.4 | 0 |
| Body | Inter | 400 | 14-17px | 1.45-1.65 | 0 |
| Caption | Inter | 400-500 | 12-14px | 1.35-1.5 | 0 |
| Mono | JetBrains Mono | 400-500 | 12-14px | 1.45-1.65 | 0 |

Expo is a sans/mono system. The marketing site preloads Inter and JetBrains Mono, and docs explicitly route `code`, `pre`, and diff tables to JetBrains Mono. Avoid serif or decorative display type.

## §4 Component vocabulary

### public-shell-nav

**Status:** current
**Live source:** `https://expo.dev/` — top navigation
**Description:** Header with Expo wordmark, Docs/Product/Solutions/Enterprise/Pricing/Blog links, GitHub stars, login, and signup.
**States:** default, hover pill, active product menu, sticky mobile header, dark adaptive.

### monochrome-primary-cta

**Status:** current
**Live source:** `https://expo.dev/` and `https://expo.dev/pricing`
**Description:** High-contrast black button on light canvas or white button on dark canvas. The brand action register is monochrome.
**States:** default, hover, active scale, focus ring, disabled.

### quaternary-nav-pill

**Status:** current
**Live source:** `https://expo.dev/` — Product/Solutions/GitHub buttons
**Description:** Rounded neutral pill with subtle background, border, and chevron/icon. Used for menus and low-priority actions.
**States:** default, hover, menu open, active, disabled.

### github-stars-pill

**Status:** current
**Live source:** `https://expo.dev/` and `https://docs.expo.dev/`
**Description:** Compact GitHub callout with icon and star count. It is utility chrome, not a marketing hero element.
**States:** default, hover star, mobile icon-only, external link.

### hero-device-composite

**Status:** current
**Live source:** `https://expo.dev/` — homepage hero
**Description:** Product-first hero visual with device/deploy mockups, team avatars, and light/dark responsive media.
**States:** light poster, dark poster, loading poster, responsive crop.

### enterprise-avatar-link

**Status:** current
**Live source:** `https://expo.dev/` — Enterprise needs? Talk to our team
**Description:** Small avatar cluster plus sales link. It humanizes enterprise without turning into a testimonial block.
**States:** default, hover, compact, dark adaptive.

### develop-deploy-split

**Status:** current
**Live source:** `https://expo.dev/` — Develop / Deploy cards
**Description:** Two-column product split for writing native apps and shipping with Expo services. Use real product images.
**States:** default, hover image, stacked mobile, dark media.

### sdk-feature-card

**Status:** current
**Live source:** `https://expo.dev/` — Expo SDK section
**Description:** Card for SDK capabilities such as production-ready libraries, React/Kotlin/Swift, and Meta recommendation.
**States:** default, linked doc reference, media loaded, dark adaptive.

### framework-logo-row

**Status:** current
**Live source:** `https://expo.dev/` — React / Kotlin / Swift logos
**Description:** Small row of technology marks inside the SDK content area. Keep them support-level, not oversized.
**States:** neutral, linked, wrap.

### developer-experience-grid

**Status:** current
**Live source:** `https://expo.dev/` — Expo Go / Orbit / Atlas
**Description:** Product cards for on-device development, launching simulators, and inspecting bundles.
**States:** default, hover, linked product, mobile stack.

### community-stat-card

**Status:** current
**Live source:** `https://expo.dev/` — community section
**Description:** Numeric/community proof block for Discord members, React Native developer adoption, and projects created.
**States:** default, linked Discord/GitHub, compact.

### lifecycle-feature-band

**Status:** current
**Live source:** `https://expo.dev/` — device/distribution/update/workflows sections
**Description:** Sequential full-width bands explaining build, distribute, update, automate, and monitor workflows.
**States:** default, media-left/media-right, dark adaptive, anchored.

### workflow-run-card

**Status:** current
**Live source:** `https://expo.dev/` — Workflows example
**Description:** CI/CD run visualization with branch trigger, enabled/skipped rows, duration labels, and platform build steps.
**States:** running, skipped, succeeded, failed, selected branch.

### insights-chart-card

**Status:** current
**Live source:** `https://expo.dev/` — Insights section
**Description:** Monitoring card for user population, API/hosting requests, and error rates.
**States:** default, empty, loading, hover point, dark adaptive.

### platform-proof-grid

**Status:** current
**Live source:** `https://expo.dev/` — platform for every developer
**Description:** Trust/capability grid for scale, security/compliance, and top-ranking apps.
**States:** default, linked proof, image-loaded, compact.

### pricing-plan-card

**Status:** current
**Live source:** `https://expo.dev/pricing`
**Description:** Plan card for Free, Starter, Production, Enterprise with price, plan copy, included credits, CTA, and feature list.
**States:** default, popular, selected, enterprise sales, disabled.

### pricing-comparison-table

**Status:** current
**Live source:** `https://expo.dev/pricing`
**Description:** Dense comparison matrix with category groups such as General and Builds. Requires sticky/scannable table behavior.
**States:** compare tab, calculator tab, row group open, mobile stacked.

### pricing-calculator-tab

**Status:** current
**Live source:** `https://expo.dev/pricing`
**Description:** Secondary pricing view for usage calculation. Use tabs, not a separate marketing card.
**States:** compare active, calculator active, disabled while loading.

### mcp-feature-row

**Status:** current
**Live source:** `https://expo.dev/pricing` — Expo MCP Server row
**Description:** Feature-row entry showing agent/developer capability availability across plans.
**States:** unavailable dash, available, plan-specific note.

### docs-header

**Status:** current
**Live source:** `https://docs.expo.dev/`
**Description:** Docs header with Expo mark, Docs label, Blog/Changelog/GitHub actions, theme selector, and search/product chrome.
**States:** light, dark, auto theme, mobile, sticky.

### docs-sidebar

**Status:** current
**Live source:** `https://docs.expo.dev/`
**Description:** Fixed documentation navigation with grouped sections and active-page state.
**States:** active item, expanded group, collapsed group, mobile drawer.

### docs-search

**Status:** current
**Live source:** `https://docs.expo.dev/`
**Description:** Search affordance within the docs shell. It should be compact and keyboard-friendly.
**States:** idle, focused, loading results, no results.

### theme-selector-combobox

**Status:** current
**Live source:** `https://docs.expo.dev/`
**Description:** Rounded combobox for Auto/light/dark theme selection. Use icon plus label and chevron.
**States:** auto, light, dark, open, keyboard focused.

### docs-callout

**Status:** current
**Live source:** `https://docs.expo.dev/`
**Description:** Informational/warning callout with blue or amber-tinted background and clear icon/text pairing.
**States:** info, warning, success, error.

### code-block

**Status:** current
**Live source:** `https://docs.expo.dev/`
**Description:** JetBrains Mono code/pre surface, often with copy affordance and dark/light theme support.
**States:** default, copied, focused line, diff table.

### blog-list-card

**Status:** current
**Live source:** `https://expo.dev/blog`
**Description:** Update/article card with title, metadata, and public-shell styling. Keep density moderate.
**States:** default, hover, featured, external/author links.

### footer-newsletter

**Status:** current
**Live source:** `https://expo.dev/` — footer newsletter
**Description:** Footer subscription panel paired with product/resource/company/legal link columns and system status.
**States:** empty, valid, invalid, submitted.

### status-link

**Status:** current
**Live source:** `https://expo.dev/` — footer status
**Description:** Small operational-status link, typically "All Systems Operational". Keep it utilitarian.
**States:** operational, degraded, incident, external.

### tweet-proof-strip

**Status:** current
**Live source:** `https://expo.dev/` — social proof quotes
**Description:** Scrolling or stacked community proof quotes from developers. It should feel like developer social proof, not a carousel gimmick.
**States:** default, paused, linked profile, reduced motion.

### expo-mark-button

**Status:** current
**Live source:** `https://expo.dev/` and docs header
**Description:** Wordmark or compact Expo mark button that routes home. Use currentColor so it adapts across light/dark.
**States:** default, hover, mobile icon-only, dark adaptive.

## §5 Composition rules

- Lead with product capability and lifecycle language: build, submit, host, update, monitor, automate.
- Use black/white monochrome for primary actions. Blue is for docs/API links, illustrations, and technical states.
- Let product screenshots and device mockups do the visual work. Avoid abstract developer illustrations when real Expo UI is available.
- Keep cards tight, rounded, and neutral. Expo reads as infrastructure craft, not a colourful startup palette.
- Use adaptive dark only where the surface supports it: docs, product media, code, and dark preference. Light is still the public default.
- Dense pricing tables need scannable row groups and sticky mental models; do not turn them into oversized marketing cards.

## §6 Accessibility notes

- Black-on-white and white-on-dark primary actions clear AA comfortably.
- The standard blue `#0072DE` is appropriate for links and icon fills; stronger/hover blues should be checked against white and dark backgrounds separately.
- Docs muted grays around `#596068` / `#7C848D` should be reserved by size: darker stop for body-secondary, lighter stop for tertiary labels.
- The token file's dark-mode lift for blue/green/purple ink should be preserved; the live brand uses adaptive themes, so same-L values cannot be assumed contrast-safe.
