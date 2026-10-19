---
name: API reference page
description: A structured API reference for endpoints, parameters, examples, and integration notes.
---

# API reference page

## Use when

Use this template when the reader needs structured API reference for endpoints, parameters, examples, and integration notes. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Convention-consistency on colour mappings.** Two pre-trained reader patterns are part of the contract. Method badges: `GET` green, `POST` blue, `PUT`/`PATCH` amber, `DELETE` red — restricted to GET/POST/PUT/PATCH/DELETE; invented methods (`OPTIONS`, `HEAD`, custom verbs) trip. Status-code groups: 2xx green family, 3xx blue family, 4xx amber family, 5xx red family — inverting (3xx in red, 4xx in green) trips the detector. The deepest 5xx red stays under chroma 0.18 per the genre-reflex guard.

**Stable endpoint IDs.** Every endpoint has a stable `id` matching its path-and-method (`id="publish"` for POST /v1/publish, `id="get-artifact"` for GET /v1/artifacts/{id}). Re-keying after publish breaks external links into the docs — same permalink-stability contract as Changelog's version IDs and FAQ's question IDs.

**Required-state + deprecation honesty.** Required params are marked with the `--req-dot`; required params with no marker trip the detector — readers can't guess from the type column. Deprecation banners include `since`, `replacedBy`, `removedIn`; a bare "deprecated" with no path forward is hostile to integrators. Footer carries `regeneratedAt` because API reference drifts from spec — the timestamp says the last sync moment.

The brand profile + universal laws + reflex-aesthetics handle everything else.
