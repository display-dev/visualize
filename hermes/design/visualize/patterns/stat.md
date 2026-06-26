---
name: Stat
description: KPI or numeric highlights with units, deltas, labels, and time windows.
variants:
  - kpi
  - delta
  - benchmark
---

# Stat

## Use when

Use a stat when a number is evidence for the artifact's main claim or helps the reader compare state.

## Do not use when

Do not invent metrics, use numbers as decoration, or build a hero-metric template from generic claims.

## Semantic shape

Pair each value with label, unit, and time window/source where needed. Deltas need direction and comparison baseline.

For scored, ranked, or benchmarked values, include the scale, method, source, and baseline. If those are absent, use prose or a table state instead of a measured-looking stat.

## Type roles

The value is large enough to scan, but the label and time window make it interpretable. Monospace is useful for fixed-width operational values, not all metrics.

## Mobile behavior

Stats can stack, but labels and units must stay attached. Avoid grids that turn into a long wall before the summary.

## Failure modes

- Value without baseline.
- Delta color contradicts direction or state.
- Three-stat hero used as filler.
- Score, progress bar, or ranking without source, unit/scale, baseline, and method.
