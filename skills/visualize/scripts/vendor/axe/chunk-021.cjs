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

const chunk019 = require('./chunk-019.cjs');
const chunk018 = require('./chunk-018.cjs');
const chunk007 = require('./chunk-007.cjs');
const chunk010 = require('./chunk-010.cjs');
const chunk011 = require('./chunk-011.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');
const chunk020 = require('./chunk-020.cjs');
const chunk015 = require('./chunk-015.cjs');

/**
 * Get a list of CSS selectors of nodes that have an implicit role
 * @method implicitNodes
 * @memberof axe.commons.aria
 * @deprecated
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of CSS selectors or `null` if there are none
 */
function implicitNodes(role) {
  let implicit = null;
  const roles = chunk020.lookupTable.role[role];

  if (roles && roles.implicit) {
    implicit = chunk010.clone(roles.implicit);
  }
  return implicit;
}

/**
 * Check that a DOM node is a reference in the accessibility tree
 * @param {Element} node
 * @returns {Boolean}
 */
function isAccessibleRef(node) {
  return !!chunk019.getAccessibleRefs(node).length;
}

/**
 * Whether an element is the popup for a combobox
 * @method isComboboxPopup
 * @memberof axe.commons.aria
 * @instance
 * @param {VirtualNode} virtualNode
 * @param {Object} options
 * @property {String[]} popupRoles Overrides which roles can be popup. Defaults to aria-haspopup values
 * @returns {boolean}
 */
function isComboboxPopup(virtualNode, { popupRoles } = {}) {
  const role = chunk018.getRole(virtualNode);
  popupRoles ??= chunk015.ariaAttrs['aria-haspopup'].values;
  if (!popupRoles.includes(role)) {
    return false;
  }

  // in ARIA 1.1 the container has role=combobox
  const vParent = nearestParentWithRole(virtualNode);
  if (isCombobox(vParent)) {
    return true;
  }

  const { id } = virtualNode.props;
  if (!id) {
    return false;
  }

  if (!virtualNode.actualNode) {
    throw new Error('Unable to determine combobox popup without an actualNode');
  }
  const root = chunk012.getRootNode(virtualNode.actualNode);
  const ownedCombobox = root.querySelectorAll(
    // aria-owns was from ARIA 1.0, aria-controls was from ARIA 1.2
    `[aria-owns~="${id}"][role~="combobox"]:not(select),
     [aria-controls~="${id}"][role~="combobox"]:not(select)`
  );

  return Array.from(ownedCombobox).some(isCombobox);
}

const isCombobox = node => node && chunk018.getRole(node) === 'combobox';

function nearestParentWithRole(vNode) {
  while ((vNode = vNode.parent)) {
    if (chunk018.getRole(vNode, { noPresentational: true }) !== null) {
      return vNode;
    }
  }
  return null;
}

/**
 * Gets the aria label for a given node
 * @method label
 * @memberof axe.commons.aria
 * @instance
 * @param  {HTMLElement} node The element to check
 * @return {Mixed} String of visible text, or `null` if no label is found
 */
function label(node) {
  node = chunk010.getNodeFromTree(node);
  return chunk018.labelVirtual(node);
}

/**
 * Get required attributes for a given role
 * @method requiredAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
function requiredAttr(role) {
  const roleDef = chunk018.standards.ariaRoles[role];

  if (!roleDef || !Array.isArray(roleDef.requiredAttrs)) {
    return [];
  }

  return [...roleDef.requiredAttrs];
}

/**
 * Get the required context (parent) roles for a given role
 * @method requiredContext
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of required context elements or `null` if there are none
 */
function requiredContext(role) {
  const roleDef = chunk018.standards.ariaRoles[role];

  if (!roleDef || !Array.isArray(roleDef.requiredContext)) {
    return null;
  }

  return [...roleDef.requiredContext];
}

/**
 * Get the required owned (children) roles for a given role
 * @method requiredOwned
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of required owned elements or `null` if there are none
 */
function requiredOwned(role) {
  const roleDef = chunk018.standards.ariaRoles[role];

  if (!roleDef || !Array.isArray(roleDef.requiredOwned)) {
    return null;
  }

  return [...roleDef.requiredOwned];
}

/**
 * Validate the value of an ARIA attribute
 * @method validateAttrValue
 * @memberof axe.commons.aria
 * @instance
 * @param  {HTMLElement} node The element to check
 * @param  {String} attr The name of the attribute
 * @return {Boolean}
 */
function validateAttrValue(vNode, attr) {
  vNode = vNode instanceof chunk007.AbstractVirtualNode ? vNode : chunk010.getNodeFromTree(vNode);

  let matches;
  let list;
  const value = vNode.attr(attr);
  const attrInfo = chunk018.standards.ariaAttrs[attr];

  if (!attrInfo) {
    return true;
  }
  if (attrInfo.allowEmpty && (!value || value.trim() === '')) {
    return true;
  }

  switch (attrInfo.type) {
    case 'boolean':
      return ['true', 'false'].includes(value.toLowerCase());

    case 'nmtoken':
      return (
        typeof value === 'string' &&
        attrInfo.values.includes(value.toLowerCase())
      );

    case 'nmtokens':
      list = chunk013.tokenList(value);
      // Check if any value isn't in the list of values
      return list.reduce((result, token) => {
        return result && attrInfo.values.includes(token);
        // Initial state, fail if the list is empty
      }, list.length !== 0);

    case 'idref':
      try {
        const doc = chunk012.getRootNode(vNode.actualNode);
        return !!(value && doc.getElementById(value));
      } catch {
        throw new TypeError('Cannot resolve id references for partial DOM');
      }

    case 'idrefs':
      return chunk018.idrefs(vNode, attr).some(node => !!node);

    case 'string':
      // Not allowed empty except with allowEmpty: true
      return value.trim() !== '';

    case 'decimal':
      matches = value.match(/^[-+]?([0-9]*)\.?([0-9]*)$/);
      return !!(matches && (matches[1] || matches[2]));

    case 'int':
      const minValue =
        typeof attrInfo.minValue !== 'undefined'
          ? attrInfo.minValue
          : -Infinity;
      return /^[-+]?[0-9]+$/.test(value) && parseInt(value) >= minValue;
  }
}

/**
 * Check if an aria- attribute name is valid
 * @method validateAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} att The attribute name
 * @return {Boolean}
 */
function validateAttr(att) {
  const attrDefinition = chunk018.standards.ariaAttrs[att];
  return !!attrDefinition;
}

/**
 * Namespace for aria-related utilities.
 * @namespace commons.aria
 * @memberof axe
 */

const aria = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  allowedAttr: chunk019.allowedAttr,
  arialabelText: chunk018.arialabelText,
  arialabelledbyText: chunk018.arialabelledbyText,
  getAccessibleRefs: chunk019.getAccessibleRefs,
  getElementUnallowedRoles: chunk019.getElementUnallowedRoles,
  getExplicitRole: chunk018.getExplicitRole,
  getImplicitRole: chunk018.implicitRole,
  getOwnedVirtual: chunk018.getOwnedVirtual,
  getRole: chunk018.getRole,
  getRoleType: chunk018.getRoleType,
  getRolesByType: chunk019.getRolesByType,
  getRolesWithNameFromContents: chunk019.getRolesWithNameFromContents,
  implicitNodes,
  implicitRole: chunk018.implicitRole,
  isAccessibleRef,
  isAriaRoleAllowedOnElement: chunk019.isAriaRoleAllowedOnElement,
  isComboboxPopup,
  isUnsupportedRole: chunk018.isUnsupportedRole,
  isValidRole: chunk018.isValidRole,
  label,
  labelVirtual: chunk018.labelVirtual,
  lookupTable: chunk020.lookupTable,
  namedFromContents: chunk018.namedFromContents,
  requiredAttr,
  requiredContext,
  requiredOwned,
  validateAttr,
  validateAttrValue
}, Symbol.toStringTag, { value: 'Module' }));

/**
 * Check if an element's `role` attribute uses any abstract role values.
 *
 * Abstract roles are taken from the `ariaRoles` standards object from the roles `type` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all abstract roles</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element uses an `abstract` role. False otherwise.
 */
function abstractroleEvaluate(node, options, virtualNode) {
  const abstractRoles = chunk013.tokenList(virtualNode.attr('role')).filter(
    role => chunk018.getRoleType(role) === 'abstract'
  );

  if (abstractRoles.length > 0) {
    this.data(abstractRoles);
    return true;
  }

  return false;
}

/**
 * Namespace for standards-related utilities.
 * @namespace commons.standards
 * @memberof axe
 */

const standards = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getAriaRolesByType: chunk019.getAriaRolesByType,
  getAriaRolesSupportingNameFromContent: chunk019.getAriaRolesSupportingNameFromContent,
  getElementSpec: chunk018.getElementSpec,
  getElementsByContentType: chunk018.getElementsByContentType,
  getGlobalAriaAttrs: chunk018.getGlobalAriaAttrs,
  implicitHtmlRoles: chunk018.implicitHtmlRoles
}, Symbol.toStringTag, { value: 'Module' }));

function ariaAllowedAttrElmEvaluate(node, options, virtualNode) {
  const elmSpec = chunk018.getElementSpec(virtualNode);

  // If no allowedAriaAttrs restriction, this check doesn't apply
  if (!elmSpec.allowedAriaAttrs) {
    return true;
  }

  // If element has an explicit role, defer to the role-based check
  const explicitRole = chunk018.getExplicitRole(virtualNode);
  if (explicitRole) {
    return true;
  }

  const { allowedAriaAttrs } = elmSpec;
  const globalAriaAttrs = chunk018.getGlobalAriaAttrs();
  const invalid = [];

  for (const attrName of virtualNode.attrNames) {
    if (
      globalAriaAttrs.includes(attrName) &&
      !allowedAriaAttrs.includes(attrName)
    ) {
      invalid.push(attrName);
    }
  }

  if (!invalid.length) {
    return true;
  }

  const messageKey = invalid.length > 1 ? 'plural' : 'singular';
  this.data({
    messageKey,
    nodeName: virtualNode.props.nodeName,
    values: invalid
      .map(attrName => attrName + '="' + virtualNode.attr(attrName) + '"')
      .join(', ')
  });

  return false;
}

/**
 * Check if each ARIA attribute on an element is allowed for its semantic role.
 *
 * Allowed ARIA attributes are taken from the `ariaRoles` standards object combining the roles `requiredAttrs` and `allowedAttrs` properties, as well as any global ARIA attributes from the `ariaAttrs` standards object.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all unallowed aria attributes and their value</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if each aria attribute is allowed. False otherwise.
 */
function ariaAllowedAttrEvaluate(node, options, virtualNode) {
  const invalid = [];
  const role = chunk018.getRole(virtualNode);
  let allowed = chunk019.allowedAttr(role);

  // @deprecated: allowed attr options to pass more attrs.
  // configure the standards spec instead
  if (Array.isArray(options[role])) {
    allowed = chunk014.uniqueArray(options[role].concat(allowed));
  }

  // Unknown ARIA attributes are tested in aria-valid-attr
  for (const attrName of virtualNode.attrNames) {
    if (
      validateAttr(attrName) &&
      !allowed.includes(attrName) &&
      !ignoredAttrs(attrName, virtualNode.attr(attrName), virtualNode)
    ) {
      invalid.push(attrName);
    }
  }

  if (!invalid.length) {
    return true;
  }

  this.data(
    invalid.map(attrName => attrName + '="' + virtualNode.attr(attrName) + '"')
  );

  if (!role && !chunk018.isHtmlElement(virtualNode) && !chunk018.isFocusable(virtualNode)) {
    return undefined;
  }
  return false;
}

function ignoredAttrs(attrName, attrValue, vNode) {
  // allow aria-required=false as screen readers consistently ignore it
  // @see https://github.com/dequelabs/axe-core/issues/3756
  if (attrName === 'aria-required' && attrValue === 'false') {
    return true;
  }

  // allow aria-multiline=false when contenteditable is set
  // @see https://github.com/dequelabs/axe-core/issues/4463
  if (
    attrName === 'aria-multiline' &&
    attrValue === 'false' &&
    vNode.hasAttr('contenteditable')
  ) {
    return true;
  }

  return false;
}

/**
 * Check if an element is allowed to have its explicit role value.
 *
 * Allowed ARIA roles are taken from the `htmlElms` standards object from the elements `allowedRoles` property.
 *
 * @memberof checks
 * @param {Boolean} [options.allowImplicit=true] Allow the explicit role to match the implicit role of the element.
 * @param {String[]} [options.ignoredTags=[]] Do not check for allowed roles in the provided HTML elements list.
 * @data {String[]} List of all unallowed roles.
 * @return {Boolean} True if the role is allowed on the element. False otherwise.
 */
function ariaAllowedRoleEvaluate(node, options = {}, virtualNode) {
  /**
   * Implements allowed roles defined at:
   * https://www.w3.org/TR/html-aria/#docconformance
   * https://www.w3.org/TR/SVG2/struct.html#implicit-aria-semantics
   */
  const { allowImplicit = true, ignoredTags = [] } = options;
  const { nodeName } = virtualNode.props;

  // check if the element should be ignored, by an user setting
  if (ignoredTags.map(tag => tag.toLowerCase()).includes(nodeName)) {
    return true;
  }

  const unallowedRoles = chunk019.getElementUnallowedRoles(virtualNode, allowImplicit);
  if (unallowedRoles.length) {
    this.data(unallowedRoles);
    if (!chunk018.isVisibleToScreenReaders(virtualNode)) {
      // flag hidden elements for review
      return undefined;
    }
    return false;
  }
  return true;
}

/**
 * Checks if element has aria-busy tag set to "true"
 *
 * @memberof checks
 * @return {Boolean} True if node has "aria-busy" attribute. False otherwise
 */
function ariaBusyEvaluate(node, options, virtualNode) {
  return virtualNode.attr('aria-busy') === 'true';
}

function ariaConditionalCheckboxAttr(
  node,
  options,
  virtualNode
) {
  const { nodeName, type } = virtualNode.props;
  const ariaChecked = normalizeAriaChecked(virtualNode.attr('aria-checked'));
  if (nodeName !== 'input' || type !== 'checkbox' || !ariaChecked) {
    return true;
  }

  const checkState = getCheckState(virtualNode);
  if (ariaChecked === checkState) {
    return true;
  }
  this.data({
    messageKey: 'checkbox',
    checkState
  });
  return false;
}

function getCheckState(vNode) {
  if (vNode.props.indeterminate) {
    return 'mixed';
  }
  return vNode.props.checked ? 'true' : 'false';
}

function normalizeAriaChecked(ariaCheckedVal) {
  if (!ariaCheckedVal) {
    return '';
  }
  ariaCheckedVal = ariaCheckedVal.toLowerCase();
  if (['mixed', 'true'].includes(ariaCheckedVal)) {
    return ariaCheckedVal;
  }
  return 'false';
}

function ariaConditionalRowAttr(
  node,
  { invalidTableRowAttrs } = {},
  virtualNode
) {
  const invalidAttrs =
    invalidTableRowAttrs?.filter?.(invalidAttr => {
      return virtualNode.hasAttr(invalidAttr);
    }) ?? [];
  if (invalidAttrs.length === 0) {
    return true;
  }

  const owner = getRowOwner(virtualNode);
  const ownerRole = owner && chunk018.getRole(owner);
  if (!ownerRole || ownerRole === 'treegrid') {
    return true;
  }

  const messageKey = `row${invalidAttrs.length > 1 ? 'Plural' : 'Singular'}`;
  this.data({ messageKey, invalidAttrs, ownerRole });
  return false;
}

function getRowOwner(virtualNode) {
  // check if the parent exists otherwise a TypeError will occur (virtual-nodes specifically)
  if (!virtualNode.parent) {
    return;
  }
  const rowOwnerQuery =
    'table:not([role]), [role~="treegrid"], [role~="table"], [role~="grid"]';
  return chunk011.closest(virtualNode, rowOwnerQuery);
}

const conditionalRoleMap = {
  row: ariaConditionalRowAttr,
  checkbox: ariaConditionalCheckboxAttr
};

function ariaConditionalAttrEvaluate(
  node,
  options,
  virtualNode
) {
  const role = chunk018.getRole(virtualNode);
  if (!conditionalRoleMap[role]) {
    return true;
  }
  return conditionalRoleMap[role].call(this, node, options, virtualNode);
}

/**
 * Check if `aria-errormessage` references an element that also uses a technique to announce the message (aria-live, aria-describedby, etc.).
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>Mixed</code></td>
 *       <td>The value of the `aria-errormessage` attribute</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Mixed} True if aria-errormessage references an existing element that uses a supported technique. Undefined if it does not reference an existing element. False otherwise.
 */
function ariaErrormessageEvaluate(node, options, virtualNode) {
  options = Array.isArray(options) ? options : [];

  const errorMessageAttr = virtualNode.attr('aria-errormessage');
  const hasAttr = virtualNode.hasAttr('aria-errormessage');
  const invaid = virtualNode.attr('aria-invalid');
  const hasInvallid = virtualNode.hasAttr('aria-invalid');

  // pass if aria-invalid is not set or set to false as we don't
  // need to check the referenced node since it is not applicable
  if (!hasInvallid || invaid === 'false') {
    return true;
  }

  function validateAttrValue(attr) {
    if (attr.trim() === '') {
      return chunk018.standards.ariaAttrs['aria-errormessage'].allowEmpty;
    }

    const errormessageTokens = chunk013.tokenList(attr);
    if (errormessageTokens.length > 1) {
      this.data({ messageKey: 'unsupported', values: errormessageTokens });
      return false;
    }
    let idref;

    try {
      idref = attr && chunk018.idrefs(virtualNode, 'aria-errormessage')[0];
    } catch {
      this.data({
        messageKey: 'idrefs',
        values: errormessageTokens
      });
      return undefined;
    }

    if (idref) {
      if (!chunk018.isVisibleToScreenReaders(idref)) {
        this.data({
          messageKey: 'hidden',
          values: errormessageTokens
        });
        return false;
      }
      const describedbyTokens = chunk013.tokenList(virtualNode.attr('aria-describedby'));
      return (
        chunk018.getExplicitRole(idref) === 'alert' ||
        idref.getAttribute('aria-live') === 'assertive' ||
        idref.getAttribute('aria-live') === 'polite' ||
        errormessageTokens.some(token => describedbyTokens.includes(token))
      );
    }

    return;
  }

  // limit results to elements that actually have this attribute
  if (options.indexOf(errorMessageAttr) === -1 && hasAttr) {
    this.data(chunk013.tokenList(errorMessageAttr));
    return validateAttrValue.call(this, errorMessageAttr);
  }

  return true;
}

/**
 * Check that the element does not have the `aria-hidden` attribute.
 *
 * @memberof checks
 * @return {Boolean} True if the `aria-hidden` attribute is not present. False otherwise.
 */
function ariaHiddenBodyEvaluate(node, options, virtualNode) {
  return virtualNode.attr('aria-hidden') !== 'true';
}

/**
 * Check that an element does not have aria-level values exceeding 6
 * VO and NVDA allow any positive value
 * JAWS and TalkBack will give the default value if level > 6
 * See browser/screenreader support research https://codepen.io/straker/pen/jOBjNNe
 * @memberof checks
 * @return {Boolean} Undefined if the element uses aria-level > 6. True otherwise.
 */
function ariaLevelEvaluate(node, options, virtualNode) {
  const ariaHeadingLevel = virtualNode.attr('aria-level');
  const ariaLevel = parseInt(ariaHeadingLevel, 10);
  if (ariaLevel > 6) {
    return undefined;
  }
  return true;
}

/**
 * Check that an element does not use any prohibited ARIA attributes.
 *
 * Prohibited attributes are taken from the `ariaAttrs` standards object from the attributes `prohibitedAttrs` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all prohibited attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element uses any prohibited ARIA attributes. False otherwise.
 */
function ariaProhibitedAttrEvaluate(
  node,
  options = {},
  virtualNode
) {
  const elementsAllowedAriaLabel = options?.elementsAllowedAriaLabel || [];
  const { nodeName } = virtualNode.props;
  const role = chunk018.getRole(virtualNode, {
    chromium: true,
    // this check allows fallback roles. For example, `<div role="foo img" aria-label="...">` is legal.
    fallback: true
  });

  const prohibitedList = listProhibitedAttrs(
    virtualNode,
    role,
    nodeName,
    elementsAllowedAriaLabel
  );
  const prohibited = prohibitedList.filter(attrName => {
    if (!virtualNode.attrNames.includes(attrName)) {
      return false;
    }
    return chunk012.sanitize(virtualNode.attr(attrName)) !== '';
  });

  if (prohibited.length === 0) {
    return false;
  }

  let messageKey = role !== null ? 'hasRole' : 'noRole';
  messageKey += prohibited.length > 1 ? 'Plural' : 'Singular';
  this.data({ role, nodeName, messageKey, prohibited });

  // `subtreeDescendant` to override namedFromContents
  const textContent = chunk018.subtreeText(virtualNode, { subtreeDescendant: true });
  if (chunk012.sanitize(textContent) !== '') {
    // Don't fail if there is text content to announce
    return undefined;
  }
  return true;
}

function listProhibitedAttrs(vNode, role, nodeName, elementsAllowedAriaLabel) {
  const roleSpec = chunk018.standards.ariaRoles[role];
  if (roleSpec) {
    return roleSpec.prohibitedAttrs || [];
  }
  if (
    !!role ||
    elementsAllowedAriaLabel.includes(nodeName) ||
    getClosestAncestorRoleType(vNode) === 'widget'
  ) {
    return [];
  }
  return ['aria-label', 'aria-labelledby'];
}

const getClosestAncestorRoleType = chunk010.memoizeImplementation(
  function getClosestAncestorRoleTypeMemoized(vNode) {
    if (!vNode) {
      return;
    }

    const role = chunk018.getRole(vNode, { noPresentational: true, chromium: true });
    if (role) {
      return chunk018.getRoleType(role);
    }

    return getClosestAncestorRoleType(vNode.parent);
  }
);

/**
 * Check that the element has all required attributes for its explicit role.
 *
 * Required ARIA attributes are taken from the `ariaRoles` standards object from the roles `requiredAttrs` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all missing require attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if all required attributes are present. False otherwise.
 */
function ariaRequiredAttrEvaluate(
  node,
  options = {},
  virtualNode
) {
  const role = chunk018.getExplicitRole(virtualNode);
  const attrs = virtualNode.attrNames;
  // @deprecated: required attr options to pass more attrs.
  // configure the standards spec instead
  let requiredAttrs = requiredAttr(role);
  if (Array.isArray(options[role])) {
    requiredAttrs = chunk014.uniqueArray(options[role], requiredAttrs);
  }
  // Nothing to test
  if (!role || !attrs.length || !requiredAttrs.length) {
    return true;
  }
  // Some required props are conditional:
  if (
    isStaticSeparator(virtualNode, role) ||
    isClosedCombobox(virtualNode, role)
  ) {
    return true;
  }
  // Non-normative exception for things like media player seek slider.
  // Tested to work in various screen readers.
  if (role === 'slider' && virtualNode.attr('aria-valuetext')?.trim()) {
    return true;
  }

  const elmSpec = chunk018.getElementSpec(virtualNode);
  const missingAttrs = requiredAttrs.filter(
    requiredAttr =>
      !virtualNode.attr(requiredAttr) && !hasImplicitAttr(elmSpec, requiredAttr)
  );

  if (missingAttrs.length) {
    this.data(missingAttrs);
    return false;
  }
  return true;
}

function isStaticSeparator(vNode, role) {
  return role === 'separator' && !chunk018.isFocusable(vNode);
}

function hasImplicitAttr(elmSpec, attr) {
  return elmSpec.implicitAttrs?.[attr] !== undefined;
}

function isClosedCombobox(vNode, role) {
  return role === 'combobox' && vNode.attr('aria-expanded') === 'false';
}

/**
 * Check that an element owns all required children for its explicit role.
 *
 * Required roles are taken from the `ariaRoles` standards object from the roles `requiredOwned` property.
 *
 * @memberof checks
 * @param {Boolean} options.reviewEmpty List of ARIA roles that should be flagged as "Needs Review" rather than a violation if the element has no owned children.
 * @data {String[]} List of all missing owned roles.
 * @returns {Mixed} True if the element owns all required roles. Undefined if `options.reviewEmpty=true` and the element has no owned children. False otherwise.
 */
function ariaRequiredChildrenEvaluate(
  node,
  options,
  virtualNode
) {
  const reviewEmpty =
    options && Array.isArray(options.reviewEmpty) ? options.reviewEmpty : [];
  const explicitRole = chunk018.getExplicitRole(virtualNode, { dpub: true });
  const required = requiredOwned(explicitRole);
  if (required === null) {
    return true;
  }

  const ownedRoles = getOwnedRoles(virtualNode, required);
  const unallowed = ownedRoles.filter(
    ({ role, vNode }) => vNode.props.nodeType === 1 && !required.includes(role)
  );

  if (unallowed.length) {
    this.relatedNodes(unallowed.map(({ vNode }) => vNode));
    const messageKey =
      virtualNode.attr('aria-busy') === 'true' ? 'aria-busy-fail' : 'unallowed';

    this.data({
      messageKey,
      values: unallowed
        .map(({ vNode, attr }) => getUnallowedSelector(vNode, attr))
        .filter((selector, index, array) => array.indexOf(selector) === index)
        .join(', ')
    });
    return false;
  }

  if (hasRequiredChildren(required, ownedRoles)) {
    return true;
  }

  if (virtualNode.attr('aria-busy') === 'true') {
    this.data({ messageKey: 'aria-busy' });
    return true;
  }

  this.data(required);

  // Only review empty nodes when a node is both empty and does not have an aria-owns relationship
  if (reviewEmpty.includes(explicitRole) && !ownedRoles.some(isContent)) {
    return undefined;
  }

  return false;
}

/**
 * Get all owned roles of an element
 */
function getOwnedRoles(virtualNode, required) {
  let vNode;
  const ownedRoles = [];
  const ownedVirtual = chunk018.getOwnedVirtual(virtualNode);
  while ((vNode = ownedVirtual.shift())) {
    if (vNode.props.nodeType === 3) {
      ownedRoles.push({ vNode, role: null });
    }
    if (vNode.props.nodeType !== 1 || !chunk018.isVisibleToScreenReaders(vNode)) {
      continue;
    }

    const role = chunk018.getRole(vNode, { noPresentational: true });
    const globalAriaAttr = getGlobalAriaAttr(vNode);
    const hasGlobalAriaOrFocusable = !!globalAriaAttr || chunk018.isFocusable(vNode);

    // if owned node has no role or is presentational, or if role
    // allows group or rowgroup, we keep parsing the descendant tree.
    // this means intermediate roles between a required parent and
    // child will fail the check
    if (
      (!role && !hasGlobalAriaOrFocusable) ||
      (['group', 'rowgroup'].includes(role) &&
        required.some(requiredRole => requiredRole === role))
    ) {
      ownedVirtual.push(...vNode.children);
    } else if (role || hasGlobalAriaOrFocusable) {
      const attr = globalAriaAttr || 'tabindex';
      ownedRoles.push({ role, attr, vNode });
    }
  }

  return ownedRoles;
}

/**
 * See if any required roles are in the ownedRoles array
 */
function hasRequiredChildren(required, ownedRoles) {
  return ownedRoles.some(({ role }) => role && required.includes(role));
}

/**
 * Get the first global ARIA attribute the element has.
 * @param {VirtualNode} vNode
 * @return {String|null}
 */
function getGlobalAriaAttr(vNode) {
  return chunk018.getGlobalAriaAttrs().find(attr => vNode.hasAttr(attr));
}

/**
 * Return a simple selector for an unallowed element.
 * @param {VirtualNode} vNode
 * @param {String} [attr] - Optional attribute which made the element unallowed
 * @return {String}
 */
function getUnallowedSelector(vNode, attr) {
  const { nodeName, nodeType } = vNode.props;
  if (nodeType === 3) {
    return `#text`;
  }

  const role = chunk018.getExplicitRole(vNode, { dpub: true });
  if (role) {
    return `[role=${role}]`;
  }
  if (attr) {
    return nodeName + `[${attr}]`;
  }
  return nodeName;
}

/**
 * Check if the node has content, or is itself content
 * @Object {Object} OwnedRole
 * @property {VirtualNode} vNode
 * @returns {Boolean}
 */
function isContent({ vNode }) {
  if (vNode.props.nodeType === 3) {
    return vNode.props.nodeValue.trim().length > 0;
  }
  return chunk018.hasContentVirtual(vNode, false, true);
}

function getMissingContext(
  virtualNode,
  ownGroupRoles,
  reqContext,
  includeElement
) {
  const explicitRole = chunk018.getExplicitRole(virtualNode);

  if (!reqContext) {
    reqContext = requiredContext(explicitRole);
  }

  if (!reqContext) {
    return null;
  }

  const allowsGroup = reqContext.includes('group');
  let vNode = includeElement ? virtualNode : virtualNode.parent;

  while (vNode) {
    const role = chunk018.getRole(vNode, { noPresentational: true });

    // if parent node has no role or is presentational, or if role
    // allows group, we keep parsing the parent tree.
    // this means intermediate roles between a required parent and
    // child will fail the check
    if (!role) {
      vNode = vNode.parent;
    } else if (role === 'group' && allowsGroup) {
      // Allow the own role; i.e. tree > treeitem > group > treeitem
      if (ownGroupRoles.includes(explicitRole)) {
        reqContext.push(explicitRole);
      }
      reqContext = reqContext.filter(r => r !== 'group');
      vNode = vNode.parent;
    } else if (reqContext.includes(role)) {
      return null;
    } else {
      return reqContext;
    }
  }

  return reqContext;
}

function getAriaOwners(element) {
  const owners = [];
  let o = null;

  while (element) {
    if (element.getAttribute('id')) {
      const id = chunk007.escapeSelector(element.getAttribute('id'));
      const doc = chunk012.getRootNode(element);
      o = doc.querySelector(`[aria-owns~=${id}]`);
      if (o) {
        owners.push(o);
      }
    }
    element = element.parentElement;
  }

  return owners.length ? owners : null;
}

/**
 * Check if the element has a parent with a required role.
 *
 * Required parent roles are taken from the `ariaRoles` standards object from the roles `requiredContext` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all missing required parent roles</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element has a parent with a required role. False otherwise.
 */
function ariaRequiredParentEvaluate(node, options, virtualNode) {
  const ownGroupRoles =
    options && Array.isArray(options.ownGroupRoles)
      ? options.ownGroupRoles
      : [];
  let missingParents = getMissingContext(virtualNode, ownGroupRoles);

  if (!missingParents) {
    return true;
  }
  const owners = getAriaOwners(node);
  if (owners) {
    for (let i = 0, l = owners.length; i < l; i++) {
      missingParents = getMissingContext(
        chunk010.getNodeFromTree(owners[i]),
        ownGroupRoles,
        missingParents,
        true
      );
      if (!missingParents) {
        return true;
      }
    }
  }

  this.data(missingParents);
  return false;
}

/**
 * Check that `aria-roledescription` is used on a supported semantic role.
 *
 * @memberof checks
 * @param {String[]} options.supportedRoles List of ARIA roles that support the `aria-roledescription` attribute
 * @return {Mixed} True if the semantic role supports `aria-roledescription`. Undefined if the semantic role is `presentation` or `none`. False otherwise.
 */
function ariaRoledescriptionEvaluate(node, options = {}, virtualNode) {
  const role = chunk018.getRole(virtualNode);
  const supportedRoles = options.supportedRoles || [];

  if (supportedRoles.includes(role)) {
    return true;
  }

  if (role && role !== 'presentation' && role !== 'none') {
    return undefined;
  }

  return false;
}

/**
 * Check that an element does not use any unsupported ARIA attributes.
 *
 * Unsupported attributes are taken from the `ariaAttrs` standards object from the attributes `unsupported` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all unsupported attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element does not use any unsupported ARIA attributes. False otherwise.
 */
function ariaUnsupportedAttrEvaluate(node, options, virtualNode) {
  const unsupportedAttrs = virtualNode.attrNames.filter(name => {
    const attribute = chunk018.standards.ariaAttrs[name];

    if (!validateAttr(name)) {
      return false;
    }

    const { unsupported } = attribute;

    if (typeof unsupported !== 'object') {
      return !!unsupported;
    }

    return !chunk018.matches(node, unsupported.exceptions);
  });

  if (unsupportedAttrs.length) {
    this.data(unsupportedAttrs);
    return true;
  }
  return false;
}

/**
 * Check that each `aria-` attribute on an element is a valid ARIA attribute.
 *
 * Valid ARIA attributes are listed in the `ariaAttrs` standards object.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all invalid attributes</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if all `aria-` attributes are valid. False otherwise.
 */
function ariaValidAttrEvaluate(node, options, virtualNode) {
  options = Array.isArray(options.value) ? options.value : [];

  const invalid = [];
  const aria = /^aria-/;

  virtualNode.attrNames.forEach(attr => {
    if (
      options.indexOf(attr) === -1 &&
      aria.test(attr) &&
      !validateAttr(attr)
    ) {
      invalid.push(attr);
    }
  });

  if (invalid.length) {
    this.data(invalid);
    return false;
  }

  return true;
}

/**
 * Check that each ARIA attribute on an element has a valid value.
 *
 * Valid ARIA attribute values are taken from the `ariaAttrs` standards object from an attributes `type` property.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>Mixed</code></td>
 *       <td>Object with Strings `messageKey` and `needsReview` if `aria-current` or `aria-describedby` are invalid. Otherwise a list of all invalid ARIA attributes and their value</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Mixed} True if all ARIA attributes have a valid value. Undefined for invalid `aria-current` or `aria-describedby` values. False otherwise.
 */
function ariaValidAttrValueEvaluate(node, options, virtualNode) {
  options = Array.isArray(options.value) ? options.value : [];

  let needsReview = '';
  let messageKey = '';
  const invalid = [];
  const aria = /^aria-/;
  const skipAttrs = ['aria-errormessage'];

  const preChecks = {
    // aria-controls should only check if element exists if the element
    // doesn't have aria-expanded=false, aria-selected=false (tabs),
    // or aria-haspopup (may load later)
    // @see https://github.com/dequelabs/axe-core/issues/1463
    // @see https://github.com/dequelabs/axe-core/issues/4363
    'aria-controls': () => {
      const hasPopup =
        ['false', null].includes(virtualNode.attr('aria-haspopup')) === false;

      if (hasPopup) {
        needsReview = `aria-controls="${virtualNode.attr('aria-controls')}"`;
        messageKey = 'controlsWithinPopup';
      }

      return (
        virtualNode.attr('aria-expanded') !== 'false' &&
        virtualNode.attr('aria-selected') !== 'false' &&
        hasPopup === false
      );
    },
    // aria-current should mark as needs review if any value is used that is
    // not one of the valid values (since any value is treated as "true")
    'aria-current': validValue => {
      if (!validValue) {
        needsReview = `aria-current="${virtualNode.attr('aria-current')}"`;
        messageKey = 'ariaCurrent';
      }

      return;
    },
    // aria-owns should only check if element exists if the element
    // doesn't have aria-expanded=false (combobox)
    // @see https://github.com/dequelabs/axe-core/issues/1524
    'aria-owns': () => {
      return virtualNode.attr('aria-expanded') !== 'false';
    },
    // aria-describedby should not mark missing element as violation but
    // instead as needs review
    // @see https://github.com/dequelabs/axe-core/issues/1151
    'aria-describedby': validValue => {
      if (!validValue) {
        needsReview = `aria-describedby="${virtualNode.attr(
          'aria-describedby'
        )}"`;
        // TODO: es-modules_tree
        messageKey =
          chunk007.axe._tree && chunk007.axe._tree[0]._hasShadowRoot ? 'noIdShadow' : 'noId';
      }

      return;
    },
    // aria-labelledby should not mark missing element as violation but
    // instead as needs review
    // @see https://github.com/dequelabs/axe-core/issues/2621
    'aria-labelledby': validValue => {
      if (!validValue) {
        needsReview = `aria-labelledby="${virtualNode.attr(
          'aria-labelledby'
        )}"`;
        // TODO: es-modules_tree
        messageKey =
          chunk007.axe._tree && chunk007.axe._tree[0]._hasShadowRoot ? 'noIdShadow' : 'noId';
      }
    }
  };

  virtualNode.attrNames.forEach(attrName => {
    if (
      skipAttrs.includes(attrName) ||
      options.includes(attrName) ||
      !aria.test(attrName)
    ) {
      return;
    }

    let validValue;
    const attrValue = virtualNode.attr(attrName);

    try {
      validValue = validateAttrValue(virtualNode, attrName);
    } catch {
      needsReview = `${attrName}="${attrValue}"`;
      messageKey = 'idrefs';
      return;
    }

    if (
      (preChecks[attrName] ? preChecks[attrName](validValue) : true) &&
      !validValue
    ) {
      if (attrValue === '' && !isStringType(attrName)) {
        needsReview = attrName;
        messageKey = 'empty';
      } else {
        invalid.push(`${attrName}="${attrValue}"`);
      }
    }
  });

  if (invalid.length) {
    this.data(invalid);
    return false;
  }

  if (needsReview) {
    this.data({ messageKey, needsReview });
    return undefined;
  }

  return true;
}

function isStringType(attrName) {
  return chunk018.standards.ariaAttrs[attrName]?.type === 'string';
}

/**
 * Check that if aria-braillelabel is not empty, the element has an accessible text
 * @memberof checks
 * @return {Boolean}
 */
function brailleLabelEquivalentEvaluate(
  node,
  options,
  virtualNode
) {
  const brailleLabel = virtualNode.attr('aria-braillelabel') ?? '';
  if (!brailleLabel.trim()) {
    return true;
  }
  try {
    return chunk012.sanitize(chunk018.accessibleTextVirtual(virtualNode)) !== '';
  } catch {
    return undefined;
  }
}

/**
 * Check that if aria-brailleroledescription is not empty,
 * the element has a non-empty aria-roledescription
 * @memberof checks
 * @return {Boolean}
 */
function brailleRoleDescriptionEquivalentEvaluate(
  node,
  options,
  virtualNode
) {
  const brailleRoleDesc = virtualNode.attr('aria-brailleroledescription') ?? '';
  if (chunk012.sanitize(brailleRoleDesc) === '') {
    return true;
  }
  const roleDesc = virtualNode.attr('aria-roledescription');
  if (typeof roleDesc !== 'string') {
    this.data({ messageKey: 'noRoleDescription' });
    return false;
  }

  if (chunk012.sanitize(roleDesc) === '') {
    this.data({ messageKey: 'emptyRoleDescription' });
    return false;
  }
  return true;
}

/**
 * Check that an elements semantic role is deprecated.
 *
 * Deprecated roles are taken from the `ariaRoles` standards object from the roles `deprecated` property.
 *
 * @memberof checks
 * @return {Boolean} True if the elements semantic role is deprecated. False otherwise.
 */
function deprecatedroleEvaluate(node, options, virtualNode) {
  const role = chunk018.getRole(virtualNode, { dpub: true, fallback: true });
  const roleDefinition = chunk018.standards.ariaRoles[role];
  if (!roleDefinition?.deprecated) {
    return false;
  }

  this.data(role);
  return true;
}

/**
 * NOTE: This check is no longer used, but it was not deprecated
 * so it can be used in custom rulesets.
 * @return {Boolean} True if the element has no implicit role and uses both none and presentation as explicit roles
 */
function nonePresentationOnElementWithNoImplicitRole(
  virtualNode,
  explicitRoles
) {
  const hasImplicitRole = chunk018.implicitRole(virtualNode);
  return (
    !hasImplicitRole &&
    explicitRoles.length === 2 &&
    explicitRoles.includes('none') &&
    explicitRoles.includes('presentation')
  );
}
/**
 * Check that an element does not use more than one explicit role.
 *
 * @memberof checks
 * @return {Boolean} True if the element uses more than one explicit role. False otherwise.
 */
function fallbackroleEvaluate(node, options, virtualNode) {
  const explicitRoles = chunk013.tokenList(virtualNode.attr('role'));
  if (explicitRoles.length <= 1) {
    return false;
  }
  return nonePresentationOnElementWithNoImplicitRole(virtualNode, explicitRoles)
    ? undefined
    : true;
}

function hasGlobalAriaAttributeEvaluate(node, options, virtualNode) {
  const globalAttrs = chunk018.getGlobalAriaAttrs().filter(attr =>
    virtualNode.hasAttr(attr)
  );
  this.data(globalAttrs);
  return globalAttrs.length > 0;
}

/**
 * Check if an elements `role` attribute uses any widget or composite role values.
 *
 * Widget roles are taken from the `ariaRoles` standards object from the roles `type` property.
 *
 * @memberof checks
 * @return {Boolean} True if the element uses a `widget` or `composite` role. False otherwise.
 */
function hasWidgetRoleEvaluate(node, options, virtualNode) {
  const role = chunk018.getExplicitRole(virtualNode);
  if (role === null) {
    return false;
  }
  const roleType = chunk018.getRoleType(role);
  return roleType === 'widget' || roleType === 'composite';
}

/**
 * Check that each role on an element is a valid ARIA role.
 *
 * Valid ARIA roles are listed in the `ariaRoles` standards object.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String[]</code></td>
 *       <td>List of all invalid roles</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Boolean} True if the element uses an invalid role. False otherwise.
 */
function invalidroleEvaluate(node, options, virtualNode) {
  const allRoles = chunk013.tokenList(virtualNode.attr('role'));
  const allInvalid = allRoles.every(
    role => !chunk018.isValidRole(role.toLowerCase(), { allowAbstract: true })
  );

  /**
   * Only fail when all the roles are invalid
   */
  if (allInvalid) {
    this.data(allRoles);
    return true;
  }

  return false;
}

function isElementFocusableEvaluate(node, options, virtualNode) {
  return chunk018.isFocusable(virtualNode);
}

/**
 * Check that an elements explicit label matches its accessible name.
 *
 * ##### Data:
 * <table class="props">
 *   <thead>
 *     <tr>
 *       <th>Type</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><code>String</code></td>
 *       <td>The elements explicit role</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @memberof checks
 * @return {Mixed} False if the element does not have an explicit label and accessible name or if there is no mismatch between them. Undefined if the element has an explicit label but no accessible name or if the accessible name does not include the label text.
 */
function noImplicitExplicitLabelEvaluate(node, options, virtualNode) {
  const role = chunk018.getRole(virtualNode, { noImplicit: true });
  this.data(role);

  let label;
  let accText;
  try {
    label = chunk012.sanitize(chunk018.labelText(virtualNode)).toLowerCase();
    accText = chunk012.sanitize(chunk018.accessibleTextVirtual(virtualNode)).toLowerCase();
  } catch {
    return undefined;
  }

  if (!accText && !label) {
    return false;
  }

  if (!accText && label) {
    return undefined;
  }

  if (!accText.includes(label)) {
    return undefined;
  }

  return false;
}

exports.abstractroleEvaluate = abstractroleEvaluate;
exports.aria = aria;
exports.ariaAllowedAttrElmEvaluate = ariaAllowedAttrElmEvaluate;
exports.ariaAllowedAttrEvaluate = ariaAllowedAttrEvaluate;
exports.ariaAllowedRoleEvaluate = ariaAllowedRoleEvaluate;
exports.ariaBusyEvaluate = ariaBusyEvaluate;
exports.ariaConditionalAttrEvaluate = ariaConditionalAttrEvaluate;
exports.ariaConditionalCheckboxAttr = ariaConditionalCheckboxAttr;
exports.ariaConditionalRowAttr = ariaConditionalRowAttr;
exports.ariaErrormessageEvaluate = ariaErrormessageEvaluate;
exports.ariaHiddenBodyEvaluate = ariaHiddenBodyEvaluate;
exports.ariaLevelEvaluate = ariaLevelEvaluate;
exports.ariaProhibitedAttrEvaluate = ariaProhibitedAttrEvaluate;
exports.ariaRequiredAttrEvaluate = ariaRequiredAttrEvaluate;
exports.ariaRequiredChildrenEvaluate = ariaRequiredChildrenEvaluate;
exports.ariaRequiredParentEvaluate = ariaRequiredParentEvaluate;
exports.ariaRoledescriptionEvaluate = ariaRoledescriptionEvaluate;
exports.ariaUnsupportedAttrEvaluate = ariaUnsupportedAttrEvaluate;
exports.ariaValidAttrEvaluate = ariaValidAttrEvaluate;
exports.ariaValidAttrValueEvaluate = ariaValidAttrValueEvaluate;
exports.brailleLabelEquivalentEvaluate = brailleLabelEquivalentEvaluate;
exports.brailleRoleDescriptionEquivalentEvaluate = brailleRoleDescriptionEquivalentEvaluate;
exports.deprecatedroleEvaluate = deprecatedroleEvaluate;
exports.fallbackroleEvaluate = fallbackroleEvaluate;
exports.hasGlobalAriaAttributeEvaluate = hasGlobalAriaAttributeEvaluate;
exports.hasWidgetRoleEvaluate = hasWidgetRoleEvaluate;
exports.invalidroleEvaluate = invalidroleEvaluate;
exports.isAccessibleRef = isAccessibleRef;
exports.isComboboxPopup = isComboboxPopup;
exports.isElementFocusableEvaluate = isElementFocusableEvaluate;
exports.label = label;
exports.noImplicitExplicitLabelEvaluate = noImplicitExplicitLabelEvaluate;
exports.requiredContext = requiredContext;
exports.requiredOwned = requiredOwned;
exports.standards = standards;
