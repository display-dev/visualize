---
slug: cloudflare-style
name: Cloudflare
source: live-verified
verified-at: 2026-05-25
verified-by: subagent-via-webfetch+curl
verified-urls:
  - https://www.cloudflare.com/
  - https://www.cloudflare.com/products/
  - https://www.cloudflare.com/plans/
  - https://www.cloudflare.com/case-studies/
  - https://www.cloudflare.com/under-attack/
  - https://workers.cloudflare.com/
  - https://blog.cloudflare.com/
  - https://developers.cloudflare.com/
  - https://dash.cloudflare.com/login
canonical-canvas: both
selection:
  mood: [enterprise, data-rich]
  tone: [precise, pragmatic]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a precise, pragmatic register with enterprise, data-rich visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Cloudflare

## §1 Canonical canvas

Cloudflare ships at least three meaningfully distinct design languages today, and they do not agree on a canvas polarity. The marketing skin renders dark by default but is built on a token system that defines both polarities; the editorial blog ships single-polarity white; the developer docs ship explicit `[data-theme=light]` and `[data-theme=dark]` blocks side by side; the product dashboard sits behind Cloudflare's own bot challenge but its public stylesheet references Kumo's `light-dark()` definitions throughout. Picking one polarity for the catalogue entry would misrepresent at least one of those surfaces, so this brand registers as `both`.

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | `https://www.cloudflare.com/` | Polarity-aware; dark by default via `prefers-color-scheme` | Inline `<head>` script reads `?theme=` query, then `prefers-color-scheme`, and sets `documentElement.classList` accordingly. `:root{color-scheme:light}`, marketing CSS provides 92 `.dark:*` overrides. Dark canvas: `#151414` warm near-black with `#f0e3de` warm-cream foreground. Light canvas: `#fff` with `#262626` foreground. |
| Marketing pricing (`/plans/`) | `https://www.cloudflare.com/plans/` | Same as home — polarity-aware | Tier cards `bg-background-100 hover:ring-2 hover:ring-accent-100`. Same shell as home, products, case-studies, workers landing, under-attack. |
| Marketing products / case studies / workers / under-attack | `/products/`, `/case-studies/`, `https://workers.cloudflare.com/`, `/under-attack/` | Same shell as home | All emit the same `<html lang="en">` shell, the same Astro CSS bundle, the same hero pattern `home-hero-title text-light-foreground` with orange text-shadow outline. Under-attack adds a red CTA entry point named "Under attack?" in the topnav. |
| Blog | `https://blog.cloudflare.com/` | Single-polarity white | `body{background:#fff}`. Body text is `color(var(--midgrey) l(-25%))` (a CSS Color Module Level 5 darken on `#738a94` → roughly `#3f4549`). Editorial system fonts (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, …`), not Kunst Grotesk. Legacy CF orange `#f6821f` as link / search accent (`--search-snippet-primary-color`). No `.dark` selector; no theme toggle. Code snippets render dark on a `#1c2023` background via the Ashes highlight.js theme — that's the only dark surface and it's polarity-locked to the code block. |
| Developer docs | `https://developers.cloudflare.com/` | Polarity-aware via `data-theme`; dark default | `<html data-theme="dark">` ships on first paint; `[data-theme=light]` and `[data-theme=dark]` blocks both exist in the CSS bundle. Built on Astro Starlight (`--sl-color-*` Starlight tokens) with a Cloudflare overlay layer (`--color-cl1-*`). Brand accent flips: link blue `#2e69ff` in light mode, brand orange `#f6821f` in dark mode (`--tw-accent-*` swaps to `--orange-accent-*`). |
| Dashboard landing | `https://dash.cloudflare.com/login` | Gated — bot challenge with white canvas | A logged-out fetch returns Cloudflare's own Turnstile challenge page (white canvas, `color:#313131`, system font). The Kumo CSS bundle referenced from the marketing site uses `light-dark()` at every `--color-kumo-*` definition (`--color-kumo-canvas:light-dark(neutral-25, neutral-1000)`, etc.), so the dashboard chrome is polarity-aware by design. Direct inspection of the authenticated chrome is gap-flagged below. |

The canonical-canvas decision is **both** because:

1. Marketing CSS encodes light + dark on the same tokens (`--color-background-100:#fff` AND `#151414`; `--color-foreground-100:#262626` AND `#f0e3de`) and respects `?theme=light` plus the OS preference.
2. Developer docs use Astro Starlight's `[data-theme=light|dark]` switch with an explicit user-facing toggle.
3. Kumo (the internal design system) declares every color slot via `light-dark()` and gates the runtime polarity on `[data-mode=dark]` cascade — meaning the dashboard chrome was authored for both polarities at the token level.

The blog is the lone single-polarity surface and is white-canonical. Even that is enough to disqualify a `dark`-only canonical-canvas declaration; combined with everything else the verdict has to admit both.

## §2 Palette

OKLCH values computed against the live hex via the catalogue's vendored culori at `visualize/scripts/vendor/culori.mjs`. Hex values traced to the marketing CSS bundle (`/_astro/index.Dkp5rlGq.css`), the developer docs CSS bundles (`/_astro/index.COxuA-oV.css`, `/_astro/Page.BxP_QNQx.css`), and the blog CSS bundles (`/themes/ashes.min.css`, `/_astro/index.BunSNJJ0.css`).

### Brand primary

Cloudflare ships **two co-existing orange primaries**, which is the most important palette finding in this refresh. The previous DESIGN.md captured only the first.

- `--primary` (marketing override): `oklch(0.6870 0.2075 38.79)` (= `#ff5e1f`). Live: `https://www.cloudflare.com/` — marketing CSS variable `--color-accent-100`. This is the 2026 marketing-skin override of Kumo's brand colour — vivid, pushed redder, used on the "Start building" CTA fill, the hero text-shadow outline, the pricing-tier hover ring, the `<code class="text-accent-100">` syntax-highlight blocks in the hero. Hover companion `--color-accent-200: #ff7038` = `oklch(0.7114 0.1877 40.38)`.
- `--brand-primary-kumo`: `oklch(0.7235 0.1724 53.79)` (= `#f6821f`). Live: `https://developers.cloudflare.com/` (`--color-cl1-brand-orange`), `https://blog.cloudflare.com/` (`--search-snippet-primary-color`), and inside the marketing site's own Kumo block (`--text-color-kumo-brand:#f6821f` under `[data-mode=dark]`). This is the **legacy / canonical Cloudflare orange** — Kumo's `--color-kumo-brand` default, the colour the dev docs use as their primary, and the colour the blog still uses for accent links. A consumer who reaches for "Cloudflare orange" without further qualification gets this one.
- `--brand-orange-mobile-meta`: `oklch(0.6629 0.2272 35.92)` (= `#ff4801`). Live: marketing `<head>` `<meta name="theme-color" content="#ff4801" media="(max-width: 767px)">`. A third documented orange — the mobile OS chrome colour. Not used in body content; logged here so the next refresh doesn't treat it as drift.

The previous tokens.css collapsed all three into `--primary: #ff5e1f` and lost both the Kumo `#f6821f` lineage and the mobile-meta value. This is real drift, flagged below.

### Documented secondary brand colours

The marketing CSS exposes a tight palette of secondaries used as syntax-highlight, micro-accents, and chart fills. Kumo extends this with a much larger semantic-state palette (info / success / danger / warning + corresponding tints) and a badge palette (blue / green / orange / orange-subtle / purple / red / teal / teal-subtle / neutral / inverted), all defined via `light-dark()`.

- `--brand-accent-violet`: `oklch(0.6713 0.2223 305.96)` (≈ `#b866ff`). Live: chart palette / wordmark glyph identifier. (Carried from prior tokens.css; not directly named in 2026 marketing CSS — see §Drift.)
- `--brand-accent-purple`: `oklch(0.5616 0.2894 300.57)` (≈ `#9616ff`). Live: same lineage. (See §Drift.)
- `--brand-accent-yellow`: `oklch(0.8652 0.1768 90.38)` (≈ `#ffcc00`). Live: same lineage. (See §Drift.)
- `--brand-info-blue` (Kumo `--color-kumo-info`): `oklch(0.8090% 0.105 251.81)` in light, `oklch(0.379 0.146 265.52)` in dark. Live: marketing CSS — `--color-kumo-info:light-dark(var(--color-blue-300),var(--color-blue-900))`.
- `--brand-success-emerald` (Kumo `--color-kumo-success`): `oklch(0.871 0.150 154.45)` light / `oklch(0.393 0.095 152.54)` dark. Live: marketing CSS — `--color-kumo-success:light-dark(...)`.
- `--brand-warning-yellow` (Kumo `--color-kumo-warning`): yellow-400/yellow-700 via `light-dark()`. Live: marketing CSS Kumo block.
- `--brand-danger-red` (Kumo `--color-kumo-danger`): `oklch(0.637 0.237 25.33)` light / `oklch(0.396 0.141 25.72)` dark. Live: marketing CSS — `--color-kumo-danger:light-dark(red-500, red-900)`.
- `--brand-attack-red`: `oklch(0.6916 0.1988 20.19)` (≈ `#ff5b66`). Live: marketing topnav "Under attack?" link entry point, also `/under-attack/` hero CTA. Reserved for the security-emergency entry point — Cloudflare doesn't expose this as a generic destructive colour.
- `--brand-link-blue` (developer docs light): `oklch(0.5765 0.2314 264.05)` (= `#2e69ff`). Live: `https://developers.cloudflare.com/` light theme — `--blue-accent-600`.
- `--brand-link-blue-dark`: `oklch(0.6026 0.2150 264.63)` (= `#3e74ff`). Live: developer docs dark theme — `--blue-accent-900`.

### Canvas + neutrals

**Marketing dark canvas** (`<html class="dark">` path, the default render on macOS):

- `--background`: `oklch(0.1924 0.0016 17.30)` (= `#151414`). Live: marketing CSS `--color-background-100` (dark) — body fill.
- `--foreground`: `oklch(0.9248 0.0158 42.38)` (= `#f0e3de`). Live: marketing CSS `--color-foreground-100` (dark) — body text. Warm-cream, not white; chroma 0.0158 means the cream tint is intentional, not a JPEG artefact.
- `--card`: `oklch(0.2098 0.0025 67.69)` (= `#191817`). Live: marketing `--color-background-200` (dark) — pricing-tier card backdrops, nav-popover surfaces.
- `--card-foreground`: same as `--foreground`.
- `--popover`: same as `--card`.
- `--popover-foreground`: same as `--foreground`.
- `--muted`: `oklch(0.2812 0.0039 84.58)` (= `#2a2927`). Live: marketing `--color-background-300` (dark) — muted surface elevation, e.g. quoted-block backdrops.
- `--muted-foreground`: `oklch(0.5555 0 0)` (= `#737373`). Live: marketing `--color-foreground-300` — fine-print, footer secondary text.
- `--accent`: same as `--card` (nav hover surface). `--accent-foreground`: cream `oklch(0.9895 0.0090 78.28)` (= `#fffbf5`).
- `--secondary`: cream `#fffbf5` — used as the inverted pill background.
- `--secondary-foreground`: dark charcoal `oklch(0.2393 0 0)` — text on cream pill.
- `--destructive`: `oklch(0.6916 0.1988 20.19)` — the attack-red, reserved for security-emergency. Downstream consumers should treat this as a brand reservation, not a generic delete colour; the marketing site never exposes it on routine destructive actions.
- `--destructive-foreground`: cream `#fffbf5`.
- `--border`: `oklch(0.9248 0.0158 42.38 / 0.125)` — foreground-at-12.5%-alpha. The warm cream tint carries through, so borders pick up the canvas warmth automatically.
- `--input`: same as `--border`.
- `--ring`: same as `--primary` (`#ff5e1f`).

**Marketing light canvas** (`<html>` without `.dark`, the `?theme=light` path):

- `--background`: `oklch(1.000 0 0)` (= `#fff`). Live: marketing CSS `--color-background-100` (light branch).
- `--foreground`: `oklch(0.2686 0 0)` (= `#262626`). Live: marketing `--color-foreground-100` (light branch). Neutral dark grey, no warm tint in the light variant.
- `--card`: `oklch(0.9938 0.0013 106.42)` (= `#fdfdfc`). Live: `--color-background-200` (light) — barely-off-white card surface.
- `--muted`: `oklch(0.9774 0.0025 48.72)` (= `#f9f7f6`). Live: `--color-background-300` (light) — section dividers.

**Editorial blog canvas** (white-canonical, no dark variant):

- `--background`: `oklch(1.000 0 0)` (= `#fff`). Live: `body{background:#fff}` in `/themes/ashes.min.css` parent / `/_astro/index.BunSNJJ0.css`.
- `--foreground`: `oklch(0.3050 0.0067 256)` (≈ `color(var(--midgrey) l(-25%))` evaluated against `#738a94` → roughly `#3f4549`). Live: `body{color:color(var(--midgrey) l(-25%));...}`. Body text doesn't reach pure black — closer to a slate.
- `--brand-blog-darkgrey`: `oklch(0.2038 0.0067 258.37)` (= `#15171a`). Live: `--darkgrey` token, used for headings.
- `--brand-blog-blue`: `oklch(0.7208 0.1357 237.53)` (= `#3eb0ef`). Live: `--blue`.
- `--brand-blog-green`: `oklch(0.7987 0.1799 124.64)` (= `#a4d037`). Live: `--green`.
- `--brand-blog-yellow`: `oklch(0.8676 0.1640 89.47)` (= `#fecd35`). Live: `--yellow`.
- `--brand-blog-pink`: `oklch(0.6499 0.2250 18.47)` (= `#fa3a57`). Live: `--pink`.
- `--brand-blog-purple`: `oklch(0.5439 0.2262 325.88)` (= `#ad26b4`). Live: `--purple`.
- `--brand-blog-red`: `oklch(0.6506 0.1999 33.73)` (= `#f05230`). Live: `--red`. (These five colours are the Ghost CMS default-theme palette; Cloudflare uses Ghost behind the blog and keeps the theme's accent ladder, though the brand orange `#f6821f` overrides the search input ring.)
- `--brand-blog-whitegrey`: `oklch(0.9464 0.0134 233.75)` (= `#e5eff5`). Live: `--whitegrey` — section dividers.

**Developer docs canvas** (polarity-aware, dark by default):

- Light: `--background:#fff`, `--foreground:#18181b`, hairlines via `#00000014` / `#0000001f` / `#0000000d` (RGB-alpha overlays on white).
- Dark: `--background:#1d1d1d` (`--color-cl1-gray-0`), `--foreground:#fafafa`, hairlines via `#ffffff14` / `#ffffff1a` / `#ffffff12`.
- Sidebar surfaces: `--sidebar-bg: var(--color-cl1-white)` (light) / `var(--sl-color-bg)` (dark). Sidebar text uses `--color-cl1-gray-4` to `gray-7` ladder.

### Polarity-locked surfaces

These hold a fixed canvas colour regardless of theme — they're identity surfaces, not theme-flippable chrome.

- `--brand-canvas-orange`: `oklch(0.6870 0.2075 38.79)` (= `#ff5e1f`). Live: marketing — "Start building" CTA fill, the home-hero text-shadow outline. Cream on orange; the cream is `--color-light-foreground:#fffbf5`. Never inverts.
- `--brand-on-orange`: `oklch(0.9895 0.0090 78.28)` (= `#fffbf5`). Live: text inside the orange CTA card.
- `--brand-canvas-code-block`: `oklch(0.2407 0.0083 240.23)` (= `#1c2023`). Live: blog code blocks (`pre code.hljs{background:#1c2023}`). Locked to dark even on the white-canonical blog canvas — code is always dark on Cloudflare's blog. This is the Ashes base16 theme.
- `--brand-code-ident-blue` (blog Ashes): `oklch(0.7548 0.0577 226.16)` (= `#95aec7`). Live: `.hljs-built_in, .hljs-doctag, .hljs-keyword.hljs-atrule, .hljs-quote, .hljs-regexp{color:#95aec7}`. Pastel blue identifier tokens.
- `--brand-code-keyword-pink` (blog Ashes): `oklch(0.7283 0.0567 351.17)` (= `#c795ae`). Live: `.hljs-keyword, .hljs-template-tag, .hljs-type{color:#c795ae}`.

### Hairlines / dividers

- `--brand-hairline-marketing-dark`: `oklch(0.9248 0.0158 42.38 / 0.125)` — foreground-at-12.5%-alpha on dark canvas. Live: marketing CSS `--color-border-100` derived value. Warmth carries automatically.
- `--brand-hairline-marketing-light`: `oklch(0.2686 0 0 / 0.125)` — foreground-at-12.5%-alpha on light canvas.
- `--brand-hairline-devdocs-light`: `#0000001f` (12% black alpha). Live: developer docs `--color-header-line` light.
- `--brand-hairline-devdocs-dark`: `#ffffff1a` (10% white alpha). Live: developer docs `--color-header-line` dark.

### Drift vs `tokens.css`

The committed `tokens.css` was authored against the marketing skin in isolation. The drift below is structural, not cosmetic, because the prior file modelled the brand as `dark-canonical` and that is the wrong canvas-decision input.

| Token | tokens.css (current) | Live evidence | Reconciliation |
|---|---|---|---|
| `canonical-canvas` (frontmatter) | `dark` | Marketing supports both via `?theme=` + `prefers-color-scheme`; dev docs ship `[data-theme=light]` + `[data-theme=dark]`; blog is white-canonical; Kumo defines every token via `light-dark()`. | Re-author tokens.css with `:root` carrying the light variant (Kumo's default `color-scheme:light`) and `[data-theme="dark"]` carrying the dark marketing skin. Or: ship a true polarity-aware shell with `light-dark()` if the catalogue's `_template/tokens.css` accommodates that. |
| `--primary` | `oklch(0.6870 0.2075 38.79)` = `#ff5e1f` | Two orange primaries live alongside each other: `#ff5e1f` (marketing-only accent override) and `#f6821f` (Kumo brand, dev docs, blog). | Keep `#ff5e1f` as `--primary` if the preview is anchored on the marketing skin, but add `--brand-orange-legacy: #f6821f` to acknowledge the canonical Kumo lineage. Note in the header comment. |
| `--background` in `:root` | dark `#151414` only | Light branch documented at `#fff` via the same token (`--color-background-100`). | Move dark canvas to `[data-theme="dark"]`; put light canvas (`#fff`) in `:root`. |
| `--foreground` in `:root` | warm cream `#f0e3de` only | Light branch documented at `#262626`. | Same as `--background` — move polarity-aware. |
| `--font-sans` | `'FT Kunst Grotesk', 'Inter', …` | Marketing CSS preloads `Kunst Grotesk Regular.woff2` and `Kunst Grotesk Medium.woff2` — no `FT ` prefix in the file URL. Inline script reads `cfFont=stk` to swap to `font-stk-bureau-sans`, suggesting an alternate. | Drop the `FT ` prefix; the brand uses `Kunst Grotesk` per the preload `<link>`. Keep `Inter` as fallback for systems missing the font. |
| `--brand-cloud-glow`, `--brand-cloud-shadow` | declared at `oklch(0.745 0.18 65)` / `oklch(0.672 0.215 38)` | Not observable in the live CSS — likely retired or reverse-derived in 2026 redesign. The 2026 wordmark is rendered via `cf-logo-base` + `cf-logo-light` SVG layers (a base mono mark plus an opacity-controlled light variant), not via a 2-stop gradient on the cloud glyph. | Mark `not-observed-2026-05`. Keep the values in §6 Notes for completeness but drop them from tokens.css; downstream consumers shouldn't depend on the wordmark internals. |
| `--brand-accent-violet`, `--brand-accent-purple` | `oklch(0.6713 0.2223 305.96)`, `oklch(0.5616 0.2894 300.57)` | Not directly named in 2026 marketing CSS. The Kumo block exposes `--color-purple-{400..700}` via `light-dark()` but with much less saturated values — `oklch(0.558 0.288 302.32)` at purple-600. | Keep them tagged as inferred from chart-palette inventory if used. Otherwise drop; the live marketing CSS doesn't deploy them as identity colours. |
| `--brand-attack-strong` | `oklch(0.6039 0.2349 20.16)` = `#ed1641` | Not observable as a distinct token in live CSS; the only attack-related entry is the "Under attack?" link which uses `--color-kumo-danger` lineage. | Replace with the Kumo lineage values. Or drop if the preview doesn't need a saturated companion. |
| missing | — | Marketing CSS exposes `--type-h1-size` through `--type-h6-size` with explicit `md` variants, all with `-.025em` tracking and `0.99 / 1.0 / 1.2` line-heights. The catalogue's tokens.css has no `--brand-type-*` parallels. | Optional addition: encode the type scale in brand-extras (`--brand-type-h1`, `--brand-type-h2`, etc.). Not load-bearing for the preview shell. |
| missing | — | Marketing CSS exposes a `--color-light-foreground:#fffbf5` token used on hero overlay text where contrast against a dark hero video must be high. Distinct from `--foreground` which is dimmer (`#f0e3de`). | Add `--brand-on-dark-strong: oklch(0.9895 0.0090 78.28)` so hero-overlay-style content can route to a documented value rather than inlining. |

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (h1) | Kunst Grotesk | 500 | 2.5rem → 3.5rem (md) | 0.99 | -0.025em |
| Heading (h2) | Kunst Grotesk | 500 | 2rem → 3.5rem (md) | 1.0 | -0.025em |
| Subheading (h3) | Kunst Grotesk | 500 | 2rem → 3rem (md) | 1.0 | -0.025em |
| Section title (h4) | Kunst Grotesk | 500 | 2rem (both) | 1.0 | -0.025em |
| Title (h5) | Kunst Grotesk | 400 | 1.3rem → 1.2rem (md) | 1.2 | -0.025em |
| Title-sm (h6) | Kunst Grotesk | 500 | 1.125rem | 1.2 | -0.025em |
| Body (p) | Kunst Grotesk | 400 | 1rem | 1.2 | -0.0025em |
| Caption (small) | Kunst Grotesk | 400 | 0.875rem | 1.15 | -0.01em |
| Mono (code) | Apercu Mono (fallback to system mono via Kumo `--font-mono` UI stack) | 500 | 0.85em (relative) | 1.3 | 0 |
| Editorial body (blog) | `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, …` | 400 | inherited Ghost defaults | normal | 0 |
| Developer docs body | `Inter, ui-sans-serif, system-ui, …` | 400 | Starlight defaults | Starlight defaults | 0 |

Notes:

- **Marketing wordmark + body share Kunst Grotesk.** Two weights are preloaded: Regular (400) and Medium (500). The display ramp (h1–h4) all sit at 500; body sits at 400. Tracking is uniformly negative (`-0.025em`) on headings — wide-to-tight is the recognizability move.
- **The marketing site has an alt-font swap.** Inline `<head>` script reads `?cfFont=stk` and toggles `documentElement.classList` between `font-stk-bureau-sans` and the Kunst default. This is an A/B path, not the default — useful to know if `Kunst Grotesk` is unavailable to a downstream font loader; the brand has tested `STK Bureau Sans` as a substitute and the structure tolerates it.
- **The editorial blog runs on Ghost CMS** with the default theme's system font stack. The Cloudflare brand mark is the only Kunst-Grotesk-ish surface on the blog (in the topbar, served as an SVG, not as text). Everything else is Apple-system-default — that's deliberate brand-tone separation: marketing is opinionated typography; the blog is editorial-neutral so the writing reads as prose, not as marketing copy.
- **Developer docs run on Astro Starlight** with Inter as the body and a system monospace stack. Starlight's defaults aren't overridden in the CSS bundles inspected, so the docs read as a "typical Starlight site with Cloudflare colour overlay" — a deliberate choice to keep cognitive load low for reference material.
- **`text-balance` is applied** to every marketing h1/h2 (`class="…text-balance"`). That tells you the brand expects each hero / section title to wrap aesthetically across viewports, not be hand-broken.

## §4 Component vocabulary

Documented from live samples across `cloudflare.com/`, `cloudflare.com/plans`, `cloudflare.com/under-attack`, `cloudflare.com/products`, `workers.cloudflare.com`, `blog.cloudflare.com/`, `developers.cloudflare.com/`. CSS-class names are mostly Tailwind-utility composites; component-level class hooks like `home-hero-title`, `footer-cf-wordmark`, `cf-logo-base` are the cleaner identifiers.

### Primary CTA button — orange fill

**Status:** current
**Live source:** `https://www.cloudflare.com/` topnav (`#nav-start-building-button`), `cloudflare.com/plans` tier CTAs
**Description:** Pill shape on desktop (`rounded-xl md:rounded-full`), 12px horizontal padding (`px-3`), 6px vertical (`py-1.5`). Fill `bg-accent-100` (`#ff5e1f` in dark mode, full saturation regardless of theme — this is polarity-locked). Foreground `text-light-foreground` (`#fffbf5` cream — never inverts). Border tracks `border-accent-100`. Hover bumps to `--color-accent-200` (`#ff7038`) and ramps an `:before` pseudo-element to 26% opacity at the canvas-300 colour. `:active` translates 1px down and scales to 0.98. Backdrop blur `backdrop-blur-md` for layered surfaces.
**States:** `default`, `hover` (opacity 0.95, accent-200 tint), `active` (translate-y-px, scale-0.98), `focus-visible` (3px `--ring/50` outline, border swaps to ring colour), `disabled` (pointer-events-none, opacity 0.5).

### Secondary button — outlined / transparent

**Status:** current
**Live source:** `https://www.cloudflare.com/` (`#nav-login-button`, `#nav-contact-sales-button`); secondary "See more" CTAs on `/plans`
**Description:** Same pill geometry as primary. Fill transparent or `bg-background-100` with backdrop-blur. Border `border-border-100` (12.5%-alpha foreground on canvas, picks up warmth). Foreground `text-foreground-100`. Hover lifts border colour to `--color-accent-100` and tints background to `bg-accent-200/5` (5% alpha orange wash) — the orange announces itself on hover even when the button itself is monochrome at rest.
**States:** `default`, `hover` (border → orange, bg → 5% orange tint, text → `text-accent-100`), `active` (translate-y, scale-0.98), `focus-visible` (ring + accent border), `disabled` (50% opacity).

### "Under attack?" entry-point pill

**Status:** current
**Live source:** topnav of `cloudflare.com/`, `cloudflare.com/under-attack/` hero
**Description:** Distinct from both primary and secondary buttons — this is the brand's reserved security-emergency entry point. Label "Under attack?" verbatim. Red-family fill or red text + outline (depending on viewport / page). On marketing topnav, presented as a small text-link with the attack-red colour. On `/under-attack/`, escalates to a full-width red banner / red CTA.
**States:** `default`, `hover` (no documented hover effect beyond colour shift — this is a "click me right now" surface).

### Topnav

**Status:** current
**Live source:** every marketing page; layout shared across home / plans / products / customers
**Description:** Fixed-position (`md:fixed`), pointer-events-none on the outer container so it sits transparent over hero video. Centered logo block on mobile (`md:justify-self-start` desktop), nav links rendered as text-only horizontal list with `font-medium` and `transition-all duration-200`. Hover state: `hover:opacity-80`. Nav links don't display dropdown arrows by default; chevron icons appear inline at `opacity-30` (subtle pre-affordance). Right side carries Login + Contact sales (outlined) + Start building (orange primary). On scroll past hero, the nav adds a transparent-to-canvas backdrop fill via `bg-background-100/85` with backdrop-blur.
**Links observed:** Products, Solutions, Resources, Pricing, plus the "Under attack?" entry on hostile-mode pages.

### Topnav megamenu (Products / Solutions / Resources)

**Status:** current
**Live source:** clicking "Products" reveals a megamenu with category columns: Compute / Storage / AI / Security / Network & Content Delivery / SASE / Zero Trust. Each cell carries an icon glyph (24×24 outline), a product title (e.g., "Workers", "Durable Objects", "R2"), and a 2-3 word description ("Global serverless functions").
**Description:** Megamenu data is JSON-embedded in the HTML (`navigationContainer` script payload) — every product entry has `title`, `description`, `href`, `icon`, `category`, `order`. The render layer transforms this into a grid of icon-leading cells with hover state `hover:opacity-80`. Icons are stroke-only Lucide-style geometry, mostly base64-encoded inline SVG, `currentColor` strokes.
**States:** Hover lifts cell to `hover:opacity-80`. Active category column is highlighted via a sliding hover-indicator rendered as an absolute-positioned `border-border-100 bg-border-100/10` rectangle (`opacity-0` at rest, opacity ramps on hover into the slot).

### Hero (marketing home / workers / under-attack / build)

**Status:** current
**Live source:** `<h1 class="home-hero-title text-light-foreground …">` on every product-shaped marketing page
**Description:** This is the brand's voltage moment. The h1 is rendered in cream (`text-light-foreground` = `#fffbf5`) on top of a full-bleed background image / video, with a 4-way text-shadow outline in `var(--color-accent-100)` (the marketing orange). The shadow stack: `text-shadow: -1px -1px 0 var(--color-accent-100), 1px -1px 0 var(--color-accent-100), -1px 1px 0 var(--color-accent-100), 1px 1px 0 var(--color-accent-100);` — a 1-pixel orange stroke around every glyph, regardless of which page. This is unique to Cloudflare's 2026 redesign and instantly recognizable.
**Hero copy observed:** "Everything we learned from powering 20% of the Internet—yours by default" (home), "Build without boundaries" (workers), "Comprehensive protection against cyber attacks" (under-attack — though here it's an h2 on a foreground-100 colour, not the cream variant).
**Background:** A `<video>` with `object-cover object-bottom` and an `opacity-0 → opacity-100` fade on load. `data-hero-video-loaded` data-attribute drives the transition. Motion-reduce override is in place.

### Pricing tier card

**Status:** current
**Live source:** `https://www.cloudflare.com/plans/` — `class="relative group/tier bg-background-100 transition-shadow hover:ring-2 hover:ring-accent-100"`
**Description:** Tier names rendered as h3 (`heading-visual-h5 text-foreground-100 font-medium`). Tier names observed: **Free / Pro / Business / Contract** across Application Services; **Free / Pay-as-you-go / Contract** across SASE; **Free / Standard / Contract** elsewhere. Card fill `bg-background-100` (matches canvas on dark — the cards visually merge into the canvas at rest, lifting only on hover via the ring). Hover state adds a 2px orange ring (`ring-2 ring-accent-100`). Each tier carries a feature list (mostly text bullets, no icons) and a CTA — primary orange for the highlighted tier, outlined for the rest.
**States:** `default` (no border, blends into canvas), `hover` (2px orange ring outline appears).

### Pricing comparison table

**Status:** current (alongside the tier cards on `/plans`)
**Live source:** `/plans` below the tier-card row
**Description:** Hairline-divided rows of features × tiers with checkmark glyphs. Sticky-header pattern where the tier names lock to the top of the viewport on scroll. Striping is `bg-background-200/40` on alternate rows (40% alpha on the elevated background — subtle).

### Code mockup / inline code

**Status:** current
**Live source:** `<code class="text-accent-100">` blocks in the marketing hero, plus full code blocks on developer-product pages
**Description:** Code text renders in **orange** on the marketing dark canvas — `--color-accent-100` for code identifiers, `--color-accent-100/50` (50% alpha) for muted code tokens. There's no contrasting block background; the orange-on-near-black code stands alone as an in-flow visual surface. This is the brand's secondary voltage moment after the hero — orange isn't just a CTA fill, it's the colour of "code Cloudflare runs."
**Blog code blocks:** entirely different — dark backdrop `#1c2023` (Ashes theme) with pastel-on-grey syntax tokens (`#c7ccd1` body, `#c7ae95` variables, `#95aec7` keywords, `#95c7ae` strings).
**Developer docs code blocks:** Astro Starlight + Expressive Code defaults, with a `--color-cl1-*` overlay for callouts.

### Customer-story tab strip

**Status:** current
**Live source:** `cloudflare.com/` homepage carousel — `<button id="_r124R_0_-customer-story-tab-shopify">`, similar for `characterAI`, `intercom`, `doordash`, `discord`, `zendesk`, `lovable`, `npm`
**Description:** Horizontal scrolling strip of customer logos that double as tab triggers. Active state advances a customer-story panel below; inactive logos fade to ~40% opacity. Logos are SVG, monochrome on the dark canvas.

### Footer

**Status:** current
**Live source:** `cloudflare.com/` — `<footer class="z-10 mx-auto max-w-[1480px] px-px">` wrapping `.footer-scroll-host` (`bg-background-100`).
**Description:** Multi-column link layout: solutions / resources / quick-links. Footer wordmark (`.footer-cf-wordmark`) rendered at 12px height in `text-foreground-200` (slightly muted from the body cream). Bottom row carries legal links (Report security issues, Privacy policy, Terms of use) with a hover state `hover:text-foreground-100/70` (70% alpha cream — softer than the resting body text).

### Editorial blog — post listing

**Status:** current
**Live source:** `blog.cloudflare.com/`
**Description:** Vertical list of posts (not a card grid). Each post entry: post-title link (h2, dark grey), publication date (small, muted), excerpt body (1-2 paragraphs), "Continue reading »" link in legacy CF orange (`#f6821f`), author block (avatar JPEG + linked name) appearing below the body.
**Pagination:** numbered pages with "Older Posts →" navigation.

### Editorial blog — tag pill

**Status:** current
**Live source:** post entries on `blog.cloudflare.com/`
**Description:** Inline text link with `class="tag"`. No pill background, no border, no padding — just a coloured text-link. Examples observed: "AI", "Agents", "Security", "Engineering". This is intentional — the blog leans editorial, not categorisation-heavy.

### Editorial blog — search snippet ring

**Status:** current
**Live source:** `blog.cloudflare.com/` search input
**Description:** Focus-ring colour `rgba(246, 130, 31, 0.25)` (= `--search-snippet-focus-ring`), shadow `0 0 0 3px rgba(246, 130, 31, 0.15)` — orange glow around focused search input. Snippet primary colour `#f6821f` is the link colour on returned results.

### Developer docs — sidebar nav

**Status:** current
**Live source:** `developers.cloudflare.com/` sidebar
**Description:** Vertical list of sections. Active state: `--sl-color-sidebar-active: var(--color-cl1-black)` (light theme), `--sl-color-sidebar-active: var(--color-cl1-white)` (dark theme). Hover background: `--sidebar-hover-bg: var(--color-cl1-gray-9)` (light) / `var(--color-cl1-gray-1)` (dark). Sidebar gutters: `padding: 0rem 1.5rem 1.5rem`. Sidebar scroll uses `scrollbar-gutter: stable`.

### Developer docs — breadcrumb

**Status:** current
**Live source:** `developers.cloudflare.com/` header area
**Description:** `<nav>` carrying separated links. Link colour `--color-link-breadcrumbs` is `inherit` by default, swapping to `--color-cl1-gray-4` on hover (light theme).

### Developer docs — admonition / aside (note / tip / caution / danger)

**Status:** current
**Live source:** in-page asides on `developers.cloudflare.com/`
**Description:** `.starlight-aside` class with no border (override of Starlight's default `border-left`), `border-radius: 4px`. Subtype backgrounds:
- `.note`: `--color-cl1-blue-8` (= `#b9d6ff`) bg, `--color-cl1-blue-2` (= `#003681`) text in light; `--color-cl1-blue-7` / `--color-cl1-blue-0` in dark.
- `.tip`: `--color-cl1-violet-8` bg, `--color-cl1-violet-1` text in light; violet-8 / violet-0 in dark.
- `.caution`: `--color-cl1-orange-8` bg, `--color-cl1-orange-2` text in light; orange-8 / orange-0 in dark.
- `.danger`: `--color-cl1-red-8` bg, `--color-cl1-red-2` text in light; red-8 / red-0 in dark.
- Title positioning: `margin-left: 30px; svg{margin-left: -30px}` — the SVG sits in a 30px gutter to the left.

### Developer docs — theme toggle

**Status:** current (Starlight default)
**Live source:** `developers.cloudflare.com/` header
**Description:** Starlight's built-in light / dark / system switch. Loads as the polarity-aware default.

### Form input (developer docs search)

**Status:** current
**Live source:** `developers.cloudflare.com/` header search box (Pagefind / Algolia variant)
**Description:** Rounded corners (`--radius-md` = 0.375rem from the Tailwind preset), input height standardised at `--input-height: 2.75rem` (= 44px — touch-target floor). Focus ring inherits the Starlight accent.

### Kumo design-system primitives (referenced from product chrome)

**Status:** current — referenced in marketing CSS bundle even though authenticated dashboard wasn't sampled
**Live source:** `--color-kumo-*` tokens defined throughout `https://www.cloudflare.com/_astro/index.Dkp5rlGq.css`
**Description:** Kumo is Cloudflare's internal design system, exposing a full semantic palette with `light-dark()` polarity-aware definitions:
- Surfaces: `--color-kumo-canvas` (neutral-25 / neutral-1000), `--color-kumo-base` (white / neutral-925), `--color-kumo-elevated` (neutral-75 / neutral-975), `--color-kumo-recessed` (neutral-125 / neutral-950), `--color-kumo-overlay` (neutral-50 / neutral-800), `--color-kumo-control` (white / neutral-900).
- Hairlines: `--color-kumo-hairline` (neutral-150 / neutral-800), `--color-kumo-line` (oklch black at 10% / neutral-750).
- Semantic states: `--color-kumo-info` + `-tint`, `--color-kumo-success` + `-tint`, `--color-kumo-danger` + `-tint`, `--color-kumo-warning` + `-tint` (each `light-dark()`-polarity-aware).
- Brand: `--color-kumo-brand:var(--color-accent-100)` on the marketing site, but `--text-color-kumo-brand:#f6821f` under `[data-mode=dark]` — Kumo's canonical brand value is the legacy orange.
- Badges: 10 colour variants (`badge-blue`, `badge-green`, `badge-orange`, `badge-orange-subtle`, `badge-purple`, `badge-red`, `badge-teal`, `badge-teal-subtle`, `badge-neutral`, `badge-inverted`), each polarity-aware.
- Shadows: `--color-kumo-shadow-drop` (oklch black at 0.08 / 0.30 alpha), `--color-kumo-shadow-edge` (oklch black at 0.12 / oklch white at 0.10).
- FedRAMP variant: `[data-theme=fedramp]` overrides canvas / base / hairline to a desaturated slate-blue (`#5b697c` / `#c8d4e5`) — a government-deployments brand variant carried in the same CSS bundle.

### Brand mark (Cloudflare wordmark)

**Status:** current
**Live source:** topnav and footer on every marketing page; `cf-logo-base` + `cf-logo-light` SVG class layering
**Description:** Two-layer SVG: a base mark (`.cf-logo-base`) and an opacity-controlled light variant (`.cf-logo-light{opacity:0}` at rest, ramps in for hover / scroll-state). Rendered at 26px × 57px in the topnav (h-[26px] w-[57px]). Colour tracks `text-accent-100` on dark canvas — orange wordmark. The "Cloudflare" wordmark text alongside the cloud glyph is rendered in `text-foreground-100` (cream on dark / dark grey on light). Footer carries a 12px-tall version in `text-foreground-200` (slightly muted from the topnav).

## §5 Surface inventory

- `https://www.cloudflare.com/` — marketing home; hero video + orange-outlined h1 + topnav megamenu + customer-tab strip + pricing intro + Region: Earth section + footer. Establishes the marketing skin.
- `https://www.cloudflare.com/products/` — product index; same shell, no hero video on landing.
- `https://www.cloudflare.com/plans/` — pricing tier cards (Free/Pro/Business/Contract) and full comparison table. Anchors §4's pricing-card and table patterns.
- `https://www.cloudflare.com/case-studies/` — customer logo grid + featured case stories. Same shell.
- `https://www.cloudflare.com/under-attack/` — security-emergency hero, anchors `--brand-attack-red` and the dedicated entry-point pattern.
- `https://workers.cloudflare.com/` — Workers landing; same hero pattern with code-mockup overlay. Anchors `<code class="text-accent-100">` orange code styling.
- `https://blog.cloudflare.com/` — editorial corpus; anchors the white-canonical canvas, system-font body, post-listing vertical-list pattern, Ghost CMS underpinnings, Ashes code-block theme.
- `https://developers.cloudflare.com/` — reference documentation; anchors Astro Starlight + `--color-cl1-*` overlay, `[data-theme=light]` + `[data-theme=dark]` polarity switch, admonition palette, blue / orange dual-accent system.
- `https://dash.cloudflare.com/login` — bot-challenged on first fetch (Turnstile); the challenge page itself is white-canvas + system font, but the dashboard chrome behind it was inferred from Kumo CSS rather than sampled directly.

## §6 Notes

- **Two brand oranges, not one.** The single biggest authoring trap on this brand is the assumption that "Cloudflare orange = `#ff5e1f`." That's the 2026 marketing-skin override of Kumo's `--color-accent-100`. The canonical Kumo brand colour, the colour every other surface (dev docs, blog, FedRAMP variant) uses, is the legacy `#f6821f`. A token system that ships only `#ff5e1f` will be wrong everywhere outside marketing.
- **The hero text-shadow outline is the brand's signature voltage moment.** The 4-direction orange `text-shadow` around a cream h1 over hero video is unique to Cloudflare's 2026 redesign — appearing on home, workers landing, every product page. A preview shell anchored on this surface will read as "Cloudflare" instantly. The hero video alone, or the orange CTA alone, won't. (Note: replicating it on a static preview means using a hero image / gradient backdrop rather than a real `<video>`.)
- **Kumo polarity is `light-dark()` everywhere.** Every `--color-kumo-*` definition wraps a `light-dark()` call. The marketing site forces dark via `prefers-color-scheme` defaulting most US-locale OS preferences, but Kumo itself is polarity-neutral by construction. A consumer that wants to mirror Kumo's behaviour should ship both polarities, not pick one.
- **The blog runs a completely separate brand system.** Ghost CMS + Ashes highlight theme + system fonts + legacy CF orange. Treating this surface as part of the "marketing dark canvas" misses that Cloudflare deliberately keeps its editorial voice on a different polarity, font family, and accent shade.
- **The marketing site has a CMS layer.** Most h1/h2/h3 carry `data-cms-path="…"` and `data-cms-type="text"` — content is editable through Cloudflare's internal CMS, not hard-coded. This is observable in the markup but doesn't affect token decisions; useful to know if a future authoring pass tries to grep for stable copy strings.
- **Attack-red is a brand reservation, not a generic destructive colour.** `--brand-attack-red` (`#ff5b66`) shows up only on the "Under attack?" entry point and `/under-attack/` hero. Cloudflare does not appear to use this colour on routine destructive actions (delete confirmations, error states inside settings). The Kumo system carries a separate `--color-kumo-danger` (`light-dark(red-500, red-900)`) for those — that's the generic destructive surface. The two should not be conflated.
- **`text-shadow` and `text-balance` are deployed as brand-aesthetic tools, not accessibility tools.** Every marketing h1/h2 carries `text-balance` to prevent awkward line breaks; the hero h1 carries the 4-direction text-shadow as visual identity. Replicating the brand without these reads as "generic dark theme."
- **The marketing site is built on Astro** (`/_astro/` asset paths). Developer docs are also Astro Starlight. Blog is Ghost CMS. The dash is a React app (inferred from `cf-bm` cookies and the standard CF dashboard surface).
- **The FedRAMP brand variant is a real production deployment.** `[data-theme=fedramp]` rules ship in the marketing CSS bundle — `--color-kumo-canvas:#5b697c; --color-kumo-base:#5b697c; --color-kumo-hairline:#c8d4e5`. A slate-blue surface, distinct from the marketing dark or the developer docs dark. This is the brand's government-deployments skin; not a candidate for the preview but worth knowing exists.
- **Brand-X-lift content to avoid when authoring previews:** Customer names from the homepage tab strip (Shopify, Character.AI, Intercom, Doordash, Discord, Zendesk, Lovable, npm); the tier names Free / Pro / Business / Contract (Cloudflare's exact ladder); the literal hero copy "Everything we learned from powering 20% of the Internet—yours by default" and "Build without boundaries"; the under-attack entry-point label "Under attack?"; product names in the megamenu (Workers, Durable Objects, R2, D1, Workers AI, Vectorize, etc.). Use neutral Halcyon-team SaaS content instead.

## §Known gaps

- **Direct screenshot capture not available.** `mcp__chrome-devtools__*` and `mcp__claude-in-chrome__*` tools were not loaded into this sandbox, and per AUTHORING-FLOW.md's fallback path the screenshot step is deferred. The DESIGN.md is derived from the live HTML + CSS bundles (curled directly from `cloudflare.com`, `blog.cloudflare.com`, `developers.cloudflare.com`) plus the inline computed-style hints encoded in the live class names. Light-mode rendered snapshots, dark-mode rendered snapshots, and the megamenu / hover-state captures are all gap-flagged here; a future refresh with Chrome MCP in the sandbox should append them.
- **Dashboard chrome (dash.cloudflare.com authenticated)** was not directly sampled. `dash.cloudflare.com/login` returns Cloudflare's Turnstile bot challenge to anonymous fetches (which is consistent with their own product gating their own login page). The Kumo CSS surfaces in the marketing bundle were inspected as a proxy. A direct sample would need a logged-in session or a Cloudflare-staffed walkthrough.
- **Kumo design-system documentation site not located.** Cloudflare does not appear to publish Kumo at a public URL (no `kumo.cloudflare.com`, no `design.cloudflare.com`). The token vocabulary is reverse-derivable from the marketing CSS bundle (`--color-kumo-*` declarations resolve to documented values) but the canonical docs are presumably internal-only.
- **Mobile-specific surfaces.** The `theme-color` meta switches to `#ff4801` at the `(max-width: 767px)` breakpoint, suggesting a deliberate mobile-tab-bar colour. Mobile-only layouts (hamburger menu, mobile pricing card stacking) weren't sampled in depth.
- **STK Bureau Sans alt-font path.** The marketing site has a `?cfFont=stk` query that swaps the body font; the rendered output wasn't sampled. Useful only if downstream consumers find Kunst Grotesk unavailable.
