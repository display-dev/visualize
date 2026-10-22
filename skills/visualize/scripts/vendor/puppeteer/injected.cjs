var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/puppeteer-core/lib/puppeteer/injected/injected.js
var injected_exports = {};
__export(injected_exports, {
  default: () => injected_default
});
module.exports = __toCommonJS(injected_exports);

// node_modules/puppeteer-core/lib/puppeteer/common/Errors.js
/**
 * @license
 * Copyright 2018 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var PuppeteerError = class extends Error {
  /**
   * @internal
   */
  constructor(message, options) {
    super(message, options);
    this.name = this.constructor.name;
  }
  /**
   * @internal
   */
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var TimeoutError = class extends PuppeteerError {
};

// node_modules/puppeteer-core/lib/puppeteer/util/Deferred.js
/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var Deferred = class _Deferred {
  static create(opts) {
    return new _Deferred(opts);
  }
  static async race(awaitables) {
    const deferredWithTimeout = /* @__PURE__ */ new Set();
    try {
      const promises = awaitables.map((value) => {
        if (value instanceof _Deferred) {
          if (value.#timeoutId) {
            deferredWithTimeout.add(value);
          }
          return value.valueOrThrow();
        }
        return value;
      });
      return await Promise.race(promises);
    } finally {
      for (const deferred of deferredWithTimeout) {
        deferred.reject(new Error("Timeout cleared"));
      }
    }
  }
  #isResolved = false;
  #isRejected = false;
  #value;
  // SAFETY: This is ensured by #taskPromise.
  #resolve;
  // TODO: Switch to Promise.withResolvers with Node 22
  #taskPromise = new Promise((resolve) => {
    this.#resolve = resolve;
  });
  #timeoutId;
  #timeoutError;
  constructor(opts) {
    if (opts && opts.timeout > 0) {
      this.#timeoutError = new TimeoutError(opts.message);
      this.#timeoutId = setTimeout(() => {
        this.reject(this.#timeoutError);
      }, opts.timeout);
    }
  }
  #finish(value) {
    clearTimeout(this.#timeoutId);
    this.#value = value;
    this.#resolve();
  }
  resolve(value) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isResolved = true;
    this.#finish(value);
  }
  reject(error) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isRejected = true;
    this.#finish(error);
  }
  resolved() {
    return this.#isResolved;
  }
  finished() {
    return this.#isResolved || this.#isRejected;
  }
  value() {
    return this.#value;
  }
  #promise;
  valueOrThrow() {
    if (!this.#promise) {
      this.#promise = (async () => {
        await this.#taskPromise;
        if (this.#isRejected) {
          throw this.#value;
        }
        return this.#value;
      })();
    }
    return this.#promise;
  }
};

// node_modules/puppeteer-core/lib/puppeteer/util/Function.js
/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var createdFunctions = /* @__PURE__ */ new Map();
var createFunction = (functionValue) => {
  let fn = createdFunctions.get(functionValue);
  if (fn) {
    return fn;
  }
  fn = new Function(`return ${functionValue}`)();
  createdFunctions.set(functionValue, fn);
  return fn;
};

// node_modules/puppeteer-core/lib/puppeteer/injected/ARIAQuerySelector.js
var ARIAQuerySelector_exports = {};
__export(ARIAQuerySelector_exports, {
  ariaQuerySelector: () => ariaQuerySelector,
  ariaQuerySelectorAll: () => ariaQuerySelectorAll
});
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var ariaQuerySelector = (root, selector) => {
  return globalThis.__ariaQuerySelector(root, selector);
};
var ariaQuerySelectorAll = async function* (root, selector) {
  yield* await globalThis.__ariaQuerySelectorAll(root, selector);
};

// node_modules/puppeteer-core/lib/puppeteer/injected/CSSSelector.js
var CSSSelector_exports = {};
__export(CSSSelector_exports, {
  cssQuerySelector: () => cssQuerySelector,
  cssQuerySelectorAll: () => cssQuerySelectorAll
});
/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var cssQuerySelector = (root, selector) => {
  return root.querySelector(selector);
};
var cssQuerySelectorAll = function(root, selector) {
  return root.querySelectorAll(selector);
};

// node_modules/puppeteer-core/lib/puppeteer/injected/CustomQuerySelector.js
var CustomQuerySelector_exports = {};
__export(CustomQuerySelector_exports, {
  customQuerySelectors: () => customQuerySelectors
});
/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var CustomQuerySelectorRegistry = class {
  #selectors = /* @__PURE__ */ new Map();
  register(name, handler) {
    if (!handler.queryOne && handler.queryAll) {
      const querySelectorAll = handler.queryAll;
      handler.queryOne = (node, selector) => {
        for (const result of querySelectorAll(node, selector)) {
          return result;
        }
        return null;
      };
    } else if (handler.queryOne && !handler.queryAll) {
      const querySelector = handler.queryOne;
      handler.queryAll = (node, selector) => {
        const result = querySelector(node, selector);
        return result ? [result] : [];
      };
    } else if (!handler.queryOne || !handler.queryAll) {
      throw new Error("At least one query method must be defined.");
    }
    this.#selectors.set(name, {
      querySelector: handler.queryOne,
      querySelectorAll: handler.queryAll
    });
  }
  unregister(name) {
    this.#selectors.delete(name);
  }
  get(name) {
    return this.#selectors.get(name);
  }
  clear() {
    this.#selectors.clear();
  }
};
var customQuerySelectors = new CustomQuerySelectorRegistry();

// node_modules/puppeteer-core/lib/puppeteer/injected/PierceQuerySelector.js
var PierceQuerySelector_exports = {};
__export(PierceQuerySelector_exports, {
  pierceQuerySelector: () => pierceQuerySelector,
  pierceQuerySelectorAll: () => pierceQuerySelectorAll
});
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var pierceQuerySelector = (root, selector) => {
  let found = null;
  const search = (root2) => {
    const iter = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT);
    do {
      const currentNode = iter.currentNode;
      if (currentNode.shadowRoot) {
        search(currentNode.shadowRoot);
      }
      if (currentNode instanceof ShadowRoot) {
        continue;
      }
      if (currentNode !== root2 && !found && currentNode.matches(selector)) {
        found = currentNode;
      }
    } while (!found && iter.nextNode());
  };
  if (root instanceof Document) {
    root = root.documentElement;
  }
  search(root);
  return found;
};
var pierceQuerySelectorAll = (element, selector) => {
  const result = [];
  const collect = (root) => {
    const iter = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    do {
      const currentNode = iter.currentNode;
      if (currentNode.shadowRoot) {
        collect(currentNode.shadowRoot);
      }
      if (currentNode instanceof ShadowRoot) {
        continue;
      }
      if (currentNode !== root && currentNode.matches(selector)) {
        result.push(currentNode);
      }
    } while (iter.nextNode());
  };
  if (element instanceof Document) {
    element = element.documentElement;
  }
  collect(element);
  return result;
};

// node_modules/puppeteer-core/lib/puppeteer/util/assert.js
/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var assert = (value, message) => {
  if (!value) {
    throw new Error(message);
  }
};

// node_modules/puppeteer-core/lib/puppeteer/injected/Poller.js
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var MutationPoller = class {
  #fn;
  #root;
  #observer;
  #deferred;
  constructor(fn, root) {
    this.#fn = fn;
    this.#root = root;
  }
  async start() {
    const deferred = this.#deferred = Deferred.create();
    const result = await this.#fn();
    if (result) {
      deferred.resolve(result);
      return;
    }
    this.#observer = new MutationObserver(async () => {
      const result2 = await this.#fn();
      if (!result2) {
        return;
      }
      deferred.resolve(result2);
      await this.stop();
    });
    this.#observer.observe(this.#root, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }
  async stop() {
    assert(this.#deferred, "Polling never started.");
    if (!this.#deferred.finished()) {
      this.#deferred.reject(new Error("Polling stopped"));
    }
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = void 0;
    }
  }
  result() {
    assert(this.#deferred, "Polling never started.");
    return this.#deferred.valueOrThrow();
  }
};
var RAFPoller = class {
  #fn;
  #deferred;
  constructor(fn) {
    this.#fn = fn;
  }
  async start() {
    const deferred = this.#deferred = Deferred.create();
    const result = await this.#fn();
    if (result) {
      deferred.resolve(result);
      return;
    }
    const poll = async () => {
      if (deferred.finished()) {
        return;
      }
      const result2 = await this.#fn();
      if (!result2) {
        window.requestAnimationFrame(poll);
        return;
      }
      deferred.resolve(result2);
      await this.stop();
    };
    window.requestAnimationFrame(poll);
  }
  async stop() {
    assert(this.#deferred, "Polling never started.");
    if (!this.#deferred.finished()) {
      this.#deferred.reject(new Error("Polling stopped"));
    }
  }
  result() {
    assert(this.#deferred, "Polling never started.");
    return this.#deferred.valueOrThrow();
  }
};
var IntervalPoller = class {
  #fn;
  #ms;
  #interval;
  #deferred;
  constructor(fn, ms) {
    this.#fn = fn;
    this.#ms = ms;
  }
  async start() {
    const deferred = this.#deferred = Deferred.create();
    const result = await this.#fn();
    if (result) {
      deferred.resolve(result);
      return;
    }
    this.#interval = setInterval(async () => {
      const result2 = await this.#fn();
      if (!result2) {
        return;
      }
      deferred.resolve(result2);
      await this.stop();
    }, this.#ms);
  }
  async stop() {
    assert(this.#deferred, "Polling never started.");
    if (!this.#deferred.finished()) {
      this.#deferred.reject(new Error("Polling stopped"));
    }
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = void 0;
    }
  }
  result() {
    assert(this.#deferred, "Polling never started.");
    return this.#deferred.valueOrThrow();
  }
};

// node_modules/puppeteer-core/lib/puppeteer/injected/PQuerySelector.js
var PQuerySelector_exports = {};
__export(PQuerySelector_exports, {
  pQuerySelector: () => pQuerySelector,
  pQuerySelectorAll: () => pQuerySelectorAll
});

// node_modules/puppeteer-core/lib/puppeteer/util/AsyncIterableUtil.js
var AsyncIterableUtil = class {
  static async *map(iterable, map) {
    for await (const value of iterable) {
      yield await map(value);
    }
  }
  static async *flatMap(iterable, map) {
    for await (const value of iterable) {
      yield* map(value);
    }
  }
  static async collect(iterable) {
    const result = [];
    for await (const value of iterable) {
      result.push(value);
    }
    return result;
  }
  static async first(iterable) {
    for await (const value of iterable) {
      return value;
    }
    return;
  }
};

// node_modules/puppeteer-core/lib/puppeteer/injected/TextQuerySelector.js
var TextQuerySelector_exports = {};
__export(TextQuerySelector_exports, {
  textQuerySelectorAll: () => textQuerySelectorAll
});

// node_modules/puppeteer-core/lib/puppeteer/injected/TextContent.js
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var TRIVIAL_VALUE_INPUT_TYPES = /* @__PURE__ */ new Set(["checkbox", "image", "radio"]);
var isNonTrivialValueNode = (node) => {
  if (node instanceof HTMLSelectElement) {
    return true;
  }
  if (node instanceof HTMLTextAreaElement) {
    return true;
  }
  if (node instanceof HTMLInputElement && !TRIVIAL_VALUE_INPUT_TYPES.has(node.type)) {
    return true;
  }
  return false;
};
var UNSUITABLE_NODE_NAMES = /* @__PURE__ */ new Set(["SCRIPT", "STYLE"]);
var isSuitableNodeForTextMatching = (node) => {
  return !UNSUITABLE_NODE_NAMES.has(node.nodeName) && !document.head?.contains(node);
};
var textContentCache = /* @__PURE__ */ new WeakMap();
var eraseFromCache = (node) => {
  while (node) {
    textContentCache.delete(node);
    if (node instanceof ShadowRoot) {
      node = node.host;
    } else {
      node = node.parentNode;
    }
  }
};
var observedNodes = /* @__PURE__ */ new WeakSet();
var textChangeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    eraseFromCache(mutation.target);
  }
});
var createTextContent = (root) => {
  let value = textContentCache.get(root);
  if (value) {
    return value;
  }
  value = { full: "", immediate: [] };
  if (!isSuitableNodeForTextMatching(root)) {
    return value;
  }
  let currentImmediate = "";
  if (isNonTrivialValueNode(root)) {
    value.full = root.value;
    value.immediate.push(root.value);
    root.addEventListener("input", (event) => {
      eraseFromCache(event.target);
    }, { once: true, capture: true });
  } else {
    for (let child = root.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === Node.TEXT_NODE) {
        value.full += child.nodeValue ?? "";
        currentImmediate += child.nodeValue ?? "";
        continue;
      }
      if (currentImmediate) {
        value.immediate.push(currentImmediate);
      }
      currentImmediate = "";
      if (child.nodeType === Node.ELEMENT_NODE) {
        value.full += createTextContent(child).full;
      }
    }
    if (currentImmediate) {
      value.immediate.push(currentImmediate);
    }
    if (root instanceof Element && root.shadowRoot) {
      value.full += createTextContent(root.shadowRoot).full;
    }
    if (!observedNodes.has(root)) {
      textChangeObserver.observe(root, {
        childList: true,
        characterData: true,
        subtree: true
      });
      observedNodes.add(root);
    }
  }
  textContentCache.set(root, value);
  return value;
};

// node_modules/puppeteer-core/lib/puppeteer/injected/TextQuerySelector.js
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var textQuerySelectorAll = function* (root, selector) {
  let yielded = false;
  for (const node of root.childNodes) {
    if (node instanceof Element && isSuitableNodeForTextMatching(node)) {
      let matches;
      if (!node.shadowRoot) {
        matches = textQuerySelectorAll(node, selector);
      } else {
        matches = textQuerySelectorAll(node.shadowRoot, selector);
      }
      for (const match of matches) {
        yield match;
        yielded = true;
      }
    }
  }
  if (yielded) {
    return;
  }
  if (root instanceof Element && isSuitableNodeForTextMatching(root)) {
    const textContent = createTextContent(root);
    if (textContent.full.includes(selector)) {
      yield root;
    }
  }
};

// node_modules/puppeteer-core/lib/puppeteer/injected/util.js
var util_exports = {};
__export(util_exports, {
  checkVisibility: () => checkVisibility,
  pierce: () => pierce,
  pierceAll: () => pierceAll
});
/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var HIDDEN_VISIBILITY_VALUES = ["hidden", "collapse"];
var checkVisibility = (node, visible) => {
  if (!node) {
    return visible === false;
  }
  if (visible === void 0) {
    return node;
  }
  const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  const style = window.getComputedStyle(element);
  const isVisible = style && !HIDDEN_VISIBILITY_VALUES.includes(style.visibility) && !isBoundingBoxEmpty(element);
  return visible === isVisible ? node : false;
};
function isBoundingBoxEmpty(element) {
  const rect = element.getBoundingClientRect();
  return rect.width === 0 || rect.height === 0;
}
var hasShadowRoot = (node) => {
  return "shadowRoot" in node && node.shadowRoot instanceof ShadowRoot;
};
function* pierce(root) {
  if (hasShadowRoot(root)) {
    yield root.shadowRoot;
  } else {
    yield root;
  }
}
function* pierceAll(root) {
  root = pierce(root).next().value;
  yield root;
  const walkers = [document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)];
  for (const walker of walkers) {
    let node;
    while (node = walker.nextNode()) {
      if (!node.shadowRoot) {
        continue;
      }
      yield node.shadowRoot;
      walkers.push(document.createTreeWalker(node.shadowRoot, NodeFilter.SHOW_ELEMENT));
    }
  }
}

// node_modules/puppeteer-core/lib/puppeteer/injected/XPathQuerySelector.js
var XPathQuerySelector_exports = {};
__export(XPathQuerySelector_exports, {
  xpathQuerySelectorAll: () => xpathQuerySelectorAll
});
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var xpathQuerySelectorAll = function* (root, selector, maxResults = -1) {
  const doc = root.ownerDocument || document;
  const iterator = doc.evaluate(selector, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  const items = [];
  let item;
  while (item = iterator.iterateNext()) {
    items.push(item);
    if (maxResults && items.length === maxResults) {
      break;
    }
  }
  for (let i = 0; i < items.length; i++) {
    item = items[i];
    yield item;
    items[i] = null;
  }
};

// node_modules/puppeteer-core/lib/puppeteer/injected/PQuerySelector.js
/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var IDENT_TOKEN_START = /[-\w\P{ASCII}*]/u;
var isQueryableNode = (node) => {
  return "querySelectorAll" in node;
};
var PQueryEngine = class {
  #complexSelector;
  #compoundSelector = [];
  #selector = void 0;
  elements;
  constructor(element, complexSelector) {
    this.elements = [element];
    this.#complexSelector = complexSelector;
    this.#next();
  }
  async run() {
    if (typeof this.#selector === "string") {
      switch (this.#selector.trimStart()) {
        case ":scope":
          this.#next();
          break;
      }
    }
    for (; this.#selector !== void 0; this.#next()) {
      const selector = this.#selector;
      if (typeof selector === "string") {
        if (selector[0] && IDENT_TOKEN_START.test(selector[0])) {
          this.elements = AsyncIterableUtil.flatMap(this.elements, async function* (element) {
            if (isQueryableNode(element)) {
              yield* element.querySelectorAll(selector);
            }
          });
        } else {
          this.elements = AsyncIterableUtil.flatMap(this.elements, async function* (element) {
            if (!element.parentElement) {
              if (!isQueryableNode(element)) {
                return;
              }
              yield* element.querySelectorAll(selector);
              return;
            }
            let index = 0;
            for (const child of element.parentElement.children) {
              ++index;
              if (child === element) {
                break;
              }
            }
            yield* element.parentElement.querySelectorAll(`:scope>:nth-child(${index})${selector}`);
          });
        }
      } else {
        this.elements = AsyncIterableUtil.flatMap(this.elements, async function* (element) {
          switch (selector.name) {
            case "text":
              yield* textQuerySelectorAll(element, selector.value);
              break;
            case "xpath":
              yield* xpathQuerySelectorAll(element, selector.value);
              break;
            case "aria":
              yield* ariaQuerySelectorAll(element, selector.value);
              break;
            default:
              const querySelector = customQuerySelectors.get(selector.name);
              if (!querySelector) {
                throw new Error(`Unknown selector type: ${selector.name}`);
              }
              yield* querySelector.querySelectorAll(element, selector.value);
          }
        });
      }
    }
  }
  #next() {
    if (this.#compoundSelector.length !== 0) {
      this.#selector = this.#compoundSelector.shift();
      return;
    }
    if (this.#complexSelector.length === 0) {
      this.#selector = void 0;
      return;
    }
    const selector = this.#complexSelector.shift();
    switch (selector) {
      case ">>>>": {
        this.elements = AsyncIterableUtil.flatMap(this.elements, pierce);
        this.#next();
        break;
      }
      case ">>>": {
        this.elements = AsyncIterableUtil.flatMap(this.elements, pierceAll);
        this.#next();
        break;
      }
      default:
        this.#compoundSelector = selector;
        this.#next();
        break;
    }
  }
};
var DepthCalculator = class {
  #cache = /* @__PURE__ */ new WeakMap();
  calculate(node, depth = []) {
    if (node === null) {
      return depth;
    }
    if (node instanceof ShadowRoot) {
      node = node.host;
    }
    const cachedDepth = this.#cache.get(node);
    if (cachedDepth) {
      return [...cachedDepth, ...depth];
    }
    let index = 0;
    for (let prevSibling = node.previousSibling; prevSibling; prevSibling = prevSibling.previousSibling) {
      ++index;
    }
    const value = this.calculate(node.parentNode, [index]);
    this.#cache.set(node, value);
    return [...value, ...depth];
  }
};
var compareDepths = (a, b) => {
  if (a.length + b.length === 0) {
    return 0;
  }
  const [i = -1, ...otherA] = a;
  const [j = -1, ...otherB] = b;
  if (i === j) {
    return compareDepths(otherA, otherB);
  }
  return i < j ? -1 : 1;
};
var domSort = async function* (elements) {
  const results = /* @__PURE__ */ new Set();
  for await (const element of elements) {
    results.add(element);
  }
  const calculator = new DepthCalculator();
  yield* [...results.values()].map((result) => {
    return [result, calculator.calculate(result)];
  }).sort(([, a], [, b]) => {
    return compareDepths(a, b);
  }).map(([result]) => {
    return result;
  });
};
var pQuerySelectorAll = function(root, selector) {
  const selectors = JSON.parse(selector);
  if (selectors.some((parts) => {
    let i = 0;
    return parts.some((parts2) => {
      if (typeof parts2 === "string") {
        ++i;
      } else {
        i = 0;
      }
      return i > 1;
    });
  })) {
    throw new Error("Multiple deep combinators found in sequence.");
  }
  return domSort(AsyncIterableUtil.flatMap(selectors, (selectorParts) => {
    const query = new PQueryEngine(root, selectorParts);
    void query.run();
    return query.elements;
  }));
};
var pQuerySelector = async function(root, selector) {
  for await (const element of pQuerySelectorAll(root, selector)) {
    return element;
  }
  return null;
};

// node_modules/puppeteer-core/lib/puppeteer/injected/injected.js
/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var PuppeteerUtil = Object.freeze({
  ...ARIAQuerySelector_exports,
  ...CustomQuerySelector_exports,
  ...PierceQuerySelector_exports,
  ...PQuerySelector_exports,
  ...TextQuerySelector_exports,
  ...util_exports,
  ...XPathQuerySelector_exports,
  ...CSSSelector_exports,
  Deferred,
  createFunction,
  createTextContent,
  IntervalPoller,
  isSuitableNodeForTextMatching,
  MutationPoller,
  RAFPoller
});
var injected_default = PuppeteerUtil;
