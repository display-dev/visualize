# Color

Palette construction, contrast, dark-mode, modern color CSS for visualize artifacts. Brand profile overrides — if `DESIGN.md` declares a palette, use it. The rules below are the fallback when the brand profile is silent. Every authored color is a token in `tokens.css`; never inline a literal in template HTML.

## OKLCH over hex

Use OKLCH for every authored color. Hex is a legacy fallback for embedded SVGs and email surfaces.

Three axes:
- **L** (lightness) — 0–1 (or `0%`–`100%`). Perceptually uniform: equal L steps look like equal lightness steps. HSL doesn't have this — `hsl(60 100% 50%)` (yellow) and `hsl(240 100% 50%)` (blue) read as very different brightnesses despite identical L.
- **C** (chroma) — practical sRGB ceiling sits around ~0.32 depending on L and H (pure red ~0.26, pure green ~0.30, pure blue ~0.31). UI tokens typically stay ≤~0.30. Anything above ~0.32 is wide-gamut territory and will be gamut-mapped in sRGB browsers — usually unpredictably. Reduce C as L approaches 0 or 1; drop C below ~0.05 as L crosses ~0.05 or ~0.95.
- **H** (hue) — 0–360°. Note red sits at ~29°, not 0° (hue 0 is magenta in OKLCH); common brand blues land in the 250°–265° band (pure sRGB blue is ~264°; design systems often pick ~250° for a more violet-leaning blue); green ~145°. Pick by visual intent, not by HSL-trained instinct.

The hue is a brand decision, not a default. Reflex picks (blue 250, warm orange 60) are the dominant AI-design defaults — the slop is the reflex, not the hue band itself. A brand whose `DESIGN.md` declares a single primary hue in any band is fine.

## Tinted neutrals

Pure gray is dead. Neutrals get chroma 0.005–0.015 toward the brand hue. Small enough to be subconscious; large enough to break the "stock template" feeling. A brand-teal artifact gets teal-tinted neutrals; brand-amber gets amber-tinted.

The tint hue is a brand decision the same way the primary hue is. Tinting always-warm-or-always-cool by reflex is the same monoculture failure as picking blue 250 by reflex.

Above chroma ~0.02, the tint stops reading as subconscious and starts reading as a deliberate accent — readers try to assign meaning to it. Stay under the threshold.

## Palette structure — four roles

Cap, not floor. Four roles cover the working palette; secondary / tertiary roles are added only when a role genuinely needs them (most artifacts don't).

1. **Primary** — one brand hue, 3–5 shades. CTAs, focus rings, the highlight on the focal element. Not a fill on the wordmark (chrome stays monochrome).
2. **Neutral** — 9–11 shade scale, tinted toward the brand hue per the section above. Text, borders, the `--muted-foreground` band, the `--border-muted` band — the *typographic* gradations of darkness.
3. **Semantic** — `--destructive` (red), `--warning` (amber), `--success` (green, optional). Reserved for state, not decoration. Red stays bound to destructive state — a red primary-action button reads as a destroy operation.
4. **Surface** — 2–3 elevation levels (`--background` / `--card` / `--popover`), each with its own designed foreground pair. Each pair is consumed as a unit (`--card-foreground` only over `--card`, never over `--background`). Surfaces are *elevation*, not text-darkness — they live separately from the Neutral ramp.

Chart-series encoding has its own rules — see [data-viz.md](data-viz.md) for direct labels, single-hue ramps, and series-count limits.

## 60-30-10

Visual weight, not pixel count. The artifact's color budget breaks down roughly as 60% neutral surface, 30% secondary (body text, borders, inactive states), 10% accent (CTAs, focus, the one highlighted KPI).

Accents work because they're rare. The common failure is using the brand accent everywhere "because it's the brand color" — at that point the reader sees repeating chrome, not "look here." Reserve primary for the one moment per surface that matters.

## Contrast

WCAG AA / AAA across content types:

| Content | AA | AAA |
|---|---|---|
| Body text | 4.5:1 | 7:1 |
| Large text (≥18pt / ~24px normal, or ≥14pt / ~18.5px bold) | 3:1 | 4.5:1 |
| UI components, icons that carry meaning | 3:1 | — |
| Decorative elements | none | none |

No rounding: 4.47:1 fails AA even if it looks identical to 4.5:1. Placeholder text still needs 4.5:1 — the default light-gray placeholder fails on most form fields. Inactive UI components are exempt (the low contrast IS the affordance for "disabled"); text-disabled prose still meets the threshold for legibility. All interactive states (hover, focus, active) independently meet the threshold; easy to ship a rest state at AA and a hover state that fails.

Push to AAA when the artifact will display under projection, sunlight, or low-quality monitor — visualize ships things into conference rooms, where projectors lose ~30% of designed contrast.

## Dangerous color combinations

Some pairings fail at the perceptual level regardless of measured contrast. The match-and-refuse set (the contrast section above covers low-gray-on-white and placeholder thresholds; Color-blind testing below covers red-green specifically):

- **Gray text on a colored background** — gray reads washed-out on any saturated surface (the eye reads the gray as desaturation noise, not as text). Use a darker shade of the background's own hue, or transparency on the foreground.
- **Blue on red, or vice versa** — chromatic aberration in the eye causes visual vibration; the text appears to shimmer at long focal lengths.
- **Yellow on white** — almost always fails AA regardless of how the yellow is tuned. Pair yellow with `--foreground` or a dark surface.
- **Thin light text on images or gradients** — the contrast varies pixel-by-pixel against the worst region of the background. Either thicken the text, add a backdrop overlay, or use a solid surface behind the text block.

## Modern color CSS

Three modern functions worth reaching for:

- `light-dark()` — Baseline May 13, 2024. Required.
- Relative color syntax (`oklch(from …)`) — Baseline September 16, 2024. Required.
- `contrast-color()` — Baseline April 10, 2026. Behind `@supports`.

```css
:root {
  /* Required: color-scheme tells the engine both branches of light-dark() may resolve here. */
  color-scheme: light dark;

  /* Theme-aware token. Resolves at use-time per the cascade's color-scheme. */
  --foreground: light-dark(oklch(0.18 0.005 85), oklch(0.92 0.005 85));

  /* Derive shades from the brand token. One change re-tunes the family. */
  --primary-hover: oklch(from var(--primary) calc(l - 0.06) c h);
  --primary-muted: oklch(from var(--primary) calc(l + 0.12) calc(c * 0.5) h);
}

/* Auto-pick contrasting text against a dynamic background. Set a static fallback before the guard. */
.badge { color: var(--card-foreground); }
@supports (color: contrast-color(white)) {
  .badge { color: contrast-color(var(--badge-bg)); }
}
```

`light-dark()` resolves where the property is computed — the `color-scheme` declaration must reach the element through the cascade (typically declared on `:root`, or on a themed subtree). Without it, the function silently picks the light branch. Relative color syntax `oklch(from <color> L C H)` lets `--primary` define the family; `--primary-hover` and `--primary-muted` derive instead of being hand-picked.

## Dark mode is not inverted

Different design decisions, not a hex swap.

- **Lift saturated brand colors.** A `--primary` of `oklch(0.45 0.2 25)` on a light background needs lifting to `oklch(0.7 0.2 25)` on dark to keep similar perceptual weight. Desaturate slightly along the way — a vivid primary that pops on white over-saturates on dark.
- **Background sits at L ~0.12–0.15**, not `oklch(0 0 0)`. Pure black on elevated surfaces produces flat vibrating contrast; the brand-tinted dark gives depth without shadows.
- **Surface scale (3 steps) for elevation, not shadow.** Higher elevation = lighter surface, stepped above the background. If background is `oklch(0.12 0.005 h)`, the elevation scale runs `oklch(0.17 0.005 h)` → `oklch(0.22 0.005 h)` → `oklch(0.27 0.005 h)`. Same hue and chroma as the brand's tinted neutrals; only L varies, always stepping up from the background.
- **Body weight reduction.** Light-on-dark reads heavier than dark-on-light (irradiation illusion). Drop body weight one notch — 400 → 350 if the variable font supports it. (Same family of compensation the [typography.md](typography.md) light-on-dark section covers.)
- **Focus ring re-tested in dark.** Light-mode rings often disappear against the lifted-neutral surface scale; redesign with the dark palette in hand.

Both modes are first-class. Dark is not an inverted afterthought.

## Theme override contract

Generated artifacts that ship dark-mode tokens must support explicit display.dev theme overrides. The token stack travels as three blocks:

```css
:root { /* canonical light tokens */ }

[data-theme="dark"] { /* explicit chrome/user dark override */ }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]):not([data-theme="dark"]) {
    /* raw HTML/system dark fallback */
  }
}
```

The media query is fallback only. Never let `@media (prefers-color-scheme: dark) { :root { ... } }` override an explicit `data-theme="light"` choice, and never ship system dark mode without a `[data-theme="dark"]` selector. The display.dev bar writes `data-theme` on `<html>`; artifact CSS has to respect it.

## Token hierarchy — two layers

Primitive tokens define the vocabulary; semantic tokens reference them.

```css
:root {
  /* Primitives — never consumed directly by templates. */
  --gray-50: oklch(0.98 0.005 85);
  --gray-900: oklch(0.18 0.005 85);
  --blue-500: oklch(0.55 0.18 250);

  /* Semantic — what templates consume. */
  --background: var(--gray-50);
  --foreground: var(--gray-900);
  --primary: var(--blue-500);
}

[data-theme="dark"] {
  --background: var(--gray-900);
  --foreground: var(--gray-50);
  --primary: oklch(from var(--blue-500) 0.7 c h);
}
```

Dark mode redefines the **semantic** layer, never the primitive. Templates always consume semantic tokens (`var(--primary)`, not `var(--blue-500)`). Hand-coding a primitive in a template breaks brand-trump — a brand color change at the primitive layer should re-tune every semantic that references it.

## Alpha is a design smell

Heavy `rgba()` / `hsla()` usage usually means the palette is incomplete. Stacked translucent panels — modal-over-card-over-background, three layers of `0.6` alpha — produce unpredictable contrast (the underlying pixel determines the final color) and FPS hits on retina-class renders.

Define explicit overlay tokens for each context (`--overlay-modal`, `--overlay-tooltip`, `--surface-tint`) instead of `rgba(0, 0, 0, 0.4)` everywhere. Carve-out: focus rings and interactive states genuinely need see-through (the underlying color matters for affordance).

## Color-blind testing

8% of men, 0.5% of women — globally ~300M readers. Color alone never carries state in a visualize artifact; pair with shape (▲ / ▼ / ●), pattern (solid / dashed / dotted), or label.

Categorical pairs to avoid: red-green, green-brown, blue-purple, light-green + yellow. Prefer blue-orange or purple-yellow for high-contrast categorical encoding.

Grayscale test as the floor: if the artifact still parses with all color stripped, color isn't the only signal. Browser DevTools → Rendering → Emulate vision deficiencies runs the simulation per-deficiency type.

## Failure modes the agent reaches for

- **Purple-to-pink hero gradient.** Detector flags it; AI-essay register tell. Don't reach for it.
- **Gradient text on metrics or headings.** `background-clip: text` + gradient background. Match-and-refuse — no brand redeems it.
- **Neon glow on dark mode.** `text-shadow: 0 0 20px <color>` reads as 2017 cyberpunk template. Skip unless the brand carries a deliberate retro-tech register, and even then use once, not on every heading.
- **Six accent hues on a chart.** Chart-encoding rules live in [data-viz.md](data-viz.md); the color-side note is that six hand-picked accents reads as "I had access to a color wheel" regardless of which palette they came from.
- **AI palette token stack.** Purple primary + cyan accent (or magenta + indigo) — the most-trained-on AI-startup gestalt. Single-hue brand identity is fine; the *combination* is the slop.
- **Wikipedia-blue + Wikipedia-purple visited links.** Brand `--primary` on both states, or `--foreground` with underline on both.
- **Severity color on non-severity chrome.** Red on a "primary action" button reads as destructive. Reserve red for destructive state.
- **Pure black on pure white.** `oklch(1 0 0)` background + `oklch(0.1 0 0)` foreground reads as harsh — and as unstyled `<body>` on prose-heavy artifacts. Warm-tint both poles.
- **Tinting always-warm-or-always-cool by reflex.** Brand-decision-not-default applies to the tint hue as much as the primary hue.
- **One vivid primary serving both light and dark mode.** A `--primary` that pops on white over-saturates on a dark surface; lift L and drop C slightly per-mode.
- **Alpha-stacked surfaces.** Three layers of `rgba(0,0,0,0.05)` to imply depth. Use defined surface tokens from the elevation scale.
- **Hover / focus / placeholder states not independently meeting WCAG.** Rest state designed to AA; hover or placeholder ships at 3:1 against the same background. Check every state.
- **Color as the only signal in a chart series.** Red-up / green-down distinguishable only by hue is the color-side failure; chart-side remediation (shape, pattern, direct label) lives in [data-viz.md](data-viz.md).
