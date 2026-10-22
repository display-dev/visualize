// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { o as CDPSession, C as CDPSessionEvent, E as EventEmitter, D as DisposableStack, P as PuppeteerURL, b as debugError, p as Dialog } from './chunk-017.mjs';
import { C as CallbackRegistry } from './chunk-024.mjs';
import { a as assert, f as TargetCloseError, C as ConnectionClosedError, d as debug } from './chunk-015.mjs';
import { c as createProtocolErrorMessage } from './chunk-019.mjs';
import { c as createIncrementalIdGenerator } from './chunk-022.mjs';

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpCDPSession extends CDPSession {
    #sessionId;
    #targetType;
    #callbacks;
    #connection;
    #parentSessionId;
    #target;
    #rawErrors = false;
    #detached = false;
    /**
     * @internal
     */
    constructor(connection, targetType, sessionId, parentSessionId, rawErrors) {
        super();
        this.#connection = connection;
        this.#targetType = targetType;
        this.#callbacks = new CallbackRegistry(connection._idGenerator);
        this.#sessionId = sessionId;
        this.#parentSessionId = parentSessionId;
        this.#rawErrors = rawErrors;
    }
    /**
     * Sets the {@link CdpTarget} associated with the session instance.
     *
     * @internal
     */
    setTarget(target) {
        this.#target = target;
    }
    /**
     * Gets the {@link CdpTarget} associated with the session instance.
     *
     * @internal
     */
    target() {
        assert(this.#target, 'Target must exist');
        return this.#target;
    }
    connection() {
        return this.#connection;
    }
    get detached() {
        return this.#connection._closed || this.#detached;
    }
    parentSession() {
        if (!this.#parentSessionId) {
            // In some cases, e.g., DevTools pages there is no parent session. In this
            // case, we treat the current session as the parent session.
            return this;
        }
        const parent = this.#connection?.session(this.#parentSessionId);
        return parent ?? undefined;
    }
    send(method, params, options) {
        if (this.detached) {
            return Promise.reject(new TargetCloseError(`Protocol error (${method}): Session closed. Most likely the ${this.#targetType} has been closed.`));
        }
        return this.#connection
            ._rawSend(this.#callbacks, method, params, this.#sessionId, options)
            .catch(error => {
            if (error instanceof Error &&
                error.message.includes('Session with given id not found')) {
                this.onClosed();
                throw new TargetCloseError(`Protocol error (${method}): Session with given id not found.`);
            }
            throw error;
        });
    }
    /**
     * @internal
     */
    onMessage(object) {
        if (object.id) {
            if (object.error) {
                if (this.#rawErrors) {
                    this.#callbacks.rejectRaw(object.id, object.error);
                }
                else {
                    this.#callbacks.reject(object.id, createProtocolErrorMessage(object), object.error.message);
                }
            }
            else {
                this.#callbacks.resolve(object.id, object.result);
            }
        }
        else {
            assert(!object.id);
            this.emit(object.method, object.params);
        }
    }
    /**
     * Detaches the cdpSession from the target. Once detached, the cdpSession object
     * won't emit any events and can't be used to send messages.
     */
    async detach() {
        if (this.detached) {
            throw new Error(`Session already detached. Most likely the ${this.#targetType} has been closed.`);
        }
        await this.#connection.send('Target.detachFromTarget', {
            sessionId: this.#sessionId,
        });
        this.#detached = true;
    }
    /**
     * @internal
     */
    onClosed() {
        this.#callbacks.clear();
        this.#detached = true;
        this.emit(CDPSessionEvent.Disconnected, undefined);
    }
    /**
     * Returns the session's id.
     */
    id() {
        return this.#sessionId;
    }
    /**
     * @internal
     */
    hasCallback(id) {
        return this.#callbacks.has(id);
    }
    /**
     * @internal
     */
    getPendingProtocolErrors() {
        return this.#callbacks.getPendingProtocolErrors();
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const debugProtocolSend = debug('puppeteer:protocol:SEND ►');
const debugProtocolReceive = debug('puppeteer:protocol:RECV ◀');
/**
 * @public
 */
class Connection extends EventEmitter {
    #url;
    #transport;
    #delay;
    #timeout;
    #sessions = new Map();
    #closed = false;
    #manuallyAttached = new Set();
    #rejectEmulateNetworkConditionsCalls = false;
    #callbacks;
    #rawErrors = false;
    #idGenerator;
    constructor(url, transport, delay = 0, timeout, rawErrors = false, idGenerator = createIncrementalIdGenerator()) {
        super();
        this.#rawErrors = rawErrors;
        this.#idGenerator = idGenerator;
        this.#callbacks = new CallbackRegistry(idGenerator);
        this.#url = url;
        this.#delay = delay;
        this.#timeout = timeout ?? 180_000;
        this.#transport = transport;
        this.#transport.onmessage = this.onMessage.bind(this);
        this.#transport.onclose = this.#onClose.bind(this);
    }
    static fromSession(session) {
        return session.connection();
    }
    /**
     * @internal
     */
    get delay() {
        return this.#delay;
    }
    get timeout() {
        return this.#timeout;
    }
    /**
     * @internal
     */
    get rejectEmulateNetworkConditionsCalls() {
        return this.#rejectEmulateNetworkConditionsCalls;
    }
    set rejectEmulateNetworkConditionsCalls(value) {
        this.#rejectEmulateNetworkConditionsCalls = value;
    }
    /**
     * @internal
     */
    get _closed() {
        return this.#closed;
    }
    /**
     * @internal
     */
    get _idGenerator() {
        return this.#idGenerator;
    }
    /**
     * @internal
     */
    get _sessions() {
        return this.#sessions;
    }
    /**
     * @internal
     */
    _session(sessionId) {
        return this.#sessions.get(sessionId) || null;
    }
    /**
     * @param sessionId - The session id
     * @returns The current CDP session if it exists
     */
    session(sessionId) {
        return this._session(sessionId);
    }
    url() {
        return this.#url;
    }
    send(method, params, options) {
        // There is only ever 1 param arg passed, but the Protocol defines it as an
        // array of 0 or 1 items See this comment:
        // https://github.com/ChromeDevTools/devtools-protocol/pull/113#issuecomment-412603285
        // which explains why the protocol defines the params this way for better
        // type-inference.
        // So now we check if there are any params or not and deal with them accordingly.
        return this._rawSend(this.#callbacks, method, params, undefined, options);
    }
    /**
     * @internal
     */
    _rawSend(callbacks, method, params, sessionId, options) {
        if (this.#closed) {
            return Promise.reject(new ConnectionClosedError('Connection closed.'));
        }
        if (method === 'Network.emulateNetworkConditions' &&
            this.rejectEmulateNetworkConditionsCalls) {
            return Promise.reject(new Error('Cannot reset network conditions: rule-based emulation is enabled.'));
        }
        return callbacks.create(method, options?.timeout ?? this.#timeout, id => {
            const stringifiedMessage = JSON.stringify({
                method,
                params,
                id,
                sessionId,
            });
            debugProtocolSend(stringifiedMessage);
            this.#transport.send(stringifiedMessage);
        });
    }
    /**
     * @internal
     */
    async closeBrowser() {
        await this.send('Browser.close');
    }
    /**
     * @internal
     */
    async onMessage(message) {
        if (this.#delay) {
            await new Promise(r => {
                return setTimeout(r, this.#delay);
            });
        }
        debugProtocolReceive(message);
        const object = JSON.parse(message);
        if (object.method === 'Target.attachedToTarget') {
            const sessionId = object.params.sessionId;
            const session = new CdpCDPSession(this, object.params.targetInfo.type, sessionId, object.sessionId, this.#rawErrors);
            this.#sessions.set(sessionId, session);
            this.emit(CDPSessionEvent.SessionAttached, session);
            const parentSession = this.#sessions.get(object.sessionId);
            if (parentSession) {
                parentSession.emit(CDPSessionEvent.SessionAttached, session);
            }
        }
        else if (object.method === 'Target.detachedFromTarget') {
            const session = this.#sessions.get(object.params.sessionId);
            if (session) {
                session.onClosed();
                this.#sessions.delete(object.params.sessionId);
                this.emit(CDPSessionEvent.SessionDetached, session);
                const parentSession = this.#sessions.get(object.sessionId);
                if (parentSession) {
                    parentSession.emit(CDPSessionEvent.SessionDetached, session);
                }
            }
        }
        if (object.sessionId) {
            const session = this.#sessions.get(object.sessionId);
            if (session) {
                session.onMessage(object);
            }
        }
        else if (object.id) {
            if (this.#callbacks.has(object.id)) {
                if (object.error) {
                    if (this.#rawErrors) {
                        this.#callbacks.rejectRaw(object.id, object.error);
                    }
                    else {
                        this.#callbacks.reject(object.id, createProtocolErrorMessage(object), object.error.message);
                    }
                }
                else {
                    this.#callbacks.resolve(object.id, object.result);
                }
            }
            else {
                for (const session of this.#sessions.values()) {
                    if (session.hasCallback(object.id)) {
                        session.onMessage(object);
                        break;
                    }
                }
            }
        }
        else {
            this.emit(object.method, object.params);
        }
    }
    #onClose() {
        if (this.#closed) {
            return;
        }
        this.#closed = true;
        this.#transport.onmessage = undefined;
        this.#transport.onclose = undefined;
        this.#callbacks.clear();
        for (const session of this.#sessions.values()) {
            session.onClosed();
        }
        this.#sessions.clear();
        this.emit(CDPSessionEvent.Disconnected, undefined);
    }
    dispose() {
        this.#onClose();
        this.#transport.close();
    }
    /**
     * @internal
     */
    isAutoAttached(targetId) {
        return !this.#manuallyAttached.has(targetId);
    }
    /**
     * @internal
     */
    async _createSession(targetInfo, isAutoAttachEmulated = true) {
        if (!isAutoAttachEmulated) {
            this.#manuallyAttached.add(targetInfo.targetId);
        }
        const { sessionId } = await this.send('Target.attachToTarget', {
            targetId: targetInfo.targetId,
            flatten: true,
        });
        this.#manuallyAttached.delete(targetInfo.targetId);
        const session = this.#sessions.get(sessionId);
        if (!session) {
            throw new Error('CDPSession creation failed.');
        }
        return session;
    }
    /**
     * @param targetInfo - The target info
     * @returns The CDP session that is created
     */
    async createSession(targetInfo) {
        return await this._createSession(targetInfo, false);
    }
    /**
     * @internal
     */
    getPendingProtocolErrors() {
        const result = [];
        result.push(...this.#callbacks.getPendingProtocolErrors());
        for (const session of this.#sessions.values()) {
            result.push(...session.getPendingProtocolErrors());
        }
        return result;
    }
}
/**
 * @internal
 */
function isTargetClosedError(error) {
    return error instanceof TargetCloseError;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The Coverage class provides methods to gather information about parts of
 * JavaScript and CSS that were used by the page.
 *
 * @remarks
 * To output coverage in a form consumable by {@link https://github.com/istanbuljs | Istanbul},
 * see {@link https://github.com/istanbuljs/puppeteer-to-istanbul | puppeteer-to-istanbul}.
 *
 * @example
 * An example of using JavaScript and CSS coverage to get percentage of initially
 * executed code:
 *
 * ```ts
 * // Enable both JavaScript and CSS coverage
 * await Promise.all([
 *   page.coverage.startJSCoverage(),
 *   page.coverage.startCSSCoverage(),
 * ]);
 * // Navigate to page
 * await page.goto('https://example.com');
 * // Disable both JavaScript and CSS coverage
 * const [jsCoverage, cssCoverage] = await Promise.all([
 *   page.coverage.stopJSCoverage(),
 *   page.coverage.stopCSSCoverage(),
 * ]);
 * let totalBytes = 0;
 * let usedBytes = 0;
 * const coverage = [...jsCoverage, ...cssCoverage];
 * for (const entry of coverage) {
 *   totalBytes += entry.text.length;
 *   for (const range of entry.ranges) usedBytes += range.end - range.start - 1;
 * }
 * console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`);
 * ```
 *
 * @public
 */
class Coverage {
    #jsCoverage;
    #cssCoverage;
    /**
     * @internal
     */
    constructor(client) {
        this.#jsCoverage = new JSCoverage(client);
        this.#cssCoverage = new CSSCoverage(client);
    }
    /**
     * @internal
     */
    updateClient(client) {
        this.#jsCoverage.updateClient(client);
        this.#cssCoverage.updateClient(client);
    }
    /**
     * @param options - Set of configurable options for coverage defaults to
     * `resetOnNavigation : true, reportAnonymousScripts : false,`
     * `includeRawScriptCoverage : false, useBlockCoverage : true`
     * @returns Promise that resolves when coverage is started.
     *
     * @remarks
     * Anonymous scripts are ones that don't have an associated url. These are
     * scripts that are dynamically created on the page using `eval` or
     * `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous
     * scripts URL will start with `debugger://VM` (unless a magic //# sourceURL
     * comment is present, in which case that will the be URL).
     */
    async startJSCoverage(options = {}) {
        return await this.#jsCoverage.start(options);
    }
    /**
     * Promise that resolves to the array of coverage reports for
     * all scripts.
     *
     * @remarks
     * JavaScript Coverage doesn't include anonymous scripts by default.
     * However, scripts with sourceURLs are reported.
     */
    async stopJSCoverage() {
        return await this.#jsCoverage.stop();
    }
    /**
     * @param options - Set of configurable options for coverage, defaults to
     * `resetOnNavigation : true`
     * @returns Promise that resolves when coverage is started.
     */
    async startCSSCoverage(options = {}) {
        return await this.#cssCoverage.start(options);
    }
    /**
     * Promise that resolves to the array of coverage reports
     * for all stylesheets.
     *
     * @remarks
     * CSS Coverage doesn't include dynamically injected style tags
     * without sourceURLs.
     */
    async stopCSSCoverage() {
        return await this.#cssCoverage.stop();
    }
}
/**
 * @public
 */
class JSCoverage {
    #client;
    #enabled = false;
    #scriptURLs = new Map();
    #scriptSources = new Map();
    #subscriptions;
    #resetOnNavigation = false;
    #reportAnonymousScripts = false;
    #includeRawScriptCoverage = false;
    /**
     * @internal
     */
    constructor(client) {
        this.#client = client;
    }
    /**
     * @internal
     */
    updateClient(client) {
        this.#client = client;
    }
    async start(options = {}) {
        assert(!this.#enabled, 'JSCoverage is already enabled');
        const { resetOnNavigation = true, reportAnonymousScripts = false, includeRawScriptCoverage = false, useBlockCoverage = true, } = options;
        this.#resetOnNavigation = resetOnNavigation;
        this.#reportAnonymousScripts = reportAnonymousScripts;
        this.#includeRawScriptCoverage = includeRawScriptCoverage;
        this.#enabled = true;
        this.#scriptURLs.clear();
        this.#scriptSources.clear();
        this.#subscriptions = new DisposableStack();
        const clientEmitter = this.#subscriptions.use(new EventEmitter(this.#client));
        clientEmitter.on('Debugger.scriptParsed', this.#onScriptParsed.bind(this));
        clientEmitter.on('Runtime.executionContextsCleared', this.#onExecutionContextsCleared.bind(this));
        await Promise.all([
            this.#client.send('Profiler.enable'),
            this.#client.send('Profiler.startPreciseCoverage', {
                callCount: this.#includeRawScriptCoverage,
                detailed: useBlockCoverage,
            }),
            this.#client.send('Debugger.enable'),
            this.#client.send('Debugger.setSkipAllPauses', { skip: true }),
        ]);
    }
    #onExecutionContextsCleared() {
        if (!this.#resetOnNavigation) {
            return;
        }
        this.#scriptURLs.clear();
        this.#scriptSources.clear();
    }
    async #onScriptParsed(event) {
        // Ignore puppeteer-injected scripts
        if (PuppeteerURL.isPuppeteerURL(event.url)) {
            return;
        }
        // Ignore other anonymous scripts unless the reportAnonymousScripts option is true.
        if (!event.url && !this.#reportAnonymousScripts) {
            return;
        }
        try {
            const response = await this.#client.send('Debugger.getScriptSource', {
                scriptId: event.scriptId,
            });
            this.#scriptURLs.set(event.scriptId, event.url);
            this.#scriptSources.set(event.scriptId, response.scriptSource);
        }
        catch (error) {
            // This might happen if the page has already navigated away.
            debugError(error);
        }
    }
    async stop() {
        assert(this.#enabled, 'JSCoverage is not enabled');
        this.#enabled = false;
        const result = await Promise.all([
            this.#client.send('Profiler.takePreciseCoverage'),
            this.#client.send('Profiler.stopPreciseCoverage'),
            this.#client.send('Profiler.disable'),
            this.#client.send('Debugger.disable'),
        ]);
        this.#subscriptions?.dispose();
        const coverage = [];
        const profileResponse = result[0];
        for (const entry of profileResponse.result) {
            let url = this.#scriptURLs.get(entry.scriptId);
            if (!url && this.#reportAnonymousScripts) {
                url = 'debugger://VM' + entry.scriptId;
            }
            const text = this.#scriptSources.get(entry.scriptId);
            if (text === undefined || url === undefined) {
                continue;
            }
            const flattenRanges = [];
            for (const func of entry.functions) {
                flattenRanges.push(...func.ranges);
            }
            const ranges = convertToDisjointRanges(flattenRanges);
            if (!this.#includeRawScriptCoverage) {
                coverage.push({ url, ranges, text });
            }
            else {
                coverage.push({ url, ranges, text, rawScriptCoverage: entry });
            }
        }
        return coverage;
    }
}
/**
 * @public
 */
class CSSCoverage {
    #client;
    #enabled = false;
    #stylesheetURLs = new Map();
    #stylesheetSources = new Map();
    #eventListeners;
    #resetOnNavigation = false;
    constructor(client) {
        this.#client = client;
    }
    /**
     * @internal
     */
    updateClient(client) {
        this.#client = client;
    }
    async start(options = {}) {
        assert(!this.#enabled, 'CSSCoverage is already enabled');
        const { resetOnNavigation = true } = options;
        this.#resetOnNavigation = resetOnNavigation;
        this.#enabled = true;
        this.#stylesheetURLs.clear();
        this.#stylesheetSources.clear();
        this.#eventListeners = new DisposableStack();
        const clientEmitter = this.#eventListeners.use(new EventEmitter(this.#client));
        clientEmitter.on('CSS.styleSheetAdded', this.#onStyleSheet.bind(this));
        clientEmitter.on('Runtime.executionContextsCleared', this.#onExecutionContextsCleared.bind(this));
        await Promise.all([
            this.#client.send('DOM.enable'),
            this.#client.send('CSS.enable'),
            this.#client.send('CSS.startRuleUsageTracking'),
        ]);
    }
    #onExecutionContextsCleared() {
        if (!this.#resetOnNavigation) {
            return;
        }
        this.#stylesheetURLs.clear();
        this.#stylesheetSources.clear();
    }
    async #onStyleSheet(event) {
        const header = event.header;
        // Ignore anonymous scripts
        if (!header.sourceURL) {
            return;
        }
        try {
            const response = await this.#client.send('CSS.getStyleSheetText', {
                styleSheetId: header.styleSheetId,
            });
            this.#stylesheetURLs.set(header.styleSheetId, header.sourceURL);
            this.#stylesheetSources.set(header.styleSheetId, response.text);
        }
        catch (error) {
            // This might happen if the page has already navigated away.
            debugError(error);
        }
    }
    async stop() {
        assert(this.#enabled, 'CSSCoverage is not enabled');
        this.#enabled = false;
        const ruleTrackingResponse = await this.#client.send('CSS.stopRuleUsageTracking');
        await Promise.all([
            this.#client.send('CSS.disable'),
            this.#client.send('DOM.disable'),
        ]);
        this.#eventListeners?.dispose();
        // aggregate by styleSheetId
        const styleSheetIdToCoverage = new Map();
        for (const entry of ruleTrackingResponse.ruleUsage) {
            let ranges = styleSheetIdToCoverage.get(entry.styleSheetId);
            if (!ranges) {
                ranges = [];
                styleSheetIdToCoverage.set(entry.styleSheetId, ranges);
            }
            ranges.push({
                startOffset: entry.startOffset,
                endOffset: entry.endOffset,
                count: entry.used ? 1 : 0,
            });
        }
        const coverage = [];
        for (const styleSheetId of this.#stylesheetURLs.keys()) {
            const url = this.#stylesheetURLs.get(styleSheetId);
            assert(typeof url !== 'undefined', `Stylesheet URL is undefined (styleSheetId=${styleSheetId})`);
            const text = this.#stylesheetSources.get(styleSheetId);
            assert(typeof text !== 'undefined', `Stylesheet text is undefined (styleSheetId=${styleSheetId})`);
            const ranges = convertToDisjointRanges(styleSheetIdToCoverage.get(styleSheetId) || []);
            coverage.push({ url, ranges, text });
        }
        return coverage;
    }
}
function convertToDisjointRanges(nestedRanges) {
    const points = [];
    for (const range of nestedRanges) {
        points.push({ offset: range.startOffset, type: 0, range });
        points.push({ offset: range.endOffset, type: 1, range });
    }
    // Sort points to form a valid parenthesis sequence.
    points.sort((a, b) => {
        // Sort with increasing offsets.
        if (a.offset !== b.offset) {
            return a.offset - b.offset;
        }
        // All "end" points should go before "start" points.
        if (a.type !== b.type) {
            return b.type - a.type;
        }
        const aLength = a.range.endOffset - a.range.startOffset;
        const bLength = b.range.endOffset - b.range.startOffset;
        // For two "start" points, the one with longer range goes first.
        if (a.type === 0) {
            return bLength - aLength;
        }
        // For two "end" points, the one with shorter range goes first.
        return aLength - bLength;
    });
    const hitCountStack = [];
    const results = [];
    let lastOffset = 0;
    // Run scanning line to intersect all ranges.
    for (const point of points) {
        if (hitCountStack.length &&
            lastOffset < point.offset &&
            hitCountStack[hitCountStack.length - 1] > 0) {
            const lastResult = results[results.length - 1];
            if (lastResult && lastResult.end === lastOffset) {
                lastResult.end = point.offset;
            }
            else {
                results.push({ start: lastOffset, end: point.offset });
            }
        }
        lastOffset = point.offset;
        if (point.type === 0) {
            hitCountStack.push(point.range.count);
        }
        else {
            hitCountStack.pop();
        }
    }
    // Filter out empty ranges.
    return results.filter(range => {
        return range.end - range.start > 0;
    });
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpDialog extends Dialog {
    #client;
    constructor(client, type, message, defaultValue = '') {
        super(type, message, defaultValue);
        this.#client = client;
    }
    async handle(options) {
        await this.#client.send('Page.handleJavaScriptDialog', {
            accept: options.accept,
            promptText: options.text,
        });
    }
}

export { Coverage as C, CdpCDPSession as a, CdpDialog as b, Connection as c, isTargetClosedError as i };
