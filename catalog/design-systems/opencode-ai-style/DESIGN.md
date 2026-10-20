---
slug: opencode-ai-style
name: OpenCode AI Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://opencode.ai/
  - https://opencode.ai/docs
  - https://github.com/anomalyco/opencode
canonical-canvas: light
selection:
  mood: [developer, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with developer, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# OpenCode AI Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://opencode.ai/ | Warm cream terminal marketing | Live page repeatedly foregrounds OpenCode as an AI coding agent, with GitHub, install, models, provider, terminal, and agent language. |
| Docs | https://opencode.ai/docs | Monospace documentation | Current docs title: "Intro | AI coding agent built for the terminal" and description: "Get started with OpenCode." Navigation includes Config, Providers, TUI, CLI, GitHub, Models, and Commands. |
| GitHub | https://github.com/anomalyco/opencode | Open-source repository | Current GitHub title: "The open source coding agent." |

OpenCode is a terminal-native brand. The page should read like a polished manpage: monospaced everywhere, warm cream canvas, muted brown/charcoal ink, hairline boxes, bracket markers, code-first examples, and one dark TUI mockup as the main visual proof.

## §2 Palette

### Warm Terminal Neutrals

- `--background`: warm near-cream canvas.
- `--foreground` / `--primary`: warm near-black ink and primary CTA fill.
- `--card` / `--secondary`: slightly darker cream panels for docs blocks, command cards, and navigation wells.
- `--border`: low-alpha warm hairline for terminal boxes and section rules.
- `--brand-surface-dark`: warm near-black TUI surface.
- `--brand-surface-dark-elevated`: prompt row / panel fill inside the TUI mockup.
- `--brand-on-dark` and `--brand-on-dark-mute`: terminal text on the dark surface.

### Semantic Accents

- `--accent`: blue action/link accent for focus states and selected documentation affordances.
- `--brand-warning`, `--brand-danger`, and `--brand-success`: terminal/log statuses, not marketing colour blocks.
- `--brand-ash`, `--brand-mute`, and `--brand-stone`: muted comments, metadata, and prompt context.

### Drift vs `tokens.css`

- The token package remains aligned: Berkeley Mono everywhere, warm cream canvas, dark TUI surface, 4px rectilinear controls, low-alpha borders, and hand-tuned dark mode.
- Current source inventory should emphasize AI coding agent, terminal, TUI, CLI, install, Config, Providers, Models, Commands, GitHub, provider/model selection, and open-source repo context.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Berkeley Mono | 700 | 32-42px | 1.35-1.55 | 0 |
| Heading | Berkeley Mono | 700 | 15-18px | 1.45-1.65 | 0 |
| Title | Berkeley Mono | 700 | 15-18px | 1.45-1.65 | 0 |
| Body | Berkeley Mono | 400 | 14-16px | 1.45-1.65 | 0 |
| Label | Berkeley Mono | 500-700 | 12-14px | 1.4-1.8 | 0 |
| Code | Berkeley Mono | 400 | 13-16px | 1.45-1.65 | 0 |

Everything is mono. Do not introduce a proportional sans for warmth; the brand’s warmth comes from the cream/charcoal palette and restrained spacing.

## §4 Component Vocabulary

### monospace-header

**Status:** current
**Live source:** `https://opencode.ai/`
**Description:** Compact mono header with OpenCode wordmark, docs/GitHub/install routes, and small utility actions.
**States:** desktop, mobile, active route, GitHub link, install CTA.

### terminal-agent-hero

**Status:** current
**Live source:** `https://opencode.ai/`
**Description:** Hero for an AI coding agent built for the terminal, pairing plain headline/copy with install and GitHub actions.
**States:** default, install focused, GitHub focused, reduced-motion.

### tui-mockup-card

**Status:** current
**Live source:** Homepage/docs terminal emphasis
**Description:** Dark card representing the OpenCode terminal UI with prompt, model/provider context, command output, status rows, and ASCII framing.
**States:** idle, thinking, diff shown, command running, error.

### install-command-row

**Status:** current
**Live source:** Homepage install references
**Description:** Single-line shell command with copy affordance and mono prompt prefix.
**States:** default, copied, focused, overflow, failed copy.

### github-repo-card

**Status:** current
**Live source:** `https://github.com/anomalyco/opencode`
**Description:** Open-source repository card with repo name, short description, license/status metadata, stars/forks when available, and route.
**States:** default, loading stats, starred, external.

### docs-shell

**Status:** current
**Live source:** `https://opencode.ai/docs`
**Description:** Documentation layout with sidebar navigation, article title, prose, code blocks, and right-side anchors where space allows.
**States:** desktop, mobile, active section, search open.

### docs-sidebar

**Status:** current
**Live source:** Docs navigation
**Description:** Mono sidebar for Intro, Installation, Config, Providers, TUI, CLI, GitHub, Models, Commands, and related docs routes.
**States:** expanded, collapsed, active, nested, mobile drawer.

### docs-search

**Status:** current
**Live source:** Documentation conventions
**Description:** Search box for docs and command references with keyboard shortcut hint.
**States:** empty, focused, results, no results, selected.

### config-file-card

**Status:** current
**Live source:** Docs Config section
**Description:** Code/prose card explaining configuration keys, project/user config, and examples.
**States:** default, copied, invalid, highlighted line.

### provider-selector

**Status:** current
**Live source:** Docs Providers section
**Description:** Selector/list for model providers with auth requirement, default model, and connection state.
**States:** disconnected, connected, selected, error, loading.

### model-picker

**Status:** current
**Live source:** Docs Models section
**Description:** Terminal-style model picker listing provider, model name, context metadata, and current selection.
**States:** closed, open, filtered, selected, unavailable.

### command-reference-row

**Status:** current
**Live source:** Docs Commands section
**Description:** Reference row for commands, flags, aliases, and examples.
**States:** default, expanded, copied, deprecated.

### cli-help-panel

**Status:** current
**Live source:** Docs CLI section
**Description:** Preformatted help output with command groups and flags. Keep it readable and copyable.
**States:** default, wrapped, copied, highlighted.

### tui-keybinding-table

**Status:** current
**Live source:** Docs TUI section
**Description:** Table of keyboard shortcuts, mode, action, and notes.
**States:** default, searched, platform-specific, selected.

### session-list

**Status:** current
**Live source:** Terminal agent workflow
**Description:** List of coding sessions with repo path, branch, model/provider, last activity, and status.
**States:** active, paused, failed, completed, archived.

### agent-message-block

**Status:** current
**Live source:** TUI workflow
**Description:** Message block for user prompt, assistant reasoning/action, tool call, result, and summary.
**States:** user, assistant, tool, streaming, error.

### diff-preview-panel

**Status:** current
**Live source:** Coding agent workflow
**Description:** Mono diff panel for file path, added/removed lines, hunk header, and apply/reject actions.
**States:** default, focused hunk, applied, rejected, conflict.

### permission-prompt

**Status:** current
**Live source:** Agent terminal workflow
**Description:** Explicit terminal prompt asking whether a tool/command can run, with command preview and selectable actions.
**States:** pending, approved, denied, timed out.

### tool-call-row

**Status:** current
**Live source:** Agent terminal workflow
**Description:** Row showing tool name, arguments summary, duration, exit status, and output preview.
**States:** queued, running, success, failed, cancelled.

### status-badge

**Status:** current
**Live source:** Terminal status vocabulary
**Description:** Small mono badge for success, warning, danger, running, provider, model, or auth state.
**States:** neutral, success, warning, danger, active.

### ascii-marker-list

**Status:** current
**Live source:** Imported/live visual language
**Description:** Text list using `[+]`, `[-]`, `[x]`, or `>` markers instead of icon tiles.
**States:** default, nested, checked, disabled.

### comparison-grid

**Status:** current
**Live source:** Product comparison conventions
**Description:** Hairline grid comparing terminal agent behavior, provider support, open-source posture, and workflow features.
**States:** default, highlighted column, mobile stacked.

### release-note-block

**Status:** current
**Live source:** GitHub/docs release workflow
**Description:** Changelog/release block with version, date, changes, fixes, and migration notes.
**States:** latest, previous, breaking, expanded.

### footer-terminal

**Status:** current
**Live source:** opencode.ai footer conventions
**Description:** Minimal mono footer with GitHub, docs, install, community, and legal routes.
**States:** desktop, mobile, external links.

## §5 Composition Rules

1. Use Berkeley Mono for every visible text element.
2. Keep the page warm, cream, and quiet; the TUI mockup is the main visual object.
3. Prefer bracket markers, rules, command rows, and code blocks over pictorial icons.
4. Show the terminal workflow directly: prompts, providers, models, tool calls, diffs, permissions.
5. Use blue only as a focused action/link accent; status colours belong inside terminal/log surfaces.
6. Keep radii small and shadows absent. Structure comes from hairlines and type rhythm.

## §6 Accessibility And States

- Mono text needs enough size and line-height for body copy.
- Code blocks and command rows must wrap or scroll without layout breakage.
- Focus states need more than a subtle border on the warm cream canvas.
- Status badges cannot rely on colour only; include text labels.
- Dark TUI panels need visible muted text, not near-black-on-black output.

## §7 Anti-Patterns

- Do not use gradient AI branding or glowing terminal decoration.
- Do not introduce proportional fonts.
- Do not turn bracket markers into decorative icon tiles.
- Do not make the page look like a generic dark developer dashboard.
- Do not hide the agent workflow behind abstract claims.
