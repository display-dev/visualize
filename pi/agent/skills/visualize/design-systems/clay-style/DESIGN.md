---
slug: clay-style
name: Clay
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://www.clay.com/
  - https://www.clay.com/pricing
  - https://www.clay.com/customers
  - https://www.clay.com/blog
  - https://www.clay.com/careers
  - https://university.clay.com/
canonical-canvas: light
selection:
  mood: [playful, tactile]
  tone: [friendly, optimistic]
  formality: low
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a friendly, optimistic register with playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

---

# Clay

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing homepage | `https://www.clay.com/` | `oat-100` `#f9f8f6` (warm cream) | Page-level canvas is oat-100, NOT pure white. White cards sit on top of it. Subtle paper-texture overlay on the hero card. |
| Pricing | `https://www.clay.com/pricing` | `oat-100` `#f9f8f6` | Same canvas; pricing cards are saturated colored header bands on `oat-100` card bodies. |
| Customer stories | `https://www.clay.com/customers` | white (`#ffffff`) on `oat-100` | Hero h1 carries a green-underline-inline-link accent inside the headline ("**GTM alpha with Clay**" with green underline on "Clay"). |
| Blog (`/blog`) | `https://www.clay.com/blog` | white (`#ffffff`) | Editorial register — h1 in **Canela** serif (`font-weight: 300`, `font-size: 64px`). Roobert is replaced as the display family here. |
| Careers | `https://www.clay.com/careers` | white (`#ffffff`) over `oat-100` | Largest display size observed (`82.66px`, Roobert 600). Rainbow strip element runs along the top edge of the page. |
| Clay University (was docs) | `https://university.clay.com/` | `oat-100` `#f9f8f6` | `docs.clay.com` 301-redirects to `university.clay.com`. h1 weight is **650** at 48px — Clay uses variable-weight Roobert and the docs/university surface picks a custom in-between weight. |

Dark mode is not implemented. Setting `data-theme="dark"`, adding `.dark`, or matching `prefers-color-scheme: dark` produces no theme swap — the canvas stays oat-100 and the foreground stays black. Clay is a **single-polarity light brand**.

## §2 Palette

Clay ships a documented design system named **loam** (see `--loam---web-library_*` and `--_swatches---color--*` custom properties on every page). The catalog's previously-recorded names ("pink, teal, lavender, peach, ochre, mint, coral") are not the brand's actual vocabulary. The brand-documented swatch families are **blueberry**, **dragonfruit**, **matcha**, **ube** (purple — named after the Filipino purple yam), **tangarine** (sic — the brand consistently misspells "tangerine" in the `--_swatches---color--*` family; the parallel `--loam---web-library_terra-swatches--tangerine` family uses the correct spelling), **slushie**, **lemon**, **pomegranate**, **lime**, **oat**, **grey**.

Each colour family ships an 11-step ladder (`50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`). Below are the values observed in deployed surfaces; full hex round-trips through culori are confirmed.

### Brand primary

- `--primary`: `oklch(0 0 0)` (= `#000000`). Live: `clay.com/` — primary CTA "Start building for free" pill, `<a class="btn">` with `background-color: rgb(0, 0, 0)`. Clay's primary action is **near-pure black**, not a chromatic brand colour. The brand-colour palette below is used as **surface fills** on feature cards / pricing-tier headers / testimonial cards / stat callouts, never as the primary CTA fill.

### Documented secondary brand colours

The loam palette is a multi-hue saturated set. Each entry is observed at full chroma on a deployed surface.

- `--brand-accent-blueberry-400`: `oklch(0.7142 0.1521 249.27)` (= `#4ca8fd`). Live: `clay.com/` — pricing-card "Free" header band (`pricing_card-body cc-top`).
- `--brand-accent-blueberry-500`: `oklch(0.6139 0.1985 254.62)` (= `#0382f7`). Live: `--_swatches---color--blueberry-500` declared on `:root`; consumed for inline link underline highlight in the hero subhead ("iterable workflows" sub-accent renders at this hue on hover).
- `--brand-accent-blueberry-600`: `oklch(0.5346 0.1920 257.70)` (= `#0667d9`). Live: `clay.com/` — "AI conditional logic" homepage feature card (`u-bg-blueberry-600`).
- `--brand-accent-matcha-600`: `oklch(0.5578 0.1327 156.34)` (= `#078a52`). Live: `clay.com/` — testimonial card (`u-bg-matcha-600 u-text-white`).
- `--brand-accent-matcha-700`: `oklch(0.4586 0.1086 156.92)` (= `#02693e`). Live: `clay.com/` — "Destinations" homepage feature card (`u-bg-matcha-700`), pricing "Launch" tier header band.
- `--brand-accent-dragonfruit-800`: `oklch(0.5588 0.2310 349.85)` (= `#cc0687`). Live: `clay.com/pricing` — "Growth" pricing-tier header band (with "Recommended" pill).
- `--brand-accent-dragonfruit-900`: `oklch(0.4222 0.1740 349.18)` (= `#8b045c`). Live: `clay.com/` — "AI formatting" homepage feature card with deep-magenta fill.
- `--brand-accent-ube-600`: `oklch(0.5350 0.2550 291.98)` (= `#7934f0`). Live: `clay.com/customers` — stat-callout card (`cs-cta-_img-aspect`) `1000+ / Verified addresses per month`.
- `--brand-accent-ube-400` (`#6d4cd6`) variant: `oklch(0.5470 0.2070 287.50)` (≈ derived from `--loam---web-library_swatches---ube--400`). Live: `clay.com/pricing` — "Enterprise" tier header band.
- `--brand-accent-tangarine-600`: `oklch(0.6921 0.1973 45.18)` (= `#fa6900`). Live: `clay.com/customers` — stat-callout card `One platform / Consolidated multiple data sources...`.
- `--brand-accent-tangarine-700`: `oklch(0.5722 0.1616 40.89)` (= `#c34e1b`). Live: `clay.com/` — Sendoso testimonial card (`u-bg-tangarine-700`).
- `--brand-accent-lemon-600`: `oklch(0.8051 0.1665 74.83)` (= `#fdad15`). Live: `clay.com/` — the compliance-badge "SOC 2 TYPE II", "GDPR", "CCPA", "ISO 27001", "ISO 42001" flower-shape SVGs (orange-amber petals on a lemon-yellow core).
- `--brand-accent-pomegranate-600`: `oklch(0.5891 0.2097 15.07)` (= `#dd2c53`). Live: `clay.com/` — Coverflex / Tropic testimonial cards (`u-bg-pomegranate-600`).
- `--brand-accent-slushie-900`: `oklch(0.4280 0.0807 224.41)` (= `#005870`). Live: `clay.com/` — OpenAI / Vanta testimonial cards (`u-bg-slushie-900`).
- `--brand-accent-slushie-500`: `oklch(0.8070 0.1347 221.21)` (= `#3bd3fd`). Live: `clay.com/` — testimonial card `cc-logo-testimonial` light-cyan fill.
- `--brand-accent-lime-300`: `oklch(0.8437 0.1875 114.11)` (= `#cbd810`). Live: `clay.com/` — testimonial cards (Keith Jones / GTM Systems Lead, Stevie Case / CRO) with vivid yellow-green fill, and the final-CTA closing band "Turn your growth ideas into reality today" surface stripe.

### Canvas + neutrals

- `--background`: `oklch(0.9793 0.0029 84.56)` (= `#f9f8f6`, loam `oat-100`). Live: `clay.com/` — `document.body` background. The brand-documented page canvas; warm with a hair of yellow (chroma ~0.003).
- `--foreground`: `oklch(0 0 0)` (= `#000000`). Live: `clay.com/` — body text, h1 colour. Clay foreground is pure black, not the off-black some other warm-canvas brands use.
- `--card`: `oklch(1 0 0)` (= `#ffffff`). Live: `clay.com/` — the hero card and the central card container that holds the H1 sit on pure white, not on oat-100.
- `--card-foreground`: `oklch(0 0 0)` (= `#000000`). Live: same as `--foreground`.
- `--popover`: `oklch(1 0 0)` (= `#ffffff`). Live: nav-mega menu surfaces and dropdown panels are white.
- `--popover-foreground`: `oklch(0 0 0)` (= `#000000`). (synthesised — popover content elements compute to `rgb(0,0,0)` like body text)
- `--muted`: `oklch(0.9605 0.0067 97.35)` (= `#f3f2ed`, loam `oat-200`). Live: `clay.com/` — "Get a demo" secondary CTA in the top nav (`u-bg-oat-200`), pricing-page toggle pill background, search-input chrome.
- `--muted-foreground`: `oklch(0.5635 0.0130 84.59)` (= `#79756d`). Live: `clay.com/` — section eyebrows ("BY TEAM", "BY STAGE") computed colour. A warm mid-gray with the same hue family as oat-100, anchoring it to the canvas temperature.
- `--accent`: `oklch(0.9605 0.0067 97.35)` (= `#f3f2ed`, loam `oat-200`). (synthesised — Clay uses `oat-200` for secondary CTA backgrounds rather than a separate `accent` slot; mapping to `--muted`.)
- `--accent-foreground`: `oklch(0 0 0)` (= `#000000`). Live: same as `--foreground`.
- `--secondary`: `oklch(0.9605 0.0067 97.35)` (= `#f3f2ed`). (synthesised — see `--muted`.)
- `--secondary-foreground`: `oklch(0 0 0)` (= `#000000`).
- `--destructive`: `oklch(0.5891 0.2097 15.07)` (= `#dd2c53`, loam `pomegranate-600`). (synthesised — Clay's pomegranate red is the closest semantic match; no dedicated destructive-system token observed on marketing surfaces. App-surface destructive may differ.)
- `--destructive-foreground`: `oklch(1 0 0)` (= `#ffffff`). (synthesised)
- `--border`: `oklch(0.9352 0.0144 84.58)` (= `#eee9df`, loam `oat-300`). Live: `clay.com/pricing` — the bottom-card section of pricing tiles (`pricing_card-body cc-bottom`) is `oat-100` with an oat-300-toned border separator between the saturated header and the card body.
- `--input`: `oklch(0.9352 0.0144 84.58)` (= `#eee9df`, loam `oat-300`). (synthesised — same as `--border`; input chrome observed using the oat ladder.)
- `--ring`: `oklch(0 0 0)` (= `#000000`). Live: Clay's `:focus-visible` outline on `loam---web-library--button` uses `--loam---web-library---colors--primary-action` which resolves to `neutrals--black`.

### Polarity-locked surfaces

Clay has no dark theme, so the entire palette is effectively polarity-locked to its `:root` values. Two surface roles are unambiguously locked because they're identity-bearing:

- `--brand-canvas-cream`: `oklch(0.9793 0.0029 84.56)` (= `#f9f8f6`). Live: `clay.com/` — page canvas / hero-section bottom band / footer-section background.
- `--brand-feature-card-fills`: the full saturated palette above. Live: every homepage feature card, every pricing-tier header, every customer-story stat card. These backgrounds carry Clay's identity and are never substituted for monochromes.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9352 0.0144 84.58)` (= `#eee9df`, loam `oat-300`). Live: `clay.com/` — separator inside hero card between the H1 group and the sub-text, list-row separators in the "Every GTM data point imaginable" feature column.
- `--brand-hairline-strong`: `oklch(0.8761 0.0202 84.41)` (= ≈ `#dad4c8`, loam `oat-400`). Live: `clay.com/customers` — divider beneath testimonial-card stat row (`u-card_divider`).

### Drift vs `tokens.css`

The current `tokens.css` snapshots Clay from an earlier import and disagrees with the live brand on multiple substantive points.

| Token | `tokens.css` value | Live value | Suggested reconciliation |
|---|---|---|---|
| `--background` | `oklch(0.9862 0.0142 84.5826)` (`#fff9ed` cream) | `oklch(0.9793 0.0029 84.56)` (`#f9f8f6`, loam `oat-100`) | Update to loam `oat-100`. The current value is brighter and more yellow-saturated than the deployed canvas. |
| `--card` | `oklch(0.9547 0.0218 92.5078)` (`#f4ecd2` warm) | `oklch(1 0 0)` (`#ffffff` pure white) | The hero / content cards are white in deployment, not a cream tint. Replace with white. |
| `--popover` | `oklch(0.9547 0.0218 92.5078)` (warm cream) | `oklch(1 0 0)` (white) | Same correction — popovers are white. |
| `--secondary`/`--muted` | `oklch(0.9705 0.0180 89.3563)` (warm cream variant) | `oklch(0.9605 0.0067 97.35)` (`#f3f2ed`, loam `oat-200`) | Update both to `oat-200`. |
| `--primary` | `oklch(0.1448 0 0)` (near-black `#262626`) | `oklch(0 0 0)` (`#000000` pure black) | Clay primary CTA is `rgb(0,0,0)`, not a softened near-black. |
| `--font-sans` | `Inter, sans-serif` | `Roobert, Arial, sans-serif` (loaded; 400/500/600 plus an italic 500) | Replace primary font family with Roobert; declare Canela for editorial display surfaces and Roobert mono / Space Mono for utility/grid mockups. |
| `--font-display` | `Plain Black, Inter, sans-serif` | `Roobert` (sans display) + `Canela Web` (editorial display, e.g. `/blog` h1 at weight 300, 64px) | Two display families operate in parallel; "Plain Black" does not appear on any sampled surface. |
| `--text-display` | `72px` | `82.66px` (careers hero, weight 600) / `64px` (blog hero, Canela 300) / `52.36px` (homepage hero, Roobert 600 / lh 1.0 / ls -4%) | Range observed; pick a default that matches the homepage hero. |
| `--text-heading` | `56px` | `40px` (`/pricing` h1) / `32px` (most h2 across marketing) | Heading scale is smaller than the imported value; the brand uses display ranges 40-83px and a section-heading band at 32px. |
| `--brand-brand-pink` | `oklch(0.6858 0.2173 3.8035)` (hot pink) | not observed in this register | The "hot pink" identifier is absent; replace with `dragonfruit-800 #cc0687` (the magenta-pink the brand actually ships) or remove. |
| `--brand-brand-teal` | `oklch(0.3243 0.0378 195.4512)` (deep teal) | not observed | Replace with `slushie-900 #005870` (the brand's deep cyan-teal) or remove. |
| `--brand-brand-lavender` | `oklch(0.7625 0.1048 296.4162)` (soft lavender) | not observed; closest is `ube-300 #c1b0ff` | Replace with `ube-300` if a lavender role is needed; the brand-deployed purples are deeper. |
| `--brand-brand-peach` | `oklch(0.8232 0.1096 49.8170)` (peach) | not observed; closest is `tangarine-200/300` | Replace or remove. |
| `--brand-brand-ochre` | `oklch(0.8081 0.1369 85.5405)` (ochre/mustard) | not observed; closest is `lemon-600 #fdad15` (compliance-badge fill) | Replace with `lemon-600`. |
| `--brand-brand-mint` | `oklch(0.8319 0.0543 173.8069)` (mint) | not observed; the brand uses saturated `matcha-600/700`, not mint pastels | Replace with `matcha-300 #84e7a5` for a similar light role, or remove. |
| `--brand-brand-coral` | `oklch(0.7088 0.1839 29.0583)` (coral) | not observed; closest is `pomegranate-400 #fc7981` | Replace with `pomegranate-400` if a coral role is needed. |
| `--brand-surface-dark` | `oklch(0.2037 0.0217 195.5807)` (teal-tinted near-black) | not observed | Clay ships no documented dark surface. The block-promise of a `--brand-surface-dark` for occasional dark cards is not deployed. If the preview's dark variant needs a near-black surface, treat it as a preview-only synthesis (declare it in the template's `<style>` block, not in `tokens.css`). |
| Dark-mode `[data-theme="dark"]` block | full inverted theme | live brand has no dark theme | The dark block is entirely synthesised. Either delete it (single-polarity brand) or preserve it with a header comment explicitly marking it as a synthesised preview-only courtesy. |

The drift is large enough that a near-rewrite of `tokens.css` is warranted: rebuild around the loam ladders (`oat`, `blueberry`, `dragonfruit`, `matcha`, `ube`, `tangarine`, `lemon`, `pomegranate`, `slushie`, `lime`) and drop the pink/teal/lavender/peach/ochre/mint/coral synthetic set.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (marketing) | Roobert | 600 | 52.36 - 82.66 px | 1.0 (100%) | `-4%` em (-2.09px @ 52px; ≈ `-0.04em`) |
| Display (editorial) | Canela Web | 300 | 64 px | ~1.05 | normal |
| Heading | Roobert | 600 | 40 px | 1.0 | `-3%` em |
| Title (section heading) | Roobert | 600 | 32 px | 1.2 (38.4px) | `-3%` em (-0.96px) |
| Subtitle / card heading | Roobert | 600 | 18 px | 1.4 | normal |
| Body | Roobert | 400 | 14 - 16 px | 1.4 (19.6 - 22.4 px) | normal |
| Eyebrow / kicker | Roobert | 600 | 10 px | normal | `0.08em` (0.8px @ 10px) `text-transform: uppercase` |
| Caption / list-link | Roobert | 400 | 14 px | 1.4 | normal |
| Mono (utility / grid) | Space Mono | 400 / 700 | 14 - 16 px | normal | normal |
| Mono (variable) | Roobert mono | 300 - 900 (variable axis) | per-surface | per-surface | per-surface |

**Notes on display families.** Clay uses **two** display families in parallel: Roobert (proprietary geometric sans, primary across product / pricing / marketing / customer-stories) and Canela Web (proprietary contrast serif, editorial only — Commercial Type's Canela, distinctly humanist with a clear didone influence). The editorial register is reserved for the blog: `clay.com/blog` h1 is Canela 300 at 64px and the masthead "GTM with Clay" runs Canela italic. Customer-stories `/customers` h1 uses **Roobert 600** with a green-underlined inline accent on a single word, not Canela — the editorial-serif switch is reserved for long-form writing surfaces only.

**Display weight is 600 across marketing**, not 700. The careers hero (82.66px) and the homepage hero (52.36px) both compute to `font-weight: 600`. Clay University picks an in-between **650** at 48px on its h1 — Roobert is a variable font in deployment and the team uses non-stepped weights when they want intermediate strokes.

**Display tracking is consistently slightly negative** (~-3% to -4% em). The brand prefers tight headlines; no observed Clay surface uses default or positive tracking on display sizes.

**Mono is dual.** `Roobert mono` (declared as `--loam---web-library_typography---fonts--secondary-font`, variable 300-900) is the brand's preferred mono. `Space Mono` is loaded for utility / spreadsheet-mockup surfaces (the embedded data-grid mockups inside feature cards display values in Space Mono 400 / 700).

**Phosphor is the icon system.** `Phosphor` and `Phosphor-Bold` are loaded as web fonts. The right-arrow on the primary CTA renders from `class="icon_ph ph ph-arrow-right"`.

## §4 Component vocabulary

### Top navigation banner

**Status:** `current`
**Live source:** `clay.com/` — `<a class="nav-banner-2 w-inline-block">`
**Description:** Single full-width strip above the main nav. Background is transparent / inherits from a dark-canvas overlay (image-driven). Foreground text is `rgb(254, 253, 251)` (warm near-white, close to `oat-50`) at 14px Roobert 400. Carries a campaign call like "THE GO-TO-MARKET CONFERENCE BY CLAY · oct 8, 2026, san francisco · register". Renders flush against the page top with horizontal padding `0 20px` and a height that collapses when the campaign rotates off.
**States:** hover toggles a `box-shadow: inset 0 0 0 100px rgba(0,0,0,0.15)` darken-overlay; no underline.

### Main nav bar

**Status:** `current`
**Live source:** `clay.com/` — `<nav>`
**Description:** Fixed transparent header strip (`background-color: rgba(0,0,0,0)`), 57px tall, sitting over the page canvas. No bottom border. Left side: logo wordmark + cloud-icon brand mark. Center: text-only menu items "Product / Use Cases / Solutions / Resources / Company / Pricing" at 14px Roobert 400. Right side: a `⌘K` search trigger button, an oat-200 "Get a demo" pill (`#f3f2ed`, 12px radius), a "Log in" text link, and a black "Sign up" pill — though on the unauthenticated homepage observed today, only the "Get a demo" pill and a hamburger icon ship in the rendered viewport (the others are tucked into the dropdown / mega-menu state).
**States:** Hover on menu items: no underline observed in the deployed state — the live items default to color `rgb(0,0,0)` with no decoration changes.

### Hamburger / menu trigger

**Status:** `current`
**Live source:** `clay.com/` — square icon button rendered at the rightmost slot of the nav.
**Description:** Three-line stack icon, 14px Phosphor glyph, on transparent fill, sits inside an oat-tinted hit area.
**States:** Hover: no observed visual change.

### Brand mark (logo)

**Status:** `current`
**Live source:** `clay.com/` — `.nav__brand--link`
**Description:** Combination mark. Left element is an illustrated **cloud + rainbow-mountain** glyph (the Clay product mark — a small SVG of a stylized blue cloud with a multi-color rainbow arc curving through it). Right element is the lowercase wordmark **`clay`** in Roobert at a custom weight, near-black `rgb(0,0,0)`. Total height matches the 57px nav, mark sits left-of-text.
**States:** Logo never flips colour across the sampled marketing surfaces — always near-black ink on the oat-100 / white canvas.

### Primary CTA pill

**Status:** `current`
**Live source:** `clay.com/` — `<a class="btn">Start building for free <icon arrow-right /></a>`
**Description:** Near-pure black (`rgb(0,0,0)`) filled pill. Border-radius **12px**. Padding `7px 14px`. Foreground white `rgb(255,255,255)`. Label set in Roobert 500 at 14px, letter-spacing `-0.14px` (~-1%), line-height 21px. Trailing right-arrow icon (Phosphor `ph-arrow-right`) at 7px gap from the label.
**States:** Transition `background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)` on hover; hover-state colour resolves to a slightly-lifted near-black via the transition. Focus-visible outline routes to `--loam---web-library---colors--primary-action` (also black).

### Secondary CTA pill (oat-tinted)

**Status:** `current`
**Live source:** `clay.com/` — `<a class="btn u-bg-oat-200 u-text-black">Get a demo</a>`
**Description:** Oat-200 `#f3f2ed` filled pill. Border-radius **12px**. Padding `8px 16px`. Foreground black. Roobert 500 at 14px. Used for the persistent top-nav demo request and as the second-action button in pairs with the black primary.
**States:** Hover lightens / shifts to oat-300; default has no border.

### Outlined / outlined-secondary button

**Status:** `current`
**Live source:** `clay.com/pricing` — "Request a quote", "See full plan comparison", "Start 14-day trial" (within white card bodies)
**Description:** White fill, black 1px stroke, 12px radius, padding `8px 16px`, Roobert 500 at 14px. Used inside card surfaces where the surrounding fill is already a saturated colour or where a softer CTA pairs with a black primary.
**States:** Hover swaps fill to oat-100 / oat-200.

### Pricing-tier card

**Status:** `current`
**Live source:** `clay.com/pricing` — `.pricing_card-body.cc-top` (header) + `.pricing_card-body.cc-bottom` (body)
**Description:** Two-section vertical card. Top section is a **saturated brand colour** at full chroma (Free → blueberry-400 `#3859f9`, Launch → matcha-700 `#02693e`, Growth → dragonfruit-800 `#cc089e`, Enterprise → ube-400 `#6d4cd6`) carrying a 3D-rendered geometric mascot (small sculptural object — cube, sphere, cone — in the upper-left at ~64px), the tier name (Roobert 600 white at 18px), and a single-line value-prop subtitle in white at 14px. The "Growth" tier carries a small "Recommended" pill in the upper-right of the header band. Bottom section is `oat-100 #f9f8f6` body holding price ("$167/mo"), an action-credits dropdown, a feature list with bullet-dot markers, and a black or outlined CTA. Total card radius is **16px** with rounded corners on the top-of-the-header and on the bottom-of-the-body; the join is flush.
**States:** Default; no observed hover state — pricing cards are static.

### Homepage feature card (multi-color)

**Status:** `current`
**Live source:** `clay.com/` — `.homepage-card` variants `u-bg-blueberry-600`, `u-bg-matcha-700`, default `homepage-card h-100` (which receives dragonfruit-900)
**Description:** Tall card (497-522px height observed), 16px border-radius, 24px padding, full-bleed saturated background colour. Carries a small all-caps eyebrow ("DESTINATIONS", "AI FORMATTING", "AI CONDITIONAL LOGIC") in white at the top, then a Roobert 600 white heading, a paragraph of white body text, a chip-style integration-pill row or data-grid preview, and a contextual mini-mockup occupying the lower half of the card. The visual contract is the same across the card cluster: saturated fill, white type, mockup-as-illustration anchored bottom or right.
**States:** Default; the card mockups carry their own animation states (pulsing icons, simulated chips moving across rows) — see Card animation, below.

### Homepage feature card (oat / cream)

**Status:** `current`
**Live source:** `clay.com/` — `.homepage-card.u-bg-oat-100`
**Description:** Variant of the above where the card fills with oat-100 `#f9f8f6` and the foreground inverts to black. Used for the mixed "Cut costs..." section and the larger 990px-tall "Clay's data + workflows unlock any growth use case" closing card. Border `u-border-full` is the oat-300 hairline.

### Stat callout card (compact)

**Status:** `current`
**Live source:** `clay.com/` — small stat card inside the feature card, e.g. `OpenAI > 2x / OpenAI more than doubled enrichment coverage from low 40% to high 80%`
**Description:** A 4-column layout glued to the bottom of a feature card. Left cell: a large mono-style number ("> 2x", "3x") in Roobert mono / Space Mono. Right cells: a 16px brand mark + a 13px caption + an outbound-link arrow icon button. Background inherits from the parent feature card (white-on-saturated). Total height ~120px.
**States:** Hover on the arrow icon shifts its colour toward `--brand-on-dark`.

### Stat callout card (large)

**Status:** `current`
**Live source:** `clay.com/customers` — `.cs-cta-_img-aspect.u-aspect-custom`
**Description:** 237×245px square stat tile. Saturated background (ube-600 `#7934f0` is the default, with secondary fills in tangarine-600, pomegranate-600, matcha-600). Large white headline ("1000+", "80%+", "3x", "50%") at Roobert 600 in the 32-48px range. Below: white sub-label ("Verified addresses per month", "Enrichment coverage", "Contact and firmographic match rates") in 14px Roobert 400. Stacked in rows on customer-story landing pages.
**States:** Default; the card is a static visual stat marker, no hover.

### Testimonial card (logo + quote)

**Status:** `current`
**Live source:** `clay.com/` — `.u-card_post-wrapper.cc-logo-testimonial`
**Description:** 307×352px card with rounded corners (12px radius), saturated fill from the loam ladder. Customer logo as wordmark at the top-left in white. Below, a 4-6 line testimonial quote in white (Roobert 400, 14-15px, 1.5 line-height). Bottom: name + role in slightly smaller white text. The deployed cluster cycles through eight different fills (blueberry-600, dragonfruit-900, slushie-900, pomegranate-600, matcha-600, tangarine-700, terra-dragonfruit-500 `#45012e`) — Clay uses fill colour as the only differentiator between adjacent cards, not borders or shadows.
**States:** Default; static cluster.

### Testimonial card (illustrated, square)

**Status:** `current`
**Live source:** `clay.com/` — `.testimonial_card`
**Description:** Larger 345×463px card with a vivid fill (lime-300 `#cbd810`, tangarine-500 `#fc8936`, blueberry-300 `#83c4ff`, slushie-500 `#3bd3fd` observed). Carries a quote, byline, role, and a circular avatar photo bottom-left with a dashed-line connector from the quote to the avatar. Uses **black** text on lime / tangarine fills and white on the deeper slushie / blueberry ones — Clay's contrast-pair rule.
**States:** Default; static.

### Quote block (customer-story detail)

**Status:** `current`
**Live source:** `clay.com/customers` — `.cs-quote.cs-quote-left`
**Description:** Pull-quote with a hand-picked fill from a more muted slice of the palette than the saturated card cluster (`rgb(36,114,96)` muted matcha, `rgb(114,66,85)` muted dragonfruit, `rgb(32,106,161)` muted slushie, `rgb(190,95,63)` muted tangarine, `rgb(23,53,30)` deep matcha, `rgb(164,52,52)` muted pomegranate, `rgb(162,89,255)` vivid ube). White serif italic text. Height 102-170px depending on quote length. Carries a triangular dialog-bubble tail bottom-left pointing at the avatar.
**States:** Default; static.

### Stat ratio block

**Status:** `current`
**Live source:** `clay.com/customers` — under each customer-story testimonial, `2X / Enrichment coverage`, `2x / Increase in cold email performance`
**Description:** A small badge-shape carrying a black Roobert 600 multiplier ("2X", "3X") at ~32-40px paired with a 14px black sub-label. Sits inside the card on `oat-100` with a 12px border-radius and a soft hairline border, with an outbound-arrow icon button in the upper-right. Pairs with the testimonial quote above to form a verifiable proof-point.
**States:** Hover on the arrow lifts opacity.

### Section eyebrow / kicker

**Status:** `current`
**Live source:** `clay.com/` — text labels above feature-card mockups ("DESTINATIONS", "AI FORMATTING", "BY TEAM", "BY STAGE")
**Description:** Roobert 600, 10px, uppercase, letter-spacing `0.08em` (0.8px). Default foreground `rgb(121, 117, 109)` (≈ `--muted-foreground`) on light surfaces; white on saturated card fills. Sits as a single tracker-line above a heading.
**States:** Static.

### Chip / category pill

**Status:** `current`
**Live source:** `clay.com/blog` (post category — orange "Thought Leadership") and `clay.com/customers` (white "Customer Stories" pill)
**Description:** Pill at 9999px radius. Background varies by category — Clay's `--chips---background` token is wired to multiple loam swatches (`tangarine-600`, `matcha-600`, `blueberry-200`, `ube-100`, `dragonfruit-100`, `lemon-600`, etc.). Foreground is the contrasting `--chips---text` for each pairing. Padding ~`6px 12px`, label in Roobert 600 at 12px. Tangarine-600 pill + white text is the most common deployed pairing on blog category labels.
**States:** Hover on category-link chips toggles a slight darken; non-link chips are static.

### Carousel arrow controls

**Status:** `current`
**Live source:** `clay.com/blog` (BEST OF THE KILN row) and `clay.com/customers` (testimonial scroller)
**Description:** Paired circular icon buttons (left-arrow / right-arrow) in the upper-right of the carousel row. White fill, 1px black border, 9999px radius, ~36px diameter. Phosphor chevron glyph inside.
**States:** Hover swaps to oat-100 fill; pressed state has no observed depression. Active state shows the next-arrow at full opacity while the previous-arrow drops to disabled.

### Inline link (in body)

**Status:** `current`
**Live source:** `clay.com/` — feature-card body links like "Claygent.", "signals", "integrations", "functions", "buy now"
**Description:** Inherits body colour `rgb(0,0,0)`; carries a 1.4px underline at the body-text colour. Roobert 400 at the body size. No hue shift on hover within marketing surfaces — the underline thickens slightly or the text-decoration-thickness tweaks.
**States:** Hover: thicker underline, no colour change.

### Inline accent (in headline)

**Status:** `current`
**Live source:** `clay.com/customers` h1 — "How top teams find **GTM alpha with Clay**" with green underline on "Clay"
**Description:** A heading word swapped to a saturated underline (matcha-600 `#078a52` or blueberry-500 `#0382f7` depending on the page). The text itself stays the heading colour (black); only the underline carries the accent.
**States:** Static.

### Data-grid mockup

**Status:** `current`
**Live source:** `clay.com/` — embedded inside feature cards, e.g. "Clean and format data with AI in seconds" (NETFLIX INC, Walmart Stores, Microsoft Inc, Walt Disney Studios, APPLE rows)
**Description:** A spreadsheet-shape mockup with two-column tabular content, white rows on a faint cream / oat-200 base, monospaced text in Space Mono 400 at 13px. Carries embedded floating dropdown panels showing AI-action suggestions ("Normalize phone number", "Change job title", "Normalize company name", "Deduplicate a list") with brand-icons (Clay mark, OpenAI mark) in front of each row. The data grid is **Clay's signature visual register** — the product UI's spreadsheet shape is preserved as a marketing illustration on every feature card.
**States:** Mockup carries simulated cursor movements + row-highlight animations on scroll-into-view.

### Search / quick-launcher trigger

**Status:** `current`
**Live source:** `clay.com/` nav — `.nav_search.is--n-menu` button with `⌘K` label
**Description:** Pill button with a magnifying-glass icon and the `⌘K` keyboard hint inside. Transparent fill, no border, small Roobert 500 at 13.92px in `rgb(0,0,0)`. Sits adjacent to the demo CTA.
**States:** Hover lights up the icon; click opens a search modal.

### Search field (docs / university)

**Status:** `current`
**Live source:** `university.clay.com/` — top-of-page "Search..." input
**Description:** Pill input with oat-200 fill, 9999px radius, Roobert 400 placeholder at 14px, magnifying-glass icon trailing right. The `GTM with Clay` editorial wordmark sits to its left in Canela italic.
**States:** Focus changes the ring colour to black.

### Toggle pill (Monthly / Annual)

**Status:** `current`
**Live source:** `clay.com/pricing` — `.nav__menu--toggle`
**Description:** Two-slot pill toggle, container at 10.08px border-radius with `oat-100` fill `rgb(254, 253, 251)`. The active slot has a white fill, drop-shadow, and 12px radius; the inactive slot is transparent with `oat-mute` text. Carries the "Annual · Save 10%" label inline with a small green discount badge.
**States:** Click swaps the active slot; the inactive slot has a subtle hover lift.

### Action-credits dropdown (in pricing cards)

**Status:** `current`
**Live source:** `clay.com/pricing` — inside Free/Launch/Growth card bodies, e.g. "1.2K data credits/yr" with a database glyph
**Description:** Pill-shape `<select>` shell on the card-body `oat-100` surface, with a small database/coin icon at the left, the credit value as Roobert 500 at 14px, and a Phosphor chevron-down to the right. Pill radius 12px, oat-300 border.
**States:** Click expands a dropdown panel listing different credit tiers.

### Feature list with bullet markers

**Status:** `current`
**Live source:** `clay.com/pricing` — feature-list rows inside each pricing card
**Description:** Vertical list with a tiny circle-dot bullet (4px) left of each item, the line text in Roobert 400 at 14px black, with inline links to relevant features (e.g. "Enrich with [Claygent]", "Track job changes and other [signals]"). Inline links carry the standard underline-on-body-color pattern.
**States:** Inline links hover-thicken the underline.

### Compliance badge (flower icon)

**Status:** `current`
**Live source:** `clay.com/` — "Backed by enterprise-grade security and scale" section, SOC 2 TYPE II / GDPR / CCPA / ISO 27001 / ISO 42001 badges
**Description:** Flower-petal SVG with eight rounded petals. Orange/lemon-tone petals (`#fdad15`-ish) with a darker amber core (`#9d6a09`-ish) containing the badge mnemonic ("SOC 2 / TYPE II", "GDPR", "CCPA", "ISO 27001", "ISO 42001") in white bold mono. Each compliance badge is paired below with a 3-line text caption explaining the certification. The badge mark is a **Clay-specific illustration** — not the standard SOC 2 / ISO badge artwork.
**States:** Static.

### 3D mascot ornament

**Status:** `current`
**Live source:** `clay.com/` — pricing-tier cards (each tier shows a different 3D mascot in the upper-left of its header), `clay.com/` hero card (two small 3D mascots flanking the hero CTA — purple stacked sphere and orange hourglass on left, multi-color stacked on right)
**Description:** Rendered 3D geometric primitives (sphere / cone / cube / hourglass / stacked spheres) at ~64px square, sitting on the saturated card fill. The mascots use matching loam-palette colours and look hand-crafted (claymation register — likely a deliberate brand reference to "clay" as a material).
**States:** Static.

### Job listing tile

**Status:** `current`
**Live source:** `clay.com/careers` — job-listing grid rows ("Conversion Optimization", "FP&A / Finance", "Product Support Specialist / CX", "Web Developer")
**Description:** Outlined oat-100 card. Left: rounded-square icon container (matcha-600 fill with white handshake/department icon, 8px radius). Right: two-line title (job + department) in Roobert 600 at 16px and Roobert 400 at 14px respectively. The card occupies a 3-up grid on desktop; carries no hover state until click.
**States:** Hover lifts shadow slightly; click navigates to the role detail.

### Customer-logo strip

**Status:** `current`
**Live source:** `clay.com/` (below the hero) and `clay.com/customers` (a denser variant)
**Description:** Horizontally-tiled grid of customer wordmarks (ElevenLabs, Cursor, Anthropic, Stripe, Ramp, Rippling, Notion, Perplexity, Uber, Figma, Workday, Verkada, Okta, Klaviyo, Canva, HubSpot, Vanta, Intercom, Google, OpenAI). Wordmarks render in their own brand colours (no monochrome treatment). Each cell carries a small "Case study" link under it in matcha-700 underlined text where a case-study exists. Grid is centred on the page canvas with 24px gutter.
**States:** Each cell with a case-study link is a navigable card; hover thickens the underline.

### Closing CTA band (full-bleed lime)

**Status:** `current`
**Live source:** `clay.com/` — last section before the footer, "Turn your growth ideas into reality today"
**Description:** Full-bleed band on **lime-300 `#cbd810`** fill that bleeds to a textured photo of green grass / moss at the bottom. Centred Roobert 600 white-text heading at 56-64px, a 14px subhead "Start your 14-day Pro trial today. No credit card required", and two CTAs side-by-side ("Start 14-day Pro trial" black pill / "Get a demo" oat-200 secondary pill). The black CTA inverts on the lime fill, preserving the brand's single CTA shape across all surfaces.
**States:** Static; the moss photo sits below the band as a separate panel.

### Footer

**Status:** `current`
**Live source:** `clay.com/` — `<footer>`
**Description:** `oat-100 #f9f8f6` background (NOT a dark footer — the brand commits to a single light canvas through the very last pixel). 1815px tall on desktop. Multi-column link grid grouped by Use cases / Customers / Product / Blog / Resources / Company. Column headers in Roobert 600 at 14px black. Links in Roobert 400 at 14px black, with a hover-thicken underline. Top-right of the footer carries social icon links (X, LinkedIn, YouTube, GitHub) as outlined circular buttons. Below the footer, the closing strip carries a textured photo of mossy turf as a brand-flavoured punctuation (the "loam" / "earth" metaphor that names Clay's design system).
**States:** Link hover: thicken underline; social-icon hover: invert fill to black.

### Rainbow accent strip

**Status:** `current`
**Live source:** `clay.com/careers` (top edge of the hero), `clay.com/blog` (inside the "How Clay uses Clay" hero card)
**Description:** Horizontal rainbow strip composed of 5-6 saturated bands (yellow / orange / red / matcha / blueberry / slushie). Sits along the very top edge of a section or wraps a featured hero on the editorial side. Used as a section-marker and as a recurring playful brand-ornament; height ~12px, full-bleed across the viewport.
**States:** Static.

### Animated logo pulse

**Status:** `current`
**Live source:** `clay.com/` — the brand cloud-mark in the nav and inside the "Clay's data + workflows unlock any growth use case" diagram. The diagram-centre cloud has classes `.clay_pulse` (`rgb(0, 47, 103)` deep blueberry-tinted outer ring) and `.clay_pulse-animate` (`rgb(3, 130, 247)` blueberry-500 inner pulse), with CSS keyframe pulsing radial-out at ~2s interval.
**Description:** A radial-pulse decorative element behind the Clay logo on key surfaces — uses two layered circles in deep blueberry + bright blueberry that animate scale + opacity to feel like a heartbeat.
**States:** Continuous pulse animation; respects `prefers-reduced-motion` to disable.

## §5 Surface inventory

- `https://www.clay.com/` — homepage. The signature visual register: saturated multi-color feature cards over an oat-100 canvas, with a centered white hero card carrying the H1 and primary CTA. Anchors most of the §4 vocabulary (primary CTA, feature card variants, stat callout, testimonial cluster, customer-logo strip, closing lime band, footer, compliance flower badges).
- `https://www.clay.com/pricing` — pricing tiers. Anchors the saturated pricing-tier card (two-section header-band + oat-100 body), the Monthly/Annual toggle pill, the "Usage-based pricing" cream card with rainbow-stripe icon, the comparison-table-accordion control.
- `https://www.clay.com/customers` — customer stories index. Anchors the inline-accent heading (green underline on a single word), the saturated stat callout grid, the customer-story testimonial card with avatar + dialog-tail quote bubble, the stat ratio block with outbound arrow.
- `https://www.clay.com/blog` — editorial register. Anchors the Canela display switch (h1 weight 300 at 64px), the "BEST OF THE KILN" carousel row with paired arrow controls, the category-chip system (orange tangarine, matcha green, etc.), the multi-stripe "How Clay uses Clay" featured-post graphic.
- `https://www.clay.com/careers` — careers. Anchors the largest display size (82.66px), the rainbow accent strip, the job-listing tile grid with rounded-square icon container.
- `https://university.clay.com/` (canonical for the previous `docs.clay.com`) — learning platform. Anchors the search-bar pattern, the oat-100 page canvas confirmed beyond the marketing root, the 650-weight intermediate Roobert variable axis, the chip-tab navigation row ("Courses / Docs / Use-case templates / Cohorts / Certifications").

## §6 Notes

- **Light single-polarity.** Clay ships no dark mode on any sampled surface. Setting `data-theme="dark"` or `.dark` on the document root produces no visible change; the brand has chosen single-canvas light by intent. The catalog's previous `--brand-surface-dark` token is a synthesis — not a brand-documented surface.
- **The named design system is "loam".** Clay's design-system identifier in the live stylesheet is `--loam---web-library_*`. The colour ladders are food-themed (oat, blueberry, dragonfruit, matcha, ube, lemon, lime, pomegranate, slushie, tangarine) — preserve this vocabulary verbatim in `tokens.css`. Note the spelling: `tangarine` (sic) for the legacy `--_swatches---color--tangarine-*` ladder, `tangerine` for the newer `--loam---web-library_terra-swatches--tangerine` ladder. The brand-deployed surfaces are on the `tangarine` (sic) family.
- **Multi-color feature cards are Clay's signature.** Clay's recognizability is the cluster of saturated single-colour cards in a row (each pricing tier a different colour, each testimonial a different colour, each feature card a different colour). The decorative move is **never tonal restraint**; it's the controlled use of full-chroma fill across a grid. Lifting / muting any of the loam swatches breaks the register.
- **Two display families.** Roobert across product / pricing / marketing / customer-stories / careers; Canela on the blog only. Don't conflate — Canela is the editorial swap, not a general display alternative.
- **CTA shape is invariant across canvases.** The same near-black 12px-radius pill appears on white card surfaces, on oat-100 canvases, on saturated feature cards, and on the closing lime-300 band. Don't introduce a coloured CTA variant — the brand commits to the black pill as the only primary shape.
- **Inline accents over coloured runs of body text.** Where Clay needs to draw attention inside a headline, it underlines a single word with a saturated accent (matcha-600 most often), but never recolours the heading word itself. This is the brand's compromise between Halcyon-strict-monochrome and a coloured-headline shop.
- **The "claymation" 3D mascots are a brand pattern, not stock.** The small 3D-rendered geometric objects (sphere / cube / cone / hourglass) that sit on pricing-tier headers and flank the hero card are part of Clay's deliberate brand identity — they reinforce the name. Replicating "claymation" sculptural icons in a preview is welcome; lifting Clay's actual 3D assets is not.
- **The compliance-badge "flower" is brand-flavoured chrome**, not a real SOC 2 / ISO badge. Clay illustrates these compliances as orange flower-petal SVGs with the certification mnemonic at the centre — a soft, friendly counterpoint to the usual corporate-blue trust badges. Preserve this register if a preview wants to gesture at compliance.
- **Loam swatches deviate from a strict step ladder.** The 100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900 / 950 numbers do not always correspond across families. For example, `tangarine-600 #fa6900` is a vivid orange, while `matcha-600 #078a52` is a deep green — same step number, very different lightness. Don't assume the step number means the same lightness across families; the brand uses each ladder to centre its own chromatic identity, with the deep tones at the high steps and the light tones at the low steps for each family individually.
- **Sub-AA in the deployed brand:** the homepage feature cards use 14px white body text on `dragonfruit-900 #8b045c` and similar deep fills that compute well above AA. But the "Recommended" pill on the dragonfruit-800 Growth pricing tier renders white on a near-Dragonfruit-700 darker shade with a tighter contrast margin — Clay accepts this because the badge is decorative chrome, not a body-reading surface.
- **Brand-X-lift content to avoid:** the customer roster (OpenAI, Anthropic, Cursor, Notion, Stripe, Vanta, Verkada, Coverflex, Rippling, ElevenLabs, Workday, Sendoso, Okta, Klaviyo, Canva, HubSpot, Intercom, Google, Perplexity, Uber, Figma, Mistral AI, Ramp) — real Clay customers, do not lift wordmarks. The product-feature names (Claygent, Sculptor, Sequencer, Waterfall, Signals and Intent, Data marketplace, Audiences, Functions, Integrations, AI conditional logic, Multi-provider data enrichment, Claygents) — Clay product surface, replace with neutral Halcyon-team content. The campaign banner copy ("THE GO-TO-MARKET CONFERENCE BY CLAY") and the conference identity — Clay corporate event, don't lift.

## §Known gaps

- **Product app surface (`app.clay.com`)** — not reached. The login flow gates the product UI; the product-internal spreadsheet UI, table chrome, sidebar nav, modal patterns, in-app token / dropdown / input affordances are unobserved. Anything claimed about Clay's authenticated dashboard would be speculation from the marketing-page data-grid mockups, which only approximate the product UI.
- **`docs.clay.com`** — 301-redirects to `university.clay.com`. The previous "docs" surface no longer exists as a standalone documentation site; what was docs is now embedded within a learning platform with a different visual register (chip-tab navigation, course-style content layout). If a future audit needs API-doc-shape conventions, the new home is presumably inside university.clay.com under a "Docs" tab, but the inner content was not sampled in this cycle.
- **Dark mode** — formally absent (verified). No dark-canvas observation was possible because Clay does not ship one. If a preview needs a dark variant, it must be synthesised; mark the synthesis explicitly so it's not mistaken for documented brand behaviour.
- **Mobile layout** — not sampled at mobile breakpoints. All observations are at the 1440-width-emulated desktop viewport; mobile-specific component variants (collapsed feature cards, single-column pricing, simplified nav) are not captured.
- **Full screenshot capture at native resolution** — the `claude-in-chrome` MCP returned screenshots at the constrained `606x813` viewport even after resizing the underlying window to `1440x900`. The visual capture is sufficient for surface identification but not high-resolution enough for pixel-level token harvesting; the DOM-sampling via `getComputedStyle` carries the token-value evidence in §2.
- **Roobert mono variable axis usage** — the `Roobert mono` font is declared in `--loam---web-library_typography---fonts--secondary-font` as a 300-900 variable, but most rendered mono-text surfaces appear to draw from Space Mono. The exact split between Roobert mono and Space Mono usage (which surfaces consume which) was not exhaustively mapped.
- **The `terra` palette layer** — a parallel set of swatches under `--loam---web-library_terra-swatches---*` and `--_terra--*` (with names like `terra-dragonfruit-500 #45012e`) appears in declared CSS and is consumed by one observed surface (a deep "terra-dragonfruit" testimonial card). This may be a newer named theme inside the loam system (a "terra" subtheme — deeper / earthier tones); the full taxonomy and rollout of the terra layer was not fully mapped.
