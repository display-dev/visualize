#!/usr/bin/env node
// catalog-index.mjs — generate / validate design-system selection metadata.
//
// Usage:
//   node dev-scripts/catalog-index.mjs
//   node dev-scripts/catalog-index.mjs --check
//   node dev-scripts/catalog-index.mjs --write-metadata
//   node dev-scripts/catalog-index.mjs --refresh-metadata

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const REPO_ROOT = dirname(dirname(__filename));
const DESIGN_ROOT = join(REPO_ROOT, 'visualize', 'design-systems');
const BUILD_PREVIEWS = join(REPO_ROOT, 'dev-scripts', 'build-previews.sh');
const OUT_PATH = join(DESIGN_ROOT, 'catalog-index.json');

const FORMALITY = new Set(['low', 'medium', 'high']);
const DENSITY = new Set(['low', 'medium', 'high']);
const CANONICAL_CANVAS = new Set(['light', 'dark', 'both']);
const MOOD = new Set([
  'austere',
  'automotive',
  'brand-system',
  'cinematic',
  'command-line',
  'commerce',
  'cyberpunk',
  'data-rich',
  'developer',
  'editorial',
  'enterprise',
  'gradient',
  'high-contrast',
  'industrial',
  'luxury',
  'minimal',
  'monochrome',
  'organic',
  'playful',
  'productivity',
  'retro-tech',
  'spatial',
  'tactile',
  'technical',
]);
const TONE = new Set([
  'authoritative',
  'bold',
  'calm',
  'confident',
  'dramatic',
  'energetic',
  'experimental',
  'fast',
  'friendly',
  'irreverent',
  'optimistic',
  'polished',
  'pragmatic',
  'precise',
  'premium',
  'serious',
  'utilitarian',
  'warm',
]);

const USAGE = {
  selection: 'Read this file first to shortlist reference design systems by mood / density / canonical_canvas.',
  teach: 'Use the shortlisted systems as reference packages for brand derivation; never present them as a user-facing theme menu.',
  previews: "After shortlisting, use each candidate's README.md for package navigation and preview links.",
  full_read: 'Read DESIGN.md and tokens.css for each reference you apply or render in a comparison; do not load every package.',
};

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  const valid = new Set(['--check', '--write-metadata', '--refresh-metadata', '--help', '-h']);
  for (const arg of args) {
    if (!valid.has(arg)) throw new Error(`unknown argument: ${arg}`);
  }
  return {
    check: args.has('--check'),
    writeMetadata: args.has('--write-metadata'),
    refreshMetadata: args.has('--refresh-metadata'),
    help: args.has('--help') || args.has('-h'),
  };
}

function printUsage() {
  console.log(`usage:
  node dev-scripts/catalog-index.mjs
  node dev-scripts/catalog-index.mjs --check
  node dev-scripts/catalog-index.mjs --write-metadata
  node dev-scripts/catalog-index.mjs --refresh-metadata`);
}

function designSystemsFromBuildScript() {
  const text = readFileSync(BUILD_PREVIEWS, 'utf8');
  const match = text.match(/DESIGN_SYSTEMS=\(([^)]+)\)/s);
  if (!match) throw new Error('could not find DESIGN_SYSTEMS=(...) in build-previews.sh');
  return match[1].trim().split(/\s+/).sort();
}

function parseFrontmatter(text, filePath) {
  if (!text.startsWith('---\n')) throw new Error(`${filePath}: missing YAML frontmatter`);
  const end = text.indexOf('\n---', 4);
  if (end === -1) throw new Error(`${filePath}: unterminated YAML frontmatter`);
  return { raw: text.slice(4, end), body: text.slice(end + 4) };
}

function scalar(value) {
  const trimmed = String(value || '').trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function firstTopLevel(raw, key) {
  const lines = raw.split('\n');
  const start = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (start === -1) return null;
  const first = lines[start].slice(key.length + 1).trim();
  if (first === '|-' || first === '|' || first === '>-' || first === '>') {
    const block = [];
    for (let i = start + 1; i < lines.length; i += 1) {
      if (!lines[i].startsWith('  ')) break;
      block.push(lines[i].trim());
    }
    return block.join(' ');
  }
  return scalar(first);
}

function parseSelection(raw) {
  const lines = raw.split('\n');
  const start = lines.findIndex((line) => line.trim() === 'selection:');
  if (start === -1) return null;
  const selection = {};
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === '') continue;
    if (!line.startsWith('  ')) break;
    const match = line.match(/^  ([a-z_]+):(?:\s+(.*))?$/);
    if (!match) continue;
    const [, key, rawValue = ''] = match;
    const value = rawValue.trim();
    if (value === '|') {
      const block = [];
      for (i += 1; i < lines.length; i += 1) {
        if (!lines[i].startsWith('    ')) {
          i -= 1;
          break;
        }
        block.push(lines[i].slice(4));
      }
      selection[key] = block.join('\n').trim();
    } else if (value.startsWith('[')) {
      const inner = value.replace(/^\[/, '').replace(/\]$/, '').trim();
      selection[key] = inner ? inner.split(',').map((item) => scalar(item)) : [];
    } else {
      selection[key] = scalar(value);
    }
  }
  return selection;
}

function formatSelection(selection) {
  return [
    'selection:',
    `  mood: [${selection.mood.join(', ')}]`,
    `  tone: [${selection.tone.join(', ')}]`,
    `  formality: ${selection.formality}`,
    `  density: ${selection.density}`,
    `  canonical_canvas: ${selection.canonical_canvas}`,
    '  best_for: |',
    `    ${selection.best_for}`,
    '  avoid_for: |',
    `    ${selection.avoid_for}`,
  ].join('\n');
}

function normalizeCanvas(value) {
  const v = scalar(value).replace(/_/g, '-');
  if (v === 'light' || v === 'dark' || v === 'both') return v;
  return null;
}

function inferCanvas(slug, text) {
  const hay = `${slug} ${text.slice(0, 3000)}`.toLowerCase();
  if (/\bcanonical-canvas:\s*(light|dark|both)\b/.test(hay)) return hay.match(/\bcanonical-canvas:\s*(light|dark|both)\b/)[1];
  if (hay.includes('both polarities') || hay.includes('dual-polarity') || hay.includes('both modes') || hay.includes('alternates between')) return 'both';
  if (hay.includes('light-canonical') || hay.includes('white canvas') || hay.includes('cream') || hay.includes('paper')) return 'light';
  if (hay.includes('dark-canonical') || hay.includes('near-black') || hay.includes('pure black') || hay.includes('dark canvas')) return 'dark';
  if (/(terminal|console|blueprint|cyber|neon|deep-red|x-ai|spotify|spacex|warp|framer|hashicorp|clickhouse)/.test(slug)) return 'dark';
  return 'light';
}

function add(set, values) {
  for (const value of values) set.add(value);
}

function inferSelection(system) {
  const text = `${system.slug} ${system.name} ${system.description}`.toLowerCase();
  const mood = new Set();
  const tone = new Set();
  let formality = 'medium';
  let density = 'medium';
  const canonical_canvas = system.inferredCanvas || system.canonicalCanvas;

  if (/\b(clean|linear|vercel|cal|resend|notion|airtable|mintlify|superhuman|monochrome)\b/.test(text)) add(mood, ['minimal', 'productivity']);
  if (/\b(github|cursor|warp|terminal|console|ide|opencode|raycast|composio|hashicorp|developer|code)\b/.test(text)) add(mood, ['developer', 'technical']);
  if (/\b(ibm|cloudflare|stripe|coinbase|mongodb|nvidia|clickhouse|posthog|sentry|supabase|shopify|wise|revolut|enterprise|financial|dashboard|data)\b/.test(text)) add(mood, ['enterprise', 'data-rich']);
  if (/\b(brutalist|raw|manifesto)\b/.test(text)) add(mood, ['high-contrast', 'industrial']);
  if (/\b(editorial|monograph|whitepaper|news-print|wired|architectural|swiss|paper|magazine|serif)\b/.test(text)) add(mood, ['editorial', 'high-contrast']);
  if (/\b(playful|clay|riso|dithered|win98|mosaic|bento|sketch|miro|figma|pinterest|geometric)\b/.test(text)) add(mood, ['playful', 'tactile']);
  if (/\b(cyber|neon|hyper|deep-red|kinetic|grunge|x-ai|velocity)\b/.test(text)) add(mood, ['cyberpunk', 'gradient']);
  if (/\b(luxury|bugatti|ferrari|bmw|renault|nike|spotify|playstation|vodafone|airbnb|fashion|automotive)\b/.test(text)) add(mood, ['brand-system', 'luxury']);
  if (/\b(nature|terracotta|warm|paper|lumina|organic|earthy)\b/.test(text)) add(mood, ['organic', 'warm']);
  if (/\b(blueprint|industrial|spacex|uber|binance|meta|expo|webflow|framer|spatial|grid)\b/.test(text)) add(mood, ['industrial', 'spatial']);
  if (/\b(terminal|console|win98|retro|command|crt|pixel|80s|90s)\b/.test(text)) add(mood, ['retro-tech', 'command-line']);
  if (/\b(black|white|monochrome|austere|minimal)\b/.test(text)) add(mood, ['monochrome']);
  if (/\b(cinematic|photo|full-bleed|film|photograph)\b/.test(text)) add(mood, ['cinematic']);
  if (/\b(commerce|shop|store|pricing|retail|marketplace)\b/.test(text)) add(mood, ['commerce']);

  if (/\b(dramatic|cinematic|luxury|bugatti|ferrari|deep-red|cyber|neon|hyper|grunge|poster|brutalist|manifesto|raw)\b/.test(text)) add(tone, ['dramatic', 'bold']);
  if (/\b(playful|clay|riso|miro|figma|pinterest|airbnb|spotify|geometric)\b/.test(text)) add(tone, ['friendly', 'optimistic']);
  if (/\b(developer|technical|terminal|console|ide|github|cursor|hashicorp|clickhouse|cloudflare|api|code)\b/.test(text)) add(tone, ['precise', 'pragmatic']);
  if (/\b(enterprise|ibm|stripe|coinbase|wise|revolut|mongodb|sentry|linear|notion|professional)\b/.test(text)) add(tone, ['confident', 'polished']);
  if (/\b(editorial|monograph|whitepaper|news-print|architectural|swiss|wired|institutional)\b/.test(text)) add(tone, ['authoritative', 'serious']);
  if (/\b(calm|clean|minimal|warm|nature|paper|terracotta|lumina|quiet)\b/.test(text)) add(tone, ['calm', 'warm']);
  if (/\b(kinetic|velocity|warp|raycast|superhuman|fast|orange|motion)\b/.test(text)) add(tone, ['energetic', 'fast']);
  if (/\b(grunge|brutalist|punk|irreverent|raw|experimental)\b/.test(text)) add(tone, ['irreverent', 'experimental']);

  if (/\b(enterprise|ibm|whitepaper|bank|wise|revolut|coinbase|hashicorp|mongodb|sentry|institutional|formal)\b/.test(text)) formality = 'high';
  if (/\b(playful|clay|riso|win98|grunge|hyper|miro|pinterest|airbnb|spotify|zine|toy)\b/.test(text)) formality = 'low';
  if (/\b(dashboard|data|table|grid|enterprise|analytics|dense|airtable|clickhouse|posthog|mongodb|notion|linear|github|console|ide)\b/.test(text)) density = 'high';
  if (/\b(luxury|brutalist|monochrome|editorial|poster|minimal|hero|cinematic|fashion|nike|bugatti|ferrari|lookbook)\b/.test(text)) density = 'low';

  if (mood.size === 0) add(mood, ['brand-system', 'technical']);
  if (tone.size === 0) add(tone, ['confident', 'polished']);

  const moodList = [...mood].filter((value) => MOOD.has(value)).slice(0, 4);
  const toneList = [...tone].filter((value) => TONE.has(value)).slice(0, 4);
  return {
    mood: moodList,
    tone: toneList,
    formality,
    density,
    canonical_canvas,
    best_for: bestFor(moodList, toneList, density, canonical_canvas),
    avoid_for: avoidFor(moodList, density, canonical_canvas),
  };
}

function bestFor(mood, tone, density, canvas) {
  const densityPhrase = density === 'high' ? 'information-dense' : density === 'low' ? 'high-impact, low-copy' : 'balanced';
  return `Use for ${densityPhrase} artifacts that need a ${tone.join(', ')} register with ${mood.join(', ')} visual cues. Strongest when the reference can preserve its ${canvas} canonical canvas instead of forcing the opposite polarity.`;
}

function avoidFor(mood, density, canvas) {
  if (density === 'low') return 'Avoid for reference-heavy reports, dense comparison tables, or artifacts where readers need many facts per screen.';
  if (density === 'high') return 'Avoid for keynote-style moments that need sparse type, cinematic pacing, or a purely emotional first read.';
  if (canvas === 'dark') return 'Avoid when the deliverable must print cleanly or live inside a mostly light product surface.';
  if (mood.includes('playful')) return 'Avoid for compliance, legal, or executive-review contexts that require restraint.';
  return 'Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.';
}

function readSystem(slug) {
  const filePath = join(DESIGN_ROOT, slug, 'DESIGN.md');
  const text = readFileSync(filePath, 'utf8');
  const fm = parseFrontmatter(text, filePath);
  const topCanvas = normalizeCanvas(firstTopLevel(fm.raw, 'canonical-canvas'));
  const rawWithoutCanvas = fm.raw
    .split('\n')
    .filter((line) => !line.startsWith('canonical-canvas:'))
    .join('\n');
  const inferredCanvas = inferCanvas(slug, `---\n${rawWithoutCanvas}\n---${fm.body}`);
  const name = firstTopLevel(fm.raw, 'name') || slug;
  const description = firstTopLevel(fm.raw, 'description') || '';
  return {
    slug,
    filePath,
    text,
    fm,
    name,
    description,
    bodySample: fm.body.slice(0, 6000),
    canonicalCanvas: topCanvas || inferredCanvas,
    inferredCanvas,
    selection: parseSelection(fm.raw),
  };
}

function insertOrReplaceSelection(system, selection) {
  let lines = system.fm.raw.split('\n');
  const canvasIdx = lines.findIndex((line) => line.startsWith('canonical-canvas:'));
  if (canvasIdx !== -1) {
    lines[canvasIdx] = `canonical-canvas: ${selection.canonical_canvas}`;
  } else {
    const colorsIdx = lines.findIndex((line) => line.startsWith('colors:'));
    const idx = colorsIdx === -1 ? lines.length : colorsIdx;
    lines = [...lines.slice(0, idx), `canonical-canvas: ${selection.canonical_canvas}`, ...lines.slice(idx)];
  }

  const start = lines.findIndex((line) => line.trim() === 'selection:');
  const block = formatSelection(selection).split('\n');
  if (start === -1) {
    const colorsIdx = lines.findIndex((line) => line.startsWith('colors:'));
    const idx = colorsIdx === -1 ? lines.length : colorsIdx;
    lines = [...lines.slice(0, idx), ...block, '', ...lines.slice(idx)];
  } else {
    let end = start + 1;
    while (end < lines.length && (lines[end].startsWith('  ') || lines[end].trim() === '')) end += 1;
    lines = [...lines.slice(0, start), ...block, '', ...lines.slice(end)];
  }

  writeFileSync(system.filePath, `---\n${lines.join('\n')}\n---${system.fm.body}`, 'utf8');
}

function validateSelection(system) {
  const errors = [];
  const s = system.selection;
  const topCanvas = normalizeCanvas(firstTopLevel(system.fm.raw, 'canonical-canvas'));
  if (!topCanvas) errors.push(`${system.slug}: missing top-level canonical-canvas`);
  if (!s) return [...errors, `${system.slug}: missing selection block`];
  for (const key of ['mood', 'tone']) {
    if (!Array.isArray(s[key]) || s[key].length < 1 || s[key].length > 4) {
      errors.push(`${system.slug}: selection.${key} must contain 1-4 tags`);
    }
  }
  for (const value of s.mood || []) if (!MOOD.has(value)) errors.push(`${system.slug}: unknown mood "${value}"`);
  for (const value of s.tone || []) if (!TONE.has(value)) errors.push(`${system.slug}: unknown tone "${value}"`);
  if (!FORMALITY.has(s.formality)) errors.push(`${system.slug}: invalid formality "${s.formality}"`);
  if (!DENSITY.has(s.density)) errors.push(`${system.slug}: invalid density "${s.density}"`);
  if (!CANONICAL_CANVAS.has(s.canonical_canvas)) errors.push(`${system.slug}: invalid canonical_canvas "${s.canonical_canvas}"`);
  if (topCanvas && s.canonical_canvas !== topCanvas) {
    errors.push(`${system.slug}: selection.canonical_canvas (${s.canonical_canvas}) must match canonical-canvas (${topCanvas})`);
  }
  if (!s.best_for || s.best_for.length < 40) errors.push(`${system.slug}: best_for is too short`);
  if (!s.avoid_for || s.avoid_for.length < 40) errors.push(`${system.slug}: avoid_for is too short`);
  return errors;
}

function buildIndex(systems) {
  return {
    schema_version: 1,
    system_count: systems.length,
    usage: USAGE,
    systems: systems.map((system) => ({
      slug: system.slug,
      name: system.name,
      mood: system.selection.mood,
      tone: system.selection.tone,
      formality: system.selection.formality,
      density: system.selection.density,
      canonical_canvas: system.selection.canonical_canvas,
      best_for: system.selection.best_for,
      avoid_for: system.selection.avoid_for,
    })),
  };
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    printUsage();
    return;
  }

  const slugs = designSystemsFromBuildScript();
  let systems = slugs.map(readSystem);
  if (options.writeMetadata || options.refreshMetadata) {
    for (const system of systems) {
      insertOrReplaceSelection(system, options.refreshMetadata ? inferSelection(system) : (system.selection || inferSelection(system)));
    }
    systems = slugs.map(readSystem);
  }

  const errors = systems.flatMap(validateSelection);
  if (errors.length > 0) {
    for (const error of errors) console.error(error);
    process.exit(1);
  }

  const json = stableJson(buildIndex(systems));
  if (options.check) {
    const current = readFileSync(OUT_PATH, 'utf8');
    if (current !== json) {
      console.error(`drift: ${relative(REPO_ROOT, OUT_PATH)}`);
      console.error('Run `node dev-scripts/catalog-index.mjs` to regenerate.');
      process.exit(1);
    }
    console.log(`OK · catalog-index fresh for ${systems.length} design systems`);
  } else {
    writeFileSync(OUT_PATH, json, 'utf8');
    console.log(`OK · wrote ${relative(REPO_ROOT, OUT_PATH)} for ${systems.length} design systems`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
