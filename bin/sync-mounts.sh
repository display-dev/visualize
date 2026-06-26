#!/usr/bin/env bash
# Mirror canonical `visualize/` to the three distribution mirrors with
# placeholder substitution. Thin wrapper around bin/transform.mjs; the
# transformer carries the per-mirror placeholder table.
#
# Usage:
#   bin/sync-mounts.sh           # write resolved mirrors
#   bin/sync-mounts.sh --check   # CI gate: exit 1 if any mirror drifts
#
# Source of truth is `visualize/` only. Never edit the mirrors directly.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
exec node "$ROOT/bin/transform.mjs" "$@"
