# HARNESSES.md — installation routes and verification evidence

`skills/visualize/` is the single authored and installable skill directory. Installers copy or link that directory into the host's skill location. The full authoring catalog remains under `catalog/`.

## Installation routes

For a local checkout or the published repository, select the intended host:

```sh
npx skills add display-dev/visualize --skill visualize --agent <agent>
```

| Host | Installer agent | Other distribution route |
|---|---|---|
| Claude Code | `claude-code` | Display's Claude plugin can vendor `skills/visualize/` at a pinned commit |
| OpenAI Codex | `codex` | Existing `.codex-plugin/plugin.json` plus root `skills/` |
| Cursor | `cursor` | Existing `.cursor-plugin/plugin.json` plus root `skills/` |
| GitHub Copilot | `github-copilot` | Install into the target project's supported skill location for cloud agents |
| OpenCode | `opencode` | Native skill discovery from the installed directory |
| Hermes | `hermes-agent` | Direct GitHub skill path `display-dev/visualize/skills/visualize`, or a tap rooted at `skills/` |
| Pi | `pi` | `pi install` consumes root `skills/`; no separate Pi tree |
| OpenClaw | `openclaw` | The installer exposes workspace `skills/visualize`; qualify OpenClaw independently of Pi |
| Gemini CLI | `gemini-cli` | Current CLI releases support an explicit Git skill subdirectory |
| Claude.ai / Desktop / Cowork | — | Archive the `skills/visualize/` directory alone or consume the Display plugin; validate each surface separately |

The installer routes do not require host-specific instruction copies. [Pi packages](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md), [Hermes skills](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/user-guide/features/skills.md), [OpenClaw skills](https://docs.openclaw.ai/tools/skills), and [Gemini CLI skills](https://geminicli.com/docs/cli/skills/) describe the native routes. A documented route is not a claim that every host runtime has been exercised.

## Migration from the four mounts

Update configurations and local symlinks pointing at `visualize/`, `hermes/design/visualize/`, or `pi/agent/skills/visualize/` to `skills/visualize/`, or reinstall through the host's installer route. Existing pinned commits retain their original directories. The catalog's historical source root in `catalog/source.json` is independent of the current skill location and remains unchanged.

The former Hermes `design/` grouping is no longer encoded in a separate source path; native category presentation has not been requalified. The Display plugin's existing `visualize-lite` pin remains unchanged until a separate consumer update. Its rename, directory size validation, and coexistence with a standalone Visualize installation need verification in that update.

## Consolidation verification

The isolated `skills@1.7.4` local install selected exactly one `visualize` skill for all nine installer agents above. Codex, Cursor, Copilot, OpenCode, Pi, and Gemini use the shared `.agents/skills/visualize` installation; Claude Code and Hermes receive host-local symlinks, and OpenClaw receives a workspace `skills/visualize` symlink. The installed catalog helper is exercised through the shared directory and each symlink. A separate `--copy` installation for all nine targets also passed helper execution through every actual destination.

`node dev-scripts/check-skill-package.mjs` retains the former transformer's frontmatter and command-hint checks, rejects unresolved placeholders and duplicate skill trees, verifies entrypoint reference paths, and runs bundled helpers from an isolated copy with a space in its path. Existing catalog tests also cover CLI invocation through a symlink.

Fresh Codex procedure trials on the consolidated package covered online Editorial creation and cold-cache network-denied retrieval failure. One online trial loaded `reference/create.md`, the requested Editorial package, template metadata, then two full templates (`project-recap` and `report`); it produced a rendered desktop/mobile recap. Package use passed, but progressive-disclosure compliance was partial. The earlier trial loaded one full template; the two results are not represented as equivalent. The offline trial stopped after the failed fetch without substituting Clean or creating HTML. A fresh Claude Code procedure trial loaded `reference/review.md` and its scoring reference, ran the installed detector/contrast helpers and rendered the supplied report, and left that report unchanged. Inputs, plaintext spawn prompts and tool/result transcripts are retained under `temp/consolidation/`; these directly supplied the skill path and do not prove automatic host activation. The offline agent performed the host bootstrap read before its workspace instructions; subsequent skill reads and retrieval used the calibrated network-denied shell.

Native Codex/Cursor plugin loading, Pi/Hermes/OpenClaw runtime behavior, and Claude upload surfaces remain unverified in this consolidation. Local Gemini CLI 0.2.2 does not expose the documented `skills` subcommand. Native activation with local OpenCode 0.4.2 was not exercised; installer placement is covered for both. Plugin manifest parsing alone does not establish plugin loading. Fresh-agent procedure trials are recorded separately from installer discovery.

## Image-route evidence

This table records observed host/route evidence, not operating instructions. The canonical route, limits, billing, validation, and recovery contract is [`skills/visualize/reference/image-generation.md`](skills/visualize/reference/image-generation.md). A route without current file-producing evidence remains a maintainer candidate.

| Route | Status on 2026-08-24 | Characterization |
|---|---|---|
| `fake` | verified | contract/adapter tests; isolated installed-skill PNG smoke; no network or credential |
| `codex-native`, `antigravity-native` | uncharacterized | no current file-producing host evidence recorded |
| `codex-mcp` | verified for Claude Code 2.1.221 with configured Codex MCP | one general `mcp__codex__codex` session delegation using the bounded native-image instruction; one staged PNG; common finalizer returned `codex-mcp`; no retry or fallback; recorder recovery tests pass |
| `codex-cli` | verified with Codex CLI 0.145.0 authenticated through ChatGPT on 2026-08-24 | one `codex exec --ephemeral` dispatch through the production adapter; one visually inspected 1024×1024 PNG (1,440,469 bytes); `host-managed` billing diagnostic; exact staged-file checks and successful staging cleanup; no retry or fallback; termination/recovery behavior remains covered by adapter tests |
| `antigravity-cli` | uncharacterized | no current authenticated file-producing evidence recorded |
| `gemini-api` | verified with configured Gemini API on 2026-08-22 | `gemini-3.1-flash-image` through `v1beta/interactions`; no-reference acceptance produced a visually inspected 1024×1024 JPEG (463,008 bytes), and single-JPEG-reference acceptance produced a visually inspected 1264×848 JPEG (305,691 bytes); `api-key` billing diagnostic; provider bytes and dimensions preserved; one request in each successful run |
| `openai-api` | verified with configured OpenAI API on 2026-08-24 | `gpt-image-2` through the Images API; one no-reference generation produced a visually inspected 1024×1024 PNG (1,465,663 bytes), and one single-reference edit produced a visually inspected 1536×1024 JPEG (149,859 bytes); `api-key` billing diagnostic; provider bytes and dimensions preserved; one request in each successful run, with no retry or fallback |

Historical distribution evidence before consolidation: `skills@1.5.20` resolved exactly one local candidate skill and exactly one current public skill in isolated workspaces; Pi's pinned Git package exposed exactly one skill under `pi/agent/skills`; Codex/Cursor manifests parse; and all three committed mirrors match the canonical mount.

## Artifact Explore evidence

Fresh-context acceptance on 2026-08-26 assigned Briefing rail, Evidence ledger, and Decision sequence to three independent subagents with one shared Relay Press brief. The coordinator assembled their scoped fragments into one 38 KB HTML file. Browser checks passed all six direction/viewport states: three same-DOM directions, 1180 px wide and 390 px phone frames, natural heights from 1,195 to 1,925 px, no iframe, no nested scroller, no crop, no horizontal overflow, fixed-content parity, restored URL/selection state, and no console or page errors. Full-page screenshots were visually inspected; the evidence remains disposable under `temp/artifact-explore-single-file-acceptance-2026-08-26/`. The maintained workflow lives in [`skills/visualize/reference/explore-artifact.md`](skills/visualize/reference/explore-artifact.md).

## Artifact theme evidence

Fresh Codex agents exercised the shared theme workflow on 2026-08-28: direct Editorial application with an explicit artifact-only override, constrained borrowing that retained project colors and fonts, and an Editorial/Swiss comparison without a captured project profile or supplied layout. Direct application and partial borrowing preserved source body markup, logo, links, native disclosure behavior, and project authority files. The comparison preserved source wording and section order and stopped for selection without applying either direction.

Browser checks covered wide and 390 px rendering, light/dark and OS/explicit theme behavior, contrast, and overflow. The comparison also passed control, URL-state, copy/reset, and no-JavaScript checks. Screenshots were inspected. Evidence is disposable under `temp/artifact-themes-validation-2026-08-28/`; this is observed Codex coverage, not a claim of fresh testing on every supported host. The maintained contract is [Artifact themes](skills/visualize/SKILL.md#artifact-themes).

## System Explore evidence (v0.6.0)

On 2026-08-28, one fresh Codex agent using the installed npm mount exercised a fictional red-led editorial brief with no incumbent identity or supplied layout. It built three broad directions serially, then continued with a focused secondary-color comparison: an unchanged control, lower chroma, and less colored area. Both reviews passed 12 candidate/width/theme states each, covering wide and 390 px views in light and dark, content parity, overflow, theme precedence, URL copy/restore/reset, keyboard focus, no-JavaScript readability, reduced motion, and browser health. Full-document contact sheets were inspected. The focused round retained the broad review and preserved its layout, typography, primary color, and content; no project authority files were written.

Computed browser contrast passed. The focused coverage variant required manual resolution of axe's incomplete pseudo-element contrast checks; all observed pairs passed. The palette helper did not support the fixture's hex input, so its check is recorded as unsupported, not passing. Existing schema, catalog, authoring, palette-smoke, fixture, preview, and mirror checks passed, with inherited authoring warnings.

The same journey then compared typography against the lower-chroma baseline. Twelve further states passed fixed palette/content/component-arrangement checks, an unchanged control, contrast, themes and review controls. Natural text reflow remained allowed. Four full-document contact sheets were inspected. The alternatives use local font stacks, so exact glyph rendering remains platform-dependent. Earlier reviews were retained and no system was adopted.

A third fresh installed-skill agent started focused without a layout: neutral-gray control versus a named purple/cyan palette-and-data-emphasis bundle. Eight render states passed, including labeled chart/table parity, graphic/text contrast, theme precedence and review controls. Both token exports passed the palette helper. In isolated negative clones, browser checks caught 1.54:1 text contrast; visual review caught a color-only chart mapping that automated checks did not detect. Repairs passed wide/phone checks and left the valid review unchanged. The fixture's OS guard was normalized to `teach`'s documented selector spelling before final evidence. This is observed behavioral coverage, not formal accessibility certification.

A second fresh agent routed undocumented/conflicting identity to `teach`, asked one question for ambiguous scope, and proposed explicit replacement without edits. Coherent incumbents with and without `DESIGN.md` also routed literal `explore system` requests to `teach`. Input hashes stayed unchanged. Its approved replacement comparison combined two coordinator-built directions with an independent noticeboard builder that received no sibling inputs. Host limits required sequential scheduling. All 12 assembled render states and the full no-JavaScript phone view passed, with explicit availability labels, inert actions, contrast, theme/URL controls and no overflow. Screenshots were inspected; canonical files remained unchanged.

A fourth fresh agent exercised full-draft confirmation, stale-source refusal, occupied-backup refusal, and a deliberately injected write failure after only `DESIGN.md` changed. It reported the partial state without automatic rollback or retry. A separately approved repair wrote only the pending CSS, preserved owner additions and unchanged `PRODUCT.md` metadata, and retained both the original backup and a fresh backup of the partial state. All 12 post-write render cases passed against the written tokens. A displayed draft typo exposed a presentation ambiguity; shared `teach` guidance now requires exact saved-draft display and writing reviewed contents. The rerun passed. Strict Stitch validation was unavailable, and hex palette input remains unsupported; neither is reported passed.

Greenfield adoption then created only the three separately confirmed files from the displayed drafts. Twelve further render cases read the newly written tokens and passed theme, content, contrast, focus, inert-action, and overflow checks; four screenshots were inspected. Evidence is disposable under `temp/system-explore-2026-08-28/`. This record describes observed Codex behavior, not coverage across all supported hosts. The maintained procedure is [System Explore](skills/visualize/reference/explore-system.md).

The register journey also created a standalone report with the approved purple/cyan palette, then refined only paragraph measure. An opted-in screenshot supplied atmosphere evidence; its mostly white/gray pixels did not replace approved semantic roles. Before/after checks at wide and phone widths in light/dark preserved all tokens, content, chart proportions and direct labels, with passing contrast and no overflow. Four final screenshots were inspected. No project authority was created.
