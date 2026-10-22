// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { d as NoSuchNodeException, e as UnableToSetFileInputException, f as NoSuchElementException, I as InvalidArgumentException, g as NoSuchRequestException, a as UnsupportedOperationException } from './chunk-035.mjs';
import { a as assert, I as InputState, A as ActionDispatcher } from './chunk-037.mjs';

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
var LogType;
(function (LogType) {
    // keep-sorted start
    LogType["bidi"] = "bidi";
    LogType["cdp"] = "cdp";
    LogType["debug"] = "debug";
    LogType["debugError"] = "debug:error";
    LogType["debugInfo"] = "debug:info";
    LogType["debugWarn"] = "debug:warn";
    // keep-sorted end
})(LogType || (LogType = {}));

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
// We use a weak map here as specified here:
// https://www.w3.org/TR/webdriver/#dfn-browsing-context-input-state-map
class InputStateManager extends WeakMap {
    get(context) {
        assert(context.isTopLevelContext());
        if (!this.has(context)) {
            this.set(context, new InputState());
        }
        return super.get(context);
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
class InputProcessor {
    #browsingContextStorage;
    #inputStateManager = new InputStateManager();
    constructor(browsingContextStorage) {
        this.#browsingContextStorage = browsingContextStorage;
    }
    async performActions(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        const inputState = this.#inputStateManager.get(context.top);
        const actionsByTick = this.#getActionsByTick(params, inputState);
        const dispatcher = new ActionDispatcher(inputState, this.#browsingContextStorage, params.context, await ActionDispatcher.isMacOS(context).catch(() => false));
        await dispatcher.dispatchActions(actionsByTick);
        return {};
    }
    async releaseActions(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        const topContext = context.top;
        const inputState = this.#inputStateManager.get(topContext);
        const dispatcher = new ActionDispatcher(inputState, this.#browsingContextStorage, params.context, await ActionDispatcher.isMacOS(context).catch(() => false));
        await dispatcher.dispatchTickActions(inputState.cancelList.reverse());
        this.#inputStateManager.delete(topContext);
        return {};
    }
    async setFiles(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        const hiddenSandboxRealm = await context.getOrCreateHiddenSandbox();
        let result;
        try {
            result = await hiddenSandboxRealm.callFunction(String(function getFiles(fileListLength) {
                if (!(this instanceof HTMLInputElement)) {
                    if (this instanceof Element) {
                        return 1 /* ErrorCode.Element */;
                    }
                    return 0 /* ErrorCode.Node */;
                }
                if (this.type !== 'file') {
                    return 2 /* ErrorCode.Type */;
                }
                if (this.disabled) {
                    return 3 /* ErrorCode.Disabled */;
                }
                if (fileListLength > 1 && !this.multiple) {
                    return 4 /* ErrorCode.Multiple */;
                }
                return;
            }), false, params.element, [{ type: 'number', value: params.files.length }]);
        }
        catch {
            throw new NoSuchNodeException(`Could not find element ${params.element.sharedId}`);
        }
        assert(result.type === 'success');
        if (result.result.type === 'number') {
            switch (result.result.value) {
                case 0 /* ErrorCode.Node */: {
                    throw new NoSuchElementException(`Could not find element ${params.element.sharedId}`);
                }
                case 1 /* ErrorCode.Element */: {
                    throw new UnableToSetFileInputException(`Element ${params.element.sharedId} is not a input`);
                }
                case 2 /* ErrorCode.Type */: {
                    throw new UnableToSetFileInputException(`Input element ${params.element.sharedId} is not a file type`);
                }
                case 3 /* ErrorCode.Disabled */: {
                    throw new UnableToSetFileInputException(`Input element ${params.element.sharedId} is disabled`);
                }
                case 4 /* ErrorCode.Multiple */: {
                    throw new UnableToSetFileInputException(`Cannot set multiple files on a non-multiple input element`);
                }
            }
        }
        /**
         * The zero-length array is a special case, it seems that
         * DOM.setFileInputFiles does not actually update the files in that case, so
         * the solution is to eval the element value to a new FileList directly.
         */
        if (params.files.length === 0) {
            // XXX: These events should converted to trusted events. Perhaps do this
            // in `DOM.setFileInputFiles`?
            await hiddenSandboxRealm.callFunction(String(function dispatchEvent() {
                if (this.files?.length === 0) {
                    this.dispatchEvent(new Event('cancel', {
                        bubbles: true,
                    }));
                    return;
                }
                this.files = new DataTransfer().files;
                // Dispatch events for this case because it should behave akin to a user action.
                this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
                this.dispatchEvent(new Event('change', { bubbles: true }));
            }), false, params.element);
            return {};
        }
        // Our goal here is to iterate over the input element files and get their
        // file paths.
        const paths = [];
        for (let i = 0; i < params.files.length; ++i) {
            const result = await hiddenSandboxRealm.callFunction(String(function getFiles(index) {
                return this.files?.item(index);
            }), false, params.element, [{ type: 'number', value: 0 }], "root" /* Script.ResultOwnership.Root */);
            assert(result.type === 'success');
            if (result.result.type !== 'object') {
                break;
            }
            const { handle } = result.result;
            assert(handle !== undefined);
            const { path } = await hiddenSandboxRealm.cdpClient.sendCommand('DOM.getFileInfo', {
                objectId: handle,
            });
            paths.push(path);
            // Cleanup the handle.
            void hiddenSandboxRealm.disown(handle).catch(undefined);
        }
        paths.sort();
        // We create a new array so we preserve the order of the original files.
        const sortedFiles = [...params.files].sort();
        if (paths.length !== params.files.length ||
            sortedFiles.some((path, index) => {
                return paths[index] !== path;
            })) {
            const { objectId } = await hiddenSandboxRealm.deserializeForCdp(params.element);
            // This cannot throw since this was just used in `callFunction` above.
            assert(objectId !== undefined);
            await hiddenSandboxRealm.cdpClient.sendCommand('DOM.setFileInputFiles', {
                files: params.files,
                objectId,
            });
        }
        else {
            // XXX: We should dispatch a trusted event.
            await hiddenSandboxRealm.callFunction(String(function dispatchEvent() {
                this.dispatchEvent(new Event('cancel', {
                    bubbles: true,
                }));
            }), false, params.element);
        }
        return {};
    }
    #getActionsByTick(params, inputState) {
        const actionsByTick = [];
        for (const action of params.actions) {
            switch (action.type) {
                case "pointer" /* SourceType.Pointer */: {
                    action.parameters ??= { pointerType: "mouse" /* Input.PointerType.Mouse */ };
                    action.parameters.pointerType ??= "mouse" /* Input.PointerType.Mouse */;
                    const source = inputState.getOrCreate(action.id, "pointer" /* SourceType.Pointer */, action.parameters.pointerType);
                    if (source.subtype !== action.parameters.pointerType) {
                        throw new InvalidArgumentException(`Expected input source ${action.id} to be ${source.subtype}; got ${action.parameters.pointerType}.`);
                    }
                    // https://github.com/GoogleChromeLabs/chromium-bidi/issues/3043
                    source.resetClickCount();
                    break;
                }
                default:
                    inputState.getOrCreate(action.id, action.type);
            }
            const actions = action.actions.map((item) => ({
                id: action.id,
                action: item,
            }));
            for (let i = 0; i < actions.length; i++) {
                if (actionsByTick.length === i) {
                    actionsByTick.push([]);
                }
                actionsByTick[i].push(actions[i]);
            }
        }
        return actionsByTick;
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
/**
 * Encodes a string to base64.
 *
 * Uses the native Web API if available, otherwise falls back to a NodeJS Buffer.
 * @param {string} base64Str
 * @return {string}
 */
function base64ToString(base64Str) {
    // Available only if run in a browser context.
    if ('atob' in globalThis) {
        return globalThis.atob(base64Str);
    }
    // Available only if run in a NodeJS context.
    return Buffer.from(base64Str, 'base64').toString('ascii');
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
function computeHeadersSize(headers) {
    const requestHeaders = headers.reduce((acc, header) => {
        return `${acc}${header.name}: ${header.value.value}\r\n`;
    }, '');
    return new TextEncoder().encode(requestHeaders).length;
}
function stringToBase64(str) {
    return typedArrayToBase64(new TextEncoder().encode(str));
}
function typedArrayToBase64(typedArray) {
    // chunkSize should be less V8 limit on number of arguments!
    // https://github.com/v8/v8/blob/d3de848bea727518aee94dd2fd42ba0b62037a27/src/objects/code.h#L444
    const chunkSize = 65534;
    const chunks = [];
    for (let i = 0; i < typedArray.length; i += chunkSize) {
        const chunk = typedArray.subarray(i, i + chunkSize);
        chunks.push(String.fromCodePoint.apply(null, chunk));
    }
    const binaryString = chunks.join('');
    return btoa(binaryString);
}
/** Converts from CDP Network domain headers to BiDi network headers. */
function bidiNetworkHeadersFromCdpNetworkHeaders(headers) {
    if (!headers) {
        return [];
    }
    return Object.entries(headers).map(([name, value]) => ({
        name,
        value: {
            type: 'string',
            value,
        },
    }));
}
/** Converts from Bidi network headers to CDP Fetch domain header entries. */
function cdpFetchHeadersFromBidiNetworkHeaders(headers) {
    if (headers === undefined) {
        return undefined;
    }
    return headers.map(({ name, value }) => ({
        name,
        value: value.value,
    }));
}
function networkHeaderFromCookieHeaders(headers) {
    if (headers === undefined) {
        return undefined;
    }
    const value = headers.reduce((acc, value, index) => {
        if (index > 0) {
            acc += ';';
        }
        const cookieValue = value.value.type === 'base64'
            ? btoa(value.value.value)
            : value.value.value;
        acc += `${value.name}=${cookieValue}`;
        return acc;
    }, '');
    return {
        name: 'Cookie',
        value: {
            type: 'string',
            value,
        },
    };
}
/** Converts from Bidi auth action to CDP auth challenge response. */
function cdpAuthChallengeResponseFromBidiAuthContinueWithAuthAction(action) {
    switch (action) {
        case 'default':
            return 'Default';
        case 'cancel':
            return 'CancelAuth';
        case 'provideCredentials':
            return 'ProvideCredentials';
    }
}
/**
 * Converts from CDP Network domain cookie to BiDi network cookie.
 * * https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-Cookie
 * * https://w3c.github.io/webdriver-bidi/#type-network-Cookie
 */
function cdpToBiDiCookie(cookie) {
    const result = {
        name: cookie.name,
        value: { type: 'string', value: cookie.value },
        domain: cookie.domain,
        path: cookie.path,
        size: cookie.size,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite === undefined
            ? "none" /* Network.SameSite.None */
            : sameSiteCdpToBiDi(cookie.sameSite),
        ...(cookie.expires >= 0 ? { expiry: Math.round(cookie.expires) } : undefined),
    };
    // Extending with CDP-specific properties with `goog:` prefix.
    result[`goog:session`] = cookie.session;
    result[`goog:priority`] = cookie.priority;
    result[`goog:sourceScheme`] = cookie.sourceScheme;
    result[`goog:sourcePort`] = cookie.sourcePort;
    if (cookie.partitionKey !== undefined) {
        result[`goog:partitionKey`] = cookie.partitionKey;
    }
    if (cookie.partitionKeyOpaque !== undefined) {
        result[`goog:partitionKeyOpaque`] = cookie.partitionKeyOpaque;
    }
    return result;
}
/**
 * Decodes a byte value to a string.
 * @param {Network.BytesValue} value
 * @return {string}
 */
function deserializeByteValue(value) {
    if (value.type === 'base64') {
        return base64ToString(value.value);
    }
    return value.value;
}
/**
 * Converts from BiDi set network cookie params to CDP Network domain cookie.
 * * https://w3c.github.io/webdriver-bidi/#type-network-Cookie
 * * https://chromedevtools.github.io/devtools-protocol/tot/Network/#type-CookieParam
 */
function bidiToCdpCookie(params, partitionKey) {
    const deserializedValue = deserializeByteValue(params.cookie.value);
    const result = {
        name: params.cookie.name,
        value: deserializedValue,
        domain: params.cookie.domain,
        path: params.cookie.path ?? '/',
        secure: params.cookie.secure ?? false,
        httpOnly: params.cookie.httpOnly ?? false,
        ...(partitionKey.sourceOrigin !== undefined && {
            partitionKey: {
                hasCrossSiteAncestor: false,
                // CDP's `partitionKey.topLevelSite` is the BiDi's `partition.sourceOrigin`.
                topLevelSite: partitionKey.sourceOrigin,
            },
        }),
        ...(params.cookie.expiry !== undefined && {
            expires: params.cookie.expiry,
        }),
        ...(params.cookie.sameSite !== undefined && {
            sameSite: sameSiteBiDiToCdp(params.cookie.sameSite),
        }),
    };
    // Extending with CDP-specific properties with `goog:` prefix.
    if (params.cookie[`goog:url`] !== undefined) {
        result.url = params.cookie[`goog:url`];
    }
    if (params.cookie[`goog:priority`] !== undefined) {
        result.priority = params.cookie[`goog:priority`];
    }
    if (params.cookie[`goog:sourceScheme`] !== undefined) {
        result.sourceScheme = params.cookie[`goog:sourceScheme`];
    }
    if (params.cookie[`goog:sourcePort`] !== undefined) {
        result.sourcePort = params.cookie[`goog:sourcePort`];
    }
    return result;
}
function sameSiteCdpToBiDi(sameSite) {
    switch (sameSite) {
        case 'Strict':
            return "strict" /* Network.SameSite.Strict */;
        case 'None':
            return "none" /* Network.SameSite.None */;
        case 'Lax':
            return "lax" /* Network.SameSite.Lax */;
        default:
            // Defaults to `Lax`:
            // https://web.dev/articles/samesite-cookies-explained#samesitelax_by_default
            return "lax" /* Network.SameSite.Lax */;
    }
}
function sameSiteBiDiToCdp(sameSite) {
    switch (sameSite) {
        case "none" /* Network.SameSite.None */:
            return 'None';
        case "strict" /* Network.SameSite.Strict */:
            return 'Strict';
        // Defaults to `Lax`:
        // https://web.dev/articles/samesite-cookies-explained#samesitelax_by_default
        case "default" /* Network.SameSite.Default */:
        case "lax" /* Network.SameSite.Lax */:
            return 'Lax';
    }
    throw new InvalidArgumentException(`Unknown 'sameSite' value ${sameSite}`);
}
/**
 * Returns true if the given protocol is special.
 * Special protocols are those that have a default port.
 *
 * Example inputs: 'http', 'http:'
 *
 * @see https://url.spec.whatwg.org/#special-scheme
 */
function isSpecialScheme(protocol) {
    return ['ftp', 'file', 'http', 'https', 'ws', 'wss'].includes(protocol.replace(/:$/, ''));
}
function getScheme(url) {
    return url.protocol.replace(/:$/, '');
}
/** Matches the given URLPattern against the given URL. */
function matchUrlPattern(pattern, url) {
    // Roughly https://w3c.github.io/webdriver-bidi/#match-url-pattern
    // plus some differences based on the URL parsing methods.
    const parsedUrl = new URL(url);
    if (pattern.protocol !== undefined &&
        pattern.protocol !== getScheme(parsedUrl)) {
        return false;
    }
    if (pattern.hostname !== undefined &&
        pattern.hostname !== parsedUrl.hostname) {
        return false;
    }
    if (pattern.port !== undefined && pattern.port !== parsedUrl.port) {
        return false;
    }
    if (pattern.pathname !== undefined &&
        pattern.pathname !== parsedUrl.pathname) {
        return false;
    }
    if (pattern.search !== undefined && pattern.search !== parsedUrl.search) {
        return false;
    }
    return true;
}
function bidiBodySizeFromCdpPostDataEntries(entries) {
    let size = 0;
    for (const entry of entries) {
        size += atob(entry.bytes ?? '').length;
    }
    return size;
}
function getTiming(timing, offset = 0) {
    if (!timing) {
        return 0;
    }
    if (timing <= 0 || timing + offset <= 0) {
        return 0;
    }
    return timing + offset;
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
/** Dispatches Network module commands. */
class NetworkProcessor {
    #browsingContextStorage;
    #networkStorage;
    #userContextStorage;
    #contextConfigStorage;
    constructor(browsingContextStorage, networkStorage, userContextStorage, contextConfigStorage) {
        this.#userContextStorage = userContextStorage;
        this.#browsingContextStorage = browsingContextStorage;
        this.#networkStorage = networkStorage;
        this.#contextConfigStorage = contextConfigStorage;
    }
    async addIntercept(params) {
        this.#browsingContextStorage.verifyTopLevelContextsList(params.contexts);
        const urlPatterns = params.urlPatterns ?? [];
        const parsedUrlPatterns = NetworkProcessor.parseUrlPatterns(urlPatterns);
        const intercept = this.#networkStorage.addIntercept({
            urlPatterns: parsedUrlPatterns,
            phases: params.phases,
            contexts: params.contexts,
        });
        // Adding interception may require enabling CDP Network domains.
        await this.#toggleNetwork();
        return {
            intercept,
        };
    }
    async continueRequest(params) {
        if (params.url !== undefined) {
            NetworkProcessor.parseUrlString(params.url);
        }
        if (params.method !== undefined) {
            if (!NetworkProcessor.isMethodValid(params.method)) {
                throw new InvalidArgumentException(`Method '${params.method}' is invalid.`);
            }
        }
        if (params.headers) {
            NetworkProcessor.validateHeaders(params.headers);
        }
        const request = this.#getBlockedRequestOrFail(params.request, [
            "beforeRequestSent" /* Network.InterceptPhase.BeforeRequestSent */,
        ]);
        try {
            await request.continueRequest(params);
        }
        catch (error) {
            throw NetworkProcessor.wrapInterceptionError(error);
        }
        return {};
    }
    async continueResponse(params) {
        if (params.headers) {
            NetworkProcessor.validateHeaders(params.headers);
        }
        const request = this.#getBlockedRequestOrFail(params.request, [
            "authRequired" /* Network.InterceptPhase.AuthRequired */,
            "responseStarted" /* Network.InterceptPhase.ResponseStarted */,
        ]);
        try {
            await request.continueResponse(params);
        }
        catch (error) {
            throw NetworkProcessor.wrapInterceptionError(error);
        }
        return {};
    }
    async continueWithAuth(params) {
        const networkId = params.request;
        const request = this.#getBlockedRequestOrFail(networkId, [
            "authRequired" /* Network.InterceptPhase.AuthRequired */,
        ]);
        await request.continueWithAuth(params);
        return {};
    }
    async failRequest({ request: networkId, }) {
        const request = this.#getRequestOrFail(networkId);
        if (request.interceptPhase === "authRequired" /* Network.InterceptPhase.AuthRequired */) {
            throw new InvalidArgumentException(`Request '${networkId}' in 'authRequired' phase cannot be failed`);
        }
        if (!request.interceptPhase) {
            throw new NoSuchRequestException(`No blocked request found for network id '${networkId}'`);
        }
        await request.failRequest('Failed');
        return {};
    }
    async provideResponse(params) {
        if (params.headers) {
            NetworkProcessor.validateHeaders(params.headers);
        }
        const request = this.#getBlockedRequestOrFail(params.request, [
            "beforeRequestSent" /* Network.InterceptPhase.BeforeRequestSent */,
            "responseStarted" /* Network.InterceptPhase.ResponseStarted */,
            "authRequired" /* Network.InterceptPhase.AuthRequired */,
        ]);
        try {
            await request.provideResponse(params);
        }
        catch (error) {
            throw NetworkProcessor.wrapInterceptionError(error);
        }
        return {};
    }
    /**
     * In some states CDP Network and Fetch domains are not required, but in some they have
     * to be updated. Whenever potential change in these kinds of states is introduced,
     * update the states of all the CDP targets.
     */
    async #toggleNetwork() {
        await Promise.all(this.#browsingContextStorage.getAllContexts().map((context) => {
            return context.cdpTarget.toggleNetwork();
        }));
    }
    async removeIntercept(params) {
        this.#networkStorage.removeIntercept(params.intercept);
        // Removing interception may allow for disabling CDP Network domains.
        await this.#toggleNetwork();
        return {};
    }
    async setCacheBehavior(params) {
        const contexts = this.#browsingContextStorage.verifyTopLevelContextsList(params.contexts);
        // Change all targets
        if (contexts.size === 0) {
            this.#networkStorage.defaultCacheBehavior = params.cacheBehavior;
            await Promise.all(this.#browsingContextStorage.getAllContexts().map((context) => {
                return context.cdpTarget.toggleSetCacheDisabled();
            }));
            return {};
        }
        const cacheDisabled = params.cacheBehavior === 'bypass';
        await Promise.all([...contexts.values()].map((context) => {
            return context.cdpTarget.toggleSetCacheDisabled(cacheDisabled);
        }));
        return {};
    }
    #getRequestOrFail(id) {
        const request = this.#networkStorage.getRequestById(id);
        if (!request) {
            throw new NoSuchRequestException(`Network request with ID '${id}' doesn't exist`);
        }
        return request;
    }
    #getBlockedRequestOrFail(id, phases) {
        const request = this.#getRequestOrFail(id);
        if (!request.interceptPhase) {
            throw new NoSuchRequestException(`No blocked request found for network id '${id}'`);
        }
        if (request.interceptPhase && !phases.includes(request.interceptPhase)) {
            throw new InvalidArgumentException(`Blocked request for network id '${id}' is in '${request.interceptPhase}' phase`);
        }
        return request;
    }
    /**
     * Validate https://fetch.spec.whatwg.org/#header-value
     */
    static validateHeaders(headers) {
        for (const header of headers) {
            let headerValue;
            if (header.value.type === 'string') {
                headerValue = header.value.value;
            }
            else {
                headerValue = atob(header.value.value);
            }
            if (headerValue !== headerValue.trim() ||
                headerValue.includes('\n') ||
                headerValue.includes('\0')) {
                throw new InvalidArgumentException(`Header value '${headerValue}' is not acceptable value`);
            }
        }
    }
    static isMethodValid(method) {
        // https://httpwg.org/specs/rfc9110.html#method.overview
        return /^[!#$%&'*+\-.^_`|~a-zA-Z\d]+$/.test(method);
    }
    /**
     * Attempts to parse the given url.
     * Throws an InvalidArgumentException if the url is invalid.
     */
    static parseUrlString(url) {
        try {
            return new URL(url);
        }
        catch (error) {
            throw new InvalidArgumentException(`Invalid URL '${url}': ${error}`);
        }
    }
    static parseUrlPatterns(urlPatterns) {
        return urlPatterns.map((urlPattern) => {
            let patternUrl = '';
            let hasProtocol = true;
            let hasHostname = true;
            let hasPort = true;
            let hasPathname = true;
            let hasSearch = true;
            switch (urlPattern.type) {
                case 'string': {
                    patternUrl = unescapeURLPattern(urlPattern.pattern);
                    break;
                }
                case 'pattern': {
                    if (urlPattern.protocol === undefined) {
                        hasProtocol = false;
                        patternUrl += 'http';
                    }
                    else {
                        if (urlPattern.protocol === '') {
                            throw new InvalidArgumentException('URL pattern must specify a protocol');
                        }
                        urlPattern.protocol = unescapeURLPattern(urlPattern.protocol);
                        if (!urlPattern.protocol.match(/^[a-zA-Z+-.]+$/)) {
                            throw new InvalidArgumentException('Forbidden characters');
                        }
                        patternUrl += urlPattern.protocol;
                    }
                    const scheme = patternUrl.toLocaleLowerCase();
                    patternUrl += ':';
                    if (isSpecialScheme(scheme)) {
                        patternUrl += '//';
                    }
                    if (urlPattern.hostname === undefined) {
                        if (scheme !== 'file') {
                            patternUrl += 'placeholder';
                        }
                        hasHostname = false;
                    }
                    else {
                        if (urlPattern.hostname === '') {
                            throw new InvalidArgumentException('URL pattern must specify a hostname');
                        }
                        if (urlPattern.protocol === 'file') {
                            throw new InvalidArgumentException(`URL pattern protocol cannot be 'file'`);
                        }
                        urlPattern.hostname = unescapeURLPattern(urlPattern.hostname);
                        let insideBrackets = false;
                        for (const c of urlPattern.hostname) {
                            if (c === '/' || c === '?' || c === '#') {
                                throw new InvalidArgumentException(`'/', '?', '#' are forbidden in hostname`);
                            }
                            if (!insideBrackets && c === ':') {
                                throw new InvalidArgumentException(`':' is only allowed inside brackets in hostname`);
                            }
                            if (c === '[') {
                                insideBrackets = true;
                            }
                            if (c === ']') {
                                insideBrackets = false;
                            }
                        }
                        patternUrl += urlPattern.hostname;
                    }
                    if (urlPattern.port === undefined) {
                        hasPort = false;
                    }
                    else {
                        if (urlPattern.port === '') {
                            throw new InvalidArgumentException(`URL pattern must specify a port`);
                        }
                        urlPattern.port = unescapeURLPattern(urlPattern.port);
                        patternUrl += ':';
                        if (!urlPattern.port.match(/^\d+$/)) {
                            throw new InvalidArgumentException('Forbidden characters');
                        }
                        patternUrl += urlPattern.port;
                    }
                    if (urlPattern.pathname === undefined) {
                        hasPathname = false;
                    }
                    else {
                        urlPattern.pathname = unescapeURLPattern(urlPattern.pathname);
                        if (urlPattern.pathname[0] !== '/') {
                            patternUrl += '/';
                        }
                        if (urlPattern.pathname.includes('#') ||
                            urlPattern.pathname.includes('?')) {
                            throw new InvalidArgumentException('Forbidden characters');
                        }
                        patternUrl += urlPattern.pathname;
                    }
                    if (urlPattern.search === undefined) {
                        hasSearch = false;
                    }
                    else {
                        urlPattern.search = unescapeURLPattern(urlPattern.search);
                        if (urlPattern.search[0] !== '?') {
                            patternUrl += '?';
                        }
                        if (urlPattern.search.includes('#')) {
                            throw new InvalidArgumentException('Forbidden characters');
                        }
                        patternUrl += urlPattern.search;
                    }
                    break;
                }
            }
            const serializePort = (url) => {
                const defaultPorts = {
                    'ftp:': 21,
                    'file:': null,
                    'http:': 80,
                    'https:': 443,
                    'ws:': 80,
                    'wss:': 443,
                };
                if (isSpecialScheme(url.protocol) &&
                    defaultPorts[url.protocol] !== null &&
                    (!url.port || String(defaultPorts[url.protocol]) === url.port)) {
                    return '';
                }
                else if (url.port) {
                    return url.port;
                }
                return undefined;
            };
            try {
                const url = new URL(patternUrl);
                return {
                    protocol: hasProtocol ? url.protocol.replace(/:$/, '') : undefined,
                    hostname: hasHostname ? url.hostname : undefined,
                    port: hasPort ? serializePort(url) : undefined,
                    pathname: hasPathname && url.pathname ? url.pathname : undefined,
                    search: hasSearch ? url.search : undefined,
                };
            }
            catch (err) {
                throw new InvalidArgumentException(`${err.message} '${patternUrl}'`);
            }
        });
    }
    static wrapInterceptionError(error) {
        // https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/protocol/fetch_handler.cc;l=169
        if (error?.message.includes('Invalid header') ||
            error?.message.includes('Unsafe header')) {
            return new InvalidArgumentException(error.message);
        }
        return error;
    }
    async addDataCollector(params) {
        if (params.userContexts !== undefined && params.contexts !== undefined) {
            throw new InvalidArgumentException("'contexts' and 'userContexts' are mutually exclusive");
        }
        if (params.userContexts !== undefined) {
            // Assert the user contexts exist.
            await this.#userContextStorage.verifyUserContextIdList(params.userContexts);
        }
        if (params.contexts !== undefined) {
            for (const browsingContextId of params.contexts) {
                // Assert the browsing context exists and are top-level.
                const browsingContext = this.#browsingContextStorage.getContext(browsingContextId);
                if (!browsingContext.isTopLevelContext()) {
                    throw new InvalidArgumentException(`Data collectors are available only on top-level browsing contexts`);
                }
            }
        }
        const collectorId = this.#networkStorage.addDataCollector(params);
        // Adding data collectors may require enabling CDP Network domains.
        await this.#toggleNetwork();
        return { collector: collectorId };
    }
    async getData(params) {
        return await this.#networkStorage.getCollectedData(params);
    }
    async removeDataCollector(params) {
        this.#networkStorage.removeDataCollector(params);
        // Removing data collectors may allow disabling CDP Network domains.
        await this.#toggleNetwork();
        return {};
    }
    disownData(params) {
        this.#networkStorage.disownData(params);
        return {};
    }
    async #getRelatedTopLevelBrowsingContexts(browsingContextIds, userContextIds) {
        // Duplicated with EmulationProcessor logic. Consider moving to ConfigStorage.
        if (browsingContextIds === undefined && userContextIds === undefined) {
            return this.#browsingContextStorage.getTopLevelContexts();
        }
        if (browsingContextIds !== undefined && userContextIds !== undefined) {
            throw new InvalidArgumentException('User contexts and browsing contexts are mutually exclusive');
        }
        const result = [];
        if (userContextIds !== undefined) {
            if (userContextIds.length === 0) {
                throw new InvalidArgumentException('user context should be provided');
            }
            // Verify that all user contexts exist.
            await this.#userContextStorage.verifyUserContextIdList(userContextIds);
            for (const userContextId of userContextIds) {
                const topLevelBrowsingContexts = this.#browsingContextStorage
                    .getTopLevelContexts()
                    .filter((browsingContext) => browsingContext.userContext === userContextId);
                result.push(...topLevelBrowsingContexts);
            }
        }
        if (browsingContextIds !== undefined) {
            if (browsingContextIds.length === 0) {
                throw new InvalidArgumentException('browsing context should be provided');
            }
            for (const browsingContextId of browsingContextIds) {
                const browsingContext = this.#browsingContextStorage.getContext(browsingContextId);
                if (!browsingContext.isTopLevelContext()) {
                    throw new InvalidArgumentException('The command is only supported on the top-level context');
                }
                result.push(browsingContext);
            }
        }
        // Remove duplicates. Compare `BrowsingContextImpl` by reference is correct here, as
        // `browsingContextStorage` returns the same instance for the same id.
        return [...new Set(result).values()];
    }
    async setExtraHeaders(params) {
        const affectedBrowsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        const cdpExtraHeaders = parseBiDiHeaders(params.headers);
        if (params.userContexts === undefined && params.contexts === undefined) {
            this.#contextConfigStorage.updateGlobalConfig({
                extraHeaders: cdpExtraHeaders,
            });
        }
        if (params.userContexts !== undefined) {
            params.userContexts.forEach((userContext) => {
                this.#contextConfigStorage.updateUserContextConfig(userContext, {
                    extraHeaders: cdpExtraHeaders,
                });
            });
        }
        if (params.contexts !== undefined) {
            params.contexts.forEach((browsingContextId) => {
                this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, { extraHeaders: cdpExtraHeaders });
            });
        }
        await Promise.all(affectedBrowsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing setting.
            const extraHeaders = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext).extraHeaders ?? {};
            await context.setExtraHeaders(extraHeaders);
        }));
        return {};
    }
}
/**
 * See https://w3c.github.io/webdriver-bidi/#unescape-url-pattern
 */
function unescapeURLPattern(pattern) {
    const forbidden = new Set(['(', ')', '*', '{', '}']);
    let result = '';
    let isEscaped = false;
    for (const c of pattern) {
        if (!isEscaped) {
            if (forbidden.has(c)) {
                throw new InvalidArgumentException('Forbidden characters');
            }
            if (c === '\\') {
                isEscaped = true;
                continue;
            }
        }
        result += c;
        isEscaped = false;
    }
    return result;
}
// https://fetch.spec.whatwg.org/#header-name
const FORBIDDEN_HEADER_NAME_SYMBOLS = new Set([
    ' ',
    '\t',
    '\n',
    '"',
    '(',
    ')',
    ',',
    '/',
    ':',
    ';',
    '<',
    '=',
    '>',
    '?',
    '@',
    '[',
    '\\',
    ']',
    '{',
    '}',
]);
// https://fetch.spec.whatwg.org/#header-value
const FORBIDDEN_HEADER_VALUE_SYMBOLS = new Set(['\0', '\n', '\r']);
function includesChar(str, chars) {
    for (const char of str) {
        if (chars.has(char)) {
            return true;
        }
    }
    return false;
}
// Export for testing.
function parseBiDiHeaders(headers) {
    const parsedHeaders = {};
    for (const bidiHeader of headers) {
        if (bidiHeader.value.type === 'string') {
            const name = bidiHeader.name;
            const value = bidiHeader.value.value;
            if (name.length === 0) {
                throw new InvalidArgumentException(`Empty header name is not allowed`);
            }
            if (includesChar(name, FORBIDDEN_HEADER_NAME_SYMBOLS)) {
                throw new InvalidArgumentException(`Header name '${name}' contains forbidden symbols`);
            }
            if (includesChar(value, FORBIDDEN_HEADER_VALUE_SYMBOLS)) {
                throw new InvalidArgumentException(`Header value '${value}' contains forbidden symbols`);
            }
            if (value.trim() !== value) {
                throw new InvalidArgumentException(`Header value should not contain trailing or ending whitespaces`);
            }
            // BiDi spec does not combine but overrides the headers with the same names.
            // https://www.w3.org/TR/webdriver-bidi/#update-headers
            parsedHeaders[bidiHeader.name] = bidiHeader.value.value;
        }
        else {
            throw new UnsupportedOperationException('Only string headers values are supported');
        }
    }
    return parsedHeaders;
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
class PermissionsProcessor {
    #browserCdpClient;
    constructor(browserCdpClient) {
        this.#browserCdpClient = browserCdpClient;
    }
    async setPermissions(params) {
        try {
            const userContextId = params['goog:userContext'] ||
                params.userContext;
            await this.#browserCdpClient.sendCommand('Browser.setPermission', {
                origin: params.origin,
                embeddedOrigin: params.embeddedOrigin,
                browserContextId: userContextId && userContextId !== 'default'
                    ? userContextId
                    : undefined,
                permission: {
                    name: params.descriptor.name,
                },
                setting: params.state,
            });
        }
        catch (err) {
            if (err.message ===
                `Permission can't be granted to opaque origins.`) {
                // Return success if the origin is not valid (does not match any
                // existing origins).
                return {};
            }
            throw new InvalidArgumentException(err.message);
        }
        return {};
    }
}

export { InputProcessor as I, LogType as L, NetworkProcessor as N, PermissionsProcessor as P, bidiBodySizeFromCdpPostDataEntries as a, bidiToCdpCookie as b, cdpToBiDiCookie as c, deserializeByteValue as d, bidiNetworkHeadersFromCdpNetworkHeaders as e, cdpFetchHeadersFromBidiNetworkHeaders as f, getTiming as g, cdpAuthChallengeResponseFromBidiAuthContinueWithAuthAction as h, computeHeadersSize as i, matchUrlPattern as m, networkHeaderFromCookieHeaders as n, stringToBase64 as s };
