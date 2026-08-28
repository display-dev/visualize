# `simplify` — strip decoration that isn't earning its pixel

Before following the instructions below, apply the shared rules in SKILL.md.

`{{command_prefix}}visualize simplify <path>` removes elements that don't carry comprehension, hierarchy, or feedback. Hands off to `polish` at the end.

Edit; don't erase. Brand voice survives the cuts; what doesn't survive is chrome the brand never asked for. Don't strip the artifact past the brand's identity.

## Before you start

1. **Read the artifact.** Catalogue what the eye encounters: how many distinct visual elements per section, how many decorative layers, how many "we have this so let's display it" tiles.
2. **Name what earns its place.** Preserve elements that carry the resolved context; everything else earns its pixel or comes out.

## When simplify is the right verb (and when it isn't)

Simplify is the *only* Refine verb that's the correct first response to a ban-carrying artifact — its job is removing patterns that don't earn their place, which is exactly what bans are. Use simplify when:

- The artifact carries 1+ Absolute bans (simplify is the way out).
- Repeated / decorative / hierarchically-redundant elements are the dominant problem.
- The artifact is too busy, not too loud (loudness alone is `quieter`'s call).

Refuse and route when:

- The artifact has **no decoration to remove** — it's already minimal. Recommend `{{command_prefix}}visualize bolder` or `{{command_prefix}}visualize polish` instead, or surface that nothing needs cutting.
- The change would become a rebuild rather than a simplification. Stop refinement and apply SKILL.md's Hand-off output shape and Design judgment to recommend the next action.

## Plan the cuts

Pick a primary strategy before cutting. Three shapes (a run can combine them, but declare one as primary):

- **Decoration cut**: shadows / borders / gradients / icon-tiles / chrome layers that don't carry hierarchy. Most common.
- **Repetition cut**: three feature tiles repeating the same heading-icon-blurb shape → one block of body prose. Or a sidebar restating the body's nav.
- **Hierarchy cut**: collapse a header bar + section header + heading-with-byline into one. Flatten where the visual hierarchy is fighting the information hierarchy.

State which strategy is primary (and which are secondary, if any) in the run summary. If you can't name any strategy, you're not simplifying — you're erasing.

**Element-vs-quieter decision rule:** simplify operates on *discrete elements* (cards, sections, decorative wrappers — remove them). Quieter operates on *continuous properties* (color saturation, weight, spacing, shadow depth — tone them). When a ban's REWRITE requires a different structural shape (BAN 3's "asymmetric — one hero claim with two supporting facts"), you've crossed into simplify territory. When the rewrite is "use a smaller value," that's quieter.

## Execute systematically

### Decoration

- Drop shadows on cards that already have borders → keep one or the other.
- Background gradients that compete with content without carrying identity or meaning → flat color.
- Per-heading icon tiles → just the heading. (Also a hard Ban — see SKILL.md BAN 5.)
- Stat tiles around a single number when the artifact isn't a dashboard → inline the number in body prose.
- Decorative borders on every section → only where the section break needs visual separation.
- "Why us" / "Features" / "Benefits" triple-card grids → asymmetric content or removed entirely. (Also BAN 3.)

### Color

Consult [color.md](color.md) for palette and role decisions. Cut color treatments only when they add noise without carrying meaning or identity:

- Chart colors that add emphasis without distinguishing categories or quantities → reduce redundant emphasis. Use [data-viz.md](data-viz.md) to preserve the chart's encoding; hue count alone is not a reason to recolor it.
- Coloured backgrounds on text blocks that don't need to land separately → no background.
- Decorative state-like emphasis that falsely implies urgency or status → remove that emphasis, not the hue from unrelated identity or data roles.
- Gradients that obscure content or compete with its hierarchy → simplify the treatment where the problem occurs.

### Spatial

Consult [spatial.md](spatial.md). Cuts:

- 240px of hero padding on a non-presentation register → comfortable padding.
- Same-padding-everywhere → vary by hierarchy (section gap > subsection gap > intra-component gap).
- Sidebar that restates content already in the body → remove.
- Whitespace as visual statement rather than legibility tool → drop the decorative gap.

### Copy

Consult [copy.md](copy.md). Cuts:

- Restated headings ("This section covers X" under an `<h2>X` heading) → drop the restatement.
- Hedging wrappers ("It is worth noting that…" / "Consider…") → drop the wrapper, keep the claim.
- Em-dash overuse (>2 per paragraph) → commas, parentheses, sentence breaks.
- Sycophant footers / AI-attribution → out. (Also BAN 7.)
- "In conclusion" / "To summarize" → just write the final paragraph.

### Motion

Consult [motion.md](motion.md). Cuts:

- Stagger choreography on every list → keep for one hero element max, or remove.
- Decorative spin / rotate / pulse → remove unless the resolved context explicitly carries it.
- Parallax → remove (it's a Failure mode in motion.md).

### Navigation density

Cut decision-points the reader doesn't need (Hick's law — see [cognitive-load.md](cognitive-load.md)). Don't layer multiple navigation chromes that do the same job:

- **Pick ONE navigation surface per artifact**: inline table of contents at the top, OR a sticky sidebar TOC, OR a breadcrumb trail — not all three. Triple-stacking nav reads as "agent wasn't sure which to use."
- **Smart-default the dark/light pick** via `prefers-color-scheme` + `<meta name="color-scheme" content="light dark">`. Skip the per-artifact theme toggle unless the resolved context carries one explicitly. A toggle on every artifact is chrome the reader didn't ask for.
- **Inline anchored navigation** — `<a href="#section-id">` jumps inside the artifact — beats separate-route navigation (artifacts are single-page; route-shaped nav is wrong-shape).
- **No "back to top" button** unless the artifact is >5000 words AND the resolved context asks for it. Modern scroll-to-top is one keystroke (`Home`), and a floating button is chrome.

## NEVER

- Strip the brand to its absence. The artifact should still feel like the brand after simplify runs — that's Universal law 5.
- Remove a11y-load-bearing elements (focus rings, alt text, labels, ARIA) as "decoration."
- Collapse hierarchy into a flat document. Simplify removes *redundant* hierarchy; some hierarchy is information.
- Cut without naming a strategy. Erasing isn't simplifying.
- Re-introduce slop while simplifying. The Absolute bans apply during the cut too.

## Per-template-category notes

- **Long-form prose** (`whitepaper`, `report`, `case-study`, `research-brief`): simplify is mostly copy cuts (restated headings, hedging wrappers) and chrome cuts (per-heading icons, decorative borders). Don't cut footnote chrome on editorial registers — that *is* the register.
- **Dashboard** (`dashboard`, `data-explorer`, `status-page`): the highest-yield cut is duplicate KPI tiles. If three tiles show the same metric in three ways, keep one. Don't cut data density itself — compact is the right register.
- **Pitch deck** (`pitch-deck`, `slide-deck`): cut decorative chrome on every slide (icon tiles, gradients, decorative borders). Don't cut hero moments — a pitch deck has 2–3 slides that *should* be theatrical.

## Verify before declaring done

1. **Context still recognizable.** The artifact should still read as the context resolved by SKILL.md.
2. **Scope check.** If simplify is touching most of the artifact, stop refinement and apply SKILL.md's Hand-off output shape and Design judgment to recommend the next action.
3. **No Absolute bans in the output.** Re-grep / re-scan after the run.
4. **Each cut has a named reason.** "Removed because…" on every diff hunk. If you can't name why, put it back.
5. **Re-run the two-altitude AI slop test** from SKILL.md. After cuts, does the artifact still read as the topic's stock aesthetic? If yes, the cuts didn't reach far enough — re-walk.

## Hand off to polish

Per SKILL.md's hand-off output shape: summarise in plain markdown (not fenced) and lead with what changed.

Simplify-specific content to surface:

- **Primary strategy** used: decoration / repetition / hierarchy. Mention secondary strategies in a phrase if any were applied.
- **What was cut, as an audit trail.** Every element, paragraph, or chrome layer removed, with a one-phrase reason ("removed decorative left-border on `.callout` — wasn't carrying hierarchy"). Group by section. This is the load-bearing part: without it, simplify's cuts disappear silently and the next run surfaces the same removal questions.
- **Diff size** as a percent of the artifact.
- **Next step.** Polish raises the floor across the dimensions simplify didn't touch.

See SKILL.md `Hand-off output shape` for the shared variant rules. Simplify's refusal case is "no decoration to remove — the artifact is already minimal" — route to `{{command_prefix}}visualize polish` or `{{command_prefix}}visualize bolder` instead.
