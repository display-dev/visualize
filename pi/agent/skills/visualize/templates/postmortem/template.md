---
name: Postmortem
description: A single-incident reconstruction for impact, timeline, root causes, and corrective actions.
---

# Postmortem

## Use when

Use this template when the reader needs single-incident reconstruction for impact, timeline, root causes, and corrective actions. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Genre reflex.** Postmortems are the template most prone to incident-dashboard chrome — red banner across the top, severity bars, alarm glyphs, "OUTAGE" all-caps banner. Resist. A reader who needs the alarm chrome to know it's a postmortem is a reader you're insulting; the title and structure already say so. No element wider than 6rem may use a fully-saturated red (chroma > 0.18); `--destructive` is text/border only, never a background fill. Status, severity, window, and owner render as labeled metadata, not screen-width alerts or pill rows.

**Reflection requires both sides.** A reflection section with only "didn't work" reads as a blame document. Lead with what held up; then say what didn't. Both columns populated, or the section is wrong.

**Action-status reconciliation.** A postmortem with open action items but `Status / Resolved` is wrong. The action table's collective state must agree with the document status — either the status is wrong or the actions aren't actually done.

The brand profile + universal laws + reflex-aesthetics list handle everything else (a11y, design fossils, theme overlay, type-scale floor).
