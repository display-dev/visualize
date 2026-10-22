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
const chunk012 = require('./chunk-012.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');
const chunk019 = require('./chunk-019.cjs');
require('./chunk-020.cjs');
const chunk024 = require('./chunk-024.cjs');
const chunk021 = require('./chunk-021.cjs');
const chunk016 = require('./chunk-016.cjs');
const chunk015 = require('./chunk-015.cjs');

function regionAfter(results) {
  const iframeResults = results.filter(r => r.data.isIframe);

  results.forEach(r => {
    // continue if the element passed the check or is not in a frame
    if (r.result || r.node.ancestry.length === 1) {
      return;
    }

    const frameAncestry = r.node.ancestry.slice(0, -1);
    for (const iframeResult of iframeResults) {
      // if the container frame passed the check, this element should also pass
      if (chunk013.matchAncestry(frameAncestry, iframeResult.node.ancestry)) {
        r.result = iframeResult.result;
        break;
      }
    }
  });

  // iframe elements should always pass
  iframeResults.forEach(r => {
    if (!r.result) {
      r.result = true;
    }
  });
  return results;
}

const implicitAriaLiveRoles = ['alert', 'log', 'status'];

function regionEvaluate(node, options, virtualNode) {
  this.data({
    isIframe: ['iframe', 'frame'].includes(virtualNode.props.nodeName)
  });

  const regionlessNodes = chunk007.cache.get('regionlessNodes', () =>
    getRegionlessNodes(options)
  );

  return !regionlessNodes.includes(virtualNode);
}

function getRegionlessNodes(options) {
  const regionlessNodes = findRegionlessElms(chunk007.axe._tree[0], options)
    // Find first parent marked as having region descendant (or body) and
    // return the node right before it as the "outer" element
    .map(vNode => {
      while (
        vNode.parent &&
        !vNode.parent._hasRegionDescendant &&
        vNode.parent.actualNode !== document.body
      ) {
        vNode = vNode.parent;
      }

      return vNode;
    })
    // Remove duplicate containers
    .filter((vNode, index, array) => {
      return array.indexOf(vNode) === index;
    });
  return regionlessNodes;
}

/**
 * Find all visible elements not wrapped inside a landmark or skiplink
 */
function findRegionlessElms(virtualNode, options) {
  const node = virtualNode.actualNode;
  // End recursion if the element is...
  // - a landmark
  // - a skiplink
  // - hidden content
  if (
    chunk018.getRole(virtualNode) === 'button' ||
    isRegion(virtualNode, options) ||
    ['iframe', 'frame'].includes(virtualNode.props.nodeName) ||
    (chunk018.isSkipLink(virtualNode.actualNode) &&
      chunk012.getElementByReference(virtualNode.actualNode, 'href')) ||
    !chunk018.isVisibleToScreenReaders(node)
  ) {
    // Mark each parent node as having region descendant
    let vNode = virtualNode;
    while (vNode) {
      vNode._hasRegionDescendant = true;
      vNode = vNode.parent;
    }
    // iframes are counted as regionless here, but parent tree should treat them as having content
    // after method makes iframes count as regions
    // this means siblings to iframes will fail, not the parent that contains an iframe and other children
    if (['iframe', 'frame'].includes(virtualNode.props.nodeName)) {
      return [virtualNode];
    }
    return [];

    // Return the node is a content element. Ignore any direct text children
    // of body so we don't report body as being outside of a landmark.
    // @see https://github.com/dequelabs/axe-core/issues/2049
  } else if (
    node !== document.body &&
    chunk018.hasContent(node, /* noRecursion: */ true) &&
    !isShallowlyHidden(virtualNode)
  ) {
    return [virtualNode];

    // Recursively look at all child elements
  } else {
    return virtualNode.children
      .filter(({ actualNode }) => actualNode.nodeType === 1)
      .map(vNode => findRegionlessElms(vNode, options))
      .reduce((a, b) => a.concat(b), []); // flatten the results
  }
}

function isShallowlyHidden(virtualNode) {
  // The element itself is not visible to screen readers, but its descendants might be
  return (
    ['none', 'presentation'].includes(chunk018.getRole(virtualNode)) &&
    !chunk018.hasChildTextNodes(virtualNode)
  );
}

// Check if the current element is a landmark
function isRegion(virtualNode, options) {
  const node = virtualNode.actualNode;
  const role = chunk018.getRole(virtualNode);
  const ariaLive = (node.getAttribute('aria-live') || '').toLowerCase().trim();
  const landmarkRoles = chunk019.getAriaRolesByType('landmark');

  // Ignore content inside of aria-live
  if (
    ['assertive', 'polite'].includes(ariaLive) ||
    implicitAriaLiveRoles.includes(role)
  ) {
    return true;
  }

  // Check if the node matches a landmark role
  if (landmarkRoles.includes(role)) {
    return true;
  }

  // Check if node matches an option
  if (options.regionMatcher && chunk018.matches(virtualNode, options.regionMatcher)) {
    return true;
  }

  return false;
}

function skipLinkEvaluate(node) {
  const target = chunk012.getElementByReference(node, 'href');
  if (target) {
    return chunk018.isVisibleToScreenReaders(target) || undefined;
  }
  return false;
}

function uniqueFrameTitleAfter(results) {
  const titles = {};
  results.forEach(r => {
    titles[r.data] = titles[r.data] !== undefined ? ++titles[r.data] : 0;
  });
  results.forEach(r => {
    r.result = !!titles[r.data];
  });

  return results;
}

function uniqueFrameTitleEvaluate(node, options, vNode) {
  const title = chunk012.sanitize(vNode.attr('title')).toLowerCase();
  this.data(title);
  return true;
}

function duplicateIdAfter(results) {
  const uniqueIds = [];
  return results.filter(r => {
    if (uniqueIds.indexOf(r.data) === -1) {
      uniqueIds.push(r.data);
      return true;
    }
    return false;
  });
}

function duplicateIdEvaluate(node) {
  const id = node.getAttribute('id').trim();
  // Since empty ID's are not meaningful and are ignored by Edge, we'll
  // let those pass.
  if (!id) {
    return true;
  }
  const root = chunk012.getRootNode(node);
  const matchingNodes = Array.from(
    root.querySelectorAll(`[id="${chunk007.escapeSelector(id)}"]`)
  ).filter(foundNode => foundNode !== node);

  if (matchingNodes.length) {
    this.relatedNodes(matchingNodes);
  }
  this.data(id);

  return matchingNodes.length === 0;
}

function ariaLabelEvaluate(node, options, virtualNode) {
  return !!chunk012.sanitize(chunk018.arialabelText(virtualNode));
}

function ariaLabelledbyEvaluate(node, options, virtualNode) {
  try {
    return !!chunk012.sanitize(chunk018.arialabelledbyText(virtualNode));
  } catch {
    return undefined;
  }
}

function avoidInlineSpacingEvaluate(node, options) {
  const overriddenProperties = options.cssProperties.filter(property => {
    if (node.style.getPropertyPriority(property) === `important`) {
      return property;
    }
  });

  if (overriddenProperties.length > 0) {
    this.data(overriddenProperties);
    return false;
  }

  return true;
}

function docHasTitleEvaluate() {
  const title = document.title;
  return !!chunk012.sanitize(title);
}

function existsEvaluate() {
  return undefined;
}

function hasAltEvaluate(node, options, virtualNode) {
  const { nodeName } = virtualNode.props;
  if (!['img', 'input', 'area'].includes(nodeName)) {
    return false;
  }

  return virtualNode.hasAttr('alt');
}

/**
 * Check if a CSS property, !important or not is within an allowed range
 */
function inlineStyleProperty(node, options) {
  const {
    cssProperty,
    absoluteValues,
    minValue,
    maxValue,
    normalValue = 0,
    noImportant,
    multiLineOnly
  } = options;
  if (
    (!noImportant &&
      node.style.getPropertyPriority(cssProperty) !== `important`) ||
    (multiLineOnly && !chunk012.isMultiline(node))
  ) {
    return true;
  }

  const data = {};
  if (typeof minValue === 'number') {
    data.minValue = minValue;
  }
  if (typeof maxValue === 'number') {
    data.maxValue = maxValue;
  }

  // These do not set the actual value to important, instead they
  // say that it is important to use the inherited / root value.
  // The actual value can still be modified
  const declaredPropValue = node.style.getPropertyValue(cssProperty);
  if (
    ['inherit', 'unset', 'revert', 'revert-layer'].includes(declaredPropValue)
  ) {
    this.data({ value: declaredPropValue, ...data });
    return true;
  }

  const value = getNumberValue(node, {
    absoluteValues,
    cssProperty,
    normalValue
  });
  this.data({ value, ...data });
  if (typeof value !== 'number') {
    return undefined; // Renderer did something it shouldn't
  }

  if (
    (typeof minValue !== 'number' || value >= minValue) &&
    (typeof maxValue !== 'number' || value <= maxValue)
  ) {
    return true;
  }
  return false;
}

function getNumberValue(domNode, { cssProperty, absoluteValues, normalValue }) {
  const computedStyle = window.getComputedStyle(domNode);
  const cssPropValue = computedStyle.getPropertyValue(cssProperty);
  if (cssPropValue === 'normal') {
    return normalValue;
  }
  const parsedValue = parseFloat(cssPropValue);
  if (absoluteValues) {
    return parsedValue;
  }

  const fontSize = parseFloat(computedStyle.getPropertyValue('font-size'));
  // Make the value relative to the font-size
  const value = Math.round((parsedValue / fontSize) * 100) / 100;
  if (isNaN(value)) {
    return cssPropValue; // Something went wrong, return the string instead
  }
  return value;
}

function isOnScreenEvaluate(node) {
  // From a visual perspective
  return chunk018.isVisibleOnScreen(node);
}

function nonEmptyIfPresentEvaluate(node, options, virtualNode) {
  // Check for 'default' names, which are given to reset and submit buttons
  const nodeName = virtualNode.props.nodeName;
  const type = (virtualNode.attr('type') || '').toLowerCase();
  const label = virtualNode.attr('value');

  if (label) {
    this.data({
      messageKey: 'has-label'
    });
  }

  if (nodeName === 'input' && ['submit', 'reset'].includes(type)) {
    return label === null;
  }
  return false;
}

function presentationalRoleEvaluate(node, options, virtualNode) {
  const explicitRole = chunk018.getExplicitRole(virtualNode);

  // in JAWS, an iframe or frame with an accessible name and a presentational role gets announced
  // as "group" rather than being ignored. aria-label is handled by role-conflict resolution and
  // aria-labelledby only triggers the group role when it's valid (exists and has content)
  if (
    ['presentation', 'none'].includes(explicitRole) &&
    ['iframe', 'frame'].includes(virtualNode.props.nodeName) &&
    virtualNode.hasAttr('title')
  ) {
    this.data({
      messageKey: 'iframe',
      nodeName: virtualNode.props.nodeName
    });
    return false;
  }

  const role = chunk018.getRole(virtualNode);

  if (['presentation', 'none'].includes(role)) {
    this.data({ role });
    return true;
  }

  // if the user didn't intended to make this presentational we fail
  if (!['presentation', 'none'].includes(explicitRole)) {
    return false;
  }

  // user intended to make this presentational so inform them of
  // problems caused by role conflict resolution
  const hasGlobalAria = chunk018.getGlobalAriaAttrs().some(attr =>
    virtualNode.hasAttr(attr)
  );
  const focusable = chunk018.isFocusable(virtualNode);
  let messageKey;

  if (hasGlobalAria && !focusable) {
    messageKey = 'globalAria';
  } else if (!hasGlobalAria && focusable) {
    messageKey = 'focusable';
  } else {
    messageKey = 'both';
  }

  this.data({
    messageKey,
    role
  });
  return false;
}

function svgNonEmptyTitleEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }

  const titleNode = virtualNode.children.find(({ props }) => {
    return props.nodeName === 'title';
  });

  if (!titleNode) {
    this.data({
      messageKey: 'noTitle'
    });
    return false;
  }

  try {
    const titleText = chunk018.subtreeText(titleNode, { includeHidden: true }).trim();
    if (titleText === '') {
      this.data({
        messageKey: 'emptyTitle'
      });
      return false;
    }
  } catch {
    return undefined;
  }

  return true;
}

function captionFakedEvaluate(node) {
  const table = chunk018.toArray(node);
  const firstRow = table[0];

  if (table.length <= 1 || firstRow.length <= 1 || node.rows.length <= 1) {
    return true;
  }

  return firstRow.reduce((out, curr, i) => {
    return out || (curr !== firstRow[i + 1] && firstRow[i + 1] !== undefined);
  }, false);
}

function html5ScopeEvaluate(node) {
  if (!chunk012.isHTML5(document)) {
    return true;
  }

  return node.nodeName.toUpperCase() === 'TH';
}

function sameCaptionSummaryEvaluate(node, options, virtualNode) {
  if (virtualNode.children === undefined) {
    return undefined;
  }

  const summary = virtualNode.attr('summary');
  const captionNode = virtualNode.children.find(isCaptionNode);
  const caption = captionNode ? chunk012.sanitize(chunk018.subtreeText(captionNode)) : false;

  if (!caption || !summary) {
    return false;
  }

  return chunk012.sanitize(summary).toLowerCase() === chunk012.sanitize(caption).toLowerCase();
}

function isCaptionNode(virtualNode) {
  return virtualNode.props.nodeName === 'caption';
}

function scopeValueEvaluate(node, options) {
  const value = node.getAttribute('scope').toLowerCase();

  return options.values.indexOf(value) !== -1;
}

function tdHasHeaderEvaluate(node) {
  const badCells = [];
  const cells = chunk024.getAllCells(node);
  const tableGrid = chunk018.toArray(node);

  cells.forEach(cell => {
    // For each non-empty data cell that doesn't have an aria label
    if (chunk018.hasContent(cell) && chunk024.isDataCell(cell) && !chunk021.label(cell)) {
      // Check if it has any headers
      const hasHeaders = chunk024.getHeaders(cell, tableGrid).some(header => {
        return header !== null && !!chunk018.hasContent(header);
      });

      // If no headers, put it on the naughty list
      if (!hasHeaders) {
        badCells.push(cell);
      }
    }
  });

  if (badCells.length) {
    this.relatedNodes(badCells);
    return false;
  }

  return true;
}

// Order determines the priority of reporting
// Only if 0 of higher issues exists will the next be reported
const messageKeys = [
  'cell-header-not-in-table',
  'cell-header-not-th',
  'header-refs-self',
  'empty-hdrs' // incomplete
];
const [notInTable, notTh, selfRef, emptyHdrs] = messageKeys;

function tdHeadersAttrEvaluate(node) {
  const cells = [];
  const cellRoleById = {};
  for (let rowIndex = 0; rowIndex < node.rows.length; rowIndex++) {
    const row = node.rows[rowIndex];

    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      const cell = row.cells[cellIndex];
      cells.push(cell);

      // Save header id to set if it's th or td with roles columnheader/rowheader
      const cellId = cell.getAttribute('id');
      if (cellId) {
        cellRoleById[cellId] = chunk018.getRole(cell);
      }
    }
  }

  const badCells = {
    [selfRef]: new Set(),
    [notInTable]: new Set(),
    [notTh]: new Set(),
    [emptyHdrs]: new Set()
  };
  cells.forEach(cell => {
    if (!cell.hasAttribute('headers') || !chunk018.isVisibleToScreenReaders(cell)) {
      return;
    }
    const headersAttr = cell.getAttribute('headers').trim();
    if (!headersAttr) {
      badCells[emptyHdrs].add(cell);
      return;
    }

    const cellId = cell.getAttribute('id');
    // Get a list all the values of the headers attribute
    const headers = chunk013.tokenList(headersAttr);
    headers.forEach(headerId => {
      if (cellId && headerId === cellId) {
        // Header references its own cell
        badCells[selfRef].add(cell);
      } else if (!cellRoleById[headerId]) {
        // Header references a cell that is not in the table
        badCells[notInTable].add(cell);
      } else if (
        !['columnheader', 'rowheader'].includes(cellRoleById[headerId])
      ) {
        // Header references a cell that is not a row or column header
        badCells[notTh].add(cell);
      }
    });
  });

  for (const messageKey of messageKeys) {
    if (badCells[messageKey].size > 0) {
      this.relatedNodes([...badCells[messageKey]]);
      if (messageKey === emptyHdrs) {
        return undefined;
      }
      this.data({ messageKey });
      return false;
    }
  }
  return true;
}

function thHasDataCellsEvaluate(node) {
  const cells = chunk024.getAllCells(node);
  const checkResult = this;

  // Get a list of all headers reffed to in this rule
  let reffedHeaders = [];
  cells.forEach(cell => {
    const headers = cell.getAttribute('headers');
    if (headers) {
      reffedHeaders = reffedHeaders.concat(headers.split(/\s+/));
    }

    const ariaLabel = cell.getAttribute('aria-labelledby');
    if (ariaLabel) {
      reffedHeaders = reffedHeaders.concat(ariaLabel.split(/\s+/));
    }
  });

  // Get all the headers
  const headers = cells.filter(cell => {
    if (chunk012.sanitize(cell.textContent) === '') {
      return false;
    }
    return (
      cell.nodeName.toUpperCase() === 'TH' ||
      ['rowheader', 'columnheader'].indexOf(chunk018.getExplicitRole(cell)) !== -1
    );
  });

  const tableGrid = chunk018.toArray(node);

  let out = true;
  headers.forEach(header => {
    if (
      header.getAttribute('id') &&
      reffedHeaders.includes(header.getAttribute('id'))
    ) {
      return;
    }

    const pos = chunk018.getCellPosition(header, tableGrid);

    // ensure column header has at least 1 non-header cell and that the cell is
    // not pointing to a different header
    let hasCell = false;
    if (chunk018.isColumnHeader(header)) {
      hasCell = chunk024.traverse('down', pos, tableGrid)
        .find(
          cell =>
            !chunk018.isColumnHeader(cell) &&
            chunk024.getHeaders(cell, tableGrid).includes(header)
        );
    }

    // ensure row header has at least 1 non-header cell and that the cell is not
    // pointing to a different header
    if (!hasCell && chunk018.isRowHeader(header)) {
      hasCell = chunk024.traverse('right', pos, tableGrid)
        .find(
          cell =>
            !chunk018.isRowHeader(cell) &&
            chunk024.getHeaders(cell, tableGrid).includes(header)
        );
    }

    // report the node as having failed
    if (!hasCell) {
      checkResult.relatedNodes(header);
    }

    out = out && hasCell;
  });

  return out ? true : undefined;
}

function hiddenContentEvaluate(node, options, virtualNode) {
  const allowlist = [
    'SCRIPT',
    'HEAD',
    'TITLE',
    'NOSCRIPT',
    'STYLE',
    'TEMPLATE'
  ];
  if (
    !allowlist.includes(node.nodeName.toUpperCase()) &&
    chunk018.hasContentVirtual(virtualNode)
  ) {
    const styles = window.getComputedStyle(node);
    if (styles.getPropertyValue('display') === 'none') {
      return undefined;
    } else if (styles.getPropertyValue('visibility') === 'hidden') {
      // Check if visibility isn't inherited
      const parent = chunk012.getComposedParent(node);
      const parentStyle = parent && window.getComputedStyle(parent);
      if (
        !parentStyle ||
        parentStyle.getPropertyValue('visibility') !== 'hidden'
      ) {
        return undefined;
      }
    }
  }
  return true;
}

function ariaAllowedAttrMatches(node, virtualNode) {
  const aria = /^aria-/;
  const attrs = virtualNode.attrNames;
  if (attrs.length) {
    for (let i = 0, l = attrs.length; i < l; i++) {
      if (aria.test(attrs[i])) {
        return true;
      }
    }
  }

  return false;
}

function ariaAllowedRoleMatches(node, virtualNode) {
  return (
    chunk018.getExplicitRole(virtualNode, {
      dpub: true,
      fallback: true
    }) !== null
  );
}

function ariaHasAttrMatches(node, virtualNode) {
  const aria = /^aria-/;

  return virtualNode.attrNames.some(attr => {
    return aria.test(attr);
  });
}

/**
 * Only match the outer-most `aria-hidden=true` element
 * @param {HTMLElement} el the HTMLElement to verify
 * @return {Boolean}
 */
function shouldMatchElement(el) {
  if (!el) {
    return true;
  }
  if (el.getAttribute('aria-hidden') === 'true') {
    return false;
  }
  return shouldMatchElement(chunk012.getComposedParent(el));
}

function ariaHiddenFocusMatches(node) {
  return shouldMatchElement(chunk012.getComposedParent(node));
}

function ariaRequiredChildrenMatches(node, virtualNode) {
  const role = chunk018.getExplicitRole(virtualNode, { dpub: true });
  return !!chunk021.requiredOwned(role);
}

function ariaRequiredParentMatches(node, virtualNode) {
  const role = chunk018.getExplicitRole(virtualNode);
  return !!chunk021.requiredContext(role);
}

function autocompleteMatches(node, virtualNode) {
  const autocomplete = virtualNode.attr('autocomplete');
  if (!autocomplete || chunk012.sanitize(autocomplete) === '') {
    return false;
  }

  const nodeName = virtualNode.props.nodeName;
  if (['textarea', 'input', 'select'].includes(nodeName) === false) {
    return false;
  }

  // The element has a `readonly` or `aria-readonly="true"` attribute
  const ariaReadonly = virtualNode.attr('aria-readonly') || 'false';
  if (
    virtualNode.hasAttr('readonly') ||
    ariaReadonly.toLowerCase() === 'true'
  ) {
    return false;
  }

  // The element is an `input` element a `type` of `hidden`, `button`, `submit` or `reset`
  const excludedInputTypes = ['submit', 'reset', 'button', 'hidden'];
  if (
    nodeName === 'input' &&
    excludedInputTypes.includes(virtualNode.props.type)
  ) {
    return false;
  }

  // The element has a `disabled` or `aria-disabled="true"` attribute
  const ariaDisabled = virtualNode.attr('aria-disabled') || 'false';
  if (
    virtualNode.hasAttr('disabled') ||
    ariaDisabled.toLowerCase() === 'true'
  ) {
    return false;
  }

  // The element has `tabindex="-1"` and has a [[semantic role]] that is
  //   not a [widget](https://www.w3.org/TR/wai-aria-1.1/#widget_roles)
  const role = chunk018.getExplicitRole(virtualNode);
  const tabIndex = chunk013.parseTabindex(virtualNode.attr('tabindex'));
  if (tabIndex < 0 && virtualNode.hasAttr('role')) {
    const roleDef = chunk018.standards.ariaRoles[role];
    if (roleDef === undefined || roleDef.type !== 'widget') {
      return false;
    }
  }

  // The element is **not** visible on the page or exposed to assistive technologies
  if (
    tabIndex < 0 &&
    virtualNode.actualNode &&
    !chunk018.isVisibleOnScreen(virtualNode) &&
    !chunk018.isVisibleToScreenReaders(virtualNode)
  ) {
    return false;
  }

  return true;
}

function isInitiatorMatches(node, virtualNode, context) {
  return context.initiator;
}

function bypassMatches(node, virtualNode, context) {
  // the top level window should have an anchor
  if (isInitiatorMatches(node, virtualNode, context)) {
    return !!node.querySelector('a[href]');
  }

  // all iframes do not need an anchor but should be checked for bypass
  // elements (headings, landmarks, etc.)
  return true;
}

/* global document */

function colorContrastMatches(node, virtualNode) {
  const { nodeName, type: inputType } = virtualNode.props;

  // Don't test options, color contrast doesn't work well on these
  if (nodeName === 'option') {
    return false;
  }
  // Don't test empty select elements
  if (nodeName === 'select' && !node.options.length) {
    return false;
  }

  // some input types don't have text, so the rule shouldn't be applied
  const nonTextInput = [
    'hidden',
    'range',
    'color',
    'checkbox',
    'radio',
    'image'
  ];
  if (nodeName === 'input' && nonTextInput.includes(inputType)) {
    return false;
  }

  if (chunk024.isDisabled(virtualNode) || chunk018.isInert(virtualNode)) {
    return false;
  }

  // form elements that don't have direct child text nodes need to check that
  // the text indent has not been changed and moved the text away from the
  // control
  const formElements = ['input', 'select', 'textarea'];
  if (formElements.includes(nodeName)) {
    const style = window.getComputedStyle(node);
    const textIndent = parseInt(style.getPropertyValue('text-indent'), 10);

    if (textIndent) {
      // since we can't get the actual bounding rect of the text node, we'll
      // use the current nodes bounding rect and adjust by the text-indent to
      // see if it still overlaps the node
      let rect = node.getBoundingClientRect();
      rect = {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left + textIndent,
        right: rect.right + textIndent
      };

      if (!chunk013.visuallyOverlaps(rect, node)) {
        return false;
      }
    }
    // Match all form fields, regardless of if they have text
    return true;
  }
  const nodeParentLabel = chunk018.findUpVirtual(virtualNode, 'label');
  if (nodeName === 'label' || nodeParentLabel) {
    const labelNode = nodeParentLabel || node;
    const labelVirtual = nodeParentLabel
      ? chunk010.getNodeFromTree(nodeParentLabel)
      : virtualNode;

    // explicit label of disabled control
    if (labelNode.htmlFor) {
      const doc = chunk012.getRootNode(labelNode);
      const explicitControl = doc.getElementById(labelNode.htmlFor);
      const explicitControlVirtual =
        explicitControl && chunk010.getNodeFromTree(explicitControl);

      if (explicitControlVirtual && chunk024.isDisabled(explicitControlVirtual)) {
        return false;
      }
    }

    // implicit label of disabled control
    const query =
      'input:not(' +
      '[type="hidden"],' +
      '[type="image"],' +
      '[type="button"],' +
      '[type="submit"],' +
      '[type="reset"]' +
      '), select, textarea';
    const implicitControl = chunk014.querySelectorAll(labelVirtual, query)[0];

    if (implicitControl && chunk024.isDisabled(implicitControl)) {
      return false;
    }
  }

  const ariaLabelledbyControls = [];
  let ancestorNode = virtualNode;
  while (ancestorNode) {
    // Find any ancestor (including itself) that is used with aria-labelledby
    if (ancestorNode.props.id) {
      const virtualControls = chunk019.getAccessibleRefs(ancestorNode)
        .filter(control => {
          return chunk013.tokenList(
            control.getAttribute('aria-labelledby') || ''
          ).includes(ancestorNode.props.id);
        })
        .map(control => chunk010.getNodeFromTree(control));

      ariaLabelledbyControls.push(...virtualControls);
    }
    ancestorNode = ancestorNode.parent;
  }

  if (
    ariaLabelledbyControls.length > 0 &&
    ariaLabelledbyControls.every(chunk024.isDisabled)
  ) {
    return false;
  }

  if (!hasRealTextChildren(virtualNode)) {
    return false;
  }

  if (!parseFloat(virtualNode.getComputedStylePropertyValue('font-size'))) {
    return false;
  }

  const range = document.createRange();
  const childNodes = virtualNode.children;
  for (let index = 0; index < childNodes.length; index++) {
    const child = childNodes[index];
    if (
      child.actualNode.nodeType === 3 &&
      chunk012.sanitize(child.actualNode.nodeValue) !== ''
    ) {
      range.selectNodeContents(child.actualNode);
    }
  }

  const rects = Array.from(range.getClientRects());
  const clippingAncestors = chunk012.getOverflowHiddenAncestors(virtualNode);
  return rects.some(rect => {
    //check to see if the rectangle impinges
    const overlaps = chunk013.visuallyOverlaps(rect, node);

    if (!clippingAncestors.length) {
      return overlaps;
    }

    const withinOverflow = clippingAncestors.some(overflowNode => {
      return chunk012.rectsOverlap(rect, overflowNode.boundingClientRect);
    });

    return overlaps && withinOverflow;
  });
}

const removeUnicodeOptions = {
  emoji: true,
  nonBmp: false,
  punctuations: true
};

function hasRealTextChildren(virtualNode) {
  const visibleText = chunk018.visibleVirtual(virtualNode, false, true);
  if (
    visibleText === '' ||
    chunk012.removeUnicode(visibleText, removeUnicodeOptions) === ''
  ) {
    return false;
  }
  return virtualNode.children.some(
    vChild => vChild.props.nodeName === '#text' && !chunk012.isIconLigature(vChild)
  );
}

function dataTableLargeMatches(node) {
  if (chunk024.isDataTable(node)) {
    const tableArray = chunk018.toArray(node);
    return (
      tableArray.length >= 3 &&
      tableArray[0].length >= 3 &&
      tableArray[1].length >= 3 &&
      tableArray[2].length >= 3
    );
  }

  return false;
}

function dataTableMatches$1(node) {
  return chunk024.isDataTable(node);
}

function duplicateIdActiveMatches(node) {
  const id = node.getAttribute('id').trim();
  const idSelector = `*[id="${chunk007.escapeSelector(id)}"]`;
  const idMatchingElms = Array.from(
    chunk012.getRootNode(node).querySelectorAll(idSelector)
  );

  return !chunk021.isAccessibleRef(node) && idMatchingElms.some(chunk018.isFocusable);
}

function duplicateIdAriaMatches(node) {
  return chunk021.isAccessibleRef(node);
}

function duplicateIdMiscMatches(node) {
  const id = node.getAttribute('id').trim();
  const idSelector = `*[id="${chunk007.escapeSelector(id)}"]`;
  const idMatchingElms = Array.from(
    chunk012.getRootNode(node).querySelectorAll(idSelector)
  );

  return (
    !chunk021.isAccessibleRef(node) && idMatchingElms.every(elm => !chunk018.isFocusable(elm))
  );
}

function frameFocusableContentMatches(node, virtualNode, context) {
  return (
    !context.initiator &&
    !context.focusable &&
    context.size?.width * context.size?.height > 1
  );
}

function frameTitleHasTextMatches(node) {
  const title = node.getAttribute('title');
  return !!chunk012.sanitize(title);
}

function hasImplicitChromiumRoleMatches(node, virtualNode) {
  return chunk018.implicitRole(virtualNode, { chromium: true }) !== null;
}

function headingMatches(node, virtualNode) {
  return chunk018.getRole(virtualNode) === 'heading';
}

function svgNamespaceMatches(node, virtualNode) {
  try {
    const nodeName = virtualNode.props.nodeName;

    if (nodeName === 'svg') {
      return true;
    }

    // element is svg namespace if its parent is an svg element
    return !!chunk011.closest(virtualNode, 'svg');
  } catch {
    return false;
  }
}

function htmlNamespaceMatches(node, virtualNode) {
  return !svgNamespaceMatches(node, virtualNode);
}

function identicalLinksSamePurposeMatches(node, virtualNode) {
  const hasAccName = !!chunk018.accessibleTextVirtual(virtualNode);
  if (!hasAccName) {
    return false;
  }

  const role = chunk018.getRole(node);
  if (role && role !== 'link') {
    return false;
  }

  return true;
}

function insertedIntoFocusOrderMatches(node) {
  return chunk018.insertedIntoFocusOrder(node);
}

// @deprecated use isVisibleOnScreenMatches
function hasVisibleTextMatches(node) {
  return chunk018.isVisibleOnScreen(node);
}

function isVisibleOnScreenMatches(node, virtualNode) {
  return chunk018.isVisibleOnScreen(virtualNode);
}

function labelContentNameMismatchMatches(node, virtualNode) {
  /**
   * Applicability:
   * Rule applies to any element that has
   * a) a semantic role that is `widget` that supports name from content
   * b) has visible text content
   * c) has accessible name (eg: `aria-label`)
   */
  const role = chunk018.getRole(node);
  if (!role) {
    return false;
  }

  const widgetRoles = chunk019.getAriaRolesByType('widget');
  const isWidgetType = widgetRoles.includes(role);
  if (!isWidgetType) {
    return false;
  }

  const rolesWithNameFromContents = chunk019.getAriaRolesSupportingNameFromContent();
  if (!rolesWithNameFromContents.includes(role)) {
    return false;
  }

  /**
   * if no `aria-label` or `aria-labelledby` attribute - ignore `node`
   */
  if (
    !chunk012.sanitize(chunk018.arialabelText(virtualNode)) &&
    !chunk012.sanitize(chunk018.arialabelledbyText(node))
  ) {
    return false;
  }

  /**
   * if no `contentText` - ignore `node`
   */
  if (!chunk012.sanitize(chunk018.visibleVirtual(virtualNode))) {
    return false;
  }

  return true;
}

function labelMatches(node, virtualNode) {
  if (
    virtualNode.props.nodeName !== 'input' ||
    virtualNode.hasAttr('type') === false
  ) {
    return true;
  }

  const type = virtualNode.attr('type').toLowerCase();
  return (
    ['hidden', 'image', 'button', 'submit', 'reset'].includes(type) === false
  );
}

function landmarkHasBodyContextMatches(node, virtualNode) {
  const nativeScopeFilter = 'article, aside, main, nav, section';

  // Filter elements that, within certain contexts, don't map their role.
  // e.g. a <header> inside a <main> is not a banner, but in the <body> context it is
  return (
    node.hasAttribute('role') || !chunk018.findUpVirtual(virtualNode, nativeScopeFilter)
  );
}

function landmarkUniqueMatches(node, virtualNode) {
  return (
    isLandmarkVirtual(virtualNode) && chunk018.isVisibleToScreenReaders(virtualNode)
  );
}

function isLandmarkVirtual(vNode) {
  const landmarkRoles = chunk019.getAriaRolesByType('landmark');
  const role = chunk018.getRole(vNode);
  if (!role) {
    return false;
  }

  const { nodeName } = vNode.props;

  if (nodeName === 'section' || nodeName === 'form') {
    const accessibleText = chunk018.accessibleTextVirtual(vNode);
    return !!accessibleText;
  }

  return landmarkRoles.indexOf(role) >= 0 || role === 'region';
}

function dataTableMatches(node) {
  return !chunk024.isDataTable(node) && !chunk018.isFocusable(node);
}

function linkInTextBlockMatches(node) {
  const text = chunk012.sanitize(node.innerText);
  const role = chunk018.getExplicitRole(node);

  if (role && role !== 'link') {
    return false;
  }
  if (!text) {
    return false;
  }
  if (!chunk018.isVisibleOnScreen(node)) {
    return false;
  }

  return chunk018.isInTextBlock(node);
}

function nestedInteractiveMatches(node, virtualNode) {
  const role = chunk018.getRole(virtualNode);
  if (!role) {
    return false;
  }

  return !!chunk018.standards.ariaRoles[role].childrenPresentational;
}

function noAutoplayAudioMatches(node) {
  /**
   * Ignore media nodes without `currenSrc`
   * 	Notes:
   * 	- https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentSrc
   * 	- https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/src
   */
  if (!node.currentSrc) {
    return false;
  }

  /**
   * Ignore media nodes which are `paused` or `muted`
   */
  if (node.hasAttribute('paused') || node.hasAttribute('muted')) {
    return false;
  }

  return true;
}

function noEmptyRoleMatches(node, virtualNode) {
  if (!virtualNode.hasAttr('role')) {
    return false;
  }

  if (!virtualNode.attr('role').trim()) {
    return false;
  }

  return true;
}

/**
 * Filter out elements with an explicit role that does not require an accessible name and is not focusable
 */
function noExplicitNameRequired(node, virtualNode) {
  const role = chunk018.getExplicitRole(virtualNode);
  if (!role || ['none', 'presentation'].includes(role)) {
    return true;
  }

  const { accessibleNameRequired } = chunk016.ariaRoles[role] || {};
  if (accessibleNameRequired || chunk018.isFocusable(virtualNode)) {
    return true;
  }

  return false;
}

/**
 * Filter out elements that have a naming method (i.e. img[alt], table > caption, etc.)
 */
function noNamingMethodMatches(node, virtualNode) {
  const { namingMethods } = chunk018.getElementSpec(virtualNode);
  if (namingMethods && namingMethods.length !== 0) {
    return false;
  }
  // Additionally, ignore combobox that get their name from a descendant input:
  if (
    chunk018.getExplicitRole(virtualNode) === 'combobox' &&
    chunk014.querySelectorAll(virtualNode, 'input:not([type="hidden"])').length
  ) {
    return false;
  }
  // Ignore listboxes that are referenced by a combobox
  // Other roles don't require a name at all, or require one anyway
  if (chunk021.isComboboxPopup(virtualNode, { popupRoles: ['listbox'] })) {
    return false;
  }
  return true;
}

function noNegativeTabindexMatches(node, virtualNode) {
  const tabindex = chunk013.parseTabindex(virtualNode.attr('tabindex'));
  return tabindex === null || tabindex >= 0;
}

function noRoleMatches(node, vNode) {
  return !vNode.attr('role');
}

/**
 * @deprecated; use :not(html) instead
 */
function notHtmlMatches(node, virtualNode) {
  return virtualNode.props.nodeName !== 'html';
}

const objectIsLoadedMatches = (node, vNode) =>
  [noExplicitNameRequired, objectHasLoaded].every(fn => fn(node, vNode));

/**
 * Test if an object loaded content; assume yes if we can't prove otherwise
 *
 * @param {Element} node
 * @param {VirtualNode} vNode
 * @returns {boolean}
 */
function objectHasLoaded(node) {
  if (!node?.ownerDocument?.createRange) {
    return true; // Assume it did
  }
  // There's no ready
  const range = node.ownerDocument.createRange();
  range.setStart(node, 0);
  range.setEnd(node, node.childNodes.length);
  return range.getClientRects().length === 0;
}

function pAsHeadingMatches(node) {
  const children = Array.from(node.parentNode.childNodes);
  const nodeText = node.textContent.trim();
  const isSentence = /[.!?:;](?![.!?:;])/g;

  // Check that there is text, and it is not more than a single sentence
  if (nodeText.length === 0 || (nodeText.match(isSentence) || []).length >= 2) {
    return false;
  }

  // Grab sibling p element following the current node
  const siblingsAfter = children
    .slice(children.indexOf(node) + 1)
    .filter(
      elm => elm.nodeName.toUpperCase() === 'P' && elm.textContent.trim() !== ''
    );

  return siblingsAfter.length !== 0;
}

/**
 * @deprecated Will be removed in axe-core 5.0.0
 */
function presentationRoleConflictMatches(node, virtualNode) {
  return chunk018.implicitRole(virtualNode, { }) !== null;
}

function scrollableRegionFocusableMatches(node, virtualNode) {
  return (
    // The element scrolls
    chunk013.getScroll(node, 13) !== undefined &&
    // It's not a combobox popup, which commonly has keyboard focus added
    chunk021.isComboboxPopup(virtualNode) === false &&
    // And there's something actually worth scrolling to
    isNonEmptyElementOutsideViewableRect(virtualNode)
  );
}

function isNonEmptyElementOutsideViewableRect(vNode) {
  const boundingRect = vNode.boundingClientRect;

  return chunk014.querySelectorAll(vNode, '*').some(elm => {
    // (elm, noRecursion, ignoreAria)
    if (!chunk018.hasContentVirtual(elm, true, true)) {
      return false;
    }

    let rects = [];
    if (chunk018.hasChildTextNodes(elm)) {
      rects.push(...getContentRects(elm));
    } else {
      rects = [elm.boundingClientRect];
    }

    return rects.some(rect => {
      return (
        rect.left < boundingRect.left ||
        rect.right > boundingRect.right ||
        rect.top < boundingRect.top ||
        rect.bottom > boundingRect.bottom
      );
    });
  });
}

function getContentRects(vNode) {
  const range = document.createRange();
  range.selectNodeContents(vNode.actualNode);
  return Array.from(range.getClientRects());
}

function skipLinkMatches(node) {
  return chunk018.isSkipLink(node) && chunk018.isOffscreen(node);
}

function summaryIsInteractiveMatches(_, virtualNode) {
  // Summary only interactive if its real DOM parent is a details element
  const parent = virtualNode.parent;
  if (parent.props.nodeName !== 'details' || isSlottedElm(virtualNode)) {
    return false;
  }
  // Only the first summary element is interactive
  const firstSummary = parent.children.find(
    child => child.props.nodeName === 'summary'
  );
  if (firstSummary !== virtualNode) {
    return false;
  }
  return true;
}

function isSlottedElm(vNode) {
  // Normally this wouldn't be enough, but since we know parent is a details
  // element, we can ignore edge cases like slot being the real parent
  const domParent = vNode.actualNode?.parentElement;
  return domParent && domParent !== vNode.parent.actualNode;
}

function tableOrGridRoleMatches(_, vNode) {
  const role = chunk018.getRole(vNode);
  return ['treegrid', 'grid', 'table'].includes(role);
}

function widgetNotInline(node, vNode) {
  return matchesFns.every(fn => fn(node, vNode));
}

const matchesFns = [
  (node, vNode) => isWidgetType(vNode),
  (node, vNode) => isNotAreaElement(vNode),
  (node, vNode) => !svgNamespaceMatches(node, vNode),
  (node, vNode) => chunk018.isFocusable(vNode),
  // Skip nested widgets with tabindex=-1
  (node, vNode) => chunk018.isInTabOrder(vNode) || !hasWidgetAncestorInTabOrder(vNode),
  node =>
    !chunk018.isInTextBlock(node, { noLengthCompare: true, includeInlineBlock: true })
];

function isWidgetType(vNode) {
  return chunk018.getRoleType(vNode) === 'widget';
}

function isNotAreaElement(vNode) {
  return vNode.props.nodeName !== 'area';
}

const hasWidgetAncestorInTabOrder = chunk010.memoizeImplementation(
  function hasWidgetAncestorInTabOrderMemoized(vNode) {
    if (!vNode?.parent) {
      return false;
    }
    if (isWidgetType(vNode.parent) && chunk018.isInTabOrder(vNode.parent)) {
      return true;
    }
    return hasWidgetAncestorInTabOrderMemoized(vNode.parent);
  }
);

// @deprecated
function windowIsTopMatches(node) {
  return (
    node.ownerDocument.defaultView.self === node.ownerDocument.defaultView.top
  );
}

function xmlLangMismatchMatches(node) {
  // using -> "selector": "html[lang][xml\\:lang]" to narrow down html with lang and xml:lang attributes

  // get primary base language for each of the attributes
  const primaryLangValue = chunk012.getBaseLang(node.getAttribute('lang'));
  const primaryXmlLangValue = chunk012.getBaseLang(node.getAttribute('xml:lang'));

  // ensure that the value specified is valid lang for both `lang` and `xml:lang`
  return chunk015.isValidLang(primaryLangValue) && chunk015.isValidLang(primaryXmlLangValue);
}

/**
 * Constructor for the result of checks
 * @param {Check} check
 */
function CheckResult(check) {
  /**
   * ID of the check.  Unique in the context of a rule.
   * @type {String}
   */
  this.id = check.id;

  /**
   * Any data passed by Check (by calling `this.data()`)
   * @type {Mixed}
   */
  this.data = null;

  /**
   * Any node that is related to the Check, specified by calling `this.relatedNodes([HTMLElement...])` inside the Check
   * @type {Array}
   */
  this.relatedNodes = [];

  /**
   * The return value of the Check's evaluate function
   * @type {Mixed}
   */
  this.result = null;
}

exports.CheckResult = CheckResult;
exports.ariaAllowedAttrMatches = ariaAllowedAttrMatches;
exports.ariaAllowedRoleMatches = ariaAllowedRoleMatches;
exports.ariaHasAttrMatches = ariaHasAttrMatches;
exports.ariaHiddenFocusMatches = ariaHiddenFocusMatches;
exports.ariaLabelEvaluate = ariaLabelEvaluate;
exports.ariaLabelledbyEvaluate = ariaLabelledbyEvaluate;
exports.ariaRequiredChildrenMatches = ariaRequiredChildrenMatches;
exports.ariaRequiredParentMatches = ariaRequiredParentMatches;
exports.autocompleteMatches = autocompleteMatches;
exports.avoidInlineSpacingEvaluate = avoidInlineSpacingEvaluate;
exports.bypassMatches = bypassMatches;
exports.captionFakedEvaluate = captionFakedEvaluate;
exports.colorContrastMatches = colorContrastMatches;
exports.dataTableLargeMatches = dataTableLargeMatches;
exports.dataTableMatches = dataTableMatches;
exports.dataTableMatches$1 = dataTableMatches$1;
exports.docHasTitleEvaluate = docHasTitleEvaluate;
exports.duplicateIdActiveMatches = duplicateIdActiveMatches;
exports.duplicateIdAfter = duplicateIdAfter;
exports.duplicateIdAriaMatches = duplicateIdAriaMatches;
exports.duplicateIdEvaluate = duplicateIdEvaluate;
exports.duplicateIdMiscMatches = duplicateIdMiscMatches;
exports.existsEvaluate = existsEvaluate;
exports.frameFocusableContentMatches = frameFocusableContentMatches;
exports.frameTitleHasTextMatches = frameTitleHasTextMatches;
exports.hasAltEvaluate = hasAltEvaluate;
exports.hasImplicitChromiumRoleMatches = hasImplicitChromiumRoleMatches;
exports.hasVisibleTextMatches = hasVisibleTextMatches;
exports.headingMatches = headingMatches;
exports.hiddenContentEvaluate = hiddenContentEvaluate;
exports.html5ScopeEvaluate = html5ScopeEvaluate;
exports.htmlNamespaceMatches = htmlNamespaceMatches;
exports.identicalLinksSamePurposeMatches = identicalLinksSamePurposeMatches;
exports.inlineStyleProperty = inlineStyleProperty;
exports.insertedIntoFocusOrderMatches = insertedIntoFocusOrderMatches;
exports.isInitiatorMatches = isInitiatorMatches;
exports.isOnScreenEvaluate = isOnScreenEvaluate;
exports.isVisibleOnScreenMatches = isVisibleOnScreenMatches;
exports.labelContentNameMismatchMatches = labelContentNameMismatchMatches;
exports.labelMatches = labelMatches;
exports.landmarkHasBodyContextMatches = landmarkHasBodyContextMatches;
exports.landmarkUniqueMatches = landmarkUniqueMatches;
exports.linkInTextBlockMatches = linkInTextBlockMatches;
exports.nestedInteractiveMatches = nestedInteractiveMatches;
exports.noAutoplayAudioMatches = noAutoplayAudioMatches;
exports.noEmptyRoleMatches = noEmptyRoleMatches;
exports.noExplicitNameRequired = noExplicitNameRequired;
exports.noNamingMethodMatches = noNamingMethodMatches;
exports.noNegativeTabindexMatches = noNegativeTabindexMatches;
exports.noRoleMatches = noRoleMatches;
exports.nonEmptyIfPresentEvaluate = nonEmptyIfPresentEvaluate;
exports.notHtmlMatches = notHtmlMatches;
exports.objectIsLoadedMatches = objectIsLoadedMatches;
exports.pAsHeadingMatches = pAsHeadingMatches;
exports.presentationRoleConflictMatches = presentationRoleConflictMatches;
exports.presentationalRoleEvaluate = presentationalRoleEvaluate;
exports.regionAfter = regionAfter;
exports.regionEvaluate = regionEvaluate;
exports.sameCaptionSummaryEvaluate = sameCaptionSummaryEvaluate;
exports.scopeValueEvaluate = scopeValueEvaluate;
exports.scrollableRegionFocusableMatches = scrollableRegionFocusableMatches;
exports.skipLinkEvaluate = skipLinkEvaluate;
exports.skipLinkMatches = skipLinkMatches;
exports.summaryIsInteractiveMatches = summaryIsInteractiveMatches;
exports.svgNamespaceMatches = svgNamespaceMatches;
exports.svgNonEmptyTitleEvaluate = svgNonEmptyTitleEvaluate;
exports.tableOrGridRoleMatches = tableOrGridRoleMatches;
exports.tdHasHeaderEvaluate = tdHasHeaderEvaluate;
exports.tdHeadersAttrEvaluate = tdHeadersAttrEvaluate;
exports.thHasDataCellsEvaluate = thHasDataCellsEvaluate;
exports.uniqueFrameTitleAfter = uniqueFrameTitleAfter;
exports.uniqueFrameTitleEvaluate = uniqueFrameTitleEvaluate;
exports.widgetNotInline = widgetNotInline;
exports.windowIsTopMatches = windowIsTopMatches;
exports.xmlLangMismatchMatches = xmlLangMismatchMatches;
