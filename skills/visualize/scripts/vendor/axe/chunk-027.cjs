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
const chunk018 = require('./chunk-018.cjs');
const chunk010 = require('./chunk-010.cjs');
const chunk011 = require('./chunk-011.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk013 = require('./chunk-013.cjs');
const chunk014 = require('./chunk-014.cjs');
const chunk026 = require('./chunk-026.cjs');
const chunk000 = require('./chunk-000.cjs');
const chunk025 = require('./chunk-025.cjs');

class SerialVirtualNode extends chunk007.AbstractVirtualNode {
  /**
   * Convert a serialised node into a VirtualNode object
   * @param {Object} node Serialised node
   */
  constructor(serialNode) {
    super();
    this._props = normaliseProps(serialNode);
    this._attrs = normaliseAttrs(serialNode);
  }

  // Accessof for DOM node properties
  get props() {
    return this._props;
  }

  /**
   * Get the value of the given attribute name.
   * @param {String} attrName The name of the attribute.
   * @return {String|null} The value of the attribute or null if the attribute does not exist
   */
  attr(attrName) {
    return this._attrs[attrName] ?? null;
  }

  /**
   * Determine if the element has the given attribute.
   * @param {String} attrName The name of the attribute
   * @return {Boolean} True if the element has the attribute, false otherwise.
   */
  hasAttr(attrName) {
    return this._attrs[attrName] !== undefined;
  }

  /**
   * Return a list of attribute names for the element.
   * @return {String[]}
   */
  get attrNames() {
    return Object.keys(this._attrs);
  }
}

const nodeNamesToTypes = {
  '#cdata-section': 2,
  '#text': 3,
  '#comment': 8,
  '#document': 9,
  '#document-fragment': 11
};
const nodeTypeToName = {};
const nodeNames = Object.keys(nodeNamesToTypes);
nodeNames.forEach(nodeName => {
  nodeTypeToName[nodeNamesToTypes[nodeName]] = nodeName;
});

/**
 * Convert between serialised props and DOM-like properties
 * @param {Object} serialNode
 * @return {Object} normalProperties
 */
function normaliseProps(serialNode) {
  let nodeName = serialNode.nodeName ?? nodeTypeToName[serialNode.nodeType];
  const nodeType =
    serialNode.nodeType ?? nodeNamesToTypes[serialNode.nodeName] ?? 1;

  chunk007.assert(
    typeof nodeType === 'number',
    `nodeType has to be a number, got '${nodeType}'`
  );
  chunk007.assert(
    typeof nodeName === 'string',
    `nodeName has to be a string, got '${nodeName}'`
  );

  nodeName = nodeName.toLowerCase();
  let type = null;
  if (nodeName === 'input') {
    type = (
      serialNode.type ||
      (serialNode.attributes && serialNode.attributes.type) ||
      ''
    ).toLowerCase();

    if (!chunk014.validInputTypes().includes(type)) {
      type = 'text';
    }
  }

  const props = {
    ...serialNode,
    nodeType,
    nodeName
  };
  if (type) {
    props.type = type;
  }

  delete props.attributes;
  return Object.freeze(props);
}

/**
 * Convert between serialised attributes and DOM-like attributes
 * @param {Object} serialNode
 * @return {Object} normalAttributes
 */
function normaliseAttrs({ attributes = {} }) {
  const attrMap = {
    htmlFor: 'for',
    className: 'class'
  };

  return Object.keys(attributes).reduce((attrs, attrName) => {
    const value = attributes[attrName];
    chunk007.assert(
      typeof value !== 'object' || value === null,
      `expects attributes not to be an object, '${attrName}' was`
    );

    if (value !== undefined) {
      const mappedName = attrMap[attrName] || attrName;
      attrs[mappedName] = value !== null ? String(value) : null;
    }
    return attrs;
  }, {});
}

function cleanup(resolve, reject) {
  resolve = resolve || function res() {};
  reject = reject || chunk007.axe.log;

  if (!chunk007.axe._audit) {
    throw new Error('No audit configured');
  }

  const q = chunk007.axe.utils.queue();
  // If a plugin fails it's cleanup, we still want the others to run
  const cleanupErrors = [];

  Object.keys(chunk007.axe.plugins).forEach(key => {
    q.defer(res => {
      const rej = function rej(err) {
        cleanupErrors.push(err);
        res();
      };
      try {
        chunk007.axe.plugins[key].cleanup(res, rej);
      } catch (err) {
        rej(err);
      }
    });
  });

  const flattenedTree = chunk007.axe.utils.getFlattenedTree(document.body);

  chunk007.axe.utils.querySelectorAll(flattenedTree, 'iframe, frame').forEach(node => {
    q.defer((res, rej) => {
      return chunk007.axe.utils.sendCommandToFrame(
        node.actualNode,
        {
          command: 'cleanup-plugin'
        },
        res,
        rej
      );
    });
  });

  q.then(results => {
    if (cleanupErrors.length === 0) {
      resolve(results);
    } else {
      reject(cleanupErrors);
    }
  }).catch(reject);
}

const reporters = {};
let defaultReporter;

function hasReporter(reporterName) {
  return reporters.hasOwnProperty(reporterName);
}

function getReporter(reporter) {
  if (typeof reporter === 'string' && reporters[reporter]) {
    return reporters[reporter];
  }

  if (typeof reporter === 'function') {
    return reporter;
  }

  return defaultReporter;
}

function addReporter(name, cb, isDefault) {
  reporters[name] = cb;
  if (isDefault) {
    defaultReporter = cb;
  }
}

function configure(spec) {
  const audit = chunk007.axe._audit;

  if (!audit) {
    throw new Error('No audit configured');
  }

  if (spec.axeVersion || spec.ver) {
    const specVersion = spec.axeVersion || spec.ver;
    if (!/^\d+\.\d+\.\d+(-canary)?/.test(specVersion)) {
      throw new Error(`Invalid configured version ${specVersion}`);
    }

    const [version, canary] = specVersion.split('-');
    const [major, minor, patch] = version.split('.').map(Number);

    const [axeVersion, axeCanary] = chunk007.axe.version.split('-');
    const [axeMajor, axeMinor, axePatch] = axeVersion.split('.').map(Number);

    if (
      major !== axeMajor ||
      axeMinor < minor ||
      (axeMinor === minor && axePatch < patch) ||
      (major === axeMajor &&
        minor === axeMinor &&
        patch === axePatch &&
        canary &&
        canary !== axeCanary)
    ) {
      throw new Error(
        `Configured version ${specVersion} is not compatible with current axe version ${chunk007.axe.version}`
      );
    }
  }

  if (
    spec.reporter &&
    (typeof spec.reporter === 'function' || hasReporter(spec.reporter))
  ) {
    audit.reporter = spec.reporter;
  }

  if (spec.checks) {
    if (!Array.isArray(spec.checks)) {
      throw new TypeError('Checks property must be an array');
    }

    spec.checks.forEach(check => {
      if (!check.id) {
        throw new TypeError(
          // eslint-disable-next-line max-len
          `Configured check ${JSON.stringify(
            check
          )} is invalid. Checks must be an object with at least an id property`
        );
      }

      audit.addCheck(check);
    });
  }

  const modifiedRules = [];
  if (spec.rules) {
    if (!Array.isArray(spec.rules)) {
      throw new TypeError('Rules property must be an array');
    }

    spec.rules.forEach(rule => {
      if (!rule.id) {
        throw new TypeError(
          // eslint-disable-next-line max-len
          `Configured rule ${JSON.stringify(
            rule
          )} is invalid. Rules must be an object with at least an id property`
        );
      }

      modifiedRules.push(rule.id);
      audit.addRule(rule);
    });
  }

  if (spec.disableOtherRules) {
    audit.rules.forEach(rule => {
      if (modifiedRules.includes(rule.id) === false) {
        rule.enabled = false;
      }
    });
  }

  if (typeof spec.branding !== 'undefined') {
    audit.setBranding(spec.branding);
  } else {
    audit._constructHelpUrls();
  }

  if (spec.tagExclude) {
    audit.tagExclude = spec.tagExclude;
  }

  // Support runtime localization
  if (spec.locale) {
    audit.applyLocale(spec.locale);
  }

  if (spec.standards) {
    chunk018.configureStandards(spec.standards);
  }

  if (spec.noHtml) {
    audit.noHtml = true;
  }

  if (spec.allowedOrigins) {
    if (!Array.isArray(spec.allowedOrigins)) {
      throw new TypeError('Allowed origins property must be an array');
    }

    if (spec.allowedOrigins.includes('*')) {
      throw new Error(
        `"*" is not allowed. Use "${chunk007.constants.allOrigins}" instead`
      );
    }

    audit.setAllowedOrigins(spec.allowedOrigins);
  }
}

function frameMessenger(frameHandler) {
  chunk011.respondable.updateMessenger(frameHandler);
}

/**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}   tags  Optional array of tags
 * @return {Array}  Array of rules
 */
function getRules(tags) {
  tags = tags || [];
  const matchingRules = !tags.length
    ? chunk007.axe._audit.rules
    : chunk007.axe._audit.rules.filter(item => {
        return !!tags.filter(tag => {
          return item.tags.indexOf(tag) !== -1;
        }).length;
      });

  const ruleData = chunk007.axe._audit.data.rules || {};
  return matchingRules.map(matchingRule => {
    const rd = ruleData[matchingRule.id] || {};
    return {
      ruleId: matchingRule.id,
      description: rd.description,
      help: rd.help,
      helpUrl: rd.helpUrl,
      tags: matchingRule.tags,
      actIds: matchingRule.actIds
    };
  });
}

const dotRegex = /\{\{.+?\}\}/g;

/**
 * Constructor which holds configured rules and information about the document under test
 */
class Audit {
  constructor(audit) {
    // defaults
    this.lang = 'en';
    this.defaultConfig = audit;
    this.standards = chunk018.standards;
    this._init();
    // A copy of the "default" locale. This will be set if the user
    // provides a new locale to `axe.configure()` and used to undo
    // changes in `axe.reset()`.
    this._defaultLocale = null;
  }
  /**
   * Build and set the previous locale. Will noop if a previous
   * locale was already set, as we want the ability to "reset"
   * to the default ("first") configuration.
   */
  _setDefaultLocale() {
    if (this._defaultLocale) {
      return;
    }
    const locale = {
      checks: {},
      rules: {},
      failureSummaries: {},
      incompleteFallbackMessage: '',
      lang: this.lang
    };
    // XXX: unable to use `for-of` here, as doing so would
    // require us to polyfill `Symbol`.
    const checkIDs = Object.keys(this.data.checks);
    for (let i = 0; i < checkIDs.length; i++) {
      const id = checkIDs[i];
      const check = this.data.checks[id];
      const { pass, fail, incomplete } = check.messages;
      locale.checks[id] = {
        pass,
        fail,
        incomplete
      };
    }
    const ruleIDs = Object.keys(this.data.rules);
    for (let i = 0; i < ruleIDs.length; i++) {
      const id = ruleIDs[i];
      const rule = this.data.rules[id];
      const { description, help } = rule;
      locale.rules[id] = { description, help };
    }
    const failureSummaries = Object.keys(this.data.failureSummaries);
    for (let i = 0; i < failureSummaries.length; i++) {
      const type = failureSummaries[i];
      const failureSummary = this.data.failureSummaries[type];
      const { failureMessage } = failureSummary;
      locale.failureSummaries[type] = { failureMessage };
    }
    locale.incompleteFallbackMessage = this.data.incompleteFallbackMessage;
    this._defaultLocale = locale;
  }
  /**
   * Reset the locale to the "default".
   */
  _resetLocale() {
    // If the default locale has not already been set, we can exit early.
    const defaultLocale = this._defaultLocale;
    if (!defaultLocale) {
      return;
    }
    // Apply the default locale
    this.applyLocale(defaultLocale);
  }
  /**
   * Apply locale for the given `checks`.
   */
  _applyCheckLocale(checks) {
    const keys = Object.keys(checks);
    for (let i = 0; i < keys.length; i++) {
      const id = keys[i];
      if (!this.data.checks[id]) {
        throw new Error(`Locale provided for unknown check: "${id}"`);
      }
      this.data.checks[id] = mergeCheckLocale(this.data.checks[id], checks[id]);
    }
  }
  /**
   * Apply locale for the given `rules`.
   */
  _applyRuleLocale(rules) {
    const keys = Object.keys(rules);
    for (let i = 0; i < keys.length; i++) {
      const id = keys[i];
      if (!this.data.rules[id]) {
        throw new Error(`Locale provided for unknown rule: "${id}"`);
      }
      this.data.rules[id] = mergeRuleLocale(this.data.rules[id], rules[id]);
    }
  }
  /**
   * Apply locale for the given failureMessage
   */
  _applyFailureSummaries(messages) {
    const keys = Object.keys(messages);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!this.data.failureSummaries[key]) {
        throw new Error(`Locale provided for unknown failureMessage: "${key}"`);
      }
      this.data.failureSummaries[key] = mergeFailureMessage(
        this.data.failureSummaries[key],
        messages[key]
      );
    }
  }
  /**
   * Apply the given `locale`.
   *
   * @param {axe.Locale}
   */
  applyLocale(locale) {
    this._setDefaultLocale();
    if (locale.checks) {
      this._applyCheckLocale(locale.checks);
    }
    if (locale.rules) {
      this._applyRuleLocale(locale.rules);
    }
    if (locale.failureSummaries) {
      this._applyFailureSummaries(locale.failureSummaries, 'failureSummaries');
    }
    if (locale.incompleteFallbackMessage) {
      this.data.incompleteFallbackMessage = mergeFallbackMessage(
        this.data.incompleteFallbackMessage,
        locale.incompleteFallbackMessage
      );
    }
    if (locale.lang) {
      this.lang = locale.lang;
    }
  }
  /**
   * Set the normalized allowed origins.
   *
   * @param {String[]}
   */
  setAllowedOrigins(allowedOrigins) {
    const defaultOrigin = getDefaultOrigin();

    this.allowedOrigins = [];
    for (const origin of allowedOrigins) {
      if (origin === chunk007.constants.allOrigins) {
        // No other origins needed. Set '*' and exit
        this.allowedOrigins = ['*'];
        return;
      } else if (origin !== chunk007.constants.sameOrigin) {
        this.allowedOrigins.push(origin);
      } else if (defaultOrigin) {
        // sameOrigin, only if the default is known
        this.allowedOrigins.push(defaultOrigin);
      }
    }
  }
  /**
   * Initializes the rules and checks
   */
  _init() {
    const audit = getDefaultConfiguration(this.defaultConfig);
    this.lang = audit.lang || 'en';
    this.reporter = audit.reporter;
    this.commands = {};
    this.rules = [];
    this.checks = {};
    this.brand = 'axe';
    this.application = 'axeAPI';
    this.tagExclude = ['experimental', 'deprecated'];
    this.noHtml = audit.noHtml;
    this.allowedOrigins = audit.allowedOrigins;
    unpackToObject(audit.rules, this, 'addRule');
    unpackToObject(audit.checks, this, 'addCheck');
    this.data = {};
    this.data.checks = (audit.data && audit.data.checks) || {};
    this.data.rules = (audit.data && audit.data.rules) || {};
    this.data.failureSummaries =
      (audit.data && audit.data.failureSummaries) || {};
    this.data.incompleteFallbackMessage =
      (audit.data && audit.data.incompleteFallbackMessage) || '';
    this._constructHelpUrls(); // create default helpUrls
  }
  /**
   * Adds a new command to the audit
   */
  registerCommand(command) {
    this.commands[command.id] = command.callback;
  }
  /**
   * Adds a new rule to the Audit.  If a rule with specified ID already exists, it will be overridden
   * @param {Object} spec Rule specification object
   */
  addRule(spec) {
    if (spec.metadata) {
      this.data.rules[spec.id] = spec.metadata;
    }
    const rule = this.getRule(spec.id);
    if (rule) {
      rule.configure(spec);
    } else {
      this.rules.push(new chunk026.Rule(spec, this));
    }
  }
  /**
   * Adds a new check to the Audit.  If a Check with specified ID already exists, it will be
   * reconfigured
   *
   * @param {Object} spec Check specification object
   */
  addCheck(spec) {
    /*eslint no-eval: 0 */

    const metadata = spec.metadata;
    if (typeof metadata === 'object') {
      this.data.checks[spec.id] = metadata;
      // Transform messages into functions:
      if (typeof metadata.messages === 'object') {
        Object.keys(metadata.messages)
          .filter(
            prop =>
              metadata.messages.hasOwnProperty(prop) &&
              typeof metadata.messages[prop] === 'string'
          )
          .forEach(prop => {
            if (metadata.messages[prop].indexOf('function') === 0) {
              metadata.messages[prop] = new Function(
                'return ' + metadata.messages[prop] + ';'
              )();
            }
          });
      }
    }
    if (this.checks[spec.id]) {
      this.checks[spec.id].configure(spec);
    } else {
      this.checks[spec.id] = new chunk026.Check(spec);
    }
  }
  /**
   * Runs the Audit; which in turn should call `run` on each rule.
   * @async
   * @param  {Context}   context The scope definition/context for analysis (include/exclude)
   * @param  {Object}    options Options object to pass into rules and/or disable rules or checks
   * @param  {Function}  resolve Callback function to fire when audit is complete
   * @param  {Function}  reject  Callback function to fire when audit experiences an error
   */
  run(context, options, resolve, reject) {
    this.normalizeOptions(options);
    chunk010.DqElement.setRunOptions(options);

    // TODO: es-modules_selectCache
    chunk007.axe._selectCache = [];
    // get a list of rules to run NOW vs. LATER (later are preload assets dependent rules)
    const allRulesToRun = getRulesToRun(this.rules, context, options);
    const runNowRules = allRulesToRun.now;
    const runLaterRules = allRulesToRun.later;
    // init a NOW queue for rules to run immediately
    const nowRulesQueue = chunk011.queue();
    // construct can run NOW rules into NOW queue
    runNowRules.forEach(rule => {
      nowRulesQueue.defer(getDefferedRule(rule, context, options));
    });
    // init a PRELOADER queue to start preloading assets
    const preloaderQueue = chunk011.queue();
    // defer preload if preload dependent rules exist
    if (runLaterRules.length) {
      preloaderQueue.defer(res => {
        // handle both success and fail of preload
        // and resolve, to allow to run all checks
        chunk014.preload(options)
          .then(assets => res(assets))
          .catch(err => {
            /**
             * Note:
             * we do not reject, to allow other (non-preload) rules to `run`
             * -> instead we resolve as `undefined`
             */
            console.warn(`Couldn't load preload assets: `, err);
            res(undefined);
          });
      });
    }
    // defer now and preload queue to run immediately
    const queueForNowRulesAndPreloader = chunk011.queue();
    queueForNowRulesAndPreloader.defer(nowRulesQueue);
    queueForNowRulesAndPreloader.defer(preloaderQueue);
    // invoke the now queue
    queueForNowRulesAndPreloader
      .then(nowRulesAndPreloaderResults => {
        // interpolate results into separate variables
        const assetsFromQueue = nowRulesAndPreloaderResults.pop();
        if (assetsFromQueue && assetsFromQueue.length) {
          // result is a queue (again), hence the index resolution
          // assets is either an object of key value pairs of asset type and values
          // eg: cssom: [stylesheets]
          // or undefined if preload failed
          const assets = assetsFromQueue[0];
          // extend context with preloaded assets
          if (assets) {
            context = {
              ...context,
              ...assets
            };
          }
        }
        // the reminder of the results are RuleResults
        const nowRulesResults = nowRulesAndPreloaderResults[0];
        // if there are no rules to run LATER - resolve with rule results
        if (!runLaterRules.length) {
          // remove the cache
          chunk007.axe._selectCache = undefined;
          // resolve
          resolve(nowRulesResults.filter(result => !!result));
          return;
        }
        // init a LATER queue for rules that are dependant on preloaded assets
        const laterRulesQueue = chunk011.queue();
        runLaterRules.forEach(rule => {
          const deferredRule = getDefferedRule(rule, context, options);
          laterRulesQueue.defer(deferredRule);
        });
        // invoke the later queue
        laterRulesQueue
          .then(laterRuleResults => {
            // remove the cache
            chunk007.axe._selectCache = undefined;
            // resolve
            resolve(
              nowRulesResults
                .concat(laterRuleResults)
                .filter(result => !!result)
            );
          })
          .catch(reject);
      })
      .catch(reject);
  }
  /**
   * Runs Rule `after` post processing functions
   * @param  {Array} results  Array of RuleResults to postprocess
   * @param  {Mixed} options  Options object to pass into rules and/or disable rules or checks
   */
  after(results, options) {
    const rules = this.rules;
    return results.map(ruleResult => {
      if (ruleResult.error) {
        return ruleResult;
      }
      const rule = chunk011.findBy(rules, 'id', ruleResult.id);
      if (!rule) {
        // If you see this, you're probably running the Mocha tests with the axe extension installed
        throw new Error(
          'Result for unknown rule. You may be running mismatch axe-core versions'
        );
      }
      try {
        return rule.after(ruleResult, options);
      } catch (err) {
        if (options.debug) {
          throw err;
        }
        return createIncompleteErrorResult(rule, err);
      }
    });
  }
  /**
   * Get the rule with a given ID
   * @param  {string}
   * @return {Rule}
   */
  getRule(ruleId) {
    return this.rules.find(rule => rule.id === ruleId);
  }
  /**
   * Ensure all rules that are expected to run exist
   * @throws {Error} If any tag or rule specified in options is unknown
   * @param  {Object} options  Options object
   * @return {Object}          Validated options object
   */
  normalizeOptions(options) {
    const audit = this;
    const tags = [];
    const ruleIds = [];
    audit.rules.forEach(rule => {
      ruleIds.push(rule.id);
      rule.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    // Validate runOnly
    if (['object', 'string'].includes(typeof options.runOnly)) {
      if (typeof options.runOnly === 'string') {
        options.runOnly = [options.runOnly];
      }
      if (Array.isArray(options.runOnly)) {
        const hasTag = options.runOnly.find(value => tags.includes(value));
        const hasRule = options.runOnly.find(value => ruleIds.includes(value));
        if (hasTag && hasRule) {
          throw new Error('runOnly cannot be both rules and tags');
        }
        if (hasRule) {
          options.runOnly = {
            type: 'rule',
            values: options.runOnly
          };
        } else {
          options.runOnly = {
            type: 'tag',
            values: options.runOnly
          };
        }
      }
      const only = options.runOnly;
      if (only.value && !only.values) {
        only.values = only.value;
        delete only.value;
      }
      if (!Array.isArray(only.values) || only.values.length === 0) {
        throw new Error('runOnly.values must be a non-empty array');
      }
      // Check if every value in options.runOnly is a known rule ID
      if (['rule', 'rules'].includes(only.type)) {
        only.type = 'rule';
        only.values.forEach(ruleId => {
          if (!ruleIds.includes(ruleId)) {
            throw new Error('unknown rule `' + ruleId + '` in options.runOnly');
          }
        });
        // Validate 'tags' (e.g. anything not 'rule')
      } else if (['tag', 'tags', undefined].includes(only.type)) {
        only.type = 'tag';

        const unmatchedTags = only.values.filter(
          tag => !tags.includes(tag) && !/wcag2[1-3]a{1,3}/.test(tag)
        );
        if (unmatchedTags.length !== 0) {
          chunk007.axe.log('Could not find tags `' + unmatchedTags.join('`, `') + '`');
        }
      } else {
        throw new Error(`Unknown runOnly type '${only.type}'`);
      }
    }
    if (typeof options.rules === 'object') {
      Object.keys(options.rules).forEach(ruleId => {
        if (!ruleIds.includes(ruleId)) {
          throw new Error('unknown rule `' + ruleId + '` in options.rules');
        }
      });
    }
    return options;
  }
  /*
   * Updates the default options and then applies them
   * @param  {Mixed} options  Options object
   */
  setBranding(branding) {
    const previous = {
      brand: this.brand,
      application: this.application
    };
    if (typeof branding === 'string') {
      this.application = branding;
    }
    if (
      branding &&
      branding.hasOwnProperty('brand') &&
      branding.brand &&
      typeof branding.brand === 'string'
    ) {
      this.brand = branding.brand;
    }
    if (
      branding &&
      branding.hasOwnProperty('application') &&
      branding.application &&
      typeof branding.application === 'string'
    ) {
      this.application = branding.application;
    }
    this._constructHelpUrls(previous);
  }
  _constructHelpUrls(previous = null) {
    // TODO: es-modules-version
    const version = (chunk007.axe.version.match(/^[1-9][0-9]*\.[0-9]+/) || ['x.y'])[0];
    this.rules.forEach(rule => {
      if (!this.data.rules[rule.id]) {
        this.data.rules[rule.id] = {};
      }
      const metaData = this.data.rules[rule.id];
      if (
        typeof metaData.helpUrl !== 'string' ||
        (previous &&
          metaData.helpUrl === getHelpUrl(previous, rule.id, version))
      ) {
        metaData.helpUrl = getHelpUrl(this, rule.id, version);
      }
    });
  }
  /**
   * Reset the default rules, checks and meta data
   */
  resetRulesAndChecks() {
    this._init();
    this._resetLocale();
  }
}

function getDefaultOrigin() {
  // @see https://html.spec.whatwg.org/multipage/webappapis.html#dom-origin-dev
  // window.origin does not exist in ie11
  // prevent origin default "null" string on CDP `Page.setDocumentContent` https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-setDocumentContent
  if (window.origin && window.origin !== 'null') {
    return window.origin;
  }
  // window.location does not exist in node when we run the build
  if (
    window.location &&
    window.location.origin &&
    window.location.origin !== 'null'
  ) {
    return window.location.origin;
  }
}

function getDefaultConfiguration(audit) {
  let config;
  if (audit) {
    config = chunk010.clone(audit);
    // Commons are configured into axe like everything else,
    // however because things go funky if we have multiple commons objects
    // we're not using the copy of that.
    config.commons = audit.commons;
  } else {
    config = {};
  }

  config.reporter = config.reporter || null;
  config.noHtml = config.noHtml || false;

  if (!config.allowedOrigins) {
    const defaultOrigin = getDefaultOrigin();
    config.allowedOrigins = defaultOrigin ? [defaultOrigin] : [];
  }

  config.rules = config.rules || [];
  config.checks = config.checks || [];
  config.data = { checks: {}, rules: {}, ...config.data };
  return config;
}

function unpackToObject(collection, audit, method) {
  let i, l;
  for (i = 0, l = collection.length; i < l; i++) {
    audit[method](collection[i]);
  }
}

/**
 * Merge two check locales (a, b), favoring `b`.
 *
 * Both locale `a` and the returned shape resemble:
 *
 *    {
 *      impact: string,
 *      messages: {
 *        pass: string | function,
 *        fail: string | function,
 *        incomplete: string | {
 *          [key: string]: string | function
 *        }
 *      }
 *    }
 *
 * Locale `b` follows the `axe.CheckLocale` shape and resembles:
 *
 *    {
 *      pass: string,
 *      fail: string,
 *      incomplete: string | { [key: string]: string }
 *    }
 */

const mergeCheckLocale = (a, b) => {
  let { pass, fail } = b;
  // If the message(s) are Strings, they have not yet been run
  // thru doT (which will return a Function).
  if (typeof pass === 'string' && dotRegex.test(pass)) {
    pass = chunk000.doT.compile(pass);
  }
  if (typeof fail === 'string' && dotRegex.test(fail)) {
    fail = chunk000.doT.compile(fail);
  }
  return {
    ...a,
    messages: {
      pass: pass || a.messages.pass,
      fail: fail || a.messages.fail,
      incomplete:
        typeof a.messages.incomplete === 'object'
          ? // TODO: for compleness-sake, we should be running
            // incomplete messages thru doT as well. This was
            // out-of-scope for runtime localization, but should
            // eventually be addressed.
            { ...a.messages.incomplete, ...b.incomplete }
          : b.incomplete
    }
  };
};

/**
 * Merge two rule locales (a, b), favoring `b`.
 */

const mergeRuleLocale = (a, b) => {
  let { help, description } = b;
  // If the message(s) are Strings, they have not yet been run
  // thru doT (which will return a Function).
  if (typeof help === 'string' && dotRegex.test(help)) {
    help = chunk000.doT.compile(help);
  }
  if (typeof description === 'string' && dotRegex.test(description)) {
    description = chunk000.doT.compile(description);
  }
  return {
    ...a,
    help: help || a.help,
    description: description || a.description
  };
};

/**
 * Merge two failure messages (a, b), favoring `b`.
 */

const mergeFailureMessage = (a, b) => {
  let { failureMessage } = b;
  // If the message(s) are Strings, they have not yet been run
  // thru doT (which will return a Function).
  if (typeof failureMessage === 'string' && dotRegex.test(failureMessage)) {
    failureMessage = chunk000.doT.compile(failureMessage);
  }
  return {
    ...a,
    failureMessage: failureMessage || a.failureMessage
  };
};

/**
 * Merge two incomplete fallback messages (a, b), favoring `b`.
 */

const mergeFallbackMessage = (a, b) => {
  if (typeof b === 'string' && dotRegex.test(b)) {
    b = chunk000.doT.compile(b);
  }
  return b || a;
};

/**
 * Splits a given array of rules to two, with rules that can be run immediately and one's that are dependent on preloadedAssets
 * @method getRulesToRun
 * @param {Array<Object>} rules complete list of rules
 * @param {Object} context
 * @param {Object} options
 * @return {Object} out, an object containing two arrays, one being list of rules to run now and list of rules to run later
 * @private
 */
function getRulesToRun(rules, context, options) {
  // entry object for reduce function below
  const base = {
    now: [],
    later: []
  };

  // iterate through rules and separate out rules that need to be run now vs later
  const splitRules = rules.reduce((out, rule) => {
    // ensure rule can run
    if (!chunk014.ruleShouldRun(rule, context, options)) {
      return out;
    }

    // does rule require preload assets - push to later array
    if (rule.preload) {
      out.later.push(rule);
      return out;
    }

    // default to now array
    out.now.push(rule);

    // return
    return out;
  }, base);

  // return
  return splitRules;
}

/**
 * Convenience method, that consturcts a rule `run` function that can be deferred
 * @param {Object} rule rule to be deferred
 * @param {Object} context context object essential to be passed into rule `run`
 * @param {Object} options normalised options to be passed into rule `run`
 * @param {Object} assets (optional) preloaded assets to be passed into rule and checks (if the rule is preload dependent)
 * @return {Function} a deferrable function for rule
 */
function getDefferedRule(rule, context, options) {
  // init performance timer of requested via options
  if (options.performanceTimer) {
    chunk013.performanceTimer.mark('mark_rule_start_' + rule.id);
  }

  return (resolve, reject) => {
    // invoke `rule.run`
    rule.run(
      context,
      options,
      ruleResult => resolve(ruleResult),
      err => {
        if (options.debug) {
          reject(err);
        } else {
          resolve(createIncompleteErrorResult(rule, err));
        }
      }
    );
  };
}

function createIncompleteErrorResult(rule, error) {
  const { errorNode } = error;
  const serialError = chunk014.serializeError(error);
  const none = [
    {
      id: 'error-occurred',
      result: undefined,
      data: serialError,
      relatedNodes: []
    }
  ];
  const node = errorNode || new chunk010.DqElement(document.documentElement);
  return Object.assign(new chunk026.RuleResult(rule), {
    error: serialError,
    result: chunk007.constants.CANTTELL,
    nodes: [{ any: [], all: [], none, node }]
  });
}

/**
 * For all the rules, create the helpUrl and add it to the data for that rule
 */
function getHelpUrl({ brand, application, lang }, ruleId, version) {
  return (
    chunk007.constants.helpUrlBase +
    brand +
    '/' +
    (version || chunk007.axe.version.substring(0, chunk007.axe.version.lastIndexOf('.'))) +
    '/' +
    ruleId +
    '?application=' +
    encodeURIComponent(application) +
    (lang && lang !== 'en' ? '&lang=' + encodeURIComponent(lang) : '')
  );
}

function setupGlobals(context) {
  // if window or document are not defined and context was passed in
  // we can use it to configure them
  // NOTE: because our polyfills run first, the global window object
  // always exists but may not have things we expect
  const hasWindow = window && 'Node' in window && 'NodeList' in window;
  const hasDoc = !!document;
  if (hasWindow && hasDoc) {
    return;
  }
  if (!context || !context.ownerDocument) {
    throw new Error(
      'Required "window" or "document" globals not defined and cannot be deduced from the context. ' +
        'Either set the globals before running or pass in a valid Element.'
    );
  }

  if (!hasDoc) {
    chunk007.cache.set('globalDocumentSet', true);
    document = context.ownerDocument;
  }

  if (!hasWindow) {
    chunk007.cache.set('globalWindowSet', true);
    window = document.defaultView;
  }
}

function resetGlobals() {
  if (chunk007.cache.get('globalDocumentSet')) {
    chunk007.cache.set('globalDocumentSet', false);
    document = null;
  }
  if (chunk007.cache.get('globalWindowSet')) {
    chunk007.cache.set('globalWindowSet', false);
    window = null;
  }
}

/**
 * Clean up axe-core tree and caches. `axe.run` will call this function at the end of the run so there's no need to call it yourself afterwards.
 */
function teardown() {
  // Reset MUST to happen before the cache is cleared
  resetGlobals();
  chunk007.axe._memoizedFns.forEach(fn => fn.clear());
  chunk007.cache.clear();
  chunk007.axe._tree = undefined;
  chunk007.axe._selectorData = undefined;
  chunk007.axe._selectCache = undefined;
}

/**
 * Starts analysis on the current document and its subframes
 * @private
 * @param  {Object}   context  The `Context` specification object @see Context
 * @param  {Array}    options  Optional RuleOptions
 * @param  {Function} resolve  Called when done running rules, receives ([results : Object], teardown : Function)
 * @param  {Function} reject   Called when execution failed, receives (err : Error)
 */
function runRules(context, options, resolve, reject) {
  try {
    context = new chunk018.Context(context);
    chunk007.axe._tree = context.flatTree;
    chunk007.axe._selectorData = chunk010.getSelectorData(context.flatTree);
  } catch (e) {
    teardown();
    return reject(e);
  }

  const q = chunk011.queue();
  const audit = chunk007.axe._audit;

  if (options.performanceTimer) {
    chunk013.performanceTimer.auditStart();
  }

  if (context.frames.length && options.iframes !== false) {
    q.defer((res, rej) => {
      chunk011.collectResultsFromFrames(context, options, 'rules', null, res, rej);
    });
  }
  q.defer((res, rej) => {
    audit.run(context, options, res, rej);
  });
  q.then(data => {
    try {
      if (options.performanceTimer) {
        chunk013.performanceTimer.auditEnd();
      }

      // Add wrapper object so that we may use the same "merge" function for results from inside and outside frames
      let results = chunk011.mergeResults(
        data.map(res => {
          return { results: res };
        })
      );

      // after should only run once, so ensure we are in the top level window
      if (context.initiator) {
        if (options.performanceTimer) {
          chunk013.performanceTimer.mark('auditAfterStart');
        }
        results = audit.after(results, options);
        if (options.performanceTimer) {
          chunk013.performanceTimer.mark('auditAfterEnd');
          chunk013.performanceTimer.measure(
            'audit.after',
            'auditAfterStart',
            'auditAfterEnd'
          );
          chunk013.performanceTimer.logMeasures('audit.after');
        }
        results.forEach(chunk018.publishMetaData);
        results = results.map(chunk007.finalizeRuleResult);
      }
      try {
        resolve(results, teardown);
      } catch (e) {
        teardown();
        chunk011.log(e);
      }
    } catch (e) {
      teardown();
      reject(e);
    }
  }).catch(e => {
    teardown();
    reject(e);
  });
}

/**
 * Sets up Rules, Messages and default options for Checks, must be invoked before attempting analysis
 * @param  {Object} audit The "audit specification" object
 * @private
 */
function load(audit) {
  chunk007.axe._audit = new Audit(audit);
}

function runCommand(data, keepalive, callback) {
  const resolve = callback;
  const reject = function reject(err) {
    if (err instanceof Error === false) {
      err = new Error(err);
    }
    callback(err);
  };

  const context = (data && data.context) || {};
  if (context.hasOwnProperty('include') && !context.include.length) {
    context.include = [document];
  }
  const options = (data && data.options) || {};

  switch (data.command) {
    case 'rules':
      return runRules(
        context,
        options,
        (results, cleanupFn) => {
          // Serialize all DqElements
          results = chunk011.nodeSerializer.mapRawResults(results);
          resolve(results);
          // Cleanup AFTER resolve so that selectors can be generated
          cleanupFn();
        },
        reject
      );
    case 'cleanup-plugin':
      return cleanup(resolve, reject);
    default:
      // go through the registered commands
      if (
        chunk007.axe._audit &&
        chunk007.axe._audit.commands &&
        chunk007.axe._audit.commands[data.command]
      ) {
        return chunk007.axe._audit.commands[data.command](data, callback);
      }
  }
}

if (window.top !== window) {
  chunk011.respondable.subscribe('axe.start', runCommand);
  chunk011.respondable.subscribe('axe.ping', (data, keepalive, respond) => {
    respond({
      axe: true
    });
  });
}

/*eslint no-use-before-define:0 */

function Plugin(spec) {
  this._run = spec.run;
  this._collect = spec.collect;
  this._registry = {};
  spec.commands.forEach(command => {
    chunk007.axe._audit.registerCommand(command);
  });
}

Plugin.prototype.run = function run() {
  return this._run.apply(this, arguments);
};

Plugin.prototype.collect = function collect() {
  return this._collect.apply(this, arguments);
};

Plugin.prototype.cleanup = function cleanup(done) {
  const q = chunk007.axe.utils.queue();
  const that = this;
  Object.keys(this._registry).forEach(key => {
    q.defer(_done => {
      that._registry[key].cleanup(_done);
    });
  });
  q.then(done);
};

Plugin.prototype.add = function add(impl) {
  this._registry[impl.id] = impl;
};

function registerPlugin(plugin) {
  chunk007.axe.plugins[plugin.id] = new Plugin(plugin);
}

function reset() {
  const audit = chunk007.axe._audit;

  if (!audit) {
    throw new Error('No audit configured');
  }
  audit.resetRulesAndChecks();
  chunk018.resetStandards();
}

/**
 * Run a rule in a non-browser environment
 * @param {String} ruleId  Id of the rule
 * @param {VirtualNode} vNode  The virtual node to run the rule against
 * @param {Object} options  (optional) Set of options passed into rules or checks
 * @return {Object} axe results for the rule run
 */
function runVirtualRule(ruleId, vNode, options = {}) {
  // TODO: es-modules axe._audit
  // TODO: es-modules axe._selectorData
  options.reporter = options.reporter || chunk007.axe._audit.reporter || 'v1';
  chunk007.axe._selectorData = {};

  if (!(vNode instanceof chunk007.AbstractVirtualNode)) {
    vNode = new SerialVirtualNode(vNode);
  }

  let rule = chunk013.getRule(ruleId);

  if (!rule) {
    throw new Error('unknown rule `' + ruleId + '`');
  }

  // rule.prototype.gather calls axe.utils.isHidden which in turn calls
  // window.getComputedStyle if the rule excludes hidden elements. we
  // can avoid this call by forcing the rule to not exclude hidden
  // elements
  rule = Object.create(rule, { excludeHidden: { value: false } });
  const context = {
    initiator: true,
    include: [vNode],
    exclude: [],
    frames: [],
    page: false,
    focusable: true,
    size: {},
    flatTree: []
  };

  const rawResults = rule.runSync(context, options);
  chunk018.publishMetaData(rawResults);
  chunk007.finalizeRuleResult(rawResults);
  const results = chunk007.aggregateResult([rawResults]);

  results.violations.forEach(result =>
    result.nodes.forEach(nodeResult => {
      nodeResult.failureSummary = chunk012.failureSummary(nodeResult);
    })
  );

  return {
    ...chunk012.getEnvironmentData(),
    ...results,
    toolOptions: options
  };
}

/**
 * Normalize the optional params of axe.run()
 * @param  {object}   context
 * @param  {object}   options
 * @param  {Function} callback
 * @return {object}            With 3 keys: context, options, callback
 */
function normalizeRunParams([context, options, callback]) {
  const typeErr = new TypeError('axe.run arguments are invalid');

  // Determine the context
  if (!chunk013.isContextSpec(context)) {
    if (callback !== undefined) {
      // Either context is invalid or there are too many params
      throw typeErr;
    }
    // Set default and shift one over
    callback = options;
    options = context;
    context = document;
  }

  // Determine the options
  if (typeof options !== 'object') {
    if (callback !== undefined) {
      // Either options is invalid or there are too many params
      throw typeErr;
    }
    // Set default and shift one over
    callback = options;
    options = {};
  }

  // Set the callback or noop;
  if (typeof callback !== 'function' && callback !== undefined) {
    throw typeErr;
  }

  options = chunk010.clone(options);
  options.reporter = options.reporter ?? chunk007.axe._audit?.reporter ?? 'v1';
  return { context, options, callback };
}

function runPartial(...args) {
  const { options, context } = normalizeRunParams(args);
  chunk007.assert(chunk007.axe._audit, 'Axe is not configured. Audit is missing.');
  chunk007.assert(
    !chunk007.axe._running,
    'Axe is already running. Use `await axe.run()` to wait ' +
      'for the previous run to finish before starting a new run.'
  );

  const contextObj = new chunk018.Context(context, chunk007.axe._tree);
  chunk007.axe._tree = contextObj.flatTree;
  chunk007.axe._selectorData = chunk010.getSelectorData(contextObj.flatTree);
  chunk007.axe._running = true;

  // Even in the top frame, we don't support this with runPartial
  options.elementRef = false;

  return (
    new Promise((res, rej) => {
      chunk007.axe._audit.run(contextObj, options, res, rej);
    })
      .then(results => {
        results = chunk011.nodeSerializer.mapRawResults(results);
        const frames = contextObj.frames.map(({ node }) => {
          return chunk011.nodeSerializer.toSpec(node);
        });
        let environmentData;
        if (contextObj.initiator) {
          environmentData = chunk012.getEnvironmentData();
        }
        chunk007.axe._running = false;
        teardown();
        return { results, frames, environmentData };
      })
      // Avoid .finally() to deal with Mocha 9 + IE issues
      .catch(err => {
        chunk007.axe._running = false;
        teardown();
        return Promise.reject(err);
      })
  );
}

function finishRun(partialResults, options = {}) {
  options = chunk010.clone(options);
  const { environmentData } = partialResults.find(r => r.environmentData) || {};

  // normalize the runOnly option for the output of reporters toolOptions
  chunk007.axe._audit.normalizeOptions(options);
  options.reporter = options.reporter ?? chunk007.axe._audit?.reporter ?? 'v1';

  setFrameSpec(partialResults);
  let results = chunk011.mergeResults(partialResults);
  results = chunk007.axe._audit.after(results, options);
  results.forEach(chunk018.publishMetaData);
  results = results.map(chunk007.finalizeRuleResult);

  return createReport(results, { environmentData, ...options });
}

function setFrameSpec(partialResults) {
  const frameStack = [];
  for (const partialResult of partialResults) {
    const frameSpec = frameStack.shift();
    if (!partialResult) {
      continue;
    }

    partialResult.frameSpec = frameSpec ?? null;
    const frameSpecs = getMergedFrameSpecs(partialResult);
    frameStack.unshift(...frameSpecs);
  }
}

function getMergedFrameSpecs({
  frames: childFrameSpecs,
  frameSpec: parentFrameSpec
}) {
  if (!parentFrameSpec) {
    return childFrameSpecs;
  }
  // Include the selector/ancestry/... from the parent frames
  return childFrameSpecs.map(childFrameSpec => {
    return chunk011.nodeSerializer.mergeSpecs(childFrameSpec, parentFrameSpec);
  });
}

function createReport(results, options) {
  return new Promise((resolve, reject) => {
    const reporter = getReporter(options.reporter);
    reporter(results, options, resolve, reject);
  });
}

/*
  This file only exists to expose inner axe-core functionality for testing prior to being able to support ES6 imports in our tests.
  TODO: remove `_thisWillBeDeletedDoNotUse` once we can support imports in our tests
*/

const _thisWillBeDeletedDoNotUse = {
  base: {
    Audit,
    CheckResult: chunk025.CheckResult,
    Check: chunk026.Check,
    Context: chunk018.Context,
    RuleResult: chunk026.RuleResult,
    Rule: chunk026.Rule,
    metadataFunctionMap: chunk026.metadataFunctionMap
  },
  public: {
    reporters
  },
  helpers: {
    failureSummary: chunk012.failureSummary,
    incompleteFallbackMessage: chunk012.incompleteFallbackMessage,
    processAggregate: chunk018.processAggregate
  },
  utils: {
    setDefaultFrameMessenger: chunk011.setDefaultFrameMessenger,
    cacheNodeSelectors: chunk013.cacheNodeSelectors,
    getNodesMatchingExpression: chunk013.getNodesMatchingExpression,
    convertSelector: chunk011.convertSelector
  },
  commons: {
    dom: {
      nativelyHidden: chunk018.nativelyHidden,
      displayHidden: chunk018.displayHidden,
      visibilityHidden: chunk018.visibilityHidden,
      contentVisibiltyHidden: chunk018.contentVisibiltyHidden,
      ariaHidden: chunk018.ariaHidden,
      opacityHidden: chunk018.opacityHidden,
      scrollHidden: chunk018.scrollHidden,
      overflowHidden: chunk018.overflowHidden,
      clipHidden: chunk018.clipHidden,
      areaHidden: chunk018.areaHidden,
      detailsHidden: chunk018.detailsHidden
    }
  }
};

exports.SerialVirtualNode = SerialVirtualNode;
exports._thisWillBeDeletedDoNotUse = _thisWillBeDeletedDoNotUse;
exports.addReporter = addReporter;
exports.cleanup = cleanup;
exports.configure = configure;
exports.finishRun = finishRun;
exports.frameMessenger = frameMessenger;
exports.getReporter = getReporter;
exports.getRules = getRules;
exports.hasReporter = hasReporter;
exports.load = load;
exports.normalizeRunParams = normalizeRunParams;
exports.registerPlugin = registerPlugin;
exports.reset = reset;
exports.runPartial = runPartial;
exports.runRules = runRules;
exports.runVirtualRule = runVirtualRule;
exports.setupGlobals = setupGlobals;
exports.teardown = teardown;
