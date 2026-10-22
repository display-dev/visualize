// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { d as disposeSymbol, a as asyncDisposeSymbol, M as Mutex, w as withSourcePuppeteerURLIfNone, b as debugError, E as EventEmitter, f as fromAbortSignal, t as timeout } from './chunk-017.mjs';
import { E as EMPTY, g as defer, h as first, i as retry, j as ignoreElements, c as filter, k as throwIfEmpty, p as pipe, a as mergeMap, b as from, l as tap, d as firstValueFrom, n as race, m as map, r as raceWith, e as merge, o as defaultIfEmpty, q as identity, s as catchError, u as of, v as noop } from './chunk-016.mjs';

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var __addDisposableResource$2 = (undefined && undefined.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources$2 = (undefined && undefined.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
const instances = new WeakSet();
function moveable(Class, _) {
    let hasDispose = false;
    if (Class.prototype[disposeSymbol]) {
        const dispose = Class.prototype[disposeSymbol];
        Class.prototype[disposeSymbol] = function () {
            if (instances.has(this)) {
                instances.delete(this);
                return;
            }
            return dispose.call(this);
        };
        hasDispose = true;
    }
    if (Class.prototype[asyncDisposeSymbol]) {
        const asyncDispose = Class.prototype[asyncDisposeSymbol];
        Class.prototype[asyncDisposeSymbol] = function () {
            if (instances.has(this)) {
                instances.delete(this);
                return;
            }
            return asyncDispose.call(this);
        };
        hasDispose = true;
    }
    if (hasDispose) {
        Class.prototype.move = function () {
            instances.add(this);
            return this;
        };
    }
    return Class;
}
function throwIfDisposed(message = value => {
    return `Attempted to use disposed ${value.constructor.name}.`;
}) {
    return (target, _) => {
        return function (...args) {
            if (this.disposed) {
                throw new Error(message(this));
            }
            return target.call(this, ...args);
        };
    };
}
function inertIfDisposed(target, _) {
    return function (...args) {
        if (this.disposed) {
            return;
        }
        return target.call(this, ...args);
    };
}
/**
 * The decorator only invokes the target if the target has not been invoked with
 * the same arguments before. The decorated method throws an error if it's
 * invoked with a different number of elements: if you decorate a method, it
 * should have the same number of arguments
 *
 * @internal
 */
function invokeAtMostOnceForArguments(target, _) {
    const cache = new WeakMap();
    let cacheDepth = -1;
    return function (...args) {
        if (cacheDepth === -1) {
            cacheDepth = args.length;
        }
        if (cacheDepth !== args.length) {
            throw new Error('Memoized method was called with the wrong number of arguments');
        }
        let freshArguments = false;
        let cacheIterator = cache;
        for (const arg of args) {
            if (cacheIterator.has(arg)) {
                cacheIterator = cacheIterator.get(arg);
            }
            else {
                freshArguments = true;
                cacheIterator.set(arg, new WeakMap());
                cacheIterator = cacheIterator.get(arg);
            }
        }
        if (!freshArguments) {
            return;
        }
        return target.call(this, ...args);
    };
}
function guarded(getKey = function () {
    return this;
}) {
    return (target, _) => {
        const mutexes = new WeakMap();
        return async function (...args) {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const key = getKey.call(this);
                let mutex = mutexes.get(key);
                if (!mutex) {
                    mutex = new Mutex();
                    mutexes.set(key, mutex);
                }
                const _ = __addDisposableResource$2(env_1, await mutex.acquire(), true);
                return await target.call(this, ...args);
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                const result_1 = __disposeResources$2(env_1);
                if (result_1)
                    await result_1;
            }
        };
    };
}
const bubbleHandlers = new WeakMap();
const bubbleInitializer = function (events) {
    const handlers = bubbleHandlers.get(this) ?? new Map();
    if (handlers.has(events)) {
        return;
    }
    const handler = events !== undefined
        ? (type, event) => {
            if (events.includes(type)) {
                this.emit(type, event);
            }
        }
        : (type, event) => {
            this.emit(type, event);
        };
    handlers.set(events, handler);
    bubbleHandlers.set(this, handlers);
};
/**
 * Event emitter fields marked with `bubble` will have their events bubble up
 * the field owner.
 */
// The type is too complicated to type.
function bubble(events) {
    return ({ set, get }, context) => {
        context.addInitializer(function () {
            return bubbleInitializer.apply(this, [events]);
        });
        return {
            set(emitter) {
                const handler = bubbleHandlers.get(this).get(events);
                // In case we are re-setting.
                const oldEmitter = get.call(this);
                if (oldEmitter !== undefined) {
                    oldEmitter.off('*', handler);
                }
                if (emitter === undefined) {
                    return;
                }
                emitter.on('*', handler);
                set.call(this, emitter);
            },
            init(emitter) {
                if (emitter === undefined) {
                    return emitter;
                }
                bubbleInitializer.apply(this, [events]);
                const handler = bubbleHandlers.get(this).get(events);
                emitter.on('*', handler);
                return emitter;
            },
        };
    };
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var __runInitializers = (undefined && undefined.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (undefined && undefined.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __addDisposableResource$1 = (undefined && undefined.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources$1 = (undefined && undefined.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
 * Represents a reference to a JavaScript object. Instances can be created using
 * {@link Page.evaluateHandle}.
 *
 * Handles prevent the referenced JavaScript object from being garbage-collected
 * unless the handle is purposely {@link JSHandle.dispose | disposed}. JSHandles
 * are auto-disposed when their associated frame is navigated away or the parent
 * context gets destroyed.
 *
 * Handles can be used as arguments for any evaluation function such as
 * {@link Page.$eval}, {@link Page.evaluate}, and {@link Page.evaluateHandle}.
 * They are resolved to their referenced object.
 *
 * @example
 *
 * ```ts
 * const windowHandle = await page.evaluateHandle(() => window);
 * ```
 *
 * @public
 */
let JSHandle = (() => {
    let _classDecorators = [moveable];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getProperty_decorators;
    let _getProperties_decorators;
    (class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(this, null, _getProperty_decorators, { kind: "method", name: "getProperty", static: false, private: false, access: { has: obj => "getProperty" in obj, get: obj => obj.getProperty }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _getProperties_decorators, { kind: "method", name: "getProperties", static: false, private: false, access: { has: obj => "getProperties" in obj, get: obj => obj.getProperties }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /**
         * @internal
         */
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
        /**
         * Evaluates the given function with the current handle as its first argument.
         */
        async evaluate(pageFunction, ...args) {
            pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
            return await this.realm.evaluate(pageFunction, this, ...args);
        }
        /**
         * Evaluates the given function with the current handle as its first argument.
         *
         */
        async evaluateHandle(pageFunction, ...args) {
            pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
            return await this.realm.evaluateHandle(pageFunction, this, ...args);
        }
        /**
         * @internal
         */
        async getProperty(propertyName) {
            return await this.evaluateHandle((object, propertyName) => {
                return object[propertyName];
            }, propertyName);
        }
        /**
         * Gets a map of handles representing the properties of the current handle.
         *
         * @example
         *
         * ```ts
         * const listHandle = await page.evaluateHandle(() => document.body.children);
         * const properties = await listHandle.getProperties();
         * const children = [];
         * for (const property of properties.values()) {
         *   const element = property.asElement();
         *   if (element) {
         *     children.push(element);
         *   }
         * }
         * children; // holds elementHandles to all children of document.body
         * ```
         */
        async getProperties() {
            const propertyNames = await this.evaluate(object => {
                const enumerableProperties = [];
                const descriptors = Object.getOwnPropertyDescriptors(object);
                for (const propertyName in descriptors) {
                    if (descriptors[propertyName]?.enumerable) {
                        enumerableProperties.push(propertyName);
                    }
                }
                return enumerableProperties;
            });
            const map = new Map();
            const results = await Promise.all(propertyNames.map(key => {
                return this.getProperty(key);
            }));
            for (const [key, value] of Object.entries(propertyNames)) {
                const env_1 = { stack: [], error: void 0, hasError: false };
                try {
                    const handle = __addDisposableResource$1(env_1, results[key], false);
                    if (handle) {
                        map.set(value, handle.move());
                    }
                }
                catch (e_1) {
                    env_1.error = e_1;
                    env_1.hasError = true;
                }
                finally {
                    __disposeResources$1(env_1);
                }
            }
            return map;
        }
        /** @internal */
        [(_getProperty_decorators = [throwIfDisposed()], _getProperties_decorators = [throwIfDisposed()], disposeSymbol)]() {
            return void this[asyncDisposeSymbol]().catch(debugError);
        }
        /** @internal */
        [asyncDisposeSymbol]() {
            return this.dispose();
        }
    });
    return _classThis;
})();

var __addDisposableResource = (undefined && undefined.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (undefined && undefined.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
/**
 * All the events that a locator instance may emit.
 *
 * @public
 */
var LocatorEvent;
(function (LocatorEvent) {
    /**
     * Emitted every time before the locator performs an action on the located element(s).
     */
    LocatorEvent["Action"] = "action";
})(LocatorEvent || (LocatorEvent = {}));
/**
 * Locators describe a strategy of locating objects and performing an action on
 * them. If the action fails because the object is not ready for the action, the
 * whole operation is retried. Various preconditions for a successful action are
 * checked automatically.
 *
 * See {@link https://pptr.dev/guides/page-interactions#locators} for details.
 *
 * @public
 */
class Locator extends EventEmitter {
    /**
     * Creates a race between multiple locators trying to locate elements in
     * parallel but ensures that only a single element receives the action.
     *
     * @public
     */
    static race(locators) {
        return RaceLocator.create(locators);
    }
    /**
     * @internal
     */
    visibility = null;
    /**
     * @internal
     */
    _timeout = 30000;
    #ensureElementIsInTheViewport = true;
    #waitForEnabled = true;
    #waitForStableBoundingBox = true;
    /**
     * @internal
     */
    operators = {
        conditions: (conditions, signal) => {
            return mergeMap((handle) => {
                return merge(...conditions.map(condition => {
                    return condition(handle, signal);
                })).pipe(defaultIfEmpty(handle));
            });
        },
        retryAndRaceWithSignalAndTimer: (signal, cause) => {
            const candidates = [];
            if (signal) {
                candidates.push(fromAbortSignal(signal, cause));
            }
            candidates.push(timeout(this._timeout, cause));
            return pipe(retry({ delay: RETRY_DELAY }), raceWith(...candidates));
        },
    };
    // Determines when the locator will timeout for actions.
    get timeout() {
        return this._timeout;
    }
    /**
     * Creates a new locator instance by cloning the current locator and setting
     * the total timeout for the locator actions.
     *
     * Pass `0` to disable timeout.
     *
     * @defaultValue `Page.getDefaultTimeout()`
     */
    setTimeout(timeout) {
        const locator = this._clone();
        locator._timeout = timeout;
        return locator;
    }
    /**
     * Creates a new locator instance by cloning the current locator with the
     * visibility property changed to the specified value.
     */
    setVisibility(visibility) {
        const locator = this._clone();
        locator.visibility = visibility;
        return locator;
    }
    /**
     * Creates a new locator instance by cloning the current locator and
     * specifying whether to wait for input elements to become enabled before the
     * action. Applicable to `click` and `fill` actions.
     *
     * @defaultValue `true`
     */
    setWaitForEnabled(value) {
        const locator = this._clone();
        locator.#waitForEnabled = value;
        return locator;
    }
    /**
     * Creates a new locator instance by cloning the current locator and
     * specifying whether the locator should scroll the element into viewport if
     * it is not in the viewport already.
     *
     * @defaultValue `true`
     */
    setEnsureElementIsInTheViewport(value) {
        const locator = this._clone();
        locator.#ensureElementIsInTheViewport = value;
        return locator;
    }
    /**
     * Creates a new locator instance by cloning the current locator and
     * specifying whether the locator has to wait for the element's bounding box
     * to be same between two consecutive animation frames.
     *
     * @defaultValue `true`
     */
    setWaitForStableBoundingBox(value) {
        const locator = this._clone();
        locator.#waitForStableBoundingBox = value;
        return locator;
    }
    /**
     * @internal
     */
    copyOptions(locator) {
        this._timeout = locator._timeout;
        this.visibility = locator.visibility;
        this.#waitForEnabled = locator.#waitForEnabled;
        this.#ensureElementIsInTheViewport = locator.#ensureElementIsInTheViewport;
        this.#waitForStableBoundingBox = locator.#waitForStableBoundingBox;
        return this;
    }
    /**
     * If the element has a "disabled" property, wait for the element to be
     * enabled.
     */
    #waitForEnabledIfNeeded = (handle, signal) => {
        if (!this.#waitForEnabled) {
            return EMPTY;
        }
        return from(handle.frame.waitForFunction(element => {
            if (!(element instanceof HTMLElement)) {
                return true;
            }
            const isNativeFormControl = [
                'BUTTON',
                'INPUT',
                'SELECT',
                'TEXTAREA',
                'OPTION',
                'OPTGROUP',
            ].includes(element.nodeName);
            return !isNativeFormControl || !element.hasAttribute('disabled');
        }, {
            timeout: this._timeout,
            signal,
        }, handle)).pipe(ignoreElements());
    };
    /**
     * Compares the bounding box of the element for two consecutive animation
     * frames and waits till they are the same.
     */
    #waitForStableBoundingBoxIfNeeded = (handle) => {
        if (!this.#waitForStableBoundingBox) {
            return EMPTY;
        }
        return defer(() => {
            // Note we don't use waitForFunction because that relies on RAF.
            return from(handle.evaluate(element => {
                return new Promise(resolve => {
                    window.requestAnimationFrame(() => {
                        const rect1 = element.getBoundingClientRect();
                        window.requestAnimationFrame(() => {
                            const rect2 = element.getBoundingClientRect();
                            resolve([
                                {
                                    x: rect1.x,
                                    y: rect1.y,
                                    width: rect1.width,
                                    height: rect1.height,
                                },
                                {
                                    x: rect2.x,
                                    y: rect2.y,
                                    width: rect2.width,
                                    height: rect2.height,
                                },
                            ]);
                        });
                    });
                });
            }));
        }).pipe(first(([rect1, rect2]) => {
            return (rect1.x === rect2.x &&
                rect1.y === rect2.y &&
                rect1.width === rect2.width &&
                rect1.height === rect2.height);
        }), retry({ delay: RETRY_DELAY }), ignoreElements());
    };
    /**
     * Checks if the element is in the viewport and auto-scrolls it if it is not.
     */
    #ensureElementIsInTheViewportIfNeeded = (handle) => {
        if (!this.#ensureElementIsInTheViewport) {
            return EMPTY;
        }
        return from(handle.isIntersectingViewport({ threshold: 0 })).pipe(filter(isIntersectingViewport => {
            return !isIntersectingViewport;
        }), mergeMap(() => {
            return from(handle.scrollIntoView());
        }), mergeMap(() => {
            return defer(() => {
                return from(handle.isIntersectingViewport({ threshold: 0 }));
            }).pipe(first(identity), retry({ delay: RETRY_DELAY }), ignoreElements());
        }));
    };
    #click(options) {
        const signal = options?.signal;
        const cause = new Error('Locator.click');
        return this._wait(options).pipe(this.operators.conditions([
            this.#ensureElementIsInTheViewportIfNeeded,
            this.#waitForStableBoundingBoxIfNeeded,
            this.#waitForEnabledIfNeeded,
        ], signal), tap(() => {
            return this.emit(LocatorEvent.Action, undefined);
        }), mergeMap(handle => {
            return from(handle.click(options)).pipe(catchError(err => {
                void handle.dispose().catch(debugError);
                throw err;
            }));
        }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
    }
    #fill(value, options) {
        const signal = options?.signal;
        const typingThreshold = options?.typingThreshold ?? 100;
        const cause = new Error('Locator.fill');
        return this._wait(options).pipe(this.operators.conditions([
            this.#ensureElementIsInTheViewportIfNeeded,
            this.#waitForStableBoundingBoxIfNeeded,
            this.#waitForEnabledIfNeeded,
        ], signal), tap(() => {
            return this.emit(LocatorEvent.Action, undefined);
        }), mergeMap(handle => {
            return from(handle.evaluate(el => {
                if (el instanceof HTMLSelectElement) {
                    return 'select';
                }
                if (el instanceof HTMLTextAreaElement) {
                    return 'typeable-input';
                }
                if (el instanceof HTMLInputElement) {
                    switch (el.type) {
                        case 'checkbox':
                        case 'radio':
                            return 'checkable-input';
                        case 'text':
                        case 'url':
                        case 'tel':
                        case 'search':
                        case 'password':
                        case 'number':
                        case 'email':
                            return 'typeable-input';
                        default:
                            return 'other-input';
                    }
                }
                switch (el.getAttribute('role')) {
                    case 'checkbox':
                    case 'radio':
                    case 'switch':
                        return 'checkable-input';
                }
                if (el.isContentEditable) {
                    return 'contenteditable';
                }
                return 'unknown';
            }))
                .pipe(mergeMap(inputType => {
                const fillDirectly = () => {
                    return from(handle.focus()).pipe(mergeMap(() => {
                        return from(handle.evaluate((input, newValue) => {
                            const element = input;
                            const valString = String(newValue);
                            const currentValue = element.isContentEditable
                                ? element.innerText
                                : element.value;
                            if (currentValue === valString) {
                                return;
                            }
                            if (element.isContentEditable) {
                                element.innerText = valString;
                            }
                            else {
                                element.value = valString;
                            }
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            element.dispatchEvent(new Event('change', { bubbles: true }));
                        }, value));
                    }));
                };
                const toggleIfNeeded = () => {
                    return from(handle.evaluate(toggleEl => {
                        if (toggleEl.indeterminate ||
                            toggleEl.getAttribute('aria-checked') === 'mixed') {
                            return 'mixed';
                        }
                        return (toggleEl.checked ||
                            toggleEl.getAttribute('aria-checked') === 'true');
                    })).pipe(mergeMap(currentState => {
                        if (currentState === 'mixed' || currentState !== !!value) {
                            return from(handle.click());
                        }
                        return of(undefined);
                    }));
                };
                switch (inputType) {
                    case 'checkable-input':
                        return toggleIfNeeded();
                    case 'select':
                        return from(handle.select(value).then(noop));
                    case 'contenteditable':
                    case 'typeable-input':
                        if (typeof value === 'string' &&
                            value.length < typingThreshold) {
                            return from(handle.evaluate((input, newValue) => {
                                const element = input;
                                const valString = String(newValue);
                                const currentValue = element.isContentEditable
                                    ? element.innerText
                                    : input.value;
                                if (currentValue === valString) {
                                    return '';
                                }
                                // Clear the input if the current value does not match the filled
                                // out value.
                                if (!valString.startsWith(currentValue) ||
                                    !currentValue) {
                                    if (element.isContentEditable) {
                                        element.innerText = '';
                                    }
                                    else {
                                        input.value = '';
                                    }
                                    return valString;
                                }
                                // If the value is partially filled out, only type the rest. Move
                                // cursor to the end of the common prefix.
                                if (element.isContentEditable) {
                                    element.innerText = '';
                                    element.innerText = currentValue;
                                }
                                else {
                                    input.value = '';
                                    input.value = currentValue;
                                }
                                return valString.substring(currentValue.length);
                            }, value)).pipe(mergeMap(textToType => {
                                if (!textToType) {
                                    return of(undefined);
                                }
                                return from(handle.type(textToType));
                            }));
                        }
                        return fillDirectly();
                    case 'other-input':
                        return fillDirectly();
                    case 'unknown':
                        throw new Error(`Element cannot be filled out.`);
                }
            }))
                .pipe(catchError(err => {
                void handle.dispose().catch(debugError);
                throw err;
            }));
        }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
    }
    #hover(options) {
        const signal = options?.signal;
        const cause = new Error('Locator.hover');
        return this._wait(options).pipe(this.operators.conditions([
            this.#ensureElementIsInTheViewportIfNeeded,
            this.#waitForStableBoundingBoxIfNeeded,
        ], signal), tap(() => {
            return this.emit(LocatorEvent.Action, undefined);
        }), mergeMap(handle => {
            return from(handle.hover()).pipe(catchError(err => {
                void handle.dispose().catch(debugError);
                throw err;
            }));
        }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
    }
    #scroll(options) {
        const signal = options?.signal;
        const cause = new Error('Locator.scroll');
        return this._wait(options).pipe(this.operators.conditions([
            this.#ensureElementIsInTheViewportIfNeeded,
            this.#waitForStableBoundingBoxIfNeeded,
        ], signal), tap(() => {
            return this.emit(LocatorEvent.Action, undefined);
        }), mergeMap(handle => {
            return from(handle.evaluate((el, scrollTop, scrollLeft) => {
                if (scrollTop !== undefined) {
                    el.scrollTop = scrollTop;
                }
                if (scrollLeft !== undefined) {
                    el.scrollLeft = scrollLeft;
                }
            }, options?.scrollTop, options?.scrollLeft)).pipe(catchError(err => {
                void handle.dispose().catch(debugError);
                throw err;
            }));
        }), this.operators.retryAndRaceWithSignalAndTimer(signal, cause));
    }
    /**
     * Clones the locator.
     */
    clone() {
        return this._clone();
    }
    /**
     * Waits for the locator to get a handle from the page.
     *
     * @public
     */
    async waitHandle(options) {
        const cause = new Error('Locator.waitHandle');
        return await firstValueFrom(this._wait(options).pipe(this.operators.retryAndRaceWithSignalAndTimer(options?.signal, cause)));
    }
    /**
     * Waits for the locator to get the serialized value from the page.
     *
     * Note this requires the value to be JSON-serializable.
     *
     * @public
     */
    async wait(options) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const handle = __addDisposableResource(env_1, await this.waitHandle(options), false);
            return await handle.jsonValue();
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    /**
     * Maps the locator using the provided mapper.
     *
     * @public
     */
    map(mapper) {
        return new MappedLocator(this._clone(), handle => {
            // SAFETY: TypeScript cannot deduce the type.
            return handle.evaluateHandle(mapper);
        });
    }
    /**
     * Creates an expectation that is evaluated against located values.
     *
     * If the expectations do not match, then the locator will retry.
     *
     * @public
     */
    filter(predicate) {
        return new FilteredLocator(this._clone(), async (handle, signal) => {
            await handle.frame.waitForFunction(predicate, { signal, timeout: this._timeout }, handle);
            return true;
        });
    }
    /**
     * Creates an expectation that is evaluated against located handles.
     *
     * If the expectations do not match, then the locator will retry.
     *
     * @internal
     */
    filterHandle(predicate) {
        return new FilteredLocator(this._clone(), predicate);
    }
    /**
     * Maps the locator using the provided mapper.
     *
     * @internal
     */
    mapHandle(mapper) {
        return new MappedLocator(this._clone(), mapper);
    }
    /**
     * Clicks the located element.
     */
    click(options) {
        return firstValueFrom(this.#click(options));
    }
    /**
     * Fills out the input identified by the locator using the provided value. The
     * type of the input is determined at runtime and the appropriate fill-out
     * method is chosen based on the type. `contenteditable`, select, textarea and
     * input elements are supported. For checkboxes, radio buttons and switches
     * specify a boolean value.
     */
    fill(value, options) {
        return firstValueFrom(this.#fill(value, options));
    }
    /**
     * Hovers over the located element.
     */
    hover(options) {
        return firstValueFrom(this.#hover(options));
    }
    /**
     * Scrolls the located element.
     */
    scroll(options) {
        return firstValueFrom(this.#scroll(options));
    }
}
/**
 * @internal
 */
class FunctionLocator extends Locator {
    static create(pageOrFrame, func) {
        return new FunctionLocator(pageOrFrame, func).setTimeout('getDefaultTimeout' in pageOrFrame
            ? pageOrFrame.getDefaultTimeout()
            : pageOrFrame.page().getDefaultTimeout());
    }
    #pageOrFrame;
    #func;
    constructor(pageOrFrame, func) {
        super();
        this.#pageOrFrame = pageOrFrame;
        this.#func = func;
    }
    _clone() {
        return new FunctionLocator(this.#pageOrFrame, this.#func);
    }
    _wait(options) {
        const signal = options?.signal;
        return defer(() => {
            return from(this.#pageOrFrame.waitForFunction(this.#func, {
                timeout: this.timeout,
                signal,
            }));
        }).pipe(throwIfEmpty());
    }
}
/**
 * @internal
 */
class DelegatedLocator extends Locator {
    #delegate;
    constructor(delegate) {
        super();
        this.#delegate = delegate;
        this.copyOptions(this.#delegate);
    }
    get delegate() {
        return this.#delegate;
    }
    setTimeout(timeout) {
        const locator = super.setTimeout(timeout);
        locator.#delegate = this.#delegate.setTimeout(timeout);
        return locator;
    }
    setVisibility(visibility) {
        const locator = super.setVisibility(visibility);
        locator.#delegate = locator.#delegate.setVisibility(visibility);
        return locator;
    }
    setWaitForEnabled(value) {
        const locator = super.setWaitForEnabled(value);
        locator.#delegate = this.#delegate.setWaitForEnabled(value);
        return locator;
    }
    setEnsureElementIsInTheViewport(value) {
        const locator = super.setEnsureElementIsInTheViewport(value);
        locator.#delegate = this.#delegate.setEnsureElementIsInTheViewport(value);
        return locator;
    }
    setWaitForStableBoundingBox(value) {
        const locator = super.setWaitForStableBoundingBox(value);
        locator.#delegate = this.#delegate.setWaitForStableBoundingBox(value);
        return locator;
    }
}
/**
 * @internal
 */
class FilteredLocator extends DelegatedLocator {
    #predicate;
    constructor(base, predicate) {
        super(base);
        this.#predicate = predicate;
    }
    _clone() {
        return new FilteredLocator(this.delegate.clone(), this.#predicate).copyOptions(this);
    }
    _wait(options) {
        return this.delegate._wait(options).pipe(mergeMap(handle => {
            return from(Promise.resolve(this.#predicate(handle, options?.signal))).pipe(filter(value => {
                return value;
            }), map(() => {
                // SAFETY: It passed the predicate, so this is correct.
                return handle;
            }));
        }), throwIfEmpty());
    }
}
/**
 * @internal
 */
class MappedLocator extends DelegatedLocator {
    #mapper;
    constructor(base, mapper) {
        super(base);
        this.#mapper = mapper;
    }
    _clone() {
        return new MappedLocator(this.delegate.clone(), this.#mapper).copyOptions(this);
    }
    _wait(options) {
        return this.delegate._wait(options).pipe(mergeMap(handle => {
            return from(Promise.resolve(this.#mapper(handle, options?.signal)));
        }));
    }
}
/**
 * @internal
 */
class NodeLocator extends Locator {
    static create(pageOrFrame, selector) {
        return new NodeLocator(pageOrFrame, selector).setTimeout('getDefaultTimeout' in pageOrFrame
            ? pageOrFrame.getDefaultTimeout()
            : pageOrFrame.page().getDefaultTimeout());
    }
    static createFromHandle(pageOrFrame, handle) {
        return new NodeLocator(pageOrFrame, handle).setTimeout('getDefaultTimeout' in pageOrFrame
            ? pageOrFrame.getDefaultTimeout()
            : pageOrFrame.page().getDefaultTimeout());
    }
    #pageOrFrame;
    #selectorOrHandle;
    constructor(pageOrFrame, selectorOrHandle) {
        super();
        this.#pageOrFrame = pageOrFrame;
        this.#selectorOrHandle = selectorOrHandle;
    }
    /**
     * Waits for the element to become visible or hidden. visibility === 'visible'
     * means that the element has a computed style, the visibility property other
     * than 'hidden' or 'collapse' and non-empty bounding box. visibility ===
     * 'hidden' means the opposite of that.
     */
    #waitForVisibilityIfNeeded = (handle) => {
        if (!this.visibility) {
            return EMPTY;
        }
        return (() => {
            switch (this.visibility) {
                case 'hidden':
                    return defer(() => {
                        return from(handle.isHidden());
                    });
                case 'visible':
                    return defer(() => {
                        return from(handle.isVisible());
                    });
            }
        })().pipe(first(identity), retry({ delay: RETRY_DELAY }), ignoreElements());
    };
    _clone() {
        return new NodeLocator(this.#pageOrFrame, 
        // @ts-expect-error TSC does cannot parse private overloads.
        this.#selectorOrHandle).copyOptions(this);
    }
    _wait(options) {
        const signal = options?.signal;
        return defer(() => {
            if (typeof this.#selectorOrHandle === 'string') {
                return from(this.#pageOrFrame.waitForSelector(this.#selectorOrHandle, {
                    visible: false,
                    timeout: this._timeout,
                    signal,
                }));
            }
            else {
                return of(this.#selectorOrHandle);
            }
        }).pipe(filter((value) => {
            return value !== null;
        }), throwIfEmpty(), this.operators.conditions([this.#waitForVisibilityIfNeeded], signal));
    }
}
function checkLocatorArray(locators) {
    for (const locator of locators) {
        if (!(locator instanceof Locator)) {
            throw new Error('Unknown locator for race candidate');
        }
    }
    return locators;
}
/**
 * @internal
 */
class RaceLocator extends Locator {
    static create(locators) {
        const array = checkLocatorArray(locators);
        return new RaceLocator(array);
    }
    #locators;
    constructor(locators) {
        super();
        this.#locators = locators;
    }
    _clone() {
        return new RaceLocator(this.#locators.map(locator => {
            return locator.clone();
        })).copyOptions(this);
    }
    _wait(options) {
        return race(...this.#locators.map(locator => {
            return locator._wait(options);
        }));
    }
}
/**
 * For observables coming from promises, a delay is needed, otherwise RxJS will
 * never yield in a permanent failure for a promise.
 *
 * We also don't want RxJS to do promise operations to often, so we bump the
 * delay up to 100ms.
 *
 * @internal
 */
const RETRY_DELAY = 100;

export { FunctionLocator as F, JSHandle as J, Locator as L, NodeLocator as N, inertIfDisposed as a, bubble as b, guarded as g, invokeAtMostOnceForArguments as i, throwIfDisposed as t };
