---
name: Status page
description: An operational status artifact for services, incidents, uptime, and subscriber-facing updates.
---

# Status page

## Use when

Use this template when the reader needs operational status artifact for services, incidents, uptime, and subscriber-facing updates. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Genre-reflex guard: no alarm chrome.** `--status-major` is warm coal-red at chroma ≤ 0.15, never saturated alarm-red. No full-bleed colored backgrounds for active incidents (banner uses a tint wash `--status-*-bg`, not the saturated state colour). No emoji alarm chrome on incident titles (🚨, ⚠️, 🔥, ❌). No "URGENT" / "CRITICAL" / "DOWN" all-caps banners. The five-state enum carries the urgency; the headline is plain English.

**Restricted state vocabularies (two of them).** Component / overall-banner state is drawn from `operational` / `degraded` / `partial` / `major` / `maintenance`. Incident-update state is drawn from a parallel enum: `investigating` / `identified` / `monitoring` / `resolved` for unplanned, or `scheduled` / `in-progress` / `completed` for maintenance. Inventing new states (`down`, `outage`, `restored`) trips the detector for both.

**Append-only incident log + live-currency disclosure.** Resolved incidents are read-only; mutating verbs may append new updates to active incidents or add a new incident at the top, but may not rewrite resolved updates. The uptime band carries exactly 90 segments; missing-data days render as muted grey, never silently filled as `operational` (the uptime percentage is derived, not invented). `lastChecked` timestamp + `refreshCadence` are required header chrome — a status page without a "last checked when" anchor is a published-once artifact pretending to be live.

The brand profile + universal laws + reflex-aesthetics handle everything else.
