// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { S as Script, n as NoSuchHandleException, d as NoSuchNodeException, i as UnknownErrorException, B as BrowsingContext } from './chunk-035.mjs';
import { L as LogType } from './chunk-038.mjs';
import { u as uuidv4, C as ChannelProxy } from './chunk-039.mjs';

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
class Deferred {
    #isFinished = false;
    #promise;
    #result;
    #resolve;
    #reject;
    get isFinished() {
        return this.#isFinished;
    }
    get result() {
        if (!this.#isFinished) {
            throw new Error('Deferred is not finished yet');
        }
        return this.#result;
    }
    constructor() {
        this.#promise = new Promise((resolve, reject) => {
            this.#resolve = resolve;
            this.#reject = reject;
        });
        // Needed to avoid `Uncaught (in promise)`. The promises returned by `then`
        // and `catch` will be rejected anyway.
        this.#promise.catch((_error) => {
            // Intentionally empty.
        });
    }
    then(onFulfilled, onRejected) {
        return this.#promise.then(onFulfilled, onRejected);
    }
    catch(onRejected) {
        return this.#promise.catch(onRejected);
    }
    resolve(value) {
        this.#result = value;
        if (!this.#isFinished) {
            this.#isFinished = true;
            this.#resolve(value);
        }
    }
    reject(reason) {
        if (!this.#isFinished) {
            this.#isFinished = true;
            this.#reject(reason);
        }
    }
    finally(onFinally) {
        return this.#promise.finally(onFinally);
    }
    [Symbol.toStringTag] = 'Promise';
}

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
function getTimestamp() {
    // `timestamp` from the event is MonotonicTime, not real time, so
    // the best Mapper can do is to set the timestamp to the epoch time
    // of the event arrived.
    // https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-MonotonicTime
    return new Date().getTime();
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
/** @return Given an input in cm, convert it to inches. */
function inchesFromCm(cm) {
    return cm / 2.54;
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
const SHARED_ID_DIVIDER = '_element_';
function getSharedId(frameId, documentId, backendNodeId) {
    return `f.${frameId}.d.${documentId}.e.${backendNodeId}`;
}
function parseLegacySharedId(sharedId) {
    const match = sharedId.match(new RegExp(`(.*)${SHARED_ID_DIVIDER}(.*)`));
    if (!match) {
        // SharedId is incorrectly formatted.
        return null;
    }
    const documentId = match[1];
    const elementId = match[2];
    if (documentId === undefined || elementId === undefined) {
        return null;
    }
    const backendNodeId = parseInt(elementId ?? '');
    if (isNaN(backendNodeId)) {
        return null;
    }
    return {
        documentId,
        backendNodeId,
    };
}
function parseSharedId(sharedId) {
    // TODO: remove legacy check once ChromeDriver provides sharedId in the new format.
    const legacyFormattedSharedId = parseLegacySharedId(sharedId);
    if (legacyFormattedSharedId !== null) {
        return { ...legacyFormattedSharedId, frameId: undefined };
    }
    const match = sharedId.match(/f\.(.*)\.d\.(.*)\.e\.([0-9]*)/);
    if (!match) {
        // SharedId is incorrectly formatted.
        return null;
    }
    const frameId = match[1];
    const documentId = match[2];
    const elementId = match[3];
    if (frameId === undefined ||
        documentId === undefined ||
        elementId === undefined) {
        return null;
    }
    const backendNodeId = parseInt(elementId ?? '');
    if (isNaN(backendNodeId)) {
        return null;
    }
    return {
        frameId,
        documentId,
        backendNodeId,
    };
}

class Realm {
    #cdpClient;
    #eventManager;
    #executionContextId;
    #logger;
    #origin;
    #realmId;
    realmStorage;
    constructor(cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage) {
        this.#cdpClient = cdpClient;
        this.#eventManager = eventManager;
        this.#executionContextId = executionContextId;
        this.#logger = logger;
        this.#origin = origin;
        this.#realmId = realmId;
        this.realmStorage = realmStorage;
        this.realmStorage.addRealm(this);
    }
    cdpToBidiValue(cdpValue, resultOwnership) {
        const bidiValue = this.serializeForBiDi(cdpValue.result.deepSerializedValue, new Map());
        if (cdpValue.result.objectId) {
            const objectId = cdpValue.result.objectId;
            if (resultOwnership === "root" /* Script.ResultOwnership.Root */) {
                // Extend BiDi value with `handle` based on required `resultOwnership`
                // and  CDP response but not on the actual BiDi type.
                bidiValue.handle = objectId;
                // Remember all the handles sent to client.
                this.realmStorage.knownHandlesToRealmMap.set(objectId, this.realmId);
            }
            else {
                // No need to await for the object to be released.
                void this.#releaseObject(objectId).catch((error) => this.#logger?.(LogType.debugError, error));
            }
        }
        return bidiValue;
    }
    isHidden() {
        return false;
    }
    /**
     * Relies on the CDP to implement proper BiDi serialization, except:
     * * CDP integer property `backendNodeId` is replaced with `sharedId` of
     * `{documentId}_element_{backendNodeId}`;
     * * CDP integer property `weakLocalObjectReference` is replaced with UUID `internalId`
     * using unique-per serialization `internalIdMap`.
     * * CDP type `platformobject` is replaced with `object`.
     * @param deepSerializedValue - CDP value to be converted to BiDi.
     * @param internalIdMap - Map from CDP integer `weakLocalObjectReference` to BiDi UUID
     * `internalId`.
     */
    serializeForBiDi(deepSerializedValue, internalIdMap) {
        if (Object.hasOwn(deepSerializedValue, 'weakLocalObjectReference')) {
            const weakLocalObjectReference = deepSerializedValue.weakLocalObjectReference;
            if (!internalIdMap.has(weakLocalObjectReference)) {
                internalIdMap.set(weakLocalObjectReference, uuidv4());
            }
            deepSerializedValue.internalId = internalIdMap.get(weakLocalObjectReference);
            delete deepSerializedValue['weakLocalObjectReference'];
        }
        if (deepSerializedValue.type === 'node' &&
            deepSerializedValue.value &&
            Object.hasOwn(deepSerializedValue.value, 'frameId')) {
            // `frameId` is not needed in BiDi as it is not yet specified.
            delete deepSerializedValue.value['frameId'];
        }
        // Platform object is a special case. It should have only `{type: object}`
        // without `value` field.
        if (deepSerializedValue.type === 'platformobject') {
            return { type: 'object' };
        }
        const bidiValue = deepSerializedValue.value;
        if (bidiValue === undefined) {
            return deepSerializedValue;
        }
        // Recursively update the nested values.
        if (['array', 'set', 'htmlcollection', 'nodelist'].includes(deepSerializedValue.type)) {
            for (const i in bidiValue) {
                bidiValue[i] = this.serializeForBiDi(bidiValue[i], internalIdMap);
            }
        }
        if (['object', 'map'].includes(deepSerializedValue.type)) {
            for (const i in bidiValue) {
                bidiValue[i] = [
                    this.serializeForBiDi(bidiValue[i][0], internalIdMap),
                    this.serializeForBiDi(bidiValue[i][1], internalIdMap),
                ];
            }
        }
        return deepSerializedValue;
    }
    get realmId() {
        return this.#realmId;
    }
    get executionContextId() {
        return this.#executionContextId;
    }
    get origin() {
        return this.#origin;
    }
    get source() {
        return {
            realm: this.realmId,
        };
    }
    get cdpClient() {
        return this.#cdpClient;
    }
    get baseInfo() {
        return {
            realm: this.realmId,
            origin: this.origin,
        };
    }
    async evaluate(expression, awaitPromise, resultOwnership = "none" /* Script.ResultOwnership.None */, serializationOptions = {}, userActivation = false, includeCommandLineApi = false) {
        const cdpEvaluateResult = await this.cdpClient.sendCommand('Runtime.evaluate', {
            contextId: this.executionContextId,
            expression,
            awaitPromise,
            serializationOptions: Realm.#getSerializationOptions("deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */, serializationOptions),
            userGesture: userActivation,
            includeCommandLineAPI: includeCommandLineApi,
        });
        if (cdpEvaluateResult.exceptionDetails) {
            return await this.#getExceptionResult(cdpEvaluateResult.exceptionDetails, 0, resultOwnership);
        }
        return {
            realm: this.realmId,
            result: this.cdpToBidiValue(cdpEvaluateResult, resultOwnership),
            type: 'success',
        };
    }
    #registerEvent(event) {
        if (this.associatedBrowsingContexts.length === 0) {
            this.#eventManager.registerGlobalEvent(event);
        }
        else {
            for (const browsingContext of this.associatedBrowsingContexts) {
                this.#eventManager.registerEvent(event, browsingContext.id);
            }
        }
    }
    initialize() {
        if (!this.isHidden()) {
            // Report only not-hidden realms.
            this.#registerEvent({
                type: 'event',
                method: Script.EventNames.RealmCreated,
                params: this.realmInfo,
            });
        }
    }
    /**
     * Serializes a given CDP object into BiDi, keeping references in the
     * target's `globalThis`.
     */
    async serializeCdpObject(cdpRemoteObject, resultOwnership) {
        // TODO: if the object is a primitive, return it directly without CDP roundtrip.
        const argument = Realm.#cdpRemoteObjectToCallArgument(cdpRemoteObject);
        const cdpValue = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((remoteObject) => remoteObject),
            awaitPromise: false,
            arguments: [argument],
            serializationOptions: {
                serialization: "deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */,
            },
            executionContextId: this.executionContextId,
        });
        return this.cdpToBidiValue(cdpValue, resultOwnership);
    }
    static #cdpRemoteObjectToCallArgument(cdpRemoteObject) {
        if (cdpRemoteObject.objectId !== undefined) {
            return { objectId: cdpRemoteObject.objectId };
        }
        if (cdpRemoteObject.unserializableValue !== undefined) {
            return { unserializableValue: cdpRemoteObject.unserializableValue };
        }
        return { value: cdpRemoteObject.value };
    }
    /**
     * Gets the string representation of an object. This is equivalent to
     * calling `toString()` on the object value.
     */
    async stringifyObject(cdpRemoteObject) {
        const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((remoteObject) => String(remoteObject)),
            awaitPromise: false,
            arguments: [cdpRemoteObject],
            returnByValue: true,
            executionContextId: this.executionContextId,
        });
        return result.value;
    }
    async #flattenKeyValuePairs(mappingLocalValue) {
        const keyValueArray = await Promise.all(mappingLocalValue.map(async ([key, value]) => {
            let keyArg;
            if (typeof key === 'string') {
                // Key is a string.
                keyArg = { value: key };
            }
            else {
                // Key is a serialized value.
                keyArg = await this.deserializeForCdp(key);
            }
            const valueArg = await this.deserializeForCdp(value);
            return [keyArg, valueArg];
        }));
        return keyValueArray.flat();
    }
    async #flattenValueList(listLocalValue) {
        return await Promise.all(listLocalValue.map((localValue) => this.deserializeForCdp(localValue)));
    }
    async #serializeCdpExceptionDetails(cdpExceptionDetails, lineOffset, resultOwnership) {
        const callFrames = cdpExceptionDetails.stackTrace?.callFrames.map((frame) => ({
            url: frame.url,
            functionName: frame.functionName,
            lineNumber: frame.lineNumber - lineOffset,
            columnNumber: frame.columnNumber,
        })) ?? [];
        // Exception should always be there.
        const exception = cdpExceptionDetails.exception;
        return {
            exception: await this.serializeCdpObject(exception, resultOwnership),
            columnNumber: cdpExceptionDetails.columnNumber,
            lineNumber: cdpExceptionDetails.lineNumber - lineOffset,
            stackTrace: {
                callFrames,
            },
            text: (await this.stringifyObject(exception)) || cdpExceptionDetails.text,
        };
    }
    async callFunction(functionDeclaration, awaitPromise, thisLocalValue = {
        type: 'undefined',
    }, argumentsLocalValues = [], resultOwnership = "none" /* Script.ResultOwnership.None */, serializationOptions = {}, userActivation = false) {
        const callFunctionAndSerializeScript = `(...args) => {
      function callFunction(f, args) {
        const deserializedThis = args.shift();
        const deserializedArgs = args;
        return f.apply(deserializedThis, deserializedArgs);
      }
      return callFunction((
        ${functionDeclaration}
      ), args);
    }`;
        const thisAndArgumentsList = [
            await this.deserializeForCdp(thisLocalValue),
            ...(await Promise.all(argumentsLocalValues.map(async (argumentLocalValue) => await this.deserializeForCdp(argumentLocalValue)))),
        ];
        let cdpCallFunctionResult;
        try {
            cdpCallFunctionResult = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                functionDeclaration: callFunctionAndSerializeScript,
                awaitPromise,
                arguments: thisAndArgumentsList,
                serializationOptions: Realm.#getSerializationOptions("deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */, serializationOptions),
                executionContextId: this.executionContextId,
                userGesture: userActivation,
            });
        }
        catch (error) {
            // Heuristic to determine if the problem is in the argument.
            // The check can be done on the `deserialization` step, but this approach
            // helps to save round-trips.
            if (error.code === -32e3 /* CdpErrorConstants.GENERIC_ERROR */ &&
                [
                    'Could not find object with given id',
                    'Argument should belong to the same JavaScript world as target object',
                    'Invalid remote object id',
                ].includes(error.message)) {
                throw new NoSuchHandleException('Handle was not found.');
            }
            throw error;
        }
        if (cdpCallFunctionResult.exceptionDetails) {
            return await this.#getExceptionResult(cdpCallFunctionResult.exceptionDetails, 1, resultOwnership);
        }
        return {
            type: 'success',
            result: this.cdpToBidiValue(cdpCallFunctionResult, resultOwnership),
            realm: this.realmId,
        };
    }
    async deserializeForCdp(localValue) {
        if ('handle' in localValue && localValue.handle) {
            return { objectId: localValue.handle };
            // We tried to find a handle value but failed
            // This allows us to have exhaustive switch on `localValue.type`
        }
        else if ('handle' in localValue || 'sharedId' in localValue) {
            throw new NoSuchHandleException('Handle was not found.');
        }
        switch (localValue.type) {
            case 'undefined':
                return { unserializableValue: 'undefined' };
            case 'null':
                return { unserializableValue: 'null' };
            case 'string':
                return { value: localValue.value };
            case 'number':
                if (localValue.value === 'NaN') {
                    return { unserializableValue: 'NaN' };
                }
                else if (localValue.value === '-0') {
                    return { unserializableValue: '-0' };
                }
                else if (localValue.value === 'Infinity') {
                    return { unserializableValue: 'Infinity' };
                }
                else if (localValue.value === '-Infinity') {
                    return { unserializableValue: '-Infinity' };
                }
                return {
                    value: localValue.value,
                };
            case 'boolean':
                return { value: Boolean(localValue.value) };
            case 'bigint':
                return {
                    unserializableValue: `BigInt(${JSON.stringify(localValue.value)})`,
                };
            case 'date':
                return {
                    unserializableValue: `new Date(Date.parse(${JSON.stringify(localValue.value)}))`,
                };
            case 'regexp':
                return {
                    unserializableValue: `new RegExp(${JSON.stringify(localValue.value.pattern)}, ${JSON.stringify(localValue.value.flags)})`,
                };
            case 'map': {
                // TODO: If none of the nested keys and values has a remote
                // reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = await this.#flattenKeyValuePairs(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => {
                        const result = new Map();
                        for (let i = 0; i < args.length; i += 2) {
                            result.set(args[i], args[i + 1]);
                        }
                        return result;
                    }),
                    awaitPromise: false,
                    arguments: keyValueArray,
                    returnByValue: false,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'object': {
                // TODO: If none of the nested keys and values has a remote
                // reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = await this.#flattenKeyValuePairs(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => {
                        const result = {};
                        for (let i = 0; i < args.length; i += 2) {
                            // Key should be either `string`, `number`, or `symbol`.
                            const key = args[i];
                            result[key] = args[i + 1];
                        }
                        return result;
                    }),
                    awaitPromise: false,
                    arguments: keyValueArray,
                    returnByValue: false,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'array': {
                // TODO: If none of the nested items has a remote reference,
                // serialize to `unserializableValue` without CDP roundtrip.
                const args = await this.#flattenValueList(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => args),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'set': {
                // TODO: if none of the nested items has a remote reference,
                // serialize to `unserializableValue` without CDP roundtrip.
                const args = await this.#flattenValueList(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => new Set(args)),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'channel': {
                const channelProxy = new ChannelProxy(localValue.value, this.#logger);
                const channelProxySendMessageHandle = await channelProxy.init(this, this.#eventManager);
                return { objectId: channelProxySendMessageHandle };
            }
            // TODO(#375): Dispose of nested objects.
        }
        // Intentionally outside to handle unknown types
        throw new Error(`Value ${JSON.stringify(localValue)} is not deserializable.`);
    }
    async #getExceptionResult(exceptionDetails, lineOffset, resultOwnership) {
        return {
            exceptionDetails: await this.#serializeCdpExceptionDetails(exceptionDetails, lineOffset, resultOwnership),
            realm: this.realmId,
            type: 'exception',
        };
    }
    static #getSerializationOptions(serialization, serializationOptions) {
        return {
            serialization,
            additionalParameters: Realm.#getAdditionalSerializationParameters(serializationOptions),
            ...Realm.#getMaxObjectDepth(serializationOptions),
        };
    }
    static #getAdditionalSerializationParameters(serializationOptions) {
        const additionalParameters = {};
        if (serializationOptions.maxDomDepth !== undefined) {
            additionalParameters['maxNodeDepth'] =
                serializationOptions.maxDomDepth === null
                    ? 1000
                    : serializationOptions.maxDomDepth;
        }
        if (serializationOptions.includeShadowTree !== undefined) {
            additionalParameters['includeShadowTree'] =
                serializationOptions.includeShadowTree;
        }
        return additionalParameters;
    }
    static #getMaxObjectDepth(serializationOptions) {
        return serializationOptions.maxObjectDepth === undefined ||
            serializationOptions.maxObjectDepth === null
            ? {}
            : { maxDepth: serializationOptions.maxObjectDepth };
    }
    async #releaseObject(handle) {
        try {
            await this.cdpClient.sendCommand('Runtime.releaseObject', {
                objectId: handle,
            });
        }
        catch (error) {
            // Heuristic to determine if the problem is in the unknown handler.
            // Ignore the error if so.
            if (!(error.code === -32e3 /* CdpErrorConstants.GENERIC_ERROR */ &&
                error.message === 'Invalid remote object id')) {
                throw error;
            }
        }
    }
    async disown(handle) {
        // Disowning an object from different realm does nothing.
        if (this.realmStorage.knownHandlesToRealmMap.get(handle) !== this.realmId) {
            return;
        }
        await this.#releaseObject(handle);
        this.realmStorage.knownHandlesToRealmMap.delete(handle);
    }
    dispose() {
        if (!this.isHidden()) {
            this.#registerEvent({
                type: 'event',
                method: Script.EventNames.RealmDestroyed,
                params: {
                    realm: this.realmId,
                },
            });
        }
    }
}

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
class WindowRealm extends Realm {
    #browsingContextId;
    #browsingContextStorage;
    sandbox;
    constructor(browsingContextId, browsingContextStorage, cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage, sandbox) {
        super(cdpClient, eventManager, executionContextId, logger, origin, realmId, realmStorage);
        this.#browsingContextId = browsingContextId;
        this.#browsingContextStorage = browsingContextStorage;
        this.sandbox = sandbox;
        this.initialize();
    }
    #getBrowsingContextId(navigableId) {
        const maybeBrowsingContext = this.#browsingContextStorage
            .getAllContexts()
            .find((context) => context.navigableId === navigableId);
        return maybeBrowsingContext?.id ?? 'UNKNOWN';
    }
    get browsingContext() {
        return this.#browsingContextStorage.getContext(this.#browsingContextId);
    }
    /**
     * Do not expose to user hidden realms.
     */
    isHidden() {
        return this.realmStorage.hiddenSandboxes.has(this.sandbox);
    }
    get associatedBrowsingContexts() {
        return [this.browsingContext];
    }
    get realmType() {
        return 'window';
    }
    get realmInfo() {
        return {
            ...this.baseInfo,
            type: this.realmType,
            context: this.#browsingContextId,
            sandbox: this.sandbox,
        };
    }
    get source() {
        return {
            realm: this.realmId,
            context: this.browsingContext.id,
        };
    }
    serializeForBiDi(deepSerializedValue, internalIdMap) {
        const bidiValue = deepSerializedValue.value;
        if (deepSerializedValue.type === 'node' && bidiValue !== undefined) {
            if (Object.hasOwn(bidiValue, 'backendNodeId')) {
                let navigableId = this.browsingContext.navigableId ?? 'UNKNOWN';
                if (Object.hasOwn(bidiValue, 'loaderId')) {
                    // `loaderId` should be always there after ~2024-03-05, when
                    // https://crrev.com/c/5116240 reaches stable.
                    // TODO: remove the check after the date.
                    navigableId = bidiValue.loaderId;
                    delete bidiValue['loaderId'];
                }
                deepSerializedValue.sharedId =
                    getSharedId(this.#getBrowsingContextId(navigableId), navigableId, bidiValue.backendNodeId);
                delete bidiValue['backendNodeId'];
            }
            if (Object.hasOwn(bidiValue, 'children')) {
                for (const i in bidiValue.children) {
                    bidiValue.children[i] = this.serializeForBiDi(bidiValue.children[i], internalIdMap);
                }
            }
            if (Object.hasOwn(bidiValue, 'shadowRoot') &&
                bidiValue.shadowRoot !== null) {
                bidiValue.shadowRoot = this.serializeForBiDi(bidiValue.shadowRoot, internalIdMap);
            }
            // `namespaceURI` can be is either `null` or non-empty string.
            if (bidiValue.namespaceURI === '') {
                bidiValue.namespaceURI = null;
            }
        }
        return super.serializeForBiDi(deepSerializedValue, internalIdMap);
    }
    async deserializeForCdp(localValue) {
        if ('sharedId' in localValue && localValue.sharedId) {
            const parsedSharedId = parseSharedId(localValue.sharedId);
            if (parsedSharedId === null) {
                throw new NoSuchNodeException(`SharedId "${localValue.sharedId}" was not found.`);
            }
            const { documentId, backendNodeId } = parsedSharedId;
            // TODO: add proper validation if the element is accessible from the current realm.
            if (this.browsingContext.navigableId !== documentId) {
                throw new NoSuchNodeException(`SharedId "${localValue.sharedId}" belongs to different document. Current document is ${this.browsingContext.navigableId}.`);
            }
            try {
                const { object } = await this.cdpClient.sendCommand('DOM.resolveNode', {
                    backendNodeId,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `obj.object.objectId` after using.
                return { objectId: object.objectId };
            }
            catch (error) {
                // Heuristic to detect "no such node" exception. Based on the  specific
                // CDP implementation.
                if (error.code === -32e3 /* CdpErrorConstants.GENERIC_ERROR */ &&
                    error.message === 'No node with given id found') {
                    throw new NoSuchNodeException(`SharedId "${localValue.sharedId}" was not found.`);
                }
                throw new UnknownErrorException(error.message, error.stack);
            }
        }
        return await super.deserializeForCdp(localValue);
    }
    async evaluate(expression, awaitPromise, resultOwnership, serializationOptions, userActivation, includeCommandLineApi) {
        await this.#browsingContextStorage
            .getContext(this.#browsingContextId)
            .targetUnblockedOrThrow();
        return await super.evaluate(expression, awaitPromise, resultOwnership, serializationOptions, userActivation, includeCommandLineApi);
    }
    async callFunction(functionDeclaration, awaitPromise, thisLocalValue, argumentsLocalValues, resultOwnership, serializationOptions, userActivation) {
        await this.#browsingContextStorage
            .getContext(this.#browsingContextId)
            .targetUnblockedOrThrow();
        return await super.callFunction(functionDeclaration, awaitPromise, thisLocalValue, argumentsLocalValues, resultOwnership, serializationOptions, userActivation);
    }
}

/*
 *  Copyright 2024 Google LLC.
 *  Copyright (c) Microsoft Corporation.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
/**
 * A URL matches about:blank if its scheme is "about", its path contains a single string
 * "blank", its username and password are the empty string, and its host is null.
 * https://html.spec.whatwg.org/multipage/urls-and-fetching.html#matches-about:blank
 * @param {string} url
 * @return {boolean}
 */
function urlMatchesAboutBlank(url) {
    // An empty string is a special case, and considered to be about:blank.
    // https://html.spec.whatwg.org/multipage/nav-history-apis.html#window-open-steps
    if (url === '') {
        return true;
    }
    try {
        const parsedUrl = new URL(url);
        const schema = parsedUrl.protocol.replace(/:$/, '');
        return (schema.toLowerCase() === 'about' &&
            parsedUrl.pathname.toLowerCase() === 'blank' &&
            parsedUrl.username === '' &&
            parsedUrl.password === '' &&
            parsedUrl.host === '');
    }
    catch (err) {
        // Wrong URL considered do not match about:blank.
        if (err instanceof TypeError) {
            return false;
        }
        // Re-throw other unexpected errors.
        throw err;
    }
}

/*
 *  Copyright 2024 Google LLC.
 *  Copyright (c) Microsoft Corporation.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
class NavigationResult {
    eventName;
    message;
    constructor(eventName, message) {
        this.eventName = eventName;
        this.message = message;
    }
}
class NavigationState {
    navigationId = uuidv4();
    #browsingContextId;
    #started = false;
    #finished = new Deferred();
    url;
    loaderId;
    #isInitial;
    #eventManager;
    committed = new Deferred();
    isFragmentNavigation;
    get finished() {
        return this.#finished;
    }
    constructor(url, browsingContextId, isInitial, eventManager) {
        this.#browsingContextId = browsingContextId;
        this.url = url;
        this.#isInitial = isInitial;
        this.#eventManager = eventManager;
    }
    navigationInfo() {
        return {
            context: this.#browsingContextId,
            navigation: this.navigationId,
            timestamp: getTimestamp(),
            url: this.url,
        };
    }
    start() {
        if (
        // Initial navigation should not be reported.
        !this.#isInitial &&
            // No need in reporting started navigation twice.
            !this.#started &&
            // No need for reporting fragment navigations. Step 13 vs step 16 of the spec:
            // https://html.spec.whatwg.org/#beginning-navigation:webdriver-bidi-navigation-started
            !this.isFragmentNavigation) {
            this.#eventManager.registerEvent({
                type: 'event',
                method: BrowsingContext.EventNames.NavigationStarted,
                params: this.navigationInfo(),
            }, this.#browsingContextId);
        }
        this.#started = true;
    }
    #finish(navigationResult) {
        this.#started = true;
        if (!this.#isInitial &&
            !this.#finished.isFinished &&
            navigationResult.eventName !== "browsingContext.load" /* NavigationEventName.Load */) {
            this.#eventManager.registerEvent({
                type: 'event',
                method: navigationResult.eventName,
                params: this.navigationInfo(),
            }, this.#browsingContextId);
        }
        this.#finished.resolve(navigationResult);
    }
    frameNavigated() {
        this.committed.resolve();
        if (!this.#isInitial) {
            this.#eventManager.registerEvent({
                type: 'event',
                method: BrowsingContext.EventNames.NavigationCommitted,
                params: this.navigationInfo(),
            }, this.#browsingContextId);
        }
    }
    fragmentNavigated() {
        this.committed.resolve();
        this.#finish(new NavigationResult("browsingContext.fragmentNavigated" /* NavigationEventName.FragmentNavigated */));
    }
    load() {
        this.#finish(new NavigationResult("browsingContext.load" /* NavigationEventName.Load */));
    }
    fail(message) {
        this.#finish(new NavigationResult(this.committed.isFinished
            ? "browsingContext.navigationAborted" /* NavigationEventName.NavigationAborted */
            : "browsingContext.navigationFailed" /* NavigationEventName.NavigationFailed */, message));
    }
}
/**
 * Keeps track of navigations. Details: http://go/webdriver:bidi-navigation
 */
class NavigationTracker {
    #eventManager;
    #logger;
    #loaderIdToNavigationsMap = new Map();
    #browsingContextId;
    /**
     * Last committed navigation is committed, but is not guaranteed to be finished, as it
     * can still wait for `load` or `DOMContentLoaded` events.
     */
    #lastCommittedNavigation;
    /**
     * Pending navigation is a navigation that is started but not yet committed.
     */
    #pendingNavigation;
    // Flags if the initial navigation to `about:blank` is in progress.
    #isInitialNavigation = true;
    constructor(url, browsingContextId, eventManager, logger) {
        this.#browsingContextId = browsingContextId;
        this.#eventManager = eventManager;
        this.#logger = logger;
        this.#isInitialNavigation = true;
        // The initial navigation is always committed.
        this.#lastCommittedNavigation = new NavigationState(url, browsingContextId, urlMatchesAboutBlank(url), this.#eventManager);
    }
    /**
     * Returns current started ongoing navigation. It can be either a started pending
     * navigation, or one is already navigated.
     */
    get currentNavigationId() {
        if (this.#pendingNavigation?.isFragmentNavigation === false) {
            // Use pending navigation if it is started and it is not a fragment navigation.
            return this.#pendingNavigation.navigationId;
        }
        // If the pending navigation is a fragment one, or if it is not exists, the last
        // committed navigation should be used.
        return this.#lastCommittedNavigation.navigationId;
    }
    /**
     * Flags if the current navigation relates to the initial to `about:blank` navigation.
     */
    get isInitialNavigation() {
        return this.#isInitialNavigation;
    }
    /**
     * Url of the last navigated navigation.
     */
    get url() {
        return this.#lastCommittedNavigation.url;
    }
    /**
     * Creates a pending navigation e.g. when navigation command is called. Required to
     * provide navigation id before the actual navigation is started. It will be used when
     * navigation started. Can be aborted, failed, fragment navigated, or became a current
     * navigation.
     */
    createPendingNavigation(url, canBeInitialNavigation = false) {
        this.#logger?.(LogType.debug, 'createCommandNavigation');
        this.#isInitialNavigation =
            canBeInitialNavigation &&
                this.#isInitialNavigation &&
                urlMatchesAboutBlank(url);
        this.#pendingNavigation?.fail('navigation canceled by concurrent navigation');
        const navigation = new NavigationState(url, this.#browsingContextId, this.#isInitialNavigation, this.#eventManager);
        this.#pendingNavigation = navigation;
        return navigation;
    }
    dispose() {
        this.#pendingNavigation?.fail('navigation canceled by context disposal');
        this.#lastCommittedNavigation.fail('navigation canceled by context disposal');
    }
    // Update the current url.
    onTargetInfoChanged(url) {
        this.#logger?.(LogType.debug, `onTargetInfoChanged ${url}`);
        this.#lastCommittedNavigation.url = url;
    }
    #getNavigationForFrameNavigated(url, loaderId) {
        if (this.#loaderIdToNavigationsMap.has(loaderId)) {
            return this.#loaderIdToNavigationsMap.get(loaderId);
        }
        if (this.#pendingNavigation !== undefined &&
            this.#pendingNavigation.loaderId === undefined) {
            // This can be a pending navigation to `about:blank` created by a command. Use the
            // pending navigation in this case.
            return this.#pendingNavigation;
        }
        // Create a new pending navigation.
        return this.createPendingNavigation(url, true);
    }
    /**
     * @param {string} unreachableUrl indicated the navigation is actually failed.
     */
    frameNavigated(url, loaderId, unreachableUrl) {
        this.#logger?.(LogType.debug, `frameNavigated ${url}`);
        if (unreachableUrl !== undefined) {
            // The navigation failed.
            const navigation = this.#loaderIdToNavigationsMap.get(loaderId) ??
                this.#pendingNavigation ??
                this.createPendingNavigation(unreachableUrl, true);
            navigation.url = unreachableUrl;
            navigation.start();
            navigation.fail('the requested url is unreachable');
            return;
        }
        const navigation = this.#getNavigationForFrameNavigated(url, loaderId);
        if (navigation !== this.#lastCommittedNavigation) {
            // Even though the `lastCommittedNavigation` is navigated, it still can be waiting
            // for `load` or `DOMContentLoaded` events.
            this.#lastCommittedNavigation.fail('navigation canceled by concurrent navigation');
        }
        navigation.url = url;
        navigation.loaderId = loaderId;
        this.#loaderIdToNavigationsMap.set(loaderId, navigation);
        navigation.start();
        navigation.frameNavigated();
        this.#lastCommittedNavigation = navigation;
        if (this.#pendingNavigation === navigation) {
            this.#pendingNavigation = undefined;
        }
    }
    navigatedWithinDocument(url, navigationType) {
        this.#logger?.(LogType.debug, `navigatedWithinDocument ${url}, ${navigationType}`);
        // Current navigation URL should be updated.
        this.#lastCommittedNavigation.url = url;
        if (navigationType !== 'fragment') {
            // TODO: check for other navigation types, like `javascript`.
            return;
        }
        // There is no way to map `navigatedWithinDocument` to a specific navigation. Consider
        // it is the pending navigation, if it is a fragment one.
        const fragmentNavigation = this.#pendingNavigation?.isFragmentNavigation === true
            ? this.#pendingNavigation
            : new NavigationState(url, this.#browsingContextId, false, this.#eventManager);
        // Finish ongoing navigation.
        fragmentNavigation.fragmentNavigated();
        if (fragmentNavigation === this.#pendingNavigation) {
            this.#pendingNavigation = undefined;
        }
    }
    /**
     * Required to mark navigation as fully complete.
     * TODO: navigation should be complete when it became the current one on
     * `Page.frameNavigated` or on navigating command finished with a new loader Id.
     */
    loadPageEvent(loaderId) {
        this.#logger?.(LogType.debug, 'loadPageEvent');
        // Even if it was an initial navigation, it is finished.
        this.#isInitialNavigation = false;
        this.#loaderIdToNavigationsMap.get(loaderId)?.load();
    }
    /**
     * Fail navigation due to navigation command failed.
     */
    failNavigation(navigation, errorText) {
        this.#logger?.(LogType.debug, 'failCommandNavigation');
        navigation.fail(errorText);
    }
    /**
     * Updates the navigation's `loaderId` and sets it as current one, if it is a
     * cross-document navigation.
     */
    navigationCommandFinished(navigation, loaderId) {
        this.#logger?.(LogType.debug, `finishCommandNavigation ${navigation.navigationId}, ${loaderId}`);
        if (loaderId !== undefined) {
            navigation.loaderId = loaderId;
            this.#loaderIdToNavigationsMap.set(loaderId, navigation);
        }
        navigation.isFragmentNavigation = loaderId === undefined;
    }
    frameStartedNavigating(url, loaderId, navigationType) {
        this.#logger?.(LogType.debug, `frameStartedNavigating ${url}, ${loaderId}`);
        if (this.#pendingNavigation &&
            this.#pendingNavigation?.loaderId !== undefined &&
            this.#pendingNavigation?.loaderId !== loaderId) {
            // If there is a pending navigation with loader id set, but not equal to the new
            // loader id, cancel pending navigation.
            this.#pendingNavigation?.fail('navigation canceled by concurrent navigation');
            this.#pendingNavigation = undefined;
        }
        if (this.#loaderIdToNavigationsMap.has(loaderId)) {
            const existingNavigation = this.#loaderIdToNavigationsMap.get(loaderId);
            // Navigation can be changed from `sameDocument` to `differentDocument`.
            existingNavigation.isFragmentNavigation =
                NavigationTracker.#isFragmentNavigation(navigationType);
            this.#pendingNavigation = existingNavigation;
            return;
        }
        const pendingNavigation = this.#pendingNavigation ?? this.createPendingNavigation(url, true);
        this.#loaderIdToNavigationsMap.set(loaderId, pendingNavigation);
        pendingNavigation.isFragmentNavigation =
            NavigationTracker.#isFragmentNavigation(navigationType);
        pendingNavigation.url = url;
        pendingNavigation.loaderId = loaderId;
        pendingNavigation.start();
    }
    static #isFragmentNavigation(navigationType) {
        // Page.frameStartedNavigating.navigationType can be one of the following values:
        // reload, reloadBypassingCache, restore, restoreWithPost, historySameDocument,
        // historyDifferentDocument, sameDocument, differentDocument.
        // https://chromedevtools.github.io/devtools-protocol/tot/Page/#event-frameStartedNavigating
        return ['historySameDocument', 'sameDocument'].includes(navigationType);
    }
    /**
     * If there is a navigation with the loaderId equals to the network request id, it means
     * that the navigation failed.
     */
    networkLoadingFailed(loaderId, errorText) {
        this.#loaderIdToNavigationsMap.get(loaderId)?.fail(errorText);
    }
}

export { Deferred as D, NavigationTracker as N, Realm as R, WindowRealm as W, getTimestamp as a, NavigationResult as b, getSharedId as g, inchesFromCm as i, parseSharedId as p };
