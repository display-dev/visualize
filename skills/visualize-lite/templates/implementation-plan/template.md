---
name: Implementation plan
description: An execution-ready plan for building a technical or product change with scope, sequencing, risks, validation, and handoff context.
---

# Implementation plan

## Use when

Use this template when the reader needs a concrete execution plan before an agent or engineer starts implementation. Pick it for scoped technical/product work that needs decisions translated into steps, files or surfaces, dependencies, risks, validation, and handoff context.

## Do not use when

Do not use this for critique of an existing plan — use Plan review. Do not use it for approval-seeking argument — use Proposal or RFC. Do not use it for calendar sequencing as the main object — use Roadmap timeline. Do not use it for reviewing already-written code — use Diff review. If the source is too vague to name target surfaces, constraints, or validation, ask for clarification or produce a Proposal-shaped sketch instead.

## Structure

1. Header with title, concise subtitle, and labeled metadata when context helps: status, owner, source, branch/version, target release, or review deadline.
2. Lead section that states the implementation thesis: what will change, why this shape, and the smallest useful shipped outcome.
3. Scope boundary: in scope, out of scope, assumptions, and explicit non-goals so the executor knows what not to touch.
4. Execution map ordered by dependency path, not by author process. Each phase names the target files/surfaces/systems, expected outcome, dependencies, and validation signal.
5. Risk and rollback section with concrete triggers, mitigations, owners, and fallback paths.
6. Validation plan covering automated checks, manual smoke, data/backfill checks, compatibility, and release or publish preconditions.
7. Open questions and handoff checklist. Questions that block work must be marked as blockers; non-blocking questions must name the phase they can safely defer past.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for implementation context, `table` for phase/surface/risk matrices, `callout` for bounded blockers, `section-header` for dense hierarchy, `source-list` for linked specs/issues/PRs, `timeline` when sequencing is time-sensitive, and `toc` for long plans. Borrow a small diagram only when prose cannot carry the dependency path or system boundary.

Prefer an execution map over a generic task list. A good implementation plan lets a new session resume the work without reconstructing the shape from chat history.

## Hierarchy contract

The title and lead answer what is being built. The execution map is the page's working core, not an appendix. Section headings describe reader jobs: Scope boundary, Dependency path, Validation, Risks, Handoff. Status labels and risk states are compact and restrained; they support scanning without turning the plan into a dashboard.

## Mobile contract

The first two phone screens must deliver title, implementation thesis, essential metadata, and the first scope boundary without a large hero or decorative chrome. Phase tables may become structured lists on narrow screens when column comparison is not the main reader job. Risk and validation rows must keep the action, owner, and trigger together so mobile scanning does not separate the response from the risk.

## Failure modes

**Plan-review confusion.** A plan that mostly scores, critiques, or recommends changes to somebody else's plan is the wrong template. Use Plan review instead. Implementation plan output must say what to do next, not only what is wrong.

**Todo-list without execution context.** Steps like "implement backend", "update UI", or "add tests" are not implementation phases. Each phase names the target surface or system, the expected outcome, dependencies, and the validation signal. Generic todos trip because they cannot be resumed by a different agent.

**Hidden blockers.** Open questions that change architecture, data shape, permissions, or rollout must be marked as blockers and attached to the earliest affected phase. Hiding them in prose makes the plan look ready when it is not.

**Risk without response.** Every meaningful risk carries a trigger, mitigation, owner, and fallback or rollback path. "Monitor" alone is not a mitigation; "the team" is not an owner.

**Validation detached from phases.** Checks belong to the phase or release gate they verify. A validation list that cannot tell the executor when to run each check creates false confidence.

**Source/version ambiguity.** When the plan edits an existing artifact, API, repo, or published surface, include the current source reference and required concurrency guard: branch, commit, artifact version, `base_version`, `If-Match`, migration state, or equivalent. Plans that omit the baseline make later republish/update work unsafe.

The brand profile + universal laws + reflex-aesthetics handle everything else.
