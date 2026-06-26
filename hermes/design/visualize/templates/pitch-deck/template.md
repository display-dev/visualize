---
name: Pitch deck
description: A slide-based persuasive narrative for investors, prospects, or internal sponsors.
shell: slide-canvas
---

# Pitch deck

## Use when

Use this template when the reader needs slide-based persuasive narrative for investors, prospects, or internal sponsors. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this for scroll-based documents, dense reference material, or artifacts where the reader needs to skim nonlinearly. Use report, one-pager, or comparison instead.

## Structure

1. Opening slide that names the subject and stakes.
2. Sequential argument slides with one job per slide.
3. Evidence or model slides that keep data labeled and sourced.
4. Closing slide with the decision, ask, or next action.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

## Hierarchy contract

Each slide has one dominant idea. Slide titles carry the argument, body copy stays brief, and supporting stats or visuals do not compete with the slide thesis. Keep footnotes and source notes visible but quiet.

## Mobile contract

The slide shell handles scaling and navigation. Keep meaningful content inside the safe area, avoid bottom-edge dependence, and split dense slides before text falls below the readability floor.

## Failure modes

**Canonical arc with stated departures.** The arc minimum is `title-slide` + `problem` + `solution` + `model` or `ask` + `closing`; the full 12 is the canonical shape. Out-of-order slides (e.g., `team` before `problem`) trip the detector. Skipping a canonical slide silently is also a violation — departures need an explicit `arc-skips` entry with a stated reason ("pre-product, no traction to report").

**Restricted slide-type vocabulary.** The `type` field is drawn from `title-slide` / `problem` / `opportunity` / `solution` / `product` / `traction` / `model` / `market` / `competitors` / `team` / `ask` / `closing`. Inventing a new type (`vision`, `roadmap-slide`, `appendix`) is a spec change, not a per-artifact choice — same pattern as Plan review's status chips.

**Illustrative-figure disclosure on stats.** Any stat on a `traction`, `market`, or `ask` slide that doesn't have a verifiable source carries an explicit "illustrative for this reference template" footnote (or "*as of [date]*" source pointer). Same rule extends to team-slide names — placeholder presenter names trip the detector; leave the field empty until the user provides real data (`feedback_no_fabricated_copy`).

**Bottom safe area is part of the slide contract.** Pitch decks are fixed 16:9 canvases, but they are consumed inside browser chrome, display.dev chrome, mobile URL bars, and short landscape windows. Keep meaningful content above the bottom safe area by default. If the ask, model, competitor table, product screenshot, or market diagram gets tall, compact or split it; do not let the final row depend on the authored canvas edge staying visible.

**No blind full-height panels.** Product screenshots, market tiles, tables, and two-up visual panels should keep natural height (`align-items: center` / `align-self: center` or `start`) with an explicit `max-height` when needed. Avoid `align-items: stretch`, `height: 100%`, or children that expand a visual/list panel to fill the whole slide body unless the panel also has a safe-bottom constraint and internal compaction.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
