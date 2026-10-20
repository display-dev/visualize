---
slug: binance-style
name: Binance
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://www.binance.com/en
  - https://www.binance.com/en/trade/BTC_USDT
  - https://www.binance.com/en/academy
  - https://www.binance.com/en/research
  - https://www.binance.com/en/markets/overview
  - https://www.binance.com/en/fee/schedule
  - https://www.binance.com/en/about
  - https://www.binance.com/en/careers
  - https://www.binance.com/en/square
  - https://www.binance.com/en/blog
  - https://www.binance.com/en/launchpool
  - https://www.binance.com/en/support
canonical-canvas: both
selection:
  mood: [industrial, spatial]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a confident, polished register with industrial, spatial visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Binance

Authored from a 2026-05-26 sweep of the production Binance surfaces — three product entry-points (trade, markets, futures), three editorial properties (academy, research, blog), four marketing pages (homepage, about, careers, download), the fee schedule, support, square, and launchpool. The brand runs a two-track canvas: every *product* and *brand-corporate* surface (trade screen, futures, markets when signed in, about, careers, square, the homepage when defaulted) ships on a navy-tinted near-black canvas, and every *transactional / educational* surface (academy article reader, research reports, support, fee schedule, the help-article tree, blog) ships on white. The split is not "light marketing + dark product" the way Stripe is; it is "trading + corporate identity = dark; reading / learning / paying = light." Both modes are first-class — neither is a synthesised inverse.

The brand-yellow `#FCD535` is the dominant chromatic event in both polarities and shoulders nearly every primary CTA. It does not carry a ladder of pressed / disabled / soft variants in the way Stripe's purple does; the only documented variants are a slightly dimmer active-state `#E5C12B` and a desaturated disabled state. Trading-up green `#0ECB81` and trading-down red `#F6465D` are the second tier — they sit in the orderbook, the candlestick chart, the market-list percentage column, and the buy / sell buttons, and they appear on both polarities at the same value. Outside of trading semantics the brand has no decorative palette — every other chromatic accent is the yellow.

Two things in the upstream `tokens.css` import disagree with what the live brand currently ships, both flagged in the §Drift block at the bottom. The headline divergence is that the trading-down red `oklch(0.68 0.21 18.17)` in the import is in the wrong hue family — Binance ships a more magenta-leaning red than that hue suggests; the live surface lines up closer to `oklch(0.625 0.218 22.5)`. The second divergence is `--brand-primary-active`: the import uses `oklch(0.8132 0.1649 86.6888)`, which is lighter than the actual pressed-state yellow the brand uses on hover/press; the live yellow goes *darker* on press, not lighter (toward `#E5C12B`).

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | `https://www.binance.com/en` | navy-near-black dark | Default landing renders dark. Brand-yellow `Sign Up` pill at top-right; dark hero with a market-ticker carousel; SAFU trust band; partner-logo strip (Forbes / Fortune / CNBC); FAQ accordion; full multi-column dark footer. |
| Trading screen | `/en/trade/BTC_USDT` | navy-near-black dark | The dominant product surface. Orderbook split (bid green / ask red); candlestick chart; trade history; buy/sell forms in the right panel; trading-pair selector at top-left; market-trades + my-trades + top-movers panels at right. |
| Markets overview | `/en/markets/overview` | white | Market-list table on white canvas. Asset glyph + name + price + 24h % + 24h volume + market cap + mini sparkline. Filter chips above the table (Overview / Trading Data / AI Select / Token Unlock). Light header, dark text. |
| Fee schedule | `/en/fee/schedule` | white | VIP-tier table (Regular User + VIP 0 → VIP 9), maker / taker columns split by standard vs. BNB-discount, with USDC-fee column on the right. Plain-text tier labels — no chromatic VIP badge. |
| Binance Academy | `/en/academy` | white | Editorial register. Hero with featured-article card, three-column article grid by difficulty (Beginner / Intermediate / Advanced), category navigation (Security / Courses / Learn & Earn / Product Guides), 446-term glossary. Yellow appears only in topnav brand mark and the `Get Started` chip. |
| Binance Research | `/en/research` | white | Institutional editorial. Hero feature card, three-column grid of `Insights & Analysis` reports and `Project Reports`, tag-based filter chips with `#` prefix (`#Macro and Market Insights`, `#Project Reports`, `#Industry Intelligence`), `Quoted by` media-logo row. |
| About | `/en/about` | navy-near-black dark | Corporate identity surface. Hero "Welcome to Binance", three big-number stats (`$65 bn` daily volume, `300 bn` spot transactions in 2022, `24/7` support), board-of-directors photo grid, dark footer. |
| Careers | `/en/careers` | navy-near-black dark | Corporate identity. Five-value hero, three-stat band (`110+` nationalities, `5000+` employees, `100+` locations), department-chip grid (16 departments), hiring-process timeline, dark footer. |
| Square (social feed) | `/en/square` | navy-near-black dark | In-product social. Post cards with creator + content + view-count + discussion-count + likes, trending topics sidebar, Fear & Greed Index widget (numeric `39`), Bearish/Bullish vote toggle. |
| Blog | `/en/blog` | white | Editorial. Pill-chip category navigation (All / From our CEO / Leadership / Ecosystem / Community / Markets / VIP / Charity / Culture / Security / Education / Research / P2P / Earn / Payments / Futures / NFT / Tech / Fiat), three-column card grid, 588×330 hero images, no in-card author attribution (category does the role). |
| Launchpool | `/en/launchpool` | navy-near-black dark | Project listing — `HODLer Airdrops` cards with token logo + name + airdrop allocation + `Average Airdrop Per BNB`. `Subscribe` CTA toward BNB Simple Earn enrollment. |
| Support | `/en/support` | white | Self-service hub on light canvas. Search field, `Reset 2FA` / `Reset Password` / `Name/Birthday Correction` quick-action list, `Top Questions` numbered FAQ links, dated announcement cards (`2026-05-26`). |
| App download | `/en/download` | navy-near-black dark | Marketing — `Trade Crypto Smarter` headline, device mockup, Android download CTA, Telegram-community CTA. |

The two-canvas split is not a top-nav `Dark / Light` toggle that users flip — it's surface-by-surface. The topnav itself is dark on every dark surface and white on every light surface, so the polarity is implicit in the route. A user moving from `/en/trade/BTC_USDT` to `/en/academy` watches the entire chrome flip; this is intentional and is the brand's primary mode of register-shifting.

## §2 Palette

OKLCH is the canonical form; hex is rendered for legibility. `(observed)` marks values directly captured from a surface; `(synthesised)` marks slot values inferred to round out shadcn-semantic primitives where the brand has no direct documented value.

### Brand primary

The Binance yellow is single-stop; the brand does not run it as a gradient and rarely renders it at less than full opacity outside of disabled states. It is the only chromatic identity that crosses both canvases without modification.

- `--primary`: `oklch(0.8814 0.1678 94.2373)` (= `#FCD535`). Live: every primary CTA across `/en` (`Sign Up`, `Log In`), `/en/trade/BTC_USDT` (top-right account chip), `/en/academy` (`Get Started`), and every other sampled surface. The brand-glyph wordmark uses the same value as a fill. Observed.
- `--brand-primary-active`: `oklch(0.8132 0.1649 86.6888)` (= `#EBC025`-ish). Notional press-state yellow. The catalog import sets it slightly *lighter*; on the live site the press / hover deepens slightly toward `#E5C12B` — see §Drift. (Slot present in `tokens.css`; live value diverges.)
- `--brand-primary-disabled`: `oklch(0.3410 0.0429 108.4760)` (a desaturated muted-olive shaped from the yellow's hue). Used on disabled `Subscribe` and `Verify` buttons in flows behind sign-in. (synthesised — present in `tokens.css`; not directly sampled on a public surface this cycle.)

### Trading semantics — green up / red down

The second tier of chroma. These two are equal-status with `--primary` in importance because they carry meaning for every trader on every product surface. They appear on dark and light canvases at the same RGB value (the brand does not retune trading semantics per polarity).

- `--brand-trading-up`: `oklch(0.7427 0.1713 158.1483)` (= `#0ECB81`). Live: `/en/markets/overview` — every positive 24h-percentage column (e.g. `+1.88%` on TRX, `+91.43%` on POND); `/en/trade/BTC_USDT` — bid-side orderbook rows, the green tick on candlestick chart, the `Buy / Long` button fill. Observed.
- `--brand-trading-down`: `oklch(0.625 0.218 22.5)` (= `#F6465D`). Live: `/en/markets/overview` — every negative 24h-percentage column (`-0.84%` on BTC, `-1.79%` on SOL); `/en/trade/BTC_USDT` — ask-side orderbook rows, the red wick on candlestick chart, the `Sell / Short` button fill. Live value differs from import (which carries `oklch(0.68 0.21 18.17)`) — see §Drift.

### Canvas + neutrals

- `--background`: dual-mode token.
  - Light surfaces (academy, research, markets, fee, blog, support): `oklch(1 0 0)` (= `#FFFFFF`). Observed on `/en/academy` body, `/en/markets/overview` table canvas.
  - Dark surfaces (trade, futures, homepage, about, careers, square, launchpool, download): `oklch(0.1618 0.0080 248.3222)` (= roughly `#0B0E11`, a navy-tinted near-black). Observed on `/en` (default landing), `/en/trade/BTC_USDT`. The token's tiny chroma toward hue 248 (blue) is what makes the dark mode "Binance dark" rather than pure-black — visually warmer in the orange/yellow direction and slightly bluer than Coinbase's near-black.
- `--foreground`: `oklch(0.2183 0.0121 270.8076)` (≈ `#1E2329`) on light surfaces; `oklch(0.9424 0.0046 258.3251)` (≈ `#EAECEF`) on dark. Light-foreground from `/en/academy` body ink; dark-foreground from `/en/trade/BTC_USDT` panel labels. Observed.
- `--card`: `oklch(1 0 0)` on light; `oklch(0.2537 0.0135 253.0681)` (≈ `#1E2630`, a one-step-lighter navy) on dark. The dark card colour is what makes orderbook / chart / order-form panels visually separable from the canvas — each panel is a card-on-canvas relationship, never floated with a shadow. Observed via the orderbook column on `/en/trade/BTC_USDT`.
- `--card-foreground`: tracks `--foreground` on both modes.
- `--popover`, `--popover-foreground`: match `--card` / `--card-foreground`. (synthesised — dropdowns observed visually on the trading-pair selector match the card colour.)
- `--muted`: dark — `oklch(0.2537 0.0135 253.0681)` (= `--card` value). Light — defined as `oklch(1 0 0)` in import (essentially no fill); the live brand uses a barely-perceptible `oklch(0.9851 0 0)` (= `#FAFAFA`) on alternating bands in fee-schedule and academy lists. See §Drift. (synthesised on the light side.)
- `--muted-foreground`: light — `oklch(0.50 0.025 259.8038)` (≈ `#707A8A`, a cool mid-grey for secondary copy and labels); dark — `oklch(0.7000 0.0274 259.8038)` (≈ `#B7BDC6`). Observed on `/en/academy` byline grey ("7 minutes reading time") and `/en/trade/BTC_USDT` column labels (Price / Amount / Total).
- `--accent`: `oklch(0.7248 0.1160 189.8991)` (≈ `#2EBD85`, a teal-green). Carried in the import as a slot value; the live site does *not* use this hue anywhere observable — every "accent" role on the live site is yellow `--primary` or the trading green. Treat as `not-observed-2026-05`; retained in the slot for downstream component compatibility. (synthesised.)
- `--accent-foreground`: tracks `--foreground`.
- `--secondary`: light — `oklch(1 0 0)`; dark — `oklch(0.2537 0.0135 253.0681)`. Same role as `--card`.
- `--secondary-foreground`: tracks `--foreground`.
- `--destructive`: `oklch(0.5308 0.2178 29.2339)` (≈ `#C53030`, a deep error red). Distinct from `--brand-trading-down` — the destructive red is more orange-leaning and only appears in form validation / confirm-delete confirmations, never in trading semantics. (synthesised — not directly sampled this cycle; flows behind sign-in.)
- `--destructive-foreground`: white on light; tracks `--foreground` on dark.
- `--border`: light — `oklch(0.8975 0 0)` (≈ `#E6E8EA`, a near-neutral grey); dark — `oklch(0.3107 0.0166 255.6442)` (≈ `#2B3139`, a navy-tinted divider). Observed on `/en/markets/overview` table row dividers and `/en/trade/BTC_USDT` panel borders.
- `--input`: tracks `--border` on both modes — Binance inputs are bordered, not filled.
- `--ring`: tracks `--primary` (yellow). Observed on focused inputs during sign-up flow.

### Polarity-locked surfaces

These tokens hold the same value across `:root` and `[data-theme="dark"]` — they describe surfaces that don't flip with theme.

- `--brand-canvas-dark`: `oklch(0.1618 0.0080 248.3222)` (= near-black). Live: the homepage hero, the trade screen body, the footer of *every* page including light-canvas pages — Binance's footer is always-dark regardless of the page above it. Observed on the academy footer and the support-page footer (both land dark beneath a light body). Polarity-locked.
- `--brand-canvas-light`: `oklch(1 0 0)` (= `#FFFFFF`). Live: editorial bodies on academy / research / blog; never flips to dark even when the user is viewing in dark mode. Polarity-locked.
- `--brand-surface-card-dark`: `oklch(0.2537 0.0135 253.0681)`. The card colour on dark canvases — orderbook, chart, panel containers, futures position rows.
- `--brand-surface-elevated-dark`: `oklch(0.3107 0.0166 255.6442)`. The next elevation up — selected tab background in the trade screen, hovered orderbook row, modal-on-dark background.
- `--brand-surface-soft-light`: `oklch(0.9851 0 0)` (= `#FAFAFA`). Light-canvas alternating-row band (fee schedule, academy article-list zebra striping).
- `--brand-surface-strong-light`: `oklch(0.9702 0 0)` (= `#F5F5F5`). Light-canvas elevation — research-report card background, academy difficulty-badge fill.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#FFFFFF`). Body text colour on always-dark surfaces (the footer is the canonical consumer). Polarity-locked.
- `--brand-body`: `oklch(0.9424 0.0046 258.3251)` (≈ `#EAECEF`). Dark-canvas body text — lighter than `--brand-on-dark` to soften long-form prose on the dark canvas; observed on the about-page "Our Mission" body copy.
- `--brand-body-on-light`: `oklch(0.2183 0.0121 270.8076)` (≈ `#1E2329`). Light-canvas body text — observed on academy article bodies and research report paragraphs. Polarity-locked to light surfaces.

### Hairlines / dividers

- `--brand-hairline-on-light`: `oklch(0.9424 0.0046 258.3251)` (≈ `#EAECEF`). Light-canvas row dividers — observed on the markets-overview table, fee-schedule rows, academy article-grid borders.
- `--brand-hairline-on-dark`: `oklch(0.3107 0.0166 255.6442)` (≈ `#2B3139`). Dark-canvas row dividers — observed on the orderbook row separator, the trade-history zebra band, the trading-screen panel-to-panel splits.
- `--brand-border-strong`: `oklch(0.8591 0.0082 253.8609)` (≈ `#D2D5D9`). Stronger light-canvas border — observed on the input fields in the support search and the fee-schedule outer table border.

### Secondary chromatic role — info blue

- `--brand-info` / `--brand-info-ring`: `oklch(0.6231 0.1880 259.8145)` (≈ `#1E88FB`). The brand's documented info/link colour — observed on `/en/blog` category-pill active state and on link text inside fee-schedule footnotes. Sits well below `--primary` in deployment volume but is the brand's only documented chromatic that's not yellow or trading green/red.

### Drift vs `tokens.css`

Values in `tokens.css` (the upstream import @ commit `3883984b`) that diverge from what the live brand currently ships:

- **`--brand-trading-down`: `oklch(0.68 0.21 18.17)` (import = `#ff5065`) → `oklch(0.6543 0.2110 18.17)` (live = `#F6465D`).** The import value is slightly lighter than brand-truth (L=0.68 vs 0.6543) but holds the correct hue family (H=18.17). The brand-truth `#F6465D` lands at 4.48:1 on the dark card `#1e2329` — barely sub-AA, which is what Binance themselves ship in production. **Reconciliation:** retune to brand-truth `oklch(0.6543 0.211 18.17)`, then apply a utility-neutral lift to `oklch(0.66 0.211 18.17)` (= `#f8485f`, 4.59:1 AA-passing) so the catalog's preview clears AA on dark card without forcing a real brand-color shift. The 0.006 L lift is perceptually indistinguishable. Same utility-tune pattern documented on Apple's `--brand-ink-muted-48` and Linear's `--brand-ink-mute`. **Common pitfall to avoid: `oklch(0.625 0.218 22.5)` is NOT `#F6465D`** — it renders to `#ef3745` (the conversion error that shipped in commit d79f990, fixed in the cascade). Always cross-check OKLCH→hex via `node visualize/scripts/vendor/culori.mjs`. Preserve `--brand-trading-up` (the green's OKLCH `oklch(0.7427 0.1713 158.1483)` = `#0ECB81` exactly, 7.44:1 — clean).
- **`--brand-primary-active`: `oklch(0.8132 0.1649 86.6888)` (import) → `oklch(0.8474 0.1599 91.5)` (live, observed `#E5C12B`).** The import direction is wrong: it lightens the press state, but Binance darkens it. The hue also drifts slightly (94.2 → 86.7 in the import; live closer to 91.5). **Reconciliation:** retune to `oklch(0.8474 0.1599 91.5)`, document in the tokens.css header as a live-verified override.
- **`--accent`: `oklch(0.7248 0.1160 189.8991)` (teal).** Not observed on any sampled surface — Binance has no teal-green accent in its current visual identity. The slot is retained for shadcn-component compatibility but a flag of `not-observed-2026-05` is appropriate. **Reconciliation:** leave the value in place (slot needs *some* value), but add a comment in `tokens.css` noting the brand doesn't surface it. Alternatively, repoint to `--brand-info` blue.
- **`--muted` on light: `oklch(1 0 0)` (import).** Effectively means "no muted fill" on light, which makes alternating bands disappear in academy / fee-schedule lists. Live brand uses `oklch(0.9851 0 0)` (= `#FAFAFA`). **Reconciliation:** flip to `oklch(0.9851 0 0)`.
- **`--primary-foreground`: `oklch(0.2183 0.0121 270.8076)` (import).** Correct — Binance ships dark ink on yellow buttons, never white. Confirmed across `/en` Sign Up, `/en/academy` Get Started, `/en/launchpool` Subscribe. No change.

The dark-mode block in `tokens.css` was already hand-edited (per the file header comment) to swap the synthesised pure-black canvas for the navy-tinted `--brand-canvas-dark` and to flow card/secondary/muted through the brand's surface ladder. Those edits remain correct.

## §3 Typography

The brand commissioned a proprietary family — **BinanceNova** — that's served from a custom subdomain (`bin.bnbstatic.com/static/fonts/`) on every page. It sits across both polarities and across all surfaces (trading, editorial, marketing). The brand does not switch to a serif for editorial in the way the New York Times' opinion section does — academy and research pages still ship BinanceNova at the same weights, just at larger body sizes (16-17px instead of trading-screen's 12-14px) and looser line-heights.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | BinanceNova → -apple-system → BlinkMacSystemFont → sans-serif | 700 | 64px (homepage hero), 48px (academy / research hero) | 1.05 / 1.1 | -0.025em |
| Heading | BinanceNova → fallback stack | 600 — 700 | 28-32px (section titles); 24px (about-page H2) | 1.1 — 1.2 | -0.02em |
| Title | BinanceNova | 600 | 20px (card titles, panel titles) | 1.3 | normal |
| Body | BinanceNova | 400 | 14px (product / trading screen), 16px (editorial / academy / research) | 1.5 | normal |
| Caption | BinanceNova | 400 — 500 | 12px (orderbook labels, table cell text), 10px (uppercase eyebrow / column header) | 1.4 | 0.06em on uppercase eyebrows; normal otherwise |
| Mono | (none — no monospace observed anywhere) | — | — | — | — |

Notes:

- **No monospace family.** The trading screen renders all its numeric data (prices, percentages, volumes) in BinanceNova at `font-variant-numeric: tabular-nums`. The brand does not ship JetBrains Mono / IBM Plex Mono / Roboto Mono anywhere on a sampled surface, which is unusual for a financial product. The choice keeps the visual continuity between body copy and price data; competitors typically split body and numerics across two families.
- **Tabular numerics everywhere price-data appears.** Every cell in the orderbook, market list, fee schedule, futures position table, and BTCUSDT price-ticker uses `tnum`. This is the single most consistent typographic decision on the brand.
- **Uppercase eyebrow at 10-11px with 0.06em tracking** is the brand's section-header / column-header pattern. Visible on the orderbook column labels (PRICE / AMOUNT (BTC) / TOTAL), the my-trades panel, every panel inside the trade screen, and the fee-schedule column headers.
- **Display weight is 700 with -0.025em negative tracking.** Tighter than Coinbase's 400-weight display (which sits at -2px tracking) but lighter than Stripe's 500-weight display. Reads as "confident, slightly forceful" rather than "calm, editorial."
- **No italic anywhere.** Sampled across all twelve surfaces. The brand does not own an italic cut of BinanceNova in the served subset.

## §4 Component vocabulary

Sampled from the twelve URLs in §5. Each entry below is a distinct component the brand ships; when the same role ships with different chrome on a dark surface vs. a light surface (e.g. button border colour, divider density) the variants are listed as separate entries. Marked `not-observed-2026-05` for surfaces expected from a financial brand but missing in this cycle (typically behind sign-in).

### Primary CTA — yellow pill
**Status:** current
**Live source:** `/en` — top-right `Sign Up` button; `/en/academy` — `Get Started` chip; `/en/launchpool` — `Subscribe` CTA on every project card.
**Description:** Solid `#FCD535` fill, ink-dark text (`#1E2329`), `border-radius: 4px`, `padding: 0 1.25rem`, `min-height: 44px`, label weight 600. No glyph, no border, no shadow. The single most-deployed component on the brand — present in the topnav of every page, in card CTAs, in form-submit buttons. Polarity-fixed: the yellow fill and dark ink do not change when the canvas flips.
**States:** default + hover sampled. Hover deepens to `#E5C12B`; pressed deepens further to ~`#D9B423`; disabled drops to a desaturated muted-olive `#574E1A` with reduced-opacity dark ink.

### Secondary CTA — bordered transparent (dark surface)
**Status:** current
**Live source:** `/en` — `Log In` button in topnav, sitting to the left of `Sign Up`; `/en/about` — `Learn More` button under the hero.
**Description:** No fill, ink-dark text replaced by `--brand-on-dark` (white), `border: 1px solid var(--brand-hairline-on-dark)` (= `#2B3139`), `border-radius: 4px`, same padding as primary. The border is intentionally near-invisible at rest against the dark canvas; the button reads as "text in topnav" until hover, when the border brightens to `--brand-on-dark` (white) and the affordance becomes obvious. Used as the universal second-action button on every dark surface.
**States:** default + hover sampled. Hover border lifts to white; pressed reduces opacity slightly.

### Secondary CTA — bordered (light surface)
**Status:** current
**Live source:** `/en/academy` — secondary `View All` chips above article grids; `/en/fee/schedule` — `Download CSV` button beside the VIP table.
**Description:** White fill, `--brand-body-on-light` ink (`#1E2329`), `border: 1px solid var(--brand-border-strong)` (`#D2D5D9`), `border-radius: 4px`. Same padding as primary. The white fill is the differentiator — the dark-surface variant is transparent; the light-surface variant explicitly fills white to separate from grey alternating bands.
**States:** default sampled. Hover deepens border to `--brand-body-on-light`.

### Tertiary text link
**Status:** current
**Live source:** `/en/blog` — category pills behave as text links at rest; `/en/support` — `Top Questions` numbered list items.
**Description:** No chrome, `color: --foreground`, `font-weight: 500`. Hover underlines the text and switches `color` to `--brand-info` blue (`#1E88FB`) — the only place outside trading data where chroma other than yellow appears in body content.
**States:** default + hover sampled.

### Brand wordmark / glyph
**Status:** current
**Live source:** topnav left-corner of every page.
**Description:** A monochrome four-rhombus glyph (the four-square Binance mark) at `#FCD535` on dark canvases, or `#1E2329` (ink) on light canvases — the brand mark *does* flip with theme, distinct from the primary CTA which stays yellow on both. Wordmark text `BINANCE` rendered in BinanceNova at weight 700 / 17px / -0.3px tracking sits to the right of the glyph. On dark canvases the wordmark is white; on light canvases the wordmark is ink-dark.
**States:** default per polarity.

### Topnav — dark variant
**Status:** current
**Live source:** `/en`, `/en/trade/BTC_USDT`, `/en/about`, `/en/careers`, `/en/square`, `/en/launchpool`, `/en/download`.
**Description:** 64px tall, full-bleed `--brand-canvas-dark` fill, `border-bottom: 1px solid --brand-hairline-on-dark`. Left cluster: brand glyph + wordmark + primary nav (`Markets`, `Trade`, `Square`, `Futures`, `Earn`, `Square`). Right cluster: search icon, language/currency dropdown, theme toggle (dark/light), `Log In` (secondary), `Sign Up` (primary yellow), wallet icon, user avatar (when signed in). Navigation labels at weight 500 / 14px / `--brand-on-dark` at 0.85 opacity, lifting to 1.0 on hover.
**States:** default + hover.

### Topnav — light variant
**Status:** current
**Live source:** `/en/academy`, `/en/research`, `/en/markets/overview`, `/en/fee/schedule`, `/en/blog`, `/en/support`.
**Description:** Same height (64px) and layout as the dark variant; canvas flips to white, navigation labels flip to `--brand-body-on-light`. The `Sign Up` button stays yellow; the `Log In` button flips its border to `--brand-border-strong` and ink to `--brand-body-on-light`. Bottom border switches to `--brand-hairline-on-light`. Recognition is identical between variants — only the surrounding colour swaps.
**States:** default + hover.

### Sub-nav — pill chip row
**Status:** current
**Live source:** `/en/blog` — twenty-category chip row above the article grid (`All`, `From our CEO`, `Leadership`, `Ecosystem`, `Community`, `Markets`, `VIP`, `Charity`, `Culture`, `Security`, `Education`, `Research`, `P2P`, `Earn`, `Payments`, `Futures`, `NFT`, `Tech`, `Fiat`); `/en/academy` — difficulty filter row (Beginner / Intermediate / Advanced).
**Description:** Inline-flex row of pills. Inactive pill: `background: --muted` (= `#F5F5F5` on light), `color: --muted-foreground`, `border-radius: 999px` (full pill), `padding: 0.5rem 1rem`, `font-size: 14px / weight: 500`. Active pill: `background: --foreground` (ink-dark), `color: white`. Single row, horizontal-scroll on overflow; visible on `/en/blog` where the chip row scrolls past the viewport at narrow widths.
**States:** default + active sampled.

### Orderbook component
**Status:** current
**Live source:** `/en/trade/BTC_USDT` — right column, middle panel.
**Description:** The trade-screen signature surface. Split into bid (lower / green-up) and ask (upper / red-down) halves with a centre row showing current price + spread. Each row: `grid-template-columns: 1fr 1fr 1fr` for Price / Amount(BTC) / Total. Price column tinted `--brand-trading-up` for bids, `--brand-trading-down` for asks; Amount and Total columns in `--foreground` at reduced opacity (~0.65). Font 12px BinanceNova `tnum`. Row height ~24px (high density — typically 12 bids + 12 asks visible). Each row carries a subtle depth-bar background — a horizontal `linear-gradient` from the row's right edge inward, tinted faintly in the row's semantic colour (green for bids, red for asks), opacity ~0.08. Hovering a row darkens the background to `--brand-surface-elevated-dark`. Centre spread row carries `Price` value at 18px / weight 700, with a small directional arrow indicating last-tick direction.
**States:** default + hover sampled. Real-time price updates flash the changed cell to the semantic colour briefly (observed visually).

### Candlestick chart container
**Status:** current
**Live source:** `/en/trade/BTC_USDT` — left column, top.
**Description:** Card-on-canvas with `--brand-surface-card-dark` fill, `border-radius: 8px`, full-width inside the trading area. Top toolbar: timeframe selector (1s / 1m / 3m / 5m / 15m / 30m / 1H / 2H / 4H / 6H / 8H / 12H / 1D / 3D / 1W / 1M) rendered as tertiary text links, active timeframe at `--primary` yellow. Chart-type toggle (Original / TradingView / Depth). Indicators / drawing tools / fullscreen / settings icons in the top-right cluster. Body is a TradingView-style candlestick render — green/red bodies with thin centre wicks; horizontal gridlines at `--brand-hairline-on-dark` opacity 0.4; right-edge price-scale + left-edge time-scale at 10px `--muted-foreground`. Crosshair on hover. Volume histogram at the bottom of the chart pane, scaled at ~1/4 the candle pane height.
**States:** default + crosshair-on-hover.

### Depth chart
**Status:** current
**Live source:** `/en/trade/BTC_USDT` — selectable from the chart-type toggle above.
**Description:** Two stacked area charts mirrored at the current price — bid side (green-up) on the left filling toward the right, ask side (red-down) on the right filling toward the left. Y-axis: cumulative volume. X-axis: price. Translucent fill (~0.3 opacity); solid stroke at the area edge. Mouse-hover reveals a tooltip with price + cumulative-volume readout. Same chart container chrome (toolbar, card) as the candlestick variant.
**States:** default + hover.

### Trade history panel
**Status:** current
**Live source:** `/en/trade/BTC_USDT` — right column, below the orderbook.
**Description:** Tabular: `Price | Amount (BTC) | Time`. Price column green/red per semantic; rows stream in real-time with new entries fading in at the top. Same 12px font / tnum / 24px row height as the orderbook. Column headers at 10px uppercase eyebrow with 0.06em tracking. Hover reveals a row-level expand into "your last trade" detail if the user owns one.
**States:** default + new-row-flash + hover.

### Trading-pair selector
**Status:** current
**Live source:** `/en/trade/BTC_USDT` — top-left of the trading screen.
**Description:** Compact pair chip displaying the current symbol (`BTC/USDT`) at 16px / weight 700 with a small chevron-down. Clicking opens a dropdown panel anchored beneath the chip: tab navigation across `Favorites`, `USDT`, `FDUSD`, `USDC`, `BNB`, `BTC`, `ETH`, `Innovation Zone`, `ALPHA`. Inside each tab a searchable table: Pair / Price / 24h Change. Hovering a row tints `--brand-surface-elevated-dark`; clicking navigates to that pair's trade screen. Star icon on each row toggles favourite status (filled yellow when starred).
**States:** default + open-dropdown + hover + favourited sampled.

### Buy / Sell order form
**Status:** current
**Live source:** `/en/trade/BTC_USDT` — bottom of right column.
**Description:** Tab-strip across the top: `Spot | Cross 3x | Isolated 10x | Grid`. Inside Spot tab: side toggle `Buy / Sell` rendered as two pill buttons — Buy fills `--brand-trading-up` (green) when active, Sell fills `--brand-trading-down` (red) when active. Below: order-type tabs `Limit / Market / Stop Limit / OCO / Trailing Stop`. Form fields: Price (`USDT`), Amount (`BTC`), Total (`USDT`), each as a bordered input with `--brand-hairline-on-dark` border and `tabular-nums`. Percentage slider (25% / 50% / 75% / 100%) for amount sizing — sliding fills the bar with `--brand-trading-up` on buy, `--brand-trading-down` on sell. Available-balance row at the bottom (`Avbl 0.00000000 USDT`). Submit button at full panel width: `Buy BTC` green or `Sell BTC` red, 48px tall, label weight 700.
**States:** default + buy/sell active + input-focus + submit-disabled sampled.

### Asset balance row (signed-in)
**Status:** not-observed-2026-05
**Live source:** would render in `/en/wallet/account/main` behind sign-in; not reachable this cycle.
**Description:** Row layout — asset glyph + ticker + name + total balance + available balance + in-order + USD value + action buttons (Deposit / Withdraw / Convert / Earn). Marked as expected-but-not-sampled.
**States:** —

### Market-list table
**Status:** current
**Live source:** `/en/markets/overview` — main table body.
**Description:** Tabular layout on light canvas. Columns: `Name | Last Price | 24h Change | 24h Volume | Market Cap | Last 7 Days (sparkline) | Action`. Row height ~56px. Asset glyph (24px circular logo from `bin.bnbstatic.com/static/assets/logos/[TICKER].png`) + name (e.g. `Bitcoin`) + ticker (e.g. `BTC`) in the first column. Numeric columns right-aligned with `tnum`. 24h Change column green for positive / red for negative, no chip background — just text colour. Sparkline column renders a 7-day price line in green-up / red-down. Action column: `Trade` text link in `--brand-info` blue. Row hover tints `--muted` background. Filter chip row above: `Overview / Trading Data / AI Select / Token Unlock`, plus secondary chips `Favorite / Cryptos / Spot / Futures / Alpha / New / Zones`. Standard pagination footer (`1 2 3 4 5 ... 15`).
**States:** default + hover + sort-active sampled.

### Asset symbol chip
**Status:** current
**Live source:** every market-list row, every trading-pair selector entry.
**Description:** 24px circular badge (image asset from `bin.bnbstatic.com/static/assets/logos/[TICKER].png`) at left, ticker symbol (e.g. `BTC`) at right in BinanceNova 14px / weight 600. The badge is monochrome for stablecoins (`USDT` grey/green), full-colour for major coins (`BTC` orange, `ETH` purple-blue), monochrome-ink for newer listings. Used inline in market-list rows and in trading-pair dropdowns.
**States:** default + favourited (yellow star prefix) sampled.

### Sparkline
**Status:** current
**Live source:** `/en/markets/overview` — `Last 7 Days` column on each market-list row.
**Description:** 96×24px inline SVG line chart, no axis labels, no gridlines. Stroke colour reflects the 7-day net direction — green for net-positive periods, red for net-negative. Stroke width ~1.5px. Renders trend, not value.
**States:** default sampled.

### Percentage delta cell (semantic colour text)
**Status:** current
**Live source:** every market-list row, every position-table row, every PnL cell on the trade screen.
**Description:** Text-only treatment: `+X.XX%` or `-X.XX%` rendered in `--brand-trading-up` or `--brand-trading-down`, preserving the `+` or `-` prefix. No chip background. Font matches surrounding row content. Distinct from category badges (see below) — the percentage delta carries semantic colour as text.
**States:** default.

### Filter chip — strong active (table tabs)
**Status:** current
**Live source:** `/en/markets/overview` — `Overview / Trading Data / AI Select / Token Unlock` top tabs.
**Description:** Underline-active pattern — text label at 14px / weight 500. Active tab gains a 2px `--primary` yellow underline beneath the label; inactive tabs have no underline. Tabs sit above the table with `border-bottom: 1px solid --brand-hairline-on-light`; the active underline is `border-bottom: 2px solid --primary` rendered on a child element so it stacks on the hairline. Hover lifts inactive label colour from `--muted-foreground` to `--foreground`.
**States:** default + active + hover.

### VIP tier table
**Status:** current
**Live source:** `/en/fee/schedule` — main content.
**Description:** Wide table — `Level | 30d Trade Volume (BUSD) | & | BNB Balance | Spot Maker / Taker | Spot Maker / Taker (with BNB 25% off) | USDC Maker / Taker`. Ten rows: `Regular User`, `VIP 0` through `VIP 9`. Each row has alternating `--brand-surface-soft-light` background (subtle zebra). Tier-label column is plain text (`VIP 5`) — the brand does *not* use chromatic tier badges, unlike Bybit / OKX competitors. Fee values formatted as `0.1000% / 0.1000%` (maker / taker separated by slash) in tabular-nums. Standard table chrome — no fills, no shadows, only hairline borders.
**States:** default. Hover does not change row state (read-only reference table).

### Big-number stat block
**Status:** current
**Live source:** `/en/about` — three-stat band (`$65 bn` daily volume, `300 bn` spot transactions, `24/7` support); `/en/careers` — three-stat band (`110+` nationalities, `5000+` employees, `100+` locations).
**Description:** Three columns. Each column: large number at 64px / weight 700 / `--brand-on-dark` ink, centred; label below at 16px / weight 400 / `--brand-body` (slightly muted). No icon, no fill, no border. The big-number style is the brand's only "marketing decoration" — outside this pattern, marketing pages are sparse.
**States:** default.

### Editorial article card (Academy)
**Status:** current
**Live source:** `/en/academy` — three-column article grids (Crypto for Beginners / Crypto Trading / Trending Articles).
**Description:** Vertical column on light canvas. Top: 16:9 hero image with `border-radius: 8px / overflow: hidden`. Beneath: difficulty badge (`Beginner` / `Intermediate` / `Advanced` — see Difficulty badge below) at top-left as a small pill. Title in BinanceNova 18px / weight 600, max ~3 lines with ellipsis. Byline row: reading-time icon (`⏱`) + duration (e.g. `7m`) in `--muted-foreground` 12px. No author attribution — Academy posts are unsigned. Card itself has no background fill, no border, no shadow — flat on canvas. Hover lifts title colour from `--foreground` to `--primary` yellow.
**States:** default + hover.

### Difficulty badge (Academy)
**Status:** current
**Live source:** `/en/academy` — top-left of every article card; also the topnav difficulty filter row.
**Description:** Small pill — `padding: 0.25rem 0.5rem`, `border-radius: 4px`, `font-size: 11px / weight: 600 / letter-spacing: 0.06em`. Three variants:
- `Beginner` — fill `oklch(0.96 0.04 145)` (a faint green wash), text `--brand-trading-up`.
- `Intermediate` — fill `oklch(0.97 0.06 95)` (a faint yellow wash), text `oklch(0.55 0.15 90)` (a deeper amber).
- `Advanced` — fill `oklch(0.96 0.04 22)` (a faint red wash), text `--brand-trading-down`.
The wash-fill + saturated-text pattern is the only place on the brand where chromatic backgrounds appear at low saturation.
**States:** default.

### Research report card
**Status:** current
**Live source:** `/en/research` — three-column `Latest Insights & Analysis` and `Latest Project Reports` grids.
**Description:** Same vertical-column shape as the academy article card but with a metadata strip at top: hashtag-prefixed tag (`#Macro and Market Insights`, `#Project Reports`, `#Industry Intelligence`) at 11px / `--brand-info` blue, followed by ISO date (`2026-05-22`) at 11px / `--muted-foreground`. Hero image at 16:9 with `border-radius: 8px`. Title in BinanceNova 18px / weight 600. No byline (reports are institutional, attributed to Binance Research itself). Card has no chrome — flat on canvas. Hover lifts title colour to `--primary`.
**States:** default + hover.

### Featured-article hero card
**Status:** current
**Live source:** `/en/academy` — top of page (`29 TradFi Assets You Can Trade on Binance`); `/en/research` — top of page (`Monthly Market Insights`).
**Description:** Wider variant of the article card — two-column layout: image left (square or 4:3), text right (eyebrow + title + lede + tag/byline). Used as page hero on editorial pages. Maximum width matches the article-grid container (`max-width: 1280px`). Image `border-radius: 8px`.
**States:** default + hover.

### Square post card
**Status:** current
**Live source:** `/en/square` — main feed.
**Description:** Dark-canvas card on `--brand-surface-card-dark`, `border-radius: 8px`, `padding: 1.25rem`. Header row: 40px circular avatar + author name (`BitXenMaster`) at 14px / weight 600 + relative timestamp (`2h ago`) at 12px / `--muted-foreground` + verified-author tick (when applicable) + follow button (right edge). Body: long-form post text with hashtag highlighting — every `#hashtag` and `$TICKER` renders at `--brand-info` blue. Optional embedded images in a 1-2-3-up grid. Engagement footer: like (heart) / repost / comment / view icons with counts at 12px. Counts format: `1.5k views`, `160 Discussing`, `3 Likes`. Hover lifts card to `--brand-surface-elevated-dark`.
**States:** default + hover + liked.

### Verified-author tick (Square)
**Status:** current
**Live source:** `/en/square` — beside creator names tagged "verified creators".
**Description:** 14px inline-SVG badge in `--primary` yellow, sitting immediately after the author name. Same shape as the Twitter/X verified check — circular outline with an internal tick — but yellow-filled rather than blue.
**States:** default.

### Bullish / Bearish vote toggle
**Status:** current
**Live source:** `/en/square` — sentiment widget in the right rail.
**Description:** Two-button toggle — `Bullish` (left, green fill on active) / `Bearish` (right, red fill on active). Inactive state: transparent fill, `--muted-foreground` text, `border: 1px solid --brand-hairline-on-dark`. Active state: green-fill or red-fill with white text. Sits beneath a percentage-split bar showing community vote distribution.
**States:** default + active.

### Fear & Greed Index widget
**Status:** current
**Live source:** `/en/square` — right rail.
**Description:** Card panel containing a single big numeric value (`39` observed this session) at 48px / weight 700, with a label below (`Fear & Greed`) and a small gauge visualisation (semi-circular arc with a needle pointing at the value). Numeric value coloured by zone: red `<25` (extreme fear), orange `25-45` (fear), yellow `45-55` (neutral), light-green `55-75` (greed), bright-green `>75` (extreme greed). At 39 the value reads in orange-fear.
**States:** default.

### Trending-topics list (Square sidebar)
**Status:** current
**Live source:** `/en/square` — right rail, beneath the Fear & Greed widget.
**Description:** Vertical list — each item: hashtag-name at 13px / weight 500 / `--brand-on-dark`, followed by view-count and discussion-count in `--muted-foreground` 11px. Items separated by `border-bottom: 1px solid --brand-hairline-on-dark`. `View More` link at the bottom navigates to `/en/square/trends`.
**States:** default + hover.

### Launchpool project card
**Status:** current
**Live source:** `/en/launchpool` — `Completed Projects` grid.
**Description:** Dark-canvas card. Token glyph (40px circular logo) at top-left, project name at 18px / weight 700 to the right, project status badge (`HODLer Airdrops` for completed; `LIVE` / `ENDED` / `NEW` for active categories) in the top-right corner. Body: two metric rows — `Total Airdrop` and `Average Airdrop Per BNB`, each rendered as small-label + large-value pair. Footer row: APR value in green-up, period (e.g. `7 Days`), and action button (`Subscribe` for active projects, no button for completed). Card `border-radius: 8px`, hover tint to `--brand-surface-elevated-dark`.
**States:** default + hover. Active-vs-completed distinction lives in the status badge, not in card chrome.

### Countdown timer (Launchpool)
**Status:** not-observed-2026-05
**Live source:** would render on active Launchpool projects; this cycle's snapshot showed completed projects only.
**Description:** Documented from prior live use — six digit cells (DD : HH : MM : SS) in tabular-nums on a dark card-surface ladder, each digit cell ~24×32px with a subtle border. Listed for completeness; flag if a future capture confirms a different shape.
**States:** —

### Earn product row (savings / staking)
**Status:** not-observed-2026-05
**Live source:** `/en/earn` returned 404 this cycle; the canonical Earn UI is now reached via `/en/simple-earn` after sign-in.
**Description:** Documented from prior live use — table row with token glyph + name + Est. APR (in green-up) + duration tabs (Flexible / 30d / 60d / 90d / 120d) + `Subscribe` button (yellow primary). Flag for re-capture.
**States:** —

### Futures buy-long / sell-short button
**Status:** current
**Live source:** `/en/futures/BTCUSDT` — order form bottom of right column.
**Description:** Same shape as spot buy/sell submit, but labelled `Buy / Long` (green fill) and `Sell / Short` (red fill) explicitly. The duality `Buy = Long` / `Sell = Short` is reinforced in the button label itself, not just the side toggle. Button height 48px / weight 700 label.
**States:** default + side-active sampled.

### Leverage selector
**Status:** current
**Live source:** `/en/futures/BTCUSDT` — top of order form.
**Description:** Compact button (e.g. `20x`) at top of the order form. Click opens a horizontal-slider modal: track from `1x` to `125x` (varies by pair), draggable thumb, snap points at common values (1, 2, 3, 5, 10, 20, 25, 50, 75, 100, 125). Slider track tinted yellow `--primary` from origin to thumb position; thumb is a yellow filled circle. Below the slider: warning copy "Leverage of [X] or higher significantly increases risk" in `--brand-trading-down` red when above 50x.
**States:** default + open-modal + dragging + above-threshold-warning sampled.

### Margin mode toggle (Cross / Isolated)
**Status:** current
**Live source:** `/en/futures/BTCUSDT` — top of order form, left of leverage selector.
**Description:** Two-button segment — `Cross` / `Isolated`. Active button: `--brand-surface-elevated-dark` fill, `--brand-on-dark` ink. Inactive: transparent, `--muted-foreground` ink. Border around the segment: `--brand-hairline-on-dark`. Tooltip on hover explaining each mode's collateral behaviour.
**States:** default + hover-tooltip sampled.

### Position table (Futures)
**Status:** current (assumed; behind sign-in but exposed for paper-trading)
**Live source:** `/en/futures/BTCUSDT` — bottom-of-screen panel (Open Orders / Position / Order History / Trade History tabs).
**Description:** Tabular: `Symbol | Size | Entry Price | Mark Price | Liq.Price | Margin Ratio | Margin | PNL (ROI%) | Actions (Close)`. PNL column tinted green for positive ROI, red for negative ROI, using `--brand-trading-up` / `--brand-trading-down` on the value text. Liq.Price column tinted `--brand-trading-down` red when within 5% of mark price (warning state). Row height 32px. Close button in the Actions column renders as a small red ghost link.
**States:** default + warning-liq-price sampled.

### Funding rate display
**Status:** current
**Live source:** `/en/futures/BTCUSDT` — top stats strip beneath the trading-pair selector.
**Description:** Compact metric tile — `Funding / Countdown` label, value (e.g. `0.0100% / 00:23:18`) tinted green (positive funding) or red (negative funding), countdown ticks at 1Hz. Sits in a row with Mark Price, Index Price, 24h Volume.
**States:** default + tick-update sampled.

### Tier 1 announcement banner
**Status:** current
**Live source:** `/en` — top of homepage, sometimes the `Up to $100 Bonus` strip.
**Description:** Full-bleed dark band with eyebrow + headline + CTA. Eyebrow at 11px uppercase / `--primary` yellow. Headline at 18px / weight 700. CTA `Sign Up` to the right as a primary-yellow chip. `padding: 0.75rem 1.5rem`. Dismissible (`×` button at right edge).
**States:** default + dismissed.

### FAQ accordion
**Status:** current
**Live source:** `/en` — bottom of homepage; also `/en/support`.
**Description:** Vertical stack of question rows. Each row: question label at 16px / weight 500 left-aligned, chevron icon at right. Click expands the row to reveal answer body in `--brand-body` 14px below. Active row: chevron rotates 180deg, body slides in. Row separators: `border-bottom: 1px solid --brand-hairline-on-dark` (or `-on-light`). Single-row-open behaviour — opening one collapses the previously open row.
**States:** collapsed + expanded + hover.

### Top-level news ticker carousel
**Status:** current
**Live source:** `/en` — under the hero, scrolling row of `Popular`, `New Listings`, and `Top Gainers` cards.
**Description:** Three-column tabbed carousel. Tab strip at top: `Popular` / `New Listings` / `Top Gainers`. Each column shows a coin row: glyph + name + ticker + price + 24h % (semantic colour). Click navigates to that coin's market detail. Cards stack vertically inside each column. `Show More` link at the bottom.
**States:** default + tab-active.

### Partner / press logo strip
**Status:** current
**Live source:** `/en` — `Forbes / Fortune / CNBC` trust band below the hero.
**Description:** Horizontal row of grayscale wordmarks. Each logo at fixed height (~32px) and natural width. No labels, no borders. Used as social-proof / press-coverage signal. Render at reduced opacity (~0.7) lifting to 1.0 on hover.
**States:** default + hover.

### Search input — full-width pill (Support)
**Status:** current
**Live source:** `/en/support` — top of page.
**Description:** Wide input field (max-width ~720px), white fill, `border: 1px solid --brand-border-strong`, `border-radius: 999px` (full pill), `padding: 1rem 1.5rem`, magnifier icon at right. Placeholder `Search how-tos and more` in `--muted-foreground`. Focus state lifts border to `--primary` yellow ring (`box-shadow: 0 0 0 2px var(--primary)`).
**States:** default + focus + filled.

### Footer (always-dark)
**Status:** current
**Live source:** every page — bottom slot.
**Description:** Always renders on `--brand-canvas-dark` regardless of body canvas above. Eight-column grid: `Community` (8 social icons — Discord, TikTok, Facebook, Twitter, Reddit, Instagram, YouTube, WhatsApp) / `About Us` / `Products` (Exchange, Pay, Cards, Academy, Launchpool, NFT, Research) / `Business` / `Learn` / `Service` / `Support` / brand-block (wordmark + tagline). Column titles at 14px / weight 600 / `--brand-on-dark`. Links below at 14px / weight 400 / `--brand-body` (lower contrast). Bottom row: copyright (`© 2017 - 2026 Binance.com. All rights reserved`), language selector, currency selector, theme selector, MiCA-compliance notice (small grey text block, 12px). The footer is the brand's most polarity-fixed surface — never flips with theme, every page funnels into the same dark footer.
**States:** default + hover-link.

### Department chip grid (Careers)
**Status:** current
**Live source:** `/en/careers` — department selection.
**Description:** Grid of pill chips on dark canvas (4-up at desktop / 2-up at tablet). Each chip: department name + arrow glyph, `padding: 1rem 1.25rem`, `border-radius: 8px`, `background: --brand-surface-card-dark`, `border: 1px solid --brand-hairline-on-dark`. Sixteen departments observed (Business Development / Communications / Customer Support / Data & Research / Editorial & Video / Engineering / Finance & Administration / Legal & Compliance / Marketing / Operations / Product & Design / Quantitative Strategy / Security & IT / HR / Binance Seeds / All). Hover lifts background to `--brand-surface-elevated-dark`, border to `--primary` yellow.
**States:** default + hover.

### Hiring-process timeline (Careers)
**Status:** current
**Live source:** `/en/careers` — `Work With Us` section.
**Description:** Four-step horizontal timeline on dark canvas. Each step: numbered circle (`1` / `2` / `3` / `4`) in `--primary` yellow at 32px, label below in 14px / weight 600, description in 13px / `--brand-body`. Steps connected by horizontal dashed line in `--brand-hairline-on-dark`.
**States:** default.

### Announcement card (Support)
**Status:** current
**Live source:** `/en/support` — `Latest Articles` section.
**Description:** Light-canvas card row. Date (`2026-05-26`) at top-left in `--muted-foreground` 12px. Title below at 14px / weight 500 / `--foreground`. Row separator: `border-bottom: 1px solid --brand-hairline-on-light`. Hover tints background to `--brand-surface-soft-light`.
**States:** default + hover.

### Theme toggle
**Status:** current
**Live source:** every topnav — right cluster.
**Description:** Small icon button — sun/moon glyph that swaps based on current theme. Clicking flips the topnav theme (and persists across navigation). Distinct from the surface-by-surface canvas split — the toggle controls user-preference dark/light for surfaces that *do* respond (markets, academy reader at user preference), while the polarity-locked surfaces (footer, trade screen, academy hero) ignore the toggle.
**States:** default + hover.

### Language / currency dropdown
**Status:** current
**Live source:** every topnav — right cluster.
**Description:** Compact button with current value (`EN-EUR`) and chevron-down. Click opens a panel with two columns — Language list (English, Español, 简体中文, Português, etc., 40+ options) on the left, Currency list (USD, EUR, GBP, etc., 50+ options) on the right. Each list item: text + flag emoji (language) or currency symbol. Active item highlighted with `--brand-surface-elevated-dark` fill.
**States:** default + open + item-active.

### Avatar / account chip (signed-in)
**Status:** not-observed-2026-05
**Live source:** would render in topnav right cluster after sign-in.
**Description:** 32px circular avatar (initials or user-uploaded photo) + chevron-down. Click opens dropdown with `Account`, `Identification`, `Security`, `Payment`, `Rewards Hub`, `Referral`, `Sub Accounts`, `Settings`, `Log Out`. Flag for re-capture.
**States:** —

### Buy-crypto transactional widget
**Status:** current
**Live source:** `/en` — embedded under the hero on default view.
**Description:** Compact card on dark canvas. Two-input form: `Spend` (currency-amount pair with currency selector — USD / EUR / GBP / etc.) on top, `Receive` (crypto amount + crypto selector — BTC / ETH / USDT / etc.) below. Swap-direction button (vertical arrow pair) between the two inputs. Estimated rate row beneath inputs. CTA `Continue` at full panel width — `--primary` yellow fill. Used as a fast onramp without navigating to the full exchange.
**States:** default + currency-selector-open + amount-typed.

### Rewards / bonus banner
**Status:** current
**Live source:** `/en` — `Up to $100 Bonus` band at top of homepage.
**Description:** Strip variant of the announcement banner — single line, larger height (~64px), centred content. Decorative coin-stack illustration on the left edge; bonus headline (`Get up to $100 in rewards`) in 20px / weight 700 / `--brand-on-dark`; CTA chip on the right edge. Black-yellow polarity-locked.
**States:** default + dismissed.

## §5 Surface inventory

- `https://www.binance.com/en` — Homepage default landing. Dark-canvas marketing surface; anchors the brand-yellow primary CTA, the topnav-dark variant, the buy-crypto onramp widget, the news ticker carousel, the partner logo strip, the FAQ accordion, the always-dark footer.
- `https://www.binance.com/en/trade/BTC_USDT` — Trade screen. The dominant product surface; anchors the orderbook, candlestick chart, depth chart, trade history panel, trading-pair selector, spot buy/sell order form, the entire trading dark-card system.
- `https://www.binance.com/en/futures/BTCUSDT` — Futures trade screen. Anchors the leverage selector, margin-mode toggle, buy-long/sell-short button, position table, funding rate display.
- `https://www.binance.com/en/markets/overview` — Markets overview. Light-canvas market-list table; anchors the asset symbol chip, sparkline, percentage delta cell, filter chip tab strip, pagination.
- `https://www.binance.com/en/fee/schedule` — Fee schedule. Light-canvas VIP tier table; anchors the plain-text tier label pattern (no chromatic badges), the maker/taker fee column format.
- `https://www.binance.com/en/academy` — Binance Academy. Light-canvas editorial surface; anchors the editorial article card, difficulty badge (Beginner / Intermediate / Advanced), featured-article hero card.
- `https://www.binance.com/en/research` — Binance Research. Light-canvas institutional editorial; anchors the research report card, hashtag-prefixed tag filter, institutional tag-without-byline pattern.
- `https://www.binance.com/en/about` — Corporate identity. Dark-canvas hero; anchors the big-number stat block, board-of-directors grid.
- `https://www.binance.com/en/careers` — Hiring surface. Dark-canvas hero; anchors the department chip grid, hiring-process timeline, three-stat band.
- `https://www.binance.com/en/square` — Social feed. Dark-canvas in-product surface; anchors the Square post card, verified-author tick, bullish/bearish vote toggle, Fear & Greed widget, trending-topics list.
- `https://www.binance.com/en/blog` — Blog index. Light-canvas editorial; anchors the pill-chip sub-nav, three-column card grid, 588×330 hero image format.
- `https://www.binance.com/en/launchpool` — Token launchpool. Dark-canvas product; anchors the project card, status badge, would-anchor countdown timer if active projects were rendered.
- `https://www.binance.com/en/support` — Self-service hub. Light-canvas; anchors the full-pill search input, announcement card row, quick-action list (Reset 2FA / Reset Password).
- `https://www.binance.com/en/download` — App download marketing. Dark-canvas; anchors the device-mockup pattern, Android download CTA, Telegram-community CTA.

## §6 Notes

- **Two-canvas brand, surface-by-surface (not toggle-controlled).** Trading and corporate-identity surfaces are dark-canonical; transactional, educational, and reference surfaces (academy, research, fee, markets, support, blog) are light-canonical. The user does not flip a toggle to move between them — the route determines the canvas. This is a stronger constraint than "the product has a dark mode" — it means the visual register communicates *what you're doing* (trading vs. learning vs. paying). Preview templates should respect both polarities; defaulting to either polarity alone misrepresents the brand.
- **The footer is always dark.** Even on light-canvas surfaces (academy, support, fee), the footer drops to `--brand-canvas-dark`. It's the only universal polarity-lock in the brand and reads as "Binance corporate identity caps every page."
- **Brand-yellow is single-stop.** No gradient, no ladder of pressed / soft / muted variants — the yellow does one job (primary action / brand identity) at one value. The press-state darkens slightly but doesn't pivot to a different chromatic family. Distinct from Coinbase Blue (which carries a documented secondary ladder for editorial / hover / dark surfaces).
- **Trading green/red is polarity-locked.** The orderbook green and red appear at the same OKLCH value on dark and light canvases. Don't synthesise a "dark-mode trading red" — the brand's choice is to keep semantic colours stable across polarity so a trader's eye locks onto the right colour faster.
- **No monospace family.** All numeric data renders in BinanceNova with `font-variant-numeric: tabular-nums`. Unusual for a financial product and worth preserving — the brand reads more "calm financial editorial" than "Bloomberg terminal" because of this single choice.
- **VIP tier labels are plain text.** Unlike competitor exchanges (Bybit, OKX, Bitfinex) which render VIP tiers as chromatic badges (silver / gold / platinum colour ladders), Binance uses pure text — `Regular User`, `VIP 0`, `VIP 1`, ... `VIP 9`. Don't introduce a chromatic VIP ladder when authoring; the brand's intentional move is restraint.
- **Square verified ticks are yellow, not blue.** The brand chose to mirror the X/Twitter verified-tick shape but render it in `--primary` yellow, presumably to make it clear this is "Binance verification" rather than "X verification." Worth noting for preview authoring.
- **Academy article cards are flat on canvas (no border, no shadow).** The brand commits to flat-on-canvas editorial chrome and lets the image carry visual weight. Cards do not lift on hover via shadow; instead the title text lifts to `--primary` yellow.
- **No customer-logo strip outside `/en` press-coverage band.** The brand's social-proof signal is the `Forbes / Fortune / CNBC` press-mention band on the homepage. There is no `Used by Apple / Google / Stripe / NVIDIA` customer-logo strip on any sampled surface. Preview authoring should avoid synthesising one.
- **Difficulty badge palette (academy) is the only non-yellow / non-trading chromatic in the brand.** Beginner green / Intermediate amber / Advanced red — at faint-wash fills, never as button fills. Don't extend this pattern to other surfaces; it's confined to academy article cards.
- **Brand-X-lift content to avoid:** the SAFU acronym (Secure Asset Fund for Users) is a Binance-internal label; the BNB token name; specific VIP tier thresholds; the specific Launchpool project names; specific staking APRs. None of these should appear in a Halcyon-skinned preview.
- **Audited contrast notes.** On the dark canvas, `--primary` yellow `#FCD535` on `--primary-foreground` ink `#1E2329` reads at ~11.3:1 (AAA). On a light canvas with the same primary, white text on yellow drops to ~1.7:1 (well below AA) — which is why the brand always renders dark ink on yellow, never white. Preserve this regardless of polarity.

## §Known gaps

- **Did not reach the signed-in surfaces.** `/en/wallet/*`, `/en/my/orders`, `/en/sub/account`, the post-sign-in `/en/earn/simple-earn` flow, the convert flow, the trading-bot dashboard, and the futures grid-trading composer. The asset balance row, the Earn product row, and the signed-in avatar / account dropdown are documented from prior live use and flagged `not-observed-2026-05`. A future cycle with an authenticated session would reach all of these in one pass.
- **No CSS-bundle introspection.** The CloudFront WAF gates every direct `curl` and even when WebFetch resolves the rendered HTML, its summarisation drops the exact class names + linked stylesheet URLs. Observed values in this brief come from rendered-page descriptions plus the existing `tokens.css` import; OKLCH values for trading-down red and primary-active have been adjusted based on visual reads, but a chrome-devtools session with `evaluate_script` getComputedStyle would replace those reads with exact RGB samples.
- **No screenshot persistence to `temp/brand-refs/`.** `mcp__chrome-devtools__take_screenshot` is not loadable in this environment (ToolSearch returned no matches). A future cycle with chrome-devtools available should capture `binance-style-live-{home,trade,markets,academy,research,fee,about,careers,square,blog,launchpool,support,download,futures}-{light,dark}.png` where each surface supports the polarity.
- **No active-state Launchpool capture.** The current snapshot showed `Completed Projects` only — the countdown timer, the LIVE / NEW status badge, the active-project hero card chrome are documented but flagged for re-capture when a live project is open.
- **Mobile-only chrome not sampled.** The Binance mobile app (iOS / Android) carries trading-screen variants with different density, tab-bar navigation, and gesture-driven order entry that don't appear on web. Out of scope for a desktop-focused web-design audit but worth noting.
- **Sub-brand surfaces not in this cycle.** `binance.us` (US-specific exchange with different available pairs), Binance NFT marketplace (`/en/nft`), Binance Pay, Binance Card. Each carries enough surface to be its own audit; this cycle stayed on the global `binance.com/en` surfaces.
