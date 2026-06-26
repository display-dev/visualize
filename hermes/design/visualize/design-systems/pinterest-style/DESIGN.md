---
slug: pinterest-style
name: Pinterest Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.pinterest.com/
  - https://business.pinterest.com/
  - https://newsroom.pinterest.com/
canonical-canvas: light
selection:
  mood: [playful, tactile]
  tone: [friendly, optimistic]
  formality: low
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a friendly, optimistic register with playful, tactile visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid for compliance, legal, or executive-review contexts that require restraint.

---

# Pinterest Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Consumer | https://www.pinterest.com/ | White discovery feed | Live page foregrounds Pinterest, Discover, ideas, inspiration, save, pins, and boards. |
| Business | https://business.pinterest.com/ | Creator/ads education | Live business site foregrounds Pinterest Business, ads, campaigns, audience, and trends. |
| Newsroom | https://newsroom.pinterest.com/ | Editorial updates | Live newsroom foregrounds Pinterest Newsroom, trends, creator, shopping, visual discovery, and company updates. |

Pinterest is a visual-discovery system. Chrome must get out of the way of pins: red anchors identity and action, cream/warm grays support readability, and the actual image grid carries the page. The system is most convincing when it shows masonry density, save actions, boards, search, and trend context.

## §2 Palette

### Identity And Chrome

- `--primary`: Pinterest Red. Use for wordmark moments, Sign up/Save actions, active indicators, and the strongest business CTA.
- `--primary-foreground`: white on red.
- `--background`: white feed canvas.
- `--card`: warm cream surface for soft cards and marketing panels.
- `--secondary` / `--muted`: pale cream for secondary buttons, filters, and panels.
- `--border` / `--brand-hairline-soft`: warm hairlines for cards, modals, and search surfaces.

### Support Tokens

- `--brand-surface-dark`: warm near-black for rare dark creator/business bands and dark previews.
- `--brand-secondary-bg` / `--brand-secondary-pressed`: gray-cream button family.
- `--brand-focus-outer` / `--brand-focus-inner`: double focus ring behavior.
- `--brand-success-pale`: success or status background only; do not make it a secondary brand colour.

### Drift vs `tokens.css`

- The token package still matches Pinterest: red CTA, Pin Sans, warm cream surfaces, rounded pills, masonry-card radii, and calibrated dark preview mode.
- Current source inventory should emphasize Discover, ideas, inspiration, save, pins, boards, shopping, business, ads, campaign, audience, trends, creator, and newsroom.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Pin Sans | 600-700 | 48-72px | 1.05-1.15 | 0 |
| Heading | Pin Sans | 600-700 | 32-48px | 1.1-1.2 | 0 |
| Title | Pin Sans | 600-700 | 16-22px | 1.2-1.35 | 0 |
| Body | Pin Sans | 400 | 15-17px | 1.35-1.55 | 0 |
| Label | Pin Sans | 600-700 | 12-14px | 1.0-1.25 | 0 |
| Mono | system mono only for data/debug snippets | 400 | 12-14px | 1.4-1.6 | 0 |

Keep text friendly and concrete. Let content categories, search terms, and board names do the work; avoid abstract brand claims.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://www.pinterest.com/`
**Description:** Header with Pinterest mark, search, Explore/Discover routes, business links where relevant, Log in, and red Sign up CTA.
**States:** desktop, mobile, logged out, logged in, search focused, active route.

### discovery-hero

**Status:** current
**Live source:** `https://www.pinterest.com/`
**Description:** Introductory discovery hero around finding ideas and inspiration, supported by a preview grid of pins.
**States:** default, search-focused, logged-in redirect, reduced-motion.

### search-bar

**Status:** current
**Live source:** Pinterest consumer surfaces
**Description:** Rounded search field for ideas, pins, boards, shopping, and trends. It should be large enough to be the primary control.
**States:** empty, focused, suggestions, typed, no results.

### masonry-pin-grid

**Status:** current
**Live source:** Pinterest feed conventions
**Description:** Dense waterfall grid of pins with varied aspect ratios, tight gutters, rounded images, and content-first hierarchy.
**States:** loading, populated, infinite scroll, empty, filtered.

### pin-card

**Status:** current
**Live source:** Consumer pin/feed language
**Description:** Image-first card with title/metadata revealed or tucked depending on context. The image is the card.
**States:** default, hover, focused, selected, video, shopping.

### red-save-button

**Status:** current
**Live source:** Pinterest save actions
**Description:** Red pill Save action attached to a pin, board, idea, or shopping item.
**States:** default, hover, saved, disabled, loading.

### board-card

**Status:** current
**Live source:** Pinterest boards language
**Description:** Board preview card with collage of pins, board title, pin count, owner/avatar, and privacy indicator when needed.
**States:** default, hover, private, collaborative, saved.

### idea-chip

**Status:** current
**Live source:** Discover/search conventions
**Description:** Rounded topic chip for ideas, styles, recipes, home, fashion, beauty, shopping, or seasonal searches.
**States:** default, selected, hover, removable.

### visual-search-lens

**Status:** current
**Live source:** Pinterest visual discovery conventions
**Description:** Overlay control for searching within an image, cropping a region, or finding similar objects.
**States:** inactive, active, dragging, results, no match.

### pin-detail-modal

**Status:** current
**Live source:** Pinterest pin detail conventions
**Description:** Modal/detail layout with image, title, outbound link, save action, board selector, comments, and related pins.
**States:** open, loading, saved, board picker, comments.

### board-picker-popover

**Status:** current
**Live source:** Save flow conventions
**Description:** Popover for selecting or creating a board when saving a pin.
**States:** default, searched, board selected, create board, saving.

### creator-profile-card

**Status:** current
**Live source:** Newsroom/business creator references
**Description:** Profile card for creator or publisher with avatar, name, description, follower/social proof, and follow/view action.
**States:** default, followed, verified, creator, brand.

### shopping-pin-card

**Status:** current
**Live source:** Pinterest shopping/business surfaces
**Description:** Product pin with image, price, merchant, availability, and shopping route.
**States:** default, sale, unavailable, saved, similar products.

### business-hero

**Status:** current
**Live source:** `https://business.pinterest.com/`
**Description:** Business landing hero for advertisers/brands, with inspiration-to-action positioning and red campaign CTA.
**States:** default, campaign CTA, case-study CTA, region.

### ads-campaign-card

**Status:** current
**Live source:** Business site references ads/campaigns
**Description:** Card for campaign objectives, creative formats, targeting/audience, budget, and performance context.
**States:** awareness, consideration, conversion, shopping, selected.

### audience-insight-panel

**Status:** current
**Live source:** Business site audience references
**Description:** Insight panel for audience interests, search trends, demographics, and opportunity signals.
**States:** default, filtered, trend up, saved report.

### trends-report-card

**Status:** current
**Live source:** Business and newsroom trend references
**Description:** Trend card with title, category, search lift/context, visual examples, and business implication.
**States:** default, featured, seasonal, archived.

### creative-guide-card

**Status:** current
**Live source:** Business creative education
**Description:** Guidance card for pin creative, video, shopping, catalog, or creator campaign best practices.
**States:** default, checklist, example, expanded.

### newsroom-article-card

**Status:** current
**Live source:** `https://newsroom.pinterest.com/`
**Description:** Editorial card for company news, creator stories, trend updates, shopping reports, and visual discovery announcements.
**States:** default, featured, date, category, external.

### newsroom-feature

**Status:** current
**Live source:** Newsroom page
**Description:** Larger editorial feature with image, category, headline, deck, and read-more route.
**States:** default, video, press, trend report.

### creator-story-grid

**Status:** current
**Live source:** Newsroom creator references
**Description:** Grid of creator stories with portrait imagery, title, category, and creator/community context.
**States:** default, filtered, featured, loaded.

### signup-modal

**Status:** current
**Live source:** Logged-out Pinterest surfaces
**Description:** Authentication modal with red primary signup, login alternative, provider buttons, and legal copy.
**States:** signup, login, error, loading, social provider.

### secondary-pill-button

**Status:** current
**Live source:** Pinterest navigation and filters
**Description:** Gray/cream rounded pill for secondary actions, filters, and non-primary navigation.
**States:** default, hover, selected, disabled.

### footer-link-columns

**Status:** current
**Live source:** Pinterest public/business/newsroom footers
**Description:** Compact footer for company, business, newsroom, policy, help, app, and social routes.
**States:** desktop, mobile accordion, locale, legal.

## §5 Composition Rules

1. Lead with pins, boards, creator visuals, trend imagery, or product imagery. Chrome is secondary.
2. Keep Pinterest Red scarce and decisive: Save, Sign up, campaign CTA, active brand mark.
3. Use masonry or collage layouts whenever the content is visual discovery.
4. Round cards and pills generously, but keep text blocks simple.
5. Business surfaces can be more structured, but should still show creative examples and trend imagery.
6. Trend and audience claims need category context, not isolated metric tiles.

## §6 Accessibility And States

- Save buttons need visible labels, not icon-only red dots.
- Masonry cards need keyboard focus and non-hover access to save/actions.
- Image-heavy layouts require alt/title context and loading states.
- Red on dark needs contrast checks; prefer red buttons on light/cream surfaces.
- Modal and board-picker flows need focus trap and escape behavior.

## §7 Anti-Patterns

- Do not use stock-like abstract gradients or decorative blobs.
- Do not make red the page background; it is the action signal.
- Do not build generic feature-card grids without real pins or visuals.
- Do not flatten the masonry feed into equal-height corporate cards.
- Do not let business charts replace creative examples and trend imagery.
