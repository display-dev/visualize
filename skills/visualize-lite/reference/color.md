# Color

Use color for reading hierarchy, meaning, and atmosphere. Apply the resolved visual context from SKILL.md, including approved artifact-theme exceptions. Color refinement does not authorize replacing project identity or writing project tokens.

## Decide what color should do

Start with the brief and representative content. Identify settled choices, then name the open question: mood, clearer emphasis, readable text on a surface, or a supporting accent. A report may need only ink and paper; a poster may use large colored fields; an interface may also need action and state colors.

Explain alternatives through the dimensions that actually differ:

- **Character:** pale, muted, vivid, or deep. Lightness and chroma can change character without changing hue.
- **Relationships:** related hues, warm/cool tension, complements, or several accents. Hue-wheel geometry is a starting idea, not proof that colors work together or clash.
- **Distribution:** area, placement, repetition, and prominence. A small vivid mark and a full colored canvas can use the same palette but direct attention differently.

Neutral gray, tinted neutrals, white, black, red-led identities, and multiple accents are valid. Sparse accents and 60/30/10 are optional composition heuristics, not limits. A color field can establish atmosphere without encoding a data category or UI state.

## Separate colors from roles

Palette values describe available colors. Semantic roles describe their use: canvas, text, emphasis, supporting accent, atmosphere, action, state, or data. One color can serve compatible roles; one role may need different shades across surfaces and themes. Do not invent a hue for every role.

Use the existing semantic token surface. Add only roles the artifact needs; a report need not display success/error controls because its reference package includes those tokens. Keep required token fields intact when deriving a complete system.

Meanings follow context. Red can be a brand primary, a chart series, or a destructive action. Where destructive actions exist, distinguish them from ordinary actions through labels, grouping, and more than color alone. Preserve established category and state mappings. Do not reserve a hue across every artifact.

Chart scale and series decisions live in [data-viz.md](data-viz.md). Logos and factual imagery retain their approved colors unless alteration is explicitly in scope.

## Make feedback testable

“Quieter secondary” may mean lower chroma, different lightness, less area, less prominent placement, or another hue. Choose the interpretation supported by context; ask when ambiguity would change an approved choice. “Opposite” may mean a hue complement, warm versus cool, or light versus dark.

For a focused comparison, preserve settled choices and an unchanged control. With Coral primary fixed, compare a softer secondary or the same secondary covering less space; change hue only when that dimension is open. Explain the changed variable on representative content. Swatches and role labels supplement the rendered comparison, not replace it. No fixed count, harmony sequence, or palette score is required.

For an approved image, website, or artifact input, use the existing input workflow. Sampled prominence is evidence, not semantic authority: the largest region may be a background rather than an accent. Propose roles and supporting shades without silently replacing approved identity.

## Derive usable values

Preserve an existing system's color notation. For new web palettes, prefer OKLCH when adjusting lightness and chroma independently:

- **L** controls perceptual lightness, not contrast ratio.
- **C** controls chroma. Gamut depends on lightness and hue; no universal chroma ceiling is reliable.
- **H** controls hue. Equal angular spacing does not guarantee equal perceptual distinction or a successful palette.

Reuse the palette helper and existing color math for new OKLCH ramps, gamut budgets, and contrast. Near white or black, less chroma is generally available. Inspect the result rather than assuming equal numerical steps look equally spaced. Generated accent angles, neutral tints, state hues, and seed strategies are suggestions, not restrictions on approved palettes.

`palette.mjs --check` validates its supported OKLCH token surface, not taste or arbitrary CSS. For other color formats or computed colors, verify resolved pairs with existing browser contrast checks. Do not rewrite approved colors merely to satisfy a helper's input format.

## Verify actual pairings

Check the rendered foreground against its real background at the actual text size and weight:

| Content | WCAG AA minimum |
|---|---|
| Ordinary text, including small labels | 4.5:1 |
| Large text: at least 24px normal or about 18.67px bold | 3:1 |
| Visual information needed to identify controls, states, or meaningful graphics | 3:1 against adjacent colors |

Do not round failures up. Check relevant hover, focus, selection, and theme states. Logos, decorative elements, and inactive controls have specific exceptions; ordinary prose does not. Use stronger contrast for demanding viewing conditions. The seed helper retains its conservative 7:1 body-token floor; generated ramps still need rendered verification.

“Gray on color,” “blue on red,” and “yellow on white” do not fail merely because of their names. Some pairs need lightness changes or can vibrate perceptually. Check actual contrast and readability, then adjust the responsible foreground, surface, weight, or placement. For imagery, gradients, or translucent overlays, inspect the least favorable region behind the text; one sampled pixel or token pair is insufficient.

Color cannot be the only way to convey required information. Add meaningful labels, shapes, patterns, or other cues. Grayscale review can expose missing cues but does not prove contrast or color-vision accessibility. Simulate relevant vision deficiencies when judging category or state discrimination.

## Compose both themes

Design light and dark as related treatments, not mechanical inversions. Adjust foregrounds, surfaces, and accents to retain hierarchy and meaning. An accent may need a lighter, darker, or less chromatic counterpart, or may remain unchanged when it works in both contexts. Test rather than forcing a percentage change.

Black, neutral gray, and tinted dark surfaces are valid. Separate neighboring surfaces where content or interaction needs it; elevation need not invent a fixed number of panels. Recheck text, focus, overlays, and data encodings in each mode.

### Explicit theme overrides

Preserve the existing three-path token contract:

```css
:root { /* light tokens */ }
[data-theme="dark"] { /* explicit dark override */ }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]):not([data-theme="dark"]) {
    /* system dark fallback */
  }
}
```

System dark never overrides explicit light. The display.dev bar sets `data-theme` on `<html>`. Follow Explore's direction-scoping contract in comparisons so one candidate's tokens cannot recolor another.

## Apply through tokens

Use semantic tokens in authored styles. Preserve an existing primitive/semantic structure rather than creating a second token model. Relative color syntax and `color-mix()` can derive values, but their output still needs contrast and gamut checks. `light-dark()` requires an appropriate inherited `color-scheme`; theme controls must update that scheme when the function is used. Keep a verified fallback for newer CSS functions whose target support is not established.

Transparency is useful for overlays and atmosphere. It makes the result depend on underlying content; define purposeful overlay tokens and test the actual composite instead of stacking arbitrary alpha values.

## Review failures, not hue names

- A new palette silently replaces approved colors or meanings.
- Accent placement or coverage obscures hierarchy.
- A suggested tint, color count, or harmony angle becomes a mandatory gate.
- Swatches hide text, surface, or responsive failures.
- A passing token pair is reused on a different background without checking.
- State or data distinctions disappear without hue differences.
- An aesthetic finding names a hue but cannot explain a mismatch with the brief or artifact.

Unrelated SKILL.md pattern rules still apply, including gradient text. Removing hue-only refusal does not make every palette effective.

## Sources

Selected principles were adapted from [Impeccable colorize](https://github.com/pbakaus/impeccable/blob/main/plugin/skills/impeccable/reference/colorize.md) by Paul Bakaus (Apache-2.0) and [Color Expert](https://github.com/meodai/skill.color-expert/blob/main/SKILL.md) by meodai (CC BY 4.0; separate terms apply to third-party references). The procedure and wording here are adapted for Visualize; their tool requirements and full workflows are not imported. Accessibility requirements follow [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).
