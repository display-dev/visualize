---
slug: stripe-style
name: Stripe
source: live-verified
verified-at: 2026-05-26
verified-by: subagent-via-webfetch
verified-urls:
  - https://stripe.com/
  - https://stripe.com/payments
  - https://stripe.com/billing
  - https://stripe.com/connect
  - https://stripe.com/pricing
  - https://stripe.com/enterprise
  - https://stripe.com/customers
  - https://stripe.com/customers/figma
  - https://stripe.com/atlas
  - https://stripe.com/jobs
  - https://stripe.com/sessions
  - https://stripe.com/blog
  - https://stripe.com/newsroom
  - https://stripe.com/newsroom/brand-assets
  - https://docs.stripe.com/
  - https://docs.stripe.com/payments/quickstart
  - https://press.stripe.com/
canonical-canvas: both
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Stripe

Stripe's brand is split across three first-party surfaces that share one design system (HDS — Houston Design System) but resolve to different polarities. The marketing site (`stripe.com`) is light-canonical with a near-white canvas and Slate ink. The docs site (`docs.stripe.com`) is also light, but ships a deep navy code-block surface that punctuates every prose section. The Dashboard (`dashboard.stripe.com`) is a dark-canonical product surface using a deep violet-navy that appears throughout marketing-page mockups. Because the brand ships both polarities deliberately — not one polarity inverted — this catalog entry is `canonical-canvas: both`.

This document is authored against live observation: `b.stripecdn.com/mkt-ssr-statics/.../static/css/f577e6782212f424.css` defines the full HDS palette and is the source of truth for every numeric value below. The docs surface pulls from `b.stripecdn.com/docs-statics-srv/assets/docs.03612dca15058d0ce76a.css`.

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Marketing home | https://stripe.com/ | `#fff` neutral-0 with `#f6f9fc`/`#f8fafd` band alternation | Hero rides a wave/mesh gradient image overlaid on white, customer-logo carousel band on white, bento cards on `surface-bg-subdued` (`#f6f9fc`) |
| Product page (Payments / Billing / Connect) | https://stripe.com/payments | Light canvas, banded with `#f6f9fc` interlude bands | Each band holds a single dashboard mockup; the mockups themselves render white-on-white with light hairlines |
| Pricing | https://stripe.com/pricing | White canvas, no card-elevation contrast | Two unboxed tiers (Standard / Custom) presented as adjacent columns; tier names use the heading weight (300), prices use bold tabular numerals |
| Enterprise | https://stripe.com/enterprise | White canvas with full-bleed photographic and gradient image bands | Section bands carry imagery rather than a flat coloured fill; no dark-canvas inversion observed on this page |
| Customers (index + per-story) | https://stripe.com/customers, https://stripe.com/customers/figma | White canvas with `#f6f9fc` interlude bands | Story pages carry a logo lockup at top, oversized headline, six product tags, then alternating prose + photo sections |
| Atlas | https://stripe.com/atlas | White canvas with a single hero-form module | Marketing-grade form treatment with radio choices; visually consistent with main stripe.com, no sub-brand colourway |
| Jobs | https://stripe.com/jobs | White canvas with full-bleed photo cards | Office and people photography drives the surface; no decorative gradient observed |
| Sessions | https://stripe.com/sessions | Light canvas with photographic hero banner | Conference subsite, but pulls the same HDS chrome as the rest of marketing |
| Blog | https://stripe.com/blog | White canvas, body-set list of post cards | Standard Stripe header — no editorial-only typography swap |
| Newsroom | https://stripe.com/newsroom | White canvas with date-stamped press list | Utilitarian; no decorative chrome |
| Press (books arm) | https://press.stripe.com/ | White canvas, editorial register | Distinct from `stripe.com` — book pages run a serif body for long-form passages; the only Stripe surface that breaks from Sohne for body |
| Docs home | https://docs.stripe.com/ | `#fff` canvas with `#1a2652` code-block surfaces inline | Three-pane layout (sidebar / prose / code); code blocks anchor the visual identity of every page |
| Docs prose page | https://docs.stripe.com/payments/quickstart | Same as docs home | Tabbed language selector at the top of every code block (Node / Ruby / Python / PHP / Go / Java / C#) |
| Dashboard chrome (observed in product mockups across marketing) | embedded across https://stripe.com/billing, /connect, /payments | Deep violet-navy `#182659` neutralDark-900 with near-white ink | The dashboard surface appears in marketing page mockups (transaction tables, charts, invoice screens) as the brand's documented dark canvas; the actual `dashboard.stripe.com` is login-walled (verification deferred — see §Known gaps) |

The home plus inner-marketing pages share the `#fff` plus `#f6f9fc` band-alternation pattern. The hero on `stripe.com/` is the brand's most-photographed signature — a multi-stop wave/mesh gradient (purple → magenta → blue → cyan, observed as gradient-stop fixtures `#7232f1`, `#533afd`, `#f44bcc`, `#fb76fa`, `#0073e6`, `#00d66f`) overlaid on a near-white canvas. The Dashboard surface contributes the brand's documented dark polarity.

## §2 Palette

Values are sourced from HDS core tokens defined in the marketing CSS bundle (`f577e6782212f424.css`) and the docs CSS bundle (`docs.03612dca15058d0ce76a.css`). Hex values are the live brand; OKLCH conversions use the vendored culori (`visualize/scripts/vendor/culori.mjs`).

### Brand primary — "Blurple"

The brand documents its primary as "blurple" (per https://stripe.com/newsroom/brand-assets: "Use slate and blurple on light backgrounds, and white on dark backgrounds. Do not use any other colour for the wordmark."). HDS exposes a full primary lineage:

- `--primary`: `oklch(0.5211 0.2679 277.43)` (= `#533afd`). Live: `https://stripe.com/` — `--hds-color-core-brand-600`, used as CTA fill on `.hero-section__button` and `.hds-button[data-variant="primary"]`.
- `--brand-primary-soft` (HDS brand-500): `oklch(0.5836 0.2283 278.87)` (= `#665efd`). Live: `https://stripe.com/` — gradient-stop in stats and bento atmospherics.
- `--brand-primary-press` (HDS brand-700): `oklch(0.4446 0.2187 276.88)` (= `#4032c8`). Live: `https://stripe.com/` — button-press state inherits from `--hds-color-action-bg-solid` darkening.
- `--brand-primary-deep` (HDS brand-800): `oklch(0.3614 0.1551 276.67)` (= `#2e2b8c`). Live: `https://stripe.com/` — deepest brand ladder stop, used in gradient stops and dark-on-light eyebrows.
- `--brand-primary-tint` (HDS brand-25): `oklch(0.9730 0.0133 286.15)` (= `#f5f5ff`). Live: `https://stripe.com/` — quietest brand wash, used as bg-on-light card variant.

### Documented secondary brand colours

The marketing CSS exposes several semantic palettes alongside brand:

- `--brand-accent-magenta` (HDS magenta-350): `oklch(0.6910 0.2416 338.92)` (= `#f44bcc`). Live: `https://stripe.com/` — gradient mesh stop and `--startups-card-border-gradient-bg`'s pink stop, also used in stats highlights.
- `--brand-accent-orange` (HDS orange-350): `oklch(0.6902 0.2061 40.42)` (= `#ff6118`). Live: `https://stripe.com/` — startup-card gradient warm stop (radial-gradient anchored at orange-700/350: `#ffad00 → #ff7600 → neutral-50`), also flagged in atlas-adjacent surfaces.
- `--brand-accent-lemon` (HDS lemon-200): `oklch(0.8226 0.1690 83.34)` (= `#f9b900`). Live: `https://stripe.com/customers` — warning-tier alerts and decorative stat-card accents.
- `--brand-accent-success` (HDS success-400): `oklch(0.6698 0.1704 153.58)` (= `#00b261`). Live: marketing dashboard mockups — money-positive transaction badges (e.g. "Approved" status pill).

### Canvas + neutrals

- `--background`: `oklch(1 0 0)` (= `#fff`). Live: `https://stripe.com/` — `body`, primary canvas of every marketing page.
- `--foreground`: `oklch(0.4229 0.0497 256.36)` (= `#3c4f69`, HDS neutral-700). Live: body prose on `https://stripe.com/` — the "soft Slate" Stripe ships as body ink, not pure black. (Bundle-internal Notifications component uses `#424770` for body ink, which sits between neutral-700 and neutral-800; treat neutral-700 as the canonical body for prose surfaces.)
- `--card`: `oklch(1 0 0)` (= `#fff`). Live: `https://stripe.com/` — `.case-study-card`, `.modular-solutions-bento-card`. Cards do not introduce a contrasting fill; they're identified by border + shadow.
- `--card-foreground`: same as `--foreground`.
- `--popover`: `oklch(1 0 0)` (= `#fff`). Live: `https://stripe.com/` — navigation flyout panels (`.navigation__content`), tooltip surface.
- `--popover-foreground`: `oklch(0.4229 0.0497 256.36)`.
- `--muted`: `oklch(0.9807 0.0051 247.88)` (= `#f6f9fc`). Live: `https://stripe.com/` — `--hds-color-surface-bg-subdued`, used for interlude bands and nested feature panels.
- `--muted-foreground`: `oklch(0.5552 0.0435 259.24)` (= `#64748d`, HDS neutral-500). Live: caption-set rows and stat-band labels, e.g. case-study eyebrow text.
- `--accent`: `oklch(0.9730 0.0133 286.15)` (= `#f5f5ff`, HDS brand-25). Live: `https://stripe.com/` — quiet brand-tinted background used on `.section-background`s in product-overview sections.
- `--accent-foreground`: `oklch(0.5211 0.2679 277.43)` (= `#533afd`) — the primary on tinted accent surfaces.
- `--secondary`: `oklch(0.9844 0.0045 258.32)` (= `#f8fafd`, HDS neutral-25). Live: `https://stripe.com/` — second-tier panel canvas, near-indistinguishable from `--muted` but with a cooler hue.
- `--secondary-foreground`: `oklch(0.4229 0.0497 256.36)`.
- `--destructive`: `oklch(0.6093 0.2282 10.76)` (= `#ea2261`, HDS ruby-400). Live: live in error toasts and field-validation messages observed in HDS form components.
- `--destructive-foreground`: `oklch(1 0 0)` (= `#fff`).
- `--border`: `oklch(0.8963 0.0186 250.60)` (= `#d4dee9`, HDS neutral-100). Live: `https://stripe.com/` — `--hds-color-surface-border-quiet`, hairlines on cards, navigation dividers, footer rules.
- `--input`: same as `--border` — input borders observed at `1px solid neutral-100` with focus state shifting to `--ring`.
- `--ring`: `oklch(0.5211 0.2679 277.43)` (= `#533afd`). Live: `https://stripe.com/` — `--hds-color-action-border-solid`, the focus-visible outline on every interactive primitive (`.hds-button:focus-visible` shows a 2px solid ring with 3px offset).

### Polarity-locked surfaces (Dashboard / dark variant)

The Dashboard chrome is its own canvas — not a synthesised inversion of marketing. These tokens stay fixed across `:root` and `[data-theme="dark"]`:

- `--brand-canvas-night`: `oklch(0.2895 0.0936 268.41)` (= `#182659`, HDS neutralDark-900). Live: marketing-embedded dashboard mockups across `https://stripe.com/billing`, `/connect`, `/payments`. Pairs with white ink at body sizes.
- `--brand-canvas-night-deep`: `oklch(0.2175 0.0657 267.92)` (= `#0d1738`, HDS neutralDark-990). Live: chrome of darkest dashboard panel (sidebar resting state), also used as code-block surface in marketing-page code samples.
- `--brand-on-dark`: `oklch(1 0 0)` (= `#fff`). Live: every text element on the dashboard canvas — body, headings, table rows, KPI labels. Per the brand-assets guidance: "white on dark backgrounds".
- `--brand-on-dark-soft`: `oklch(0.8 0.04 268)` (= `#a3b5d6`, HDS neutralDark-300). Live: secondary text in dashboard mockups — column headers, row metadata.

### Docs surface (code-block dark)

The docs site ships its own dark-on-light variant for code blocks — distinct from the dashboard:

- `--brand-docs-code-canvas`: `oklch(0.2849 0.0817 269.21)` (= `#1a2652`). Live: `https://docs.stripe.com/payments/quickstart` — `.code-block` background.
- `--brand-docs-code-canvas-deep`: `oklch(0.2375 0.0727 269)` (= `#1a2147`). Live: deeper variant on sub-block surfaces.
- `--brand-docs-link`: `oklch(0.5604 0.1652 271.72)` (= `#5469d4`). Live: `https://docs.stripe.com/` — inline link colour in body prose (distinct from blurple — softer, more "documentation-blue").
- `--brand-docs-success`: `oklch(0.6363 0.1968 138.93)` (= `#3ea50b`). Live: docs syntax highlighting — string-literal tone.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.8963 0.0186 250.60)` (= `#d4dee9`, HDS neutral-100). Live: `https://stripe.com/` — between footer link columns, between card rows.
- `--brand-hairline-quieter`: `oklch(0.9424 0.0138 247.97)` (= `#e5edf5`, HDS neutral-50). Live: footer canvas separators and nested card dividers.
- `--brand-hairline-strong`: `oklch(0.5552 0.0435 259.24)` (= `#64748d`, HDS neutral-500). Live: cell-borders inside data tables (transaction rows, pricing-comparison grids).

### Shadow primitives

- `--brand-shadow-md`: `0 1px 3px rgba(50,50,93,.12), 0 1px 2px rgba(0,0,0,.05)`. Live: `https://stripe.com/` — observed on `.hds-card` resting state. The `rgba(50,50,93,...)` colour is HDS's documented shadow stop — a desaturated indigo-grey rather than pure black, which keeps card edges feeling tinted rather than greyed.
- `--brand-shadow-lg`: `0 12px 32px rgba(50,50,93,.12), 0 4px 16px rgba(0,0,0,.04)`. Live: bento card hover-elevation and modal surface.

### Drift vs `tokens.css`

| Token | `tokens.css` value | Live brand value | Suggestion |
|---|---|---|---|
| `--primary` comment cites `#635BFF` | OKLCH `(0.5211 0.2679 277.43)` which actually computes to `#533afd` | Live brand-600 is `#533afd` (HDS); `#635BFF` is the commonly-cited "Cornflower Blue" hex but does not match the live deployed value | Update the comment in `tokens.css` from "Cornflower Blue #635BFF" to "Blurple #533afd (HDS brand-600)"; the OKLCH value itself is correct |
| `--font-sans` lists `'Inter'` first | Inter as the primary fallback | Live Stripe ships `sohne-var` (custom proprietary) as the first family with `Helvetica Neue, Arial, sans-serif` fallback — `Inter` is not in the live stack | Replace `'Inter'` with `sohne-var` (already declared as the second item) at first position; fallback chain becomes `sohne-var, 'Helvetica Neue', Arial, sans-serif` |
| `--text-display`, `--text-heading` declared at `56px` / `48px` | Static numeric scale | Live HDS uses fluid scales (`--hds-font-heading-xxl-size: 2.125rem` to `3.5rem`, `--hds-font-heading-hero-lg-size: 1.75rem` to `2.5rem` across breakpoints) | Acceptable as preview defaults; mark as "preview-clamp" approximation in a comment so the next reviewer doesn't expect a 1:1 match |
| `--brand-canvas-soft` `(0.9807 0.0051 247.88)` (= `#f6f9fc`) | Matches HDS `surface-bg-subdued` | No drift on the value | Keep |
| `--brand-canvas-cream` `(0.9380 0.0307 81.7535)` | Synthesised warm-tint band | Not observed in live HDS — Stripe doesn't ship a cream canvas on marketing or docs | Either remove the cream band entirely or label it as "preview-only decorative band" |
| `--brand-ink-mute` `(0.5200 0.0435 259.24)` | Darkened from `0.5552` for AA on `--brand-canvas-soft` | Live HDS neutral-500 is `(0.5552 0.0435 259.24)` (= `#64748d`); the catalog has nudged it darker to win contrast | Acceptable per the "utility neutral, retune for AA" rule in AUTHORING.md; the existing comment in `tokens.css` already documents the reason |
| `[data-theme="dark"]` `--background` `(0.2200 0.0700 276)` | Synthesised dark canvas | Live dashboard ships `#182659` (= `(0.2895 0.0936 268.41)`, neutralDark-900) — the current preview canvas is **darker and slightly more violet** than the brand's documented dashboard surface | Update to neutralDark-900 `oklch(0.2895 0.0936 268.41)` to match the brand's documented dark polarity rather than a synthesised approximation |
| `[data-theme="dark"]` `--primary` `(0.5500 0.2200 277)` | Slightly lifted from base | Live brand-600 = `oklch(0.5211 0.2679 277.43)` and HDS exposes `brandDark-600` at the same `#533afd` — i.e. the brand doesn't shift the primary in dark mode; it stays at the same chroma | Drop back to `oklch(0.5211 0.2679 277.43)` to mirror `:root --primary` and match HDS's documented dual-polarity contract (brand-600 = brandDark-600) |
| `--destructive` dark variant `(0.6200 0.2200 29)` | Synthesised lift | HDS error-400 is `#f3432a` (= `(0.6399 0.2160 31.29)`), close to the catalog value but tighter to the documented brand | Pull dark `--destructive` to `oklch(0.6399 0.2160 31.29)` |

The light-mode `--primary` is correct numerically; only the comment around it needs updating. The dark-mode block should be re-anchored on neutralDark-900 + brandDark-600 rather than the current synthesised approximations.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero display (`--hds-font-heading-hero-lg`) | sohne-var | 300 | `1.75rem` → `2.5rem` (clamp across breakpoints) | 1.1 — 1.2 | -0.01em to -0.02em |
| H1 / page heading (`--hds-font-heading-xxl`) | sohne-var | 300 | `2.125rem` → `3.5rem` | 1.03 — 1.07 | -0.025em to -0.02em |
| Section heading (`--hds-font-heading-xl`) | sohne-var | 300 | `1.75rem` → `3rem` | 1.03 — 1.07 | -0.01em to -0.02em |
| Block heading (`--hds-font-heading-lg`) | sohne-var | 300 | `1.375rem` → `2rem` | 1.07 — 1.2 | -0.01em to -0.02em |
| Card heading (`--hds-font-heading-md`) | sohne-var | 300 | `1.25rem` → `1.625rem` | 1.1 — 1.2 | -0.01em |
| Eyebrow / small label (`--hds-font-heading-xxs`) | sohne-var | 400 | `0.875rem` | 1.2 | 0em |
| Body large (`--hds-font-text-lg`) | sohne-var | 300 | `1rem` → `1.125rem` | 1.35 — 1.4 | 0em |
| Body (`--hds-font-text-md`) | sohne-var | 300 | `1rem` | 1.4 | 0em |
| Caption (`--hds-font-text-sm`) | sohne-var | 300 | `0.875rem` | 1.4 | 0em |
| Quote (`--hds-font-quote-md`) | sohne-var | 300 | `1.125rem` → `1.625rem` | 1.12 — 1.4 | -0.01em to 0em |
| Quote attribution | sohne-var | 300 | `1rem` → `1.125rem` | 1.35 — 1.4 | 0em |
| Bold text (CTAs, table-headers) | sohne-var | bold (700) | role-dependent | role-dependent | role-dependent |
| Code (`--font-family--code`) | Source Code Pro | 500 | `0.8125rem` — `0.9375rem` | 1.5 | 0em |

The single most distinctive typography decision: **every heading from `xxl` down to `md` is set at weight 300** (light), not bold. Stripe's display register is a thin sans on tight tracking — the visual weight comes from size and the negative letter-spacing (down to `-0.025em` at xxl). Bold (700) appears only on CTAs, eyebrows (xxs at 400), table headers, and inline strong emphasis. This is contrary to the convention of most B2B SaaS brands (heavy display weight on heroes) and is the single most recognisable property of Stripe's marketing typography.

**Fluid scales.** Every size declares two or three breakpoint-anchored values rather than a single fixed size. The hero scale ranges from `1.75rem` (mobile) to `2.5rem` (desktop). Translate this to `clamp()` for the preview template.

**Source Code Pro** is the brand's documented code typeface (declared in the marketing CSS as `font-family: SourceCodePro; src: url(.../SourceCodePro-Medium.woff2)`). The docs site uses Source Code Pro too. The same code typeface threads through dashboard mockups, marketing code-sample blocks, and docs API references — consistent across surfaces.

**Press editorial divergence.** `press.stripe.com` runs a serif body for book pages — the only Stripe surface that breaks from Sohne for prose. Not part of the HDS contract per se; mark as out-of-scope for the preview shell.

**Tabular numerals.** A `.tabular-nums` utility class (`font-feature-settings: "tnum"; font-variant-numeric: tabular-nums`) is applied to pricing figures, stat-band numbers, and transaction-table rows. A tightened `.tabular-nums--tight` variant adds `letter-spacing: -.03em` for dense numeric tables.

## §4 Component vocabulary

### Primary button (`hds-button[data-variant="primary"]`)

**Status:** `current`
**Live source:** `https://stripe.com/` — `.hero-section__button.hds-button--primary`
**Description:** Filled rectangle with `--hds-color-action-bg-solid` (blurple `#533afd`) background and white text. Border is `1px solid var(--hds-color-core-brand-600)` (same as fill, so visually invisible). Radius pulls from `--hds-space-button-radius-lg` (= `--hds-space-core-radius-sm` = `4px`) for the large variant or `--hds-space-button-radius-sm` (= `--hds-space-core-radius-xs` = `2px`) for compact. Padding-block is `15.5px` / `16.5px` top/bottom on lg; padding-inline draws from `--hds-space-core-300` (24px) at lg. Button height is `--hds-space-core-600` (= `48px`) on lg, `--hds-space-core-550` (= `44px`) on md. Text is `sohne-var` at weight bold (700) with size pulled from `--hds-font-input-text-lg-size` (= `1rem`).
**States:** `default` `#533afd` fill; `hover` slight darkening through `--hds-color-action-bg-translucent` overlay (computed darken, no separate token); `pressed` resolves to HDS brand-700 (`#4032c8`); `focus-visible` outline `2px solid var(--hds-color-action-border-solid)` (blurple) with `outline-offset: 3px`; `disabled` colour inherits from `--hds-color-action-icon-disabled` and the fill swaps to neutral-100.

### Secondary button (outline)

**Status:** `current`
**Live source:** `https://stripe.com/` — secondary CTA next to primary in hero
**Description:** White fill with `1px solid var(--hds-color-surface-border-quiet)` (= `#d4dee9` neutral-100) border. Text in `--hds-color-action-text-solid` (= blurple `#533afd`). Same dimensions as primary. Reads as a link-styled button with a soft outline.
**States:** `default` blurple text on white; `hover` border shifts to blurple, text remains blurple; `focus-visible` blurple ring at offset 3px; `disabled` text and border drop to neutral-300.

### Tertiary / link button

**Status:** `current`
**Live source:** `https://stripe.com/` — "Pricing details" cross-link in CTA bands
**Description:** Text-only with an inline arrow glyph (`→`) appended. No border, no fill. Spacing of `0.25em` between label and arrow. The arrow translates on hover (`transform:rotate(-90deg)` for navigation accordions; horizontal nudge for inline link buttons) with `transition: 0.3s cubic-bezier(.25,1,.5,1)`.
**States:** `default` blurple text; `hover` blurple + arrow shifts 2-4px right; `focus-visible` 2px blurple outline at 3px offset; `visited` inherits default (no `:visited` shift observed).

### Sign-in button (compact, in nav)

**Status:** `current`
**Live source:** `https://stripe.com/` — top-right nav, `.navigation-item__sign-in`
**Description:** Smaller variant of the primary, with `--hds-space-core-radius-xs` (= 2px) radius. Background transparent at rest (matches nav fill); when the nav-menu is `[aria-expanded=true]` the button gains the brand fill. Text is `sohne-var` bold at 14px.
**States:** `default` transparent fill, blurple text; `hover` fills with blurple, text inverts to white; `focus-visible` 2px blurple outline.

### Icon button (close, expand, copy)

**Status:** `current`
**Live source:** `https://stripe.com/` — `.hds-icon-button`, navigation hamburger, dialog close
**Description:** Square button at `--hds-space-core-550` (44px) on lg, with a centered icon (24px or 16px). Radius pulls from `--hds-space-core-radius-round` (99999px) for circular icon-buttons or `--hds-space-core-radius-sm` (4px) for square. Icon fill resolves to `--hds-color-action-icon-onQuiet` (a soft dark on light surfaces).
**States:** `default` transparent; `hover` background fills to `--hds-color-surface-bg-quiet` (= `#fff` on subdued bands, near-white on white canvas — net visual is a very soft greyish hover-state); `focus-visible` 2px blurple outline.

### Destructive button

**Status:** `current` (observed in HDS form components in dashboard mockups)
**Live source:** `https://stripe.com/billing` — dashboard mockup "Cancel subscription" interactions; also in `.hds-button[data-variant="destructive"]`
**Description:** Same shape as primary, but the fill swaps to ruby-400 (`#ea2261`) and the text stays white. Border colour matches fill.
**States:** `default` ruby fill; `hover` darkens to ruby-500 (`#e2225f`); `focus-visible` 2px ruby outline at 3px offset.

### Resting bento card (`modular-solutions-bento-card`)

**Status:** `current`
**Live source:** `https://stripe.com/` — homepage bento grid (Products / Solutions / Developers sections)
**Description:** White (`#fff`) card with `1px solid var(--hds-color-surface-border-quiet)` (= `#d4dee9`). Radius `--hds-space-core-radius-md` (= `6px`). Shadow `0 .683px 2.048px rgba(0,0,0,.06), 0 3.413px 10.24px rgba(53,53,53,.04)` — extremely soft, near-flat at rest. Inner padding `--hds-space-core-300` (= 24px). Internal hierarchy: small icon (24px) on top, heading-md (`1.25rem` → `1.625rem`), body-md (`1rem`), optional link-buttonized CTA. Hover state introduces a `--bento-left-blob: var(--hds-color-core-brand-500)` radial gradient on the left edge.
**States:** `default` near-flat soft shadow; `hover` lifted shadow + brand-500 left-edge blob; `focus-visible` blurple ring around card; `[data-active]` (e.g. when a dialog is open from the card) raises elevation further.

### Case-study card (`case-study-card`)

**Status:** `current`
**Live source:** `https://stripe.com/customers` — grid of customer-story tiles
**Description:** White card with `1px solid var(--hds-color-surface-border-quiet)`. Internal layout: customer logo (centered, ~32-40px height), then heading, then a short subheading. The logo fill defaults to `--hds-color-action-icon-disabled` (a grey neutral) and inverts to `--hds-color-core-neutral-0` (white) when the card receives a deeper background variant. Hover state lifts the shadow and tints the border to blurple.
**States:** `default` flat white; `hover` border shifts to blurple-tinted, customer logo fills to its native colour; `focus-visible` 2px blurple outline at 3px offset, no underline shift.

### Pricing tier card (Standard / Custom)

**Status:** `current`
**Live source:** `https://stripe.com/pricing` — primary pricing grid
**Description:** Unboxed columns, no card-elevation. Tier name at heading-lg weight 300. Price set in heading-xl weight 300 with tabular numerals: `1.5% + €0.25` (locale-formatted). Beneath the price sit grouped feature lists with bullet headers ("Global access", "Built-in fraud prevention", etc.). CTA at the column foot is a primary button on the Standard tier, a "Contact sales" link-style button on Custom. No "featured tier" visual differentiation — both tiers carry equal weight.
**States:** Static — no hover state observed on the tier columns themselves; the CTA buttons inside carry their own states.

### Stat tile (in stats band)

**Status:** `current`
**Live source:** `https://stripe.com/` — homepage stats band, e.g. "135+ currencies", "99.999% uptime"
**Description:** Vertically-stacked layout: oversized number (heading-xxl weight 300, tabular numerals, often with the `tabular-nums--tight` letter-spacing override), then a small label below in body-sm or eyebrow weight 400. Stat tiles can be tinted via the `--stats-color` and `--stats-border-color` custom properties (different homepage variants ship purple, magenta, blue, and warm-amber stat-band tints).
**States:** Static; the tiles themselves don't carry states, but interactive `stats-menu__stat-wrapper` variants do — when active, an underline scales horizontally beneath the active stat (`transform:scaleX(1)`).

### Stat menu (interactive stat selector)

**Status:** `current`
**Live source:** `https://stripe.com/` — homepage where stats double as tabs into deeper sub-stats
**Description:** Horizontal row of stat tiles where clicking one promotes it to the active state. Active tile gets a thicker border, a tinted fill (`--stats-option-active-background` = a `rgba(brand, .05)` translucent wash), and a description block reveals below. Inactive tiles stay flat. The brand-colour rotation across variants uses `#1318c1` (deep brand), `#4304ea` (lifted brand), `#c42fa5` (magenta), `#2874ad` (action blue), `#fcfdfe` (on dark variants).
**States:** `default` flat; `active` `[aria-selected=true]` gets translucent brand wash + description-block reveal; `hover` slight border tint; `focus-visible` 2px blurple outline.

### Customer-logo carousel

**Status:** `current`
**Live source:** `https://stripe.com/` — directly below the hero
**Description:** Horizontal-scrolling carousel of customer logos rendered as grey SVGs at uniform height (~32px). Logos are recoloured to a neutral via `--customerLogoColor: var(--hds-color-action-icon-disabled)` at rest. Carousel auto-advances; users can pause via the navigation buttons (`.testimonial-carousel__navigation-button`). The scaling is governed by `--scale-shrinkage` and `--carousel-card-scale` custom properties — non-active logos shrink slightly toward the row edges.
**States:** `default` neutral grey; `hover` (per individual logo) lifts to full-colour brand; auto-advance with `cubic-bezier(.25,1,.5,1)` easing on the scale transition.

### Top navigation (desktop)

**Status:** `current`
**Live source:** `https://stripe.com/` — `.navigation__layout`, `.navigation-menu`
**Description:** Sticky top bar at `--navigation-height: 76px` (desktop 940px+ breakpoint). Left: Stripe wordmark. Middle: nav items (Products, Solutions, Developers, Resources, Pricing) — each is a `.hds-button` that expands a mega-menu flyout on hover. Right: Sign in + Contact sales + "Start now" primary CTA. The nav surface stays transparent at the top of the page and fills with `--hds-color-surface-bg-quiet` on scroll. Hairline beneath when filled.
**States:** `default` transparent; `[aria-expanded=true]` on any nav item opens a mega-menu flyout (white surface, soft `--hds-shadow-md` elevation); `scrolled` introduces the surface fill; nav items not currently hovered fade to `--hds-color-text-subdued` when another item is hovered (the `.navigation-menu-list:has(.hds-button:hover) .hds-button:not(:hover)` selector).

### Mega-menu flyout (Products / Solutions / Developers)

**Status:** `current`
**Live source:** `https://stripe.com/` — expanded `.navigation__content--products` etc.
**Description:** Full-width drop-down panel anchored to nav. Internal grid: multi-column layout with category eyebrows + linked items, each row has an icon + name + descriptor. The `developers` panel introduces a "get-started" inset block on `--hds-color-surface-bg-subdued`. Bottom of the panel sometimes carries a personalization banner (e.g. "See how Stripe works for fintechs"). Closes on outside-click or escape.
**States:** Hidden / `[aria-expanded=true]` shown with fade.

### Mobile nav (hamburger)

**Status:** `current`
**Live source:** `https://stripe.com/` (resize to < 940px) — `.navigation-hamburger-button`
**Description:** Two-line hamburger icon (`.navigation-hamburger__line`) at 24px square. Clicking sets `[aria-expanded=true]` on the parent menu, swaps the icon to an X via opacity flip on the two lines. Mobile menu drops down full-screen with a soft-shadowed panel.
**States:** `default` two-line hamburger; `[aria-expanded=true]` X with `.navigation-hamburger__opacity` rule.

### Footer

**Status:** `current`
**Live source:** `https://stripe.com/` — `.footer__container`
**Description:** White canvas with multi-column link grid: Products & pricing / Solutions / Integrations & custom solutions / Developers / Resources / Company / Support / Sign in. Each column has an eyebrow heading (weight 400, 14px) plus a stack of links (weight 300, 14px). Beneath the grid: globalization picker (locale selector, e.g. "Estonia (English)"), social links, copyright. Soft `--hds-color-surface-border-quiet` hairlines separate the grid from the locale-picker row.
**States:** Static; locale picker carries its own `popover` states.

### Globalization picker (locale switcher)

**Status:** `current`
**Live source:** `https://stripe.com/` — footer locale dropdown
**Description:** Click target shows "Estonia (English)" or whichever locale is active, with a chevron. Opens a popover (`.hds-globalization-picker`) listing countries grouped by region. Each region header is a `.locale-switcher__region-label`. Selected locale gets weight bold and a checkmark.
**States:** `default` collapsed; `[aria-expanded=true]` opens panel; selected item gets `[aria-selected=true]` with bold weight.

### Breadcrumb (in case studies)

**Status:** `current`
**Live source:** `https://stripe.com/customers/figma` — top of every case-study page
**Description:** Slim row above the case-study headline: "Customers / Figma". Set in `--hds-font-text-sm` (0.875rem, weight 300). The "/" separator is a literal forward slash with `0.5em` margin on either side.
**States:** Links are blurple, separators inherit `--hds-color-text-subdued`.

### Sub-navigation (in product pages)

**Status:** `current`
**Live source:** `https://stripe.com/payments` — secondary nav under main payments header
**Description:** Horizontal tab row with anchor links: Overview / Features / Payment methods / Authentication / AI / Docs. Each item is a `.hds-button` (link variant) at body-md weight 300. The active item gets an underline beneath it via a `:after` pseudo with `transform:scaleX(1)`. Inactive items fade to `--hds-color-text-subdued`.
**States:** `default` muted; `active` blurple + underline; `hover` blurple text, underline scales in.

### Text input

**Status:** `current`
**Live source:** `https://stripe.com/atlas` — "Business name" input; also throughout HDS form components in dashboard mockups
**Description:** White fill, `1px solid var(--hds-color-surface-border-quiet)` (= `#d4dee9`). Radius `--hds-space-core-radius-md` (= `6px`). Internal padding `--hds-space-input-text-paddingY-listbox` (~12px) vertical, `--hds-space-input-text-paddingX-listbox` horizontal. Placeholder colour at `--hds-color-text-subdued`. Label sits above the input in body-sm weight 400. Description text (helper) below in body-xs weight 300.
**States:** `default` quiet border; `:focus` border swaps to blurple (`--hds-color-action-border-solid`), no shadow halo; `[aria-invalid=true]` border swaps to ruby-400; `:disabled` fill drops to `--hds-color-surface-bg-subdued`, text to `--hds-color-text-subdued`.

### Textarea

**Status:** `current`
**Live source:** `https://stripe.com/` HDS form patterns (`.hds-textarea`)
**Description:** Same shell as text input but with `min-height: --hds-space-core-1200` (= 96px) and `resize: vertical`. Same border, radius, focus state.
**States:** Same as text input plus `:focus { outline: none }` (the focus is communicated through the border colour swap, not a halo).

### Select (combobox)

**Status:** `current`
**Live source:** `https://stripe.com/` — `.hds-select__trigger` in HDS form patterns
**Description:** Looks like a text input but with a chevron indicator on the right (16px lucide-style). Cursor flips to pointer. Click opens a `.hds-listbox` panel (`--hds-color-surface-bg-quiet` background, `--hds-shadow-md`, `--hds-space-core-radius-md` radius) with each option as a `.hds-listbox__item`.
**States:** `default` quiet; `:focus` border blurple; `[aria-expanded=true]` listbox open with chevron rotated; each listbox item has a `:hover` background tint.

### Switch

**Status:** `current`
**Live source:** `https://stripe.com/` — `.hds-switch`
**Description:** Pill-shaped toggle, 32px wide × 18px tall. Off state has neutral-100 background; on state has blurple background. Thumb is a white circle that translates 16px right when toggled (`.hds-input:checked:after { transform: translate(16px,-50%) }`).
**States:** `default` (off) neutral; `[aria-checked=true]` (on) blurple; `:focus-visible` adds blurple outline; `:disabled` background drops to neutral-50.

### Checkbox

**Status:** `current`
**Live source:** `https://stripe.com/atlas` — incorporation structure choice; also HDS forms
**Description:** Square, ~16px, with `--hds-space-core-radius-xs` (= 2px) radius. Unchecked: white fill with quiet border. Checked: blurple fill with white check glyph. Label sits to the right with `--hds-space-core-300` margin-left.
**States:** `default`; `:checked` blurple + check glyph; `:focus-visible` outline; `:disabled` neutral-50 fill with neutral-300 border.

### Radio (incorporation choice on Atlas)

**Status:** `current`
**Live source:** `https://stripe.com/atlas` — "C corporation / LLC / Subsidiary" choice
**Description:** Round, 16px, blurple-on-check. The Atlas form layout actually presents radios as full-width "card radios" — each option is a clickable card with the radio glyph + label + description. Cards have `--hds-color-surface-border-quiet` border at rest, blurple border when selected.
**States:** `default` quiet card; `:checked` blurple ring around card + filled radio; `:focus-visible` outline; `:disabled` neutral-50 fill.

### Tag / pill (used for product tags, status badges)

**Status:** `current`
**Live source:** `https://stripe.com/customers/figma` — "Billing", "Payments", "Elements", "Invoicing", "Data Pipeline", "Radar" product tags
**Description:** Pill-shaped (`--hds-space-core-radius-round` = 99999px) container with `--hds-space-core-100` (= 8px) vertical padding, `--hds-space-core-200` (= 16px) horizontal. Fill is a tinted variant of the related colour (brand-25 for product tags, success-100 for "Approved" status, ruby-100 for failed states). Text is body-sm at weight 400 in the deeper variant of the tinted colour. Optional icon (`.hds-tag__icon`) prepends with `--hds-space-core-50` margin-right.
**States:** Static when used as a label; clickable variants get hover-darkening + focus ring.

### Status indicator (dashboard transaction state)

**Status:** `current`
**Live source:** `https://stripe.com/billing`, `/payments` — embedded dashboard mockups
**Description:** Dot + label pattern: a small filled circle (8px) followed by a body-sm label. The dot uses the semantic status colour — success-400 (`#00b261`) for "Succeeded", lemon-300 (`#e8a30b`) for "Pending", ruby-400 (`#ea2261`) for "Failed", neutral-500 (`#64748d`) for "Refunded". Text colour is the matching deeper stop (success-600, lemon-500, ruby-600, neutral-700).
**States:** Static.

### Transaction table (dashboard mockup)

**Status:** `current`
**Live source:** `https://stripe.com/connect` — Shopify mockup; `/payments` — payment dashboard mockup
**Description:** Multi-row data grid. Column headers in body-sm weight bold, dark-on-light. Row body uses tabular numerals for amount columns. Row dividers are `1px solid var(--hds-color-util-neutral-50)` (= `#e5edf5`). Hover-row tint is `--hds-color-surface-bg-quiet`. Inside the mockup, the canvas can flip to dashboard-dark (`#182659`) — when it does, dividers shift to `rgba(255,255,255,.08)` and row text to `--brand-on-dark`.
**States:** `row default`; `row hover` tinted background; `row selected` blurple-tinted left-edge accent.

### Invoice mockup

**Status:** `current`
**Live source:** `https://stripe.com/billing` — invoice graphic (`.invoicing-graphic`)
**Description:** Light-card mockup of an invoice document: heading at top ("Invoice"), line items as a vertical stack with descriptions and tabular-numeral amounts, totals row at the bottom with bold weight. Card shell uses `--hds-color-util-neutral-0` (= `#fff`) with `1px solid var(--hds-color-util-neutral-50)`. Footer/heading colour at `--hds-color-util-neutral-990` (= deep slate `#061b31`).
**States:** Static; invoice mockups in the marketing site cycle through states (draft / sent / paid) via interactive HDS hover triggers.

### Code block (marketing)

**Status:** `current`
**Live source:** `https://stripe.com/` — referenced from product pages where API examples appear
**Description:** Dark surface (often `--brand-canvas-night` `#182659` or `#1a1a2e` for variants). Top bar with language tabs (Node / Ruby / Python / etc.) — active tab gets a thin underline; inactive tabs faded. Copy button (icon-button variant) at top-right. Body set in Source Code Pro at 13.33px, line-height 1.5, weight 500. Strings in cream, keywords in cyan, comments muted.
**States:** `tab hover` lifts faded tab; `copy hover` fills the button background; `copy success` swaps icon to check.

### Code block (docs)

**Status:** `current`
**Live source:** `https://docs.stripe.com/payments/quickstart`
**Description:** Dark navy surface (`#1a2652`), distinct from the marketing canvas. Same top-bar tab pattern with language selector. The docs variant adds inline annotations ("Sign in to see your own test API key") that get a yellow-amber wash. Authenticated docs view embeds the user's own test key.
**States:** Same as marketing code block, plus an "auth-aware" state where placeholder text is swapped for live values.

### Inline link (docs prose)

**Status:** `current`
**Live source:** `https://docs.stripe.com/` — body prose
**Description:** Body-coloured at rest with no underline; on hover gains an underline in the docs link blue `#5469d4`. Distinct from marketing where inline links tend to be blurple at rest with no underline.
**States:** `default` blurple text, no underline; `hover` underline + tint shift; `:visited` no shift.

### Sidebar (docs)

**Status:** `current`
**Live source:** `https://docs.stripe.com/` — left sidebar
**Description:** ~280px wide column, white canvas, vertical list of links grouped under section eyebrows. Each link is body-sm (0.875rem) weight 300 at rest, weight bold when active (matches the current page route). Active item also gets a left-border tint in blurple. Nested children are indented `--hds-space-core-300` (= 24px). Section eyebrows in body-xs weight 400 with `--hds-color-text-subdued` colour.
**States:** `default` quiet; `hover` background fills to `--hds-color-surface-bg-quiet`; `active` weight bold + left border tint.

### Search (docs command palette)

**Status:** `current`
**Live source:** `https://docs.stripe.com/` — top of docs site
**Description:** Pill-shaped trigger at top of docs ("Search docs") with a slash key glyph (`/`) on the right indicating the keyboard shortcut. Clicking opens a full-page modal with a large input + result-list. Results group by section (Payments, Billing, etc.).
**States:** `default` pill at rest; `:focus` opens modal; modal results navigable via arrow keys.

### Dashboard sidebar (in mockups)

**Status:** `current`
**Live source:** Embedded mockups across `https://stripe.com/payments`, `/billing`, `/connect`
**Description:** Deep navy `--brand-canvas-night-deep` (`#0d1738`) background. Logo at top, then a section eyebrow ("Payments", "Customers", etc.) in light grey, then nav items below in body-sm weight 300 white. Active nav item gets a blurple left-border accent and a slight background tint.
**States:** `default` resting; `hover` background tint; `active` left-edge accent + tint.

### KPI / metric card (in dashboard mockups)

**Status:** `current`
**Live source:** Embedded dashboard mockups across product pages
**Description:** Compact card with a large number (heading-lg weight 300, tabular numerals) and a small label below (body-xs weight 400). Often paired with a small delta indicator (e.g. "+12%") in success-400 green or ruby-400 red. On the dashboard canvas: card is `--brand-canvas-night-card` (slightly lighter than canvas), border `rgba(255,255,255,.08)`, radius 6px.
**States:** Static, occasionally with hover-state lift in interactive variants.

### Chart wrapper (dashboard mockups)

**Status:** `current`
**Live source:** `https://stripe.com/billing` — MRR / churn charts in embedded dashboard
**Description:** Line and area charts with multi-stop strokes (the gradient runs from `#5d64fe → #1c1b5a` for the brandDark variant). Gridlines at `rgba(255,255,255,.06)` on dark canvas, `rgba(50,50,93,.06)` on light. Y-axis labels in body-xs at neutral-500. Tooltip popover on hover with surface-bg-quiet fill.
**States:** `default` static line; `hover-point` shows a tooltip popover anchored at the point.

### Toast / notification (in dashboard mockups)

**Status:** `current`
**Live source:** Implied across HDS notification patterns; `--cardBackground: #fff; --textColor: #424770; --fontWeightNormal: 300; --fontFamily: sohne-var, "Helvetica Neue", Arial, sans-serif; --closeButtonFill: #cad2d9; --closeButtonFillHover: #929eaa;` defined in `Notifications_NotificationCenter` module
**Description:** White card pinned to bottom-right of the viewport, `position: fixed`, `z-index: 9999`. Padding `--hds-space-core-200` (= 16px). `--hds-space-core-radius-md` (= 6px) radius. Soft shadow. Close button at top-right uses `#cad2d9` fill at rest, `#929eaa` on hover.
**States:** Enter via fade-up; persist; close on click.

### Modal / dialog

**Status:** `current`
**Live source:** `https://stripe.com/` — bento card detail dialogs (`.modular-solutions-bento-card__dialog-entry`)
**Description:** Centered overlay panel, `--hds-color-surface-bg-quiet` background, `--hds-overlay-alpha: 0.7` (or `0.9` on small viewports) on the backdrop scrim. `--hds-dialog-padding-inline: var(--hds-space-core-300)` (= 24px), `--hds-dialog-pbs: var(--hds-space-core-700)` (= 56px top). Close button at top-right (icon-button). Inner content can be any HDS layout.
**States:** Enter via fade + scale; close on backdrop click, X click, or escape.

### Banner (cross-page promotional)

**Status:** `current`
**Live source:** `https://stripe.com/customers` — "Stripe Sessions 2026" banner
**Description:** Full-width section card with a darker overlay image. Headline in heading-lg weight 300, body in body-md weight 300, CTA as primary button. The dev-missing-intl banner pattern uses a different surface (deep navy `#1a1a2e` with amber accents `#f5a623`) — that's a developer-tooling banner specific to localisation-missing pages, not a production marketing banner.
**States:** Static once visible; can be dismissed in some variants.

### Quote / blockquote (case study)

**Status:** `current`
**Live source:** `https://stripe.com/customers/figma` — pull quotes from interviewees
**Description:** Set in `--hds-font-quote-md` (= `1.125rem → 1.625rem`, weight 300, line-height 1.4). No oversized opening quotation glyph — Stripe doesn't lift the "curly quote" decoratively. Quote sits left-aligned with a soft hairline above. Attribution beneath in `--hds-font-quoteAttribution-md` (= `1rem → 1.125rem` weight 300) with the person's role and company on a second line.
**States:** Static.

### Stat band (in case study)

**Status:** `current`
**Live source:** `https://stripe.com/customers/figma` — "13+ million monthly active users", "95% of the Fortune 500"
**Description:** Vertical-stack: huge number (heading-xxl weight 300 with tabular-nums--tight letter-spacing), label below in body-sm weight 300. The "+" suffix on "13+ million" uses a `<sup>` with `font-feature-settings: "sups" 1` and `font-size: 1em` (so it doesn't shrink). Multiple stat tiles arrange in a row with `--hds-space-block-stack-gap-lg` (= 40px) gap.
**States:** Static.

### Photo card (jobs page)

**Status:** `current`
**Live source:** `https://stripe.com/jobs` — office and people photo cards
**Description:** Image-only card, full-bleed within a parent container with rounded corners (`--hds-space-core-radius-md` = 6px). Caption beneath in body-sm weight 300 with subject and location ("Tokyo", "Atrium"). On hover, image scales subtly (`transform: scale(1.02)` with the brand easing curve).
**States:** `default` flat; `hover` image lifts; `focus-visible` outline.

### Photo collage / parallelogram overlay (homepage)

**Status:** `current`
**Live source:** `https://stripe.com/` — homepage editorial sections
**Description:** Photo treatments where a still image is masked with a parallelogram-shape SVG clip-path, often layered over a tinted background block. The overlay angle reads as a deliberate brand signature — a hard 30° slant.
**States:** Static decorative element.

### Book card (Stripe Press)

**Status:** `current`
**Live source:** `https://press.stripe.com/` — book listing
**Description:** Text-first card: title as linked heading (serif at press, sans-serif at stripe.com), author below, then a descriptive paragraph (150-200 words). Purchase buttons (Bookshop, B&N, Amazon) with prices, author bio, then "Praise" quote compilation. No cover-image cards in the press grid — Stripe Press emphasises ideas over imagery on the index page.
**States:** Static.

### Globe / geo widget (atlas)

**Status:** `current`
**Live source:** `https://stripe.com/atlas` — incorporation flow context graphics
**Description:** Stylised globe illustration with country fill states. Not a live map — a static SVG with the available-jurisdictions tinted in blurple, unavailable in neutral-100. Used as a context indicator in the Atlas onboarding flow.
**States:** Static.

### Logo lockup (case study)

**Status:** `current`
**Live source:** `https://stripe.com/customers/figma` — customer logo placement at top of story
**Description:** Customer's brand logo rendered at uniform 48-64px height, centered or left-aligned above the case-study headline. Logo fill: rendered in full brand colour (not desaturated), in contrast to the homepage carousel where logos are neutralised.
**States:** Static.

### Animated wave/mesh hero (homepage)

**Status:** `current`
**Live source:** `https://stripe.com/` — homepage hero
**Description:** Stripe's most recognisable signature surface. Multi-stop animated mesh gradient (purple `#7232f1` → blurple `#533afd` → magenta `#f44bcc` → blue `#0073e6` → cyan `#b4d8ff` → green `#00d66f`) overlaid on the canvas. The image renders as a fallback PNG (`wave-fallback-desktop.png`) with optional video / animated variants on capable browsers. The hero content (headline + supporting copy + CTAs) sits over this gradient with no scrim — the gradient is tuned so dark Slate text reads against the lighter areas.
**States:** Animated continuously when supported, falls back to static image.

### Startup-card gradient border (homepage variant)

**Status:** `current`
**Live source:** `https://stripe.com/` — startup-tier showcase cards
**Description:** Card with a radial-gradient border treatment. Two documented variants: `radial-gradient(circle, #f72df3, #533afd 33%, neutral-50 66%)` (magenta-to-blurple-to-neutral) and `radial-gradient(circle, #ffad00, #ff7600 33%, neutral-50 66%)` (amber-to-warm-to-neutral). Inner card stays white; the border is the chromatic anchor.
**States:** Static decorative variant.

### Globalisation locale picker (footer)

**Status:** `current`
**Live source:** `https://stripe.com/` — footer right corner
**Description:** Trigger button shows current locale ("Estonia (English)"). Click opens a regional-grouped list panel. Each region (Americas, Europe, Asia Pacific, etc.) is a `.locale-switcher__region-label`. Selected locale gets weight bold.
**States:** Trigger has the same states as the icon-button; panel inherits the popover treatment.

### "Read more stories" carousel (case studies)

**Status:** `current`
**Live source:** `https://stripe.com/customers/figma` — bottom of case study
**Description:** Horizontal carousel of related case-study cards. Each card has the customer logo, a one-line summary, a category tag. Carousel uses the same `.testimonial-carousel` mechanic as the homepage.
**States:** Auto-advance + manual prev/next.

### Tab control (in product pages)

**Status:** `current`
**Live source:** `https://stripe.com/` and `/payments` — feature-switcher tabs in the bento variants
**Description:** Horizontal row of tab triggers, each a `.hds-button` (text variant) at body-md weight 300. The active tab gets weight bold (or a 1px solid underline depending on variant). Tab content panels swap below the row with a fade transition.
**States:** `default` muted; `active` bold + underline; `hover` blurple text.

### Hero subtitle (animated word/phrase carousel)

**Status:** `current`
**Live source:** `https://stripe.com/` — homepage hero on some variants animates the trailing noun ("Accept payments, ... infrastructure to grow your revenue")
**Description:** A static headline with one word that fades through a list — implemented via opacity transition between absolutely-positioned spans. Each step holds for ~2-3s.
**States:** Animated continuously.

### Card border-radius progression (HDS scale)

**Status:** `current`
**Live source:** `https://stripe.com/` — observed across cards
**Description:** Radius scale: `xs: 2px` (tags, small inputs), `sm: 4px` (buttons), `md: 6px` (cards, inputs, modals), `lg: 16px` (large feature blocks), `xl: 32px` (full hero panels), `round: 99999px` (pills, switches). The 6px-on-cards / 4px-on-buttons asymmetry is a brand-recognisable detail — most B2B SaaS systems land at 8px buttons, 12px cards.
**States:** N/A — taxonomy entry rather than a discrete component.

## §5 Surface inventory

- `https://stripe.com/` — homepage; anchors the wave/mesh hero, customer-logo carousel, bento card pattern, stat band, top navigation, primary CTA.
- `https://stripe.com/payments` — product page; anchors secondary nav, embedded dashboard mockup (light variant + dark dashboard variant), feature card grid, code-block in marketing context.
- `https://stripe.com/billing` — billing product page; anchors invoice graphic, MRR chart, customer cards, dashboard mockup variants.
- `https://stripe.com/connect` — connect page; anchors transaction tables (Shopify / DoorDash / Lyft style mockups), fee-split graphics.
- `https://stripe.com/pricing` — pricing page; anchors the Standard / Custom tier columns and the tabular-numeral price treatment.
- `https://stripe.com/enterprise` — enterprise page; anchors photographic and gradient image bands, oversized headline weight 300.
- `https://stripe.com/customers` — customers index; anchors case-study card grid, hover-state behaviour, photo treatments.
- `https://stripe.com/customers/figma` — case-study detail; anchors logo lockup, breadcrumb, product-tag pills, stat band with `<sup>` glyph, pull quote, related-stories carousel.
- `https://stripe.com/atlas` — Atlas sub-brand; anchors the form-radio "card radio" pattern, globe geo widget, and a tighter form layout.
- `https://stripe.com/jobs` — Jobs landing; anchors photo cards, photographic treatments, alternative nav set.
- `https://stripe.com/sessions` — Sessions conference; anchors photographic hero, session-card grid pattern.
- `https://stripe.com/blog` — blog index; anchors body-set post cards with byline + date.
- `https://stripe.com/newsroom` and `/newsroom/brand-assets` — newsroom + brand resource; the brand-assets page confirmed "slate and blurple on light backgrounds, white on dark backgrounds — do not use any other colour for the wordmark."
- `https://docs.stripe.com/` — docs home; anchors sidebar, code-block dark canvas (`#1a2652`), inline-link `#5469d4`, docs-specific neutral palette.
- `https://docs.stripe.com/payments/quickstart` — docs prose page; anchors language-tab pattern, code-block with auth-aware annotations, inline docs link styles.
- `https://press.stripe.com/` — books arm; anchors editorial serif body, book-card text-first treatment (out of scope for HDS preview).

CSS bundles fetched in this cycle:
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/f577e6782212f424.css` — HDS core token defs (brand-25 through brand-975, neutral-0 through neutral-990, neutralDark, magenta, orange, lemon, ruby, success, error palettes; full type-scale tokens).
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/6d71d1064c88ecf1.css` — HDS component CSS (cards, buttons, navigation, stats, bento, mega-menu).
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/1af56c9f60dfbb03.css` — HDS layout chrome (footer, navigation flyouts, section backgrounds).
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/57f8c646aef0b9c7.css` — HDS graphics modules (invoicing-graphic, tax-graphic).
- `https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/css/01e4fd07fe2a2b12.css` — Font face declarations (sohne-var, SourceCodePro).
- `https://b.stripecdn.com/docs-statics-srv/assets/sail.205757ec34a2cc4626b9.css` — Sail (Stripe's older design system, still used in docs chrome).
- `https://b.stripecdn.com/docs-statics-srv/assets/docs.03612dca15058d0ce76a.css` — Docs-specific styles (code-block dark surface, sidebar treatment, syntax highlighting palette).

## §6 Notes

- **Three first-party design systems**, one brand. HDS (Houston) drives marketing. Sail (older, still alive) drives docs chrome. The Dashboard is its own product canvas (deep navy `#182659`). Together they constitute "Stripe" — there's no single canonical canvas, which is why this entry is `canonical-canvas: both`.
- **Body weight is light (300), not regular (400).** Every heading from `xxl` through `md` runs at weight 300, and so do body and input text. This is the single most unusual brand-typography decision in this catalog. Replicating Stripe at weight 400 instantly reads as off-brand. Bold (700) is reserved for: CTAs, eyebrows at `xxs`, table headers, inline strong emphasis.
- **Negative letter-spacing on display.** Headings carry `-0.025em` to `-0.01em` tracking. Combined with the light weight, this gives Stripe display its identifiable "thin and tight" register.
- **Tabular numerals everywhere numeric.** Stats, prices, transaction rows, percentages all use `font-feature-settings: "tnum"`. The `tabular-nums--tight` variant adds `-0.03em` letter-spacing for dense numeric tables.
- **Source Code Pro is the brand code typeface.** Distinct from many B2B brands that use a Mono variant of their display family — Stripe uses a different, narrower mono.
- **No cream or warm-canvas band in production.** The catalog's `--brand-canvas-cream` token is preview-only decoration. Stripe's neutral palette is consistently cool-blue-tinted (`#f6f9fc`, `#f8fafd`, `#e5edf5`) — not warm.
- **No oversized opening quotation glyph.** Pull quotes use restrained typography — Stripe doesn't lift `"` as a decorative element. Case-study quotes are weight 300 prose at a slightly bumped size, with attribution below.
- **The wordmark is monochrome-only.** Per brand-assets: slate or blurple on light, white on dark. The wordmark is not a multi-colour gradient — that's the hero treatment, not the mark.
- **Polarity-locked surfaces.** The Dashboard canvas (`#182659`) and docs code-block (`#1a2652`) stay fixed across theme — they don't flip with `[data-theme="dark"]`. The marketing site flips light → marketing-dark via the synthesised dark token block; the polarity-locked surfaces stay themselves.
- **Shadow colour is `rgba(50,50,93,...)`, not black.** A desaturated indigo-grey. Gives card edges a faint cool tint rather than greyed-out neutrality.
- **Stripe Press is its own surface.** Editorial serif body, book-grid layout. Not part of HDS — mark as out-of-scope when authoring previews against the main brand.
- **Brand-X-lift content to avoid:** customer logos in the carousel (Shopify, Slack, Substack, Classy, Goodtill, Ramp, Toast, NVIDIA, etc.); the literal pricing "1.5% + €0.25" figures and tier names "Standard / Custom"; case-study customer names and product features described in HDS mockups (Figma's "13+ million monthly active users", DoorDash's fee splits, Lyft's ride-share splits — these are real customer integrations).
- **Sub-brand divergence is minor.** Atlas and Sessions and Jobs all stay within HDS — they don't introduce their own palette. The sub-brand decoration is photographic (Jobs photos, Sessions banner) rather than palette-swap.
- **Wordmark fill is grey-on-grey at rest in customer carousels.** Customer logos in the homepage carousel are recoloured to `--hds-color-action-icon-disabled` (a quiet neutral grey) — Stripe doesn't show third-party brands in their full colour at the homepage scroll.

## §Known gaps

- **`dashboard.stripe.com`** is login-walled. Verification of the live Dashboard canvas, sidebar, transaction-table, KPI-card, and chart surfaces draws from the embedded mockups across `/payments`, `/billing`, `/connect`, plus token-anchored neutralDark-* values in the HDS palette. The exact resting-state Dashboard chrome (e.g. whether the sidebar's resting background is exactly `#0d1738` or `#101d51`) wasn't verifiable against the live product surface.
- **Chrome-devtools MCP tools were not available in this session.** No PNG screenshots saved to `temp/brand-refs/`. All findings derived from `WebFetch` + direct CSS-bundle inspection via `curl`. WebFetch returns markdown-converted HTML which loses computed-style detail and pseudo-elements; CSS bundles were the source of all numeric values.
- **Animation timing curves and durations** observed in transitions (`cubic-bezier(.25,1,.5,1)` is the brand-default easing) but not the full motion-token inventory. Stripe's motion vocabulary likely has named curves and durations defined elsewhere (possibly in a separate motion bundle not loaded on homepage).
- **Mobile-specific component variants.** Most observations are from the desktop breakpoint (940px+). The mobile mega-menu, mobile-specific button heights, and mobile bento layouts are documented in the CSS but not visually verified.
- **Stripe Press body type detail.** Confirmed editorial serif body, but the exact typeface (Georgia, Tiempos, Source Serif, Caslon, etc.) couldn't be identified from the markdown-converted fetch. Mark for inspection in a follow-up cycle if Press becomes a preview anchor.
- **Right-to-left and CJK adjustments.** HDS includes Chinese language variants (`:where(:lang(zh)) .hds-heading--xl { font-weight: 400 }`) that lift the headings from weight 300 to 400. The full multi-script type fallback chain is documented but not visually verified.
- **Atlas geo-widget animation.** The globe SVG was identified by structure but its rotation, hover-state, and tinted-jurisdiction behaviour weren't observed in motion.
