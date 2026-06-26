# `bolder` — amplify visual punch on safe / generic artifacts

Before following the instructions below, apply the shared rules in SKILL.md.

`/visualize bolder <path>` increases visual impact through stronger hierarchy, more committed scale, decisive type, and brand-true color amplification. Hands off to `polish` at the end.

Bold means distinctive, not "more effects." Don't reach for gradient text, neon accents, glassmorphism, or purple-to-cyan stacks — they're the most-trained-on visual reflex and read as anonymous. Every Absolute ban in SKILL.md applies during bolder.

## Before you start

1. **Read the artifact.** Where does the eye land first? On nothing in particular? Is everything medium-sized, medium-weight, similar-spaced? That's the diagnosis.
2. **Name the available amplification range.** Use the resolved context to decide whether the artifact should amplify through precision, scale, type discipline, contrast, or another specific lane.

## When bolder is the right verb (and when it isn't)

Bolder is the right verb when the artifact is safe, generic, medium-everything — nothing the eye lands on first, no committed color, no scale contrast. Use bolder when:

- The artifact reads as defaulted (system fonts, basic palette, single body register).
- The resolved context carries a stronger identity than the artifact currently expresses.
- There's a hero moment the artifact *should* have but doesn't.

Refuse and route when:

- The artifact carries ≥2 Absolute bans. Bolder on a ban-carrying artifact amplifies bans (a 144px gradient-text headline is BAN 1 worse, not better). Recommend `/visualize simplify` first.
- Every candidate focal moment is already over-amplified (gradient text + hero metric + tricolon CTA all competing). Recommend `/visualize quieter` first.
- The artifact is short-form prose (whitepaper / report) — bolder usually means stronger typographic hierarchy here, not theatrics. If you'd reach for spatial / color amplification on prose, you're misapplying the verb.

## Plan the amplification

Pick ONE focal moment. Bolder = ONE hero claim, not ten amplified elements. State the focal moment in the run summary. **If you can't name a single focal moment** — because the artifact is too noisy to pick one — refuse the verb and route to `quieter` (see above).

### Step 1: pick a lane

Before picking axes, pick a personality direction. Bolder without a lane is amplification in five inconsistent directions — and reads as chaos. Five lanes; the resolved context + template category suggest which one fits:

- **Theatrical** — display-grade type at the top of the scale, dramatic spacing (theatrical density per [spatial.md](spatial.md)), one surface committed to brand color, hero element escaping its container. Pitch decks, release announcements, conference materials.
- **Restrained-bold** — single weight-step amplification, one accent surface, tighter contrast on color. The brand has identity but is product-register (Stripe, Linear). Bolder here means clearer hierarchy, not theatrics.
- **Editorial-dramatic** — large display type (often serif), aggressive scale contrast between display and body, generous leading, pull-quote treatment. Whitepapers, long-form essays, manifestos.
- **Committed-mono** — single typeface (display + body from one family), single accent color, type doing all the work. Dev-tool brands, technical reports, infrastructure docs.
- **Data-native / operational-bold** — amplification through *signal* density: status hierarchy (live / degraded / down with distinct chroma), anomaly contrast (the one out-of-band metric draws the eye), table priority (the column that matters first), one focal KPI elevated above the supporting grid. Dashboards, status pages, data-explorers, NOC views. Bolder here is "the alarming row is unmissable," not "the page is louder."

State the lane in the run summary. The lane bounds the axes you pick in Step 2 — *restrained-bold* never reaches for theatrical spatial drama; *committed-mono* never reaches for committed color beyond a single accent; *data-native* never reaches for full-bleed decorative surfaces.

### Step 2: pick axes

Three amplification axes (pick at most two):

- **Type scale**: dramatic display heading, weight contrast (200 ↔ 700), generous leading or tight tracking depending on the brand.
- **Spatial drama**: extreme scale jumps (3–5x between hero and supporting), asymmetric layout, hero element escaping its container.
- **Committed color**: one brand color carrying 30–60% of a surface (the brand's actual color, not the AI-default purple). Or a single dramatic dark / light surface.

Don't amplify across all three axes at once. That's not bolder, that's chaos.

## Execute systematically

### Typography
Consult [typography.md](typography.md).

- Display heading at the top of the type scale (or one step above the existing top). Display-grade glyph if the brand carries both grades.
- Weight contrast: pair 700 with 400 (or 900 with 200 on brands that carry the range). Avoid 600 + 400 — too close to read as deliberate.
- Variable fonts: lean into the axes (weight, optical-size, slant) the brand declares.
- Cap line length at 65–75ch even when amplifying. Wider amplified type is wall-of-text, not bold.

### Color
Consult [color.md](color.md).

- Lift `--primary` saturation if the brand currently runs muted (within OKLCH chroma 0.18–0.22 range — don't exceed; high chroma at lightness extremes reads garish).
- Commit one surface to the brand color (hero section background, or sidebar, or footer band).
- High-contrast accent on the focal moment only — not on every CTA.
- Dark surface for emphasis if the resolved context supports it. Dark is a deliberate move, not a default — pick by writing one concrete sentence of who-reads-this-where-and-when (an SRE on a 27" monitor at 2am in a dim room *forces* dark; a clinician on a tablet in a fluorescent-lit ward *forces* light). If the sentence doesn't force the answer, it's not concrete enough.

### Spatial
Consult [spatial.md](spatial.md). Full-bleed at viewport edges + reflow at mobile: [responsive-design.md](responsive-design.md).

- Extreme scale jumps on the focal moment (3–5x between hero and supporting).
- Asymmetric layout: 70/30 or 80/20 splits, not 50/50.
- One element escapes the grid — a hero claim, a key diagram, or a focal KPI tile breaks the column or runs into the margin. (Not every artifact has a "hero metric" — that shape is specifically the dashboard-KPI escape; on other registers the focal element is a claim, an illustration, or a quote.)
- Intentional overlap — layer two elements (hero illustration over a section divider, oversized type bleeding across a card edge) for depth. Different from glassmorphism: overlap is structural composition, not decorative blur. Theatrical and editorial-dramatic lanes only. **On data graphics** (charts / KPI tiles): overlap is allowed *only* when it labels a data mark and never occludes the mark, never changes perceived proportion, and never adds blur or translucency — per [data-viz.md](data-viz.md), annotation recedes and data dominates. Decorative overlap on chart plot areas is out-of-scope for bolder.
- Full-bleed surface at `100vw` works on theatrical lane only — `width: 100vw` with padding overflows on mobile (per [responsive-design.md](responsive-design.md)); use `width: 100%` with the parent set to `max-width: none` for the bleed section.
- Generous spacing around the focal element (theatrical register); compact spacing on the supporting context for contrast.

### Motion
Consult [motion.md](motion.md). Bolder ≠ animated — keep motion sparingly, then `polish` will confirm.

- One signature enter animation on the focal moment, not a stagger across every list.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for confident-and-fast. Never bounce.

### Visual effects (beyond color / scale / spatial)

When the three primary axes are spent and the artifact still needs more presence, reach for *texture-grade* effects — surface treatments that add visual weight without adding decorative chrome. Use sparingly; one effect per artifact, never stacked.

- **Noise / grain texture** — fine SVG noise overlay (alpha 4–8%) on a hero surface or across the whole page. Adds tactile weight. Reads as letterpress / printed on editorial registers; reads as analog accent on theatrical. Don't confuse with mesh gradients (see below).
- **Mesh gradients** — multi-stop CSS gradients producing a "soft mesh" surface. Reads as 2020s SaaS-digital by default — useful for brands that *want* that register (consumer-product launches, modern web-editorial), wrong-register for technical, institutional, or editorial brands. Pair with a tinted neutral foreground, not the gradient stops as text color.
- **Halftone** — `background-image` dot pattern or SVG halftone on a single accent surface. Works on editorial / publishing / print-adjacent registers; off-register on dev-tool brands.
- **Duotone** — two-color photo treatment via `mix-blend-mode` or SVG filter. Useful on hero imagery for brands with a single committed accent color.
- **Custom illustrative elements** — hand-drawn, woodcut, or geometric custom artwork in the brand's voice. Distinct from icon-tile section markers (BAN 5 in SKILL.md); the difference is illustrations carry information or atmosphere, icon tiles are chrome.
- **Atmospheric blur / backdrop-filter** — sparingly, on a single hero surface, never as decoration on every card. Glassmorphism-on-every-panel is generic AI-design slop; one purposeful backdrop-filter on a focal moment is craft.
- **Full-bleed surface** — break the column at the focal section, let one element occupy 100vw with a dramatic surface (gradient, photo, illustration). Theatrical lane only.

Effects compose with the lane (the defaults — resolved context can override):

- *Theatrical* → noise, mesh, custom illustration, full-bleed, backdrop-filter all in play.
- *Editorial-dramatic* → grain, halftone, duotone, custom illustration. Skip mesh (off-register).
- *Restrained-bold* → at most ONE *very subtle* effect (low-alpha noise, single duotone hero). Restraint is the point; if you're picking from this list, ask whether the design actually needs it.
- *Committed-mono* → grid / scanline / terminal-cursor / diagrammatic linework can read in-register; texture effects from the list above usually don't (the type is the effect).
- *Data-native* → none. The visual amplification IS the data hierarchy; surface textures distract from signal.

## NEVER

- Reach for any SKILL.md Absolute ban. Bolder amplifies banned shapes instead of redeeming them.
- Amplify across all three axes (type + spatial + color) at once. Pick one or two; the rest stays restrained.
- Sacrifice readability for impact. Body prose still wraps at 65–75ch. Contrast still meets WCAG AA.
- Use bounce / elastic easing. Reads as toy, not bold.
- Add decoration without a focal moment. Bolder without a hero element is just louder.
- Drift to AI-default purple / cyan / pink / indigo. Use the resolved context's actual hue or stay neutral.

## Per-template-category notes

- **Pitch deck** (`pitch-deck`, `slide-deck`): bolder usually means committing to typographic drama — display-grade headings on 2–3 hero slides, supporting slides quieter. Don't try to make every slide a hero.
- **Long-form prose** (`whitepaper`, `report`, `case-study`): bolder is dangerous on prose-heavy artifacts — usually it means a stronger pull-quote treatment or a more committed type scale, not chrome amplification. Don't add icon tiles or feature cards to a whitepaper.
- **Dashboard** (`dashboard`, `data-explorer`): bolder is rarely the right verb here. Bold in product registers means *clearer* hierarchy, not theatrics. Pull the focal KPI into a larger tile, push the supporting metrics smaller. Don't dramatize the chrome.

## Verify before declaring done

1. **Name the focal moment.** Where does the eye land first now? If you can't point to one element, bolder didn't land — either refuse the verb and route, or re-run.
2. **Re-run the two-altitude AI slop test** from SKILL.md. Did you reach for a banned or reflex pattern? Start over.
3. **Context still recognizable.** The artifact should read as a bolder version of the resolved context, not as a generic bold template.
4. **Scope check.** If bolder is touching most of the artifact, the verb misfired — surface this in the hand-off, don't push through.

## Hand off to polish

Per SKILL.md's hand-off output shape: summarise in plain markdown (not fenced) and lead with what changed.

Bolder-specific content to surface:

- **Lane** used: theatrical / restrained-bold / editorial-dramatic / committed-mono / data-native.
- **Focal moment.** Which element the eye lands on first now, and what changed about it.
- **Amplification axes** applied — max two of: type / spatial / color. Three is theatrical overcommitment.
- **Visual effect** layered in, if any: mesh / halftone / duotone / grain / illustration / backdrop-filter / full-bleed. "None" is a valid value when the lane carried the work without an effect.
- **Diff size** as a percent of the artifact.
- **Next step.** Polish raises the floor on the dimensions bolder didn't change.

See SKILL.md `Hand-off output shape` for the variant rules. Bolder's refusal case fires on artifacts that already carry ≥2 Absolute bans, on artifacts where no focal moment can be named, or on short-form prose where amplification would misapply — route to `/visualize simplify` or `/visualize quieter` first in those cases.
