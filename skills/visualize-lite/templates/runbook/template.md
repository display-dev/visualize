---
name: Runbook
description: An operational procedure for diagnosing, executing, or recovering a system or workflow.
---

# Runbook

## Use when

Use this template when the reader needs operational procedure for diagnosing, executing, or recovering a system or workflow. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Trigger + prereqs + escalate are non-negotiable.** A runbook with no trigger is a Tutorial wearing the wrong frontmatter; a runbook that asks for a credential at step 3 surprises the executor; a runbook with no escalate block strands the reader when the procedure itself fails. The escalate block names a specific on-call rotation, not "the team" — same rule as Postmortem action items.

**Branches are explicit chips, not buried in prose.** "If you see X, run Y" written inline as a paragraph reads as a Tutorial. Branches render as `if` / `then` / `else` chips with optional `#step-N` jumps; the detector flags the inline form.

**Verification cadence in the footer.** A runbook without `lastVerified` + `nextDrill` is a runbook nobody trusts — drift between the documented procedure and the live system goes undetected until the next incident.

The brand profile + universal laws (incl. Postmortem's genre-reflex guard — no saturated-red walls on the escalate block, no `OUTAGE!` banner) + reflex-aesthetics handle everything else.
