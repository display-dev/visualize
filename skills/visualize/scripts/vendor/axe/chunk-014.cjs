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
const chunk013 = require('./chunk-013.cjs');
const chunk012 = require('./chunk-012.cjs');
const chunk011 = require('./chunk-011.cjs');

// Spelled incorrectly intentionally (backwards compatibility).
function pollyfillElementsFromPoint() {
  if (document.elementsFromPoint) return document.elementsFromPoint;
  if (document.msElementsFromPoint) return document.msElementsFromPoint;

  const usePointer = (function () {
    const element = document.createElement('x');
    element.style.cssText = 'pointer-events:auto';
    return element.style.pointerEvents === 'auto';
  })();

  const cssProp = usePointer ? 'pointer-events' : 'visibility';
  const cssDisableVal = usePointer ? 'none' : 'hidden';

  const style = document.createElement('style');
  style.innerHTML = usePointer
    ? '* { pointer-events: all }'
    : '* { visibility: visible }';

  return function (x, y) {
    let current, i, d;
    const elements = [];
    const previousPointerEvents = [];

    // startup
    document.head.appendChild(style);

    while (
      (current = document.elementFromPoint(x, y)) &&
      elements.indexOf(current) === -1
    ) {
      // push the element and its current style
      elements.push(current);

      previousPointerEvents.push({
        value: current.style.getPropertyValue(cssProp),
        priority: current.style.getPropertyPriority(cssProp)
      });

      // add "pointer-events: none", to get to the underlying element
      current.style.setProperty(cssProp, cssDisableVal, 'important');
    }

    // Due to negative index, documentElement could actually not be the last,
    // so we'll simply move it to the end
    if (elements.indexOf(document.documentElement) < elements.length - 1) {
      elements.splice(elements.indexOf(document.documentElement), 1);
      elements.push(document.documentElement);
    }

    // restore the previous pointer-events values
    for (
      i = previousPointerEvents.length;
      !!(d = previousPointerEvents[--i]);
    ) {
      elements[i].style.setProperty(
        cssProp,
        d.value ? d.value : '',
        d.priority
      );
    }

    // teardown;
    document.head.removeChild(style);

    return elements;
  };
}

if (typeof window.addEventListener === 'function') {
  document.elementsFromPoint = pollyfillElementsFromPoint();
}

/**
 * Creates an array without duplicate values from 2 array inputs
 * @param {Array} arr1 First array
 * @param {Array} arr2 Second array
 * @return {Array}
 */
function uniqueArray(arr1, arr2) {
  return arr1.concat(arr2).filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
}

function createLocalVariables(
  vNodes,
  anyLevel,
  thisLevel,
  parentShadowId,
  recycledLocalVariable
) {
  const retVal = recycledLocalVariable || {};

  retVal.vNodes = vNodes;
  retVal.vNodesIndex = 0;
  retVal.anyLevel = anyLevel;
  retVal.thisLevel = thisLevel;
  retVal.parentShadowId = parentShadowId;

  return retVal;
}

function matchExpressions(domTree, expressions, filter) {
  /**
   * Allocating new objects in createLocalVariables is quite expensive given
   * that matchExpressions is in the hot path.
   *
   * Keep track of previously allocated objects to avoid useless allocations
   * and garbage collection. This is intentionally shared between calls of
   * matchExpressions.
   */
  const recycledLocalVariables = chunk007.cache.get(
    'qsa.recycledLocalVariables',
    () => []
  );

  const stack = [];
  const vNodes = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = createLocalVariables(
    vNodes,
    expressions,
    null,
    domTree[0].shadowId,
    recycledLocalVariables.pop()
  );
  const result = [];

  while (currentLevel.vNodesIndex < currentLevel.vNodes.length) {
    const vNode = currentLevel.vNodes[currentLevel.vNodesIndex++];
    let childOnly = null; // we will add hierarchical '>' selectors here
    let childAny = null;
    const combinedLength =
      (currentLevel.anyLevel?.length || 0) +
      (currentLevel.thisLevel?.length || 0);
    let added = false;
    // see if node matches
    for (let i = 0; i < combinedLength; i++) {
      const exp =
        i < (currentLevel.anyLevel?.length || 0)
          ? currentLevel.anyLevel[i]
          : currentLevel.thisLevel[i - (currentLevel.anyLevel?.length || 0)];
      if (
        (!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
        chunk011.matchesExpression(vNode, exp[0])
      ) {
        if (exp.length === 1) {
          if (!added && (!filter || filter(vNode))) {
            result.push(vNode);
            added = true;
          }
        } else {
          const rest = exp.slice(1);
          if ([' ', '>'].includes(rest[0].combinator) === false) {
            throw new Error(
              'axe.utils.querySelectorAll does not support the combinator: ' +
                exp[1].combinator
            );
          }
          if (rest[0].combinator === '>') {
            // add the rest to the childOnly array
            (childOnly = childOnly || []).push(rest);
          } else {
            // add the rest to the childAny array
            (childAny = childAny || []).push(rest);
          }
        }
      }
      if (
        (!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
        currentLevel.anyLevel?.includes(exp)
      ) {
        (childAny = childAny || []).push(exp);
      }
    }

    if (vNode.children && vNode.children.length) {
      stack.push(currentLevel);
      currentLevel = createLocalVariables(
        vNode.children,
        childAny,
        childOnly,
        vNode.shadowId,
        recycledLocalVariables.pop()
      );
    }
    // check for "return"
    while (
      currentLevel.vNodesIndex === currentLevel.vNodes.length &&
      stack.length
    ) {
      recycledLocalVariables.push(currentLevel);
      currentLevel = stack.pop();
    }
  }
  return result;
}

/**
 * querySelectorAllFilter implements querySelectorAll on the virtual DOM with
 * ability to filter the returned nodes using an optional supplied filter function
 *
 * @method querySelectorAllFilter
 * @memberof axe.utils
 * @param {NodeList} domTree flattened tree collection to search
 * @param {String} selector String containing one or more CSS selectors separated by commas
 * @param {Function} filter function (optional)
 * @return {Array} Elements matched by any of the selectors and filtered by the filter function
 */
function querySelectorAllFilter(domTree, selector, filter) {
  domTree = Array.isArray(domTree) ? domTree : [domTree];
  const expressions = chunk011.convertSelector(selector);

  // see if the passed in node is the root node of the tree and can
  // find nodes using the cache rather than looping through the
  // the entire tree
  const nodes = chunk013.getNodesMatchingExpression(domTree, expressions, filter);
  if (nodes) {
    return nodes;
  }

  // if the selector cache is not set up or if not passed the
  // top level node we default back to parsing the whole tree
  return matchExpressions(domTree, expressions, filter);
}

/**
 * Given a rootNode - construct CSSOM
 * -> get all source nodes (document & document fragments) within given root node
 * -> recursively call `parseStylesheets` to resolve styles for each node
 *
 * @method preloadCssom
 * @memberof `axe.utils`
 * @param {Object} options composite options object
 * @property {Array<String>} options.assets array of preloaded assets requested, eg: [`cssom`]
 * @property {Number} options.timeout timeout
 * @property {Object} options.treeRoot (optional) the DOM tree to be inspected
 * @returns {Promise}
 */
// TODO: es-modules_tree
function preloadCssom({ treeRoot = chunk007.axe._tree[0] }) {
  /**
   * get all `document` and `documentFragment` with in given `tree`
   */
  const rootNodes = getAllRootNodesInTree(treeRoot);

  if (!rootNodes.length) {
    return Promise.resolve();
  }

  const dynamicDoc = document.implementation.createHTMLDocument(
    'Dynamic document for loading cssom'
  );

  const convertDataToStylesheet = chunk013.getStyleSheetFactory(dynamicDoc);

  return getCssomForAllRootNodes(rootNodes, convertDataToStylesheet).then(
    assets => flattenAssets(assets)
  );
}

/**
 * Returns am array of source nodes containing `document` and `documentFragment` in a given `tree`.
 *
 * @param {Object} treeRoot tree
 * @returns {Array<Object>} array of objects, which each object containing a root and an optional `shadowId`
 */
function getAllRootNodesInTree(tree) {
  const ids = [];

  const rootNodes = querySelectorAllFilter(tree, '*', node => {
    if (ids.includes(node.shadowId)) {
      return false;
    }
    ids.push(node.shadowId);
    return true;
  }).map(node => {
    return {
      shadowId: node.shadowId,
      rootNode: chunk012.getRootNode(node.actualNode)
    };
  });

  return uniqueArray(rootNodes, []);
}

/**
 * Process CSSOM on all root nodes
 *
 * @param {Array<Object>} rootNodes array of root nodes, where node  is an enhanced `document` or `documentFragment` object returned from `getAllRootNodesInTree`
 * @param {Function} convertDataToStylesheet fn to convert given data to Stylesheet object
 * @returns {Promise}
 */
function getCssomForAllRootNodes(rootNodes, convertDataToStylesheet) {
  const promises = [];

  rootNodes.forEach(({ rootNode, shadowId }, index) => {
    const sheets = getStylesheetsOfRootNode(
      rootNode,
      shadowId,
      convertDataToStylesheet
    );
    if (!sheets) {
      return Promise.all(promises);
    }

    const rootIndex = index + 1;
    const parseOptions = {
      rootNode,
      shadowId,
      convertDataToStylesheet,
      rootIndex
    };
    /**
     * Note:
     * `importedUrls` - keeps urls of already imported stylesheets, to prevent re-fetching
     * eg: nested, cyclic or cross referenced `@import` urls
     */
    const importedUrls = [];

    const p = Promise.all(
      sheets.map((sheet, sheetIndex) => {
        const priority = [rootIndex, sheetIndex];

        return chunk013.parseStylesheet(sheet, parseOptions, priority, importedUrls);
      })
    );

    promises.push(p);
  });

  return Promise.all(promises);
}

/**
 * Flatten CSSOM assets
 *
 * @param {Array.<Object[]>} assets nested assets (varying depth)
 * @returns {Array<Object>} Array of CSSOM object
 */
function flattenAssets(assets) {
  return assets.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenAssets(val)) : acc.concat(val),
    []
  );
}

/**
 * Get stylesheet(s) for root
 *
 * @param {Object} options.rootNode `document` or `documentFragment`
 * @param {String} options.shadowId an id if undefined denotes that given root is a document fragment/ shadowDOM
 * @param {Function} options.convertDataToStylesheet a utility function to generate a style sheet from given data (text)
 * @returns {Array<Object>} an array of stylesheets
 */
function getStylesheetsOfRootNode(rootNode, shadowId, convertDataToStylesheet) {
  let sheets;

  // nodeType === 11  -> DOCUMENT_FRAGMENT
  if (rootNode.nodeType === 11 && shadowId) {
    sheets = getStylesheetsFromDocumentFragment(
      rootNode,
      convertDataToStylesheet
    );
  } else {
    sheets = getStylesheetsFromDocument(rootNode);
  }

  return filterStylesheetsWithSameHref(sheets);
}

/**
 * Get stylesheets from `documentFragment`
 *
 * @property {Object} options.rootNode `documentFragment`
 * @property {Function} options.convertDataToStylesheet a utility function to generate a stylesheet from given data
 * @returns {Array<Object>}
 */
function getStylesheetsFromDocumentFragment(rootNode, convertDataToStylesheet) {
  return (
    Array.from(rootNode.children)
      .filter(filerStyleAndLinkAttributesInDocumentFragment)
      // Reducer to convert `<style></style>` and `<link>` references to `CSSStyleSheet` object
      .reduce((out, node) => {
        const nodeName = node.nodeName.toUpperCase();
        const data = nodeName === 'STYLE' ? node.textContent : node;
        const isLink = nodeName === 'LINK';
        const stylesheet = convertDataToStylesheet({
          data,
          isLink,
          root: rootNode
        });
        // prevent error in jsdom with style elements not having a `sheet` property
        // @see https://github.com/jsdom/jsdom/issues/3179
        if (stylesheet.sheet) {
          out.push(stylesheet.sheet);
        }
        return out;
      }, [])
  );
}

/**
 * Get stylesheets from `document`
 * -> filter out stylesheet that are `media=print`
 *
 * @param {Object} rootNode `document`
 * @returns {Array<Object>}
 */
function getStylesheetsFromDocument(rootNode) {
  return Array.from(rootNode.styleSheets).filter(sheet => {
    if (!sheet.media) {
      return false;
    }

    return filterMediaIsPrint(sheet.media.mediaText);
  });
}

/**
 * Get all `<style></style>` and `<link>` attributes
 * -> limit to only `style` or `link` attributes with `rel=stylesheet` and `media != print`
 *
 * @param {Object} node HTMLElement
 * @returns {Boolean}
 */
function filerStyleAndLinkAttributesInDocumentFragment(node) {
  const nodeName = node.nodeName.toUpperCase();
  const linkHref = node.getAttribute('href');
  const linkRel = node.getAttribute('rel');
  const isLink =
    nodeName === 'LINK' &&
    linkHref &&
    linkRel &&
    node.rel.toUpperCase().includes('STYLESHEET');
  const isStyle = nodeName === 'STYLE';
  return isStyle || (isLink && filterMediaIsPrint(node.media));
}

/**
 * Exclude `link[rel='stylesheet]` attributes where `media=print`
 *
 * @param {String} media media value eg: 'print'
 * @returns {Boolean}
 */
function filterMediaIsPrint(media) {
  if (!media) {
    return true;
  }
  return !media.toUpperCase().includes('PRINT');
}

/**
 * Exclude any duplicate `stylesheets`, that share the same `href`
 *
 * @param {Array<Object>} sheets stylesheets
 * @returns {Array<Object>}
 */
function filterStylesheetsWithSameHref(sheets) {
  const hrefs = [];
  return sheets.filter(sheet => {
    if (!sheet.href) {
      // include sheets without `href`
      return true;
    }
    // if `href` is present, ensure they are not duplicates
    if (hrefs.includes(sheet.href)) {
      return false;
    }
    hrefs.push(sheet.href);
    return true;
  });
}

/**
 * Given a rootNode
 * -> get all HTMLMediaElement's and ensure their metadata is loaded
 *
 * @method preloadMedia
 * @memberof axe.utils
 * @property {Object} options.treeRoot (optional) the DOM tree to be inspected
 */
// TODO: es-modules_tree
function preloadMedia({ treeRoot = chunk007.axe._tree[0] }) {
  const mediaVirtualNodes = querySelectorAllFilter(
    treeRoot,
    /**
     * Only concern ourselves with media that autoplays as the no-autoplay-audio rule
     * is the only rule that uses this information
     */
    'video[autoplay], audio[autoplay]',
    ({ actualNode }) => {
      /**
       * Ignore media that won't load no matter how long we wait (i.e. preload=none).
       *
       * Although the spec says that the autoplay attribute can override the preload
       * attribute, it depends on the browser settings (if autoplay is allowed) and
       * operating system (e.g. Android does not preload autoplay media even when
       * autoplay is allowed).
       *
       * We can identify preload=none media that won't load if the networkState is
       * idle and the readyState is 0. If the browser is currently loading the media
       * (networkState) or if the media is already loaded (readyState) that means the
       * preload attribute was ignored.
       *
       * @see https://github.com/dequelabs/axe-core/issues/4665
       * @see https://html.spec.whatwg.org/multipage/media.html#attr-media-preload
       */
      if (
        actualNode.preload === 'none' &&
        actualNode.readyState === 0 &&
        actualNode.networkState !== actualNode.NETWORK_LOADING
      ) {
        return false;
      }

      /**
       * Ignore media nodes which are `paused` or `muted` as the no-autoplay-audio
       * rule matcher ignores them
       */
      if (
        actualNode.hasAttribute('paused') ||
        actualNode.hasAttribute('muted')
      ) {
        return false;
      }

      /**
       * This is to safe-gaurd against empty `src` values which can get resolved `window.location`, thus never preloading as the URL is not a media asset
       */
      if (actualNode.hasAttribute('src')) {
        return !!actualNode.getAttribute('src');
      }

      /**
       * The `src` on <source> element is essential for `audio` and `video` elements
       */
      const sourceWithSrc = Array.from(
        actualNode.getElementsByTagName('source')
      ).filter(source => !!source.getAttribute('src'));
      if (sourceWithSrc.length <= 0) {
        return false;
      }

      return true;
    }
  );

  return Promise.all(
    mediaVirtualNodes.map(({ actualNode }) => isMediaElementReady(actualNode))
  );
}

/**
 * Ensures a media element's metadata is loaded
 * @param {HTMLMediaElement} elm elm
 * @returns {Promise}
 */
function isMediaElementReady(elm) {
  return new Promise(resolve => {
    /**
     * See - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
     */
    if (elm.readyState > 0) {
      resolve(elm);
    }

    function onMediaReady() {
      elm.removeEventListener('loadedmetadata', onMediaReady);
      resolve(elm);
    }

    /**
     * Given media is not ready, wire up listener for `loadedmetadata`
     * See - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
     */
    elm.addEventListener('loadedmetadata', onMediaReady);
  });
}

/**
 * Returns a Promise with results of all requested preload(able) assets. eg: ['cssom'].
 *
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object} Promise
 */
function preload(options) {
  const preloadFunctionsMap = {
    cssom: preloadCssom,
    media: preloadMedia
  };

  if (!shouldPreload(options)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const { assets, timeout } = getPreloadConfig(options);

    /**
     * Start `timeout` timer for preloading assets
     * -> reject if allowed time expires.
     */
    const preloadTimeout = setTimeout(
      () => reject(new Error(`Preload assets timed out.`)),
      timeout
    );

    /**
     * Fetch requested `assets`
     */
    Promise.all(
      assets.map(asset =>
        preloadFunctionsMap[asset](options).then(results => {
          return {
            [asset]: results
          };
        })
      )
    )
      .then(results => {
        /**
         * Combine array of results into an object map
         *
         * From ->
         *  [{cssom: [...], aom: [...]}]
         * To ->
         *  {
         *    cssom: [...]
         *    aom: [...]
         *  }
         */
        const preloadAssets = results.reduce((out, result) => {
          return {
            ...out,
            ...result
          };
        }, {});

        clearTimeout(preloadTimeout);
        resolve(preloadAssets);
      })
      .catch(err => {
        clearTimeout(preloadTimeout);
        reject(err);
      });
  });
}

/**
 * Validated the preload object
 * @param {Object | boolean} preloadObj configuration object or boolean passed via the options parameter to axe.run
 * @return {boolean}
 * @private
 */
function isValidPreloadObject(preloadObj) {
  return typeof preloadObj === 'object' && Array.isArray(preloadObj.assets);
}

/**
 * Returns a boolean which decides if preload is configured
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {boolean} defaults to true
 */
function shouldPreload(options) {
  if (!options || options.preload === undefined || options.preload === null) {
    return true; // by default `preload` requested assets eg: ['cssom']
  }
  if (typeof options.preload === 'boolean') {
    return options.preload;
  }
  return isValidPreloadObject(options.preload);
}

/**
 * Constructs a configuration object representing the preload requested assets & timeout
 * @param {Object} options run configuration options (or defaults) passed via axe.run
 * @return {Object} configuration
 */
function getPreloadConfig(options) {
  const { assets, timeout } = chunk007.constants.preload;
  const config = {
    assets,
    timeout
  };

  // if no `preload` is configured via `options` - return default config
  if (!options.preload) {
    return config;
  }

  // if type is boolean
  if (typeof options.preload === 'boolean') {
    return config;
  }

  // check if requested assets to preload are valid items
  const areRequestedAssetsValid = options.preload.assets.every(a =>
    assets.includes(a.toLowerCase())
  );

  if (!areRequestedAssetsValid) {
    throw new Error(
      `Requested assets, not supported. ` +
        `Supported assets are: ${assets.join(', ')}.`
    );
  }

  // unique assets to load, in case user had requested same asset type many times.
  config.assets = uniqueArray(
    options.preload.assets.map(a => a.toLowerCase()),
    []
  );

  if (
    options.preload.timeout &&
    typeof options.preload.timeout === 'number' &&
    !isNaN(options.preload.timeout)
  ) {
    config.timeout = options.preload.timeout;
  }
  return config;
}

/**
 * querySelectorAll implementation that operates on the flattened tree (supports shadow DOM)
 * @method querySelectorAll
 * @memberof axe.utils
 * @param	{NodeList} domTree flattened tree collection to search
 * @param	{String} selector String containing one or more CSS selectors separated by commas
 * @return {NodeList} Elements matched by any of the selectors
 */
function querySelectorAll(domTree, selector) {
  return querySelectorAllFilter(domTree, selector);
}

/**
 * Check if a rule matches the value of runOnly type=tag
 * @private
 * @param  {object} rule
 * @param  {object}	runOnly Value of runOnly with type=tags
 * @return {bool}
 */
function matchTags(rule, runOnly) {
  let include, exclude;
  const defaultExclude =
    // TODO: es-modules_audit
    chunk007.axe._audit && chunk007.axe._audit.tagExclude ? chunk007.axe._audit.tagExclude : [];

  // normalize include/exclude
  if (runOnly.hasOwnProperty('include') || runOnly.hasOwnProperty('exclude')) {
    // Wrap include and exclude if it's not already an array
    include = runOnly.include || [];
    include = Array.isArray(include) ? include : [include];

    exclude = runOnly.exclude || [];
    exclude = Array.isArray(exclude) ? exclude : [exclude];
    // add defaults, unless mentioned in include
    exclude = exclude.concat(
      defaultExclude.filter(tag => {
        return include.indexOf(tag) === -1;
      })
    );

    // Otherwise, only use the include value, ignore exclude
  } else {
    include = Array.isArray(runOnly) ? runOnly : [runOnly];
    // exclude the defaults not included
    exclude = defaultExclude.filter(tag => {
      return include.indexOf(tag) === -1;
    });
  }

  const matching = include.some(tag => {
    return rule.tags.indexOf(tag) !== -1;
  });
  if (matching || (include.length === 0 && rule.enabled !== false)) {
    return exclude.every(tag => {
      return rule.tags.indexOf(tag) === -1;
    });
  } else {
    return false;
  }
}

/**
 * Determines whether a rule should run
 * @param  {Rule}    rule     The rule to test
 * @param  {Context} context  The context of the Audit
 * @param  {Object}  options  Options object
 * @return {Boolean}
 */
function ruleShouldRun(rule, context, options) {
  const runOnly = options.runOnly || {};
  const ruleOptions = (options.rules || {})[rule.id];

  // Never run page level rules if the context is not on the page
  if (rule.pageLevel && !context.page) {
    return false;

    // First, runOnly type rule overrides anything else
  } else if (runOnly.type === 'rule') {
    return runOnly.values.indexOf(rule.id) !== -1;

    // Second, if options.rules[rule].enabled is set, it overrides all
  } else if (ruleOptions && typeof ruleOptions.enabled === 'boolean') {
    return ruleOptions.enabled;

    // Third, if tags are set, look at those
  } else if (runOnly.type === 'tag' && runOnly.values) {
    return matchTags(rule, runOnly.values);

    // If nothing is set, only check for default excludes
  } else {
    return matchTags(rule, []);
  }
}

/**
 * Selects elements which match `selector` that are included and excluded via the `Context` object
 * @param  {String} selector  CSS selector of the HTMLElements to select
 * @param  {Context} context  The "resolved" context object, @see Context
 * @return {Array}            Matching virtual DOM nodes sorted by DOM order
 */
function select(selector, context) {
  let result = [];
  let candidate;
  if (chunk007.axe._selectCache) {
    // if used outside of run, it will still work
    for (let j = 0, l = chunk007.axe._selectCache.length; j < l; j++) {
      // First see whether the item exists in the cache
      const item = chunk007.axe._selectCache[j];
      if (item.selector === selector) {
        return item.result;
      }
    }
  }

  const outerIncludes = getOuterIncludes(context.include);
  const isInContext = getContextFilter(context);
  for (let i = 0; i < outerIncludes.length; i++) {
    candidate = outerIncludes[i];
    const nodes = querySelectorAllFilter(candidate, selector, isInContext);
    result = mergeArrayUniques(result, nodes);
  }
  if (chunk007.axe._selectCache) {
    chunk007.axe._selectCache.push({
      selector: selector,
      result: result
    });
  }
  return result;
}

/**
 * reduces the includes list to only the outermost includes
 * @private
 * @param {Array} the array of include nodes
 * @return {Array} the modified array of nodes
 */
function getOuterIncludes(includes) {
  return includes.reduce((res, el) => {
    if (!res.length || !chunk011.contains(res[res.length - 1], el)) {
      res.push(el);
    }
    return res;
  }, []);
}

/**
 * Return a filter method to test if a node is in context; or
 *  null if the node is always included.
 * @private
 * @param {Context}
 * @return {Function|null}
 */
function getContextFilter(context) {
  // Since we're starting from included nodes,
  // if nothing is excluded, we can skip the filter step.
  if (!context.exclude || context.exclude.length === 0) {
    return null;
  }
  return node => chunk013.isNodeInContext(node, context);
}

/**
 * Merge the unique items from Array 1 into 2, or from 2 into 1 (whichever is longest)
 * @private
 * @param  {Array} Arr1
 * @param  {Array} Arr2
 */
function mergeArrayUniques(arr1, arr2) {
  if (arr1.length === 0) {
    return arr2;
  }
  if (arr1.length < arr2.length) {
    // switch so the comparison is shortest
    const temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }
  for (let i = 0, l = arr2.length; i < l; i++) {
    if (!arr1.includes(arr2[i])) {
      arr1.push(arr2[i]);
    }
  }
  return arr1;
}

/**
 * Serializes an error to a JSON object
 * @param e - The error to serialize
 * @returns A JSON object representing the error
 */
function serializeError(err, iteration = 0) {
  if (typeof err !== 'object' || err === null) {
    return { message: String(err) };
  }
  const serial = {};
  for (const prop of chunk007.constants.serializableErrorProps) {
    if (['string', 'number', 'boolean'].includes(typeof err[prop])) {
      serial[prop] = err[prop];
    }
  }
  // Recursively serialize cause up to 10 levels deep
  if (err.cause) {
    serial.cause =
      iteration < 10 ? serializeError(err.cause, iteration + 1) : '...';
  }
  return serial;
}

class RuleError extends Error {
  constructor({ error, ruleId, method, errorNode }) {
    super();
    this.name = error.name ?? 'RuleError';
    this.message = error.message;
    this.stack = error.stack;
    if (error.cause) {
      this.cause = serializeError(error.cause);
    }
    if (ruleId) {
      this.ruleId = ruleId;
      this.message += ` Skipping ${this.ruleId} rule.`;
    }
    if (method) {
      this.method = method;
    }
    if (errorNode) {
      this.errorNode = errorNode;
    }
  }
}

/**
 * set the scroll position of an element
 */
function setScroll(elm, top, left) {
  if (elm === window) {
    return elm.scroll(left, top);
  } else {
    elm.scrollTop = top;
    elm.scrollLeft = left;
  }
}

/**
 * set the scroll position of all items in the scrollState array
 * @deprecated
 */
function setScrollState(scrollState) {
  scrollState.forEach(({ elm, top, left }) => setScroll(elm, top, left));
}

/**
 * Find the first element to match a selector.
 * Use an array of selectors to reach into shadow DOM trees
 *
 * @param {string|string[]} selector String or array of strings with a CSS selector
 * @param {Document} doc Optional document node
 * @returns {Element|Null}
 */
function shadowSelect(selectors) {
  // Spread to avoid mutating the input
  const selectorArr = Array.isArray(selectors) ? [...selectors] : [selectors];
  return selectRecursive(selectorArr, document);
}

/* Find an element in shadow or light DOM trees, using an axe selector */
function selectRecursive(selectors, doc) {
  const selectorStr = selectors.shift();
  const elm = selectorStr ? doc.querySelector(selectorStr) : null;
  if (selectors.length === 0) {
    return elm;
  }
  if (!elm?.shadowRoot) {
    return null;
  }
  return selectRecursive(selectors, elm.shadowRoot);
}

/**
 * Find elements to match a selector.
 * Use an array of selectors to reach into shadow DOM trees
 *
 * @param {string|string[]} selector String or array of strings with a CSS selector
 * @param {Document} doc Optional document node
 * @returns {Node[]}
 */
function shadowSelectAll(selectors, doc = document) {
  // Spread to avoid mutating the input
  const selectorArr = Array.isArray(selectors) ? [...selectors] : [selectors];
  if (selectors.length === 0) {
    return [];
  }
  return selectAllRecursive(selectorArr, doc);
}

/* Find elements in shadow or light DOM trees, using an array of selectors */
function selectAllRecursive([selectorStr, ...restSelector], doc) {
  const elms = doc.querySelectorAll(selectorStr);
  if (restSelector.length === 0) {
    return Array.from(elms);
  }
  const selected = [];
  for (const elm of elms) {
    if (elm?.shadowRoot) {
      selected.push(...selectAllRecursive(restSelector, elm.shadowRoot));
    }
  }
  return selected;
}

/**
 * Returns array of valid input type values
 * @method validInputTypes
 * @memberof axe.utils
 * @return {Array<Sting>}
 */
function validInputTypes() {
  // Reference - https://html.spec.whatwg.org/multipage/input.html#the-input-element
  return [
    'hidden',
    'text',
    'search',
    'tel',
    'url',
    'email',
    'password',
    'date',
    'month',
    'week',
    'time',
    'datetime-local',
    'number',
    'range',
    'color',
    'checkbox',
    'radio',
    'file',
    'submit',
    'image',
    'reset',
    'button'
  ];
}

exports.RuleError = RuleError;
exports.getPreloadConfig = getPreloadConfig;
exports.pollyfillElementsFromPoint = pollyfillElementsFromPoint;
exports.preload = preload;
exports.preloadCssom = preloadCssom;
exports.preloadMedia = preloadMedia;
exports.querySelectorAll = querySelectorAll;
exports.querySelectorAllFilter = querySelectorAllFilter;
exports.ruleShouldRun = ruleShouldRun;
exports.select = select;
exports.serializeError = serializeError;
exports.setScrollState = setScrollState;
exports.shadowSelect = shadowSelect;
exports.shadowSelectAll = shadowSelectAll;
exports.shouldPreload = shouldPreload;
exports.uniqueArray = uniqueArray;
exports.validInputTypes = validInputTypes;
