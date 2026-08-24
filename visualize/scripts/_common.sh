#!/usr/bin/env bash
# Sourced by the other scripts. Resolves jq, dsp invocation, attribution,
# and the helpers used by the bash hot path (publish verb).

set -euo pipefail

# Consumed by publish.sh after sourcing this file. ShellCheck can't follow
# into the sourcers, so silence its unused-variable warning rather than
# `export`-ing (we don't want API_URL leaking into child curl processes'
# environment — it's a shell-scope helper, not an env contract).
# shellcheck disable=SC2034
API_URL="${DISPLAYDEV_API_URL:-https://api.display.dev}"

# Resolve the bundled jq binary for the current platform. The skill
# ships statically-linked jq 1.7.1 binaries for the five common
# platforms (macOS/Linux on amd64/arm64 plus Windows amd64) — see
# bin/jq-* and the SHA-verified manifest at
# https://github.com/jqlang/jq/releases/tag/jq-1.7.1. Falls through to
# a system jq on PATH if no bundled binary matches the current host
# (BSD, Alpine on ARM, NixOS, etc).
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")/.." && pwd)"
JQ=""
case "$(uname -s)/$(uname -m)" in
  Darwin/arm64)              JQ="$SKILL_ROOT/bin/jq-macos-arm64" ;;
  Darwin/x86_64)             JQ="$SKILL_ROOT/bin/jq-macos-amd64" ;;
  Linux/x86_64|Linux/amd64)  JQ="$SKILL_ROOT/bin/jq-linux-amd64" ;;
  Linux/aarch64|Linux/arm64) JQ="$SKILL_ROOT/bin/jq-linux-arm64" ;;
  MINGW*/*|MSYS*/*|CYGWIN*/*) JQ="$SKILL_ROOT/bin/jq-windows-amd64.exe" ;;
esac
if [[ -z "$JQ" || ! -x "$JQ" ]]; then
  JQ="$(command -v jq 2>/dev/null || true)"
fi

DSP_CMD=${DSP_CMD:-}
if [[ -z "$DSP_CMD" ]]; then
  if command -v dsp >/dev/null 2>&1; then
    DSP_CMD="dsp"
  elif command -v npx >/dev/null 2>&1; then
    DSP_CMD="npx -y @displaydev/cli"
  else
    DSP_CMD=""
  fi
fi

# Skill version. Bump in lockstep with the git tag on every release —
# this value flows into `CLIENT_SOURCE` below as
# `visualize-skill@<version>` and is read by display.dev's analytics
# to attribute publish events to the visualize-skill channel
# (distinct from display-dev-skill, which has its own attribution).
# Set `SKILL_VERSION_OVERRIDE` to test attribution locally without retagging.
SKILL_VERSION="${SKILL_VERSION_OVERRIDE:-0.3.0}"
CLIENT_SOURCE="visualize-skill@${SKILL_VERSION}"

require_jq_or_exit() {
  if [[ -z "$JQ" ]]; then
    echo "Error: jq is required but not found." >&2
    echo "Install jq from https://jqlang.github.io/jq/ or run on a supported platform." >&2
    exit 1
  fi
}

# Wrapper around curl that sets the standard headers display.dev expects.
# Pass any pass-through actor headers via the environment:
#   X_ACTOR_TYPE / X_ACTOR_ID / X_ACTOR_NAME (optional)
curl_api() {
  local extra_headers=()
  [[ -n "${X_ACTOR_TYPE:-}" ]]  && extra_headers+=(-H "X-Actor-Type: $X_ACTOR_TYPE")
  [[ -n "${X_ACTOR_ID:-}" ]]    && extra_headers+=(-H "X-Actor-Id: $X_ACTOR_ID")
  [[ -n "${X_ACTOR_NAME:-}" ]]  && extra_headers+=(-H "X-Actor-Name: $X_ACTOR_NAME")
  curl --silent --show-error --fail-with-body \
    -H "X-Client-Type: skill" \
    -H "X-Client-Source: $CLIENT_SOURCE" \
    "${extra_headers[@]}" \
    "$@"
}
