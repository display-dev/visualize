# Motion

Doctrine, primitives, easing, durations, reduced-motion contract for visualize artifacts. Brand profile overrides every rule below — a brand that declares `motion: none` blocks every animation rule here; one that declares `motion: subtle` halves the durations. The rules below are the fallback when the brand profile is silent. Lane: motion.md owns the cross-cutting fundamentals; [animate.md](animate.md) owns per-element patterns + per-artifact orchestration — each cites the other, neither restates.

## Native web platform first

Use the platform primitive over JS choreography. Each entry below ships in current browsers; the Baseline date is listed once so the agent knows whether `@supports` is required.

- **CSS transitions, transforms, animations** — Baseline widely available, ship unguarded.
- **WAAPI (`Element.animate()`)** — Baseline widely available, ship unguarded. Use for one-shot imperative animation triggered by JS state.
- **`@starting-style`** for enter transitions — Baseline August 2024, ship unguarded. Replaces `setTimeout` + className flips.
- **`light-dark()`** for dark-mode-aware colours in motion contexts — Baseline May 2024, ship unguarded. Replaces `prefers-color-scheme` media queries inside keyframe declarations.
- **`<details>` / `<summary>`** for accordions — Baseline widely available, ship unguarded.
- **HTML `popover` attribute + `togglePopover()` JS method** — both Baseline April 2024, ship unguarded. (The broader Popover API became fully Baseline January 2025 once Firefox shipped the remaining surface; the attribute + JS method above shipped earlier and need no guard.)
- **`animation-timeline: scroll()` / `view()`** for scroll-driven reveals — Limited availability (Firefox lags). Wrap usage in `@supports (animation-timeline: scroll())` and accept a static fallback for unsupported readers.

The platform primitives degrade gracefully on older browsers; the JS replacements ship 30+KB and a maintenance surface.

## CSS-driven vs JS-driven motion

Three lanes; reach for them in this order:

- **CSS** for declarative state (hover, focus, active, open/closed via `@starting-style` + popover, scroll-driven via `animation-timeline`). The reader's browser owns the lifecycle; the artifact carries no runtime cost.
- **WAAPI** (`Element.animate()`) for compositor-friendly imperative animation — a one-shot triggered by user action where the keyframes depend on JS-computed state (drag offsets, measured layout).
- **A motion library** only for coordinated timelines that span multiple elements with precise timing (a hero scroll choreography that orchestrates six animations against the same scroll position). In a self-contained artifact, a motion library inlines 15-50kb of vendor code; that cost only earns its place on artifacts where the choreography is the artifact.

## Easing curves

Two curves cover 95% of cases. Don't author bespoke per artifact.

- **`cubic-bezier(0.16, 1, 0.3, 1)`** — confident-and-fast ease-out, for enters and reveals.
- **`cubic-bezier(0.4, 0, 0.2, 1)`** — Material standard, for state transitions (hover, focus, active).

**Default to the second when uncertain.** Most state transitions feel right with ease-out because the action lands at the start and the motion settles at the end.

**`linear()` escape hatch** for spring / bounce on the rare moment that earns it. A sampled spring as a single `linear()` declaration ships unguarded (Baseline December 2023) and avoids the JS dependency for one curve. Don't reach for it on every button — bounce is opt-in celebration register only.

## Duration ranges

| Interaction              | Enter            | Exit (≈75% of enter) |
|--------------------------|------------------|----------------------|
| Hover / focus state      | 100–150ms        | 80–110ms             |
| Button press / active    | 80–120ms         | 80–100ms             |
| Dialog / popover open    | 200–250ms        | 150–190ms            |
| Page / section enter     | 300–400ms        | 220–300ms            |
| Decorative scroll-driven | 600ms+ allowed   | n/a (one-direction)  |

**Perceptual floor 80ms, ceiling 500ms** for any state transition. Under 80ms reads as broken (no perceived feedback); over 500ms reads as laggy. Decorative scroll-driven sits outside this band because the duration is bound to scroll distance, not perceived response time.

## View Transitions API

Two distinct surfaces with different support tiers:

- **Same-document** via JS `document.startViewTransition(updateCallback)` — Baseline October 2025 (Newly Available, not universal). Feature-detect with `if (document.startViewTransition)` and fall back to immediate state update for unsupported readers. Use for in-artifact state changes (tab switch, list reorder, layout shift on filter) where a browser-coordinated transition beats hand-animating each element.
- **Cross-document** via the CSS `@view-transition { navigation: auto; }` rule — Limited availability (Chrome 126+, Safari 18.2+, no Firefox at writing time). The CSS rule is self-gating: unsupported browsers ignore the unknown at-rule, so emit it directly rather than wrapping it in `@supports at-rule(...)` (which itself isn't universally supported and can suppress the opt-in on browsers that handle the rule but not the at-rule query).

Reach for the API when the state change is large enough that hand-animating loses; skip for small per-element transitions that CSS or WAAPI handle cleanly. Name the elements that should morph across the transition:

```js
if (document.startViewTransition) {
  document.startViewTransition(() => updateDOM());
} else {
  updateDOM();
}
```

```css
.hero { view-transition-name: hero; }

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*) { animation-duration: 0.01ms; }
}
```

The reduced-motion rule on `::view-transition-group(*)` is required — view transitions don't inherit the `prefers-reduced-motion` check from the elements they animate.

## `interpolate-size: allow-keywords`

Limited availability (Chromium-only at writing time, Firefox in progress). Wrap usage in `@supports (interpolate-size: allow-keywords)` and accept the no-animation fallback in unsupported readers. The working `<details>` animation pattern (combines `interpolate-size` with `transition-behavior`, `overflow`, the `::details-content` pseudo, and additional `@supports` checks) lives in [animate.md](animate.md)'s Accordion row — motion.md describes when and why to reach for it.

Single pattern: smooth `height: auto` on `<details>` accordions and expand-row drill-downs without measuring the content. Don't reach for it on layout-property animation in general — `transform` / `opacity` remain the default surfaces for animating.

## Spring physics

Default don't. The two canonical easing curves cover most of what springs are reached for. When the brand profile declares a spring vocabulary explicitly, sample one spring into a `linear()` function and use it as a shared token — don't bring in a motion library to author one curve. A spring-rich brand whose `DESIGN.md` calls for per-element spring physics is the only case where a library earns its 30-50KB.

## `prefers-reduced-motion`

WCAG 2.3.3 (Animation from Interactions, AAA) sets the floor for interaction-triggered motion that isn't essential; visualize treats reduced-motion respect as mandatory for every animation — decorative, interactive, and brand-essential alike. Two valid shapes:

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal { animation: fade-in-up 400ms cubic-bezier(0.16, 1, 0.3, 1); }
}
```

```css
.reveal { animation: fade-in-up 400ms cubic-bezier(0.16, 1, 0.3, 1); }
@media (prefers-reduced-motion: reduce) {
  .reveal { animation: none; }
}
```

Pick one shape per artifact and stick with it.

**0.01ms vs `none`** — different mechanics, different use cases:

- `transition-duration: 0.01ms !important` on state transitions preserves the state change (the element still reaches its new state) and only removes the perceived motion. Use this for everything that's an interaction (hover, focus, popover open, tab switch).
- `animation: none` halts a keyframe animation and removes it entirely. Use this for decorative keyframes (entrance reveals, ambient pulses) where the animation's only job *is* the motion.

**What to preserve under `prefers-reduced-motion: reduce`**: opacity-only transitions (no vestibular trigger), brand-essential motion the `DESIGN.md` declares as non-decorative, and any motion that conveys state information the artifact would otherwise lose (a chart re-render that fades in new data). What to strip: parallax, scroll-driven reveals, decorative entrance staggers, ambient loops, and any animation that exists purely for delight.

## Failure modes the agent reaches for

- **Parallax scroll.** Decorative parallax reads as 2014 marketing site. Use scroll-driven reveals for content (fade-in on view), not for layered depth.
- **Bounce on every interaction.** `cubic-bezier(0.68, -0.55, 0.27, 1.55)` on a button hover reads as toy. Reserve bounce for opt-in celebration moments (success confirmation, completion checkpoints).
- **Decorative spin / rotate.** Loading spinners that spin a brand icon read as "agent had no idea what to put there."
- **Animation without `prefers-reduced-motion`.** Accessibility failure; the detector flags it as `error`-severity.
- **Scroll-jacking.** Hijacking the scroll bar to "guide" the reader through sections reads as patronising. Let the user scroll.
- **Stagger choreography on every list.** Sequential 50ms reveals on a list of 12 items adds 600ms to perceived load. Use sparingly; never on data-density lists.
- **Animating layout properties.** Transitioning `width`, `height`, `top`, `left`, or `margin` triggers layout on every frame. Use `transform: scale()` / `translate()` and `opacity`, or the FLIP technique for genuine size changes.
- **Decorative scroll-driven reveals on long-form prose.** Body paragraphs aren't a slide deck — sequential fade-ins on every `<p>` chunk the reading flow and add cumulative delay. Scroll-driven reveals belong on hero elements and section transitions, not body copy.
- **`will-change` applied globally.** `will-change: transform` on `body` or every element preemptively allocates GPU memory the artifact will never use. Apply per-element only, only on the animation's source, and remove the declaration when the animation completes.
- **Animation hiding slow loading.** A 600ms skeleton shimmer that masks a 400ms request added 200ms to the perceived delay rather than fixing it. Animations layer on top of perceived performance, they don't substitute for it — fix the underlying delay first.
