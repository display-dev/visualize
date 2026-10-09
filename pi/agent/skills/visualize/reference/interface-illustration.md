# Interface illustrations

Apply SKILL.md's shared scope and design judgment. This reference owns depictions of an interface inside an artifact, not the artifact's navigation or calls to action.

## Communicate one interaction or state

Show the specific interaction or state the reader needs to understand through a recognizable actor, attention state, result, and next action. Use labelled avatars, status cues, work previews, or controls where they clarify those roles; follow [Cognitive offloading](cognitive-load.md#cognitive-offloading). Retain surrounding chrome only when it explains the relationship. Reveal supporting controls at the stage where they matter; optional inspection or intervention should look optional rather than required.

A static selected state, or a small sequence of states, can explain the interaction without a simulation. Use interaction when experiencing the transition adds understanding. Keep depicted controls distinct from real artifact controls. A prior-art screenshot is evidence of the source interface, not an invitation to redesign it.

Use `data-visualize-diagram` only for actual relationship figures; those follow [diagram.md](diagram.md). This contract does not permit crude scene drawings as substitutes for missing essential imagery; follow [image-generation.md](image-generation.md).

## Accessible depiction and behavior

- **Static illustration:** use a labelled figure with a meaningful caption or text alternative describing its content, state, and important relationships. Fake controls are non-operable and out of the tab order; do not give them button/link semantics. Genuine artifact controls, such as an enlarge action outside the depiction, remain accessible controls.
- **Interactive simulation:** label it as a simulation. Use real, scoped accessible controls, with keyboard operation, visible focus, accessible names, and communicated state. Apply the artifact's interaction checks to these controls.

Review and polish judge depiction fidelity using this contract. Their keyboard, focus, hover, and target-size checks apply to simulations and real artifact controls; they do not require making static mock controls operable.
