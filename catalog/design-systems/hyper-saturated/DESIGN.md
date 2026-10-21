---
slug: hyper-saturated
name: Hyper-Saturated Fluid
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/hyper-saturated/raw.md (Hyper-Saturated Fluid spec — Zhou Jason, Superdesign library)
  - principles: high-saturation single-colour dominance balanced by deep-onyx void sections; organic liquid sectioning over straight horizontals; glassmorphic floating data cards; massive minimalist hero typography; pill-shaped interactives at extreme radii
canonical-canvas: both
selection:
  mood: [cyberpunk, gradient]
  tone: [dramatic, bold]
  formality: low
  density: medium
  canonical_canvas: both
  best_for: |
    Use for balanced artifacts that need a dramatic, bold register with cyberpunk, gradient visual cues. Strongest when the reference can preserve its both canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Hyper-Saturated Fluid

A register-family invention. There is no live brand site to navigate; the system is documented as a stylistic pattern (Superdesign library entry, `hyper-saturated-fluid`) rather than as a deployed product surface. The vocabulary below is derived directly from that spec — palette, ladder, components, motion — with each value cited against the spec sections it comes from.

## §1 Canonical canvas

The register is dual-polarity by design — the spec's core tenet is that a single high-saturation **shout** colour dominates ~60% of the viewport and the remaining ~40% is a deep-onyx **void**. Both polarities appear on the same page, alternated by organic liquid sectioning rather than by theme switching. The `both` value of `canonical-canvas` records that intent: neither the shout band nor the void band is a marquee — both ship together as the system's signature.

| Surface | Source | Canvas | Notes |
|---|---|---|---|
| Liquid hero band | spec §Components — "The 'Liquid' Hero Section" | Cyber Yellow `#FDE047` (~60% viewport) | Asymmetrical `rounded-b-[120px]` (bottom-right) + `rounded-bl-[40px]` (bottom-left) wave. Massive headlines in black, left-aligned. No gradients. |
| Void section | spec §Components — "The Dark Void" tenet + "Logo Ticker in the Void" | Deep Onyx `#0A0A0A` (~40% viewport) | Logo ticker + secondary content. Charcoal `#171717` panels for nested surfaces. |
| Glassmorphic overlay | spec §Components — "The 'Glassmorphic' Data Card" | Floating frosted layer | `bg-white/10` + `backdrop-blur-2xl` + 1px white border at 20% opacity + `shadow-2xl`. Sits on top of the shout band or at the seam between yellow and void. |
| Transition band | spec §Components — "High-Vis Trust Badges" | Where the yellow bleeds into the black | Pill-shaped badges with cyber-yellow accents on charcoal substrate. |

The dual-polarity intent rules out "light vs dark mode" as a meaningful distinction. The `[data-theme="dark"]` block flips the supporting neutrals (body card, muted surface) but the shout-on-void contract holds on both modes.

## §2 Palette

Each hex below is verbatim from the spec; OKLCH equivalents computed via vendored culori (`visualize/scripts/vendor/culori.mjs` — `converter('oklch')`).

### Brand primary — the shout colour

- `--primary`: `oklch(0.9052 0.1657 98.11)` (= `#FDE047`). Source: spec §Design Token System — "Primary (Cyber Yellow): #FDE047 (Vibrant, high-vis yellow). This is the 'Hero' color."
- The spec explicitly forbids gradients on the shout colour ("DON'T use gradients on the 'shout' color; keep it a flat, vibrant punch"). The token is single-stop; downstream consumers never mix it with `linear-gradient` or `radial-gradient`.
- Same OKLCH carries `--ring`, `--sidebar-primary`, `--sidebar-ring` per the primary-family asymmetry rule.

### Documented secondary brand colours

The spec does not enumerate secondary brand colours. It names the shout colour family in the abstract ("Cyber Yellow, Neon Green, or Electric Blue") and recommends a single choice; this system picks Cyber Yellow. No secondary chromatic accent is documented, so no `--brand-accent-<name>` token is synthesised. Status / semantic colours (positive, warning, destructive) are drawn from the neutral void register where the spec allows ("Deep Gray #262626 for UI elements inside the dark void") and from a green/red pairing standard to fintech-register dashboards.

### Canvas + neutrals

The spec specifies five mandatory neutrals across the shout / void register:

- `--background`: `oklch(0.9851 0 0)` (= `#FAFAFA`). (synthesised — the spec defines no light canvas; this system pairs the shout band with a near-white canvas at `:root` to host token-demo sections cleanly. The shout-on-void dominant pattern still applies inside the hero + signature surfaces.)
- `--foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Source: spec §Design Token System — "Background (Deep Onyx): #0A0A0A (Rich black-gray)." Reused as foreground on light canvas because the spec keeps text strictly black on the shout band.
- `--card`: `oklch(1 0 0)` (= `#FFFFFF`). (synthesised — neutral light-canvas card for token-demo sections.)
- `--card-foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Mirrors `--foreground`.
- `--popover`: `oklch(1 0 0)` (= `#FFFFFF`). (synthesised — mirrors `--card`.)
- `--popover-foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`).
- `--muted`: `oklch(0.9702 0 0)` (= `#F5F5F5`). (synthesised — utility neutral for muted-surface fills in token-demo bands.)
- `--muted-foreground`: `oklch(0.3715 0 0)` (= `#404040`). (synthesised — utility neutral, body-mute role; chroma ≈ 0.)
- `--accent`: `oklch(0.9052 0.1657 98.11)` (= `#FDE047`). Routes to the shout colour so accent-named utility consumers (chips, focus highlights) carry the same brand stamp.
- `--accent-foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Locked black; the spec keeps every cyber-yellow surface paired with black text.
- `--secondary`: `oklch(0.9219 0 0)` (= `#E5E5E5`). (synthesised — light-canvas secondary surface for inputs / outline buttons.)
- `--secondary-foreground`: `oklch(0.1448 0 0)` (= `#0A0A0A`).
- `--destructive`: `oklch(0.5771 0.2152 27.33)` (= `#DC2626`). (synthesised — chroma neutral for destructive action; outside the documented palette.)
- `--destructive-foreground`: `oklch(1 0 0)` (= `#FFFFFF`).
- `--border`: `oklch(0.9219 0 0)` (= `#E5E5E5`). (synthesised — hairline against light canvas.)
- `--input`: `oklch(0.9219 0 0)` (= `#E5E5E5`). (synthesised — mirrors `--border`.)
- `--ring`: `oklch(0.9052 0.1657 98.11)` (= `#FDE047`). Tracks `--primary`.

### Polarity-locked surfaces

The void band is polarity-locked — it does not flip with theme, because the void is a deliberate void in both modes:

- `--brand-canvas-void`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Source: spec — "Background (Deep Onyx): #0A0A0A (Rich black-gray)." Locked across `:root` and `[data-theme="dark"]`.
- `--brand-canvas-shout`: `oklch(0.9052 0.1657 98.11)` (= `#FDE047`). Source: spec — "Primary (Cyber Yellow): #FDE047." Locked. The hero band carries this fill in both modes; only the surrounding canvas + cards flip.
- `--brand-surface-charcoal`: `oklch(0.2046 0 0)` (= `#171717`). Source: spec — "Surface (Charcoal): #171717 (For secondary dark panels)." Locked. Nested panels inside the void; cards floating on void.
- `--brand-surface-onyx-elevated`: `oklch(0.2686 0 0)` (= `#262626`). Source: spec — "Deep Gray: #262626 (For UI elements inside the dark void)." Locked. Tertiary surface; inputs inside void.
- `--brand-on-void`: `oklch(1 0 0)` (= `#FFFFFF`). Source: spec — "Pure White: #FFFFFF (For primary text on dark backgrounds and glass borders)." Locked. Foreground on every void surface.
- `--brand-on-shout`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Source: spec — "Massive headlines in black" + the recurring black-text-on-yellow pattern across components. Locked. Foreground on every cyber-yellow surface.

### Glass surface

The spec defines the glassmorphic overlay as a translucent fill, not a solid colour. The OKLCH value below is computed for the resting state (`bg-white/10` over a neutral mid-canvas); the token itself ships with the alpha baked in:

- `--brand-glass-fill`: `oklch(1 0 0 / 0.10)`. Source: spec — "bg-white/10 with backdrop-blur-2xl."
- `--brand-glass-border`: `oklch(1 0 0 / 0.20)`. Source: spec — "1px white border at 20% opacity" + "border border-white/20."
- `--brand-glass-blur`: `24px`. Source: spec — `backdrop-blur-2xl` (Tailwind 2xl = 24px filter blur).

### Hairlines / dividers

The spec does not introduce a separate hairline token — dividers fall out of the surface contract. The light-canvas hairline tracks `--border`; the void-canvas hairline routes to a low-alpha white:

- `--brand-hairline-on-void`: `oklch(1 0 0 / 0.10)`. Source: derived from the spec's glassmorphic border convention applied to a divider role.
- `--brand-hairline-soft`: `oklch(0.9219 0 0)` (= `#E5E5E5`). Mirrors `--border`. Used in light-canvas token-demo bands.

### Body text neutrals

The spec keeps body text strictly black on yellow and strictly white on onyx. Utility neutrals for muted body text are chroma ≈ 0 and may be AA-tuned per the utility-neutral exception:

- `--brand-body`: `oklch(0.1448 0 0)` (= `#0A0A0A`). Light-canvas body.
- `--brand-body-muted`: `oklch(0.3715 0 0)` (= `#404040`). Light-canvas muted-body neutral.
- `--brand-on-void-mute`: `oklch(0.7155 0 0)` (= `#A3A3A3`). Void-canvas muted-body neutral.

### Drift vs `tokens.css`

This is a spec-derived system; there is no prior `tokens.css` to drift against. The drift section is irrelevant per the spec-derived-mode rule in AUTHORING-FLOW.md §193.

## §3 Typography

The spec mandates a geometric sans-serif: **Inter (Google Fonts)** or **General Sans (Fontshare)**. Inter is the primary choice — it loads via the Google Fonts loader already attached to the preview shell, no additional vendor preconnect needed. General Sans appears in the stack as a documented alternate for projects that want a sharper geometric register, but the implementation here doesn't need it.

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (hero headline) | Inter, General Sans | 700 (bold) | `clamp(3.5rem, 9vw, 7rem)` (≈ Tailwind `text-6xl` → `text-8xl`) | 0.92 | `-0.03em` (tight) |
| Heading (section title) | Inter, General Sans | 700 | `clamp(2rem, 5vw, 3.5rem)` | 0.95 | `-0.025em` |
| Title (card title) | Inter, General Sans | 600 (semibold) | 22-24px | 1.15 | `-0.02em` |
| Sub-header | Inter | 500 (medium) | 20px (≈ `text-xl`) | 1.35 | normal; `opacity-80` per spec |
| Body | Inter | 400 | 14px (≈ `text-sm`) | 1.5 (leading-relaxed) | normal |
| Caption | Inter | 400 | 12px | 1.4 | normal |
| Label | Inter | 600 | 10px (≈ `text-[10px]`) | 1 | `0.18em` (tracking-widest) |
| Mono | JetBrains Mono, ui-monospace | 400 | 12-13px | 1.5 | normal |

Notes:
- **Hero scale is the visual anchor**. The spec phrases it as "Massive Minimalist Typography ... Body text is kept tiny and functional to maximize the impact of the hero scale." The 0.92 line-height + `-0.03em` tracking on the display role is the load-bearing detail: the headline reads as a single typographic block.
- **All-uppercase labels** at 10px / `tracking-widest` carry every eyebrow + chip + KPI-band label. The spec calls this out explicitly; the preview honours it.
- **Tabular numerics** (`font-variant-numeric: tabular-nums`) are applied to KPI / stat / pricing numbers so the data cards align cleanly.
- **No display-only weights** beyond 700. The spec doesn't introduce variable-axis weights or italic display variants; Inter at 400/500/600/700 covers the full stack.

## §4 Component vocabulary

Five distinct component patterns are enumerated in the spec. Each one below repeats the spec's observed shape and adds the states the spec implies but doesn't always enumerate.

### Liquid hero section

**Status:** `current`
**Live source:** spec §Layout sections — "Section 1: Liquid Hero Section" + §Components — "The 'Liquid' Hero Section"
**Description:** Cyber-yellow shout band (`--brand-canvas-shout`) carrying a massive black headline (display role, left-aligned). The signature is the asymmetrical bottom edge: `border-bottom-right-radius: 120px` paired with `border-bottom-left-radius: 40px` produces an organic, off-axis wave rather than a symmetric curve. The headline + lede + CTA stack sits in the top-left third; the right half is intentional empty space ("let the color and the type breathe", per spec).
**States:** `default` only — the hero is a marquee surface, not interactive. The pill-shaped CTAs nested inside the hero carry their own states (see "Pill CTA button" below).

### Glassmorphic data card

**Status:** `current`
**Live source:** spec §Components — "The 'Glassmorphic' Data Card"
**Description:** Floating overlay with `bg-white/10` fill (`--brand-glass-fill`), `backdrop-blur-2xl` (24px blur), 1px white border at 20% opacity (`--brand-glass-border`), and large-radius drop shadow (`shadow-2xl`) to lift the glass off the surface beneath. Internal hierarchy: a cyber-yellow pill badge in the top-right corner (action surface — "Add Money" in the spec; here a neutral fintech-action label), a large numeric value (display-scale, tabular-nums), and supporting metadata (small caps labels + body rows). The card uses `border-radius: 32px` (`--brand-radius-card`) — the spec's documented glass-container radius, sitting between the pill scale and the liquid-section scale.
**States:** `default`, `hover` (subtle 1.5px upward lift via `transform: translateY(-2px)` + shadow deepen), `focus-within` (outline on the focused child, no card-level state change).

### Pill CTA button

**Status:** `current`
**Live source:** spec §Components — "The 'Pill' CTA Button"
**Description:** Fully-rounded pill button (`border-radius: 9999px` — `--brand-radius-pill`). Two solid variants: **dark** (`bg-black` + `text-white` — `--brand-canvas-void` + `--brand-on-void`) and **shout** (`bg-cyber-yellow` + `text-black` — `--brand-canvas-shout` + `--brand-on-shout`). Outline variant: `border-2 border-black/20` (`--brand-hairline-soft` on light canvas; `--brand-hairline-on-void` on void canvas), transparent fill. Min-height 48px (above the WCAG AA 44px touch-target floor); horizontal padding 28px; type-role `body` at weight 600. Centred label, no leading icon by default.
**States:** `default`, `hover` (scale `1.05` + `shadow-lg` per spec), `focus-visible` (2px solid `--ring` outline, 3px offset), `active` (scale `0.95` — the squish from spec §Animation — "active:scale-95"), `disabled` (50% opacity, no transform on hover).

### Logo ticker in the void

**Status:** `current`
**Live source:** spec §Components — "Logo Ticker in the Void"
**Description:** A row of monochromatic wordmark / partner-logo glyphs placed on the deep-onyx canvas. Each glyph rendered in white or light-gray (`--brand-on-void` at full or muted opacity), single-weight type or stroked SVG, no chromatic fill. The row sits in the lower portion of the void section, below the section heading; spacing is generous (gap ≈ 48px) so the row reads as quiet attribution rather than as a feature band. The spec calls out specific real-world brand examples ("dbt, Tableau, etc."); the Halcyon-style preview substitutes invented mark names so no real third-party brand is lifted.
**States:** `default` only — wordmarks are static. Hover (where applied) is a small opacity lift (0.6 → 1.0) with a `200ms ease` transition.

### High-vis trust badge

**Status:** `current`
**Live source:** spec §Components — "High-Vis Trust Badges"
**Description:** Pill-shaped badge (`--brand-radius-pill`) carrying a leading icon and a short label. The icon fill uses the shout colour (`--primary`) so the badge reads as a small high-contrast moment against the surrounding void or transition surface; the label is white on void or near-black on light. Used to showcase awards / certifications / accolades — e.g., "Top 50 ledger of 2026" — in the bleed-zone between yellow and onyx where the eye is most likely to land between sections.
**States:** `default`, `hover` (subtle scale `1.03` + glow via `box-shadow: 0 0 0 3px var(--brand-glass-border)`), `focus-visible` (same outline as pill CTA).

## §5 Surface inventory

There are no URLs sampled — the system is spec-derived (no live brand site). The sources consulted in this cycle:

- `temp/refs/hyper-saturated/raw.md` — the authoritative spec (Zhou Jason, Superdesign library entry `hyper-saturated-fluid`). Carries the palette, hierarchy, component vocabulary, motion vocabulary, and Dos / Don'ts.

## §6 Notes

Patterns worth flagging for downstream authors of related register-family inventions (high-saturation single-colour systems, fluid / blob sectioning systems, glassmorphic-overlay systems):

- **The shout colour is single-stop, never gradient.** The spec calls this out explicitly ("DON'T use gradients on the 'shout' color; keep it a flat, vibrant punch."). Any future author who reaches for `linear-gradient(var(--primary), oklch(0.85 0.15 95))` to "soften the impact" is breaking the system's core tenet — the impact is the point.
- **The radii are bimodal, not graduated.** The spec rules out standard 8 / 12 / 16px corner radii entirely. The two allowed shapes are pill (`9999px`) for interactive surfaces and the liquid range (40-120px for section edges + 32px for glass cards). A radius in the 4-16px range is the smell.
- **Black text on yellow + white text on onyx is non-negotiable.** The spec never deviates. Don't reach for a "softened" near-black-on-yellow (e.g., `oklch(0.25 0 0)`) under the theory that pure black reads "harsh" — pure black is the contract.
- **The void is structurally required, not decorative.** "High-saturation areas are always balanced by deep black or charcoal 'void' sections" — if the page is all shout, the design fails. The 60% / 40% ratio is a budget, not a target.
- **Glassmorphic overlays sit at the bleed.** The glass cards float at the seam between yellow and void, not centred on one canvas. The shadow + blur work because the card is partially over each polarity.
- **Liquid sectioning is asymmetric.** Symmetric `rounded-b-[120px]` on both bottom corners reads as a circular arc, not as a liquid wave. The asymmetry (`120px` right + `40px` left, or vice versa) is what produces the organic feel. A future author tempted to "balance" the radii loses the signature.
- **No mid-tone background panels.** The spec uses Charcoal `#171717`, Deep Gray `#262626`, near-black `#0A0A0A` — and the shout, and white. There is no `#1F1F1F`, no `#2F2F2F`, no graduated dark-stack. The void is intentionally narrow in its palette.
- **The motion vocabulary is elastic.** Entrances use `cubic-bezier(0.22, 1, 0.36, 1)` ("liquid elastic ease" per spec). Glass cards drift with a slow float; buttons squish on `active:scale-95`. Linear or sharp easing breaks the fluid feel.
- **Brand-X-lift content to avoid when authoring previews:** the spec gives real-world examples (dbt, Tableau as logo-ticker examples; "The world's best digital bank" as a trust-badge example; "Add Money" as a card-action example). Halcyon-themed neutral content substitutes these — invented logo-glyph names, abstract awards, neutral card-action labels.

## §Known gaps

- **Dark-canvas card surface for token-demo sections.** The spec defines the shout band, the void section, the charcoal panel, and the glassmorphic overlay — but not a "dark-mode equivalent of the light card" used in token-demo grids. The `[data-theme="dark"]` block synthesises that surface from the documented void register (`--card` → `--brand-surface-charcoal`); a future author who finds the spec extended with an explicit dark-card token should override.
- **Hairline / divider weight inside void.** The spec carries the glass border (1px white at 20%) but doesn't specify the divider weight for void-canvas list rows. The `--brand-hairline-on-void` token routes to `oklch(1 0 0 / 0.10)` by extension of the glass convention; not a direct spec citation.
- **Status colour family (positive / warning / destructive).** The spec is silent on green / amber / red. The implementation synthesises a conservative set (green `#15803D`, amber `#EAB308`, red `#DC2626`) so any status surface inside the data card has a token home; future authoritative spec for the family would override.
- **Mobile / responsive behaviour for the liquid hero.** The spec describes the radii in absolute pixel units (`rounded-b-[120px]`). On mobile widths the absolute curve may overshoot the container; the implementation applies a fluid scale via `clamp()` in the template. Spec-authoritative responsive behaviour is undocumented.
