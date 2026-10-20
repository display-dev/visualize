---
slug: clickhouse-style
name: ClickHouse
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://clickhouse.com/
  - https://clickhouse.com/cloud
  - https://clickhouse.com/pricing
  - https://clickhouse.com/blog
  - https://clickhouse.com/customers
  - https://clickhouse.com/docs
  - https://clickhouse.com/docs/sql-reference/statements/select
canonical-canvas: dark
selection:
  mood: [enterprise, data-rich]
  tone: [precise, pragmatic]
  formality: medium
  density: high
  canonical_canvas: dark
  best_for: |
    Use for information-dense artifacts that need a precise, pragmatic register with enterprise, data-rich visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.

---

# ClickHouse

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://clickhouse.com/ | `#1f1f1c` warm-tinted near-black | Hero stack on `body { background: rgb(31, 31, 28) }`; no light variant served from `prefers-color-scheme: light`. |
| Cloud product page | https://clickhouse.com/cloud | `#1f1f1c` body, `rgba(0,0,0,0.3)` hero overlay | Hero pairs left-aligned headline with a product UI screenshot composited on the same canvas; "Effortless." carries a hand-drawn yellow highlighter scribble underneath the word. |
| Pricing | https://clickhouse.com/pricing | `#1f1f1c` | Three tier cards on the body canvas; each tier card sits in `bg-neutral-900/50` (`rgba(20,20,20,0.5)`) with a yellow top accent rendered as a gradient pseudo-element. |
| Blog index | https://clickhouse.com/blog | `#1f1f1c` | Featured post carries a single yellow vertical left-border accent; subsequent posts in a grid with rounded-xl card frames and no border. |
| Docs landing | https://clickhouse.com/docs | `#1f1f1c` | Two-row top chrome (marketing nav + docs-section nav, separated by hairline `rgb(64,64,64)`); search input at center-page; clients-and-drivers grid below. |
| Docs article (SELECT reference) | https://clickhouse.com/docs/sql-reference/statements/select | `#1f1f1c` | Three-column shell: search-and-tree sidebar on the left, article body in the middle, page-TOC + "Was this page helpful?" + "Try ClickHouse Cloud for FREE" callout on the right. Code blocks sit on `#282828`. |
| 404 (encountered on /customers) | https://clickhouse.com/customers | `#1f1f1c` | "Oops! We can't find this page" inside a soft-edge dark card; ghost-outline `Go back` + plain link `Go home`; row of three yellow text links — `Documentation · Our blog · Events`. |

The header light-mode toggle inside docs (`sun/moon` button on the right of the docs-section nav row) is present but the marketing surfaces above don't honour it. Both `--force-dark-mode` and `--force-light-mode` headless captures of the homepage produced identical 1.05 MB renders.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, live citation. Every OKLCH↔hex pair below was round-tripped through culori 4.0.2 — `match: true` on every entry.

### Brand primary

- `--primary`: `oklch(0.9686 0.1699 110.9729)` (= `#faff69`). Live: `https://clickhouse.com/` — the `Start free cloud trial` button child element (`button.styles_button__3smpn`), `background-color: rgb(250, 255, 105)`. Same value appears on the `Try for free` nav CTA, every customer-quote callout card (`.flip-selection`), the `Why ClickHouse?` stat-card row, the "Deploy your way" section canvas, the docs floating `Ask AI` widget logomark, and yellow eyebrows (`USE CASES`, `CLICKHOUSE IS TRUSTED BY`, `Engineering` category tag on the blog index, `Stars` / `Releases` / `Contributors` stat labels).
- `--primary-foreground`: `oklch(0.1957 0.0000 0)` (= `#151515`). Live: `https://clickhouse.com/` — text on the yellow primary CTA, `color: rgb(21, 21, 21)`. This is a near-black ink, not pure `#000`, paired with the yellow at full chroma.

ClickHouse's `tailwind.config` exposes the yellow at three derived stops in DOM class names (`primary-300` for the surface, `primary-800` for text-on-yellow body, `primary-900` for text-on-yellow titles), but the actual computed colours on those classes are slightly different inks rather than a documented brand ladder — see the polarity-locked inks below.

### Documented secondary brand colours

ClickHouse runs effectively monochrome plus the yellow. No second chromatic brand accent is exposed in marketing chrome. The few non-yellow chromatics observed are utility / illustrative:

- `--brand-accent-blue` (SQL keyword stop in docs): `oklch(0.6713 0.1118 245.5396)` (= `#569cd6`). Live: `https://clickhouse.com/docs/sql-reference/statements/select` — `.prism-code .token.keyword`, `color: rgb(86, 156, 214)`. This is VS Code's `Dark+` palette piped through `prism-react-renderer`, not a brand colour. Pairs with `.token.operator` `oklch(0.8561 0.0943 225.8662)` (= `#89ddff`), `.token.plain` `oklch(0.8632 0.0801 232.0798)` (= `#9cdcfe`), `.token.punctuation` `oklch(0.7427 0.1348 311.0572)` (= `#c792ea`).
- `--brand-accent-rose` / `--destructive`: not observed in marketing chrome. The closest is the iconography stroke on a "100x faster" punctuation icon (a rounded square with a lightning glyph) in the "Why is ClickHouse so fast?" section, which uses a red-orange outline — but no destructive UI surface (delete confirm, error banner) is exposed publicly.

The blog index hero post-preview rendered a code-block visual with a different SQL palette — bright red `SELECT`, lighter blue functions — which is a marketing-art tile rather than a deployed token surface. Don't model it as a brand colour.

### Canvas + neutrals

- `--background`: `oklch(0.2381 0.0056 106.8176)` (= `#1f1f1c`). Live: `https://clickhouse.com/` — `body { background-color: rgb(31, 31, 28) }`. This is a warm-tinted near-black, NOT pure neutral — chroma 0.0056 on hue 106 (yellow-axis) tints the canvas toward the brand yellow. The same value appears as `body` background on every surface sampled (homepage, cloud, pricing, blog, docs, 404).
- `--foreground`: `oklch(1.0000 0.0000 0)` (= `#ffffff`). Live: `https://clickhouse.com/` — `body { color: rgb(255, 255, 255) }`. The blog `<h1>` headline drops marginally to `oklch(0.9821 0 0)` (`#f9f9f9`) — likely a tailwind `neutral-50` override on headings, not a separate semantic token.
- `--card`: `oklch(0.1913 0.0000 0)` (= `#141414`, with `0.5` alpha as deployed). Live: `https://clickhouse.com/` — the four feature cards `div.cui-card` carry `background-color: rgba(20, 20, 20, 0.5)` over the body canvas. Pricing-tier cards reuse the same class chain.
- `--card-foreground`: `oklch(1.0000 0.0000 0)` (= `#ffffff`). Live: same selector, `color: rgb(255, 255, 255)`.
- `--popover`: not directly observed (no popover open in the sample). Recommend mirroring `--card` until product-surface access (sign-in walled) confirms a separate stop.
- `--popover-foreground`: same — synthesise as `--card-foreground` until verified.
- `--muted`: `oklch(0.2768 0.0000 0)` (= `#282828`). Live: `https://clickhouse.com/docs/sql-reference/statements/select` — `pre.prism-code { background-color: rgb(40, 40, 40) }`. The docs surface uses this same stop for the search-input field, and the home page's two "Quick Start / Install Locally" buttons use a slightly lighter `oklch(0.3171 0.0000 0)` (= `#323232`) — recommend `--muted: oklch(0.2768 0 0)` with `--muted-elevated` at `0.3171` for the homepage button variant.
- `--muted-foreground`: `oklch(0.9037 0.0000 0)` (= `#dfdfdf`). Live: `https://clickhouse.com/pricing` — the `Per 1TB / mo` label under `$25.30`, `color: rgb(223, 223, 223)`. Pricing inline-with-fineprint paragraphs and docs FAQ-button text also resolve to this stop. Footer column links drop further to `oklch(0.7058 0.0000 0)` (= `#a0a0a0`) — the same stop ClickHouse calls `neutral-400` in classnames.
- `--accent`: not deployed as a slot. Marketing chrome uses the yellow `--primary` for every accent role (eyebrow labels, link colour, stat-label colour, CTA fill, callout fill, scribble highlight). Recommend mirroring `--primary` into `--accent`.
- `--accent-foreground`: same as `--primary-foreground` (`#151515` on yellow surfaces) when filled; white when used as text-only accent on dark.
- `--secondary`: not a deployed slot. Secondary CTAs are ghost-outlined (transparent fill + `oklch(0.3715 0 0)` `#404040` 1px border) — see `Contact sales` on the homepage and `Estimate your monthly cost` on pricing. Recommend `--secondary: oklch(0.1913 0 0)` (matching `--card`) with `--secondary-foreground: oklch(1 0 0)` and lean on `--border` for the outline.
- `--secondary-foreground`: `oklch(1.0000 0.0000 0)` (white). Live: `Contact sales` button child, `color: rgb(255, 255, 255)`.
- `--destructive`: not observed in deployed marketing chrome (synthesised).
- `--destructive-foreground`: same (synthesised).
- `--border`: `oklch(0.3753 0.0000 0)` (= `#414141`). Live: feature card `div.cui-card`, `border-color: rgba(65, 65, 65, 0.8)` — alpha applied over body canvas resolves close to this. Pricing-tier cards reuse this border.
- `--input`: not separately observed (no text input on homepage). Pricing region picker and docs search input both sit on `--muted` `#282828` with no visible border. Recommend mirroring `--border`.
- `--ring`: not directly sampled in a focus state. Convention across the brand is to use the yellow primary for focus — recommend mirroring `--primary`.

### Polarity-locked surfaces

ClickHouse is single-polarity (dark-canonical, no documented light marketing variant), so polarity-locked tokens here are the *yellow* surfaces that stay yellow across every context, with the dark inks they pair with:

- `--brand-canvas-yellow` (the testimonial-callout fill, stat-card fill, "Deploy your way" section bg): `oklch(0.9686 0.1699 110.9729)` (= `#faff69`). Live: `https://clickhouse.com/` — `.flip-selection` div on customer quotes, `background-color: rgb(250, 255, 105)`. The same canvas appears under "Deploy your way" wrapping the dark `ClickHouse Cloud` / `ClickHouse Open Source` selector cards.
- `--brand-on-yellow`: `oklch(0.2385 0.0217 111.9115)` (= `#1f2014`). Live: same surface, body text inside the yellow customer-quote card, `color: rgb(31, 32, 20)`. This is a yellow-tinted near-black (chroma 0.0217 on hue 111) — NOT pure neutral, tinted toward the brand hue.
- `--brand-on-yellow-strong` (titles, stat-card labels): `oklch(0.1938 0.0422 109.7692)` (= `#161600`). Live: `https://clickhouse.com/` — stat-card heading `Open Source`, `color: rgb(22, 22, 0)`. Stronger yellow tint at higher chroma 0.0422.
- `--brand-on-primary` (CTA-button text on the yellow primary fill): `oklch(0.1957 0.0000 0)` (= `#151515`). Live: `Start free cloud trial` button child, `color: rgb(21, 21, 21)`. This is the only yellow-paired ink that's pure neutral — chroma 0.

There's an asymmetry worth noting: text on yellow shifts between three inks depending on context (`#1f2014` for body, `#161600` for headings/stat-titles, `#151515` for CTA button labels). That's not arbitrary — they're three lightness stops that all sit below `oklch(0.24 ...)`, the bottom edge of the type-on-yellow contrast envelope.

### Hairlines / dividers

- `--brand-hairline-soft`: not observed as a separate stop. Section dividers visible on homepage and docs are very low-contrast — likely `1px` `oklch(0.2850 0 0)` or similar. Recommend keeping the current `tokens.css` value or letting `--border` carry both roles.
- `--brand-hairline-strong`: `oklch(0.3715 0.0000 0)` (= `#404040`). Live: `https://clickhouse.com/docs` — separator under "ClickHouse Docs" hero card and above "Connect to ClickHouse" section; same value as the docs ghost-button border.

### Drift vs `tokens.css`

The current `tokens.css` has observed drift against today's live brand:

- **`--background: oklch(0.1448 0 0)` (`#252525`) vs live `oklch(0.2381 0.0056 106.8176)` (`#1f1f1c`)**. The current value is too dark AND it strips the warm yellow-axis tint that defines the canvas. Live is lighter (L 0.24 vs 0.14) and warmer (chroma 0.0056 on hue 106). Reconcile: update `--background` to `oklch(0.2381 0.0056 106.8176)`. This single change shifts the whole shell.
- **`--card: oklch(0.2178 0 0)` (`#363636`) vs live `oklch(0.1913 0.0000 0)` (`#141414`)**. The current value is lighter than the live card on the body canvas — and pure neutral, while the live cards inherit the warm tint via the alpha-over-canvas composition. Reconcile: `--card: oklch(0.1913 0 0)` (or add an alpha layer per the live `bg-neutral-900/50` shape).
- **`--brand-muted-soft: oklch(0.6500 0 0)`** (locally lifted from `0.4676` in a prior pass, per the comment in `tokens.css`). Live foot-link muted is `oklch(0.7058 0 0)` (`#a0a0a0`); live pricing-label muted is `oklch(0.9037 0 0)` (`#dfdfdf`). Recommend keeping the lift but split into two semantic stops: `--muted-foreground` at `0.7058` for footer-tier muting, `--brand-body-muted` at `0.9037` for inline muted labels.
- **`--accent: oklch(0.7227 0.1920 149.5793)`** (green). The brand uses no green accent in deployed marketing chrome. The green appears nowhere in the sample. Reconcile: mirror `--accent` to `--primary` (yellow) so accent treatments don't quietly land in a colour that isn't ClickHouse's vocabulary.
- **`--font-sans: Inter, sans-serif`** — partially correct. Inter carries 208 of 234 sampled elements on the cloud page, but **all H1 display headlines use `Basier` (`__basier_a58b65`)** as a separate display family (25 elements, including `h1` on `/cloud`, `/blog`, and others). Reconcile: add a `--font-display: Basier, Inter, ...` token and route `h1` (and the `.suiTitleh1` class) through it; keep Inter on `--font-sans` for the rest.
- **`--shadow-*` scale** — current tokens.css uses `hsl(0 0% 0% / 0.05–0.25)`. Live `div.cui-card` has `box-shadow: var(--shadow-card)` resolving against a custom `--shadow-card` variable inside the live stylesheet (not directly extractable here). For a dark-canonical brand the standard `hsl(0 0% 0%)` shadow is largely invisible — recommend layering a subtle yellow-tinted glow on hover (the live cards apply `hover:shadow-lg`).

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (homepage hero) | Inter | 900 | 96px | 96px | normal |
| Display (cloud hero, blog H1) | Basier | 600 | 60–64px | 80px (blog) | normal |
| Heading (section H2) | Inter | 600 | 36px | ~46.8px (1.3 ratio) | normal |
| Title (card titles, eyebrows scaled up) | Inter | 600 | 18–28px | 24px+ | normal |
| Body | Inter | 400 | 16px | 24px | normal |
| Caption / muted label | Inter | 400 | 14px | 20px | normal |
| Mono (code blocks, ⌘K hint) | SFMono-Regular / Menlo / Monaco / Consolas / Liberation Mono / Courier New | 400 | 13px | 18.85px | normal |

Notes:

- **Two display families.** Inter does the bulk of typesetting at every size from 14px to 96px and every weight from 400 to 900. **Basier is reserved for hero H1 on `/cloud`, `/blog`, and select inner-product pages** — recognisable by its slightly more humanist `g` and narrower `a`. The homepage hero ("The leading database for AI") notably stays on Inter at weight 900. So the heading-family routing is per-page, not strictly per-element. Recommend `--font-display: Basier` with a fallback to Inter so cards rendering "in display mode" without the font loaded degrade gracefully.
- **Hero weight is 900 on Inter.** That's the Inter Black weight, considerably heavier than the typical 700 Bold. The mockup needs to source this weight explicitly via Google Fonts or self-hosted `__Inter` files.
- **Line-height shape.** Display lines pack tight at `lh: fs` ratio (1.0); section H2 expands to ~1.3; body sits at 1.5. The 1.0 ratio on the hero is deliberate — the brand stacks two giant lines flush ("The leading / database for AI").
- **Yellow eyebrow uppercase.** Section eyebrows (`CLICKHOUSE IS TRUSTED BY`, `USE CASES`) render as `p` with `text-sm` (14px) and the yellow `--primary` colour. They're rendered as text-as-tracked-uppercase, not as a separate `<eyebrow>` shape; the visual uppercase comes from the literal text content in the DOM.
- **No serif anywhere.** The brand exposes no serif. The current `--font-serif: ui-serif, Georgia, ...` fallback can stay but is unused.
- **Mono palette.** Code blocks use the system mono stack with the prism colour palette layered on top — no custom mono webfont. The mono is purely a "render code in a recognisably code-shaped font" decision, not a brand expression.

## §4 Component vocabulary

### button-primary

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `.styles_button__3smpn` inside the `Start free cloud trial` anchor.
**Description:** Yellow filled button, 4px corner radius, 48px height, padding `0px 32px`, font 16px Inter weight 600 (`font-semibold`), text colour `#151515`. Background `#faff69` at full chroma. No border. The 4px radius is unusually tight — significantly squarer than the docs `home-page-hero-button` (8px) and feature-card surfaces (8px). This makes the primary CTA feel "stamped" against the softer-cornered surrounding chrome.
**States:** `default` `#faff69` fill; hover not directly sampled. The `Try for free` nav variant uses the same fill at the same 4px radius but at a tighter 36-40px height; treat them as the same component at two scales.

### button-secondary-ghost

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `Contact sales` anchor wrapping `button.styles_button__3smpn`.
**Description:** Transparent fill on the dark canvas, 1px border `#404040`, 8px radius, 48px height, padding matching the primary, white text at 16px weight 600. Used as the right-hand companion to every primary CTA pair (`Start free cloud trial` + `Contact sales`, `Try for free` + `Sign in`).
**States:** `default` outline only; hover likely lifts the border to white (not directly sampled).

### button-secondary-outline (pricing)

**Status:** `current`
**Live source:** `https://clickhouse.com/pricing` — `Estimate your monthly cost` button.
**Description:** Same ghost-outline shape as the secondary-ghost but with a chevron-down icon (`↓`) on the right inside the label. Padding and height match the primary. Used per tier card.
**States:** `default`; opens a modal estimator on click (not entered).

### button-link-yellow

**Status:** `current`
**Live source:** `https://clickhouse.com/blog` — every footer-of-card "Explore X →" cluster on the homepage feature cards; `View all use cases →` on the home filter section; `View All Clients and Drivers →` on the docs landing.
**Description:** Text-only link styled in `--primary` yellow at body size (14px or 16px), with a right-arrow `→` suffix. Used as an inline progressive disclosure when a section deserves a "and there's more" affordance without taking up a CTA slot. Hover is implied but not directly sampled.
**States:** `default` yellow + arrow; hover likely shifts arrow position or underlines (not sampled).

### button-cta-white (cloud-card variant)

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `Get started` button inside the `ClickHouse Cloud` dark card sitting on the polarity-locked yellow "Deploy your way" canvas.
**Description:** Inverted CTA — white fill, dark `#151515` text, 8px radius, full-width inside the card. Used because the card sits on yellow, so the standard yellow primary would disappear into the canvas.
**States:** `default` white fill.

### nav-link

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `header nav a` for `Products`, `Solutions`, `Docs`, `Resources`, `Pricing`, `Contact us`.
**Description:** White text at 14-16px weight 400 with optional caret-down (`Products ⌄`) indicating a dropdown. No underline, no background. Caret rotates on hover/focus. The two "dropdown-bearing" entries (`Products`, `Solutions`, `Resources`) get an additional `aria-expanded` toggle.
**States:** `default` white; hover untested.

### segmented-tab-pill

**Status:** `current`
**Live source:** `https://clickhouse.com/cloud` — top-of-hero `Cloud overview · Cloud vs Open Source · Demo · Features` row.
**Description:** A single dark pill container with rounded ends, holding four label children. The active tab gets a lighter inner fill (`oklch(0.3171 0 0)` ~ `#323232`) — visually a "knob slid to the active label". Padding ~8px vertical, ~16-20px horizontal per label. Acts as in-page section navigation, not as a route.
**States:** `default` knob on left; active label is the one inside the knob; inactive labels render in light-grey on the dark container.

### card-feature

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `div.cui-card` instances under "Built for every modern data challenge" — `Real-time analytics`, `Observability`, `Data warehousing`, `ML & GenAI`.
**Description:** 1px border `#414141` at 0.8 alpha (effectively `rgba(65,65,65,0.8)`), 8px radius (`rounded-lg`), `rgba(20,20,20,0.5)` background, ~362px height. Internal structure top-to-bottom: a yellow-outlined icon box at top (~80px square, 8px radius, 1.75-weight stroked icon in yellow), bold heading (`Real-time analytics`), three-line body in muted text, and a yellow "Explore X →" link footer. The yellow icon-frame is the recognizable signature of this card shape.
**States:** `default`; `hover:shadow-lg` and `transition duration-300` declared (not visually sampled).

### card-stat-yellow

**Status:** `current`
**Live source:** `https://clickhouse.com/` — five-card row under "Why ClickHouse?" — `Open Source`, `Secure, compliant`, `Resource optimized`, `Proven at scale`, `100+ integrations`.
**Description:** Yellow `#faff69` fill, 8px radius, padding `24px 8px`, ~208px height, stacked icon (in dark `#161600`) + two-line heading (in dark `#161600`) + `More →` link at the bottom. Built as a clickable `<a>` carrying the whole card. The visual inverse of `card-feature` — same height proportions, opposite polarity.
**States:** `default`; `group` class declared so a hover on the wrapper can trigger children (the More→ arrow likely slides on hover).

### card-testimonial-yellow

**Status:** `current`
**Live source:** `https://clickhouse.com/` — three stacked customer quotes (Anthropic, Tesla, Lyft).
**Description:** Yellow `#faff69` fill, 8px radius, 40px internal padding, `flip-selection` class indicating a selection-color override is applied. Contains a 16:9 video poster at top (the customer's testimonial recording with a play-button overlay), then a centred 18px serif-feeling quote in `#1f2014` (yellow-tinted near-black), then a centred customer attribution in 18-20px bold (`Anthropic`, `Tesla`, `Lyft`) in the same ink. Used three in a row on the homepage filter-by section.
**States:** `default`; the video plays in-place on click.

### card-pricing-tier

**Status:** `current`
**Live source:** `https://clickhouse.com/pricing` — `Basic`, `Scale`, `Enterprise` columns.
**Description:** Reuses the `cui-card` chassis (8px radius, `#141414`/0.5 fill, `#414141` border) but adds a 1-2px **yellow top-edge accent** rendered as either a pseudo-element gradient or a top-border override (the `borderTopWidth` reports `0px` so the yellow edge is decorative, not a literal border). Internal structure top-to-bottom: `H2` tier name centred, two-line body description centred, `Estimate your monthly cost` outlined button, divider, feature checklist (yellow check + label per row), price block (`Storage / Compute` two-column with `$25.30` and `$0.2181`), per-1TB-month label, primary CTA `Start your 30-day free trial`. The middle (`Scale`) and right (`Enterprise`) columns add an "Everything in {previous tier}, plus:" header above their checklist.
**States:** `default`; no "recommended/most-popular" decoration observed on this snapshot.

### card-on-yellow-canvas (deploy-your-way)

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `ClickHouse Cloud` and `ClickHouse Open Source` cards inside the "Deploy your way" yellow canvas section.
**Description:** Dark `#141414` card sitting on the yellow polarity-locked canvas. 8px radius, ~40px internal padding. Contains: outlined cloud icon at top (white stroke), `H3` title (`ClickHouse Cloud`), two-line body in white-on-dark, white-filled `Get started` button at the bottom (the inverse-polarity CTA noted above). Acts as the dark counter-pole to `card-stat-yellow` — same surrounding canvas, opposite polarity card.
**States:** `default`.

### pill-filter

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `FILTER BY` row under "Build real-time data products that scale" — `Real-time analytics`, `Observability`, etc.
**Description:** Pill-shaped (`rounded-full` equivalent — `border-radius: 9999px`), 1px hairline border on dark, `rgba(0,0,0,0)` background, white 14-16px weight 400/500 label, comfortable horizontal padding (~16px+) with vertical ~6-8px. One pill in the row (`Financial services` in the sample) is in a "selected" state with a slightly stronger yellow-tinted outline. Used as a multi-select filter for the case-study tile beside.
**States:** `default` transparent; `selected` yellow outline; hover `hover:bg-neutral-700/25 hover:text-primary-300`.

### pill-nav-segmented

(See `segmented-tab-pill` above — distinct because of the container chrome.)

### input-search-cmdk

**Status:** `current`
**Live source:** `https://clickhouse.com/docs` — central "Search Documentation" field; same shape in the docs left sidebar.
**Description:** `#282828` fill on the body canvas, 8px radius, search-icon (Lucide-style) left, placeholder `Search`, right-aligned `⌘ K` keybind hint in a smaller mono. No visible border. Used as the universal search affordance across docs.
**States:** `default` no focus ring observed (likely yellow on focus per brand convention).

### input-region-picker (pricing)

**Status:** `current`
**Live source:** `https://clickhouse.com/pricing` — the `N. Virginia (us-east-1)` select between the period toggle and the `Or request a private/other region` link.
**Description:** `#282828` fill, 8px radius, chevron-down indicator on the right, label-left layout. Acts like a select but is implemented as a `<button>` opening a dropdown menu.
**States:** `default`; expanded state not sampled.

### toggle-period (pricing)

**Status:** `current`
**Live source:** `https://clickhouse.com/pricing` — the row of three small dark squares immediately left of the region picker (visible in the live screenshot but not labelled in the rendered snapshot).
**Description:** Three small `~40x36px` dark buttons, the first carrying a 1px yellow outline (the active state), the other two inert dark. Acts as a billing-period toggle but visually intentionally low-emphasis.
**States:** `active` yellow outline; `inactive` flat dark.

### accordion-row-faq

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `FAQs` section at the bottom of the homepage.
**Description:** Each row is a `<button>` carrying: a 2-digit number prefix (`01`, `02`, ...) in muted grey, a vertical hairline divider, the question text in `oklch(0.8744 0 0)` (`#dfdfdf`) at 16px weight 400, and a `+` plus-icon on the right. Padding `0px 8px 0px 16px`. Sits in a stack with no per-row container border — the visual rhythm comes from the number prefix + plus-icon.
**States:** `default` collapsed; `hover:text-neutral-0` (white); `expanded` rotates the `+` to `–` and reveals the answer beneath (not entered).

### accordion-row-deploy-card

**Status:** `current`
**Live source:** `https://clickhouse.com/` — within the "Deploy your way" yellow band, the `ClickHouse Cloud` and `ClickHouse Open Source` selector cards expand to reveal child options on click.
**Description:** Variant of `card-on-yellow-canvas` with an expand chevron — same shape, expanded state shows nested action rows.
**States:** `default` collapsed; `expanded` shows action rows; not deeply sampled.

### eyebrow-yellow-uppercase

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `USE CASES`, `CLICKHOUSE IS TRUSTED BY` headlines above section H2s; `FILTER BY` on the filter section; `Stars` / `Releases` / `Contributors` on the stats band.
**Description:** Yellow `--primary` colour, 14px Inter weight 400, sentence-case-but-rendered-uppercase in the DOM (the text content is literally uppercase). No background, no chip, no underline — just yellow text. The blog-index uses the same shape for category tags (`Engineering`, etc.) in lowercase rendered. Two distinct treatments under one role: marketing-eyebrow (uppercased) and editorial-category-tag (sentence-case).
**States:** `default`.

### scribble-highlight

**Status:** `current`
**Live source:** `https://clickhouse.com/cloud` — under the word `Effortless.` in the hero "Fast. Efficient. Effortless." stack.
**Description:** A hand-drawn-looking irregular yellow rectangle / brushstroke / scribble shape sitting **behind** the headline text (z-index below the type), bleeding slightly past the word edges with a hand-sketched outline. Implemented as an SVG or a CSS clip-path mask, not a flat background-color. Renders as the brand's "marker / Sharpie underline" signature.
**States:** `default` (always present; not animated).

### code-block-pre

**Status:** `current`
**Live source:** `https://clickhouse.com/docs/sql-reference/statements/select` — every `pre.prism-code.language-sql`.
**Description:** `#282828` fill, 3px corner radius (notably smaller than card 8px — code blocks feel "stamped"), 13px monospace, `padding: 13px`, light grey body text `#d4d4d4` with prism `Dark+` syntax colouring on top (`#569cd6` keywords, `#9cdcfe` plain, `#c792ea` punctuation, `#89ddff` operators). No visible copy-button on the homepage docs surface but a `.copyButton_node_modules` class exists in the DOM. `thin-scrollbar` class implies a custom scrollbar.
**States:** `default`; copy-button hover not sampled.

### code-inline

**Status:** `current`
**Live source:** `https://clickhouse.com/docs/sql-reference/statements/select` — `SELECT` and `INSERT INTO` inside the article body paragraph.
**Description:** Mono `SFMono-Regular`-stack at 13px, sits inline in body text with a subtle yellow-tinted background and ~2px×4.55px padding — effectively a yellow inline highlight. Distinct from `<pre>` code (which is grey-on-darker-grey) by carrying the brand colour as a tint behind the token.
**States:** `default`.

### sidebar-tree-doc-nav

**Status:** `current`
**Live source:** `https://clickhouse.com/docs/sql-reference/statements/select` — left column under `Search`.
**Description:** Vertical tree of section headers (`Introduction`, `Syntax`, `Input and Output Formats`, ...) with right-chevron expand indicators on the parents. Each visible leaf (`ALL`, `APPLY`, `ARRAY JOIN`, ...) renders as a `menu__link` at 14px white. The currently-active branch (`SELECT`) carries an expanded chevron (rotated). Active leaf has no separate fill in this snapshot — implied highlight via parent-chevron state.
**States:** `default`; `active` via parent expansion + chevron rotation; `hover` lightens the leaf.

### toc-page-right

**Status:** `current`
**Live source:** `https://clickhouse.com/docs/sql-reference/statements/select` — right column listing page anchors.
**Description:** Vertical anchor list (`Syntax`, `SELECT Clause`, `Dynamic column selection`, ...) with the active item bolder (weight 600 white). Uses `.table-of-contents__link--active` class. No left-border indicator visible on the active item.
**States:** `default` 400 weight; `active` 600 weight.

### feedback-thumbs

**Status:** `current`
**Live source:** `https://clickhouse.com/docs/sql-reference/statements/select` — `Was this page helpful?` row in the right rail.
**Description:** Two square buttons (~36px) with thumbs-up and thumbs-down outlines, no fill. Renders the question label above in 14-16px white.
**States:** `default`; `clicked` swaps icon to filled / yellow (not sampled).

### callout-try-cloud (docs right-rail)

**Status:** `current`
**Live source:** `https://clickhouse.com/docs/sql-reference/statements/select` — the `Try ClickHouse Cloud for FREE` callout below the feedback row, on every docs article.
**Description:** Yellow `#faff69` filled card, 8px radius, padding ~16px, internal layout: close `×` button top-right, heading `Try ClickHouse Cloud for FREE` in dark ink at ~16-18px weight 600, two-line body in dark ink at 14px, `Try it for Free` button at the bottom (small inverted CTA — yellow border on dark canvas inside the yellow card — sample wasn't deep enough to confirm the exact button shape, but the card surface itself is canonical).
**States:** `default`; dismissible via the `×`.

### callout-banner-promo (homepage)

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `Langfuse is now part of ClickHouse...` band immediately below the hero CTAs.
**Description:** Dark card on the body canvas, 8px radius, padding 16px, internal layout: small logo glyph on the left (~48px square inside its own subtle background), body text on the right in muted white, no visible CTA but the whole row is clickable. Visual rhythm signal — a "this happened today" inline promo, not a dismissable announcement.
**States:** `default`; hover lifts shadow.

### floating-widget-ask-ai

**Status:** `current`
**Live source:** `https://clickhouse.com/docs` — bottom-right of every docs surface.
**Description:** Pinned bottom-right widget combining the ClickHouse logomark (in `--primary` yellow on dark) and the `Ask AI` label. ~64px tall, ~120px wide, dark fill, prominent yellow logo, white label. Persistent across docs scroll. The brand's "AI chat is live here" CTA.
**States:** `default`; click opens the AI chat (not entered).

### customer-logo-strip

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `CLICKHOUSE IS TRUSTED BY` band immediately below the announcement card.
**Description:** Two-row horizontally-scrolling carousel of customer wordmarks rendered in **white-only monochrome** at ~24-36px stroke height. The carousel sweeps right at low speed. The brand never tints these logos toward the yellow accent — the wordmarks are sacred and kept white-on-dark.
**States:** `default` auto-scroll; not interactive.

### social-icon-square

**Status:** `current`
**Live source:** `https://clickhouse.com/` — 5-icon row under "Join the ClickHouse Community today" — X / Slack / Telegram / Meetup / LinkedIn.
**Description:** Square button (~48x48px), 8px radius, 1px hairline border `#404040`, white outlined icon (Lucide/brand-specific monochrome glyph) centred. No fill. Sits in a tight row at the very bottom of the homepage body.
**States:** `default`; hover not sampled.

### stat-block-large

**Status:** `current`
**Live source:** `https://clickhouse.com/` — `47.6k+ Stars` / `796+ Releases` / `Contributors` row above the FAQs.
**Description:** Big number in white at ~64-96px weight 600 (Inter), with a yellow `--primary` label beneath in 16px weight 600 (`Stars`, `Releases`, `Contributors`). The number-label pairs sit on dark canvas with no card border — pure type-as-stat.
**States:** `default`.

### header-marketing-double-row (docs)

**Status:** `current`
**Live source:** `https://clickhouse.com/docs` — top two rows of chrome.
**Description:** Marketing top nav (row 1) + docs-section secondary nav (row 2), both on body canvas separated by a 1px hairline `#404040`. Row 2 carries the brand-mark wordmark on the left (`ClickHouse + bold Docs`) and per-section dropdowns (`Get started`, `Cloud`, `Manage data`, `Server admin`, `Reference`, `Integrations`, `ClickStack`, `chDB`, `About`, `Knowledge Base`) plus a language picker (`🇬🇧 English ⌄`) and a sun/moon theme toggle at the right.
**States:** `default`; the language picker and theme toggle are interactive but not sampled.

### footer-six-column

**Status:** `current`
**Live source:** `https://clickhouse.com/` — bottom of every marketing page.
**Description:** Six columns: `Product`, `Resources`, `Company`, `Join our community`, `Comparisons`, and a brand-mark + email-signup block on the far right. Column titles in 14-16px white weight 600; links in 14px `--muted-foreground` (`#a0a0a0`) weight 400 with hover-to-white. The email signup uses an outlined input + yellow `Sign up` button. A `Star us on Github` outlined badge sits below the signup. Below the columns: a row with `© 2026 ClickHouse, Inc. HQ in the Bay Area, CA and Amsterdam, NL.` on the left and legal links (`Trademark · Privacy · Security · Legal · Cookie policy`) on the right.
**States:** `default`.

### blog-card-featured

**Status:** `current`
**Live source:** `https://clickhouse.com/blog` — first/hero post tile.
**Description:** 1-column-left, 1-column-right layout with a `4px` yellow vertical accent on the very left edge (the only place a literal left-border accent appears in the brand). Left column: yellow category eyebrow `Engineering`, large 36-48px headline, two-line body, author avatar + name + `May 22, 2026 · 12 minutes read`. Right column: a code-block illustration as the visual.
**States:** `default`; hover lifts shadow per `hover:shadow-card`.

### error-card-404

**Status:** `current`
**Live source:** `https://clickhouse.com/customers` (404 redirect target).
**Description:** Centred card with light-grey hairline outline, internal padding ~32-48px, contents: H2 `Oops! We can't find this page…` in white, paragraph in muted white, row with outlined `← Go back` button + plain `Go home` text link, divider, row of three yellow text links `Documentation · Our blog · Events`.
**States:** `default`.

### form-input-email-footer

**Status:** `current`
**Live source:** `https://clickhouse.com/` — footer email signup.
**Description:** Compound widget — `Email address` placeholder in `#a0a0a0` muted, dark fill input, paired `Sign up` button on the right in yellow primary. The pair sits inside the footer-rightmost column.
**States:** `default`.

### badge-github-star

**Status:** `current`
**Live source:** `https://clickhouse.com/` — top nav `47.6k` GitHub star counter, plus the footer `Star us on Github`.
**Description:** GitHub octocat glyph + numeric count, rendered as a flat inline label in white 14px (top nav) or as an outlined pill (footer variant — 1px hairline, 8px radius, ~36px height).
**States:** `default`.

### checkmark-list-item (pricing feature row)

**Status:** `current`
**Live source:** `https://clickhouse.com/pricing` — every feature row under a tier.
**Description:** Left-aligned row with a yellow checkmark glyph (Lucide-style, 1.75 stroke) and a white 14-16px label. Row padding tight; multi-line labels wrap with the checkmark hung. Used consistently across all three tier cards.
**States:** `default`.

### price-display-stat

**Status:** `current`
**Live source:** `https://clickhouse.com/pricing` — `Storage $25.30 / Per 1TB / mo` block inside each tier card.
**Description:** Two-column layout (Storage / Compute) per tier card. Each column carries a small label (`Storage` 14px muted), a big price (`$25.30` 28px weight 600 white), and a tertiary label (`Per 1TB / mo` 14px in `#dfdfdf`) with an inline info icon (i-circle) for hover-explainer.
**States:** `default`; info-tooltip on hover not sampled.

## §5 Surface inventory

- `https://clickhouse.com/` — homepage; anchors body canvas, hero typography, primary + secondary CTAs, customer-logo strip, feature-card grid, filter-pill + testimonial-yellow callout, polarity-locked yellow stat-card row, deploy-your-way yellow canvas with dark cards inside, social-icon grid, big-stat triplet, FAQ accordion, six-column footer with email signup.
- `https://clickhouse.com/cloud` — product-page; anchors the **scribble-highlight signature** under `Effortless.`, the in-product UI screenshot composition, the segmented-tab pill, and the Basier display family on the H1.
- `https://clickhouse.com/pricing` — pricing-page; anchors the pricing tier card with yellow top-accent, the outlined "estimate your cost" CTA, the region picker, the period toggle, the storage/compute price display, the checkmark feature list, the yellow "Start your 30-day free trial" per-tier CTA, and the long-form footnote section (`Data transfer for public internet egress...`).
- `https://clickhouse.com/blog` — editorial-page; anchors the yellow-left-border featured-post shape, the yellow category eyebrow tag, the author + date + read-time row, and the code-block-as-illustration tile pattern.
- `https://clickhouse.com/customers` — 404; anchors the error-card-404 shape (this URL has no live page).
- `https://clickhouse.com/docs` — docs-landing; anchors the double-row marketing+docs header, the central search field, the `Connect to ClickHouse` client/driver grid with brand-coloured icons (Java orange, Python blue/yellow, Go cyan, Node.js green — these are the ecosystem brands, NOT ClickHouse colour vocabulary), the `Migrate to ClickHouse` and `Deploy ClickHouse` and `Other Resources` link-card sections, and the floating `Ask AI` widget.
- `https://clickhouse.com/docs/sql-reference/statements/select` — docs-article; anchors the three-column doc shell, the sidebar tree nav with chevrons, the right-rail page TOC + helpful-feedback + try-cloud callout, the `pre.prism-code` code block with VS Code Dark+ token palette, the inline `<code>` with yellow tint, the breadcrumb, and the `Edit this page` ✎ link.

## §6 Notes

- **Yellow is the entire chromatic identity.** ClickHouse runs effectively two-colour: white-on-warm-near-black for the bulk of the page, plus yellow `#faff69` as the single brand accent. There is no documented blue or green or red. The blues and purples visible in the docs code blocks are VS Code's Dark+ palette via `prism-react-renderer`, not brand colours. When previewing the system, do not introduce any third chromatic accent.
- **Inks-on-yellow are tinted, not pure.** Text on yellow surfaces uses three different dark inks (`#1f2014` body, `#161600` headings, `#151515` CTA labels), all of which carry a yellow-axis chroma (except the CTA label which is pure neutral). They're not arbitrary — they're three steps in the type-on-yellow contrast envelope. If the preview synthesises a single "dark ink on yellow", recommend `#1f2014` as the default and `#161600` for emphasis.
- **Polarity-locked yellow surfaces.** Three surface types stay yellow regardless of theme: customer-testimonial callouts (`card-testimonial-yellow`), stat-card row under "Why ClickHouse?" (`card-stat-yellow`), and the "Deploy your way" section canvas. When previewing in a synthesised light variant (if introduced later), these surfaces stay yellow and the inks stay dark — they are not theme-flippable.
- **The signature is the scribble-highlight + the columnar bar visualisation.** Two visual moments are the brand's true differentiators: (1) the hand-drawn yellow marker under `Effortless.` on `/cloud`, and (2) the "Why is ClickHouse so fast?" section's columnar bar-chart visual showing yellow and pink/red horizontal bars representing column-oriented storage. Both lean on the *columnar database* metaphor. If the preview is choosing ONE signature mockup, the columnar-bar visualisation is the most recognisable.
- **Two display families.** Inter for the bulk, Basier for the H1 on `/cloud`, `/blog`, and inner pages. Don't collapse to one family — Basier carries the editorial pages' character.
- **No light marketing variant.** Marketing surfaces (`/`, `/cloud`, `/pricing`, `/blog`) do not respect `prefers-color-scheme: light`. Headless captures with `--force-light-mode` and `--force-dark-mode` produced byte-identical renders (1.05 MB each). The light-mode toggle inside docs `header` likely works inside the docs subdomain only.
- **Inline `<code>` has a yellow tint.** Not a separate component — but the inline-code-in-body pattern is recognisable across the docs and worth modelling as a small yellow-on-dark token band.
- **Accepted contrast tradeoff: muted footer text.** Footer links at `#a0a0a0` on `#1f1f1c` land around 4.0-4.2:1 — below WCAG AA 4.5:1 for body. The brand ships this. Preview can follow but lift to `0.71-0.72` (~`#aaa-#b4b4b4`) for parity with the more contrast-strict pricing-label use.
- **Customer wordmarks are white-only monochrome.** Never tinted toward yellow. If the preview replicates a logo-strip, preserve white-on-dark.
- **Avoid the "voltage moment" cliché.** ClickHouse's brand register is fast, technical, opinionated — not theatrical. Describe the yellow as the brand's signal colour or the highlighter accent, not as voltage or electricity.
- **Halcyon content trap for this brand.** The brand surface heavily features customer-validation language ("ClickHouse played an instrumental role in helping us develop and ship Claude 4.") and stat-bragging ("47.6k+ Stars"). Halcyon previews should not reproduce that shape — replace with Halcyon-team-uses-the-brand neutral content.

## §Known gaps

- **The actual product surface (console.clickhouse.cloud) is gated behind an Auth0 login.** The page renders Auth0's hosted login chrome (white card on dark canvas with `Continue with email` / `Continue with Google` / `Continue with Microsoft` options), which is not ClickHouse's design vocabulary. The genuine SQL Console UI — code editor, results grid, schema browser, query timeline — is unreached this cycle. Component vocabulary lacks: in-product table/grid, code editor, results grid, schema tree, query progress indicator, settings panels, billing dashboard.
- **`/customers` is a 404.** The customer-story shape isn't directly samplable; only the 404 fallback is captured.
- **No popover open in the sample.** `--popover` and `--popover-foreground` are synthesised as mirrors of `--card` until a real dropdown/menu/tooltip is observed.
- **No focus state observed.** `--ring` is synthesised as the yellow `--primary`. Tabbing through the live brand to inspect ring colours wasn't run.
- **Hover state not directly sampled** on most components. Tailwind class names suggest hover behaviours (`hover:bg-neutral-700/25 hover:text-primary-300`, `hover:shadow-lg`) but the actual hover-rendered values weren't captured.
- **The events page (`/events`)** is referenced in the 404 affordances but not visited.
- **`prefers-color-scheme: light` inside docs.** The docs `sun/moon` toggle wasn't activated; whether docs has a documented light variant — and if so, what the light palette is — is unverified.
- **Sign-in / sign-up form chrome inside docs Knowledge Base.** Not visited.
- **Mobile viewport.** All samples taken at 1280x713 / 1440x2200. Mobile-specific surfaces (the hamburger menu, mobile-stacked tier cards) weren't observed.
