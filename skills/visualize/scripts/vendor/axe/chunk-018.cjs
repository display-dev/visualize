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
const chunk007 = require('./chunk-007.cjs');
const chunk010 = require('./chunk-010.cjs');
const chunk011 = require('./chunk-011.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');
const chunk015 = require('./chunk-015.cjs');
const chunk016 = require('./chunk-016.cjs');
const chunk017 = require('./chunk-017.cjs');

/**
 * Find elements referenced from a given context
 * @method findElmsInContext
 * @memberof axe.commons.dom
 * @instance
 * @param {Object} element
 * @param {String} element.context Element in the same context
 * @param {String} element.value Attribute value to search for
 * @param {String} element.attr Attribute name to search for
 * @param {String} element.elm NodeName to search for (optional)
 * @return {Array<Node>}
 */
function findElmsInContext({ context, value, attr, elm = '' }) {
  let root;
  const escapedValue = chunk007.escapeSelector(value);

  if (context.nodeType === 9 || context.nodeType === 11) {
    // It's already root
    root = context;
  } else {
    root = chunk012.getRootNode(context);
  }
  return Array.from(
    root.querySelectorAll(elm + '[' + attr + '=' + escapedValue + ']')
  );
}

/**
 * recusively walk up the DOM, checking for a node which matches a selector
 *
 * **WARNING:** this should be used sparingly, as it's not even close to being performant
 * @method findUpVirtual
 * @memberof axe.commons.dom
 * @instance
 * @deprecated use axe.utils.closest
 * @param {VirtualNode} element The starting virtualNode
 * @param {String} target The selector for the HTMLElement
 * @return {HTMLElement|null} Either the matching HTMLElement or `null` if there was no match
 */
function findUpVirtual(element, target) {
  let parent;

  parent = element.actualNode;
  // virtualNode will have a shadowId if the element lives inside a shadow DOM or is
  // slotted into a shadow DOM
  if (!element.shadowId && typeof element.actualNode.closest === 'function') {
    // non-shadow DOM elements
    const match = element.actualNode.closest(target);
    if (match) {
      return match;
    }
    return null;
  }
  // handle shadow DOM elements and older browsers
  do {
    // recursively walk up the DOM, checking each parent node
    parent = parent.assignedSlot ? parent.assignedSlot : parent.parentNode;
    if (parent && parent.nodeType === 11) {
      parent = parent.host;
    }
  } while (
    parent &&
    !chunk010.matchesSelector(parent, target) &&
    parent !== document.documentElement
  );

  if (!parent) {
    return null;
  }

  if (!chunk010.matchesSelector(parent, target)) {
    return null;
  }
  return parent;
}

/**
 * Find the virtual node and call dom.fundUpVirtual
 *
 * **WARNING:** this should be used sparingly, as it's not even close to being performant
 * @method findUp
 * @memberof axe.commons.dom
 * @instance
 * @deprecated use axe.utils.closest
 * @param {HTMLElement} element The starting HTMLElement
 * @param {String} target The selector for the HTMLElement
 * @return {HTMLElement|null} Either the matching HTMLElement or `null` if there was no match
 */
function findUp(element, target) {
  return findUpVirtual(chunk010.getNodeFromTree(element), target);
}

const clipRegex$1 =
  /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/;
const clipPathRegex$1 = /(\w+)\((\d+)/;

/**
 * Determine if an element is natively hidden
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function nativelyHidden(vNode) {
  return ['style', 'script', 'noscript', 'template'].includes(
    vNode.props.nodeName
  );
}

/**
 * Determine if an element is hidden using the display property
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function displayHidden(vNode) {
  // Firefox's user-agent always sets `area` element
  // to `display:none` so we can't rely on it to
  // check for hidden
  if (vNode.props.nodeName === 'area') {
    return false;
  }

  return vNode.getComputedStylePropertyValue('display') === 'none';
}

/**
 * Determine if an element is hidden using the visibility property. Visibility is only applicable for the node itself (and not any ancestors)
 * @param {VirtualNode} vNode
 * @param {Object} [options]
 * @param {Boolean} [options.isAncestor] If this function is being called on an ancestor for the target node
 * @return {Boolean}
 */
function visibilityHidden(vNode, { isAncestor } = {}) {
  // because the parent can be hidden, and the child visible we
  // have to ignore visibility on ancestors. we don't need to look
  // at the parent either, because visibility inherits
  return (
    !isAncestor &&
    ['hidden', 'collapse'].includes(
      vNode.getComputedStylePropertyValue('visibility')
    )
  );
}

/**
 * Determine if an element is hidden using the content-visibility property
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function contentVisibiltyHidden(vNode, { isAncestor } = {}) {
  // content-visibility only applies to descendants
  // and does not hide the node with the property
  return (
    !!isAncestor &&
    vNode.getComputedStylePropertyValue('content-visibility') === 'hidden'
  );
}

/**
 * Determine if an element is hidden using the aria-hidden attribute
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function ariaHidden(vNode) {
  return vNode.attr('aria-hidden') === 'true';
}

/**
 * Determine if an element is hidden by making the opacity 0
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function opacityHidden(vNode) {
  return vNode.getComputedStylePropertyValue('opacity') === '0';
}

/**
 * Determine if an element is hidden by using scroll and dimensions
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function scrollHidden(vNode) {
  const scroll = chunk013.getScroll(vNode.actualNode);
  const elHeight = parseInt(vNode.getComputedStylePropertyValue('height'));
  const elWidth = parseInt(vNode.getComputedStylePropertyValue('width'));

  return !!scroll && (elHeight === 0 || elWidth === 0);
}

/**
 * Determine if an element is hidden by using overflow: hidden.
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function overflowHidden(vNode, { isAncestor } = {}) {
  // an ancestor that is hidden outside an overflow
  // does not mean that a descendant is also hidden
  // since the descendant can reposition itself to be
  // in view of the overflow:hidden ancestor
  if (isAncestor) {
    return false;
  }

  // a node with position fixed cannot be hidden by an overflow
  // ancestor, even when that ancestor uses a non-static position
  const position = vNode.getComputedStylePropertyValue('position');
  if (position === 'fixed') {
    return false;
  }

  const nodes = chunk012.getOverflowHiddenAncestors(vNode);
  if (!nodes.length) {
    return false;
  }

  const rect = vNode.boundingClientRect;
  return nodes.some(node => {
    // a node with position absolute will not be hidden by an
    // overflow ancestor unless the ancestor uses a non-static
    // position or a node in-between uses a position of relative
    // or sticky
    if (
      position === 'absolute' &&
      !hasPositionedAncestorBetween(vNode, node) &&
      node.getComputedStylePropertyValue('position') === 'static'
    ) {
      return false;
    }

    const nodeRect = node.boundingClientRect;
    if (nodeRect.width < 2 || nodeRect.height < 2) {
      return true;
    }

    return !chunk012.rectsOverlap(rect, nodeRect);
  });
}

/**
 * Determines if an element is hidden with a clip or clip-path technique
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function clipHidden(vNode) {
  const matchesClip = vNode
    .getComputedStylePropertyValue('clip')
    .match(clipRegex$1);
  const matchesClipPath = vNode
    .getComputedStylePropertyValue('clip-path')
    .match(clipPathRegex$1);
  if (matchesClip && matchesClip.length === 5) {
    const position = vNode.getComputedStylePropertyValue('position');
    // clip is only applied to absolutely positioned elements
    if (['fixed', 'absolute'].includes(position)) {
      return (
        matchesClip[3] - matchesClip[1] <= 0 &&
        matchesClip[2] - matchesClip[4] <= 0
      );
    }
  }
  if (matchesClipPath) {
    const type = matchesClipPath[1];
    const value = parseInt(matchesClipPath[2], 10);

    switch (type) {
      case 'inset':
        return value >= 50;
      case 'circle':
        return value === 0;
    }
  }

  return false;
}

/**
 * Check `AREA` element is hidden
 * - validate if it is a child of `map`
 * - ensure `map` is referred by `img` using the `usemap` attribute
 * @param {VirtualNode} vNode
 * @param {Function} visibleFunction Function used to check if the image element is visible
 * @retruns {Boolean}
 */
function areaHidden(vNode, visibleFunction) {
  /**
   * Note:
   * - Verified that `map` element cannot refer to `area` elements across different document trees
   * - Verified that `map` element does not get affected by altering `display` property
   */
  const mapEl = chunk011.closest(vNode, 'map');
  if (!mapEl) {
    return true;
  }

  const mapElName = mapEl.attr('name');
  if (!mapElName) {
    return true;
  }

  /**
   * `map` element has to be in light DOM
   */
  const mapElRootNode = chunk012.getRootNode(vNode.actualNode);
  if (!mapElRootNode || mapElRootNode.nodeType !== 9) {
    return true;
  }

  const refs = chunk014.querySelectorAll(
    // TODO: es-module-_tree
    chunk007.axe._tree,
    `img[usemap="#${chunk007.escapeSelector(mapElName)}"]`
  );
  if (!refs || !refs.length) {
    return true;
  }

  return refs.some(ref => !visibleFunction(ref));
}

/**
 * Determine if element inside `details` is hidden
 */
function detailsHidden(vNode) {
  if (vNode.parent?.props.nodeName !== 'details') {
    return false;
  }

  // first summary element is never hidden (subsequent ones are though)
  if (vNode.props.nodeName === 'summary') {
    const firstSummary = vNode.parent.children.find(
      node => node.props.nodeName === 'summary'
    );

    if (firstSummary === vNode) {
      return false;
    }
  }

  return !vNode.parent.hasAttr('open');
}

function hasPositionedAncestorBetween(child, ancestor) {
  let node = child.parent;
  while (node && node !== ancestor) {
    if (
      ['relative', 'sticky'].includes(
        node.getComputedStylePropertyValue('position')
      )
    ) {
      return true;
    }

    node = node.parent;
  }

  return false;
}

const hiddenMethods$1 = [
  displayHidden,
  visibilityHidden,
  contentVisibiltyHidden,
  detailsHidden
];

/**
 * Determine if an element is hidden from screenreaders and visual users
 * @method isHiddenForEveryone
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @param {Object} [options]
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should be not be used
 * @param {Boolean} [options.isAncestor] If this function is being called on an ancestor for the target node
 * @return {Boolean} The element's visibility state
 */
function isHiddenForEveryone(
  vNode,
  { skipAncestors, isAncestor = false } = {}
) {
  vNode = chunk013.nodeLookup(vNode).vNode;

  if (skipAncestors) {
    return isHiddenSelf(vNode, isAncestor);
  }

  return isHiddenAncestors(vNode, isAncestor);
}

/**
 * Check the element for visibility state
 */
const isHiddenSelf = chunk010.memoizeImplementation(function isHiddenSelfMemoized(vNode, isAncestor) {
  if (nativelyHidden(vNode)) {
    return true;
  }

  if (!vNode.actualNode) {
    return false;
  }

  if (hiddenMethods$1.some(method => method(vNode, { isAncestor }))) {
    return true;
  }

  // detached node
  if (!vNode.actualNode.isConnected) {
    return true;
  }

  return false;
});

/**
 * Check the element and ancestors for visibility state
 */
const isHiddenAncestors = chunk010.memoizeImplementation(
  function isHiddenAncestorsMemoized(vNode, isAncestor) {
    if (isHiddenSelf(vNode, isAncestor)) {
      return true;
    }

    if (!vNode.parent) {
      return false;
    }

    return isHiddenAncestors(vNode.parent, true);
  }
);

/**
 * Determines if an element is inside a position:fixed subtree, even if the element itself is positioned differently.
 * @param {VirtualNode|Element} node
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should not be used
 * @return {Boolean} The element's position state
 */
function isFixedPosition(node, { skipAncestors } = {}) {
  const { vNode } = chunk013.nodeLookup(node);

  // detached element
  if (!vNode) {
    return false;
  }

  if (skipAncestors) {
    return isFixedSelf(vNode);
  }

  return isFixedAncestors(vNode);
}

/**
 * Check the element for position:fixed
 */
const isFixedSelf = chunk010.memoizeImplementation(function isFixedSelfMemoized(vNode) {
  return vNode.getComputedStylePropertyValue('position') === 'fixed';
});

/**
 * Check the element and ancestors for position:fixed
 */
const isFixedAncestors = chunk010.memoizeImplementation(function isFixedAncestorsMemoized(vNode) {
  if (isFixedSelf(vNode)) {
    return true;
  }

  if (!vNode.parent) {
    return false;
  }

  return isFixedAncestors(vNode.parent);
});

function noParentScrolled(element, offset) {
  element = chunk012.getComposedParent(element);
  while (element && element.nodeName.toLowerCase() !== 'html') {
    if (element.scrollTop) {
      offset += element.scrollTop;
      if (offset >= 0) {
        return false;
      }
    }
    element = chunk012.getComposedParent(element);
  }
  return true;
}

/**
 * Determines if element is off screen
 * @method isOffscreen
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element
 * @param {Object} [options]
 * @param {Boolean} [options.isAncestor] If this function is being called on an ancestor of the target node
 * @return {Boolean|undefined}
 */
function isOffscreen(element, { isAncestor } = {}) {
  if (isAncestor) {
    return false;
  }

  const { domNode } = chunk013.nodeLookup(element);
  if (!domNode) {
    return undefined;
  }

  const docElement = document.documentElement;
  const styl = window.getComputedStyle(domNode);
  const dir = window
    .getComputedStyle(document.body || docElement)
    .getPropertyValue('direction');
  const isFixed = isFixedPosition(domNode);
  const coords = isFixed
    ? domNode.getBoundingClientRect()
    : chunk012.getElementCoordinates(domNode);

  // Consider 0 height/ width elements at origin visible
  if (coords.top === 0 && coords.bottom === 0) {
    return false;
  }
  if (coords.left === 0 && coords.right === 0) {
    return false;
  }

  if (
    coords.bottom <= 0 &&
    (noParentScrolled(domNode, coords.bottom) || styl.position === 'absolute')
  ) {
    return true;
  }

  const viewportSize = chunk012.getViewportSize(window);
  if (isFixed && coords.top >= viewportSize.height) {
    return true; // Positioned below the viewport
  }

  const rightEdge = Math.max(docElement.scrollWidth, viewportSize.width);
  if ((isFixed || dir === 'rtl') && coords.left >= rightEdge) {
    return true; // Positioned right of the viewport, preventing right scrolling
  }

  if ((isFixed || dir === 'ltr') && coords.right <= 0) {
    return true; // Positioned left of the viewport, preventing left scrolling
  }

  return false;
}

const hiddenMethods = [
  opacityHidden,
  scrollHidden,
  overflowHidden,
  clipHidden,
  isOffscreen
];

/**
 * Determine if an element is visible on screen
 * @method isVisibleOnScreen
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @return {Boolean} True if the element is visible on screen
 */
function isVisibleOnScreen(vNode) {
  vNode = chunk013.nodeLookup(vNode).vNode;
  return isVisibleOnScreenVirtual(vNode);
}

const isVisibleOnScreenVirtual = chunk010.memoizeImplementation(
  function isVisibleOnScreenMemoized(vNode, isAncestor) {
    if (vNode.actualNode && vNode.props.nodeName === 'area') {
      return !areaHidden(vNode, isVisibleOnScreenVirtual);
    }

    if (isHiddenForEveryone(vNode, { skipAncestors: true, isAncestor })) {
      return false;
    }

    if (
      vNode.actualNode &&
      hiddenMethods.some(method => method(vNode, { isAncestor }))
    ) {
      return false;
    }

    if (!vNode.parent) {
      return true;
    }

    return isVisibleOnScreenVirtual(vNode.parent, true);
  }
);

/**
 * Get the offset between target A and neighbor B. This assumes that the target is undersized and needs to check the spacing exception.
 * @method getOffset
 * @memberof axe.commons.math
 * @param {VirtualNode} vTarget
 * @param {VirtualNode} vNeighbor
 * @param {Number} radius
 * @returns {number}
 */
function getOffset(vTarget, vNeighbor, minRadiusNeighbour = 12) {
  const targetRects = getTargetRects(vTarget);
  const neighborRects = getTargetRects(vNeighbor);

  if (!targetRects.length || !neighborRects.length) {
    return null;
  }

  // calculate distance of each target rect to the closest edge of each neighbor rect
  return targetRects.reduce((minDistance, targetRect) => {
    const targetCenter = chunk012.getRectCenter(targetRect);

    for (const rect of neighborRects) {
      if (chunk012.isPointInRect(targetCenter, rect)) {
        return 0;
      }

      const closestPoint = getClosestPoint(targetCenter, rect);
      const distance = pointDistance(targetCenter, closestPoint);
      minDistance = Math.min(minDistance, distance);
    }

    const neighborTargetSize = getTargetSize_default(vNeighbor);
    if (chunk012.rectHasMinimumSize(minRadiusNeighbour * 2, neighborTargetSize)) {
      return minDistance;
    }

    const neighborBoundingBox = neighborRects.reduce(chunk012.getBoundingRect);
    const neighborCenter = chunk012.getRectCenter(neighborBoundingBox);
    // subtract the radius of the circle from the distance to center to get distance to edge of the neighbor circle
    const centerDistance =
      pointDistance(targetCenter, neighborCenter) - minRadiusNeighbour;

    return Math.max(0, Math.min(minDistance, centerDistance));
  }, Infinity);
}

function getClosestPoint(point, rect) {
  let x;
  let y;

  if (point.x < rect.left) {
    x = rect.left;
  } else if (point.x > rect.right) {
    x = rect.right;
  } else {
    x = point.x;
  }

  if (point.y < rect.top) {
    y = rect.top;
  } else if (point.y > rect.bottom) {
    y = rect.bottom;
  } else {
    y = point.y;
  }

  return { x, y };
}

/**
 * Distance between two points
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
function pointDistance(pointA, pointB) {
  return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
}

/**
 * Check if node A overlaps B
 * @method getOffset
 * @memberof axe.commons.math
 * @param {VirtualNode} vNodeA
 * @param {VirtualNode} vNodeB
 * @returns {boolean}
 */
function hasVisualOverlap(vNodeA, vNodeB) {
  const rectA = vNodeA.boundingClientRect;
  const rectB = vNodeB.boundingClientRect;
  if (
    rectA.left >= rectB.right ||
    rectA.right <= rectB.left ||
    rectA.top >= rectB.bottom ||
    rectA.bottom <= rectB.top
  ) {
    return false;
  }
  return visuallySort(vNodeA, vNodeB) > 0;
}

const math = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getBoundingRect: chunk012.getBoundingRect,
  getIntersectionRect: chunk012.getIntersectionRect,
  getOffset,
  getRectCenter: chunk012.getRectCenter,
  hasVisualOverlap,
  isPointInRect: chunk012.isPointInRect,
  rectHasMinimumSize: chunk012.rectHasMinimumSize,
  rectsOverlap: chunk012.rectsOverlap,
  splitRects: chunk012.splitRects
}, Symbol.toStringTag, { value: 'Module' }));

const ROOT_LEVEL = 0;
const DEFAULT_LEVEL = 0.1;
const FLOAT_LEVEL = 0.2;
const POSITION_LEVEL = 0.3;
let nodeIndex$1 = 0;

/**
 * Setup the 2d grid and add every element to it, even elements not
 * included in the flat tree
 * @returns gridSize
 */
function createGrid(
  root = document.body,
  rootGrid,
  parentVNode = null
) {
  // Prevent multiple calls per run
  if (chunk007.cache.get('gridCreated') && !parentVNode) {
    return chunk007.constants.gridSize;
  }
  chunk007.cache.set('gridCreated', true);

  // by not starting at the htmlElement we don't have to pass a custom
  // filter function into the treeWalker to filter out head elements,
  // which would be called for every node
  if (!parentVNode) {
    let vNode = chunk010.getNodeFromTree(document.documentElement);
    if (!vNode) {
      vNode = new VirtualNode(document.documentElement);
    }

    nodeIndex$1 = 0;
    vNode._stackingOrder = [
      createStackingContext(ROOT_LEVEL, nodeIndex$1++, null)
    ];
    rootGrid ??= new Grid();
    addNodeToGrid(rootGrid, vNode);

    if (chunk013.getScroll(vNode.actualNode)) {
      const subGrid = new Grid(vNode);
      vNode._subGrid = subGrid;
    }
  }

  // IE11 requires the first 3 parameters
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const treeWalker = document.createTreeWalker(
    root,
    window.NodeFilter.SHOW_ELEMENT,
    null,
    false
  );
  let node = parentVNode ? treeWalker.nextNode() : treeWalker.currentNode;
  while (node) {
    let vNode = chunk010.getNodeFromTree(node);

    if (vNode && vNode.parent) {
      parentVNode = vNode.parent;
    }
    // Elements with an assigned slot need to be a child of the slot element
    else if (node.assignedSlot) {
      parentVNode = chunk010.getNodeFromTree(node.assignedSlot);
    }
    // An SVG in IE11 does not have a parentElement but instead has a
    // parentNode. but parentNode could be a shadow root so we need to
    // verify it's in the tree first
    else if (node.parentElement) {
      parentVNode = chunk010.getNodeFromTree(node.parentElement);
    } else if (node.parentNode && chunk010.getNodeFromTree(node.parentNode)) {
      parentVNode = chunk010.getNodeFromTree(node.parentNode);
    }

    if (!vNode) {
      vNode = new chunk007.axe.VirtualNode(node, parentVNode);
    }

    vNode._stackingOrder = createStackingOrder(vNode, parentVNode, nodeIndex$1++);

    const scrollRegionParent = findScrollRegionParent(vNode, parentVNode);
    const grid = scrollRegionParent ? scrollRegionParent._subGrid : rootGrid;

    if (chunk013.getScroll(vNode.actualNode)) {
      const subGrid = new Grid(vNode);
      vNode._subGrid = subGrid;
    }

    // filter out any elements with 0 width or height
    // (we don't do this before so we can calculate stacking context
    // of parents with 0 width/height)
    const rect = vNode.boundingClientRect;
    if (rect.width !== 0 && rect.height !== 0 && isVisibleOnScreen(node)) {
      addNodeToGrid(grid, vNode);
    }

    // add shadow root elements to the grid
    if (chunk013.isShadowRoot(node)) {
      createGrid(node.shadowRoot, grid, vNode);
    }

    node = treeWalker.nextNode();
  }
  return chunk007.constants.gridSize;
}

/**
 * Determine if node produces a stacking context.
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 * https://github.com/gwwar/z-context/blob/master/devtools/index.js
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isStackingContext(vNode, parentVNode) {
  const position = vNode.getComputedStylePropertyValue('position');
  const zIndex = vNode.getComputedStylePropertyValue('z-index');

  // the root element (HTML) is skipped since we always start with a
  // stacking order of [0]

  // position: fixed or sticky
  if (position === 'fixed' || position === 'sticky') {
    return true;
  }

  // positioned (absolutely or relatively) with a z-index value other than "auto",
  if (zIndex !== 'auto' && position !== 'static') {
    return true;
  }

  // elements with an opacity value less than 1.
  if (vNode.getComputedStylePropertyValue('opacity') !== '1') {
    return true;
  }

  // elements with a transform value other than "none"
  const transform =
    vNode.getComputedStylePropertyValue('-webkit-transform') ||
    vNode.getComputedStylePropertyValue('-ms-transform') ||
    vNode.getComputedStylePropertyValue('transform') ||
    'none';

  if (transform !== 'none') {
    return true;
  }

  // elements with a mix-blend-mode value other than "normal"
  const mixBlendMode = vNode.getComputedStylePropertyValue('mix-blend-mode');
  if (mixBlendMode && mixBlendMode !== 'normal') {
    return true;
  }

  // elements with a filter value other than "none"
  const filter = vNode.getComputedStylePropertyValue('filter');
  if (filter && filter !== 'none') {
    return true;
  }

  // elements with a perspective value other than "none"
  const perspective = vNode.getComputedStylePropertyValue('perspective');
  if (perspective && perspective !== 'none') {
    return true;
  }

  // element with a clip-path value other than "none"
  const clipPath = vNode.getComputedStylePropertyValue('clip-path');
  if (clipPath && clipPath !== 'none') {
    return true;
  }

  // element with a mask value other than "none"
  const mask =
    vNode.getComputedStylePropertyValue('-webkit-mask') ||
    vNode.getComputedStylePropertyValue('mask') ||
    'none';
  if (mask !== 'none') {
    return true;
  }

  // element with a mask-image value other than "none"
  const maskImage =
    vNode.getComputedStylePropertyValue('-webkit-mask-image') ||
    vNode.getComputedStylePropertyValue('mask-image') ||
    'none';
  if (maskImage !== 'none') {
    return true;
  }

  // element with a mask-border value other than "none"
  const maskBorder =
    vNode.getComputedStylePropertyValue('-webkit-mask-border') ||
    vNode.getComputedStylePropertyValue('mask-border') ||
    'none';
  if (maskBorder !== 'none') {
    return true;
  }

  // elements with isolation set to "isolate"
  if (vNode.getComputedStylePropertyValue('isolation') === 'isolate') {
    return true;
  }

  // transform or opacity in will-change even if you don't specify values for these attributes directly
  const willChange = vNode.getComputedStylePropertyValue('will-change');
  if (willChange === 'transform' || willChange === 'opacity') {
    return true;
  }

  // elements with -webkit-overflow-scrolling set to "touch"
  if (
    vNode.getComputedStylePropertyValue('-webkit-overflow-scrolling') ===
    'touch'
  ) {
    return true;
  }

  // element with a contain value of "layout" or "paint" or a composite value
  // that includes either of them (i.e. contain: strict, contain: content).
  const contain = vNode.getComputedStylePropertyValue('contain');
  if (['layout', 'paint', 'strict', 'content'].includes(contain)) {
    return true;
  }

  // a flex item or gird item with a z-index value other than "auto", that is the parent element display: flex|inline-flex|grid|inline-grid,
  if (zIndex !== 'auto' && isFlexOrGridContainer(parentVNode)) {
    return true;
  }

  return false;
}

/**
 * Determine if element is a flex or grid container.
 * @param {VirtualNode} vNode
 * @return {Boolean}
 */
function isFlexOrGridContainer(vNode) {
  if (!vNode) {
    return false;
  }

  const display = vNode.getComputedStylePropertyValue('display');
  return ['flex', 'inline-flex', 'grid', 'inline-grid'].includes(display);
}

/**
 * Determine the stacking order of an element. The stacking order is an array of
 * stacking contexts in ancestor order.
 * @param {VirtualNode} vNode
 * @param {VirtualNode} parentVNode
 * @param {Number} treeOrder
 * @return {Number[]}
 */
function createStackingOrder(vNode, parentVNode, treeOrder) {
  const stackingOrder = parentVNode._stackingOrder.slice();

  // if an element creates a stacking context, find the first
  // true stack (not a "fake" stack created from positioned or
  // floated elements without a z-index) and create a new stack at
  // that point (step #5 and step #8)
  // @see https://www.w3.org/Style/css2-updates/css2/zindex.html
  if (isStackingContext(vNode, parentVNode)) {
    const index = stackingOrder.findIndex(({ stackLevel }) =>
      [ROOT_LEVEL, FLOAT_LEVEL, POSITION_LEVEL].includes(stackLevel)
    );
    if (index !== -1) {
      stackingOrder.splice(index, stackingOrder.length - index);
    }
  }

  const stackLevel = getStackLevel(vNode, parentVNode);
  if (stackLevel !== null) {
    stackingOrder.push(createStackingContext(stackLevel, treeOrder, vNode));
  }
  return stackingOrder;
}

/**
 * Create a stacking context, keeping track of the stack level, tree order, and virtual
 * node container.
 * @see https://www.w3.org/Style/css2-updates/css2/zindex.html
 * @see https://www.w3.org/Style/css2-updates/css2/visuren.html#layers
 * @param {Number} stackLevel - The stack level of the stacking context
 * @param {Number} treeOrder - The elements depth-first traversal order
 * @param {VirtualNode} vNode - The virtual node that is the container for the stacking context
 */
function createStackingContext(stackLevel, treeOrder, vNode) {
  return {
    stackLevel,
    treeOrder,
    vNode
  };
}

/**
 * Calculate the level of the stacking context.
 * @param {VirtualNode} vNode - The virtual node container of the stacking context
 * @param {VirtualNode} parentVNode - The parent virtual node of the vNode
 * @return {Number|null}
 */
function getStackLevel(vNode, parentVNode) {
  const zIndex = getRealZIndex(vNode, parentVNode);
  if (!['auto', '0'].includes(zIndex)) {
    return parseInt(zIndex);
  }

  // if a positioned element has z-index: auto or 0 (step #8), or if
  // a non-positioned floating element (step #5), treat it as its
  // own stacking context
  // @see https://www.w3.org/Style/css2-updates/css2/zindex.html

  // Put positioned elements above floated elements
  if (vNode.getComputedStylePropertyValue('position') !== 'static') {
    return POSITION_LEVEL;
  }

  // Put floated elements above z-index: 0
  // (step #5 floating get sorted below step #8 positioned)
  if (vNode.getComputedStylePropertyValue('float') !== 'none') {
    return FLOAT_LEVEL;
  }

  if (isStackingContext(vNode, parentVNode)) {
    return DEFAULT_LEVEL;
  }

  return null;
}

/**
 * Calculate the z-index value of a node taking into account when doesn't apply.
 * @param {VirtualNode} vNode - The virtual node to get z-index of
 * @param {VirtualNode} parentVNode - The parent virtual node of the vNode
 * @return {Number|'auto'}
 */
function getRealZIndex(vNode, parentVNode) {
  const position = vNode.getComputedStylePropertyValue('position');
  if (position === 'static' && !isFlexOrGridContainer(parentVNode)) {
    // z-index is ignored on position:static, except if on a flex or grid
    // @see https://www.w3.org/TR/css-flexbox-1/#painting
    // @see https://www.w3.org/TR/css-grid-1/#z-order
    return 'auto';
  }
  return vNode.getComputedStylePropertyValue('z-index');
}

/**
 * Return the parent node that is a scroll region.
 * @param {VirtualNode}
 * @return {VirtualNode|null}
 */
function findScrollRegionParent(vNode, parentVNode) {
  let scrollRegionParent = null;
  const checkedNodes = [vNode];

  while (parentVNode) {
    if (chunk013.getScroll(parentVNode.actualNode)) {
      scrollRegionParent = parentVNode;
      break;
    }

    if (parentVNode._scrollRegionParent) {
      scrollRegionParent = parentVNode._scrollRegionParent;
      break;
    }

    checkedNodes.push(parentVNode);
    parentVNode = chunk010.getNodeFromTree(
      parentVNode.actualNode.parentElement || parentVNode.actualNode.parentNode
    );
  }

  // cache result of parent scroll region so we don't have to look up the entire
  // tree again for a child node
  checkedNodes.forEach(
    virtualNode => (virtualNode._scrollRegionParent = scrollRegionParent)
  );
  return scrollRegionParent;
}

/**
 * Add a node to every cell of the grid it intersects with.
 * @param {Grid}
 * @param {VirtualNode}
 */
function addNodeToGrid(grid, vNode) {
  const overflowHiddenNodes = chunk012.getOverflowHiddenAncestors(vNode);

  vNode.clientRects.forEach(clientRect => {
    // ignore any rects that are outside the bounds of overflow hidden ancestors
    const visibleRect = overflowHiddenNodes.reduce((rect, overflowNode) => {
      return rect && chunk012.getIntersectionRect(rect, overflowNode.boundingClientRect);
    }, clientRect);

    if (!visibleRect) {
      return;
    }

    // save a reference to where this element is in the grid so we
    // can find it even if it's in a subgrid
    vNode._grid ??= grid;
    const gridRect = grid.getGridPositionOfRect(visibleRect);
    grid.loopGridPosition(gridRect, gridCell => {
      if (!gridCell.includes(vNode)) {
        gridCell.push(vNode);
      }
    });
  });
}

class Grid {
  constructor(container = null) {
    this.container = container;
    this.cells = [];
  }

  /**
   * Convert x or y coordinate from rect, to a position in the grid
   * @param {number}
   * @returns {number}
   */
  toGridIndex(num) {
    return Math.floor(num / chunk007.constants.gridSize);
  }

  /**
   * Return an an array of nodes available at a particular grid coordinate
   * @param {DOMPoint} gridPosition
   * @returns {Array<AbstractVirtualNode>}
   */
  getCellFromPoint({ x, y }) {
    chunk007.assert(this.boundaries, 'Grid does not have cells added');
    const rowIndex = this.toGridIndex(y);
    const colIndex = this.toGridIndex(x);
    chunk007.assert(
      chunk012.isPointInRect({ y: rowIndex, x: colIndex }, this.boundaries),
      'Element midpoint exceeds the grid bounds'
    );
    const row = this.cells[rowIndex - this.cells._negativeIndex] ?? [];
    return row[colIndex - row._negativeIndex] ?? [];
  }

  /**
   * Loop over all cells within the gridPosition rect
   * @param {DOMRect} gridPosition
   * @param {Function} callback
   */
  loopGridPosition(gridPosition, callback) {
    const { left, right, top, bottom } = gridPosition;
    if (this.boundaries) {
      gridPosition = chunk012.getBoundingRect(this.boundaries, gridPosition);
    }
    this.boundaries = gridPosition;

    loopNegativeIndexMatrix(this.cells, top, bottom, (gridRow, row) => {
      loopNegativeIndexMatrix(gridRow, left, right, (gridCell, col) => {
        callback(gridCell, { row, col });
      });
    });
  }

  /**
   * Scale the rect to the position within the grid
   * @param {DOMRect} clientOrBoundingRect
   * @param {number} margin Offset outside the rect, default 0
   * @returns {DOMRect} gridPosition
   */
  getGridPositionOfRect({ top, right, bottom, left }, margin = 0) {
    top = this.toGridIndex(top - margin);
    right = this.toGridIndex(right + margin - 1);
    bottom = this.toGridIndex(bottom + margin - 1);
    left = this.toGridIndex(left - margin);
    return new window.DOMRect(left, top, right - left, bottom - top);
  }
}

// handle negative row/col values
function loopNegativeIndexMatrix(matrix, start, end, callback) {
  matrix._negativeIndex ??= 0;
  // Shift the array when start is negative
  if (start < matrix._negativeIndex) {
    for (let i = 0; i < matrix._negativeIndex - start; i++) {
      matrix.splice(0, 0, []);
    }
    matrix._negativeIndex = start;
  }

  const startOffset = start - matrix._negativeIndex;
  const endOffset = end - matrix._negativeIndex;
  for (let index = startOffset; index <= endOffset; index++) {
    matrix[index] ??= [];
    callback(matrix[index], index + matrix._negativeIndex);
  }
}

/**
 * Get the grid an element exists in
 * @param {Node|VirtualNode} node
 * @returns {Grid}
 */
function getNodeGrid(node) {
  createGrid(); // Ensure the grid exists
  const { vNode } = chunk013.nodeLookup(node);
  return vNode._grid;
}

function findNearbyElms(vNode, margin = 0) {
  const grid = getNodeGrid(vNode);
  if (!grid?.cells?.length) {
    return []; // Elements not in the grid don't have ._grid
  }
  const rect = vNode.boundingClientRect;
  const selfIsFixed = isFixedPosition(vNode);
  const gridPosition = grid.getGridPositionOfRect(rect, margin);

  const neighbors = [];
  grid.loopGridPosition(gridPosition, vNeighbors => {
    for (const vNeighbor of vNeighbors) {
      if (
        vNeighbor &&
        vNeighbor !== vNode &&
        !neighbors.includes(vNeighbor) &&
        selfIsFixed === isFixedPosition(vNeighbor)
      ) {
        neighbors.push(vNeighbor);
      }
    }
  });

  return neighbors;
}

/**
 * Determine if a dialog element is opened as a modal. Currently there are no APIs to determine this so we'll use a bit of a hacky solution that has known issues.
 * This can tell us that a dialog element is open but it cannot tell us which one is the top layer, nor which one is visually on top. Nested dialogs that are opened using both `.show` and`.showModal` can cause issues as well.
 * @see https://github.com/dequelabs/axe-core/issues/3463
 * @return {VirtualNode|Null} The modal dialog virtual node or null if none are found
 */
const getModalDialog = chunk010.memoizeImplementation(function getModalDialogMemoized() {
  // this is here for tests so we don't have
  // to set up the virtual tree when code
  // isn't testing this bit
  if (!chunk007.axe._tree) {
    return null;
  }

  const dialogs = chunk014.querySelectorAllFilter(
    // TODO: es-module-_tree
    chunk007.axe._tree[0],
    'dialog[open]',
    vNode => {
      const rect = vNode.boundingClientRect;
      const stack = document.elementsFromPoint(rect.left + 1, rect.top + 1);
      return stack.includes(vNode.actualNode) && isVisibleOnScreen(vNode);
    }
  );

  if (!dialogs.length) {
    return null;
  }

  // for Chrome and Firefox, look to see if
  // elementsFromPoint returns the dialog
  // when checking outside its bounds
  const modalDialog = dialogs.find(dialog => {
    const rect = dialog.boundingClientRect;
    const stack = document.elementsFromPoint(rect.left - 10, rect.top - 10);

    return stack.includes(dialog.actualNode);
  });

  if (modalDialog) {
    return modalDialog;
  }

  // fallback for Safari, look at the grid to
  // find a node to check as elementsFromPoint
  // does not return inert nodes
  return (
    dialogs.find(dialog => {
      const { vNode, rect } = getNodeFromGrid(dialog) ?? {};
      if (!vNode) {
        return false;
      }

      const stack = document.elementsFromPoint(rect.left + 1, rect.top + 1);
      return !stack.includes(vNode.actualNode);
    }) ?? null
  );
});

/**
 * Find the first non-html from the grid to use as a test for elementsFromPoint
 * @return {Object}
 */
function getNodeFromGrid(dialog) {
  createGrid();
  // TODO: es-module-_tree
  const grid = chunk007.axe._tree[0]._grid;
  const viewRect = new window.DOMRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  if (!grid) {
    return;
  }

  for (let row = 0; row < grid.cells.length; row++) {
    const cols = grid.cells[row];
    if (!cols) {
      continue;
    }

    for (let col = 0; col < cols.length; col++) {
      const cells = cols[col];
      if (!cells) {
        continue;
      }

      for (let i = 0; i < cells.length; i++) {
        const vNode = cells[i];
        const rect = vNode.boundingClientRect;
        const intersection = chunk012.getIntersectionRect(rect, viewRect);

        if (
          // html is always returned from
          // elementsFromPoint
          vNode.props.nodeName !== 'html' &&
          vNode !== dialog &&
          vNode.getComputedStylePropertyValue('pointer-events') !== 'none' &&
          // ensure the element is visible in
          // the current viewport for
          // elementsFromPoint so we don't have
          // to scroll
          intersection
        ) {
          return { vNode, rect: intersection };
        }
      }
    }
  }
}

/**
 * Determines if an element is inside an inert subtree.
 * @param {VirtualNode} vNode
 * @param {Boolean} [options.skipAncestors] If the ancestor tree should not be used
 * @return {Boolean} The element's inert state
 */
function isInert(vNode, { skipAncestors, isAncestor } = {}) {
  if (skipAncestors) {
    return isInertSelf(vNode, isAncestor);
  }

  return isInertAncestors(vNode, isAncestor);
}

/**
 * Check the element for inert
 */
const isInertSelf = chunk010.memoizeImplementation(function isInertSelfMemoized(vNode, isAncestor) {
  if (vNode.hasAttr('inert')) {
    return true;
  }

  if (!isAncestor && vNode.actualNode) {
    // elements outside of an opened modal
    // dialog are treated as inert by the
    // browser
    const modalDialog = getModalDialog();
    if (modalDialog && !chunk011.contains(modalDialog, vNode)) {
      return true;
    }
  }

  return false;
});

/**
 * Check the element and ancestors for inert
 */
const isInertAncestors = chunk010.memoizeImplementation(
  function isInertAncestorsMemoized(vNode, isAncestor) {
    if (isInertSelf(vNode, isAncestor)) {
      return true;
    }

    if (!vNode.parent) {
      return false;
    }

    return isInertAncestors(vNode.parent, true);
  }
);

// Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
const allowedDisabledNodeNames = [
  'button',
  'command',
  'fieldset',
  'keygen',
  'optgroup',
  'option',
  'select',
  'textarea',
  'input'
];

function isDisabledAttrAllowed(nodeName) {
  return allowedDisabledNodeNames.includes(nodeName);
}

/**
 * Determines if focusing has been disabled on an element.
 * @param {HTMLElement|VirtualNode} el The HTMLElement
 * @return {Boolean} Whether focusing has been disabled on an element.
 */
function focusDisabled(el) {
  const { vNode } = chunk013.nodeLookup(el);

  if (
    (isDisabledAttrAllowed(vNode.props.nodeName) &&
      vNode.hasAttr('disabled')) ||
    isInert(vNode)
  ) {
    return true;
  }

  // if a form element is in a legend, that element will not be disabled even if the fieldset is
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
  let parentNode = vNode.parent;
  const ancestors = [];
  let fieldsetDisabled = false;
  while (
    parentNode &&
    parentNode.shadowId === vNode.shadowId &&
    !fieldsetDisabled
  ) {
    ancestors.push(parentNode);
    if (parentNode.props.nodeName === 'legend') {
      break;
    }

    // use the cached value if one exists and it's from the same shadow tree
    if (parentNode._inDisabledFieldset !== undefined) {
      fieldsetDisabled = parentNode._inDisabledFieldset;
      break;
    }

    if (
      parentNode.props.nodeName === 'fieldset' &&
      parentNode.hasAttr('disabled')
    ) {
      fieldsetDisabled = true;
    }
    parentNode = parentNode.parent;
  }

  // cache whether each element turned out to be in a disabled fieldset so we only have to look at each element once
  ancestors.forEach(
    ancestor => (ancestor._inDisabledFieldset = fieldsetDisabled)
  );
  if (fieldsetDisabled) {
    return true;
  }

  if (vNode.props.nodeName !== 'area') {
    // if the virtual node does not have an actual node, treat it
    // as not hidden
    if (!vNode.actualNode) {
      return false;
    }
    return isHiddenForEveryone(vNode);
  }

  return false;
}

/**
 * Visually sort nodes based on their stack order
 * References:
 * https://www.w3.org/Style/css2-updates/css2/zindex.html
 * https://www.w3.org/Style/css2-updates/css2/visuren.html#layers
 * @param {VirtualNode}
 * @param {VirtualNode}
 */
function visuallySort(a, b) {
  /*eslint no-bitwise: 0 */
  createGrid(); // Because we need ._stackingOrder
  const length = Math.max(a._stackingOrder.length, b._stackingOrder.length);

  for (let i = 0; i < length; i++) {
    if (typeof b._stackingOrder[i] === 'undefined') {
      return -1;
    } else if (typeof a._stackingOrder[i] === 'undefined') {
      return 1;
    }

    // 7. the child stacking contexts with positive stack levels (least positive first).
    if (b._stackingOrder[i].stackLevel > a._stackingOrder[i].stackLevel) {
      return 1;
    }

    // 2. the child stacking contexts with negative stack levels (most negative first).
    if (b._stackingOrder[i].stackLevel < a._stackingOrder[i].stackLevel) {
      return -1;
    }

    // stacks share the same stack level so compare document order
    if (b._stackingOrder[i].treeOrder !== a._stackingOrder[i].treeOrder) {
      return b._stackingOrder[i].treeOrder - a._stackingOrder[i].treeOrder;
    }
  }

  // nodes are the same stacking order
  let aNode = a.actualNode;
  let bNode = b.actualNode;

  // elements don't correctly calculate document position when comparing
  // across shadow boundaries, so we need to compare the position of a
  // shared host instead

  // elements have different hosts
  if (aNode.getRootNode && aNode.getRootNode() !== bNode.getRootNode()) {
    // keep track of all parent hosts and find the one both nodes share
    const boundaries = [];
    while (aNode) {
      boundaries.push({
        root: aNode.getRootNode(),
        node: aNode
      });
      aNode = aNode.getRootNode().host;
    }

    while (
      bNode &&
      !boundaries.find(boundary => boundary.root === bNode.getRootNode())
    ) {
      bNode = bNode.getRootNode().host;
    }

    // bNode is a node that shares a host with some part of the a parent
    // shadow tree, find the aNode that shares the same host as bNode
    aNode = boundaries.find(
      boundary => boundary.root === bNode.getRootNode()
    ).node;

    // sort child of shadow to it's host node by finding which element is
    // the child of the host and sorting it before the host
    if (aNode === bNode) {
      return a.actualNode.getRootNode() !== aNode.getRootNode() ? -1 : 1;
    }
  }

  const {
    DOCUMENT_POSITION_FOLLOWING,
    DOCUMENT_POSITION_CONTAINS,
    DOCUMENT_POSITION_CONTAINED_BY
  } = window.Node;

  const docPosition = aNode.compareDocumentPosition(bNode);
  const DOMOrder = docPosition & DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
  const isDescendant =
    docPosition & DOCUMENT_POSITION_CONTAINS ||
    docPosition & DOCUMENT_POSITION_CONTAINED_BY;
  const aPosition = getPositionOrder(a);
  const bPosition = getPositionOrder(b);

  // a child of a positioned element should also be on top of the parent
  if (aPosition === bPosition || isDescendant) {
    return DOMOrder;
  }
  return bPosition - aPosition;
}

/**
 * Return the index order of how to position this element. return nodes in non-positioned, floating, positioned order
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
 * https://www.w3.org/Style/css2-updates/css2/zindex.html
 * @param {VirtualNode} vNode
 * @return {Number}
 */
function getPositionOrder(vNode) {
  // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
  if (vNode.getComputedStylePropertyValue('display').indexOf('inline') !== -1) {
    return 2;
  }
  // 4. the non-positioned floats.
  if (isFloated(vNode)) {
    return 1;
  }
  // 3. the in-flow, non-inline-level, non-positioned descendants.
  return 0;
}

/**
 * Check if a node or one of it's parents is floated.
 * Floating position should be inherited from the parent tree
 * @see https://github.com/dequelabs/axe-core/issues/2222
 */
function isFloated(vNode) {
  if (!vNode) {
    return false;
  }

  if (vNode._isFloated !== undefined) {
    return vNode._isFloated;
  }

  const floatStyle = vNode.getComputedStylePropertyValue('float');

  if (floatStyle !== 'none') {
    vNode._isFloated = true;
    return true;
  }

  const floated = isFloated(vNode.parent);
  vNode._isFloated = floated;
  return floated;
}

function getRectStack(grid, rect, recursed = false) {
  const center = chunk012.getRectCenter(rect);
  const gridCell = grid.getCellFromPoint(center) || [];

  const floorX = Math.floor(center.x);
  const floorY = Math.floor(center.y);
  let stack = gridCell.filter(gridCellNode => {
    return gridCellNode.clientRects.some(clientRect => {
      const rectX = clientRect.left;
      const rectY = clientRect.top;

      // perform an AABB (axis-aligned bounding box) collision check for the
      // point inside the rect
      // account for differences in how browsers handle floating point
      // precision of bounding rects
      return (
        floorX < Math.floor(rectX + clientRect.width) &&
        floorX >= Math.floor(rectX) &&
        floorY < Math.floor(rectY + clientRect.height) &&
        floorY >= Math.floor(rectY)
      );
    });
  });

  const gridContainer = grid.container;
  if (gridContainer) {
    stack = getRectStack(
      gridContainer._grid,
      gridContainer.boundingClientRect,
      true
    ).concat(stack);
  }

  if (!recursed) {
    stack = stack
      .sort(visuallySort)
      .map(vNode => vNode.actualNode)
      // always make sure html is the last element
      .concat(document.documentElement)
      // remove duplicates caused by adding client rects of the same node
      .filter((node, index, array) => array.indexOf(node) === index);
  }

  return stack;
}

/**
 * Return all elements that are at the center bounding rect of the passed in node.
 * @method getElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Node[]}
 */
function getElementStack(node) {
  const grid = getNodeGrid(node);
  if (!grid) {
    return [];
  }
  const rect = chunk010.getNodeFromTree(node).boundingClientRect;
  return getRectStack(grid, rect);
}

/**
 * Get all elements (including given node) that are part of the tab order
 * @method getTabbableElements
 * @memberof axe.commons.dom
 * @instance
 * @param  {Object} virtualNode The virtualNode to assess
 * @return {Boolean}
 */
function getTabbableElements(virtualNode) {
  const nodeAndDescendents = chunk014.querySelectorAll(virtualNode, '*');

  const tabbableElements = nodeAndDescendents.filter(vNode => {
    const isFocusable = vNode.isFocusable;
    const tabIndex = chunk013.parseTabindex(vNode.actualNode.getAttribute('tabindex'));

    return tabIndex !== null ? isFocusable && tabIndex >= 0 : isFocusable;
  });

  return tabbableElements;
}

/**
 * Determines if an element is focusable without considering its tabindex
 * @method isNativelyFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement|VirtualNode} el The HTMLElement
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
function isNativelyFocusable(el) {
  const { vNode } = chunk013.nodeLookup(el);

  if (!vNode || focusDisabled(vNode)) {
    return false;
  }

  switch (vNode.props.nodeName) {
    case 'a':
    case 'area':
      if (vNode.hasAttr('href')) {
        return true;
      }
      break;
    case 'input':
      return vNode.props.type !== 'hidden';
    case 'textarea':
    case 'select':
    case 'summary':
    case 'button':
      return true;
    case 'details':
      return !chunk014.querySelectorAll(vNode, 'summary').length;
  }
  return false;
}

/**
 * Determines if an element is keyboard or programmatically focusable.
 * @method isFocusable
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's focusability status
 */
function isFocusable(el) {
  const { vNode } = chunk013.nodeLookup(el);

  if (vNode.props.nodeType !== 1) {
    return false;
  }

  if (focusDisabled(vNode)) {
    return false;
  } else if (isNativelyFocusable(vNode)) {
    return true;
  }
  // check if the tabindex is specified and a parseable number
  const tabindex = chunk013.parseTabindex(vNode.attr('tabindex'));
  return tabindex !== null;
}

/**
 * Determines if an element is focusable and able to be tabbed to.
 * @method isInTabOrder
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} The element's tabindex status
 */
function isInTabOrder(el) {
  const { vNode } = chunk013.nodeLookup(el);

  if (vNode.props.nodeType !== 1) {
    return false;
  }

  const tabindex = chunk013.parseTabindex(vNode.attr('tabindex'));
  if (tabindex <= -1) {
    return false; // Elements with tabindex=-1 are never in the tab order
  }

  return isFocusable(vNode);
}

const getTargetRects = chunk010.memoizeImplementation(getTargetRects$1);

/**
 * Return all unobscured rects of a target.
 * @see https://www.w3.org/TR/WCAG22/#dfn-bounding-boxes
 * @param {VitualNode} vNode
 * @return {DOMRect[]}
 */
function getTargetRects$1(vNode) {
  const display = vNode.getComputedStylePropertyValue('display');
  const nodeRects =
    display === 'inline' ? vNode.clientRects : [vNode.boundingClientRect];
  const overlappingVNodes = findNearbyElms(vNode).filter(vNeighbor => {
    return (
      hasVisualOverlap(vNode, vNeighbor) &&
      vNeighbor.getComputedStylePropertyValue('pointer-events') !== 'none' &&
      !isDescendantNotInTabOrder(vNode, vNeighbor)
    );
  });

  if (!overlappingVNodes.length) {
    return nodeRects;
  }

  const obscuringRects = overlappingVNodes
    .map(overlappingVNode => {
      const overlappingDisplay =
        overlappingVNode.getComputedStylePropertyValue('display');
      return overlappingDisplay === 'inline'
        ? overlappingVNode.clientRects
        : overlappingVNode.boundingClientRect;
    })
    .flat(Infinity);
  return chunk012.splitRects(nodeRects, obscuringRects);
}

function isDescendantNotInTabOrder(vAncestor, vNode) {
  return chunk011.contains(vAncestor, vNode) && !isInTabOrder(vNode);
}

const getTargetSize_default = chunk010.memoizeImplementation(getTargetSize);

/**
 * Compute the target size of an element.
 * @see https://www.w3.org/TR/WCAG22/#dfn-targets
 */
function getTargetSize(vNode, minSize) {
  const rects = getTargetRects(vNode);
  return getLargestRect(rects, minSize);
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

/**
 * Get elements referenced via a space-separated token attribute;
 * it will insert `null` for any Element that is not found
 * @method idrefs
 * @memberof axe.commons.dom
 * @instance
 * @param  {HTMLElement} node
 * @param  {String} attr The name of attribute
 * @return {Array|null} Array of elements (or `null` if not found)
 *
 * NOTE: When in a shadow DOM environment: ID refs (even for slotted content)
 * refer to the document in which the element is considered to be in the
 * "light DOM". Therefore, we use getElementById on the root node and not QSA
 * on the flattened tree to dereference idrefs.
 *
 */
function idrefs(node, attr) {
  node = node.actualNode || node;

  try {
    const doc = chunk012.getRootNode(node);
    const result = [];
    let attrValue = node.getAttribute(attr);

    if (attrValue) {
      attrValue = chunk013.tokenList(attrValue);
      for (let index = 0; index < attrValue.length; index++) {
        result.push(doc.getElementById(attrValue[index]));
      }
    }

    return result;
  } catch {
    throw new TypeError('Cannot resolve id references for non-DOM nodes');
  }
}

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {string}
 */
function accessibleText(element, context) {
  const virtualNode = chunk010.getNodeFromTree(element); // throws an exception on purpose if axe._tree not correct
  return accessibleTextVirtual(virtualNode, context);
}

/**
 * Get the accessible name based on aria-labelledby
 *
 * @deprecated Do not use Element directly. Pass VirtualNode instead
 * @param {VirtualNode|Element} element
 * @param {Object} context
 * @property {Bool} inLabelledByContext Whether or not the lookup is part of aria-labelledby reference
 * @property {Bool} inControlContext Whether or not the lookup is part of a native label reference
 * @property {Element} startNode First node in accessible name computation
 * @property {Bool} debug Enable logging for formControlValue
 * @return {string} Concatenated text value for referenced elements
 */
function arialabelledbyText(element, context = {}) {
  const { vNode } = chunk013.nodeLookup(element);
  if (vNode?.props.nodeType !== 1) {
    return '';
  }

  /**
   * Note: The there are significant difference in how many "leads" browsers follow.
   * - Firefox stops after the first IDREF, so it
   * 		doesn't follow aria-labelledby after a for:>ID ref.
   * - Chrome seems to just keep iterating no matter how many levels deep.
   * - AccName-AAM 1.1 suggests going one level deep, but to treat
   * 		each ref type separately.
   *
   * Axe-core's implementation behaves most closely like Firefox as it seems
   *  to be the common denominator. Main difference is that Firefox
   *  includes the value of form controls in addition to aria-label(s),
   *  something no other browser seems to do. Axe doesn't do that.
   */
  if (
    vNode.props.nodeType !== 1 ||
    context.inLabelledByContext ||
    context.inControlContext ||
    !vNode.attr('aria-labelledby')
  ) {
    return '';
  }

  const refs = idrefs(vNode, 'aria-labelledby').filter(elm => elm);
  return refs.reduce((accessibleName, elm) => {
    const accessibleNameAdd = accessibleText(elm, {
      // Prevent the infinite reference loop:
      inLabelledByContext: true,
      startNode: context.startNode || vNode,
      ...context
    });

    if (!accessibleName) {
      return accessibleNameAdd;
    } else {
      return `${accessibleName} ${accessibleNameAdd}`;
    }
  }, '');
}

/**
 * Get the text value of aria-label, if any
 *
 * @deprecated Do not use Element directly. Pass VirtualNode instead
 * @param {VirtualNode|Element} element
 * @return {string} ARIA label
 */
function arialabelText(element) {
  const { vNode } = chunk013.nodeLookup(element);
  if (vNode?.props.nodeType !== 1) {
    return '';
  }

  return vNode.attr('aria-label') || '';
}

const originals = {
  ariaAttrs: chunk015.ariaAttrs,
  ariaRoles: {
    ...chunk016.ariaRoles,
    ...chunk016.dpubRoles,
    ...chunk016.graphicsRoles
  },
  htmlElms: chunk017.htmlElms,
  cssColors: chunk016.cssColors
};
const standards = {
  ...originals
};

function configureStandards(config) {
  Object.keys(standards).forEach(propName => {
    if (config[propName]) {
      standards[propName] = chunk011.deepMerge(standards[propName], config[propName]);
    }
  });
}

function resetStandards() {
  Object.keys(standards).forEach(propName => {
    standards[propName] = originals[propName];
  });
}

/**
 * Check if a given role is unsupported
 * @method isUnsupportedRole
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Boolean}
 */
function isUnsupportedRole(role) {
  const roleDefinition = standards.ariaRoles[role];
  return roleDefinition ? !!roleDefinition.unsupported : false;
}

/**
 * Check if a given role is valid
 * @method isValidRole
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @param {Object} options Use `allowAbstract` if you want abstracts, and `flagUnsupported: true` to report unsupported roles
 * @return {Boolean}
 */
function isValidRole(role, { allowAbstract, flagUnsupported = false } = {}) {
  const roleDefinition = standards.ariaRoles[role];
  const isRoleUnsupported = isUnsupportedRole(role);
  if (!roleDefinition || (flagUnsupported && isRoleUnsupported)) {
    return false;
  }
  return allowAbstract ? true : roleDefinition.type !== 'abstract';
}

function getExplicitRole(vNode, { fallback, abstracts, dpub } = {}) {
  vNode = vNode instanceof chunk007.AbstractVirtualNode ? vNode : chunk010.getNodeFromTree(vNode);

  if (vNode.props.nodeType !== 1) {
    return null;
  }

  const roleAttr = (vNode.attr('role') || '').trim().toLowerCase();
  const roleList = fallback ? chunk013.tokenList(roleAttr) : [roleAttr];

  // Get the first valid role:
  const firstValidRole = roleList.find(role => {
    if (!dpub && role.substr(0, 4) === 'doc-') {
      return false;
    }
    return isValidRole(role, { allowAbstract: abstracts });
  });

  return firstValidRole || null;
}

/**
 * Return a list of html elements whose content type matches the provided value. Note: this will not work for 'interactive' content types as those depend on the element.
 * @param {String} type The desired content type
 * @return {String[]} List of all elements matching the type
 */
function getElementsByContentType(type) {
  return Object.keys(standards.htmlElms).filter(nodeName => {
    const elm = standards.htmlElms[nodeName];

    if (elm.contentTypes) {
      return elm.contentTypes.includes(type);
    }

    // some elements do not have content types
    if (!elm.variant) {
      return false;
    }

    if (elm.variant.default && elm.variant.default.contentTypes) {
      return elm.variant.default.contentTypes.includes(type);
    }

    // content type depends on a virtual node
    return false;
  });
}

/**
 * Return a list of global aria attributes.
 * @return {String[]} List of all global aria attributes
 */
function getGlobalAriaAttrs() {
  return chunk007.cache.get('globalAriaAttrs', () =>
    Object.keys(standards.ariaAttrs).filter(attrName => {
      return standards.ariaAttrs[attrName].global;
    })
  );
}

/**
 * Converts a table to an Array of arrays, normalized for row and column spans
 * @method toGrid
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableElement} node The table to convert
 * @return {Array<HTMLTableCellElement>} Array of HTMLTableCellElements
 */
function toGrid(node) {
  const table = [];
  const rows = node.rows;
  for (let i = 0, rowLength = rows.length; i < rowLength; i++) {
    const cells = rows[i].cells;
    table[i] = table[i] || [];

    let columnIndex = 0;

    for (let j = 0, cellLength = cells.length; j < cellLength; j++) {
      for (let colSpan = 0; colSpan < cells[j].colSpan; colSpan++) {
        // if [the rowSpan] value is set to 0, it extends until the
        // end of the table section
        // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-rowspan

        // ie11 returns 1 as the rowspan value even if it's set to 0
        const rowspanAttr = cells[j].getAttribute('rowspan');
        const rowspanValue =
          parseInt(rowspanAttr) === 0 || cells[j].rowspan === 0
            ? rows.length
            : cells[j].rowSpan;

        for (let rowSpan = 0; rowSpan < rowspanValue; rowSpan++) {
          table[i + rowSpan] = table[i + rowSpan] || [];
          while (table[i + rowSpan][columnIndex]) {
            columnIndex++;
          }
          table[i + rowSpan][columnIndex] = cells[j];
        }
        columnIndex++;
      }
    }
  }

  return table;
}

const toArray = chunk010.memoizeImplementation(toGrid);

/**
 * Get the x, y coordinates of a table cell; normalized for rowspan and colspan
 * @method getCellPosition
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The table cell of which to get the position
 * @return {Object} Object with `x` and `y` properties of the coordinates
 */
function getCellPosition(cell, tableGrid) {
  let rowIndex, index;
  if (!tableGrid) {
    tableGrid = toArray(findUp(cell, 'table'));
  }

  for (rowIndex = 0; rowIndex < tableGrid.length; rowIndex++) {
    if (tableGrid[rowIndex]) {
      index = tableGrid[rowIndex].indexOf(cell);
      if (index !== -1) {
        return {
          x: index,
          y: rowIndex
        };
      }
    }
  }
}

const getCellPosition$1 = chunk010.memoizeImplementation(getCellPosition);

/**
 * Determine if a `HTMLTableCellElement` is a column header, if so get the scope of the header
 * @method getScope
 * @memberof axe.commons.table
 * @instance
 * @param {HTMLTableCellElement|AbstractVirtualNode} cell The table cell to test
 * @return {Boolean|String} Returns `false` if not a column header, or the scope of the column header element
 */
function getScope(el) {
  const { vNode, domNode: cell } = chunk013.nodeLookup(el);

  const scope = vNode.attr('scope');
  const role = getExplicitRole(vNode);

  if (!['td', 'th'].includes(vNode.props.nodeName)) {
    throw new TypeError('Expected TD or TH element');
  }

  if (role === 'columnheader') {
    return 'col';
  } else if (role === 'rowheader') {
    return 'row';
  } else if (scope === 'col' || scope === 'row') {
    return scope;
  } else if (vNode.props.nodeName !== 'th') {
    return false;
  } else if (!vNode.actualNode) {
    return 'auto';
  }
  const tableGrid = toArray(findUp(cell, 'table'));
  const pos = getCellPosition$1(cell, tableGrid);

  // The element is in a row with all th elements, that makes it a column header
  const headerRow = tableGrid[pos.y].every(
    node => node.nodeName.toUpperCase() === 'TH'
  );

  if (headerRow) {
    return 'col';
  }

  // The element is in a column with all th elements, that makes it a row header
  const headerCol = tableGrid
    .map(col => col[pos.x])
    .every(node => node && node.nodeName.toUpperCase() === 'TH');

  if (headerCol) {
    return 'row';
  }
  return 'auto';
}

/**
 * Determine if a `HTMLTableCellElement` is a column header
 * @method isColumnHeader
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} element The table cell to test
 * @return {Boolean}
 */
function isColumnHeader(element) {
  return ['col', 'auto'].indexOf(getScope(element)) !== -1;
}

/**
 * Determine if a `HTMLTableCellElement` is a row header
 * @method isRowHeader
 * @memberof axe.commons.table
 * @instance
 * @param  {HTMLTableCellElement} cell The table cell to test
 * @return {Boolean}
 */
function isRowHeader(cell) {
  return ['row', 'auto'].includes(getScope(cell));
}

// Source: https://www.w3.org/TR/html-aam-1.0/#element-mapping-table
// Source: https://www.w3.org/TR/html-aria/

// Sectioning content elements: article, aside, nav, section
// https://html.spec.whatwg.org/multipage/dom.html#sectioning-content
const getSectioningContentSelector = () => {
  return chunk007.cache.get('sectioningContentSelector', () => {
    return (
      getElementsByContentType('sectioning')
        .map(nodeName => `${nodeName}:not([role])`)
        .join(', ') +
      ' , [role=article], [role=complementary], [role=navigation], [role=region]'
    );
  });
};

const getSectioningContentPlusMainSelector = () => {
  // Why is there this similar but slightly different selector?
  // ->
  // Asides can be scoped to body or main, but headers and footers must be
  // scoped **only** to body (for landmark role mapping).
  //   - Header: https://w3c.github.io/html-aam/#el-header-ancestorbody
  //   - Footer: https://w3c.github.io/html-aam/#el-footer-ancestorbody
  //   - Aside: https://w3c.github.io/html-aam/#el-aside-ancestorbodymain
  return chunk007.cache.get('sectioningContentPlusMainSelector', () => {
    return getSectioningContentSelector() + ' , main:not([role]), [role=main]';
  });
};

// sectioning elements only have an accessible name if the
// aria-label, aria-labelledby, or title attribute has valid
// content.
// can't go through the normal accessible name computation
// as it leads into an infinite loop of asking for the role
// of the element while the implicit role needs the name.
// Source: https://www.w3.org/TR/html-aam-1.0/#section-and-grouping-element-accessible-name-computation
//
// form elements also follow this same pattern although not
// specifically called out in the spec like section elements
// (per Scott O'Hara)
// Source: https://web-a11y.slack.com/archives/C042TSFGN/p1590607895241100?thread_ts=1590602189.217800&cid=C042TSFGN
//
// `checkTitle` means - also check the title attribute and
// return true if the node has a non-empty title
function hasAccessibleName$1(vNode, { checkTitle = false } = {}) {
  // testing for when browsers give a <section> a region role:
  // chrome - always a region role
  // firefox - if non-empty aria-labelledby, aria-label, or title
  // safari - if non-empty aria-labelledby or aria-label
  //
  // we will go with safaris implementation as it is the least common
  // denominator
  return !!(
    chunk012.sanitize(arialabelledbyText(vNode)) ||
    chunk012.sanitize(arialabelText(vNode)) ||
    (checkTitle && vNode?.props.nodeType === 1 && chunk012.sanitize(vNode.attr('title')))
  );
}

const implicitHtmlRoles = {
  a: vNode => {
    return vNode.hasAttr('href') ? 'link' : null;
  },
  area: vNode => {
    return vNode.hasAttr('href') ? 'link' : null;
  },
  article: 'article',
  aside: vNode => {
    if (
      chunk011.closest(vNode.parent, getSectioningContentSelector()) &&
      // An aside within sectioning content can still be mapped to
      // role=complementary if it has an accessible name
      !hasAccessibleName$1(vNode, { checkTitle: true })
    ) {
      return null;
    }

    return 'complementary';
  },
  body: 'document',
  button: 'button',
  datalist: 'listbox',
  dd: 'definition',
  dfn: 'term',
  details: 'group',
  dialog: 'dialog',
  dt: 'term',
  fieldset: 'group',
  figure: 'figure',
  footer: vNode => {
    const sectioningElement = chunk011.closest(
      vNode,
      getSectioningContentPlusMainSelector()
    );

    return !sectioningElement ? 'contentinfo' : null;
  },
  form: vNode => {
    return hasAccessibleName$1(vNode) ? 'form' : null;
  },
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  h5: 'heading',
  h6: 'heading',
  header: vNode => {
    const sectioningElement = chunk011.closest(
      vNode,
      getSectioningContentPlusMainSelector()
    );

    return !sectioningElement ? 'banner' : null;
  },
  hr: 'separator',
  img: vNode => {
    // an images role is considered implicitly presentation if the
    // alt attribute is empty. But that shouldn't be the case if it
    // has global aria attributes or is focusable, so we need to
    // override the role back to `img`
    // e.g. <img alt="" aria-label="foo"></img>
    const emptyAlt = vNode.hasAttr('alt') && !vNode.attr('alt');
    const hasGlobalAria = getGlobalAriaAttrs().find(attr =>
      vNode.hasAttr(attr)
    );

    return emptyAlt && !hasGlobalAria && !isFocusable(vNode)
      ? 'presentation'
      : 'img';
  },
  input: vNode => {
    // Source: https://www.w3.org/TR/html52/sec-forms.html#suggestions-source-element
    let suggestionsSourceElement;
    if (vNode.hasAttr('list')) {
      const listElement = idrefs(vNode.actualNode, 'list').filter(
        node => !!node
      )[0];
      suggestionsSourceElement =
        listElement && listElement.nodeName.toLowerCase() === 'datalist';
    }

    switch (vNode.props.type) {
      case 'checkbox':
        return 'checkbox';
      case 'number':
        return 'spinbutton';
      case 'radio':
        return 'radio';
      case 'range':
        return 'slider';
      case 'search':
        return !suggestionsSourceElement ? 'searchbox' : 'combobox';

      case 'button':
      case 'image':
      case 'reset':
      case 'submit':
        return 'button';

      case 'text':
      case 'tel':
      case 'url':
      case 'email':
      case '':
        return !suggestionsSourceElement ? 'textbox' : 'combobox';

      default:
        return 'textbox';
    }
  },
  // Note: if an li (or some other elms) do not have a required
  // parent, Firefox ignores the implicit semantic role and treats
  // it as a generic text.
  li: 'listitem',
  main: 'main',
  math: 'math',
  menu: 'list',
  meter: 'meter',
  nav: 'navigation',
  ol: 'list',
  optgroup: 'group',
  option: 'option',
  output: 'status',
  progress: 'progressbar',
  search: 'search',
  section: vNode => {
    return hasAccessibleName$1(vNode) ? 'region' : null;
  },
  select: vNode => {
    return vNode.hasAttr('multiple') || parseInt(vNode.attr('size')) > 1
      ? 'listbox'
      : 'combobox';
  },
  summary: 'button',
  table: 'table',
  tbody: 'rowgroup',
  td: vNode => {
    const table = chunk011.closest(vNode, 'table');
    const role = getExplicitRole(table);

    return ['grid', 'treegrid'].includes(role) ? 'gridcell' : 'cell';
  },
  textarea: 'textbox',
  tfoot: 'rowgroup',
  th: vNode => {
    if (isColumnHeader(vNode)) {
      return 'columnheader';
    }
    if (isRowHeader(vNode)) {
      return 'rowheader';
    }
  },
  thead: 'rowgroup',
  tr: 'row',
  ul: 'list'
};

/**
 * Check if a virtual node has a non-empty accessible name
 *``
 * Note: matches.hasAccessibleName(vNode, true) can be indirectly used through
 * matches(vNode, { hasAccessibleName: boolean })
 *
 * Example:
 * ```js
 * matches.hasAccessibleName(vNode, true);
 * matches.hasAccessibleName(vNode, false);
 *
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function hasAccessibleName(vNode, matcher) {
  return chunk012.fromPrimative(!!accessibleTextVirtual(vNode), matcher);
}

/**
 * Check if a virtual node matches some attribute(s)
 *
 * Note: matches.attributes(vNode, matcher) can be indirectly used through
 * matches(vNode, { attributes: matcher })
 *
 * Example:
 * ```js
 * matches.attributes(vNode, {
 *   'aria-live': 'assertive', // Simple string match
 *   'aria-expanded': /true|false/i, // either boolean, case insensitive
 * })
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
function attributes(vNode, matcher) {
  vNode = chunk013.nodeLookup(vNode).vNode;
  return chunk012.fromFunction(attrName => vNode.attr(attrName), matcher);
}

/**
 * Check if a virtual node matches an explicit role(s)
 *``
 * Note: matches.explicitRole(vNode, matcher) can be indirectly used through
 * matches(vNode, { explicitRole: matcher })
 *
 * Example:
 * ```js
 * matches.explicitRole(vNode, ['combobox', 'textbox']);
 * matches.explicitRole(vNode, 'combobox');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function explicitRole(vNode, matcher) {
  return chunk012.fromPrimative(getExplicitRole(vNode), matcher);
}

/**
 * Check if a virtual node matches an implicit role(s)
 *``
 * Note: matches.implicitRole(vNode, matcher) can be indirectly used through
 * matches(vNode, { implicitRole: matcher })
 *
 * Example:
 * ```js
 * matches.implicitRole(vNode, ['combobox', 'textbox']);
 * matches.implicitRole(vNode, 'combobox');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function implicitRole$1(vNode, matcher) {
  return chunk012.fromPrimative(implicitRole(vNode), matcher);
}

/**
 * Check if the nodeName of a virtual node matches some value.
 *
 * Note: matches.nodeName(vNode, matcher) can be indirectly used through
 * matches(vNode, { nodeName: matcher })
 *
 * Example:
 * ```js
 * matches.nodeName(vNode, ['div', 'span'])
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} Attribute matcher
 * @returns {Boolean}
 */
function nodeName(vNode, matcher) {
  vNode = chunk013.nodeLookup(vNode).vNode;
  return chunk012.fromPrimative(vNode.props.nodeName, matcher);
}

/**
 * Check if a virtual node matches some attribute(s)
 *
 * Note: matches.properties(vNode, matcher) can be indirectly used through
 * matches(vNode, { properties: matcher })
 *
 * Example:
 * ```js
 * matches.properties(vNode, {
 *   type: 'text', // Simple string match
 *   value: value => value.trim() !== '', // None-empty value, using a function matcher
 * })
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function properties(vNode, matcher) {
  vNode = chunk013.nodeLookup(vNode).vNode;
  return chunk012.fromFunction(propName => vNode.props[propName], matcher);
}

/**
 * Check if a virtual node matches an semantic role(s)
 *``
 * Note: matches.semanticRole(vNode, matcher) can be indirectly used through
 * matches(vNode, { semanticRole: matcher })
 *
 * Example:
 * ```js
 * matches.semanticRole(vNode, ['combobox', 'textbox']);
 * matches.semanticRole(vNode, 'combobox');
 * ```
 *
 * @param {VirtualNode} vNode
 * @param {Object} matcher
 * @returns {Boolean}
 */
function semanticRole(vNode, matcher) {
  return chunk012.fromPrimative(getRole(vNode), matcher);
}

const matchers = {
  hasAccessibleName,
  attributes,
  condition: chunk012.condition,
  explicitRole,
  implicitRole: implicitRole$1,
  nodeName,
  properties,
  semanticRole
};

/**
 * Check if a virtual node matches some definition
 *
 * Note: matches.fromDefinition(vNode, definition) can be indirectly used through
 * matches(vNode, definition)
 *
 * Example:
 * ```js
 * matches.fromDefinition(vNode, {
 *   nodeName: ['div', 'span']
 *   attributes: {
 *     'aria-live': 'assertive'
 *   }
 * })
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @private
 * @param {HTMLElement|VirtualNode} vNode
 * @param {Object|Array<Object>} definition
 * @returns {Boolean}
 */
function fromDefinition(vNode, definition) {
  vNode = chunk013.nodeLookup(vNode).vNode;

  if (Array.isArray(definition)) {
    return definition.some(definitionItem =>
      fromDefinition(vNode, definitionItem)
    );
  }
  if (typeof definition === 'string') {
    return chunk011.matches(vNode, definition);
  }

  return Object.keys(definition).every(matcherName => {
    if (!matchers[matcherName]) {
      throw new Error(`Unknown matcher type "${matcherName}"`);
    }
    // Find the specific matches method to.
    // matches.attributes, matches.nodeName, matches.properties, etc.
    const matchMethod = matchers[matcherName];

    // Find the matcher that goes into the matches method.
    // 'div', /^div$/, (str) => str === 'div', etc.
    const matcher = definition[matcherName];
    return matchMethod(vNode, matcher);
  });
}

/**
 * Check if a virtual node matches a definition
 *
 * Example:
 * ```js
 * // Match a single nodeName:
 * axe.commons.matches(vNode, 'div')
 *
 * // Match one of multiple nodeNames:
 * axe.commons.matches(vNode, ['ul', 'ol'])
 *
 * // Match a node with nodeName 'button' and with aria-hidden: true:
 * axe.commons.matches(vNode, {
 *   nodeName: 'button',
 *   attributes: { 'aria-hidden': 'true' }
 * })
 *
 * // Mixed input. Match button nodeName, input[type=button] and input[type=reset]
 * axe.commons.matches(vNode, ['button', {
 *  nodeName: 'input', // nodeName match isn't case sensitive
 *  properties: { type: ['button', 'reset'] }
 * }])
 * ```
 *
 * @deprecated HTMLElement is deprecated, use VirtualNode instead
 *
 * @namespace matches
 * @memberof axe.commons
 * @param {HTMLElement|VirtualNode} vNode virtual node to verify attributes against constraints
 * @param {Array<ElementDefinition>|String|Object|Function|Regex} definition
 * @return {Boolean} true/ false based on if vNode passes the constraints expected
 */
function matches(vNode, definition) {
  return fromDefinition(vNode, definition);
}

/**
 * Namespace for matching utilities.
 * @namespace commons.matches
 * @memberof axe
 */

matches.hasAccessibleName = hasAccessibleName;
matches.attributes = attributes;
matches.condition = chunk012.condition;
matches.explicitRole = explicitRole;
matches.fromDefinition = fromDefinition;
matches.fromFunction = chunk012.fromFunction;
matches.fromPrimative = chunk012.fromPrimative;
matches.implicitRole = implicitRole$1;
matches.nodeName = nodeName;
matches.properties = properties;
matches.semanticRole = semanticRole;

/**
 * Return the spec for an HTML element from the standards object. Since the spec is determined by the node and what attributes it has, a node is required.
 * @param {VirtualNode} vNode The VirtualNode to get the spec for.
 * @return {Object} The standard spec object
 */
function getElementSpec(vNode, { noMatchAccessibleName = false } = {}) {
  const standard = standards.htmlElms[vNode.props.nodeName];

  // invalid element name (could be an svg or custom element name)
  if (!standard) {
    return {};
  }

  if (!standard.variant) {
    return standard;
  }

  // start with the information at the top level
  const { variant, ...spec } = standard;

  // loop through all variants (excluding default) finding anything
  // that matches
  for (const variantName in variant) {
    if (!variant.hasOwnProperty(variantName) || variantName === 'default') {
      continue;
    }

    const { matches: matches$1, ...props } = variant[variantName];
    const matchProperties = Array.isArray(matches$1) ? matches$1 : [matches$1];
    for (let i = 0; i < matchProperties.length && noMatchAccessibleName; i++) {
      if (matchProperties[i].hasOwnProperty('hasAccessibleName')) {
        return standard;
      }
    }

    if (matches(vNode, matches$1)) {
      for (const propName in props) {
        if (props.hasOwnProperty(propName)) {
          spec[propName] = props[propName];
        }
      }
    }
  }

  // apply defaults if properties were not found
  for (const propName in variant.default) {
    if (
      variant.default.hasOwnProperty(propName) &&
      typeof spec[propName] === 'undefined'
    ) {
      spec[propName] = variant.default[propName];
    }
  }

  return spec;
}

/**
 * Get the implicit role for a given node
 * @method implicitRole
 * @memberof axe.commons.aria
 * @instance
 * @param {HTMLElement|VirtualNode} node The node to test
 * @return {Mixed} Either the role or `null` if there is none
 */
function implicitRole(node, { chromium } = {}) {
  const vNode =
    node instanceof chunk007.AbstractVirtualNode ? node : chunk010.getNodeFromTree(node);
  node = vNode.actualNode;

  // this error is only thrown if the virtual tree is not a
  // complete tree, which only happens in linting and if a
  // user used `getFlattenedTree` manually on a subset of the
  // DOM tree
  if (!vNode) {
    throw new ReferenceError(
      'Cannot get implicit role of a node outside the current scope.'
    );
  }

  const nodeName = vNode.props.nodeName;
  const role = implicitHtmlRoles[nodeName];

  if (!role && chromium) {
    const { chromiumRole } = getElementSpec(vNode);
    return chromiumRole || null;
  }

  if (typeof role === 'function') {
    return role(vNode);
  }

  return role || null;
}

// when an element inherits the presentational role from a parent
// is not defined in the spec, but through testing it seems to be
// when a specific HTML parent relationship is required and that
// parent has `role=presentation`, then the child inherits the
// role (i.e. table, ul, dl). Further testing has shown that
// intermediate elements (such as divs) break this chain only in
// Chrome.
//
// Also, any nested structure chains reset the role (so two nested
// lists with the topmost list role=none will not cause the nested
// list to inherit the role=none).
//
// from Scott O'Hara:
//
// "the expectation for me, in standard html is that element
// structures that require specific parent/child relationships,
// if the parent is set to presentational that should set the
// children to presentational.  ala, tables and lists."
// "but outside of those specific constructs, i would not expect
// role=presentation to do anything to child element roles"
const inheritsPresentationChain = {
  // valid parent elements, any other element will prevent any
  // children from inheriting a presentational role from a valid
  // ancestor
  td: ['tr'],
  th: ['tr'],
  tr: ['thead', 'tbody', 'tfoot', 'table'],
  thead: ['table'],
  tbody: ['table'],
  tfoot: ['table'],
  li: ['ol', 'ul'],
  // dts and dds can be wrapped in divs and the div will pass through
  // the presentation role
  dt: ['dl', 'div'],
  dd: ['dl', 'div'],
  div: ['dl']
};

// role presentation inheritance.
// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
function getInheritedRole(vNode, explicitRoleOptions) {
  const parentNodeNames = inheritsPresentationChain[vNode.props.nodeName];
  if (!parentNodeNames) {
    return null;
  }

  // if we can't look at the parent then we can't know if the node
  // inherits the presentational role or not
  if (!vNode.parent) {
    if (!vNode.actualNode) {
      return null;
    }

    throw new ReferenceError(
      'Cannot determine role presentational inheritance of a required parent outside the current scope.'
    );
  }

  // parent is not a valid ancestor that can inherit presentation
  if (!parentNodeNames.includes(vNode.parent.props.nodeName)) {
    return null;
  }

  const parentRole = getExplicitRole(vNode.parent, explicitRoleOptions);
  if (
    ['none', 'presentation'].includes(parentRole) &&
    !hasConflictResolution(vNode.parent)
  ) {
    return parentRole;
  }

  // an explicit role of anything other than presentational will
  // prevent any children from inheriting a presentational role
  // from a valid ancestor
  if (parentRole) {
    return null;
  }

  return getInheritedRole(vNode.parent, explicitRoleOptions);
}

function resolveImplicitRole(vNode, { chromium, ...explicitRoleOptions }) {
  const implicitRole$1 = implicitRole(vNode, {
    chromium
  });

  if (!implicitRole$1) {
    return null;
  }

  const presentationalRole = getInheritedRole(vNode, explicitRoleOptions);
  if (presentationalRole) {
    return presentationalRole;
  }

  return implicitRole$1;
}

// role conflict resolution
// note: Chrome returns a list with resolved role as "generic"
// instead of as a list
// (e.g. <ul role="none" aria-label><li>hello</li></ul>)
// we will return it as a list as that is the best option.
// Source: https://www.w3.org/TR/wai-aria-1.1/#conflict_resolution_presentation_none
// See also: https://github.com/w3c/aria/issues/1270
function hasConflictResolution(vNode) {
  const hasGlobalAria = getGlobalAriaAttrs().some(attr => vNode.hasAttr(attr));
  return hasGlobalAria || isFocusable(vNode);
}

/**
 *
 * @method resolveRole
 * @param {Element|VirtualNode} node
 * @param {Object} options
 * @see getRole for option details
 * @returns {string|null} Role or null
 * @deprecated noImplicit option is deprecated. Use aria.getExplicitRole instead.
 */
function resolveRole(node, { noImplicit, ...roleOptions } = {}) {
  const { vNode } = chunk013.nodeLookup(node);
  if (vNode.props.nodeType !== 1) {
    return null;
  }

  const explicitRole = getExplicitRole(vNode, roleOptions);

  if (!explicitRole) {
    return noImplicit ? null : resolveImplicitRole(vNode, roleOptions);
  }

  if (!['presentation', 'none'].includes(explicitRole)) {
    return explicitRole;
  }

  if (hasConflictResolution(vNode)) {
    // return null if there is a conflict resolution but no implicit
    // has been set as the explicit role is not the true role
    return noImplicit ? null : resolveImplicitRole(vNode, roleOptions);
  }

  // role presentation or none and no conflict resolution
  return explicitRole;
}

/**
 * Return the semantic role of an element.
 *
 * @method getRole
 * @memberof axe.commons.aria
 * @instance
 * @param {Element|VirtualNode} node
 * @param {Object} options
 * @param {boolean} options.noImplicit  Do not return the implicit role // @deprecated
 * @param {boolean} options.fallback  Allow fallback roles
 * @param {boolean} options.abstracts  Allow role to be abstract
 * @param {boolean} options.dpub  Allow role to be any (valid) doc-* roles
 * @param {boolean} options.noPresentational return null if role is presentation or none
 * @param {boolean} options.chromium Include implicit roles from chromium-based browsers in role result
 * @returns {string|null} Role or null
 *
 * @deprecated noImplicit option is deprecated. Use aria.getExplicitRole instead.
 */
function getRole(node, { noPresentational, ...options } = {}) {
  const role = resolveRole(node, options);

  if (noPresentational && ['presentation', 'none'].includes(role)) {
    return null;
  }

  return role;
}

const alwaysTitleElements = ['iframe'];

/**
 * Get title text
 * @param {HTMLElement|VirtualNode}node the node to verify
 * @return {String}
 */
function titleText(node) {
  const { vNode } = chunk013.nodeLookup(node);

  if (vNode.props.nodeType !== 1 || !node.hasAttr('title')) {
    return '';
  }

  // Some elements return the title even with role=presentation
  // This does appear in any spec, but its remarkably consistent
  if (
    !matches(vNode, alwaysTitleElements) &&
    ['none', 'presentation'].includes(getRole(vNode))
  ) {
    return '';
  }

  return vNode.attr('title');
}

/**
 * Check if an element is named from contents
 *
 * @param {Node|VirtualNode} element
 * @param {Object} options
 * @property {Bool} strict Whether or not to follow the spects strictly
 * @return {Bool}
 */
function namedFromContents(vNode, { strict } = {}) {
  vNode = vNode instanceof chunk007.AbstractVirtualNode ? vNode : chunk010.getNodeFromTree(vNode);
  if (vNode.props.nodeType !== 1) {
    return false;
  }

  const role = getRole(vNode);
  const roleDef = standards.ariaRoles[role];

  if (roleDef && roleDef.nameFromContent) {
    return true;
  }

  /**
   * Note: Strictly speaking if the role is null, presentation, or none, the element
   * isn't named from contents. Axe-core often needs to know if an element
   * has content anyway, so we're allowing it here.
   * Use { strict: true } to disable this behavior.
   */
  if (strict) {
    return false;
  }
  return !roleDef || ['presentation', 'none'].includes(role);
}

/**
 * Get an element's owned elements
 *
 * @param {VirtualNode} element
 * @return {VirtualNode[]} Owned elements
 */
function getOwnedVirtual(virtualNode) {
  const { actualNode, children } = virtualNode;
  if (!children) {
    throw new Error('getOwnedVirtual requires a virtual node');
  }
  // TODO: Check that the element has a role
  // TODO: Descend into children with role=presentation|none
  // TODO: Exclude descendents owned by other elements
  if (virtualNode.hasAttr('aria-owns')) {
    const owns = idrefs(actualNode, 'aria-owns')
      .filter(element => !!element)
      .map(element => chunk007.axe.utils.getNodeFromTree(element));

    // Deduplicates by first occurrence to match browser accessibility tree behavior
    // See: https://github.com/dequelabs/axe-core/pull/4987
    const uniqueOwns = owns.filter((own, index) => owns.indexOf(own) === index);
    const nativeChildren = children.filter(
      child => !uniqueOwns.includes(child)
    );

    return [...nativeChildren, ...uniqueOwns];
  }

  return [...children];
}

/**
 * Determine if an element is visible to a screen reader
 * @method isVisibleToScreenReaders
 * @memberof axe.commons.dom
 * @param {VirtualNode} vNode The Virtual Node
 * @return {Boolean} True if the element is visible to a screen reader
 */
function isVisibleToScreenReaders(vNode) {
  vNode = chunk013.nodeLookup(vNode).vNode;
  return isVisibleToScreenReadersVirtual(vNode);
}

/**
 * Check the element and ancestors
 */
const isVisibleToScreenReadersVirtual = chunk010.memoizeImplementation(
  function isVisibleToScreenReadersMemoized(vNode, isAncestor) {
    if (
      ariaHidden(vNode) ||
      isInert(vNode, { skipAncestors: true, isAncestor })
    ) {
      return false;
    }

    if (vNode.actualNode && vNode.props.nodeName === 'area') {
      return !areaHidden(vNode, isVisibleToScreenReadersVirtual);
    }

    if (isHiddenForEveryone(vNode, { skipAncestors: true, isAncestor })) {
      return false;
    }

    if (!vNode.parent) {
      return true;
    }

    return isVisibleToScreenReadersVirtual(vNode.parent, true);
  }
);

/**
 * Returns the visible text of the virtual node
 * NOTE: when calculating the text or accessible text of a node that includes shadow
 * roots attached to it or its children, the flattened tree must be considered
 * rather than the "light DOM"
 * @method visibleVirtual
 * @memberof axe.commons.text
 * @instance
 * @param  {VirtualNode} element
 * @param  {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param  {Boolean} noRecursing When False, the result will contain text from the element and it's children.
 * When True, the result will only contain text from the element
 * @return {String}
 */
function visibleVirtual(element, screenReader, noRecursing) {
  const { vNode } = chunk013.nodeLookup(element);
  const visibleMethod = screenReader
    ? isVisibleToScreenReaders
    : isVisibleOnScreen;

  // if the element does not have an actual node treat it as if
  // it is visible
  const visible =
    !element.actualNode || (element.actualNode && visibleMethod(element));

  const result = vNode.children
    .map(child => {
      const { nodeType, nodeValue } = child.props;
      if (nodeType === 3) {
        // filter on text nodes
        if (nodeValue && visible) {
          return nodeValue;
        }
      } else if (!noRecursing) {
        return visibleVirtual(child, screenReader);
      }
    })
    .join('');
  return chunk012.sanitize(result);
}

const nonTextInputTypes = [
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'password',
  'radio',
  'reset',
  'submit'
];

/**
 * Determines if an element is a native textbox element
 * @method isNativeTextbox
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if textbox
 * @returns {Bool}
 */
function isNativeTextbox(node) {
  node = node instanceof chunk007.AbstractVirtualNode ? node : chunk010.getNodeFromTree(node);
  const nodeName = node.props.nodeName;
  return (
    nodeName === 'textarea' ||
    (nodeName === 'input' &&
      !nonTextInputTypes.includes((node.attr('type') || '').toLowerCase()))
  );
}

/**
 * Determines if an element is a native select element
 * @method isNativeSelect
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if select
 * @returns {Bool}
 */
function isNativeSelect(node) {
  node = node instanceof chunk007.AbstractVirtualNode ? node : chunk010.getNodeFromTree(node);
  const nodeName = node.props.nodeName;
  return nodeName === 'select';
}

/**
 * Determines if an element is an aria textbox element
 * @method isAriaTextbox
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if aria textbox
 * @returns {Bool}
 */
function isAriaTextbox(node) {
  const role = getExplicitRole(node);
  return role === 'textbox';
}

/**
 * Determines if an element is an aria listbox element
 * @method isAriaListbox
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if aria listbox
 * @returns {Bool}
 */
function isAriaListbox(node) {
  const role = getExplicitRole(node);
  return role === 'listbox';
}

/**
 * Determines if an element is an aria combobox element
 * @method isAriaCombobox
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if aria combobox
 * @returns {Bool}
 */
function isAriaCombobox(node) {
  const role = getExplicitRole(node);
  return role === 'combobox';
}

const rangeRoles = ['progressbar', 'scrollbar', 'slider', 'spinbutton'];

/**
 * Determines if an element is an aria range element
 * @method isAriaRange
 * @memberof axe.commons.forms
 * @param {VirtualNode|Element} node Node to determine if aria range
 * @returns {Bool}
 */
function isAriaRange(node) {
  const role = getExplicitRole(node);
  return rangeRoles.includes(role);
}

const controlValueRoles = [
  'textbox',
  'progressbar',
  'scrollbar',
  'slider',
  'spinbutton',
  'combobox',
  'listbox'
];

const formControlValueMethods = {
  nativeTextboxValue,
  nativeSelectValue,
  ariaTextboxValue,
  ariaListboxValue,
  ariaComboboxValue,
  ariaRangeValue
};

/**
 * Calculate value of a form control
 *
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @param {Object} context
 * @property {Element} startNode First node in accessible name computation
 * @property {String[]} unsupported List of roles where value computation is unsupported
 * @property {Bool} debug Enable logging for formControlValue
 * @return {string} The calculated value
 */
function formControlValue(virtualNode, context = {}) {
  const { actualNode } = virtualNode;
  const unsupportedRoles = chunk012.unsupported.accessibleNameFromFieldValue || [];
  const role = getRole(virtualNode);

  if (
    // For the targeted node, the accessible name is never the value:
    context.startNode === virtualNode ||
    // Only elements with a certain role can return their value
    !controlValueRoles.includes(role) ||
    // Skip unsupported roles
    unsupportedRoles.includes(role)
  ) {
    return '';
  }

  // Object.values:
  const valueMethods = Object.keys(formControlValueMethods).map(
    name => formControlValueMethods[name]
  );

  // Return the value of the first step that returns with text
  const valueString = valueMethods.reduce((accName, step) => {
    return accName || step(virtualNode, context);
  }, '');

  if (context.debug) {
    chunk011.log(valueString || '{empty-value}', actualNode, context);
  }
  return valueString;
}

/**
 * Calculate value of a native textbox element (input and textarea)
 *
 * @param {VirtualNode|Element} element The element whose value we want
 * @return {string} The calculated value
 */
function nativeTextboxValue(node) {
  const { vNode } = chunk013.nodeLookup(node);
  if (isNativeTextbox(vNode)) {
    return vNode.props.value || '';
  }
  return '';
}

/**
 * Calculate value of a select element
 *
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
function nativeSelectValue(node) {
  const { vNode } = chunk013.nodeLookup(node);
  if (!isNativeSelect(vNode)) {
    return '';
  }

  const options = chunk014.querySelectorAll(vNode, 'option');
  const selectedOptions = options.filter(option => option.props.selected);

  // browser automatically selects the first option
  if (!selectedOptions.length) {
    selectedOptions.push(options[0]);
  }

  return selectedOptions.map(option => visibleVirtual(option)).join(' ') || '';
}

/**
 * Calculate value of a an element with role=textbox
 *
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
function ariaTextboxValue(node) {
  const { vNode, domNode } = chunk013.nodeLookup(node);
  if (!isAriaTextbox(vNode)) {
    return '';
  }
  if (!domNode || (domNode && !isHiddenForEveryone(domNode))) {
    return visibleVirtual(vNode, true);
  } else {
    return domNode.textContent;
  }
}

/**
 * Calculate value of an element with role=combobox or role=listbox
 *
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @param {Object} context The VirtualNode instance whose value we want
 * @property {Element} startNode First node in accessible name computation
 * @property {String[]} unsupported List of roles where value computation is unsupported
 * @property {Bool} debug Enable logging for formControlValue
 * @return {string} The calculated value
 */
function ariaListboxValue(node, context) {
  const { vNode } = chunk013.nodeLookup(node);
  if (!isAriaListbox(vNode)) {
    return '';
  }

  const selected = getOwnedVirtual(vNode).filter(
    owned =>
      getRole(owned) === 'option' && owned.attr('aria-selected') === 'true'
  );

  if (selected.length === 0) {
    return '';
  }
  // Note: Even with aria-multiselectable, only the first value will be used
  // in the accessible name. This isn't spec'ed out, but seems to be how all
  // browser behave.
  return accessibleTextVirtual(selected[0], context);
}

/**
 * Calculate value of an element with role=combobox or role=listbox
 *
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @param {Object} context The VirtualNode instance whose value we want
 * @property {Element} startNode First node in accessible name computation
 * @property {String[]} unsupported List of roles where value computation is unsupported
 * @property {Bool} debug Enable logging for formControlValue
 * @return {string} The calculated value
 */
function ariaComboboxValue(node, context) {
  const { vNode } = chunk013.nodeLookup(node);
  // For combobox, find the first owned listbox:
  if (!isAriaCombobox(vNode)) {
    return '';
  }
  const listbox = getOwnedVirtual(vNode).filter(
    elm => getRole(elm) === 'listbox'
  )[0];

  return listbox ? ariaListboxValue(listbox, context) : '';
}

/**
 * Calculate value of an element with range-type role
 *
 * @param {VirtualNode|Node} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
function ariaRangeValue(node) {
  const { vNode } = chunk013.nodeLookup(node);
  if (!isAriaRange(vNode) || !vNode.hasAttr('aria-valuenow')) {
    return '';
  }
  // Validate the number, if not, return 0.
  // Chrome 70 typecasts this, Firefox 62 does not
  const valueNow = +vNode.attr('aria-valuenow');
  return !isNaN(valueNow) ? String(valueNow) : '0';
}

/**
 * Get the accessible text for an element that can get its name from content
 *
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} strict Should the name computation strictly follow AccName 1.1
 * @return {String} Accessible text
 */
function subtreeText(virtualNode, context = {}) {
  const { alreadyProcessed } = accessibleTextVirtual;
  context.startNode = context.startNode || virtualNode;
  const { strict, inControlContext, inLabelledByContext } = context;
  const role = getRole(virtualNode);
  const { contentTypes } = getElementSpec(virtualNode, {
    noMatchAccessibleName: true
  });
  if (
    alreadyProcessed(virtualNode, context) ||
    virtualNode.props.nodeType !== 1 ||
    contentTypes?.includes('embedded') || // canvas, video, etc
    controlValueRoles.includes(role)
  ) {
    return '';
  }

  if (
    !context.subtreeDescendant &&
    !context.inLabelledByContext &&
    !namedFromContents(virtualNode, { strict })
  ) {
    return '';
  }

  /**
   * Note: Strictly speaking if a child isn't named from content and it has no accessible name
   * accName says to ignore it. Browsers do this fairly consistently, but screen readers have
   * chosen to ignore this, but only for direct content, not for labels / aria-labelledby.
   * That way in `a[href] > article > #text` the text is used for the accessible name,
   * See: https://github.com/dequelabs/axe-core/issues/1461
   * See: https://github.com/w3c/accname/issues/120
   */
  if (!strict) {
    const subtreeDescendant = !inControlContext && !inLabelledByContext;
    context = { subtreeDescendant, ...context };
  }

  return getOwnedVirtual(virtualNode).reduce((contentText, child) => {
    return appendAccessibleText(contentText, child, context);
  }, '');
}

const phrasingElements = getElementsByContentType('phrasing').concat(['#text']);

function appendAccessibleText(contentText, virtualNode, context) {
  const nodeName = virtualNode.props.nodeName;
  let contentTextAdd = accessibleTextVirtual(virtualNode, context);
  if (!contentTextAdd) {
    return contentText;
  }

  if (!phrasingElements.includes(nodeName)) {
    // Append space, if necessary
    if (contentTextAdd[0] !== ' ') {
      contentTextAdd += ' ';
    }
    // Prepend space, if necessary
    if (contentText && contentText[contentText.length - 1] !== ' ') {
      contentTextAdd = ' ' + contentTextAdd;
    }
  }
  return contentText + contentTextAdd;
}

/**
 * Return accessible text for an implicit and/or explicit HTML label element
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {String} Label text
 */
function labelText(virtualNode, context = {}) {
  const { alreadyProcessed } = accessibleTextVirtual;
  if (
    context.inControlContext ||
    context.inLabelledByContext ||
    alreadyProcessed(virtualNode, context)
  ) {
    return '';
  }
  if (!context.startNode) {
    context.startNode = virtualNode;
  }

  const labelContext = { inControlContext: true, ...context };
  const explicitLabels = getExplicitLabels(virtualNode);
  const implicitLabel = chunk011.closest(virtualNode, 'label');

  let labels;
  if (implicitLabel) {
    labels = [...explicitLabels, implicitLabel.actualNode];
    labels.sort(chunk013.nodeSorter);
  } else {
    labels = explicitLabels;
  }

  return labels
    .map(label => accessibleText(label, labelContext))
    .filter(text => text !== '')
    .join(' ');
}

/**
 * Find a non-ARIA label for an element
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose label we are seeking
 * @return {HTMLElement} The label element, or null if none is found
 */
function getExplicitLabels(virtualNode) {
  if (!virtualNode.attr('id')) {
    return [];
  }

  if (!virtualNode.actualNode) {
    throw new TypeError(
      'Cannot resolve explicit label reference for non-DOM nodes'
    );
  }

  return findElmsInContext({
    elm: 'label',
    attr: 'for',
    value: virtualNode.attr('id'),
    context: virtualNode.actualNode
  });
}

const defaultButtonValues = {
  submit: 'Submit',
  image: 'Submit',
  reset: 'Reset',
  button: '' // No default for "button"
};

const nativeTextMethods = {
  /**
   * Return the value of a DOM node
   * @param {VirtualNode} element
   * @return {String} value text
   */
  valueText: vNode => vNode.props.value || '',

  /**
   * Return default value of a button
   * @param {VirtualNode} element
   * @return {String} default button text
   */
  buttonDefaultText: vNode => defaultButtonValues[vNode.props.type] || '',

  /**
   * Return caption text of an HTML table element
   * @param {VirtualNode} element
   * @param {Object} context
   * @return {String} caption text
   */
  tableCaptionText: descendantText.bind(null, 'caption'),

  /**
   * Return figcaption text of an HTML figure element
   * @param {VirtualNode} element
   * @param {Object} context
   * @return {String} figcaption text
   */
  figureText: descendantText.bind(null, 'figcaption'),

  /**
   * Return figcaption text of an HTML figure element
   * @param {VirtualNode} element
   * @param {Object} context
   * @return {String} figcaption text
   */
  svgTitleText: descendantText.bind(null, 'title'),

  /**
   * Return legend text of an HTML fieldset element
   * @param {VirtualNode} element
   * @param {Object} context
   * @return {String} legend text
   */
  fieldsetLegendText: descendantText.bind(null, 'legend'),

  /**
   * Return the alt text
   * @param {VirtualNode} element
   * @return {String} alt text
   */
  altText: attrText.bind(null, 'alt'),

  /**
   * Return summary text for an HTML table element
   * @param {VirtualNode} element
   * @return {String} summary text
   */
  tableSummaryText: attrText.bind(null, 'summary'),

  /**
   * Return the title text
   * @param {VirtualNode} element
   * @return {String} title text
   */
  titleText,

  /**
   * Return accessible text of the subtree
   * @param {VirtualNode} element
   * @param {Object} context
   * @return {String} Subtree text
   */
  subtreeText,

  /**
   * Return accessible text for an implicit and/or explicit HTML label element
   * @param {VirtualNode} element
   * @param {Object} context
   * @return {String} Label text
   */
  labelText,

  /**
   * Return a single space
   * @return {String} Returns ` `
   */
  singleSpace: function singleSpace() {
    return ' ';
  },

  /**
   * Return the placeholder text
   * @param {VirtualNode} element
   * @return {String} placeholder text
   */
  placeholderText: attrText.bind(null, 'placeholder')
};

function attrText(attr, vNode) {
  return vNode.attr(attr) || '';
}

/**
 * Get the accessible text of first matching node
 * IMPORTANT: This method does not look at the composed tree
 * @private
 */
function descendantText(nodeName, { actualNode }, context) {
  nodeName = nodeName.toLowerCase();
  // Prevent accidently getting the nested element, like:
  // fieldset > fielset > legend (1st fieldset has no legend)
  const nodeNames = [nodeName, actualNode.nodeName.toLowerCase()].join(',');
  const candidate = actualNode.querySelector(nodeNames);

  if (!candidate || candidate.nodeName.toLowerCase() !== nodeName) {
    return '';
  }
  return accessibleText(candidate, context);
}

/**
 * Get the accessible text using native HTML methods only
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} debug Enable logging for formControlValue
 * @return {String} Accessible text
 */
function nativeTextAlternative(virtualNode, context = {}) {
  const { actualNode } = virtualNode;
  if (
    virtualNode.props.nodeType !== 1 ||
    ['presentation', 'none'].includes(getRole(virtualNode))
  ) {
    return '';
  }

  const textMethods = findTextMethods(virtualNode);
  // Find the first step that returns a non-empty string
  const accessibleName = textMethods.reduce((accName, step) => {
    return accName || step(virtualNode, context);
  }, '');

  if (context.debug) {
    chunk007.axe.log(accessibleName || '{empty-value}', actualNode, context);
  }
  return accessibleName;
}

/**
 * Get accessible text functions for a specific native HTML element
 * @private
 * @param {VirtualNode} element
 * @return {Function[]} Array of native accessible name computation methods
 */
function findTextMethods(virtualNode) {
  const elmSpec = getElementSpec(virtualNode, { noMatchAccessibleName: true });
  const methods = elmSpec.namingMethods || [];

  return methods.map(methodName => nativeTextMethods[methodName]);
}

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Object} context
 * @property {Bool} inControlContext
 * @property {Bool} inLabelledByContext
 * @return {string}
 */
function accessibleTextVirtual(virtualNode, context = {}) {
  context = prepareContext(virtualNode, context);

  // Step 2A, check visibility
  if (shouldIgnoreHidden(virtualNode, context)) {
    return '';
  }

  // Ignore ligature icons
  if (shouldIgnoreIconLigature(virtualNode, context)) {
    return '';
  }

  const computationSteps = [
    arialabelledbyText, // Step 2B.1
    arialabelText, // Step 2C
    nativeTextAlternative, // Step 2D
    formControlValue, // Step 2E
    subtreeText, // Step 2F + Step 2H
    textNodeValue, // Step 2G (order with 2H does not matter)
    titleText // Step 2I
  ];

  // Find the first step that returns a non-empty string
  const accessibleName = computationSteps.reduce((accName, step) => {
    if (context.startNode === virtualNode) {
      accName = chunk012.sanitize(accName);
    }

    if (accName !== '') {
      // yes, whitespace only a11y names halt the algorithm
      return accName;
    }
    return step(virtualNode, context);
  }, '');

  if (context.debug) {
    chunk007.axe.log(accessibleName || '{empty-value}', virtualNode.actualNode, context);
  }
  return accessibleName;
}

/**
 * Return the nodeValue of a node
 * @param {VirtualNode} element
 * @return {String} nodeValue value
 */
function textNodeValue(virtualNode) {
  if (virtualNode.props.nodeType !== 3) {
    return '';
  }
  return virtualNode.props.nodeValue;
}

/**
 * Check if the VirtualNode should be ignored because it is not visible or hidden should be included
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {VirtualNode[]} processed
 * @return {Boolean}
 */
function shouldIgnoreHidden(virtualNode, context) {
  if (!virtualNode) {
    return false;
  }

  // When traversing aria-labelledby references, include hidden nodes except natively hidden elements
  if (context.includeHidden && !nativelyHidden(virtualNode)) {
    return false;
  }

  if (
    // If the parent isn't ignored, the text node should not be either
    virtualNode.props.nodeType !== 1
  ) {
    return false;
  }

  return !isVisibleToScreenReaders(virtualNode);
}

/**
 * Check if a ligature icon should be ignored
 * @param {VirtualNode} element
 * @param {VirtualNode} element
 * @param {Object} context
 * @return {Boolean}
 */
function shouldIgnoreIconLigature(virtualNode, context) {
  const { ignoreIconLigature, pixelThreshold } = context;
  const occurrenceThreshold =
    context.occurrenceThreshold ?? context.occuranceThreshold;
  if (virtualNode.props.nodeType !== 3 || !ignoreIconLigature) {
    return false;
  }
  return chunk012.isIconLigature(virtualNode, pixelThreshold, occurrenceThreshold);
}

/**
 * Apply defaults to the context
 * @param {VirtualNode} element
 * @param {Object} context
 * @return {Object} context object with defaults applied
 */
function prepareContext(virtualNode, context) {
  if (!context.startNode) {
    context = { startNode: virtualNode, ...context };
  }

  /**
   * When `aria-labelledby` directly references a `hidden` element
   * the element needs to be included in the accessible name.
   *
   * When a descendent of the `aria-labelledby` reference is `hidden`
   * the element should not be included in the accessible name.
   *
   * This is done by setting `includeHidden` for the `aria-labelledby` reference.
   */
  if (
    virtualNode.props.nodeType === 1 &&
    context.inLabelledByContext &&
    context.includeHidden === undefined
  ) {
    context = {
      includeHidden: !isVisibleToScreenReaders(virtualNode),
      ...context
    };
  }
  return context;
}

/**
 * Check if the node is processed with this context before
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {VirtualNode[]} processed
 * @return {Boolean}
 */
accessibleTextVirtual.alreadyProcessed = function alreadyProcessed(
  virtualnode,
  context
) {
  context.processed = context.processed || [];
  if (context.processed.includes(virtualnode)) {
    return true;
  }

  context.processed.push(virtualnode);
  return false;
};

/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @method labelVirtual
 * @memberof axe.commons.aria
 * @instance
 * @param  {VirtualNode} virtualNode The virtualNode to test
 * @return {Mixed}  String of visible text, or `null` if no label is found
 */
function labelVirtual$1(virtualNode) {
  let ref, candidate;

  if (virtualNode.attr('aria-labelledby')) {
    // aria-labelledby
    ref = idrefs(virtualNode.actualNode, 'aria-labelledby');
    candidate = ref
      .map(thing => {
        const vNode = chunk010.getNodeFromTree(thing);
        return vNode ? visibleVirtual(vNode) : '';
      })
      .join(' ')
      .trim();

    if (candidate) {
      return candidate;
    }
  }

  // aria-label
  candidate = virtualNode.attr('aria-label');
  if (candidate) {
    candidate = chunk012.sanitize(candidate);
    if (candidate) {
      return candidate;
    }
  }

  return null;
}

/**
 * Finds virtual node and calls visibleVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @param  {Element} element
 * @param  {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param  {Boolean} noRecursing When False, the result will contain text from the element and it's children.
 * When True, the result will only contain text from the element
 * @return {String}
 */
function visible(element, screenReader, noRecursing) {
  element = chunk010.getNodeFromTree(element);
  return visibleVirtual(element, screenReader, noRecursing);
}

/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @method labelVirtual
 * @memberof axe.commons.text
 * @instance
 * @param  {VirtualNode} node The virtual node mapping to the input to test
 * @return {Mixed} String of visible text, or `null` if no label is found
 */
function labelVirtual(virtualNode) {
  let ref, candidate, doc;

  candidate = labelVirtual$1(virtualNode);
  if (candidate) {
    return candidate;
  }

  // explicit label
  if (virtualNode.attr('id')) {
    if (!virtualNode.actualNode) {
      throw new TypeError(
        'Cannot resolve explicit label reference for non-DOM nodes'
      );
    }

    const id = chunk007.escapeSelector(virtualNode.attr('id'));
    doc = chunk012.getRootNode(virtualNode.actualNode);
    ref = doc.querySelector('label[for="' + id + '"]');
    candidate = ref && visible(ref, true);
    if (candidate) {
      return candidate;
    }
  }

  ref = chunk011.closest(virtualNode, 'label');
  candidate = ref && visibleVirtual(ref, true);
  if (candidate) {
    return candidate;
  }

  return null;
}

/**
 * Finds virtual node and calls labelVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @see axe.commons.text.virtualLabel
 * @method label
 * @memberof axe.commons.text
 * @instance
 * @param  {Element} node The virtual node mapping to the input to test
 * @return {Mixed} String of visible text, or `null` if no label is found
 */
function label(node) {
  node = chunk010.getNodeFromTree(node);
  return labelVirtual(node);
}

/**
 * Returns an array of visible text virtual nodes
 *
 * @method visibleTextNodes
 * @memberof axe.commons.text
 * @instance
 * @param {VirtualNode} vNode
 * @return {VitrualNode[]}
 * @deprecated
 */
function visibleTextNodes(vNode) {
  const parentVisible = isVisibleOnScreen(vNode);
  let nodes = [];
  vNode.children.forEach(child => {
    if (child.actualNode.nodeType === 3) {
      if (parentVisible) {
        nodes.push(child);
      }
    } else {
      nodes = nodes.concat(visibleTextNodes(child));
    }
  });
  return nodes;
}

/**
 * Namespace for text-related utilities.
 * @namespace text
 * @memberof axe.commons
 */

const text = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  accessibleText,
  accessibleTextVirtual,
  autocomplete: chunk012.autocomplete,
  formControlValue,
  formControlValueMethods,
  hasUnicode: chunk012.hasUnicode,
  isHumanInterpretable: chunk012.isHumanInterpretable,
  isIconLigature: chunk012.isIconLigature,
  isValidAutocomplete: chunk012.isValidAutocomplete,
  label,
  labelText,
  labelVirtual,
  nativeElementType: chunk012.nativeElementType,
  nativeTextAlternative,
  nativeTextMethods,
  removeUnicode: chunk012.removeUnicode,
  sanitize: chunk012.sanitize,
  subtreeText,
  titleText,
  unsupported: chunk012.unsupported,
  visible,
  visibleTextNodes,
  visibleVirtual
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * Get the visible text client rects of a node.
 * @method getVisibleChildTextRects
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 */
const getVisibleChildTextRects = chunk010.memoizeImplementation(
  function getVisibleChildTextRectsMemoized(node) {
    const vNode = chunk010.getNodeFromTree(node);
    const nodeRect = vNode.boundingClientRect;
    const clientRects = [];
    const overflowHiddenNodes = chunk012.getOverflowHiddenAncestors(vNode);

    node.childNodes.forEach(textNode => {
      if (textNode.nodeType !== 3 || chunk012.sanitize(textNode.nodeValue) === '') {
        return;
      }

      const contentRects = getContentRects(textNode);
      if (isOutsideNodeBounds(contentRects, nodeRect)) {
        return;
      }

      clientRects.push(...filterHiddenRects(contentRects, overflowHiddenNodes));
    });

    /**
     * if all text rects are larger than the bounds of the node,
     * or goes outside of the bounds of the node, we need to use
     * the nodes bounding rect so we stay within the bounds of the
     * element.
     *
     * @see https://github.com/dequelabs/axe-core/issues/2178
     * @see https://github.com/dequelabs/axe-core/issues/2483
     * @see https://github.com/dequelabs/axe-core/issues/2681
     *
     * also need to resize the nodeRect to fit within the bounds of any overflow: hidden ancestors.
     *
     * @see https://github.com/dequelabs/axe-core/issues/4253
     */
    return clientRects.length
      ? clientRects
      : filterHiddenRects([nodeRect], overflowHiddenNodes);
  }
);

function getContentRects(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return Array.from(range.getClientRects());
}

/**
 * Check to see if the text rect size is outside the of the
 * nodes bounding rect. Since we use the midpoint of the element
 * when determining the rect stack we will also use the midpoint
 * of the text rect to determine out of bounds
 */
function isOutsideNodeBounds(rects, nodeRect) {
  return rects.some(rect => {
    const centerPoint = chunk012.getRectCenter(rect);
    return !chunk012.isPointInRect(centerPoint, nodeRect);
  });
}

/**
 * Filter out 0 width and height rects (newline characters) and
 * any rects that are outside the bounds of overflow hidden
 * ancestors
 */
function filterHiddenRects(contentRects, overflowHiddenNodes) {
  const visibleRects = [];
  contentRects.forEach(contentRect => {
    // ie11 has newline characters return 0.00998, so we'll say if the
    // line is < 1 it shouldn't be counted
    if (contentRect.width < 1 || contentRect.height < 1) {
      return;
    }

    // update the rect size to fit inside the bounds of all overflow
    // hidden ancestors
    const visibleRect = overflowHiddenNodes.reduce((rect, overflowNode) => {
      return rect && chunk012.getIntersectionRect(rect, overflowNode.boundingClientRect);
    }, contentRect);

    if (visibleRect) {
      visibleRects.push(visibleRect);
    }
  });

  return visibleRects;
}

/**
 * Return all elements that are at the center of each text client rect of the passed in node.
 * @method getTextElementStack
 * @memberof axe.commons.dom
 * @param {Node} node
 * @return {Array<Node[]>}
 */
function getTextElementStack(node) {
  const grid = getNodeGrid(node);
  if (!grid) {
    return [];
  }

  const clientRects = getVisibleChildTextRects(node);
  return clientRects.map(rect => getRectStack(grid, rect));
}

const visualRoles = [
  'checkbox',
  'img',
  'meter',
  'progressbar',
  'scrollbar',
  'radio',
  'slider',
  'spinbutton',
  'textbox'
];

/**
 * Check if an element is an inherently visual element
 * @method isVisualContent
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element|VirtualNode} element The element to check
 * @return {Boolean}
 */
function isVisualContent(el) {
  const { vNode } = chunk013.nodeLookup(el);
  const role = chunk007.axe.commons.aria.getExplicitRole(vNode);
  if (role) {
    return visualRoles.indexOf(role) !== -1;
  }

  switch (vNode.props.nodeName) {
    case 'img':
    case 'iframe':
    case 'object':
    case 'video':
    case 'audio':
    case 'canvas':
    case 'svg':
    case 'math':
    case 'button':
    case 'select':
    case 'textarea':
    case 'keygen':
    case 'progress':
    case 'meter':
      return true;
    case 'input':
      return vNode.props.type !== 'hidden';
    default:
      return false;
  }
}

const hiddenTextElms = [
  'head',
  'title',
  'template',
  'script',
  'style',
  'iframe',
  'object',
  'video',
  'audio',
  'noscript'
];

/**
 * Test if the element has child nodes that are non-empty text nodes
 * @param {VirtualNode} elm
 * @returns boolean
 */
function hasChildTextNodes(elm) {
  if (hiddenTextElms.includes(elm.props.nodeName)) {
    return false;
  }
  return elm.children.some(({ props }) => {
    return props.nodeType === 3 && props.nodeValue.trim();
  });
}

/**
 * Check that the element has visible content in the form of either text,
 * an aria-label or visual content such as image
 * @method hasContentVirtual
 * @memberof axe.commons.dom
 * @instance
 * @param	{VirtualNode} elm Virtual Node to search
 * @param	{Boolean} noRecursion If true, only the element is checked, otherwise it will search all child nodes
 * @param {Boolean} ignoreAria if true, ignores `aria label` computation for content deduction
 * @return {Boolean}
 */
function hasContentVirtual(elm, noRecursion, ignoreAria) {
  return (
    // It has text
    // or one of it's descendants does
    hasChildTextNodes(elm) ||
    // It is a graphical element
    isVisualContent(elm.actualNode) ||
    // It has an ARIA label
    (!ignoreAria && !!labelVirtual$1(elm)) ||
    (!noRecursion &&
      elm.children.some(
        child => child.actualNode.nodeType === 1 && hasContentVirtual(child)
      ))
  );
}

/**
 * Find virtual node and call hasContentVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @see axe.commons.dom.hasContentVirtual
 * @method hasContent
 * @memberof axe.commons.dom
 * @instance
 * @param {DOMNode} elm DOMNode element to check
 * @param {Boolean} noRecursion If true, only the element is checked, otherwise it will search all child nodes
 * @param {Boolean} ignoreAria if true, ignores `aria label` computation for content deduction
 * @return {Boolean}
 */
function hasContent(elm, noRecursion, ignoreAria) {
  elm = chunk010.getNodeFromTree(elm);
  return hasContentVirtual(elm, noRecursion, ignoreAria);
}

/**
 * Check that a node has text, or an accessible name which language is defined by the
 * nearest ancestor's lang attribute.
 * @param {VirtualNode} virtualNode
 * @return boolean
 */
function hasLangText(virtualNode) {
  if (
    typeof virtualNode.children === 'undefined' ||
    hasChildTextNodes(virtualNode)
  ) {
    return true;
  }
  if (virtualNode.props.nodeType === 1 && isVisualContent(virtualNode)) {
    // See: https://github.com/dequelabs/axe-core/issues/3281
    return !!chunk007.axe.commons.text.accessibleTextVirtual(virtualNode);
  }
  return virtualNode.children.some(
    child =>
      !child.attr('lang') && // non-empty lang
      hasLangText(child) && // has text
      !isHiddenForEveryone(child) // Not hidden for anyone
  );
}

/**
 * Determines if an element is in the focus order, but would not be if its
 * tabindex were unspecified.
 * @method insertedIntoFocusOrder
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} True if the element is in the focus order but wouldn't be
 * if its tabindex were removed. Else, false.
 */
function insertedIntoFocusOrder(el) {
  const tabIndex = chunk013.parseTabindex(el.getAttribute('tabindex'));

  // an element that has an invalid tabindex will return 0 or -1 based on
  // if it is natively focusable or not, which will always be false for this
  // check as NaN is not > 1
  // @see https://www.w3.org/TR/html51/editing.html#the-tabindex-attribute
  return tabIndex > -1 && isFocusable(el) && !isNativelyFocusable(el);
}

/**
 * Determine whether an element is hidden based on css
 * @method isHiddenWithCSS
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTML Element
 * @param {Boolean} descendentVisibilityValue (Optional) immediate descendant visibility value used for recursive computation
 * @return {Boolean} the element's hidden status
 * @deprecated use isHiddenForEveryone
 */
function isHiddenWithCSS(el, descendentVisibilityValue) {
  const { vNode, domNode } = chunk013.nodeLookup(el);

  if (!vNode) {
    return _isHiddenWithCSS(domNode, descendentVisibilityValue);
  }

  if (vNode._isHiddenWithCSS === void 0) {
    vNode._isHiddenWithCSS = _isHiddenWithCSS(
      domNode,
      descendentVisibilityValue
    );
  }

  return vNode._isHiddenWithCSS;
}

function _isHiddenWithCSS(el, descendentVisibilityValue) {
  if (el.nodeType === 9) {
    // 9 === Node.DOCUMENT
    return false;
  }

  if (el.nodeType === 11) {
    // 11 === Node.DOCUMENT_FRAGMENT_NODE
    el = el.host; // swap to host node
  }

  if (['STYLE', 'SCRIPT'].includes(el.nodeName.toUpperCase())) {
    return false;
  }

  const style = window.getComputedStyle(el, null);
  if (!style) {
    throw new Error('Style does not exist for the given element.');
  }

  const displayValue = style.getPropertyValue('display');
  if (displayValue === 'none') {
    return true;
  }

  const HIDDEN_VISIBILITY_VALUES = ['hidden', 'collapse'];
  const visibilityValue = style.getPropertyValue('visibility');
  if (
    HIDDEN_VISIBILITY_VALUES.includes(visibilityValue) &&
    !descendentVisibilityValue
  ) {
    return true;
  }

  if (
    HIDDEN_VISIBILITY_VALUES.includes(visibilityValue) &&
    descendentVisibilityValue &&
    HIDDEN_VISIBILITY_VALUES.includes(descendentVisibilityValue)
  ) {
    return true;
  }

  const parent = chunk012.getComposedParent(el);
  if (parent && !HIDDEN_VISIBILITY_VALUES.includes(visibilityValue)) {
    return isHiddenWithCSS(parent, visibilityValue);
  }
  return false;
}

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @method getRoleType
 * @memberof axe.commons.aria
 * @instance
 * @param {String|Null|Node|Element} role The role to check, or element to check the role of
 * @return {Mixed} String if a matching role and its type are found, otherwise `null`
 */
function getRoleType(role) {
  if (
    role instanceof chunk007.AbstractVirtualNode ||
    (window?.Node && role instanceof window.Node)
  ) {
    role = chunk007.axe.commons.aria.getRole(role);
  }
  const roleDef = standards.ariaRoles[role];
  return roleDef?.type || null;
}

const blockLike = ['block', 'list-item', 'table', 'flex', 'grid'];

const inlineBlockLike = ['inline-block', 'inline-flex', 'inline-grid'];

/**
 * Determines if an element is within a text block
 * With `noLengthCompare` true, will return if there is any non-space text outside
 * widgets. When false, compares the length of non-widget text to widget text
 *
 * @param  {Element} node [description]
 * @param  {Object} options Optional
 * @property {Bool} noLengthCompare
 * @property {Bool} includeInlineBlock
 * @return {Boolean}      [description]
 */
function isInTextBlock(
  node,
  { noLengthCompare, includeInlineBlock = false } = {}
) {
  const { vNode, domNode } = chunk013.nodeLookup(node);
  if (isBlock(domNode) || (!includeInlineBlock && isInlineBlockLike(vNode))) {
    // Ignore if the element is a block
    return false;
  }

  // Find all the text part of the parent block not in a link, and all the text in a link
  const virtualParent = getBlockParent(domNode);
  let parentText = '';
  let widgetText = '';
  let inBrBlock = 0;

  // We want to ignore hidden text, and if br / hr is used, only use the section of the parent
  // that has the link we're looking at
  walkDomNode(virtualParent, currNode => {
    if (currNode === virtualParent.actualNode) {
      return true; // Skip the element itself
    }

    // We're already passed it, skip everything else
    if (inBrBlock === 2) {
      return false;
    }

    if (currNode.nodeType === 3) {
      // Add the text to the parent
      parentText += currNode.nodeValue;
    }
    // Ignore any node that's not an element (or text as above)
    if (currNode.nodeType !== 1) {
      return;
    }

    const nodeName = (currNode.nodeName || '').toUpperCase();
    if (currNode === domNode) {
      inBrBlock = 1;
    }
    const nodeIsBlock = isBlock(currNode);
    // BR and HR elements break the line
    if (nodeIsBlock || ['BR', 'HR'].includes(nodeName)) {
      if (inBrBlock === 0) {
        parentText = '';
        widgetText = '';
      } else {
        inBrBlock = 2;
      }

      // Don't walk nodes with content not displayed on screen.
    }
    if (
      nodeIsBlock ||
      currNode.style.display === 'none' ||
      currNode.style.overflow === 'hidden' ||
      !['', null, 'none'].includes(currNode.style.float) ||
      !['', null, 'relative'].includes(currNode.style.position)
    ) {
      return false;

      // Don't walk widgets, we're only interested in what's not in them.
    } else if (getRoleType(currNode) === 'widget') {
      // Grab all the text from this element, but don't walk down it's children
      widgetText += currNode.textContent;
      return false;
    }
  });

  parentText = chunk012.sanitize(parentText);
  if (noLengthCompare) {
    return parentText.length !== 0;
  }

  widgetText = chunk012.sanitize(widgetText);
  return parentText.length > widgetText.length;
}

function isBlock(node) {
  const { vNode } = chunk013.nodeLookup(node);
  const display = vNode.getComputedStylePropertyValue('display');
  return blockLike.includes(display) || display.substr(0, 6) === 'table-';
}

function isInlineBlockLike(vNode) {
  const display = vNode.getComputedStylePropertyValue('display');
  return inlineBlockLike.includes(display);
}

function walkDomNode(node, functor) {
  if (functor(node.actualNode) !== false) {
    node.children.forEach(child => walkDomNode(child, functor));
  }
}

function getBlockParent(node) {
  // Find the closest parent
  let parentBlock = chunk012.getComposedParent(node);
  while (parentBlock && !isBlock(parentBlock)) {
    parentBlock = chunk012.getComposedParent(parentBlock);
  }

  return chunk010.getNodeFromTree(parentBlock);
}

/**
 * Determines if there is a modal currently open.
 * @method isModalOpen
 * @memberof axe.commons.dom
 * @instance
 * @return {Boolean|undefined} True if we know (or our best guess) that a modal is open, undefined if we can't tell (doesn't mean there isn't one open)
 */
function isModalOpen(options) {
  options = options || {};
  const modalPercent = options.modalPercent || 0.75;

  // there is no "definitive" way to code a modal so detecting when one is open
  // is a bit of a guess. a modal won't always be accessible, so we can't rely
  // on the `role` attribute, and relying on a class name as a convention is
  // unreliable. we also cannot rely on the body/html not scrolling.
  //
  // because of this, we will look for two different types of modals:
  // "definitely a modal" and "could be a modal."
  //
  // "definitely a modal" is any visible element that is coded to be a modal
  // by using one of the following criteria:
  //
  // - has the attribute `role=dialog`
  // - has the attribute `aria-modal=true`
  // - is the dialog element
  //
  // "could be a modal" is a visible element that takes up more than 75% of
  // the screen (though typically full width/height) and is the top-most element
  // in the viewport. since we aren't sure if it is or is not a modal this is
  // just our best guess of being one based on convention.

  if (chunk007.cache.get('isModalOpen')) {
    return chunk007.cache.get('isModalOpen');
  }

  const definiteModals = chunk014.querySelectorAllFilter(
    // TODO: es-module-_tree
    chunk007.axe._tree[0],
    'dialog, [role=dialog], [aria-modal=true]',
    isVisibleOnScreen
  );

  if (definiteModals.length) {
    chunk007.cache.set('isModalOpen', true);
    return true;
  }

  // to find a "could be a modal" we will take the element stack from each of
  // four corners and one from the middle of the viewport (total of 5). if each
  // stack contains an element whose width/height is >= 75% of the screen, we
  // found a "could be a modal"
  const viewport = chunk012.getViewportSize(window);
  const percentWidth = viewport.width * modalPercent;
  const percentHeight = viewport.height * modalPercent;
  const x = (viewport.width - percentWidth) / 2;
  const y = (viewport.height - percentHeight) / 2;

  const points = [
    // top-left corner
    { x, y },
    // top-right corner
    { x: viewport.width - x, y },
    // center
    { x: viewport.width / 2, y: viewport.height / 2 },
    // bottom-left corner
    { x, y: viewport.height - y },
    // bottom-right corner
    { x: viewport.width - x, y: viewport.height - y }
  ];

  const stacks = points.map(point => {
    return Array.from(document.elementsFromPoint(point.x, point.y));
  });

  for (let i = 0; i < stacks.length; i++) {
    // a modal isn't guaranteed to be the top most element so we'll have to
    // find the first element in the stack that meets the modal criteria
    // and make sure it's in the other stacks
    const modalElement = stacks[i].find(elm => {
      const style = window.getComputedStyle(elm);
      return (
        parseInt(style.width, 10) >= percentWidth &&
        parseInt(style.height, 10) >= percentHeight &&
        style.getPropertyValue('pointer-events') !== 'none' &&
        (style.position === 'absolute' || style.position === 'fixed')
      );
    });

    if (modalElement && stacks.every(stack => stack.includes(modalElement))) {
      chunk007.cache.set('isModalOpen', true);
      return true;
    }
  }

  chunk007.cache.set('isModalOpen', undefined);
  return undefined;
}

/**
 * Determines if element is a skip link.
 *
 * Define a skip link as any anchor element whose resolved href
 * resolves to the current page and uses a fragment identifier (#)
 * and which precedes the first anchor element whose resolved href
 * does not resolve to the current page or that doesn't use a
 * fragment identifier.
 * @method isSkipLink
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element
 * @return {Boolean}
 */
function isSkipLink(element) {
  if (!element.href) {
    return false;
  }

  const firstPageLink = chunk007.cache.get('firstPageLink', generateFirstPageLink);

  if (!firstPageLink) {
    return true;
  }

  return (
    element.compareDocumentPosition(firstPageLink.actualNode) ===
    element.DOCUMENT_POSITION_FOLLOWING
  );
}

function generateFirstPageLink() {
  let firstPageLink;
  if (!window.location.origin) {
    firstPageLink = chunk014.querySelectorAll(
      // TODO: es-module-_tree
      chunk007.axe._tree,
      'a:not([href^="#"]):not([href^="/#"]):not([href^="javascript:"])'
    )[0];
  } else {
    firstPageLink = chunk014.querySelectorAll(
      chunk007.axe._tree,
      'a[href]:not([href^="javascript:"])'
    ).find(link => !chunk012.isCurrentPageLink(link.actualNode));
  }

  // null will signify no first page link
  return firstPageLink || null;
}

const clipRegex =
  /rect\s*\(([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px,?\s*([0-9]+)px\s*\)/;
const clipPathRegex = /(\w+)\((\d+)/;

/**
 * Determines if an element is hidden with a clip or clip-path technique
 * @method isClipped
 * @memberof axe.commons.dom
 * @private
 * @param  {CSSStyleDeclaration} style Computed style
 * @return {Boolean}
 */
function isClipped(style) {
  const matchesClip = style.getPropertyValue('clip').match(clipRegex);
  const matchesClipPath = style
    .getPropertyValue('clip-path')
    .match(clipPathRegex);
  if (matchesClip && matchesClip.length === 5) {
    const position = style.getPropertyValue('position');
    // clip is only applied to absolutely positioned elements
    if (['fixed', 'absolute'].includes(position)) {
      return (
        matchesClip[3] - matchesClip[1] <= 0 &&
        matchesClip[2] - matchesClip[4] <= 0
      );
    }
  }
  if (matchesClipPath) {
    const type = matchesClipPath[1];
    const value = parseInt(matchesClipPath[2], 10);

    switch (type) {
      case 'inset':
        return value >= 50;
      case 'circle':
        return value === 0;
    }
  }

  return false;
}

/**
 * Check `AREA` element is visible
 * - validate if it is a child of `map`
 * - ensure `map` is referred by `img` using the `usemap` attribute
 * @param {Element} areaEl `AREA` element
 * @retruns {Boolean}
 */
function isAreaVisible(el, screenReader, recursed) {
  /**
   * Note:
   * - Verified that `map` element cannot refer to `area` elements across different document trees
   * - Verified that `map` element does not get affected by altering `display` property
   */
  const mapEl = findUp(el, 'map');
  if (!mapEl) {
    return false;
  }

  const mapElName = mapEl.getAttribute('name');
  if (!mapElName) {
    return false;
  }

  /**
   * `map` element has to be in light DOM
   */
  const mapElRootNode = chunk012.getRootNode(el);
  if (!mapElRootNode || mapElRootNode.nodeType !== 9) {
    return false;
  }

  const refs = chunk014.querySelectorAll(
    // TODO: es-module-_tree
    chunk007.axe._tree,
    `img[usemap="#${chunk007.escapeSelector(mapElName)}"]`
  );
  if (!refs || !refs.length) {
    return false;
  }

  return refs.some(({ actualNode }) =>
    isVisible(actualNode, screenReader, recursed)
  );
}

/**
 * Determine whether an element is visible
 * @method isVisible
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param {Boolean} recursed
 * @return {Boolean} The element's visibilty status
 * @deprecated use isVisibleOnScreen or isVisibleToScreenReaders if `screenReader: true` was passed
 */
function isVisible(el, screenReader, recursed) {
  if (!el) {
    throw new TypeError(
      'Cannot determine if element is visible for non-DOM nodes'
    );
  }

  const vNode = el instanceof chunk007.AbstractVirtualNode ? el : chunk010.getNodeFromTree(el);
  el = vNode ? vNode.actualNode : el;

  const cacheName = '_isVisible' + (screenReader ? 'ScreenReader' : '');
  const { DOCUMENT_NODE, DOCUMENT_FRAGMENT_NODE } = window.Node ?? {};
  const nodeType = vNode ? vNode.props.nodeType : el.nodeType;
  const nodeName = vNode ? vNode.props.nodeName : el.nodeName.toLowerCase();

  if (vNode && typeof vNode[cacheName] !== 'undefined') {
    return vNode[cacheName];
  }

  if (nodeType === DOCUMENT_NODE) {
    return true;
  }

  // always hidden
  if (['style', 'script', 'noscript', 'template'].includes(nodeName)) {
    return false;
  }

  if (el && nodeType === DOCUMENT_FRAGMENT_NODE) {
    el = el.host; // grab the host Node
  }

  // hidden from screen readers
  if (screenReader) {
    const ariaHiddenValue = vNode
      ? vNode.attr('aria-hidden')
      : el.getAttribute('aria-hidden');

    if (ariaHiddenValue === 'true') {
      return false;
    }
  }

  // detatched virtual node
  if (!el) {
    const parent = vNode.parent;
    let visible = true;
    if (parent) {
      visible = isVisible(parent, screenReader, true);
    }

    if (vNode) {
      vNode[cacheName] = visible;
    }

    return visible;
  }

  const style = window.getComputedStyle(el, null);
  if (style === null) {
    return false;
  }

  /**
   * check visibility of `AREA`
   * Note:
   * Firefox's user-agent always sets `AREA` element to `display:none`
   * hence excluding the edge case, for visibility computation
   */
  if (nodeName === 'area') {
    return isAreaVisible(el, screenReader, recursed);
  }

  // always hidden
  if (style.getPropertyValue('display') === 'none') {
    return false;
  }

  // hidden from visual users
  const elHeight = parseInt(style.getPropertyValue('height'));
  const elWidth = parseInt(style.getPropertyValue('width'));

  // ways to hide content visually
  const scroll = chunk013.getScroll(el);
  const scrollableWithZeroHeight = scroll && elHeight === 0;
  const scrollableWithZeroWidth = scroll && elWidth === 0;
  const posAbsoluteOverflowHiddenAndSmall =
    style.getPropertyValue('position') === 'absolute' &&
    (elHeight < 2 || elWidth < 2) &&
    style.getPropertyValue('overflow') === 'hidden';

  if (
    !screenReader &&
    (isClipped(style) ||
      style.getPropertyValue('opacity') === '0' ||
      scrollableWithZeroHeight ||
      scrollableWithZeroWidth ||
      posAbsoluteOverflowHiddenAndSmall)
  ) {
    return false;
  }

  // visibility is only accurate on the first element and
  // position does not matter if it was already calculated
  if (
    !recursed &&
    (style.getPropertyValue('visibility') === 'hidden' ||
      (!screenReader && isOffscreen(el)))
  ) {
    return false;
  }

  const parent = el.assignedSlot ? el.assignedSlot : el.parentNode;
  let visible = false;
  if (parent) {
    visible = isVisible(parent, screenReader, true);
  }

  if (vNode) {
    vNode[cacheName] = visible;
  }

  return visible;
}

/**
 * Checks whether a parent element visually contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @deprecated
 * @method visuallyContains
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
function visuallyContains(node, parent) {
  const parentScrollAncestor = getScrollAncestor(parent);

  // if the elements share a common scroll parent, we can check if the
  // parent visually contains the node. otherwise we need to check each
  // scroll parent in between the node and the parent since if the
  // element is off screen due to the scroll, it won't be visually contained
  // by the parent
  do {
    const nextScrollAncestor = getScrollAncestor(node);

    if (
      nextScrollAncestor === parentScrollAncestor ||
      nextScrollAncestor === parent
    ) {
      return contains(node, parent);
    }

    node = nextScrollAncestor;
  } while (node);

  return false;
}

/**
 * Return the ancestor node that is a scroll region.
 * @param {VirtualNode}
 * @return {VirtualNode|null}
 */
function getScrollAncestor(node) {
  const vNode = chunk010.getNodeFromTree(node);
  let ancestor = vNode.parent;

  while (ancestor) {
    if (chunk013.getScroll(ancestor.actualNode)) {
      return ancestor.actualNode;
    }

    ancestor = ancestor.parent;
  }
}

/**
 * Checks whether a parent element fully contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
function contains(node, parent) {
  const style = window.getComputedStyle(parent);
  const overflow = style.getPropertyValue('overflow');

  // if parent element is inline, scrollArea will be too unpredictable
  if (style.getPropertyValue('display') === 'inline') {
    return true;
  }

  // use clientRects instead of boundingClientRect to account
  // for truncation of text (one of the rects will be the size
  // of the truncation)
  // @see https://github.com/dequelabs/axe-core/issues/2669
  const clientRects = Array.from(node.getClientRects());
  // getBoundingClientRect prevents overrides of left/top
  // (also can't destructure)
  const boundingRect = parent.getBoundingClientRect();
  const rect = {
    left: boundingRect.left,
    top: boundingRect.top,
    width: boundingRect.width,
    height: boundingRect.height
  };

  if (
    ['scroll', 'auto'].includes(overflow) ||
    parent instanceof window.HTMLHtmlElement
  ) {
    rect.width = parent.scrollWidth;
    rect.height = parent.scrollHeight;
  }

  // in Chrome text truncation on the parent will cause the
  // child to have multiple client rects (one for the bounding
  // rect of the element and one more for the bounding rect of
  // the truncation). however this doesn't happen for other
  // browsers so we'll make it so that if we detect text
  // truncation and there's only one client rect, we'll use
  // the bounding rect of the parent as the client rect of
  // the child
  if (
    clientRects.length === 1 &&
    overflow === 'hidden' &&
    style.getPropertyValue('white-space') === 'nowrap'
  ) {
    clientRects[0] = rect;
  }

  // check if any client rect is fully inside the parent rect
  // @see https://gist.github.com/Daniel-Hug/d7984d82b58d6d2679a087d896ca3d2b
  return clientRects.some(
    clientRect =>
      !(
        Math.ceil(clientRect.left) < Math.floor(rect.left) ||
        Math.ceil(clientRect.top) < Math.floor(rect.top) ||
        Math.floor(clientRect.left + clientRect.width) >
          Math.ceil(rect.left + rect.width) ||
        Math.floor(clientRect.top + clientRect.height) >
          Math.ceil(rect.top + rect.height)
      )
  );
}

/**
 * Get elements from point across shadow dom boundaries
 * @deprecated As of axe-core 4.4. May be removed in axe-core 5.0
 * @method shadowElementsFromPoint
 * @memberof axe.commons.dom
 * @instance
 * @param {Number} nodeX X coordinates of point
 * @param {Number} nodeY Y coordinates of point
 * @param {Object} [root] Shadow root or document root
 * @return {Array}
 */
function shadowElementsFromPoint(nodeX, nodeY, root = document, i = 0) {
  if (i > 999) {
    throw new Error('Infinite loop detected');
  }
  return (
    // IE can return null when there are no elements
    Array.from(root.elementsFromPoint(nodeX, nodeY) || [])
      // As of Chrome 66, elementFromPoint will return elements from parent trees.
      // We only want to touch each tree once, so we're filtering out nodes on other trees.
      .filter(nodes => chunk012.getRootNode(nodes) === root)
      .reduce((stack, elm) => {
        if (chunk013.isShadowRoot(elm)) {
          const shadowStack = shadowElementsFromPoint(
            nodeX,
            nodeY,
            elm.shadowRoot,
            i + 1
          );
          stack = stack.concat(shadowStack);
          // filter host nodes which get included regardless of overlap
          // TODO: refactor multiline overlap checking inside shadow dom
          if (stack.length && visuallyContains(stack[0], elm)) {
            stack.push(elm);
          }
        } else {
          stack.push(elm);
        }
        return stack;
      }, [])
  );
}

/**
 * Namespace for dom-related utilities.
 * @namespace dom
 * @memberof axe.commons
 */

const dom = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createGrid,
  findElmsInContext,
  findNearbyElms,
  findUp,
  findUpVirtual,
  focusDisabled,
  getComposedParent: chunk012.getComposedParent,
  getElementByReference: chunk012.getElementByReference,
  getElementCoordinates: chunk012.getElementCoordinates,
  getElementStack,
  getModalDialog,
  getNodeGrid,
  getOverflowHiddenAncestors: chunk012.getOverflowHiddenAncestors,
  getRootNode: chunk012.getRootNode,
  getScrollOffset: chunk012.getScrollOffset,
  getTabbableElements,
  getTargetRects,
  getTargetSize: getTargetSize_default,
  getTextElementStack,
  getViewportSize: chunk012.getViewportSize,
  getVisibleChildTextRects,
  hasContent,
  hasContentVirtual,
  hasLangText,
  idrefs,
  insertedIntoFocusOrder,
  isCurrentPageLink: chunk012.isCurrentPageLink,
  isFixedPosition,
  isFocusable,
  isHTML5: chunk012.isHTML5,
  isHiddenForEveryone,
  isHiddenWithCSS,
  isInTabOrder,
  isInTextBlock,
  isInert,
  isModalOpen,
  isMultiline: chunk012.isMultiline,
  isNativelyFocusable,
  isNode: chunk012.isNode,
  isOffscreen,
  isOpaque: chunk013.isOpaque,
  isSkipLink,
  isVisible,
  isVisibleOnScreen,
  isVisibleToScreenReaders,
  isVisualContent,
  reduceToElementsBelowFloating: chunk013.reduceToElementsBelowFloating,
  shadowElementsFromPoint,
  urlPropsFromAttribute: chunk013.urlPropsFromAttribute,
  visuallyContains,
  visuallyOverlaps: chunk013.visuallyOverlaps,
  visuallySort
}, Symbol.toStringTag, { value: 'Module' }));

let nodeIndex = 0;

class VirtualNode extends chunk007.AbstractVirtualNode {
  /**
   * Wrap the real node and provide list of the flattened children
   * @param {Node} node the node in question
   * @param {VirtualNode} parent The parent VirtualNode
   * @param {String} shadowId the ID of the shadow DOM to which this node belongs
   */
  constructor(node, parent, shadowId) {
    super();
    this.shadowId = shadowId;
    this.children = [];
    this.actualNode = node;
    this.parent = parent;

    if (!parent) {
      nodeIndex = 0;
    }
    this.nodeIndex = nodeIndex++;

    this._isHidden = null; // will be populated by axe.utils.isHidden
    this._cache = {};
    this._isXHTML = chunk010.isXHTML(node.ownerDocument);

    // we will normalize the type prop for inputs by looking strictly
    // at the attribute and not what the browser resolves the type
    // to be
    if (node.nodeName.toLowerCase() === 'input') {
      let type = node.getAttribute('type');
      type = this._isXHTML ? type : (type || '').toLowerCase();

      if (!chunk014.validInputTypes().includes(type)) {
        type = 'text';
      }

      this._type = type;
    }

    if (chunk007.cache.get('nodeMap')) {
      chunk007.cache.get('nodeMap').set(node, this);
    }
  }

  // abstract Node properties so we can run axe in DOM-less environments.
  // add to the prototype so memory is shared across all virtual nodes
  get props() {
    if (!this._cache.hasOwnProperty('props')) {
      const { nodeType, nodeName, id, nodeValue } = this.actualNode;

      this._cache.props = {
        nodeType,
        nodeName: this._isXHTML ? nodeName : nodeName.toLowerCase(),
        id,
        type: this._type,
        nodeValue
      };

      // We avoid reading these on node types where they won't be relevant
      // to work around issues like #4316.
      if (nodeType === 1) {
        this._cache.props.multiple = this.actualNode.multiple;
        this._cache.props.value = this.actualNode.value;
        this._cache.props.selected = this.actualNode.selected;
        this._cache.props.checked = this.actualNode.checked;
        this._cache.props.indeterminate = this.actualNode.indeterminate;
      }
    }

    return this._cache.props;
  }

  /**
   * Get the value of the given attribute name.
   * @param {String} attrName The name of the attribute.
   * @return {String|null} The value of the attribute or null if the attribute does not exist
   */
  attr(attrName) {
    if (typeof this.actualNode.getAttribute !== 'function') {
      return null;
    }

    return this.actualNode.getAttribute(attrName);
  }

  /**
   * Determine if the element has the given attribute.
   * @param {String} attrName The name of the attribute
   * @return {Boolean} True if the element has the attribute, false otherwise.
   */
  hasAttr(attrName) {
    if (typeof this.actualNode.hasAttribute !== 'function') {
      return false;
    }

    return this.actualNode.hasAttribute(attrName);
  }

  /**
   * Return a list of attribute names for the element.
   * @return {String[]}
   */
  get attrNames() {
    if (!this._cache.hasOwnProperty('attrNames')) {
      let attrs;

      // eslint-disable-next-line no-restricted-syntax
      if (this.actualNode.attributes instanceof window.NamedNodeMap) {
        // eslint-disable-next-line no-restricted-syntax
        attrs = this.actualNode.attributes;
      }
      // if the attributes property is not of type NamedNodeMap
      // then the DOM has been clobbered. E.g. <form><input name="attributes"></form>.
      // We can clone the node to isolate it and then return
      // the attributes
      else {
        attrs = this.actualNode.cloneNode(false).attributes;
      }

      this._cache.attrNames = Array.from(attrs).map(attr => attr.name);
    }
    return this._cache.attrNames;
  }

  /**
   * Return a property of the computed style for this element and cache the result. This is much faster than called `getPropteryValue` every time.
   * @see https://jsperf.com/get-property-value
   * @return {String}
   */
  getComputedStylePropertyValue(property) {
    const key = 'computedStyle_' + property;
    if (!this._cache.hasOwnProperty(key)) {
      if (!this._cache.hasOwnProperty('computedStyle')) {
        this._cache.computedStyle = window.getComputedStyle(this.actualNode);
      }

      this._cache[key] = this._cache.computedStyle.getPropertyValue(property);
    }
    return this._cache[key];
  }

  /**
   * Determine if the element is focusable and cache the result.
   * @return {Boolean} True if the element is focusable, false otherwise.
   */
  get isFocusable() {
    if (!this._cache.hasOwnProperty('isFocusable')) {
      this._cache.isFocusable = isFocusable(this.actualNode);
    }
    return this._cache.isFocusable;
  }

  /**
   * Return the list of tabbable elements for this element and cache the result.
   * @return {VirtualNode[]}
   */
  get tabbableElements() {
    if (!this._cache.hasOwnProperty('tabbableElements')) {
      this._cache.tabbableElements = getTabbableElements(this);
    }
    return this._cache.tabbableElements;
  }

  /**
   * Return the client rects for this element and cache the result.
   * @return {DOMRect[]}
   */
  get clientRects() {
    if (!this._cache.hasOwnProperty('clientRects')) {
      this._cache.clientRects = Array.from(
        this.actualNode.getClientRects()
      ).filter(rect => rect.width > 0);
    }
    return this._cache.clientRects;
  }

  /**
   * Return the bounding rect for this element and cache the result.
   * @return {DOMRect}
   */
  get boundingClientRect() {
    if (!this._cache.hasOwnProperty('boundingClientRect')) {
      this._cache.boundingClientRect = this.actualNode.getBoundingClientRect();
    }
    return this._cache.boundingClientRect;
  }
}

/**
 * This implements the flatten-tree algorithm specified:
 * Originally here https://drafts.csswg.org/css-scoping/#flat-tree
 * Hopefully soon published here: https://www.w3.org/TR/css-scoping-1/#flat-tree
 *
 * Some notable information:
 ******* NOTE: as of Chrome 59, this is broken in Chrome so that tests fail completely
 ******* removed functionality for now
 * 1. <slot> elements do not have boxes by default (i.e. they do not get rendered and
 *    their CSS properties are ignored)
 * 2. <slot> elements can be made to have a box by overriding the display property
 *    which is 'contents' by default
 * 3. Even boxed <slot> elements do not show up in the accessibility tree until
 *    they have a tabindex applied to them OR they have a role applied to them AND
 *    they have a box (this is observed behavior in Safari on OS X, I cannot find
 *    the spec for this)
 */

let hasShadowRoot;

/**
 * Recursvely returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
 *
 * @param {Node} [node=document.documentElement] optional node. NOTE: passing in anything other than body or the documentElement may result in incomplete results.
 * @param {String} [shadowId] optional ID of the shadow DOM that is the closest shadow
 *                           ancestor of the node
 */
function getFlattenedTree(
  node = document.documentElement,
  shadowId
) {
  hasShadowRoot = false;
  const selectorMap = {};
  chunk007.cache.set('nodeMap', new WeakMap());
  chunk007.cache.set('selectorMap', selectorMap);

  // specifically pass `null` to the parent to designate the top
  // node of the tree. if parent === undefined then we know
  // we are in a disconnected tree
  const tree = flattenTree(node, shadowId, null);
  tree[0]._selectorMap = selectorMap;

  // allow rules and checks to know if there is a shadow root attached
  // to the current tree
  tree[0]._hasShadowRoot = hasShadowRoot;

  return tree;
}

/**
 * find all the fallback content for a <slot> and return these as an array
 * this array will also include any #text nodes
 *
 * @param node {Node} - the slot Node
 * @return Array{Nodes}
 */
function getSlotChildren(node) {
  const childNodes = [];

  node = node.firstChild;
  while (node) {
    childNodes.push(node);
    node = node.nextSibling;
  }
  return childNodes;
}

/**
 * Create a virtual node
 * @param {Node} node the current node
 * @param {VirtualNode} parent the parent VirtualNode
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow ancestor of the node
 * @return {VirtualNode}
 */
function createNode(node, parent, shadowId) {
  const vNode = new VirtualNode(node, parent, shadowId);
  chunk013.cacheNodeSelectors(vNode, chunk007.cache.get('selectorMap'));

  return vNode;
}

/**
 * Add children to the parent virtual node
 * @param {Node[]} childNodes the children of the parent
 * @param {VirtualNode} parent the parent VirtualNode
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow ancestor of the node
 */
function createChildren(childNodes, parent, shadowId) {
  const children = [];

  childNodes.forEach(childNode => {
    const child = flattenTree(childNode, shadowId, parent);
    if (child) {
      children.push(...child);
    }
  });

  return children;
}

/**
 * Recursively returns an array of the virtual DOM nodes at this level
 * excluding comment nodes and the shadow DOM nodes <content> and <slot>
 *
 * @param {Node} node the current node
 * @param {String} shadowId, optional ID of the shadow DOM that is the closest shadow ancestor of the node
 * @param {VirtualNode} parent the parent VirtualNode
 */
function flattenTree(node, shadowId, parent) {
  let vNode, childNodes;

  if (node.documentElement) {
    // document
    node = node.documentElement;
  }
  const nodeName = node.nodeName.toLowerCase();

  if (chunk013.isShadowRoot(node)) {
    hasShadowRoot = true;

    // generate an ID for this shadow root and overwrite the current
    // closure shadowId with this value so that it cascades down the tree
    vNode = createNode(node, parent, shadowId);
    shadowId = 'a' + Math.random().toString().substring(2);
    childNodes = Array.from(node.shadowRoot.childNodes);
    vNode.children = createChildren(childNodes, vNode, shadowId);

    return [vNode];
  }

  if (
    nodeName === 'content' &&
    typeof node.getDistributedNodes === 'function'
  ) {
    childNodes = Array.from(node.getDistributedNodes());
    return createChildren(childNodes, parent, shadowId);
  }

  if (nodeName === 'slot' && typeof node.assignedNodes === 'function') {
    childNodes = Array.from(node.assignedNodes());
    if (!childNodes.length) {
      // fallback content
      childNodes = getSlotChildren(node);
    }

    window.getComputedStyle(node);

    return createChildren(childNodes, parent, shadowId);
  }

  if (node.nodeType === document.ELEMENT_NODE) {
    vNode = createNode(node, parent, shadowId);
    childNodes = Array.from(node.childNodes);
    vNode.children = createChildren(childNodes, vNode, shadowId);

    return [vNode];
  }

  if (node.nodeType === document.TEXT_NODE) {
    return [createNode(node, parent)];
  }

  return undefined;
}

const resultKeys = chunk007.constants.resultGroups;

/**
 * Configures the processing of axe results.
 *
 * @typedef ProcessOptions
 * @property {Array} resultsTypes limit the types of results to process ('passes', 'violations', etc.)
 * @property {Boolean} elementRef display node's element references
 * @property {Boolean} selectors display node's selectors
 * @property {Boolean} xpath display node's xpaths
 */

/**
 * Aggregate and process the axe results,
 * adding desired data to nodes and relatedNodes in each rule result.
 *
 * Prepares result data for reporters.
 *
 * @method processAggregate
 * @memberof helpers
 * @param	{Array} results
 * @param	{ProcessOptions} options
 * @return {Object}
 *
 */
function processAggregate(results, options) {
  const resultObject = chunk007.axe.utils.aggregateResult(results);

  resultKeys.forEach(key => {
    if (options.resultTypes && !options.resultTypes.includes(key)) {
      // If the user asks us to, truncate certain finding types to maximum one finding
      (resultObject[key] || []).forEach(ruleResult => {
        if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
          ruleResult.nodes = [ruleResult.nodes[0]];
        }
      });
    }
    resultObject[key] = (resultObject[key] || []).map(ruleResult => {
      ruleResult = Object.assign({}, ruleResult);

      if (Array.isArray(ruleResult.nodes) && ruleResult.nodes.length > 0) {
        ruleResult.nodes = ruleResult.nodes.map(subResult => {
          if (typeof subResult.node === 'object') {
            const serialElm = trimElementSpec(subResult.node, options);
            Object.assign(subResult, serialElm);
          }
          delete subResult.result;
          delete subResult.node;

          normalizeRelatedNodes(subResult, options);

          return subResult;
        });
      }

      resultKeys.forEach(resultKey => delete ruleResult[resultKey]);
      delete ruleResult.pageLevel;
      delete ruleResult.result;

      return ruleResult;
    });
  });

  return resultObject;
}

function normalizeRelatedNodes(node, options) {
  ['any', 'all', 'none'].forEach(type => {
    if (!Array.isArray(node[type])) {
      return;
    }
    node[type]
      .filter(checkRes => Array.isArray(checkRes.relatedNodes))
      .forEach(checkRes => {
        checkRes.relatedNodes = checkRes.relatedNodes.map(relatedNode => {
          return trimElementSpec(relatedNode, options);
        });
      });
  });
}

function trimElementSpec(elmSpec = {}, runOptions) {
  // Pass options to limit which properties are calculated
  elmSpec = chunk011.nodeSerializer.dqElmToSpec(elmSpec, runOptions);
  const serialElm = {};
  if (chunk007.axe._audit.noHtml) {
    serialElm.html = null;
  } else {
    serialElm.html = elmSpec.source ?? 'Undefined';
  }
  if (runOptions.elementRef && !elmSpec.fromFrame) {
    serialElm.element = elmSpec.element ?? null;
  }
  if (runOptions.selectors !== false || elmSpec.fromFrame) {
    serialElm.target = elmSpec.selector ?? [':root'];
  }
  if (runOptions.ancestry) {
    serialElm.ancestry = elmSpec.ancestry ?? [':root'];
  }
  if (runOptions.xpath) {
    serialElm.xpath = elmSpec.xpath ?? ['/'];
  }
  return serialElm;
}

const dataRegex = /\$\{\s?data\s?\}/g;

/**
 * Replace a placeholder with the value of a data string or object
 * @param {String} str
 * @param {String|Object} data
 */
function substitute(str, data) {
  // replace all instances of ${ data } with the value of the string
  if (typeof data === 'string') {
    return str.replace(dataRegex, data);
  }

  // replace all instances of ${ data[prop] } with the value of the property
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      const regex = new RegExp('\\${\\s?data\\.' + prop + '\\s?}', 'g');
      const replace =
        typeof data[prop] === 'undefined' ? '' : String(data[prop]);
      str = str.replace(regex, replace);
    }
  }

  return str;
}

/**
 * Process a metadata message.
 * @param {String|Object} message
 * @param {Object} data
 * @return {String}
 */
function processMessage(message, data) {
  if (!message) {
    return;
  }

  // data as array
  if (Array.isArray(data)) {
    data.values = data.join(', ');

    if (
      typeof message.singular === 'string' &&
      typeof message.plural === 'string'
    ) {
      const str = data.length === 1 ? message.singular : message.plural;
      return substitute(str, data);
    }

    // no singular/plural message so just pass data
    return substitute(message, data);
  }

  // message is a string that uses data as a string or object properties
  if (typeof message === 'string') {
    return substitute(message, data);
  }

  // message is an object that uses value of data to determine message
  if (typeof data === 'string') {
    const str = message[data];
    return substitute(str, data);
  }

  // message uses value of data property to determine message
  let str = message.default || chunk012.incompleteFallbackMessage();

  if (data && data.messageKey && message[data.messageKey]) {
    str = message[data.messageKey];
  }

  return processMessage(str, data);
}

/**
 * Get the pass, fail, or incomplete message for a check.
 * @param {String} checkId The check id
 * @param {String} type The message type ('pass', 'fail', or 'incomplete')
 * @param {Object} [data] The check data
 * @return {String}
 */
function getCheckMessage(checkId, type, data) {
  // TODO: es-modules_audit
  const check = chunk007.axe._audit.data.checks[checkId];

  if (!check) {
    throw new Error(`Cannot get message for unknown check: ${checkId}.`);
  }
  if (!check.messages[type]) {
    throw new Error(`Check "${checkId}"" does not have a "${type}" message.`);
  }

  return processMessage(check.messages[type], data);
}

function createFrameContext(frame, { focusable, page }) {
  return {
    node: frame,
    include: [],
    exclude: [],
    initiator: false,
    focusable: focusable && frameFocusable(frame),
    size: getBoundingSize(frame),
    page
  };
}

function frameFocusable(frame) {
  const tabIndex = chunk013.parseTabindex(frame.getAttribute('tabindex'));
  return tabIndex === null || tabIndex >= 0;
}

function getBoundingSize(domNode) {
  let width = parseInt(domNode.getAttribute('width'), 10);
  let height = parseInt(domNode.getAttribute('height'), 10);

  if (isNaN(width) || isNaN(height)) {
    const rect = domNode.getBoundingClientRect();
    width = isNaN(width) ? rect.width : width;
    height = isNaN(height) ? rect.height : height;
  }
  return { width, height };
}

/**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} contextSpec The configuration object passed to `Context`
 * @return {Object}            Normalized context spec to include both `include` and `exclude` arrays
 */
function normalizeContext(contextSpec) {
  if (chunk013.isContextObject(contextSpec)) {
    // Assert include / exclude isn't mixed with fromFrames / fromShadowDom
    const msg =
      ' must be used inside include or exclude. It should not be on the same object.';
    assert(!chunk013.objectHasOwn(contextSpec, 'fromFrames'), 'fromFrames' + msg);
    assert(!chunk013.objectHasOwn(contextSpec, 'fromShadowDom'), 'fromShadowDom' + msg);
  } else if (chunk013.isContextProp(contextSpec)) {
    // Wrap in include
    contextSpec = { include: contextSpec, exclude: [] };
  } else {
    // Spec is unknown
    return { include: [document], exclude: [] };
  }

  const include = normalizeContextList(contextSpec.include);
  if (include.length === 0) {
    include.push(document); // Include defaults to [document] if empty
  }
  const exclude = normalizeContextList(contextSpec.exclude);
  return { include, exclude };
}

function normalizeContextList(selectorList = []) {
  const normalizedList = [];
  if (!chunk013.isArrayLike(selectorList)) {
    selectorList = [selectorList];
  }
  // Use .length to handle jQuery-like objects
  for (let i = 0; i < selectorList.length; i++) {
    const normalizedSelector = normalizeContextSelector(selectorList[i]);
    if (normalizedSelector) {
      normalizedList.push(normalizedSelector);
    }
  }
  return normalizedList;
}

function normalizeContextSelector(selector) {
  if (selector instanceof window.Node) {
    return selector; // Nodes must not be wrapped in an array
  }
  if (typeof selector === 'string') {
    return [selector]; // Convert to frame selector
  }

  if (chunk013.isLabelledFramesSelector(selector)) {
    assertLabelledFrameSelector(selector);
    selector = selector.fromFrames;
  } else if (chunk013.isLabelledShadowDomSelector(selector)) {
    selector = [selector];
  }
  return normalizeFrameSelectors(selector);
}

function normalizeFrameSelectors(frameSelectors) {
  if (!Array.isArray(frameSelectors)) {
    return; // Invalid. Skip this selector
  }
  const normalizedSelectors = [];
  for (let selector of frameSelectors) {
    if (chunk013.isLabelledShadowDomSelector(selector)) {
      assertLabelledShadowDomSelector(selector);
      selector = selector.fromShadowDom;
    }
    if (typeof selector !== 'string' && !isShadowSelector(selector)) {
      return; // Invalid. Skip this selector
    }
    normalizedSelectors.push(selector);
  }
  return normalizedSelectors;
}

function assertLabelledFrameSelector(selector) {
  assert(
    Array.isArray(selector.fromFrames),
    'fromFrames property must be an array'
  );
  assert(
    selector.fromFrames.every(
      fromFrameSelector => !chunk013.objectHasOwn(fromFrameSelector, 'fromFrames')
    ),
    'Invalid context; fromFrames selector must be appended, rather than nested'
  );
  assert(
    !chunk013.objectHasOwn(selector, 'fromShadowDom'),
    'fromFrames and fromShadowDom cannot be used on the same object'
  );
}

function assertLabelledShadowDomSelector(selector) {
  assert(
    Array.isArray(selector.fromShadowDom),
    'fromShadowDom property must be an array'
  );
  assert(
    selector.fromShadowDom.every(
      fromShadowDomSelector =>
        !chunk013.objectHasOwn(fromShadowDomSelector, 'fromFrames')
    ),
    'shadow selector must be inside fromFrame instead'
  );
  assert(
    selector.fromShadowDom.every(
      fromShadowDomSelector =>
        !chunk013.objectHasOwn(fromShadowDomSelector, 'fromShadowDom')
    ),
    'fromShadowDom selector must be appended, rather than nested'
  );
}

function isShadowSelector(selector) {
  return (
    Array.isArray(selector) && selector.every(str => typeof str === 'string')
  );
}

// Wrapper to ensure the correct message
function assert(bool, str) {
  chunk007.assert(
    bool,
    `Invalid context; ${str}\nSee: https://github.com/dequelabs/axe-core/blob/master/doc/context.md`
  );
}

/**
 * Finds frames in context, converts selectors to Element references and pushes unique frames
 * @private
 * @param  {Context} context The instance of Context to operate on
 * @param  {String} type     The "type" of thing to parse, "include" or "exclude"
 * @return {Array}           Parsed array of matching elements
 */
function parseSelectorArray(context, type) {
  const result = [];
  for (let i = 0, l = context[type].length; i < l; i++) {
    const item = context[type][i];
    // Handle nodes
    if (item instanceof window.Node) {
      if (item.documentElement instanceof window.Node) {
        result.push(context.flatTree[0]);
      } else if (item.host instanceof window.Node) {
        // Item is a shadow root. We only cache instances of `Element`,
        // not `DocumentFragment`, so instead of the shadow root itself,
        // we'll push all of its children to context.
        const children = Array.from(item.children).map(child =>
          chunk010.getNodeFromTree(child)
        );
        result.push(...children);
      } else {
        result.push(chunk010.getNodeFromTree(item));
      }

      // Handle Iframe selection
    } else if (item && item.length) {
      if (item.length > 1) {
        pushUniqueFrameSelector(context, type, item);
      } else {
        const nodeList = chunk014.shadowSelectAll(item[0]);
        result.push(...nodeList.map(node => chunk010.getNodeFromTree(node)));
      }
    }
  }

  // filter nulls
  return result.filter(r => r);
}

/**
 * Unshift selectors of matching iframes
 * @private
 * @param  {Context} context 	  The context object to operate on and assign to
 * @param  {String} type          The "type" of context, 'include' or 'exclude'
 * @param  {Array} selectorArray  Array of CSS selectors, each element represents a frame;
 * where the last element is the actual node
 */
function pushUniqueFrameSelector(context, type, selectorArray) {
  context.frames = context.frames || [];

  const frameSelector = selectorArray.shift();
  const frames = chunk014.shadowSelectAll(frameSelector);
  frames.forEach(frame => {
    let frameContext = context.frames.find(result => result.node === frame);
    if (!frameContext) {
      frameContext = createFrameContext(frame, context);
      context.frames.push(frameContext);
    }
    frameContext[type].push(selectorArray);
  });
}

/**
 * Holds context of includes, excludes and frames for analysis.
 *
 * @todo  clarify and sync changes to design doc
 * Context : {IncludeStrings} || {
 *   // defaults to document/all
 *   include: {IncludeStrings},
 *   exclude : {ExcludeStrings}
 * }
 *
 * IncludeStrings : [{CSSSelectorArray}] || Node
 * ExcludeStrings : [{CSSSelectorArray}]
 * `CSSSelectorArray` an Array of selector strings that addresses a Node in a multi-frame document. All addresses
 * are in this form regardless of whether the document contains any frames.To evaluate the selectors to
 * find the node referenced by the array, evaluate the selectors in-order, starting in window.top. If N
 * is the length of the array, then the first N-1 selectors should result in an iframe and the last
 * selector should result in the specific node.
 *
 * @param {Object} spec Configuration or "specification" object
 */
function Context(spec, flatTree) {
  spec = chunk010.clone(spec);
  this.frames = [];
  this.page = typeof spec?.page === 'boolean' ? spec.page : undefined;
  this.initiator = typeof spec?.initiator === 'boolean' ? spec.initiator : true;
  this.focusable = typeof spec?.focusable === 'boolean' ? spec.focusable : true;
  this.size = typeof spec?.size === 'object' ? spec.size : {};

  spec = normalizeContext(spec);

  // cache the flattened tree
  this.flatTree = flatTree ?? getFlattenedTree(getRootNode(spec));
  this.exclude = spec.exclude;
  this.include = spec.include;

  this.include = parseSelectorArray(this, 'include');
  this.exclude = parseSelectorArray(this, 'exclude');

  chunk014.select('frame, iframe', this).forEach(frame => {
    if (chunk013.isNodeInContext(frame, this)) {
      pushUniqueFrame(this, frame.actualNode);
    }
  });

  if (typeof this.page === 'undefined') {
    // Figure out if the entire page is in scope
    this.page = isPageContext(this);
    this.frames.forEach(frame => {
      frame.page = this.page;
    });
  }

  // Validate outside of a frame
  validateContext(this);

  if (!Array.isArray(this.include)) {
    this.include = Array.from(this.include);
  }
  this.include.sort(chunk013.nodeSorter); // ensure that the order of the include nodes is document order
}

/**
 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
 * @private
 * @param  {Object} Context      Parent context for the frame
 * @param  {HTMLElement} frame   The frame to push onto Context
 */
function pushUniqueFrame(context, frame) {
  if (
    !isVisibleToScreenReaders(frame) ||
    chunk011.findBy(context.frames, 'node', frame)
  ) {
    return;
  }
  context.frames.push(createFrameContext(frame, context));
}

/**
 * Check if a normalized context tests the full page
 * @private
 */
function isPageContext({ include }) {
  return (
    include.length === 1 && include[0].actualNode === document.documentElement
  );
}

/**
 * Check that the context, as well as each frame includes at least 1 element
 * @private
 * @param  {context} context
 * @return {Error}
 */
function validateContext(context) {
  if (context.include.length === 0 && context.frames.length === 0) {
    const env = chunk011.respondable.isInFrame() ? 'frame' : 'page';
    throw new Error('No elements found for include in ' + env + ' Context');
  }
}

/**
 * For a context-like object, find its shared root node
 */
function getRootNode({ include, exclude }) {
  const selectors = Array.from(include).concat(Array.from(exclude));
  // Find the first Element.ownerDocument or Document
  for (let i = 0; i < selectors.length; i++) {
    const item = selectors[i];
    if (item instanceof window.Element) {
      return item.ownerDocument.documentElement;
    }

    if (item instanceof window.Document) {
      return item.documentElement;
    }
  }
  return document.documentElement;
}

function getFrameContexts(context, options = {}) {
  if (options.iframes === false) {
    return [];
  }

  const { frames } = new Context(context);
  return frames.map(({ node, ...frameContext }) => {
    frameContext.initiator = false;
    const frameSelector = chunk007.getAncestry(node);
    return { frameSelector, frameContext };
  });
}

function getStandards() {
  return chunk010.clone(standards);
}

/**
 * Verifies that if a given html tag is valid
 * @method isHtmlElement
 * @memberof axe.utils
 * @param {HTMLElement|VirtualNode} node node to check if valid
 * @return {Boolean} true/ false
 */
function isHtmlElement(node) {
  const nodeName = node.props?.nodeName ?? node.nodeName.toLowerCase();

  if (node.namespaceURI === 'http://www.w3.org/2000/svg') {
    return false;
  }

  return !!standards.htmlElms[nodeName];
}

/**
 * Publish metadata from axe._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
function publishMetaData(ruleResult) {
  // TODO: es-modules_audit
  const checksData = chunk007.axe._audit.data.checks || {};
  const rulesData = chunk007.axe._audit.data.rules || {};
  const rule = chunk011.findBy(chunk007.axe._audit.rules, 'id', ruleResult.id) || {};

  ruleResult.tags = chunk010.clone(rule.tags || []);

  const shouldBeTrue = extender(checksData, true, rule);
  const shouldBeFalse = extender(checksData, false, rule);
  ruleResult.nodes.forEach(detail => {
    detail.any.forEach(shouldBeTrue);
    detail.all.forEach(shouldBeTrue);
    detail.none.forEach(shouldBeFalse);
  });
  chunk011.extendMetaData(ruleResult, chunk010.clone(rulesData[ruleResult.id] || {}));
}

/**
 * Construct incomplete message from check.data
 * @param  {Object} checkData Check result with reason specified
 * @param  {Object} messages Source data object with message options
 * @return  {String}
 * @private
 */
function getIncompleteReason(checkData, messages) {
  function getDefaultMsg(message) {
    if (message.incomplete && message.incomplete.default) {
      // fall back to the default message if no reason specified
      return message.incomplete.default;
    } else {
      return chunk012.incompleteFallbackMessage();
    }
  }
  if (checkData && checkData.missingData) {
    try {
      const msg = messages.incomplete[checkData.missingData[0].reason];
      if (!msg) {
        throw new Error();
      }
      return msg;
    } catch {
      if (typeof checkData.missingData === 'string') {
        // return a string with the appropriate reason
        return messages.incomplete[checkData.missingData];
      } else {
        return getDefaultMsg(messages);
      }
    }
  } else if (checkData && checkData.messageKey) {
    return messages.incomplete[checkData.messageKey];
  } else {
    return getDefaultMsg(messages);
  }
}

/**
 * Extend checksData with the correct result message
 * @param  {Object} checksData The check result data
 * @param  {Boolean} shouldBeTrue Result of pass/fail check run
 * @param  {Object} rule The rule metadata
 * @return {Function}
 * @private
 */
function extender(checksData, shouldBeTrue, rule) {
  return check => {
    const sourceData = checksData[check.id] || {};
    const messages = sourceData.messages || {};
    const data = Object.assign({}, sourceData);
    delete data.messages;
    if (!rule.reviewOnFail && check.result === undefined) {
      // handle old doT template
      if (
        typeof messages.incomplete === 'object' &&
        !Array.isArray(check.data)
      ) {
        data.message = getIncompleteReason(check.data, messages);
      }

      // fallback to new process message style
      if (!data.message) {
        data.message = messages.incomplete;
      }
    } else {
      data.message =
        check.result === shouldBeTrue ? messages.pass : messages.fail;
    }

    // don't process doT template functions
    if (typeof data.message !== 'function') {
      data.message = processMessage(data.message, check.data);
    }

    chunk011.extendMetaData(check, data);
  };
}

/**
 * Namespace for utility helper methods.
 * @namespace utils
 * @memberof axe
 */

const utils = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DqElement: chunk010.DqElement,
  RuleError: chunk014.RuleError,
  aggregate: chunk007.aggregate,
  aggregateChecks: chunk007.aggregateChecks,
  aggregateNodeResults: chunk007.aggregateNodeResults,
  aggregateResult: chunk007.aggregateResult,
  areStylesSet: chunk007.areStylesSet,
  assert: chunk007.assert,
  checkHelper: chunk010.checkHelper,
  clone: chunk010.clone,
  closest: chunk011.closest,
  collectResultsFromFrames: chunk011.collectResultsFromFrames,
  contains: chunk011.contains,
  convertSelector: chunk011.convertSelector,
  cssParser: chunk010.parser,
  deepMerge: chunk011.deepMerge,
  escapeSelector: chunk007.escapeSelector,
  extendMetaData: chunk011.extendMetaData,
  filterHtmlAttrs: chunk012.filterHtmlAttrs,
  finalizeRuleResult: chunk007.finalizeRuleResult,
  findBy: chunk011.findBy,
  getAllChecks: chunk011.getAllChecks,
  getAncestry: chunk007.getAncestry,
  getBaseLang: chunk012.getBaseLang,
  getCheckMessage,
  getCheckOption: chunk012.getCheckOption,
  getElementSource: chunk010.getElementSource,
  getEnvironmentData: chunk012.getEnvironmentData,
  getFlattenedTree,
  getFrameContexts,
  getFriendlyUriEnd: chunk010.getFriendlyUriEnd,
  getNodeAttributes: chunk007.getNodeAttributes,
  getNodeFromTree: chunk010.getNodeFromTree,
  getPreloadConfig: chunk014.getPreloadConfig,
  getRootNode: chunk012.getRootNode,
  getRule: chunk013.getRule,
  getScroll: chunk013.getScroll,
  getScrollState: chunk013.getScrollState,
  getSelector: chunk010.getSelector,
  getSelectorData: chunk010.getSelectorData,
  getShadowSelector: chunk007.getShadowSelector,
  getStandards,
  getStyleSheetFactory: chunk013.getStyleSheetFactory,
  getXpath: chunk010.getXpath,
  injectStyle: chunk013.injectStyle,
  isArrayLike: chunk013.isArrayLike,
  isContextObject: chunk013.isContextObject,
  isContextProp: chunk013.isContextProp,
  isContextSpec: chunk013.isContextSpec,
  isHidden: chunk013.isHidden,
  isHtmlElement,
  isLabelledFramesSelector: chunk013.isLabelledFramesSelector,
  isLabelledShadowDomSelector: chunk013.isLabelledShadowDomSelector,
  isNodeInContext: chunk013.isNodeInContext,
  isShadowRoot: chunk013.isShadowRoot,
  isValidLang: chunk015.isValidLang,
  isXHTML: chunk010.isXHTML,
  matchAncestry: chunk013.matchAncestry,
  matches: chunk011.matches,
  matchesExpression: chunk011.matchesExpression,
  matchesSelector: chunk010.matchesSelector,
  memoize: chunk010.memoizeImplementation,
  mergeResults: chunk011.mergeResults,
  nodeLookup: chunk013.nodeLookup,
  nodeSerializer: chunk011.nodeSerializer,
  nodeSorter: chunk013.nodeSorter,
  objectHasOwn: chunk013.objectHasOwn,
  parseCrossOriginStylesheet: chunk013.parseCrossOriginStylesheet,
  parseSameOriginStylesheet: chunk013.parseSameOriginStylesheet,
  parseStylesheet: chunk013.parseStylesheet,
  parseTabindex: chunk013.parseTabindex,
  performanceTimer: chunk013.performanceTimer,
  pollyfillElementsFromPoint: chunk014.pollyfillElementsFromPoint,
  preload: chunk014.preload,
  preloadCssom: chunk014.preloadCssom,
  preloadMedia: chunk014.preloadMedia,
  processMessage,
  publishMetaData,
  querySelectorAll: chunk014.querySelectorAll,
  querySelectorAllFilter: chunk014.querySelectorAllFilter,
  queue: chunk011.queue,
  respondable: chunk011.respondable,
  ruleShouldRun: chunk014.ruleShouldRun,
  select: chunk014.select,
  sendCommandToFrame: chunk011.sendCommandToFrame,
  serializeError: chunk014.serializeError,
  setScrollState: chunk014.setScrollState,
  shadowSelect: chunk014.shadowSelect,
  shadowSelectAll: chunk014.shadowSelectAll,
  shouldPreload: chunk014.shouldPreload,
  toArray: chunk010.toArray,
  tokenList: chunk013.tokenList,
  uniqueArray: chunk014.uniqueArray,
  uuid: chunk011.v4,
  validInputTypes: chunk014.validInputTypes,
  validLangs: chunk015.validLangs
}, Symbol.toStringTag, { value: 'Module' }));

exports.Context = Context;
exports.VirtualNode = VirtualNode;
exports.accessibleText = accessibleText;
exports.accessibleTextVirtual = accessibleTextVirtual;
exports.areaHidden = areaHidden;
exports.ariaHidden = ariaHidden;
exports.arialabelText = arialabelText;
exports.arialabelledbyText = arialabelledbyText;
exports.clipHidden = clipHidden;
exports.configureStandards = configureStandards;
exports.contentVisibiltyHidden = contentVisibiltyHidden;
exports.detailsHidden = detailsHidden;
exports.displayHidden = displayHidden;
exports.dom = dom;
exports.findNearbyElms = findNearbyElms;
exports.findUp = findUp;
exports.findUpVirtual = findUpVirtual;
exports.getCellPosition = getCellPosition$1;
exports.getElementSpec = getElementSpec;
exports.getElementStack = getElementStack;
exports.getElementsByContentType = getElementsByContentType;
exports.getExplicitRole = getExplicitRole;
exports.getFlattenedTree = getFlattenedTree;
exports.getGlobalAriaAttrs = getGlobalAriaAttrs;
exports.getOffset = getOffset;
exports.getOwnedVirtual = getOwnedVirtual;
exports.getRole = getRole;
exports.getRoleType = getRoleType;
exports.getScope = getScope;
exports.getTextElementStack = getTextElementStack;
exports.getVisibleChildTextRects = getVisibleChildTextRects;
exports.hasChildTextNodes = hasChildTextNodes;
exports.hasContent = hasContent;
exports.hasContentVirtual = hasContentVirtual;
exports.hasLangText = hasLangText;
exports.hasVisualOverlap = hasVisualOverlap;
exports.idrefs = idrefs;
exports.implicitHtmlRoles = implicitHtmlRoles;
exports.implicitRole = implicitRole;
exports.insertedIntoFocusOrder = insertedIntoFocusOrder;
exports.isAriaCombobox = isAriaCombobox;
exports.isAriaListbox = isAriaListbox;
exports.isAriaRange = isAriaRange;
exports.isAriaTextbox = isAriaTextbox;
exports.isColumnHeader = isColumnHeader;
exports.isFocusable = isFocusable;
exports.isHiddenForEveryone = isHiddenForEveryone;
exports.isHtmlElement = isHtmlElement;
exports.isInTabOrder = isInTabOrder;
exports.isInTextBlock = isInTextBlock;
exports.isInert = isInert;
exports.isModalOpen = isModalOpen;
exports.isNativeSelect = isNativeSelect;
exports.isNativeTextbox = isNativeTextbox;
exports.isOffscreen = isOffscreen;
exports.isRowHeader = isRowHeader;
exports.isSkipLink = isSkipLink;
exports.isUnsupportedRole = isUnsupportedRole;
exports.isValidRole = isValidRole;
exports.isVisibleOnScreen = isVisibleOnScreen;
exports.isVisibleToScreenReaders = isVisibleToScreenReaders;
exports.labelText = labelText;
exports.labelVirtual = labelVirtual$1;
exports.labelVirtual$1 = labelVirtual;
exports.matches = matches;
exports.math = math;
exports.namedFromContents = namedFromContents;
exports.nativelyHidden = nativelyHidden;
exports.opacityHidden = opacityHidden;
exports.overflowHidden = overflowHidden;
exports.processAggregate = processAggregate;
exports.publishMetaData = publishMetaData;
exports.resetStandards = resetStandards;
exports.scrollHidden = scrollHidden;
exports.standards = standards;
exports.subtreeText = subtreeText;
exports.text = text;
exports.titleText = titleText;
exports.toArray = toArray;
exports.utils = utils;
exports.visibilityHidden = visibilityHidden;
exports.visibleVirtual = visibleVirtual;
