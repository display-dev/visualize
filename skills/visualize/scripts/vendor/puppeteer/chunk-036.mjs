// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { B as BrowsingContext, I as InvalidArgumentException, N as NoSuchUserContextException, a as UnsupportedOperationException, h as NoSuchAlertException } from './chunk-035.mjs';

class BrowsingContextProcessor {
    #browserCdpClient;
    #browsingContextStorage;
    #contextConfigStorage;
    #eventManager;
    #userContextStorage;
    constructor(browserCdpClient, browsingContextStorage, userContextStorage, contextConfigStorage, eventManager) {
        this.#contextConfigStorage = contextConfigStorage;
        this.#userContextStorage = userContextStorage;
        this.#browserCdpClient = browserCdpClient;
        this.#browsingContextStorage = browsingContextStorage;
        this.#eventManager = eventManager;
        this.#eventManager.addSubscribeHook(BrowsingContext.EventNames.ContextCreated, this.#onContextCreatedSubscribeHook.bind(this));
    }
    getTree(params) {
        const resultContexts = params.root === undefined
            ? this.#browsingContextStorage.getTopLevelContexts()
            : [this.#browsingContextStorage.getContext(params.root)];
        return {
            contexts: resultContexts.map((c) => c.serializeToBidiValue(params.maxDepth ?? Number.MAX_VALUE)),
        };
    }
    async create(params) {
        let referenceContext;
        let userContext = 'default';
        if (params.referenceContext !== undefined) {
            referenceContext = this.#browsingContextStorage.getContext(params.referenceContext);
            if (!referenceContext.isTopLevelContext()) {
                throw new InvalidArgumentException(`referenceContext should be a top-level context`);
            }
            userContext = referenceContext.userContext;
        }
        if (params.userContext !== undefined) {
            userContext = params.userContext;
        }
        const existingContexts = this.#browsingContextStorage
            .getAllContexts()
            .filter((context) => context.userContext === userContext);
        let newWindow = false;
        switch (params.type) {
            case "tab" /* BrowsingContext.CreateType.Tab */:
                newWindow = false;
                break;
            case "window" /* BrowsingContext.CreateType.Window */:
                newWindow = true;
                break;
        }
        if (!existingContexts.length) {
            // If there are no contexts in the given user context, we need to set
            // newWindow to true as newWindow=false will be rejected.
            newWindow = true;
        }
        let result;
        try {
            result = await this.#browserCdpClient.sendCommand('Target.createTarget', {
                url: 'about:blank',
                newWindow,
                browserContextId: userContext === 'default' ? undefined : userContext,
                background: params.background === true,
            });
        }
        catch (err) {
            if (
            // See https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/devtools/protocol/target_handler.cc;l=90;drc=e80392ac11e48a691f4309964cab83a3a59e01c8
            err.message.startsWith('Failed to find browser context with id') ||
                // See https://source.chromium.org/chromium/chromium/src/+/main:headless/lib/browser/protocol/target_handler.cc;l=49;drc=e80392ac11e48a691f4309964cab83a3a59e01c8
                err.message === 'browserContextId') {
                throw new NoSuchUserContextException(`The context ${userContext} was not found`);
            }
            throw err;
        }
        // Wait for the new target to be attached and to be added to the browsing context
        // storage.
        const context = await this.#browsingContextStorage.waitForContext(result.targetId);
        // Wait for the new tab to be loaded to avoid race conditions in the
        // `browsingContext` events, when the `browsingContext.domContentLoaded` and
        // `browsingContext.load` events from the initial `about:blank` navigation
        // are emitted after the next navigation is started.
        // Details: https://github.com/web-platform-tests/wpt/issues/35846
        await context.lifecycleLoaded();
        return { context: context.id };
    }
    navigate(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return context.navigate(params.url, params.wait ?? "none" /* BrowsingContext.ReadinessState.None */);
    }
    reload(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return context.reload(params.ignoreCache ?? false, params.wait ?? "none" /* BrowsingContext.ReadinessState.None */);
    }
    async activate(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        if (!context.isTopLevelContext()) {
            throw new InvalidArgumentException('Activation is only supported on the top-level context');
        }
        await context.activate();
        return {};
    }
    async captureScreenshot(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return await context.captureScreenshot(params);
    }
    async print(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return await context.print(params);
    }
    async setViewport(params) {
        // Check the The viewport size limits is not checked by protocol parser, so we need to validate
        // it manually:
        // https://crsrc.org/c/content/browser/devtools/protocol/emulation_handler.cc;drc=f49e23d8e2bd190b42ec62284b8be10dcccd0446;l=660
        const maxDimensionSize = 10_000_000;
        if ((params.viewport?.height ?? 0) > maxDimensionSize ||
            (params.viewport?.width ?? 0) > maxDimensionSize) {
            throw new UnsupportedOperationException(`Viewport dimension over ${maxDimensionSize} are not supported`);
        }
        const config = {};
        // `undefined` means no changes should be done to the config.
        if (params.devicePixelRatio !== undefined) {
            config.devicePixelRatio = params.devicePixelRatio;
        }
        if (params.viewport !== undefined) {
            config.viewport = params.viewport;
        }
        const impactedTopLevelContexts = await this.#getRelatedTopLevelBrowsingContexts(params.context, params.userContexts);
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, config);
        }
        if (params.context !== undefined) {
            this.#contextConfigStorage.updateBrowsingContextConfig(params.context, config);
        }
        await Promise.all(impactedTopLevelContexts.map(async (context) => {
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setViewport(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null);
        }));
        return {};
    }
    /**
     * Returns a list of top-level browsing context ids.
     */
    async #getRelatedTopLevelBrowsingContexts(browsingContextId, userContextIds) {
        if (browsingContextId === undefined && userContextIds === undefined) {
            throw new InvalidArgumentException('Either userContexts or context must be provided');
        }
        if (browsingContextId !== undefined && userContextIds !== undefined) {
            throw new InvalidArgumentException('userContexts and context are mutually exclusive');
        }
        if (browsingContextId !== undefined) {
            const context = this.#browsingContextStorage.getContext(browsingContextId);
            if (!context.isTopLevelContext()) {
                throw new InvalidArgumentException('Emulating viewport is only supported on the top-level context');
            }
            return [context];
        }
        // Verify that all user contexts exist.
        await this.#userContextStorage.verifyUserContextIdList(userContextIds);
        const result = [];
        for (const userContextId of userContextIds) {
            const topLevelBrowsingContexts = this.#browsingContextStorage
                .getTopLevelContexts()
                .filter((browsingContext) => browsingContext.userContext === userContextId);
            result.push(...topLevelBrowsingContexts);
        }
        // Remove duplicates. Compare `BrowsingContextImpl` by reference is correct here, as
        // `browsingContextStorage` returns the same instance for the same id.
        return [...new Set(result).values()];
    }
    async traverseHistory(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        if (!context) {
            throw new InvalidArgumentException(`No browsing context with id ${params.context}`);
        }
        if (!context.isTopLevelContext()) {
            throw new InvalidArgumentException('Traversing history is only supported on the top-level context');
        }
        await context.traverseHistory(params.delta);
        return {};
    }
    async handleUserPrompt(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        try {
            await context.handleUserPrompt(params.accept, params.userText);
        }
        catch (error) {
            // Heuristically determine the error
            // https://source.chromium.org/chromium/chromium/src/+/main:content/browser/devtools/protocol/page_handler.cc;l=1085?q=%22No%20dialog%20is%20showing%22&ss=chromium
            if (error.message?.includes('No dialog is showing')) {
                throw new NoSuchAlertException('No dialog is showing');
            }
            throw error;
        }
        return {};
    }
    async close(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        if (!context.isTopLevelContext()) {
            throw new InvalidArgumentException(`Non top-level browsing context ${context.id} cannot be closed.`);
        }
        // Parent session of a page target session can be a `browser` or a `tab` session.
        const parentCdpClient = context.cdpTarget.parentCdpClient;
        try {
            const detachedFromTargetPromise = new Promise((resolve) => {
                const onContextDestroyed = (event) => {
                    if (event.targetId === params.context) {
                        parentCdpClient.off('Target.detachedFromTarget', onContextDestroyed);
                        resolve();
                    }
                };
                parentCdpClient.on('Target.detachedFromTarget', onContextDestroyed);
            });
            try {
                if (params.promptUnload) {
                    await context.close();
                }
                else {
                    await parentCdpClient.sendCommand('Target.closeTarget', {
                        targetId: params.context,
                    });
                }
            }
            catch (error) {
                // Swallow error that arise from the session being destroyed. Rely on the
                // `detachedFromTargetPromise` event to be resolved.
                if (!parentCdpClient.isCloseError(error)) {
                    throw error;
                }
            }
            // Sometimes CDP command finishes before `detachedFromTarget` event,
            // sometimes after. Wait for the CDP command to be finished, and then wait
            // for `detachedFromTarget` if it hasn't emitted.
            await detachedFromTargetPromise;
        }
        catch (error) {
            // Swallow error that arise from the page being destroyed
            // Example is navigating to faulty SSL certificate
            if (!(error.code === -32e3 /* CdpErrorConstants.GENERIC_ERROR */ &&
                error.message === 'Not attached to an active page')) {
                throw error;
            }
        }
        return {};
    }
    async locateNodes(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return await context.locateNodes(params);
    }
    #onContextCreatedSubscribeHook(contextId) {
        const context = this.#browsingContextStorage.getContext(contextId);
        const contextsToReport = [
            context,
            ...this.#browsingContextStorage.getContext(contextId).allChildren,
        ];
        contextsToReport.forEach((context) => {
            this.#eventManager.registerEvent({
                type: 'event',
                method: BrowsingContext.EventNames.ContextCreated,
                params: context.serializeToBidiValue(),
            }, context.id);
        });
        return Promise.resolve();
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
class EmulationProcessor {
    #userContextStorage;
    #browsingContextStorage;
    #contextConfigStorage;
    constructor(browsingContextStorage, userContextStorage, contextConfigStorage) {
        this.#userContextStorage = userContextStorage;
        this.#browsingContextStorage = browsingContextStorage;
        this.#contextConfigStorage = contextConfigStorage;
    }
    async setGeolocationOverride(params) {
        if ('coordinates' in params && 'error' in params) {
            // Unreachable. Handled by params parser.
            throw new InvalidArgumentException('Coordinates and error cannot be set at the same time');
        }
        let geolocation = null;
        if ('coordinates' in params) {
            if ((params.coordinates?.altitude ?? null) === null &&
                (params.coordinates?.altitudeAccuracy ?? null) !== null) {
                throw new InvalidArgumentException('Geolocation altitudeAccuracy can be set only with altitude');
            }
            geolocation = params.coordinates;
        }
        else if ('error' in params) {
            if (params.error.type !== 'positionUnavailable') {
                // Unreachable. Handled by params parser.
                throw new InvalidArgumentException(`Unknown geolocation error ${params.error.type}`);
            }
            geolocation = params.error;
        }
        else {
            // Unreachable. Handled by params parser.
            throw new InvalidArgumentException(`Coordinates or error should be set`);
        }
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                geolocation,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                geolocation,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setGeolocationOverride(config.geolocation ?? null);
        }));
        return {};
    }
    async setLocaleOverride(params) {
        const locale = params.locale ?? null;
        if (locale !== null && !isValidLocale(locale)) {
            throw new InvalidArgumentException(`Invalid locale "${locale}"`);
        }
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                locale,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                locale,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await Promise.all([
                context.setLocaleOverride(config.locale ?? null),
                // Set `AcceptLanguage` to locale.
                context.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints),
            ]);
        }));
        return {};
    }
    async setScriptingEnabled(params) {
        const scriptingEnabled = params.enabled;
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                scriptingEnabled,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                scriptingEnabled,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setScriptingEnabled(config.scriptingEnabled ?? null);
        }));
        return {};
    }
    async setScrollbarTypeOverride(params) {
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                scrollbarType: params.scrollbarType,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                scrollbarType: params.scrollbarType,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setScrollbarTypeOverride(config.scrollbarType ?? null);
        }));
        return {};
    }
    async setScreenOrientationOverride(params) {
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                screenOrientation: params.screenOrientation,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                screenOrientation: params.screenOrientation,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setViewport(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null);
        }));
        return {};
    }
    async setScreenSettingsOverride(params) {
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                screenArea: params.screenArea,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                screenArea: params.screenArea,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setViewport(config.viewport ?? null, config.devicePixelRatio ?? null, config.screenOrientation ?? null);
        }));
        return {};
    }
    /**
     * Returns a list of top-level browsing contexts.
     */
    async #getRelatedTopLevelBrowsingContexts(browsingContextIds, userContextIds, allowGlobal = false) {
        if (browsingContextIds === undefined && userContextIds === undefined) {
            if (allowGlobal) {
                return this.#browsingContextStorage.getTopLevelContexts();
            }
            throw new InvalidArgumentException('Either user contexts or browsing contexts must be provided');
        }
        if (browsingContextIds !== undefined && userContextIds !== undefined) {
            throw new InvalidArgumentException('User contexts and browsing contexts are mutually exclusive');
        }
        const result = [];
        if (browsingContextIds === undefined) {
            // userContextIds !== undefined
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
        else {
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
    async setTimezoneOverride(params) {
        let timezone = params.timezone ?? null;
        if (timezone !== null && !isValidTimezone(timezone)) {
            throw new InvalidArgumentException(`Invalid timezone "${timezone}"`);
        }
        if (timezone !== null && isTimeZoneOffsetString(timezone)) {
            // CDP supports offset timezone with `GMT` prefix.
            timezone = `GMT${timezone}`;
        }
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                timezone,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                timezone,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setTimezoneOverride(config.timezone ?? null);
        }));
        return {};
    }
    async setTouchOverride(params) {
        const maxTouchPoints = params.maxTouchPoints;
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                maxTouchPoints,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                maxTouchPoints,
            });
        }
        if (params.contexts === undefined && params.userContexts === undefined) {
            this.#contextConfigStorage.updateGlobalConfig({
                maxTouchPoints,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setTouchOverride(config.maxTouchPoints ?? null);
        }));
        return {};
    }
    async setUserAgentOverrideParams(params) {
        if (params.userAgent === '') {
            throw new UnsupportedOperationException('empty user agent string is not supported');
        }
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                userAgent: params.userAgent,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                userAgent: params.userAgent,
            });
        }
        if (params.contexts === undefined && params.userContexts === undefined) {
            this.#contextConfigStorage.updateGlobalConfig({
                userAgent: params.userAgent,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints);
        }));
        return {};
    }
    async setClientHintsOverride(params) {
        const clientHints = params.clientHints ?? null;
        // Get all relevant contexts to update:
        // 1. Specific browsing contexts (if provided).
        // 2. All contexts for specific user contexts (if provided).
        // 3. All top-level contexts (if global).
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                clientHints,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                clientHints,
            });
        }
        if (params.contexts === undefined && params.userContexts === undefined) {
            this.#contextConfigStorage.updateGlobalConfig({
                clientHints,
            });
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setUserAgentAndAcceptLanguage(config.userAgent, config.locale, config.clientHints);
        }));
        return {};
    }
    async setNetworkConditions(params) {
        const browsingContexts = await this.#getRelatedTopLevelBrowsingContexts(params.contexts, params.userContexts, true);
        for (const browsingContextId of params.contexts ?? []) {
            this.#contextConfigStorage.updateBrowsingContextConfig(browsingContextId, {
                emulatedNetworkConditions: params.networkConditions,
            });
        }
        for (const userContextId of params.userContexts ?? []) {
            this.#contextConfigStorage.updateUserContextConfig(userContextId, {
                emulatedNetworkConditions: params.networkConditions,
            });
        }
        if (params.contexts === undefined && params.userContexts === undefined) {
            this.#contextConfigStorage.updateGlobalConfig({
                emulatedNetworkConditions: params.networkConditions,
            });
        }
        if (params.networkConditions !== null &&
            params.networkConditions.type !== 'offline') {
            throw new UnsupportedOperationException(`Unsupported network conditions ${params.networkConditions.type}`);
        }
        await Promise.all(browsingContexts.map(async (context) => {
            // Actual value can be different from the one in params, e.g. in case of already
            // existing more granular setting.
            const config = this.#contextConfigStorage.getActiveConfig(context.id, context.userContext);
            await context.setEmulatedNetworkConditions(config.emulatedNetworkConditions ?? null);
        }));
        return {};
    }
}
// Export for testing.
function isValidLocale(locale) {
    try {
        new Intl.Locale(locale);
        return true;
    }
    catch (e) {
        if (e instanceof RangeError) {
            return false;
        }
        // Re-throw other errors
        throw e;
    }
}
// Export for testing.
function isValidTimezone(timezone) {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
    }
    catch (e) {
        if (e instanceof RangeError) {
            return false;
        }
        // Re-throw other errors
        throw e;
    }
}
// Export for testing.
function isTimeZoneOffsetString(timezone) {
    return /^[+-](?:2[0-3]|[01]\d)(?::[0-5]\d)?$/.test(timezone);
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
class NoneSource {
    type = "none" /* SourceType.None */;
}
class KeySource {
    type = "key" /* SourceType.Key */;
    pressed = new Set();
    // This is a bitfield that matches the modifiers parameter of
    // https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchKeyEvent
    #modifiers = 0;
    get modifiers() {
        return this.#modifiers;
    }
    get alt() {
        return (this.#modifiers & 1) === 1;
    }
    set alt(value) {
        this.#setModifier(value, 1);
    }
    get ctrl() {
        return (this.#modifiers & 2) === 2;
    }
    set ctrl(value) {
        this.#setModifier(value, 2);
    }
    get meta() {
        return (this.#modifiers & 4) === 4;
    }
    set meta(value) {
        this.#setModifier(value, 4);
    }
    get shift() {
        return (this.#modifiers & 8) === 8;
    }
    set shift(value) {
        this.#setModifier(value, 8);
    }
    #setModifier(value, bit) {
        if (value) {
            this.#modifiers |= bit;
        }
        else {
            this.#modifiers &= ~bit;
        }
    }
}
class PointerSource {
    type = "pointer" /* SourceType.Pointer */;
    subtype;
    pointerId;
    pressed = new Set();
    x = 0;
    y = 0;
    radiusX;
    radiusY;
    force;
    constructor(id, subtype) {
        this.pointerId = id;
        this.subtype = subtype;
    }
    // This is a bitfield that matches the buttons parameter of
    // https://chromedevtools.github.io/devtools-protocol/tot/Input/#method-dispatchMouseEvent
    get buttons() {
        let buttons = 0;
        for (const button of this.pressed) {
            switch (button) {
                case 0:
                    buttons |= 1;
                    break;
                case 1:
                    buttons |= 4;
                    break;
                case 2:
                    buttons |= 2;
                    break;
                case 3:
                    buttons |= 8;
                    break;
                case 4:
                    buttons |= 16;
                    break;
            }
        }
        return buttons;
    }
    // --- Platform-specific code starts here ---
    // Input.dispatchMouseEvent doesn't know the concept of double click, so we
    // need to create the logic, similar to how it's done for OSes:
    // https://source.chromium.org/chromium/chromium/src/+/refs/heads/main:ui/events/event.cc;l=479
    static ClickContext = class ClickContext {
        static #DOUBLE_CLICK_TIME_MS = 500;
        static #MAX_DOUBLE_CLICK_RADIUS = 2;
        count = 0;
        #x;
        #y;
        #time;
        constructor(x, y, time) {
            this.#x = x;
            this.#y = y;
            this.#time = time;
        }
        compare(context) {
            return (
            // The click needs to be within a certain amount of ms.
            context.#time - this.#time > ClickContext.#DOUBLE_CLICK_TIME_MS ||
                // The click needs to be within a certain square radius.
                Math.abs(context.#x - this.#x) >
                    ClickContext.#MAX_DOUBLE_CLICK_RADIUS ||
                Math.abs(context.#y - this.#y) > ClickContext.#MAX_DOUBLE_CLICK_RADIUS);
        }
    };
    #clickContexts = new Map();
    setClickCount(button, context) {
        let storedContext = this.#clickContexts.get(button);
        if (!storedContext || storedContext.compare(context)) {
            storedContext = context;
        }
        ++storedContext.count;
        this.#clickContexts.set(button, storedContext);
        return storedContext.count;
    }
    getClickCount(button) {
        return this.#clickContexts.get(button)?.count ?? 0;
    }
    /**
     * Resets click count. Resets consequent click counter. Prevents grouping clicks in
     * different `performActions` calls, so that they are not grouped as double, triple etc
     * clicks. Required for https://github.com/GoogleChromeLabs/chromium-bidi/issues/3043.
     */
    resetClickCount() {
        this.#clickContexts = new Map();
    }
}
class WheelSource {
    type = "wheel" /* SourceType.Wheel */;
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
// TODO: Remove this once https://crrev.com/c/4548290 is stably in Chromium.
// `Input.dispatchKeyboardEvent` will automatically handle these conversions.
const KeyToKeyCode = {
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    Abort: 3,
    Help: 6,
    Backspace: 8,
    Tab: 9,
    Numpad5: 12,
    NumpadEnter: 13,
    Enter: 13,
    '\\r': 13,
    '\\n': 13,
    ShiftLeft: 16,
    ShiftRight: 16,
    ControlLeft: 17,
    ControlRight: 17,
    AltLeft: 18,
    AltRight: 18,
    Pause: 19,
    CapsLock: 20,
    Escape: 27,
    Convert: 28,
    NonConvert: 29,
    Space: 32,
    Numpad9: 33,
    PageUp: 33,
    Numpad3: 34,
    PageDown: 34,
    End: 35,
    Numpad1: 35,
    Home: 36,
    Numpad7: 36,
    ArrowLeft: 37,
    Numpad4: 37,
    Numpad8: 38,
    ArrowUp: 38,
    ArrowRight: 39,
    Numpad6: 39,
    Numpad2: 40,
    ArrowDown: 40,
    Select: 41,
    Open: 43,
    PrintScreen: 44,
    Insert: 45,
    Numpad0: 45,
    Delete: 46,
    NumpadDecimal: 46,
    Digit0: 48,
    Digit1: 49,
    Digit2: 50,
    Digit3: 51,
    Digit4: 52,
    Digit5: 53,
    Digit6: 54,
    Digit7: 55,
    Digit8: 56,
    Digit9: 57,
    KeyA: 65,
    KeyB: 66,
    KeyC: 67,
    KeyD: 68,
    KeyE: 69,
    KeyF: 70,
    KeyG: 71,
    KeyH: 72,
    KeyI: 73,
    KeyJ: 74,
    KeyK: 75,
    KeyL: 76,
    KeyM: 77,
    KeyN: 78,
    KeyO: 79,
    KeyP: 80,
    KeyQ: 81,
    KeyR: 82,
    KeyS: 83,
    KeyT: 84,
    KeyU: 85,
    KeyV: 86,
    KeyW: 87,
    KeyX: 88,
    KeyY: 89,
    KeyZ: 90,
    MetaLeft: 91,
    MetaRight: 92,
    ContextMenu: 93,
    NumpadMultiply: 106,
    NumpadAdd: 107,
    NumpadSubtract: 109,
    NumpadDivide: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NumLock: 144,
    ScrollLock: 145,
    AudioVolumeMute: 173,
    AudioVolumeDown: 174,
    AudioVolumeUp: 175,
    MediaTrackNext: 176,
    MediaTrackPrevious: 177,
    MediaStop: 178,
    MediaPlayPause: 179,
    Semicolon: 186,
    Equal: 187,
    NumpadEqual: 187,
    Comma: 188,
    Minus: 189,
    Period: 190,
    Slash: 191,
    Backquote: 192,
    BracketLeft: 219,
    Backslash: 220,
    BracketRight: 221,
    Quote: 222,
    AltGraph: 225,
    Props: 247,
    Cancel: 3,
    Clear: 12,
    Shift: 16,
    Control: 17,
    Alt: 18,
    Accept: 30,
    ModeChange: 31,
    ' ': 32,
    Print: 42,
    Execute: 43,
    '\\u0000': 46,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    Meta: 91,
    '*': 106,
    '+': 107,
    '-': 109,
    '/': 111,
    ';': 186,
    '=': 187,
    ',': 188,
    '.': 190,
    '`': 192,
    '[': 219,
    '\\\\': 220,
    ']': 221,
    "'": 222,
    Attn: 246,
    CrSel: 247,
    ExSel: 248,
    EraseEof: 249,
    Play: 250,
    ZoomOut: 251,
    ')': 48,
    '!': 49,
    '@': 50,
    '#': 51,
    $: 52,
    '%': 53,
    '^': 54,
    '&': 55,
    '(': 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    ':': 186,
    '<': 188,
    _: 189,
    '>': 190,
    '?': 191,
    '~': 192,
    '{': 219,
    '|': 220,
    '}': 221,
    '"': 222,
    Camera: 44,
    EndCall: 95,
    VolumeDown: 182,
    VolumeUp: 183,
};

export { BrowsingContextProcessor as B, EmulationProcessor as E, KeyToKeyCode as K, NoneSource as N, PointerSource as P, WheelSource as W, KeySource as a };
