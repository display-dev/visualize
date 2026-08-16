# Sequence diagrams

Use when the reader must follow messages between actors over time. Time runs top-to-bottom; actors run left-to-right.

## Required primitives

- explicitly ordered actors with readable names;
- vertical lifelines;
- every message labeled with the evidenced request, event, or result;
- solid calls, dashed returns, and visibly distinct asynchronous messages when those semantics matter;
- activation bars only for intervals in which control or work is held;
- a framed `alt`, `opt`, or `loop` fragment when branching or repetition is essential.

Messages never point upward to imply reverse time. Self-messages return to the same lifeline. A fragment spans only participating lifelines, has explicit guards, and remains one nesting level deep. When a local Mermaid renderer cannot preserve a required fragment or activation, render the baseline and add the semantic SVG primitives after normalization.

## Budget and mobile

Use at most five lifelines, twelve messages, one fragment by default, two alternative regions, and one fragment nesting level. Split happy path from failure/retry detail when over budget. On mobile, keep time vertical and split actors into phases or focused message windows; repeat an actor header when needed rather than collapsing messages into prose.

## Failure modes

- sequence content drawn as swimlanes;
- unlabeled messages or ambiguous returns;
- an upward arrow reversing time;
- free-floating if/else arrows with no fragment boundary;
- activation bars that never close;
- open async and dashed-return styles used interchangeably;
- mobile reordering that changes message order.

