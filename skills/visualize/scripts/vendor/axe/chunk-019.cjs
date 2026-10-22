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

const chunk018 = require('./chunk-018.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk007 = require('./chunk-007.cjs');
const chunk010 = require('./chunk-010.cjs');
require('./chunk-011.cjs');
const chunk013 = require('./chunk-013.cjs');
require('./chunk-014.cjs');

/**
 * Get allowed attributes for a given role
 * @method allowedAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
function allowedAttr(role) {
  const roleDef = chunk018.standards.ariaRoles[role];
  const attrs = [...chunk018.getGlobalAriaAttrs()];

  if (!roleDef) {
    return attrs;
  }

  if (roleDef.allowedAttrs) {
    attrs.push(...roleDef.allowedAttrs);
  }

  if (roleDef.requiredAttrs) {
    attrs.push(...roleDef.requiredAttrs);
  }

  return attrs;
}

const idRefsRegex = /^idrefs?$/;

/**
 * Cache all ID references of a node and its children
 */
function cacheIdRefs(node, idRefs, refAttrs) {
  if (node.hasAttribute) {
    if (node.nodeName.toUpperCase() === 'LABEL' && node.hasAttribute('for')) {
      const id = node.getAttribute('for');
      if (!idRefs.has(id)) {
        idRefs.set(id, [node]);
      } else {
        idRefs.get(id).push(node);
      }
    }

    for (let i = 0; i < refAttrs.length; ++i) {
      const attr = refAttrs[i];
      const attrValue = chunk012.sanitize(node.getAttribute(attr) || '');
      if (!attrValue) {
        continue;
      }

      for (const token of chunk013.tokenList(attrValue)) {
        if (!idRefs.has(token)) {
          idRefs.set(token, [node]);
        } else {
          idRefs.get(token).push(node);
        }
      }
    }
  }

  for (let i = 0; i < node.childNodes.length; i++) {
    if (node.childNodes[i].nodeType === 1) {
      cacheIdRefs(node.childNodes[i], idRefs, refAttrs);
    }
  }
}

/**
 * Return all DOM nodes that use the nodes ID in the accessibility tree.
 * @param {Element} node
 * @returns {Element[]}
 */
function getAccessibleRefs(node) {
  node = node.actualNode || node;
  let root = chunk012.getRootNode(node);
  root = root.documentElement || root; // account for shadow roots

  const idRefsByRoot = chunk007.cache.get('idRefsByRoot', () => new Map());

  let idRefs = idRefsByRoot.get(root);
  if (!idRefs) {
    idRefs = new Map();
    idRefsByRoot.set(root, idRefs);

    const refAttrs = Object.keys(chunk018.standards.ariaAttrs).filter(attr => {
      const { type } = chunk018.standards.ariaAttrs[attr];
      return idRefsRegex.test(type);
    });
    cacheIdRefs(root, idRefs, refAttrs);
  }

  return idRefs.get(node.id) ?? [];
}

/**
 * @description validate if a given role is an allowed ARIA role for the supplied node
 * @method isAriaRoleAllowedOnElement
 * @param {HTMLElement} node the node to verify
 * @param {String} role aria role to check
 * @return {Boolean} retruns true/false
 */
function isAriaRoleAllowedOnElement(node, role) {
  const vNode =
    node instanceof chunk007.AbstractVirtualNode ? node : chunk010.getNodeFromTree(node);
  const implicitRole = chunk018.implicitRole(vNode);

  const spec = chunk018.getElementSpec(vNode);

  if (Array.isArray(spec.allowedRoles)) {
    return spec.allowedRoles.includes(role);
  }

  // By default, ARIA in HTML does not allow implicit roles to be the same as explicit ones
  // aria-allowed-roles has an `allowedImplicit` option to bypass this.
  if (role === implicitRole) {
    return false;
  }
  return !!spec.allowedRoles;
}

// dpub roles which are subclassing roles that are implicit on some native
// HTML elements (img, link, etc.)
const dpubRoles = [
  'doc-backlink',
  'doc-biblioentry',
  'doc-biblioref',
  'doc-cover',
  'doc-endnote',
  'doc-glossref',
  'doc-noteref'
];

const landmarkRoles = {
  header: 'banner',
  footer: 'contentinfo'
};

/**
 * Returns all roles applicable to element in a list
 *
 * @method getRoleSegments
 * @private
 * @param {Element} node
 * @returns {Array} Roles list or empty list
 */

function getRoleSegments(vNode) {
  let roles = [];
  if (!vNode) {
    return roles;
  }

  if (vNode.hasAttr('role')) {
    const nodeRoles = chunk013.tokenList(vNode.attr('role').toLowerCase());
    roles = roles.concat(nodeRoles);
  }

  // filter invalid roles
  return roles.filter(role => chunk018.isValidRole(role));
}

/**
 * gets all unallowed roles for a given node
 * @method getElementUnallowedRoles
 * @param {Element|VirtualNode} node HTMLElement to validate
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
function getElementUnallowedRoles(node, allowImplicit = true) {
  const { vNode } = chunk013.nodeLookup(node);
  // by pass custom elements
  if (!chunk018.isHtmlElement(vNode)) {
    return [];
  }
  // allow landmark roles to use their implicit role inside another landmark
  // @see https://github.com/dequelabs/axe-core/pull/3142
  const { nodeName } = vNode.props;
  const implicitRole = chunk018.implicitRole(vNode) || landmarkRoles[nodeName];

  const roleSegments = getRoleSegments(vNode);
  return roleSegments.filter(role => {
    return !roleIsAllowed(role, vNode, allowImplicit, implicitRole);
  });
}

function roleIsAllowed(role, vNode, allowImplicit, implicitRole) {
  if (allowImplicit && role === implicitRole) {
    return true;
  }
  // if role is a dpub role make sure it's used on an element with a valid
  // implicit role fallback
  if (dpubRoles.includes(role) && chunk018.getRoleType(role) !== implicitRole) {
    return false;
  }
  // check if role is allowed on element
  return isAriaRoleAllowedOnElement(vNode, role);
}

/**
 * Return a list of aria roles whose type matches the provided value.
 * @param {String} type The desired role type
 * @return {String[]} List of all roles matching the type
 */
function getAriaRolesByType(type) {
  return Object.keys(chunk018.standards.ariaRoles).filter(roleName => {
    return chunk018.standards.ariaRoles[roleName].type === type;
  });
}

/**
 * Get the roles that have a certain "type"
 * @method getRolesByType
 * @memberof axe.commons.aria
 * @deprecated use standards/get-aria-roles-by-type
 * @instance
 * @param {String} roleType The roletype to check
 * @return {Array} Array of roles that match the type
 */
function getRolesByType(roleType) {
  return getAriaRolesByType(roleType);
}

/**
 * Return a list of aria roles which are name from content.
 * @return {String[]} List of all roles with name from content
 */
function getAriaRolesSupportingNameFromContent() {
  return chunk007.cache.get('ariaRolesNameFromContent', () =>
    Object.keys(chunk018.standards.ariaRoles).filter(roleName => {
      return chunk018.standards.ariaRoles[roleName].nameFromContent;
    })
  );
}

/**
 * Get the roles that get name from the element's contents
 * @method getRolesWithNameFromContents
 * @memberof axe.commons.aria
 * @instance
 * @deprecated use standards/get-aria-roles-supporting-name-from-content
 * @return {Array} Array of roles that match the type
 */
function getRolesWithNameFromContents() {
  return getAriaRolesSupportingNameFromContent();
}

exports.allowedAttr = allowedAttr;
exports.getAccessibleRefs = getAccessibleRefs;
exports.getAriaRolesByType = getAriaRolesByType;
exports.getAriaRolesSupportingNameFromContent = getAriaRolesSupportingNameFromContent;
exports.getElementUnallowedRoles = getElementUnallowedRoles;
exports.getRolesByType = getRolesByType;
exports.getRolesWithNameFromContents = getRolesWithNameFromContents;
exports.isAriaRoleAllowedOnElement = isAriaRoleAllowedOnElement;
