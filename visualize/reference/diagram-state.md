# State, lifecycle, loop, and timeline diagrams

Use when one entity moves between durable states, repeats a lifecycle, or changes along an honest time axis. Use flow for actions without durable state and sequence for messages among actors.

## Required primitives

- state machine: explicit start where known, noun-named states, directed transitions, event/guard/action labels from evidence, terminal marker where genuinely terminal, and self-loops for real repetition;
- lifecycle/feedback: a visible closing transition; a circular arrangement without a return edge is not a loop;
- timeline: labeled time scale, events positioned proportionally to actual intervals, and a visible axis break when compression is necessary.

Choose one dominant direction before routing return transitions. Use a compact annotation for a true “from any state” transition rather than duplicating it from every state. Composite states are boundaries, not extra peers.

## Budget and mobile

Target at most nine visible states and eighteen transitions (or fewer when labels crowd), two composite levels, eight loop stations, and one shared-state hub. Timelines keep the number of simultaneously visible labels low enough to avoid collision. On mobile, use a vertical state spine with side returns, split composite detail, or turn a horizontal timeline into a vertical dated sequence while preserving interval truth in labels.

## Failure modes

- action verbs used as state names;
- unlabeled transitions where the trigger is not obvious;
- more than roughly two transitions per state without splitting;
- fake equal spacing for unequal time intervals;
- return paths omitted on mobile;
- multiple hubs or multiple state machines forced into one figure.

