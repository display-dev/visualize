---
slug: win98
name: Win98
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/win98/raw.md (Retro / 90s Nostalgia Design System; Windows 95/98 + GeoCities lineage; 17-token max-saturation system palette, 4-value bevel border-color, mandatory "Bold Factor" inventory)
  - principles: "ugly-cool" 1990s authenticity — beveled buttons, system fonts, garish colors, animated decorative elements; deliberately anti-modern, anti-minimalist; every pixel feels crafted in 1997 on a Windows 95 machine
canonical-canvas: light
selection:
  mood: [playful, tactile, retro-tech, command-line]
  tone: [confident, polished]
  formality: low
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with playful, tactile, retro-tech, command-line visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

---

# Win98

## §1 Canonical canvas

Win98 is single-polarity. Light-only by definition — the Windows 95 system palette (`#C0C0C0` button-face gray, navy title bars, white inset content areas) does not have a documented dark mirror. A "dark mode" of this system is a contradiction with the era; the 1997 desktop did not flip. Authors who target both canvases under the catalog convention must mirror `:root` in the dark block (no chromatic flip) — the spec's `[data-theme="dark"]` would be the same surface.

| Surface | Source | Canvas | Notes |
|---|---|---|---|
| BIOS / desktop chrome | spec §Colors — Light Mode Only | `#C0C0C0` button-face gray (with 4px diagonal crosshatch tile) | The mandatory non-flat body background; never pure flat |
| Window content area | spec §Cards/Containers + spec §Color Layering | `#FFFFFF` white (or `#FFFFCC` notepad-yellow for help panels) | Sunken inset bevel reveals the white-on-gray contrast pair |
| Title bar | spec §Components §Cards | Navy → blue gradient `#000080` → `#1084D0` | The single permitted gradient — Win98 active-window decoration |

## §2 Palette

Each entry below cites the spec table as the source. Hex values were converted to OKLCH via `visualize/scripts/vendor/culori.mjs` on 2026-05-26.

### Brand primary

- `--primary`: `oklch(0.452 0.313 264.1)` (= `#0000FF`). Live: spec §Colors row `accent` — "Pure blue at maximum saturation, hyperlinks (unvisited)." Win98 has no "brand primary" in the modern sense; max-saturation hyperlink blue stands in for it because it carries the strongest action-affordance signal in the system.

### Documented secondary brand colors

The remaining 16 named color tokens from the spec table. All cited against `temp/refs/win98/raw.md` §Colors.

- `--brand-accent-red`: `oklch(0.628 0.258 29.2)` (= `#FF0000`). Live: spec §Colors row `secondary` / `hoverLink` — "Hot red for emphasis; link hover state." Used on hover and danger buttons; same hex serves both roles.
- `--brand-accent-yellow`: `oklch(0.968 0.211 109.8)` (= `#FFFF00`). Live: spec §Colors row `tertiary` — "Bright yellow highlights; badges; construction-stripe pair."
- `--brand-accent-green`: `oklch(0.866 0.295 142.5)` (= `#00FF00`). Live: spec §Colors row `success` — "Pure green at maximum saturation; hit-counter monospace text."
- `--brand-accent-green-readable`: `oklch(0.639 0.218 142.5)` (= `#00AA00`). Live: spec §Colors row `successDark` — "More readable green variant for solid button backgrounds." Cited separately because the spec lists both — `#00FF00` is decorative-only (hit counter, accent fills), `#00AA00` is the button-readable swap. Not a contrast-tuned synthesis; the spec ships both.
- `--brand-accent-purple`: `oklch(0.421 0.193 328.4)` (= `#800080`). Live: spec §Colors row `visitedLink` — "Visited hyperlinks; purple/maroon."
- `--brand-titlebar-start`: `oklch(0.271 0.188 264.1)` (= `#000080`). Live: spec §Colors row `titleBar` — "Windows title bar navy; active-window left edge."
- `--brand-titlebar-end`: `oklch(0.594 0.148 245.8)` (= `#1084D0`). Live: spec §Colors row `titleBarGradientEnd` — "Win98 active-window gradient right edge."
- `--brand-panel-yellow`: `oklch(0.988 0.065 107.5)` (= `#FFFFCC`). Live: spec §Colors row `panelYellow` — "Authentic Windows notepad / help-panel content color."

### Canvas + neutrals

- `--background`: `oklch(0.808 0 0)` (= `#C0C0C0`). Live: spec §Colors row `background` — "Classic Windows 95 button-face gray; primary page background." Combined with the mandatory 4-stop diagonal crosshatch tile (`#B8B8B8` weave on the base gray) — flat is forbidden.
- `--foreground`: `oklch(0 0 0)` (= `#000000`). Live: spec §Colors row `foreground` — "Pure black text. Maximum contrast, no grays for body text."
- `--card`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §Component §Cards — "Content area: inset bevel (sunken), white background, 16px padding."
- `--card-foreground`: `oklch(0 0 0)` (= `#000000`). Black-on-white per spec §Form Inputs ("Text: black, 14-16px") and §Anti-Patterns ("no subtle grays for body text").
- `--popover`: `oklch(1 0 0)` (= `#FFFFFF`). Same as `--card`; the spec doesn't distinguish popovers from sunken content panels in the 90s vocabulary.
- `--popover-foreground`: `oklch(0 0 0)` (= `#000000`).
- `--muted`: `oklch(0.6 0 0)` (= `#808080`). Live: spec §Colors row `muted` — "Exactly 50% gray (128,128,128); secondary elements, metadata."
- `--muted-foreground`: `oklch(0 0 0)` (= `#000000`). Spec §Typography body weight on `#C0C0C0` — black foreground, never a softer gray.
- `--accent`: `oklch(0.452 0.313 264.1)` (= `#0000FF`). Same hex as `--primary` per the spec; Win98 conflates accent (hyperlink action color) with primary.
- `--accent-foreground`: `oklch(1 0 0)` (= `#FFFFFF`). White text on the blue button variant per spec §Buttons §Variants (`Accent/Primary: #0000FF background, white text`).
- `--secondary`: `oklch(0.628 0.258 29.2)` (= `#FF0000`). Spec §Buttons §Variants: `Danger: #FF0000 background, white text`. The semantic-secondary slot maps to the danger-red variant because Win98 has no "soft secondary" — every variant is high-saturation.
- `--secondary-foreground`: `oklch(1 0 0)` (= `#FFFFFF`).
- `--destructive`: `oklch(0.628 0.258 29.2)` (= `#FF0000`). Same as `--secondary` per spec.
- `--destructive-foreground`: `oklch(1 0 0)` (= `#FFFFFF`).
- `--border`: `oklch(0 0 0)` (= `#000000`). Live: spec §Colors row `border` — "Pure black borders; used for outer borders." Note: the 4-value bevel border-color pattern is encoded as four separate `--brand-bevel-*` tokens (see Polarity-locked surfaces) — `--border` carries the single-color fallback.
- `--input`: `oklch(1 0 0)` (= `#FFFFFF`). Spec §Form Inputs — "Background: white; border: 2px inset (sunken)."
- `--ring`: `oklch(0 0 0)` (= `#000000`). Spec §Focus States — "2px dotted black outline, 2px offset (Windows 95 focus ring)." Tracks the focus ink, not the brand-primary, because the brand's focus indicator is dotted-black per the era.

### Polarity-locked surfaces

The 4-value bevel border-color is the system's defining signature. The four hexes encode the white-top-left / gray-bottom-right (outset) and gray-top-left / white-bottom-right (inset) pattern. These are role-locked — `--brand-bevel-light` is always white, `--brand-bevel-dark` is always 50% gray, regardless of any theme override.

- `--brand-bevel-light`: `oklch(1 0 0)` (= `#FFFFFF`). Live: spec §3D Bevel Effect — "Top and left edges: white (#ffffff)." The outset highlight edge.
- `--brand-bevel-dark`: `oklch(0.6 0 0)` (= `#808080`). Live: spec §3D Bevel Effect — "Bottom and right edges: gray (#808080)." The outset shadow edge.
- `--brand-bevel-inner-deep`: `oklch(0.371 0 0)` (= `#404040`). Live: spec §3D Bevel Effect — "Inner shadow adds depth with darker (#404040) accent." The inset `box-shadow` darker stop.
- `--brand-bevel-inner-light`: `oklch(0.904 0 0)` (= `#DFDFDF`). Live: spec §3D Bevel Effect — "Inner shadow adds depth with lighter (#dfdfdf) accent." The inset `box-shadow` lighter stop.

Two more surface tokens with role-fixed values:

- `--brand-canvas-light`: `oklch(1 0 0)` (= `#FFFFFF`). The window content area; sunken inset bevels always reveal a white floor (or `--brand-panel-yellow` for notepad / help panels).
- `--brand-tile-weave`: `oklch(0.783 0 0)` (= `#B8B8B8`). Live: spec §90s Tiled Pattern — "linear-gradient stops at #b8b8b8" in the four overlapping +/-45deg gradients. Mandatory crosshatch on `--background`.

### Hairlines / dividers

- `--brand-hairline-strong`: `oklch(0.6 0 0)` (= `#808080`). Live: spec §Layout Principles §Section Dividers — "Use thick borders `border-b-4 border-[#808080]` between major sections." Same hex as `--muted`; the system reuses the 50% gray for both metadata text and structural dividers. Pairs with the HR groove-effect 4px linear-gradient (`#808080` 0-50% → `#FFFFFF` 50-100%) for the signature etched divider.
- `--brand-hairline-soft`: `oklch(0.931 0 0)` (= `#E8E8E8`). Live: spec §Cards §Alternating Row Backgrounds — "Odd rows: `#E8E8E8` light gray." The only chroma-zero neutral that doesn't appear in the named-token table; documented as a row-zebra value. Reused here for the lightest divider weight.

### Drift vs `tokens.css`

Not applicable — spec-derived authoring, no live brand site to drift against.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | "Arial Black", Impact, Haettenschweiler, sans-serif | 900 (black) | 48-96px (3xl-6xl) | 1.2 | normal to wide |
| Heading | "Arial Black", Impact, sans-serif | 900 | 32-48px (2xl-4xl) | 1.2 | normal |
| Title | system-ui bold | 700 | 20-24px (lg-xl) | 1.3 | normal |
| Body | "MS Sans Serif", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif | 400-700 | 14-16px | 1.5-1.6 | normal |
| Caption | "MS Sans Serif", Tahoma, sans-serif | 700 | 10-12px | 1.3 | uppercase wide |
| Mono | "Courier New", Courier, monospace | 400-700 | 12-14px | 1.4 | normal |

Notes (from spec §Typography):

- **System-fonts-only.** Win98 predates webfont delivery; the stack reaches for OS-bundled families on principle. "MS Sans Serif" is the authentic body family on Windows; "Segoe UI" / "Tahoma" are the modern Windows fallbacks; "Verdana" is the era-appropriate cross-platform anchor.
- **Display weights are bold-or-black only.** Spec §Anti-Patterns explicitly forbids thin / light weights — Arial Black or Impact are the only acceptable display faces because they convey the 1990s "MAKE IT BIG" energy. No variable-axis tuning; no display-thin variant.
- **Mono carries chrome, not prose.** "Courier New" is reserved for hit counters, dates, stats, code-like text, label badges per spec §Typography §Patterns. Body prose never falls to monospace.
- **Text-shadow for 3D headlines.** Spec §Typography §Patterns: `text-shadow: 2px 2px 0 #808080` (hard-edged, no blur, exactly 2px offset). The era's signature embossed-text trick.
- **Case + tracking.** Display + Heading roles are typically UPPERCASE with normal-to-wide tracking. Captions and labels also UPPERCASE. Body and Title stay sentence case.

## §4 Component vocabulary

Thirteen components, exhaustive of what the spec enumerates. Items 6-13 are the "Bold Factor" inventory — mandatory decorative elements without which the style fails per spec §The Bold Factor.

### 1. Button (beveled 3D)

**Status:** `current`
**Live source:** spec §Components §Buttons + spec §3D Bevel Effect
**Description:** 2px solid border with the 4-value outset color pattern (`#FFFFFF #808080 #808080 #FFFFFF` — top, right, bottom, left). Inset `box-shadow` adds depth: `inset -1px -1px 0 #404040, inset 1px 1px 0 #DFDFDF` for the standard depth, or a doubled four-stop shadow (`-2px -2px / 2px 2px / -4px -4px / 4px 4px`) for the deeper "enhanced" bevel. Background defaults to `--background` (`#C0C0C0`); bold-uppercase black text with `tracking-wide`; 8px vertical / 16px horizontal padding; zero border-radius; no soft drop shadows. Variants per spec: Default/Ghost (`#C0C0C0` bg + black text), Accent/Primary (`#0000FF` bg + white text + blue-tinted bevel `#5555FF / #000080`), Danger (`#FF0000` bg + white text + red-tinted bevel `#FF5555 / #800000`), Success (`#00AA00` bg + white text + green-tinted bevel `#00FF00 / #006600`), Outline (white bg + black text).
**States:**
- `default`: outset bevel, background per variant.
- `hover`: background lightens by 1-2 shades; bevel stays outset.
- `pressed`: bevel reverses to inset (`#808080 #FFFFFF #FFFFFF #808080` border-color, `inset 1px 1px 0 #404040, inset -1px -1px 0 #DFDFDF`); element translates `(1px, 1px)` to physically depress.
- `focus`: 2px dotted black outline at 2px offset (Windows 95 focus ring; never removed).
- `disabled`: `#C0C0C0` background at 50% opacity; bevel kept for affordance recognition.

### 2. Card / window-style container

**Status:** `current`
**Live source:** spec §Components §Cards/Containers
**Description:** Outer container with outset 2px bevel on `--background` gray. Title bar across the top: `linear-gradient(to right, #000080, #1084D0)` (the only permitted decorative gradient), white bold text, 4-8px padding. Content region beneath: inset bevel (sunken), `--card` white or `--brand-panel-yellow` background, 16px padding. The Windows 95 application-window form factor is the system's most distinctive composition.
**States:** `default` only. Cards do not have hover / pressed states in this register — the title-bar gradient is fixed, not active-state-tinted.

### 3. Form input (sunken)

**Status:** `current`
**Live source:** spec §Components §Form Inputs
**Description:** 2px inset bevel on white `--input` background. Black 14-16px body text, 4-8px padding. Placeholder text is `#808080` (50% gray). Select dropdowns share the inset styling; checkboxes / radios use text indicators or simple beveled squares (Win98-era browsers rendered the native controls — modern previews simulate).
**States:**
- `default`: inset bevel, white bg.
- `focus`: 2px dotted black outline at 2px offset (same as button focus).
- `disabled`: `#C0C0C0` background at 50% opacity.

### 4. Hyperlink

**Status:** `current`
**Live source:** spec §Components §Links
**Description:** The most iconic Win98-era element. Always underlined; never remove `text-decoration`. Inline color, no padding, no background, no transition.
**States:**
- `default` (unvisited): `#0000FF` blue.
- `visited`: `#800080` purple.
- `hover`: `#FF0000` red (instant color change; no fade transition).
- `active`: `#FF0000` red.

### 5. Icon

**Status:** `current`
**Live source:** spec §Components §Icons
**Description:** Thick 2px stroke. Color matches the host section's accent (blue, red, green). Size 24px default, 32px for feature surfaces. Optional 2px black border around the icon container box; container background is solid bright color (`#000080`, `#008080`, `#00AA00`), icon glyph is white. No rounded corners.

### 6. Marquee scrolling text

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Bold Factor §1 + spec §Components §Marquee
**Description:** Continuous horizontal scroll for announcement bars and "breaking news" carousels. Multiple text spans in clashing bright colors (red / green / blue / yellow alternating). Speed roughly 30-60 px/s — moderate, readable. No gradient mask at the edges (`gradient={false}` in react-fast-marquee terms). `pauseOnHover` for usability. CSS-only implementation: a single overflow-hidden track translating its child via `@keyframes marquee` (`transform: translateX(0) → translateX(-50%)` with duplicated content for seamless loop).

### 7. Rainbow animated text

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Bold Factor §2
**Description:** `@keyframes rainbow` cycles a hero headline through the bright spectrum: `#FF0000 → #FF8000 → #FFFF00 → #00FF00 → #0080FF → #8000FF → #FF0000`. Duration 4s, linear easing (no smoothing). Applied to a hero or section title.

### 8. Pulse-glow badge ("NEW!" / "HOT!")

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Bold Factor §4 + spec §Components §Pulse Glow Badges
**Description:** Small red rectangle with white bold uppercase text. `@keyframes pulse-glow` scales `1 → 1.05 → 1` while expanding a red `box-shadow` from `0 0 0 0 rgba(255,0,0,0.7)` to `0 0 10px 2px rgba(255,0,0,0.5)`. Duration 1.5s, ease-in-out, infinite. The one place ease-in-out is sanctioned — every other interaction is instant or linear.

### 9. HR groove divider

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Components §HR Groove
**Description:** `border: none`, `height: 4px`, `background: linear-gradient(to bottom, #808080 0%, #808080 50%, #FFFFFF 50%, #FFFFFF 100%)`. Hard 50% color stop creates the etched / engraved divider between major content sections. Signature 90s pattern.

### 10. Hit counter display

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Bold Factor §6 + spec §Components §Hit Counter
**Description:** Inset-bevel frame with black or navy background. Green monospace text (`#00FF00`, "Courier New"). Body text shape like `Visitors: 0001234 | Since 1995` — fixed-width counter digits, pipe-separated metadata. The era's authentic guestbook ornament.

### 11. Decorative color squares grid

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Bold Factor §9
**Description:** A row or grid of small (24-32px) solid-color squares — red, green, blue, yellow, magenta, cyan — each with the standard 2px outset bevel. Pure decorative 90s excess; no semantic meaning, just GeoCities color-palette flexing.

### 12. Construction warning stripes

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Bold Factor §10 + spec §Components §Construction Stripes
**Description:** `background: repeating-linear-gradient(45deg, #FFFF00, #FFFF00 10px, #000000 10px, #000000 20px)`. Exactly 10px yellow / 10px black stripes at 45 degrees. Applied to one emphasized CTA section or footer band per page.

### 13. 90s tiled crosshatch (background texture)

**Status:** `current` (Bold Factor mandatory element)
**Live source:** spec §Textures & Patterns §90s Tiled Pattern
**Description:** The body canvas is never flat. Four overlapping `linear-gradient` declarations at +/-45 degrees, using `#B8B8B8` weave on `#C0C0C0` base. Each gradient is 4px x 4px tiled; positions offset (`0 0 / 0 2px / 2px -2px / -2px 0px`) to produce a subtle diagonal crosshatch. Provides surface texture without distraction.

## §5 Surface inventory

Reference materials sampled (no live URLs; spec-derived):

- `temp/refs/win98/raw.md` — full design system spec (Source / Description / Style prose / Style prompt / Layout sections / 13 components / Tags / Notes). Authored by Zhou Jason via designprompts.dev; mirrors a superdesign.dev catalog entry. Anchors every palette value, typographic role, and component description in this DESIGN.md.

## §6 Notes

Brand-specific patterns worth flagging for future authors:

- **The bevel is the brand identity.** Strip the 4-value border-color and the inset box-shadow stops and Win98 is just a beige page with garish text. `--brand-bevel-light`, `--brand-bevel-dark`, `--brand-bevel-inner-deep`, `--brand-bevel-inner-light` are exposed in `tokens.css` as a documented brand-extras pattern for exactly this reason — the four hexes must be re-composable into both the outset (`#FFFFFF` top-left / `#808080` bottom-right) and inset (`#808080` top-left / `#FFFFFF` bottom-right) forms.
- **Pressed state translates, doesn't just re-tint.** Active buttons go from outset → inset *and* translate `(1px, 1px)`. The physical 1px sink is what sells the click in this register.
- **All transitions are instant or linear.** Spec §Animation explicitly forbids smooth easing curves on the interaction layer. Decorative loops (rainbow, pulse-glow, marquee) keep easing only for the attention effect — the cycle is linear, the per-frame motion is ease-in-out at most.
- **Link underlines are never removed.** Every `<a>` carries `text-decoration: underline`; hover changes the color (instant, no transition), nothing else.
- **Zero border-radius everywhere.** Not 1px, not on a single decorative chip. The era did not have `border-radius`.
- **Light-only by definition.** Win98 is single-polarity; the spec is explicit ("Colors (Light Mode Only)"). The catalog convention requires a `[data-theme="dark"]` block, but for this system the dark block should mirror `:root` rather than synthesize a flipped surface — flipping the Win98 palette to a dark canvas is anachronistic.
- **Motion is high-intensity by design.** Marquee, rainbow text, and pulse-glow are decorative-mandatory per spec §Bold Factor. `prefers-reduced-motion: reduce` overrides must:
  - Stop the marquee (display the first viewport of text statically).
  - Freeze the rainbow at a single bright color (the spec suggests `#FF0000`).
  - Stop the pulse-glow scale + shadow animation (badge stays static at bright red).
  The reduced-motion overrides are accessibility-required and shipped, but they should NOT remove the decorative elements entirely — the elements stay, they just stop animating. Authentic without the seizure risk.
- **No subtle grays.** The full neutral inventory is `#000000`, `#808080`, `#C0C0C0`, `#FFFFFF`, plus `#E8E8E8` (zebra row only) and `#DFDFDF` / `#404040` (bevel inner). Authors should not reach for `oklch(0.55 0 0)` or any mid-grey not in this list.

## §Known gaps

- **No dark-mode source-of-truth.** Win98 is light-only; the `[data-theme="dark"]` block in `tokens.css` mirrors `:root` because there is no era-authentic dark variant to derive. If a catalog convention later requires a synthesized dark, authors will need to derive it without spec backing — the surface would be inauthentic to the register.
- **No live-site contrast verification.** Source is documentation only; there are no shipping Windows 95/98 surfaces to sample under `mcp__chrome-devtools__*`. Contrast pairs (e.g., black text on `#C0C0C0` button face → 7.5:1 per spec §Accessibility) are taken from the spec's calculated values.
- **System-font availability varies.** "MS Sans Serif" is bundled on Windows but not on macOS / Linux; the stack falls through to "Segoe UI" / "Tahoma" / "Geneva" / "Verdana" / sans-serif. Preview screenshots taken on a non-Windows machine will render in the fallback face. Authentic to the era includes this fallback fragility.
