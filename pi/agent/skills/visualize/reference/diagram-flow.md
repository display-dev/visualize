# Flow diagrams

Use for ordered work, decisions, handoffs, bottlenecks, and real feedback loops. Use `diagram-state.md` when the nodes are durable states of one entity, and `diagram-sequence.md` when actor-to-actor message order is the main question.

## Required primitives

- start/end when the path has real boundaries;
- action nodes and explicit directed connectors;
- decisions with every exit labeled from evidence;
- merge points where branches reconverge;
- owner lanes only when handoff ownership is load-bearing;
- for a bottleneck: converging arrivals, visible finite capacity, constrained service point, and distinct admitted/deferred outcomes;
- for a true loop: an explicit return edge to the first step and, when applicable, a separate shared-state hub or write-back path.

Choose one dominant reading direction and keep the primary path easy to trace. Give each branch its own route. A decision with more than three exits usually needs decomposition. Handoffs cross labeled lane boundaries; a step belongs to one owner.

## Budget and mobile

Target at most nine primary nodes, twelve edges, three decision exits, and five owner lanes. Split a long process into overview plus phase detail. On mobile, rotate to top-to-bottom, split before/after a named handoff, or redraw a loop vertically while retaining the return edge. Never replace branches or feedback with a flat stack.

## Failure modes

- unlabeled decision exits;
- a circular arrangement whose last step does not return;
- merged or overlapping branch paths that cannot be traced;
- equal-width pipeline hiding queue depth or capacity;
- lanes without owners or a step spanning owners;
- arrows snaking across lanes because the step order was not reconsidered.

