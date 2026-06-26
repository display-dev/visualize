# Data graphics

Honesty, density, and comparison structure for charts and data displays inside visualize artifacts. Loaded when the artifact contains — or will contain — a chart, sparkline, KPI tile, or data table. The trigger is the shape, not the template name. Brand profile overrides specific values; the rules below are the fallback.

The principles below are LLM-judgement calls, not detector rules — the detector catches mechanical anti-patterns (gradient text on metrics, etc.), but data-visual relationships don't reduce to regex.

**Apply the analytical principles (proportional encoding, comparison structure, data-ink ratio); do not apply the cream + Georgia + side-margin-notes aesthetic** — that's second-order slop for non-editorial topics (SKILL.md). The brand profile owns colours and type; this reference owns chart honesty and density.

## Honesty

Every chart's visual proportion should match its data proportion. The rough check: would a reader who can't see the axis labels still come away with the right magnitude impression?

- **Linear data, linear encoding.** Bar lengths, line heights, scatter positions encode linearly. Don't encode a 2× difference as a 4× area or an 8× volume.
- **Baselines.** Bar charts and area charts start at zero unless the artifact is comparing values inside a narrow band that genuinely doesn't include zero (e.g. body temperature, exchange rates, response-time percentiles). When you truncate the baseline, mark the axis break visibly and call it out in the chart label.
- **3D effects on data marks.** Don't. Depth, drop shadows, gradient fills on bars or pies add a fake dimension and distort the perceived proportion. The brand can declare a register that uses 3D for *decoration* (a hero illustration); it can't redeem 3D on data graphics.
- **Pie charts.** Reserve for two-slice or three-slice part-to-whole where the proportions are visually distinct (50/50, 30/70, 33/33/33). Beyond that, a horizontal bar chart reads faster. Donuts inherit pie's limits.
- **Dual y-axes.** A chart with two y-axes invites the reader to infer correlation from a visual coincidence the author chose by picking the axis scales. If both series matter, use small multiples instead.

## Data-ink

Erase what isn't carrying information. The eraser test: cover an element with your thumb — if the chart still reads, the element was decoration.

- **Grids.** Mute or remove. If the reader needs a reference line, draw one specific reference line at a meaningful value (target, threshold, last-period mean), not a full grid.
- **Axes.** Thin, neutral-foreground, no tick chrome beyond what the labels need. A range-frame (axis line spanning only the data extent) carries the data range without an extra annotation.
- **Labels.** Direct labels on the data marks beat a separate legend when the chart has ≤5 series. Legends are an indirection the eye has to resolve; direct labels skip it.
- **Colour by default neutral.** Neutral fills (`--muted-foreground` family) on non-focal series, `--primary` reserved for the highlighted series or the current-period mark. Four hand-picked accents for four series reads as "I had access to a colour wheel" — same failure mode as the `color.md` six-accent ban.
- **Classify every colour.** Each colour on a chart serves one of four roles: *label* (categorical distinction), *measure* (sequential / diverging scale), *represent* (status, brand mark, real-world referent), or *decorate* (no function). Drop colours that only decorate.
- **Ordered quantities want a single hue, light→dark.** Heatmaps, severity ramps, sparkline gradients, progress chips — single-hue value ramp (`oklch(...)` stepping L while holding C and H). The equal-saturation rainbow (ROYGBIV) most chart libs ship reads as unordered; the eye doesn't naturally read red→orange→yellow→green as ascending.
- **Red-vs-green alone fails ~5–10% of viewers.** When colour carries the signal, the contrast must survive desaturation. Add a shape, pattern, or label channel when colour is the only cue.
- **Container chrome.** Heavy borders, drop shadows, and rounded-card frames around every chart fragment a dashboard. A dashboard is a layout; the chart is the data. Let the spacing carry the grouping.

## Comparison

Every chart should make a comparison legible. The rough check: can the reader answer "compared to what?" without re-reading the chart title?

- **Compared to itself across time** — a sparkline or line chart. Anchor with start/end values or min/max.
- **Compared to a target or threshold** — a single reference line, labelled with the target value. Don't draw the threshold as a coloured band unless the band itself is the data (acceptable range).
- **Compared across categories** — a sorted bar chart (sorted by value, not alphabetical, unless the categories have a natural order). Same-scale small multiples when each category deserves its own panel.
- **Compared to peer cohort** — overlay the cohort distribution behind the focal series (faint), foreground the focal series.

When the answer to "compared to what?" is "nothing" — the artifact has a number, not a chart. Render it as a labelled number, not a one-bar bar chart.

## Annotation

A chart with a story to tell — a spike, a regression, a threshold being crossed, the moment a deploy ran — should annotate that story *on the plotting field*, not in a separate caption below the chart.

- **Words on the data, not in a side caption.** A small label adjacent to the spike ("v2.3 deploy") reads at the same moment as the spike itself. A footnote referring to "the second peak" forces the eye to round-trip between caption and chart.
- **Short prose, not codes.** "Outlier — Cyber Monday" beats `*`. Type size can be small because the prose is short.
- **Reserve annotation for the actual argument.** Annotating every data point reverts to a legend in disguise; annotate the 1–3 moments the chart is making a claim about, not the whole series.
- **Annotation recedes; data dominates.** Annotation text in `--muted-foreground` weight, with a thin connector line if needed, keeps the data marks visually primary. Annotation that competes with the data fails the squint test.

## Density

High-data-density displays are quality, not clutter — *when* the layering is right. Density without layering is noise.

- **Sparklines** for trend-shape next to a current value: `Latency  120ms ▁▂▃▅▇▇▆▅ 132ms`. Height ≈ x-height of the surrounding text. No axes, no grid. Reserve a red/primary dot for an anomaly or the current value. Use in tables where each row is one metric; the eye scans the column of sparklines vertically for which metrics are trending where.
- **Small multiples** for comparison across a categorical or temporal dimension: same encoding, same scale, repeated. The eye crosses panels effortlessly because nothing changes except the data. Tight inter-panel spacing — gaps wider than the chart pads pull the panels into separate displays.
- **Micro/macro layering** for dashboards: the macro view (overview tiles, sparkline column) lets the reader see *which rows changed*. The micro view (table cells with the numbers, expand-on-hover detail) lets them see *what changed*. Both on one page, separated by visual weight rather than tabs.
- **Layering for dense displays.** Primary data in `--foreground` weight; secondary series in `--muted-foreground`; reference lines and annotations one step lighter again. Squint test: when the chart blurs, the most important elements should be the ones still visible.

## Tables

A data table is a dense reading surface, so its typography has to carry scan order without turning every cell into a headline.

- **Caption / intro:** `0.8125rem`-`0.9375rem`, muted, line-height `1.4`-`1.5`, padded or spaced clearly from the grid. The caption identifies what the table contains, the source, or the caveat. If the sentence is the main argument, place it as prose before the table instead of inside the table frame.
- **Column headers:** `0.6875rem`-`0.8125rem`, 500-600 weight, uppercase only with `0.04em`-`0.08em` tracking. Header labels should be crisp, not loud.
- **Body cells:** `0.875rem`-`1rem`, regular weight, line-height `1.45`-`1.55`. Let padding and rules create row rhythm; don't use display-size text to compensate for weak layout.
- **Row keys:** first-column labels may be 500-600 weight. Bold only the key phrase, not a paragraph-length explanation.
- **Numeric / code columns:** use mono plus `tabular-nums` for values that benefit from alignment. Keep prose columns in the text face.
- **De-emphasis:** use muted foreground and smaller type for notes, sources, and secondary values. Do not rely on opacity that falls below contrast requirements.

## Aspect ratio

Default to a horizontal rectangle, ~1.5:1 wider than tall. The eye is trained on horizontal deviation (analogy to the horizon), labels run left-to-right, cause-effect reads in the same direction.

- **Smoothly-changing curves** can be taller without losing legibility — a slow exponential, a sigmoid, a steady ramp.
- **Wiggly curves must be wider than tall** (Tukey's rule). A volatile time-series rendered square reads as noise; the same data at 2:1 reads as pattern.
- **Square is right for two-dimensional comparison** — scatter plots where both axes are co-equal, heatmaps, confusion matrices. Square is wrong for time-series.
- **Portrait is wrong by default.** The agent reaches for portrait because dashboard cards are often portrait-shaped; the chart inside still wants horizontal. Break the chart out of the card before forcing it to fit.

## Failure modes the agent reaches for

- **Six-series chart with six accent hues.** Mirrors the `color.md` failure. Use a neutral ramp with primary on the focal series.
- **3D bar chart, donut with depth, area chart with gradient fill below the line.** Direct fake-dimension violation. Use 2D fills with a single neutral.
- **Y-axis truncated to amplify a small change, no axis break shown.** Lie factor > 1. Either start at zero or mark the break and call it out.
- **Pie chart with eight slices.** Use a sorted horizontal bar.
- **One-bar bar chart for a single KPI.** Render the number, not a chart of the number.
- **Every chart in its own rounded card with a drop shadow.** Fragments the dashboard. Let spacing group the charts.
- **Legend with five entries lining up on the right when each series only appears once.** Direct-label the lines or bars; drop the legend.
- **Sparkline scaled to fill a hero block.** A sparkline is word-sized by definition. If it needs to be hero-sized, it's a line chart with axes.
- **Heavy gridlines competing with the data.** Mute (`oklch(0.9 0.003 85)` light / `oklch(0.25 0.003 85)` dark, or rely on `--border-weak`) or remove entirely.
- **Large prose embedded above a table.** A table caption or intro at `1.2rem+` inside a bordered frame looks like unpadded body copy, not table chrome. Move the prose out or shrink it to caption scale.
- **Table body set like display copy.** Oversized cells, bold paragraphs, and mono-washed prose make the table harder to scan. Keep body cells regular and compact; reserve emphasis for row labels, totals, states, and focal columns.
- **Tufte aesthetic on a non-editorial topic.** Cream + serif + side-margin annotation captions on a dev-product dashboard reads as costume. Take the principles; leave the look.
