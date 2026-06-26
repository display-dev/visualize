#!/usr/bin/env bash
# Screenshot per-design-system previews via headless Chrome.
#
# For each requested design system <ds>, captures:
#   <out-dir>/<ds>-light.png   (from design-systems/<ds>/preview.html)
#   <out-dir>/<ds>-dark.png    (from design-systems/<ds>/preview-dark.html)
#
# Pre-requisite: a local HTTP server serving the visualize/ directory.
# Default URL root: http://localhost:9091. Override with VIS_HOST.
#
# Start the server (if not running):
#   cd visualize/ && python3 -m http.server 9091
#
# Usage:
#   screenshot-previews.sh <brand> [<brand>...]   # one or more brands
#   screenshot-previews.sh --all                  # every brand under design-systems/
#   screenshot-previews.sh --list                 # print all brand slugs and exit
#
# Environment overrides:
#   VIS_HOST       (default http://localhost:9091)   URL prefix of the http server
#   OUT_DIR        (default /tmp/preview-shots)      where PNGs land
#   CACHE_DIR      (default /tmp/chrome-screenshots-cache)  shared Chrome profile
#   VIEWPORT       (default 1280,2400)               window-size flag value
#   CHROME_BIN     (default macOS Google Chrome.app)  override on Linux / Chromium
#   MAX_WAIT       (default 30)                       max seconds per shot
#
# Why the spawn-poll-kill pattern below:
#   `chromium --headless=new --screenshot` writes the PNG within a few
#   seconds of page load, then hangs after — observed on macOS 14+ with
#   Chrome 148+. A naive `chrome ... && check` waits forever; sleep-based
#   workarounds accumulate zombie processes. Instead we background the
#   Chrome process, poll for the PNG to exist + have non-zero size, then
#   kill -9 the moment it appears.
#
# Exit codes:
#   0  every requested brand shot light + dark
#   1  one or more shots failed (timed out before PNG appeared)
#   2  usage error
#   3  HTTP server not reachable
#   4  template not built (missing preview.html for a brand)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VIS_ROOT="$(cd "$SCRIPT_DIR/../visualize" && pwd)"
DS_DIR="$VIS_ROOT/design-systems"

VIS_HOST="${VIS_HOST:-http://localhost:9091}"
OUT_DIR="${OUT_DIR:-/tmp/preview-shots}"
CACHE_DIR="${CACHE_DIR:-/tmp/chrome-screenshots-cache}"
VIEWPORT="${VIEWPORT:-1280,2400}"
MAX_WAIT="${MAX_WAIT:-30}"

# Default Chrome binary: macOS first, then linux fallbacks.
if [[ -z "${CHROME_BIN:-}" ]]; then
  if [[ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
    CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  elif command -v google-chrome >/dev/null 2>&1; then
    CHROME_BIN="$(command -v google-chrome)"
  elif command -v chromium >/dev/null 2>&1; then
    CHROME_BIN="$(command -v chromium)"
  else
    echo "screenshot-previews: no Chrome/Chromium binary found. Set CHROME_BIN." >&2
    exit 2
  fi
fi

usage() {
  sed -n '2,/^$/p' "$0" | sed 's/^# \{0,1\}//'
  exit 2
}

list_brands() {
  find "$DS_DIR" -mindepth 1 -maxdepth 1 -type d | sort | while read -r d; do
    basename "$d"
  done
}

shoot() {
  local url="$1" out="$2"
  rm -f "$out"

  "$CHROME_BIN" \
    --headless=new --disable-gpu --hide-scrollbars --no-sandbox \
    --virtual-time-budget=5000 \
    --user-data-dir="$CACHE_DIR" \
    --window-size="$VIEWPORT" \
    --screenshot="$out" \
    "$url" >/dev/null 2>&1 &
  local pid=$!

  local waited=0
  until [[ -s "$out" ]] || [[ $waited -gt $((MAX_WAIT * 4)) ]]; do
    sleep 0.25
    waited=$((waited + 1))
  done

  kill -9 "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true

  [[ -s "$out" ]]
}

# --- Arg parsing ---

if [[ $# -eq 0 ]]; then
  usage
fi

if [[ "$1" == "--list" ]]; then
  list_brands
  exit 0
fi

if [[ "$1" == "--all" ]]; then
  mapfile -t BRANDS < <(list_brands)
else
  BRANDS=("$@")
fi

# --- Preflight: server + cache dir ---

if ! curl -sf -o /dev/null -m 3 "$VIS_HOST/"; then
  echo "screenshot-previews: $VIS_HOST/ not reachable." >&2
  echo "  start it: cd $VIS_ROOT && python3 -m http.server 9091" >&2
  exit 3
fi

mkdir -p "$OUT_DIR" "$CACHE_DIR"

# --- Shoot ---

failed=0
shot=0
for brand in "${BRANDS[@]}"; do
  if [[ ! -f "$DS_DIR/$brand/preview.html" || ! -f "$DS_DIR/$brand/preview-dark.html" ]]; then
    echo "  MISSING  $brand (run bash dev-scripts/build-previews.sh first)" >&2
    failed=$((failed + 1))
    continue
  fi

  for theme in light dark; do
    file="preview.html"
    [[ "$theme" == "dark" ]] && file="preview-dark.html"
    url="$VIS_HOST/design-systems/$brand/$file"
    out="$OUT_DIR/${brand}-${theme}.png"

    if shoot "$url" "$out"; then
      bytes=$(stat -f '%z' "$out" 2>/dev/null || stat -c '%s' "$out")
      printf '  OK       %-32s %s\n' "$brand-$theme" "${bytes}B"
      shot=$((shot + 1))
    else
      echo "  FAIL     ${brand}-${theme} (no PNG after ${MAX_WAIT}s)" >&2
      failed=$((failed + 1))
    fi
  done
done

# --- Cleanup any stray Chrome processes we may have orphaned ---
pkill -9 -f "user-data-dir=$CACHE_DIR" 2>/dev/null || true

echo ""
echo "shot $shot · failed $failed · out $OUT_DIR"

[[ $failed -eq 0 ]]
