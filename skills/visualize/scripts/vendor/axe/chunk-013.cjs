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

const chunk012 = require('./chunk-012.cjs');
const chunk010 = require('./chunk-010.cjs');
const chunk002 = require('./chunk-002.cjs');
const chunk009 = require('./chunk-009.cjs');
const chunk011 = require('./chunk-011.cjs');
const chunk007 = require('./chunk-007.cjs');

const possibleShadowRoots = [
  'article',
  'aside',
  'blockquote',
  'body',
  'div',
  'footer',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'main',
  'nav',
  'p',
  'section',
  'span'
];
/**
 * Test a node to see if it has a spec-conforming shadow root
 *
 * @param {Node}   node  The HTML DOM node
 * @return {Boolean}
 */
function isShadowRoot(node) {
  if (node.shadowRoot) {
    const nodeName = node.nodeName.toLowerCase();
    if (
      possibleShadowRoots.includes(nodeName) ||
      /^[a-z][a-z0-9_.-]*-[a-z0-9_.-]*$/.test(nodeName)
    ) {
      return true;
    }
  }
  return false;
}

const hexRegex = /^#[0-9a-f]{3,8}$/i;
const hslRegex = /hsl\(\s*([-\d.]+)(rad|turn)/;

/**
 * @class Color
 * @memberof axe.commons.color
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 */
class Color {
  // color channel values typically in the range of 0-1 (can go below or above)
  #r;
  #g;
  #b;
  // color component values resolved to the sRGB color space (0-255)
  #red;
  #green;
  #blue;

  constructor(red, green, blue, alpha = 1) {
    if (red instanceof Color) {
      // preserve out of gamut values
      const { r, g, b } = red;
      this.r = r;
      this.g = g;
      this.b = b;
      this.alpha = red.alpha;
      return;
    }

    /** @type {number} */
    this.red = red;

    /** @type {number} */
    this.green = green;

    /** @type {number} */
    this.blue = blue;

    /** @type {number} */
    this.alpha = alpha;
  }

  get r() {
    return this.#r;
  }

  set r(value) {
    this.#r = value;
    this.#red = Math.round(clamp(value, 0, 1) * 255);
  }

  get g() {
    return this.#g;
  }

  set g(value) {
    this.#g = value;
    this.#green = Math.round(clamp(value, 0, 1) * 255);
  }

  get b() {
    return this.#b;
  }

  set b(value) {
    this.#b = value;
    this.#blue = Math.round(clamp(value, 0, 1) * 255);
  }

  get red() {
    return this.#red;
  }

  set red(value) {
    this.#r = value / 255;
    this.#red = clamp(value, 0, 255);
  }

  get green() {
    return this.#green;
  }

  set green(value) {
    this.#g = value / 255;
    this.#green = clamp(value, 0, 255);
  }

  get blue() {
    return this.#blue;
  }

  set blue(value) {
    this.#b = value / 255;
    this.#blue = clamp(value, 0, 255);
  }

  /**
   * Provide the hex string value for the color
   * @method toHexString
   * @memberof axe.commons.color.Color
   * @instance
   * @return {string}
   */
  toHexString() {
    const redString = Math.round(this.red).toString(16);
    const greenString = Math.round(this.green).toString(16);
    const blueString = Math.round(this.blue).toString(16);
    return (
      '#' +
      (this.red > 15.5 ? redString : '0' + redString) +
      (this.green > 15.5 ? greenString : '0' + greenString) +
      (this.blue > 15.5 ? blueString : '0' + blueString)
    );
  }

  toJSON() {
    const { red, green, blue, alpha } = this;
    return { red, green, blue, alpha };
  }

  /**
   * Parse any valid color string and assign its values to "this"
   * @method parseString
   * @memberof axe.commons.color.Color
   * @instance
   */
  parseString(colorString) {
    // Colorjs <v0.5.0 does not support rad or turn angle values
    // @see https://github.com/LeaVerou/color.js/issues/311
    colorString = colorString.replace(hslRegex, (match, angle, unit) => {
      const value = angle + unit;

      switch (unit) {
        case 'rad':
          return match.replace(value, radToDeg(angle));
        case 'turn':
          return match.replace(value, turnToDeg(angle));
      }
    });

    try {
      // revert prototype.js override of Array.from
      // in order to get color-contrast working
      // @see https://github.com/dequelabs/axe-core/issues/4428
      let prototypeArrayFrom;
      if ('Prototype' in window && 'Version' in window.Prototype) {
        prototypeArrayFrom = Array.from;
        Array.from = chunk002.ArrayFrom;
      }

      // srgb values are between 0 and 1
      const color = new chunk009.Color(colorString)
        .toGamut({
          space: 'srgb',
          method: 'clip'
        })
        .to('srgb');

      if (prototypeArrayFrom) {
        Array.from = prototypeArrayFrom;
        prototypeArrayFrom = null;
      }

      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      // color.alpha is a Number object so convert it to a number
      this.alpha = +color.alpha;
    } catch {
      chunk012.incompleteData.set('colorParse', colorString);
      throw new Error(`Unable to parse color "${colorString}"`);
    }

    return this;
  }

  /**
   * Set the color value based on a CSS RGB/RGBA string
   * @method parseRgbString
   * @deprecated
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {string}  rgb  The string value
   */
  parseRgbString(colorString) {
    this.parseString(colorString);
  }

  /**
   * Set the color value based on a CSS RGB/RGBA string
   * @method parseHexString
   * @deprecated
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {string}  rgb  The string value
   */
  parseHexString(colorString) {
    if (!colorString.match(hexRegex) || [6, 8].includes(colorString.length)) {
      return;
    }

    this.parseString(colorString);
  }

  /**
   * Set the color value based on a CSS RGB/RGBA string
   * @method parseColorFnString
   * @deprecated
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {string}  rgb  The string value
   */
  parseColorFnString(colorString) {
    this.parseString(colorString);
  }

  /**
   * Get the relative luminance value
   * using algorithm from http://www.w3.org/WAI/GL/wiki/Relative_luminance
   * @method getRelativeLuminance
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The luminance value, ranges from 0 to 1
   */
  getRelativeLuminance() {
    const { r: rSRGB, g: gSRGB, b: bSRGB } = this;

    const r =
      rSRGB <= 0.04045 ? rSRGB / 12.92 : Math.pow((rSRGB + 0.055) / 1.055, 2.4);
    const g =
      gSRGB <= 0.04045 ? gSRGB / 12.92 : Math.pow((gSRGB + 0.055) / 1.055, 2.4);
    const b =
      bSRGB <= 0.04045 ? bSRGB / 12.92 : Math.pow((bSRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Add a value to the color channels
   * @private
   * @param  {number}  value  The value to add
   * @return {Color} A new color instance
   */
  #add(value) {
    const C = new Color(this);
    C.r += value;
    C.g += value;
    C.b += value;
    return C;
  }

  /**
   * Get the luminosity of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method getLuminosity
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The luminosity of the color
   */
  getLuminosity() {
    return 0.3 * this.r + 0.59 * this.g + 0.11 * this.b;
  }

  /**
   * Set the luminosity of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method setLuminosity
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  L  The luminosity
   * @return {Color} A new color instance
   */
  setLuminosity(L) {
    const d = L - this.getLuminosity();
    return this.#add(d).clip();
  }

  /**
   * Get the saturation of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method getSaturation
   * @memberof axe.commons.color.Color
   * @instance
   * @return {number} The saturation of the color
   */
  getSaturation() {
    return Math.max(this.r, this.g, this.b) - Math.min(this.r, this.g, this.b);
  }

  /**
   * Set the saturation of a color
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method setSaturation
   * @memberof axe.commons.color.Color
   * @instance
   * @param  {number}  s  The saturation
   * @return {Color} A new color instance
   */
  setSaturation(s) {
    const C = new Color(this);
    const colorEntires = [
      { name: 'r', value: C.r },
      { name: 'g', value: C.g },
      { name: 'b', value: C.b }
    ];

    // find the min, mid, and max values of the color components
    const [Cmin, Cmid, Cmax] = colorEntires.sort((a, b) => {
      return a.value - b.value;
    });

    if (Cmax.value > Cmin.value) {
      Cmid.value = ((Cmid.value - Cmin.value) * s) / (Cmax.value - Cmin.value);
      Cmax.value = s;
    } else {
      Cmid.value = Cmax.value = 0;
    }

    Cmin.value = 0;

    C[Cmax.name] = Cmax.value;
    C[Cmin.name] = Cmin.value;
    C[Cmid.name] = Cmid.value;
    return C;
  }

  /**
   * Clip the color between RGB 0-1 accounting for the luminosity of the color. Color must be normalized before calling.
   * using algorithm from https://www.w3.org/TR/compositing-1/#blendingnonseparable
   * @method clip
   * @memberof axe.commons.color.Color
   * @instance
   * @return {Color} A new color instance clipped between 0-1
   */
  clip() {
    const C = new Color(this);
    const L = C.getLuminosity();
    const n = Math.min(C.r, C.g, C.b);
    const x = Math.max(C.r, C.g, C.b);

    if (n < 0) {
      C.r = L + ((C.r - L) * L) / (L - n);
      C.g = L + ((C.g - L) * L) / (L - n);
      C.b = L + ((C.b - L) * L) / (L - n);
    }

    if (x > 1) {
      C.r = L + ((C.r - L) * (1 - L)) / (x - L);
      C.g = L + ((C.g - L) * (1 - L)) / (x - L);
      C.b = L + ((C.b - L) * (1 - L)) / (x - L);
    }

    return C;
  }
}

// clamp a value between two numbers (inclusive)
function clamp(value, min, max) {
  return Math.min(Math.max(min, value), max);
}

// convert radians to degrees
function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

// convert turn to degrees
function turnToDeg(turn) {
  return turn * 360;
}

/**
 * Returns the non-alpha-blended background color of an element
 *
 * @method getOwnBackgroundColor
 * @memberof axe.commons.color
 *
 * @param {Object} elmStyle style of the element
 * @return {Color}
 */
function getOwnBackgroundColor(elmStyle) {
  const bgColor = new Color();
  bgColor.parseString(elmStyle.getPropertyValue('background-color'));

  if (bgColor.alpha !== 0) {
    const opacity = elmStyle.getPropertyValue('opacity');
    bgColor.alpha = bgColor.alpha * opacity;
  }

  return bgColor;
}

/**
 * Determines whether an element has a fully opaque background, whether solid color or an image
 * @param {Element} node
 * @return {Boolean} false if the background is transparent, true otherwise
 */
function isOpaque(node) {
  const style = window.getComputedStyle(node);
  return (
    chunk012.elementHasImage(node, style) || getOwnBackgroundColor(style).alpha === 1
  );
}

/**
 * Reduce an array of elements to only those that are below a 'floating' element.
 * @method reduceToElementsBelowFloating
 * @memberof axe.commons.dom
 * @instance
 * @param {Array} elements
 * @param {Element} targetNode
 * @returns {Array}
 */
function reduceToElementsBelowFloating(elements, targetNode) {
  const floatingPositions = ['fixed', 'sticky'];
  let finalElements = [];
  let targetFound = false;

  // Filter out elements that are temporarily floating above the target
  for (let index = 0; index < elements.length; ++index) {
    const currentNode = elements[index];
    if (currentNode === targetNode) {
      targetFound = true;
    }

    const style = window.getComputedStyle(currentNode);

    if (!targetFound && floatingPositions.indexOf(style.position) !== -1) {
      //Target was not found yet, so it must be under this floating thing (and will not always be under it)
      finalElements = [];
      continue;
    }

    finalElements.push(currentNode);
  }

  return finalElements;
}

/**
 * Parse resource object for a given node from a specified attribute
 * @method urlPropsFromAttribute
 * @param {HTMLElement} node given node
 * @param {String} attribute attribute of the node from which resource should be parsed
 * @returns {Object}
 */
function urlPropsFromAttribute(node, attribute) {
  if (!node.hasAttribute(attribute)) {
    return undefined;
  }

  const nodeName = node.nodeName.toUpperCase();
  let parser = node;

  /**
   * Note:
   * The need to create a parser, is to keep this function generic, to be able to parse resource from element(s) like `iframe` with `src` attribute,
   *
   * Also, when `a` or `area` is nested inside an svg document,
   * they do not have url properties as a HTML Node, hence the check for `ownerSVGElement`
   */
  if (!['A', 'AREA'].includes(nodeName) || node.ownerSVGElement) {
    parser = document.createElement('a');
    parser.href = node.getAttribute(attribute);
  }

  /**
   * Curate `https` and `ftps` to `http` and `ftp` as they will resolve to same resource
   */
  const protocol = [`https:`, `ftps:`].includes(parser.protocol)
    ? parser.protocol.replace(/s:$/, ':')
    : parser.protocol;

  /**
   * certain browser (in this case IE10 & 11)
   * does not resolve pathname with a beginning slash, thence prepending with a beginning slash
   */
  const parserPathname = /^\//.test(parser.pathname)
    ? parser.pathname
    : `/${parser.pathname}`;
  const { pathname, filename } = getPathnameOrFilename(parserPathname);

  return {
    protocol,
    hostname: parser.hostname,
    port: getPort(parser.port),
    pathname: /\/$/.test(pathname) ? pathname : `${pathname}/`,
    search: getSearchPairs(parser.search),
    hash: getHashRoute(parser.hash),
    filename
  };
}

/**
 * Resolve given port excluding default port(s)
 * @param {String} port port
 * @returns {String}
 */
function getPort(port) {
  const excludePorts = [
    `443`, // default `https` port
    `80`
  ];
  return !excludePorts.includes(port) ? port : ``;
}

/**
 * Resolve if a given pathname has filename & resolve the same as parts
 * @method getPathnameOrFilename
 * @param {String} pathname pathname part of a given uri
 * @returns {Array<Object>}
 */
function getPathnameOrFilename(pathname) {
  const filename = pathname.split('/').pop();
  if (!filename || filename.indexOf('.') === -1) {
    return {
      pathname,
      filename: ``
    };
  }

  return {
    // remove `filename` from `pathname`
    pathname: pathname.replace(filename, ''),

    // ignore filename when index.*
    filename: /index./.test(filename) ? `` : filename
  };
}

/**
 * Parse a given query string to key/value pairs sorted alphabetically
 * @param {String} searchStr search string
 * @returns {Object}
 */
function getSearchPairs(searchStr) {
  const query = {};

  if (!searchStr || !searchStr.length) {
    return query;
  }

  // `substring` to remove `?` at the beginning of search string
  const pairs = searchStr.substring(1).split(`&`);
  if (!pairs || !pairs.length) {
    return query;
  }

  for (let index = 0; index < pairs.length; index++) {
    const pair = pairs[index];
    const [key, value = ''] = pair.split(`=`);
    query[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return query;
}

/**
 * Interpret a given hash
 * if `hash`
 * -> is `hashbang` -or- `hash` is followed by `slash`
 * -> it resolves to a different resource
 * @method getHashRoute
 * @param {String} hash hash component of a parsed uri
 * @returns {String}
 */
function getHashRoute(hash) {
  if (!hash) {
    return ``;
  }

  /**
   * Check for any conventionally-formatted hashbang that may be present
   * eg: `#, #/, #!, #!/`
   */
  const hashRegex = /#!?\/?/g;
  const hasMatch = hash.match(hashRegex);
  if (!hasMatch) {
    return ``;
  }

  // do not resolve inline link as hash
  const [matchedStr] = hasMatch;
  if (matchedStr === '#') {
    return ``;
  }

  return hash;
}

/**
 * Checks whether a parent element visually overlaps a rectangle, either directly or via scrolling.
 * @method visuallyOverlaps
 * @memberof axe.commons.dom
 * @instance
 * @param {DOMRect} rect
 * @param {Element} parent
 * @return {boolean} True if rect is visually contained within parent
 */
function visuallyOverlaps(rect, parent) {
  const parentRect = parent.getBoundingClientRect();
  const parentTop = parentRect.top;
  const parentLeft = parentRect.left;
  const parentScrollArea = {
    top: parentTop - parent.scrollTop,
    bottom: parentTop - parent.scrollTop + parent.scrollHeight,
    left: parentLeft - parent.scrollLeft,
    right: parentLeft - parent.scrollLeft + parent.scrollWidth
  };

  //In theory, we should just be able to look at the scroll area as a superset of the parentRect,
  //but that's not true in Firefox
  if (
    (rect.left > parentScrollArea.right && rect.left > parentRect.right) ||
    (rect.top > parentScrollArea.bottom && rect.top > parentRect.bottom) ||
    (rect.right < parentScrollArea.left && rect.right < parentRect.left) ||
    (rect.bottom < parentScrollArea.top && rect.bottom < parentRect.top)
  ) {
    return false;
  }

  const style = window.getComputedStyle(parent);

  if (rect.left > parentRect.right || rect.top > parentRect.bottom) {
    return (
      style.overflow === 'scroll' ||
      style.overflow === 'auto' ||
      parent instanceof window.HTMLBodyElement ||
      parent instanceof window.HTMLHtmlElement
    );
  }

  return true;
}

/**
 * Converts space delimited token list to an Array
 * @method tokenList
 * @memberof axe.utils
 * @param  {String} str
 * @return {Array}
 */
function tokenList(str) {
  return (str || '')
    .trim()
    .replace(/\s{2,}/g, ' ')
    .split(' ');
}

// since attribute names can't contain whitespace, this will be
// a reserved list for ids so we can perform virtual id lookups
const idsKey = ' [idsMap]';

/**
 * Get nodes from the selector cache that match the selector.
 * @param {VirtualTree[]} domTree flattened tree collection to search
 * @param {Object} expressions
 * @param {Function} filter function (optional)
 * @return {Mixed} Array of nodes that match the selector or undefined if the selector map is not setup
 */
function getNodesMatchingExpression(domTree, expressions, filter) {
  // check to see if the domTree is the root and has the selector
  // map. if not we just return and let our QSA code do the finding
  const selectorMap = domTree[0]._selectorMap;
  if (!selectorMap) {
    return;
  }

  const shadowId = domTree[0].shadowId;

  // if the selector uses a global selector with a combinator
  // (e.g. A *, A > *) it's actually faster to use our QSA code than
  // getting all nodes and using matchesExpression
  for (let i = 0; i < expressions.length; i++) {
    if (
      expressions[i].length > 1 &&
      expressions[i].some(expression => isGlobalSelector(expression))
    ) {
      return;
    }
  }

  // it turned out to be more performant to use a Set to generate a
  // unique list of nodes rather than an array and array.includes
  // (~3 seconds total on a benchmark site)
  const nodeSet = new Set();

  expressions.forEach(expression => {
    const matchingNodes = findMatchingNodes(expression, selectorMap, shadowId);
    matchingNodes?.nodes?.forEach(node => {
      // for complex selectors we need to verify that the node
      // actually matches the entire selector since we only have
      // nodes that partially match the last part of the selector
      if (
        matchingNodes.isComplexSelector &&
        !chunk011.matchesExpression(node, expression)
      ) {
        return;
      }

      nodeSet.add(node);
    });
  });

  // Sets in ie11 do not work with Array.from without a polyfill
  //(missing `.entries`), but do have forEach
  let matchedNodes = [];
  nodeSet.forEach(node => matchedNodes.push(node));

  if (filter) {
    matchedNodes = matchedNodes.filter(filter);
  }

  return matchedNodes.sort((a, b) => a.nodeIndex - b.nodeIndex);
}

/**
 * Add nodes to the passed in Set that match just a part of the selector in order to speed up traversing the entire tree.
 * @param {Object} expression Selector Expression
 * @param {Object} selectorMap Selector map cache
 * @param {String} shadowId ShadowID of the root node
 */
function findMatchingNodes(expression, selectorMap, shadowId) {
  // use the last part of the expression to find nodes as it's more
  // specific. e.g. for `body h1` use `h1` and not `body`
  const exp = expression[expression.length - 1];
  let nodes = null;

  // a complex selector is one that will require using
  // matchesExpression to determine if it matches. these include
  // pseudo selectors (:not), combinators (A > B), and any
  // attribute value ([class=foo]).
  let isComplexSelector =
    expression.length > 1 || !!exp.pseudos || !!exp.classes;

  if (isGlobalSelector(exp)) {
    nodes = selectorMap['*'];
  } else {
    if (exp.id) {
      // a selector must match all parts, otherwise we can just exit early
      if (
        !selectorMap[idsKey] ||
        !Object.hasOwn(selectorMap[idsKey], exp.id) ||
        !selectorMap[idsKey][exp.id]?.length
      ) {
        return;
      }

      // when using id selector (#one) we only find nodes that
      // match the shadowId of the root
      nodes = selectorMap[idsKey][exp.id].filter(
        node => node.shadowId === shadowId
      );
    }

    if (exp.tag && exp.tag !== '*') {
      if (!selectorMap[exp.tag]?.length) {
        return;
      }

      const cachedNodes = selectorMap[exp.tag];
      nodes = nodes ? getSharedValues(cachedNodes, nodes) : cachedNodes;
    }

    if (exp.classes) {
      if (!selectorMap['[class]']?.length) {
        return;
      }

      const cachedNodes = selectorMap['[class]'];
      nodes = nodes ? getSharedValues(cachedNodes, nodes) : cachedNodes;
    }

    if (exp.attributes) {
      for (let i = 0; i < exp.attributes.length; i++) {
        const attr = exp.attributes[i];

        // an attribute selector that looks for a specific value is
        // a complex selector
        if (attr.type === 'attrValue') {
          isComplexSelector = true;
        }

        if (!selectorMap[`[${attr.key}]`]?.length) {
          return;
        }

        const cachedNodes = selectorMap[`[${attr.key}]`];
        nodes = nodes ? getSharedValues(cachedNodes, nodes) : cachedNodes;
      }
    }
  }

  return { nodes, isComplexSelector };
}

/**
 * Non-tag selectors use `*` for the tag name so a global selector won't have any other properties of the expression. Pseudo selectors that use `*` (e.g. `*:not([class])`) will still be considered a global selector since we don't cache anything for pseudo selectors and will rely on filtering with matchesExpression.
 * @param {Object} expression Selector Expression
 * @returns {Boolean}
 */
function isGlobalSelector(expression) {
  return (
    expression.tag === '*' &&
    !expression.attributes &&
    !expression.id &&
    !expression.classes
  );
}

/**
 * Find all nodes in A that are also in B.
 * @param {Mixed[]} a
 * @param {Mixed[]} b
 * @returns {Mixed[]}
 */
function getSharedValues(a, b) {
  return a.filter(node => b.includes(node));
}

/**
 * Save a selector and vNode to the selectorMap.
 * @param {String} key
 * @param {VirtualNode} vNode
 * @param {Object} map
 */
function cacheSelector(key, vNode, map) {
  if (!Object.hasOwn(map, key)) {
    map[key] = [];
  }
  map[key].push(vNode);
}

/**
 * Cache selector information about a VirtalNode.
 * @param {VirtualNode} vNode
 */
function cacheNodeSelectors(vNode, selectorMap) {
  if (vNode.props.nodeType !== 1) {
    return;
  }

  cacheSelector(vNode.props.nodeName, vNode, selectorMap);
  cacheSelector('*', vNode, selectorMap);

  vNode.attrNames.forEach(attrName => {
    // element ids are the only values we'll match
    if (attrName === 'id') {
      selectorMap[idsKey] = selectorMap[idsKey] || {};
      tokenList(vNode.attr(attrName)).forEach(value => {
        cacheSelector(value, vNode, selectorMap[idsKey]);
      });
    }

    cacheSelector(`[${attrName}]`, vNode, selectorMap);
  });
}

/**
 * Get an axe rule by id.
 * @param {String} ruelId the rule id
 * @return {Rule}
 */
function getRule(ruleId) {
  // TODO: es-modules_audit
  const rule = chunk007.axe._audit.rules.find(({ id }) => id === ruleId);

  if (!rule) {
    throw new Error(`Cannot find rule by id: ${ruleId}`);
  }

  return rule;
}

/**
 * Get the scroll position of given element
 * @method getScroll
 * @memberof axe.utils
 * @param {Element} elm
 * @param {buffer} (Optional) allowed negligence in overflow
 * @returns {Object | undefined}
 */
function getScroll(elm, buffer = 0) {
  const overflowX = elm.scrollWidth > elm.clientWidth + buffer;
  const overflowY = elm.scrollHeight > elm.clientHeight + buffer;

  /**
   * if there is neither `overflow-x` or `overflow-y`
   * -> return
   */
  if (!(overflowX || overflowY)) {
    return;
  }

  const style = window.getComputedStyle(elm);
  const scrollableX = isScrollable(style, 'overflow-x');
  const scrollableY = isScrollable(style, 'overflow-y');

  /**
   * check direction of `overflow` and `scrollable`
   */
  if ((overflowX && scrollableX) || (overflowY && scrollableY)) {
    return {
      elm,
      top: elm.scrollTop,
      left: elm.scrollLeft
    };
  }
}

function isScrollable(style, prop) {
  const overflowProp = style.getPropertyValue(prop);
  return ['scroll', 'auto'].includes(overflowProp);
}

const getScroll$1 = chunk010.memoizeImplementation(getScroll);

/**
 * Create an array scroll positions from descending elements
 */
function getElmScrollRecursive(root) {
  // Need to also get .childNodes since SVGs in IE don't have .children.
  return Array.from(root.children || root.childNodes || []).reduce(
    (scrolls, elm) => {
      const scroll = getScroll$1(elm);
      if (scroll) {
        scrolls.push(scroll);
      }
      return scrolls.concat(getElmScrollRecursive(elm));
    },
    []
  );
}

/**
 * Get the scroll position of all scrollable elements in a page
 * @deprecated
 */
function getScrollState(win = window) {
  const root = win.document.documentElement;
  const windowScroll = [
    win.pageXOffset !== undefined
      ? {
          elm: win,
          top: win.pageYOffset,
          left: win.pageXOffset
        }
      : {
          elm: root,
          top: root.scrollTop,
          left: root.scrollLeft
        }
  ];

  return windowScroll.concat(getElmScrollRecursive(document.body));
}

/**
 * Function which converts given text to `CSSStyleSheet`
 * - used in `CSSOM` computation.
 * - factory (closure) function, initialized with `document.implementation.createHTMLDocument()`, which uses DOM API for creating `style` elements.
 *
 * @method axe.utils.getStyleSheetFactory
 * @memberof axe.utils
 * @param {Object} dynamicDoc `document.implementation.createHTMLDocument()
 * @param {Object} options an object with properties to construct stylesheet
 * @property {String} options.data text content of the stylesheet
 * @property {Boolean} options.isCrossOrigin flag to notify if the resource was fetched from the network
 * @property {String} options.shadowId (Optional) shadowId if shadowDOM
 * @property {Object} options.root implementation document to create style elements
 * @property {String} options.priority a number indicating the loaded priority of CSS, to denote specificity of styles contained in the sheet.
 * @returns {Function}
 */
function getStyleSheetFactory(dynamicDoc) {
  if (!dynamicDoc) {
    throw new Error(
      'axe.utils.getStyleSheetFactory should be invoked with an argument'
    );
  }

  return options => {
    const {
      data,
      isCrossOrigin = false,
      shadowId,
      root,
      priority,
      isLink = false
    } = options;
    const style = dynamicDoc.createElement('style');
    if (isLink) {
      // as creating a stylesheet as link will need to be awaited
      // till `onload`, it is wise to convert link href to @import statement
      const text = dynamicDoc.createTextNode(`@import "${data.href}"`);
      style.appendChild(text);
    } else {
      style.appendChild(dynamicDoc.createTextNode(data));
    }
    dynamicDoc.head.appendChild(style);
    return {
      sheet: style.sheet,
      isCrossOrigin,
      shadowId,
      root,
      priority
    };
  };
}

let styleSheet;
function injectStyle(style) {
  if (styleSheet && styleSheet.parentNode) {
    // append the style to the existing sheet
    if (styleSheet.styleSheet === undefined) {
      // Not old IE
      styleSheet.appendChild(document.createTextNode(style));
    } else {
      styleSheet.styleSheet.cssText += style;
    }
    return styleSheet;
  }
  if (!style) {
    return;
  }

  const head = document.head || document.getElementsByTagName('head')[0];
  styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';

  if (styleSheet.styleSheet === undefined) {
    // Not old IE
    styleSheet.appendChild(document.createTextNode(style));
  } else {
    styleSheet.styleSheet.cssText = style;
  }

  head.appendChild(styleSheet);

  return styleSheet;
}

/**
 * Checks if a value is array-like.
 *
 * @param {any} arr - The value to check.
 * @returns {boolean} - Returns true if the value is array-like, false otherwise.
 */
function isArrayLike(arr) {
  return (
    !!arr &&
    typeof arr === 'object' &&
    typeof arr.length === 'number' &&
    // Avoid DOM weirdness
    arr instanceof window.Node === false
  );
}

// Wrapper to prevent throwing for non-objects & null
function objectHasOwn(obj, prop) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Determine if some value can be parsed as a context
 * @private
 * @param  {Mixed} contextSpec The configuration object passed to `Context`
 * @return {boolea}
 */
function isContextSpec(contextSpec) {
  return isContextObject(contextSpec) || isContextProp(contextSpec);
}

/**
 * Checks if the given context specification is a valid context object.
 *
 * @param {Object} contextSpec - The context specification object to check.
 * @returns {boolean} - Returns true if the context specification is a valid context object, otherwise returns false.
 */
function isContextObject(contextSpec) {
  return ['include', 'exclude'].some(
    prop => objectHasOwn(contextSpec, prop) && isContextProp(contextSpec[prop])
  );
}

/**
 * Checks if the given contextList is a valid context property.
 * @param {string|Node|Array} contextList - The contextList to check.
 * @returns {boolean} - Returns true if the contextList is a valid context property, otherwise false.
 */
function isContextProp(contextList) {
  return (
    typeof contextList === 'string' ||
    contextList instanceof window.Node ||
    isLabelledFramesSelector(contextList) ||
    isLabelledShadowDomSelector(contextList) ||
    isArrayLike(contextList)
  );
}

function isLabelledFramesSelector(selector) {
  // This doesn't guarantee the selector is valid.
  // Just that this isn't a runOptions object
  // Normalization will ignore invalid selectors
  return objectHasOwn(selector, 'fromFrames');
}

function isLabelledShadowDomSelector(selector) {
  // This doesn't guarantee the selector is valid.
  // Just that this isn't a runOptions object
  // Normalization will ignore invalid selectors
  return objectHasOwn(selector, 'fromShadowDom');
}

/**
 * Determine whether an element is visible
 * @method isHidden
 * @memberof axe.utils
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibilty status
 * @deprecated use isVisibleToScreenreader
 */
function isHidden(el, recursed) {
  const node = chunk010.getNodeFromTree(el);

  // 9 === Node.DOCUMENT
  if (el.nodeType === 9) {
    return false;
  }

  // 11 === Node.DOCUMENT_FRAGMENT_NODE
  if (el.nodeType === 11) {
    el = el.host; // grab the host Node
  }

  if (node && node._isHidden !== null) {
    return node._isHidden;
  }

  const style = window.getComputedStyle(el, null);

  if (
    !style ||
    !el.parentNode ||
    style.getPropertyValue('display') === 'none' ||
    (!recursed &&
      // visibility is only accurate on the first element
      style.getPropertyValue('visibility') === 'hidden') ||
    el.getAttribute('aria-hidden') === 'true'
  ) {
    return true;
  }

  const parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
  const hidden = isHidden(parent, true);

  // cache the results of the isHidden check on the parent tree
  // so we don't have to look at the parent tree again for all its
  // descendants
  if (node) {
    node._isHidden = hidden;
  }

  return hidden;
}

/**
 * Determines if a node is included or excluded in a given context
 * @private
 * @param  {Node}  node     The node to test
 * @param  {Object}  context "Resolved" context object, @see resolveContext
 * @return {Boolean}         [description]
 */
function isNodeInContext(node, { include = [], exclude = [] }) {
  const filterInclude = include.filter(candidate => chunk011.contains(candidate, node));
  if (filterInclude.length === 0) {
    return false;
  }
  const filterExcluded = exclude.filter(candidate => chunk011.contains(candidate, node));
  if (filterExcluded.length === 0) {
    return true;
  }
  const deepestInclude = getDeepest(filterInclude);
  const deepestExclude = getDeepest(filterExcluded);
  return chunk011.contains(deepestExclude, deepestInclude);
}

/**
 * Get the deepest node in a given collection
 * @private
 * @param  {Array} collection Array of nodes to test
 * @return {Node}             The deepest node
 */
function getDeepest(collection) {
  let deepest;
  for (const node of collection) {
    if (!deepest || !chunk011.contains(node, deepest)) {
      deepest = node;
    }
  }
  return deepest;
}

/**
 * Check if two ancestries are identical
 */
function matchAncestry(ancestryA, ancestryB) {
  if (ancestryA.length !== ancestryB.length) {
    return false;
  }
  return ancestryA.every((selectorA, ancestorIndex) => {
    const selectorB = ancestryB[ancestorIndex];
    if (!Array.isArray(selectorA)) {
      return selectorA === selectorB;
    }
    if (selectorA.length !== selectorB.length) {
      return false;
    }
    return selectorA.every(
      (str, selectorIndex) => selectorB[selectorIndex] === str
    );
  });
}

/**
 * Array#sort callback to sort nodes by DOM order
 * @private
 * @param  {Node} nodeA
 * @param  {Node} nodeB
 * @return {Integer}   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort
 */
function nodeSorter(nodeA, nodeB) {
  /*eslint no-bitwise: 0 */
  nodeA = nodeA.actualNode || nodeA;
  nodeB = nodeB.actualNode || nodeB;
  if (nodeA === nodeB) {
    return 0;
  }

  if (nodeA.compareDocumentPosition(nodeB) & 4) {
    return -1; // a before b
  } else {
    return 1; // b before a
  }
}

/**
 * Get the virtual node and actual node from a parameter that could be either.
 *
 * @param {VirtualNode|Element} node
 * @return {Object} The Virtual Node and actual node
 */
function nodeLookup(node) {
  if (node instanceof chunk007.AbstractVirtualNode) {
    return {
      vNode: node,
      domNode: node.actualNode
    };
  }

  return {
    vNode: chunk010.getNodeFromTree(node),
    domNode: node
  };
}

/**
 * Parse non cross-origin stylesheets
 *
 * @method parseSameOriginStylesheet
 * @memberof axe.utils
 * @param {Object} sheet CSSStylesheet object
 * @param {Object} options options object from `axe.utils.parseStylesheet`
 * @param {Array<Number>} priority sheet priority
 * @param {Array<String>} importedUrls urls of already imported stylesheets
 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`
 * @returns {Promise}
 */
function parseSameOriginStylesheet(
  sheet,
  options,
  priority,
  importedUrls,
  isCrossOrigin = false
) {
  const rules = Array.from(sheet.cssRules);

  if (!rules) {
    return Promise.resolve();
  }

  /**
   * reference -> https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
   */
  const cssImportRules = rules.filter(r => r.type === 3); // type === 3 -> CSSRule.IMPORT_RULE

  /**
   * when no `@import` rules in given sheet -> resolve the current `sheet` & exit
   */
  if (!cssImportRules.length) {
    // exit
    return Promise.resolve({
      isCrossOrigin,
      priority,
      root: options.rootNode,
      shadowId: options.shadowId,
      sheet
    });
  }

  /**
   * filter rules that are not already fetched
   */
  const cssImportUrlsNotAlreadyImported = cssImportRules
    // ensure rule has a href
    .filter(rule => rule.href)
    // extract href from object
    .map(rule => rule.href)
    // only href that are not already imported
    .filter(url => !importedUrls.includes(url));

  /**
   * iterate `@import` rules and fetch styles
   */
  const promises = cssImportUrlsNotAlreadyImported.map(
    (importUrl, cssRuleIndex) => {
      const newPriority = [...priority, cssRuleIndex];
      const isCrossOriginRequest = /^https?:\/\/|^\/\//i.test(importUrl);

      return parseCrossOriginStylesheet(
        importUrl,
        options,
        newPriority,
        importedUrls,
        isCrossOriginRequest
      );
    }
  );

  const nonImportCSSRules = rules.filter(r => r.type !== 3);

  // no further rules to process in this sheet
  if (!nonImportCSSRules.length) {
    return Promise.all(promises);
  }

  // convert all `nonImportCSSRules` style rules into `text` and chain

  promises.push(
    Promise.resolve(
      options.convertDataToStylesheet({
        data: nonImportCSSRules.map(rule => rule.cssText).join(),
        isCrossOrigin,
        priority,
        root: options.rootNode,
        shadowId: options.shadowId
      })
    )
  );

  return Promise.all(promises);
}

/**
 * Parse a given stylesheet
 *
 * @method parseStylesheet
 * @memberof axe.utils
 * @param {Object} sheet stylesheet to parse
 * @param {Object} options configuration options object from `parseStylesheets`
 * @param {Array<Number>} priority priority of stylesheet
 * @param {Array<String>} importedUrls list of resolved `@import` urls
 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`, passed for re-parsing `cross-origin` sheets
 * @returns {Promise}
 */
function parseStylesheet(
  sheet,
  options,
  priority,
  importedUrls,
  isCrossOrigin = false
) {
  const isSameOrigin = isSameOriginStylesheet(sheet);
  if (isSameOrigin) {
    /**
     * resolve `same-origin` stylesheet
     */
    return parseSameOriginStylesheet(
      sheet,
      options,
      priority,
      importedUrls,
      isCrossOrigin
    );
  }

  /**
   * resolve `cross-origin` stylesheet
   */
  return parseCrossOriginStylesheet(
    sheet.href,
    options,
    priority,
    importedUrls,
    true // -> isCrossOrigin
  );
}

/**
 * Check if a given stylesheet is from the `same-origin`
 * Note:
 * `sheet.cssRules` throws an error on `cross-origin` stylesheets
 *
 * @param {Object} sheet CSS stylesheet
 * @returns {Boolean}
 */
function isSameOriginStylesheet(sheet) {
  try {
    /*eslint no-unused-vars: 0*/
    const rules = sheet.cssRules;

    /**
     * Safari, does not throw an error when accessing cssRules property,
     */
    if (!rules && sheet.href) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Parse cross-origin stylesheets
 *
 * @method parseCrossOriginStylesheet
 * @memberof axe.utils
 * @param {String} url url from which to fetch stylesheet
 * @param {Object} options options object from `axe.utils.parseStylesheet`
 * @param {Array<Number>} priority sheet priority
 * @param {Array<String>} importedUrls urls of already imported stylesheets
 * @param {Boolean} isCrossOrigin boolean denoting if a stylesheet is `cross-origin`
 * @returns {Promise}
 */
function parseCrossOriginStylesheet(
  url,
  options,
  priority,
  importedUrls,
  isCrossOrigin
) {
  /**
   * Add `url` to `importedUrls`
   */
  importedUrls.push(url);

  return new Promise((resolve, reject) => {
    const request = new window.XMLHttpRequest();
    request.open('GET', url);

    request.timeout = chunk007.constants.preload.timeout;
    request.addEventListener('error', reject);
    request.addEventListener('timeout', reject);
    request.addEventListener('loadend', event => {
      if (event.loaded && request.responseText) {
        return resolve(request.responseText);
      }

      reject(request.responseText);
    });

    request.send();
  }).then(data => {
    const result = options.convertDataToStylesheet({
      data,
      isCrossOrigin,
      priority,
      root: options.rootNode,
      shadowId: options.shadowId
    });

    /**
     * Parse resolved stylesheet further for any `@import` styles
     */
    return parseStylesheet(
      result.sheet,
      options,
      priority,
      importedUrls,
      result.isCrossOrigin
    );
  });
}

/**
 * Parses a tabindex value to return an integer if valid, or null if invalid.
 * @method parseTabindex
 * @memberof axe.utils
 * @param  {string|null} str
 * @return {number|null}
 */
function parseTabindex(value) {
  if (typeof value !== 'string') {
    return null;
  }

  // spec: https://html.spec.whatwg.org/#rules-for-parsing-integers
  const match = value.trim().match(/^([-+]?\d+)/);
  if (match) {
    return Number(match[1]);
  }

  return null;
}

/**
 * Performance measuring utility shimming the User Timing API
 *
 * https://www.html5rocks.com/en/tutorials/webperformance/usertiming/
 * http://caniuse.com/#search=User%20Timing
 *
 */
const performanceTimer = (() => {
  /**
   * Get a time/date object using performance.now() if supported
   * @return {DOMTimeStamp}
   */
  function now() {
    if (window.performance && window.performance) {
      return window.performance.now();
    }
  }
  let axeStartTime = now();
  let axeStarted = false;

  /**
   * @typedef {utils.performanceTimer} Public API Methods
   */
  return {
    /**
     * @member {Function} start Kicks off performance timing for overall axe audit
     */
    start() {
      this.reset();
      axeStarted = true;
      this.mark('mark_axe_start');
    },

    /**
     * @member {Function} end Concludes performance timing, compares start/end marks
     */
    end() {
      this.mark('mark_axe_end');
      this.measure('axe', 'mark_axe_start', 'mark_axe_end', true);
      this.logMeasures('axe');
      this.clearMark('mark_axe_start', 'mark_axe_end');
      axeStarted = false;
    },

    /**
     * @member {Function} auditStart Starts an audit for a page or frame
     */
    auditStart() {
      if (!axeStarted) {
        this.reset(); // We're in a frame
      }
      this.mark('mark_audit_start');
    },

    /**
     * @member {Function} auditEnd Ends an audit for a page or frame, logs measurement of start/end marks
     */
    auditEnd() {
      this.mark('mark_audit_end');
      this.measure(
        'audit_start_to_end',
        'mark_audit_start',
        'mark_audit_end',
        true
      );
      // log audit/rule measures
      this.logMeasures();
      this.clearMark('mark_audit_start', 'mark_audit_end');
    },

    /**
     * @member {Function} mark Shims creating a new named time stamp, called a mark
     * @param {String} markName String name to record how long it took to get there.
     * A mark that already exists will be overwritten.
     *
     */
    mark(markName) {
      if (window.performance?.mark) {
        window.performance.mark(markName);
      }
    },

    /**
     * @member {Function} measure Shims creating a measure to compare two marks, which can be logged
     * @param {String} measureName String name to log what is being compared.
     * Measures that already exist will be overwritten with a new time stamp.
     * @param {String} startMark String name of mark to start measuring
     * @param {String} endMark String name of mark to end measuring
     */
    measure(measureName, startMark, endMark, keepMarks = false) {
      if (!window.performance?.measure) {
        return;
      }
      try {
        window.performance.measure(measureName, startMark, endMark);
      } catch (e) {
        this._log(e);
      }
      if (!keepMarks) {
        this.clearMark(startMark, endMark);
      }
    },

    /**
     * @member {Function} logMeasures Logs previously captured measures in chronological order.
     * Starts from the most recent start()/auditStart() call.
     * @param {String|undefined} measureName If provided, will only log up to the first matching measure.
     */
    logMeasures(measureName) {
      const last = arr => (Array.isArray(arr) ? arr[arr.length - 1] : arr);
      const logMeasure = req => {
        this._log('Measure ' + req.name + ' took ' + req.duration + 'ms');
      };
      if (
        !window.performance?.getEntriesByType ||
        !window.performance?.getEntriesByName
      ) {
        return;
      }
      // only output measures that were started after axe started, otherwise
      // we get measures made by the page before axe ran (which is confusing)
      const axeStart =
        last(window.performance.getEntriesByName('mark_axe_start')) ||
        last(window.performance.getEntriesByName('mark_audit_start'));
      if (!axeStart) {
        this._log('Axe must be started before using performanceTimer');
        return;
      }

      const measures = window.performance
        .getEntriesByType('measure')
        .filter(measure => measure.startTime >= axeStart.startTime);
      for (let i = 0; i < measures.length; ++i) {
        const req = measures[i];
        if (req.name === measureName) {
          logMeasure(req);
          return;
        } else if (!measureName) {
          logMeasure(req);
        }
      }
    },

    /**
     * @member {Function} timeElapsed Records time since last audit
     * @return {DOMTimeStamp}
     */
    timeElapsed() {
      const currentTime = now();
      return currentTime - axeStartTime;
    },

    /**
     * @member {Function} clearMark Clears a mark
     * @param {String} markName String name of mark to clear
     */
    clearMark(...markNames) {
      if (!window.performance?.clearMarks) {
        return;
      }

      for (const markName of markNames) {
        window.performance.clearMarks(markName);
      }
    },

    /**
     * @member {Function} reset Resets the time for a new audit
     */
    reset() {
      axeStartTime = now();
    },

    /**
     * Logs the message, available to override in testing
     * @private
     * @param {String} message
     */
    _log(message) {
      chunk011.log(message);
    }
  };
})();

exports.Color = Color;
exports.cacheNodeSelectors = cacheNodeSelectors;
exports.getNodesMatchingExpression = getNodesMatchingExpression;
exports.getOwnBackgroundColor = getOwnBackgroundColor;
exports.getRule = getRule;
exports.getScroll = getScroll$1;
exports.getScrollState = getScrollState;
exports.getStyleSheetFactory = getStyleSheetFactory;
exports.injectStyle = injectStyle;
exports.isArrayLike = isArrayLike;
exports.isContextObject = isContextObject;
exports.isContextProp = isContextProp;
exports.isContextSpec = isContextSpec;
exports.isHidden = isHidden;
exports.isLabelledFramesSelector = isLabelledFramesSelector;
exports.isLabelledShadowDomSelector = isLabelledShadowDomSelector;
exports.isNodeInContext = isNodeInContext;
exports.isOpaque = isOpaque;
exports.isShadowRoot = isShadowRoot;
exports.matchAncestry = matchAncestry;
exports.nodeLookup = nodeLookup;
exports.nodeSorter = nodeSorter;
exports.objectHasOwn = objectHasOwn;
exports.parseCrossOriginStylesheet = parseCrossOriginStylesheet;
exports.parseSameOriginStylesheet = parseSameOriginStylesheet;
exports.parseStylesheet = parseStylesheet;
exports.parseTabindex = parseTabindex;
exports.performanceTimer = performanceTimer;
exports.reduceToElementsBelowFloating = reduceToElementsBelowFloating;
exports.tokenList = tokenList;
exports.urlPropsFromAttribute = urlPropsFromAttribute;
exports.visuallyOverlaps = visuallyOverlaps;
