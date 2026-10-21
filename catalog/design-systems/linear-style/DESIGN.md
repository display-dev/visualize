---
slug: linear-style
name: Linear
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://linear.app/
  - https://linear.app/homepage
  - https://linear.app/method
  - https://linear.app/features
  - https://linear.app/pricing
  - https://linear.app/customers
  - https://linear.app/now
  - https://linear.app/changelog
canonical-canvas: dark
selection:
  mood: [minimal, productivity]
  tone: [confident, polished]
  formality: medium
  density: high
  canonical_canvas: dark
  best_for: |
    Use for information-dense artifacts that need a confident, polished register with minimal, productivity visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# Linear

Linear is a product-development system for software teams — issue tracking, projects, cycles, roadmaps, and (as of the current marketing push) "teams and agents." The marketing site, the editorial pieces under `/method`, the changelog, and the login surface all open with the same dark canvas. Every page sampled for this audit carries `data-theme="dark"` on the `<html>` element. There is no documented light variant in the live marketing chrome, and the only place a light surface appears is inside product screenshots showing a specific app theme — not the marketing canvas itself.

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | `https://linear.app/` | Near-black `#010102` (`--color-bg-marketing`) | `<html data-theme="dark">`. Hero is rendered as a stack of text + autoplaying product mockups. The page-scoped canvas is the deepest black in the stack. |
| Product overview | `https://linear.app/homepage` | Same `#010102` marketing canvas | Identical chrome to `/`; just a renamed entry-point with the same `data-theme="dark"`. |
| Editorial method | `https://linear.app/method` | Same dark canvas, but preloads `Tiempos Headline` | Long-form prose with chapter-numbered sections (1.1, 2.1–2.4, 3.1–3.6). Same `data-theme="dark"`; serif display family is editorial-only. |
| Features index | `https://linear.app/features` | Same `#010102` | Modular sections with embedded product surfaces (issue list, planning, AI agents, mobile, customer requests, security). |
| Pricing | `https://linear.app/pricing` | Same `#010102` | Four-tier table — Free, Basic, Business, Enterprise. No tier highlight, no billing toggle. |
| Customers / Now / Changelog | `/customers`, `/now`, `/changelog` | Same `#010102` | All `data-theme="dark"`. Changelog uses a vertical timeline with a single red `--color-red` `#eb5757` indicator on the most recent entry. |

The canonical-canvas decision is unambiguous: **dark**. Every shipped Linear surface in the live audit opens on the same near-black marketing canvas. There is a `[data-theme="light"]` token block in the CSS bundle (each `--color-*` token is defined for both modes), but it isn't wired to any page that ships from the marketing tree. The app dark/light is gated behind login and unreachable in this audit.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a live citation. Hex values are sampled directly from the Next.js CSS bundle at `static.linear.app/web/_next/static/css/`; OKLCH conversions use the vendored culori at `visualize/scripts/vendor/culori.mjs`.

### Brand primary

Linear's brand primary is a saturated indigo. Two variants ship in the bundle — the deeper `#5e6ad2` for dark surfaces (CTA fills, focus rings, the brand-mark glyph background), and the brighter `#7070ff` for the light variant exposed only via the in-app theme. The dark variant is the one that actually appears on every marketing page.

- `--primary`: `oklch(0.5674 0.1585 275.2058)` (= `#5e6ad2`). Live: `https://linear.app/` — `--color-brand-bg` on dark variant; appears as the CTA fill on "Get started" and as the wordmark-adjacent accent.
- `--brand-primary-light` (in-app only): `oklch(0.6218 0.2071 278.5194)` (= `#7070ff`). Live: in-bundle CSS under `[data-theme="light"]` rule — not exposed on the marketing tree but defined in the cascade.
- `--brand-primary-hover`: `oklch(0.6906 0.1637 276.2389)` (= `#828fff`). Live: `--color-accent-hover` on the dark variant. The hover lift carries +13 lightness from the base indigo.
- `--brand-primary-tint`: `oklch(0.6694 0.2036 298.2596)` (= `#a771ff`). Live: gradient stop in the hero CTA; the indigo→violet drift that animates on the "Issue tracking is dead →" pulse link.

### Documented secondary brand colours

Linear ships a small palette of named hue tokens. Each has a single semantic role inside the marketing chrome.

- `--brand-accent-cyan`: `oklch(0.7302 0.1574 239.1128)` (= `#21b3ff`). Live: `--bar-color`; the audio scrubber on the "Weekly Pulse" mockup uses this as the progress bar.
- `--brand-accent-blue`: `oklch(0.7121 0.1510 249.8833)` (= `#4ea7fc`). Live: `--color-blue`; status chip background on `In Progress` labels and the AI workflow callouts.
- `--brand-accent-orange`: `oklch(0.7190 0.1758 42.0541)` (= `#fc7840`). Live: `--color-orange`; assigned to the "Bug" label pill in the issue-card mockup.
- `--brand-accent-yellow`: `oklch(0.8247 0.1685 89.9628)` (= `#f0bf00`). Live: `--color-yellow`; the `Build` workflow chip and the "Pending" status indicator.
- `--brand-accent-build`: `oklch(0.7716 0.1313 90.9836)` (= `#d4b144`). Live: `--color-linear-build`; specifically the Linear "Build" workflow stage colour, distinct from the more saturated `--color-yellow`.
- `--brand-accent-plan`: `oklch(0.6951 0.1809 145.6213)` (= `#3fb950`). Live: `--color-linear-plan`; the green that appears on "On track" project status chips and the "Plan" workflow stage.
- `--brand-accent-secure`: `oklch(0.6100 0.0699 279.2986)` (= `#7a7fad`). Live: `--color-linear-security`; muted indigo for security/auth section illustration.
- `--brand-accent-teal`: `oklch(0.7161 0.1233 208.5003)` (= `#00b8cc`). Live: `--color-teal`; less prevalent — appears in some labels but not as a system-wide signal colour.

### Canvas + neutrals

The marketing canvas runs through five lightness steps from near-black to mid-grey. Each step is sampled from the live `--color-bg-*` and `--color-line-*` tokens in the dark variant.

- `--background`: `oklch(0.0692 0.0080 284.1148)` (= `#010102`). Live: `--color-bg-marketing`; the page-scoped dark canvas that everything else floats on. Slightly cool, near-zero chroma.
- `--foreground`: `oklch(0.9784 0.0011 197.1406)` (= `#f7f8f8`). Live: `--color-text-primary` on dark; the headline white. Linear uses a barely-warm off-white, not a neutral white.
- `--card`: `oklch(0.1723 0.0026 247.9805)` (= `#0f1011`). Live: `--color-bg-panel`; the elevated surface used for product-mockup cards in the hero.
- `--card-foreground`: matches `--foreground` `#f7f8f8`.
- `--popover`: `oklch(0.1950 0.0026 247.9581)` (= `#141516`). Live: `--color-bg-tint`; the popover/menu surface, slightly lifted from `--card`.
- `--popover-foreground`: `#f7f8f8`, same as `--foreground`.
- `--muted`: `oklch(0.2785 0.0073 285.9173)` (= `#28282c`). Live: `--color-bg-quaternary`; the quietest interactive surface, used for input fields and inactive chips.
- `--muted-foreground`: `oklch(0.6488 0.0146 262.3594)` (= `#8a8f98`). Live: `--color-text-tertiary` on dark; the secondary-text colour for metadata, timestamps, labels.
- `--accent`: `oklch(0.2574 0.0056 286.0022)` (= `#232326`). Live: `--color-bg-tertiary`; hover-state surface for menu items and link cards.
- `--accent-foreground`: `#f7f8f8`.
- `--secondary`: `oklch(0.2277 0.0057 285.9349)` (= `#1c1c1f`). Live: `--color-bg-secondary`; the secondary surface ladder step between `--card` and `--accent`.
- `--secondary-foreground`: `#f7f8f8`.
- `--destructive`: `oklch(0.6534 0.1835 23.6794)` (= `#eb5757`). Live: `--color-red`; destructive actions, error states, the changelog "new entry" indicator.
- `--destructive-foreground`: `oklch(1 0 0)` (= `#ffffff`). Live: text on the destructive surface — always pure white.
- `--border`: `oklch(0.2645 0.0098 268.3063)` (= `#23252a`). Live: `--color-border-primary` on dark; the standard 1px hairline divider between sections, table rows, card edges.
- `--input`: matches `--border` `#23252a`. Form-field borders are the same weight as section dividers.
- `--ring`: matches `--primary` `#5e6ad2`. Focus rings use the brand indigo at full chroma.

### Polarity-locked surfaces

Linear ships no documented polarity-locked surface on the marketing tree (no light callout band, no inverted block — the whole canvas is dark). The product UI screenshots embedded in mockups *do* show a light-canvas product theme, but they're framed as illustrative imagery inside a dark card, not as polarity-locked tokens.

- `--brand-surface-1`: `oklch(0.1723 0.0026 247.9805)` (= `#0f1011`). Live: `--color-bg-panel`. The card surface ladder step 1.
- `--brand-surface-2`: `oklch(0.1950 0.0026 247.9581)` (= `#141516`). Live: `--color-bg-tint`. Ladder step 2.
- `--brand-surface-3`: `oklch(0.2277 0.0057 285.9349)` (= `#1c1c1f`). Live: `--color-bg-secondary`. Ladder step 3.
- `--brand-surface-4`: `oklch(0.2574 0.0056 286.0022)` (= `#232326`). Live: `--color-bg-tertiary`. Ladder step 4.
- `--brand-on-dark`: `oklch(0.9784 0.0011 197.1406)` (= `#f7f8f8`). The Linear off-white that sits on every dark surface as headline text.

### Hairlines / dividers

Linear's 1px lines lean cool and barely-chromatic — they're meant to be felt, not seen.

- `--brand-hairline-soft`: `oklch(0.2645 0.0098 268.3063)` (= `#23252a`). Live: `--color-border-primary`; the standard divider weight (used between issue rows, table rows, footer columns).
- `--brand-hairline-strong`: `oklch(0.3274 0.0105 285.8054)` (= `#34343a`). Live: `--color-border-secondary`; the heavier divider used on the topnav underside and on card outlines that need to read as an edge in low light.
- `--brand-hairline-tertiary`: `oklch(0.3661 0.0102 285.8850)` (= `#3e3e44`). Live: `--color-border-tertiary`; used inside the issue-card mockup for sub-row hairlines.

The `--border-hairline` width variable is `1px` on standard displays and `0.5px` on `min-resolution: 192dpi` screens — Linear renders hairlines at sub-pixel weight on retina to keep them as quiet as possible.

### Body and ink

- `--brand-body`: `#f7f8f8`. Live: body text on dark.
- `--brand-body-muted`: `oklch(0.6488 0.0146 262.3594)` (= `#8a8f98`). Live: `--color-text-tertiary`; the secondary muted body colour for paragraph copy that isn't the lead.
- `--brand-ink-strong`: `#f7f8f8`. Headline weight.
- `--brand-ink-mute`: `oklch(0.8744 0.0152 260.7285)` (= `#d0d6e0`). Live: `--color-text-secondary` on dark; the highest-contrast secondary text (used for one-line subtitles directly under headlines).
- `--brand-ink-subtle`: `oklch(0.6488 0.0146 262.3594)` (= `#8a8f98`). Live: `--color-text-tertiary`. Same value as `--brand-body-muted`; Linear uses the same step for paragraph copy and for caption text.
- `--brand-ink-tertiary` (= the original live value): `oklch(0.5092 0.0121 261.7676)` (= `#62666d`). Live: `--color-text-quaternary` on dark; the lowest-contrast text Linear ships, used for inline timestamps and `–` separators between metadata fields. This sits at ~3.16:1 against `#0f1011` — sub-AA. Linear ships it anyway. **See Drift below.**

### Drift vs `tokens.css`

These are the substantive divergences between the current `visualize/design-systems/linear-style/tokens.css` and the live brand. Some are minor labelling drift; one is a contrast-engineering retune that ought to be reverted.

1. **`--brand-ink-tertiary` is a contrast-engineering retune.** `tokens.css` line 96–99 carries an inline comment `lifted from 0.5092 → 0.6500 for ≥4.5:1 on Linear's #010102 / #0f1011 / #121427 dark canvases (the upstream value #62666d lands at 3.16–3.86)`. This is exactly the synthesis anti-pattern that `AUTHORING.md` calls out — a chromatic identity token darkened/lightened to win contrast. Linear themselves ship `#62666d` (`oklch(0.5092)`) as `--color-text-quaternary` and accept the sub-AA reading for inline timestamps; the brand is choosing quiet over compliant. **Reconciliation:** revert `--brand-ink-tertiary` to `oklch(0.5092 0.0121 261.7676)` and route the consuming preview surfaces to `--brand-ink-subtle` (`#8a8f98`, AA-passing) when they actually need readable body text. The single legitimate consumer of the `#62666d` step is decorative timestamp metadata.

2. **`--brand-surface-1` is one step lifted from the live primary panel.** `tokens.css` `--brand-surface-1: oklch(0.1723)` = `#0f1011`. Linear's `--color-bg-panel` is `#0f1011`, but `--color-bg-primary` on dark is `#08090a` (`oklch(0.1390 0.0029 246.2561)`) — the literal page canvas behind the marketing-canvas wash. **Reconciliation:** either insert an explicit `--brand-canvas-deep: oklch(0.1390 0.0029 246.2561)` for the primary-bg surface ladder step, or accept `--brand-surface-1` = `#0f1011` as "first card above the marketing void" and document that the surface ladder starts at the elevated panel, not at the page-body bg.

3. **Font family tokens are aliased to internal names that don't exist on the public site.** `tokens.css` declares `--font-sans: Linear Text`, `--font-mono: Linear Mono`, `--font-display: Linear Display`. The live site loads `InterVariable.woff2` as `Inter Variable`, `Berkeley-Mono-Variable.woff2` as `Berkeley Mono`, and (on `/method` only) `tiempos-headline-regular.woff2` as `Tiempos Headline`. The "Linear Text / Linear Mono" aliases are not present in any `@font-face` rule on the marketing-tree CSS bundle. **Reconciliation:** rename to `--font-sans: "Inter Variable"`, `--font-mono: "Berkeley Mono"`, and either drop `--font-display` (the marketing site has no display family) or set it to `"Tiempos Headline"` for editorial-only use. Keep a complete fallback stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif` for sans; `ui-monospace, SF Mono, Menlo, monospace` for mono).

4. **Both dark blocks in `tokens.css` are bit-identical to `:root`.** This is correct — Linear is dark-canonical and the upstream catalog noted this in the header comment. No reconciliation needed; leaving the mirror in place is the documented choice.

5. **`--destructive` is `oklch(0.5308 0.2178 29.2339)` in tokens.css vs the live `oklch(0.6534 0.1835 23.6794)` (`#eb5757`).** The tokens.css value is darker and more saturated than the live `--color-red`. **Reconciliation:** swap to the live value.

6. **`--ring` and `--sidebar-ring` track `--primary` correctly.** Per the primary-family asymmetry rule in `AUTHORING.md`, the four primary-family tokens should track together — `tokens.css` keeps them aligned. No change needed.

7. **The chart palette is a synthesised lightness ladder of the indigo.** `tokens.css` chart-1 through chart-5 step `0.81 → 0.42` lightness while holding the brand chroma + hue constant. This is the "tints of brand" pattern. Linear doesn't ship a documented charting palette on the marketing tree, so the synthesis isn't visibly wrong — but it should be flagged as synthesised. **Reconciliation:** add a comment in `tokens.css` noting that chart-1..5 are synthesised, since Linear's own charts (visible in product screenshots inside dashboards) use multi-hue palettes rather than a monohue ladder.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (hero) | Inter Variable | 510 (medium) | clamp from ~3.5rem to ~5rem | ~1.05 | -0.022em |
| Heading | Inter Variable | 510–590 (medium–semibold) | 2rem–2.75rem | ~1.10 | -0.015em |
| Section title | Inter Variable | 510 | 1.5rem | ~1.20 | -0.013em |
| Body large | Inter Variable | 400 | 1.0625rem | 1.6 | 0em |
| Body | Inter Variable | 400 | 0.9375rem | 1.6 | -0.011em |
| Body small | Inter Variable | 400 | 0.875rem | calc(21/14) ≈ 1.5 | -0.013em |
| Caption (mini) | Inter Variable | 400 | 0.8125rem | 1.5 | -0.01em |
| Caption (micro) | Inter Variable | 400 | 0.75rem | 1.4 | 0em |
| Tiny | Inter Variable | 400 | 0.625rem | 1.5 | -0.015em |
| Editorial display | Tiempos Headline | regular (400) | 2.5rem+ | 1.15 | -0.01em |
| Mono / code | Berkeley Mono | 400 | inherits parent | 1.5 | 0em |

Notes on observed type behaviour:

- The `Inter Variable` `@font-face` is loaded with `font-weight: 100 900` and `font-display: swap`. The site uses a custom-weight ramp — `--font-weight-normal: 400`, `--font-weight-medium: 510`, `--font-weight-semibold: 590`, `--font-weight-bold: 680`. The semibold at 590 (instead of the conventional 600) is a Linear signature — slightly lighter than the default, which gives headlines a calmer presence.
- `font-feature-settings: "cv01", "ss03"` is applied via `--font-settings`. `cv01` swaps Inter's default `a` for the single-storey variant (the more handwritten-feeling shape); `ss03` is Inter's stylistic set that opens up the spacing between characters in numerals and certain letterforms. This is the typographic detail that makes Linear's text feel different from a vanilla Inter deployment.
- `font-variation-settings: "opsz" auto` — Linear lets Inter's optical-size axis auto-adjust, so headline glyphs render with their display-optimised contours and body glyphs render with their reading-optimised contours.
- `Tiempos Headline` is preloaded specifically on `/method` and on chapter pages under `/method/*`. It's not loaded on the homepage, pricing, customers, features, changelog, or now — so the serif is genuinely editorial-only.
- `Berkeley Mono` is the variable-axis mono used for code blocks, terminal mockups, the diff illustration in the hero, and any inline code (`<code>`). The fallback chain is `"Berkeley Mono", "Fira Code", "Jetbrains Mono", monospace`.

## §4 Component vocabulary

### Brand wordmark

**Status:** `current`
**Live source:** `https://linear.app/` — `header svg` (Linear wordmark glyph + "Linear" letters)
**Description:** A geometric four-line ramp followed by the word "Linear" in Inter Variable medium. The glyph and the word are flush left, vertically centred, and the glyph is roughly the cap-height of the wordmark. In the topnav the entire mark is rendered in `--foreground` `#f7f8f8` — no chromatic fill. On hover the brand glyph fades to ~80% opacity. The wordmark never uses `--primary` `#5e6ad2` as its own fill; it's monochrome white-on-dark.
**States:** Default at `#f7f8f8`. Hover at ~80% opacity. Visited / focus identical to default.

### Primary button — filled indigo

**Status:** `current`
**Live source:** `https://linear.app/` — the "Get started" / "Open app" pill in the topnav and footer.
**Description:** Pill-shaped (`border-radius: 9999px`) button. Background `--color-brand-bg` `#5e6ad2`, text `--color-brand-text` `#fff` at `--font-weight-medium` (510). Height around 32px on the topnav and 40px on hero CTAs. Padding `0 16px` for the standard size and `0 20px` for the large hero size. Letter-spacing `-0.013em`. No internal icon by default; some variants prepend a small chevron-right glyph at 12–16px stroke.
**States:** Default `#5e6ad2`. Hover lift to `--color-accent-hover` `#828fff` (and on the light variant `#8989f0`). Pressed adds a soft inset shadow `0 1px 3px 0 rgba(0,0,0,0.25)`. Focus-visible adds a 2px `--color-brand-bg` ring with a 2px gap (`outline: 1px solid var(--ring); outline-offset: 2px`). Disabled drops to 50% opacity.

### Secondary button — invert ghost

**Status:** `current`
**Live source:** `https://linear.app/` — the "Contact sales" pill in the hero secondary slot.
**Description:** Same pill shape as the primary, but with `--color-button-invert-bg` `#282a30` on dark (and `#e5e5e6` on light, when that variant ships in-app). Text inherits `--color-text-primary` `#f7f8f8`. Border-radius `9999px`.
**States:** Default `#282a30`. Hover lift to `--color-button-invert-bg-hover` `#1f2024` (slightly darker on dark — the opposite of the primary lift). Pressed inset shadow as primary. Focus-visible adds the same indigo ring.

### Tertiary button — text link with arrow

**Status:** `current`
**Live source:** `https://linear.app/` — the "Issue tracking is dead →" pulse link directly under the hero headline; also "linear.app/next →".
**Description:** Inline text-style CTA with a trailing `→` arrow. No background fill, no border. Text colour is `--color-link-primary` `#7070ff` on dark with a pulsing dot prefix on the marquee variant. The pulse dot is rendered as a 6px circle filled with `#5e6ad2` and animated with a 1.2-second blink (`--blink-duration: 1.2s; --blink-timing: step-end`).
**States:** Default `#7070ff`. Hover shifts to `--color-link-hover` `#fff` and the arrow translates +2px right with a 0.1s ease-out. The dot animation runs continuously regardless of hover state.

### Topnav

**Status:** `current`
**Live source:** `https://linear.app/` — `header.Header_container__*`
**Description:** Sticky 72px-tall bar pinned to the top of the viewport. Carries `--header-blur: 20px` so it renders as a frosted backdrop over scrolling content. Left side: wordmark + product/resources dropdown triggers. Right side: customer, pricing, contact, docs links; then "Log in" text link and "Sign up" pill (the Primary button — filled indigo). Internal padding `--header-height: 72px`. The frosted glass uses `--anchor-glass-bg: rgba(255,255,255,0.08)` on dark.
**States:** Each link is `--color-text-tertiary` `#8a8f98` at rest, `--color-text-primary` `#f7f8f8` on hover with a 0.1s ease transition. Dropdown triggers open with `enterFromLeft` / `enterFromRight` keyframes — the dropdown panel slides in from the trigger's anchor side.

### Topnav dropdown panel

**Status:** `current`
**Live source:** `https://linear.app/` — `.Header_content__*` (Product / Resources dropdowns)
**Description:** Dark panel with `--color-bg-panel` `#0f1011` background, `--color-border-secondary` `#34343a` hairline, `border-radius: 12px`. Internal grid of link rows; each row has an icon (16px Lucide-style line glyph) on the left, link title (medium 510, 0.9375rem) and one-line description (regular 400, 0.8125rem, `--color-text-tertiary`) stacked. Row hover surfaces `--color-bg-tertiary` `#232326` as the fill.

### Hero composition

**Status:** `current`
**Live source:** `https://linear.app/` — `.Hero_container__inGFW`
**Description:** Two-column layout on desktop. Left column: pre-headline pulse link, display headline (clamp 3.5–5rem, medium 510, off-white), one-line subtitle (large body 1.0625rem, mute `#d0d6e0`), and two CTAs (primary + tertiary text link). Right column: a multi-card autoplaying product mockup. On mobile the columns stack and the mockup shrinks to one card width. The hero is enclosed in `--homepage-outer-padding: 46px` (10px on screens under 1280px, 28px on tablets, 16px on phones).

### Product-mockup card

**Status:** `current`
**Live source:** `https://linear.app/` — the issue card showing "ENG-2703 Faster app launch" with activity feed
**Description:** Elevated dark card with `--color-bg-panel` `#0f1011` fill, `--color-border-primary` `#23252a` 1px hairline, `border-radius: 12px`. Top section: issue identifier in mono, status pill, priority indicator. Middle: title in medium weight. Bottom: assignee avatar group, label pills, cycle chip. Inside the card the typography drops to body-small (0.875rem) to compress information density.
**States:** The card is presentational on the marketing site (not interactive); inside the actual product it would have hover, selected, focused states.

### Status chip

**Status:** `current`
**Live source:** `https://linear.app/` — visible inside the product mockups as `In Progress`, `Todo`, `Done`, `Backlog`, `At risk`, `On track`
**Description:** Inline pill with a dot prefix (~6px) and a one-word or two-word label. Padding `0 8px`, height 20px, `border-radius: 9999px`, font-size 0.75rem. The dot colour encodes the status — `--color-linear-build` `#d4b144` (yellow, "Backlog"), `--color-linear-plan` `#3fb950` (green, "On track"), `--color-blue` `#4ea7fc` ("In Progress"), `--color-red` `#eb5757` ("At risk"). The pill background is `--color-bg-quaternary` `#28282c` regardless of status; only the dot carries the chroma.

### Priority indicator

**Status:** `current`
**Live source:** `https://linear.app/` — issue cards in the hero (`Priority: High`)
**Description:** A small icon (12px) representing the priority level — three-bar ladder for Low / Medium / High, an exclamation triangle for Urgent, a horizontal dash for "No priority." The colour follows status semantics: Urgent uses `--color-red`, High uses `--color-orange` `#fc7840`, Medium uses `--color-yellow` `#f0bf00`, Low uses `--color-text-tertiary` `#8a8f98`.
**States:** Static icon; the symbol itself encodes the level.

### Label pill

**Status:** `current`
**Live source:** `https://linear.app/` — `Performance`, `iOS`, `Bug`, `Design`, `AI`, `API`, `Thread`, `internal` (all visible on issue mockups)
**Description:** Outlined pill, height 20px, padding `0 6px`, `border-radius: 4px` (slightly rounded — not fully pill), font-size 0.75rem, font-weight 510. Border 1px in a hue-coordinated stroke; text colour matches the border. The fill is transparent against the card background. Linear ships a documented palette of label hues — orange (`Bug`), violet (`Design`), blue (`Performance`), teal (`API`), green (`internal`), purple (`AI`).

### Avatar

**Status:** `current`
**Live source:** `https://linear.app/` — the "karri", "romain", "julian" avatars in the Pulse mockup; the assignee stack on issue cards
**Description:** Circular avatar at 16px, 20px, or 24px depending on context. When a photo is loaded the source image is round-cropped; when no photo, the initial of the user's name renders in `--font-weight-medium` over a `--color-bg-tertiary` `#232326` fill. Avatar groups stack with `-6px` overlap and a `--color-bg-marketing` `#010102` 2px outer ring so each avatar reads as separate.
**States:** Default. Online presence ring (a 2px `--brand-accent-plan` green ring) appears on logged-in users.

### Code diff block

**Status:** `current`
**Live source:** `https://linear.app/` — `.DiffsIllustration_codeColumnMobile__*` — the React Native `HomeScreen.tsx` `SyncStatus` enum refactor
**Description:** Two-column diff card. Left column: `original-gutter` + `original-code` grid columns. Right column: `modified-gutter` + `modified-code`. Gutter is `--color-text-tertiary` `#8a8f98` 0.75rem mono numerals. Lines added carry an `outline-color: #3fb950` (green) dotted 1.5px outline at the line level; lines removed carry `outline-color: #f85149` (red). Background is `--color-bg-panel` `#0f1011`. The card has `border-radius: 12px` and a `border: 1px solid --color-border-primary` `#23252a`.
**States:** `[data-refactor-active=true]` is the active-row state for animated diff playback — adds the dotted outline; otherwise the line renders without outline.

### Pulse player mockup

**Status:** `current`
**Live source:** `https://linear.app/` — the "Weekly Pulse for May 25" card
**Description:** Two-section card. Top section: a "Listen 1.0×" pill (left), the title "Weekly Pulse for May 25" (centre-left), and a scrubber progress bar. The progress bar uses `--bar-color: #21b3ff` (cyan) over `--color-bg-tertiary` `#232326` track. Bottom section: a project update feed — "UI refresh / At risk / By romain · 1 day ago" with risk indicator chip; "Localization / On track / By julian · 3 hours ago" with the green check chip. Card surface `--color-bg-panel` `#0f1011`, 12px radius, 1px hairline.

### Conversation thread card

**Status:** `current`
**Live source:** `https://linear.app/` — the Slack-style thread referenced by `class="SlackIssue_slackBoxContainer__*"`
**Description:** Vertical thread with each message rendered as: avatar (left, 20px) + username (medium weight, body-small) + timestamp (`#62666d`, 0.75rem) + message body (regular, body-small). Linear's thread mockup mixes user replies with an inline assistant ("@Codex can you take a stab at this?" → "On it! I've received your request.") and renders code blocks in Berkeley Mono inside indented sub-blocks.

### Footer columns

**Status:** `current`
**Live source:** `https://linear.app/` — six-column grid: Product, Features, Company, Resources, Connect, Legal
**Description:** Each column has an h3 header in `--font-weight-medium` 0.875rem `--foreground`, then a vertical stack of links in 0.875rem regular `--color-text-tertiary` `#8a8f98`. Column spacing is generous — column-gap roughly 64px on desktop. The footer ends with a thin `--brand-hairline-soft` `#23252a` divider above a row of legal links (Privacy, Terms, DPA) sized at 0.75rem.
**States:** Each link transitions colour from `#8a8f98` → `#f7f8f8` on hover over 0.1s.

### Wordmark + tagline footer block

**Status:** `current`
**Live source:** `https://linear.app/` — left side of the footer
**Description:** Linear's geometric glyph (the four ascending lines) at ~32px, paired with the wordmark below it, then a one-line tagline ("The product development system for software teams"). All in `--brand-on-dark` `#f7f8f8`.

### Pricing tier card

**Status:** `current`
**Live source:** `https://linear.app/pricing` — `.PricingCard_*` (four cards side-by-side: Free / Basic / Business / Enterprise)
**Description:** Each tier is a vertical card on `--color-bg-panel` `#0f1011`, `border-radius: 12px`, `--color-border-primary` `#23252a` 1px hairline. Top: tier name in medium 1rem `--foreground`. Below: price (display-size, medium weight — `$0`, `$10`, `$16`, or "Custom") with a tiny "per user / month, billed yearly" caption underneath in `--color-text-tertiary`. Middle: a single CTA button — "Get started" for Free/Basic/Business; "Contact sales" for Enterprise. Bottom: a feature-list. No tier is visually highlighted as recommended; none have a "Featured" badge.
**States:** Static.

### Pricing feature row

**Status:** `current`
**Live source:** `https://linear.app/pricing` — the per-row feature breakdown
**Description:** Each feature is a row beneath the CTA with a 12px Lucide-style check icon (`#3fb950` for included, hidden / blank for excluded) and a one-line feature label. Categories include: Members, File upload, Issues, Teams, Core features, Triage, Releases, AI workflows, Integrations, Team management, Analytics, Security, Support. The row colour is `--color-text-secondary` `#d0d6e0` for the label and `--color-text-tertiary` for any supplementary metadata.

### Featured-link card

**Status:** `current`
**Live source:** `https://linear.app/` — the "Customer stories →" link block and the "Built for purpose / Powered by AI agents / Designed for speed" three-pillar block
**Description:** Pillar cards laid out in a 3-column grid. Each card carries an eyebrow label (small uppercase or sentence-case, `--color-text-tertiary`), a one-line headline (medium 1.25rem), and a one-paragraph body (regular 0.9375rem `--color-text-secondary`). No outer border; each card is delimited only by the column gap, with a hairline divider between columns on small screens.

### Customer testimonial card

**Status:** `current`
**Live source:** `https://linear.app/` — the "Our speed is intense and Linear helps us be action biased." quote with "Gabriel Peal, OpenAI" attribution; the "Nik Koblov, Head of Engineering, Ramp" quote
**Description:** Inline quote (regular body, italic-leaning slight letter-spacing) with attribution below — name in medium weight, title/company in `--color-text-tertiary`. Small monogram or company-wordmark glyph to the left. No box, no border — just typography on the dark canvas.

### Section eyebrow

**Status:** `current`
**Live source:** `https://linear.app/` — labels like "Built for purpose", "Powered by AI agents", "Designed for speed", "Core Performance"
**Description:** Small uppercase or title-case label sitting directly above a section heading. Rendered in `--color-text-tertiary` `#8a8f98` at 0.75rem medium 510 with `letter-spacing: 0`. There's no decorative ornament; the label simply spaces 16px above the heading.

### Changelog timeline entry

**Status:** `current`
**Live source:** `https://linear.app/changelog` — `.Changelog_changelogIndicator__*`
**Description:** Vertical timeline. Each entry is a row with a left-side vertical line (`--brand-hairline-soft`) and a dot anchor. The first/newest entry's dot fills with `--color-red` `#eb5757` (the "new" indicator); older entries use `--color-text-tertiary` `#8a8f98`. Each entry has a date heading, a release title, and a body paragraph in regular body weight.
**States:** First entry has the red dot; subsequent entries are muted.

### Editorial chapter heading (`/method` only)

**Status:** `current`
**Live source:** `https://linear.app/method` — chapter numbers `1.1`, `2.1–2.4`, `3.1–3.6` paired with chapter titles
**Description:** Chapter number rendered in `Inter Variable` mono-leaning (using `cv01` `ss03` features) `--color-text-tertiary` 0.875rem, then a chapter title in `Tiempos Headline` serif at 2rem+, then a body paragraph in `Inter Variable` body. The chapter number sits as an eyebrow above the serif headline.

### Editorial pull-quote (`/method` only)

**Status:** `current`
**Live source:** `https://linear.app/method` — long-form prose has occasional pulled-out lines (`There is a lost art of building true quality software`)
**Description:** Large-format display line in `Tiempos Headline` at roughly 1.5–2× the body size, italicised, sitting in `--brand-ink-mute` `#d0d6e0` against the dark canvas. No quote marks; no left border. The treatment is restrained — the brand lets the type carry the weight.

### Inline link (editorial)

**Status:** `current`
**Live source:** `https://linear.app/method` — body links inside editorial paragraphs
**Description:** Underlined text in `--color-link-primary` `#7070ff` with `text-decoration-thickness: from-font` and `underline-offset` aligned to the typeface metrics. On hover the colour shifts to `--color-link-hover` `#fff` and the underline persists.

### Hairline divider

**Status:** `current`
**Live source:** every page footer + section break
**Description:** A single horizontal line — 1px on standard displays, 0.5px on retina (via `min-resolution: 192dpi` media query). Colour `--brand-hairline-soft` `#23252a`. Full-bleed within the container; no shadow, no glow.

### "Trusted by" stat strip

**Status:** `current`
**Live source:** `https://linear.app/` — "Linear powers over 25,000 product teams." / "Trusted by more than 25,000 companies"
**Description:** A single sentence rendered as body-large `--color-text-secondary`, often paired with an inline link ("Customer stories →"). No logo strip on the homepage at audit time; customer logos appear only on `/customers`.

### Mockup overlay tabs

**Status:** `current`
**Live source:** `https://linear.app/` — the Cursor / Codex / No Agent tabs visible in the AI-section mockup
**Description:** A horizontal row of small tabs at the top of a mockup card. Each tab is a pill at `--color-bg-tertiary` `#232326` (active) or transparent (inactive), with the active state border-bottom-coloured at `--color-text-primary`. Font-size 0.8125rem medium. The active tab also drops a 1px `--ring` `#5e6ad2` highlight along its top edge.

### Toggle / switch

**Status:** `current`
**Live source:** in-app screenshots embedded in `/features`
**Description:** Pill-shaped track at `--color-bg-quaternary` `#28282c` (off) or `--color-brand-bg` `#5e6ad2` (on), with a circular thumb at `--foreground` `#f7f8f8`. Width ~32px, height ~18px. Border-radius `9999px`. Track has a `--color-border-secondary` inset hairline.
**States:** Off, on, disabled (50% opacity). Focus-visible adds the indigo ring.

### Search / filter input

**Status:** `current`
**Live source:** product screenshots inside `/features`
**Description:** Text input on `--color-bg-quaternary` `#28282c`, `border-radius: 6px`, `border: 1px solid --input` `#23252a`, height 32px, padding `0 12px`. Placeholder text in `--color-text-tertiary` `#8a8f98`. A leading 14px search-glyph icon sits 8px from the left edge. Mono numerals on filter-counts use `Berkeley Mono` 0.75rem.
**States:** Default border `#23252a`. Focus-visible swaps to `--ring` `#5e6ad2` with a 0.1s ease. Disabled drops to 50%.

### Command-launcher trigger (inline)

**Status:** `current`
**Live source:** `https://linear.app/features` — references to the command palette
**Description:** A wide pill that says "Search or jump to…" with a `⌘K` glyph at the right edge. Pill height 32px, `border-radius: 9999px`, surface `--color-bg-quaternary` `#28282c`, hairline `--color-border-primary`. The `⌘K` chip is rendered as a small mono pill at `--color-bg-tertiary`, font-family `Berkeley Mono` 0.75rem. Hover lifts the surface to `--color-bg-tertiary`.

### Issue identifier (mono)

**Status:** `current`
**Live source:** every issue mockup — `ENG-2703`, `IRIS-2231`, etc.
**Description:** Inline mono text in `Berkeley Mono` 0.75rem, `--color-text-tertiary` `#8a8f98`. Used inside cards, inside thread headers, and inside breadcrumbs as the canonical issue reference.

### Project status indicator

**Status:** `current`
**Live source:** `https://linear.app/` — "At risk" / "On track" inline before project names
**Description:** A small chip with both a dot and a label. "At risk" uses `--color-red` `#eb5757` dot and `--color-red` label. "On track" uses `--color-linear-plan` `#3fb950` dot and a label in either `--foreground` or `#3fb950`. The chip is otherwise styled like the generic Status chip.

### Notification badge / count

**Status:** `current`
**Live source:** topnav inbox icon when authenticated
**Description:** Small circular badge with a numeric count rendered in `Berkeley Mono` 0.625rem, `--brand-on-dark` text on a `--color-red` `#eb5757` fill. Diameter ~14px. Sits at the top-right corner of the parent icon.

### Pulse dot (animated)

**Status:** `current`
**Live source:** `https://linear.app/` — the dot prefix on "Issue tracking is dead"
**Description:** A 6–8px filled circle on `--color-brand-bg` `#5e6ad2` with a 1.2-second blink animation (`step-end` timing — sharp on/off, no fade), creating a heartbeat pulse next to the announcement link. The dot itself uses `border-radius: 50%`.

### Inline radio / radio chip group

**Status:** `current`
**Live source:** product mockups inside `/features`
**Description:** A row of small label pills, each with a leading dot and a label. The active option's dot is filled at `--color-brand-bg`; inactive dots are outlined at `--color-border-secondary`. Grouped by `--color-bg-quaternary` background and pill outer radius `9999px`.

### "New feature" callout link

**Status:** `current`
**Live source:** `https://linear.app/` — the `Hero_newFeatureLink__*` slot in the hero — "Issue tracking is dead →"
**Description:** A small pill above the hero headline that combines the Pulse dot, a one-line teaser ("Issue tracking is dead"), and a trailing `→`. The pill surface is `--color-bg-quaternary` `#28282c`, border `--color-border-primary`, pill radius `9999px`, padding `4px 10px`. The dot is `--color-brand-bg`; the text inherits `--color-link-primary` for the hyperlink colour. On hover the pill background lifts to `--color-bg-tertiary` `#232326`.

### Selection highlight (color-mix)

**Status:** `current`
**Live source:** all body text — `::selection` rule using `color-mix(in lch, var(--color-brand-bg), transparent 64%)`
**Description:** Linear uses `color-mix(in lch)` to drop the brand indigo to ~36% opacity behind selected text. Selection text colour is `--color-selection-text` (which inherits `currentColor` — meaning selection-on-headlines paints white, selection-on-body paints body-grey). The lch interpolation gives the selection a subtly cooler hue than a straight rgba would.

## §5 Surface inventory

- `https://linear.app/` — Marketing canonical: hero composition, primary/secondary buttons, product-mockup cards, code diff block, Pulse player, conversation thread, footer columns, all status / priority / label chips, pulse dot, new-feature callout link, selection highlight. The widest sampling of components.
- `https://linear.app/homepage` — Alias of `/`. Same layout; checked to verify `data-theme="dark"` consistency.
- `https://linear.app/method` — Editorial surface: chapter eyebrow + serif headline pairing, pull-quote in Tiempos Headline, inline links in body prose, chapter numbering pattern. Loads Tiempos preload that the homepage doesn't.
- `https://linear.app/features` — Sub-product surfaces: search/filter inputs, command-launcher trigger styling, toggle/switch in product context, mockup overlay tabs (Cursor / Codex / No Agent). The richest surface for in-product component variants.
- `https://linear.app/pricing` — Pricing tier cards, pricing feature row, the four-tier layout (Free / Basic / Business / Enterprise) with no highlighted tier and no billing toggle.
- `https://linear.app/customers` — Customer testimonial cards rendered as standalone units rather than embedded quotes. Confirmed dark.
- `https://linear.app/now` — A "what's shipping right now" surface — same canvas, similar timeline-style layout to the changelog. Confirmed dark.
- `https://linear.app/changelog` — Changelog timeline entries with the red "new" dot indicator. Confirmed dark.

## §6 Notes

- **Brand polarity is single-direction.** Linear ships only the dark marketing tree. The product app exposes both a light and dark theme, but no marketing page audits as light. Don't synthesise a light marketing canvas in `tokens.css`.
- **Indigo is the only chromatic identity colour the brand uses at full chroma on text.** Every other hue — the yellows, greens, oranges, reds — appears only as a chip indicator dot, a label outline, or a status colour. None of them carry as body or headline ink.
- **Sub-AA inline timestamps are deliberate.** `--color-text-quaternary` `#62666d` at `oklch(0.5092)` against `#0f1011` lands at ~3.16:1 — below WCAG AA. Linear ships it anyway because the consuming text is decorative (`· 4 min ago`, `· 1 day ago`). Don't lift this token to win contrast on a chart; route headlines and body text to the AA-passing `--color-text-tertiary` instead.
- **The semibold weight is 590, not 600.** This is a Linear typography signature. When authoring the preview, use the `--font-weight-semibold: 590` value rather than the default CSS `600`. The same applies to medium (510, not 500) and bold (680, not 700).
- **Inter feature settings `cv01 ss03` are part of the brand.** Without them the type loses its Linear-specific personality (the single-storey `a`, the more open numeral set). When rendering body copy in the preview, apply `font-feature-settings: "cv01", "ss03"`.
- **Tiempos Headline is preloaded only on `/method`.** Don't apply the serif globally. It's editorial-only; the homepage, pricing, customers, features, changelog, and now pages all use Inter Variable for every role.
- **The Pulse dot animation is `step-end` (sharp blink), not ease (fade).** This is the difference between a heartbeat and a glow — when replicating, use `animation-timing-function: step-end` so the dot snaps on/off.
- **The mocked product UI inside the marketing site can show a light theme.** When a screenshot of the product is embedded (the "Faster app launch" issue card on a white panel), it's an image of the in-app light theme — not the marketing canvas flipping polarity. Keep the surrounding card dark; the embedded mockup carries its own light surface.
- **Hairlines render at 0.5px on retina.** The `--border-hairline: 0.5px` override at `min-resolution: 192dpi` is part of the brand's "quiet by design" stance. On non-retina the line is 1px; on retina it's sub-pixel. Mirror this when authoring.
- **Selection uses `color-mix(in lch)`.** When implementing the preview, use the lch-mixed selection rather than a flat `rgba(94, 106, 210, 0.36)` — the lch interpolation produces a subtly cooler selection than rgba mixing.
- **Avoid brand-X content leaks.** When authoring the preview shell, don't lift Linear's actual tier names (Free / Basic / Business / Enterprise) as the pricing tiers; don't use real customer names (Gabriel Peal, Nik Koblov, OpenAI, Ramp) as testimonials; don't replicate the "Issue tracking is dead" announcement. Use Halcyon-team-using-Linear content instead.

## §Known gaps

- **No screenshot capture this cycle.** The instructions surfaced `mcp__claude-in-chrome__*` tools but explicitly forbade their use for this task (no `filePath` persistence), and the alternative `mcp__chrome-devtools__*` tools were not available via `ToolSearch`. The audit fell back to `WebFetch` + direct CSS bundle inspection. Light/dark screenshots at `temp/brand-refs/linear-style-live-{light,dark}.png` were not produced. Next time a chrome-devtools-equipped session runs the refresh, those captures should be added.
- **In-app surfaces remain login-walled.** The actual issue board, command palette, project view, roadmap timeline, and cycles burndown are gated behind `/login`. Component values documented above are drawn from product screenshots embedded in the marketing tree, which is a subset of what the real product ships. Examples not directly observable: the empty-state surfaces, drag-handle visuals, sub-issue tree indentation, multi-selection rubber-banding, the date-picker calendar grid, the parent-issue breadcrumb dropdown, the assignee-picker popover, the priority-picker overlay, the multi-cycle planning view, the GitHub branch / PR link card, the Slack-source pill on linked issues, the integrations settings panels.
- **No detailed measurement of motion timings beyond the Pulse dot.** Hover-state easing values are inferable from inline `transition: 0.1s ease` rules in the CSS bundle, but the more elaborate page transitions (chapter-to-chapter navigation in `/method`, the autoplay carousel inside the hero, the `Hero_pulseDot__*` blink composition) would benefit from a Chrome DevTools timeline capture.
- **Mobile chrome unsampled.** All audits were against the desktop layout. Linear ships a mobile-specific responsive cascade (`--homepage-outer-padding: 10px / 16px` at narrower breakpoints; column collapse in the hero and pricing; touch-target adjustments). The mobile component vocabulary — sticky mobile nav, hamburger menu, bottom sheet, mobile pricing-tier stack — is not documented here.
- **OG / metadata not captured.** The marketing page's OpenGraph and Twitter card images carry the brand visual identity (the indigo glyph on dark) but weren't extracted in this audit.
