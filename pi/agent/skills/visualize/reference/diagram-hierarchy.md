# Hierarchy diagrams

Use when the reader asks what contains, owns, inherits from, or reports to what. Use a system diagram when peer connections matter more than parentage, and a flow diagram when process ownership across time matters more than reporting structure.

## Required primitives

- one evidenced root or clearly labeled forest;
- parent-to-child connectors or nested boundaries;
- consistent tiers with no skipped levels;
- for responsibility maps: name, invocation route, and terse scope when available;
- optional/dashed treatment for unavailable owners or gaps rather than hiding them.

Tree connectors drop from a parent to a sibling bus and then into children; do not use diagonal fans. Keep node widths to one or two sizes. Containment hierarchies use consistent insets and label every boundary.

## Budget and mobile

Use at most four visible tiers, five direct children per parent, and twelve visible ownership nodes. Split large organizations by pod or branch. On mobile, rotate the tree left-to-right, show an overview plus branch detail, or use nested disclosure that retains parent labels; do not flatten children into an unparented list.

## Failure modes

- skipped tiers or a child visually attached to the wrong parent;
- more than five direct reports without grouping;
- identical treatment hiding roots, specialists, gaps, and approval gates;
- full job descriptions inside nodes;
- nested padding that varies enough to obscure containment;
- mobile lists with no persistent parent context.

