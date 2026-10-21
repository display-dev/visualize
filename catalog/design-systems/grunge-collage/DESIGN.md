---
slug: grunge-collage
name: Grunge Collage
source: spec-derived
verified-at: 2026-05-26
verified-by: subagent
reference-materials:
  - spec: temp/refs/grunge-collage/raw.md (verbatim style prompt by Zhou Jason)
  - principles: Punk-zine / underground-flyer aesthetic. Stop-motion physical-media collage of distressed textures, fragmented composition, and jittery motion. Authored from spec text only — no live brand site, no reference imagery beyond the spec's verbatim prose.
canonical-canvas: light
selection:
  mood: [cyberpunk, gradient]
  tone: [dramatic, bold, irreverent, experimental]
  formality: low
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a dramatic, bold, irreverent, experimental register with cyberpunk, gradient visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Grunge Collage

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Hero banner / cover spread | spec §"Component Stylings" | Off-white paper (#F0EAD6) with charcoal ink and crimson banner overlays | The paper tone is the register's home surface — every other element bleeds onto it |
| Distressed text block | spec §"Distressed Text Block" | Same paper canvas, ink-bleed letterforms | Block headlines fill the width and overlap each other and the central graphic |
| Central graphic frame | spec §"Central Graphic" | Paper canvas with halftone-treated focal image and gold/red geometric annotations | The focal element drifts in stop-motion against the paper |
| Plausible dark variant | n/a (synthesised) | Distressed near-black (#0F0F0F) with off-white ink and crimson kept at brand value | Spec doesn't document a dark mode — the dark canvas mirrors a punk-zine carbon-copy / Xerox-inverted aesthetic |

The spec specifies "off-white paper" as the dominant ground. Light is the canonical canvas; a dark variant is synthesised as a punk-zine carbon-copy inversion (keep the chromatic identity, flip canvas + neutrals, lock the paper-on-crimson banner pattern).

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and the spec citation. OKLCH conversions performed via vendored culori at `visualize/scripts/vendor/culori.mjs`.

### Brand primary

- `--primary`: `oklch(0.5712 0.2219 20.09)` (= `#DC143C`). Live: spec — "Crimson Red: #DC143C (A bold, saturated red with a textured, ink-bleed effect, used for banners and highlights)."
- The brand documents no further crimson ladder. No synthesised `-deep` / `-press` / `-soft` variants.

### Documented secondary brand colours

- `--brand-accent-gold`: `oklch(0.7406 0.1225 93.48)` (= `#C5A945`). Live: spec — "Muted Gold: #C5A945 (Used sparingly for small details or decorative elements like the holiday balls)."

### Canvas + neutrals

- `--background`: `oklch(0.9364 0.0273 93.11)` (= `#F0EAD6`). Live: spec — "Off-White Paper: #F0EAD6 (A warm, aged paper tone with a heavy texture of grit and fibers)." This is the punk-zine paper ground.
- `--foreground`: `oklch(0.2178 0 0)` (= `#1A1A1A`). Live: spec — "Charcoal Black: #1A1A1A (A deep, distressed black used for primary text and graphic elements)."
- `--card`: `oklch(0.9364 0.0273 93.11)` — same paper tone as background. Cards are torn-paper inserts on the same ground, not lifted surfaces. (synthesised — spec carries no card token; the collage register implies no elevation, only edge treatment.)
- `--card-foreground`: `oklch(0.2178 0 0)` — tracks `--foreground`. (synthesised)
- `--popover`, `--popover-foreground`: same paper / charcoal pair as card. (synthesised)
- `--muted`: `oklch(0.9024 0.0228 92.50)` — a touch deeper than paper for soft-fill chips. (synthesised; chroma kept near the paper hue so the wash reads as aged paper edge, not gray.)
- `--muted-foreground`: `oklch(0.3500 0.0030 92.00)` — ink-tinted body text neutral for secondary copy on paper. (synthesised utility neutral; AA-tunable.)
- `--accent`: same as `--brand-accent-gold` — Muted Gold doubles as the documented accent fill.
- `--accent-foreground`: `oklch(0.2178 0 0)` — charcoal ink on gold (gold is ~L 0.74, dark ink reads).
- `--secondary`: `oklch(0.2178 0 0)` — charcoal as the secondary surface for paper-on-ink banner inversions. (synthesised mapping of the documented charcoal.)
- `--secondary-foreground`: `oklch(0.9364 0.0273 93.11)` — paper on charcoal.
- `--destructive`: `oklch(0.5712 0.2219 20.09)` — same crimson; the register has no separate destructive hue.
- `--destructive-foreground`: `oklch(0.9364 0.0273 93.11)` — paper on crimson.
- `--border`: `oklch(0.2178 0 0)` — charcoal hairlines (the register draws hard ink edges, not light dividers).
- `--input`: `oklch(0.2178 0 0)` — charcoal.
- `--ring`: `oklch(0.5712 0.2219 20.09)` — tracks `--primary`.

Mark `(synthesised)` is set on every slot value above that the spec did not explicitly enumerate. The four spec-documented values are off-white paper, charcoal black, crimson red, and muted gold — every other token derives from those four under surface-named taxonomy.

### Polarity-locked surfaces

- `--brand-canvas-paper`: `oklch(0.9364 0.0273 93.11)` (= `#F0EAD6`). Live: spec — paper canvas. Polarity-locked: the "torn paper" surface stays paper-coloured even in dark mode (used as the distressed-card fill inside dark variants).
- `--brand-canvas-ink`: `oklch(0.2178 0 0)` (= `#1A1A1A`). Live: spec — charcoal. Polarity-locked: charcoal banner panels stay charcoal across modes.
- `--brand-on-paper`: `oklch(0.2178 0 0)`. Live: spec — charcoal as primary ink.
- `--brand-on-ink`: `oklch(0.9364 0.0273 93.11)`. Live: spec — paper as ink-on-charcoal foreground.

### Hairlines / dividers

- `--brand-hairline-strong`: `oklch(0.2178 0 0)` — solid charcoal hairlines at 2-3px for torn-paper border treatments. (synthesised from the charcoal value.)
- `--brand-hairline-soft`: `oklch(0.2178 0 0 / 0.20)` — charcoal at low alpha for grit washes. (synthesised utility.)

### Drift vs `tokens.css`

N/A — this is the first authoring cycle. No prior `tokens.css` to drift against.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | Impact / Oswald (heavy block headline) | 700-900 | clamp(3rem, 9vw, 6rem) | 0.92 | -0.02em |
| Heading | Oswald (condensed sans) | 700 | clamp(1.75rem, 4vw, 2.5rem) | 1.05 | 0 |
| Script | Brush Script MT / Caveat Brush / Permanent Marker (hand-drawn brush) | 400 | clamp(2.25rem, 6vw, 4rem) | 1.0 | 0 |
| Body | Inter, system-ui (neutral sans for legibility — spec leaves body open) | 400-500 | 16-18px | 1.55 | 0 |
| Caption / Technical | Courier New / JetBrains Mono | 400-700 | 11-13px | 1.4 | 0.08em |
| Label | Courier New / JetBrains Mono | 700 | 10-12px | 1.0 | 0.12em |

Notes on the spec's typography directive:

- **Three-family mix is the identity.** Heavy condensed sans (Impact/Oswald) for block headlines, brush-stroke script (Brush Script / Permanent Marker) for emphasis words like "Fire" and "Hoorse," and small mono (Courier) for technical annotations and dates. This trio is the punk-zine signature.
- **Body type is unspecified.** The spec defines headline/script/mono roles; body prose for paper paragraphs is left open. A neutral sans (Inter / system-ui) handles body to avoid further hue chaos.
- **Distress is a filter, not a font choice.** The spec calls for "heavy grunge, halftone, or distressed ink filters to all text." In a token system this is rendered through `text-shadow` offsets, `filter: url(#displacementFilter)` SVG distortion, and pseudo-element overlays — not by choosing a "distressed" font face.
- **Hierarchy through chaos.** Headlines overlap each other and the central graphic; per-letter offset / rotation jitters apply at render time, not in the type scale.

## §4 Component vocabulary

The spec enumerates four components. All are observed in the spec's verbatim §"Component Stylings" block.

### Hero banner

**Status:** `current`
**Live source:** spec §"The Hero Banner"
**Description:** A wide horizontal banner in crimson (`--primary`), spanning the full width at top or bottom of the surface. Carries repeating small mono-spaced text like "YEAR 2025" — annotation copy, not a CTA. The banner has a heavy distressed texture (halftone wash + ink-bleed edges + torn-paper top/bottom). Background-fill on `--primary`, content text in `--primary-foreground` (paper-on-crimson). Vertical padding ~12-16px; tracking on the mono text 0.08em-0.12em. The banner stretches edge-to-edge — no gutter, no rounded corners.
**States:** `default` (static crimson + mono repeat), `motion` (horizontal scroll in jittery stop-motion).

### Distressed text block

**Status:** `current`
**Live source:** spec §"The Distressed Text Block"
**Description:** Massive block letterforms ("ENJOY IT", "HAPPY NEW YEAR" in the spec's examples) filling the width of the canvas. Set in Impact / Oswald at display-scale (clamp 3rem-6rem), 700-900 weight, near-zero line-height, slight negative tracking. Each letter carries a unique distress pattern (per-letter ink-bleed offset, slight rotation jitter ±2°, halftone overlay). Letters often overlap one another or bleed off the canvas edges. Charcoal ink (`--foreground`) on paper; on inverted surfaces, paper ink on charcoal.
**States:** `default` (static per-letter offset), `motion` (flicker / glitch pop-in on entry).

### Central graphic

**Status:** `current`
**Live source:** spec §"The Central Graphic"
**Description:** A focal image (spec examples: horse with red ribbon, ice block with fire — punk-zine collage subjects). Heavily processed with halftone dots and grunge texture; the rendered image is grayscale + tinted, not full-colour photographic. Framed by small geometric shapes or technical annotations ("B1", "L2", "S3" labels per the §"Non-Genericness" section). Sits on the paper canvas. Subtle glow halo and slow drift on continuous motion.
**States:** `default` (static halftone + annotations), `motion` (subtle glow pulse + stop-motion 1-2px drift in random directions, ~6fps).

### Script element

**Status:** `current`
**Live source:** spec §"The Script Element"
**Description:** Large hand-drawn brush-script words ("Fire", "Hoorse" in the spec's examples), rendered in a brush-stroke font (Brush Script MT / Permanent Marker / Caveat Brush). Set at display-scale (clamp 2.25rem-4rem), 400 weight (the script families are visually heavy without a bold), tight line-height (~1.0). Rendered in `--foreground` (charcoal) or `--primary` (crimson) for contrast against paper. Often overlaps the central graphic or the block headline.
**States:** `default` (static), `motion` (jerky stop-motion draw-on — the script paints onto the canvas in 8-12 keyframes at ~6-8fps).

## §5 Surface inventory

The "surfaces" sampled in this cycle are the components enumerated in the spec text. There is no live brand site to navigate — the spec is the source.

- spec §"Component Stylings" — enumerates Hero Banner, Distressed Text Block, Central Graphic, Script Element with style + animation notes.
- spec §"Animation & Motion" — defines stop-motion / jitter / glitch motion vocabulary.
- spec §"Non-Genericness" — defines mixed-media + technical-annotation + glitch-aesthetic extras.
- spec §"Dos and Don't" — defines guardrails on textures, colour palette, animation register.

## §6 Notes

Brand-specific patterns worth flagging for future authors of this register:

- **Strictly-limited palette is the spec's identity.** Four colours only: off-white paper, charcoal black, crimson red, muted gold. The §"Don't" rule "DON'T clutter the design with too many colors" is load-bearing — no `--chart-N` rainbow, no neon accent additions.
- **Distress is preview-template work, not token work.** Halftone overlays, ink-bleed letter offsets, torn-paper SVG masks, grunge filters belong inside the `preview-template.html` `<style>` block as decorative effects, not in `tokens.css`. The tokens carry the four colours plus typography roles; the chaos is rendered on top.
- **Motion is a11y-hostile and MUST be gated.** Stop-motion jitter at ~6fps, glitch transitions, scroll-driven banner motion, per-letter offset wobbles — every motion effect must wrap a `@media (prefers-reduced-motion: reduce)` override that stops the animation entirely. Long-form readability is already compromised by the distressed register; uncontrolled motion compounds the problem for vestibular and cognitive a11y.
- **Polarity-locked banner pattern.** The Hero Banner is always paper-on-crimson (paper ink reading on crimson fill). Crimson at L 0.57 against paper at L 0.94 sits at WCAG large-text floor for mono-tracked annotation copy — fine for banner repeats, not for body prose. Charcoal is the body ink.
- **Synthesised dark canvas is approximate.** The spec carries no documented dark mode. The dark variant mirrors a "carbon-copy / Xerox-inverted zine" register: distressed near-black canvas (`#0F0F0F`), off-white-paper ink, crimson and gold kept at their spec values. Crimson on near-black at L 0.57 vs L 0.17 reads at ~3.1:1 — display-text only. Body text is paper-on-near-black, well above AA.
- **Brand-X-lift content to avoid.** The spec's verbatim examples — "YEAR 2025", "ENJOY IT", "HAPPY NEW YEAR", "Fire", "Hoorse", horse-with-ribbon, ice-block-with-fire — are illustrative, not load-bearing copy. Preview content uses Halcyon-team-flavoured punk-zine phrases instead (e.g. "PRINT NOW" / "RAW CUT" / "WEEKLY ZINE" / "PRESS RUN 23").

## §Known gaps

- **No reference imagery beyond the spec.** The spec text is the sole source. Reference photographs of distressed-zine layouts, printed-zine scans, and stop-motion animation reels were not provided — the register's interpretation is derived from the spec's verbatim prose and the punk-zine convention the spec names.
- **No documented dark mode.** The dark variant is synthesised. A future cycle with actual dark-mode reference imagery (carbon-copy zines, Xerox-inverted flyers) could ground this more precisely.
- **Brush-script font availability is environment-dependent.** "Brush Script MT" is a system font on macOS but absent on most Linux server environments. The token stack falls back through Caveat Brush / Permanent Marker (Google Fonts) and then to cursive system family — the spec's intent is "hand-drawn brush," which the fallbacks approximate.
- **Audio register.** The spec describes stop-motion / jittery / chaotic motion. A future authoring cycle might consider whether the register implies a sound-design vocabulary (paper-flutter, ink-stamp, brush-scrape) — out of scope for a CSS token system but flagged here for visual-audio designers downstream.
