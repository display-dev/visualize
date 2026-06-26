#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(import.meta.dirname, "..");
const htmlPath = path.join(repoRoot, "assets", "templates-showcase.html");
const pngPath = path.join(repoRoot, "assets", "templates-showcase.png");

const tiles = [
  ["patterns/metadata.html", "swiss", "light"],
  ["patterns/toc.html", "editorial", "light"],
  ["patterns/table.html", "console", "dark"],
  ["patterns/callout.html", "terminal", "dark"],
  ["shells/slide-canvas.html", "deck", "dark"],
  ["patterns/metadata.html", "clean", "light"],
  ["patterns/toc.html", "paper-ink", "light"],
  ["patterns/table.html", "blueprint", "light"],
  ["patterns/callout.html", "clean", "light"],
  ["shells/slide-canvas.html", "brutalist", "dark"],
  ["patterns/metadata.html", "console", "dark"],
  ["patterns/toc.html", "clean", "light"],
  ["patterns/table.html", "clean", "light"],
  ["patterns/callout.html", "swiss", "light"],
  ["shells/slide-canvas.html", "kinetic-orange", "light"],
  ["patterns/table.html", "terminal", "dark"],
];

function chromeBin() {
  const candidates = [
    process.env.CHROME_BIN,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "google-chrome",
    "chromium",
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate.includes("/") && existsSync(candidate)) return candidate;
    if (!candidate.includes("/")) return candidate;
  }
  return null;
}

function renderPreview(fixture, designSystem, mode) {
  const result = spawnSync(process.execPath, [
    path.join(repoRoot, "dev-scripts", "build-template-previews.mjs"),
    "--fixture",
    fixture,
    "--design-system",
    designSystem,
    "--mode",
    mode,
  ], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || `failed to render ${fixture}/${designSystem}/${mode}`);
  }
}

function screenshot() {
  const bin = chromeBin();
  if (!bin) throw new Error("No Chrome/Chromium binary found. Set CHROME_BIN.");

  const result = spawnSync(bin, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--window-size=1280,800",
    `--screenshot=${pngPath}`,
    pathToFileURL(htmlPath).href,
  ], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "Chrome screenshot failed");
  }
}

await mkdir(path.dirname(htmlPath), { recursive: true });
for (const tile of tiles) renderPreview(...tile);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>visualize templates showcase</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: oklch(0.93 0.005 85); }
  .grid {
    width: 1280px;
    display: grid;
    grid-template-columns: repeat(4, 320px);
    grid-template-rows: repeat(4, 200px);
    gap: 0;
  }
  .tile {
    width: 320px;
    height: 200px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border: 1px solid oklch(0.88 0.006 85);
  }
  .tile iframe {
    width: 1100px;
    height: 687px;
    border: 0;
    transform: scale(0.291);
    transform-origin: top left;
    pointer-events: none;
    display: block;
  }
</style>
</head>
<body>
<div class="grid">
${tiles.map(([fixture, designSystem, mode]) => {
  const src = `../temp/template-previews/${fixture.replace(/\.html$/, "")}/${designSystem}/${mode}.html`;
  return `  <div class="tile"><iframe title="${fixture} · ${designSystem} · ${mode}" src="${src}"></iframe></div>`;
}).join("\n")}
</div>
</body>
</html>
`;

await writeFile(htmlPath, html);

if (process.argv.includes("--screenshot")) {
  screenshot();
  console.log(`OK · wrote ${path.relative(repoRoot, htmlPath)} and ${path.relative(repoRoot, pngPath)}`);
} else {
  console.log(`OK · wrote ${path.relative(repoRoot, htmlPath)}`);
}
