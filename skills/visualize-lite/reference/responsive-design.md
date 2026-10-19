# Responsive design

Viewport ladder, modern primitives, print, and `prefers-*` for visualize artifacts. Brand profile overrides — if `DESIGN.md` declares breakpoints, fluid scales, or a dark-mode strategy, use those. The rules below are the fallback when the brand profile is silent.

Visualize artifacts are **content surfaces** (reports, decks, dashboards, diagrams, runbooks), not apps. Fewer breakpoints than an app shell. Container queries on components, not media queries everywhere. Print is a first-class context for prose-heavy registers. Projector is a real rung for slide decks.

## Viewport ladder

Five rungs. Print is a separate context, not a rung.

| Rung | Range | Primary cases |
|---|---|---|
| mobile | 360–480 | phone vertical; opened from a chat link |
| tablet | 481–900 | phone landscape, tablet portrait |
| desktop | 901–1440 | laptop, monitor in window |
| large | 1441–1920 | full-screen monitor, side-by-side review |
| projector | 1921+ | wall display, slide deck on a boardroom screen |

Two breakpoints usually suffice (640 + 1024). Three when the artifact has a dashboard register (640 + 1024 + 1440). Beyond three is over-specification — most reflow should be fluid, not stepped.

**Smoke widths for QA**: when verifying a render, sweep three concrete widths chosen *within* the rungs above — **320px** (narrow phone, the strictest mobile case), **768px** (tablet portrait), **1280px** (typical desktop laptop). A single sweep through these three confirms reflow across the practical span; they're not breakpoints (don't author `@media` queries against them), they're QA spot-checks.

Default to mobile-first authoring — base styles target the narrowest rung, `min-width` queries layer up. Author desktop-first only for true projector-only artifacts (boardroom screen, no mobile path); rare.

## Modern primitives — native-platform-first

Same doctrine as [motion.md](motion.md): reach for the platform primitive over the JS / library replacement.

- **`clamp(min, preferred, max)`** for fluid type and spacing. Default to it over breakpoint-jump font sizes. **Zoom safety (WCAG 1.4.4)**: use **`rem` / `em` floors** (not bare `px`) and keep the `vw` contribution modest — a `vw`-only `font-size` is hostile to zoom because the user-agent zoom scales `rem` and `em` units but not `vw`. Bound the ratio: `max` ~2.5× `min` is a safe ceiling. Pattern: `clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem)` for body, `clamp(1.75rem, 1rem + 3vw, 3.5rem)` for display. Test at 200% and 500% zoom before shipping.
- **Container queries** (`container-type: inline-size` on the parent, `@container (width > N)` on the rules) for self-contained components inside variable parents — cards, chart tiles, callouts, sidebars. Units: `cqi` / `cqb` / `cqmin`. Baseline-supported (Chrome 105+, Firefox 110+, Safari 16+).
- **`aspect-ratio`** on charts, image holders, video embeds — prevents CLS, keeps proportions through reflow. Required on any media that loads after first paint.
- **`light-dark()`** with `color-scheme: light dark` declared on `:root` — replaces dark-mode `@media` blocks for many cases; one declaration carries both modes. Fall back to `prefers-color-scheme` media queries when tokens are layered or tooled.
- **`dvh` / `svh` / `lvh`** instead of `vh` on slide decks and hero sections — `100vh` is broken on mobile browsers (chrome-math). For **first-screen heroes and read surfaces**, default to `100svh` — it's stable when browser chrome appears/disappears, so the layout doesn't resize as the user scrolls. For surfaces that should genuinely fill the *current* visible viewport (full-bleed slide a user is mid-presenting), use `100dvh`. `lvh` is for surfaces that need the *maximum* viewport (loading splash that should fill even when chrome is hidden).
- **Logical properties** (`margin-inline`, `padding-block`, `inset-inline-start`) for any artifact that may render RTL or vertical — whitepaper, editorial, and case-study templates especially.
- **`text-wrap: balance`** on headings, **`text-wrap: pretty`** on body prose. Baseline-supported. Catches orphan words on display sizes without manual `<br>` placement.

## Container queries vs media queries

- **Media queries** answer *what shape is the page* — global layout decisions (sidebar in / out, single vs multi-column, grid column count).
- **Container queries** answer *what shape is this component's slot* — stack/horizontal card flips, dashboard tile inner reflow, callout-in-narrow-sidebar vs callout-in-wide-body. The same component reused in different slots.

Rule of thumb: if the same component appears in two slots and needs to look different in each, it's a container query. If the decision is "what device am I on," it's a media query.

## Touch-target sizing

- **WCAG 2.2 SC 2.5.8 baseline: 24×24 CSS px** minimum for any interactive target. Best-practice: **44×44** on coarse pointers.
- **Counts** as interactive chrome: download / print / share / copy buttons, theme toggles, deck prev/next, dashboard filter chips, expandable section headers.
- **Exempt**: inline prose links inside body copy (the SC 2.5.8 spacing exception — surrounding text creates spacing), footnote references.
- **Adapt to input method** via `@media (any-pointer: coarse)` for target-size decisions — chrome buttons get larger padding when *any* available pointer is coarse, even on a hybrid laptop whose primary pointer is fine. Reserve `@media (pointer: coarse)` and `@media (hover: hover)` for affordance choices that depend on the *primary* input (hover-state authoring, cursor design). Don't infer input from screen size; touchscreen laptops are real.

## `prefers-*` media queries

- **`prefers-reduced-motion`** — mandatory. Covered in [motion.md](motion.md); restated here for cross-reference.
- **`prefers-color-scheme`** — mandatory if the artifact ships dark mode. Pair with `color-scheme: light dark` CSS property + `<meta name="color-scheme" content="light dark">` so browser chrome (scrollbars, form widgets) matches.
- **`prefers-contrast: more`** — optional but worth shipping. Lift `--foreground` / `--border` contrast for high-contrast users; artifacts viewed in projection / sunlight / accessibility-tool contexts benefit.
- **`prefers-reduced-transparency`** — optional. Drop backdrop-blur and translucent overlays to opaque equivalents. Win/macOS/iOS users with vestibular sensitivities or low-end GPUs.
- **`prefers-reduced-data`** — future-facing only. The CSS media feature is experimental and no major browser supports it as of 2026; ship a reduced-data path via the HTTP `Save-Data` request header or by authoring a manual low-data variant (smaller hero imagery, no decorative embeds) rather than relying on the CSS query. Worth tracking — when it ships, the wrap will be one media query away.

## Print stylesheet

Reports / whitepapers / postmortems / ADRs / runbooks — anything likely to be printed needs a `@media print` block. Decks and dashboards typically don't (their print path is "export PDF from screen" which doesn't invoke print CSS).

```css
@media print {
  @page { size: auto; margin: 2cm; }            /* let the UA / printer pick — A4 or Letter as configured */
  body { background: white; color: black; }     /* coloured bgs print as muddy blocks */
  figure, pre, table, .callout, .kpi { break-inside: avoid; }  /* don't split across pages */
  h2, h3 { break-after: avoid; }                /* keep heading + first paragraph together */
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.9em; }  /* reader holds paper */
  nav, .theme-toggle, .copy-button, .animation-host { display: none; }       /* strip non-content chrome */
}
```

If the artifact ships to a known sheet size (a printed report bound to A4, a US-only deliverable on Letter), override `size: auto` with the explicit size — but `auto` is the better default.

Use the modern `break-inside` / `break-before` / `break-after` family, not the legacy `page-break-*` aliases. Test against a ≥3-page render — single-page artifacts hide all the break failures.

## Fluid typography

- Body base: `clamp(0.9375rem, 0.875rem + 0.25vw, 1.0625rem)` — `rem` floor (zoom-safe), narrow phone-legibility band, gentle `vw` ramp, capped at comfortable max. Don't drop below 14px effective size on mobile (iOS auto-zooms inputs under 16px).
- Display headings can scale further (`clamp(1.75rem, 1rem + 3vw, 3.5rem)`), but bound the max — a 144px hero on a 27" monitor reads as a marketing template, not an artifact.
- Use **`cqi`** instead of `vw` when the type sits inside a container-query context — type scales with the container, not the page.
- A bare-`vw` `font-size` (no `clamp`, no `rem` / `em` floor) breaks 200% zoom because the user-agent zoom doesn't scale viewport units. Always bound, always use a `rem` / `em` minimum.

## Failure modes the agent reaches for

- **Fixed `min-width: 1024px`** on a layout. Anything narrower horizontal-scrolls; mobile reader bounces.
- **`width: 100vw` with padding** — overflows the viewport by `2 × padding`. Use `width: 100%` or `max-width: 100%`; let the parent constrain.
- **`100vh` on a hero on mobile** — browser chrome cuts the bottom. Use `100dvh`.
- **Body text under 14px on mobile.** Reads as broken, fails low-vision use, and iOS auto-zooms form inputs under 16px on focus.
- **Long button labels mobile-clipping.** *"Download as Markdown"* truncates inside a 320px column. Shorten on coarse pointer or wrap.
- **Scroll-jacking on a deck viewed on phone.** The deck was designed for projector swipe; on mobile the scroll-snap fights the OS. Disable scroll-snap below 640px.
- **Dark mode as inverted light mode** (also a failure mode in [color.md](color.md)) — the responsive layer's part: include `prefers-color-scheme` in the verify pass, not just a hex swap at the token layer.
- **Section-reveal animations firing on resize / orientation flip.** Wrap reveal animations in `prefers-reduced-motion: no-preference` so an orientation change doesn't trigger a re-animation.
- **Chart that doesn't reflow.** A 900px-wide line chart on a 360px viewport. Use responsive SVG (`viewBox` + `preserveAspectRatio`), or swap to a mobile-shaped alternative (sparkline, single-stat tile).
- **Dashboard tile-grid designed for 3×4 desktop** becoming an unordered single-column on mobile. Container queries on each tile + an explicit mobile order via `order:` / `grid-row`.
- **Slide deck designed for projector but viewed on phone** — 56px display type at 16:9 is unreadable on a 360px portrait viewport. Author with `cqi`-based fluid type, or ship a per-deck mobile-fallback (one slide → one screen, stacked).
- **`vh`-based hero on mobile.** Use `dvh`. (Restated because this one is the most common silent failure.)

## Cross-refs

Brand override and dark-mode rules: [color.md](color.md). Type scale and weight: [typography.md](typography.md). Motion + `prefers-reduced-motion`: [motion.md](motion.md). Spatial scale + density registers: [spatial.md](spatial.md).
