#!/usr/bin/env node
// Validates every design-systems/<name>/ entry against the Stitch-aligned
// schema floor: required frontmatter keys in DESIGN.md and required CSS
// custom properties in tokens.css.
//
// Exit non-zero if any entry has gaps. Used by CI and as a pre-flight check
// after hand-authoring.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'visualize', 'design-systems');

const REQUIRED_FRONTMATTER = ['name', 'canonical-canvas', 'selection'];
const LIVE_BRAND_REQUIRED = ['slug', 'name', 'source', 'verified-at', 'verified-urls', 'canonical-canvas', 'selection'];

const REQUIRED_TOKENS = [
  '--background', '--foreground',
  '--card', '--card-foreground',
  '--popover', '--popover-foreground',
  '--primary', '--primary-foreground',
  '--secondary', '--secondary-foreground',
  '--muted', '--muted-foreground',
  '--accent', '--accent-foreground',
  '--destructive', '--destructive-foreground',
  '--border', '--input', '--ring',
  '--font-sans', '--font-mono',
];

function readFrontmatterRaw(content) {
  const match = String(content).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error('No YAML frontmatter found (expected leading --- block)');
  return match[1];
}

function hasTopLevelKey(raw, key) {
  return new RegExp(`^${key}:`, 'm').test(raw);
}

function topLevelValue(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : null;
}

function checkDesign(slug, designPath) {
  const issues = [];
  if (!existsSync(designPath)) {
    return [`missing DESIGN.md`];
  }
  let raw;
  try {
    raw = readFrontmatterRaw(readFileSync(designPath, 'utf8'));
  } catch (e) {
    return [`frontmatter parse error: ${e.message}`];
  }
  for (const key of REQUIRED_FRONTMATTER) {
    if (!hasTopLevelKey(raw, key)) {
      issues.push(`missing frontmatter key: ${key}`);
    }
  }
  const source = topLevelValue(raw, 'source');
  const isBrandStyle = slug.endsWith('-style');
  if (isBrandStyle) {
    if (source !== 'live-verified') {
      issues.push(`brand-style source must be live-verified`);
    }
    for (const key of LIVE_BRAND_REQUIRED) {
      if (!hasTopLevelKey(raw, key)) {
        issues.push(`missing live-verified metadata key: ${key}`);
      }
    }
  }
  return issues;
}

function checkTokens(tokensPath) {
  if (!existsSync(tokensPath)) {
    return [`missing tokens.css`];
  }
  const css = readFileSync(tokensPath, 'utf8');
  const missing = REQUIRED_TOKENS.filter((t) => !new RegExp(`(^|\\s)\\${t}\\s*:`).test(css));
  // [data-theme="dark"] block must exist.
  const issues = [];
  if (missing.length > 0) issues.push(`missing CSS tokens: ${missing.join(', ')}`);
  if (!/\[data-theme="dark"\]\s*\{/.test(css)) issues.push(`missing [data-theme="dark"] block`);
  if (!/@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)/.test(css)) issues.push(`missing @media (prefers-color-scheme: dark) block`);
  return issues;
}

const dirs = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .filter((d) => d.name !== '_template')
  .map((d) => d.name)
  .sort();

let failed = 0;
const results = [];
for (const slug of dirs) {
  const designPath = join(ROOT, slug, 'DESIGN.md');
  const tokensPath = join(ROOT, slug, 'tokens.css');
  const designIssues = checkDesign(slug, designPath);
  const tokensIssues = checkTokens(tokensPath);
  const all = [...designIssues, ...tokensIssues];
  if (all.length > 0) {
    failed++;
    results.push({ slug, issues: all });
  }
}

if (failed === 0) {
  process.stdout.write(`OK · ${dirs.length} design systems pass schema check\n`);
  process.exit(0);
}

for (const { slug, issues } of results) {
  process.stderr.write(`FAIL · ${slug}\n`);
  for (const issue of issues) process.stderr.write(`  - ${issue}\n`);
}
process.stderr.write(`---\n${failed}/${dirs.length} systems failed schema check\n`);
process.exit(1);
