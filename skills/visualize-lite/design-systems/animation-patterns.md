# Animation patterns for catalog previews

This file is the shared motion vocabulary for `visualize/design-systems/*/preview-template.html`. Use it when a preview needs entrance motion, hover response, background texture, or interactive polish. Keep the brand's identity intact, but make the implementation recognizable to future maintainers and validators.

## Motion intent

| Intent | Use for | Motion shape |
|---|---|---|
| Dramatic | launch pages, cinematic brands, high-contrast systems | longer entrance, larger offset, strong opacity reveal |
| Techy | developer tools, infrastructure, data systems | precise fade/slide, grid scan, terminal cursor, small transform range |
| Playful | consumer brands, expressive systems | springy scale, staggered objects, short overshoot |
| Professional | SaaS dashboards, enterprise systems | subtle fade-up, minimal travel, calm easing |
| Calm | editorial, knowledge work, productivity | slow opacity, small blur, no bounce |
| Editorial | magazine, paper, luxury | measured fade, line reveal, image mask or crop reveal |

## User intent mapping

Use this vocabulary to translate imprecise user asks into specific motion proposals. Do not treat every named pattern as safe by default; propose the smallest motion that satisfies the user's intent and the preview's brand register.

| User says | Candidate vocabulary | Use when | Avoid when |
|---|---|---|---|
| "Make it feel smoother" / "less abrupt" | continuity transition, layout animation, ease-in-out | state changes or view changes currently snap and the reader loses orientation | the element is static preview content with no before/after state |
| "Help people see where this came from" | shared element transition, origin-aware animation, transform origin | a popover, expanded card, modal, or detail view grows out of a clear trigger | the source element is not visible or the relationship is only conceptual |
| "Items should appear one by one" | stagger, orchestration, delay | a short repeated group needs ordered scanning: swatches, stats, cards, steps | long paragraphs, tables, or any content the reader needs immediately |
| "Make the card feel clickable" | hover effect, press/tap feedback, subtle lift | interactive cards, buttons, filter chips, or demo controls need affordance | non-interactive preview tiles; motion would imply clickability that is not present |
| "Reveal this gradually" | reveal, clip-path, mask, line drawing | editorial or launch previews need a controlled disclosure moment | dense product UI, tables, or text-heavy content where hiding delays comprehension |
| "This should feel alive" | pulse, idle animation, float | the brand is playful or kinetic and the moving element is decorative or secondary | professional, calm, or frequently viewed surfaces; ambient loops get annoying fast |
| "Make navigation feel directional" | direction-aware transition, slide in, crossfade | previous/next or step-based UI needs forward/back spatial memory | non-sequential browsing or content where direction has no semantic meaning |
| "Show feedback when this fails" | shake / wiggle, color/opacity feedback | a rejected input or invalid state needs immediate local feedback | serious enterprise or accessibility-sensitive contexts where shake reads punitive |
| "Make numbers feel active" | number ticker, tabular numbers | live metrics, counters, timers, or KPI changes are the focal point | static evidence tables or sourced claims where animation may imply real-time data |
| "Show loading without a blank gap" | skeleton / shimmer | a preview intentionally demonstrates loading state or perceived performance | static catalog previews with no real async state; fake loading reads as theatre |
| "Tie motion to scroll" | scroll reveal, scroll-driven animation, parallax | a long marketing-style preview needs section pacing and reduced-motion fallback | documents, dashboards, dense evidence, or any surface where scroll control matters |
| "Make it playful" | pop in, bounce, squash and stretch | the brand explicitly supports playful physics and the element is small | default SaaS, enterprise, docs, or anything repeatedly viewed |

When proposing options to a user, name the pattern and the tradeoff: "Use a staggered fade-up for the three proof cards; skip ambient float because this is a dense report." That keeps motion as a design decision rather than decoration.

## Timing tokens

Define local timing variables near the top of the template stylesheet. Use brand-specific names only when the brand truly documents motion tokens.

```css
:root {
  --motion-fast: 160ms;
  --motion-base: 260ms;
  --motion-slow: 520ms;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

## Entrance classes

Use entrance classes on decorative preview sections, not on core navigation or text that must be instantly readable. Keep initial states visible enough that disabling JavaScript does not produce blank content.

```css
.fade-up {
  animation: fade-up var(--motion-slow) var(--ease-out-expo) both;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.scale-in {
  animation: scale-in var(--motion-base) var(--ease-out-expo) both;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

.slide-left {
  animation: slide-left var(--motion-slow) var(--ease-out-expo) both;
}

@keyframes slide-left {
  from { opacity: 0; transform: translateX(32px); }
  to { opacity: 1; transform: translateX(0); }
}

.blur-in {
  animation: blur-in var(--motion-slow) var(--ease-standard) both;
}

@keyframes blur-in {
  from { opacity: 0; filter: blur(10px); }
  to { opacity: 1; filter: blur(0); }
}
```

## Staggering

Stagger small repeated groups only: swatches, pills, stats, cards. Do not stagger every paragraph on a long page.

```css
.stagger-group > * {
  animation: fade-up var(--motion-slow) var(--ease-out-expo) both;
  animation-delay: calc(var(--i, 0) * 70ms);
}
```

```html
<div class="stagger-group">
  <span style="--i: 0">Planning</span>
  <span style="--i: 1">Review</span>
  <span style="--i: 2">Launch</span>
</div>
```

## Background effects

Background motion must not compete with body text. Keep it behind the content layer and cap opacity.

```css
.gradient-mesh {
  position: absolute;
  inset: -20%;
  z-index: 0;
  background:
    radial-gradient(circle at 20% 20%, var(--primary), transparent 32%),
    radial-gradient(circle at 80% 10%, var(--accent), transparent 28%),
    radial-gradient(circle at 50% 80%, var(--secondary), transparent 35%);
  opacity: 0.26;
  filter: blur(40px);
  animation: mesh-drift 14s var(--ease-standard) infinite alternate;
}

@keyframes mesh-drift {
  from { transform: translate3d(-2%, -1%, 0) scale(1); }
  to { transform: translate3d(2%, 1%, 0) scale(1.04); }
}
```

```css
.noise-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E");
}
```

```css
.grid-pattern {
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: center;
}
```

## Interactive effects

Use transform and opacity for hover work. Avoid animating layout properties like `width`, `height`, `top`, `left`, `margin`, or `padding`.

```css
.tilt-card {
  transform: perspective(900px) rotateX(0) rotateY(0) translateY(0);
  transition: transform var(--motion-base) var(--ease-out-expo), box-shadow var(--motion-base) var(--ease-standard);
}

.tilt-card:hover {
  transform: perspective(900px) rotateX(2deg) rotateY(-3deg) translateY(-4px);
}
```

```css
.slide-fill {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.slide-fill::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--primary);
  transform: translateX(-105%);
  transition: transform var(--motion-base) var(--ease-out-expo);
}

.slide-fill:hover::before {
  transform: translateX(0);
}
```

## Reduced motion

Every template with animation must include this exact floor, then add template-specific selectors if needed.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }

  .gradient-mesh,
  .tilt-card,
  .fade-up,
  .scale-in,
  .slide-left,
  .blur-in,
  .stagger-group > * {
    transform: none !important;
  }
}
```

## Performance budget

- Animate only `opacity`, `transform`, and occasional decorative `filter` on non-text layers.
- Keep moving background layers to two or fewer.
- Do not animate text blur on long paragraphs.
- Do not use scroll-jacking or custom wheel handlers in catalog previews.
- Do not add external motion libraries for a preview template.
- Verify with `node visualize/scripts/detect.mjs --strict <preview.html>` and browser screenshots after motion changes.
