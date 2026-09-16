# `review` — qualitative + deterministic findings

Before following the instructions below, apply the shared rules in SKILL.md.

`{{command_prefix}}visualize review <path>` is the Evaluate verb. It reports findings without modifying the artifact or starting another command. Its recommendation may be a bounded repair, refinement, exploration, a revised brief, or no further work. The user decides what to authorize.

Review runs deterministic checks first (Layer 1 via `detect.mjs` for static patterns, Layer 1b via `browser-contrast.mjs` for browser-computed contrast, and a conditional diagram-geometry layer), then LLM judgment via the rules below. Each layer catches what the others can't reliably see.

Review does not load or cite `patterns/` recipes. Findings name the concrete rendered issue and repair direction; recipes are creation guidance, not review rubrics.

## Establish scope and coverage

Before running checks, state the artifact, screens or sections, interactive states, themes, and viewports the review is expected to cover. Use the artifact and request to decide the rows; do not imply whole-artifact coverage when only one flow or screen was inspected.

Every coverage row has one status:

- **Reviewed** — the source, rendered state, or behavior was actually inspected; cite the file, command, viewport, screenshot, or interaction that proves it.
- **Not verified** — the area applies but the necessary runtime, state, or evidence was unavailable; state why. This is a coverage limit, not a finding.
- **Not applicable** — the artifact does not contain that surface or state; state the absence briefly.

At minimum account for static source/detector coverage, computed contrast, desktop and mobile rendering, applicable interaction states, light/dark and reduced-motion behavior, and content-gated diagrams or data graphics. A `ship` verdict is unavailable when evidence needed to rule out a plausible blocker remains `Not verified`; use `iterate` and name the missing check instead.

## Layer 1 — deterministic findings via `detect.mjs`

```sh
node {{scripts_path}}/detect.mjs --json <path-to-artifact.html>
```

(No `--strict`; the command is an audit, not a gate. `--strict` is for CI workflows.)

NDJSON: one finding per line + trailing summary. Each finding carries `{ ruleId, category, severity, locator, message, snippet?, suggestion? }`. The detector **auto-loads `DESIGN.md` from ancestor directories of the artifact path** (not the agent's cwd) so file-backed brand-aware rules work without configuration. Currently `slop/system-default-font` is the only rule that reads that file-backed profile (it skips firing when the declared font matches the body); `slop/non-token-color` is token-discipline-aware, not brand-aware. If the artifact lives outside the project tree (e.g. `/tmp/<file>`), pass `--brand <path-to-DESIGN.md>` explicitly.

The detector ships rules across six categories, all mechanical: HTML/CSS patterns regex can identify or that `node-html-parser` walks reliably, plus WCAG contrast computed via `culori`. Categories: `fossil` (placeholders, citation artifacts, AI-attribution disclaimers), `slop` (gradients, gradient text, glow, glassmorphism, emoji headings, monotonous spacing, bounce easing, side-tab, hardcoded-hex token-discipline, font when brand-aware), `diagram` (declared topology, groups, accessibility, and delivered SVG), `a11y` (alt, lang, empty link, low contrast, heading structure), `meta` (title, favicon, OG, external script), `perf` (layout thrash, missing img dimensions).

Run `node {{scripts_path}}/detect.mjs --list-rules` (or `--list-rules --json`) for the authoritative ruleset at this skill version: IDs, default severities, one-line descriptions. The catalogue evolves; the command is the source of truth.

## Layer 1b — computed-style findings via `browser-contrast.mjs`

Runs after Layer 1. Catches WCAG contrast failures that depend on `var()` resolution, cross-rule cascade, or per-theme computed styles — three structural gaps in `detect.mjs`'s static `a11y/low-contrast` rule. A real browser closes all three at once via `getComputedStyle()`. The sidecar runs headless Chrome, injects `axe-core`, and emits findings as NDJSON in the same shape Layer 1 uses, so the streams union without schema reconciliation.

```sh
node {{scripts_path}}/browser-contrast.mjs --json <path-to-artifact.html>
```

(No `--strict`; same audit posture as Layer 1.)

Findings carry a single synthetic `ruleId: a11y/browser-contrast`. axe's own rule id (`color-contrast`) is preserved inside the `snippet` field for traceability. `incomplete` findings (gradient backgrounds, position-based occlusion, anything axe can't decide automatically) surface as `severity: warn` with snippets prefixed `axe:color-contrast (needs-review) — ...`. These are surfaced for review, not gated — strict-mode never exits 2 on warn-only output.

The sidecar needs Node 22.12+ and either system Google Chrome or outbound HTTPS for first-run managed-Chromium download. Run `node {{scripts_path}}/browser-contrast.mjs --list-rules --json` for the rule catalogue.

Run these scripts through the agent's shell/Bash tool as normal `node` commands. Do not import the vendored Puppeteer bundle from a Node REPL MCP just to drive screenshots or browser checks: some REPL sandboxes block Node builtins such as `node:process`, which makes the REPL path fail even though the vendored script path is healthy. The reliable path is `node {{scripts_path}}/...` from shell; use a browser/DevTools tool for visual inspection.

Union the Layer 1b findings with Layer 1's output before the LLM judgment pass below.

## Conditional diagram layer — rendered geometry and semantic review

When the artifact contains `figure[data-visualize-diagram]`, read [diagram.md](diagram.md) plus each distinct non-spatial type reference named by those figures, then run:

```sh
node {{scripts_path}}/browser-diagram.mjs --json <path-to-artifact.html>
```

Union its structured `diagram/*` findings with Layers 1 and 1b. Inspect the required desktop and mobile screenshots and judge what the checkers cannot: whether the principal topology, direction, boundaries, connector meaning, branches or loops, and mobile transformation remain recoverable from the figure. Cite the viewport evidence. `review` remains read-only: report repair direction, but make no change and do not silently route to a mutation verb. If the user later requests a repair, use creation or the Refine command whose mutation contract fits it.

## Rendered screenshot gate

Open/render the artifact and inspect every screenshot the resolved scope requires and the available environment can produce. Deterministic findings are inputs; they are not a substitute for looking at the rendered result. When a required render cannot be produced, continue the review with the available evidence, mark that viewport or state `Not verified`, and cap the verdict at `iterate`; the mandatory grade then reflects only the inspected scope.

Minimum evidence:

- Capture at least one desktop and one mobile viewport for every browser-rendered artifact. If the artifact is intentionally fixed-format, capture the canonical viewport and one constrained viewport that proves framing/scaling behavior.
- For multi-screen artifacts, capture enough states/pages/sections to judge repeated layout patterns; for a new template, changed shell, or generated deck, capture every distinct screen.
- Cite screenshot paths or browser viewport sizes in the review notes. Visual heuristics must cite what was visible in those screenshots.

Do not assign `ship` from detector/a11y output alone. The screenshot gate is what validates visual hierarchy, scan path, responsive composition, clipping, overlap, and realistic rendered state. Never imply that an unavailable screenshot was inspected.

## Layer 2 — LLM judgment in this prompt

Two parts:

**(a) Inspect specific issues** by walking every applicable category below — fossil-shape failures, brand-register-dependent slop, structural-pattern slop, semantic-structure calls, data-graphics failures — and collecting each confirmed issue into the working set. Each category names patterns the detector deliberately doesn't catch (vocab-unbounded, register-dependent, semantic-judgment calls).

**(b) Score the 10 artifact heuristics** from [heuristics-scoring.md](heuristics-scoring.md) and render a per-heuristic verdict + aggregate grade. The heuristics are the grading layer; the category working set is the *evidence* the verdicts cite.

Don't ship a review without both. The categories without the heuristics produce a list of issues with no grade; the heuristics without the categories produce a grade with no evidence.

### Category evidence (the working set)

Things detect.mjs deliberately doesn't try to catch: register-dependence, vocab-unboundedness, semantic-structure calls. Inspect every applicable category and collect every confirmed issue before ranking. Do not stop when the eventual reporting cap is reached; context, aggregation, severity, consolidation, and ranking happen afterward.

**Fossil-shape failures** (vocab is unbounded, so no detector list):

- **Mock identity** beyond the obvious: fictitious customer quotes ("Sarah Johnson, VP Marketing"), placeholder phone / address / company / brand names that aren't in the obvious set (Acme, Globex, Anytown, TBD, XXX-XXX-XXXX).
- **Slop openers**: "leverage / streamline / empower / unlock / elevate / unleash / robust / holistic / seamless / cutting-edge / next-gen / In conclusion / TL;DR:" packed into the opening paragraphs.
- **Sycophant footers**: "I hope you find this useful", "Happy to clarify", "Hopefully this addresses your needs", "Best, Claude", anything signed by an AI.
- **Imperative tricolon** ("Ship faster. Build smarter. Scale forever."): three commands ending in periods, regardless of content. Can't be redeemed.

**Brand- and register-dependent slop** (mechanical detector would false-positive). These judgment calls exclude SKILL.md's Absolute bans, which resolved context cannot redeem. When deciding the remaining calls, consult [color.md](color.md) / [typography.md](typography.md) / [spatial.md](spatial.md) / [copy.md](copy.md) for the deeper material:

- **Color fit**: do palette character, relationships, and coverage support the brief and approved identity? Name the rendered mismatch; hue names alone are not a finding.
- **Center-everything**: body prose centered, section after section. False positive for Bauhaus / Swiss-poster / academic preprint registers; real signal for AI-essay register.
- **Uppercase body**: long all-caps passages. False positive for brutalist / letterpress / show-bill registers; real signal otherwise. Acronyms (HTML / POST / REST / WCAG) don't count.

**Structural-pattern slop** the detector can't reliably distinguish from legitimate design:

- **Triple-feature-card**: 3-column grid of `<h3>adjective + noun</h3>` blocks with one paragraph each. The AI-landing canonical pattern.
- **Trust-signal slop**: "Backed by leading investors", "10,000+ teams", template testimonial stack.
- **Infinite animations / parallax / scroll-jacking**: sometimes deliberate, often not.
- **Responsive overflow**: fixed min-width above 320px; `100vw + padding`; long button text that mobile-clips. Detector can't simulate viewport.
- **Mobile polish regression**: the page technically reflows but the first two phone screens feel less composed than a plain document — oversized h1, wrapped metadata chips, TOC consuming the intro, boxed callouts delaying the body, or desktop chrome stacked without hierarchy.
- **Rounded metadata chips**: static document context rendered as pill chips (`Updated May 29`, `Source: ...`, `display.dev strategy`) instead of crisp labeled fields. This hides the field name, wastes mobile width, and reads as dated filter UI. True state badges and interactive filter chips are exempt.
- **Stacked horizontal rules**: mobile header ends with a bottom border and the reordered contents/TOC begins with a top border, creating two horizontal lines with dead space between them. This is a visual bug; collapse to one separator.
- **Mobile TOC word cloud**: contents links are rendered as free-wrapping inline words with inconsistent gaps. A TOC needs list structure: vertical rows, numbered rows, or a deliberate grid.
- **Table typography imbalance**: table caption or intro sentence uses lede/display scale, headers are not label-sized, body cells are oversized or bolded as paragraphs, or monospace is applied to prose columns. Tables need separate caption/header/body/value roles.

**Semantic-structure calls** (read the actual HTML):

- **Landmarks**: does the artifact use `<main>`, `<header>`, `<footer>`, `<nav>` appropriately? A `<div>`-soup with no semantic landmarks is wrong-shape for a publishable artifact.
- **Heading-slot register**: each `<h*>` should carry content appropriate to its level + element. Greetings, calls-to-action, or marketing tags in `<h2>` ("Welcome John Doe", "Get started today") are usually wrong-element calls; the right shape is body prose or a CTA button.
- **Information hierarchy**: does the eye land where it should first? Is the most-important claim the most-visible element? An exec summary lost in 12pt body is a hierarchy fail regardless of what the detector says.
- **Metadata semantics**: does the artifact explain what each context value is (`Updated`, `Source`, `Audience`) or leave the reader to infer it from chip copy?
- **Separator semantics**: do rules mark real boundaries, or did responsive stacking leave two borders around one boundary?
- **Navigation semantics**: does the mobile contents block read as a list of destinations, or as unrelated words floating in space?
- **Table semantics**: does the table explain itself with a concise caption/source note and readable headers, or does a large unpadded sentence sit inside the table chrome as if it were body prose?
- **Palette judgment**: assess the rendered hierarchy, meaning, and atmosphere using color.md. The detector does not judge hue combinations or neutral temperature. A gradient can fit the brief; gradient text remains a separate pattern rule.

**Data-graphics failures** (content-gated: skip when the artifact has no chart, sparkline, KPI tile, or data table). Consult [data-viz.md](data-viz.md) for the deeper material:

- **Lie factor**: visual proportion doesn't match data proportion. Truncated y-axis on comparison bars without a visible axis-break callout, linear data encoded as area or volume, dual-y-axis chart inviting false correlation from coincidentally-scaled axes.
- **3D on data marks**: bars with depth, pies/donuts with shadow, area charts with gradient fill below the line. Fake-dimension violation regardless of brand.
- **Missing comparison structure**: a chart that can't answer "compared to what?" One-bar bar chart for a single KPI (render the number, not a chart of the number). Pie chart with eight slices (use a sorted horizontal bar).
- **Chartjunk-density**: heavy gridlines competing with the data, hero-scaled sparklines, every chart fragmented into its own drop-shadowed card.
- **Table-type hierarchy**: table captions/intros at `1.2rem+`, headers that compete with body values, whole-cell bold paragraphs, or mono-washed prose. Use the table type roles from [typography.md](typography.md) / [data-viz.md](data-viz.md).

## Consolidate and rank findings

Process the complete working set in this order:

1. Union deterministic and Layer-2 evidence.
2. Apply resolved-context overrides and aggregate thresholds.
3. Classify ship-blockers and non-blockers.
4. Consolidate repeated symptoms by root cause, retaining every confirmed locator under that finding.
5. Rank consolidated findings by reader impact first, then by reach and repair leverage.
6. Select the report-wide publishable set: every ship-blocker, followed by at most the 15 highest-ranked actionable non-blockers across warnings and informational patterns.

The cap applies only to the final actionable non-blocker output, never to inspection or the working set. Never pad a short review, and never use the cap to hide a blocker. Use only the publishable set when naming findings in Scope, Verification, heuristic notes, and Summary. If an omitted finding is necessary to justify a verdict or heuristic, include it in the selected 15 and omit a lower-ranked finding instead. When lower-ranked non-blockers are omitted, state their count in the Summary without listing them individually.

Context-suppressed detector results are audit evidence rather than actionable findings and do not consume the 15-finding budget. Consolidate them by rule and suppression reason; state the count and affected scope, using representative locators when the full list would overwhelm the report.

## Override grid (apply to BOTH layers)

- **Universal law 1**: resolved context overrides contextual taste findings, not the non-contextual constraints named in SKILL.md. A `slop/system-default-font` hit on a context that declares Inter is a category error; demote. When demoting, do not drop the evidence silently: account for it under "Context-suppressed," consolidated by rule and suppression reason as described above, so the user sees the chain "detector caught X, context says it's correct, demoted." Audit trail matters.
  - **Non-context-suppressible detector findings:** every `fossil/*` rule plus `slop/gradient-text` is immune to runtime brand suppression. Only an explicit `skip` entry for that concrete rule ID in `.visualize-detect.json` waives it.
  - **Layer-2 Absolute bans:** inspect the complete `Absolute bans` block in SKILL.md. Every confirmed match is an `Errors (ship-blockers)` finding and never enters `Context-suppressed`, including icon-tile section markers in an icon-led design system. When an Absolute ban is detector-backed and its exact rule ID is explicitly skipped, do not reintroduce the same fact through Layer 2 or heuristic scoring. Layer-2-only bans have no detector ID and cannot use a detector skip.
- **Universal law 4**: info-severity rules ship-block in aggregate. Threshold calibration (use these as anchors when deciding):
  - **6 `slop/emoji-heading` across a presentation = pattern.** 1 = taste-call.
  - **≥3 hardcoded hex literals in a file that otherwise uses `var(--*)` = token-discipline pattern.** 1–2 = exception (e.g., favicon data-URL).
  - **≥4 `slop/center-everything` declarations in a non-Bauhaus / non-academic register = pattern.** Single centered hero is fine.

  When unsure, default to surfacing it as info + naming the aggregate count.
- **Universal law 6**: the reader is the judge. Does each finding make the reader's job harder, or just satisfy a rule?

## Output format (mandatory shape)

Don't dump NDJSON. Don't free-form. Produce this structure so two different agents reviewing the same artifact produce comparable output:

```
# Review · <artifact name>

**Verdict:** <ship / ship-blocked / iterate>. <Sentence summarising the state.>
**Grade:** <A | B | C | D | F> (from Heuristic scoring below).

## Scope and coverage

| Area or state | Status | Evidence or boundary |
|---|---|---|
| Static source and detector | <Reviewed / Not verified / Not applicable> | <file, command, result, or reason> |
| Desktop render | <…> | <viewport and screenshot/browser evidence> |
| Mobile render | <…> | <viewport and screenshot/browser evidence> |
| <Applicable interaction, theme, diagram, or data state> | <…> | <interaction/check or reason> |

## Errors (ship-blockers)
- **<rule-id or layer-2 category>** · `<locator>` — <finding>. <Why it matters.> → <fix.>
- …

## Warnings
- **<rule-id>** · `<locator>` — <finding>. → <fix.>
- …

## Verification
- **Passed:** <exact command or interaction> — <observed result>.
- **Not verified:** <applicable check> — <why it could not be run>.

## Info / aggregate patterns
- <Category aggregate>: <count> findings of <pattern>. <Why this aggregates to a signal.>

## Heuristic scoring

| # | Heuristic | Verdict | Note |
|---|---|---|---|
| H1 | Visual primacy of central element | <PASS / WARN / FAIL> | <1-sentence justification> |
| H2 | Match with topic register | <…> | <…> |
| H3 | Scannability | <…> | <…> |
| H4 | Information arrival order | <…> | <…> |
| H5 | Cite the number | <…> | <…> |
| H6 | Register coherence | <…> | <…> |
| H7 | Brand-trueness | <…> | <…> |
| H8 | Reader-respect | <…> | <…> |
| H9 | Edge-data realism | <…> | <…> |
| H10 | Honesty | <…> | <…> |

**Worst heuristic(s):** <H#, H#>. **Recommended next action:** <see Heuristic scoring routing table>.

## Context-suppressed
- **<rule-id>** · <count and affected scope; representative locators when needed> — detector fired but resolved context <source> declares <reason>. Demoted from the actionable set.

## Summary
<Sentence per category if any non-zero: errors / warnings / info / heuristics. If the cap omitted consolidated non-blockers, state the count.>
```

If a section has no items, omit it entirely (don't render empty headings) — except **Scope and coverage**, **Verification**, **Heuristic scoring**, **Verdict / Grade / Summary**, which are always present. Every heuristic gets a verdict, even PASS. The "Context-suppressed" section is critical when used; silently dropped evidence hides the audit trail.

Derive the verdict after grading, using the first matching condition:

1. **`ship-blocked`** when any blocker remains, regardless of grade.
2. **`iterate`** when no blocker remains but evidence needed to rule one out is `Not verified`.
3. **`iterate`** when coverage is complete and Grade C comes only from warn-severity findings.
4. **`ship`** when coverage is complete, no blocker remains, and the grade is A or B. Grade B ships with recommendations.

Grades D and F, and a Grade C containing an error-severity finding, necessarily resolve through the first condition. Non-blocking recommendations alone do not prevent a Grade A or B artifact from shipping.

Within **Verification**, omit the `Not verified` bullet when every applicable check ran; keep the section and list the checks that passed.

## Layer-2 finding IDs

Detector findings carry `ruleId` strings (`slop/gradient-text`, `a11y/missing-alt`, etc.) drawn from the detector's namespace. Layer-2 findings are agent-authored; they don't have stable IDs in any namespace. Use a descriptive label that signals the category but doesn't pretend to be a detector rule: `**Missing landmarks** · body`, `**Heading-slot register** · h2`, `**Competing accent hierarchy** · :root`. Don't invent `semantic/*` or `slop/*` rule IDs for Layer-2 findings; there's no detector rule behind them to look up.

## Review does not modify the file

Review is the Evaluate verb. It reports; it does not run polish, simplify, bolder, quieter, or animate as part of its own flow. The verdict + sections above are the entire output.

Apply SKILL.md's Design judgment before recommending an action. Use the **Routing the next action** table in [heuristics-scoring.md](heuristics-scoring.md) to match an established root cause to a remedy. A grade establishes readiness, not which remedy is appropriate.

Apply the shared ban-heavy refusal rules when recommending a Refine verb. Do not recommend simplification solely because the artifact received Grade D or F: missing evidence, incorrect content, and an unresolved design direction need different responses.
