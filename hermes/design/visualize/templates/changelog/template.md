---
name: Changelog
description: A release history artifact for grouped changes, impact, and upgrade notes.
---

# Changelog

## Use when

Use this template when the reader needs release history artifact for grouped changes, impact, and upgrade notes. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Restricted tag vocabulary.** Tags are restricted to the six Keep-a-Changelog values (`added` / `changed` / `fixed` / `removed` / `security` / `deprecated`). Inventing new tags trips the detector — the vocabulary is what makes the log scannable; expansion erodes it. Tag-content match enforced too: a bullet tagged `added` that says "We removed X" trips.

**Stable version IDs.** Every entry has a stable `id` matching its version (`id="v0.36"` for `0.36.0`). External citations depend on this — re-keying after release is a permalink break. Reverse-chronological ordering is part of the same contract; out-of-order entries trip.

**Append-only verb-runtime lock.** Mutating iteration verbs may add a new entry at the top or polish existing wording, but cannot reorder, delete, or rewrite the body of an already-published entry's bullets. The detector reads the artifact's git history (when available) and refuses mutating-verb-driven changes to historical entries; `/visualize review` stays unlocked as audit.

The brand profile + universal laws + reflex-aesthetics handle everything else.
