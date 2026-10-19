# Cognitive load

Density vs clarity tradeoffs for content-heavy artifacts — dashboards, research-briefs, whitepapers, runbooks, survey-results, data-explorers. Brand profile overrides — if `DESIGN.md` declares a density register that pushes past these defaults (a NOC ops brand might run higher density), use that. The rules below are the fallback when the brand profile is silent. Lane: cognitive-load owns chunking, choice volume, disclosure, scan paths, info order, and decision count; [typography.md](typography.md) owns measure; [spatial.md](spatial.md) owns hierarchy + squint; [copy.md](copy.md) owns prose shape.

The principle: density is quality *when the layering is right*. Density without layering is noise. Same data, different cognitive cost — the work is in the organization, not the reduction.

## Chunking — working-memory defaults

Working memory for *unstructured* items is closer to 4±1 than the often-cited "Miller's 7±2." Miller (1956) was about familiar *chunks*, not raw bits — phone numbers work because the digits group into chunks (area code, exchange, line). Cowan (2001) pegged the unstructured-item ceiling at 4±1. Default the artifact to **4 visible items per group**; allow up to 7 only when the items chunk naturally (sequential dates, ordinal scale, same metric type). Beyond 7, the reader can't hold the set — chunk or disclose.

- **Chart series**: 4 lines on a single line chart is the comfortable ceiling; up to 7 when the lines are naturally grouped (e.g. percentile bands p50/p90/p99). Beyond, sort by value and group the tail into "other" or render as small multiples.
- **List items per group**: 4–7 bullets under a heading; break to a new sub-heading if more. The reader's eye loses the group at 8+.
- **Dashboard tiles per row**: 4 visible at desktop; 2 at mobile. Tile grids beyond 4×3 read as a wall of numbers; the reader doesn't process them, just scrolls past.
- **Navigation items**: 4–7 top-level entries. Hide secondary nav behind disclosure; don't pile every section into the chrome.
- **Form fields per visible group**: 4–7 inputs per fieldset / section. Beyond, break into multi-step or collapse non-essential fields behind progressive disclosure.
- **Color encoding on charts**: direct-label at ≤5 series (per [data-viz.md](data-viz.md)); 6+ accent hues per chart is a data-viz failure mode regardless of working-memory limits. The cognitive-load reason it fails AND the data-viz reason it fails both point to: re-encode (sort + group + "other"), or render as small multiples.

## Hick's law — choice overload

Decision time scales logarithmically with the number of choices: `T = a + b·log₂(n+1)`. Doubling the choices does not double the decision time — adding choice 8 is cheaper than adding choice 3 because the reader is already paying the cost of holding the existing set. The mistake is treating any increment as free.

**Informed-choice carve-out**: when the list is sorted, labelled, or familiar (US-state dropdown, weekday picker), Hick's law softens because the choice becomes recognition, not deliberation. Long sorted lists hurt less than short unsorted ones.

Apply ruthlessly:

- **CTAs on surfaces asking the reader to act**: one primary action; demote secondaries. An explanatory report does not need a CTA merely to satisfy this rule. Depicted UI follows [interface-illustration.md](interface-illustration.md).
- **Theme toggle**: smart-default via `prefers-color-scheme`; skip the per-artifact toggle unless the brand profile asks for one (see [simplify.md](simplify.md) navigation density).
- **Navigation surfaces**: ONE per artifact (inline TOC, OR sticky sidebar, OR breadcrumb — not all three).
- **Filter chips on a dashboard**: ≤6 visible; the rest behind "more filters" disclosure.
- **Dialog buttons**: max 3 (cancel + primary + maybe secondary). A 5-button dialog is a 5-decision moment.

## Intrinsic vs extraneous cognitive load

Sweller's cognitive load theory, flattened for artifacts: total cognitive load = intrinsic (topic's irreducible complexity) + extraneous (chrome, decoration, layout choices the artifact imposes). Rule: minimize extraneous, preserve intrinsic.

A 12-stage rollout has 12 stages. Stripping it to 4 stages to "reduce cognitive load" doesn't reduce load — it lies to the reader and shifts the missing complexity onto whoever inherits the rollout. Reduce the extraneous cost (one-look-per-stage layout, parallel structure, no decorative section markers) while keeping the intrinsic structure faithful.

## Decision fatigue

Distinct from Hick's law. Hick's measures how long each decision takes; decision fatigue measures how decision quality degrades across a sequence of decisions. The artifact reduces decision fatigue by removing decisions the reader doesn't need to make.

- **Default everything.** Every toggle, dropdown, and configurable surface ships with the right answer pre-picked. The reader changes only what doesn't fit.
- **For artifacts asking the reader to act, one primary action *identity*** — the same CTA may repeat (hero band + closing band) when both restate the same commitment.
- **For action surfaces, one primary *decision* per section or viewport** — no section asks the reader to pick between two equal-weight actions.
- **Settings appear in the relevant context**, with administration deferred until needed. Settings competing with the main task burn decision-budget on configuration choices the reader did not come to make; placing every setting at the end is not a universal solution.
- **Executive-mode vs analyst-mode**: the same artifact serves both registers if the executive-mode signals (headline claim and supplied top-line numbers; a primary CTA only when action is the reader task) are at the top and the analyst-mode depth (methodology, raw data, edge cases) is below. Don't make the executive reader scroll to the answer.

## Jakob's law — pattern familiarity

Readers spend most of their time on other artifacts; they expect your artifact to work like the ones they know. Don't reinvent the table, chart, or nav — the cost of "wait, how does this work" is paid once per reader and never recovers.

Brand can declare a distinctive register (terminal-native, editorial side-margins, manifesto typography) — Jakob's is an input, not a veto. The right shape: distinctiveness lives at the brand register; conventions live at the component shape. A terminal-native brand can still use a standard sortable table — the wrapper is brand, the contents are convention.

## Progressive disclosure

Layer the immediate answer, supporting explanation, and full account according to the reader's task, with clear entry points when detail is disclosed. Do not hide information that changes the conclusion, scope, permissions, evidence strength, or available action. Apply SKILL.md's preservation scope; moving detail out of the primary path does not authorize deleting it.

- **Lead answer + supporting body** lets readers choose depth where a summary fits the approved pacing; it is not a mandatory opening for narrative or tutorial sequences.
- **Expandable comparison detail** can hold supplementary conditions or raw evidence. Choose visible columns from the comparison question, not a fixed column count; interpretation-changing conditions remain visible.
- **Footnotes / sidenotes** can carry provenance without interrupting prose, while evidence limitations stay beside the claim they qualify.
- **Inline code; full code on demand** keeps short snippets recognizable and longer blocks behind a clear heading or accessible link.
- **Show, then explain** when seeing the result helps understand the method; retain the source's required argument order when the result needs that context first.

**Modern affordances** (Baseline gating matters):

- `<details>` / `<summary>` is Baseline widely available — ship unguarded.
- `interpolate-size: allow-keywords` for smooth accordion height animation is **Limited availability** — wrap in `@supports (interpolate-size: allow-keywords)`; accept a snap fallback in unsupported readers.
- CSS anchor positioning for inline tooltips: `anchor()` Baseline January 2026, `position-anchor` still Limited — gate behind `@supports (position-anchor: --x) and (top: anchor(bottom))` (the `position-anchor` property is the Limited piece; `anchor-name` alone isn't a strong enough check).

## Scannability — F-pattern and Z-pattern

Readers scan before they read. The pattern they follow depends on the artifact shape:

| Artifact shape | Scan pattern | What it implies |
|---|---|---|
| Long-form prose (reports, whitepapers, articles) | **F-pattern** | Headline + claim at top; structural h2s on the left margin; paragraph openings carry high scan weight (see [copy.md](copy.md) for the prose-shape rule). |
| Landing-style (release announcements, one-pagers) | **Z-pattern** | Top-left logo / nav → top-right CTA, diagonal to bottom-left hero claim → bottom-right final CTA. |
| Dashboards (tile grids, data-explorers) | **Grid scanning** | Order tiles by reading priority left-to-right, top-to-bottom; the reader's eye zigzags across the grid. |
| Mixed-shape (a one-pager with a dashboard inset, a report with a hero KPI) | **Layered** | Treat each region by its own pattern; don't impose one scan-path globally. |

**First-word weight**: paragraph-opening words bear disproportionate scan weight under F-pattern reads. See [copy.md](copy.md) for the prose-shape rule (front-loaded claims, parallel structure); cognitive-load owns the scan-mechanic rationale.

## Density-without-layering = noise

Dense displays work when visual hierarchy carries the priority. They fail when everything reads at the same weight.

- **Layer by visual weight**: primary signal in `--foreground`; secondary series in `--muted-foreground`; reference lines / annotations one step lighter again. Spatial owns the visual mechanic (see [spatial.md](spatial.md) squint test); cognitive-load owns the priority decision — which signal is primary, which is reference.
- **Anchor with one focal element per screen**: a hero KPI, a flagged anomaly, a chart with a single annotated peak. Without an anchor, the eye has nowhere to land first and the artifact reads as "wall of numbers."
- **Whitespace as separator, not as decoration**: gaps between tiles / sections should be smaller than the gaps that separate the artifact's major regions. Same-spacing-everywhere flattens grouping (per [spatial.md](spatial.md) failure modes).
- **Sparkline columns** for tabular density: replace a multi-line chart of 20 metrics with a table where each row is one metric and its column carries a sparkline. The eye scans vertically for "which metric is trending where" — denser AND faster than the multi-line chart.

## Information arrival order

The order in which information appears should match the order the reader needs it. Wrong order forces re-reading; re-reading is cognitive cost.

- **Inverted-pyramid for analytical artifacts** (research, reports, postmortems): finding first → supporting data → caveats → methodology. The reader who only reads the first paragraph gets the answer.
- **Headline → context → outcome → next-step** for announcements and one-pagers.
- **Symptom → diagnosis → action** for runbooks and incident docs.
- **Current state → trend → comparison** for dashboards: the number first; whether it's good or bad second; what it's compared to third.
- **Summary → what changed → why → test plan** for diff / review-PR shapes: the reader who only reads the summary knows whether to approve.

**Academic ordering** (introduction → background → methodology → results → discussion) is the right shape for a journal article — the claim earns evidence reading. It's the *wrong* shape for a postmortem, status report, or release note — the reader needs the answer, not the build-up. Don't lead with context; context is what the reader needs *if* they keep reading, not what gets them to keep reading.

## Cognitive offloading

Make the important distinction recognizable before asking the reader to read its explanation. This section owns recognition guidance; prose shape belongs in [copy.md](copy.md), and quantitative encodings in [data-viz.md](data-viz.md).

- **Recognize the object.** Labelled icons, recognizable objects, or distinct forms can help identify recurring actors, resources, actions, and states. Prefer the brand's existing vocabulary; keep equivalent entities consistent and the same object recognizable across views. Choose coherent cues for the audience and content, not a fixed icon vocabulary or an icon for every heading. Labels carry meaning alongside color and form; decorative glyphs should not create redundant accessible announcements.
- **Understand the relationship.** Use attachment, containment, position, and connections to show what belongs together or changes. A comment attached to a document and two screens connected to one computer state store communicate different relationships; these are examples, not mandatory shapes. Variety without meaning adds decoding work.
- **Find the explanation locally.** Put direct labels and annotations beside the data or object they explain, define unfamiliar terms at first use, and reuse those names. Keep relevant values in the sentence making the claim. State the comparison the reader needs rather than making them compute it; for example, include the percentage change alongside absolute values when it matters. On long artifacts, retain useful context without multiplying sticky chrome.

## Failure modes the agent reaches for

- **Dashboard tile-grid with no hierarchy.** 12 same-sized tiles in a 4×3 grid; reader doesn't know where to look first. Pull the focal KPI into a larger tile.
- **Every section opens with context.** "Before we dive in, it's worth establishing…" — burns the reader's attention on prep before the payload. Lead with the payload.
- **Six CTAs on the same screen.** Reader can't pick. Demote five to secondary or remove.
- **Legend with 9 colours.** Reader can't hold the mapping. Re-encode (sort + group + "other"), or render as small multiples.
- **Long table with no grouping.** 50 rows, alphabetical, no visual chunks. Either chunk by category, or sort by value with a hairline between every 5 rows, or paginate.
- **Footnote rabbithole.** Every body sentence carries a superscript; reader stops reading the body and starts following footnotes. Trim to citations that genuinely move the argument.
- **Sticky chrome everywhere.** Sticky header + sticky sidebar + sticky footer + sticky table-of-contents = the artifact's viewport is half-chrome. One sticky element max.
- **Inline code that scrolls horizontally.** Reader has to side-scroll mid-paragraph. Either shorten the snippet, wrap, or push to a code block.
- **The "everything is bold" hierarchy.** When every section header is 700-weight 28px, nothing is primary. Use weight + size + space together to carry hierarchy; not weight alone.
- **Claim outside the F-pattern scan path.** Long-form prose with the key claim buried mid-paragraph. F-shaped scanning is what readers default to when formatting is weak — they sample left-edge first-words and miss whatever isn't there. Surface the claim through scan-visible structure (lead-in sentence, bold span, sub-heading); see [copy.md](copy.md) for the prose-shape side.
- **CTA outside the Z-pattern landing zone.** A landing-style artifact with the primary CTA at the top-left. The reader's eye finishes its Z at the bottom-right; that's where the CTA earns its place.
- **Hidden disclosure.** Apply the Progressive disclosure boundary above; supplementary depth must not conceal interpretation-changing information.
- **Configurability over defaults.** Every setting surfaced because "the reader knows best." Default everything to the right answer; expose settings only when the right answer genuinely varies per reader.
- **Pattern reinvention.** A novel table that isn't sortable; a chart with a custom legend that requires onboarding; a nav with a novel interaction. Jakob's law applies — the cost of "wait, how does this work" is paid once per reader and never recovers.
