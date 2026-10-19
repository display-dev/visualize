# Spatial

Spacing scale, density, alignment, hierarchy, depth, layout primitives for visualize artifacts. Brand profile overrides — if `DESIGN.md` declares a spacing scale, density register, or elevation system, use it. The rules below are the fallback when the brand profile is silent.

## Spacing scale

Geometric, rooted at 4px:

```
0   4   8   12   16   20   24   32   40   48   64   80   96   128
```

Snap every margin, padding, and gap to a step on the scale. 11px / 27px / 73px values read as "the agent eye-balled it" even when they look fine.

Maps cleanly to the core Tailwind spacing steps (Tailwind also exposes half-steps like `0.5` / `1.5` for unusual cases — visualize artifacts stay on the integer scale by default).

**Why 4pt over 8pt**: 8pt is too coarse — `12px` (between 8 and 16) is needed too often for chip padding, icon-text gaps, dense table rows. 4pt gives granularity without losing snap discipline. The cost is a longer scale; the benefit is rarely needing a half-step.

## Semantic token naming

Name spacing tokens by *relationship* to the content they separate, not by their pixel value:

```css
--space-inline:    4px;   /* between adjacent inline items: chips, icon-text gaps */
--space-component: 8px;   /* inside a component: card padding, button internal */
--space-group:    24px;   /* between grouped elements: form fields, list items */
--space-section:  64px;   /* between top-level sections */
--space-page:    128px;   /* page-edge padding on theatrical register */
```

Not `--spacing-4` / `--spacing-8` / `--space-md`. Why: a density-register flip (comfortable → compact) reskins the underlying values without touching call-sites. Value-named tokens (`--spacing-8`) and size-aliased tokens (`--space-md`) both lock the artifact at one density.

Cap at ~6 relationship slots — proliferating to `--space-hero-top` / `--space-card-internal-bottom` defeats the consolidation. If a callsite needs an unusual value, it picks the nearest relationship token (overshoot is cheaper than a new slot).

## `gap` over margins

For sibling spacing inside flex/grid, use `gap`. No `:last-child` cleanup, no margin-collapse surprises, no negative-margin counter-hacks.

Margins still earn their pixel for:
- Prose flow (`article > * + *` for heading/paragraph rhythm via owl-selector)
- Single-child offset from a parent edge
- Intentional baseline-grid breaks

Anywhere the parent is `display: flex` or `display: grid`, `gap` is the right primitive.

## Density registers

Three registers, picked per template:

| Register      | Body margin | Section gap | Component padding |
|---------------|-------------|-------------|-------------------|
| **compact**   | 12px        | 24px        | 8px / 12px        |
| **comfortable** | 16px      | 48px        | 12px / 20px       |
| **theatrical** | 24px       | 96px+       | 24px / 32px       |

- **Compact** for ops / data-dense / dashboard registers (Console and IDE design systems).
- **Comfortable** for the default; reading-heavy artifacts where the eye needs space.
- **Theatrical** for presentation register (Deck design system) — big sections, big gaps, room to breathe.

The brand's `format_default` informs the pick: `code-shop` → compact, `publishing` → comfortable, `presentation` → theatrical.

**Each register has a floor and a smell threshold.** Compact bottoms out around 8px component padding (a KPI tile at 4px reads as broken, not compact). Theatrical past ~192px section gap on dev-product brands starts reading as marketing template, regardless of the brand's declared density. Treat 192px as a smell line, not a hard ceiling — presentation-register decks legitimately go past it.

## Visual hierarchy through multiple dimensions

Hierarchy is multi-dimensional. Best hierarchy uses 2–3 dimensions at once.

| Dimension | Strong (clear hierarchy) | Weak (muddy hierarchy) |
|---|---|---|
| **Size** | 3:1 ratio or more | <2:1 ratio |
| **Weight** | 700 vs 400 | 500 vs 400 |
| **Color** | High contrast (`--foreground` vs `--muted-foreground`) | Similar tones |
| **Position** | Top, leading edge (primary) | Bottom, trailing edge |
| **Space** | Surrounded by whitespace | Crowded |

Typography rules (size + weight) live in [typography.md](typography.md). Color contrast lives in [color.md](color.md). This section is the *composition rule* — combine 2–3 dimensions to mark a primary, second-primary, etc.

The squint test (next section) is the cheapest agent-runnable check that the hierarchy holds.

## The squint test

Screenshot the artifact, apply 8–12px Gaussian blur. Can you identify:
1. The primary element?
2. The second-primary?
3. Clear groupings (where one section ends, the next begins)?

If everything reads at the same weight when blurred, the artifact has a monodimensional hierarchy (size-only or weight-only). Apply 2–3 dimensions from the table above; re-run.

Run the squint test on at least three vertical zones (hero / mid / footer-adjacent) — passing on the hero but failing on body sections is the common shape.

## Cards are not required

Cards are overused. Spacing + alignment + typography group content without chrome.

Cards earn a pixel when:
- Items are truly distinct AND actionable.
- Items need visual comparison in a grid (KPI tiles, plan comparison).
- Content needs interaction boundaries (clickable / hoverable / expandable).

Inside a card, group with spacing + typography + dividers — nesting a card inside a card stacks chrome on chrome.

## Self-adjusting grid

`repeat(auto-fit, minmax(280px, 1fr))` is responsive without breakpoints. Pick the right level:

Both `auto-fit` and `auto-fill` create as many tracks as fit. The difference is what happens after placement when there are fewer items than tracks:

- **`auto-fit`** — collapses empty repeated tracks; items stretch fill remaining space. Use for KPI tiles, chip rows, feature grids where leftover space should distribute.
- **`auto-fill`** — preserves empty tracks; items keep their `minmax()` minimum. Use for calendar grids, paginated views where the track count should stay stable.
- **`subgrid`** (Baseline September 2023) — when nested items must align to parent tracks (multi-row form labels, card-internal rows that span a parent column). Use `grid-template-columns: subgrid` on the child.
- **Named grid areas** (`grid-template-areas`) — when layout has named regions (dashboard with header / sidebar / main / aside). Readability beats line-number magic.

Default to `auto-fit` + `minmax()` for "n responsive tiles." `repeat(3, 1fr)` is reserved for semantically-fixed counts (3 plans, 4 quarters) — as a default layout choice it collapses ungracefully on mobile and wastes space on tablet.

## Alignment

Single baseline grid per artifact. Body lands on the grid; headings adjust upward (the visual top of the cap-height aligns to the gridline, not the bounding box).

When a component looks off-grid, the component's CSS is wrong — fix the source, not the callsite. Manual nudges (`margin-top: -3px` to "fix" alignment) bake the bug into every consumer.

Multi-column layouts share the same gutter scale — pick one gutter value (e.g. 32px) and use it across every multi-column section.

Stacked sections share a left edge — section headings align to a single column, no per-section indent drift. When a section is centered, body inside it left-aligns; centering doesn't cascade through children.

Tables align by whitespace, not drawn rules. Vertical column rules belong only where the column spacing is so narrow that the eye can't resolve which value belongs to which column; default to borderless with at most a row-bottom hairline. A full grid turns the table into Excel.

## Optical adjustments

Geometric precision and visual precision diverge. The eye is the judge; geometry is the starting point.

- **Letterform whitespace causes drift on display sizes.** Display headings and logo / text lockups land visually indented at `margin-left: 0` because the first letterform's sidebearing creates space. Offset with `margin-left: -0.05em` on display-size text where flush alignment matters. Body prose doesn't need this — the sidebearing reads as comfortable margin at smaller sizes.
- **Geometrically centered icons look off-center.** A play triangle shifts right (visual mass sits left of geometric center); arrows shift toward their direction; speech bubbles shift away from their tail.
- **Bake adjustments into the SVG.** A `transform: translateX(1px)` at every callsite is fragile. Edit the icon asset so the optical centering is the geometric centering.

Touch-target sizing is in [responsive-design.md](responsive-design.md) (WCAG 2.2 SC 2.5.8 + `any-pointer: coarse` adaptation) — it's a responsive-behavior concern, not a spatial-scale concern.

## Depth and elevation

Semantic z-index scale, not raw integers:

```css
--z-base:           1;
--z-dropdown:      10;
--z-sticky:        20;
--z-modal-backdrop: 30;
--z-modal:         40;
--z-toast:         50;
--z-tooltip:       60;
```

Templates reference the semantic token (`z-index: var(--z-modal)`); the magic numbers stay in the token definitions, not in callsite CSS.

**Stacking-context gotcha**: many properties create a new stacking context, and a child's z-index can't outrank z-index in a different context. Common triggers worth knowing for visualize artifacts:

- `transform` (and individual `scale` / `rotate` / `translate`) — every animation
- `opacity < 1` — every fade-in
- `filter` / `backdrop-filter` — atmospheric effects
- `clip-path` / `mask` — every clipped hero
- `isolation: isolate` — explicit context, deliberate
- `position: fixed | sticky` — every floating element
- `container-type: size | inline-size` — every container query
- `will-change` for a stacking-context property
- `mix-blend-mode`

If a modal inside an animated parent won't reach the page-level tooltip layer, the parent created a context. Either move the modal to a top-level portal, or hoist the context.

Shadow elevation scale, subtle by default:

| Token | Use | Approx |
|---|---|---|
| `--shadow-sm` | hover lift, subtle elevation | `0 1px 2px / 8% opacity` |
| `--shadow-md` | floating element (dropdown) | `0 4px 8px / 10%` |
| `--shadow-lg` | modal, popover | `0 12px 24px / 12%` |
| `--shadow-xl` | rare hero treatment | `0 24px 48px / 15%` |

If you can clearly see the shadow, it's probably too strong. Shadows on prose-heavy templates (whitepaper, longform editorial) read as "card on a card on a card" — the chrome says document, not dashboard.

## Whitespace as separator, not decoration

Vary whitespace by hierarchy: section gap > subsection gap > intra-component gap > inline gap.

Concrete ratios (tunable per density register, but the *ratio* stays):
- Section gap ~3–4× subsection gap
- Subsection gap ~2× intra-component gap
- Intra-component gap ~2× inline gap

Same-spacing-everywhere flattens grouping cues (Gestalt proximity violation). The reader has no signal for "this is a new section" vs "this is the next paragraph in the same section."

Pad for legibility, not visual statement. 200px of empty space at the top of a section as "design breathing room" reads as agent-padded.

Micro-space (line-height, list-item gap) lives in [typography.md](typography.md). Macro-space (section gap, page padding) lives here.

## Container queries vs media queries

For component-side reflow (a card that flips stack-to-horizontal at 400px container width, regardless of viewport), use `container-type: inline-size` on the slot, not a viewport `@media`. The full taxonomy (units, browser support, when each wins) is in [responsive-design.md](responsive-design.md).

## Failure modes the agent reaches for

- **Uniform spacing across hierarchy.** Every section at the same 64px gap, or `gap: 48px` between every block — flattens proximity cues. Vary by hierarchy: section gap > subsection gap > intra-component gap > inline gap.
- **Off-grid values.** 11px / 17px / 23px. Snap to the scale.
- **Half-step abuse.** 2px / 6px / 10px because "the scale is too coarse" — recreates the eye-balled problem one step down. The 4pt floor is the floor.
- **Decorative whitespace.** 200px of empty space at the top of a section as "design breathing room" reads as agent-padded. Pad for legibility, not visual statement.
- **Cramped chrome on dense data.** A KPI tile pushed to 4px padding reads as broken, not compact. Compact has a floor.
- **Hero-section padding bloat.** 240px top + 200px bottom hero. Theatrical density is for presentation register; on dev-product it reads as marketing template.
- **Centered-everything.** Center-aligning headings, body, and CTAs in a single section flattens hierarchy. Left-align body; center single hero elements only.
- **Bordered-grid tables.** Default to borderless with tabular numerals and at most a row-bottom hairline. Full column rules and bordered cells read as Excel, not as designed.
- **Card-as-container reflex.** Every section wrapped in border + radius + shadow because "sections need definition." Whitespace and a heading do the work; the cards are taxes on the reader.
- **`z-index: 9999`.** Author lost the semantic stack. Rebuild the ladder from `--z-dropdown` to `--z-tooltip` and rip the magic number out.
- **`repeat(3, 1fr)` as default layout.** Use `auto-fit minmax()` unless the count is semantically fixed. Three-column rigid grids on every section collapse ungracefully on mobile and waste space on tablet.
- **Shadow as decoration on prose templates.** Whitepaper, longform editorial, runbook — shadows read as "card UI"; the brand says document. Use whitespace + rules + hairlines instead.
- **Semantic-token proliferation.** `--space-hero-top`, `--space-card-internal-bottom`. Each new slot is a maintenance tax; cap the working set at ~6 named slots.
