# Typography

Type scale, pairing, weight, rhythm, fluid sizing, OpenType, web-font loading, accessibility for visualize artifacts. Brand profile overrides every rule below — if `DESIGN.md` declares a typeface or scale, use that. The rules here are the fallback when the brand profile is silent. Visualize artifacts are static presentation surfaces (reports, decks, dashboards, runbooks), not app product UI; rules below assume that register.

## Type scale

Geometric scale rooted at 16px body. Display-grade and text-grade are different glyphs on quality typefaces; honour the distinction when the brand provides both.

| Role      | Size  | Line-height | Weight  |
|-----------|-------|-------------|---------|
| display   | 56px  | 1.05        | 700     |
| h1        | 36px  | 1.15        | 700     |
| h2        | 28px  | 1.2         | 600     |
| h3        | 22px  | 1.3         | 600     |
| h4        | 18px  | 1.4         | 600     |
| body      | 16px  | 1.6         | 400     |
| small     | 14px  | 1.5         | 400     |
| caption   | 12px  | 1.5         | 500     |

Pick one geometric ratio and commit — 1.25 (major third), 1.333 (perfect fourth), 1.5 (perfect fifth). Mixing ratios across an artifact is the muddy-hierarchy tell.

Brand can scale this whole table up (publishing register, 17–18px body) or down (compact ops register, 14–15px body). Keep the geometric ratio; adjust the root and let the scale follow.

Display-grade vs text-grade glyphs differ on quality typefaces; if the brand licences both (Sentinel Display + Sentinel Text), use display ≥36px and text-grade for body and smaller.

## Typographic roles

Nuance comes from assigning each text fragment a job before assigning size, weight, case, or colour. Use this as the default role map when the brand profile is silent.

| Role | Size | Weight | Colour | Notes |
|------|------|--------|--------|-------|
| Hero claim | `2rem`-`3.5rem` clamped | 650-750 | foreground | One per artifact or section cover; not for captions, labels, or table intros. |
| Section title | `1.375rem`-`1.875rem` | 600-700 | foreground | Names a real section boundary. Do not use for table captions. |
| Body prose | `1rem` | 400 | foreground | Main reading stream, max 65ch. |
| Supporting prose / deck | `0.9375rem`-`1.0625rem` | 400 | muted foreground | Context that should recede but stay readable. |
| Label / eyebrow | `0.6875rem`-`0.8125rem` | 500-650 | muted foreground or primary | Short uppercase only; track `0.05em`-`0.12em`. |
| Metadata value | `0.875rem`-`0.9375rem` | 400-500 | foreground | Pair with a visible label; don't hide field meaning inside a chip. |
| Caption / source note | `0.75rem`-`0.875rem` | 400-500 | muted foreground | Names source, caveat, or figure context; never carries the main argument. |
| Code / ID / timestamp | `0.8125rem`-`0.9375rem` | 400-500 | foreground or muted | Mono only for fixed-width reading, not for decorative "technical" tone. |

De-emphasis uses two channels together: slightly smaller size and a muted foreground token. Do not de-emphasize body copy by dropping opacity below the contrast floor. Emphasis uses one channel at a time: weight, foreground colour, or placement; using all three everywhere makes hierarchy flat.

## Table typography

Tables need tighter roles than prose because the reader scans across rows and down columns.

- **Table caption / intro:** `0.8125rem`-`0.9375rem`, line-height `1.4`-`1.5`, muted foreground, 8-12px spacing from the table. If the sentence is the argument, make it a normal paragraph before the table; the caption should only identify the table or its source.
- **Header row:** `0.6875rem`-`0.8125rem`, 500-600 weight, uppercase only with `0.04em`-`0.08em` tracking. Headers recede enough that body values win.
- **Body cells:** `0.875rem`-`1rem`, regular weight, line-height `1.45`-`1.55`. Use `font-variant-numeric: tabular-nums` on numeric tables.
- **Row labels:** first column may be semibold (500-600) when it is a row key. Do not bold full sentence cells or every first-column paragraph.
- **Mono cells:** IDs, paths, code, timestamps, and aligned numeric columns only. A whole table in mono reads as costume unless the artifact is a terminal log.

Bad smell: a bordered table starts with a large sentence at `1.2rem+`, then a tiny header row. That is two hierarchies fighting in one component. Shrink the sentence into a caption/source note, or move it outside the table as prose with normal section spacing.

## Vertical rhythm

Line-height × body-size is the base unit for *all* vertical spacing in the artifact — margins, padding, gaps. Body at 16px × 1.6 = 25.6px → round margins and section spacing to multiples of 24px or 32px so prose, lists, headings, and chrome share a baseline.

Use unitless `line-height: 1.5` (not `24px`) so it scales with the size it's applied to. Use `em` units for margins on text elements so spacing scales with the text it surrounds.

Modern: `rlh` unit equals root line-height (newly available 2023, Baseline widely available May 2026). Usable as the rhythm primitive — `margin-block: 1.5rlh` reads "1.5 root line-heights of vertical space" and self-adjusts when the root size changes.

Why for visualize: artifacts get scanned, not read line-by-line. Rhythm is what makes a slide deck feel composed instead of dumped.

## Measure (line length)

Body prose caps at 65ch (range 45–75ch). Multi-column layouts drop to 40–50ch per column.

Use `ch` units, not `px` — measure scales with the typeface. Wider columns need tighter line-height; narrow columns need looser (inverse relationship).

This is a body-prose rule. Dashboard tiles, table cells, KPI labels don't have a measure — they have a slot width.

## Pairing

- **Sans + sans** (single family across display and body): the default. Cleanest, most legible, no register collision.
- **Serif body + sans display**: editorial register only. Reads as publication; off-register for dev-product or ops.
- **Serif display + sans body**: rare. Reads as institutional / academic. Whitepaper template's natural pairing.
- **Display family + text family from same foundry**: best when the brand licences both grades (e.g. Hoefler's Sentinel Display + Sentinel Text). Honour the optical-sizing distinction.

Mono is its own track. Reserve for code, identifiers, IDs, timestamps.

Prefer one family in multiple weights over two competing typefaces — one well-chosen family creates cleaner hierarchy than two. Add a second family only for genuine contrast (display + body grade from same foundry, or serif headlines + sans body for editorial). Pair on a contrast axis (serif vs sans, geometric vs humanist, condensed display vs wide body); similar-but-not-identical families (two geometric sans-serifs) produce tension without hierarchy.

## Weight discipline

Three weights per family, max: regular (400), semibold (600), bold (700). Anything more is vanity unless the brand explicitly carries five or six weights as identity (a16z's manifesto register; Hoefler's specimen pages).

Italics scope: emphasis in running text. Titles, captions, and chrome stay upright.

## Fluid typography

`clamp(min, preferred, max)` for hero headings on artifacts that get printed *and* projected. **The min and max must be `rem` (or `em`), never bare `px`** — user-agent zoom scales `rem` and `em` but not `vw`, so a bare-`vw` `font-size` silently breaks zoom.

```css
/* Body — fixed scale, no fluid. */
font-size: 1rem;

/* Display hero — clamped, rem-floored. */
font-size: clamp(1.75rem, 1rem + 3vw, 3.5rem);
```

Two rules on the ratio: **WCAG 1.4.4 requires `max ≥ 2 × min`** so users can scale text to 200%; **design taste keeps `max` around `2–2.5 × min`** so large viewports don't shout. The first is hard; the second is a register call. Inside container queries, use `cqi` instead of `vw` so type scales with the container — see [responsive-design.md](responsive-design.md) for the unit primitives.

When fluid earns its place: hero headings on a slide-deck cover; display sizes on a dashboard that ships to both a laptop and a wall monitor. When it doesn't: body text, captions, table cells, dashboard tile labels — fixed `rem` scales win for spatial predictability.

## Light-on-dark compensation

Light text on dark surfaces halates (irradiation illusion) — reads heavier and tighter than the same type on light. Fix all three axes, not just one:

1. Bump `line-height` by +0.05 to +0.1 (e.g. body 1.6 → 1.65).
2. Add `letter-spacing` +0.01em to +0.02em.
3. Step weight down one notch — 700 → 600 on headings; 400 → 350 on body if the variable font supports it.

Both poles stay warm-tinted (see [color.md](color.md)) — pure-white-on-pure-black amplifies the halation.

Visualize artifacts default dark often (slide decks under projection, dashboards in NOC contexts) — this compensation is per-template-category critical, not optional polish.

## ALL-CAPS tracking

Caps and small-caps sit too close at default spacing. Add 5–12% `letter-spacing` (`0.05em` to `0.12em`). For small-caps via `font-variant-caps: all-small-caps`, prefer fonts that ship genuine small-cap glyphs (synthesised small-caps look thin); same tracking treatment, slightly gentler. Pair with `font-synthesis-small-caps: none` when the font ships them and you want to refuse the synthesised fallback.

Tracking is for caps and labels — eyebrows, crisp metadata labels, small section markers. Not for body prose. Avoid rounded metadata pills for static document context; labeled fields carry more meaning and age better.

## OpenType features

Four lines that earn their pixel on every data-rendering artifact:

```css
table, .kpi, pre.numeric { font-variant-numeric: tabular-nums; }
.recipe-amount { font-variant-numeric: diagonal-fractions; }
abbr { font-variant-caps: all-small-caps; }
code { font-variant-ligatures: none; }
```

`tabular-nums` alone fixes most "this dashboard looks wrong" diagnoses — proportional numerals wobble between renders when a digit changes width. `diagonal-fractions` for math / recipes / ratios. `all-small-caps` for `<abbr>` and uppercase acronyms inside body prose. `font-variant-ligatures: none` on `<code>` so `=>` doesn't merge into `⇒` and mislead the reader.

`font-kerning: normal` is the default but worth declaring explicitly on `body` as documentation.

## Modern rendering polish

Three one-liners across three different support tiers:

```css
body { font-optical-sizing: auto; }                 /* Baseline 2020 — required */
h1, h2, h3 { text-wrap: balance; }                  /* Baseline May 2024 — required */
@supports (text-wrap: pretty) {                     /* Limited availability as of 2026 — progressive */
  article p { text-wrap: pretty; }
}
```

`font-optical-sizing: auto` lets variable fonts with an `opsz` axis pick the right optical master per size.

`text-wrap: balance` evens out heading line lengths; safe to use liberally on short text (Chromium caps at 6 lines, Firefox at 10).

`text-wrap: pretty` reduces orphans in body prose but is still **Limited availability** (blocked in Firefox; Safari 26+ in 2025), so it ships behind `@supports`. Apply to long-form `<article> p` only, not every paragraph — it runs a slower algorithm.

## Web font loading

Visualize artifacts are mostly self-contained HTML — fonts are bundled or CDN-loaded. The loading rules:

- `font-display: swap` on branded fonts. FOUT (flash of unstyled text) is acceptable; FOIT (invisible text) is not.
- `font-display: optional` when zero layout shift matters more than seeing the branded font on a slow connection.
- Preload only the critical weight (regular, above the fold). Preloading every weight costs more than it saves.
- Match fallback metrics with `size-adjust`, `ascent-override`, `descent-override` on the `@font-face` block so the fallback occupies the same space as the web font.
- Variable fonts for ≥3 weights — one file beats three static weights on bytes. For 1–2 weights, static is fine.

Ship only the weights the artifact uses. A printable report bundling 4 static weights is 800kb of font for a 30kb document.

## System fonts when appropriate

`-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` loads instantly, OS-hinted for the user's screen, reads as native.

Scope: ops-register artifacts (runbooks, internal dashboards) where performance > personality and `DESIGN.md` is silent. Off-register for publishing-register reports, branded slide decks, or any artifact that crosses org boundaries — system font on a Mac reader is San Francisco; on a Windows reader is Segoe UI; the artifact reads differently in each place.

If `DESIGN.md` declares a typeface, the system stack is wrong.

## Accessibility

- Viewport meta allows zoom. If layout breaks at 200% zoom, fix the layout (`user-scalable=no` is the wrong escape hatch).
- Body sizes in `rem` / `em` — respects user browser settings. Raw `px` on body locks the reader out of size overrides.
- ≥16px on focused form controls — iOS auto-zooms inputs with font-size under 16px. Body prose at 14–15px is allowed but reads tight; visualize default body is 16px.
- WCAG 1.4.12 floor for prose: `line-height ≥ 1.5`, `letter-spacing ≥ 0.12em` when overridden, `word-spacing ≥ 0.16em` when overridden, `paragraph-spacing ≥ 2em`. Design with these as the floor so reader text-spacing tooling doesn't break the layout.

## Failure modes the agent reaches for

- **Display-text everywhere.** H1 at 144px, H2 at 96px, body at 24px. Reads as conference deck, not artifact. Cap display sizes to the scale unless the brand documents manifesto register.
- **Weight overload.** Five weights on one page reads as vanity; shipping five static-weight files is 200–800kb of font for a 30kb document. Two weights is usually enough; three is the ceiling unless the brand carries identity weight. Ship only the weights the artifact uses.
- **Mono on body prose.** Reads as costume. Mono for code and identifiers only.
- **Table captions at lede scale.** A sentence above a table at `1.2rem+` with little padding makes the table read like dumped prose. Captions stay small and muted; arguments live outside the table.
- **Bold table prose.** Row labels can be semibold; whole table cells and paragraphs should not be bold unless they are totals or one-word states.
- **Gradient text on H1.** Detector flags it; the brand profile cannot redeem it.
- **Wikipedia-blue links.** Use the brand `--primary`, not the system default.
- **Centered prose.** Body copy left-aligns. Centered prose reads as poster, not document.
- **Bare-`vw` font sizes.** `font-size: 5vw` with no `rem` floor breaks user zoom. Always `clamp(rem-floor, …, rem-ceiling)`.
- **Fixed-pixel line-heights.** `line-height: 24px` doesn't scale with `font-size` overrides. Use unitless (`1.5`) or `em`.
- **`tabular-nums` missing on dashboards.** Numbers wobble across renders as digit widths shift. One CSS line fixes it.
- **Two similar sans-serifs paired.** Geometric + geometric, humanist + humanist — tension without hierarchy. Pair on a contrast axis or use one family in multiple weights.
- **`text-wrap: pretty` applied universally.** Slow algorithm on long-form content. Scope to `article p` or equivalent; on the whole document it taxes every paragraph render.
- **Light-on-dark with the same weight as light mode.** Halation makes it look heavier and tighter. Apply the three-axis compensation (line-height, letter-spacing, weight step-down); a foreground-colour swap alone is incomplete.
- **Tracked-out body prose.** Letter-spacing is for caps and labels. `+0.05em` on a paragraph reads as broken, not refined.
