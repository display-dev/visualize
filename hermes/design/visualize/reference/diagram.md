# Relationship diagrams

Apply the shared creation rules in `SKILL.md` first. This reference owns relationship semantics inside any artifact shell; the selected template still owns the surrounding page.

## Route by the reader's question

| Reader question | Type reference |
|---|---|
| What happens next, where does it branch, or where is the bottleneck? | `diagram-flow.md` |
| What exists, where are the boundaries, and how are components connected? | `diagram-system.md` |
| Who communicates with whom, and in what order? | `diagram-sequence.md` |
| How does something move between states, repeat, or evolve over time? | `diagram-state.md` |
| What contains, owns, inherits from, or reports to what? | `diagram-hierarchy.md` |
| What is adjacent, overlapping, or positioned on a qualitative spectrum? | This reference alone; use `spatial` |

Choose the semantic pattern independently of the type: topology, handoff, decision, bottleneck, feedback, state transition, timeline, containment, overlap, or qualitative continuum. The pattern says what the reader must recover; the type supplies geometry. Use one dominant type per figure and split when two grammars both need full treatment.

## Evidence and complexity

Every node, group, edge, label, state, and direction must come from supplied or inspected evidence. Leave unknowns visible or ask a focused question; never complete a graph by invention. Merge entities that always travel together and remove relationships already made unambiguous by geometry. Above roughly nine primary nodes or twelve edges, prefer overview plus detail unless the selected type declares its own explicit budget; that type budget then governs.

## Delivered SVG contract

Deliver every relationship figure as inline SVG in self-contained HTML:

```html
<figure data-visualize-diagram="flow">
  <svg role="img" aria-labelledby="request-title">
    <title id="request-title">Request flow</title>
    <desc>A browser sends a request to the API.</desc>
    <g data-diagram-node="browser">...</g>
    <g data-diagram-node="api">...</g>
    <path data-diagram-edge="request" data-from="browser" data-to="api">...</path>
  </svg>
</figure>
```

- `data-visualize-diagram` is `flow`, `system`, `sequence`, `state`, `hierarchy`, or `spatial`.
- Node, edge, and group identifiers are non-empty and unique inside the figure.
- `data-diagram-parent` on a node or nested group resolves to a marked group in the same figure.
- Every marked edge resolves `data-from` and `data-to` to nodes in the same figure. Add `data-edge-kind` only when evidence names the relationship.
- Every connector has non-degenerate geometry in the delivered SVG markup. Responsive JavaScript may replace that geometry for another layout, but it must not be the only source of a path's `d`, line endpoints, or polyline points.
- A deliberate edge intersection uses one pair-scoped marker: an element with `data-diagram-crossing-ok`, valid different `data-edge-a` and `data-edge-b`, and a non-empty `data-reason`.
- A deliberate overlap in a `spatial` figure uses one pair-scoped marker: an element with `data-diagram-overlap-ok`, valid different `data-node-a` and `data-node-b`, and a non-empty `data-reason`. It exempts only that node pair; other peer overlaps still fail.
- Every figure has nodes. Edges are required only when connectors carry relationships; containment, adjacency, overlap, and axis position may be edge-free.
- Every SVG `<text>` label is eligible for clipping, overlap, and contrast checks. Add `data-diagram-label` when a stable semantic label identifier helps review output. Keep group boundary geometry separate from peer nodes.
- A non-empty `<title>` with an ID must be referenced by `aria-labelledby`; a non-empty `<desc>` supplies the longer topology alternative without requiring its own ID. The description or figure caption must summarize the principal entities, direction, branches, handoffs, boundaries, and loops needed to understand the figure non-visually. Keep individual SVG connector primitives out of the accessibility tree so they do not fragment the reading order.

Mermaid, Graphviz, or another local tool may calculate initial geometry. For Mermaid, run `node $SKILL_DIR/scripts/render-mermaid.mjs <source.mmd> <draft.svg>`; the pinned local authoring command renders valid source and fails visibly on invalid source. Inline the draft SVG, remove generator metadata, normalize the semantic markers above, and then make targeted SVG or responsive adjustments. The delivered HTML must work with network access blocked and contains neither the Mermaid source nor runtime.

## Connector and group grammar

Direction must be visible from arrowheads, order, or type-specific geometry rather than captions alone. Draw connectors behind nodes; use distinct ports or offsets when several edges share a side; route around unrelated nodes; keep labels clear of paths; and document only genuinely intentional intersections. Boundaries must label the property they represent (trust, ownership, tier, scope), not merely decorate a cluster.

With captions and body prose hidden, the figure must still expose its principal entities, direction, branches, handoffs, boundaries, and feedback. Repeated disconnected panels are not a relationship diagram.

## Mobile and fallback visual treatment

Preserve meaning rather than pixel layout. At narrow width, redraw, rotate, split, or replace the desktop SVG with a separately marked mobile figure. Keep direction, branch structure, boundary membership, and loops recoverable; a stacked card list that removes topology fails.

Project `DESIGN.md`, `tokens.css`, and instructions win. Without project guidance, use existing Visualize semantic tokens for a restrained editorial baseline: quiet background, strong foreground, one focal accent, thin rules, limited fills, and distinct label roles. Do not copy a donor palette or font stack.

## Failure modes

- prose cards connected only by proximity;
- decorative arrows whose endpoints or direction do not match evidence;
- groups that imply unsupported ownership or trust;
- edge labels invented to satisfy markup;
- desktop topology collapsed into unrelated mobile cards;
- a runtime-dependent Mermaid block or opaque generated SVG without semantic normalization;
- shrinking labels or widening the canvas instead of splitting an over-budget figure.
