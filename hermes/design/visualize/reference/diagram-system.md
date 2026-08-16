# System diagrams

Use for components, connections, data movement, tiers, trust boundaries, and nested scope. Use flow when step order dominates; use hierarchy when parentage or ownership dominates.

## Required primitives

- independently meaningful components at a consistent granularity;
- one primary left-to-right or top-to-bottom path;
- directed, named relationships when the source supplies the meaning;
- labeled boundaries for trust, tier, runtime, organization, or scope;
- nested groups when containment is the relationship;
- distinct visual treatment for external, asynchronous, storage, and focal components only when those distinctions are evidenced.

Connect edges to components, never to an abstract group label. A component should not appear as an unexplained orphan. Keep group headers clear of contained nodes and use containment instead of edges when containment alone carries the meaning. Route secondary or return paths with lower emphasis without disguising their direction.

## Budget and mobile

Target at most nine components, twelve relationships, and three top-level boundaries; nested containment should remain at five visible levels or fewer. Split by reader question, not by arbitrary technology tier. On mobile, preserve boundary membership and the primary path by stacking whole groups in flow order, using an overview plus detail figures, or drawing a separate narrow topology.

## Failure modes

- internal implementation fragments presented as peers of deployable components;
- a dashed box called “security” with no meaningful ingress or boundary semantics;
- direct connectors that skip a necessary evidenced intermediary;
- every component highlighted, or every boundary given a different decorative color;
- arrows crossing unrelated nodes or landing on group containers;
- mobile stacking that detaches a component from its boundary.

