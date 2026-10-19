---
name: Survey results
description: A findings artifact for survey methods, respondent segments, data, and implications.
---

# Survey results

## Use when

Use this template when the reader needs findings artifact for survey methods, respondent segments, data, and implications. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Methodology-disclosure honesty.** Every percentage discloses its `n` within visual scan distance — headline findings, question headers, every bar row, every cross-tab tile. Total-N internal consistency holds (per-question `n + skipped = totalRespondents`; single-choice option-`n` sums to question `n`; multi-choice option-`n` cannot exceed `n`). The methodology footer carries fielded dates, population + response rate, anonymity treatment, and instrument size — a survey without it is published-once pretending to be authoritative. Generalises to any percentage-bearing artifact; the anonymised-quote primitive + section-level anonymisation disclosure extends to Research brief and Case study.

**Likert diverging convention.** Negative segments left of the marker, positive right, neutral grey in the middle, marker at the neutral-segment midpoint (not geometric centre). Single-colour spectrum rendering loses the convention. Postmortem's genre-reflex guard applies — `--likert-neg-strong` may not be saturated alarm-red, `--likert-pos-strong` may not be signal-green; opinion data is a distribution, not a thumbs-up.

**Restricted question-type vocabulary.** `single-choice` / `multi-choice` / `rating-likert-{3,5,7}` / `rating-numeric` / `ranking` / `cross-tab` / `open-text`. Inventing types (`matrix`, `slider`, `sentiment`, `NPS`) is a spec change, not a per-artifact choice. Multi-choice questions require a `q-note` declaring respondents could pick multiple; any stacked-percentage figure that doesn't sum to exactly 100 carries the rounding footnote.

The brand profile + universal laws + reflex-aesthetics handle everything else.
