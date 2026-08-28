# Artifact Explore

Compare structure, visual treatment, or both for one artifact while preserving source truth and the approved constraints. The result is one ordinary self-contained HTML review artifact. Apply the shared rules in `SKILL.md`, including Artifact themes; this reference owns only the Explore workflow.

## 1. Resolve authority

Read available project `DESIGN.md`, `PRODUCT.md`, and `tokens.css`, then the target or source material, concrete project assets named by project instructions, and explicit user constraints. Resolve missing profile files and reference use through SKILL.md's shared context and Artifact themes guidance.

Identify the open design question. The current system remains the default; distinguish its binding decisions from permitted flexibility and incidental choices in the current artifact. Without a supplied layout, propose a source-led structure. A focused color or typography comparison can keep that structure fixed; layout exploration can vary it. Neither creates project authority.

For an existing artifact, understand its content, assets, actions, states, accessibility requirements, and responsive behavior well enough to name what must survive. If the artifact's behavior cannot be reproduced safely in a self-contained comparison, explain the limitation before proposing directions rather than silently flattening it.

## 2. Approve one brief

For initial exploration, show a compact brief and wait for approval before HTML or image generation, unless the user supplied an already approved brief. For revisions, apply SKILL.md's Design judgment; an explicit follow-up authorizes the changes it names without another approval exchange. Include:

- reader and decision;
- target or proposed output and source material;
- current visual authority and any explicit artifact-only overrides;
- content, facts, quotations, citations, actions, states, accessibility outcomes, and assets that stay fixed;
- the open question and structural or visual qualities allowed to vary;
- about three directions unless the user asks for another useful count;
- wide and fixed 390 px review contexts; and
- imagery as `none`, `optional`, `supplied`, or `essential`.

The target and authority files stay unchanged during exploration. The default output is one `<slug>-explore.html` beside the target or in the approved output directory.

Preserve the approved brief in the artifact's clearly separated review context or existing task notes. Focused follow-ups preserve settled choices, prior rounds, and an unchanged comparison control when useful; they do not restart the full spread.

When generated imagery is approved, read `image-generation.md`, use one released route, and inspect the result before building directions. Factual assets stay fixed; expressive imagery may vary only when that dimension is open in the brief. Do not add an Explore-specific image sidecar or provenance format.

## 3. Define the spread

Before construction, name each direction's design bet, what it changes, what stays fixed, and its 390 px behavior. Judge meaningful difference against the open question: structural alternatives must differ structurally; palette or type alternatives may use the same layout. A reference name is an input, not evidence of a meaningful difference on this artifact.

Keep product truth, facts, actions, accessibility outcomes, and every non-open dimension fixed. Depending on the brief, vary reading order, hierarchy, density, grouping, navigation, responsive composition, palette, typography, surfaces, or component treatment. Use the shared color and typography references when exploring those dimensions, not a mandatory sequence of exploration stages.

### Optional subagents

When host-native subagents are callable and permitted, the active agent may assign one direction to each fresh-context subagent. Give every subagent the same approved brief and inputs, one direction's scope, and one temporary exclusive output path. Do not show it another direction. Shared imagery is already resolved.

Subagent outputs are disposable construction inputs, not a package. The active agent remains coordinator and assembles the final HTML. When subagents are unavailable, create isolated serial passes without reducing the approved direction count.

## 4. Build one review artifact

Write one self-contained HTML file. Follow the proven prototype harness behavior:

- Put clearly labeled review controls outside the candidate surface.
- Mount every direction in the same DOM under its own stable root, such as `[data-direction="briefing-rail"]`.
- Scope each direction's CSS and resolved light/dark tokens to its root; reference package `:root` rules must not leak into other candidates. Keep harness styles and genuinely shared tokens coordinator-owned.
- Prefix IDs and their `for`, `aria-*`, and fragment references by direction. Keep behavior coordinator-owned or scoped to the direction root so hidden candidates cannot capture another direction's interaction.
- After enhancement, show one direction at a time and expose selection with `aria-pressed`. Without JavaScript, leave every labeled direction readable in source order.
- Switch `Wide` and `Phone` by changing the review frame's width only. Phone is 390 CSS pixels. Never assign a fixed candidate height: the frame grows with the full document and the outer page scrolls normally.
- Store direction and viewport state in the query string. Copy state and reset must reproduce the visible review state.
- Keep proposed destination actions inert in review mode and make their review-only behavior clear. Preserve real destinations in the source brief for later apply.
- Inline approved assets. Do not depend on sibling HTML, JSON, stylesheet, image, manifest, evidence, or selection files.

The review artifact must be publishable as one ordinary display.dev HTML artifact. Do not use candidate iframes or a directory-backed package.

## 5. Verify and stop

Exercise every direction at wide and 390 px. Check:

- all fixed content, actions, states, and approved assets are represented consistently;
- the directions answer the open question and honor binding project choices plus approved artifact overrides;
- full documents are visible through ordinary page scrolling;
- review controls remain separate and usable;
- no unexpected console error or horizontal overflow occurs; and
- `detect.mjs` finds no unaddressed blocker in the final HTML.

Render every direction in the approved wide and 390 px contexts, in light and dark; verify the OS-dark path and explicit theme overrides too. Capture and inspect screenshots or contact sheets sufficient to judge hierarchy, reading order, clipping, and the stated tradeoffs. Keep this evidence disposable and separate from runtime dependencies. If rendered inspection cannot be completed, report the comparison as unverified rather than recommending a winner.

Present each direction's design bet and main trade-off, then stop for user input. The user may select, shortlist, reject all and revise the brief, or request a named synthesis. Synthesis is another round with its own selection stop.

Record the selected direction and its rationale alongside the brief. If later feedback invalidates that choice, preserve the earlier rationale and state what changed before proposing another round.

## 6. Apply only after explicit selection

After the user selects and asks to apply, implement the chosen structure and/or visual treatment through the ordinary create/refine workflow, including approved artifact exceptions. A preference for one trait is not approval to apply the whole direction. Keep alternate directions and review controls out of the target. Preserve source truth, real actions, assets, accessibility, and the resolved artifact context, then verify the target at the same viewport and theme contexts.

If the target or authority changed during review, stop and reconcile the current source before applying. No manifest, evidence lock, fingerprint, or selection-contract file is required.
