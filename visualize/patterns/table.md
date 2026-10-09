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

## Reading structure

Columns answer comparable reader questions; row keys identify the entities or changes being compared. Use parallel phrasing without repetitive framing. When recognizing recurring row categories helps scanning, a labelled glyph can help; follow [Cognitive offloading](../reference/cognitive-load.md#cognitive-offloading). For explanatory comparisons, lead cells with short answers and put qualifications beneath in quieter regular text. Keep interpretation-changing conditions visible. Color may distinguish column meanings, but labels and structure must carry them without color. Straightforward numeric tables need not adopt this treatment.

## Type roles

Captions and intros stay small and attached to the table. Headers are label-sized. Body-cell emphasis follows [Table typography](../reference/typography.md#table-typography). Row keys may be semibold. Numeric columns use tabular figures; monospace is only for fixed-width values.

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

## Explanatory comparison example

Keys and person glyphs distinguish credential changes from membership changes in a longer lifecycle table. This excerpt shows one of each; short leads answer the column questions and conditions remain visible. Glyphs are optional, not a requirement for every table row.

```html
<table>
  <caption>Lifecycle changes: retained work and required action.</caption>
  <thead><tr><th scope="col">Change</th><th scope="col">What remains</th><th scope="col">Required action</th></tr></thead>
  <tbody><tr>
    <th scope="row"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="5"/><path d="m11.5 11.5 9 9M17 17l3-3M14 14l3-3"/></svg> Rotate credential</th>
    <td><strong>Existing records</strong><br>Subject to retention policy.</td>
    <td><strong>Update dependent clients</strong><br>Retire the old credential after migration.</td>
  </tr><tr>
    <th scope="row"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/></svg> Remove member</th>
    <td><strong>Shared work</strong><br>Under valid ongoing administration.</td>
    <td><strong>Revoke their authority</strong><br>Resolve affected work and grants.</td>
  </tr></tbody>
</table>
```
