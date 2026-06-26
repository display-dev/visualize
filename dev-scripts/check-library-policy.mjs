#!/usr/bin/env node
// Library / CDN policy enforcer.
//
// Walks every fixture HTML file under visualize/fixtures/,
// visualize/preview-kit/template.html, and per-system preview-template.html
// and validates that any `<script src="…">` reference matches the
// allowlist defined below. Anything outside the allowlist fails the
// check.
//
// Generated `design-systems/<ds>/preview*.html` files inherit script refs
// from either preview-kit/template.html or a per-system preview-template.html.
// Build-previews freshness keeps generated copies in sync, so scanning the
// source templates is enough.
//
// Allowlist (spec § "Appendix: library and CDN policy"):
//   - cdn.jsdelivr.net/npm/mermaid@<version>
//   - cdn.jsdelivr.net/npm/chart.js@<version>
//
// Inline `<script>…</script>` blocks (no src= attribute) are
// fine — those carry template-local logic (slide nav, faq accordion,
// mermaid initialise, etc.) and don't pull external bytes.
//
// Usage:
//   node check-library-policy.mjs            (exits 0 on pass, 1 on fail)
//   node check-library-policy.mjs --quiet    (suppresses per-file PASS lines)

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const VIS_ROOT = resolve(SCRIPT_DIR, '..', 'visualize');
const FIXTURES_DIR = resolve(VIS_ROOT, 'fixtures');
const PREVIEW_KIT_TEMPLATE = resolve(VIS_ROOT, 'preview-kit', 'template.html');
const DESIGN_SYSTEMS_DIR = resolve(VIS_ROOT, 'design-systems');

const ALLOWLIST = [
  /^https:\/\/cdn\.jsdelivr\.net\/npm\/mermaid@[\w.\-]+\/[\w./\-]+$/,
  /^https:\/\/cdn\.jsdelivr\.net\/npm\/chart\.js@[\w.\-]+\/[\w./\-]+$/,
];

const SRC_RE = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g;
const quiet = process.argv.includes('--quiet');

function walkHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkHtml(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const files = existsSync(FIXTURES_DIR) ? walkHtml(FIXTURES_DIR) : [];
if (existsSync(PREVIEW_KIT_TEMPLATE)) {
  files.push(PREVIEW_KIT_TEMPLATE);
}
if (existsSync(DESIGN_SYSTEMS_DIR)) {
  for (const dirent of readdirSync(DESIGN_SYSTEMS_DIR, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    const template = join(DESIGN_SYSTEMS_DIR, dirent.name, 'preview-template.html');
    if (existsSync(template)) files.push(template);
  }
}
const violations = [];

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const refs = [...text.matchAll(SRC_RE)].map((m) => m[1]);
  const externalRefs = refs.filter((url) => /^https?:\/\//.test(url));
  const offending = externalRefs.filter((url) => !ALLOWLIST.some((re) => re.test(url)));
  const rel = file.replace(`${resolve(SCRIPT_DIR, '..')}/`, '');
  if (offending.length > 0) {
    violations.push({ file: rel, refs: offending });
  } else if (!quiet) {
    if (refs.length > 0) {
      console.log(`PASS  ${rel}  (${refs.length} allowlisted script ref(s))`);
    } else {
      console.log(`PASS  ${rel}  (no script src refs)`);
    }
  }
}

if (violations.length > 0) {
  console.error('');
  console.error('LIBRARY POLICY VIOLATION:');
  for (const v of violations) {
    console.error(`  ${v.file}`);
    for (const url of v.refs) {
      console.error(`    not on allowlist: ${url}`);
    }
  }
  console.error('');
  console.error('Allowlist (per spec § "Appendix: library and CDN policy"):');
  console.error('  cdn.jsdelivr.net/npm/mermaid@<version>');
  console.error('  cdn.jsdelivr.net/npm/chart.js@<version>');
  console.error('');
  console.error('Adding a library requires updating ALLOWLIST in this script');
  console.error('AND the policy appendix in the same change.');
  process.exit(1);
}

if (!quiet) {
  console.log('');
}
console.log(`OK · checked ${files.length} fixture/preview file(s); ${violations.length} violation(s)`);
