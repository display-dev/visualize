---
slug: monograph
name: Monograph
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: /Users/carl/Development/visualize/temp/refs/monograph/spec.md
  - imagery: []   # chrome-devtools MCP unavailable; per AUTHORING-FLOW §102 fallback
  - principles: |
      Poster-campaign register adjacent to but distinct from the existing
      `brutalist` system. Carries warm-cream paper, multi-accent (red-orange +
      warm orange + soft pink), soft-blurred gradient blobs with mix-blend-mode
      multiply, slide-fill CTA hover, borderless grid. Source: Superdesign's
      "Brutalist E-commerce Page" library entry by Shirley Lou.
canonical-canvas: light

selection:
  mood: [editorial, high-contrast]
  tone: [authoritative, serious]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a authoritative, serious register with editorial, high-contrast visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

colors:
  canvas: "#E4E2DD"            # oklch(0.9129 0.0071 88.65) — warm cream paper
  foreground: "#1E1E1E"        # oklch(0.2350 0 0)         — near-pure black with the faintest warm tilt
  primary: "#DB4A2B"           # oklch(0.6071 0.1866 33.68) — red-orange shout
  accent-warm-orange: "#F8A348" # oklch(0.7842 0.1448 64.40) — gradient-blob partner
  accent-soft-pink: "#FF89A9"  # oklch(0.7677 0.1460 3.82) — tertiary, used sparingly
  paper-soft: "#ECEBE7"        # oklch(0.94 0.005 88) — derived; a hair lighter than canvas for card insets
  paper-strong: "#D9D7D3"      # oklch(0.88 0.006 88) — derived; muted-tier surface
  hairline-soft: "#B0ADAA"     # oklch(0.75 0.006 80) — derived; faint divider
  hairline-strong: "#73716E"   # oklch(0.55 0.005 80) — derived; the *one* place hairlines belong (chip border, input bottom rule)
  body-mute: "#4E4D4B"         # oklch(0.42 0.004 80) — derived; ~70% body strength
  body-subtle: "#73716F"       # oklch(0.55 0.004 80) — derived; ~50% body, labels/eyebrows

typography:
  display:
    family: "'Clash Display', var(--font-sans)"
    weight: 700
    tracking: "-0.05em"
    leading: 0.75
  heading:
    family: "'Clash Display', var(--font-sans)"
    weight: 700
    tracking: "-0.04em"
    leading: 0.85
  title:
    family: "'Clash Display', var(--font-sans)"
    weight: 500
    tracking: "-0.02em"
    leading: 1.05
  body:
    family: "'Satoshi', var(--font-sans)"
    weight: 400
    tracking: "0"
    leading: 1.55
  label:
    family: "'Satoshi', var(--font-sans)"
    weight: 500
    tracking: "0.08em"
    transform: "uppercase"
  mono:
    family: "var(--font-mono), 'JetBrains Mono', monospace"
    weight: 400

rounded:
  none: "0"
  sm: "0"
  md: "0"
  lg: "0"
  full: "9999px"          # only used on the rare circular avatar / status dot — the register is sharp-cornered everywhere else

spacing:
  scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128]
  unit: "px"
  hero-bleed: 64          # outer hero padding clamps to this minimum
  poster-cap: 1440        # max content width; the poster lays out edge-to-edge below this

components:
  - button-primary       # slide-fill CTA — canonical signature
  - button-secondary     # ghost / type-only
  - button-destructive   # red-orange fill, white text
  - card                 # borderless; whitespace + scale carry separation
  - pull-quote           # weight 500 italic Clash, optionally over soft-pink blob
  - category-divider     # full-width Clash 700 type break, leading 0.75, no rule
  - tag-chip             # rectangular, weight 500 Satoshi, hairline border
  - nav-link             # uppercase Satoshi, hover transitions to red-orange
  - footer-link          # cream-on-cream, type-only
  - input-text           # borderless except for single bottom hairline
  - eyebrow              # uppercase Satoshi 500, letter-spaced, optionally red-orange
  - gradient-blob        # canonical atmospheric — pos:absolute, blur 140px, mix-blend multiply
  - selection            # ::selection background red-orange, text white
  - scrollbar            # 8px, red-orange thumb on cream track
---

# Monograph

A poster-campaign / gallery / editorial register that happens to share the "brutalist" label with this catalog's existing `brutalist` system. It is a different school. Where the existing `brutalist` is a manifesto / xerox / zine — pure white paper, single cadmium shout, hard borders carrying full-foreground value, zero radius, weight-900 UPPERCASE display — Monograph is the warm-cream poster wall: paper-tinted ground, three accents (red-orange / warm orange / soft pink), soft-blurred radial blobs that multiply into the paper, borderless grid, weight-700 Clash Display compressed to a 0.75 leading. Both share rectilinearity and a willingness to let type carry the page; everything else diverges.

The system derives from Superdesign's "Brutalist E-commerce Page" library entry (author: Shirley Lou). The visualize catalog carries it not as a re-skin of that one e-commerce page but as a *register*: a vocabulary of palette + typography + atmospheric effects + micro-interactions that holds across poster-shaped templates (one-pager, release-announcement, pitch-deck), independent of the original's commerce-specific shape.

## §1 Canonical canvas

| Surface | Source citation | Canvas | Notes |
|---|---|---|---|
| Hero / cover | spec §"Layout primitives" — "Massive typographic heroes filling the viewport" | Warm cream `#E4E2DD` | Full-bleed, two gradient blobs anchoring atmosphere behind the Clash Display headline. The defining surface of the system. |
| Body grid | spec §"Layout primitives" — "Borderless grid structure" | Warm cream `#E4E2DD` | Cards are transparent; spatial separation comes from whitespace + scale. No hairlines between grid cells. |
| Category divider | spec §"Layout primitives" — "Massive category dividers — full-width type breaks rather than rules or muted dividers" | Warm cream `#E4E2DD` | Clash Display 700 at viewport-width scale; the type *is* the divider. |
| Campaign block | spec §"Components" — gradient blobs + multiply blend | Warm cream `#E4E2DD` with multiplied red-orange / warm-orange wash | The atmospheric punctuation surface — where the multi-accent palette pulls together. |
| Footer | spec §"Style prompt" — palette declaration | Warm cream `#E4E2DD` | Cream-on-cream typography; the foreground steps to body-mute for legibility, never inverts. |

**`canonical-canvas: light`.** The spec declares warm cream as the base and offers no dark-mode register; the spec explicitly defers a dark variant ("not in scope for the initial author cycle — defer until a real artifact needs it"). The catalog has prior art for light-only paper registers (`paper-ink` is the precedent). When a dark variant is eventually needed, it should be authored as a sibling system (`monograph-night` or equivalent) rather than retrofitted, because the inversion isn't a lightness flip — the warm cream's role in absorbing the multiplied gradient blobs is what makes the register work, and a deep warm-charcoal canvas would change every blob composition decision.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and the spec citation.

### Brand primary

- `--primary`: `oklch(0.6071 0.1866 33.68)` (= `#DB4A2B`). Live: spec §Palette — "Accent — Red-Orange". The chromatic shout. Used as primary CTA fill on destructive surfaces, as the slide-fill reveal colour underneath the slide-fill hover (when the underside is red rather than white), as the selection background, as the scrollbar thumb, and as the underline / hover-colour on nav links and inline link text. **This is the only `--brand-*` token that ever appears as text on cream** — the cream-to-red contrast at body size is ~4.55:1, which clears AA for normal text.

### Documented secondary brand colours

- `--brand-accent-warm-orange`: `oklch(0.7842 0.1448 64.40)` (= `#F8A348`). Live: spec §Palette — "Accent — Warm Orange". Spec note: "Used in blobs more than as a CTA fill." The second gradient-blob colour, partnered with red-orange in the `mix-blend-mode: multiply` composition. Surface use: blob fill only by default; if pressed into a chip / tag fill, the text on it must be `--foreground` because the lightness puts it in light-fill territory.

- `--brand-accent-soft-pink`: `oklch(0.7677 0.1460 3.82)` (= `#FF89A9`). Live: spec §Palette — "Accent — Soft Pink". Spec note: "Used sparingly — pull-quote highlight, category-divider tint." The tertiary accent. Most often shows up as a third atmospheric blob in larger compositions or as a tinted background behind a pull-quote slab. Pink-on-cream at body size fails AA, so the pink never functions as ink.

### Canvas + neutrals

- `--background`: `oklch(0.9129 0.0071 88.65)` (= `#E4E2DD`). Live: spec §Palette — "Canvas (Base) — Warm cream paper. Not pure white. Hue near 60–80, very low chroma." The paper ground. Every surface in the system sits on this; the multiply blend mode in the gradient-blob composition depends on this canvas being warm-cream rather than white.

- `--foreground`: `oklch(0.2350 0 0)` (= `#1E1E1E`). Live: spec §Palette — "Foreground (Primary text) — Near-pure black. Slightly warmer than pure ink." Body and display ink. The spec specifies "slightly warmer than pure ink"; OKLCH converts the hex to chroma 0, which is the most accurate representation of `#1E1E1E` — the warmth in the spec phrasing is perceptual relative to the cream canvas, not a chromatic value baked into the ink itself.

- `--card`: `oklch(0.94 0.005 88)` (= `#ECEBE7`) **(synthesised)**. Live: derived. The spec declares a borderless grid; cards as a *surface* are typically just the canvas. This token exists for the rare contexts where a card needs the faintest lightness lift to read as a contained surface (a pull-quote slab, a campaign card with a multiply blob anchored to its corner). Surface tint, not a brand colour.

- `--card-foreground`: same as `--foreground` (= `#1E1E1E`). Live: derived from the spec's two-colour ink rule (foreground or nothing on cream).

- `--popover` / `--popover-foreground`: mirror `--card` / `--card-foreground`. Live: derived.

- `--muted`: `oklch(0.88 0.006 88)` (= `#D9D7D3`) **(synthesised)**. Live: derived. Muted-tier surface for chip backgrounds, eyebrow strips, the rare bordered block that wants more weight than `--card`. Surface tint, not a brand colour.

- `--muted-foreground`: `oklch(0.55 0.004 80)` (= `#73716F`) **(synthesised)**. Live: derived. Labels and eyebrows on cream. Lands at ~5.4:1 against the canvas, clearing AA for normal text.

- `--accent` / `--accent-foreground`: `--accent` = `--primary` (= `#DB4A2B`), `--accent-foreground` = `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §"Style prompt" — the slide-fill CTA hover state lifts a white plane behind text. Routed as `--accent-foreground` so the accent token has a clean foreground pair for buttons / chips that fill with the accent.

- `--secondary`: same as `--muted` (= `#D9D7D3`). Live: derived. The cream-paper register has no documented second surface tier; secondary defaults to the muted surface so shadcn `Button variant="secondary"` lands cleanly.

- `--secondary-foreground`: same as `--foreground` (= `#1E1E1E`). Live: derived.

- `--destructive`: `oklch(0.6071 0.1866 33.68)` (= `#DB4A2B`). Live: spec §Components — destructive button is "Red-orange #DB4A2B fill with white text." The register collapses destructive into primary; there's only one chromatic CTA family. **This is an accepted overlap, not a synthesis** — the system genuinely has one red, and using it for both primary-destructive and primary-CTA matches the poster-campaign register's intentional palette economy.

- `--destructive-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §Components — "white text" on the destructive fill.

- `--border`: `oklch(0.75 0.006 80)` (= `#B0ADAA`) **(synthesised)**. Live: derived. Borders are *rare* in this register — they should only appear on the documented bordered elements (tag chips, input-text bottom rule). The default border token exists so shadcn components don't render with `border-color: currentColor`; downstream templates should explicitly suppress borders on card / grid / footer where the register demands borderlessness.

- `--input`: same as `--border` (= `#B0ADAA`). Live: derived. Used as the bottom-rule colour on the borderless text input.

- `--ring`: `oklch(0.6071 0.1866 33.68)` (= `#DB4A2B`). Live: spec §Components — "focus ring uses `#DB4A2B`". The focus indicator across every interactive element.

### Polarity-locked surfaces

The system is light-only; polarity-lock is the default state of every token. The two surfaces that would be explicitly polarity-locked in a multi-polarity system — the cream canvas and the foreground ink — are simply *the* canvas and *the* ink here. No additional `--brand-canvas-night` / `--brand-on-light-strong` tokens are needed.

### Hairlines / dividers

The register is borderless by default; hairlines belong only on chips, input bottom rules, and the rare divider that genuinely needs a hard edge (signature lines, byline rules).

- `--brand-hairline-soft`: `oklch(0.75 0.006 80)` (= `#B0ADAA`) **(synthesised)**. Live: derived. The default chip-border / divider weight.

- `--brand-hairline-strong`: `oklch(0.55 0.005 80)` (= `#73716E`) **(synthesised)**. Live: derived. For input bottom rules and any context that needs the hairline to read as deliberately heavier than a chip border.

### Brand-extras (Layer 2)

Surface-named only, per AUTHORING.md token naming conventions.

- `--brand-canvas`: same as `--background` (= `#E4E2DD`). Live: spec §Palette. Aliased for templates that want to name the surface explicitly rather than going through the shadcn-core `--background` slot.

- `--brand-paper-soft`: same as `--card` (= `#ECEBE7`). Live: derived. The faint card-inset tint.

- `--brand-paper-strong`: same as `--muted` (= `#D9D7D3`). Live: derived. The muted-tier surface — chip backgrounds, eyebrow strips.

- `--brand-ink`: same as `--foreground` (= `#1E1E1E`). Live: spec §Palette. The display / heading / body ink alias.

- `--brand-ink-mute`: `oklch(0.42 0.004 80)` (= `#4E4D4B`) **(synthesised)**. Live: derived. Body-text-secondary; lands at ~8.3:1 against the canvas. Used for long-form body copy that needs to read as deliberately quieter than headline / lead ink.

- `--brand-ink-subtle`: same as `--muted-foreground` (= `#73716F`). Live: derived. Labels, eyebrows, captions on cream.

- `--brand-accent-red-orange`: same as `--primary` (= `#DB4A2B`). Live: spec §Palette. The named accent alias for templates that want to refer to the red-orange by its register role (red-orange) rather than its shadcn role (primary).

- `--brand-blob-warm`: same as `--brand-accent-warm-orange` (= `#F8A348`). Live: spec §Components — the warm-orange's primary use is as a gradient-blob fill. Aliased to encode that the *surface* is the blob.

- `--brand-blob-pink`: same as `--brand-accent-soft-pink` (= `#FF89A9`). Live: spec §Components — derived alias for the soft-pink's primary use as a third atmospheric blob.

- `--brand-selection-fg`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §"Style prompt" — "Selection Color: #DB4A2B with white text." The selection text colour; selection background is `--primary`.

### Drift vs `tokens.css`

Not applicable — `tokens.css` does not yet exist for this system. This DESIGN.md becomes the authoritative source for the brand's first `tokens.css` (Step 2 of AUTHORING-FLOW).

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Clash Display | 700 | `clamp(72px, 12vw, 200px)` | `0.75` | `-0.05em` |
| Heading | Clash Display | 700 | `clamp(40px, 6vw, 72px)` | `0.85` | `-0.04em` |
| Title | Clash Display | 500 | `clamp(24px, 3vw, 36px)` | `1.05` | `-0.02em` |
| Body | Satoshi | 400 | `16px` | `1.55` | `0` |
| Lead body | Satoshi | 500 | `18px` | `1.5` | `0` |
| Label | Satoshi | 500 | `12px` | `1.2` | `0.08em` (uppercase) |
| Mono | JetBrains Mono | 400 | `13px` | `1.45` | `0` |

Six declared roles plus a "lead body" variant for opening paragraphs. The display role is the defining moment: Clash Display 700 compressed to leading `0.75` and tracking `-0.05em` is what makes a hero feel like a poster rather than a webpage. The `0.75` leading specifically — tighter than text-on-its-own can tolerate — works because display headlines are 2-3 lines max; longer body copy at this leading would compress past readability.

**Font sourcing.** Clash Display and Satoshi are both Fontshare fonts, loadable via a single stylesheet:

```html
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@700,500&f[]=satoshi@400,500&display=swap">
```

When Fontshare is unavailable (offline contexts, restricted environments), the families fall back to the catalog's `var(--font-sans)` token (Geist on most surfaces). The fallback chain still produces a coherent register because the Clash + Satoshi pair is replaced by a single sans family — the *vocabulary* changes (compressed grotesque → humanist sans), but the layout still reads as poster-shaped because the spacing, blob composition, and palette do most of the recognizability work. Templates should declare the Fontshare URL in the per-template `<head>` and accept that fallback rendering is a degradation, not a failure mode.

**Why Clash Display + Satoshi specifically.** Clash carries the poster-grotesque silhouette — heavy, slightly compressed, broad terminals — without the historical weight of metal-type grotesques (Akzidenz, Helvetica) that would push the register toward Swiss-style brutalism rather than poster-campaign brutalism. Satoshi is a humanist-sans-leaning grotesque; pairing it with Clash gives body copy enough warmth to sit on cream paper without reading as system-sans.

**Letter-spacing patterns.** The label role is the only one that uses positive tracking (`0.08em`, uppercase). Display + heading + title all use negative tracking (`-0.02em` → `-0.05em`) — the larger the type, the tighter. This is a poster-typography convention: massive Clash Display at default tracking opens visible inter-letter gaps that read as a typesetting accident at scale; tightening to `-0.05em` re-fuses the wordmark into a single visual unit.

## §4 Component vocabulary

### button-primary (slide-fill CTA)

**Status:** `current`
**Live source:** Live: spec §Components #1 — "Interactive CTA Button"
**Description:** Rectangular button, zero radius, no border. Background `--foreground` (`#1E1E1E`), text `--background` (`#E4E2DD`), padding `16px 32px`, font Satoshi 500 at 14px with tracking `0.04em` uppercase. On hover, a white plane (`#FFFFFF`) slides in from `translateX(-100%) → translateX(0)` behind the text via a `::before` pseudo-element; concurrently the text colour transitions from cream to `--foreground` so it reads on the white plane. Transition timing: `0.45s cubic-bezier(0.16, 1, 0.3, 1)` — slower than typical hover, matching the system's "premium feel" motion register.
**States:**
- `default`: ink-on-cream-paper-on-foreground (cream text, foreground bg, no fill plane)
- `hover`: white slide-fill plane at `translateX(0)`, text inverted to foreground
- `focus`: 2px outline in `--ring` (`#DB4A2B`) at `outline-offset: 4px`
- `pressed`: text colour at full inversion, no scale change (the register rejects bouncy press feedback)
- `disabled`: opacity 0.4, slide-fill disabled

### button-secondary (ghost)

**Status:** `current`
**Live source:** Derived: principle of "borderless grid structure" (spec §Layout primitives)
**Description:** Type-only button. No background, no border, no padding box. Font Satoshi 500 at 14px with tracking `0.04em` uppercase, colour `--foreground`. On hover, gains an underline (`text-decoration-thickness: 2px`, `text-underline-offset: 0.25em`) in `--primary` and the text colour transitions to `--primary`. Used for secondary nav actions and "Read more" / "Continue" affordances in editorial content.
**States:**
- `default`: foreground ink, no underline
- `hover`: primary-coloured ink + 2px primary underline at 0.25em offset
- `focus`: 2px outline in `--ring` at `outline-offset: 4px`
- `disabled`: opacity 0.4, no hover affordance

### button-destructive

**Status:** `current`
**Live source:** Live: spec §Components vocabulary list — "Button — destructive (red-orange `#DB4A2B` fill with white text)"
**Description:** Rectangular button, zero radius, no border. Background `--destructive` (`#DB4A2B`), text white (`--destructive-foreground`), padding `16px 32px`, font Satoshi 500 at 14px with tracking `0.04em` uppercase. Hover darkens the fill ~6% via opacity, matching the system's deliberate restraint on hover affordances (no slide-fill — the destructive variant signals weight, not playfulness).
**States:**
- `default`: red-orange fill, white text
- `hover`: fill at `filter: brightness(0.94)`
- `focus`: 2px outline in `--ring` at `outline-offset: 4px` (the outline shares the fill colour, which reads as a halo rather than a contrasted ring — a register-appropriate visual choice)
- `pressed`: fill at `filter: brightness(0.88)`
- `disabled`: opacity 0.4

### card (borderless)

**Status:** `current`
**Live source:** Live: spec §Layout primitives — "Borderless grid structure. The system explicitly rejects card borders. Spatial separation comes from whitespace, scale shifts, and the gradient-blob anchors."
**Description:** Cards have no border, no shadow, no rounded corners, and most often no background tint — they sit on the canvas and rely on padding (`32px` default, `48px` for hero cards) and the surrounding grid gap (`64px` between cards) for separation. When a card *does* take a background tint (a pull-quote slab, a campaign block with a multiply blob anchored to its corner), it lifts to `--brand-paper-soft` (`#ECEBE7`) — a barely-perceptible cream lift, not a card-shape signal.
**States:**
- `default`: transparent (canvas-coloured) background, no border, no shadow
- `tinted (variant)`: `--brand-paper-soft` background
- `with-blob (variant)`: `--brand-paper-soft` background + a corner-anchored `--brand-blob-warm` or `--brand-blob-pink` gradient blob (see `gradient-blob` entry)
- `interactive (variant — rare)`: cursor changes to pointer; the *card itself* never animates on hover (the register rejects card lift), but a child element (CTA button, title link) may carry the affordance

### pull-quote

**Status:** `current`
**Live source:** Derived: principle of poster typography (spec §Typography — display weight 700 + leading 0.75) + spec §Palette accent-soft-pink note ("pull-quote highlight")
**Description:** A massive type slab. Clash Display weight 500 italic at `clamp(40px, 5vw, 64px)`, leading `1.05`, tracking `-0.02em`, colour `--foreground`. Optionally sits over a `--brand-blob-pink` (`#FF89A9`) gradient blob anchored to the slab's left edge at `60% × 60%` of slab dimensions, blurred 100px, mix-blend-multiply, opacity 0.7. The blob tints the cream behind the pull-quote into a warm pink wash without ever fully colouring it.
**States:**
- `default`: foreground ink on cream, optional pink blob

### category-divider

**Status:** `current`
**Live source:** Live: spec §Layout primitives — "Massive category dividers — full-width type breaks rather than rules or muted dividers"
**Description:** A full-bleed type break that *replaces* a horizontal rule. Clash Display weight 700 at viewport-width-relative scale (`clamp(80px, 14vw, 240px)`), leading `0.75`, tracking `-0.05em`, foreground colour. The text fills the viewport edge-to-edge; the bottom of one section and the top of the next are demarcated by the type itself, not by any rule, padding margin, or separator. Padding above and below is `clamp(48px, 8vw, 128px)`.
**States:**
- `default`: foreground ink, edge-to-edge

### tag-chip

**Status:** `current`
**Live source:** Derived: principle of borderless register with a documented exception (spec §"Component vocabulary to derive" — "the *one* place hairlines belong")
**Description:** Rectangular chip, zero radius, padding `8px 12px`, font Satoshi 500 at 11px with tracking `0.08em` uppercase, colour `--foreground`. Background is `--brand-paper-soft` (the faint cream lift) with a 1px `--brand-hairline-soft` border. This is *the* place in the register where a hairline border is appropriate: chips need a visible enclosure because they group small amounts of text and need to read as discrete tokens. Other contexts (cards, footers, grid cells) explicitly reject hairlines.
**States:**
- `default`: paper-soft fill, hairline-soft border, foreground text
- `hover (when interactive)`: border lifts to `--brand-hairline-strong`, no fill change
- `selected (variant)`: fill swaps to `--foreground`, text to `--background` (the chip inverts; a discrete and rectilinear inversion in the register's vocabulary)

### nav-link

**Status:** `current`
**Live source:** Derived: principle of uppercase-Satoshi label register + spec §"Component vocabulary to derive"
**Description:** Type-only link. Font Satoshi 500 at 13px with tracking `0.08em` uppercase, colour `--foreground`. No background, no border, no underline at rest. Padding `8px 16px` for hit-target spacing only — the chip is invisible. On hover, the text colour transitions to `--primary` (`#DB4A2B`) over `0.25s cubic-bezier(0.16, 1, 0.3, 1)`. Active / current-route state gains a 2px `--primary` bottom rule at `bottom: -4px` relative to the text baseline.
**States:**
- `default`: foreground ink, no rule
- `hover`: ink transitions to primary
- `active / current-route`: 2px primary underline at -4px offset
- `focus`: 2px outline in `--ring` at `outline-offset: 4px`

### footer-link

**Status:** `current`
**Live source:** Derived: principle of cream-on-cream register (spec §Layout primitives — borderless + warm-paper canvas)
**Description:** Type-only link, less prominent than `nav-link`. Font Satoshi 400 at 14px, no tracking transform, colour `--brand-ink-mute` (`#4E4D4B`). The footer doesn't invert to dark; links sit on the cream canvas at a body-mute weight, with the only affordance being a colour transition to `--foreground` on hover.
**States:**
- `default`: ink-mute on cream
- `hover`: ink transitions to foreground
- `focus`: 2px outline in `--ring` at `outline-offset: 2px`

### input-text

**Status:** `current`
**Live source:** Derived: principle of borderless register with single-bottom-rule exception (spec §"Component vocabulary to derive")
**Description:** Borderless except for a 1.5px bottom rule in `--brand-hairline-strong` (`#73716E`). No background fill — transparent over canvas. Font Satoshi 400 at 16px, padding `12px 0 12px 0` (zero horizontal padding so the text aligns flush with surrounding content). Placeholder is `--brand-ink-subtle`. On focus, the bottom rule lifts to 2px in `--primary` and a focus ring is *not* added (the rule colour change *is* the focus indicator; the register rejects double-affordance).
**States:**
- `default`: hairline-strong bottom rule, no fill
- `focus`: 2px primary bottom rule, no outer ring
- `error`: 2px destructive bottom rule, helper text below in destructive colour
- `disabled`: rule colour drops to hairline-soft, text colour drops to ink-subtle

### eyebrow

**Status:** `current`
**Live source:** Derived: principle of label register (spec §Typography — label role) + spec §"Component vocabulary to derive"
**Description:** A small label that sits above a heading or title to categorize it. Font Satoshi 500 at 11px with tracking `0.12em` uppercase. Colour can be either `--brand-ink-subtle` (the neutral default) or `--primary` (the chromatic-shout variant — for editorial pieces where the eyebrow's category needs to read as a primary signal). Sits on cream with no background, no border, margin `0 0 12px 0` from the following heading.
**States:**
- `default`: ink-subtle on cream
- `primary (variant)`: primary-coloured

### gradient-blob

**Status:** `current`
**Live source:** Live: spec §Components #2 — "Animated Gradient Blobs"
**Description:** A `position: absolute` div sized at `60vw × 60vw` (or `60vmin × 60vmin` for tall viewports), background a radial-gradient stop in `--brand-accent-red-orange`, `--brand-blob-warm`, or `--brand-blob-pink`, with `filter: blur(140px)` and `mix-blend-mode: multiply`. The multiply blend over the cream canvas produces a warm-darkened atmospheric tint rather than a colour overlay — the cream stays visible through the blob, and the blob reads as paper-temperature shift rather than an applied wash. Maximum 2-3 blobs per viewport (performance budget — 140px blur is GPU-heavy). `will-change: opacity, transform` to keep the blob on the compositor layer. Default opacity pulse: 0.6 → 0.9 → 0.6 over 10s infinite ease-in-out. Optional slow drift via `transform: translate(±5%, ±5%)` over 25s.
**States:**
- `default`: 70% opacity, paused mid-pulse
- `animated`: opacity pulse 0.6 → 0.9 → 0.6 over 10s
- `reduced-motion`: static at opacity 0.75 (per `@media (prefers-reduced-motion: reduce)`)

### selection

**Status:** `current`
**Live source:** Live: spec §"Style prompt" — "Selection Color: #DB4A2B with white text"
**Description:** Text selection background is `--primary`; selected-text colour is `--brand-selection-fg` (`#FFFFFF`). Implemented globally via `::selection { background: var(--primary); color: var(--brand-selection-fg); }`.

### scrollbar

**Status:** `current`
**Live source:** Live: spec §"Style prompt" — "Scrollbar: 8px width, #DB4A2B thumb, #E4E2DD track"
**Description:** Custom scrollbar treatment. Width 8px, thumb `--primary`, track `--background`. Cross-browser implementation: `::-webkit-scrollbar` for Chrome/Safari plus `scrollbar-width: thin` + `scrollbar-color: var(--primary) var(--background)` for Firefox.

## §5 Surface inventory

This is a spec-derived system, so the "URLs sampled" surface inventory of the live-source mode doesn't apply. The inventory of *register surfaces* — the contexts where this design system's vocabulary applies — is the relevant catalog:

- **Hero / cover** — the defining surface; carries the display headline, two gradient blobs, primary CTA, and an eyebrow / category line.
- **Editorial body** — long-form prose at body weight (Satoshi 400 / 16px / leading 1.55) on cream, with optional lead-body opening paragraphs, pull-quote slabs, and inline links in `--primary` with `text-decoration-thickness: 2px`.
- **Borderless grid** — multi-column card grid where cards have no borders / no shadows; spatial separation is whitespace + scale.
- **Category divider** — full-bleed display-type breaks that replace horizontal rules.
- **Campaign block** — atmospheric punctuation surface; combines a tinted paper card with a corner-anchored gradient blob to produce a "poster moment" mid-document.
- **Footer** — cream-on-cream, type-only, with `--brand-ink-mute` links and an optional Clash Display wordmark at the top of the footer block.

## §6 Notes

**Multi-accent is the point, not a flaw.** The system carries three accents (red-orange / warm orange / soft pink), which violates the existing `brutalist` system's Single-Shout Rule. This is intentional and is the single largest reason `monograph` exists as a separate system rather than as a variant of `brutalist`. Treating the multi-accent as a problem to be collapsed turns the register into something else — Swiss-poster minimalism, or the existing `brutalist` zine register. Keep the three.

**The cream canvas is what makes the blob composition work.** The `mix-blend-mode: multiply` blend over `#E4E2DD` produces a warm-darkened atmospheric tint that holds the paper's perceived materiality. The same blob over pure white (`#FFFFFF`) produces a saturated colour wash that reads as a *digital* effect rather than a *paper* effect. Don't substitute white for the cream "to clean up" — the warm tint is what makes the register cohere.

**No card borders, ever.** The borderless grid is the spatial signature. The system has *one* documented hairline use (chip borders, see `tag-chip`) and one functional hairline use (input bottom rule, see `input-text`). Any other context that reaches for `border: 1px solid var(--border)` is fighting the register; reach for whitespace, scale, or a gradient-blob anchor instead.

**Pink is decorative, never functional.** The soft pink (`#FF89A9`) fails AA on cream at body size (contrast ~2.2:1). It works as a tinted background behind massive Clash type (where the type carries the contrast on its own), as a third atmospheric blob in larger compositions, and as a decorative category swatch — but never as ink, button fill text, or any other surface where it would need to carry information at body size.

**The slide-fill CTA is the system's voltage moment.** When the preview-template-html step picks a signature mockup (Step 3 of AUTHORING-FLOW), the slide-fill CTA hovering over a poster hero with two gradient blobs is the highest-recognizability composition. A static screenshot can't capture the slide-fill, but the *shape* of the CTA (rectangular, zero radius, ink-on-cream-paper-on-foreground at rest) is recognizable even at rest.

**Genre-reflex guard — don't apply this register to operationally dense templates.** Per the spec, this system is wrong-shaped for `runbook` / `changelog` / `dashboard` / `api-reference` / `status-page` / `meeting-notes` / `org-chart` (operational density vs. typographic drama is a fight the operational template will lose) and for `postmortem` (the calm retrospective register should not be undermined by gradient-blob theatre). It is right-shaped for `one-pager` / `release-announcement` / `pitch-deck` / `case-study` / `report` / `proposal` / `resume-bio`.

**Halcyon-as-name applies as always.** The spec source is an e-commerce page; the preview-template (Step 3) should *not* lift e-commerce content. Halcyon-team neutral SaaS-team content (engineering specs, design crits, sprint cycles, etc.) on this register's poster-shaped surfaces is the intended output. See `AUTHORING.md` §"Per-register Halcyon-team content" for marketing surfaces under this register.

## §Known gaps

**No dark variant.** The spec explicitly defers dark-mode authoring to a future cycle. The catalog's tooling expects every system to ship a `[data-theme="dark"]` block in `tokens.css`; for this system, Step 2 will need to either mirror `:root` verbatim in the dark block (the single-polarity strategy) and lean on the polarity-locked-surface rule, or synthesise a minimal dark variant that documents itself as a temporary fallback rather than a designed register. The spec's note about a future "Raw Form at night" (deep warm-charcoal canvas with brightened accents) is a sketch, not a designed system; the Step 2 author should pick the mirror-`:root` strategy and document the choice in the `tokens.css` header comment.

**No live composition reference.** Per the dispatch note, chrome-devtools MCP was unavailable in the dispatching session and no screenshots of the source library entry exist on disk. The system's component descriptions are derived from the spec's prose declarations and the register's principles. Step 3 (preview-template authoring) will need to verify that the as-built composition matches the spec's intent by rendering and eyeballing — there is no first-party visual reference to compare against. If composition mismatches surface during preview review, the right response is to revise the preview-template, not to retroactively edit this DESIGN.md to match a misread of the spec.

**Fontshare-only font sourcing.** Clash Display and Satoshi are Fontshare-CDN fonts. The catalog has no precedent for Fontshare hosting (most systems use Google Fonts or local-bundled fonts). The Step 3 author should add the Fontshare loader to the per-template `<head>` and document the dependency. If Fontshare proves unreliable, the fallback path is to drop both families and run the register on `var(--font-sans)` — the register degrades gracefully (the spacing, palette, and blob composition carry most of the recognizability) but loses the Clash-Display "poster grotesque" silhouette that is the register's typographic signature.
