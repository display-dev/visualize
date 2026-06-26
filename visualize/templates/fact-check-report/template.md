---
name: Fact-check report
description: An evidence report for claims, verdicts, sources, and confidence.
---

# Fact-check report

## Use when

Use this template when the reader needs evidence report for claims, verdicts, sources, and confidence. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Restricted verdict vocabulary.** The `verdict` field is drawn from `true` / `mostly-true` / `mixed` / `mostly-false` / `false` / `unverifiable` — full stop. Inventing new verdicts (`disputed`, `pending`, `partial-truth`, `out-of-context`) trips the detector; adding one is a spec change, not an artifact choice. The verdict-pill colour mapping follows the pre-trained signal pattern — reversing it (red = true) trips even with restrained chroma. Alarm-red is forbidden for "false" (warm coal-red is the ceiling, same restraint as Postmortem).

**Source-citation roundtrip.** Every `[S-N]` citation in evidence prose has a matching `<li id="fn-N">` in the source bibliography, and vice versa. Every bibliography entry is real — author + year + publication + sample / method where applicable. Invented sources, invented expert quotes, placeholder "Various sources, 2025" citations all trip the detector. Fact-check credibility lives entirely in honest sourcing; one invented source destroys trust in every other claim the report makes.

**Verdict-rollup ↔ per-claim consistency.** The TL;DR summary carries a rollup row of verdict-pills, one per claim, in the order the claims appear. The detector reads the rollup count + verdict distribution and asserts match with the claim cards below. Drift between rollup and per-claim verdicts trips — same shape as FAQ's JSON-LD ↔ rendered-questions consistency rule.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
