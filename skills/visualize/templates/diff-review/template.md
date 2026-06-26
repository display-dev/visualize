---
name: Diff review
description: A review artifact for changed files, risks, and requested follow-up.
---

# Diff review

## Use when

Use this template when the reader needs review artifact for changed files, risks, and requested follow-up. Pick it when the artifact has enough substance to benefit from the named structure, not just because the topic contains similar words.

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

**Diff-state colours are template-local, not design-system tokens.** Green-ish for `added`, red-ish for `removed`, defined inside the template's own `:root` / `[data-theme="dark"]` blocks — they survive every design-system swap. A design system that wants to retune them (Terminal dialling saturation down, IDE pushing it up) does so in the diff-review's per-system variant, not in `design-systems/<name>/tokens.css`. Clean stays monochrome on `--syntax-*` so a brand's primary hue doesn't compete with the green/red of the markers; hue belongs to dev-shop variants (Terminal, IDE).

**Marker character is the source of truth, colour reinforces.** Every diff line carries a `+` / `-` / space character in the `.lm` column for assistive tech — colour alone never substitutes. Each `<pre class="code-block">` is `tabindex="0"` for keyboard-scrollable horizontal overflow, and the outer element resets `white-space: normal` (the `<pre>` UA default would render `<li>`-row indentation as visible whitespace); per-line `.dl` carries `white-space: pre` so the source line is preserved.

**Summary required at scale, oversized diffs flagged.** The summary block is mandatory whenever the diff exceeds ~50 changed lines or two files — the reader needs to know whether to dig in before they dig in. Diffs >300 lines or >5 files trip a `/visualize review` warning: at that size the artifact is usually better summarised as a Report with a PR link, not rendered line-by-line.

The brand profile + universal laws + reflex-aesthetics handle everything else.
