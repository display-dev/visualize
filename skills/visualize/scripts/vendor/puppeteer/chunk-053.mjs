// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { c as Connection, C as Coverage } from './chunk-025.mjs';
import { P as ProtocolError, U as UnsupportedOperation, a as assert, i as isNode, e as environment, f as TargetCloseError, s as stringToTypedArray } from './chunk-015.mjs';
import { s as DEFAULT_VIEWPORT, b as debugError, m as getSourceUrlComment, P as PuppeteerURL, n as getSourcePuppeteerURLIfAvailable, i as isString, S as SOURCE_URL_REGEX, c as fromEmitterEvent, t as timeout, f as fromAbortSignal, E as EventEmitter, q as parsePDFOptions, g as Deferred, j as evaluationString, W as WEB_PERMISSION_TO_PROTOCOL_PERMISSION, B as BrowserContext, r as Browser } from './chunk-017.mjs';
import { c as createIncrementalIdGenerator } from './chunk-022.mjs';
import { _ as _connectToCdpBrowser } from './chunk-033.mjs';
import { i as isErrorLike, d as customQueryHandlers, b as ARIAQueryHandler, A as AsyncIterableUtil, a as scriptInjector, s as stringifyFunction, L as LazyArg } from './chunk-019.mjs';
import { u as of, D as combineLatest, m as map, h as first, r as raceWith, g as defer, c as filter, d as firstValueFrom, n as race, C as switchMap, F as delayWhen, b as from } from './chunk-016.mjs';
import './chunk-034.mjs';
import './chunk-027.mjs';
import './chunk-031.mjs';
import './chunk-020.mjs';
import { a as Frame, t as throwIfDetached } from './chunk-021.mjs';
import { b as bubble } from './chunk-018.mjs';
import { P as Page } from './chunk-023.mjs';
import { R as Realm, a as WebWorkerEvent, W as WebWorker, A as Accessibility, c as Target, T as TargetType } from './chunk-024.mjs';
import './chunk-032.mjs';
import { E as EmulationManager } from './chunk-026.mjs';
import './chunk-028.mjs';
import { a as BidiElementHandle, d as BidiDeserializer, b as BidiJSHandle, e as BidiCdpSession, f as BidiDialog, c as connectBidiOverCdp, B as BidiConnection } from './chunk-047.mjs';
import { U as UserContext } from './chunk-051.mjs';
import { T as Tracing, F as FileChooser } from './chunk-030.mjs';
import { E as ExposableFunction, b as rewriteEvaluationError, c as createEvaluationError, d as BidiSerializer, i as isConsoleLogEntry, g as getConsoleMessage, B as BidiHTTPRequest, e as isJavaScriptLogEntry, f as rewriteNavigationError, r as requests, a as BidiHTTPResponse } from './chunk-048.mjs';
import { B as BidiKeyboard, a as BidiMouse, b as BidiTouchscreen } from './chunk-049.mjs';
import { S as Session } from './chunk-052.mjs';

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Users should never call this directly; it's called when calling `puppeteer.connect`
 * with `protocol: 'webDriverBiDi'`. This method attaches Puppeteer to an existing browser
 * instance. First it tries to connect to the browser using pure BiDi. If the protocol is
 * not supported, connects to the browser using BiDi over CDP.
 *
 * @internal
 */
async function _connectToBiDiBrowser(connectionTransport, url, options) {
    const { acceptInsecureCerts = false, networkEnabled = true, issuesEnabled = true, defaultViewport = DEFAULT_VIEWPORT, } = options;
    const { bidiConnection, cdpConnection, closeCallback } = await getBiDiConnection(connectionTransport, url, options);
    const BiDi = await Promise.resolve().then(() => bidi);
    const bidiBrowser = await BiDi.BidiBrowser.create({
        connection: bidiConnection,
        cdpConnection,
        closeCallback,
        process: undefined,
        defaultViewport: defaultViewport,
        acceptInsecureCerts: acceptInsecureCerts,
        networkEnabled,
        issuesEnabled,
        capabilities: options.capabilities,
    });
    return bidiBrowser;
}
/**
 * Returns a BiDiConnection established to the endpoint specified by the options and a
 * callback closing the browser. Callback depends on whether the connection is pure BiDi
 * or BiDi over CDP.
 * The method tries to connect to the browser using pure BiDi protocol, and falls back
 * to BiDi over CDP.
 */
async function getBiDiConnection(connectionTransport, url, options) {
    const BiDi = await Promise.resolve().then(() => bidi);
    const { slowMo = 0, protocolTimeout, idGenerator = createIncrementalIdGenerator(), } = options;
    // Try pure BiDi first.
    const pureBidiConnection = new BiDi.BidiConnection(url, connectionTransport, idGenerator, slowMo, protocolTimeout);
    try {
        const result = await pureBidiConnection.send('session.status', {});
        if ('type' in result && result.type === 'success') {
            // The `browserWSEndpoint` points to an endpoint supporting pure WebDriver BiDi.
            return {
                bidiConnection: pureBidiConnection,
                closeCallback: async () => {
                    await pureBidiConnection.send('browser.close', {}).catch(debugError);
                },
            };
        }
    }
    catch (e) {
        if (!(e instanceof ProtocolError)) {
            // Unexpected exception not related to BiDi / CDP. Rethrow.
            throw e;
        }
    }
    // Unbind the connection to avoid memory leaks.
    pureBidiConnection.unbind();
    // Fall back to CDP over BiDi reusing the WS connection.
    const cdpConnection = new Connection(url, connectionTransport, slowMo, protocolTimeout, 
    /* rawErrors= */ true, idGenerator);
    const version = await cdpConnection.send('Browser.getVersion');
    if (version.product.toLowerCase().includes('firefox')) {
        throw new UnsupportedOperation('Firefox is not supported in BiDi over CDP mode.');
    }
    const bidiOverCdpConnection = await BiDi.connectBidiOverCdp(cdpConnection);
    return {
        cdpConnection,
        bidiConnection: bidiOverCdpConnection,
        closeCallback: async () => {
            // In case of BiDi over CDP, we need to close browser via CDP.
            await cdpConnection.send('Browser.close').catch(debugError);
        },
    };
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const getWebSocketTransportClass = async () => {
    return isNode
        ? (await import('./chunk-052.mjs').then(n => n.a)).NodeWebSocketTransport
        : (await import('./chunk-033.mjs').then(n => n.B))
            .BrowserWebSocketTransport;
};
/**
 * Users should never call this directly; it's called when calling
 * `puppeteer.connect`. This method attaches Puppeteer to an existing browser instance.
 *
 * @internal
 */
function assertSupportedUrlRestrictions(options) {
    if (options.blocklist && options.allowlist) {
        throw new Error('Cannot specify both blocklist and allowlist');
    }
    if (options.protocol === 'webDriverBiDi' &&
        (options.blocklist || options.allowlist)) {
        throw new Error('blocklist and allowlist are only supported with the CDP protocol');
    }
}
async function _connectToBrowser(options) {
    assertSupportedUrlRestrictions(options);
    const { connectionTransport, endpointUrl } = await getConnectionTransport(options);
    if (options.protocol === 'webDriverBiDi') {
        const bidiBrowser = await _connectToBiDiBrowser(connectionTransport, endpointUrl, options);
        return bidiBrowser;
    }
    else {
        const cdpBrowser = await _connectToCdpBrowser(connectionTransport, endpointUrl, options);
        return cdpBrowser;
    }
}
/**
 * Establishes a websocket connection by given options and returns both transport and
 * endpoint url the transport is connected to.
 */
async function getConnectionTransport(options) {
    const { browserWSEndpoint, browserURL, channel, transport, headers = {}, } = options;
    assert(Number(!!browserWSEndpoint) +
        Number(!!browserURL) +
        Number(!!transport) +
        Number(!!channel) ===
        1, 'Exactly one of browserWSEndpoint, browserURL, transport or channel must be passed to puppeteer.connect');
    if (transport) {
        return { connectionTransport: transport, endpointUrl: '' };
    }
    else if (browserWSEndpoint) {
        const WebSocketClass = await getWebSocketTransportClass();
        const connectionTransport = await WebSocketClass.create(browserWSEndpoint, headers);
        return {
            connectionTransport: connectionTransport,
            endpointUrl: browserWSEndpoint,
        };
    }
    else if (browserURL) {
        const connectionURL = await getWSEndpoint(browserURL);
        const WebSocketClass = await getWebSocketTransportClass();
        const connectionTransport = await WebSocketClass.create(connectionURL);
        return {
            connectionTransport: connectionTransport,
            endpointUrl: connectionURL,
        };
    }
    else if (options.channel && isNode) {
        const { detectBrowserPlatform, resolveDefaultUserDataDir, Browser } = await import('./chunk-015.mjs').then(n => n.h);
        const platform = detectBrowserPlatform();
        if (!platform) {
            throw new Error('Could not detect required browser platform');
        }
        const { convertPuppeteerChannelToBrowsersChannel } = await import('./chunk-052.mjs').then(n => n.L);
        const { join } = await import('node:path');
        const userDataDir = resolveDefaultUserDataDir(Browser.CHROME, platform, convertPuppeteerChannelToBrowsersChannel(options.channel));
        const portPath = join(userDataDir, 'DevToolsActivePort');
        try {
            const fileContent = await environment.value.fs.promises.readFile(portPath, 'ascii');
            const [rawPort, rawPath] = fileContent
                .split('\n')
                .map(line => {
                return line.trim();
            })
                .filter(line => {
                return !!line;
            });
            if (!rawPort || !rawPath) {
                throw new Error(`Invalid DevToolsActivePort '${fileContent}' found`);
            }
            const port = parseInt(rawPort, 10);
            if (isNaN(port) || port <= 0 || port > 65535) {
                throw new Error(`Invalid port '${rawPort}' found`);
            }
            const browserWSEndpoint = `ws://localhost:${port}${rawPath}`;
            const WebSocketClass = await getWebSocketTransportClass();
            const connectionTransport = await WebSocketClass.create(browserWSEndpoint, headers);
            return {
                connectionTransport: connectionTransport,
                endpointUrl: browserWSEndpoint,
            };
        }
        catch (error) {
            throw new Error(`Could not find DevToolsActivePort for ${options.channel} at ${portPath}`, {
                cause: error,
            });
        }
    }
    throw new Error('Invalid connection options');
}
async function getWSEndpoint(browserURL) {
    const endpointURL = new URL('/json/version', browserURL);
    try {
        const result = await globalThis.fetch(endpointURL.toString(), {
            method: 'GET',
        });
        if (!result.ok) {
            throw new Error(`HTTP ${result.statusText}`);
        }
        const data = await result.json();
        return data.webSocketDebuggerUrl;
    }
    catch (error) {
        if (isErrorLike(error)) {
            error.message =
                `Failed to fetch browser webSocket URL from ${endpointURL}: ` +
                    error.message;
        }
        throw error;
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The main Puppeteer class.
 *
 * IMPORTANT: if you are using Puppeteer in a Node environment, you will get an
 * instance of {@link PuppeteerNode} when you import or require `puppeteer`.
 * That class extends `Puppeteer`, so has all the methods documented below as
 * well as all that are defined on {@link PuppeteerNode}.
 *
 * @public
 */
class Puppeteer {
    /**
     * Operations for {@link CustomQueryHandler | custom query handlers}. See
     * {@link CustomQueryHandlerRegistry}.
     *
     * @internal
     */
    static customQueryHandlers = customQueryHandlers;
    /**
     * Registers a {@link CustomQueryHandler | custom query handler}.
     *
     * @remarks
     * After registration, the handler can be used everywhere where a selector is
     * expected by prepending the selection string with `<name>/`. The name is only
     * allowed to consist of lower- and upper case latin letters.
     *
     * @example
     *
     * ```
     * import {Puppeteer}, puppeteer from 'puppeteer';
     *
     * Puppeteer.registerCustomQueryHandler('text', { … });
     * const aHandle = await page.$('text/…');
     * ```
     *
     * @param name - The name that the custom query handler will be registered
     * under.
     * @param queryHandler - The {@link CustomQueryHandler | custom query handler}
     * to register.
     *
     * @public
     */
    static registerCustomQueryHandler(name, queryHandler) {
        return this.customQueryHandlers.register(name, queryHandler);
    }
    /**
     * Unregisters a custom query handler for a given name.
     */
    static unregisterCustomQueryHandler(name) {
        return this.customQueryHandlers.unregister(name);
    }
    /**
     * Gets the names of all custom query handlers.
     */
    static customQueryHandlerNames() {
        return this.customQueryHandlers.names();
    }
    /**
     * Unregisters all custom query handlers.
     */
    static clearCustomQueryHandlers() {
        return this.customQueryHandlers.clear();
    }
    /**
     * @internal
     */
    _isPuppeteerCore;
    /**
     * @internal
     */
    _changedBrowsers = false;
    /**
     * @internal
     */
    constructor(settings) {
        this._isPuppeteerCore = settings.isPuppeteerCore;
        this.connect = this.connect.bind(this);
    }
    /**
     * This method attaches Puppeteer to an existing browser instance.
     *
     * @remarks
     *
     * @param options - Set of configurable options to set on the browser.
     * @returns Promise which resolves to browser instance.
     */
    connect(options) {
        return _connectToBrowser(options);
    }
}

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
/**
 * @internal
 */
class BidiRealm extends Realm {
    realm;
    constructor(realm, timeoutSettings) {
        super(timeoutSettings);
        this.realm = realm;
    }
    initialize() {
        this.realm.on('destroyed', reason => {
            this.taskManager.terminateAll(new Error(reason));
            this.dispose();
        });
        this.realm.on('updated', () => {
            this.internalPuppeteerUtil = undefined;
            void this.taskManager.rerunAll();
        });
    }
    internalPuppeteerUtil;
    get puppeteerUtil() {
        const promise = Promise.resolve();
        scriptInjector.inject(script => {
            if (this.internalPuppeteerUtil) {
                void this.internalPuppeteerUtil.then(handle => {
                    void handle.dispose();
                });
            }
            this.internalPuppeteerUtil = promise.then(() => {
                return this.evaluateHandle(script);
            });
        }, !this.internalPuppeteerUtil);
        return this.internalPuppeteerUtil;
    }
    async evaluateHandle(pageFunction, ...args) {
        return await this.#evaluate(false, pageFunction, ...args);
    }
    async evaluate(pageFunction, ...args) {
        return await this.#evaluate(true, pageFunction, ...args);
    }
    async #evaluate(returnByValue, pageFunction, ...args) {
        const sourceUrlComment = getSourceUrlComment(getSourcePuppeteerURLIfAvailable(pageFunction)?.toString() ??
            PuppeteerURL.INTERNAL_URL);
        let responsePromise;
        const resultOwnership = returnByValue
            ? "none" /* Bidi.Script.ResultOwnership.None */
            : "root" /* Bidi.Script.ResultOwnership.Root */;
        const serializationOptions = returnByValue
            ? {}
            : {
                maxObjectDepth: 0,
                maxDomDepth: 0,
            };
        if (isString(pageFunction)) {
            const expression = SOURCE_URL_REGEX.test(pageFunction)
                ? pageFunction
                : `${pageFunction}\n${sourceUrlComment}\n`;
            responsePromise = this.realm.evaluate(expression, true, {
                resultOwnership,
                userActivation: true,
                serializationOptions,
            });
        }
        else {
            let functionDeclaration = stringifyFunction(pageFunction);
            functionDeclaration = SOURCE_URL_REGEX.test(functionDeclaration)
                ? functionDeclaration
                : `${functionDeclaration}\n${sourceUrlComment}\n`;
            responsePromise = this.realm.callFunction(functionDeclaration, 
            /* awaitPromise= */ true, {
                // LazyArgs are used only internally and should not affect the order
                // evaluate calls for the public APIs.
                arguments: args.some(arg => {
                    return arg instanceof LazyArg;
                })
                    ? await Promise.all(args.map(arg => {
                        return this.serializeAsync(arg);
                    }))
                    : args.map(arg => {
                        return this.serialize(arg);
                    }),
                resultOwnership,
                userActivation: true,
                serializationOptions,
            });
        }
        const result = await responsePromise.catch(rewriteEvaluationError);
        if ('type' in result && result.type === 'exception') {
            throw createEvaluationError(result.exceptionDetails);
        }
        if (returnByValue) {
            return BidiDeserializer.deserialize(result.result);
        }
        return this.createHandle(result.result);
    }
    createHandle(result) {
        if ((result.type === 'node' || result.type === 'window') &&
            this instanceof BidiFrameRealm) {
            return BidiElementHandle.from(result, this);
        }
        return BidiJSHandle.from(result, this);
    }
    async serializeAsync(arg) {
        if (arg instanceof LazyArg) {
            arg = await arg.get(this);
        }
        return this.serialize(arg);
    }
    serialize(arg) {
        if (arg instanceof BidiJSHandle || arg instanceof BidiElementHandle) {
            if (arg.realm !== this) {
                if (!(arg.realm instanceof BidiFrameRealm) ||
                    !(this instanceof BidiFrameRealm)) {
                    throw new Error("Trying to evaluate JSHandle from different global types. Usually this means you're using a handle from a worker in a page or vice versa.");
                }
                if (arg.realm.environment !== this.environment) {
                    throw new Error("Trying to evaluate JSHandle from different frames. Usually this means you're using a handle from a page on a different page.");
                }
            }
            if (arg.disposed) {
                throw new Error('JSHandle is disposed!');
            }
            return arg.remoteValue();
        }
        return BidiSerializer.serialize(arg);
    }
    async destroyHandles(handles) {
        if (this.disposed) {
            return;
        }
        const handleIds = handles
            .map(({ id }) => {
            return id;
        })
            .filter((id) => {
            return id !== undefined;
        });
        if (handleIds.length === 0) {
            return;
        }
        await this.realm.disown(handleIds).catch(error => {
            // Exceptions might happen in case of a page been navigated or closed.
            // Swallow these since they are harmless and we don't leak anything in this case.
            debugError(error);
        });
    }
    async adoptHandle(handle) {
        return (await this.evaluateHandle(node => {
            return node;
        }, handle));
    }
    async transferHandle(handle) {
        if (handle.realm === this) {
            return handle;
        }
        const transferredHandle = this.adoptHandle(handle);
        await handle.dispose();
        return await transferredHandle;
    }
    extension() {
        throw new UnsupportedOperation();
    }
    get origin() {
        throw new UnsupportedOperation();
    }
}
/**
 * @internal
 */
class BidiFrameRealm extends BidiRealm {
    static from(realm, frame) {
        const frameRealm = new BidiFrameRealm(realm, frame);
        frameRealm.#initialize();
        return frameRealm;
    }
    #frame;
    constructor(realm, frame) {
        super(realm, frame.timeoutSettings);
        this.#frame = frame;
    }
    #initialize() {
        super.initialize();
        // This should run first.
        this.realm.on('updated', () => {
            this.environment.clearDocumentHandle();
            this.#bindingsInstalled = false;
        });
    }
    #bindingsInstalled = false;
    get puppeteerUtil() {
        let promise = Promise.resolve();
        if (!this.#bindingsInstalled) {
            promise = Promise.all([
                ExposableFunction.from(this.environment, '__ariaQuerySelector', ARIAQueryHandler.queryOne, !!this.sandbox),
                ExposableFunction.from(this.environment, '__ariaQuerySelectorAll', async (element, selector) => {
                    const results = ARIAQueryHandler.queryAll(element, selector);
                    return await element.realm.evaluateHandle((...elements) => {
                        return elements;
                    }, ...(await AsyncIterableUtil.collect(results)));
                }, !!this.sandbox),
            ]);
            this.#bindingsInstalled = true;
        }
        return promise.then(() => {
            return super.puppeteerUtil;
        });
    }
    get sandbox() {
        return this.realm.sandbox;
    }
    get environment() {
        return this.#frame;
    }
    async adoptBackendNode(backendNodeId) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            const { object } = await this.#frame.client.send('DOM.resolveNode', {
                backendNodeId,
                executionContextId: await this.realm.resolveExecutionContextId(),
            });
            const handle = __addDisposableResource$2(env_1, BidiElementHandle.from({
                handle: object.objectId,
                type: 'node',
            }, this), false);
            // We need the sharedId, so we perform the following to obtain it.
            return await handle.evaluateHandle(element => {
                return element;
            });
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources$2(env_1);
        }
    }
}
/**
 * @internal
 */
class BidiWorkerRealm extends BidiRealm {
    static from(realm, worker) {
        const workerRealm = new BidiWorkerRealm(realm, worker);
        workerRealm.initialize();
        return workerRealm;
    }
    #worker;
    constructor(realm, frame) {
        super(realm, frame.timeoutSettings);
        this.#worker = frame;
    }
    initialize() {
        super.initialize();
        this.realm.on('log', entry => {
            if (isConsoleLogEntry(entry) &&
                this.#worker.listenerCount(WebWorkerEvent.Console)) {
                const args = entry.args.map(arg => {
                    return this.createHandle(arg);
                });
                const message = getConsoleMessage(entry, args, undefined, this.realm.id);
                this.#worker.emit(WebWorkerEvent.Console, message);
            }
        });
    }
    get environment() {
        return this.#worker;
    }
    async adoptBackendNode() {
        throw new Error('Cannot adopt DOM nodes into a worker.');
    }
}

/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class BidiWebWorker extends WebWorker {
    static from(frame, realm) {
        const worker = new BidiWebWorker(frame, realm);
        return worker;
    }
    #frame;
    #realm;
    constructor(frame, realm) {
        super(realm.origin);
        this.#frame = frame;
        this.#realm = BidiWorkerRealm.from(realm, this);
    }
    get frame() {
        return this.#frame;
    }
    mainRealm() {
        return this.#realm;
    }
    get client() {
        throw new UnsupportedOperation();
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var __runInitializers$3 = (undefined && undefined.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate$3 = (undefined && undefined.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
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
var __setFunctionName$1 = (undefined && undefined.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
let BidiFrame = (() => {
    let _classSuper = Frame;
    let _instanceExtraInitializers = [];
    let _goto_decorators;
    let _setContent_decorators;
    let _waitForNavigation_decorators;
    let _private_waitForLoad$_decorators;
    let _private_waitForLoad$_descriptor;
    let _private_waitForNetworkIdle$_decorators;
    let _private_waitForNetworkIdle$_descriptor;
    let _setFiles_decorators;
    let _frameElement_decorators;
    let _locateNodes_decorators;
    return class BidiFrame extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _goto_decorators = [throwIfDetached];
            _setContent_decorators = [throwIfDetached];
            _waitForNavigation_decorators = [throwIfDetached];
            _private_waitForLoad$_decorators = [throwIfDetached];
            _private_waitForNetworkIdle$_decorators = [throwIfDetached];
            _setFiles_decorators = [throwIfDetached];
            _frameElement_decorators = [throwIfDetached];
            _locateNodes_decorators = [throwIfDetached];
            __esDecorate$3(this, null, _goto_decorators, { kind: "method", name: "goto", static: false, private: false, access: { has: obj => "goto" in obj, get: obj => obj.goto }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, null, _setContent_decorators, { kind: "method", name: "setContent", static: false, private: false, access: { has: obj => "setContent" in obj, get: obj => obj.setContent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, null, _waitForNavigation_decorators, { kind: "method", name: "waitForNavigation", static: false, private: false, access: { has: obj => "waitForNavigation" in obj, get: obj => obj.waitForNavigation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, _private_waitForLoad$_descriptor = { value: __setFunctionName$1(function (options = {}) {
                    let { waitUntil = 'load' } = options;
                    const { timeout: ms = this.timeoutSettings.navigationTimeout() } = options;
                    if (!Array.isArray(waitUntil)) {
                        waitUntil = [waitUntil];
                    }
                    const events = new Set();
                    for (const lifecycleEvent of waitUntil) {
                        switch (lifecycleEvent) {
                            case 'load': {
                                events.add('load');
                                break;
                            }
                            case 'domcontentloaded': {
                                events.add('DOMContentLoaded');
                                break;
                            }
                        }
                    }
                    if (events.size === 0) {
                        return of(undefined);
                    }
                    return combineLatest([...events].map(event => {
                        return fromEmitterEvent(this.browsingContext, event);
                    })).pipe(map(() => { }), first(), raceWith(timeout(ms), this.#detached$().pipe(map(() => {
                        throw new Error('Frame detached.');
                    }))));
                }, "#waitForLoad$") }, _private_waitForLoad$_decorators, { kind: "method", name: "#waitForLoad$", static: false, private: true, access: { has: obj => #waitForLoad$ in obj, get: obj => obj.#waitForLoad$ }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, _private_waitForNetworkIdle$_descriptor = { value: __setFunctionName$1(function (options = {}) {
                    let { waitUntil = 'load' } = options;
                    if (!Array.isArray(waitUntil)) {
                        waitUntil = [waitUntil];
                    }
                    let concurrency = Infinity;
                    for (const event of waitUntil) {
                        switch (event) {
                            case 'networkidle0': {
                                concurrency = Math.min(0, concurrency);
                                break;
                            }
                            case 'networkidle2': {
                                concurrency = Math.min(2, concurrency);
                                break;
                            }
                        }
                    }
                    if (concurrency === Infinity) {
                        return of(undefined);
                    }
                    return this.page().waitForNetworkIdle$({
                        idleTime: 500,
                        timeout: options.timeout ?? this.timeoutSettings.timeout(),
                        concurrency,
                    });
                }, "#waitForNetworkIdle$") }, _private_waitForNetworkIdle$_decorators, { kind: "method", name: "#waitForNetworkIdle$", static: false, private: true, access: { has: obj => #waitForNetworkIdle$ in obj, get: obj => obj.#waitForNetworkIdle$ }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, null, _setFiles_decorators, { kind: "method", name: "setFiles", static: false, private: false, access: { has: obj => "setFiles" in obj, get: obj => obj.setFiles }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, null, _frameElement_decorators, { kind: "method", name: "frameElement", static: false, private: false, access: { has: obj => "frameElement" in obj, get: obj => obj.frameElement }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate$3(this, null, _locateNodes_decorators, { kind: "method", name: "locateNodes", static: false, private: false, access: { has: obj => "locateNodes" in obj, get: obj => obj.locateNodes }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static from(parent, browsingContext) {
            const frame = new BidiFrame(parent, browsingContext);
            frame.#initialize();
            return frame;
        }
        #parent = __runInitializers$3(this, _instanceExtraInitializers);
        browsingContext;
        #frames = new WeakMap();
        realms;
        _id;
        client;
        accessibility;
        constructor(parent, browsingContext) {
            super();
            this.#parent = parent;
            this.browsingContext = browsingContext;
            this._id = browsingContext.id;
            this.client = new BidiCdpSession(this);
            this.realms = {
                default: BidiFrameRealm.from(this.browsingContext.defaultRealm, this),
                internal: BidiFrameRealm.from(this.browsingContext.createWindowRealm(`__puppeteer_internal_${Math.ceil(Math.random() * 10000)}`), this),
            };
            this.accessibility = new Accessibility(this.realms.default, this._id);
        }
        #initialize() {
            for (const browsingContext of this.browsingContext.children) {
                this.#createFrameTarget(browsingContext);
            }
            this.browsingContext.on('browsingcontext', browsingContext => {
                this.#createFrameTarget(browsingContext);
            });
            this.browsingContext.on('closed', () => {
                for (const session of BidiCdpSession.sessions.values()) {
                    if (session.frame === this) {
                        session.onClose();
                    }
                }
                this.page().trustedEmitter.emit("framedetached" /* PageEvent.FrameDetached */, this);
            });
            this.browsingContext.on('request', request => {
                const httpRequest = BidiHTTPRequest.from(request, this, this.page().isNetworkInterceptionEnabled);
                request.once('success', () => {
                    this.page().trustedEmitter.emit("requestfinished" /* PageEvent.RequestFinished */, httpRequest);
                });
                request.once('error', () => {
                    this.page().trustedEmitter.emit("requestfailed" /* PageEvent.RequestFailed */, httpRequest);
                });
                void httpRequest.finalizeInterceptions();
            });
            this.browsingContext.on('navigation', navigation => {
                navigation.once('fragment', () => {
                    this.page().trustedEmitter.emit("framenavigated" /* PageEvent.FrameNavigated */, this);
                });
            });
            this.browsingContext.on('load', () => {
                this.page().trustedEmitter.emit("load" /* PageEvent.Load */, undefined);
            });
            this.browsingContext.on('DOMContentLoaded', () => {
                this._hasStartedLoading = true;
                this.page().trustedEmitter.emit("domcontentloaded" /* PageEvent.DOMContentLoaded */, undefined);
                this.page().trustedEmitter.emit("framenavigated" /* PageEvent.FrameNavigated */, this);
            });
            this.browsingContext.on('userprompt', userPrompt => {
                this.page().trustedEmitter.emit("dialog" /* PageEvent.Dialog */, BidiDialog.from(userPrompt));
            });
            this.browsingContext.on('log', entry => {
                if (this._id !== entry.source.context) {
                    return;
                }
                if (isConsoleLogEntry(entry)) {
                    if (!this.page().listenerCount("console" /* PageEvent.Console */)) {
                        return;
                    }
                    const args = entry.args.map(arg => {
                        return this.mainRealm().createHandle(arg);
                    });
                    this.page().trustedEmitter.emit("console" /* PageEvent.Console */, getConsoleMessage(entry, args, this));
                }
                else if (isJavaScriptLogEntry(entry)) {
                    const error = new Error(entry.text ?? '');
                    const messageHeight = error.message.split('\n').length;
                    const messageLines = error.stack.split('\n').splice(0, messageHeight);
                    const stackLines = [];
                    if (entry.stackTrace) {
                        for (const frame of entry.stackTrace.callFrames) {
                            // Note we need to add `1` because the values are 0-indexed.
                            stackLines.push(`    at ${frame.functionName || '<anonymous>'} (${frame.url}:${frame.lineNumber + 1}:${frame.columnNumber + 1})`);
                            if (stackLines.length >= Error.stackTraceLimit) {
                                break;
                            }
                        }
                    }
                    error.stack = [...messageLines, ...stackLines].join('\n');
                    this.page().trustedEmitter.emit("pageerror" /* PageEvent.PageError */, error);
                }
                else {
                    debugError(`Unhandled LogEntry with type "${entry.type}", text "${entry.text}" and level "${entry.level}"`);
                }
            });
            this.browsingContext.on('worker', realm => {
                const worker = BidiWebWorker.from(this, realm);
                realm.on('destroyed', () => {
                    this.page().trustedEmitter.emit("workerdestroyed" /* PageEvent.WorkerDestroyed */, worker);
                });
                this.page().trustedEmitter.emit("workercreated" /* PageEvent.WorkerCreated */, worker);
            });
        }
        #createFrameTarget(browsingContext) {
            const frame = BidiFrame.from(this, browsingContext);
            this.#frames.set(browsingContext, frame);
            this.page().trustedEmitter.emit("frameattached" /* PageEvent.FrameAttached */, frame);
            browsingContext.on('closed', () => {
                this.#frames.delete(browsingContext);
            });
            return frame;
        }
        get timeoutSettings() {
            return this.page()._timeoutSettings;
        }
        mainRealm() {
            return this.realms.default;
        }
        isolatedRealm() {
            return this.realms.internal;
        }
        realm(id) {
            for (const realm of Object.values(this.realms)) {
                if (realm.realm.id === id) {
                    return realm;
                }
            }
            return;
        }
        page() {
            let parent = this.#parent;
            while (parent instanceof BidiFrame) {
                parent = parent.#parent;
            }
            return parent;
        }
        url() {
            return this.browsingContext.url;
        }
        parentFrame() {
            if (this.#parent instanceof BidiFrame) {
                return this.#parent;
            }
            return null;
        }
        childFrames() {
            return [...this.browsingContext.children].map(child => {
                return this.#frames.get(child);
            });
        }
        #detached$() {
            return defer(() => {
                if (this.detached) {
                    return of(this);
                }
                return fromEmitterEvent(this.page().trustedEmitter, "framedetached" /* PageEvent.FrameDetached */).pipe(filter(detachedFrame => {
                    return detachedFrame === this;
                }));
            });
        }
        async goto(url, options = {}) {
            const [response] = await Promise.all([
                this.waitForNavigation(options),
                // Some implementations currently only report errors when the
                // readiness=interactive.
                //
                // Related: https://bugzilla.mozilla.org/show_bug.cgi?id=1846601
                this.browsingContext
                    .navigate(url, "interactive" /* Bidi.BrowsingContext.ReadinessState.Interactive */)
                    .catch(error => {
                    if (isErrorLike(error) &&
                        error.message.includes('net::ERR_HTTP_RESPONSE_CODE_FAILURE')) {
                        return;
                    }
                    if (error.message.includes('navigation canceled')) {
                        return;
                    }
                    if (error.message.includes('Navigation was aborted by another navigation')) {
                        return;
                    }
                    throw error;
                }),
            ]).catch(rewriteNavigationError(url, options.timeout ?? this.timeoutSettings.navigationTimeout()));
            return response;
        }
        async setContent(html, options = {}) {
            await Promise.all([
                this.setFrameContent(html),
                firstValueFrom(combineLatest([
                    this.#waitForLoad$(options),
                    this.#waitForNetworkIdle$(options),
                ])),
            ]);
        }
        async waitForNavigation(options = {}) {
            const { timeout: ms = this.timeoutSettings.navigationTimeout(), signal } = options;
            const frames = this.childFrames().map(frame => {
                return frame.#detached$();
            });
            return await firstValueFrom(combineLatest([
                race(fromEmitterEvent(this.browsingContext, 'navigation'), fromEmitterEvent(this.browsingContext, 'historyUpdated').pipe(map(() => {
                    return null;
                })))
                    .pipe(first())
                    .pipe(switchMap(navigation => {
                    if (navigation === null) {
                        return of(null);
                    }
                    return this.#waitForLoad$(options).pipe(delayWhen(() => {
                        if (frames.length === 0) {
                            return of(undefined);
                        }
                        return combineLatest(frames);
                    }), raceWith(fromEmitterEvent(navigation, 'fragment'), fromEmitterEvent(navigation, 'failed'), fromEmitterEvent(navigation, 'aborted')), switchMap(() => {
                        if (navigation.request) {
                            function requestFinished$(request) {
                                if (navigation === null) {
                                    return of(null);
                                }
                                // Reduces flakiness if the response events arrive after
                                // the load event.
                                // Usually, the response or error is already there at this point.
                                if (request.response || request.error) {
                                    return of(navigation);
                                }
                                if (request.redirect) {
                                    return requestFinished$(request.redirect);
                                }
                                return fromEmitterEvent(request, 'success')
                                    .pipe(raceWith(fromEmitterEvent(request, 'error')), raceWith(fromEmitterEvent(request, 'redirect')))
                                    .pipe(switchMap(() => {
                                    return requestFinished$(request);
                                }));
                            }
                            return requestFinished$(navigation.request);
                        }
                        return of(navigation);
                    }));
                })),
                this.#waitForNetworkIdle$(options),
            ]).pipe(map(([navigation]) => {
                if (!navigation) {
                    return null;
                }
                const request = navigation.request;
                if (!request) {
                    return null;
                }
                const lastRequest = request.lastRedirect ?? request;
                const httpRequest = requests.get(lastRequest);
                return httpRequest.response();
            }), raceWith(timeout(ms), fromAbortSignal(signal), this.#detached$().pipe(map(() => {
                throw new TargetCloseError('Frame detached.');
            })))));
        }
        waitForDevicePrompt(options = {}) {
            const { timeout = this.timeoutSettings.timeout(), signal } = options;
            return this.browsingContext.waitForDevicePrompt(timeout, signal);
        }
        get detached() {
            return this.browsingContext.closed;
        }
        #exposedFunctions = new Map();
        async exposeFunction(name, apply) {
            if (this.#exposedFunctions.has(name)) {
                throw new Error(`Failed to add page binding with name ${name}: globalThis['${name}'] already exists!`);
            }
            const exposable = await ExposableFunction.from(this, name, apply);
            this.#exposedFunctions.set(name, exposable);
        }
        async removeExposedFunction(name) {
            const exposedFunction = this.#exposedFunctions.get(name);
            if (!exposedFunction) {
                throw new Error(`Failed to remove page binding with name ${name}: window['${name}'] does not exists!`);
            }
            this.#exposedFunctions.delete(name);
            await exposedFunction[Symbol.asyncDispose]();
        }
        async createCDPSession() {
            if (!this.page().browser().cdpSupported) {
                throw new UnsupportedOperation();
            }
            const cdpConnection = this.page().browser().cdpConnection;
            return await cdpConnection._createSession({ targetId: this._id });
        }
        get #waitForLoad$() { return _private_waitForLoad$_descriptor.value; }
        get #waitForNetworkIdle$() { return _private_waitForNetworkIdle$_descriptor.value; }
        async setFiles(element, files) {
            await this.browsingContext.setFiles(
            // SAFETY: ElementHandles are always remote references.
            element.remoteValue(), files);
        }
        async frameElement() {
            const parentFrame = this.parentFrame();
            if (!parentFrame) {
                return null;
            }
            const [node] = await parentFrame.browsingContext.locateNodes({
                type: 'context',
                value: {
                    context: this._id,
                },
            });
            if (!node) {
                return null;
            }
            return BidiElementHandle.from(node, parentFrame.mainRealm());
        }
        async locateNodes(element, locator) {
            return await this.browsingContext.locateNodes(locator, 
            // SAFETY: ElementHandles are always remote references.
            [element.remoteValue()]);
        }
        extensionRealms() {
            throw new UnsupportedOperation();
        }
    };
})();

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var __esDecorate$2 = (undefined && undefined.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
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
var __runInitializers$2 = (undefined && undefined.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
 * Implements Page using WebDriver BiDi.
 *
 * @internal
 */
let BidiPage = (() => {
    let _classSuper = Page;
    let _trustedEmitter_decorators;
    let _trustedEmitter_initializers = [];
    let _trustedEmitter_extraInitializers = [];
    return class BidiPage extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _trustedEmitter_decorators = [bubble()];
            __esDecorate$2(this, null, _trustedEmitter_decorators, { kind: "accessor", name: "trustedEmitter", static: false, private: false, access: { has: obj => "trustedEmitter" in obj, get: obj => obj.trustedEmitter, set: (obj, value) => { obj.trustedEmitter = value; } }, metadata: _metadata }, _trustedEmitter_initializers, _trustedEmitter_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static from(browserContext, browsingContext) {
            const page = new BidiPage(browserContext, browsingContext);
            page.#initialize();
            return page;
        }
        #trustedEmitter_accessor_storage = __runInitializers$2(this, _trustedEmitter_initializers, new EventEmitter());
        get trustedEmitter() { return this.#trustedEmitter_accessor_storage; }
        set trustedEmitter(value) { this.#trustedEmitter_accessor_storage = value; }
        #browserContext = __runInitializers$2(this, _trustedEmitter_extraInitializers);
        #frame;
        #viewport = null;
        #workers = new Set();
        keyboard;
        mouse;
        touchscreen;
        tracing;
        get webmcp() {
            throw new UnsupportedOperation();
        }
        coverage;
        #cdpEmulationManager;
        #emulatedNetworkConditions;
        #fileChooserDeferreds = new Set();
        _client() {
            return this.#frame.client;
        }
        constructor(browserContext, browsingContext) {
            super();
            this.#browserContext = browserContext;
            this.#frame = BidiFrame.from(this, browsingContext);
            this.#cdpEmulationManager = new EmulationManager(this.#frame.client);
            this.tracing = new Tracing(this.#frame.client);
            this.coverage = new Coverage(this.#frame.client);
            this.keyboard = new BidiKeyboard(this);
            this.mouse = new BidiMouse(this);
            this.touchscreen = new BidiTouchscreen(this);
        }
        #initialize() {
            this.#frame.browsingContext.on('closed', () => {
                this.trustedEmitter.emit("close" /* PageEvent.Close */, undefined);
                this.trustedEmitter.removeAllListeners();
            });
            this.trustedEmitter.on("workercreated" /* PageEvent.WorkerCreated */, worker => {
                this.#workers.add(worker);
            });
            this.trustedEmitter.on("workerdestroyed" /* PageEvent.WorkerDestroyed */, worker => {
                this.#workers.delete(worker);
            });
        }
        /**
         * @internal
         */
        async setUserAgent(userAgentOrOptions, userAgentMetadata) {
            let userAgent;
            let clientHints;
            let platform;
            if (typeof userAgentOrOptions === 'string') {
                userAgent = userAgentOrOptions;
                clientHints = userAgentMetadata;
            }
            else {
                userAgent = userAgentOrOptions.userAgent ?? null;
                clientHints = userAgentOrOptions.userAgentMetadata;
                // Empty string platform should be interpreted as "no override".
                platform =
                    userAgentOrOptions.platform === ''
                        ? undefined
                        : userAgentOrOptions.platform;
            }
            if (userAgent === '') {
                // In WebDriver BiDi null is used to restore the original user agent.
                userAgent = null;
            }
            await this.#frame.browsingContext.setUserAgent(userAgent);
            if (platform && platform !== '') {
                // Work-around until https://github.com/w3c/webdriver-bidi/issues/1065 is resolved.
                // Set platform via client hints override.
                clientHints = clientHints ?? {};
                clientHints.platform = platform;
            }
            await this.#frame.browsingContext.setClientHintsOverride(clientHints ?? null);
        }
        async setBypassCSP(enabled) {
            // TODO: handle CDP-specific cases such as MPArch.
            await this._client().send('Page.setBypassCSP', { enabled });
        }
        async queryObjects(prototypeHandle) {
            assert(!prototypeHandle.disposed, 'Prototype JSHandle is disposed!');
            assert(prototypeHandle.id, 'Prototype JSHandle must not be referencing primitive value');
            const response = await this.#frame.client.send('Runtime.queryObjects', {
                prototypeObjectId: prototypeHandle.id,
            });
            return this.#frame.mainRealm().createHandle({
                type: 'array',
                handle: response.objects.objectId,
            });
        }
        browser() {
            return this.browserContext().browser();
        }
        browserContext() {
            return this.#browserContext;
        }
        mainFrame() {
            return this.#frame;
        }
        async triggerExtensionAction(_extension) {
            throw new UnsupportedOperation();
        }
        async emulateFocusedPage(enabled) {
            return await this.#cdpEmulationManager.emulateFocus(enabled);
        }
        resize(_params) {
            throw new UnsupportedOperation();
        }
        async windowId() {
            return this.#frame.browsingContext.windowId;
        }
        openDevTools() {
            throw new UnsupportedOperation();
        }
        hasDevTools() {
            throw new UnsupportedOperation();
        }
        async focusedFrame() {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource$1(env_1, (await this.mainFrame()
                    .isolatedRealm()
                    .evaluateHandle(() => {
                    let win = window;
                    while (win.document.activeElement instanceof win.HTMLIFrameElement ||
                        win.document.activeElement instanceof win.HTMLFrameElement) {
                        if (win.document.activeElement.contentWindow === null) {
                            break;
                        }
                        win = win.document.activeElement.contentWindow;
                    }
                    return win;
                })), false);
                const value = handle.remoteValue();
                assert(value.type === 'window');
                const frame = this.frames().find(frame => {
                    return frame._id === value.value.context;
                });
                assert(frame);
                return frame;
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                __disposeResources$1(env_1);
            }
        }
        frames() {
            const frames = [this.#frame];
            for (const frame of frames) {
                frames.push(...frame.childFrames());
            }
            return frames;
        }
        isClosed() {
            return this.#frame.detached;
        }
        async close(options) {
            const env_2 = { stack: [], error: void 0, hasError: false };
            try {
                const _guard = __addDisposableResource$1(env_2, await this.#browserContext.waitForScreenshotOperations(), false);
                try {
                    await this.#frame.browsingContext.close(options?.runBeforeUnload);
                }
                catch {
                    return;
                }
            }
            catch (e_2) {
                env_2.error = e_2;
                env_2.hasError = true;
            }
            finally {
                __disposeResources$1(env_2);
            }
        }
        async reload(options = {}) {
            const [response] = await Promise.all([
                this.#frame.waitForNavigation(options),
                this.#frame.browsingContext.reload({
                    ignoreCache: options.ignoreCache ? true : undefined,
                }),
            ]).catch(rewriteNavigationError(this.url(), options.timeout ?? this._timeoutSettings.navigationTimeout()));
            return response;
        }
        setDefaultNavigationTimeout(timeout) {
            this._timeoutSettings.setDefaultNavigationTimeout(timeout);
        }
        setDefaultTimeout(timeout) {
            this._timeoutSettings.setDefaultTimeout(timeout);
        }
        getDefaultTimeout() {
            return this._timeoutSettings.timeout();
        }
        getDefaultNavigationTimeout() {
            return this._timeoutSettings.navigationTimeout();
        }
        isJavaScriptEnabled() {
            return this.#frame.browsingContext.isJavaScriptEnabled();
        }
        async setGeolocation(options) {
            const { longitude, latitude, accuracy = 0 } = options;
            if (longitude < -180 || longitude > 180) {
                throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
            }
            if (latitude < -90 || latitude > 90) {
                throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
            }
            if (accuracy < 0) {
                throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
            }
            return await this.#frame.browsingContext.setGeolocationOverride({
                coordinates: {
                    latitude: options.latitude,
                    longitude: options.longitude,
                    accuracy: options.accuracy,
                },
            });
        }
        async setJavaScriptEnabled(enabled) {
            return await this.#frame.browsingContext.setJavaScriptEnabled(enabled);
        }
        async emulateMediaType(type) {
            return await this.#cdpEmulationManager.emulateMediaType(type);
        }
        async emulateCPUThrottling(factor) {
            return await this.#cdpEmulationManager.emulateCPUThrottling(factor);
        }
        async emulateMediaFeatures(features) {
            return await this.#cdpEmulationManager.emulateMediaFeatures(features);
        }
        async emulateTimezone(timezoneId) {
            return await this.#frame.browsingContext.setTimezoneOverride(timezoneId);
        }
        async emulateIdleState(overrides) {
            return await this.#cdpEmulationManager.emulateIdleState(overrides);
        }
        async emulateVisionDeficiency(type) {
            return await this.#cdpEmulationManager.emulateVisionDeficiency(type);
        }
        async setViewport(viewport) {
            let needsReload = false;
            if (!this.browser().cdpSupported) {
                const viewportSize = viewport?.width && viewport?.height
                    ? {
                        width: viewport.width,
                        height: viewport.height,
                    }
                    : null;
                const devicePixelRatio = viewport?.deviceScaleFactor
                    ? viewport.deviceScaleFactor
                    : null;
                // If `viewport` is not set, remove screen orientation override.
                const screenOrientation = viewport
                    ? viewport.isLandscape
                        ? {
                            natural: "landscape" /* Bidi.Emulation.ScreenOrientationNatural.Landscape */,
                            type: 'landscape-primary',
                        }
                        : {
                            natural: "portrait" /* Bidi.Emulation.ScreenOrientationNatural.Portrait */,
                            type: 'portrait-primary',
                        }
                    : null;
                const commands = [
                    this.#frame.browsingContext.setViewport({
                        viewport: viewportSize,
                        devicePixelRatio,
                    }),
                    this.#frame.browsingContext.setScreenOrientationOverride(screenOrientation),
                ];
                if ((this.#viewport?.hasTouch ?? false) !== (viewport?.hasTouch ?? false)) {
                    // The requested touch override state is different from the current one, meaning
                    // the reload is needed.
                    needsReload = true;
                    // 1 touch point if touch is enabled, null otherwise.
                    const maxTouchPoints = viewport?.hasTouch ? 1 : null;
                    commands.push(this.#frame.browsingContext
                        .setTouchOverride(maxTouchPoints)
                        .catch(error => {
                        if (error instanceof ProtocolError &&
                            (error.message.includes('unknown command') ||
                                error.message.includes('unsupported operation'))) {
                            // Tolerate not implemented or not supported commands. At least until
                            // the `emulation.setTouchOverride` is supported by all the supported
                            // browsers.
                            return;
                        }
                        throw error;
                    }));
                }
                await Promise.all(commands);
            }
            else {
                needsReload = await this.#cdpEmulationManager.emulateViewport(viewport);
            }
            this.#viewport = viewport;
            if (needsReload) {
                await this.reload();
            }
        }
        viewport() {
            return this.#viewport;
        }
        async pdf(options = {}) {
            const { timeout: ms = this._timeoutSettings.timeout(), path = undefined } = options;
            const { printBackground: background, margin, landscape, width, height, pageRanges: ranges, scale, preferCSSPageSize, } = parsePDFOptions(options, 'cm');
            const pageRanges = ranges ? ranges.split(', ') : [];
            await firstValueFrom(from(this.mainFrame()
                .isolatedRealm()
                .evaluate(() => {
                return document.fonts.ready;
            })).pipe(raceWith(timeout(ms))));
            const data = await firstValueFrom(from(this.#frame.browsingContext.print({
                background,
                margin,
                orientation: landscape ? 'landscape' : 'portrait',
                page: {
                    width,
                    height,
                },
                pageRanges,
                scale,
                shrinkToFit: !preferCSSPageSize,
            })).pipe(raceWith(timeout(ms))));
            const typedArray = stringToTypedArray(data, true);
            await this._maybeWriteTypedArrayToFile(path, typedArray);
            return typedArray;
        }
        async createPDFStream(options) {
            const typedArray = await this.pdf(options);
            return new ReadableStream({
                start(controller) {
                    controller.enqueue(typedArray);
                    controller.close();
                },
            });
        }
        async _screenshot(options) {
            const { clip, type, captureBeyondViewport, quality } = options;
            if (options.omitBackground !== undefined && options.omitBackground) {
                throw new UnsupportedOperation(`BiDi does not support 'omitBackground'.`);
            }
            if (options.optimizeForSpeed !== undefined && options.optimizeForSpeed) {
                throw new UnsupportedOperation(`BiDi does not support 'optimizeForSpeed'.`);
            }
            if (options.fromSurface !== undefined && !options.fromSurface) {
                throw new UnsupportedOperation(`BiDi does not support 'fromSurface'.`);
            }
            if (clip !== undefined && clip.scale !== undefined && clip.scale !== 1) {
                throw new UnsupportedOperation(`BiDi does not support 'scale' in 'clip'.`);
            }
            let box;
            if (clip) {
                if (captureBeyondViewport) {
                    box = clip;
                }
                else {
                    // The clip is always with respect to the document coordinates, so we
                    // need to convert this to viewport coordinates when we aren't capturing
                    // beyond the viewport.
                    const [pageLeft, pageTop] = await this.evaluate(() => {
                        if (!window.visualViewport) {
                            throw new Error('window.visualViewport is not supported.');
                        }
                        return [
                            window.visualViewport.pageLeft,
                            window.visualViewport.pageTop,
                        ];
                    });
                    box = {
                        ...clip,
                        x: clip.x - pageLeft,
                        y: clip.y - pageTop,
                    };
                }
            }
            const data = await this.#frame.browsingContext.captureScreenshot({
                origin: captureBeyondViewport ? 'document' : 'viewport',
                format: {
                    type: `image/${type}`,
                    ...(quality !== undefined ? { quality: quality / 100 } : {}),
                },
                ...(box ? { clip: { type: 'box', ...box } } : {}),
            });
            return data;
        }
        async createCDPSession() {
            return await this.#frame.createCDPSession();
        }
        async bringToFront() {
            await this.#frame.browsingContext.activate();
        }
        async evaluateOnNewDocument(pageFunction, ...args) {
            const expression = evaluationExpression(pageFunction, ...args);
            const script = await this.#frame.browsingContext.addPreloadScript(expression);
            return { identifier: script };
        }
        async removeScriptToEvaluateOnNewDocument(id) {
            await this.#frame.browsingContext.removePreloadScript(id);
        }
        async exposeFunction(name, pptrFunction) {
            return await this.mainFrame().exposeFunction(name, 'default' in pptrFunction ? pptrFunction.default : pptrFunction);
        }
        isDragInterceptionEnabled() {
            return false;
        }
        async setCacheEnabled(enabled) {
            if (!this.#browserContext.browser().cdpSupported) {
                await this.#frame.browsingContext.setCacheBehavior(enabled ? 'default' : 'bypass');
                return;
            }
            // TODO: handle CDP-specific cases such as MPArch.
            await this._client().send('Network.setCacheDisabled', {
                cacheDisabled: !enabled,
            });
        }
        async cookies(...urls) {
            const normalizedUrls = (urls.length ? urls : [this.url()]).map(url => {
                return new URL(url);
            });
            const cookies = await this.#frame.browsingContext.getCookies();
            return cookies
                .map(cookie => {
                return bidiToPuppeteerCookie(cookie);
            })
                .filter(cookie => {
                return normalizedUrls.some(url => {
                    return testUrlMatchCookie(cookie, url);
                });
            });
        }
        isServiceWorkerBypassed() {
            throw new UnsupportedOperation();
        }
        target() {
            const target = this.browserContext().getTargetForPage(this);
            if (!target) {
                throw new Error('Target not found for page');
            }
            return target;
        }
        async waitForFileChooser(options = {}) {
            const { timeout = this._timeoutSettings.timeout() } = options;
            const deferred = Deferred.create({
                message: `Waiting for \`FileChooser\` failed: ${timeout}ms exceeded`,
                timeout,
            });
            this.#fileChooserDeferreds.add(deferred);
            if (options.signal) {
                options.signal.addEventListener('abort', () => {
                    deferred.reject(options.signal?.reason);
                }, { once: true });
            }
            this.#frame.browsingContext.once('filedialogopened', info => {
                if (!info.element) {
                    return;
                }
                const chooser = new FileChooser(BidiElementHandle.from({
                    sharedId: info.element.sharedId,
                    handle: info.element.handle,
                    type: 'node',
                }, this.#frame.mainRealm()), info.multiple);
                for (const deferred of this.#fileChooserDeferreds) {
                    deferred.resolve(chooser);
                    this.#fileChooserDeferreds.delete(deferred);
                }
            });
            try {
                return await deferred.valueOrThrow();
            }
            catch (error) {
                this.#fileChooserDeferreds.delete(deferred);
                throw error;
            }
        }
        workers() {
            return [...this.#workers];
        }
        get isNetworkInterceptionEnabled() {
            return (Boolean(this.#requestInterception) || Boolean(this.#authInterception));
        }
        #requestInterception;
        async setRequestInterception(enable) {
            this.#requestInterception = await this.#toggleInterception(["beforeRequestSent" /* Bidi.Network.InterceptPhase.BeforeRequestSent */], this.#requestInterception, enable);
        }
        /**
         * @internal
         */
        async setExtraHTTPHeaders(headers) {
            await this.#frame.browsingContext.setExtraHTTPHeaders(headers);
        }
        /**
         * @internal
         */
        _credentials = null;
        #authInterception;
        async authenticate(credentials) {
            this.#authInterception = await this.#toggleInterception(["authRequired" /* Bidi.Network.InterceptPhase.AuthRequired */], this.#authInterception, Boolean(credentials));
            this._credentials = credentials;
        }
        async #toggleInterception(phases, interception, expected) {
            if (expected && !interception) {
                return await this.#frame.browsingContext.addIntercept({
                    phases,
                });
            }
            else if (!expected && interception) {
                await this.#frame.browsingContext.userContext.browser.removeIntercept(interception);
                return;
            }
            return interception;
        }
        setDragInterception() {
            throw new UnsupportedOperation();
        }
        setBypassServiceWorker() {
            throw new UnsupportedOperation();
        }
        async setOfflineMode(enabled) {
            if (!this.#browserContext.browser().cdpSupported) {
                return await this.#frame.browsingContext.setOfflineMode(enabled);
            }
            if (!this.#emulatedNetworkConditions) {
                this.#emulatedNetworkConditions = {
                    offline: false,
                    upload: -1,
                    download: -1,
                    latency: 0,
                };
            }
            this.#emulatedNetworkConditions.offline = enabled;
            return await this.#applyNetworkConditions();
        }
        async emulateNetworkConditions(networkConditions) {
            if (!this.#browserContext.browser().cdpSupported) {
                if (!networkConditions?.offline &&
                    ((networkConditions?.upload ?? -1) >= 0 ||
                        (networkConditions?.download ?? -1) >= 0 ||
                        (networkConditions?.latency ?? 0) > 0)) {
                    // WebDriver BiDi supports only offline mode.
                    throw new UnsupportedOperation();
                }
                return await this.#frame.browsingContext.setOfflineMode(networkConditions?.offline ?? false);
            }
            if (!this.#emulatedNetworkConditions) {
                this.#emulatedNetworkConditions = {
                    offline: networkConditions?.offline ?? false,
                    upload: -1,
                    download: -1,
                    latency: 0,
                };
            }
            this.#emulatedNetworkConditions.upload = networkConditions
                ? networkConditions.upload
                : -1;
            this.#emulatedNetworkConditions.download = networkConditions
                ? networkConditions.download
                : -1;
            this.#emulatedNetworkConditions.latency = networkConditions
                ? networkConditions.latency
                : 0;
            this.#emulatedNetworkConditions.offline =
                networkConditions?.offline ?? false;
            return await this.#applyNetworkConditions();
        }
        async #applyNetworkConditions() {
            if (!this.#emulatedNetworkConditions) {
                return;
            }
            await this._client().send('Network.emulateNetworkConditions', {
                offline: this.#emulatedNetworkConditions.offline,
                latency: this.#emulatedNetworkConditions.latency,
                uploadThroughput: this.#emulatedNetworkConditions.upload,
                downloadThroughput: this.#emulatedNetworkConditions.download,
            });
        }
        async setCookie(...cookies) {
            const pageURL = this.url();
            const pageUrlStartsWithHTTP = pageURL.startsWith('http');
            for (const cookie of cookies) {
                let cookieUrl = cookie.url || '';
                if (!cookieUrl && pageUrlStartsWithHTTP) {
                    cookieUrl = pageURL;
                }
                assert(cookieUrl !== 'about:blank', `Blank page can not have cookie "${cookie.name}"`);
                assert(!String.prototype.startsWith.call(cookieUrl || '', 'data:'), `Data URL page can not have cookie "${cookie.name}"`);
                // TODO: Support Chrome cookie partition keys
                assert(cookie.partitionKey === undefined ||
                    typeof cookie.partitionKey === 'string', 'BiDi only allows domain partition keys');
                const normalizedUrl = URL.canParse(cookieUrl)
                    ? new URL(cookieUrl)
                    : undefined;
                const domain = cookie.domain ?? normalizedUrl?.hostname;
                assert(domain !== undefined, `At least one of the url and domain needs to be specified`);
                const bidiCookie = {
                    domain: domain,
                    name: cookie.name,
                    value: {
                        type: 'string',
                        value: cookie.value,
                    },
                    ...(cookie.path !== undefined ? { path: cookie.path } : {}),
                    ...(cookie.httpOnly !== undefined ? { httpOnly: cookie.httpOnly } : {}),
                    ...(cookie.secure !== undefined ? { secure: cookie.secure } : {}),
                    ...(cookie.sameSite !== undefined
                        ? { sameSite: convertCookiesSameSiteCdpToBiDi(cookie.sameSite) }
                        : {}),
                    ...{ expiry: convertCookiesExpiryCdpToBiDi(cookie.expires) },
                    // Chrome-specific properties.
                    ...cdpSpecificCookiePropertiesFromPuppeteerToBidi(cookie, 'sourceScheme', 'priority', 'url'),
                };
                if (cookie.partitionKey !== undefined) {
                    await this.browserContext().userContext.setCookie(bidiCookie, cookie.partitionKey);
                }
                else {
                    await this.#frame.browsingContext.setCookie(bidiCookie);
                }
            }
        }
        async deleteCookie(...cookies) {
            await Promise.all(cookies.map(async (deleteCookieRequest) => {
                const cookieUrl = deleteCookieRequest.url ?? this.url();
                const normalizedUrl = URL.canParse(cookieUrl)
                    ? new URL(cookieUrl)
                    : undefined;
                const domain = deleteCookieRequest.domain ?? normalizedUrl?.hostname;
                assert(domain !== undefined, `At least one of the url and domain needs to be specified`);
                const filter = {
                    domain: domain,
                    name: deleteCookieRequest.name,
                    ...(deleteCookieRequest.path !== undefined
                        ? { path: deleteCookieRequest.path }
                        : {}),
                };
                await this.#frame.browsingContext.deleteCookie(filter);
            }));
        }
        async removeExposedFunction(name) {
            await this.#frame.removeExposedFunction(name);
        }
        metrics() {
            throw new UnsupportedOperation();
        }
        async captureHeapSnapshot(_options) {
            throw new UnsupportedOperation();
        }
        async goBack(options = {}) {
            return await this.#go(-1, options);
        }
        async goForward(options = {}) {
            return await this.#go(1, options);
        }
        async #go(delta, options) {
            const controller = new AbortController();
            try {
                const [response] = await Promise.all([
                    this.waitForNavigation({
                        ...options,
                        signal: controller.signal,
                    }),
                    this.#frame.browsingContext.traverseHistory(delta),
                ]);
                return response;
            }
            catch (error) {
                controller.abort();
                throw error;
            }
        }
        async waitForDevicePrompt(options = {}) {
            return await this.mainFrame().waitForDevicePrompt(options);
        }
        get bluetooth() {
            return this.mainFrame().browsingContext.bluetooth;
        }
        extensionRealms() {
            throw new UnsupportedOperation();
        }
    };
})();
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function evaluationExpression(fun, ...args) {
    return `() => {${evaluationString(fun, ...args)}}`;
}
/**
 * Check domains match.
 */
function testUrlMatchCookieHostname(cookie, normalizedUrl) {
    const cookieDomain = cookie.domain.toLowerCase();
    const urlHostname = normalizedUrl.hostname.toLowerCase();
    if (cookieDomain === urlHostname) {
        return true;
    }
    // TODO: does not consider additional restrictions w.r.t to IP
    // addresses which is fine as it is for representation and does not
    // mean that cookies actually apply that way in the browser.
    // https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.3
    return cookieDomain.startsWith('.') && urlHostname.endsWith(cookieDomain);
}
/**
 * Check paths match.
 * Spec: https://datatracker.ietf.org/doc/html/rfc6265#section-5.1.4
 */
function testUrlMatchCookiePath(cookie, normalizedUrl) {
    const uriPath = normalizedUrl.pathname;
    const cookiePath = cookie.path;
    if (uriPath === cookiePath) {
        // The cookie-path and the request-path are identical.
        return true;
    }
    if (uriPath.startsWith(cookiePath)) {
        // The cookie-path is a prefix of the request-path.
        if (cookiePath.endsWith('/')) {
            // The last character of the cookie-path is %x2F ("/").
            return true;
        }
        if (uriPath[cookiePath.length] === '/') {
            // The first character of the request-path that is not included in the cookie-path
            // is a %x2F ("/") character.
            return true;
        }
    }
    return false;
}
/**
 * Checks the cookie matches the URL according to the spec:
 */
function testUrlMatchCookie(cookie, url) {
    const normalizedUrl = new URL(url);
    assert(cookie !== undefined);
    if (!testUrlMatchCookieHostname(cookie, normalizedUrl)) {
        return false;
    }
    return testUrlMatchCookiePath(cookie, normalizedUrl);
}
function bidiToPuppeteerCookie(bidiCookie, returnCompositePartitionKey = false) {
    const partitionKey = bidiCookie[CDP_SPECIFIC_PREFIX + 'partitionKey'];
    function getPartitionKey() {
        if (typeof partitionKey === 'string') {
            return { partitionKey };
        }
        if (typeof partitionKey === 'object' && partitionKey !== null) {
            if (returnCompositePartitionKey) {
                return {
                    partitionKey: {
                        sourceOrigin: partitionKey.topLevelSite,
                        hasCrossSiteAncestor: partitionKey.hasCrossSiteAncestor ?? false,
                    },
                };
            }
            return {
                // TODO: a breaking change in Puppeteer is required to change
                // partitionKey type and report the composite partition key.
                partitionKey: partitionKey.topLevelSite,
            };
        }
        return {};
    }
    return {
        name: bidiCookie.name,
        // Presents binary value as base64 string.
        value: bidiCookie.value.value,
        domain: bidiCookie.domain,
        path: bidiCookie.path,
        size: bidiCookie.size,
        httpOnly: bidiCookie.httpOnly,
        secure: bidiCookie.secure,
        sameSite: convertCookiesSameSiteBiDiToCdp(bidiCookie.sameSite),
        expires: bidiCookie.expiry ?? -1,
        session: bidiCookie.expiry === undefined || bidiCookie.expiry <= 0,
        // Extending with CDP-specific properties with `goog:` prefix.
        ...cdpSpecificCookiePropertiesFromBidiToPuppeteer(bidiCookie, 'sourceScheme', 'partitionKeyOpaque', 'priority'),
        ...getPartitionKey(),
    };
}
const CDP_SPECIFIC_PREFIX = 'goog:';
/**
 * Gets CDP-specific properties from the BiDi cookie and returns them as a new object.
 */
function cdpSpecificCookiePropertiesFromBidiToPuppeteer(bidiCookie, ...propertyNames) {
    const result = {};
    for (const property of propertyNames) {
        if (bidiCookie[CDP_SPECIFIC_PREFIX + property] !== undefined) {
            result[property] = bidiCookie[CDP_SPECIFIC_PREFIX + property];
        }
    }
    return result;
}
/**
 * Gets CDP-specific properties from the cookie, adds CDP-specific prefixes and returns
 * them as a new object which can be used in BiDi.
 */
function cdpSpecificCookiePropertiesFromPuppeteerToBidi(cookieParam, ...propertyNames) {
    const result = {};
    for (const property of propertyNames) {
        if (cookieParam[property] !== undefined) {
            result[CDP_SPECIFIC_PREFIX + property] = cookieParam[property];
        }
    }
    return result;
}
function convertCookiesSameSiteBiDiToCdp(sameSite) {
    switch (sameSite) {
        case 'strict':
            return 'Strict';
        case 'lax':
            return 'Lax';
        case 'none':
            return 'None';
        default:
            return 'Default';
    }
}
function convertCookiesSameSiteCdpToBiDi(sameSite) {
    switch (sameSite) {
        case 'Strict':
            return "strict" /* Bidi.Network.SameSite.Strict */;
        case 'Lax':
            return "lax" /* Bidi.Network.SameSite.Lax */;
        case 'None':
            return "none" /* Bidi.Network.SameSite.None */;
        default:
            return "default" /* Bidi.Network.SameSite.Default */;
    }
}
function convertCookiesExpiryCdpToBiDi(expiry) {
    return [undefined, -1].includes(expiry) ? undefined : expiry;
}
function convertCookiesPartitionKeyFromPuppeteerToBiDi(partitionKey) {
    if (partitionKey === undefined || typeof partitionKey === 'string') {
        return partitionKey;
    }
    if (partitionKey.hasCrossSiteAncestor) {
        throw new UnsupportedOperation('WebDriver BiDi does not support `hasCrossSiteAncestor` yet.');
    }
    return partitionKey.sourceOrigin;
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class BidiBrowserTarget extends Target {
    #browser;
    constructor(browser) {
        super();
        this.#browser = browser;
    }
    asPage() {
        throw new UnsupportedOperation();
    }
    url() {
        return '';
    }
    createCDPSession() {
        throw new UnsupportedOperation();
    }
    type() {
        return TargetType.BROWSER;
    }
    browser() {
        return this.#browser;
    }
    browserContext() {
        return this.#browser.defaultBrowserContext();
    }
    opener() {
        throw new UnsupportedOperation();
    }
}
/**
 * @internal
 */
class BidiPageTarget extends Target {
    #page;
    constructor(page) {
        super();
        this.#page = page;
    }
    async page() {
        return this.#page;
    }
    async asPage() {
        return await this.page();
    }
    url() {
        return this.#page.url();
    }
    createCDPSession() {
        return this.#page.createCDPSession();
    }
    type() {
        return TargetType.PAGE;
    }
    browser() {
        return this.browserContext().browser();
    }
    browserContext() {
        return this.#page.browserContext();
    }
    opener() {
        throw new UnsupportedOperation();
    }
}
/**
 * @internal
 */
class BidiFrameTarget extends Target {
    #frame;
    #page;
    constructor(frame) {
        super();
        this.#frame = frame;
    }
    async page() {
        if (this.#page === undefined) {
            this.#page = BidiPage.from(this.browserContext(), this.#frame.browsingContext);
        }
        return this.#page;
    }
    async asPage() {
        return await this.page();
    }
    url() {
        return this.#frame.url();
    }
    createCDPSession() {
        return this.#frame.createCDPSession();
    }
    type() {
        return TargetType.PAGE;
    }
    browser() {
        return this.browserContext().browser();
    }
    browserContext() {
        return this.#frame.page().browserContext();
    }
    opener() {
        throw new UnsupportedOperation();
    }
}
/**
 * @internal
 */
class BidiWorkerTarget extends Target {
    #worker;
    constructor(worker) {
        super();
        this.#worker = worker;
    }
    async page() {
        throw new UnsupportedOperation();
    }
    async asPage() {
        throw new UnsupportedOperation();
    }
    url() {
        return this.#worker.url();
    }
    createCDPSession() {
        throw new UnsupportedOperation();
    }
    type() {
        return TargetType.OTHER;
    }
    browser() {
        return this.browserContext().browser();
    }
    browserContext() {
        return this.#worker.frame.page().browserContext();
    }
    opener() {
        throw new UnsupportedOperation();
    }
}

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var __esDecorate$1 = (undefined && undefined.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
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
var __runInitializers$1 = (undefined && undefined.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
 * @internal
 */
let BidiBrowserContext = (() => {
    let _classSuper = BrowserContext;
    let _trustedEmitter_decorators;
    let _trustedEmitter_initializers = [];
    let _trustedEmitter_extraInitializers = [];
    return class BidiBrowserContext extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _trustedEmitter_decorators = [bubble()];
            __esDecorate$1(this, null, _trustedEmitter_decorators, { kind: "accessor", name: "trustedEmitter", static: false, private: false, access: { has: obj => "trustedEmitter" in obj, get: obj => obj.trustedEmitter, set: (obj, value) => { obj.trustedEmitter = value; } }, metadata: _metadata }, _trustedEmitter_initializers, _trustedEmitter_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static from(browser, userContext, options) {
            const context = new BidiBrowserContext(browser, userContext, options);
            context.#initialize();
            return context;
        }
        #trustedEmitter_accessor_storage = __runInitializers$1(this, _trustedEmitter_initializers, new EventEmitter());
        get trustedEmitter() { return this.#trustedEmitter_accessor_storage; }
        set trustedEmitter(value) { this.#trustedEmitter_accessor_storage = value; }
        #browser = __runInitializers$1(this, _trustedEmitter_extraInitializers);
        #defaultViewport;
        // This is public because of cookies.
        userContext;
        #pages = new WeakMap();
        #targets = new Map();
        #overrides = [];
        constructor(browser, userContext, options) {
            super();
            this.#browser = browser;
            this.userContext = userContext;
            this.#defaultViewport = options.defaultViewport;
        }
        #initialize() {
            // Create targets for existing browsing contexts.
            for (const browsingContext of this.userContext.browsingContexts) {
                this.#createPage(browsingContext);
            }
            this.userContext.on('browsingcontext', browsingContext => {
                const page = this.#createPage(browsingContext);
                // We need to wait for the DOMContentLoaded as the
                // browsingContext still may be navigating from the about:blank
                if (browsingContext.originalOpener) {
                    for (const context of this.userContext.browsingContexts) {
                        if (context.id === browsingContext.originalOpener) {
                            this.#pages
                                .get(context)
                                .trustedEmitter.emit("popup" /* PageEvent.Popup */, page);
                        }
                    }
                }
            });
            this.userContext.on('closed', () => {
                this.trustedEmitter.removeAllListeners();
            });
        }
        #createPage(browsingContext) {
            const page = BidiPage.from(this, browsingContext);
            this.#pages.set(browsingContext, page);
            page.trustedEmitter.on("close" /* PageEvent.Close */, () => {
                this.#pages.delete(browsingContext);
            });
            // -- Target stuff starts here --
            const pageTarget = new BidiPageTarget(page);
            const pageTargets = new Map();
            this.#targets.set(page, [pageTarget, pageTargets]);
            page.trustedEmitter.on("frameattached" /* PageEvent.FrameAttached */, frame => {
                const bidiFrame = frame;
                const target = new BidiFrameTarget(bidiFrame);
                pageTargets.set(bidiFrame, target);
                this.trustedEmitter.emit("targetcreated" /* BrowserContextEvent.TargetCreated */, target);
            });
            page.trustedEmitter.on("framenavigated" /* PageEvent.FrameNavigated */, frame => {
                const bidiFrame = frame;
                const target = pageTargets.get(bidiFrame);
                // If there is no target, then this is the page's frame.
                if (target === undefined) {
                    this.trustedEmitter.emit("targetchanged" /* BrowserContextEvent.TargetChanged */, pageTarget);
                }
                else {
                    this.trustedEmitter.emit("targetchanged" /* BrowserContextEvent.TargetChanged */, target);
                }
            });
            page.trustedEmitter.on("framedetached" /* PageEvent.FrameDetached */, frame => {
                const bidiFrame = frame;
                const target = pageTargets.get(bidiFrame);
                if (target === undefined) {
                    return;
                }
                pageTargets.delete(bidiFrame);
                this.trustedEmitter.emit("targetdestroyed" /* BrowserContextEvent.TargetDestroyed */, target);
            });
            page.trustedEmitter.on("workercreated" /* PageEvent.WorkerCreated */, worker => {
                const bidiWorker = worker;
                const target = new BidiWorkerTarget(bidiWorker);
                pageTargets.set(bidiWorker, target);
                this.trustedEmitter.emit("targetcreated" /* BrowserContextEvent.TargetCreated */, target);
            });
            page.trustedEmitter.on("workerdestroyed" /* PageEvent.WorkerDestroyed */, worker => {
                const bidiWorker = worker;
                const target = pageTargets.get(bidiWorker);
                if (target === undefined) {
                    return;
                }
                pageTargets.delete(worker);
                this.trustedEmitter.emit("targetdestroyed" /* BrowserContextEvent.TargetDestroyed */, target);
            });
            page.trustedEmitter.on("close" /* PageEvent.Close */, () => {
                this.#targets.delete(page);
                this.trustedEmitter.emit("targetdestroyed" /* BrowserContextEvent.TargetDestroyed */, pageTarget);
            });
            this.trustedEmitter.emit("targetcreated" /* BrowserContextEvent.TargetCreated */, pageTarget);
            // -- Target stuff ends here --
            return page;
        }
        targets() {
            return [...this.#targets.values()].flatMap(([target, frames]) => {
                return [target, ...frames.values()];
            });
        }
        /**
         * @internal
         */
        getTargetForPage(page) {
            return this.#targets.get(page)?.[0];
        }
        async newPage(options) {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const _guard = __addDisposableResource(env_1, await this.waitForScreenshotOperations(), false);
                const type = options?.type === 'window'
                    ? "window" /* Bidi.BrowsingContext.CreateType.Window */
                    : "tab" /* Bidi.BrowsingContext.CreateType.Tab */;
                const context = await this.userContext.createBrowsingContext(type, {
                    background: options?.background,
                });
                const page = this.#pages.get(context);
                if (!page) {
                    throw new Error('Page is not found');
                }
                if (this.#defaultViewport) {
                    try {
                        await page.setViewport(this.#defaultViewport);
                    }
                    catch (error) {
                        // Tolerate not supporting `browsingContext.setViewport`. Only log it.
                        debugError(error);
                    }
                }
                if (options?.type === 'window' && options?.windowBounds !== undefined) {
                    try {
                        await this.browser().setWindowBounds(context.windowId, options.windowBounds);
                    }
                    catch (error) {
                        // Tolerate not supporting `browser.setClientWindowState`. Only log it.
                        debugError(error);
                    }
                }
                return page;
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        }
        async close() {
            assert(this.userContext.id !== UserContext.DEFAULT, 'Default BrowserContext cannot be closed!');
            try {
                await this.userContext.remove();
            }
            catch (error) {
                debugError(error);
            }
            this.#targets.clear();
        }
        browser() {
            return this.#browser;
        }
        async pages(_includeAll = false) {
            return [...this.userContext.browsingContexts].map(context => {
                return this.#pages.get(context);
            });
        }
        async overridePermissions(origin, permissions) {
            const permissionsSet = new Set(permissions.map(permission => {
                const protocolPermission = WEB_PERMISSION_TO_PROTOCOL_PERMISSION.get(permission);
                if (!protocolPermission) {
                    throw new Error('Unknown permission: ' + permission);
                }
                return permission;
            }));
            await Promise.all(Array.from(WEB_PERMISSION_TO_PROTOCOL_PERMISSION.keys()).map(permission => {
                const result = this.userContext.setPermissions(origin, {
                    name: permission,
                }, permissionsSet.has(permission)
                    ? "granted" /* Bidi.Permissions.PermissionState.Granted */
                    : "denied" /* Bidi.Permissions.PermissionState.Denied */);
                this.#overrides.push({ origin, permission });
                // TODO: some permissions are outdated and setting them to denied does
                // not work.
                if (!permissionsSet.has(permission)) {
                    return result.catch(debugError);
                }
                return result;
            }));
        }
        async setPermission(origin, ...permissions) {
            if (origin === '*') {
                throw new UnsupportedOperation('Origin (*) is not supported by WebDriver BiDi');
            }
            await Promise.all(permissions.map(permission => {
                if (permission.permission.allowWithoutSanitization) {
                    throw new UnsupportedOperation('allowWithoutSanitization is not supported by WebDriver BiDi');
                }
                if (permission.permission.panTiltZoom) {
                    throw new UnsupportedOperation('panTiltZoom is not supported by WebDriver BiDi');
                }
                if (permission.permission.userVisibleOnly) {
                    throw new UnsupportedOperation('userVisibleOnly is not supported by WebDriver BiDi');
                }
                return this.userContext.setPermissions(origin, {
                    name: permission.permission.name,
                }, permission.state);
            }));
        }
        async clearPermissionOverrides() {
            const promises = this.#overrides.map(({ permission, origin }) => {
                return this.userContext
                    .setPermissions(origin, {
                    name: permission,
                }, "prompt" /* Bidi.Permissions.PermissionState.Prompt */)
                    .catch(debugError);
            });
            this.#overrides = [];
            await Promise.all(promises);
        }
        get id() {
            if (this.userContext.id === UserContext.DEFAULT) {
                return undefined;
            }
            return this.userContext.id;
        }
        async cookies() {
            const cookies = await this.userContext.getCookies();
            return cookies.map(cookie => {
                return bidiToPuppeteerCookie(cookie, true);
            });
        }
        async setCookie(...cookies) {
            await Promise.all(cookies.map(async (cookie) => {
                const bidiCookie = {
                    domain: cookie.domain,
                    name: cookie.name,
                    value: {
                        type: 'string',
                        value: cookie.value,
                    },
                    ...(cookie.path !== undefined ? { path: cookie.path } : {}),
                    ...(cookie.httpOnly !== undefined ? { httpOnly: cookie.httpOnly } : {}),
                    ...(cookie.secure !== undefined ? { secure: cookie.secure } : {}),
                    ...(cookie.sameSite !== undefined
                        ? { sameSite: convertCookiesSameSiteCdpToBiDi(cookie.sameSite) }
                        : {}),
                    ...{ expiry: convertCookiesExpiryCdpToBiDi(cookie.expires) },
                    // Chrome-specific properties.
                    ...cdpSpecificCookiePropertiesFromPuppeteerToBidi(cookie, 'sourceScheme', 'priority', 'url'),
                };
                return await this.userContext.setCookie(bidiCookie, convertCookiesPartitionKeyFromPuppeteerToBiDi(cookie.partitionKey));
            }));
        }
    };
})();

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
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
var __runInitializers = (undefined && undefined.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (undefined && undefined.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
/**
 * @internal
 */
let BidiBrowser = (() => {
    let _classSuper = Browser;
    let _private_trustedEmitter_decorators;
    let _private_trustedEmitter_initializers = [];
    let _private_trustedEmitter_extraInitializers = [];
    let _private_trustedEmitter_descriptor;
    return class BidiBrowser extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _private_trustedEmitter_decorators = [bubble()];
            __esDecorate(this, _private_trustedEmitter_descriptor = { get: __setFunctionName(function () { return this.#trustedEmitter_accessor_storage; }, "#trustedEmitter", "get"), set: __setFunctionName(function (value) { this.#trustedEmitter_accessor_storage = value; }, "#trustedEmitter", "set") }, _private_trustedEmitter_decorators, { kind: "accessor", name: "#trustedEmitter", static: false, private: true, access: { has: obj => #trustedEmitter in obj, get: obj => obj.#trustedEmitter, set: (obj, value) => { obj.#trustedEmitter = value; } }, metadata: _metadata }, _private_trustedEmitter_initializers, _private_trustedEmitter_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        protocol = 'webDriverBiDi';
        static subscribeModules = [
            'browsingContext',
            'network',
            'log',
            'script',
            'input',
        ];
        static subscribeCdpEvents = [
            // Coverage
            'goog:cdp.Debugger.scriptParsed',
            'goog:cdp.CSS.styleSheetAdded',
            'goog:cdp.Runtime.executionContextsCleared',
            // Tracing
            'goog:cdp.Tracing.tracingComplete',
            // TODO: subscribe to all CDP events in the future.
            'goog:cdp.Network.requestWillBeSent',
            'goog:cdp.Debugger.scriptParsed',
            'goog:cdp.Page.screencastFrame',
        ];
        static async create(opts) {
            const session = await Session.from(opts.connection, {
                firstMatch: opts.capabilities?.firstMatch,
                alwaysMatch: {
                    ...opts.capabilities?.alwaysMatch,
                    // Capabilities that come from Puppeteer's API take precedence.
                    acceptInsecureCerts: opts.acceptInsecureCerts,
                    unhandledPromptBehavior: {
                        default: "ignore" /* Bidi.Session.UserPromptHandlerType.Ignore */,
                    },
                    webSocketUrl: true,
                    // Puppeteer with WebDriver BiDi does not support prerendering
                    // yet because WebDriver BiDi behavior is not specified. See
                    // https://github.com/w3c/webdriver-bidi/issues/321.
                    'goog:prerenderingDisabled': true,
                    // TODO: remove after Puppeteer rolled Chrome to 142 after Oct 28, 2025.
                    'goog:disableNetworkDurableMessages': true,
                },
            });
            // Subscribe to all WebDriver BiDi events. Also subscribe to CDP events if CDP
            // connection is available.
            await session.subscribe((opts.cdpConnection
                ? [...BidiBrowser.subscribeModules, ...BidiBrowser.subscribeCdpEvents]
                : BidiBrowser.subscribeModules).filter(module => {
                if (!opts.networkEnabled) {
                    return (module !== 'network' &&
                        module !== 'goog:cdp.Network.requestWillBeSent');
                }
                return true;
            }));
            await Promise.all(["request" /* Bidi.Network.DataType.Request */, "response" /* Bidi.Network.DataType.Response */].map(
            // Data collectors might be not implemented for specific data type, so create them
            // separately and ignore protocol errors.
            async (dataType) => {
                try {
                    await session.send('network.addDataCollector', {
                        dataTypes: [dataType],
                        // Buffer size of 20 MB is equivalent to the CDP:
                        maxEncodedDataSize: 20_000_000,
                    });
                }
                catch (err) {
                    if (err instanceof ProtocolError) {
                        debugError(err);
                    }
                    else {
                        throw err;
                    }
                }
            }));
            const browser = new BidiBrowser(session.browser, opts);
            browser.#initialize();
            return browser;
        }
        #trustedEmitter_accessor_storage = __runInitializers(this, _private_trustedEmitter_initializers, new EventEmitter());
        get #trustedEmitter() { return _private_trustedEmitter_descriptor.get.call(this); }
        set #trustedEmitter(value) { return _private_trustedEmitter_descriptor.set.call(this, value); }
        #process = __runInitializers(this, _private_trustedEmitter_extraInitializers);
        #closeCallback;
        #browserCore;
        #defaultViewport;
        #browserContexts = new WeakMap();
        #target = new BidiBrowserTarget(this);
        #cdpConnection;
        #networkEnabled;
        #issuesEnabled;
        constructor(browserCore, opts) {
            super();
            this.#process = opts.process;
            this.#closeCallback = opts.closeCallback;
            this.#browserCore = browserCore;
            this.#defaultViewport = opts.defaultViewport;
            this.#cdpConnection = opts.cdpConnection;
            this.#networkEnabled = opts.networkEnabled;
            this.#issuesEnabled = opts.issuesEnabled;
        }
        #initialize() {
            // Initializing existing contexts.
            for (const userContext of this.#browserCore.userContexts) {
                this.#createBrowserContext(userContext);
            }
            this.#browserCore.once('disconnected', () => {
                this.#trustedEmitter.emit("disconnected" /* BrowserEvent.Disconnected */, undefined);
                this.#trustedEmitter.removeAllListeners();
            });
            this.#process?.once('close', () => {
                this.#browserCore.dispose('Browser process exited.', true);
                this.connection.dispose();
            });
        }
        get #browserName() {
            return this.#browserCore.session.capabilities.browserName;
        }
        get #browserVersion() {
            return this.#browserCore.session.capabilities.browserVersion;
        }
        get cdpSupported() {
            return this.#cdpConnection !== undefined;
        }
        get cdpConnection() {
            return this.#cdpConnection;
        }
        async userAgent() {
            return this.#browserCore.session.capabilities.userAgent;
        }
        #createBrowserContext(userContext) {
            const browserContext = BidiBrowserContext.from(this, userContext, {
                defaultViewport: this.#defaultViewport,
            });
            this.#browserContexts.set(userContext, browserContext);
            browserContext.trustedEmitter.on("targetcreated" /* BrowserContextEvent.TargetCreated */, target => {
                this.#trustedEmitter.emit("targetcreated" /* BrowserEvent.TargetCreated */, target);
            });
            browserContext.trustedEmitter.on("targetchanged" /* BrowserContextEvent.TargetChanged */, target => {
                this.#trustedEmitter.emit("targetchanged" /* BrowserEvent.TargetChanged */, target);
            });
            browserContext.trustedEmitter.on("targetdestroyed" /* BrowserContextEvent.TargetDestroyed */, target => {
                this.#trustedEmitter.emit("targetdestroyed" /* BrowserEvent.TargetDestroyed */, target);
            });
            return browserContext;
        }
        get connection() {
            // SAFETY: We only have one implementation.
            return this.#browserCore.session.connection;
        }
        wsEndpoint() {
            return this.connection.url;
        }
        async close() {
            if (this.connection.closed) {
                return;
            }
            try {
                await this.#browserCore.close();
                await this.#closeCallback?.call(null);
            }
            catch (error) {
                // Fail silently.
                debugError(error);
            }
            finally {
                this.connection.dispose();
            }
        }
        get connected() {
            return !this.#browserCore.disconnected;
        }
        process() {
            return this.#process ?? null;
        }
        async createBrowserContext(options = {}) {
            const userContext = await this.#browserCore.createUserContext(options);
            return this.#createBrowserContext(userContext);
        }
        async version() {
            return `${this.#browserName}/${this.#browserVersion}`;
        }
        browserContexts() {
            return [...this.#browserCore.userContexts].map(context => {
                return this.#browserContexts.get(context);
            });
        }
        defaultBrowserContext() {
            return this.#browserContexts.get(this.#browserCore.defaultUserContext);
        }
        newPage(options) {
            return this.defaultBrowserContext().newPage(options);
        }
        installExtension(path) {
            return this.#browserCore.installExtension(path);
        }
        async uninstallExtension(id) {
            await this.#browserCore.uninstallExtension(id);
        }
        screens() {
            throw new UnsupportedOperation();
        }
        addScreen(_params) {
            throw new UnsupportedOperation();
        }
        removeScreen(_screenId) {
            throw new UnsupportedOperation();
        }
        async getWindowBounds(windowId) {
            const clientWindowInfo = await this.#browserCore.getClientWindowInfo(windowId);
            return {
                left: clientWindowInfo.x,
                top: clientWindowInfo.y,
                width: clientWindowInfo.width,
                height: clientWindowInfo.height,
                windowState: clientWindowInfo.state,
            };
        }
        async setWindowBounds(windowId, windowBounds) {
            let params;
            const windowState = windowBounds.windowState ?? 'normal';
            if (windowState === 'normal') {
                params = {
                    clientWindow: windowId,
                    state: 'normal',
                    x: windowBounds.left,
                    y: windowBounds.top,
                    width: windowBounds.width,
                    height: windowBounds.height,
                };
            }
            else {
                params = {
                    clientWindow: windowId,
                    state: windowState,
                };
            }
            await this.#browserCore.setClientWindowState(params);
        }
        targets() {
            return [
                this.#target,
                ...this.browserContexts().flatMap(context => {
                    return context.targets();
                }),
            ];
        }
        target() {
            return this.#target;
        }
        async disconnect() {
            try {
                await this.#browserCore.session.end();
            }
            catch (error) {
                // Fail silently.
                debugError(error);
            }
            finally {
                this.connection.dispose();
            }
        }
        get debugInfo() {
            return {
                pendingProtocolErrors: this.connection.getPendingProtocolErrors(),
            };
        }
        isNetworkEnabled() {
            return this.#networkEnabled;
        }
        extensions() {
            throw new UnsupportedOperation();
        }
        isIssuesEnabled() {
            return this.#issuesEnabled;
        }
    };
})();

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

const bidi = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    BidiBrowser,
    BidiBrowserContext,
    BidiConnection,
    BidiElementHandle,
    BidiFrame,
    BidiFrameRealm,
    BidiHTTPRequest,
    BidiHTTPResponse,
    BidiJSHandle,
    BidiKeyboard,
    BidiMouse,
    BidiPage,
    BidiRealm,
    BidiTouchscreen,
    BidiWorkerRealm,
    bidiToPuppeteerCookie,
    cdpSpecificCookiePropertiesFromPuppeteerToBidi,
    connectBidiOverCdp,
    convertCookiesExpiryCdpToBiDi,
    convertCookiesPartitionKeyFromPuppeteerToBiDi,
    convertCookiesSameSiteCdpToBiDi,
    requests
}, Symbol.toStringTag, { value: 'Module' }));

export { Puppeteer as P, assertSupportedUrlRestrictions as a, bidi as b };
