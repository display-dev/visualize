---
slug: bugatti-style
name: Bugatti
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://newsroom.bugatti.com/
  - https://newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css
  - https://newsroom.bugatti.com/_next/static/css/a3be4ed2502448e8.css
  - https://newsroom.bugatti.com/models/tourbillion-en
  - https://newsroom.bugatti.com/press-releases/mastering-the-cold-testing-the-tourbillon-sweden
  - https://web.archive.org/web/20240213062747/https://www.bugatti.com/
canonical-canvas: both
selection:
  mood: [brand-system, luxury]
  tone: [dramatic, bold]
  formality: medium
  density: low
  canonical_canvas: both
  best_for: |
    Use for high-impact, low-copy artifacts that need a dramatic, bold register with brand-system, luxury visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Bugatti

## §1 Canonical canvas

Bugatti runs a mixed-polarity system. The consumer-facing `bugatti.com` (current production is fortressed behind a Vercel Security Checkpoint that blocked direct fetches this cycle; the most recent reachable snapshot is the Wayback capture of `20240213062747`) operates **dark-canonical** — `#101010` off-black behind cinematic photography and product video, with the Cartouche and CTAs reversed out in white. The newsroom subdomain operates **light-canonical** — `theme-color="#FFFFFF"` in `<head>`, white canvas behind editorial photography and press content. The two surfaces share an identical five-token palette, three custom typefaces, and one CTA shape; only the canvas polarity flips. Treat the brand as both-canvas and lock chromatic identity (`#004bfa` Bugatti Blue, the only chromatic token) across both modes.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home (archive) | `web.archive.org/web/20240213062747/https://www.bugatti.com/` | `#101010` off-black + `#000` lightbox chrome | Cinematic, photographic, dark-canonical; `theme-color="#ffffff"` is declared but rendered chrome reads as off-black behind fullscreen hero. Wayback snapshot reached because live site sits behind a Vercel Security Checkpoint. |
| Press newsroom | `newsroom.bugatti.com/` | `#FFFFFF` white | Editorial press hub; `theme-color="#FFFFFF"`, white body class `sh1b8i1` resolves to default canvas. Photography-led story cards on white. |
| Model index — Tourbillon | `newsroom.bugatti.com/models/tourbillion-en` | `#FFFFFF` white | Aggregated press releases / images / videos tabs for a single model; same canvas as newsroom home. |
| Press release detail | `newsroom.bugatti.com/press-releases/mastering-the-cold-testing-the-tourbillon-sweden` | `#FFFFFF` white | Long-form editorial; horizontal-rule dividers between sections, contained (not full-bleed) inline images with captions. |

## §2 Palette

Both surfaces resolve color through a single five-slot brand palette block, observed in the newsroom Next.js stylesheet at `_next/static/css/3dff4f6cfe395803.css` (DOM selector: `.hbxiq01`, `.hbxiq04`, `.hbxiq07`, `.hbxiq0a`, `.hbxiq0d`, `.hbxiq0g` background-token classes, plus the corresponding `:hover` and color/border variants). Internally the slots map to `--_1h2qup81..86`:

| Slot | Hex | Role | Newsroom usage |
|---|---|---|---|
| `81` | `#FFFFFF` | white canvas / on-dark ink | `body` background (light canvas), text on blue CTA, white ticker fade |
| `82` | `#E1E1E1` | light divider / soft fill | hairlines between cards, secondary chip backgrounds |
| `83` | `#3F3F3F` | charcoal body ink | body text on white, footer ink |
| `84` | `#000000` | true-black canvas / on-light ink | strong headlines on white; canvas when surface inverts (article-card hover, marquee fade) |
| `85` | `#004bfa` | Bugatti Blue — the only chromatic | CTA fill, link colour, focus indicator, gradient seed, brand voltage |
| `86` | `transparent` | structural null | layered backdrops, hover-fade defaults |

Round-trip OKLCH↔hex conversions below were verified through `visualize/scripts/vendor/culori.mjs` — every chromatic value re-encodes to the source hex without drift.

### Brand primary

- `--primary`: `oklch(0.5119 0.2643 263.2278)` (= `#004bfa`). Live: `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — rule `{background:var(--_1h2qup85)}` paired with `{color:var(--_1h2qup81)}` on CTA elements; also `meta[name="msapplication-TileColor"] content="#004bfa"` in the newsroom HTML head.
- `--brand-primary`: `oklch(0.5119 0.2643 263.2278)` (= `#004bfa`). Same observation; the Bugatti palette runs the blue at exactly one lightness, no shade ladder.

### Documented secondary brand colours

None. The brand palette ships a single chromatic identity. There are no accent reds, no Cartouche-derived crimsons, no heritage-yellows surfaced in the live CSS — the Cartouche logo renders as a flat SVG asset and its red/white motif is never exposed as a CSS token. Every non-chromatic role pulls from the four neutrals (white, light-gray, charcoal, black).

### Canvas + neutrals

- `--background`: `oklch(1 0 0)` (= `#FFFFFF`) in light mode; `oklch(0.1730 0 0)` (= `#101010`) in dark mode. Live: newsroom `theme-color="#FFFFFF"` meta + `body.sh1b8i1` resolving to default white; dark-mode value cited from the Wayback `bugatti.com` capture where the page chrome resolves to `#101010` behind the `vbox` lightbox chrome (`--vbox-share-background:#101010`, `--vbox-title-background:#101010`).
- `--foreground`: `oklch(0 0 0)` (= `#000000`) in light mode; `oklch(1 0 0)` (= `#FFFFFF`) in dark mode. Live: `.hbxiq0s:hover{color:var(--_1h2qup84)}` and `.hbxiq0j:hover{color:var(--_1h2qup81)}` confirm both polarities are first-class.
- `--card`: `oklch(1 0 0)` (= `#FFFFFF`) light / `oklch(0.1913 0 0)` (= `#141414`) dark — light value direct, dark value synthesised by stepping `#101010` up one elevation tier (no live dark-card observation captured this cycle).
- `--card-foreground`: matches `--foreground`. (synthesised — no separate live observation).
- `--popover`, `--popover-foreground`: mirror `--card`, `--card-foreground`. (synthesised).
- `--muted`: `oklch(0.9097 0 0)` (= `#E1E1E1`) light / `oklch(0.1591 0 0)` (= `#0d0d0d`) dark. Light value live at `.hbxiq04{background:var(--_1h2qup82)}`; dark value synthesised.
- `--muted-foreground`: `oklch(0.65 0 0)` (= `#8f8f8f`) — lifted from a direct observation of charcoal `#3F3F3F` (`oklch(0.3677 0 0)`) onto neutral muted-label tone. Note: this is the one position in the token set where the live charcoal body ink (`#3F3F3F`) doesn't survive when reduced to "muted label" role — Bugatti's austere palette has no documented mid-gray, so the slot synthesises a mid-tone the brand never explicitly ships. Live charcoal observation: `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — `.hbxiq0p:hover{color:var(--_1h2qup83)}`.
- `--accent`: `oklch(0.5119 0.2643 263.2278)` (= `#004bfa`). Live: `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — `.hbxiq0d{background:var(--_1h2qup85)}`. The single chromatic token doubles as both `--primary` and `--accent`; the brand has no second accent voltage.
- `--accent-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). Live: `{color:var(--_1h2qup81);background:var(--_1h2qup85)}` paired rule.
- `--secondary`: `oklch(0.9097 0 0)` (= `#E1E1E1`) light / `oklch(0.1591 0 0)` (= `#0d0d0d`) dark. Same source as `--muted`; the Bugatti system uses `#E1E1E1` for both secondary fills and dividers — slot doubles up.
- `--secondary-foreground`: matches `--foreground`. (synthesised — no live `secondary-foreground` observation).
- `--destructive`: `oklch(0.5308 0.2178 29.2339)` (= `#cc0000`). (synthesised). Bugatti's live CSS includes no documented destructive register — press / model pages have no destructive surfaces. Retain a synthesised value for shadcn slot completeness.
- `--destructive-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). (synthesised).
- `--border`: `oklch(0.9097 0 0)` (= `#E1E1E1`) light / `oklch(0.2686 0 0)` (= `#262626`) dark. Light value live: same `.hbxiq014:hover{border-color:var(--_1h2qup82)}`. Dark value synthesised.
- `--input`: matches `--border`. (synthesised; no observed input chrome rules ship a distinct value).
- `--ring`: `oklch(0.5119 0.2643 263.2278)` (= `#004bfa`). Live: focus state on CTAs uses Bugatti Blue as the visible voltage (`html:not([data-headlessui-focus-visible]) :focus{outline:none}` suppresses default but `:focus-visible` resolves the blue ring per headless-ui convention).

### Polarity-locked surfaces

Tokens whose surface role does not flip with the theme. Bugatti's blue is one of these — the live system keeps `#004bfa` at the same OKLCH on both white and `#101010` canvases.

- `--brand-blue`: `oklch(0.5119 0.2643 263.2278)` (= `#004bfa`). Live: identical hex in newsroom (white canvas) and Wayback bugatti.com archive (dark canvas) — polarity-locked.
- `--brand-canvas-night`: `oklch(0.1730 0 0)` (= `#101010`). Live: `web.archive.org/web/20240213062747/https://www.bugatti.com/` — referenced via the embedded `--vbox-share-background:#101010` token in `animated.min.css`.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#FFFFFF`). Live: `.hbxiq0j:hover{color:var(--_1h2qup81)}` overlaid on dark photography.
- `--brand-on-light`: `oklch(0 0 0)` (= `#000000`). Live: default body headings on newsroom white canvas (`.hbxiq01k` display-family rule + default `color: #000`).

### Hairlines / dividers

- `--brand-hairline`: `oklch(0.9097 0 0)` (= `#E1E1E1`). Live: `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — `.hbxiq014:hover{border-color:var(--_1h2qup82)}` and tab-strip borders at `.uv51ow7{gap:.0625rem;border-bottom-width:.0625rem}` (the `.0625rem = 1px` hairline weight is universal).
- `--brand-hairline-strong`: `oklch(0.3677 0 0)` (= `#3F3F3F`). Live: charcoal-on-white dividers between footer link blocks observed in press-release detail pages; same hex as `--brand-charcoal`.

### Drift vs `tokens.css`

Current `tokens.css` still treats Bugatti as pure dark-canonical with no light surface. Live observation contradicts this. Reconciliation suggestions:

| Token | tokens.css current | Live observation | Suggestion |
|---|---|---|---|
| `--background` (`:root`) | `oklch(0 0 0)` pure black | `oklch(1 0 0)` white on newsroom; `oklch(0.1730 0 0)` `#101010` on archived bugatti.com main | Flip `:root` to white (light-canonical). Move `#101010` into a new `--brand-canvas-night` token for the dark surface. Override `[data-theme="dark"]` to push the off-black via `--background`. |
| `--card` (`:root`) | `oklch(0.1913 0 0)` (= `#141414`) | `oklch(1 0 0)` `#FFFFFF` on newsroom | Flip to white in light mode; retain the off-black value as the dark-mode card. |
| `--primary` (`:root`) | `oklch(1 0 0)` white | `oklch(0.5119 0.2643 263.2278)` `#004bfa` Bugatti Blue | Replace white with Bugatti Blue. The blue is the brand voltage; the catalog import collapsed it into white because Bugatti's CTA chrome on dark uses white labels, but the actual primary fill is blue (CTAs on white) and the **token** should encode brand identity, not one polarity's text colour. |
| `--accent` (`:root`) | `oklch(0 0 0)` pure black | `oklch(0.5119 0.2643 263.2278)` `#004bfa` | Replace black with Bugatti Blue. Same fix as `--primary`. |
| `--ring` (`:root`) | `oklch(1 0 0)` white | `oklch(0.5119 0.2643 263.2278)` `#004bfa` | Replace with Bugatti Blue. Focus ring chrome on the live newsroom resolves to the brand blue. |
| `--brand-link` | `oklch(0.8772 0.0431 252.6617)` (synthesised pale-blue tint) | `oklch(0.5119 0.2643 263.2278)` Bugatti Blue | Replace with the canonical blue. The catalog import invented a pale tinted-blue that has no live-CSS authority. |
| `--brand-muted-soft` | `oklch(0.65 0 0)` (= `#8f8f8f`, AA-lifted) | No direct equivalent | The brand carries no documented mid-gray; the AA-lift is justified for body-muted contrast on either canvas. The header comment in `tokens.css` correctly notes this is a synthesised value — keep, but document that it's not a brand-identity token. |
| `--brand-warning`, `--brand-success` | synthesised amber + green | Not observed | Bugatti's live CSS has no semantic warning/success palette. The synthesised tokens have no brand authority and can stay only as shadcn slot completeness; mark them `(synthesised)` if surfaced. |
| `[data-theme="dark"]` block | Mirrors `:root` verbatim (current header comment justifies dark-canonical) | Live: dark canvas is `#101010` off-black, not pure `#000`; `--primary` is `#004bfa` not white | Rewrite the dark block to use `#101010` canvas + Bugatti Blue primary. The current verbatim-mirror only matches the imported catalog state, not live brand. |

The drift is structural — every recommendation routes back to the same root cause: the upstream catalog framed Bugatti as a monochrome dark identity, which lost the brand's single chromatic voltage. The fix is to centre the palette on Bugatti Blue and let canvas polarity flip independently.

## §3 Typography

The brand ships three custom typefaces (proprietary, served as `woff2` from `/_next/static/media/` on the newsroom). All three are declared with fallback stacks of the form `"<NAME>", "<NAME> Fallback"`, and the live system never falls through to a system stack on weighted text.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | `BUGATTI_Display`, `BUGATTI_Display Fallback` | 400 | 64–128px headline; 20px ticker | 1.1 (headline) / 1.3 (small display) | uppercase, no extra tracking on large; `0.1em` on small uppercase |
| Heading | `BUGATTI_Display`, `BUGATTI_Display Fallback` | 400 | 20–48px | 1.3 | uppercase typical for section eyebrows |
| Title | `BUGATTI_Display`, `BUGATTI_Display Fallback` | 400 | 20–32px | 1.3 | uppercase common; observed at `.hbxiq01n{text-transform:uppercase}` + display-family pairing |
| Body | `BUGATTI_Text`, `BUGATTI_Text Fallback` | 400 | 14–16px | 1.5 (inferred default `<p>` rendering) | normal, observed `letter-spacing:.015625rem` (~0.25px) on dense small text |
| Caption | `BUGATTI_Text`, `BUGATTI_Text Fallback` | 400 | 12–14px | 1.5 | normal; press-release captions ship at body-tone |
| Eyebrow / CTA / metadata | `BUGATTI_Monospace`, `BUGATTI_Monospace Fallback` | 400 | 12px | 1.0 (`1em`) | uppercase, `letter-spacing:.1em` — the brand signature voltage on labels |

Observed bindings from `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css`:

- `.hbxiq01i{font-family:var(--bugatti-text)}` — body default
- `.hbxiq01j{font-family:var(--bugatti-monospace)}` — eyebrow / CTA chrome
- `.hbxiq01k{font-family:var(--bugatti-display)}` — display headlines
- CTA prototype rule: `{font-family:var(--bugatti-monospace);font-size:12px;letter-spacing:.1em;line-height:1em;text-transform:uppercase;font-weight:400;width:180px;height:auto;padding:12px;border-radius:0;border-width:1px;border-style:solid;outline:none}`
- Display heading prototype: `{font-family:var(--bugatti-display);font-weight:400;text-transform:uppercase;font-size:20px;line-height:1.3}`

The 400 weight runs across the whole system. A `.hbxiq01m{font-weight:700}` utility exists for occasional emphasis but the body / display / monospace stacks all default to regular. The brand's mono-weight discipline is itself a register — no bold display, no light-weight serif fallback.

Variable axes are not in use. The proprietary fonts ship as discrete weights (regular only in the live preview) without `font-variation-settings`. The previously-imported `tokens.css` token name `Bugatti Text Regular` matches the legacy `bugatti.com` archive naming; the newer newsroom uses underscore-separated `BUGATTI_Text` — both refer to the same family.

## §4 Component vocabulary

Twenty-three distinct components observed across the sampled surfaces. The brand has fewer abstract UI primitives than a B2B SaaS catalogue because the consumer surface is editorial / photographic and the newsroom is press-list / press-detail.

### Top-nav bar (newsroom)

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — body header region, classes `hbxiq01q hbxiq01v hbxiq01t hbxiq01u` (fixed top, full-width)
**Description:** Sticky top bar at viewport top, white fill on light canvas with a `0.0625rem` (1px) bottom hairline at `#E1E1E1`. Houses the Bugatti wordmark / Cartouche on the left and a minimal three-item set on the right (newsletter subscribe link, hamburger toggle, locale switch). Wordmark is rendered in `BUGATTI_Display` uppercase at heading scale. Right-side links use `BUGATTI_Monospace` 12px uppercase `0.1em` tracking.
**States:** `default` — white background, charcoal `#3F3F3F` ink; `hover` — link colour flips to Bugatti Blue `#004bfa` via `.hbxiq0v:hover{color:var(--_1h2qup85)}`.

### Bugatti Cartouche / macaron logo

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — `/favicon.ico`, `/apple-touch-icon.png`, `/safari-pinned-tab.svg` (the rendered chrome wordmark is a separate SVG asset in the topnav)
**Description:** The horseshoe-shaped (oval-narrow) macaron carrying the red border ring with sixty raised dots, white interior, and a small inset "EB" monogram. The "BUGATTI" wordmark is rendered separately from the macaron in `BUGATTI_Display` uppercase. The macaron is never recoloured through CSS tokens — it ships as a flat SVG; the only chromatic token in the brand system is the blue, never the macaron red.
**States:** `default` only. The Cartouche is a logo asset and does not expose hover / pressed states.

### Hamburger menu toggle

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — `aria-label="Open the Nav Menu"` in the top-right of the header
**Description:** Three horizontal hairline strokes at the brand hairline weight (1px), monochrome (charcoal on light canvas). The close-state variant uses two crossed 1px lines forming an X at 45°, observed at `{content:" ";width:29px;height:29px;background-image:linear-gradient(#222,#222),linear-gradient(#222,#222);background-size:100% 1px,1px 100%;transform:rotate(45deg)}`.
**States:** `default` — open hamburger; `active` — rotated X close glyph.

### Primary CTA button

**Status:** `current`
**Live source:** `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — base class `.x2tbhb1`
**Description:** Rectangular, **no border-radius** (`border-radius:0`), 180px fixed width, 12px monospace uppercase label, `0.1em` letter-spacing, 12px padding all sides, 1px solid border, height resolves to `max-content`. The variant on a primary action carries Bugatti Blue fill (`background-color:#004bfa; border-color:#004bfa; color:#FFFFFF`) — observed verbatim on the Usercentrics cookie-consent "Accept" button at `.uc-embedding-accept`, which inherits the brand's button spec.
**States:** `default` (blue fill, white text, blue border); `hover` (transition over 0.1s on `background, color, border-color, padding` properties — animates fill toward black or border colour change observed on `.hbxiq0d:hover{background:var(--_1h2qup85)}` variants); `loading` (`{pointer-events:none;cursor:wait}` at `.x2tbhbh`); `disabled` (`{opacity:.5; -webkit-user-select:none; pointer-events:none; cursor:not-allowed}` at `.x2tbhby`).

### Secondary CTA button (outlined)

**Status:** `current`
**Live source:** `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — same base `.x2tbhb1` + `{color:#000000; background-color:transparent; border-color:#000000}` variant observed on `.uc-embedding-more-info`
**Description:** Same dimensions and type spec as the primary, but transparent fill with charcoal `#000` or `#3F3F3F` border + matching ink. Border collapses to `currentColor` via `._1fapkmq6{border-color:currentColor}`.
**States:** `default`; `hover` — fills with the brand blue or charcoal depending on context (via the universal `.hbxiq0d:hover` / `.hbxiq07:hover` background-token utilities).

### Inline read-article link

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — story cards, label `Read article ↗`
**Description:** Inline text label rendered in `BUGATTI_Monospace` 12px uppercase `0.1em` tracking, followed by a small `↗` arrow glyph. Charcoal `#3F3F3F` default ink, no underline at rest. The arrow tilts and scales `+10%` on hover via the parent card's scale-transform: `.fz6fqj5{transition-property:transform}` paired with `.fz6fqj1:focus .fz6fqj5,.fz6fqj1:hover .fz6fqj5{transform:scale(1.1)}`.
**States:** `default`; `hover` (arrow scales 110%); `focus` (same scale + focus ring).

### Press-release card (image-led)

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — story grid, classes derived from `._1fz63cr` prefix
**Description:** Vertical card with a 4:3 or 16:9 image on top, metadata block (date + category) below in `BUGATTI_Monospace` 12px uppercase, then a multi-line headline in `BUGATTI_Display` clamped to 3 lines via `-webkit-line-clamp:3`. White card surface on the light canvas, no shadow, no border between cards — relies on inter-card whitespace for separation. Inner padding ladder at `padding:.75rem` for tablet and `padding-left:.625rem` for compact.
**States:** `default` (image at natural saturation, headline at charcoal); `hover` (`transform:scale(1.1)` on the inner image element via `._1fz63cr4:hover ._1bit0r28{transform:scale(1.1)}`, and the read-article CTA fade-in via `.translateY(0); opacity:1` from a `translateY(100%); opacity:0` rest).

### Press-release card (compact)

**Status:** `current`
**Live source:** `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — class `._12x6osa3`
**Description:** Smaller variant of the press-release card used in cross-referenced "Read more" sections at the bottom of detail pages. Padding drops to `1rem`, headline scales fluidly through `2.125rem` → `2.5rem` → `4rem` across breakpoints (`@media (min-width:1024px)`). Same hover scale on the inner image.
**States:** `default`; `hover` (image transform `scale(1.1)`).

### Story image with shaped corners

**Status:** `current`
**Live source:** `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — class `.fz6fqj` family
**Description:** Inline image inside a story card. Cards opt into a `border-radius:.125rem` (2px) or fully square `border-radius:0` depending on context — sharp corners dominate, occasional 2px chamfer on overlay chrome. Image overlays use absolute-positioned captions inset 0.625rem from each side with `-webkit-line-clamp:1` ellipsis. Backdrop overlay opacity `0.4` at z-index `-1`.
**States:** `default` (full image); `hover` (caption fades / image scales — same 110% transform as the card).

### Marquee ticker

**Status:** `current`
**Live source:** `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — classes `.rig4zy` family
**Description:** Horizontal infinite-scroll text strip rendered in uppercase `BUGATTI_Display` weight 400, translated via `@keyframes rig4zy7` from `translateX(0)` to `translateX(calc((100% + var(--rig4zy4)) * -1))` over `5s linear infinite`. The fade-out at both edges uses `linear-gradient(90deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0))` as a sibling overlay — a polarity-locked white-fade signature that should flip in dark mode.
**States:** `default` (continuous linear scroll). No paused state observed.

### Section dividing hairline

**Status:** `current`
**Live source:** Press-release detail body — `.uv51ow7{border-bottom-width:.0625rem}`
**Description:** Single 1px (`.0625rem`) horizontal rule rendered at the brand hairline colour `#E1E1E1` on light canvas. Used between major article sections and between sticky tab strips and content.
**States:** `default`.

### Sticky tab strip

**Status:** `current`
**Live source:** `newsroom.bugatti.com/models/tourbillion-en` — tab classes `.uv51ow1`
**Description:** Sticky-positioned tab row (sticky at `top:0` once `min-width:1280px`) used on model pages to switch between Press releases / Images / Videos sections. Tabs are inline text labels with a hairline underline indicator on the active tab; counts (`[32]`, `[283]`, `[19]`) follow each label inside square brackets. Inner padding `.uv51ow8{padding-left:1rem;padding-right:1rem}` + `.uv51ow9{padding-top:1rem;padding-bottom:1rem}`.
**States:** `default`; `active` (bottom hairline at full ink); `disabled` (`.uv51owe{cursor:default}`).

### Topic / category chip

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — small inline metadata above each story headline
**Description:** Small inline chip-like label rendered in `BUGATTI_Monospace` 12px uppercase. No background fill, no border — the chip is effectively a typographic motif more than a pill component. Date follows in same monospace at the same size, separated by a vertical hairline divider at `1px height:100% background:var(--_1h2qup84) opacity:.4`.
**States:** `default`.

### Image caption

**Status:** `current`
**Live source:** Press-release detail body — captions accompanying each inline image
**Description:** Rendered in `BUGATTI_Text` at body size, sits flush-left under the image. No italic, no smaller scale than body text — captions use the same body register and rely on position + neighbouring image to read as caption. Press-release page captions observed at neutral charcoal ink.
**States:** `default`.

### Pull quote

**Status:** `current`
**Live source:** `newsroom.bugatti.com/press-releases/mastering-the-cold-testing-the-tourbillon-sweden` — quotes from Miroslav Zrnčević
**Description:** Distinct from body paragraphs, indented from the left margin, with the speaker's name in `<h4>` weight above the quote and the quote body in `BUGATTI_Text`. No quotation-mark glyph treatment, no italic — the indent + the h4 byline carry the differentiation.
**States:** `default`.

### Definition-list (specs table)

**Status:** `current`
**Live source:** `newsroom.bugatti.com/models/tourbillion-en` — fuel-consumption + WLTP block
**Description:** WLTP fuel-consumption data rendered as a definition list (`<dl>`-shaped, model name as `<dt>` header followed by `<dd>` rows for low / mid / high / extra-high / combined phases). Each model header is followed by a downloadable PDF link in inline text. No table chrome — purely typographic with hairline separators between models.
**States:** `default`.

### Newsletter subscribe link / inline form

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — "Subscribe to newsletter" link in the topnav, also surfaced inline at the press-release foot
**Description:** Inline text link in `BUGATTI_Monospace` 12px uppercase `0.1em` tracking, rendered in charcoal. No standalone newsletter form modal observed in the sampled surfaces — the link routes to a dedicated route. The inline subscribe block, where present, follows the `_1mzo3aq0{padding:80px 2vw 0;width:100%;display:flex;align-items:center;text-align:center;flex-direction:column;gap:2em}` shape — centred column with 80px top padding and 2em gap.
**States:** `default`; `hover` (text colour flips to Bugatti Blue per universal hover utility).

### Stats / metrics counter

**Status:** `current`
**Live source:** Press-release detail body — counts surfaced inline (e.g., "1 / 9 Stories")
**Description:** Position-counter rendered in `BUGATTI_Monospace` 12px with a slash separator between current and total. No background fill, no border. The class `._6rsucyf{gap:.125rem;font-size:.75rem;line-height:.625rem;text-align:left;margin-top:.5rem}` gives the rendered shape.
**States:** `default`.

### Hero panel (full-bleed)

**Status:** `current`
**Live source:** Wayback `bugatti.com/` archive + `newsroom.bugatti.com/` ticker section — class `._6rsucy1`
**Description:** Full-width panel `padding-inline:2rem; padding-block:7rem`, centred column layout (`justify-content:center; align-items:center; display:flex; flex-direction:column; text-align:center`). Variants for height: `._6rsucy2{min-height:50vh}` half-viewport and `._6rsucy4{min-height:100vh}` full-viewport. The full-bleed image slot sits at `position:absolute; inset:0; z-index:-2`; a 60%-opacity black overlay (`._6rsucy9{...background:black; opacity:.6}`) sits at z-index above the image for legibility of the centred title block. Aspect ratio for the inset photo slot is `9/16` (vertical) at `max-width:18rem`.
**States:** `default` (image visible at full saturation behind 60% overlay).

### Topnav share / social row (footer)

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — footer block
**Description:** Horizontal row of five outline social icons (LinkedIn, Instagram, X, YouTube, Facebook) rendered in monochrome (charcoal on light canvas, white on dark). 1.75rem icon size (`._1fz63crd{width:1.75rem}`). Padding around each icon `0.75rem`. No fill, no rounded background — clean outline glyphs.
**States:** `default`; `hover` (icon scales `transform:scale(1.1)` via `._1fz63cr4:hover ._1fz63cra{transform:scale(1.1)}`).

### Footer link block

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — bottom of every page
**Description:** Multi-column footer carrying social-row, locale selector (English / Français / Deutsch — `/en`, `/fr`, `/de`), and legal links (Contact, Legal Notice, Terms of use, Privacy Policy, Cookie Policy). Rendered in `BUGATTI_Monospace` 12px uppercase `0.1em` tracking. Locale switcher is plain inline text, no flag glyphs, no language code badges.
**States:** `default`; `hover` (text colour flips to Bugatti Blue).

### Carousel navigation indicator

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — story carousel — class `._1sufcrq6`
**Description:** Pagination bar rendered as a `15.5rem` × `0.25rem` (248px × 4px) thin rule with a moving fill indicating progress. Sits below the carousel, centred. Margin-top `2rem` mobile / `4rem` tablet.
**States:** `default` (full position track); `progress` (fill animates from 0 → carousel-position).

### Page intro / centred title block

**Status:** `current`
**Live source:** `newsroom.bugatti.com/` — class `._1mzo3aq2`
**Description:** Centred title block: column flex with `gap:.5em`, `max-width:45ch` for the body line under the title, `margin-bottom:2em` rule at the bottom. The 45-character max-width is an editorial-reading constraint, not a brand-token width. Combined with `_1mzo3aq0`'s `padding:80px 2vw 0` it gives the brand its centred-block opening shape.
**States:** `default`.

### Search / inline cookie consent embed

**Status:** `current`
**Live source:** `newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — `.uc-embedding-*` classes (Usercentrics third-party)
**Description:** Cookie-consent embeds adopt the Bugatti CTA spec verbatim — `.uc-embedding-accept{background-color:#004bfa; border-color:#004bfa; color:#FFFFFF}` and `.uc-embedding-more-info{color:#000000; background-color:transparent; border-color:#000000}`. Notable as the most concrete documented binding of the brand's blue-on-white primary action and black-outline secondary action.
**States:** `default`; `hover` (colour transitions over `.1s`).

## §5 Surface inventory

- `https://newsroom.bugatti.com/` — primary editorial hub (light-canonical). Anchors topnav, hamburger, ticker, story-card grid, footer, marquee, social row, page-intro title block, hero panel, primary CTA chrome via Usercentrics embed.
- `https://newsroom.bugatti.com/_next/static/css/3dff4f6cfe395803.css` — Next.js compiled stylesheet for the newsroom. Anchors the complete `--_1h2qup8x` palette token block, all `.hbxiq0*` palette utility classes, the `.x2tbhb1` button base, the `.uv51ow` tab-strip and `._1fz63cr` press-release-card families, and the marquee `@keyframes rig4zy7`.
- `https://newsroom.bugatti.com/_next/static/css/a3be4ed2502448e8.css` — secondary newsroom stylesheet covering the `_6rsucy` hero / panel rules and intro-block layout (`_1mzo3aq0..2`).
- `https://newsroom.bugatti.com/models/tourbillion-en` — model-aggregated press-release surface. Anchors sticky tab strip, count-bracketed tab labels, definition-list WLTP specs block, related-press grid.
- `https://newsroom.bugatti.com/press-releases/mastering-the-cold-testing-the-tourbillon-sweden` — press-release detail (long-form editorial). Anchors article header / byline, pull-quote spec, inline image + caption, section hairline divider, related-stories "Read more" block.
- `https://web.archive.org/web/20240213062747/https://www.bugatti.com/` — historic snapshot of the consumer marketing home reached via Wayback because the current production sits behind a Vercel Security Checkpoint. Anchors the off-black `#101010` dark canvas, the `--vbox-*` lightbox chrome, the legacy "Bugatti Display Regular" / "Bugatti Text Regular" / "Bugatti Monospace Regular" naming that maps to the newer `BUGATTI_Display` / `BUGATTI_Text` / `BUGATTI_Monospace` family.

## §6 Notes

- **Mixed-polarity brand.** The main marketing site and the press newsroom run opposite canvases with an identical chromatic identity. Both polarities are first-class — don't synthesise a dark variant by inverting the light tokens; the dark surface is its own observed system at `#101010` off-black, not pure `#000`.
- **One chromatic.** Bugatti Blue `#004bfa` is the entire chromatic identity. There is no documented racing yellow, no Cartouche red exposed as CSS, no secondary brand colour. The macaron's red ring is decorative SVG, never a token — do not derive a `--brand-red` from the macaron and surface it as a brand colour.
- **Polarity-locked blue.** `#004bfa` runs at identical OKLCH on both white and `#101010` canvases. Do not lift or darken it for the dark variant; do not introduce `--brand-blue-on-dark`. The brand never carries a second blue lightness.
- **Sharp corners.** Buttons, chips, cards all run `border-radius:0` or `0.125rem` (2px) maximum. A 999px pill exists in the radius scale (`._1fz63crr{border-radius:999px}` on a single hover-revealed inner CTA) but is the exception, not the norm. Cards are square-corner by default. A re-skin that defaults to rounded corners reads as wrong-brand immediately.
- **Mono uppercase voltage.** `BUGATTI_Monospace 12px uppercase 0.1em` is the brand's signature label register. Every CTA, footer link, breadcrumb, byline, date, and count label uses this combination. Substituting a sans-serif at the same point size loses the brand entirely.
- **Hairline weight is 1px.** Borders, dividers, and outlines all resolve to `0.0625rem = 1px`. Bugatti never ships a thick rule. A 2px border on any chrome element reads as wrong-brand.
- **Marquee fade is polarity-locked white.** The ticker overlay uses `linear-gradient(90deg, rgba(255,255,255,0), #FFFFFF, rgba(255,255,255,0))` literally — the fade hard-codes white. On a dark variant the gradient stop must flip to `#101010` (the documented dark canvas), otherwise the marquee shows two cream stripes flanking the text.
- **No accent palette beyond blue.** The synthesised `--brand-warning` and `--brand-success` tokens in the imported `tokens.css` have no brand-doc authority. Bugatti's editorial surfaces have no documented success / warning / error register — the marketing surface has no destructive actions, the press surface has no form-validation chrome surfaced in the CSS. Mark these as `(synthesised)` if retained for shadcn slot completeness.
- **Cartouche is sacred geometry, not a CSS token.** The macaron logo is delivered as a flat SVG asset; the red border, the sixty perimeter dots, the EB monogram all live inside the SVG geometry. The CSS never references the macaron red. Do not invent a `--brand-cartouche-red` to "honour heritage" — the brand explicitly walls off the macaron from the live token surface.
- **Brand-X lift content to avoid.** Do not lift the model names (Tourbillon, Chiron, Mistral, Bolide, Centodieci, Divo, EB 110, La Voiture Noire, Veyron) into any Halcyon preview body copy as feature labels. Do not use real driver / engineer names (Miroslav Zrnčević appears as a Bugatti chief development driver in press releases — do not use). Do not reproduce the Cartouche / EB monogram. The brand colour and CTA shape are fine to use; the named hypercars and named people are lifts.

## §Known gaps

- **Live `bugatti.com/` consumer home not reachable this cycle.** The site sits behind a Vercel Security Checkpoint that returns HTTP 429 with a JavaScript-challenge bootstrap; WebFetch and direct curl both received the challenge HTML, not the real page. The dark-canonical observation falls back to the Wayback `20240213062747` snapshot, which is a legacy build predating the current Tourbillon launch. A Chrome MCP session that can execute the Vercel challenge would resolve every gap below.
- **Live model-detail pages (`bugatti.com/models/*`) not reachable.** Same Vercel challenge. Cannot confirm whether the current production version still uses the `#101010` off-black or has migrated to a different dark canvas, whether the hero treatment is video / parallax / static, whether the navigation chrome has been redesigned, whether new chromatic accents have been introduced for individual models (e.g., Tourbillon-specific atomic/skeletonised UI cues).
- **Dark-canvas card / muted / border / input values are synthesised.** No live observation of the dark-mode card surface ladder, muted register, input chrome, or destructive register — the newsroom is light-canonical and the Wayback archive predates the current dark-card spec.
- **Variable-font axes not confirmed.** The proprietary `BUGATTI_*` family ships as `woff2` but the live CSS doesn't expose `font-variation-settings`. Whether the family carries weight axes, optical-size axes, or italic was not determinable from the network responses. Treating the family as fixed-weight 400 / 700 only.
- **Cartouche colour values not extracted.** The macaron SVG is fetched from `/favicon.ico` / `/apple-touch-icon.png` / `/safari-pinned-tab.svg` but the binary inspection of the SVG path fills was out of scope this cycle. The Cartouche red is intentionally not surfaced as a CSS token, so absent from the live token observation; an asset-level inspection (e.g., reading the SVG) could surface its exact hex.
- **Search / global filter chrome not observed.** The newsroom surface has no global search bar in the sampled paths; whether the current production newsroom or main site exposes a search modal / autocomplete is unknown.
- **Mobile-specific chrome not sampled.** All observations were derived from desktop-breakpoint CSS rules. The narrow-viewport rules (`@media (min-width:640px)`, `@media (min-width:768px)`) confirm responsive scale shifts but do not surface mobile-only navigation, drawer chrome, or compact-component variants.
