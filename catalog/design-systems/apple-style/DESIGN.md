---
slug: apple-style
name: Apple
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://www.apple.com/
  - https://www.apple.com/iphone/
  - https://www.apple.com/mac/
  - https://www.apple.com/apple-watch/
  - https://www.apple.com/apple-vision-pro/
  - https://www.apple.com/apple-music/
  - https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/
  - https://www.apple.com/shop/buy-iphone/iphone-17-pro
  - https://support.apple.com/
  - https://support.apple.com/en-us/108795
  - https://developer.apple.com/
  - https://developer.apple.com/fonts/
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

# Apple

## §1 Canonical canvas

Apple does not pick a single canvas — it picks *per tile*. The homepage stacks promo tiles in a ragged grid where adjacent tiles can be pure black, near-black brown, parchment, or mid-blue, and the design language is "the photograph chooses the canvas." The global navigation bar swaps via `prefers-color-scheme` (light `#fafafc` / dark `#161617`), so even the chrome is bi-modal. Developer surfaces ship an explicit Light / Dark / Auto toggle at footer. The HIG itself documents both modes as first-class.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | `https://www.apple.com/` | mixed; tile-by-tile | Inline `background-color:` on promo tiles harvests as `#000000`, `#1246c4`, `#271810`, `#9fc6f4`, `#3397d4`, `#a4618d`, `#729585`, `#24170c`, `#f4f8fb` — i.e. pure black, deep blue, near-black brown, pale blue, mid blue, dusty rose, sage, near-black warm-brown, pale blue-tinted-white. The page bg between tiles is parchment `#f5f5f7`. |
| iPhone product | `https://www.apple.com/iphone/` | parchment between tiles, tiles mixed | "Explore the lineup" grid sits on white; product hero tiles independently choose dark or photo-driven canvas. |
| Mac product | `https://www.apple.com/mac/` | parchment, predominantly light tiles | Less polarity-flip than the iPhone page; most product tiles light-canvas with photographic product art on top. |
| Apple Watch | `https://www.apple.com/apple-watch/` | parchment + per-model tile | Each watch (Series 11 / SE 3 / Ultra 3) gets its own canvas. |
| Apple Vision Pro | `https://www.apple.com/apple-vision-pro/` | white, full-bleed photo sections | Hero is white with the headset photograph dominating; immersive sections are typically near-black `#1d1d1f` with white type. |
| Apple Music | `https://www.apple.com/apple-music/` | white | Pricing cards and product tiles on a single parchment canvas. No coral / dark-mode marketing skin on the marketing page. |
| Newsroom article | `/newsroom/2024/06/introducing-apple-intelligence-…` | white | Editorial canvas is pure white, body in `#1d1d1f`, byline + tag chip at top-left. |
| Buy flow (configurator) | `/shop/buy-iphone/iphone-17-pro` | parchment | Step-by-step configurator with stacked option cards; comparison table at bottom. |
| Support hub | `https://support.apple.com/` | white | Brand blue accent on the circle Apple-logo glyph; product category cards in a uniform light grid. |
| Support article | `https://support.apple.com/en-us/108795` | white | Linear article with numbered steps, screenshot embeds, feedback toggle at bottom. |
| Developer hub | `https://developer.apple.com/` | light w/ Light/Dark/Auto toggle (footer) | Card-grid + sticky header. Dark variant inverts to near-black with white type and `#2997ff` link blue. |
| Developer fonts | `https://developer.apple.com/fonts/` | light | Type-specimen page with download CTAs as plain text links in the SF system-blue. |

The `canonical-canvas: both` decision: Apple ships light and dark on the same page (the homepage tile sequence), the global nav explicitly listens to system preference, and the developer site offers an explicit toggle. Treating either polarity as canonical would misrepresent how the brand is actually deployed.

## §2 Palette

All hex values lifted from `apple.com` CSS bundles (`/api-www/global-elements/global-header/v1/assets/globalheader.css`, `/v/home/a/styles/{main,home}.built.css`, `/ac/globalfooter/8/en_US/styles/ac-globalfooter.built.css`, `/ac/localnav/9/styles/ac-localnav.built.css`) and from inline `style="background-color:…"` attributes on homepage promo tiles. OKLCH converted via vendored culori.

### Brand primary

- `--primary` — `oklch(0.5629 0.1933 256.1557)` (= `#0071e3`). Live: `https://www.apple.com/` — `--sk-focus-color` in `globalheader.css`. Apple's system blue, the focus-ring colour. Documented in `globalheader.css` as `outline:2px solid var(--sk-focus-color, #0071e3)`. This is the colour Apple ships as the *system* accent — distinct from the slightly darker `#0066cc` link-blue (see below).
- `--brand-primary-link` — `oklch(0.5220 0.1771 255.8297)` (= `#0066cc`). Live: `https://www.apple.com/` — `--sk-body-link-color, rgb(0, 102, 204)` in `main.built.css`. The body-link colour, used on text links inside marketing copy. Slightly deeper than the system blue.
- `--brand-primary-hover` — `oklch(0.5708 0.1825 254.1352)` (= `#0076DF`). Live: `https://www.apple.com/iphone/` — `background-hover: #0076DF` token in `ac-localnav.built.css`. Used on hover of the in-page sticky "Buy" CTA inside the localnav.
- `--brand-primary-active` — `oklch(0.5505 0.1868 255.8249)` (= `#006EDB`). Live: same surface — `background-active: #006EDB`. The pressed state of the localnav buy button.
- `--brand-primary-on-dark` — `oklch(0.6690 0.1808 251.8396)` (= `#2997ff`). Live: `https://www.apple.com/` (entertainment gallery dark band) and `developer.apple.com` dark-mode — `.ac-gf-block-dark { --sk-blocklink-color: rgb(41, 151, 255) }` in `ac-globalfooter.built.css`. Apple's documented dark-mode link colour. This is *the* lifted-blue for dark canvases.

### Documented secondary brand colours

Apple's homepage uses no single secondary brand colour — the secondaries are *photographic*, drawn from the product imagery sitting on each tile. The palette below is the set of tile background colours observed on `apple.com/` 2026-05-26. They function as canvases, not as text/CTA colours.

- `--brand-tile-deep-blue` — `oklch(0.4523 0.2032 263.3978)` (= `#1246c4`). Live: `https://www.apple.com/` — `<div style="background-color:#1246c4">` on the iPhone 17 promo tile. Deep saturated blue, often paired with a "deep blue" product colourway.
- `--brand-tile-mid-blue` — `oklch(0.6469 0.1281 240.2825)` (= `#3397d4`). Live: same page — sky-blue tile for a TV+/Entertainment promo.
- `--brand-tile-pale-blue` — `oklch(0.8147 0.0776 252.8793)` (= `#9fc6f4`). Live: same page — pastel-blue product tile.
- `--brand-tile-blue-soft` — `oklch(0.9770 0.0059 239.8187)` (= `#f4f8fb`). Live: same page — barely-blue near-white tile.
- `--brand-tile-warm-near-black` — `oklch(0.2262 0.0285 48.9022)` (= `#271810`). Live: same page — warm brown-black, photography-driven (often coffee / leather product photography).
- `--brand-tile-warm-near-black-2` — `oklch(0.2183 0.0288 60.6920)` (= `#24170c`). Live: same page — second warm-brown variant; the tile next to it differs by 1-2 lightness points, indicating these are sampled from photographs and not from a fixed token palette.
- `--brand-tile-sage` — `oklch(0.6387 0.0458 165.2788)` (= `#729585`). Live: same page — muted sage tile.
- `--brand-tile-magenta-mute` — `oklch(0.5817 0.1039 341.0892)` (= `#a4618d`). Live: same page — dusty rose tile.
- `--brand-accent-orange-badge` — `oklch(0.7222 0.1873 48.3981)` (= `#ff791b`). Live: `https://www.apple.com/` (entertainment gallery, dark theme) — `--sk-badge-text-color: rgb(255, 121, 27)` paired with a translucent orange scrim. The "NEW" / featured-content badge colour on dark canvases.

These tile colours behave as one-off canvases per product. They are not documented as a palette anywhere on apple.com — they are the *backgrounds* the product photographer chose for each shot.

### Canvas + neutrals

Apple's neutral ladder is unusually narrow: three or four greys carry almost all of the chrome.

- `--background` — `oklch(0.9707 0.0027 286.3501)` (= `#f5f5f7`). Live: `https://www.apple.com/` — body background between promo tiles, also `color:#f5f5f7` referenced repeatedly in `home.built.css`. Apple's canonical "parchment" canvas, used as the page bg on most marketing pages.
- `--background-pure-white` — `oklch(1 0 0)` (= `#ffffff`). Live: `https://www.apple.com/iphone/`, `https://support.apple.com/` — the iPhone product page, the support hub, and newsroom articles all use pure white rather than parchment.
- `--background-gnav-light` — `oklch(0.9857 0.0026 286.3511)` (= `#fafafc`). Live: header CSS — `--r-globalnav-background-opened: #fafafc`. The global nav opens onto this barely-warm off-white.
- `--background-gnav-dark` — `oklch(0.2006 0.0020 286.2208)` (= `#161617`). Live: `--r-globalnav-background-opened-dark: #161617`. The dark-mode global nav background, used when system pref is dark.
- `--background-tile-black` — `oklch(0 0 0)` (= `#000000`). Live: homepage `style="background-color:#000000"` on at least one promo tile (and the entertainment gallery uses `background-color:#000`). Pure black tile, the deepest contrast surface in the system.
- `--foreground` — `oklch(0.2316 0.0038 286.0988)` (= `#1d1d1f`). Live: `home.built.css` and `main.built.css` — `color:#1d1d1f`. Apple's "near-black" body ink, almost-but-not-quite `#000`. This is the body-copy colour on every light surface; it is not used as a tile background (the warm `#1d1d1f` of the buystrip dark variant matches it by hex but functions as a surface).
- `--card` — `oklch(1 0 0)` (= `#ffffff`). Pure white card surface on the parchment canvas, used in tile callouts and the pricing cards on `/apple-music/`. Live: `apple.com/apple-music/` — pricing tier cards.
- `--card-foreground` — `oklch(0.2316 0.0038 286.0988)` (= `#1d1d1f`). Live: same. Body text on cards is the near-black ink.
- `--popover` — `oklch(0.9857 0.0026 286.3511)` (= `#fafafc`). Same as the global-nav opened background, used as the popover/flyout colour. Live: `globalheader.css`.
- `--popover-foreground` — `oklch(0.2316 0.0038 286.0988)` (= `#1d1d1f`).
- `--muted` — `oklch(0.9707 0.0027 286.3501)` (= `#f5f5f7`). Live: `home.built.css` references `color:#f5f5f7` as both background AND as on-dark text colour. This is the parchment used as a muted surface fill.
- `--muted-foreground` — `oklch(0.5399 0.0077 286.1391)` (= `#6e6e73`). Live: `home.built.css` — `.section-promo .tile-callout{color:#6e6e73}`. Apple's "secondary text" grey, used for tile sub-callouts and captions.
- `--muted-foreground-tertiary` — `oklch(0.6217 0.0074 286.1817)` (= `#86868b`). Live: same — `color:#86868b`. The "tertiary text" grey, used for legal-fine-print on the parchment.
- `--accent` — `oklch(0.9475 0.0067 286.2716)` (= `#EDEDF2`). Live: `ac-localnav.built.css` — `background-active: #EDEDF2`. The pressed-state surface fill on light-mode localnav items.
- `--accent-foreground` — `oklch(0.2316 0.0038 286.0988)` (= `#1d1d1f`).
- `--secondary` — `oklch(0.9707 0.0027 286.3501)` (= `#f5f5f7`). Synthesised — Apple does not document a "secondary" surface separately from parchment.
- `--secondary-foreground` — `oklch(0.2316 0.0038 286.0988)` (= `#1d1d1f`).
- `--destructive` — `oklch(0.5308 0.2178 29.2339)` (= `#dc2626`). Synthesised — Apple's marketing surfaces don't expose a "destructive" colour; the iOS HIG documents systemRed as `#FF3B30` for in-app destructive actions, but it doesn't appear on the marketing site. Treat as system convention rather than live-observed.
- `--destructive-foreground` — `oklch(1 0 0)` (= `#ffffff`).
- `--border` — `oklch(0.9475 0.0067 286.2716)` (= `#EDEDF2`). Live: `home.built.css` references `border-color: rgb(245, 245, 247)` (the parchment colour) for hairlines between sections; the `#EDEDF2` value is the more visible divider used inside the localnav. Apple's hairlines are extremely soft — often the parchment colour itself.
- `--input` — `oklch(0.9475 0.0067 286.2716)` (= `#EDEDF2`). Same.
- `--ring` — `oklch(0.5629 0.1933 256.1557)` (= `#0071e3`). Live: `globalheader.css` — `outline:2px solid var(--sk-focus-color, #0071e3)`. Mirrors `--primary`.

### Polarity-locked surfaces

Apple's brand-extras carry two surfaces that don't flip with theme:

- `--brand-canvas-night` — `oklch(0.2316 0.0038 286.0988)` (= `#1d1d1f`). Live: `ac-globalfooter.built.css` — `--buystrip-background: rgb(29, 29, 31)` on the dark variant of the buystrip. This near-black is *also* `--foreground` on light surfaces, which is a quirk of Apple's palette — the same hex serves as "body text on light" AND "canvas on dark."
- `--brand-on-dark` — `oklch(1 0 0)` (= `#ffffff`). Live: every dark-canvas tile on `apple.com/` — body and headline text rendered pure white on `#000000`, `#1246c4`, `#271810`, etc. Locked to white regardless of theme.
- `--brand-on-dark-secondary` — `oklch(0.9324 0.0067 286.2690)` (= `#E8E8ED`). Live: `globalheader.css` — `--r-globalnav-color-secondary: #E8E8ED` (dark-mode variant). The "secondary text on dark" colour, used for the global-nav menu items in dark mode.
- `--brand-on-dark-tertiary` — `oklch(0.8652 0.0068 286.2561)` (= `#d2d2d7`). Live: home gallery `theme-dark .badge-neutral { --sk-badge-text-color: rgb(210, 210, 215) }`. The tertiary on-dark grey.

### Hairlines / dividers

Apple uses gradient-conic hairlines around circular controls and very-low-opacity flat hairlines elsewhere — they're almost-invisible on purpose. The home page uses `border-color: rgba(0,0,0,.08)` for body hairlines and `rgba(255,255,255,.08)` for the dark-canvas equivalent.

- `--brand-hairline-soft` — `oklch(0.9475 0.0067 286.2716)` (= `#EDEDF2`). Live: `home.built.css` — `border-color: rgb(245, 245, 247)` is the softer variant; this `#EDEDF2` is the more visible. Used inside the localnav and between configurator cards.
- `--brand-hairline-on-dark-soft` — `rgba(255, 255, 255, 0.08)`. Live: `home.built.css` — used as the conic-gradient border on circular dark-canvas controls. Not converted to OKLCH because it's an alpha-blended value.
- `--brand-hairline-on-light-soft` — `rgba(0, 0, 0, 0.08)`. Live: same — light-canvas equivalent.
- `--brand-divider-strong` — `oklch(0.2099 0.0039 286.0588)` (= `#18181A`). Live: `ac-localnav.built.css` — `background-active: #18181A` on dark-mode localnav pressed-state. The strongest divider/scrim Apple ships in `ac-localnav`.

### Drift vs `tokens.css`

Two real drifts and several preserved-from-import oddities.

1. **`--primary` is the link-blue `#0066cc`, not the system-blue `#0071e3`.** `tokens.css` sets `--primary: oklch(0.5220 0.1771 255.8297)` which equals `#0066cc`. That value is Apple's `--sk-body-link-color` — used on body-text hyperlinks. The *system accent* on apple.com is `#0071e3` (= `oklch(0.5629 0.1933 256.1557)`), used for the focus ring and the primary CTA on the developer site. `tokens.css` already exposes `--brand-primary-focus` at the correct system-blue value, so the names happen to make sense — but if the preview meant "primary CTA colour," `--primary` should be the system-blue. Reconciliation: either swap so `--primary` = system-blue and add a `--brand-primary-link` for the body-link case, or document the current mapping ("Apple primary = link-blue") as deliberate.

2. **`--secondary`, `--muted`, `--accent` all set to pure white in `:root`.** `tokens.css` has `--secondary`, `--muted`, `--accent` all equal to `oklch(1 0 0)`. Live evidence: the parchment `#f5f5f7` is the actual muted/secondary surface (apple.com uses it as the page bg between tiles and as a subtle differentiator on cards). The localnav uses `#EDEDF2` for the pressed/accent fill. Reconciliation: set `--muted` and `--secondary` to parchment (`oklch(0.9707 0.0027 286.3501)`) and `--accent` to `#EDEDF2` (`oklch(0.9475 0.0067 286.2716)`) to match the live ladder.

3. **`--background` is pure white `oklch(1 0 0)` in `:root`.** Apple's most common marketing canvas is parchment (`#f5f5f7`), not pure white. Pure white *is* what the iPhone product page, support hub, and newsroom articles use, so this isn't wrong — just one of two valid canvases. Reconciliation: leave as pure white but add a `--brand-canvas-parchment` token (already exists in current `tokens.css` at `oklch(0.9707 0.0027 286.3501)` — that's correct) and use it for the homepage-style sections in the preview.

4. **Dark-mode `--primary` mapped to `oklch(0.6690 0.1808 251.8396)` (= `#2997ff`).** This matches the live `.ac-gf-block-dark { --sk-blocklink-color: rgb(41, 151, 255) }`. The `--primary-foreground` swap from white → dark-ink on the dark-mode primary is also correctly motivated — white on `#2997ff` lands sub-AA. The hand-edit comment in `tokens.css` is accurate.

5. **`--brand-ink-muted-48` darkened from `0.5795 → 0.5000` for AA.** Documented in `tokens.css`. This is the lifted-utility-neutral case (chroma ≈ 0, so the rule "utility neutrals can be retuned for AA" applies). Keep as-is.

6. **No `--brand-primary-link` or `--brand-primary-hover` / `--brand-primary-active` in `tokens.css`.** Apple's CSS exposes the localnav buy-button hover and active states distinctly (`#0076DF` and `#006EDB`); the preview could use them on its primary CTA. Reconciliation: add `--brand-primary-hover` and `--brand-primary-active` to the brand-extras block.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | SF Pro Display | 600 | 56px (current `--text-display`); homepage hero tiles use 40px / 32px (mobile) for `.tile-headline` | 1.07 (current `--leading-tight`); homepage uses 1.1 on `.tile-headline` | 0em |
| Heading | SF Pro Display | 600 | 40px (current `--text-heading`); `.tile-headline` uses 40px → 32px (responsive) | 1.1 | 0em |
| Title | SF Pro Display | 600 | 21px (current `--text-title`); `.tile-subhead` uses 21px → 19px (responsive) | 1.238 | 0em |
| Body | SF Pro Text | 400 | 17px (current `--text-base`) | 1.47 (current `--leading-normal`) | 0em |
| Caption | SF Pro Text | 400 | 12-14px on `.tile-callout` (sampled from layout, not from a CSS rule) | 1.3-1.4 | 0em |
| Mono | SF Mono | 400 | use case is docs / code; `developer.apple.com` documentation pages | — | — |
| Nav item | SF Pro Text | 400 | small (~12-14px); `#globalnav-item { height: 44px }` is the touch target, not the type size | — | — |

Live evidence: `home.built.css` declares the stack as `font-family: SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif` for display roles and `SF Pro Text, …, sans-serif` for body roles. Apple's own SF Pro split between Display (≥20pt / 20px) and Text (<20pt) is the long-documented convention, and `home.built.css` honours it: `.tile-headline` uses SF Pro Display, the buttons and body copy use SF Pro Text.

Notes:
- Apple's homepage CSS bundle ships every CJK / Arabic / Thai variant of SF Pro inline (`SF Pro AR`, `SF Pro JP`, `SF Pro KR`, `SF Pro TH`, `SF Pro SC`, `SF Pro TC`, `SF Pro HK`). For the preview, the western SF Pro Display + SF Pro Text fallback chain is sufficient.
- Apple does not ship SF Pro to the public via web-fonts — the family is a system font available on macOS/iOS. The CSS relies on the user's system having it; otherwise the fallback chain (Helvetica Neue → Helvetica → Arial → sans-serif) takes over.
- Letter-spacing is `0em` on most marketing surfaces. Display sizes get a slight tightening via SF Pro's built-in optical-size axis rather than via CSS tracking.
- Newsroom articles use the same SF Pro stack — no editorial serif (despite Apple shipping the "New York" serif companion). The headline gets larger and bolder; the body stays SF Pro Text.

## §4 Component vocabulary

### button-primary-buy (filled pill CTA)

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — the "Buy" button next to each model card; CSS `.button-elevated` in `main.built.css`
**Description:** Apple's signature filled pill CTA. Background `#0071e3` (system-blue, lifted slightly from the body-link `#0066cc`), text `#fff`, fully rounded — `--sk-button-border-radius: 980px`, which is "effectively infinite, so the radius equals half the height" — that's how Apple ships a pill at any height. Padding `12px 22px` for the elevated variant. Font-size 17px (Body), font-weight 400. No box-shadow.
**States:** `default` `#0071e3` background; `hover` `#0076DF` (one of the in-page accent darkenings); `active` `#006EDB`; `focus` 2px outline at `#0071e3` with 1px offset; `disabled` `opacity: 0.42` per `--sk-link-disabled-opacity`.

### button-primary-super (large filled pill CTA)

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — the "Shop iPhone" button in the in-page sticky localnav; CSS `.button-super` in `main.built.css`
**Description:** Larger pill CTA, `--sk-button-padding-horizontal: 31px`, `--sk-button-padding-vertical: 18px`, `--sk-button-min-width-basis: 90px`, font-size 17px, line-height 1.176. Same `980px` radius. Used when the CTA needs more prominence than the standard `.button-elevated`.
**States:** identical to button-primary-buy.

### button-primary-reduced (small filled pill CTA)

**Status:** `current`
**Live source:** `https://www.apple.com/` — "Get your estimate" on the Apple Trade In tile; CSS `.button-reduced` in `main.built.css`
**Description:** Compact pill variant for tile callouts where the button can't dominate the photograph. Same background colour, smaller padding, same 980px radius.
**States:** identical to button-primary-buy.

### button-secondary-link-chevron

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — "Learn more" inline links; CSS `.more`, `.icon-after` in `main.built.css`
**Description:** Apple's secondary "Learn more" CTA is *not* a button at all — it's a text link in the body-link blue (`#0066cc`) with a chevron-right (`›`) appended via `::after`. The chevron has `padding-inline-start: .24em` from the label. No fill, no border, no padding, no background. The brand uses this everywhere the action is "go read more" rather than "buy."
**States:** `default` `#0066cc`; `hover` underlines via `text-decoration: underline`; on dark canvas the link colour switches to `#2997ff` and the chevron tracks colour.

### button-secondary-neutral (outlined pill, light canvas)

**Status:** `current`
**Live source:** `https://www.apple.com/` — appears as the alternate CTA on some promo tiles; CSS `.button-secondary-neutral` in `main.built.css`
**Description:** Transparent fill, `border-color: rgb(0, 102, 204)` (the link-blue), text in the same blue. Same 980px pill radius. Used when the page already has a primary `.button-elevated` and needs a quieter second action.
**States:** `hover` fills the background with the same blue, text switches to white.

### button-secondary-on-dark

**Status:** `current`
**Live source:** `https://www.apple.com/` (dark-canvas promo tiles like the iPhone 17 Pro tile on `#000`); same CSS surface
**Description:** When the parent tile is dark, the secondary button inverts — white border, white text, transparent fill. Same pill radius. On dark surfaces the text/border switches to `--brand-on-dark` white rather than the blue used on light.
**States:** `hover` fills white, text switches to black `#1d1d1f`.

### tile-promo (homepage product tile)

**Status:** `current`
**Live source:** `https://www.apple.com/` — every promo tile in the home grid; CSS `.section-promo .tile-headline` etc. in `home.built.css`
**Description:** The defining Apple component. A full-bleed photographic tile with the product image as the hero, two stacked text lines at top (`.tile-headline` 40px / SF Pro Display 600, then `.tile-subhead` 21px), and two CTAs side by side at top (typically `.button-elevated` Buy + `.more` Learn more). Each tile picks its own background colour from the product photography. Tiles tessellate at 2-up or 1-up depending on viewport. Padding is generous — the photograph fills the lower half, the type sits in the upper third.
**States:** No interactive states on the tile itself — the CTAs handle interaction. The whole tile is not a single click target; the headline + chevron + CTAs are independent links.

### tile-promo-callout

**Status:** `current`
**Live source:** `https://www.apple.com/` — small grey text above the headline on certain promo tiles (e.g. "NEW" preceding "iPhone 17 Pro - All out Pro."); CSS `.tile-callout` in `home.built.css`
**Description:** Smallcaps-style category label rendered in `#6e6e73` (secondary text), `margin-top: 9px`, `margin-bottom: -3px`. Apple's "what kind of product is this" eyebrow.
**States:** static.

### tile-promo-logo-image

**Status:** `current`
**Live source:** `https://www.apple.com/` — Apple Card tile shows the Apple Card wordmark; CSS `.section-promo .logo-image`
**Description:** Inline-SVG product logo replaces the text headline on tiles where the product has a strong wordmark identity. `margin-top: 4px`, sits where the headline would otherwise sit.

### global-nav-bar

**Status:** `current`
**Live source:** `https://www.apple.com/` — the persistent top nav; CSS `#globalnav` in `globalheader.css`
**Description:** 44px tall. Background `#fafafc` opened-light / `#161617` opened-dark (system-pref). 12 link slots: Apple-logo, Store, Mac, iPad, iPhone, Watch, Vision, AirPods, TV & Home, Entertainment, Accessories, Support. Search icon and Bag icon at the right. Items are roughly 12-14px SF Pro Text. The flyout panel opens with a soft scrim behind it. The bar listens to `prefers-color-scheme` natively — no theme override on the rest of the page is required.
**States:** `hover` text switches from `#333336` to `#000000` on light, `#E8E8ED` to `#FFFFFF` on dark. `focus-visible` shows the 2px `#0071e3` outline. Bag icon shows a count when items are present.

### global-nav-flyout (mega-menu)

**Status:** `current`
**Live source:** `https://www.apple.com/` — click any product link in `#globalnav` to expand; CSS `.globalnav-submenu` in `globalheader.css`
**Description:** Full-width drop panel that opens beneath the global nav, with a 4-5 column link grid. On Mac: "MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio", "Mac Pro" as bold-leader links, then a "Shop Mac", "Help Me Choose", "macOS" tail. Background continues the `#fafafc` / `#161617` colour. The panel slides in with a 320ms cubic-bezier transition (per `--r-localnav-curtain-transition` token).
**States:** opens on click, closes on outside-click, on Escape.

### local-nav-sticky (sticky product sub-nav)

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — sticks at the top of the page after scroll past the hero; CSS `#ac-localnav` in `ac-localnav.built.css`
**Description:** 52px tall (`--r-localnav-height: calc(52px * var(--r-localnav-text-zoom-factor))`). Product name at left ("iPhone"), in-page section anchors in the middle ("17 Pro", "Air", "17", "17e", "16", "Compare", "Accessories", "iOS"), one CTA at the right ("Shop iPhone" as `.button-super` shape). Sticks to the top of the viewport via `position: sticky`. The bar's background varies — it's transparent over the hero, gains a backdrop-blur as you scroll into content sections.
**States:** transparent-to-frosted transition on scroll, anchor links highlight when their section is in view.

### local-nav-on-light-pressed-pill

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — pressed state of an anchor in the localnav
**Description:** When an anchor in `#ac-localnav` is pressed, it gets a 5px-radius pill background fill — `#EDEDF2` on light, `#272729` on dark. Padding 4-6px around the label.
**States:** `default` no fill; `hover` `#EDEDF2` light / `#272729` dark; `active` `#EDEDF2`/`#18181A`.

### configurator-option-card

**Status:** `current`
**Live source:** `https://www.apple.com/shop/buy-iphone/iphone-17-pro` — the storage / colour / AppleCare option cards in the buy flow
**Description:** Stacked cards in the configurator with a clear two-line layout: title at top ("256GB", "512GB"), price at the right or below ("$1,099"), feature list as 2-3 bullet rows below. Border `1px solid #d2d2d7` when unselected, `2px solid #0071e3` when selected. 18px corner radius. White background, near-black ink. Each card is its own radio.
**States:** `default` unselected; `hover` background lightens to parchment; `selected` blue 2px border + a small blue check icon in the top-right corner.

### configurator-tier-strip

**Status:** `current`
**Live source:** `https://www.apple.com/shop/buy-iphone/iphone-17-pro` — colour swatches row above the storage cards
**Description:** Horizontal row of 4-6 circular colour chips, each ~24px diameter. Selected chip gets a 2px blue ring with 2px gap to the chip — i.e. the focus-ring pattern reused for a selection affordance. Chip labels appear as a separate small text below ("cosmic orange", "deep blue", "silver").
**States:** `default` no ring; `selected` 2px blue ring.

### comparison-table-row

**Status:** `current`
**Live source:** `https://www.apple.com/shop/buy-iphone/iphone-17-pro` — "Compare all models" table at bottom of the buy page
**Description:** Sticky-header table — the product images and prices stay pinned to the top as you scroll the spec rows. Columns are products (iPhone 17 Pro, Air, 17, 17e); rows are spec categories (Display, Chip, Camera, Battery, Apple Intelligence, etc.). Cells contain either body text, an inline SVG icon ("checkmark.svg"), or an em-dash + "No <feature>" for not-included rows. Each column has a "Buy" CTA at the bottom matching the in-page sticky.
**States:** sticky header re-pins on scroll; row hover lightens to parchment.

### pricing-tier-card (Apple Music)

**Status:** `current`
**Live source:** `https://www.apple.com/apple-music/` — the Individual / Family / Student / Apple One cards
**Description:** Vertical cards on parchment. Title at top (e.g. "Individual"), large price line in SF Pro Display 600 weight ("$10.99 / month"), small subscript footnote indicator, then a bulleted feature list, then a primary "Try it free" CTA at the bottom. Soft 18px corner radius, white card on parchment canvas, no border — separated only by spacing and the slight elevation of the white-on-parchment contrast.
**States:** static.

### footer-buystrip

**Status:** `current`
**Live source:** `https://www.apple.com/` — the row of product icons + tagline links above the linkage block; CSS `.ac-gf-buystrip-*` in `ac-globalfooter.built.css`
**Description:** A row of 5-6 product icon cards (Apple TV+, iCloud+, Apple Music, Apple Arcade, etc.) with the product wordmark below each and a "Try / Subscribe" link below that. Background `--buystrip-background: rgb(245, 245, 247)` light / `rgb(29, 29, 31)` dark — the parchment / near-black contrast pair. Icon at 56px square. 1px hairline divider between strip and the directory below.
**States:** static.

### footer-directory

**Status:** `current`
**Live source:** `https://www.apple.com/` — the 11-column link grid below the buystrip; CSS `.ac-gf-directory` in `ac-globalfooter.built.css`
**Description:** Multi-column link block with these category headings: "Shop and Learn", "Apple Wallet", "Account", "Entertainment", "Apple Store", "For Business", "For Education", "For Healthcare", "For Government", "Apple Values", "About Apple". Each column has 3-8 children. Heading is 14px SF Pro Text 600, children are 12px regular in `--sk-blocklink-color: rgb(0, 102, 204)` light / `rgb(41, 151, 255)` dark. 24px top padding between sections.
**States:** link hover underlines.

### footer-legal-band

**Status:** `current`
**Live source:** `https://www.apple.com/` — bottom of every page; CSS `.ac-gf-footer` in `ac-globalfooter.built.css`
**Description:** Narrow grey band at the very bottom: copyright line at left, region selector at right, then a row of fine-print links (Privacy Policy, Terms of Use, Sales and Refunds, Legal, Site Map). 12px SF Pro Text, `#6e6e73` ink on parchment. 1px hairline border-top.
**States:** static.

### badge-new-on-dark

**Status:** `current`
**Live source:** `https://www.apple.com/` (entertainment gallery dark theme); CSS `theme-dark .badge` in `home-gallery.built.css`
**Description:** "NEW" pill on dark canvas. Background `rgba(245, 99, 0, 0.2)` (translucent orange scrim) with text `rgb(255, 121, 27)` (`#ff791b`). Small pill radius, ~12px font-size, uppercase. Apple uses this for newly-launched streaming content tiles.
**States:** static.

### badge-new-on-light

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — "New" badge on the iPhone 17e tile
**Description:** Lighter-weight "New" indicator on light canvas. Typically rendered as a small underlined label or a pill in the primary blue. Less elaborated than the orange dark-theme variant.
**States:** static.

### bag-icon (cart)

**Status:** `current`
**Live source:** `https://www.apple.com/` — right end of the global nav
**Description:** Outlined shopping-bag SVG icon, ~14px square. When items are in the bag, a small numeric badge appears at the top-right corner. Click opens a flyout panel summarising the bag.
**States:** `default` empty; `populated` with count badge; `hover` brightens.

### apple-logo-glyph

**Status:** `current`
**Live source:** `https://www.apple.com/` — left end of the global nav
**Description:** The bitten-apple silhouette as an inline SVG, monochrome — black on light surfaces, white on dark. Approximately 14px tall (sized to the 44px global-nav row). Wraps in an `<a href="/">` link. Never tinted, never coloured — the logo is identity-locked monochrome.
**States:** `default` monochrome; `hover` no change.

### search-input (support)

**Status:** `current`
**Live source:** `https://support.apple.com/` — the search bar at the top of the support hub
**Description:** Rectangular text input with rounded corners (~8px), white background, `#d2d2d7` border, magnifying-glass icon at left. Placeholder text "Search Support". Type-ahead surface drops below with auto-complete suggestions. Differs from the marketing-page search icon (which is just an icon in `#globalnav` and opens a modal overlay).
**States:** `default`; `focus` border switches to `#0071e3` 2px; `populated` shows "Clear Search" affordance.

### support-product-card

**Status:** `current`
**Live source:** `https://support.apple.com/` — the iPhone / Mac / iPad / Watch / Vision / AirPods category cards
**Description:** Square-ish cards in a 6-up grid. Each card shows a stylized product icon (illustrated, not photographic — the support site uses simplified glyphs), the product name as a title, and the card itself is a link to that product's support root. Border 1px, 8px radius, white background. Hovers brighten.
**States:** `default`; `hover` slight background tint to parchment.

### support-article-feedback-toggle

**Status:** `current`
**Live source:** `https://support.apple.com/en-us/108795` — bottom of every support article
**Description:** "Helpful?" Yes/No toggle pair with a 250-char text input that appears after either click, then a "Thanks for your feedback" confirmation. The Yes/No pair are pill buttons with the brand-blue outline / fill pattern.
**States:** `default` two outline pills; `selected` one fills blue; `submitted` text input appears; `confirmed` widget collapses with thanks message.

### newsroom-article-byline

**Status:** `current`
**Live source:** `https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-…`
**Description:** Top-left of every newsroom article. Format: small "PRESS RELEASE" or "UPDATE" tag in uppercase, ~12px, `#6e6e73`, then the publication date directly below in the same colour. No author byline — Apple does not credit individual writers on newsroom articles.
**States:** static.

### newsroom-headline

**Status:** `current`
**Live source:** same
**Description:** Single-column headline at large size — SF Pro Display, 600, ~48-56px on desktop, line-height 1.07. Apple's editorial headlines stretch to 2-3 lines and are presented without an overline; the byline + tag chip sits above, the headline sits below.

### footnote-superscript

**Status:** `current`
**Live source:** every Apple product page — e.g. `https://www.apple.com/iphone/` references `<sup>1</sup>` through `<sup>10</sup>+` linking to a footer footnote block
**Description:** Apple's pervasive superscript footnote-marker. Rendered in the body-link blue, smaller than body text, anchored to a numbered list at page bottom. Critical to Apple's marketing voice — every claim that has a legal caveat ("up to 24 hours of battery life¹") gets a footnote. The footer footnote list is `<ol>` with `1.`, `2.`, etc. in `#86868b` tertiary grey.
**States:** scroll-to-anchor on click.

### legal-fine-print-band

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/` — between the comparison table and the global footer
**Description:** A several-paragraph block of 12px `#86868b` tertiary-grey type, left-aligned, max-width-constrained. Contains regulatory disclosures, trademark notices, and footnote expansions. Always appears between the product content and the global footer; the global footer's own legal band is separate (and smaller).

### live-stream-countdown (events)

**Status:** `current`
**Live source:** `https://www.apple.com/` (when an Apple Event is upcoming, a section appears on the homepage announcing it with a countdown)
**Description:** Hero-card-style tile with the event date, time, and a "Watch the live stream" / "Add to calendar" CTA. The event-page itself (`apple.com/apple-events/`) flips to a video-player-led layout when the stream is live.
**States:** `pre-event` countdown + calendar CTA; `live` video player; `post-event` replay link.

### developer-platform-tile

**Status:** `current`
**Live source:** `https://developer.apple.com/` — the iOS 26 / iPadOS 26 / macOS 26 / tvOS 26 / visionOS 26 / watchOS 26 platform grid
**Description:** 6-up grid of platform tiles, each with a thumbnail hero image, a "iOS 26" wordmark, and a click target. Tiles are uniformly sized squares. Card background white on light, near-black on dark, with a small platform glyph in the top-left of each.
**States:** `default`; `hover` slight brighten / cursor pointer on the whole tile.

### developer-pathway-card

**Status:** `current`
**Live source:** `https://developer.apple.com/` — "Pathways" feature card
**Description:** Icon + headline + description + optional CTA pattern. Icon as inline SVG at ~40px, headline as SF Pro Display 600, description as body, optional "Get the latest tools and beta SDKs" link at bottom. Soft 18px corner radius. Used to entry-point a series ("Pathways" is Apple's documentation-series landing).

### theme-toggle-light-dark-auto (developer site)

**Status:** `current`
**Live source:** `https://developer.apple.com/` — footer of every developer-site page
**Description:** A 3-state toggle widget in the footer reading "Light / Dark / Auto" with the current state highlighted. Stores user preference in localStorage. Independent of the homepage's `prefers-color-scheme` behaviour — the developer site exposes explicit user control.
**States:** `light`, `dark`, `auto` — only one active at a time; click any of the three to switch.

### sf-font-download-card

**Status:** `current`
**Live source:** `https://developer.apple.com/fonts/` — each variant ("SF Pro", "SF Compact", "SF Mono", "New York", and the script extensions) has its own card
**Description:** Plain card with a text headline (the font name), one or two body paragraphs describing the use case ("neutral, flexible, sans-serif system font for Apple platforms"), and a text-link "Download SF Pro" with no button chrome — just the body-link blue underline-on-hover style. No prominent CTA button. Apple treats fonts as utility downloads rather than featured products.
**States:** link `default` `#0066cc`, `hover` underline.

### apple-card-pricing-callout

**Status:** `current`
**Live source:** `https://www.apple.com/` — Apple Card tile in the homepage promo grid
**Description:** Promo tile variant where the body copy includes a coloured price emphasis or call-out (e.g. "$195–$685 in credit"). The numerals get the SF Pro Display weight + slightly larger sizing while remaining inline with the surrounding body. Used sparingly; only on tiles where a price is the lede.
**States:** static.

### entertainment-gallery-tile

**Status:** `current`
**Live source:** `https://www.apple.com/` (lower portion of homepage); CSS in `home-gallery.built.css`
**Description:** Dark-canvas section that breaks the parchment cadence of the homepage. Black background, 9-up grid of streaming-content tiles (Apple TV+ shows, Apple Music playlists, Apple Sports, Apple Arcade games, Apple Fitness+ classes). Each tile is a 4:5 image-led card with the content title at bottom-left and an optional small "NEW" badge in the orange-on-dark pattern. Hover gently brightens the tile.
**States:** `default`; `hover` brightens.

### apple-trade-in-estimator-tile

**Status:** `current`
**Live source:** `https://www.apple.com/` — Apple Trade In tile
**Description:** Promo tile where the CTA is "Get your estimate" leading into a multi-step estimator. The tile itself is a standard promo tile; the destination is a step-driven form (model select → condition select → estimate display).
**States:** standard.

### carrier-deals-finder

**Status:** `current`
**Live source:** `https://www.apple.com/` — "Find your deal" tile
**Description:** Promo tile that leads into a zip-code + carrier-select widget. Tile is standard promo shape; destination is a small inline form.
**States:** standard.

### color-indicator-swatch

**Status:** `current`
**Live source:** `https://www.apple.com/iphone/compare/` and the comparison-table component — the colour swatches under each product
**Description:** Small circular swatches (~20px) representing product colourways. CSS `.colorindicator` in `main.built.css` references `--sk-colorindicator-background-color` token. On dark `theme-dark` the background colour switches to `rgb(29, 29, 31)` per the CSS rule observed.
**States:** static; selected indication via outer ring in the configurator context.

### apple-care-floating-widget

**Status:** `current` (intermittent — appears on product detail pages)
**Live source:** `https://www.apple.com/shop/buy-iphone/iphone-17-pro` — floating chat / AppleCare prompt at the right edge of the viewport during certain flows
**Description:** Anchored to the bottom-right of the viewport. Round pill button with an AppleCare wordmark / "Chat" label. Clicks open a slide-over panel with chat / call / appointment options.
**States:** `default` collapsed; `expanded` slide-over panel.

### checkout-modal-sheet (bag flyout)

**Status:** `current`
**Live source:** `https://www.apple.com/` — clicking the bag icon in `#globalnav`
**Description:** Right-anchored sheet that slides in from the right edge of the viewport over a scrim. Header has the bag count + "Bag" title + close button. Body lists items with thumbnail / title / price / quantity adjuster. Footer has "Check Out" primary CTA.
**States:** `closed`; `open` slide-in animation.

### environment-stat-tile (environment report pattern)

**Status:** `current` (on the `/environment` page family rather than the homepage, but the pattern carries across — referenced from CSS observations)
**Description:** Large numeric stat (`62%`, `7 GHG kg CO₂e`) in SF Pro Display 600 at very large size, with a small caption below. Used in Apple's Environmental Progress Report pages and on product page environment sections. Background can be either parchment or dark.
**States:** static.

## §5 Surface inventory

- `https://www.apple.com/` — the load-bearing homepage. Anchors `tile-promo`, `tile-promo-callout`, `tile-promo-logo-image`, `global-nav-bar`, `global-nav-flyout`, `bag-icon`, `apple-logo-glyph`, `entertainment-gallery-tile`, `footer-buystrip`, `footer-directory`, `footer-legal-band`. The single richest surface — every other product page is a variation on its tile sequence.
- `https://www.apple.com/iphone/` — anchors `local-nav-sticky`, `local-nav-on-light-pressed-pill`, `button-primary-super`, `footnote-superscript`, `legal-fine-print-band`. The iPhone page is the canonical example of the "sticky localnav + product hero stack + comparison + legal" page shape.
- `https://www.apple.com/mac/` — secondary product page. Less polarity-flip than the iPhone page. Mostly reinforces the `tile-promo` and `local-nav-sticky` patterns.
- `https://www.apple.com/apple-watch/` — anchors per-model tile variants ("Series 11" / "SE 3" / "Ultra 3" labelled tiles). Reinforces the multi-model tile rhythm.
- `https://www.apple.com/apple-vision-pro/` — anchors immersive full-bleed video / image sections — different from the tile-grid rhythm of the older product pages.
- `https://www.apple.com/apple-music/` — anchors `pricing-tier-card`. Apple Music is the marketing page where Apple actually publishes prices in a tier-card grid (most product pages defer pricing to the configurator).
- `https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-…` — anchors `newsroom-article-byline`, `newsroom-headline`. Editorial register.
- `https://www.apple.com/shop/buy-iphone/iphone-17-pro` — anchors `configurator-option-card`, `configurator-tier-strip`, `comparison-table-row`, `color-indicator-swatch`, `apple-care-floating-widget`. The buy flow's distinctive vocabulary.
- `https://support.apple.com/` — anchors `search-input`, `support-product-card`. Support hub.
- `https://support.apple.com/en-us/108795` — anchors `support-article-feedback-toggle`. Support article.
- `https://developer.apple.com/` — anchors `developer-platform-tile`, `developer-pathway-card`, `theme-toggle-light-dark-auto`. Developer-facing register.
- `https://developer.apple.com/fonts/` — anchors `sf-font-download-card`. Confirms SF Pro / SF Compact / SF Mono / New York as the documented system family.

## §6 Notes

- **The same hex value (`#1d1d1f`) serves as `--foreground` on light AND `--brand-canvas-night` on dark.** Apple's design system treats near-black as both "body text on parchment" and "the dark canvas itself" — there is no separate dark-canvas colour. Watch for this when authoring the dark preview: `var(--foreground)` and `var(--brand-canvas-night)` are intentionally the same value, and consumers should not assume otherwise.
- **`prefers-color-scheme` is honoured on the chrome but not the body.** The global nav listens to system preference (light `#fafafc` vs dark `#161617`); the rest of the marketing pages does *not* — the canvas of a tile is fixed at publish time, baked into inline `style="background-color:…"` on each promo tile. Don't extend the marketing pages' polarity to follow the system theme; that's not how Apple ships.
- **The Apple logo is identity-locked monochrome.** Never tint, never colour, never apply the brand blue. The logo is white on dark, near-black on light, full stop. The `--primary` blue is for interactive elements (focus, CTA fill, link colour), not for the logo. This is the "translation rule" from the design principles applied to Apple: blue is a state/action indicator, not an identity colour.
- **Tile background colours are photographic, not tokenised.** The 9-ish tile background hexes observed on the homepage are sampled from the product photography that sits on each tile — they don't come from a fixed palette. Treat `--brand-tile-*` tokens as a snapshot of "what colours apple.com shipped on 2026-05-26," not as a documented palette.
- **Sub-AA grey on grey is acceptable for tertiary captions.** Apple's `#86868b` tertiary text on `#f5f5f7` parchment lands around 3.5:1 — below WCAG AA 4.5:1 for body. The brand ships it anyway because it's reserved for legal-fine-print and footnote-list type that the reader doesn't need to scan. Don't lift it to win the audit; route the audit to ignore the footnote/legal text instead.
- **No serif on marketing pages despite shipping New York.** Apple ships the New York serif companion typeface for developers, but does not use serif anywhere on its own marketing pages. Newsroom articles, environment reports, editorial pages all use SF Pro Display / SF Pro Text. Don't author serif-flavoured previews for Apple even though they technically own a brand serif.
- **The body-link blue and the system-blue are *different* values.** `#0066cc` (link) vs `#0071e3` (system focus / CTA fill). Both are legitimate "Apple blue." The distinction matters for previews: pill CTAs use `#0071e3`, text links inside body copy use `#0066cc`.
- **Dark-mode link blue lifts to `#2997ff`.** The same convention as the body-link / system-blue split: on dark canvases, the link colour switches to a brighter blue. This is documented in the footer CSS (`.ac-gf-block-dark { --sk-blocklink-color: rgb(41, 151, 255) }`) and is the same colour Apple uses across iOS dark mode.
- **`.button-elevated` corner radius is `980px`.** That's the pill convention — radius equal to or greater than half the height of the button. Apple uses this on every primary CTA; only the `.button-block` variants (used inside cards, where corners need to read as "rectangle with rounding") drop to 5-12px radii.
- **Apple's hairlines are nearly invisible by design.** Border colours run at `rgba(0,0,0,0.08)` to `0.16` opacity, or at the parchment colour itself (`#f5f5f7`) so the divider is the same hue as the background. Don't reach for `#d2d2d7` or `#cccccc` when authoring an Apple hairline — Apple ships much softer.
- **Brand-X-lift content to avoid:** any iPhone model name in body copy ("iPhone 17 Pro"), any product-line-specific marketing copy ("Magichromatic", "Innovative design for ultimate performance"), the literal Apple Card / Apple Music / Apple TV+ / Apple Trade In wordmarks, any real Apple footnote text, the literal `apple.com/iphone` URL, "Buy" as a CTA label (use a Halcyon-team-flavoured CTA instead), and the bitten-apple silhouette — that's not a generic glyph, it's identity-locked.

## §Known gaps

- **HIG documentation pages return only `<title>` via WebFetch.** `developer.apple.com/design/human-interface-guidelines/typography` and `/color` and `/buttons` are React-rendered SPAs; WebFetch saw only the title element. The type ladder (Large Title 34pt, Title 1 28pt, Title 2 22pt, Title 3 20pt, Headline 17pt, Body 17pt, Callout 16pt, Subheadline 15pt, Footnote 13pt, Caption 1 12pt, Caption 2 11pt) reported in §3 is documented Apple convention but was *not* directly observed in this cycle. To verify, headless Chrome with JS execution against the HIG pages would be needed.
- **iOS / macOS system colors not observed.** systemRed, systemBlue, systemGreen, systemOrange, systemYellow, systemPink, systemPurple, systemTeal, systemIndigo, systemMint, systemBrown, systemCyan — these are documented in HIG's Color page but not visible on the marketing surfaces sampled. The `--destructive` slot in §2 is marked synthesised for this reason.
- **App Store / iTunes / Apple Music app interfaces not sampled.** The HIG documents iOS-app patterns (navigation bars, tab bars, sheets, action sheets, segmented controls) that don't appear on the marketing surfaces. Authoring an iOS-app-flavoured preview would require sampling screenshots from the App Store editorial pages or Apple's own iOS app shots — not part of this cycle's scope.
- **macOS Sonoma / Tahoe system UI not observed.** Window-chrome, sidebar, traffic-light buttons, popover styles — all documented in HIG but not visible on apple.com itself.
- **WWDC / Apple Event keynote page surfaces not sampled.** The `/apple-events/` page shifts to a video-player-led layout during live streams; not in this sampling window.
- **Configurator interaction states not observed end-to-end.** The buy-iPhone flow has multi-step interaction states (storage → colour → AppleCare → trade-in → carrier) — sampled only the entry surface. Mid-flow states (selected configurations, running total, locked options) would require driving the flow.
- **Education / Business / Enterprise pricing pages not sampled.** Apple's `/business/`, `/education/`, `/healthcare/`, `/government/` pages have their own pricing layouts and CTAs distinct from consumer-facing surfaces.
- **Apple Maps, Find My, iCloud.com web apps not sampled.** Apple's web-app properties (`icloud.com/mail`, `icloud.com/photos`, etc.) use a different design system register — closer to the macOS app chrome than to the marketing site. Out of scope for this cycle.
