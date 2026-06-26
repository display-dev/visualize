---
name: Roadmap timeline
description: A time-based plan for milestones, sequencing, dependencies, and risks.
---

# Roadmap timeline

## Use when

Use this template when the reader needs time-based plan for milestones, sequencing, dependencies, and risks. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

## Do not use when

Do not use this when a simpler memo, plain prose answer, or a more specific template would make the reader faster. Do not force the template when the ask lacks the evidence or structure it requires.

## Structure

1. Header with title, concise subtitle, and labeled metadata when context helps.
2. Lead section that answers the reader's main question before detail.
3. Body sections ordered by reader decision path, not by author process.
4. Evidence, examples, tables, timelines, or source lists only where they sharpen the argument.
5. Closing section with decision, next action, or durable takeaway.

## Creation guidance

Read pattern recipes only when the content calls for them: `metadata` for document context, `toc` for navigable long-form artifacts, `table` for dense comparisons or evidence, `callout` for a bounded warning/decision/note, `section-header` for dense hierarchy, `source-list` for provenance, `stat` for KPIs, and `timeline` for dated sequences. Do not include a pattern just because the old HTML example had one.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Restricted status vocabulary + temporal match.** Status is drawn from the five legend values; inventing new statuses trips. Tag-content match enforced against the time axis: `shipped` bars only on past columns, `planned` bars only on present-or-future columns. A `shipped` bar entirely in the future trips the detector.

**Today marker is non-negotiable.** A roadmap without a today line forces the reader to compute "where are we now?" — every roadmap has a now, surface it. The past/future band tinting carries the same signal at a coarser grain (`--tl-past-band` settled, `--tl-future-band` open).

**Horizontal scroll, not reflow, at narrow viewports.** The timeline container is the only template in the worked set that intentionally scrolls horizontally rather than reflowing — the time axis is the load-bearing dimension; reflowing loses information. Track labels stick to the left via `position: sticky` so bar labels mid-scroll keep their track context. The footer carries `nextReview` + `cadence`; roadmaps go stale fast and the refresh contract is what lets readers trust the marker positions.

The brand profile + universal laws + reflex-aesthetics handle everything else.
