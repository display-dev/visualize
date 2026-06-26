---
name: Report
description: A structured long-form artifact for explaining findings, context, implications, and next steps.
---

# Report

## Use when

Use this template when the reader needs structured long-form artifact for explaining findings, context, implications, and next steps. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this when a simpler memo, plain prose answer, or a more specific template would make the reader faster. Do not force the template when the ask lacks the evidence or structure it requires.

## Structure

1. Header with title, concise subtitle, and labeled metadata when context helps.
2. Lead section that answers the reader's main question before detail.
3. Body sections ordered by reader decision path, not by author process.
4. Evidence, examples, tables, timelines, or source lists only where they sharpen the argument.
5. Closing section with decision, next action, or durable takeaway.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

Prior visual variants are no longer live authoring files. If the ask needs a distinct register or rendering route, express that choice in the artifact-local composition and document the reason in visible copy only when it helps the reader.

Default to `document` mode for prose-led, sourced, argumentative, or evidence-heavy reports. In document mode, keep the main prose measure roughly 42-52rem, let tables break wider deliberately, and make visual figures support the argument rather than replace it. Use cards for repeated entities only, not ordinary paragraphs. Use bars, scores, or KPIs only when the report has measured quantities with units, baselines, sources, and method.

Use weight as a role signal, not as a substitute for structure. Whole paragraphs, thesis bodies, table answers, or callout bodies should not be bold just because they contain the main point. Reserve heavy weight for headings, row keys, state labels, totals, and short focal values; prose emphasis stays phrase-level.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Executive summary above 1000 words.** The summary block is the load-bearing read for skimming audiences — present whenever the artifact exceeds 1000 words, answer first, context second, 3 sentences. KPI delta indicators carry `data-direction` consistent with the sign of the value (a `down` delta on a metric where down is good still renders neutrally — the indicator reads value-direction, not interpretation).

**Terminal-state lock when distributed.** Once `meta.status` reads `distributed` (or the project's equivalent terminal label — `Final`, `Published`), mutating iteration verbs may not rewrite the synthesis. `{{command_prefix}}visualize review` is an audit and stays unlocked; corrections issue as version-bumped re-publish. Same pattern as Postmortem `resolved`, Meeting notes distributed, Plan review `cut`. Draft reports remain freely iterable.

**Restraint on the synthesis register.** No imperative-tricolon hero copy ("Ship faster. Build smarter. Scale forever.") in the subtitle; no sycophant footer ("Hope this helps!", "Feel free to reach out"); no "What tripped" section pretending to be a postmortem — it summarises in one paragraph and links out to the dedicated artifact. Alert variants match profile voice (formal → `note` / `warning`; playful → `tip` / `aside`).

**Document-as-dashboard drift.** A report whose reader job is understanding findings must not default to a wide executive canvas with hero panels, metadata cards, score bars, feature strips, or card matrices. Those primitives need a stated canvas/dashboard reader job and supplied data model; otherwise use headings, prose, tables, sources, and sparse callouts.

**Bold-prose drift.** A report fails when the main argument is carried by paragraph-length bold blocks or oversized thesis cards. That pattern makes every claim compete for primacy and reads as presentation furniture. Use a short heading plus regular-weight prose, or a bounded callout with a label and body-weight explanation.

The brand profile + universal laws + reflex-aesthetics handle everything else.
