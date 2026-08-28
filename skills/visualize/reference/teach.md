# `teach` — bootstrap the brand profile

Before following the instructions below, apply the shared rules in SKILL.md.

`teach` writes `DESIGN.md` + `PRODUCT.md` at the project root, plus a sidecar `tokens.css`, so every artifact reads as the same brand. `DESIGN.md` follows Google Stitch's canonical format — YAML frontmatter carrying design tokens, then a six-section markdown body. Conversational flow across four input modes; the agent offers each, the user opts into the ones that apply.

**`DESIGN.md` is a shared, industry-standard file — this skill does not own it.** The Stitch `DESIGN.md` format is read by multiple tools (and humans), a project may already maintain one, and the product's own surfaces (app, website) consume the same brand. Author it as tool-agnostic brand doctrine: never write skill-internal references into it — Absolute-ban numbers, "generated artifacts" phrasing, render-pipeline notes — and on re-runs preserve anything another tool or human added.

Don't assume; ask. Each input mode is opt-in. Don't sniff, fetch, walk, or write without confirmation.

## Procedure

1. **State the goal.** "I'll set up `DESIGN.md` + `PRODUCT.md` at the project root, plus a sidecar `tokens.css`, so every artifact reads as your brand. I'll walk through a few sources — say skip to any you don't want."

2. **Codebase sniff** *(optional, ask first)*. If the project has Tailwind / CSS-token / framework / logo signals, offer: "Want me to scan your codebase for design tokens, fonts, and logo paths?" If yes:

   ```sh
   node $SKILL_DIR/scripts/teach.mjs --json
   ```

   The script returns detected signals (Tailwind config tokens, CSS custom properties, font imports, logo paths, framework + UI library guesses). Read the JSON; carry forward whatever's confident. Don't surface the raw blob to the user.

3. **Live-site capture** *(optional, ask first)*. If a homepage URL exists (in `package.json#homepage` or `#repository`, README, or the user names one): "Want me to pull colors, fonts, logo, and voice from `<url>`?" If yes, use the agent's `WebFetch` to read the page; extract palette (eyeball-best-guess from inline styles + obvious tokens), heading + body fonts, voice register (tone, sentence shape, vocabulary). A heavier Playwright-backed `scripts/brand-capture.sh` remains deferred; `WebFetch` is sufficient for the brand surfaces visible in static HTML.

4. **Existing artifacts** *(optional, ask first)*. If the project already has rendered output (`dist/`, `public/`, `out/`, `static/`, any `*.html` at root): "Want me to look at what you've already shipped to extract recurring visual moves?" If yes, walk those directories; read 3-5 representative HTML files. Pull recurring decisions: actual fonts in use, color stack, spacing rhythm, header/footer treatments, voice in copy.

5. **Conversational fill-in.** For each `DESIGN.md` + `PRODUCT.md` field the prior steps didn't cover (or surfaced ambiguously), ask directly. Examples: "What's your primary CTA color?" / "Who's the typical reader: engineers, execs, mixed?" / "Formal or casual register?" / "Logo lives where, or should I generate a wordmark?" Batch related questions; one ask per field if the answer affects others. For the design tokens, follow the Design system derivation procedure below.

6. **Show the draft, confirm before writing.** Render the proposed `DESIGN.md` + `PRODUCT.md` + sidecar `tokens.css` in chat. Ask: "Anything to change before I write these?" Apply requested edits. Only after explicit yes do you write the files.

7. **Offer the AGENTS.md auto-trigger block** *(optional, ask first)*. "Want me to append a one-liner to your `AGENTS.md` so any agent loading the project knows visualize is the design system?" If yes, append a short block citing the brand profile and the visualize skill. If no, skip.

## Design system derivation

During teach, the brand's design tokens are derived for the project rather than stored as a theme pointer. Applying a reference to one artifact instead follows SKILL.md's Artifact themes contract. The design systems in `visualize/design-systems/` (native register-family references plus brand-style imports) are reference examples the derivation borrows from. Each one's `tokens.css` (colorimetric structure) + `DESIGN.md` (Stitch YAML frontmatter + 6-section body, with section 1 and section 6 carrying affordance prose) teaches the agent a calibrated example for one register family or brand voice.

### Step 1: pick reference design system(s)

If the project's brand voice resembles one of the register-family design systems, read that one's `DESIGN.md` + `tokens.css` as the closest reference during derivation; otherwise use Clean as the structural starting point. Brand wins — the design system reference is a calibrated example to borrow moves from, not a template to copy.

Derive references from voice:

1. **Personality words.** What 3-5 adjectives describe the brand? ("Sharp, technical, opinionated" reads Clean-class. "Warm, narrative, considered" reads Editorial. "Raw, direct, unembellished" reads Brutalist.)
2. **Physical experience.** What does using the product feel like? ("Reading a well-crafted dev tool" reads IDE-inspired. "Browsing a thoughtful magazine" reads Editorial. "Wiring up something at a workbench" reads Blueprint.)
3. **Anti-references.** What does the brand *not* want to look like? Eliminates design systems from consideration.

Read the chosen reference's `design-systems/<name>/DESIGN.md` + `design-systems/<name>/tokens.css`. The DESIGN.md carries the calibrated palette / type scale / radius / component vocabulary in YAML, plus prose (sections 1 and 6) that names the affordances the design system blesses (Paper-ink's drop-cap + small-caps section labels; Brutalist's uppercase + hard-drop tiles; Console's status-dot KPI cards + traffic-light coding). The tokens.css is the CSS form templates read at render time. Both are inputs to the derivation, not blueprints to copy wholesale.

### Step 2: derive the brand's Stitch DESIGN.md + tokens.css

Compose the brand's design from:

- **Reference design system's structure.** Copy the token slugs, scale ratios, dark-mode handling shape.
- **Brand's captured palette.** `--primary`, `--destructive`, `--background` / `--foreground` surface temperature override the reference colors.
- **Brand's fonts.** `--font-display`, `--font-sans`, `--font-mono` override the reference font tokens. If the brand doesn't name a separate display face, default `--font-display: var(--font-sans)` (the convention across the catalogue) — unless the reference design system itself splits display from body (Editorial / Paper-ink / Whitepaper run serif display via `--font-display: var(--font-serif)`; Terminal runs mono display via `--font-display: var(--font-mono)`).
- **Voice-driven overrides.** Radius (luxury → 0; playful → 16+; restrained → 6–8), spacing rhythm (generous for editorial; tight for ops; chunky for playful), motion presets (subtle for restrained; expressive for playful) where the brand register demands it.

Result: brand-specific tokens in shadcn-semantic shape, expressed as Stitch YAML frontmatter (machine-readable) at the top of `DESIGN.md` plus a sidecar `tokens.css` (CSS form for templates to read). Hold the draft for step 6 of the procedure.

### Token-delta check

After deriving the tokens, name which diverged from the reference design system and the specific brand cue forcing each change. Examples:

- "Radius 0.5rem → 0: brand reads sharp, austere, no-flourish."
- "Display clamp 4.5rem → 3rem: audience reads on dense desktops, not projection."
- "Font-sans Geist → Cormorant Garamond: editorial voice demands a transitional serif."
- "Spacing 1rem → 1.5rem: brand wants generous reading rhythm for long-form prose."

If only palette + fonts diverged (radius, spacing, type scale, motion are byte-equal to the reference), state that explicitly: "structure matches the reference cleanly; brand identity comes from palette + font overlay." Don't manufacture structural divergence that isn't there, but don't skip the check either — surface the derivation reasoning in step 6 so the user can verify before write.

This guard prevents the failure mode where custom-by-default silently becomes palette-swap-by-default. A brand with a strong voice should have *some* divergence beyond palette + fonts; if nothing else diverged, that's worth flagging to the user ("the reference design system fits this brand cleanly — is that the intent?").

### What goes into DESIGN.md (and the sidecar `tokens.css`)

`DESIGN.md` follows Google Stitch's [canonical DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/): YAML frontmatter carrying machine-readable design tokens, then a six-section markdown body. The worked exemplar is `design-systems/clean/DESIGN.md`.

**YAML frontmatter** (the machine-readable layer; what Stitch's linter validates and what other DESIGN.md-aware tools parse):

```yaml
---
name: <Brand title>
description: <one-line tagline>
colors:
  # shadcn-semantic slug names — keep these as-is. Templates read var(--background) etc.
  background: "oklch(...)"
  foreground: "oklch(...)"
  card: "oklch(...)"
  card-foreground: "oklch(...)"
  primary: "oklch(...)"
  primary-foreground: "oklch(...)"
  # ...full surface (secondary, muted, accent, destructive, border, input, ring,
  # chart-1..5, sidebar tokens — light-mode values only; dark goes in sidecar)
typography:
  display:
    fontFamily: "..."
    fontSize: "clamp(...)"
    fontWeight: 600
    lineHeight: 1.2
  # ...one entry per role (display, heading, title, body, label, mono)
rounded:
  sm: "..."
  md: "..."
  lg: "..."
  xl: "..."
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  # Stitch's 8-prop subset: backgroundColor, textColor, typography, rounded,
  # padding, size, height, width. Token refs use {colors.X} / {rounded.Y} / {typography.Z}.
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  # ...button-primary-hover, button-secondary, card, input-text, nav-link, nav-link-hover
---
```

**The YAML carries Stitch's parseable subset; the sidecar carries the full template surface.** The YAML's `colors` / `typography` / `rounded` / `spacing` / `components` keys map to the Stitch schema, and component sub-tokens are limited to Stitch's 8-prop set (`backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`). Everything templates read beyond that — the `--text-*` type scale, `--leading-*`, `--shadow-*`, `--motion-*`, `--font-display`, `--tracking-*`, and any per-component CSS the 8-prop subset can't hold — lives in the sidecar `tokens.css` only. Don't push them into the YAML (Stitch's linter rejects keys outside the schema); don't omit them from the sidecar (templates depend on them).

**Markdown body** (the prose layer):

Six numbered sections, exact order, exact section names (Stitch parsers depend on the literal headers). Optional evocative subtitles allowed (`## 1. Overview: The Editorial Sanctuary`).

1. `## 1. Overview` — Creative North Star in quotes + 2-3 paragraph aesthetic philosophy + Key Characteristics bullet list. State what the design explicitly rejects (anti-references).
2. `## 2. Colors` — palette grouped Primary / Neutral / State / Chart, with 1-3 Named Rules (`**The X Rule.** [doctrine]`).
3. `## 3. Typography` — font declaration + character paragraph + Hierarchy list + Named Rules.
4. `## 4. Elevation` — flat-by-default OR shadow vocabulary + Named Rules.
5. `## 5. Components` — Buttons / Cards & Containers / Inputs / Navigation / Chart Palette per-component descriptions.
6. `## 6. Do's and Don'ts` — Do: / Don't: bullets, forceful and concrete. Carry PRODUCT.md's anti-references through as named Don'ts. State each rule as brand doctrine in its own right — never cite this skill's Absolute-ban numbers (`BAN 1`…) or any tool-internal reference; the file is tool-agnostic (see intro).

**Sidecar `tokens.css`** (the CSS form templates read at render time):

A standard CSS file at the project root carrying every token the YAML lists plus the surface templates use that's beyond Stitch's 8-prop component subset — `--chart-*`, sidebar tokens, `--text-*` scale, `--shadow-*` scale, `--font-*` stacks. Three required selector blocks for mode handling: `:root` (canonical light), `[data-theme="dark"]` (explicit-dark override), and `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]):not([data-theme="dark"]) }` (raw-HTML OS-dark path). Match the surface enumerated in the chosen reference's `design-systems/<name>/tokens.css`.

**Motion tokens are brand-specific.** Reference design systems don't ship `--motion-*` tokens — motion stance lives at the brand level, not the register level. When the brand specifies a motion posture (zero / restrained / expressive), encode it as `--motion-duration-*` + `--motion-ease` in the sidecar (concrete patterns: no-motion → `0ms` / `linear`; restrained → `150ms` / `cubic-bezier(0.16, 1, 0.3, 1)`; expressive → `300–400ms` / spring-like ease). Add a `@media (prefers-reduced-motion: reduce)` override block whenever any motion exists.

**The three blocks are non-negotiable:**

- `:root` carries canonical light tokens.
- `[data-theme="dark"]` overrides to dark when the chrome toggle or any explicit `[data-theme="dark"]` attribute on `<html>` fires.
- The `prefers-color-scheme: dark` media query carries the duplicated dark tokens for the raw-HTML path (no chrome JS, no `[data-theme]` attribute set by the bootstrap). The `:root:not([data-theme="light"]):not([data-theme="dark"])` chain preserves an explicit `[data-theme="light"]` against OS-dark and prevents the media query from re-firing when explicit-dark is already in play.

If only `:root` is derived, OS-dark users see white-flashed renders when viewing the artifact raw. Don't ship partial.

**Required token surface (as a floor, not a ceiling):** match the surface enumerated in `design-systems/<reference>/tokens.css`. Templates reference `--chart-*`, `--spacing`, `--radius-*`, `--font-display`, motion tokens, and more beyond palette + fonts. Partial sidecars silently degrade — read the reference's `tokens.css` end-to-end and ensure every named token in the file has a value in your derived sidecar, in both `:root` and the two dark blocks. The reference is the *minimum* surface; brand-introduced tokens (motion presets per the section above; label-slot splits like `--font-label` when both display and body are serif; per-component CSS the 8-prop subset can't hold) get added on top.

Every render command (`/visualize <topic>`, `polish`, `bolder`, `quieter`, `simplify`, `animate`) reads the YAML frontmatter + sidecar at render time and inlines the CSS-form tokens into the artifact's `<style>` element.

### Why custom-by-default

Don't pick from a fixed-menu of design systems — picking converges to Clean / Editorial / IDE across most projects regardless of brand. Derive directions from voice. Custom-by-default produces brand-specific tokens for every project; the reference design systems encode design judgment for the derivation to borrow from, not options to copy. The brand's tokens are always the brand's, derived from whichever reference is closest plus voice overrides on top.

## Inverse test on brand voice

Before showing the draft `PRODUCT.md`, run an inverse-test pass on the brand voice the agent assembled. Ask the user:

> Describe your page the way a competitor would describe theirs. If that sentence also fits the modal landing page in your category, the brand is reading as generic and we restart from a sharper voice.

If the description does fit the modal page, return to step 5 and dig for what's specific to this brand: anti-references, sentence structure, vocabulary moves, technical depth, what the brand *won't* do. The goal is a voice the agent can't generate from category-default training; if the modal description still applies, the agent will keep generating modal output.

## Re-runs

If `DESIGN.md` + `PRODUCT.md` + `tokens.css` already exist, default to refresh-mode: ask which sections to update, don't overwrite wholesale. Same conversational shape; inputs are deltas, not greenfield. Phrasings like "refresh my brand", "we changed our colors", or "update the brand profile" land here.

Edit deltas only; never regenerate the file wholesale. Preserve frontmatter keys, sections, or prose another tool or human added — even ones this skill wouldn't emit. The skill authors and reads `DESIGN.md`; it does not own it.

## Out of scope for `teach`

- No silent scans, fetches, or file mutations. Every action is opt-in.
- Artifact theme application is not teach. Teach derives and confirms concrete project tokens before writing the profile; choosing a reference for one artifact does not authorize those project writes.
- No publishing. `publish` is a separate command.
