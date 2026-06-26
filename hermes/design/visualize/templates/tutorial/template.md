---
name: Tutorial
description: A step-by-step teaching artifact for helping a reader complete a task.
---

# Tutorial

## Use when

Use this template when the reader needs step-by-step teaching artifact for helping a reader complete a task. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Goal-block-then-wrap is the framing contract.** A Tutorial without a goal block sends the reader walking without telling them where they're going; without a wrap + `nextSteps` it leaves them at a dead end. Both are required — they're the contract that this template is part of a learning path, not a one-off.

**Code-then-explain cadence is what makes it a Tutorial.** Each step where a new concept lands carries an `explain` callout *after* the code — that's the teaching work. Steps that are only code blocks read as a Runbook; ≥ 50% of steps missing `explain` flags as a category mismatch (this is a Runbook, not a Tutorial).

**Quiet announcement register.** No "Get Started Now!" CTA banner, no imperative-tricolon hero ("Build faster. Ship smarter. Scale forever."), no saturated-blue announcement banner on explain callouts. Tutorial is calm prose between code, not marketing.

The brand profile + universal laws + reflex-aesthetics handle everything else.
