/*! axe v4.11.4
 * Copyright (c) 2015 - 2026 Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */
// Adapted for readable module packaging; sources and licenses: ../manifest.json and ../LICENSES.txt.

'use strict';

const chunk007 = require('./chunk-007.cjs');
const chunk010 = require('./chunk-010.cjs');
require('./chunk-011.cjs');
const chunk018 = require('./chunk-018.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk013 = require('./chunk-013.cjs');
require('./chunk-014.cjs');
require('./chunk-020.cjs');

/**
 * Check that an elements semantic role is unsupported.
 *
 * Unsupported roles are taken from the `ariaRoles` standards object from the roles `unsupported` property.
 *
 * @memberof checks
 * @return {Boolean} True if the elements semantic role is unsupported. False otherwise.
 */
function unsupportedroleEvaluate(node, options, virtualNode) {
  const role = chunk018.getRole(virtualNode, { dpub: true, fallback: true });
  const isUnsupported = chunk018.isUnsupportedRole(role);
  if (isUnsupported) {
    this.data(role);
  }
  return isUnsupported;
}

/**
 * A map from HTML tag names to a boolean which reflects whether it is
 * appropriate for scrollable elements found in the focus order.
 */
const VALID_TAG_NAMES_FOR_SCROLLABLE_REGIONS = {
  ARTICLE: true,
  ASIDE: true,
  NAV: true,
  SECTION: true
};

/**
 * A map from each landmark role to a boolean which reflects whether it is
 * appropriate for scrollable elements found in the focus order.
 */
const VALID_ROLES_FOR_SCROLLABLE_REGIONS = {
  alert: true,
  alertdialog: true,
  application: true,
  article: true,
  banner: false,
  complementary: true,
  contentinfo: true,
  dialog: true,
  form: true,
  log: true,
  main: true,
  navigation: true,
  region: true,
  search: false,
  status: true,
  tabpanel: true
};

/**
 * @param {HTMLElement} node
 * @return {Boolean} Whether the element has a tag appropriate for a scrollable
 *		 region.
 */
function validScrollableTagName(node) {
  // Some elements with nonsensical roles will pass this check, but should be
  // flagged by other checks.
  const nodeName = node.nodeName.toUpperCase();
  return VALID_TAG_NAMES_FOR_SCROLLABLE_REGIONS[nodeName] || false;
}

/**
 * @param {HTMLElement} node
 * @return {Boolean} Whether the node has a role appropriate for a scrollable
 *		 region.
 */
function validScrollableRole(node, options) {
  const role = chunk018.getExplicitRole(node);
  if (!role) {
    return false;
  }
  return (
    VALID_ROLES_FOR_SCROLLABLE_REGIONS[role] ||
    options.roles.includes(role) ||
    false
  );
}

/**
 * Check if the element has a valid scrollable role or tag.
 *
 * @memberof checks
 * @param {HTMLElement} node
 * @return {Boolean} True if the elements role or tag name is a valid scrollable region. False otherwise.
 */
function validScrollableSemanticsEvaluate(node, options) {
  return validScrollableRole(node, options) || validScrollableTagName(node);
}

/**
 * Get coordinates for an element's client rects or bounding client rect
 *
 * @method centerPointOfRect
 * @memberof axe.commons.color
 * @param {DOMRect} rect
 * @deprecated
 * @returns {Object | undefined}
 */
function centerPointOfRect(rect) {
  if (rect.left > window.innerWidth) {
    return undefined;
  }

  if (rect.top > window.innerHeight) {
    return undefined;
  }

  const x = Math.min(
    Math.ceil(rect.left + rect.width / 2),
    window.innerWidth - 1
  );
  const y = Math.min(
    Math.ceil(rect.top + rect.height / 2),
    window.innerHeight - 1
  );

  return { x, y };
}

/**
 * Creates a string array of fonts for given CSSStyleDeclaration object
 * @private
 * @param {Object} style CSSStyleDeclaration object
 * @return {Array}
 */
function _getFonts(style) {
  return style
    .getPropertyValue('font-family')
    .split(/[,;]/g)
    .map(font => {
      return font.trim().toLowerCase();
    });
}

/**
 * Determine if the text content of two nodes is styled in a way that they can be distinguished without relying on color
 * @method elementIsDistinct
 * @memberof axe.commons.color
 * @instance
 * @param  {HTMLElement} node The element to check
 * @param  {HTMLElement} ancestorNode The ancestor node element to check
 * @return {Boolean}
 */
function elementIsDistinct(node, ancestorNode) {
  const nodeStyle = window.getComputedStyle(node);

  // Check if the link has a background
  if (nodeStyle.getPropertyValue('background-image') !== 'none') {
    return true;
  }

  // Check if the link has a border or outline
  const hasBorder = ['border-bottom', 'border-top', 'outline'].reduce(
    (result, edge) => {
      const borderClr = new chunk013.Color();
      borderClr.parseString(nodeStyle.getPropertyValue(edge + '-color'));

      // Check if a border/outline was specified
      return (
        result ||
        // or if the current border edge / outline
        (nodeStyle.getPropertyValue(edge + '-style') !== 'none' &&
          parseFloat(nodeStyle.getPropertyValue(edge + '-width')) > 0 &&
          borderClr.alpha !== 0)
      );
    },
    false
  );

  if (hasBorder) {
    return true;
  }

  const parentStyle = window.getComputedStyle(ancestorNode);
  // Compare fonts
  if (_getFonts(nodeStyle)[0] !== _getFonts(parentStyle)[0]) {
    return true;
  }

  let hasStyle = [
    'text-decoration-line',
    'text-decoration-style',
    'font-weight',
    'font-style',
    'font-size'
  ].reduce((result, cssProp) => {
    return (
      result ||
      nodeStyle.getPropertyValue(cssProp) !==
        parentStyle.getPropertyValue(cssProp)
    );
  }, false);

  const tDec = nodeStyle.getPropertyValue('text-decoration');
  if (tDec.split(' ').length < 3) {
    // old style CSS text decoration
    hasStyle =
      hasStyle || tDec !== parentStyle.getPropertyValue('text-decoration');
  }

  return hasStyle;
}

/**
 * Get relevant stacks of block and inline elements, excluding line breaks
 * @deprecated use color.getBackgroundStack instead
 * @method getRectStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
function getRectStack(elm) {
  const boundingStack = chunk018.getElementStack(elm);

  // Handle inline elements spanning multiple lines to be evaluated
  const filteredArr = chunk018.getTextElementStack(elm);

  // If the element does not have multiple rects, like for display:block, return a single stack
  if (!filteredArr || filteredArr.length <= 1) {
    return [boundingStack];
  }

  if (filteredArr.some(stack => stack === undefined)) {
    // Can be happen when one or more of the rects sits outside the viewport
    return null;
  }

  // add bounding client rect stack for comparison later
  filteredArr.splice(0, 0, boundingStack);
  return filteredArr;
}

/**
 * Get filtered stack of block and inline elements, excluding line breaks
 * @deprecated use color.getBackgroundStack instead
 * @method filteredRectStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
function filteredRectStack(elm) {
  const rectStack = getRectStack(elm);

  if (rectStack && rectStack.length === 1) {
    return rectStack[0];
  }

  if (rectStack && rectStack.length > 1) {
    const boundingStack = rectStack.shift();
    let isSame;

    // iterating over arrays of DOMRects
    rectStack.forEach((rectList, index) => {
      if (index === 0) {
        return;
      }
      // if the stacks are the same, use the first one. otherwise, return null.
      const rectA = rectStack[index - 1],
        rectB = rectStack[index];

      // if elements in clientRects are the same
      // or the boundingClientRect contains the differing element, pass it
      isSame =
        rectA.every(
          (element, elementIndex) => element === rectB[elementIndex]
        ) || boundingStack.includes(elm);
    });
    if (!isSame) {
      chunk012.incompleteData.set('bgColor', 'elmPartiallyObscuring');
      return null;
    }
    // pass the first stack if it wasn't partially covered
    return rectStack[0];
  }

  // rect outside of viewport
  chunk012.incompleteData.set('bgColor', 'outsideViewport');
  return null;
}

// @see https://www.w3.org/TR/compositing-1/#blendingnonseparable
const nonSeparableBlendModes = ['hue', 'saturation', 'color', 'luminosity'];

// how to combine background and foreground colors together when using
// the CSS property `mix-blend-mode`. Defaults to `normal`
// @see https://www.w3.org/TR/compositing-1/#blendingseparable
const blendFunctions = {
  normal(Cb, Cs) {
    return Cs;
  },
  multiply(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingmultiply
    return Cs * Cb;
  },
  screen(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingscreen
    return Cb + Cs - Cb * Cs;
  },
  overlay(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingoverlay
    return this['hard-light'](Cs, Cb);
  },
  darken(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingdarken
    return Math.min(Cb, Cs);
  },
  lighten(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinglighten
    return Math.max(Cb, Cs);
  },
  'color-dodge'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolordodge
    return Cb === 0 ? 0 : Cs === 1 ? 1 : Math.min(1, Cb / (1 - Cs));
  },
  'color-burn'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolorburn
    return Cb === 1 ? 1 : Cs === 0 ? 0 : 1 - Math.min(1, (1 - Cb) / Cs);
  },
  'hard-light'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinghardlight

    return Cs <= 0.5 ? this.multiply(Cb, 2 * Cs) : this.screen(Cb, 2 * Cs - 1);
  },
  'soft-light'(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingsoftlight
    if (Cs <= 0.5) {
      return Cb - (1 - 2 * Cs) * Cb * (1 - Cb);
    } else {
      const D = Cb <= 0.25 ? ((16 * Cb - 12) * Cb + 4) * Cb : Math.sqrt(Cb);
      return Cb + (2 * Cs - 1) * (D - Cb);
    }
  },
  difference(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingdifference
    return Math.abs(Cb - Cs);
  },
  exclusion(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingexclusion
    return Cb + Cs - 2 * Cb * Cs;
  },

  // non-separate color function take the entire color object
  // and not individual color components (red, green, blue)
  hue(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendinghue
    return Cs.setSaturation(Cb.getSaturation()).setLuminosity(
      Cb.getLuminosity()
    );
  },
  saturation(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingsaturation
    return Cb.setSaturation(Cs.getSaturation()).setLuminosity(
      Cb.getLuminosity()
    );
  },
  color(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingcolor
    return Cs.setLuminosity(Cb.getLuminosity());
  },
  luminosity(Cb, Cs) {
    // @see https://www.w3.org/TR/compositing-1/#blendingluminosity
    return Cb.setLuminosity(Cs.getLuminosity());
  }
};

/**
 * Combine the two given color according to alpha blending.
 * @method flattenColors
 * @memberof axe.commons.color.Color
 * @instance
 * @param {Color} sourceColor Foreground color
 * @param {Color} backdrop Background color
 * @return {Color} Blended color
 */
function flattenColors(
  sourceColor,
  backdrop,
  blendMode = 'normal'
) {
  const blendingResult = blend(backdrop, sourceColor, blendMode);

  // foreground is the "source" color and background is the "backdrop" color
  const r = simpleAlphaCompositing(
    sourceColor.red,
    sourceColor.alpha,
    backdrop.red,
    backdrop.alpha,
    // we don't want to round the blended value
    blendingResult.r * 255
  );
  const g = simpleAlphaCompositing(
    sourceColor.green,
    sourceColor.alpha,
    backdrop.green,
    backdrop.alpha,
    blendingResult.g * 255
  );
  const b = simpleAlphaCompositing(
    sourceColor.blue,
    sourceColor.alpha,
    backdrop.blue,
    backdrop.alpha,
    blendingResult.b * 255
  );

  // formula: αo = αs + αb x (1 - αs)
  // clamp alpha between 0 and 1
  const αo = clamp(
    sourceColor.alpha + backdrop.alpha * (1 - sourceColor.alpha),
    0,
    1
  );
  if (αo === 0) {
    return new chunk013.Color(r, g, b, αo);
  }

  // simple alpha compositing gives premultiplied values, but our Color
  // constructor takes unpremultiplied values. So we need to divide the
  // final color values by the final alpha
  // formula: Co = co / αo
  // @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
  // @see https://github.com/w3c/fxtf-drafts/issues/440#issuecomment-956418953
  //
  // RGB color space doesn't have decimal values so we will follow what browsers do and round
  // e.g. rgb(255.2, 127.5, 127.8) === rgb(255, 128, 128)
  const Cr = Math.round(r / αo);
  const Cg = Math.round(g / αo);
  const Cb = Math.round(b / αo);

  return new chunk013.Color(Cr, Cg, Cb, αo);
}

// Simple Alpha Compositing written as non-premultiplied.
// formula: Rrgb × Ra = Srgb × Sa + Drgb × Da × (1 − Sa)
// Cs: the source color
// αs: the source alpha
// Cb: the backdrop color
// αb: the backdrop alpha
// @see https://www.w3.org/TR/compositing-1/#simplealphacompositing
// @see https://www.w3.org/TR/compositing-1/#blending
// @see https://ciechanow.ski/alpha-compositing/
function simpleAlphaCompositing(Cs, αs, Cb, αb, blendingResult) {
  return αs * (1 - αb) * Cs + αs * αb * blendingResult + (1 - αs) * αb * Cb;
}

// clamp a value between two numbers (inclusive)
function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

function blend(Cb, Cs, blendMode) {
  if (nonSeparableBlendModes.includes(blendMode)) {
    return blendFunctions[blendMode](Cb, Cs);
  }

  const C = new chunk013.Color();
  ['r', 'g', 'b'].forEach(channel => {
    C[channel] = blendFunctions[blendMode](Cb[channel], Cs[channel]);
  });
  return C;
}

/**
 * Combine the two given shadow colors according to alpha blending.
 * @deprecated Use axe.commons.color.flattenColors instead
 * @method flattenColors
 * @memberof axe.commons.color.Color
 * @instance
 * @param {Color} fgColor Foreground color
 * @param {Color} bgColor Background color
 * @return {Color} Blended color
 */
function flattenShadowColors(fgColor, bgColor) {
  const alpha = fgColor.alpha;
  const r = (1 - alpha) * bgColor.red + alpha * fgColor.red;
  const g = (1 - alpha) * bgColor.green + alpha * fgColor.green;
  const b = (1 - alpha) * bgColor.blue + alpha * fgColor.blue;
  const a = fgColor.alpha + bgColor.alpha * (1 - fgColor.alpha);

  return new chunk013.Color(r, g, b, a);
}

/**
 * Get all elements rendered underneath the current element,
 * In the order they are displayed (front to back)
 *
 * @method getBackgroundStack
 * @memberof axe.commons.color
 * @param {Element} node
 * @return {Array}
 */
function getBackgroundStack(node) {
  const stacks = chunk018.getTextElementStack(node).map(stack => {
    stack = chunk013.reduceToElementsBelowFloating(stack, node);
    stack = sortPageBackground(stack);
    return stack;
  });

  for (let index = 0; index < stacks.length; index++) {
    const stack = stacks[index];

    if (stack[0] !== node) {
      chunk012.incompleteData.set('bgColor', 'bgOverlap');
      return null;
    }

    // verify stacks are the same
    if (index !== 0 && !shallowArraysEqual(stack, stacks[0])) {
      chunk012.incompleteData.set('bgColor', 'elmPartiallyObscuring');
      return null;
    }
  }

  return stacks[0] || null;
}

/**
 * Look at document and body elements for relevant background information
 * @method sortPageBackground
 * @private
 * @param {Array} elmStack
 * @returns {Array}
 */
function sortPageBackground(elmStack) {
  const bodyIndex = elmStack.indexOf(document.body);
  const bgNodes = elmStack;

  // body can sometimes appear out of order in the stack when it
  // is not the first element due to negative z-index elements.
  // however, we only want to change order if the html element
  // does not define a background color (ya, it's a strange edge
  // case. it turns out that if html defines a background it treats
  // body as a normal element, but if it doesn't then body is treated
  // as the "html" element)
  const htmlBgColor = chunk013.getOwnBackgroundColor(
    window.getComputedStyle(document.documentElement)
  );
  if (
    bodyIndex > 1 &&
    htmlBgColor.alpha === 0 &&
    !chunk012.elementHasImage(document.documentElement)
  ) {
    // Only remove document.body if it was originally contained within the element stack
    if (bodyIndex > 1) {
      bgNodes.splice(bodyIndex, 1);

      // Put the body background as the lowest element
      bgNodes.push(document.body);
    }

    const htmlIndex = bgNodes.indexOf(document.documentElement);
    if (htmlIndex > 0) {
      bgNodes.splice(htmlIndex, 1);

      // Put the html background as the lowest element
      bgNodes.push(document.documentElement);
    }
  }
  return bgNodes;
}

/**
 * Check to see if two arrays are equal
 * @see https://stackoverflow.com/a/16436975/2124254
 */
function shallowArraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/** Magic numbers **/
// Alpha value to use when text shadows are offset between .5px and 1.5px
const SHADOW_STROKE_ALPHA = 0.54;
// Shadows offset by less than this are not visible enough no matter how much you stack them
const VISIBLE_SHADOW_MIN_PX = 0.5;
// Shadows offset by more than this have full opacity
const OPAQUE_STROKE_OFFSET_MIN_PX = 1.5;

const edges = ['top', 'right', 'bottom', 'left'];

/**
 * Work out which color(s) of an array of text shadows form a stroke around the text.
 * @param {Array[]} testShadows Parsed test shadows (see color.parseTestShadow())
 * @param {Object} options (optional)
 * @property {Bool} ignoreEdgeCount Do not return null when if shadows cover 2 or 3 edges, ignore those instead
 * @returns {Array|null} Array of colors or null if text-shadow was too complex to measure
 */
function getStrokeColorsFromShadows(
  parsedShadows,
  { ignoreEdgeCount = false } = {}
) {
  const shadowMap = getShadowColorsMap(parsedShadows);
  const shadowsByColor = Object.entries(shadowMap).map(([colorStr, sides]) => {
    const edgeCount = edges.filter(side => sides[side].length !== 0).length;
    return { colorStr, sides, edgeCount };
  });

  // Bail immediately if any shadow group covers too much of the text to be ignored, but not enough to be tested
  if (
    !ignoreEdgeCount &&
    shadowsByColor.some(({ edgeCount }) => edgeCount > 1 && edgeCount < 4)
  ) {
    return null;
  }

  return shadowsByColor
    .map(shadowGroupToColor)
    .filter(shadow => shadow !== null);
}

/**
 * Create a map of colors to the sides they are on
 */
function getShadowColorsMap(parsedShadows) {
  const colorMap = {};
  for (const { colorStr, pixels } of parsedShadows) {
    colorMap[colorStr] ??= { top: [], right: [], bottom: [], left: [] };
    const borders = colorMap[colorStr];
    const [offsetX, offsetY] = pixels;

    if (offsetX > VISIBLE_SHADOW_MIN_PX) {
      borders.right.push(offsetX);
    } else if (-offsetX > VISIBLE_SHADOW_MIN_PX) {
      borders.left.push(-offsetX);
    }
    if (offsetY > VISIBLE_SHADOW_MIN_PX) {
      borders.bottom.push(offsetY);
    } else if (-offsetY > VISIBLE_SHADOW_MIN_PX) {
      borders.top.push(-offsetY);
    }
  }
  return colorMap;
}

/**
 * Using colorStr and thickness of sides, create a color object
 */
function shadowGroupToColor({ colorStr, sides, edgeCount }) {
  if (edgeCount !== 4) {
    return null; // ignore thin shadows and shadows on one side of the text
  }
  const strokeColor = new chunk013.Color();
  strokeColor.parseString(colorStr);

  // Detect whether any sides' shadows are thin enough to be considered
  // translucent, and if so, calculate an alpha value to apply on top of
  // the parsed color.
  let density = 0;
  let isSolid = true;
  edges.forEach(edge => {
    // Decimal values are ignored. a .6px shadow is treated as 1px
    // because it is not rendered evenly around the text.
    // I.e. .6 ends up as 70% alpha on one side and 16% on the other.
    density += sides[edge].length / 4;
    isSolid &&= sides[edge].every(
      offset => offset > OPAQUE_STROKE_OFFSET_MIN_PX
    );
  });

  if (!isSolid) {
    // As more shadows surround the text, the opacity increases
    strokeColor.alpha = 1 - Math.pow(SHADOW_STROKE_ALPHA, density);
  }
  return strokeColor;
}

/**
 * Parse text-shadow property value. Required for IE, which can return the color
 * either at the start or the end, and either in rgb(a) or as a named color
 * @param {String} textShadow
 * @returns {Array} Array of objects with `pixels` and `colorStr` properties
 */
function parseTextShadows(textShadow) {
  let current = { pixels: [] };
  let str = textShadow.trim();
  const shadows = [current];
  if (!str) {
    return [];
  }

  while (str) {
    const colorMatch =
      // match a color name or function (e.g. `oklch(39.2% 0.4 0 / 0.5)`) or a hex value
      str.match(/^[a-z]+(\([^)]+\))?/i) || str.match(/^#[0-9a-f]+/i);
    const pixelMatch = str.match(/^([0-9.-]+)px/i) || str.match(/^(0)/);

    if (colorMatch) {
      chunk007.assert(
        !current.colorStr,
        `Multiple colors identified in text-shadow: ${textShadow}`
      );
      str = str.replace(colorMatch[0], '').trim();
      current.colorStr = colorMatch[0];
    } else if (pixelMatch) {
      chunk007.assert(
        current.pixels.length < 3,
        `Too many pixel units in text-shadow: ${textShadow}`
      );
      str = str.replace(pixelMatch[0], '').trim();
      const pixelUnit = parseFloat(
        (pixelMatch[1][0] === '.' ? '0' : '') + pixelMatch[1]
      );
      current.pixels.push(pixelUnit);
    } else if (str[0] === ',') {
      // multiple text-shadows in a single string (e.g. `text-shadow: 1px 1px 1px #000, 3px 3px 5px blue;`
      chunk007.assert(
        current.pixels.length >= 2,
        `Missing pixel value in text-shadow: ${textShadow}`
      );
      current = { pixels: [] };
      shadows.push(current);
      str = str.substr(1).trim();
    } else {
      throw new Error(`Unable to process text-shadows: ${str}`);
    }
  }

  shadows.forEach(({ pixels }) => {
    if (pixels.length === 2) {
      pixels.push(0); // Append default blur
    }
  });

  return shadows;
}

/**
 * Get text-shadow colors that can impact the color contrast of the text, including from:
 * - Shadows which are individually thick enough (minRatio <= thickness <= maxRatio) to distinguish as characters
 * - Groups of "thin" shadows (thickness < minRatio) that collectively act as a pseudo-text-stroke (see #4064)
 * @param {Element} node  DOM Element
 * @param {Object} options (optional)
 * @property {Bool} minRatio Treat shadows smaller than this as "thin", ratio shadow size divided by font size
 * @property {Bool} maxRatio Ignore shadows equal or larger than this, ratio shadow size divided by font size
 * @property {Bool} ignoreEdgeCount Do not return null when if shadows cover 2 or 3 edges, ignore those instead
 * @returns {Array|null} Array of colors or null if text-shadow was too complex to measure
 */
function getTextShadowColors(
  node,
  { minRatio, maxRatio, ignoreEdgeCount } = {}
) {
  const shadowColors = [];
  const style = window.getComputedStyle(node);
  const textShadow = style.getPropertyValue('text-shadow');
  if (textShadow === 'none') {
    return shadowColors;
  }

  const fontSizeStr = style.getPropertyValue('font-size');
  const fontSize = parseInt(fontSizeStr);
  chunk007.assert(
    isNaN(fontSize) === false,
    `Unable to determine font-size value ${fontSizeStr}`
  );

  const thinShadows = [];
  const shadows = parseTextShadows(textShadow);
  for (const shadow of shadows) {
    // Defaults only necessary for IE
    const colorStr = shadow.colorStr || style.getPropertyValue('color');
    const [offsetX, offsetY, blurRadius = 0] = shadow.pixels;
    if (maxRatio && blurRadius >= fontSize * maxRatio) {
      continue;
    }
    if (minRatio && blurRadius < fontSize * minRatio) {
      thinShadows.push({ colorStr, pixels: shadow.pixels });
      continue;
    }
    if (thinShadows.length > 0) {
      // Inset any stroke colors before this shadow
      const strokeColors = getStrokeColorsFromShadows(thinShadows, {
        ignoreEdgeCount
      });
      if (strokeColors === null) {
        return null; // Exit early if text-shadow is too complex
      }
      shadowColors.push(...strokeColors);
      thinShadows.splice(0, thinShadows.length); // empty
    }

    const color = textShadowColor({
      colorStr,
      offsetX,
      offsetY,
      blurRadius,
      fontSize
    });
    shadowColors.push(color);
  }

  if (thinShadows.length > 0) {
    // Append any remaining stroke colors
    const strokeColors = getStrokeColorsFromShadows(thinShadows, {
      ignoreEdgeCount
    });
    if (strokeColors === null) {
      return null; // Exit early if text-shadow is too complex
    }
    shadowColors.push(...strokeColors);
  }

  return shadowColors;
}

function textShadowColor({ colorStr, offsetX, offsetY, blurRadius, fontSize }) {
  if (offsetX > blurRadius || offsetY > blurRadius) {
    // Shadow is too far removed from the text to impact contrast
    return new chunk013.Color(0, 0, 0, 0);
  }

  const shadowColor = new chunk013.Color();
  shadowColor.parseString(colorStr);
  shadowColor.alpha *= blurRadiusToAlpha(blurRadius, fontSize);

  return shadowColor;
}

function blurRadiusToAlpha(blurRadius, fontSize) {
  if (blurRadius === 0) {
    return 1;
  }

  // This formula is an estimate based on various tests.
  // Different people test this differently, so opinions may vary.
  const relativeBlur = blurRadius / fontSize;
  return 0.185 / (relativeBlur + 0.4);
}

/**
 * Create a stacking context hierarchy tree for an element. This structure closely mimics the painting order of a page.
 * @see https://www.w3.org/TR/CSS22/zindex.html#painting-order
 *
 * @example
 * Given the following HTML structure:
 *
 * <div id="parent" style="background-color: red; opacity: 0.8">
 *   <div id="target" style="background-color: rgba(0,255,0,0.5)">Text</div>
 * <div>
 *
 * Produces the following stacking context tree. Since the #parent element creates a stacking context due to `opacity`, the #target element's stacking context belongs under the #parent's context.
 *
 * [
 *   {
 *     vNode: #parent,
 *     opacity: 0.8,
 *     blendMode: 'normal',
 *     bgColor: Color(255,0,0,1),
 *     descendants: [
 *       {
 *         vNode: #target,
 *         opacity: 1,
 *         blendMode: 'normal',
 *         bgColor: Color(0,255,0,0.5),
 *         descendants: []
 *       }
 *     ]
 *   }
 * ]
 *
 * The stacking context hierarchy tree does not mimic the HTML structure. That is, elements that are on the same context level are siblings in the stacking context tree even if they have a parent/child HTML relationship.
 *
 * For example, given the following HTML structure:
 *
 * <main>
 *  <header style="position: relative; z-index: 1;">
 *    <h1><span>Hello World</span></h1>
 *  </header>
 * </main>
 * <p>Lorium ipsum <a href="#">dolores</a>...</p>
 *
 * Produces the following tree structure:
 *
 * body
 * - main
 * - header
 *   - h1
 *   - span
 * - p
 * - a
 *
 * @param {Node} elm
 * @param {Node[]} [elmStack] - Optional element stack array to save on computing it again.
 * @return {Object}
 */
function getStackingContext(elm, elmStack) {
  const virtualNode = chunk010.getNodeFromTree(elm);
  if (virtualNode._stackingContext) {
    return virtualNode._stackingContext;
  }

  const stackingContext = [];
  const contextMap = new Map();
  elmStack = elmStack ?? getBackgroundStack(elm);

  elmStack.forEach(bgElm => {
    const bgVNode = chunk010.getNodeFromTree(bgElm);
    const bgColor = getOwnBackgroundColor(bgVNode);

    /*
      remove the ROOT_ORDER element to treat all root stacks and first-order
      stacks at the same level (instead of nesting the first-order stack inside
      the root stack)

      e.g. an element that creates a non-positioned stacking context at the
      root level should be a sibling to root level elements that do not create
      a stacking context
     */
    const stackingOrder = bgVNode._stackingOrder.filter(({ vNode }) => !!vNode);

    // create a stacking context for each node in the stacking order
    stackingOrder.forEach(({ vNode }, index) => {
      const ancestorVNode = stackingOrder[index - 1]?.vNode;
      const context = addToStackingContext(contextMap, vNode, ancestorVNode);

      if (index === 0 && !contextMap.get(vNode)) {
        stackingContext.unshift(context);
      }
      contextMap.set(vNode, context);
    });

    // create a stacking context for the current node
    const ancestorVNode = stackingOrder[stackingOrder.length - 1]?.vNode;
    const context = addToStackingContext(contextMap, bgVNode, ancestorVNode);
    if (!stackingOrder.length) {
      stackingContext.unshift(context);
    }

    // only assign the color to the current node so we don't apply any
    // background colors from ancestor nodes that are not part of the element
    // stack
    context.bgColor = bgColor;
  });

  virtualNode._stackingContext = stackingContext;
  return stackingContext;
}

/**
 * Transform a stacking context object into a Color.
 * @param {Object} context
 * @return {Object}
 */
function stackingContextToColor(context) {
  if (!context.descendants?.length) {
    const color = context.bgColor;
    color.alpha *= context.opacity;

    return {
      color,
      blendMode: context.blendMode
    };
  }

  const sourceColor = context.descendants.reduce(
    reduceToColor,
    // ensure an array with a single context is reduced to a color by passing
    // in an empty stacking context
    createStackingContext()
  );
  const color = flattenColors(
    sourceColor,
    context.bgColor,
    context.descendants[0].blendMode
  );
  color.alpha *= context.opacity;

  // carry forward the mix-blind-mode property so background color algorithm
  // can use it to flatten multiple contexts together
  return {
    color,
    blendMode: context.blendMode
  };
}

/**
 * Reduce two context objects into a Color by blending them together
 * @param {Object} backdropContext
 * @param {Object} sourceContext
 * @return {Color}
 */
function reduceToColor(backdropContext, sourceContext) {
  let backdrop;
  if (backdropContext instanceof chunk013.Color) {
    backdrop = backdropContext;
  } else {
    backdrop = stackingContextToColor(backdropContext).color;
  }

  const sourceColor = stackingContextToColor(sourceContext).color;
  return flattenColors(sourceColor, backdrop, sourceContext.blendMode);
}

/**
 * Create a stacking context object for a virtual node.
 * @param {VirtualNode} vNode
 * @param {Object} ancestorContext
 * @return {Object}
 */
function createStackingContext(vNode, ancestorContext) {
  return {
    vNode: vNode,
    ancestor: ancestorContext,
    opacity: parseFloat(vNode?.getComputedStylePropertyValue('opacity') ?? 1),
    bgColor: new chunk013.Color(0, 0, 0, 0),
    blendMode: normalizeBlendMode$1(
      vNode?.getComputedStylePropertyValue('mix-blend-mode')
    ),
    descendants: []
  };
}

/**
 * Normalize a mix-blend-mode CSS value
 * @param {String} blendmode
 * @return {String|undefined}
 */
function normalizeBlendMode$1(blendmode) {
  return !!blendmode ? blendmode : undefined;
}

/**
 * Create a stacking context for a virtual node and add it as a descendant of an ancestor's context.
 * @param {Map} contextMap
 * @param {VirtualNode} vNode
 * @param {VirtualNode} ancestorVNode
 * @return {Object}
 */
function addToStackingContext(contextMap, vNode, ancestorVNode) {
  const ancestorContext = contextMap.get(ancestorVNode);
  const context =
    contextMap.get(vNode) ?? createStackingContext(vNode, ancestorContext);
  if (
    ancestorContext &&
    ancestorVNode !== vNode &&
    !ancestorContext.descendants.includes(context)
  ) {
    ancestorContext.descendants.unshift(context);
  }

  return context;
}

/**
 * Get the background color for a virtual node
 * @param {VirtualNode} vNode
 * @return {Color}
 */
function getOwnBackgroundColor(vNode) {
  const bgColor = new chunk013.Color();
  bgColor.parseString(vNode.getComputedStylePropertyValue('background-color'));

  return bgColor;
}

/**
 * Returns background color for element
 * Uses getBackgroundStack() to get all elements rendered underneath the current element,
 * to help determine the composite background color.
 *
 * @method getBackgroundColor
 * @memberof axe.commons.color
 * @param  {Element} elm Element to determine background color
 * @param  {Array}   [bgElms=[]] elements to inspect
 * @param  {Number}  shadowOutlineEmMax Thickness of `text-shadow` at which it becomes a background color
 * @returns {Color}
 */
function getBackgroundColor(
  elm,
  bgElms = [],
  shadowOutlineEmMax = 0.1
) {
  const vNode = chunk010.getNodeFromTree(elm);
  const bgColorCache = vNode._cache.getBackgroundColor;

  if (bgColorCache) {
    bgElms.push(...bgColorCache.bgElms);
    chunk012.incompleteData.set('bgColor', bgColorCache.incompleteData);
    return bgColorCache.bgColor;
  }

  const bgColor = _getBackgroundColor(elm, bgElms, shadowOutlineEmMax);

  vNode._cache.getBackgroundColor = {
    bgColor,
    bgElms,
    incompleteData: chunk012.incompleteData.get('bgColor')
  };

  return bgColor;
}

function _getBackgroundColor(elm, bgElms, shadowOutlineEmMax) {
  const elmStack = getBackgroundStack(elm);
  if (!elmStack) {
    return null;
  }

  const textRects = chunk018.getVisibleChildTextRects(elm);
  let bgColors =
    getTextShadowColors(elm, {
      minRatio: shadowOutlineEmMax,
      ignoreEdgeCount: true
    }) ?? []; // Empty object shouldn't be necessary. Just being safe.
  if (bgColors.length) {
    bgColors = [{ color: bgColors.reduce(flattenShadowColors) }];
  }

  // Search the stack until we have an alpha === 1 background
  for (let i = 0; i < elmStack.length; i++) {
    const bgElm = elmStack[i];
    const bgElmStyle = window.getComputedStyle(bgElm);

    if (chunk012.elementHasImage(bgElm, bgElmStyle)) {
      bgElms.push(bgElm);

      return null;
    }

    // Get the background color
    let bgColor;
    try {
      bgColor = chunk013.getOwnBackgroundColor(bgElmStyle);
      if (bgColor.alpha === 0) {
        continue;
      }
    } catch (error) {
      if (error && chunk012.incompleteData.get('colorParse')) {
        return null;
      }
      throw error;
    }

    // abort if a node is partially obscured and obscuring element has a background
    if (
      bgElmStyle.getPropertyValue('display') !== 'inline' &&
      !fullyEncompasses(bgElm, textRects)
    ) {
      bgElms.push(bgElm);
      chunk012.incompleteData.set('bgColor', 'elmPartiallyObscured');

      return null;
    }

    // store elements contributing to the bg color.
    bgElms.push(bgElm);

    // Exit if the background is opaque
    if (bgColor.alpha === 1) {
      break;
    }
  }

  const stackingContext = getStackingContext(elm, elmStack);
  bgColors = stackingContext.map(stackingContextToColor).concat(bgColors);

  const pageBgs = getPageBackgroundColors(
    elm,
    elmStack.includes(document.body)
  );
  bgColors.unshift(...pageBgs);

  // default to white if bgColors is empty
  if (bgColors.length === 0) {
    return new chunk013.Color(255, 255, 255, 1);
  }
  // Mix the colors together. Colors must be mixed in bottom up
  // order (background to foreground order) to produce the correct
  // result.
  // @see https://github.com/dequelabs/axe-core/issues/2924
  const blendedColor = bgColors.reduce((bgColor, fgColor) => {
    return flattenColors(
      fgColor.color,
      bgColor.color instanceof chunk013.Color ? bgColor.color : bgColor,
      fgColor.blendMode
    );
  });

  // default page background is white which must be mixed last
  // @see https://www.w3.org/TR/compositing-1/#pagebackdrop
  return flattenColors(
    blendedColor.color instanceof chunk013.Color ? blendedColor.color : blendedColor,
    new chunk013.Color(255, 255, 255, 1)
  );
}

/**
 * Checks whether a node fully encompasses a set of rects.
 * @private
 * @param {Element} node
 * @param {NodeRect[]} rects
 * @return {Boolean}
 */
function fullyEncompasses(node, rects) {
  rects = Array.isArray(rects) ? rects : [rects];

  const nodeRect = node.getBoundingClientRect();
  let { right, bottom } = nodeRect;
  const style = window.getComputedStyle(node);
  const overflow = style.getPropertyValue('overflow');
  const paddingLeft = parseInt(style.getPropertyValue('padding-left'), 10);
  const paddingRight = parseInt(style.getPropertyValue('padding-right'), 10);
  const paddingTop = parseInt(style.getPropertyValue('padding-top'), 10);
  const paddingBottom = parseInt(style.getPropertyValue('padding-bottom'), 10);

  if (
    ['scroll', 'auto'].includes(overflow) ||
    node instanceof window.HTMLHtmlElement
  ) {
    right = nodeRect.left + node.scrollWidth + paddingLeft + paddingRight;
    bottom = nodeRect.top + node.scrollHeight + paddingTop + paddingBottom;
  }

  return rects.every(rect => {
    return (
      rect.top >= nodeRect.top &&
      rect.bottom <= bottom &&
      rect.left >= nodeRect.left &&
      rect.right <= right
    );
  });
}

function normalizeBlendMode(blendmode) {
  return !!blendmode ? blendmode : undefined;
}

/**
 * Get the page background color.
 * @private
 * @param {Element} elm
 * @param {Boolean} stackContainsBody
 * @return {Colors[]}
 */
function getPageBackgroundColors(elm, stackContainsBody) {
  const pageColors = [];

  // Body can sometimes appear out of order in the stack:
  //   1) Body is not the first element due to negative z-index elements
  //   2) Elements are positioned outside of body's rect coordinates
  //      (see https://github.com/dequelabs/axe-core/issues/1456)
  // In those instances we need to determine if we should use the
  // body background or the html background color
  if (!stackContainsBody) {
    // if the html element defines a bgColor and body defines a
    // bgColor but body's height is not the full viewport, then the
    // html bgColor fills the full viewport and body bgColor only
    // fills to its size. however, if the html element does not
    // define a bgColor, then the body bgColor fills the full
    // viewport. so if the body wasn't added to the elmStack, we
    // need to know which bgColor to get (html or body)
    const html = document.documentElement;
    const body = document.body;
    const htmlStyle = window.getComputedStyle(html);
    const bodyStyle = window.getComputedStyle(body);
    const htmlBgColor = chunk013.getOwnBackgroundColor(htmlStyle);
    const bodyBgColor = chunk013.getOwnBackgroundColor(bodyStyle);
    const bodyBgColorApplies =
      bodyBgColor.alpha !== 0 &&
      fullyEncompasses(body, elm.getBoundingClientRect());
    if (
      (bodyBgColor.alpha !== 0 && htmlBgColor.alpha === 0) ||
      (bodyBgColorApplies && bodyBgColor.alpha !== 1)
    ) {
      pageColors.unshift({
        color: bodyBgColor,
        blendMode: normalizeBlendMode(
          bodyStyle.getPropertyValue('mix-blend-mode')
        )
      });
    }

    if (
      htmlBgColor.alpha !== 0 &&
      (!bodyBgColorApplies || (bodyBgColorApplies && bodyBgColor.alpha !== 1))
    ) {
      pageColors.unshift({
        color: htmlBgColor,
        blendMode: normalizeBlendMode(
          htmlStyle.getPropertyValue('mix-blend-mode')
        )
      });
    }
  }

  return pageColors;
}

/**
 * Get the contrast of two colors
 * @method getContrast
 * @memberof axe.commons.color.Color
 * @instance
 * @param  {Color}  bgcolor  Background color
 * @param  {Color}  fgcolor  Foreground color
 * @return {number} The contrast ratio
 */
function getContrast(bgColor, fgColor) {
  if (!fgColor || !bgColor) {
    return null;
  }

  if (fgColor.alpha < 1) {
    fgColor = flattenColors(fgColor, bgColor);
  }

  const bL = bgColor.getRelativeLuminance();
  const fL = fgColor.getRelativeLuminance();

  return (Math.max(fL, bL) + 0.05) / (Math.min(fL, bL) + 0.05);
}

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @method getForegroundColor
 * @memberof axe.commons.color
 * @instance
 * @param {Element} node
 * @param {Boolean} noScroll (default false)
 * @param {Color} bgColor
 * @param {Object} Options
 * @return {Color|null}
 *
 * @deprecated noScroll parameter
 */
function getForegroundColor(node, _, bgColor, options = {}) {
  const nodeStyle = window.getComputedStyle(node);

  const colorStack = [
    // Start with -webkit-text-stroke, it is rendered on top
    () => getStrokeColor(nodeStyle, options),
    // Next color / -webkit-text-fill-color
    () => getTextColor(nodeStyle),
    // If text is (semi-)transparent shadows are visible through it
    () => getTextShadowColors(node, { minRatio: 0 })
  ];
  let fgColors = [];

  try {
    for (const colorFn of colorStack) {
      const color = colorFn();
      if (!color) {
        continue;
      }

      fgColors = fgColors.concat(color);

      if (color.alpha === 1) {
        break;
      }
    }
  } catch (error) {
    if (error && chunk012.incompleteData.get('colorParse')) {
      return null;
    }
    throw error;
  }

  const fgColor = fgColors.reduce((source, backdrop) => {
    return flattenColors(source, backdrop);
  });

  // Lastly blend the background
  bgColor ??= getBackgroundColor(node, []);
  if (bgColor === null) {
    const reason = chunk012.incompleteData.get('bgColor');
    chunk012.incompleteData.set('fgColor', reason);
    return null;
  }

  const stackingContexts = getStackingContext(node);
  const context = findNodeInContexts(stackingContexts, node);
  return flattenColors(
    calculateBlendedForegroundColor(fgColor, context, stackingContexts),
    // default page background
    new chunk013.Color(255, 255, 255, 1)
  );
}

function getTextColor(nodeStyle) {
  return new chunk013.Color().parseString(
    nodeStyle.getPropertyValue('-webkit-text-fill-color') ||
      nodeStyle.getPropertyValue('color')
  );
}

function getStrokeColor(nodeStyle, { textStrokeEmMin = 0 }) {
  const strokeWidth = parseFloat(
    nodeStyle.getPropertyValue('-webkit-text-stroke-width')
  );
  if (strokeWidth === 0) {
    return null;
  }
  const fontSize = nodeStyle.getPropertyValue('font-size');
  const relativeStrokeWidth = strokeWidth / parseFloat(fontSize);
  if (isNaN(relativeStrokeWidth) || relativeStrokeWidth < textStrokeEmMin) {
    return null;
  }

  const strokeColor = nodeStyle.getPropertyValue('-webkit-text-stroke-color');
  return new chunk013.Color().parseString(strokeColor);
}

/**
 * Blend a foreground color into the background stacking context, taking into account opacity at each step.
 * @param {Color} fgColor
 * @param {Object} context - The nodes stacking context
 * @param {Object[]} stackingContexts - Array of all stacking contexts
 * @return {Color}
 */
function calculateBlendedForegroundColor(fgColor, context, stackingContexts) {
  while (context) {
    // find the nearest ancestor that has opacity < 1
    if (context.opacity === 1 && context.ancestor) {
      context = context.ancestor;
      continue;
    }

    fgColor.alpha *= context.opacity;

    // when blending the foreground color to a background color with opacity,
    // we ignore the background color of the node itself and instead blend
    // with the stack behind it
    let stack = context.ancestor?.descendants || stackingContexts;
    if (context.opacity !== 1) {
      stack = stack.slice(0, stack.indexOf(context));
    }

    const bgColors = stack.map(stackingContextToColor);

    if (!bgColors.length) {
      context = context.ancestor;
      continue;
    }

    const bgColor = bgColors.reduce(
      (backdrop, source) => {
        return flattenColors(
          source.color,
          backdrop.color instanceof chunk013.Color ? backdrop.color : backdrop
        );
      },
      {
        color: new chunk013.Color(0, 0, 0, 0),
        blendMode: 'normal'
      }
    );

    fgColor = flattenColors(fgColor, bgColor);
    context = context.ancestor;
  }

  return fgColor;
}

/**
 * Find the stacking context that belongs to the passed in node
 * @param {Object} contexts - Array of stacking contexts
 * @param {Element} node
 * @returns {Object}
 */
function findNodeInContexts(contexts, node) {
  for (const context of contexts) {
    if (context.vNode?.actualNode === node) {
      return context;
    }

    const found = findNodeInContexts(context.descendants, node);
    if (found) {
      return found;
    }
  }
}

/**
 * Check whether certain text properties meet WCAG contrast rules
 * @method hasValidContrastRatio
 * @memberof axe.commons.color.Color
 * @instance
 * @param  {Color}  bgcolor  Background color
 * @param  {Color}  fgcolor  Foreground color
 * @param  {number}  fontSize  Font size of text, in pixels
 * @param  {boolean}  isBold  Whether the text is bold
 * @return {{isValid: boolean, contrastRatio: number, expectedContrastRatio: number}}
 *
 * @deprecated
 */
function hasValidContrastRatio(bg, fg, fontSize, isBold) {
  const contrast = getContrast(bg, fg);
  const isSmallFont =
    (isBold && Math.ceil(fontSize * 72) / 96 < 14) ||
    (!isBold && Math.ceil(fontSize * 72) / 96 < 18);
  const expectedContrastRatio = isSmallFont ? 4.5 : 3;

  return {
    isValid: contrast > expectedContrastRatio,
    contrastRatio: contrast,
    expectedContrastRatio: expectedContrastRatio
  };
}

/**
 * Namespace for color-related utilities.
 * @namespace commons.color
 * @memberof axe
 */

const color = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Color: chunk013.Color,
  centerPointOfRect,
  elementHasImage: chunk012.elementHasImage,
  elementIsDistinct,
  filteredRectStack,
  flattenColors,
  flattenShadowColors,
  getBackgroundColor,
  getBackgroundStack,
  getContrast,
  getForegroundColor,
  getOwnBackgroundColor: chunk013.getOwnBackgroundColor,
  getRectStack,
  getStackingContext,
  getStrokeColorsFromShadows,
  getTextShadowColors,
  hasValidContrastRatio,
  incompleteData: chunk012.incompleteData,
  parseTextShadows,
  stackingContextToColor
}, Symbol.toStringTag, { value: 'Module' }));

exports.color = color;
exports.elementIsDistinct = elementIsDistinct;
exports.flattenShadowColors = flattenShadowColors;
exports.getBackgroundColor = getBackgroundColor;
exports.getContrast = getContrast;
exports.getForegroundColor = getForegroundColor;
exports.getTextShadowColors = getTextShadowColors;
exports.unsupportedroleEvaluate = unsupportedroleEvaluate;
exports.validScrollableSemanticsEvaluate = validScrollableSemanticsEvaluate;
