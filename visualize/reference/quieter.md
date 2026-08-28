# `quieter` — tone down over-decoration without going generic

Before following the instructions below, apply the shared rules in SKILL.md.

`{{command_prefix}}visualize quieter <path>` reduces visual intensity in artifacts that read as loud, over-decorated, or over-saturated — without removing the brand's character. Hands off to `polish` at the end.

Refine; don't desaturate-to-default. Brand voice survives the cuts; what doesn't survive is chrome the brand never asked for. Don't end up with a Notion-template artifact — subtlety needs precision, not erasure.

## Before you start

1. **Read the artifact.** Catalogue intensity sources: high-saturation colors, dramatic scale jumps, heavy weights, decorative motion, multiple competing accents.
2. **Name the target intensity.** Use the resolved context to decide whether quieter means refinement, desaturation, lower contrast, or fewer competing accents.

## When quieter is the right verb (and when it isn't)

Quieter operates on an artifact that's *over-amplified within a working brand* — too much saturation, too much weight contrast, too much decoration. Use quieter when:

- The resolved context declares a restrained or moderate aesthetic and the artifact has drifted louder than that.
- Intensity is the dominant problem; the artifact's structure is otherwise sound.
- Visual hierarchy is fighting itself — multiple elements competing to be the loudest.

Refuse and route when:

- The artifact carries ≥3 Absolute bans. Quieter cannot tone down a banned pattern — the bans are structural, not intensity-based. Recommend `{{command_prefix}}visualize simplify` first.
- The artifact is structurally wrong (BAN-shaped) rather than intensity-wrong. Look at the symptom: if multiple elements all need to be made smaller / paler / lighter, quieter applies. If multiple elements need to be *removed entirely*, simplify applies.

## Plan the refinement

Pick a primary strategy. Three shapes (a run can combine them, but declare one as primary):

- **Saturation pullback**: brand colors drop from full-saturation to 70–85% of their declared chroma. Surface backgrounds shift from full color to a tinted neutral.
- **Weight reduction**: 900-weight headings → 700; 700-weight subheads → 600; body 500 → 400. Hierarchy stays, weight contrast tightens.
- **Decoration removal**: shadows / glows / gradients / multiple borders → simpler chrome. (Overlaps with `simplify`, but quieter keeps the elements and tones them; simplify removes them.)

State the strategy in the run summary. "Quieter without intent" collapses to generic.

## Execute systematically

### Color
Consult [color.md](color.md).

- Drop `--primary` chroma to 70–85% of its current value. Stay in OKLCH; preserve the hue.
- Replace pure `#000` / `#fff` poles with warm-tinted equivalents (cream-near-white, ink-near-black).
- Reduce accent variety. Five hues → primary + one accent.
- Tint neutrals toward the brand hue (chroma 0.005–0.01). Pure gray reads as cold; tinted gray reads as designed.
- Never gray text on colored background. If you find gray-on-color in the existing artifact, swap to a darker shade of the background's hue or use transparency.

### Typography
Consult [typography.md](typography.md).

- Pull display-heading sizes back toward the scale. A 144px h1 → 56px display step. (Unless the brand is presentation register.)
- Reduce weight contrast where it's noisy: 900 + 200 → 700 + 400. Hierarchy through scale + space, not just weight.
- Drop italics on chrome (subheads, captions, labels). Italics for emphasis-in-running-text only.

### Spatial
Consult [spatial.md](spatial.md).

- Increase breathing room: comfortable register if currently compact-with-decoration. The eye needs space, not chrome.
- Even out spacing variations: rogue 73px gaps → snap to the scale.
- Drop hero-padding bloat on non-presentation registers (240px top → comfortable).

### Motion
Consult [motion.md](motion.md).

- Shorten enter durations: 600ms → 300–400ms.
- Drop stagger choreography to a single coordinated entrance.
- Remove decorative motion entirely if it isn't conveying state. Quieter motion is invisible motion.

### Decoration

- Drop multi-layer shadows to a single shadow or none.
- Remove glow / text-shadow halos on dark mode (per color.md failure modes).
- Reduce border thickness: 3px → 1px. Or drop borders where surfaces already separate via background.
- Replace gradient backgrounds with flat color in the dominant hue of the gradient.

## NEVER

- Strip the brand to its absence. Universal law 5 — quieter is refinement, not erasure.
- Desaturate to neutral on a brand that's color-led. A `craft` brand's vivid teal isn't loud; it's identity.
- Make everything the same size and weight. Hierarchy still matters.
- Replace a brand decision with a Notion-default. The artifact should read as a *quieter version of this brand*, not as a quieter version of anything.
- Eliminate all motion. Functional motion (state transitions, feedback) stays.
- Re-introduce slop while quieting. The Absolute bans apply.

## Per-template-category notes

- **Slide deck** (`pitch-deck`, `slide-deck`): quieter usually means pulling 2–3 over-amplified slides back to the supporting register, not toning down every slide uniformly. A pitch deck should still have hero moments.
- **Editorial / publishing** (`whitepaper`, `case-study`, `research-brief`, brand register `editorial` or `craft`): quieter is mostly about color and decoration; don't reduce typographic hierarchy or footnote chrome — that's the register working as designed.
- **Marketing / landing-ish artifacts** (`one-pager`, `release-announcement`, `pitch-deck`): the most common cause of "too loud" is multiple hero treatments competing. Quieter = pick ONE hero, demote the rest to body register.

## Verify before declaring done

1. **Context still recognizable.** Does it still read as the context resolved by SKILL.md?
2. **The eye still lands somewhere.** Quieter should not flatten hierarchy. There's still a focal point; it's just less aggressive.
3. **Re-run the two-altitude AI slop test** from SKILL.md. Did you collapse to Notion-default? Editorial-Tufte clone? Brutalist-terminal clone? Reflex aesthetic → start over.
4. **Scope check.** If quieter touches most of the artifact, stop refinement and apply SKILL.md's Hand-off output shape and Design judgment to recommend the next action.

## Hand off to polish

Per SKILL.md's hand-off output shape: summarise in plain markdown (not fenced) and lead with what changed.

Quieter-specific content to surface:

- **Primary strategy** used: saturation pullback / weight reduction / decoration removal. Mention secondary strategies in a phrase if any were applied.
- **What stayed.** Name the brand element(s) that survived the pass — voice, hero treatment, distinctive token — so the user sees the artifact still reads as *this* brand after the run.
- **Diff size** as a percent of the artifact.
- **Next step.** Polish raises the floor on dimensions quieter didn't touch.

See SKILL.md `Hand-off output shape` for the shared variant rules. Quieter's structural-refusal condition to surface in conversational phrasing:

- **≥3 Absolute bans present.** The artifact is structurally wrong, not intensity-wrong. Quieter can't tone down banned patterns; route to `{{command_prefix}}visualize simplify` first.
