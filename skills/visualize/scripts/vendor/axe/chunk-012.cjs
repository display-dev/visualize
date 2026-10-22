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

const chunk010 = require('./chunk-010.cjs');
const chunk007 = require('./chunk-007.cjs');

/**
 * Return the document or document fragment (shadow DOM)
 * @method getRootNode
 * @memberof axe.utils
 * @param {Element} node
 * @returns {DocumentFragment|Document}
 */
function getRootNode(node) {
  let doc = (node.getRootNode && node.getRootNode()) || document; // this is for backwards compatibility
  if (doc === node) {
    // disconnected node
    doc = document;
  }
  return doc;
}

/**
 * Determine if two rectangles touch.
 * @method rectsOverlap
 * @memberof axe.commons.math
 * @param {DOMRect} rect1
 * @param {DOMRect} rect2
 * @returns {Boolean}
 */
function rectsOverlap(rect1, rect2) {
  // perform an AABB (axis-aligned bounding box) check.
  // account for differences in how browsers handle floating
  // point precision of bounding rects
  // @see https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

  /* eslint-disable no-bitwise */
  return (
    (rect1.left | 0) < (rect2.right | 0) &&
    (rect1.right | 0) > (rect2.left | 0) &&
    (rect1.top | 0) < (rect2.bottom | 0) &&
    (rect1.bottom | 0) > (rect2.top | 0)
  );
  /* eslint-enable no-bitwise */
}

/**
 * Get all ancestor nodes (including the passed in node) that have overflow:hidden
 * @method getOverflowHiddenAncestors
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode
 * @returns {VirtualNode[]}
 */
const getOverflowHiddenAncestors = chunk010.memoizeImplementation(
  function getOverflowHiddenAncestorsMemoized(vNode) {
    const ancestors = [];

    if (!vNode) {
      return ancestors;
    }

    const overflow = vNode.getComputedStylePropertyValue('overflow');

    if (overflow === 'hidden') {
      ancestors.push(vNode);
    }

    return ancestors.concat(getOverflowHiddenAncestors(vNode.parent));
  }
);

/**
 * Get an element's parent in the flattened tree
 * @method getComposedParent
 * @memberof axe.commons.dom
 * @instance
 * @param {Node} element
 * @return {Node|null} Parent element or Null for root node
 */
function getComposedParent(element) {
  if (element.assignedSlot) {
    // NOTE: If the display of a slot element isn't 'contents',
    // the slot shouldn't be ignored. Chrome does not support this (yet) so,
    // we'll skip this part for now.
    return getComposedParent(element.assignedSlot); // parent of a shadow DOM slot
  } else if (element.parentNode) {
    const parentNode = element.parentNode;
    if (parentNode.nodeType === 1) {
      return parentNode; // Regular node
    } else if (parentNode.host) {
      return parentNode.host; // Shadow root
    }
  }
  return null; // Root node
}

/**
 * Get the scroll offset of the document passed in
 * @method getScrollOffset
 * @memberof axe.commons.dom
 * @instance
 * @param {Document} element The element to evaluate, defaults to document
 * @return {Object} Contains the attributes `x` and `y` which contain the scroll offsets
 */
function getScrollOffset(element) {
  if (!element.nodeType && element.document) {
    element = element.document;
  }

  // 9 === Node.DOCUMENT_NODE
  if (element.nodeType === 9) {
    const docElement = element.documentElement,
      body = element.body;

    return {
      left:
        (docElement && docElement.scrollLeft) || (body && body.scrollLeft) || 0,
      top: (docElement && docElement.scrollTop) || (body && body.scrollTop) || 0
    };
  }

  return {
    left: element.scrollLeft,
    top: element.scrollTop
  };
}

/**
 * Get the coordinates of the element passed into the function relative to the document
 * @method getElementCoordinates
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} element The HTMLElement
 * @return {elementObj} elementObj Returns a `Object` with the following properties, which
 * each hold a value representing the pixels for each of the
 */
/**
 * @typedef elementObj
 * @type {Object}
 * @property {Number} top The top coordinate of the element
 * @property {Number} right The right coordinate of the element
 * @property {Number} bottom The bottom coordinate of the element
 * @property {Number} left The left coordinate of the element
 * @property {Number} width The width of the element
 * @property {Number} height The height of the element
 */
function getElementCoordinates(element) {
  const scrollOffset = getScrollOffset(document),
    xOffset = scrollOffset.left,
    yOffset = scrollOffset.top,
    coords = element.getBoundingClientRect();

  return {
    top: coords.top + yOffset,
    right: coords.right + xOffset,
    bottom: coords.bottom + yOffset,
    left: coords.left + xOffset,
    width: coords.right - coords.left,
    height: coords.bottom - coords.top
  };
}

/**
 * Gets the width and height of the viewport; used to calculate the right and bottom boundaries of the viewable area.
 * @method getViewportSize
 * @memberof axe.commons.dom
 * @instance
 * @param  {Object}  win The `window` object that should be measured
 * @return {Object}  Object with the `width` and `height` of the viewport
 */
function getViewportSize(win) {
  const doc = win.document;
  const docElement = doc.documentElement;

  if (win.innerWidth) {
    return {
      width: win.innerWidth,
      height: win.innerHeight
    };
  }

  if (docElement) {
    return {
      width: docElement.clientWidth,
      height: docElement.clientHeight
    };
  }

  const body = doc.body;

  return {
    width: body.clientWidth,
    height: body.clientHeight
  };
}

/**
 * Return a new rect that wraps around both rectA and rectB
 * @method getBoundingRect
 * @memberof axe.commons.math
 * @param {DOMRect} rectA
 * @param {DOMRect} rectB
 * @returns {DOMRect}
 */
function getBoundingRect(rectA, rectB) {
  const top = Math.min(rectA.top, rectB.top);
  const right = Math.max(rectA.right, rectB.right);
  const bottom = Math.max(rectA.bottom, rectB.bottom);
  const left = Math.min(rectA.left, rectB.left);
  return new window.DOMRect(left, top, right - left, bottom - top);
}

/**
 * Check if the DOMPoint is within the DOMRect
 * @method isPointInRect
 * @memberof axe.commons.math
 * @param {DOMPoint}
 * @param {DOMRect}
 * @returns {boolean}
 */
function isPointInRect({ x, y }, { top, right, bottom, left }) {
  return y >= top && x <= right && y <= bottom && x >= left;
}

/**
 * Get the intersection rectangle of two rectangles. Returns null if the rectangles do not intersect.
 * @see https://math.stackexchange.com/a/2477358
 * @method getIntersectionRect
 * @memberof axe.commons.math
 * @param {DOMRect} rect1
 * @param {DOMRect} rect2
 * @returns {DOMRect|Null}
 */
function getIntersectionRect(rect1, rect2) {
  const leftX = Math.max(rect1.left, rect2.left);
  const rightX = Math.min(rect1.right, rect2.right);
  const topY = Math.max(rect1.top, rect2.top);
  const bottomY = Math.min(rect1.bottom, rect2.bottom);

  if (leftX >= rightX || topY >= bottomY) {
    return null;
  }

  return new window.DOMRect(leftX, topY, rightX - leftX, bottomY - topY);
}

/**
 * Return the center point of a rect
 * @method getRectCenter
 * @memberof axe.commons.math
 * @param {DOMRect}
 * @returns {DOMPoint}
 */
function getRectCenter({ left, top, width, height }) {
  return new window.DOMPoint(left + width / 2, top + height / 2);
}

const roundingMargin = 0.05;

function rectHasMinimumSize(minSize, { width, height }) {
  return (
    width + roundingMargin >= minSize && height + roundingMargin >= minSize
  );
}

/**
 * Given an outer rect, and a list of rects that overlap with it, find any rectangular
 * space that does not overlap.
 * @method getOffset
 * @memberof axe.commons.math
 * @param {DOMRect|DOMRect[]} outerRect
 * @param {DOMRect[]} overlapRects
 * @returns {DOMRect[]} Unique array of rects
 */
function splitRects(outerRect, overlapRects) {
  let uniqueRects = Array.isArray(outerRect) ? outerRect : [outerRect];
  for (const overlapRect of overlapRects) {
    uniqueRects = uniqueRects.reduce((rects, inputRect) => {
      return rects.concat(splitRect(inputRect, overlapRect));
    }, []);

    // exit early if we get too many rects that it starts causing
    // a performance bottleneck
    // @see https://github.com/dequelabs/axe-core/issues/4359
    if (uniqueRects.length > 4000) {
      throw new Error('splitRects: Too many rects');
    }
  }
  return uniqueRects;
}

// Cut the input rect along any intersecting edge of the clip rect.
function splitRect(inputRect, clipRect) {
  const { top, left, bottom, right } = inputRect;
  const yAligned = top < clipRect.bottom && bottom > clipRect.top;
  const xAligned = left < clipRect.right && right > clipRect.left;

  const rects = [];
  if (between(clipRect.top, top, bottom) && xAligned) {
    rects.push({ top, left, bottom: clipRect.top, right });
  }
  if (between(clipRect.right, left, right) && yAligned) {
    rects.push({ top, left: clipRect.right, bottom, right });
  }
  if (between(clipRect.bottom, top, bottom) && xAligned) {
    rects.push({ top: clipRect.bottom, right, bottom, left });
  }
  if (between(clipRect.left, left, right) && yAligned) {
    rects.push({ top, left, bottom, right: clipRect.left });
  }
  if (rects.length === 0) {
    // Fully overlapping
    if (isEnclosedRect(inputRect, clipRect)) {
      return [];
    }

    rects.push(inputRect); // No intersection
  }

  return rects.map(computeRect); // add x / y / width / height
}

const between = (num, min, max) => num > min && num < max;

function computeRect(baseRect) {
  return new window.DOMRect(
    baseRect.left,
    baseRect.top,
    baseRect.right - baseRect.left,
    baseRect.bottom - baseRect.top
  );
}

function isEnclosedRect(rectA, rectB) {
  return (
    rectA.top >= rectB.top &&
    rectA.left >= rectB.left &&
    rectA.bottom <= rectB.bottom &&
    rectA.right <= rectB.right
  );
}

// angular skip links start with /#
const angularSkipLinkRegex = /^\/\#/;

// angular router link uses #! or #/
const angularRouterLinkRegex = /^#[!/]/;

/**
 * Determine if an anchor elements href attribute references the current page.
 * @method isCurrentPageLink
 * @memberof axe.commons.dom
 * @param {HTMLAnchorElement} anchor
 * @return {Boolean|null}
 */
function isCurrentPageLink(anchor) {
  const href = anchor.getAttribute('href');
  if (!href || href === '#') {
    return false;
  }

  if (angularSkipLinkRegex.test(href)) {
    return true;
  }

  const { hash, protocol, hostname, port, pathname } = anchor;
  if (angularRouterLinkRegex.test(hash)) {
    return false;
  }

  if (href.charAt(0) === '#') {
    return true;
  }

  // jsdom can have window.location.origin set to "null" (the string)
  // if the url option is not set when parsing the dom string
  if (
    typeof window.location?.origin !== 'string' ||
    window.location.origin.indexOf('://') === -1
  ) {
    return null;
  }

  // ie11 does not support window.origin
  const currentPageUrl = window.location.origin + window.location.pathname;

  // ie11 does not have anchor.origin so we need to construct
  // it ourselves
  // also ie11 has empty protocol, hostname, and port when the
  // link is relative, so use window.location.origin in these cases
  let url;
  if (!hostname) {
    url = window.location.origin;
  } else {
    url = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  // ie11 has empty pathname if link is just a hash, so use
  // window.location.pathname in these cases
  if (!pathname) {
    url += window.location.pathname;
  } else {
    // ie11 pathname does not start with / but chrome and firefox do
    url += (pathname[0] !== '/' ? '/' : '') + pathname;
  }

  return url === currentPageUrl;
}

/**
 * Returns a reference to the element matching the attr URL fragment value
 * @method getElementByReference
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 * @param {String} attr Attribute name (href)
 * @return {Element}
 */
function getElementByReference(node, attr) {
  let fragment = node.getAttribute(attr);
  if (!fragment) {
    return null;
  }

  if (attr === 'href' && !isCurrentPageLink(node)) {
    return null;
  }

  if (fragment.indexOf('#') !== -1) {
    fragment = decodeURIComponent(fragment.substr(fragment.indexOf('#') + 1));
  }

  let candidate = document.getElementById(fragment);
  if (candidate) {
    return candidate;
  }

  candidate = document.getElementsByName(fragment);
  if (candidate.length) {
    return candidate[0];
  }
  return null;
}

/**
 * Removes carriage returns, newline characters, tabs, non-breaking spaces, and trailing spaces from string
 * @method sanitize
 * @memberof axe.commons.text
 * @instance
 * @param  {String} str String to be cleaned
 * @return {String} Sanitized string
 */
function sanitize(str) {
  if (!str) {
    return '';
  }

  return str
    .replace(/\r\n/g, '\n')
    .replace(/\u00A0/g, ' ')
    .replace(/[\s]{2,}/g, ' ')
    .trim();
}

/**
 * Check if some value matches
 *
 * ```js
 * match.fromPrimative('foo', 'foo') // true, string is the same
 * match.fromPrimative('foo', ['foo', 'bar']) // true, string is included
 * match.fromPrimative('foo', /foo/) // true, string matches regex
 * match.fromPrimative('foo', str => str.toUpperCase() === 'FOO') // true, function return is truthy
 * match.fromPrimative('foo', '/foo/') // true, string matches regex string
 * ```
 *
 * @private
 * @param {String|Boolean|Array|Number|Null|Undefined} someString
 * @param {String|RegExp|Function|Array<String>|Null|Undefined} matcher
 * @returns {Boolean}
 */
function fromPrimative(someString, matcher) {
  const matcherType = typeof matcher;
  if (Array.isArray(matcher) && typeof someString !== 'undefined') {
    return matcher.includes(someString);
  }

  if (matcherType === 'function') {
    return !!matcher(someString);
  }

  // RegExp.test(str) typecasts the str to a String value so doing
  // `/.*/.test(null)` returns true as null is cast to "null"
  if (someString !== null && someString !== undefined) {
    if (matcher instanceof RegExp) {
      return matcher.test(someString);
    }

    // matcher starts and ends with "/"
    if (/^\/.*\/$/.test(matcher)) {
      const pattern = matcher.substring(1, matcher.length - 1);
      return new RegExp(pattern).test(someString);
    }
  }

  return matcher === someString;
}

/**
 * Check if the value from a function matches some condition
 *
 * Each key on the matcher object is passed to getValue, the returned value must match
 * with the value of that matcher
 *
 * Example:
 * ```js
 * matches.fromFunction(
 * 	 (attr => node.getAttribute(attr),
 * 	 {
 * 	   'aria-hidden': /^true|false$/i
 * 	 }
 * )
 * ```
 *
 * @private
 * @param {Function} getValue
 * @param {Object} matcher matcher
 * @returns {Boolean}
 */
function fromFunction(getValue, matcher) {
  const matcherType = typeof matcher;
  if (
    matcherType !== 'object' ||
    Array.isArray(matcher) ||
    matcher instanceof RegExp
  ) {
    throw new Error('Expect matcher to be an object');
  }

  // Check that the property has all the expected values
  return Object.keys(matcher).every(propName => {
    return fromPrimative(getValue(propName), matcher[propName]);
  });
}

/**
 * Check if a "thing" is truthy according to a "condition"
 *
 * Note: matches.condition(node, matcher) can be indirectly used through
 * matches(node, { condition: matcher })
 *
 * Example:
 * ```js
 * matches.condition(node, (arg) => arg === null)
 * ```
 *
 * @param {any} argument
 * @param {Function|Null|undefined} matcher
 * @returns {Boolean}
 */
function condition(arg, matcher) {
  return !!matcher(arg);
}

const unsupported = {
  // Element's who's value is not consistently picked up in the accessible name
  // Supported in Chrome 114, Firefox 115, but not Safari 16.5:
  // <input aria-labelledby="lbl">
  // <div id="lbl" role="progressbar" aria-valuenow="23"></div>
  accessibleNameFromFieldValue: ['progressbar']
};

/**
 * Regex for matching unicode values out of Basic Multilingual Plane (BMP)
 * Reference:
 * - https://github.com/mathiasbynens/regenerate
 * - https://unicode-table.com/
 * - https://mathiasbynens.be/notes/javascript-unicode
 *
 * @returns {RegExp}
 */
function getUnicodeNonBmpRegExp() {
  /**
   * Regex for matching astral plane unicode
   * - http://kourge.net/projects/regexp-unicode-block
   */

  /**
   * Notes on various unicode planes being used in the regex below:
   * '\u1D00-\u1D7F'  Phonetic Extensions
   * '\u1D80-\u1DBF'  Phonetic Extensions Supplement
   * '\u1DC0-\u1DFF'  Combining Diacritical Marks Supplement
   * '\u20A0-\u20CF'  Currency symbols
   * '\u20D0-\u20FF'  Combining Diacritical Marks for Symbols
   * '\u2100-\u214F'  Letter like symbols
   * '\u2150-\u218F'  Number forms (eg: Roman numbers)
   * '\u2190-\u21FF'  Arrows
   * '\u2200-\u22FF'  Mathematical operators
   * '\u2300-\u23FF'  Misc Technical
   * '\u2400-\u243F'  Control pictures
   * '\u2440-\u245F'  OCR
   * '\u2460-\u24FF'  Enclosed alpha numerics
   * '\u2500-\u257F'  Box Drawing
   * '\u2580-\u259F'  Block Elements
   * '\u25A0-\u25FF'  Geometric Shapes
   * '\u2600-\u26FF'  Misc Symbols
   * '\u2700-\u27BF'  Dingbats
   * '\uE000-\uF8FF'  Private Use
   *
   * Note: plane '\u2000-\u206F' used for General punctuation is excluded as it is handled in -> getPunctuationRegExp
   */

  return /[\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u20A0-\u20CF\u20D0-\u20FF\u2100-\u214F\u2150-\u218F\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u2400-\u243F\u2440-\u245F\u2460-\u24FF\u2500-\u257F\u2580-\u259F\u25A0-\u25FF\u2600-\u26FF\u2700-\u27BF\uE000-\uF8FF]/g;
}

/**
 * Get regular expression for matching punctuations
 *
 * @returns {RegExp}
 */
function getPunctuationRegExp() {
  /**
   * Reference: http://kunststube.net/encoding/
   * US-ASCII
   * -> !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
   *
   * General Punctuation block
   * -> \u2000-\u206F
   *
   * Supplemental Punctuation block
   * Reference: https://en.wikipedia.org/wiki/Supplemental_Punctuation
   * -> \u2E00-\u2E7F Reference
   */
  return /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&£¢¥§€()*+,\-.\/:;<=>?@\[\]^_`{|}~±]/g;
}

/**
 * Get regular expression for supplementary private use
 *
 * @returns {RegExp}
 */
function getSupplementaryPrivateUseRegExp() {
  // Supplementary private use area A (https://www.unicode.org/charts/PDF/UF0000.pdf) contains
  // characters between F0000 and FFFFF. Because ES5 doesn't have a syntax for regular expressions
  // of such characters, search instead for the corresponding surrogate pairs.
  //
  // Code points FFFFD and FFFFF are "noncharacters", but the regex still matches them, because its
  // intent is to match things we don't want to check color contrast for. This is why the low
  // surrogate range in the regex ends at DFFF, not DFFD.
  //
  // 1. High surrogate area (https://www.unicode.org/charts/PDF/UD800.pdf)
  // 2. Low surrogate area (https://www.unicode.org/charts/PDF/UDC00.pdf)
  //
  //             1              2
  //      ┏━━━━━━┻━━━━━━┓┏━━━━━━┻━━━━━━┓
  return /[\uDB80-\uDBBF][\uDC00-\uDFFF]/g;
}

/**
 * Get regular expression for unicode format category.
 * When we drop IE11 we can instead use unicode character escape `/p{Cf}/gu`
 * Reference:
 * - https://www.compart.com/en/unicode/category/Cf
 *
 * @returns {RegExp}
 */
function getCategoryFormatRegExp() {
  return /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC38]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/g;
}

/**
 * Determine if a given string contains unicode characters, specified in options
 *
 * @method hasUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to verify
 * @param {Object} options config containing which unicode character sets to verify
 * @property {Boolean} options.emoji verify emoji unicode
 * @property {Boolean} options.nonBmp verify nonBmp unicode
 * @property {Boolean} options.punctuations verify punctuations unicode
 * @returns {Boolean}
 */
function hasUnicode(str, options) {
  const { emoji, nonBmp, punctuations } = options;
  let value = false;

  if (emoji) {
    value ||= chunk010.emojiRegexText().test(str);
  }
  if (nonBmp) {
    value ||=
      getUnicodeNonBmpRegExp().test(str) ||
      getSupplementaryPrivateUseRegExp().test(str) ||
      getCategoryFormatRegExp().test(str);
  }
  if (punctuations) {
    value ||= getPunctuationRegExp().test(str);
  }

  return value;
}

/**
 * Determines if a given text node is an icon ligature
 *
 * @method isIconLigature
 * @memberof axe.commons.text
 * @instance
 * @param {VirtualNode} textVNode The virtual text node
 * @param {Number} occurrenceThreshold Number of times the font is encountered before auto-assigning the font as a ligature or not
 * @param {Number} differenceThreshold Percent of differences in pixel data or pixel width needed to determine if a font is a ligature font
 * @return {Boolean}
 */
function isIconLigature(
  textVNode,
  differenceThreshold = 0.15,
  occurrenceThreshold = 3
) {
  /**
   * Determine if the visible text is a ligature by comparing the
   * first letters image data to the entire strings image data.
   * If the two images are significantly different (typical set to 5%
   * statistical significance, but we'll be using a slightly higher value
   * of 15% to help keep the size of the canvas down) then we know the text
   * has been replaced by a ligature.
   *
   * Example:
   * If a text node was the string "File", looking at just the first
   * letter "F" would produce the following image:
   *
   * ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
   * │ │ │█│█│█│█│█│█│█│█│█│█│█│ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│█│█│█│█│█│█│█│█│█│ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│█│█│█│█│█│ │ │ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│█│█│█│█│█│ │ │ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
   * └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
   *
   * But if the entire string "File" produced an image which had at least
   * a 15% difference in pixels, we would know that the string was replaced
   * by a ligature:
   *
   * ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
   * │ │█│█│█│█│█│█│█│█│█│█│ │ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │ │ │ │ │ │ │ │█│█│ │ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │█│█│█│█│█│█│ │█│ │█│ │ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │ │ │ │ │ │ │ │█│█│█│█│ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │█│█│█│█│█│█│ │ │ │ │█│ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │ │ │ │ │ │ │ │ │ │ │█│ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │█│█│█│█│█│█│█│█│█│ │█│ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│ │ │ │ │ │ │ │ │ │ │ │█│ │
   * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
   * │ │█│█│█│█│█│█│█│█│█│█│█│█│█│ │
   * └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
   */
  const nodeValue = textVNode.actualNode.nodeValue.trim();

  // text with unicode or non-bmp letters cannot be ligature icons
  if (
    !sanitize(nodeValue) ||
    hasUnicode(nodeValue, { emoji: true, nonBmp: true })
  ) {
    return false;
  }

  const canvasContext = chunk007.cache.get('canvasContext', () =>
    document
      .createElement('canvas')
      .getContext('2d', { willReadFrequently: true })
  );
  const canvas = canvasContext.canvas;

  // keep track of each font encountered and the number of times it shows up
  // as a ligature.
  const fonts = chunk007.cache.get('fonts', () => ({}));
  const style = window.getComputedStyle(textVNode.parent.actualNode);
  const fontFamily = style.getPropertyValue('font-family');

  if (!fonts[fontFamily]) {
    fonts[fontFamily] = {
      occurrences: 0,
      numLigatures: 0
    };
  }
  const font = fonts[fontFamily];

  // improve the performance by only comparing the image data of a font a certain number of times
  // NOTE: This MIGHT cause an issue if someone uses an icon font to render actual text.
  //   We're leaving this as-is, unless someone reports a false positive over it.
  if (font.occurrences >= occurrenceThreshold) {
    // if the font has always been a ligature assume it's a ligature font
    if (font.numLigatures / font.occurrences === 1) {
      return true;
    }
    // inversely, if it's never been a ligature assume it's not a ligature font
    else if (font.numLigatures === 0) {
      return false;
    }

    // we could theoretically get into an odd middle ground scenario in which
    // the font family is being used as normal text sometimes and as icons
    // other times. in these cases we would need to always check the text
    // to know if it's an icon or not
  }
  font.occurrences++;

  // 30px was chosen to account for common ligatures in normal fonts
  // such as fi, ff, ffi. If a ligature would add a single column of
  // pixels to a 30x30 grid, it would not meet the statistical significance
  // threshold of 15% (30x30 = 900; 30/900 = 3.333%). this also allows for
  // more than 1 column differences (60/900 = 6.666%) and things like
  // extending the top of the f in the fi ligature.
  let fontSize = 30;
  let fontStyle = `${fontSize}px ${fontFamily}`;

  // set the size of the canvas to the width of the first letter
  canvasContext.font = fontStyle;
  const firstChar = nodeValue.charAt(0);
  let width = canvasContext.measureText(firstChar).width;

  // we already checked for typical zero-width unicode formatting characters further up,
  // so we assume that any remaining zero-width characters are part of an icon ligature
  // @see https://github.com/dequelabs/axe-core/issues/3918
  if (width === 0) {
    font.numLigatures++;
    return true;
  }

  // ensure font meets the 30px width requirement (30px font-size doesn't
  // necessarily mean its 30px wide when drawn)
  if (width < 30) {
    const diff = 30 / width;
    width *= diff;
    fontSize *= diff;
    fontStyle = `${fontSize}px ${fontFamily}`;
  }
  canvas.width = width;
  canvas.height = fontSize;

  // changing the dimensions of a canvas resets all properties (include font)
  // and clears it
  canvasContext.font = fontStyle;
  canvasContext.textAlign = 'left';
  canvasContext.textBaseline = 'top';
  canvasContext.fillText(firstChar, 0, 0);
  const compareData = new Uint32Array(
    canvasContext.getImageData(0, 0, width, fontSize).data.buffer
  );

  // if the font doesn't even have character data for a single char then
  // it has to be an icon ligature (e.g. Material Icon)
  if (!compareData.some(pixel => pixel)) {
    font.numLigatures++;
    return true;
  }

  canvasContext.clearRect(0, 0, width, fontSize);
  canvasContext.fillText(nodeValue, 0, 0);
  const compareWith = new Uint32Array(
    canvasContext.getImageData(0, 0, width, fontSize).data.buffer
  );

  // calculate the number of differences between the first letter and the
  // entire string, ignoring color differences
  const differences = compareData.reduce((diff, pixel, i) => {
    if (pixel === 0 && compareWith[i] === 0) {
      return diff;
    }
    if (pixel !== 0 && compareWith[i] !== 0) {
      return diff;
    }
    return ++diff;
  }, 0);

  // calculate the difference between the width of each character and the
  // combined with of all characters
  const expectedWidth = nodeValue.split('').reduce((totalWidth, char) => {
    return totalWidth + canvasContext.measureText(char).width;
  }, 0);
  const actualWidth = canvasContext.measureText(nodeValue).width;

  const pixelDifference = differences / compareData.length;
  const sizeDifference = 1 - actualWidth / expectedWidth;

  if (
    pixelDifference >= differenceThreshold &&
    sizeDifference >= differenceThreshold
  ) {
    font.numLigatures++;
    return true;
  }

  return false;
}

/**
 * Remove specified type(s) unicode characters
 *
 * @method removeUnicode
 * @memberof axe.commons.text
 * @instance
 * @param {String} str string to operate on
 * @param {Object} options config containing which unicode character sets to remove
 * @property {Boolean} options.emoji remove emoji unicode
 * @property {Boolean} options.nonBmp remove nonBmp unicode
 * @property {Boolean} options.punctuations remove punctuations unicode
 * @returns {String}
 */
function removeUnicode(str, options) {
  const { emoji, nonBmp, punctuations } = options;

  if (emoji) {
    str = str.replace(chunk010.emojiRegexText(), '');
  }
  if (nonBmp) {
    str = str
      .replace(getUnicodeNonBmpRegExp(), '')
      .replace(getSupplementaryPrivateUseRegExp(), '')
      .replace(getCategoryFormatRegExp(), '');
  }
  if (punctuations) {
    str = str.replace(getPunctuationRegExp(), '');
  }

  return str;
}

/**
 * Determines if a given text is human friendly and interpretable
 *
 * @method isHumanInterpretable
 * @memberof axe.commons.text
 * @instance
 * @param  {String} str text to be validated
 * @returns {Number} Between 0 and 1, (0 -> not interpretable, 1 -> interpretable)
 */
function isHumanInterpretable(str) {
  /**
   * Steps:
   * 1) Early escape if string is empty
   *
   * 2) Check for single alpha character edge cases
   *
   * 3) Check for symbolic text character edge cases
   * 		a) handle if character is alphanumeric & within the given icon mapping
   * 					eg: 'aA' for toggling capitalization
   *
   * 4) handle unicode from astral (non bilingual multi plane) unicode, emoji & punctuations
   * 					eg: Windings font
   * 					eg: '💪'
   * 					eg: I saw a shooting 💫
   * 					eg: ? (help), > (next arrow), < (back arrow), need help ?
   */

  if (
    isEmpty(str) ||
    isNonDigitCharacter(str) ||
    isSymbolicText(str) ||
    isUnicodeOrPunctuation(str)
  ) {
    return 0;
  }

  return 1;
}

function isEmpty(str) {
  return sanitize(str).length === 0;
}

function isNonDigitCharacter(str) {
  return str.length === 1 && str.match(/\D/);
}

function isSymbolicText(str) {
  const symbolicText = [
    'aa', // toggle capitalization (aA)
    'abc' // spelling
  ];

  return symbolicText.includes(str.toLowerCase());
}

function isUnicodeOrPunctuation(str) {
  const noUnicodeStr = removeUnicode(str, {
    emoji: true,
    nonBmp: true,
    punctuations: true
  });

  return !sanitize(noUnicodeStr);
}

const autocomplete = {
  stateTerms: ['on', 'off'],
  standaloneTerms: [
    'name',
    'honorific-prefix',
    'given-name',
    'additional-name',
    'family-name',
    'honorific-suffix',
    'nickname',
    'username',
    'new-password',
    'current-password',
    'organization-title',
    'organization',
    'street-address',
    'address-line1',
    'address-line2',
    'address-line3',
    'address-level4',
    'address-level3',
    'address-level2',
    'address-level1',
    'country',
    'country-name',
    'postal-code',
    'cc-name',
    'cc-given-name',
    'cc-additional-name',
    'cc-family-name',
    'cc-number',
    'cc-exp',
    'cc-exp-month',
    'cc-exp-year',
    'cc-csc',
    'cc-type',
    'transaction-currency',
    'transaction-amount',
    'language',
    'bday',
    'bday-day',
    'bday-month',
    'bday-year',
    'sex',
    'url',
    'photo',
    'one-time-code'
  ],
  qualifiers: ['home', 'work', 'mobile', 'fax', 'pager'],
  qualifiedTerms: [
    'tel',
    'tel-country-code',
    'tel-national',
    'tel-area-code',
    'tel-local',
    'tel-local-prefix',
    'tel-local-suffix',
    'tel-extension',
    'email',
    'impp'
  ],
  locations: ['billing', 'shipping']
};

function isValidAutocomplete(
  autocompleteValue,
  {
    looseTyped = false,
    stateTerms = [],
    locations = [],
    qualifiers = [],
    standaloneTerms = [],
    qualifiedTerms = [],
    ignoredValues = []
  } = {}
) {
  autocompleteValue = autocompleteValue.toLowerCase().trim();
  stateTerms = stateTerms.concat(autocomplete.stateTerms);
  if (stateTerms.includes(autocompleteValue) || autocompleteValue === '') {
    return true;
  }

  qualifiers = qualifiers.concat(autocomplete.qualifiers);
  locations = locations.concat(autocomplete.locations);
  standaloneTerms = standaloneTerms.concat(autocomplete.standaloneTerms);
  qualifiedTerms = qualifiedTerms.concat(autocomplete.qualifiedTerms);

  const autocompleteTerms = autocompleteValue.split(/\s+/g);

  if (autocompleteTerms[autocompleteTerms.length - 1] === 'webauthn') {
    autocompleteTerms.pop();
    if (autocompleteTerms.length === 0) {
      return false;
    }
  }

  if (!looseTyped) {
    if (
      autocompleteTerms[0].length > 8 &&
      autocompleteTerms[0].substr(0, 8) === 'section-'
    ) {
      autocompleteTerms.shift();
    }

    if (locations.includes(autocompleteTerms[0])) {
      autocompleteTerms.shift();
    }

    if (qualifiers.includes(autocompleteTerms[0])) {
      autocompleteTerms.shift();
      // only quantifiers allowed at this point
      standaloneTerms = [];
    }

    if (autocompleteTerms.length !== 1) {
      return false;
    }
  }

  const purposeTerm = autocompleteTerms[autocompleteTerms.length - 1];

  if (ignoredValues.includes(purposeTerm)) {
    return undefined;
  }

  return (
    standaloneTerms.includes(purposeTerm) ||
    qualifiedTerms.includes(purposeTerm)
  );
}

const nativeElementType = [
  {
    // 5.1 input type="text", input type="password", input type="search", input type="tel", input type="url" and textarea Element
    matches: [
      {
        nodeName: 'textarea'
      },
      {
        nodeName: 'input',
        properties: {
          type: ['text', 'password', 'search', 'tel', 'email', 'url']
        }
      }
    ],
    namingMethods: 'labelText'
  },
  {
    // 5.2 input type="button", input type="submit" and input type="reset"
    matches: {
      nodeName: 'input',
      properties: {
        type: ['button', 'submit', 'reset']
      }
    },
    namingMethods: ['valueText', 'titleText', 'buttonDefaultText']
  },
  {
    // 5.3 input type="image"
    matches: {
      nodeName: 'input',
      properties: {
        type: 'image'
      }
    },
    namingMethods: [
      'altText',
      'valueText',
      'labelText',
      'titleText',
      'buttonDefaultText'
    ]
  },
  {
    // 5.4 button Element
    matches: 'button',
    namingMethods: 'subtreeText'
  },
  {
    // 5.5 fieldset and legend Elements
    matches: 'fieldset',
    namingMethods: 'fieldsetLegendText'
  },
  {
    // 5.6 output Element
    matches: 'OUTPUT',
    namingMethods: 'subtreeText'
  },
  {
    // 5.7 Other Form Elements
    matches: [
      {
        nodeName: 'select'
      },
      {
        nodeName: 'input',
        properties: {
          // Regex: Everything other than these
          type: /^(?!text|password|search|tel|email|url|button|submit|reset)/
        }
      }
    ],
    namingMethods: 'labelText'
  },
  {
    // 5.8 summary Element
    matches: 'summary',
    namingMethods: 'subtreeText'
  },
  {
    // 5.9 figure and figcaption Elements
    matches: 'figure',
    namingMethods: ['figureText', 'titleText']
  },
  {
    // 5.10 img Element
    matches: 'img',
    namingMethods: 'altText'
  },
  {
    // 5.11 table Element
    matches: 'table',
    namingMethods: ['tableCaptionText', 'tableSummaryText']
  },
  {
    matches: ['hr', 'br'],
    namingMethods: ['titleText', 'singleSpace']
  }
  // All else defaults to just title
];

/**
 * Determines if a document node is HTML 5
 * @method isHTML5
 * @memberof axe.commons.dom
 * @instance
 * @param {Node} doc
 * @return {Boolean}
 */
function isHTML5(doc) {
  const node = doc.doctype;
  if (node === null) {
    return false;
  }
  return node.name === 'html' && !node.publicId && !node.systemId;
}

/**
 * Returns true if content has client rects that have no vertical overlap.
 * I.e. they are rendered on different "lines".
 * @param {Element} domNode
 * @param {number} margin (default: 2)
 * @returns {number}
 */
function isMultiline(domNode, margin = 2) {
  const range = domNode.ownerDocument.createRange();
  range.setStart(domNode, 0);
  range.setEnd(domNode, domNode.childNodes.length);
  let lastLineEnd = 0;
  let lineCount = 0;
  for (const rect of range.getClientRects()) {
    if (rect.height <= margin) {
      continue;
    }
    if (lastLineEnd > rect.top + margin) {
      lastLineEnd = Math.max(lastLineEnd, rect.bottom);
    } else if (lineCount === 0) {
      lastLineEnd = rect.bottom;
      lineCount++;
    } else {
      return true;
    }
  }
  return false;
}

/**
 * Determines if element is an instance of Node
 * @method isNode
 * @memberof axe.commons.dom
 * @instance
 * @deprecated
 * @param  {Element} element
 * @return {Boolean}
 */
function isNode(element) {
  return element instanceof window.Node;
}

const cacheKey = 'color.incompleteData';

/**
 * API for handling incomplete color data
 * @namespace axe.commons.color.incompleteData
 * @inner
 */
const incompleteData = {
  /**
   * Store incomplete data by key with a string value
   * @method set
   * @memberof axe.commons.color.incompleteData
   * @instance
   * @param {String} key Identifier for missing data point (fgColor, bgColor, etc.)
   * @param {String} reason Missing data reason to match message template
   */
  set: function (key, reason) {
    if (typeof key !== 'string') {
      throw new Error('Incomplete data: key must be a string');
    }
    const data = chunk007.cache.get(cacheKey, () => ({}));
    if (reason) {
      data[key] = reason;
    }
    return data[key];
  },
  /**
   * Get incomplete data by key
   * @method get
   * @memberof axe.commons.color.incompleteData
   * @instance
   * @param {String} key 	Identifier for missing data point (fgColor, bgColor, etc.)
   * @return {String} String for reason we couldn't tell
   */
  get: function (key) {
    const data = chunk007.cache.get(cacheKey);
    return data?.[key];
  },
  /**
   * Clear incomplete data on demand
   * @method clear
   * @memberof axe.commons.color.incompleteData
   * @instance
   */
  clear: function () {
    chunk007.cache.set(cacheKey, {});
  }
};

/**
 * Reports if an element has a background image or gradient
 *
 * @method elementHasImage
 * @memberof axe.commons.color
 * @private
 * @param {Element} elm
 * @param {Object|null} style
 * @return {Boolean}
 */
function elementHasImage(elm, style) {
  const graphicNodes = ['IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG'];
  const nodeName = elm.nodeName.toUpperCase();

  if (graphicNodes.includes(nodeName)) {
    incompleteData.set('bgColor', 'imgNode');
    return true;
  }

  style = style || window.getComputedStyle(elm);

  const bgImageStyle = style.getPropertyValue('background-image');
  const hasBgImage = bgImageStyle !== 'none';

  if (hasBgImage) {
    const hasGradient = /gradient/.test(bgImageStyle);
    incompleteData.set('bgColor', hasGradient ? 'bgGradient' : 'bgImage');
  }

  return hasBgImage;
}

/**
 * Convenience function to extract primary language subtag from a given value
 * @method getBaseLang
 * @memberof axe.utils
 * @param {String} value value specified as lang or xml:lang attribute
 * @return {String}
 */
function getBaseLang(lang) {
  if (!lang) {
    return '';
  }
  return lang.trim().split('-')[0].toLowerCase();
}

/**
 * Finds failing Checks and combines each help message into an array
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {String}          failure messages
 */
function failureSummary(nodeData) {
  const failingChecks = {};
  // combine "all" and "none" as messaging is the same
  failingChecks.none = nodeData.none.concat(nodeData.all);
  failingChecks.any = nodeData.any;

  return Object.keys(failingChecks)
    .map(key => {
      if (!failingChecks[key].length) {
        return;
      }

      const sum = chunk007.axe._audit.data.failureSummaries[key];
      if (sum && typeof sum.failureMessage === 'function') {
        return sum.failureMessage(
          failingChecks[key].map(check => {
            return check.message || '';
          })
        );
      }
    })
    .filter(i => {
      return i !== undefined;
    })
    .join('\n\n');
}

/**
 * Provides a fallback message in case incomplete checks don't provide one
 * This mechanism allows the string to be localized.
 * @return {String}
 */
function incompleteFallbackMessage() {
  let { incompleteFallbackMessage: message } = chunk007.axe._audit.data;
  if (typeof message === 'function') {
    message = message();
  }
  if (typeof message !== 'string') {
    return '';
  }
  return message;
}

/**
 * Determines which CheckOption to use, either defined on the rule options, global check options or the check itself
 * @param  {Check} check    The Check object
 * @param  {String} ruleID  The ID of the rule
 * @param  {Object} options Options object as passed to main API
 * @return {Object}         The resolved object with `options` and `enabled` keys
 */
function getCheckOption(check, ruleID, options) {
  const ruleCheckOption = (((options.rules && options.rules[ruleID]) || {})
    .checks || {})[check.id];
  const checkOption = (options.checks || {})[check.id];

  let enabled = check.enabled;
  let opts = check.options;

  if (checkOption) {
    if (checkOption.hasOwnProperty('enabled')) {
      enabled = checkOption.enabled;
    }
    if (checkOption.hasOwnProperty('options')) {
      opts = checkOption.options;
    }
  }

  if (ruleCheckOption) {
    if (ruleCheckOption.hasOwnProperty('enabled')) {
      enabled = ruleCheckOption.enabled;
    }
    if (ruleCheckOption.hasOwnProperty('options')) {
      opts = ruleCheckOption.options;
    }
  }

  return {
    enabled: enabled,
    options: opts,
    absolutePaths: options.absolutePaths
  };
}

/**
 * Add information about the environment axe was run in.
 * @return {EnvironmentData}
 */
function getEnvironmentData(metadata = null, win = window) {
  if (metadata && typeof metadata === 'object') {
    return metadata;
  } else if (typeof win !== 'object') {
    return {};
  }

  return {
    testEngine: {
      name: 'axe-core',
      version: chunk007.axe.version
    },
    testRunner: {
      name: chunk007.axe._audit.brand
    },
    testEnvironment: getTestEnvironment(win),
    timestamp: new Date().toISOString(),
    url: win.location?.href
  };
}

function getTestEnvironment(win) {
  if (!win.navigator || typeof win.navigator !== 'object') {
    return {};
  }
  const { navigator, innerHeight, innerWidth } = win;
  const { angle, type } = getOrientation(win) || {};
  return {
    userAgent: navigator.userAgent,
    windowWidth: innerWidth,
    windowHeight: innerHeight,
    orientationAngle: angle,
    orientationType: type
  };
}

function getOrientation({ screen }) {
  return screen.orientation || screen.msOrientation || screen.mozOrientation;
}

/**
 * Filter attributes from an html element and all of its children.
 *
 * Example:
 * ```js
 * // Remove attribute if present
 * axe.utils.filterHtmlAttrs('<div data-attr="foo">my div</div>', { 'data-attr': true });
 *
 * // Remove attribute if CSS selector matches
 * axe.utils.filterHtmlAttrs('<div data-attr="foo">my div</div>', { 'data-attr': 'div' });
 * ```
 *
 * @method filterHtmlAttrs
 * @memberof axe.utils
 * @param {HTMLElement} element - HTML element to remove attributes from
 * @param {Object} filterAttrs - Attributes to remove and the qualifier of when to remove them
 * @returns {HTMLElement} Element with filtered attributes removed
 */
function filterHtmlAttrs(element, filterAttrs) {
  if (!filterAttrs) {
    return element;
  }

  let node = element.cloneNode(false);
  const attributes = chunk007.getNodeAttributes(node);

  if (node.nodeType === 1) {
    const outerHTML = node.outerHTML;
    node = chunk007.cache.get(outerHTML, () =>
      setNodeAttributes(node, attributes, element, filterAttrs)
    );
  } else {
    node = setNodeAttributes(node, attributes, element, filterAttrs);
  }

  // be sure to append text nodes as well
  Array.from(element.childNodes).forEach(child => {
    node.appendChild(filterHtmlAttrs(child, filterAttrs));
  });

  return node;
}

function setNodeAttributes(node, attributes, element, filterAttrs) {
  if (!attributes) {
    return node;
  }
  node = document.createElement(node.nodeName);
  Array.from(attributes).forEach(attr => {
    if (!attributeMatches(element, attr.name, filterAttrs)) {
      // can't remove the value attribute from an input in IE11 so
      // we'll have to reconstruct the node and set attribute
      // manually
      node.setAttribute(attr.name, attr.value);
    }
  });
  return node;
}

/**
 * Test if node and attribute match one of the filtered attributes.
 * @param {HTMLElement} node - node to match
 * @param {String} attrname - Name of the attribute to test
 * @param {Object} filterAttrs - Attributes to remove and the qualifier of when to remove them.
 */
function attributeMatches(node, attrName, filterAttrs) {
  if (typeof filterAttrs[attrName] === 'undefined') {
    return false;
  }

  // filterAttrs can only be a boolean or a CSS selector
  if (filterAttrs[attrName] === true) {
    return true;
  }

  return chunk010.matchesSelector(node, filterAttrs[attrName]);
}

exports.autocomplete = autocomplete;
exports.condition = condition;
exports.elementHasImage = elementHasImage;
exports.failureSummary = failureSummary;
exports.filterHtmlAttrs = filterHtmlAttrs;
exports.fromFunction = fromFunction;
exports.fromPrimative = fromPrimative;
exports.getBaseLang = getBaseLang;
exports.getBoundingRect = getBoundingRect;
exports.getCheckOption = getCheckOption;
exports.getComposedParent = getComposedParent;
exports.getElementByReference = getElementByReference;
exports.getElementCoordinates = getElementCoordinates;
exports.getEnvironmentData = getEnvironmentData;
exports.getIntersectionRect = getIntersectionRect;
exports.getOverflowHiddenAncestors = getOverflowHiddenAncestors;
exports.getRectCenter = getRectCenter;
exports.getRootNode = getRootNode;
exports.getScrollOffset = getScrollOffset;
exports.getViewportSize = getViewportSize;
exports.hasUnicode = hasUnicode;
exports.incompleteData = incompleteData;
exports.incompleteFallbackMessage = incompleteFallbackMessage;
exports.isCurrentPageLink = isCurrentPageLink;
exports.isHTML5 = isHTML5;
exports.isHumanInterpretable = isHumanInterpretable;
exports.isIconLigature = isIconLigature;
exports.isMultiline = isMultiline;
exports.isNode = isNode;
exports.isPointInRect = isPointInRect;
exports.isValidAutocomplete = isValidAutocomplete;
exports.nativeElementType = nativeElementType;
exports.rectHasMinimumSize = rectHasMinimumSize;
exports.rectsOverlap = rectsOverlap;
exports.removeUnicode = removeUnicode;
exports.sanitize = sanitize;
exports.splitRects = splitRects;
exports.unsupported = unsupported;
