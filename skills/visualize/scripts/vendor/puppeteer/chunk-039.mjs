// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { S as Script, I as InvalidArgumentException, N as NoSuchUserContextException, U as UnableToSetCookieException, a as UnsupportedOperationException, b as InvalidWebExtensionException, c as NoSuchWebExtensionException } from './chunk-035.mjs';
import require$$1 from 'crypto';
import { L as LogType, c as cdpToBiDiCookie, b as bidiToCdpCookie, N as NetworkProcessor, d as deserializeByteValue } from './chunk-038.mjs';
import { a as assert } from './chunk-037.mjs';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

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
class EventEmitter {
    #emitter = mitt();
    on(type, handler) {
        this.#emitter.on(type, handler);
        return this;
    }
    /**
     * Like `on` but the listener will only be fired once and then it will be removed.
     * @param event The event you'd like to listen to
     * @param handler The handler function to run when the event occurs
     * @return `this` to enable chaining method calls.
     */
    once(event, handler) {
        const onceHandler = (eventData) => {
            handler(eventData);
            this.off(event, onceHandler);
        };
        return this.on(event, onceHandler);
    }
    off(type, handler) {
        this.#emitter.off(type, handler);
        return this;
    }
    /**
     * Emits an event and call any associated listeners.
     *
     * @param event The event to emit.
     * @param eventData Any data to emit with the event.
     * @return `true` if there are any listeners, `false` otherwise.
     */
    emit(event, eventData) {
        this.#emitter.emit(event, eventData);
    }
    /**
     * Removes all listeners. If given an event argument, it will remove only
     * listeners for that event.
     * @param event - the event to remove listeners for.
     * @returns `this` to enable you to chain method calls.
     */
    removeAllListeners(event) {
        if (event) {
            this.#emitter.all.delete(event);
        }
        else {
            this.#emitter.all.clear();
        }
        return this;
    }
}

/**
 * Copyright 2023 Google LLC.
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

function bytesToHex(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}
/**
 * Generates a random v4 UUID, as specified in RFC4122.
 *
 * Uses the native Web Crypto API if available, otherwise falls back to a
 * polyfill.
 *
 * Example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
 */
function uuidv4() {
    // Available only in secure contexts
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
    if ('crypto' in globalThis && 'randomUUID' in globalThis.crypto) {
        // Node with
        // https://nodejs.org/dist/latest-v20.x/docs/api/globals.html#crypto_1 or
        // secure browser context.
        return globalThis.crypto.randomUUID();
    }
    const randomValues = new Uint8Array(16);
    if ('crypto' in globalThis && 'getRandomValues' in globalThis.crypto) {
        // Node (>=18) with
        // https://nodejs.org/dist/latest-v20.x/docs/api/globals.html#crypto_1 or
        // browser.
        globalThis.crypto.getRandomValues(randomValues);
    }
    else {
        // Node (<=16) without
        // https://nodejs.org/dist/latest-v20.x/docs/api/globals.html#crypto_1.
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require$$1.webcrypto.getRandomValues(randomValues);
    }
    // Set version (4) and variant (RFC4122) bits.
    randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
    randomValues[8] = (randomValues[8] & 0x3f) | 0x80;
    return [
        bytesToHex(randomValues.subarray(0, 4)),
        bytesToHex(randomValues.subarray(4, 6)),
        bytesToHex(randomValues.subarray(6, 8)),
        bytesToHex(randomValues.subarray(8, 10)),
        bytesToHex(randomValues.subarray(10, 16)),
    ].join('-');
}

/*
 * Copyright 2023 Google LLC.
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
 *
 */
/**
 * Used to send messages from realm to BiDi user.
 */
class ChannelProxy {
    #properties;
    #id = uuidv4();
    #logger;
    constructor(channel, logger) {
        this.#properties = channel;
        this.#logger = logger;
    }
    /**
     * Creates a channel proxy in the given realm, initialises listener and
     * returns a handle to `sendMessage` delegate.
     */
    async init(realm, eventManager) {
        const channelHandle = await ChannelProxy.#createAndGetHandleInRealm(realm);
        const sendMessageHandle = await ChannelProxy.#createSendMessageHandle(realm, channelHandle);
        void this.#startListener(realm, channelHandle, eventManager);
        return sendMessageHandle;
    }
    /** Gets a ChannelProxy from window and returns its handle. */
    async startListenerFromWindow(realm, eventManager) {
        try {
            const channelHandle = await this.#getHandleFromWindow(realm);
            void this.#startListener(realm, channelHandle, eventManager);
        }
        catch (error) {
            this.#logger?.(LogType.debugError, error);
        }
    }
    /**
     * Evaluation string which creates a ChannelProxy object on the client side.
     */
    static #createChannelProxyEvalStr() {
        const functionStr = String(() => {
            const queue = [];
            let queueNonEmptyResolver = null;
            return {
                /**
                 * Gets a promise, which is resolved as soon as a message occurs
                 * in the queue.
                 */
                async getMessage() {
                    const onMessage = queue.length > 0
                        ? Promise.resolve()
                        : new Promise((resolve) => {
                            queueNonEmptyResolver = resolve;
                        });
                    await onMessage;
                    return queue.shift();
                },
                /**
                 * Adds a message to the queue.
                 * Resolves the pending promise if needed.
                 */
                sendMessage(message) {
                    queue.push(message);
                    if (queueNonEmptyResolver !== null) {
                        queueNonEmptyResolver();
                        queueNonEmptyResolver = null;
                    }
                },
            };
        });
        return `(${functionStr})()`;
    }
    /** Creates a ChannelProxy in the given realm. */
    static async #createAndGetHandleInRealm(realm) {
        const createChannelHandleResult = await realm.cdpClient.sendCommand('Runtime.evaluate', {
            expression: this.#createChannelProxyEvalStr(),
            contextId: realm.executionContextId,
            serializationOptions: {
                serialization: "idOnly" /* Protocol.Runtime.SerializationOptionsSerialization.IdOnly */,
            },
        });
        if (createChannelHandleResult.exceptionDetails ||
            createChannelHandleResult.result.objectId === undefined) {
            throw new Error(`Cannot create channel`);
        }
        return createChannelHandleResult.result.objectId;
    }
    /** Gets a handle to `sendMessage` delegate from the ChannelProxy handle. */
    static async #createSendMessageHandle(realm, channelHandle) {
        const sendMessageArgResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((channelHandle) => {
                return channelHandle.sendMessage;
            }),
            arguments: [{ objectId: channelHandle }],
            executionContextId: realm.executionContextId,
            serializationOptions: {
                serialization: "idOnly" /* Protocol.Runtime.SerializationOptionsSerialization.IdOnly */,
            },
        });
        // TODO: check for exceptionDetails.
        return sendMessageArgResult.result.objectId;
    }
    /** Starts listening for the channel events of the provided ChannelProxy. */
    async #startListener(realm, channelHandle, eventManager) {
        // noinspection InfiniteLoopJS
        for (;;) {
            try {
                const message = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String(async (channelHandle) => await channelHandle.getMessage()),
                    arguments: [
                        {
                            objectId: channelHandle,
                        },
                    ],
                    awaitPromise: true,
                    executionContextId: realm.executionContextId,
                    serializationOptions: {
                        serialization: "deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */,
                        maxDepth: this.#properties.serializationOptions?.maxObjectDepth ??
                            undefined,
                    },
                });
                if (message.exceptionDetails) {
                    throw new Error('Runtime.callFunctionOn in ChannelProxy', {
                        cause: message.exceptionDetails,
                    });
                }
                for (const browsingContext of realm.associatedBrowsingContexts) {
                    eventManager.registerEvent({
                        type: 'event',
                        method: Script.EventNames.Message,
                        params: {
                            channel: this.#properties.channel,
                            data: realm.cdpToBidiValue(message, this.#properties.ownership ?? "none" /* Script.ResultOwnership.None */),
                            source: realm.source,
                        },
                    }, browsingContext.id);
                }
            }
            catch (error) {
                // If an error is thrown, then the channel is permanently broken, so we
                // exit the loop.
                this.#logger?.(LogType.debugError, error);
                break;
            }
        }
    }
    /**
     * Returns a handle of ChannelProxy from window's property which was set there
     * by `getEvalInWindowStr`. If window property is not set yet, sets a promise
     * resolver to the window property, so that `getEvalInWindowStr` can resolve
     * the promise later on with the channel.
     * This is needed because `getEvalInWindowStr` can be called before or
     * after this method.
     */
    async #getHandleFromWindow(realm) {
        const channelHandleResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((id) => {
                const w = window;
                if (w[id] === undefined) {
                    // The channelProxy is not created yet. Create a promise, put the
                    // resolver to window property and return the promise.
                    // `getEvalInWindowStr` will resolve the promise later.
                    return new Promise((resolve) => (w[id] = resolve));
                }
                // The channelProxy is already created by `getEvalInWindowStr` and
                // is set into window property. Return it.
                const channelProxy = w[id];
                delete w[id];
                return channelProxy;
            }),
            arguments: [{ value: this.#id }],
            executionContextId: realm.executionContextId,
            awaitPromise: true,
            serializationOptions: {
                serialization: "idOnly" /* Protocol.Runtime.SerializationOptionsSerialization.IdOnly */,
            },
        });
        if (channelHandleResult.exceptionDetails !== undefined ||
            channelHandleResult.result.objectId === undefined) {
            throw new Error(`ChannelHandle not found in window["${this.#id}"]`);
        }
        return channelHandleResult.result.objectId;
    }
    /**
     * String to be evaluated to create a ProxyChannel and put it to window.
     * Returns the delegate `sendMessage`. Used to provide an argument for preload
     * script. Does the following:
     * 1. Creates a ChannelProxy.
     * 2. Puts the ChannelProxy to window['${this.#id}'] or resolves the promise
     *    by calling delegate stored in window['${this.#id}'].
     *    This is needed because `#getHandleFromWindow` can be called before or
     *    after this method.
     * 3. Returns the delegate `sendMessage` of the created ChannelProxy.
     */
    getEvalInWindowStr() {
        const delegate = String((id, channelProxy) => {
            const w = window;
            if (w[id] === undefined) {
                // `#getHandleFromWindow` is not initialized yet, and will get the
                // channelProxy later.
                w[id] = channelProxy;
            }
            else {
                // `#getHandleFromWindow` is already set a delegate to window property
                // and is waiting for it to be called with the channelProxy.
                w[id](channelProxy);
                delete w[id];
            }
            return channelProxy.sendMessage;
        });
        const channelProxyEval = ChannelProxy.#createChannelProxyEvalStr();
        return `(${delegate})('${this.#id}',${channelProxyEval})`;
    }
}

/*
 * Copyright 2023 Google LLC.
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
 *
 */
/**
 * BiDi IDs are generated by the server and are unique within contexts.
 *
 * CDP preload script IDs are generated by the client and are unique
 * within sessions.
 *
 * The mapping between BiDi and CDP preload script IDs is 1:many.
 * BiDi IDs are needed by the mapper to keep track of potential multiple CDP IDs
 * in the client.
 */
class PreloadScript {
    /** BiDi ID, an automatically generated UUID. */
    #id = uuidv4();
    /** CDP preload scripts. */
    #cdpPreloadScripts = [];
    /** The script itself, in a format expected by the spec i.e. a function. */
    #functionDeclaration;
    /** Targets, in which the preload script is initialized. */
    #targetIds = new Set();
    /** Channels to be added as arguments to functionDeclaration. */
    #channels;
    /** The script sandbox / world name. */
    #sandbox;
    /** The browsing contexts to execute the preload scripts in, if any. */
    #contexts;
    /** The browsing contexts to execute the preload scripts in, if any. */
    #userContexts;
    get id() {
        return this.#id;
    }
    get targetIds() {
        return this.#targetIds;
    }
    constructor(params, logger) {
        this.#channels =
            params.arguments?.map((a) => new ChannelProxy(a.value, logger)) ?? [];
        this.#functionDeclaration = params.functionDeclaration;
        this.#sandbox = params.sandbox;
        this.#contexts = params.contexts;
        this.#userContexts = params.userContexts;
    }
    /** Channels of the preload script. */
    get channels() {
        return this.#channels;
    }
    /** Contexts of the preload script, if any */
    get contexts() {
        return this.#contexts;
    }
    /** UserContexts of the preload script, if any */
    get userContexts() {
        return this.#userContexts;
    }
    /**
     * String to be evaluated. Wraps user-provided function so that the following
     * steps are run:
     * 1. Create channels.
     * 2. Store the created channels in window.
     * 3. Call the user-provided function with channels as arguments.
     */
    #getEvaluateString() {
        const channelsArgStr = `[${this.channels
            .map((c) => c.getEvalInWindowStr())
            .join(', ')}]`;
        return `(()=>{(${this.#functionDeclaration})(...${channelsArgStr})})()`;
    }
    /**
     * Adds the script to the given CDP targets by calling the
     * `Page.addScriptToEvaluateOnNewDocument` command.
     */
    async initInTargets(cdpTargets, runImmediately) {
        await Promise.all(Array.from(cdpTargets).map((cdpTarget) => this.initInTarget(cdpTarget, runImmediately)));
    }
    /**
     * Adds the script to the given CDP target by calling the
     * `Page.addScriptToEvaluateOnNewDocument` command.
     */
    async initInTarget(cdpTarget, runImmediately) {
        const addCdpPreloadScriptResult = await cdpTarget.cdpClient.sendCommand('Page.addScriptToEvaluateOnNewDocument', {
            source: this.#getEvaluateString(),
            worldName: this.#sandbox,
            runImmediately,
        });
        this.#cdpPreloadScripts.push({
            target: cdpTarget,
            preloadScriptId: addCdpPreloadScriptResult.identifier,
        });
        this.#targetIds.add(cdpTarget.id);
    }
    /**
     * Removes this script from all CDP targets.
     */
    async remove() {
        await Promise.all([
            this.#cdpPreloadScripts.map(async (cdpPreloadScript) => {
                const cdpTarget = cdpPreloadScript.target;
                const cdpPreloadScriptId = cdpPreloadScript.preloadScriptId;
                return await cdpTarget.cdpClient.sendCommand('Page.removeScriptToEvaluateOnNewDocument', {
                    identifier: cdpPreloadScriptId,
                });
            }),
        ]);
    }
    /** Removes the provided cdp target from the list of cdp preload scripts. */
    dispose(cdpTargetId) {
        this.#cdpPreloadScripts = this.#cdpPreloadScripts.filter((cdpPreloadScript) => cdpPreloadScript.target?.id !== cdpTargetId);
        this.#targetIds.delete(cdpTargetId);
    }
}

/**
 * Copyright 2023 Google LLC.
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
class ScriptProcessor {
    #eventManager;
    #browsingContextStorage;
    #realmStorage;
    #preloadScriptStorage;
    #userContextStorage;
    #logger;
    constructor(eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, userContextStorage, logger) {
        this.#browsingContextStorage = browsingContextStorage;
        this.#realmStorage = realmStorage;
        this.#preloadScriptStorage = preloadScriptStorage;
        this.#userContextStorage = userContextStorage;
        this.#logger = logger;
        this.#eventManager = eventManager;
        this.#eventManager.addSubscribeHook(Script.EventNames.RealmCreated, this.#onRealmCreatedSubscribeHook.bind(this));
    }
    #onRealmCreatedSubscribeHook(contextId) {
        const context = this.#browsingContextStorage.getContext(contextId);
        const contextsToReport = [
            context,
            ...this.#browsingContextStorage.getContext(contextId).allChildren,
        ];
        const realms = new Set();
        for (const reportContext of contextsToReport) {
            const realmsForContext = this.#realmStorage.findRealms({
                browsingContextId: reportContext.id,
            });
            for (const realm of realmsForContext) {
                realms.add(realm);
            }
        }
        for (const realm of realms) {
            this.#eventManager.registerEvent({
                type: 'event',
                method: Script.EventNames.RealmCreated,
                params: realm.realmInfo,
            }, context.id);
        }
        return Promise.resolve();
    }
    async addPreloadScript(params) {
        if (params.userContexts?.length && params.contexts?.length) {
            throw new InvalidArgumentException('Both userContexts and contexts cannot be specified.');
        }
        const userContexts = await this.#userContextStorage.verifyUserContextIdList(params.userContexts ?? []);
        const browsingContexts = this.#browsingContextStorage.verifyTopLevelContextsList(params.contexts);
        const preloadScript = new PreloadScript(params, this.#logger);
        this.#preloadScriptStorage.add(preloadScript);
        let contextsToRunIn = [];
        if (userContexts.size) {
            contextsToRunIn = this.#browsingContextStorage
                .getTopLevelContexts()
                .filter((context) => {
                return userContexts.has(context.userContext);
            });
        }
        else if (browsingContexts.size) {
            contextsToRunIn = [...browsingContexts.values()];
        }
        else {
            contextsToRunIn = this.#browsingContextStorage.getTopLevelContexts();
        }
        const cdpTargets = new Set(contextsToRunIn.map((context) => context.cdpTarget));
        await preloadScript.initInTargets(cdpTargets, false);
        return {
            script: preloadScript.id,
        };
    }
    async removePreloadScript(params) {
        const { script: id } = params;
        const script = this.#preloadScriptStorage.getPreloadScript(id);
        await script.remove();
        this.#preloadScriptStorage.remove(id);
        return {};
    }
    async callFunction(params) {
        const realm = await this.#getRealm(params.target);
        return await realm.callFunction(params.functionDeclaration, params.awaitPromise, params.this, params.arguments, params.resultOwnership, params.serializationOptions, params.userActivation);
    }
    async evaluate(params) {
        const realm = await this.#getRealm(params.target);
        return await realm.evaluate(params.expression, params.awaitPromise, params.resultOwnership, params.serializationOptions, params.userActivation);
    }
    async disown(params) {
        const realm = await this.#getRealm(params.target);
        await Promise.all(params.handles.map(async (handle) => await realm.disown(handle)));
        return {};
    }
    getRealms(params) {
        if (params.context !== undefined) {
            // Make sure the context is known.
            this.#browsingContextStorage.getContext(params.context);
        }
        const realms = this.#realmStorage
            .findRealms({
            browsingContextId: params.context,
            type: params.type,
            isHidden: false,
        })
            .map((realm) => realm.realmInfo);
        return { realms };
    }
    async #getRealm(target) {
        if ('context' in target) {
            const context = this.#browsingContextStorage.getContext(target.context);
            return await context.getOrCreateUserSandbox(target.sandbox);
        }
        return this.#realmStorage.getRealm({
            realmId: target.realm,
            isHidden: false,
        });
    }
}

/**
 * Copyright 2023 Google LLC.
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
class SessionProcessor {
    #eventManager;
    #browserCdpClient;
    #initConnection;
    #created = false;
    constructor(eventManager, browserCdpClient, initConnection) {
        this.#eventManager = eventManager;
        this.#browserCdpClient = browserCdpClient;
        this.#initConnection = initConnection;
    }
    status() {
        return { ready: false, message: 'already connected' };
    }
    #mergeCapabilities(capabilitiesRequest) {
        // Roughly following https://www.w3.org/TR/webdriver2/#dfn-capabilities-processing.
        // Validations should already be done by the parser.
        const mergedCapabilities = [];
        for (const first of capabilitiesRequest.firstMatch ?? [{}]) {
            const result = {
                ...capabilitiesRequest.alwaysMatch,
            };
            for (const key of Object.keys(first)) {
                if (result[key] !== undefined) {
                    throw new InvalidArgumentException(`Capability ${key} in firstMatch is already defined in alwaysMatch`);
                }
                result[key] = first[key];
            }
            mergedCapabilities.push(result);
        }
        const match = mergedCapabilities.find((c) => c.browserName === 'chrome') ??
            mergedCapabilities[0] ??
            {};
        match.unhandledPromptBehavior = this.#getUnhandledPromptBehavior(match.unhandledPromptBehavior);
        return match;
    }
    #getUnhandledPromptBehavior(capabilityValue) {
        if (capabilityValue === undefined) {
            return undefined;
        }
        if (typeof capabilityValue === 'object') {
            // Do not validate capabilities. Incorrect ones will be ignored by Mapper.
            return capabilityValue;
        }
        if (typeof capabilityValue !== 'string') {
            throw new InvalidArgumentException(`Unexpected 'unhandledPromptBehavior' type: ${typeof capabilityValue}`);
        }
        switch (capabilityValue) {
            // `beforeUnload: accept` has higher priority over string capability, as the latest
            // one is set to "fallbackDefault".
            // https://w3c.github.io/webdriver/#dfn-deserialize-as-an-unhandled-prompt-behavior
            // https://w3c.github.io/webdriver/#dfn-get-the-prompt-handler
            case 'accept':
            case 'accept and notify':
                return {
                    default: "accept" /* Session.UserPromptHandlerType.Accept */,
                    beforeUnload: "accept" /* Session.UserPromptHandlerType.Accept */,
                };
            case 'dismiss':
            case 'dismiss and notify':
                return {
                    default: "dismiss" /* Session.UserPromptHandlerType.Dismiss */,
                    beforeUnload: "accept" /* Session.UserPromptHandlerType.Accept */,
                };
            case 'ignore':
                return {
                    default: "ignore" /* Session.UserPromptHandlerType.Ignore */,
                    beforeUnload: "accept" /* Session.UserPromptHandlerType.Accept */,
                };
            default:
                throw new InvalidArgumentException(`Unexpected 'unhandledPromptBehavior' value: ${capabilityValue}`);
        }
    }
    async new(params) {
        if (this.#created) {
            throw new Error('Session has been already created.');
        }
        this.#created = true;
        const matchedCapabitlites = this.#mergeCapabilities(params.capabilities);
        await this.#initConnection(matchedCapabitlites);
        const version = await this.#browserCdpClient.sendCommand('Browser.getVersion');
        return {
            sessionId: 'unknown',
            capabilities: {
                ...matchedCapabitlites,
                acceptInsecureCerts: matchedCapabitlites.acceptInsecureCerts ?? false,
                browserName: version.product,
                browserVersion: version.revision,
                platformName: '',
                setWindowRect: false,
                webSocketUrl: '',
                userAgent: version.userAgent,
            },
        };
    }
    async subscribe(params, googChannel = null) {
        const subscription = await this.#eventManager.subscribe(params.events, params.contexts ?? [], params.userContexts ?? [], googChannel);
        return {
            subscription,
        };
    }
    async unsubscribe(params, googChannel = null) {
        if ('subscriptions' in params) {
            await this.#eventManager.unsubscribeByIds(params.subscriptions);
            return {};
        }
        await this.#eventManager.unsubscribe(params.events, googChannel);
        return {};
    }
}

/**
 * Responsible for handling the `storage` module.
 */
class StorageProcessor {
    #browserCdpClient;
    #browsingContextStorage;
    #logger;
    constructor(browserCdpClient, browsingContextStorage, logger) {
        this.#browsingContextStorage = browsingContextStorage;
        this.#browserCdpClient = browserCdpClient;
        this.#logger = logger;
    }
    async deleteCookies(params) {
        const partitionKey = this.#expandStoragePartitionSpec(params.partition);
        let cdpResponse;
        try {
            cdpResponse = await this.#browserCdpClient.sendCommand('Storage.getCookies', {
                browserContextId: this.#getCdpBrowserContextId(partitionKey),
            });
        }
        catch (err) {
            if (this.#isNoSuchUserContextError(err)) {
                // If the user context is not found, special error is thrown.
                throw new NoSuchUserContextException(err.message);
            }
            throw err;
        }
        const cdpCookiesToDelete = cdpResponse.cookies
            .filter(
        // CDP's partition key is the source origin. If the request specifies the
        // `sourceOrigin` partition key, only cookies with the requested source origin
        // are returned.
        (c) => partitionKey.sourceOrigin === undefined ||
            c.partitionKey?.topLevelSite === partitionKey.sourceOrigin)
            .filter((cdpCookie) => {
            const bidiCookie = cdpToBiDiCookie(cdpCookie);
            return this.#matchCookie(bidiCookie, params.filter);
        })
            .map((cookie) => ({
            ...cookie,
            // Set expiry to pass date to delete the cookie.
            expires: 1,
        }));
        await this.#browserCdpClient.sendCommand('Storage.setCookies', {
            cookies: cdpCookiesToDelete,
            browserContextId: this.#getCdpBrowserContextId(partitionKey),
        });
        return {
            partitionKey,
        };
    }
    async getCookies(params) {
        const partitionKey = this.#expandStoragePartitionSpec(params.partition);
        let cdpResponse;
        try {
            cdpResponse = await this.#browserCdpClient.sendCommand('Storage.getCookies', {
                browserContextId: this.#getCdpBrowserContextId(partitionKey),
            });
        }
        catch (err) {
            if (this.#isNoSuchUserContextError(err)) {
                // If the user context is not found, special error is thrown.
                throw new NoSuchUserContextException(err.message);
            }
            throw err;
        }
        const filteredBiDiCookies = cdpResponse.cookies
            .filter(
        // CDP's partition key is the source origin. If the request specifies the
        // `sourceOrigin` partition key, only cookies with the requested source origin
        // are returned.
        (c) => partitionKey.sourceOrigin === undefined ||
            c.partitionKey?.topLevelSite === partitionKey.sourceOrigin)
            .map((c) => cdpToBiDiCookie(c))
            .filter((c) => this.#matchCookie(c, params.filter));
        return {
            cookies: filteredBiDiCookies,
            partitionKey,
        };
    }
    async setCookie(params) {
        const partitionKey = this.#expandStoragePartitionSpec(params.partition);
        const cdpCookie = bidiToCdpCookie(params, partitionKey);
        try {
            await this.#browserCdpClient.sendCommand('Storage.setCookies', {
                cookies: [cdpCookie],
                browserContextId: this.#getCdpBrowserContextId(partitionKey),
            });
        }
        catch (err) {
            if (this.#isNoSuchUserContextError(err)) {
                // If the user context is not found, special error is thrown.
                throw new NoSuchUserContextException(err.message);
            }
            this.#logger?.(LogType.debugError, err);
            throw new UnableToSetCookieException(err.toString());
        }
        return {
            partitionKey,
        };
    }
    #isNoSuchUserContextError(err) {
        // Heuristic to detect if the user context is not found.
        // See https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/protocol/browser_handler.cc;drc=a56154dd81e4679712422ac6eed2c9581cb51ab0;l=314
        return err.message?.startsWith('Failed to find browser context for id');
    }
    #getCdpBrowserContextId(partitionKey) {
        return partitionKey.userContext === 'default'
            ? undefined
            : partitionKey.userContext;
    }
    #expandStoragePartitionSpecByBrowsingContext(descriptor) {
        const browsingContextId = descriptor.context;
        const browsingContext = this.#browsingContextStorage.getContext(browsingContextId);
        // https://w3c.github.io/webdriver-bidi/#associated-storage-partition.
        // Each browsing context also has an associated storage partition, which is the
        // storage partition it uses to persist data. In Chromium it's a `BrowserContext`
        // which maps to BiDi `UserContext`.
        return {
            userContext: browsingContext.userContext,
        };
    }
    #expandStoragePartitionSpecByStorageKey(descriptor) {
        const unsupportedPartitionKeys = new Map();
        let sourceOrigin = descriptor.sourceOrigin;
        if (sourceOrigin !== undefined) {
            const url = NetworkProcessor.parseUrlString(sourceOrigin);
            if (url.origin === 'null') {
                // Origin `null` is a special case for local pages.
                sourceOrigin = url.origin;
            }
            else {
                // Port is not supported in CDP Cookie's `partitionKey`, so it should be stripped
                // from the requested source origin.
                sourceOrigin = `${url.protocol}//${url.hostname}`;
            }
        }
        for (const [key, value] of Object.entries(descriptor)) {
            if (key !== undefined &&
                value !== undefined &&
                !['type', 'sourceOrigin', 'userContext'].includes(key)) {
                unsupportedPartitionKeys.set(key, value);
            }
        }
        if (unsupportedPartitionKeys.size > 0) {
            this.#logger?.(LogType.debugInfo, `Unsupported partition keys: ${JSON.stringify(Object.fromEntries(unsupportedPartitionKeys))}`);
        }
        // Set `userContext` to `default` if not provided, as it's required in Chromium.
        const userContext = descriptor.userContext ?? 'default';
        return {
            userContext,
            ...(sourceOrigin === undefined ? {} : { sourceOrigin }),
        };
    }
    #expandStoragePartitionSpec(partitionSpec) {
        if (partitionSpec === undefined) {
            // `userContext` is required in Chromium.
            return { userContext: 'default' };
        }
        if (partitionSpec.type === 'context') {
            return this.#expandStoragePartitionSpecByBrowsingContext(partitionSpec);
        }
        assert(partitionSpec.type === 'storageKey', 'Unknown partition type');
        // Partition spec is a storage partition.
        // Let partition key be partition spec.
        return this.#expandStoragePartitionSpecByStorageKey(partitionSpec);
    }
    #matchCookie(cookie, filter) {
        if (filter === undefined) {
            return true;
        }
        return ((filter.domain === undefined || filter.domain === cookie.domain) &&
            (filter.name === undefined || filter.name === cookie.name) &&
            // `value` contains fields `type` and `value`.
            (filter.value === undefined ||
                deserializeByteValue(filter.value) ===
                    deserializeByteValue(cookie.value)) &&
            (filter.path === undefined || filter.path === cookie.path) &&
            (filter.size === undefined || filter.size === cookie.size) &&
            (filter.httpOnly === undefined || filter.httpOnly === cookie.httpOnly) &&
            (filter.secure === undefined || filter.secure === cookie.secure) &&
            (filter.sameSite === undefined || filter.sameSite === cookie.sameSite) &&
            (filter.expiry === undefined || filter.expiry === cookie.expiry));
    }
}

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
/**
 * Responsible for handling the `webModule` module.
 */
class WebExtensionProcessor {
    #browserCdpClient;
    constructor(browserCdpClient) {
        this.#browserCdpClient = browserCdpClient;
    }
    async install(params) {
        switch (params.extensionData.type) {
            case 'archivePath':
            case 'base64':
                throw new UnsupportedOperationException('Archived and Base64 extensions are not supported');
        }
        try {
            const response = await this.#browserCdpClient.sendCommand('Extensions.loadUnpacked', {
                path: params.extensionData.path,
            });
            return {
                extension: response.id,
            };
        }
        catch (err) {
            if (err.message.startsWith('invalid web extension')) {
                throw new InvalidWebExtensionException(err.message);
            }
            throw err;
        }
    }
    async uninstall(params) {
        try {
            await this.#browserCdpClient.sendCommand('Extensions.uninstall', {
                id: params.extension,
            });
            return {};
        }
        catch (err) {
            if (err.message ===
                'Uninstall failed. Reason: could not find extension.') {
                throw new NoSuchWebExtensionException('no such web extension');
            }
            throw err;
        }
    }
}

export { ChannelProxy as C, EventEmitter as E, ScriptProcessor as S, WebExtensionProcessor as W, SessionProcessor as a, StorageProcessor as b, uuidv4 as u };
