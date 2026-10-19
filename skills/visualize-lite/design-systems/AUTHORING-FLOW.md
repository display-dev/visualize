# Authoring flow — end-to-end brand-style creation

The operational workflow for adding a brand-style entry to the catalog (new-brand mode) or rewriting an existing entry so its files become the catalog's own work (refresh mode). Each step carries a dispatchable subagent prompt + pre-/post-dispatch checklist.

For rules and conventions referenced from these steps — brand colours are sacrosanct, token naming conventions, pattern, dark-mode strategy, polish pass — see [`AUTHORING.md`](AUTHORING.md). This document is operational; that one is normative.

## Context: live-first, no auto-import

The catalog now uses a live-first authoring workflow. Brand-style entries are written from first-party brand surfaces, with self-authored `DESIGN.md` prose and token sidecars reconciled against the current public brand.

**Brand systems are hand-authored from the live brand.** Existing entries are refreshed through the same workflow when live surfaces drift; refreshed systems keep only live-verification metadata.

## Entry-point instruction

For one-sentence dispatch, the user-facing instruction is one of:

> Author a new brand-style entry for `<brand-slug>` at `<brand-domain>` per `AUTHORING-FLOW.md`. *(live-source mode)*

> Refresh the brand-style entry for `<brand-slug>` from `<brand-domain>` per `AUTHORING-FLOW.md`. *(refresh mode)*

> Author a new design system `<system-slug>` from the spec at `<spec-path>` and reference imagery at `<imagery-path>` per `AUTHORING-FLOW.md`. *(spec-derived mode)*

The main-session agent reads this file, identifies the mode from the instruction shape, locates the four steps below, runs the mode-appropriate pre-dispatch checklist, then dispatches the §Step 1 subagent. After each step completes and is verified, the main-session agent moves to the next step.

## Three modes

All three modes share Steps 2–4. They differ in Step 1's source: where the `DESIGN.md` content is derived from.

- **New-brand live-source mode** — the slug doesn't exist in the catalog yet and a public live brand site exists to sample. Step 1 derives the `DESIGN.md` from a Chrome MCP / WebFetch sweep of `<brand-domain>`. All four steps run. Most B2B-SaaS and consumer-brand entries land here (Stripe, Airbnb, Notion, Spotify, Cloudflare, etc.).
- **Refresh live-source mode** — the slug exists, has a public live brand site, and is being rewritten to drop third-party prose and capture drift. Step 1 re-derives from the live site. Step 2 (`tokens.css`) re-runs only if Step 1's drift findings warrant it. Step 3 (`preview-template.html`) typically doesn't re-run unless drift is structural (new component vocabulary surfaced).
- **Spec-derived mode** — the slug doesn't exist and has no public live brand site to sample. The system is a register-family invention (`bento`, `blueprint`, `brutalist`, `dithered`, `glassmorphism`, `luxury`, `paper-ink`, `riso`, `sketch`, `terminal`, `whitepaper`, `ide`) or a documented design system whose only public artefact is a spec or portfolio piece (e.g., a Superdesign-style design with no live deployment). Step 1 derives the `DESIGN.md` from spec text + reference imagery + design principles that the dispatcher provides, not from a live site. All four steps run; only Step 1's input set differs.

Spec-derived mode never has a refresh variant. The "live site changed, our `DESIGN.md` is stale" failure mode doesn't apply when the source is a frozen spec. If the spec itself is revised, that's a fresh authoring cycle, not a drift-driven refresh.

---

## Step 1 — DESIGN.md authoring

### Required reading (subagent reads first)

Read [`AUTHORING.md`](AUTHORING.md), especially:

- **"Brand colours are sacrosanct — fix the surface, not the colour"** — governs how chromatic values are described and never modified to win contrast.
- **"Token naming conventions — the two-layer contract"** — the shadcn-semantic-core vs `--brand-*` boundary, plus the forbidden-name-shape list.
- **"Verify the live brand"** — the verification posture this step operationalises.
- **"Surface selection: look past the homepage hero"** — the brand's common canvas across multiple pages, not just the homepage marquee.
- **"Selection metadata vocabulary"** — the frontmatter routing metadata that lets agents shortlist catalog references without reading every full `DESIGN.md`.

[`_template/DESIGN.md`](_template/DESIGN.md) is the structural reference. Open it to see the exact section / frontmatter / per-component-entry shape your output must follow.

### Subagent prompt (substitute and dispatch)

Copy from "Goal" through "Report" verbatim into the subagent dispatch. Substitute `<brand-slug>` and `<brand-domain>`.

#### Goal

Author a `DESIGN.md` at `visualize/design-systems/<brand-slug>/DESIGN.md`, derived entirely from live observation of `<brand-domain>` (and any other documented first-party brand surfaces you can reach). The output must be your own original prose — not a paraphrase or adaptation of any third-party design-system catalog, blog post, or pre-existing `DESIGN.md` file in this repo.

#### Constraint: no third-party catalog content

Your prose must be original — derived from the live brand, not from any catalog that already characterised the brand.

**You MUST NOT read or open:**
- `visualize/design-systems/<brand-slug>/DESIGN.md` (in refresh mode, the existing file should be moved aside before dispatch; if it's still at the canonical path, that's a bug — don't open it)
- Any other brand's `DESIGN.md` in this repo as a "reference" — cross-contamination risk
- Any file under `intra-hosting/scratch/visualize/` or similar working-doc folders
- Third-party design-system catalog content for this brand, including mirrors, archives, or web caches

**You MUST NOT search the web for:**
- `<brand> design system markdown` or similar phrases that would surface third-party imports

**You MAY use:**
- Chrome MCP tools (`mcp__chrome-devtools__*` preferred) to navigate `<brand-domain>` and brand-owned URLs, take screenshots, run `evaluate_script` for `getComputedStyle` sweeps
- `WebFetch` on `<brand-domain>` and related first-party brand surfaces (the brand's own docs site, their design-system site if they publish one — `polaris.shopify.com`, `carbondesignsystem.com`, etc.)
- In refresh mode: `visualize/design-systems/<brand-slug>/tokens.css` and `preview-template.html` — useful as post-authoring cross-checks (not as sources for prose)
- The required-reading sections of `AUTHORING.md`

If you're uncertain whether a source counts as "third-party catalog content," treat it as off-limits.

#### Process

1. **Identify the live brand entry points — sample across surface types, not just marketing.** A single marketing-surface skin is the wrong basis for canonical-canvas decisions. Most brands have multiple surfaces that may pick different polarities; the brand identity is what they ship across all of them, not what the homepage happens to render today.

   Sample across at least three surface types:

   - **Marketing surface**: `https://<brand-domain>/` plus the common secondary marketing pages — `/product`, `/pricing`, `/enterprise`, `/customers`, `/about`.
   - **Editorial / content surface**: blog, newsroom, careers — these usually render at the brand's "text-first" canvas which often differs from the marketing skin. Cloudflare ships dark marketing + white blog; Stripe ships gradient-mesh marketing + clean white docs; many brands have a similar split.
   - **Product / app surface**: dashboard, app shell, console, customer portal. Often the most polarity-aware surface (theme toggle, OS-preference detection). Requires login for most brands — sample as far as the marketing landing for the app (`/dashboard`, `/app`, `/login`) and read CSS files referenced from the landing page if the actual chrome is gated.
   - **First-party design system if published**: search for `<brand> design system site:<brand-domain>` and equivalent. If the brand publishes documented tokens with both polarities (Cloudflare's Kumo, IBM's Carbon, Shopify's Polaris, Mongo's LeafyGreen, Atlassian's, Spotify's Encore on github), **that takes precedence over the marketing-skin choice**. The marketing site is one render of the brand; the design system is what the brand ships.

   The `canonical-canvas` decision rule: light if the brand ships *only* light surfaces; dark if the brand ships *only* dark surfaces; **both** if the brand ships any mix — even one surface with a different polarity from the marketing site means `both`. Don't declare a brand single-polarity based on the marketing skin alone.

2. **Load chrome-devtools tools first — required, do not skip.** This is the single most common subagent failure on this step: `mcp__chrome-devtools__*` tools are *deferred* (not in your default context), and `mcp__claude-in-chrome__*` tools may also be deferred but more visible from system reminders. Subagents that skip this load step default to claude-in-chrome and lose persistent screenshots, breaking Step 3's ability to re-read them.

   **Run this exact `ToolSearch` call before any browser navigation:**

   ```
   ToolSearch query="select:mcp__chrome-devtools__navigate_page,mcp__chrome-devtools__emulate,mcp__chrome-devtools__take_screenshot,mcp__chrome-devtools__evaluate_script"
   ```

   Confirm the response loads schemas for all four tools. **Do NOT use `mcp__claude-in-chrome__*` instead** — even if those tools are available in your inventory, they return inline images with no `filePath` persistence, and the catalog requires persistent capture. If `ToolSearch` doesn't surface the chrome-devtools tools (some sandboxes don't ship them), skip the screenshot capture and go directly to the `WebFetch` fallback paragraph below in this step — do not substitute claude-in-chrome.

   Then capture:

   ```sh
   mcp__chrome-devtools__emulate colorScheme=light
   mcp__chrome-devtools__navigate_page url="https://<brand-domain>/"
   mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/<brand-slug>-live-light.png" fullPage=true

   mcp__chrome-devtools__emulate colorScheme=dark
   mcp__chrome-devtools__navigate_page url="https://<brand-domain>/"
   mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/<brand-slug>-live-dark.png" fullPage=true
   ```

   Repeat for at least 4 secondary surfaces.

   **If Chrome MCP is blocked** (some brands refuse headless-Chrome traffic), fall back to `WebFetch` on the same URLs. Note in §Known gaps which surfaces are screenshot-deferred.

3. **DOM-sample for actual values.** `mcp__chrome-devtools__evaluate_script` with `getComputedStyle` over the full set of distinct components — buttons, links, CTAs, pills, badges, headers, footer chips, body text. Convert hex / rgb to OKLCH (vendored culori at `visualize/scripts/vendor/culori.mjs`).

4. **Author `DESIGN.md`.** Copy `_template/DESIGN.md` and fill each section. Frontmatter, §1 Canonical canvas, §2 Palette, §3 Typography, §4 Component vocabulary, §5 Surface inventory, §6 Notes, §Known gaps.

   **§4 Component vocabulary** is the largest section. Document every distinct component pattern the brand ships — one entry per distinct pattern, not one entry per category. Walk this checklist on each sampled surface:

   - Buttons — primary CTA, secondary, ghost / outline, icon-only, destructive, link-styled. Each variant + each state.
   - Cards — content, feature, testimonial, pricing, product.
   - Forms — text input, textarea, select, checkbox, radio, switch, slider. Each with focus / error / disabled.
   - Navigation — top nav (desktop + mobile), side nav, breadcrumbs, tabs, pagination, mega-menu, footer link blocks.
   - Pricing — tier card layouts, comparison table rows, featured-tier treatment, calculator inputs.
   - Badges / chips / pills — status, count, category, filter, tag.
   - Media — image cards, video embeds, gallery thumbnails, avatar shapes.
   - Editorial — blockquote, callout, alert, banner, list styles, code blocks, inline link styles.
   - Date / time — date picker (default / selected / range / disabled), time picker, calendar grid.
   - Feedback — toast, modal, drawer, popover, tooltip, snackbar.
   - Data — table, chart wrapper, stat tile, sparkline, KPI card.
   - Brand-specific — anything the brand exposes outside the categories above. Each gets its own entry.
   
   Target 15-25 entries for a typical brand; B2B SaaS marketing sites often have 25-35; single-product brands may have 12-20. Cite each component's live source (URL + DOM selector).

   **Mark legacy components.** If a component you'd expect isn't on the live site, record it with `status: retired (last seen: <date or release>)` or `status: not-observed-<YYYY-MM>`. Don't silently omit.

5. **Expect drift, and record it.**
   - Refresh mode: if a value in `tokens.css` doesn't match the live brand, flag it in §2 under "Drift vs `tokens.css`" with live evidence and a reconciliation suggestion.
   - New-brand mode: there's no prior `tokens.css`; your `DESIGN.md` becomes the authoritative source for the brand's first `tokens.css`.

6. **Original-prose self-audit.** Re-read your draft. If a sentence uses a stock phrase that feels too polished (e.g., "the brand's voltage moment"), rewrite in your own voice.

#### Output

A `DESIGN.md` at `visualize/design-systems/<brand-slug>/DESIGN.md`. Frontmatter:

```yaml
---
slug: <brand-slug>
name: <Brand Display Name>
source: live-verified
verified-at: <YYYY-MM-DD>
verified-by: subagent-via-chrome-mcp
verified-urls:
  - https://<brand-domain>/
  - https://<brand-domain>/<surface-1>
  - https://<brand-domain>/<surface-2>
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
```

`selection.canonical_canvas` must exactly mirror `canonical-canvas`. Use only the vocabulary in AUTHORING.md; do not coin new mood or tone labels.

In refresh mode: write fresh live-verification metadata; do not carry over stale provenance blocks.

#### Report

Under 400 words: live URLs sampled (or spec-derived inputs cited), key findings per section, anything ambiguous, and (refresh mode) the cross-check against current `tokens.css`. Do NOT compare against any previous version of the file.

### Spec-derived variant (no live brand site)

When the design system has no public live brand site to sample — register-family inventions like `bento` or `brutalist`, documented designs without deployed surfaces, archived design publications — Step 1's §Process changes shape. The §Goal, §Output frontmatter (with `source: spec-derived` instead of `live-verified`), §Constraint, and §Report all hold; §Process replaces the live-capture steps with spec-derived equivalents.

**Dispatcher provides** (in the dispatch prompt or as referenced file paths):
- A spec text describing the system's principles, vocabulary, and intended register
- Reference imagery — screenshots, photographs, scans of design publications, portfolio pieces
- Optionally: a name reference (e.g., "Superdesign's High Contrast") with attribution detail for §1 of the DESIGN.md

**Process — spec-derived variant**:

1. **Read every provided input.** The spec text + reference images + any additional principles. Don't search the web for adjacent / related design systems; the inputs the dispatcher provided are the source.

2. **Skip the live-capture steps** (steps 1-3 of the live-source process). There is no `<brand-domain>` to navigate. Don't substitute another design system's live site as a proxy — that contaminates the system you're authoring with a different brand's choices.

3. **Derive the palette from the spec + imagery.** If the spec declares hex values, use those. If the spec describes the system principally through imagery, sample colours from the reference images (use image-inspection tools or note the values inline). Mark each value with its source: `Live: spec §X` or `Live: reference image temp/refs/<system>-<n>.png — visible element`. Convert hex to OKLCH via vendored culori.

4. **Derive typography + components similarly.** From the spec when declared, from imagery when not. The §4 Component vocabulary exhaustive expectation still holds — if the spec doesn't enumerate components, the author derives a reasonable vocabulary from the principles (e.g., "Brutalist register implies hard-edged buttons with no hover lift; surface elevation is hairline-only").

5. **Drift section is irrelevant** — there is no `tokens.css` to drift against in new-brand mode, and no live brand to drift away from.

6. **Original-prose self-audit still applies.** Even with a spec as input, don't paraphrase any third-party catalog's writeup of the same system. Write the prose in your own voice from the provided source materials.

**Output frontmatter — spec-derived variant**:

```yaml
---
slug: <system-slug>
name: <System Display Name>
source: spec-derived
verified-at: <YYYY-MM-DD>
verified-by: subagent
reference-materials:
  - spec: <description or path>
  - imagery:
    - <path>
    - <path>
  - principles: <optional inline description>
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
```

Replace `verified-urls` with `reference-materials`. The `verified-by` value can drop the `-via-chrome-mcp` qualifier since Chrome MCP wasn't used.

### Pre-/post-dispatch checklist (user-side)

**New-brand live-source mode**:
1. `mkdir -p visualize/design-systems/<brand-slug>`
2. Confirm folder is empty.
3. Dispatch the subagent with the prompt above.
4. After report: read the new `DESIGN.md`, verify live citations, and run `node dev-scripts/catalog-index.mjs --check` after regenerating the index if needed. Commit. Proceed to Step 2.

**Refresh live-source mode**:
1. `mkdir -p temp/design-system-originals && mv visualize/design-systems/<brand-slug>/DESIGN.md temp/design-system-originals/<brand-slug>-DESIGN.md`
2. Confirm only `tokens.css` and `preview-template.html` remain in the brand folder.
3. Dispatch the subagent with the prompt above.
4. After report: diff against the moved-aside original to confirm no verbatim sections survived, and run `node dev-scripts/catalog-index.mjs --check` after regenerating the index if needed. If clean: commit, delete the moved-aside copy, drop the brand from `visualize/NOTICES.md`'s third-party-attribution list. If contaminated: discuss, refine, retry.

**Spec-derived mode**:
1. `mkdir -p visualize/design-systems/<system-slug>`
2. Confirm folder is empty.
3. Gather the spec text + reference imagery. Place imagery under `temp/refs/<system-slug>/` or another stable path. Note all source paths.
4. Dispatch the subagent with the prompt above *plus* the spec inputs (inline text + file paths to the imagery + any additional principles). Tell the subagent explicitly: "Spec-derived mode, no live brand site. Sources are: \<spec\>, \<imagery paths\>, \<principles\>."
5. After report: read the new `DESIGN.md`, verify the citations point at the spec / imagery (not at hypothetical URLs the agent might have synthesised), and run `node dev-scripts/catalog-index.mjs --check` after regenerating the index if needed. Commit. Proceed to Step 2.

---

## Step 2 — tokens.css authoring

### Required reading (subagent reads first)

Read [`AUTHORING.md`](AUTHORING.md), especially:

- **"Brand colours are sacrosanct — fix the surface, not the colour"** — the rule that governs every chromatic token value. No darkening for contrast, no synthesizing variants.
- **"Token naming conventions — the two-layer contract"** — shadcn-semantic-core slots are untouchable; brand-extras follow the surface-named taxonomy and the forbidden-name-shape list.
- **"Dark-mode strategy"** — most brands ship single chromatic identity across modes; only canvas + neutrals reliably flip.

[`_template/tokens.css`](_template/tokens.css) is the scaffold.

### Subagent prompt (substitute and dispatch)

#### Goal

Author a `tokens.css` at `visualize/design-systems/<brand-slug>/tokens.css`, derived entirely from the palette + typography documented in the brand's `DESIGN.md` (which was authored against the live brand in Step 1).

#### Inputs

- `visualize/design-systems/<brand-slug>/DESIGN.md` — the authoritative palette + typography for this brand, with each value cited against a live source
- `visualize/design-systems/_template/tokens.css` — the scaffold carrying shadcn-core slots + brand-extras taxonomy + commented examples

#### Constraint: no synthesis

Every chromatic value in the output must trace to a `DESIGN.md` §2 Palette entry. No darker/lighter variants invented for contrast. No `--brand-<colour>-ink`, `--brand-<colour>-on-dark`, `--brand-<colour>-deep` / `-pressed` / `-N00` tokens unless the brand actually documents that ladder and `DESIGN.md` cites the source.

#### Process

1. **Read the brand's `DESIGN.md`.** Build a mental table of (token name → OKLCH value → live source). Note which values are observed-on-live vs `(synthesised)`-utility-neutrals.

2. **Copy the scaffold.** `cp visualize/design-systems/_template/tokens.css visualize/design-systems/<brand-slug>/tokens.css`. The scaffold's structure stays — shadcn-core slots → brand-extras → dark-mode block → @media block. Fill placeholders, don't restructure.

3. **Fill shadcn-semantic-core slots** in `:root` from `DESIGN.md` §2 Canvas + neutrals + Brand primary. Set the same OKLCH value on every primary-family token (`--primary`, `--ring`, `--sidebar-primary`, `--sidebar-ring`). Update the comment at the top of `tokens.css` with the brand source URL + verification date.

4. **Fill brand-extras** from `DESIGN.md` §2's documented secondary brand colours, polarity-locked surfaces, hairlines, and brand-specific lineage tokens. Surface-named only — verify against AUTHORING.md "Token naming conventions" forbidden-name-shape list before adding any token.

5. **Fill the `[data-theme="dark"]` block** — mirror the canvas + neutrals from `DESIGN.md`'s dark-mode citations. **Default chromatic brand colours stay at `:root` value** (don't override unless the brand documents a dark variant — IBM Carbon's Blue 60 → Blue 50 is the canonical example).

6. **Mirror the `@media (prefers-color-scheme: dark)` block** verbatim from the `[data-theme="dark"]` block.

7. **Run audit greps before considering the file done:**

   ```sh
   # Forbidden name shapes
   grep -nE '^\s+--brand-(red|blue|green|coral|amber|sale|success|rausch|orange|purple|violet|teal|cyan|magenta|pink|yellow|lime)-(ink|on-dark|deep|pressed|darker|lighter|N?[0-9]{3,4}|[0-9])\b' visualize/design-systems/<brand-slug>/tokens.css

   # Comment smells (contrast math justifying a value)
   grep -nE '\b(AA|WCAG|[0-9]\.[0-9]+:1|lifted (from|to)|darkened (from|to)|brighten\w* (for|to)|sub-AA)\b' visualize/design-systems/<brand-slug>/tokens.css
   ```

   Both should return empty unless a value cites a documented brand exception (Carbon-style theme swap, generic-theme tuning).

8. **Pre-flight the three known sub-AA contrast pairs.** These pairs fail in ~90% of fresh tokens.css files when not checked at this step — `_template/tokens.css` carries inline comments next to each slot warning about the trap. The fix is upstream from Step 3's detect-clean and from the contrast-fix sweep that catches the pattern after the fact; doing it here prevents both downstream costs.

   For each pair, compute the contrast ratio at the OKLCH values you set in `:root` and in `[data-theme="dark"]`:

   | Pair | Floor | Common failure | First-line fix |
   |---|---|---|---|
   | `--muted-foreground` × `--background` | 4.5:1 (body) | shadcn-default `oklch(0.55 0 0)` on near-black canvas lands ~4.17:1 | retune `--muted-foreground` (chroma ≈ 0 = utility-neutral, retunable per AUTHORING.md) until clear |
   | `--primary-foreground` × `--primary` | 4.5:1 (body) | cream-on-red (`oklch(0.93 0.03 93)` × `oklch(0.55 0.22 25)`) lands ~4.1:1 | swap `--primary-foreground` to white (utility-neutral, NOT a brand chroma) |
   | `--destructive-foreground` × `--destructive` | 4.5:1 (body) | same shape as primary | same fix |

   You can compute ratios inline in JS with vendored culori (`/Users/carl/Development/visualize/visualize/scripts/vendor/culori.mjs`) by converting OKLCH → sRGB → WCAG relative-luminance, or eyeball the OKLCH lightness gap (|L_fg − L_bg| ≥ 0.50 is a reasonable proxy for AA body on neutral-vs-neutral pairs). When a pair lands sub-AA:
   - **First** try retuning the chroma-0 utility neutral (`--muted-foreground`, `--primary-foreground`, `--destructive-foreground`) — AUTHORING.md §"Brand identity vs utility neutrals" explicitly allows this.
   - **Only if the foreground is brand-chromatic** (rare — typically chromatic foregrounds are tinted-paper registers where the chromatic value IS the brand mark), defer the fix to Step 3 where you can wrap consumers in scoped CSS custom properties or qualify them at large-text-bold floor (≥19px @ 700). DO NOT retune the brand chroma.

   Report your pre-flight findings in the §Report section: each pair, the OKLCH values, the computed ratio (or "AA-clear by lightness gap"), and any utility-neutral retunes applied.

#### Output

A `tokens.css` at `visualize/design-systems/<brand-slug>/tokens.css`. The header comment cites the brand source + verification date + the `DESIGN.md` companion file.

#### Report

Under 200 words: list of shadcn-core slot values filled, list of brand-extras tokens defined, dark-mode strategy decision (mirror :root chromatic / brand documents a swap / etc.), and the audit-grep results.

### Pre-/post-dispatch checklist (user-side)

1. Confirm Step 1 has shipped — `DESIGN.md` exists at the canonical path and has been verified + committed.
2. Confirm `_template/tokens.css` is current.
3. Dispatch the subagent with the prompt above.
4. After report: read the new `tokens.css`, verify the forbidden-name-shape grep is clean, rebuild previews (`bash dev-scripts/build-previews.sh`), screenshot-verify (`bash dev-scripts/screenshot-previews.sh <brand-slug>`), open the resulting PNGs and confirm text contrast still reads against the rebuilt surfaces — Step 2 value swaps can break contrast on the existing preview-template. Commit only after visual verification. Proceed to Step 3.

---

## Step 3 — preview-template.html authoring

### Required reading (subagent reads first)

Read [`AUTHORING.md`](AUTHORING.md) in full. The most load-bearing sections for this step:

- **"Pattern: token-surface showcase, not site clone"** — the canonical shape (header → one signature mockup → swatches → type → components → footer). The hardest rule: ONE brand-flavoured signature mockup, token demos for everything else.
- **"Content shape: Halcyon is a name only"** — Halcyon naming convention, no the host product surface references, no brand-X lift in mockup content.
- **"Dark-mode strategy"** — polarity-locked tokens, single-polarity brands, dark-canonical brands.
- **"Detect-clean checklist"** — `detect.mjs --strict` and `browser-contrast.mjs` both clean before declaring done.
- **"Polish pass"** — mechanical floor + quality dimensions before shipping.

There is no `_template/preview-template.html` scaffold — preview shells are too brand-specific for a single starter. Study 2-3 existing brand previews of similar register as compositional references (e.g., for a developer-tool brand, look at `linear-style/`, `vercel-style/`; for a consumer brand, look at `airbnb-style/`, `nike-style/`). Reference the **structural composition** — never copy prose, never copy mockup content verbatim, never use another brand's brand-flavoured signature surface.

### Subagent prompt (substitute and dispatch)

#### Goal

Author a `preview-template.html` at `visualize/design-systems/<brand-slug>/preview-template.html` that renders a token-surface showcase for `<Brand Display Name>` — one signature mockup that captures the brand's recognizability, plus token demos for everything else. The shell consumes the brand's `tokens.css` and the placeholder substitution machinery in `dev-scripts/build-previews.sh`.

#### Inputs

- `visualize/design-systems/<brand-slug>/DESIGN.md` — the brand's design vocabulary
- `visualize/design-systems/<brand-slug>/tokens.css` — the token values the template will consume
- 2-3 adjacent brand previews of similar register, for compositional patterns only

#### Constraints

- **One brand-flavoured signature mockup, plus token demos for the rest.** Not three feature sections from the brand's homepage. Pick the single surface that defines recognizability (per `DESIGN.md` §4 — the most distinct component pattern the brand ships).
- **Halcyon naming convention** for mockup content. The placeholder `__DESIGN_SYSTEM_NAME__` is substituted at build time. No real customer names, no the host product brand names in copy.
- **No brand-X lift.** Even if the brand's live site uses real product names, model numbers, customer logos — invented neutral content only.
- **Six type roles maximum** in the typography demo. The brand's `DESIGN.md` §3 lists the documented roles.
- **All colour usage routes through tokens** — `var(--primary)`, `var(--brand-canvas-night)`, etc. No literal hex / rgb / oklch in CSS unless it's a documented scoped local custom property (rare; see `spacex-style` / `ferrari-style` for legitimate uses).

#### Process

1. **Read `DESIGN.md` + `tokens.css`.** Identify: the canonical canvas (light / dark / both), the brand's voltage moment (the §4 component that's most distinct), the secondary brand colours, the polarity-locked surfaces.

2. **Pick the signature mockup.** One only. Examples from the catalog: Notion's workspace kanban, Cursor's IDE mockup, Raycast's command palette, Mistral's sunset gradient hero, PostHog's file-tree workspace, Stripe's gradient mesh hero. Whichever component pattern from `DESIGN.md` §4 carries the brand's recognizability gets one full section in the preview.

3. **Compose the canonical shape:**

   ```
   header   nav + hero (brand-flavoured decorative moment, no content sections inside)
   section  one signature mockup (the brand's defining surface)
   section  colour swatch band (token demo)
   section  surface elevation ladder (token demo)
   section  typography roles (6 roles max)
   section  component vocabulary (buttons, badges, inputs, cards in brand register)
   section  optional stats / KPI band (token demo)
   footer   brand-flavoured closing band
   ```

4. **Token discipline.** Every chromatic surface routes through a `tokens.css` var. The build script inlines `tokens.css` at render time and substitutes placeholders (`__DESIGN_SYSTEM_NAME__`, `__ROOT_ATTR__`, etc.).

5. **Iterate against the polish pass** (AUTHORING.md): focus rings, touch-target floors, reduced-motion overrides, tinted neutrals, hairline-vs-shadow elevation, sticky-overflow handling.

6. **Run detect-clean AND screenshot-verify** before declaring done:

   ```sh
   bash dev-scripts/build-previews.sh
   node visualize/scripts/detect.mjs --strict visualize/design-systems/<brand-slug>/preview.html visualize/design-systems/<brand-slug>/preview-dark.html
   node visualize/scripts/browser-contrast.mjs visualize/design-systems/<brand-slug>/preview.html visualize/design-systems/<brand-slug>/preview-dark.html
   bash dev-scripts/screenshot-previews.sh <brand-slug>
   ```

   `detect.mjs --strict`: must return `exit 0 · 0 error`.

   `browser-contrast.mjs`: `exit 0 · 0 error` is necessary but **not sufficient**. axe returns `needs-review` (warnings) on gradients, pseudo-element backgrounds, single-char glyphs, and `→` arrows — those are gaps where axe couldn't measure, not confirmations that contrast is OK. For every `needs-review` warning whose selector contains text (`h1`, `p`, button labels, `figcaption`, eyebrow / lede / headline classes), open the rendered PNG produced by `screenshot-previews.sh` and visually check the text against the actual background. Reposition mesh stops, extend bottom-fades, or add washes if text bleeds into gradient.

   `screenshot-previews.sh`: produces `/tmp/preview-shots/<brand-slug>-{light,dark}.png`. Open both and eyeball the hero region, the signature mockup, and any pseudo-element-decorated text. Decorative pseudo-elements without text content (single-char glyphs, arrow markers) are safe to leave; text-containing elements are not.

#### Output

A `preview-template.html` at `visualize/design-systems/<brand-slug>/preview-template.html`. Header carries a one-line comment citing the brand source and the signature mockup choice.

#### Report

Under 300 words: signature mockup chosen + rationale (why this is the brand's voltage moment), token discipline check (no literal hex / rgb anywhere; everything routes through tokens), detect-clean result, polish-pass items addressed.

### Pre-/post-dispatch checklist (user-side)

1. Confirm Steps 1 + 2 have shipped — `DESIGN.md` + `tokens.css` exist and are verified.
2. Dispatch the subagent with the prompt above.
3. After report: read the new `preview-template.html`, screenshot via `dev-scripts/screenshot-previews.sh <brand-slug>`, open BOTH PNGs (`/tmp/preview-shots/<brand-slug>-{light,dark}.png`), and visually verify: hero text reads against the actual rendered background (not just against axe's measurement, which skips gradients + pseudo-elements), the signature mockup matches the brand's recognizability, no text bleeds into mesh / gradient / glassmorphism surfaces, no contrast cliffs at section transitions. If contrast bleeds anywhere a text element sits, that's a fix-before-shipping. If the signature mockup misses the brand, send feedback and retry. Proceed to Step 4 only after visual verification clears.

---

## Step 4 — wire-up

Mechanical steps after the three artefacts ship. Not a subagent prompt; the main-session agent runs these directly.

1. **Add the brand to `dev-scripts/build-previews.sh`'s `DESIGN_SYSTEMS` array.** Keep the array alphabetical.

2. **Build:**

   ```sh
   bash dev-scripts/build-previews.sh
   ```

   Generates `preview.html` and `preview-dark.html` for every brand including the new one.

3. **Catalog-wide contrast check:**

   ```sh
   node visualize/scripts/browser-contrast.mjs --strict visualize/design-systems/*/preview.html visualize/design-systems/*/preview-dark.html
   ```

   Must return `exit 0 · 0 error`. If the new brand introduces errors, investigate at the brand's `tokens.css` or `preview-template.html` level — never globally relax the check.

4. **Sync mounts:**

   ```sh
   bash bin/sync-mounts.sh
   ```

5. **Commit** with explicit paths (4 files × 4 mounts = 16 paths for a new brand, plus `dev-scripts/build-previews.sh`):

   ```sh
   git commit -m "visualize: <brand-slug> — preview + tokens + DESIGN" -- \
     visualize/design-systems/<brand-slug>/DESIGN.md \
     visualize/design-systems/<brand-slug>/tokens.css \
     visualize/design-systems/<brand-slug>/preview-template.html \
     visualize/design-systems/<brand-slug>/preview.html \
     visualize/design-systems/<brand-slug>/preview-dark.html \
     hermes/design/visualize/design-systems/<brand-slug>/... \
     pi/agent/skills/visualize/design-systems/<brand-slug>/... \
     skills/visualize/design-systems/<brand-slug>/... \
     dev-scripts/build-previews.sh
   ```

   Per-brand commit cadence: one commit per brand for clean blame + revert grain.

## Refresh mode summary

For an existing brand entry:

- **Step 1 always runs** — the whole point is to author a fresh `DESIGN.md` from live. Pre-dispatch moves the old `DESIGN.md` to `temp/design-system-originals/`; post-dispatch diffs to confirm originality.
- **Step 2 runs only if Step 1 surfaces drift** — the `DESIGN.md`'s "Drift vs `tokens.css`" subsection lists discrepancies; if any are substantive (real brand-colour changes, not noise), re-author `tokens.css` per Step 2's prompt.
- **Step 3 rarely runs** — the brand's `preview-template.html` is typically still valid from the prior audit cycle. Re-author only if Step 1 surfaces structural changes (new signature surface on the live brand, retired component the preview currently demos prominently).
- **Step 4 runs** — sync mounts, commit.
- **Post-refresh attribution drop**: once `DESIGN.md` is original prose, drop the brand from `visualize/NOTICES.md`'s third-party attribution list.

## Batch authoring

When a single dispatcher cycle ships N>1 design systems (typical of spec-derived batches — a curated set of register inventions, a Superdesign import, etc.), the per-system Steps 1-4 contract still applies in full to each system. **The temptation when batching is to amortise expensive steps across systems** — run build once across the whole batch, run detect-clean once at the end, skip the per-system polish pass. Don't.

### The shortcut that doesn't work

The specific shortcut that fails: telling each per-system subagent *"Do NOT run build or detect — dispatcher runs both centrally after all N subagents complete."* The reasoning is plausible (avoid N subagents racing on `dev-scripts/build-previews.sh` and the build outputs), and it is exactly what produced the May 2026 batch where 18 of 20 systems shipped with the same shape of `--muted-foreground × --background` sub-AA error in lockstep. The error class is common (`_template/tokens.css` ships shadcn-style muted-foreground at `oklch(0.55 0 0)` which lands ~4.17:1 on near-black canvases), `detect-clean` catches it deterministically per-system, and skipping the per-subagent loop ate the only signal that would have caught it before the batch landed.

The skip saves ~30 seconds of subagent wall-clock per system. It costs an 18-system contrast-fix sweep dispatched after the fact. Net cost ~30× the original spend.

### The rule

**Each per-system subagent runs its own Step 3 detect-clean and contrast check before declaring done.** The race condition is real but the fix is not skipping the check — the fix is letting each subagent edit its `preview-template.html`, then invoking the build for *only its own slug* via a single-element `DESIGN_SYSTEMS` array override OR by inlining the render function inline-bash. Either pattern keeps the per-subagent feedback loop intact without races.

When the build-script-race risk is genuinely intractable (large N, slow disks, hooks that fight back), the fallback is **dispatch in serialized batches of 1-2 systems at a time, not full parallelism**. Slower wall-clock, same correctness.

### Pre-batch checklist

Before dispatching a batch (any N>3), confirm:

1. **Each subagent prompt includes its own Step 3 detect-clean step.** Grep your dispatch template for "do not run build" or "skip detect" — if it's there, you've already failed.
2. **Step 2 contrast pre-flight is in each per-subagent prompt.** Step 2 §8 in this doc enumerates the three pairs (`--muted-foreground × --background`, `--primary-foreground × --primary`, `--destructive-foreground × --destructive`). The single-system flow catches these; the batch flow only catches them if the per-subagent prompt requires the pre-flight explicitly.
3. **The `_template/tokens.css` is current** — it carries inline trap-warnings next to the three known sub-AA pairs. Subagents that read the scaffold (which they all do) see the warnings before they pick OKLCH values.
4. **Central Step 4 wire-up runs once at the end** (build all, sync mounts, commit). This is the only step that legitimately amortises across the batch.

### Recovery when the rule was broken

If a batch shipped with the per-subagent detect-clean skipped and `browser-contrast.mjs --strict` returns errors across multiple systems:

1. Identify the dominant error pattern (the May 2026 batch was uniformly `--muted-foreground` × `--background` at body sizes — one pattern across 18 of 20 systems).
2. Dispatch one fix-contrast subagent per affected system, in parallel — each runs the contrast check, identifies failing selectors, applies "fix the surface, not the colour" (re-route consumers to a higher-contrast token, bump font-size to qualify large-text floor, retune chroma-0 utility neutrals). Brand chroma stays sacrosanct.
3. Central rebuild + catalog-wide contrast check.
4. Manual surgical fixes for the long tail of errors detect-clean still surfaces.

This is the recovery path. Use it when you've already broken the rule. Use the rule (each subagent runs its own check) when you can.
