---
slug: beta-capture
name: Beta Capture
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/beta-capture/raw.md (Superdesign style-guide entry titled "Minimalist Beta Capture", attributed to Shirley Lou)
  - imagery: none provided this cycle — palette, type, and component vocabulary derive entirely from the spec text
  - principles: "Modern Obsidian" editorial-brutalist register tuned for SaaS waitlist / fintech / premium dev-tools landing moments — single chromatic move is a 135deg silver gradient over obsidian black; everything else is structural (oversized italic serif, monospace metadata, fluid 92vw containers, fractal-noise canvas, frosted-glass cards, no shadows)
canonical-canvas: dark
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Beta Capture

A spec-derived editorial-brutalist register for the waitlist / beta-capture moment: a single email field surrounded by editorial weight. The brand's recognizability lives in three combined moves — an obsidian (#080808) canvas with SVG fractal-noise overlay at 0.05 opacity, an italic display serif at hero scale with tight tracking and 0.85 leading, and a 135deg silver gradient as the sole chromatic accent. The register is single-polarity: there is no documented light mode, and the spec explicitly forbids semantic colour (no red errors, no green confirmations) as it would break the premium monochrome aesthetic.

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Hero band | spec §"Layout sections / Section 2 — Hero" | Obsidian (`#080808`) under a faint frosted-glass container at `opacity-30` and `4rem` radius | Massive italicised silver-gradient serif on near-pure black; mono metadata bar (Est. Date / Description / Location-Limit) below the headline |
| Capture form | spec §"Section 3 — Beta Capture Form" | Obsidian, with a `max-w-2xl` frosted-glass container at `2xl` radius | Transparent mono input + silver-gradient button with black text; the entire conversion surface lives inside one glass row |
| Bento feature grid | spec §"Section 4 — Bento Feature Grid" | Obsidian, hairline grid in `white/10` (1 → 2 → 4 columns) | Cards lift via `white/0.03` background + `white/0.2` border on hover; 10px mono index labels (`01 / EFFICIENCY`) sit top-left over 4xl serif headlines |
| Testimonials band | spec §"Section 5 — Testimonials" | Obsidian washed by `white/[0.01]` | 5xl italic serif quotes, mono attributions, grayscale avatars at `contrast-125` |
| Mobile floating nav | spec §"Components / Floating Mobile Bottom Nav" | Polarity-locked obsidian at 85% opacity, blur 24px, pill-shaped | Slides in after the hero passes; centre slot is the only solid silver action — every other slot is icon + 8px mono label |

The brand has no other canvas. Light-mode is out of scope by spec ("MUST maintain the strict monochrome/silver palette … any standard colors will break the premium aesthetic"). Treat as dark-canonical mirror.

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a citation against the spec. OKLCH values were converted via vendored culori from the hex literals in the spec.

### Brand primary

- `--primary`: `oklch(0.9842 0.0034 247.86)` (= `#F8FAFC`). Live: spec §"Style prompt / Palette" — "Silver Gradient" start stop (`linear-gradient 135deg, #F8FAFC 0%, #94A3B8 100%`). The lighter stop carries the silver gradient's contact-with-light feeling and acts as the headline-italic-span colour at full lightness when the gradient resolves to a solid (mobile nav primary slot, hairline reflections).
- `--brand-primary-deep`: `oklch(0.7107 0.0351 256.79)` (= `#94A3B8`). Live: spec §"Style prompt / Palette" — "Silver Gradient" end stop. Acts as the gradient's shadow-side stop and shows up at full intensity on cooler mono labels.

The "primary" here is technically a gradient — the spec documents it as `linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)`. We tokenise the two stops so consumers can reconstruct the gradient (`background: linear-gradient(135deg, var(--primary) 0%, var(--brand-primary-deep) 100%)`) and so solid uses of either stop are explicitly named.

### Documented secondary brand colours

The brand is **strictly monochromatic with one gradient**. There is no second hue. The spec explicitly forbids "any standard colors (blue, red, green)" as they "will break the premium aesthetic." No `--brand-accent-*` tokens are defined.

### Canvas + neutrals

- `--background`: `oklch(0.1344 0 0)` (= `#080808`). Live: spec §"Style prompt / Palette" — "Obsidian Background." Also the body canvas behind the fractal-noise overlay.
- `--foreground`: `oklch(0.9288 0.0126 255.51)` (= `#E2E8F0`). Live: spec §"Style prompt / Palette" — "Silver Text." The default ink for body sans-serif and mono labels — note this is a documented neutral with ~0.013 chroma, slightly cool, not pure gray.
- `--card`: `oklch(0.1591 0 0)` (= `#0D0D0D`, the composited result of `rgba(255,255,255,0.02)` over obsidian). Live: spec §"Effects / Glass" — "background: rgba(255, 255, 255, 0.02), backdrop-filter: blur(24px)." Frosted-glass card fill.
- `--card-foreground`: `oklch(0.9288 0.0126 255.51)` (= `#E2E8F0`). Synthesised — mirrors `--foreground` since the spec doesn't enumerate a card-specific text colour.
- `--popover`: same as `--card`. Synthesised — spec doesn't enumerate popovers; floats inherit the glass treatment.
- `--popover-foreground`: same as `--card-foreground`. Synthesised.
- `--muted`: `oklch(0.1591 0 0)` (= `#0D0D0D`). Synthesised — mirrors `--card` since the glass surface is the only "muted" background the brand documents.
- `--muted-foreground`: `oklch(0.6334 0 0)` (= `#8A8A8A`, mid-gray utility neutral). Synthesised — derived for muted body text where `--foreground` would over-assert. Chroma-0, so AA-tunable per the AUTHORING utility-neutral exception.
- `--accent`: `oklch(0.1591 0 0)` (= `#0D0D0D`). Synthesised — mirrors `--card`. The brand has no accent fill beyond the silver gradient itself.
- `--accent-foreground`: `oklch(0.9842 0.0034 247.86)` (= `#F8FAFC`). Routes to the gradient-bright stop for accent-on-glass labels.
- `--secondary`: `oklch(0.1591 0 0)` (= `#0D0D0D`). Synthesised — same glass treatment, named for the secondary-button role.
- `--secondary-foreground`: `oklch(0.9288 0.0126 255.51)` (= `#E2E8F0`). Mirrors `--foreground`.
- `--destructive`: `oklch(0.9288 0.0126 255.51)` (= `#E2E8F0`). The spec forbids red destructive cues — destructive states route to the same silver-text foreground and differentiate by weight, underline, or framing. The token exists so shadcn components don't shatter; its value is foreground-equivalent by design.
- `--destructive-foreground`: `oklch(0.1344 0 0)` (= `#080808`). Inverts to obsidian when destructive is used as a fill, so a "destructive" filled button reads as silver-on-black just like the primary CTA.
- `--border`: `oklch(0.2264 0 0)` (= `#1C1C1C`, the composited result of `rgba(255,255,255,0.08)` over obsidian). Live: spec §"Style prompt / Borders & Corners" — "Border color `rgba(255, 255, 255, 0.08)`."
- `--input`: `oklch(0.2264 0 0)`. Mirrors `--border` — inputs share the hairline weight.
- `--ring`: `oklch(0.9842 0.0034 247.86)` (= `#F8FAFC`). Tracks the gradient-bright stop so focus rings are visible against obsidian.

All `(synthesised)` slots are utility-neutral neutrals (chroma ≈ 0) or glass-equivalents — none introduce a new hue.

### Polarity-locked surfaces

The brand is single-polarity dark by spec, so these stay fixed in both `:root` and the dark-mode block:

- `--brand-canvas-night`: `oklch(0.1344 0 0)` (= `#080808`). Live: spec §"Style prompt / Palette" — the obsidian canvas is the brand's only canvas.
- `--brand-on-dark`: `oklch(0.9288 0.0126 255.51)` (= `#E2E8F0`). Live: spec §"Style prompt / Palette" — silver-text ink against obsidian.
- `--brand-on-dark-strong`: `oklch(0.9842 0.0034 247.86)` (= `#F8FAFC`). Live: spec §"Components / Floating Mobile Bottom Nav" — "Middle item is a primary action button (white bg, black text)"; full-strength ink for the most assertive label inside the persistent nav.
- `--brand-glass-surface`: `oklch(0.1591 0 0)` (= `#0D0D0D`, the `rgba(255,255,255,0.02) / blur(24px)` composite). Live: spec §"Effects / Glass" — the frosted-glass fill is brand-identifying.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(0.2264 0 0)` (= `#1C1C1C`, `rgba(255,255,255,0.08)` over obsidian). Live: spec §"Style prompt / Borders & Corners" — documented hairline.
- `--brand-hairline-strong`: `oklch(0.2478 0 0)` (= `#212121`, `rgba(255,255,255,0.10)` over obsidian). Live: spec §"Section 1 — Header / Navigation" — "border-separated links (`bg-white/5`, `border-white/10`)." A slightly punchier divider where the brand actually uses a 10% wash for nav separators.
- `--brand-hairline-hover`: `oklch(0.3446 0 0)` (= `#393939`, `rgba(255,255,255,0.20)` over obsidian). Live: spec §"Section 4 — Bento Feature Grid" — "hover effects (background `white/0.03` and border `white/0.2`)."

### Body text neutrals (chroma ≈ 0 utility tokens)

These are utility tokens that don't carry brand identity. They CAN be tuned for AA per the AUTHORING utility-neutral exception.

- `--brand-body`: `oklch(0.9288 0.0126 255.51)` (= `#E2E8F0`). Tracks `--foreground` — the spec's silver-text neutral is already the documented body ink, so the utility token mirrors it rather than synthesising a separate value.
- `--brand-body-muted`: `oklch(0.6334 0 0)` (= `#8A8A8A`). Synthesised mid-gray for body excerpts that step down from `--foreground`; AA-tuned against `#080808` at ~5.5:1 for body sizes.
- `--brand-body-faint`: `oklch(0.4748 0 0)` (= `#5C5C5C`). Synthesised — the dim register for non-essential timestamps / counters; near AA-large floor against obsidian. Use for tertiary metadata only.

### Drift vs `tokens.css`

Spec-derived mode — no prior `tokens.css` exists for this slug. There is no drift to reconcile.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | DM Serif Display | 400 italic (only weight DM Serif Display ships) | `clamp(2.625rem, 10vw, 8.75rem)` (= 42px–140px) | `0.85` | `-0.04em` (Tailwind `tracking-tighter` equivalent) |
| Heading | DM Serif Display | 400 italic | `clamp(2rem, 5vw, 4rem)` (32–64px — derived from the spec's "5xl serif" testimonial scale and "4xl serif" bento headline) | `0.9` | `-0.03em` |
| Title | Inter | 600 | `1.25rem` (20px) | `1.3` | `-0.005em` |
| Body | Inter | 300–400 | `0.875rem`–`1.125rem` (14–18px, per spec §"Sans (Body)") | `1.55` | `0` |
| Caption | Geist Mono | 500 | `0.625rem` (10px, per spec §"Mono (System/UI)") | `1.2` | `0.4em` uppercase (spec range: `0.2em` to `0.5em`) |
| Mono | Geist Mono | 400–700 | `0.75rem` (12px) | `1.45` | `0.2em` uppercase |

**Custom axes / display-only conventions.**

- **DM Serif Display only ships at one weight in italic and one in roman.** The brand uses italic exclusively for headlines per the spec's explicit constraint: "MUST NOT use non-italicized serif for headlines." Loading the roman cut is wasted bytes.
- **Geist Mono full axis (100–900).** The spec calls out the full range and uses it as a labelling system: 10px labels typically sit at weight 500 with `0.4em` tracking uppercase; 14px buttons sit at weight 700; metadata bars sit at weight 400 with `0.2em` tracking.
- **Inter at three weights (300 / 400 / 600).** Body prose lives at 300–400; titles at 600. The spec doesn't use Inter heavier than that, and using it would compete with the serif headlines.
- **Leading floors.** The italic display serif uses `0.85` (sub-1.0 leading) — the spec is explicit. This is editorial-poster territory and breaks above ~80px size; below that the serif's natural ascenders/descenders need at least `0.95`. Use the floor scale as a baseline, not a recipe.

## §4 Component vocabulary

One entry per distinct component pattern the spec enumerates. Three are spec-declared as explicit components (Countdown Timer, Floating Mobile Bottom Nav, Member Registry Card); the remainder are derived from spec §"Layout sections" — each Section 1 through 5 carries enough shape detail to surface as a documented component. Status reflects spec presence, not deployed evidence (there is no deployed surface).

### Hero headline span

**Status:** `current`
**Live source:** spec §"Section 2 — Hero Section" + spec §"Style prose"
**Description:** Massive italic DM Serif Display headline at `clamp(42px, 10vw, 140px)` with `tracking-tighter` (`-0.04em`) and `leading-0.85`. One span inside the headline carries the silver gradient (`background: linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)` clipped to text via `background-clip: text; color: transparent;`); the rest of the headline sits at full `#FFFFFF`. Centered inside a faint frosted-glass container (`opacity-30`, `4rem` radius on desktop, `2rem` on mobile). Hero container is fluid `92vw`, padding scales `py-12` → `py-32`.
**States:** `default` (italic gradient span + white run). No documented hover / interactive states — the hero is a static editorial moment.

### Metadata bar

**Status:** `current`
**Live source:** spec §"Section 2 — Hero Section"
**Description:** Three-column flex row directly below the hero headline. Each column carries a label-only entry in Geist Mono at 10–12px, uppercase, `0.3em`+ tracking. Documented columns: Est. Date, Description, Location/Limit. Separators are hairline verticals at `--brand-hairline-soft`. The bar sits inline (not wrapped in a card), bridging headline and capture form.
**States:** `default` — static informational row.

### Beta capture form

**Status:** `current`
**Live source:** spec §"Section 3 — Beta Capture Form"
**Description:** Horizontal flex row at `max-w-2xl` inside a frosted-glass container (`rgba(255,255,255,0.02)` + `backdrop-filter: blur(24px)`) with a 2xl-rounded outer radius. The form contains exactly two children: a transparent-background mono input (no border, 100% flex-grow, Geist Mono, placeholder in `--brand-body-faint`) and a silver-gradient CTA button. Stacks to column on `sm` and below.
**States:** `default`, `focus` (input ring uses `--ring`, no border colour change), `disabled` (CTA dims to `--brand-body-muted` foreground, glass surface stays).

### Silver-gradient button

**Status:** `current`
**Live source:** spec §"Style prompt / Effects / Buttons" + spec §"Section 3 — Beta Capture Form"
**Description:** Primary CTA. Background is `linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)`. Text is `#080808` (obsidian) in Geist Mono, weight 700, uppercase, `0.2em` tracking. Border-radius `0.75rem` (xl). Padding: `0.875rem 1.5rem`. Hover lifts 1px (`translate-y: -1px`) and gains a soft glow (`box-shadow: 0 0 20px rgba(255,255,255,0.15)` — note this is the **only** documented shadow in the entire system, and per the spec is glow-not-drop; everywhere else, the no-shadow rule applies).
**States:** `default`, `hover` (1px lift + soft glow), `focus` (visible ring via `--ring`, no removal of lift), `active` (returns to baseline + slight darkening of the lighter gradient stop), `disabled` (fades to flat `--brand-body-muted` fill, no gradient).

### Frosted-glass card

**Status:** `current`
**Live source:** spec §"Style prompt / Effects / Glass"
**Description:** Generic card surface used by the capture form, hero container, and most bento cells. Background `rgba(255,255,255,0.02)` (= `--brand-glass-surface`), `backdrop-filter: blur(24px) saturate(140%)`, 1px border at `--brand-hairline-soft`, radius `1rem` (16px — the documented "card radius") for standard cards, `2rem` for the form container, `4rem` for the hero container.
**States:** `default`, `hover` (background lifts to `rgba(255,255,255,0.03)`, border lifts to `--brand-hairline-hover`, no transform unless the brand-X spec calls one out).

### Bento feature card

**Status:** `current`
**Live source:** spec §"Section 4 — Bento Feature Grid"
**Description:** Specialised glass card living inside a `border-y` + `border-r` grid (1 col / 2 col / 4 col responsive). Top-left numbered index (`01 / EFFICIENCY`) in 10px Geist Mono uppercase + `--brand-hairline-strong` tracking on a single line. Below: 4xl italic DM Serif Display headline. Below the headline: body copy in Inter mono-case (per spec — title-case-like rendering but for short body lines) at `1rem`. Hover state lifts background to `rgba(255,255,255,0.03)` and border to `rgba(255,255,255,0.2)`.
**States:** `default`, `hover` (background + border shift, no scale, no transform).

### Countdown timer

**Status:** `current`
**Live source:** spec §"Components / Countdown Timer"
**Description:** Editorial-poster countdown. Three (or four) flex-row containers for HH / MM / SS, each carrying a serif numeral pair in DM Serif Display italic at `clamp(3rem, 8vw, 7.5rem)` (5xl → 120px). Slash separators (`/`) at `opacity: 0.1` sit between containers. Optional 10px Geist Mono sub-labels ("HRS", "MIN", "SEC") sit above each numeral pair. Numerals render at `color: rgba(255,255,255,0.9)` (= `--brand-body` ≈ `--foreground` at 90%).
**States:** `default` — typically static or auto-ticking; no hover.

### Floating mobile bottom nav

**Status:** `current`
**Live source:** spec §"Components / Floating Mobile Bottom Nav"
**Description:** Polarity-locked persistent pill. Fixed `bottom: 1.5rem` (= `bottom-6`), horizontally centred. Background `rgba(8,8,8,0.85)` (obsidian at 85% opacity), `backdrop-filter: blur(24px)`. Border-radius `9999px` (fully rounded pill). Width is content-determined; height ~48px. Five flex slots; the centre slot is a primary action button with `background: #FFFFFF` and `color: #080808` (the only place white-on-obsidian inverts cleanly without the silver gradient). Other slots: 16px Lucide-style icon + 8px Geist Mono label below at `0.4em` tracking uppercase.
**States:** `hidden` (initial — `translate-y: 8rem` and `opacity: 0` until the hero passes), `visible` (slides in via `cubic-bezier(0.16, 1, 0.3, 1)` over `0.8s`), per-slot `hover` (label colour lifts to full white).

### Member registry card

**Status:** `current`
**Live source:** spec §"Components / Member Registry Card"
**Description:** Specialised bento card showcasing waitlist-style member badges. 2×2 grid inside one bento cell. Each badge: 10px circular grayscale avatar (`filter: grayscale(1) contrast(1.25)`) followed by an 8px Geist Mono title (`0.4em` tracking, uppercase). Cell bottom-right carries a large decorative icon (e.g. ID card glyph) at `opacity: 0.05` for compositional weight. On hover, each row translates `1px` to the right (`translate-x: 1`), text lifts to full white, and the avatar scales to `1.1`.
**States:** `default`, per-row `hover` (translate + text lift + avatar scale).

### Testimonial block

**Status:** `current`
**Live source:** spec §"Section 5 — Testimonials"
**Description:** Two-column grid with `padding-left: 4rem` (= `pl-16`) and a left-border accent (`1px solid --brand-hairline-strong`). Quote sits at 5xl DM Serif Display italic in `--foreground`. Attribution + role in Geist Mono uppercase at 10–12px in `--brand-body-muted`. Avatar: grayscale + `contrast(1.25)` filter at ~40px square (the spec doesn't specify avatar size on the testimonial; 40px is derived from "small grayscale avatar" register conventions and follows the registry card's 10px size up one step for the more spacious testimonial block). Whole section background is `rgba(255,255,255,0.01)` (`--background` + 1% wash).
**States:** `default` — static editorial block.

### Header / nav

**Status:** `current`
**Live source:** spec §"Section 1 — Header / Navigation"
**Description:** Full-width container at `92vw`, padding `2rem` (= `p-8`). Left: monospace wordmark in Geist Mono uppercase, `0.5em` tracking, weight 600. Right (desktop): flex container with border-separated links; each link has `background: rgba(255,255,255,0.05)` and `border: 1px solid rgba(255,255,255,0.10)`. Final right-side cell is a solid white "Join" button (`background: #FFFFFF`, `color: #080808`, Geist Mono uppercase). Right (mobile): single hamburger icon or minimalist text label.
**States:** `default`, link `hover` (background lifts to `rgba(255,255,255,0.08)`, border to `rgba(255,255,255,0.2)`).

### Hairline grid (bento container)

**Status:** `current`
**Live source:** spec §"Section 4 — Bento Feature Grid"
**Description:** The grid that hosts the bento feature cards. Uses `border-y` on the outer container and `border-r` on each interior cell (except the right-most) at `--brand-hairline-strong`. Creates a technical-blueprint look without surrounding the cards in card chrome. Columns: 1 (base) / 2 (md) / 4 (lg).
**States:** `default` — structural only, no interactive state.

### Noise overlay

**Status:** `current`
**Live source:** spec §"Style prompt / Effects / Noise"
**Description:** SVG fractal-noise filter at `opacity: 0.05`, applied as a fixed-position full-viewport `::before` or sibling element behind all content. The filter uses `<feTurbulence type="fractalNoise" baseFrequency="0.9" />` (derived from typical editorial-brutalist noise registers; the spec gives only the opacity value). Not interactive; adds depth without colour.
**States:** `default` — static decorative layer.

### Mono badge / pill

**Status:** `current` (derived)
**Live source:** Derived from spec §"Section 1 — Header / Navigation" (border-separated link pattern) and §"Section 4 — Bento Feature Grid" (numbered index pattern). The spec doesn't enumerate a standalone badge, but every micro-label in the system follows the same shape: 10–12px Geist Mono uppercase + `0.3–0.5em` tracking + glass background + hairline border + small radius.
**Description:** Compact label slot. Background `--brand-glass-surface`, 1px border at `--brand-hairline-soft`, radius `0.5rem`, padding `0.375rem 0.625rem`. Text in Geist Mono at 10px uppercase, weight 500, `0.4em` tracking.
**States:** `default`, `hover` (border lifts to `--brand-hairline-hover`).

## §5 Surface inventory

Spec-derived mode — there is no deployed surface inventory. The reference materials are entirely textual (the `temp/refs/beta-capture/raw.md` Superdesign entry by Shirley Lou). Components were enumerated from the spec's layout-section and component prose; OKLCH values were converted from the spec's hex literals; type sizing was taken from the spec's `clamp()` directives where given and conventional editorial ranges where not.

## §6 Notes

Brand-specific patterns worth flagging:

- **Single-polarity dark.** Light-mode is out of scope by spec ("MUST maintain the strict monochrome/silver palette"). Both `:root` and `[data-theme="dark"]` mirror the same obsidian canvas; the dark-mode block is functionally a no-op for chromatic tokens. Polarity-locked tokens (`--brand-canvas-night`, `--brand-on-dark`, `--brand-glass-surface`) stay fixed by definition.
- **No semantic colour.** The spec forbids red error states, green success states, blue links. Validation surfaces must differentiate via weight / tracking / underline / framing instead of hue. `--destructive` exists only so shadcn primitives compile; its value is foreground-equivalent.
- **The silver gradient is the only chromatic move.** Everywhere a brand would normally place a tint (success ribbons, info callouts, brand-accent eyebrows), this system uses either the gradient at full opacity (for CTA fills, hero headline spans) or a glass-and-hairline composition (for cards, badges, nav links).
- **One documented shadow, glow-only.** The spec's "MUST NOT use standard box-shadows; use borders or backdrop-blurs for depth" is overruled in exactly one place: the silver-gradient button's hover lift (`box-shadow: 0 0 20px rgba(255,255,255,0.15)`). That shadow is a glow on the bright stop, not a drop-shadow under the button — depth still comes from blur and hairline.
- **Fluid 92vw containers.** The spec mandates `width: 92vw` for hero and major sections, bypassing standard Tailwind `max-w-*` containers. Preview should follow — `max-width: 92vw` on the main wrapper, not a fixed 1280px shell. This is a brand-identifying choice tied to the editorial-brutalist register.
- **Italic-serif requirement.** "MUST NOT use non-italicized serif for headlines." DM Serif Display loads only its italic cut; substituting non-italic serif breaks the brand's identity. If DM Serif Display can't load, a system serif italic (e.g. `ui-serif italic`) is the safest fallback.
- **Fractal-noise overlay is part of the canvas.** Without the 0.05-opacity SVG noise layer, the obsidian canvas reads as flat black and the editorial weight collapses. Treat noise as canvas, not decoration.
- **Brand-X-lift content to avoid when authoring previews.** The spec describes a waitlist / beta-capture moment for "SaaS waitlists, fintech, or premium developer tools." Don't lift real waitlist sites' copy (Vercel waitlist, fintech invite codes, real "Early Access" captions). Halcyon-team neutral copy — invented waitlist headlines, generic launch-window references, invented metadata bar values (release windows, region copy, capacity copy) — only.

## §Known gaps

- **No deployed surface to sample.** This is the spec-derived mode by design; the spec is the source of truth. If a live brand using this exact "Modern Obsidian" register surfaces later (a real waitlist page that ships these moves), capture URLs and reconcile here.
- **No imagery provided this cycle.** Component dimensions for the testimonial avatar size, exact noise filter parameters (`baseFrequency`, `numOctaves`), and the hairline grid's column-gutter sizing are derived from convention rather than measurement. If reference imagery is added later, re-check those derivations against pixel measurements and update §4 entries accordingly.
- **No documented dark mode lift.** Since the brand is single-polarity dark, there is no chromatic ladder for "lifted-on-darker" or "tinted-on-lighter" surfaces. If the brand ever ships a documented elevation system (e.g. a more elevated card surface above the standard glass), it would belong in §2 as `--brand-glass-surface-elevated` and currently does not exist.
- **Validation / form-error visual language.** Since the spec forbids semantic colour, the recommended pattern (weight / tracking / underline / framing) is implied rather than spelled out. A real shipping team would need to invent the convention; until then, treat form errors as "italic serif inline above the field" or "tracked-uppercase mono prefix before the field label."
