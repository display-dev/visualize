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

// Source: https://www.w3.org/TR/wai-aria-1.1/#roles
// Source for abstract roles (types): https://www.w3.org/TR/wai-aria/#abstract_roles

/* easiest way to see allowed roles is to filter out the global ones
   from the list of inherited states and properties. The dpub spec
   does not have the global list so you'll need to copy over from
   the wai-aria one:

  const globalAttrs = Array.from(
    document.querySelectorAll('#global_states li')
  ).map(li => li.textContent.replace(/\s*\(.*\)/, ''));

  const globalRoleAttrs = Array.from(
    document.querySelectorAll('.role-inherited li')
  ).filter(li => globalAttrs.includes(li.textContent.replace(/\s*\(.*\)/, '')))

  globalRoleAttrs.forEach(li => li.style.display = 'none');
*/
const ariaRoles = {
  alert: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  alertdialog: {
    type: 'window',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded', 'aria-modal'],
    superclassRole: ['alert', 'dialog'],
    accessibleNameRequired: true
  },
  application: {
    // Note: spec difference
    type: 'landmark',
    // Note: aria-expanded is not in the 1.1 spec but is
    // consistently supported in ATs and was added in 1.2
    allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
    superclassRole: ['structure'],
    accessibleNameRequired: true
  },
  article: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
    superclassRole: ['document']
  },
  banner: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  blockquote: {
    type: 'structure',
    superclassRole: ['section']
  },
  button: {
    type: 'widget',
    allowedAttrs: ['aria-expanded', 'aria-pressed'],
    superclassRole: ['command'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  caption: {
    type: 'structure',
    requiredContext: ['figure', 'table', 'grid', 'treegrid'],
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  cell: {
    type: 'structure',
    requiredContext: ['row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-colindex',
      'aria-colspan',
      'aria-rowindex',
      'aria-rowspan',
      'aria-expanded'
    ],
    superclassRole: ['section'],
    nameFromContent: true
  },
  checkbox: {
    type: 'widget',
    // Note: aria-required is not in the 1.1 spec but is
    // consistently supported in ATs and was added in 1.2
    requiredAttrs: ['aria-checked'],
    allowedAttrs: ['aria-readonly', 'aria-expanded', 'aria-required'],
    superclassRole: ['input'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  code: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  columnheader: {
    type: 'structure',
    requiredContext: ['row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-sort',
      'aria-colindex',
      'aria-colspan',
      'aria-expanded',
      'aria-readonly',
      'aria-required',
      'aria-rowindex',
      'aria-rowspan',
      'aria-selected'
    ],
    superclassRole: ['cell', 'gridcell', 'sectionhead'],
    // Note: spec difference
    accessibleNameRequired: false,
    nameFromContent: true
  },
  combobox: {
    // Note: spec difference
    type: 'widget',
    requiredAttrs: ['aria-expanded', 'aria-controls'],
    allowedAttrs: [
      'aria-owns',
      'aria-autocomplete',
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    accessibleNameRequired: true
  },
  command: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  complementary: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  composite: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  contentinfo: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  comment: {
    type: 'structure',
    allowedAttrs: ['aria-level', 'aria-posinset', 'aria-setsize'],
    superclassRole: ['article']
  },
  definition: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  deletion: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  dialog: {
    type: 'window',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded', 'aria-modal'],
    superclassRole: ['window'],
    accessibleNameRequired: true
  },
  directory: {
    type: 'structure',
    deprecated: true,
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['list'],
    // Note: spec difference
    nameFromContent: true
  },
  document: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['structure']
  },
  emphasis: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  feed: {
    type: 'structure',
    requiredOwned: ['article'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['list']
  },
  figure: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    // Note: spec difference
    nameFromContent: true
  },
  form: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  grid: {
    type: 'composite',
    requiredOwned: ['rowgroup', 'row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-level',
      'aria-multiselectable',
      'aria-readonly',
      'aria-activedescendant',
      'aria-colcount',
      'aria-expanded',
      'aria-rowcount'
    ],
    superclassRole: ['composite', 'table'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  gridcell: {
    type: 'widget',
    requiredContext: ['row'],
    allowedAttrs: [
      'aria-readonly',
      'aria-required',
      'aria-selected',
      'aria-colindex',
      'aria-colspan',
      'aria-expanded',
      'aria-rowindex',
      'aria-rowspan'
    ],
    superclassRole: ['cell', 'widget'],
    nameFromContent: true
  },
  group: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-activedescendant', 'aria-expanded'],
    superclassRole: ['section']
  },
  heading: {
    type: 'structure',
    requiredAttrs: ['aria-level'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['sectionhead'],
    // Note: spec difference
    accessibleNameRequired: false,
    nameFromContent: true
  },
  img: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  input: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  insertion: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  landmark: {
    type: 'abstract',
    superclassRole: ['section']
  },
  link: {
    type: 'widget',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['command'],
    accessibleNameRequired: true,
    nameFromContent: true
  },
  list: {
    type: 'structure',
    requiredOwned: ['listitem'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  listbox: {
    // Note: spec difference
    type: 'widget',
    requiredOwned: ['group', 'option'],
    allowedAttrs: [
      'aria-multiselectable',
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    accessibleNameRequired: true
  },
  listitem: {
    type: 'structure',
    requiredContext: ['list'],
    allowedAttrs: [
      'aria-level',
      'aria-posinset',
      'aria-setsize',
      'aria-expanded'
    ],
    superclassRole: ['section'],
    // Note: spec difference
    nameFromContent: true
  },
  log: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  main: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  marquee: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  math: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    childrenPresentational: true
  },
  menu: {
    type: 'composite',
    // Note: spec difference (menu & separator as required owned)
    requiredOwned: [
      'group',
      'menuitemradio',
      'menuitem',
      'menuitemcheckbox',
      'menu',
      'separator'
    ],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select']
  },
  menubar: {
    type: 'composite',
    // Note: spec difference (menu & separator as required owned)
    requiredOwned: [
      'group',
      'menuitemradio',
      'menuitem',
      'menuitemcheckbox',
      'menu',
      'separator'
    ],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['menu']
  },
  menuitem: {
    type: 'widget',
    requiredContext: ['menu', 'menubar', 'group'],
    // Note: aria-expanded is not in the 1.1 spec but is
    // consistently supported in ATs and was added in 1.2
    allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-expanded'],
    superclassRole: ['command'],
    accessibleNameRequired: true,
    nameFromContent: true
  },
  menuitemcheckbox: {
    type: 'widget',
    requiredContext: ['menu', 'menubar', 'group'],
    requiredAttrs: ['aria-checked'],
    allowedAttrs: [
      'aria-expanded',
      'aria-posinset',
      'aria-readonly',
      'aria-setsize'
    ],
    superclassRole: ['checkbox', 'menuitem'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  menuitemradio: {
    type: 'widget',
    requiredContext: ['menu', 'menubar', 'group'],
    requiredAttrs: ['aria-checked'],
    allowedAttrs: [
      'aria-expanded',
      'aria-posinset',
      'aria-readonly',
      'aria-setsize'
    ],
    superclassRole: ['menuitemcheckbox', 'radio'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  meter: {
    type: 'structure',
    requiredAttrs: ['aria-valuenow'],
    allowedAttrs: ['aria-valuemax', 'aria-valuemin', 'aria-valuetext'],
    superclassRole: ['range'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  mark: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  navigation: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  none: {
    type: 'structure',
    superclassRole: ['structure'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  note: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  option: {
    type: 'widget',
    requiredContext: ['group', 'listbox'],
    // Note: since the option role has an implicit
    // aria-selected value it is not required to be added by
    // the user
    allowedAttrs: [
      'aria-selected',
      'aria-checked',
      'aria-posinset',
      'aria-setsize'
    ],
    superclassRole: ['input'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  paragraph: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  presentation: {
    type: 'structure',
    superclassRole: ['structure'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  progressbar: {
    type: 'widget',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-expanded',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    superclassRole: ['range'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  radio: {
    type: 'widget',
    // Note: aria-required is not in the 1.1 or 1.2 specs but is
    // consistently supported in ATs on the individual radio element
    requiredAttrs: ['aria-checked'],
    allowedAttrs: ['aria-posinset', 'aria-setsize', 'aria-required'],
    superclassRole: ['input'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  radiogroup: {
    type: 'composite',
    // Note: spec difference (no required owned)
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  range: {
    type: 'abstract',
    superclassRole: ['widget']
  },
  region: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  roletype: {
    type: 'abstract',
    superclassRole: []
  },
  row: {
    type: 'structure',
    requiredContext: ['grid', 'rowgroup', 'table', 'treegrid'],
    requiredOwned: ['cell', 'columnheader', 'gridcell', 'rowheader'],
    allowedAttrs: [
      'aria-colindex',
      'aria-level',
      'aria-rowindex',
      'aria-selected',
      'aria-activedescendant',
      'aria-expanded',
      'aria-posinset',
      'aria-setsize'
    ],
    superclassRole: ['group', 'widget'],
    nameFromContent: true
  },
  rowgroup: {
    type: 'structure',
    requiredContext: ['grid', 'table', 'treegrid'],
    requiredOwned: ['row'],
    superclassRole: ['structure'],
    nameFromContent: true
  },
  rowheader: {
    type: 'structure',
    requiredContext: ['row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-sort',
      'aria-colindex',
      'aria-colspan',
      'aria-expanded',
      'aria-readonly',
      'aria-required',
      'aria-rowindex',
      'aria-rowspan',
      'aria-selected'
    ],
    superclassRole: ['cell', 'gridcell', 'sectionhead'],
    // Note: spec difference
    accessibleNameRequired: false,
    nameFromContent: true
  },
  scrollbar: {
    type: 'widget',
    requiredAttrs: ['aria-valuenow'],
    // Note: since the scrollbar role has implicit
    // aria-orientation, aria-valuemax, aria-valuemin values it
    // is not required to be added by the user
    //
    // Note: because aria-controls is not well supported we will not
    // make it a required attribute even though it is required in the
    // spec
    allowedAttrs: [
      'aria-controls',
      'aria-orientation',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuetext'
    ],
    superclassRole: ['range'],
    childrenPresentational: true
  },
  search: {
    type: 'landmark',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  searchbox: {
    type: 'widget',
    allowedAttrs: [
      'aria-activedescendant',
      'aria-autocomplete',
      'aria-multiline',
      'aria-placeholder',
      'aria-readonly',
      'aria-required'
    ],
    superclassRole: ['textbox'],
    accessibleNameRequired: true
  },
  section: {
    type: 'abstract',
    superclassRole: ['structure'],
    // Note: spec difference
    nameFromContent: true
  },
  sectionhead: {
    type: 'abstract',
    superclassRole: ['structure'],
    // Note: spec difference
    nameFromContent: true
  },
  select: {
    type: 'abstract',
    superclassRole: ['composite', 'group']
  },
  separator: {
    type: 'structure',
    requiredAttrs: ['aria-valuenow'],
    // Note: since the separator role has implicit
    // aria-orientation, aria-valuemax, aria-valuemin, and
    // values it is not required to be added by
    // the user
    allowedAttrs: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-orientation',
      'aria-valuetext'
    ],
    superclassRole: ['structure', 'widget'],
    childrenPresentational: true
  },
  slider: {
    type: 'widget',
    requiredAttrs: ['aria-valuenow'],
    // Note: since the slider role has implicit
    // aria-orientation, aria-valuemax, aria-valuemin values it
    // is not required to be added by the user
    // Note: aria-required is not in the 1.1 or 1.2 specs but is
    // consistently supported in ATs
    allowedAttrs: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-orientation',
      'aria-readonly',
      'aria-required',
      'aria-valuetext'
    ],
    superclassRole: ['input', 'range'],
    accessibleNameRequired: true,
    childrenPresentational: true
  },
  spinbutton: {
    type: 'widget',
    // Note: since the spinbutton role has implicit
    // aria-valuenow, aria-valuemax, aria-valuemin values it
    // is not required to be added by the user
    allowedAttrs: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-readonly',
      'aria-required',
      'aria-activedescendant',
      'aria-valuetext',
      'aria-valuenow'
    ],
    superclassRole: ['composite', 'input', 'range'],
    accessibleNameRequired: true
  },
  status: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  strong: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  structure: {
    type: 'abstract',
    superclassRole: ['roletype']
  },
  subscript: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  superscript: {
    type: 'structure',
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  switch: {
    type: 'widget',
    requiredAttrs: ['aria-checked'],
    allowedAttrs: ['aria-expanded', 'aria-readonly', 'aria-required'],
    superclassRole: ['checkbox'],
    accessibleNameRequired: true,
    nameFromContent: true,
    childrenPresentational: true
  },
  suggestion: {
    type: 'structure',
    requiredOwned: ['insertion', 'deletion'],
    superclassRole: ['section'],
    prohibitedAttrs: ['aria-label', 'aria-labelledby']
  },
  tab: {
    type: 'widget',
    requiredContext: ['tablist'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-posinset',
      'aria-selected',
      'aria-setsize',
      'aria-expanded'
    ],
    superclassRole: ['sectionhead', 'widget'],
    nameFromContent: true,
    childrenPresentational: true
  },
  table: {
    type: 'structure',
    requiredOwned: ['rowgroup', 'row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-colcount', 'aria-rowcount', 'aria-expanded'],
    // NOTE: although the spec says this is not named from contents,
    // the accessible text acceptance tests (#139 and #140) require
    // table be named from content (we even had to special case
    // table in commons/aria/named-from-contents)
    superclassRole: ['section'],
    // Note: spec difference
    accessibleNameRequired: false,
    nameFromContent: true
  },
  tablist: {
    type: 'composite',
    requiredOwned: ['tab'],
    // NOTE: aria-expanded is from the 1.0 spec but is still
    // consistently supported in ATs
    allowedAttrs: [
      'aria-level',
      'aria-multiselectable',
      'aria-orientation',
      'aria-activedescendant',
      'aria-expanded'
    ],
    superclassRole: ['composite']
  },
  tabpanel: {
    // Spec ambiguity: Aria 1.1 and 1.2 both say that tabpanel rolls up to
    // structure via its section superclass, but also include it as a widget
    // in §5.3.2 Widget Roles.
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  term: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    // Note: spec difference
    nameFromContent: true
  },
  text: {
    type: 'structure',
    superclassRole: ['section'],
    nameFromContent: true
  },
  textbox: {
    type: 'widget',
    allowedAttrs: [
      'aria-activedescendant',
      'aria-autocomplete',
      'aria-multiline',
      'aria-placeholder',
      'aria-readonly',
      'aria-required'
    ],
    superclassRole: ['input'],
    accessibleNameRequired: true
  },
  time: {
    type: 'structure',
    superclassRole: ['section']
  },
  timer: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['status']
  },
  toolbar: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-orientation',
      'aria-activedescendant',
      'aria-expanded'
    ],
    superclassRole: ['group'],
    accessibleNameRequired: true
  },
  tooltip: {
    type: 'structure',
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section'],
    nameFromContent: true
  },
  tree: {
    type: 'composite',
    requiredOwned: ['group', 'treeitem'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-multiselectable',
      'aria-required',
      'aria-activedescendant',
      'aria-expanded',
      'aria-orientation'
    ],
    superclassRole: ['select'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  treegrid: {
    type: 'composite',
    requiredOwned: ['rowgroup', 'row'],
    // Spec difference: Aria-expanded removed in 1.2
    allowedAttrs: [
      'aria-activedescendant',
      'aria-colcount',
      'aria-expanded',
      'aria-level',
      'aria-multiselectable',
      'aria-orientation',
      'aria-readonly',
      'aria-required',
      'aria-rowcount'
    ],
    superclassRole: ['grid', 'tree'],
    // Note: spec difference
    accessibleNameRequired: false
  },
  treeitem: {
    type: 'widget',
    requiredContext: ['group', 'tree'],
    allowedAttrs: [
      'aria-checked',
      'aria-expanded',
      'aria-level',
      'aria-posinset',
      'aria-selected',
      'aria-setsize'
    ],
    superclassRole: ['listitem', 'option'],
    accessibleNameRequired: true,
    nameFromContent: true
  },
  widget: {
    type: 'abstract',
    superclassRole: ['roletype']
  },
  window: {
    type: 'abstract',
    superclassRole: ['roletype']
  }
};

// Source https://www.w3.org/TR/dpub-aria-1.0/
const dpubRoles = {
  'doc-abstract': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-acknowledgments': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-afterword': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-appendix': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-backlink': {
    type: 'link',
    allowedAttrs: ['aria-expanded'],
    nameFromContent: true,
    superclassRole: ['link']
  },
  'doc-biblioentry': {
    type: 'listitem',
    allowedAttrs: [
      'aria-expanded',
      'aria-level',
      'aria-posinset',
      'aria-setsize'
    ],
    superclassRole: ['listitem'],
    deprecated: true
  },
  'doc-bibliography': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-biblioref': {
    type: 'link',
    allowedAttrs: ['aria-expanded'],
    nameFromContent: true,
    superclassRole: ['link']
  },
  'doc-chapter': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-colophon': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-conclusion': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-cover': {
    type: 'img',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['img']
  },
  'doc-credit': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-credits': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-dedication': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-endnote': {
    type: 'listitem',
    allowedAttrs: [
      'aria-expanded',
      'aria-level',
      'aria-posinset',
      'aria-setsize'
    ],
    superclassRole: ['listitem'],
    deprecated: true
  },
  'doc-endnotes': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-epigraph': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-epilogue': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-errata': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-example': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-footnote': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-foreword': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-glossary': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-glossref': {
    type: 'link',
    allowedAttrs: ['aria-expanded'],
    nameFromContent: true,
    superclassRole: ['link']
  },
  'doc-index': {
    type: 'navigation',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['navigation']
  },
  'doc-introduction': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-noteref': {
    type: 'link',
    allowedAttrs: ['aria-expanded'],
    nameFromContent: true,
    superclassRole: ['link']
  },
  'doc-notice': {
    type: 'note',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['note']
  },
  'doc-pagebreak': {
    type: 'separator',
    allowedAttrs: ['aria-expanded', 'aria-orientation'],
    superclassRole: ['separator'],
    childrenPresentational: true
  },
  'doc-pagelist': {
    type: 'navigation',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['navigation']
  },
  'doc-part': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-preface': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-prologue': {
    type: 'landmark',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['landmark']
  },
  'doc-pullquote': {
    type: 'none',
    superclassRole: ['none']
  },
  'doc-qna': {
    type: 'section',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['section']
  },
  'doc-subtitle': {
    type: 'sectionhead',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['sectionhead']
  },
  'doc-tip': {
    type: 'note',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['note']
  },
  'doc-toc': {
    type: 'navigation',
    allowedAttrs: ['aria-expanded'],
    superclassRole: ['navigation']
  }
};

// Source: https://www.w3.org/TR/graphics-aria-1.0/

const graphicsRoles = {
  'graphics-document': {
    type: 'structure',
    superclassRole: ['document'],
    accessibleNameRequired: true
  },
  'graphics-object': {
    type: 'structure',
    superclassRole: ['group'],
    nameFromContent: true
  },
  'graphics-symbol': {
    type: 'structure',
    superclassRole: ['img'],
    accessibleNameRequired: true,
    childrenPresentational: true
  }
};

// Source: https://drafts.csswg.org/css-color/#valdef-color-rebeccapurple
const cssColors = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};

exports.ariaRoles = ariaRoles;
exports.cssColors = cssColors;
exports.dpubRoles = dpubRoles;
exports.graphicsRoles = graphicsRoles;
