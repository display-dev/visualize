---
slug: cohere-style
name: Cohere
source: live-verified
verified-at: 2026-05-27
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://cohere.com/
  - https://cohere.com/pricing
  - https://cohere.com/command
  - https://cohere.com/research
  - https://cohere.com/north
  - https://cohere.com/about
  - https://cohere.com/careers
  - https://cohere.com/blog
  - https://docs.cohere.com/
  - https://dashboard.cohere.com/welcome/login
canonical-canvas: both
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Cohere

## §1 Canonical canvas

Cohere's surface vocabulary is multi-polarity by design: every marketing page anchors on a pure-white editorial floor, but the brand identity is carried by full-bleed product bands that are aggressively dark — deep green on `/command`, royal blue on `/research`, near-black on `/docs` and the 404 — and the canonical-canvas decision is therefore `both`. The deployed product surface (`dashboard.cohere.com`) inverts back to a near-white form canvas, completing the polarity loop. A reader navigating the brand alternates between the two states one section at a time, which is the design center.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | https://cohere.com/ | `#FFFFFF` (white) | Wordmark-tight nav, large display headline, mosaic of dark-tinted photographic cards |
| Pricing | https://cohere.com/pricing | `#FFFFFF` with `#F2F2F2` band wash | Tier cards on white, tri-color gradient stroke on featured tile, model-vault rate table |
| Command (LLM) | https://cohere.com/command | `#00211E` (deep enterprise green) | Full-bleed dark canvas for every section, hero h1 in white over green |
| Research | https://cohere.com/research | `#2D4CB9` (royal blue) | Editorial paper-listing surface with a global dot-rendered hero |
| North (agent platform) | https://cohere.com/north | `#062C22` deep-green + `#061324` navy cards | Dark hero plate, agent-console video mockup, mossy-hill photography |
| About | https://cohere.com/about | `#F0EEE9` (warm stone) | Mission band with 3D liquid-blob photography, "Our Story" editorial run |
| Careers | https://cohere.com/careers | `#F0EEE9` (warm stone) | Toronto office photography, employee-count stats |
| Blog | https://cohere.com/blog | `#FFFFFF` with thin voronoi-cell pattern | Coral-filled category pill row, post grid with cream cards |
| Docs | https://docs.cohere.com/ | `#0F0F0F` (near-black) | Three-tile entry grid in pastel-on-dark, sidebar navigation, in-page code |
| Dashboard login | https://dashboard.cohere.com/welcome/login | `#FAFAFA` (off-white form) | Forest-green primary CTA at `#39594D`, OAuth tiles, floating 3D-shape decoration |
| 404 | any unrouted path | `#0F0F0F` (near-black) | Dot-grid wash, three-shape Cohere logo cluster, white outline-pill CTA |

The cream / stone canvas, the white canvas, and the dark canvases are all primary in the sense that none of them is treated as the section break. Cards on white pages sit on white; dark cards sit on dark; the brand transitions between them without a neutral interlude.

## §2 Palette

Each entry pairs the token role with the OKLCH value rounded to four decimals (culori-verified against the round-trip hex) and the live observation that grounds it. Token names follow the two-layer contract: shadcn-semantic core values may be synthesised from the live evidence; `--brand-*` extras pull directly from observed DOM properties.

### Brand primary

- `--primary`: `oklch(0.2069 0.0098 285.5081)` (= `#17171C`). Live: https://cohere.com/ — `button.cta`, computed `background-color: rgb(23, 23, 28)` on every solid CTA across marketing pages (homepage "Request a demo", footer "AI moves fast" sign-up arrow, announcement bar background).
- `--brand-primary-press`: synthesised — Cohere does not document a separate pressed-state ladder; CTAs use `var(--foreground)` flip on hover when nested in dark cards. Same value as `--primary`.

### Documented secondary brand colours

- `--brand-coral`: `oklch(0.7248 0.1724 33.8588)` (= `#FF7759`). Live: https://cohere.com/blog — `button[data-active]` filter pill ("All"); https://cohere.com/ — "AI moves fast" footer slogan word "AI"; https://cohere.com/command — agent-console "READY" status dot on `Financial Analysis Agent` mockup.
- `--brand-coral-soft`: `oklch(0.8225 0.1005 32.9018)` (synthesised — observed only as the higher-lightness anchor of `bg-gradient-to-r from-coral-500 to-quartz-500`).
- `--brand-action-blue`: `oklch(0.5785 0.1857 268.1837)` (= `#4C6EE6`). Live: https://cohere.com/pricing — pricing-tier border-gradient terminal stop `rgb(76, 110, 230)`; https://cohere.com/blog — `"READ FULL ARTICLE →"` post-card CTA color.
- `--brand-violet-mid`: `oklch(0.5887 0.1276 284.9797)` (= `#7670C5`). Live: https://cohere.com/pricing — middle stop of the `coral → violet → blue` ribbon gradient, computed `rgb(118, 112, 197)`.
- `--brand-quartz-pink`: `oklch(0.7426 0.1373 319.3420)` (= `#D18EE2`). Live: https://cohere.com/ — `bg-gradient-to-r from-coral-500 to-quartz-500`, computed `rgb(209, 142, 226)`. A pink-leaning lavender used on the rounded-button glow gradient.
- `--brand-lavender-photo`: `oklch(0.5820 0.1272 319.2925)` (= `#9B60AA`). Live: https://cohere.com/ — "Ready to put AI to work?" closing-band lavender (sampled section `background-color: rgb(155, 96, 170)`).
- `--brand-deep-green`: `oklch(0.2230 0.0391 186.1723)` (= `#00211E`). Live: https://cohere.com/command — every `<section>` has `background-color: rgb(0, 33, 30)`. This is the marketing-band green.
- `--brand-deep-green-north`: `oklch(0.2636 0.0461 171.3884)` (= `#062C22`). Live: https://cohere.com/north — hero-band `<section> background-color: rgb(6, 44, 34)`. Sibling shade to the command-band green; about a step lighter and a touch warmer.
- `--brand-dashboard-green`: `oklch(0.4352 0.0428 168.8022)` (= `#39594D`). Live: https://dashboard.cohere.com/welcome/login — the `Log in` submit button inner pill, computed `background-color: rgb(57, 89, 77)`. This is the brand green Cohere actually deploys on the most-tapped product CTA.
- `--brand-dark-navy`: `oklch(0.1851 0.0399 255.0451)` (= `#061324`). Live: https://cohere.com/north — agent-console outer panel and feature-block bg, sampled `rgb(6, 19, 36)`.
- `--brand-research-blue`: `oklch(0.4624 0.1758 267.0077)` (= `#2D4CB9`). Live: https://cohere.com/research — full hero band `background-color: rgb(45, 76, 185)`. A darker action-blue used at full-bleed scale.
- `--brand-ready-mint`: `oklch(0.7849 0.1324 161.5567)` (= `#5DD39E`). Live: https://cohere.com/ — integration-chip `READY` indicator dot inside the Financial Analysis Agent mockup. Reserved for status-on-dark only.

### Brand gradient (the signature ribbon)

Cohere's recognizable chromatic moment is a three-stop horizontal gradient — coral → violet → action-blue — applied at 1-pixel height under animated tab indicators, as a 4-pixel-thick border-stroke on featured pricing tiles, and as a slim horizontal divider under section eyebrows. The computed gradient is `linear-gradient(to right, rgb(255, 119, 89), rgb(118, 112, 197), rgb(76, 110, 230))` (Tailwind classname `from-coral-500 via-violet-500 to-blue-500`).

A secondary two-stop variant — `from-coral-500 to-quartz-500` — renders as the photographic bubble-button highlight on the homepage CTA cluster.

### Canvas + neutrals

- `--background`: `oklch(1.0000 0.0000 —)` (= `#FFFFFF`). Live: https://cohere.com/ — `body { background-color: rgb(255, 255, 255) }`.
- `--foreground`: `oklch(0.2478 0.0000 —)` (= `#212121`). Live: https://cohere.com/ — h1 "Own your AI" `color: rgb(33, 33, 33)`. The slightly-lighter `#212121` (vs `--primary` at `#17171C`) is consistent across every CohereText display headline and every Unica77 body heading on the marketing surfaces.
- `--brand-secondary-ink`: `oklch(0.3012 0.0000 —)` (= `#2E2E2E`). Live: https://cohere.com/ — cookie-banner secondary text + topnav link hover, computed `color: rgb(46, 46, 46)`.
- `--brand-body-muted`: `oklch(0.5931 0.0000 —)` (= `#7E7E7E`). Live: https://cohere.com/north — secondary explainer paragraph below the agent-console mockup. Achromatic — Cohere does NOT tint body-muted with the cool-violet hue that the upstream `--brand-slate` carried.
- `--brand-soft-stone`: `oklch(0.9493 0.0070 88.6436)` (= `#F0EEE9`). Live: https://cohere.com/about — `<section> background-color: rgb(240, 238, 233)`. Same canvas reappears on https://cohere.com/careers.
- `--brand-form-canvas`: `oklch(0.9851 0.0000 —)` (= `#FAFAFA`). Live: https://dashboard.cohere.com/welcome/login — login surrounding canvas + input field bg.
- `--card`: `oklch(1.0000 0.0000 —)` (= `#FFFFFF`). Live: https://cohere.com/pricing — tier-card body fill.
- `--card-foreground`: `oklch(0.2478 0.0000 —)` (= `#212121`). Live: pricing-tier card body copy.
- `--popover`: `oklch(1.0000 0.0000 —)` (= `#FFFFFF`). Live: https://cohere.com/pricing — products-tooltip popover bg.
- `--popover-foreground`: `oklch(0.2478 0.0000 —)` (= `#212121`). Live: pricing-tooltip body.
- `--muted`: `oklch(0.9612 0.0000 —)` (= `#F2F2F2`) (synthesised — chosen to align with `--brand-card-border-soft`).
- `--muted-foreground`: `oklch(0.5931 0.0000 —)` (= `#7E7E7E`). Live: body-muted observation above.
- `--accent`: `oklch(0.9493 0.0070 88.6436)` (= `#F0EEE9`) — synthesised to use the warm-stone band as the surface accent.
- `--accent-foreground`: `oklch(0.2478 0.0000 —)` (= `#212121`).
- `--secondary`: `oklch(1.0000 0.0000 —)` (= `#FFFFFF`).
- `--secondary-foreground`: `oklch(0.2478 0.0000 —)` (= `#212121`).
- `--destructive`: `oklch(0.4815 0.1976 29.2339)` (synthesised — Cohere does not expose a documented error-state colour on the sampled surfaces; the value carried in tokens.css aligns with a deep brand-coral-leaning red).
- `--destructive-foreground`: `oklch(1.0000 0.0000 —)` (= `#FFFFFF`).
- `--border`: `oklch(0.9612 0.0000 —)` (= `#F2F2F2`). Live: https://cohere.com/pricing — tooltip card `border-top: 1px solid rgb(242, 242, 242)`.
- `--brand-card-border-strong`: `oklch(0.9276 0.0058 264.5313)` (= `#E5E7EB`). Live: topnav nav-link hover-state border colour on every marketing page.
- `--brand-card-border-input`: `oklch(0.8941 0.0059 264.5303)` (= `#DADCE0`). Live: https://dashboard.cohere.com/welcome/login — "Continue with Google" / "Continue with Github" tile border.
- `--input`: `oklch(0.9276 0.0058 264.5313)` (= `#E5E7EB`).
- `--ring`: `oklch(0.5785 0.1857 268.1837)` (= `#4C6EE6`) — synthesised, routed to action-blue so focus rings carry the brand-chromatic accent against the white marketing canvas.

### Polarity-locked surfaces

These tokens hold the dark-on-light or light-on-dark contrast pair regardless of theme. They do not flip with `:root` ↔ `[data-theme="dark"]`; their consumers are baked into a single canvas.

- `--brand-canvas-night`: `oklch(0.2069 0.0098 285.5081)` (= `#17171C`). Live: https://cohere.com/ — black announcement bar at the top of every marketing page, footer band on `/north` and `/customers`-404. Always-near-black on its consuming surface.
- `--brand-canvas-deep-green`: `oklch(0.2230 0.0391 186.1723)` (= `#00211E`). Live: https://cohere.com/command — `<section>` band. Polarity-locked: the band stays this green in any theme.
- `--brand-canvas-docs-black`: `oklch(0.1684 0.0000 —)` (= `#0F0F0F`). Live: https://docs.cohere.com/ — body bg.
- `--brand-on-dark`: `oklch(1.0000 0.0000 —)` (= `#FFFFFF`). Live: hero h1 on the command band, h1 on the research band, dashboard wordmark on the welcome graphic. Always-white on its consuming surface.
- `--brand-on-dark-soft`: `oklch(0.9851 0.0000 —)` (= `#FAFAFA`). Live: https://cohere.com/ — secondary "deal sizes / pipeline momentum" callout pills inside the Financial Analysis Agent mockup carry `color: rgb(250, 250, 250)`.
- `--brand-pricing-name-on-dark`: `oklch(0.7248 0.1724 33.8588)` (= `#FF7759`) — coral name on dark-tier card. The featured-tier white-stroked tile uses this colour for its tier label.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9612 0.0000 —)` (= `#F2F2F2`). Live: https://cohere.com/ — section-separator `border-top` on light bands.
- `--brand-hairline-strong`: `oklch(0.8941 0.0059 264.5303)` (= `#DADCE0`). Live: https://dashboard.cohere.com/welcome/login — input divider.
- `--brand-hairline-on-dark`: synthesised — `rgba(255, 255, 255, 0.14)` for divider on `--brand-canvas-deep-green`, `--brand-canvas-night`, `--brand-canvas-docs-black`.

### Drift vs `tokens.css`

The frozen `tokens.css` at the time of this verification carries several values that did not match the live-observed brand. Each is recorded here with the live evidence and a reconciliation suggestion. The intent is not to edit `DESIGN.md` after the fact — it is to surface the gap so the next `tokens.css` revision aligns with what Cohere actually ships.

| Token | `tokens.css` value | Live observation | Reconciliation |
|---|---|---|---|
| `--brand-deep-green` | `oklch(0.3189 0.0583 178.8960)` ≈ `#36544D` | `/command` band is `#00211E` = `oklch(0.2230 0.0391 186.1723)`; dashboard CTA is `#39594D` ≈ `oklch(0.4352 0.0428 168.8022)` | The token name "deep-green" sits between two real brand greens. Split into `--brand-deep-green` (marketing band, `#00211E`) and `--brand-dashboard-green` (product CTA, `#39594D`) so the preview can pull the right one per surface. |
| `--brand-action-blue` | `oklch(0.5310 0.1985 260.2463)` | Live blue is `#4C6EE6` = `oklch(0.5785 0.1857 268.1837)` (hue 268 not 260) | Update to the lighter-lifted, slightly-more-violet hue. The 8-degree hue shift reads as warmer-violet vs cooler-blue on the gradient ribbon. |
| `--brand-soft-stone` | `oklch(0.9432 0.0070 88.6440)` ≈ `#EFEBE2` | `/about` + `/careers` surface is `#F0EEE9` = `oklch(0.9493 0.0070 88.6436)` | Lift by ~0.006 L. Cosmetic but visible against a side-by-side. |
| `--brand-dark-navy` | `oklch(0.2044 0.0412 250.1540)` | `/north` card surface is `#061324` = `oklch(0.1851 0.0399 255.0451)` | Slight darken + hue rotate. The live navy is cooler and deeper. |
| `--brand-slate` | `oklch(0.5200 0.0321 285.3362)` (patched for AA) | Body-muted on live pages is `#7E7E7E` = `oklch(0.5931 0.0000 —)` — pure neutral, no chroma | The patched cool-violet tint isn't observed on the brand; Cohere uses an achromatic mid-gray for body-muted. The current patched form fights for AA against white; the live form already passes AA at `#7E7E7E` (5.06:1 vs white). |
| `--brand-form-focus` | `oklch(0.5820 0.1272 319.2925)` | This OKLCH value appears in the wild as the `Ready to put AI to work?` closing-band lavender `#9B60AA`, NOT as a form-focus colour | Rename to `--brand-lavender-photo`. Cohere doesn't surface a chromatic form-focus colour; the live focus indicator on dashboard inputs is the cooler `--brand-action-blue`. |
| (missing) | — | The tri-color `coral → violet → action-blue` gradient is the brand's signature recurrence (tab indicator, pricing-tier stroke, eyebrow divider) | Introduce `--brand-gradient-ribbon` as a documented gradient utility, not just three loose stops. |
| (missing) | — | `--brand-research-blue` `#2D4CB9` is a full-bleed band surface not currently in the token set | Add `--brand-research-blue`. |
| (missing) | — | `--brand-canvas-docs-black` `#0F0F0F` is the docs canvas | Add `--brand-canvas-docs-black`. |
| (missing) | — | `--brand-ready-mint` `#5DD39E` is the status-on-dark accent inside the agent console | Add `--brand-ready-mint`. |
| (missing) | — | `--brand-quartz-pink` `#D18EE2` shows up as the warm anchor of the `from-coral-500 to-quartz-500` two-stop gradient | Add `--brand-quartz-pink`. |

`--brand-cohere-black`, `--brand-pale-green`, `--brand-pale-blue`, `--brand-border-light`, `--brand-card-border`, `--brand-coral`, and `--brand-coral-soft` all match live observation closely enough to keep. The `--font-display` token correctly points at `CohereText`, which is the live brand's proprietary display family.

## §3 Typography

Cohere ships three proprietary families plus a fallback stack. Each family has a distinct surface role; mixing them is how the brand modulates display vs. body voice.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (marquee h1) | `CohereText`, fallback `"Space Grotesk", Inter, ui-sans-serif` | 400 | 72px (most h1) / 96px (homepage marquee) | 1.0 (96px lh on a 96px font) | -0.02em (-1.92px at 96px) |
| Heading (h2/h3) | `Unica77 Cohere Web` | 400 | 32px (h2) / 48px (h3) | 1.2 | -0.01em |
| Title | `Unica77 Cohere Web` | 500 | 18–22px | 1.4 | normal |
| Body | `Unica77 Cohere Web` | 400 | 16px | 1.5 (24px lh) | normal |
| Caption / eyebrow | `Unica77 Cohere Web` (uppercase tracked) | 500 | 12–14px | 1.4 | +0.08em uppercase |
| Mono / code | system stack `ui-monospace, SFMono-Regular, Menlo, Monaco` (no proprietary mono in the brand) | 400 | 12–14px | 1.5 | normal |
| Blog wordmark | `CohereVariable` | 400 | 40px | 1.1 | normal |

Notes on the families:

- **CohereText** is reserved for the largest marquee headline on each major surface. The homepage uses it at 96px, every "feature h1" (`/command`, `/north`, `/research`, `/about`) at 72px, and the blog post hero at 40px. Section h3s on the homepage (e.g. "Our models. Your business.", "Safe. Flexible. Independent.") drop back to `Unica77 Cohere Web` even though they read at display-scale 48px.
- **Unica77 Cohere Web** carries everything outside the display layer — body, secondary headings, button labels, eyebrows, footer columns. The brand reads as quietly-precise because the same family does so much work.
- **CohereVariable** appears as a third axis on `/blog`: the wordmark "The Cohere Blog" renders in a variable-axis cut that reads narrower than `CohereText`. It's not surfaced elsewhere on the sampled pages, so the design system effectively reserves it for editorial wordmarks.
- Eyebrows ("OUR MISSION", "NORTH", "OUR STORY", section labels) are set in `Unica77 Cohere Web` uppercase at 12px with +0.08em tracking. Not in a mono font — that's a CohereText / Unica77 distinction the brand never blurs.

## §4 Component vocabulary

### topnav

**Status:** `current`
**Live source:** https://cohere.com/ — `<nav>` immediately under the announcement bar
**Description:** 76px tall, white background, full-width with a `1280px` content max-width and 1.5rem horizontal padding. Left: cohere wordmark in `Unica77` weight 400, color near-black `#000`. Center: five primary nav items (Products / Solutions / Research / Resources / Company) at 14px / weight 400, color black. Right: text "Sign in" link plus a near-black rounded-pill primary CTA ("Request a demo"). The nav slots are spaced via `gap: 1.5rem`, not justified.
**States:** `default` — black text on white; `hover` — text color `rgb(46, 46, 46)` (`--brand-secondary-ink`); no underline; no active-state styling on link items.

### topnav (on dark canvas)

**Status:** `current`
**Live source:** https://cohere.com/command — same nav structure on a deep-green band
**Description:** Same 76px height, same layout. Wordmark and links flip to white. CTA pill inverts: white fill with near-black `#17171C` text.
**States:** `default` — white text; `hover` — text color `rgba(255, 255, 255, 0.8)`.

### announcement bar

**Status:** `current`
**Live source:** https://cohere.com/ — top strip "Command A+. Our fastest, most powerful language model yet — available open-source. Learn more ×"
**Description:** Full-width strip above the nav. Background `--primary` near-black `#17171C`. Centered Unica77 body text in white. A "Learn more" inline link uses underlined white. Dismiss "×" floats right.
**States:** `default` — black/white; `dismissed` — strip removed entirely, no animation back.

### button — primary (rounded pill, on light)

**Status:** `current`
**Live source:** https://cohere.com/ — "Request a demo" in topnav + hero
**Description:** Pill 999px radius. Padding `8px 24px`. Font Unica77 weight 500, size 14–16px, color white. Background `--primary` `#17171C`. Border `2px solid transparent`. Minimum height around 40–44px depending on context (nav vs hero).
**States:** `default` — black fill, white text; `hover` — fill stays black, but a subtle `rgb(46, 46, 46)` undercolor lifts the contrast (no scale, no opacity change); `focus-visible` — no native ring observed (Cohere relies on outline removal). Touch target ~40px.

### button — outline pill

**Status:** `current`
**Live source:** https://cohere.com/pricing — "Request a demo" on tier cards
**Description:** Same 999px pill shape. White fill (`--background`), 1px solid border `rgb(46, 46, 46)` (`--brand-secondary-ink`), near-black text. Padding `8px 24px`.
**States:** `default` — outline state; `hover` — fill turns near-black with white text (inverts to primary).

### button — text link

**Status:** `current`
**Live source:** https://cohere.com/ — "Explore products" next to the hero CTA cluster
**Description:** No fill, no border. Underlined Unica77 weight 500, size 16px, color near-black. The underline sits 3px below the baseline.
**States:** `default` — underlined; `hover` — underline thickness 2px instead of 1px.

### button — text link with arrow

**Status:** `current`
**Live source:** https://cohere.com/blog — "READ FULL ARTICLE →" on each post card
**Description:** Tracked uppercase Unica77 weight 500, +0.08em letter-spacing. Color is `--brand-action-blue` `#4C6EE6`. A unicode arrow (`→`) appears 0.5rem after the label.
**States:** `default` — blue with arrow; `hover` — arrow translates 4px right with a 120ms transition.

### button — submit (forest green, on dashboard)

**Status:** `current`
**Live source:** https://dashboard.cohere.com/welcome/login — `Log in` button
**Description:** A two-cell composition. Left cell: pill-rounded forest-green `rgb(57, 89, 77)` fill with the label "Log in" in white. Right cell: a smaller adjacent square holding an arrow icon, same green. Total height ~40px, total width ~131px. The cell-style construction comes from a `CellButton` component pattern.
**States:** `default` — forest-green fill; `disabled` — opacity 0.4, cursor not-allowed.

### category tab indicator

**Status:** `current`
**Live source:** https://cohere.com/pricing — "Workplace systems / Generative models / Advanced retrieval models" tab strip
**Description:** Plain text labels (Unica77 weight 400, size 16px) sitting on white. The selected tab gets a 1px-tall animated underline that fades in from width 0; the underline is the brand-ribbon gradient `linear-gradient(to right, coral → violet → blue)` rather than a solid color.
**States:** `default` — text only; `active` — gradient underline expanded to label width; transition 300ms ease-in-out on `width`.

### category pill (filled)

**Status:** `current`
**Live source:** https://cohere.com/blog — "All" filter chip at the top of the post grid
**Description:** Coral-filled rounded chip (radius ~12px). Background `--brand-coral` `#FF7759`. Label color near-black. Padding `8px 16px`. Adjacent inactive pills render as outlines (coral 1px border on transparent fill, coral text).
**States:** `default` — outline coral; `active` — solid coral fill with near-black text.

### post-card tag (outline)

**Status:** `current`
**Live source:** https://cohere.com/blog — small "COMPANY" tag below the post title
**Description:** Uppercase tracked Unica77 label inside a coral-outline pill. Background transparent, border 1px solid `--brand-coral`, color near-black. Font size 12px, padding 4px 8px.
**States:** `default` — outline only; no hover (it's a label, not a link).

### eyebrow label (uppercase tracked)

**Status:** `current`
**Live source:** https://cohere.com/about — "OUR MISSION" / "OUR STORY"
**Description:** Unica77 (not a monospace, despite the technical-looking tracking) uppercase, weight 500, size 12px, +0.08em letter-spacing, color near-black. Always sits one row above a display headline.

### gradient ribbon divider

**Status:** `current`
**Live source:** https://cohere.com/pricing — between FAQ items, between feature sections
**Description:** A 1px-tall, full-width horizontal strip rendered as the brand ribbon gradient `linear-gradient(to right, rgb(255, 119, 89), rgb(118, 112, 197), rgb(76, 110, 230))`. No solid color fallback.

### pricing tier card (white, outline-stroke)

**Status:** `current`
**Live source:** https://cohere.com/pricing — "North" tier card
**Description:** 440px max-width white card with a 12px outer radius. The outer ring is drawn by a parent `div` carrying the brand-ribbon gradient as its background and a 1px inner margin (`-m-0.5`) so the gradient bleeds 2px outside the card on every edge — effectively a gradient stroke without a CSS gradient-border hack. Card body padding 32px; tier name in CohereText 36–40px (or Unica77 weight 500 depending on tier); price + tagline + bullet list + CTA pill.
**States:** `default` — gradient stroke visible; `inactive` (other tiers) — a thin neutral border `rgb(229, 231, 235)` only.

### pricing rate-table row

**Status:** `current`
**Live source:** https://cohere.com/pricing — "Model Vault" section table
**Description:** Four-column layout: Model name (bold Unica77), Performance Tier, Hourly rate per instance, Monthly rate per instance. Header row uses the brand-ribbon gradient as a 2px-tall underline. Each subsequent row gets a 1px `--brand-hairline-soft` divider. No row hover.

### card (photo-on-canvas tile)

**Status:** `current`
**Live source:** https://cohere.com/ — "Powering progress across industries" cards (Financial Services, Public Sector, Energy, Tech)
**Description:** Full-bleed photographic tile, no border, no padding around the image. Title appears as white text in the top-left of the photo with a subtle dark gradient fade behind it. Tile radius 8px. Carousel-style: tiles are positioned in a horizontally-scrollable row with arrow controls at the top-right of the section.

### feature-callout (centered, no background)

**Status:** `current`
**Live source:** https://cohere.com/ — "Safe. Flexible. Independent." three-column section
**Description:** Three columns, each centered. Top: a line-icon SVG inside an 80px square (no background fill). Title in Unica77 weight 400, 32px, near-black. Body paragraph in Unica77 weight 400, 16px, `--brand-body-muted`. Below the body: a "Learn more →" text link (same as button — text link with arrow).

### testimonial card (Fujitsu)

**Status:** `current`
**Live source:** https://cohere.com/ — "Why leading teams trust Cohere" section
**Description:** Two-pane layout. Left pane: white card with a brand logo lock-up at the top (e.g. Fujitsu wordmark), the quote in CohereText display weight (around 32px), the byline ("— Vivek Mahajan, Corporate Vice President, CTO and CPO"), and a "Read more ↗" outbound link. Right pane: a full-bleed photograph cropped tall. The two panes share a single rounded border (`1px solid --border`) and a 22px outer radius; the photo bleeds inside the radius.
**States:** `default` only — the carousel changes the whole card, not just states inside it.

### agent console mockup (Financial Analysis Agent)

**Status:** `current`
**Live source:** https://cohere.com/ — homepage signature card (in the dark/photographic band below the hero)
**Description:** A near-black `#0F0F0F` panel sitting inside a chromatic-aberration photographic backdrop (purple/sage/copper mineral shapes). Header row: a 40px `F` avatar square (white bg, near-black letter) and the agent name "Financial Analysis Agent" in white. Three integration chips in a row: each chip is a 40px-tall rounded pill with a brand logo (Folder / Google Drive / Slack), a green dot, and the word "READY" in uppercase tracked Unica77, all on a darker-than-panel chip fill `rgba(255, 255, 255, 0.08)`. Below: a single-line input "Start a chat" / "Help me understand" with a return-key icon button on the right.

### agent console (video, on dark green)

**Status:** `current`
**Live source:** https://cohere.com/north — "AI for business that turns complexity into clarity" hero video mockup
**Description:** A wider 800x600px-scale dark-green panel embedded into the mossy-hill photographic background. Left rail: a 64px-wide column of monochrome icon buttons in white. Center-left: a "Job Description Creation Agent" panel with a left-bordered green H avatar and chat turns. Right: a "Account Executive – Technology" job-detail panel with sage-mint "Version 1 ▼" and "Export ▼" pills. Bottom: a transcript control bar with play/pause, scrubber, time, mute, fullscreen.

### card — content tile (warm-cream stack)

**Status:** `current`
**Live source:** https://cohere.com/blog — post tile in the "Recent" grid
**Description:** Top 60% of the card carries a header-photograph; bottom 40% switches to warm-stone `#F0EEE9` fill. Tile radius 22px on the top corners, 0 on the bottom. Within the bottom panel: byline "Cohere Team – Aug 06, 2025" (uppercase tracked), post title in Unica77 weight 400 size 22px, post excerpt in body-muted, "READ FULL ARTICLE →" text link in action-blue.

### doc-entry card (pastel-on-dark)

**Status:** `current`
**Live source:** https://docs.cohere.com/ — three-tile entry grid ("Guides and concepts", "API reference", "Release notes")
**Description:** Three side-by-side cards on a `#0F0F0F` canvas. Card body bg `#0F0F0F` (matches canvas). Inside each card: a 350x180px illustrated header tile in a saturated pastel — terracotta-coral, sage-green, or lavender-violet — containing a small abstract line illustration. Below the illustration: card title in white Unica77 weight 400 32px, two-line body in `rgba(255, 255, 255, 0.7)`, and a "GET STARTED →" link in `--brand-action-blue`.

### docs sidebar nav

**Status:** `current`
**Live source:** https://docs.cohere.com/ — left-rail navigation
**Description:** 240px-wide column on the dark canvas. Section labels in uppercase tracked Unica77 size 11px in mid-gray. Page links in Unica77 weight 400 size 14px white. Active page has a faint white-overlay highlight `rgba(255, 255, 255, 0.06)` and a 2px left-bar accent in `--brand-coral` (terracotta).

### docs page-content surface

**Status:** `current`
**Live source:** https://docs.cohere.com/ — main content column
**Description:** Same `#0F0F0F` canvas. Body text white. H1 36px Unica77 weight 400. Inline code in `rgba(255, 255, 255, 0.08)` chip with monospace font, 4px radius. Code blocks in `#000000` with syntax-highlighted tokens (purple keywords, mint strings, white identifiers).

### docs `v2 API` selector

**Status:** `current`
**Live source:** https://docs.cohere.com/ — top-left of the docs nav
**Description:** A small pill-shaped dropdown next to the "cohere docs" wordmark. White outline, mid-gray fill `rgba(255, 255, 255, 0.06)`, label "v2 API" with a chevron. 32px tall.

### login form / OAuth tile

**Status:** `current`
**Live source:** https://dashboard.cohere.com/welcome/login — "Continue with Google" / "Continue with Github"
**Description:** Two stacked side-by-side white tiles. Each tile: 4px radius (NOT the marketing 999px pill — the dashboard uses a tighter, more enterprise-tool radius), 1px `#DADCE0` border, 40px tall, padding `8px 12px`. Left: brand logomark (Google color G, GitHub mark). Center-left: label "Continue with Google" or "Continue with Github". Text Unica77 weight 400 14px, color `#212121`.

### input — labeled card field

**Status:** `current`
**Live source:** https://dashboard.cohere.com/welcome/login — Email + Password stack
**Description:** Two stacked fields rendered as one card. Background `#FAFAFA`. Border 1px `rgb(189, 189, 189)`. Internal divider between Email and Password. Each field carries a small uppercase tracked label ("EMAIL" / "PASSWORD"), 60px overall height, the value entry below in body-size text. Password field has a trailing eye toggle on the right edge.

### 3D-shape decoration

**Status:** `current`
**Live source:** https://cohere.com/about, https://dashboard.cohere.com/welcome/login, https://cohere.com/ (cluster after error pages)
**Description:** Cohere's recurring decorative motif: a cluster of 3–7 chromatic-rendered 3D shapes (coral, copper, soft-pink lavender, magenta, cobalt-blue, teal, ash-gray) floating in a constellation. The shapes have visible grain texture and chromatic-aberration edges. They appear at the right margin of forms (login), in 404 surfaces, in About-page mission bands, and as photographic source for the homepage hero gradient.

### footer (dark band)

**Status:** `current`
**Live source:** https://cohere.com/ — page bottom
**Description:** Near-black `#17171C` band, 5–6 columns wide. Column 1: "AI moves fast" slogan in CohereText with the word "AI" in coral; followed by a thin email-newsletter input (`Enter your email →`) with a coral right-arrow submit. Columns 2–6: link lists titled "Products", "Solutions", "Resources", "Company". Footer base row: copyright + "Privacy / Terms of Use / Manage Cookies / English ↓" cluster + social-icon row (LinkedIn / Discord / X / Email).

### customer-logo strip

**Status:** `current`
**Live source:** https://cohere.com/ — "Trusted by industry leaders and developers worldwide" row
**Description:** Five logos in greyscale (Accenture / BambooHR / stc / Oracle / Dell Technologies) and a second carousel with Oracle / Dell / RBC / LG CNS / Fujitsu visible after scroll. White canvas, single line, centered title above in Unica77 weight 400 16px gray.

### 404 page

**Status:** `current`
**Live source:** https://cohere.com/customers (any 404-routed path)
**Description:** Full-bleed `#0F0F0F` canvas with a faint white dot-grid texture (4px dot spacing). Centered eyebrow "404 ERROR" in uppercase tracked Unica77. Below: hero headline "Oops! Page lost in training data shuffle." in CohereText 60px white. To the right of the headline: the three-shape Cohere logo cluster (forest-green pill, coral circle, lavender circle). Below: white outline-pill CTA "Go back home".

### scroll-indicator (carousel progress)

**Status:** `current`
**Live source:** https://cohere.com/ — under industry-card carousel
**Description:** Two stacked bars. Top bar: the brand ribbon gradient `coral → violet → blue` showing the active range. Bottom bar: thin neutral `#E5E7EB` showing the inactive remainder. Both bars span a fixed width centered on the page. The active bar shifts left/right as the user scrolls the carousel.

### closing CTA band (chromatic-photo)

**Status:** `current`
**Live source:** https://cohere.com/ — "Ready to put AI to work?" band above the footer
**Description:** Full-bleed band with the lavender-photographic background (`--brand-lavender-photo` `#9B60AA` carrying the rendered-bubble image). Centered hero headline in Unica77 weight 400 60px white. Below: a white-fill rounded-pill "Request a demo" CTA with near-black text.

### floating cookie / consent card

**Status:** `current`
**Live source:** any cohere.com page (first visit)
**Description:** Bottom-right rounded card (radius 16px), white fill, `1px solid #F2F2F2` border, ~16px shadow. Internal layout: descriptive paragraph in Unica77 weight 400 14px, a "Privacy Policy" inline link, an "Accept all" near-black pill + a "Reject optional" white outline pill side-by-side, and a smaller "Show more" link in coral. The "Settings" trigger renders as a text-link in `--brand-secondary-ink`.

### subscribe input (footer)

**Status:** `current`
**Live source:** https://cohere.com/ — footer, "We'll keep you up to date with the latest"
**Description:** A single-line input on the dark footer band. No border, just a 1px white bottom-rule. Placeholder "Enter your email" in `rgba(255, 255, 255, 0.5)`. A coral right-arrow icon-button sits on the right edge of the rule.

## §5 Surface inventory

The URLs sampled in this verification cycle, with a one-line note on what each contributed.

- https://cohere.com/ — primary anchor for the white marketing canvas, the announce bar, the topnav (light variant), the Financial Analysis Agent dark-panel signature card, the customer-logo strip, the "Powering progress across industries" carousel, the lavender-photo closing CTA band, and the dark footer.
- https://cohere.com/pricing — light editorial canvas with the gradient-stroke tier cards, the rate table with the ribbon header, the FAQ disclosure list with ribbon dividers, and the workplace-systems tab strip with animated ribbon underline.
- https://cohere.com/command — full-bleed deep-green band (`#00211E`) for every section. Anchor for the marketing dark-band variant and for how the brand handles white-on-dark-green type.
- https://cohere.com/research — full-bleed royal blue band (`#2D4CB9`) with the dot-rendered globe motif. Establishes blue as a third primary band canvas distinct from green and near-black.
- https://cohere.com/north — deep-green hero on top of mossy-hill photography plus a navy-card stack (`#061324`) below. Hero anchors the in-page agent video mockup, which doubles as the dashboard / product-surface vocabulary.
- https://cohere.com/about — warm-stone canvas (`#F0EEE9`), 3D-blob photographic decoration, "OUR MISSION" + "OUR STORY" editorial run with stat numerals.
- https://cohere.com/careers — same warm-stone canvas, full-bleed Toronto-office photograph, stat numerals in mixed muted-violet / coral colors, "View open roles" near-black CTA.
- https://cohere.com/blog — voronoi-cell pattern hero, coral-filled category pills, mixed-radius photo-on-cream post tiles, action-blue "READ FULL ARTICLE" links.
- https://docs.cohere.com/ — near-black canvas (`#0F0F0F`), pastel-on-dark entry tiles, dark sidebar with coral active-bar accent, inline code chips, action-blue "GET STARTED" links.
- https://dashboard.cohere.com/welcome/login — off-white form canvas, forest-green cell-button submit, 4px-radius OAuth tiles, labeled input cards, 3D-shape decoration. The only deployed product-surface in the sample (everything else is marketing).

Unreachable / not sampled this cycle: any signed-in dashboard surfaces (workspace, model playground, billing), full Research papers list (only the hero band sampled), older blog post pages, the LLM University surface, on-demand events.

## §6 Notes

- **Polarity is multi-section, not multi-mode.** Cohere is not a "site with a dark-mode toggle." The same surface stays in the same polarity on every visit. The brand handles dark-vs-light by alternating canvases section-by-section: white marketing → deep-green product band → cream editorial → near-black footer. A preview shell that swaps into a synthesised dark mode misrepresents the brand; preserve the canvas-locked surfaces (the deep-green band, the near-black footer, the docs canvas) and let only the editorial body flip with theme.
- **The signature is the ribbon, not the band.** Earlier framings landed on "white-and-deep-green" as the brand identity. The live evidence is denser: the brand-identifying chromatic moment is the `coral → violet → action-blue` gradient ribbon, which appears as the tab underline, the pricing-card stroke, the FAQ divider, and the carousel progress. Use this gradient as the recurring brand mark across the preview rather than committing to a single deep-green band.
- **Three display families.** `CohereText` (marquee h1), `Unica77 Cohere Web` (everything else including 48px h3s), and `CohereVariable` (blog wordmark) are not interchangeable. The preview's prior `JetBrains Mono` substitution conflated CohereText with a "mono-feeling" choice; CohereText is not monospaced. Substitute with a contemporary humanist sans like `Inter` or `Geist Sans` for `CohereText`, not a mono.
- **Coral is a fill, not a text colour.** Across all sampled surfaces, coral `#FF7759` appears as: a category-pill fill, an active-state dot, a footer-section eyebrow color, a status indicator, and a logo shape. It never carries body or button text on any sampled page. Routing the preview's body-coral text to the action-blue is the brand-faithful move.
- **Action-blue is the only link color.** In-body links across `/blog`, `/docs`, and the homepage footer all resolve to `--brand-action-blue` `#4C6EE6`. Near-black text-with-underline links (the marketing topnav and hero "Explore products") are not in-body links — they're CTA-affordance text. Don't mix the two.
- **Dashboard green ≠ marketing green.** The brand has two production greens: `--brand-deep-green` `#00211E` (the marketing band on `/command`) and `--brand-dashboard-green` `#39594D` (the actual button-fill on `dashboard.cohere.com`). Earlier `tokens.css` revisions blended them into one `#36544D` value; the live brand keeps them separate. A pricing-tier featured-tile dark variant should use `--brand-deep-green`; a product-CTA primary submit should use `--brand-dashboard-green`.
- **3D blob photography is brand-load-bearing.** The same Cohere visual signature reappears as: the homepage "Ready to put AI to work?" lavender closing band, the dashboard-login decoration shapes, the 404-page logo cluster, and the About-page mission collage. The preview should reserve at least one decorative slot for a "3D-shape constellation" treatment to read as Cohere rather than as a generic light-canvas enterprise site.
- **Brand-X lift content to avoid when authoring previews:** Cohere model names (Command A+, Command R+, Embed v4, Rerank 3.5, Aya), proprietary product names (North, Compass, LLMU, Model Vault), specific customer logos (Fujitsu, Accenture, BambooHR, stc, Oracle, Dell, RBC, LG CNS), the "Cohere Team" byline format, and the verbatim slogans ("Own your AI", "AI moves fast", "Ready to put AI to work?"). Use Halcyon-themed neutral SaaS-team content with brand-X-shape mockups instead.

## §Known gaps

- **Signed-in dashboard surfaces.** The dashboard root requires SSO/email-login; only the welcome / login screen is publicly reachable. The actual workspace, model playground, billing settings, and team-management surfaces are gated. A future verification cycle with credentials would round out the dark-on-light product-surface vocabulary that was inferred here from the login page alone.
- **Mobile-only surfaces.** Sampling was done at 1280–1440px desktop widths. The mobile nav drawer, the mobile pricing-tier carousel, and the mobile carousel-touch interactions for the industries row are unverified.
- **Region-locked / cookie-walled fragments.** First-load on every cohere.com page traps the bottom-right cookie card. A long-running visit would surface in-flow cookie callouts and consent settings panels that this cycle did not exercise.
- **Customer story pages.** `/customers` returned 404 at sample time (the route appears to have been retired or moved). The "Why leading teams trust Cohere" testimonial card (Fujitsu / Oracle / etc.) is the only customer-story surface reached. A re-verification with a working customer-page URL would help anchor the testimonial-tile vocabulary further.
- **Research paper listing + reader.** Only the `/research` hero band was sampled. The actual paper-listing grid and paper-detail surfaces below the hero were not scrolled into view this cycle.
- **Hover and focus-visible documentation.** Most components are documented in their `default` and `active` states. Cohere's focus-ring style is inconsistent across the marketing surfaces — many buttons inherit `outline: none` without a replacement — so a clean focus-state catalog would require deeper interactive sampling.
