---
slug: nvidia-style
name: NVIDIA Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.nvidia.com/en-us/
  - https://www.nvidia.com/en-us/data-center/
  - https://www.nvidia.com/en-us/geforce/
canonical-canvas: dark
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# NVIDIA Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://www.nvidia.com/en-us/ | Black/white technical marketing | Current metadata: "World Leader in Artificial Intelligence Computing" and "NVIDIA invents the GPU and drives advances in AI, HPC, gaming, creative design, autonomous vehicles, and robotics." |
| Data Center | https://www.nvidia.com/en-us/data-center/ | Enterprise infrastructure | Current metadata positions NVIDIA data centers as accelerated computing platforms for advanced AI reasoning with GPU, CPU, and networking technology. |
| GeForce | https://www.nvidia.com/en-us/geforce/ | Gaming and creator hardware | Current metadata foregrounds graphics cards, gaming solutions, AI technology, GeForce, RTX, DLSS, and Studio. |

NVIDIA is dual-canonical: black hero chapters and product launch moments, white technical body sections, and a single NVIDIA Green action/accent system. The strongest layouts are angular, gridded, and matter-of-fact. Let product imagery, silicon diagrams, specs, and benchmark tables create energy.

## §2 Palette

### Core System

- `--primary`: saturated NVIDIA Green. Use for CTA fills, active tabs, small edge markers, selected states, and important metric accents.
- `--primary-foreground`: black. Green buttons should carry black text for contrast.
- `--background`: white technical canvas for body content.
- `--foreground`: black primary ink.
- `--brand-surface-dark`: pure black for hero/footer chapters and high-voltage launch bands.
- `--brand-surface-elevated`: dark elevated panels inside black sections.
- `--border` and `--brand-hairline-strong`: gray rules for dense cards and technical grids.

### Support Signals

- `--brand-link-blue`: conventional inline link colour in long-form support/technical content.
- `--brand-warning` / `--brand-warning-bright`: caution, compatibility, or status warnings.
- `--brand-accent-purple` and `--brand-accent-purple-pale`: rare AI/software accent; never pair with cyan or pink gradients.
- `--brand-accent-green-pale`: pale chart or comparison highlight.

### Drift vs `tokens.css`

- The token package matches the live brand architecture: black frame chapters, white content canvas, gray technical surfaces, sharp radii, NVIDIA Green CTAs, and hand-tuned dark mode.
- Live source inventory should emphasize AI, data center, Blackwell, DGX, GPU, accelerated computing, networking, Enterprise, GeForce RTX, DLSS, Studio, gaming, automotive, robotics, and Omniverse.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | NVIDIA-EMEA / system fallback | 700 | 44-64px | 1.05-1.2 | 0 |
| Heading | NVIDIA-EMEA / system fallback | 700 | 28-44px | 1.15-1.25 | 0 |
| Title | NVIDIA-EMEA / system fallback | 700 | 18-24px | 1.2-1.35 | 0 |
| Body | NVIDIA-EMEA / system fallback | 400 | 15-17px | 1.45-1.6 | 0 |
| Label | NVIDIA-EMEA / system fallback | 700 | 12-16px | 1.2-1.35 | 0 |
| Mono | system mono | 400 | 12-14px | 1.45-1.6 | 0 |

Use bold sans-serif hierarchy with compact technical prose. All-caps labels are acceptable in navigation, tabs, specs, and product family markers, but body copy should stay readable.

## §4 Component Vocabulary

### global-navigation

**Status:** current
**Live source:** `https://www.nvidia.com/en-us/`
**Description:** Header with NVIDIA mark, Products, Solutions, Industries, For You, support routes, search, account, and regional controls.
**States:** desktop, mobile menu, dropdown open, search open, account menu, active section.

### black-ai-hero

**Status:** current
**Live source:** `https://www.nvidia.com/en-us/`
**Description:** High-contrast launch hero for AI computing leadership with black canvas, product imagery/video, bold headline, and green primary action.
**States:** default, media loaded, video, CTA hover, reduced-motion.

### white-technical-section

**Status:** current
**Live source:** Homepage and data center pages
**Description:** White content band with terse heading, intro copy, product/category cards, and gray hairline separation.
**States:** default, two-column, four-column, comparison, responsive stack.

### green-primary-cta

**Status:** current
**Live source:** NVIDIA marketing surfaces
**Description:** Rectangular NVIDIA Green action button with black text and direct copy such as Learn More, Shop Now, Download, or Get Started.
**States:** default, hover, focus, disabled, loading.

### text-link-arrow

**Status:** current
**Live source:** NVIDIA content cards
**Description:** Inline or card-level text link with arrow indicator. Use green on dark sections and blue/black where the live surface requires conventional links.
**States:** default, hover, visited, disabled.

### product-family-card

**Status:** current
**Live source:** Homepage product inventory
**Description:** Card for AI, Data Center, GeForce RTX, NVIDIA RTX/Professional Visualization, Automotive, Robotics, and Omniverse families.
**States:** default, hover, selected, dark, image-led.

### data-center-platform-card

**Status:** current
**Live source:** `https://www.nvidia.com/en-us/data-center/`
**Description:** Enterprise card for accelerated computing platforms spanning GPU, CPU, networking, systems, and software.
**States:** default, featured, comparison, selected.

### blackwell-feature-band

**Status:** current
**Live source:** Homepage and data center inventory references
**Description:** Product architecture band for Blackwell with black canvas, chip/system imagery, key claim, and technical supporting links.
**States:** teaser, launch, specs revealed, CTA hover.

### dgx-system-card

**Status:** current
**Live source:** Data center page inventory
**Description:** Hardware/system card for DGX and AI supercomputing systems with image, use case, performance claim, and route.
**States:** default, featured, compare, contact sales.

### gpu-spec-table

**Status:** current
**Live source:** Data center and GeForce product conventions
**Description:** Dense technical table for GPU model, memory, architecture, performance, power, networking, and availability.
**States:** default, sorted, compared, highlighted row, mobile stacked.

### networking-card

**Status:** current
**Live source:** Data center page references networking
**Description:** Card for NVIDIA networking platforms, interconnect, Ethernet/InfiniBand, and AI fabric use cases.
**States:** default, selected, diagram, learn more.

### enterprise-software-card

**Status:** current
**Live source:** Homepage/data center Enterprise references
**Description:** Software card for NVIDIA AI Enterprise and production AI stack, with deployment target and support posture.
**States:** default, trial, licensed, contact sales, docs link.

### solution-grid

**Status:** current
**Live source:** NVIDIA site structure
**Description:** Grid for industries and workloads: healthcare, financial services, manufacturing, retail, telecommunications, energy, public sector, and research.
**States:** default, filtered, industry selected, dark section.

### ai-workload-tabs

**Status:** current
**Live source:** AI/data center pages
**Description:** Tabbed selector for training, inference, reasoning, simulation, data processing, and agentic AI workloads.
**States:** default, active, hover, keyboard focus, mobile dropdown.

### benchmark-metric-strip

**Status:** current
**Live source:** Performance-led NVIDIA pages
**Description:** Compact metric row for speedups, throughput, energy efficiency, or latency improvements. Numbers must be tied to a named product/test.
**States:** default, footnoted, compared, dark.

### reference-architecture-diagram

**Status:** current
**Live source:** Data center technical conventions
**Description:** Structured diagram for GPU, CPU, network, storage, software, and application layers. Prefer thin lines and green highlights over decorative illustration.
**States:** static, highlighted layer, expanded detail, dark.

### geforce-hero

**Status:** current
**Live source:** `https://www.nvidia.com/en-us/geforce/`
**Description:** GeForce hero for graphics cards, gaming laptops, RTX, AI technology, and creator tools, usually darker and more image-led than enterprise surfaces.
**States:** default, product launch, game artwork, CTA hover.

### rtx-product-card

**Status:** current
**Live source:** GeForce page
**Description:** Product card for GeForce RTX GPUs or laptops with product image, generation, performance claim, price/availability route, and shop action.
**States:** default, new, out of stock, compare, shop.

### dlss-feature-card

**Status:** current
**Live source:** GeForce page references DLSS
**Description:** Feature card for DLSS and RTX AI performance, with short explanation, supported games/apps, and learn-more action.
**States:** default, video, game selected, compatibility note.

### studio-creator-card

**Status:** current
**Live source:** GeForce Studio references
**Description:** Creator workflow card for NVIDIA Studio, rendering, video, generative AI, and creative applications.
**States:** default, app logo row, driver update, download.

### driver-download-panel

**Status:** current
**Live source:** NVIDIA support/download conventions
**Description:** Form-like panel for product type, series, operating system, driver type, language, and search/download action.
**States:** empty, selected, searching, result, error.

### developer-sdk-card

**Status:** current
**Live source:** NVIDIA developer ecosystem conventions
**Description:** Card for CUDA, TensorRT, NeMo, Omniverse, Isaac, or other SDKs with docs/download routes and version metadata.
**States:** default, latest, deprecated, docs, download.

### robotics-isaac-card

**Status:** current
**Live source:** Homepage robotics references
**Description:** Robotics card for Isaac, simulation, edge AI, and physical AI workflows.
**States:** default, simulation, deployment, case study.

### automotive-platform-card

**Status:** current
**Live source:** Homepage automotive references
**Description:** Automotive platform card for autonomous vehicles, DRIVE, cockpit, simulation, and safety-oriented AI.
**States:** default, platform, partner story, learn more.

### omniverse-simulation-card

**Status:** current
**Live source:** Homepage Omniverse references
**Description:** Simulation card for digital twins, industrial workflows, and 3D collaboration.
**States:** default, demo, ecosystem, download.

### news-card

**Status:** current
**Live source:** NVIDIA homepage/news patterns
**Description:** Editorial card for announcements, keynotes, product updates, customer stories, and technical blogs.
**States:** default, featured, video, date, category.

### event-keynote-card

**Status:** current
**Live source:** NVIDIA event/keynote conventions
**Description:** Event card for GTC/keynote sessions with title, date, speaker, registration/watch route, and replay state.
**States:** upcoming, live, replay, registered, full.

### footer-mega-columns

**Status:** current
**Live source:** NVIDIA footer conventions
**Description:** Black footer with multi-column product, solutions, support, company, developer, and social links.
**States:** desktop, mobile accordion, locale, legal.

## §5 Composition Rules

1. Build pages in strong bands: black launch chapter, white technical body, black footer.
2. Use green as a control and signal, not a background wash.
3. Keep cards angular with thin borders and minimal shadow.
4. Prefer actual product imagery, chips, systems, diagrams, specs, and benchmarks over abstract shapes.
5. Technical density is welcome when it is organized through tabs, tables, comparison cards, and diagrams.
6. Tie every performance claim to product context; never float numbers as generic hero decoration.

## §6 Accessibility And States

- Green buttons carry black text; white-on-green fails on many green values.
- Green link/action text on black needs adequate size/weight and focus rings.
- Tables require sticky headers or repeated row labels on mobile.
- Dark panels need visible hairlines; avoid black-on-black card collapse.
- Video and animated product moments need reduced-motion fallbacks.

## §7 Anti-Patterns

- Do not add gradients, glows, or abstract mesh behind AI claims.
- Do not soften the brand with large rounded cards or pastel fills.
- Do not make every element green; one action colour is stronger than a green wash.
- Do not use gaming artwork on enterprise AI/data center surfaces unless the content is GeForce or Studio.
- Do not detach benchmark numbers from methodology, product, or workload.
