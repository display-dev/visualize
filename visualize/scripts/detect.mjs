#!/usr/bin/env node
// Anti-slop detector for HTML artifacts.
//
// Single self-contained Node script. Vendored dependencies live under
// ./vendor/ — no npm install required after `npx skills add display-dev/visualize`.
// Runs deterministic checks against an HTML artifact and reports findings.
//
// The /visualize:review verb invokes this with `--json` (no --strict —
// the verb is an audit, not a gate) to get machine-readable findings,
// then layers LLM judgment on top via the review prompt in SKILL.md.
//
// `--strict` exits 2 on error findings. Used today by exactly one
// caller: the visualize repo's own .github/workflows/ci.yml template-
// pass smoke, which runs `node detect.mjs --strict <each-template>` to
// verify the catalogue stays clean as templates evolve. User projects
// that want a publish-gate (block CI deploys when artifacts trip
// errors) can wire it the same way — but that remains hypothetical;
// the in-repo smoke is the only concrete consumer.
//
// Usage:
//   node detect.mjs ./artifact.html
//   node detect.mjs --strict ./artifact.html       (exit 2 on error finding)
//   node detect.mjs --json ./artifact.html         (NDJSON output)
//   node detect.mjs --provider codex ./artifact.html
//   node detect.mjs --mode document ./artifact.html
//   node detect.mjs --skip slop/dark-glow,a11y/missing-alt ./artifact.html
//   node detect.mjs --config .visualize-detect.json ./artifact.html
//   node detect.mjs --brand DESIGN.md ./artifact.html   (brand-profile aware)
//
// Exit codes:
//   0 — clean (or no errors when --strict)
//   1 — unreadable input / crash
//   2 — error findings present and --strict set

import { readFileSync, existsSync, realpathSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from './vendor/node-html-parser.mjs';
import { parse as parseColor, wcagContrast } from './vendor/culori.mjs';
import { parseFrontmatter } from '../bin/_import-common.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================
// Brand profile loading
// ============================================================

function loadBrandProfile(path) {
  if (!path || !existsSync(path)) return null;
  const text = readFileSync(path, 'utf8');
  const fonts = [];

  // YAML frontmatter (Stitch DESIGN.md format) is authoritative when
  // present — Stitch fixtures don't repeat the typography in the prose
  // body, so a prose-only regex misses brand fonts entirely. Walk
  // `typography.<role>.fontFamily` and split on commas; skip CSS
  // variables (`var(--font-mono)` is a token reference, not a face).
  try {
    const { data } = parseFrontmatter(text);
    if (data?.typography && typeof data.typography === 'object') {
      for (const role of Object.values(data.typography)) {
        if (!role || typeof role !== 'object') continue;
        const ff = role.fontFamily;
        if (typeof ff !== 'string' || ff.startsWith('var(')) continue;
        fonts.push(...ff.split(',').map((s) => s.replace(/['"`]/g, '').trim()).filter(Boolean));
      }
    }
  } catch {
    // No frontmatter or malformed — fall through to the prose markers.
  }

  // Prose markers — pre-Stitch fixtures used `**Display:**` / `**Sans:**`;
  // some hand-authored DESIGN.md files still use `**Display Font:**` /
  // `**Body Font:**` / `**Mono Font:**`. Keep matching both so the
  // detector stays useful on profiles that haven't migrated to the
  // YAML-only Stitch shape yet.
  const fontPatterns = [
    /\*\*Display(?:\s+Font)?\*\*[:\s]*([^\n]+)/i,
    /\*\*Body(?:\s+Font)?\*\*[:\s]*([^\n]+)/i,
    /\*\*Sans\*\*[:\s]*([^\n]+)/i,
    /\*\*Mono(?:\s+Font)?\*\*[:\s]*([^\n]+)/i,
  ];
  for (const pattern of fontPatterns) {
    const match = text.match(pattern);
    if (match) {
      fonts.push(...match[1].split(/[,(/]/).map((s) => s.replace(/\(.*\)|`/g, '').trim()).filter(Boolean));
    }
  }
  return { fonts: [...new Set(fonts.map((f) => f.toLowerCase()))], sourcePath: path };
}

// ============================================================
// Context-building utilities (run once per file, shared across rules)
// ============================================================

function buildContext(rawHtml, brandProfile, artifactMode = null) {
  const root = parse(rawHtml, {
    lowerCaseTagName: false,
    comment: true,
    blockTextElements: { script: true, style: true, noscript: true, pre: true },
  });
  const css = collectCss(root);
  const stripped = root.text.replace(/\s+/g, ' ').trim();
  const cssRules = parseCssRules(css);
  const cssVars = collectCssVars(cssRules);
  return { root, rawHtml, css, cssRules, cssVars, stripped, brandProfile, artifactMode };
}

function collectCss(root) {
  let css = '';
  for (const el of root.querySelectorAll('style')) css += el.text + '\n';
  for (const el of root.querySelectorAll('[style]')) css += el.getAttribute('style') + '\n';
  // Strip CSS comments so selector-matching regexes don't catch comment text.
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

// Build a CSS selector path for a node — used as the locator in findings.
function selectorPath(node) {
  const parts = [];
  let cur = node;
  while (cur && cur.parentNode && cur.tagName) {
    const tag = cur.tagName.toLowerCase();
    const parent = cur.parentNode;
    const siblings = parent.childNodes.filter((n) => n.tagName && n.tagName.toLowerCase() === tag);
    if (siblings.length > 1) {
      const idx = siblings.indexOf(cur) + 1;
      parts.unshift(`${tag}:nth-of-type(${idx})`);
    } else {
      parts.unshift(tag);
    }
    cur = parent;
  }
  return parts.join(' > ');
}

function parseCssRules(css) {
  const rules = [];
  const ruleRe = /([^{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = ruleRe.exec(css))) {
    const selector = m[1].trim();
    if (!selector || selector.startsWith('@')) continue;
    rules.push({ selector, declarations: m[2] });
  }
  return rules;
}

function collectCssVars(cssRules) {
  const vars = new Map();
  for (const { declarations } of cssRules) {
    const varRe = /(--[\w-]+)\s*:\s*([^;]+)/g;
    let m;
    while ((m = varRe.exec(declarations))) {
      vars.set(m[1].toLowerCase(), m[2].trim());
    }
  }
  return vars;
}

function declarationsForSelector(cssRules, selectorRe) {
  return cssRules.filter((r) => selectorRe.test(r.selector));
}

function declarationValue(declarations, prop) {
  const re = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, 'i');
  const m = re.exec(declarations);
  return m ? m[1].trim() : null;
}

function hasPrefersDarkMedia(css) {
  return /@media\s*\([^)]*prefers-color-scheme\s*:\s*dark[^)]*\)/i.test(css);
}

function hasExplicitDataThemeDarkSelector(css) {
  const withoutFallbackGuards = css.replace(/:not\(\s*\[data-theme\s*=\s*["'](?:light|dark)["']\]\s*\)/gi, '');
  return /(?:^|})\s*[^@{}]*\[data-theme\s*=\s*["']dark["']\][^{}]*\{/i.test(withoutFallbackGuards);
}

function hasGuardedPrefersDarkFallback(css) {
  return /@media\s*\([^)]*prefers-color-scheme\s*:\s*dark[^)]*\)\s*\{\s*:root:not\(\s*\[data-theme\s*=\s*["']light["']\]\s*\):not\(\s*\[data-theme\s*=\s*["']dark["']\]\s*\)/i.test(css);
}

// ============================================================
// Rules
// ============================================================

const RULES = [];
function rule(d) { RULES.push(d); }

// --- Fossils (absolute design bans; vocab is bounded) ---

rule({
  id: 'fossil/lorem-ipsum',
  category: 'fossil',
  defaultSeverity: 'error',
  description: 'Leftover lorem ipsum, [your X]-style brackets, or [insert / add / fill in] markers in body copy.',
  run({ stripped }) {
    const re = /\b(lorem ipsum|dolor sit amet|consectetur adipiscing|placeholder text here|\[your [^\]]{1,40}\]|\[company name\]|\[insert [^\]]{1,40}\]|\[add [^\]]{1,40}\]|\[fill in[^\]]{0,40}\]|\[to be (?:added|filled[^\]]{0,20})\])\b/i;
    const m = re.exec(stripped);
    return m ? [{ locator: 'body', message: `Placeholder copy left in body: "${m[0]}".`, snippet: m[0] }] : [];
  },
});

rule({
  id: 'fossil/citation-artifact',
  category: 'fossil',
  defaultSeverity: 'error',
  description: 'Visible citation tokens (turn0search0 / oai_citation / 【N†source】) or scaffold comments (<!-- claude:, ASSISTANT:).',
  run({ stripped, rawHtml }) {
    const findings = [];
    const visiblePat = /\b(turn\d+search\d+|oai_citation|contentReference)\b|【\d+†|\[oai-citation:|\[\+\d+\]/i;
    const mv = visiblePat.exec(stripped);
    if (mv) findings.push({ locator: 'body', message: 'Citation artifact in visible content.', snippet: mv[0] });
    const commentPat = /<!--\s*(claude|gpt|agent|llm|ai|assistant|model_assistant)\s*:/i;
    const mc = commentPat.exec(rawHtml);
    if (mc) findings.push({ locator: 'html', message: 'Agent-scaffolding comment in source.', snippet: mc[0].slice(0, 60) });
    return findings;
  },
});

rule({
  id: 'fossil/agent-attribution-disclaimer',
  category: 'fossil',
  defaultSeverity: 'error',
  description: 'Visible "Generated by AI / by Claude / with AI assistance" disclaimers in body content.',
  run({ stripped }) {
    const re = /\b(generated (with|by) (ai|claude|gpt|llm)|written by (ai|claude|chatgpt)|with (ai|chatgpt) assistance|drafted with ai)\b/i;
    const m = re.exec(stripped);
    return m ? [{ locator: 'body', message: `Visible AI-attribution disclaimer: "${m[0]}".`, suggestion: 'Strip the disclaimer — attribution belongs in metadata, not body chrome.' }] : [];
  },
});

rule({
  id: 'fossil/draft-marker',
  category: 'fossil',
  defaultSeverity: 'error',
  description: 'Visible TODO / FIXME / [WIP] / [DRAFT] / TKTK markers in body, or scaffold-comment equivalents in source.',
  run({ stripped, rawHtml }) {
    const findings = [];
    const visiblePat = /\b(TKTK|TK\s+TK|\[TODO\]|\[FIXME\]|\[WIP\]|\[DRAFT\]|TODO:|FIXME:)/;
    const mv = visiblePat.exec(stripped);
    if (mv) {
      findings.push({
        locator: 'body',
        message: `Draft marker in visible body: "${mv[0]}".`,
        snippet: mv[0],
        suggestion: 'Resolve the marker before shipping — the artifact reads as half-finished.',
      });
    }
    const commentPat = /<!--\s*(TODO|FIXME|WIP|DRAFT|XXX|HACK)[\s:>-]/i;
    const mc = commentPat.exec(rawHtml);
    if (mc) {
      findings.push({
        locator: 'html',
        message: 'Draft-marker comment in source.',
        snippet: mc[0].slice(0, 60),
        suggestion: 'Strip the scaffold comment — it ships with the artifact.',
      });
    }
    return findings;
  },
});

// --- Slop / aesthetic ---

rule({
  id: 'slop/generic-gradient',
  category: 'slop',
  defaultSeverity: 'error',
  description: 'Purple→pink / indigo→cyan / generic AI gradients. Detected by hue-distance in OKLCH.',
  run({ css }) {
    const findings = [];
    const gradRe = /(?:linear|radial|conic)-gradient\s*\(([^)]+)\)/gi;
    let m;
    while ((m = gradRe.exec(css))) {
      const stops = parseGradientStops(m[1]);
      if (stops.length < 2) continue;
      const isGeneric = isGenericAiGradient(stops);
      if (isGeneric) {
        findings.push({
          locator: 'gradient',
          message: 'Generic AI-register gradient (purple/pink/indigo/cyan corridor).',
          snippet: m[0].slice(0, 120),
          suggestion: 'Use brand `--primary` as a flat fill, or drop the gradient.',
        });
      }
    }
    return findings;
  },
});

rule({
  id: 'slop/gradient-text',
  category: 'slop',
  defaultSeverity: 'error',
  description: 'background-clip: text + multi-stop gradient on heading element.',
  run({ root }) {
    const findings = [];
    for (const el of root.querySelectorAll('h1,h2,h3')) {
      const style = el.getAttribute('style') || '';
      if (/background-clip\s*:\s*text/i.test(style) && /(?:linear|radial|conic)-gradient/i.test(style)) {
        findings.push({ locator: selectorPath(el), message: 'Gradient text on heading.', snippet: style.slice(0, 120) });
      }
    }
    // Also check style sheets for h1/h2/h3 selectors with the pattern
    return findings;
  },
});

rule({
  id: 'slop/dark-glow',
  category: 'slop',
  defaultSeverity: 'error',
  description: 'Neon-glow text-shadow or box-shadow with high blur and high-chroma colour.',
  run({ css }) {
    const findings = [];
    const shadowRe = /(?:text-shadow|box-shadow)\s*:\s*([^;}]+)[;}]/gi;
    let m;
    while ((m = shadowRe.exec(css))) {
      const decl = m[1];
      // Find blur radius — typically the 3rd numeric value
      const blurMatch = decl.match(/(?:^|\s)(\d{1,3})px\s+\d{1,3}px\s+(\d{1,3})px/);
      if (!blurMatch) continue;
      const blur = Number(blurMatch[2]);
      if (blur < 12) continue;
      // Extract color (hex / rgb / oklch)
      const colorMatch = decl.match(/(#[0-9a-f]{3,8}\b|rgba?\([^)]+\)|oklch\([^)]+\)|oklab\([^)]+\)|hsla?\([^)]+\))/i);
      if (!colorMatch) continue;
      const parsed = safeParseColor(colorMatch[1]);
      if (!parsed) continue;
      const oklch = toOklch(parsed);
      if (!oklch) continue;
      // High chroma = saturated neon
      if (oklch.c > 0.12) {
        findings.push({
          locator: 'shadow',
          message: `Neon-glow shadow (${blur}px blur, chroma ${oklch.c.toFixed(2)}).`,
          snippet: m[0].slice(0, 120),
          suggestion: 'Drop the glow. The dark-glow register is a 2017 tell.',
        });
        if (findings.length >= 3) break;
      }
    }
    return findings;
  },
});

rule({
  id: 'slop/glassmorphism',
  category: 'slop',
  defaultSeverity: 'error',
  description: 'backdrop-filter: blur(N) with translucent backgrounds — 2024-25 AI-landing tell.',
  run({ css }) {
    const blurMatches = (css.match(/backdrop-filter\s*:\s*blur\s*\(\s*(\d+(?:\.\d+)?)\s*px/gi) || []);
    if (blurMatches.length === 0) return [];
    // Look for translucent background pairing
    const translucent = /background(?:-color)?\s*:\s*(?:rgba\([^)]*0?\.\d+\s*\)|hsla\([^)]*0?\.\d+\s*\)|oklch\([^)]*\/\s*0?\.\d+\s*\)|#[0-9a-f]{8}\b)/i.test(css);
    if (blurMatches.length >= 1 && translucent) {
      return [{
        locator: 'multiple',
        message: `${blurMatches.length} backdrop-filter: blur usage(s) with translucent surface — glassmorphism stack.`,
        suggestion: 'Drop the frosted-glass pattern. Use a flat tinted surface from the theme palette.',
      }];
    }
    return [];
  },
});

rule({
  id: 'slop/emoji-heading',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'h1-h3 starts with an emoji as its first character.',
  run({ root }) {
    const findings = [];
    for (const el of root.querySelectorAll('h1,h2,h3')) {
      const text = el.text.trim();
      const firstChar = [...text][0];
      if (!firstChar) continue;
      if (/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]$/u.test(firstChar)) {
        findings.push({
          locator: selectorPath(el),
          message: `${el.tagName.toUpperCase()} starts with an emoji.`,
          snippet: text.slice(0, 80),
        });
      }
    }
    return findings;
  },
});

rule({
  id: 'slop/monotonous-spacing',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Same gap value used in 70%+ of declarations across ≥8 occurrences.',
  run({ css }) {
    const gaps = [...css.matchAll(/\bgap\s*:\s*([\d.]+(?:rem|px|em))/gi)].map((m) => m[1]);
    if (gaps.length < 8) return [];
    const counts = new Map();
    for (const g of gaps) counts.set(g, (counts.get(g) || 0) + 1);
    const max = Math.max(...counts.values());
    if (max / gaps.length > 0.7) {
      return [{ locator: 'theme', message: `${max} of ${gaps.length} gap declarations identical — flat spatial rhythm.` }];
    }
    return [];
  },
});

rule({
  id: 'slop/bounce-easing',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'cubic-bezier with overshoot — y1 > 1 (spring open) OR y2 > 1 OR y1 < 0.',
  run({ css }) {
    const bezRe = /cubic-bezier\s*\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/gi;
    let m;
    let n = 0;
    while ((m = bezRe.exec(css))) {
      const y1 = Number(m[2]);
      const y2 = Number(m[4]);
      if (y1 > 1 || y2 > 1 || y1 < 0 || y2 < 0) n++;
    }
    if (n >= 2) {
      return [{ locator: 'theme', message: `${n} cubic-bezier curves with overshoot — bounce on chrome pattern.` }];
    }
    return [];
  },
});

rule({
  id: 'slop/non-token-color',
  category: 'slop',
  defaultSeverity: 'info',
  description: '≥3 hardcoded hex colors in <style> when the file otherwise uses var(--*) tokens — token discipline broken.',
  run({ css }) {
    // Count hex literals (#rgb / #rrggbb / #rgba / #rrggbbaa) inside CSS declarations
    // (not data-URLs, which legitimately contain hex like SVG fills).
    // Strip data-URLs first so favicon SVGs etc. don't count.
    const cssNoDataUrls = css.replace(/url\(["']?data:[^)]*["']?\)/gi, '');
    const hexLiterals = cssNoDataUrls.match(/(?<![\w])#[0-9a-f]{3}(?:[0-9a-f]{3}(?:[0-9a-f]{2})?)?\b/gi) || [];
    const tokenRefs = cssNoDataUrls.match(/var\(--[a-z][\w-]*\)/gi) || [];
    // Only fire when the file commits to tokens — token-refs > 5 — AND has ≥3 hex literals
    if (tokenRefs.length > 5 && hexLiterals.length >= 3) {
      const sample = [...new Set(hexLiterals)].slice(0, 4).join(', ');
      return [{
        locator: 'theme',
        message: `${hexLiterals.length} hardcoded hex literals in a file that otherwise uses ${tokenRefs.length} var(--*) refs — token-discipline broken.`,
        snippet: sample,
        suggestion: 'Move the hardcoded colors to theme tokens so brand overlays can re-color them.',
      }];
    }
    return [];
  },
});

rule({
  id: 'slop/cream-palette',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Cream, beige, paper, or sand-colored page background.',
  run({ css, cssRules, cssVars }) {
    const findings = [];
    const tokenNames = [...cssVars.keys()].filter((name) => /(?:cream|beige|sand|bone|linen|parchment|ivory|paper|wheat|almond|oat)/i.test(name));
    if (tokenNames.length >= 2) {
      findings.push({
        locator: ':root',
        message: `Multiple warm-paper token names (${tokenNames.slice(0, 4).join(', ')}) suggest the page is defaulting to cream/beige styling.`,
        suggestion: 'Use a true neutral background, a brand-tinted neutral, or a clearly intentional color surface.',
      });
    }

    const candidates = [];
    for (const { selector, declarations } of declarationsForSelector(cssRules, /(^|,)\s*(?:html|body|:root)\b/i)) {
      const bg = declarationValue(declarations, 'background(?:-color)?') || declarationValue(declarations, '--background');
      if (bg) candidates.push({ selector, value: resolveCssColorValue(bg, cssVars) });
    }
    for (const [name, value] of cssVars) {
      if (/(?:foreground|text|ink)/i.test(name)) continue;
      if (/^--(?:background|card|popover|paper|surface|canvas|cream|sand|beige|ivory|linen|bone|almond|oat)\b/i.test(name)) {
        candidates.push({ selector: name, value: resolveCssColorValue(value, cssVars) });
      }
    }

    for (const candidate of candidates) {
      if (!candidate.value || !isWarmCreamColor(candidate.value)) continue;
      findings.push({
        locator: candidate.selector,
        message: `Page/surface color (${candidate.value}) is in the cream/beige range.`,
        suggestion: 'Use a true neutral, a brand-tinted neutral, or a committed color surface.',
      });
      break;
    }
    return findings.slice(0, 2);
  },
});

rule({
  id: 'slop/side-tab',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Thick coloured single-side border on ≥4 card-shaped elements.',
  run({ root }) {
    let count = 0;
    for (const el of root.querySelectorAll('div,article,section,aside')) {
      const style = (el.getAttribute('style') || '').toLowerCase();
      // Check shorthand
      if (/border-(?:left|top|right|bottom)\s*:\s*(?:[4-9]|1\d)px\s+solid\s+(?!transparent)\S+/.test(style)) {
        count++;
        continue;
      }
      // Check longhand: border-X-width: Npx + border-X-color: non-transparent
      const sideMatch = style.match(/border-(left|top|right|bottom)-width\s*:\s*(\d+)px/);
      if (sideMatch && Number(sideMatch[2]) >= 4) {
        const colorRe = new RegExp(`border-${sideMatch[1]}-color\\s*:\\s*([^;]+)`);
        const cm = colorRe.exec(style);
        if (cm && !/transparent/i.test(cm[1])) count++;
      }
    }
    if (count >= 4) {
      return [{ locator: 'multiple', message: `${count} cards with thick coloured single-side border — overused side-tab pattern.` }];
    }
    return [];
  },
});

rule({
  id: 'slop/nested-cards',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Card-shaped containers nested inside other card-shaped containers.',
  run({ root }) {
    const findings = [];
    for (const el of root.querySelectorAll('div,article,section,aside')) {
      if (!isCardLikeElement(el)) continue;
      const nested = el.querySelectorAll('div,article,section,aside').find((child) => child !== el && isCardLikeElement(child));
      if (!nested) continue;
      findings.push({
        locator: selectorPath(nested),
        message: 'Card-like container nested inside another card-like container.',
        suggestion: 'Flatten the hierarchy with spacing, rules, or section labels instead of another framed surface.',
      });
      if (findings.length >= 3) break;
    }
    return findings;
  },
});

rule({
  id: 'slop/rounded-metadata-chips',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Static document context shown as rounded chips instead of labeled metadata.',
  run({ root }) {
    const findings = [];
    for (const el of root.querySelectorAll('span,div,p,a')) {
      const cls = el.getAttribute('class') || '';
      if (!/(?:^|\s|[-_])(pill|chip|badge)(?:$|\s|[-_])/i.test(cls)) continue;

      const text = el.text.replace(/\s+/g, ' ').trim();
      if (!text || text.length > 96) continue;
      if (!isStaticContextMetadata(text)) continue;
      if (looksLikeStateBadge(text)) continue;
      if (!isInDocumentHeader(el)) continue;

      findings.push({
        locator: selectorPath(el),
        message: `Static context metadata is rendered as a rounded chip: "${text}".`,
        suggestion: 'Use crisp key-value labels such as `Updated / May 29, 2026` or `Input / method, vision, competitor refresh`.',
      });
      if (findings.length >= 4) break;
    }
    return findings;
  },
});

rule({
  id: 'slop/document-metadata-rail',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Document-mode metadata promoted into a side rail or split-cover column.',
  run({ root, cssRules, artifactMode }) {
    if (artifactMode !== 'document') return [];
    const findings = [];

    for (const el of root.querySelectorAll('aside,dl,div,section')) {
      if (!isMetadataLikeElement(el)) continue;
      const text = el.text.replace(/\s+/g, ' ').trim();
      if (text.length < 30) continue;

      const rail = metadataRailAncestor(el, cssRules);
      if (!rail) continue;

      findings.push({
        locator: selectorPath(el),
        message: `Document metadata appears in a ${rail}.`,
        suggestion: 'Keep dates, confidence, source, owner, and similar context close to the title/thesis as labeled rows or a compact definition list inside the reading flow.',
      });
      if (findings.length >= 3) break;
    }

    return findings;
  },
});

rule({
  id: 'slop/document-as-dashboard',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Document-mode artifact composed as an executive dashboard/canvas.',
  run({ root, cssRules, cssVars, artifactMode }) {
    if (artifactMode !== 'document') return [];

    const tells = [];
    if (hasWideDocumentShell(cssRules, cssVars)) tells.push('wide shell');
    if (hasHeroLikeHeader(root)) tells.push('hero/header');
    if (hasStandaloneMetadataCard(root)) tells.push('metadata card');

    const cardCount = countCardLikeElements(root);
    if (cardCount >= 5) tells.push(`${cardCount} card-like containers`);

    const barCount = countVisualMetricElements(root);
    if (barCount >= 2) tells.push(`${barCount} bar/score widgets`);

    const canvasCount = countCanvasFurniture(root);
    if (canvasCount >= 2) tells.push(`${canvasCount} canvas/matrix/feature elements`);

    if (tells.length < 3) return [];
    return [{
      locator: 'document mode',
      message: `Document-mode artifact carries dashboard/canvas furniture: ${tells.join(', ')}.`,
      suggestion: 'For document mode, lead with title, thesis, prose, tables, sources, and sparse callouts. Use dashboard/canvas furniture only when the reader job and data model require it.',
    }];
  },
});

rule({
  id: 'slop/carded-prose',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Document-mode prose is boxed into repeated cards instead of readable sections.',
  run({ root, artifactMode }) {
    if (artifactMode !== 'document') return [];
    let cardedParagraphs = 0;
    let cardedSections = 0;
    for (const el of root.querySelectorAll('div,article,section,aside')) {
      if (!isCardLikeElement(el)) continue;
      const paragraphs = el.querySelectorAll('p').filter((p) => p.text.replace(/\s+/g, ' ').trim().length >= 45);
      if (paragraphs.length === 0) continue;
      cardedParagraphs += paragraphs.length;
      cardedSections++;
    }
    if (cardedSections < 4 || cardedParagraphs < 6) return [];
    return [{
      locator: 'document mode',
      message: `${cardedParagraphs} substantive paragraphs are boxed inside ${cardedSections} card-like containers.`,
      suggestion: 'Use normal sections, headings, rules, and spacing for prose; reserve cards for repeated entities or bounded side material.',
    }];
  },
});

rule({
  id: 'slop/bold-prose-block',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Document-mode prose is promoted into bold/display blocks.',
  run({ root, cssRules, cssVars, artifactMode }) {
    if (artifactMode !== 'document') return [];
    const findings = [];

    for (const el of root.querySelectorAll('p,li,td')) {
      if (isInsideHeading(el)) continue;
      const text = el.text.replace(/\s+/g, ' ').trim();
      if (text.length < 90) continue;
      if (dominantStrongRatio(el, text) >= 0.72) {
        findings.push({
          locator: selectorPath(el),
          message: 'Paragraph-length prose is bolded through inline emphasis.',
          suggestion: 'Bold only the phrase that needs emphasis, or turn the claim into a short heading followed by regular body prose.',
        });
      } else {
        const weight = fontWeightForElement(el, cssRules, cssVars);
        const size = fontSizeForElement(el, cssRules, cssVars);
        if (weight === null || weight < 650) continue;
        findings.push({
          locator: selectorPath(el),
          message: `Paragraph-length prose appears set in heavy weight${size ? ` (${weight}, ${size.toFixed(2)}rem)` : ` (${weight})`}.`,
          suggestion: 'Use heavy weight for headings, row keys, states, totals, and short focal values; keep explanatory paragraphs body-weight.',
        });
      }
      if (findings.length >= 5) break;
    }

    return findings;
  },
});

rule({
  id: 'slop/document-display-scale-drift',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Document-mode headings use deck/poster scale instead of reading hierarchy.',
  run({ root, cssRules, cssVars, artifactMode }) {
    if (artifactMode !== 'document') return [];
    const findings = [];
    for (const heading of root.querySelectorAll('h1,h2')) {
      const tag = (heading.tagName || '').toLowerCase();
      const size = maxFontSizeForElement(heading, cssRules, cssVars);
      if (size === null) continue;
      const text = heading.text.replace(/\s+/g, ' ').trim();
      const displayDrift = tag === 'h1'
        ? size >= 4.25 && text.length >= 24
        : size >= 2.25;
      if (!displayDrift) continue;
      findings.push({
        locator: selectorPath(heading),
        message: `${tag.toUpperCase()} uses display/deck scale in document mode (${size.toFixed(2)}rem).`,
        suggestion: 'Use large type only for a deliberate cover or presentation moment; document headings should leave room for the thesis and body rhythm.',
      });
      if (findings.length >= 4) break;
    }
    return findings;
  },
});

rule({
  id: 'slop/fake-quantification',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Document-mode bars/scores/rankings without visible source, method, scale, or baseline.',
  run({ root, stripped, artifactMode }) {
    if (artifactMode !== 'document') return [];
    const metricWidgets = countVisualMetricElements(root);
    if (metricWidgets < 3) return [];

    const hasMethod = /\b(?:method|methodology|scoring model|scale|baseline|source|sources|unit|units|n\s*=|sample|confidence|window)\b/i.test(stripped);
    if (hasMethod) return [];

    return [{
      locator: 'document mode',
      message: `${metricWidgets} score/bar/ranking widgets without visible source, method, scale, or baseline language.`,
      suggestion: 'Use a table or prose unless the artifact discloses how the values were measured or scored.',
    }];
  },
});

rule({
  id: 'slop/theme-toggle-contract',
  category: 'slop',
  defaultSeverity: 'error',
  description: 'Dark-mode media query ignores explicit data-theme overrides.',
  run({ css }) {
    if (!hasPrefersDarkMedia(css)) return [];

    const findings = [];
    if (!hasExplicitDataThemeDarkSelector(css)) {
      findings.push({
        locator: '@media (prefers-color-scheme: dark)',
        message: 'Dark mode is only keyed off system preference; explicit data-theme="dark" will not switch the artifact.',
        suggestion: 'Add a [data-theme="dark"] token block so display.dev chrome and explicit theme controls can force dark mode.',
      });
    }

    if (!hasGuardedPrefersDarkFallback(css)) {
      findings.push({
        locator: '@media (prefers-color-scheme: dark)',
        message: 'System dark-mode media query is not guarded against explicit data-theme choices.',
        suggestion: 'Use @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]):not([data-theme="dark"]) { ... } } so system dark is only the fallback path.',
      });
    }

    return findings;
  },
});

rule({
  id: 'slop/mobile-double-rules',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Mobile layout stacks header and contents/TOC horizontal separators.',
  run({ cssRules }) {
    const headerBottom = cssRules.find(({ selector, declarations }) => (
      /(^|,)\s*(?:header|\.hero|\.page-header|\.report-header|\.memo-header)\b/i.test(selector) &&
      isNonZeroBorderValue(declarationValue(declarations, 'border-bottom'))
    ));
    if (!headerBottom) return [];

    for (const { selector, declarations } of cssRules) {
      if (!/(^|,)\s*(?:aside|nav|\.toc|\.contents|\.table-of-contents|\.content-nav)\b/i.test(selector)) continue;
      if (!/order\s*:\s*-1\b/i.test(declarations)) continue;
      if (!isNonZeroBorderValue(declarationValue(declarations, 'border-top'))) continue;
      if (!isNonZeroBorderValue(declarationValue(declarations, 'border-bottom'))) continue;

      return [{
        locator: selector.trim().slice(0, 80),
        message: 'Mobile contents/TOC block adds top and bottom borders after a header that already has a bottom border.',
        suggestion: 'Collapse to one separator at the mobile breakpoint: remove the TOC top border or the header bottom border.',
      }];
    }
    return [];
  },
});

rule({
  id: 'slop/mobile-toc-word-cloud',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Mobile contents/TOC links wrap as loose inline words instead of structured navigation.',
  run({ root, cssRules }) {
    if (!hasTocWithManyLinks(root)) return [];

    const mobileToc = cssRules.some(({ selector, declarations }) => (
      selectorTargetsTocContainer(selector) &&
      /order\s*:\s*-1\b/i.test(declarations)
    ));
    if (!mobileToc) return [];

    const looseLinkRule = cssRules.find(({ selector, declarations }) => {
      if (!selectorTargetsTocLink(selector)) return false;
      const display = declarationValue(declarations, 'display') || '';
      if (!/\binline(?:-flex|-block)?\b/i.test(display)) return false;
      return /margin-(?:right|inline-end)\s*:/i.test(declarations) || /min-height\s*:\s*(?:4[0-9]|[5-9][0-9])px/i.test(declarations);
    });
    if (!looseLinkRule) return [];

    return [{
      locator: looseLinkRule.selector.trim().slice(0, 80),
      message: 'Mobile contents/TOC links are inline items that wrap like unrelated words.',
      suggestion: 'Use a vertical list, numbered rows, or a deliberate compact grid with consistent row and column rhythm.',
    }];
  },
});

rule({
  id: 'slop/table-type-hierarchy',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Table captions/intros or cells use lede/display typography instead of compact table roles.',
  run({ root, cssRules, cssVars }) {
    const findings = [];

    for (const { selector, declarations } of cssRules) {
      const fontSize = declarationValue(declarations, 'font-size');
      const rem = fontSizeToRem(fontSize, cssVars);
      if (rem === null) continue;

      if (isTableCaptionLikeSelector(selector) && rem >= 1.125) {
        findings.push({
          locator: selector.trim().slice(0, 80),
          message: `Table caption/intro typography is oversized (${fontSize}).`,
          suggestion: 'Keep table captions and source notes around 0.8125rem-0.9375rem, or move argument prose outside the table.',
        });
      } else if (isTableCellSelector(selector) && rem >= 1.125) {
        findings.push({
          locator: selector.trim().slice(0, 80),
          message: `Table cell typography is oversized (${fontSize}).`,
          suggestion: 'Keep table body cells around 0.875rem-1rem; use hierarchy, padding, and focal columns instead of display-sized cells.',
        });
      }
      if (findings.length >= 5) return findings;
    }

    for (const caption of root.querySelectorAll('caption')) {
      const rem = fontSizeForElement(caption, cssRules, cssVars);
      if (rem === null || rem < 1.125) continue;
      findings.push({
        locator: selectorPath(caption),
        message: `Table caption renders at lede scale (${rem.toFixed(2)}rem).`,
        suggestion: 'Shrink the caption/source note or move the sentence above the table as normal prose.',
      });
      if (findings.length >= 5) return findings;
    }

    for (const table of root.querySelectorAll('table')) {
      const prev = previousElementSibling(table);
      if (!prev || !looksLikeTableIntro(prev, table)) continue;
      const rem = fontSizeForElement(prev, cssRules, cssVars);
      if (rem === null || rem < 1.125) continue;
      findings.push({
        locator: selectorPath(prev),
        message: `Prose immediately before a table renders at lede scale (${rem.toFixed(2)}rem).`,
        suggestion: 'Make it ordinary body prose outside the table rhythm, or reduce it to a small muted table note.',
      });
      if (findings.length >= 5) return findings;
    }

    return findings;
  },
});

rule({
  id: 'slop/repeated-section-kickers',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Repeated short all-caps labels directly before section headings.',
  run({ root }) {
    const kickers = [];
    for (const el of root.querySelectorAll('p,span,div,small')) {
      const text = el.text.trim();
      if (!looksLikeKicker(text)) continue;
      const next = nextElementSibling(el);
      if (!next || !/^h[1-3]$/i.test(next.tagName || '')) continue;
      kickers.push({ el, text });
    }
    if (kickers.length < 3) return [];
    return [{
      locator: selectorPath(kickers[0].el),
      message: `${kickers.length} repeated all-caps labels before headings flatten the section rhythm.`,
      snippet: kickers.slice(0, 4).map((k) => k.text).join(' / '),
      suggestion: 'Use hierarchy, rules, artifacts, or a single deliberate label system instead.',
    }];
  },
});

rule({
  id: 'slop/numbered-section-markers',
  category: 'slop',
  defaultSeverity: 'info',
  description: '01 / 02 / 03-style numbers used before multiple section headings.',
  run({ root }) {
    const markers = [];
    for (const el of root.querySelectorAll('p,span,div,small')) {
      const text = el.text.trim();
      if (!/^(?:0?\d{1,2})(?:[./:)—-]|\s*$)/.test(text)) continue;
      const next = nextElementSibling(el);
      if (!next || !/^h[1-3]$/i.test(next.tagName || '')) continue;
      markers.push({ el, text });
    }
    if (markers.length < 3) return [];
    return [{
      locator: selectorPath(markers[0].el),
      message: `${markers.length} section headings are preceded by number labels such as 01 / 02 / 03.`,
      snippet: markers.slice(0, 4).map((m) => m.text).join(' / '),
      suggestion: 'Keep numbers for real sequences; otherwise let layout and headings carry the structure.',
    }];
  },
});

rule({
  id: 'slop/overused-font',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Unbranded use of saturated default AI/UI font families.',
  run({ css, brandProfile }) {
    const bodyFontRe = /(?:^|\})\s*body\s*\{[^}]*font-family\s*:\s*([^;}]+)/gim;
    const m = bodyFontRe.exec(css);
    if (!m) return [];
    const declared = m[1].toLowerCase();
    if (brandProfile?.fonts?.some((f) => declared.includes(f))) return [];
    const overused = ['inter', 'roboto', 'geist', 'plus jakarta sans', 'space grotesk', 'arial', 'helvetica', 'system-ui'];
    const hit = overused.find((font) => declared.includes(font));
    if (!hit) return [];
    return [{
      locator: 'body',
      message: `Body font-family starts from an overused UI/default face (${hit}).`,
      snippet: `font-family: ${m[1].trim()};`,
      suggestion: 'Use a brand-specific display/body pairing, or document why this face is the brand.',
    }];
  },
});

rule({
  id: 'slop/extreme-negative-tracking',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Display letter-spacing tighter than -0.04em.',
  run({ cssRules }) {
    const findings = [];
    for (const { selector, declarations } of cssRules) {
      const value = declarationValue(declarations, 'letter-spacing');
      if (!value) continue;
      const em = toEmLetterSpacing(value, declarations);
      if (em === null || em >= -0.04) continue;
      findings.push({
        locator: selector.slice(0, 80),
        message: `Display tracking is too compressed (${value}); -0.04em is the floor.`,
        suggestion: 'Use -0.01em to -0.03em for tight display type unless a brand spec demands more.',
      });
      if (findings.length >= 5) break;
    }
    return findings;
  },
});

rule({
  id: 'slop/wide-tracking',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Wide letter-spacing outside short labels / eyebrows.',
  run({ cssRules }) {
    const findings = [];
    for (const { selector, declarations } of cssRules) {
      const value = declarationValue(declarations, 'letter-spacing');
      if (!value) continue;
      const em = toEmLetterSpacing(value, declarations);
      if (em === null || em <= 0.05) continue;
      if (/(label|eyebrow|kicker|badge|meta|nav|caption|overline|mono)/i.test(selector)) continue;
      findings.push({
        locator: selector.slice(0, 80),
        message: `Wide tracking (${value}) outside a short-label role slows reading.`,
        suggestion: 'Reserve wide tracking for short uppercase labels; keep body and headings near normal.',
      });
      if (findings.length >= 5) break;
    }
    return findings;
  },
});

rule({
  id: 'slop/codex-border-shadow-stack',
  category: 'slop',
  defaultSeverity: 'info',
  provider: 'codex',
  description: 'Codex tell: 1px border and large soft shadow used on the same card/button.',
  run({ root, cssRules }) {
    const findings = [];
    for (const { selector, declarations } of cssRules) {
      const border = declarationValue(declarations, 'border');
      const shadow = declarationValue(declarations, 'box-shadow');
      if (!border || !shadow) continue;
      if (!/\b1px\b/.test(border)) continue;
      const blur = maxShadowBlurPx(shadow);
      if (blur < 16) continue;
      findings.push({
        locator: selector.slice(0, 80),
        message: `Element has both a 1px border and a ${blur}px shadow blur.`,
        suggestion: 'Use either a defined edge or a restrained shadow under 8px blur.',
      });
      if (findings.length >= 5) break;
    }
    if (findings.length < 5) {
      for (const el of root.querySelectorAll('[style]')) {
        const declarations = el.getAttribute('style') || '';
        const border = declarationValue(declarations, 'border');
        const shadow = declarationValue(declarations, 'box-shadow');
        if (!border || !shadow || !/\b1px\b/.test(border)) continue;
        const blur = maxShadowBlurPx(shadow);
        if (blur < 16) continue;
        findings.push({
          locator: selectorPath(el),
          message: `Element has both a 1px border and a ${blur}px shadow blur.`,
          suggestion: 'Use either a defined edge or a restrained shadow under 8px blur.',
        });
        if (findings.length >= 5) break;
      }
    }
    return findings;
  },
});

rule({
  id: 'slop/codex-repeating-stripes',
  category: 'slop',
  defaultSeverity: 'info',
  provider: 'codex',
  description: 'Codex tell: repeating-gradient stripe background used as decoration.',
  run({ css }) {
    if (!/repeating-linear-gradient\s*\(/i.test(css)) return [];
    return [{
      locator: 'theme',
      message: 'Decorative repeating-gradient stripe background.',
      suggestion: 'Use a purposeful texture system, a real pattern asset, or a plain background.',
    }];
  },
});

rule({
  id: 'slop/codex-meta-contrast-copy',
  category: 'slop',
  defaultSeverity: 'info',
  provider: 'codex',
  description: 'Codex tell: copy phrased as "X theater", "actually X", or "not just X, it is Y".',
  run({ stripped }) {
    const re = /\b([a-z]+ theater|actually [a-z][a-z-]+|not just [^.!?]{2,80},?\s+it(?:'| i)s [^.!?]{2,80})\b/i;
    const m = re.exec(stripped);
    return m ? [{
      locator: 'body',
      message: 'Copy uses a stock contrast frame instead of a concrete claim.',
      snippet: m[0],
      suggestion: 'Use a concrete noun and a literal verb instead of the meta-criticism frame.',
    }] : [];
  },
});

rule({
  id: 'slop/gemini-image-hover',
  category: 'slop',
  defaultSeverity: 'info',
  provider: 'gemini',
  description: 'Gemini tell: decorative hover transform applied directly to images.',
  run({ css }) {
    if (!/(?:img|picture)[^{:]*:hover[^{]*\{[^}]*transform\s*:/i.test(css) && !/group-hover:[\w-]*(?:scale|rotate|translate)/i.test(css)) {
      return [];
    }
    return [{
      locator: 'image:hover',
      message: 'Hover transform on imagery adds motion without affordance.',
      suggestion: 'Animate the card boundary, background, or action target instead of the image.',
    }];
  },
});

// --- Brand-aware (require brandProfile to fire) ---

rule({
  id: 'slop/system-default-font',
  category: 'slop',
  defaultSeverity: 'info',
  description: 'Body font-family is generic system stack when brand profile expects a specific face.',
  run({ css, brandProfile }) {
    if (!brandProfile || brandProfile.fonts.length === 0) return [];
    const bodyFontRe = /(?:^|\})\s*body\s*\{[^}]*font-family\s*:\s*([^;}]+)/gim;
    const m = bodyFontRe.exec(css);
    if (!m) return [];
    const declared = m[1].toLowerCase();
    const brandReferenced = brandProfile.fonts.some((f) => declared.includes(f));
    if (brandReferenced) return [];
    const overused = ['inter', 'roboto', 'open sans', 'lato', 'arial', 'helvetica', 'system-ui', 'segoe ui'];
    if (!overused.some((f) => declared.includes(f))) return [];
    return [{
      locator: 'body',
      message: `Body font-family is generic stack but brand declares ${brandProfile.fonts.slice(0, 3).join(' / ')}.`,
      snippet: `font-family: ${m[1].trim()};`,
      suggestion: 'Use the brand profile font as the first entry in the stack.',
    }];
  },
});

// --- Accessibility ---

rule({
  id: 'a11y/missing-alt',
  category: 'a11y',
  defaultSeverity: 'error',
  description: 'img element without alt attribute, or with lazy alt ("image", "DSC_0042", whitespace).',
  run({ root }) {
    const findings = [];
    const LAZY_ALTS = new Set(['image', 'picture', 'photo', 'screenshot', 'chart', 'graphic', 'icon', 'logo']);
    for (const img of root.querySelectorAll('img')) {
      if (img.getAttribute('role') === 'presentation') continue;
      const alt = img.getAttribute('alt');
      if (alt === undefined) {
        findings.push({ locator: selectorPath(img), message: 'img without alt attribute.', snippet: `<img src="${img.getAttribute('src') || ''}">` });
        if (findings.length >= 10) break;
        continue;
      }
      // alt is present — check quality
      const trimmed = alt.trim();
      if (trimmed === '') continue; // intentional decoration
      if (LAZY_ALTS.has(trimmed.toLowerCase())) {
        findings.push({ locator: selectorPath(img), message: `Lazy alt value: "${trimmed}".`, suggestion: 'Describe what the image conveys, not its category.' });
      } else if (/^(?:DSC|IMG|MOV|VID|PXL|CAM|PHOTO)[_-]?\d+|^[\w-]+\.(?:jpe?g|png|gif|webp|svg)$/i.test(trimmed)) {
        findings.push({ locator: selectorPath(img), message: `Alt is a filename / camera output: "${trimmed}".`, suggestion: 'Replace with a description.' });
      }
      if (findings.length >= 10) break;
    }
    return findings;
  },
});

rule({
  id: 'a11y/missing-lang',
  category: 'a11y',
  defaultSeverity: 'error',
  description: 'html element missing lang attribute or set to empty string.',
  run({ root }) {
    const html = root.querySelector('html');
    if (!html) return [];
    const lang = html.getAttribute('lang');
    if (lang === undefined || lang.trim() === '') {
      return [{ locator: 'html', message: '<html> missing lang attribute (or lang="").', suggestion: 'Add lang="en" or the appropriate language code.' }];
    }
    return [];
  },
});

rule({
  id: 'a11y/empty-link',
  category: 'a11y',
  defaultSeverity: 'error',
  description: 'a element with no accessible name.',
  run({ root }) {
    const findings = [];
    for (const a of root.querySelectorAll('a')) {
      const text = a.text.trim();
      if (text) continue;
      if (a.getAttribute('aria-label') || a.getAttribute('aria-labelledby') || a.getAttribute('title')) continue;
      const innerImgs = a.querySelectorAll('img');
      const hasImgWithAlt = innerImgs.some((img) => (img.getAttribute('alt') || '').trim());
      if (hasImgWithAlt) continue;
      findings.push({ locator: selectorPath(a), message: '<a> with no accessible name (no text, no aria-label, no captioned img child).' });
      if (findings.length >= 5) break;
    }
    return findings;
  },
});

rule({
  id: 'a11y/low-contrast',
  category: 'a11y',
  defaultSeverity: 'error',
  description: 'Computed text/background contrast below WCAG AA (4.5:1 body, 3:1 large).',
  run({ css }) {
    const findings = [];
    const ruleRe = /([^{}]+)\{([^}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(css))) {
      const decl = m[2];
      const colorMatch = decl.match(/(?:^|;|\s)color\s*:\s*([^;}]+)/);
      const bgMatch = decl.match(/(?:^|;|\s)background(?:-color)?\s*:\s*([^;}]+)/);
      if (!colorMatch || !bgMatch) continue;
      const fgText = colorMatch[1].trim().split(/\s+/)[0];
      const bgText = bgMatch[1].trim().split(/\s+/)[0];
      // Skip intentionally-invisible: color: transparent, color matches background literally,
      // or the rule sets opacity: 0 (pending-state pattern from diff-review)
      if (/^transparent$/i.test(fgText) || /^transparent$/i.test(bgText)) continue;
      if (fgText.toLowerCase() === bgText.toLowerCase()) continue;
      if (/opacity\s*:\s*0(?:[^.\d]|$)/.test(decl)) continue;
      // Skip rules whose selector targets a state class that implies hidden
      // (.is-pending, .is-hidden, [hidden], [aria-hidden=true], .visually-hidden)
      const sel = m[1];
      if (/\.is-pending|\.is-hidden|\.visually-hidden|\[hidden\]|\[aria-hidden=["']?true/i.test(sel)) continue;
      const fg = safeParseColor(fgText);
      const bg = safeParseColor(bgText);
      if (!fg || !bg) continue;
      let ratio;
      try { ratio = wcagContrast(fg, bg); } catch { continue; }
      if (!Number.isFinite(ratio) || ratio <= 1) continue;
      if (ratio < 4.5) {
        findings.push({
          locator: m[1].trim().slice(0, 60),
          message: `Contrast ratio ${ratio.toFixed(2)} — below WCAG AA (4.5:1 body, 3:1 large).`,
          snippet: `color: ${colorMatch[1].trim()}; background: ${bgMatch[1].trim()};`,
        });
        if (findings.length >= 5) break;
      }
    }
    return findings;
  },
});

// --- Publishing hygiene ---

rule({
  id: 'meta/missing-title',
  category: 'meta',
  defaultSeverity: 'error',
  description: '<title> missing or empty.',
  run({ root }) {
    const title = root.querySelector('title');
    if (!title || !title.text.trim()) {
      return [{ locator: 'html > head', message: '<title> missing or empty.', suggestion: 'Add <title>Your artifact name</title>.' }];
    }
    return [];
  },
});

rule({
  id: 'meta/missing-favicon',
  category: 'meta',
  defaultSeverity: 'warn',
  description: 'no <link rel="icon">.',
  run({ root }) {
    const links = root.querySelectorAll('link');
    const hasFavicon = links.some((l) => {
      const rel = (l.getAttribute('rel') || '').toLowerCase();
      return rel === 'icon' || rel === 'shortcut icon' || rel === 'apple-touch-icon';
    });
    if (!hasFavicon) {
      return [{ locator: 'html > head', message: '<link rel="icon"> missing.', suggestion: 'Add a favicon so the artifact reads as branded.' }];
    }
    return [];
  },
});

rule({
  id: 'meta/missing-og',
  category: 'meta',
  defaultSeverity: 'warn',
  description: 'No Open Graph or Twitter card meta tags with non-empty content.',
  run({ root }) {
    const metas = root.querySelectorAll('meta');
    const has = metas.some((m) => {
      const property = (m.getAttribute('property') || '').toLowerCase();
      const name = (m.getAttribute('name') || '').toLowerCase();
      const content = (m.getAttribute('content') || '').trim();
      if (!content) return false;
      return property === 'og:title' || name === 'twitter:card';
    });
    if (!has) {
      return [{ locator: 'html > head', message: 'No OG / Twitter card meta with non-empty content — Slack / Teams / LinkedIn unfurls degrade.' }];
    }
    return [];
  },
});

rule({
  id: 'meta/external-script',
  category: 'meta',
  defaultSeverity: 'error',
  description: 'External <script src> not on the allowlist (Mermaid + Chart.js on cdn.jsdelivr.net; unpkg; displaydev).',
  run({ root }) {
    const findings = [];
    const allow = [
      /^https:\/\/cdn\.jsdelivr\.net\/npm\/mermaid@/i,
      /^https:\/\/cdn\.jsdelivr\.net\/npm\/chart\.js@/i,
      /^https:\/\/unpkg\.com\//i,
      /^https:\/\/(?:cdn\.)?displaydev\.com\//i,
    ];
    for (const s of root.querySelectorAll('script')) {
      const src = s.getAttribute('src');
      if (!src) continue;
      // Skip relative + same-origin
      if (!/^https?:\/\//i.test(src) && !src.startsWith('//')) continue;
      if (allow.some((re) => re.test(src))) continue;
      findings.push({
        locator: selectorPath(s),
        message: `External script not on allowlist: ${src}`,
        suggestion: 'Move to allowlist (mermaid / chart.js on jsdelivr; unpkg; displaydev), inline the library, or remove.',
      });
    }
    return findings;
  },
});

// --- Performance / robustness ---

rule({
  id: 'perf/layout-thrash',
  category: 'perf',
  defaultSeverity: 'warn',
  description: 'transition on width/height/top/left/right/bottom or transition: all. Allowlists progress-fill bars.',
  run({ css }) {
    const findings = [];
    // transition: all — broad warn
    if (/transition\s*:\s*all\b/i.test(css)) {
      findings.push({ locator: 'theme', message: '`transition: all` applies to every property — measure the cost.', suggestion: 'List explicit properties instead.' });
    }
    // transition on layout-affecting props, scoped per selector
    const ruleRe = /([^{}]+)\{([^}]*transition[^;}]*\b(width|height|top|left|right|bottom)\b[^;]*[^}]*)\}/gi;
    let m;
    while ((m = ruleRe.exec(css))) {
      const sel = m[1].trim();
      // Allowlist progress-bar shapes (one-shot fill, contained).
      // Match selectors that name a progress-bar element: anything with
      // "progress" + bar/fill, or "bar" + "fill", or [role=progressbar].
      const hasProgressBar = /\bprogress[-_]?(bar|fill)\b/i.test(sel);
      const hasBarFill = /\b(?:bar|track|xtab|gauge)[-_]?fill\b/i.test(sel);
      if (hasProgressBar || hasBarFill || /\[role=["']?progressbar["']?\]/i.test(sel)) continue;
      findings.push({
        locator: sel.slice(0, 60),
        message: 'transition on layout-affecting property (width/height/top/left).',
        suggestion: 'Use transform (translate/scale) instead — avoids layout thrash + reflow.',
      });
      if (findings.length >= 5) break;
    }
    return findings;
  },
});

rule({
  id: 'perf/img-no-dimensions',
  category: 'perf',
  defaultSeverity: 'warn',
  description: 'img without width/height attributes — CLS risk.',
  run({ root }) {
    const findings = [];
    for (const img of root.querySelectorAll('img')) {
      const hasW = img.getAttribute('width');
      const hasH = img.getAttribute('height');
      const style = img.getAttribute('style') || '';
      if (hasW && hasH) continue;
      if (/width\s*:\s*\d+(?:px|rem|em)/.test(style) && /height\s*:\s*\d+(?:px|rem|em)/.test(style)) continue;
      // SVG inline doesn't need dims; check tag (always img here) + src
      findings.push({
        locator: selectorPath(img),
        message: 'img without width/height attributes — risk of CLS (cumulative layout shift) at load.',
        snippet: `<img src="${img.getAttribute('src') || ''}">`,
      });
      if (findings.length >= 5) break;
    }
    return findings;
  },
});

// --- Heading structure ---

rule({
  id: 'a11y/heading-structure',
  category: 'a11y',
  defaultSeverity: 'warn',
  description: 'Missing h1, multiple h1, or skipped heading levels.',
  run({ root }) {
    const findings = [];
    const headings = [];
    for (const el of root.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      headings.push({ level: Number(el.tagName[1]), locator: selectorPath(el) });
    }
    const h1s = headings.filter((h) => h.level === 1);
    if (h1s.length === 0) {
      findings.push({ locator: 'html', message: 'No <h1> in the document.', suggestion: 'Every artifact needs exactly one h1.' });
    } else if (h1s.length > 1) {
      findings.push({ locator: 'html', message: `${h1s.length} <h1> elements; expected exactly 1.` });
    }
    // Walk for level-skips (e.g. h1 then h3)
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1].level;
      const cur = headings[i].level;
      if (cur > prev + 1) {
        findings.push({
          locator: headings[i].locator,
          message: `Heading level jumps from h${prev} to h${cur} — skips h${prev + 1}.`,
          suggestion: 'Use consecutive levels so screen-reader heading nav works.',
        });
        break; // one level-skip finding per file is enough
      }
    }
    return findings;
  },
});

// ============================================================
// Color helpers
// ============================================================

function normalizeArtifactMode(value) {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  return ['document', 'canvas', 'dashboard', 'deck'].includes(normalized) ? normalized : null;
}

function countCardLikeElements(root) {
  return root.querySelectorAll('div,article,section,aside').filter((el) => isCardLikeElement(el)).length;
}

function hasWideDocumentShell(cssRules, cssVars) {
  for (const { selector, declarations } of cssRules) {
    if (!/(^|,)\s*(?:main|\.page|\.wrap|\.container|\.shell|\.report|\.artifact)\b/i.test(selector)) continue;
    const maxWidth = declarationValue(declarations, 'max-width');
    const width = declarationValue(declarations, 'width');
    const maxRem = widthLikeToRem(maxWidth || width, cssVars);
    if (maxRem !== null && maxRem >= 70) return true;
  }
  return false;
}

function hasHeroLikeHeader(root) {
  for (const el of root.querySelectorAll('header,section,div')) {
    const cls = (el.getAttribute('class') || '').toLowerCase();
    if (!/\b(hero|splash|cover|masthead|jumbotron)\b/.test(cls)) continue;
    const h1 = el.querySelector('h1');
    if (h1) return true;
  }
  return false;
}

function hasStandaloneMetadataCard(root) {
  for (const el of root.querySelectorAll('aside,div,section')) {
    const cls = (el.getAttribute('class') || '').toLowerCase();
    if (!/\b(meta|metadata|snapshot|facts|context)\b/.test(cls)) continue;
    if (!isCardLikeElement(el)) continue;
    const text = el.text.replace(/\s+/g, ' ').trim();
    if (text.length >= 30) return true;
  }
  return false;
}

function isMetadataLikeElement(el) {
  const cls = (el.getAttribute('class') || '').toLowerCase();
  const aria = (el.getAttribute('aria-label') || '').toLowerCase();
  if (/\b(meta|metadata|snapshot|facts|context)\b/.test(`${cls} ${aria}`)) return true;
  if ((el.tagName || '').toLowerCase() !== 'dl') return false;

  const labels = el.querySelectorAll('dt')
    .map((dt) => dt.text.replace(/\s+/g, ' ').trim().toLowerCase())
    .filter(Boolean);
  if (labels.length < 2) return false;
  const contextLabels = labels.filter((label) => /\b(?:updated|created|published|source|input|audience|owner|author|confidence|category|reader|status|version)\b/.test(label));
  return contextLabels.length >= 2;
}

function metadataRailAncestor(el, cssRules) {
  let cur = el;
  while (cur && cur.parentNode && cur.tagName) {
    const tag = (cur.tagName || '').toLowerCase();
    if (tag === 'aside') return 'side rail';
    if (cur !== el && hasSplitOpeningGrid(cur, cssRules) && cur.querySelector('h1')) return 'split opening column';
    cur = cur.parentNode;
  }
  return null;
}

function hasSplitOpeningGrid(el, cssRules) {
  const displayValues = cssDeclarationsForElement(el, cssRules, 'display');
  if (!displayValues.some((value) => /\bgrid\b/i.test(value))) return false;

  return cssDeclarationsForElement(el, cssRules, 'grid-template-columns')
    .some((columns) => isSplitGridColumns(columns));
}

function isSplitGridColumns(columns) {
  const normalized = String(columns || '').replace(/\s+/g, ' ').trim().toLowerCase();
  if (!normalized || normalized === 'none' || normalized === '1fr') return false;
  if (/repeat\(\s*[2-9]\s*,/.test(normalized)) return true;
  return /\)\s+minmax\(|\b(?:1fr|minmax\([^)]*\)|\d+(?:\.\d+)?(?:rem|px|%)|auto)\s+(?:1fr|minmax\(|\d|auto)/.test(normalized);
}

function cssDeclarationsForElement(el, cssRules, prop) {
  const values = [];
  const inline = declarationValue(el.getAttribute('style') || '', prop);
  if (inline) values.push(inline);

  for (const { selector, declarations } of cssRules) {
    if (/::/.test(selector)) continue;
    const next = declarationValue(declarations, prop);
    if (!next) continue;
    if (!selectorListCouldMatchElementNode(selector, el)) continue;
    values.push(next);
  }
  return values;
}

function countVisualMetricElements(root) {
  let count = 0;
  for (const el of root.querySelectorAll('div,span,article,section,meter,progress')) {
    const cls = (el.getAttribute('class') || '').toLowerCase();
    const role = (el.getAttribute('role') || '').toLowerCase();
    const aria = (el.getAttribute('aria-label') || '').toLowerCase();
    const style = (el.getAttribute('style') || '').toLowerCase();
    const text = el.text.replace(/\s+/g, ' ').trim().toLowerCase();
    if (/\b(score|scoreboard|rating|rank|ranking|radar|gauge|kpi|metric|stat|progress|bar|track|fill|lane-fill)\b/.test(cls)) count++;
    else if (role === 'progressbar' || /progress|score|rating|ranking/.test(aria)) count++;
    else if (/width\s*:\s*\d+(?:\.\d+)?%/.test(style) && /\b(?:score|rank|progress|fit|strength|coverage|confidence|risk)\b/.test(text)) count++;
  }
  return count;
}

function countCanvasFurniture(root) {
  let count = 0;
  for (const el of root.querySelectorAll('div,article,section,ol,ul')) {
    const cls = (el.getAttribute('class') || '').toLowerCase();
    if (/\b(?:lane|matrix|map|radar|feature-strip|feature-grid|signal-list|scoreboard|flow|timeline-canvas|positioning|quadrant|axis)\b/.test(cls)) count++;
  }
  return count;
}

function widthLikeToRem(value, cssVars, seen = new Set()) {
  if (!value) return null;
  const text = String(value).trim().toLowerCase().replace(/\s*!important\b/g, '');
  const varMatch = text.match(/^var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\)$/);
  if (varMatch) {
    const name = varMatch[1].toLowerCase();
    if (!seen.has(name) && cssVars?.has(name)) {
      seen.add(name);
      return widthLikeToRem(cssVars.get(name), cssVars, seen);
    }
    return widthLikeToRem(varMatch[2], cssVars, seen);
  }
  const minMax = text.match(/^(?:min|max|clamp)\((.*)\)$/);
  const source = minMax ? minMax[1] : text;
  const lengths = [...source.matchAll(/(-?[\d.]+)\s*(rem|px|vw|ch|%)\b/g)]
    .map((m) => {
      const n = Number(m[1]);
      const unit = m[2];
      if (!Number.isFinite(n)) return null;
      if (unit === 'rem') return n;
      if (unit === 'px') return n / 16;
      if (unit === 'ch') return n * 0.5;
      if (unit === 'vw') return n >= 90 ? 80 : null;
      if (unit === '%') return n >= 90 ? 80 : null;
      return null;
    })
    .filter((n) => n !== null);
  return lengths.length ? Math.max(...lengths) : null;
}

function safeParseColor(s) {
  if (!s) return null;
  try {
    return parseColor(s.trim());
  } catch {
    return null;
  }
}

function resolveCssColorValue(value, cssVars, depth = 0) {
  if (!value || depth > 3) return null;
  const trimmed = String(value).trim();
  const varMatch = trimmed.match(/var\(\s*(--[\w-]+)\s*(?:,[^)]+)?\)/i);
  if (varMatch) {
    const resolved = cssVars.get(varMatch[1].toLowerCase());
    return resolved ? resolveCssColorValue(resolved, cssVars, depth + 1) : null;
  }
  const colorMatch = trimmed.match(/oklch\([^)]+\)|rgba?\([^)]+\)|hsla?\([^)]+\)|#[0-9a-f]{3,8}\b|\b(?:white|black|ivory|beige|linen|oldlace|seashell|antiquewhite)\b/i);
  return colorMatch ? colorMatch[0] : null;
}

function isWarmCreamColor(value) {
  const text = String(value).trim().toLowerCase();
  if (/\b(?:ivory|beige|linen|oldlace|seashell|antiquewhite)\b/.test(text)) return true;
  const oklchMatch = text.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/);
  if (oklchMatch) {
    const lRaw = oklchMatch[1];
    const l = lRaw.endsWith('%') ? Number(lRaw.slice(0, -1)) / 100 : Number(lRaw);
    const c = Number(oklchMatch[2]);
    const h = Number(oklchMatch[3]);
    return l >= 0.84 && l <= 0.97 && c > 0 && c < 0.06 && h >= 40 && h <= 100;
  }
  const parsed = safeParseColor(text);
  if (!parsed || parsed.mode !== 'rgb') return false;
  const { r, g, b } = parsed;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const warmBias = r >= g && g >= b;
  return max >= 0.84 && max <= 0.99 && max - min > 0.015 && max - min < 0.12 && warmBias;
}

function toOklch(color) {
  if (!color) return null;
  if (color.mode === 'oklch') return color;
  try {
    // culori parses many formats but doesn't auto-convert; we rely on the parsed-from spec for chroma/hue
    // For simple chroma estimation, use the rgb values directly via a quick approximation
    const rgb = color.mode === 'rgb' ? color : color;
    if (rgb.r === undefined) return null;
    // Quick chroma proxy: max(r,g,b) - min(r,g,b)
    const lo = Math.min(rgb.r, rgb.g, rgb.b);
    const hi = Math.max(rgb.r, rgb.g, rgb.b);
    return { l: (lo + hi) / 2, c: hi - lo, h: 0 };
  } catch {
    return null;
  }
}

function isCardLikeElement(el) {
  const cls = (el.getAttribute('class') || '').toLowerCase();
  const style = (el.getAttribute('style') || '').toLowerCase();
  if (/\b(card|panel|tile|surface|module|box|sheet)\b/.test(cls)) return true;
  const hasBoundary = /border\s*:/.test(style) || /box-shadow\s*:/.test(style) || /background(?:-color)?\s*:/.test(style);
  const hasPadding = /padding\s*:/.test(style);
  return hasBoundary && hasPadding;
}

function nextElementSibling(el) {
  const parent = el.parentNode;
  if (!parent?.childNodes) return null;
  const siblings = parent.childNodes.filter((n) => n.tagName);
  const index = siblings.indexOf(el);
  return index >= 0 ? siblings[index + 1] || null : null;
}

function previousElementSibling(el) {
  const parent = el.parentNode;
  if (!parent?.childNodes) return null;
  const siblings = parent.childNodes.filter((n) => n.tagName);
  const index = siblings.indexOf(el);
  return index > 0 ? siblings[index - 1] || null : null;
}

function isStaticContextMetadata(text) {
  const t = String(text).trim();
  const dateWord = /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i;
  const contextWord = /\b(?:updated|created|released|published|source|sources|input|inputs|audience|owner|author|byline|strategy|memo|brief|report|profile|method|vision|competitor|refresh)\b/i;
  return contextWord.test(t) || dateWord.test(t) || /\b20\d{2}\b/.test(t);
}

function looksLikeStateBadge(text) {
  const t = String(text).trim().toLowerCase();
  if (/\b(?:updated|source|input|audience|owner|author|strategy|memo|brief|report|profile|method|vision|competitor|refresh)\b/.test(t)) return false;
  return /^(?:operational|degraded|partial outage|major outage|maintenance|resolved|done|open|closed|blocked|draft|discussion|accepted|rejected|withdrawn|proposed|superseded|deprecated|true|mostly true|mixed|mostly false|false|unverifiable|major release|minor release|patch|hotfix|preview|added|changed|fixed|removed|security|public|private|org|review list|published|archived)$/i.test(t);
}

function isNonZeroBorderValue(value) {
  if (!value) return false;
  return !/^\s*(?:0|none|unset|initial)\b/i.test(String(value));
}

function selectorTargetsTocContainer(selector) {
  return /(^|,)\s*(?:aside|nav|\.toc|\.contents|\.table-of-contents|\.content-nav)\b/i.test(selector);
}

function selectorTargetsTocLink(selector) {
  return /(^|,)\s*(?:aside|nav|\.toc|\.contents|\.table-of-contents|\.content-nav)\b[^,{]*\ba\b/i.test(selector);
}

function hasTocWithManyLinks(root) {
  for (const el of root.querySelectorAll('aside,nav,.toc,.contents,.table-of-contents,.content-nav')) {
    const links = el.querySelectorAll('a').filter((a) => a.text.replace(/\s+/g, ' ').trim().length > 0);
    if (links.length >= 5) return true;
  }
  return false;
}

function isTableCaptionLikeSelector(selector) {
  const s = selector.toLowerCase();
  if (/\b(?:visually-hidden|sr-only)\b/.test(s)) return false;
  if (selectorListContainsTag(s, 'caption')) return true;
  return /(?:table|tbl|matrix|scorecard|comparison|cmp)[-_a-z0-9\s>+~.#:[\]]*(?:caption|intro|lede|lead|title|summary|note)/i.test(s) ||
    /(?:caption|intro|lede|lead|summary|note)[-_a-z0-9\s>+~.#:[\]]*(?:table|tbl|matrix|scorecard|comparison|cmp)/i.test(s);
}

function isTableCellSelector(selector) {
  const s = selector.toLowerCase();
  if (/(?:^|[,\s>+~])(?:td|th)\b/.test(s)) return true;
  return /(?:table|tbl|matrix|scorecard|comparison|cmp)[-_a-z0-9\s>+~.#:[\]]*(?:cell|head|row|col|value)/i.test(s) ||
    /(?:cell|head|row|col|value)[-_a-z0-9\s>+~.#:[\]]*(?:table|tbl|matrix|scorecard|comparison|cmp)/i.test(s);
}

function looksLikeTableIntro(el, table) {
  const text = el.text.replace(/\s+/g, ' ').trim();
  if (text.length < 35 || text.length > 220) return false;
  const tag = (el.tagName || '').toLowerCase();
  if (!/^(p|div|span|small)$/i.test(tag)) return false;
  const cls = `${el.getAttribute('class') || ''} ${el.parentNode?.getAttribute?.('class') || ''} ${table.parentNode?.getAttribute?.('class') || ''}`.toLowerCase();
  return /\b(?:table|tbl|matrix|scorecard|comparison|cmp|caption|intro|lede|lead|summary|note)\b/.test(cls);
}

function fontSizeForElement(el, cssRules, cssVars) {
  const inline = declarationValue(el.getAttribute('style') || '', 'font-size');
  const inlineRem = fontSizeToRem(inline, cssVars);
  if (inlineRem !== null) return inlineRem;

  const tag = (el.tagName || '').toLowerCase();
  const classes = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
  let match = null;
  for (const { selector, declarations } of cssRules) {
    if (/::/.test(selector)) continue;
    const value = declarationValue(declarations, 'font-size');
    if (!value) continue;
    if (!selectorListCouldMatchElementNode(selector, el)) continue;
    const rem = fontSizeToRem(value, cssVars);
    if (rem !== null) match = rem;
  }
  return match;
}

function maxFontSizeForElement(el, cssRules, cssVars) {
  const inline = declarationValue(el.getAttribute('style') || '', 'font-size');
  const inlineRem = fontSizeToRem(inline, cssVars);
  let max = inlineRem;

  for (const { selector, declarations } of cssRules) {
    if (/::/.test(selector)) continue;
    const value = declarationValue(declarations, 'font-size');
    if (!value) continue;
    if (!selectorListCouldMatchElementNode(selector, el)) continue;
    const rem = fontSizeToRem(value, cssVars);
    if (rem !== null) max = max === null ? rem : Math.max(max, rem);
  }
  return max;
}

function fontWeightForElement(el, cssRules, cssVars) {
  const inline = declarationValue(el.getAttribute('style') || '', 'font-weight');
  const inlineWeight = fontWeightToNumber(inline, cssVars);
  if (inlineWeight !== null) return inlineWeight;

  const tag = (el.tagName || '').toLowerCase();
  const classes = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
  let match = null;
  for (const { selector, declarations } of cssRules) {
    if (/::/.test(selector)) continue;
    const value = declarationValue(declarations, 'font-weight');
    if (!value) continue;
    if (!selectorListCouldMatchElementNode(selector, el)) continue;
    const weight = fontWeightToNumber(value, cssVars);
    if (weight !== null) match = weight;
  }
  return match;
}

function fontWeightToNumber(value, cssVars, seen = new Set()) {
  if (!value) return null;
  const text = String(value).trim().toLowerCase().replace(/\s*!important\b/g, '');
  if (!text || text === 'inherit' || text === 'initial' || text === 'unset') return null;

  const varMatch = text.match(/^var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\)$/);
  if (varMatch) {
    const name = varMatch[1].toLowerCase();
    if (!seen.has(name) && cssVars?.has(name)) {
      seen.add(name);
      return fontWeightToNumber(cssVars.get(name), cssVars, seen);
    }
    return fontWeightToNumber(varMatch[2], cssVars, seen);
  }

  if (text === 'normal') return 400;
  if (text === 'bold') return 700;
  if (text === 'bolder') return 700;
  if (text === 'lighter') return 300;
  const numeric = text.match(/^(\d{2,4})(?:\.\d+)?$/);
  return numeric ? Number(numeric[1]) : null;
}

function selectorListCouldMatchElement(selector, tag, classes) {
  return selector.split(',').some((part) => selectorPartCouldMatchElement(part, tag, classes));
}

function selectorListCouldMatchElementNode(selector, el) {
  return selector.split(',').some((part) => selectorPartCouldMatchElementNode(part, el));
}

function selectorListContainsTag(selector, tag) {
  return selector.split(',').some((part) => new RegExp(`(?:^|[\\s>+~])${escapeRegExp(tag)}(?:$|[.#\\s>+~\\[])`, 'i').test(part.trim()));
}

function selectorPartCouldMatchElementNode(selector, el) {
  const s = selector.replace(/::?[\w-]+(?:\([^)]*\))?/g, '').trim();
  if (!s) return false;
  if (/[#:[]/.test(s)) return selectorPartCouldMatchElement(
    s,
    (el.tagName || '').toLowerCase(),
    (el.getAttribute('class') || '').split(/\s+/).filter(Boolean),
  );

  const tag = (el.tagName || '').toLowerCase();
  const classes = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
  const simpleParts = s.split(/\s*[>+~]\s*|\s+/).filter(Boolean);
  const target = simpleParts.at(-1) || s;
  const targetTag = target.match(/^[a-z][\w-]*/i)?.[0]?.toLowerCase() || null;
  if (targetTag && targetTag !== tag) return false;

  const targetClasses = [...target.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  if (targetClasses.some((cls) => !classes.includes(cls))) return false;

  const ancestorClassMatches = [...s.matchAll(/\.([\w-]+)/g)]
    .map((m) => m[1])
    .filter((cls) => !targetClasses.includes(cls));
  for (const cls of ancestorClassMatches) {
    if (!hasAncestorWithClass(el, cls)) return false;
  }

  return Boolean(targetTag || targetClasses.length || ancestorClassMatches.length);
}

function selectorPartCouldMatchElement(selector, tag, classes) {
  const s = selector.replace(/::?[\w-]+(?:\([^)]*\))?/g, '').trim();
  if (!s) return false;
  for (const cls of classes) {
    if (new RegExp(`\\.${escapeRegExp(cls)}(?:\\b|$)`).test(s)) return true;
  }
  return new RegExp(`(?:^|[\\s>+~])${escapeRegExp(tag)}(?:$|[.#\\s>+~\\[])`, 'i').test(s);
}

function hasAncestorWithClass(el, className) {
  let cur = el.parentNode;
  while (cur && cur.parentNode) {
    const classes = (cur.getAttribute?.('class') || '').split(/\s+/).filter(Boolean);
    if (classes.includes(className)) return true;
    cur = cur.parentNode;
  }
  return false;
}

function fontSizeToRem(value, cssVars, seen = new Set()) {
  if (!value) return null;
  const text = String(value).trim().toLowerCase().replace(/\s*!important\b/g, '');
  if (!text || text === 'inherit' || text === 'initial' || text === 'unset') return null;

  const varMatch = text.match(/^var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\)$/);
  if (varMatch) {
    const name = varMatch[1].toLowerCase();
    if (!seen.has(name) && cssVars?.has(name)) {
      seen.add(name);
      return fontSizeToRem(cssVars.get(name), cssVars, seen);
    }
    return fontSizeToRem(varMatch[2], cssVars, seen);
  }

  if (/^clamp\(/.test(text)) {
    const lengths = [...text.matchAll(/(-?[\d.]+)\s*(rem|em|px|%)/g)]
      .map((m) => lengthToRem(Number(m[1]), m[2]));
    return lengths.length ? Math.max(...lengths) : null;
  }

  const m = text.match(/^(-?[\d.]+)\s*(rem|em|px|%)$/);
  return m ? lengthToRem(Number(m[1]), m[2]) : null;
}

function lengthToRem(number, unit) {
  if (!Number.isFinite(number)) return null;
  if (unit === 'rem' || unit === 'em') return number;
  if (unit === 'px') return number / 16;
  if (unit === '%') return number / 100;
  return null;
}

function isInDocumentHeader(el) {
  let cur = el;
  while (cur && cur.parentNode) {
    const tag = (cur.tagName || '').toLowerCase();
    const cls = (cur.getAttribute?.('class') || '').toLowerCase();
    if (tag === 'header') return true;
    if (/\b(hero|header|intro|title|meta|eyebrow|byline)\b/.test(cls)) return true;
    cur = cur.parentNode;
  }
  return false;
}

function isInsideHeading(el) {
  let cur = el;
  while (cur && cur.parentNode) {
    const tag = (cur.tagName || '').toLowerCase();
    if (/^h[1-6]$/.test(tag)) return true;
    cur = cur.parentNode;
  }
  return false;
}

function dominantStrongRatio(el, fullText) {
  const total = String(fullText || '').replace(/\s+/g, ' ').trim().length;
  if (total === 0) return 0;
  let strongChars = 0;
  for (const strong of el.querySelectorAll('strong,b')) {
    strongChars += strong.text.replace(/\s+/g, ' ').trim().length;
  }
  return strongChars / total;
}

function looksLikeKicker(text) {
  if (!text || text.length > 32) return false;
  if (/^\d/.test(text)) return false;
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 4) return false;
  const letters = text.replace(/[^a-z]/gi, '');
  if (letters.length < 2) return false;
  return letters === letters.toUpperCase();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toEmLetterSpacing(value, declarations) {
  const text = String(value).trim().toLowerCase();
  if (text === 'normal' || text === '0') return 0;
  const em = text.match(/^(-?[\d.]+)em$/);
  if (em) return Number(em[1]);
  const px = text.match(/^(-?[\d.]+)px$/);
  if (!px) return null;
  const fontSize = declarationValue(declarations, 'font-size');
  const pxSize = fontSize?.match(/^([\d.]+)px$/);
  return pxSize ? Number(px[1]) / Number(pxSize[1]) : Number(px[1]) / 16;
}

function maxShadowBlurPx(shadow) {
  let max = 0;
  const layers = String(shadow).split(/,(?![^()]*\))/);
  for (const layer of layers) {
    const lengths = [...layer.matchAll(/(-?[\d.]+)(px)?\b/g)]
      .filter((m) => m[2] || Number(m[1]) === 0)
      .map((m) => Math.abs(Number(m[1])));
    if (lengths.length >= 3) max = Math.max(max, lengths[2]);
  }
  return max;
}

function parseGradientStops(content) {
  // Extract color stops from a gradient() body
  const stops = [];
  // Find color values (hex / rgb / oklch / named)
  const colorRe = /#[0-9a-f]{3,8}\b|rgba?\([^)]+\)|oklch\([^)]+\)|hsla?\([^)]+\)|\b(purple|magenta|fuchsia|hotpink|violet|orchid|cyan|indigo|teal|amber|emerald)\b/gi;
  let m;
  while ((m = colorRe.exec(content))) {
    const parsed = safeParseColor(m[0]);
    if (parsed) stops.push(parsed);
  }
  return stops;
}

function isGenericAiGradient(stops) {
  // Detect: ≥2 stops where ≥2 fall into the purple/pink/indigo/cyan corridor.
  // OKLCH hue 220-340 = blue→violet→pink. Chroma > 0.10 = saturated.
  let inCorridor = 0;
  for (const stop of stops) {
    const oklch = toOklch(stop);
    if (!oklch) continue;
    // Without real OKLCH conversion we use a proxy — check RGB pattern
    if (stop.mode === 'rgb' && stop.r !== undefined) {
      const { r, g, b } = stop;
      // Purple/pink: high R + high B, low G
      const isPurplePink = b > 0.5 && r > 0.3 && g < r * 0.7 && g < b * 0.7;
      // Indigo/cyan: high B, low R, mid G
      const isIndigoCyan = b > 0.6 && r < 0.3 && g > 0.3;
      if (isPurplePink || isIndigoCyan) inCorridor++;
    }
    if (oklch.c > 0.10) {
      // generic high-chroma stop is a clue but not conclusive
    }
  }
  return inCorridor >= 2;
}

// ============================================================
// Engine
// ============================================================

const SEVERITY_ORDER = ['error', 'warn', 'info'];

export async function detect({ html, path, rules = 'all', skip = [], severityOverrides = {}, brandProfile = null, providers = [], mode = null } = {}) {
  const rawHtml = html ?? (path ? readFileSync(path, 'utf8') : '');
  if (!rawHtml) throw new Error('detect: no html or path provided');
  const artifactMode = normalizeArtifactMode(mode);
  const ctx = buildContext(rawHtml, brandProfile, artifactMode);
  const skipSet = new Set(skip);
  const providerSet = new Set(providers);
  const allowed = rules === 'all' ? RULES : RULES.filter((r) => rules.includes(r.id));
  const findings = [];
  for (const r of allowed) {
    if (skipSet.has(r.id)) continue;
    if (r.provider && !providerSet.has(r.provider)) continue;
    try {
      const raw = r.run(ctx) || [];
      for (let i = 0; i < raw.length; i++) {
        const f = raw[i];
        const severity = f.severity || severityOverrides[r.id] || r.defaultSeverity;
        findings.push({
          ruleId: r.id,
          category: r.category,
          severity,
          // Include rule-finding-index in dedup key so per-instance findings don't collapse
          _dedupKey: `${r.id}:${f.locator}:${i}`,
          ...f,
        });
      }
    } catch (err) {
      findings.push({
        ruleId: r.id, category: r.category, severity: 'warn', locator: 'engine',
        message: `rule errored: ${err.message}`,
        _dedupKey: `${r.id}:engine`,
      });
    }
  }
  // Dedup by per-finding key (includes index so multi-instance findings preserve)
  const seen = new Map();
  for (const f of findings) seen.set(f._dedupKey, f);
  const out = [...seen.values()].map(({ _dedupKey, ...rest }) => rest);
  out.sort((a, b) => {
    const sa = SEVERITY_ORDER.indexOf(a.severity), sb = SEVERITY_ORDER.indexOf(b.severity);
    if (sa !== sb) return sa - sb;
    if (a.ruleId !== b.ruleId) return a.ruleId.localeCompare(b.ruleId);
    return (a.locator || '').localeCompare(b.locator || '');
  });
  return out;
}

// ============================================================
// CLI
// ============================================================

function loadConfig(configPath) {
  if (!configPath) {
    let dir = process.cwd();
    while (true) {
      const candidate = join(dir, '.visualize-detect.json');
      if (existsSync(candidate)) return JSON.parse(readFileSync(candidate, 'utf8'));
      const parent = dirname(dir);
      if (parent === dir) return {};
      dir = parent;
    }
  }
  if (!existsSync(configPath)) {
    console.error(`config not found: ${configPath}`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(configPath, 'utf8'));
}

function autoLoadBrand(filePath) {
  // Walk up from the artifact's directory to find DESIGN.md
  let dir = dirname(resolve(filePath));
  while (true) {
    const candidate = join(dir, 'DESIGN.md');
    if (existsSync(candidate)) return loadBrandProfile(candidate);
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function formatHuman(findings, fileLabel, supportsColor) {
  const c = supportsColor ? {
    red: (s) => `\x1b[31m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`,
    dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`,
  } : { red: (s) => s, yellow: (s) => s, dim: (s) => s, bold: (s) => s };
  const sym = { error: c.red('×'), warn: c.yellow('⚠'), info: c.dim('·') };
  const lines = [];
  if (fileLabel) lines.push(c.bold(fileLabel));
  for (const f of findings) {
    lines.push(`  ${sym[f.severity] || '·'} ${f.ruleId.padEnd(36)}  ${f.locator || ''}`);
    lines.push(c.dim(`      ${f.message}`));
    if (f.snippet) lines.push(c.dim(`      ${f.snippet.split('\n').join(' ')}`));
    if (f.suggestion) lines.push(c.dim(`      → ${f.suggestion}`));
  }
  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node detect.mjs [options] <html-file>');
    console.log('Options:');
    console.log('  --strict             exit 2 on any error finding');
    console.log('  --json               NDJSON output');
    console.log('  --skip <ids>         comma-separated rule IDs to skip');
    console.log('  --config <path>      .visualize-detect.json path');
    console.log('  --brand <path>       DESIGN.md path (auto-loaded otherwise)');
    console.log('  --provider <name>    enable provider-gated rules (codex, gemini)');
    console.log('  --mode <name>        artifact mode for context-aware rules (document, canvas, dashboard, deck)');
    console.log('  --codex              shortcut for --provider codex');
    console.log('  --gemini             shortcut for --provider gemini');
    console.log('  --list-rules         print every rule (id, category, severity, description) and exit');
    console.log('  --list-rules --json  same, as a single JSON array');
    process.exit(0);
  }
  if (args.includes('--list-rules')) {
    const out = RULES.map((r) => ({
      id: r.id, category: r.category,
      defaultSeverity: r.defaultSeverity, provider: r.provider || null, description: r.description,
    }));
    if (args.includes('--json')) {
      console.log(JSON.stringify(out, null, 2));
    } else {
      const byCat = new Map();
      for (const r of out) {
        if (!byCat.has(r.category)) byCat.set(r.category, []);
        byCat.get(r.category).push(r);
      }
      const sevSym = { error: '×', warn: '⚠', info: '·' };
      for (const [cat, rules] of byCat) {
        console.log(`\n${cat} (${rules.length})`);
        for (const r of rules) {
          console.log(`  ${sevSym[r.defaultSeverity] || '·'} ${r.id.padEnd(36)} ${r.description}`);
        }
      }
      console.log(`\n${out.length} rule(s) total`);
    }
    process.exit(0);
  }
  let strict = false, json = false, configPath = null, brandPath = null, mode = null;
  let providers = [];
  let skip = [];
  const files = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--strict') strict = true;
    else if (a === '--json') json = true;
    else if (a === '--skip') skip = args[++i].split(',');
    else if (a === '--config') configPath = args[++i];
    else if (a === '--brand') brandPath = args[++i];
    else if (a === '--mode') mode = args[++i];
    else if (a === '--provider') providers.push(args[++i]);
    else if (a === '--codex') providers.push('codex');
    else if (a === '--gemini') providers.push('gemini');
    else if (a.startsWith('--')) { console.error(`unknown flag: ${a}`); process.exit(1); }
    else files.push(a);
  }
  if (files.length === 0) { console.error('error: no input file'); process.exit(1); }

  const config = loadConfig(configPath);
  skip = [...new Set([...skip, ...(config.skip || [])])];
  providers = [...new Set([...providers, ...(config.providers || [])])];
  const severityOverrides = config.severityOverrides || {};

  const supportsColor = !json && process.stdout.isTTY && !process.env.NO_COLOR;
  let totalErrors = 0, totalWarnings = 0, totalInfo = 0;
  const startedAt = Date.now();

  for (const file of files) {
    if (!existsSync(file)) { console.error(`error: file not found: ${file}`); process.exit(1); }
    if (!statSync(file).isFile()) { console.error(`error: not a file: ${file}`); process.exit(1); }
    const brandProfile = brandPath ? loadBrandProfile(brandPath) : autoLoadBrand(file);
    const findings = await detect({
      path: file,
      rules: !config.rules || config.rules === 'all' ? 'all' : config.rules,
      skip, severityOverrides, brandProfile, providers, mode,
    });
    for (const f of findings) {
      if (f.severity === 'error') totalErrors++;
      else if (f.severity === 'warn') totalWarnings++;
      else totalInfo++;
    }
    if (json) {
      for (const f of findings) console.log(JSON.stringify({ type: 'finding', file, ...f }));
    } else {
      const text = formatHuman(findings, files.length > 1 ? file : null, supportsColor);
      if (text) console.log(text);
    }
  }

  const durationMs = Date.now() - startedAt;
  if (json) {
    const rulesRan = RULES.filter((r) => !skip.includes(r.id) && (!r.provider || providers.includes(r.provider))).length;
    console.log(JSON.stringify({ type: 'summary', errors: totalErrors, warnings: totalWarnings, info: totalInfo, rulesRan, filesScanned: files.length, durationMs }));
  } else {
    const total = totalErrors + totalWarnings + totalInfo;
    const rulesRan = RULES.filter((r) => !skip.includes(r.id) && (!r.provider || providers.includes(r.provider))).length;
    if (total === 0) console.log(`\nOK · ${rulesRan} rules clean across ${files.length} file(s) · ${durationMs}ms`);
    else console.log(`\n${strict && totalErrors > 0 ? 'exit 2' : 'exit 0'} · ${totalErrors} error · ${totalWarnings} warning · ${totalInfo} info · ${durationMs}ms`);
  }
  process.exit(strict && totalErrors > 0 ? 2 : 0);
}

// Entry-point check via real-path equality so the script runs through
// symlinks (e.g. ~/.claude/skills/visualize/ → ~/.agents/skills/...).
// Naive `import.meta.url === file://${argv[1]}` fails on symlinks
// because Node resolves the symlink in import.meta.url but not in argv.
function isMain() {
  try {
    return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1]);
  } catch {
    return false;
  }
}

if (isMain()) {
  main().catch((err) => { console.error(`crash: ${err.message}`); process.exit(1); });
}
