---
name: Org chart / stakeholder map
description: A relationship map for teams, stakeholders, responsibilities, and reporting lines.
---

# Org chart / stakeholder map

## Use when

Use this template when the reader needs relationship map for teams, stakeholders, responsibilities, and reporting lines. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Single-root + downward-gravity is the structural rule.** Org charts have exactly one root and gravity flows downward — multi-root structures are *forests*, not trees, and want a Comparison grid. Network-of-peers with edges that don't flow downward is **Diagram**. The detector trips on a chart with two root cards at the same top level, or with connector lines that loop sideways between branches; either reshape into a single-root tree or pick the right template.

**Restricted node-type vocabulary.** Three types — `person` / `org` / `external` — pick the three visual treatments (solid border / filled / dashed border). Inventing a fourth (`team`, `vendor`, `champion`) is a content-shape violation; extend the enum at the spec level, not per-artifact. Connectors stay `aria-hidden="true"` with muted-foreground stroke — brand-tinted connectors trip the genre-reflex guard since the structure carries the meaning.

**Freshness contract.** Org charts go stale faster than most templates — people change roles, partners drop off. `footer.nextReview` is required, the maintainer is a *named person* (never "the team"), and every node carries both `name` and `role` (bare-name nodes look incomplete; role-only nodes are anonymised people that trip a placeholder check).

The brand profile + universal laws + reflex-aesthetics handle everything else.
