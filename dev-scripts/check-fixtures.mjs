#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(import.meta.dirname, "..");
const fixturesRoot = join(repoRoot, "visualize", "fixtures");
const manifestPath = join(fixturesRoot, "manifest.json");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const allowedChecks = new Set(["detect", "contrast", "desktop-smoke", "mobile-smoke", "smoke", "overflow", "print"]);

function run(label, command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status !== 0) {
    process.stderr.write(`FAIL · ${label}\n`);
    if (result.stdout) process.stderr.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
}

const entries = [
  ...(manifest.patternFixtures ?? []).map((item) => ({ kind: "pattern", ...item })),
  ...(manifest.shellFixtures ?? []).map((item) => ({ kind: "shell", ...item })),
];

let count = 0;
for (const entry of entries) {
  const checks = entry.checks ?? [];
  for (const check of checks) {
    if (!allowedChecks.has(check)) {
      process.stderr.write(`FAIL · ${entry.file}: unknown fixture check "${check}"\n`);
      process.exit(1);
    }
    const file = join(fixturesRoot, entry.file);
    if (check === "detect") {
      run(`${entry.file} detect`, process.execPath, ["visualize/scripts/detect.mjs", "--strict", file]);
    } else if (check === "contrast") {
      run(`${entry.file} contrast`, process.execPath, ["visualize/scripts/browser-contrast.mjs", "--strict", file]);
    } else if (check === "desktop-smoke" || check === "mobile-smoke") {
      if (entry.kind !== "pattern") {
        process.stderr.write(`FAIL · ${entry.file}: ${check} is only supported for pattern fixtures\n`);
        process.exit(1);
      }
      const viewport = check === "desktop-smoke" ? "desktop" : "mobile";
      run(`${entry.file} ${check}`, process.execPath, [
        "visualize/scripts/pattern-fixture-smoke.mjs",
        "--strict",
        "--viewport",
        viewport,
        file,
      ]);
    } else if (check === "smoke") {
      if (entry.shell !== "slide-canvas") {
        process.stderr.write(`FAIL · ${entry.file}: no smoke runner for shell "${entry.shell}"\n`);
        process.exit(1);
      }
      run(`${entry.file} smoke`, process.execPath, ["visualize/scripts/slide-canvas-smoke.mjs", "--strict", file]);
    } else if (check === "overflow") {
      if (entry.shell !== "slide-canvas") {
        process.stderr.write(`FAIL · ${entry.file}: no overflow runner for shell "${entry.shell}"\n`);
        process.exit(1);
      }
      run(`${entry.file} overflow`, process.execPath, ["visualize/scripts/slide-canvas-overflow.mjs", "--strict", file]);
    } else if (check === "print") {
      if (entry.shell !== "slide-canvas") {
        process.stderr.write(`FAIL · ${entry.file}: no print runner for shell "${entry.shell}"\n`);
        process.exit(1);
      }
      run(`${entry.file} print`, process.execPath, ["visualize/scripts/print-check.mjs", "--strict", file]);
    }
    count += 1;
  }
}

console.log(`OK · ran ${count} fixture checks from manifest.json`);
