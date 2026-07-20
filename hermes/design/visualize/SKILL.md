---
name: visualize
version: 0.1.0
license: MIT
user-invocable: true
argument-hint: "[teach | simplify | bolder | quieter | animate | polish | review | publish] [<topic-or-path>]"
allowed-tools:
  - Bash(node $SKILL_DIR/scripts/detect.mjs*)
  - Bash(node $SKILL_DIR/scripts/browser-contrast.mjs*)
  - Bash(node $SKILL_DIR/scripts/palette.mjs*)
  - Bash(node $SKILL_DIR/scripts/teach.mjs*)
  - Bash(bash $SKILL_DIR/scripts/publish.sh*)
  - Bash($SKILL_DIR/scripts/publish.sh*)
  - Bash(node */visualize/scripts/detect.mjs*)
  - Bash(node */visualize/scripts/browser-contrast.mjs*)
  - Bash(node */visualize/scripts/palette.mjs*)
  - Bash(node */visualize/scripts/teach.mjs*)
  - Bash(bash */visualize/scripts/publish.sh*)
  - Bash(*/visualize/scripts/publish.sh*)
description: >
  Generate beautiful, on-brand HTML artifacts — reports, diagrams, diff
  reviews, slide decks, plans, recaps, dashboards. Loads on creation
  intents ("create a plan", "make me an implementation plan",
  "generate a diagram", "build a slide deck", "draft a recap",
  "visualize this", "render this as HTML", "make me a status update")
  and iteration intents ("make this beautiful", "polish this report",
  "make this less generic", "design this", "theme this", "use my
  brand", "iterate on this design", "review this artifact", "make
  this bolder", "make this quieter", "simplify this design",
  "animate this", "improve the look of", "give this a refresh").
  Captures brand from the user's codebase, asking, or live site, then
  applies it to every artifact.
---

# visualize — beautiful, on-brand HTML artifacts

Generate self-contained HTML artifacts composed from `templates/*/template.md` contracts against brand tokens from the project's `DESIGN.md` + sidecar `tokens.css` (or a one-run greenfield seed when no `DESIGN.md` is present). The agent reads `DESIGN.md` + `PRODUCT.md` from the project root so every artifact reads as the same brand. Shared pattern recipes live in `patterns/` and are read only when the selected template and user ask make them relevant; shell mechanics are loaded automatically only when a template declares `shell: <slug>`.

## Design judgment

Find the artifact's organizing idea before choosing its visual treatment. Look for a relationship, contrast, sequence, decision, or object in the source that the composition itself can make easier to understand. Use that idea to shape the opening, section rhythm, and any explanatory primitive. When the source has no useful spatial or structural idea, prefer a restrained reading experience over manufacturing one.

Artifact mode describes how the reader consumes the information, not the aesthetic family it must use. A document can use product-native, application-like, spatial, editorial, or technical-drawing grammar when that grammar serves the source, reader, and brand. Do not equate `document` with editorial publishing, or `canvas` with diagram chrome.

Visual conviction can come from composition, typography, density, spatial rhythm, imagery, interaction, or color. Do not add hues, decoration, or components merely to make an artifact feel designed. A restrained palette can carry a strong point of view when another dimension does the expressive work.

## Commands

`/visualize` invokes the skill. The argument tells the agent what to do.

**Default (no command, or the first argument is a topic):** `/visualize <topic-or-path>` creates a new artifact. The agent picks a template from intent across all of `templates/`, composes against the brand's custom tokens from `DESIGN.md` + sidecar `tokens.css` (or a greenfield seed from `scripts/palette.mjs` when `DESIGN.md` is absent), writes self-contained HTML. **The flow is gated:** preflight checklist + shape-gate before code, no self-authored briefs. See `reference/create.md`.

**Named commands:**

| Category | Command | Argument | What it does | Reference |
|---|---|---|---|---|
| **Build** | `teach` | none | Bootstrap (or refresh) the brand profile. Writes `DESIGN.md` + `PRODUCT.md` at the project root. | `reference/teach.md` |
| **Refine** | `simplify` | `<path>` | Strip decoration that isn't earning its pixel. Hands off to `polish`. | `reference/simplify.md` |
| **Refine** | `bolder` | `<path>` | Amplify visual punch on safe / generic artifacts. Hands off to `polish`. | `reference/bolder.md` |
| **Refine** | `quieter` | `<path>` | Tone down over-decoration without going generic. Hands off to `polish`. | `reference/quieter.md` |
| **Refine** | `animate` | `<path>` | Purposeful motion, `prefers-reduced-motion` compliant. Hands off to `polish`. | `reference/animate.md` |
| **Refine** | `polish` | `<path>` | Terminal quality pass — walks every dimension and reports per-dimension findings. The other Refine verbs hand off to this one. | `reference/polish.md` |
| **Evaluate** | `review` | `<path>` | Deterministic detector findings + LLM judgment. Reports; doesn't modify the file. | `reference/review.md` |
| **Publish** | `publish` | `<path>` | Push the artifact to display.dev via MCP / CLI / HTTP cascade. | `reference/publish.md` |

Invocation forms: `/visualize teach`, `/visualize polish ./report.html`, `/visualize publish ./diagram.html`. On hosts without a slash-command form, the skill loads on intent-match from the description above; natural-language is the primary entry there.

## Routing rules

1. **No argument**: render the Commands table above as the user-facing menu, grouped by category. Ask what they'd like to do.
2. **First word matches a command**: **load its reference file before doing anything else.** Non-negotiable — the table row + this section is insufficient; the procedure lives in the reference. Everything after the command name is the target.
3. **First word doesn't match a command**: treat the whole argument as the topic for the default creation flow. Load `reference/create.md`.

## Hand-off output shape

After a refine verb (`simplify` / `bolder` / `quieter` / `animate`) finishes its run, summarise to the user in plain markdown. Don't render the summary as a fenced code block — it's conversational output, not machine-readable. Vary phrasing across runs; pick wording per context (engineer reading detector output vs. designer iterating on a brand brief). `polish` has its own output shape — see `reference/polish.md`.

Every refine run's summary covers four facts:

- Which verb ran, against which artifact.
- What the verb actually did. Pull the verb-specific content from the per-verb reference's "what to surface" list (focal moment, cuts + audit trail, strategy, what stayed, hero moment, reduced-motion handling — depends on the verb).
- Diff size as a percent of the artifact.
- Which next verb makes sense, if any. Polish is the default next step from a successful refine run.

Variant rules (behaviour, not surface text):

- **Context source note.** If the run cannot use a persisted `DESIGN.md` / `PRODUCT.md`, mention once which fallback source anchored the work: project instructions, README/docs, generated seed, or Clean defaults. Also nudge the user to run `/visualize teach` so that fallback can become a real brand profile. Clean defaults are the last resort after the Brand profile rules below find no usable project guidance.
- **Diff exceeded the 40% guard.** Don't recommend polish — surface the breach and recommend a fresh `/visualize <topic>` creation pass against a brand profile. The verb was the wrong scope for what the artifact needed.
- **Verb shouldn't have run** (Absolute bans present, no decoration to remove, no focal moment, etc.). Skip the standard run summary entirely. Surface a short refusal that names the reason and routes to the right alternative verb. Each per-verb reference's "When `<verb>` is the right verb (and when it isn't)" section enumerates the verb's specific refusal conditions.

Tone is conversational. Lead with what changed, not with a banner. Don't capitalise words for emphasis. Don't print a `<Verb> pass complete ·` header — the summary's content is the proof of completion.

For `animate` specifically: when the brand declares `motion: none`, a fifth variant applies — see `reference/animate.md`.

## Absolute bans

Match-and-refuse. Apply on every command and the default creation flow. These ban specific patterns — not aesthetics, not registers. A brand can declare a font, a hue, or a layout that looks unusual; it cannot redeem any of these patterns by declaring them as identity. If the artifact carrying one of these belongs to a brand that genuinely lives in that aesthetic (rare), the brand has to declare a `.visualize-detect.json` skip — never expect runtime suppression.

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

BAN 5 — Icon-tile section markers
  PATTERN:   Every <h2> preceded by a rounded-square tile carrying a Lucide / Heroicons / Phosphor glyph
  INCLUDES:  Circle-icon variants, icon-on-coloured-pill variants, gradient-icon-tile variants
  WHY:       AI section-marker tell; reads as "every section needs visual chrome"
  REWRITE:   Heading alone, or heading + small accent rule above, or numbered sections — no per-heading iconography

BAN 6 — AI palette token *stack* (purple-cyan / indigo-pink combination)
  PATTERN:   `--primary` in the purple-violet hue band (260–310°) PAIRED WITH `--accent` in cyan-teal (180–210°), OR magenta/pink (320–360°) PAIRED WITH indigo
  INCLUDES:  Single `--gradient` token combining these stops; three-stop gradients spanning purple → pink → cyan
  WHY:       The most-trained-on AI brand palette; the COMBINATION is the slop, not the single hue. A purple-led brand identity is fine; the ban is on the cross-hue stack that mimics every 2024-2026 AI startup template
  REWRITE:   Single-hue brand identity is allowed (Stripe's purple-led palette is legitimate). The ban triggers only on the *combination* — drop the cyan / pink accent, pair the brand's hue with tinted neutrals instead
  CARVE-OUT: A brand whose `DESIGN.md` declares a single primary hue in any of the banned bands is allowed; what's banned is the cross-hue stacking pattern that produces the "AI brand" gestalt

BAN 7 — Imperative tricolon
  PATTERN:   Three short imperative sentences ending in periods, in the same paragraph or hero
  INCLUDES:  "Ship faster. Build smarter. Scale forever." / "Move fast. Stay safe. Be bold." (any topic)
  WHY:       AI-copywriting cliché — the structure is identical across thousands of generated landing pages
  REWRITE:   One specific claim with the verb in the right tense, OR a sentence that names the actor and the action

BAN 8 — Sycophant / AI-attribution footer
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
- **Palette as a substitute for composition:** assign semantic color roles in the shape gate and use them consistently, but do not add accent tracks merely to manufacture visual interest. Neutral surfaces plus one accent are valid when composition, type, density, imagery, or interaction carries the point of view. Revise when the opening has no expressive dimension, not when it has too few hues.

**Gemini-specific guard:**

- Do not animate `<img>` elements on hover. If a card needs hover feedback, animate the card's border, background, or action affordance instead.

**Metadata / TOC guard:** static document context needs explicit labels, not anonymous rounded chips. In document mode, keep metadata close to the title/thesis inside the reading flow; a right rail, split-cover facts column, or standalone metadata panel usually turns context into competing chrome. TOC rails are allowed for genuinely long documents, but they should support navigation rather than dominate the opening. Mobile TOCs must remain navigable lists or deliberate grids, never free-wrapping word clouds. Read `patterns/metadata.md` or `patterns/toc.md` when those structures are part of creation.

**Table guard:** tables are reading instruments, not hero sections. Keep caption, header, body, row-key, and numeric roles distinct; scope monospace to fixed-width values. Read `patterns/table.md` when the artifact carries dense comparison or evidence.

## AI slop test (two altitudes)

Run both. The second catches what the first misses.

**First-order**: if someone could guess the template + palette from the topic alone, you've hit the first training-data reflex. Postmortems aren't red banners. AI essays aren't purple gradients. Fintech artifacts aren't navy-and-gold. ML papers aren't academic two-column. Rework the brand-profile pick and the template composition until the topic doesn't determine the look.

**Second-order**: if someone could guess the aesthetic family from topic-plus-anti-references ("AI workflow tool that's not SaaS-cream → editorial-typographic," "fintech that's not navy-and-gold → terminal-native dark mode"), the second-tier reflex isn't avoided. Currently-saturated families to watch for: editorial-Tufte clone (cream + Georgia + side-margin notes when the topic isn't editorial), brutalist-terminal clone (mono + grid + heavy borders when the topic isn't dev-tool), Swiss-poster clone (uppercase + grotesk + grid when the topic isn't presentation). Rework until both altitudes return "no, you couldn't have guessed."

## Brand profile

Every render reads `DESIGN.md` (visual identity + design tokens) and `PRODUCT.md` (voice, audience, tone) at the project root. `teach` derives custom design tokens for the brand and writes them in `DESIGN.md` as YAML frontmatter (the Google Stitch canonical format: machine-readable tokens) plus a six-section markdown body (Overview / Colors / Typography / Elevation / Components / Do's and Don'ts), with a sidecar `tokens.css` at the project root carrying the CSS-form tokens templates read at render time. No `theme: <name>` field, no menu pick — every brand gets brand-specific tokens.

The design systems under `design-systems/` are **reference token packages** `teach` reads when deriving — calibrated colorimetric + affordance examples across publishing, dev-tool, ops, technical-drawing, and presentation register families. They aren't picked from a menu.

**Fallback when no DESIGN.md exists:** first read available project instructions (`AGENTS.md`, `CLAUDE.md`, README, docs) for product positioning, visual direction, anti-references, and design principles. If those files contain usable brand/design guidance, treat it as binding brand context while using Clean's token **surface** as the structural floor. Explicit cues in repo guidance override Clean values: named fonts become the artifact font stack, named palette roles become the artifact color tokens, and named anti-references rule out the corresponding fallback register. If the guidance points at concrete token files, stylesheet files, logo components, or design guidelines, read those referenced files and use their values before approximating from prose. Using Clean's token surface means keeping the semantic variable shape, not copying Clean's fonts, monochrome values, or warm/cream defaults. Only run `node $SKILL_DIR/scripts/palette.mjs --from "<topic-or-project-name>"` when the project has no usable visual direction at all. When a seed is used, compose the temporary `--primary`, `--background`, `--foreground`, `--accent`, chart, and state tokens from the seed + artifact brief; do not copy Clean's monochrome palette unchanged. Use the script's `derived` block (real contrast numbers, per-hue chroma budgets, light + dark lightness ladders) instead of estimating those values; if the seed's register fights the brief, re-run with `--not <zone,...>` or `--vary <n>` and note the veto in the shape gate. After composing, validate with `node $SKILL_DIR/scripts/palette.mjs --check --strict <tokens-or-html>` and fix error findings (exit 2) before render. Nudge `/visualize teach` once per session so repo guidance or the temporary seed can become a real brand profile.

**Refine verbs on missing persisted brand files:** `simplify` / `bolder` / `quieter` / `animate` / `polish` use the same fallback hierarchy as creation. Project instructions, README/docs, or other already-loaded context can be a valid qualitative brand anchor. Clean defaults are only the anchor when no usable project guidance exists. Whenever a fallback source is used, mention that source once and nudge `/visualize teach` so the fallback can become a real brand profile.

**Refine verbs on artifacts that carry ≥3 Absolute bans:** `bolder` / `quieter` / `animate` / `polish` refuse and route. State in the run summary: `"REFUSED — N Absolute bans present (listed). The artifact needs structural cleanup before <verb> applies. Recommend /visualize simplify <path> first (removes the ban patterns), then re-evaluate."` Simplify accepts ban-carrying input as its core case; the other Refine verbs assume a clean baseline and must not run on ban-heavy artifacts.

## Universal laws

Apply on every command, every template, every prompt. These override any single-rule finding:

1. **Resolved context and voice trump rule.** A detector finding that contradicts the resolved context is a category error.
2. **Commands interpret, not regenerate.** Iteration commands return a targeted diff, not a fresh draft. If the diff is >40% of the artifact, the command has misfired.
3. **Ship-blockers and taste-calls are different.** A11y and contrast must be fixed; taste-calls are negotiable.
4. **Severity follows context, including aggregate.** An `info` rule can ship-block in aggregate; an `error` rule can be a taste-call if the brand whitelists it.
5. **Don't strip-mine into invisibility.** After a command runs, the artifact should still feel anchored to the resolved context.
6. **The reader is the judge.** Every finding maps to: does this make the reader's job harder, or just satisfy a rule?
7. **Detector output is defect-evidence, never done-evidence.** A clean `detect.mjs` result is not proof the artifact is strong — it's proof the mechanical floor passes. The detector catches what regex can identify; verb work covers everything else. Don't declare done on a clean detector reading.
8. **Rendered mobile beats desktop theory.** A desktop-strong composition that merely stacks on phone can still be worse than a plain document. Judge the first two mobile screens as a finished reading state: heading scale, metadata wraps, TOC placement, card chrome, and body rhythm all have to feel intentional at narrow width.
9. **Metadata should explain itself.** Bare chips such as `display.dev strategy` or `Updated May 29, 2026` force the reader to infer the field. Prefer explicit labels: `Memo type / display.dev strategy`, `Updated / May 29, 2026`, `Input / method, vision, competitor refresh`. For document artifacts, those labels belong near the opening argument, not in a side rail that competes with the body.
10. **Clean is not enough.** An artifact can pass every ban, detector rule, and mobile check and still fail because it has no visual point of view. Boring-but-clean is a failure when the user asked for a visual artifact. The output needs at least one deliberate composition choice that helps the reader understand the content faster or remember it longer. If the strongest honest description of the first viewport is only "clean," "polished," "on-brand," or "easy to read," the composition is unfinished; its strongest quality should describe what this specific artifact helps the reader see.
