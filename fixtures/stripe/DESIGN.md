---
name: Stripe
description: Payments infrastructure brand — indigo-purple accent over Clean monochrome, Sohne-led typography, comfortable docs density.

# Light-mode values are the normative source. Stripe overlays Clean's
# monochrome baseline: surfaces stay neutral, hue lands on --primary only.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.1450 0 0)"
  primary: "oklch(0.5 0.2 285)"
  primary-foreground: "oklch(0.9850 0 0)"
  secondary: "oklch(0.75 0.18 55)"
  destructive: "oklch(0.5770 0.2450 27.3250)"
  border: "oklch(0.9220 0 0)"

typography:
  display:
    fontFamily: "Sohne, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Sohne, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "Sohne Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400

# Stripe inherits Clean's radius scale; only `md` is referenced by the
# components block below, declared here so the `{rounded.md}` ref resolves.
rounded:
  md: "0.625rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary-foreground}"
---

# Design System: Stripe

## 1. Overview: Indigo Over Monochrome

Stripe overlays Clean's restrained-monochrome register with a single indigo-purple accent and a Sohne-led type voice. The system reads as **precise infrastructure** — the dev-product default, dressed up only where a CTA or a focus ring needs to assert intent. Surfaces stay neutral; hue is reserved for action.

Inherits Clean's flat-by-default elevation and zero-chroma surfaces. The brand expression is concentrated in `--primary` (the indigo CTA fill) and the typography stack (Sohne, swapping in where licensed).

**Key Characteristics:**
- Indigo-purple accent (`oklch(0.5 0.2 285)` light, `oklch(0.72 0.2 285)` dark) on `--primary` only — CTAs, focus rings, subtitle emphasis.
- Sohne humanist sans across display, body, and mono — falls back to system stacks when unlicensed.
- Comfortable density on chrome around dense docs content; tighter on dashboard-shaped artifacts.
- Low decorative motion — button press, dialog open; no parallax, no scroll-driven reveal.
- Artifact chrome stays flat: Stripe's signature marketing gradients are a separate surface, not produced here.

## 2. Colors: Indigo Accent Over a Neutral Canvas

A monochrome canvas inherited from Clean with one branded accent. Indigo carries every primary action; orange exists as a documented secondary so embedded references aren't mistaken for off-brand.

### Primary
- **Stripe Indigo** (`oklch(0.5 0.2 285)`, approximately `#635BFF`): The brand accent. Fills primary CTAs ("Get started", "Contact sales") and subtitle emphasis ("grow your revenue"). Saturated enough to read as Stripe, restrained enough not to compete with content. Lifts to `oklch(0.72 0.2 285)` in dark mode.

### Secondary
- **Complementary Orange** (`oklch(0.75 0.18 55)`): Small secondary CTAs on the marketing site (e.g. "Sign in"). Documented so iteration verbs don't flag it as off-brand if it appears in embedded references. Not used on artifact chrome.

### Neutral
- Inherits Clean's zero-chroma palette in full — `--background`, `--foreground`, `--muted`, `--border`. No tinted surfaces.

### State
- **Destructive Red** (`oklch(0.5770 0.2450 27.3250)`): Theme default, used on dashboard error states. Never on marketing or artifact chrome.

### Named Rules

**The Hue-On-Action Rule.** Indigo lands on `--primary` only — CTAs, focus rings, subtitle accents. Surfaces remain zero-chroma. Stripe's marketing-page gradient mesh is page chrome, not artifact chrome.

## 3. Typography: Sohne Across the Stack

**Display Font:** Sohne (with `ui-sans-serif` fallback when unlicensed)
**Body Font:** Sohne (same family)
**Mono Font:** Sohne Mono (with `ui-monospace` fallback)

**Character:** Humanist sans with a slightly soft feel — carries across docs, dashboard, and marketing in one continuous voice. Mono is everywhere because documentation is the primary product surface: API method names, parameter identifiers, code samples, request IDs, error codes.

Type base 16px (Clean default). Tight leading (1.5) on prose-rich pages; looser leading (1.6) on chrome.

### Named Rules

**The Sohne-Or-System Rule.** Render in Sohne where licensed; fall through to the system sans / mono stack otherwise. Never substitute a third typeface to "look like" Sohne.

## 4. Elevation

Flat by default. Inherits Clean's shadow scale (`--shadow-2xs` through `--shadow-2xl`) for hover states and explicit elevation, but resting surfaces carry no shadow. Depth comes from hairline borders and type weight, not from elevation washes.

## 5. Components

### Buttons
- **Shape:** `--radius-md` (Clean default).
- **Primary:** Indigo background, white text, weight 500. Used for "Get started" / "Contact sales" intent.
- **Secondary:** Complementary orange where it appears in the wild; otherwise Clean's neutral secondary.
- **Focus:** Indigo focus ring (`--primary`) for keyboard navigation.

### Cards & Containers
- Inherits Clean: `--radius-lg`, white card, hairline `--border`, flat at rest. No card-level chrome additions.

### Wordmark
- **`stripe`** set in lowercase Sohne. The wordmark *is* the canonical mark; no separate icon for general use.

## 6. Do's and Don'ts

### Do:
- **Do** reserve indigo for `--primary` — CTAs, focus rings, subtitle emphasis. See The Hue-On-Action Rule.
- **Do** keep surfaces zero-chroma. Stripe's identity rides on the accent and the typeface, not on tinted backgrounds.
- **Do** render Sohne where licensed and fall through to `ui-sans-serif` / `ui-monospace` otherwise. See The Sohne-Or-System Rule.
- **Do** lean on mono for API identifiers, request IDs, error codes — documentation is the primary product surface.
- **Do** keep motion deliberate (button press, dialog open) and decorative motion absent.

### Don't:
- **Don't** apply Stripe's marketing-page gradient mesh to artifact chrome. The signature gradient is a separate surface; the detector's gradient warnings apply here normally.
- **Don't** introduce a third accent. Indigo carries action; orange is documented but not used on artifact chrome.
- **Don't** add scroll-driven reveals, parallax, or bounce. Motion stays low.
- **Don't** apologise in voice unless something genuinely went wrong; prefer the precise word over the colloquial one.

<!--
Captured 2026-05-19 from https://stripe.com — primary value verified against
the "Get started" CTA fill. Re-verify on next major Stripe brand refresh.
-->
