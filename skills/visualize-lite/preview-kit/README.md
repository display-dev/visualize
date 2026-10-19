# preview-kit

A standardised token-surface preview rendered against every design system's `tokens.css`. Use it to eyeball palette, type, density, radius, shadow, and chart palette across reference design systems and future imports without authoring a fresh artifact each time.

## Files

- `template.html` — the canonical preview page. One markup, placeholder markers, no per-design-system handwriting.
- `fixture-styles/` — preview-only CSS used by this kit and fixtures. It is not an artifact component library.
- `README.md` — this file.

Generated outputs live next to each design system:

```
design-systems/<name>/preview.html       light variant (data-theme="light" on <html>)
design-systems/<name>/preview-dark.html  dark variant  (data-theme="dark"  on <html>)
```

## What the preview exercises

| Region            | Tokens / surfaces surfaced |
|-------------------|-------------------------------|
| Topbar + sidebar  | `--background`, `--border`, `--sidebar-*`, `--font-display`, navigation hover/active states |
| Hero + KPI row    | `--text-display`, `--leading-tight`, `--font-display`, numeric emphasis |
| Colour swatches   | 15 chips: surface · action · state · edge · chart pairs |
| Typography scale  | Display / heading / title / body / label / mono — drawn from `--text-*` and `--font-*` |
| Interface samples | Buttons, badges, callouts, cards, tables, inputs, a static-open modal demo |
| Chart palette     | Chart.js bar chart driven entirely by `--chart-1` … `--chart-5` |
| Prose             | `h2` / `h3` / `p` / `ul` / `blockquote` / inline + block code |
| Footer            | Wordmark + regeneration hint |

Everything renders against the design system's tokens. No hard-coded colours in the shell — if a swatch looks wrong, the bug is in the tokens.

## How the build works

`dev-scripts/build-previews.sh` walks the curated design-system list and renders the template once per variant per system:

```
template.html  +  design-systems/<ds>/tokens.css  +  preview-kit/fixture-styles/*.css
       │                       │                            │
       └── three substitutions per render ──────────────────┘
              ↓
      design-systems/<ds>/preview.html
      design-systems/<ds>/preview-dark.html
```

Three placeholder markers are substituted at build time:

| Marker | Where | Replaced with |
|---|---|---|
| `/* __TOKENS_PLACEHOLDER__ */` | Inside the first `<style>` block | The design system's `tokens.css` content |
| `/* __COMPONENTS_PLACEHOLDER__ */` | Inside the second `<style>` block | Legacy marker name; replaced with preview-only CSS from `preview-kit/fixture-styles/` |
| `__DESIGN_SYSTEM_NAME__` | Anywhere on a line | The design system's directory name |
| `__ROOT_ATTR__` | On the `<html>` tag | `' data-theme="light"'` for `preview.html`, `' data-theme="dark"'` for `preview-dark.html` |

The two CSS-block placeholders are matched only when they appear as the entire content of a CSS comment on their own line (whitespace tolerant). That keeps any literal mention of the markers inside `<pre>` code samples from being substituted by accident.

### Both previews force a mode

`preview.html` carries `data-theme="light"` and `preview-dark.html` carries `data-theme="dark"`. Both force a specific mode against the viewer's OS preference. If you leave the attribute off, every design system's `:root:not([data-theme="light"]):not([data-theme="dark"])` rule inside `@media (prefers-color-scheme: dark)` would silently flip the "light" preview to dark on a dark-OS viewer, which defeats the visual-verification purpose.

## Commands

```sh
# Regenerate all previews after editing template.html, fixture styles,
# or a design system's tokens.css.
dev-scripts/build-previews.sh

# Freshness gate — exit 1 if committed output does not match generated.
# Run by CI; do not hand-edit the generated previews.
dev-scripts/build-previews.sh --check
```

CI (`.github/workflows/ci.yml`) runs the `--check` form. Any drift between committed previews and regenerated output fails the build.

## Fixture previews

The preview kit proves design-system tokens across one broad token page. Fixture previews render targeted pattern and shell examples from `visualize/fixtures/manifest.json`.

```sh
# One fixture/design-system pair.
dev-scripts/build-template-previews.sh --fixture patterns/table.html --design-system swiss --mode light

# All manifest fixtures against one design system.
dev-scripts/build-template-previews.sh --manifest --design-system clean

# Curated smoke matrix across pattern and shell fixtures.
dev-scripts/build-template-previews.sh --matrix dev-scripts/template-preview-matrix.json
```

Outputs are standalone HTML files under `temp/template-previews/<fixture>/<design-system>/<mode>.html`. They are gitignored by the repo-level `/temp/` rule; commit the matrix and tooling, not the generated matrix.

The README collage uses the same preview outputs:

```sh
dev-scripts/build-templates-showcase.sh --screenshot
```

## Extending

**Add a section to the preview.** Edit `template.html`. Stay inside the existing `<main class="content">` block and use only design-system tokens for colour. Regenerate.

**Add a design system.** Drop a `design-systems/<new-name>/` directory with `DESIGN.md` and `tokens.css`. Then add `<new-name>` to the `DESIGN_SYSTEMS` array in `dev-scripts/build-previews.sh` (alphabetical) and regenerate. The list is curated on purpose — auto-discovery would mask a missing entry, since the freshness gate only checks design systems the script knows about.

**Add fixture styling.** Drop a small CSS file under `preview-kit/fixture-styles/` only when the preview or a committed fixture needs it. This CSS is preview scaffolding, not a reusable component API for artifacts.

## W5 alignment

The W5 `[data-theme]` migration has landed (`engineering/adrs/2026-05-20-data-theme-one-shot-migration.md`, `scratch/visualize/plan-stitch-alignment.md` §W5). This kit's outputs use the attribute shape; every design system's `tokens.css` carries `[data-theme="dark"]` as the dark selector and the OS-fallback :not chain inside the media query.
