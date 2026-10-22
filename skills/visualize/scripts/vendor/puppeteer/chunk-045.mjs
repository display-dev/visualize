// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { R as Realm, D as Deferred } from './chunk-041.mjs';
import { s as NoSuchNetworkDataException, I as InvalidArgumentException, a as UnsupportedOperationException, t as NoSuchInterceptException, u as Bluetooth, v as Speculation, i as UnknownErrorException } from './chunk-035.mjs';
import { m as matchUrlPattern, L as LogType } from './chunk-038.mjs';
import { B as BrowsingContextImpl } from './chunk-042.mjs';
import { C as CollectorsStorage, L as LogManager } from './chunk-043.mjs';
import { u as uuidv4 } from './chunk-039.mjs';
import { N as NetworkRequest } from './chunk-044.mjs';

/**
 * Copyright 2024 Google LLC.
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class WorkerRealm extends Realm {
    #realmType;
    #ownerRealms;
    constructor(cdpClient, eventManager, executionContextId, logger, origin, ownerRealms, realmId, realmStorage, realmType) {
        super(cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage);
        this.#ownerRealms = ownerRealms;
        this.#realmType = realmType;
        this.initialize();
    }
    get associatedBrowsingContexts() {
        return this.#ownerRealms.flatMap((realm) => realm.associatedBrowsingContexts);
    }
    get realmType() {
        return this.#realmType;
    }
    get source() {
        return {
            realm: this.realmId,
            // This is a hack to make Puppeteer able to track workers.
            // TODO: remove after Puppeteer tracks workers by owners and use the base version.
            context: this.associatedBrowsingContexts[0]?.id,
        };
    }
    get realmInfo() {
        const owners = this.#ownerRealms.map((realm) => realm.realmId);
        const { realmType } = this;
        switch (realmType) {
            case 'dedicated-worker': {
                const owner = owners[0];
                if (owner === undefined || owners.length !== 1) {
                    throw new Error('Dedicated worker must have exactly one owner');
                }
                return {
                    ...this.baseInfo,
                    type: realmType,
                    owners: [owner],
                };
            }
            case 'service-worker':
            case 'shared-worker': {
                return {
                    ...this.baseInfo,
                    type: realmType,
                };
            }
        }
    }
}

// The default total data size limit in CDP.
// https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/inspector/inspector_network_agent.cc;drc=da1f749634c9a401cc756f36c2e6ce233e1c9b4d;l=133
const MAX_TOTAL_COLLECTED_SIZE = 200_000_000;
/** Stores network and intercept maps. */
class NetworkStorage {
    #browsingContextStorage;
    #eventManager;
    #collectorsStorage;
    #logger;
    /**
     * A map from network request ID to Network Request objects.
     * Needed as long as information about requests comes from different events.
     */
    #requests = new Map();
    /** A map from intercept ID to track active network intercepts. */
    #intercepts = new Map();
    #defaultCacheBehavior = 'default';
    constructor(eventManager, browsingContextStorage, browserClient, logger) {
        this.#browsingContextStorage = browsingContextStorage;
        this.#eventManager = eventManager;
        this.#collectorsStorage = new CollectorsStorage(MAX_TOTAL_COLLECTED_SIZE, logger);
        browserClient.on('Target.detachedFromTarget', ({ sessionId }) => {
            this.disposeRequestMap(sessionId);
        });
        this.#logger = logger;
    }
    /**
     * Gets the network request with the given ID, if any.
     * Otherwise, creates a new network request with the given ID and cdp target.
     */
    #getOrCreateNetworkRequest(id, cdpTarget, redirectCount) {
        let request = this.getRequestById(id);
        if (redirectCount === undefined && request) {
            // Force re-creating requests for redirects.
            return request;
        }
        request = new NetworkRequest(id, this.#eventManager, this, cdpTarget, redirectCount, this.#logger);
        this.addRequest(request);
        return request;
    }
    onCdpTargetCreated(cdpTarget) {
        const cdpClient = cdpTarget.cdpClient;
        // TODO: Wrap into object
        const listeners = [
            [
                'Network.requestWillBeSent',
                (params) => {
                    const request = this.getRequestById(params.requestId);
                    request?.updateCdpTarget(cdpTarget);
                    if (request && request.isRedirecting()) {
                        request.handleRedirect(params);
                        this.disposeRequest(params.requestId);
                        this.#getOrCreateNetworkRequest(params.requestId, cdpTarget, request.redirectCount + 1).onRequestWillBeSentEvent(params);
                    }
                    else {
                        this.#getOrCreateNetworkRequest(params.requestId, cdpTarget).onRequestWillBeSentEvent(params);
                    }
                },
            ],
            [
                'Network.requestWillBeSentExtraInfo',
                (params) => {
                    const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
                    request.updateCdpTarget(cdpTarget);
                    request.onRequestWillBeSentExtraInfoEvent(params);
                },
            ],
            [
                'Network.responseReceived',
                (params) => {
                    const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
                    request.updateCdpTarget(cdpTarget);
                    request.onResponseReceivedEvent(params);
                },
            ],
            [
                'Network.responseReceivedExtraInfo',
                (params) => {
                    const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
                    request.updateCdpTarget(cdpTarget);
                    request.onResponseReceivedExtraInfoEvent(params);
                },
            ],
            [
                'Network.requestServedFromCache',
                (params) => {
                    const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
                    request.updateCdpTarget(cdpTarget);
                    request.onServedFromCache();
                },
            ],
            [
                'Fetch.requestPaused',
                (event) => {
                    const request = this.#getOrCreateNetworkRequest(
                    // CDP quirk if the Network domain is not present this is undefined
                    event.networkId ?? event.requestId, cdpTarget);
                    request.updateCdpTarget(cdpTarget);
                    request.onRequestPaused(event);
                },
            ],
            [
                'Fetch.authRequired',
                (event) => {
                    let request = this.getRequestByFetchId(event.requestId);
                    if (!request) {
                        request = this.#getOrCreateNetworkRequest(event.requestId, cdpTarget);
                    }
                    request.updateCdpTarget(cdpTarget);
                    request.onAuthRequired(event);
                },
            ],
            [
                'Network.dataReceived',
                (params) => {
                    const request = this.getRequestById(params.requestId);
                    request?.updateCdpTarget(cdpTarget);
                    request?.onDataReceivedEvent(params);
                },
            ],
            [
                'Network.loadingFailed',
                (params) => {
                    const request = this.#getOrCreateNetworkRequest(params.requestId, cdpTarget);
                    request.updateCdpTarget(cdpTarget);
                    request.onLoadingFailedEvent(params);
                },
            ],
            [
                'Network.loadingFinished',
                (params) => {
                    const request = this.getRequestById(params.requestId);
                    request?.updateCdpTarget(cdpTarget);
                    request?.onLoadingFinishedEvent(params);
                },
            ],
        ];
        for (const [event, listener] of listeners) {
            cdpClient.on(event, listener);
        }
    }
    async getCollectedData(params) {
        if (!this.#collectorsStorage.isCollected(params.request, params.dataType, params.collector)) {
            throw new NoSuchNetworkDataException(params.collector === undefined
                ? `No collected ${params.dataType} data`
                : `Collector ${params.collector} didn't collect ${params.dataType} data`);
        }
        if (params.disown && params.collector === undefined) {
            throw new InvalidArgumentException('Cannot disown collected data without collector ID');
        }
        const request = this.getRequestById(params.request);
        if (request === undefined) {
            throw new NoSuchNetworkDataException(`No data for ${params.request}`);
        }
        let result = undefined;
        switch (params.dataType) {
            case "response" /* Network.DataType.Response */:
                result = await this.#getCollectedResponseData(request);
                break;
            case "request" /* Network.DataType.Request */:
                result = await this.#getCollectedRequestData(request);
                break;
            default:
                throw new UnsupportedOperationException(`Unsupported data type ${params.dataType}`);
        }
        if (params.disown && params.collector !== undefined) {
            this.#collectorsStorage.disownData(request.id, params.dataType, params.collector);
            // `disposeRequest` disposes request only if no other collectors for it are left.
            this.disposeRequest(request.id);
        }
        return result;
    }
    async #getCollectedResponseData(request) {
        try {
            const responseBody = await request.cdpClient.sendCommand('Network.getResponseBody', { requestId: request.id });
            return {
                bytes: {
                    type: responseBody.base64Encoded ? 'base64' : 'string',
                    value: responseBody.body,
                },
            };
        }
        catch (error) {
            if (error.code === -32e3 /* CdpErrorConstants.GENERIC_ERROR */ &&
                error.message === 'No resource with given identifier found') {
                // The data has be gone for whatever reason.
                throw new NoSuchNetworkDataException(`Response data was disposed`);
            }
            if (error.code === -32001 /* CdpErrorConstants.CONNECTION_CLOSED */) {
                // The request's CDP session is gone. http://b/450771615.
                throw new NoSuchNetworkDataException(`Response data is disposed after the related page`);
            }
            throw error;
        }
    }
    async #getCollectedRequestData(request) {
        // TODO: handle CDP error in case of the renderer is gone.
        const requestPostData = await request.cdpClient.sendCommand('Network.getRequestPostData', { requestId: request.id });
        return {
            bytes: {
                type: 'string',
                value: requestPostData.postData,
            },
        };
    }
    collectIfNeeded(request, dataType) {
        this.#collectorsStorage.collectIfNeeded(request, dataType, request.cdpTarget.topLevelId, request.cdpTarget.userContext);
    }
    getInterceptionStages(browsingContextId) {
        const stages = {
            request: false,
            response: false,
            auth: false,
        };
        for (const intercept of this.#intercepts.values()) {
            if (intercept.contexts &&
                !intercept.contexts.includes(browsingContextId)) {
                continue;
            }
            stages.request ||= intercept.phases.includes("beforeRequestSent" /* Network.InterceptPhase.BeforeRequestSent */);
            stages.response ||= intercept.phases.includes("responseStarted" /* Network.InterceptPhase.ResponseStarted */);
            stages.auth ||= intercept.phases.includes("authRequired" /* Network.InterceptPhase.AuthRequired */);
        }
        return stages;
    }
    getInterceptsForPhase(request, phase) {
        if (request.url === NetworkRequest.unknownParameter) {
            return new Set();
        }
        const intercepts = new Set();
        for (const [interceptId, intercept] of this.#intercepts.entries()) {
            if (!intercept.phases.includes(phase) ||
                (intercept.contexts &&
                    !intercept.contexts.includes(request.cdpTarget.topLevelId))) {
                continue;
            }
            if (intercept.urlPatterns.length === 0) {
                intercepts.add(interceptId);
                continue;
            }
            for (const pattern of intercept.urlPatterns) {
                if (matchUrlPattern(pattern, request.url)) {
                    intercepts.add(interceptId);
                    break;
                }
            }
        }
        return intercepts;
    }
    disposeRequestMap(sessionId) {
        for (const request of this.#requests.values()) {
            if (request.cdpClient.sessionId === sessionId) {
                this.#requests.delete(request.id);
                request.dispose();
            }
        }
    }
    /**
     * Adds the given entry to the intercept map.
     * URL patterns are assumed to be parsed.
     *
     * @return The intercept ID.
     */
    addIntercept(value) {
        const interceptId = uuidv4();
        this.#intercepts.set(interceptId, value);
        return interceptId;
    }
    /**
     * Removes the given intercept from the intercept map.
     * Throws NoSuchInterceptException if the intercept does not exist.
     */
    removeIntercept(intercept) {
        if (!this.#intercepts.has(intercept)) {
            throw new NoSuchInterceptException(`Intercept '${intercept}' does not exist.`);
        }
        this.#intercepts.delete(intercept);
    }
    getRequestsByTarget(target) {
        const requests = [];
        for (const request of this.#requests.values()) {
            if (request.cdpTarget === target) {
                requests.push(request);
            }
        }
        return requests;
    }
    getRequestById(id) {
        return this.#requests.get(id);
    }
    getRequestByFetchId(fetchId) {
        for (const request of this.#requests.values()) {
            if (request.fetchId === fetchId) {
                return request;
            }
        }
        return;
    }
    addRequest(request) {
        this.#requests.set(request.id, request);
    }
    /**
     * Disposes the given request, if no collectors targeting it are left.
     */
    disposeRequest(id) {
        if (this.#collectorsStorage.isCollected(id)) {
            // Keep request, as it's data can be accessed later.
            return;
        }
        // TODO: dispose Network data from Chromium once there is a CDP command for that.
        this.#requests.delete(id);
    }
    /**
     * Gets the virtual navigation ID for the given navigable ID.
     */
    getNavigationId(contextId) {
        if (contextId === undefined) {
            return null;
        }
        return (this.#browsingContextStorage.findContext(contextId)?.navigationId ?? null);
    }
    set defaultCacheBehavior(behavior) {
        this.#defaultCacheBehavior = behavior;
    }
    get defaultCacheBehavior() {
        return this.#defaultCacheBehavior;
    }
    addDataCollector(params) {
        return this.#collectorsStorage.addDataCollector(params);
    }
    removeDataCollector(params) {
        const releasedRequests = this.#collectorsStorage.removeDataCollector(params.collector);
        releasedRequests.map((request) => this.disposeRequest(request));
    }
    disownData(params) {
        if (!this.#collectorsStorage.isCollected(params.request, params.dataType, params.collector)) {
            throw new NoSuchNetworkDataException(`Collector ${params.collector} didn't collect ${params.dataType} data`);
        }
        this.#collectorsStorage.disownData(params.request, params.dataType, params.collector);
        // `disposeRequest` disposes request only if no other collectors for it are left.
        this.disposeRequest(params.request);
    }
}

class CdpTarget {
    #id;
    userContext;
    #cdpClient;
    #browserCdpClient;
    #parentCdpClient;
    #realmStorage;
    #eventManager;
    #preloadScriptStorage;
    #browsingContextStorage;
    #networkStorage;
    contextConfigStorage;
    #unblocked = new Deferred();
    // Default user agent for the target. Required, as emulating client hints without user
    // agent is not possible. Cache it to avoid round trips to the browser for every target override.
    #defaultUserAgent;
    #logger;
    /**
     * Target's window id. Is filled when the CDP target is created and do not reflect
     * moving targets from one window to another. The actual values
     * will be set during `#unblock`.
     * */
    #windowId;
    #deviceAccessEnabled = false;
    #cacheDisableState = false;
    #preloadEnabled = false;
    #fetchDomainStages = {
        request: false,
        response: false,
        auth: false,
    };
    static create(targetId, cdpClient, browserCdpClient, parentCdpClient, realmStorage, eventManager, preloadScriptStorage, browsingContextStorage, networkStorage, configStorage, userContext, defaultUserAgent, logger) {
        const cdpTarget = new CdpTarget(targetId, cdpClient, browserCdpClient, parentCdpClient, eventManager, realmStorage, preloadScriptStorage, browsingContextStorage, configStorage, networkStorage, userContext, defaultUserAgent, logger);
        LogManager.create(cdpTarget, realmStorage, eventManager, logger);
        cdpTarget.#setEventListeners();
        // No need to await.
        // Deferred will be resolved when the target is unblocked.
        void cdpTarget.#unblock();
        return cdpTarget;
    }
    constructor(targetId, cdpClient, browserCdpClient, parentCdpClient, eventManager, realmStorage, preloadScriptStorage, browsingContextStorage, configStorage, networkStorage, userContext, defaultUserAgent, logger) {
        this.#defaultUserAgent = defaultUserAgent;
        this.userContext = userContext;
        this.#id = targetId;
        this.#cdpClient = cdpClient;
        this.#browserCdpClient = browserCdpClient;
        this.#parentCdpClient = parentCdpClient;
        this.#eventManager = eventManager;
        this.#realmStorage = realmStorage;
        this.#preloadScriptStorage = preloadScriptStorage;
        this.#networkStorage = networkStorage;
        this.#browsingContextStorage = browsingContextStorage;
        this.contextConfigStorage = configStorage;
        this.#logger = logger;
    }
    /** Returns a deferred that resolves when the target is unblocked. */
    get unblocked() {
        return this.#unblocked;
    }
    get id() {
        return this.#id;
    }
    get cdpClient() {
        return this.#cdpClient;
    }
    get parentCdpClient() {
        return this.#parentCdpClient;
    }
    get browserCdpClient() {
        return this.#browserCdpClient;
    }
    /** Needed for CDP escape path. */
    get cdpSessionId() {
        // SAFETY we got the client by it's id for creating
        return this.#cdpClient.sessionId;
    }
    /**
     * Window id the target belongs to. If not known, returns 0.
     */
    get windowId() {
        if (this.#windowId === undefined) {
            this.#logger?.(LogType.debugError, 'Getting windowId before it was set, returning 0');
        }
        return this.#windowId ?? 0;
    }
    /**
     * Enables all the required CDP domains and unblocks the target.
     */
    async #unblock() {
        const config = this.contextConfigStorage.getActiveConfig(this.topLevelId, this.userContext);
        const results = await Promise.allSettled([
            this.#cdpClient.sendCommand('Page.enable', {
                enableFileChooserOpenedEvent: true,
            }),
            ...(this.#ignoreFileDialog()
                ? []
                : [
                    this.#cdpClient.sendCommand('Page.setInterceptFileChooserDialog', {
                        enabled: true,
                        // The intercepted dialog should be canceled.
                        cancel: true,
                    }),
                ]),
            // There can be some existing frames in the target, if reconnecting to an
            // existing browser instance, e.g. via Puppeteer. Need to restore the browsing
            // contexts for the frames to correctly handle further events, like
            // `Runtime.executionContextCreated`.
            // It's important to schedule this task together with enabling domains commands to
            // prepare the tree before the events (e.g. Runtime.executionContextCreated) start
            // coming.
            // https://github.com/GoogleChromeLabs/chromium-bidi/issues/2282
            this.#cdpClient
                .sendCommand('Page.getFrameTree')
                .then((frameTree) => this.#restoreFrameTreeState(frameTree.frameTree)),
            this.#cdpClient.sendCommand('Runtime.enable'),
            this.#cdpClient.sendCommand('Page.setLifecycleEventsEnabled', {
                enabled: true,
            }),
            // Enabling CDP Network domain is required for navigation detection:
            // https://github.com/GoogleChromeLabs/chromium-bidi/issues/2856.
            this.#cdpClient
                .sendCommand('Network.enable', {
                // If `googDisableNetworkDurableMessages` flag is set, do not enable durable
                // messages.
                enableDurableMessages: config.disableNetworkDurableMessages !== true,
                maxTotalBufferSize: MAX_TOTAL_COLLECTED_SIZE,
            })
                .then(() => this.toggleNetworkIfNeeded()),
            this.#cdpClient.sendCommand('Target.setAutoAttach', {
                autoAttach: true,
                waitForDebuggerOnStart: true,
                flatten: true,
            }),
            this.#updateWindowId(),
            this.#setUserContextConfig(config),
            this.#initAndEvaluatePreloadScripts(),
            this.#cdpClient.sendCommand('Runtime.runIfWaitingForDebugger'),
            // Resume tab execution as well if it was paused by the debugger.
            this.#parentCdpClient.sendCommand('Runtime.runIfWaitingForDebugger'),
            this.toggleDeviceAccessIfNeeded(),
            this.togglePreloadIfNeeded(),
        ]);
        for (const result of results) {
            if (result instanceof Error) {
                // Ignore errors during configuring targets, just log them.
                this.#logger?.(LogType.debugError, 'Error happened when configuring a new target', result);
            }
        }
        this.#unblocked.resolve({
            kind: 'success',
            value: undefined,
        });
    }
    #restoreFrameTreeState(frameTree) {
        const frame = frameTree.frame;
        const maybeContext = this.#browsingContextStorage.findContext(frame.id);
        if (maybeContext !== undefined) {
            // Restoring parent of already known browsing context. This means the target is
            // OOPiF and the BiDi session was connected to already existing browser instance.
            if (maybeContext.parentId === null &&
                frame.parentId !== null &&
                frame.parentId !== undefined) {
                maybeContext.parentId = frame.parentId;
            }
        }
        if (maybeContext === undefined && frame.parentId !== undefined) {
            // Restore not yet known nested frames. The top-level frame is created when the
            // target is attached.
            const parentBrowsingContext = this.#browsingContextStorage.getContext(frame.parentId);
            BrowsingContextImpl.create(frame.id, frame.parentId, this.userContext, parentBrowsingContext.cdpTarget, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.contextConfigStorage, frame.url, undefined, this.#logger);
        }
        frameTree.childFrames?.map((frameTree) => this.#restoreFrameTreeState(frameTree));
    }
    async toggleFetchIfNeeded() {
        const stages = this.#networkStorage.getInterceptionStages(this.topLevelId);
        if (this.#fetchDomainStages.request === stages.request &&
            this.#fetchDomainStages.response === stages.response &&
            this.#fetchDomainStages.auth === stages.auth) {
            return;
        }
        const patterns = [];
        this.#fetchDomainStages = stages;
        if (stages.request || stages.auth) {
            // CDP quirk we need request interception when we intercept auth
            patterns.push({
                urlPattern: '*',
                requestStage: 'Request',
            });
        }
        if (stages.response) {
            patterns.push({
                urlPattern: '*',
                requestStage: 'Response',
            });
        }
        if (patterns.length) {
            await this.#cdpClient.sendCommand('Fetch.enable', {
                patterns,
                handleAuthRequests: stages.auth,
            });
        }
        else {
            const blockedRequest = this.#networkStorage
                .getRequestsByTarget(this)
                .filter((request) => request.interceptPhase);
            void Promise.allSettled(blockedRequest.map((request) => request.waitNextPhase))
                .then(async () => {
                const blockedRequest = this.#networkStorage
                    .getRequestsByTarget(this)
                    .filter((request) => request.interceptPhase);
                if (blockedRequest.length) {
                    return await this.toggleFetchIfNeeded();
                }
                return await this.#cdpClient.sendCommand('Fetch.disable');
            })
                .catch((error) => {
                this.#logger?.(LogType.bidi, 'Disable failed', error);
            });
        }
    }
    /**
     * Toggles CDP "Fetch" domain and enable/disable network cache.
     */
    async toggleNetworkIfNeeded() {
        // Although the Network domain remains active, Fetch domain activation and caching
        // settings should be managed dynamically.
        try {
            await Promise.all([
                this.toggleSetCacheDisabled(),
                this.toggleFetchIfNeeded(),
            ]);
        }
        catch (err) {
            this.#logger?.(LogType.debugError, err);
            if (!this.#isExpectedError(err)) {
                throw err;
            }
        }
    }
    async toggleSetCacheDisabled(disable) {
        const defaultCacheDisabled = this.#networkStorage.defaultCacheBehavior === 'bypass';
        const cacheDisabled = disable ?? defaultCacheDisabled;
        if (this.#cacheDisableState === cacheDisabled) {
            return;
        }
        this.#cacheDisableState = cacheDisabled;
        try {
            await this.#cdpClient.sendCommand('Network.setCacheDisabled', {
                cacheDisabled,
            });
        }
        catch (err) {
            this.#logger?.(LogType.debugError, err);
            this.#cacheDisableState = !cacheDisabled;
            if (!this.#isExpectedError(err)) {
                throw err;
            }
        }
    }
    async toggleDeviceAccessIfNeeded() {
        const enabled = this.isSubscribedTo(Bluetooth.EventNames.RequestDevicePromptUpdated);
        if (this.#deviceAccessEnabled === enabled) {
            return;
        }
        this.#deviceAccessEnabled = enabled;
        try {
            await this.#cdpClient.sendCommand(enabled ? 'DeviceAccess.enable' : 'DeviceAccess.disable');
        }
        catch (err) {
            this.#logger?.(LogType.debugError, err);
            this.#deviceAccessEnabled = !enabled;
            if (!this.#isExpectedError(err)) {
                throw err;
            }
        }
    }
    async togglePreloadIfNeeded() {
        const enabled = this.isSubscribedTo(Speculation.EventNames.PrefetchStatusUpdated);
        if (this.#preloadEnabled === enabled) {
            return;
        }
        this.#preloadEnabled = enabled;
        try {
            await this.#cdpClient.sendCommand(enabled ? 'Preload.enable' : 'Preload.disable');
        }
        catch (err) {
            this.#logger?.(LogType.debugError, err);
            this.#preloadEnabled = !enabled;
            if (!this.#isExpectedError(err)) {
                throw err;
            }
        }
    }
    /**
     * Heuristic checking if the error is due to the session being closed. If so, ignore the
     * error.
     */
    #isExpectedError(err) {
        const error = err;
        return ((error.code === -32001 &&
            error.message === 'Session with given id not found.') ||
            this.#cdpClient.isCloseError(err));
    }
    #setEventListeners() {
        this.#cdpClient.on('*', (event, params) => {
            // We may encounter uses for EventEmitter other than CDP events,
            // which we want to skip.
            if (typeof event !== 'string') {
                return;
            }
            this.#eventManager.registerEvent({
                type: 'event',
                method: `goog:cdp.${event}`,
                params: {
                    event,
                    params,
                    session: this.cdpSessionId,
                },
            }, this.id);
        });
    }
    async #enableFetch(stages) {
        const patterns = [];
        if (stages.request || stages.auth) {
            // CDP quirk we need request interception when we intercept auth
            patterns.push({
                urlPattern: '*',
                requestStage: 'Request',
            });
        }
        if (stages.response) {
            patterns.push({
                urlPattern: '*',
                requestStage: 'Response',
            });
        }
        if (patterns.length) {
            const oldStages = this.#fetchDomainStages;
            this.#fetchDomainStages = stages;
            try {
                await this.#cdpClient.sendCommand('Fetch.enable', {
                    patterns,
                    handleAuthRequests: stages.auth,
                });
            }
            catch {
                this.#fetchDomainStages = oldStages;
            }
        }
    }
    async #disableFetch() {
        const blockedRequest = this.#networkStorage
            .getRequestsByTarget(this)
            .filter((request) => request.interceptPhase);
        if (blockedRequest.length === 0) {
            this.#fetchDomainStages = {
                request: false,
                response: false,
                auth: false,
            };
            await this.#cdpClient.sendCommand('Fetch.disable');
        }
    }
    async toggleNetwork() {
        // TODO: respect the data collectors once CDP Network domain is enabled on-demand:
        // const networkEnable = this.#networkStorage.getCollectorsForBrowsingContext(this.topLevelId).length > 0;
        const stages = this.#networkStorage.getInterceptionStages(this.topLevelId);
        const fetchEnable = Object.values(stages).some((value) => value);
        const fetchChanged = this.#fetchDomainStages.request !== stages.request ||
            this.#fetchDomainStages.response !== stages.response ||
            this.#fetchDomainStages.auth !== stages.auth;
        this.#logger?.(LogType.debugInfo, 'Toggle Network', `Fetch (${fetchEnable}) ${fetchChanged}`);
        if (fetchEnable && fetchChanged) {
            await this.#enableFetch(stages);
        }
        if (!fetchEnable && fetchChanged) {
            await this.#disableFetch();
        }
    }
    /**
     * All the ProxyChannels from all the preload scripts of the given
     * BrowsingContext.
     */
    getChannels() {
        return this.#preloadScriptStorage
            .find()
            .flatMap((script) => script.channels);
    }
    async #updateWindowId() {
        const { windowId } = await this.#browserCdpClient.sendCommand('Browser.getWindowForTarget', { targetId: this.id });
        this.#windowId = windowId;
    }
    /** Loads all top-level preload scripts. */
    async #initAndEvaluatePreloadScripts() {
        await Promise.all(this.#preloadScriptStorage
            .find({
            // Needed for OOPIF
            targetId: this.topLevelId,
        })
            .map((script) => {
            return script.initInTarget(this, true);
        }));
    }
    async setDeviceMetricsOverride(viewport, devicePixelRatio, screenOrientation, screenArea, scrollbarType = null) {
        if (viewport === null &&
            devicePixelRatio === null &&
            screenOrientation === null &&
            screenArea === null &&
            scrollbarType === null) {
            await this.cdpClient.sendCommand('Emulation.clearDeviceMetricsOverride');
            return;
        }
        const metricsOverride = {
            width: viewport?.width ?? 0,
            height: viewport?.height ?? 0,
            deviceScaleFactor: devicePixelRatio ?? 0,
            screenOrientation: this.#toCdpScreenOrientationAngle(screenOrientation) ?? undefined,
            mobile: false,
            screenWidth: screenArea?.width,
            screenHeight: screenArea?.height,
            scrollbarType: scrollbarType === 'overlay' ? 'overlay' : 'default',
        };
        await this.cdpClient.sendCommand('Emulation.setDeviceMetricsOverride', metricsOverride);
    }
    /**
     * Immediately schedules all the required commands to configure user context
     * configuration and waits for them to finish. It's important to schedule them
     * in parallel, so that they are enqueued before any page's scripts.
     */
    async #setUserContextConfig(config) {
        const promises = [];
        promises.push(this.#cdpClient
            .sendCommand('Page.setPrerenderingAllowed', {
            isAllowed: !config.prerenderingDisabled,
        })
            .catch(() => {
            // Ignore CDP errors, as the command is not supported by iframe targets or
            // prerendered pages. Generic catch, as the error can vary between CdpClient
            // implementations: Tab vs Puppeteer.
        }));
        if (config.viewport !== undefined ||
            config.devicePixelRatio !== undefined ||
            config.screenOrientation !== undefined ||
            config.screenArea !== undefined) {
            promises.push(this.setDeviceMetricsOverride(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null, config.screenArea ?? null, config.scrollbarType ?? null).catch(() => {
                // Ignore CDP errors, as the command is not supported by iframe targets. Generic
                // catch, as the error can vary between CdpClient implementations: Tab vs
                // Puppeteer.
            }));
        }
        if (config.geolocation !== undefined && config.geolocation !== null) {
            promises.push(this.setGeolocationOverride(config.geolocation));
        }
        if (config.locale !== undefined) {
            promises.push(this.setLocaleOverride(config.locale));
        }
        if (config.timezone !== undefined) {
            promises.push(this.setTimezoneOverride(config.timezone));
        }
        if (config.extraHeaders !== undefined) {
            promises.push(this.setExtraHeaders(config.extraHeaders));
        }
        if (config.userAgent !== undefined ||
            config.locale !== undefined ||
            config.clientHints !== undefined) {
            promises.push(this.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints));
        }
        if (config.scriptingEnabled !== undefined) {
            promises.push(this.setScriptingEnabled(config.scriptingEnabled));
        }
        if (config.acceptInsecureCerts !== undefined) {
            promises.push(this.cdpClient.sendCommand('Security.setIgnoreCertificateErrors', {
                ignore: config.acceptInsecureCerts,
            }));
        }
        if (config.emulatedNetworkConditions !== undefined) {
            promises.push(this.setEmulatedNetworkConditions(config.emulatedNetworkConditions));
        }
        if (config.maxTouchPoints !== undefined) {
            promises.push(this.setTouchOverride(config.maxTouchPoints));
        }
        await Promise.all(promises);
    }
    get topLevelId() {
        return (this.#browsingContextStorage.findTopLevelContextId(this.id) ?? this.id);
    }
    isSubscribedTo(moduleOrEvent) {
        return this.#eventManager.subscriptionManager.isSubscribedTo(moduleOrEvent, this.topLevelId);
    }
    #ignoreFileDialog() {
        const config = this.contextConfigStorage.getActiveConfig(this.topLevelId, this.userContext);
        return ((config.userPromptHandler?.file ??
            config.userPromptHandler?.default ??
            "ignore" /* Session.UserPromptHandlerType.Ignore */) ===
            "ignore" /* Session.UserPromptHandlerType.Ignore */);
    }
    async setGeolocationOverride(geolocation) {
        if (geolocation === null) {
            await this.cdpClient.sendCommand('Emulation.clearGeolocationOverride');
        }
        else if ('type' in geolocation) {
            if (geolocation.type !== 'positionUnavailable') {
                // Unreachable. Handled by params parser.
                throw new UnknownErrorException(`Unknown geolocation error ${geolocation.type}`);
            }
            // Omitting latitude, longitude or accuracy emulates position unavailable.
            await this.cdpClient.sendCommand('Emulation.setGeolocationOverride', {});
        }
        else if ('latitude' in geolocation) {
            await this.cdpClient.sendCommand('Emulation.setGeolocationOverride', {
                latitude: geolocation.latitude,
                longitude: geolocation.longitude,
                accuracy: geolocation.accuracy ?? 1,
                // `null` value is treated as "missing".
                altitude: geolocation.altitude ?? undefined,
                altitudeAccuracy: geolocation.altitudeAccuracy ?? undefined,
                heading: geolocation.heading ?? undefined,
                speed: geolocation.speed ?? undefined,
            });
        }
        else {
            // Unreachable. Handled by params parser.
            throw new UnknownErrorException('Unexpected geolocation coordinates value');
        }
    }
    async setTouchOverride(maxTouchPoints) {
        const touchEmulationParams = {
            enabled: maxTouchPoints !== null,
        };
        if (maxTouchPoints !== null) {
            touchEmulationParams.maxTouchPoints = maxTouchPoints;
        }
        await this.cdpClient.sendCommand('Emulation.setTouchEmulationEnabled', touchEmulationParams);
    }
    #toCdpScreenOrientationAngle(orientation) {
        if (orientation === null) {
            return null;
        }
        // https://w3c.github.io/screen-orientation/#the-current-screen-orientation-type-and-angle
        if (orientation.natural === "portrait" /* Emulation.ScreenOrientationNatural.Portrait */) {
            switch (orientation.type) {
                case 'portrait-primary':
                    return {
                        angle: 0,
                        type: 'portraitPrimary',
                    };
                case 'landscape-primary':
                    return {
                        angle: 90,
                        type: 'landscapePrimary',
                    };
                case 'portrait-secondary':
                    return {
                        angle: 180,
                        type: 'portraitSecondary',
                    };
                case 'landscape-secondary':
                    return {
                        angle: 270,
                        type: 'landscapeSecondary',
                    };
                default:
                    // Unreachable.
                    throw new UnknownErrorException(`Unexpected screen orientation type ${orientation.type}`);
            }
        }
        if (orientation.natural === "landscape" /* Emulation.ScreenOrientationNatural.Landscape */) {
            switch (orientation.type) {
                case 'landscape-primary':
                    return {
                        angle: 0,
                        type: 'landscapePrimary',
                    };
                case 'portrait-primary':
                    return {
                        angle: 90,
                        type: 'portraitPrimary',
                    };
                case 'landscape-secondary':
                    return {
                        angle: 180,
                        type: 'landscapeSecondary',
                    };
                case 'portrait-secondary':
                    return {
                        angle: 270,
                        type: 'portraitSecondary',
                    };
                default:
                    // Unreachable.
                    throw new UnknownErrorException(`Unexpected screen orientation type ${orientation.type}`);
            }
        }
        // Unreachable.
        throw new UnknownErrorException(`Unexpected orientation natural ${orientation.natural}`);
    }
    async setLocaleOverride(locale) {
        if (locale === null) {
            await this.cdpClient.sendCommand('Emulation.setLocaleOverride', {});
        }
        else {
            await this.cdpClient.sendCommand('Emulation.setLocaleOverride', {
                locale,
            });
        }
    }
    async setScriptingEnabled(scriptingEnabled) {
        await this.cdpClient.sendCommand('Emulation.setScriptExecutionDisabled', {
            value: scriptingEnabled === false,
        });
    }
    async setTimezoneOverride(timezone) {
        if (timezone === null) {
            await this.cdpClient.sendCommand('Emulation.setTimezoneOverride', {
                // If empty, disables the override and restores default host system timezone.
                timezoneId: '',
            });
        }
        else {
            await this.cdpClient.sendCommand('Emulation.setTimezoneOverride', {
                timezoneId: timezone,
            });
        }
    }
    async setExtraHeaders(headers) {
        await this.cdpClient.sendCommand('Network.setExtraHTTPHeaders', {
            headers,
        });
    }
    async setUserAgentAndAcceptLanguage(userAgent, acceptLanguage, clientHints) {
        const userAgentMetadata = clientHints
            ? {
                brands: clientHints.brands?.map((b) => ({
                    brand: b.brand,
                    version: b.version,
                })),
                fullVersionList: clientHints.fullVersionList,
                platform: clientHints.platform ?? '',
                platformVersion: clientHints.platformVersion ?? '',
                architecture: clientHints.architecture ?? '',
                model: clientHints.model ?? '',
                mobile: clientHints.mobile ?? false,
                bitness: clientHints.bitness ?? undefined,
                wow64: clientHints.wow64 ?? undefined,
                formFactors: clientHints.formFactors ?? undefined,
            }
            : undefined;
        await this.cdpClient.sendCommand('Emulation.setUserAgentOverride', {
            // `userAgent` is required if `userAgentMetadata` is provided.
            userAgent: userAgent || (userAgentMetadata ? this.#defaultUserAgent : ''),
            acceptLanguage: acceptLanguage ?? undefined,
            // We need to provide the platform to enable platform emulation.
            // Note that the value might be different from the one expected by the
            // legacy `navigator.platform` (e.g. `Win32` vs `Windows`).
            // https://github.com/w3c/webdriver-bidi/issues/1065
            platform: clientHints?.platform ?? undefined,
            userAgentMetadata,
        });
    }
    async setEmulatedNetworkConditions(networkConditions) {
        if (networkConditions !== null && networkConditions.type !== 'offline') {
            throw new UnsupportedOperationException(`Unsupported network conditions ${networkConditions.type}`);
        }
        await Promise.all([
            this.cdpClient.sendCommand('Network.emulateNetworkConditionsByRule', {
                offline: networkConditions?.type === 'offline',
                matchedNetworkConditions: [
                    {
                        urlPattern: '',
                        latency: 0,
                        downloadThroughput: -1,
                        uploadThroughput: -1,
                    },
                ],
            }),
            this.cdpClient.sendCommand('Network.overrideNetworkState', {
                offline: networkConditions?.type === 'offline',
                // TODO: restore the original `latency` value when emulation is removed.
                latency: 0,
                downloadThroughput: -1,
                uploadThroughput: -1,
            }),
        ]);
    }
}

export { CdpTarget as C, NetworkStorage as N, WorkerRealm as W };
