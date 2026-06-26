---
name: Proposal
description: A persuasive plan for approving work, budget, partnership, or a strategic move.
---

# Proposal

## Use when

Use this template when the reader needs persuasive plan for approving work, budget, partnership, or a strategic move. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Process-banner declares weight up front.** The banner is required because it sets reader expectation — without it, readers may misread an informal sketch as a formal proposal. `label` is typically `"Pre-RFC"`, `"Sketch"`, or `"Position paper"`; `body` declares the feedback channel and (if known) the decision deadline. Inventing a formal review board that doesn't exist, or a deadline the author can't enforce, trips the honesty rule.

**Asks-block is the call to action.** The closing Asks block is required and lists ≥ 2 concrete items — specific feedback request, named decision, deadline. A Proposal without explicit asks reads as a position paper without a call to action; the artifact's whole purpose is to gauge response.

**Editable-by-default — explicitly no terminal lock.** Unlike ADR / RFC / Case study which carry terminal-state verb-runtime locks, Proposal is a working draft by design and rewriting during the gauge-interest period is expected. Graduation transitions the content to a new artifact (typically RFC, which carries its own locks); archival is a separate terminal state where the proposal becomes read-only as historical context. `{{command_prefix}}visualize review` stays unlocked at every state.

The brand profile + universal laws + reflex-aesthetics handle everything else.
