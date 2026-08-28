# Design-system notices

Design systems under `visualize/design-systems/<name>-style/` are independent
reference implementations inspired by public brand surfaces. Repository-level
notices for vendored runtime bundles are collected here.

## Brand reference

Design systems with a `-style` suffix (`stripe-style`, `figma-style`, …) are
independent reference implementations inspired by the public visual language
of well-known brands. They are not affiliated with, endorsed by, or
representative of the named companies. All brand names and trademarks remain
the property of their respective owners.
## Vendored bundles (`scripts/vendor/`)

The skill vendors a small set of npm-distributed libraries as single-file bundles so the detector and browser-contrast sidecar work after `npx skills add display-dev/visualize` with no `npm install` step. Per-file version, size, and sha256 are recorded in [`scripts/vendor/README.md`](scripts/vendor/README.md).

- `node-html-parser` — MIT — https://github.com/taoqf/node-html-parser
- `culori` — MIT — https://github.com/Evercoder/culori
- `axe-core` — MPL-2.0 — https://github.com/dequelabs/axe-core
- `puppeteer-core` — Apache-2.0 — https://github.com/puppeteer/puppeteer
- `@puppeteer/browsers` — Apache-2.0 — https://github.com/puppeteer/puppeteer

The combined `puppeteer.mjs` bundle inlines transitive code under MIT, ISC, and Apache-2.0 — representative packages include `debug`, `ws`, `chromium-bidi`, `tar-fs`, `tar-stream`, `yargs`, `progress`, `streamx`, `b4a`, `fast-fifo`, `cliui`. Legal comments and SPDX identifiers from each upstream package are preserved inline via `esbuild --legal-comments=inline`; consult the bundle directly for the authoritative per-package text.

## Adapted color guidance

`reference/color.md` adapts selected procedural principles and color vocabulary, with new wording and scope for Visualize. No external executable code, tools, or third-party reference collection is imported.

- [pbakaus/impeccable](https://github.com/pbakaus/impeccable/blob/09506a9bb5bd4fc87e696718f0f9c8ba2b60692c/plugin/skills/impeccable/reference/colorize.md), revision `09506a9bb5bd4fc87e696718f0f9c8ba2b60692c`. [Original license](reference/licenses/impeccable-Apache-2.0.txt). Adapted on 2026-08-28.
- [meodai/skill.color-expert](https://github.com/meodai/skill.color-expert/blob/d60f17973cab5bafb6caef605e9592dfe832b90b/SKILL.md), revision `d60f17973cab5bafb6caef605e9592dfe832b90b`. [Original license](reference/licenses/color-expert.txt). Adapted on 2026-08-28.

Impeccable is by Paul Bakaus, under Apache-2.0. Color Expert is by meodai, under CC BY 4.0 for its original material; third-party reference content has separate terms and was not imported. Color Expert-derived adaptations remain attributed and licensed under CC BY 4.0; the repository MIT license does not replace these source terms.
