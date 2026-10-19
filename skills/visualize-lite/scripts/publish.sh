#!/usr/bin/env bash
# Anonymous single-file publish to display.dev. No login, no setup —
# returns a 30-day preview URL + a claim URL the user can sign up against.
#
# Usage:
#   publish.sh <path-to-html-or-md> [--name "Artifact title"]
#
# Vendored from display-dev/skill's publish.sh (anonymous-single-file
# branch only). Richer flows (--visibility, --share-with, multifile,
# SSO login) live in the @displaydev/cli npm package; this script keeps
# the no-dependency hot path working.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
# shellcheck source=./_common.sh
source "$SCRIPT_DIR/_common.sh"

require_jq_or_exit

FILE=""
NAME=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)
      NAME="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: publish.sh <path-to-html-or-md> [--name \"Artifact title\"]" >&2
      exit 0
      ;;
    *)
      if [[ -z "$FILE" ]]; then
        FILE="$1"
        shift
      else
        echo "Unexpected argument: $1" >&2
        exit 2
      fi
      ;;
  esac
done

if [[ -z "$FILE" ]]; then
  echo "Usage: publish.sh <path-to-html-or-md> [--name \"Artifact title\"]" >&2
  exit 2
fi

if [[ ! -r "$FILE" ]]; then
  echo "File not readable: $FILE" >&2
  exit 1
fi

# Default the artifact name to the basename if not provided.
if [[ -z "$NAME" ]]; then
  NAME="$(basename "$FILE")"
fi

# Determine content type from extension.
case "$FILE" in
  *.html|*.htm) CONTENT_TYPE="text/html" ;;
  *.md|*.markdown) CONTENT_TYPE="text/markdown" ;;
  *)
    echo "Unsupported extension. Use .html, .htm, .md, or .markdown." >&2
    exit 1
    ;;
esac

CONTENT="$("$JQ" -Rs '.' < "$FILE")"
NAME_JSON="$("$JQ" -Rs '.' <<< "$NAME")"

PAYLOAD="$("$JQ" -n \
  --argjson content "$CONTENT" \
  --argjson name "$NAME_JSON" \
  --arg contentType "$CONTENT_TYPE" \
  '{name: $name, content: $content, contentType: $contentType}')"

RESPONSE="$(curl_api -X POST \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "$API_URL/v1/public/artifacts")"

echo "$RESPONSE" | "$JQ" .
