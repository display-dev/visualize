# Artifact Explore

Compare materially different responsive structures for one document while its current visual world and source truth stay fixed. The result is one ordinary self-contained HTML review artifact. Apply the shared rules in `SKILL.md`; this reference owns only the Explore workflow.

## 1. Resolve authority

Read project `DESIGN.md`, `PRODUCT.md`, and `tokens.css`, then the target or source material, concrete project assets named by project instructions, and explicit user constraints.

Artifact Explore requires an existing visual world. If an incumbent is visible but uncaptured, offer `teach` and stop. If no authority exists, explain that creating a system belongs to System Explore and stop. Never browse the design-system catalog, borrow a reference system, use Clean defaults, or call `palette.mjs` for Artifact Explore.

For an existing artifact, understand its content, assets, actions, states, accessibility requirements, and responsive behavior well enough to name what must survive. If the artifact's behavior cannot be reproduced safely in a self-contained comparison, explain the limitation before proposing directions rather than silently flattening it.

## 2. Approve one brief

For initial exploration, show a compact brief and wait for approval before HTML or image generation. For revisions, apply SKILL.md's Design judgment; material changes to the comparison require approval of the revised brief. Include:

- reader and decision;
- target or proposed output and source material;
- current visual authority;
- content, facts, quotations, citations, actions, states, accessibility outcomes, and assets that stay fixed;
- structural qualities allowed to vary;
- about three directions unless the user asks for another useful count;
- wide and fixed 390 px review contexts; and
- imagery as `none`, `optional`, `supplied`, or `essential`.

The target and authority files stay unchanged during exploration. The default output is one `<slug>-explore.html` beside the target or in the approved output directory.

Preserve the approved brief in the artifact's clearly separated review context or existing task notes.

When a shared generated image is needed, read `image-generation.md`, use one released route, and inspect the result before building directions. Give every direction the same approved assets. Do not add an Explore-specific image sidecar or provenance format.

## 3. Define the spread

Before construction, name each direction's dominant layout grammar, first-screen hierarchy, meaningful structural differences, and 390 px behavior. Directions must disagree about structure rather than palette or decoration.

Keep fixed: product truth, copy quality, facts, actions, accessibility outcomes, visual authority, global tokens, component character, imagery stance, and approved asset set. Directions may vary topology, reading order, hierarchy, density, grouping, navigation framing, progressive disclosure, asset treatment, and responsive composition.

### Optional subagents

When host-native subagents are callable and permitted, the active agent may assign one direction to each fresh-context subagent. Give every subagent the same approved brief and inputs, one structural contract, and one temporary exclusive output path. Do not show it another direction. Shared imagery is already resolved.

Subagent outputs are disposable construction inputs, not a package. The active agent remains coordinator and assembles the final HTML. When subagents are unavailable, create isolated serial passes without reducing the approved direction count.

## 4. Build one review artifact

Write one self-contained HTML file. Follow the proven prototype harness behavior:

- Put clearly labeled review controls outside the candidate surface.
- Mount every direction in the same DOM under its own stable root, such as `[data-direction="briefing-rail"]`.
- Scope each direction's CSS to its root. Keep shared tokens and harness styles coordinator-owned.
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
- the directions are materially different and faithful to the current visual world;
- full documents are visible through ordinary page scrolling;
- review controls remain separate and usable;
- no unexpected console error or horizontal overflow occurs; and
- `detect.mjs` finds no unaddressed blocker in the final HTML.

Render every direction in the approved wide and 390 px contexts. Capture and inspect screenshots or contact sheets sufficient to judge hierarchy, reading order, clipping, and the stated tradeoffs. Keep this evidence disposable and separate from runtime dependencies. If rendered inspection cannot be completed, report the comparison as unverified rather than recommending a winner.

Present each direction's structural bet and main trade-off, then stop for user input. The user may select, shortlist, reject all and revise the brief, or request a named synthesis. Synthesis is another round with its own selection stop.

Record the selected direction and its rationale alongside the brief. If later feedback invalidates that choice, preserve the earlier rationale and state what changed before proposing another round.

## 6. Apply only after explicit selection

After the user selects and asks to apply, implement the chosen topology and responsive behavior through the ordinary create/refine workflow. Keep alternate directions and review controls out of the target. Preserve source truth, real actions, assets, accessibility, and design authority, then verify the target at the same wide and 390 px contexts.

If the target or authority changed during review, stop and reconcile the current source before applying. No manifest, evidence lock, fingerprint, or selection-contract file is required.
