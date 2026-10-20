---
slug: ollama-style
name: Ollama Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://ollama.com/
  - https://ollama.com/library
  - https://ollama.com/download
canonical-canvas: light
selection:
  mood: [brand-system, technical]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with brand-system, technical visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Ollama Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://ollama.com/ | Minimal white developer landing | Current metadata: "Ollama is the easiest way to automate your work using open models, while keeping your data safe." Live page still foregrounds "Get up and running" and model access. |
| Library | https://ollama.com/library | Searchable model catalog | Current metadata: "Browse Ollama's library of models." Live inventory emphasizes Models, Llama, DeepSeek, Qwen, Gemma, embedding, vision, and tools. |
| Download | https://ollama.com/download | Platform download | Current page targets Download Ollama on macOS, with Linux and Windows routes also present. |

Ollama is a local-first developer brand with almost no ornamental surface. It should feel like a product README made approachable: centered intro, black pill CTA, terminal command, model list, platform download, and quiet trust copy about keeping data safe.

## §2 Palette

### Monochrome Core

- `--background`: white page canvas.
- `--foreground`: black primary ink.
- `--primary`: black for the canonical CTA pill.
- `--primary-foreground`: white for text inside the black pill.
- `--secondary` / `--muted`: very light gray cards, command wells, and alternating model rows.
- `--border`: pale hairline for model cards, search fields, pricing/download panels, and code containers.
- `--brand-surface-dark`: near-black terminal / inverted card surface.

### Small Signals

- `--brand-focus-ring`: accessible blue focus ring. Keep it interaction-only.
- `--brand-terminal-red`, `--brand-terminal-yellow`, `--brand-terminal-green`: terminal traffic-light dots and CLI window detail.
- `--brand-link` and `--brand-link-mute`: black/gray link family. Ollama does not need blue marketing links.

### Drift vs `tokens.css`

- The token package matches current Ollama: white canvas, black pill action, rounded controls, light gray surfaces, system UI text, mono code, and a near-black terminal surface.
- Current source inventory should emphasize local open models, data safety, download, macOS/Linux/Windows, library, Llama, DeepSeek, Qwen, Gemma, embedding, vision, tools, and CLI commands.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | SF Pro Rounded / rounded system fallback | 500 | 32-44px | 1.1-1.2 | 0 |
| Heading | SF Pro Rounded / rounded system fallback | 500 | 24-32px | 1.15-1.25 | 0 |
| Title | system sans | 500 | 18-22px | 1.3-1.45 | 0 |
| Body | system sans | 400 | 15-17px | 1.45-1.6 | 0 |
| Label | system sans | 500 | 12-14px | 1.1-1.35 | 0 |
| Code | ui-monospace | 400 | 13-15px | 1.45-1.65 | 0 |

Keep copy plain and short. Use code type only for commands, model names, tags, and API snippets.

## §4 Component Vocabulary

### minimal-header

**Status:** current
**Live source:** `https://ollama.com/`
**Description:** Small header with Ollama mark, navigation to models/library, download, and account/community routes. It should not dominate the page.
**States:** desktop, mobile, active route, signed in, menu open.

### local-model-hero

**Status:** current
**Live source:** `https://ollama.com/`
**Description:** Centered landing hero for getting up and running with open models locally, supported by a black primary pill and terminal/install affordance.
**States:** default, download focused, model search focused, reduced-motion.

### black-primary-pill

**Status:** current
**Live source:** Homepage/download actions
**Description:** Fully rounded black CTA for Download, Get Started, Run, or Copy command.
**States:** default, hover, focus, loading, disabled.

### secondary-outline-pill

**Status:** current
**Live source:** Navigation and secondary actions
**Description:** White or light-gray pill with hairline border for docs, library, release notes, or platform switches.
**States:** default, hover, selected, disabled.

### terminal-install-card

**Status:** current
**Live source:** Homepage install pattern
**Description:** Near-black terminal window showing a short command such as install, pull, or run, with traffic-light dots and copy action.
**States:** default, copied, focused, error, long command.

### model-search-field

**Status:** current
**Live source:** `https://ollama.com/library`
**Description:** Search input for the model library with plain placeholder text, rounded field shape, and keyboard-first filtering.
**States:** empty, focused, typing, results, no results.

### model-library-list

**Status:** current
**Live source:** `https://ollama.com/library`
**Description:** Catalog list of models with name, short description, tags, size/family hints, and route to details.
**States:** default, filtered, loading, empty, selected.

### model-card

**Status:** current
**Live source:** Library page
**Description:** Individual model row/card for Llama, Gemma, Qwen, DeepSeek, embedding, vision, and tool-capable models.
**States:** default, hover, featured, updated, deprecated.

### model-tag-chip

**Status:** current
**Live source:** Library page
**Description:** Small monochrome chip for model traits such as tools, vision, embedding, latest, instruct, or family.
**States:** default, selected, removable, disabled.

### model-detail-header

**Status:** current
**Live source:** Ollama model pages implied by library routes
**Description:** Model page heading with model name, description, pulls/version metadata, tags, and primary run command.
**States:** default, latest, version selected, unavailable.

### pull-command-row

**Status:** current
**Live source:** Ollama model and install conventions
**Description:** Inline command row for `ollama pull` or `ollama run`, with copy button and optional model variant.
**States:** default, copied, focused, overflow, error.

### model-version-table

**Status:** current
**Live source:** Model detail conventions
**Description:** Simple table/list for model variants, sizes, quantization, context, updated date, and command.
**States:** default, sorted, selected, copied.

### platform-download-tabs

**Status:** current
**Live source:** `https://ollama.com/download`
**Description:** Platform selector for macOS, Linux, Windows, and container/CLI instructions when present.
**States:** macOS, Linux, Windows, selected, unavailable.

### macos-download-panel

**Status:** current
**Live source:** `https://ollama.com/download`
**Description:** Download panel centered on macOS with primary action, version/release metadata, and follow-up install instructions.
**States:** default, downloading, checksum visible, release notes.

### linux-install-panel

**Status:** current
**Live source:** Download page platform routes
**Description:** Linux install instructions with shell command, package notes, and service start hints.
**States:** default, copied, distro note, troubleshooting.

### windows-download-panel

**Status:** current
**Live source:** Download page platform routes
**Description:** Windows download instructions with installer action and basic setup status.
**States:** default, downloading, installed, update available.

### data-safety-callout

**Status:** current
**Live source:** Homepage metadata references data safety
**Description:** Quiet statement about keeping data safe/local. Use normal text hierarchy, not alarm-colour treatment.
**States:** default, expanded, linked docs.

### open-model-feature-row

**Status:** current
**Live source:** Homepage and library copy
**Description:** Row explaining local open-model automation, model choice, privacy, and CLI/API workflow.
**States:** default, compact, paired with command.

### api-snippet-card

**Status:** current
**Live source:** Developer workflow conventions
**Description:** Code card for local API examples. Use mono text, minimal syntax colour, and a copy affordance.
**States:** default, copied, language selected, overflow.

### docs-link-card

**Status:** current
**Live source:** Developer/documentation conventions
**Description:** Small card linking to docs, API reference, model customization, Modelfile, or troubleshooting.
**States:** default, hover, visited, external.

### release-note-row

**Status:** current
**Live source:** Download/update conventions
**Description:** Row for a version, date, platform changes, and changelog route.
**States:** latest, previous, expanded, security.

### faq-accordion

**Status:** current
**Live source:** Support/download conventions
**Description:** Plain accordion for install, model storage, system requirements, privacy, and updates.
**States:** collapsed, expanded, focused.

### community-link-row

**Status:** current
**Live source:** Ollama ecosystem conventions
**Description:** Compact route row for GitHub, Discord/community, docs, blog, or support resources.
**States:** default, hover, external, disabled.

### footer-minimal

**Status:** current
**Live source:** ollama.com footer conventions
**Description:** Minimal footer with product, resources, company/community, and legal routes. Keep it quieter than the content.
**States:** desktop, mobile, external links.

## §5 Composition Rules

1. Lead with a working command, model name, or download action. Ollama should feel immediately runnable.
2. Use monochrome surfaces. Colour is for terminal dots and focus, not brand decoration.
3. Keep hero copy centered and short; put detail into commands, model cards, or docs links.
4. Prefer lists, code rows, and download panels over abstract feature cards.
5. Round interactive controls fully, but keep cards modestly rounded and bordered.
6. Privacy/data-safety messages should be calm and factual.

## §6 Accessibility And States

- Black pill CTAs need visible white text and focus rings.
- Command rows need copy feedback that is not colour-only.
- Model tags must remain readable at small sizes.
- Long model names and commands must wrap or scroll without breaking layout.
- Dark terminal cards must preserve contrast for mono text and traffic-light dots.

## §7 Anti-Patterns

- Do not use AI gradients, glowing orbs, or neon model imagery.
- Do not turn the llama mascot into repeated decoration.
- Do not over-explain with marketing superlatives; show commands and models.
- Do not make every card a rounded pill; reserve pill geometry for actions and chips.
- Do not use blue links as a default brand accent.
