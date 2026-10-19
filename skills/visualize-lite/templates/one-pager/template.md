---
name: One-pager / landing
description: A compact persuasive artifact for a single offer, concept, product, or initiative.
---

# One-pager / landing

## Use when

Use this template when the reader needs compact persuasive artifact for a single offer, concept, product, or initiative. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**At-most-one blessed pricing tier.** The pricing table marks exactly one tier as blessed, or zero (neutral pricing); two-or-more is positioning incoherence — same constraint shape as Comparison's `isUs` discipline. The blessed tier uses `--pricing-blessed-bg = var(--foreground)`-derived (brand-neutral structural call-out), never `--primary`-tinted.

**Closing CTA restates the hero CTA.** The closing CTA band repeats the hero's primary CTA verbatim. Different CTAs in the two positions confuse the reader's path — they came for the hero CTA and the closing has to be the same commitment, just restated for the reader who scrolled past it.

**Invented marketing copy is forbidden.** The agent never proposes a headline / tagline / pricing tier the user didn't declare (project convention `feedback_no_fabricated_copy`). No imperative-tricolon copy ("Ship faster. Build smarter. Scale forever."), no `Headline goes here` fossils, no `$X / month` placeholder pricing.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
