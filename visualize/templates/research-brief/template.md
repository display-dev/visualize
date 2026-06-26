---
name: Research brief
description: A concise evidence synthesis for a research question, market, user, or competitor.
---

# Research brief

## Use when

Use this template when the reader needs concise evidence synthesis for a research question, market, user, or competitor. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

Default to `document` mode for source synthesis, market scans, competitor reads, user research summaries, and other prose-led evidence briefs. Interview studies use the methodology and citation contracts below; secondary-source or desk-research briefs still need source trails and claim-level provenance, but not interview-specific sections. Use canvas/dashboard primitives only when relationships or metrics are the main read and the source material supplies the model.

## Hierarchy contract

The title owns the page. Section headings describe reader jobs, not generic labels. Paragraphs stay readable, metadata uses labeled fields rather than static chips, tables keep caption/header/body/value roles separate, and callouts remain subordinate to the main argument unless the artifact is specifically an alert.

## Mobile contract

The first two phone screens must deliver title, thesis, and essential context without oversized chrome. Metadata wraps as labeled rows or compact groups. TOCs remain list-like. Tables either scroll deliberately with attached captions or become structured lists when column comparison is no longer the reader job.

## Failure modes

**Interview-study disclosure honesty.** Applies only when the source is primary interview or user-research material. Interview briefs need the seven sections: abstract, hypothesis-or-exploratory-note, methodology metadata, findings, discussion, limitations, and interview index. The methodology block carries sample + recruitment + method + window + analysis + limitations-pointer in full. The limitations section is substantive (minimum 80 words); auto-generated "we acknowledge limitations" boilerplate is a content-shape failure. Footer carries the sponsorship-disclosure note when applicable. Shares the anonymised-quote primitive and section-level anonymisation disclosure with Survey results: every quote attribution is role + team-type + tenure, or real name with permission. Invented "Anonymous Engineer" pseudonyms, invented quotes, invented sample sizes, and invented company names in citations are forbidden. For secondary-source or desk-research briefs, do not synthesize interview sections; use explicit source trails, confidence/limitation notes, and claim-level provenance instead.

**Interview-citation roundtrip.** Applies only when the brief contains `[I-N]` interview citations. Every `[I-N]` in finding bodies has a matching `<li id="fn-N">` in the interview index; the index entry has at minimum role + team-type + tenure + company-size-bucket + interview date. Citations are anchor links with back-links from the index, and `:target` flash provides the visual cue — pure progressive enhancement, no JS. Same index-consistency shape as FAQ's question-IDs.

**Small-multiples cohort breakdown with per-tile `n`.** Cohort breakdowns use the small-multiples primitive — each tile carries segment-name + segment-`n` + 2-5 frequency bars. Per-tile sample-size disclosure is required (extends Survey results' `n` rule). Reading column constrained to ~44rem (Whitepaper's publishing measure); widening past 50rem loses the publishing read.

**Source-brief visual drift.** Research claims do not become stronger when boxed into a card grid, lane map, radar, or score strip. In document mode, use tables for comparison, figures with captions for real relationships, and source lists for provenance. Scores, rankings, or bars require a disclosed scoring model, units or scale, and source/method note.

The brand profile + universal laws + reflex-aesthetics handle everything else.
