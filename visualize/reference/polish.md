# `polish` — terminal quality pass

Before following the instructions below, apply the shared rules in SKILL.md.

`{{command_prefix}}visualize polish <path>` is the terminal Refine verb. The other Refine verbs (`simplify` / `bolder` / `quieter` / `animate`) hand off to this one.

Walk every applicable quality dimension and report findings against the reader's task and resolved context. A pass may require few changes or none. Finding count does not establish diligence; rendered evidence and the reasons for each judgment do.

## Before you start

Read in order:

1. **The artifact.** Open the file, scroll it end-to-end in your head. Notice what the eye lands on first, what feels off, what reads as "agent eyeballed it."
2. **The detector.** Run `node {{scripts_path}}/detect.mjs --json <path>` for the mechanical floor. Detector output is **defect-evidence**, never **done-evidence** — a clean result is not proof the artifact is strong. The detector catches what regex can identify; polish covers everything else.

## Discovery: name the root cause, not just the symptom

Before fixing anything, classify what kind of drift each finding represents. The fix differs by class; treating every finding as a symptom (patch the value, move on) is how drift compounds across runs.

Common root causes (most findings fit one of these; some don't — name the cause anyway):

- **Missing token.** First check whether the artifact omitted an existing token or uses a local value where an existing token would suffice. Restore or reuse that token. If the shared token source needs an extension, follow SKILL.md's authority boundary and propose it separately; do not change the shared system as a side effect of polishing one artifact.
- **One-off implementation.** The artifact reinvents a local pattern with inconsistent semantics — bespoke metadata chips without labels, a hand-rolled table that loses header roles, a custom KPI tile without units or baseline. *Fix*: repair the artifact-local implementation from the rendered issue and artifact context; do not load pattern recipes during polish and do not swap to a shared component library.
- **Conceptual misalignment.** The artifact's visual treatment or structure conflicts with its reader, source, or resolved context. Apply SKILL.md's Design judgment before editing. Repair a bounded departure from an established direction; stop refinement when the direction itself needs reconsideration.
- **Medium / state / semantic gap.** The artifact's HTML source looks fine but breaks once rendered — missing alt text, empty table state never authored, print breaks splitting figures mid-page, charts that don't reflow at mobile, heading-order skips. The cause isn't a token or a component; it's a category the source code didn't address. *Fix*: address per-symptom, but tag the category in the summary so the user sees the pattern across runs.

State the root-cause class for each finding in the run summary (`Typography: missing token (existing --text-h3 omitted from artifact; restored) + conceptual misalignment (mono on body prose in editorial register)`). Findings without a named root cause are symptom-fixes that the next polish will surface again.

## Walk every dimension

Nine dimensions, plus a tenth — **data graphics** — when the artifact contains a chart, sparkline, KPI tile, or data table. Check the mechanical floor first, then assess quality. Report findings per dimension even when the count is zero, so the user sees you walked the dimension instead of skipping it. The data-graphics dimension is content-gated: when the artifact has no data graphics, write `Data graphics: not applicable` rather than omitting it — the user reads the explicit gate as "agent looked and decided."

- **Visual point of view:** Does the artifact have a memorable composition choice tied to the content, or is it only clean typography? Did the signature move survive? Does the first viewport make a visual argument?

**Before walking**: skim the **Per-template-category notes** section below — some templates shift the weighting (a diagram skips body-text typography rules; a dashboard prioritizes spatial + edge-data over typography; a slide deck prioritizes typography + motion). Apply the weighting; don't blindly run the same procedure on every template.

**Triage every finding as functional or cosmetic.** Tag it inline in the run summary:

- **Functional**: blocks or confuses the reader. A11y blockers (missing alt, low contrast, missing landmarks), heading-order breaks, edge-data overflow that pushes the layout sideways, motion that misses `prefers-reduced-motion`, contrast failures. These ship-block — fix every one.
- **Cosmetic**: looks off but doesn't impede the reader. Off-grid spacing, neutrals that should be tinted, a focus ring that uses the system default, mono accent on a chrome label. Negotiable when polish time is tight; land in a follow-up if needed.

If the artifact ships in 30 minutes, fix functional first, defer cosmetic, surface the deferred list in the run summary. If there's runway, fix both. Don't perfect one corner while another is broken — consistent quality beats peak quality in one place.

### 1. Typography
Consult [typography.md](typography.md) for the deeper material.

- Type scale snaps to the geometric ladder? No 17px / 23px / 31px mid-step values.
- Three weights or fewer per family? Five-weight pages read as vanity.
- Body line length 65–75ch? Wider reads as wall-of-text; narrower as column-trapped.
- Heading hierarchy actually descends (h1 > h2 > h3 visual weight)? Or do h2s match h1s in practice?
- Mono only on code / identifiers / timestamps? Not on body prose as "tech aesthetic."
- Display-text optical sizing honoured when the brand carries both grades?
- Table typography uses distinct roles? Captions/intro notes at `0.8125rem`-`0.9375rem` muted, headers `0.6875rem`-`0.8125rem` labels, body cells `0.875rem`-`1rem` regular, row keys at most semibold.
- Any table lede/caption sentence at `1.2rem+`, especially inside a bordered table wrapper? Move it outside as prose or shrink it to caption/source-note scale with proper inset.
- Bold used only for row keys, totals, states, or focal values? Whole table paragraphs in bold are a hierarchy bug.

### 2. Color & contrast
Consult [color.md](color.md) for the deeper material.

- Every authored color is OKLCH (hex only on embedded SVGs / email surfaces)?
- WCAG AA on body (4.5:1), AA-large on chrome (3:1)? Project / sunlight / low-quality monitor → push to AAA.
- Three tracks only (surface+foreground / primary+on-primary / semantic)? No fourth decorative track.
- Dark mode designed, not inverted? Saturated brand colors lifted, neutral surfaces chroma-dropped, focus ring visible.
- No pure `#000` / `#fff` on prose-heavy artifacts — both poles warm-tinted.
- Severity colors reserved for state (red = destructive, amber = warning, green = success)? Not on primary CTAs.

### 3. Spatial
Consult [spatial.md](spatial.md) for the deeper material. For dense / data-heavy templates (dashboards, research-briefs), also consult [cognitive-load.md](cognitive-load.md) — density-without-layering is the dominant failure here.

- Every margin / padding / gap snaps to the 4px-rooted scale? No 11 / 17 / 23 / 73 values.
- Density register matches the template (compact for ops, comfortable for reading, theatrical for presentation)?
- Spacing varies by hierarchy (section gap > subsection gap > intra-component gap)? Or is everything at the same 64px gap?
- Single baseline grid per artifact? No manual `margin-top: -3px` nudges to "fix" alignment.
- Multi-column layouts share one gutter scale? Not 32px on one row and 28px on another.

### 4. Motion
Consult [motion.md](motion.md) for the deeper material.

- Every animation has `prefers-reduced-motion` handling? Detector flags missing handling as `error`-severity — don't let it through.
- Easing curves are the two canonical curves, not bespoke-per-artifact?
- Durations match the table (hover 100–150ms, dialog 200–250ms, page enter 300–400ms)?
- Native platform primitive used over JS choreography (`@starting-style`, `animation-timeline: scroll()`, `<details>`)?
- No bounce on state transitions, no decorative spin, no scroll-jacking, no parallax-as-decoration?

### 5. Copy
Consult [copy.md](copy.md) for the deeper material.

- Subject-verb-object, active voice, present tense? No "It is worth noting that…" wrappers.
- Resolved voice/context actually applied? `technical` shouldn't drift to `pragmatic`; `analytical` shouldn't drift to `opinionated`.
- Same noun used for the same concept paragraph-to-paragraph? Not "session token" / "auth token" / "credential" / "cookie" alternating.
- Numbers cited, not "much faster" claims?
- No "In conclusion" / "To summarize" / "Consider…" / "It's worth noting" / "As an AI" / sycophant footers?

### 6. Micro-details
The small stuff that separates shipped from polished.

- Focus-visible ring designed, not browser default? Visible against both light and dark surfaces, brand-tinted, ≥2px.
- Touch targets ≥44px on interactive chrome (links inside body prose are exempt; chrome buttons are not). See [responsive-design.md](responsive-design.md) for the WCAG 2.2 baseline + the `pointer: coarse` adaptation pattern.
- The first two phone screens feel designed, not merely stacked? For prose-heavy artifacts, the headline should leave room for the lead, metadata should wrap calmly as labeled context, TOCs should compress below the intro or become a compact inline list, and cards should not become bulky boxes that delay the body.
- Static header metadata uses crisp labels, not rounded chips? Replace bare pills like `Updated May 29, 2026` with labeled fields like `Updated / May 29, 2026`. Rounded chips are acceptable for interactive filters and true state badges, not for document context.
- Header-to-contents separators collapse to one rule on mobile? Remove either the header bottom border or the contents/TOC top border at the narrow breakpoint. Two horizontal lines separated by blank space is a visible bug.
- Mobile TOC reads as navigation, not a word cloud? Replace wrapping inline links with a list, numbered grid, or compact rows. Links need row/column structure, consistent spacing, and a clear relationship to the `Contents` label.
- Dark-mode shadows flipped (lighter shadows on dark surface, not the same shadow that worked on light)?
- Neutrals tinted toward the brand hue (chroma 0.005–0.01) instead of pure gray?
- Hover-states on every interactive element? Default-only buttons read as broken.
- Selection color matches the brand `--primary`, not the OS default blue?

### 7. Edge-data shapes
The artifact has to handle realistic content, not just the demo case. Reflow + viewport behavior live in [responsive-design.md](responsive-design.md).

- Long names wrap or truncate cleanly? A 60-char product name doesn't push the layout sideways?
- Empty states present? A table with no rows isn't a single empty `<tbody>`.
- Missing-field handling? A timeline event missing a timestamp doesn't render as `undefined`.
- Number formatting locale-aware where it matters (currency, decimals, thousands separators)?
- Code samples actually fit the container? No horizontal scroll on a 400px viewport.
- Long URLs in body prose break-word, don't overflow the column?
- Charts / tables / dashboard tiles reflow at the mobile rung (per [responsive-design.md](responsive-design.md)) — not just truncate?
- Tables preserve reading hierarchy at phone width? Headers stay compact, body cells remain readable, captions do not become large unpadded blocks above the grid.

### 8. Accessibility
Ship-blockers, not taste-calls. Fix what the detector flags AND what it can't see.

- `<main>`, `<header>`, `<footer>`, `<nav>` semantic landmarks present? `<div>`-soup is wrong-shape for a publishable artifact.
- Heading order monotonic (h1 → h2 → h3, no h1 → h3)?
- All `<img>` carry alt text? Decorative images carry empty `alt=""`, not omitted.
- Keyboard reachable end-to-end? Tab order matches visual order.
- Form labels associated (`<label for>` or `<label>` wrapping)?
- `<html lang>` set?

### 9. Data graphics (content-gated)
Skip explicitly when the artifact contains no chart, sparkline, KPI tile, or data table — write `Data graphics: not applicable`. When present, consult [data-viz.md](data-viz.md) for the deeper material.

- Visual proportion matches data proportion? Linear data linearly encoded — not as area or volume.
- Bar/area charts start at zero, OR axis break visibly marked and called out?
- No 3D depth, drop shadow, or gradient fill on data marks?
- Every chart answers "compared to what?" — comparison legible without re-reading the title?
- Sparklines word-sized, not hero-scaled? Direct labels on data marks over legends when ≤5 series?
- Neutrals on non-focal series, `--primary` on the focal series — not six accent hues across one chart?
- Layering reads at squint distance: primary data dominates, grids/references recede?
- Table typography reads as a table, not a poster? Captions are small and attached, headers are label-sized, body cells are regular, and mono is scoped to fixed-width values.

## Per-template-category notes

Most of the dimension list applies the same way across all templates. These four categories shift the weighting in ways that are easy to get wrong:

- **Slide deck** (`pitch-deck`, `slide-deck`): typography and motion carry disproportionate weight — slide-to-slide consistency is the dimension polish often misses. Walk every slide for the same display scale, the same dark/light treatment, the same caption position. Motion: enter transitions only, no parallax, no scroll-jacking (a slide deck has no scroll).
- **Dashboard / data-explorer** (`dashboard`, `data-explorer`, `status-page`, `survey-results`): spatial and edge-data carry disproportionate weight. KPI tile alignment, table density, no-data states, long label truncation. Motion: only on data updates, not on chrome.
- **Long-form prose** (`whitepaper`, `report`, `case-study`, `research-brief`, `tutorial`): typography and copy carry disproportionate weight. Line length, leading at body sizes, footnote chrome (if used), heading-paragraph spacing rhythm. Motion: don't introduce reading-jamming reveal animations on body sections.
- **Diagram** (`diagram`, `architecture-overview`, `org-chart`): the dimensions are different — label legibility at the diagram's natural zoom, edge-crossing minimization, arrow-head consistency, color used for grouping not decoration. Skip the typography dimension's body-text rules; they don't apply.

## NEVER

- Polish before the artifact is functionally complete. Polish is the last step, not the first.
- Cite a clean `detect.mjs` result as proof the artifact is strong. The detector is one input.
- Rebuild or regenerate the artifact in a polish run. Stop refinement and apply SKILL.md's Hand-off output shape and Design judgment to recommend the next action.
- Resolve a context-driven choice as a slop finding. A context that declares Inter is not a font slop; an `ops` register that uses mono on chrome is not a mono-on-prose slop. Context wins.
- Hand off to another Refine verb. Polish is terminal. If the artifact needs amplification or simplification, that's a separate user-initiated run.
- Skip a dimension because "the artifact doesn't need it." Walk it; if findings are zero, report zero. Skipped dimensions accumulate to "polish finds nothing" — exactly the bug this verb is designed to avoid.

## Verify before declaring done

Two passes — discipline first (think it through), then medium-checks (open the artifact).

**Discipline.** Re-run the shared design checks against the revised artifact. Confirm that each change addresses an observed problem and preserves neighboring hierarchy, content, and behavior. Functional findings must be resolved before declaring completion; cosmetic findings may be fixed or explicitly deferred. Recheck affected states after changes. Do not repeat the pass merely because few dimensions had findings.

**Medium.** Don't trust the dimension walk alone — render the artifact and confirm it behaves where it will be read. The walk catches what the model can reason about from HTML source; the medium catches what only shows up at paint time. Open in a real browser (Chromium / Firefox / Safari), sweep the smoke widths (320 / 390 / 768 / 1280 — these are concrete widths within the [responsive-design.md](responsive-design.md) rungs, chosen so a single sweep tests narrow-phone / common phone / tablet / desktop), toggle dark mode (DevTools → Rendering → `prefers-color-scheme: dark`), toggle `prefers-reduced-motion`. At 390px, read the first two screens as a design, not as a technical pass: a simpler document that gives the reader the thesis faster beats a decorative composition that hides the body behind oversized hero chrome, rounded metadata chips, doubled separator rules, or a TOC that turns into scattered words. If the artifact is prose-heavy and likely to be printed (whitepaper, report, case study, runbook), print-preview it — page breaks between sections, no background bleed, link URLs rendered inline. If the artifact carries a chart or data table, view at 320px — does it reflow, or break the column?

Skipped verification accumulates as "polish reports clean but the artifact is broken in dark mode / on mobile / when printed." The medium is the source of truth; the source code is one rendering of it. See the **Closing checklist** below for the scannable form.

## When polish is the wrong verb

If the artifact needs broad rework, polish has misfired. The escape:

- **Artifact carries ≥3 Absolute bans** → refuse and route to `{{command_prefix}}visualize simplify` first. Simplify's job is removing ban patterns; polish assumes a clean baseline. (SKILL.md's "Refine verbs on artifacts that carry ≥3 Absolute bans" rule applies.)
- **Artifact needs broad rework beyond polish** → stop refinement and apply SKILL.md's Hand-off output shape and Design judgment to recommend the next action.
- **Do not hand off to another Refine verb expecting it to come back.** The Refine verbs (`simplify` / `bolder` / `quieter` / `animate`) hand off to polish, but polish doesn't hand off to them — that creates a cycle. When polish refuses, recommend the next action to the user; do not start another command.

## Output shape

Polish modifies the file (unlike `review`, which only reports). After the run, summarise to the user in plain markdown. Don't fence the summary as a code block; don't lead with a `Polish complete ·` banner — the content is the proof of completion.

**Tell the user what the artifact is. Don't narrate how you got there.**

Required content:

- Per dimension: the finding and the fix (one line each), OR "clean" if the dimension is genuinely strong. When marking a dimension clean, name *why* it's strong in a short phrase ("Typography: clean — three weights, scale snaps to the ladder") rather than just the word "clean" — the phrase tells the user you actually walked the dimension instead of skipping it.
- Diff size as a percent of the artifact.

Walk every dimension, even when nothing changed. Explicit "clean (one phrase)" reads as "agent walked it and looked"; an omitted dimension reads as "agent skipped it." The nine dimensions are: visual point of view, typography, color, spatial, motion, copy, micro-details, edge-data, a11y — plus a tenth, **data graphics**, only when the artifact contains a chart, sparkline, KPI tile, or data table. When it doesn't, surface a single line ("Data graphics: not applicable") rather than omitting the dimension.

Behaviour rules:

- **Collapsing runs of clean dimensions.** When three or more adjacent dimensions are clean AND none of them carries a justifying phrase, you can collapse them into one line ("Motion, copy, a11y: clean") to save visual noise. If any of the dimensions has its own short justification, keep them on separate lines.

Tone is conversational. Lead with what changed; vary phrasing per context.

## Closing checklist

Scannable consolidation of Discipline + Medium verification above. Every box should land yes; if one doesn't, fix or re-walk.

- [ ] Walked every dimension (9, plus data-graphics when applicable); every dimension reported in run summary (including `clean` lines).
- [ ] Triaged every finding as functional vs cosmetic; functional all fixed; cosmetic fixed or deferred-with-note.
- [ ] Named the root cause for every finding (missing token / one-off implementation / conceptual misalignment / medium-state-semantic gap).
- [ ] Shared brand and token sources were not changed without authorization.
- [ ] No Absolute bans in the output (re-grepped after the run).
- [ ] Shared diff guard checked (else surfaced via diff-guard-breach hand-off).
- [ ] Two-altitude AI slop test re-run; neither altitude returns "could guess from topic alone."
- [ ] Opened in a real browser; swept smoke widths 320 / 390 / 768 / 1280; judged the first two phone screens as a finished mobile reading state; toggled dark mode; toggled `prefers-reduced-motion`.
- [ ] Print preview run (for whitepaper / report / case-study / runbook).
- [ ] Chart / data display reflow checked at 320px (when applicable).
- [ ] Context-source note added when SKILL.md requires it.
