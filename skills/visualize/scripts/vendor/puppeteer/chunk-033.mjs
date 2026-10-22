// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { E as EventEmitter, g as Deferred, C as CDPSessionEvent, b as debugError, r as Browser, s as DEFAULT_VIEWPORT } from './chunk-017.mjs';
import { c as createIncrementalIdGenerator } from './chunk-022.mjs';
import { a as CdpBrowserContext } from './chunk-031.mjs';
import { I as InitializationStatus, Y, O as OtherTarget, D as DevToolsTarget, P as PageTarget, W as WorkerTarget, C as CdpExtension } from './chunk-032.mjs';
import { a as assert } from './chunk-015.mjs';
import { a as CdpCDPSession, c as Connection } from './chunk-025.mjs';
import './chunk-024.mjs';
import './chunk-016.mjs';
import './chunk-020.mjs';
import './chunk-021.mjs';
import './chunk-018.mjs';
import './chunk-023.mjs';
import './chunk-027.mjs';
import './chunk-026.mjs';
import './chunk-028.mjs';

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function isPageTargetBecomingPrimary(target, newTargetInfo) {
    return Boolean(target._subtype()) && !newTargetInfo.subtype;
}
/**
 * TargetManager encapsulates all interactions with CDP targets and is
 * responsible for coordinating the configuration of targets with the rest of
 * Puppeteer. Code outside of this class should not subscribe `Target.*` events
 * and only use the TargetManager events.
 *
 * TargetManager uses the CDP's auto-attach mechanism to intercept
 * new targets and allow the rest of Puppeteer to configure listeners while
 * the target is paused.
 *
 * @internal
 */
class TargetManager extends EventEmitter {
    #connection;
    /**
     * Keeps track of the following events: 'Target.targetCreated',
     * 'Target.targetDestroyed', 'Target.targetInfoChanged'.
     *
     * A target becomes discovered when 'Target.targetCreated' is received.
     * A target is removed from this map once 'Target.targetDestroyed' is
     * received.
     *
     * `targetFilterCallback` has no effect on this map.
     */
    #discoveredTargetsByTargetId = new Map();
    /**
     * A target is added to this map once TargetManager has created
     * a Target and attached at least once to it.
     */
    #attachedTargetsByTargetId = new Map();
    /**
     * Tracks which sessions attach to which target.
     */
    #attachedTargetsBySessionId = new Map();
    /**
     * If a target was filtered out by `targetFilterCallback`, we still receive
     * events about it from CDP, but we don't forward them to the rest of Puppeteer.
     */
    #ignoredTargets = new Set();
    #targetFilterCallback;
    #targetFactory;
    #attachedToTargetListenersBySession = new WeakMap();
    #detachedFromTargetListenersBySession = new WeakMap();
    #initializeDeferred = Deferred.create();
    #waitForInitiallyDiscoveredTargets = true;
    #discoveryFilter = [{}];
    // IDs of tab targets detected while running the initial Target.setAutoAttach
    // request. These are the targets whose initialization we want to await for
    // before resolving puppeteer.connect() or launch() to avoid flakiness.
    // Whenever a sub-target whose parent is a tab target is attached, we remove
    // the tab target from this list. Once the list is empty, we resolve the
    // initializeDeferred.
    #targetsIdsForInit = new Set();
    // This is false until the connection-level Target.setAutoAttach request is
    // done. It indicates whethere we are running the initial auto-attach step or
    // if we are handling targets after that.
    #initialAttachDone = false;
    #blocklist = [];
    #allowlist = [];
    constructor(connection, targetFactory, targetFilterCallback, waitForInitiallyDiscoveredTargets = true, blocklist, allowlist) {
        super();
        if (blocklist && allowlist) {
            throw new Error('Cannot specify both blockList and allowList');
        }
        this.#connection = connection;
        this.#targetFilterCallback = targetFilterCallback;
        this.#targetFactory = targetFactory;
        this.#waitForInitiallyDiscoveredTargets = waitForInitiallyDiscoveredTargets;
        this.#blocklist = this.#mapPatterns(blocklist);
        this.#allowlist = this.#mapPatterns(allowlist);
        this.#connection.on('Target.targetCreated', this.#onTargetCreated);
        this.#connection.on('Target.targetDestroyed', this.#onTargetDestroyed);
        this.#connection.on('Target.targetInfoChanged', this.#onTargetInfoChanged);
        this.#connection.on(CDPSessionEvent.SessionDetached, this.#onSessionDetached);
        this.#setupAttachmentListeners(this.#connection);
    }
    async initialize() {
        await this.#connection.send('Target.setDiscoverTargets', {
            discover: true,
            filter: this.#discoveryFilter,
        });
        await this.#connection.send('Target.setAutoAttach', {
            waitForDebuggerOnStart: true,
            flatten: true,
            autoAttach: true,
            filter: [
                {
                    type: 'page',
                    exclude: true,
                },
                ...this.#discoveryFilter,
            ],
        });
        this.#initialAttachDone = true;
        this.#finishInitializationIfReady();
        await this.#initializeDeferred.valueOrThrow();
    }
    addToIgnoreTarget(targetId) {
        this.#ignoredTargets.add(targetId);
    }
    getChildTargets(target) {
        return target._childTargets();
    }
    dispose() {
        this.#connection.off('Target.targetCreated', this.#onTargetCreated);
        this.#connection.off('Target.targetDestroyed', this.#onTargetDestroyed);
        this.#connection.off('Target.targetInfoChanged', this.#onTargetInfoChanged);
        this.#connection.off(CDPSessionEvent.SessionDetached, this.#onSessionDetached);
        this.#removeAttachmentListeners(this.#connection);
    }
    getAvailableTargets() {
        return this.#attachedTargetsByTargetId;
    }
    getDiscoveredTargetInfos() {
        return this.#discoveredTargetsByTargetId;
    }
    #setupAttachmentListeners(session) {
        const listener = (event) => {
            void this.#onAttachedToTarget(session, event);
        };
        assert(!this.#attachedToTargetListenersBySession.has(session));
        this.#attachedToTargetListenersBySession.set(session, listener);
        session.on('Target.attachedToTarget', listener);
        const detachedListener = (event) => {
            return this.#onDetachedFromTarget(session, event);
        };
        assert(!this.#detachedFromTargetListenersBySession.has(session));
        this.#detachedFromTargetListenersBySession.set(session, detachedListener);
        session.on('Target.detachedFromTarget', detachedListener);
    }
    #removeAttachmentListeners(session) {
        const listener = this.#attachedToTargetListenersBySession.get(session);
        if (listener) {
            session.off('Target.attachedToTarget', listener);
            this.#attachedToTargetListenersBySession.delete(session);
        }
        const detachedListener = this.#detachedFromTargetListenersBySession.get(session);
        if (detachedListener) {
            session.off('Target.detachedFromTarget', detachedListener);
            this.#detachedFromTargetListenersBySession.delete(session);
        }
    }
    #silentDetach = async (session, parentSession) => {
        await session.send('Runtime.runIfWaitingForDebugger').catch(debugError);
        // We don't use `session.detach()` because that dispatches all commands on
        // the connection instead of the parent session.
        await parentSession
            .send('Target.detachFromTarget', {
            sessionId: session.id(),
        })
            .catch(debugError);
    };
    #getParentTarget = (parentSession) => {
        return parentSession instanceof CdpCDPSession
            ? parentSession.target()
            : null;
    };
    #onSessionDetached = (session) => {
        this.#removeAttachmentListeners(session);
    };
    #onTargetCreated = async (event) => {
        this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
        this.emit("targetDiscovered" /* TargetManagerEvent.TargetDiscovered */, event.targetInfo);
        // The connection is already attached to the browser target implicitly,
        // therefore, no new CDPSession is created and we have special handling
        // here.
        if (event.targetInfo.type === 'browser' && event.targetInfo.attached) {
            if (this.#attachedTargetsByTargetId.has(event.targetInfo.targetId)) {
                return;
            }
            const target = this.#targetFactory(event.targetInfo, undefined);
            target._initialize();
            this.#attachedTargetsByTargetId.set(event.targetInfo.targetId, target);
        }
    };
    #onTargetDestroyed = (event) => {
        const targetInfo = this.#discoveredTargetsByTargetId.get(event.targetId);
        this.#discoveredTargetsByTargetId.delete(event.targetId);
        this.#finishInitializationIfReady(event.targetId);
        if (targetInfo?.type === 'service_worker') {
            // Special case for service workers: report TargetGone event when
            // the worker is destroyed.
            const target = this.#attachedTargetsByTargetId.get(event.targetId);
            if (target) {
                this.emit("targetGone" /* TargetManagerEvent.TargetGone */, target);
                this.#attachedTargetsByTargetId.delete(event.targetId);
            }
        }
    };
    #onTargetInfoChanged = (event) => {
        this.#discoveredTargetsByTargetId.set(event.targetInfo.targetId, event.targetInfo);
        if (this.#ignoredTargets.has(event.targetInfo.targetId) ||
            !event.targetInfo.attached) {
            return;
        }
        const target = this.#attachedTargetsByTargetId.get(event.targetInfo.targetId);
        if (!target) {
            return;
        }
        const previousURL = target.url();
        const wasInitialized = target._initializedDeferred.value() === InitializationStatus.SUCCESS;
        if (isPageTargetBecomingPrimary(target, event.targetInfo)) {
            const session = target._session();
            assert(session, 'Target that is being activated is missing a CDPSession.');
            session.parentSession()?.emit(CDPSessionEvent.Swapped, session);
        }
        target._targetInfoChanged(event.targetInfo);
        if (wasInitialized && previousURL !== target.url()) {
            this.emit("targetChanged" /* TargetManagerEvent.TargetChanged */, {
                target,
                wasInitialized,
                previousURL,
            });
        }
    };
    #onAttachedToTarget = async (parentSession, event) => {
        const targetInfo = event.targetInfo;
        const session = this.#connection._session(event.sessionId);
        if (!session) {
            throw new Error(`Session ${event.sessionId} was not created.`);
        }
        if (!this.#connection.isAutoAttached(targetInfo.targetId)) {
            return;
        }
        // If we connect to a browser that is already open,
        // immediately detach from any tab that is on the blocklist.
        if (!this.#initialAttachDone && !this.isUrlAllowed(targetInfo.url)) {
            await this.#silentDetach(session, parentSession);
            return;
        }
        // Special case for service workers: being attached to service workers will
        // prevent them from ever being destroyed. Therefore, we silently detach
        // from service workers unless the connection was manually created via
        // `page.worker()`. To determine this, we use
        // `this.#connection.isAutoAttached(targetInfo.targetId)`. In the future, we
        // should determine if a target is auto-attached or not with the help of
        // CDP.
        if (targetInfo.type === 'service_worker') {
            await this.#silentDetach(session, parentSession);
            if (this.#attachedTargetsByTargetId.has(targetInfo.targetId) ||
                this.#ignoredTargets.has(targetInfo.targetId) ||
                !this.#discoveredTargetsByTargetId.has(targetInfo.targetId)) {
                return;
            }
            const target = this.#targetFactory(targetInfo);
            target._initialize();
            this.#attachedTargetsByTargetId.set(targetInfo.targetId, target);
            this.emit("targetAvailable" /* TargetManagerEvent.TargetAvailable */, target);
            return;
        }
        let target = this.#attachedTargetsByTargetId.get(targetInfo.targetId);
        const isExistingTarget = target !== undefined;
        if (!target) {
            target = this.#targetFactory(targetInfo, session, parentSession instanceof CdpCDPSession ? parentSession : undefined);
        }
        const parentTarget = this.#getParentTarget(parentSession);
        if (this.#targetFilterCallback && !this.#targetFilterCallback(target)) {
            this.#ignoredTargets.add(targetInfo.targetId);
            if (parentTarget?.type() === 'tab') {
                this.#finishInitializationIfReady(parentTarget._targetId);
            }
            await this.#silentDetach(session, parentSession);
            return;
        }
        if (this.#waitForInitiallyDiscoveredTargets &&
            event.targetInfo.type === 'tab' &&
            !this.#initialAttachDone) {
            this.#targetsIdsForInit.add(event.targetInfo.targetId);
        }
        this.#setupAttachmentListeners(session);
        if (isExistingTarget) {
            session.setTarget(target);
            this.#attachedTargetsBySessionId.set(session.id(), target);
        }
        else {
            target._initialize();
            this.#attachedTargetsByTargetId.set(targetInfo.targetId, target);
            this.#attachedTargetsBySessionId.set(session.id(), target);
        }
        parentTarget?._addChildTarget(target);
        parentSession.emit(CDPSessionEvent.Ready, session);
        if (!isExistingTarget) {
            this.emit("targetAvailable" /* TargetManagerEvent.TargetAvailable */, target);
        }
        if (parentTarget?.type() === 'tab') {
            this.#finishInitializationIfReady(parentTarget._targetId);
        }
        // TODO: the browser might be shutting down here. What do we do with the
        // error?
        await Promise.all([
            session.send('Target.setAutoAttach', {
                waitForDebuggerOnStart: true,
                flatten: true,
                autoAttach: true,
                filter: this.#discoveryFilter,
            }),
            this.#maybeSetupNetworkConditions(session),
            session.send('Runtime.runIfWaitingForDebugger'),
        ]).catch(debugError);
    };
    #finishInitializationIfReady(targetId) {
        if (targetId !== undefined) {
            this.#targetsIdsForInit.delete(targetId);
        }
        // If we are still initializing it might be that we have not learned about
        // some targets yet.
        if (!this.#initialAttachDone) {
            return;
        }
        if (this.#targetsIdsForInit.size === 0) {
            this.#initializeDeferred.resolve();
        }
    }
    #onDetachedFromTarget = (parentSession, event) => {
        const target = this.#attachedTargetsBySessionId.get(event.sessionId);
        this.#attachedTargetsBySessionId.delete(event.sessionId);
        if (!target) {
            return;
        }
        if (parentSession instanceof CdpCDPSession) {
            parentSession.target()._removeChildTarget(target);
        }
        this.#attachedTargetsByTargetId.delete(target._targetId);
        this.emit("targetGone" /* TargetManagerEvent.TargetGone */, target);
    };
    /**
     * Helper to validate URL against blocklist patterns
     */
    isUrlAllowed = (url) => {
        if (this.#blocklist.length === 0 && this.#allowlist.length === 0) {
            return true;
        }
        // Always allow internal or setup pages
        if (!url || url === 'about:blank') {
            return true;
        }
        for (const item of this.#blocklist) {
            if (item.pattern.test(url)) {
                return false;
            }
        }
        if (this.#allowlist.length > 0) {
            for (const item of this.#allowlist) {
                if (item.pattern.test(url)) {
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    #mapPatterns(rules) {
        const result = [];
        for (const rule of rules ?? []) {
            result.push({ pattern: new Y(rule), rule });
        }
        return result;
    }
    #maybeSetupNetworkConditions = async (session) => {
        if (this.#blocklist.length === 0 && this.#allowlist.length === 0) {
            return;
        }
        const matchedNetworkConditions = [];
        for (const item of this.#blocklist) {
            matchedNetworkConditions.push({
                urlPattern: item.rule,
                offline: true,
                latency: 0,
                downloadThroughput: -1,
                uploadThroughput: -1,
            });
        }
        if (this.#allowlist.length > 0) {
            for (const item of this.#allowlist) {
                matchedNetworkConditions.push({
                    urlPattern: item.rule,
                    offline: false,
                    latency: 0,
                    downloadThroughput: -1,
                    uploadThroughput: -1,
                });
            }
            matchedNetworkConditions.push({
                urlPattern: '',
                offline: true,
                latency: 0,
                downloadThroughput: -1,
                uploadThroughput: -1,
            });
        }
        await session.send('Network.emulateNetworkConditionsByRule', {
            // @ts-expect-error offline cannot be undefined before M149.
            offline: this.#blocklist.length > 0 ? true : undefined,
            matchedNetworkConditions,
        });
    };
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
function isDevToolsPageTarget(url) {
    return url.startsWith('devtools://devtools/bundled/devtools_app.html');
}
/**
 * @internal
 */
class CdpBrowser extends Browser {
    protocol = 'cdp';
    static async _create(connection, contextIds, acceptInsecureCerts, defaultViewport, downloadBehavior, process, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets = true, networkEnabled = true, issuesEnabled = true, handleDevToolsAsPage = false, blocklist, allowlist) {
        const browser = new CdpBrowser(connection, contextIds, defaultViewport, process, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets, networkEnabled, issuesEnabled, handleDevToolsAsPage, blocklist, allowlist);
        if (allowlist) {
            const version = await browser.#getVersion();
            const majorVersion = parseInt(version.product.match(/\d+/)?.[0] ?? '0', 10);
            if (majorVersion < 149) {
                throw new Error('The allowlist option require Chrome 149 or greater.');
            }
        }
        if (acceptInsecureCerts) {
            await connection.send('Security.setIgnoreCertificateErrors', {
                ignore: true,
            });
        }
        await browser._attach(downloadBehavior);
        return browser;
    }
    #defaultViewport;
    #process;
    #connection;
    #closeCallback;
    #targetFilterCallback;
    #isPageTargetCallback;
    #defaultContext;
    #contexts = new Map();
    #networkEnabled = true;
    #issuesEnabled = true;
    #targetManager;
    #handleDevToolsAsPage = false;
    #extensions = new Map();
    constructor(connection, contextIds, defaultViewport, process, closeCallback, targetFilterCallback, isPageTargetCallback, waitForInitiallyDiscoveredTargets = true, networkEnabled = true, issuesEnabled = true, handleDevToolsAsPage = false, blocklist, allowlist) {
        super();
        this.#networkEnabled = networkEnabled;
        this.#issuesEnabled = issuesEnabled;
        this.#defaultViewport = defaultViewport;
        this.#process = process;
        this.#connection = connection;
        this.#closeCallback = closeCallback || (() => { });
        this.#targetFilterCallback =
            targetFilterCallback ||
                (() => {
                    return true;
                });
        this.#handleDevToolsAsPage = handleDevToolsAsPage;
        this.#setIsPageTargetCallback(isPageTargetCallback);
        connection.rejectEmulateNetworkConditionsCalls = Boolean((blocklist && blocklist.length > 0) ||
            (allowlist && allowlist.length > 0));
        this.#targetManager = new TargetManager(connection, this.#createTarget, this.#targetFilterCallback, waitForInitiallyDiscoveredTargets, blocklist, allowlist);
        this.#defaultContext = new CdpBrowserContext(this.#connection, this);
        for (const contextId of contextIds) {
            this.#contexts.set(contextId, new CdpBrowserContext(this.#connection, this, contextId));
        }
    }
    #emitDisconnected = () => {
        this.emit("disconnected" /* BrowserEvent.Disconnected */, undefined);
    };
    async _attach(downloadBehavior) {
        this.#connection.on(CDPSessionEvent.Disconnected, this.#emitDisconnected);
        if (downloadBehavior) {
            await this.#defaultContext.setDownloadBehavior(downloadBehavior);
        }
        this.#targetManager.on("targetAvailable" /* TargetManagerEvent.TargetAvailable */, this.#onAttachedToTarget);
        this.#targetManager.on("targetGone" /* TargetManagerEvent.TargetGone */, this.#onDetachedFromTarget);
        this.#targetManager.on("targetChanged" /* TargetManagerEvent.TargetChanged */, this.#onTargetChanged);
        this.#targetManager.on("targetDiscovered" /* TargetManagerEvent.TargetDiscovered */, this.#onTargetDiscovered);
        await this.#targetManager.initialize();
    }
    _detach() {
        this.#connection.off(CDPSessionEvent.Disconnected, this.#emitDisconnected);
        this.#targetManager.off("targetAvailable" /* TargetManagerEvent.TargetAvailable */, this.#onAttachedToTarget);
        this.#targetManager.off("targetGone" /* TargetManagerEvent.TargetGone */, this.#onDetachedFromTarget);
        this.#targetManager.off("targetChanged" /* TargetManagerEvent.TargetChanged */, this.#onTargetChanged);
        this.#targetManager.off("targetDiscovered" /* TargetManagerEvent.TargetDiscovered */, this.#onTargetDiscovered);
    }
    process() {
        return this.#process ?? null;
    }
    _targetManager() {
        return this.#targetManager;
    }
    #setIsPageTargetCallback(isPageTargetCallback) {
        this.#isPageTargetCallback =
            isPageTargetCallback ||
                ((target) => {
                    return (target.type() === 'page' ||
                        target.type() === 'background_page' ||
                        target.type() === 'webview' ||
                        (this.#handleDevToolsAsPage &&
                            target.type() === 'other' &&
                            isDevToolsPageTarget(target.url())));
                });
    }
    _getIsPageTargetCallback() {
        return this.#isPageTargetCallback;
    }
    async createBrowserContext(options = {}) {
        const { proxyServer, proxyBypassList, downloadBehavior } = options;
        const { browserContextId } = await this.#connection.send('Target.createBrowserContext', {
            proxyServer,
            proxyBypassList: proxyBypassList && proxyBypassList.join(','),
        });
        const context = new CdpBrowserContext(this.#connection, this, browserContextId);
        if (downloadBehavior) {
            await context.setDownloadBehavior(downloadBehavior);
        }
        this.#contexts.set(browserContextId, context);
        return context;
    }
    browserContexts() {
        return [this.#defaultContext, ...Array.from(this.#contexts.values())];
    }
    defaultBrowserContext() {
        return this.#defaultContext;
    }
    async _disposeContext(contextId) {
        if (!contextId) {
            return;
        }
        await this.#connection.send('Target.disposeBrowserContext', {
            browserContextId: contextId,
        });
        this.#contexts.delete(contextId);
    }
    #createTarget = (targetInfo, session) => {
        const { browserContextId } = targetInfo;
        const context = browserContextId && this.#contexts.has(browserContextId)
            ? this.#contexts.get(browserContextId)
            : this.#defaultContext;
        if (!context) {
            throw new Error('Missing browser context');
        }
        const createSession = (isAutoAttachEmulated) => {
            return this.#connection._createSession(targetInfo, isAutoAttachEmulated);
        };
        const otherTarget = new OtherTarget(targetInfo, session, context, this.#targetManager, createSession);
        if (targetInfo.url && isDevToolsPageTarget(targetInfo.url)) {
            return new DevToolsTarget(targetInfo, session, context, this.#targetManager, createSession, this.#defaultViewport ?? null);
        }
        if (this.#isPageTargetCallback(otherTarget)) {
            return new PageTarget(targetInfo, session, context, this.#targetManager, createSession, this.#defaultViewport ?? null);
        }
        if (targetInfo.type === 'service_worker' ||
            targetInfo.type === 'shared_worker') {
            return new WorkerTarget(targetInfo, session, context, this.#targetManager, createSession);
        }
        return otherTarget;
    };
    #onAttachedToTarget = async (target) => {
        if (target._isTargetExposed() &&
            (await target._initializedDeferred.valueOrThrow()) ===
                InitializationStatus.SUCCESS) {
            this.emit("targetcreated" /* BrowserEvent.TargetCreated */, target);
            target.browserContext().emit("targetcreated" /* BrowserContextEvent.TargetCreated */, target);
        }
    };
    #onDetachedFromTarget = async (target) => {
        target._initializedDeferred.resolve(InitializationStatus.ABORTED);
        target._isClosedDeferred.resolve();
        if (target._isTargetExposed() &&
            (await target._initializedDeferred.valueOrThrow()) ===
                InitializationStatus.SUCCESS) {
            this.emit("targetdestroyed" /* BrowserEvent.TargetDestroyed */, target);
            target.browserContext().emit("targetdestroyed" /* BrowserContextEvent.TargetDestroyed */, target);
        }
    };
    #onTargetChanged = ({ target }) => {
        this.emit("targetchanged" /* BrowserEvent.TargetChanged */, target);
        target.browserContext().emit("targetchanged" /* BrowserContextEvent.TargetChanged */, target);
    };
    #onTargetDiscovered = (targetInfo) => {
        this.emit("targetdiscovered" /* BrowserEvent.TargetDiscovered */, targetInfo);
    };
    wsEndpoint() {
        return this.#connection.url();
    }
    async newPage(options) {
        return await this.#defaultContext.newPage(options);
    }
    async _createPageInContext(contextId, options) {
        const hasTargets = this.targets().filter(t => {
            return t.browserContext().id === contextId;
        }).length > 0;
        const windowBounds = options?.type === 'window' ? options.windowBounds : undefined;
        const { targetId } = await this.#connection.send('Target.createTarget', {
            url: 'about:blank',
            browserContextId: contextId || undefined,
            left: windowBounds?.left,
            top: windowBounds?.top,
            width: windowBounds?.width,
            height: windowBounds?.height,
            windowState: windowBounds?.windowState,
            // Works around crbug.com/454825274.
            newWindow: hasTargets && options?.type === 'window' ? true : undefined,
            background: options?.background,
        });
        const target = (await this.waitForTarget(t => {
            return t._targetId === targetId;
        }));
        if (!target) {
            throw new Error(`Missing target for page (id = ${targetId})`);
        }
        const initialized = (await target._initializedDeferred.valueOrThrow()) ===
            InitializationStatus.SUCCESS;
        if (!initialized) {
            throw new Error(`Failed to create target for page (id = ${targetId})`);
        }
        const page = await target.page();
        if (!page) {
            throw new Error(`Failed to create a page for context (id = ${contextId})`);
        }
        return page;
    }
    async _createDevToolsPage(pageTargetId) {
        const openDevToolsResponse = await this.#connection.send('Target.openDevTools', {
            targetId: pageTargetId,
        });
        return await this._getDevToolsTargetPage(openDevToolsResponse.targetId);
    }
    async _getDevToolsTargetPage(devtoolsTargetId) {
        const target = (await this.waitForTarget(t => {
            return t._targetId === devtoolsTargetId;
        }));
        if (!target) {
            throw new Error(`Missing target for DevTools page (id = ${devtoolsTargetId})`);
        }
        const initialized = (await target._initializedDeferred.valueOrThrow()) ===
            InitializationStatus.SUCCESS;
        if (!initialized) {
            throw new Error(`Failed to create target for DevTools page (id = ${devtoolsTargetId})`);
        }
        const page = await target.page();
        if (!page) {
            throw new Error(`Failed to create a DevTools Page for target (id = ${devtoolsTargetId})`);
        }
        return page;
    }
    async _hasDevToolsTarget(pageTargetId) {
        const response = await this.#connection.send('Target.getDevToolsTarget', {
            targetId: pageTargetId,
        });
        return response.targetId;
    }
    async installExtension(path) {
        const { id } = await this.#connection.send('Extensions.loadUnpacked', { path });
        this.#extensions.delete(id);
        return id;
    }
    async uninstallExtension(id) {
        await this.#connection.send('Extensions.uninstall', { id });
        // Currently sending the Extensions.uninstall command does not trigger
        // the Target.targetDestroyed event for service workers. This causes
        // flakiness in the extension tests.
        // TODO(nroscino): Remove this once the event is correctly emitted.
        const targetDestroyedPromises = [];
        for (const [targetId, targetInfo] of this._targetManager()
            .getDiscoveredTargetInfos()
            .entries()) {
            if (targetInfo.url.includes(id) && targetInfo.type === 'service_worker') {
                this._targetManager().addToIgnoreTarget(targetId);
                targetDestroyedPromises.push(new Promise(resolve => {
                    return setTimeout(() => {
                        this.#connection.emit('Target.targetDestroyed', {
                            targetId: targetId,
                        });
                        resolve(null);
                    }, 0);
                }));
            }
        }
        await Promise.all(targetDestroyedPromises);
        this.#extensions.delete(id);
    }
    async screens() {
        const { screenInfos } = await this.#connection.send('Emulation.getScreenInfos');
        return screenInfos;
    }
    async addScreen(params) {
        const { screenInfo } = await this.#connection.send('Emulation.addScreen', params);
        return screenInfo;
    }
    async removeScreen(screenId) {
        return await this.#connection.send('Emulation.removeScreen', { screenId });
    }
    async getWindowBounds(windowId) {
        const { bounds } = await this.#connection.send('Browser.getWindowBounds', {
            windowId: Number(windowId),
        });
        return bounds;
    }
    async setWindowBounds(windowId, windowBounds) {
        await this.#connection.send('Browser.setWindowBounds', {
            windowId: Number(windowId),
            bounds: windowBounds,
        });
    }
    targets() {
        return Array.from(this.#targetManager.getAvailableTargets().values()).filter(target => {
            return (target._isTargetExposed() &&
                target._initializedDeferred.value() === InitializationStatus.SUCCESS);
        });
    }
    target() {
        const browserTarget = this.targets().find(target => {
            return target.type() === 'browser';
        });
        if (!browserTarget) {
            throw new Error('Browser target is not found');
        }
        return browserTarget;
    }
    async version() {
        const version = await this.#getVersion();
        return version.product;
    }
    async userAgent() {
        const version = await this.#getVersion();
        return version.userAgent;
    }
    async close() {
        await this.#closeCallback.call(null);
        await this.disconnect();
    }
    disconnect() {
        this.#targetManager.dispose();
        this.#connection.dispose();
        this._detach();
        return Promise.resolve();
    }
    /**
     * @internal
     */
    get _connection() {
        return this.#connection;
    }
    get connected() {
        return !this.#connection._closed;
    }
    #getVersion() {
        return this.#connection.send('Browser.getVersion');
    }
    get debugInfo() {
        return {
            pendingProtocolErrors: this.#connection.getPendingProtocolErrors(),
        };
    }
    isNetworkEnabled() {
        return this.#networkEnabled;
    }
    async extensions() {
        const response = await this.#connection.send('Extensions.getExtensions');
        const extensionsMap = new Map();
        for (const currExtension of response.extensions) {
            if (this.#extensions.has(currExtension.id)) {
                extensionsMap.set(currExtension.id, this.#extensions.get(currExtension.id));
            }
            else {
                const newExtension = new CdpExtension(currExtension.id, currExtension.version, currExtension.name, currExtension.path, currExtension.enabled, this);
                extensionsMap.set(currExtension.id, newExtension);
            }
        }
        this.#extensions = extensionsMap;
        return this.#extensions;
    }
    isIssuesEnabled() {
        return this.#issuesEnabled;
    }
}

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Users should never call this directly; it's called when calling
 * `puppeteer.connect` with `protocol: 'cdp'`.
 *
 * @internal
 */
async function _connectToCdpBrowser(connectionTransport, url, options) {
    const { acceptInsecureCerts = false, networkEnabled = true, issuesEnabled = true, defaultViewport = DEFAULT_VIEWPORT, downloadBehavior, targetFilter, _isPageTarget: isPageTarget, slowMo = 0, protocolTimeout, handleDevToolsAsPage, idGenerator = createIncrementalIdGenerator(), blocklist, allowlist, } = options;
    const connection = new Connection(url, connectionTransport, slowMo, protocolTimeout, 
    /* rawErrors */ false, idGenerator);
    const { browserContextIds } = await connection.send('Target.getBrowserContexts');
    const browser = await CdpBrowser._create(connection, browserContextIds, acceptInsecureCerts, defaultViewport, downloadBehavior, undefined, () => {
        return connection.send('Browser.close').catch(debugError);
    }, targetFilter, isPageTarget, undefined, networkEnabled, issuesEnabled, handleDevToolsAsPage, blocklist, allowlist);
    return browser;
}

/**
 * @internal
 */
class BrowserWebSocketTransport {
    static create(url) {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(url);
            ws.addEventListener('open', () => {
                return resolve(new BrowserWebSocketTransport(ws));
            });
            ws.addEventListener('error', reject);
        });
    }
    #ws;
    onmessage;
    onclose;
    constructor(ws) {
        this.#ws = ws;
        this.#ws.addEventListener('message', event => {
            if (this.onmessage) {
                this.onmessage.call(null, event.data);
            }
        });
        this.#ws.addEventListener('close', () => {
            if (this.onclose) {
                this.onclose.call(null);
            }
        });
        // Silently log all errors - we don't know what to do with them.
        this.#ws.addEventListener('error', debugError);
    }
    send(message) {
        this.#ws.send(message);
    }
    close() {
        this.#ws.close();
    }
}

const BrowserWebSocketTransport$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    BrowserWebSocketTransport
}, Symbol.toStringTag, { value: 'Module' }));

export { BrowserWebSocketTransport$1 as B, CdpBrowser as C, _connectToCdpBrowser as _ };
