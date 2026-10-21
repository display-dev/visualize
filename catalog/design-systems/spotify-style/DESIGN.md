---
slug: spotify-style
name: Spotify
source: live-verified
verified-at: 2026-05-25
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://open.spotify.com/
  - https://www.spotify.com/us/premium/
  - https://support.spotify.com/us/
  - https://newsroom.spotify.com/
  - https://artists.spotify.com/home
  - https://developer.spotify.com/
  - https://www.spotify.com/us/about-us/contact/
canonical-canvas: dark
selection:
  mood: [brand-system, luxury]
  tone: [friendly, optimistic]
  formality: low
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a friendly, optimistic register with brand-system, luxury visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Spotify

## §1 Canonical canvas

Spotify is not single-polarity — it runs three distinct chrome registers across the surfaces it ships under the same wordmark, and a `tokens.css` that picks one and ignores the others will misrepresent the brand. The three registers are:

1. **Encore-dark player chrome** — `open.spotify.com` and every authenticated app surface. `#121212` body, `#1f1f1f` elevated, `#2a2a2a` highlight, white type, green `#1ED760` as the sole chromatic accent. This is where the `encore-dark-theme` design system token block is exposed on `<html>` directly and the brand colour ladder is most legible.
2. **Premium marketing canvas** — `/premium`, `/duo`, `/student`. Same `#121212` base, but the page is constructed as a vertical stack of full-bleed coloured canvases (deep green `#088569`, vivid blue / orange / purple / magenta feature-card panels, near-black photo-led intro), each its own scroll section. The pricing tier cards are dark `#282828` rectangles with a coloured pastel tier title (pink / lavender / amber / sky) and a matching pastel pill CTA carrying dark ink. Decorative chrome is at maximum saturation here.
3. **Light editorial chrome** — `newsroom.spotify.com` ("For the Record"), `/about-us/*`, and the for-Artists hero. White body, `#282828` body ink, green `#1ED760` text-link colour preserved, display type set in the narrower `Spotify Mix-Narrow` face. This is the press / corporate register.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Web player | `https://open.spotify.com/` | `oklch(0.18 0 0)` `#121212` Encore dark | The brand's deployed dark — encore tokens (`--background-base`, `--text-bright-accent`, `--essential-positive`) exposed on `<html>` |
| Premium marketing | `https://www.spotify.com/us/premium/` | Scrolling stack: `#121212` hero → `#088569` voyager green → 4 feature cards (`#0D72EA` / `#D64000` / `#7358FF` / `#CC2FAF`) → black pricing band | Multi-canvas signature; cards hold colour as full-bleed sections, not as accent fills |
| Pricing tier cards | `/premium#plans` | `#282828` card on `#121212` canvas; tier-title in pastel hue, CTA pill in same pastel with `#282828` ink | Pastel ladder: pink / lavender / amber / sky — one per tier, never mixed inside a card |
| Support hub | `https://support.spotify.com/us/` | `#121212` body, `#1f1f1f` search shell, green icons + accordion chevrons | The "Spotify Support" wordmark uses the wider `SpotifyMixUITitle` display face |
| Newsroom (For the Record) | `https://newsroom.spotify.com/` | White; H2 headlines in `Spotify Mix-Narrow` 800 | Light editorial register; uppercase "NOTEWORTHY" pull on `SpotifyMixUITitle` |
| For Artists | `https://artists.spotify.com/home` | Dark photographic hero; white pill CTAs with dark ink; "for Artists" sub-wordmark | A distinct sub-brand, kept inside the catalogue's preview as the dark-photographic accent rather than the canonical canvas |
| Developer site | `https://developer.spotify.com/` | `#400073` deep purple canvas, `#CBF55C` lime headline, cyan CTA pill | The playful illustration register; documented here for completeness but it is a sub-brand chrome, not the canonical Spotify identity |
| About-us / Contact | `https://www.spotify.com/us/about-us/contact/` | White; `#282828` body; green corporate links | The light corporate-info register |

The preview should treat (1) and (2) as the canonical canvases — the dark Encore chrome anchors the system, the multi-coloured Premium marketing stack is the signature recognizability moment.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a live citation (URL + DOM selector or visible element).

### Brand primary

- `--primary`: `oklch(0.7697 0.2124 148.67)` (= `#1ED760`). Live: `https://open.spotify.com/` — `getComputedStyle(:root) → --essential-bright-accent` / `--text-bright-accent` / `--essential-positive`. Also the topnav "Try 3 months for $0" pill background on `/premium`, the green chevron icon on every support accordion, and the corporate-link colour on `/about-us/contact/` (Help site / Community / Contact us links).
- This single OKLCH value powers the entire primary family — `--ring`, `--sidebar-primary`, `--sidebar-ring` track it. There is no documented brand-green ladder; Spotify exposes one bright green and one near-black surface and treats every other shade as utility neutral or per-section decoration.

### Documented secondary brand colours

These are the Encore design-system tokens exposed on `:root` on `open.spotify.com` (`getComputedStyle(document.documentElement)` sweep). They are surface-named in the brand's own vocabulary — the catalogue ports them under `--brand-*` surface names rather than colour names.

- `--brand-accent-negative`: `oklch(0.6141 0.2243 22.70)` (= `#ED2C3F`). Live: `open.spotify.com` — `--essential-negative`. Destructive / error inks.
- `--brand-accent-warning`: `oklch(0.7921 0.1626 67.42)` (= `#FFA42B`). Live: `open.spotify.com` — `--essential-warning`. Amber warning.
- `--brand-accent-announcement`: `oklch(0.5904 0.2025 257.20)` (= `#1278F2`). Live: `open.spotify.com` — `--essential-announcement`. Announcement / link blue.

The Premium marketing surface adds a four-hue **feature-card palette** at full saturation — these are *section-canvas* colours, used as full-bleed backgrounds with white type, not as accent fills inside other surfaces.

- `--brand-section-blue`: `oklch(0.5714 0.1999 257.41)` (= `#0D72EA`). Live: `/premium` — `.FeatureCard_featureCard__C3oKU` ("Dive into uninterrupted music videos" panel).
- `--brand-section-orange`: `oklch(0.5858 0.1952 37.21)` (= `#D64000`). Live: `/premium` — second feature card.
- `--brand-section-purple`: `oklch(0.5859 0.2355 283.79)` (= `#7358FF`). Live: `/premium` — third feature card.
- `--brand-section-magenta`: `oklch(0.5948 0.2294 336.92)` (= `#CC2FAF`). Live: `/premium` — fourth feature card.

Two **green section canvases** sit beneath the feature-card stack and recur on `/duo` and `/student`:

- `--brand-section-voyager`: `oklch(0.5497 0.1061 170.93)` (= `#088569`). Live: `/premium` — `.voyager_elevated__jELP7` (the "Take us with you anywhere" deep-green band).
- `--brand-section-voyager-deep`: `oklch(0.3944 0.0757 171.44)` (= `#035341`). Live: `/premium` — `.ContentCard_contentCard__TGdEu` (Fitness content card).

The **pricing pastel ladder** is the most identifiable Spotify-marketing surface after the green pill. One pastel per tier, used twice on the card: as the H3 tier-title colour, and as the pill-CTA background (with `#282828` dark ink).

- `--brand-pricing-pink`: `oklch(0.9037 0.0510 10.62)` (= `#FFD2D7`). Live: `/premium` — `.plan-title-detail` for "Individual" H3, and the matching "Try 3 months for $0" pill bg.
- `--brand-pricing-lavender`: `oklch(0.7877 0.0530 309.52)` (= `#C4B1D4`). Live: `/premium` — `.plan-title-detail` for "Student" H3.
- `--brand-pricing-amber`: `oklch(0.8626 0.1342 80.77)` (= `#FFC862`). Live: `/premium` — `.plan-title-detail` for "Duo" H3 and "Get Premium Duo" CTA pill bg.
- `--brand-pricing-sky`: `oklch(0.7826 0.0397 248.33)` (= `#A5BBD1`). Live: `/premium` — `.plan-title-detail` for "Family" H3.

### Canvas + neutrals

- `--background`: `oklch(0.1822 0.0000 0)` (= `#121212`). Live: `open.spotify.com` — `getComputedStyle(:root) → --background-base`. Also the body canvas on `/premium`, the support hub canvas, and the pricing band background.
- `--foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: `open.spotify.com` — `--text-base`. Body text on every dark surface.
- `--card`: `oklch(0.2393 0.0000 0)` (= `#1F1F1F`). Live: `open.spotify.com` — `--background-elevated-base`. Player elevated rows; the Home / Search topnav pill bg when active.
- `--card-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: `open.spotify.com` — text on `--background-elevated-base`.
- `--popover`: `oklch(0.2850 0.0000 0)` (= `#2A2A2A`). Live: `open.spotify.com` — `--background-elevated-highlight`. Hover / popover surfaces.
- `--popover-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: same; text on `--background-elevated-highlight`.
- `--muted`: `oklch(0.2768 0.0000 0)` (= `#282828`). Live: `/premium` — pricing tier card background. Also the body ink on `/about-us/contact/` (a single neutral surface that doubles as ink on light canvas and surface on dark — Spotify ships exactly one mid-near-black neutral and reuses it both ways).
- `--muted-foreground`: `oklch(0.7668 0.0000 0)` (= `#B3B3B3`). Live: `open.spotify.com` — `--text-subdued`. Secondary text on dark canvases. Also `/premium` body text (`rgb(179, 179, 179)` Terms apply / disclaimer).
- `--accent`: `oklch(0.5497 0.1061 170.93)` (= `#088569`). Live: `/premium` — `.voyager_elevated__jELP7` (mapped from the deepest documented green canvas; not synthesised).
- `--accent-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: same — white type on voyager green.
- `--secondary`: `oklch(0.2393 0.0000 0)` (= `#1F1F1F`). Live: `open.spotify.com` — secondary chrome surface; mirrors `--card`.
- `--secondary-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`).
- `--destructive`: `oklch(0.6141 0.2243 22.70)` (= `#ED2C3F`). Live: `open.spotify.com` — `--essential-negative`.
- `--destructive-foreground`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`).
- `--border`: `oklch(0.2850 0.0000 0)` (= `#2A2A2A`). Live: derived from `--background-elevated-highlight` — the brand uses surface contrast for separation more than line weight; no documented hairline token in the Encore root-var sweep.
- `--input`: `oklch(0.2393 0.0000 0)` (= `#1F1F1F`). Live: `support.spotify.com/us/` — the search-input pill bg.
- `--ring`: `oklch(0.7697 0.2124 148.67)` (= `#1ED760`). Live: `open.spotify.com` — same OKLCH as `--primary`, used as focus indicator on the player chrome.

### Polarity-locked surfaces

Spotify runs both light and dark canonical canvases (see §1), but a small set of surfaces stays locked across both:

- `--brand-canvas-night`: `oklch(0.1822 0.0000 0)` (= `#121212`). Live: `open.spotify.com` (`--background-base`) and `/premium` body. Stays `#121212` on every dark register; not a light variant.
- `--brand-canvas-press`: `oklch(0.0000 0.0000 0)` (= `#000000`). Live: `/premium` topnav (`.mh-header-hover` bg `rgb(0, 0, 0)`) and `/premium` footer band (`<footer>` bg `rgb(0, 0, 0)`). Stays pure black across the marketing site even when neighbouring sections shift hue; used for chrome edges (top + bottom of the page).
- `--brand-on-dark`: `oklch(1.0000 0.0000 0)` (= `#FFFFFF`). Live: `--text-base` on every dark surface, also the white-pill CTAs on `artists.spotify.com`. The white-on-dark text token; never lifted.
- `--brand-on-light`: `oklch(0.2768 0.0000 0)` (= `#282828`). Live: `newsroom.spotify.com` and `/about-us/contact/` body ink (`body { color: rgb(40, 40, 40) }`). The near-black body-ink token used on every light canvas; pricing-pill CTAs put this colour on top of pastel pills (e.g. `#282828` ink on `#FFD2D7` "Try 3 months for $0" Individual-tier button).

### Hairlines / dividers

Spotify does not expose a documented hairline-weight token. Separation on the player is achieved via surface contrast (`--background-base` → `--background-elevated-base` → `--background-elevated-highlight`), not via stroke. The marketing site uses generous whitespace + full-bleed colour bands; the only consistent rule-line I sampled is a tinted-white at low opacity on the player (`#ffffff1a` = `--background-tinted-base`).

- `--brand-hairline-soft`: `oklch(1.0000 0.0000 0 / 0.10)` (= `#FFFFFF1A`). Live: `open.spotify.com` — `--background-tinted-base`. Tinted-white at 10% used as a fade overlay; the closest the brand ships to a hairline token.
- `--brand-hairline-strong`: `oklch(1.0000 0.0000 0 / 0.14)` (= `#FFFFFF24`). Live: `open.spotify.com` — `--background-tinted-highlight`.

### Drift vs `tokens.css`

Not applicable — this is the first authored `DESIGN.md` for the brand. No prior `tokens.css` to reconcile against.

## §3 Typography

Spotify ships its own font family — `SpotifyMix` — across every surface, with three documented sub-faces. Body uses the UI variant; titles use a wider display variant; the narrower variant is reserved for newsroom display headlines. All values are observed values from the live DOM, not extrapolated.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (marketing hero) | `SpotifyMixUITitleVariable` | 900 | 128px | ~0.95 (visual) | 0 |
| Display (marketing section title) | `SpotifyMixUITitleVariable` | 800 | 64px | ~1.1 | 0 |
| Display (newsroom feature) | `Spotify Mix-Narrow` | 800 | 64px (feature) / 44px (card) | ~1.05 | 0 |
| Heading (corporate / about) | `SpotifyMixUITitle` | 700 | 48px (H1) / 32px (H2) | ~1.2 | 0 |
| Title (pricing tier H3) | `SpotifyMixUI` | 700 | 32px | ~1.1 | 0 |
| Body | `SpotifyMixUI` | 400 | 16px | ~1.5 | 0 |
| Label / disclaimer | `SpotifyMixUI` | 400 | 12px | ~1.5 | 0 |

Fallback stack as observed on `open.spotify.com`:
```
SpotifyMixUI, CircularSp-Arab, CircularSp-Hebr, CircularSp-Cyrl,
CircularSp-Grek, CircularSp-Deva, "Helvetica Neue", helvetica, arial,
"Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, "MS Gothic"
```

Notes on observed variable-axis behaviour:

- **Title axis is wide-by-default** — `SpotifyMixUITitle` and `SpotifyMixUITitleVariable` (the variable-font binding) render with a noticeably more humanist x-height + wider apertures than the body face. The visible "ultimate / home for / music" hero on `/premium` shows the italicised lowercase variant set against the regular display variant — both rolled into the same family with style-axis differentiation, not a separate italic file.
- **Narrow variant is newsroom-only** — `Spotify Mix-Narrow` only surfaces on `newsroom.spotify.com`. Other surfaces never reach for it.
- **Topnav weight is 700** — every primary nav link sampled on `/premium` ("Premium plans", "Support", "Download") computed to `font-weight: 700`, never 500.
- **Body weight on dark is white at 700 for emphasis, white at 400 for body, `#B3B3B3` at 400 for muted, `#7C7C7C` at 400 for the dimmest tier.** Spotify ships a 3-step ink ladder, not the 4–5 step ladder typical of B2B SaaS.

Fallback font for the preview shell: a custom proprietary face won't load in the preview render. Use the family chain above so the brand-declared name is first in the stack; resolution will fall through to `"Helvetica Neue"` and the layout remains intact.

## §4 Component vocabulary

One entry per distinct component pattern observed across the sampled surfaces. Each cites the live source.

### Pill CTA, primary (Spotify Green)

**Status:** `current`
**Live source:** `https://www.spotify.com/us/premium/` — `.mh-header-hover a` (the "Try 3 months for $0" topnav pill).
**Description:** Fully-rounded pill (`border-radius: 9999px`), `#1ED760` background, `#000000` ink (not `#121212`), `padding: 16px 48px` on the topnav variant. No border. No shadow. Hover slightly desaturates / scales — observed on the topnav variant; the exact transform was not captured but the brand convention is `transform: scale(1.04)` on hover (Encore pattern).
**States:** `default` `bg: #1ED760 / ink: #000000`. `hover` slight scale. `disabled` and `loading` not observed on the sampled marketing surfaces.

### Pill CTA, pastel-pricing

**Status:** `current`
**Live source:** `/premium` — `.plan` card CTA (`Try 3 months for $0` / `Try 1 month for $0` / `Get Premium Duo`).
**Description:** Same fully-rounded pill as the green primary, but the background is the tier-specific pastel (`#FFD2D7` / `#C4B1D4` / `#FFC862` / `#A5BBD1`) and the ink stays the same `#282828` dark. `padding: 16px 24px` observed. The pill sits centered on a dark `#282828` card with the matching tier title hue at 32px / 700 above it.
**States:** `default` only sampled. The hover affordance on the live site dims the pill slightly (~5% lightness drop) without changing hue.

### Pill CTA, ghost (white pill on dark photo)

**Status:** `current`
**Live source:** `https://artists.spotify.com/home` — top-right "Get access" pill.
**Description:** Same fully-rounded pill, `#FFFFFF` background, `#000000` ink, `padding: 4px 24px` (notably tighter than the green primary). Hover unobserved; the pattern repeats on every section CTA on the For Artists page ("See the data", "Explore Campaign Kit", "Explore Video & Visuals").
**States:** `default` observed; the For Artists log-in pill carries a 1px white stroke on the same dark surface as the variant differentiator.

### Topnav, marketing

**Status:** `current`
**Live source:** `/premium` — `<header class="mh-header-hover mh-default-z-index svelte-2b53f mh-fixed">`.
**Description:** Fixed-top, `#000000` background, 36–40px height. Spotify wordmark left-aligned, primary nav center (`Premium plans`, `Support`, `Download` at 16px / 700 white), authentication links right-aligned (`Sign up`, `Log in` at 16px / 700 `#D9DADC` slightly muted), terminating in the green `Try 3 months for $0` pill. A vertical hairline rule separates the auth links from the nav.
**States:** Fixed; sticky on scroll. `Premium plans` opens a dropdown menu (hover-revealed).

### Topnav, player

**Status:** `current`
**Live source:** `https://open.spotify.com/` — root header.
**Description:** Compact 64px-tall bar; Home + Search icon-only circular buttons (40px, `#1F1F1F` bg, white iconography, `border-radius: 50%`); search input pill on the right (`#1F1F1F` bg, 9999px radius, magnifier prefix icon). Topnav lives on `#000000` canvas distinct from the `#121212` content panel beneath.
**States:** Home circle button styled distinctly when active (`#1F1F1F` fill); Search input expands on focus.

### Hero, premium-marketing

**Status:** `current`
**Live source:** `/premium` — `.ScrollingHero_container__Vajti`.
**Description:** Full-viewport `#121212` canvas, oversized H1 in `SpotifyMixUITitleVariable` 128px / 900, rotating word ("music / artists / fans / live events / videos") that swaps via animation. Companion 64px H2 below ("Take us with you anywhere"). Right half holds a circular photographic motif (a face with the Spotify equalizer bars overlaid) with a play/pause toggle bottom-right.
**States:** Word rotation auto-plays; play/pause button toggles.

### Hero, newsroom

**Status:** `current`
**Live source:** `https://newsroom.spotify.com/` — top-of-page split layout.
**Description:** Two-column split, left holds a stacked uppercase eyebrow ("NOTE- / WORTHY" 800-weight Narrow) plus a feature-headline H2 (44px, white, Narrow). Right holds a tall photographic / gradient panel with the article subject. Black canvas left, gradient panel right.
**States:** Carousel — `1/5` pagination indicator at bottom-left.

### Pricing tier card

**Status:** `current`
**Live source:** `/premium` — `.plan` (`<li>` containers stacked in a 4-card grid).
**Description:** `#282828` card on the `#121212` page canvas; rounded corners on the outer card; an upper-left pill banner ("$0 for 3 months" etc.) in the matching tier pastel sits above the card top edge (the pill bleeds onto the canvas, breaking the card silhouette upward). Inside the card: Spotify wordmark + "Premium" mark line (16px white), tier-name H3 in tier pastel at 32px / 700, the price line at 16px white ("$0 for 3 months" / "$12.99 / month after"), a bulleted feature list with green `•` markers (visually — actual list-marker tokens not sampled), a full-width pastel-pill CTA at the bottom of the card, and a 12px disclaimer line beneath ("Premium Individual only. Free for 3 months..." with `Terms apply` underlined `#A7A7A7`).
**States:** `default` only sampled. No "featured tier" outline treatment observed — every tier card uses the same dark `#282828` chrome.

### Feature card, vivid full-bleed

**Status:** `current`
**Live source:** `/premium` — `.FeatureCard_featureCard__C3oKU` (4 stacked).
**Description:** Full-width section, ~509px tall, single saturated hue at full chroma (`#0D72EA` / `#D64000` / `#7358FF` / `#CC2FAF`), rounded `~24px` outer corners, white headline + Spotify wordmark + "Premium" mark anchored to the right column, left column holds a video or illustration loop. The four cards stack one per section, separated by the parent `--brand-section-voyager` green canvas.
**States:** Video loop autoplays; no hover state observed (these are content sections, not interactive cards).

### Content card, voyager green

**Status:** `current`
**Live source:** `/premium` — `.ContentCard_contentCard__TGdEu` ("Fitness — Take your workouts further").
**Description:** Smaller card (340px tall, ~510px wide), `#035341` deep voyager-green background, white-stroke icon glyph centered in the upper third (dumbbell silhouette), title (16px / 700 white) + body (14px white) anchored bottom-left, "Premium" mark with Spotify wordmark top-left. Rounded corners. Used as a content tile within the green section ladder, not as a standalone card.
**States:** `default` only.

### Premium mark (sub-wordmark)

**Status:** `current`
**Live source:** `/premium` — `.FeatureCard_premiumBadge__coF5R`, `.ContentCard_premiumBadge__afzPN`.
**Description:** The Spotify circle-Spotify icon followed by " Premium" wordmark at 16px / 700 white. Used on every feature card, content card, and pricing tier card as the brand-anchor. Always white. Never green when set on a pastel surface.
**States:** Static; no interactive variant.

### Search input, hub-style

**Status:** `current`
**Live source:** `https://support.spotify.com/us/` — the AI-search shell.
**Description:** `#1F1F1F` rectangular shell (4px radius), tab pills on top ("Search with AI" / "Basic Search" — green-stroke outlined pill for active, white text for inactive), placeholder text in `#B3B3B3` 16px ("Ask a question or describe your issue"), green circular submit button (32px, `#088569` fill, white arrow glyph) bottom-right.
**States:** Tab toggle switches active outline.

### Accordion / disclosure row

**Status:** `current`
**Live source:** `support.spotify.com/us/` — `Browse help articles` section ("Payments & billing", "Manage your account", "Premium plans"...).
**Description:** Stack of rows on `#121212` canvas; each row is 56–64px tall, left-aligned green-stroke glyph icon (24px), title in white 16–18px / 700, right-aligned chevron-down glyph in white at ~14px. Rows are separated by a hairline-soft horizontal line (likely `--brand-hairline-soft`).
**States:** Default / expanded — chevron rotates to up on expansion.

### Footer (marketing)

**Status:** `current`
**Live source:** `/premium` — bottom `<footer>` band.
**Description:** `#000000` background, `padding: 80px 0 50px`. Spotify wordmark top-left. Four columns of links labeled in white 14px uppercase ("COMPANY", "COMMUNITIES", "USEFUL LINKS", "SPOTIFY PLANS"). Body links at 16px / 700 white. Right side: three social icon circles (Instagram, X, Facebook) at 40px diameter on `#1F1F1F` fill, white iconography.
**States:** Static.

### Link, body (green)

**Status:** `current`
**Live source:** `/about-us/contact/` — "Help site", "Community", "Contact us" inline links.
**Description:** Inline `#1ED760` text on white canvas, `text-decoration: underline`, weight inherits body 400. The brand-green is preserved as a link colour across canvas polarities — green-on-black on dark surfaces, green-on-white on light surfaces. Underline always present (Spotify does not ship underline-on-hover; underline is default).
**States:** `default` underlined. `hover` slightly desaturates (~5%).

### Disclaimer / terms

**Status:** `current`
**Live source:** `/premium` — beneath every pricing card and beneath the hero CTA.
**Description:** 12px / 400 body, `#A7A7A7` (on `#282828` cards) or `#B3B3B3` (on `#121212` canvas), `Terms apply` link underlined with `text-decoration-color` matching the inline body colour (not green — the green-link rule is for body editorial links, not legal-disclaimer links). Wraps at ~3 lines max.
**States:** Static.

### Wordmark + sub-wordmark

**Status:** `current`
**Live source:** `https://artists.spotify.com/home` ("for Artists"), `https://developer.spotify.com/` ("for Developers"), `https://newsroom.spotify.com/` ("For the Record").
**Description:** Standard Spotify wordmark (circle glyph + "Spotify" lockup in white), followed by a sub-wordmark in lower-case + italicised companion label ("for Artists", "for Developers"). Sub-wordmark uses the same `SpotifyMix` family as the main wordmark; no separate sub-brand typeface. Always white on dark canvases; always black on light canvases.
**States:** Static.

### Cookie banner

**Status:** `current`
**Live source:** `/premium` — bottom-anchored `We Care About Your Privacy` banner.
**Description:** `#121212` body, two-column layout (left = description text, right = list of partners), full-width dark `#000000` pill buttons at the bottom: `ACCEPT COOKIES` (white text on dark fill, no border), `REJECT ALL` (same shape), and a `COOKIE SETTINGS` text-only link. Button labels are uppercased.
**States:** Default presented on first visit.

### Topnav vertical separator

**Status:** `current`
**Live source:** `/premium` — between `Download` and `Sign up`.
**Description:** A single 1px-wide, 24px-tall white rule sets `Sign up / Log in` apart from the primary nav. Subtle but consistent across marketing surfaces.
**States:** Static.

### Globe / locale selector (icon-only)

**Status:** `current`
**Live source:** `support.spotify.com/us/` — top-right of the topnav.
**Description:** Globe-outline 20px icon, white stroke, sits in a 40px square hit-area. Clicks open the locale selector dropdown (not sampled).
**States:** `default`. Cursor pointer on hover.

### Feature-card play / pause toggle (icon-only)

**Status:** `current`
**Live source:** `/premium` — bottom-right of the hero, controls the video / animation loop.
**Description:** 48px circle, `#1F1F1F` fill, white pause / play glyph centered. Floats above the video loop in the lower-right corner of the hero.
**States:** `pause` / `play` toggle.

### Pricing card upper banner

**Status:** `current`
**Live source:** `/premium` — "$0 for 3 months", "$0 for 1 month" pills above the Individual / Student tier cards.
**Description:** Pill banner (border-radius: 9999px), tier-pastel background (`#FFD2D7` / `#C4B1D4`), `#282828` ink at ~16px / 700, `padding: 4px 16px`. Sits atop the card overlapping its upper edge by ~30% of the pill height — breaks the card outline upward.
**States:** Present on promotional tiers (Individual, Student); absent on Duo, Family.

### Status — not observed on any sampled surface

The following components are common in the catalogue's other brand vocabularies but were not observed on any Spotify surface in this cycle. Recording them so the preview author doesn't reach for them:

- **Tooltip / popover** — `status: not-observed-2026-05`. Spotify's marketing relies on inline copy, not hover-revealed tooltips.
- **Toast / snackbar** — `status: not-observed-2026-05`. The player surfaces a few floating "Added to library" toasts but I did not sample them under the new-brand authoring constraint.
- **Modal** — `status: not-observed-2026-05` on the marketing site. The player ships modals (Add to Playlist, Share); not captured.
- **Date picker / calendar** — `status: not-observed-2026-05`. Spotify does not ship a calendar surface in any of the URLs sampled.
- **Table** — `status: not-observed-2026-05`. The player ships table-like track lists; not sampled under this cycle.
- **Tab strip (text-pill segmented)** — observed once as part of the Support page's `Search with AI / Basic Search` toggle; not generalisable as a standalone pattern.
- **Tag / category chip** — `status: not-observed-2026-05`. Spotify's marketing categorises via colour, not chip strips.

## §5 Surface inventory

The URLs sampled in this cycle, with a one-line note on what each surface contributes to the design system understanding.

- `https://open.spotify.com/` — anchors the Encore design-system token block; `:root` CSS variables (`--background-base` through `--decorative-base`) are exposed for direct DOM-reading. Authoritative source for the brand-green OKLCH and the surface-elevation ladder.
- `https://www.spotify.com/us/premium/` — the canonical marketing canvas. Contributes hero, feature-card vivid palette, voyager-green section canvas, pricing pastel ladder, footer.
- `https://support.spotify.com/us/` — search-shell + accordion-row components, confirms green-icon-on-dark consistency.
- `https://newsroom.spotify.com/` — light editorial canvas, the `Spotify Mix-Narrow` display face, uppercase eyebrow pattern.
- `https://artists.spotify.com/home` — dark-photographic register, white-pill CTA with dark ink, sub-wordmark pattern.
- `https://developer.spotify.com/` — the deep-purple illustrated sub-brand register; documented but treated as off-canvas for the preview shell.
- `https://www.spotify.com/us/about-us/contact/` — the light-corporate register, body ink `#282828`, green-link colour preserved across polarity flip.

## §6 Notes

- **Both polarities ship under one brand.** Spotify is not "dark-canonical with a synthesised light mode" or vice versa. The player + Premium marketing + support are dark; newsroom + about-us + for-artists pricing pages are light. Both register the same primary-green link colour `#1ED760`, the same Spotify-mix-family type, and the same near-black neutral (`#282828` as body ink on light, `#121212` as canvas on dark). The shell should pick one canonical canvas for the demo but the `[data-theme="dark"]` block stays at the same primary OKLCH — there is no documented light variant of Spotify Green.
- **Spotify Green is the only chromatic identity token.** Every other colour the brand exposes (`--brand-section-blue`, `--brand-section-orange`, `--brand-pricing-pink`, ...) is a *section-canvas* or *tier-marker* hue, not an identity token. Re-tinting Spotify Green to win contrast is the most common mistake — don't. If green-on-something fails AA, swap to white-on-green-fill or route to `--foreground` and carry differentiation via weight (the brand itself does this on the topnav, where the green is only ever used as a pill-fill colour, never as text on dark).
- **Encore exposes the brand on `:root`.** Reading the brand colours is mechanical — `getComputedStyle(document.documentElement).getPropertyValue('--essential-bright-accent')` on `open.spotify.com` returns `#1ed760` verbatim. A future authoring cycle can re-sample the entire `--background-*`, `--text-*`, `--essential-*`, `--decorative-*` family in one DOM call.
- **Marketing chrome is full-bleed colour, not accent colour.** The four feature cards on `/premium` carry blue / orange / purple / magenta as the *entire panel*, not as a 4px stripe. The preview should treat each as a section, not as a swatch.
- **Pricing pastels are pasted twice per card.** The same tier hue colours both the H3 tier-title and the CTA pill bg — never just one. The CTA pill is on the pastel; the card body stays dark `#282828`.
- **Avoid for the preview**: real artist names (Spotify ships real artist photography on `/premium` — invented neutral imagery only), Peloton / Hulu / Premium-Student-eligibility specifics ("Peloton" appears in the Fitness content-card body verbatim — substitute Halcyon-team-rituals copy), price points ($12.99 / $18.99 / $21.99 — substitute generic tier shapes), specific tier names ("Premium Individual / Duo / Family / Student" map 1:1 to Spotify's actual SKU set — use generic tier names per the catalogue's "Pricing details: never the host product's surface" rule, e.g. Hobby / Team / Org-wide).

## §Known gaps

- **Player chrome interior (now-playing footer, queue panel, sidebar nav)** — sampled `open.spotify.com` for token values and topnav components but did not capture the now-playing footer, the persistent left sidebar, or the queue right panel. These are signed-in-only surfaces and could be sampled in a refresh cycle.
- **Mobile chrome** — every surface above was sampled in a 1440px desktop viewport. Spotify's mobile-app chrome is a substantial second register (the iOS / Android cards, the bottom tab bar, the `pull-to-refresh` patterns) that this cycle does not touch.
- **Authenticated dashboards** — Spotify for Artists dashboard, Spotify for Developers app dashboard, and Spotify Wrapped 2026 are all behind login walls. Sampled the unauthenticated marketing surface only.
- **Brand-archive / press kit** — `design.spotify.com` does not resolve; Spotify does not appear to publish a public brand archive in the way Notion / Linear / Stripe do. The Encore design system has a public GitHub presence (`spotify/encore`) but I treated GitHub as off-source for this authoring cycle (the rule against third-party catalogue content covers any source-of-truth other than the live brand surface).
- **CTA hover / focus states** — captured `default` for every interactive element but did not exhaustively sample `:hover` / `:focus-visible` / `:active`. The pricing-pill hover affordance is a slight scale + ~5% lightness drop on the live site; not captured at the token level.
- **Reduced-motion variant** — Spotify's hero word-rotation and feature-card video loops have reduced-motion overrides on the live site; not sampled in this cycle.
