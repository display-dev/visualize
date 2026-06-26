#!/usr/bin/env node
// Greenfield brand-seed picker for visualize.
//
// When a project has no DESIGN.md and no usable repo guidance, creation
// should not collapse to the same Clean monochrome default every time.
// This helper returns one curated OKLCH anchor plus computed composition
// math and the rules that bite at composition time. The agent still
// composes the actual tokens from the brief; the seed is an
// anti-monoculture nudge, not a frozen palette.
//
// Design (schemaVersion 2):
//   - Seeds are stratified into 12 hue zones (30° buckets) plus a neutral
//     zone (C < 0.04). A pick draws a zone uniformly among occupied zones,
//     then a seed uniformly within it — sparse zones surface as often as
//     dense ones, so library skew never becomes pick skew.
//   - Every draw comes from one mulberry32 PRNG seeded from sha256 of the
//     key (or from crypto.randomBytes when keyless), so `--from` is
//     byte-identical across machines and Node versions. Never engine
//     randomness on the keyed path.
//   - `derived` carries computed color math the model should not estimate:
//     per-hue sRGB chroma budgets (the budget varies ~2x by hue — a flat
//     cap is wrong in both directions), real WCAG + APCA contrast numbers,
//     and light + dark lightness ladders with exact floors.
//   - `--check` validates a composed tokens block (or a full HTML artifact)
//     against the hard rules before render. Findings mirror detect.mjs
//     (`{ruleId, severity, locator, message}`, NDJSON with --json,
//     exit 2 on errors with --strict).
//
// Usage:
//   node palette.mjs                          # random pick (exploration)
//   node palette.mjs --from "<topic>"         # deterministic pick (default in create flow)
//   node palette.mjs --from "<topic>" --vary 2          # salted re-draw, stable until n changes
//   node palette.mjs --from "<topic>" --not red,pink    # veto zones (or seed ids), still deterministic
//   node palette.mjs --id verdigris           # explicit seed
//   node palette.mjs --list                   # id / zone / polarity / oklch for every seed
//   node palette.mjs --check tokens.css       # validate composed tokens (also accepts .html, or stdin via -)
//   node palette.mjs --check artifact.html --json --strict
//
// Env:
//   VISUALIZE_PALETTE_SEED — same as --from.
//
// Zone vocabulary for --not:
//   red orange gold yellow lime green teal azure blue violet purple pink neutral

import crypto from 'node:crypto';
import { readFileSync } from 'node:fs';

// ============================================================
// Seed library
//
// Coverage matrix (zone: seeds / polarity light-first|both|dark-first):
//   red 21 (10|7|4)    orange 20 (13|7|0) gold 15 (12|3|0)   yellow 14 (7|5|2)
//   lime 16 (7|6|3)    green 16 (10|5|1)  teal 11 (7|2|2)    azure 15 (9|6|0)
//   blue 13 (5|5|3)    violet 16 (9|5|2)  purple 16 (6|8|2)  pink 20 (9|7|4)
//   neutral 7 (2|4|1)
// All 13 zones occupied. `polarity` records which mode the seed most
// naturally anchors; the agent still composes both modes.
// ============================================================

const SEEDS = [
  {
    id: 'pressed-powder',
    oklch: 'oklch(0.782 0.054 0.1)',
    mood: 'face powder pressed in its compact, soft rose',
    strategy: 'Gentle surface tint on pure white — panels, empty states, hover washes — with near-black ink and dark text on its fills. No named accent; let it sit quiet against tinted grays.',
    polarity: 'light-first',
  },
  {
    id: 'macaron-shell',
    oklch: 'oklch(0.835 0.078 0.2)',
    mood: 'macaron shells boxed in tissue, powdery',
    strategy: 'Accent-only: chips, highlights, and soft fills on pure white with near-black ink, dark text on its fills. Neutrals stay tinted gray — never let the page itself go pastel.',
    polarity: 'light-first',
  },
  {
    id: 'stairwell-mauve',
    oklch: 'oklch(0.697 0.055 0.4)',
    mood: 'mauve wallpaper in a dim stairwell, faded and still',
    strategy: 'Muted surface tint and secondary emphasis on pure white with near-black ink. It is not a signal color — let type carry hierarchy, keep neutrals tinted, and name no second hue.',
    polarity: 'light-first',
  },
  {
    id: 'flamingo',
    oklch: 'oklch(0.714 0.177 0.5)',
    mood: 'flamingo feather in hard sun, unapologetic',
    strategy: 'Single loud primary on pure white or near-black, dark text on its fills at either pole. Keep the rest monochrome tinted gray — a second bright would tip it to candy.',
    polarity: 'both',
  },
  {
    id: 'stage-velvet',
    oklch: 'oklch(0.364 0.113 0.8)',
    mood: 'house-curtain velvet in a dark theater, ceremonial',
    strategy: 'Near-black scaffold; the velvet glows as committed primary with bone-white ink. Generous dark surfaces, sparse color elsewhere — tinted neutrals, no second hue on the bill.',
    polarity: 'dark-first',
  },
  {
    id: 'wine-lees',
    oklch: 'oklch(0.424 0.101 0.8)',
    mood: 'wine lees in the cellar dark, settled',
    strategy: 'Dark-first: near-black ground with the wine as glowing primary surface and emphasis, bone-white ink. On pure white it turns editorial. Tinted neutrals beside it; one pale gold accent at most.',
    polarity: 'dark-first',
  },
  {
    id: 'rhodonite',
    oklch: 'oklch(0.562 0.097 1.2)',
    mood: 'polished rhodonite, veined and composed',
    strategy: 'Deep primary on pure white, or inlaid in near-black where it reads richest; white ink on its fills. Keep companions tinted neutral — no second jewel tone.',
    polarity: 'both',
  },
  {
    id: 'peony',
    oklch: 'oklch(0.743 0.123 1.2)',
    mood: 'cut peonies on the florist\'s counter, unhurried',
    strategy: 'Commit peony as the primary on pure white: buttons, links, one full banner, dark text on its fills. Graphite ink elsewhere, tinted-gray neutrals, no second bloom of color.',
    polarity: 'light-first',
  },
  {
    id: 'cherry-blossom',
    oklch: 'oklch(0.796 0.098 2.0)',
    mood: 'cherry blossom against a gray spring sky, soft-spoken',
    strategy: 'Pale fields and pills on a pure white scaffold with near-black ink; dark text on its fills. Accent-first, never a wash — one deep plum state accent if hierarchy needs it.',
    polarity: 'light-first',
  },
  {
    id: 'silk-lining',
    oklch: 'oklch(0.721 0.089 2.7)',
    mood: 'faded silk lining of an old coat, worn rose',
    strategy: 'Soft surface fills and emphasis on pure white with near-black ink; dark text on its fills. Companions stay tinted neutral — if a state hue is needed, keep it to a single deep accent.',
    polarity: 'light-first',
  },
  {
    id: 'lipstick-stroke',
    oklch: 'oklch(0.575 0.205 8.0)',
    mood: 'matte lipstick drawn in one stroke, declarative',
    strategy: 'One emphatic primary on pure white or near-black, white ink on its fills: oversized type, rules, and a single drenched panel. Neutrals tinted; no companion color.',
    polarity: 'both',
  },
  {
    id: 'hibiscus-steep',
    oklch: 'oklch(0.513 0.159 8.7)',
    mood: 'hibiscus steeped strong, tart and dark',
    strategy: 'Committed primary at either pole: white ink on its fills over pure white, or a glowing brand mass on near-black. Tinted neutrals only; no second warm hue.',
    polarity: 'both',
  },
  {
    id: 'race-bib',
    oklch: 'oklch(0.642 0.235 12.1)',
    mood: 'race-bib pink under stadium lights, insistent',
    strategy: 'A signal, not a surface: small high-voltage hits — CTAs, live states, one stripe — on a near-black scaffold with white ink. Everything else stays neutral; never wash the page in it.',
    polarity: 'dark-first',
  },
  {
    id: 'blood-garnet',
    oklch: 'oklch(0.42 0.15 15)',
    mood: 'garnet under lamplight, formal and slow-burning',
    strategy: 'Near-black ground lets garnet glow as the committed primary; bone-white ink, champagne accent at most. On white it turns editorial — either way the scaffold stays neutral.',
    polarity: 'dark-first',
  },
  {
    id: 'watermelon',
    oklch: 'oklch(0.634 0.147 16.6)',
    mood: 'watermelon split open at a roadside stand',
    strategy: 'Committed primary both ways: white-ink fills on a pure white scaffold, or the glowing lead on near-black. Companions stay tinted neutral — resist a second fruit-bright hue.',
    polarity: 'both',
  },
  {
    id: 'reef-coral',
    oklch: 'oklch(0.718 0.128 25.4)',
    mood: 'reef coral in clear shallows, sunlit',
    strategy: 'Coral as the lead on pure white or floated on near-black — both poles work, dark text on its fills either way. Tinted neutrals around it; one deep teal accent at most.',
    polarity: 'both',
  },
  {
    id: 'rose-limewash',
    oklch: 'oklch(0.819 0.051 27.8)',
    mood: 'limewashed wall at noon, chalky and warm',
    strategy: 'Light-first: generous plastered surfaces over pure white with near-black ink and dark text on its fills. Treat it as wall, not signal — one terracotta accent maximum.',
    polarity: 'light-first',
  },
  {
    id: 'oxide-red',
    oklch: 'oklch(0.56 0.20 28)',
    mood: 'fired oxide, direct and physical',
    strategy: 'Use the red as the committed primary. Pair it with true white or near-black, not cream; let warmth live in the pigment.',
    polarity: 'both',
  },
  {
    id: 'rosewood-dust',
    oklch: 'oklch(0.616 0.061 29.0)',
    mood: 'rosewood sanding dust on the lathe, quiet',
    strategy: 'Quiet component accent on a pure white scaffold — rules, tags, secondary buttons — never a page wash. Graphite ink, warm-tinted neutrals, and at most one deeper wine accent.',
    polarity: 'light-first',
  },
  {
    id: 'afterglow',
    oklch: 'oklch(0.764 0.115 29.0)',
    mood: 'afterglow band on the horizon, ten minutes past sunset',
    strategy: 'Light-first: coral bands, callouts, and chart emphasis on pure white with near-black body ink and dark text on its fills. One slate accent at most; other companions stay tinted neutral.',
    polarity: 'light-first',
  },
  {
    id: 'bisque',
    oklch: 'oklch(0.754 0.065 29.7)',
    mood: 'bisque ware cooling on the kiln shelf, unglazed',
    strategy: 'Pure white scaffold, near-black ink; bisque as wide quiet surfaces — cards, bands, table heads — with dark text on its fills. Companions stay tinted neutral; one deeper rust accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'rooftop-dawn',
    oklch: 'oklch(0.802 0.096 30.5)',
    mood: 'dawn sky over rooftops before the traffic starts',
    strategy: 'Pale fields, soft banners, and state washes on pure white with near-black ink; dark text on its fills. Accent stance, not a wash — companions stay tinted neutral throughout.',
    polarity: 'light-first',
  },
  {
    id: 'hull-rust',
    oklch: 'oklch(0.446 0.139 34.6)',
    mood: 'rusted hull plate in dry dock, scaled and heavy',
    strategy: 'Heavyweight primary: full-bleed surfaces or thick rules with white ink on its fills, over pure white or near-black. Companions held to steel-tinted neutrals only.',
    polarity: 'both',
  },
  {
    id: 'vermilion',
    oklch: 'oklch(0.63 0.22 35)',
    mood: 'poster vermilion, urgent and editorial',
    strategy: 'Commit boldly: one vermilion surface or oversized type treatment. Keep secondary colors sparse.',
    polarity: 'light-first',
  },
  {
    id: 'courtyard-brick',
    oklch: 'oklch(0.572 0.098 36.6)',
    mood: 'courtyard brick in afternoon shade, softened by age',
    strategy: 'Brick as committed primary blocks and rules on pure white, white ink on its fills, graphite body ink. Companions stay tinted neutral; one olive accent only if hierarchy demands.',
    polarity: 'light-first',
  },
  {
    id: 'terracotta-yard',
    oklch: 'oklch(0.672 0.119 36.8)',
    mood: 'terracotta pots stacked in a sunlit yard',
    strategy: 'Committed primary fields on pure white with graphite body ink and white ink on its fills. Warm-tinted neutrals; one deep green accent only if the brief insists.',
    polarity: 'light-first',
  },
  {
    id: 'paprika',
    oklch: 'oklch(0.598 0.146 38.0)',
    mood: 'paprika heaped in a market scoop, dusty and hot',
    strategy: 'Strong primary either way: drenched panels on near-black, or white-ink fills on pure white. Cool tinted neutrals keep it from going brown; no second warm hue.',
    polarity: 'both',
  },
  {
    id: 'cinnamon-bark',
    oklch: 'oklch(0.527 0.135 41.0)',
    mood: 'cinnamon bark curled in the tin, sharp',
    strategy: 'Cinnamon as deep primary on pure white with white ink on its fills, or a warm mass glowing on near-black. Cool tinted neutrals; one straw accent at most.',
    polarity: 'both',
  },
  {
    id: 'cantaloupe',
    oklch: 'oklch(0.731 0.120 44.2)',
    mood: 'cantaloupe flesh at the breakfast table',
    strategy: 'Light-first primary or strong accent on pure white; dark text on its fills, graphite ink elsewhere. Hold companions to tinted neutrals; one fir-green accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'copper-field',
    oklch: 'oklch(0.66 0.17 45)',
    mood: 'burnished copper on a clean workbench',
    strategy: 'Keep the surface neutral and precise. Use copper for one strong field or repeated small accents, with graphite ink.',
    polarity: 'light-first',
  },
  {
    id: 'gingerbread',
    oklch: 'oklch(0.631 0.107 47.4)',
    mood: 'gingerbread fresh from the oven, crisp at the edges',
    strategy: 'Committed mid-weight primary on a pure white scaffold: bands, buttons, and chart fills with white ink on them. Warm-tinted neutrals; no second spice in the stack.',
    polarity: 'light-first',
  },
  {
    id: 'persimmon',
    oklch: 'oklch(0.70 0.17 50)',
    mood: 'persimmon on rice paper, bright and exact',
    strategy: 'Commit persimmon as the primary on pure white with graphite ink; no second warm hue — let one fruit color do the work.',
    polarity: 'both',
  },
  {
    id: 'apricot-jam',
    oklch: 'oklch(0.765 0.141 54.2)',
    mood: 'apricot jam jarred against the window light',
    strategy: 'Commit it light-first: apricot as the primary on pure white, dark text on its fills, near-black ink for body. One hue only — tinted neutrals, no second warm.',
    polarity: 'light-first',
  },
  {
    id: 'safety-orange',
    oklch: 'oklch(0.68 0.16 55)',
    mood: 'industrial orange, active and legible',
    strategy: 'Use orange for state, labels, or a single committed band. Balance it with cool neutrals to avoid brown/orange sameness.',
    polarity: 'both',
  },
  {
    id: 'saddle-tan',
    oklch: 'oklch(0.686 0.088 55.6)',
    mood: 'saddle leather, waxed and evenly worn',
    strategy: 'Saddle tan as primary surfaces on pure white or set against near-black — dark text on its fills both ways. Tinted neutrals elsewhere; one oxblood accent at most.',
    polarity: 'both',
  },
  {
    id: 'walnut-stock',
    oklch: 'oklch(0.424 0.054 57.1)',
    mood: 'oiled walnut, dense grain in low light',
    strategy: 'Dark surface tint or grounded primary on near-black; on pure white it acts as weighty ink with white text on its fills. Warm-tinted neutrals; a single amber accent at most.',
    polarity: 'both',
  },
  {
    id: 'chamois',
    oklch: 'oklch(0.784 0.067 57.2)',
    mood: 'chamois cloth folded in the glovebox, supple',
    strategy: 'Quiet surface tint on pure white — cards, wells, sidebars — never the page ground. Near-black ink, dark text on its fills, tinted neutrals only; hierarchy comes from type.',
    polarity: 'light-first',
  },
  {
    id: 'adobe-dusk',
    oklch: 'oklch(0.808 0.106 57.9)',
    mood: 'adobe wall holding the last sun',
    strategy: 'Light-first: warm fields and feature bands on a pure white scaffold, near-black ink, dark text on its fills. Never the page ground itself — every companion stays a tinted neutral.',
    polarity: 'light-first',
  },
  {
    id: 'tobacco-leaf',
    oklch: 'oklch(0.535 0.055 58.1)',
    mood: 'cured tobacco hung in the barn, leathery',
    strategy: 'Working accent, not a wash: tags, borders, and secondary fills on pure white with near-black ink, white ink on its solid fills. Everything else tinted neutral; no named accent.',
    polarity: 'light-first',
  },
  {
    id: 'kraft-wrap',
    oklch: 'oklch(0.742 0.084 58.9)',
    mood: 'kraft parcel wrap under flat light, matter-of-fact',
    strategy: 'Kraft tone as wrapping, not ground: banners, labels, and section heads on pure white with near-black ink and dark text on its fills. Tinted neutrals; skip a second warm hue.',
    polarity: 'light-first',
  },
  {
    id: 'dune-noon',
    oklch: 'oklch(0.849 0.077 59.9)',
    mood: 'dune face at noon, wind-rippled',
    strategy: 'Light-first accent: sand-toned chips, table stripes, and callouts on a pure white scaffold, near-black ink, dark text on its fills. The page ground stays white, never sand.',
    polarity: 'light-first',
  },
  {
    id: 'spruce-resin',
    oklch: 'oklch(0.719 0.118 63.0)',
    mood: 'spruce resin beading on a fresh cut, glassy',
    strategy: 'Light-first: amber as committed primary fields and emphasis on pure white, dark text on its fills, graphite ink for body. Companions stay tinted neutral — one deep bark-brown accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'clay',
    oklch: 'oklch(0.58 0.13 65)',
    mood: 'dry clay, material and human',
    strategy: 'Use clay as a component accent, not a full beige page ground. Keep the canvas white, black, or distinctly brand-tinted.',
    polarity: 'light-first',
  },
  {
    id: 'pharmacy-amber',
    oklch: 'oklch(0.541 0.098 68.2)',
    mood: 'amber bottle on the dispensary shelf, dim',
    strategy: 'Deep amber primary at either pole: white ink on its fills over pure white, or glowing against near-black. Cool tinted neutrals keep it off brown; admit no second warm hue.',
    polarity: 'both',
  },
  {
    id: 'ripe-wheat',
    oklch: 'oklch(0.680 0.123 75.1)',
    mood: 'standing wheat, heavy-headed before harvest',
    strategy: 'Commit it as the light-system primary on pure white — bands, buttons, chart fills — with dark text on its fills and near-black body ink. One hue only; tinted neutrals, never a beige ground.',
    polarity: 'light-first',
  },
  {
    id: 'ashlar',
    oklch: 'oklch(0.769 0.091 80.7)',
    mood: 'dressed sandstone in late sun, even-grained',
    strategy: 'Generous surface fills and feature bands on a pure white scaffold; near-black ink, dark text on its fills. The stone stays in components — the page ground itself is never sand or cream.',
    polarity: 'light-first',
  },
  {
    id: 'sisal',
    oklch: 'oklch(0.656 0.051 81.6)',
    mood: 'sisal rope coiled by the boathouse, salt-dried',
    strategy: 'Quiet component accent on pure white — tags, dividers, secondary buttons — with white ink on its solid fills and near-black body ink. Tinted neutrals only; never let the page go rope-beige.',
    polarity: 'light-first',
  },
  {
    id: 'ochre-index',
    oklch: 'oklch(0.74 0.14 82)',
    mood: 'editorial ochre, dry and grown-up',
    strategy: 'Use ochre as ink or rule color against white. Add a deep blue-black accent if the artifact needs contrast.',
    polarity: 'light-first',
  },
  {
    id: 'run-honey',
    oklch: 'oklch(0.842 0.118 83.1)',
    mood: 'honey run thin off the dipper, sunlit',
    strategy: 'Accent-first on pure white: honey pills, highlights, and chart fills with dark text on its fills; near-black ink carries body. Never spread it as a page wash — one deep amber accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'saffron',
    oklch: 'oklch(0.78 0.14 85)',
    mood: 'saffron threads on white ceramic, precise warmth',
    strategy: 'Accent-first: saffron pills, rules, and highlights on a pure white scaffold with near-black ink. Dark text on saffron fills.',
    polarity: 'light-first',
  },
  {
    id: 'washed-khaki',
    oklch: 'oklch(0.719 0.061 85.4)',
    mood: 'khaki canvas gone soft with wear',
    strategy: 'Quiet surface tint on a pure white scaffold — cards, wells, table stripes — with near-black ink and dark text on its fills. Companions stay tinted neutral; the ground itself stays white, never sand.',
    polarity: 'light-first',
  },
  {
    id: 'bullion-fringe',
    oklch: 'oklch(0.506 0.085 86.1)',
    mood: 'gold bullion fringe on a regimental flag, dulled',
    strategy: 'Works at both poles: deep gold primary on pure white with white ink on its fills, or glowing regalia on near-black with bone-white ink. Tinted-gray neutrals; no second metallic, no beige.',
    polarity: 'both',
  },
  {
    id: 'stoneground',
    oklch: 'oklch(0.582 0.071 86.1)',
    mood: 'stoneground mustard in the crock, coarse',
    strategy: 'Committed primary on pure white: buttons, rules, and one strong band with white ink on its fills, graphite body ink. Tinted neutrals elsewhere — no second warm hue, no cream ground.',
    polarity: 'light-first',
  },
  {
    id: 'hayloft',
    oklch: 'oklch(0.684 0.085 88.1)',
    mood: 'baled straw in the hayloft, dry and even',
    strategy: 'Pure white scaffold with near-black ink; straw gold works as wide surface fills and section bands, dark text on its fills. Companions stay tinted neutral — the page never goes beige.',
    polarity: 'light-first',
  },
  {
    id: 'vellum',
    oklch: 'oklch(0.814 0.077 88.6)',
    mood: 'aged vellum, smooth under the thumb',
    strategy: 'Accent and soft fill only on a pure white scaffold, dark text on its fills, near-black ink. Resist the obvious move — it is never the page ground; one deep umber accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'gilt-frame',
    oklch: 'oklch(0.631 0.104 89.4)',
    mood: 'gilt frame in gallery half-light, burnished',
    strategy: 'Commit it as the primary on pure white for an editorial read, or let it burnish against near-black; white ink on its fills. Tinted-gray neutrals only — never a gold page wash.',
    polarity: 'both',
  },
  {
    id: 'brass-plaque',
    oklch: 'oklch(0.72 0.12 95)',
    mood: 'engraved brass on an oak door, institutional and assured',
    strategy: 'Brass as committed primary or ink-adjacent accent on true white with graphite ink. Never wash the page in gold — the scaffold stays plain.',
    polarity: 'both',
  },
  {
    id: 'hazard-yellow',
    oklch: 'oklch(0.85 0.16 100)',
    mood: 'taxi yellow under sodium light, urgent and utilitarian',
    strategy: 'Loudest on a near-black scaffold: yellow as the single signal color, white ink, steel neutrals. Dark text on yellow fills, always.',
    polarity: 'dark-first',
  },
  {
    id: 'fresh-sawn',
    oklch: 'oklch(0.818 0.117 103.1)',
    mood: 'softwood plank fresh off the saw, sap-bright',
    strategy: 'Pale fills, banners, and hover washes on a pure white scaffold; near-black ink, dark text on its fills. Accent stance, not a wash — the page never goes cream, neutrals stay tinted.',
    polarity: 'light-first',
  },
  {
    id: 'olivine',
    oklch: 'oklch(0.609 0.115 108.5)',
    mood: 'olivine grains in split basalt, granular',
    strategy: 'Committed primary on pure white, or set into near-black where it reads most mineral; white ink on its fills. Stone-tinted neutrals only — no second chromatic beside it.',
    polarity: 'both',
  },
  {
    id: 'worn-baseline',
    oklch: 'oklch(0.658 0.091 110.3)',
    mood: 'grass court worn at the baseline, late August',
    strategy: 'A soft light-system primary on pure white: section fills and emphasis with white ink on its solids, slate body ink. Companions hold to tinted gray — no second hue on court.',
    polarity: 'light-first',
  },
  {
    id: 'herbarium',
    oklch: 'oklch(0.536 0.053 116.5)',
    mood: 'herbarium specimen pressed flat, faded',
    strategy: 'A near-neutral workhorse on pure white: surface tints, dividers, and secondary text with white ink on its solid fills. Add nothing chromatic — one accent from the brief carries all signal.',
    polarity: 'light-first',
  },
  {
    id: 'field-jacket',
    oklch: 'oklch(0.685 0.058 117.0)',
    mood: 'surplus field jacket, sun-faded olive',
    strategy: 'Muted surface tint and secondary emphasis on pure white with near-black ink; dark text on its fills. Not a signal color — type carries the hierarchy and companions stay tinted neutral.',
    polarity: 'light-first',
  },
  {
    id: 'birch-flush',
    oklch: 'oklch(0.783 0.125 117.2)',
    mood: 'new birch leaves backlit, early May',
    strategy: 'Light-first accent: leaf-bright pills, highlights, and success states on pure white with near-black ink, dark text on its fills. Never a page wash — companions stay tinted gray.',
    polarity: 'light-first',
  },
  {
    id: 'oiled-tarp',
    oklch: 'oklch(0.423 0.075 117.6)',
    mood: 'oiled tarpaulin in the quartermaster\'s store',
    strategy: 'Dark-first: near-black ground with the olive as tinted dark surfaces and grounded primary, paper-white ink. On pure white it reads editorial. Neutrals only beside it — no second hue.',
    polarity: 'dark-first',
  },
  {
    id: 'uranium-glass',
    oklch: 'oklch(0.763 0.074 118.0)',
    mood: 'uranium glass on a sunny shelf, soft inner glow',
    strategy: 'Pale fields and pill highlights on pure white with near-black ink, dark text on its fills; one deeper olive reserved for state. Never a page wash — the glow stays in components.',
    polarity: 'light-first',
  },
  {
    id: 'sap-green',
    oklch: 'oklch(0.513 0.102 118.8)',
    mood: 'sap green worked across the palette knife',
    strategy: 'Deep primary on pure white with white ink on its fills, or a rich mass on near-black with bone-white ink. Keep the rest tinted neutral — one hue, no companion accent.',
    polarity: 'both',
  },
  {
    id: 'parakeet',
    oklch: 'oklch(0.659 0.130 118.8)',
    mood: 'feral parakeets loud in a city plane tree',
    strategy: 'One insistent primary used big: a committed band or hero surface on pure white or near-black, white ink on its fills. Everything else stays tinted gray — a second bright would tip it tropical.',
    polarity: 'both',
  },
  {
    id: 'absinthe',
    oklch: 'oklch(0.566 0.116 119.2)',
    mood: 'absinthe verte before the louche, herbal',
    strategy: 'Strong primary either way: drenched panels glowing on near-black, or white-ink fills on pure white with graphite body. Single-hue discipline — tinted neutrals, no second green or warm accent.',
    polarity: 'both',
  },
  {
    id: 'survey-tint',
    oklch: 'oklch(0.618 0.078 119.7)',
    mood: 'woodland tint on a folded survey map',
    strategy: 'Use it for rules, legends, and quiet emphasis on a pure white sheet with near-black body ink; white text on its solid fills. Companions stay tinted gray — one hue, nothing brighter.',
    polarity: 'light-first',
  },
  {
    id: 'tart-apple',
    oklch: 'oklch(0.713 0.168 127.9)',
    mood: 'green apple polished on a sleeve, tart and waxed',
    strategy: 'Light-first primary on a pure white scaffold — buttons, bands, chart fills — with dark text on its fills and graphite ink for body. Companions stay tinted neutral; resist a second bright.',
    polarity: 'light-first',
  },
  {
    id: 'electric-lime',
    oklch: 'oklch(0.82 0.18 128)',
    mood: 'electric lime, fast and synthetic',
    strategy: 'Use lime sparingly on dark or neutral surfaces. It is a signal color; do not wash the whole page in it.',
    polarity: 'dark-first',
  },
  {
    id: 'lichen',
    oklch: 'oklch(0.72 0.10 130)',
    mood: 'lichen green, calm and analytical',
    strategy: 'Use as a quiet success/state color or as the primary in a soft but non-cream light system.',
    polarity: 'light-first',
  },
  {
    id: 'tennis-ball',
    oklch: 'oklch(0.698 0.208 140.2)',
    mood: 'new tennis ball under floodlights, court-loud',
    strategy: 'Loud committed primary on pure white or set against near-black, dark text on its fills at both poles. Hold everything else to tinted grays; a second bright would turn it tropical-kitsch.',
    polarity: 'both',
  },
  {
    id: 'baize',
    oklch: 'oklch(0.532 0.156 140.6)',
    mood: 'brushed baize under the table light, level',
    strategy: 'Seed-as-ground where it counts: one full baize panel or committed primary on pure white or near-black, white ink on its fills. Tinted neutrals elsewhere; no second hue at the table.',
    polarity: 'both',
  },
  {
    id: 'fairway',
    oklch: 'oklch(0.607 0.182 140.6)',
    mood: 'mown fairway at first light, striped and dew-wet',
    strategy: 'Committed primary at either pole: strong fields on pure white with white ink on its fills, or a saturated mass glowing on near-black. Green-tinted neutrals carry support; no second hue.',
    polarity: 'both',
  },
  {
    id: 'chroma-key',
    oklch: 'oklch(0.782 0.244 141.6)',
    mood: 'chroma-key wall under studio rigs, synthetic and total',
    strategy: 'A signal on a near-black scaffold: focus states, key actions, one drenched band at most, with dark text on its fills and white ink for body. Nothing else chromatic — it needs no companion.',
    polarity: 'dark-first',
  },
  {
    id: 'moss-archive',
    oklch: 'oklch(0.42 0.11 145)',
    mood: 'moss-dark archive, quiet but not beige',
    strategy: 'Let moss green be the primary or dark surface tint. Pair with neutral paper-white, slate, or a restrained clay accent.',
    polarity: 'both',
  },
  {
    id: 'verdure',
    oklch: 'oklch(0.661 0.092 145.0)',
    mood: 'verdure tapestry green, washed soft by centuries',
    strategy: 'Soft primary or generous surface tint on pure white with near-black ink and dark text on its fills. Keep the page white, never cream; tinted-gray companions with one deeper green reserved for state.',
    polarity: 'light-first',
  },
  {
    id: 'bike-enamel',
    oklch: 'oklch(0.672 0.145 147.1)',
    mood: 'bicycle frame enamel fresh out of the spray booth, glossy',
    strategy: 'Committed primary on a pure white scaffold: buttons, bands, and chart fills with dark text on them, graphite ink for body. Companions held to tinted neutrals; no second enamel color.',
    polarity: 'light-first',
  },
  {
    id: 'greenback',
    oklch: 'oklch(0.487 0.116 148.0)',
    mood: 'engraved greenback ink, fine-lined and official',
    strategy: 'Ink-register primary on pure white — rules, headings, engraved-feel fills with white text on them — or a deep ground on near-black. Neutrals stay gray-green tinted; one hue only.',
    polarity: 'both',
  },
  {
    id: 'tractor',
    oklch: 'oklch(0.593 0.113 148.0)',
    mood: 'farm tractor paint under a film of field dust',
    strategy: 'Workhorse primary at either pole — solid fields on pure white with white ink on its fills, or a grounded mass on near-black. Warm-tinted gray neutrals; one straw accent only if hierarchy demands.',
    polarity: 'both',
  },
  {
    id: 'glowstick',
    oklch: 'oklch(0.839 0.212 148.0)',
    mood: 'snapped glowstick at a night meet, chemical-bright',
    strategy: 'Dark-first signal: small chemical-bright hits — live states, CTAs, one stripe — on near-black with white ink, dark text on its fills. Never wash a page in it; everything else stays neutral.',
    polarity: 'dark-first',
  },
  {
    id: 'spearmint',
    oklch: 'oklch(0.793 0.170 149.2)',
    mood: 'spearmint hard candy, cold-bright and sugared',
    strategy: 'Light-first: mint fills, chips, and highlights on a pure white scaffold with near-black ink and dark text on its fills. Keep companions tinted neutral — one deep evergreen accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'seedling',
    oklch: 'oklch(0.894 0.168 149.5)',
    mood: 'seedlings under the grow lamp, impossibly new',
    strategy: 'Accent-first on pure white: pale chromatic fields, pills, and success states with dark text on them; near-black ink does the work. One deep leaf-green accent for state — never a full wash.',
    polarity: 'light-first',
  },
  {
    id: 'faded-shutter',
    oklch: 'oklch(0.583 0.051 149.8)',
    mood: 'shutters sun-bleached to gray-green, hinges stiff',
    strategy: 'Quiet surface tint and secondary color on pure white with near-black ink; white text on its solid fills. Not a signal hue — type carries hierarchy and companions stay tinted gray.',
    polarity: 'light-first',
  },
  {
    id: 'lily-pad',
    oklch: 'oklch(0.751 0.111 151.7)',
    mood: 'lily pads in flat morning light, waxy and still',
    strategy: 'Accent-first on pure white: soft fills, tags, and empty-state washes with dark text on them; near-black ink carries body. Companions stay tinted gray — one deeper green at most.',
    polarity: 'light-first',
  },
  {
    id: 'racing-green',
    oklch: 'oklch(0.32 0.075 155)',
    mood: 'racing green, stable and engineered',
    strategy: 'Use green as the brand mass, not only status. Pair with bone-neutral only if the brief truly asks for heritage.',
    polarity: 'both',
  },
  {
    id: 'start-flag',
    oklch: 'oklch(0.716 0.148 156.4)',
    mood: 'green flag out over the start straight, immediate',
    strategy: 'Committed primary or oversized signal at either pole: one big flag of color on pure white or near-black, dark text on its fills. The rest of the grid stays achromatic — no companion hue.',
    polarity: 'both',
  },
  {
    id: 'emerald',
    oklch: 'oklch(0.633 0.135 156.8)',
    mood: 'cut emerald on the jeweler\'s cloth, lit from within',
    strategy: 'Jewel primary both ways: committed blocks on pure white with white ink on its fills, or glowing from near-black like a lit stone. Tinted-gray neutrals; nothing else saturated shares the setting.',
    polarity: 'both',
  },
  {
    id: 'filing-cabinet',
    oklch: 'oklch(0.484 0.077 157.6)',
    mood: 'steel filing cabinet green, dented and unfussy',
    strategy: 'Dark surface tint or grounded primary: full panels on near-black, or deep green fields on pure white with white text on them. Steel-tinted neutrals; admit one accent from the brief at most.',
    polarity: 'both',
  },
  {
    id: 'celadon',
    oklch: 'oklch(0.78 0.07 160)',
    mood: 'celadon glaze, museum-quiet',
    strategy: 'Pale celadon fields on pure white with near-black ink; one deep green state accent. Dark text on celadon fills.',
    polarity: 'light-first',
  },
  {
    id: 'jadeite',
    oklch: 'oklch(0.814 0.130 164.8)',
    mood: 'jadeite bowls stacked on a diner shelf, milk-green',
    strategy: 'Light-first: milky green panels, table stripes, and pills on pure white with near-black ink and dark text on its fills. One deeper green for state; companions otherwise tinted gray.',
    polarity: 'light-first',
  },
  {
    id: 'pine-shadow',
    oklch: 'oklch(0.35 0.07 165)',
    mood: 'pine forest at nightfall, quiet authority',
    strategy: 'Use as the dark surface tint itself or as a deep primary on near-black; paper-white ink, restrained moss accent.',
    polarity: 'dark-first',
  },
  {
    id: 'eucalyptus',
    oklch: 'oklch(0.667 0.053 170.1)',
    mood: 'eucalyptus drying in a jar, gray-green and papery',
    strategy: 'A muted secondary and surface color on pure white; graphite ink, white text on its solid fills. Nearly a neutral itself — add no named accent and let weight and rules carry hierarchy.',
    polarity: 'light-first',
  },
  {
    id: 'lagoon',
    oklch: 'oklch(0.773 0.130 173.3)',
    mood: 'lagoon shallows over coral sand, lit turquoise-green',
    strategy: 'Light-first primary: turquoise bands, heroes, and chart fills on pure white with dark text on them and near-black body ink. Hold companions to tinted neutrals — no second tropical hue.',
    polarity: 'light-first',
  },
  {
    id: 'greenhouse-frame',
    oklch: 'oklch(0.716 0.056 173.4)',
    mood: 'old greenhouse frame, its pale green chalking away',
    strategy: 'Quiet surface tint on pure white — cards, wells, section heads — never the page ground itself. Near-black ink, dark text on its fills, tinted-gray companions, no named accent.',
    polarity: 'light-first',
  },
  {
    id: 'hammam-tile',
    oklch: 'oklch(0.711 0.119 174.1)',
    mood: 'hammam tile under running water, worn smooth',
    strategy: 'Soft primary fields and tiled patterns on a pure white scaffold, dark text on its fills, near-black ink for body. One deep teal reserved for state; everything else tinted neutral.',
    polarity: 'light-first',
  },
  {
    id: 'scrub-green',
    oklch: 'oklch(0.574 0.092 174.7)',
    mood: 'laundered scrubs folded on the ward cart, soft and sterile',
    strategy: 'Steady primary on pure white — headers, fills, status — with white text on its fills and near-black body ink. Keep companions sterile-neutral; one deep teal accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'seafoam',
    oklch: 'oklch(0.849 0.141 177.0)',
    mood: 'seafoam sliding off wet sand, aerated and pale',
    strategy: 'Pale fields, cards, and hover washes on a pure white scaffold with near-black ink; dark text on its fills. One deep sea-green accent for state; the page ground itself stays white.',
    polarity: 'light-first',
  },
  {
    id: 'theatre-green',
    oklch: 'oklch(0.520 0.072 179.7)',
    mood: 'operating-theatre wall, eye-rest green and even',
    strategy: 'Works as the dark-mode surface tint itself or a quiet primary on pure white; white ink on its fills. Keep the room single-hue — tinted gray-greens for support, no named accent.',
    polarity: 'both',
  },
  {
    id: 'apothecary',
    oklch: 'oklch(0.841 0.076 179.8)',
    mood: 'apothecary bottle glass, watery pale green',
    strategy: 'Pale fills and rules on a pure white scaffold with near-black ink; dark text on its fills. It reads as tinted glass, not signal — one deep bottle-green accent carries state.',
    polarity: 'light-first',
  },
  {
    id: 'amazonite',
    oklch: 'oklch(0.736 0.089 184.5)',
    mood: 'tumbled amazonite, milky turquoise with white veins',
    strategy: 'Pale mineral fills and highlights on pure white, dark text on them, near-black ink elsewhere. One deeper teal for state; keep every other companion a tinted gray, never cream.',
    polarity: 'light-first',
  },
  {
    id: 'verdigris',
    oklch: 'oklch(0.63 0.09 185)',
    mood: 'oxidized copper roofline, weathered civic green',
    strategy: 'Patina as primary on a plain white scaffold with slate ink; one warm bronze accent only if hierarchy demands it.',
    polarity: 'light-first',
  },
  {
    id: 'cue-chalk',
    oklch: 'oklch(0.686 0.095 186.3)',
    mood: 'cue chalk worn to a crater, powdery blue-green',
    strategy: 'Powdery accent and soft fill color on pure white with near-black ink, dark text on its fills. Keep it matte and single-hue — tinted-gray companions, one deep slate accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'lido',
    oklch: 'oklch(0.812 0.117 191.6)',
    mood: 'lido water at opening hour, undisturbed',
    strategy: 'Light-first: pool-water panels, banners, and hover washes on pure white with near-black ink and dark text on its fills. One deep blue-green accent for state; never tint the whole page aqua.',
    polarity: 'light-first',
  },
  {
    id: 'petrol-depth',
    oklch: 'oklch(0.42 0.06 200)',
    mood: 'petrol blue-green at dusk, submerged and technical',
    strategy: 'Works as the dark ground itself or a deep primary on near-black; cool white ink; no second saturated hue.',
    polarity: 'dark-first',
  },
  {
    id: 'meltwater',
    oklch: 'oklch(0.763 0.111 200.6)',
    mood: 'meltwater pooling over pale stone, mineral and cold',
    strategy: 'Pale chromatic fields and progress states on a pure white scaffold; near-black ink, dark text on its fills. One deep teal accent at most — every other companion stays a cool tinted gray.',
    polarity: 'light-first',
  },
  {
    id: 'whale-back',
    oklch: 'oklch(0.475 0.051 205.0)',
    mood: 'whale back breaking a gray swell, wet slate-teal',
    strategy: 'Dark-first: deep primary or the tinted dark surface itself on near-black with white ink; on pure white it reads as grave slate-teal ink with white text on its fills. Cool tinted grays only.',
    polarity: 'dark-first',
  },
  {
    id: 'radar-glass',
    oklch: 'oklch(0.589 0.062 208.6)',
    mood: 'radar screen at standby, gray-teal glass barely lit',
    strategy: 'Muted dual-role color: quiet primary on pure white, or secondary glow and surface tint on near-black with white text on its fills. Nothing else chromatic unless the brief insists on one accent.',
    polarity: 'both',
  },
  {
    id: 'bridge-paint',
    oklch: 'oklch(0.543 0.075 208.9)',
    mood: 'riveted bridge steel in municipal teal, weathered',
    strategy: 'Infrastructure primary at both poles: painted-steel fields on pure white with white text on its fills, or a tinted dark surface on near-black. Steel-gray companions; one rust accent at most.',
    polarity: 'both',
  },
  {
    id: 'awning-teal',
    oklch: 'oklch(0.689 0.069 209.2)',
    mood: 'storefront awning faded to gray-teal, sun-tired',
    strategy: 'Muted secondary and surface tint on pure white; graphite ink, white text on its solid fills. Treat it as weathered canvas, not signal — tinted-gray companions and no named accent.',
    polarity: 'light-first',
  },
  {
    id: 'duck-egg',
    oklch: 'oklch(0.763 0.053 209.3)',
    mood: 'duck-egg paint on a dresser, chalky and domestic',
    strategy: 'Gentle surface tint on a pure white scaffold — cards, sidebars, empty states — with near-black ink and dark text on its fills. Keep it the only tint; companions stay warm-gray, the ground never cream.',
    polarity: 'light-first',
  },
  {
    id: 'blueprint-cyan',
    oklch: 'oklch(0.70 0.12 210)',
    mood: 'technical cyan, measured and diagrammatic',
    strategy: 'Use cyan for lines, nodes, and state. Avoid pairing it with purple; use charcoal, white, and muted steel instead.',
    polarity: 'both',
  },
  {
    id: 'robins-egg',
    oklch: 'oklch(0.804 0.124 215.4)',
    mood: 'robin\'s egg blue against dry nest straw, fragile',
    strategy: 'Pale fields, pills, and highlights on a pure white scaffold with near-black ink; dark text on its fills. One deeper teal reserved for state; everything else stays tinted gray.',
    polarity: 'light-first',
  },
  {
    id: 'pool-tile',
    oklch: 'oklch(0.627 0.097 218.4)',
    mood: 'municipal pool tile worn matte by chlorine and decades',
    strategy: 'Repeated fills and bands on a pure white scaffold — white ink on its solid fills, graphite body ink. Companions stay tinted neutral; one deep navy accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'postcard-sky',
    oklch: 'oklch(0.772 0.130 227.8)',
    mood: 'postcard sky over-inked at the press, holiday-bright',
    strategy: 'Light-first: generous fields and chart fills on pure white, dark text on them, near-black ink for body. One deep blue for state; never let the page itself go pastel.',
    polarity: 'light-first',
  },
  {
    id: 'marine',
    oklch: 'oklch(0.46 0.09 230)',
    mood: 'marine blue, calm technical depth',
    strategy: 'Use marine as the primary surface or navigation color. Pair with desaturated neutrals and a precise warm accent.',
    polarity: 'both',
  },
  {
    id: 'arctic-blue',
    oklch: 'oklch(0.80 0.08 230)',
    mood: 'glacier light, clinical and early-morning',
    strategy: 'Pale blue fields on pure white, near-black ink, dark text on its pale fills; one cobalt accent for state.',
    polarity: 'light-first',
  },
  {
    id: 'chore-coat',
    oklch: 'oklch(0.512 0.089 235.7)',
    mood: 'chore-coat cotton faded by seasons of work, practical',
    strategy: 'Committed primary at either pole: white ink on its fills over a pure white scaffold, or a worn-in surface color on near-black. Blue-tinted neutrals elsewhere; one rust accent at most.',
    polarity: 'both',
  },
  {
    id: 'zinc-roof',
    oklch: 'oklch(0.715 0.053 236.1)',
    mood: 'zinc rooftops under flat overcast, matte and even',
    strategy: 'A quiet surface color on pure white — cards, sidebars, table heads — never the page ground itself. Near-black ink, dark text on its fills, tinted neutrals; type carries hierarchy.',
    polarity: 'light-first',
  },
  {
    id: 'forget-me-not',
    oklch: 'oklch(0.716 0.142 237.8)',
    mood: 'forget-me-nots crowding the streambank, small and sure',
    strategy: 'Accent-first on pure white: pills, links, and highlight fills with dark text on them; near-black ink does the body work. Single-hue — one deeper blue for state, nothing warmer.',
    polarity: 'light-first',
  },
  {
    id: 'chalk-line',
    oklch: 'oklch(0.687 0.096 238.0)',
    mood: 'snapped chalk line across framing lumber, powdery and exact',
    strategy: 'Accent-first on pure white: snapped rules, markers, and state lines with dark text on its fills; near-black ink carries the body. Tinted-gray neutrals — no second hue in the kit.',
    polarity: 'light-first',
  },
  {
    id: 'tram-livery',
    oklch: 'oklch(0.639 0.121 238.7)',
    mood: 'tram livery freshly repainted for spring service, civic',
    strategy: 'Commit it as the primary on pure white: buttons, banners, one full band, with white ink on its fills and graphite body ink. Companions stay tinted neutral; no second livery color.',
    polarity: 'light-first',
  },
  {
    id: 'bluestone',
    oklch: 'oklch(0.561 0.067 239.3)',
    mood: 'bluestone pavers slicked with rain, dense underfoot',
    strategy: 'Works as the dark surface tint itself or as a grounded primary on pure white; white ink on its fills. Stone-tinted neutrals only — signal arrives via one accent from the brief.',
    polarity: 'both',
  },
  {
    id: 'gantry',
    oklch: 'oklch(0.576 0.115 239.4)',
    mood: 'gantry crane paint over harbor steel, hardworking',
    strategy: 'Industrial primary at both poles: full panels on near-black with white ink, or strong blocks on pure white. Steel-tinted neutrals; one signal-orange accent at most.',
    polarity: 'both',
  },
  {
    id: 'pigeon-blue',
    oklch: 'oklch(0.641 0.063 239.6)',
    mood: 'pigeon feathers on a granite ledge, soft gray-blue',
    strategy: 'Near-neutral workhorse: surface tint and secondary color on pure white, or a soft primary on near-black with white text on its fills. Nothing chromatic beyond one brief-led accent.',
    polarity: 'both',
  },
  {
    id: 'opaline',
    oklch: 'oklch(0.751 0.089 239.8)',
    mood: 'opaline glass shade lit from within, milky and cool',
    strategy: 'Soft surface tint on a pure white scaffold — wells, empty states, hover washes — with near-black ink and dark text on its fills. No named accent; tinted grays do the support work.',
    polarity: 'light-first',
  },
  {
    id: 'aegean-dome',
    oklch: 'oklch(0.636 0.163 253.6)',
    mood: 'island chapel dome against whitewash, full noon glare',
    strategy: 'Commit it big on a pure white scaffold: one drenched panel, saturated buttons, white ink on its fills. Graphite body ink, tinted neutrals; no second blue beside it.',
    polarity: 'light-first',
  },
  {
    id: 'signal-blue',
    oklch: 'oklch(0.58 0.18 255)',
    mood: 'command-interface blue, crisp and operational',
    strategy: 'Use blue as a small high-signal accent in a restrained interface, or as a full dark-mode primary on dense data surfaces.',
    polarity: 'both',
  },
  {
    id: 'peacoat',
    oklch: 'oklch(0.380 0.109 255.5)',
    mood: 'peacoat wool buttoned to the chin against night fog, heavy',
    strategy: 'Near-black ground lets the navy read as primary mass and surface, bone-white ink; on pure white it turns editorial. Tinted-gray neutrals; one brass accent at most.',
    polarity: 'dark-first',
  },
  {
    id: 'blue-plaque',
    oklch: 'oklch(0.460 0.156 258.5)',
    mood: 'enamel street plaque fired deep blue, permanent',
    strategy: 'Committed primary both ways: deep panels with white ink on its fills over pure white, or glowing on near-black. Companions stay tinted neutral; one bronze accent at most.',
    polarity: 'both',
  },
  {
    id: 'fountain-ink',
    oklch: 'oklch(0.517 0.136 259.6)',
    mood: 'fountain-pen blue drying on a lined page, schoolroom',
    strategy: 'Ink-register primary on pure white: links, rules, headings, and one drenched panel with white ink on its fills. Near-black handles body; tinted neutrals — no second ink in the well.',
    polarity: 'light-first',
  },
  {
    id: 'cobalt-vault',
    oklch: 'oklch(0.40 0.16 262)',
    mood: 'cobalt vault door, institutional depth',
    strategy: 'Dark-first: cobalt as primary or full surface on near-black with white ink; brass accent optional.',
    polarity: 'dark-first',
  },
  {
    id: 'morpho',
    oklch: 'oklch(0.541 0.223 263.0)',
    mood: 'morpho wing tilting in jungle light, electric',
    strategy: 'One electric primary at either pole: saturated blocks on pure white or a glowing mass on near-black, white ink on its fills. Everything else tinted gray — no cyan companion.',
    polarity: 'both',
  },
  {
    id: 'moonstone',
    oklch: 'oklch(0.751 0.050 264.7)',
    mood: 'moonstone sheen under soft lamplight, pale and reserved',
    strategy: 'Barely-there surface tint on a pure white scaffold: panels, dividers, hover states with dark text on its fills. Near-black ink carries hierarchy; one deep blue accent at most.',
    polarity: 'light-first',
  },
  {
    id: 'snow-shadow',
    oklch: 'oklch(0.650 0.109 264.8)',
    mood: 'long blue shadows over late-afternoon snow, dry cold',
    strategy: 'Soft primary for a light system: shadow-blue fills and emphasis on pure white with near-black ink; white text on its solid fills. Companions stay cool tinted grays — no warm accent.',
    polarity: 'light-first',
  },
  {
    id: 'ultramarine',
    oklch: 'oklch(0.48 0.21 265)',
    mood: 'ultramarine pigment, single-minded conviction',
    strategy: 'Drench one surface or commit as primary on pure white; white ink on its fills; no gradient, no second blue.',
    polarity: 'both',
  },
  {
    id: 'cornflower',
    oklch: 'oklch(0.680 0.153 266.2)',
    mood: 'cornflowers scattered through a july field, open-faced',
    strategy: 'Light-first primary: fields, buttons, and chart marks on pure white with dark text on its fills; near-black body ink. Tinted-gray companions — no second bright hue.',
    polarity: 'light-first',
  },
  {
    id: 'blueberry-bloom',
    oklch: 'oklch(0.598 0.127 267.5)',
    mood: 'blueberries under their dusty bloom, cool in the punnet',
    strategy: 'Dusty primary at either pole: muted fills on pure white with white ink on them, or a soft glowing surface on near-black. Companions stay tinted neutral; one deep plum accent at most.',
    polarity: 'both',
  },
  {
    id: 'civil-dusk',
    oklch: 'oklch(0.550 0.099 269.6)',
    mood: 'the zenith at civil dusk, before the streetlights come on',
    strategy: 'Dark-first: near-black ground with the dusk blue as primary surface and emphasis, paper-white ink. On pure white it turns editorial. Tinted neutrals; no second hue after dark.',
    polarity: 'dark-first',
  },
  {
    id: 'laundry-bluing',
    oklch: 'oklch(0.720 0.114 270.0)',
    mood: 'a drop of bluing swirled through the rinse water, washday',
    strategy: 'Light-first: pale violet-blue washes, banners, and state tints on pure white with near-black ink; dark text on its fills. Keep it the only hue — companions stay tinted neutral.',
    polarity: 'light-first',
  },
  {
    id: 'gentian',
    oklch: 'oklch(0.550 0.208 280.1)',
    mood: 'alpine gentian in thin light, blue-violet and exact',
    strategy: 'Commit gentian as primary on pure white, or let it glow from near-black; white ink on its fills, cool tinted grays. No cyan, no pink — one alpine hue only.',
    polarity: 'both',
  },
  {
    id: 'blacklight',
    oklch: 'oklch(0.502 0.255 281.3)',
    mood: 'blacklight tube in a club stairwell, ultraviolet',
    strategy: 'Near-black scaffold; the violet is the lone signal — headings, glows, focus states — with white ink. Everything else stays neutral; no cyan or pink companion.',
    polarity: 'dark-first',
  },
  {
    id: 'periwinkle',
    oklch: 'oklch(0.748 0.100 286.0)',
    mood: 'periwinkle sky an hour before sunrise, cool',
    strategy: 'Pale periwinkle fields on pure white with near-black ink; dark text on its fills, one deeper blue-violet accent for state. Single-hue — never the cyan or pink companion.',
    polarity: 'light-first',
  },
  {
    id: 'crystal-violet',
    oklch: 'oklch(0.619 0.199 287.2)',
    mood: 'crystal violet stain spreading on a glass slide, clinical',
    strategy: 'Committed primary on pure white, or glowing on near-black; white ink on its fills, violet-tinted neutrals. Strictly single-hue — the cyan or pink companion is banned.',
    polarity: 'both',
  },
  {
    id: 'iris-signal',
    oklch: 'oklch(0.52 0.16 290)',
    mood: 'iris petal against overcast glass, electric but composed',
    strategy: 'Violet as the lone brand hue on pure white or near-black; tinted-gray neutrals. Never add a cyan or pink accent to it.',
    polarity: 'both',
  },
  {
    id: 'vitrail',
    oklch: 'oklch(0.445 0.233 292.4)',
    mood: 'violet stained glass with low sun behind it, solemn',
    strategy: 'Commit the violet as primary on pure white or near-black; white ink on its fills, violet-tinted grays elsewhere. Single-hue identity — no cyan or pink companion.',
    polarity: 'both',
  },
  {
    id: 'amethyst-ink',
    oklch: 'oklch(0.38 0.12 295)',
    mood: 'amethyst ink in a dark ledger, severe and rich',
    strategy: 'Near-black ground, violet as the glowing primary, bone-white ink; keep every other role neutral.',
    polarity: 'dark-first',
  },
  {
    id: 'rain-slate',
    oklch: 'oklch(0.501 0.053 296.6)',
    mood: 'quarried slate wet with rain, violet-gray and plain',
    strategy: 'A tinted surface or quiet primary on pure white or near-black; white text on its fills. It is nearly a neutral — add nothing chromatic, least of all cyan or pink.',
    polarity: 'both',
  },
  {
    id: 'wisteria',
    oklch: 'oklch(0.697 0.168 298.3)',
    mood: 'wisteria over a pergola at noon, profuse',
    strategy: 'Pure white ground, wisteria as the committed primary with dark text on its fills; violet-tinted neutrals only. No cyan or pink companion — one hue carries the identity.',
    polarity: 'light-first',
  },
  {
    id: 'heathered-wool',
    oklch: 'oklch(0.658 0.066 298.5)',
    mood: 'heathered wool on the skein, gray-violet and dry',
    strategy: 'A muted surface and secondary color on pure white; graphite ink, white text on its solid fills. Tinted-gray neutrals only — no cyan or pink accent.',
    polarity: 'light-first',
  },
  {
    id: 'copy-pencil',
    oklch: 'oklch(0.610 0.113 298.7)',
    mood: 'indelible pencil violet on a carbon flimsy, clerical',
    strategy: 'Ink-register accent on pure white: rules, labels, and links, with white text on its fills; near-black handles body. Single violet — no cyan or pink companion.',
    polarity: 'light-first',
  },
  {
    id: 'lavender-wash',
    oklch: 'oklch(0.719 0.072 298.9)',
    mood: 'lavender linen line-dried to gray, faded',
    strategy: 'Pure white scaffold with the lavender as quiet surface tint and rule color; near-black ink, white text on its solid fills. Keep it single-hue — no cyan or pink accent.',
    polarity: 'light-first',
  },
  {
    id: 'milled-lilac',
    oklch: 'oklch(0.804 0.092 298.9)',
    mood: 'milled lilac soap, stamped and powdery',
    strategy: 'Pale lilac panels on a pure white scaffold; near-black ink, dark text on its fills, one deep violet for emphasis. No cyan or pink — lilac-tinted grays carry support.',
    polarity: 'light-first',
  },
  {
    id: 'lilac-plaster',
    oklch: 'oklch(0.778 0.056 299.3)',
    mood: 'limewashed plaster with a lilac cast, chalky and still',
    strategy: 'A pale surface wash over a pure white scaffold; near-black ink, dark text on its fills, one deeper violet for state. No cyan or pink anywhere — tinted grays do the rest.',
    polarity: 'light-first',
  },
  {
    id: 'candied-violet',
    oklch: 'oklch(0.752 0.132 299.5)',
    mood: 'sugar-crusted violet petals on white icing',
    strategy: 'Accent-first on pure white: pills, highlights, and soft fills with dark text on them; near-black ink does the work. Single-hue discipline — no cyan or pink.',
    polarity: 'light-first',
  },
  {
    id: 'track-purple',
    oklch: 'oklch(0.504 0.209 306.8)',
    mood: 'fresh purple rubber on a running track, springy',
    strategy: 'Commit a full purple band or surface — seed-as-ground where it counts — on pure white or near-black, white ink on it. Single-hue: no cyan or pink companion.',
    polarity: 'both',
  },
  {
    id: 'vestment',
    oklch: 'oklch(0.605 0.248 306.9)',
    mood: 'advent vestment silk in candlelight, ceremonial',
    strategy: 'Commit it as the primary on pure white or near-black with white ink on its fills; tinted-gray neutrals keep it formal. Single-hue — no cyan or pink beside it.',
    polarity: 'both',
  },
  {
    id: 'stage-gel',
    oklch: 'oklch(0.682 0.222 314.3)',
    mood: 'purple gel wash over a dark stage, theatrical',
    strategy: 'The house is near-black; the purple is glow and signal — washes, accents, focus states — with white ink. Neutral grays elsewhere; no cyan or pink companion.',
    polarity: 'dark-first',
  },
  {
    id: 'split-geode',
    oklch: 'oklch(0.793 0.137 314.3)',
    mood: 'the pale crystal band inside a split geode, mineral',
    strategy: 'Pale crystal fills and highlights on pure white with dark text on them; one deep violet for state, near-black ink. No cyan or pink — tinted grays do support.',
    polarity: 'light-first',
  },
  {
    id: 'aubergine',
    oklch: 'oklch(0.40 0.13 315)',
    mood: 'deep aubergine, literary and severe',
    strategy: 'Pair with monochrome neutrals and one warm metallic accent. Do not add cyan or pink unless the brand explicitly needs that stack.',
    polarity: 'both',
  },
  {
    id: 'marbled-endpaper',
    oklch: 'oklch(0.724 0.145 315.2)',
    mood: 'marbled endpaper mauve in an old binding, papery',
    strategy: 'Soft mauve surface fills on pure white, dark text on them, near-black ink for body; one deeper purple as rule color. No cyan or pink — keep the paper single-hue.',
    polarity: 'light-first',
  },
  {
    id: 'mussel-shell',
    oklch: 'oklch(0.581 0.050 315.4)',
    mood: 'mussel shells heaped wet on the quay, gray-purple',
    strategy: 'Near-neutral workhorse: surface tints and secondary text on pure white, or a soft primary on near-black with white ink on its fills. Nothing chromatic added — no cyan or pink.',
    polarity: 'both',
  },
  {
    id: 'murex',
    oklch: 'oklch(0.532 0.238 319.8)',
    mood: 'murex dye fresh from the vat, imperial',
    strategy: 'A costly committed primary: pure white or near-black scaffold, white ink on murex fills, warm-gray neutrals. One dye only — never add the cyan or pink companion.',
    polarity: 'both',
  },
  {
    id: 'orchid-neon',
    oklch: 'oklch(0.62 0.20 320)',
    mood: 'orchid neon in a dark arcade, synthetic and confident',
    strategy: 'Glows on a near-black scaffold with white ink; keep the stack single-hue — no cyan companion.',
    polarity: 'dark-first',
  },
  {
    id: 'carnival-crepe',
    oklch: 'oklch(0.732 0.196 320.8)',
    mood: 'crepe-paper streamers strung for a street parade',
    strategy: 'Pure white ground with the crepe hue as committed accent — banners, fills, chart marks — dark text on them, near-black ink. Single-hue festivity: no cyan, no second pink.',
    polarity: 'light-first',
  },
  {
    id: 'mauveine',
    oklch: 'oklch(0.543 0.143 323.0)',
    mood: 'aniline mauve straight from the coal-tar flask',
    strategy: 'Primary or strong secondary on pure white or near-black; white text on its fills, mauve-tinted grays elsewhere. One synthetic hue — no cyan or pink accent.',
    polarity: 'both',
  },
  {
    id: 'pressed-mauve',
    oklch: 'oklch(0.684 0.139 325.7)',
    mood: 'pressed mauve powder in a gilt compact, matte',
    strategy: 'Soft secondary and surface tint on pure white with graphite ink; white text on its solid fills, one deeper plum for emphasis. No cyan or pink in the palette.',
    polarity: 'light-first',
  },
  {
    id: 'belt-of-venus',
    oklch: 'oklch(0.760 0.107 327.2)',
    mood: 'the rose-mauve band above the earth shadow at dusk',
    strategy: 'Pale dusk-mauve fields on pure white, dark text on its fills, near-black ink; one deeper violet reserved for state. No cyan or pink companion — keep the sky single-hue.',
    polarity: 'light-first',
  },
  {
    id: 'highlighter-pink',
    oklch: 'oklch(0.717 0.252 328.2)',
    mood: 'highlighter stroke over printed text, fluorescent',
    strategy: 'A fluorescent signal, never the page: marks, highlights, and selected states on pure white or near-black, dark text on its fills. No cyan companion — single-hue only.',
    polarity: 'both',
  },
  {
    id: 'dragonfruit',
    oklch: 'oklch(0.597 0.257 329.9)',
    mood: 'dragonfruit skins stacked in a market crate, loud and waxy',
    strategy: 'One loud committed primary on pure white or near-black, white ink on its fills; everything else stays tinted-gray. No cyan, no pink — the fruit hue works alone.',
    polarity: 'both',
  },
  {
    id: 'gulal',
    oklch: 'oklch(0.781 0.168 329.9)',
    mood: 'gulal powder hanging in festival air, dry pink-purple',
    strategy: 'Pure white scaffold; the pink-purple works as generous accent and soft fill with dark text on it, near-black ink for body. One pigment — no cyan, no second pink.',
    polarity: 'light-first',
  },
  {
    id: 'logwood',
    oklch: 'oklch(0.447 0.179 330.0)',
    mood: 'logwood dye steeping in the bath, deep and tannic',
    strategy: 'Near-black ground with logwood as the glowing primary, bone-white ink; on pure white it turns editorial. Tinted-gray neutrals — no cyan or pink companion.',
    polarity: 'dark-first',
  },
  {
    id: 'bougainvillea',
    oklch: 'oklch(0.666 0.216 332.1)',
    mood: 'bougainvillea over whitewash, sun-struck',
    strategy: 'Committed primary on a pure white scaffold — saturated magenta blocks with white ink on fills, warm-gray neutrals elsewhere. No purple or cyan companion.',
    polarity: 'light-first',
  },
  {
    id: 'litmus',
    oklch: 'oklch(0.743 0.067 335.2)',
    mood: 'litmus paper gone acid-pink, measured and matte',
    strategy: 'Quiet accent system on pure white: dusty pink rules, tags, and tints with near-black ink; dark text on its fills. One hue only — no purple, and never a cream ground.',
    polarity: 'light-first',
  },
  {
    id: 'alpenglow',
    oklch: 'oklch(0.805 0.107 336.7)',
    mood: 'first alpenglow on a snowfield, thin and cold',
    strategy: 'Pale pink as broad fields and tints on a pure white scaffold with near-black ink; dark text on its fills. State deepens to wine rose, never to purple.',
    polarity: 'light-first',
  },
  {
    id: 'neon-script',
    oklch: 'oklch(0.729 0.205 337.7)',
    mood: 'pink neon script in a dark shopfront, electric and late',
    strategy: 'A signal, not a surface: pink glows against a near-black scaffold with white ink, used for emphasis, state, and key actions. Dark text on its fills; no cyan or purple alongside.',
    polarity: 'dark-first',
  },
  {
    id: 'rubine',
    oklch: 'oklch(0.525 0.204 338.4)',
    mood: 'rubine press ink, dense and uncompromising',
    strategy: 'Treat it as press ink: committed primary on pure white, or glowing on near-black. White text on its fills, black and white otherwise — no purple, no gradient.',
    polarity: 'both',
  },
  {
    id: 'sloe-gin',
    oklch: 'oklch(0.394 0.143 340.1)',
    mood: 'sloe gin held to the light, dark and tart',
    strategy: 'Deep primary on a near-black scaffold, white ink, with the seed also serving as a tinted dark surface. Companions stay neutral — no purple, no second saturated hue.',
    polarity: 'dark-first',
  },
  {
    id: 'fluoro-pink',
    oklch: 'oklch(0.751 0.172 340.2)',
    mood: 'hand-pulled screenprint in fluorescent pink, loud and exact',
    strategy: 'Print-style commitment: fluorescent pink as oversized type or one loud field on pure white with black ink; dark text on its fills. Black, white, pink — nothing else.',
    polarity: 'light-first',
  },
  {
    id: 'porphyry',
    oklch: 'oklch(0.353 0.070 341.5)',
    mood: 'imperial porphyry, ancient and unbudging',
    strategy: 'Use it as the dark surface itself or a committed primary on pure white; white text on its fills, paper-white ink on dark. Stone neutrals only — no purple companion.',
    polarity: 'both',
  },
  {
    id: 'forced-rhubarb',
    oklch: 'oklch(0.616 0.145 342.1)',
    mood: 'forced rhubarb out of the dark shed, tender and sharp',
    strategy: 'Committed primary on pure white with graphite ink; white text on its fills. It can also burn on near-black for dark surfaces. One pink, neutral companions, no purple.',
    polarity: 'both',
  },
  {
    id: 'heather',
    oklch: 'oklch(0.636 0.078 342.3)',
    mood: 'heather moor under low cloud, soft and weatherworn',
    strategy: 'Soft primary for a light system: heather fills and emphasis on pure white with slate ink; white text on its fills. Keep companions gray and quiet — no purple.',
    polarity: 'light-first',
  },
  {
    id: 'pink-wash',
    oklch: 'oklch(0.723 0.137 342.4)',
    mood: 'rose limewash on a courtyard wall, sun-settled',
    strategy: 'Seed works as generous surface tint or component fill on a pure white scaffold, dark text on its fills, near-black ink. Keep it the only hue — no purple, no second warm.',
    polarity: 'light-first',
  },
  {
    id: 'rosewood',
    oklch: 'oklch(0.502 0.095 343.0)',
    mood: 'oiled rosewood, muted rose and grained',
    strategy: 'Muted rose as primary surface or quiet emphasis on a pure white scaffold; white text on its fills, near-black ink and stone grays around it. No purple companion.',
    polarity: 'both',
  },
  {
    id: 'leaders-jersey',
    oklch: 'oklch(0.687 0.236 346.3)',
    mood: 'leader\'s pink jersey in the sprint, unmissable',
    strategy: 'One unmissable pink, used big: a committed band or hero surface on pure white or near-black, white ink on fills. Everything else stays achromatic — no purple companion.',
    polarity: 'both',
  },
  {
    id: 'sweet-pea',
    oklch: 'oklch(0.777 0.146 347.1)',
    mood: 'sweet pea petals, full and light',
    strategy: 'Accent-first on pure white: pink fields, pills, and highlights with near-black ink, dark text on its fills. One deep rose for state; no purple companion.',
    polarity: 'light-first',
  },
  {
    id: 'cochineal',
    oklch: 'oklch(0.559 0.166 348.4)',
    mood: 'wool lifted from a cochineal vat, steeped and serious',
    strategy: 'Commit cochineal as the primary on pure white or near-black; white ink on its fills, graphite neutrals. No purple companion — one steeped red-pink does the work.',
    polarity: 'both',
  },
  {
    id: 'magenta-print',
    oklch: 'oklch(0.60 0.22 350)',
    mood: 'print magenta, graphic and deliberate',
    strategy: 'Treat magenta as a print ink, not a SaaS gradient stop. Pair with black, white, and one muted secondary at most.',
    polarity: 'both',
  },
  {
    id: 'rose-velvet',
    oklch: 'oklch(0.444 0.160 351.8)',
    mood: 'rose velvet house curtain, heavy and hushed',
    strategy: 'Dark-first: a near-black house ground with deep rose as the glowing primary and white ink. Keep it single-hue — neutral grays only, no purple, no metallic flourish.',
    polarity: 'dark-first',
  },
  {
    id: 'dyers-silk',
    oklch: 'oklch(0.676 0.122 353.7)',
    mood: 'raw silk in dusty rose, matte and even',
    strategy: 'Dusty rose as the committed primary on pure white; white text on its fills, warm-gray neutrals. Accent-only restraint elsewhere — no purple companion, no cream ground.',
    polarity: 'light-first',
  },
  {
    id: 'raspberry',
    oklch: 'oklch(0.644 0.186 354.9)',
    mood: 'crushed raspberries, juice-bright and frank',
    strategy: 'Use it as the committed primary on pure white with near-black ink; white text on its fills. Keep companions neutral — at most one deep green state accent, never purple.',
    polarity: 'light-first',
  },
  {
    id: 'hearth-ash',
    oklch: 'oklch(0.734 0.011 6.6)',
    mood: 'cooled hearth ash with a faint rose cast, soft-spoken',
    strategy: 'Use it as surface tint and dividers in a near-monochrome light system — pure white scaffold, near-black ink, dark text on its fills. Signal comes from one brief accent.',
    polarity: 'light-first',
  },
  {
    id: 'rammed-earth',
    oklch: 'oklch(0.589 0.010 52.6)',
    mood: 'rammed earth dried to dun, blunt and warm',
    strategy: 'The neutral is the brand: a warm-gray monochrome system on pure white or near-black, hierarchy from weight and rules. Admit one accent from the brief at most.',
    polarity: 'both',
  },
  {
    id: 'sea-glass',
    oklch: 'oklch(0.805 0.014 148.7)',
    mood: 'frosted sea glass, washed and pale',
    strategy: 'Ground, not brand: pale green-gray surfaces and cards on a pure white scaffold with near-black ink; dark text on its fills. One accent from the brief carries all signal.',
    polarity: 'light-first',
  },
  {
    id: 'north-sea',
    oklch: 'oklch(0.534 0.010 242.7)',
    mood: 'north sea under full cloud, cold and level',
    strategy: 'Monochrome-leaning: the gray works as dark-mode surface tint or as secondary ink on near-black with white text on its fills. If the brief names an accent, that is the only hue.',
    polarity: 'dark-first',
  },
  {
    id: 'ink-black',
    oklch: 'oklch(0.18 0.02 260)',
    mood: 'blue-black ink, institutional and sharp',
    strategy: 'Start from a dark ink surface or high-contrast white surface. Add only one chromatic accent from the brief.',
    polarity: 'both',
  },
  {
    id: 'graphite',
    oklch: 'oklch(0.30 0.01 270)',
    mood: 'graphite and paper, typographic severity',
    strategy: 'Monochrome system: ink-as-brand on pure white or inverted; hierarchy from weight, size, and rule lines, not hue.',
    polarity: 'both',
  },
  {
    id: 'pewter',
    oklch: 'oklch(0.646 0.006 280.2)',
    mood: 'old pewter, dull-polished and settled',
    strategy: 'The neutral is the system: pewter surfaces and ink-gray hierarchy on pure white or near-black, white text on its fills. One chromatic accent from the brief, nothing more.',
    polarity: 'both',
  },
];

const ZONE_NAMES = ['red', 'orange', 'gold', 'yellow', 'lime', 'green', 'teal', 'azure', 'blue', 'violet', 'purple', 'pink'];
const NEUTRAL_ZONE = 'neutral';
const ALL_ZONES = [...ZONE_NAMES, NEUTRAL_ZONE];

// ============================================================
// Color math — inline, zero-dep.
// OKLab matrices are Ottosson's reference constants (the same ones in
// scripts/vendor/culori.mjs); the dev smoke cross-checks numerically.
// ============================================================

// Anchored: the value must BE an oklch literal, not merely contain one —
// a gradient with an embedded oklch() must not validate as that color.
const NUM = String.raw`(?:\d*\.?\d+(?:[eE][-+]?\d+)?)`;
const OKLCH_RE = new RegExp(
  `^oklch\\(\\s*(${NUM})(%?)\\s+(${NUM}|none)\\s+(${NUM}|none)(?:deg)?\\s*(?:\\/\\s*(${NUM})(%?)\\s*)?\\)$`,
  'i',
);
function parseOklch(str) {
  const m = OKLCH_RE.exec(String(str).trim());
  if (!m) return null;
  let L = parseFloat(m[1]);
  if (m[2] === '%') L /= 100;
  const C = m[3].toLowerCase() === 'none' ? 0 : parseFloat(m[3]);
  const H = m[4].toLowerCase() === 'none' ? 0 : parseFloat(m[4]) % 360;
  let alpha = 1;
  if (m[5] != null) {
    alpha = parseFloat(m[5]);
    if (m[6] === '%') alpha /= 100;
  }
  return { L, C, H, alpha };
}

function oklchToLinearSrgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}

function linearToGamma(c) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function inSrgbGamut(L, C, H, eps = 5e-5) {
  return oklchToLinearSrgb(L, C, H).every((c) => c >= -eps && c <= 1 + eps);
}

// Exact max sRGB-safe chroma at a given (L, H), via binary search.
// The budget varies ~2x by hue (at L 0.65: hue 0 allows C ~0.26, hue 210
// only ~0.11), which is why a flat cap misleads in both directions.
function maxChroma(L, H) {
  if (L <= 0.001 || L >= 0.999) return 0;
  let lo = 0, hi = 0.5;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (inSrgbGamut(L, mid, H)) lo = mid;
    else hi = mid;
  }
  return lo;
}

// Lightness of the gamut cusp (where maxChroma peaks) for a hue.
// Bright-cusp families (yellow/amber/lime/mint/sky, cusp L > ~0.85) take
// dark text on solid fills — the Radix-curated exception to white-on-color.
function cuspL(H) {
  let bestL = 0.5, bestC = 0;
  for (let L = 0.05; L <= 0.96; L += 0.02) {
    const c = maxChroma(L, H);
    if (c > bestC) { bestC = c; bestL = L; }
  }
  for (let L = Math.max(0.02, bestL - 0.02); L <= Math.min(0.97, bestL + 0.02); L += 0.005) {
    const c = maxChroma(L, H);
    if (c > bestC) { bestC = c; bestL = L; }
  }
  return bestL;
}

// WCAG 2.x relative luminance (linear sRGB in, Y out) and contrast ratio.
function wcagY(L, C, H) {
  const [r, g, b] = oklchToLinearSrgb(L, C, H).map((c) => Math.min(1, Math.max(0, c)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function wcagRatioY(y1, y2) {
  const [hi, lo] = y1 >= y2 ? [y1, y2] : [y2, y1];
  return (hi + 0.05) / (lo + 0.05);
}

// APCA-W3 0.0.98G-4g. Constants verified against Myndex/apca-w3 source.
// Positive Lc = dark text on light bg, negative = light on dark.
function apcaScreenY(L, C, H) {
  const [r, g, b] = oklchToLinearSrgb(L, C, H).map((c) => Math.min(1, Math.max(0, linearToGamma(c))));
  return Math.pow(r, 2.4) * 0.2126729 + Math.pow(g, 2.4) * 0.7151522 + Math.pow(b, 2.4) * 0.0721750;
}

function apcaLcFromY(txtY, bgY) {
  const blkThrs = 0.022, blkClmp = 1.414, deltaYmin = 0.0005, loClip = 0.1;
  const clamp = (y) => (y > blkThrs ? y : y + Math.pow(blkThrs - y, blkClmp));
  const ty = clamp(txtY), by = clamp(bgY);
  if (Math.abs(by - ty) < deltaYmin) return 0;
  let sapc, out;
  if (by > ty) {
    sapc = (Math.pow(by, 0.56) - Math.pow(ty, 0.57)) * 1.14;
    out = sapc < loClip ? 0 : sapc - 0.027;
  } else {
    sapc = (Math.pow(by, 0.65) - Math.pow(ty, 0.62)) * 1.14;
    out = sapc > -loClip ? 0 : sapc + 0.027;
  }
  return out * 100;
}

function apcaLc(txt, bg) {
  return apcaLcFromY(apcaScreenY(txt.L, txt.C, txt.H), apcaScreenY(bg.L, bg.C, bg.H));
}

// For neutrals OKLab L relates to luminance exactly: Y = L^3.
// Solve the neutral L that hits a WCAG ratio against a given bg Y.
function neutralYForRatio(bgY, ratio, lighter) {
  const y = lighter ? ratio * (bgY + 0.05) - 0.05 : (bgY + 0.05) / ratio - 0.05;
  return Math.min(1, Math.max(0, y));
}

function neutralLFromY(y) {
  return Math.cbrt(y);
}

// Neutral text L whose |APCA Lc| against a given bg screen-Y hits target.
// lighter=true searches light-text-on-dark-bg, else dark-text-on-light-bg.
function solveNeutralLForApca(targetLc, bgScreenY, lighter) {
  let lo = lighter ? neutralLFromY(bgScreenY) : 0;
  let hi = lighter ? 1 : neutralLFromY(bgScreenY);
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const lc = Math.abs(apcaLcFromY(mid ** 3, bgScreenY));
    const tooLow = lc < targetLc;
    if (lighter) { if (tooLow) lo = mid; else hi = mid; }
    else { if (tooLow) hi = mid; else lo = mid; }
  }
  return (lo + hi) / 2;
}

const round2 = (x) => Math.round(x * 100) / 100;
const round3 = (x) => Math.round(x * 1000) / 1000;
const floor3 = (x) => Math.floor(x * 1000) / 1000;

// ============================================================
// Zones, register, sampling
// ============================================================

function zoneOf({ L, C, H }) {
  if (C < 0.04) return NEUTRAL_ZONE;
  return ZONE_NAMES[Math.floor((((H % 360) + 360) % 360) / 30)];
}

// Categorical register, structure after Ou & Luo's colour-emotion scales:
// warm–cool tracks hue angle (warmth peaks near h 50°, scaled by chroma),
// heavy–light tracks lightness, active–calm tracks chroma.
function registerOf({ L, C, H }) {
  const warmth = C < 0.04 ? 0 : Math.cos(((H - 50) * Math.PI) / 180) * Math.min(1, C / 0.12);
  const temperature = warmth > 0.3 ? 'warm' : warmth < -0.3 ? 'cool' : 'neutral';
  const weight = L < 0.45 ? 'heavy' : L > 0.72 ? 'light' : 'mid';
  const energy = C >= 0.15 ? 'active' : C <= 0.07 ? 'calm' : 'mid';
  return { temperature, weight, energy };
}

function textOnSolid(c) {
  if (cuspL(c.H) >= 0.85 && c.L >= 0.68 && c.C >= 0.04) return 'dark';
  // Helmholtz-Kohlrausch: saturated mid-luminance fills read brighter than
  // their luminance — prefer white text even where WCAG passes dark. The
  // preference yields when white can't reach even the 3:1 large-text floor
  // while dark sails past 4.5:1 (pale golds/ambers near the band's top).
  if (c.L >= 0.42 && c.L <= 0.78 && c.C >= 0.08) {
    const y = wcagY(c.L, c.C, c.H);
    if (wcagRatioY(1.0, y) >= 3.0 || wcagRatioY(y, 0.0) < 4.5) return 'white';
    return 'dark';
  }
  const white = { L: 1, C: 0, H: 0 }, black = { L: 0, C: 0, H: 0 };
  return Math.abs(apcaLc(white, c)) >= Math.abs(apcaLc(black, c)) ? 'white' : 'dark';
}

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function prngFromKey(key) {
  const h = crypto.createHash('sha256').update(key).digest();
  return mulberry32(h.readUInt32BE(0));
}

function pickSeed(pool, rand) {
  const byZone = new Map();
  for (const s of pool) {
    const z = zoneOf(s.color);
    if (!byZone.has(z)) byZone.set(z, []);
    byZone.get(z).push(s);
  }
  const zones = [...byZone.keys()].sort((a, b) => ALL_ZONES.indexOf(a) - ALL_ZONES.indexOf(b));
  const zone = zones[Math.floor(rand() * zones.length)];
  const inZone = byZone.get(zone);
  return inZone[Math.floor(rand() * inZone.length)];
}

// ============================================================
// Derived composition math
// ============================================================

const hueDist = (a, b) => {
  const d = Math.abs((((a - b) % 360) + 360) % 360);
  return Math.min(d, 360 - d);
};

// hi may exceed 360 for bands that wrap (e.g. [315, 365) = 315–360 ∪ 0–5).
const inBand = (h, lo, hi) => {
  const n = ((h % 360) + 360) % 360;
  if (hi <= 360) return n >= lo && n < hi;
  return n >= lo || n < hi - 360;
};

// Nudge a hue off the pure 0/60/120/... axes (Datawrapper rule: pure
// primary-axis hues read as defaults; offset >= 5-10°).
function nudgeOffAxis(h) {
  const n = ((h % 360) + 360) % 360;
  const m = n % 60;
  if (m < 5 || m > 55) return (n + 7) % 360;
  return n;
}

// BAN 6 (SKILL.md): the purple-cyan / purple-magenta cross-hue stack is the
// most-trained-on AI palette. Bands are deliberately generous (aubergine at
// h315 + cyan is the same slop as iris at h290 + cyan) and the magenta band
// wraps through 0°.
const PURPLE_BAND = [255, 330];
const CYAN_BAND = [175, 215];
const MAGENTA_BAND = [315, 365]; // wraps: 315–360 ∪ 0–5
function ban6Conflicts(seedH) {
  const out = [];
  if (inBand(seedH, ...PURPLE_BAND)) out.push(CYAN_BAND, MAGENTA_BAND);
  if (inBand(seedH, ...CYAN_BAND) || inBand(seedH, ...MAGENTA_BAND)) out.push(PURPLE_BAND);
  return out;
}

function accentHues(seed) {
  const conflicts = ban6Conflicts(seed.H);
  const ok = (h) =>
    hueDist(h, seed.H) >= 25 && !conflicts.some(([lo, hi]) => inBand(h, lo, hi));
  const candidates = [seed.H + 60, seed.H + 180, seed.H + 300, seed.H + 90, seed.H + 270]
    .map(nudgeOffAxis)
    .filter(ok);
  const out = [];
  for (const h of candidates) {
    if (out.every((o) => hueDist(o, h) >= 20)) out.push(Math.round(h));
    if (out.length === 2) break;
  }
  return out;
}

// Chart hues: seed-first, uneven spacing (hue discrimination is dense in
// blue/green, sparse in yellow), warm/cool alternation. The agent assigns
// lightness alternation per the ramp rules.
function chartHues(seed) {
  return [0, 145, 70, 215, 290]
    .map((off) => nudgeOffAxis(seed.H + off))
    .map((h) => Math.round(h));
}

// Conventional state hues (error / warning / success), already nudged off
// the pure 0/60/120 axes. When the seed itself occupies one of these zones,
// the seed keeps identity and the state color differentiates by L/C.
const STATE_HUES = { destructive: 27, warning: 85, success: 152 };

function buildDerived(seed) {
  const white = { L: 1, C: 0, H: 0 }, black = { L: 0, C: 0, H: 0 };
  const seedY = wcagY(seed.L, seed.C, seed.H);

  const budget = [0.30, 0.45, 0.60, 0.75, 0.90].map((L) => ({
    L,
    maxC: floor3(maxChroma(L, seed.H)),
  }));

  // Light ladder: doctrine-default pure-white bg. Ceilings are the exact
  // neutral L bound for the WCAG floor; suggested values also clear the
  // APCA |Lc| 60 quality bar so following the ladder never trips --check.
  const lightBgY = 1.0;
  const inkCeil = neutralLFromY(neutralYForRatio(lightBgY, 7, false));
  const mutedCeil = neutralLFromY(neutralYForRatio(lightBgY, 4.5, false));
  const mutedApcaCeil = solveNeutralLForApca(60, apcaScreenY(1, 0, 0), false);
  const lightMuted = Math.floor((Math.min(mutedCeil, mutedApcaCeil) - 0.02) * 100) / 100;

  // Dark ladder: doctrine-default near-black bg at L 0.19 (Material tone-6
  // band), elevation = lighter surfaces.
  const darkBgL = 0.19;
  const darkBgY = darkBgL ** 3;
  const inkFloor = neutralLFromY(neutralYForRatio(darkBgY, 7, true));
  const mutedFloor = neutralLFromY(neutralYForRatio(darkBgY, 4.5, true));
  const mutedApcaFloor = solveNeutralLForApca(60, apcaScreenY(darkBgL, 0, 0), true);
  const darkMuted = Math.ceil((Math.max(mutedFloor, mutedApcaFloor) + 0.02) * 100) / 100;

  const accents = accentHues(seed);
  const charts = chartHues(seed);
  const prescribed = [...new Set([...accents, ...charts, ...Object.values(STATE_HUES)])];

  return {
    contrast: {
      // Seed used AS text/ink against white and black surfaces.
      vsWhite: { wcag: round2(wcagRatioY(seedY, 1.0)), apcaLc: round2(apcaLc(seed, white)) },
      vsBlack: { wcag: round2(wcagRatioY(seedY, 0.0)), apcaLc: round2(apcaLc(seed, black)) },
    },
    seedMaxC: floor3(maxChroma(seed.L, seed.H)),
    // Seed hue ONLY — for accent/chart/state hues use hueBudgets below.
    chromaBudget: budget,
    // Max sRGB-safe C per prescribed hue at the lightnesses those roles
    // typically occupy. Any other hue: pick conservatively, verify --check.
    hueBudgets: Object.fromEntries(prescribed.map((h) => [h, {
      'L0.45': floor3(maxChroma(0.45, h)),
      'L0.60': floor3(maxChroma(0.60, h)),
      'L0.75': floor3(maxChroma(0.75, h)),
    }])),
    ladders: {
      light: {
        bg: 1.0, surface: 0.97, border: 0.88,
        muted: lightMuted, mutedCeil: round3(Math.min(mutedCeil, mutedApcaCeil)),
        ink: 0.26, inkCeil: round3(inkCeil),
      },
      dark: {
        bg: darkBgL, surface: 0.24, border: 0.32,
        muted: darkMuted, mutedFloor: round3(Math.max(mutedFloor, mutedApcaFloor)),
        ink: 0.93, inkFloor: round3(inkFloor),
      },
    },
    neutrals: { hue: Math.round(seed.H), chroma: round3(Math.min(0.03, Math.max(0.004, seed.C / 6))) },
    accentHues: accents,
    chartHues: charts,
    stateHues: STATE_HUES,
  };
}

const RULES = [
  'Background purity: default the LIGHT theme to pure white oklch(1 0 0), or pure near-black (L 0.04-0.12, C 0) when the brand lives dark. Tint the bg (C 0.015-0.05) only when the mood names a physical environment or the seed is desaturated (C < 0.10); "feels warm" is not a reason — put warmth in the primary. Dark MODE bg is a separate thing: ladders.dark.bg, tinted with the seed hue.',
  'Contrast floors, both metrics: body ink vs bg >= 7:1 WCAG (compliance floor) and APCA |Lc| >= 75 (quality bar, 90 preferred). Secondary text >= 4.5:1 and |Lc| >= 60. APCA is polarity-aware — negative Lc just means light-on-dark; compare absolute values.',
  'Text on saturated fills (L 0.42-0.78, C >= 0.08): use white text even where WCAG passes dark — saturated colors read brighter than their luminance (Helmholtz-Kohlrausch). Exceptions: bright-cusp hues (yellow/amber/lime/mint/sky) and fills where white can’t reach 3:1 take dark text; the seed’s textOnSolid field has this precomputed. Never delegate this to CSS contrast-color().',
  'Dark mode is a remap, never a hue flip: bg = near-black tinted with the seed hue at neutral chroma (ladders.dark.bg), primary moves lighter AND drops 25-40% chroma (light-mode saturation vibrates on dark), elevation = lighter surfaces, not shadows.',
  'Stay inside the sRGB chroma budget at every role’s lightness — browsers clip out-of-gamut OKLCH silently and the budget varies ~2x by hue, so no flat "safe chroma" exists. chromaBudget covers the SEED hue only; hueBudgets covers the suggested accent/chart/state hues; any other hue, pick conservatively and let --check verify.',
  'Accent must differ from primary in BOTH hue and lightness, and must never be a muddy mid-tone (L 0.45-0.72 with C < 0.10) — that can’t carry text either way. Saturate it or push it clearly light or dark.',
  'Ramps and tints: hold OKLCH hue constant and move L monotonically. Never darken yellow/orange by dropping L alone — it reads brown; rotate the hue warm instead.',
  'Neutrals carry the seed hue at derived.neutrals.chroma (~seed C/6) — tinted gray, not pure gray, and never the warm-cream band (L 0.84-0.97, C < 0.06, hue 40-100).',
];

const GUIDANCE = [
  'Temporary seed for greenfield only — use when no DESIGN.md and no usable repo guidance exists. Named brand cues always override this seed.',
  'The mood and strategy are hints, not commands — the artifact brief drives composition. Before composing, write one granular mood phrase ("Negroni hour on a Milan rooftop", not "modern and clean") and let it pick the strategy: restrained, committed, or drenched.',
  'Compose every token from the seed + the brief: bg/surface/ink per derived.ladders, primary anchored to the seed hue (stay within ~10°, pick L/C for the mood within chromaBudget), accent from derived.accentHues — unless the strategy prose names a different accent; the strategy wins — charts from derived.chartHues with alternating lightness, state tokens from derived.stateHues (when the seed itself occupies a state hue, the seed keeps identity; differentiate the state color by lightness and depth). Real designs are one committed color on a near-white or near-black scaffold — name the scaffold first. Do not copy the seed value into multiple roles.',
  'If the seed’s register fights the brief, re-run with --not <zone,...> (deterministic veto) or --vary <n> (salted re-draw) and say so in the shape gate. Do not silently override the seed. (--id pins a specific seed for reproduction or preview; in the create flow prefer --not/--vary so the draw stays explainable.)',
  'After composing, run --check --strict on the tokens (or the finished HTML) and fix error findings (exit 2) before render. Nudge the teach verb once per session so this one-run seed becomes a real brand profile.',
];

// ============================================================
// CLI — pick mode
// ============================================================

function parseArgs(argv) {
  const args = {
    id: null, from: null, vary: null, not: [], list: false,
    check: null, json: false, strict: false, help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--id' && argv[i + 1]) args.id = argv[++i];
    else if (a === '--from' && argv[i + 1]) args.from = argv[++i];
    else if (a === '--vary' && argv[i + 1]) args.vary = argv[++i];
    else if (a === '--not' && argv[i + 1]) args.not = [...new Set(argv[++i].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean))];
    else if (a === '--list') args.list = true;
    else if (a === '--check') { args.check = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : '-'; }
    else if (a === '--json') args.json = true;
    else if (a === '--strict') args.strict = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else { console.error(`unknown argument: ${a} (see --help)`); process.exit(2); }
  }
  return args;
}

function usage() {
  process.stdout.write(`Greenfield brand-seed picker (schemaVersion 2).

Usage:
  node palette.mjs                         random pick
  node palette.mjs --from "<topic>"        deterministic pick (default in the create flow)
  node palette.mjs --from "<t>" --vary 2   salted re-draw, stable until n changes
  node palette.mjs --from "<t>" --not red,pink   veto zones or seed ids, still deterministic
  node palette.mjs --id verdigris          explicit seed
  node palette.mjs --list                  list all seeds
  node palette.mjs --check <file|->        validate composed tokens.css or artifact HTML
      --json    NDJSON findings            --strict  exit 2 on error findings

Zones: ${ALL_ZONES.join(' ')}
Env: VISUALIZE_PALETTE_SEED — same as --from.
`);
}

function loadSeeds() {
  return SEEDS.map((s) => {
    const color = parseOklch(s.oklch);
    if (!color) { console.error(`internal: unparseable seed ${s.id}`); process.exit(1); }
    return { ...s, color };
  });
}

function runPick(args) {
  const seeds = loadSeeds();

  if (args.list) {
    for (const s of seeds) {
      process.stdout.write(`${s.id.padEnd(16)} ${zoneOf(s.color).padEnd(8)} ${s.polarity.padEnd(11)} ${s.oklch}\n`);
    }
    return;
  }

  // Validate flag combinations before any draw, regardless of mode.
  let vary = null;
  if (args.vary != null) {
    if (!/^\d+$/.test(args.vary) || parseInt(args.vary, 10) < 1) {
      console.error(`--vary expects a plain integer >= 1 (got "${args.vary}")`); process.exit(2);
    }
    vary = parseInt(args.vary, 10);
  }
  if (args.id && (args.from || vary != null || args.not.length)) {
    console.error('--id pins a seed explicitly; it cannot combine with --from / --vary / --not'); process.exit(2);
  }

  let pool = seeds;
  const excludedZones = [], excludedSeeds = [];
  for (const token of args.not) {
    if (ALL_ZONES.includes(token)) excludedZones.push(token);
    else if (seeds.some((s) => s.id === token)) excludedSeeds.push(token);
    else { console.error(`--not: "${token}" is neither a zone (${ALL_ZONES.join(', ')}) nor a seed id`); process.exit(2); }
  }
  pool = pool.filter((s) => !excludedZones.includes(zoneOf(s.color)) && !excludedSeeds.includes(s.id));
  if (pool.length === 0) { console.error('--not excluded every seed'); process.exit(2); }

  let picked, invocation;
  if (args.id) {
    picked = seeds.find((s) => s.id === args.id);
    if (!picked) { console.error(`no seed with id "${args.id}" (try --list)`); process.exit(2); }
    invocation = { mode: 'id' };
  } else {
    const key = args.from || process.env.VISUALIZE_PALETTE_SEED || null;
    if (vary != null && !key) { console.error('--vary requires --from (it salts a deterministic key)'); process.exit(2); }
    const rand = key
      ? prngFromKey(vary != null ? `${key}\0vary:${vary}` : key)
      : mulberry32(crypto.randomBytes(4).readUInt32BE(0));
    picked = pickSeed(pool, rand);
    invocation = key ? { mode: 'from', key, ...(vary != null ? { vary } : {}) } : { mode: 'random' };
    if (excludedZones.length || excludedSeeds.length) {
      invocation.excluded = [...excludedZones, ...excludedSeeds];
    }
  }

  const out = {
    schemaVersion: 2,
    invocation,
    zones: ALL_ZONES,
    seed: {
      id: picked.id,
      oklch: picked.oklch,
      zone: zoneOf(picked.color),
      mood: picked.mood,
      strategy: picked.strategy,
      register: registerOf(picked.color),
      polarity: picked.polarity,
      textOnSolid: textOnSolid(picked.color),
    },
    derived: buildDerived(picked.color),
    rules: RULES,
    guidance: GUIDANCE,
  };
  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
}

// ============================================================
// --check: validate composed tokens (tokens.css or full HTML artifact)
// ============================================================

const COLOR_TOKENS = new Set([
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
  'muted', 'muted-foreground', 'accent', 'accent-foreground',
  'destructive', 'destructive-foreground', 'border', 'input', 'ring',
  'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
]);

function isColorToken(name) {
  return COLOR_TOKENS.has(name) || name.startsWith('sidebar');
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

// Minimal brace-aware scanner: returns [{path: [header,...], body}] for
// every rule, where path carries at-rule ancestors (e.g. @media ...).
function scanRules(css) {
  const rules = [];
  const stack = [];
  let header = '', i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === '{') {
      if (stack.length > 64) throw new Error('CSS nesting deeper than 64 levels');
      stack.push({ header: header.trim(), body: '' });
      header = '';
    } else if (ch === '}') {
      const top = stack.pop();
      if (top) rules.push({ path: [...stack.map((s) => s.header), top.header], body: top.body });
      header = '';
    } else if (stack.length === 0) {
      header += ch;
    } else {
      // Text inside a block is either declarations or a nested rule header;
      // the scanner accumulates both — declarations parse out via regex,
      // and nested headers are reconstructed on '{'.
      stack[stack.length - 1].body += ch;
      if (ch === ';') header = '';
      else header += ch;
    }
    i++;
  }
  return rules;
}

function tokensFromBody(body) {
  const tokens = new Map();
  // No required terminator: the last declaration before `}` is legal CSS
  // without a trailing semicolon, and dropping it would let a violation on
  // that token sneak past every check below.
  const re = /--([\w-]+)\s*:\s*([^;{}]+)/g;
  let m;
  while ((m = re.exec(body))) tokens.set(m[1], m[2].trim());
  return tokens;
}

// Root-level theme block classification. Scoped selectors (descendants,
// combinators) are component overrides, not theme blocks — merging them
// would pollute the root maps with false findings. `:not(...)` guards are
// stripped before testing, so detect.mjs's mandated OS-dark selector
// `:root:not([data-theme="light"]):not([data-theme="dark"])` classifies
// as the OS-dark path, not as an explicit-dark block.
function classifyHeader(rawHeader, inDarkMedia) {
  for (const part of rawHeader.split(',')) {
    const p = part.trim();
    if (!p || p.startsWith('@')) continue;
    const stripped = p.replace(/:not\([^)]*\)/g, '').trim();
    if (/[\s>+~]/.test(stripped)) continue; // descendant/combinator — scoped, skip
    const rootish = /^(:root|html|body)/.test(stripped) || /^\[data-theme/.test(stripped) || /\.dark(?![\w-])/.test(stripped);
    if (!rootish) continue;
    if (inDarkMedia) return 'darkOs';
    if (/\[data-theme=["']?dark["']?\]/.test(stripped) || /\.dark(?![\w-])/.test(stripped)) return 'darkExplicit';
    return 'light';
  }
  return null;
}

function classifyBlocks(css) {
  const blocks = { light: new Map(), darkExplicit: new Map(), darkOs: new Map() };
  for (const rule of scanRules(stripComments(css))) {
    const header = rule.path[rule.path.length - 1] || '';
    const inDarkMedia = rule.path.some((p) => /@media[^{]*prefers-color-scheme\s*:\s*dark/.test(p));
    const kind = classifyHeader(header, inDarkMedia);
    if (!kind) continue;
    const tokens = tokensFromBody(rule.body);
    if (tokens.size === 0) continue;
    for (const [k, v] of tokens) blocks[kind].set(k, v);
  }
  return blocks;
}

// Resolve var() references: the variable's actual value wins; the fallback
// is used only when the variable is undefined. (Validating the fallback
// while the browser resolves the variable was a verified contrast bypass.)
function resolveValue(value, block, light, depth = 0) {
  const v = String(value).trim();
  if (depth >= 4) return v;
  const m = /^var\(\s*--([\w-]+)\s*([\s\S]*)\)$/.exec(v);
  if (!m) return v;
  const target = block.get(m[1]) ?? light.get(m[1]);
  if (target != null) return resolveValue(target, block, light, depth + 1);
  const rest = m[2].trim();
  if (rest.startsWith(',')) return resolveValue(rest.slice(1).trim(), block, light, depth + 1);
  return v;
}

function runCheck(args) {
  if (args.check === '-' && process.stdin.isTTY) {
    console.error('--check - reads piped stdin; pass a file path or pipe the tokens in');
    process.exit(2);
  }
  let input;
  try {
    input = args.check === '-' ? readFileSync(0, 'utf8') : readFileSync(args.check, 'utf8');
  } catch (e) {
    console.error(`cannot read ${args.check}: ${e.message}`);
    process.exit(1);
  }
  if (input.length > 5_000_000) {
    console.error('input exceeds 5MB — not a tokens file');
    process.exit(1);
  }

  // Full HTML artifact: check the concatenated <style> contents. Requires a
  // complete <style>…</style> pair — a tokens.css whose *comment* mentions
  // "<style>" must not be misdetected as HTML.
  let css = input;
  const styleBlocks = [...input.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  if (styleBlocks.length > 0) {
    css = styleBlocks.map((m) => m[1]).join('\n');
  } else if (/<!doctype html|<html[\s>]/i.test(input)) {
    console.error('no <style> blocks found in HTML input');
    process.exit(1);
  }

  let blocks;
  try {
    blocks = classifyBlocks(css);
  } catch (e) {
    console.error(`cannot parse input as CSS: ${e.message}`);
    process.exit(1);
  }
  const findings = [];
  const add = (ruleId, severity, locator, message) =>
    findings.push({ ruleId: `palette/${ruleId}`, category: 'palette', severity, locator, message });

  if (blocks.light.size === 0) {
    add('missing-light-block', 'error', ':root', 'No :root token block found.');
  }
  const dark = blocks.darkExplicit.size ? blocks.darkExplicit : blocks.darkOs;
  const darkLabel = blocks.darkExplicit.size ? '[data-theme="dark"]' : '@media dark :root';
  if (dark.size === 0) {
    add('missing-dark-block', 'error', '[data-theme="dark"]', 'No dark token block found — the tokens contract requires [data-theme="dark"] and the OS-dark media block.');
  } else if (!blocks.darkExplicit.size || !blocks.darkOs.size) {
    const missing = blocks.darkExplicit.size ? '@media (prefers-color-scheme: dark)' : '[data-theme="dark"]';
    add('missing-dark-variant', 'warn', missing, `Only one dark path present — the contract wants both explicit [data-theme="dark"] and the OS-dark media block (missing: ${missing}).`);
  }

  // Hex/rgb on a contrast-critical token would bypass every floor below —
  // error there, warn elsewhere (otherwise "emit hex" defeats --strict).
  const CORE_CONTRAST_TOKENS = new Set(['background', 'foreground', 'primary', 'primary-foreground', 'muted-foreground', 'accent']);

  const parsedBlock = (tokens, label) => {
    const out = new Map();
    for (const [name, raw] of tokens) {
      if (!isColorToken(name)) continue;
      const value = resolveValue(raw, tokens, blocks.light);
      const c = parseOklch(value);
      if (!c) {
        if (/^(transparent|none|inherit|currentcolor)$/i.test(value)) continue;
        const core = CORE_CONTRAST_TOKENS.has(name);
        add('non-oklch', core ? 'error' : 'warn', `${label} --${name}`, `Color token is not an oklch() literal ("${String(value).slice(0, 40)}") — palette rules require OKLCH${core ? ', and contrast floors cannot be verified on this token' : ''}.`);
        continue;
      }
      if (c.alpha < 1) {
        add('translucent-token', 'warn', `${label} --${name}`, `Alpha ${c.alpha} on a color token — contrast depends on the backdrop; the floors below treat it as opaque and may overstate contrast.`);
      }
      out.set(name, c);
      const budget = maxChroma(c.L, c.H);
      if (c.C > budget + 0.002) {
        add('out-of-gamut', 'error', `${label} --${name}`, `oklch(${c.L} ${c.C} ${c.H}) exceeds the sRGB gamut at this hue/lightness (max C ~${floor3(budget)}) — browsers will clip it silently.`);
      }
    }
    return out;
  };

  const checkPair = (colors, label, fgName, bgName, minRatio, minLc, severity) => {
    const fg = colors.get(fgName), bg = colors.get(bgName);
    if (!fg || !bg) return;
    const fgY = wcagY(fg.L, fg.C, fg.H), bgY = wcagY(bg.L, bg.C, bg.H);
    const ratio = wcagRatioY(fgY, bgY);
    const lc = Math.abs(apcaLc(fg, bg));
    const lighter = fgY > bgY;
    const fix = (target) => `move --${fgName} to L ${lighter ? '>=' : '<='} ~${round2(lighter ? target + 0.02 : target - 0.02)} (neutral-equivalent)`;
    if (ratio < minRatio) {
      const t = neutralLFromY(neutralYForRatio(bgY, minRatio, lighter));
      add('contrast-wcag', severity, `${label} --${fgName} vs --${bgName}`, `WCAG ${round2(ratio)}:1 < ${minRatio}:1 floor — ${fix(t)}.`);
    } else if (minLc && lc < minLc) {
      const t = solveNeutralLForApca(minLc, apcaScreenY(bg.L, bg.C, bg.H), lighter);
      add('contrast-apca', 'warn', `${label} --${fgName} vs --${bgName}`, `APCA |Lc| ${round2(lc)} < ${minLc} quality bar (WCAG passes at ${round2(ratio)}:1) — ${fix(t)}.`);
    }
  };

  const checkBlock = (tokens, label, isDark) => {
    if (tokens.size === 0) return null;
    const colors = parsedBlock(tokens, label);

    for (const required of ['background', 'foreground', 'primary']) {
      if (!tokens.has(required)) add('missing-token', 'error', `${label} --${required}`, `Required token --${required} missing from ${label}.`);
    }

    checkPair(colors, label, 'foreground', 'background', 7, 75, 'error');
    checkPair(colors, label, 'muted-foreground', 'background', 4.5, 60, 'error');
    checkPair(colors, label, 'primary-foreground', 'primary', 4.5, 0, 'error');
    checkPair(colors, label, 'card-foreground', 'card', 7, 0, 'warn');

    const primary = colors.get('primary'), accent = colors.get('accent');
    if (primary && accent && accent.C >= 0.08) {
      const conflict = ban6Conflicts(primary.H);
      if (primary.C >= 0.08 && conflict.some(([lo, hi]) => inBand(accent.H, lo, hi))) {
        add('ban6-stack', 'error', `${label} --primary + --accent`, `Purple-cyan/purple-magenta cross-hue stack (primary h${Math.round(primary.H)} + accent h${Math.round(accent.H)}) — the most-trained-on AI palette (BAN 6).`);
      }
      if (hueDist(primary.H, accent.H) < 25 && Math.abs(primary.L - accent.L) < 0.12) {
        add('accent-indistinct', 'warn', `${label} --accent`, `Accent is within 25° hue and 0.12 L of primary — two variants of one color, not a second role.`);
      }
    }
    if (accent && accent.L >= 0.45 && accent.L <= 0.72 && accent.C >= 0.04 && accent.C < 0.10) {
      add('muddy-accent', 'warn', `${label} --accent`, `Mid-lightness low-chroma accent (L ${accent.L}, C ${accent.C}) reads muddy and can't carry text — saturate it or push it clearly light/dark.`);
    }

    // H-K: dark text sitting on a saturated mid-luminance fill that the
    // precomputed polarity says should carry white.
    const pf = colors.get('primary-foreground');
    if (primary && pf && pf.L < 0.5 && primary.C >= 0.08 && textOnSolid(primary) === 'white') {
      add('hk-dark-text-on-saturated', 'warn', `${label} --primary-foreground`, 'Dark text on a saturated mid-luminance primary — Helmholtz-Kohlrausch makes the fill read brighter than measured; use white/near-white text.');
    }

    const bg = colors.get('background');
    if (isDark && bg && (bg.L < 0.04 || bg.L > 0.25)) {
      add('dark-bg-band', 'warn', `${label} --background`, `Dark bg L ${bg.L} outside the 0.04-0.25 band (Material tone-6 doctrine ~0.18-0.22).`);
    }
    return colors;
  };

  const lightColors = checkBlock(blocks.light, ':root', false);
  const darkColors = checkBlock(dark, darkLabel, true);

  // When both dark paths exist but diverge, the OS-dark block gets its own
  // value pass — a broken media block must not hide behind a clean explicit one.
  const mapsEqual = (a, b) => a.size === b.size && [...a].every(([k, v]) => b.get(k) === v);
  if (blocks.darkExplicit.size && blocks.darkOs.size && !mapsEqual(blocks.darkExplicit, blocks.darkOs)) {
    checkBlock(blocks.darkOs, '@media dark :root', true);
  }

  if (lightColors && darkColors) {
    const lp = lightColors.get('primary'), dp = darkColors.get('primary');
    if (lp && dp) {
      if (dp.C > lp.C + 0.01 && dp.L >= 0.5) {
        add('dark-primary-chroma', 'warn', `${darkLabel} --primary`, `Dark primary chroma (${dp.C}) exceeds light (${lp.C}) — dark-mode primaries drop 25-40% chroma so they don't vibrate.`);
      }
      const lb = lightColors.get('background'), db = darkColors.get('background');
      if (lb && db && Math.abs(lb.L - db.L) > 0.4 && Math.abs(dp.L - lp.L) < 0.05 && Math.abs(dp.C - lp.C) < 0.01) {
        add('dark-primary-unchanged', 'warn', `${darkLabel} --primary`, 'Background flipped but primary is unchanged — dark mode is a remap (lighter, less chroma), not a bg swap.');
      }
    }
  }

  const order = { error: 0, warn: 1 };
  findings.sort((a, b) => (order[a.severity] - order[b.severity]) || a.ruleId.localeCompare(b.ruleId));

  if (args.json) {
    for (const f of findings) process.stdout.write(JSON.stringify(f) + '\n');
  } else if (findings.length === 0) {
    process.stdout.write('palette --check: clean\n');
  } else {
    const sym = { error: '✖', warn: '⚠' };
    for (const f of findings) {
      process.stdout.write(`  ${sym[f.severity]} ${f.ruleId.padEnd(34)} ${f.locator}\n      ${f.message}\n`);
    }
    const errors = findings.filter((f) => f.severity === 'error').length;
    process.stdout.write(`${findings.length} finding(s), ${errors} error(s)\n`);
  }

  if (args.strict && findings.some((f) => f.severity === 'error')) process.exit(2);
}

// ============================================================

const args = parseArgs(process.argv.slice(2));
if (args.help) { usage(); process.exit(0); }
if (args.check != null) runCheck(args);
else runPick(args);
