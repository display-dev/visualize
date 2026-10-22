// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { L as Log, I as InvalidArgumentException, w as NoSuchNetworkCollectorException, a as UnsupportedOperationException } from './chunk-035.mjs';
import { L as LogType } from './chunk-038.mjs';
import { a as assert } from './chunk-037.mjs';
import { u as uuidv4 } from './chunk-039.mjs';

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
const specifiers = ['%s', '%d', '%i', '%f', '%o', '%O', '%c'];
function isFormatSpecifier(str) {
    return specifiers.some((spec) => str.includes(spec));
}
/**
 * @param args input remote values to be format printed
 * @return parsed text of the remote values in specific format
 */
function logMessageFormatter(args) {
    let output = '';
    const argFormat = args[0].value.toString();
    const argValues = args.slice(1, undefined);
    const tokens = argFormat.split(new RegExp(specifiers.map((spec) => `(${spec})`).join('|'), 'g'));
    for (const token of tokens) {
        if (token === undefined || token === '') {
            continue;
        }
        if (isFormatSpecifier(token)) {
            const arg = argValues.shift();
            // raise an exception when less value is provided
            assert(arg, `Less value is provided: "${getRemoteValuesText(args, false)}"`);
            if (token === '%s') {
                output += stringFromArg(arg);
            }
            else if (token === '%d' || token === '%i') {
                if (arg.type === 'bigint' ||
                    arg.type === 'number' ||
                    arg.type === 'string') {
                    output += parseInt(arg.value.toString(), 10);
                }
                else {
                    output += 'NaN';
                }
            }
            else if (token === '%f') {
                if (arg.type === 'bigint' ||
                    arg.type === 'number' ||
                    arg.type === 'string') {
                    output += parseFloat(arg.value.toString());
                }
                else {
                    output += 'NaN';
                }
            }
            else {
                // %o, %O, %c
                output += toJson(arg);
            }
        }
        else {
            output += token;
        }
    }
    // raise an exception when more value is provided
    if (argValues.length > 0) {
        throw new Error(`More value is provided: "${getRemoteValuesText(args, false)}"`);
    }
    return output;
}
/**
 * @param arg input remote value to be parsed
 * @return parsed text of the remote value
 *
 * input: {"type": "number", "value": 1}
 * output: 1
 *
 * input: {"type": "string", "value": "abc"}
 * output: "abc"
 *
 * input: {"type": "object",  "value": [["id", {"type": "number", "value": 1}]]}
 * output: '{"id": 1}'
 *
 * input: {"type": "object", "value": [["font-size", {"type": "string", "value": "20px"}]]}
 * output: '{"font-size": "20px"}'
 */
function toJson(arg) {
    // arg type validation
    if (arg.type !== 'array' &&
        arg.type !== 'bigint' &&
        arg.type !== 'date' &&
        arg.type !== 'number' &&
        arg.type !== 'object' &&
        arg.type !== 'string') {
        return stringFromArg(arg);
    }
    if (arg.type === 'bigint') {
        return `${arg.value.toString()}n`;
    }
    if (arg.type === 'number') {
        return arg.value.toString();
    }
    if (['date', 'string'].includes(arg.type)) {
        return JSON.stringify(arg.value);
    }
    if (arg.type === 'object') {
        return `{${arg.value
            .map((pair) => {
            return `${JSON.stringify(pair[0])}:${toJson(pair[1])}`;
        })
            .join(',')}}`;
    }
    if (arg.type === 'array') {
        return `[${arg.value?.map((val) => toJson(val)).join(',') ?? ''}]`;
    }
    throw Error(`Invalid value type: ${arg}`);
}
function stringFromArg(arg) {
    if (!Object.hasOwn(arg, 'value')) {
        return arg.type;
    }
    switch (arg.type) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'bigint':
            return String(arg.value);
        case 'regexp':
            return `/${arg.value.pattern}/${arg.value.flags ?? ''}`;
        case 'date':
            return new Date(arg.value).toString();
        case 'object':
            return `Object(${arg.value?.length ?? ''})`;
        case 'array':
            return `Array(${arg.value?.length ?? ''})`;
        case 'map':
            return `Map(${arg.value?.length})`;
        case 'set':
            return `Set(${arg.value?.length})`;
        default:
            return arg.type;
    }
}
function getRemoteValuesText(args, formatText) {
    const arg = args[0];
    if (!arg) {
        return '';
    }
    // if args[0] is a format specifier, format the args as output
    if (arg.type === 'string' &&
        isFormatSpecifier(arg.value.toString()) &&
        formatText) {
        return logMessageFormatter(args);
    }
    // if args[0] is not a format specifier, just join the args with \u0020 (unicode 'SPACE')
    return args
        .map((arg) => {
        return stringFromArg(arg);
    })
        .join('\u0020');
}

var _a;
/** Converts CDP StackTrace object to BiDi StackTrace object. */
function getBidiStackTrace(cdpStackTrace) {
    const stackFrames = cdpStackTrace?.callFrames.map((callFrame) => {
        return {
            columnNumber: callFrame.columnNumber,
            functionName: callFrame.functionName,
            lineNumber: callFrame.lineNumber,
            url: callFrame.url,
        };
    });
    return stackFrames ? { callFrames: stackFrames } : undefined;
}
function getLogLevel(consoleApiType) {
    if (["error" /* Log.Level.Error */, 'assert'].includes(consoleApiType)) {
        return "error" /* Log.Level.Error */;
    }
    if (["debug" /* Log.Level.Debug */, 'trace'].includes(consoleApiType)) {
        return "debug" /* Log.Level.Debug */;
    }
    if (["warn" /* Log.Level.Warn */, 'warning'].includes(consoleApiType)) {
        return "warn" /* Log.Level.Warn */;
    }
    return "info" /* Log.Level.Info */;
}
function getLogMethod(consoleApiType) {
    switch (consoleApiType) {
        case 'warning':
            return 'warn';
        case 'startGroup':
            return 'group';
        case 'startGroupCollapsed':
            return 'groupCollapsed';
        case 'endGroup':
            return 'groupEnd';
    }
    return consoleApiType;
}
class LogManager {
    #eventManager;
    #realmStorage;
    #cdpTarget;
    #logger;
    constructor(cdpTarget, realmStorage, eventManager, logger) {
        this.#cdpTarget = cdpTarget;
        this.#realmStorage = realmStorage;
        this.#eventManager = eventManager;
        this.#logger = logger;
    }
    static create(cdpTarget, realmStorage, eventManager, logger) {
        const logManager = new _a(cdpTarget, realmStorage, eventManager, logger);
        logManager.#initializeEntryAddedEventListener();
        return logManager;
    }
    /**
     * Heuristic serialization of CDP remote object. If possible, return the BiDi value
     * without deep serialization.
     */
    async #heuristicSerializeArg(arg, realm) {
        switch (arg.type) {
            // TODO: Implement regexp, array, object, map and set heuristics base on
            //  preview.
            case 'undefined':
                return { type: 'undefined' };
            case 'boolean':
                return { type: 'boolean', value: arg.value };
            case 'string':
                return { type: 'string', value: arg.value };
            case 'number':
                // The value can be either a number or a string like `Infinity` or `-0`.
                return { type: 'number', value: arg.unserializableValue ?? arg.value };
            case 'bigint':
                if (arg.unserializableValue !== undefined &&
                    arg.unserializableValue[arg.unserializableValue.length - 1] === 'n') {
                    return {
                        type: arg.type,
                        value: arg.unserializableValue.slice(0, -1),
                    };
                }
                // Unexpected bigint value, fall back to CDP deep serialization.
                break;
            case 'object':
                if (arg.subtype === 'null') {
                    return { type: 'null' };
                }
                // Fall back to CDP deep serialization.
                break;
        }
        // Fall back to CDP deep serialization.
        return await realm.serializeCdpObject(arg, "none" /* Script.ResultOwnership.None */);
    }
    #initializeEntryAddedEventListener() {
        this.#cdpTarget.cdpClient.on('Runtime.consoleAPICalled', (params) => {
            // Try to find realm by `cdpSessionId` and `executionContextId`,
            // if provided.
            const realm = this.#realmStorage.findRealm({
                cdpSessionId: this.#cdpTarget.cdpSessionId,
                executionContextId: params.executionContextId,
            });
            if (realm === undefined) {
                // Ignore exceptions not attached to any realm.
                this.#logger?.(LogType.cdp, params);
                return;
            }
            const argsPromise = Promise.all(params.args.map((arg) => this.#heuristicSerializeArg(arg, realm)));
            for (const browsingContext of realm.associatedBrowsingContexts) {
                this.#eventManager.registerPromiseEvent(argsPromise.then((args) => ({
                    kind: 'success',
                    value: {
                        type: 'event',
                        method: Log.EventNames.LogEntryAdded,
                        params: {
                            level: getLogLevel(params.type),
                            source: realm.source,
                            text: getRemoteValuesText(args, true),
                            timestamp: Math.round(params.timestamp),
                            stackTrace: getBidiStackTrace(params.stackTrace),
                            type: 'console',
                            method: getLogMethod(params.type),
                            args,
                        },
                    },
                }), (error) => ({
                    kind: 'error',
                    error,
                })), browsingContext.id, Log.EventNames.LogEntryAdded);
            }
        });
        this.#cdpTarget.cdpClient.on('Runtime.exceptionThrown', (params) => {
            // Try to find realm by `cdpSessionId` and `executionContextId`,
            // if provided.
            const realm = this.#realmStorage.findRealm({
                cdpSessionId: this.#cdpTarget.cdpSessionId,
                executionContextId: params.exceptionDetails.executionContextId,
            });
            if (realm === undefined) {
                // Ignore exceptions not attached to any realm.
                this.#logger?.(LogType.cdp, params);
                return;
            }
            for (const browsingContext of realm.associatedBrowsingContexts) {
                this.#eventManager.registerPromiseEvent(_a.#getExceptionText(params, realm).then((text) => ({
                    kind: 'success',
                    value: {
                        type: 'event',
                        method: Log.EventNames.LogEntryAdded,
                        params: {
                            level: "error" /* Log.Level.Error */,
                            source: realm.source,
                            text,
                            timestamp: Math.round(params.timestamp),
                            stackTrace: getBidiStackTrace(params.exceptionDetails.stackTrace),
                            type: 'javascript',
                        },
                    },
                }), (error) => ({
                    kind: 'error',
                    error,
                })), browsingContext.id, Log.EventNames.LogEntryAdded);
            }
        });
    }
    /**
     * Try the best to get the exception text.
     */
    static async #getExceptionText(params, realm) {
        if (!params.exceptionDetails.exception) {
            return params.exceptionDetails.text;
        }
        if (realm === undefined) {
            return JSON.stringify(params.exceptionDetails.exception);
        }
        return await realm.stringifyObject(params.exceptionDetails.exception);
    }
}
_a = LogManager;

/*
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
class CollectorsStorage {
    #collectors = new Map();
    #responseCollectors = new Map();
    #requestBodyCollectors = new Map();
    #maxEncodedDataSize;
    #logger;
    constructor(maxEncodedDataSize, logger) {
        this.#maxEncodedDataSize = maxEncodedDataSize;
        this.#logger = logger;
    }
    addDataCollector(params) {
        if (params.maxEncodedDataSize < 1 ||
            params.maxEncodedDataSize > this.#maxEncodedDataSize) {
            // 200 MB is the default limit in CDP:
            // https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/inspector/inspector_network_agent.cc;drc=da1f749634c9a401cc756f36c2e6ce233e1c9b4d;l=133
            throw new InvalidArgumentException(`Max encoded data size should be between 1 and ${this.#maxEncodedDataSize}`);
        }
        const collectorId = uuidv4();
        this.#collectors.set(collectorId, params);
        return collectorId;
    }
    isCollected(requestId, dataType, collectorId) {
        if (collectorId !== undefined && !this.#collectors.has(collectorId)) {
            throw new NoSuchNetworkCollectorException(`Unknown collector ${collectorId}`);
        }
        if (dataType === undefined) {
            return (this.isCollected(requestId, "response" /* Network.DataType.Response */, collectorId) ||
                this.isCollected(requestId, "request" /* Network.DataType.Request */, collectorId));
        }
        const requestToCollectorsMap = this.#getRequestToCollectorMap(dataType).get(requestId);
        if (requestToCollectorsMap === undefined ||
            requestToCollectorsMap.size === 0) {
            return false;
        }
        if (collectorId === undefined) {
            // There is at least 1 collector for the data.
            return true;
        }
        if (!requestToCollectorsMap.has(collectorId)) {
            return false;
        }
        return true;
    }
    #getRequestToCollectorMap(dataType) {
        switch (dataType) {
            case "response" /* Network.DataType.Response */:
                return this.#responseCollectors;
            case "request" /* Network.DataType.Request */:
                return this.#requestBodyCollectors;
            default:
                throw new UnsupportedOperationException(`Unsupported data type ${dataType}`);
        }
    }
    disownData(requestId, dataType, collectorId) {
        const requestToCollectorsMap = this.#getRequestToCollectorMap(dataType);
        if (collectorId !== undefined) {
            requestToCollectorsMap.get(requestId)?.delete(collectorId);
        }
        if (collectorId === undefined ||
            requestToCollectorsMap.get(requestId)?.size === 0) {
            requestToCollectorsMap.delete(requestId);
        }
    }
    #shouldCollectRequest(collectorId, request, dataType, topLevelBrowsingContext, userContext) {
        const collector = this.#collectors.get(collectorId);
        if (collector === undefined) {
            throw new NoSuchNetworkCollectorException(`Unknown collector ${collectorId}`);
        }
        if (collector.userContexts &&
            !collector.userContexts.includes(userContext)) {
            // Collector is aimed for a different user context.
            return false;
        }
        if (collector.contexts &&
            !collector.contexts.includes(topLevelBrowsingContext)) {
            // Collector is aimed for a different top-level browsing context.
            return false;
        }
        if (!collector.dataTypes.includes(dataType)) {
            // Collector is aimed for a different data type.
            return false;
        }
        if (dataType === "request" /* Network.DataType.Request */ &&
            request.bodySize > collector.maxEncodedDataSize) {
            this.#logger?.(LogType.debug, `Request's ${request.id} body size is too big for the collector ${collectorId}`);
            return false;
        }
        if (dataType === "response" /* Network.DataType.Response */ &&
            request.encodedResponseBodySize > collector.maxEncodedDataSize) {
            this.#logger?.(LogType.debug, `Request's ${request.id} response is too big for the collector ${collectorId}`);
            return false;
        }
        this.#logger?.(LogType.debug, `Collector ${collectorId} collected ${dataType} of ${request.id}`);
        return true;
    }
    collectIfNeeded(request, dataType, topLevelBrowsingContext, userContext) {
        const collectorIds = [...this.#collectors.keys()].filter((collectorId) => this.#shouldCollectRequest(collectorId, request, dataType, topLevelBrowsingContext, userContext));
        if (collectorIds.length > 0) {
            this.#getRequestToCollectorMap(dataType).set(request.id, new Set(collectorIds));
        }
    }
    removeDataCollector(collectorId) {
        if (!this.#collectors.has(collectorId)) {
            throw new NoSuchNetworkCollectorException(`Collector ${collectorId} does not exist`);
        }
        this.#collectors.delete(collectorId);
        const affectedRequests = [];
        // Clean up collected responses.
        for (const [requestId, collectorIds] of this.#responseCollectors) {
            if (collectorIds.has(collectorId)) {
                collectorIds.delete(collectorId);
                if (collectorIds.size === 0) {
                    this.#responseCollectors.delete(requestId);
                    affectedRequests.push(requestId);
                }
            }
        }
        for (const [requestId, collectorIds] of this.#requestBodyCollectors) {
            if (collectorIds.has(collectorId)) {
                collectorIds.delete(collectorId);
                if (collectorIds.size === 0) {
                    this.#requestBodyCollectors.delete(requestId);
                    affectedRequests.push(requestId);
                }
            }
        }
        return affectedRequests;
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
 * A subclass of Map whose functionality is almost the same as its parent
 * except for the fact that DefaultMap never returns undefined. It provides a
 * default value for keys that do not exist.
 */
class DefaultMap extends Map {
    /** The default value to return whenever a key is not present in the map. */
    #getDefaultValue;
    constructor(getDefaultValue, entries) {
        super(entries);
        this.#getDefaultValue = getDefaultValue;
    }
    get(key) {
        if (!this.has(key)) {
            this.set(key, this.#getDefaultValue(key));
        }
        return super.get(key);
    }
}

export { CollectorsStorage as C, DefaultMap as D, LogManager as L };
