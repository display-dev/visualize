#!/usr/bin/env node
// _import-common.mjs — frontmatter and token helpers.
//
// Used by ../scripts/detect.mjs and schema checks for catalog DESIGN.md
// frontmatter parsing. Kept here rather than inlined because the parser is
// narrowly tuned to the catalog's frontmatter shape and not worth duplicating.
//
// Self-contained Node script. Colour conversion delegates to the
// vendored culori at ../scripts/vendor/culori.mjs (MIT, 4.0.2).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parse as parseColor, converter } from '../scripts/vendor/culori.mjs';

const toOklch = converter('oklch');

// ============================================================
// Slug derivation
// ============================================================

// claude → claude-style (the nominative-use slug carrier).
export function brandToSlug(brand) {
  const base = String(brand).toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (!base) throw new Error(`Empty slug derived from brand: ${brand}`);
  return base.endsWith('-style') ? base : `${base}-style`;
}

// Extract the brand portion from a legacy `name:` frontmatter field.
// Convention: `<Brand>-design-analysis` or `<Brand>-Inspired-design-analysis`.
// Returns null if the input doesn't look like a brand-bearing name.
export function extractBrandFromUpstreamName(name) {
  if (!name || typeof name !== 'string') return null;
  const cleaned = name
    .replace(/-Inspired-design-analysis$/i, '')
    .replace(/-design-analysis$/i, '')
    .replace(/-design-system$/i, '')
    .trim();
  return cleaned || null;
}

// claude → Claude-style. Prefer source-name casing when available so
// IBM / BMW-M / PlayStation / RunwayML don't collapse to title-case.
export function brandToDisplayName(brand, upstreamName = null) {
  return `${brandToReference(brand, upstreamName)}-style`;
}

// claude → Claude. Prefer source `name:` casing when the lowercased
// source brand matches the path-derived brand (preserves IBM /
// RunwayML / PlayStation / BMW-M casing). When they disagree
// (e.g. source `Stripi-...` vs path `stripe/`), trust the path —
// source typos shouldn't propagate into our slug + display name.
export function brandToReference(brand, upstreamName = null) {
  const cleaned = String(brand).trim();
  const upstreamBrand = extractBrandFromUpstreamName(upstreamName);
  if (upstreamBrand && upstreamBrand.toLowerCase() === cleaned.toLowerCase()) {
    return upstreamBrand;
  }
  // Title-case the path; hyphenated brands keep the hyphen.
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

// ============================================================
// HEX → OKLCH conversion (via vendored culori)
// ============================================================

// Parse any CSS colour string (hex / rgb / rgba / hsl / oklch / named)
// to OKLCH. Preserves alpha when source is non-opaque.
export function hexToOklch(input) {
  const parsed = parseColor(String(input).trim());
  if (!parsed) throw new Error(`Bad colour: ${input}`);
  const c = toOklch(parsed);
  const result = { L: c.l, C: c.c, H: c.c < 0.0001 || c.h === undefined ? 0 : c.h };
  if (parsed.alpha !== undefined && parsed.alpha < 1) result.alpha = parsed.alpha;
  return result;
}

// Format OKLCH matching clean/tokens.css convention:
//   `oklch(1 0 0)`                 — integers stay integer
//   `oklch(0.1450 0 0)`            — 4-decimal L, zero-chroma omits hue
//   `oklch(0.5770 0.2450 27.3250)` — 4-decimal L/C/H
//   `oklch(0.8100 0.1000 252)`     — integer hue stays integer
//   `oklch(0.5 0 0 / 0.5)`         — non-opaque alpha appended
function fmtComponent(n) {
  if (!Number.isFinite(n)) return '0';
  const fixed = n.toFixed(4);
  return /\.0000$/.test(fixed) ? String(Math.round(n)) : fixed;
}

export function formatOklch({ L, C, H, alpha }) {
  const Lstr = fmtComponent(L);
  const body = C < 0.0001 ? `${Lstr} 0 0` : `${Lstr} ${fmtComponent(C)} ${fmtComponent(H)}`;
  if (alpha !== undefined && alpha < 1) return `oklch(${body} / ${fmtComponent(alpha)})`;
  return `oklch(${body})`;
}

export function hexToOklchString(hex) {
  return formatOklch(hexToOklch(hex));
}

// Synthesize dark-mode counterpart by inverting OKLCH lightness while
// preserving hue + chroma (and alpha). Lossy synthesis (won't match a
// brand's actual dark-mode palette) but produces a working dark surface
// set without a TODO punt.
export function invertLightness({ L, C, H, alpha }) {
  return { L: 1 - L, C, H, ...(alpha !== undefined ? { alpha } : {}) };
}

export function invertLightnessOklchString(oklchString) {
  const m = oklchString.match(/^oklch\(\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/);
  if (!m) throw new Error(`Cannot parse OKLCH: ${oklchString}`);
  const L = parseFloat(m[1]);
  const C = parseFloat(m[2]);
  const H = parseFloat(m[3]);
  const alpha = m[4] !== undefined ? parseFloat(m[4]) : undefined;
  return formatOklch({ L: 1 - L, C, H, alpha });
}

// ============================================================
// Minimal YAML reader (narrow to catalog frontmatter shape)
// ============================================================
//
// Supports:
//   - Top-level `key: value` (string or scalar)
//   - Top-level `key:` followed by 2-space-indented nested mapping
//   - Single-line values (no block scalars)
//   - Double- and single-quoted strings (quotes stripped, escape \" handled)
//   - Comments (`# ...`) on their own line
//
// Does NOT support: arrays, flow style, anchors, multi-line values,
// merge keys, custom tags. None of those appear in current catalog frontmatter — vendor a real parser if shapes grow.

export function parseFrontmatter(content) {
  const m = String(content).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('No YAML frontmatter found (expected leading --- block)');
  return { data: parseYaml(m[1]), body: m[2] };
}

function parseYaml(text) {
  const root = {};
  const stack = [{ obj: root, indent: -1 }];
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (/^\s*$/.test(raw)) continue;
    if (/^\s*#/.test(raw)) continue;

    const indent = (raw.match(/^(\s*)/)[1] || '').length;
    const line = raw.slice(indent);
    const colon = line.indexOf(':');
    if (colon < 0) throw new Error(`YAML line ${i + 1}: missing colon — ${raw}`);

    const key = line.slice(0, colon).trim();
    const rest = line.slice(colon + 1).trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;

    // Block scalar (`|`, `>`, with optional chomping `-`/`+`).
    // Some DESIGN.md files use `description: |` followed by
    // indented prose — silently parsing those as `"|"` would corrupt the
    // brand description, so explicit support is required.
    if (/^[|>][+-]?$/.test(rest)) {
      const folded = rest.startsWith('>');
      const strip = rest.includes('-');     // `-` = strip final newline; default keeps one.
      const blockLines = [];
      let blockIndent = -1;
      while (i + 1 < lines.length) {
        const next = lines[i + 1];
        if (/^\s*$/.test(next)) { blockLines.push(''); i++; continue; }
        const nextIndent = (next.match(/^(\s*)/)[1] || '').length;
        if (nextIndent <= indent) break;
        if (blockIndent < 0) blockIndent = nextIndent;
        blockLines.push(next.slice(blockIndent));
        i++;
      }
      // Drop trailing blank lines (they're not part of the block content).
      while (blockLines.length > 0 && blockLines[blockLines.length - 1] === '') blockLines.pop();
      let value;
      if (folded) {
        value = blockLines.join(' ').replace(/\s+/g, ' ').trim();
      } else {
        value = blockLines.join('\n');
        if (!strip) value += '\n';
      }
      parent[key] = value;
      continue;
    }

    if (rest === '') {
      const child = {};
      parent[key] = child;
      stack.push({ obj: child, indent });
    } else {
      parent[key] = parseScalar(rest);
    }
  }
  return root;
}

function parseScalar(raw) {
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  return raw;
}

// ============================================================
// YAML writer (matches clean/ DESIGN.md frontmatter shape)
// ============================================================

export function emitFrontmatter(data, body = '') {
  const yaml = emitMapping(data, 0);
  const bodyOut = body ? (body.startsWith('\n') ? body : '\n' + body) : '\n';
  return `---\n${yaml}---${bodyOut}`;
}

function emitMapping(obj, indent) {
  const pad = '  '.repeat(indent);
  let out = '';
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) {
      out += `${pad}${k}: null\n`;
      continue;
    }
    if (typeof v === 'object' && !Array.isArray(v)) {
      // Empty mapping → emit `key: {}` so the round-trip is honest.
      if (Object.keys(v).length === 0) {
        out += `${pad}${k}: {}\n`;
        continue;
      }
      out += `${pad}${k}:\n${emitMapping(v, indent + 1)}`;
      continue;
    }
    // Multi-line strings → folded block scalar (`>-`). The simple quoted-scalar
    // shape would embed literal newlines that parseFrontmatter can't read back.
    if (typeof v === 'string' && v.includes('\n')) {
      const childPad = '  '.repeat(indent + 1);
      const trimmed = v.replace(/\n+$/, '');
      out += `${pad}${k}: >-\n`;
      for (const line of trimmed.split('\n')) {
        out += `${childPad}${line}\n`;
      }
      continue;
    }
    out += `${pad}${k}: ${formatYamlScalar(v)}\n`;
  }
  return out;
}

function formatYamlScalar(v) {
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  const s = String(v);
  // Plain numeric (with optional unit suffix) — unquoted.
  if (/^-?\d+(\.\d+)?([a-z%]+)?$/i.test(s)) return s;
  // Identifier-like (no special chars) — unquoted.
  if (/^[A-Za-z_][A-Za-z0-9_-]*$/.test(s)) return s;
  // Everything else (hex, oklch, prose with punctuation, etc.) — double-quoted.
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

// ============================================================
// NOTICES.md upsert (idempotent, sorted, deduped)
// ============================================================

const NOTICES_HEADER = `# Third-party design-system attributions

Design systems under \`visualize/design-systems/<name>-style/\` are derived
from third-party sources. Per-entry attribution lives in each DESIGN.md
\`source:\` block; repository-level license notices are collected here.

## Brand reference

Design systems with a \`-style\` suffix (\`stripe-style\`, \`figma-style\`, …) are
independent reference implementations inspired by the public visual language
of well-known brands. They are not affiliated with, endorsed by, or
representative of the named companies. All brand names and trademarks remain
the property of their respective owners.
`;

// Per-source section templates. The script appends only the section
// being inserted into on first write — avoids stale dated claims about
// sources that have no entries yet.
const NOTICES_SECTIONS = {
  'nexu-io/open-design (Apache-2.0)': `
## nexu-io/open-design (Apache-2.0)

Repository: https://github.com/nexu-io/open-design
License: Apache-2.0

No NOTICE file present in upstream (verified at first OD import); §4(b)
is satisfied by per-file copyright preservation and per-file
modification markers in each DESIGN.md frontmatter.

Derived design systems:
`,
};

// Insert `slug` into the "Derived design systems:" list under `sectionHeader`.
// Creates NOTICES.md (with only the requested section's template) if the file
// doesn't exist. Appends the section template if the file exists but the
// section is missing. Returns whether the entry was already present.
export function upsertNotices(noticesPath, sectionHeader, slug) {
  const template = NOTICES_SECTIONS[sectionHeader];
  if (!template) throw new Error(`Unknown NOTICES section: ${sectionHeader}`);

  let body = existsSync(noticesPath) ? readFileSync(noticesPath, 'utf8') : NOTICES_HEADER;

  const headerLine = `## ${sectionHeader}`;
  if (!new RegExp(`^${escapeRegex(headerLine)}$`, 'm').test(body)) {
    body = body.replace(/\n*$/, '\n') + template;
  }

  // Section bounds: line-anchored to avoid matching `## ` strings in prose.
  const headerMatch = body.match(new RegExp(`^${escapeRegex(headerLine)}$`, 'm'));
  const sectionStart = headerMatch.index;
  const afterHeader = sectionStart + headerLine.length;
  const nextHeaderMatch = body.slice(afterHeader).match(/^## /m);
  const sectionEnd = nextHeaderMatch ? afterHeader + nextHeaderMatch.index : body.length;
  let section = body.slice(sectionStart, sectionEnd);

  const listMarker = 'Derived design systems:';
  const markerIdx = section.indexOf(listMarker);
  if (markerIdx < 0) throw new Error(`"Derived design systems:" marker missing in section ${sectionHeader}`);
  const afterMarker = markerIdx + listMarker.length;

  // Collect all existing `- ` items inside the section.
  const restOfSection = section.slice(afterMarker);
  const items = [...restOfSection.matchAll(/^- (.+)$/gm)].map((m) => m[1].trim());

  const alreadyPresent = items.includes(slug);
  if (!alreadyPresent) items.push(slug);
  items.sort();
  const uniq = [...new Set(items)];

  // The "list region" ends at the end of the last `- ` line; if there are no
  // items yet, the region collapses to just the marker (no chars to replace).
  let listEnd = afterMarker;
  let lastItem = null;
  for (const m of restOfSection.matchAll(/^- .+$/gm)) lastItem = m;
  if (lastItem) listEnd = afterMarker + lastItem.index + lastItem[0].length;

  const newListBlock = '\n' + uniq.map((s) => `- ${s}`).join('\n');
  section = section.slice(0, afterMarker) + newListBlock + section.slice(listEnd);

  const newBody = body.slice(0, sectionStart) + section + body.slice(sectionEnd);
  writeFileSync(noticesPath, newBody);
  return { alreadyPresent, total: uniq.length };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================================
// Review block printer
// ============================================================

export function printReview(stream, fields) {
  const w = (s) => stream.write(s + '\n');
  w('');
  w('Review:');
  for (const [k, v] of Object.entries(fields)) {
    if (v === null || v === undefined) continue;
    if (typeof v === 'string' && v.includes('\n')) {
      w(`  ${k}:`);
      for (const line of v.split('\n')) w(`    ${line}`);
    } else {
      w(`  ${k}: ${v}`);
    }
  }
  w('');
}

// ============================================================
// CLI arg parsing
// ============================================================

export function parseArgs(argv) {
  const args = { positional: [], force: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') args.force = true;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '-h' || a === '--help') args.help = true;
    else if (a.startsWith('--')) throw new Error(`Unknown flag: ${a}`);
    else args.positional.push(a);
  }
  return args;
}
