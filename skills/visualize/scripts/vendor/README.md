# Vendored runtime dependencies

These readable modules work from an installed skill without `npm install`.
The entrypoints `node-html-parser.mjs` and `puppeteer.mjs` retain their exports;
their implementation lives in adjacent module directories. `axe/` replaces the
minified browser bundle. `culori.mjs` is unchanged.

| Entry | Package | Version | License |
|---|---|---|---|
| `node-html-parser.mjs` | node-html-parser | 7.1.0 | MIT |
| `culori.mjs` | culori | 4.0.2 | MIT |
| `axe/index.cjs` | axe-core | 4.11.4 | MPL-2.0 |
| `puppeteer.mjs` | puppeteer-core + @puppeteer/browsers | 25.0.4 + 3.0.3 | Apache-2.0 |

[manifest.json](manifest.json) records exact bundled transitive versions, axe's
immutable upstream source and archive checksum, the build-lock checksum, and
output sizes/hashes. [LICENSES.txt](LICENSES.txt) includes full license texts.
Generated source is not minified; large entity tables and Unicode regular
expressions remain data. Dependency cycles stay together to preserve initialization.
Puppeteer's injected browser utilities are also readable in `puppeteer/injected.cjs`,
rather than an embedded minified program.

`axe-loader.mjs` reads the manifest-listed axe CommonJS modules and assembles a
small inline module registry for the existing script injection path. Module code
stays readable on disk; each module initializes once. This preserves artifacts
whose CSP allows inline scripts and blocks external scripts. It opens no listener,
fetches no runtime code, and changes no Chromium flags or page CSP. The full
upstream rule configuration is retained; `browser-contrast.mjs` still selects
`color-contrast`.

## Runtime requirements (unchanged)

- Detector: Node 18+.
- Puppeteer browser helpers: Node 22.12+.
- System Google Chrome is preferred. Otherwise the existing managed Chromium
  downloader needs outbound HTTPS and writes to the existing cache
  (`VISUALIZE_PUPPETEER_CACHE_DIR` overrides it).
- Optional `proxy-agent` remains excluded, as in the previous bundle. Proxy-only
  hosts need system Chrome or a pre-populated browser cache.

## Rebuild (maintainers only)

From the repository root, using Node 22.12+ and npm:

```sh
npm ci --prefix dev-scripts/vendor-build --ignore-scripts
npm run build --prefix dev-scripts/vendor-build
node dev-scripts/check-skill-package.mjs
node dev-scripts/check-fixtures.mjs
node skills/visualize/scripts/browser-diagram.mjs --self-test
```

The build tools and lockfile live outside the installable skill. The build fetches
a checksum-verified axe source archive, cached under its ignored `node_modules/`;
it uses the npm release's complete configuration, upstream metadata-map recipe,
and the release's Color.js null-CSS guard patch.
It resolves only pinned build inputs and Node built-ins. No ancestor project
packages may leak into the result. All other sources come from the npm lockfile.
The Apache license omitted from Puppeteer's npm packages is copied from
`puppeteer-core-v25.0.4/LICENSE`; boolbase's declared ISC terms are included with
its package-author attribution because its npm archive has no license file.

To compare a second output without replacing the shipped copy:

```sh
node dev-scripts/vendor-build/build.mjs /absolute/path/to/empty-output
```

Culori is intentionally outside this rebuild; its existing readable bundle is
preserved. Updating versions is a separate change: update exact inputs and source
checksums, rebuild, and rerun fixture/browser checks. The package integrity check
rejects missing or changed generated files, oversized vendor files (256 KiB), and
an installed skill over 512 files. These bounds address known review limitations;
they do not establish directory approval. This change does not remove bundled jq
from the Display plugin or alter its hooks.
