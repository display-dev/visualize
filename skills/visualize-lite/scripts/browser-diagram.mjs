#!/usr/bin/env node
// Rendered geometry checks for trusted, locally authored Visualize diagrams.
// Launches a real browser: do not point it at hostile or unknown HTML.

import { existsSync, realpathSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  Browser,
  BrowserTag,
  computeSystemExecutablePath,
  detectBrowserPlatform,
  install,
  puppeteer,
  resolveBuildId,
} from './vendor/puppeteer.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, '..', 'fixtures', 'diagrams');
const CACHE_DIR = process.env.VISUALIZE_PUPPETEER_CACHE_DIR || join(homedir(), '.cache', 'visualize-skill', 'puppeteer');
const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};
const RULES = [
  { id: 'diagram/clipping', category: 'diagram', defaultSeverity: 'error', description: 'Node, label, or meaningful edge geometry leaves its SVG or figure bounds.' },
  { id: 'diagram/node-overlap', category: 'diagram', defaultSeverity: 'error', description: 'Peer diagram nodes overlap materially.' },
  { id: 'diagram/label-overlap', category: 'diagram', defaultSeverity: 'error', description: 'Diagram labels overlap materially.' },
  { id: 'diagram/edge-through-node', category: 'diagram', defaultSeverity: 'error', description: 'An edge passes through an unrelated node.' },
  { id: 'diagram/edge-intersection', category: 'diagram', defaultSeverity: 'warn', description: 'Two unrelated edge interiors intersect.' },
  { id: 'diagram/edge-coincident', category: 'diagram', defaultSeverity: 'warn', description: 'Two edge interiors are materially coincident.' },
  { id: 'diagram/edge-geometry', category: 'diagram', defaultSeverity: 'error', description: 'A declared edge is hidden or has no usable rendered length.' },
  { id: 'diagram/endpoint-distance', category: 'diagram', defaultSeverity: 'error', description: 'A declared edge endpoint terminates implausibly far from its node.' },
  { id: 'diagram/contrast', category: 'diagram', defaultSeverity: 'error', description: 'Computed diagram text, fill, or stroke contrast is unreadable.' },
  { id: 'diagram/aspect-ratio', category: 'diagram', defaultSeverity: 'warn', description: 'Rendered diagram aspect ratio is extreme.' },
  { id: 'diagram/network-dependency', category: 'diagram', defaultSeverity: 'error', description: 'A delivered diagram requests a non-inline resource.' },
];

async function resolveChromeExecutable() {
  if (process.env.VISUALIZE_SKIP_SYSTEM_CHROME !== '1') {
    try { return computeSystemExecutablePath({ browser: Browser.CHROME, channel: 'stable' }); } catch { /* managed fallback */ }
  }
  const platform = detectBrowserPlatform();
  if (!platform) throw new Error('unsupported platform for managed Chrome fallback');
  const buildId = await resolveBuildId(Browser.CHROME, platform, BrowserTag.STABLE);
  const result = await install({ browser: Browser.CHROME, cacheDir: CACHE_DIR, buildId, buildIdAlias: BrowserTag.STABLE });
  return result.executablePath;
}

function parseArgs(argv) {
  const raw = argv.slice(2);
  const options = { strict: false, json: false, listRules: false, selfTest: false, theme: 'both', files: [] };
  for (let i = 0; i < raw.length; i++) {
    const arg = raw[i];
    if (arg === '--strict') options.strict = true;
    else if (arg === '--json') options.json = true;
    else if (arg === '--list-rules') options.listRules = true;
    else if (arg === '--self-test') options.selfTest = true;
    else if (arg === '--theme') options.theme = raw[++i];
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg.startsWith('--')) throw new Error(`unknown flag: ${arg}`);
    else options.files.push(resolve(arg));
  }
  if (!['light', 'dark', 'both'].includes(options.theme)) throw new Error(`invalid --theme value: ${options.theme}`);
  return options;
}

function emitFinding(json, file, finding) {
  if (json) process.stdout.write(`${JSON.stringify({ type: 'finding', file, ...finding })}\n`);
  else {
    const symbol = { error: '×', warn: '⚠', info: '·' }[finding.severity];
    console.log(`  ${symbol} ${finding.ruleId.padEnd(32)} ${finding.locator}`);
    console.log(`      ${finding.message}`);
    if (finding.snippet) console.log(`      ${finding.snippet}`);
  }
}

async function inspectState(page, viewportName, theme) {
  await page.setViewport(VIEWPORTS[viewportName]);
  await page.evaluate((selectedTheme) => { document.documentElement.dataset.theme = selectedTheme; }, theme);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
  return page.evaluate(({ viewportName: vp, theme: selectedTheme }) => {
    const findings = [];
    const TOLERANCE = 2;
    const ENDPOINT_TOLERANCE = 24;
    const PORT_TOLERANCE = 12;
    const locator = (figure, value) => `figure[data-visualize-diagram="${figure.dataset.visualizeDiagram}"] ${value}`;
    const finding = (ruleId, severity, figure, target, message, snippet) => findings.push({
      ruleId, category: 'diagram', severity, locator: locator(figure, target), message: `${message} (${vp}, ${selectedTheme}).`, ...(snippet ? { snippet } : {}),
    });
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const hasGeometry = el instanceof SVGGraphicsElement ? rect.width > 0 || rect.height > 0 : rect.width > 0 && rect.height > 0;
      return hasGeometry && style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0;
    };
    const rectOf = (el) => {
      const r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
    };
    const expand = (r, amount) => ({ left: r.left - amount, top: r.top - amount, right: r.right + amount, bottom: r.bottom + amount, width: r.width + 2 * amount, height: r.height + 2 * amount });
    const contains = (r, p, tol = TOLERANCE) => p.x >= r.left - tol && p.x <= r.right + tol && p.y >= r.top - tol && p.y <= r.bottom + tol;
    const rectInside = (inner, outer) => inner.left >= outer.left - TOLERANCE && inner.right <= outer.right + TOLERANCE && inner.top >= outer.top - TOLERANCE && inner.bottom <= outer.bottom + TOLERANCE;
    const intersection = (a, b) => ({ width: Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)), height: Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)) });
    const distanceToRect = (p, r) => Math.hypot(Math.max(r.left - p.x, 0, p.x - r.right), Math.max(r.top - p.y, 0, p.y - r.bottom));
    const pairKey = (a, b) => JSON.stringify([a, b].sort());
    const orientation = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const segmentIntersection = (a, b, c, d) => {
      const denominator = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);
      if (Math.abs(denominator) < 0.01) return null;
      const t = ((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / denominator;
      const u = -((a.x - b.x) * (a.y - c.y) - (a.y - b.y) * (a.x - c.x)) / denominator;
      if (t < -0.001 || t > 1.001 || u < -0.001 || u > 1.001) return null;
      return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
    };
    const coincidentLength = (a, b, c, d) => {
      const ab = Math.hypot(b.x - a.x, b.y - a.y);
      if (ab < 1 || Math.abs(orientation(a, b, c)) > ab * 1.5 || Math.abs(orientation(a, b, d)) > ab * 1.5) return 0;
      const ux = (b.x - a.x) / ab; const uy = (b.y - a.y) / ab;
      const start = Math.max(0, Math.min((c.x - a.x) * ux + (c.y - a.y) * uy, (d.x - a.x) * ux + (d.y - a.y) * uy));
      const end = Math.min(ab, Math.max((c.x - a.x) * ux + (c.y - a.y) * uy, (d.x - a.x) * ux + (d.y - a.y) * uy));
      return Math.max(0, end - start);
    };
    const colorCanvas = document.createElement('canvas');
    colorCanvas.width = 1; colorCanvas.height = 1;
    const colorContext = colorCanvas.getContext('2d', { willReadFrequently: true });
    const rgb = (value) => {
      const match = String(value).match(/rgba?\((\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)[,\s]+(\d+(?:\.\d+)?)(?:[,/\s]+([\d.]+))?\)/);
      if (match) return { r: +match[1], g: +match[2], b: +match[3], a: match[4] === undefined ? 1 : +match[4] };
      if (!colorContext || !CSS.supports('color', String(value))) return null;
      colorContext.clearRect(0, 0, 1, 1);
      colorContext.fillStyle = String(value);
      colorContext.fillRect(0, 0, 1, 1);
      const [r, g, b, alpha] = colorContext.getImageData(0, 0, 1, 1).data;
      return { r, g, b, a: alpha / 255 };
    };
    const paintColor = (el, property) => {
      const style = getComputedStyle(el);
      const color = rgb(style[property]);
      if (!color) return null;
      const propertyOpacity = property === 'fill' ? Number(style.fillOpacity || 1) : Number(style.strokeOpacity || 1);
      let opacity = Number.isFinite(propertyOpacity) ? propertyOpacity : 1;
      for (let cur = el; cur && cur !== document.documentElement; cur = cur.parentElement) {
        const ownOpacity = Number(getComputedStyle(cur).opacity || 1);
        opacity *= Number.isFinite(ownOpacity) ? ownOpacity : 1;
      }
      return { ...color, a: color.a * opacity };
    };
    const luminance = (color) => {
      const channel = (v) => { const n = v / 255; return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
    };
    const ratio = (a, b) => { const x = luminance(a); const y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const composite = (foreground, background) => ({
      r: foreground.r * foreground.a + background.r * (1 - foreground.a),
      g: foreground.g * foreground.a + background.g * (1 - foreground.a),
      b: foreground.b * foreground.a + background.b * (1 - foreground.a),
      a: 1,
    });
    const effectiveBackground = (el, stop) => {
      let base = rgb(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
      if (base.a < 1) base = composite(base, { r: 255, g: 255, b: 255, a: 1 });
      const svgBackground = rgb(getComputedStyle(stop).backgroundColor);
      if (svgBackground && svgBackground.a > 0) base = composite(svgBackground, base);
      const box = el.getBoundingClientRect();
      const center = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      const paintedAt = (candidate, point) => {
        if (!contains(rectOf(candidate), point, 0) || !(candidate instanceof SVGGeometryElement)) return false;
        const matrix = candidate.getScreenCTM();
        if (!matrix) return false;
        try {
          const local = new DOMPoint(point.x, point.y).matrixTransform(matrix.inverse());
          return candidate.isPointInFill(local);
        } catch { return false; }
      };
      const precedingShapes = [...stop.querySelectorAll('rect,circle,ellipse,path,polygon')]
        .filter((candidate) => Boolean(candidate.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING))
        .filter((candidate) => paintedAt(candidate, center))
        .reverse();
      for (const candidate of precedingShapes) {
        const underFill = paintColor(candidate, 'fill');
        if (underFill && underFill.a > 0) return composite(underFill, base);
      }
      const stack = document.elementsFromPoint(box.left + box.width / 2, box.top + box.height / 2);
      const ownIndex = stack.indexOf(el);
      if (ownIndex >= 0) {
        for (const candidate of stack.slice(ownIndex + 1)) {
          if (!stop.contains(candidate) || candidate === stop || el.contains(candidate) || candidate.contains(el)) continue;
          if (!candidate.matches('rect,circle,ellipse,path,polygon')) continue;
          const underFill = paintColor(candidate, 'fill');
          if (underFill && underFill.a > 0) return composite(underFill, base);
        }
      }
      return base;
    };
    const sampleEdge = (edge, spacing = 5) => {
      const length = edge.getTotalLength();
      const matrix = edge.getScreenCTM();
      if (!matrix) return [];
      const screenScale = Math.max(Math.hypot(matrix.a, matrix.b), Math.hypot(matrix.c, matrix.d));
      const steps = Math.max(2, Math.min(spacing === 1 ? 4000 : 1000, Math.ceil(length * screenScale / spacing)));
      const points = [];
      for (let i = 0; i <= steps; i++) {
        const local = edge.getPointAtLength(length * i / steps);
        const transformed = new DOMPoint(local.x, local.y).matrixTransform(matrix);
        points.push({ x: transformed.x, y: transformed.y });
      }
      return points;
    };

    for (const figure of document.querySelectorAll('figure[data-visualize-diagram]')) {
      if (!visible(figure)) continue;
      const svg = figure.querySelector('svg');
      if (!svg || !visible(svg)) continue;
      const svgRect = rectOf(svg); const figureRect = rectOf(figure);
      const aspect = svgRect.width / svgRect.height;
      if (aspect > 8 || aspect < 0.125) finding('diagram/aspect-ratio', 'warn', figure, 'svg', `Rendered aspect ratio ${aspect.toFixed(2)} is extreme`);

      const nodeEls = [...svg.querySelectorAll('[data-diagram-node]')].filter(visible);
      const nodes = nodeEls.map((el) => ({ el, id: el.dataset.diagramNode, parent: el.dataset.diagramParent || '', rect: rectOf(el) }));
      const labels = [...svg.querySelectorAll('text')].filter(visible).map((el) => ({ el, rect: rectOf(el), id: el.dataset.diagramLabel || el.textContent.trim().slice(0, 40) }));
      const declaredEdgeEls = [...svg.querySelectorAll('path[data-diagram-edge],line[data-diagram-edge],polyline[data-diagram-edge]')];
      const usableEdge = (edge) => {
        if (!visible(edge)) return false;
        const style = getComputedStyle(edge);
        const stroke = paintColor(edge, 'stroke');
        if (!stroke || stroke.a <= 0.05 || !(parseFloat(style.strokeWidth) > 0)) return false;
        try { return edge.getTotalLength() >= 1; } catch { return false; }
      };
      for (const edge of declaredEdgeEls) if (!usableEdge(edge)) finding('diagram/edge-geometry', 'error', figure, `[data-diagram-edge="${edge.dataset.diagramEdge || ''}"]`, `Edge "${edge.dataset.diagramEdge || '(empty)'}" is hidden or has no usable rendered length`);
      const edgeEls = declaredEdgeEls.filter(usableEdge);
      const edges = edgeEls.map((el) => ({ el, id: el.dataset.diagramEdge, from: el.dataset.from, to: el.dataset.to, points: sampleEdge(el), nodePoints: sampleEdge(el, 1) }));
      const nodeById = new Map(nodes.map((node) => [node.id, node]));
      const overlapExemptions = new Set(figure.dataset.visualizeDiagram === 'spatial'
        ? [...svg.querySelectorAll('[data-diagram-overlap-ok]')]
          .filter((el) => el.dataset.nodeA && el.dataset.nodeB && el.dataset.nodeA !== el.dataset.nodeB && el.dataset.reason && nodeById.has(el.dataset.nodeA) && nodeById.has(el.dataset.nodeB))
          .map((el) => pairKey(el.dataset.nodeA, el.dataset.nodeB))
        : []);

      for (const node of nodes) if (!rectInside(node.rect, svgRect) || !rectInside(node.rect, figureRect)) finding('diagram/clipping', 'error', figure, `[data-diagram-node="${node.id}"]`, `Node "${node.id}" leaves its bounds`);
      for (const label of labels) if (!rectInside(label.rect, svgRect) || !rectInside(label.rect, figureRect)) finding('diagram/clipping', 'error', figure, 'text', `Label "${label.id}" leaves its bounds`);
      for (const edge of edges) if (edge.points.some((point) => !contains(svgRect, point) || !contains(figureRect, point))) finding('diagram/clipping', 'error', figure, `[data-diagram-edge="${edge.id}"]`, `Edge "${edge.id}" leaves its bounds`);

      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].parent !== nodes[j].parent) continue;
        if (overlapExemptions.has(pairKey(nodes[i].id, nodes[j].id))) continue;
        const overlap = intersection(nodes[i].rect, nodes[j].rect);
        if (overlap.width > 2 && overlap.height > 2 && overlap.width * overlap.height > 16) finding('diagram/node-overlap', 'error', figure, `[data-diagram-node="${nodes[i].id}"]`, `Peer nodes "${nodes[i].id}" and "${nodes[j].id}" overlap`);
      }
      for (let i = 0; i < labels.length; i++) for (let j = i + 1; j < labels.length; j++) {
        const overlap = intersection(labels[i].rect, labels[j].rect);
        if (overlap.width > 2 && overlap.height > 2) finding('diagram/label-overlap', 'error', figure, 'text', `Diagram labels "${labels[i].id}" and "${labels[j].id}" overlap`);
      }

      for (const edge of edges) {
        const from = nodeById.get(edge.from); const to = nodeById.get(edge.to);
        if (edge.points.length > 0) {
          if (from && distanceToRect(edge.points[0], from.rect) > ENDPOINT_TOLERANCE) finding('diagram/endpoint-distance', 'error', figure, `[data-diagram-edge="${edge.id}"]`, `Edge "${edge.id}" starts too far from "${edge.from}"`);
          if (to && distanceToRect(edge.points.at(-1), to.rect) > ENDPOINT_TOLERANCE) finding('diagram/endpoint-distance', 'error', figure, `[data-diagram-edge="${edge.id}"]`, `Edge "${edge.id}" ends too far from "${edge.to}"`);
        }
        for (const node of nodes) {
          if (node.id === edge.from || node.id === edge.to) continue;
          if (edge.nodePoints.slice(1, -1).some((point) => contains(expand(node.rect, -2), point, 0))) {
            finding('diagram/edge-through-node', 'error', figure, `[data-diagram-edge="${edge.id}"]`, `Edge "${edge.id}" passes through unrelated node "${node.id}"`);
            break;
          }
        }
      }

      const edgeIds = new Set(edges.map((edge) => edge.id).filter(Boolean));
      const exemptions = new Set([...svg.querySelectorAll('[data-diagram-crossing-ok]')]
        .filter((el) => el.dataset.edgeA && el.dataset.edgeB && el.dataset.edgeA !== el.dataset.edgeB && el.dataset.reason && edgeIds.has(el.dataset.edgeA) && edgeIds.has(el.dataset.edgeB))
        .map((el) => pairKey(el.dataset.edgeA, el.dataset.edgeB)));
      for (let i = 0; i < edges.length; i++) for (let j = i + 1; j < edges.length; j++) {
        const a = edges[i]; const b = edges[j]; const pair = pairKey(a.id, b.id);
        if (exemptions.has(pair)) continue;
        const sharedId = [a.from, a.to].find((id) => id === b.from || id === b.to);
        const sharedRect = sharedId && nodeById.has(sharedId) ? expand(nodeById.get(sharedId).rect, PORT_TOLERANCE) : null;
        let crosses = false; let coincident = false;
        for (let ai = 1; ai < a.points.length && (!crosses || !coincident); ai++) for (let bi = 1; bi < b.points.length && (!crosses || !coincident); bi++) {
          const point = segmentIntersection(a.points[ai - 1], a.points[ai], b.points[bi - 1], b.points[bi]);
          if (point && !(sharedRect && contains(sharedRect, point, 0))) crosses = true;
          if (coincidentLength(a.points[ai - 1], a.points[ai], b.points[bi - 1], b.points[bi]) > 3) {
            const midpoint = { x: (a.points[ai - 1].x + a.points[ai].x) / 2, y: (a.points[ai - 1].y + a.points[ai].y) / 2 };
            if (!(sharedRect && contains(sharedRect, midpoint, 0))) coincident = true;
          }
        }
        if (crosses) finding('diagram/edge-intersection', 'warn', figure, `[data-diagram-edge="${a.id}"]`, `Edges "${a.id}" and "${b.id}" intersect away from a shared declared endpoint`);
        if (coincident) finding('diagram/edge-coincident', 'warn', figure, `[data-diagram-edge="${a.id}"]`, `Edges "${a.id}" and "${b.id}" are materially coincident`);
      }

      for (const text of svg.querySelectorAll('text')) {
        if (!visible(text)) continue;
        const fg = paintColor(text, 'fill'); const bg = effectiveBackground(text, svg);
        if (!fg || fg.a < 0.05 || !bg) continue;
        const style = getComputedStyle(text); const threshold = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700) ? 3 : 4.5;
        const value = ratio(composite(fg, bg), bg);
        if (value + 0.01 < threshold) finding('diagram/contrast', 'error', figure, `text("${text.textContent.trim().slice(0, 40)}")`, `Text contrast ${value.toFixed(2)}:1 is below ${threshold}:1`);
      }
      for (const edge of edgeEls) {
        const stroke = paintColor(edge, 'stroke'); const bg = effectiveBackground(edge, svg);
        if (stroke && stroke.a > 0.05 && bg) { const value = ratio(composite(stroke, bg), bg); if (value + 0.01 < 3) finding('diagram/contrast', 'error', figure, `[data-diagram-edge="${edge.dataset.diagramEdge}"]`, `Edge stroke contrast ${value.toFixed(2)}:1 is below 3:1`); }
      }
      for (const node of nodeEls) {
        const shape = node.matches('rect,circle,ellipse,path,polygon') ? node : node.querySelector('rect,circle,ellipse,path,polygon');
        if (!shape) continue;
        const fill = paintColor(shape, 'fill'); const stroke = paintColor(shape, 'stroke'); const bg = effectiveBackground(shape, svg);
        if (bg) {
          const fillRatio = fill && fill.a > 0.05 ? ratio(composite(fill, bg), bg) : 1;
          const strokeRatio = stroke && stroke.a > 0.05 ? ratio(composite(stroke, bg), bg) : 1;
          const value = Math.max(fillRatio, strokeRatio);
          if (value + 0.01 < 3) finding('diagram/contrast', 'error', figure, `[data-diagram-node="${node.dataset.diagramNode}"]`, `Node fill/stroke contrast ${value.toFixed(2)}:1 is below 3:1`);
        }
      }
    }
    return findings;
  }, { viewportName, theme });
}

async function inspectStaticEdges(page, viewportName) {
  await page.setViewport(VIEWPORTS[viewportName]);
  return page.evaluate((vp) => {
    const findings = [];
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const hasGeometry = el instanceof SVGGraphicsElement ? rect.width > 0 || rect.height > 0 : rect.width > 0 && rect.height > 0;
      return hasGeometry && style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0;
    };
    for (const figure of document.querySelectorAll('figure[data-visualize-diagram]')) {
      if (!visible(figure)) continue;
      const svg = figure.querySelector('svg');
      if (!svg || !visible(svg)) continue;
      for (const edge of svg.querySelectorAll('path[data-diagram-edge],line[data-diagram-edge],polyline[data-diagram-edge]')) {
        let length = 0;
        try { length = edge.getTotalLength(); } catch { /* invalid path data */ }
        if (length >= 1) continue;
        const id = edge.dataset.diagramEdge || '(empty)';
        findings.push({
          ruleId: 'diagram/edge-geometry', category: 'diagram', severity: 'error',
          locator: `figure[data-visualize-diagram="${figure.dataset.visualizeDiagram}"] [data-diagram-edge="${edge.dataset.diagramEdge || ''}"]`,
          message: `Edge "${id}" has no usable geometry in delivered markup (${vp}, JavaScript disabled).`,
        });
      }
    }
    return findings;
  }, viewportName);
}

async function findingsForFile(browser, file, themes) {
  const page = await browser.newPage();
  try {
    const blockedRequests = new Set();
    const pageUrl = pathToFileURL(file).href;
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      const isMainDocument = request.isNavigationRequest() && request.frame() === page.mainFrame() && url === pageUrl;
      const isInline = /^(?:data|blob|about):/i.test(url);
      const isAllowedChartJs = /^https:\/\/cdn\.jsdelivr\.net\/npm\/chart\.js@[\w.-]+\/[\w./-]+$/i.test(url);
      if (!isMainDocument && !isInline && !isAllowedChartJs) {
        blockedRequests.add(request.url());
        request.abort().catch(() => {});
      } else {
        request.continue().catch(() => {});
      }
    });
    const findings = [];
    let hasDiagram = false;
    for (const viewport of Object.keys(VIEWPORTS)) {
      await page.setViewport(VIEWPORTS[viewport]);
      await page.setJavaScriptEnabled(false);
      await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
      findings.push(...await inspectStaticEdges(page, viewport));

      await page.setJavaScriptEnabled(true);
      await page.goto(pageUrl, { waitUntil: 'domcontentloaded' });
      hasDiagram ||= await page.$('figure[data-visualize-diagram]') !== null;
      for (const theme of themes) findings.push(...await inspectState(page, viewport, theme));
    }
    if (hasDiagram) for (const url of blockedRequests) findings.push({
      ruleId: 'diagram/network-dependency', category: 'diagram', severity: 'error', locator: 'document',
      message: 'Delivered diagram requested a non-inline resource.', snippet: url,
    });
    const seen = new Set();
    return findings.filter((item) => { const key = `${item.ruleId}|${item.locator}|${item.message}`; if (seen.has(key)) return false; seen.add(key); return true; });
  } finally { await page.close().catch(() => {}); }
}

async function runSelfTest(browser) {
  const cases = [
    ['geometry-clean-scaled.html', []],
    ['initial-load-responsive-good.html', []],
    ['geometry-clipping-bad.html', ['diagram/clipping']],
    ['geometry-overlap-bad.html', ['diagram/node-overlap', 'diagram/label-overlap']],
    ['geometry-spatial-overlap-good.html', []],
    ['geometry-overlap-pair-collision-bad.html', ['diagram/node-overlap']],
    ['geometry-node-crossing-bad.html', ['diagram/edge-through-node']],
    ['geometry-upscaled-node-crossing-bad.html', ['diagram/edge-through-node']],
    ['empty-edge-bad.html', ['diagram/edge-geometry']],
    ['runtime-repaired-edge-bad.html', ['diagram/edge-geometry']],
    ['hidden-edge-bad.html', ['diagram/edge-geometry']],
    ['transparent-edge-bad.html', ['diagram/edge-geometry']],
    ['geometry-edges-bad.html', ['diagram/edge-intersection', 'diagram/edge-coincident']],
    ['geometry-endpoint-bad.html', ['diagram/endpoint-distance']],
    ['geometry-contrast-bad.html', ['diagram/contrast']],
    ['geometry-aspect-bad.html', ['diagram/aspect-ratio']],
    ['geometry-sample-crossing-bad.html', ['diagram/edge-intersection']],
    ['geometry-network-bad.html', ['diagram/network-dependency']],
    ['geometry-relative-resource-bad.html', ['diagram/network-dependency']],
    ['geometry-ordinary-label-bad.html', ['diagram/clipping']],
    ['geometry-shape-hole-clean.html', []],
  ];
  for (const [name, expected] of cases) {
    const results = await findingsForFile(browser, join(FIXTURES_DIR, name), ['light', 'dark']);
    const ids = new Set(results.map((item) => item.ruleId));
    for (const rule of expected) if (!ids.has(rule)) throw new Error(`self-test ${name} missed ${rule}`);
    if (expected.length === 0 && results.length > 0) throw new Error(`self-test ${name} expected clean, got ${[...ids].join(', ')}`);
  }
  console.log('OK · browser-diagram self-test covered desktop/mobile, light/dark, screen-scaled sampling, unusable edges, network blocking, ordinary labels, and all geometry rule families');
}

function usage() {
  console.log('Usage: node browser-diagram.mjs [--strict] [--json] [--theme light|dark|both] <html-file>...');
  console.log('       node browser-diagram.mjs --list-rules [--json]');
  console.log('       node browser-diagram.mjs --self-test');
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) { usage(); return 0; }
  if (options.listRules) { console.log(options.json ? JSON.stringify(RULES, null, 2) : RULES.map((rule) => `${rule.defaultSeverity.padEnd(5)} ${rule.id} — ${rule.description}`).join('\n')); return 0; }
  if (!options.selfTest && options.files.length === 0) { usage(); return 0; }
  for (const file of options.files) {
    if (!existsSync(file)) throw new Error(`file not found: ${file}`);
    if (!statSync(file).isFile()) throw new Error(`not a file: ${file}`);
  }
  const browser = await puppeteer.launch({ executablePath: await resolveChromeExecutable(), headless: true });
  try {
    if (options.selfTest) { await runSelfTest(browser); return 0; }
    const themes = options.theme === 'both' ? ['light', 'dark'] : [options.theme];
    const counts = { errors: 0, warnings: 0, info: 0 };
    for (const file of options.files) for (const item of await findingsForFile(browser, file, themes)) {
      if (item.severity === 'error') counts.errors++; else if (item.severity === 'warn') counts.warnings++; else counts.info++;
      emitFinding(options.json, file, item);
    }
    if (options.json) process.stdout.write(`${JSON.stringify({ type: 'summary', ...counts, rulesRan: RULES.length, filesScanned: options.files.length })}\n`);
    else console.log(`\n${options.strict && counts.errors ? 'exit 2' : 'OK'} · ${counts.errors} error · ${counts.warnings} warning · ${counts.info} info · ${options.files.length} file(s)`);
    return options.strict && counts.errors > 0 ? 2 : 0;
  } finally { await browser.close().catch(() => {}); }
}

function isMain() {
  try { return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1]); } catch { return false; }
}
if (isMain()) main().then((code) => { process.exitCode = code; }).catch((error) => { console.error(`browser-diagram failed: ${error.message}`); process.exitCode = 1; });
