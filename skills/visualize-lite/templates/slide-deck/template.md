---
name: Slide deck
description: A canvas-based presentation for sequential narrative, visual argument, and presenter-friendly review.
shell: slide-canvas
---

# Slide deck

## Use when

Use this template when the reader needs canvas-based presentation for sequential narrative, visual argument, and presenter-friendly review. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Slide-canvas runtime contract.** The shell is a fixed runtime contract the agent does not customise: arrow / page / home / end / digits 1–9 / R for navigation; `inert` on all non-active slides; `aria-roledescription="slide"` per slide and `"Slide deck"` on the wrapper; URL-hash sync via `#slide-N`; keystrokes inside form controls ignored; `metaKey`/`ctrlKey`/`altKey` honoured; boundary keystrokes silently no-op (no wrap). Modifications trip the detector — the contract is shared with Pitch deck.

**Seven layout discriminators, no more.** Each slide's `type` picks the layout from the restricted enum (`title` / `content` / `twoup` / `list` / `code` / `quote` / `divider` / `end`). Code slides are for single-function highlights only — side-by-side code diffs belong in Diff review, not a code slide. Inventing a new layout (`video`, `chart`, `embed`) is a spec change, not a per-artifact choice.

**Print fidelity per slide-per-page.** The print stylesheet renders every slide on its own page (`break-after: page`) with `position: static; opacity: 1`; nav chrome is hidden. The slide-hide mechanism on screen is `opacity: 0; pointer-events: none` (not `display: none`) so print overrides cleanly.

**Bottom safe area is part of the slide contract.** Fixed-canvas decks are viewed inside browser chrome, display.dev chrome, mobile URL bars, and sometimes short landscape windows. Do not treat the authored 16:9 canvas edge as usable content space. Keep meaningful content above the bottom safe area by default; if a slide needs dense content, compact the content instead of pushing it to the bottom edge.

**No blind full-height panels.** Two-up slides, diagrams, matrices, and lists should use natural-height content (`align-items: center` / `align-self: center` or `start`) with an explicit `max-height` when needed. Avoid `align-items: stretch`, `height: 100%`, or flex/grid children that expand a diagram/list panel to fill the entire slide body unless the panel also has a safe-bottom constraint and internal compaction. A visual panel that “fits” only by touching the bottom rule is a template failure, not a content success.

**Compact before clipping.** If a diagram or list is too tall, reduce row padding/gap/type, remove decorative container chrome, split the slide, or summarize. Do not rely on hidden overflow, scaling the whole slide, or letting the serving surface crop the last row.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
