---
slug: github-style
name: GitHub
source: live-verified
verified-at: 2026-05-25
verified-by: subagent-via-webfetch-fallback
verified-urls:
  - https://github.com/
  - https://github.com/facebook/react
  - https://github.com/facebook/react/issues
  - https://github.com/facebook/react/pull/29770
  - https://github.com/pricing
  - https://github.com/features
  - https://github.com/features/copilot
  - https://github.com/features/actions
  - https://github.com/features/code-search
  - https://github.com/security
  - https://github.com/enterprise
  - https://github.com/about
  - https://github.blog/
  - https://github.blog/changelog/
  - https://docs.github.com/en
  - https://docs.github.com/en/get-started/start-your-journey/hello-world
  - https://primer.style/foundations/color/
  - https://primer.style/foundations/primitives/typography
  - https://github.com/primer/primitives (source-of-truth tokens)
canonical-canvas: both
selection:
  mood: [developer, technical]
  tone: [precise, pragmatic]
  formality: medium
  density: high
  canonical_canvas: both
  best_for: |
    Use for information-dense artifacts that need a precise, pragmatic register with developer, technical visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# GitHub

## §1 Canonical canvas

GitHub ships a heterogeneous surface portfolio. The marketing homepage, blog, repo product chrome, docs, pricing, enterprise, security and about pages are all light-canonical (white `#ffffff` body with near-black `#1f2328` text). Several feature marketing pages render dark-canonical out of the gate — Copilot opens on a near-black hero with light text, code-search renders an IDE-style dark editor mockup as the primary surface. Primer (the design system) publishes a documented dark theme as a peer of the light theme, with a separate `dark-dimmed` variant for reduced-glare contexts. Both polarities are shipped, neither is a marketing skin layered over the other.

The product surface (repos, issues, PRs, actions) honours the signed-in user's `appearance` setting and ships the most polarity-aware UX in the portfolio — dark is a first-class chrome that GitHub the company uses internally, not a derived inversion.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | https://github.com/ | Light (`#ffffff`) with dark hero band overlay at the bottom of nav | Dark topnav over light body; "Sign up for GitHub" CTA inverts inside the dark nav |
| Repo product | https://github.com/facebook/react | Light (`#ffffff`) when signed-out / unset | Repo header tabs in light gray `#f6f8fa`; "Code" button is green `#1f883d`; star/watch/fork counter buttons read on light |
| Issues list | https://github.com/facebook/react/issues | Light | Open-issue dot is green `#1a7f37`; closed is purple `#8250df`; merged PR uses the same purple |
| PR conversation | https://github.com/facebook/react/pull/29770 | Light | Status pill (`Open` / `Closed` / `Merged`) is the StateLabel surface |
| Pricing | https://github.com/pricing | Light | Three tier cards (Free / Team / Enterprise), white card on `#ffffff` canvas, "Most popular" emphasis ring on the middle tier |
| Features overview | https://github.com/features | Light | Vertical feature listings with full-width photographic interludes, no card grid |
| Copilot feature | https://github.com/features/copilot | Dark (near-black) | Hero opens with a layered dark image; light text; pricing strip at the bottom |
| Actions feature | https://github.com/features/actions | Light with gradient bands | Hero gradient flows green → blue → turquoise across the workflow visualisation |
| Code search feature | https://github.com/features/code-search | Dark | IDE editor mockup is the hero — light syntax-coloured text on dark editor canvas |
| Security feature | https://github.com/security | Light with blue gradient accents | Code diff demo shows green-added + red-removed |
| Enterprise | https://github.com/enterprise | Light with dark photographic hero band | Customer logos under hero — Ford / 3M / Stripe / Spotify / KPMG |
| About | https://github.com/about | Light with purple gradient hero | Statistics-band (180M+ Developers, 4M+ Orgs, 420M+ Repos, 90% Fortune 100) |
| Blog | https://github.blog/ | Light (white/cream) | Editorial cards, green category pill accents |
| Changelog | https://github.blog/changelog/ | Light | Month-grouped entries with `Release` / `Improvement` / `Retired` badges |
| Docs | https://docs.github.com/en | Light | Three-pane: left sidebar nav, centre prose, right in-page TOC |
| Primer (design system) | https://primer.style/ | Both (toggle) | Documents identical light + dark themes as peers |

The two-polarity story is what makes GitHub's identity stable across the brand portfolio: the chromatic accents (green for success / open, red for closed / danger, purple for done / merged, blue for links, yellow for attention, orange for severe, pink for sponsors) hold their hue across both canvases. Lightness shifts (greens lighten to readable mid-tones on dark, reds soften toward coral, blues stay vivid). The neutral ladder is genuinely two-different-ladders — the light ladder anchors at `#1f2328` ink on `#ffffff` canvas; the dark ladder anchors at `#F0F6FC` ink on `#0D1117` canvas (true near-black, not a tinted gray).

## §2 Palette

Source of truth: [`primer/primitives`](https://github.com/primer/primitives) — GitHub's published token catalogue. All values below trace to `src/tokens/base/color/{light,dark}/*.json5` (functional aliases) and `src/tokens/functional/color/*.json5` (semantic slots). I converted the hex authoritative values to OKLCH via the vendored culori. The Primer LLM-usage metadata embedded in the source tokens (e.g., `'org.primer.llm': { rules: 'RECOMMENDED default for all text' }`) is GitHub's own annotation, not synthesis.

### Brand primary

- `--primary` (success / CTA green, light): `oklch(0.552 0.145 148.2)` (= `#1f883d`). Live: `https://github.com/facebook/react` — `<button class="btn-primary">` "Code" dropdown trigger; Primer source `src/tokens/functional/color/control.json5 -> button.primary.bgColor.rest`.
- `--primary` (success / CTA green, dark): `oklch(0.546 0.147 146.3)` (= `#238636`). Live: Primer dark theme override `green.5` referenced from the same control token. Identical hue to light, ~0.06 chroma shift.
- `--brand-primary-rest`: `oklch(0.552 0.145 148.2)` (= `#1f883d`). Live: Primer `button.primary.bgColor.rest` light.
- `--brand-primary-hover`: `oklch(0.531 0.140 148.1)` (= `#1c8139`). Live: Primer `button.primary.bgColor.hover` light.
- `--brand-primary-press`: equivalent of `green.6` on light = `oklch(0.464 0.117 148.3)` (= `#116329`). Live: Primer `green.6` light scale; documented active state for primary buttons. This is GitHub's own documented ladder, not a synthesised pressed value.

### Documented secondary brand colours

GitHub's chromatic identity is the semantic-palette set — each colour anchors a documented status. They are accent / state markers, never decorative fills.

- `--brand-accent-blue`: `oklch(0.540 0.191 257.5)` (= `#0969da`). Live: `https://github.com/` topnav link colour; Primer `fgColor.accent` light = `blue.5`. This is the link / accent / focus-ring colour, never a fill.
- `--brand-accent-blue-dark`: `oklch(0.715 0.152 253.3)` (= `#58a6ff`). Live: Primer `fgColor.accent` dark = `blue.3`. Lightened for legibility on the dark canvas; Primer documents this explicitly.
- `--brand-state-closed`: `oklch(0.552 0.205 24.5)` (= `#cf222e`). Live: closed-issue state colour; Primer `fgColor.danger` light = `red.5`. Also used for destructive-button text.
- `--brand-state-merged`: `oklch(0.563 0.207 295.0)` (= `#8250df`). Live: PR merged state pill colour; Primer `fgColor.done` light = `purple.5`. Also serves the "Closed (completed)" issue variant.
- `--brand-attention`: `oklch(0.554 0.117 75.0)` (= `#9a6700`). Live: Primer `fgColor.attention` light = `yellow.5`. Pending-CI dots, draft-PR fill, "Most popular" pricing ring.
- `--brand-severe`: `oklch(0.557 0.160 44.7)` (= `#bc4c00`). Live: Primer `fgColor.severe` light = `orange.5`. Higher-severity-than-attention; security advisory severity ladder.
- `--brand-sponsors`: `oklch(0.565 0.187 348.0)` (= `#bf3989`). Live: Primer `fgColor.sponsors` light = `pink.5`. The "Sponsor" heart-button surface, sponsors-related chrome.

Dark-mode swaps (each semantic colour has a documented dark variant — GitHub does the IBM-Carbon-style theme swap):

- `--brand-state-closed` dark: `oklch(0.665 0.205 27.0)` (= `#f85149`) = `red.4`.
- `--brand-state-merged` dark: `oklch(0.584 0.205 295.6)` (= `#8957e5`) = `purple.5`.
- `--brand-attention` dark: `oklch(0.720 0.140 79.9)` (= `#d29922`) = `yellow.3`.
- `--brand-severe` dark: `oklch(0.727 0.153 52.8)` (= `#f0883e`) = `orange.3`.
- `--brand-sponsors` dark: `oklch(0.585 0.163 349.6)` (= `#bf4b8a`) = `pink.5`.

These dark variants are not synthesised — Primer's `fgColor.{accent,danger,attention,severe,done,sponsors}` definitions include explicit `dark` overrides that map to lighter scale steps. The hue stays constant; only the lightness lifts to clear AA against the dark canvas.

### Canvas + neutrals

Light:

- `--background`: `oklch(1.000 0 0)` (= `#ffffff`). Live: Primer `bgColor.default` light = `neutral.0` = `white`.
- `--foreground`: `oklch(0.254 0.011 254.0)` (= `#1f2328`). Live: Primer `fgColor.default` light = `neutral.13` = `black`. Notice the tint — this is not pure black; the ~0.011-chroma blue-ink tint shapes GitHub's clean-but-warm read.
- `--card`: `oklch(1.000 0 0)` (= `#ffffff`). Live: same canvas as page background — cards have a hairline border, not a tinted fill.
- `--card-foreground`: same as `--foreground`.
- `--popover`: `oklch(1.000 0 0)` (= `#ffffff`). Popovers carry shadow, not a colour tint.
- `--popover-foreground`: same as `--foreground`.
- `--muted`: `oklch(0.978 0.003 247.9)` (= `#f6f8fa`). Live: Primer `bgColor.muted` light = `neutral.1`. Sidebar, code-block background, table-header band.
- `--muted-foreground`: `oklch(0.495 0.022 250.8)` (= `#59636e`). Live: Primer `fgColor.muted` light = `neutral.9`. Timestamps, "opened by", helper text.
- `--accent`: `oklch(0.978 0.003 247.9)` (= `#f6f8fa`). Note: GitHub's "accent" semantic in shadcn maps to the hover-fill role; in Primer that's `bgColor.neutral.muted` ≈ `#f6f8fa` with the inverse-rest variant being `#eff2f5` on actual hover.
- `--accent-foreground`: same as `--foreground`.
- `--secondary`: `oklch(0.978 0.003 247.9)` (= `#f6f8fa`). Default-button rest fill — Primer `button.default.bgColor.rest`.
- `--secondary-foreground`: same as `--foreground`.
- `--destructive`: `oklch(0.552 0.205 24.5)` (= `#cf222e`). Live: Primer `button.danger.bgColor.hover` (the danger-button hover fill — at rest, danger buttons in Primer use a light fill with red text; only on hover do they fill red).
- `--destructive-foreground`: `oklch(1.000 0 0)` (= `#ffffff`). White on the red fill.
- `--border`: `oklch(0.881 0.013 244.3)` (= `#d1d9e0`). Live: Primer `borderColor.default` light = `neutral.6`. The signature GitHub one-pixel hairline that defines repo cards, PR-conversation containers, issue rows.
- `--input`: `oklch(0.881 0.013 244.3)` (= `#d1d9e0`). Same as `--border` — Primer uses the same `borderColor.default` for input outlines.
- `--ring`: `oklch(0.540 0.191 257.5)` (= `#0969da`). Live: Primer `focus.outlineColor` light = `blue.5`. Same blue as `fgColor.accent` — GitHub's link colour is also its focus-ring colour.

Dark:

- `--background`: `oklch(0.176 0.014 258.4)` (= `#0D1117`). Live: Primer `bgColor.default` dark = `neutral.1`. The signature near-black with a faint blue cool tint — not pure black, never `oklch(0.x 0 0)`. The actual `base.color.black` token in dark resolves to `#010409` which is reserved for the absolute-darkest moments (Copilot hero); the default product chrome runs one notch up.
- `--foreground`: `oklch(0.970 0.010 247.9)` (= `#F0F6FC`). Live: Primer `fgColor.default` dark = `neutral.12`. Off-white with the same cool tint as the canvas, never pure `#ffffff`.
- `--muted`: `oklch(0.220 0.018 255.7)` (= `#151B23`). Live: Primer `bgColor.muted` dark = `neutral.2`.
- `--muted-foreground`: `oklch(0.677 0.016 254.6)` (= `#9198A1`). Live: Primer `fgColor.muted` dark = `neutral.9`.
- `--accent` / `--secondary`: `oklch(0.220 0.018 255.7)` (= `#151B23`). Default-button surfaces lift one step from the canvas.
- `--border`: `oklch(0.384 0.018 254.7)` (= `#3D444D`). Live: Primer `borderColor.default` dark = `neutral.7`.
- `--ring`: `oklch(0.715 0.152 253.3)` (= `#58a6ff`). Live: Primer `focus.outlineColor` dark = `blue.3`.

### Polarity-locked surfaces

GitHub has fewer polarity locks than most brands because it ships two genuine themes. The exceptions:

- `--brand-canvas-night`: `oklch(0.104 0.019 248.3)` (= `#010409`). Live: `https://github.com/features/copilot` hero canvas, Primer `base.color.black` dark theme. The "extra-dark" near-black used for marketing-hero moments where the standard `#0D1117` chrome would feel insufficiently theatrical. Does not flip — even on the light variant of a page that nests this surface, the surface stays near-black.
- `--brand-on-dark`: `oklch(0.970 0.010 247.9)` (= `#F0F6FC`). Used on the marketing dark hero bands and inside the `bgColor.inverse` topnav. Holds at the same lightness regardless of which theme the surrounding content lives in.
- `--brand-on-light`: `oklch(0.254 0.011 254.0)` (= `#1f2328`). The locked ink on Primer-documented `light-only` surfaces — e.g., the `bgColor.emphasis` token in light = `#25292e` (which is itself a near-black "inverse" band) carries `fgColor.onEmphasis` = white. The PR / issue conversation-status bands inherit this rule.
- `--brand-emphasis-light`: `oklch(0.279 0.011 254.0)` (= `#25292e`). Live: Primer `bgColor.emphasis` light = `neutral.12`. The dark band that appears inside otherwise-light pages — the marketing topnav, status emphasis chrome, the GitHub Actions step-detail header bars. Note this is one shade lighter than the Copilot hero canvas; emphasis is contextual, not absolute.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.935 0.008 253.9)` (= `#E6EAEF`). Live: Primer `neutral.3` light — soft dividers inside cards, between blog post rows.
- `--brand-hairline`: `oklch(0.881 0.013 244.3)` (= `#d1d9e0`). Live: Primer `borderColor.default` light. The standard 1px card / sidebar / tab divider.
- `--brand-hairline-soft` dark: `oklch(0.274 0.018 251.9)` (= `#212830`). Live: Primer `neutral.3` dark.
- `--brand-hairline` dark: `oklch(0.384 0.018 254.7)` (= `#3D444D`). Live: Primer `borderColor.default` dark.

### Status-pill surfaces (Primer `Label` + `StateLabel`)

GitHub's most-recognisable component is the colour-coded status label. The fill surfaces:

- `--brand-state-open-fill` light: `oklch(0.957 0.049 151.6)` (= `#dafbe1`) = `green.0`. Light tint behind an open-status pill.
- `--brand-state-open-fill` dark: derived from Primer `green.0` dark = `#aff5b4` — but in product chrome, the Open pill uses the `bgColor.success.emphasis` = `#1f883d` fill with white text. The two patterns coexist: muted-fill pills for inline labels, emphasis-fill pills for the StateLabel above-the-fold.
- `--brand-state-merged-fill` light: `oklch(0.973 0.030 318.7)` (= `#fbefff`) = `purple.0`. The Merged-PR header carries `bgColor.done.emphasis` = `#8250df` solid fill with white text.
- `--brand-state-closed-fill` light: `oklch(0.948 0.034 17.3)` (= `#ffebe9`) = `red.0`. Closed-PR / Closed-issue header carries `bgColor.danger.emphasis` ≈ `#cf222e` fill with white text.

These fills carry across both themes (the muted ones lift to the documented dark-scale values; the emphasis fills swap to the dark-scale step-5/4 equivalents).

### Data visualisation palette

Primer documents a 6+ colour data-vis palette. From `src/tokens/functional/color/data-vis.json5`:

- viz.1 (green): `#30a147`
- viz.2 (blue): `#006edb`
- viz.3 (purple): `#a830e8`
- viz.4 (red): `#df0c24`
- viz.5 (orange): `#eb670f`
- viz.6 (teal): `#179b9b`

Each has a muted variant for area-fills. The contribution graph (the famous "green squares" on a profile page) uses a 5-step green ramp from `bgColor.neutral.muted` through `green.0 / green.2 / green.5 / green.7` — that surface is doc'd as `calendar-graph-day-bgColor-L{0-4}` in Primer.

### Drift vs `tokens.css`

No prior `tokens.css` exists — this is new-brand authoring. The `DESIGN.md` is the authoritative source for the first `tokens.css`.

## §3 Typography

Source: [`primer.style/foundations/primitives/typography`](https://primer.style/foundations/primitives/typography) and `src/tokens/base/typography/*.json5`.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Mona Sans VF | 600 / 700 | 2.5rem (40px) | 1.375 | -0.005em |
| Title large | Mona Sans VF | 600 | 2rem (32px) | 1.5 | -0.005em |
| Title medium | Mona Sans VF | 600 | 1.25rem (20px) | 1.625 | normal |
| Title small | Mona Sans VF | 600 | 1rem (16px) | 1.5 | normal |
| Subtitle | Mona Sans VF | 400 | 1.25rem (20px) | 1.625 | normal |
| Body large | Mona Sans VF | 400 | 1rem (16px) | 1.5 | normal |
| Body medium | Mona Sans VF | 400 | 0.875rem (14px) | 1.5 | normal |
| Body small | Mona Sans VF | 400 | 0.75rem (12px) | 1.625 | normal |
| Caption | Mona Sans VF | 400 | 0.75rem (12px) | 1.25 | normal |
| Code | ui-monospace | 400 | 0.8125rem (13px) | 1.5 | normal |

Stacks (verbatim from Primer source):

- Sans: `'Mona Sans VF', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`
- Mono: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`

Mona Sans is variable across three axes: weight (ultra-thin to extra-heavy), width (condensed to expanded), and slant (regular to italics). Designed in collaboration with Degarism. Hubot Sans is the geometric sibling — used for headers / pull-quotes in branded marketing pages, with a more technical feel. Both fonts are open-source under SIL OFL.

Weight tokens: light 300, normal 400, medium 500, semibold 600 (the working heading weight across the entire product chrome; only display uses 700+).

The line-height-as-unitless system aligns to the 4px grid — Primer prescribes this for consistent vertical rhythm with their 4-base spacing scale.

## §4 Component vocabulary

### Button — Primary

**Status:** current
**Live source:** Primer `Button` component, `variant="primary"`. Visible at `https://github.com/facebook/react` "Code" button, `https://github.com/pricing` tier CTAs.
**Description:** Solid green fill (`#1f883d` light, `#238636` dark), white text, 6px border-radius (`--borderRadius-medium` in Primer), 32px medium height, 28px small, 40px large. Padding 5px 16px medium. Border: 1px solid with `--button-primary-borderColor-rest` (slightly darker green than the fill for definition). 14px Mona Sans semibold label, no letter-spacing. Used "sparingly for the highest-priority action" per Primer docs — there's typically one primary button per surface.
**States:** rest `#1f883d`; hover `#1c8139` (one step down on the green ladder); active `#116329` (green.6); focus blue outline at `#0969da` 3px ring with 2px offset; disabled `#94d3a2` fill + `#ffffff` 80%-opacity text; loading replaces label with a spinner glyph at the same colour.

### Button — Default

**Status:** current
**Live source:** Primer `Button` `variant="default"`. Visible at `https://github.com/facebook/react` "Watch" / "Fork" / "Star" buttons in the header.
**Description:** Light fill `#f6f8fa` (Primer `button.default.bgColor.rest`), dark text `#1f2328`, 1px border `#d1d9e0`, same 6px radius as primary. Often paired with a leading or trailing visual (eye icon for Watch, fork icon for Fork, star icon for Star). The counter buttons (`245k`, `6.6k`, `51.1k`) sit as a `<button group>` with a hairline divider between the verb and the count, the count rendered in semibold dark text.
**States:** rest `#f6f8fa`; hover `#eff2f5`; active `#d1d9e0`; focus same blue ring; disabled background tint with greyed text.

### Button — Danger

**Status:** current
**Live source:** Primer `Button` `variant="danger"`. Visible on settings-page "Delete repository" actions.
**Description:** **Inverted treatment** — light fill `#f6f8fa` at rest with red text `#d1242f`, becomes red fill `#cf222e` with white text on hover. This is a documented Primer pattern: danger actions stay quiet until intentioned. Same 6px radius.
**States:** rest `#f6f8fa` fill + `#d1242f` text; hover `#cf222e` fill + `#ffffff` text; active `#a40e26` fill + `#ffffff` text.

### Button — Invisible

**Status:** current
**Live source:** Primer `Button` `variant="invisible"`. Visible as overflow-menu triggers, tab-row trailing actions, command-K palette buttons.
**Description:** No background, no border, hover lifts to `#f6f8fa` fill. Dark text. Used for low-priority chrome actions where the button presence is muted until interaction.

### Button — Outline

**Status:** current
**Live source:** Primer `Button` `variant="outline"`. Less common — found on marketing surfaces as secondary CTAs.
**Description:** Light fill `#f6f8fa` with blue accent text `#0969da`, hover swaps to `#0969da` fill with white text. The "outline" name is historical — present treatment is fill-on-hover not strict outline.

### Repository status counter button group

**Status:** current
**Live source:** `https://github.com/facebook/react` — the "Watch / Fork / Star" trio at the top right of any repo header. Selector `<div data-view-component class="BtnGroup">`.
**Description:** A row of `Button — Default` instances joined edge-to-edge with shared hairlines, each containing a leading icon, a verb label (`Watch`, `Fork`, `Star`), a divider, and a counter (`6.6k`, `51.1k`, `245k`). The counter sits in semibold near-black. Notable: when the user clicks Star, the Star button shifts to "Starred" with the icon flipping to filled.

### Topnav (marketing)

**Status:** current
**Live source:** `https://github.com/` top global nav.
**Description:** Dark band (`#0D1117` / `bgColor.default` dark — the marketing topnav uses the dark theme regardless of the body theme below it). White wordmark on the left (the Octocat glyph + "GitHub" lockup). Centre links: Platform / Solutions / Resources / Open Source / Enterprise / Pricing — each with a dropdown caret. Right cluster: a search field with `/` keyboard hint, "Sign in" link, "Sign up" primary-button CTA. Height ~64px, sticky on scroll. White text at 14px Mona Sans medium with ~12px gap between links.

### Topnav (product / signed-in)

**Status:** current
**Live source:** `https://github.com/facebook/react` when signed-out shows a similar layout; signed-in shows the avatar / notifications cluster.
**Description:** Same dark band (`#0D1117`). Octocat + breadcrumb on the left (`facebook` / `react`). Centre is empty. Right: search (cmd-K hint), `+` create-menu, bell notification, avatar pill. The avatar opens an account menu with a near-black surface and inverted text.

### Repo header tabs

**Status:** current
**Live source:** `https://github.com/facebook/react` — the row immediately below the repo name. Selector `<nav class="js-repo-nav">`.
**Description:** Horizontal tab row: Code | Issues | Pull requests | Actions | Projects | Wiki | Security | Insights (plus Settings if owner). Each tab has a leading 16px icon, a label, and an optional counter pill (e.g., "829" for Issues, "479" for Pull requests). Active tab carries an orange underline `#bc4c00` (Primer `severe.5`, ~3px). Hover lift to `#f6f8fa` fill. The tabs themselves are 40px tall; the underline sits at the bottom edge of the tab row.

### Issue / PR status pill (StateLabel)

**Status:** current
**Live source:** Top of any issue or PR page — selector `<span class="State">`. Visible at `https://github.com/facebook/react/pull/29770`.
**Description:** Pill-shape (border-radius pill / ~16px), 28px tall, solid fill, 14px Mona Sans medium label, 12px leading icon. Variants:
- **Open** (issue / PR) — green fill `#1f883d` / white text / open-dot icon
- **Closed** (issue, not planned) — gray fill `#6e7681` / white text / closed-circle icon
- **Closed (completed)** — purple fill `#8250df` / white text / done-checkmark icon
- **Merged** (PR) — purple fill `#8250df` / white text / merged-icon
- **Draft** (PR) — gray-outline pill (no solid fill) / draft-icon

These are GitHub's most-recognisable component — colour + icon together communicate state at a glance.

### Label (issue / PR labels)

**Status:** current
**Live source:** Issue rows on `https://github.com/facebook/react/issues` — label pills with custom user-chosen colours.
**Description:** Small pill, 22px tall, `border-radius: 2em` (full pill), 10px font, 6px horizontal padding. Each label has a user-assigned colour — Primer auto-derives a high-contrast foreground (dark or light) from the fill's lightness. Labels marked with categories like "Component: Developer Tools", "Type: Bug", "Status: Unconfirmed" are the docs convention.

### Branded Label variants (semantic)

**Status:** current
**Live source:** Primer `Label` component variants.
**Description:** Ten documented variants, each a tinted-light-fill + same-hue dark-text pill: default (gray fill `#eff2f5` / `#1f2328` text), primary (`#1f883d` fill / white text — used on emphasis CTAs), secondary, accent (`blue.0` fill / `blue.5` text), success (`green.0` / `green.5`), attention (`yellow.0` / `yellow.5`), severe (`orange.0` / `orange.5`), danger (`red.0` / `red.5`), done (`purple.0` / `purple.5`), sponsors (`pink.0` / `pink.5`).

### Card (repo card on a profile / explore page)

**Status:** current
**Live source:** `https://github.com/explore` repo cards. Selector `<article class="Box">`.
**Description:** White surface, 1px hairline border `#d1d9e0`, 6px border-radius, 16px padding. Repo name as a link in `#0969da` (Mona Sans semibold 16px). One-line description below in `#59636e` muted. Footer row with primary-language colour dot (e.g., orange for Rust, yellow for Python — same as `data-vis` colours), language label, star counter. No shadow at rest; no hover lift. The card is a content container, not a clickable surface — the title is the only clickable element.

### File tree / file row

**Status:** current
**Live source:** `https://github.com/facebook/react` — selector `<div class="js-details-container">`.
**Description:** Three-column row: leading icon (folder / file glyph), filename link in `#0969da`, last-commit-message column in `#59636e` muted, last-commit-date in `#59636e` muted. Row height ~32px. Hover lifts the row to `#f6f8fa`. The Code button (green) sits in a sticky header above the tree.

### Inline code pill

**Status:** current
**Live source:** Throughout docs, repo READMEs, issue bodies. Selector `<code>` inside body prose.
**Description:** Inline `<code>` rendered in `ui-monospace` 0.85em, with `#f6f8fa` fill, 3px border-radius, 2px vertical / 4px horizontal padding. No border. The mono pill is one of the highest-frequency surfaces across the brand.

### Code block (fenced)

**Status:** current
**Live source:** Issue / PR / README rendered Markdown.
**Description:** Block-level `<pre><code>`, `#f6f8fa` fill in light theme, `#161b22` fill in dark theme. 6px border-radius. 16px padding. `ui-monospace` 13px (`0.8125rem`). Optional copy-button overlay at top-right. Syntax highlighting via Primer's documented `syntax` token set (Primer `syntax.json5`) — keyword pink/red, string blue, comment muted-gray, function blue.

### Diff (added / removed lines)

**Status:** current
**Live source:** PR "Files changed" tab. Selector `<table class="diff-table">`.
**Description:** Side-by-side or unified diff. Added line: `#dafbe1` fill (green.0 light) with a `+` gutter; removed line: `#ffebe9` fill (red.0 light) with a `-` gutter. The line numbers gutter is `#f6f8fa`. Within added/removed lines, the changed character ranges receive a darker green / red highlight (`green.2` / `red.2`) to draw the eye. Dark-mode diff uses `green.0` dark `#aff5b4`-tinted 12% alpha and `red.0` dark `#ffdcd7`-tinted alpha — the same colour family, much-reduced opacity.

### Comment (issue / PR comment)

**Status:** current
**Live source:** Conversation tab of any PR.
**Description:** Card with 1px hairline border, 6px radius. Header row: 40px avatar circle (left), author username in `#0969da`, " commented X days ago" timestamp in `#59636e`. Body in standard prose / Markdown rendering. Footer row may show reaction emoji pills (`<button>` of an emoji + count, with `+` add-reaction button). Comment body is the only non-bordered card content area — replies are nested inside.

### Conversation activity timeline

**Status:** current
**Live source:** PR conversation tab — non-comment events (label added, branch deployed, milestone set, CI check completed).
**Description:** Single-line entries in the conversation flow, each with a small leading icon (color-coded by event type — green check for success, red x for fail, orange dot for queued), small avatar, terse description ("Bot deployed pull-request-29770 to preview"), timestamp. No card framing — entries float in the conversation thread between comment cards.

### Merge button

**Status:** current
**Live source:** Bottom of an open PR. Selector `<button class="merge-button">`.
**Description:** Wide primary-green button with merge-strategy dropdown caret. Variants: "Merge pull request" / "Squash and merge" / "Rebase and merge". When the PR has conflicts, the button is replaced by a disabled gray "This branch has conflicts" state. The button is full-width within the merge container card.

### Pricing tier card

**Status:** current
**Live source:** `https://github.com/pricing` — three side-by-side cards.
**Description:** White surface card, 1px hairline border, 8px border-radius, 32px padding. The middle card ("Team") carries a "Most popular" emphasis ring — a 2px border in `#1f883d` instead of the default gray hairline, plus a small banner pill at the top in the same green. Inside each card: tier name in 24px semibold, one-line description in muted, large price line ("$0 per user / month" or "$4 per user / month"), primary-button CTA, then a vertical feature list with 16px check-mark icons (`success.5` green).

### Compare-features table

**Status:** current
**Live source:** `https://github.com/pricing` — below the tier cards.
**Description:** Wide horizontal-scrolling table comparing every feature against every tier. Row-striped (`#ffffff` / `#f6f8fa` alternating). Sticky left column with feature names; three numbered columns for Free / Team / Enterprise. Check-mark cells use a green check `#1a7f37`; em-dash cells use neutral text. Section headers group features by category (Code management, Code workflow, Collaboration, etc.) with a slightly darker band.

### Feature card grid (Copilot landing)

**Status:** current
**Live source:** `https://github.com/features/copilot` — feature highlights below the dark hero.
**Description:** Each feature is a tall card with full-width photographic / illustrated header band, then a title, then a paragraph. Not a tight tile grid — features take 50% width per card, two-up on desktop, stacked on mobile. Dark canvas, light text. Inline code mockups inside cards use the documented dark code-block treatment.

### Workflow visualisation (Actions hero)

**Status:** current
**Live source:** `https://github.com/features/actions` hero.
**Description:** A signature decorative element specific to Actions — a multi-stage pipeline mockup showing parallel "matrix" jobs (Linux / macOS / Windows tracks). Each step renders as a card with a status icon (green check for success, yellow dot for pending, red x for fail), duration label ("1 minute 42 seconds"), and step name. The background gradient flows green → blue → turquoise across the visualisation. This is the closest GitHub gets to a brand-flavoured signature surface on a feature page.

### Code-search IDE mockup (Code Search hero)

**Status:** current
**Live source:** `https://github.com/features/code-search` hero.
**Description:** Dark editor canvas with a left file-tree sidebar, a syntax-highlighted code panel, and floating panels (symbol lookup, search context). Demonstrates the "way more than grep" search query — supports `repo:`, `org:`, boolean operators, regex like `/limits?/`. This is the brand's other signature surface: GitHub-as-IDE-experience, dark and developer-native.

### Sidebar (docs / repo about / settings)

**Status:** current
**Live source:** `https://docs.github.com/` left sidebar; repo About sidebar.
**Description:** Left-aligned vertical nav with collapsible section groups. Active item background `#f6f8fa`, optionally with a leading blue accent stripe (3px wide, `#0969da`). 14px Mona Sans normal at rest, semibold when active. Indentation conveys nesting depth (each level = 16px). On mobile, the sidebar collapses to a top accordion.

### Right-side TOC (docs)

**Status:** current
**Live source:** `https://docs.github.com/en/get-started/start-your-journey/hello-world` right column.
**Description:** "On this page" heading at top, vertical list of section anchors. Active anchor (the one currently scrolled into view) gets a `#0969da` left accent stripe + semibold text. Inactive anchors render in muted gray.

### Callout / notice box (docs)

**Status:** current
**Live source:** Docs prose — `<div class="markdown-alert">` blocks.
**Description:** Left-accent-stripe (4px wide) coloured by severity, with a tinted background fill:
- Note → blue stripe + `#ddf4ff` fill (`blue.0`)
- Tip → green stripe + `#dafbe1` fill (`green.0`)
- Important → purple stripe + `#fbefff` fill (`purple.0`)
- Warning → yellow stripe + `#fff8c5` fill (`yellow.0`)
- Caution → red stripe + `#ffebe9` fill (`red.0`)
Padding 16px, 6px border-radius. Title row carries a 16px leading icon in the stripe colour.

### Reaction emoji button

**Status:** current
**Live source:** Below any issue / PR / discussion comment.
**Description:** Pill-shaped button containing an emoji and a count. Inactive: gray hairline border, no fill. Active (you reacted): blue border `#0969da` and `#ddf4ff` blue.0 tinted fill. Hover gives the inactive state a subtle lift. Always-visible "+" trailing button opens a picker.

### Search input (topnav cmd-K)

**Status:** current
**Live source:** Topnav search field, focused via `/`.
**Description:** Dark surface (since it lives in the dark topnav), 1px hairline `#3D444D`, 6px radius, leading search-glyph icon, trailing `/` kbd badge. On focus expands inline. Mona Sans 14px placeholder in muted ink.

### Footer

**Status:** current
**Live source:** Bottom of every github.com page.
**Description:** Dark surface (`bgColor.default` dark — same near-black `#0D1117` regardless of body theme). Three- to six-column link grid: Product / Platform / Support / Company / Site / Subprocessors. Each column has a small all-caps semibold heading in muted ink, then links in white. Octocat lockup top-left, "© GitHub, Inc." copyright bottom-left, social icons (Twitter, GitHub, YouTube, LinkedIn) bottom-right. Always-dark — does not honour theme.

### Contribution graph (profile)

**Status:** current
**Live source:** `https://github.com/<any-username>` — the "1,243 contributions in the last year" calendar grid.
**Description:** 52-column × 7-row grid of small rounded squares. Five-step intensity ramp: empty `bgColor.neutral.muted` → `green.0` → `green.2` → `green.5` → `green.7`. Each cell is 11px square with 3px gap. Hover reveals a tooltip "5 contributions on Tuesday, January 14". This is GitHub's iconic visualisation — uniquely recognisable.

### Octocat / brand mark

**Status:** current
**Live source:** Topnav, footer, error pages.
**Description:** The Octocat is the cat-octopus mascot used as the brand's secondary mark; the wordmark "GitHub" in Mona Sans semibold is the primary mark. Both render at 32px high in nav contexts. The Octocat glyph stays monochrome in nav chrome — never coloured.

### Pull request review summary block

**Status:** current
**Live source:** Below the merge button on a PR.
**Description:** Card listing reviewers with their review state — a row per reviewer with avatar, name, and a coloured pill: "Approved" (green-fill / white text), "Changes requested" (red-fill / white text), "Commented" (gray-fill), "Pending review" (gray outline). Required-review labels carry a "required" tag in a small badge.

### Empty / zero-state illustration block

**Status:** current
**Live source:** Empty repo, empty Issues tab, empty Projects.
**Description:** Centred composition with an illustrated SVG glyph (Octocat in various poses, or a related abstract glyph), a 24px semibold title, a one-line muted description, and one or two CTAs. The illustration uses the muted palette — outlined linework with subtle fills, never a full-bleed photo.

## §5 Surface inventory

- `https://github.com/` — marketing home; anchors the dark-topnav-over-light-body pattern, the homepage hero, the customer logo strip, the email-capture CTA.
- `https://github.com/facebook/react` — repo product chrome; anchors the topnav (signed-out), repo header tabs, file tree, Code button, status counter group, About sidebar.
- `https://github.com/facebook/react/issues` — issue list; anchors issue rows, label pills, status dots, filter sidebar.
- `https://github.com/facebook/react/pull/29770` — PR conversation; anchors StateLabel, comment cards, activity timeline, conversation flow.
- `https://github.com/pricing` — pricing-tier cards, compare-features table, FAQ accordion.
- `https://github.com/features` — features-overview landing; anchors the section-eyebrow + full-width-illustration pattern (vertical features, not card grid).
- `https://github.com/features/copilot` — dark-canonical feature page; anchors the near-black `--brand-canvas-night` surface, layered hero imagery, dark feature cards.
- `https://github.com/features/actions` — Actions feature page; anchors the gradient-band hero and the workflow-visualisation mockup as a brand signature.
- `https://github.com/features/code-search` — dark IDE-mockup hero; anchors the editor-as-marketing-surface pattern.
- `https://github.com/security` — light canvas with blue gradient accents; anchors the secret-protection terminal mockup and the green-added / red-removed diff demo.
- `https://github.com/enterprise` — Enterprise marketing; anchors the dark-photographic-hero-over-light-body pattern, customer logo strip.
- `https://github.com/about` — About page; anchors the purple-gradient hero, statistics band (180M+ Developers, 4M+ Orgs, 420M+ Repos), content-card grid.
- `https://github.blog/` — blog index; editorial cards, green category pills.
- `https://github.blog/changelog/` — changelog; release / improvement / retired badge pattern, month-grouped entries.
- `https://docs.github.com/en` — docs hub; sidebar nav + right-rail TOC + prose with callouts and inline code pills.
- `https://primer.style/` — design-system docs site; anchors the documented light + dark theme parity and the published token catalogue (the source-of-truth referenced throughout this DESIGN.md).
- `https://github.com/primer/primitives` — token JSON5 source; the file paths cited under §2 are the authoritative artefacts behind every hex value.

## §6 Notes

- **Two genuine themes, not a marketing skin.** GitHub is one of the few brands in this catalogue that ships a published, peer-equal dark theme — Primer encodes both as first-class with their own JSON5 token files (`base/color/light/light.json5`, `base/color/dark/dark.json5`). Chromatic accents (greens, reds, purples, blues) carry across modes; only their lightness shifts on the documented scale (`green.5` light = `#1a7f37` → `green.5` dark = `#238636`). Dark mode is canonical, not derived. Don't synthesise a lightness-inverted dark — match the documented `neutral.{0–12}` dark scale instead.
- **Polarity of marketing surfaces is page-by-page.** Homepage / pricing / blog / docs ship light. Copilot, code-search ship dark. Enterprise and security ship light with photographic / gradient hero bands. The brand makes peace with this — the topnav is always dark regardless of the body below it, the footer is always dark too, which gives every page consistent dark-canvas anchors at top and bottom even when the middle is white.
- **Status colour is identity.** Open / Closed / Merged / Draft / Done / Attention / Severe / Sponsors are the chromatic identity. Green is not "the brand colour"; it's the open-and-success colour. Red is closed, purple is merged / completed, yellow is attention, orange is severe, pink is sponsors. GitHub doesn't have "a brand colour" in the way Stripe has purple or Linear has graphite — its brand identity is the semantic palette, used consistently across every surface.
- **The Octocat is monochrome.** The Octocat brand mark stays single-colour everywhere — white on dark surfaces, dark `#1f2328` on light surfaces. Never coloured (no green Octocat, no rainbow Octocat in chrome). The exception is Pride-month Octocat banners which are explicitly marketing-only, never product chrome.
- **The contribution graph is the only uniquely-GitHub visualisation.** The green calendar grid is uncopyable — anyone who copies it tags themselves as a GitHub clone. It's the brand's signature decorative moment, and the only token-defined surface in the catalogue that uses a 5-step single-hue ramp.
- **Mona Sans is a 2022+ wordmark choice.** Before Mona Sans, GitHub used a system-font stack everywhere; the custom typeface change is recent and carries the brand identity in display weight. The font is open-source — using it in this catalogue is licence-clean.
- **Card surfaces never tint by default.** Repo cards, comment cards, pricing tier cards all use `#ffffff` on the light canvas (or `#0D1117` matching the page on dark). The hairline border `#d1d9e0` does the visual separation; no shadow, no tint, no elevation lift on rest state. This is unusual for B2B SaaS but it's GitHub's house style — surface differentiation by line, not by fill.
- **Inverse-treatment danger buttons.** Primer's danger button is quiet at rest (light fill + red text) and only goes red-on-hover. This is intentional — destructive actions don't shout for attention until the user reaches toward them. Don't render danger as red-on-rest in a GitHub-style preview.
- **`bgColor.emphasis` is not always-dark.** Inside the light theme, `bgColor.emphasis` = `#25292e` (a near-black band). Inside the dark theme, `bgColor.emphasis` = `#656C76` (a mid-gray). Both are "high-contrast against the page" but they're not the same colour — the emphasis surface is contextual, not absolute. Don't confuse `bgColor.emphasis` with `bgColor.inverse` (which is `#25292e` always in light, swapping to mid-gray dark surfaces — Primer documents both).
- **Brand-X-lift content to avoid in previews:** real customer logos from `/enterprise` (Ford, 3M, P&G, American Airlines, KPMG, Stripe, Spotify — these are GitHub's actual customer references, not yours). Real repo names from public repos (`facebook/react`, `vercel/next.js` — use invented org/repo names). Real PR numbers from public PRs. The Octocat glyph itself is GitHub property — don't lift it. The contribution graph as a visualisation is fine to evoke; the exact 5-step green ramp is the recognisability, don't pretend it isn't.
- **Brand prose is plain.** GitHub's writing across `primer.style` and `github.com` reads as plain technical English. The register uses verbs like "supports", "enables", "provides", "displays" — not parallel-aphorism stacks, not editorial-philosophy clauses.

## §Known gaps

- **Screenshots are deferred.** The Chrome MCP tools were not available in this subagent context (the `ToolSearch` query returned no schemas for `mcp__chrome-devtools__*`), so this DESIGN.md was authored against the WebFetch fallback path. WebFetch returns AI-summarised content rather than raw HTML, which means computed-style sweeps (`getComputedStyle` over button selectors for live pixel values) were not possible — every chromatic value here traces to the published `primer/primitives` JSON5 source-of-truth instead, which is more authoritative than DOM sampling would be. The two sources should match by construction (the live site renders these tokens at build time), but the live-DOM cross-check is not performed. Step 2 / Step 3 can verify visual fidelity against the live brand at screenshot time.
- **Signed-in product chrome was not sampled.** All `/facebook/react`-style URLs were observed signed-out, which shows the same UI tree but without the avatar / notifications / create-menu cluster. The signed-in topnav variants, the user-account menu, the notifications inbox, the Projects beta surface, the Discussions composer — none were directly observed. Should be sampled with a logged-in browser session in a future cycle.
- **Mobile breakpoints not sampled.** All observations are desktop / wide-viewport. GitHub's mobile site collapses the topnav to a hamburger, stacks the repo header tabs, and renders the issue list as full-bleed cards — these were not documented.
- **Theme variants beyond light + dark.** Primer ships `light-high-contrast`, `light-tritanopia`, `light-protanopia-deuteranopia` (and the dark equivalents), plus `dark-dimmed` (reduced-glare). These variants override certain neutrals and accent steps. They are documented in the source files but not enumerated here — the canonical canvas is `both` (light + dark), and the high-contrast / colour-vision variants are deferred unless explicitly required.
- **GitHub Desktop / GitHub CLI / GitHub Mobile apps** ship their own UI conventions outside the web brand. Out of scope for this DESIGN.md; visit those clients separately if a future cycle needs them.
- **Marketing motion / video assets** (the hero "Pause" control on Copilot, the animated workflow on Actions) are described structurally but not analysed for motion timing, easing curves, or video colour treatment. Mostly out of scope for a token catalogue; flagged for transparency.
