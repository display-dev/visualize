---
name: TOC
description: Navigation for long artifacts whose sections benefit from direct access.
variants:
  - compact-list
  - numbered-grid
---

# TOC

## Use when

Use a TOC when the artifact has enough sections that navigation materially helps the reader.

## Do not use when

Do not add a TOC to short artifacts, single-screen summaries, or slide decks.

## Semantic shape

Use `nav aria-label="Contents"` with an ordered or unordered list of links. Keep link text aligned to real section headings.

## Type roles

The TOC label is quieter than the page title but clearer than body labels. Links should read as destinations, not tags.

## Spacing and borders

Rows need consistent rhythm. Avoid loose inline links that form a word cloud. Use one boundary between header and contents.

## Mobile behavior

Prefer a vertical list, compact numbered rows, or a deliberate two-column grid. Keep enough spacing for touch without making the TOC the whole first screen.

## Failure modes

- Free-wrapping links with random gaps.
- Duplicate separator lines around the TOC on mobile.
- TOC included because a template had one, not because navigation helps.
