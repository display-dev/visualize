# vendor/

Single-file bundles of external libraries the anti-slop detector (`detect.mjs`) and the computed-contrast sidecar (`browser-contrast.mjs`) depend on. Vendored inline so the skill works immediately after `npx skills add display-dev/visualize`, with no `npm install` step required.

## Contents

| File | Source package(s) | Version | Size | License | sha256 |
|---|---|---|---|---|---|
| `node-html-parser.mjs` | [`node-html-parser`](https://github.com/taoqf/node-html-parser) | 7.1.0 | ~380KB | MIT | — |
| `culori.mjs` | [`culori`](https://github.com/Evercoder/culori) | 4.0.2 | ~95KB | MIT | — |
| `axe.min.js` | [`axe-core`](https://github.com/dequelabs/axe-core) | 4.11.4 | ~552KB | MPL-2.0 | `fb83a4378d978ecb7d2dae48a3a3778a84c971ac692f3afd45d714fba89c0f0d` |
| `puppeteer.mjs` | [`puppeteer-core`](https://github.com/puppeteer/puppeteer) 25.0.4 + [`@puppeteer/browsers`](https://github.com/puppeteer/puppeteer) 3.0.3 | combined | ~2.2MB | Apache-2.0 (top-level) + MIT/ISC (transitive) | `9792dfb7806a050f7f53be9b47afc376658ab5f496db0b75cdcf1dce648a44f8` |

`node-html-parser` bundles its own transitive chain (`css-select` and its dependents, `he`). `culori` has no transitive deps. `axe.min.js` is shipped as-is from the upstream npm package — it is already a self-contained minified browser bundle. `puppeteer.mjs` is a combined esbuild bundle of `puppeteer-core` and `@puppeteer/browsers`, exposing only the symbols `browser-contrast.mjs` reaches for; it inlines representative transitive MIT/ISC/Apache-2.0 code (`debug`, `ws`, `chromium-bidi`, `tar-fs`, `tar-stream`, `yargs`, `progress`, `streamx`, `b4a`, `cliui`, `fast-fifo`, and others). Individual transitive license comments / SPDX identifiers are preserved inline via `esbuild --legal-comments=inline`; the per-package SPDX summary is recorded in the skill's top-level `NOTICES.md`.

## Runtime requirements

- `detect.mjs` runs on Node 18+. Unchanged.
- `browser-contrast.mjs` runs on **Node 22.12+** because `puppeteer-core@25` declares `engines.node >= 22.12.0`. The bundle target is `node22.12` (versus `node18` for `culori.mjs` / `node-html-parser.mjs`). The sidecar will start on older Node, but `puppeteer.launch()` is not safe to assume there.
- `browser-contrast.mjs` needs outbound HTTPS on the first run that doesn't find system Chrome (for the managed Chromium download from `storage.googleapis.com`). The bundle does **not** include `proxy-agent` — proxy-only environments must pre-install system Chrome (or pre-populate `VISUALIZE_PUPPETEER_CACHE_DIR` from a host with direct egress). The fallback is gated by `computeSystemExecutablePath` succeeding, so users with Google Chrome installed never hit this code path.
- "System Chrome" here means specifically **Google Chrome**, not distro Chromium. On a Linux box that carries `chromium` but not `google-chrome-stable`, `computeSystemExecutablePath({ browser: Browser.CHROME, channel: 'stable' })` will `throw` and the managed-install path runs.

## Re-bundling against upstream

When upstream releases a new version we want to pick up:

```sh
mkdir /tmp/viz-vendor && cd /tmp/viz-vendor
npm init -y

# === detect.mjs deps ===
npm install --save-exact node-html-parser@<version> culori@<version> esbuild@latest

cat > entry-html-parser.mjs <<'EOF'
export { parse, HTMLElement, NodeType, TextNode, valid } from 'node-html-parser';
EOF
npx esbuild entry-html-parser.mjs --bundle --format=esm --platform=node \
  --target=node18 --outfile=node-html-parser.mjs --legal-comments=inline

cat > entry-culori.mjs <<'EOF'
export { parse, formatHex, formatRgb, formatCss, converter,
         wcagContrast, wcagLuminance, differenceEuclidean } from 'culori';
EOF
npx esbuild entry-culori.mjs --bundle --format=esm --platform=node \
  --target=node18 --outfile=culori.mjs --legal-comments=inline

# === browser-contrast.mjs deps ===
npm install --save-exact puppeteer-core@<version> @puppeteer/browsers@<version> axe-core@<version>

# Copy axe-core's minified browser bundle as-is — it's already self-contained.
cp node_modules/axe-core/axe.min.js axe.min.js

# Combined puppeteer bundle. The `--banner:js` flag is load-bearing — puppeteer-core
# and @puppeteer/browsers pull in CJS deps (e.g. `debug`) that use require() for Node
# built-ins, which the bundled ESM output can't resolve without createRequire.
cat > entry-puppeteer.mjs <<'EOF'
import puppeteer from 'puppeteer-core';
import {
  computeSystemExecutablePath,
  install,
  resolveBuildId,
  detectBrowserPlatform,
  Browser,
  BrowserTag,
} from '@puppeteer/browsers';

export {
  puppeteer,
  computeSystemExecutablePath,
  install,
  resolveBuildId,
  detectBrowserPlatform,
  Browser,
  BrowserTag,
};
EOF
npx esbuild entry-puppeteer.mjs --bundle --format=esm --platform=node \
  --target=node22.12 --outfile=puppeteer.mjs --legal-comments=inline \
  --banner:js="import { createRequire as __viz_createRequire } from 'node:module'; const require = __viz_createRequire(import.meta.url);"

# Copy back to the skill repo, then refresh version + sha256 in the table above.
shasum -a 256 axe.min.js puppeteer.mjs
```

Update the version, size, and sha256 columns in the table above after copying. Bump `node-html-parser.mjs` and `culori.mjs` headers individually if their bundles change too.

## Why vendored, not npm dep

Per the skill's distribution model: `npx skills add display-dev/visualize` should be sufficient to use everything in the bundle. A `package.json + npm install` step would break that promise — installing the skill into a project that doesn't have npm available (some headless agent hosts), or that has npm but doesn't want to mutate `node_modules` for an agent skill, would silently fail.

Vendoring trades ~3.2MB of disk per skill install for zero install-time machinery. The Chromium binary that `browser-contrast.mjs` drives is NOT vendored — it's downloaded lazily into `~/.cache/visualize-skill/puppeteer/` on first run (or skipped entirely when a system Chrome / Chromium is already installed). See `browser-contrast.mjs` for the resolution path.
