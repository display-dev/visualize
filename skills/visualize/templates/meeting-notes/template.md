---
name: Meeting notes
description: A record of discussion, decisions, owners, and follow-ups from a meeting.
---

# Meeting notes

## Use when

Use this template when the reader needs record of discussion, decisions, owners, and follow-ups from a meeting. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Attendee + decision + action-item structure with named owners.** Attendees + agenda + at least one decision + at least one action item + next-meeting pointer are all required; missing any trips the detector. Every action item carries `title` + `state` + `assignee` (real person, real name); `due` is strongly recommended for `open` and `in-progress`. Absent attendees render with strikethrough + muted colour and (where known) a return date — absence is disclosure, not punishment. Invented attendees, invented decisions, and invented action items are forbidden — when the agent doesn't have real meeting content, the notes don't get authored.

**Restricted state vocabularies.** Decision states are `decided` / `pending` / `blocked`; action-item states are `open` / `in-progress` / `done` / `cancelled`. Inventing states (`resolved`, `tabled`, `deferred`) trips. Postmortem's genre-reflex guard applies — no alarm-red on `blocked` decisions or `cancelled` actions (blocked needs attention, cancelled is fine; neither is failure to dramatise). The action-item primitive is shared with Postmortem follow-ups, Plan review next-steps, RFC accepted-actions, Project recap next-queue.

**Reviewed-and-distributed read-only lock.** Once meeting notes have been reviewed by attendees and distributed, mutating iteration verbs may not rewrite decisions, action items, or attendee lists. `/visualize review` is an audit and stays unlocked; corrections issue as version-bumped re-publish. Same terminal-state verb-runtime lock pattern as Postmortem `resolved`, Plan review `cut`, FAQ shipped IDs.

The brand profile + universal laws + reflex-aesthetics handle everything else.
