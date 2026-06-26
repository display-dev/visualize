---
name: Sentinel
description: SRE / observability brand — Console design system, info-blue --primary overlay, traffic-light chart palette as the identity, dark-mode native.

# Light-mode values are the normative source. Sentinel overlays Console's
# ops register: surfaces and chart palette stay theme-resolved; --primary
# is the info-blue brand anchor.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.1450 0 0)"
  primary: "oklch(0.45 0.15 225)"
  primary-foreground: "oklch(0.9850 0 0)"
  muted: "oklch(0.9700 0 0)"
  muted-foreground: "oklch(0.5560 0 0)"
  destructive: "oklch(0.5770 0.2450 27.3250)"
  border: "oklch(0.9220 0 0)"
  ring: "oklch(0.45 0.15 225)"

typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.8125rem"
    fontWeight: 400

rounded:
  md: "calc(0.625rem - 2px)"

spacing:
  sm: "0.5rem"
  md: "1rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
---

# Design System: Sentinel

## 1. Overview: The Calm Operator

Sentinel reads as **the calm in the incident room** — the dispassionate chrome that earns trust from on-call SREs scanning dashboards under time pressure. Inherits Console: dark-mode-native ops register, compact density, traffic-light chart palette as the visible identity. Info-blue overlays `--primary`; surfaces and chart tokens stay theme-resolved.

The system's job is to stay out of the way during incidents. No alarm-prose in the chrome, no motion that could be confused with live state, no neon that competes with the genuine signal in the data.

**Key Characteristics:**
- Info-blue `--primary` (`oklch(0.45 0.15 225)` light, `oklch(0.62 0.15 225)` dark) — distinct from IDE's vivid keyword-blue at lower chroma and a slightly cooler hue.
- Traffic-light chart palette inherited from Console: healthy-green / warning-amber / critical-red / info-blue / neutral-slate. The hue → status mapping IS the identity.
- Compact density by default; comfortable for customer-facing transparency artifacts.
- Mono-heavy: service identifiers, timestamps, alert IDs, deploy SHAs, regex in runbooks all render in mono.
- Motion absent on chrome. The product is real-time; marketing chrome resists motion to avoid confusion with live state.

## 2. Colors: Info-Blue Over Console

Console's traffic-light chart palette carries the identity. `--primary` overlays Console's default info-blue with Sentinel's brand-calibrated hue.

### Primary
- **Sentinel Info-Blue** (`oklch(0.45 0.15 225)` light, `oklch(0.62 0.15 225)` dark): Focus rings, doc anchors, primary CTAs, KPI-tile "info" status. Calmer register than IDE's keyword-blue (hue 230 chroma 0.18) — lower chroma, slightly cooler hue.

### Neutral
- Inherits Console's deep slate-blue surfaces (hue 230, chroma 0.020) in dark mode; light-mode falls through to zero-chroma neutrals.

### State
- **Destructive Red** (`oklch(0.5770 0.2450 27.3250)`): Theme default. Used on the `critical` chart-token directly (chart-3 in Console's palette) — destructive and critical-status share the same red by design.

### Chart Palette (the identity)
- Console's five-stop traffic-light palette: `--chart-1` healthy-green, `--chart-2` warning-amber, `--chart-3` critical-red, `--chart-4` info-blue, `--chart-5` neutral-slate. Reader is pre-trained on hue → status mapping; reordering breaks comprehension.

### Named Rules

**The Hue-Is-Status Rule.** Chart palette hues are doctrinal. Green means healthy, amber means warning, red means critical, blue means informational, slate means neutral / no-data. Never recolour for variety — the mapping is the contract.

**The Calm-Register Rule.** `--primary` lands at chroma 0.15, not Console's default 0.18. Calmer hue carries the dispassionate posture into focus rings and CTAs.

## 3. Typography: System Sans, Mono-Forward

**Display Font:** sans (theme default, `var(--font-sans)` → `ui-sans-serif` fallback stack)
**Body Font:** same sans family.
**Mono Font:** `var(--font-mono)` → `ui-monospace` fallback.

**Character:** Type-base 15px (matches IDE / Console density). Mono carries more weight than typical SaaS — operational content is dense with identifiers, timestamps, and SHAs that need fixed-width framing.

### Named Rules

**The Mono-For-Identifiers Rule.** Service IDs, timestamps, alert IDs, deploy SHAs, regex patterns in runbook steps render in mono. Prose that surrounds them stays sans.

**The Dispassionate-Type Rule.** Postmortems are calm even when describing severe events. No oversized headers, no all-caps section labels, no decorative emphasis. Gravity comes from precision.

## 4. Elevation

Flat. Console is dark-mode-native and depth is communicated through tonal layering on surfaces (deep slate-blue surface-1 → slightly lifted surface-2). Shadows respond to state (hover, floating UI) but never as a decorative wash.

### Named Rules

**The No-Glow Rule.** Dark-mode glow effects (`text-shadow: 0 0 20px`, neon underlays, drop-shadow auras) are forbidden. The product is real-time; chrome that mimics live signal is a comprehension hazard.

## 5. Components

### Buttons
- **Shape:** `--radius-md` (Console default). Not pill.
- **Primary:** Sentinel info-blue fill, white text. Used for primary CTAs and acknowledgement actions ("Acknowledge", "Resolve incident").
- **Focus:** Info-blue ring (`--primary`). Visible keyboard focus is non-negotiable in an ops UI.

### Cards & KPI Tiles
- Inherits Console: hairline `--border`, flat at rest. KPI tiles use chart-palette status colours for the indicator dot, never for the tile background.

### Wordmark + Monogram
- **Wordmark:** `Sentinel` set in the sans display family. Used on website nav and dashboard chrome.
- **Monogram:** `Σ` (Greek sigma — sum / total / aggregate, Sentinel's job is rolling up many signals into one). Used on favicons and artifact-footer corner marks.

## 6. Do's and Don'ts

### Do:
- **Do** keep the traffic-light chart palette intact. The hue → status mapping is the identity — see The Hue-Is-Status Rule.
- **Do** reserve `--primary` for structural accent (CTAs, focus rings, KPI info-status). Calmer chroma than IDE's keyword-blue is deliberate.
- **Do** render service identifiers, timestamps, alert IDs, SHAs, and regex in mono — see The Mono-For-Identifiers Rule.
- **Do** keep postmortem chrome dispassionate. The prose carries the gravity, the design carries the calm.
- **Do** preserve compact density on operational artifacts; shift to comfortable only for customer-facing transparency surfaces.

### Don't:
- **Don't** add dark-mode glow effects, neon underlays, or `text-shadow` auras. The `slop/dark-glow` whitelist is explicitly not granted — see The No-Glow Rule.
- **Don't** recolour the chart palette for variety or aesthetic balance. Reordering breaks the hue → status contract.
- **Don't** add scroll-driven reveals, skeleton-to-content morphs, or any decorative motion. The product is real-time; chrome that animates competes with live state.
- **Don't** use alarm-prose in headings or labels. *"P99 latency degraded 14× during the window"* over *"the site got slow"*.
- **Don't** swap `--primary` to IDE's vivid keyword-blue. The calmer chroma is the brand-calibrated register.

---

> **Captured:** 2026-05-20, migrated from the free-form fixture brand profile at `fixtures/sentinel/DESIGN.md` (Console design system + info-blue `--primary` overlay; traffic-light chart palette inherited from Console as the visible identity).
