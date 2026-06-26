#!/usr/bin/env bash
# Golden-file gate for visualize/scripts/browser-contrast.mjs.
#
# Runs browser-contrast.mjs against every fixture under
# visualize/scripts/fixtures/, normalises the NDJSON (sort lines, zero
# durationMs), and diffs against the committed *.expected.ndjson files.
# Exits non-zero on any drift.
#
# This is a local-only contributor gate (the spec's CI variant is not
# wired — would add ~30s Chromium download per run). Run it manually
# when you touch browser-contrast.mjs, vendor/axe.min.js, or any fixture.
#
# Usage:
#   dev-scripts/verify-browser-contrast.sh           # check
#   dev-scripts/verify-browser-contrast.sh --update  # refresh expected
#                                                   # files in place

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/visualize/scripts"

if [ ! -d fixtures ]; then
  echo "error: visualize/scripts/fixtures/ not found" >&2
  exit 1
fi

MODE=check
if [ "${1:-}" = "--update" ]; then
  MODE=update
elif [ -n "${1:-}" ]; then
  echo "usage: $0 [--update]" >&2
  exit 1
fi

normalize() {
  python3 -c '
import json, sys
parsed = []
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    obj = json.loads(line)
    if obj.get("type") == "summary":
        obj["durationMs"] = 0
    parsed.append(obj)

findings = sorted(
    [p for p in parsed if p.get("type") == "finding"],
    key=lambda f: (f.get("severity",""), f.get("locator",""), f.get("snippet","")),
)
summary = next((p for p in parsed if p.get("type") == "summary"), None)
for f in findings:
    print(json.dumps(f, ensure_ascii=False, separators=(",", ":")))
if summary:
    print(json.dumps(summary, ensure_ascii=False, separators=(",", ":")))
'
}

drift=0
checked=0
TMPDIR="$(mktemp -d -t verify-browser-contrast.XXXXXX)"
trap 'rm -rf "$TMPDIR"' EXIT
for fixture in fixtures/*.html; do
  base="$(basename "$fixture" .html)"
  expected_path="fixtures/${base}.expected.ndjson"
  stdout_path="$TMPDIR/${base}.stdout"
  stderr_path="$TMPDIR/${base}.stderr"

  # Run the sidecar; capture stdout + stderr separately so a Chrome
  # acquisition / launch failure surfaces with the real message instead
  # of being swallowed by `set -e`.
  if ! node ./browser-contrast.mjs --json "$fixture" > "$stdout_path" 2> "$stderr_path"; then
    echo "error: browser-contrast.mjs failed on $fixture" >&2
    cat "$stderr_path" >&2
    drift=$((drift + 1))
    continue
  fi
  actual_normalized="$(normalize < "$stdout_path")"

  if [ "$MODE" = update ]; then
    # Write to a temp file first, then atomic move into place. Guards
    # against half-written expected files if the script is interrupted.
    tmp_expected="$TMPDIR/${base}.expected.ndjson.partial"
    printf '%s\n' "$actual_normalized" > "$tmp_expected"
    mv "$tmp_expected" "$expected_path"
    echo "updated: $expected_path"
    continue
  fi

  if [ ! -f "$expected_path" ]; then
    echo "drift: missing $expected_path (run with --update to create)" >&2
    drift=$((drift + 1))
    continue
  fi

  diff_path="$TMPDIR/${base}.diff"
  if ! diff -u --label actual --label expected <(printf '%s\n' "$actual_normalized") "$expected_path" > "$diff_path" 2>&1; then
    echo "drift: $fixture differs from $expected_path" >&2
    cat "$diff_path" >&2
    drift=$((drift + 1))
  fi
  checked=$((checked + 1))
done

if [ "$MODE" = update ]; then
  if [ "$drift" -gt 0 ]; then
    # `drift` here counts fixtures that failed to GENERATE an expected
    # file — Chrome launch failures, page-load failures, etc. A real
    # error during --update should not look like success.
    echo "" >&2
    echo "$drift fixture(s) failed during --update; their .expected.ndjson is NOT refreshed." >&2
    exit 1
  fi
  exit 0
fi

if [ "$drift" -gt 0 ]; then
  echo "" >&2
  echo "$drift fixture(s) drifted. Re-run with --update if the new output is intentional." >&2
  exit 1
fi

echo "OK: $checked fixture(s) match expected NDJSON."
