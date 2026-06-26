---
name: Metadata
description: Labeled document context such as dates, owners, inputs, audience, source, status, or version.
variants:
  - compact-fields
  - status-with-context
---

# Metadata

## Use when

Use metadata when context changes how the reader interprets the artifact: recency, source, audience, owner, version, status, or decision state.

## Do not use when

Do not add metadata as decorative chrome. If the value does not change reader behavior, leave it out.

## Semantic shape

Use a `dl` for key-value groups, or compact labeled groups when the visual register needs less structure. Status may be a badge when the shape carries state. Static context should not be a row of unlabeled pills.

## Type roles

Labels are small, quiet, and explicit: `Updated`, `Source`, `Audience`, `Owner`. Values carry normal body weight unless the state is the focal point.

## Spacing and borders

Use crisp rows, compact groups, or a single boundary rule. Avoid stacking a header bottom border with a metadata top border on mobile.

In document mode, metadata belongs under or near the title as labeled rows/groups by default. Do not turn it into a standalone side card unless the reader needs a separate operational/status panel.

## Mobile behavior

Wrap as labeled rows or two-column groups. Preserve labels; do not collapse to anonymous chips.

## Failure modes

- Static document context rendered as rounded filter chips.
- Date/source values without labels.
- Metadata consuming the first phone screen before the thesis.
- Side metadata card used as visual furniture in a prose-led document.

## Minimal example

```html
<dl class="meta-grid">
  <div><dt>Updated</dt><dd>June 1, 2026</dd></div>
  <div><dt>Audience</dt><dd>Engineering leads</dd></div>
</dl>
```
