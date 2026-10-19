---
name: Timeline
description: Ordered events with timestamps, states, severity markers, or phase sequencing.
variants:
  - incident
  - roadmap
  - audit-log
---

# Timeline

## Use when

Use a timeline when order, elapsed time, dependency, or state progression is central to understanding.

## Do not use when

Do not use a timeline for unordered bullets or generic roadmap theater.

## Semantic shape

Use an ordered list. Use `time datetime` for dates/times. Event labels should be explicit; descriptions explain impact or next step.

## Spacing and borders

The connector is secondary. Markers carry state only when state matters. Avoid heavy rails that compete with the event text.

## Mobile behavior

Collapse to one column with time above or before the event label. Long timestamps should not force horizontal scroll.

## Failure modes

- Timeline without real sequence.
- Missing timestamps for incident/event artifacts.
- State color used without label.
