---
name: Résumé / bio
description: A professional profile artifact for experience, achievements, credibility, and contact context.
---

# Résumé / bio

## Use when

Use this template when the reader needs professional profile artifact for experience, achievements, credibility, and contact context. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Restraint guard against marketing-resume embellishment.** The hero name uses `--text-display` clamped — never a 5rem gradient-text hero. No invented "10× engineer" / "ninja" / "rockstar" framings, no imperative-tricolon headlines ("Build. Ship. Repeat."). The headline is one substantive sentence about positioning. The artifact reads as documentary, not marketing-puff, even when used in a job-search context.

**Skills-grid restricted-category vocabulary.** Skills group by category (`"Languages"`, `"Backend"`, `"Infra"`, `"Practice"`); each category is a restricted vocabulary — a "Languages" chip must be a programming language, a "Backend" chip must be a backend technology. Chip styling is uniform across categories (monochrome `--secondary`, mono font); the row's `skill-label` carries the category identity, the chips carry the items.

**Honesty + anonymisation disclosure.** Invented names, roles, dates, employers, degrees, or skill claims are fraud, not creative copy — résumé fabrication is the highest-stakes invention in the worked set. When any identifier is anonymised, the `anon-disclosure` block declares which fields are anonymised (visible on screen, hidden in print). Forbidden: pretending an anonymised role was named (e.g., labelling "Confidential Co." as if it were a real company).

The brand profile + universal laws + reflex-aesthetics list handle everything else.
