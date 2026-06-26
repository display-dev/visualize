---
slug: cal-style
name: Cal.com
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://cal.com/
  - https://cal.com/pricing
  - https://cal.com/enterprise
  - https://cal.com/customers
  - https://cal.com/blog
  - https://cal.com/docs
  - https://cal.com/ai
  - https://cal.com/peer
  - https://app.cal.com/login
  - https://cal.com/why-cal
canonical-canvas: both
selection:
  mood: [minimal, productivity]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a confident, polished register with minimal, productivity visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Cal.com

Cal.com runs three distinct surface families on one identity. The marketing site (`cal.com/*`) is light-canonical on a warm near-white canvas with white cards floated above and near-black filled CTAs. The product surface (`app.cal.com`, `i.cal.com/<handle>` booking pages, and the docs at `cal.com/docs`) is dark-canonical on a flat near-black canvas with white pill CTAs and an accent green for state. The Cal.ai sub-brand (`cal.com/ai`) is its own polarity again — a deep desaturated indigo canvas (`#0d0c27`) with a violet primary (`#6349ea`) that doesn't appear on either of the other two surfaces. Because the brand ships all three deliberately — and the booking page is the brand's voltage moment in dark, while the homepage is light — the catalog entry is `canonical-canvas: both`.

The marketing site is built in Framer; computed styles expose the Framer class chain (`framer-VNXTl framer-txrinh`) and the brand's own typeface families ("Cal Sans", "Cal Sans UI Variable Light", and several display/UI variants). Cal Sans carries the identity across every surface — wordmark in the topnav, every heading, every short pill label.

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | https://cal.com/ | `#f4f4f4` warm light gray with `#fff` cards | Hero is plain text on canvas (no gradient), the signature card is a booking widget (avatar + event type + calendar grid) floated as a white card |
| Marketing pricing | https://cal.com/pricing | Same canvas + white tier cards | Four tiers (Individuals/Free, Teams, Organizations, Enterprise via Talk-to-sales) presented as boxed white cards in a vertical stack on mobile, presumably columns wider |
| Marketing enterprise | https://cal.com/enterprise | Same canvas + numbered white feature cards (`01`, `02`, `03` eyebrow) | Each card carries a dashboard mockup (Insights screenshot, SLA "All systems operational" green bars, security ring diagram) |
| Marketing customers | https://cal.com/customers | Same canvas + customer-logo lockup cards | Each card pairs the Cal wordmark with a customer logo (Manifest Law, etc.) on a 4-corner-cropped grid backdrop |
| Marketing blog | https://cal.com/blog | Same canvas + post-cover cards | Post covers carry photographic stock imagery with overlaid Cal.com-template title and subtitle |
| Marketing cream interlude | observed across https://cal.com/ deep scroll | `#faf9f5` cream panel | A single warm-cream band that appears as a section interlude — sparingly used, not a full canvas swap |
| Docs | https://cal.com/docs | `#0f0f0f` near-black canvas, white ink | Three-pane MDX-shape docs with a "Cal.com Docs" wordmark composite in the topnav and `Copy page` pill |
| App login | https://app.cal.com/login | `#0f0f0f` canvas with elevated `#171717` card | Form card holds the Cal.com wordmark + Google/Microsoft SSO buttons + email/password fields; an "Add this app to your home screen" install-PWA banner pins to the bottom |
| Booking page | https://cal.com/peer (resolves to `i.cal.com/peer/meet`) | Same dark canvas | The signature surface — calendar grid with disabled days greyed, selected day in white-outlined cell, time-slot list as wide pill rows, header dark-gradient promo banner ("Scheduling infrastructure for absolutely everyone") |
| 404 fallback | https://cal.com/why-cal | Same dark canvas | Carries a green accent — the unclaimed-username headline renders "is still available" with `available` in `#6ce0a2` green; the only Cal.com surface where the green is the focal element |
| Cal.ai sub-brand | https://cal.com/ai | `#0d0c27` desaturated indigo canvas, white ink | Topnav wordmark switches from `Cal.com` to `Cal.ai`, primary CTA flips from near-black to violet `#6349ea`, hero `AI-powered calls` is set in a gradient violet-to-lavender treatment |

The light marketing surfaces share the `#f4f4f4` canvas + `#fff` card pattern across every page sampled. The dark product surfaces share the `#0f0f0f` canvas + `#171717` card pattern. The Cal.ai surface family is structurally similar to the product dark (canvas + elevated cards) but with hue-shifted desaturated indigo replacing pure greys, and a violet primary replacing white-on-dark.

## §2 Palette

Values are sourced from live `getComputedStyle` against the URLs in §1. Hex equivalents are the live RGB; OKLCH conversions are computed via the vendored culori at `/Users/carl/Development/visualize/visualize/scripts/vendor/culori.mjs` and round-trip-verified.

### Brand primary — near-black CTA fill (marketing)

Cal.com's marketing primary CTA is not a chromatic hue. It's a near-black pill with white ink, plus a near-imperceptible white inset highlight at the top. The dark mode flips this — primary becomes white-on-dark instead. There is no `--primary` hue in the brand's signature register; the recognisability comes from Cal Sans set in white on near-black, not from a colour identity.

- `--primary`: `oklch(0.1776 0.0000 0)` (= `#111111`). Live: `https://cal.com/` — the rendered `Get started` button in the topnav and the body CTAs (`Sign up with Google`, `Get started`, `Try for free`) all render as a near-black fill. Computed-style query returns the white text on `<p class="framer-text">` (inner element) plus an inset highlight shadow on the anchor wrapper (`rgba(255, 255, 255, 0.15) 0px 2px 0px 0px inset`).
- `--brand-primary-ink-on-light` (h1 colour): `oklch(0.2603 0.0000 0)` (= `#242424`). Live: `https://cal.com/` — `h1` and `h2` ink (`rgb(36, 36, 36)`); slightly lifted from pure-near-black `#111` to soften long-form headlines.
- `--brand-primary-alt`: `oklch(0.2809 0.0000 0)` (= `#292929`). Live: `https://cal.com/` — secondary headline ink and dark icon strokes (`rgb(41, 41, 41)`).

### Documented secondary brand colour — Cal.ai violet

Used only on Cal.ai surfaces (`cal.com/ai`). Does not appear on the marketing site or in the main product chrome. Treat as a sub-brand accent, not as a primary brand colour for the catalog preview.

- `--brand-accent-violet`: `oklch(0.5341 0.2293 282.75)` (= `#6349ea`). Live: `https://cal.com/ai` — the `Try AI scheduling` primary CTA fill, `rgb(99, 73, 234)` from computed styles. The hero headline "AI-powered calls" is rendered as a violet-to-lavender gradient text fill in the same hue family.

### Accent — 404 green

A pure-saturation green that appears only on the 404 page and inside enterprise / system-status mockups (the "All systems operational" green bars on the SLA card). Does not appear on routine marketing surfaces.

- `--brand-accent-green`: `oklch(0.8228 0.1388 157.89)` (= `#6ce0a2`). Live: `https://cal.com/why-cal` — the word `available` in the 404 headline "The username /why-cal is still **available**" (computed `lab(70.55 -66.51 45.81)`, which round-trips to `#6ce0a2`).

### Accent — register/link blue

A mid-saturation cobalt that appears as an active accent on dark-canvas surfaces — the `Register now` link on 404, the `Sign in with SAML/OIDC` link on the login card.

- `--brand-accent-blue`: `oklch(0.6729 0.1627 261.40)` (= `#5b93f9`). Live: `https://cal.com/why-cal` — `rgb(91, 147, 249)` on the "Register now →" anchor.

### Canvas + neutrals (light, marketing)

- `--background`: `oklch(0.9672 0.0000 0)` (= `#f4f4f4`). Live: `https://cal.com/` — `body` background returns `rgb(244, 244, 244)`. **Not pure white** — a warm-near-white tinted gray that's the recognisable Cal.com canvas register.
- `--foreground`: `oklch(0.2603 0.0000 0)` (= `#242424`). Live: `https://cal.com/` — primary body / heading ink (`rgb(36, 36, 36)`).
- `--card`: `oklch(1 0 0)` (= `#ffffff`). Live: `https://cal.com/` — every white card (booking widget, pricing tier card, feature card, blog post card) is pure white floated above the warm-gray canvas. The card-to-canvas tonal step is the visual rhythm of the marketing page.
- `--card-foreground`: same as `--foreground`.
- `--popover`: `oklch(1 0 0)` (= `#ffffff`). Live: synthesised — no popovers observed in the unauthenticated marketing surface.
- `--popover-foreground`: same as `--foreground`.
- `--muted`: `oklch(0.9818 0.0054 95.10)` (= `#faf9f5`). Live: `https://cal.com/` — the cream interlude band observed deep-scroll, `rgb(250, 249, 245)`. Used as a single section-band variant against the standard `#f4f4f4` body.
- `--muted-foreground`: `oklch(0.6301 0.0000 0)` (= `#898989`). Live: `https://cal.com/` — caption-row and supporting-prose ink, `rgb(137, 137, 137)`.
- `--accent`: `oklch(0.9672 0.0000 0)` (= `#f4f4f4`). Live: synthesised match to canvas; the brand doesn't ship a tinted accent surface in light mode.
- `--accent-foreground`: same as `--foreground`.
- `--secondary`: `oklch(0.9818 0.0054 95.10)` (= `#faf9f5`). Live: equivalent to the cream interlude — used as the secondary panel canvas.
- `--secondary-foreground`: same as `--foreground`.
- `--destructive`: `oklch(0.5712 0.1922 21.50)` *(synthesised; not directly observed)*. The marketing site doesn't surface destructive states.
- `--destructive-foreground`: `oklch(1 0 0)` (= `#fff`).
- `--border`: `oklch(0.9067 0.0000 0)` (= `#e0e0e0`). Live: `https://cal.com/` — card and section hairlines render as `rgb(224, 224, 224)`.
- `--input`: same as `--border`.
- `--ring`: `oklch(0.1776 0.0000 0)` (= `#111111`). Live: matches `--primary` — focus rings inherit the near-black fill colour on the marketing site.

### Canvas + neutrals (dark, product / docs / booking)

The dark surface family is its own register, not a synthesised inversion. It appears on `app.cal.com`, `cal.com/docs`, `i.cal.com/<handle>` booking pages, and `cal.com/why-cal` (the 404).

- `--background` (dark): `oklch(0.1684 0.0000 0)` (= `#0f0f0f`). Live: `https://app.cal.com/login`, `https://cal.com/docs`, `https://cal.com/ai`'s shared base layer — body returns `rgb(15, 15, 15)`. A flat near-pure-black with no chromatic tint.
- `--foreground` (dark): `oklch(1 0 0)` (= `#ffffff`). Live: heading and primary ink across all dark surfaces (`rgb(255, 255, 255)`).
- `--card` (dark): `oklch(0.2046 0.0000 0)` (= `#171717`). Live: `https://app.cal.com/login` — login card (`rgb(23, 23, 23)`); also the elevated card surface on `cal.com/docs`.
- `--card-foreground` (dark): same as `--foreground` (dark).
- `--popover` / `--popover-foreground` (dark): match the card values.
- `--muted` (dark): `oklch(0.2686 0.0000 0)` (= `#262626`). Live: `https://cal.com/ai` — elevated card surfaces (`rgb(38, 38, 38)`).
- `--muted-foreground` (dark): `oklch(0.7155 0.0000 0)` (= `#a3a3a3`). Live: caption ink across dark surfaces (`rgb(163, 163, 163)`).
- `--accent` (dark): same as `--muted` (dark).
- `--accent-foreground` (dark): same as `--foreground` (dark).
- `--secondary` (dark): same as `--card` (dark).
- `--border` (dark): `oklch(0.2686 0.0000 0)` (= `#262626`). Live: hairlines on dark cards (calendar grid cell rules on the booking page, login-card edge).
- `--input` (dark): same.
- `--ring` (dark): white — focus rings invert with the canvas.

### Polarity-locked surfaces — Cal.ai sub-brand

The Cal.ai chrome carries surfaces that don't appear on other Cal.com canvases. They stay fixed when the catalog preview themes between light and dark — Cal.ai is its own polarity, not a derived state.

- `--brand-calai-canvas`: `oklch(0.1746 0.0539 280.91)` (= `#0d0c27`). Live: `https://cal.com/ai` — body background `rgb(13, 12, 39)`.
- `--brand-calai-surface-1`: `oklch(0.2082 0.0504 282.83)` (= `#15142e`). Live: card surface (`rgb(21, 20, 46)`).
- `--brand-calai-surface-2`: `oklch(0.2462 0.0596 282.51)` (= `#1d1c3c`). Live: nested card / pill background (`rgb(29, 28, 60)`).
- `--brand-calai-surface-3`: `oklch(0.2813 0.0545 283.84)` (= `#262543`). Live: elevated card (`rgb(38, 37, 67)`).
- `--brand-calai-surface-4`: `oklch(0.2972 0.0538 284.14)` (= `#2a2947`). Live: deepest elevated surface in nav and topnav-pill (`rgb(42, 41, 71)`).
- `--brand-calai-violet`: `oklch(0.5341 0.2293 282.75)` (= `#6349ea`). Live: the violet primary CTA fill (covered above under "Documented secondary").

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.9067 0.0000 0)` (= `#e0e0e0`). Live: `https://cal.com/` — card hairlines (`rgb(224, 224, 224)`).
- `--brand-hairline-strong`: `oklch(0.9123 0.0017 247.84)` (= `#e1e2e3`). Live: `https://cal.com/` — slightly cooler-tinted dividers used on a small subset of sections (`rgb(225, 226, 227)`).
- `--brand-hairline-dark`: `oklch(0.2686 0.0000 0)` (= `#262626`). Live: dark-canvas hairlines on `app.cal.com` and `cal.com/docs`.

### Drift vs `tokens.css`

Cross-checking the live observations above against the current `tokens.css`, several values disagree:

| Token | Current `tokens.css` | Live observation | Reconciliation |
|---|---|---|---|
| `--background` (light) | `oklch(1 0 0)` (`#ffffff`) | `oklch(0.9672 0 0)` (`#f4f4f4`) | Live is warm-near-white, not pure white. The brand's recognisable card-on-canvas tonal step depends on this. Update `tokens.css` to `#f4f4f4`. |
| `--card` (light) | `oklch(0.9702 0 0)` (`#f7f7f7`) | `oklch(1 0 0)` (`#ffffff`) | The token mapping is inverted from live — cards are pure white on a warm-gray canvas, not the other way around. Swap `--background` and `--card`. |
| `--muted` (light) | `oklch(0.9816 0.0017 247.8395)` (cool near-white) | `oklch(0.9818 0.0054 95.10)` (`#faf9f5` cream) | The current muted hue is cool / blue-tinted; the live cream interlude is warm / yellow-tinted. Live observation is one band only, so this may be intentional drift, but the hue family should follow the brand's warm tinted register. |
| `--brand-surface-dark` | `oklch(0.1730 0 0)` (`#101010`) | `oklch(0.1684 0 0)` (`#0f0f0f`) | Off by ~1 unit in the lightness scale. Live product canvas is `rgb(15, 15, 15)` exactly. Update. |
| `--brand-surface-dark-elevated` | `oklch(0.2178 0 0)` (`#1c1c1c`) | `oklch(0.2046 0 0)` (`#171717`) | Same family, slightly mis-tuned. Live elevated card surface is `rgb(23, 23, 23)`. Update. |
| `--brand-brand-accent` (blue) | `oklch(0.6231 0.1880 259.8145)` (≈ `#3b82f6`) | `oklch(0.6729 0.1627 261.40)` (`#5b93f9`) | The Cal.com link blue on the 404 register link is `rgb(91, 147, 249)`. The current token value is a synthesised Tailwind-shape blue, lighter chroma and a stop too deep. Update to the live observed value. |
| `--brand-badge-violet` | `oklch(0.7400 0.1500 292.7172)` (lifted pastel) | `oklch(0.5341 0.2293 282.75)` (`#6349ea`) | The current value is documented as a lift-for-WCAG-AA; the actual Cal.ai violet primary is significantly darker and more saturated. The lifted value is a synthesised neutral-violet pastel that doesn't match the brand. Either rename the token to `--brand-calai-violet` and use the true value, or keep the lift for badge-only use and add a separate `--brand-calai-violet` token. |
| Cal.ai surface family | absent | five-stop indigo ladder `#0d0c27` → `#2a2947` | The current `tokens.css` doesn't model the Cal.ai sub-brand chrome at all. If the preview is meant to represent the brand surface, the Cal.ai chrome needs token coverage. |
| `--brand-success` | `oklch(0.6959 0.1491 162.4796)` (mid-emerald) | `oklch(0.8228 0.1388 157.89)` (`#6ce0a2`) | The current success token is mid-saturation emerald; the live 404 green and the SLA status-bar green are lighter mint at `#6ce0a2`. Lightness is off by ~13 OKLCH points. Update or document the divergence. |
| `--font-display` | `Cal Sans, Inter, sans-serif` | Confirmed live — `"Cal Sans", sans-serif` on h1/h2/h3 across marketing | Token is correct; no drift. |
| `--font-sans` (body) | `Inter, sans-serif` | Live body is `"Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif` (Framer rendering of the brand's own UI typeface) | The brand's body type is a Cal Sans variant, not Inter. The Inter fallback is what loads if the proprietary font fails. Either accept Inter as the fallback (current behaviour) or document the proprietary first stack. |

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | "Cal Sans", sans-serif | 600 | 40px (mobile-observed) | 44px (`1.1`) | normal |
| Heading | "Cal Sans", sans-serif | 600 | 32px (h2) | 35.2px (`1.1`) | normal |
| Title | "Cal Sans", sans-serif | 600 | 16-18px (section eyebrows + small headings) | ~1.1 | normal |
| Body | "Cal Sans UI Variable Light", "Cal Sans UI Variable Light Placeholder", sans-serif | 300 | 14px | 21px (`1.5`) | normal |
| Caption | "Cal Sans UI Variable Light" family | 300 | 12px | normal | normal |
| Mono | not directly observed on marketing; `cal.com/docs` uses a default mono stack on code blocks | — | — | — | — |

Notes on the proprietary type system:

- Cal.com ships its own typeface family — **Cal Sans** (display weights) and **Cal Sans UI Variable** (body weights). Both are observed as Framer-rendered font families on `cal.com/` and consistently across every marketing surface.
- The variable axis is exposed through named families: `"Cal Sans UI Variable Light"`, `"Cal Sans UI Variable Regular"`, `"Cal Sans Light"`, etc. — this is Framer's pattern for shipping pinned weights of a variable typeface as separately-named families. Treat them as distinct families for `@font-face` purposes; in shadcn-semantic terms, `--font-sans` collapses them all to a single "Cal Sans family" with weight as the axis.
- Body weight is **300 (Light)**, not the more conventional 400. This is part of Cal.com's airy / scheduling-software register — body prose reads as Light across the whole site.
- Heading weight is **600 (SemiBold)**. Cal Sans does not render at heavy weights anywhere on the live site; the brand never reaches for 700+ on display type.
- The booking page on `i.cal.com/peer/meet` exposes the product's own body font stack as `"fontSans", "fontSans Fallback"` — a Next.js / next/font naming pattern that resolves at build time to the same Cal Sans UI family. The product surface inherits the marketing brand's type identity.
- There's no observed serif anywhere on the brand. Cal.com is fully sans across marketing, product, docs, and the Cal.ai sub-brand.

## §4 Component vocabulary

### topnav

**Status:** `current`
**Live source:** `https://cal.com/` — `header` containing the `Cal.com` wordmark + right-aligned `Sign in` text link + `Get started` filled pill
**Description:** Floating chrome on light marketing — `Cal.com` rendered in Cal Sans 600 in `#242424` ink on the warm-gray canvas (no separate header background fill — the topnav reads off the body canvas). The right side carries a plain text link (`Sign in`, 14px, weight 300, ink `#111`) and a filled pill CTA (`Get started`, white text on near-black fill, 12px radius). On Cal.ai surfaces the wordmark switches to `Cal.ai` and the CTA flips to violet `#6349ea` fill.
**States:** `default` (ink colour observed); hover not directly captured in this pass (deferred — see §Known gaps).

### topnav (dark)

**Status:** `current`
**Live source:** `https://app.cal.com/login`, `https://cal.com/docs`, `https://cal.com/why-cal`
**Description:** On dark canvases the same chrome inverts — wordmark `Cal.com` (or `Cal.com Docs` composite on the docs site) renders white-on-canvas, no separate header fill. The "Open menu" hamburger sits to the right.
**States:** `default` observed.

### primary CTA pill (filled, marketing)

**Status:** `current`
**Live source:** `https://cal.com/` — `Get started` (multiple instances), `Sign up with Google`, `Try for free`, `Talk to sales` (when shown as primary)
**Description:** Framer-rendered anchor wrapper, rounded pill (`border-radius: 12px`), padding `8px 12px`, height 36px. Fill is the brand near-black (`#111` from screenshot inspection; the inner `<p>` carries the white text `rgb(255, 255, 255)` at `font-size: 14px`, weight 300). Anchor wrapper carries a top-edge inset highlight shadow `rgba(255, 255, 255, 0.15) 0px 2px 0px 0px inset` that gives the pill a faint top-rim glaze, suggesting depth without a full bevel. Trailing chevron `›` sits to the right of the text inside the same pill.
**States:** `default` observed. The inset highlight reads as the static "raised" state; hover/press not captured.

### primary CTA pill (filled, Cal.ai)

**Status:** `current`
**Live source:** `https://cal.com/ai` — `Try AI scheduling`, `Book a sales call with our team`
**Description:** Same pill geometry as the marketing CTA (12px radius, ~36-40px tall), but the fill is the Cal.ai violet `#6349ea` and the text stays white at 14px weight 300. The pill has a slightly softer presence on the indigo Cal.ai canvas compared to the high-contrast near-black-on-warm-gray of the marketing site.
**States:** `default` observed.

### primary CTA pill (filled, dark / product)

**Status:** `current`
**Live source:** `https://app.cal.com/login` — `Continue` (form submit), `Sign in with Google`, `Sign in with Microsoft`
**Description:** On dark canvases the primary CTA inverts — white fill (`#ffffff`) with near-black ink (`#0f0f0f`), same pill geometry (12px radius, full-width inside the login card). Brand logos (Google G, Microsoft windowpane) sit to the left of the text.
**States:** `default` observed.

### secondary text link with chevron

**Status:** `current`
**Live source:** `https://cal.com/` — `Sign up with email`, `Book a demo`, `Explore apps`, `Read story` (on customer cards)
**Description:** Outlined pill — `border-radius: 12px`, 1px hairline border at `#e0e0e0`, transparent fill, dark text (`#242424`) at 12px font with trailing chevron icon. Same overall geometry as the filled primary but inverted treatment. Used as the secondary action in two-button rows.
**States:** `default` observed.

### plain text link with arrow

**Status:** `current`
**Live source:** `https://cal.com/why-cal` — `Register now →`
**Description:** Unframed text with trailing arrow glyph, the `Register now` link colour is `#5b93f9` (the brand's mid-blue accent). Used when the surrounding surface is dark.
**States:** `default` observed.

### inline eyebrow chip

**Status:** `current`
**Live source:** `https://cal.com/` — `Cal.com launches v6.5 ›`, `Pricing`, `Enterprise`, `Blog`, `Wall of love`, `App store`, `Customer stories`, `Demo`, `Testimonials`, `Trusted by fast-growing`
**Description:** A small pill with a leading icon (sparkle / lock / shield depending on the section) and 12px text in `#242424` ink. Pill fill is transparent or matches the canvas; the pill is identified by its 1px hairline border at `#e0e0e0` and `4px 12px` padding (visual approximation). Sits as a section eyebrow above the H1/H2 of each section.
**States:** `default` observed.

### booking widget card (the brand's voltage moment, light marketing)

**Status:** `current`
**Live source:** `https://cal.com/` — the white card under the hero that shows `Cédric van Ravesteijn / Partnerships Meeting / [15m] 30m 45m 1h / Cal Video / Europe/Amsterdam / [calendar grid]`
**Description:** Pure-white card (`#ffffff`) floated above the warm-gray canvas, rounded corners (observed ~16px), pads internal content generously. Internal hierarchy:
  - Avatar (40px circle) + display name (14px weight 600 in `#242424`)
  - Event-type title (`Partnerships Meeting`, ~18px weight 600)
  - Two-line event description in body (`Cal Sans UI Light` weight 300)
  - Duration selector — row of pill toggles (`15m`, `30m`, `45m`, `1h`), the selected pill renders with a darker fill background while inactive pills stay transparent, all bordered with a hairline
  - Conferencing badge — small inline pill ("Cal Video", "Zoom", etc.) with leading icon at 12px ink
  - Timezone selector — globe icon + region name + caret
  - **Calendar grid** — the signature surface within the card. Day-of-week column headers (`SUN MON TUE WED THU FRI SAT`) in 12px uppercase muted ink; date cells in a 7×N grid, each cell ~56px high, dates set in 14-16px Cal Sans. Cells with availability render with `#f4f4f4` warm-gray fill (matching the body canvas, which makes them read as "lifted out of the white card"); cells without availability render transparent. Today is highlighted with a darker fill (near-black). Days with a small bullet beneath the date carry availability for the prior month overflow / current month bookings.
**States:** `default`. Within the grid: `available` (warm-gray fill), `today` (dark filled), `disabled` (no fill, dim ink), `selected` not observed because no day is clicked in the static page.

### booking widget card (dark / product)

**Status:** `current`
**Live source:** `https://cal.com/peer` → `https://i.cal.com/peer/meet`
**Description:** Same internal structure as the marketing-card variant, but rendered on dark canvas. The calendar cells now read as `#171717` elevated dark fill for available days against the `#0f0f0f` base canvas. Disabled days carry `#a3a3a3` muted ink at `rgba` opacity. Today's outline becomes a 2px white-ish border around the cell instead of a filled treatment. The selected day fills with white. The hero promo banner above the booking widget ("Scheduling infrastructure for absolutely everyone") sits on a dark-violet-to-charcoal radial gradient — this is the only place on the booking page where chromatic colour appears.
**States:** `default`, `available`, `today` (outlined), `selected` (filled white), `disabled` (dim ink, no cell fill).

### time-slot list (product)

**Status:** `current`
**Live source:** `https://i.cal.com/peer/meet` — after selecting a date, the right-rail list of `11:15`, `11:20`, `11:25` clickable rows
**Description:** Vertical stack of wide outlined pills, each ~52px tall with `#262626` hairline border and transparent fill. Time set in Cal Sans at 14-16px in white. A small 12h/24h pill toggle sits in the top-right of the list.
**States:** `default`. Hover not captured.

### event-type card (in-product browse / link page)

**Status:** `current`
**Live source:** `https://i.cal.com/peer/meet` (renders one event type — `Meeting`) inferred from the brand pattern; the cal.com signature avatar + name + event-list shape that appears on `/peer` is the structure
**Description:** Avatar + display name + booking-event-type list, each event presented as a tappable row carrying the title, duration, and conferencing badge.
**States:** `default` observed.

### form input (product)

**Status:** `current`
**Live source:** `https://app.cal.com/login` — `Email` field and `Password` field
**Description:** Full-width input with `12px` radius, padding ~12px 16px, transparent fill on the elevated card surface, 1px `#262626` hairline border. Floating label sits above the input in white at 14px weight 600 (`Email`, `Password`). Password field carries a leading eye-icon for show/hide and a trailing `Forgot?` link to the right of the label.
**States:** `default` observed.

### form input with leading badge (auth provider button)

**Status:** `current`
**Live source:** `https://app.cal.com/login` — `Sign in with Google`, `Sign in with Microsoft`
**Description:** Full-width white pill (`#ffffff`) on the dark card, 12px radius, ~44px tall. Provider logo (multicolour Google G or Microsoft four-quadrant) sits left, label `Sign in with <provider>` in Cal Sans at 14-16px in `#0f0f0f` ink. Identical geometry to the primary CTA pill, but coloured for the SSO context.
**States:** `default` observed.

### pricing tier card (marketing)

**Status:** `current`
**Live source:** `https://cal.com/pricing` — four cards: `Individuals` (Free), `Teams` ($12/seat/month), `Organizations` (custom CTA), `Enterprise` (Talk to sales)
**Description:** Pure-white card (`#ffffff`) on warm-gray canvas, ~16px outer radius, generous internal padding (~32px). Each card stacks:
  - Eyebrow / category — small Cal Sans pill at the top (`Individuals`, `Teams`, etc.)
  - Tier name — large display heading at the top of the card body (`Free`, `$12`, `Custom`)
  - Per-period suffix (`per month/user`) inline-faded in muted ink
  - Tier description — one line of body prose
  - Primary CTA pill (filled near-black) — `Use for free`, `Try for free`, `Talk to sales`
  - "Free plan features, plus:" / "Pro features, plus:" eyebrow
  - Feature list — vertical stack of check-mark rows (lucide-style `check` icon on the left, feature label in body ink, some rows carry an underline indicating tooltip-hover-for-detail)
  - A "Save 25%" badge appears on the per-seat tiers to indicate yearly-vs-monthly toggle savings
**States:** `default`. A `YEARLY ●` toggle sits in the top-right of the per-seat tiers, indicating the toggle-on state with a black filled track.

### toggle switch

**Status:** `current`
**Live source:** `https://cal.com/pricing` — the `YEARLY ●` toggle on per-seat tier cards
**Description:** Compact track-and-handle, ~36px wide × 20px tall, when on the track fills near-black `#111` with a white handle right-aligned; when off the track stays transparent / hairline-bordered with the handle left-aligned. Label `YEARLY` (uppercase, 10-12px, Cal Sans) sits to the left of the track.
**States:** `on` observed (filled track). `off` inferred from the visual register.

### check-row (feature list)

**Status:** `current`
**Live source:** `https://cal.com/pricing`, `https://cal.com/enterprise`, repeated as the brand's primary "feature enumeration" surface
**Description:** Single row containing a small filled-circle check icon (~20px, near-black fill with a white check glyph) on the left, label text in body ink to its right. Some labels carry a dotted underline indicating "hover for tooltip"; others don't.
**States:** `default` observed.

### dashboard mockup (Insights)

**Status:** `current`
**Live source:** `https://cal.com/enterprise` — the `Insights dashboard to analyze bookings` feature card mockup
**Description:** A miniature white-on-white app screenshot rendered inside an enterprise feature card. Shows three KPI tiles (`Events created 1888`, `Events completed 1802`, `Events rescheduled 200`) with delta indicators (e.g. `↗ 16.7% from last period` in muted green for positive, with a small arrow glyph). Below the KPIs sits an `Event trends` chart with a Y-axis labelled `100` and an SVG line chart placeholder.
**States:** static mockup; no interactive states.

### dashboard mockup (status / SLA)

**Status:** `current`
**Live source:** `https://cal.com/enterprise` — `99.9% SLA` feature card mockup
**Description:** A status-page-shape panel with the header `⚡ All systems operational` (lightning glyph + label in `#242424` on white card surface). Below sits a list of services (`App`, `Website`, ...) each paired with a horizontal availability bar in `#22c55e`-ish green and a percentage indicator (`99.9%`). The green is the brand's success-tier accent in product mockups.
**States:** `default` (all-green / operational).

### dashboard mockup (security ring)

**Status:** `current`
**Live source:** `https://cal.com/enterprise` — security feature card mockup
**Description:** A radial diagram with concentric ring lines and small user-glyph avatars distributed around the circumference, a `Cal` wordmark badge at the centre, and a small shield-with-checkmark icon at one radial endpoint. Renders as a pictograph for "cross-tenant SAML SSO and identity isolation" — the only non-flat illustrative surface in the enterprise page.
**States:** static.

### customer-logo lockup card

**Status:** `current`
**Live source:** `https://cal.com/customers` — repeated card pattern, one per case study
**Description:** A two-column card holding the `Cal` wordmark on a 4-corner-cropped grid backdrop on the left, the customer logo on the right (e.g. `MANIFEST` in serif caps with a brown card backing for Manifest Law, the duck-glyph wordmark for the marketing-research customer). Beneath the lockup sits a category eyebrow (`Legal Services`, `Marketing & Advertising | Market Research`), a case-study title (`How Manifest Law Scales legal intake without sacrificing control`), a date, and a `Read story ›` link.
**States:** `default`.

### customer-logo strip (trust band)

**Status:** `current`
**Live source:** `https://cal.com/` deep-scroll — `Trusted by fast-growing companies around the world` band
**Description:** Horizontal row of customer logos rendered as flat monochrome wordmarks (`Rho`, `deel.`, `framer`, `Ramp`, `Planet` partial) at 24-32px tall, set in their own typefaces, all reduced to a near-black ink without colour. Each logo padded ~32px from its neighbour. Common B2B SaaS-trust-strip register.
**States:** `default`. May carousel on a wider viewport.

### testimonial card

**Status:** `current`
**Live source:** `https://cal.com/enterprise`, `https://cal.com/customers` — the `Don't just take our word for it` band introduces these
**Description:** A square or wide card with a left-quoted prose block in Cal Sans body weight ("More elegant than Calendly, more open than SavvyCal, Cal.com works and it feels just right.") and a small attribution block at the bottom (name, title, sometimes a small avatar).
**States:** `default` observed.

### testimonial / review-strip badge row

**Status:** `current`
**Live source:** `https://cal.com/enterprise` — Trustpilot + ProductHunt + G2 star-rating band; `https://cal.com/` — Product-of-the-day / week / month laurel badges
**Description:** Horizontal row of third-party trust badges. The first set carries the platform wordmark (`Trustpilot`, `★ ProductHunt`, `G2`) plus a star-rating glyph row. The second set carries laurel-wreath SVG glyphs labelled `Product of the Day 1st`, `Product of the Week 1st`, `Product of the Month 1st`. Star glyphs render in the brand's green-ish trust register; the laurel wreaths render in the platform's own ink.
**States:** static.

### app-store integration grid

**Status:** `current`
**Live source:** `https://cal.com/` deep-scroll — `All your key tools in-sync with your meetings` band
**Description:** 2×N grid of square tile cards on the white card surface, each tile holding a single product logo (Teams, Google Workspace, Zoom, Google Analytics, Calendar JUL 17, Zapier, Salesforce, HubSpot). Tiles are bordered with a hairline `#e0e0e0`, the logo centred and rendered at full brand colour (the only place on the marketing site where third-party brand colours render in their native palettes). Small `+` glyphs sit at the intersections of the grid as decorative connection-marks.
**States:** static (no observable interactive state on the static page).

### feature card with stepped number

**Status:** `current`
**Live source:** `https://cal.com/enterprise`, `https://cal.com/` (the `01 Connect your calendar / 02 Set your availability / 03 Choose how to meet` band)
**Description:** White card with a small `01` / `02` / `03` step number eyebrow rendered in Cal Sans Mono register (small, monospaced-feeling) above a card title (`Connect your calendar`), one-line description in body, and an inline product mockup illustration (e.g. radial-orbit diagram showing Cal.com at the centre with Google Calendar / Outlook icons orbiting; "How long after? Immediately" form mockup; etc.).
**States:** static.

### footer

**Status:** `current`
**Live source:** `https://cal.com/` deep-scroll
**Description:** Full-width footer on the warm-gray canvas (no separate fill — reads continuous with the body). Three columns of link sections (`Resources`, `Company`, plus inferred third column with `Cal.com` lockup). Above the columns sits the `Cal.com` wordmark, a row of compliance badges (ISO 27001, SOC 2, CCPA, GDPR, HIPAA Compliant — each as a circular SVG seal in `#242424` monochrome on the canvas), a mission statement line in body ink, language selector pill, `All Systems Operational ●` status pill (green dot + label), and a `Downloads` section with platform pills (iPhone / Android / Chrome / Safari / Edge / Firefox / MacOS / Windows / Linux — each with a leading platform icon). Below sits the Trustpilot + G2 star-rating proof.
**States:** static.

### "All systems operational" status pill

**Status:** `current`
**Live source:** `https://cal.com/` footer — `All Systems Operational ●` pill near the language selector
**Description:** Small outlined pill (hairline border, transparent fill), label in dark ink, trailing solid green dot (~8px diameter, in the brand's success-tier green).
**States:** `operational` (observed). `degraded` / `down` not observed.

### help-icon / promo banner

**Status:** `current`
**Live source:** `https://app.cal.com/login` bottom — `Add this app to your home screen for faster access and improved experience.`
**Description:** Pinned-to-bottom dark banner pill, shares the canvas darkness register, carries a small share-icon glyph on the left, label text in white body, and a close-X on the right. Lives below the login card without overlap.
**States:** `default` (shown). Dismissed state not captured.

### docs three-pane shell

**Status:** `current`
**Live source:** `https://cal.com/docs`
**Description:** Full dark canvas (`#0f0f0f`), `Cal.com Docs` composite wordmark in the topnav (Cal.com in white, `Docs` glyph attached), search input on the right, hamburger / menu glyph to its right. Below the topnav, a left-rail breadcrumb (`☰ Getting Started › Introduction to API v2`) introduces the page. Page header carries the section label in a muted accent colour, the page title in display Cal Sans, a one-line subtitle in body ink, and a `📋 Copy page` action pill with a trailing chevron split-button. Body content is MDX-shape: numbered list, prose, fenced code blocks (mono in white ink on the same `#0f0f0f` canvas — no separate code-block surface), inline links in the `#5b93f9` blue accent.
**States:** `default` observed. The Copy page split-button suggests `copied` feedback exists but wasn't triggered in this pass.

### error / 404 page

**Status:** `current`
**Live source:** `https://cal.com/why-cal`, `https://cal.com/cal-fonts`, `https://cal.com/<any-unclaimed-slug>`
**Description:** Centred layout on the dark canvas. `ERROR 404` eyebrow (small caps), display title `This page does not exist.`, then a second display line `The username /<slug> is still available.` where the word `available` is set in the brand's accent green (`#6ce0a2`). Below: a green primary CTA pill (`Register now →`) — the green-on-dark variant of the marketing site's near-black CTA. Then a `POPULAR PAGES` eyebrow and a stack of two card-rows (`Documentation` and `Blog`), each with a leading icon, title, subtitle, and trailing chevron. Bottom: a `Or go back home →` text link.
**States:** `default`.

### cal.ai promo phone mockup

**Status:** `current`
**Live source:** `https://cal.com/ai` — the centred phone illustration with `9:41 [signal] [wifi] [battery]` chrome and a `+1 (415) 873-1159 / Cal.ai Agent` calling screen
**Description:** A device-frame illustration rendered as flat shapes on the Cal.ai indigo canvas. Phone bezel in `#1d1c3c`, status-bar glyphs in white. Below the status bar sits the phone number and the `Cal.ai Agent` label (rendered as gradient violet-to-lavender text). Two call-action glyphs (mute, end-call) sit near the bottom. The mockup demonstrates the AI-phone-agent product without showing actual product UI.
**States:** static.

### featured-on badge (cal.ai)

**Status:** `current`
**Live source:** `https://cal.com/ai` — the pinned `▲ FEATURED ON Product Hunt 510` badge in the bottom-right
**Description:** Cal.ai-canvas-coloured small card, ~64px tall, holding the Product Hunt logo on the left and the upvote count (`510`) on the right with the ProductHunt orange-ish accent.
**States:** `default`.

## §5 Surface inventory

- `https://cal.com/` — homepage. Sets the canonical light register: warm-gray canvas, white booking-widget card, near-black CTAs, customer-logo strip, app-store integration grid, step-numbered feature cards, full footer with compliance seals.
- `https://cal.com/pricing` — pricing-tier card pattern, toggle switch (`YEARLY`), check-row feature list, badge pill (`Save 25%`).
- `https://cal.com/enterprise` — feature-card-with-mockup pattern; Insights dashboard mockup, SLA / status-bar mockup, security ring diagram, testimonial card, trust-strip badge row.
- `https://cal.com/customers` — customer-logo lockup card with 4-corner-cropped grid backdrop.
- `https://cal.com/blog` — post-card pattern with photographic cover overlaid by Cal.com title chrome, category tag, author + avatar attribution.
- `https://cal.com/docs` — docs three-pane shell on dark canvas, MDX-shape body, Copy-page split-button.
- `https://cal.com/ai` — Cal.ai sub-brand chrome: indigo canvas, violet primary, gradient violet-to-lavender heading text, phone mockup, FeaturedOn ProductHunt badge.
- `https://cal.com/peer` (→ `https://i.cal.com/peer/meet`) — the in-product booking page on dark canvas. The brand's voltage moment: calendar grid card, time-slot list, dark-gradient hero promo banner above the booking widget.
- `https://app.cal.com/login` — login card with Google + Microsoft SSO, email/password form, install-PWA banner pin.
- `https://cal.com/why-cal` — 404 page with the green "still available" accent and the green CTA pill.

## §6 Notes

- **Three-polarity brand.** Cal.com's marketing is light-canonical. The product / docs / 404 surfaces are dark-canonical. The Cal.ai sub-brand is its own indigo polarity. When authoring the preview, pick one as the canonical shell and use the other two as accent / nested-card moments. The homepage hero is light; the in-product booking-page calendar grid is the dark register's voltage moment.
- **Cal Sans is the identity.** Cal.com ships its own typeface (Cal Sans + Cal Sans UI Variable) — using Inter or any non-proprietary fallback in the preview erases what's distinctive about the brand. The `--font-display` token must declare Cal Sans first even if the proprietary file won't load; the local fallback chain still resolves visually.
- **Brand colour is monochrome.** Cal.com's "primary" is not a chromatic hue. It's near-black on warm-near-white in light mode, white on near-black in dark mode. The chromatic accents (404 green `#6ce0a2`, register blue `#5b93f9`, Cal.ai violet `#6349ea`) are state / context modifiers, not primary identity. Translation rule: `--primary` is the canvas-inverse ink; the chromatic tokens belong to the `--brand-accent-*` family.
- **The booking calendar grid IS the brand's voltage moment.** Don't reach for the homepage hero typography as the signature surface; the calendar grid on the booking page (`/<handle>/<event>`) is the visual that defines Cal.com against Calendly / SavvyCal. It deserves a dedicated treatment in §4 and in the preview-template signature mockup.
- **Polarity locks.** The Cal.ai indigo canvas (`#0d0c27` family) and its violet primary `#6349ea` are sub-brand identity surfaces. They should not theme-flip in the preview; if Cal.ai content appears, it stays on the indigo chrome regardless of `data-theme`.
- **Accepted sub-AA on customer-logo strip and compliance seals.** The customer-logo strip and footer compliance seals render in monochrome at low contrast against the canvas. This is by-design — the live site ships them that way. Don't promote them to higher-contrast ink in the preview.
- **No model names, no real customer names.** When authoring Halcyon's-team-using-Cal mockups: do not name real Cal.com customers (Rho, Deel, Framer, Ramp, PlanetScale, Manifest Law) and do not reuse real Cal.com employees' display names (Peer Richelsen, Cédric van Ravesteijn) as booking-widget owners. Use the catalog's invented persona pool.
- **Cal.com vs Cal.ai wordmark distinction.** The marketing site brands as `Cal.com` with a dot. The AI sub-brand uses `Cal.ai`. Don't mix the two; the wordmark choice carries product-line meaning.

## §Known gaps

- **Hover / focus / press states** were not captured in this pass. The marketing CTA pill carries an inset highlight shadow in its default state (`rgba(255, 255, 255, 0.15) 0px 2px 0px 0px inset`); presumed pressed / hover variants would deepen this. The booking-page time-slot list rows likely fill on hover. Sample with `mcp__chrome-devtools__emulate hover` if available.
- **Mobile viewport only.** All screenshots were captured at 606px width — the page rendered its mobile layout. Desktop chrome (top-nav with full link row, multi-column pricing layout, side-rail in docs) is inferred from the brand register but not directly observed in this pass. Run a parallel pass at 1280px+ to confirm.
- **Authenticated product surfaces.** `app.cal.com/event-types`, `app.cal.com/availability`, `app.cal.com/bookings`, `app.cal.com/insights`, `app.cal.com/apps` are SSO-gated. The product chrome in the marketing-page mockups (Insights dashboard, SLA panel, security ring) is the only window we have into them. A logged-in pass through the product app would document settings forms, table chrome, and the real Insights surface.
- **Email / transactional surfaces.** Cal.com sends reminder / confirmation / cancellation emails. Their visual register isn't documented here.
- **Cal Sans variable axis exposure.** Computed styles list `Cal Sans Light`, `Cal Sans UI Variable Light`, `Cal Sans UI Regular` as distinct font families. Whether these are pinned weight cuts of a single variable typeface or separate static files isn't determinable from outside the asset pipeline; treat as "Cal Sans family with multiple weights."
- **Customer-logo strip carouselling.** The trust strip lists 5 logos statically on mobile; whether it carousels through the broader customer list on desktop wasn't captured.
- **`cal.com/cal-fonts` and `cal.com/why-cal` route to 404.** Cal Sans is mentioned in the footer (`Cal Fonts` link in `Resources`) but the linked landing page is 404. Cal.com may have removed the fonts-as-product page since the link was added.
