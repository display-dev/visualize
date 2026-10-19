---
name: Whitepaper
description: A durable argument or technical explanation for a complex topic, market, or method.
---

# Whitepaper

## Use when

Use this template when the reader needs durable argument or technical explanation for a complex topic, market, or method. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

Prior visual variants are no longer live authoring files. If the ask needs a distinct register or rendering route, express that choice in the artifact-local composition and document the reason in visible copy only when it helps the reader.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Citation roundtrip.** Every `<a class="fn-ref">` in the body has a matching `<li id="fn-N">` in the References list, and every `<li id="fn-N">` carries a `<a class="ref-back">↩</a>` back to its body anchor. Orphan refs (forward but no entry), unreferenced entries (entry but never cited), and one-way citations (forward but no back-link) all trip the detector — the footnote-and-reference primitive is the structural contract for this template.

**Abstract is the document for skimmers.** 120–200 words, distinct reading-stream abstract block with bounded measure, a label, and a quiet rule or surface tint. Do not render the abstract as a floating rounded card; it remains part of the reading stream. Shorter than 120 is a subtitle wearing the wrong frontmatter; longer than 200 dilutes the compression that makes abstracts useful. A reader who reads only the abstract should know the position, the why, and the scope.

**Signed work.** Byline carries at least one named author with an affiliation, and the footer carries a `citationName` line ("For citation: Rannaberg & Ilves, 2026"). "By the team" trips the detector — whitepapers defend a position; somebody is the bearer of that argument. Without the citation line, external readers construct ad-hoc citations and the canonical form drifts.

The brand profile + universal laws + reflex-aesthetics list handle everything else.
