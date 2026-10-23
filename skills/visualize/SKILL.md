---
name: visualize
version: 0.8.0
license: MIT
user-invocable: true
argument-hint: "[teach | explore | simplify | bolder | quieter | animate | polish | review | publish] [<topic-or-path>]"
description: >
  Create, explore, refine, and review on-brand HTML reports, diagrams,
  diff reviews, slide decks, plans, recaps, and dashboards. Use to visualize
  information, compare layouts or design systems, apply a brand or theme,
  or improve an artifact's design, including simplifying, polishing, making
  it bolder or quieter, and animating. Capture brand from code, conversation,
  or a live site.
---

# visualize — beautiful, on-brand HTML artifacts

Generate self-contained HTML artifacts composed from `templates/*/template.md` contracts against the resolved visual context. The project's `DESIGN.md`, `PRODUCT.md`, and sidecar `tokens.css` provide the default; artifact themes below allow reference systems within the user's approved scope. Shared pattern recipes live in `patterns/` and are read only when the selected template and user ask make them relevant; shell mechanics are loaded automatically only when a template declares `shell: <slug>`.

In helper commands, `$SKILL_DIR` means the absolute directory containing this installed `SKILL.md`. Resolve it from the host's skill location; set it in the shell and quote it (`"$SKILL_DIR"`), or substitute the quoted absolute path. Hosts do not necessarily export it.

## Design judgment

Identify the reader's task and make the important distinction visible, retaining the evidence and qualifications needed to interpret it. Before choosing a treatment, find the source's organizing relationship, contrast, sequence, decision, or object; let it shape the opening, section rhythm, and explanatory primitives. When none helps, prefer restrained reading over a manufactured organizing idea.

Artifact mode describes consumption, not aesthetics: `document` need not mean editorial publishing, nor `canvas` diagram chrome. Composition, typography, density, spatial rhythm, imagery, interaction, or color can supply conviction. Do not add hues, decoration, or components merely to make the artifact feel designed.

Before responding to feedback, compare the observation with the artifact's reader, purpose, source, and approved brief where one exists. Distinguish an implementation defect, a design that fails its existing requirements, and evidence that a requirement or assumption has changed. The current composition is a solution, not a constraint.

Make authorized corrections within the existing brief directly. If feedback implies a change to established requirements that the user has not already approved, explain the proposed change and obtain agreement before editing. When several structural or visual directions remain plausible, recommend `explore artifact` within its supported scope. When the direction is established, use the ordinary creation or refinement workflow. Follow that workflow's approval requirements; a small correction does not need a new exploration.

Judge proposed fixes together against the reader's task. Do not turn every critique finding into an addition or treat a small diff as evidence of a sound direction. Retain decision-relevant deferred observations in existing review or task notes.

## Commands

`/visualize` takes a command or topic/path.

**Default (topic/path without a command):** create self-contained HTML using a template and resolved context. Read `reference/create.md`; preflight and user-approved shape precede code. An agent-authored brief cannot approve itself.

**Named commands:**

| Category | Command | Argument | What it does | Reference |
|---|---|---|---|---|
| **Build** | `teach` | none | Bootstrap (or refresh) the brand profile. Writes `DESIGN.md` + `PRODUCT.md` at the project root. | `reference/teach.md` |
| **Build** | `explore` | `artifact\|system <topic-or-path>` | Compare one artifact's treatment or a new/replacement project system; review before applying. | `reference/explore.md` |
| **Refine** | `simplify` | `<path>` | Strip decoration that isn't earning its pixel. Hands off to `polish`. | `reference/simplify.md` |
| **Refine** | `bolder` | `<path>` | Amplify visual punch on safe / generic artifacts. Hands off to `polish`. | `reference/bolder.md` |
| **Refine** | `quieter` | `<path>` | Tone down over-decoration without going generic. Hands off to `polish`. | `reference/quieter.md` |
| **Refine** | `animate` | `<path>` | Purposeful motion, `prefers-reduced-motion` compliant. Hands off to `polish`. | `reference/animate.md` |
| **Refine** | `polish` | `<path>` | Terminal quality pass — walks every dimension and reports per-dimension findings. The other Refine verbs hand off to this one. | `reference/polish.md` |
| **Evaluate** | `review` | `<path>` | Deterministic detector findings + LLM judgment. Reports; doesn't modify the file. | `reference/review.md` |
| **Publish** | `publish` | `<path>` | Push the artifact to display.dev via MCP / CLI / HTTP cascade. | `reference/publish.md` |

Example: `/visualize polish ./report.html`. On hosts without slash commands, natural-language intent is the primary entry.

## Routing rules

1. **No argument**: render the Commands table above as the user-facing menu, grouped by category. Ask what they'd like to do.
2. **First word matches a command**: **load its reference before acting**; the table is not the procedure. Everything after the command name is the target.
3. **Natural-language intent**: requests to compare design alternatives load `reference/explore.md`; capturing or reconciling project identity loads `reference/teach.md`. Otherwise load `reference/create.md` for creation or an explicitly requested restyling of an existing artifact. A named theme follows Artifact themes below; it does not require an exploration round.
4. **Relationship-diagram route during creation**: when preflight first identifies a likely relationship diagram, load `reference/diagram.md` and the one tentative non-spatial type reference needed for that figure before presenting the shape gate. For multi-figure artifacts, load one reference for each distinct tentative family: `reference/diagram-flow.md`, `reference/diagram-system.md`, `reference/diagram-sequence.md`, `reference/diagram-state.md`, or `reference/diagram-hierarchy.md`. Spatial figures use `reference/diagram.md` alone. If approval changes a figure's type, load the replacement reference before authoring; do not load unrelated families.
5. **Generated-image route during creation**: when the approved shape requires generated bitmap imagery, load `reference/image-generation.md` before selecting or invoking a route. Use only the active callable inventory or an explicitly selected API adapter. Never infer a route from a key, executable, mount, or model claim, and never retry or fall back after an ambiguous attempt.
6. **Explore scope**: `explore` always loads `reference/explore.md`, which distinguishes artifact treatment from project-system creation or explicit replacement. Comparing treatments for one artifact does not require creating a project design system first. System Explore uses its opt-in authority classification instead of applying the render fallback as an incumbent identity.

## Hand-off output shape

After `simplify` / `bolder` / `quieter` / `animate`, report in conversational markdown: verb and target, changes drawn from the reference's "what to surface" list, diff percentage, and the appropriate next action. Successful refinement defaults to `polish`, which has its own output shape in `reference/polish.md`.

Variant rules:

- **Fallback context:** name the source once (project instructions, README/docs, seed, or Clean) and nudge `/visualize teach`. Follow Brand profile's fallback hierarchy.
- **Diff >40%:** stop, report the scope, and apply Design judgment to recommend exploration if direction is unresolved or fresh creation if established. Do not continue to polish.
- **Verb shouldn't have run:** use the reference's refusal conditions; replace the standard summary with a short reason and the appropriate alternative.

For `animate` specifically: when the brand declares `motion: none`, a fifth variant applies — see `reference/animate.md`.

Lead with changes, vary phrasing for the reader, and avoid fenced summaries, capitalized emphasis, or `<Verb> pass complete ·` banners.

## Absolute bans

Match-and-refuse. Apply on every command and the default creation flow. These ban specific patterns — not aesthetics, not registers. A brand can declare a font, a hue, or a layout that looks unusual; it cannot redeem any of these patterns by declaring them as identity. An explicit `.visualize-detect.json` skip can waive only a detector-backed ban with a concrete rule ID; it is project policy, not runtime brand suppression, and cannot waive a Layer-2 ban.

```
BAN 1 — Gradient text on metrics or headings
  PATTERN:   background-clip: text + gradient background on <h*>, [class*="metric"], [class*="kpi"]
  INCLUDES:  -webkit-background-clip: text; CSS `background-image: linear-gradient(…)` + `color: transparent`
  WHY:       AI-essay register tell; reads as 2023-template "make the number pop"
  REWRITE:   Solid `--primary` (or `--foreground`) at one weight up; emphasis through weight + size, not gradient

BAN 2 — Side-stripe callout (border-left as accent)
  PATTERN:   `.callout`, `.tldr`, `.note`, `.tip` with border-left ≥ 3px in --primary / --warning / --destructive
  INCLUDES:  border-inline-start, border-l-4 utility class, ::before pseudo with positioned bar
  WHY:       Notion / Confluence template tell; reads as productivity-app default
  REWRITE:   Full thin border (1px var(--border)), background tint at 4–8% chroma, or no chrome — just a label heading

BAN 3 — Triple-feature-card grid
  PATTERN:   3-column grid of <h3>adjective + noun</h3> + one paragraph + one icon each
  INCLUDES:  4-column variants, "Why us" sections with identical card-icon-heading-blurb shape
  WHY:       AI-landing canonical pattern; the surest "AI generated this" tell on the visualize corpus
  REWRITE:   Asymmetric — one hero claim with two supporting facts, OR a numbered list with body prose, OR a single comparison table

BAN 4 — Hero-metric template
  PATTERN:   Centered <h1 class="…huge…">N×</h1> + <p class="…small…">supporting label</p> + 3 stat tiles below
  INCLUDES:  "10× faster", "99.9% uptime", "1M requests/day" hero blocks with the same shape
  WHY:       SaaS-landing cliché; the most-copied AI-marketing-page shape in 2024-2026
  REWRITE:   Specific claim in body prose with the number inline; data tiles only when the artifact is actually a dashboard

BAN 5 — Ornamental icon-tile section markers
  PATTERN:   Repeated icon tiles on section headings add chrome without identifying meaningful content distinctions
  INCLUDES:  Rounded-square, circle, coloured-pill, and gradient-tile variants serving only as decoration
  WHY:       Repeated chrome makes different sections look alike and competes with their content
  REWRITE:   Remove ornamental markers; retain useful recognition cues under reference/cognitive-load.md's Cognitive offloading guidance

BAN 6 — Imperative tricolon
  PATTERN:   Three short imperative sentences ending in periods, in the same paragraph or hero
  INCLUDES:  "Ship faster. Build smarter. Scale forever." / "Move fast. Stay safe. Be bold." (any topic)
  WHY:       AI-copywriting cliché — the structure is identical across thousands of generated landing pages
  REWRITE:   One specific claim with the verb in the right tense, OR a sentence that names the actor and the action

BAN 7 — Sycophant / AI-attribution footer
  PATTERN:   "I hope you find this useful", "Let me know if you have questions", "Best, Claude", "Generated by AI", "As an AI…"
  INCLUDES:  Footer-line variants, comment-line variants in the HTML source
  WHY:       The artifact is the work; the model is invisible. Sycophant footers contaminate the artifact register
  REWRITE:   No footer of this shape. A real footer carries metadata (date, version, source-of-truth link) or is absent
```

If you're about to author one of these patterns, stop and rewrite the element with the alternative. The list is shared across creation, every Refine verb, and `polish`.

## Model-specific operating rules

These are not brand aesthetics; they are observed model reflexes with required corrective behavior. Apply them after the universal bans, especially during no-brand greenfield creation.

**Codex-specific rules:**

- **Border plus big shadow:** avoid pairing a 1px border with a large fuzzy drop shadow on the same card or button. Choose a crisp edge or a small elevation cue.
- **Over-rounded containers:** ordinary cards, sections, inputs, and panels should usually stay at 12-16px radius. Larger radii need an explicit brand reason.
- **Decorative stripe backgrounds:** do not use `repeating-linear-gradient(...)` as body or section filler. Use an intentional texture/rule system, or leave the background plain.
- **Crude SVG fallback:** do not draw rough SVG scenes because no real asset is available. Use generated bitmap imagery, a geometric diagram, or no illustration.
- **Compressed display type:** keep display heading letter-spacing ≥ -0.04em and clamp max ≤ 6rem unless the template is a slide/poster register that explicitly needs larger type.
- **Meta-contrast copy:** avoid "X theater", "actually X", and "not just X, it's Y" framing. Say what the artifact literally does.
- **Color judgment:** use `reference/color.md` to assess character, relationships, roles, distribution, and actual pairings. No hue, hue combination, neutral tint, or accent count is a universal taste gate. Preserve approved identity and explicit artifact exceptions.
- **Palette as a substitute for composition:** assign semantic color roles in the shape gate and use them consistently, but do not add accent tracks merely to manufacture visual interest. Neutral surfaces plus one accent are valid when composition, type, density, imagery, or interaction carries the point of view. Revise when the opening has no expressive dimension, not when it has too few hues.

**Gemini-specific guard:**

- Do not animate `<img>` elements on hover. If a card needs hover feedback, animate the card's border, background, or action affordance instead.

**Metadata / TOC guard:** static document context needs explicit labels, not anonymous rounded chips. Place document context according to [create.md's document-context guidance](reference/create.md); a right rail, split-cover facts column, or standalone metadata panel usually turns context into competing chrome. TOC rails are allowed for genuinely long documents, but they should support navigation rather than dominate the opening. Mobile TOCs must remain navigable lists or deliberate grids, never free-wrapping word clouds. Read `patterns/metadata.md` or `patterns/toc.md` when those structures are part of creation.

**Table guard:** tables are reading instruments, not hero sections. Keep caption, header, body, row-key, and numeric roles distinct; scope monospace to fixed-width values. Read `patterns/table.md` when the artifact carries dense comparison or evidence.

**Interactive-state route:** when creation includes functional controls or changes state in place, read `patterns/interactive-states.md`.

## AI slop test (two altitudes)

Run both tests:

- **First-order:** could the topic alone predict the template and palette? Inspect unsupported stereotypes, not approved identity; hue names are not prohibitions.
- **Second-order:** could topic plus anti-references predict the aesthetic family? Avoid substituting another saturated reflex, such as cream/Georgia/margin-note editorial, mono/grid/heavy-border terminal, or uppercase/grotesk/grid Swiss-poster when the source and register do not support it.

Rework unsupported defaults until neither test predicts the treatment; preserve approved identity.

## Brand profile

Every render reads available project-root `DESIGN.md` (visual identity/tokens), `PRODUCT.md` (voice/audience/tone), and `tokens.css`. `teach` writes concrete project tokens in Stitch-format `DESIGN.md` plus the CSS sidecar, not a `theme: <name>` pointer; its schema and derivation procedure live in `reference/teach.md`.

**Authority:** persisted `DESIGN.md` and `tokens.css` own visual tokens; `PRODUCT.md` owns voice and audience. Project instructions fill gaps without overriding persisted tokens unless the user explicitly says otherwise in the current request. Apply Artifact themes' approved exceptions before locking context.

Brand authority is identity-scoped. If the request fixes a named identity but the resolved project profile clearly belongs to another product, do not substitute, relabel, or approximate it. Stop before the shape gate or any artifact edit and request matching authority or explicit permission for an artifact-only override.

`design-systems/` packages supply guidance, tokens, and previews for `teach`, System Explore, and artifact themes.

The installed skill bundles the catalog index and Clean fallback. Resolve any selected reference with `node $SKILL_DIR/scripts/catalog.mjs <slug>` and read the returned file paths; add `--previews` only when inspecting its previews. Other packages are fetched from the published revision in `design-systems/catalog-source.json` and cached locally. Package links resolve against the returned source URL; shared workflow remains this installed skill. If resolution fails, report the unavailable reference without inventing its guidance or silently replacing an explicit choice. `VISUALIZE_CATALOG_CACHE_DIR` can relocate the cache.

**Fallback when no DESIGN.md exists:**

1. Preserve an approved artifact reference as the baseline where project guidance is absent; do not replace it with a seed or Clean.
2. Otherwise read available project instructions (`AGENTS.md`, `CLAUDE.md`, README, docs) for positioning, visual direction, anti-references, and design principles. Treat usable guidance as binding brand context, including named fonts, palette roles, logo/mark rules, density/register, and anti-references, not optional mood. Follow referenced tokens, stylesheets, logo components, and guidelines before approximating from prose. Named fonts and palette roles override Clean's values; anti-references rule out the corresponding fallback register. Clean supplies the semantic token surface, not its fonts, monochrome palette, or warm/cream defaults.
3. Only with no usable visual direction, run `node $SKILL_DIR/scripts/palette.mjs --from "<topic-or-project-name>"`. Compose temporary primary, background, foreground, accent, chart, and state tokens from the seed and brief, using its `derived` contrast numbers, chroma budgets, and light/dark ladders. Do not estimate those values or copy Clean unchanged. If the seed fights the brief, re-run with `--not <zone,...>` or `--vary <n>` and note the veto in the shape gate. Validate composed tokens with `node $SKILL_DIR/scripts/palette.mjs --check <tokens-or-html> --strict`; fix errors (exit 2) before render.

Nudge `/visualize teach` once per session when using fallback context.

**Refine verbs on missing persisted brand files:** `simplify` / `bolder` / `quieter` / `animate` / `polish` use the same fallback hierarchy as creation. Project instructions, README/docs, or other already-loaded context can be a valid qualitative brand anchor. Clean defaults are only the anchor when no usable project guidance exists. Whenever a fallback source is used, mention that source once and nudge `/visualize teach` so the fallback can become a real brand profile.

**Refine verbs on artifacts that carry ≥3 Absolute bans:** `bolder` / `quieter` / `animate` / `polish` refuse and route. State in the run summary: `"REFUSED — N Absolute bans present (listed). The artifact needs structural cleanup before <verb> applies. Recommend /visualize simplify <path> first (removes the ban patterns), then re-evaluate."` Simplify accepts ban-carrying input as its core case; the other Refine verbs assume a clean baseline and must not run on ban-heavy artifacts.

## Artifact themes

A theme is a reference design system applied to one artifact, not a new stored object or a project-wide adoption. Default to the project system; resolve binding choices, approved exceptions, and open dimensions before borrowing. A named reference or request for more expression does not silently override binding choices. Clarify unresolved conflicts; explicit replacement permission covers only the named artifact and dimensions. Do not invent constraints where the project is silent.

Resolve the selected package through Brand profile's catalog procedure. Read its returned `README.md` when present, then `DESIGN.md` and `tokens.css`. DESIGN owns suitability, identity, and adaptation. Previews illustrate treatment, not required layouts. When the user wants alternatives, offer a small relevant shortlist; do not load the whole catalog. A missing README does not make a package unavailable.

Apply a treatment through creation or revision; compare unresolved treatments through `explore artifact`. Neither requires a new layout or project profile. Derive new structure from source and reader task. Preserve existing content, order, assets, and behavior unless changes were requested. Broad restyling uses `reference/create.md` with that scope rather than exceeding a refine verb's diff guard. Existing approval gates apply; an explicit request covering the proposed changes needs no reconfirmation.

Translate hierarchy, spacing, surfaces, and component treatment alongside palette and type. Preserve non-overridden project choices. Embed resolved tokens with light, explicit-dark, and OS-dark behavior in the artifact; do not replace the project's token source. Verify against the resolved artifact context, not overridden values. Describe partial borrowing and retained constraints accurately. Record approved exceptions and scope in existing task notes or a short artifact comment for later refinement; unexplained drift is not approval.

Project-wide capture or derivation uses `teach`; comparing new or explicitly requested replacement systems uses `explore system`. Neither is a prerequisite for artifact themes.

## Universal laws

Apply on every command, every template, every prompt. These override contextual taste findings, not non-contextual correctness constraints:

1. **Resolved context and voice trump contextual taste rules.** A finding that merely conflicts with the approved register is a category error. Context cannot suppress an unskipped Absolute ban, an artifact fossil or placeholder, an accessibility requirement, or an honesty/data-truth failure. Permission to refine an artifact does not authorize changes to the project's brand profile or shared token source. Propose necessary changes to those authorities separately unless the user has already authorized them.
2. **Commands interpret, not regenerate.** Iteration commands return a targeted diff, not a fresh draft. If the diff is >40% of the artifact, the command has misfired.
3. **Ship-blockers and taste-calls are different.** A11y and contrast must be fixed; taste-calls are negotiable.
4. **Severity follows context, including aggregate.** An `info` rule can ship-block in aggregate; an `error` rule can be a taste-call only when it is context-sensitive and the brand whitelists it. The non-contextual constraints in law 1 do not demote.
5. **Don't strip-mine into invisibility.** After a command runs, the artifact should still feel anchored to the resolved context.
6. **The reader is the judge.** Every finding maps to: does this make the reader's job harder, or just satisfy a rule?
7. **Detector output is defect-evidence, never done-evidence.** A clean `detect.mjs` result is not proof the artifact is strong — it's proof the mechanical floor passes. The detector catches what regex can identify; verb work covers everything else. Don't declare done on a clean detector reading.
8. **Rendered mobile beats desktop theory.** A desktop-strong composition that merely stacks on phone can still be worse than a plain document. Judge the first two mobile screens as a finished reading state: heading scale, metadata wraps, TOC placement, card chrome, and body rhythm all have to feel intentional at narrow width.
9. **Metadata should explain itself.** Bare chips such as `display.dev strategy` or `Updated May 29, 2026` force the reader to infer the field. Prefer explicit labels: `Memo type / display.dev strategy`, `Updated / May 29, 2026`, `Input / method, vision, competitor refresh`. Place labelled context according to [create.md's document-context guidance](reference/create.md); not every metadata field belongs in the opening.
10. **Clean is not enough.** Mechanical correctness and visual polish do not establish comprehension. A visual artifact needs deliberate composition that helps the reader understand its source. Assess substantial explanations beyond the first viewport as well as the opening; follow the [Specificity and comprehension pass](reference/create.md#specificity-and-comprehension-pass). A familiar arrangement is valid when it serves the reader; change structure to correct a demonstrated deficiency, not merely to avoid a common layout.
