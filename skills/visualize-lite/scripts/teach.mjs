#!/usr/bin/env node
// Codebase sniffer for the visualize brand profile.
//
// Walks the current directory (or an argument-provided project root) for
// design signals — Tailwind config, theme file, package.json metadata,
// favicon / logo paths — and emits a JSON object that the
// /visualize:teach prompt pre-populates into the brand-profile interview.
// The agent then asks the user for any missing fields and writes
// DESIGN.md + PRODUCT.md to the project root.
//
// Usage:
//   node teach.mjs [--json] [project-root]
//
// Output:
//   JSON to stdout. Empty strings / nulls on absence; never throws on
//   missing files — every field is best-effort sniff.

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function parseArgs(argv) {
  let projectRoot = '';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') continue;
    if (arg === '--') {
      if (argv[i + 1]) projectRoot = argv[i + 1];
      break;
    }
    if (arg.startsWith('--')) continue;
    if (!projectRoot) projectRoot = arg;
  }

  return {
    root: resolve(projectRoot || process.cwd()),
  };
}

const { root } = parseArgs(process.argv.slice(2));

function firstHit(candidates) {
  for (const rel of candidates) {
    if (existsSync(resolve(root, rel))) return rel;
  }
  return '';
}

function allHits(candidates) {
  return candidates.filter((rel) => existsSync(resolve(root, rel)));
}

// --- package.json --------------------------------------------------------
let pkg = {};
const pkgPath = resolve(root, 'package.json');
if (existsSync(pkgPath)) {
  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  } catch {
    pkg = {};
  }
}

const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
let framework = 'unknown';
if (deps.next) framework = 'next';
else if (deps.astro) framework = 'astro';
else if (deps['@remix-run/react']) framework = 'remix';
else if (deps.vite) framework = 'vite';
else if (deps.gatsby) framework = 'gatsby';
else if (deps['@sveltejs/kit']) framework = 'sveltekit';

const repository = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository?.url ?? '';

// --- Signals -------------------------------------------------------------
const tailwindConfig = firstHit([
  'tailwind.config.ts',
  'tailwind.config.js',
  'tailwind.config.mjs',
  'tailwind.config.cjs',
]);

const themeFiles = allHits([
  'theme.ts',
  'theme.js',
  'src/theme.ts',
  'src/theme.js',
  'styles/theme.ts',
  'app/globals.css',
  'styles/globals.css',
  'src/styles/globals.css',
]);

const logo = firstHit([
  'public/logo.svg',
  'public/logo.png',
  'assets/logo.svg',
  'assets/logo.png',
  'src/assets/logo.svg',
]);

const favicon = firstHit([
  'app/icon.svg',
  'app/icon.png',
  'app/favicon.ico',
  'public/favicon.svg',
  'public/favicon.png',
  'public/favicon.ico',
]);

// --- Existing brand profile ---------------------------------------------
const profilePresent = {
  design: existsSync(resolve(root, 'DESIGN.md')),
  product: existsSync(resolve(root, 'PRODUCT.md')),
};

// --- Emit JSON -----------------------------------------------------------
const out = {
  schemaVersion: 1,
  projectRoot: root,
  package: {
    name: pkg.name ?? '',
    homepage: pkg.homepage ?? '',
    repository,
    framework,
  },
  signals: {
    tailwindConfig,
    themeFiles,
    logo,
    favicon,
  },
  profilePresent,
};

process.stdout.write(JSON.stringify(out, null, 2) + '\n');
