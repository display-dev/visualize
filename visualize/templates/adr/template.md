---
name: ADR (Architecture Decision Record)
description: A decision record for documenting architectural context, options, decision, and consequences.
---

# ADR (Architecture Decision Record)

## Use when

Use this template when the reader needs decision record for documenting architectural context, options, decision, and consequences. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Append-only contract is enforced at the verb level.** The detector blocks `{{command_prefix}}visualize polish`, `{{command_prefix}}visualize bolder`, `{{command_prefix}}visualize simplify`, `{{command_prefix}}visualize quieter`, `{{command_prefix}}visualize animate` on any ADR whose status is `accepted` or `superseded` — editing the record falsifies it. To revise, write a new ADR with status `proposed` and a `supersedes:` link. `{{command_prefix}}visualize review` stays unlocked (audit, not mutation).

**Consequences require both sides.** An ADR with only `good` consequences is wrong — every decision has tradeoffs; claiming otherwise reads as advocacy rather than record. Minimum three entries, both kinds present.

**No code blocks in the body.** ADRs carry architectural shape and prose; SQL DDL, function signatures, full API schemas all belong in the spec the ADR cites. Inline `<code>` for naming things is fine; multi-line `<pre>` blocks trip the detector. (Project convention; same rule as `engineering/adrs/` in the main repo.)

**Status chip reconciles with state.** `accepted` paired with a populated `supersededBy` field is a contradiction — should be `superseded` with the banner pointer rendered at the top. The chip and the supersede metadata must agree.

The brand profile + universal laws + reflex-aesthetics handle everything else (a11y, design fossils, theme overlay, type-scale floor, Postmortem's genre-reflex guard on `bad` consequences and the `superseded` chip).
