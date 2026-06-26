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

## Quirks (none yet)

This file gets populated as host-specific behaviours surface during testing. Currently every host loads the same canonical mount with no per-host overrides.
