#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const visualizeRoot = path.join(repoRoot, "visualize");
const fixturesRoot = path.join(visualizeRoot, "fixtures");
const designSystemsRoot = path.join(visualizeRoot, "design-systems");

function usage() {
  console.error(`usage:
  build-template-previews.sh --fixture <patterns/table.html> --design-system <slug> [--mode light|dark|both] [--out-dir temp/template-previews]
  build-template-previews.sh --matrix dev-scripts/template-preview-matrix.json [--mode light|dark|both] [--out-dir temp/template-previews]
  build-template-previews.sh --manifest [--design-system <slug>] [--mode light|dark|both] [--out-dir temp/template-previews]

Template HTML is no longer a canonical authoring input. Use fixture files listed in visualize/fixtures/manifest.json.`);
}

function parseArgs(argv) {
  const args = {
    mode: "both",
    outDir: path.join(repoRoot, "temp", "template-previews"),
    designSystem: "clean",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      i += 1;
      if (i >= argv.length) throw new Error(`missing value for ${arg}`);
      return argv[i];
    };

    if (arg === "--fixture") args.fixture = next();
    else if (arg === "--template" || arg === "--variant") {
      throw new Error(`${arg} is obsolete: template directories now contain contract-only template.md files; pass --fixture or --manifest`);
    } else if (arg === "--design-system") args.designSystem = next();
    else if (arg === "--mode") args.mode = next();
    else if (arg === "--matrix") args.matrix = next();
    else if (arg === "--manifest") args.manifest = true;
    else if (arg === "--out-dir") args.outDir = path.resolve(repoRoot, next());
    else if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  if (!["light", "dark", "both"].includes(args.mode)) {
    throw new Error("--mode must be light, dark, or both");
  }

  if (!args.matrix && !args.fixture && !args.manifest) {
    throw new Error("pass --fixture, --manifest, or --matrix");
  }

  return args;
}

function rootAttr(mode) {
  return ` data-theme="${mode}"`;
}

function applyRootAttrs(html, designSystem, mode) {
  let next = html.replace(/__ROOT_ATTR__/g, rootAttr(mode));
  next = next.replace(
    /<html([^>]*)data-design-system="[^"]*"([^>]*)>/,
    `<html$1data-design-system="${designSystem}" data-fixture-preview="true"${rootAttr(mode)}$2>`,
  );
  if (next === html) {
    next = html.replace(
      /<html([^>]*)>/,
      `<html$1 data-design-system="${designSystem}" data-fixture-preview="true"${rootAttr(mode)}>`,
    );
  }
  return next;
}

function replacePlaceholder(html, marker, value) {
  const pattern = new RegExp(`^[ \\t]*/\\*[ \\t]*${marker}[ \\t]*\\*/[ \\t]*$`, "m");
  if (!pattern.test(html)) return html;
  return html.replace(pattern, value.trimEnd());
}

async function renderFixture({ fixture, designSystem, mode }) {
  const fixturePath = path.join(fixturesRoot, fixture);
  const tokensPath = path.join(designSystemsRoot, designSystem, "tokens.css");
  const html = await readFile(fixturePath, "utf8");
  const tokens = await readFile(tokensPath, "utf8");

  let rendered = replacePlaceholder(html, "__TOKENS_PLACEHOLDER__", tokens);
  rendered = rendered.replace(/__DESIGN_SYSTEM_NAME__/g, designSystem);
  rendered = applyRootAttrs(rendered, designSystem, mode);
  return rendered;
}

function rebaseRelativeUrls(html, fixturePath, outputDir) {
  return html.replace(/\b(src|href)="([^"]+)"/g, (match, attr, url) => {
    if (/^(?:[a-z]+:|\/\/|#|data:)/i.test(url)) return match;
    const targetPath = path.resolve(path.dirname(fixturePath), url);
    let rebased = path.relative(outputDir, targetPath).split(path.sep).join("/");
    if (!rebased.startsWith(".")) rebased = `./${rebased}`;
    return `${attr}="${rebased}"`;
  });
}

async function writePreview({ fixture, designSystem, mode, outDir }) {
  let rendered = await renderFixture({ fixture, designSystem, mode });
  const fixtureSlug = fixture.replace(/\.html$/, "");
  const outputDir = path.join(outDir, fixtureSlug, designSystem);
  rendered = rebaseRelativeUrls(rendered, path.join(fixturesRoot, fixture), outputDir);
  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${mode}.html`);
  await writeFile(outputPath, rendered);
  return outputPath;
}

async function jobsFromManifest(designSystem, modes) {
  const manifest = JSON.parse(await readFile(path.join(fixturesRoot, "manifest.json"), "utf8"));
  const fixtures = [
    ...(manifest.patternFixtures ?? []).map((item) => item.file),
    ...(manifest.shellFixtures ?? []).map((item) => item.file),
  ];
  return fixtures.flatMap((fixture) => modes.map((mode) => ({ fixture, designSystem, mode })));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const modes = args.mode === "both" ? ["light", "dark"] : [args.mode];
  const jobs = [];

  if (args.matrix) {
    const matrixPath = path.resolve(repoRoot, args.matrix);
    const matrix = JSON.parse(await readFile(matrixPath, "utf8"));
    for (const row of matrix.previews ?? []) {
      const fixture = row.fixture ?? row.file;
      if (!fixture) throw new Error("matrix rows must use fixture or file; template rows are obsolete");
      for (const designSystem of row.designSystems ?? [args.designSystem]) {
        for (const mode of modes) jobs.push({ fixture, designSystem, mode });
      }
    }
  } else if (args.manifest) {
    jobs.push(...(await jobsFromManifest(args.designSystem, modes)));
  } else {
    for (const mode of modes) jobs.push({ fixture: args.fixture, designSystem: args.designSystem, mode });
  }

  const written = [];
  for (const job of jobs) {
    written.push(await writePreview({ ...job, outDir: args.outDir }));
  }

  console.log(`OK · generated ${written.length} fixture previews under ${path.relative(repoRoot, args.outDir)}`);
}

main().catch((error) => {
  console.error(error.message);
  usage();
  process.exit(1);
});
