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

Read `reference/diagram.md` and the routed type reference for the primary figure. The figure's relationships must carry the explanation: repeated disconnected panels are not a substitute for topology. Keep the outer Diagram shell distinct from the figure's flow, system, sequence, state, hierarchy, or spatial grammar.

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

Prior visual variants are no longer live authoring files. If the ask needs a distinct register or rendering route, express that choice in the artifact-local composition and document the reason in visible copy only when it helps the reader.

## Hierarchy contract

The figure owns the page. Labels must be legible at the natural viewing size, connectors must read before decorative styling, and the legend stays quieter than the diagram. Prose supports the visual; it does not become a report wrapped around a small figure.

## Mobile contract

The first two phone screens must show the title, scope, and a usable diagram view or an intentional simplified mobile rendering. If the full diagram cannot fit, split it into focused subfigures or use an overview plus detail sections. Do not rely on accidental horizontal scroll for core comprehension.

## Failure modes

**Single-viewport constraint.** The diagram fits the artifact's viewport at standard zoom. A diagram requiring horizontal scroll has misfired; split or redraw it. Architecture overview is appropriate only when the reader needs a multi-section, prose-supported shell, not as an escape hatch for weak diagram geometry.

**Marked inline SVG.** Deliver one semantically marked inline SVG per relationship figure using `reference/diagram.md`: accessible title and description, unique nodes and groups, resolvable edges, and no diagram runtime or network dependency. Every node has a visible label. Mermaid remains an authoring option only: render it locally, fail on invalid source, normalize the resulting inline SVG, then remove Mermaid source/runtime dependencies before delivery.

**Disconnected-card impostor.** A marked non-spatial relationship figure with explanatory panels but no connector-bearing topology has failed even if the page looks polished.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
