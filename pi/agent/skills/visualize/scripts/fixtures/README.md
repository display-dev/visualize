# `fixtures/`

Golden inputs for `browser-contrast.mjs`. Three HTML files + three `.expected.ndjson` snapshots, kept in sync by `dev-scripts/verify-browser-contrast.sh`.

| Fixture | Origin | Purpose |
|---|---|---|
| `webflow-style-preview-dark.html` | Copy of `design-systems/webflow-style/preview-dark.html` | Cross-rule cascade — dark gray (`var(--brand-body)`) text on black canvas. Static `detect.mjs` can't see this; computed pass surfaces it. |
| `shopify-style-preview-dark.html` | Copy of `design-systems/shopify-style/preview-dark.html` | Text on gradient background — axe surfaces the gradient cards as `incomplete` (needs-review) and the cross-rule cases as hard `error`. Both bug-report scenarios in one fixture. |
| `figma-style-preview.html` | Copy of `design-systems/figma-style/preview.html`, Google-Fonts links stripped | Known-good baseline. Audits clean in light + dark. Offline-safe so the gate runs without network. |

Google-Fonts `<link>` lines are stripped from all three fixtures so the gate is deterministic across OS / network configurations. Contrast values are color-only — font choice does not change them.

## Refreshing

The expected files capture the sidecar's full NDJSON, sorted by `(severity, locator, snippet)`, with the summary's `durationMs` zeroed.

```sh
# Verify (no changes):
dev-scripts/verify-browser-contrast.sh

# Refresh in place after a deliberate change to browser-contrast.mjs,
# axe.min.js, or a fixture:
dev-scripts/verify-browser-contrast.sh --update
```

Drift surfaces as a unified diff. CI does NOT run this gate — adding Chromium download to PR CI was traded for keeping every PR fast. Run it locally before pushing changes that could move output.

## Adding a new fixture

1. Drop a self-contained HTML file in this directory.
2. Run `dev-scripts/verify-browser-contrast.sh --update` to create its `.expected.ndjson`.
3. Inspect the output by hand — does it match what you expected to find?
4. Commit both files together.

Fixtures should avoid external network refs (Google Fonts, CDNs). Inline the tokens / fonts you actually need.
