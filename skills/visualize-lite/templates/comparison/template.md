---
name: Comparison
description: A decision-support artifact for comparing options, tradeoffs, and recommendations.
---

# Comparison

## Use when

Use this template when the reader needs decision-support artifact for comparing options, tradeoffs, and recommendations. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

Default to `document` mode when the reader is comparing options, evidence, tradeoffs, or recommendations. Prefer one strong table plus prose over card matrices, score strips, or lane bars. Use canvas mode only when spatial position is the comparison itself. Use dashboard mode only when the comparison is operational state with repeated metrics.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job. When a comparison becomes stacked records, borders still describe one coherent structure: record boundaries span the record, internal dividers align to the content they divide, and rounded outer frames do not collide with inset label rules.

## Failure modes

**Single-table rule.** Exactly one `<table class="cmp-table">` per artifact. A second `cmp-table` block trips the detector — multi-table comparisons fragment the read; split them into multiple Comparison artifacts or fold into a Report with embedded comparison figures.

**Cell-state vocabulary is closed.** States are drawn from `yes` / `no` / `partial` / `varies` — full stop. Inventing new states (`coming-soon`, `beta`, `enterprise-only`) trips the detector because they erode the scan-at-a-glance property the closed vocabulary buys. Encode nuance in the cell's `detail` text, not in a new state. Every cell carries both a `state` and a `value`; a blank cell is a content gap, not a styling choice.

**Us-column singularity.** Exactly one column may carry `isUs: true` (zero is valid for a neutral comparison; two or more is positioning incoherence — "us" is a singular concept). The emphasis is a quiet `--us-band-bg` + foreground-derived border, never a brand-primary fill — a brand-coloured us-column opts out of the restraint that makes the comparison read as honest.

**Fake quantification.** Scorecards, progress bars, radar charts, and ranked lanes require a disclosed scale, baseline, method, and source. If the comparison is judgmental or qualitative, encode it as table states and explanatory detail instead of drawing measured-looking bars.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
