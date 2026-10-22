// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { a as Frame, F as FrameEvent, t as throwIfDetached } from './chunk-021.mjs';
import { U as UnsupportedOperation, m as mergeUint8Arrays, s as stringToTypedArray, g as stringToBase64, P as ProtocolError } from './chunk-015.mjs';
import { g as Deferred, b as debugError, d as disposeSymbol } from './chunk-017.mjs';
import { i as isErrorLike } from './chunk-019.mjs';
import { A as Accessibility } from './chunk-024.mjs';
import { I as IsolatedWorld, P as PUPPETEER_WORLD, M as MAIN_WORLD, F as FrameManagerEvent, L as LifecycleWatcher } from './chunk-027.mjs';
import { a as CDP_BINDING_PREFIX } from './chunk-026.mjs';
import { H as HTTPRequest, h as headersArray, d as handleError, S as STATUS_TEXTS, e as HTTPResponse } from './chunk-022.mjs';

/**
 * @license
 * Copyright 2017 Google Inc.
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
/**
 * @internal
 */
let CdpFrame = (() => {
    let _classSuper = Frame;
    let _instanceExtraInitializers = [];
    let _goto_decorators;
    let _waitForNavigation_decorators;
    let _setContent_decorators;
    let _addPreloadScript_decorators;
    let _addExposedFunctionBinding_decorators;
    let _removeExposedFunctionBinding_decorators;
    let _waitForDevicePrompt_decorators;
    return class CdpFrame extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(this, null, _goto_decorators, { kind: "method", name: "goto", static: false, private: false, access: { has: obj => "goto" in obj, get: obj => obj.goto }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _waitForNavigation_decorators, { kind: "method", name: "waitForNavigation", static: false, private: false, access: { has: obj => "waitForNavigation" in obj, get: obj => obj.waitForNavigation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _setContent_decorators, { kind: "method", name: "setContent", static: false, private: false, access: { has: obj => "setContent" in obj, get: obj => obj.setContent }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addPreloadScript_decorators, { kind: "method", name: "addPreloadScript", static: false, private: false, access: { has: obj => "addPreloadScript" in obj, get: obj => obj.addPreloadScript }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _addExposedFunctionBinding_decorators, { kind: "method", name: "addExposedFunctionBinding", static: false, private: false, access: { has: obj => "addExposedFunctionBinding" in obj, get: obj => obj.addExposedFunctionBinding }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _removeExposedFunctionBinding_decorators, { kind: "method", name: "removeExposedFunctionBinding", static: false, private: false, access: { has: obj => "removeExposedFunctionBinding" in obj, get: obj => obj.removeExposedFunctionBinding }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _waitForDevicePrompt_decorators, { kind: "method", name: "waitForDevicePrompt", static: false, private: false, access: { has: obj => "waitForDevicePrompt" in obj, get: obj => obj.waitForDevicePrompt }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #url = (__runInitializers(this, _instanceExtraInitializers), '');
        #detached = false;
        #client;
        _frameManager;
        _loaderId = '';
        _lifecycleEvents = new Set();
        _id;
        _parentId;
        accessibility;
        worlds;
        extensionWorlds = {};
        constructor(frameManager, frameId, parentFrameId, client) {
            super();
            this._frameManager = frameManager;
            this.#url = '';
            this._id = frameId;
            this._parentId = parentFrameId;
            this.#detached = false;
            this.#client = client;
            this._loaderId = '';
            this.worlds = {
                [MAIN_WORLD]: new IsolatedWorld(this, this._frameManager.timeoutSettings, MAIN_WORLD),
                [PUPPETEER_WORLD]: new IsolatedWorld(this, this._frameManager.timeoutSettings, PUPPETEER_WORLD),
            };
            this.accessibility = new Accessibility(this.worlds[MAIN_WORLD], frameId);
            this.on(FrameEvent.FrameSwappedByActivation, () => {
                // Emulate loading process for swapped frames.
                this._onLoadingStarted();
                this._onLoadingStopped();
            });
            this.registerWorldListeners(this.worlds[MAIN_WORLD]);
        }
        /**
         * @internal
         */
        registerWorldListeners(world) {
            world.emitter.on('consoleapicalled', event => {
                this._frameManager.emit(FrameManagerEvent.ConsoleApiCalled, [
                    world,
                    event,
                ]);
            });
            world.emitter.on('bindingcalled', event => {
                this._frameManager.emit(FrameManagerEvent.BindingCalled, [world, event]);
            });
        }
        /**
         * This is used internally in DevTools.
         *
         * @internal
         */
        _client() {
            return this.#client;
        }
        /**
         * Updates the frame ID with the new ID. This happens when the main frame is
         * replaced by a different frame.
         */
        updateId(id) {
            this._id = id;
        }
        updateClient(client) {
            this.#client = client;
        }
        page() {
            return this._frameManager.page();
        }
        async goto(url, options = {}) {
            if (!this.page()._isUrlAllowed(url)) {
                throw new Error(`Navigation to ${url} is blocked by blocklist/allowlist rules`);
            }
            const { referer = this._frameManager.networkManager.extraHTTPHeaders()['referer'], referrerPolicy = this._frameManager.networkManager.extraHTTPHeaders()['referer-policy'], waitUntil = ['load'], timeout = this._frameManager.timeoutSettings.navigationTimeout(), } = options;
            let ensureNewDocumentNavigation = false;
            const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout);
            let error = await Deferred.race([
                navigate(this.#client, url, referer, referrerPolicy ? referrerPolicyToProtocol(referrerPolicy) : undefined, this._id),
                watcher.terminationPromise(),
            ]);
            if (!error) {
                error = await Deferred.race([
                    watcher.terminationPromise(),
                    ensureNewDocumentNavigation
                        ? watcher.newDocumentNavigationPromise()
                        : watcher.sameDocumentNavigationPromise(),
                ]);
            }
            try {
                if (error) {
                    throw error;
                }
                return await watcher.navigationResponse();
            }
            finally {
                watcher.dispose();
            }
            async function navigate(client, url, referrer, referrerPolicy, frameId) {
                try {
                    const response = await client.send('Page.navigate', {
                        url,
                        referrer,
                        frameId,
                        referrerPolicy,
                    });
                    ensureNewDocumentNavigation = !!response.loaderId;
                    if (response.errorText === 'net::ERR_HTTP_RESPONSE_CODE_FAILURE') {
                        return null;
                    }
                    return response.errorText
                        ? new Error(`${response.errorText} at ${url}`)
                        : null;
                }
                catch (error) {
                    if (isErrorLike(error)) {
                        return error;
                    }
                    throw error;
                }
            }
        }
        async waitForNavigation(options = {}) {
            const { waitUntil = ['load'], timeout = this._frameManager.timeoutSettings.navigationTimeout(), signal, } = options;
            const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout, signal);
            const error = await Deferred.race([
                watcher.terminationPromise(),
                ...(options.ignoreSameDocumentNavigation
                    ? []
                    : [watcher.sameDocumentNavigationPromise()]),
                watcher.newDocumentNavigationPromise(),
            ]);
            try {
                if (error) {
                    throw error;
                }
                const result = await Deferred.race([watcher.terminationPromise(), watcher.navigationResponse()]);
                if (result instanceof Error) {
                    throw error;
                }
                return result || null;
            }
            finally {
                watcher.dispose();
            }
        }
        get client() {
            return this.#client;
        }
        mainRealm() {
            return this.worlds[MAIN_WORLD];
        }
        isolatedRealm() {
            return this.worlds[PUPPETEER_WORLD];
        }
        async setContent(html, options = {}) {
            const { waitUntil = ['load'], timeout = this._frameManager.timeoutSettings.navigationTimeout(), } = options;
            // We rely upon the fact that document.open() will reset frame lifecycle with "init"
            // lifecycle event. @see https://crrev.com/608658
            await this.setFrameContent(html);
            const watcher = new LifecycleWatcher(this._frameManager.networkManager, this, waitUntil, timeout);
            const error = await Deferred.race([
                watcher.terminationPromise(),
                watcher.lifecyclePromise(),
            ]);
            watcher.dispose();
            if (error) {
                throw error;
            }
        }
        url() {
            return this.#url;
        }
        parentFrame() {
            return this._frameManager._frameTree.parentFrame(this._id) || null;
        }
        childFrames() {
            return this._frameManager._frameTree.childFrames(this._id);
        }
        #deviceRequestPromptManager() {
            return this._frameManager._deviceRequestPromptManager(this.#client);
        }
        async addPreloadScript(preloadScript) {
            const parentFrame = this.parentFrame();
            if (parentFrame && this.#client === parentFrame.client) {
                return;
            }
            if (preloadScript.getIdForFrame(this)) {
                return;
            }
            const { identifier } = await this.#client.send('Page.addScriptToEvaluateOnNewDocument', {
                source: preloadScript.source,
            });
            preloadScript.setIdForFrame(this, identifier);
        }
        async addExposedFunctionBinding(binding) {
            // If a frame has not started loading, it might never start. Rely on
            // addScriptToEvaluateOnNewDocument in that case.
            if (this !== this._frameManager.mainFrame() && !this._hasStartedLoading) {
                return;
            }
            await Promise.all([
                this.#client.send('Runtime.addBinding', {
                    name: CDP_BINDING_PREFIX + binding.name,
                }),
                this.evaluate(binding.initSource).catch(debugError),
            ]);
        }
        async removeExposedFunctionBinding(binding) {
            // If a frame has not started loading, it might never start. Rely on
            // addScriptToEvaluateOnNewDocument in that case.
            if (this !== this._frameManager.mainFrame() && !this._hasStartedLoading) {
                return;
            }
            await Promise.all([
                this.#client.send('Runtime.removeBinding', {
                    name: CDP_BINDING_PREFIX + binding.name,
                }),
                this.evaluate(name => {
                    // Removes the dangling Puppeteer binding wrapper.
                    // @ts-expect-error: In a different context.
                    globalThis[name] = undefined;
                }, binding.name).catch(debugError),
            ]);
        }
        async waitForDevicePrompt(options = {}) {
            return await this.#deviceRequestPromptManager().waitForDevicePrompt(options);
        }
        _navigated(framePayload) {
            this._name = framePayload.name;
            this.#url = `${framePayload.url}${framePayload.urlFragment || ''}`;
        }
        _navigatedWithinDocument(url) {
            this.#url = url;
        }
        _onLifecycleEvent(loaderId, name) {
            if (name === 'init') {
                this._loaderId = loaderId;
                this._lifecycleEvents.clear();
            }
            this._lifecycleEvents.add(name);
        }
        _onLoadingStopped() {
            this._lifecycleEvents.add('DOMContentLoaded');
            this._lifecycleEvents.add('load');
        }
        _onLoadingStarted() {
            this._hasStartedLoading = true;
        }
        get detached() {
            return this.#detached;
        }
        [(_goto_decorators = [throwIfDetached], _waitForNavigation_decorators = [throwIfDetached], _setContent_decorators = [throwIfDetached], _addPreloadScript_decorators = [throwIfDetached], _addExposedFunctionBinding_decorators = [throwIfDetached], _removeExposedFunctionBinding_decorators = [throwIfDetached], _waitForDevicePrompt_decorators = [throwIfDetached], disposeSymbol)]() {
            if (this.#detached) {
                return;
            }
            this.#detached = true;
            this.worlds[MAIN_WORLD][disposeSymbol]();
            this.worlds[PUPPETEER_WORLD][disposeSymbol]();
            for (const extensionWorld of Object.values(this.extensionWorlds)) {
                extensionWorld[disposeSymbol]();
            }
            super[disposeSymbol]();
        }
        exposeFunction() {
            throw new UnsupportedOperation();
        }
        async frameElement() {
            const parent = this.parentFrame();
            if (!parent) {
                return null;
            }
            const { backendNodeId } = await parent.client.send('DOM.getFrameOwner', {
                frameId: this._id,
            });
            return (await parent
                .mainRealm()
                .adoptBackendNode(backendNodeId));
        }
        /**
         * @public
         */
        extensionRealms() {
            return Object.values(this.extensionWorlds);
        }
    };
})();
/**
 * @internal
 */
function referrerPolicyToProtocol(referrerPolicy) {
    // See
    // https://chromedevtools.github.io/devtools-protocol/tot/Page/#type-ReferrerPolicy
    // We need to conver from Web-facing phase to CDP's camelCase.
    return referrerPolicy.replaceAll(/-./g, match => {
        return match[1].toUpperCase();
    });
}

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Keeps track of the page frame tree and it's is managed by
 * {@link FrameManager}. FrameTree uses frame IDs to reference frame and it
 * means that referenced frames might not be in the tree anymore. Thus, the tree
 * structure is eventually consistent.
 * @internal
 */
class FrameTree {
    #frames = new Map();
    // frameID -> parentFrameID
    #parentIds = new Map();
    // frameID -> childFrameIDs
    #childIds = new Map();
    #mainFrame;
    #isMainFrameStale = false;
    #waitRequests = new Map();
    getMainFrame() {
        return this.#mainFrame;
    }
    getById(frameId) {
        return this.#frames.get(frameId);
    }
    /**
     * Returns a promise that is resolved once the frame with
     * the given ID is added to the tree.
     */
    waitForFrame(frameId) {
        const frame = this.getById(frameId);
        if (frame) {
            return Promise.resolve(frame);
        }
        const deferred = Deferred.create();
        const callbacks = this.#waitRequests.get(frameId) || new Set();
        callbacks.add(deferred);
        return deferred.valueOrThrow();
    }
    frames() {
        return Array.from(this.#frames.values());
    }
    addFrame(frame) {
        this.#frames.set(frame._id, frame);
        if (frame._parentId) {
            this.#parentIds.set(frame._id, frame._parentId);
            if (!this.#childIds.has(frame._parentId)) {
                this.#childIds.set(frame._parentId, new Set());
            }
            this.#childIds.get(frame._parentId).add(frame._id);
        }
        else if (!this.#mainFrame || this.#isMainFrameStale) {
            this.#mainFrame = frame;
            this.#isMainFrameStale = false;
        }
        this.#waitRequests.get(frame._id)?.forEach(request => {
            return request.resolve(frame);
        });
    }
    removeFrame(frame) {
        this.#frames.delete(frame._id);
        this.#parentIds.delete(frame._id);
        if (frame._parentId) {
            this.#childIds.get(frame._parentId)?.delete(frame._id);
        }
        else {
            this.#isMainFrameStale = true;
        }
    }
    childFrames(frameId) {
        const childIds = this.#childIds.get(frameId);
        if (!childIds) {
            return [];
        }
        return Array.from(childIds)
            .map(id => {
            return this.getById(id);
        })
            .filter((frame) => {
            return frame !== undefined;
        });
    }
    parentFrame(frameId) {
        const parentId = this.#parentIds.get(frameId);
        return parentId ? this.getById(parentId) : undefined;
    }
}

/**
 * @internal
 */
class CdpHTTPRequest extends HTTPRequest {
    id;
    #client;
    #isNavigationRequest;
    #url;
    #resourceType;
    #method;
    #hasPostData = false;
    #postData;
    #headers = {};
    #frame;
    #initiator;
    get client() {
        return this.#client;
    }
    set client(newClient) {
        this.#client = newClient;
    }
    constructor(client, frame, interceptionId, allowInterception, data, redirectChain) {
        super();
        this.#client = client;
        this.id = data.requestId;
        this.#isNavigationRequest =
            data.requestId === data.loaderId && data.type === 'Document';
        this._interceptionId = interceptionId;
        this.#url = data.request.url + (data.request.urlFragment ?? '');
        this.#resourceType = (data.type || 'other').toLowerCase();
        this.#method = data.request.method;
        if (data.request.postDataEntries &&
            data.request.postDataEntries.length > 0) {
            this.#postData = new TextDecoder().decode(mergeUint8Arrays(data.request.postDataEntries
                .map(entry => {
                return entry.bytes ? stringToTypedArray(entry.bytes, true) : null;
            })
                .filter((entry) => {
                return entry !== null;
            })));
        }
        else {
            this.#postData = data.request.postData;
        }
        this.#hasPostData = data.request.hasPostData ?? false;
        this.#frame = frame;
        this._redirectChain = redirectChain;
        this.#initiator = data.initiator;
        this.interception.enabled = allowInterception;
        this.updateHeaders(data.request.headers);
    }
    updateHeaders(headers) {
        for (const [key, value] of Object.entries(headers)) {
            this.#headers[key.toLowerCase()] = value;
        }
    }
    url() {
        return this.#url;
    }
    resourceType() {
        return this.#resourceType;
    }
    method() {
        return this.#method;
    }
    postData() {
        return this.#postData;
    }
    hasPostData() {
        return this.#hasPostData;
    }
    async fetchPostData() {
        try {
            const result = await this.#client.send('Network.getRequestPostData', {
                requestId: this.id,
            });
            return result.postData;
        }
        catch (err) {
            debugError(err);
            return;
        }
    }
    headers() {
        // Callers should not be allowed to mutate internal structure.
        return structuredClone(this.#headers);
    }
    response() {
        return this._response;
    }
    frame() {
        return this.#frame;
    }
    isNavigationRequest() {
        return this.#isNavigationRequest;
    }
    initiator() {
        return this.#initiator;
    }
    redirectChain() {
        return this._redirectChain.slice();
    }
    failure() {
        if (!this._failureText) {
            return null;
        }
        return {
            errorText: this._failureText,
        };
    }
    canBeIntercepted() {
        return !this.url().startsWith('data:') && !this._fromMemoryCache;
    }
    /**
     * @internal
     */
    async _continue(overrides = {}) {
        const { url, method, postData, headers } = overrides;
        this.interception.handled = true;
        const postDataBinaryBase64 = postData
            ? stringToBase64(postData)
            : undefined;
        if (this._interceptionId === undefined) {
            throw new Error('HTTPRequest is missing _interceptionId needed for Fetch.continueRequest');
        }
        await this.#client
            .send('Fetch.continueRequest', {
            requestId: this._interceptionId,
            url,
            method,
            postData: postDataBinaryBase64,
            headers: headers ? headersArray(headers) : undefined,
        })
            .catch(error => {
            this.interception.handled = false;
            return handleError(error);
        });
    }
    async _respond(response) {
        this.interception.handled = true;
        let parsedBody;
        if (response.body) {
            parsedBody = HTTPRequest.getResponse(response.body);
        }
        const responseHeaders = {};
        if (response.headers) {
            for (const header of Object.keys(response.headers)) {
                const value = response.headers[header];
                responseHeaders[header.toLowerCase()] = Array.isArray(value)
                    ? value.map(item => {
                        return String(item);
                    })
                    : String(value);
            }
        }
        if (response.contentType) {
            responseHeaders['content-type'] = response.contentType;
        }
        if (parsedBody?.contentLength && !('content-length' in responseHeaders)) {
            responseHeaders['content-length'] = String(parsedBody.contentLength);
        }
        const status = response.status || 200;
        if (this._interceptionId === undefined) {
            throw new Error('HTTPRequest is missing _interceptionId needed for Fetch.fulfillRequest');
        }
        await this.#client
            .send('Fetch.fulfillRequest', {
            requestId: this._interceptionId,
            responseCode: status,
            responsePhrase: STATUS_TEXTS[status],
            responseHeaders: headersArray(responseHeaders),
            body: parsedBody?.base64,
        })
            .catch(error => {
            this.interception.handled = false;
            return handleError(error);
        });
    }
    async _abort(errorReason) {
        this.interception.handled = true;
        if (this._interceptionId === undefined) {
            throw new Error('HTTPRequest is missing _interceptionId needed for Fetch.failRequest');
        }
        await this.#client
            .send('Fetch.failRequest', {
            requestId: this._interceptionId,
            errorReason: errorReason || 'Failed',
        })
            .catch(handleError);
    }
}

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The SecurityDetails class represents the security details of a
 * response that was received over a secure connection.
 *
 * @public
 */
class SecurityDetails {
    #subjectName;
    #issuer;
    #validFrom;
    #validTo;
    #protocol;
    #sanList;
    /**
     * @internal
     */
    constructor(securityPayload) {
        this.#subjectName = securityPayload.subjectName;
        this.#issuer = securityPayload.issuer;
        this.#validFrom = securityPayload.validFrom;
        this.#validTo = securityPayload.validTo;
        this.#protocol = securityPayload.protocol;
        this.#sanList = securityPayload.sanList;
    }
    /**
     * The name of the issuer of the certificate.
     */
    issuer() {
        return this.#issuer;
    }
    /**
     * {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
     * marking the start of the certificate's validity.
     */
    validFrom() {
        return this.#validFrom;
    }
    /**
     * {@link https://en.wikipedia.org/wiki/Unix_time | Unix timestamp}
     * marking the end of the certificate's validity.
     */
    validTo() {
        return this.#validTo;
    }
    /**
     * The security protocol being used, e.g. "TLS 1.2".
     */
    protocol() {
        return this.#protocol;
    }
    /**
     * The name of the subject to which the certificate was issued.
     */
    subjectName() {
        return this.#subjectName;
    }
    /**
     * The list of {@link https://en.wikipedia.org/wiki/Subject_Alternative_Name | subject alternative names (SANs)} of the certificate.
     */
    subjectAlternativeNames() {
        return this.#sanList;
    }
}

/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Normalizes HTTP header values by handling multiline values.
 * Multiline header values are joined with commas according to HTTP/1.1 spec.
 *
 * @internal
 */
function normalizeHeaderValue(header) {
    if (!header.includes('\n')) {
        return header;
    }
    return header
        .split('\n')
        .map(v => {
        return v.trim();
    })
        .filter(Boolean)
        .join(', ');
}

/**
 * @internal
 */
class CdpHTTPResponse extends HTTPResponse {
    #request;
    #contentPromise = null;
    #bodyLoadedDeferred = Deferred.create();
    #remoteAddress;
    #status;
    #statusText;
    #fromDiskCache;
    #fromServiceWorker;
    #headers = {};
    #securityDetails;
    #timing;
    constructor(request, responsePayload, extraInfo) {
        super();
        this.#request = request;
        this.#remoteAddress = {
            ip: responsePayload.remoteIPAddress,
            port: responsePayload.remotePort,
        };
        this.#statusText =
            this.#parseStatusTextFromExtraInfo(extraInfo) ||
                responsePayload.statusText;
        this.#fromDiskCache = !!responsePayload.fromDiskCache;
        this.#fromServiceWorker = !!responsePayload.fromServiceWorker;
        this.#status = extraInfo ? extraInfo.statusCode : responsePayload.status;
        const headers = extraInfo ? extraInfo.headers : responsePayload.headers;
        for (const [key, value] of Object.entries(headers)) {
            this.#headers[key.toLowerCase()] = normalizeHeaderValue(value);
        }
        this.#securityDetails = responsePayload.securityDetails
            ? new SecurityDetails(responsePayload.securityDetails)
            : null;
        this.#timing = responsePayload.timing || null;
    }
    #parseStatusTextFromExtraInfo(extraInfo) {
        if (!extraInfo || !extraInfo.headersText) {
            return;
        }
        const firstLine = extraInfo.headersText.split('\r', 1)[0];
        if (!firstLine || firstLine.length > 1_000) {
            return;
        }
        const match = firstLine.match(/[^ ]* [^ ]* (.*)/);
        if (!match) {
            return;
        }
        const statusText = match[1];
        if (!statusText) {
            return;
        }
        return statusText;
    }
    _resolveBody(err) {
        if (err) {
            return this.#bodyLoadedDeferred.reject(err);
        }
        return this.#bodyLoadedDeferred.resolve();
    }
    remoteAddress() {
        return this.#remoteAddress;
    }
    url() {
        return this.#request.url();
    }
    status() {
        return this.#status;
    }
    statusText() {
        return this.#statusText;
    }
    headers() {
        return this.#headers;
    }
    securityDetails() {
        return this.#securityDetails;
    }
    timing() {
        return this.#timing;
    }
    content() {
        if (!this.#contentPromise) {
            this.#contentPromise = this.#bodyLoadedDeferred
                .valueOrThrow()
                .then(async () => {
                try {
                    // Use CDPSession from corresponding request to retrieve body, as it's client
                    // might have been updated (e.g. for an adopted OOPIF).
                    const response = await this.#request.client.send('Network.getResponseBody', {
                        requestId: this.#request.id,
                    });
                    return stringToTypedArray(response.body, response.base64Encoded);
                }
                catch (error) {
                    if (error instanceof ProtocolError &&
                        error.originalMessage ===
                            'No resource with given identifier found') {
                        throw new ProtocolError('Could not load response body for this request. This might happen if the request is a preflight request.');
                    }
                    throw error;
                }
            });
        }
        return this.#contentPromise;
    }
    request() {
        return this.#request;
    }
    fromCache() {
        return this.#fromDiskCache || this.#request._fromMemoryCache;
    }
    fromServiceWorker() {
        return this.#fromServiceWorker;
    }
    frame() {
        return this.#request.frame();
    }
}

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Helper class to track network events by request ID
 *
 * @internal
 */
class NetworkEventManager {
    /**
     * There are four possible orders of events:
     * A. `_onRequestWillBeSent`
     * B. `_onRequestWillBeSent`, `_onRequestPaused`
     * C. `_onRequestPaused`, `_onRequestWillBeSent`
     * D. `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
     * `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`
     * (see crbug.com/1196004)
     *
     * For `_onRequest` we need the event from `_onRequestWillBeSent` and
     * optionally the `interceptionId` from `_onRequestPaused`.
     *
     * If request interception is disabled, call `_onRequest` once per call to
     * `_onRequestWillBeSent`.
     * If request interception is enabled, call `_onRequest` once per call to
     * `_onRequestPaused` (once per `interceptionId`).
     *
     * Events are stored to allow for subsequent events to call `_onRequest`.
     *
     * Note that (chains of) redirect requests have the same `requestId` (!) as
     * the original request. We have to anticipate series of events like these:
     * A. `_onRequestWillBeSent`,
     * `_onRequestWillBeSent`, ...
     * B. `_onRequestWillBeSent`, `_onRequestPaused`,
     * `_onRequestWillBeSent`, `_onRequestPaused`, ...
     * C. `_onRequestWillBeSent`, `_onRequestPaused`,
     * `_onRequestPaused`, `_onRequestWillBeSent`, ...
     * D. `_onRequestPaused`, `_onRequestWillBeSent`,
     * `_onRequestPaused`, `_onRequestWillBeSent`, `_onRequestPaused`,
     * `_onRequestWillBeSent`, `_onRequestPaused`, `_onRequestPaused`, ...
     * (see crbug.com/1196004)
     */
    #requestWillBeSentMap = new Map();
    #requestPausedMap = new Map();
    #httpRequestsMap = new Map();
    #requestWillBeSentExtraInfoMap = new Map();
    /*
     * The below maps are used to reconcile Network.responseReceivedExtraInfo
     * events with their corresponding request. Each response and redirect
     * response gets an ExtraInfo event, and we don't know which will come first.
     * This means that we have to store a Response or an ExtraInfo for each
     * response, and emit the event when we get both of them. In addition, to
     * handle redirects, we have to make them Arrays to represent the chain of
     * events.
     */
    #responseReceivedExtraInfoMap = new Map();
    #queuedRedirectInfoMap = new Map();
    #queuedEventGroupMap = new Map();
    forget(networkRequestId) {
        this.#requestWillBeSentMap.delete(networkRequestId);
        this.#requestPausedMap.delete(networkRequestId);
        this.#requestWillBeSentExtraInfoMap.delete(networkRequestId);
        this.#queuedEventGroupMap.delete(networkRequestId);
        this.#queuedRedirectInfoMap.delete(networkRequestId);
        this.#responseReceivedExtraInfoMap.delete(networkRequestId);
    }
    requestExtraInfo(networkRequestId) {
        if (!this.#requestWillBeSentExtraInfoMap.has(networkRequestId)) {
            this.#requestWillBeSentExtraInfoMap.set(networkRequestId, []);
        }
        return this.#requestWillBeSentExtraInfoMap.get(networkRequestId);
    }
    responseExtraInfo(networkRequestId) {
        if (!this.#responseReceivedExtraInfoMap.has(networkRequestId)) {
            this.#responseReceivedExtraInfoMap.set(networkRequestId, []);
        }
        return this.#responseReceivedExtraInfoMap.get(networkRequestId);
    }
    queuedRedirectInfo(fetchRequestId) {
        if (!this.#queuedRedirectInfoMap.has(fetchRequestId)) {
            this.#queuedRedirectInfoMap.set(fetchRequestId, []);
        }
        return this.#queuedRedirectInfoMap.get(fetchRequestId);
    }
    queueRedirectInfo(fetchRequestId, redirectInfo) {
        this.queuedRedirectInfo(fetchRequestId).push(redirectInfo);
    }
    takeQueuedRedirectInfo(fetchRequestId) {
        return this.queuedRedirectInfo(fetchRequestId).shift();
    }
    inFlightRequestsCount() {
        let inFlightRequestCounter = 0;
        for (const request of this.#httpRequestsMap.values()) {
            if (!request.response()) {
                inFlightRequestCounter++;
            }
        }
        return inFlightRequestCounter;
    }
    storeRequestWillBeSent(networkRequestId, event) {
        this.#requestWillBeSentMap.set(networkRequestId, event);
    }
    getRequestWillBeSent(networkRequestId) {
        return this.#requestWillBeSentMap.get(networkRequestId);
    }
    forgetRequestWillBeSent(networkRequestId) {
        this.#requestWillBeSentMap.delete(networkRequestId);
    }
    getRequestPaused(networkRequestId) {
        return this.#requestPausedMap.get(networkRequestId);
    }
    forgetRequestPaused(networkRequestId) {
        this.#requestPausedMap.delete(networkRequestId);
    }
    storeRequestPaused(networkRequestId, event) {
        this.#requestPausedMap.set(networkRequestId, event);
    }
    getRequest(networkRequestId) {
        return this.#httpRequestsMap.get(networkRequestId);
    }
    storeRequest(networkRequestId, request) {
        this.#httpRequestsMap.set(networkRequestId, request);
    }
    forgetRequest(networkRequestId) {
        this.#httpRequestsMap.delete(networkRequestId);
    }
    getQueuedEventGroup(networkRequestId) {
        return this.#queuedEventGroupMap.get(networkRequestId);
    }
    queueEventGroup(networkRequestId, event) {
        this.#queuedEventGroupMap.set(networkRequestId, event);
    }
    forgetQueuedEventGroup(networkRequestId) {
        this.#queuedEventGroupMap.delete(networkRequestId);
    }
    printState() {
        function replacer(_key, value) {
            if (value instanceof Map) {
                return {
                    dataType: 'Map',
                    value: Array.from(value.entries()), // or with spread: value: [...value]
                };
            }
            else if (value instanceof CdpHTTPRequest) {
                return {
                    dataType: 'CdpHTTPRequest',
                    value: `${value.id}: ${value.url()}`,
                };
            }
            {
                return value;
            }
        }
        console.log('httpRequestsMap', JSON.stringify(this.#httpRequestsMap, replacer, 2));
        console.log('requestWillBeSentMap', JSON.stringify(this.#requestWillBeSentMap, replacer, 2));
        console.log('requestWillBeSentMap', JSON.stringify(this.#responseReceivedExtraInfoMap, replacer, 2));
        console.log('requestWillBeSentMap', JSON.stringify(this.#requestPausedMap, replacer, 2));
    }
}

export { CdpHTTPRequest as C, FrameTree as F, NetworkEventManager as N, SecurityDetails as S, CdpHTTPResponse as a, CdpFrame as b, normalizeHeaderValue as n };
