---
name: Plan review
description: A structured critique of a plan, risks, assumptions, and recommended changes.
---

# Plan review

## Use when

Use this template when the reader needs structured critique of a plan, risks, assumptions, and recommended changes. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Internal-consistency reconcile.** Overall `on-track` paired with any `high`-severity risk is a contradiction — either the overall is wrong (should be `at-risk` / `off-track`) or the severity is wrong (should be `med` or `low`). The detector trips; the author reconciles. Same shape extends to other paired-state fields: a `cut` phase must read visually cut (strikethrough + reduced opacity), not planned; `done` actions on an `at-risk` overall need explanation.

**Risk-card discipline.** Every risk carries exactly one named owner and a stated mitigation. "The team" is not an owner; "monitor" alone is not a mitigation. The whole point of the risk card is the response plan.

**Honest disclosure of what's broken.** Status-tracking templates earn trust through honesty. "We are crushing it" / "smooth sailing" prose is a tell — either the plan really is on track (the chips already say so; the prose is empty) or it isn't (the prose is dishonest). Either way, drop it.

The brand profile + universal laws (incl. Postmortem's genre-reflex guard, which applies here — no saturated-red walls, no `OFF TRACK` banners) + reflex-aesthetics handle everything else.
