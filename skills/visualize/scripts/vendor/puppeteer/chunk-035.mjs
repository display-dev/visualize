// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
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
// keep-sorted end
var BiDiModule;
(function (BiDiModule) {
    // keep-sorted start
    BiDiModule["Bluetooth"] = "bluetooth";
    BiDiModule["Browser"] = "browser";
    BiDiModule["BrowsingContext"] = "browsingContext";
    BiDiModule["Cdp"] = "goog:cdp";
    BiDiModule["Input"] = "input";
    BiDiModule["Log"] = "log";
    BiDiModule["Network"] = "network";
    BiDiModule["Script"] = "script";
    BiDiModule["Session"] = "session";
    BiDiModule["Speculation"] = "speculation";
    // keep-sorted end
})(BiDiModule || (BiDiModule = {}));
var Script;
(function (Script) {
    (function (EventNames) {
        // keep-sorted start
        EventNames["Message"] = "script.message";
        EventNames["RealmCreated"] = "script.realmCreated";
        EventNames["RealmDestroyed"] = "script.realmDestroyed";
        // keep-sorted end
    })(Script.EventNames || (Script.EventNames = {}));
})(Script || (Script = {}));
var Log;
(function (Log) {
    (function (EventNames) {
        EventNames["LogEntryAdded"] = "log.entryAdded";
    })(Log.EventNames || (Log.EventNames = {}));
})(Log || (Log = {}));
var BrowsingContext;
(function (BrowsingContext) {
    (function (EventNames) {
        // keep-sorted start
        EventNames["ContextCreated"] = "browsingContext.contextCreated";
        EventNames["ContextDestroyed"] = "browsingContext.contextDestroyed";
        EventNames["DomContentLoaded"] = "browsingContext.domContentLoaded";
        EventNames["DownloadEnd"] = "browsingContext.downloadEnd";
        EventNames["DownloadWillBegin"] = "browsingContext.downloadWillBegin";
        EventNames["FragmentNavigated"] = "browsingContext.fragmentNavigated";
        EventNames["HistoryUpdated"] = "browsingContext.historyUpdated";
        EventNames["Load"] = "browsingContext.load";
        EventNames["NavigationAborted"] = "browsingContext.navigationAborted";
        EventNames["NavigationCommitted"] = "browsingContext.navigationCommitted";
        EventNames["NavigationFailed"] = "browsingContext.navigationFailed";
        EventNames["NavigationStarted"] = "browsingContext.navigationStarted";
        EventNames["UserPromptClosed"] = "browsingContext.userPromptClosed";
        EventNames["UserPromptOpened"] = "browsingContext.userPromptOpened";
        // keep-sorted end
    })(BrowsingContext.EventNames || (BrowsingContext.EventNames = {}));
})(BrowsingContext || (BrowsingContext = {}));
var Input;
(function (Input) {
    (function (EventNames) {
        // keep-sorted start
        EventNames["FileDialogOpened"] = "input.fileDialogOpened";
        // keep-sorted end
    })(Input.EventNames || (Input.EventNames = {}));
})(Input || (Input = {}));
var Network;
(function (Network) {
    (function (EventNames) {
        // keep-sorted start
        EventNames["AuthRequired"] = "network.authRequired";
        EventNames["BeforeRequestSent"] = "network.beforeRequestSent";
        EventNames["FetchError"] = "network.fetchError";
        EventNames["ResponseCompleted"] = "network.responseCompleted";
        EventNames["ResponseStarted"] = "network.responseStarted";
        // keep-sorted end
    })(Network.EventNames || (Network.EventNames = {}));
})(Network || (Network = {}));
var Bluetooth;
(function (Bluetooth) {
    (function (EventNames) {
        EventNames["RequestDevicePromptUpdated"] = "bluetooth.requestDevicePromptUpdated";
        EventNames["GattConnectionAttempted"] = "bluetooth.gattConnectionAttempted";
        EventNames["CharacteristicEventGenerated"] = "bluetooth.characteristicEventGenerated";
        EventNames["DescriptorEventGenerated"] = "bluetooth.descriptorEventGenerated";
    })(Bluetooth.EventNames || (Bluetooth.EventNames = {}));
})(Bluetooth || (Bluetooth = {}));
var Speculation;
(function (Speculation) {
    (function (EventNames) {
        EventNames["PrefetchStatusUpdated"] = "speculation.prefetchStatusUpdated";
    })(Speculation.EventNames || (Speculation.EventNames = {}));
})(Speculation || (Speculation = {}));
const EVENT_NAMES = new Set([
    // keep-sorted start
    ...Object.values(BiDiModule),
    ...Object.values(Bluetooth.EventNames),
    ...Object.values(BrowsingContext.EventNames),
    ...Object.values(Input.EventNames),
    ...Object.values(Log.EventNames),
    ...Object.values(Network.EventNames),
    ...Object.values(Script.EventNames),
    ...Object.values(Speculation.EventNames),
    // keep-sorted end
]);

class Exception extends Error {
    error;
    message;
    stacktrace;
    constructor(error, message, stacktrace) {
        super();
        this.error = error;
        this.message = message;
        this.stacktrace = stacktrace;
    }
    toErrorResponse(commandId) {
        return {
            type: 'error',
            id: commandId,
            error: this.error,
            message: this.message,
            stacktrace: this.stacktrace,
        };
    }
}
class InvalidArgumentException extends Exception {
    constructor(message, stacktrace) {
        super("invalid argument" /* ErrorCode.InvalidArgument */, message, stacktrace);
    }
}
class InvalidSelectorException extends Exception {
    constructor(message, stacktrace) {
        super("invalid selector" /* ErrorCode.InvalidSelector */, message, stacktrace);
    }
}
class MoveTargetOutOfBoundsException extends Exception {
    constructor(message, stacktrace) {
        super("move target out of bounds" /* ErrorCode.MoveTargetOutOfBounds */, message, stacktrace);
    }
}
class NoSuchAlertException extends Exception {
    constructor(message, stacktrace) {
        super("no such alert" /* ErrorCode.NoSuchAlert */, message, stacktrace);
    }
}
class NoSuchElementException extends Exception {
    constructor(message, stacktrace) {
        super("no such element" /* ErrorCode.NoSuchElement */, message, stacktrace);
    }
}
class NoSuchFrameException extends Exception {
    constructor(message, stacktrace) {
        super("no such frame" /* ErrorCode.NoSuchFrame */, message, stacktrace);
    }
}
class NoSuchHandleException extends Exception {
    constructor(message, stacktrace) {
        super("no such handle" /* ErrorCode.NoSuchHandle */, message, stacktrace);
    }
}
class NoSuchHistoryEntryException extends Exception {
    constructor(message, stacktrace) {
        super("no such history entry" /* ErrorCode.NoSuchHistoryEntry */, message, stacktrace);
    }
}
class NoSuchInterceptException extends Exception {
    constructor(message, stacktrace) {
        super("no such intercept" /* ErrorCode.NoSuchIntercept */, message, stacktrace);
    }
}
class NoSuchNodeException extends Exception {
    constructor(message, stacktrace) {
        super("no such node" /* ErrorCode.NoSuchNode */, message, stacktrace);
    }
}
class NoSuchRequestException extends Exception {
    constructor(message, stacktrace) {
        super("no such request" /* ErrorCode.NoSuchRequest */, message, stacktrace);
    }
}
class NoSuchScriptException extends Exception {
    constructor(message, stacktrace) {
        super("no such script" /* ErrorCode.NoSuchScript */, message, stacktrace);
    }
}
class NoSuchUserContextException extends Exception {
    constructor(message, stacktrace) {
        super("no such user context" /* ErrorCode.NoSuchUserContext */, message, stacktrace);
    }
}
class UnknownCommandException extends Exception {
    constructor(message, stacktrace) {
        super("unknown command" /* ErrorCode.UnknownCommand */, message, stacktrace);
    }
}
class UnknownErrorException extends Exception {
    constructor(message, stacktrace = new Error().stack) {
        super("unknown error" /* ErrorCode.UnknownError */, message, stacktrace);
    }
}
class UnableToCaptureScreenException extends Exception {
    constructor(message, stacktrace) {
        super("unable to capture screen" /* ErrorCode.UnableToCaptureScreen */, message, stacktrace);
    }
}
class UnsupportedOperationException extends Exception {
    constructor(message, stacktrace) {
        super("unsupported operation" /* ErrorCode.UnsupportedOperation */, message, stacktrace);
    }
}
class UnableToSetCookieException extends Exception {
    constructor(message, stacktrace) {
        super("unable to set cookie" /* ErrorCode.UnableToSetCookie */, message, stacktrace);
    }
}
class UnableToSetFileInputException extends Exception {
    constructor(message, stacktrace) {
        super("unable to set file input" /* ErrorCode.UnableToSetFileInput */, message, stacktrace);
    }
}
class InvalidWebExtensionException extends Exception {
    constructor(message, stacktrace) {
        super("invalid web extension" /* ErrorCode.InvalidWebExtension */, message, stacktrace);
    }
}
class NoSuchWebExtensionException extends Exception {
    constructor(message, stacktrace) {
        super("no such web extension" /* ErrorCode.NoSuchWebExtension */, message, stacktrace);
    }
}
class NoSuchNetworkCollectorException extends Exception {
    constructor(message, stacktrace) {
        super("no such network collector" /* ErrorCode.NoSuchNetworkCollector */, message, stacktrace);
    }
}
class NoSuchNetworkDataException extends Exception {
    constructor(message, stacktrace) {
        super("no such network data" /* ErrorCode.NoSuchNetworkData */, message, stacktrace);
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
class BidiNoOpParser {
    // Bluetooth module
    // keep-sorted start block=yes
    parseDisableSimulationParameters(params) {
        return params;
    }
    parseHandleRequestDevicePromptParams(params) {
        return params;
    }
    parseSimulateAdapterParameters(params) {
        return params;
    }
    parseSimulateAdvertisementParameters(params) {
        return params;
    }
    parseSimulateCharacteristicParameters(params) {
        return params;
    }
    parseSimulateCharacteristicResponseParameters(params) {
        return params;
    }
    parseSimulateDescriptorParameters(params) {
        return params;
    }
    parseSimulateDescriptorResponseParameters(params) {
        return params;
    }
    parseSimulateGattConnectionResponseParameters(params) {
        return params;
    }
    parseSimulateGattDisconnectionParameters(params) {
        return params;
    }
    parseSimulatePreconnectedPeripheralParameters(params) {
        return params;
    }
    parseSimulateServiceParameters(params) {
        return params;
    }
    // keep-sorted end
    // Browser module
    // keep-sorted start block=yes
    parseCreateUserContextParameters(params) {
        return params;
    }
    parseRemoveUserContextParameters(params) {
        return params;
    }
    parseSetClientWindowStateParameters(params) {
        return params;
    }
    parseSetDownloadBehaviorParameters(params) {
        return params;
    }
    // keep-sorted end
    // Browsing Context module
    // keep-sorted start block=yes
    parseActivateParams(params) {
        return params;
    }
    parseCaptureScreenshotParams(params) {
        return params;
    }
    parseCloseParams(params) {
        return params;
    }
    parseCreateParams(params) {
        return params;
    }
    parseGetTreeParams(params) {
        return params;
    }
    parseHandleUserPromptParams(params) {
        return params;
    }
    parseLocateNodesParams(params) {
        return params;
    }
    parseNavigateParams(params) {
        return params;
    }
    parsePrintParams(params) {
        return params;
    }
    parseReloadParams(params) {
        return params;
    }
    parseSetBypassCspParams(params) {
        return params;
    }
    parseSetViewportParams(params) {
        return params;
    }
    parseTraverseHistoryParams(params) {
        return params;
    }
    // keep-sorted end
    // CDP module
    // keep-sorted start block=yes
    parseGetSessionParams(params) {
        return params;
    }
    parseResolveRealmParams(params) {
        return params;
    }
    parseSendCommandParams(params) {
        return params;
    }
    // keep-sorted end
    // Emulation module
    // keep-sorted start block=yes
    parseSetClientHintsOverrideParams(params) {
        return params;
    }
    parseSetForcedColorsModeThemeOverrideParams(params) {
        return params;
    }
    parseSetGeolocationOverrideParams(params) {
        return params;
    }
    parseSetLocaleOverrideParams(params) {
        return params;
    }
    parseSetNetworkConditionsParams(params) {
        return params;
    }
    parseSetScreenOrientationOverrideParams(params) {
        return params;
    }
    parseSetScreenSettingsOverrideParams(params) {
        return params;
    }
    parseSetScriptingEnabledParams(params) {
        return params;
    }
    parseSetScrollbarTypeOverrideParams(params) {
        return params;
    }
    parseSetTimezoneOverrideParams(params) {
        return params;
    }
    parseSetTouchOverrideParams(params) {
        return params;
    }
    parseSetUserAgentOverrideParams(params) {
        return params;
    }
    // keep-sorted end
    // Script module
    // keep-sorted start block=yes
    parseAddPreloadScriptParams(params) {
        return params;
    }
    parseCallFunctionParams(params) {
        return params;
    }
    parseDisownParams(params) {
        return params;
    }
    parseEvaluateParams(params) {
        return params;
    }
    parseGetRealmsParams(params) {
        return params;
    }
    parseRemovePreloadScriptParams(params) {
        return params;
    }
    // keep-sorted end
    // Input module
    // keep-sorted start block=yes
    parsePerformActionsParams(params) {
        return params;
    }
    parseReleaseActionsParams(params) {
        return params;
    }
    parseSetFilesParams(params) {
        return params;
    }
    // keep-sorted end
    // Network module
    // keep-sorted start block=yes
    parseAddDataCollectorParams(params) {
        return params;
    }
    parseAddInterceptParams(params) {
        return params;
    }
    parseContinueRequestParams(params) {
        return params;
    }
    parseContinueResponseParams(params) {
        return params;
    }
    parseContinueWithAuthParams(params) {
        return params;
    }
    parseDisownDataParams(params) {
        return params;
    }
    parseFailRequestParams(params) {
        return params;
    }
    parseGetDataParams(params) {
        return params;
    }
    parseProvideResponseParams(params) {
        return params;
    }
    parseRemoveDataCollectorParams(params) {
        return params;
    }
    parseRemoveInterceptParams(params) {
        return params;
    }
    parseSetCacheBehaviorParams(params) {
        return params;
    }
    parseSetExtraHeadersParams(params) {
        return params;
    }
    // keep-sorted end
    // Permissions module
    // keep-sorted start block=yes
    parseSetPermissionsParams(params) {
        return params;
    }
    // keep-sorted end
    // Session module
    // keep-sorted start block=yes
    parseSubscribeParams(params) {
        return params;
    }
    parseUnsubscribeParams(params) {
        return params;
    }
    // keep-sorted end
    // Storage module
    // keep-sorted start block=yes
    parseDeleteCookiesParams(params) {
        return params;
    }
    parseGetCookiesParams(params) {
        return params;
    }
    parseSetCookieParams(params) {
        return params;
    }
    // keep-sorted end
    // WebExtenstion module
    // keep-sorted start block=yes
    parseInstallParams(params) {
        return params;
    }
    parseUninstallParams(params) {
        return params;
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
class BrowserProcessor {
    #browserCdpClient;
    #browsingContextStorage;
    #configStorage;
    #userContextStorage;
    constructor(browserCdpClient, browsingContextStorage, configStorage, userContextStorage) {
        this.#browserCdpClient = browserCdpClient;
        this.#browsingContextStorage = browsingContextStorage;
        this.#configStorage = configStorage;
        this.#userContextStorage = userContextStorage;
    }
    close() {
        // Ensure that it is put at the end of the event loop.
        // This way we send back the response before closing the tab.
        // Always catch uncaught exceptions.
        setTimeout(() => this.#browserCdpClient.sendCommand('Browser.close').catch(() => { }), 0);
        return {};
    }
    async createUserContext(params) {
        // `params` is a record to provide legacy `goog:` parameters. Now as the `proxy`
        // parameter is specified, we should get rid of `goog:proxyServer` and
        // `goog:proxyBypassList` and make the params of type
        // `Browser.CreateUserContextParameters`.
        const w3cParams = params;
        const globalConfig = this.#configStorage.getGlobalConfig();
        if (w3cParams.acceptInsecureCerts !== undefined) {
            if (w3cParams.acceptInsecureCerts === false &&
                globalConfig.acceptInsecureCerts === true)
                // TODO: https://github.com/GoogleChromeLabs/chromium-bidi/issues/3398
                throw new UnknownErrorException(`Cannot set user context's "acceptInsecureCerts" to false, when a capability "acceptInsecureCerts" is set to true`);
        }
        const request = {};
        if (w3cParams.proxy) {
            const proxyStr = getProxyStr(w3cParams.proxy);
            if (proxyStr) {
                request.proxyServer = proxyStr;
            }
            if (w3cParams.proxy.noProxy) {
                request.proxyBypassList = w3cParams.proxy.noProxy.join(',');
            }
        }
        else {
            // TODO: remove after Puppeteer stops using it.
            if (params['goog:proxyServer'] !== undefined) {
                request.proxyServer = params['goog:proxyServer'];
            }
            const proxyBypassList = params['goog:proxyBypassList'] ?? undefined;
            if (proxyBypassList) {
                request.proxyBypassList = proxyBypassList.join(',');
            }
        }
        const context = await this.#browserCdpClient.sendCommand('Target.createBrowserContext', request);
        await this.#applyDownloadBehavior(globalConfig.downloadBehavior ?? null, context.browserContextId);
        this.#configStorage.updateUserContextConfig(context.browserContextId, {
            acceptInsecureCerts: params['acceptInsecureCerts'],
            userPromptHandler: params['unhandledPromptBehavior'],
        });
        return {
            userContext: context.browserContextId,
        };
    }
    async removeUserContext(params) {
        const userContext = params.userContext;
        if (userContext === 'default') {
            throw new InvalidArgumentException('`default` user context cannot be removed');
        }
        try {
            await this.#browserCdpClient.sendCommand('Target.disposeBrowserContext', {
                browserContextId: userContext,
            });
        }
        catch (err) {
            // https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/protocol/target_handler.cc;l=1424;drc=c686e8f4fd379312469fe018f5c390e9c8f20d0d
            if (err.message.startsWith('Failed to find context with id')) {
                throw new NoSuchUserContextException(err.message);
            }
            throw err;
        }
        return {};
    }
    async getUserContexts() {
        return {
            userContexts: await this.#userContextStorage.getUserContexts(),
        };
    }
    async #getWindowInfo(targetId) {
        const windowInfo = await this.#browserCdpClient.sendCommand('Browser.getWindowForTarget', { targetId });
        return {
            // `active` is not supported in CDP yet.
            active: false,
            clientWindow: `${windowInfo.windowId}`,
            state: windowInfo.bounds.windowState ?? 'normal',
            height: windowInfo.bounds.height ?? 0,
            width: windowInfo.bounds.width ?? 0,
            x: windowInfo.bounds.left ?? 0,
            y: windowInfo.bounds.top ?? 0,
        };
    }
    async setClientWindowState(params) {
        const { clientWindow } = params;
        const bounds = {
            windowState: params.state,
        };
        if (params.state === 'normal') {
            if (params.width !== undefined) {
                bounds.width = params.width;
            }
            if (params.height !== undefined) {
                bounds.height = params.height;
            }
            if (params.x !== undefined) {
                bounds.left = params.x;
            }
            if (params.y !== undefined) {
                bounds.top = params.y;
            }
        }
        const windowId = Number.parseInt(clientWindow);
        if (isNaN(windowId)) {
            throw new InvalidArgumentException('no such client window');
        }
        await this.#browserCdpClient.sendCommand('Browser.setWindowBounds', {
            windowId,
            bounds,
        });
        const result = await this.#browserCdpClient.sendCommand('Browser.getWindowBounds', {
            windowId,
        });
        return {
            active: false,
            clientWindow: `${windowId}`,
            state: result.bounds.windowState ?? 'normal',
            height: result.bounds.height ?? 0,
            width: result.bounds.width ?? 0,
            x: result.bounds.left ?? 0,
            y: result.bounds.top ?? 0,
        };
    }
    async getClientWindows() {
        const topLevelTargetIds = this.#browsingContextStorage
            .getTopLevelContexts()
            .map((b) => b.cdpTarget.id);
        const clientWindows = await Promise.all(topLevelTargetIds.map(async (targetId) => await this.#getWindowInfo(targetId)));
        const uniqueClientWindowIds = new Set();
        const uniqueClientWindows = new Array();
        // Filter out duplicated client windows.
        for (const window of clientWindows) {
            if (!uniqueClientWindowIds.has(window.clientWindow)) {
                uniqueClientWindowIds.add(window.clientWindow);
                uniqueClientWindows.push(window);
            }
        }
        return { clientWindows: uniqueClientWindows };
    }
    #toCdpDownloadBehavior(downloadBehavior) {
        if (downloadBehavior === null)
            // CDP "default" behavior.
            return {
                behavior: 'default',
            };
        if (downloadBehavior?.type === 'denied')
            // Deny all the downloads.
            return {
                behavior: 'deny',
            };
        if (downloadBehavior?.type === 'allowed') {
            // CDP behavior "allow" means "save downloaded files to the specific download path".
            return {
                behavior: 'allow',
                downloadPath: downloadBehavior.destinationFolder,
            };
        }
        // Unreachable. Handled by params parser.
        throw new UnknownErrorException('Unexpected download behavior');
    }
    async #applyDownloadBehavior(downloadBehavior, userContext) {
        await this.#browserCdpClient.sendCommand('Browser.setDownloadBehavior', {
            ...this.#toCdpDownloadBehavior(downloadBehavior),
            browserContextId: userContext === 'default' ? undefined : userContext,
            // Required for enabling download events.
            eventsEnabled: true,
        });
    }
    async setDownloadBehavior(params) {
        let userContexts;
        if (params.userContexts === undefined) {
            // Global download behavior.
            userContexts = (await this.#userContextStorage.getUserContexts()).map((c) => c.userContext);
        }
        else {
            // Download behavior for the specific user contexts.
            userContexts = Array.from(await this.#userContextStorage.verifyUserContextIdList(params.userContexts));
        }
        if (params.userContexts === undefined) {
            // Store the global setting to be applied for the future user contexts.
            this.#configStorage.updateGlobalConfig({
                downloadBehavior: params.downloadBehavior,
            });
        }
        else {
            params.userContexts.map((userContext) => this.#configStorage.updateUserContextConfig(userContext, {
                downloadBehavior: params.downloadBehavior,
            }));
        }
        await Promise.all(userContexts.map(async (userContext) => {
            // Download behavior can be already set per user context, in which case the global
            // one should not be applied.
            const downloadBehavior = this.#configStorage.getActiveConfig(undefined, userContext)
                .downloadBehavior ?? null;
            await this.#applyDownloadBehavior(downloadBehavior, userContext);
        }));
        return {};
    }
}
/**
 * Proxy config parse implementation:
 * https://source.chromium.org/chromium/chromium/src/+/main:net/proxy_resolution/proxy_config.h;drc=743a82d08e59d803c94ee1b8564b8b11dd7b462f;l=107
 */
function getProxyStr(proxyConfig) {
    if (proxyConfig.proxyType === 'direct' ||
        proxyConfig.proxyType === 'system') {
        // These types imply that Chrome should use its default behavior (e.g., direct
        // connection or system-configured proxy). No specific `proxyServer` string is
        // needed.
        return undefined;
    }
    if (proxyConfig.proxyType === 'pac') {
        throw new UnsupportedOperationException(`PAC proxy configuration is not supported per user context`);
    }
    if (proxyConfig.proxyType === 'autodetect') {
        throw new UnsupportedOperationException(`Autodetect proxy is not supported per user context`);
    }
    if (proxyConfig.proxyType === 'manual') {
        const servers = [];
        // HTTP Proxy
        if (proxyConfig.httpProxy !== undefined) {
            // servers.push(proxyConfig.httpProxy);
            servers.push(`http=${proxyConfig.httpProxy}`);
        }
        // SSL Proxy (uses 'https' scheme)
        if (proxyConfig.sslProxy !== undefined) {
            // servers.push(proxyConfig.sslProxy);
            servers.push(`https=${proxyConfig.sslProxy}`);
        }
        // SOCKS Proxy
        if (proxyConfig.socksProxy !== undefined ||
            proxyConfig.socksVersion !== undefined) {
            // socksVersion is mandatory and must be a valid integer if socksProxy is
            // specified.
            if (proxyConfig.socksProxy === undefined) {
                throw new InvalidArgumentException(`'socksVersion' cannot be set without 'socksProxy'`);
            }
            if (proxyConfig.socksVersion === undefined ||
                typeof proxyConfig.socksVersion !== 'number' ||
                !Number.isInteger(proxyConfig.socksVersion) ||
                proxyConfig.socksVersion < 0 ||
                proxyConfig.socksVersion > 255) {
                throw new InvalidArgumentException(`'socksVersion' must be between 0 and 255`);
            }
            servers.push(`socks=socks${proxyConfig.socksVersion}://${proxyConfig.socksProxy}`);
        }
        if (servers.length === 0) {
            // If 'manual' proxyType is chosen but no specific proxy servers (http, ssl, socks)
            // are provided, it means no proxy server should be configured.
            return undefined;
        }
        return servers.join(';');
    }
    // Unreachable.
    throw new UnknownErrorException(`Unknown proxy type`);
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
class CdpProcessor {
    #browsingContextStorage;
    #realmStorage;
    #cdpConnection;
    #browserCdpClient;
    constructor(browsingContextStorage, realmStorage, cdpConnection, browserCdpClient) {
        this.#browsingContextStorage = browsingContextStorage;
        this.#realmStorage = realmStorage;
        this.#cdpConnection = cdpConnection;
        this.#browserCdpClient = browserCdpClient;
    }
    getSession(params) {
        const context = params.context;
        const sessionId = this.#browsingContextStorage.getContext(context).cdpTarget.cdpSessionId;
        if (sessionId === undefined) {
            return {};
        }
        return { session: sessionId };
    }
    resolveRealm(params) {
        const context = params.realm;
        const realm = this.#realmStorage.getRealm({ realmId: context });
        if (realm === undefined) {
            throw new UnknownErrorException(`Could not find realm ${params.realm}`);
        }
        return { executionContextId: realm.executionContextId };
    }
    async sendCommand(params) {
        const client = params.session
            ? this.#cdpConnection.getCdpClient(params.session)
            : this.#browserCdpClient;
        const result = await client.sendCommand(params.method, params.params);
        return {
            result,
            session: params.session,
        };
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
class OutgoingMessage {
    #message;
    #googChannel;
    constructor(message, googChannel = null) {
        this.#message = message;
        this.#googChannel = googChannel;
    }
    static createFromPromise(messagePromise, googChannel) {
        return messagePromise.then((message) => {
            if (message.kind === 'success') {
                return {
                    kind: 'success',
                    value: new OutgoingMessage(message.value, googChannel),
                };
            }
            return message;
        });
    }
    static createResolved(message, googChannel = null) {
        return Promise.resolve({
            kind: 'success',
            value: new OutgoingMessage(message, googChannel),
        });
    }
    get message() {
        return this.#message;
    }
    get googChannel() {
        return this.#googChannel;
    }
}

export { BiDiModule as A, BrowsingContext as B, CdpProcessor as C, Exception as E, InvalidArgumentException as I, Log as L, MoveTargetOutOfBoundsException as M, NoSuchUserContextException as N, OutgoingMessage as O, Script as S, UnableToSetCookieException as U, UnsupportedOperationException as a, InvalidWebExtensionException as b, NoSuchWebExtensionException as c, NoSuchNodeException as d, UnableToSetFileInputException as e, NoSuchElementException as f, NoSuchRequestException as g, NoSuchAlertException as h, UnknownErrorException as i, BidiNoOpParser as j, BrowserProcessor as k, UnknownCommandException as l, NoSuchFrameException as m, NoSuchHandleException as n, Input as o, UnableToCaptureScreenException as p, NoSuchHistoryEntryException as q, InvalidSelectorException as r, NoSuchNetworkDataException as s, NoSuchInterceptException as t, Bluetooth as u, Speculation as v, NoSuchNetworkCollectorException as w, Network as x, NoSuchScriptException as y, EVENT_NAMES as z };
