// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { E as EventEmitter, C as CDPSessionEvent, D as DisposableStack, i as isString, b as debugError, g as Deferred, U as UTILITY_WORLD_NAME, P as PuppeteerURL, d as disposeSymbol } from './chunk-017.mjs';
import { F as FrameEvent } from './chunk-021.mjs';
import { a as assert } from './chunk-015.mjs';
import { i as isErrorLike } from './chunk-019.mjs';
import { e as CdpIssue, f as CdpPreloadScript, g as CdpDeviceRequestPromptManager } from './chunk-026.mjs';
import { i as isTargetClosedError } from './chunk-025.mjs';
import { N as NetworkManagerEvent, F as FrameManagerEvent, M as MAIN_WORLD, P as PUPPETEER_WORLD, I as IsolatedWorld, E as ExecutionContext } from './chunk-027.mjs';
import { N as NetworkEventManager, C as CdpHTTPRequest, a as CdpHTTPResponse, F as FrameTree, b as CdpFrame } from './chunk-028.mjs';

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class NetworkManager extends EventEmitter {
    #frameManager;
    #networkEventManager = new NetworkEventManager();
    #extraHTTPHeaders;
    #credentials = null;
    #attemptedAuthentications = new Set();
    #userRequestInterceptionEnabled = false;
    #protocolRequestInterceptionEnabled;
    #userCacheDisabled;
    #emulatedNetworkConditions;
    #userAgent;
    #userAgentMetadata;
    #platform;
    #handlers = [
        ['Fetch.requestPaused', this.#onRequestPaused],
        ['Fetch.authRequired', this.#onAuthRequired],
        ['Network.requestWillBeSent', this.#onRequestWillBeSent],
        ['Network.requestWillBeSentExtraInfo', this.#onRequestWillBeSentExtraInfo],
        ['Network.requestServedFromCache', this.#onRequestServedFromCache],
        ['Network.responseReceived', this.#onResponseReceived],
        ['Network.loadingFinished', this.#onLoadingFinished],
        ['Network.loadingFailed', this.#onLoadingFailed],
        ['Network.responseReceivedExtraInfo', this.#onResponseReceivedExtraInfo],
        [CDPSessionEvent.Disconnected, this.#removeClient],
    ];
    #clients = new Map();
    #networkEnabled = true;
    constructor(frameManager, networkEnabled) {
        super();
        this.#frameManager = frameManager;
        this.#networkEnabled = networkEnabled ?? true;
    }
    #canIgnoreError(error) {
        return (isErrorLike(error) &&
            (isTargetClosedError(error) ||
                error.message.includes('Not supported') ||
                error.message.includes("wasn't found")));
    }
    async addClient(client) {
        if (!this.#networkEnabled || this.#clients.has(client)) {
            return;
        }
        const subscriptions = new DisposableStack();
        this.#clients.set(client, subscriptions);
        const clientEmitter = subscriptions.use(new EventEmitter(client));
        for (const [event, handler] of this.#handlers) {
            clientEmitter.on(event, (arg) => {
                return handler.bind(this)(client, arg);
            });
        }
        try {
            await Promise.all([
                client.send('Network.enable'),
                this.#applyExtraHTTPHeaders(client),
                this.#applyNetworkConditions(client),
                this.#applyProtocolCacheDisabled(client),
                this.#applyProtocolRequestInterception(client),
                this.#applyUserAgent(client),
            ]);
        }
        catch (error) {
            if (this.#canIgnoreError(error)) {
                return;
            }
            throw error;
        }
    }
    async #removeClient(client) {
        this.#clients.get(client)?.dispose();
        this.#clients.delete(client);
    }
    async authenticate(credentials) {
        this.#credentials = credentials;
        const enabled = this.#userRequestInterceptionEnabled || !!this.#credentials;
        if (enabled === this.#protocolRequestInterceptionEnabled) {
            return;
        }
        this.#protocolRequestInterceptionEnabled = enabled;
        await this.#applyToAllClients(this.#applyProtocolRequestInterception.bind(this));
    }
    async setExtraHTTPHeaders(headers) {
        const extraHTTPHeaders = {};
        for (const [key, value] of Object.entries(headers)) {
            assert(isString(value), `Expected value of header "${key}" to be String, but "${typeof value}" is found.`);
            extraHTTPHeaders[key.toLowerCase()] = value;
        }
        this.#extraHTTPHeaders = extraHTTPHeaders;
        await this.#applyToAllClients(this.#applyExtraHTTPHeaders.bind(this));
    }
    async #applyExtraHTTPHeaders(client) {
        if (this.#extraHTTPHeaders === undefined) {
            return;
        }
        try {
            await client.send('Network.setExtraHTTPHeaders', {
                headers: this.#extraHTTPHeaders,
            });
        }
        catch (error) {
            if (this.#canIgnoreError(error)) {
                return;
            }
            throw error;
        }
    }
    extraHTTPHeaders() {
        return Object.assign({}, this.#extraHTTPHeaders);
    }
    inFlightRequestsCount() {
        return this.#networkEventManager.inFlightRequestsCount();
    }
    async setOfflineMode(value) {
        if (!this.#emulatedNetworkConditions) {
            this.#emulatedNetworkConditions = {
                offline: false,
                upload: -1,
                download: -1,
                latency: 0,
            };
        }
        this.#emulatedNetworkConditions.offline = value;
        await this.#applyToAllClients(this.#applyNetworkConditions.bind(this));
    }
    async emulateNetworkConditions(networkConditions) {
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
        await this.#applyToAllClients(this.#applyNetworkConditions.bind(this));
    }
    async #applyToAllClients(fn) {
        await Promise.all(Array.from(this.#clients.keys()).map(client => {
            return fn(client);
        }));
    }
    async #applyNetworkConditions(client) {
        if (this.#emulatedNetworkConditions === undefined) {
            return;
        }
        try {
            await client.send('Network.emulateNetworkConditions', {
                offline: this.#emulatedNetworkConditions.offline,
                latency: this.#emulatedNetworkConditions.latency,
                uploadThroughput: this.#emulatedNetworkConditions.upload,
                downloadThroughput: this.#emulatedNetworkConditions.download,
            });
        }
        catch (error) {
            if (this.#canIgnoreError(error)) {
                return;
            }
            throw error;
        }
    }
    async setUserAgent(userAgent, userAgentMetadata, platform) {
        this.#userAgent = userAgent;
        this.#userAgentMetadata = userAgentMetadata;
        this.#platform = platform;
        await this.#applyToAllClients(this.#applyUserAgent.bind(this));
    }
    async #applyUserAgent(client) {
        if (this.#userAgent === undefined) {
            return;
        }
        try {
            await client.send('Network.setUserAgentOverride', {
                userAgent: this.#userAgent,
                userAgentMetadata: this.#userAgentMetadata,
                platform: this.#platform,
            });
        }
        catch (error) {
            if (this.#canIgnoreError(error)) {
                return;
            }
            throw error;
        }
    }
    async setCacheEnabled(enabled) {
        this.#userCacheDisabled = !enabled;
        await this.#applyToAllClients(this.#applyProtocolCacheDisabled.bind(this));
    }
    async setRequestInterception(value) {
        this.#userRequestInterceptionEnabled = value;
        const enabled = this.#userRequestInterceptionEnabled || !!this.#credentials;
        if (enabled === this.#protocolRequestInterceptionEnabled) {
            return;
        }
        this.#protocolRequestInterceptionEnabled = enabled;
        await this.#applyToAllClients(this.#applyProtocolRequestInterception.bind(this));
    }
    async #applyProtocolRequestInterception(client) {
        if (this.#protocolRequestInterceptionEnabled === undefined) {
            return;
        }
        if (this.#userCacheDisabled === undefined) {
            this.#userCacheDisabled = false;
        }
        try {
            if (this.#protocolRequestInterceptionEnabled) {
                await Promise.all([
                    this.#applyProtocolCacheDisabled(client),
                    client.send('Fetch.enable', {
                        handleAuthRequests: true,
                        patterns: [{ urlPattern: '*' }],
                    }),
                ]);
            }
            else {
                await Promise.all([
                    this.#applyProtocolCacheDisabled(client),
                    client.send('Fetch.disable'),
                ]);
            }
        }
        catch (error) {
            if (this.#canIgnoreError(error)) {
                return;
            }
            throw error;
        }
    }
    async #applyProtocolCacheDisabled(client) {
        if (this.#userCacheDisabled === undefined) {
            return;
        }
        try {
            await client.send('Network.setCacheDisabled', {
                cacheDisabled: this.#userCacheDisabled,
            });
        }
        catch (error) {
            if (this.#canIgnoreError(error)) {
                return;
            }
            throw error;
        }
    }
    #onRequestWillBeSent(client, event) {
        // Request interception doesn't happen for data URLs with Network Service.
        if (this.#userRequestInterceptionEnabled &&
            !event.request.url.startsWith('data:')) {
            const { requestId: networkRequestId } = event;
            this.#networkEventManager.storeRequestWillBeSent(networkRequestId, event);
            /**
             * CDP may have sent a Fetch.requestPaused event already. Check for it.
             */
            const requestPausedEvent = this.#networkEventManager.getRequestPaused(networkRequestId);
            if (requestPausedEvent) {
                const { requestId: fetchRequestId } = requestPausedEvent;
                this.#patchRequestEventHeaders(event, requestPausedEvent);
                this.#onRequest(client, event, fetchRequestId);
                this.#networkEventManager.forgetRequestPaused(networkRequestId);
            }
            return;
        }
        this.#onRequest(client, event, undefined);
    }
    #onAuthRequired(client, event) {
        let response = 'Default';
        if (this.#attemptedAuthentications.has(event.requestId)) {
            response = 'CancelAuth';
        }
        else if (this.#credentials) {
            response = 'ProvideCredentials';
            this.#attemptedAuthentications.add(event.requestId);
        }
        const { username, password } = this.#credentials || {
            username: undefined,
            password: undefined,
        };
        client
            .send('Fetch.continueWithAuth', {
            requestId: event.requestId,
            authChallengeResponse: { response, username, password },
        })
            .catch(debugError);
    }
    /**
     * CDP may send a Fetch.requestPaused without or before a
     * Network.requestWillBeSent
     *
     * CDP may send multiple Fetch.requestPaused
     * for the same Network.requestWillBeSent.
     */
    #onRequestPaused(client, event) {
        if (!this.#userRequestInterceptionEnabled &&
            this.#protocolRequestInterceptionEnabled) {
            client
                .send('Fetch.continueRequest', {
                requestId: event.requestId,
            })
                .catch(debugError);
        }
        const { networkId: networkRequestId, requestId: fetchRequestId } = event;
        if (!networkRequestId) {
            this.#onRequestWithoutNetworkInstrumentation(client, event);
            return;
        }
        const requestWillBeSentEvent = (() => {
            const requestWillBeSentEvent = this.#networkEventManager.getRequestWillBeSent(networkRequestId);
            // redirect requests have the same `requestId`,
            if (requestWillBeSentEvent &&
                (requestWillBeSentEvent.request.url !== event.request.url ||
                    requestWillBeSentEvent.request.method !== event.request.method)) {
                this.#networkEventManager.forgetRequestWillBeSent(networkRequestId);
                return;
            }
            return requestWillBeSentEvent;
        })();
        if (requestWillBeSentEvent) {
            this.#patchRequestEventHeaders(requestWillBeSentEvent, event);
            this.#onRequest(client, requestWillBeSentEvent, fetchRequestId);
        }
        else {
            this.#networkEventManager.storeRequestPaused(networkRequestId, event);
        }
    }
    #patchRequestEventHeaders(requestWillBeSentEvent, requestPausedEvent) {
        requestWillBeSentEvent.request.headers = {
            ...requestWillBeSentEvent.request.headers,
            // includes extra headers, like: Accept, Origin
            ...requestPausedEvent.request.headers,
        };
    }
    #onRequestWithoutNetworkInstrumentation(client, event) {
        // If an event has no networkId it should not have any network events. We
        // still want to dispatch it for the interception by the user.
        const frame = event.frameId
            ? this.#frameManager.frame(event.frameId)
            : null;
        const request = new CdpHTTPRequest(client, frame, event.requestId, this.#userRequestInterceptionEnabled, event, []);
        this.emit(NetworkManagerEvent.Request, request);
        void request.finalizeInterceptions();
    }
    #onRequest(client, event, fetchRequestId, fromMemoryCache = false) {
        let redirectChain = [];
        if (event.redirectResponse) {
            // We want to emit a response and requestfinished for the
            // redirectResponse, but we can't do so unless we have a
            // responseExtraInfo ready to pair it up with. If we don't have any
            // responseExtraInfos saved in our queue, they we have to wait until
            // the next one to emit response and requestfinished, *and* we should
            // also wait to emit this Request too because it should come after the
            // response/requestfinished.
            let redirectResponseExtraInfo = null;
            if (event.redirectHasExtraInfo) {
                redirectResponseExtraInfo = this.#networkEventManager
                    .responseExtraInfo(event.requestId)
                    .shift();
                if (!redirectResponseExtraInfo) {
                    this.#networkEventManager.queueRedirectInfo(event.requestId, {
                        event,
                        fetchRequestId,
                    });
                    return;
                }
            }
            const request = this.#networkEventManager.getRequest(event.requestId);
            // If we connect late to the target, we could have missed the
            // requestWillBeSent event.
            if (request) {
                this.#handleRequestRedirect(client, request, event.redirectResponse, redirectResponseExtraInfo);
                redirectChain = request._redirectChain;
                const extraInfo = this.#networkEventManager
                    .requestExtraInfo(event.requestId)
                    .shift();
                if (extraInfo) {
                    request.updateHeaders(extraInfo.headers);
                }
            }
        }
        const frame = event.frameId
            ? this.#frameManager.frame(event.frameId)
            : null;
        const request = new CdpHTTPRequest(client, frame, fetchRequestId, this.#userRequestInterceptionEnabled, event, redirectChain);
        const extraInfo = this.#networkEventManager
            .requestExtraInfo(event.requestId)
            .shift();
        if (extraInfo) {
            request.updateHeaders(extraInfo.headers);
        }
        request._fromMemoryCache = fromMemoryCache;
        this.#networkEventManager.storeRequest(event.requestId, request);
        this.emit(NetworkManagerEvent.Request, request);
        void request.finalizeInterceptions();
    }
    #onRequestWillBeSentExtraInfo(_client, event) {
        const request = this.#networkEventManager.getRequest(event.requestId);
        if (request) {
            request.updateHeaders(event.headers);
        }
        else {
            this.#networkEventManager.requestExtraInfo(event.requestId).push(event);
        }
    }
    #onRequestServedFromCache(client, event) {
        const requestWillBeSentEvent = this.#networkEventManager.getRequestWillBeSent(event.requestId);
        let request = this.#networkEventManager.getRequest(event.requestId);
        // Requests served from memory cannot be intercepted.
        if (request) {
            request._fromMemoryCache = true;
        }
        // If request ended up being served from cache, we need to convert
        // requestWillBeSentEvent to a HTTP request.
        if (!request && requestWillBeSentEvent) {
            this.#onRequest(client, requestWillBeSentEvent, undefined, true);
            request = this.#networkEventManager.getRequest(event.requestId);
        }
        if (!request) {
            debugError(new Error(`Request ${event.requestId} was served from cache but we could not find the corresponding request object`));
            return;
        }
        this.emit(NetworkManagerEvent.RequestServedFromCache, request);
    }
    #handleRequestRedirect(_client, request, responsePayload, extraInfo) {
        const response = new CdpHTTPResponse(request, responsePayload, extraInfo);
        request._response = response;
        request._redirectChain.push(request);
        response._resolveBody(new Error('Response body is unavailable for redirect responses'));
        this.#forgetRequest(request, false);
        this.emit(NetworkManagerEvent.Response, response);
        this.emit(NetworkManagerEvent.RequestFinished, request);
    }
    #emitResponseEvent(_client, responseReceived, extraInfo) {
        const request = this.#networkEventManager.getRequest(responseReceived.requestId);
        // FileUpload sends a response without a matching request.
        if (!request) {
            return;
        }
        const extraInfos = this.#networkEventManager.responseExtraInfo(responseReceived.requestId);
        if (extraInfos.length) {
            debugError(new Error('Unexpected extraInfo events for request ' +
                responseReceived.requestId));
        }
        // Chromium sends wrong extraInfo events for responses served from cache.
        // See https://github.com/puppeteer/puppeteer/issues/9965 and
        // https://crbug.com/1340398.
        if (responseReceived.response.fromDiskCache) {
            extraInfo = null;
        }
        const response = new CdpHTTPResponse(request, responseReceived.response, extraInfo);
        request._response = response;
        this.emit(NetworkManagerEvent.Response, response);
    }
    #onResponseReceived(client, event) {
        const request = this.#networkEventManager.getRequest(event.requestId);
        let extraInfo = null;
        if (request && !request._fromMemoryCache && event.hasExtraInfo) {
            extraInfo = this.#networkEventManager
                .responseExtraInfo(event.requestId)
                .shift();
            if (!extraInfo) {
                // Wait until we get the corresponding ExtraInfo event.
                this.#networkEventManager.queueEventGroup(event.requestId, {
                    responseReceivedEvent: event,
                });
                return;
            }
        }
        this.#emitResponseEvent(client, event, extraInfo);
    }
    #onResponseReceivedExtraInfo(client, event) {
        // We may have skipped a redirect response/request pair due to waiting for
        // this ExtraInfo event. If so, continue that work now that we have the
        // request.
        const redirectInfo = this.#networkEventManager.takeQueuedRedirectInfo(event.requestId);
        if (redirectInfo) {
            this.#networkEventManager.responseExtraInfo(event.requestId).push(event);
            this.#onRequest(client, redirectInfo.event, redirectInfo.fetchRequestId);
            return;
        }
        // We may have skipped response and loading events because we didn't have
        // this ExtraInfo event yet. If so, emit those events now.
        const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
        if (queuedEvents) {
            this.#networkEventManager.forgetQueuedEventGroup(event.requestId);
            this.#emitResponseEvent(client, queuedEvents.responseReceivedEvent, event);
            if (queuedEvents.loadingFinishedEvent) {
                this.#emitLoadingFinished(client, queuedEvents.loadingFinishedEvent);
            }
            if (queuedEvents.loadingFailedEvent) {
                this.#emitLoadingFailed(client, queuedEvents.loadingFailedEvent);
            }
            return;
        }
        // Wait until we get another event that can use this ExtraInfo event.
        this.#networkEventManager.responseExtraInfo(event.requestId).push(event);
    }
    #forgetRequest(request, events) {
        const requestId = request.id;
        const interceptionId = request._interceptionId;
        this.#networkEventManager.forgetRequest(requestId);
        if (interceptionId !== undefined) {
            this.#attemptedAuthentications.delete(interceptionId);
        }
        if (events) {
            this.#networkEventManager.forget(requestId);
        }
    }
    #onLoadingFinished(client, event) {
        // If the response event for this request is still waiting on a
        // corresponding ExtraInfo event, then wait to emit this event too.
        const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
        if (queuedEvents) {
            queuedEvents.loadingFinishedEvent = event;
        }
        else {
            this.#emitLoadingFinished(client, event);
        }
    }
    #emitLoadingFinished(client, event) {
        const request = this.#networkEventManager.getRequest(event.requestId);
        // For certain requestIds we never receive requestWillBeSent event.
        // @see https://crbug.com/750469
        if (!request) {
            return;
        }
        this.#adoptCdpSessionIfNeeded(client, request);
        // Under certain conditions we never get the Network.responseReceived
        // event from protocol. @see https://crbug.com/883475
        if (request.response()) {
            request.response()?._resolveBody();
        }
        this.#forgetRequest(request, true);
        this.emit(NetworkManagerEvent.RequestFinished, request);
    }
    #onLoadingFailed(client, event) {
        // If the response event for this request is still waiting on a
        // corresponding ExtraInfo event, then wait to emit this event too.
        const queuedEvents = this.#networkEventManager.getQueuedEventGroup(event.requestId);
        if (queuedEvents) {
            queuedEvents.loadingFailedEvent = event;
        }
        else {
            this.#emitLoadingFailed(client, event);
        }
    }
    #emitLoadingFailed(client, event) {
        const request = this.#networkEventManager.getRequest(event.requestId);
        // For certain requestIds we never receive requestWillBeSent event.
        // @see https://crbug.com/750469
        if (!request) {
            return;
        }
        this.#adoptCdpSessionIfNeeded(client, request);
        request._failureText = event.errorText;
        const response = request.response();
        if (response) {
            response._resolveBody();
        }
        this.#forgetRequest(request, true);
        this.emit(NetworkManagerEvent.RequestFailed, request);
    }
    #adoptCdpSessionIfNeeded(client, request) {
        // Document requests for OOPIFs start in the parent frame but are
        // adopted by their child frame, meaning their loadingFinished and
        // loadingFailed events are fired on the child session. In this case
        // we reassign the request CDPSession to ensure all subsequent
        // actions use the correct session (e.g. retrieving response body in
        // HTTPResponse). The same applies to main worker script requests.
        if (client !== request.client) {
            request.client = client;
        }
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const TIME_FOR_WAITING_FOR_SWAP = 100; // ms.
const CHROME_EXTENSION_PREFIX = 'chrome-extension://';
/**
 * A frame manager manages the frames for a given {@link Page | page}.
 *
 * @internal
 */
class FrameManager extends EventEmitter {
    #page;
    #networkManager;
    #timeoutSettings;
    #isolatedWorlds = new Set();
    #client;
    #scriptsToEvaluateOnNewDocument = new Map();
    #bindings = new Set();
    _frameTree = new FrameTree();
    /**
     * Set of frame IDs stored to indicate if a frame has received a
     * frameNavigated event so that frame tree responses could be ignored as the
     * frameNavigated event usually contains the latest information.
     */
    #frameNavigatedReceived = new Set();
    #deviceRequestPromptManagerMap = new WeakMap();
    #frameTreeHandled;
    get timeoutSettings() {
        return this.#timeoutSettings;
    }
    get networkManager() {
        return this.#networkManager;
    }
    get client() {
        return this.#client;
    }
    constructor(client, page, timeoutSettings) {
        super();
        this.#client = client;
        this.#page = page;
        this.#networkManager = new NetworkManager(this, page.browser().isNetworkEnabled());
        this.#timeoutSettings = timeoutSettings;
        this.setupEventListeners(this.#client);
        client.once(CDPSessionEvent.Disconnected, () => {
            this.#onClientDisconnect().catch(debugError);
        });
    }
    /**
     * Called when the frame's client is disconnected. We don't know if the
     * disconnect means that the frame is removed or if it will be replaced by a
     * new frame. Therefore, we wait for a swap event.
     */
    async #onClientDisconnect() {
        const mainFrame = this._frameTree.getMainFrame();
        if (!mainFrame) {
            return;
        }
        if (!this.#page.browser().connected) {
            // If the browser is not connected we know
            // that activation will not happen
            this.#removeFramesRecursively(mainFrame);
            return;
        }
        for (const child of mainFrame.childFrames()) {
            this.#removeFramesRecursively(child);
        }
        const swapped = Deferred.create({
            timeout: TIME_FOR_WAITING_FOR_SWAP,
            message: 'Frame was not swapped',
        });
        mainFrame.once(FrameEvent.FrameSwappedByActivation, () => {
            swapped.resolve();
        });
        try {
            await swapped.valueOrThrow();
        }
        catch {
            this.#removeFramesRecursively(mainFrame);
        }
    }
    /**
     * When the main frame is replaced by another main frame,
     * we maintain the main frame object identity while updating
     * its frame tree and ID.
     */
    async swapFrameTree(client) {
        this.#client = client;
        const frame = this._frameTree.getMainFrame();
        if (frame) {
            this.#frameNavigatedReceived.add(this.#client.target()._targetId);
            this._frameTree.removeFrame(frame);
            frame.updateId(this.#client.target()._targetId);
            this._frameTree.addFrame(frame);
            frame.updateClient(client);
        }
        this.setupEventListeners(client);
        client.once(CDPSessionEvent.Disconnected, () => {
            this.#onClientDisconnect().catch(debugError);
        });
        await this.initialize(client, frame);
        await this.#networkManager.addClient(client);
        if (frame) {
            frame.emit(FrameEvent.FrameSwappedByActivation, undefined);
        }
    }
    async registerSpeculativeSession(client) {
        await this.#networkManager.addClient(client);
    }
    setupEventListeners(session) {
        session.on('Page.frameAttached', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onFrameAttached(session, event.frameId, event.parentFrameId);
        });
        session.on('Page.frameNavigated', async (event) => {
            this.#frameNavigatedReceived.add(event.frame.id);
            await this.#frameTreeHandled?.valueOrThrow();
            void this.#onFrameNavigated(event.frame, event.type);
        });
        session.on('Page.navigatedWithinDocument', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onFrameNavigatedWithinDocument(event.frameId, event.url);
        });
        session.on('Page.frameDetached', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onFrameDetached(event.frameId, event.reason);
        });
        session.on('Page.frameStartedLoading', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onFrameStartedLoading(event.frameId);
        });
        session.on('Page.frameStoppedLoading', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onFrameStoppedLoading(event.frameId);
        });
        session.on('Runtime.executionContextCreated', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onExecutionContextCreated(event.context, session);
        });
        session.on('Page.lifecycleEvent', async (event) => {
            await this.#frameTreeHandled?.valueOrThrow();
            this.#onLifecycleEvent(event);
        });
        session.on('Audits.issueAdded', event => {
            this.#page.emit("issue" /* PageEvent.Issue */, new CdpIssue(event.issue));
        });
    }
    async initialize(client, frame) {
        try {
            this.#frameTreeHandled?.resolve();
            this.#frameTreeHandled = Deferred.create();
            // We need to schedule all these commands while the target is paused,
            // therefore, it needs to happen synchronously. At the same time we
            // should not start processing execution context and frame events before
            // we received the initial information about the frame tree.
            await Promise.all([
                this.#networkManager.addClient(client),
                client.send('Page.enable'),
                client.send('Page.getFrameTree').then(({ frameTree }) => {
                    this.#handleFrameTree(client, frameTree);
                    this.#frameTreeHandled?.resolve();
                }),
                client.send('Page.setLifecycleEventsEnabled', { enabled: true }),
                client.send('Runtime.enable').then(() => {
                    return this.#createIsolatedWorld(client, UTILITY_WORLD_NAME);
                }),
                ...(frame
                    ? Array.from(this.#scriptsToEvaluateOnNewDocument.values())
                    : []).map(script => {
                    return frame?.addPreloadScript(script);
                }),
                ...(frame ? Array.from(this.#bindings.values()) : []).map(binding => {
                    return frame?.addExposedFunctionBinding(binding);
                }),
                this.#page.browser().isIssuesEnabled() && client.send('Audits.enable'),
            ]);
        }
        catch (error) {
            this.#frameTreeHandled?.resolve();
            // The target might have been closed before the initialization finished.
            if (isErrorLike(error) && isTargetClosedError(error)) {
                return;
            }
            throw error;
        }
    }
    page() {
        return this.#page;
    }
    mainFrame() {
        const mainFrame = this._frameTree.getMainFrame();
        assert(mainFrame, 'Requesting main frame too early!');
        return mainFrame;
    }
    frames() {
        return Array.from(this._frameTree.frames());
    }
    frame(frameId) {
        return this._frameTree.getById(frameId) || null;
    }
    async addExposedFunctionBinding(binding) {
        this.#bindings.add(binding);
        await Promise.all(this.frames().map(async (frame) => {
            return await frame.addExposedFunctionBinding(binding);
        }));
    }
    async removeExposedFunctionBinding(binding) {
        this.#bindings.delete(binding);
        await Promise.all(this.frames().map(async (frame) => {
            return await frame.removeExposedFunctionBinding(binding);
        }));
    }
    async evaluateOnNewDocument(source) {
        const { identifier } = await this.mainFrame()
            ._client()
            .send('Page.addScriptToEvaluateOnNewDocument', {
            source,
        });
        const preloadScript = new CdpPreloadScript(this.mainFrame(), identifier, source);
        this.#scriptsToEvaluateOnNewDocument.set(identifier, preloadScript);
        await Promise.all(this.frames().map(async (frame) => {
            return await frame.addPreloadScript(preloadScript);
        }));
        return { identifier };
    }
    async removeScriptToEvaluateOnNewDocument(identifier) {
        const preloadScript = this.#scriptsToEvaluateOnNewDocument.get(identifier);
        if (!preloadScript) {
            throw new Error(`Script to evaluate on new document with id ${identifier} not found`);
        }
        this.#scriptsToEvaluateOnNewDocument.delete(identifier);
        await Promise.all(this.frames().map(frame => {
            const identifier = preloadScript.getIdForFrame(frame);
            if (!identifier) {
                return;
            }
            return frame
                ._client()
                .send('Page.removeScriptToEvaluateOnNewDocument', {
                identifier,
            })
                .catch(debugError);
        }));
    }
    onAttachedToTarget(target) {
        if (target._getTargetInfo().type !== 'iframe') {
            return;
        }
        const frame = this.frame(target._getTargetInfo().targetId);
        if (frame) {
            frame.updateClient(target._session());
        }
        this.setupEventListeners(target._session());
        void this.initialize(target._session(), frame).catch(debugError);
    }
    _deviceRequestPromptManager(client) {
        let manager = this.#deviceRequestPromptManagerMap.get(client);
        if (manager === undefined) {
            manager = new CdpDeviceRequestPromptManager(client, this.#timeoutSettings);
            this.#deviceRequestPromptManagerMap.set(client, manager);
        }
        return manager;
    }
    #onLifecycleEvent(event) {
        const frame = this.frame(event.frameId);
        if (!frame) {
            return;
        }
        frame._onLifecycleEvent(event.loaderId, event.name);
        this.emit(FrameManagerEvent.LifecycleEvent, frame);
        frame.emit(FrameEvent.LifecycleEvent, undefined);
    }
    #onFrameStartedLoading(frameId) {
        const frame = this.frame(frameId);
        if (!frame) {
            return;
        }
        frame._onLoadingStarted();
    }
    #onFrameStoppedLoading(frameId) {
        const frame = this.frame(frameId);
        if (!frame) {
            return;
        }
        frame._onLoadingStopped();
        this.emit(FrameManagerEvent.LifecycleEvent, frame);
        frame.emit(FrameEvent.LifecycleEvent, undefined);
    }
    #handleFrameTree(session, frameTree) {
        if (frameTree.frame.parentId) {
            this.#onFrameAttached(session, frameTree.frame.id, frameTree.frame.parentId);
        }
        if (!this.#frameNavigatedReceived.has(frameTree.frame.id)) {
            void this.#onFrameNavigated(frameTree.frame, 'Navigation');
        }
        else {
            this.#frameNavigatedReceived.delete(frameTree.frame.id);
        }
        if (!frameTree.childFrames) {
            return;
        }
        for (const child of frameTree.childFrames) {
            this.#handleFrameTree(session, child);
        }
    }
    #onFrameAttached(session, frameId, parentFrameId) {
        let frame = this.frame(frameId);
        if (frame) {
            const parentFrame = this.frame(parentFrameId);
            if (session && parentFrame && frame.client !== parentFrame?.client) {
                // If an OOP iframes becomes a normal iframe
                // again it is first attached to the parent frame before the
                // target is removed.
                frame.updateClient(session);
            }
            return;
        }
        frame = new CdpFrame(this, frameId, parentFrameId, session);
        this._frameTree.addFrame(frame);
        this.emit(FrameManagerEvent.FrameAttached, frame);
    }
    async #onFrameNavigated(framePayload, navigationType) {
        const frameId = framePayload.id;
        const isMainFrame = !framePayload.parentId;
        let frame = this._frameTree.getById(frameId);
        // Detach all child frames first.
        if (frame) {
            for (const child of frame.childFrames()) {
                this.#removeFramesRecursively(child);
            }
        }
        // Update or create main frame.
        if (isMainFrame) {
            if (frame) {
                // Update frame id to retain frame identity on cross-process navigation.
                this._frameTree.removeFrame(frame);
                frame._id = frameId;
            }
            else {
                // Initial main frame navigation.
                frame = new CdpFrame(this, frameId, undefined, this.#client);
            }
            this._frameTree.addFrame(frame);
        }
        frame = await this._frameTree.waitForFrame(frameId);
        frame._navigated(framePayload);
        this.emit(FrameManagerEvent.FrameNavigated, frame);
        frame.emit(FrameEvent.FrameNavigated, navigationType);
    }
    async #createIsolatedWorld(session, name) {
        const key = `${session.id()}:${name}`;
        if (this.#isolatedWorlds.has(key)) {
            return;
        }
        await session.send('Page.addScriptToEvaluateOnNewDocument', {
            source: `//# sourceURL=${PuppeteerURL.INTERNAL_URL}`,
            worldName: name,
        });
        await Promise.all(this.frames()
            .filter(frame => {
            return frame.client === session;
        })
            .map(frame => {
            // Frames might be removed before we send this, so we don't want to
            // throw an error.
            return session
                .send('Page.createIsolatedWorld', {
                frameId: frame._id,
                worldName: name,
                grantUniveralAccess: true,
            })
                .catch(debugError);
        }));
        this.#isolatedWorlds.add(key);
    }
    #onFrameNavigatedWithinDocument(frameId, url) {
        const frame = this.frame(frameId);
        if (!frame) {
            return;
        }
        frame._navigatedWithinDocument(url);
        this.emit(FrameManagerEvent.FrameNavigatedWithinDocument, frame);
        frame.emit(FrameEvent.FrameNavigatedWithinDocument, undefined);
        this.emit(FrameManagerEvent.FrameNavigated, frame);
        frame.emit(FrameEvent.FrameNavigated, 'Navigation');
    }
    #onFrameDetached(frameId, reason) {
        const frame = this.frame(frameId);
        if (!frame) {
            return;
        }
        switch (reason) {
            case 'remove':
                // Only remove the frame if the reason for the detached event is
                // an actual removement of the frame.
                // For frames that become OOP iframes, the reason would be 'swap'.
                this.#removeFramesRecursively(frame);
                break;
            case 'swap':
                this.emit(FrameManagerEvent.FrameSwapped, frame);
                frame.emit(FrameEvent.FrameSwapped, undefined);
                break;
        }
    }
    #isExtensionOrigin(origin) {
        return origin.startsWith(CHROME_EXTENSION_PREFIX);
    }
    #extractExtensionId(origin) {
        if (!origin || !this.#isExtensionOrigin(origin)) {
            return null;
        }
        const pathPart = origin.substring(CHROME_EXTENSION_PREFIX.length);
        const slashIndex = pathPart.indexOf('/');
        // if there's no / it means that pathPart is now the extensionId, otherwise
        // we take everything until the first /
        return slashIndex === -1 ? pathPart : pathPart.substring(0, slashIndex);
    }
    #onExecutionContextCreated(contextPayload, session) {
        const auxData = contextPayload.auxData;
        const origin = contextPayload.origin;
        const frameId = auxData && auxData.frameId;
        const frame = typeof frameId === 'string' ? this.frame(frameId) : undefined;
        let world;
        if (frame) {
            // Only care about execution contexts created for the current session.
            if (frame.client !== session) {
                return;
            }
            if (contextPayload.auxData && contextPayload.auxData['isDefault']) {
                world = frame.worlds[MAIN_WORLD];
            }
            else if (contextPayload.name === UTILITY_WORLD_NAME) {
                // In case of multiple sessions to the same target, there's a race between
                // connections so we might end up creating multiple isolated worlds.
                // We can use either.
                world = frame.worlds[PUPPETEER_WORLD];
            }
            else if (this.#isExtensionOrigin(origin)) {
                const extId = this.#extractExtensionId(origin);
                if (!extId) {
                    debugError('Error while parsing extension id');
                    return;
                }
                if (frame.extensionWorlds[extId]) {
                    world = frame.extensionWorlds[extId];
                }
                else {
                    world = new IsolatedWorld(frame, this.timeoutSettings, extId);
                    frame.extensionWorlds[extId] = world;
                    frame.registerWorldListeners(world);
                    world.origin = origin;
                    world.setWorldId(extId);
                }
            }
        }
        // If there is no world, the context is not meant to be handled by us.
        if (!world) {
            return;
        }
        const context = new ExecutionContext(frame?.client || this.#client, contextPayload, world);
        world.setContext(context);
    }
    #removeFramesRecursively(frame) {
        for (const child of frame.childFrames()) {
            this.#removeFramesRecursively(child);
        }
        this._frameTree.removeFrame(frame);
        this.emit(FrameManagerEvent.FrameDetached, frame);
        frame.emit(FrameEvent.FrameDetached, frame);
        // Needs to be last to ensure events
        // sent before handlers are cleared.
        frame[disposeSymbol]();
    }
}

export { FrameManager as F };
