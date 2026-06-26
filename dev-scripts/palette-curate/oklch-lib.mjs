// Shared OKLCH math for the curation + eval dev-scripts.
//
// Duplicated from visualize/scripts/palette.mjs, which deliberately exports
// nothing (it is a CLI consumed by agents, and keeping it import-free keeps
// the runtime contract small). If the constants or rules change there, this
// file follows. The palette smoke cross-checks the runtime copy against
// vendored culori; dev-scripts trust this copy for tooling only — nothing
// here ships in the skill.

export function oklchToLinearSrgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
}

export function oklchToOklab(L, C, H) {
  const hr = (H * Math.PI) / 180;
  return [L, C * Math.cos(hr), C * Math.sin(hr)];
}

export function oklabDist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

export function inSrgbGamut(L, C, H, eps = 5e-5) {
  return oklchToLinearSrgb(L, C, H).every((c) => c >= -eps && c <= 1 + eps);
}

export function maxChroma(L, H) {
  if (L <= 0.001 || L >= 0.999) return 0;
  let lo = 0, hi = 0.5;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (inSrgbGamut(L, mid, H)) lo = mid;
    else hi = mid;
  }
  return lo;
}

export function cuspL(H) {
  let bestL = 0.5, bestC = 0;
  for (let L = 0.05; L <= 0.96; L += 0.02) {
    const c = maxChroma(L, H);
    if (c > bestC) { bestC = c; bestL = L; }
  }
  for (let L = Math.max(0.02, bestL - 0.02); L <= Math.min(0.97, bestL + 0.02); L += 0.005) {
    const c = maxChroma(L, H);
    if (c > bestC) { bestC = c; bestL = L; }
  }
  return bestL;
}

function linearToGamma(c) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function wcagY(L, C, H) {
  const [r, g, b] = oklchToLinearSrgb(L, C, H).map((c) => Math.min(1, Math.max(0, c)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function wcagRatioY(y1, y2) {
  const [hi, lo] = y1 >= y2 ? [y1, y2] : [y2, y1];
  return (hi + 0.05) / (lo + 0.05);
}

export function apcaScreenY(L, C, H) {
  const [r, g, b] = oklchToLinearSrgb(L, C, H).map((c) => Math.min(1, Math.max(0, linearToGamma(c))));
  return Math.pow(r, 2.4) * 0.2126729 + Math.pow(g, 2.4) * 0.7151522 + Math.pow(b, 2.4) * 0.0721750;
}

export function apcaLcFromY(txtY, bgY) {
  const blkThrs = 0.022, blkClmp = 1.414, deltaYmin = 0.0005, loClip = 0.1;
  const clamp = (y) => (y > blkThrs ? y : y + Math.pow(blkThrs - y, blkClmp));
  const ty = clamp(txtY), by = clamp(bgY);
  if (Math.abs(by - ty) < deltaYmin) return 0;
  let sapc, out;
  if (by > ty) {
    sapc = (Math.pow(by, 0.56) - Math.pow(ty, 0.57)) * 1.14;
    out = sapc < loClip ? 0 : sapc - 0.027;
  } else {
    sapc = (Math.pow(by, 0.65) - Math.pow(ty, 0.62)) * 1.14;
    out = sapc > -loClip ? 0 : sapc + 0.027;
  }
  return out * 100;
}

// Same decision procedure as the runtime seed field.
export function textOnSolid(L, C, H) {
  if (cuspL(H) >= 0.85 && L >= 0.68 && C >= 0.04) return 'dark';
  if (L >= 0.42 && L <= 0.78 && C >= 0.08) {
    const y = wcagY(L, C, H);
    if (wcagRatioY(1.0, y) >= 3.0 || wcagRatioY(y, 0.0) < 4.5) return 'white';
    return 'dark';
  }
  const lcWhite = Math.abs(apcaLcFromY(apcaScreenY(1, 0, 0), apcaScreenY(L, C, H)));
  const lcBlack = Math.abs(apcaLcFromY(apcaScreenY(0, 0, 0), apcaScreenY(L, C, H)));
  return lcWhite >= lcBlack ? 'white' : 'dark';
}

export const ZONE_NAMES = ['red', 'orange', 'gold', 'yellow', 'lime', 'green', 'teal', 'azure', 'blue', 'violet', 'purple', 'pink'];
export const NEUTRAL_ZONE = 'neutral';
export const ALL_ZONES = [...ZONE_NAMES, NEUTRAL_ZONE];

export function zoneOf(L, C, H) {
  if (C < 0.04) return NEUTRAL_ZONE;
  return ZONE_NAMES[Math.floor((((H % 360) + 360) % 360) / 30)];
}

export const L_BANDS = [
  { name: 'heavy', lo: 0.25, hi: 0.45 },
  { name: 'mid', lo: 0.45, hi: 0.72 },
  { name: 'light', lo: 0.72, hi: 0.92 },
];

export function bandOf(L) {
  const b = L_BANDS.find((b) => L >= b.lo && L < b.hi);
  return b ? b.name : null;
}

// The cream tell (banned AI default): warm-neutral band the library must
// never offer as a seed.
export function inCreamBand(L, C, H) {
  return L >= 0.84 && L <= 0.97 && C < 0.06 && H >= 40 && H <= 100;
}

export function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function fmtOklch(L, C, H) {
  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(1)})`;
}

export function parseOklch(str) {
  const m = /^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*[\d.]+%?\s*)?\)$/i.exec(String(str).trim());
  if (!m) return null;
  let L = parseFloat(m[1]);
  if (m[2] === '%') L /= 100;
  return { L, C: parseFloat(m[3]), H: parseFloat(m[4]) % 360 };
}
