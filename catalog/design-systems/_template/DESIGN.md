---
slug: <brand-slug>
name: <Brand Display Name>
source: live-verified
verified-at: <YYYY-MM-DD>
verified-by: <agent-or-author>
verified-urls:
  - https://<brand-domain>/
  - https://<brand-domain>/<surface>
canonical-canvas: <light | dark | both>
selection:
  mood: [<mood>, <mood>]
  tone: [<tone>, <tone>]
  formality: <low | medium | high>
  density: <low | medium | high>
  canonical_canvas: <light | dark | both>
  best_for: |
    <one sentence describing where this system is the right reference>
  avoid_for: |
    <one sentence describing where this system is the wrong reference>
---

# <Brand Display Name>

## §1 Canonical canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| <surface name> | <url> | <colour + role> | <one-line observation> |
| <surface name> | <url> | <colour + role> | <one-line observation> |

## §2 Palette

Each entry: token name, OKLCH value, hex equivalent, and a live citation (URL + DOM selector or visible element).

### Brand primary

- `--primary`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector or element>`.
- `--brand-primary-<lineage>`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector or element>`.

### Documented secondary brand colours

- `--brand-accent-<name>`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector or element>`.

### Canvas + neutrals

- `--background`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector>`.
- `--foreground`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector>`.
- `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--secondary`, `--secondary-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring` — observed values with citations. Mark `(synthesised)` on any slot value that doesn't have a direct live observation.

### Polarity-locked surfaces

Tokens that stay fixed across `:root` and `[data-theme="dark"]`:

- `--brand-canvas-night`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector>`.
- `--brand-on-dark`: `oklch(L C H)`. Live: `<url>` — `<selector>`.

### Hairlines / dividers

- `--brand-hairline-soft`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector>`.
- `--brand-hairline-strong`: `oklch(L C H)` (= `#hex`). Live: `<url>` — `<selector>`.

### Drift vs `tokens.css`

List any value in `tokens.css` that does not match what the live brand currently ships. Mark each with the live evidence and a reconciliation suggestion.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---|---|---|---|---|
| Display | <font> | | | | |
| Heading | <font> | | | | |
| Title | <font> | | | | |
| Body | <font> | | | | |
| Caption | <font> | | | | |
| Mono | <font> | | | | |

Notes on custom variable axes, display-only weights, or letter-spacing patterns observed across surfaces.

## §4 Component vocabulary

One entry per distinct component pattern observed across the sampled surfaces. Repeat the block below for each. The list is exhaustive of what's deployed — not a category summary.

### <component-name>

**Status:** `current` | `retired (last seen: <date or release>)` | `not-observed-<YYYY-MM>`
**Live source:** `<url>` — `<DOM selector or visible identifier>`
**Description:** <observed shape — size, radius, fill, border, padding, internal hierarchy. Original prose from observation; do not invent properties that weren't sampled.>
**States:** <each state the brand actually exposes — `default`, `hover`, `pressed`, `focus`, `disabled`, `loading` — with the observed value for each>

### <next component>

…

## §5 Surface inventory

The URLs sampled in this cycle, with a one-line note on what each surface contributes to the design system understanding.

- `<url>` — <one-line: which components and surfaces this URL anchors>

## §6 Notes

Brand-specific patterns worth flagging for future authors. Examples of the kind of thing that belongs here:

- Polarity locks (surfaces that don't flip with theme).
- Accepted sub-AA contrast that the brand itself ships (and why — wordmark, logo, single-character glyph).
- Single-chromatic-identity-across-modes vs documented theme swap.
- Monochrome conventions (star ratings as ink not gold, link colour matching body, etc.).
- Brand-X-lift content to avoid when authoring previews (model names, customer names, region-specific copy).

## §Known gaps

Surfaces not reached this cycle and what would need to access them — login-walled, region-locked, Cloudflare-challenged, mobile-only, behind-a-flag, etc.
