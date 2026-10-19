---
name: Release announcement
description: A launch artifact for what changed, why it matters, and what users should do next.
---

# Release announcement

## Use when

Use this template when the reader needs launch artifact for what changed, why it matters, and what users should do next. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Restricted release-type vocabulary.** `release.type` is drawn from a fixed enum: `major` / `minor` / `patch` / `hotfix` / `preview`. Inventing new types (`release-candidate`, `feature-flag`, `general-availability`) trips the detector. The release-type label uses restrained chroma; `hotfix` warm-coal-red is the ceiling, never alarm-red.

**Changelog cross-reference.** The CTA actions or the footer must link to the corresponding Changelog entry. A Release announcement without a Changelog link breaks the announcement / changelog pairing — the announcement is the marketing register; the changelog carries the full record.

**Known-issues honesty.** The known-issues block is recommended; absent it, the artifact reads as pure marketing. Includes pre-known limitations (gated dependencies, fallback paths, deferred scope). Same honesty principle as Plan review's broken-disclosure rule and Project recap's Skipped + Shifted disclosures. Once distributed, the announcement inherits the read-only verb-runtime lock — corrections issue as a version-bumped re-publish, not in-place rewrite.

The brand profile + universal laws + reflex-aesthetics handle everything else.
