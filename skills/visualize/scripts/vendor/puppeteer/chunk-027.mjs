// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { d as firstValueFrom, r as raceWith, m as map } from './chunk-016.mjs';
import { B as Binding, W as WebWorker, a as WebWorkerEvent, T as TargetType, R as Realm } from './chunk-024.mjs';
import { b as debugError, E as EventEmitter, D as DisposableStack, d as disposeSymbol, C as CDPSessionEvent, M as Mutex, m as getSourceUrlComment, n as getSourcePuppeteerURLIfAvailable, P as PuppeteerURL, i as isString, S as SOURCE_URL_REGEX, c as fromEmitterEvent, t as timeout, w as withSourcePuppeteerURLIfNone, g as Deferred } from './chunk-017.mjs';
import { E as ElementHandle, b as bindIsolatedHandle } from './chunk-020.mjs';
import { a as assert, e as environment } from './chunk-015.mjs';
import { A as AsyncIterableUtil, a as scriptInjector, s as stringifyFunction, L as LazyArg, b as ARIAQueryHandler } from './chunk-019.mjs';
import { t as throwIfDisposed } from './chunk-018.mjs';
import { C as CdpJSHandle, a as CDP_BINDING_PREFIX, b as addPageBinding, c as createEvaluationError, v as valueFromPrimitiveRemoteObject, d as createConsoleMessage } from './chunk-026.mjs';
import { T as TimeoutSettings } from './chunk-022.mjs';
import { F as FrameEvent } from './chunk-021.mjs';

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * We use symbols to prevent any external parties listening to these events.
 * They are internal to Puppeteer.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var NetworkManagerEvent;
(function (NetworkManagerEvent) {
    NetworkManagerEvent.Request = Symbol('NetworkManager.Request');
    NetworkManagerEvent.RequestServedFromCache = Symbol('NetworkManager.RequestServedFromCache');
    NetworkManagerEvent.Response = Symbol('NetworkManager.Response');
    NetworkManagerEvent.RequestFailed = Symbol('NetworkManager.RequestFailed');
    NetworkManagerEvent.RequestFinished = Symbol('NetworkManager.RequestFinished');
})(NetworkManagerEvent || (NetworkManagerEvent = {}));

/**
 * @license
 * Copyright 2019 Google Inc.
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
const NON_ELEMENT_NODE_ROLES = new Set(['StaticText', 'InlineTextBox']);
/**
 * The CdpElementHandle extends ElementHandle now to keep compatibility
 * with `instanceof` because of that we need to have methods for
 * CdpJSHandle to in this implementation as well.
 *
 * @internal
 */
let CdpElementHandle = (() => {
    let _classSuper = ElementHandle;
    let _instanceExtraInitializers = [];
    let _contentFrame_decorators;
    let _scrollIntoView_decorators;
    let _uploadFile_decorators;
    let _autofill_decorators;
    return class CdpElementHandle extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _contentFrame_decorators = [throwIfDisposed()];
            _scrollIntoView_decorators = [throwIfDisposed(), bindIsolatedHandle];
            _uploadFile_decorators = [throwIfDisposed(), bindIsolatedHandle];
            _autofill_decorators = [throwIfDisposed()];
            __esDecorate(this, null, _contentFrame_decorators, { kind: "method", name: "contentFrame", static: false, private: false, access: { has: obj => "contentFrame" in obj, get: obj => obj.contentFrame }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _scrollIntoView_decorators, { kind: "method", name: "scrollIntoView", static: false, private: false, access: { has: obj => "scrollIntoView" in obj, get: obj => obj.scrollIntoView }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _uploadFile_decorators, { kind: "method", name: "uploadFile", static: false, private: false, access: { has: obj => "uploadFile" in obj, get: obj => obj.uploadFile }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _autofill_decorators, { kind: "method", name: "autofill", static: false, private: false, access: { has: obj => "autofill" in obj, get: obj => obj.autofill }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #backendNodeId = __runInitializers(this, _instanceExtraInitializers);
        constructor(world, remoteObject) {
            super(new CdpJSHandle(world, remoteObject));
        }
        get realm() {
            return this.handle.realm;
        }
        get client() {
            return this.handle.client;
        }
        remoteObject() {
            return this.handle.remoteObject();
        }
        get #frameManager() {
            return this.frame._frameManager;
        }
        get frame() {
            return this.realm.environment;
        }
        async contentFrame() {
            const nodeInfo = await this.client.send('DOM.describeNode', {
                objectId: this.id,
            });
            if (typeof nodeInfo.node.frameId !== 'string') {
                return null;
            }
            return this.#frameManager.frame(nodeInfo.node.frameId);
        }
        async scrollIntoView() {
            await this.assertConnectedElement();
            try {
                await this.client.send('DOM.scrollIntoViewIfNeeded', {
                    objectId: this.id,
                });
            }
            catch (error) {
                debugError(error);
                // Fallback to Element.scrollIntoView if DOM.scrollIntoViewIfNeeded is not supported
                await super.scrollIntoView();
            }
        }
        async uploadFile(...files) {
            const isMultiple = await this.evaluate(element => {
                return element.multiple;
            });
            assert(files.length <= 1 || isMultiple, 'Multiple file uploads only work with <input type=file multiple>');
            // Locate all files and confirm that they exist.
            const path = environment.value.path;
            if (path) {
                files = files.map(filePath => {
                    if (path.win32.isAbsolute(filePath) ||
                        path.posix.isAbsolute(filePath)) {
                        return filePath;
                    }
                    else {
                        return path.resolve(filePath);
                    }
                });
            }
            /**
             * The zero-length array is a special case, it seems that
             * DOM.setFileInputFiles does not actually update the files in that case, so
             * the solution is to eval the element value to a new FileList directly.
             */
            if (files.length === 0) {
                // XXX: These events should converted to trusted events. Perhaps do this
                // in `DOM.setFileInputFiles`?
                await this.evaluate(element => {
                    element.files = new DataTransfer().files;
                    // Dispatch events for this case because it should behave akin to a user action.
                    element.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
                    element.dispatchEvent(new Event('change', { bubbles: true }));
                });
                return;
            }
            const { node: { backendNodeId }, } = await this.client.send('DOM.describeNode', {
                objectId: this.id,
            });
            await this.client.send('DOM.setFileInputFiles', {
                objectId: this.id,
                files,
                backendNodeId,
            });
        }
        async autofill(data) {
            const nodeInfo = await this.client.send('DOM.describeNode', {
                objectId: this.handle.id,
            });
            const fieldId = nodeInfo.node.backendNodeId;
            const frameId = this.frame._id;
            await this.client.send('Autofill.trigger', {
                fieldId,
                frameId,
                card: data.creditCard,
                address: data.address,
            });
        }
        async *queryAXTree(name, role) {
            const { nodes } = await this.client.send('Accessibility.queryAXTree', {
                objectId: this.id,
                accessibleName: name,
                role,
            });
            const results = nodes.filter(node => {
                if (node.ignored) {
                    return false;
                }
                if (!node.role) {
                    return false;
                }
                if (NON_ELEMENT_NODE_ROLES.has(node.role.value)) {
                    return false;
                }
                return true;
            });
            return yield* AsyncIterableUtil.map(results, node => {
                return this.realm.adoptBackendNode(node.backendDOMNodeId);
            });
        }
        async backendNodeId() {
            if (this.#backendNodeId) {
                return this.#backendNodeId;
            }
            const { node } = await this.client.send('DOM.describeNode', {
                objectId: this.handle.id,
            });
            this.#backendNodeId = node.backendNodeId;
            return this.#backendNodeId;
        }
    };
})();

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
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
const ariaQuerySelectorBinding = new Binding('__ariaQuerySelector', ARIAQueryHandler.queryOne, '');
const ariaQuerySelectorAllBinding = new Binding('__ariaQuerySelectorAll', (async (element, selector) => {
    const results = ARIAQueryHandler.queryAll(element, selector);
    return await element.realm.evaluateHandle((...elements) => {
        return elements;
    }, ...(await AsyncIterableUtil.collect(results)));
}), '');
/**
 * @internal
 */
class ExecutionContext extends EventEmitter {
    #client;
    #world;
    #id;
    #name;
    #disposables = new DisposableStack();
    constructor(client, contextPayload, world) {
        super();
        this.#client = client;
        this.#world = world;
        this.#id = contextPayload.id;
        if (contextPayload.name) {
            this.#name = contextPayload.name;
        }
        const clientEmitter = this.#disposables.use(new EventEmitter(this.#client));
        clientEmitter.on('Runtime.bindingCalled', this.#onBindingCalled.bind(this));
        clientEmitter.on('Runtime.executionContextDestroyed', async (event) => {
            if (event.executionContextId === this.#id) {
                this[disposeSymbol]();
            }
        });
        clientEmitter.on('Runtime.executionContextsCleared', async () => {
            this[disposeSymbol]();
        });
        clientEmitter.on('Runtime.consoleAPICalled', this.#onConsoleAPI.bind(this));
        clientEmitter.on(CDPSessionEvent.Disconnected, () => {
            this[disposeSymbol]();
        });
    }
    // Contains mapping from functions that should be bound to Puppeteer functions.
    #bindings = new Map();
    // If multiple waitFor are set up asynchronously, we need to wait for the
    // first one to set up the binding in the page before running the others.
    #mutex = new Mutex();
    async #addBinding(binding) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            if (this.#bindings.has(binding.name)) {
                return;
            }
            const _ = __addDisposableResource(env_1, await this.#mutex.acquire(), false);
            try {
                await this.#client.send('Runtime.addBinding', this.#name
                    ? {
                        name: CDP_BINDING_PREFIX + binding.name,
                        executionContextName: this.#name,
                    }
                    : {
                        name: CDP_BINDING_PREFIX + binding.name,
                        executionContextId: this.#id,
                    });
                await this.evaluate(addPageBinding, 'internal', binding.name, CDP_BINDING_PREFIX);
                this.#bindings.set(binding.name, binding);
            }
            catch (error) {
                // We could have tried to evaluate in a context which was already
                // destroyed. This happens, for example, if the page is navigated while
                // we are trying to add the binding
                if (error instanceof Error) {
                    // Destroyed context.
                    if (error.message.includes('Execution context was destroyed')) {
                        return;
                    }
                    // Missing context.
                    if (error.message.includes('Cannot find context with specified id')) {
                        return;
                    }
                }
                debugError(error);
            }
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    async #onBindingCalled(event) {
        if (event.executionContextId !== this.#id) {
            return;
        }
        let payload;
        try {
            payload = JSON.parse(event.payload);
        }
        catch {
            // The binding was either called by something in the page or it was
            // called before our wrapper was initialized.
            return;
        }
        const { type, name, seq, args, isTrivial } = payload;
        if (type !== 'internal') {
            this.emit('bindingcalled', event);
            return;
        }
        if (!this.#bindings.has(name)) {
            this.emit('bindingcalled', event);
            return;
        }
        try {
            const binding = this.#bindings.get(name);
            await binding?.run(this, seq, args, isTrivial);
        }
        catch (err) {
            debugError(err);
        }
    }
    get id() {
        return this.#id;
    }
    #onConsoleAPI(event) {
        if (event.executionContextId !== this.#id) {
            return;
        }
        this.emit('consoleapicalled', event);
    }
    #bindingsInstalled = false;
    #puppeteerUtil;
    get puppeteerUtil() {
        let promise = Promise.resolve();
        if (!this.#bindingsInstalled) {
            promise = Promise.all([
                this.#addBindingWithoutThrowing(ariaQuerySelectorBinding),
                this.#addBindingWithoutThrowing(ariaQuerySelectorAllBinding),
            ]);
            this.#bindingsInstalled = true;
        }
        scriptInjector.inject(script => {
            if (this.#puppeteerUtil) {
                void this.#puppeteerUtil.then(handle => {
                    void handle.dispose();
                });
            }
            this.#puppeteerUtil = promise.then(() => {
                return this.evaluateHandle(script);
            });
        }, !this.#puppeteerUtil);
        return this.#puppeteerUtil;
    }
    async #addBindingWithoutThrowing(binding) {
        try {
            await this.#addBinding(binding);
        }
        catch (err) {
            // If the binding cannot be added, the context is broken. We cannot
            // recover so we ignore the error.
            debugError(err);
        }
    }
    /**
     * Evaluates the given function.
     *
     * @example
     *
     * ```ts
     * const executionContext = await page.mainFrame().executionContext();
     * const result = await executionContext.evaluate(() => Promise.resolve(8 * 7))* ;
     * console.log(result); // prints "56"
     * ```
     *
     * @example
     * A string can also be passed in instead of a function:
     *
     * ```ts
     * console.log(await executionContext.evaluate('1 + 2')); // prints "3"
     * ```
     *
     * @example
     * Handles can also be passed as `args`. They resolve to their referenced object:
     *
     * ```ts
     * const oneHandle = await executionContext.evaluateHandle(() => 1);
     * const twoHandle = await executionContext.evaluateHandle(() => 2);
     * const result = await executionContext.evaluate(
     *   (a, b) => a + b,
     *   oneHandle,
     *   twoHandle,
     * );
     * await oneHandle.dispose();
     * await twoHandle.dispose();
     * console.log(result); // prints '3'.
     * ```
     *
     * @param pageFunction - The function to evaluate.
     * @param args - Additional arguments to pass into the function.
     * @returns The result of evaluating the function. If the result is an object,
     * a vanilla object containing the serializable properties of the result is
     * returned.
     */
    async evaluate(pageFunction, ...args) {
        return await this.#evaluate(true, pageFunction, ...args);
    }
    /**
     * Evaluates the given function.
     *
     * Unlike {@link ExecutionContext.evaluate | evaluate}, this method returns a
     * handle to the result of the function.
     *
     * This method may be better suited if the object cannot be serialized (e.g.
     * `Map`) and requires further manipulation.
     *
     * @example
     *
     * ```ts
     * const context = await page.mainFrame().executionContext();
     * const handle: JSHandle<typeof globalThis> = await context.evaluateHandle(
     *   () => Promise.resolve(self),
     * );
     * ```
     *
     * @example
     * A string can also be passed in instead of a function.
     *
     * ```ts
     * const handle: JSHandle<number> = await context.evaluateHandle('1 + 2');
     * ```
     *
     * @example
     * Handles can also be passed as `args`. They resolve to their referenced object:
     *
     * ```ts
     * const bodyHandle: ElementHandle<HTMLBodyElement> =
     *   await context.evaluateHandle(() => {
     *     return document.body;
     *   });
     * const stringHandle: JSHandle<string> = await context.evaluateHandle(
     *   body => body.innerHTML,
     *   body,
     * );
     * console.log(await stringHandle.jsonValue()); // prints body's innerHTML
     * // Always dispose your garbage! :)
     * await bodyHandle.dispose();
     * await stringHandle.dispose();
     * ```
     *
     * @param pageFunction - The function to evaluate.
     * @param args - Additional arguments to pass into the function.
     * @returns A {@link JSHandle | handle} to the result of evaluating the
     * function. If the result is a `Node`, then this will return an
     * {@link ElementHandle | element handle}.
     */
    async evaluateHandle(pageFunction, ...args) {
        return await this.#evaluate(false, pageFunction, ...args);
    }
    async #evaluate(returnByValue, pageFunction, ...args) {
        const sourceUrlComment = getSourceUrlComment(getSourcePuppeteerURLIfAvailable(pageFunction)?.toString() ??
            PuppeteerURL.INTERNAL_URL);
        if (isString(pageFunction)) {
            const contextId = this.#id;
            const expression = pageFunction;
            const expressionWithSourceUrl = SOURCE_URL_REGEX.test(expression)
                ? expression
                : `${expression}\n${sourceUrlComment}\n`;
            const { exceptionDetails, result: remoteObject } = await this.#client
                .send('Runtime.evaluate', {
                expression: expressionWithSourceUrl,
                contextId,
                returnByValue,
                awaitPromise: true,
                userGesture: true,
            })
                .catch(rewriteError);
            if (exceptionDetails) {
                throw createEvaluationError(exceptionDetails);
            }
            if (returnByValue) {
                return valueFromPrimitiveRemoteObject(remoteObject);
            }
            return this.#world.createCdpHandle(remoteObject);
        }
        const functionDeclaration = stringifyFunction(pageFunction);
        const functionDeclarationWithSourceUrl = SOURCE_URL_REGEX.test(functionDeclaration)
            ? functionDeclaration
            : `${functionDeclaration}\n${sourceUrlComment}\n`;
        let callFunctionOnPromise;
        try {
            callFunctionOnPromise = this.#client.send('Runtime.callFunctionOn', {
                functionDeclaration: functionDeclarationWithSourceUrl,
                executionContextId: this.#id,
                // LazyArgs are used only internally and should not affect the order
                // evaluate calls for the public APIs.
                arguments: args.some(arg => {
                    return arg instanceof LazyArg;
                })
                    ? await Promise.all(args.map(arg => {
                        return convertArgumentAsync(this, arg);
                    }))
                    : args.map(arg => {
                        return convertArgument(this, arg);
                    }),
                returnByValue,
                awaitPromise: true,
                userGesture: true,
            });
        }
        catch (error) {
            if (error instanceof TypeError &&
                error.message.startsWith('Converting circular structure to JSON')) {
                error.message += ' Recursive objects are not allowed.';
            }
            throw error;
        }
        const { exceptionDetails, result: remoteObject } = await callFunctionOnPromise.catch(rewriteError);
        if (exceptionDetails) {
            throw createEvaluationError(exceptionDetails);
        }
        if (returnByValue) {
            return valueFromPrimitiveRemoteObject(remoteObject);
        }
        return this.#world.createCdpHandle(remoteObject);
        async function convertArgumentAsync(context, arg) {
            if (arg instanceof LazyArg) {
                arg = await arg.get(context);
            }
            return convertArgument(context, arg);
        }
        function convertArgument(context, arg) {
            if (typeof arg === 'bigint') {
                return { unserializableValue: `${arg.toString()}n` };
            }
            if (Object.is(arg, -0)) {
                return { unserializableValue: '-0' };
            }
            if (Object.is(arg, Infinity)) {
                return { unserializableValue: 'Infinity' };
            }
            if (Object.is(arg, -Infinity)) {
                return { unserializableValue: '-Infinity' };
            }
            if (Object.is(arg, NaN)) {
                return { unserializableValue: 'NaN' };
            }
            const objectHandle = arg && (arg instanceof CdpJSHandle || arg instanceof CdpElementHandle)
                ? arg
                : null;
            if (objectHandle) {
                if (objectHandle.realm !== context.#world) {
                    throw new Error('JSHandles can be evaluated only in the context they were created!');
                }
                if (objectHandle.disposed) {
                    throw new Error('JSHandle is disposed!');
                }
                if (objectHandle.remoteObject().unserializableValue) {
                    return {
                        unserializableValue: objectHandle.remoteObject().unserializableValue,
                    };
                }
                if (!objectHandle.remoteObject().objectId) {
                    return { value: objectHandle.remoteObject().value };
                }
                return { objectId: objectHandle.remoteObject().objectId };
            }
            return { value: arg };
        }
    }
    [disposeSymbol]() {
        this.#disposables.dispose();
        this.emit('disposed', undefined);
        super[disposeSymbol]();
    }
}
const rewriteError = (error) => {
    if (error.message.includes('Object reference chain is too long')) {
        return { result: { type: 'undefined' } };
    }
    if (error.message.includes("Object couldn't be returned by value")) {
        return { result: { type: 'undefined' } };
    }
    if (error.message.endsWith('Cannot find context with specified id') ||
        error.message.endsWith('Inspected target navigated or closed')) {
        throw new Error('Execution context was destroyed, most likely because of a navigation.');
    }
    throw error;
};

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * We use symbols to prevent external parties listening to these events.
 * They are internal to Puppeteer.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var FrameManagerEvent;
(function (FrameManagerEvent) {
    FrameManagerEvent.FrameAttached = Symbol('FrameManager.FrameAttached');
    FrameManagerEvent.FrameNavigated = Symbol('FrameManager.FrameNavigated');
    FrameManagerEvent.FrameDetached = Symbol('FrameManager.FrameDetached');
    FrameManagerEvent.FrameSwapped = Symbol('FrameManager.FrameSwapped');
    FrameManagerEvent.LifecycleEvent = Symbol('FrameManager.LifecycleEvent');
    FrameManagerEvent.FrameNavigatedWithinDocument = Symbol('FrameManager.FrameNavigatedWithinDocument');
    FrameManagerEvent.ConsoleApiCalled = Symbol('FrameManager.ConsoleApiCalled');
    FrameManagerEvent.BindingCalled = Symbol('FrameManager.BindingCalled');
})(FrameManagerEvent || (FrameManagerEvent = {}));

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A unique key for {@link IsolatedWorldChart} to denote the default world.
 * Execution contexts are automatically created in the default world.
 *
 * @internal
 */
const MAIN_WORLD = Symbol('mainWorld');
/**
 * A unique key for {@link IsolatedWorldChart} to denote the puppeteer world.
 * This world contains all puppeteer-internal bindings/code.
 *
 * @internal
 */
const PUPPETEER_WORLD = Symbol('puppeteerWorld');

/**
 * @internal
 */
class CdpWebWorker extends WebWorker {
    #world;
    #client;
    #id;
    #targetType;
    #emitter;
    get internalEmitter() {
        return this.#emitter;
    }
    constructor(client, url, targetId, targetType, exceptionThrown, networkManager) {
        super(url);
        this.#id = targetId;
        this.#client = client;
        this.#targetType = targetType;
        this.#world = new IsolatedWorld(this, new TimeoutSettings(), MAIN_WORLD);
        this.#emitter = new EventEmitter();
        this.#client.once('Runtime.executionContextCreated', async (event) => {
            this.#world.setContext(new ExecutionContext(client, event.context, this.#world));
        });
        this.#world.emitter.on('consoleapicalled', async (event) => {
            try {
                const values = event.args.map(arg => {
                    return this.#world.createCdpHandle(arg);
                });
                const noInternalListeners = this.#emitter.listenerCount(WebWorkerEvent.Console) === 0;
                const noWorkerListeners = this.listenerCount(WebWorkerEvent.Console) === 0;
                if (noInternalListeners && noWorkerListeners) {
                    // eslint-disable-next-line max-len -- The comment is long.
                    // eslint-disable-next-line @puppeteer/use-using -- These are not owned by this function.
                    for (const value of values) {
                        void value.dispose().catch(debugError);
                    }
                    return;
                }
                const consoleMessages = createConsoleMessage(event, values, this.#id);
                this.#emitter.emit(WebWorkerEvent.Console, consoleMessages);
                if (!noWorkerListeners) {
                    this.emit(WebWorkerEvent.Console, consoleMessages);
                }
            }
            catch (err) {
                debugError(err);
            }
        });
        this.#client.on('Runtime.exceptionThrown', exceptionThrown);
        this.#client.once(CDPSessionEvent.Disconnected, () => {
            this.#world.dispose();
        });
        // This might fail if the target is closed before we receive all execution contexts.
        networkManager?.addClient(this.#client).catch(debugError);
        this.#client.send('Runtime.enable').catch(debugError);
    }
    mainRealm() {
        return this.#world;
    }
    get client() {
        return this.#client;
    }
    async close() {
        switch (this.#targetType) {
            case TargetType.SERVICE_WORKER: {
                // For service workers we need to close the target and detach to allow
                // the worker to stop.
                await this.client.connection()?.send('Target.closeTarget', {
                    targetId: this.#id,
                });
                await this.client.connection()?.send('Target.detachFromTarget', {
                    sessionId: this.client.id(),
                });
                break;
            }
            case TargetType.SHARED_WORKER: {
                await this.client.connection()?.send('Target.closeTarget', {
                    targetId: this.#id,
                });
                break;
            }
            default:
                await this.evaluate(() => {
                    self.close();
                });
        }
    }
}

/**
 * @license
 * Copyright 2019 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class IsolatedWorld extends Realm {
    #context;
    #emitter = new EventEmitter();
    #worldId;
    #origin;
    #frameOrWorker;
    constructor(frameOrWorker, timeoutSettings, worldId) {
        super(timeoutSettings);
        this.#frameOrWorker = frameOrWorker;
        this.#worldId = worldId;
    }
    get environment() {
        return this.#frameOrWorker;
    }
    get client() {
        return this.#frameOrWorker.client;
    }
    get emitter() {
        return this.#emitter;
    }
    setContext(context) {
        this.#context?.[disposeSymbol]();
        context.once('disposed', this.#onContextDisposed.bind(this));
        context.on('consoleapicalled', this.#onContextConsoleApiCalled.bind(this));
        context.on('bindingcalled', this.#onContextBindingCalled.bind(this));
        this.#context = context;
        this.#emitter.emit('context', context);
        void this.taskManager.rerunAll();
    }
    #onContextDisposed() {
        this.#context = undefined;
        if ('clearDocumentHandle' in this.#frameOrWorker) {
            this.#frameOrWorker.clearDocumentHandle();
        }
    }
    #onContextConsoleApiCalled(event) {
        this.#emitter.emit('consoleapicalled', event);
    }
    #onContextBindingCalled(event) {
        this.#emitter.emit('bindingcalled', event);
    }
    hasContext() {
        return !!this.#context;
    }
    get context() {
        return this.#context;
    }
    #executionContext() {
        if (this.disposed) {
            throw new Error(`Execution context is not available in detached frame or worker "${this.environment.url()}" (are you trying to evaluate?)`);
        }
        return this.#context;
    }
    /**
     * Waits for the next context to be set on the isolated world.
     */
    async #waitForExecutionContext() {
        const error = new Error('Execution context was destroyed');
        const result = await firstValueFrom(fromEmitterEvent(this.#emitter, 'context').pipe(raceWith(fromEmitterEvent(this.#emitter, 'disposed').pipe(map(() => {
            // The message has to match the CDP message expected by the WaitTask class.
            throw error;
        })), timeout(this.timeoutSettings.timeout()))));
        return result;
    }
    async evaluateHandle(pageFunction, ...args) {
        pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
        // This code needs to schedule evaluateHandle call synchronously (at
        // least when the context is there) so we cannot unconditionally
        // await.
        let context = this.#executionContext();
        if (!context) {
            context = await this.#waitForExecutionContext();
        }
        return await context.evaluateHandle(pageFunction, ...args);
    }
    async evaluate(pageFunction, ...args) {
        pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
        // This code needs to schedule evaluate call synchronously (at
        // least when the context is there) so we cannot unconditionally
        // await.
        let context = this.#executionContext();
        if (!context) {
            context = await this.#waitForExecutionContext();
        }
        return await context.evaluate(pageFunction, ...args);
    }
    async adoptBackendNode(backendNodeId) {
        // This code needs to schedule resolveNode call synchronously (at
        // least when the context is there) so we cannot unconditionally
        // await.
        let context = this.#executionContext();
        if (!context) {
            context = await this.#waitForExecutionContext();
        }
        const { object } = await this.client.send('DOM.resolveNode', {
            backendNodeId: backendNodeId,
            executionContextId: context.id,
        });
        return this.createCdpHandle(object);
    }
    async adoptHandle(handle) {
        if (handle.realm === this) {
            // If the context has already adopted this handle, clone it so downstream
            // disposal doesn't become an issue.
            return (await handle.evaluateHandle(value => {
                return value;
            }));
        }
        const nodeInfo = await this.client.send('DOM.describeNode', {
            objectId: handle.id,
        });
        return (await this.adoptBackendNode(nodeInfo.node.backendNodeId));
    }
    async transferHandle(handle) {
        if (handle.realm === this) {
            return handle;
        }
        // Implies it's a primitive value, probably.
        if (handle.remoteObject().objectId === undefined) {
            return handle;
        }
        const info = await this.client.send('DOM.describeNode', {
            objectId: handle.remoteObject().objectId,
        });
        const newHandle = (await this.adoptBackendNode(info.node.backendNodeId));
        await handle.dispose();
        return newHandle;
    }
    /**
     * @internal
     */
    createCdpHandle(remoteObject) {
        if (remoteObject.subtype === 'node') {
            return new CdpElementHandle(this, remoteObject);
        }
        return new CdpJSHandle(this, remoteObject);
    }
    [disposeSymbol]() {
        this.#context?.[disposeSymbol]();
        this.#emitter.emit('disposed', undefined);
        this.#emitter.removeAllListeners();
        super[disposeSymbol]();
    }
    get origin() {
        return this.#origin;
    }
    set origin(origin) {
        this.#origin = origin;
    }
    setWorldId(worldId) {
        this.#worldId = worldId;
    }
    async extension() {
        if (this.#frameOrWorker instanceof CdpWebWorker) {
            throw new Error('Unable to get extension from Realm');
        }
        if (this.#worldId === MAIN_WORLD) {
            return null;
        }
        if (typeof this.#worldId === 'string') {
            const extensions = await this.#frameOrWorker._frameManager
                .page()
                .browser()
                .extensions();
            return extensions.get(this.#worldId) ?? null;
        }
        return null;
    }
}

/**
 * @license
 * Copyright 2019 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const puppeteerToProtocolLifecycle = new Map([
    ['load', 'load'],
    ['domcontentloaded', 'DOMContentLoaded'],
    ['networkidle0', 'networkIdle'],
    ['networkidle2', 'networkAlmostIdle'],
]);
/**
 * @internal
 */
class LifecycleWatcher {
    #expectedLifecycle;
    #frame;
    #timeout;
    #navigationRequest = null;
    #subscriptions = new DisposableStack();
    #initialLoaderId;
    #terminationDeferred;
    #sameDocumentNavigationDeferred = Deferred.create();
    #lifecycleDeferred = Deferred.create();
    #newDocumentNavigationDeferred = Deferred.create();
    #error = new Error('LifecycleWatcher terminated');
    #hasSameDocumentNavigation;
    #swapped;
    #navigationResponseReceived;
    constructor(networkManager, frame, waitUntil, timeout, signal) {
        if (Array.isArray(waitUntil)) {
            waitUntil = waitUntil.slice();
        }
        else if (typeof waitUntil === 'string') {
            waitUntil = [waitUntil];
        }
        this.#initialLoaderId = frame._loaderId;
        this.#expectedLifecycle = waitUntil.map(value => {
            const protocolEvent = puppeteerToProtocolLifecycle.get(value);
            assert(protocolEvent, 'Unknown value for options.waitUntil: ' + value);
            return protocolEvent;
        });
        signal?.addEventListener('abort', () => {
            if (signal.reason instanceof Error) {
                signal.reason.cause = this.#error;
            }
            this.#terminationDeferred.reject(signal.reason);
        });
        this.#frame = frame;
        this.#timeout = timeout;
        const frameManagerEmitter = this.#subscriptions.use(new EventEmitter(frame._frameManager));
        frameManagerEmitter.on(FrameManagerEvent.LifecycleEvent, this.#checkLifecycleComplete.bind(this));
        const frameEmitter = this.#subscriptions.use(new EventEmitter(frame));
        frameEmitter.on(FrameEvent.FrameNavigatedWithinDocument, this.#navigatedWithinDocument.bind(this));
        frameEmitter.on(FrameEvent.FrameNavigated, this.#navigated.bind(this));
        frameEmitter.on(FrameEvent.FrameSwapped, this.#frameSwapped.bind(this));
        frameEmitter.on(FrameEvent.FrameSwappedByActivation, this.#frameSwapped.bind(this));
        frameEmitter.on(FrameEvent.FrameDetached, this.#onFrameDetached.bind(this));
        const networkManagerEmitter = this.#subscriptions.use(new EventEmitter(networkManager));
        networkManagerEmitter.on(NetworkManagerEvent.Request, this.#onRequest.bind(this));
        networkManagerEmitter.on(NetworkManagerEvent.Response, this.#onResponse.bind(this));
        networkManagerEmitter.on(NetworkManagerEvent.RequestFailed, this.#onRequestFailed.bind(this));
        this.#terminationDeferred = Deferred.create({
            timeout: this.#timeout,
            message: `Navigation timeout of ${this.#timeout} ms exceeded`,
        });
        this.#checkLifecycleComplete();
    }
    #onRequest(request) {
        if (request.frame() !== this.#frame || !request.isNavigationRequest()) {
            return;
        }
        this.#navigationRequest = request;
        // Resolve previous navigation response in case there are multiple
        // navigation requests reported by the backend. This generally should not
        // happen by it looks like it's possible.
        this.#navigationResponseReceived?.resolve();
        this.#navigationResponseReceived = Deferred.create();
        if (request.response() !== null) {
            this.#navigationResponseReceived?.resolve();
        }
    }
    #onRequestFailed(request) {
        if (this.#navigationRequest?.id !== request.id) {
            return;
        }
        this.#navigationResponseReceived?.resolve();
    }
    #onResponse(response) {
        if (this.#navigationRequest?.id !== response.request().id) {
            return;
        }
        this.#navigationResponseReceived?.resolve();
    }
    #onFrameDetached(frame) {
        if (this.#frame === frame) {
            this.#error.message = 'Navigating frame was detached';
            this.#terminationDeferred.resolve(this.#error);
            return;
        }
        this.#checkLifecycleComplete();
    }
    async navigationResponse() {
        // Continue with a possibly null response.
        await this.#navigationResponseReceived?.valueOrThrow();
        return this.#navigationRequest ? this.#navigationRequest.response() : null;
    }
    sameDocumentNavigationPromise() {
        return this.#sameDocumentNavigationDeferred.valueOrThrow();
    }
    newDocumentNavigationPromise() {
        return this.#newDocumentNavigationDeferred.valueOrThrow();
    }
    lifecyclePromise() {
        return this.#lifecycleDeferred.valueOrThrow();
    }
    terminationPromise() {
        return this.#terminationDeferred.valueOrThrow();
    }
    #navigatedWithinDocument() {
        this.#hasSameDocumentNavigation = true;
        this.#checkLifecycleComplete();
    }
    #navigated(navigationType) {
        if (navigationType === 'BackForwardCacheRestore') {
            return this.#frameSwapped();
        }
        this.#checkLifecycleComplete();
    }
    #frameSwapped() {
        this.#swapped = true;
        this.#checkLifecycleComplete();
    }
    #checkLifecycleComplete() {
        // We expect navigation to commit.
        if (!checkLifecycle(this.#frame, this.#expectedLifecycle)) {
            return;
        }
        this.#lifecycleDeferred.resolve();
        if (this.#hasSameDocumentNavigation) {
            this.#sameDocumentNavigationDeferred.resolve(undefined);
        }
        if (this.#swapped || this.#frame._loaderId !== this.#initialLoaderId) {
            this.#newDocumentNavigationDeferred.resolve(undefined);
        }
        function checkLifecycle(frame, expectedLifecycle) {
            for (const event of expectedLifecycle) {
                if (!frame._lifecycleEvents.has(event)) {
                    return false;
                }
            }
            for (const child of frame.childFrames()) {
                if (child._hasStartedLoading &&
                    !checkLifecycle(child, expectedLifecycle)) {
                    return false;
                }
            }
            return true;
        }
    }
    dispose() {
        this.#subscriptions.dispose();
        this.#error.cause = new Error('LifecycleWatcher disposed');
        this.#terminationDeferred.resolve(this.#error);
    }
}

export { CdpWebWorker as C, ExecutionContext as E, FrameManagerEvent as F, IsolatedWorld as I, LifecycleWatcher as L, MAIN_WORLD as M, NetworkManagerEvent as N, PUPPETEER_WORLD as P };
