---
name: Bun
description: Single-pane CRT register — hot-pink-on-deep-black terminal-native brand. Mono-dominant body, compact density, italic-as-accent.

# Light-mode values are the normative source; dark mode is the canonical
# brand register and lives in the sidecar tokens.css. OKLCH per visualize
# convention; Stitch's linter validates hex sRGB and will warn — accepted
# trade for one source of truth.
colors:
  background: "oklch(0.98 0.005 30)"
  foreground: "oklch(0.18 0 0)"
  primary: "oklch(0.62 0.22 0)"
  primary-foreground: "oklch(0.98 0.005 30)"
  secondary: "oklch(0.85 0.05 30)"
  secondary-foreground: "oklch(0.18 0 0)"
  destructive: "oklch(0.55 0.22 25)"
  destructive-foreground: "oklch(0.98 0.005 30)"
  border: "oklch(0.90 0.01 30)"
  ring: "oklch(0.62 0.22 0)"

typography:
  display:
    fontFamily: "Inter, 'Aktiv Grotesk', system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.15
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4

rounded:
  sm: "4px"
  md: "6px"

spacing:
  sm: "0.5rem"
  md: "1rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  code-chip:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 0.5rem"
---

# Design System: Bun

## 1. Overview: The Single-Pane CRT

**Creative North Star: "The Single-Pane CRT"**

Bun is a fast all-in-one JavaScript runtime; the brand surface reads as the runtime itself — a single CRT window where the product writes its own marketing in monospace. Dark mode is canonical; light mode exists but is the alternate register. The voice is ops-precise: short sentences, benchmark numbers, italic-on-display as the canonical emphasis pattern.

Bun explicitly rejects: the workstation-IDE register with chrome panels (that's a different system), softened performance claims, decorative scroll-driven motion, generous spacing that reads as comfortable. The runtime is the product; the design stays out of its own way.

**Key Characteristics:**
- Dark-mode canonical, light-mode supported but secondary.
- Single brand-overlay anchor: hot-pink on `--primary`; phosphor-green stays available as a secondary accent for install-success ticks.
- Mono-dominant body — code-blocks, install commands, file paths carry the voice.
- Compact density. Tight leading on code (1.4), comfortable on prose (1.6).
- Italic-on-display in pink — the canonical brand emphasis pattern.

## 2. Colors: The Hot-Pink Overlay

A monochrome neutral base with one high-chroma overlay: Bun hot-pink. Brand identity earns the chroma; nothing else does.

### Primary
- **Bun Hot-Pink** (`oklch(0.62 0.22 0)` light / `oklch(0.72 0.22 0)` dark, ~`#FF6BD9`): The defining accent. Lands on the "Build" CTA, code-chip borders (`bun install`), the new-version pill, and the italic-on-display emphasis. High chroma is doctrinal.

### Secondary
- **Pastel Cream-Pink** (`oklch(0.85 0.05 30)`): The bun mascot's body color. Not a chrome accent — reserved for the mascot surface.

### Neutral
- **Warm Paper Background** (`oklch(0.98 0.005 30)`): Light-mode body. Subtle warm tint distinguishes the alternate register from a sterile pure-white. Dark-mode background is theme-resolved deep black with the same warm-tint bias.
- **Near-Black Foreground** (`oklch(0.18 0 0)`): Primary text.
- **Hairline Border** (`oklch(0.90 0.01 30)`): 1px structural seams.

### State
- **Cadmium Red Destructive** (`oklch(0.55 0.22 25)`): Runtime error output — `bun run` failures, install conflicts. Consistent with terminal-output convention.

### Named Rules

**The Earned-Chroma Rule.** Hot-pink chroma exceeds the generic 0.20 ceiling because the brand identity *is* the chroma. No other accent in the system gets this license.

**The Phosphor-Green Secondary Rule.** Terminal's default phosphor-green stays available as a secondary accent for install-success markers and ticks. The brand-overlay replaces only `--primary`, not Terminal's full vocabulary.

## 3. Typography: Mono-Dominant

**Display Font:** Inter / Aktiv Grotesk (heavy geometric sans)
**Body Font:** Inter (lighter weight, same family)
**Mono Font:** JetBrains Mono / IBM Plex Mono

**Character:** The brand surface is *mostly* monospace — install commands, code blocks, package.json snippets, file paths. Mono is not a chrome element; it's the body voice. Display is reserved for marketing-page H1.

### Hierarchy
- **Display** (heavy sans, weight 800, `clamp(2rem, 5vw, 3.25rem)`, leading 1.15): Marketing-page H1.
- **Body** (sans, weight 400, 16px, leading 1.6): Prose passages.
- **Mono** (mono, weight 400, 14px, leading 1.4): Code blocks, install commands, file paths, technical metadata.

### Named Rules

**The Italic-Pink Emphasis Rule.** The marketing H1 carries one italic word in `--primary` pink ("Bun is a *fast* JavaScript package manager"). Italic-on-display is the canonical brand emphasis — not slop, not decoration.

**The Mono-Is-Body Rule.** When the artifact carries code, the body voice IS mono. Don't relegate mono to fenced blocks while sans carries the prose around them — let mono breathe across the surface.

## 4. Elevation

Flat. Bun's runtime register doesn't lift surfaces — depth is conveyed by the foreground/background contrast and the `--border` hairline. No shadow vocabulary in the brand chrome.

### Named Rules

**The No-Shadow Rule.** Terminal-native means flat-native. Drop shadows on cards or code-chips break the single-pane illusion.

## 5. Components

### Buttons
- **Shape:** `--rounded.sm` (4px). Tight corners match the terminal register.
- **Primary:** Hot-pink background, paper-cream text, weight 500, padding `0.5rem 1rem`. The "Build" CTA.
- **Hover:** Subtle 150ms ease-out transition. No transform, no lift.

### Code Chips
- **Style:** Hairline `--border` with hot-pink accent on the border-left for highlighted commands (`bun install`). Inline mono content.
- **Padding:** Tight (0.25rem 0.5rem) — chips read as inline code, not blocks.

### Mascot
- **Bun mascot** — soft bun shape with two dot eyes and small blush mark — sits left of the wordmark `Bun` (heavy sans, lowercase). Mascot fill is pastel cream-pink; wordmark stays foreground color. The mascot alone is recognised; the wordmark alone reads ambiguous.

## 6. Do's and Don'ts

### Do:
- **Do** carry hot-pink on `--primary` only — CTAs, code-chip borders, version pills, the italic-on-display word. See The Earned-Chroma Rule.
- **Do** let mono breathe across the body surface when the artifact carries code. See The Mono-Is-Body Rule.
- **Do** keep the destructive register on `bun run` errors and install conflicts in cadmium red.
- **Do** preserve italic-on-display in pink as the canonical emphasis pattern on the marketing H1.
- **Do** cite the benchmark number ("3x faster install", "26x faster than `npm install`") — the number is the claim.

### Don't:
- **Don't** soften performance claims to qualitative phrasing in polish passes. "3x faster" stays.
- **Don't** revive the retired bun-yellow as a chrome accent. It now appears on the mascot's cheek blush only.
- **Don't** structure the brand as the IDE workstation register with chrome panels — Bun is Terminal, single-pane.
- **Don't** add scroll-driven motion, parallax, or reveals. The runtime is the product; the marketing surface stays out of its way.
- **Don't** stretch hot-pink chroma to surfaces or backgrounds. The earned chroma lives on `--primary` overlay points only.

---

<!-- ## Captured
2026-05-19 from `https://bun.sh` — primary value (hot pink) verified against the "Build" tab fill, the code-chip border, and the "fast" italic emphasis. The bun-yellow era ended; this fixture replaces the 2026-04 capture which had yellow as primary. -->
