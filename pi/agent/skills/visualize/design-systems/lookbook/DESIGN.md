---
slug: lookbook
name: Lookbook
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: /Users/carl/Development/visualize/temp/refs/lookbook/spec.md
  - imagery: []   # chrome-devtools MCP unavailable; per AUTHORING-FLOW §102 fallback
  - principles: |
      Fashion-archive / industrial-utilitarian / lookbook register.
      Warm beige paper canvas, warm brownish-black ink, burnt red as
      single chromatic action colour, acid neon green as the only
      micro-interaction colour. Persistent SVG fractalNoise grain
      overlay reads as paper texture. Clash Grotesk 700 at compressed
      leading; General Sans body; mono for technical metadata
      (prices, SKUs, dates). Distinct from `monograph` (which is
      poster-campaign editorial with gradient blobs + multi-warm
      accents) and from `brutalist` (which is pure-white manifesto).
      Source: Superdesign's "Brutalist Style Ecommerce Page" library
      entry / "Season 04" by Shirley Lou.
canonical-canvas: light
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: low
  canonical_canvas: light
  best_for: |
    Use for high-impact, low-copy artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.

---

# Lookbook

## §1 Canonical canvas

Lookbook is light-only. The source spec declares a single-polarity warm-beige register with no dark-mode variant. The canvas is `#E3E2DE` — warm neutral beige, very low chroma, hue family near 95 (warm yellow-brown). Foreground ink is `#1B0E0D` — a deep warm brownish-black with measurable red chroma, intentionally warmer than a pure neutral near-black.

The register is identity-defined by the *combination* of canvas + a persistent SVG `fractalNoise` grain overlay at 0.08 opacity with `mix-blend-mode: multiply`. The grain reads as paper texture — the canvas without the grain reads as a flat beige fill and loses half the register. The overlay is therefore polarity-locked to this canvas and treated as canonical chrome, not as decorative atmosphere.

| Surface | Reference | Canvas | Notes |
|---|---|---|---|
| All surfaces | spec.md §"Canonical canvas" | `#E3E2DE` warm beige | Single canvas across hero / manifesto / grid / footer. The noise overlay is the canvas's identity-defining sibling and never absent. |

There is no dark-mode mirror declared. The spec notes that a future dark variant would *not* be dark beige — it would be a dark-warm-charcoal canvas with the neon brightened to compensate and the noise opacity dropped (the same grain reads as digital noise on dark rather than as paper texture). That synthesis is out of scope for the initial cycle and not authored here.

## §2 Palette

The system declares four chromatic values verbatim in the spec. Every value in this section traces to spec.md §"Palette" unless marked `(synthesised utility neutral)` — those are zero-chroma helpers along the canvas's warm hue family, used only for muted body text, hairlines, and the muted surface slot that shadcn-core requires but the spec doesn't enumerate.

### Brand primary

- `--primary`: `oklch(0.5398 0.1964 32.54)` (= `#C72A09`). The single chromatic action colour — burnt red. Used as: CTA button fill, hero-headline colour-split second line, category-divider type fill at large scale, scrollbar thumb, key chip background. The spec calls this "Primary accent / Action" — the registers' only fill colour beyond canvas + foreground. Source: spec.md §"Palette" row 3.

### Documented secondary brand colours

- `--brand-accent-neon`: `oklch(0.8290 0.2745 141.53)` (= `#31EF07`). Acid green. **Never used as a primary fill** — it's a state colour, not a brand chroma. Used as: 2px underline scale-in on link hover (the register's signature micro-interaction), Neon Interaction Badge background on product cards, `::selection` background, focus-ring colour on form inputs, active-state flip on tag/chip components. Source: spec.md §"Palette" row 4 + §"Components" entries 2 & 3 + §"Motion".

The two-accent palette (burnt-red + acid-green) is the *register* move. Collapsing to one accent kills the dissent; adding warm-orange or pink turns it into monograph; adding any chroma to the foreground turns it into another system entirely.

### Canvas + neutrals

- `--background`: `oklch(0.9124 0.0055 95.10)` (= `#E3E2DE`). Warm beige paper canvas. Source: spec.md §"Palette" row 1.
- `--foreground`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). Warm brownish-black ink. The chroma at hue 24 is measurable — this is intentionally not a pure neutral black. Source: spec.md §"Palette" row 2.
- `--card`: `oklch(0.9124 0.0055 95.10)` (= `#E3E2DE`). Mirrors `--background`. The register rejects card borders and elevated fills; product cards are defined by whitespace + grayscale photography + mono captions, not by surface elevation.
- `--card-foreground`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). Mirrors `--foreground`.
- `--popover`: `oklch(0.9124 0.0055 95.10)` (= `#E3E2DE`). Mirrors `--background`.
- `--popover-foreground`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). Mirrors `--foreground`.
- `--muted`: `oklch(0.86 0.006 95)` (= `#d2d1cd`). `(synthesised utility neutral)` — slightly darker beige along the canvas hue family, for code-block fills and muted card chrome. The spec doesn't enumerate a muted-surface slot; this is the lowest-chroma derivation that holds the register.
- `--muted-foreground`: `oklch(0.42 0.012 24)` (= `#534b4a`). `(synthesised utility neutral)` — the mono caption / technical-metadata ink. Lives along the foreground's warm hue 24 at intermediate lightness.
- `--accent`: `oklch(0.8290 0.2745 141.53)` (= `#31EF07`). Mirrors `--brand-accent-neon`. Routes shadcn `--accent` consumers (focus rings, hover states) to the register's neon dissent colour rather than to a separate hue.
- `--accent-foreground`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). Brown-black ink on the neon — the spec explicitly pairs `#31EF07` with `#1B0E0D` text in the Neon Interaction Badge entry.
- `--secondary`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). Foreground-fill for any secondary CTA / fill role that isn't the burnt-red primary.
- `--secondary-foreground`: `oklch(0.9124 0.0055 95.10)` (= `#E3E2DE`). Canvas on foreground.
- `--destructive`: `oklch(0.5398 0.1964 32.54)` (= `#C72A09`). Mirrors `--primary`. The register has one chromatic action colour; destructive states use it. The semantic difference is communicated by copy and iconography, not by hue.
- `--destructive-foreground`: `oklch(0.9124 0.0055 95.10)` (= `#E3E2DE`). Canvas on primary.
- `--border`: `oklch(0.55 0.01 24)` (= `#776f6f`). `(synthesised utility neutral)` — the defined hairline weight, along the foreground hue 24 at mid-lightness. The register uses hairlines structurally (input bottom-border, manifesto block separator) rather than card edges; weight matters more than colour here.
- `--input`: `oklch(0.55 0.01 24)` (= `#776f6f`). Mirrors `--border`. Inputs render as borderless single-bottom-hairline.
- `--ring`: `oklch(0.8290 0.2745 141.53)` (= `#31EF07`). The focus ring is the register's neon dissent — a 2px outline in `--brand-accent-neon` rather than a tinted-border treatment.

### Polarity-locked surfaces

Lookbook is single-polarity (light-canonical, no documented dark). Per AUTHORING.md's single-polarity guidance, the only surfaces that stay canvas-locked are the ones that carry the register's identity-defining warm-paper character — the canvas itself, its paired ink, and the noise overlay opacity. Those tokens:

- `--brand-canvas-paper`: `oklch(0.9124 0.0055 95.10)` (= `#E3E2DE`). The warm-beige paper canvas, locked to light. Source: spec.md §"Palette" row 1.
- `--brand-on-paper`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). The brown-black ink that pairs with the locked canvas. Source: spec.md §"Palette" row 2.
- `--brand-noise-overlay-opacity`: `0.08`. The persistent fractalNoise grain opacity — pinned to the spec value. Higher values read as digital filter, lower values lose the paper-texture identity. Source: spec.md §"Components" entry 1.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.78 0.005 95)` (= `#b8b7b4`). `(synthesised utility neutral)` — faint divider for section breaks under the manifesto block, between product-grid rows. Hue 95 keeps the divider in the canvas family.
- `--brand-hairline-strong`: `oklch(0.55 0.01 24)` (= `#776f6f`). `(synthesised utility neutral)` — defined hairline for input bottom-borders, footer-block separators. Same value as `--border`.

### Brand-specific ink lineage

- `--brand-ink-strong`: `oklch(0.1819 0.0226 24.36)` (= `#1B0E0D`). Mirrors `--foreground`. The brand's documented primary ink role.
- `--brand-ink-mute`: `oklch(0.32 0.018 24)` (= `#3c2f2e`). `(synthesised utility neutral)` — secondary body-text role. Along the foreground hue 24 at intermediate lightness — keeps the warm-brown character without dropping to the mono-caption-mute lightness.

### Drift vs `tokens.css`

Not applicable. This is the first authoring cycle for this slug; there is no prior `tokens.css` to drift against.

## §3 Typography

The system declares three roles in spec.md §"Typography". All three are identity-defining — Clash Grotesk for display is the obvious register move, but General Sans for body and a mono role for technical metadata are *also* register-defining and are not interchangeable with the catalog's default font stack.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Clash Grotesk | 700 | fluid (hero: 13.5vw; category divider: 8-13vw; section title: clamp 3rem-6rem) | `0.85` (general) / **`0.75` (Split-Indented Headline only — see §4 override)** | `-0.04em` (general) / **`-0.05em` (Split-Indented Headline only — see §4 override)** |
| Heading | Clash Grotesk | 700 | clamp(1.5rem, 3vw, 2.5rem) | `0.9` | `-0.03em` |
| Title | Clash Grotesk | 500-700 | clamp(1.125rem, 1.5vw, 1.5rem) | `1.1` | `-0.02em` |
| Body | General Sans | 400-500 | 1rem | `1.5` | `0` |
| Caption | General Sans | 400 | 0.8125rem | `1.4` | `0.02em` |
| Mono | JetBrains Mono (or IBM Plex Mono / system mono) | 400 | 0.8125rem | `1.4` | `0` |

**The mono role is required, not optional.** This is the register's quiet move and the most easily lost-in-translation aspect of lookbook. Prices, SKUs, dates, season tags, sizes, weights, coordinates — all the technical-utilitarian metadata that lives alongside the editorial photography is mono. Without the mono role, the register collapses into a generic Clash-Grotesk-on-paper editorial layout and loses the industrial-archive character that distinguishes it from monograph. Fontshare doesn't ship a mono in the same family as Clash; the design system picks JetBrains Mono (well-shaped, broadly available, geometric in a way that holds against Clash Grotesk's narrow grotesque proportions) as the canonical choice with IBM Plex Mono and system mono as register-acceptable fallbacks. Templates may pick any of the three; they should not substitute a humanist mono like Cousine or a slab like Source Code Pro, both of which break the register.

Clash Grotesk and General Sans both load from the Fontshare CDN (`api.fontshare.com/v2/css?f[]=clash-grotesk@700,500&f[]=general-sans@400,500`). Per AUTHORING.md's "system-default-font" guidance, both families are declared as canonical and listed first in their respective font stacks, with `var(--font-sans)` and `var(--font-mono)` fallbacks. JetBrains Mono can ride the catalog's existing Google Fonts loader (it's already in the catalogue's loader set per AUTHORING.md §386).

**Clash Display vs Clash Grotesk — the choice is deliberate.** Both are in the Clash family. Display is the headline-optimized cut (broader terminals, more dramatic compression, intended for huge type at hero scale). Grotesk is the workhorse cut (narrower terminals, less compressed, intended to work at heading + subheading + lead-body scales). Monograph uses Display because its hero is *the* moment; lookbook uses Grotesk because every section uses big type at varying scales (manifesto, category dividers, product names) and needs the workhorse cut. Substituting Display for Grotesk in this register is a wrong move — the terminals get too broad at title scale and the type starts reading as poster rather than as editorial.

## §4 Component vocabulary

Three components are declared verbatim in the source spec (Texture Overlay, Neon Interaction Badge, Split-Indented Headline). The remaining entries are derived from the register's principles per AUTHORING-FLOW §139 — each entry below cites either the spec section or the principle-driven derivation rationale.

### Texture Overlay

**Status:** `current`
**Source:** spec.md §"Components" entry 1 — declared verbatim
**Description:** Full-viewport SVG noise grain that unifies the register. Inline SVG `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/></filter>` carries the noise. Applied to a `position: fixed; inset: 0; pointer-events: none; z-index: 1` div with the filter referenced, `opacity: 0.08`, `mix-blend-mode: multiply`. Over the warm-beige canvas, the result reads as paper texture rather than as a digital filter. The overlay is identity-defining; removing it collapses the register.
**States:** static — no hover / pressed / focus variants. The grain is render-once.
**Reduced-motion:** no override needed; the grain is static.
**Performance:** SVG turbulence is expensive to render at 100vw × 100vh. `will-change: opacity` only when animating (which is rare to never). Static rendering is the default and fastest.

### Neon Interaction Badge

**Status:** `current`
**Source:** spec.md §"Components" entry 2 — declared verbatim
**Description:** Sharp-edged high-visibility utility badge for product status or quick actions. Rectangle component with zero border-radius. Background `var(--brand-accent-neon)` (= `#31EF07`). Text 10px General Sans 700 UPPERCASE in `var(--foreground)` (= `#1B0E0D`), letter-spacing 0.08em. Positioned absolutely top-right inside a product card or photography container. Default `opacity: 0`; the badge appears on container hover with a 300ms ease-out fade-in.
**States:** `default` (opacity 0, hidden) / `container-hover` (opacity 1, visible). No pressed / focus / disabled — the badge is decorative chrome on hovering its parent, not an interactive primitive itself.
**Reduced-motion:** transition disabled; badge renders at static opacity 1 on container hover with no fade.

### Split-Indented Headline

**Status:** `current`
**Source:** spec.md §"Components" entry 3 — declared verbatim
**Description:** Hero header treatment that uses large-scale indentation for visual tension. Rendered as a single `<h1>` semantic with a `<br>` (or two `<span>` children). Line 1 left-aligned; line 2 indented `margin-left: 20vw`. Either line can carry the `var(--primary)` (burnt-red) colour split; typically the second line "drops" in red against the first line's foreground brown-black.
**Critical override:** The display role's defaults declared in §3 are leading `0.85` and tracking `-0.04em`. The Split-Indented Headline component overrides those at **leading `0.75` and tracking `-0.05em`** — tighter on both axes. The treatment is signature-specific; the override does not propagate to other display elements. Source: spec.md §"Components" entry 3 (final paragraph notes the headline-specific leading and tracking).
**Sizing:** font-size `13.5vw` per spec; templates can dial to `clamp(4rem, 13.5vw, 16rem)` for sane caps on ultra-wide displays.
**States:** static — no hover / pressed / focus.
**Reduced-motion:** no animation declared; render-once typography.

### Button — primary

**Status:** `current`
**Source:** derived from register principles — spec.md §"Components" §"Layout primitives" §"Motion" together imply this shape
**Description:** Rectangular, zero border-radius. Background `var(--primary)` (= `#C72A09` burnt-red). Text `var(--background)` (= `#E3E2DE` warm beige) in General Sans 500-700 UPPERCASE, letter-spacing 0.05em. Padding 1rem 1.5rem (44px min-height for WCAG AA touch target per AUTHORING.md polish-pass). No fill animation — the simplicity reinforces the industrial register.
**States:** `default` (burnt-red fill, beige text), `hover` (foreground brown-black fill, beige text — a polarity flip rather than a tint shift), `focus-visible` (2px `var(--ring)` neon outline + 2px offset), `pressed` (foreground brown-black fill at static opacity 0.95), `disabled` (canvas fill with `--brand-hairline-strong` outline, `--muted-foreground` text).
**Reduced-motion:** hover polarity flip transitions disabled; state changes are instant.

### Button — secondary / ghost

**Status:** `current`
**Source:** derived from register principles — spec.md §"Motion" link-hover behaviour generalizes to type-only buttons
**Description:** Borderless, type-only. Background transparent. Text `var(--foreground)` in General Sans 500 UPPERCASE, letter-spacing 0.05em. Padding 1rem 1.5rem (44px min-height). Hover triggers the neon underline scale-in (2px `var(--brand-accent-neon)` underline that scales from 0 → 1 with transform-origin left, 350ms cubic-bezier(0.165, 0.84, 0.44, 1)).
**States:** `default` (no underline), `hover` (underline writes itself, transform-origin left), `focus-visible` (2px `var(--ring)` neon outline + 2px offset, underline also visible), `pressed` (underline at static scaleX 1), `disabled` (text at `--muted-foreground`, no hover underline).
**Reduced-motion:** underline transition disabled; underline writes statically at full width with no animation.

### Card — borderless product card

**Status:** `current`
**Source:** derived — spec.md §"Why a separate design system" notes "borderless grid" as a monograph-shared property, and §"Components" entries imply photography-led product cards
**Description:** No border, no background fill, no radius. Internal structure is photography on top (filter: grayscale(1) default → grayscale(0) on hover, transform: scale(1.05) on hover at 400ms ease-out), with a mono technical-metadata caption below (name / SKU / season / price). The Neon Interaction Badge component overlays the top-right corner on hover.
**States:** `default` (greyscale image, badge hidden), `hover` (image scales to 1.05 with colour reveal, badge fades in), `focus-visible` (2px `var(--ring)` neon outline around the photography container at 2px offset).
**Reduced-motion:** image scale + greyscale transitions disabled; image stays in greyscale; badge appears at static opacity on hover with no fade.

### Manifesto block

**Status:** `current`
**Source:** derived — spec.md §"Layout primitives" declares manifesto as "the register's editorial pulse"
**Description:** Full-width body-scale prose block, larger leading than typical body (`line-height: 1.7` instead of `1.5`), often paired with a mono section eyebrow above. Body text `var(--foreground)`, eyebrow `var(--primary)` (burnt-red), uppercase General Sans 500 with letter-spacing 0.08em. No box, no border — the prose lives directly on the noise-textured canvas.
**States:** static.
**Critical:** without a manifesto block between hero and product grid (or wherever the editorial pulse lands in a non-product layout), lookbook collapses into a thin chrome-on-photography layout. The block is not optional for any non-trivial template.

### Category divider

**Status:** `current`
**Source:** derived — spec.md §"Layout primitives" calls these out as "massive screen-filling typography dividers"
**Description:** Full-width Clash Grotesk 700 type break at 8-13vw scale, often coloured `var(--primary)` (burnt-red). Used between major sections (hero → manifesto, manifesto → grid, grid → footer). The type itself is the divider — no horizontal rule, no card chrome. The display-role defaults (leading `0.85`, tracking `-0.04em`) apply at this scale, not the Split-Indented Headline overrides.
**States:** static.

### Nav link

**Status:** `current`
**Source:** derived — spec.md §"Motion" link-hover behaviour applies to nav specifically
**Description:** Uppercase General Sans 500, letter-spacing 0.05em. Text `var(--foreground)`. Hover triggers the 2px neon-green underline scale-in described in spec.md §"Motion".
**States:** `default` (no underline), `hover` (underline scales in from left, 350ms cubic-bezier(0.165, 0.84, 0.44, 1)), `focus-visible` (2px `var(--ring)` neon outline + 2px offset), `active` (underline at static scaleX 1).
**Reduced-motion:** underline animation disabled; underline writes statically.

### Mono technical-metadata label

**Status:** `current`
**Source:** derived from §3 typography "mono role is required, not optional"
**Description:** Small uppercase mono (JetBrains Mono 400) for prices, SKUs, sizes, dates, coordinates, season tags. Font-size 0.8125rem, letter-spacing 0.05em, `var(--muted-foreground)` for secondary metadata or `var(--foreground)` for prominent (price, season). Sits alongside or below editorial photography. **This is the register's quiet move** — every place a generic editorial system would reach for a sans caption, lookbook reaches for mono.
**States:** static.

### Input — text

**Status:** `current`
**Source:** derived from register principles — borderless except hairline, neon focus ring
**Description:** Borderless except single bottom hairline (`--brand-hairline-strong`). Background transparent. Text `var(--foreground)` in General Sans 400, 1rem. Padding 0.75rem 0; the bottom hairline carries the input's edge. Placeholder `var(--muted-foreground)`.
**States:** `default` (hairline at `--brand-hairline-strong`), `hover` (hairline darkens to `--foreground`), `focus` (hairline becomes 2px `var(--brand-accent-neon)` neon), `error` (hairline becomes 2px `var(--primary)` burnt-red), `disabled` (hairline at `--brand-hairline-soft`, text at `--muted-foreground`).

### Tag / chip

**Status:** `current`
**Source:** derived from register principles — rectangular, mono caps, active-state neon flip
**Description:** Rectangular, zero border-radius. Default state: background transparent, 1px `var(--foreground)` border, text `var(--foreground)` in mono uppercase 0.75rem with letter-spacing 0.08em. Padding 0.25rem 0.75rem. Active state flips to background `var(--foreground)`, text `var(--brand-accent-neon)` — the rare place the neon appears as text colour rather than as a structural mark.
**States:** `default` (outlined, foreground text), `hover` (background `--muted`), `active` (foreground fill + neon text), `disabled` (border + text at `--muted-foreground`).

### Eyebrow / section label

**Status:** `current`
**Source:** derived — spec.md §"Manifesto block" pairs eyebrow with section label
**Description:** Uppercase General Sans 500 letter-spaced 0.08em. Font-size 0.8125rem. Coloured `var(--primary)` (burnt-red) for prominent section markers (above manifesto blocks, above category dividers), or `var(--muted-foreground)` for quieter labels. No background, no border.
**States:** static.

### Selection (`::selection`)

**Status:** `current`
**Source:** spec.md §"Custom selection + scrollbar" — register-implied derivation
**Description:** `background: var(--brand-accent-neon); color: var(--foreground);` — acid neon green selection background with brown-black text. The selection is the rare place an interactive surface flips to neon as a fill rather than as an outline. The contrast pair is high enough to read clearly (neon at L=0.83, foreground at L=0.18).
**States:** static.

### Scrollbar

**Status:** `current`
**Source:** spec.md §"Custom selection + scrollbar" — register-implied derivation
**Description:** 8px width. Track `var(--background)` (warm beige). Thumb `var(--primary)` (burnt-red). Thumb-hover lightens to foreground brown-black. WebKit-only customization (`::-webkit-scrollbar*` rules); Firefox uses `scrollbar-color: var(--primary) var(--background)` and `scrollbar-width: thin`.
**States:** `default` (burnt-red thumb), `thumb-hover` (foreground brown-black thumb).

### Image — grayscale-to-colour reveal

**Status:** `current`
**Source:** spec.md §"Motion" — image hover treatment
**Description:** Photography defaults to `filter: grayscale(1)`. Hover state transitions to `filter: grayscale(0)` with `transform: scale(1.05)` simultaneously, both at 400ms ease-out. Pairs with the Neon Interaction Badge fade-in for product card composition.
**States:** `default` (grayscale, scale 1), `hover` (full colour, scale 1.05).
**Reduced-motion:** both transitions disabled; image stays in greyscale at scale 1 on hover.

## §5 Surface inventory

This system has no live brand site to sample. The reference material is the spec text at `/Users/carl/Development/visualize/temp/refs/lookbook/spec.md`, which derives from Superdesign's "Brutalist Style Ecommerce Page" library entry (`https://app.superdesign.dev/library/brutalist-style-ecommerce-page`) authored by Shirley Lou. The spec captures the *register* and *vocabulary* — palette, typography, noise overlay, neon-green micro-interactions, split-indented hero typography — independent of the source's specific e-commerce content. The visualize catalog renders this register against the Halcyon convention's neutral content.

- `temp/refs/lookbook/spec.md` — the source for every chromatic value, typography role, declared component, and motion specification documented above.

## §6 Notes

**Polarity locks.** The warm-beige canvas + brown-black ink + persistent noise overlay are identity-defining and don't flip. Any future dark-mode variant requires re-derivation per the spec's §"Canonical canvas" guidance (dark-warm-charcoal canvas, brightened neon, dropped grain opacity) — not a tokens-only inversion.

**Two-accent palette is the register move.** Burnt-red + acid-green together carry the register. Collapsing to one accent loses the dissent character. Adding warm-orange or pink turns it into monograph. The accent count is exactly two, no more, no fewer.

**The mono role is identity-defining, not utility chrome.** Templates that swap mono for a generic sans caption are register-broken. JetBrains Mono / IBM Plex Mono / system mono are the three acceptable choices; humanist monos (Cousine) and slab monos (Source Code Pro) break the register.

**Split-Indented Headline overrides the display defaults.** The display role declares leading `0.85` + tracking `-0.04em` *generally*. The Split-Indented Headline component declares leading `0.75` + tracking `-0.05em` *specifically*. Don't unify these — the headline-specific tightness carries the signature treatment and shouldn't propagate to category dividers or section titles.

**Manifesto block is not optional for non-trivial templates.** The block carries the register's editorial pulse. Without it between hero and any "browse / list" section, lookbook reads as a thin chrome-on-photography skin rather than as an industrial-fashion-archive register.

**Right-shaped templates** per the spec's genre-reflex guidance: `one-pager`, `release-announcement`, `case-study`, `resume-bio`, `report`. Acceptable for `pitch-deck` when the brand being pitched is fashion / streetwear / luxury / photography. **Wrong-shaped** for: `runbook`, `changelog`, `dashboard`, `api-reference`, `status-page`, `meeting-notes`, `org-chart`, `postmortem` — operationally dense templates where the noise overlay hurts comprehension and the acid-green dissent reads as alarm rather than character.

**Source attribution naming.** The source's brand name is "Season 04," which is e-commerce-specific. The catalog name `lookbook` names the artifact type the register fits rather than the source's brand name. Don't reintroduce "Season 04" as a Halcyon-convention placeholder; use the catalog slug per AUTHORING.md §205.

**Distinct from `monograph`.** Lookbook and monograph share the warm-paper canvas family (lookbook's `#E3E2DE` is nearly identical to monograph's `#E4E2DD`) but diverge on every other axis: foreground hue (brown-warm vs near-neutral black), accent count (two vs three), accent character (single chromatic action + neon micro-interaction vs multi-warm painterly), overlay treatment (persistent SVG grain vs soft-blurred gradient blobs), display cut (Clash Grotesk vs Clash Display), body family (General Sans vs Satoshi), signature CTA hover (neon underline scale-in vs slide-fill white-from-left). The shared canvas is the only true cousin axis; everything else is a deliberate divergence.

**Distinct from `brutalist`.** Lookbook is not a beige variant of brutalist. Brutalist is pure-white manifesto / xerox / zine — single-shout cadmium red, no overlays, weight-900 UPPERCASE, hard-drop flat-offset shadows. Lookbook is warm-beige industrial / fashion-archive / lookbook — burnt-red action + neon micro-interaction dissent, persistent grain overlay, Clash Grotesk at compressed leading, no shadows. They occupy different register territories.

## §Known gaps

No surfaces sampled this cycle — there is no live brand site for this system. Per AUTHORING-FLOW §189, the spec's declared values are sufficient and the dispatching agent could not capture screenshots to disk (chrome-devtools MCP unavailable in the sandbox; the claude-in-chrome alternative does not persist files per AUTHORING-FLOW §102's restriction).

The source preview is available at `https://app.superdesign.dev/library/brutalist-style-ecommerce-page` (right pane) for any future reference. A subsequent cycle with chrome-devtools MCP available could capture a single reference screenshot of the source's rendered preview to validate the register-character interpretation, but the spec's verbatim text + declared palette + declared typography are sufficient for the initial author cycle and tokens.css derivation in Step 2.

A future dark-mode derivation is out of scope per §1; the spec notes the natural inversion (dark-warm-charcoal canvas, brightened neon, dropped grain opacity) but the system ships as light-only until a real artifact requires dark.
