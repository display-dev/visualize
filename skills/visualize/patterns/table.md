---
name: Table
description: Structured rows and columns for comparison, evidence, numeric data, or dense reference material.
variants:
  - dense-data
  - comparison
  - decision-matrix
---

# Table

## Use when

Use a table when row-column comparison is the reader job.

In document mode, prefer tables over card matrices for evidence, option comparison, feature comparison, and sourced claims. Tables keep claims comparable without turning prose into dashboard furniture.

## Do not use when

Do not use a table for three marketing bullets, one KPI, or prose that would scan better as sections.

## Semantic shape

Use `table`, `caption`, `thead`, `tbody`, `th`, and `td`. Scope row and column headers. Add source notes near the caption when needed.

## Type roles

Captions and intros stay small and attached to the table. Headers are label-sized. Body cells are regular. Row keys may be semibold. Numeric columns use tabular figures; monospace is only for fixed-width values.

## Spacing and borders

Borders should describe the grid once. Avoid broken borders, double borders, and oversized padding that makes data hard to compare.

The border model must stay coherent when a table becomes stacked records on mobile. A divider that separates two records spans the same visual box as the record boundary; a short rule under only the label column reads as a broken border. Choose one structure per breakpoint: either an actual table with row rules, or stacked records with internal key-value rhythm. Do not combine an outer rounded card, inset label rules, and full-width row separators unless each boundary marks a different semantic level.

## Mobile behavior

If comparison across columns matters, allow deliberate horizontal scroll with a visible container and attached caption. If row comprehension matters more, transform to stacked records with labels.

## Failure modes

- Table caption styled like a lede.
- Whole-cell bold prose.
- Header labels competing with data values.
- Borders that disappear or double at row boundaries.
- Mobile comparison records where inset rules, outer card borders, and row separators describe competing boxes.
- Card matrix used where a comparison table would make evidence easier to scan.

## Minimal example

```html
<table>
  <caption>API latency by region, p95 in milliseconds.</caption>
  <thead><tr><th scope="col">Region</th><th scope="col">Current</th><th scope="col">Target</th></tr></thead>
  <tbody><tr><th scope="row">EU</th><td>184</td><td>160</td></tr></tbody>
</table>
```
