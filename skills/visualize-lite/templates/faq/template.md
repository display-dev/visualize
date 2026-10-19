---
name: FAQ
description: A question-led reference artifact for repeated reader objections or support needs.
---

# FAQ

## Use when

Use this template when the reader needs question-led reference artifact for repeated reader objections or support needs. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Index-consistency between visible content and search-indexed content.** The `<script type="application/ld+json">` FAQPage schema's `mainEntity` count must match the rendered `<details>` count. Drift between visible questions and indexed questions trips the detector — search engines surface questions that no longer exist, or skip questions that do. Same shape: every question's `id` must match its `<a class="faq-permalink" href="#...">` anchor.

**Question IDs are stable across edits.** They're the SEO + external-citation contract. Re-keying after publish breaks Google rich-result links and any third-party page that anchored to a specific question. Use short kebab-case (`q-what-is`), and once shipped, don't rename — add a new question or fold the old one in place.

**Default closed.** Every `<details>` ships without the `open` attribute. Pre-opened entries defeat the scan-then-open premise — the reader scrolls past walls of expanded prose looking for the one question they came for. The only sanctioned opening behaviour is hash-target on page load (`#q-foo` opens that entry, leaves the rest closed).

The brand profile + universal laws + reflex-aesthetics handle everything else (a11y, design fossils, theme overlay, type-scale floor, footer freshness).
