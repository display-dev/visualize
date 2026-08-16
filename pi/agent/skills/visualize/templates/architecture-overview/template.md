---
name: Architecture overview
description: A system overview for explaining components, boundaries, flows, and operational tradeoffs.
---

# Architecture overview

## Use when

Use this template when the reader needs system overview for explaining components, boundaries, flows, and operational tradeoffs. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this when a simpler memo, plain prose answer, or a more specific template would make the reader faster. Do not force the template when the ask lacks the evidence or structure it requires.

## Structure

1. Header with title, concise subtitle, and labeled metadata when context helps.
2. Lead section that answers the reader's main question before detail.
3. Body sections ordered by reader decision path, not by author process.
4. Evidence, examples, tables, timelines, or source lists only where they sharpen the argument.
5. Closing section with decision, next action, or durable takeaway.

## Creation guidance

For every relationship figure, read `reference/diagram.md` and its routed type reference. The artifact remains a multi-section, prose-supported Architecture overview; each figure still needs recoverable topology and the same semantic inline-SVG contract. Keep node and connector roles coherent across figures without forcing every figure into one type.

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

Prior visual variants are no longer live authoring files. If the ask needs a distinct register or rendering route, express that choice in the artifact-local composition and document the reason in visible copy only when it helps the reader.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Sidebar / section roundtrip.** Every section in the body carries an `id`, every sidebar nav entry points at one of those ids, and the scroll-spy script marks the active link as the user scrolls. Sections without an `id` are unreachable from nav; nav entries pointing at missing ids 404 silently. Same shape applies to the lede/diagram/body triad — a section with only prose is a Report section, a section with only a diagram is a Diagram, AO sections require all three.

**Cross-section diagram cohesion.** Diagrams across sections use the same node-type styling. A System-overview diagram with three node types and a Publish-path diagram with five different node types reads as written by two people — cohesion matters more here than in standalone Diagrams because the reader is building one mental model across the whole document.

**Diagram grammar still applies.** Prose cannot rescue disconnected panels or ambiguous connectors. Architecture overview is a shell choice, not a diagram primitive.

**Next-review contract.** Footer carries `nextReview` in addition to `lastReviewed`, and the maintainer is a named person, not "the team". Architecture overviews stale fast as the system evolves; the next-review date is the contract that someone owns keeping it current. Without it the doc rots silently.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
