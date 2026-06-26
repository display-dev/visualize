---
name: Stratechery
description: Editorial publishing register — serif masthead, warm-neutral chrome, Stratechery-orange overlay on white prose body.

# Colors carry shadcn-semantic slug names that visualize templates already
# read (`var(--card)`, `var(--primary)`, etc.). OKLCH per the visualize
# palette convention; Stitch's linter validates hex sRGB only and will warn
# on these strings — accepted trade for one source of truth. Values here
# are the light-mode normative source; dark-mode values live in the
# template-side dispatch.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.1450 0 0)"
  card: "oklch(0.94 0.04 60)"
  card-foreground: "oklch(0.1450 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.1450 0 0)"
  primary: "oklch(0.7 0.18 60)"
  primary-foreground: "oklch(1 0 0)"
  secondary: "oklch(0.94 0.04 60)"
  secondary-foreground: "oklch(0.1450 0 0)"
  muted: "oklch(0.97 0.005 60)"
  muted-foreground: "oklch(0.5560 0 0)"
  accent: "oklch(0.94 0.04 60)"
  accent-foreground: "oklch(0.1450 0 0)"
  destructive: "oklch(0.5770 0.2450 27.3250)"
  destructive-foreground: "oklch(1 0 0)"
  border: "oklch(0.9220 0 0)"
  input: "oklch(0.9220 0 0)"
  ring: "oklch(0.7 0.18 60)"

typography:
  display:
    fontFamily: "Mercury Display, Caslon, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  heading:
    fontFamily: "Mercury Display, Caslon, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  mono:
    fontFamily: "var(--font-mono)"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  sm: "2px"
  md: "4px"
  lg: "9999px"

spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  badge-membership:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0.25rem 0.75rem"
  card-sidebar:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
  nav-link:
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
---

# Design System: Stratechery

## 1. Overview: Publication Chrome with Editorial Gravity

**Creative North Star: "The Reading Site"**

Stratechery is a single-author analysis publication — Ben Thompson, weekly essays, paywalled. The design system reads as **mainstream-publishing register**: serif masthead for recognition, comfortable prose body, restrained chrome that gets out of the way of long-form reading. There is no app, no dashboard, no other surface; the page is the product.

Stratechery explicitly rejects: motion, hover reveals, gradient washes, dark-mode-as-default, multi-hue accent stacks. The masthead's orange badge stack (Subscribe + Log In + Member Forum) is brand-canonical, not slop — it earned its place by being chained, identical, and stable for a decade.

**Key Characteristics:**
- Editorial publishing register — light-mode first, white prose body, warm-cream sidebar chrome.
- Single accent: Stratechery orange, used on the logo circle, badges, and membership CTAs only.
- Serif display, sans body — the publication mix.
- No motion; nothing reveals, hovers, or animates.
- 17px body with generous leading — built for long reading sessions.

## 2. Colors

A pure-white prose body, warm-cream sidebar chrome, and a single warm-orange accent that carries every interactive moment.

### Primary
- **Stratechery Orange** (`oklch(0.7 0.18 60)`, ~`#E89042`): The logo circle's fill, the "UPDATES" badge, the "PODCASTS" badge, "Subscribe" CTA, the membership chip. Warm orange — not crimson, not vermillion.

### Neutral
- **Pure White Background** (`oklch(1 0 0)`): The article body. The reading canvas.
- **Warm Cream Card** (`oklch(0.94 0.04 60)`): The Stratechery Plus sidebar, member-area chrome. Soft peach tinted off the same hue family as primary.
- **Near-Black Foreground** (`oklch(0.1450 0 0)`): Body text, headings.
- **Mid-Gray Muted** (`oklch(0.5560 0 0)`): Byline, timestamps, supporting metadata.
- **Hairline Border** (`oklch(0.9220 0 0)`): Structural seams, 1px only.

### Named Rules

**The One-Voice-Orange Rule.** Stratechery orange appears on the logo circle, badges, and membership CTAs. It is never used as a surface wash, never as inline-text emphasis, never on body chrome. Rarity is the recognition.

**The Cream-Sidebar Rule.** The warm-cream `--card` is sidebar-only — the Stratechery Plus block, the member-area shelf. The prose body sits on pure white, always.

## 3. Typography

**Display Font:** Mercury Display / Caslon family (transitional serif, all-caps letterspaced for the wordmark)
**Body Font:** system sans (`ui-sans-serif`)
**Mono Font:** system mono (`ui-monospace`)

**Character:** The serif/sans split is the publication signal. Serif at the top (masthead, section labels on Stratechery Plus), sans through the article body and navigation. The byline ("By Ben Thompson") sits in sans; the wordmark above it sits in serif caps.

### Hierarchy

- **Display** (serif, 600, `clamp(1.75rem, 4vw, 2.5rem)`, letterspaced 0.04em): The `STRATECHERY` wordmark and top-of-essay titles.
- **Heading** (serif, 600, 1.5rem): Section heads within long essays, Stratechery Plus block labels.
- **Title** (sans, 500, 1.125rem): Sub-section heads, sidebar component titles.
- **Body** (sans, 400, 17px, leading 1.65): Article prose. Comfortable for long-form reading.
- **Label** (sans, 500, 0.8125rem, letterspaced 0.02em): Badge text, nav links, member chip.

### Named Rules

**The Serif-Recognition Rule.** The wordmark is set in transitional serif caps. The wordmark alone (without the orange logo circle) reads off-brand. Always pair the two.

**The 17px Body Rule.** Article body sits at 17px with 1.65 leading. Stratechery is a reading site — type sizing is non-negotiable.

## 4. Elevation

Flat. Surfaces are paper-flat; depth comes from the warm-cream sidebar against the white body, not from shadows. The mainstream-publishing register doesn't lift anything.

### Named Rules

**The Paper-Flat Rule.** No shadows, no elevation, no card lift on hover. The masthead, the article body, the sidebar — all rest on the page plane.

## 5. Components

### Buttons

- **Shape:** Sharp-cornered (`--radius-sm`, ~2px). Not pill, not soft — newspaper-button rectangle.
- **Primary:** Stratechery-orange background, white text, label scale, padding 0.5rem 1rem. No state shift — buttons don't animate on hover.

### Membership Badges

- **Shape:** Pill (`--radius-lg`, fully rounded).
- **Style:** Orange background, white text, label scale. The chained stack (Subscribe + Log In + Learn More + Member Forum) is brand-canonical — repetition is the signal, not slop.

### Cards & Containers

- **Sidebar Card:** Warm-cream background (`--card`), near-black text, soft 4px corner. The Stratechery Plus shelf, member-area block.
- **Article Body:** No card frame. Prose runs against the page.
- **Border:** 1px hairline `--border` only where structural seams need calling out.

### Navigation

- **Style:** Sans body, weight 500, label scale.
- **States:** Default `--foreground`; no underline at rest, no hover shift. The masthead is read, not interacted with.

## 6. Do's and Don'ts

### Do:

- **Do** keep the prose body on pure white. The cream tint is sidebar-only — see The Cream-Sidebar Rule.
- **Do** pair the orange logo circle with the serif `STRATECHERY` wordmark. Either alone reads off-brand.
- **Do** use orange for badges, the membership chip, and "Subscribe" CTAs only — see The One-Voice-Orange Rule.
- **Do** hold body at 17px with 1.65 leading. Stratechery is a reading site.
- **Do** chain identical orange badges when the brand pattern calls for it (Subscribe + Log In + Member Forum). Repetition is the signal.

### Don't:

- **Don't** animate anything. No hover reveals, no scroll-driven transitions, no fade-ins. Stratechery has no motion.
- **Don't** wash the body in warm-cream. Cream belongs to the sidebar.
- **Don't** use orange as inline-text emphasis or as a surface wash. Rarity is the recognition.
- **Don't** swap the serif wordmark for a sans approximation. The transitional serif is the brand signal.
- **Don't** ship dark-mode-as-default. Stratechery is light-mode-first; dark mode is the lifted-hue variant, not the canonical surface.
- **Don't** lift cards with shadows or hover elevation — see The Paper-Flat Rule.

<!--
Captured 2026-05-19 from https://stratechery.com — primary value (warm
orange, not the deep crimson the earlier fixture incorrectly claimed)
verified against the logo circle and the UPDATES / PODCASTS badges. The
Editorial register holds; the colour was wrong.
-->
