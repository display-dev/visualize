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
- the open question, one primary comparison axis for this round, and the structural or visual qualities allowed to vary as consequences of that axis;
- about three directions unless the user asks for another useful count;
- wide and fixed 390 px review contexts; and
- imagery as `none`, `optional`, `supplied`, or `essential`.

The target and authority files stay unchanged during exploration. The default output is one `<slug>-explore.html` beside the target or in the approved output directory.

Preserve the approved brief in the artifact's clearly separated review context or existing task notes. Focused follow-ups preserve settled choices, prior rounds, and an unchanged comparison control when useful; they do not restart the full spread.

When generated imagery is approved, read `image-generation.md`, use one released route, and inspect the result before building directions. Factual assets stay fixed; expressive imagery may vary only when that dimension is open in the brief. Do not add an Explore-specific image sidecar or provenance format.

## 3. Define the spread

Choose one primary axis for the round, such as hierarchy, density, reading order, grouping, navigation, palette, or typography. Give every direction a different named position on that axis. Secondary choices may follow when they make the position coherent, but do not vary independently: changing every dimension at once produces attractive but unattributable results, while cosmetic-only alternatives teach nothing about a structural question.

Before construction, name each direction, its axis position, design bet, when it is the right choice, its cost, what it changes, what stays fixed, and its 390 px behavior. Judge meaningful difference against the open question: structural alternatives must differ structurally; palette or type alternatives may use the same layout. A reference name is an input, not evidence of a meaningful difference on this artifact. If two proposed directions occupy the same position or differ only in labels, tint, or incidental decoration, merge them or replace one before writing code.

Keep product truth, facts, actions, accessibility outcomes, and every non-open dimension fixed. Depending on the brief, vary reading order, hierarchy, density, grouping, navigation, responsive composition, palette, typography, surfaces, or component treatment. Use the shared color and typography references when exploring those dimensions, not a mandatory sequence of exploration stages.

## 4. Build and verify one review artifact

Read and follow [the shared comparison harness](explore-comparison-harness.md). It owns isolated builders, one-file construction, review controls and state, candidate isolation, rendered checks, and the mode-neutral convergence test. Artifact Explore still owns the single-axis spread and the decision that follows.

For this mode, exercise every direction at the approved wide and 390 px contexts in light and dark; verify the OS-dark path and explicit theme overrides too. The artifact brief determines any additional interaction states. A direction must preserve binding project choices plus approved artifact overrides and differ meaningfully on its named axis.

## 5. Present and stop

Present each surviving direction as `Direction / Axis position / Right when / Cost` and stop for user input. Do not mark a favorite unless the user asks. The user may select, shortlist, reject all and revise the brief, or request a named synthesis. Synthesis is another Artifact Explore round with its own primary axis and selection stop.

Record the selected direction and its rationale alongside the brief. If later feedback invalidates that choice, preserve the earlier rationale and state what changed before proposing another round.

## 6. Apply only after explicit selection

After the user selects and asks to apply, implement the chosen structure and/or visual treatment through the ordinary create/refine workflow, including approved artifact exceptions. A preference for one trait is not approval to apply the whole direction. Keep alternate directions and review controls out of the target. Preserve source truth, real actions, assets, accessibility, and the resolved artifact context, then verify the target at the same viewport and theme contexts.

If the target or authority changed during review, stop and reconcile the current source before applying. No manifest, evidence lock, fingerprint, or selection-contract file is required.
