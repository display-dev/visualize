# HARNESSES.md — per-host quirks and the supported-harness matrix

`visualize` ships in four mounts so every major AI coding agent host can pick it up. This file pins what's tested where, the install path per host, and any quirks worth knowing.

## Mount layout

| Mount | Distribution channel | Install command |
|---|---|---|
| `visualize/` | canonical (this repo) | clone the repo |
| `skills/visualize/` | [`vercel-labs/skills`](https://github.com/vercel-labs/skills) | `npx skills add display-dev/visualize --skill visualize` |
| `hermes/design/visualize/` | [Hermes well-known](https://hermes.run) | discovered automatically by Hermes |
| `pi/agent/skills/visualize/` | Pi-coding-agent + OpenClaw and other Pi-built frameworks | Pi's `pi install` |

The mirrors are byte-identical to the canonical mount. `bin/sync-mounts.sh --check` runs in CI and fails on drift.

## Supported hosts

| Host | Discovery file | Status |
|---|---|---|
| Claude Code | `~/.claude/skills/` (symlinked or installed via `npx skills add`) | tested |
| Cursor | `.cursor-plugin/plugin.json` (this repo's root) | tested |
| OpenAI Codex | `.codex-plugin/plugin.json` (this repo's root) | tested |
| GitHub Copilot Coding Agent | `AGENTS.md` | tested |
| OpenCode | `AGENTS.md` | tested |
| Hermes | `hermes/design/visualize/SKILL.md` | tested |
| Pi / OpenClaw | `pi/agent/skills/visualize/SKILL.md` | tested |
| Gemini | via Anthropic Marketplace upload | manual |
| Claude.ai | upload the canonical mount as a skill zip | manual |

## Per-host quirks

- **Claude Code.** Slash commands appear under the `/visualize:*` namespace.
- **Cursor.** The plugin manifest's `logo` path is `./assets/logo.svg` (relative to the repo root, not the mount).
- **Codex.** Same convention as Cursor — manifest lives at `.codex-plugin/plugin.json`, logo at `./assets/logo.svg`.
- **Hermes.** Surface the skill in the `design` category (sibling to `productivity` where display-dev/skill lives).
- **Pi / OpenClaw.** The Pi mount is rooted at `pi/agent/skills/visualize/` so frameworks built on Pi can pick it up without per-framework adapters.

## Image-route evidence

This table records observed host/route evidence, not operating instructions. The canonical route, limits, billing, validation, and recovery contract is [`visualize/reference/image-generation.md`](visualize/reference/image-generation.md). A route without current file-producing evidence remains a maintainer candidate.

| Route | Status on 2026-08-24 | Characterization |
|---|---|---|
| `fake` | verified | contract/adapter tests; isolated installed-skill PNG smoke; no network or credential |
| `codex-native`, `antigravity-native` | uncharacterized | no current file-producing host evidence recorded |
| `codex-mcp` | verified for Claude Code 2.1.221 with configured Codex MCP | one general `mcp__codex__codex` session delegation using the bounded native-image instruction; one staged PNG; common finalizer returned `codex-mcp`; no retry or fallback; recorder recovery tests pass |
| `codex-cli` | verified with Codex CLI 0.145.0 authenticated through ChatGPT on 2026-08-24 | one `codex exec --ephemeral` dispatch through the production adapter; one visually inspected 1024×1024 PNG (1,440,469 bytes); `host-managed` billing diagnostic; exact staged-file checks and successful staging cleanup; no retry or fallback; termination/recovery behavior remains covered by adapter tests |
| `antigravity-cli` | uncharacterized | no current authenticated file-producing evidence recorded |
| `gemini-api` | verified with configured Gemini API on 2026-08-22 | `gemini-3.1-flash-image` through `v1beta/interactions`; no-reference acceptance produced a visually inspected 1024×1024 JPEG (463,008 bytes), and single-JPEG-reference acceptance produced a visually inspected 1264×848 JPEG (305,691 bytes); `api-key` billing diagnostic; provider bytes and dimensions preserved; one request in each successful run |
| `openai-api` | verified with configured OpenAI API on 2026-08-24 | `gpt-image-2` through the Images API; one no-reference generation produced a visually inspected 1024×1024 PNG (1,465,663 bytes), and one single-reference edit produced a visually inspected 1536×1024 JPEG (149,859 bytes); `api-key` billing diagnostic; provider bytes and dimensions preserved; one request in each successful run, with no retry or fallback |

Distribution evidence is credential-free: `skills@1.5.20` resolved exactly one local candidate skill and exactly one current public skill in isolated workspaces; Pi's pinned Git package exposed exactly one skill under `pi/agent/skills`; Codex/Cursor manifests parse; and all three committed mirrors match the canonical mount.

## Artifact Explore evidence

Fresh-context acceptance on 2026-08-26 assigned Briefing rail, Evidence ledger, and Decision sequence to three independent subagents with one shared Relay Press brief. The coordinator assembled their scoped fragments into one 38 KB HTML file. Browser checks passed all six direction/viewport states: three same-DOM directions, 1180 px wide and 390 px phone frames, natural heights from 1,195 to 1,925 px, no iframe, no nested scroller, no crop, no horizontal overflow, fixed-content parity, restored URL/selection state, and no console or page errors. Full-page screenshots were visually inspected; the evidence remains disposable under `temp/artifact-explore-single-file-acceptance-2026-08-26/`. The maintained workflow lives in [`visualize/reference/explore-artifact.md`](visualize/reference/explore-artifact.md).

## Artifact theme evidence

Fresh Codex agents exercised the shared theme workflow on 2026-08-28: direct Editorial application with an explicit artifact-only override, constrained borrowing that retained project colors and fonts, and an Editorial/Swiss comparison without a captured project profile or supplied layout. Direct application and partial borrowing preserved source body markup, logo, links, native disclosure behavior, and project authority files. The comparison preserved source wording and section order and stopped for selection without applying either direction.

Browser checks covered wide and 390 px rendering, light/dark and OS/explicit theme behavior, contrast, and overflow. The comparison also passed control, URL-state, copy/reset, and no-JavaScript checks. Screenshots were inspected. Evidence is disposable under `temp/artifact-themes-validation-2026-08-28/`; this is observed Codex coverage, not a claim of fresh testing on every supported host. The maintained contract is [Artifact themes](visualize/SKILL.md#artifact-themes).

## System Explore evidence (v0.6.0)

On 2026-08-28, one fresh Codex agent using the installed npm mount exercised a fictional red-led editorial brief with no incumbent identity or supplied layout. It built three broad directions serially, then continued with a focused secondary-color comparison: an unchanged control, lower chroma, and less colored area. Both reviews passed 12 candidate/width/theme states each, covering wide and 390 px views in light and dark, content parity, overflow, theme precedence, URL copy/restore/reset, keyboard focus, no-JavaScript readability, reduced motion, and browser health. Full-document contact sheets were inspected. The focused round retained the broad review and preserved its layout, typography, primary color, and content; no project authority files were written.

Computed browser contrast passed. The focused coverage variant required manual resolution of axe's incomplete pseudo-element contrast checks; all observed pairs passed. The palette helper did not support the fixture's hex input, so its check is recorded as unsupported, not passing. Existing schema, catalog, authoring, palette-smoke, fixture, preview, and mirror checks passed, with inherited authoring warnings.

The same journey then compared typography against the lower-chroma baseline. Twelve further states passed fixed palette/content/component-arrangement checks, an unchanged control, contrast, themes and review controls. Natural text reflow remained allowed. Four full-document contact sheets were inspected. The alternatives use local font stacks, so exact glyph rendering remains platform-dependent. Earlier reviews were retained and no system was adopted.

A third fresh installed-skill agent started focused without a layout: neutral-gray control versus a named purple/cyan palette-and-data-emphasis bundle. Eight render states passed, including labeled chart/table parity, graphic/text contrast, theme precedence and review controls. Both token exports passed the palette helper. In isolated negative clones, browser checks caught 1.54:1 text contrast; visual review caught a color-only chart mapping that automated checks did not detect. Repairs passed wide/phone checks and left the valid review unchanged. The fixture's OS guard was normalized to `teach`'s documented selector spelling before final evidence. This is observed behavioral coverage, not formal accessibility certification.

A second fresh agent routed undocumented/conflicting identity to `teach`, asked one question for ambiguous scope, and proposed explicit replacement without edits. Coherent incumbents with and without `DESIGN.md` also routed literal `explore system` requests to `teach`. Input hashes stayed unchanged. Its approved replacement comparison combined two coordinator-built directions with an independent noticeboard builder that received no sibling inputs. Host limits required sequential scheduling. All 12 assembled render states and the full no-JavaScript phone view passed, with explicit availability labels, inert actions, contrast, theme/URL controls and no overflow. Screenshots were inspected; canonical files remained unchanged.

A fourth fresh agent exercised full-draft confirmation, stale-source refusal, occupied-backup refusal, and a deliberately injected write failure after only `DESIGN.md` changed. It reported the partial state without automatic rollback or retry. A separately approved repair wrote only the pending CSS, preserved owner additions and unchanged `PRODUCT.md` metadata, and retained both the original backup and a fresh backup of the partial state. All 12 post-write render cases passed against the written tokens. A displayed draft typo exposed a presentation ambiguity; shared `teach` guidance now requires exact saved-draft display and writing reviewed contents. The rerun passed. Strict Stitch validation was unavailable, and hex palette input remains unsupported; neither is reported passed.

Greenfield adoption then created only the three separately confirmed files from the displayed drafts. Twelve further render cases read the newly written tokens and passed theme, content, contrast, focus, inert-action, and overflow checks; four screenshots were inspected. Evidence is disposable under `temp/system-explore-2026-08-28/`. This record describes observed Codex behavior, not coverage across all supported hosts. The maintained procedure is [System Explore](visualize/reference/explore-system.md).

The register journey also created a standalone report with the approved purple/cyan palette, then refined only paragraph measure. An opted-in screenshot supplied atmosphere evidence; its mostly white/gray pixels did not replace approved semantic roles. Before/after checks at wide and phone widths in light/dark preserved all tokens, content, chart proportions and direct labels, with passing contrast and no overflow. Four final screenshots were inspected. No project authority was created.
