---
name: Dashboard
description: A dense operational surface for metrics, states, tables, and exceptions.
---

# Dashboard

## Use when

Use this template when the reader needs dense operational surface for metrics, states, tables, and exceptions. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this when a simpler memo, plain prose answer, or a more specific template would make the reader faster. Do not force the template when the ask lacks the evidence or structure it requires.

## Structure

1. Operational header with title, snapshot timestamp, scope, owner, and labeled status metadata.
2. KPI strip with the few metrics that define current state; every value has unit, trend direction, and comparison baseline.
3. Main grid of charts, tables, queues, or exception panels ordered by triage priority.
4. Incident, anomaly, or action region that separates urgent work from background telemetry.
5. Footer with data freshness, source systems, and known blind spots.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

Prior visual variants are no longer live authoring files. If the ask needs a distinct register or rendering route, express that choice in the artifact-local composition and document the reason in visible copy only when it helps the reader.

## Hierarchy contract

Current state owns the page. KPI labels, deltas, and state badges must be easier to scan than explanatory prose. Tables and charts use compact labels, aligned numbers, and attached captions/source notes. Exception panels may outrank charts when they change operator behavior.

## Mobile contract

The first two phone screens must deliver status, timestamp, and top exceptions before secondary charts. KPI grids become compact rows or two-column groups. Wide tables scroll deliberately with attached captions or become labeled records. Do not stack dashboard cards so heavily that the user reaches the first actionable exception only after several screens.

## Failure modes

**Chart.js colour bridge is the theme contract.** Chart datasets pull from `--chart-1` through `--chart-5` resolved via the `color-mix(in srgb, ..., transparent 0%)` → `color(srgb r g b)` → hex pattern. Hard-coded hex / rgb in chart configs trips — the bridge is what makes themes swappable. Animations disable under `prefers-reduced-motion`; `<canvas>` elements carry `aria-label` (and `role="img"` if no `<figure>` wraps them).

**Trend semantics match the metric direction.** Latency / error / cost / p99 / time-to-* metrics where lower is "good" render the green arrow on a *decrease*, not an increase. The agent infers from metric-label keywords or reads `kpi-orientation` from the brand profile; the visual never flips green-as-good.

**No live-ness theatre.** "Trending now" / "real-time" labels on a published HTML file are a lie — the artifact is a snapshot, the footer timestamp is the truth. No purple-pink gradient on KPI values, no neon `text-shadow`, no `Sample data` / `0.00 / 0.00` placeholder pairs.

The brand profile + universal laws + reflex-aesthetics handle everything else.
