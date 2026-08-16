#!/usr/bin/env node
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
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

function runDiagramCheck(entry, check) {
  const file = join(fixturesRoot, entry.file);
  const runner = check.runner;
  if (runner === "mermaid-render") {
    const workDir = mkdtempSync(join(tmpdir(), "visualize-mermaid-fixture-"));
    try {
      const result = spawnSync(process.execPath, ["visualize/scripts/render-mermaid.mjs", file, join(workDir, "output.svg")], {
        cwd: repoRoot,
        encoding: "utf8",
        stdio: "pipe",
      });
      if (result.error || result.signal) {
        process.stderr.write(`FAIL · ${entry.file} ${runner}: runner did not exit normally${result.signal ? ` (${result.signal})` : ''}\n`);
        if (result.error) process.stderr.write(`${result.error.message}\n`);
        process.exit(1);
      }
      const actualExit = result.status;
      if (actualExit !== check.expectedExit) {
        process.stderr.write(`FAIL · ${entry.file} ${runner}: expected exit ${check.expectedExit}, got ${actualExit}\n`);
        if (result.stdout) process.stderr.write(result.stdout);
        if (result.stderr) process.stderr.write(result.stderr);
        process.exit(1);
      }
      return;
    } finally {
      rmSync(workDir, { recursive: true, force: true });
    }
  }
  let args;
  if (runner === "detect") {
    args = ["visualize/scripts/detect.mjs", "--strict", "--json", file];
  } else if (runner === "browser-diagram") {
    args = ["visualize/scripts/browser-diagram.mjs", "--strict", "--json", file];
  } else {
    process.stderr.write(`FAIL · ${entry.file}: unknown diagram runner "${runner}"\n`);
    process.exit(1);
  }

  const result = spawnSync(process.execPath, args, { cwd: repoRoot, encoding: "utf8", stdio: "pipe" });
  const actualExit = result.status ?? 1;
  if (actualExit !== check.expectedExit) {
    process.stderr.write(`FAIL · ${entry.file} ${runner}: expected exit ${check.expectedExit}, got ${actualExit}\n`);
    if (result.stdout) process.stderr.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(1);
  }

  const records = [];
  for (const line of (result.stdout || "").split(/\r?\n/).filter(Boolean)) {
    try { records.push(JSON.parse(line)); }
    catch {
      process.stderr.write(`FAIL · ${entry.file} ${runner}: non-JSON output: ${line}\n`);
      process.exit(1);
    }
  }
  const findings = records.filter((record) => record.type === "finding");
  const expectedFindings = check.findings ?? [];
  for (const expected of expectedFindings) {
    if (!findings.some((finding) => finding.ruleId === expected.ruleId && finding.severity === expected.severity)) {
      process.stderr.write(`FAIL · ${entry.file} ${runner}: missing ${expected.severity} ${expected.ruleId}\n`);
      if (result.stdout) process.stderr.write(result.stdout);
      process.exit(1);
    }
  }

  const ownsFinding = runner === "browser-diagram"
    ? (finding) => finding.ruleId.startsWith("diagram/")
    : (finding) => finding.ruleId.startsWith("diagram/") || finding.ruleId === "meta/external-script";
  const expectedKeys = new Set(expectedFindings.map((finding) => `${finding.ruleId}|${finding.severity}`));
  const unexpected = findings.filter((finding) => ownsFinding(finding) && !expectedKeys.has(`${finding.ruleId}|${finding.severity}`));
  if (unexpected.length > 0) {
    process.stderr.write(`FAIL · ${entry.file} ${runner}: unexpected owned finding(s): ${unexpected.map((finding) => `${finding.severity} ${finding.ruleId}`).join(", ")}\n`);
    if (result.stdout) process.stderr.write(result.stdout);
    process.exit(1);
  }
}

const entries = [
  ...(manifest.patternFixtures ?? []).map((item) => ({ kind: "pattern", ...item })),
  ...(manifest.shellFixtures ?? []).map((item) => ({ kind: "shell", ...item })),
];
const diagramEntries = (manifest.diagramFixtures ?? []).map((item) => ({ kind: "diagram", ...item }));

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

for (const entry of diagramEntries) {
  for (const check of entry.checks ?? []) {
    runDiagramCheck(entry, check);
    count += 1;
  }
}

console.log(`OK · ran ${count} fixture checks from manifest.json`);
