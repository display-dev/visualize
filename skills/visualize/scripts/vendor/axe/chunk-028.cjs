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
const chunk011 = require('./chunk-011.cjs');
const chunk027 = require('./chunk-027.cjs');
const chunk018 = require('./chunk-018.cjs');
const chunk010 = require('./chunk-010.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk013 = require('./chunk-013.cjs');
require('./chunk-014.cjs');
const chunk024 = require('./chunk-024.cjs');

const noop = () => {};

/**
 * Runs a number of rules against the provided HTML page and returns the
 * resulting issue list
 *
 * @param  {Object}   context  (optional) Defines the scope of the analysis
 * @param  {Object}   options  (optional) Set of options passed into rules or checks
 * @param  {Function} callback (optional) The callback when axe is done, given 2 params:
 *                             - Error    If any errors occured, otherwise null
 *                             - Results  The results object / array, or undefined on error
 * @return {Promise}           Resolves with the axe results. Only available when natively supported
 */
function run(...args) {
  chunk027.setupGlobals(args[0]);
  const { context, options, callback = noop } = chunk027.normalizeRunParams(args);
  const { thenable, resolve, reject } = getPromiseHandlers(callback);
  try {
    chunk007.assert(chunk007.axe._audit, 'No audit configured');
    chunk007.assert(
      !chunk007.axe._running,
      'Axe is already running. Use `await axe.run()` to wait ' +
        'for the previous run to finish before starting a new run.'
    );
  } catch (e) {
    return handleError(e, callback);
  }

  chunk007.axe._running = true;
  if (options.performanceTimer) {
    chunk013.performanceTimer.start();
  }

  function handleRunRules(rawResults, teardown) {
    const respond = results => {
      if (options.performanceTimer) {
        chunk013.performanceTimer.mark('reporterEnd');
        chunk013.performanceTimer.measure('reporter', 'reporterStart', 'reporterEnd');
        chunk013.performanceTimer.logMeasures('reporter');
        chunk013.performanceTimer.end();
      }
      chunk007.axe._running = false;
      teardown();
      try {
        resolve(results);
      } catch (e) {
        chunk007.axe.log(e);
      }
    };
    const wrappedReject = err => {
      chunk007.axe._running = false;
      teardown();
      try {
        reject(err);
      } catch (e) {
        chunk007.axe.log(e);
      }
    };

    try {
      if (options.performanceTimer) {
        chunk013.performanceTimer.mark('reporterStart');
      }
      createReport(rawResults, options, respond, wrappedReject);
    } catch (err) {
      wrappedReject(err);
    }
  }

  function errorRunRules(err) {
    if (options.performanceTimer) {
      chunk013.performanceTimer.end();
    }
    chunk007.axe._running = false;
    callback(err);
    reject(err);
  }

  chunk007.axe._runRules(context, options, handleRunRules, errorRunRules);
  return thenable;
}

function getPromiseHandlers(callback) {
  let thenable, reject, resolve;
  if (typeof Promise === 'function' && callback === noop) {
    thenable = new Promise((_resolve, _reject) => {
      reject = _reject;
      resolve = _resolve;
    });
  } else {
    resolve = result => callback(null, result);
    reject = err => callback(err);
  }
  return { thenable, reject, resolve };
}

function createReport(rawResults, options, respond, reject) {
  const reporter = chunk027.getReporter(options.reporter);
  const results = reporter(rawResults, options, respond, reject);
  if (results !== undefined) {
    respond(results);
  }
}

function handleError(err, callback) {
  if (typeof callback === 'function' && callback !== noop) {
    callback(err.message);
    return;
  }
  throw err;
}

/**
 * Setup axe-core so axe.common functions can work properly.
 * @param {Node} [node=document.documentElement] optional node. NOTE: passing in anything other than body or the documentElement may result in incomplete results.
 */
function setup(node) {
  if (chunk007.axe._tree) {
    throw new Error(
      'Axe is already setup. Call `axe.teardown()` before calling `axe.setup` again.'
    );
  }
  // Normalize document
  if (
    node &&
    typeof node.documentElement === 'object' &&
    typeof node.defaultView === 'object'
  ) {
    node = node.documentElement;
  }

  chunk027.setupGlobals(node);
  chunk007.axe._tree = chunk018.getFlattenedTree(node);
  chunk007.axe._selectorData = chunk010.getSelectorData(chunk007.axe._tree);

  return chunk007.axe._tree[0];
}

// @deprecated
const naReporter = (results, options, callback) => {
  console.warn(
    '"na" reporter will be deprecated in axe v4.0. Use the "v2" reporter instead.'
  );
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const { environmentData, ...toolOptions } = options;
  callback({
    ...chunk012.getEnvironmentData(environmentData),
    toolOptions,
    ...chunk018.processAggregate(results, options)
  });
};

const noPassesReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  // limit result processing to types we want to include in the output
  options.resultTypes = ['violations'];

  const { violations } = chunk018.processAggregate(results, options);

  callback({
    ...chunk012.getEnvironmentData(environmentData),
    toolOptions,
    violations
  });
};

const rawReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Guard against tests which don't pass an array as the first param here.
  if (!results || !Array.isArray(results)) {
    return callback(results);
  }

  const transformedResults = results.map(result => {
    const transformedResult = { ...result };
    const types = ['passes', 'violations', 'incomplete', 'inapplicable'];
    for (const type of types) {
      transformedResult[type] = chunk011.nodeSerializer.mapRawNodeResults(
        transformedResult[type]
      );
    }

    return transformedResult;
  });

  callback(transformedResults);
};

const rawEnvReporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  rawReporter(results, toolOptions, raw => {
    const env = chunk012.getEnvironmentData(environmentData);
    callback({ raw, env });
  });
};

const v1Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  const out = chunk018.processAggregate(results, options);

  const addFailureSummaries = result => {
    result.nodes.forEach(nodeResult => {
      nodeResult.failureSummary = chunk012.failureSummary(nodeResult);
    });
  };

  out.incomplete.forEach(addFailureSummaries);
  out.violations.forEach(addFailureSummaries);

  callback({
    ...chunk012.getEnvironmentData(environmentData),
    toolOptions,
    ...out
  });
};

const v2Reporter = (results, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  const { environmentData, ...toolOptions } = options;
  const out = chunk018.processAggregate(results, options);
  callback({
    ...chunk012.getEnvironmentData(environmentData),
    toolOptions,
    ...out
  });
};

chunk007.axe._thisWillBeDeletedDoNotUse = chunk027._thisWillBeDeletedDoNotUse;

chunk007.axe.constants = chunk007.constants;
chunk007.axe.log = chunk011.log;

chunk007.axe.AbstractVirtualNode = chunk007.AbstractVirtualNode;
chunk007.axe.SerialVirtualNode = chunk027.SerialVirtualNode;
chunk007.axe.VirtualNode = chunk018.VirtualNode;
chunk007.axe._cache = chunk007.cache;

chunk007.axe.imports = chunk010.imports;

chunk007.axe.cleanup = chunk027.cleanup;
chunk007.axe.configure = chunk027.configure;
chunk007.axe.frameMessenger = chunk027.frameMessenger;
chunk007.axe.getRules = chunk027.getRules;
chunk007.axe._load = chunk027.load;
chunk007.axe.plugins = {};
chunk007.axe.registerPlugin = chunk027.registerPlugin;
chunk007.axe.hasReporter = chunk027.hasReporter;
chunk007.axe.getReporter = chunk027.getReporter;
chunk007.axe.addReporter = chunk027.addReporter;
chunk007.axe.reset = chunk027.reset;
chunk007.axe._runRules = chunk027.runRules;
chunk007.axe.runVirtualRule = chunk027.runVirtualRule;
chunk007.axe.run = run;
chunk007.axe.setup = setup;
chunk007.axe.teardown = chunk027.teardown;
chunk007.axe.runPartial = chunk027.runPartial;
chunk007.axe.finishRun = chunk027.finishRun;

chunk007.axe.commons = chunk024.commons;
chunk007.axe.utils = chunk018.utils;

chunk007.axe.addReporter('na', naReporter);
chunk007.axe.addReporter('no-passes', noPassesReporter);
chunk007.axe.addReporter('rawEnv', rawEnvReporter);
chunk007.axe.addReporter('raw', rawReporter);
chunk007.axe.addReporter('v1', v1Reporter);
chunk007.axe.addReporter('v2', v2Reporter, true);
