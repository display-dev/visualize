---
slug: spacex-style
name: SpaceX Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.spacex.com/
  - https://www.spacex.com/vehicles/starship/
  - https://www.spacex.com/launches/Launches
  - https://www.spacex.com/humanspaceflight
  - https://www.spacex.com/humanspaceflight/moon
canonical-canvas: dark
selection:
  mood: [industrial, spatial]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with industrial, spatial visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# SpaceX Style

_Independent reference inspired by SpaceX's public product and mission surfaces. Not affiliated with or endorsed by SpaceX._

## §1 Canonical Canvas

SpaceX style is black, white, vehicle, mission. The design is almost anti-interface: fixed white navigation over full-bleed launch or spacecraft imagery, uppercase industrial type, short mission copy, and one ghost-outlined action. The photograph or video is the brand surface. UI chrome should disappear until it is needed.

The system spans Starship, Falcon 9, Falcon Heavy, Dragon, Human Spaceflight, Starlink, launch archives, and shop/light utility pages, but the canonical identity is dark. Use pure black, white type, narrow uppercase rhythm, and technical restraint. Never add a chromatic brand accent.

### fixed-mission-header

Use a fixed top nav over imagery: SpaceX wordmark, Vehicles, Launches, Human Spaceflight, Rideshare, Starshield, Starlink, Shop, and menu. Text is white, uppercase, and compact. Avoid opaque header bars unless the background requires legibility.

### full-bleed-launch-hero

The hero is a full viewport photograph or video of launch, booster, spacecraft, Starbase, orbit, Moon, or Mars. Type sits in the lower-left or lower-center with no decorative frame. Use one mission headline and one outlined action.

### mission-eyebrow

Eyebrows are uppercase, small, and tracked: RECENT LAUNCH, STARSHIP, HUMAN SPACEFLIGHT, FALCON 9, DRAGON, MISSION. They establish mission context before the headline.

### ghost-outline-button

Buttons are outlined white on dark imagery, uppercase, rectangular or lightly rounded, and sparse. They say WATCH, LEARN MORE, REWATCH, VIEW MISSION, or RESERVE. Filled accent buttons are off-brand.

### launch-card

Launch cards show mission name, date, vehicle, site, payload class, and outcome. Keep the card dark, thinly bordered, and compact. Use mission filtering as utility, not decoration.

### launch-filter-bar

Launch archive filters include mission, vehicle, launch site, return site, and launch date. Use compact uppercase labels, select controls, and thin separators.

### webcast-panel

Webcast panels show live or replay state, mission patch, launch time, vehicle, site, and watch action. The panel should feel like mission control, not a media landing page.

### starship-vehicle-panel

Starship surfaces emphasize the fully reusable transportation system, Super Heavy booster, Starship spacecraft, Starbase, Earth orbit, Moon, Mars, and beyond. Use large vehicle silhouette, numeric specs, and full-bleed steel imagery.

### falcon-vehicle-panel

Falcon pages use side-profile vehicle visuals, booster recovery stats, payload to orbit, height, diameter, mass, and reusable first-stage narrative. Keep numbers large and direct.

### dragon-vehicle-panel

Dragon panels show crew/cargo capsule, docking, ISS missions, crew capacity, orbit duration, and safety. Use white line diagrams or capsule photography on black.

### human-spaceflight-panel

Human Spaceflight pages are more emotional but still austere. Use Earth, orbit, Dragon interior, spacesuit, Moon, Mars, and crew mission options. Copy should be aspirational and short.

### earth-mission-card

Earth mission cards show Dragon orbiting every 90 minutes, custom flight paths, passenger capacity, and view-from-orbit imagery. Keep the layout cinematic.

### moon-mission-card

Moon mission cards show Starship lunar missions, docking system, payload or seat availability, and contact/sales actions. Use lunar surface or silhouette imagery.

### mars-mission-card

Mars cards are sparse and monumental. Show Starship, planetary horizon, launch cadence, payload, and the multiplanetary mission. Do not over-explain.

### starlink-card

Starlink surfaces show satellite internet, constellation, direct-to-cell, and global coverage. Use orbit lines only if they are functional; avoid sci-fi ornament.

### rideshare-card

Rideshare cards show payload class, schedule, vehicle, launch site, and booking path. They are more utility-oriented but still black/white.

### mission-stat-strip

Stats use large uppercase numerals with labels: launches, landings, reflights, payload mass, thrust, height, crew, orbit. Keep the strip horizontal and high-contrast.

### vehicle-spec-table

Spec tables are black panels with thin gray rules. Rows include height, diameter, mass, payload, thrust, engines, propellant, and reusability. Use no zebra striping.

### timeline-sequence

Mission timelines show liftoff, max Q, stage separation, boostback, entry burn, landing burn, deployment, splashdown, or orbit insertion. Use small ticks and exact mission times.

### recovery-card

Recovery cards show droneship, landing zone, Mechazilla, expended, or splashdown state. The label is factual; the visual can be dramatic.

### press-update-card

Updates use title, date, category, and short excerpt. They should read like mission notes, not blog cards.

### shop-product-card

Shop is the light exception. Product cards can use white canvas, black type, product photography, price, size, and add-to-cart. Keep typography industrial and restrained.

### footer-minimal

Footer is minimal: social links, privacy policy, suppliers, careers, contact, and copyright. No large newsletter module unless the source page includes it.

## §2 Palette

SpaceX has no decorative palette. Black and white carry the system; photography supplies exhaust orange, sky blue, steel gray, and planetary color.

#### pure-black

Use `#000000` as the primary marketing canvas. Do not tint it blue or purple.

#### launch-white

Use white for text, nav, buttons, rules, and mission labels. Secondary text can be cool gray, but still close to white.

#### graphite-rule

Use thin graphite rules for tables, overlays, and archived mission controls. Borders are subtle, never card-like.

#### photography-color

Let imagery provide all non-neutral color. Do not sample image colors into UI tokens.

## §3 Typography

The typographic voice is engineered: uppercase, condensed, tracked, and direct.

#### display-din

Use D-DIN Bold or a narrow industrial sans for display. Headings are uppercase with tight line-height and positive tracking.

#### body-din

Body copy is short and uses D-DIN or a simple sans. Avoid long paragraphs; SpaceX pages read in mission fragments.

#### numeric-specs

Numbers should be large, precise, and paired with units. Use engineering labels, not marketing stats.

## §4 Composition Rules

Composition should feel like a launch broadcast or mission plaque. One image, one headline, one action.

### image-first

Every major section needs a real vehicle, launch, crew, orbit, or planetary image. Abstract backgrounds are unacceptable.

### no-card-grid-marketing

Marketing pages should not become generic card grids. Use bands, overlays, and spec tables.

### sparse-copy

Keep text short. If a section needs more explanation, use specs or mission timeline rather than paragraphs.

### lower-third-type

Place type like a lower-third over video: grounded, direct, and out of the vehicle's visual path.

### one-action

One CTA per band. Multiple equal buttons weaken the mission posture.

## §5 Accessibility And States

Because type often sits on imagery, contrast must be checked against the actual crop. Use shadow, position, or image choice before adding visible overlays.

### contrast-on-image

Place text over dark areas or use a very subtle black floor. Avoid obvious gradient scrims.

### focus-state

Focus is a white outline or underline with offset. It must be visible on both black and photographic backgrounds.

### live-state

Live launch states use clear text: LIVE, UPCOMING, REPLAY, SCRUBBED, SUCCESS, NOMINAL. Do not rely on color.

### loading-state

Loading can use black skeleton bars, mission labels, or quiet progress lines. Avoid spinners that feel app-like.

## §6 Anti-Patterns

SpaceX style is easy to ruin by adding ordinary web decoration.

### avoid-color-branding

No blue accent, orange accent, gradients, or neon space colors in UI.

### avoid-rounded-saas-cards

Cards, pills, and dashboards should be rare. The brand is cinematic, not SaaS.

### avoid-cartoon-space

No illustrated planets, stars, astronauts, or playful orbit icons.

### avoid-dense-copy

Do not write long explanatory pages when a launch image, spec, or timeline can carry the message.
