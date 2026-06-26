#!/usr/bin/env node
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const templatesRoot = path.join(repoRoot, "visualize", "templates");

const dirs = (await readdir(templatesRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const rows = [];
let failures = 0;

for (const slug of dirs) {
  const dir = path.join(templatesRoot, slug);
  const files = await readdir(dir);
  const hasTemplateMd = files.includes("template.md");
  const htmlFiles = files.filter((file) => /^template.*\.html$/.test(file)).sort();
  const skillFiles = files.filter((file) => file === "template-skill.md");
  let shell = "";
  if (hasTemplateMd) {
    const content = await readFile(path.join(dir, "template.md"), "utf8");
    shell = content.match(/^shell:\s*(.+)$/m)?.[1]?.trim() ?? "";
  }
  if (!hasTemplateMd || htmlFiles.length > 0 || skillFiles.length > 0) failures += 1;
  rows.push({
    template: slug,
    contract: hasTemplateMd ? "yes" : "no",
    shell,
    htmlFiles: htmlFiles.join("|"),
    skillFiles: skillFiles.join("|"),
  });
}

console.log(
  [
    "template,contract,shell,live_html_files,legacy_skill_files",
    ...rows.map((row) =>
      [row.template, row.contract, row.shell, row.htmlFiles, row.skillFiles].join(","),
    ),
  ].join("\n"),
);

console.error(`\nChecked ${rows.length} template contracts. ${failures} families violate the contract-only model.`);

if (process.argv.includes("--strict") && failures > 0) {
  process.exit(1);
}
