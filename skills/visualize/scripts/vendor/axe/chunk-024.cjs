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
require('./chunk-010.cjs');
const chunk011 = require('./chunk-011.cjs');
const chunk018 = require('./chunk-018.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');
const chunk012 = require('./chunk-012.cjs');
require('./chunk-020.cjs');
const chunk021 = require('./chunk-021.cjs');
const chunk022 = require('./chunk-022.cjs');

function noAutoplayAudioEvaluate(node, options) {
  const hasControls = node.hasAttribute('controls');

  /**
   * if the media loops then we only need to know if it has controls, regardless
   * of the duration
   */
  if (node.hasAttribute('loop')) {
    return hasControls;
  }

  /**
   * if duration cannot be read, this means `preloadMedia` has failed
   */
  if (!node.duration) {
    console.warn(`axe.utils.preloadMedia did not load metadata`);
    return undefined;
  }

  /**
   * Compute playable duration and verify if it within allowed duration
   */
  const { allowedDuration = 3 } = options;
  const playableDuration = getPlayableDuration(node);
  if (playableDuration <= allowedDuration) {
    return true;
  }

  /**
   * if media element does not provide controls mechanism
   * -> fail
   */
  if (!hasControls) {
    return false;
  }

  return true;

  /**
   * Compute playback duration
   * @param {HTMLMediaElement} elm media element
   */
  function getPlayableDuration(elm) {
    if (!elm.currentSrc) {
      return 0;
    }

    const playbackRange = getPlaybackRange(elm.currentSrc);
    if (!playbackRange) {
      return Math.abs(elm.duration - (elm.currentTime || 0));
    }

    if (playbackRange.length === 1) {
      return Math.abs(elm.duration - playbackRange[0]);
    }

    return Math.abs(playbackRange[1] - playbackRange[0]);
  }

  /**
   * Get playback range from a media elements source, if specified
   * See - https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Specifying_playback_range
   *
   * Eg:
   * src='....someMedia.mp3#t=8'
   * 	-> should yeild [8]
   * src='....someMedia.mp3#t=10,12'
   *  -> should yeild [10,12]
   * @param {String} src media src
   * @returns {Array|undefined}
   */
  function getPlaybackRange(src) {
    const match = src.match(/#t=(.*)/);
    if (!match) {
      return;
    }
    const [, value] = match;
    const ranges = value.split(',');

    return ranges.map(range => {
      // range is denoted in HH:MM:SS -> convert to seconds
      if (/:/.test(range)) {
        return convertHourMinSecToSeconds(range);
      }
      return parseFloat(range);
    });
  }

  /**
   * Add HH, MM, SS to seconds
   * @param {String} hhMmSs time expressed in HH:MM:SS
   */
  function convertHourMinSecToSeconds(hhMmSs) {
    const parts = hhMmSs.split(':');
    let secs = 0;
    let mins = 1;

    while (parts.length > 0) {
      secs += mins * parseInt(parts.pop(), 10);
      mins *= 60;
    }

    return parseFloat(secs);
  }
}

function cssOrientationLockEvaluate(node, options, virtualNode, context) {
  const { cssom = undefined } = context || {};
  const { degreeThreshold = 0 } = options || {};
  if (!cssom || !cssom.length) {
    return undefined;
  }

  let isLocked = false;
  let relatedElements = [];
  const rulesGroupByDocumentFragment = groupCssomByDocument(cssom);

  for (const key of Object.keys(rulesGroupByDocumentFragment)) {
    const { root, rules } = rulesGroupByDocumentFragment[key];
    const orientationRules = rules.filter(isMediaRuleWithOrientation);
    if (!orientationRules.length) {
      continue;
    }

    orientationRules.forEach(({ cssRules }) => {
      Array.from(cssRules).forEach(cssRule => {
        const locked = getIsOrientationLocked(cssRule);

        // if locked and not root HTML, preserve as relatedNodes
        if (locked && cssRule.selectorText.toUpperCase() !== 'HTML') {
          const elms =
            Array.from(root.querySelectorAll(cssRule.selectorText)) || [];
          relatedElements = relatedElements.concat(elms);
        }

        isLocked = isLocked || locked;
      });
    });
  }

  if (!isLocked) {
    return true;
  }
  if (relatedElements.length) {
    this.relatedNodes(relatedElements);
  }
  return false;

  /**
   * Group given cssom by document/ document fragment
   * @param {Array<Object>} allCssom cssom
   * @return {Object}
   */
  function groupCssomByDocument(cssObjectModel) {
    return cssObjectModel.reduce((out, { sheet, root, shadowId }) => {
      const key = shadowId ? shadowId : 'topDocument';

      if (!out[key]) {
        out[key] = { root, rules: [] };
      }

      if (!sheet || !sheet.cssRules) {
        return out;
      }

      const rules = Array.from(sheet.cssRules);
      out[key].rules = out[key].rules.concat(rules);

      return out;
    }, {});
  }

  /**
   * Filter CSS Rules that target Orientation CSS Media Features
   * @param {Array<Object>} cssRules
   * @returns {Array<Object>}
   */
  function isMediaRuleWithOrientation({ type, cssText }) {
    /**
     * Filter:
     * CSSRule.MEDIA_Rule
     * -> https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
     */
    if (type !== 4) {
      return false;
    }

    /**
     * Filter:
     * CSSRule with conditionText of `orientation`
     */
    return (
      /orientation:\s*landscape/i.test(cssText) ||
      /orientation:\s*portrait/i.test(cssText)
    );
  }

  /**
   * Interpolate a given CSS Rule to ascertain if orientation is locked by use of any transformation functions that affect rotation along the Z Axis
   * @param {Object} cssRule given CSS Rule
   * @property {String} cssRule.selectorText selector text targetted by given cssRule
   * @property {Object} cssRule.style style
   * @return {Boolean}
   */
  function getIsOrientationLocked({ selectorText, style }) {
    if (!selectorText || style.length <= 0) {
      return false;
    }

    const transformStyle =
      style.transform || style.webkitTransform || style.msTransform || false;
    if (!transformStyle && !style.rotate) {
      return false;
    }

    const transformDegrees = getTransformDegrees(transformStyle);
    const rotateDegrees = getRotationInDegrees('rotate', style.rotate);

    // `transform: rotate` and `rotate` are additive
    let degrees = transformDegrees + rotateDegrees;
    if (!degrees) {
      return false;
    }
    degrees = Math.abs(degrees);

    /**
     * When degree is a multiple of 180, it is not considered an orientation lock
     */
    if (Math.abs(degrees - 180) % 180 <= degreeThreshold) {
      return false;
    }

    return Math.abs(degrees - 90) % 90 <= degreeThreshold;
  }

  /**
   * Get the degree value of a transform.
   * @property {Object} cssRule.style style
   * @return {Number}
   */
  function getTransformDegrees(transformStyle) {
    if (!transformStyle) {
      return 0;
    }

    /**
     * get last match/occurrence of a transformation function that can affect rotation along Z axis
     */
    const matches = transformStyle.match(
      /(rotate|rotateZ|rotate3d|matrix|matrix3d)\(([^)]+)\)(?!.*(rotate|rotateZ|rotate3d|matrix|matrix3d))/
    );
    if (!matches) {
      return 0;
    }

    const [, transformFn, transformFnValue] = matches;
    return getRotationInDegrees(transformFn, transformFnValue);
  }

  /**
   * Interpolate rotation along the z axis from a given value to a transform function
   * @param {String} transformFunction CSS transformation function
   * @param {String} transformFnValue value applied to a transform function (contains a unit)
   * @returns {Number}
   */
  function getRotationInDegrees(transformFunction, transformFnValue) {
    switch (transformFunction) {
      case 'rotate':
      case 'rotateZ':
        return getAngleInDegrees(transformFnValue);
      case 'rotate3d':
        const [, , z, angleWithUnit] = transformFnValue
          .split(',')
          .map(value => value.trim());
        if (parseInt(z) === 0) {
          // no transform is applied along z axis -> ignore
          return;
        }
        return getAngleInDegrees(angleWithUnit);
      case 'matrix':
      case 'matrix3d':
        return getAngleInDegreesFromMatrixTransform(transformFnValue);
      default:
        return 0;
    }
  }

  /**
   * Get angle in degrees from a transform value by interpolating the unit of measure
   * @param {String} angleWithUnit value applied to a transform function (Eg: 1turn)
   * @returns{Number|undefined}
   */
  function getAngleInDegrees(angleWithUnit) {
    const [unit] = angleWithUnit.match(/(deg|grad|rad|turn)/) || [];
    if (!unit) {
      return 0;
    }

    const angle = parseFloat(angleWithUnit.replace(unit, ``));
    switch (unit) {
      case 'rad':
        return convertRadToDeg(angle);
      case 'grad':
        return convertGradToDeg(angle);
      case 'turn':
        return convertTurnToDeg(angle);
      case 'deg':
      default:
        return parseInt(angle);
    }
  }

  /**
   * Get angle in degrees from a transform value applied to `matrix` or `matrix3d` transform functions
   * @param {String} transformFnValue value applied to a transform function (contains a unit)
   * @returns {Number}
   */
  function getAngleInDegreesFromMatrixTransform(transformFnValue) {
    const values = transformFnValue.split(',');

    /**
     * Matrix 2D
     * Notes: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
     */
    if (values.length <= 6) {
      const [a, b] = values;
      const radians = Math.atan2(parseFloat(b), parseFloat(a));
      return convertRadToDeg(radians);
    }

    /**
     * Matrix 3D
     * Notes: https://drafts.csswg.org/css-transforms-2/#decomposing-a-3d-matrix
     */
    const sinB = parseFloat(values[8]);
    const b = Math.asin(sinB);
    const cosB = Math.cos(b);
    const rotateZRadians = Math.acos(parseFloat(values[0]) / cosB);
    return convertRadToDeg(rotateZRadians);
  }

  /**
   * Convert angle specified in unit radians to degrees
   * See - https://drafts.csswg.org/css-values-3/#rad
   * @param {Number} radians radians
   * @return {Number}
   */
  function convertRadToDeg(radians) {
    return Math.round(radians * (180 / Math.PI));
  }

  /**
   * Convert angle specified in unit grad to degrees
   * See - https://drafts.csswg.org/css-values-3/#grad
   * @param {Number} grad grad
   * @return {Number}
   */
  function convertGradToDeg(grad) {
    grad = grad % 400;
    if (grad < 0) {
      grad += 400;
    }
    return Math.round((grad / 400) * 360);
  }

  /**
   * Convert angle specifed in unit turn to degrees
   * See - https://drafts.csswg.org/css-values-3/#turn
   * @param {Number} turn
   * @returns {Number}
   */
  function convertTurnToDeg(turn) {
    return Math.round(360 / (1 / turn));
  }
}

function metaViewportScaleEvaluate(node, options, virtualNode) {
  const { scaleMinimum = 2, lowerBound = false } = options || {};

  const content = virtualNode.attr('content') || '';
  if (!content) {
    return true;
  }

  const result = content.split(/[;,]/).reduce((out, item) => {
    const contentValue = item.trim();
    if (!contentValue) {
      return out;
    }

    const [key, value] = contentValue.split('=');
    if (!key || !value) {
      return out;
    }
    const curatedKey = key.toLowerCase().trim();
    let curatedValue = value.toLowerCase().trim();

    // convert `yes` to `1`
    if (curatedKey === 'maximum-scale' && curatedValue === 'yes') {
      curatedValue = 1;
    }
    // when negative ignore key
    if (curatedKey === 'maximum-scale' && parseFloat(curatedValue) < 0) {
      return out;
    }

    out[curatedKey] = curatedValue;
    return out;
  }, {});

  if (
    lowerBound &&
    result['maximum-scale'] &&
    parseFloat(result['maximum-scale']) < lowerBound
  ) {
    return true;
  }

  if (!lowerBound && result['user-scalable'] === 'no') {
    this.data('user-scalable=no');
    return false;
  }

  const userScalableAsFloat = parseFloat(result['user-scalable']);
  if (
    !lowerBound &&
    result['user-scalable'] &&
    (userScalableAsFloat || userScalableAsFloat === 0) &&
    userScalableAsFloat > -1 &&
    userScalableAsFloat < 1
  ) {
    this.data('user-scalable');
    return false;
  }

  if (
    result['maximum-scale'] &&
    parseFloat(result['maximum-scale']) < scaleMinimum
  ) {
    this.data('maximum-scale');
    return false;
  }

  return true;
}

const roundingMargin = 0.05;

function targetOffsetEvaluate(node, options, vNode) {
  const minOffset = options?.minOffset || 24;
  // Bail early to avoid hitting very expensive calculations.
  // Targets are so large they are unlikely to fail.
  if (chunk012.rectHasMinimumSize(minOffset * 10, vNode.boundingClientRect)) {
    this.data({ messageKey: 'large', minOffset });
    return true;
  }

  const closeNeighbors = [];
  let closestOffset = minOffset;
  for (const vNeighbor of chunk018.findNearbyElms(vNode, minOffset)) {
    if (chunk018.getRoleType(vNeighbor) !== 'widget' || !chunk018.isFocusable(vNeighbor)) {
      continue;
    }
    // the offset code works off radius but we want our messaging to reflect diameter
    let offset = null;
    try {
      offset = chunk018.getOffset(vNode, vNeighbor, minOffset / 2);
    } catch (err) {
      if (err.message.startsWith('splitRects')) {
        this.data({
          messageKey: 'tooManyRects',
          closestOffset: 0,
          minOffset
        });
        return undefined;
      }

      throw err;
    }

    if (offset === null) {
      continue;
    }

    offset = roundToSingleDecimal(offset) * 2;
    if (offset + roundingMargin >= minOffset) {
      continue;
    }
    closestOffset = Math.min(closestOffset, offset);
    closeNeighbors.push(vNeighbor);
  }

  if (closeNeighbors.length === 0) {
    this.data({ closestOffset, minOffset });
    return true;
  }

  this.relatedNodes(closeNeighbors.map(({ actualNode }) => actualNode));

  if (!closeNeighbors.some(chunk018.isInTabOrder)) {
    this.data({
      messageKey: 'nonTabbableNeighbor',
      closestOffset,
      minOffset
    });
    return undefined;
  }

  this.data({ closestOffset, minOffset });
  return chunk018.isInTabOrder(vNode) ? false : undefined;
}

function roundToSingleDecimal(num) {
  return Math.round(num * 10) / 10;
}

/**
 * Determine if an element has a minimum size, taking into account
 * any elements that may obscure it.
 */
function targetSizeEvaluate(node, options, vNode) {
  const minSize = options?.minSize || 24;
  const nodeRect = vNode.boundingClientRect;
  // Bail early to avoid hitting very expensive calculations.
  // Targets are so large they are unlikely to fail.
  if (chunk012.rectHasMinimumSize(minSize * 10, nodeRect)) {
    this.data({ messageKey: 'large', minSize });
    return true;
  }

  const hasMinimumSize = chunk012.rectHasMinimumSize.bind(null, minSize);
  const nearbyElms = chunk018.findNearbyElms(vNode);
  const overflowingContent = filterOverflowingContent(vNode, nearbyElms);
  const { fullyObscuringElms, partialObscuringElms } = filterByElmsOverlap(
    vNode,
    nearbyElms
  );

  // Target has overflowing content;
  //   and is either not fully obscured (so may not pass),
  //   or has insufficient space (and so may not fail)
  if (
    overflowingContent.length &&
    (fullyObscuringElms.length || !hasMinimumSize(nodeRect))
  ) {
    this.data({ minSize, messageKey: 'contentOverflow' });
    this.relatedNodes(mapActualNodes(overflowingContent));
    return undefined;
  }

  // Target is fully obscured and no overflowing content (which may not be obscured)
  if (fullyObscuringElms.length) {
    this.relatedNodes(mapActualNodes(fullyObscuringElms));
    this.data({ messageKey: 'obscured' });
    return true;
  }

  // Check cannot fail if the target is not in the tab order
  const negativeOutcome = chunk018.isInTabOrder(vNode) ? false : undefined;

  // Target is too small, and has no overflowing content that increases the size
  if (!hasMinimumSize(nodeRect)) {
    this.data({ minSize, ...toDecimalSize(nodeRect) });
    return negativeOutcome;
  }

  // Figure out the largest space on the target, not obscured by other widgets
  const obscuredWidgets = filterFocusableWidgets(partialObscuringElms);

  // Target not obscured and has sufficient space
  if (!obscuredWidgets.length) {
    this.data({ minSize, ...toDecimalSize(nodeRect) });
    return true;
  }

  const largestInnerRect = getLargestUnobscuredArea(
    vNode,
    obscuredWidgets,
    minSize
  );
  if (!largestInnerRect) {
    this.data({ minSize, messageKey: 'tooManyRects' });
    return undefined;
  }

  // Target is obscured, and insufficient space is left
  if (!hasMinimumSize(largestInnerRect)) {
    if (overflowingContent.length) {
      this.data({ minSize, messageKey: 'contentOverflow' });
      this.relatedNodes(mapActualNodes(overflowingContent));
      return undefined;
    }

    const allTabbable = obscuredWidgets.every(chunk018.isInTabOrder);
    const messageKey = `partiallyObscured${allTabbable ? '' : 'NonTabbable'}`;

    this.data({ messageKey, minSize, ...toDecimalSize(largestInnerRect) });
    this.relatedNodes(mapActualNodes(obscuredWidgets));
    return allTabbable ? negativeOutcome : undefined;
  }

  // Target has sufficient space
  this.data({ minSize, ...toDecimalSize(largestInnerRect || nodeRect) });
  this.relatedNodes(mapActualNodes(obscuredWidgets));
  return true;
}

// Filter nearby elements based on if they are overflowing content of vNode
// Except if the overflowing content is a descendant in the tab order
function filterOverflowingContent(vNode, nearbyElms) {
  return nearbyElms.filter(
    nearbyElm =>
      !isEnclosedRect(nearbyElm, vNode) &&
      isDescendantNotInTabOrder(vNode, nearbyElm)
  );
}

// Return fully and partially obscuring nodes from nearby nodes
function filterByElmsOverlap(vNode, nearbyElms) {
  const fullyObscuringElms = [];
  const partialObscuringElms = [];
  for (const vNeighbor of nearbyElms) {
    // Determine if the element is obscured
    if (
      !isDescendantNotInTabOrder(vNode, vNeighbor) &&
      chunk018.hasVisualOverlap(vNode, vNeighbor) &&
      getCssPointerEvents(vNeighbor) !== 'none'
    ) {
      // Group by fully or partially obscured
      if (isEnclosedRect(vNode, vNeighbor)) {
        fullyObscuringElms.push(vNeighbor);
      } else {
        partialObscuringElms.push(vNeighbor);
      }
    }
  }
  return { fullyObscuringElms, partialObscuringElms };
}

// Find areas of the target that are not obscured
function getLargestUnobscuredArea(vNode, obscuredNodes, minSize) {
  const nodeRect = vNode.boundingClientRect;
  const obscuringRects = obscuredNodes
    .map(obscuredNode => {
      const display = obscuredNode.getComputedStylePropertyValue('display');
      return display === 'inline'
        ? obscuredNode.clientRects
        : obscuredNode.boundingClientRect;
    })
    .flat(Infinity);
  let unobscuredRects;
  try {
    unobscuredRects = chunk012.splitRects(nodeRect, obscuringRects);
  } catch {
    return null;
  }

  // Of the unobscured inner rects, work out the largest
  return getLargestRect(unobscuredRects, minSize);
}

// Find the largest rectangle in the array, prioritize ones that meet a minimum size
function getLargestRect(rects, minSize) {
  return rects.reduce((rectA, rectB) => {
    const rectAisMinimum = chunk012.rectHasMinimumSize(minSize, rectA);
    const rectBisMinimum = chunk012.rectHasMinimumSize(minSize, rectB);
    // Prioritize rects that pass the minimum
    if (rectAisMinimum !== rectBisMinimum) {
      return rectAisMinimum ? rectA : rectB;
    }
    const areaA = rectA.width * rectA.height;
    const areaB = rectB.width * rectB.height;
    return areaA > areaB ? rectA : rectB;
  });
}

// Filter only focusable widgets
function filterFocusableWidgets(vNodes) {
  return vNodes.filter(
    vNode => chunk018.getRoleType(vNode) === 'widget' && chunk018.isFocusable(vNode)
  );
}

function isEnclosedRect(vNodeA, vNodeB) {
  const rectA = vNodeA.boundingClientRect;
  const rectB = vNodeB.boundingClientRect;
  return (
    rectA.top >= rectB.top &&
    rectA.left >= rectB.left &&
    rectA.bottom <= rectB.bottom &&
    rectA.right <= rectB.right
  );
}

function getCssPointerEvents(vNode) {
  return vNode.getComputedStylePropertyValue('pointer-events');
}

function toDecimalSize(rect) {
  return {
    width: Math.round(rect.width * 10) / 10,
    height: Math.round(rect.height * 10) / 10
  };
}

function isDescendantNotInTabOrder(vAncestor, vNode) {
  return chunk011.contains(vAncestor, vNode) && !chunk018.isInTabOrder(vNode);
}

function mapActualNodes(vNodes) {
  return vNodes.map(({ actualNode }) => actualNode);
}

function headingOrderAfter(results) {
  // Construct a map of all headings on the page
  const headingOrder = getHeadingOrder(results);
  results.forEach(result => {
    result.result = getHeadingOrderOutcome(result, headingOrder);
  });
  return results;
}

/**
 * Determine check outcome, based on the position of the result in the headingOrder
 */
function getHeadingOrderOutcome(result, headingOrder) {
  const index = findHeadingOrderIndex(headingOrder, result.node.ancestry);
  const currLevel = headingOrder[index]?.level ?? -1;
  const prevLevel = headingOrder[index - 1]?.level ?? -1;

  // First heading always passes
  if (index === 0) {
    return true;
  }
  // Heading not in the map
  if (currLevel === -1) {
    return undefined;
  }
  // Check if a heading is skipped
  return currLevel - prevLevel <= 1;
}

/**
 * Generate a flattened heading order map, from the data property
 * of heading-order results
 */
function getHeadingOrder(results) {
  // Ensure parent frames are handled first
  results = [...results];
  results.sort(({ node: nodeA }, { node: nodeB }) => {
    return nodeA.ancestry.length - nodeB.ancestry.length;
  });
  // push or splice result.data into headingOrder
  const headingOrder = results.reduce(mergeHeadingOrder, []);
  // Remove all frame placeholders
  return headingOrder.filter(({ level }) => level !== -1);
}

/**
 * Add the data of a heading-order result to the headingOrder map
 */
function mergeHeadingOrder(mergedHeadingOrder, result) {
  const frameHeadingOrder = result.data?.headingOrder;
  const frameAncestry = shortenArray(result.node.ancestry, 1);

  // Only the first result in each frame has a headingOrder. Ignore the rest
  if (!frameHeadingOrder) {
    return mergedHeadingOrder;
  }

  // Prepend node ancestry to each heading.ancestry
  const normalizedHeadingOrder = frameHeadingOrder.map(heading => {
    return addFrameToHeadingAncestry(heading, frameAncestry);
  });

  // Find if the result is from a frame previously processed
  const index = getFrameIndex(mergedHeadingOrder, frameAncestry);
  // heading is not in a frame, stick 'm in at the end.
  if (index === -1) {
    mergedHeadingOrder.push(...normalizedHeadingOrder);
  } else {
    mergedHeadingOrder.splice(index, 0, ...normalizedHeadingOrder);
  }
  return mergedHeadingOrder;
}

/**
 * Determine where the iframe results fit into the top-level heading order
 *
 * If a frame has no headings, but it does have iframes we might not have a result.
 * We can account for this by finding the closest ancestor we do know about.
 */
function getFrameIndex(headingOrder, frameAncestry) {
  while (frameAncestry.length) {
    const index = findHeadingOrderIndex(headingOrder, frameAncestry);
    if (index !== -1) {
      return index;
    }
    frameAncestry = shortenArray(frameAncestry, 1);
  }
  return -1;
}

/**
 * Find the index of a heading in the headingOrder by matching ancestries
 */
function findHeadingOrderIndex(headingOrder, ancestry) {
  return headingOrder.findIndex(heading => {
    return chunk013.matchAncestry(heading.ancestry, ancestry);
  });
}

/**
 * Prepend the frame ancestry of a node to heading.ancestry
 */
function addFrameToHeadingAncestry(heading, frameAncestry) {
  const ancestry = frameAncestry.concat(heading.ancestry);
  return { ...heading, ancestry };
}

/**
 * Shorten an array by some number of items
 */
function shortenArray(arr, spliceLength) {
  return arr.slice(0, arr.length - spliceLength);
}

function getLevel(vNode) {
  const role = chunk018.getRole(vNode);
  const headingRole = role && role.includes('heading');
  const ariaHeadingLevel = vNode.attr('aria-level');
  const ariaLevel = parseInt(ariaHeadingLevel, 10);

  const [, headingLevel] = vNode.props.nodeName.match(/h(\d)/) || [];

  if (!headingRole) {
    return -1;
  }

  if (headingLevel && !ariaHeadingLevel) {
    return parseInt(headingLevel, 10);
  }

  /*
   * default aria-level for a role=heading is 2 if it is
   * not set or set to an incorrect value.
   * default aria-level for a heading element is the
   * heading level.
   * note that NVDA and VO allow any positive level
   * @see https://www.w3.org/TR/wai-aria-1.1/#heading
   * @see https://codepen.io/straker/pen/jOBjNNe
   */
  if (isNaN(ariaLevel) || ariaLevel < 1) {
    if (headingLevel) {
      return parseInt(headingLevel, 10);
    }
    return 2;
  }

  if (ariaLevel) {
    return ariaLevel;
  }

  return -1;
}

function headingOrderEvaluate() {
  let headingOrder = chunk007.cache.get('headingOrder');
  if (headingOrder) {
    return true;
  }

  // find all headings, even ones that are outside the current
  // context. also need to know where iframes are so we can insert
  // the results of any in-context iframes into their proper order
  // @see https://github.com/dequelabs/axe-core/issues/728
  const selector = 'h1, h2, h3, h4, h5, h6, [role=heading], iframe, frame';
  // TODO: es-modules_tree
  const vNodes = chunk014.querySelectorAllFilter(
    chunk007.axe._tree[0],
    selector,
    chunk018.isVisibleToScreenReaders
  );

  headingOrder = vNodes.map(vNode => {
    // save the path so we can reconstruct the heading order
    return {
      ancestry: [chunk007.getAncestry(vNode.actualNode)],
      level: getLevel(vNode)
    };
  });
  this.data({ headingOrder });
  chunk007.cache.set('headingOrder', vNodes);
  return true;
}

/**
 * Check if two given objects are the same (Note: this fn is not extensive in terms of depth equality)
 * @param {Object} a object a, to compare
 * @param {*} b object b, to compare
 * @returns {Boolean}
 */
function isIdenticalObject(a, b) {
  if (!a || !b) {
    return false;
  }

  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  const result = aProps.every(propName => {
    const aValue = a[propName];
    const bValue = b[propName];

    if (typeof aValue !== typeof bValue) {
      return false;
    }

    if (typeof aValue === `object` || typeof bValue === `object`) {
      return isIdenticalObject(aValue, bValue);
    }

    return aValue === bValue;
  });

  return result;
}

function identicalLinksSamePurposeAfter(results) {
  /**
   * Skip, as no results to curate
   */
  if (results.length < 2) {
    return results;
  }

  /**
   * Filter results for which `result` is undefined & thus `data`, `relatedNodes` are undefined
   */
  const incompleteResults = results.filter(
    ({ result }) => result !== undefined
  );

  /**
   * for each result
   * - get other results with matching accessible name
   * - check if same purpose is served
   * - if not change `result` to `undefined`
   * - construct a list of unique results with relatedNodes to return
   */
  const uniqueResults = [];
  const nameMap = {};

  for (let index = 0; index < incompleteResults.length; index++) {
    const currentResult = incompleteResults[index];

    const { name, urlProps } = currentResult.data;
    /**
     * This is to avoid duplications in the `nodeMap`
     */
    if (nameMap[name]) {
      continue;
    }

    const sameNameResults = incompleteResults.filter(
      ({ data }, resultNum) => data.name === name && resultNum !== index
    );
    const isSameUrl = sameNameResults.every(({ data }) =>
      isIdenticalObject(data.urlProps, urlProps)
    );

    /**
     * when identical nodes exists but do not resolve to same url, flag result as `incomplete`
     */
    if (sameNameResults.length && !isSameUrl) {
      currentResult.result = undefined;
    }

    /**
     *  -> deduplicate results (for both `pass` or `incomplete`) and add `relatedNodes` if any
     */
    currentResult.relatedNodes = [];
    currentResult.relatedNodes.push(
      ...sameNameResults.map(node => node.relatedNodes[0])
    );

    /**
     * Update `nodeMap` with `sameNameResults`
     */
    nameMap[name] = sameNameResults;

    uniqueResults.push(currentResult);
  }

  return uniqueResults;
}

const disabledNodeNames = ['fieldset', 'button', 'select', 'input', 'textarea'];

/**
 * Determines if an element disabled, or part of a disabled element
 *
 * IMPORANT: This method is fairly loose. There are significant differences in browsers of when
 * they'll announce a thing disabled. This tells us if any accessibility supported browser
 * identifies an element as disabled, but not if all of them do.
 *
 * @method isDisabled
 * @memberof axe.commons.forms
 * @param {VirtualNode} virtualNode
 * @return {boolean} whether or not the element is disabled in some way
 */
function isDisabled(virtualNode) {
  let disabledState = virtualNode._isDisabled;
  if (typeof disabledState === 'boolean') {
    return disabledState; // From cache
  }

  const { nodeName } = virtualNode.props;
  const ariaDisabled = virtualNode.attr('aria-disabled');
  if (disabledNodeNames.includes(nodeName) && virtualNode.hasAttr('disabled')) {
    disabledState = true; // Native
  } else if (ariaDisabled) {
    // ARIA
    disabledState = ariaDisabled.toLowerCase() === 'true';
  } else if (virtualNode.parent) {
    // Inherited
    disabledState = isDisabled(virtualNode.parent);
  } else {
    // Default
    disabledState = false;
  }

  virtualNode._isDisabled = disabledState;
  return disabledState;
}

/**
 * Namespace for forms-related utilities.
 * @namespace commons.forms
 * @memberof axe
 */

const forms = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  isAriaCombobox: chunk018.isAriaCombobox,
  isAriaListbox: chunk018.isAriaListbox,
  isAriaRange: chunk018.isAriaRange,
  isAriaTextbox: chunk018.isAriaTextbox,
  isDisabled,
  isNativeSelect: chunk018.isNativeSelect,
  isNativeTextbox: chunk018.isNativeTextbox
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * Returns all cells contained in given HTMLTableElement
 * @method getAllCells
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableElement} tableElm Table Element to get cells from
 * @return {Array<HTMLTableCellElement>}
 */
function getAllCells(tableElm) {
  let rowIndex, cellIndex, rowLength, cellLength;
  const cells = [];
  for (
    rowIndex = 0, rowLength = tableElm.rows.length;
    rowIndex < rowLength;
    rowIndex++
  ) {
    for (
      cellIndex = 0, cellLength = tableElm.rows[rowIndex].cells.length;
      cellIndex < cellLength;
      cellIndex++
    ) {
      cells.push(tableElm.rows[rowIndex].cells[cellIndex]);
    }
  }
  return cells;
}

/**
 * Loop through the table grid looking for headers and caching the result.
 * @param {String} headerType The type of header to look for ("row" or "col")
 * @param {Object} position The position of the cell to start looking
 * @param {Array} tablegrid A matrix of the table obtained using axe.commons.table.toGrid
 * @return {Array<HTMLTableCellElement>} Array of HTMLTableCellElements that are headers
 */
function traverseForHeaders(headerType, position, tableGrid) {
  const property = headerType === 'row' ? '_rowHeaders' : '_colHeaders';
  const predicate = headerType === 'row' ? chunk018.isRowHeader : chunk018.isColumnHeader;
  const startCell = tableGrid[position.y][position.x];

  // adjust position by rowspan and colspan
  // subtract 1 from col/rowspan to make them 0 indexed
  const colspan = startCell.colSpan - 1;

  // ie11 returns 1 as the rowspan value even if it's set to 0
  const rowspanAttr = startCell.getAttribute('rowspan');
  const rowspanValue =
    parseInt(rowspanAttr) === 0 || startCell.rowspan === 0
      ? tableGrid.length
      : startCell.rowSpan;
  const rowspan = rowspanValue - 1;

  const rowStart = position.y + rowspan;
  const colStart = position.x + colspan;

  const rowEnd = headerType === 'row' ? position.y : 0;
  const colEnd = headerType === 'row' ? 0 : position.x;

  let headers;
  const cells = [];
  for (let row = rowStart; row >= rowEnd && !headers; row--) {
    for (let col = colStart; col >= colEnd; col--) {
      const cell = tableGrid[row] ? tableGrid[row][col] : undefined;

      if (!cell) {
        continue;
      }

      // stop traversing once we've found a cache
      const vNode = chunk007.axe.utils.getNodeFromTree(cell);
      if (vNode[property]) {
        headers = vNode[property];
        break;
      }

      cells.push(cell);
    }
  }

  // need to check that the cells we've traversed are headers
  headers = (headers || []).concat(cells.filter(predicate));

  // cache results
  cells.forEach(tableCell => {
    const vNode = chunk007.axe.utils.getNodeFromTree(tableCell);
    vNode[property] = headers;
  });

  return headers;
}

/**
 * Get any associated table headers for a `HTMLTableCellElement`
 * @method getHeaders
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The cell of which to get headers
 * @param {Array} [tablegrid] A matrix of the table obtained using axe.commons.table.toGrid
 * @return {Array<HTMLTableCellElement>} Array of headers associated to the table cell
 */
function getHeaders(cell, tableGrid) {
  if (cell.getAttribute('headers')) {
    const headers = chunk018.idrefs(cell, 'headers');

    // testing has shown that if the headers attribute is incorrect the browser
    // will default to the table row/column headers
    if (headers.filter(header => header).length) {
      return headers;
    }
  }
  if (!tableGrid) {
    tableGrid = chunk018.toArray(chunk018.findUp(cell, 'table'));
  }
  const position = chunk018.getCellPosition(cell, tableGrid);

  // TODO: RTL text
  const rowHeaders = traverseForHeaders('row', position, tableGrid);
  const colHeaders = traverseForHeaders('col', position, tableGrid);

  return [].concat(rowHeaders, colHeaders).reverse();
}

/**
 * Determine if a `HTMLTableCellElement` is a data cell
 * @method isDataCell
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} node The table cell to test
 * @return {Boolean}
 */
function isDataCell(cell) {
  // @see http://www.whatwg.org/specs/web-apps/current-work/multipage/tables.html#empty-cell
  if (!cell.children.length && !cell.textContent.trim()) {
    return false;
  }
  const role = chunk018.getExplicitRole(cell);
  if (role) {
    return ['cell', 'gridcell'].includes(role);
  } else {
    return cell.nodeName.toUpperCase() === 'TD';
  }
}

/**
 * Determines whether a table is a data table
 * @method isDataTable
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableElement} node The table to test
 * @return {Boolean}
 * @see http://asurkov.blogspot.co.uk/2011/10/data-vs-layout-table.html
 */
function isDataTable(node) {
  const role = chunk018.getExplicitRole(node);

  // The element is not focusable and has role=presentation
  if ((role === 'presentation' || role === 'none') && !chunk018.isFocusable(node)) {
    return false;
  }

  // Table inside editable area is data table always since the table structure is crucial for table editing
  if (
    node.getAttribute('contenteditable') === 'true' ||
    chunk018.findUp(node, '[contenteditable="true"]')
  ) {
    return true;
  }

  // Table having ARIA table related role is data table
  if (role === 'grid' || role === 'treegrid' || role === 'table') {
    return true;
  }

  // Table having ARIA landmark role is data table
  if (chunk018.getRoleType(role) === 'landmark') {
    return true;
  }

  // Table having datatable="0" attribute is layout table
  if (node.getAttribute('datatable') === '0') {
    return false;
  }

  // Table having summary attribute is data table
  if (node.getAttribute('summary')) {
    return true;
  }

  // Table having legitimate data table structures is data table
  if (node.tHead || node.tFoot || node.caption) {
    return true;
  }
  // colgroup / col - colgroup is magically generated
  for (
    let childIndex = 0, childLength = node.children.length;
    childIndex < childLength;
    childIndex++
  ) {
    if (node.children[childIndex].nodeName.toUpperCase() === 'COLGROUP') {
      return true;
    }
  }

  let cells = 0;
  const rowLength = node.rows.length;
  let row, cell;
  let hasBorder = false;
  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    row = node.rows[rowIndex];
    for (
      let cellIndex = 0, cellLength = row.cells.length;
      cellIndex < cellLength;
      cellIndex++
    ) {
      cell = row.cells[cellIndex];
      if (cell.nodeName.toUpperCase() === 'TH') {
        return true;
      }
      if (
        !hasBorder &&
        (cell.offsetWidth !== cell.clientWidth ||
          cell.offsetHeight !== cell.clientHeight)
      ) {
        hasBorder = true;
      }
      if (
        cell.getAttribute('scope') ||
        cell.getAttribute('headers') ||
        cell.getAttribute('abbr')
      ) {
        return true;
      }
      if (['columnheader', 'rowheader'].includes(chunk018.getExplicitRole(cell))) {
        return true;
      }
      // abbr element as a single child element of table cell
      if (
        cell.children.length === 1 &&
        cell.children[0].nodeName.toUpperCase() === 'ABBR'
      ) {
        return true;
      }
      cells++;
    }
  }

  // Table having nested table is layout table
  if (node.getElementsByTagName('table').length) {
    return false;
  }

  // Table having only one row or column is layout table (row)
  if (rowLength < 2) {
    return false;
  }

  // Table having only one row or column is layout table (column)
  const sampleRow = node.rows[Math.ceil(rowLength / 2)];
  if (sampleRow.cells.length === 1 && sampleRow.cells[0].colSpan === 1) {
    return false;
  }

  // Table having many columns (>= 5) is data table
  if (sampleRow.cells.length >= 5) {
    return true;
  }

  // Table having borders around cells is data table
  if (hasBorder) {
    return true;
  }

  // Table having differently colored rows is data table
  let bgColor, bgImage;
  for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
    row = node.rows[rowIndex];
    if (
      bgColor &&
      bgColor !==
        window.getComputedStyle(row).getPropertyValue('background-color')
    ) {
      return true;
    } else {
      bgColor = window
        .getComputedStyle(row)
        .getPropertyValue('background-color');
    }
    if (
      bgImage &&
      bgImage !==
        window.getComputedStyle(row).getPropertyValue('background-image')
    ) {
      return true;
    } else {
      bgImage = window
        .getComputedStyle(row)
        .getPropertyValue('background-image');
    }
  }

  // Table having many rows (>= 20) is data table
  if (rowLength >= 20) {
    return true;
  }

  // Wide table (more than 95% of the document width) is layout table
  if (
    chunk012.getElementCoordinates(node).width >
    chunk012.getViewportSize(window).width * 0.95
  ) {
    return false;
  }

  // Table having small amount of cells (<= 10) is layout table
  if (cells < 10) {
    return false;
  }

  // Table containing embed, object, applet of iframe elements (typical advertisements elements) is layout table
  if (node.querySelector('object, embed, iframe, applet')) {
    return false;
  }

  // Otherwise it's data table
  return true;
}

/**
 * Determine if a `HTMLTableCellElement` is a header
 * @method isHeader
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The table cell to test
 * @return {Boolean}
 */
function isHeader(cell) {
  if (chunk018.isColumnHeader(cell) || chunk018.isRowHeader(cell)) {
    return true;
  }

  if (cell.getAttribute('id')) {
    const id = chunk007.escapeSelector(cell.getAttribute('id'));
    return !!document.querySelector(`[headers~="${id}"]`);
  }

  return false;
}

function traverseTable(dir, position, tableGrid, callback) {
  let result;
  const cell = tableGrid[position.y]
    ? tableGrid[position.y][position.x]
    : undefined;
  if (!cell) {
    return [];
  }
  if (typeof callback === 'function') {
    result = callback(cell, position, tableGrid);
    if (result === true) {
      // abort
      return [cell];
    }
  }

  result = traverseTable(
    dir,
    {
      x: position.x + dir.x,
      y: position.y + dir.y
    },
    tableGrid,
    callback
  );
  result.unshift(cell);
  return result;
}

/**
 * Traverses a table in a given direction, passing the cell to the callback
 * @method traverse
 * @memberof axe.commons.table
 * @instance
 * @param  {Object|String} dir Direction that will be added recursively {x: 1, y: 0}, 'left';
 * @param  {Object}   startPos    x/y coordinate: {x: 0, y: 0};
 * @param  {Array}    [tablegrid]  A matrix of the table obtained using axe.commons.table.toArray (OPTIONAL)
 * @param  {Function} callback Function to which each cell will be passed
 * @return {NodeElement}       If the callback returns true, the traversal will end and the cell will be returned
 */
function traverse(dir, startPos, tableGrid, callback) {
  if (Array.isArray(startPos)) {
    callback = tableGrid;
    tableGrid = startPos;
    startPos = { x: 0, y: 0 };
  }

  if (typeof dir === 'string') {
    switch (dir) {
      case 'left':
        dir = { x: -1, y: 0 };
        break;
      case 'up':
        dir = { x: 0, y: -1 };
        break;
      case 'right':
        dir = { x: 1, y: 0 };
        break;
      case 'down':
        dir = { x: 0, y: 1 };
        break;
    }
  }

  return traverseTable(
    dir,
    {
      x: startPos.x + dir.x,
      y: startPos.y + dir.y
    },
    tableGrid,
    callback
  );
}

/**
 * Namespace for table-related utilities.
 * @namespace table
 * @memberof axe.commons
 */

const table = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getAllCells,
  getCellPosition: chunk018.getCellPosition,
  getHeaders,
  getScope: chunk018.getScope,
  isColumnHeader: chunk018.isColumnHeader,
  isDataCell,
  isDataTable,
  isHeader,
  isRowHeader: chunk018.isRowHeader,
  toArray: chunk018.toArray,
  toGrid: chunk018.toArray,
  traverse
}, Symbol.toStringTag, { value: 'Module' }));

/* global commons */
/*eslint no-unused-vars: 0*/

const commons = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  aria: chunk021.aria,
  color: chunk022.color,
  dom: chunk018.dom,
  forms,
  matches: chunk018.matches,
  math: chunk018.math,
  standards: chunk021.standards,
  table,
  text: chunk018.text,
  utils: chunk018.utils
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * Note: `identical-links-same-purpose-after` fn, helps reconcile the results
 */
function identicalLinksSamePurposeEvaluate(node, options, virtualNode) {
  const accText = chunk018.accessibleTextVirtual(virtualNode);
  const name = chunk012.sanitize(
      chunk012.removeUnicode(accText, {
        emoji: true,
        nonBmp: true,
        punctuations: true
      })
    )
    .toLowerCase();

  if (!name) {
    return undefined;
  }

  /**
   * Set `data` and `relatedNodes` for use in `after` fn
   */
  const afterData = {
    name,
    urlProps: chunk013.urlPropsFromAttribute(node, 'href')
  };
  this.data(afterData);
  this.relatedNodes([node]);

  return true;
}

function internalLinkPresentEvaluate(node, options, virtualNode) {
  const links = chunk014.querySelectorAll(virtualNode, 'a[href]');
  return links.some(vLink => {
    return /^#[^/!]/.test(vLink.attr('href'));
  });
}

const separatorRegex = /[;,\s]/;
const validRedirectNumRegex = /^[0-9.]+$/;

function metaRefreshEvaluate(node, options, virtualNode) {
  const { minDelay, maxDelay } = options || {};
  const content = (virtualNode.attr('content') || '').trim();
  const [redirectStr] = content.split(separatorRegex);
  if (!redirectStr.match(validRedirectNumRegex)) {
    return true;
  }

  const redirectDelay = parseFloat(redirectStr);
  this.data({ redirectDelay });
  if (typeof minDelay === 'number' && redirectDelay <= options.minDelay) {
    return true;
  }
  if (typeof maxDelay === 'number' && redirectDelay > options.maxDelay) {
    return true;
  }
  return false;
}

function normalizeFontWeight(weight) {
  switch (weight) {
    case 'lighter':
      return 100;
    case 'normal':
      return 400;
    case 'bold':
      return 700;
    case 'bolder':
      return 900;
  }
  weight = parseInt(weight);
  return !isNaN(weight) ? weight : 400;
}

function getTextContainer(elm) {
  let nextNode = elm;
  const outerText = elm.textContent.trim();
  let innerText = outerText;

  while (innerText === outerText && nextNode !== undefined) {
    let i = -1;
    elm = nextNode;
    if (elm.children.length === 0) {
      return elm;
    }

    do {
      // find the first non-empty child
      i++;
      innerText = elm.children[i].textContent.trim();
    } while (innerText === '' && i + 1 < elm.children.length);
    nextNode = elm.children[i];
  }

  return elm;
}

function getStyleValues(node) {
  const style = window.getComputedStyle(getTextContainer(node));
  return {
    fontWeight: normalizeFontWeight(style.getPropertyValue('font-weight')),
    fontSize: parseInt(style.getPropertyValue('font-size')),
    isItalic: style.getPropertyValue('font-style') === 'italic'
  };
}

function isHeaderStyle(styleA, styleB, margins) {
  return margins.reduce((out, margin) => {
    return (
      out ||
      ((!margin.size || styleA.fontSize / margin.size > styleB.fontSize) &&
        (!margin.weight ||
          styleA.fontWeight - margin.weight > styleB.fontWeight) &&
        (!margin.italic || (styleA.isItalic && !styleB.isItalic)))
    );
  }, false);
}

function pAsHeadingEvaluate(node, options, virtualNode) {
  const siblings = Array.from(node.parentNode.children);
  const currentIndex = siblings.indexOf(node);

  options = options || {};
  const margins = options.margins || [];

  const nextSibling = siblings
    .slice(currentIndex + 1)
    .find(elm => elm.nodeName.toUpperCase() === 'P');

  const prevSibling = siblings
    .slice(0, currentIndex)
    .reverse()
    .find(elm => elm.nodeName.toUpperCase() === 'P');

  const currStyle = getStyleValues(node);
  const nextStyle = nextSibling ? getStyleValues(nextSibling) : null;
  const prevStyle = prevSibling ? getStyleValues(prevSibling) : null;

  const optionsPassLength = options.passLength;
  const optionsFailLength = options.failLength;

  const headingLength = node.textContent.trim().length;
  const paragraphLength = nextSibling?.textContent.trim().length;

  if (headingLength > paragraphLength * optionsPassLength) {
    return true;
  }

  if (!nextStyle || !isHeaderStyle(currStyle, nextStyle, margins)) {
    return true;
  }

  const blockquote = chunk018.findUpVirtual(virtualNode, 'blockquote');
  if (blockquote && blockquote.nodeName.toUpperCase() === 'BLOCKQUOTE') {
    return undefined;
  }

  if (prevStyle && !isHeaderStyle(currStyle, prevStyle, margins)) {
    return undefined;
  }

  if (headingLength > paragraphLength * optionsFailLength) {
    return undefined;
  }
  return false;
}

exports.commons = commons;
exports.cssOrientationLockEvaluate = cssOrientationLockEvaluate;
exports.getAllCells = getAllCells;
exports.getHeaders = getHeaders;
exports.headingOrderAfter = headingOrderAfter;
exports.headingOrderEvaluate = headingOrderEvaluate;
exports.identicalLinksSamePurposeAfter = identicalLinksSamePurposeAfter;
exports.identicalLinksSamePurposeEvaluate = identicalLinksSamePurposeEvaluate;
exports.internalLinkPresentEvaluate = internalLinkPresentEvaluate;
exports.isDataCell = isDataCell;
exports.isDataTable = isDataTable;
exports.isDisabled = isDisabled;
exports.metaRefreshEvaluate = metaRefreshEvaluate;
exports.metaViewportScaleEvaluate = metaViewportScaleEvaluate;
exports.noAutoplayAudioEvaluate = noAutoplayAudioEvaluate;
exports.pAsHeadingEvaluate = pAsHeadingEvaluate;
exports.targetOffsetEvaluate = targetOffsetEvaluate;
exports.targetSizeEvaluate = targetSizeEvaluate;
exports.traverse = traverse;
