# Visualize Authoring

This document is for maintainers. It is not part of the normal creation, review, or polish loading graph.

## Design principles

These are decisions that shape every edit to `SKILL.md`, `reference/`, and `detect.mjs`. Reverse one only after considering the failure mode it prevents.

### 1. Brand cues are hard invariants, not aspirational prose

Named fonts, named palettes, named anti-references from the resolved brand profile (or from fallback project instructions) are enforceable invariants — checked in preflight and re-audited at pre-render time. Revise before render; do not surface a violation to the user. Soft prose like "follow the brand profile" loses every time to the training prior.

### 2. Reflex-rejection lives at the picking step, not the refusal step

The composition reflex check runs in preflight, before shape sketching. Its output stays internal — the shape gate carries forward only the chosen alternative, not the rejection process. Anti-reflex procedures upstream of generation catch reflexes not yet cataloged; post-build refusal rules force the model into the next-most-common reflex instead. Reference implementation: impeccable's 4-step font-selection procedure.

### 3. The internal catalog is for teach-time, not creation-time

`design-systems/catalog-index.json` and the per-system `DESIGN.md` files are reference packages `teach` reads when *deriving* a brand profile. At creation time the model uses the brand profile it has — browsing the catalog as a substitute for the resolved brand is drift, not fidelity. No per-artifact creation pass browses the catalog.

### 4. Required shape-gate fields are source-conditional

Unconditional gate fields — pre-committed visible ingredients, primitive budgets, mandatory signature moves — induce format-induced collapse (Findings-EMNLP 2025: SFT 20.8% → DPO 10.8% diversity drop under structured-output requirements). Primitives follow sections that need them. Signature moves exist only when the source motivates one. Ingredients are derived from sections + primitives, not separately listed.

### 5. Instructions-only — no exemplars, no project paths, no calibrated numbers

The skill produces from-scratch using only prose instructions plus the brand profile chain. Pre-loaded exemplar images, project-specific shortIds or file paths, model-generated probability weights (`Font A 60% / Font B 25%`), and specific pixel values in prose (`32–40px padding`) all break the from-scratch premise. If a proposed change needs external state or per-project configuration, the change is wrong-shaped for this skill.

### 6. Specificity, not novelty

The revision pass is named *specificity revision*, not *bolder revision*. "Bolder" pushes toward decoration; "more source-specific" pushes toward conviction grounded in the actual material. Cumulative denial across artifacts (avoiding a pattern because it was used before) confuses brand consistency with reflex — brand-consistent work *should* repeat. Only avoid reflexes that are wrong for the brand or source.

### 7. Two-model design center

The skill must work for both Claude and Codex (and future models with similar reflex shapes). Claude's reflex is precedent-inheritance — copying whatever sibling artifact exists. Codex's reflex is safe-median picks — cream paper, system-ui, soft shadows, eyebrow-chip mastheads. Procedures and invariants catch both. A proposed change that helps one model and hurts the other is wrong.

## Reverse-with-caution

Already tried and rejected — don't reintroduce without confronting the reason:

- **Cream-paper composition stack as an absolute BAN (in `SKILL.md`).** Considered as BAN 9 (`cream-band background + system-ui + soft shadow on bordered cards`) and BAN 10 (`eyebrow chips + lowercase wordmark + 4-col mono meta strip`) to catch the Codex research-report reflex. Rejected: instance-shaped (model dodges by changing one detail), and absolute bans don't carve out for brands that legitimately live in those aesthetics. The failure is now caught upstream by principle 1 (brand-fidelity lock).
- **Multi-persona generate-then-synthesize at the brand-words step.** Considered for measured diversity gain (Cambridge Design Science multi-persona work). Rejected per principle 7: overlap-rejection competes with brand fidelity — three personas should agree on brand identity moves, not have those rejected as shared reflex.
- **LLM-judged "marker-density" check post-build.** Considered for catching reflex co-occurrence patterns. Rejected: false-positives on legitimate brand-aligned output that uses cataloged moves; false-negatives on unfamiliar combinations. `detect.mjs` stays deterministic regex-based.
- **Verbalized-sampling probability weights.** Considered (Zhang et al. 2025, measured 1.6–2.1× diversity gain). Rejected per principle 5: model-generated weights without calibration are theater.
- **Browsing `design-systems/` at creation time.** Considered as an in-skill external-grounding step. Rejected per principle 3.
- **Specific pixel numbers in prose (`32–40px padding`, type ratio `≥ 4x`).** Rejected per principle 5 — bakes one aesthetic into the skill and doesn't travel across registers.

## Templates

Templates live at `templates/<slug>/template.md`. Each template directory contains exactly that one live authoring file. Required frontmatter is `name` and `description`; `shell` is optional and must resolve to `shells/<slug>/README.md`. Do not add `category`, `patterns`, `optional_patterns`, or `fixtures` frontmatter.

Template bodies describe selection and composition: Use when, Do not use when, Structure, Creation guidance, Hierarchy contract, Mobile contract, and Failure modes. Keep them compact and specific to reader outcomes. Mention pattern recipes in prose only when the template genuinely benefits from them.

## Pattern Recipes

Recipes live at `patterns/<slug>.md`. They are creation guidance for recurring rendered patterns, not importable components and not review rubrics. Required frontmatter is `name` and `description`; `variants` is optional. Minimal examples are allowed when they remove ambiguity, but they should not become a shared skin.

## Shells

Shells live at `shells/<slug>/` and exist only for behavior-heavy mechanics: slide navigation, keyboard control, hash sync, scaling, print, or similar. A shell README documents content slots, behaviors, accessibility invariants, print/export expectations, and what an agent may customize. Runtime files are read only when the artifact needs to inline or modify mechanics.

## Fixtures

Fixtures live under `fixtures/` and are tooling assets. They are not authoring inputs and templates do not reference them. If `fixtures/manifest.json` lists a file, validators must be able to resolve it. Keep fixtures targeted to detector coverage, contrast checks, mobile overflow checks, shell smoke, or human visual inspection.

## Fixture Styles

Preview-only CSS belongs in `preview-kit/fixture-styles/` or inside the fixture itself. Do not recreate `components/` as a reusable component library. If a style is required for generated artifacts, it belongs in the artifact, not the preview kit.
