---
name: Project recap
description: A retrospective organized into Shipped, Skipped, Shifted, and Learned sections.
---

# Project recap

## Use when

Use when the reader needs a retrospective organized as Shipped / Skipped / Shifted / Learned. Shipped + Skipped + Shifted are required (Learned recommended); empty Skipped or Shifted sections render with an explicit "no items this period" note rather than omitting the section header, because the absence itself is informative. These are the exact section names; do not rename them or add a "Wins" category.

## Do not use when

Do not use when the reader needs only a prose-led summary of results and next actions rather than this retrospective structure; use Report. Do not force the named structure just because the request says "recap".

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

**Reason-disclosure on every Skipped + Shifted item.** Each entry carries a stated `reason` inline. Items without reasons trip the detector — the recap's trustworthiness depends on the reasons being part of the record. "We cut it" is not a reason; the reason should declare the actual decision-time logic, not a retrofit.

**Tally-vs-item-count consistency.** The tally strip's Shipped / Skipped / Shifted counts must equal the rendered item counts in each section. The detector reads both sides and asserts equality; drift trips. Same shape as Plan review's internal-consistency reconcile.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
