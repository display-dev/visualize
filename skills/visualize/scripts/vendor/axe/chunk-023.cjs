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
const chunk011 = require('./chunk-011.cjs');
const chunk018 = require('./chunk-018.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk022 = require('./chunk-022.cjs');
require('./chunk-020.cjs');
const chunk019 = require('./chunk-019.cjs');
const chunk015 = require('./chunk-015.cjs');

function colorContrastEvaluate(node, options, virtualNode) {
  const {
    ignoreUnicode,
    ignoreLength,
    ignorePseudo,
    boldValue,
    boldTextPt,
    largeTextPt,
    contrastRatio,
    shadowOutlineEmMax,
    pseudoSizeThreshold
  } = options;

  if (!chunk018.isVisibleOnScreen(node)) {
    this.data({ messageKey: 'hidden' });
    return true;
  }

  const visibleText = chunk018.visibleVirtual(virtualNode, false, true);
  if (ignoreUnicode && textIsEmojis(visibleText)) {
    this.data({ messageKey: 'nonBmp' });
    return undefined;
  }

  const nodeStyle = window.getComputedStyle(node);
  const fontSize = parseFloat(nodeStyle.getPropertyValue('font-size'));
  const fontWeight = nodeStyle.getPropertyValue('font-weight');
  const bold = parseFloat(fontWeight) >= boldValue || fontWeight === 'bold';

  const ptSize = Math.ceil(fontSize * 72) / 96;
  const isSmallFont =
    (bold && ptSize < boldTextPt) || (!bold && ptSize < largeTextPt);

  const { expected, minThreshold, maxThreshold } = isSmallFont
    ? contrastRatio.normal
    : contrastRatio.large;

  // if element or a parent has pseudo content then we need to mark
  // as needs review
  const pseudoElm = findPseudoElement(virtualNode, {
    ignorePseudo,
    pseudoSizeThreshold
  });
  if (pseudoElm) {
    this.data({
      fontSize: `${((fontSize * 72) / 96).toFixed(1)}pt (${fontSize}px)`,
      fontWeight: bold ? 'bold' : 'normal',
      messageKey: 'pseudoContent',
      expectedContrastRatio: expected + ':1'
    });

    this.relatedNodes(pseudoElm.actualNode);
    return undefined;
  }

  // Thin shadows only. Thicker shadows are included in the background instead
  const shadowColors = chunk022.getTextShadowColors(node, {
    minRatio: 0.001,
    maxRatio: shadowOutlineEmMax
  });
  if (shadowColors === null) {
    this.data({ messageKey: 'complexTextShadows' });
    return undefined;
  }

  const bgNodes = [];
  const bgColor = chunk022.getBackgroundColor(node, bgNodes, shadowOutlineEmMax);
  const fgColor = chunk022.getForegroundColor(node, false, bgColor, options);

  let contrast = null;
  let contrastContributor = null;
  let shadowColor = null;
  if (shadowColors.length === 0) {
    contrast = chunk022.getContrast(bgColor, fgColor);
  } else if (fgColor && bgColor) {
    shadowColor = [...shadowColors, bgColor].reduce(chunk022.flattenShadowColors);
    // Compare shadow, bgColor, textColor. Check passes if any is sufficient
    const fgBgContrast = chunk022.getContrast(bgColor, fgColor);
    const bgShContrast = chunk022.getContrast(bgColor, shadowColor);
    const fgShContrast = chunk022.getContrast(shadowColor, fgColor);
    contrast = Math.max(fgBgContrast, bgShContrast, fgShContrast);
    if (contrast !== fgBgContrast) {
      contrastContributor =
        bgShContrast > fgShContrast ? 'shadowOnBgColor' : 'fgOnShadowColor';
    }
  }

  const isValid = contrast > expected;

  // ratio is outside range
  if (
    (typeof minThreshold === 'number' &&
      (typeof contrast !== 'number' || contrast < minThreshold)) ||
    (typeof maxThreshold === 'number' &&
      (typeof contrast !== 'number' || contrast > maxThreshold))
  ) {
    this.data({ contrastRatio: contrast });
    return true;
  }

  // truncate ratio to three digits while rounding down
  // 4.499 = 4.49, 4.019 = 4.01
  const truncatedResult = Math.floor(contrast * 100) / 100;

  // if fgColor or bgColor are missing, get more information.
  let missing;
  let colorParse;

  if (bgColor === null) {
    if (chunk012.incompleteData.get('colorParse')) {
      missing = 'colorParse';
      colorParse = chunk012.incompleteData.get('colorParse');
    } else {
      missing = chunk012.incompleteData.get('bgColor');
    }
  } else if (!isValid) {
    missing = contrastContributor;
  }

  if (fgColor === null && chunk012.incompleteData.get('colorParse')) {
    missing = 'colorParse';
    colorParse = chunk012.incompleteData.get('colorParse');
  }

  const equalRatio = truncatedResult === 1;
  const shortTextContent = visibleText.length === 1;
  if (equalRatio) {
    missing = chunk012.incompleteData.set('bgColor', 'equalRatio');
  } else if (!isValid && shortTextContent && !ignoreLength) {
    // Check that the text content is a single character long
    missing = 'shortTextContent';
  }

  // need both independently in case both are missing
  this.data({
    fgColor: fgColor ? fgColor.toHexString() : undefined,
    bgColor: bgColor ? bgColor.toHexString() : undefined,
    contrastRatio: truncatedResult,
    fontSize: `${((fontSize * 72) / 96).toFixed(1)}pt (${fontSize}px)`,
    fontWeight: bold ? 'bold' : 'normal',
    messageKey: missing,
    expectedContrastRatio: expected + ':1',
    shadowColor: shadowColor ? shadowColor.toHexString() : undefined,
    colorParse: colorParse
  });

  // We don't know, so we'll put it into Can't Tell
  if (
    fgColor === null ||
    bgColor === null ||
    equalRatio ||
    (shortTextContent && !ignoreLength && !isValid)
  ) {
    missing = null;
    chunk012.incompleteData.clear();
    this.relatedNodes(bgNodes);
    return undefined;
  }

  if (!isValid) {
    this.relatedNodes(bgNodes);
  }

  return isValid;
}

function findPseudoElement(
  vNode,
  { pseudoSizeThreshold = 0.25, ignorePseudo = false }
) {
  if (ignorePseudo) {
    return;
  }
  const rect = vNode.boundingClientRect;
  const minimumSize = rect.width * rect.height * pseudoSizeThreshold;
  do {
    const beforeSize = getPseudoElementArea(vNode.actualNode, ':before');
    const afterSize = getPseudoElementArea(vNode.actualNode, ':after');
    if (beforeSize + afterSize > minimumSize) {
      return vNode; // Combined area of before and after exceeds the minimum size
    }
  } while ((vNode = vNode.parent));
}

const getPseudoElementArea = chunk010.memoizeImplementation(
  function getPseudoElementArea(node, pseudo) {
    const style = window.getComputedStyle(node, pseudo);
    const matchPseudoStyle = (prop, value) =>
      style.getPropertyValue(prop) === value;
    if (
      matchPseudoStyle('content', 'none') ||
      matchPseudoStyle('display', 'none') ||
      matchPseudoStyle('visibility', 'hidden') ||
      matchPseudoStyle('position', 'absolute') === false
    ) {
      return 0; // The pseudo element isn't visible
    }

    if (
      chunk013.getOwnBackgroundColor(style).alpha === 0 &&
      matchPseudoStyle('background-image', 'none')
    ) {
      return 0; // There is no background
    }

    // Find the size of the pseudo element;
    const pseudoWidth = parseUnit(style.getPropertyValue('width'));
    const pseudoHeight = parseUnit(style.getPropertyValue('height'));
    if (pseudoWidth.unit !== 'px' || pseudoHeight.unit !== 'px') {
      // IE doesn't normalize to px. Infinity gets everything to undefined
      return pseudoWidth.value === 0 || pseudoHeight.value === 0 ? 0 : Infinity;
    }
    return pseudoWidth.value * pseudoHeight.value;
  }
);

function textIsEmojis(visibleText) {
  const options = { nonBmp: true };
  const hasUnicodeChars = chunk012.hasUnicode(visibleText, options);
  const hasNonUnicodeChars =
    chunk012.sanitize(chunk012.removeUnicode(visibleText, options)) === '';
  return hasUnicodeChars && hasNonUnicodeChars;
}

function parseUnit(str) {
  const unitRegex = /^([0-9.]+)([a-z]+)$/i;
  const [, value = '', unit = ''] = str.match(unitRegex) || [];
  return {
    value: parseFloat(value),
    unit: unit.toLowerCase()
  };
}

function getContrast(color1, color2) {
  const c1lum = color1.getRelativeLuminance();
  const c2lum = color2.getRelativeLuminance();
  return (Math.max(c1lum, c2lum) + 0.05) / (Math.min(c1lum, c2lum) + 0.05);
}

const blockLike$1 = [
  'block',
  'list-item',
  'table',
  'flex',
  'grid',
  'inline-block'
];
function isBlock$1(elm) {
  const display = window.getComputedStyle(elm).getPropertyValue('display');
  return blockLike$1.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
}

function linkInTextBlockEvaluate(node, options) {
  const { requiredContrastRatio, allowSameColor } = options;

  if (isBlock$1(node)) {
    return false;
  }

  let parentBlock = chunk012.getComposedParent(node);
  while (parentBlock && parentBlock.nodeType === 1 && !isBlock$1(parentBlock)) {
    parentBlock = chunk012.getComposedParent(parentBlock);
  }

  if (!parentBlock) {
    return undefined;
  }

  this.relatedNodes([parentBlock]);

  // Capture colors
  const nodeColor = chunk022.getForegroundColor(node);
  const parentColor = chunk022.getForegroundColor(parentBlock);
  const nodeBackgroundColor = chunk022.getBackgroundColor(node);
  const parentBackgroundColor = chunk022.getBackgroundColor(parentBlock);

  // Compute contrasts, giving preference to foreground color and doing as little work as possible
  let textContrast =
    nodeColor && parentColor ? getContrast(nodeColor, parentColor) : undefined;
  if (textContrast) {
    textContrast = Math.floor(textContrast * 100) / 100;
  }

  if (textContrast && textContrast >= requiredContrastRatio) {
    return true;
  }

  let backgroundContrast =
    nodeBackgroundColor && parentBackgroundColor
      ? getContrast(nodeBackgroundColor, parentBackgroundColor)
      : undefined;

  if (backgroundContrast) {
    backgroundContrast = Math.floor(backgroundContrast * 100) / 100;
  }

  if (backgroundContrast && backgroundContrast >= requiredContrastRatio) {
    return true;
  }

  // Report incomplete instead of failure if we're not sure
  if (!backgroundContrast) {
    const reason = chunk012.incompleteData.get('bgColor') ?? 'bgContrast';
    this.data({
      messageKey: reason
    });
    chunk012.incompleteData.clear();
    return undefined;
  }

  if (!textContrast) {
    return undefined;
  }

  if (allowSameColor && textContrast === 1 && backgroundContrast === 1) {
    return true;
  }

  // Report bgContrast only if the background changes but text color stays the same
  if (textContrast === 1 && backgroundContrast > 1) {
    this.data({
      messageKey: 'bgContrast',
      contrastRatio: backgroundContrast,
      requiredContrastRatio,
      nodeBackgroundColor: nodeBackgroundColor
        ? nodeBackgroundColor.toHexString()
        : undefined,
      parentBackgroundColor: parentBackgroundColor
        ? parentBackgroundColor.toHexString()
        : undefined
    });
    return false;
  }

  this.data({
    messageKey: 'fgContrast',
    contrastRatio: textContrast,
    requiredContrastRatio,
    nodeColor: nodeColor ? nodeColor.toHexString() : undefined,
    parentColor: parentColor ? parentColor.toHexString() : undefined
  });
  return false;
}

const blockLike = [
  'block',
  'list-item',
  'table',
  'flex',
  'grid',
  'inline-block'
];

function linkInTextBlockStyleEvaluate(node) {
  if (isBlock(node)) {
    return false;
  }

  let parentBlock = chunk012.getComposedParent(node);
  while (parentBlock && parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
    parentBlock = chunk012.getComposedParent(parentBlock);
  }

  if (!parentBlock) {
    return undefined;
  }

  this.relatedNodes([parentBlock]);

  if (chunk022.elementIsDistinct(node, parentBlock)) {
    return true;
  }
  if (hasPseudoContent(node)) {
    this.data({ messageKey: 'pseudoContent' });
    return undefined;
  }
  return false;
}

function isBlock(elm) {
  const display = window.getComputedStyle(elm).getPropertyValue('display');
  return blockLike.indexOf(display) !== -1 || display.substr(0, 6) === 'table-';
}

function hasPseudoContent(node) {
  for (const pseudo of ['before', 'after']) {
    const style = window.getComputedStyle(node, `:${pseudo}`);
    const content = style.getPropertyValue('content');
    if (content !== 'none') {
      return true;
    }
  }
  return false;
}

function autocompleteAppropriateEvaluate(node, options, virtualNode) {
  // Select and textarea is always allowed
  if (virtualNode.props.nodeName !== 'input') {
    return true;
  }

  const number = ['text', 'search', 'number', 'tel'];
  const url = ['text', 'search', 'url'];
  const allowedTypesMap = {
    bday: ['text', 'search', 'date'],
    email: ['text', 'search', 'email'],
    username: ['text', 'search', 'email'],
    'street-address': ['text'], // Issue: https://github.com/dequelabs/axe-core/issues/1161
    tel: ['text', 'search', 'tel'],
    'tel-country-code': ['text', 'search', 'tel'],
    'tel-national': ['text', 'search', 'tel'],
    'tel-area-code': ['text', 'search', 'tel'],
    'tel-local': ['text', 'search', 'tel'],
    'tel-local-prefix': ['text', 'search', 'tel'],
    'tel-local-suffix': ['text', 'search', 'tel'],
    'tel-extension': ['text', 'search', 'tel'],
    'cc-number': number,
    'cc-exp': ['text', 'search', 'month', 'tel'],
    'cc-exp-month': number,
    'cc-exp-year': number,
    'cc-csc': number,
    'transaction-amount': number,
    'bday-day': number,
    'bday-month': number,
    'bday-year': number,
    'new-password': ['text', 'search', 'password'],
    'current-password': ['text', 'search', 'password'],
    url: url,
    photo: url,
    impp: url
  };

  if (typeof options === 'object') {
    // Merge in options
    Object.keys(options).forEach(key => {
      if (!allowedTypesMap[key]) {
        allowedTypesMap[key] = [];
      }
      allowedTypesMap[key] = allowedTypesMap[key].concat(options[key]);
    });
  }

  const autocompleteAttr = virtualNode.attr('autocomplete');
  const autocompleteTerms = autocompleteAttr
    .split(/\s+/g)
    .map(term => term.toLowerCase());

  const purposeTerm = autocompleteTerms[autocompleteTerms.length - 1];
  if (chunk012.autocomplete.stateTerms.includes(purposeTerm)) {
    return true;
  }

  const allowedTypes = allowedTypesMap[purposeTerm];

  /**
   * Note:
   * Inconsistent response for `node.type` across browsers, hence resolving and sanitizing using getAttribute
   * Example:
   * Firefox returns `node.type` as `text` for `type='month'`
   *
   * Reference HTML Spec - https://html.spec.whatwg.org/multipage/input.html#the-input-element to filter allowed values for `type`
   * and sanitize (https://html.spec.whatwg.org/multipage/input.html#value-sanitization-algorithm)
   */
  let type = virtualNode.hasAttr('type')
    ? chunk012.sanitize(virtualNode.attr('type')).toLowerCase()
    : 'text';
  type = chunk014.validInputTypes().includes(type) ? type : 'text';

  if (typeof allowedTypes === 'undefined') {
    return type === 'text';
  }

  return allowedTypes.includes(type);
}

function autocompleteValidEvaluate(_node, options, virtualNode) {
  const autocomplete = virtualNode.attr('autocomplete') || '';
  return chunk012.isValidAutocomplete(autocomplete, options);
}

function attrNonSpaceContentEvaluate(node, options = {}, vNode) {
  if (!options.attribute || typeof options.attribute !== 'string') {
    throw new TypeError(
      'attr-non-space-content requires options.attribute to be a string'
    );
  }

  if (!vNode.hasAttr(options.attribute)) {
    this.data({
      messageKey: 'noAttr'
    });
    return false;
  }

  const attribute = vNode.attr(options.attribute);
  const attributeIsEmpty = !chunk012.sanitize(attribute);
  if (attributeIsEmpty) {
    this.data({
      messageKey: 'emptyAttr'
    });
    return false;
  }
  return true;
}

function pageHasElmAfter(results) {
  const elmUsedAnywhere = results.some(
    frameResult => frameResult.result === true
  );

  // If the element exists in any frame, set them all to true
  if (elmUsedAnywhere) {
    results.forEach(result => {
      result.result = true;
    });
  }
  return results;
}

function hasDescendant(node, options, virtualNode) {
  if (!options || !options.selector || typeof options.selector !== 'string') {
    throw new TypeError(
      'has-descendant requires options.selector to be a string'
    );
  }

  if (options.passForModal && chunk018.isModalOpen()) {
    return true;
  }

  const matchingElms = chunk014.querySelectorAllFilter(
    virtualNode,
    options.selector,
    vNode => chunk018.isVisibleToScreenReaders(vNode)
  );
  this.relatedNodes(matchingElms.map(vNode => vNode.actualNode));
  return matchingElms.length > 0;
}

function hasTextContentEvaluate(node, options, virtualNode) {
  try {
    return chunk012.sanitize(chunk018.subtreeText(virtualNode)) !== '';
  } catch {
    return undefined;
  }
}

function matchesDefinitionEvaluate(_, options, virtualNode) {
  return chunk018.matches(virtualNode, options.matcher);
}

function pageNoDuplicateAfter(results) {
  // ignore results
  return results.filter(checkResult => checkResult.data !== 'ignored');
}

function pageNoDuplicateEvaluate(node, options, virtualNode) {
  if (!options || !options.selector || typeof options.selector !== 'string') {
    throw new TypeError(
      'page-no-duplicate requires options.selector to be a string'
    );
  }

  // only look at the first node and it's related nodes
  const key = 'page-no-duplicate;' + options.selector;
  if (chunk007.cache.get(key)) {
    this.data('ignored');
    return;
  }
  chunk007.cache.set(key, true);

  let elms = chunk014.querySelectorAllFilter(chunk007.axe._tree[0], options.selector, elm =>
    chunk018.isVisibleToScreenReaders(elm)
  );

  // @deprecated options.nativeScopeFilter
  // Filter elements that, within certain contexts, don't map their role.
  // e.g. a <footer> inside a <main> is not a banner, but in the <body> context it is
  if (typeof options.nativeScopeFilter === 'string') {
    elms = elms.filter(elm => {
      return (
        elm.actualNode.hasAttribute('role') ||
        !chunk018.findUpVirtual(elm, options.nativeScopeFilter)
      );
    });
  }

  if (typeof options.role === 'string') {
    elms = elms.filter(elm => chunk018.getRole(elm) === options.role);
  }

  this.relatedNodes(
    elms.filter(elm => elm !== virtualNode).map(elm => elm.actualNode)
  );

  return elms.length <= 1;
}

function accesskeysAfter(results) {
  const seen = {};
  return results
    .filter(r => {
      if (!r.data) {
        return false;
      }
      const key = r.data.toUpperCase();
      if (!seen[key]) {
        seen[key] = r;
        r.relatedNodes = [];
        return true;
      }
      seen[key].relatedNodes.push(r.relatedNodes[0]);
      return false;
    })
    .map(r => {
      r.result = !!r.relatedNodes.length;
      return r;
    });
}

function accesskeysEvaluate(node, options, vNode) {
  if (!chunk018.isHiddenForEveryone(vNode)) {
    this.data(vNode.attr('accesskey'));
    this.relatedNodes([node]);
  }
  return true;
}

function focusableContentEvaluate(node, options, virtualNode) {
  /**
   * Note:
   * Check if given node contains focusable elements (excluding thyself)
   */
  const tabbableElements = virtualNode.tabbableElements;

  if (!tabbableElements) {
    return false;
  }

  // remove thyself from tabbable elements (if exists)
  const tabbableContentElements = tabbableElements.filter(
    el => el !== virtualNode
  );

  return tabbableContentElements.length > 0;
}

function focusableDisabledEvaluate(node, options, virtualNode) {
  const elementsThatCanBeDisabled = [
    'button',
    'fieldset',
    'input',
    'select',
    'textarea'
  ];

  const tabbableElements = virtualNode.tabbableElements;

  if (!tabbableElements || !tabbableElements.length) {
    return true;
  }

  const relatedNodes = tabbableElements.filter(vNode => {
    return elementsThatCanBeDisabled.includes(vNode.props.nodeName);
  });

  this.relatedNodes(relatedNodes.map(vNode => vNode.actualNode));

  if (relatedNodes.length === 0 || chunk018.isModalOpen()) {
    return true;
  }

  return relatedNodes.every(vNode => {
    const pointerEvents = vNode.getComputedStylePropertyValue('pointer-events');
    const width = parseInt(vNode.getComputedStylePropertyValue('width'));
    const height = parseInt(vNode.getComputedStylePropertyValue('height'));

    return (
      vNode.actualNode.onfocus ||
      ((width === 0 || height === 0) && pointerEvents === 'none')
    );
  })
    ? undefined
    : false;
}

function focusableElementEvaluate(node, options, virtualNode) {
  /**
   * Note:
   * Check
   * - if element is focusable
   * - if element is in focus order via `tabindex`
   */
  if (
    virtualNode.hasAttr('contenteditable') &&
    isContenteditable(virtualNode)
  ) {
    return true;
  }

  return chunk018.isInTabOrder(virtualNode);

  // contenteditable is focusable when it is an empty string (whitespace
  // is not considered empty) or "true". if the value is "false"
  // you can't edit it, but if it's anything else it inherits the value
  // from the first valid ancestor
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
  function isContenteditable(vNode) {
    const contenteditable = vNode.attr('contenteditable');
    if (contenteditable === 'true' || contenteditable === '') {
      return true;
    }

    if (contenteditable === 'false') {
      return false;
    }

    const ancestor = chunk011.closest(virtualNode.parent, '[contenteditable]');
    if (!ancestor) {
      return false;
    }

    return isContenteditable(ancestor);
  }
}

function focusableModalOpenEvaluate(node, options, virtualNode) {
  const tabbableElements = virtualNode.tabbableElements.map(
    ({ actualNode }) => actualNode
  );

  if (!tabbableElements || !tabbableElements.length) {
    return true;
  }

  if (chunk018.isModalOpen()) {
    this.relatedNodes(tabbableElements);
    return undefined;
  }

  return true;
}

function focusableNoNameEvaluate(node, options, virtualNode) {
  if (!chunk018.isInTabOrder(virtualNode)) {
    return false;
  }

  try {
    return !chunk018.accessibleTextVirtual(virtualNode);
  } catch {
    return undefined;
  }
}

function focusableNotTabbableEvaluate(node, options, virtualNode) {
  const elementsThatCanBeDisabled = [
    'button',
    'fieldset',
    'input',
    'select',
    'textarea'
  ];

  const tabbableElements = virtualNode.tabbableElements;

  if (!tabbableElements || !tabbableElements.length) {
    return true;
  }

  const relatedNodes = tabbableElements.filter(vNode => {
    return !elementsThatCanBeDisabled.includes(vNode.props.nodeName);
  });

  this.relatedNodes(relatedNodes.map(vNode => vNode.actualNode));

  if (relatedNodes.length === 0 || chunk018.isModalOpen()) {
    return true;
  }

  return relatedNodes.every(vNode => {
    const pointerEvents = vNode.getComputedStylePropertyValue('pointer-events');
    const width = parseInt(vNode.getComputedStylePropertyValue('width'));
    const height = parseInt(vNode.getComputedStylePropertyValue('height'));

    return (
      vNode.actualNode.onfocus ||
      ((width === 0 || height === 0) && pointerEvents === 'none')
    );
  })
    ? undefined
    : false;
}

function frameFocusableContentEvaluate(
  node,
  options,
  virtualNode
) {
  if (!virtualNode.children) {
    return undefined;
  }

  try {
    return !virtualNode.children.some(child => {
      return focusableDescendants(child);
    });
  } catch {
    return undefined;
  }
}

function focusableDescendants(vNode) {
  if (chunk018.isInTabOrder(vNode)) {
    return true;
  }

  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return false;
  }

  return vNode.children.some(child => {
    return focusableDescendants(child);
  });
}

function landmarkIsTopLevelEvaluate(node) {
  const landmarks = chunk019.getAriaRolesByType('landmark');
  let parent = chunk012.getComposedParent(node);
  const nodeRole = chunk018.getRole(node);

  this.data({ role: nodeRole });

  while (parent) {
    let role = chunk018.getExplicitRole(parent);
    if (!role && parent.nodeName.toUpperCase() !== 'FORM') {
      role = chunk018.implicitRole(parent);
    }
    // allow aside inside main
    // @see https://github.com/dequelabs/axe-core/issues/2651
    if (
      role &&
      landmarks.includes(role) &&
      !(role === 'main' && nodeRole === 'complementary')
    ) {
      return false;
    }
    parent = chunk012.getComposedParent(parent);
  }
  return true;
}

function noFocusableContentEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }

  try {
    const focusableDescendants = getFocusableDescendants(virtualNode);

    if (!focusableDescendants.length) {
      return true;
    }

    const notHiddenElements = focusableDescendants.filter(
      usesUnreliableHidingStrategy
    );

    if (notHiddenElements.length > 0) {
      this.data({ messageKey: 'notHidden' });
      this.relatedNodes(notHiddenElements);
    } else {
      this.relatedNodes(focusableDescendants);
    }

    return false;
  } catch {
    return undefined;
  }
}

function getFocusableDescendants(vNode) {
  if (!vNode.children) {
    if (vNode.props.nodeType === 1) {
      throw new Error('Cannot determine children');
    }

    return [];
  }

  const retVal = [];
  vNode.children.forEach(child => {
    if (chunk018.getRoleType(child) === 'widget' && chunk018.isFocusable(child)) {
      retVal.push(child);
    } else {
      retVal.push(...getFocusableDescendants(child));
    }
  });
  return retVal;
}

function usesUnreliableHidingStrategy(vNode) {
  const tabIndex = chunk013.parseTabindex(vNode.attr('tabindex'));
  return tabIndex !== null && tabIndex < 0;
}

function tabindexEvaluate(node, options, virtualNode) {
  const tabIndex = chunk013.parseTabindex(virtualNode.attr('tabindex'));

  // an invalid tabindex will either return 0 or -1 (based on the element) so
  // will never be above 0
  // @see https://www.w3.org/TR/html51/editing.html#the-tabindex-attribute
  return tabIndex === null || tabIndex <= 0;
}

function altSpaceValueEvaluate(node, options, virtualNode) {
  const alt = virtualNode.attr('alt');
  const isOnlySpace = /^\s+$/;
  return typeof alt === 'string' && isOnlySpace.test(alt);
}

function duplicateImgLabelEvaluate(node, options, virtualNode) {
  if (['none', 'presentation'].includes(chunk018.getRole(virtualNode))) {
    return false;
  }
  const parentVNode = chunk011.closest(virtualNode, options.parentSelector);

  if (!parentVNode) {
    return false;
  }

  const visibleText = chunk018.visibleVirtual(parentVNode, true).toLowerCase();
  if (visibleText === '') {
    return false;
  }

  return visibleText === chunk018.accessibleTextVirtual(virtualNode).toLowerCase();
}

function explicitEvaluate(node, options, virtualNode) {
  if (!virtualNode.attr('id')) {
    return false;
  }
  if (!virtualNode.actualNode) {
    return undefined;
  }

  const root = chunk012.getRootNode(virtualNode.actualNode);
  const id = chunk007.escapeSelector(virtualNode.attr('id'));
  const labels = Array.from(root.querySelectorAll(`label[for="${id}"]`));
  this.relatedNodes(labels);

  if (!labels.length) {
    return false;
  }

  try {
    return labels.some(label => {
      // defer to hidden-explicit-label check for better messaging
      if (!chunk018.isVisibleOnScreen(label)) {
        return true;
      } else {
        const explicitLabel = chunk012.sanitize(
          chunk018.accessibleText(label, {
            inControlContext: true,
            startNode: virtualNode
          })
        );
        this.data({ explicitLabel });
        return !!explicitLabel;
      }
    });
  } catch {
    return undefined;
  }
}

function helpSameAsLabelEvaluate(node, options, virtualNode) {
  const labelText = chunk018.labelVirtual$1(virtualNode);
  let check = node.getAttribute('title');

  if (!labelText) {
    return false;
  }

  if (!check) {
    check = '';

    if (node.getAttribute('aria-describedby')) {
      const ref = chunk018.idrefs(node, 'aria-describedby');
      check = ref
        .map(thing => {
          return thing ? chunk018.accessibleText(thing) : '';
        })
        .join('');
    }
  }

  return chunk012.sanitize(check) === chunk012.sanitize(labelText);
}

function hiddenExplicitLabelEvaluate(node, options, virtualNode) {
  if (virtualNode.hasAttr('id')) {
    if (!virtualNode.actualNode) {
      return undefined;
    }

    const root = chunk012.getRootNode(node);
    const id = chunk007.escapeSelector(node.getAttribute('id'));
    const label = root.querySelector(`label[for="${id}"]`);

    if (label && !chunk018.isVisibleToScreenReaders(label)) {
      let name;
      try {
        name = chunk018.accessibleTextVirtual(virtualNode).trim();
      } catch {
        return undefined;
      }

      const isNameEmpty = name === '';
      return isNameEmpty;
    }
  }
  return false;
}

function implicitEvaluate(node, options, virtualNode) {
  try {
    const label = chunk011.closest(virtualNode, 'label');
    if (label) {
      const implicitLabel = chunk012.sanitize(
        chunk018.accessibleTextVirtual(label, {
          inControlContext: true,
          startNode: virtualNode
        })
      );
      if (label.actualNode) {
        this.relatedNodes([label.actualNode]);
      }
      this.data({ implicitLabel });
      return !!implicitLabel;
    }
    return false;
  } catch {
    return undefined;
  }
}

/**
 * Check if a given text exists in another
 *
 * @param {String} compare given text to check
 * @param {String} compareWith text against which to be compared
 * @returns {Boolean}
 */
function isStringContained(compare, compareWith) {
  const curatedCompareWith = curateString(compareWith);
  const curatedCompare = curateString(compare);
  if (!curatedCompareWith || !curatedCompare) {
    return false;
  }
  return curatedCompareWith.includes(curatedCompare);
}

/**
 * Curate given text, by removing emoji's, punctuations, unicode and trim whitespace.
 *
 * @param {String} str given text to curate
 * @returns {String}
 */
function curateString(str) {
  const noUnicodeStr = chunk012.removeUnicode(str, {
    emoji: true,
    nonBmp: true,
    punctuations: true
  });
  return chunk012.sanitize(noUnicodeStr);
}

function labelContentNameMismatchEvaluate(node, options, virtualNode) {
  const pixelThreshold = options?.pixelThreshold;
  const occurrenceThreshold =
    options?.occurrenceThreshold ?? options?.occuranceThreshold;
  const accText = chunk018.accessibleText(node).toLowerCase();
  const visibleText = chunk012.sanitize(
    chunk018.subtreeText(virtualNode, {
      subtreeDescendant: true,
      ignoreIconLigature: true,
      pixelThreshold,
      occurrenceThreshold
    })
  ).toLowerCase();

  if (!visibleText) {
    return true;
  }

  if (
    chunk012.isHumanInterpretable(accText) < 1 ||
    chunk012.isHumanInterpretable(visibleText) < 1
  ) {
    return undefined;
  }

  return isStringContained(visibleText, accText);
}

function multipleLabelEvaluate(node) {
  const id = chunk007.escapeSelector(node.getAttribute('id'));
  let parent = node.parentNode;
  let root = chunk012.getRootNode(node);
  root = root.documentElement || root;
  let labels = Array.from(root.querySelectorAll(`label[for="${id}"]`));

  if (labels.length) {
    // filter out CSS hidden labels because they're fine
    labels = labels.filter(label => !chunk018.isHiddenForEveryone(label));
  }

  while (parent) {
    if (
      parent.nodeName.toUpperCase() === 'LABEL' &&
      labels.indexOf(parent) === -1
    ) {
      labels.push(parent);
    }
    parent = parent.parentNode;
  }

  this.relatedNodes(labels);

  // more than 1 CSS visible label
  if (labels.length > 1) {
    const ATVisibleLabels = labels.filter(label =>
      chunk018.isVisibleToScreenReaders(label)
    );
    // more than 1 AT visible label will fail IOS/Safari/VO even with aria-labelledby
    if (ATVisibleLabels.length > 1) {
      return undefined;
    }
    // make sure the ONE AT visible label is in the list of idRefs of aria-labelledby
    const labelledby = chunk018.idrefs(node, 'aria-labelledby');
    return !labelledby.includes(ATVisibleLabels[0]) ? undefined : false;
  }

  // only 1 CSS visible label
  return false;
}

function titleOnlyEvaluate(node, options, virtualNode) {
  const labelText = chunk018.labelVirtual$1(virtualNode);
  const title = chunk018.titleText(virtualNode);
  const ariaDescribedBy = virtualNode.attr('aria-describedby');

  return !labelText && !!(title || ariaDescribedBy);
}

function landmarkIsUniqueAfter(results) {
  const uniqueLandmarks = [];

  // filter out landmark elements that share the same role and accessible text
  // so every non-unique landmark isn't reported as a failure (just the first)
  return results.filter(currentResult => {
    const findMatch = someResult => {
      return (
        currentResult.data.role === someResult.data.role &&
        currentResult.data.accessibleText === someResult.data.accessibleText
      );
    };

    const matchedResult = uniqueLandmarks.find(findMatch);
    if (matchedResult) {
      matchedResult.result = false;
      matchedResult.relatedNodes.push(currentResult.relatedNodes[0]);
      return false;
    }

    uniqueLandmarks.push(currentResult);
    currentResult.relatedNodes = [];
    return true;
  });
}

function landmarkIsUniqueEvaluate(node, options, virtualNode) {
  const role = chunk018.getRole(node);
  let accessibleText = chunk018.accessibleTextVirtual(virtualNode);
  accessibleText = accessibleText ? accessibleText.toLowerCase() : null;
  this.data({ role: role, accessibleText: accessibleText });
  this.relatedNodes([node]);

  return true;
}

function hasValue(value) {
  return (value || '').trim() !== '';
}

function hasLangEvaluate(node, options, virtualNode) {
  // special case when xml:lang has a value and lang does not
  // but the document is not XHTML
  const xhtml = typeof document !== 'undefined' ? chunk010.isXHTML(document) : false;

  if (
    options.attributes.includes('xml:lang') &&
    options.attributes.includes('lang') &&
    hasValue(virtualNode.attr('xml:lang')) &&
    !hasValue(virtualNode.attr('lang')) &&
    !xhtml
  ) {
    this.data({
      messageKey: 'noXHTML'
    });
    return false;
  }

  const hasLang = options.attributes.some(name => {
    return hasValue(virtualNode.attr(name));
  });

  if (!hasLang) {
    this.data({
      messageKey: 'noLang'
    });
    return false;
  }

  return true;
}

function validLangEvaluate(node, options, virtualNode) {
  const invalid = [];
  options.attributes.forEach(langAttr => {
    const langVal = virtualNode.attr(langAttr);
    if (typeof langVal !== 'string') {
      return;
    }

    const baselangVal = chunk012.getBaseLang(langVal);
    const invalidLang = options.value
      ? !options.value.map(chunk012.getBaseLang).includes(baselangVal)
      : !chunk015.isValidLang(baselangVal);

    // Edge sets lang to an empty string when xml:lang is set
    // so we need to ignore empty strings here
    if (
      (baselangVal !== '' && invalidLang) ||
      // whitespace only lang value is invalid
      (langVal !== '' && !chunk012.sanitize(langVal))
    ) {
      invalid.push(langAttr + '="' + virtualNode.attr(langAttr) + '"');
    }
  });

  if (!invalid.length) {
    return false;
  }
  if (
    // Except for `html`, ignore elements with no text
    virtualNode.props.nodeName !== 'html' &&
    !chunk018.hasLangText(virtualNode)
  ) {
    return false;
  }
  this.data(invalid);
  return true;
}

function xmlLangMismatchEvaluate(node, options, vNode) {
  const primaryLangValue = chunk012.getBaseLang(vNode.attr('lang'));
  const primaryXmlLangValue = chunk012.getBaseLang(vNode.attr('xml:lang'));

  return primaryLangValue === primaryXmlLangValue;
}

function dlitemEvaluate(node) {
  let parent = chunk012.getComposedParent(node);
  let parentTagName = parent.nodeName.toUpperCase();
  let parentRole = chunk018.getExplicitRole(parent);

  if (
    parentTagName === 'DIV' &&
    ['presentation', 'none', null].includes(parentRole)
  ) {
    parent = chunk012.getComposedParent(parent);
    parentTagName = parent.nodeName.toUpperCase();
    parentRole = chunk018.getExplicitRole(parent);
  }

  // Unlike with UL|OL+LI, DT|DD must be in a DL
  if (parentTagName !== 'DL') {
    return false;
  }

  if (!parentRole || ['presentation', 'none', 'list'].includes(parentRole)) {
    return true;
  }

  return false;
}

function invalidChildrenEvaluate(
  node,
  options = {},
  virtualNode
) {
  const relatedNodes = [];
  const issues = [];
  if (!virtualNode.children) {
    return undefined;
  }

  const vChildren = mapWithNested(virtualNode.children);
  while (vChildren.length) {
    const { vChild, nested } = vChildren.shift();
    if (options.divGroups && !nested && isDivGroup(vChild)) {
      if (!vChild.children) {
        return undefined;
      }
      const vGrandChildren = mapWithNested(vChild.children, true);
      vChildren.push(...vGrandChildren);
      continue;
    }

    const issue = getInvalidSelector(vChild, nested, options);
    if (!issue) {
      continue;
    }
    if (!issues.includes(issue)) {
      issues.push(issue);
    }
    if (vChild?.actualNode?.nodeType === 1) {
      relatedNodes.push(vChild.actualNode);
    }
  }
  if (issues.length === 0) {
    return false;
  }

  this.data({ values: issues.join(', ') });
  this.relatedNodes(relatedNodes);
  return true;
}

function getInvalidSelector(
  vChild,
  nested,
  { validRoles = [], validNodeNames = [] }
) {
  const { nodeName, nodeType, nodeValue } = vChild.props;
  const selector = nested ? 'div > ' : '';
  if (nodeType === 3 && nodeValue.trim() !== '') {
    return selector + `#text`;
  }
  if (nodeType !== 1 || !chunk018.isVisibleToScreenReaders(vChild)) {
    return false;
  }

  const role = chunk018.getExplicitRole(vChild);
  if (role) {
    return validRoles.includes(role) ? false : selector + `[role=${role}]`;
  } else {
    return validNodeNames.includes(nodeName) ? false : selector + nodeName;
  }
}

function isDivGroup(vNode) {
  return vNode.props.nodeName === 'div' && chunk018.getExplicitRole(vNode) === null;
}

function mapWithNested(vNodes, nested = false) {
  return vNodes.map(vChild => ({ vChild, nested }));
}

function listitemEvaluate(node, options, virtualNode) {
  const { parent } = virtualNode;
  if (!parent) {
    // Can only happen with detached DOM nodes and roots:
    return undefined;
  }

  const parentNodeName = parent.props.nodeName;
  const parentRole = chunk018.getExplicitRole(parent);

  if (['presentation', 'none', 'list'].includes(parentRole)) {
    return true;
  }

  if (parentRole && chunk018.isValidRole(parentRole)) {
    this.data({
      messageKey: 'roleNotValid'
    });
    return false;
  }
  return ['ul', 'ol', 'menu'].includes(parentNodeName);
}

/**
 * @deprecated
 */
function onlyDlitemsEvaluate(node, options, virtualNode) {
  const ALLOWED_ROLES = ['definition', 'term', 'list'];
  const base = {
    badNodes: [],
    hasNonEmptyTextNode: false
  };

  const content = virtualNode.children.reduce((vNodes, child) => {
    const { actualNode } = child;
    if (
      actualNode.nodeName.toUpperCase() === 'DIV' &&
      chunk018.getRole(actualNode) === null
    ) {
      return vNodes.concat(child.children);
    }
    return vNodes.concat(child);
  }, []);

  const result = content.reduce((out, childNode) => {
    const { actualNode } = childNode;
    const tagName = actualNode.nodeName.toUpperCase();

    if (actualNode.nodeType === 1 && chunk018.isVisibleToScreenReaders(actualNode)) {
      const explicitRole = chunk018.getExplicitRole(actualNode);

      if ((tagName !== 'DT' && tagName !== 'DD') || explicitRole) {
        if (!ALLOWED_ROLES.includes(explicitRole)) {
          // handle comment - https://github.com/dequelabs/axe-core/pull/518/files#r139284668
          out.badNodes.push(actualNode);
        }
      }
    } else if (
      actualNode.nodeType === 3 &&
      actualNode.nodeValue.trim() !== ''
    ) {
      out.hasNonEmptyTextNode = true;
    }
    return out;
  }, base);

  if (result.badNodes.length) {
    this.relatedNodes(result.badNodes);
  }

  return !!result.badNodes.length || result.hasNonEmptyTextNode;
}

/**
 * @deprecated
 */
function onlyListitemsEvaluate(node, options, virtualNode) {
  let hasNonEmptyTextNode = false;
  let atLeastOneListitem = false;
  let isEmpty = true;
  const badNodes = [];
  const badRoleNodes = [];
  const badRoles = [];

  virtualNode.children.forEach(vNode => {
    const { actualNode } = vNode;

    if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
      hasNonEmptyTextNode = true;
      return;
    }

    if (actualNode.nodeType !== 1 || !chunk018.isVisibleToScreenReaders(actualNode)) {
      return;
    }

    isEmpty = false;
    const isLi = actualNode.nodeName.toUpperCase() === 'LI';
    const role = chunk018.getRole(vNode);
    const isListItemRole = role === 'listitem';

    if (!isLi && !isListItemRole) {
      badNodes.push(actualNode);
    }

    if (isLi && !isListItemRole) {
      badRoleNodes.push(actualNode);

      if (!badRoles.includes(role)) {
        badRoles.push(role);
      }
    }

    if (isListItemRole) {
      atLeastOneListitem = true;
    }
  });

  if (hasNonEmptyTextNode || badNodes.length) {
    this.relatedNodes(badNodes);
    return true;
  }

  if (isEmpty || atLeastOneListitem) {
    return false;
  }

  this.relatedNodes(badRoleNodes);
  this.data({
    messageKey: 'roleNotValid',
    roles: badRoles.join(', ')
  });
  return true;
}

function structuredDlitemsEvaluate(node, options, virtualNode) {
  const children = virtualNode.children;
  if (!children || !children.length) {
    return false;
  }

  let hasDt = false,
    hasDd = false,
    nodeName;
  for (let i = 0; i < children.length; i++) {
    nodeName = children[i].props.nodeName.toUpperCase();
    if (nodeName === 'DT') {
      hasDt = true;
    }
    if (hasDt && nodeName === 'DD') {
      return false;
    }
    if (nodeName === 'DD') {
      hasDd = true;
    }
  }

  return hasDt || hasDd;
}

function captionEvaluate(node, options, virtualNode) {
  const tracks = chunk014.querySelectorAll(virtualNode, 'track');
  const hasCaptions = tracks.some(vNode => {
    return (vNode.attr('kind') || '').toLowerCase() === 'captions';
  });

  // Undefined if there are no tracks - media may use another caption method
  return hasCaptions ? false : undefined;
}

const joinStr = ' > ';

function frameTestedAfter(results) {
  const iframes = {};

  return results.filter(result => {
    const frameResult =
      result.node.ancestry[result.node.ancestry.length - 1] !== 'html';

    if (frameResult) {
      const ancestry = result.node.ancestry.flat(Infinity).join(joinStr);
      iframes[ancestry] = result;
      return true;
    }

    // remove the `html` from the path to get the iframe path
    const ancestry = result.node.ancestry
      .slice(0, result.node.ancestry.length - 1)
      .flat(Infinity)
      .join(joinStr);

    // pass for each iframe that has an html result
    if (iframes[ancestry]) {
      iframes[ancestry].result = true;
    }

    return false;
  });
}

function frameTestedEvaluate(node, options) {
  // assume iframe is not tested
  return options.isViolation ? false : undefined;
}

exports.accesskeysAfter = accesskeysAfter;
exports.accesskeysEvaluate = accesskeysEvaluate;
exports.altSpaceValueEvaluate = altSpaceValueEvaluate;
exports.attrNonSpaceContentEvaluate = attrNonSpaceContentEvaluate;
exports.autocompleteAppropriateEvaluate = autocompleteAppropriateEvaluate;
exports.autocompleteValidEvaluate = autocompleteValidEvaluate;
exports.captionEvaluate = captionEvaluate;
exports.colorContrastEvaluate = colorContrastEvaluate;
exports.dlitemEvaluate = dlitemEvaluate;
exports.duplicateImgLabelEvaluate = duplicateImgLabelEvaluate;
exports.explicitEvaluate = explicitEvaluate;
exports.focusableContentEvaluate = focusableContentEvaluate;
exports.focusableDisabledEvaluate = focusableDisabledEvaluate;
exports.focusableElementEvaluate = focusableElementEvaluate;
exports.focusableModalOpenEvaluate = focusableModalOpenEvaluate;
exports.focusableNoNameEvaluate = focusableNoNameEvaluate;
exports.focusableNotTabbableEvaluate = focusableNotTabbableEvaluate;
exports.frameFocusableContentEvaluate = frameFocusableContentEvaluate;
exports.frameTestedAfter = frameTestedAfter;
exports.frameTestedEvaluate = frameTestedEvaluate;
exports.hasDescendant = hasDescendant;
exports.hasLangEvaluate = hasLangEvaluate;
exports.hasTextContentEvaluate = hasTextContentEvaluate;
exports.helpSameAsLabelEvaluate = helpSameAsLabelEvaluate;
exports.hiddenExplicitLabelEvaluate = hiddenExplicitLabelEvaluate;
exports.implicitEvaluate = implicitEvaluate;
exports.invalidChildrenEvaluate = invalidChildrenEvaluate;
exports.labelContentNameMismatchEvaluate = labelContentNameMismatchEvaluate;
exports.landmarkIsTopLevelEvaluate = landmarkIsTopLevelEvaluate;
exports.landmarkIsUniqueAfter = landmarkIsUniqueAfter;
exports.landmarkIsUniqueEvaluate = landmarkIsUniqueEvaluate;
exports.linkInTextBlockEvaluate = linkInTextBlockEvaluate;
exports.linkInTextBlockStyleEvaluate = linkInTextBlockStyleEvaluate;
exports.listitemEvaluate = listitemEvaluate;
exports.matchesDefinitionEvaluate = matchesDefinitionEvaluate;
exports.multipleLabelEvaluate = multipleLabelEvaluate;
exports.noFocusableContentEvaluate = noFocusableContentEvaluate;
exports.onlyDlitemsEvaluate = onlyDlitemsEvaluate;
exports.onlyListitemsEvaluate = onlyListitemsEvaluate;
exports.pageHasElmAfter = pageHasElmAfter;
exports.pageNoDuplicateAfter = pageNoDuplicateAfter;
exports.pageNoDuplicateEvaluate = pageNoDuplicateEvaluate;
exports.structuredDlitemsEvaluate = structuredDlitemsEvaluate;
exports.tabindexEvaluate = tabindexEvaluate;
exports.titleOnlyEvaluate = titleOnlyEvaluate;
exports.validLangEvaluate = validLangEvaluate;
exports.xmlLangMismatchEvaluate = xmlLangMismatchEvaluate;
