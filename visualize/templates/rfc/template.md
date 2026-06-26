---
name: RFC
description: A request-for-comments artifact for a proposed technical or product change.
---

# RFC

## Use when

Use this template when the reader needs request-for-comments artifact for a proposed technical or product change. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Stage vocabulary is a restricted enum.** `stage` is drawn from `draft` / `discussion` / `fcp` / `accepted` / `rejected` / `withdrawn` — inventing new stages (`under-review`, `awaiting-vote`, `frozen`) trips the detector. Adding a new stage is a spec change, not a per-artifact choice. The canonical seven sections appear in order; silent omission trips, departures (e.g. merging Rationale into Proposal) require a stated `section-merges` entry.

**Comment thread is chronological with stage-transitions interleaved.** Entries render oldest-to-newest by `time` — out-of-order entries trip the detector because the thread reads as a record of the conversation, not a re-ordering for emphasis. Stage-transition markers sit at the correct time position. Commenters and authors are real named people; placeholders like "Anonymous Reviewer" or "Engineer 1" trip — empty fields are acceptable, fake names are not.

**Terminal-stage verb-runtime lock.** Once `stage` is `accepted`, `rejected`, or `withdrawn`, mutating iteration verbs are locked at runtime. FCP locks the proposal body but keeps the comment thread open. `{{command_prefix}}visualize review` stays available (audit-only). Same lock pattern as ADR / Case study.

**Stage-banner restraint extends the genre-reflex guard.** `rejected` uses warm coal-red (`--stage-rejected`, chroma ≤ 0.15) — never saturated alarm-red. `withdrawn` uses very muted grey. A rejected RFC is part of the record, not a failure to dramatise; withdrawal is intentional. No emoji or all-caps on the stage label.

**Cross-reference reachability.** Every `<a href>` in the cross-reference strip resolves to a real RFC / ADR / spec, by anchor or HTTP URL. Broken cross-references trip the detector; `--auto-fix` suggests canonical anchor names.

The brand profile + universal laws + reflex-aesthetics handle everything else.
