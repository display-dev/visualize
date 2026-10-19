# Explore comparison harness

Shared construction and verification for Artifact Explore and System Explore. Read this only after the owning mode has resolved and approved the comparison. The owning mode determines what may vary, how candidates are described, what selection means, and whether a later apply or adoption step is available.

## Optional isolated builders

When host-native subagents are callable and permitted, the active agent may assign one candidate to each fresh-context subagent. Give every subagent the same approved brief and inputs, one candidate's scope, and one temporary exclusive output path. Do not show it sibling candidates. Resolve shared imagery before delegation.

Subagent outputs are disposable construction inputs, not a package. The active agent remains coordinator and assembles the final HTML. When subagents are unavailable, create isolated serial passes without reducing the approved candidate count.

## Build one comparison artifact

Write one self-contained HTML file:

- Put clearly labeled review controls outside the candidate surface.
- Mount every candidate in the same DOM under its own stable root, such as `[data-candidate="briefing-rail"]`.
- Scope each candidate's CSS and resolved light/dark tokens to its root; reference package `:root` rules must not leak into other candidates. Keep harness styles and genuinely shared tokens coordinator-owned.
- Prefix IDs and their `for`, `aria-*`, and fragment references by candidate. Keep behavior coordinator-owned or scoped to the candidate root so hidden candidates cannot capture another candidate's interaction.
- After enhancement, show one candidate at a time and expose selection with `aria-pressed`. Without JavaScript, leave every labeled candidate readable in source order.
- Switch `Wide` and `Phone` by changing the review frame's width only. Candidate responsive rules must react to that frame width through container queries or equivalent frame-state selectors; browser-viewport media queries alone cannot implement the picker states. Phone is 390 CSS pixels. Never assign a fixed candidate height: the frame grows with the full document and the outer page scrolls normally.
- Store candidate and viewport state in the query string. Copy state and reset must reproduce the visible review state. Include any additional mode-owned review state in the same contract.
- Keep proposed destination actions inert in review mode and make their review-only behavior clear. Preserve real destinations in the approved brief for the owning mode's later workflow.
- Inline approved assets. Do not depend on sibling HTML, JSON, stylesheet, image, manifest, evidence, or selection files.

The comparison must be publishable as one ordinary display.dev HTML artifact. Do not use candidate iframes or a directory-backed package.

## Verify the comparison

Exercise every candidate at the viewports, themes, and interaction states required by the owning mode. Check:

- fixed product truth, content, actions, states, constraints, and approved assets remain consistent wherever the brief holds them fixed;
- every candidate answers the resolved question within the dimensions its mode permits to vary;
- switching between `Wide` and `Phone` changes the computed candidate layout, not only the outer frame, for every candidate without clipping or horizontal overflow;
- full documents remain visible through ordinary page scrolling;
- review controls remain separate and usable;
- no unexpected console error or horizontal overflow occurs; and
- `detect.mjs` finds no unaddressed blocker in the final HTML.

Capture and inspect screenshots or contact sheets sufficient to judge hierarchy, reading order, clipping, responsive behavior, and the stated trade-offs. Keep this evidence disposable and separate from runtime dependencies. If required rendered inspection cannot be completed, report the comparison as unverified rather than recommending a candidate.

Before presenting, compare the rendered candidates against the question this round is intended to answer. If two no longer provide meaningfully different answers within the mode's allowed dimensions, cut or rebuild one; do not pad the approved count with converged candidates. The owning mode controls the presentation fields, selection stop, synthesis rules, and any later mutation.
