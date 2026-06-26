---
name: Case study
description: A narrative proof artifact showing the situation, intervention, evidence, and outcome.
---

# Case study

## Use when

Use this template when the reader needs narrative proof artifact showing the situation, intervention, evidence, and outcome. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Outcome-methodology disclosure is inline, not footnoted.** Every outcome stat — the hero stat-bleed AND every before/after card — has a corresponding methodology entry declaring measurement window, sample scope, metric definition, and (for derived metrics) the calculation. The methodology block sits in the artifact, visible to the reader at the same time as the numbers — not behind a "see methodology" link. Limitations section ≥ 60 words. Outcome claims without methodology trip the detector.

**Customer-quote and attribution honesty.** Quotes are verbatim, never silently paraphrased. Attribution is either named-with-permission or carries the section-level anonymisation disclosure. Invented customers ("Series B SaaS company we cannot name" describing a customer that doesn't exist), invented quotes, invented job titles, invented numbers — all trip the detector. Anonymisation is not cover for fabrication.

**Before/after grid follows direction convention with explanation.** `--outcome-up` (green-restrained) for direction:up, `--outcome-down` (warm coal-red, never alarm) for direction:down, `--outcome-flat` (muted) for flat. Reversing the mapping breaks convention-consistency. Every card carries a `note` line explaining the metric's interpretation — bare numbers read as marketing puff.

**Published-state verb-runtime lock.** Once a case study ships with customer approval, mutating iteration verbs may not rewrite the customer quote, methodology block, or outcome numbers without a new version. `/visualize review` stays unlocked (audit-only). Same terminal-state lock pattern as ADR / RFC.

The brand profile + universal laws + reflex-aesthetics handle everything else.
