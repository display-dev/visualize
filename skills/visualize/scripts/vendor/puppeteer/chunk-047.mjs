// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { L as LogType } from './chunk-038.mjs';
import './chunk-035.mjs';
import './chunk-037.mjs';
import 'crypto';
import './chunk-042.mjs';
import './chunk-043.mjs';
import './chunk-044.mjs';
import { B as BrowsingContextStorage, R as RealmStorage, P as PreloadScriptStorage, E as EventManager, C as CdpTargetManager } from './chunk-046.mjs';
import { E as EventEmitter } from './chunk-039.mjs';
import { U as UserContextStorage, B as BluetoothProcessor, C as CommandProcessor, a as ContextConfigStorage } from './chunk-040.mjs';
import { N as NetworkStorage } from './chunk-045.mjs';
import { U as UnsupportedOperation, f as TargetCloseError, C as ConnectionClosedError, d as debug, e as environment } from './chunk-015.mjs';
import { C as CallbackRegistry } from './chunk-024.mjs';
import { o as CDPSession, g as Deferred, E as EventEmitter$1, b as debugError, p as Dialog } from './chunk-017.mjs';
import { E as ElementHandle, b as bindIsolatedHandle } from './chunk-020.mjs';
import { A as AsyncIterableUtil } from './chunk-019.mjs';
import { J as JSHandle, t as throwIfDisposed } from './chunk-018.mjs';

/**
 * Copyright 2022 Google LLC.
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
var _a;
class ProcessingQueue {
    static LOGGER_PREFIX = `${LogType.debug}:queue`;
    #logger;
    #processor;
    #queue = [];
    // Flag to keep only 1 active processor.
    #isProcessing = false;
    constructor(processor, logger) {
        this.#processor = processor;
        this.#logger = logger;
    }
    add(entry, name) {
        this.#queue.push([entry, name]);
        // No need in waiting. Just initialize processor if needed.
        void this.#processIfNeeded();
    }
    async #processIfNeeded() {
        if (this.#isProcessing) {
            return;
        }
        this.#isProcessing = true;
        while (this.#queue.length > 0) {
            const arrayEntry = this.#queue.shift();
            if (!arrayEntry) {
                continue;
            }
            const [entryPromise, name] = arrayEntry;
            this.#logger?.(_a.LOGGER_PREFIX, 'Processing event:', name);
            await entryPromise
                .then((entry) => {
                if (entry.kind === 'error') {
                    this.#logger?.(LogType.debugError, 'Event threw before sending:', entry.error.message, entry.error.stack);
                    return;
                }
                return this.#processor(entry.value);
            })
                .catch((error) => {
                this.#logger?.(LogType.debugError, 'Event was not processed:', error?.message);
            });
        }
        this.#isProcessing = false;
    }
}
_a = ProcessingQueue;

/**
 * Copyright 2025 Google LLC.
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
class SpeculationProcessor {
    #eventManager;
    #logger;
    constructor(eventManager, logger) {
        this.#eventManager = eventManager;
        this.#logger = logger;
    }
    onCdpTargetCreated(cdpTarget) {
        cdpTarget.cdpClient.on('Preload.prefetchStatusUpdated', (event) => {
            let prefetchStatus;
            switch (event.status) {
                case 'Running':
                    prefetchStatus = "pending" /* Speculation.PreloadingStatus.Pending */;
                    break;
                case 'Ready':
                    prefetchStatus = "ready" /* Speculation.PreloadingStatus.Ready */;
                    break;
                case 'Success':
                    prefetchStatus = "success" /* Speculation.PreloadingStatus.Success */;
                    break;
                case 'Failure':
                    prefetchStatus = "failure" /* Speculation.PreloadingStatus.Failure */;
                    break;
                default:
                    // If status is not recognized, skip the event
                    this.#logger?.(LogType.debugWarn, `Unknown prefetch status: ${event.status}`);
                    return;
            }
            this.#eventManager.registerEvent({
                type: 'event',
                method: 'speculation.prefetchStatusUpdated',
                params: {
                    context: event.initiatingFrameId,
                    url: event.prefetchUrl,
                    status: prefetchStatus,
                },
            }, cdpTarget.id);
        });
    }
}

/**
 * Copyright 2021 Google LLC.
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
class BidiServer extends EventEmitter {
    #messageQueue;
    #transport;
    #commandProcessor;
    #eventManager;
    #browsingContextStorage = new BrowsingContextStorage();
    #realmStorage = new RealmStorage();
    #preloadScriptStorage = new PreloadScriptStorage();
    #bluetoothProcessor;
    #speculationProcessor;
    #logger;
    #handleIncomingMessage = (message) => {
        void this.#commandProcessor.processCommand(message).catch((error) => {
            this.#logger?.(LogType.debugError, error);
        });
    };
    #processOutgoingMessage = async (messageEntry) => {
        const message = messageEntry.message;
        if (messageEntry.googChannel !== null) {
            message['goog:channel'] = messageEntry.googChannel;
        }
        await this.#transport.sendMessage(message);
    };
    constructor(bidiTransport, cdpConnection, browserCdpClient, selfTargetId, defaultUserContextId, defaultUserAgent, parser, logger) {
        super();
        this.#logger = logger;
        this.#messageQueue = new ProcessingQueue(this.#processOutgoingMessage, this.#logger);
        this.#transport = bidiTransport;
        this.#transport.setOnMessage(this.#handleIncomingMessage);
        const contextConfigStorage = new ContextConfigStorage();
        const userContextStorage = new UserContextStorage(browserCdpClient);
        this.#eventManager = new EventManager(this.#browsingContextStorage, userContextStorage);
        const networkStorage = new NetworkStorage(this.#eventManager, this.#browsingContextStorage, browserCdpClient, logger);
        this.#bluetoothProcessor = new BluetoothProcessor(this.#eventManager, this.#browsingContextStorage);
        this.#speculationProcessor = new SpeculationProcessor(this.#eventManager, this.#logger);
        this.#commandProcessor = new CommandProcessor(cdpConnection, browserCdpClient, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.#preloadScriptStorage, networkStorage, contextConfigStorage, this.#bluetoothProcessor, userContextStorage, parser, async (options) => {
            // This is required to ignore certificate errors when service worker is fetched.
            await browserCdpClient.sendCommand('Security.setIgnoreCertificateErrors', {
                ignore: options.acceptInsecureCerts ?? false,
            });
            contextConfigStorage.updateGlobalConfig({
                acceptInsecureCerts: options.acceptInsecureCerts ?? false,
                userPromptHandler: options.unhandledPromptBehavior,
                prerenderingDisabled: options?.['goog:prerenderingDisabled'] ?? false,
                disableNetworkDurableMessages: options?.['goog:disableNetworkDurableMessages'],
            });
            new CdpTargetManager(cdpConnection, browserCdpClient, selfTargetId, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, networkStorage, contextConfigStorage, this.#bluetoothProcessor, this.#speculationProcessor, this.#preloadScriptStorage, defaultUserContextId, defaultUserAgent, logger);
            // Needed to get events about new targets.
            await browserCdpClient.sendCommand('Target.setDiscoverTargets', {
                discover: true,
            });
            // Needed to automatically attach to new targets.
            await browserCdpClient.sendCommand('Target.setAutoAttach', {
                autoAttach: true,
                waitForDebuggerOnStart: true,
                flatten: true,
                // Browser session should attach to tab instead of the page, so that
                // prerendering is not blocked.
                filter: [
                    {
                        type: 'page',
                        exclude: true,
                    },
                    {},
                ],
            });
            await this.#topLevelContextsLoaded();
        }, this.#logger);
        this.#eventManager.on("event" /* EventManagerEvents.Event */, ({ message, event }) => {
            this.emitOutgoingMessage(message, event);
        });
        this.#commandProcessor.on("response" /* CommandProcessorEvents.Response */, ({ message, event }) => {
            this.emitOutgoingMessage(message, event);
        });
    }
    /**
     * Creates and starts BiDi Mapper instance.
     */
    static async createAndStart(bidiTransport, cdpConnection, browserCdpClient, selfTargetId, parser, logger) {
        const [defaultUserContextId, version] = await Promise.all([
            this.#getDefaultUserContextId(browserCdpClient),
            // Fetch the default User Agent to be used in `CdpTarget`. This allows to avoid
            // round trips to the browser for every target override.
            browserCdpClient.sendCommand('Browser.getVersion'),
            // Required for `Browser.downloadWillBegin` events.
            browserCdpClient.sendCommand('Browser.setDownloadBehavior', {
                behavior: 'default',
                eventsEnabled: true,
            }),
        ]);
        const server = new BidiServer(bidiTransport, cdpConnection, browserCdpClient, selfTargetId, defaultUserContextId, version.userAgent, parser, logger);
        return server;
    }
    static async #getDefaultUserContextId(browserCdpClient) {
        // In chromium before `145.0.7578.0`, the default context is not exposed in
        // `Target.getBrowserContexts`, but can be observed via `Target.getTargets`.
        // If so, try to determine the default browser context by checking which one
        // is mentioned in `Target.getTargets` and not in
        // `Target.getBrowserContexts`.
        // TODO(after 2026-02-24): rely only on `defaultBrowserContextId` from
        // `Target.getBrowserContexts` after Chromium 145 reaches stable.
        const [{ defaultBrowserContextId, browserContextIds }, { targetInfos }] = await Promise.all([
            browserCdpClient.sendCommand('Target.getBrowserContexts'),
            browserCdpClient.sendCommand('Target.getTargets'),
        ]);
        if (defaultBrowserContextId) {
            return defaultBrowserContextId;
        }
        for (const info of targetInfos) {
            if (info.browserContextId &&
                !browserContextIds.includes(info.browserContextId)) {
                // The target belongs to a browser context that is not mentioned in
                // `Target.getBrowserContexts`. This is the default browser context.
                return info.browserContextId;
            }
        }
        // The browser context is unknown.
        return 'default';
    }
    /**
     * Sends BiDi message.
     */
    emitOutgoingMessage(messageEntry, event) {
        this.#messageQueue.add(messageEntry, event);
    }
    close() {
        this.#transport.close();
    }
    async #topLevelContextsLoaded() {
        await Promise.all(this.#browsingContextStorage
            .getTopLevelContexts()
            .map((c) => c.lifecycleLoaded()));
    }
}

/**
 * @internal
 */
class BidiCdpSession extends CDPSession {
    static sessions = new Map();
    #detached = false;
    #connection;
    #sessionId = Deferred.create();
    frame;
    constructor(frame, sessionId) {
        super();
        this.frame = frame;
        if (!this.frame.page().browser().cdpSupported) {
            return;
        }
        const connection = this.frame.page().browser().connection;
        this.#connection = connection;
        if (sessionId) {
            this.#sessionId.resolve(sessionId);
            BidiCdpSession.sessions.set(sessionId, this);
        }
        else {
            (async () => {
                try {
                    const { result } = await connection.send('goog:cdp.getSession', {
                        context: frame._id,
                    });
                    this.#sessionId.resolve(result.session);
                    BidiCdpSession.sessions.set(result.session, this);
                }
                catch (error) {
                    this.#sessionId.reject(error);
                }
            })();
        }
        // SAFETY: We never throw #sessionId.
        BidiCdpSession.sessions.set(this.#sessionId.value(), this);
    }
    connection() {
        return undefined;
    }
    get detached() {
        return this.#detached;
    }
    async send(method, params, options) {
        if (this.#connection === undefined) {
            throw new UnsupportedOperation('CDP support is required for this feature. The current browser does not support CDP.');
        }
        if (this.#detached) {
            throw new TargetCloseError(`Protocol error (${method}): Session closed. Most likely the page has been closed.`);
        }
        const session = await this.#sessionId.valueOrThrow();
        const { result } = await this.#connection.send('goog:cdp.sendCommand', {
            method: method,
            params: params,
            session,
        }, options?.timeout);
        return result.result;
    }
    async detach() {
        if (this.#connection === undefined ||
            this.#connection.closed ||
            this.#detached) {
            return;
        }
        try {
            await this.frame.client.send('Target.detachFromTarget', {
                sessionId: this.id(),
            });
        }
        finally {
            this.onClose();
        }
    }
    /**
     * @internal
     */
    onClose = () => {
        BidiCdpSession.sessions.delete(this.id());
        this.#detached = true;
    };
    id() {
        const value = this.#sessionId.value();
        return typeof value === 'string' ? value : '';
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const debugProtocolSend = debug('puppeteer:webDriverBiDi:SEND ►');
const debugProtocolReceive = debug('puppeteer:webDriverBiDi:RECV ◀');
/**
 * @internal
 */
class BidiConnection extends EventEmitter$1 {
    #url;
    #transport;
    #delay;
    #timeout = 0;
    #closed = false;
    #callbacks;
    #emitters = [];
    constructor(url, transport, idGenerator, delay = 0, timeout) {
        super();
        this.#url = url;
        this.#delay = delay;
        this.#timeout = timeout ?? 180_000;
        this.#callbacks = new CallbackRegistry(idGenerator);
        this.#transport = transport;
        this.#transport.onmessage = this.onMessage.bind(this);
        this.#transport.onclose = this.unbind.bind(this);
    }
    get closed() {
        return this.#closed;
    }
    get url() {
        return this.#url;
    }
    pipeTo(emitter) {
        this.#emitters.push(emitter);
    }
    #toWebDriverOnlyEvent(event) {
        for (const key in event) {
            if (key.startsWith('goog:')) {
                delete event[key];
            }
            else {
                if (typeof event[key] === 'object' && event[key] !== null) {
                    this.#toWebDriverOnlyEvent(event[key]);
                }
            }
        }
    }
    emit(type, event) {
        if (process.env['PUPPETEER_WEBDRIVER_BIDI_ONLY'] === 'true') {
            // Required for WebDriver-only testing.
            this.#toWebDriverOnlyEvent(event);
        }
        for (const emitter of this.#emitters) {
            emitter.emit(type, event);
        }
        return super.emit(type, event);
    }
    send(method, params, timeout) {
        if (this.#closed) {
            return Promise.reject(new ConnectionClosedError('Connection closed.'));
        }
        return this.#callbacks.create(method, timeout ?? this.#timeout, id => {
            const stringifiedMessage = JSON.stringify({
                id,
                method,
                params,
            });
            debugProtocolSend(stringifiedMessage);
            this.#transport.send(stringifiedMessage);
        });
    }
    /**
     * @internal
     */
    async onMessage(message) {
        if (this.#delay) {
            await new Promise(f => {
                return setTimeout(f, this.#delay);
            });
        }
        debugProtocolReceive(message);
        const object = JSON.parse(message);
        if ('type' in object) {
            switch (object.type) {
                case 'success':
                    this.#callbacks.resolve(object.id, object);
                    return;
                case 'error':
                    if (object.id === null) {
                        break;
                    }
                    this.#callbacks.reject(object.id, createProtocolError(object), `${object.error}: ${object.message}`);
                    return;
                case 'event':
                    if (isCdpEvent(object)) {
                        BidiCdpSession.sessions
                            .get(object.params.session)
                            ?.emit(object.params.event, object.params.params);
                        return;
                    }
                    // SAFETY: We know the method and parameter still match here.
                    this.emit(object.method, object.params);
                    return;
            }
        }
        // Even if the response in not in BiDi protocol format but `id` is provided, reject
        // the callback. This can happen if the endpoint supports CDP instead of BiDi.
        if ('id' in object) {
            this.#callbacks.reject(object.id, `Protocol Error. Message is not in BiDi protocol format: '${message}'`, object.message);
        }
        debugError(object);
    }
    /**
     * Unbinds the connection, but keeps the transport open. Useful when the transport will
     * be reused by other connection e.g. with different protocol.
     * @internal
     */
    unbind() {
        if (this.#closed) {
            return;
        }
        this.#closed = true;
        // Both may still be invoked and produce errors
        this.#transport.onmessage = () => { };
        this.#transport.onclose = () => { };
        this.#callbacks.clear();
    }
    /**
     * Unbinds the connection and closes the transport.
     */
    dispose() {
        this.unbind();
        this.#transport.close();
    }
    getPendingProtocolErrors() {
        return this.#callbacks.getPendingProtocolErrors();
    }
}
/**
 * @internal
 */
function createProtocolError(object) {
    let message = `${object.error} ${object.message}`;
    if (object.stacktrace) {
        message += ` ${object.stacktrace}`;
    }
    return message;
}
function isCdpEvent(event) {
    return event.method.startsWith('goog:cdp.');
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const bidiServerLogger = (prefix, ...args) => {
    debug(`bidi:${prefix}`)(args);
};
/**
 * @internal
 */
async function connectBidiOverCdp(cdp) {
    const transportBiDi = new NoOpTransport();
    const cdpConnectionAdapter = new CdpConnectionAdapter(cdp);
    const pptrTransport = {
        send(message) {
            // Forwards a BiDi command sent by Puppeteer to the input of the BidiServer.
            transportBiDi.emitMessage(JSON.parse(message));
        },
        close() {
            bidiServer.close();
            cdpConnectionAdapter.close();
            cdp.dispose();
        },
        onmessage(_message) {
            // The method is overridden by the Connection.
        },
    };
    transportBiDi.on('bidiResponse', (message) => {
        // Forwards a BiDi event sent by BidiServer to Puppeteer.
        pptrTransport.onmessage(JSON.stringify(message));
    });
    const pptrBiDiConnection = new BidiConnection(cdp.url(), pptrTransport, cdp._idGenerator, cdp.delay, cdp.timeout);
    const bidiServer = await BidiServer.createAndStart(transportBiDi, cdpConnectionAdapter, cdpConnectionAdapter.browserClient(), 
    /* selfTargetId= */ '', undefined, bidiServerLogger);
    return pptrBiDiConnection;
}
/**
 * Manages CDPSessions for BidiServer.
 * @internal
 */
class CdpConnectionAdapter {
    #cdp;
    #adapters = new Map();
    #browserCdpConnection;
    constructor(cdp) {
        this.#cdp = cdp;
        this.#browserCdpConnection = new CDPClientAdapter(cdp);
    }
    browserClient() {
        return this.#browserCdpConnection;
    }
    getCdpClient(id) {
        const session = this.#cdp.session(id);
        if (!session) {
            throw new Error(`Unknown CDP session with id ${id}`);
        }
        if (!this.#adapters.has(session)) {
            const adapter = new CDPClientAdapter(session, id, this.#browserCdpConnection);
            this.#adapters.set(session, adapter);
            return adapter;
        }
        return this.#adapters.get(session);
    }
    close() {
        this.#browserCdpConnection.close();
        for (const adapter of this.#adapters.values()) {
            adapter.close();
        }
    }
}
/**
 * Wrapper on top of CDPSession/CDPConnection to satisfy CDP interface that
 * BidiServer needs.
 *
 * @internal
 */
class CDPClientAdapter extends EventEmitter {
    #closed = false;
    #client;
    sessionId = undefined;
    #browserClient;
    constructor(client, sessionId, browserClient) {
        super();
        this.#client = client;
        this.sessionId = sessionId;
        this.#browserClient = browserClient;
        this.#client.on('*', this.#forwardMessage);
    }
    browserClient() {
        return this.#browserClient;
    }
    #forwardMessage = (method, event) => {
        this.emit(method, event);
    };
    async sendCommand(method, ...params) {
        if (this.#closed) {
            return;
        }
        try {
            return await this.#client.send(method, ...params);
        }
        catch (err) {
            if (this.#closed) {
                return;
            }
            throw err;
        }
    }
    close() {
        this.#client.off('*', this.#forwardMessage);
        this.#closed = true;
    }
    isCloseError(error) {
        return error instanceof TargetCloseError;
    }
}
/**
 * This transport is given to the BiDi server instance and allows Puppeteer
 * to send and receive commands to the BiDiServer.
 * @internal
 */
class NoOpTransport extends EventEmitter {
    #onMessage = async (_m) => {
        return;
    };
    emitMessage(message) {
        void this.#onMessage(message);
    }
    setOnMessage(onMessage) {
        this.#onMessage = onMessage;
    }
    async sendMessage(message) {
        this.emit('bidiResponse', message);
    }
    close() {
        this.#onMessage = async (_m) => {
            return;
        };
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class BidiDeserializer {
    static deserialize(result) {
        if (!result) {
            debugError('Service did not produce a result.');
            return undefined;
        }
        switch (result.type) {
            case 'array':
                return result.value?.map(value => {
                    return this.deserialize(value);
                });
            case 'set':
                return result.value?.reduce((acc, value) => {
                    return acc.add(this.deserialize(value));
                }, new Set());
            case 'object':
                return result.value?.reduce((acc, tuple) => {
                    const { key, value } = this.#deserializeTuple(tuple);
                    acc[key] = value;
                    return acc;
                }, {});
            case 'map':
                return result.value?.reduce((acc, tuple) => {
                    const { key, value } = this.#deserializeTuple(tuple);
                    return acc.set(key, value);
                }, new Map());
            case 'promise':
                return {};
            case 'regexp':
                return new RegExp(result.value.pattern, result.value.flags);
            case 'date':
                return new Date(result.value);
            case 'undefined':
                return undefined;
            case 'null':
                return null;
            case 'number':
                return this.#deserializeNumber(result.value);
            case 'bigint':
                return BigInt(result.value);
            case 'boolean':
                return Boolean(result.value);
            case 'string':
                return result.value;
        }
        debugError(`Deserialization of type ${result.type} not supported.`);
        return undefined;
    }
    static #deserializeNumber(value) {
        switch (value) {
            case '-0':
                return -0;
            case 'NaN':
                return NaN;
            case 'Infinity':
                return Infinity;
            case '-Infinity':
                return -Infinity;
            default:
                return value;
        }
    }
    static #deserializeTuple([serializedKey, serializedValue]) {
        const key = typeof serializedKey === 'string'
            ? serializedKey
            : this.deserialize(serializedKey);
        const value = this.deserialize(serializedValue);
        return { key, value };
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class BidiJSHandle extends JSHandle {
    static from(value, realm) {
        return new BidiJSHandle(value, realm);
    }
    #remoteValue;
    realm;
    #disposed = false;
    constructor(value, realm) {
        super();
        this.#remoteValue = value;
        this.realm = realm;
    }
    get disposed() {
        return this.#disposed;
    }
    async jsonValue() {
        return await this.evaluate(value => {
            return value;
        });
    }
    asElement() {
        return null;
    }
    async dispose() {
        if (this.#disposed) {
            return;
        }
        this.#disposed = true;
        await this.realm.destroyHandles([this]);
    }
    get isPrimitiveValue() {
        switch (this.#remoteValue.type) {
            case 'string':
            case 'number':
            case 'bigint':
            case 'boolean':
            case 'undefined':
            case 'null':
                return true;
            default:
                return false;
        }
    }
    toString() {
        if (this.isPrimitiveValue) {
            return 'JSHandle:' + BidiDeserializer.deserialize(this.#remoteValue);
        }
        return 'JSHandle@' + this.#remoteValue.type;
    }
    get id() {
        return 'handle' in this.#remoteValue ? this.#remoteValue.handle : undefined;
    }
    remoteValue() {
        return this.#remoteValue;
    }
    remoteObject() {
        throw new UnsupportedOperation('Not available in WebDriver BiDi');
    }
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
let BidiElementHandle = (() => {
    let _classSuper = ElementHandle;
    let _instanceExtraInitializers = [];
    let _autofill_decorators;
    let _contentFrame_decorators;
    return class BidiElementHandle extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _autofill_decorators = [throwIfDisposed()];
            _contentFrame_decorators = [throwIfDisposed(), bindIsolatedHandle];
            __esDecorate(this, null, _autofill_decorators, { kind: "method", name: "autofill", static: false, private: false, access: { has: obj => "autofill" in obj, get: obj => obj.autofill }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _contentFrame_decorators, { kind: "method", name: "contentFrame", static: false, private: false, access: { has: obj => "contentFrame" in obj, get: obj => obj.contentFrame }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #backendNodeId = __runInitializers(this, _instanceExtraInitializers);
        static from(value, realm) {
            return new BidiElementHandle(value, realm);
        }
        constructor(value, realm) {
            super(BidiJSHandle.from(value, realm));
        }
        get realm() {
            // SAFETY: See the super call in the constructor.
            return this.handle.realm;
        }
        get frame() {
            return this.realm.environment;
        }
        remoteValue() {
            return this.handle.remoteValue();
        }
        async autofill(data) {
            const client = this.frame.client;
            const nodeInfo = await client.send('DOM.describeNode', {
                objectId: this.handle.id,
            });
            const fieldId = nodeInfo.node.backendNodeId;
            const frameId = this.frame._id;
            await client.send('Autofill.trigger', {
                fieldId,
                frameId,
                card: data.creditCard,
                address: data.address,
            });
        }
        async contentFrame() {
            const env_1 = { stack: [], error: void 0, hasError: false };
            try {
                const handle = __addDisposableResource(env_1, (await this.evaluateHandle(element => {
                    if (element instanceof HTMLIFrameElement ||
                        element instanceof HTMLFrameElement) {
                        return element.contentWindow;
                    }
                    return;
                })), false);
                const value = handle.remoteValue();
                if (value.type === 'window') {
                    return (this.frame
                        .page()
                        .frames()
                        .find(frame => {
                        return frame._id === value.value.context;
                    }) ?? null);
                }
                return null;
            }
            catch (e_1) {
                env_1.error = e_1;
                env_1.hasError = true;
            }
            finally {
                __disposeResources(env_1);
            }
        }
        async uploadFile(...files) {
            // Locate all files and confirm that they exist.
            const path = environment.value.path;
            if (path) {
                files = files.map(file => {
                    if (path.win32.isAbsolute(file) || path.posix.isAbsolute(file)) {
                        return file;
                    }
                    else {
                        return path.resolve(file);
                    }
                });
            }
            await this.frame.setFiles(this, files);
        }
        async *queryAXTree(name, role) {
            const results = await this.frame.locateNodes(this, {
                type: 'accessibility',
                value: {
                    role,
                    name,
                },
            });
            return yield* AsyncIterableUtil.map(results, node => {
                // TODO: maybe change ownership since the default ownership is probably none.
                return Promise.resolve(BidiElementHandle.from(node, this.realm));
            });
        }
        async backendNodeId() {
            if (!this.frame.page().browser().cdpSupported) {
                throw new UnsupportedOperation();
            }
            if (this.#backendNodeId) {
                return this.#backendNodeId;
            }
            const { node } = await this.frame.client.send('DOM.describeNode', {
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
class BidiDialog extends Dialog {
    static from(prompt) {
        return new BidiDialog(prompt);
    }
    #prompt;
    constructor(prompt) {
        super(prompt.info.type, prompt.info.message, prompt.info.defaultValue);
        this.#prompt = prompt;
        this.handled = prompt.handled;
    }
    async handle(options) {
        await this.#prompt.handle({
            accept: options.accept,
            userText: options.text,
        });
    }
}

export { BidiConnection as B, BidiElementHandle as a, BidiJSHandle as b, connectBidiOverCdp as c, BidiDeserializer as d, BidiCdpSession as e, BidiDialog as f };
