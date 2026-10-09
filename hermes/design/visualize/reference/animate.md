# `animate` — purposeful motion, `prefers-reduced-motion` compliant

Before following the instructions below, apply the shared rules in SKILL.md.

`/visualize animate <path>` covers all motion in the artifact — both adding motion where the artifact is jarring or lifeless, and removing or fixing motion that violates the doctrine (bounce easing, missing `prefers-reduced-motion`, scroll-jacking, parallax-as-decoration). Hands off to `polish` at the end.

A hero moment is optional. Reserve it for an infrequent focal event that benefits from emphasis; feedback and state transitions can be the whole successful pass. Don't stagger everything — every-list-with-50ms-delays adds perceived load and reads as decoration.

## Before you start

1. **Read the artifact.** Where would motion *clarify* something — a state change, an arrival, an emphasis moment? Where is the artifact currently jarring (instant state flips with no perceived feedback)?
2. **Read [motion.md](motion.md) end-to-end.** Native-platform-first doctrine, two canonical easing curves, duration ranges, `prefers-reduced-motion` shape. Don't author bespoke curves or new durations.
3. **Translate the user's ask into motion vocabulary.** If the user asks in plain language ("make it smoother", "items one by one", "show where this came from", "make it feel clickable"), use [animation-patterns.md](../design-systems/animation-patterns.md) § User intent mapping to name 1-2 candidate patterns and their tradeoffs before editing.
4. **Name any motion constraint from the resolved context.** If the context declares no motion, removal-only mode applies.
5. **Load state semantics only when needed.** When editing feedback on functional controls, read the [interactive-state recipe](../patterns/interactive-states.md). It owns what users must perceive and how controls remain understandable without motion; Animate owns only whether and how that state change moves.

## When animate is the right verb (and when it isn't)

Animate is the right verb when motion would *clarify* or the artifact's existing motion is broken. Use animate when:

- The artifact has instant state changes that feel abrupt (show / hide, route changes, form submits).
- The artifact has existing motion that violates the doctrine (bounce easing, missing `prefers-reduced-motion`, parallax, scroll-jacking).
- A hero element would land harder with a measured entrance.

Special mode (not a refusal): when the resolved context declares `motion: none`, animate runs in removal-only mode — strip every keyframe / `transition:` / `animation:` declaration, then end. The motion-budget / hero-moment sections below do NOT apply; use the no-motion completion variant in the hand-off section. This is a valid successful run, not a refusal.

Refuse and route when:

- The artifact carries ≥3 Absolute bans. Motion on ban-shaped elements doesn't fix the shape. Recommend `/visualize simplify` first.
- No interactive elements exist AND the artifact is static one-shot HTML AND there's no jarring transition to smooth. Animate has nothing to do — recommend `/visualize polish` or surface that no motion is warranted.

## Gate each motion choice

Run candidate motion through these questions in order before choosing a primitive or duration:

1. **Frequency.** Known high-frequency command paths stay instant. Establish frequency from measured usage, documented workflow, the user's brief, or the interaction's role; when it is inferred from role rather than measured, say so. Measured use around 100+ times per day is strong calibration evidence, not a count to invent or a universal threshold. Ordinary keyboard activation of an accessible control such as a button or tab is not itself a disqualifier. Repeated navigation, hover, and data-work interactions get at most a near-imperceptible feedback transition. Standard motion belongs to occasional state changes; expressive motion belongs only to rare or first-time moments.
2. **Purpose.** Name one job: feedback, spatial consistency, state indication, preventing a jarring change, or explanation. Delight is valid only for a rare moment. If no job fits, do not add the motion.
3. **Restraint.** Use the least motion that preserves the job. Keep a static cue after it finishes, and do not create a hero animation merely to satisfy the verb.
4. **Interruption.** Rapid, reversible, or gesture-driven changes must retarget from their current state. Prefer transitions for ordinary state changes; use velocity-preserving motion only when the interaction and resolved context justify it. Do not use restart-from-zero keyframes for toggles, toasts, or repeated actions.
5. **Physicality.** Reject motion that lacks a plausible source, destination, or interruption path. Apply [motion.md's physical-continuity contract](motion.md#physical-continuity) for the mechanics.

Only choices that clear the gate proceed to [motion.md](motion.md) for tool, property, curve, duration, and reduced-motion decisions. Repairing or removing existing bad motion does not need to justify a replacement animation.

The gate decides whether a state cue animates, not whether the interface communicates the state. Every relevant interaction still needs an immediate visible outcome. When motion is rejected, apply the final state without interpolation and omit displacement or transforms that existed only to animate it.

## Plan state and motion coverage

Use at most one hero moment. When one earns its place, state it in the run summary; otherwise state that the pass is feedback, transition, or repair only. Layer supporting motion sparingly, while preserving immediate feedback states even when the animation count is zero.

**Tiebreaker for hero moment**: when multiple eligible elements exist, the headline / hero element / topmost h1 wins. Reader's eye lands there first; supporting elements borrow attention from the hero, not the other way around.

Three coverage layers:

1. **Hero moment** (0–1 element): an optional signature animation. Page-load entrance for the headline, scroll-driven reveal of a key metric, or a coordinated transition between two states. Never add one when the gate says the artifact is better without it.
2. **Feedback-state layer** (every interactive element): communicate each relevant hover, focus, active or selected, busy, and disabled state. The state cue is required; animation is optional. When the gate rejects motion, preserve the final cue and change to it immediately. A control does not need states it cannot enter, and hover-only feedback never substitutes for touch or keyboard feedback.
3. **Transition layer** (state changes): show/hide, expand/collapse, success/error confirmations. Only where the state change would otherwise be jarring.

Don't add a fourth layer. "Delight moments" / "easter eggs" / "decorative ambient motion" are not animate's job — that's a separate creation pass, if at all.

### Page-entrance choreography

When multiple elements animate in at page-load, the orchestration matters more than each individual animation. Three shapes; **default to "none"** for most artifacts.

- **None** (default): no page-load entrance at all. Right for any artifact the reader returns to repeatedly (dashboards, status pages, runbooks, reference docs), and for any product-register surface where the reader is in a task. First-paint motion gets old fast; it's a load-tax on every visit. Per [motion.md](motion.md), decorative load-stagger is a failure mode.
- **Hero-first**: the focal element lands first (300–400ms fade + slide), one supporting element may follow with a 100–150ms delay. Reader's eye locks on the hero, then absorbs context. Right only for one-shot theatrical-lane artifacts (release announcements, pitch deck title slides, manifestos) where one element should dominate the first impression *and* the artifact is read once, not returned to.
- **Ambient-first**: rare. The surrounding chrome appears first (header, section frames at 200ms), then content lands as a single coordinated reveal. Use when the chrome's appearance carries meaning (a status console booting up; a dashboard initializing) — not as decoration on a static report. Same first-paint-tax caveat applies if the reader returns repeatedly.

Don't combine shapes in one artifact — pick one. Don't stagger every element individually (the per-element table covers element-level motion; page-entrance is about the orchestration above it). Cap the total entrance budget at 600ms. **If in doubt, default to none** — animate's job is to *fix* existing motion and add purposeful motion, not to invent a page-entrance where none belongs.

## Execute systematically

See [motion.md](motion.md) for native primitives, easing, durations, and reduced-motion policy. Animate.md doesn't restate any of it.

**One additional orchestration constraint** beyond motion.md's rules: `Content scroll-driven reveal` is one hero reveal per artifact, never decoration on body sections. Motion.md owns the duration row; animate.md owns the per-artifact cap.

## NEVER

Motion failure modes (parallax, bounce on every interaction, decorative spin, missing `prefers-reduced-motion`, scroll-jacking, stagger choreography on every list, animating layout properties, decorative scroll-driven on prose, global `will-change`, animation hiding slow loading) live in [motion.md](motion.md)'s "Failure modes the agent reaches for" block as the canonical taxonomy. Animate adds these verb-specific constraints on top:

- **Stagger choreography on lists with >5 items.** Animate-specific orchestration constraint — motion.md's "stagger on every list" failure mode covers the general case; animate sets the per-artifact threshold at 5.
- **Animate a banned shape.** If the target element is a SKILL.md banned shape, adding motion doesn't fix it. Route to `/visualize simplify` first.
- **Add motion where the resolved context declares `motion: none`.** Removal-only mode applies — context wins, this verb runs as a stripping pass.

## Per-template-category notes

- **Pitch deck** (`pitch-deck`, `slide-deck`): enter transitions per slide (300–400ms, fade + slight slide) and no parallax. Slide decks don't scroll; scroll-driven primitives don't apply.
- **Long-form prose** (`whitepaper`, `report`, `case-study`, `research-brief`): motion is dangerous on reading-heavy artifacts. Reveal animations on body sections compete with reading flow. Limit to one hero moment on the title / hero element.
- **Dashboard** (`dashboard`, `data-explorer`, `status-page`): motion belongs on *data updates* (number ticks, chart re-renders), not on chrome. Don't enter-animate the dashboard frame — users return to it constantly; first-paint motion gets old fast.
- **Diagram** (`diagram`, `architecture-overview`, `org-chart`): scroll-driven reveals can work to introduce a complex diagram piece-by-piece. Use sparingly; static is often clearer.

## Per-element patterns

For interactive surfaces (dashboards, data-explorers, status-pages), first define the non-motion outcome for each relevant feedback state. The table offers transition treatments only after that motion clears the gate. When it does not, preserve the final text, icon, color, shape, position, or focus cue immediately and omit motion-only transforms or displacement. Use these as starting points; tune to the brand. Touch / pointer media-aware adjustments live in [responsive-design.md](responsive-design.md).

| Element | Pattern | Duration / easing |
|---|---|---|
| Button hover | `transform: scale(1.02)` + `--surface` lift one step | 120ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Button press / active | `transform: scale(0.97)` + opacity 0.9 | 80ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Input focus | Border color transition to `--ring` + 2px ring inset | 150ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Input validation (error) | Border to `--destructive` + inline message reveal. Shake is dated and a vestibular trigger — use only if the resolved context explicitly carries playful register, and disable fully under `prefers-reduced-motion`. | 200ms border · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Toggle switch | Thumb `translateX()` + track `background-color` cross-fade | 200ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Checkbox / radio | SVG stroke-dasharray draw + `transform: scale(0.95→1)` | 180ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Accordion / `<details>` | Behind `@supports (interpolate-size: allow-keywords) and selector(::details-content)`: `interpolate-size: allow-keywords` on `:root` + `transition-behavior: allow-discrete` + `overflow: clip` on `details::details-content` for smooth `height: auto` + chevron 180° rotate. Fallback (unsupported readers): instant open / close. | 250ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Tab switch | Indicator `translateX()` + content cross-fade (opacity, no slide) | 200ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Tooltip / popover | `@starting-style` opacity 0 → 1 + 4px slide on the open axis | 150ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Dialog open | `@starting-style` opacity + `transform: scale(0.97→1)` + backdrop fade-in | 220ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Toast / snackbar | Slide-up from below + fade-in; exit through the same edge | 220ms in / 165ms out · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Skeleton loading | Subtle `background-position` shimmer (4s loop, low contrast) | 4s · `linear` |
| Data update (number tick) | `requestAnimationFrame` interpolate displayed number; max 500ms | up to 500ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Chart re-render | Fade out old data (150ms) → fade in new (200ms). No path-morph unless context declares it. | 350ms total · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Copy-to-clipboard | Icon swap (clipboard → check) + brief `background-color` flash on the source element | 180ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Drag handle | `cursor: grab` → `grabbing` on press + `transform: scale(1.02)` on the dragged element + drop-zone outline | 100ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Sortable table header | Arrow icon swap (▲ / ▼) + `background-color` flash on the sort target column | 150ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Table row hover | `background-color` to `--accent` at low alpha + cursor change | 100ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Table row selection | Persistent `background-color` + left-edge accent rule on the selected row | 120ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Filter chip toggle | `background-color` swap + `border-color` swap; no scale (chips snap) | 120ms · `cubic-bezier(0.4, 0, 0.2, 1)` |
| Search result count update | Inline number tick on the result-count label; no full re-render flash | 250ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Empty state appearance | Fade + 8px slide-up on the empty-state illustration / message | 250ms · `cubic-bezier(0.16, 1, 0.3, 1)` |
| Live status pulse | Slow opacity oscillation (0.6 ↔ 1.0) on the status dot for "monitoring" state | 1500ms loop · `cubic-bezier(0.4, 0, 0.6, 1)` |
| Progress / upload | Determinate bar with linear width animation; indeterminate uses platform `<progress>` | width animation matches actual progress · `linear` |
| Drill-down reveal (non-`<details>`) | Behind `@supports (interpolate-size: allow-keywords)`: expanding row using `interpolate-size: allow-keywords` on `height: auto` + content fade-in. Fallback: instant expand. For `<details>`-based accordions see the Accordion row above. | 280ms · `cubic-bezier(0.4, 0, 0.2, 1)` |

**Patterns to skip unless the resolved context explicitly calls for them**: confetti / particle bursts (reads as celebration template), like-button heart-explosion (consumer-app register only), elastic / bounce easing on any of the above (toy register).

**`prefers-reduced-motion` coverage for the table.** Follow [motion.md](motion.md)'s reduced-motion policy. The patterns above use keyframes, `transition:` declarations, AND JS-driven animations (number ticks, chart re-renders), so cover all three surfaces:

```css
@media (prefers-reduced-motion: reduce) {
  /* Name only selectors whose state transitions this pass introduced. */
  .button, .dialog, .toast { transition-duration: 0.01ms !important; }
  /* Disable infinite loops outright */
  .status-pulse, .skeleton-shimmer { animation: none !important; }
}
```

Do not use a universal `*` reduced-motion override. It can erase unrelated behavior and third-party state cues outside the animation's scope.

For number ticks driven by `requestAnimationFrame`, gate the interpolation in JS: when `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, set the final value directly without interpolating. State transitions stay; the *animation* of them disappears.

## Verify before declaring done

1. **Report the gate result.** Name the frequency posture and its basis—`Measured`, `Documented`, `User-stated`, or `Inferred from role`—plus the purpose for each retained motion family. Never report an inferred daily-use count. Name the hero moment when one exists; otherwise confirm that feedback, transitions, repair, or removal were the intended scope.
2. **Verify feedback outcomes.** Exercise relevant pointer, keyboard, and programmatic states. Classify each state family as `Animated`, `Instant`, or `Not applicable`; both animated and instant outcomes must remain legible without relying on motion alone.
3. **Test with `prefers-reduced-motion`.** Toggle the OS setting (macOS: System Settings → Accessibility → Display → Reduce motion) or DevTools (Rendering → Emulate CSS media feature `prefers-reduced-motion`). Animations disabled cleanly? No layout shift on the fallback?
4. **No motion on data-density lists.** Re-walk the artifact for >5-item lists; confirm no stagger.
5. **Scope check.** Animate should touch CSS + one or two elements' enter behavior. If the diff is large, the verb misfired — surface this in the hand-off.
6. **Re-run the two-altitude AI slop test** from SKILL.md. Did the motion you added push the artifact into a reflex aesthetic (marketing-template stagger, parallax-as-depth, decorative spin)? If yes, strip and retry.

## Hand off to polish

Per SKILL.md's hand-off output shape: summarise in plain markdown (not fenced) and lead with what changed.

Animate-specific content to surface:

- **Hero moment.** Which element animates, and how (the shape of the motion — easing curve type, what triggers it, duration). "No hero moment; motion was limited to approved feedback and state transitions" is a valid value.
- **Frequency basis.** For each retained or rejected motion family, name whether frequency was measured, documented, user-stated, or inferred from the interaction's role, and cite the available evidence without inventing a numeric count.
- **Feedback states.** Count the relevant interactive elements covered and split their state families into animated and instant outcomes. "0 animated, 8 instant" is valid when the gate rejects motion; "0 (no interactive elements present)" is valid for a static one-shot artifact.
- **Transition layer.** Count of state changes smoothed. "0 (static one-shot HTML, no state)" is a valid value too.
- **Existing motion fixed.** List the bounce / missing-reduced-motion / parallax fixes applied to motion that was already in the artifact.
- **prefers-reduced-motion handling.** What shape was used (full reduce, partial reduce + alternative cue, etc.).
- **Diff size** as a percent of the artifact.
- **Next step.** Polish checks the dimensions animate didn't change.

See SKILL.md `Hand-off output shape` for the shared variant rules. Animate's refusal case fires when the artifact has no jarring transitions, no broken motion, and no interactive elements — route to `/visualize polish` instead.

**`motion: none` variant.** When the resolved context declares `motion: none`, the pass is removal-only — there's no hero moment and no animated feedback or transition layer to add. Preserve existing immediate state cues, surface what motion was removed (counts of keyframes / `transition:` declarations / `animation:` declarations stripped), name that the context declared `motion: none`, then route to polish. Same conversational shape — don't fence the summary as a separate templated variant.
