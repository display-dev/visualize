---
name: Explainer
description: A progressive teaching artifact for understanding a concept, mechanism, rationale, or causal chain.
---

# Explainer

## Use when

Use this template when the reader needs a mental model for how or why something works. It fits concepts, mechanisms, decisions, proposals, and changes whose parts or consequences become clearer through progressive explanation.

## Do not use when

Use Tutorial when the reader's primary job is performing a task, Diff review when they must judge a change, Project recap when they need status and outcomes, Diagram when one spatial figure is the deliverable, Architecture overview when maintaining system topology and operational ownership is primary, or Report when findings and implications matter more than teaching progression. A diff can use Explainer when the reader must understand the resulting mechanism rather than evaluate correctness or risk.

## Structure

1. Resolve the audience and assumed prior knowledge; state prerequisites only when their absence blocks understanding.
2. Orient the reader with the central idea, why it matters, and the mental model to retain.
3. Explain the mechanism at the smallest useful level of detail, using a diagram, annotated flow, comparison, or code excerpt only when it reduces explanation cost.
4. Deepen progressively: establish the simple model first, then let each section answer a question created by the preceding one.
5. Ground abstractions in examples from supplied or verified source material. Label inference and never invent behavior or rationale.
6. Name material misconceptions, boundaries, non-goals, or limits.
7. End with a compact model, consequence list, or optional active-recall prompt rather than a generic summary card.

## Creation guidance

Read pattern recipes only when the explanation calls for them: `callout` for a bounded misconception or consequence, `table` for a real comparison, `section-header` for dense hierarchy, `source-list` for provenance, and `toc` for long navigation. Spatial relationships must carry causality or ownership rather than decorate the prose.

Match the explanatory form to the material when a visual materially reduces explanation cost:

| Material | Preferred form |
|---|---|
| Architecture, relationships, or boundaries | Diagram or annotated flow |
| Code behavior or a diff's mechanism | Focused, annotated snippet using real source lines when available |
| Process, lifecycle, or state change | Numbered flow or state strip |
| Comparison or trade-off | Compact contrast or comparison table |

These are preferred form defaults, not mandatory sections. Use prose when it communicates the model more directly, and do not add a visual merely to satisfy the mapping.

Every explanatory visual must have a prose equivalent that communicates its essential relationship, mechanism, or conclusion to a reader who cannot see it or chooses to skip it. Do not narrate every visual element or duplicate its labels; carry the same mental model in nearby text.

For a diff, optionally use predict-then-reveal: show a focused before-state or invariant, invite a prediction, then reveal the changed mechanism and explain the result. Keep the reveal available in static HTML, print, and no-JavaScript reading, and do not add review verdicts unless requested.

Use one to three active-recall prompts only when they help the reader transfer the model. Keep answers statically accessible; do not add scores, progress bars, quiz state, or gamification.

## Hierarchy contract

The title and core mental model own the page. Navigation and metadata remain subordinate. Prose stays at a readable measure, while code, tables, and diagrams are horizontally safe. Examples, edge cases, and implementation detail must not appear before the simple model they qualify.

## Mobile contract

The first two phone screens deliver the title, central idea, and essential context. When columns or diagrams stack, preserve causal order and keep labels and connectors unambiguous without hover. No interaction may be required to reveal essential explanation.

## Failure modes

**Tutorial in disguise.** Numbered instructions tell the reader what to do without explaining the mechanism.

**Report-shaped dumping.** Sections collect facts but do not form a progressive mental model.

**Decorative diagram.** Boxes and arrows repeat prose without clarifying causality, relationship, or ownership.

**Review leakage.** A diff explanation assigns correctness or severity verdicts the reader did not request.

**Assumed rationale.** The explanation presents inferred motivation as recorded fact.

**Disclosure trap.** JavaScript, hover, or collapsed controls hide content needed for ordinary reading, accessibility, or print.

**Recall theater.** Generic questions test wording instead of the transferable model.

The brand profile, universal laws, and reflex-aesthetics handle the remaining composition choices.
