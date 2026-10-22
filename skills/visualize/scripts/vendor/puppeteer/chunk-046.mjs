// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { L as LogType } from './chunk-038.mjs';
import { B as BrowsingContextImpl, s as serializeOrigin } from './chunk-042.mjs';
import { C as CdpTarget, W as WorkerRealm } from './chunk-045.mjs';
import { m as NoSuchFrameException, I as InvalidArgumentException, y as NoSuchScriptException, z as EVENT_NAMES, A as BiDiModule, v as Speculation, S as Script, x as Network, L as Log, o as Input, B as BrowsingContext, u as Bluetooth, O as OutgoingMessage } from './chunk-035.mjs';
import { E as EventEmitter, u as uuidv4 } from './chunk-039.mjs';
import { W as WindowRealm } from './chunk-041.mjs';
import { D as DefaultMap } from './chunk-043.mjs';

const cdpToBidiTargetTypes = {
    service_worker: 'service-worker',
    shared_worker: 'shared-worker',
    worker: 'dedicated-worker',
};
class CdpTargetManager {
    #browserCdpClient;
    #cdpConnection;
    #targetKeysToBeIgnoredByAutoAttach = new Set();
    #selfTargetId;
    #eventManager;
    #browsingContextStorage;
    #networkStorage;
    #bluetoothProcessor;
    #preloadScriptStorage;
    #realmStorage;
    #configStorage;
    #speculationProcessor;
    #defaultUserContextId;
    #defaultUserAgent;
    #logger;
    constructor(cdpConnection, browserCdpClient, selfTargetId, eventManager, browsingContextStorage, realmStorage, networkStorage, configStorage, bluetoothProcessor, speculationProcessor, preloadScriptStorage, defaultUserContextId, defaultUserAgent, logger) {
        this.#cdpConnection = cdpConnection;
        this.#browserCdpClient = browserCdpClient;
        this.#targetKeysToBeIgnoredByAutoAttach.add(selfTargetId);
        this.#selfTargetId = selfTargetId;
        this.#eventManager = eventManager;
        this.#browsingContextStorage = browsingContextStorage;
        this.#preloadScriptStorage = preloadScriptStorage;
        this.#networkStorage = networkStorage;
        this.#configStorage = configStorage;
        this.#bluetoothProcessor = bluetoothProcessor;
        this.#speculationProcessor = speculationProcessor;
        this.#realmStorage = realmStorage;
        this.#defaultUserContextId = defaultUserContextId;
        this.#defaultUserAgent = defaultUserAgent;
        this.#logger = logger;
        this.#setEventListeners(browserCdpClient);
    }
    /**
     * This method is called for each CDP session, since this class is responsible
     * for creating and destroying all targets and browsing contexts.
     */
    #setEventListeners(cdpClient) {
        cdpClient.on('Target.attachedToTarget', (params) => {
            this.#handleAttachedToTargetEvent(params, cdpClient);
        });
        cdpClient.on('Target.detachedFromTarget', this.#handleDetachedFromTargetEvent.bind(this));
        cdpClient.on('Target.targetInfoChanged', this.#handleTargetInfoChangedEvent.bind(this));
        cdpClient.on('Inspector.targetCrashed', () => {
            this.#handleTargetCrashedEvent(cdpClient);
        });
        cdpClient.on('Page.frameAttached', this.#handleFrameAttachedEvent.bind(this));
        cdpClient.on('Page.frameSubtreeWillBeDetached', this.#handleFrameSubtreeWillBeDetached.bind(this));
    }
    #handleFrameAttachedEvent(params) {
        const parentBrowsingContext = this.#browsingContextStorage.findContext(params.parentFrameId);
        if (parentBrowsingContext !== undefined) {
            BrowsingContextImpl.create(params.frameId, params.parentFrameId, parentBrowsingContext.userContext, parentBrowsingContext.cdpTarget, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.#configStorage, 
            // At this point, we don't know the URL of the frame yet, so it will be updated
            // later.
            'about:blank', undefined, this.#logger);
        }
    }
    #handleFrameSubtreeWillBeDetached(params) {
        this.#browsingContextStorage.findContext(params.frameId)?.dispose(true);
    }
    #handleAttachedToTargetEvent(params, parentSessionCdpClient) {
        const { sessionId, targetInfo } = params;
        const targetCdpClient = this.#cdpConnection.getCdpClient(sessionId);
        const detach = async () => {
            // Detaches and resumes the target suppressing errors.
            await targetCdpClient
                .sendCommand('Runtime.runIfWaitingForDebugger')
                .then(() => parentSessionCdpClient.sendCommand('Target.detachFromTarget', params))
                .catch((error) => this.#logger?.(LogType.debugError, error));
        };
        // Do not attach to the Mapper target.
        if (this.#selfTargetId === targetInfo.targetId) {
            void detach();
            return;
        }
        // Service workers are special case because they attach to the
        // browser target and the page target (so twice per worker) during
        // the regular auto-attach and might hang if the CDP session on
        // the browser level is not detached. The logic to detach the
        // right session is handled in the switch below.
        const targetKey = targetInfo.type === 'service_worker'
            ? `${parentSessionCdpClient.sessionId}_${targetInfo.targetId}`
            : targetInfo.targetId;
        // Mapper generally only needs one session per target. If we
        // receive additional auto-attached sessions, that is very likely
        // coming from custom CDP sessions.
        if (this.#targetKeysToBeIgnoredByAutoAttach.has(targetKey)) {
            // Return to leave the session untouched.
            return;
        }
        this.#targetKeysToBeIgnoredByAutoAttach.add(targetKey);
        const userContext = targetInfo.browserContextId &&
            targetInfo.browserContextId !== this.#defaultUserContextId
            ? targetInfo.browserContextId
            : 'default';
        switch (targetInfo.type) {
            case 'tab': {
                // Tab targets are required only to handle page targets beneath them.
                this.#setEventListeners(targetCdpClient);
                // Auto-attach to the page target. No need in resuming tab target debugger, as it
                // should preserve the page target debugger state, and will be resumed by the page
                // target.
                void (async () => {
                    await targetCdpClient.sendCommand('Target.setAutoAttach', {
                        autoAttach: true,
                        waitForDebuggerOnStart: true,
                        flatten: true,
                    });
                })();
                return;
            }
            case 'page':
            case 'iframe': {
                const cdpTarget = this.#createCdpTarget(targetCdpClient, parentSessionCdpClient, targetInfo, userContext);
                const maybeContext = this.#browsingContextStorage.findContext(targetInfo.targetId);
                if (maybeContext && targetInfo.type === 'iframe') {
                    // OOPiF.
                    maybeContext.updateCdpTarget(cdpTarget);
                }
                else {
                    // If attaching to existing browser instance, there could be OOPiF targets. This
                    // case is handled by the `findFrameParentId` method.
                    const parentId = this.#findFrameParentId(targetInfo, parentSessionCdpClient.sessionId);
                    // New context.
                    BrowsingContextImpl.create(targetInfo.targetId, parentId, userContext, cdpTarget, this.#eventManager, this.#browsingContextStorage, this.#realmStorage, this.#configStorage, 
                    // Hack: when a new target created, CDP emits targetInfoChanged with an empty
                    // url, and navigates it to about:blank later. When the event is emitted for
                    // an existing target (reconnect), the url is already known, and navigation
                    // events will not be emitted anymore. Replacing empty url with `about:blank`
                    // allows to handle both cases in the same way.
                    // "7.3.2.1 Creating browsing contexts".
                    // https://html.spec.whatwg.org/multipage/document-sequences.html#creating-browsing-contexts
                    // TODO: check who to deal with non-null creator and its `creatorOrigin`.
                    targetInfo.url === '' ? 'about:blank' : targetInfo.url, targetInfo.openerFrameId ?? targetInfo.openerId, this.#logger);
                }
                return;
            }
            case 'service_worker':
            case 'worker': {
                const realm = this.#realmStorage.findRealm({
                    cdpSessionId: parentSessionCdpClient.sessionId,
                    sandbox: null, // Non-sandboxed realms.
                });
                // If there is no browsing context, this worker is already terminated.
                if (!realm) {
                    void detach();
                    return;
                }
                const cdpTarget = this.#createCdpTarget(targetCdpClient, parentSessionCdpClient, targetInfo, userContext);
                this.#handleWorkerTarget(cdpToBidiTargetTypes[targetInfo.type], cdpTarget, realm);
                return;
            }
            // In CDP, we only emit shared workers on the browser and not the set of
            // frames that use the shared worker. If we change this in the future to
            // behave like service workers (emits on both browser and frame targets),
            // we can remove this block and merge service workers with the above one.
            case 'shared_worker': {
                const cdpTarget = this.#createCdpTarget(targetCdpClient, parentSessionCdpClient, targetInfo, userContext);
                this.#handleWorkerTarget(cdpToBidiTargetTypes[targetInfo.type], cdpTarget);
                return;
            }
        }
        // DevTools or some other not supported by BiDi target. Just release
        // debugger and ignore them.
        void detach();
    }
    /** Try to find the parent browsing context ID for the given attached target. */
    #findFrameParentId(targetInfo, parentSessionId) {
        if (targetInfo.type !== 'iframe') {
            return null;
        }
        const parentId = targetInfo.openerFrameId ?? targetInfo.openerId;
        if (parentId !== undefined) {
            return parentId;
        }
        if (parentSessionId !== undefined) {
            return (this.#browsingContextStorage.findContextBySession(parentSessionId)
                ?.id ?? null);
        }
        return null;
    }
    #createCdpTarget(targetCdpClient, parentCdpClient, targetInfo, userContext) {
        this.#setEventListeners(targetCdpClient);
        this.#preloadScriptStorage.onCdpTargetCreated(targetInfo.targetId, userContext);
        const target = CdpTarget.create(targetInfo.targetId, targetCdpClient, this.#browserCdpClient, parentCdpClient, this.#realmStorage, this.#eventManager, this.#preloadScriptStorage, this.#browsingContextStorage, this.#networkStorage, this.#configStorage, userContext, 
        // Pass the cached default User Agent to the new target.
        this.#defaultUserAgent, this.#logger);
        this.#networkStorage.onCdpTargetCreated(target);
        this.#bluetoothProcessor.onCdpTargetCreated(target);
        this.#speculationProcessor.onCdpTargetCreated(target);
        return target;
    }
    #workers = new Map();
    #handleWorkerTarget(realmType, cdpTarget, ownerRealm) {
        cdpTarget.cdpClient.on('Runtime.executionContextCreated', (params) => {
            const { uniqueId, id, origin } = params.context;
            const workerRealm = new WorkerRealm(cdpTarget.cdpClient, this.#eventManager, id, this.#logger, serializeOrigin(origin), ownerRealm ? [ownerRealm] : [], uniqueId, this.#realmStorage, realmType);
            this.#workers.set(cdpTarget.cdpSessionId, workerRealm);
        });
    }
    #handleDetachedFromTargetEvent({ sessionId, targetId, }) {
        if (targetId) {
            this.#preloadScriptStorage.find({ targetId }).map((preloadScript) => {
                preloadScript.dispose(targetId);
            });
        }
        const context = this.#browsingContextStorage.findContextBySession(sessionId);
        if (context) {
            context.dispose(true);
            return;
        }
        const worker = this.#workers.get(sessionId);
        if (worker) {
            this.#realmStorage.deleteRealms({
                cdpSessionId: worker.cdpClient.sessionId,
            });
        }
    }
    #handleTargetInfoChangedEvent(params) {
        const context = this.#browsingContextStorage.findContext(params.targetInfo.targetId);
        if (context) {
            context.onTargetInfoChanged(params);
        }
    }
    #handleTargetCrashedEvent(cdpClient) {
        // This is primarily used for service and shared workers. CDP tends to not
        // signal they closed gracefully and instead says they crashed to signal
        // they are closed.
        const realms = this.#realmStorage.findRealms({
            cdpSessionId: cdpClient.sessionId,
        });
        for (const realm of realms) {
            realm.dispose();
        }
    }
}

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
/** Container class for browsing contexts. */
class BrowsingContextStorage {
    /** Map from context ID to context implementation. */
    #contexts = new Map();
    /** Event emitter for browsing context storage eventsis not expected to be exposed to
     * the outside world. */
    #eventEmitter = new EventEmitter();
    /** Gets all top-level contexts, i.e. those with no parent. */
    getTopLevelContexts() {
        return this.getAllContexts().filter((context) => context.isTopLevelContext());
    }
    /** Gets all contexts. */
    getAllContexts() {
        return Array.from(this.#contexts.values());
    }
    /** Deletes the context with the given ID. */
    deleteContextById(id) {
        this.#contexts.delete(id);
    }
    /** Deletes the given context. */
    deleteContext(context) {
        this.#contexts.delete(context.id);
    }
    /** Tracks the given context. */
    addContext(context) {
        this.#contexts.set(context.id, context);
        this.#eventEmitter.emit("added" /* BrowsingContextStorageEvents.Added */, {
            browsingContext: context,
        });
    }
    /**
     * Waits for a context with the given ID to be added and returns it.
     */
    waitForContext(browsingContextId) {
        if (this.#contexts.has(browsingContextId)) {
            return Promise.resolve(this.getContext(browsingContextId));
        }
        return new Promise((resolve) => {
            const listener = (event) => {
                if (event.browsingContext.id === browsingContextId) {
                    this.#eventEmitter.off("added" /* BrowsingContextStorageEvents.Added */, listener);
                    resolve(event.browsingContext);
                }
            };
            this.#eventEmitter.on("added" /* BrowsingContextStorageEvents.Added */, listener);
        });
    }
    /** Returns true whether there is an existing context with the given ID. */
    hasContext(id) {
        return this.#contexts.has(id);
    }
    /** Gets the context with the given ID, if any. */
    findContext(id) {
        return this.#contexts.get(id);
    }
    /** Returns the top-level context ID of the given context, if any. */
    findTopLevelContextId(id) {
        if (id === null) {
            return null;
        }
        const maybeContext = this.findContext(id);
        if (!maybeContext) {
            return null;
        }
        const parentId = maybeContext.parentId ?? null;
        if (parentId === null) {
            return id;
        }
        return this.findTopLevelContextId(parentId);
    }
    findContextBySession(sessionId) {
        for (const context of this.#contexts.values()) {
            if (context.cdpTarget.cdpSessionId === sessionId) {
                return context;
            }
        }
        return;
    }
    /** Gets the context with the given ID, if any, otherwise throws. */
    getContext(id) {
        const result = this.findContext(id);
        if (result === undefined) {
            throw new NoSuchFrameException(`Context ${id} not found`);
        }
        return result;
    }
    verifyTopLevelContextsList(contexts) {
        const foundContexts = new Set();
        if (!contexts) {
            return foundContexts;
        }
        for (const contextId of contexts) {
            const context = this.getContext(contextId);
            if (context.isTopLevelContext()) {
                foundContexts.add(context);
            }
            else {
                throw new InvalidArgumentException(`Non top-level context '${contextId}' given.`);
            }
        }
        return foundContexts;
    }
    verifyContextsList(contexts) {
        if (!contexts.length) {
            return;
        }
        for (const contextId of contexts) {
            this.getContext(contextId);
        }
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
 */
/**
 * Container class for preload scripts.
 */
class PreloadScriptStorage {
    /** Tracks all BiDi preload scripts.  */
    #scripts = new Set();
    /**
     * Finds all entries that match the given filter (OR logic).
     */
    find(filter) {
        if (!filter) {
            return [...this.#scripts];
        }
        return [...this.#scripts].filter((script) => {
            // Global scripts have no contexts or userContext
            if (script.contexts === undefined && script.userContexts === undefined) {
                return true;
            }
            if (filter.targetId !== undefined &&
                script.targetIds.has(filter.targetId)) {
                return true;
            }
            return false;
        });
    }
    add(preloadScript) {
        this.#scripts.add(preloadScript);
    }
    /** Deletes all BiDi preload script entries that match the given filter. */
    remove(id) {
        const script = [...this.#scripts].find((script) => script.id === id);
        if (script === undefined) {
            throw new NoSuchScriptException(`No preload script with id '${id}'`);
        }
        this.#scripts.delete(script);
    }
    /** Gets the preload script with the given ID, if any, otherwise throws. */
    getPreloadScript(id) {
        const script = [...this.#scripts].find((script) => script.id === id);
        if (script === undefined) {
            throw new NoSuchScriptException(`No preload script with id '${id}'`);
        }
        return script;
    }
    onCdpTargetCreated(targetId, userContext) {
        const scriptInUserContext = [...this.#scripts].filter((script) => {
            // Global scripts
            if (!script.userContexts && !script.contexts) {
                return true;
            }
            return script.userContexts?.includes(userContext);
        });
        for (const script of scriptInUserContext) {
            script.targetIds.add(targetId);
        }
    }
}

/** Container class for browsing realms. */
class RealmStorage {
    /** Tracks handles and their realms sent to the client. */
    #knownHandlesToRealmMap = new Map();
    /** Map from realm ID to Realm. */
    #realmMap = new Map();
    /** List of the internal sandboxed realms which should not be reported to the user. */
    hiddenSandboxes = new Set();
    get knownHandlesToRealmMap() {
        return this.#knownHandlesToRealmMap;
    }
    addRealm(realm) {
        this.#realmMap.set(realm.realmId, realm);
    }
    /** Finds all realms that match the given filter. */
    findRealms(filter) {
        const sandboxFilterValue = filter.sandbox === null ? undefined : filter.sandbox;
        return Array.from(this.#realmMap.values()).filter((realm) => {
            if (filter.realmId !== undefined && filter.realmId !== realm.realmId) {
                return false;
            }
            if (filter.browsingContextId !== undefined &&
                !realm.associatedBrowsingContexts
                    .map((browsingContext) => browsingContext.id)
                    .includes(filter.browsingContextId)) {
                return false;
            }
            if (filter.sandbox !== undefined &&
                (!(realm instanceof WindowRealm) ||
                    sandboxFilterValue !== realm.sandbox)) {
                return false;
            }
            if (filter.executionContextId !== undefined &&
                filter.executionContextId !== realm.executionContextId) {
                return false;
            }
            if (filter.origin !== undefined && filter.origin !== realm.origin) {
                return false;
            }
            if (filter.type !== undefined && filter.type !== realm.realmType) {
                return false;
            }
            if (filter.cdpSessionId !== undefined &&
                filter.cdpSessionId !== realm.cdpClient.sessionId) {
                return false;
            }
            if (filter.isHidden !== undefined &&
                filter.isHidden !== realm.isHidden()) {
                return false;
            }
            return true;
        });
    }
    findRealm(filter) {
        return this.findRealms(filter)[0];
    }
    /** Gets the only realm that matches the given filter, if any, otherwise throws. */
    getRealm(filter) {
        const maybeRealm = this.findRealm(filter);
        if (maybeRealm === undefined) {
            throw new NoSuchFrameException(`Realm ${JSON.stringify(filter)} not found`);
        }
        return maybeRealm;
    }
    /** Deletes all realms that match the given filter. */
    deleteRealms(filter) {
        this.findRealms(filter).map((realm) => {
            realm.dispose();
            this.#realmMap.delete(realm.realmId);
            Array.from(this.knownHandlesToRealmMap.entries())
                .filter(([, r]) => r === realm.realmId)
                .map(([handle]) => this.knownHandlesToRealmMap.delete(handle));
        });
    }
}

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
/** Implements a FIFO buffer with a fixed size. */
class Buffer {
    #capacity;
    #entries = [];
    #onItemRemoved;
    /**
     * @param capacity The buffer capacity.
     * @param onItemRemoved Delegate called for each removed element.
     */
    constructor(capacity, onItemRemoved) {
        this.#capacity = capacity;
        this.#onItemRemoved = onItemRemoved;
    }
    get() {
        return this.#entries;
    }
    add(value) {
        this.#entries.push(value);
        while (this.#entries.length > this.#capacity) {
            const item = this.#entries.shift();
            if (item !== undefined) {
                this.#onItemRemoved?.(item);
            }
        }
    }
}

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
/**
 * Creates an object with a positive unique incrementing id.
 */
class IdWrapper {
    static #counter = 0;
    #id;
    constructor() {
        this.#id = ++IdWrapper.#counter;
    }
    get id() {
        return this.#id;
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
/**
 * Returns true if the given event is a CDP event.
 * @see https://chromedevtools.github.io/devtools-protocol/
 */
function isCdpEvent(name) {
    return (name.split('.').at(0)?.startsWith(BiDiModule.Cdp) ?? false);
}
/**
 * Asserts that the given event is known to BiDi or BiDi+, or throws otherwise.
 */
function assertSupportedEvent(name) {
    if (!EVENT_NAMES.has(name) && !isCdpEvent(name)) {
        throw new InvalidArgumentException(`Unknown event: ${name}`);
    }
}

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
/** Expands "AllEvents" events into atomic events. */
function unrollEvents(events) {
    const allEvents = new Set();
    function addEvents(events) {
        for (const event of events) {
            allEvents.add(event);
        }
    }
    for (const event of events) {
        switch (event) {
            case BiDiModule.Bluetooth:
                addEvents(Object.values(Bluetooth.EventNames));
                break;
            case BiDiModule.BrowsingContext:
                addEvents(Object.values(BrowsingContext.EventNames));
                break;
            case BiDiModule.Input:
                addEvents(Object.values(Input.EventNames));
                break;
            case BiDiModule.Log:
                addEvents(Object.values(Log.EventNames));
                break;
            case BiDiModule.Network:
                addEvents(Object.values(Network.EventNames));
                break;
            case BiDiModule.Script:
                addEvents(Object.values(Script.EventNames));
                break;
            case BiDiModule.Speculation:
                addEvents(Object.values(Speculation.EventNames));
                break;
            default:
                allEvents.add(event);
        }
    }
    return allEvents.values();
}
class SubscriptionManager {
    #subscriptions = [];
    #knownSubscriptionIds = new Set();
    #browsingContextStorage;
    constructor(browsingContextStorage) {
        this.#browsingContextStorage = browsingContextStorage;
    }
    getGoogChannelsSubscribedToEvent(eventName, contextId) {
        const googChannels = new Set();
        for (const subscription of this.#subscriptions) {
            if (this.#isSubscribedTo(subscription, eventName, contextId)) {
                googChannels.add(subscription.googChannel);
            }
        }
        return Array.from(googChannels);
    }
    getGoogChannelsSubscribedToEventGlobally(eventName) {
        const googChannels = new Set();
        for (const subscription of this.#subscriptions) {
            if (this.#isSubscribedTo(subscription, eventName)) {
                googChannels.add(subscription.googChannel);
            }
        }
        return Array.from(googChannels);
    }
    #isSubscribedTo(subscription, moduleOrEvent, browsingContextId) {
        let includesEvent = false;
        for (const eventName of subscription.eventNames) {
            // This also covers the `goog:cdp` case where
            // we don't unroll the event names
            if (
            // Event explicitly subscribed
            eventName === moduleOrEvent ||
                // Event subscribed via module
                eventName === moduleOrEvent.split('.').at(0) ||
                // Event explicitly subscribed compared to module
                eventName.split('.').at(0) === moduleOrEvent) {
                includesEvent = true;
                break;
            }
        }
        if (!includesEvent) {
            return false;
        }
        // user context subscription.
        if (subscription.userContextIds.size !== 0) {
            if (!browsingContextId) {
                return false;
            }
            const context = this.#browsingContextStorage.findContext(browsingContextId);
            if (!context) {
                return false;
            }
            return subscription.userContextIds.has(context.userContext);
        }
        // context subscription.
        if (subscription.topLevelTraversableIds.size !== 0) {
            if (!browsingContextId) {
                return false;
            }
            const topLevelContext = this.#browsingContextStorage.findTopLevelContextId(browsingContextId);
            return (topLevelContext !== null &&
                subscription.topLevelTraversableIds.has(topLevelContext));
        }
        // global subscription.
        return true;
    }
    isSubscribedTo(moduleOrEvent, contextId) {
        for (const subscription of this.#subscriptions) {
            if (this.#isSubscribedTo(subscription, moduleOrEvent, contextId)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Subscribes to event in the given context and goog:channel.
     * @return {SubscriptionItem[]} List of
     * subscriptions. If the event is a whole module, it will return all the specific
     * events. If the contextId is null, it will return all the top-level contexts which were
     * not subscribed before the command.
     */
    subscribe(eventNames, contextIds, userContextIds, googChannel) {
        // All the subscriptions are handled on the top-level contexts.
        const subscription = {
            id: uuidv4(),
            eventNames: new Set(unrollEvents(eventNames)),
            topLevelTraversableIds: new Set(contextIds.map((contextId) => {
                const topLevelContext = this.#browsingContextStorage.findTopLevelContextId(contextId);
                if (!topLevelContext) {
                    throw new NoSuchFrameException(`Top-level navigable not found for context id ${contextId}`);
                }
                return topLevelContext;
            })),
            userContextIds: new Set(userContextIds),
            googChannel,
        };
        this.#subscriptions.push(subscription);
        this.#knownSubscriptionIds.add(subscription.id);
        return subscription;
    }
    /**
     * Unsubscribes atomically from all events in the given contexts and channel.
     *
     * This is a legacy spec branch to unsubscribe by attributes.
     */
    unsubscribe(inputEventNames, googChannel) {
        const eventNames = new Set(unrollEvents(inputEventNames));
        const newSubscriptions = [];
        const eventsMatched = new Set();
        for (const subscription of this.#subscriptions) {
            if (subscription.googChannel !== googChannel) {
                newSubscriptions.push(subscription);
                continue;
            }
            // Skip user context subscriptions.
            if (subscription.userContextIds.size !== 0) {
                newSubscriptions.push(subscription);
                continue;
            }
            // Skip subscriptions when none of the event names match.
            if (intersection(subscription.eventNames, eventNames).size === 0) {
                newSubscriptions.push(subscription);
                continue;
            }
            // Skip non-global subscriptions.
            if (subscription.topLevelTraversableIds.size !== 0) {
                newSubscriptions.push(subscription);
                continue;
            }
            const subscriptionEventNames = new Set(subscription.eventNames);
            for (const eventName of eventNames) {
                if (subscriptionEventNames.has(eventName)) {
                    eventsMatched.add(eventName);
                    subscriptionEventNames.delete(eventName);
                }
            }
            if (subscriptionEventNames.size !== 0) {
                newSubscriptions.push({
                    ...subscription,
                    eventNames: subscriptionEventNames,
                });
            }
        }
        // If some events did not match, it is an invalid request.
        if (!equal(eventsMatched, eventNames)) {
            throw new InvalidArgumentException('No subscription found');
        }
        // Committing the new subscriptions.
        this.#subscriptions = newSubscriptions;
    }
    /**
     * Unsubscribes by subscriptionId.
     */
    unsubscribeById(subscriptionIds) {
        const subscriptionIdsSet = new Set(subscriptionIds);
        const unknownIds = difference(subscriptionIdsSet, this.#knownSubscriptionIds);
        if (unknownIds.size !== 0) {
            throw new InvalidArgumentException('No subscription found');
        }
        this.#subscriptions = this.#subscriptions.filter((subscription) => {
            return !subscriptionIdsSet.has(subscription.id);
        });
        this.#knownSubscriptionIds = difference(this.#knownSubscriptionIds, subscriptionIdsSet);
    }
}
/**
 * Replace with Set.prototype.intersection once Node 20 is dropped.
 */
function intersection(setA, setB) {
    const result = new Set();
    for (const a of setA) {
        if (setB.has(a)) {
            result.add(a);
        }
    }
    return result;
}
/**
 * Replace with Set.prototype.difference once Node 20 is dropped.
 */
function difference(setA, setB) {
    const result = new Set();
    for (const a of setA) {
        if (!setB.has(a)) {
            result.add(a);
        }
    }
    return result;
}
function equal(setA, setB) {
    if (setA.size !== setB.size) {
        return false;
    }
    for (const a of setA) {
        if (!setB.has(a)) {
            return false;
        }
    }
    return true;
}

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
class EventWrapper {
    #idWrapper = new IdWrapper();
    #contextId;
    #event;
    constructor(event, contextId) {
        this.#event = event;
        this.#contextId = contextId;
    }
    get id() {
        return this.#idWrapper.id;
    }
    get contextId() {
        return this.#contextId;
    }
    get event() {
        return this.#event;
    }
}
/**
 * Maps event name to a desired buffer length.
 */
const eventBufferLength = new Map([[Log.EventNames.LogEntryAdded, 100]]);
class EventManager extends EventEmitter {
    /**
     * Maps event name to a set of contexts where this event already happened.
     * Needed for getting buffered events from all the contexts in case of
     * subscripting to all contexts.
     */
    #eventToContextsMap = new DefaultMap(() => new Set());
    /**
     * Maps `eventName` + `browsingContext` to buffer. Used to get buffered events
     * during subscription. Channel-agnostic.
     */
    #eventBuffers = new Map();
    /**
     * Maps `eventName` + `browsingContext` to  Map of goog:channel to last id.
     * Used to avoid sending duplicated events when user
     * subscribes -> unsubscribes -> subscribes.
     */
    #lastMessageSent = new Map();
    #subscriptionManager;
    #browsingContextStorage;
    /**
     * Map of event name to hooks to be called when client is subscribed to the event.
     */
    #subscribeHooks;
    #userContextStorage;
    constructor(browsingContextStorage, userContextStorage) {
        super();
        this.#browsingContextStorage = browsingContextStorage;
        this.#userContextStorage = userContextStorage;
        this.#subscriptionManager = new SubscriptionManager(browsingContextStorage);
        this.#subscribeHooks = new DefaultMap(() => []);
    }
    get subscriptionManager() {
        return this.#subscriptionManager;
    }
    /**
     * Returns consistent key to be used to access value maps.
     */
    static #getMapKey(eventName, browsingContext) {
        return JSON.stringify({ eventName, browsingContext });
    }
    addSubscribeHook(event, hook) {
        this.#subscribeHooks.get(event).push(hook);
    }
    registerEvent(event, contextId) {
        this.registerPromiseEvent(Promise.resolve({
            kind: 'success',
            value: event,
        }), contextId, event.method);
    }
    registerGlobalEvent(event) {
        this.registerGlobalPromiseEvent(Promise.resolve({
            kind: 'success',
            value: event,
        }), event.method);
    }
    registerPromiseEvent(event, contextId, eventName) {
        const eventWrapper = new EventWrapper(event, contextId);
        const sortedGoogChannels = this.#subscriptionManager.getGoogChannelsSubscribedToEvent(eventName, contextId);
        this.#bufferEvent(eventWrapper, eventName);
        // Send events to channels in the subscription priority.
        for (const googChannel of sortedGoogChannels) {
            this.emit("event" /* EventManagerEvents.Event */, {
                message: OutgoingMessage.createFromPromise(event, googChannel),
                event: eventName,
            });
            this.#markEventSent(eventWrapper, googChannel, eventName);
        }
    }
    registerGlobalPromiseEvent(event, eventName) {
        const eventWrapper = new EventWrapper(event, null);
        const sortedGoogChannels = this.#subscriptionManager.getGoogChannelsSubscribedToEventGlobally(eventName);
        this.#bufferEvent(eventWrapper, eventName);
        // Send events to goog:channels in the subscription priority.
        for (const googChannel of sortedGoogChannels) {
            this.emit("event" /* EventManagerEvents.Event */, {
                message: OutgoingMessage.createFromPromise(event, googChannel),
                event: eventName,
            });
            this.#markEventSent(eventWrapper, googChannel, eventName);
        }
    }
    async subscribe(eventNames, contextIds, userContextIds, googChannel) {
        for (const name of eventNames) {
            assertSupportedEvent(name);
        }
        if (userContextIds.length && contextIds.length) {
            throw new InvalidArgumentException('Both userContexts and contexts cannot be specified.');
        }
        // First check if all the contexts are known.
        this.#browsingContextStorage.verifyContextsList(contextIds);
        // Validate user contexts.
        await this.#userContextStorage.verifyUserContextIdList(userContextIds);
        const unrolledEventNames = new Set(unrollEvents(eventNames));
        const subscribeStepEvents = new Map();
        const subscriptionNavigableIds = new Set(contextIds.length
            ? contextIds.map((contextId) => {
                const id = this.#browsingContextStorage.findTopLevelContextId(contextId);
                if (!id) {
                    throw new InvalidArgumentException('Invalid context id');
                }
                return id;
            })
            : this.#browsingContextStorage.getTopLevelContexts().map((c) => c.id));
        for (const eventName of unrolledEventNames) {
            const subscribedNavigableIds = new Set(this.#browsingContextStorage
                .getTopLevelContexts()
                .map((c) => c.id)
                .filter((id) => {
                return this.#subscriptionManager.isSubscribedTo(eventName, id);
            }));
            subscribeStepEvents.set(eventName, difference(subscriptionNavigableIds, subscribedNavigableIds));
        }
        const subscription = this.#subscriptionManager.subscribe(eventNames, contextIds, userContextIds, googChannel);
        for (const eventName of subscription.eventNames) {
            for (const contextId of subscriptionNavigableIds) {
                for (const eventWrapper of this.#getBufferedEvents(eventName, contextId, googChannel)) {
                    // The order of the events is important.
                    this.emit("event" /* EventManagerEvents.Event */, {
                        message: OutgoingMessage.createFromPromise(eventWrapper.event, googChannel),
                        event: eventName,
                    });
                    this.#markEventSent(eventWrapper, googChannel, eventName);
                }
            }
        }
        for (const [eventName, contextIds] of subscribeStepEvents) {
            for (const contextId of contextIds) {
                this.#subscribeHooks.get(eventName).forEach((hook) => hook(contextId));
            }
        }
        await this.toggleModulesIfNeeded();
        return subscription.id;
    }
    async unsubscribe(eventNames, googChannel) {
        for (const name of eventNames) {
            assertSupportedEvent(name);
        }
        this.#subscriptionManager.unsubscribe(eventNames, googChannel);
        await this.toggleModulesIfNeeded();
    }
    async unsubscribeByIds(subscriptionIds) {
        this.#subscriptionManager.unsubscribeById(subscriptionIds);
        await this.toggleModulesIfNeeded();
    }
    async toggleModulesIfNeeded() {
        // TODO(1): Only update changed subscribers
        // TODO(2): Enable for Worker Targets
        await Promise.all(this.#browsingContextStorage.getAllContexts().map(async (context) => {
            return await context.toggleModulesIfNeeded();
        }));
    }
    clearBufferedEvents(contextId) {
        for (const eventName of eventBufferLength.keys()) {
            const bufferMapKey = _a.#getMapKey(eventName, contextId);
            this.#eventBuffers.delete(bufferMapKey);
        }
    }
    /**
     * If the event is buffer-able, put it in the buffer.
     */
    #bufferEvent(eventWrapper, eventName) {
        if (!eventBufferLength.has(eventName)) {
            // Do nothing if the event is no buffer-able.
            return;
        }
        const bufferMapKey = _a.#getMapKey(eventName, eventWrapper.contextId);
        if (!this.#eventBuffers.has(bufferMapKey)) {
            this.#eventBuffers.set(bufferMapKey, new Buffer(eventBufferLength.get(eventName)));
        }
        this.#eventBuffers.get(bufferMapKey).add(eventWrapper);
        // Add the context to the list of contexts having `eventName` events.
        this.#eventToContextsMap.get(eventName).add(eventWrapper.contextId);
    }
    /**
     * If the event is buffer-able, mark it as sent to the given contextId and goog:channel.
     */
    #markEventSent(eventWrapper, googChannel, eventName) {
        if (!eventBufferLength.has(eventName)) {
            // Do nothing if the event is no buffer-able.
            return;
        }
        const lastSentMapKey = _a.#getMapKey(eventName, eventWrapper.contextId);
        const lastId = Math.max(this.#lastMessageSent.get(lastSentMapKey)?.get(googChannel) ?? 0, eventWrapper.id);
        const googChannelMap = this.#lastMessageSent.get(lastSentMapKey);
        if (googChannelMap) {
            googChannelMap.set(googChannel, lastId);
        }
        else {
            this.#lastMessageSent.set(lastSentMapKey, new Map([[googChannel, lastId]]));
        }
    }
    /**
     * Returns events which are buffered and not yet sent to the given goog:channel events.
     */
    #getBufferedEvents(eventName, contextId, googChannel) {
        const bufferMapKey = _a.#getMapKey(eventName, contextId);
        const lastSentMessageId = this.#lastMessageSent.get(bufferMapKey)?.get(googChannel) ?? -Infinity;
        const result = this.#eventBuffers
            .get(bufferMapKey)
            ?.get()
            .filter((wrapper) => wrapper.id > lastSentMessageId) ?? [];
        if (contextId === null) {
            // For global subscriptions, events buffered in each context should be sent back.
            Array.from(this.#eventToContextsMap.get(eventName).keys())
                .filter((_contextId) => 
            // Events without context are already in the result.
            _contextId !== null &&
                // Events from deleted contexts should not be sent.
                this.#browsingContextStorage.hasContext(_contextId))
                .map((_contextId) => this.#getBufferedEvents(eventName, _contextId, googChannel))
                .forEach((events) => result.push(...events));
        }
        return result.sort((e1, e2) => e1.id - e2.id);
    }
}
_a = EventManager;

export { BrowsingContextStorage as B, CdpTargetManager as C, EventManager as E, PreloadScriptStorage as P, RealmStorage as R };
