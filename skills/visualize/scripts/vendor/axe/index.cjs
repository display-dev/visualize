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
require('./chunk-028.cjs');
require('./chunk-006.cjs');
require('./chunk-000.cjs');
require('./chunk-004.cjs');
require('./chunk-003.cjs');
require('./chunk-002.cjs');
require('./chunk-001.cjs');
require('./chunk-005.cjs');
require('./chunk-011.cjs');
require('./chunk-010.cjs');
require('./chunk-008.cjs');
require('./chunk-009.cjs');
require('./chunk-027.cjs');
require('./chunk-018.cjs');
require('./chunk-012.cjs');
require('./chunk-013.cjs');
require('./chunk-014.cjs');
require('./chunk-015.cjs');
require('./chunk-016.cjs');
require('./chunk-017.cjs');
require('./chunk-026.cjs');
require('./chunk-021.cjs');
require('./chunk-019.cjs');
require('./chunk-020.cjs');
require('./chunk-022.cjs');
require('./chunk-023.cjs');
require('./chunk-024.cjs');
require('./chunk-025.cjs');

chunk007.axe._load({
    lang: 'en',
    data: {
      rules: {
        accesskeys: {
          description: 'Ensure every accesskey attribute value is unique',
          help: 'accesskey attribute value should be unique'
        },
        'area-alt': {
          description: 'Ensure <area> elements of image maps have alternative text',
          help: 'Active <area> elements must have alternative text'
        },
        'aria-allowed-attr': {
          description: 'Ensure an element\'s role supports its ARIA attributes',
          help: 'Elements must only use supported ARIA attributes'
        },
        'aria-allowed-role': {
          description: 'Ensure role attribute has an appropriate value for the element',
          help: 'ARIA role should be appropriate for the element'
        },
        'aria-braille-equivalent': {
          description: 'Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent',
          help: 'aria-braille attributes must have a non-braille equivalent'
        },
        'aria-command-name': {
          description: 'Ensure every ARIA button, link and menuitem has an accessible name',
          help: 'ARIA commands must have an accessible name'
        },
        'aria-conditional-attr': {
          description: 'Ensure ARIA attributes are used as described in the specification of the element\'s role',
          help: 'ARIA attributes must be used as specified for the element\'s role'
        },
        'aria-deprecated-role': {
          description: 'Ensure elements do not use deprecated roles',
          help: 'Deprecated ARIA roles must not be used'
        },
        'aria-dialog-name': {
          description: 'Ensure every ARIA dialog and alertdialog node has an accessible name',
          help: 'ARIA dialog and alertdialog nodes should have an accessible name'
        },
        'aria-hidden-body': {
          description: 'Ensure aria-hidden="true" is not present on the document body.',
          help: 'aria-hidden="true" must not be present on the document body'
        },
        'aria-hidden-focus': {
          description: 'Ensure aria-hidden elements are not focusable nor contain focusable elements',
          help: 'ARIA hidden element must not be focusable or contain focusable elements'
        },
        'aria-input-field-name': {
          description: 'Ensure every ARIA input field has an accessible name',
          help: 'ARIA input fields must have an accessible name'
        },
        'aria-meter-name': {
          description: 'Ensure every ARIA meter node has an accessible name',
          help: 'ARIA meter nodes must have an accessible name'
        },
        'aria-progressbar-name': {
          description: 'Ensure every ARIA progressbar node has an accessible name',
          help: 'ARIA progressbar nodes must have an accessible name'
        },
        'aria-prohibited-attr': {
          description: 'Ensure ARIA attributes are not prohibited for an element\'s role',
          help: 'Elements must only use permitted ARIA attributes'
        },
        'aria-required-attr': {
          description: 'Ensure elements with ARIA roles have all required ARIA attributes',
          help: 'Required ARIA attributes must be provided'
        },
        'aria-required-children': {
          description: 'Ensure elements with an ARIA role that require child roles contain them',
          help: 'Certain ARIA roles must contain particular children'
        },
        'aria-required-parent': {
          description: 'Ensure elements with an ARIA role that require parent roles are contained by them',
          help: 'Certain ARIA roles must be contained by particular parents'
        },
        'aria-roledescription': {
          description: 'Ensure aria-roledescription is only used on elements with an implicit or explicit role',
          help: 'aria-roledescription must be on elements with a semantic role'
        },
        'aria-roles': {
          description: 'Ensure all elements with a role attribute use a valid value',
          help: 'ARIA roles used must conform to valid values'
        },
        'aria-text': {
          description: 'Ensure role="text" is used on elements with no focusable descendants',
          help: '"role=text" should have no focusable descendants'
        },
        'aria-toggle-field-name': {
          description: 'Ensure every ARIA toggle field has an accessible name',
          help: 'ARIA toggle fields must have an accessible name'
        },
        'aria-tooltip-name': {
          description: 'Ensure every ARIA tooltip node has an accessible name',
          help: 'ARIA tooltip nodes must have an accessible name'
        },
        'aria-treeitem-name': {
          description: 'Ensure every ARIA treeitem node has an accessible name',
          help: 'ARIA treeitem nodes should have an accessible name'
        },
        'aria-valid-attr-value': {
          description: 'Ensure all ARIA attributes have valid values',
          help: 'ARIA attributes must conform to valid values'
        },
        'aria-valid-attr': {
          description: 'Ensure attributes that begin with aria- are valid ARIA attributes',
          help: 'ARIA attributes must conform to valid names'
        },
        'audio-caption': {
          description: 'Ensure <audio> elements have captions',
          help: '<audio> elements must have a captions track'
        },
        'autocomplete-valid': {
          description: 'Ensure the autocomplete attribute is correct and suitable for the form field',
          help: 'autocomplete attribute must be used correctly'
        },
        'avoid-inline-spacing': {
          description: 'Ensure that text spacing set through style attributes can be adjusted with custom stylesheets',
          help: 'Inline text spacing must be adjustable with custom stylesheets'
        },
        blink: {
          description: 'Ensure <blink> elements are not used',
          help: '<blink> elements are deprecated and must not be used'
        },
        'button-name': {
          description: 'Ensure buttons have discernible text',
          help: 'Buttons must have discernible text'
        },
        bypass: {
          description: 'Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content',
          help: 'Page must have means to bypass repeated blocks'
        },
        'color-contrast-enhanced': {
          description: 'Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds',
          help: 'Elements must meet enhanced color contrast ratio thresholds'
        },
        'color-contrast': {
          description: 'Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds',
          help: 'Elements must meet minimum color contrast ratio thresholds'
        },
        'css-orientation-lock': {
          description: 'Ensure content is not locked to any specific display orientation, and the content is operable in all display orientations',
          help: 'CSS Media queries must not lock display orientation'
        },
        'definition-list': {
          description: 'Ensure <dl> elements are structured correctly',
          help: '<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements'
        },
        dlitem: {
          description: 'Ensure <dt> and <dd> elements are contained by a <dl>',
          help: '<dt> and <dd> elements must be contained by a <dl>'
        },
        'document-title': {
          description: 'Ensure each HTML document contains a non-empty <title> element',
          help: 'Documents must have <title> element to aid in navigation'
        },
        'duplicate-id-active': {
          description: 'Ensure every id attribute value of active elements is unique',
          help: 'IDs of active elements must be unique'
        },
        'duplicate-id-aria': {
          description: 'Ensure every id attribute value used in ARIA and in labels is unique',
          help: 'IDs used in ARIA and labels must be unique'
        },
        'duplicate-id': {
          description: 'Ensure every id attribute value is unique',
          help: 'id attribute value must be unique'
        },
        'empty-heading': {
          description: 'Ensure headings have discernible text',
          help: 'Headings should not be empty'
        },
        'empty-table-header': {
          description: 'Ensure table headers have discernible text',
          help: 'Table header text should not be empty'
        },
        'focus-order-semantics': {
          description: 'Ensure elements in the focus order have a role appropriate for interactive content',
          help: 'Elements in the focus order should have an appropriate role'
        },
        'form-field-multiple-labels': {
          description: 'Ensure form field does not have multiple label elements',
          help: 'Form field must not have multiple label elements'
        },
        'frame-focusable-content': {
          description: 'Ensure <frame> and <iframe> elements with focusable content do not have tabindex=-1',
          help: 'Frames with focusable content must not have tabindex=-1'
        },
        'frame-tested': {
          description: 'Ensure <iframe> and <frame> elements contain the axe-core script',
          help: 'Frames should be tested with axe-core'
        },
        'frame-title-unique': {
          description: 'Ensure <iframe> and <frame> elements contain a unique title attribute',
          help: 'Frames must have a unique title attribute'
        },
        'frame-title': {
          description: 'Ensure <iframe> and <frame> elements have an accessible name',
          help: 'Frames must have an accessible name'
        },
        'heading-order': {
          description: 'Ensure the order of headings is semantically correct',
          help: 'Heading levels should only increase by one'
        },
        'hidden-content': {
          description: 'Inform users about hidden content.',
          help: 'Hidden content on the page should be analyzed'
        },
        'html-has-lang': {
          description: 'Ensure every HTML document has a lang attribute',
          help: '<html> element must have a lang attribute'
        },
        'html-lang-valid': {
          description: 'Ensure the lang attribute of the <html> element has a valid value',
          help: '<html> element must have a valid value for the lang attribute'
        },
        'html-xml-lang-mismatch': {
          description: 'Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page',
          help: 'HTML elements with lang and xml:lang must have the same base language'
        },
        'identical-links-same-purpose': {
          description: 'Ensure that links with the same accessible name serve a similar purpose',
          help: 'Links with the same name must have a similar purpose'
        },
        'image-alt': {
          description: 'Ensure <img> elements have alternative text or a role of none or presentation',
          help: 'Images must have alternative text'
        },
        'image-redundant-alt': {
          description: 'Ensure image alternative is not repeated as text',
          help: 'Alternative text of images should not be repeated as text'
        },
        'input-button-name': {
          description: 'Ensure input buttons have discernible text',
          help: 'Input buttons must have discernible text'
        },
        'input-image-alt': {
          description: 'Ensure <input type="image"> elements have alternative text',
          help: 'Image buttons must have alternative text'
        },
        'label-content-name-mismatch': {
          description: 'Ensure that elements labelled through their content must have their visible text as part of their accessible name',
          help: 'Elements must have their visible text as part of their accessible name'
        },
        'label-title-only': {
          description: 'Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes',
          help: 'Form elements should have a visible label'
        },
        label: {
          description: 'Ensure every form element has a label',
          help: 'Form elements must have labels'
        },
        'landmark-banner-is-top-level': {
          description: 'Ensure the banner landmark is at top level',
          help: 'Banner landmark should not be contained in another landmark'
        },
        'landmark-complementary-is-top-level': {
          description: 'Ensure the complementary landmark or aside is at top level',
          help: 'Aside should not be contained in another landmark'
        },
        'landmark-contentinfo-is-top-level': {
          description: 'Ensure the contentinfo landmark is at top level',
          help: 'Contentinfo landmark should not be contained in another landmark'
        },
        'landmark-main-is-top-level': {
          description: 'Ensure the main landmark is at top level',
          help: 'Main landmark should not be contained in another landmark'
        },
        'landmark-no-duplicate-banner': {
          description: 'Ensure the document has at most one banner landmark',
          help: 'Document should not have more than one banner landmark'
        },
        'landmark-no-duplicate-contentinfo': {
          description: 'Ensure the document has at most one contentinfo landmark',
          help: 'Document should not have more than one contentinfo landmark'
        },
        'landmark-no-duplicate-main': {
          description: 'Ensure the document has at most one main landmark',
          help: 'Document should not have more than one main landmark'
        },
        'landmark-one-main': {
          description: 'Ensure the document has a main landmark',
          help: 'Document should have one main landmark'
        },
        'landmark-unique': {
          description: 'Ensure landmarks are unique',
          help: 'Landmarks should have a unique role or role/label/title (i.e. accessible name) combination'
        },
        'link-in-text-block': {
          description: 'Ensure links are distinguished from surrounding text in a way that does not rely on color',
          help: 'Links must be distinguishable without relying on color'
        },
        'link-name': {
          description: 'Ensure links have discernible text',
          help: 'Links must have discernible text'
        },
        list: {
          description: 'Ensure that lists are structured correctly',
          help: '<ul> and <ol> must only directly contain <li>, <script> or <template> elements'
        },
        listitem: {
          description: 'Ensure <li> elements are used semantically',
          help: '<li> elements must be contained in a <ul> or <ol>'
        },
        marquee: {
          description: 'Ensure <marquee> elements are not used',
          help: '<marquee> elements are deprecated and must not be used'
        },
        'meta-refresh-no-exceptions': {
          description: 'Ensure <meta http-equiv="refresh"> is not used for delayed refresh',
          help: 'Delayed refresh must not be used'
        },
        'meta-refresh': {
          description: 'Ensure <meta http-equiv="refresh"> is not used for delayed refresh',
          help: 'Delayed refresh under 20 hours must not be used'
        },
        'meta-viewport-large': {
          description: 'Ensure <meta name="viewport"> can scale a significant amount',
          help: 'Users should be able to zoom and scale the text up to 500%'
        },
        'meta-viewport': {
          description: 'Ensure <meta name="viewport"> does not disable text scaling and zooming',
          help: 'Zooming and scaling must not be disabled'
        },
        'nested-interactive': {
          description: 'Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies',
          help: 'Interactive controls must not be nested'
        },
        'no-autoplay-audio': {
          description: 'Ensure <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio',
          help: '<video> or <audio> elements must not play automatically'
        },
        'object-alt': {
          description: 'Ensure <object> elements have alternative text',
          help: '<object> elements must have alternative text'
        },
        'p-as-heading': {
          description: 'Ensure bold, italic text and font-size is not used to style <p> elements as a heading',
          help: 'Styled <p> elements must not be used as headings'
        },
        'page-has-heading-one': {
          description: 'Ensure that the page, or at least one of its frames contains a level-one heading',
          help: 'Page should contain a level-one heading'
        },
        'presentation-role-conflict': {
          description: 'Ensure elements marked as presentational do not have global ARIA or tabindex so that all screen readers ignore them',
          help: 'Elements marked as presentational should be consistently ignored'
        },
        region: {
          description: 'Ensure all page content is contained by landmarks',
          help: 'All page content should be contained by landmarks'
        },
        'role-img-alt': {
          description: 'Ensure [role="img"] elements have alternative text',
          help: '[role="img"] elements must have alternative text'
        },
        'scope-attr-valid': {
          description: 'Ensure the scope attribute is used correctly on tables',
          help: 'scope attribute should be used correctly'
        },
        'scrollable-region-focusable': {
          description: 'Ensure elements that have scrollable content are accessible by keyboard in Safari',
          help: 'Scrollable region must have keyboard access'
        },
        'select-name': {
          description: 'Ensure select element has an accessible name',
          help: 'Select element must have an accessible name'
        },
        'server-side-image-map': {
          description: 'Ensure that server-side image maps are not used',
          help: 'Server-side image maps must not be used'
        },
        'skip-link': {
          description: 'Ensure all skip links have a focusable target',
          help: 'The skip-link target should exist and be focusable'
        },
        'summary-name': {
          description: 'Ensure summary elements have discernible text',
          help: 'Summary elements must have discernible text'
        },
        'svg-img-alt': {
          description: 'Ensure <svg> elements with an img, graphics-document or graphics-symbol role have accessible text',
          help: '<svg> elements with an img role must have alternative text'
        },
        tabindex: {
          description: 'Ensure tabindex attribute values are not greater than 0',
          help: 'Elements should not have tabindex greater than zero'
        },
        'table-duplicate-name': {
          description: 'Ensure the <caption> element does not contain the same text as the summary attribute',
          help: 'Tables should not have the same summary and caption'
        },
        'table-fake-caption': {
          description: 'Ensure that tables with a caption use the <caption> element.',
          help: 'Data or header cells must not be used to give caption to a data table.'
        },
        'target-size': {
          description: 'Ensure touch targets have sufficient size and space',
          help: 'All touch targets must be 24px large, or leave sufficient space'
        },
        'td-has-header': {
          description: 'Ensure that each non-empty data cell in a <table> larger than 3 by 3  has one or more table headers',
          help: 'Non-empty <td> elements in larger <table> must have an associated table header'
        },
        'td-headers-attr': {
          description: 'Ensure that each cell in a table that uses the headers attribute refers only to other <th> elements in that table',
          help: 'Table cell headers attributes must refer to other <th> elements in the same table'
        },
        'th-has-data-cells': {
          description: 'Ensure that <th> elements and elements with role=columnheader/rowheader have data cells they describe',
          help: 'Table headers in a data table must refer to data cells'
        },
        'valid-lang': {
          description: 'Ensure lang attributes have valid values',
          help: 'lang attribute must have a valid value'
        },
        'video-caption': {
          description: 'Ensure <video> elements have captions',
          help: '<video> elements must have captions'
        }
      },
      checks: {
        abstractrole: {
          impact: 'serious',
          messages: {
            pass: 'Abstract roles are not used',
            fail: {
              singular: 'Abstract role cannot be directly used: ${data.values}',
              plural: 'Abstract roles cannot be directly used: ${data.values}'
            }
          }
        },
        'aria-allowed-attr-elm': {
          messages: {
            pass: 'ARIA attributes are allowed for this element',
            fail: {
              singular: 'ARIA attribute is not allowed on ${data.nodeName} elements: ${data.values}',
              plural: 'ARIA attributes are not allowed on ${data.nodeName} elements: ${data.values}'
            }
          }
        },
        'aria-allowed-attr': {
          impact: 'critical',
          messages: {
            pass: 'ARIA attributes are used correctly for the defined role',
            fail: {
              singular: 'ARIA attribute is not allowed: ${data.values}',
              plural: 'ARIA attributes are not allowed: ${data.values}'
            },
            incomplete: 'Check that there is no problem if the ARIA attribute is ignored on this element: ${data.values}'
          }
        },
        'aria-allowed-role': {
          impact: 'minor',
          messages: {
            pass: 'ARIA role is allowed for given element',
            fail: {
              singular: 'ARIA role ${data.values} is not allowed for given element',
              plural: 'ARIA roles ${data.values} are not allowed for given element'
            },
            incomplete: {
              singular: 'ARIA role ${data.values} must be removed when the element is made visible, as it is not allowed for the element',
              plural: 'ARIA roles ${data.values} must be removed when the element is made visible, as they are not allowed for the element'
            }
          }
        },
        'aria-busy': {
          impact: 'serious',
          messages: {
            pass: 'Element has an aria-busy attribute',
            fail: 'Element uses aria-busy="true" while showing a loader'
          }
        },
        'aria-conditional-attr': {
          impact: 'serious',
          messages: {
            pass: 'ARIA attribute is allowed',
            fail: {
              checkbox: 'Remove aria-checked, or set it to "${data.checkState}" to match the real checkbox state',
              rowSingular: 'This attribute is supported with treegrid rows, but not ${data.ownerRole}: ${data.invalidAttrs}',
              rowPlural: 'These attributes are supported with treegrid rows, but not ${data.ownerRole}: ${data.invalidAttrs}'
            }
          }
        },
        'aria-errormessage': {
          impact: 'critical',
          messages: {
            pass: 'aria-errormessage exists and references elements visible to screen readers that use a supported aria-errormessage technique',
            fail: {
              singular: 'aria-errormessage value `${data.values}` must use a technique to announce the message (e.g., aria-live, aria-describedby, role=alert, etc.)',
              plural: 'aria-errormessage values `${data.values}` must use a technique to announce the message (e.g., aria-live, aria-describedby, role=alert, etc.)',
              unsupported: 'Multiple IDs in aria-errormessage is not widely supported in assistive technologies',
              hidden: 'aria-errormessage value `${data.values}` cannot reference a hidden element'
            },
            incomplete: {
              singular: 'Ensure aria-errormessage value `${data.values}` references an existing element',
              plural: 'Ensure aria-errormessage values `${data.values}` reference existing elements',
              idrefs: 'Unable to determine if aria-errormessage element exists on the page: ${data.values}'
            }
          }
        },
        'aria-hidden-body': {
          impact: 'critical',
          messages: {
            pass: 'No aria-hidden attribute is present on document body',
            fail: 'aria-hidden=true should not be present on the document body'
          }
        },
        'aria-level': {
          impact: 'serious',
          messages: {
            pass: 'aria-level values are valid',
            incomplete: 'aria-level values greater than 6 are not supported in all screenreader and browser combinations'
          }
        },
        'aria-prohibited-attr': {
          impact: 'serious',
          messages: {
            pass: 'ARIA attribute is allowed',
            fail: {
              hasRolePlural: '${data.prohibited} attributes cannot be used with role "${data.role}".',
              hasRoleSingular: '${data.prohibited} attribute cannot be used with role "${data.role}".',
              noRolePlural: '${data.prohibited} attributes cannot be used on a ${data.nodeName} with no valid role attribute.',
              noRoleSingular: '${data.prohibited} attribute cannot be used on a ${data.nodeName} with no valid role attribute.'
            },
            incomplete: {
              hasRoleSingular: '${data.prohibited} attribute is not well supported with role "${data.role}".',
              hasRolePlural: '${data.prohibited} attributes are not well supported with role "${data.role}".',
              noRoleSingular: '${data.prohibited} attribute is not well supported on a ${data.nodeName} with no valid role attribute.',
              noRolePlural: '${data.prohibited} attributes are not well supported on a ${data.nodeName} with no valid role attribute.'
            }
          }
        },
        'aria-required-attr': {
          impact: 'critical',
          messages: {
            pass: 'All required ARIA attributes are present',
            fail: {
              singular: 'Required ARIA attribute not present: ${data.values}',
              plural: 'Required ARIA attributes not present: ${data.values}'
            }
          }
        },
        'aria-required-children': {
          impact: 'critical',
          messages: {
            pass: {
              default: 'Required ARIA children are present',
              'aria-busy': 'Element has an aria-busy attribute, so it is allowed to omit required children'
            },
            fail: {
              singular: 'Required ARIA child role not present: ${data.values}',
              plural: 'Required ARIA children role not present: ${data.values}',
              unallowed: 'Element has children which are not allowed: ${data.values}',
              'aria-busy-fail': 'Element has children which are not allowed: ${data.values}; Having aria-busy="true" does not allow children with roles that are not allowed'
            },
            incomplete: {
              singular: 'Expecting ARIA child role to be added: ${data.values}',
              plural: 'Expecting ARIA children role to be added: ${data.values}'
            }
          }
        },
        'aria-required-parent': {
          impact: 'critical',
          messages: {
            pass: 'Required ARIA parent role present',
            fail: {
              singular: 'Required ARIA parent role not present: ${data.values}',
              plural: 'Required ARIA parents role not present: ${data.values}'
            }
          }
        },
        'aria-roledescription': {
          impact: 'serious',
          messages: {
            pass: 'aria-roledescription used on a supported semantic role',
            incomplete: 'Check that the aria-roledescription is announced by supported screen readers',
            fail: 'Give the element a role that supports aria-roledescription'
          }
        },
        'aria-unsupported-attr': {
          impact: 'critical',
          messages: {
            pass: 'ARIA attribute is supported',
            fail: 'ARIA attribute is not widely supported in screen readers and assistive technologies: ${data.values}'
          }
        },
        'aria-valid-attr-value': {
          impact: 'critical',
          messages: {
            pass: 'ARIA attribute values are valid',
            fail: {
              singular: 'Invalid ARIA attribute value: ${data.values}',
              plural: 'Invalid ARIA attribute values: ${data.values}'
            },
            incomplete: {
              noId: 'ARIA attribute element ID does not exist on the page: ${data.needsReview}',
              noIdShadow: 'ARIA attribute element ID does not exist on the page or is a descendant of a different shadow DOM tree: ${data.needsReview}',
              ariaCurrent: 'ARIA attribute value is invalid and will be treated as "aria-current=true": ${data.needsReview}',
              idrefs: 'Unable to determine if ARIA attribute element ID exists on the page: ${data.needsReview}',
              empty: 'ARIA attribute value is ignored while empty: ${data.needsReview}',
              controlsWithinPopup: 'Unable to determine if aria-controls referenced ID exists on the page while using aria-haspopup: ${data.needsReview}'
            }
          }
        },
        'aria-valid-attr': {
          impact: 'critical',
          messages: {
            pass: 'ARIA attribute name is valid',
            fail: {
              singular: 'Invalid ARIA attribute name: ${data.values}',
              plural: 'Invalid ARIA attribute names: ${data.values}'
            }
          }
        },
        'braille-label-equivalent': {
          impact: 'serious',
          messages: {
            pass: 'aria-braillelabel is used on an element with accessible text',
            fail: 'aria-braillelabel is used on an element with no accessible text',
            incomplete: 'Unable to compute accessible text'
          }
        },
        'braille-roledescription-equivalent': {
          impact: 'serious',
          messages: {
            pass: 'aria-brailleroledescription is used on an element with aria-roledescription',
            fail: {
              noRoleDescription: 'aria-brailleroledescription is used on an element with no aria-roledescription',
              emptyRoleDescription: 'aria-brailleroledescription is used on an element with an empty aria-roledescription'
            }
          }
        },
        deprecatedrole: {
          impact: 'minor',
          messages: {
            pass: 'ARIA role is not deprecated',
            fail: 'The role used is deprecated: ${data}'
          }
        },
        fallbackrole: {
          impact: 'serious',
          messages: {
            pass: 'Only one role value used',
            fail: 'Use only one role value, since fallback roles are not supported in older browsers',
            incomplete: 'Use only role \'presentation\' or \'none\' since they are synonymous.'
          }
        },
        'has-global-aria-attribute': {
          impact: 'minor',
          messages: {
            pass: {
              singular: 'Element has global ARIA attribute: ${data.values}',
              plural: 'Element has global ARIA attributes: ${data.values}'
            },
            fail: 'Element does not have global ARIA attribute'
          }
        },
        'has-widget-role': {
          impact: 'minor',
          messages: {
            pass: 'Element has a widget role.',
            fail: 'Element does not have a widget role.'
          }
        },
        invalidrole: {
          impact: 'critical',
          messages: {
            pass: 'ARIA role is valid',
            fail: {
              singular: 'Role must be one of the valid ARIA roles: ${data.values}',
              plural: 'Roles must be one of the valid ARIA roles: ${data.values}'
            }
          }
        },
        'is-element-focusable': {
          impact: 'minor',
          messages: {
            pass: 'Element is focusable.',
            fail: 'Element is not focusable.'
          }
        },
        'no-implicit-explicit-label': {
          impact: 'serious',
          messages: {
            pass: 'There is no mismatch between a <label> and accessible name',
            incomplete: 'Check that the <label> does not need be part of the ARIA ${data} field\'s name'
          }
        },
        unsupportedrole: {
          impact: 'critical',
          messages: {
            pass: 'ARIA role is supported',
            fail: 'The role used is not widely supported in screen readers and assistive technologies: ${data}'
          }
        },
        'valid-scrollable-semantics': {
          impact: 'minor',
          messages: {
            pass: 'Element has valid semantics for an element in the focus order.',
            fail: 'Element has invalid semantics for an element in the focus order.'
          }
        },
        'color-contrast-enhanced': {
          impact: 'serious',
          messages: {
            pass: 'Element has sufficient color contrast of ${data.contrastRatio}',
            fail: {
              default: 'Element has insufficient color contrast of ${data.contrastRatio} (foreground color: ${data.fgColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}',
              fgOnShadowColor: 'Element has insufficient color contrast of ${data.contrastRatio} between the foreground and shadow color (foreground color: ${data.fgColor}, text-shadow color: ${data.shadowColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}',
              shadowOnBgColor: 'Element has insufficient color contrast of ${data.contrastRatio} between the shadow color and background color (text-shadow color: ${data.shadowColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}'
            },
            incomplete: {
              default: 'Unable to determine contrast ratio',
              bgImage: 'Element\'s background color could not be determined due to a background image',
              bgGradient: 'Element\'s background color could not be determined due to a background gradient',
              imgNode: 'Element\'s background color could not be determined because element contains an image node',
              bgOverlap: 'Element\'s background color could not be determined because it is overlapped by another element',
              fgAlpha: 'Element\'s foreground color could not be determined because of alpha transparency',
              elmPartiallyObscured: 'Element\'s background color could not be determined because it\'s partially obscured by another element',
              elmPartiallyObscuring: 'Element\'s background color could not be determined because it partially overlaps other elements',
              outsideViewport: 'Element\'s background color could not be determined because it\'s outside the viewport',
              equalRatio: 'Element has a 1:1 contrast ratio with the background',
              shortTextContent: 'Element content is too short to determine if it is actual text content',
              nonBmp: 'Element content contains only non-text characters',
              pseudoContent: 'Element\'s background color could not be determined due to a pseudo element',
              colorParse: 'Could not parse color string ${data.colorParse}'
            }
          }
        },
        'color-contrast': {
          impact: 'serious',
          messages: {
            pass: {
              default: 'Element has sufficient color contrast of ${data.contrastRatio}',
              hidden: 'Element is hidden'
            },
            fail: {
              default: 'Element has insufficient color contrast of ${data.contrastRatio} (foreground color: ${data.fgColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}',
              fgOnShadowColor: 'Element has insufficient color contrast of ${data.contrastRatio} between the foreground and shadow color (foreground color: ${data.fgColor}, text-shadow color: ${data.shadowColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}',
              shadowOnBgColor: 'Element has insufficient color contrast of ${data.contrastRatio} between the shadow color and background color (text-shadow color: ${data.shadowColor}, background color: ${data.bgColor}, font size: ${data.fontSize}, font weight: ${data.fontWeight}). Expected contrast ratio of ${data.expectedContrastRatio}'
            },
            incomplete: {
              default: 'Unable to determine contrast ratio',
              bgImage: 'Element\'s background color could not be determined due to a background image',
              bgGradient: 'Element\'s background color could not be determined due to a background gradient',
              imgNode: 'Element\'s background color could not be determined because element contains an image node',
              bgOverlap: 'Element\'s background color could not be determined because it is overlapped by another element',
              complexTextShadows: 'Element\'s contrast could not be determined because it uses complex text shadows',
              fgAlpha: 'Element\'s foreground color could not be determined because of alpha transparency',
              elmPartiallyObscured: 'Element\'s background color could not be determined because it\'s partially obscured by another element',
              elmPartiallyObscuring: 'Element\'s background color could not be determined because it partially overlaps other elements',
              outsideViewport: 'Element\'s background color could not be determined because it\'s outside the viewport',
              equalRatio: 'Element has a 1:1 contrast ratio with the background',
              shortTextContent: 'Element content is too short to determine if it is actual text content',
              nonBmp: 'Element content contains only non-text characters',
              pseudoContent: 'Element\'s background color could not be determined due to a pseudo element',
              colorParse: 'Could not parse color string ${data.colorParse}'
            }
          }
        },
        'link-in-text-block-style': {
          impact: 'serious',
          messages: {
            pass: 'Links can be distinguished from surrounding text by visual styling',
            incomplete: {
              default: 'Check if the link needs styling to distinguish it from nearby text',
              pseudoContent: 'Check if the link\'s pseudo style is sufficient to distinguish it from the surrounding text'
            },
            fail: 'The link has no styling (such as underline) to distinguish it from the surrounding text'
          }
        },
        'link-in-text-block': {
          impact: 'serious',
          messages: {
            pass: 'Links can be distinguished from surrounding text in some way other than by color',
            fail: {
              fgContrast: 'The link has insufficient color contrast of ${data.contrastRatio}:1 with the surrounding text. (Minimum contrast is ${data.requiredContrastRatio}:1, link text: ${data.nodeColor}, surrounding text: ${data.parentColor})',
              bgContrast: 'The link background has insufficient color contrast of ${data.contrastRatio} (Minimum contrast is ${data.requiredContrastRatio}:1, link background color: ${data.nodeBackgroundColor}, surrounding background color: ${data.parentBackgroundColor})'
            },
            incomplete: {
              default: 'Element\'s foreground contrast ratio could not be determined',
              bgContrast: 'Element\'s background contrast ratio could not be determined',
              bgImage: 'Element\'s contrast ratio could not be determined due to a background image',
              bgGradient: 'Element\'s contrast ratio could not be determined due to a background gradient',
              imgNode: 'Element\'s contrast ratio could not be determined because element contains an image node',
              bgOverlap: 'Element\'s contrast ratio could not be determined because of element overlap'
            }
          }
        },
        'autocomplete-appropriate': {
          impact: 'serious',
          messages: {
            pass: 'The autocomplete value is on an appropriate element',
            fail: 'The autocomplete value is inappropriate for this type of input'
          }
        },
        'autocomplete-valid': {
          impact: 'serious',
          messages: {
            pass: 'the autocomplete attribute is correctly formatted',
            fail: 'the autocomplete attribute is incorrectly formatted',
            incomplete: 'the autocomplete attribute has a non-standard value. Check whether any standard value could be used instead.'
          }
        },
        accesskeys: {
          impact: 'serious',
          messages: {
            pass: 'Accesskey attribute value is unique',
            fail: 'Document has multiple elements with the same accesskey'
          }
        },
        'focusable-content': {
          impact: 'serious',
          messages: {
            pass: 'Element contains focusable elements',
            fail: 'Element should have focusable content'
          }
        },
        'focusable-disabled': {
          impact: 'serious',
          messages: {
            pass: 'No focusable elements contained within element',
            incomplete: 'Check if the focusable elements immediately move the focus indicator',
            fail: 'Focusable content should be disabled or be removed from the DOM'
          }
        },
        'focusable-element': {
          impact: 'serious',
          messages: {
            pass: 'Element is focusable',
            fail: 'Element should be focusable'
          }
        },
        'focusable-modal-open': {
          impact: 'serious',
          messages: {
            pass: 'No focusable elements while a modal is open',
            incomplete: 'Check that focusable elements are not tabbable in the current state'
          }
        },
        'focusable-no-name': {
          impact: 'serious',
          messages: {
            pass: 'Element is not in tab order or has accessible text',
            fail: 'Element is in tab order and does not have accessible text',
            incomplete: 'Unable to determine if element has an accessible name'
          }
        },
        'focusable-not-tabbable': {
          impact: 'serious',
          messages: {
            pass: 'No focusable elements contained within element',
            incomplete: 'Check if the focusable elements immediately move the focus indicator',
            fail: 'Focusable content should have tabindex="-1" or be removed from the DOM'
          }
        },
        'frame-focusable-content': {
          impact: 'serious',
          messages: {
            pass: 'Element does not have focusable descendants',
            fail: 'Element has focusable descendants',
            incomplete: 'Could not determine if element has descendants'
          }
        },
        'landmark-is-top-level': {
          impact: 'moderate',
          messages: {
            pass: 'The ${data.role} landmark is at the top level.',
            fail: 'The ${data.role} landmark is contained in another landmark.'
          }
        },
        'no-focusable-content': {
          impact: 'serious',
          messages: {
            pass: 'Element does not have focusable descendants',
            fail: {
              default: 'Element has focusable descendants',
              notHidden: 'Using a negative tabindex on an element inside an interactive control does not prevent assistive technologies from focusing the element (even with aria-hidden="true")'
            },
            incomplete: 'Could not determine if element has descendants'
          }
        },
        'page-has-heading-one': {
          impact: 'moderate',
          messages: {
            pass: 'Page has at least one level-one heading',
            fail: 'Page must have a level-one heading'
          }
        },
        'page-has-main': {
          impact: 'moderate',
          messages: {
            pass: 'Document has at least one main landmark',
            fail: 'Document does not have a main landmark'
          }
        },
        'page-no-duplicate-banner': {
          impact: 'moderate',
          messages: {
            pass: 'Document does not have more than one banner landmark',
            fail: 'Document has more than one banner landmark'
          }
        },
        'page-no-duplicate-contentinfo': {
          impact: 'moderate',
          messages: {
            pass: 'Document does not have more than one contentinfo landmark',
            fail: 'Document has more than one contentinfo landmark'
          }
        },
        'page-no-duplicate-main': {
          impact: 'moderate',
          messages: {
            pass: 'Document does not have more than one main landmark',
            fail: 'Document has more than one main landmark'
          }
        },
        tabindex: {
          impact: 'serious',
          messages: {
            pass: 'Element does not have a tabindex greater than 0',
            fail: 'Element has a tabindex greater than 0'
          }
        },
        'alt-space-value': {
          impact: 'critical',
          messages: {
            pass: 'Element has a valid alt attribute value',
            fail: 'Element has an alt attribute containing only a space character, which is not ignored by all screen readers'
          }
        },
        'duplicate-img-label': {
          impact: 'minor',
          messages: {
            pass: 'Element does not duplicate existing text in <img> alt text',
            fail: 'Element contains <img> element with alt text that duplicates existing text'
          }
        },
        'explicit-label': {
          impact: 'critical',
          messages: {
            pass: 'Element has an explicit <label>',
            fail: 'Element does not have an explicit <label>',
            incomplete: 'Unable to determine if form element has an explicit <label>'
          }
        },
        'help-same-as-label': {
          impact: 'minor',
          messages: {
            pass: 'Help text (title or aria-describedby) does not duplicate label text',
            fail: 'Help text (title or aria-describedby) text is the same as the label text'
          }
        },
        'hidden-explicit-label': {
          impact: 'critical',
          messages: {
            pass: 'Form element has a visible explicit <label>',
            fail: 'Form element has explicit <label> that is hidden',
            incomplete: 'Unable to determine if form element has explicit <label> that is hidden'
          }
        },
        'implicit-label': {
          impact: 'critical',
          messages: {
            pass: 'Element has an implicit (wrapped) <label>',
            fail: 'Element does not have an implicit (wrapped) <label>',
            incomplete: 'Unable to determine if form element has an implicit (wrapped) <label>'
          }
        },
        'label-content-name-mismatch': {
          impact: 'serious',
          messages: {
            pass: 'Element contains visible text as part of it\'s accessible name',
            fail: 'Text inside the element is not included in the accessible name'
          }
        },
        'multiple-label': {
          impact: 'moderate',
          messages: {
            pass: 'Form field does not have multiple label elements',
            incomplete: 'Multiple label elements is not widely supported in assistive technologies. Ensure the first label contains all necessary information.'
          }
        },
        'title-only': {
          impact: 'serious',
          messages: {
            pass: 'Form element does not solely use title attribute for its label',
            fail: 'Only title used to generate label for form element'
          }
        },
        'landmark-is-unique': {
          impact: 'moderate',
          messages: {
            pass: 'Landmarks must have a unique role or role/label/title (i.e. accessible name) combination',
            fail: 'The landmark must have a unique aria-label, aria-labelledby, or title to make landmarks distinguishable'
          }
        },
        'has-lang': {
          impact: 'serious',
          messages: {
            pass: 'The <html> element has a lang attribute',
            fail: {
              noXHTML: 'The xml:lang attribute is not valid on HTML pages, use the lang attribute.',
              noLang: 'The <html> element does not have a lang attribute'
            }
          }
        },
        'valid-lang': {
          impact: 'serious',
          messages: {
            pass: 'Value of lang attribute is included in the list of valid languages',
            fail: 'Value of lang attribute not included in the list of valid languages'
          }
        },
        'xml-lang-mismatch': {
          impact: 'moderate',
          messages: {
            pass: 'Lang and xml:lang attributes have the same base language',
            fail: 'Lang and xml:lang attributes do not have the same base language'
          }
        },
        dlitem: {
          impact: 'serious',
          messages: {
            pass: 'Description list item has a <dl> parent element',
            fail: 'Description list item does not have a <dl> parent element'
          }
        },
        listitem: {
          impact: 'serious',
          messages: {
            pass: 'List item has a <ul>, <ol> or role="list" parent element',
            fail: {
              default: 'List item does not have a <ul>, <ol> parent element',
              roleNotValid: 'List item parent element has a role that is not role="list"'
            }
          }
        },
        'only-dlitems': {
          impact: 'serious',
          messages: {
            pass: 'dl element only has direct children that are allowed inside; <dt>, <dd>, or <div> elements',
            fail: 'dl element has direct children that are not allowed: ${data.values}'
          }
        },
        'only-listitems': {
          impact: 'serious',
          messages: {
            pass: 'List element only has direct children that are allowed inside <li> elements',
            fail: 'List element has direct children that are not allowed: ${data.values}'
          }
        },
        'structured-dlitems': {
          impact: 'serious',
          messages: {
            pass: 'When not empty, element has both <dt> and <dd> elements',
            fail: 'When not empty, element does not have at least one <dt> element followed by at least one <dd> element'
          }
        },
        caption: {
          impact: 'critical',
          messages: {
            pass: 'The multimedia element has a captions track',
            incomplete: 'Check that captions are available for the element'
          }
        },
        'frame-tested': {
          impact: 'critical',
          messages: {
            pass: 'The iframe was tested with axe-core',
            fail: 'The iframe could not be tested with axe-core',
            incomplete: 'The iframe still has to be tested with axe-core'
          }
        },
        'no-autoplay-audio': {
          impact: 'moderate',
          messages: {
            pass: '<video> or <audio> does not output audio for more than allowed duration or has controls mechanism',
            fail: '<video> or <audio> outputs audio for more than allowed duration and does not have a controls mechanism',
            incomplete: 'Check that the <video> or <audio> does not output audio for more than allowed duration or provides a controls mechanism'
          }
        },
        'css-orientation-lock': {
          impact: 'serious',
          messages: {
            pass: 'Display is operable, and orientation lock does not exist',
            fail: 'CSS Orientation lock is applied, and makes display inoperable',
            incomplete: 'CSS Orientation lock cannot be determined'
          }
        },
        'meta-viewport-large': {
          impact: 'minor',
          messages: {
            pass: '<meta> tag does not prevent significant zooming on mobile devices',
            fail: '<meta> tag limits zooming on mobile devices'
          }
        },
        'meta-viewport': {
          impact: 'critical',
          messages: {
            pass: '<meta> tag does not disable zooming on mobile devices',
            fail: '${data} on <meta> tag disables zooming on mobile devices'
          }
        },
        'target-offset': {
          impact: 'serious',
          messages: {
            pass: {
              default: 'Target has sufficient space from its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px which is at least ${data.minOffset}px.',
              large: 'Target far exceeds the minimum size of ${data.minOffset}px.'
            },
            fail: 'Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px instead of at least ${data.minOffset}px.',
            incomplete: {
              default: 'Element with negative tabindex has insufficient space to its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px instead of at least ${data.minOffset}px. Is this a target?',
              nonTabbableNeighbor: 'Target has insufficient space to its closest neighbors. Safe clickable space has a diameter of ${data.closestOffset}px instead of at least ${data.minOffset}px. Is the neighbor a target?',
              tooManyRects: 'Could not get the target size because there are too many overlapping elements'
            }
          }
        },
        'target-size': {
          impact: 'serious',
          messages: {
            pass: {
              default: 'Control has sufficient size (${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px)',
              obscured: 'Control is ignored because it is fully obscured and thus not clickable',
              large: 'Target far exceeds the minimum size of ${data.minSize}px.'
            },
            fail: {
              default: 'Target has insufficient size (${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px)',
              partiallyObscured: 'Target has insufficient size because it is partially obscured (smallest space is ${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px)'
            },
            incomplete: {
              default: 'Element with negative tabindex has insufficient size (${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px). Is this a target?',
              contentOverflow: 'Element size could not be accurately determined due to overflow content',
              partiallyObscured: 'Element with negative tabindex has insufficient size because it is partially obscured (smallest space is ${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px). Is this a target?',
              partiallyObscuredNonTabbable: 'Target has insufficient size because it is partially obscured by a neighbor with negative tabindex (smallest space is ${data.width}px by ${data.height}px, should be at least ${data.minSize}px by ${data.minSize}px). Is the neighbor a target?',
              tooManyRects: 'Could not get the target size because there are too many overlapping elements'
            }
          }
        },
        'header-present': {
          impact: 'serious',
          messages: {
            pass: 'Page has a heading',
            fail: 'Page does not have a heading'
          }
        },
        'heading-order': {
          impact: 'moderate',
          messages: {
            pass: 'Heading order valid',
            fail: 'Heading order invalid',
            incomplete: 'Unable to determine previous heading'
          }
        },
        'identical-links-same-purpose': {
          impact: 'minor',
          messages: {
            pass: 'There are no other links with the same name, that go to a different URL',
            incomplete: 'Check that links have the same purpose, or are intentionally ambiguous.'
          }
        },
        'internal-link-present': {
          impact: 'serious',
          messages: {
            pass: 'Valid skip link found',
            fail: 'No valid skip link found'
          }
        },
        landmark: {
          impact: 'serious',
          messages: {
            pass: 'Page has a landmark region',
            fail: 'Page does not have a landmark region'
          }
        },
        'meta-refresh-no-exceptions': {
          impact: 'minor',
          messages: {
            pass: '<meta> tag does not immediately refresh the page',
            fail: '<meta> tag forces timed refresh of page'
          }
        },
        'meta-refresh': {
          impact: 'critical',
          messages: {
            pass: '<meta> tag does not immediately refresh the page',
            fail: '<meta> tag forces timed refresh of page (less than 20 hours)'
          }
        },
        'p-as-heading': {
          impact: 'serious',
          messages: {
            pass: '<p> elements are not styled as headings',
            fail: 'Heading elements should be used instead of styled <p> elements',
            incomplete: 'Unable to determine if <p> elements are styled as headings'
          }
        },
        region: {
          impact: 'moderate',
          messages: {
            pass: 'All page content is contained by landmarks',
            fail: 'Some page content is not contained by landmarks'
          }
        },
        'skip-link': {
          impact: 'moderate',
          messages: {
            pass: 'Skip link target exists',
            incomplete: 'Skip link target should become visible on activation',
            fail: 'No skip link target'
          }
        },
        'unique-frame-title': {
          impact: 'serious',
          messages: {
            pass: 'Element\'s title attribute is unique',
            fail: 'Element\'s title attribute is not unique'
          }
        },
        'duplicate-id-active': {
          impact: 'serious',
          messages: {
            pass: 'Document has no active elements that share the same id attribute',
            fail: 'Document has active elements with the same id attribute: ${data}'
          }
        },
        'duplicate-id-aria': {
          impact: 'critical',
          messages: {
            pass: 'Document has no elements referenced with ARIA or labels that share the same id attribute',
            fail: 'Document has multiple elements referenced with ARIA with the same id attribute: ${data}'
          }
        },
        'duplicate-id': {
          impact: 'minor',
          messages: {
            pass: 'Document has no static elements that share the same id attribute',
            fail: 'Document has multiple static elements with the same id attribute: ${data}'
          }
        },
        'aria-label': {
          impact: 'serious',
          messages: {
            pass: 'aria-label attribute exists and is not empty',
            fail: 'aria-label attribute does not exist or is empty'
          }
        },
        'aria-labelledby': {
          impact: 'serious',
          messages: {
            pass: 'aria-labelledby attribute exists and references elements that are visible to screen readers',
            fail: 'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty',
            incomplete: 'Ensure aria-labelledby references an existing element'
          }
        },
        'avoid-inline-spacing': {
          impact: 'serious',
          messages: {
            pass: 'No inline styles with \'!important\' that affect text spacing has been specified',
            fail: {
              singular: 'Remove \'!important\' from inline style ${data.values}, as overriding this is not supported by most browsers',
              plural: 'Remove \'!important\' from inline styles ${data.values}, as overriding this is not supported by most browsers'
            }
          }
        },
        'button-has-visible-text': {
          impact: 'critical',
          messages: {
            pass: 'Element has inner text that is visible to screen readers',
            fail: 'Element does not have inner text that is visible to screen readers',
            incomplete: 'Unable to determine if element has children'
          }
        },
        'doc-has-title': {
          impact: 'serious',
          messages: {
            pass: 'Document has a non-empty <title> element',
            fail: 'Document does not have a non-empty <title> element'
          }
        },
        'error-occurred': {
          messages: {
            pass: '',
            incomplete: 'Axe encountered an error; test the page for this type of problem manually'
          }
        },
        exists: {
          impact: 'minor',
          messages: {
            pass: 'Element does not exist',
            incomplete: 'Element exists'
          }
        },
        'has-alt': {
          impact: 'critical',
          messages: {
            pass: 'Element has an alt attribute',
            fail: 'Element does not have an alt attribute'
          }
        },
        'has-visible-text': {
          impact: 'minor',
          messages: {
            pass: 'Element has text that is visible to screen readers',
            fail: 'Element does not have text that is visible to screen readers',
            incomplete: 'Unable to determine if element has children'
          }
        },
        'important-letter-spacing': {
          impact: 'serious',
          messages: {
            pass: 'Letter-spacing in the style attribute is not set to !important, or meets the minimum',
            fail: 'letter-spacing in the style attribute must not use !important, or be at ${data.minValue}em (current ${data.value}em)'
          }
        },
        'important-line-height': {
          impact: 'serious',
          messages: {
            pass: 'line-height in the style attribute is not set to !important, or meets the minimum',
            fail: 'line-height in the style attribute must not use !important, or be at ${data.minValue}em (current ${data.value}em)'
          }
        },
        'important-word-spacing': {
          impact: 'serious',
          messages: {
            pass: 'word-spacing in the style attribute is not set to !important, or meets the minimum',
            fail: 'word-spacing in the style attribute must not use !important, or be at ${data.minValue}em (current ${data.value}em)'
          }
        },
        'is-on-screen': {
          impact: 'serious',
          messages: {
            pass: 'Element is not visible',
            fail: 'Element is visible'
          }
        },
        'non-empty-alt': {
          impact: 'critical',
          messages: {
            pass: 'Element has a non-empty alt attribute',
            fail: {
              noAttr: 'Element has no alt attribute',
              emptyAttr: 'Element has an empty alt attribute'
            }
          }
        },
        'non-empty-if-present': {
          impact: 'critical',
          messages: {
            pass: {
              default: 'Element does not have a value attribute',
              'has-label': 'Element has a non-empty value attribute'
            },
            fail: 'Element has a value attribute and the value attribute is empty'
          }
        },
        'non-empty-placeholder': {
          impact: 'serious',
          messages: {
            pass: 'Element has a placeholder attribute',
            fail: {
              noAttr: 'Element has no placeholder attribute',
              emptyAttr: 'Element has an empty placeholder attribute'
            }
          }
        },
        'non-empty-title': {
          impact: 'serious',
          messages: {
            pass: 'Element has a title attribute',
            fail: {
              noAttr: 'Element has no title attribute',
              emptyAttr: 'Element has an empty title attribute'
            }
          }
        },
        'non-empty-value': {
          impact: 'critical',
          messages: {
            pass: 'Element has a non-empty value attribute',
            fail: {
              noAttr: 'Element has no value attribute',
              emptyAttr: 'Element has an empty value attribute'
            }
          }
        },
        'presentational-role': {
          impact: 'minor',
          messages: {
            pass: 'Element\'s default semantics were overridden with role="${data.role}"',
            fail: {
              default: 'Element\'s default semantics were not overridden with role="none" or role="presentation"',
              globalAria: 'Element\'s role is not presentational because it has a global ARIA attribute',
              focusable: 'Element\'s role is not presentational because it is focusable',
              both: 'Element\'s role is not presentational because it has a global ARIA attribute and is focusable',
              iframe: 'Using the "title" attribute on an ${data.nodeName} element with a presentational role behaves inconsistently between screen readers'
            }
          }
        },
        'role-none': {
          impact: 'minor',
          messages: {
            pass: 'Element\'s default semantics were overridden with role="none"',
            fail: 'Element\'s default semantics were not overridden with role="none"'
          }
        },
        'role-presentation': {
          impact: 'minor',
          messages: {
            pass: 'Element\'s default semantics were overridden with role="presentation"',
            fail: 'Element\'s default semantics were not overridden with role="presentation"'
          }
        },
        'svg-non-empty-title': {
          impact: 'serious',
          messages: {
            pass: 'Element has a child that is a title',
            fail: {
              noTitle: 'Element has no child that is a title',
              emptyTitle: 'Element child title is empty'
            },
            incomplete: 'Unable to determine element has a child that is a title'
          }
        },
        'caption-faked': {
          impact: 'serious',
          messages: {
            pass: 'The first row of a table is not used as a caption',
            fail: 'The first child of the table should be a caption instead of a table cell'
          }
        },
        'html5-scope': {
          impact: 'moderate',
          messages: {
            pass: 'Scope attribute is only used on table header elements (<th>)',
            fail: 'In HTML 5, scope attributes may only be used on table header elements (<th>)'
          }
        },
        'same-caption-summary': {
          impact: 'minor',
          messages: {
            pass: 'Content of summary attribute and <caption> are not duplicated',
            fail: 'Content of summary attribute and <caption> element are identical',
            incomplete: 'Unable to determine if <table> element has a caption'
          }
        },
        'scope-value': {
          impact: 'critical',
          messages: {
            pass: 'Scope attribute is used correctly',
            fail: 'The value of the scope attribute may only be \'row\' or \'col\''
          }
        },
        'td-has-header': {
          impact: 'critical',
          messages: {
            pass: 'All non-empty data cells have table headers',
            fail: 'Some non-empty data cells do not have table headers'
          }
        },
        'td-headers-attr': {
          impact: 'serious',
          messages: {
            pass: 'The headers attribute is exclusively used to refer to other header cells in the table',
            incomplete: 'The headers attribute is empty',
            fail: {
              'cell-header-not-in-table': 'The headers attribute is not exclusively used to refer to other header cells in the table',
              'cell-header-not-th': 'The headers attribute must refer to header cells, not data cells',
              'header-refs-self': 'The element with headers attribute refers to itself'
            }
          }
        },
        'th-has-data-cells': {
          impact: 'serious',
          messages: {
            pass: 'All table header cells refer to data cells',
            fail: 'Not all table header cells refer to data cells',
            incomplete: 'Table data cells are missing or empty'
          }
        },
        'hidden-content': {
          impact: 'minor',
          messages: {
            pass: 'All content on the page has been analyzed.',
            fail: 'There were problems analyzing the content on this page.',
            incomplete: 'There is hidden content on the page that was not analyzed. You will need to trigger the display of this content in order to analyze it.'
          }
        }
      },
      failureSummaries: {
        any: {
          failureMessage: function anonymous(it) {
            var out = 'Fix any of the following:';
            var arr1 = it;
            if (arr1) {
              var value, i1 = -1, l1 = arr1.length - 1;
              while (i1 < l1) {
                value = arr1[i1 += 1];
                out += '\n  ' + value.split('\n').join('\n  ');
              }
            }
            return out;
          }
        },
        none: {
          failureMessage: function anonymous(it) {
            var out = 'Fix all of the following:';
            var arr1 = it;
            if (arr1) {
              var value, i1 = -1, l1 = arr1.length - 1;
              while (i1 < l1) {
                value = arr1[i1 += 1];
                out += '\n  ' + value.split('\n').join('\n  ');
              }
            }
            return out;
          }
        }
      },
      incompleteFallbackMessage: 'axe couldn\'t tell the reason. Time to break out the element inspector!'
    },
    rules: [ {
      id: 'accesskeys',
      impact: 'serious',
      selector: '[accesskey]',
      excludeHidden: false,
      tags: [ 'cat.keyboard', 'best-practice' ],
      all: [],
      any: [],
      none: [ 'accesskeys' ]
    }, {
      id: 'area-alt',
      impact: 'critical',
      selector: 'map area[href]',
      excludeHidden: false,
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag244', 'wcag412', 'section508', 'section508.22.a', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.2.4.4', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-1.1.2' ],
      actIds: [ 'c487ae' ],
      all: [],
      any: [ {
        options: {
          attribute: 'alt'
        },
        id: 'non-empty-alt'
      }, 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-allowed-attr',
      impact: 'critical',
      matches: 'aria-allowed-attr-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '5c01ea' ],
      all: [ {
        options: {
          validTreeRowAttrs: [ 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-level' ]
        },
        id: 'aria-allowed-attr'
      }, 'aria-allowed-attr-elm' ],
      any: [],
      none: [ 'aria-unsupported-attr' ]
    }, {
      id: 'aria-allowed-role',
      impact: 'minor',
      excludeHidden: false,
      selector: '[role]',
      matches: 'aria-allowed-role-matches',
      tags: [ 'cat.aria', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          allowImplicit: true,
          ignoredTags: []
        },
        id: 'aria-allowed-role'
      } ],
      none: []
    }, {
      id: 'aria-braille-equivalent',
      reviewOnFail: true,
      impact: 'serious',
      selector: '[aria-brailleroledescription], [aria-braillelabel]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2' ],
      all: [ 'braille-roledescription-equivalent', 'braille-label-equivalent' ],
      any: [],
      none: []
    }, {
      id: 'aria-command-name',
      impact: 'serious',
      selector: '[role="link"], [role="button"], [role="menuitem"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-11.9.1' ],
      actIds: [ '97a4e1' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-conditional-attr',
      impact: 'serious',
      matches: 'aria-allowed-attr-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '5c01ea' ],
      all: [ {
        options: {
          invalidTableRowAttrs: [ 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-level' ]
        },
        id: 'aria-conditional-attr'
      } ],
      any: [],
      none: []
    }, {
      id: 'aria-deprecated-role',
      impact: 'minor',
      selector: '[role]',
      matches: 'no-empty-role-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '674b10' ],
      all: [],
      any: [],
      none: [ 'deprecatedrole' ]
    }, {
      id: 'aria-dialog-name',
      impact: 'serious',
      selector: '[role="dialog"], [role="alertdialog"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'best-practice' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-hidden-body',
      impact: 'critical',
      selector: 'body',
      excludeHidden: false,
      matches: 'is-initiator-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag131', 'wcag412', 'EN-301-549', 'EN-9.1.3.1', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-10.8.1' ],
      all: [],
      any: [ 'aria-hidden-body' ],
      none: []
    }, {
      id: 'aria-hidden-focus',
      impact: 'serious',
      selector: '[aria-hidden="true"]',
      matches: 'aria-hidden-focus-matches',
      excludeHidden: false,
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-10.8.1' ],
      actIds: [ '6cfa84' ],
      all: [ 'focusable-modal-open', 'focusable-disabled', 'focusable-not-tabbable' ],
      any: [],
      none: []
    }, {
      id: 'aria-input-field-name',
      impact: 'serious',
      selector: '[role="combobox"], [role="listbox"], [role="searchbox"], [role="slider"], [role="spinbutton"], [role="textbox"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'TTv5', 'TT5.c', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-11.1.1' ],
      actIds: [ 'e086e5' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: [ 'no-implicit-explicit-label' ]
    }, {
      id: 'aria-meter-name',
      impact: 'serious',
      selector: '[role="meter"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag111', 'EN-301-549', 'EN-9.1.1.1', 'RGAAv4', 'RGAA-11.1.1' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-progressbar-name',
      impact: 'serious',
      selector: '[role="progressbar"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag111', 'EN-301-549', 'EN-9.1.1.1', 'RGAAv4', 'RGAA-11.1.1' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-prohibited-attr',
      impact: 'serious',
      matches: 'aria-allowed-attr-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '5c01ea' ],
      all: [],
      any: [],
      none: [ {
        options: {
          elementsAllowedAriaLabel: [ 'applet', 'input' ]
        },
        id: 'aria-prohibited-attr'
      } ]
    }, {
      id: 'aria-required-attr',
      impact: 'critical',
      selector: '[role]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '4e8ab6' ],
      all: [],
      any: [ 'aria-required-attr' ],
      none: []
    }, {
      id: 'aria-required-children',
      impact: 'critical',
      selector: '[role]',
      matches: 'aria-required-children-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.3.1' ],
      actIds: [ 'bc4a75', 'ff89c9' ],
      all: [],
      any: [ {
        options: {
          reviewEmpty: [ 'doc-bibliography', 'doc-endnotes', 'grid', 'list', 'listbox', 'menu', 'menubar', 'table', 'tablist', 'tree', 'treegrid', 'rowgroup' ]
        },
        id: 'aria-required-children'
      } ],
      none: []
    }, {
      id: 'aria-required-parent',
      impact: 'critical',
      selector: '[role]',
      matches: 'aria-required-parent-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.3.1' ],
      actIds: [ 'ff89c9' ],
      all: [],
      any: [ {
        options: {
          ownGroupRoles: [ 'listitem', 'treeitem' ]
        },
        id: 'aria-required-parent'
      } ],
      none: []
    }, {
      id: 'aria-roledescription',
      impact: 'serious',
      selector: '[aria-roledescription]',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'deprecated' ],
      enabled: false,
      all: [],
      any: [ {
        options: {
          supportedRoles: [ 'button', 'img', 'checkbox', 'radio', 'combobox', 'menuitemcheckbox', 'menuitemradio' ]
        },
        id: 'aria-roledescription'
      } ],
      none: []
    }, {
      id: 'aria-roles',
      impact: 'critical',
      selector: '[role]',
      matches: 'no-empty-role-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '674b10' ],
      all: [],
      any: [],
      none: [ 'invalidrole', 'abstractrole', 'unsupportedrole' ]
    }, {
      id: 'aria-text',
      impact: 'serious',
      selector: '[role=text]',
      tags: [ 'cat.aria', 'best-practice' ],
      all: [],
      any: [ 'no-focusable-content' ],
      none: []
    }, {
      id: 'aria-toggle-field-name',
      impact: 'serious',
      selector: '[role="checkbox"], [role="menuitemcheckbox"], [role="menuitemradio"], [role="radio"], [role="switch"], [role="option"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'TTv5', 'TT5.c', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ 'e086e5' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: [ 'no-implicit-explicit-label' ]
    }, {
      id: 'aria-tooltip-name',
      impact: 'serious',
      selector: '[role="tooltip"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-treeitem-name',
      impact: 'serious',
      selector: '[role="treeitem"]',
      matches: 'no-naming-method-matches',
      tags: [ 'cat.aria', 'best-practice' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'aria-valid-attr-value',
      impact: 'critical',
      matches: 'aria-has-attr-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '6a7281' ],
      all: [ {
        options: [],
        id: 'aria-valid-attr-value'
      }, 'aria-errormessage', 'aria-level' ],
      any: [],
      none: []
    }, {
      id: 'aria-valid-attr',
      impact: 'critical',
      matches: 'aria-has-attr-matches',
      tags: [ 'cat.aria', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '5f99a7' ],
      all: [],
      any: [ {
        options: [],
        id: 'aria-valid-attr'
      } ],
      none: []
    }, {
      id: 'audio-caption',
      impact: 'critical',
      selector: 'audio',
      enabled: false,
      excludeHidden: false,
      tags: [ 'cat.time-and-media', 'wcag2a', 'wcag121', 'EN-301-549', 'EN-9.1.2.1', 'section508', 'section508.22.a', 'deprecated' ],
      actIds: [ '2eb176', 'afb423' ],
      all: [],
      any: [],
      none: [ 'caption' ]
    }, {
      id: 'autocomplete-valid',
      impact: 'serious',
      matches: 'autocomplete-matches',
      tags: [ 'cat.forms', 'wcag21aa', 'wcag135', 'EN-301-549', 'EN-9.1.3.5', 'ACT', 'RGAAv4', 'RGAA-11.13.1' ],
      actIds: [ '73f2c2' ],
      all: [ {
        options: {
          stateTerms: [ 'none', 'false', 'true', 'disabled', 'enabled', 'undefined', 'null', 'xoff', 'xon' ],
          ignoredValues: [ 'text', 'pronouns', 'gender', 'message', 'content' ]
        },
        id: 'autocomplete-valid'
      } ],
      any: [],
      none: []
    }, {
      id: 'avoid-inline-spacing',
      impact: 'serious',
      selector: '[style]',
      matches: 'is-visible-on-screen-matches',
      tags: [ 'cat.structure', 'wcag21aa', 'wcag1412', 'EN-301-549', 'EN-9.1.4.12', 'ACT' ],
      actIds: [ '24afc2', '9e45ec', '78fd32' ],
      all: [ {
        options: {
          cssProperty: 'letter-spacing',
          minValue: .12
        },
        id: 'important-letter-spacing'
      }, {
        options: {
          cssProperty: 'word-spacing',
          minValue: .16
        },
        id: 'important-word-spacing'
      }, {
        options: {
          multiLineOnly: true,
          cssProperty: 'line-height',
          minValue: 1.5,
          normalValue: 1
        },
        id: 'important-line-height'
      } ],
      any: [],
      none: []
    }, {
      id: 'blink',
      impact: 'serious',
      selector: 'blink',
      excludeHidden: false,
      tags: [ 'cat.time-and-media', 'wcag2a', 'wcag222', 'section508', 'section508.22.j', 'TTv5', 'TT2.b', 'EN-301-549', 'EN-9.2.2.2', 'RGAAv4', 'RGAA-13.8.1' ],
      all: [],
      any: [],
      none: [ 'is-on-screen' ]
    }, {
      id: 'button-name',
      impact: 'critical',
      selector: 'button',
      matches: 'no-explicit-name-required-matches',
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'section508', 'section508.22.a', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-11.9.1' ],
      actIds: [ '97a4e1', 'm6b1q3' ],
      all: [],
      any: [ 'button-has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'implicit-label', 'explicit-label', 'presentational-role' ],
      none: []
    }, {
      id: 'bypass',
      impact: 'serious',
      selector: 'html:not(html *)',
      pageLevel: true,
      matches: 'bypass-matches',
      reviewOnFail: true,
      tags: [ 'cat.keyboard', 'wcag2a', 'wcag241', 'section508', 'section508.22.o', 'TTv5', 'TT9.a', 'EN-301-549', 'EN-9.2.4.1', 'RGAAv4', 'RGAA-12.7.1' ],
      actIds: [ 'cf77f2', '047fe0', 'b40fd1', '3e12e1', 'ye5d6e' ],
      all: [],
      any: [ 'internal-link-present', {
        options: {
          selector: ':is(h1, h2, h3, h4, h5, h6):not([role]), [role=heading]'
        },
        id: 'header-present'
      }, {
        options: {
          selector: 'main, [role=main]'
        },
        id: 'landmark'
      } ],
      none: []
    }, {
      id: 'color-contrast-enhanced',
      impact: 'serious',
      matches: 'color-contrast-matches',
      excludeHidden: false,
      enabled: false,
      tags: [ 'cat.color', 'wcag2aaa', 'wcag146', 'ACT' ],
      actIds: [ '09o5cg' ],
      all: [],
      any: [ {
        options: {
          ignoreUnicode: true,
          ignoreLength: false,
          ignorePseudo: false,
          boldValue: 700,
          boldTextPt: 14,
          largeTextPt: 18,
          contrastRatio: {
            normal: {
              expected: 7,
              minThreshold: 4.5
            },
            large: {
              expected: 4.5,
              minThreshold: 3
            }
          },
          pseudoSizeThreshold: .25,
          shadowOutlineEmMax: .1,
          textStrokeEmMin: .03
        },
        id: 'color-contrast-enhanced'
      } ],
      none: []
    }, {
      id: 'color-contrast',
      impact: 'serious',
      matches: 'color-contrast-matches',
      excludeHidden: false,
      tags: [ 'cat.color', 'wcag2aa', 'wcag143', 'TTv5', 'TT13.c', 'EN-301-549', 'EN-9.1.4.3', 'ACT', 'RGAAv4', 'RGAA-3.2.1' ],
      actIds: [ 'afw4f7', '09o5cg' ],
      all: [],
      any: [ {
        options: {
          ignoreUnicode: true,
          ignoreLength: false,
          ignorePseudo: false,
          boldValue: 700,
          boldTextPt: 14,
          largeTextPt: 18,
          contrastRatio: {
            normal: {
              expected: 4.5
            },
            large: {
              expected: 3
            }
          },
          pseudoSizeThreshold: .25,
          shadowOutlineEmMax: .2,
          textStrokeEmMin: .03
        },
        id: 'color-contrast'
      } ],
      none: []
    }, {
      id: 'css-orientation-lock',
      impact: 'serious',
      selector: 'html:not(html *)',
      tags: [ 'cat.structure', 'wcag134', 'wcag21aa', 'EN-301-549', 'EN-9.1.3.4', 'RGAAv4', 'RGAA-13.9.1', 'experimental' ],
      actIds: [ 'b33eff' ],
      all: [ {
        options: {
          degreeThreshold: 2
        },
        id: 'css-orientation-lock'
      } ],
      any: [],
      none: [],
      preload: true
    }, {
      id: 'definition-list',
      impact: 'serious',
      selector: 'dl',
      matches: 'no-role-matches',
      tags: [ 'cat.structure', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.3.3' ],
      all: [],
      any: [],
      none: [ 'structured-dlitems', {
        options: {
          validRoles: [ 'definition', 'term', 'listitem' ],
          validNodeNames: [ 'dt', 'dd' ],
          divGroups: true
        },
        id: 'only-dlitems'
      } ]
    }, {
      id: 'dlitem',
      impact: 'serious',
      selector: 'dd, dt',
      matches: 'no-role-matches',
      tags: [ 'cat.structure', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.3.3' ],
      all: [],
      any: [ 'dlitem' ],
      none: []
    }, {
      id: 'document-title',
      impact: 'serious',
      selector: 'html:not(html *)',
      matches: 'is-initiator-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag242', 'TTv5', 'TT12.a', 'EN-301-549', 'EN-9.2.4.2', 'ACT', 'RGAAv4', 'RGAA-8.5.1' ],
      actIds: [ '2779a5' ],
      all: [],
      any: [ 'doc-has-title' ],
      none: []
    }, {
      id: 'duplicate-id-active',
      impact: 'serious',
      selector: '[id]',
      matches: 'duplicate-id-active-matches',
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a-obsolete', 'wcag411', 'deprecated' ],
      enabled: false,
      actIds: [ '3ea0c8' ],
      all: [],
      any: [ 'duplicate-id-active' ],
      none: []
    }, {
      id: 'duplicate-id-aria',
      impact: 'critical',
      selector: '[id]',
      matches: 'duplicate-id-aria-matches',
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a', 'wcag412', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-8.2.1' ],
      reviewOnFail: true,
      actIds: [ '3ea0c8' ],
      all: [],
      any: [ 'duplicate-id-aria' ],
      none: []
    }, {
      id: 'duplicate-id',
      impact: 'minor',
      selector: '[id]',
      matches: 'duplicate-id-misc-matches',
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a-obsolete', 'wcag411', 'deprecated' ],
      enabled: false,
      actIds: [ '3ea0c8' ],
      all: [],
      any: [ 'duplicate-id' ],
      none: []
    }, {
      id: 'empty-heading',
      impact: 'minor',
      selector: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
      matches: 'heading-matches',
      tags: [ 'cat.name-role-value', 'best-practice' ],
      actIds: [ 'ffd0e9' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'empty-table-header',
      impact: 'minor',
      selector: 'th:not([role]), [role="rowheader"], [role="columnheader"]',
      tags: [ 'cat.name-role-value', 'best-practice' ],
      all: [],
      any: [ 'has-visible-text' ],
      none: []
    }, {
      id: 'focus-order-semantics',
      impact: 'minor',
      selector: 'div, h1, h2, h3, h4, h5, h6, [role=heading], p, span',
      matches: 'inserted-into-focus-order-matches',
      tags: [ 'cat.keyboard', 'best-practice', 'RGAAv4', 'RGAA-12.8.1', 'experimental' ],
      all: [],
      any: [ {
        options: [],
        id: 'has-widget-role'
      }, {
        options: {
          roles: [ 'tooltip' ]
        },
        id: 'valid-scrollable-semantics'
      } ],
      none: []
    }, {
      id: 'form-field-multiple-labels',
      impact: 'moderate',
      selector: 'input, select, textarea',
      matches: 'label-matches',
      tags: [ 'cat.forms', 'wcag2a', 'wcag332', 'TTv5', 'TT5.c', 'EN-301-549', 'EN-9.3.3.2', 'RGAAv4', 'RGAA-11.2.1' ],
      all: [],
      any: [],
      none: [ 'multiple-label' ]
    }, {
      id: 'frame-focusable-content',
      impact: 'serious',
      selector: 'html:not(html *)',
      matches: 'frame-focusable-content-matches',
      tags: [ 'cat.keyboard', 'wcag2a', 'wcag211', 'TTv5', 'TT4.a', 'EN-301-549', 'EN-9.2.1.1', 'RGAAv4', 'RGAA-7.3.2' ],
      actIds: [ 'akn7bn' ],
      all: [],
      any: [ 'frame-focusable-content' ],
      none: []
    }, {
      id: 'frame-tested',
      impact: 'critical',
      selector: 'html:not(html *), frame, iframe',
      tags: [ 'cat.structure', 'best-practice', 'review-item' ],
      all: [ {
        options: {
          isViolation: false
        },
        id: 'frame-tested'
      } ],
      any: [],
      none: []
    }, {
      id: 'frame-title-unique',
      impact: 'serious',
      selector: 'frame[title], iframe[title]',
      matches: 'frame-title-has-text-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag412', 'TTv5', 'TT12.d', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-2.2.1' ],
      actIds: [ '4b1c6c' ],
      all: [],
      any: [],
      none: [ 'unique-frame-title' ],
      reviewOnFail: true
    }, {
      id: 'frame-title',
      impact: 'serious',
      selector: 'frame, iframe',
      matches: 'no-negative-tabindex-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag412', 'section508', 'section508.22.i', 'TTv5', 'TT12.d', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-2.1.1' ],
      actIds: [ 'cae760' ],
      all: [],
      any: [ {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'aria-label', 'aria-labelledby', 'presentational-role' ],
      none: []
    }, {
      id: 'heading-order',
      impact: 'moderate',
      selector: 'h1, h2, h3, h4, h5, h6, [role=heading]',
      matches: 'heading-matches',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'heading-order' ],
      none: []
    }, {
      id: 'hidden-content',
      impact: 'minor',
      selector: '*',
      excludeHidden: false,
      tags: [ 'cat.structure', 'best-practice', 'experimental', 'review-item' ],
      all: [],
      any: [ 'hidden-content' ],
      none: []
    }, {
      id: 'html-has-lang',
      impact: 'serious',
      selector: 'html:not(html *)',
      matches: 'is-initiator-matches',
      tags: [ 'cat.language', 'wcag2a', 'wcag311', 'TTv5', 'TT11.a', 'EN-301-549', 'EN-9.3.1.1', 'ACT', 'RGAAv4', 'RGAA-8.3.1' ],
      actIds: [ 'b5c3f8' ],
      all: [],
      any: [ {
        options: {
          attributes: [ 'lang', 'xml:lang' ]
        },
        id: 'has-lang'
      } ],
      none: []
    }, {
      id: 'html-lang-valid',
      impact: 'serious',
      selector: 'html[lang]:not([lang=""]):not(html *), html[xml\\:lang]:not([xml\\:lang=""]):not(html *)',
      tags: [ 'cat.language', 'wcag2a', 'wcag311', 'TTv5', 'TT11.a', 'EN-301-549', 'EN-9.3.1.1', 'ACT', 'RGAAv4', 'RGAA-8.4.1' ],
      actIds: [ 'bf051a' ],
      all: [],
      any: [],
      none: [ {
        options: {
          attributes: [ 'lang', 'xml:lang' ]
        },
        id: 'valid-lang'
      } ]
    }, {
      id: 'html-xml-lang-mismatch',
      impact: 'moderate',
      selector: 'html[lang][xml\\:lang]:not(html *)',
      matches: 'xml-lang-mismatch-matches',
      tags: [ 'cat.language', 'wcag2a', 'wcag311', 'EN-301-549', 'EN-9.3.1.1', 'ACT', 'RGAAv4', 'RGAA-8.3.1' ],
      actIds: [ '5b7ae0' ],
      all: [ 'xml-lang-mismatch' ],
      any: [],
      none: []
    }, {
      id: 'identical-links-same-purpose',
      impact: 'minor',
      selector: 'a[href], area[href], [role="link"]',
      excludeHidden: false,
      enabled: false,
      matches: 'identical-links-same-purpose-matches',
      tags: [ 'cat.semantics', 'wcag2aaa', 'wcag249' ],
      actIds: [ 'b20e66' ],
      all: [ 'identical-links-same-purpose' ],
      any: [],
      none: []
    }, {
      id: 'image-alt',
      impact: 'critical',
      selector: 'img',
      matches: 'no-explicit-name-required-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a', 'TTv5', 'TT7.a', 'TT7.b', 'EN-301-549', 'EN-9.1.1.1', 'ACT', 'RGAAv4', 'RGAA-1.1.1' ],
      actIds: [ '23a2a8' ],
      all: [],
      any: [ 'has-alt', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'presentational-role' ],
      none: [ 'alt-space-value' ]
    }, {
      id: 'image-redundant-alt',
      impact: 'minor',
      selector: 'img',
      tags: [ 'cat.text-alternatives', 'best-practice' ],
      all: [],
      any: [],
      none: [ {
        options: {
          parentSelector: 'button, [role=button], a[href], p, li, td, th'
        },
        id: 'duplicate-img-label'
      } ]
    }, {
      id: 'input-button-name',
      impact: 'critical',
      selector: 'input[type="button"], input[type="submit"], input[type="reset"]',
      matches: 'no-explicit-name-required-matches',
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'section508', 'section508.22.a', 'TTv5', 'TT5.c', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-11.9.1' ],
      actIds: [ '97a4e1' ],
      all: [],
      any: [ 'non-empty-if-present', {
        options: {
          attribute: 'value'
        },
        id: 'non-empty-value'
      }, 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'implicit-label', 'explicit-label', 'presentational-role' ],
      none: []
    }, {
      id: 'input-image-alt',
      impact: 'critical',
      selector: 'input[type="image"]',
      matches: 'no-explicit-name-required-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'wcag412', 'section508', 'section508.22.a', 'TTv5', 'TT7.a', 'EN-301-549', 'EN-9.1.1.1', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-1.1.3' ],
      actIds: [ '59796f' ],
      all: [],
      any: [ {
        options: {
          attribute: 'alt'
        },
        id: 'non-empty-alt'
      }, 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'implicit-label', 'explicit-label' ],
      none: []
    }, {
      id: 'label-content-name-mismatch',
      impact: 'serious',
      matches: 'label-content-name-mismatch-matches',
      tags: [ 'cat.semantics', 'wcag21a', 'wcag253', 'EN-301-549', 'EN-9.2.5.3', 'RGAAv4', 'RGAA-6.1.5', 'experimental' ],
      actIds: [ '2ee8b8' ],
      all: [],
      any: [ {
        options: {
          pixelThreshold: .1,
          occurrenceThreshold: 3
        },
        id: 'label-content-name-mismatch'
      } ],
      none: []
    }, {
      id: 'label-title-only',
      impact: 'serious',
      selector: 'input, select, textarea',
      matches: 'label-matches',
      tags: [ 'cat.forms', 'best-practice' ],
      all: [],
      any: [],
      none: [ 'title-only' ]
    }, {
      id: 'label',
      impact: 'critical',
      selector: 'input, textarea',
      matches: 'label-matches',
      tags: [ 'cat.forms', 'wcag2a', 'wcag412', 'section508', 'section508.22.n', 'TTv5', 'TT5.c', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-11.1.1' ],
      actIds: [ 'e086e5' ],
      all: [],
      any: [ 'implicit-label', 'explicit-label', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, {
        options: {
          attribute: 'placeholder'
        },
        id: 'non-empty-placeholder'
      }, 'presentational-role' ],
      none: [ 'hidden-explicit-label' ]
    }, {
      id: 'landmark-banner-is-top-level',
      impact: 'moderate',
      selector: 'header:not([role]), [role=banner]',
      matches: 'landmark-has-body-context-matches',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-complementary-is-top-level',
      impact: 'moderate',
      selector: 'aside:not([role]), [role=complementary]',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-contentinfo-is-top-level',
      impact: 'moderate',
      selector: 'footer:not([role]), [role=contentinfo]',
      matches: 'landmark-has-body-context-matches',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-main-is-top-level',
      impact: 'moderate',
      selector: 'main:not([role]), [role=main]',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ 'landmark-is-top-level' ],
      none: []
    }, {
      id: 'landmark-no-duplicate-banner',
      impact: 'moderate',
      selector: 'header:not([role]), [role=banner]',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          selector: 'header:not([role]), [role=banner]',
          role: 'banner'
        },
        id: 'page-no-duplicate-banner'
      } ],
      none: []
    }, {
      id: 'landmark-no-duplicate-contentinfo',
      impact: 'moderate',
      selector: 'footer:not([role]), [role=contentinfo]',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          selector: 'footer:not([role]), [role=contentinfo]',
          role: 'contentinfo'
        },
        id: 'page-no-duplicate-contentinfo'
      } ],
      none: []
    }, {
      id: 'landmark-no-duplicate-main',
      impact: 'moderate',
      selector: 'main:not([role]), [role=main]',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          selector: 'main:not([role]), [role=\'main\']'
        },
        id: 'page-no-duplicate-main'
      } ],
      none: []
    }, {
      id: 'landmark-one-main',
      impact: 'moderate',
      selector: 'html:not(html *)',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [ {
        options: {
          selector: 'main:not([role]), [role=\'main\']',
          passForModal: true
        },
        id: 'page-has-main'
      } ],
      any: [],
      none: []
    }, {
      id: 'landmark-unique',
      impact: 'moderate',
      selector: '[role=banner], [role=complementary], [role=contentinfo], [role=main], [role=navigation], [role=region], [role=search], [role=form], form, footer, header, aside, main, nav, section',
      tags: [ 'cat.semantics', 'best-practice' ],
      matches: 'landmark-unique-matches',
      all: [],
      any: [ 'landmark-is-unique' ],
      none: []
    }, {
      id: 'link-in-text-block',
      impact: 'serious',
      selector: 'a[href], [role=link]',
      matches: 'link-in-text-block-matches',
      excludeHidden: false,
      tags: [ 'cat.color', 'wcag2a', 'wcag141', 'TTv5', 'TT13.a', 'EN-301-549', 'EN-9.1.4.1', 'RGAAv4', 'RGAA-10.6.1' ],
      all: [],
      any: [ {
        options: {
          requiredContrastRatio: 3,
          allowSameColor: true
        },
        id: 'link-in-text-block'
      }, 'link-in-text-block-style' ],
      none: []
    }, {
      id: 'link-name',
      impact: 'serious',
      selector: 'a[href]',
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag244', 'wcag412', 'section508', 'section508.22.a', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.2.4.4', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-6.2.1' ],
      actIds: [ 'c487ae' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: [ 'focusable-no-name' ]
    }, {
      id: 'list',
      impact: 'serious',
      selector: 'ul, ol',
      matches: 'no-role-matches',
      tags: [ 'cat.structure', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.3.1' ],
      all: [],
      any: [],
      none: [ {
        options: {
          validRoles: [ 'listitem' ],
          validNodeNames: [ 'li' ]
        },
        id: 'only-listitems'
      } ]
    }, {
      id: 'listitem',
      impact: 'serious',
      selector: 'li',
      matches: 'no-role-matches',
      tags: [ 'cat.structure', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.3.1' ],
      all: [],
      any: [ 'listitem' ],
      none: []
    }, {
      id: 'marquee',
      impact: 'serious',
      selector: 'marquee',
      excludeHidden: false,
      tags: [ 'cat.parsing', 'wcag2a', 'wcag222', 'TTv5', 'TT2.b', 'EN-301-549', 'EN-9.2.2.2', 'RGAAv4', 'RGAA-13.8.1' ],
      all: [],
      any: [],
      none: [ 'is-on-screen' ]
    }, {
      id: 'meta-refresh-no-exceptions',
      impact: 'minor',
      selector: 'meta[http-equiv="refresh"][content]',
      excludeHidden: false,
      enabled: false,
      tags: [ 'cat.time-and-media', 'wcag2aaa', 'wcag224', 'wcag325' ],
      actIds: [ 'bisz58' ],
      all: [],
      any: [ {
        options: {
          minDelay: 72e3,
          maxDelay: false
        },
        id: 'meta-refresh-no-exceptions'
      } ],
      none: []
    }, {
      id: 'meta-refresh',
      impact: 'critical',
      selector: 'meta[http-equiv="refresh"][content]',
      excludeHidden: false,
      tags: [ 'cat.time-and-media', 'wcag2a', 'wcag221', 'TTv5', 'TT8.a', 'EN-301-549', 'EN-9.2.2.1', 'RGAAv4', 'RGAA-13.1.2' ],
      actIds: [ 'bc659a', 'bisz58' ],
      all: [],
      any: [ {
        options: {
          minDelay: 0,
          maxDelay: 72e3
        },
        id: 'meta-refresh'
      } ],
      none: []
    }, {
      id: 'meta-viewport-large',
      impact: 'minor',
      selector: 'meta[name="viewport"]',
      matches: 'is-initiator-matches',
      excludeHidden: false,
      tags: [ 'cat.sensory-and-visual-cues', 'best-practice' ],
      all: [],
      any: [ {
        options: {
          scaleMinimum: 5,
          lowerBound: 2
        },
        id: 'meta-viewport-large'
      } ],
      none: []
    }, {
      id: 'meta-viewport',
      impact: 'moderate',
      selector: 'meta[name="viewport"]',
      matches: 'is-initiator-matches',
      excludeHidden: false,
      tags: [ 'cat.sensory-and-visual-cues', 'wcag2aa', 'wcag144', 'EN-301-549', 'EN-9.1.4.4', 'ACT', 'RGAAv4', 'RGAA-10.4.2' ],
      actIds: [ 'b4f0c3' ],
      all: [],
      any: [ {
        options: {
          scaleMinimum: 2
        },
        id: 'meta-viewport'
      } ],
      none: []
    }, {
      id: 'nested-interactive',
      impact: 'serious',
      matches: 'nested-interactive-matches',
      tags: [ 'cat.keyboard', 'wcag2a', 'wcag412', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.4.1.2', 'RGAAv4', 'RGAA-7.1.1' ],
      actIds: [ '307n5z' ],
      all: [],
      any: [ 'no-focusable-content' ],
      none: []
    }, {
      id: 'no-autoplay-audio',
      impact: 'moderate',
      excludeHidden: false,
      selector: 'audio[autoplay], video[autoplay]',
      matches: 'no-autoplay-audio-matches',
      reviewOnFail: true,
      tags: [ 'cat.time-and-media', 'wcag2a', 'wcag142', 'TTv5', 'TT2.a', 'EN-301-549', 'EN-9.1.4.2', 'ACT', 'RGAAv4', 'RGAA-4.10.1' ],
      actIds: [ '80f0bf' ],
      preload: true,
      all: [ {
        options: {
          allowedDuration: 3
        },
        id: 'no-autoplay-audio'
      } ],
      any: [],
      none: []
    }, {
      id: 'object-alt',
      impact: 'serious',
      selector: 'object[data]',
      matches: 'object-is-loaded-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a', 'EN-301-549', 'EN-9.1.1.1', 'RGAAv4', 'RGAA-1.1.6' ],
      actIds: [ '8fc3b6' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'presentational-role' ],
      none: []
    }, {
      id: 'p-as-heading',
      impact: 'serious',
      selector: 'p',
      matches: 'p-as-heading-matches',
      tags: [ 'cat.semantics', 'wcag2a', 'wcag131', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-9.1.3', 'experimental' ],
      all: [ {
        options: {
          margins: [ {
            weight: 150,
            italic: true
          }, {
            weight: 150,
            size: 1.15
          }, {
            italic: true,
            size: 1.15
          }, {
            size: 1.4
          } ],
          passLength: 1,
          failLength: .5
        },
        id: 'p-as-heading'
      } ],
      any: [],
      none: []
    }, {
      id: 'page-has-heading-one',
      impact: 'moderate',
      selector: 'html:not(html *)',
      tags: [ 'cat.semantics', 'best-practice' ],
      all: [ {
        options: {
          selector: 'h1:not([role], [aria-level]), :is(h1, h2, h3, h4, h5, h6):not([role])[aria-level=1], [role=heading][aria-level=1]',
          passForModal: true
        },
        id: 'page-has-heading-one'
      } ],
      any: [],
      none: []
    }, {
      id: 'presentation-role-conflict',
      impact: 'minor',
      selector: 'img[alt=\'\'], [role="none"], [role="presentation"]',
      matches: 'has-implicit-chromium-role-matches',
      tags: [ 'cat.aria', 'best-practice', 'ACT' ],
      actIds: [ '46ca7f' ],
      all: [],
      any: [],
      none: [ 'is-element-focusable', 'has-global-aria-attribute' ]
    }, {
      id: 'region',
      impact: 'moderate',
      selector: 'body *',
      tags: [ 'cat.keyboard', 'best-practice', 'RGAAv4', 'RGAA-9.2.1' ],
      all: [],
      any: [ {
        options: {
          regionMatcher: 'dialog, [role=dialog], [role=alertdialog], svg'
        },
        id: 'region'
      } ],
      none: []
    }, {
      id: 'role-img-alt',
      impact: 'serious',
      selector: '[role=\'img\']:not(img, area, input, object)',
      matches: 'html-namespace-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a', 'TTv5', 'TT7.a', 'EN-301-549', 'EN-9.1.1.1', 'ACT', 'RGAAv4', 'RGAA-1.1.1' ],
      actIds: [ '23a2a8' ],
      all: [],
      any: [ 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'scope-attr-valid',
      impact: 'moderate',
      selector: 'td[scope], th[scope]',
      tags: [ 'cat.tables', 'best-practice' ],
      all: [ 'html5-scope', {
        options: {
          values: [ 'row', 'col', 'rowgroup', 'colgroup' ]
        },
        id: 'scope-value'
      } ],
      any: [],
      none: []
    }, {
      id: 'scrollable-region-focusable',
      impact: 'serious',
      selector: '*:not(select,textarea)',
      matches: 'scrollable-region-focusable-matches',
      tags: [ 'cat.keyboard', 'wcag2a', 'wcag211', 'wcag213', 'TTv5', 'TT4.a', 'EN-301-549', 'EN-9.2.1.1', 'EN-9.2.1.3', 'RGAAv4', 'RGAA-7.3.2' ],
      actIds: [ '0ssw9k' ],
      all: [],
      any: [ 'focusable-content', 'focusable-element' ],
      none: []
    }, {
      id: 'select-name',
      impact: 'critical',
      selector: 'select',
      tags: [ 'cat.forms', 'wcag2a', 'wcag412', 'section508', 'section508.22.n', 'TTv5', 'TT5.c', 'EN-301-549', 'EN-9.4.1.2', 'ACT', 'RGAAv4', 'RGAA-11.1.1' ],
      actIds: [ 'e086e5' ],
      all: [],
      any: [ 'implicit-label', 'explicit-label', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      }, 'presentational-role' ],
      none: [ 'hidden-explicit-label' ]
    }, {
      id: 'server-side-image-map',
      impact: 'minor',
      selector: 'img[ismap]',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag211', 'section508', 'section508.22.f', 'TTv5', 'TT4.a', 'EN-301-549', 'EN-9.2.1.1', 'RGAAv4', 'RGAA-1.1.4' ],
      all: [],
      any: [],
      none: [ 'exists' ]
    }, {
      id: 'skip-link',
      impact: 'moderate',
      selector: 'a[href^="#"], a[href^="/#"]',
      matches: 'skip-link-matches',
      tags: [ 'cat.keyboard', 'best-practice', 'RGAAv4', 'RGAA-12.7.1' ],
      all: [],
      any: [ 'skip-link' ],
      none: []
    }, {
      id: 'summary-name',
      impact: 'serious',
      selector: 'summary',
      matches: 'summary-interactive-matches',
      tags: [ 'cat.name-role-value', 'wcag2a', 'wcag412', 'section508', 'section508.22.a', 'TTv5', 'TT6.a', 'EN-301-549', 'EN-9.4.1.2' ],
      all: [],
      any: [ 'has-visible-text', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'svg-img-alt',
      impact: 'serious',
      selector: '[role="img"], [role="graphics-symbol"], svg[role="graphics-document"]',
      matches: 'svg-namespace-matches',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag111', 'section508', 'section508.22.a', 'TTv5', 'TT7.a', 'EN-301-549', 'EN-9.1.1.1', 'ACT', 'RGAAv4', 'RGAA-1.1.5' ],
      actIds: [ '7d6734' ],
      all: [],
      any: [ 'svg-non-empty-title', 'aria-label', 'aria-labelledby', {
        options: {
          attribute: 'title'
        },
        id: 'non-empty-title'
      } ],
      none: []
    }, {
      id: 'tabindex',
      impact: 'serious',
      selector: '[tabindex]',
      tags: [ 'cat.keyboard', 'best-practice' ],
      all: [],
      any: [ 'tabindex' ],
      none: []
    }, {
      id: 'table-duplicate-name',
      impact: 'minor',
      selector: 'table',
      tags: [ 'cat.tables', 'best-practice', 'RGAAv4', 'RGAA-5.2.1' ],
      all: [],
      any: [],
      none: [ 'same-caption-summary' ]
    }, {
      id: 'table-fake-caption',
      impact: 'serious',
      selector: 'table',
      matches: 'data-table-matches',
      tags: [ 'cat.tables', 'experimental', 'wcag2a', 'wcag131', 'section508', 'section508.22.g', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-5.4.1' ],
      all: [ 'caption-faked' ],
      any: [],
      none: []
    }, {
      id: 'target-size',
      impact: 'serious',
      selector: '*',
      enabled: false,
      matches: 'widget-not-inline-matches',
      tags: [ 'cat.sensory-and-visual-cues', 'wcag22aa', 'wcag258' ],
      all: [],
      any: [ {
        options: {
          minSize: 24
        },
        id: 'target-size'
      }, {
        options: {
          minOffset: 24
        },
        id: 'target-offset'
      } ],
      none: []
    }, {
      id: 'td-has-header',
      impact: 'critical',
      selector: 'table',
      matches: 'data-table-large-matches',
      tags: [ 'cat.tables', 'experimental', 'wcag2a', 'wcag131', 'section508', 'section508.22.g', 'TTv5', 'TT14.b', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-5.7.4' ],
      all: [ 'td-has-header' ],
      any: [],
      none: []
    }, {
      id: 'td-headers-attr',
      impact: 'serious',
      selector: 'table',
      matches: 'table-or-grid-role-matches',
      tags: [ 'cat.tables', 'wcag2a', 'wcag131', 'section508', 'section508.22.g', 'TTv5', 'TT14.b', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-5.7.4' ],
      actIds: [ 'a25f45' ],
      all: [ 'td-headers-attr' ],
      any: [],
      none: []
    }, {
      id: 'th-has-data-cells',
      impact: 'serious',
      selector: 'table',
      matches: 'data-table-matches',
      tags: [ 'cat.tables', 'wcag2a', 'wcag131', 'section508', 'section508.22.g', 'TTv5', 'TT14.b', 'EN-301-549', 'EN-9.1.3.1', 'RGAAv4', 'RGAA-5.7.1' ],
      actIds: [ 'd0f69e' ],
      all: [ 'th-has-data-cells' ],
      any: [],
      none: []
    }, {
      id: 'valid-lang',
      impact: 'serious',
      selector: '[lang]:not(html), [xml\\:lang]:not(html)',
      tags: [ 'cat.language', 'wcag2aa', 'wcag312', 'TTv5', 'TT11.b', 'EN-301-549', 'EN-9.3.1.2', 'ACT', 'RGAAv4', 'RGAA-8.8.1' ],
      actIds: [ 'de46e4' ],
      all: [],
      any: [],
      none: [ {
        options: {
          attributes: [ 'lang', 'xml:lang' ]
        },
        id: 'valid-lang'
      } ]
    }, {
      id: 'video-caption',
      impact: 'critical',
      selector: 'video',
      tags: [ 'cat.text-alternatives', 'wcag2a', 'wcag122', 'section508', 'section508.22.a', 'TTv5', 'TT17.a', 'EN-301-549', 'EN-9.1.2.2', 'RGAAv4', 'RGAA-4.3.1' ],
      actIds: [ 'eac66b' ],
      all: [],
      any: [],
      none: [ 'caption' ]
    } ],
    checks: [ {
      id: 'abstractrole',
      evaluate: 'abstractrole-evaluate'
    }, {
      id: 'aria-allowed-attr-elm',
      evaluate: 'aria-allowed-attr-elm-evaluate'
    }, {
      id: 'aria-allowed-attr',
      evaluate: 'aria-allowed-attr-evaluate',
      options: {
        validTreeRowAttrs: [ 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-level' ]
      }
    }, {
      id: 'aria-allowed-role',
      evaluate: 'aria-allowed-role-evaluate',
      options: {
        allowImplicit: true,
        ignoredTags: []
      }
    }, {
      id: 'aria-busy',
      evaluate: 'aria-busy-evaluate',
      deprecated: true
    }, {
      id: 'aria-conditional-attr',
      evaluate: 'aria-conditional-attr-evaluate',
      options: {
        invalidTableRowAttrs: [ 'aria-posinset', 'aria-setsize', 'aria-expanded', 'aria-level' ]
      }
    }, {
      id: 'aria-errormessage',
      evaluate: 'aria-errormessage-evaluate'
    }, {
      id: 'aria-hidden-body',
      evaluate: 'aria-hidden-body-evaluate'
    }, {
      id: 'aria-level',
      evaluate: 'aria-level-evaluate'
    }, {
      id: 'aria-prohibited-attr',
      evaluate: 'aria-prohibited-attr-evaluate',
      options: {
        elementsAllowedAriaLabel: [ 'applet', 'input' ]
      }
    }, {
      id: 'aria-required-attr',
      evaluate: 'aria-required-attr-evaluate'
    }, {
      id: 'aria-required-children',
      evaluate: 'aria-required-children-evaluate',
      options: {
        reviewEmpty: [ 'doc-bibliography', 'doc-endnotes', 'grid', 'list', 'listbox', 'menu', 'menubar', 'table', 'tablist', 'tree', 'treegrid', 'rowgroup' ]
      }
    }, {
      id: 'aria-required-parent',
      evaluate: 'aria-required-parent-evaluate',
      options: {
        ownGroupRoles: [ 'listitem', 'treeitem' ]
      }
    }, {
      id: 'aria-roledescription',
      evaluate: 'aria-roledescription-evaluate',
      options: {
        supportedRoles: [ 'button', 'img', 'checkbox', 'radio', 'combobox', 'menuitemcheckbox', 'menuitemradio' ]
      }
    }, {
      id: 'aria-unsupported-attr',
      evaluate: 'aria-unsupported-attr-evaluate'
    }, {
      id: 'aria-valid-attr-value',
      evaluate: 'aria-valid-attr-value-evaluate',
      options: []
    }, {
      id: 'aria-valid-attr',
      evaluate: 'aria-valid-attr-evaluate',
      options: []
    }, {
      id: 'braille-label-equivalent',
      evaluate: 'braille-label-equivalent-evaluate'
    }, {
      id: 'braille-roledescription-equivalent',
      evaluate: 'braille-roledescription-equivalent-evaluate'
    }, {
      id: 'deprecatedrole',
      evaluate: 'deprecatedrole-evaluate'
    }, {
      id: 'fallbackrole',
      evaluate: 'fallbackrole-evaluate'
    }, {
      id: 'has-global-aria-attribute',
      evaluate: 'has-global-aria-attribute-evaluate'
    }, {
      id: 'has-widget-role',
      evaluate: 'has-widget-role-evaluate',
      options: []
    }, {
      id: 'invalidrole',
      evaluate: 'invalidrole-evaluate'
    }, {
      id: 'is-element-focusable',
      evaluate: 'is-element-focusable-evaluate'
    }, {
      id: 'no-implicit-explicit-label',
      evaluate: 'no-implicit-explicit-label-evaluate'
    }, {
      id: 'unsupportedrole',
      evaluate: 'unsupportedrole-evaluate'
    }, {
      id: 'valid-scrollable-semantics',
      evaluate: 'valid-scrollable-semantics-evaluate',
      options: {
        roles: [ 'tooltip' ]
      }
    }, {
      id: 'color-contrast-enhanced',
      evaluate: 'color-contrast-evaluate',
      options: {
        ignoreUnicode: true,
        ignoreLength: false,
        ignorePseudo: false,
        boldValue: 700,
        boldTextPt: 14,
        largeTextPt: 18,
        contrastRatio: {
          normal: {
            expected: 7,
            minThreshold: 4.5
          },
          large: {
            expected: 4.5,
            minThreshold: 3
          }
        },
        pseudoSizeThreshold: .25,
        shadowOutlineEmMax: .1,
        textStrokeEmMin: .03
      }
    }, {
      id: 'color-contrast',
      evaluate: 'color-contrast-evaluate',
      options: {
        ignoreUnicode: true,
        ignoreLength: false,
        ignorePseudo: false,
        boldValue: 700,
        boldTextPt: 14,
        largeTextPt: 18,
        contrastRatio: {
          normal: {
            expected: 4.5
          },
          large: {
            expected: 3
          }
        },
        pseudoSizeThreshold: .25,
        shadowOutlineEmMax: .2,
        textStrokeEmMin: .03
      }
    }, {
      id: 'link-in-text-block-style',
      evaluate: 'link-in-text-block-style-evaluate'
    }, {
      id: 'link-in-text-block',
      evaluate: 'link-in-text-block-evaluate',
      options: {
        requiredContrastRatio: 3,
        allowSameColor: true
      }
    }, {
      id: 'autocomplete-appropriate',
      evaluate: 'autocomplete-appropriate-evaluate',
      deprecated: true
    }, {
      id: 'autocomplete-valid',
      evaluate: 'autocomplete-valid-evaluate',
      options: {
        stateTerms: [ 'none', 'false', 'true', 'disabled', 'enabled', 'undefined', 'null', 'xoff', 'xon' ],
        ignoredValues: [ 'text', 'pronouns', 'gender', 'message', 'content' ]
      }
    }, {
      id: 'accesskeys',
      evaluate: 'accesskeys-evaluate',
      after: 'accesskeys-after'
    }, {
      id: 'focusable-content',
      evaluate: 'focusable-content-evaluate'
    }, {
      id: 'focusable-disabled',
      evaluate: 'focusable-disabled-evaluate'
    }, {
      id: 'focusable-element',
      evaluate: 'focusable-element-evaluate'
    }, {
      id: 'focusable-modal-open',
      evaluate: 'focusable-modal-open-evaluate'
    }, {
      id: 'focusable-no-name',
      evaluate: 'focusable-no-name-evaluate'
    }, {
      id: 'focusable-not-tabbable',
      evaluate: 'focusable-not-tabbable-evaluate'
    }, {
      id: 'frame-focusable-content',
      evaluate: 'frame-focusable-content-evaluate'
    }, {
      id: 'landmark-is-top-level',
      evaluate: 'landmark-is-top-level-evaluate'
    }, {
      id: 'no-focusable-content',
      evaluate: 'no-focusable-content-evaluate'
    }, {
      id: 'page-has-heading-one',
      evaluate: 'has-descendant-evaluate',
      after: 'has-descendant-after',
      options: {
        selector: 'h1:not([role], [aria-level]), :is(h1, h2, h3, h4, h5, h6):not([role])[aria-level=1], [role=heading][aria-level=1]',
        passForModal: true
      }
    }, {
      id: 'page-has-main',
      evaluate: 'has-descendant-evaluate',
      after: 'has-descendant-after',
      options: {
        selector: 'main:not([role]), [role=\'main\']',
        passForModal: true
      }
    }, {
      id: 'page-no-duplicate-banner',
      evaluate: 'page-no-duplicate-evaluate',
      after: 'page-no-duplicate-after',
      options: {
        selector: 'header:not([role]), [role=banner]',
        role: 'banner'
      }
    }, {
      id: 'page-no-duplicate-contentinfo',
      evaluate: 'page-no-duplicate-evaluate',
      after: 'page-no-duplicate-after',
      options: {
        selector: 'footer:not([role]), [role=contentinfo]',
        role: 'contentinfo'
      }
    }, {
      id: 'page-no-duplicate-main',
      evaluate: 'page-no-duplicate-evaluate',
      after: 'page-no-duplicate-after',
      options: {
        selector: 'main:not([role]), [role=\'main\']'
      }
    }, {
      id: 'tabindex',
      evaluate: 'tabindex-evaluate'
    }, {
      id: 'alt-space-value',
      evaluate: 'alt-space-value-evaluate'
    }, {
      id: 'duplicate-img-label',
      evaluate: 'duplicate-img-label-evaluate',
      options: {
        parentSelector: 'button, [role=button], a[href], p, li, td, th'
      }
    }, {
      id: 'explicit-label',
      evaluate: 'explicit-evaluate'
    }, {
      id: 'help-same-as-label',
      evaluate: 'help-same-as-label-evaluate'
    }, {
      id: 'hidden-explicit-label',
      evaluate: 'hidden-explicit-label-evaluate'
    }, {
      id: 'implicit-label',
      evaluate: 'implicit-evaluate'
    }, {
      id: 'label-content-name-mismatch',
      evaluate: 'label-content-name-mismatch-evaluate',
      options: {
        pixelThreshold: .1,
        occurrenceThreshold: 3
      }
    }, {
      id: 'multiple-label',
      evaluate: 'multiple-label-evaluate'
    }, {
      id: 'title-only',
      evaluate: 'title-only-evaluate'
    }, {
      id: 'landmark-is-unique',
      evaluate: 'landmark-is-unique-evaluate',
      after: 'landmark-is-unique-after'
    }, {
      id: 'has-lang',
      evaluate: 'has-lang-evaluate',
      options: {
        attributes: [ 'lang', 'xml:lang' ]
      }
    }, {
      id: 'valid-lang',
      evaluate: 'valid-lang-evaluate',
      options: {
        attributes: [ 'lang', 'xml:lang' ]
      }
    }, {
      id: 'xml-lang-mismatch',
      evaluate: 'xml-lang-mismatch-evaluate'
    }, {
      id: 'dlitem',
      evaluate: 'dlitem-evaluate'
    }, {
      id: 'listitem',
      evaluate: 'listitem-evaluate'
    }, {
      id: 'only-dlitems',
      evaluate: 'invalid-children-evaluate',
      options: {
        validRoles: [ 'definition', 'term', 'listitem' ],
        validNodeNames: [ 'dt', 'dd' ],
        divGroups: true
      }
    }, {
      id: 'only-listitems',
      evaluate: 'invalid-children-evaluate',
      options: {
        validRoles: [ 'listitem' ],
        validNodeNames: [ 'li' ]
      }
    }, {
      id: 'structured-dlitems',
      evaluate: 'structured-dlitems-evaluate'
    }, {
      id: 'caption',
      evaluate: 'caption-evaluate'
    }, {
      id: 'frame-tested',
      evaluate: 'frame-tested-evaluate',
      after: 'frame-tested-after',
      options: {
        isViolation: false
      }
    }, {
      id: 'no-autoplay-audio',
      evaluate: 'no-autoplay-audio-evaluate',
      options: {
        allowedDuration: 3
      }
    }, {
      id: 'css-orientation-lock',
      evaluate: 'css-orientation-lock-evaluate',
      options: {
        degreeThreshold: 2
      }
    }, {
      id: 'meta-viewport-large',
      evaluate: 'meta-viewport-scale-evaluate',
      options: {
        scaleMinimum: 5,
        lowerBound: 2
      }
    }, {
      id: 'meta-viewport',
      evaluate: 'meta-viewport-scale-evaluate',
      options: {
        scaleMinimum: 2
      }
    }, {
      id: 'target-offset',
      evaluate: 'target-offset-evaluate',
      options: {
        minOffset: 24
      }
    }, {
      id: 'target-size',
      evaluate: 'target-size-evaluate',
      options: {
        minSize: 24
      }
    }, {
      id: 'header-present',
      evaluate: 'has-descendant-evaluate',
      after: 'has-descendant-after',
      options: {
        selector: ':is(h1, h2, h3, h4, h5, h6):not([role]), [role=heading]'
      }
    }, {
      id: 'heading-order',
      evaluate: 'heading-order-evaluate',
      after: 'heading-order-after'
    }, {
      id: 'identical-links-same-purpose',
      evaluate: 'identical-links-same-purpose-evaluate',
      after: 'identical-links-same-purpose-after'
    }, {
      id: 'internal-link-present',
      evaluate: 'internal-link-present-evaluate'
    }, {
      id: 'landmark',
      evaluate: 'has-descendant-evaluate',
      options: {
        selector: 'main, [role=main]'
      }
    }, {
      id: 'meta-refresh-no-exceptions',
      evaluate: 'meta-refresh-evaluate',
      options: {
        minDelay: 72e3,
        maxDelay: false
      }
    }, {
      id: 'meta-refresh',
      evaluate: 'meta-refresh-evaluate',
      options: {
        minDelay: 0,
        maxDelay: 72e3
      }
    }, {
      id: 'p-as-heading',
      evaluate: 'p-as-heading-evaluate',
      options: {
        margins: [ {
          weight: 150,
          italic: true
        }, {
          weight: 150,
          size: 1.15
        }, {
          italic: true,
          size: 1.15
        }, {
          size: 1.4
        } ],
        passLength: 1,
        failLength: .5
      }
    }, {
      id: 'region',
      evaluate: 'region-evaluate',
      after: 'region-after',
      options: {
        regionMatcher: 'dialog, [role=dialog], [role=alertdialog], svg'
      }
    }, {
      id: 'skip-link',
      evaluate: 'skip-link-evaluate'
    }, {
      id: 'unique-frame-title',
      evaluate: 'unique-frame-title-evaluate',
      after: 'unique-frame-title-after'
    }, {
      id: 'duplicate-id-active',
      evaluate: 'duplicate-id-evaluate',
      after: 'duplicate-id-after'
    }, {
      id: 'duplicate-id-aria',
      evaluate: 'duplicate-id-evaluate',
      after: 'duplicate-id-after'
    }, {
      id: 'duplicate-id',
      evaluate: 'duplicate-id-evaluate',
      after: 'duplicate-id-after'
    }, {
      id: 'aria-label',
      evaluate: 'aria-label-evaluate'
    }, {
      id: 'aria-labelledby',
      evaluate: 'aria-labelledby-evaluate'
    }, {
      id: 'avoid-inline-spacing',
      evaluate: 'avoid-inline-spacing-evaluate',
      options: {
        cssProperties: [ 'line-height', 'letter-spacing', 'word-spacing' ]
      }
    }, {
      id: 'button-has-visible-text',
      evaluate: 'has-text-content-evaluate'
    }, {
      id: 'doc-has-title',
      evaluate: 'doc-has-title-evaluate'
    }, {
      id: 'error-occurred',
      evaluate: 'exists-evaluate'
    }, {
      id: 'exists',
      evaluate: 'exists-evaluate'
    }, {
      id: 'has-alt',
      evaluate: 'has-alt-evaluate'
    }, {
      id: 'has-visible-text',
      evaluate: 'has-text-content-evaluate'
    }, {
      id: 'important-letter-spacing',
      evaluate: 'inline-style-property-evaluate',
      options: {
        cssProperty: 'letter-spacing',
        minValue: .12
      }
    }, {
      id: 'important-line-height',
      evaluate: 'inline-style-property-evaluate',
      options: {
        multiLineOnly: true,
        cssProperty: 'line-height',
        minValue: 1.5,
        normalValue: 1
      }
    }, {
      id: 'important-word-spacing',
      evaluate: 'inline-style-property-evaluate',
      options: {
        cssProperty: 'word-spacing',
        minValue: .16
      }
    }, {
      id: 'is-on-screen',
      evaluate: 'is-on-screen-evaluate'
    }, {
      id: 'non-empty-alt',
      evaluate: 'attr-non-space-content-evaluate',
      options: {
        attribute: 'alt'
      }
    }, {
      id: 'non-empty-if-present',
      evaluate: 'non-empty-if-present-evaluate'
    }, {
      id: 'non-empty-placeholder',
      evaluate: 'attr-non-space-content-evaluate',
      options: {
        attribute: 'placeholder'
      }
    }, {
      id: 'non-empty-title',
      evaluate: 'attr-non-space-content-evaluate',
      options: {
        attribute: 'title'
      }
    }, {
      id: 'non-empty-value',
      evaluate: 'attr-non-space-content-evaluate',
      options: {
        attribute: 'value'
      }
    }, {
      id: 'presentational-role',
      evaluate: 'presentational-role-evaluate'
    }, {
      id: 'role-none',
      evaluate: 'matches-definition-evaluate',
      deprecated: true,
      options: {
        matcher: {
          attributes: {
            role: 'none'
          }
        }
      }
    }, {
      id: 'role-presentation',
      evaluate: 'matches-definition-evaluate',
      deprecated: true,
      options: {
        matcher: {
          attributes: {
            role: 'presentation'
          }
        }
      }
    }, {
      id: 'svg-non-empty-title',
      evaluate: 'svg-non-empty-title-evaluate'
    }, {
      id: 'caption-faked',
      evaluate: 'caption-faked-evaluate'
    }, {
      id: 'html5-scope',
      evaluate: 'html5-scope-evaluate'
    }, {
      id: 'same-caption-summary',
      evaluate: 'same-caption-summary-evaluate'
    }, {
      id: 'scope-value',
      evaluate: 'scope-value-evaluate',
      options: {
        values: [ 'row', 'col', 'rowgroup', 'colgroup' ]
      }
    }, {
      id: 'td-has-header',
      evaluate: 'td-has-header-evaluate'
    }, {
      id: 'td-headers-attr',
      evaluate: 'td-headers-attr-evaluate'
    }, {
      id: 'th-has-data-cells',
      evaluate: 'th-has-data-cells-evaluate'
    }, {
      id: 'hidden-content',
      evaluate: 'hidden-content-evaluate'
    } ]
  });
window.axe = chunk007.axe;

module.exports = chunk007.axe;
