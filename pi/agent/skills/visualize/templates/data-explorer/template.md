---
name: Data explorer
description: A data-heavy exploratory artifact for filters, records, distributions, and drill-down context.
---

# Data explorer

## Use when

Use this template when the reader needs data-heavy exploratory artifact for filters, records, distributions, and drill-down context. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this when a simpler memo, plain prose answer, or a more specific template would make the reader faster. Do not force the template when the ask lacks the evidence or structure it requires.

## Structure

1. Header with title, snapshot timestamp, sample scope, and labeled metadata that explains what data is included.
2. Control strip with search, filter groups, result count, reset affordance, and empty-state copy.
3. Primary data region: sortable table, record grid, or split table/detail view depending on the data shape.
4. Secondary context region for distribution summaries, cohort breakdowns, source notes, or caveats.
5. Footer with snapshot provenance and export or follow-up context when relevant.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Interaction hooks must match the authored behavior.** If the artifact includes local filtering or sorting, the DOM hooks and inline script are authored together in the artifact; there is no shared controller to import. Required hooks should be explicit and minimal: `[data-search]` on the input, `[data-filter]` + `[data-filter-value]` on filter controls, `[data-sort-by]` + `[data-sort-type]` on sortable headers, and `[data-result-count]` / `[data-empty]` / `[data-reset]` on the summary row when those behaviors exist. Missing hooks break the explorer silently.

**Filter chips and row data are the same vocabulary.** Every `data-filter-value` on a chip matches a `data-<dimension>` value on rows; orphans in either direction trip (chips for values no row carries, row values no chip exposes). Every dimension has an `all` chip — missing it leaves the filter stuck on a non-default state. Exactly one column carries `default` for initial sort.

**Snapshot disclosure plus row-count reconcile.** Header carries snapshot timestamp + sample-scope note (what's included, total row count); the result-summary count equals the actual rendered row count. A Data explorer without snapshot disclosure is a published-once artifact pretending to be live; a result-count that lies about the rendered rows trips.

The brand profile + universal laws + reflex-aesthetics handle everything else.
