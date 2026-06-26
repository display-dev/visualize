#!/usr/bin/env node
// bin/transform.mjs — mirror canonical `visualize/` to the three distribution
// channels (skills, hermes, pi), substituting placeholders per-mirror.
//
// Provider-factory architecture: createTransformer(config) returns a transform
// function with per-mirror config baked into the closure. Phase 1 keeps all
// three mirrors identical; per-mirror differentiation grows the
// PROVIDER_PLACEHOLDERS values and (in Phase 2) the per-mirror frontmatter
// selection when a channel's actual conventions surface.
//
// Usage:
//   node bin/transform.mjs                          # write resolved mirrors
//   node bin/transform.mjs --check                  # CI gate: exit 1 on drift
//   node bin/transform.mjs --output-root <path>     # write to alternate root
//                                                   #   (for side-by-side
//                                                   #    byte-equivalence)
//
// Substitution applies to .md / .html files only; everything else is
// byte-copied. File mode is preserved per file via chmodSync. Stale-file
// cleanup is per-mirror — files present in the mirror but absent from
// canonical are deleted in write mode and reported as failure in --check.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync, rmSync, chmodSync } from 'node:fs';
import { join, dirname, relative, resolve, sep, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

// =============================================================================
// Tables
// =============================================================================

// Frontmatter field set the canonical visualize/SKILL.md is expected to carry,
// in canonical order. Phase 1 byte-preserves canonical frontmatter to every
// mirror (no FIELD_SPECS rewriting), so this list backs an exact-set
// assertion only — no per-mirror selection, no YAML rewrite. The full
// FIELD_SPECS machinery + per-mirror frontmatterFields land in Phase 2
// alongside the first mirror that actually diverges.
const EXPECTED_FRONTMATTER_FIELDS = [
  'name',
  'version',
  'license',
  'user-invocable',
  'argument-hint',
  'allowed-tools',
  'description',
];

// Per-provider placeholder values. All three identical in Phase 1 (per Q4 of
// the design grill); the table structure makes per-mirror differentiation a
// one-line edit when a channel's actual conventions surface.
const PROVIDER_PLACEHOLDERS = {
  skills: {
    command_prefix: '/',
    scripts_path: '$SKILL_DIR/scripts',
    model: 'the model',
    config_file: 'AGENTS.md',
    ask_instruction: 'ask the user directly to clarify what you cannot infer.',
  },
  hermes: {
    command_prefix: '/',
    scripts_path: '$SKILL_DIR/scripts',
    model: 'the model',
    config_file: 'AGENTS.md',
    ask_instruction: 'ask the user directly to clarify what you cannot infer.',
  },
  pi: {
    command_prefix: '/',
    scripts_path: '$SKILL_DIR/scripts',
    model: 'the model',
    config_file: 'AGENTS.md',
    ask_instruction: 'ask the user directly to clarify what you cannot infer.',
  },
};

// Per-mirror config: provider (keys PROVIDER_PLACEHOLDERS), path (mirror
// output root, relative to outputRoot), displayName (CLI output).
const MIRRORS = [
  { provider: 'skills', path: 'skills/visualize',          displayName: 'npm skills' },
  { provider: 'hermes', path: 'hermes/design/visualize',   displayName: 'Hermes' },
  { provider: 'pi',     path: 'pi/agent/skills/visualize', displayName: 'Pi' },
];

// Substitution is scoped to authoring formats — .md and .html. Everything
// else (scripts, fonts, images) is byte-copied untouched.
const TEXT_EXTENSIONS_FOR_SUBSTITUTION = new Set(['.md', '.html']);

// Single regex pass across all five placeholders. The PLACEHOLDER_KEYS list
// is the source of truth — adding a new placeholder is one entry per provider
// in PROVIDER_PLACEHOLDERS plus appending the key here.
const PLACEHOLDER_KEYS = ['command_prefix', 'scripts_path', 'model', 'config_file', 'ask_instruction'];
const PLACEHOLDER_REGEX = new RegExp(`\\{\\{(${PLACEHOLDER_KEYS.join('|')})\\}\\}`, 'g');

// =============================================================================
// Paths
// =============================================================================

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CANONICAL = join(ROOT, 'visualize');

// =============================================================================
// Filesystem helpers
// =============================================================================

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function shouldSubstitute(path) {
  const dot = path.lastIndexOf('.');
  if (dot === -1) return false;
  return TEXT_EXTENSIONS_FOR_SUBSTITUTION.has(path.slice(dot));
}

function listFiles(dir) {
  if (!existsSync(dir)) return new Set();
  const files = new Set();
  for (const f of walk(dir)) files.add(relative(dir, f));
  return files;
}

// =============================================================================
// Substitution
// =============================================================================

function replacePlaceholders(content, providerKey) {
  const placeholders = PROVIDER_PLACEHOLDERS[providerKey];
  if (!placeholders) {
    throw new Error(`Unknown provider: ${providerKey}`);
  }
  return content.replace(PLACEHOLDER_REGEX, (_match, key) => placeholders[key]);
}

// =============================================================================
// Invariants
// =============================================================================

// Asserts no unresolved {{...}} remains in resolved output. Lives on the
// shared resolve/write path (not just --check) so `{{typo}}` in canonical
// fails the write before bad bytes ever land in mirrors.
function assertNoUnresolvedPlaceholders(content, relPath) {
  const match = content.match(/\{\{[^}]*\}\}/);
  if (match) {
    throw new Error(`Unresolved placeholder in ${relPath}: ${match[0]} (at byte index ${match.index})`);
  }
}

// Extracts top-level YAML frontmatter field names (in document order) from
// SKILL.md content. Doesn't parse values — only field-name extraction
// matters for the field-set assertion. Top-level = column-0 `key:` lines
// (indented continuation lines like `  - Bash(...)` are skipped).
function extractFrontmatterFieldNames(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    throw new Error('SKILL.md is missing YAML frontmatter');
  }
  const fields = [];
  for (const line of match[1].split(/\r?\n/)) {
    const fieldMatch = line.match(/^([a-zA-Z][a-zA-Z0-9_-]*):/);
    if (fieldMatch) {
      fields.push(fieldMatch[1]);
    }
  }
  return fields;
}

// Asserts the resolved SKILL.md frontmatter has the exact field set
// EXPECTED_FRONTMATTER_FIELDS — no missing, no extras. Set-equality only;
// reordering and YAML formatting drift are caught by --check's
// byte-equivalence comparison.
function assertExpectedFrontmatterFields(content, label) {
  const actual = new Set(extractFrontmatterFieldNames(content));
  const expected = new Set(EXPECTED_FRONTMATTER_FIELDS);

  const missing = [...expected].filter((f) => !actual.has(f));
  const extras = [...actual].filter((f) => !expected.has(f));

  if (missing.length || extras.length) {
    const parts = [];
    if (missing.length) parts.push(`missing: ${missing.join(', ')}`);
    if (extras.length) parts.push(`extras: ${extras.join(', ')}`);
    throw new Error(`${label} frontmatter field-set drift — ${parts.join('; ')}`);
  }
}

// Asserts the argument-hint frontmatter field on canonical SKILL.md lists
// the same verb set as the Commands table in the body. Catches the case
// where someone adds a verb to the table but forgets to update the hint
// (or vice versa). Runs once in --check before the mirror loop.
function assertArgumentHintFresh(canonicalContent) {
  const fmMatch = canonicalContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!fmMatch) {
    throw new Error('Canonical SKILL.md is missing YAML frontmatter');
  }
  const hintMatch = fmMatch[1].match(/^argument-hint:\s*"?\[([^\]]+)\]/m);
  if (!hintMatch) {
    throw new Error('Canonical SKILL.md is missing argument-hint frontmatter field (or shape mismatch)');
  }
  const hintVerbs = hintMatch[1].split('|').map((s) => s.trim()).filter(Boolean);

  // Commands table rows in the body have the verb in backticks in column 2.
  // Scope the scan to the section starting at "## Commands" so other tables
  // in the doc don't pollute the verb set.
  const commandsSectionMatch = canonicalContent.split(/^## Commands\b/m)[1];
  if (!commandsSectionMatch) {
    throw new Error('Canonical SKILL.md is missing "## Commands" section');
  }
  // Stop at the next H2 so we only look at rows inside the Commands section.
  const commandsSection = commandsSectionMatch.split(/^## /m)[0];
  const verbRowRegex = /^\|\s*\*?\*?[\w/ -]+\*?\*?\s*\|\s*`([a-z-]+)`\s*\|/gm;
  const tableVerbs = [];
  for (const m of commandsSection.matchAll(verbRowRegex)) {
    tableVerbs.push(m[1]);
  }
  if (!tableVerbs.length) {
    throw new Error('Canonical SKILL.md "## Commands" section has no verb rows in the expected shape');
  }

  const hintSet = new Set(hintVerbs);
  const tableSet = new Set(tableVerbs);
  const missing = [...tableSet].filter((v) => !hintSet.has(v));
  const extras = [...hintSet].filter((v) => !tableSet.has(v));

  if (missing.length || extras.length) {
    const parts = [];
    if (missing.length) parts.push(`argument-hint missing: ${missing.join(', ')}`);
    if (extras.length) parts.push(`argument-hint has extras not in table: ${extras.join(', ')}`);
    throw new Error(`Canonical SKILL.md drift between argument-hint and Commands table — ${parts.join('; ')}`);
  }
}

// =============================================================================
// Factory
// =============================================================================

/**
 * Creates a transform function for one mirror.
 *
 * @param {Object} config
 * @param {string} config.provider - keys PROVIDER_PLACEHOLDERS
 * @param {string} config.path - mirror output path (relative to outputRoot)
 * @param {string} config.displayName - shown in CLI output
 * @param {string} config.outputRoot - absolute output root
 * @param {boolean} config.checkMode - if true, compare instead of write
 * @returns {() => { displayName, mirrorPath, written, drift }} transform fn
 */
function createTransformer(config) {
  const { provider, path: mirrorPath, displayName, outputRoot, checkMode } = config;
  const mirrorDir = join(outputRoot, mirrorPath);

  return function transform() {
    const canonicalFiles = listFiles(CANONICAL);
    const mirrorFiles = listFiles(mirrorDir);

    let drift = 0;
    let written = 0;

    for (const rel of canonicalFiles) {
      const srcPath = join(CANONICAL, rel);
      const dstPath = join(mirrorDir, rel);
      const srcMode = statSync(srcPath).mode;
      const srcBuf = readFileSync(srcPath);

      let resolved;
      if (shouldSubstitute(rel)) {
        const replaced = replacePlaceholders(srcBuf.toString('utf8'), provider);
        assertNoUnresolvedPlaceholders(replaced, `${mirrorPath}/${rel}`);
        resolved = Buffer.from(replaced, 'utf8');
      } else {
        resolved = srcBuf;
      }

      if (checkMode) {
        if (!existsSync(dstPath)) {
          console.error(`missing in ${mirrorPath}: ${rel}`);
          drift++;
          continue;
        }
        const existingStat = statSync(dstPath);
        const existing = readFileSync(dstPath);
        if (!existing.equals(resolved)) {
          console.error(`drift in ${mirrorPath}: ${rel}`);
          drift++;
        } else if ((existingStat.mode & 0o777) !== (srcMode & 0o777)) {
          console.error(`mode drift in ${mirrorPath}: ${rel} (${(existingStat.mode & 0o777).toString(8)} vs ${(srcMode & 0o777).toString(8)})`);
          drift++;
        }
      } else {
        mkdirSync(dirname(dstPath), { recursive: true });
        writeFileSync(dstPath, resolved);
        chmodSync(dstPath, srcMode & 0o777);
        written++;
      }
    }

    // Stale-file cleanup: files in mirror with no canonical counterpart.
    // Write mode deletes them; --check reports as drift.
    for (const rel of mirrorFiles) {
      if (canonicalFiles.has(rel)) continue;
      const dstPath = join(mirrorDir, rel);
      if (checkMode) {
        console.error(`stale in ${mirrorPath}: ${rel}`);
        drift++;
      } else {
        rmSync(dstPath, { force: true });
      }
    }

    return { displayName, mirrorPath, written, drift };
  };
}

// =============================================================================
// CLI
// =============================================================================

function parseArgs(argv) {
  const args = { checkMode: false, outputRoot: ROOT };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--check') {
      args.checkMode = true;
    } else if (argv[i] === '--output-root') {
      const raw = argv[++i];
      if (!raw) {
        throw new Error('--output-root requires a path argument');
      }
      // Resolve relative paths against CWD so the factory contract
      // (outputRoot is absolute) holds regardless of how the CLI is invoked.
      args.outputRoot = resolve(raw);
    } else {
      throw new Error(`Unknown argument: ${argv[i]}`);
    }
  }
  // Reject output roots that point inside the canonical source tree. Writing
  // a mirror there would pollute the next mirror's walk and silently break
  // byte-equivalence. Segment-aware check: outputRoot is inside CANONICAL
  // when the relative path is '' (equal), or doesn't escape (no `../` prefix
  // and isn't a bare `..`), and isn't itself absolute (Windows-shape edge
  // case where `relative()` can return an absolute on different drives).
  const relToCanonical = relative(CANONICAL, args.outputRoot);
  const escapesCanonical = relToCanonical === '..' || relToCanonical.startsWith(`..${sep}`) || isAbsolute(relToCanonical);
  if (!escapesCanonical) {
    throw new Error(`--output-root must not point inside canonical (${CANONICAL}); got ${args.outputRoot}`);
  }
  return args;
}

function main() {
  const { checkMode, outputRoot } = parseArgs(process.argv.slice(2));

  const canonicalSkillPath = join(CANONICAL, 'SKILL.md');
  const canonicalSkillContent = readFileSync(canonicalSkillPath, 'utf8');

  // Canonical-side --check assertion: argument-hint matches Commands table.
  if (checkMode) {
    assertArgumentHintFresh(canonicalSkillContent);
  }

  let totalWritten = 0;
  let totalDrift = 0;

  for (const mirror of MIRRORS) {
    const transform = createTransformer({ ...mirror, outputRoot, checkMode });
    const result = transform();
    totalWritten += result.written;
    totalDrift += result.drift;

    if (!checkMode) {
      console.log(`✓ ${result.displayName}: ${result.written} files → ${result.mirrorPath}/`);
    }

    // Per-mirror --check assertion: resolved frontmatter has the exact
    // expected field set. Skip on first-run (no committed mirror yet);
    // the byte-equivalence loop above will have already reported the
    // missing-files drift.
    if (checkMode) {
      const mirrorSkillPath = join(outputRoot, mirror.path, 'SKILL.md');
      if (existsSync(mirrorSkillPath)) {
        const mirrorContent = readFileSync(mirrorSkillPath, 'utf8');
        assertExpectedFrontmatterFields(mirrorContent, mirror.path);
      }
    }
  }

  if (checkMode) {
    if (totalDrift) {
      console.error('');
      console.error('Mirror drift detected. Run `bin/transform.mjs` (no --check) to regenerate.');
      process.exit(1);
    }
    console.log(`OK · ${MIRRORS.length} mirrors match canonical (resolved)`);
  } else {
    console.log(`Wrote ${totalWritten} files across ${MIRRORS.length} mirrors (placeholders resolved per-mirror)`);
  }
}

try {
  main();
} catch (err) {
  console.error(`error: ${err.message}`);
  process.exit(1);
}
