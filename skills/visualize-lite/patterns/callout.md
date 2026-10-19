---
name: Callout
description: Bounded notes, risks, decisions, quotes, or status messages that need emphasis without taking over the page.
variants:
  - neutral
  - success
  - risk
  - quote
  - decision
---

# Callout

## Use when

Use a callout when a reader needs to notice a bounded note, risk, decision, quote, or implication before continuing.

## Do not use when

Do not box ordinary paragraphs or make every section begin with a callout.

## Semantic shape

Use `aside` for supplementary notes, `blockquote` for quotes, and `role="alert"` only for urgent status. Include a short label when tone might be ambiguous.

## Color and tone

Border, fill, label, and icon tone must imply the same state. Avoid side-stripe callouts; use a full hairline border, quiet tint, or pure type treatment.

## Mobile behavior

Keep callouts compact enough that they do not delay the body. Long callouts should become normal sections.

## Failure modes

- Warning border with neutral fill or success icon.
- Side-stripe default note.
- Callout used to compensate for weak hierarchy.
