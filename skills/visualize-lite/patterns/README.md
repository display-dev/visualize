# Pattern Recipes

Pattern recipes are creation-time guidance for recurring rendered structures. They are not importable components, a CSS library, or review/polish rubrics.

Each recipe uses frontmatter with required `name` and `description`; `variants` is optional. Do not add `applies_to` or `requires_browser_check`. The body should explain decision rules, semantic shape, type roles, spacing, color relationships, mobile behavior, variants, and concrete failure modes.

CSS examples are illustrative and minimal. They exist to remove ambiguity, not to mandate one skin across all design systems. Mechanics belong in shells. Template-specific structure belongs in template specs.
