#!/usr/bin/env bash
# Build per-design-system previews from preview-kit/template.html.
#
# For each design system <ds> under design-systems/, writes:
#   design-systems/<ds>/preview.html       (light mode — data-theme="light" on <html>)
#   design-systems/<ds>/preview-dark.html  (dark mode  — data-theme="dark"  on <html>)
#
# The template carries three placeholder markers:
#   /* __TOKENS_PLACEHOLDER__ */      — inside a <style> block, replaced with
#                                       the contents of the design system's
#                                       sidecar tokens.css.
#   /* __COMPONENTS_PLACEHOLDER__ */  — legacy marker name, now replaced with
#                                       preview-kit/fixture-styles/*.css.
#   __DESIGN_SYSTEM_NAME__            — line-level token, substituted via gsub.
#   __ROOT_ATTR__                     — line-level token on <html>, substituted
#                                       with ' data-theme="light"' or
#                                       ' data-theme="dark"'. Both variants
#                                       force a specific mode against the
#                                       viewer's OS preference; otherwise the
#                                       OS-dark fallback inside each tokens.css's
#                                       prefers-color-scheme media query
#                                       (:root:not([data-theme="light"]):not(
#                                       [data-theme="dark"])) would make the
#                                       "light" preview render dark on a
#                                       dark-mode viewer.
#
# Both placeholder regexes match only the canonical comment-form line
# (whitespace + /* MARKER */ + whitespace). This keeps the script safe
# from any code samples in the template that may carry literal marker
# text inside <pre> blocks.
#
# Dark-mode marker is data-theme="dark"; light is data-theme="light".
# Each design system's tokens.css carries the matching
# [data-theme="dark"] selector for its dark block and the
# :root:not([data-theme="light"]):not([data-theme="dark"]) chain inside
# its prefers-color-scheme media query. See ADR
# engineering/adrs/2026-05-20-data-theme-one-shot-migration.md (in the
# intra-hosting repo) for the convention rationale.
#
# Usage:
#   build-previews.sh           # regenerate all previews
#   build-previews.sh --check   # exit 1 if committed != generated (CI gate)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VIS_ROOT="$(cd "$SCRIPT_DIR/../visualize" && pwd)"
TEMPLATE="$VIS_ROOT/preview-kit/template.html"
FIXTURE_STYLES_DIR="$VIS_ROOT/preview-kit/fixture-styles"

# Curated, alphabetical. Adding a design system requires updating this list.
# Keeps freshness check honest (auto-discovery would mask missing previews).
DESIGN_SYSTEMS=(airbnb-style airtable-style apple-style architectural-type bento beta-capture binance-style blueprint bmw-m-style bmw-style bold-editorial brutalist bugatti-style cal-style claude-style clay-style clean clickhouse-style cloudflare-style cohere-style coinbase-style composio-style console cursor-style cyber-serif deck deep-red dithered editorial elevenlabs-style expo-style ferrari-style figma-style framer-style github-style glassmorphism grunge-collage hashicorp-style hyper-saturated ibm-style ide intercom-style kinetic-orange linear-style lookbook lumina luxury meta-style minimax-style mintlify-style miro-style mistral-ai-style modern-bold mongodb-style monochrome monograph mosaic-grid nature neon neon-velocity news-print nike-style notion-style nvidia-style ollama-style opencode-ai-style paper-ink pinterest-style playful playstation-style posthog-style raycast-style renault-style replicate-style resend-style revolut-style riso sentry-style shopify-style sketch slack-style spacex-style spotify-style stripe-style supabase-style superhuman-style swiss tech-editorial terminal terracotta together-ai-style uber-style vercel-style vodafone-style warm-industrial warp-style webflow-style whitepaper win98 wired-style wise-style x-ai-style zapier-style)

ROOT_ATTR_LIGHT=' data-theme="light"'
ROOT_ATTR_DARK=' data-theme="dark"'

mode="write"
if [[ "${1:-}" == "--check" ]]; then
  mode="check"
elif [[ "${1:-}" != "" ]]; then
  echo "usage: $(basename "$0") [--check]" >&2
  exit 2
fi

# Sanity checks.
if [[ ! -f "$TEMPLATE" ]]; then
  echo "missing template: $TEMPLATE" >&2
  exit 1
fi

if [[ ! -d "$FIXTURE_STYLES_DIR" ]]; then
  echo "missing fixture styles dir: $FIXTURE_STYLES_DIR" >&2
  exit 1
fi

# Concatenate preview-only fixture CSS into one bundle, alphabetically.
build_fixture_styles_bundle() {
  local tmp
  tmp="$(mktemp)"
  find "$FIXTURE_STYLES_DIR" -name '*.css' -type f 2>/dev/null \
    | LC_ALL=C sort \
    | while IFS= read -r css; do
        rel="${css#"$VIS_ROOT/"}"
        printf '/* === %s === */\n' "$rel"
        cat "$css"
        printf '\n'
      done > "$tmp"
  printf '%s' "$tmp"
}

FIXTURE_STYLES_BUNDLE="$(build_fixture_styles_bundle)"
# Track the in-flight per-render temp file so an interrupt or early exit
# between mktemp and the diff/move below doesn't leak it. Reset to empty
# whenever the inner block finishes cleanly.
CURRENT_TMP=""
# shellcheck disable=SC2064  # expand $FIXTURE_STYLES_BUNDLE at trap-set time
trap 'rm -f "$FIXTURE_STYLES_BUNDLE" "${CURRENT_TMP:-}"' EXIT

render() {
  local ds="$1"
  local root_attr="$2"
  local tokens="$VIS_ROOT/design-systems/$ds/tokens.css"

  if [[ ! -f "$tokens" ]]; then
    echo "missing tokens.css for design system '$ds': $tokens" >&2
    return 1
  fi

  # Per-system preview override: if the design system ships its own
  # preview-template.html, use that instead of the generic preview-kit
  # template. The override lets each system showcase its signature
  # moves (modular grid for bento, glow buttons for neon, 2px borders
  # for riso, serif body for terracotta, etc.) in a way the generic
  # preview-kit can't render. Both templates use the same
  # __TOKENS_PLACEHOLDER__ / __COMPONENTS_PLACEHOLDER__ / __DESIGN_SYSTEM_NAME__
  # / __ROOT_ATTR__ substitution contract, so the build flow doesn't
  # branch.
  local override="$VIS_ROOT/design-systems/$ds/preview-template.html"
  local template_for_render="$TEMPLATE"
  if [[ -f "$override" ]]; then
    template_for_render="$override"
  fi

  awk \
    -v ds="$ds" \
    -v root_attr="$root_attr" \
    -v tokens="$tokens" \
    -v components="$FIXTURE_STYLES_BUNDLE" '
    /^[[:space:]]*\/\*[[:space:]]*__TOKENS_PLACEHOLDER__[[:space:]]*\*\/[[:space:]]*$/ {
      while ((getline line < tokens) > 0) print line
      close(tokens)
      next
    }
    /^[[:space:]]*\/\*[[:space:]]*__COMPONENTS_PLACEHOLDER__[[:space:]]*\*\/[[:space:]]*$/ {
      while ((getline line < components) > 0) print line
      close(components)
      next
    }
    {
      gsub(/__DESIGN_SYSTEM_NAME__/, ds)
      gsub(/__ROOT_ATTR__/, root_attr)
      print
    }
  ' "$template_for_render"
}

drift=0
generated=0
for ds in "${DESIGN_SYSTEMS[@]}"; do
  for variant in light dark; do
    if [[ "$variant" == "light" ]]; then
      out="$VIS_ROOT/design-systems/$ds/preview.html"
      root_attr="$ROOT_ATTR_LIGHT"
    else
      out="$VIS_ROOT/design-systems/$ds/preview-dark.html"
      root_attr="$ROOT_ATTR_DARK"
    fi

    CURRENT_TMP="$(mktemp)"
    render "$ds" "$root_attr" > "$CURRENT_TMP"

    if [[ "$mode" == "check" ]]; then
      if [[ ! -f "$out" ]]; then
        echo "missing: $out" >&2
        drift=1
      elif ! diff -q "$CURRENT_TMP" "$out" >/dev/null 2>&1; then
        echo "drift: $out" >&2
        diff -u "$out" "$CURRENT_TMP" >&2 || true
        drift=1
      fi
      rm -f "$CURRENT_TMP"
    else
      mv "$CURRENT_TMP" "$out"
      generated=$((generated + 1))
    fi
    CURRENT_TMP=""
  done
done

if [[ "$mode" == "check" ]]; then
  if [[ $drift -ne 0 ]]; then
    echo "" >&2
    echo "Preview drift detected. Run \`dev-scripts/build-previews.sh\` (no --check) to regenerate." >&2
    exit 1
  fi
  echo "OK · previews fresh for ${#DESIGN_SYSTEMS[@]} design systems"
else
  echo "OK · generated $generated preview files across ${#DESIGN_SYSTEMS[@]} design systems"
fi
