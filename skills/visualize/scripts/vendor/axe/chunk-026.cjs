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

const chunk021 = require('./chunk-021.cjs');
const chunk022 = require('./chunk-022.cjs');
const chunk023 = require('./chunk-023.cjs');
const chunk024 = require('./chunk-024.cjs');
const chunk025 = require('./chunk-025.cjs');
const chunk007 = require('./chunk-007.cjs');
const chunk010 = require('./chunk-010.cjs');
const chunk011 = require('./chunk-011.cjs');
const chunk018 = require('./chunk-018.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');

const metadataFunctionMap = {
"abstractrole-evaluate": chunk021.abstractroleEvaluate,
"aria-allowed-attr-elm-evaluate": chunk021.ariaAllowedAttrElmEvaluate,
"aria-allowed-attr-evaluate": chunk021.ariaAllowedAttrEvaluate,
"aria-allowed-role-evaluate": chunk021.ariaAllowedRoleEvaluate,
"aria-busy-evaluate": chunk021.ariaBusyEvaluate,
"aria-conditional-attr-evaluate": chunk021.ariaConditionalAttrEvaluate,
"aria-conditional-checkbox-attr-evaluate": chunk021.ariaConditionalCheckboxAttr,
"aria-conditional-row-attr-evaluate": chunk021.ariaConditionalRowAttr,
"aria-errormessage-evaluate": chunk021.ariaErrormessageEvaluate,
"aria-hidden-body-evaluate": chunk021.ariaHiddenBodyEvaluate,
"aria-level-evaluate": chunk021.ariaLevelEvaluate,
"aria-prohibited-attr-evaluate": chunk021.ariaProhibitedAttrEvaluate,
"aria-required-attr-evaluate": chunk021.ariaRequiredAttrEvaluate,
"aria-required-children-evaluate": chunk021.ariaRequiredChildrenEvaluate,
"aria-required-parent-evaluate": chunk021.ariaRequiredParentEvaluate,
"aria-roledescription-evaluate": chunk021.ariaRoledescriptionEvaluate,
"aria-unsupported-attr-evaluate": chunk021.ariaUnsupportedAttrEvaluate,
"aria-valid-attr-evaluate": chunk021.ariaValidAttrEvaluate,
"aria-valid-attr-value-evaluate": chunk021.ariaValidAttrValueEvaluate,
"braille-label-equivalent-evaluate": chunk021.brailleLabelEquivalentEvaluate,
"braille-roledescription-equivalent-evaluate": chunk021.brailleRoleDescriptionEquivalentEvaluate,
"deprecatedrole-evaluate": chunk021.deprecatedroleEvaluate,
"fallbackrole-evaluate": chunk021.fallbackroleEvaluate,
"has-global-aria-attribute-evaluate": chunk021.hasGlobalAriaAttributeEvaluate,
"has-widget-role-evaluate": chunk021.hasWidgetRoleEvaluate,
"invalidrole-evaluate": chunk021.invalidroleEvaluate,
"is-element-focusable-evaluate": chunk021.isElementFocusableEvaluate,
"no-implicit-explicit-label-evaluate": chunk021.noImplicitExplicitLabelEvaluate,
"unsupportedrole-evaluate": chunk022.unsupportedroleEvaluate,
"valid-scrollable-semantics-evaluate": chunk022.validScrollableSemanticsEvaluate,
"color-contrast-evaluate": chunk023.colorContrastEvaluate,
"link-in-text-block-evaluate": chunk023.linkInTextBlockEvaluate,
"link-in-text-block-style-evaluate": chunk023.linkInTextBlockStyleEvaluate,
"autocomplete-appropriate-evaluate": chunk023.autocompleteAppropriateEvaluate,
"autocomplete-valid-evaluate": chunk023.autocompleteValidEvaluate,
"attr-non-space-content-evaluate": chunk023.attrNonSpaceContentEvaluate,
"has-descendant-after": chunk023.pageHasElmAfter,
"has-descendant-evaluate": chunk023.hasDescendant,
"has-text-content-evaluate": chunk023.hasTextContentEvaluate,
"matches-definition-evaluate": chunk023.matchesDefinitionEvaluate,
"page-no-duplicate-after": chunk023.pageNoDuplicateAfter,
"page-no-duplicate-evaluate": chunk023.pageNoDuplicateEvaluate,
"accesskeys-after": chunk023.accesskeysAfter,
"accesskeys-evaluate": chunk023.accesskeysEvaluate,
"focusable-content-evaluate": chunk023.focusableContentEvaluate,
"focusable-disabled-evaluate": chunk023.focusableDisabledEvaluate,
"focusable-element-evaluate": chunk023.focusableElementEvaluate,
"focusable-modal-open-evaluate": chunk023.focusableModalOpenEvaluate,
"focusable-no-name-evaluate": chunk023.focusableNoNameEvaluate,
"focusable-not-tabbable-evaluate": chunk023.focusableNotTabbableEvaluate,
"frame-focusable-content-evaluate": chunk023.frameFocusableContentEvaluate,
"landmark-is-top-level-evaluate": chunk023.landmarkIsTopLevelEvaluate,
"no-focusable-content-evaluate": chunk023.noFocusableContentEvaluate,
"tabindex-evaluate": chunk023.tabindexEvaluate,
"alt-space-value-evaluate": chunk023.altSpaceValueEvaluate,
"duplicate-img-label-evaluate": chunk023.duplicateImgLabelEvaluate,
"explicit-evaluate": chunk023.explicitEvaluate,
"help-same-as-label-evaluate": chunk023.helpSameAsLabelEvaluate,
"hidden-explicit-label-evaluate": chunk023.hiddenExplicitLabelEvaluate,
"implicit-evaluate": chunk023.implicitEvaluate,
"label-content-name-mismatch-evaluate": chunk023.labelContentNameMismatchEvaluate,
"multiple-label-evaluate": chunk023.multipleLabelEvaluate,
"title-only-evaluate": chunk023.titleOnlyEvaluate,
"landmark-is-unique-after": chunk023.landmarkIsUniqueAfter,
"landmark-is-unique-evaluate": chunk023.landmarkIsUniqueEvaluate,
"has-lang-evaluate": chunk023.hasLangEvaluate,
"valid-lang-evaluate": chunk023.validLangEvaluate,
"xml-lang-mismatch-evaluate": chunk023.xmlLangMismatchEvaluate,
"dlitem-evaluate": chunk023.dlitemEvaluate,
"invalid-children-evaluate": chunk023.invalidChildrenEvaluate,
"listitem-evaluate": chunk023.listitemEvaluate,
"only-dlitems-evaluate": chunk023.onlyDlitemsEvaluate,
"only-listitems-evaluate": chunk023.onlyListitemsEvaluate,
"structured-dlitems-evaluate": chunk023.structuredDlitemsEvaluate,
"caption-evaluate": chunk023.captionEvaluate,
"frame-tested-after": chunk023.frameTestedAfter,
"frame-tested-evaluate": chunk023.frameTestedEvaluate,
"no-autoplay-audio-evaluate": chunk024.noAutoplayAudioEvaluate,
"css-orientation-lock-evaluate": chunk024.cssOrientationLockEvaluate,
"meta-viewport-scale-evaluate": chunk024.metaViewportScaleEvaluate,
"target-offset-evaluate": chunk024.targetOffsetEvaluate,
"target-size-evaluate": chunk024.targetSizeEvaluate,
"heading-order-after": chunk024.headingOrderAfter,
"heading-order-evaluate": chunk024.headingOrderEvaluate,
"identical-links-same-purpose-after": chunk024.identicalLinksSamePurposeAfter,
"identical-links-same-purpose-evaluate": chunk024.identicalLinksSamePurposeEvaluate,
"internal-link-present-evaluate": chunk024.internalLinkPresentEvaluate,
"meta-refresh-evaluate": chunk024.metaRefreshEvaluate,
"p-as-heading-evaluate": chunk024.pAsHeadingEvaluate,
"region-after": chunk025.regionAfter,
"region-evaluate": chunk025.regionEvaluate,
"skip-link-evaluate": chunk025.skipLinkEvaluate,
"unique-frame-title-after": chunk025.uniqueFrameTitleAfter,
"unique-frame-title-evaluate": chunk025.uniqueFrameTitleEvaluate,
"duplicate-id-after": chunk025.duplicateIdAfter,
"duplicate-id-evaluate": chunk025.duplicateIdEvaluate,
"aria-label-evaluate": chunk025.ariaLabelEvaluate,
"aria-labelledby-evaluate": chunk025.ariaLabelledbyEvaluate,
"avoid-inline-spacing-evaluate": chunk025.avoidInlineSpacingEvaluate,
"doc-has-title-evaluate": chunk025.docHasTitleEvaluate,
"exists-evaluate": chunk025.existsEvaluate,
"has-alt-evaluate": chunk025.hasAltEvaluate,
"inline-style-property-evaluate": chunk025.inlineStyleProperty,
"is-on-screen-evaluate": chunk025.isOnScreenEvaluate,
"non-empty-if-present-evaluate": chunk025.nonEmptyIfPresentEvaluate,
"presentational-role-evaluate": chunk025.presentationalRoleEvaluate,
"svg-non-empty-title-evaluate": chunk025.svgNonEmptyTitleEvaluate,
"caption-faked-evaluate": chunk025.captionFakedEvaluate,
"html5-scope-evaluate": chunk025.html5ScopeEvaluate,
"same-caption-summary-evaluate": chunk025.sameCaptionSummaryEvaluate,
"scope-value-evaluate": chunk025.scopeValueEvaluate,
"td-has-header-evaluate": chunk025.tdHasHeaderEvaluate,
"td-headers-attr-evaluate": chunk025.tdHeadersAttrEvaluate,
"th-has-data-cells-evaluate": chunk025.thHasDataCellsEvaluate,
"hidden-content-evaluate": chunk025.hiddenContentEvaluate,
"aria-allowed-attr-matches": chunk025.ariaAllowedAttrMatches,
"aria-allowed-role-matches": chunk025.ariaAllowedRoleMatches,
"aria-has-attr-matches": chunk025.ariaHasAttrMatches,
"aria-hidden-focus-matches": chunk025.ariaHiddenFocusMatches,
"aria-required-children-matches": chunk025.ariaRequiredChildrenMatches,
"aria-required-parent-matches": chunk025.ariaRequiredParentMatches,
"autocomplete-matches": chunk025.autocompleteMatches,
"bypass-matches": chunk025.bypassMatches,
"color-contrast-matches": chunk025.colorContrastMatches,
"data-table-large-matches": chunk025.dataTableLargeMatches,
"data-table-matches": chunk025.dataTableMatches$1,
"duplicate-id-active-matches": chunk025.duplicateIdActiveMatches,
"duplicate-id-aria-matches": chunk025.duplicateIdAriaMatches,
"duplicate-id-misc-matches": chunk025.duplicateIdMiscMatches,
"frame-focusable-content-matches": chunk025.frameFocusableContentMatches,
"frame-title-has-text-matches": chunk025.frameTitleHasTextMatches,
"has-implicit-chromium-role-matches": chunk025.hasImplicitChromiumRoleMatches,
"heading-matches": chunk025.headingMatches,
"html-namespace-matches": chunk025.htmlNamespaceMatches,
"identical-links-same-purpose-matches": chunk025.identicalLinksSamePurposeMatches,
"inserted-into-focus-order-matches": chunk025.insertedIntoFocusOrderMatches,
"is-initiator-matches": chunk025.isInitiatorMatches,
"is-visible-matches": chunk025.hasVisibleTextMatches,
"is-visible-on-screen-matches": chunk025.isVisibleOnScreenMatches,
"label-content-name-mismatch-matches": chunk025.labelContentNameMismatchMatches,
"label-matches": chunk025.labelMatches,
"landmark-has-body-context-matches": chunk025.landmarkHasBodyContextMatches,
"landmark-unique-matches": chunk025.landmarkUniqueMatches,
"layout-table-matches": chunk025.dataTableMatches,
"link-in-text-block-matches": chunk025.linkInTextBlockMatches,
"nested-interactive-matches": chunk025.nestedInteractiveMatches,
"no-autoplay-audio-matches": chunk025.noAutoplayAudioMatches,
"no-empty-role-matches": chunk025.noEmptyRoleMatches,
"no-explicit-name-required-matches": chunk025.noExplicitNameRequired,
"no-naming-method-matches": chunk025.noNamingMethodMatches,
"no-negative-tabindex-matches": chunk025.noNegativeTabindexMatches,
"no-role-matches": chunk025.noRoleMatches,
"not-html-matches": chunk025.notHtmlMatches,
"object-is-loaded-matches": chunk025.objectIsLoadedMatches,
"p-as-heading-matches": chunk025.pAsHeadingMatches,
"presentation-role-conflict-matches": chunk025.presentationRoleConflictMatches,
"scrollable-region-focusable-matches": chunk025.scrollableRegionFocusableMatches,
"skip-link-matches": chunk025.skipLinkMatches,
"summary-interactive-matches": chunk025.summaryIsInteractiveMatches,
"svg-namespace-matches": chunk025.svgNamespaceMatches,
"table-or-grid-role-matches": chunk025.tableOrGridRoleMatches,
"widget-not-inline-matches": chunk025.widgetNotInline,
"window-is-top-matches": chunk025.windowIsTopMatches,
"xml-lang-mismatch-matches": chunk025.xmlLangMismatchMatches
};

function createExecutionContext(spec) {
  /*eslint no-eval:0 */
  if (typeof spec === 'string') {
    if (metadataFunctionMap[spec]) {
      return metadataFunctionMap[spec];
    }

    // execution contexts can only be functions
    if (/^\s*function[\s\w]*\(/.test(spec)) {
      return new Function('return ' + spec + ';')();
    }

    throw new ReferenceError(
      `Function ID does not exist in the metadata-function-map: ${spec}`
    );
  }
  return spec;
}

/**
 * Normalize check options to always be an object.
 * @param {Object} options
 * @return Object
 */
function normalizeOptions(options = {}) {
  if (Array.isArray(options) || typeof options !== 'object') {
    options = { value: options };
  }

  return options;
}

function Check(spec) {
  if (spec) {
    this.id = spec.id;
    this.configure(spec);
  }
}

/**
 * Unique ID for the check.  Checks may be re-used, so there may be additional instances of checks
 * with the same ID.
 * @type {String}
 */
// Check.prototype.id;

/**
 * Free-form options that are passed as the second parameter to the `evaluate`
 * @type {Mixed}
 */
// Check.prototype.options;

/**
 * The actual code, accepts 2 parameters: node (the node under test), options (see this.options).
 * This function is run in the context of a checkHelper, which has the following methods
 * - `async()` - if called, the check is considered to be asynchronous; returns a callback function
 * - `data()` - free-form data object, associated to the `CheckResult` which is specific to each node
 * @type {Function}
 */
// Check.prototype.evaluate;

/**
 * Optional. Filter and/or modify checks for all nodes
 * @type {Function}
 */
// Check.prototype.after;

/**
 * enabled by default, if false, this check will not be included in the rule's evaluation
 * @type {Boolean}
 */
Check.prototype.enabled = true;

/**
 * Run the check's evaluate function (call `this.evaluate(node, options)`)
 * @param  {HTMLElement} node  The node to test
 * @param  {Object} options    The options that override the defaults and provide additional
 *                             information for the check
 * @param  {Function} callback Function to fire when check is complete
 */
Check.prototype.run = function run(node, options, context, resolve, reject) {
  options = options || {};
  const enabled = options.hasOwnProperty('enabled')
    ? options.enabled
    : this.enabled;
  const checkOptions = this.getOptions(options.options);

  if (enabled) {
    const checkResult = new chunk025.CheckResult(this);
    const helper = chunk010.checkHelper(checkResult, options, resolve, reject);
    let result;

    try {
      result = this.evaluate.call(
        helper,
        node.actualNode,
        checkOptions,
        node,
        context
      );
    } catch (e) {
      // In the "Audit#run: should run all the rules" test, there is no `node` here. I do
      // not know if this is intentional or not, so to be safe, we guard against the
      // possible reference error.
      if (node && node.actualNode) {
        // Save a reference to the node we errored on for futher debugging.
        e.errorNode = chunk011.nodeSerializer.toSpec(node);
      }
      reject(e);
      return;
    }

    if (!helper.isAsync) {
      checkResult.result = result;
      resolve(checkResult);
    }
  } else {
    resolve(null);
  }
};

/**
 * Run the check's evaluate function (call `this.evaluate(node, options)`) synchronously
 * @param  {HTMLElement} node  The node to test
 * @param  {Object} options    The options that override the defaults and provide additional
 *                             information for the check
 */
Check.prototype.runSync = function runSync(node, options, context) {
  options = options || {};
  const { enabled = this.enabled } = options;

  if (!enabled) {
    return null;
  }

  const checkOptions = this.getOptions(options.options);
  const checkResult = new chunk025.CheckResult(this);
  const helper = chunk010.checkHelper(checkResult);

  // throw error if a check is run that requires async behavior
  helper.async = function async() {
    throw new Error('Cannot run async check while in a synchronous run');
  };

  let result;

  try {
    result = this.evaluate.call(
      helper,
      node.actualNode,
      checkOptions,
      node,
      context
    );
  } catch (e) {
    // In the "Audit#run: should run all the rules" test, there is no `node` here. I do
    // not know if this is intentional or not, so to be safe, we guard against the
    // possible reference error.
    if (node && node.actualNode) {
      // Save a reference to the node we errored on for futher debugging.
      e.errorNode = chunk011.nodeSerializer.toSpec(node);
    }
    throw e;
  }

  checkResult.result = result;
  return checkResult;
};

/**
 * Override a check's settings after construction to allow for changing options
 * without having to implement the entire check
 *
 * @param {Object} spec - the specification of the attributes to be changed
 */

Check.prototype.configure = function configure(spec) {
  // allow test specs (without evaluate functions) to work as
  // internal checks
  if (!spec.evaluate || metadataFunctionMap[spec.evaluate]) {
    this._internalCheck = true;
  }

  if (spec.hasOwnProperty('enabled')) {
    this.enabled = spec.enabled;
  }

  if (spec.hasOwnProperty('options')) {
    // only normalize options for internal checks
    if (this._internalCheck) {
      this.options = normalizeOptions(spec.options);
    } else {
      this.options = spec.options;
    }
  }

  ['evaluate', 'after']
    .filter(prop => spec.hasOwnProperty(prop))
    .forEach(prop => (this[prop] = createExecutionContext(spec[prop])));
};

Check.prototype.getOptions = function getOptions(options) {
  // only merge and normalize options for internal checks
  if (this._internalCheck) {
    return chunk011.deepMerge(this.options, normalizeOptions(options || {}));
  } else {
    return options || this.options;
  }
};

/**
 * Constructor for the result of Rules
 * @param {Rule} rule
 */
function RuleResult(rule) {
  /**
   * The ID of the Rule whom this result belongs to
   * @type {String}
   */
  this.id = rule.id;

  /**
   * The calculated result of the Rule, either PASS, FAIL or NA
   * @type {String}
   */
  this.result = chunk007.constants.NA;

  /**
   * Whether the Rule is a "pageLevel" rule
   * @type {Boolean}
   */
  this.pageLevel = rule.pageLevel;

  /**
   * Impact of the violation
   * @type {String}  Plain-english impact or null if rule passes
   */
  this.impact = null;

  /**
   * Holds information regarding nodes and individual CheckResults
   * @type {Array}
   */
  this.nodes = [];
}

function Rule(spec, parentAudit) {
  this._audit = parentAudit;

  /**
   * The code, or string ID of the rule
   * @type {String}
   */
  this.id = spec.id;

  /**
   * Selector that this rule applies to
   * @type {String}
   */
  this.selector = spec.selector || '*';

  /**
   * Impact of the rule (optional)
   * @type {"minor" | "moderate" | "serious" | "critical"}
   */
  if (spec.impact) {
    chunk007.assert(
      chunk007.constants.impact.includes(spec.impact),
      `Impact ${spec.impact} is not a valid impact`
    );
    this.impact = spec.impact;
  }

  /**
   * Whether to exclude hiddden elements form analysis.  Defaults to true.
   * @type {Boolean}
   */
  this.excludeHidden =
    typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;

  /**
   * Flag to enable or disable rule
   * @type {Boolean}
   */
  this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;

  /**
   * Denotes if the rule should be run if Context is not an entire page AND whether
   * the Rule should be satisified regardless of Node
   * @type {Boolean}
   */
  this.pageLevel = typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;

  /**
   * Flag to force the rule to return as needs review rather than a violation if any of the checks fail.
   * @type {Boolean}
   */
  this.reviewOnFail =
    typeof spec.reviewOnFail === 'boolean' ? spec.reviewOnFail : false;

  /**
   * Checks that any may return true to satisfy rule
   * @type {Array}
   */
  this.any = spec.any || [];

  /**
   * Checks that must all return true to satisfy rule
   * @type {Array}
   */
  this.all = spec.all || [];

  /**
   * Checks that none may return true to satisfy rule
   * @type {Array}
   */
  this.none = spec.none || [];

  /**
   * Tags associated to this rule
   * @type {Array}
   */
  this.tags = spec.tags || [];

  /**
   * Preload necessary for this rule
   */
  this.preload = spec.preload ? true : false;

  /**
   * IDs of ACT rules the axe-core rule maps to
   * @type {Array|undefined}
   */
  this.actIds = spec.actIds;

  if (spec.matches) {
    /**
     * Optional function to test if rule should be run against a node, overrides Rule#matches
     * @type {Function}
     */
    this.matches = createExecutionContext(spec.matches);
  }
}

/**
 * Optionally test each node against a `matches` function to determine if the rule should run against
 * a given node.  Defaults to `true`.
 * @return {Boolean}    Whether the rule should run
 */
Rule.prototype.matches = function matches() {
  return true;
};

/**
 * Selects `HTMLElement`s based on configured selector
 * @param  {Context} context The resolved Context object
 * @param  {Mixed}   options Options specific to this rule
 * @return {Array}           All matching `HTMLElement`s
 */
Rule.prototype.gather = function gather(context, options = {}) {
  const markStart = 'mark_gather_start_' + this.id;
  const markEnd = 'mark_gather_end_' + this.id;
  const markHiddenStart = 'mark_isVisibleToScreenReaders_start_' + this.id;
  const markHiddenEnd = 'mark_isVisibleToScreenReaders_end_' + this.id;

  if (options.performanceTimer) {
    chunk013.performanceTimer.mark(markStart);
  }

  let elements = chunk014.select(this.selector, context);
  if (this.excludeHidden) {
    if (options.performanceTimer) {
      chunk013.performanceTimer.mark(markHiddenStart);
    }

    elements = elements.filter(element => {
      return chunk018.isVisibleToScreenReaders(element);
    });

    if (options.performanceTimer) {
      chunk013.performanceTimer.mark(markHiddenEnd);
      chunk013.performanceTimer.measure(
        'rule_' + this.id + '#gather_axe.utils.isVisibleToScreenReaders',
        markHiddenStart,
        markHiddenEnd
      );
    }
  }

  if (options.performanceTimer) {
    chunk013.performanceTimer.mark(markEnd);
    chunk013.performanceTimer.measure('rule_' + this.id + '#gather', markStart, markEnd);
  }

  return elements;
};

Rule.prototype.runChecks = function runChecks(
  type,
  node,
  options,
  context,
  resolve,
  reject
) {
  const self = this;

  const checkQueue = chunk011.queue();

  this[type].forEach(c => {
    const check = self._audit.checks[c.id || c];
    const option = chunk012.getCheckOption(check, self.id, options);
    checkQueue.defer((res, rej) => {
      check.run(node, option, context, res, error => {
        rej(
          new chunk014.RuleError({
            ruleId: self.id,
            method: `${check.id}#evaluate`,
            errorNode: new chunk010.DqElement(node),
            error
          })
        );
      });
    });
  });

  checkQueue
    .then(results => {
      results = results.filter(check => check);
      resolve({ type: type, results: results });
    })
    .catch(reject);
};

/**
 * Run a check for a rule synchronously.
 */
Rule.prototype.runChecksSync = function runChecksSync(
  type,
  node,
  options,
  context
) {
  const self = this;
  let results = [];

  this[type].forEach(c => {
    const check = self._audit.checks[c.id || c];
    const option = chunk012.getCheckOption(check, self.id, options);
    results.push(check.runSync(node, option, context));
  });

  results = results.filter(check => check);

  return { type: type, results: results };
};

/**
 * Runs the Rule's `evaluate` function
 * @param  {Context}   context  The resolved Context object
 * @param  {Mixed}   options  Options specific to this rule
 * @param  {Function} callback Function to call when evaluate is complete; receives a RuleResult instance
 */
Rule.prototype.run = function run(context, options = {}, resolve, reject) {
  if (options.performanceTimer) {
    this._trackPerformance();
  }

  const q = chunk011.queue();
  const ruleResult = new RuleResult(this);
  let nodes;

  try {
    // Matches throws an error when it lacks support for document methods
    nodes = this.gatherAndMatchNodes(context, options);
  } catch (error) {
    reject(error);
    return;
  }

  if (options.performanceTimer) {
    this._logGatherPerformance(nodes);
  }

  nodes.forEach(node => {
    q.defer((resolveNode, rejectNode) => {
      const checkQueue = chunk011.queue();

      ['any', 'all', 'none'].forEach(type => {
        checkQueue.defer((res, rej) => {
          this.runChecks(type, node, options, context, res, rej);
        });
      });

      checkQueue
        .then(results => {
          const result = getResult(results);
          if (result) {
            result.node = new chunk010.DqElement(node);
            ruleResult.nodes.push(result);

            // mark rule as incomplete rather than failure for rules with reviewOnFail
            if (this.reviewOnFail) {
              ['any', 'all'].forEach(type => {
                result[type].forEach(checkResult => {
                  if (checkResult.result === false) {
                    checkResult.result = undefined;
                  }
                });
              });

              result.none.forEach(checkResult => {
                if (checkResult.result === true) {
                  checkResult.result = undefined;
                }
              });
            }
          }
          resolveNode();
        })
        .catch(err => rejectNode(err));
    });
  });

  q.then(() => {
    if (options.performanceTimer) {
      this._logRulePerformance();
    }
    // Defer the rule's execution to prevent "unresponsive script" warnings.
    // See https://github.com/dequelabs/axe-core/pull/1172 for discussion and details.
    setTimeout(() => {
      resolve(ruleResult);
    }, 0);
  }).catch(error => {
    if (options.performanceTimer) {
      this._logRulePerformance();
    }
    reject(error);
  });
};

/**
 * Runs the Rule's `evaluate` function synchronously
 * @param  {Context}   context  The resolved Context object
 * @param  {Mixed}   options  Options specific to this rule
 */
Rule.prototype.runSync = function runSync(context, options = {}) {
  if (options.performanceTimer) {
    this._trackPerformance();
  }

  const ruleResult = new RuleResult(this);
  const nodes = this.gatherAndMatchNodes(context, options);
  if (options.performanceTimer) {
    this._logGatherPerformance(nodes);
  }

  nodes.forEach(node => {
    const results = [];
    ['any', 'all', 'none'].forEach(type => {
      results.push(this.runChecksSync(type, node, options, context));
    });

    const result = getResult(results);
    if (result) {
      result.node = node.actualNode ? new chunk010.DqElement(node) : null;
      ruleResult.nodes.push(result);

      // mark rule as incomplete rather than failure for rules with reviewOnFail
      if (this.reviewOnFail) {
        ['any', 'all'].forEach(type => {
          result[type].forEach(checkResult => {
            if (checkResult.result === false) {
              checkResult.result = undefined;
            }
          });
        });

        result.none.forEach(checkResult => {
          if (checkResult.result === true) {
            checkResult.result = undefined;
          }
        });
      }
    }
  });

  if (options.performanceTimer) {
    this._logRulePerformance();
  }

  return ruleResult;
};

/**
 * Add performance tracking properties to the rule
 * @private
 */
Rule.prototype._trackPerformance = function _trackPerformance() {
  this._markStart = 'mark_rule_start_' + this.id;
  this._markEnd = 'mark_rule_end_' + this.id;
  this._markChecksStart = 'mark_runchecks_start_' + this.id;
  this._markChecksEnd = 'mark_runchecks_end_' + this.id;
};

/**
 * Log performance of rule.gather
 * @private
 * @param {Rule} rule The rule to log
 * @param {Array} nodes Result of rule.gather
 */
Rule.prototype._logGatherPerformance = function _logGatherPerformance(nodes) {
  chunk011.log(
    `gather for ${this.id} (${nodes.length} nodes): ${chunk013.performanceTimer.timeElapsed()}ms`
  );
  chunk013.performanceTimer.mark(this._markChecksStart);
};

/**
 * Log performance of the rule
 * @private
 * @param {Rule} rule The rule to log
 */
Rule.prototype._logRulePerformance = function _logRulePerformance() {
  chunk013.performanceTimer.mark(this._markChecksEnd);
  chunk013.performanceTimer.mark(this._markEnd);
  chunk013.performanceTimer.measure(
    'runchecks_' + this.id,
    this._markChecksStart,
    this._markChecksEnd
  );

  chunk013.performanceTimer.measure('rule_' + this.id, this._markStart, this._markEnd);
};

/**
 * Process the results of each check and return the result if a check
 * has a result
 * @private
 * @param {Array} results  Array of each check result
 * @returns {Object|null}
 */
function getResult(results) {
  if (results.length) {
    let hasResults = false;
    const result = {};
    results.forEach(r => {
      const res = r.results.filter(_result => _result);
      result[r.type] = res;
      if (res.length) {
        hasResults = true;
      }
    });

    if (hasResults) {
      return result;
    }

    return null;
  }
}

/**
 * Selects `HTMLElement`s based on configured selector and filters them based on
 * the rules matches function
 * @param  {Rule} rule The rule to check for after checks
 * @param  {Context} context The resolved Context object
 * @param  {Mixed}   options Options specific to this rule
 * @return {Array}           All matching `HTMLElement`s
 */
Rule.prototype.gatherAndMatchNodes = function gatherAndMatchNodes(
  context,
  options
) {
  const markMatchesStart = 'mark_matches_start_' + this.id;
  const markMatchesEnd = 'mark_matches_end_' + this.id;

  let nodes = this.gather(context, options);

  if (options.performanceTimer) {
    chunk013.performanceTimer.mark(markMatchesStart);
  }

  nodes = nodes.filter(node => {
    try {
      return this.matches(node.actualNode, node, context);
    } catch (error) {
      throw new chunk014.RuleError({
        ruleId: this.id,
        method: `#matches`,
        errorNode: new chunk010.DqElement(node),
        error
      });
    }
  });

  if (options.performanceTimer) {
    chunk013.performanceTimer.mark(markMatchesEnd);
    chunk013.performanceTimer.measure(
      'rule_' + this.id + '#matches',
      markMatchesStart,
      markMatchesEnd
    );
  }

  return nodes;
};

/**
 * Iterates the rule's Checks looking for ones that have an after function
 * @private
 * @param  {Rule} rule The rule to check for after checks
 * @return {Array}      Checks that have an after function
 */
function findAfterChecks(rule) {
  return chunk011.getAllChecks(rule)
    .map(c => {
      const check = rule._audit.checks[c.id || c];
      return check && typeof check.after === 'function' ? check : null;
    })
    .filter(Boolean);
}

/**
 * Finds and collates all results for a given Check on a specific Rule
 * @private
 * @param  {Array} nodes RuleResult#nodes; array of 'detail' objects
 * @param  {String} checkID The ID of the Check to find
 * @return {Array}         Matching CheckResults
 */
function findCheckResults(nodes, checkID) {
  const checkResults = [];
  nodes.forEach(nodeResult => {
    const checks = chunk011.getAllChecks(nodeResult);
    checks.forEach(checkResult => {
      if (checkResult.id === checkID) {
        checkResult.node = nodeResult.node;
        checkResults.push(checkResult);
      }
    });
  });
  return checkResults;
}

function filterChecks(checks) {
  return checks.filter(check => {
    return check.filtered !== true;
  });
}

function sanitizeNodes(result) {
  const checkTypes = ['any', 'all', 'none'];

  let nodes = result.nodes.filter(detail => {
    let length = 0;
    checkTypes.forEach(type => {
      detail[type] = filterChecks(detail[type]);
      length += detail[type].length;
    });
    return length > 0;
  });

  if (result.pageLevel && nodes.length) {
    nodes = [
      nodes.reduce((a, b) => {
        if (a) {
          checkTypes.forEach(type => {
            a[type].push.apply(a[type], b[type]);
          });
          return a;
        }
      })
    ];
  }
  return nodes;
}

/**
 * Runs all of the Rule's Check#after methods
 * @param  {RuleResult} result  The "pre-after" RuleResult
 * @param  {Mixed} options Options specific to the rule
 * @return {RuleResult}         The RuleResult as filtered by after functions
 */
Rule.prototype.after = function after(result, options) {
  const afterChecks = findAfterChecks(this);
  afterChecks.forEach(check => {
    const beforeResults = findCheckResults(result.nodes, check.id);
    const checkOption = chunk012.getCheckOption(check, this.id, options);
    let afterResults;
    try {
      afterResults = check.after(beforeResults, checkOption.options);
    } catch (error) {
      throw new chunk014.RuleError({
        ruleId: this.id,
        method: `${check.id}#after`,
        errorNode: result.nodes?.[0]?.node,
        error
      });
    }

    if (this.reviewOnFail) {
      afterResults.forEach(checkResult => {
        const changeAnyAllResults =
          (this.any.includes(checkResult.id) ||
            this.all.includes(checkResult.id)) &&
          checkResult.result === false;
        const changeNoneResult =
          this.none.includes(checkResult.id) && checkResult.result === true;

        if (changeAnyAllResults || changeNoneResult) {
          checkResult.result = undefined;
        }
      });
    }

    beforeResults.forEach(item => {
      // only add the node property for the check.after so we can
      // look at which iframe a check result came from, but we don't
      // want it for the final results object
      delete item.node;
      if (afterResults.indexOf(item) === -1) {
        item.filtered = true;
      }
    });
  });

  result.nodes = sanitizeNodes(result);
  return result;
};

/**
 * Reconfigure a rule after it has been added
 * @param {Object} spec - the attributes to be reconfigured
 */
Rule.prototype.configure = function configure(spec) {
  /*eslint no-eval:0 */

  if (spec.hasOwnProperty('selector')) {
    this.selector = spec.selector;
  }

  if (spec.hasOwnProperty('excludeHidden')) {
    this.excludeHidden =
      typeof spec.excludeHidden === 'boolean' ? spec.excludeHidden : true;
  }

  if (spec.hasOwnProperty('enabled')) {
    this.enabled = typeof spec.enabled === 'boolean' ? spec.enabled : true;
  }

  if (spec.hasOwnProperty('pageLevel')) {
    this.pageLevel =
      typeof spec.pageLevel === 'boolean' ? spec.pageLevel : false;
  }

  if (spec.hasOwnProperty('reviewOnFail')) {
    this.reviewOnFail =
      typeof spec.reviewOnFail === 'boolean' ? spec.reviewOnFail : false;
  }

  if (spec.hasOwnProperty('any')) {
    this.any = spec.any;
  }

  if (spec.hasOwnProperty('all')) {
    this.all = spec.all;
  }

  if (spec.hasOwnProperty('none')) {
    this.none = spec.none;
  }

  if (spec.hasOwnProperty('tags')) {
    this.tags = spec.tags;
  }

  if (spec.hasOwnProperty('actIds')) {
    this.actIds = spec.actIds;
  }

  if (spec.hasOwnProperty('matches')) {
    this.matches = createExecutionContext(spec.matches);
  }

  if (spec.impact) {
    chunk007.assert(
      chunk007.constants.impact.includes(spec.impact),
      `Impact ${spec.impact} is not a valid impact`
    );
    this.impact = spec.impact;
  }
};

exports.Check = Check;
exports.Rule = Rule;
exports.RuleResult = RuleResult;
exports.metadataFunctionMap = metadataFunctionMap;
