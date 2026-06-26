# Authoring per-system preview-templates

A companion reference for adding a custom `preview-template.html` to a design system under `visualize/design-systems/<slug>/`. Pairs with the "Adding a per-system preview-template" section in [`CONTRIBUTING.md`](../../CONTRIBUTING.md), which carries the file-drop + placeholder + build-script details. This doc covers what makes a good shell: pattern references, dark-mode strategy, and the detect-clean checklist.

**For the end-to-end workflow to add a new brand or refresh an existing entry — including dispatchable subagent prompts for each step — see [`AUTHORING-FLOW.md`](AUTHORING-FLOW.md).** This document covers the rules and conventions those steps reference: pattern, brand colours sacrosanct, token naming, dark-mode strategy, polish pass.

## Pattern: token-surface showcase, not site clone

Each per-system shell is a **token-surface showcase rendered on Halcyon-themed neutral content** — not a clone of the brand's live marketing page. The single hardest rule:

> **One brand-flavored signature mockup, plus token demos for everything else.** A preview with three or more page-shape sections from the brand's homepage (workspace mockup + feature card grid + assistant banner + CTA card) is a re-skin, not a showcase. Pick the *one* surface that defines the brand's recognizability (Notion's workspace kanban, Cursor's IDE mockup, Raycast's command palette, Mistral's sunset gradient hero, PostHog's file-tree workspace, Stripe's gradient mesh hero). Everything else is token demos — color swatches, surface ladder, typography roles, component vocabulary, optional stats band — plus brand-flavored decorative bookends (hero + closing band).

The canonical shape:

```
header   nav + hero (brand-flavored decorative moment, no content sections inside)
section  one signature mockup (the brand's defining surface, ONE only)
section  color swatch band (token demo)
section  surface ladder (token demo)
section  typography roles (token demo)
section  component vocabulary (token demo)
section  brand-flavored decorative closer (optional — cream interlude, sunset stripe, etc.)
footer   standard
```

Sections to avoid as page-shape clones:

- **Customer-logo strips** — never include. Lifts brand-X's actual customer logos OR fakes a customer-validation moment that doesn't belong in a token preview.
- **Feature card grids** ("3 features with icons + headlines + body") — generic AI-landing slop. Replace with color/surface/type/component demos.
- **Marketing-copy assistant banners** ("Ask your on-demand assistants") — clones brand-X's marketing surface.
- **CTA cards / closing CTAs** ("Get started with Halcyon") — page-marketing-shape. Use a brand-flavored decorative band instead.
- **Pricing tables** — see the "Pricing details: never the host product's surface" rule below.
- **Deployed-in-production customer-story bands** — clones brand-X's customer-proof pattern.

**Pattern reference templates** — read at least one before authoring:

| Template | Notable for |
|---|---|
| `stripe-style/preview-template.html` | Canonical token-showcase shape — gradient-mesh hero + stats + colors + type + components + cream interlude + footer. NO customer logos, NO feature cards, NO pricing, NO CTA card. |
| `claude-style/preview-template.html` | Multi-surface (cream → coral callout → dark code mockup → dark footer). |
| `editorial/preview-template.html` | Minimal native pattern at 238 lines if the brand calls for restraint. |
| `mistral-ai-style/preview-template.html` | The session 2026-05-23 rework — sunset hero (signature) + color swatches + surface ladder + pricing (genericized) + type/components + sunset closing stripe (signature). |

Don't reuse real product copy from the brand's live site. Headlines like "Edge revenue, settled at the close of business." (Stripe register) or "An editorial canvas for agent-assisted work." (Claude register) are brand-flavored aphorisms on Halcyon content — that's the bar.

### Pricing details: never the host product's surface

If a preview includes pricing (which is borderline page-marketing-shape — consider dropping entirely), the tier names, prices, and feature lists must NOT reveal the host product's actual product surface:

- **Tier names**: don't use the host product's literal Free / Solo / Pro / Enterprise. Use abstract: Hobby / Team / Org-wide, or Personal / Standard / Custom, or genuinely brand-specific names.
- **Prices**: don't use the host product's $49. Either omit a number (use "Free / Standard / Custom") or use clearly illustrative values that vary across brands.
- **Feature lists**: NEVER use the host product's actual tier limits:
  - ❌ "1 GB / 10 GB / 100 GB storage" (the host product's storage ladder)
  - ❌ "1 user / Up to 10 users / Unlimited users" (the host product's seat model — though the host product is per-workspace not per-seat, the per-user ladder is still recognizable)
  - ❌ "Google + Microsoft SSO" + "SAML + SCIM" + "Audit log" + "Custom domains" as the Pro/Enterprise differentiators (the host product's exact tier features)
  - ✅ "Personal use" / "Team workspaces" / "Org-wide deployment"
  - ✅ "Standard quota" / "Increased quota" / "Custom quota + region"
  - ✅ "Best-effort support" / "Priority support" / "Dedicated success"
  - ✅ "Production SLA" / "Procurement-ready paperwork" (generic-enterprise-shape)

If the brand's actual pricing tier names and features are recognizable (Notion's Free / Plus / Business / Enterprise; Cursor's Hobby / Individual / Teams; Raycast's Free / Pro / Pro for Teams) — also don't use those. They're lifts (per the "no brand-X verbatim content" rule).

Generic-SaaS-shape pricing that resembles neither the host product nor the brand-X site is the only safe shape. **When in doubt, drop the pricing section entirely** and replace with another token demo (extra color swatches, expanded component vocabulary, a brand-signature decorative element).

## Verify the live brand — DESIGN.md may have drifted

`DESIGN.md` is a point-in-time live verification. The brand can evolve after verification: new default color scheme, different CTA register, redesigned surfaces, renamed components. Cursor's `DESIGN.md` documents `button-primary` as Cursor Orange, but cursor.com today uses dark-ink `button-download` as the actual primary CTA — orange is wordmark-only ("used scarcely"). Notion's `DESIGN.md` documents the navy hero band as the homepage signature, but five of six documented pages use white/cream canvas. Both gaps are silent in the spec; visible in the live brand.

**Always capture the homepage in both light and dark browser preferences** — sites with both modes will misread as dark-canonical (or vice versa) if you only sample one:

```sh
mcp__chrome-devtools__emulate colorScheme=light
mcp__chrome-devtools__navigate_page url="https://<brand>.com"
mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/<brand>-live-light.png" fullPage=true

mcp__chrome-devtools__emulate colorScheme=dark
mcp__chrome-devtools__navigate_page url="https://<brand>.com"
mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/<brand>-live-dark.png" fullPage=true
```

**When you find drift**, override the tokens / template to match the live brand. Document the divergence in a comment inside `tokens.css` at the override site so the next agent knows why the file disagrees with `DESIGN.md`. Don't edit `DESIGN.md` itself — frontmatter preserves the upstream import per the gotcha at the bottom of this doc. Intentional drift, surfaced and signed.

## Brand colours are sacrosanct — fix the surface, not the colour

A brand colour that fails AA in a given surface is not a colour bug, it's a surface bug. The OKLCH values in `tokens.css` come from `DESIGN.md` (or from the live-brand override you just signed in) and *are* the brand identity. Do NOT:

- Lift / darken / retint `--primary`, `--accent`, or any chromatic `--brand-*` token in `:root` or `[data-theme="dark"]` to win contrast. Ferrari's Rosso Corsa, Stripe's purple, Notion's link blue, PostHog's stat-card accents, Nike's red/green, MongoDB's pressed-green are not yours to retune.
- Synthesise variant tokens (`--brand-X-ink`, `--brand-X-on-dark`, `--brand-eyebrow-ink`) that hold the brand colour at a lifted / darkened lightness — just so the brand colour can be used as text on dark where it would otherwise fail. That's the same mistake one indirection later: you've still changed the brand's deployed colour, the new token name just hides it.

**The fix is the surface.** Re-home the consuming element to `--foreground` (white on dark, near-black on light), or route to a documented secondary brand colour (Ferrari Cavallino yellow, Notion's brand-charcoal, etc.). If the brand doesn't use that colour as text on dark on its live site, the preview shouldn't either.

**Brand identity vs. utility neutrals.** Lifting near-zero-chroma gray utility tokens for AA is fine — `--brand-muted-soft`, `--brand-mute`, `--brand-stone`, `--brand-slate`, `--brand-ash`, `--brand-ink-tertiary/subtle/mute-N`, `--brand-on-dark-faint`, `--primary-foreground` swaps from white→dark when the primary is light. They're muted body-text neutrals or contrast-pair choices, not brand identity. The boundary: chroma > ~0.05 = brand identity, hands off; chroma ≈ 0 = utility neutral, retune for AA as needed.

**Verify the live site before treating a contrast failure as "needs a brighter X."** Open the brand's website with `mcp__chrome-devtools__*` and look at where they actually put that colour. Ferrari Rosso Corsa is exposed as `--f-color-accent-100` and a gradient stop, never as body text on dark — we discovered this only after first lifting `--primary` (wrong) then synthesising `--brand-red-ink` (also wrong); the clean fix was to route eyebrows / hover / standings highlights to white and Cavallino yellow instead. The same audit applies before you reach for any brand-colour modification.

**When a contrast failure persists after re-homing**, the question is "what does the brand do here?", not "how do I bend the colour." Options that don't touch brand identity:
- Add a background fill (red CTA card with white text on dark, instead of red text on dark).
- Use a secondary brand colour at full lightness.
- Use `--foreground` and carry differentiation via weight, size, tracking, or underline.
- Use a brand-documented neutral (`--brand-on-light` / `--brand-on-dark`).

## Token naming conventions — the two-layer contract

Every brand in this catalog ships `tokens.css` with two layers. Keep them clean and the audit-grep patterns below stay useful.

### Layer 1 — shadcn-semantic core (names are the contract, values are yours)

Universal primitive vocabulary that downstream shadcn components read directly. Brand-agnostic NAMES, brand-specific VALUES. Never rename, add to, or delete from this set per-brand. Setting different OKLCH values per brand is exactly what these slots are for.

| Group | Tokens |
|---|---|
| Surfaces | `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground` |
| Interactive | `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--destructive`, `--destructive-foreground` |
| Chrome | `--border`, `--input`, `--ring` |
| Sidebar | `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` |
| Data viz | `--chart-1` through `--chart-5` |
| Radii | `--radius` plus `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` |

### Layer 2 — brand-extras (`--brand-*`, surface-named)

The brand's own design-system vocabulary. Lightness ladders, secondary palettes, polarity-locked surfaces, hairlines, semantic palette, decorative tokens — whatever shadcn-core doesn't model.

Token names encode **surface role**, never colour-with-modifier.

| Suffix family | Meaning | Examples |
|---|---|---|
| `-bg`, `-canvas`, `-canvas-{night,light}`, `-surface-N`, `-surface-{elevated,strong,soft}` | a surface fill | `--brand-canvas-night`, `--brand-surface-1`, `--brand-surface-elevated` |
| `-ink`, `-ink-{strong,mute,subtle}`, `-on-dark{,-soft,-faint}`, `-on-light{,-strong}` | a foreground locked to a canvas polarity (role, not colour) | `--brand-on-dark`, `--brand-on-light`, `--brand-ink-strong`, `--brand-ink-mute` |
| `-hairline`, `-hairline-{soft,strong}` | divider / border weight | `--brand-hairline-soft` |
| `-radius-*` | radii in the brand's scale | `--brand-radius-pill`, `--brand-radius-xs` |
| `-body`, `-body-{muted,strong}` | body text colour | `--brand-body`, `--brand-body-muted` |
| `-accent-<name>` | documented secondary brand colour at full chroma | `--brand-accent-yellow`, `--brand-action-blue` |
| Brand-primary lineage | brand's own documented ladder for the primary hue | `--brand-primary-deep`, `--brand-primary-press`, `--brand-primary-soft` |
| `-mute`, `-muted-soft`, `-stone`, `-slate`, `-ash` (chroma ≈ 0) | utility neutrals for muted body text — these CAN be AA-tuned per the rule | `--brand-muted-soft`, `--brand-stone` |

### Forbidden name shapes (the synthesis anti-pattern in name form)

Don't introduce these. Audit catches them.

- **`--brand-<colour>-ink`** paired with a chromatic hue: `--brand-coral-ink`, `--brand-rausch-ink`, `--brand-red-ink`. The `-ink` suffix on a colour name signals "brand colour at a different lightness for text use" — that's the synthesis pattern. (Hue-anchored `--brand-ink-mute` / `--brand-ink-strong` are fine: they name the body-text role, not a chromatic modification.)
- **`--brand-<colour>-on-dark`**: `--brand-blue-on-dark`, `--brand-coral-on-dark`. Names "the brand colour but lifted for dark canvases." Same pattern.
- **`--brand-<colour>-deep`** paired with a chromatic hue: `--brand-blue-deep`, `--brand-brand-green-deep`. Almost always a synthesised "darker variant" with no documented brand-doc value. (`--brand-primary-deep` is fine when the brand actually documents the ladder — see stripe-style.)
- **Surface-named but colour-modified**: `--brand-eyebrow-ink`, `--brand-stat-delta-up`, `--brand-stat-delta-down`. The surface name is right; baking a lifted/darkened colour value into a single-purpose token is the smell.

### Auditable greps

Forbidden name shapes:

```sh
grep -nE '\-\b(red|blue|green|coral|amber|sale|success|rausch|orange|purple|violet|teal|cyan|magenta|pink|yellow|lime)-\b(ink|on-dark|deep|pressed|darker|lighter)\b' \
  visualize/design-systems/*/tokens.css
```

Comment smells (token value justified by contrast math — the rationale-form of the same anti-pattern):

```sh
grep -nE '\b(AA|WCAG|[0-9]\.[0-9]+:1|lifted (from|to)|darkened (from|to)|brighten\w* (for|to)|≥4\.5:1|≥3:1|sub-AA)\b' \
  visualize/design-systems/*/tokens.css
```

Both should return empty across the catalog, with two known legitimate exceptions documented in their tokens.css headers:
- **ibm-style** cites Carbon's documented Blue 60 → Blue 50 theme swap (`carbon-design-system/carbon packages/themes/src/g100.js`).
- **ide** declares itself a generic synthesised theme with no external brand authority.

### Primary-family asymmetry

Within each context block (`:root`, `[data-theme="dark"]`, `@media (prefers-color-scheme: dark)`), the four primary-family tokens — `--primary`, `--ring`, `--sidebar-primary`, `--sidebar-ring` — should carry the same OKLCH value. A diff on just `--primary` is a retroactive contrast patch; a brand-truth update would have moved the whole family together. Same applies to the `--brand-primary-*` ladder if the brand carries one: every member should track a documented value, not a synthesised stop.

## Surface selection: look past the homepage hero

The brand's recognizable signature is rarely the homepage hero alone. Some brands open with a marquee-only surface that doesn't repeat on `/pricing`, `/enterprise`, `/product/*`, `/startups` — Notion's deep navy "Meet the night shift" hero band is the canonical example. Five of the six pages documented in Notion's `DESIGN.md` (everything except the homepage) use a white/cream canvas with pastel feature cards; only the homepage carries the navy band.

Anchoring the preview shell on a homepage marquee misrepresents the system — the preview reads as "Notion homepage clone" rather than "Notion design system." The common style — the surface that appears across most documented pages — should drive the shell. Marquee-only signatures appear as accent surfaces (a single section card later on the page, a punctuation band before the footer), not as the headline.

**Before authoring, capture 2–3 secondary pages** from the list in `DESIGN.md` §1 / the import provenance, not just the homepage:

```bash
# Notion case — DESIGN.md lists homepage + enterprise + product/ai + product/agents + startups + pricing
mcp__chrome-devtools__navigate_page url="https://www.notion.com/product/ai"
mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/notion-product-ai.png" fullPage=true
mcp__chrome-devtools__navigate_page url="https://www.notion.com/pricing"
mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/notion-pricing.png" fullPage=true
mcp__chrome-devtools__navigate_page url="https://www.notion.com/enterprise"
mcp__chrome-devtools__take_screenshot filePath="temp/brand-refs/notion-enterprise.png" fullPage=true
```

If those pages share a canvas the homepage doesn't, the homepage is the marquee — design the shell around the shared canvas instead.

### Selection metadata vocabulary

Every catalog `DESIGN.md` carries a `selection:` frontmatter block so agents can shortlist reference systems without reading 100+ full files. Keep it descriptive, not promotional. The block is catalog routing metadata; it is not rendered in the preview.

```yaml
selection:
  mood: [minimal, productivity, technical]
  tone: [calm, pragmatic, precise]
  formality: medium
  density: high
  canonical_canvas: light
  best_for: |
    Product surfaces that need restrained structure, readable tables, and quiet workflow chrome.
  avoid_for: |
    Campaign pages that need theatrical motion, oversized imagery, or high-emotion lifestyle cues.
```

Allowed values:

| Field | Values |
|---|---|
| `mood` | `austere`, `automotive`, `brand-system`, `cinematic`, `command-line`, `commerce`, `cyberpunk`, `data-rich`, `developer`, `editorial`, `enterprise`, `gradient`, `high-contrast`, `industrial`, `luxury`, `minimal`, `monochrome`, `organic`, `playful`, `productivity`, `retro-tech`, `spatial`, `tactile`, `technical` |
| `tone` | `authoritative`, `bold`, `calm`, `confident`, `dramatic`, `energetic`, `experimental`, `fast`, `friendly`, `irreverent`, `optimistic`, `polished`, `pragmatic`, `precise`, `premium`, `serious`, `utilitarian`, `warm` |
| `formality` | `low`, `medium`, `high` |
| `density` | `low`, `medium`, `high` |
| `canonical_canvas` | `light`, `dark`, `both` |

`selection.canonical_canvas` must match the top-level `canonical-canvas`. When changing either one, run:

```sh
node dev-scripts/catalog-index.mjs --check
```

The generated `catalog-index.json` is deterministic and committed. Do not hand-edit it; update `DESIGN.md` metadata, then regenerate with `node dev-scripts/catalog-index.mjs`.

## Animation patterns

Per-system preview templates should use the shared motion vocabulary in [`animation-patterns.md`](animation-patterns.md). That file owns entrance, hover, background, and reduced-motion conventions for catalog previews. Use those patterns before inventing custom keyframes; if a brand needs bespoke motion, keep the names and timing compatible with the catalog vocabulary so future audits can reason about it.

## Content shape: Halcyon is a name only — no the host product product surface, no brand-X lift

The single hardest rule in this catalog:

> **Halcyon is a fictional company NAME with NO defined product.** It is not the host product. It does not publish artifacts. It does not gate publishing. It does not run an MCP comment loop. It does not version + audit artifacts. Anything that names the host product's actual product surface IS a leak, regardless of whether the word "Halcyon" is wrapped around it.

This is unintuitive: "Halcyon publishes artifacts behind company auth" *sounds* like Halcyon content, but it's literally the host product's marketing copy. Renaming the host product → Halcyon doesn't make the surface fictional; it just gives the host product a fake name.

The opposite trap also applies: scrubbing Halcyon and lifting brand X's marketing — "Pro for Teams" as a tier name, "Notion AI" as a feature card, "Cursor Tab" as a code-completion section, "by @raycast" on extensions, real customer logos in the logo strip — turns the preview into an unauthorized re-skin.

The right shape is **Halcyon as a placeholder name, Halcyon's TEAM USING the brand for general knowledge work**, with brand-X-shape mockups carrying neutral SaaS-team content.

### Halcyon thread-through (always keep)

These names are established convention and identify the catalog's fictional brand:

- Topnav brand mark: `__DESIGN_SYSTEM_NAME__` (interpolates the slug, e.g. "notion-style") or literal "halcyon"
- URLs / handles: `halcyon.dev`, `app.halcyon.dev`, `hlc.so`, `@halcyon/cli`
- Engineering universe: `halcyon-api`, `halcyon-worker`, `halcyon-webapp`, `halcyon-cli`, internal Slack "Halcyon HQ"
- People: `team@halcyon.dev`, generic team members
- Footer tagline, customer-logo strip wordmarks

### People: never real names

Avatars, inbox senders, byline names, db-row owners, deploy attribution, "shared by" tags — every place the template renders a person's name — must be **invented**. Never use a real person's name, including:

- The current operator's name or initials (read from git config, CLAUDE.md, memory, or any in-session context)
- Anyone on the host product's actual team
- Real customers, investors, advisors, or any known living person
- Email addresses that route to real people (anything matching the operator's local-part)

Use generic invented names + invented initials. Suggested pool: `Jordan Kim` / `JK`, `Morgan Lee` / `ML`, `Avery Park` / `AP`, `Riley Chen` / `RC`, `Sam Walker` / `SW`, `Taylor Reyes` / `TR`. These are gender-neutral, not associated with any known person, and rotate across mockups so no single name dominates.

The leak pattern is subtle: the agent often reaches for the operator's name as a "plausible team member" when filling in a mockup. It isn't. It's a PII leak that ships into a public preview catalog. If you're authoring a per-brand template and any human name appears in the body, swap it for one from the invented pool above before committing.

### Forbidden vocabulary (the host product product surface)

Any of these appearing anywhere in a preview is a leak — even if wrapped in Halcyon language:

- `publish` / `publishing` / `publish artifact` / `gated publishing`
- `artifact` / `artifacts` (the host product's primitive)
- `comment thread` / `resolve comment` / `comments → MCP loop` / `MCP comment`
- `custom domain` / `custom apex` / `tenant subdomain` (when described as a product feature)
- `version history` / `versioned + audited` / `version log`
- `SSO gating` / `audit log` (when described as headline product features)
- `chrome injection` / `edge-served chrome`
- `view-token` / `view freshness` / `KV fail-open`

The fix is never "rephrase the leak more cleverly." The fix is: describe **how Halcyon's team uses the brand**, with neutral SaaS-team content (engineering practices, team rituals, weekly metrics, generic SaaS surfaces).

### Per-register Halcyon-team content (no product features)

| Register | Halcyon-team content (no product surface) |
|---|---|
| Command launcher (Raycast, Warp, Superhuman) | Halcyon's team using generic launcher tools — Hacker News reader, Slack channel jump, GitHub PR list, window management, clipboard history. Generic dev-team tooling, NOT extensions that map to the host product infra |
| IDE (Cursor) | Halcyon engineering code in any file — `tenant.ts` (multi-tenant provisioning), `auth.ts` (SSO bootstrap), route handlers, config — anything a generic B2B SaaS engineer writes. NOT `publish.ts` with `halcyon.publish()` |
| Workspace tool (Notion, ClickUp, Coda) | Halcyon team rituals — engineering specs, design crits, Q3 planning, customer interviews, sprint cycles. NOT "Artifact pipeline" or any the host product product structure |
| Project tracker (Linear, Asana, Jira) | Halcyon engineering tickets, design tasks, sprint cycles |
| Dashboard (PostHog, Mixpanel, Datadog) | Generic SaaS metrics — DAU, signup funnel, request latency, deploy frequency. NOT "artifact publish latency" |
| Drive / KB (Airtable, Coda, Quip) | Halcyon's customer CRM, vendor list, hiring pipeline, design tokens table |
| Calendar (Cal.com) | Halcyon sprint cycles, design crit, customer demos, all-hands |
| AI chat (Claude, ChatGPT, Perplexity) | Halcyon-business prompts — fundraising memos, market sizing, strategy questions, customer interview synthesis |
| Email (Superhuman, Hey, Front) | Halcyon team threads, vendor invoices, customer reply drafts |
| Transactions table (Stripe) | halcyon.dev / app.halcyon.dev as customer rows paying Stripe for general B2B SaaS billing |

### Per-register Halcyon-team content for marketing surfaces (hero, feature cards, pricing)

Marketing surfaces (hero, feature cards, pricing) shouldn't describe Halcyon's product (since Halcyon has none — see the rule). They should describe **how Halcyon's team uses the brand**, in the brand's voice register:

| Surface | What goes here |
|---|---|
| Hero copy | Brand-flavored aphorism about the brand's value to a SaaS team. NOT "Halcyon publishes artifacts behind company auth" |
| Feature cards | Engineering / team / workflow aphorisms — "Reviews land by lunch", "Threads close themselves", "Page history explains itself". Brand-token demonstrations (color swatches, type scale, component vocabulary) also work — see the shipped 7 templates for that pattern |
| Pricing tiers | Generic SaaS tier shapes (Free / Solo / Pro / Enterprise) with generic SaaS features (storage, users, support level, basic SSO). NOT the host product's specific differentiators ("Named-email sharing", "Custom apex", "Audit log") and NOT brand X's actual tier structure |
| Stats band | Generic team metrics — pages updated, PRs opened, deploys this week, comments resolved, cross-team adoption. NOT "artifacts in flight" / "publish latency" |
| Customer-logo strip | halcyon.dev / hlc.so / @halcyon/cli wordmarks. NOT real third-party brands (Stripe / Linear / Vercel / NVIDIA) |

### The two-minute litmus test before shipping

Read the preview's text out loud. Ask:

1. **Does anything I just read describe the host product's actual product surface?** (publishing, artifacts, gated, comment loop, version log, audit, chrome injection) — if yes, it's a leak even when wrapped in "Halcyon."
2. **Does anything I just read appear on the brand's actual marketing site verbatim?** (tier names, branded product features, real customer logos) — if yes, it's a lift.
3. **Does the body copy literally name the brand?** ("Halcyon's team uses Cursor", "Notion's bold yellow tint", "Try Claude" button label, model cards named "Halcyon Sonnet / Opus / Haiku") — if yes, it's a soft lift. The brand identifies itself through its visual chrome, never through being named in the prose. The topnav brand mark is the catalog slug (`__DESIGN_SYSTEM_NAME__`), not "Cursor" or "Notion."
4. **If I replaced "Halcyon" with "Acme" everywhere, would the preview still describe the same fictional company?** If swapping the name changes what the preview is "about," the name was carrying real-product meaning — that's a leak.

A clean preview passes all four.

### Prose rhythm: no aphorism stacks, no fragment chains

Two AI-rhythm tells that show up under pressure to sound profound:

**Stacked parallel-construction aphorisms**: "The agent stays in the loop, the editor stays in the keyboard, and the codebase stays close to the question." Three "X stays Y" clauses in a row reads as empty pseudo-poetry — each clause sounds like it means something, the stack means nothing. Same trap: "Pages own their topic; the team owns the page; the comments own the gaps." If you find yourself writing three parallel-structured clauses in a row to fill a sentence, the sentence isn't carrying a real claim.

**Sequential period-fragment chains**: "Diff. Accept. Ship." or "Pages, calendars, database views." The X. Y. Z. cadence reads as an AI rhythm tell, not Carl-voice (per `feedback_fragment_chain_ai_slop` memory). Single fragments in isolation are fine; chained fragments are slop.

The fix in both cases: replace with a concrete two-sentence prose statement that says one thing per sentence. "Halcyon's engineering team ships multiple PRs a day. The agent drafts the diff and runs the tests before a human signs off at the merge boundary." Two sentences, one verb-driven claim each, no parallel-structure decoration.

## Dark-mode strategy

Decide before authoring. Read `DESIGN.md` §1 to determine the brand's canonical canvas:

| Brand canonical canvas | Dark-mode strategy |
|---|---|
| Light-canonical with a real product dark mode (Stripe, Apple, Claude, Vercel) | Hand-edit `[data-theme="dark"]` to the brand's actual dark surface. Look for `--brand-surface-dark` / `--brand-canvas-night` / equivalent brand-extras tokens. Override brand-extras (`--brand-canvas-soft`, `--brand-ink-mute`, etc.) so interlude bands and helper inks read on dark. |
| Light-canonical, no documented dark mode | Synthesise a plausible dark — near-black canvas, light foreground, brand accent stays. Match the brand's actual **product** dark mode (the app, the dashboard), not a marketing-marquee surface from one page. Notion's product dark is warm-near-black; the homepage navy is marketing-only. Extending a marketing-marquee color across the dark canvas misrepresents the brand. |
| Dark-canonical (Linear, SpaceX, Ferrari) | Both modes mirror `:root`. If `:root` encodes a light shop variant (SpaceX case), update `:root` to the dark marketing variant and mirror in `[data-theme="dark"]`. |

The synthesised OKLCH lightness inversion (the catalogue's import-time default) breaks for nearly every brand — either text becomes the same lightness as the inverted bg, or warm tints flip to wrong-temperature cool. Always hand-edit.

Marquee surfaces (the Notion navy band, etc.) should still appear in the dark preview — but as a single accent card with brand-extras navy tokens preserved, not as the canvas itself. The navy CTA card in `notion-style/preview-template.html` is the canonical pattern.

### Polarity-locked tokens: never lift in dark

If a brand-extras token names an always-dark ink for always-light surfaces (e.g. `--brand-pricing-ink`, `--brand-canvas-night`, `--brand-on-light-strong`), do NOT add a dark-mode override that lifts it. The token's surface doesn't flip with theme, so the ink shouldn't either — lifting it inverts the contrast against the locked surface and breaks every consumer downstream. Airtable's first iteration lifted `--brand-pricing-ink` to a light value in dark mode and broke 26 browser-contrast checks across the db grid, swatches, pricing tiles, topnav, and footer — every one of those surfaces was polarity-locked white. The fix: leave polarity-locked tokens at their `:root` value; only lift tokens used on theme-flipping surfaces (e.g. `--brand-body` for editorial text on canvas that does flip).

The symmetric case: a token named for always-light surfaces (e.g. `--brand-on-dark` = white) doesn't need an override — it's already always-light by definition. The trap is the unnamed assumption that "all `--brand-*` should lift in dark." They shouldn't.

### Single-polarity brands: only lock signature voltage

For brands whose canonical canvas is single-polarity (light-canonical, no documented dark — Airtable is the worked example), don't apply shopify's multi-section `.canvas-cream` / `.canvas-night` pattern. That pattern works because shopify's two-track polarity is documented in the brand. For single-polarity brands, only the truly polarity-fixed signature surface (the brand's voltage moment — Airtable's white database grid, Stripe's gradient mesh hero, Notion's navy marketing band) stays canvas-locked in the dark variant. Demo sections (color swatches, surface ladder, pricing, typography, components) must flip with theme — otherwise the dark variant reads as "mostly light with three dark accents" rather than a coherent dark mode.

Rule of thumb: count the locked sections in your dark screenshot. More than one or two and the page no longer reads as "dark mode of brand X" — it reads as "light page with an inverted hero band." Airtable's first iteration locked four sections; unlocking three (swatches, ladder, pricing) and keeping only the database grid locked was the fix.

## Detect-clean checklist

After `bash dev-scripts/build-previews.sh`, run both detectors:

```sh
# Structural CSS lint (slop / meta / non-contrast rules)
node visualize/scripts/detect.mjs --strict visualize/design-systems/<slug>/preview.html visualize/design-systems/<slug>/preview-dark.html

# Computed contrast via headless Chrome + axe-core (the canonical
# contrast check — resolves var() colors, cross-rule cascade, and
# per-theme computed styles; detect.mjs's a11y/low-contrast rule
# is structurally blind to var() and skips silently).
node visualize/scripts/browser-contrast.mjs visualize/design-systems/<slug>/preview.html visualize/design-systems/<slug>/preview-dark.html
```

Expected:
- `detect.mjs --strict`: `OK · N rules clean across 2 file(s)`.
- `browser-contrast.mjs`: `OK · 1 rule clean across 2 file(s)`. **Errors fail the check. Warnings are verification gaps, not passes.** axe returns `needs-review` rather than `fail` when it can't measure the background — gradients, pseudo-element backgrounds, single-char glyphs, `→` arrows. That means axe couldn't tell whether contrast is OK; it does NOT mean contrast is OK. Each `needs-review` warning on a text-containing element is a task: open the rendered PNG (`bash dev-scripts/screenshot-previews.sh <slug>`) and look at the text against the actual background. If the text reads, the warning is closed. If it doesn't, fix it (reposition stops, extend a fade, add a wash) — do not ship.

Single-char glyphs (`★`, `→`, `›`) and pure-decoration pseudo-elements that contain no readable text are safe to leave; those warnings are genuine axe limits. Text-containing elements (`h1`, `p`, button labels, `figcaption`) are not.

Renamed `detect-computed.mjs` → `browser-contrast.mjs` in commit `30aed2a`. Older docs reference the prior name.

## Polish pass

After the preview is detect-clean but before you ship the batch, run a polish pass. **Polish is NOT idempotent on first authoring** — there is always something to improve if you actually look. The mechanical floor (spacing ladder, favicon, OG meta) converges quickly; the quality dimensions below never do.

### Mechanical floor (first pass — fix without thinking)

1. **Spacing ladder.** Snap every margin / padding / gap to `0 4 8 12 16 20 24 32 40 48 64 80 96 128` (rem: `0 0.25 0.5 0.75 1 1.25 1.5 2 2.5 3 4 5 6 8`). Off-scale values authoring tends to reach for: `0.625rem` (10px), `0.875rem` (14px), `1.125rem` (18px), `1.75rem` (28px), `0.375rem` (6px), `0.125rem` (2px).

   ```sh
   grep -nE '(0\.(125|375|625|875)|1\.(125|375|625|875)|1\.75|2\.25|2\.75|3\.5|5\.5)rem' \
     visualize/design-systems/<slug>/preview-template.html
   ```

   Font-size `clamp()` declarations are exempt — fluid type scales follow their own ramp.

2. **Favicon + OG meta present** in the per-system `<head>` (per-system templates don't inherit `preview-kit/template.html`).

3. **Detect-clean on both modes.** `node scripts/detect.mjs --strict <preview.html> <preview-dark.html>` returns `0 error 0 warning`.

### Quality dimensions (second pass — actually look)

These are the dimensions where authoring routinely leaves gaps. Walk each one before declaring done — there is almost always something to fix.

| Dimension | What to check |
|---|---|
| **Focus-visible** | Every `.btn` (and any other interactive element) has a visible `:focus-visible` outline. Keyboard users see nothing when this is missing. |
| **Touch targets** | Buttons have `min-height: 44px` (WCAG AA touch-target floor). Default 14px text + 0.5rem padding lands around ~38px — under floor. |
| **Reduced motion** | If any hover state transforms / animates, wrap a `@media (prefers-reduced-motion: reduce)` override that disables the motion. |
| **Dark-mode shadows** | Hard offset-shadow elements (`box-shadow: 2px 2px 0 0 var(--brand-charcoal)`) are invisible in dark mode when the shadow color stays dark. Either flip via a local CSS var (`--preview-button-shadow` pattern) or use `var(--foreground)` so it inverts with the canvas. Same for borders on cards. |
| **Tinted neutrals** | All borders/canvas use a slight chroma tint, not pure gray. PostHog's olive tint, Stripe's warm-canvas, Notion's pastels — never `oklch(0.x 0 0)` body surfaces. |
| **Typography hierarchy** | Same elements use same sizes/weights across the page. Hero / section title / card title scale stays consistent. |
| **Contrast** | Body text passes WCAG AA on both canvases. Muted labels stay above 4.5:1. |
| **Inline styles** | If you reach for `style="margin-top:0.5rem"` more than 2-3 times, the spacing was wrong somewhere — fix the source. |
| **Sticky scroll regions / overflow** | Tree-cards, IDE mockups, palette mockups — anything with `overflow: hidden` should also handle long content gracefully (text-overflow / max-width). |
| **Opacity-blended labels** | `opacity: 0.55-0.7` on always-dark ink against an always-light surface typically lands around 3.3-4.0:1 — below WCAG AA 4.5:1 for body-size labels. Bump to 0.8-0.85, or replace the opacity blend with a fixed mid-tone token. Airtable's first iteration had `0.55/0.6/0.7` opacities on db-header, ladder-num, section-eyebrow that all failed; bumping to `0.7/0.85` cleared every one. |
| **Signature-palette chip contrast** | Each chip background in the brand's pastel palette needs its text-color contrast verified. Mid-saturation palettes (mustard, ochre, mid-orange) are the trap — they look "dark enough" for white text but typically land at 2-3:1. Default to the brand's always-dark ink (`--brand-pricing-ink`, `--brand-canvas-night`) on light chips; only flip to `--brand-on-dark` for genuinely-dark chips (coral, forest, navy). |

### When the polish pass produces a diff

That's the norm, not the exception. Every brand authored this session got real polish-pass improvements after the initial detect-clean: focus rings added, touch-target floors enforced, dark-mode shadow flips, hover-state reduced-motion overrides. The mechanical floor (spacing ladder) is the part that converges to zero diffs across iterations — the quality dimensions never do.

Common findings + fixes:

- **`meta/missing-favicon`** — add an inline-SVG favicon to `<head>`, typically a brand-mark glyph on the brand canvas color.
- **`meta/missing-og`** — add `og:title`, `og:description`, `twitter:card` meta tags.
- **`slop/non-token-color`** — flagged when hex literals appear in CSS that otherwise uses var refs. Usual cause: `var(--token, #000)` fallback form. Strip the fallback (`var(--token)` is fine when the token is guaranteed defined by the inlined tokens.css). For decorative gradient stops without a token home (mesh atmospherics, photographic backdrops), scope local CSS custom properties at `:root` inside the template's `<style>` block — see `spacex-style` / `ferrari-style` for the `--preview-burn` / `--preview-sunset-warm` pattern.
- **`slop/system-default-font`** — flagged when body font-family is a generic stack but `DESIGN.md` declares a custom family. Put the brand-declared family first in the stack (even if the proprietary font won't load — the fallback chain still resolves correctly).

The catalogue's preview-only `preview-kit/fixture-styles/*.css` files contain a few unrelated hex literals (`#16a34a`, `#dc2626`) used as chart-color fallbacks. These pre-date the per-system authoring work and aren't yours to fix in this loop.

## Gotchas

- **Per-system templates don't inherit `preview-kit/template.html`.** Each per-system `<head>` is independent. Declare Google Fonts there if the brand needs anything not already in `preview-kit/template.html`'s loader (current set: Inter, Source Serif 4, JetBrains Mono, Geist, Geist Mono, Oswald). Append families to `preview-kit/template.html`'s loader when two or more brands share a custom family; per-system if it's unique to one brand.
- **The catalogue has no `[data-theme="light"]` block.** `:root` is the light default. If a brand's canonical canvas is dark and `:root` encodes a light variant, update `:root` directly — don't author a non-existent `[data-theme="light"]` override.
- **Don't bake preview-only decoration into `tokens.css`.** Scope decorative-only colors (sunset gradients, mesh atmospherics, hero photography stops) to the template's `<style>` block. `tokens.css` is the brand's documented token surface.
- **`dev-scripts/build-previews.sh` regenerates `preview.html` + `preview-dark.html` on every run.** Don't hand-edit those — they're outputs. Structural edits go in `preview-template.html` (source) or `tokens.css` (tokens).
- **`DESIGN.md` is read-only.** Frontmatter preserves upstream brand DNA; body is the import-time spec. Brand-recognizability work belongs in `tokens.css` (token surface) and `preview-template.html` (shell), not in the spec.
