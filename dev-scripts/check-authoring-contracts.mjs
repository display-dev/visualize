#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");
const visualizeRoot = path.join(repoRoot, "visualize");
const templatesRoot = path.join(visualizeRoot, "templates");
const patternsRoot = path.join(visualizeRoot, "patterns");
const shellsRoot = path.join(visualizeRoot, "shells");
const fixturesRoot = path.join(visualizeRoot, "fixtures");
const designSystemsRoot = path.join(visualizeRoot, "design-systems");

function readFrontmatter(file) {
  const content = readFileSync(file, "utf8");
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error("missing frontmatter");
  const data = {};
  let currentList = null;
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line.trim()) continue;
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentList) {
      data[currentList].push(listItem[1].replace(/^["']|["']$/g, ""));
      continue;
    }
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;
    const [, key, value] = pair;
    if (value === "") {
      data[key] = [];
      currentList = key;
    } else {
      data[key] = value.replace(/^["']|["']$/g, "");
      currentList = null;
    }
  }
  return data;
}

function dirs(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

const failures = [];
const warnings = [];
function fail(label, issue) {
  failures.push(`${label}: ${issue}`);
}
function warn(label, issue) {
  warnings.push(`${label}: ${issue}`);
}

if (existsSync(path.join(visualizeRoot, "components"))) {
  fail("visualize/components", "legacy components directory still exists");
}

for (const slug of dirs(templatesRoot)) {
  const dir = path.join(templatesRoot, slug);
  const files = readdirSync(dir).filter((name) => statSync(path.join(dir, name)).isFile()).sort();
  const label = `templates/${slug}`;
  if (!files.includes("template.md")) fail(label, "missing template.md");
  if (files.includes("template-skill.md")) fail(label, "must not contain template-skill.md");
  for (const file of files) {
    if (/^template.*\.html$/.test(file)) fail(label, `must not contain live template HTML (${file})`);
  }
  if (!files.includes("template.md")) continue;
  let fm;
  try {
    fm = readFrontmatter(path.join(dir, "template.md"));
  } catch (error) {
    fail(label, error.message);
    continue;
  }
  for (const key of ["name", "description"]) {
    if (!fm[key]) fail(label, `missing frontmatter key: ${key}`);
  }
  for (const key of ["category", "reader_job", "patterns", "optional_patterns", "fixtures"]) {
    if (Object.hasOwn(fm, key)) fail(label, `disallowed frontmatter key: ${key}`);
  }
  if (Object.hasOwn(fm, "shell")) {
    if (!fm.shell) fail(label, "shell must be a non-empty slug");
    else if (!existsSync(path.join(shellsRoot, fm.shell, "README.md"))) {
      fail(label, `shell does not resolve: ${fm.shell}`);
    }
  }
}

if (!existsSync(patternsRoot)) {
  fail("patterns", "missing patterns directory");
} else {
  for (const file of readdirSync(patternsRoot).filter((name) => name.endsWith(".md")).sort()) {
    if (file === "README.md") continue;
    const label = `patterns/${file}`;
    let fm;
    try {
      fm = readFrontmatter(path.join(patternsRoot, file));
    } catch (error) {
      fail(label, error.message);
      continue;
    }
    for (const key of ["name", "description"]) {
      if (!fm[key]) fail(label, `missing frontmatter key: ${key}`);
    }
    for (const key of ["applies_to", "requires_browser_check"]) {
      if (Object.hasOwn(fm, key)) fail(label, `disallowed frontmatter key: ${key}`);
    }
  }
}

const manifestPath = path.join(fixturesRoot, "manifest.json");
if (existsSync(manifestPath)) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail("fixtures/manifest.json", `invalid JSON: ${error.message}`);
  }
  for (const item of manifest?.patternFixtures ?? []) {
    const label = `fixtures pattern ${item.pattern ?? "(missing)"}`;
    if (!item.pattern) fail(label, "missing pattern slug");
    else if (!existsSync(path.join(patternsRoot, `${item.pattern}.md`))) fail(label, "pattern recipe does not resolve");
    if (!item.file) fail(label, "missing fixture file");
    else if (!existsSync(path.join(fixturesRoot, item.file))) fail(label, `fixture file does not resolve: ${item.file}`);
  }
  for (const item of manifest?.shellFixtures ?? []) {
    const label = `fixtures shell ${item.shell ?? "(missing)"}`;
    if (!item.shell) fail(label, "missing shell slug");
    else if (!existsSync(path.join(shellsRoot, item.shell, "README.md"))) fail(label, "shell does not resolve");
    if (!item.file) fail(label, "missing fixture file");
    else if (!existsSync(path.join(fixturesRoot, item.file))) fail(label, `fixture file does not resolve: ${item.file}`);
  }
}

if (existsSync(designSystemsRoot)) {
  for (const slug of dirs(designSystemsRoot)) {
    if (slug.startsWith("_")) continue;
    const previewTemplate = path.join(designSystemsRoot, slug, "preview-template.html");
    if (!existsSync(previewTemplate)) continue;
    const source = readFileSync(previewTemplate, "utf8");
    const easingLiterals = source.match(/\bcubic-bezier\(\s*[-0-9.]+\s*,\s*[-0-9.]+\s*,\s*[-0-9.]+\s*,\s*[-0-9.]+\s*\)/g) ?? [];
    const uniqueEasings = [...new Set(easingLiterals)].sort();
    const nonVocabularyEasings = uniqueEasings.filter(
      (value) => !["cubic-bezier(0.16, 1, 0.3, 1)", "cubic-bezier(0.2, 0, 0, 1)"].includes(value),
    );
    if (nonVocabularyEasings.length > 0) {
      warn(
        `design-systems/${slug}/preview-template.html`,
        `uses one-off easing curve(s): ${nonVocabularyEasings.join(", ")}. Prefer animation-patterns.md timing tokens unless DESIGN.md documents brand-specific motion.`,
      );
    }
  }
}

for (const warning of warnings) console.warn(`WARN · ${warning}`);

if (failures.length === 0) {
  const suffix = warnings.length === 0 ? "" : ` (${warnings.length} warning(s))`;
  console.log(`OK · authoring contracts pass${suffix}`);
  process.exit(0);
}

for (const failure of failures) console.error(`FAIL · ${failure}`);
console.error(`---\n${failures.length} authoring contract issue(s)`);
process.exit(1);
