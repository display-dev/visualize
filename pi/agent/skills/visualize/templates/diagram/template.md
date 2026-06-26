---
name: Diagram
description: A visual explanation artifact for relationships, flows, architecture, or processes.
---

# Diagram

## Use when

Use this template when the reader needs visual explanation artifact for relationships, flows, architecture, or processes. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this when a simpler memo, plain prose answer, or a more specific template would make the reader faster. Do not force the template when the ask lacks the evidence or structure it requires.

## Structure

1. Header with title, diagram type, scope, and a short sentence explaining what relationship the reader should understand.
2. Primary figure with nodes, edges, labels, grouping, and legend if the encoding is not self-evident.
3. Caption or short explanatory note that names the key reading path and any omitted detail.
4. Optional supporting notes for assumptions, boundaries, or source context.
5. Accessible description that summarizes the diagram for non-visual readers.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

Prior visual variants are no longer live authoring files. If the ask needs a distinct register or rendering route, express that choice in the artifact-local composition and document the reason in visible copy only when it helps the reader.

## Hierarchy contract

The figure owns the page. Labels must be legible at the natural viewing size, connectors must read before decorative styling, and the legend stays quieter than the diagram. Prose supports the visual; it does not become a report wrapped around a small figure.

## Mobile contract

The first two phone screens must show the title, scope, and a usable diagram view or an intentional simplified mobile rendering. If the full diagram cannot fit, split it into focused subfigures or use an overview plus detail sections. Do not rely on accidental horizontal scroll for core comprehension.

## Failure modes

**Single-viewport constraint.** The diagram fits the artifact's viewport at standard zoom. A diagram requiring horizontal scroll has misfired — the artifact wants to be an Architecture overview (which composes multiple focused diagrams with prose between them), not a Diagram that overflows.

**`<svg role="img">` with described semantics.** The `<svg>` carries `role="img"`, `aria-labelledby` pointing at the title element, and a `<desc>` child that summarises the diagram in prose for screen readers. Every node has a visible text label. Every edge with semantic meaning is described in the `<desc>` or `<figcaption>` — edges themselves stay `aria-hidden="true"` so they don't fragment the screen-reader pass. Mermaid-routed diagrams carry a wrapping `<figure>` + `<figcaption>` instead.

**Content-medium discrimination.** The medium routing is content-driven, not user-preference-driven. A 30-node flowchart hand-positioned in `css-svg` is the wrong tool; a 4-box happy-path drawn in Mermaid pays library cost for nothing. The detector reads the artifact's shape (node count, library presence, content type) and flags medium mismatch.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
