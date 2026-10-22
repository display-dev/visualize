// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { b as debugError, C as CDPSessionEvent, g as Deferred, h as DeviceRequestPrompt, P as PuppeteerURL, j as evaluationString } from './chunk-017.mjs';
import { a as assert } from './chunk-015.mjs';
import { i as invokeAtMostOnceForArguments, J as JSHandle } from './chunk-018.mjs';
import { i as isErrorLike } from './chunk-019.mjs';

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * ConsoleMessage objects are dispatched by page via the 'console' event.
 * @public
 */
class ConsoleMessage {
    #type;
    #text;
    #args;
    #stackTraceLocations;
    #frame;
    #rawStackTrace;
    #targetId;
    /**
     * @internal
     */
    constructor(type, text, args, stackTraceLocations, frame, rawStackTrace, targetId) {
        this.#type = type;
        this.#text = text;
        this.#args = args;
        this.#stackTraceLocations = stackTraceLocations;
        this.#frame = frame;
        this.#rawStackTrace = rawStackTrace;
        this.#targetId = targetId;
    }
    /**
     * The type of the console message.
     */
    type() {
        return this.#type;
    }
    /**
     * The text of the console message.
     */
    text() {
        return this.#text;
    }
    /**
     * An array of arguments passed to the console.
     */
    args() {
        return this.#args;
    }
    /**
     * The location of the console message.
     */
    location() {
        return (this.#stackTraceLocations[0] ??
            (this.#frame ? { url: this.#frame.url() } : {}));
    }
    /**
     * The array of locations on the stack of the console message.
     */
    stackTrace() {
        return this.#stackTraceLocations;
    }
    /**
     * The underlying protocol stack trace if available.
     *
     * @internal
     */
    _rawStackTrace() {
        return this.#rawStackTrace;
    }
    /**
     * The targetId from which this console message originated.
     *
     * @internal
     */
    _targetId() {
        return this.#targetId;
    }
}

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
var __setFunctionName = (undefined && undefined.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
/**
 * @internal
 */
class EmulatedState {
    #state;
    #clientProvider;
    #updater;
    constructor(initialState, clientProvider, updater) {
        this.#state = initialState;
        this.#clientProvider = clientProvider;
        this.#updater = updater;
        this.#clientProvider.registerState(this);
    }
    async setState(state) {
        this.#state = state;
        await this.sync();
    }
    get state() {
        return this.#state;
    }
    async sync() {
        await Promise.all(this.#clientProvider.clients().map(client => {
            return this.#updater(client, this.#state);
        }));
    }
}
/**
 * @internal
 */
let EmulationManager = (() => {
    let _instanceExtraInitializers = [];
    let _private_applyViewport_decorators;
    let _private_applyViewport_descriptor;
    let _private_emulateIdleState_decorators;
    let _private_emulateIdleState_descriptor;
    let _private_emulateTimezone_decorators;
    let _private_emulateTimezone_descriptor;
    let _private_emulateVisionDeficiency_decorators;
    let _private_emulateVisionDeficiency_descriptor;
    let _private_emulateCpuThrottling_decorators;
    let _private_emulateCpuThrottling_descriptor;
    let _private_emulateMediaFeatures_decorators;
    let _private_emulateMediaFeatures_descriptor;
    let _private_emulateMediaType_decorators;
    let _private_emulateMediaType_descriptor;
    let _private_setGeolocation_decorators;
    let _private_setGeolocation_descriptor;
    let _private_setDefaultBackgroundColor_decorators;
    let _private_setDefaultBackgroundColor_descriptor;
    let _private_setJavaScriptEnabled_decorators;
    let _private_setJavaScriptEnabled_descriptor;
    let _private_emulateFocus_decorators;
    let _private_emulateFocus_descriptor;
    return class EmulationManager {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _private_applyViewport_decorators = [invokeAtMostOnceForArguments];
            _private_emulateIdleState_decorators = [invokeAtMostOnceForArguments];
            _private_emulateTimezone_decorators = [invokeAtMostOnceForArguments];
            _private_emulateVisionDeficiency_decorators = [invokeAtMostOnceForArguments];
            _private_emulateCpuThrottling_decorators = [invokeAtMostOnceForArguments];
            _private_emulateMediaFeatures_decorators = [invokeAtMostOnceForArguments];
            _private_emulateMediaType_decorators = [invokeAtMostOnceForArguments];
            _private_setGeolocation_decorators = [invokeAtMostOnceForArguments];
            _private_setDefaultBackgroundColor_decorators = [invokeAtMostOnceForArguments];
            _private_setJavaScriptEnabled_decorators = [invokeAtMostOnceForArguments];
            _private_emulateFocus_decorators = [invokeAtMostOnceForArguments];
            __esDecorate(this, _private_applyViewport_descriptor = { value: __setFunctionName(async function (client, viewportState) {
                    if (!viewportState.viewport) {
                        await Promise.all([
                            client.send('Emulation.clearDeviceMetricsOverride'),
                            client.send('Emulation.setTouchEmulationEnabled', {
                                enabled: false,
                            }),
                        ]).catch(debugError);
                        return;
                    }
                    const { viewport } = viewportState;
                    const mobile = viewport.isMobile || false;
                    const width = viewport.width;
                    const height = viewport.height;
                    const deviceScaleFactor = viewport.deviceScaleFactor ?? 1;
                    const screenOrientation = viewport.isLandscape
                        ? { angle: 90, type: 'landscapePrimary' }
                        : { angle: 0, type: 'portraitPrimary' };
                    const hasTouch = viewport.hasTouch || false;
                    await Promise.all([
                        client
                            .send('Emulation.setDeviceMetricsOverride', {
                            mobile,
                            width,
                            height,
                            deviceScaleFactor,
                            screenOrientation,
                        })
                            .catch(err => {
                            if (err.message.includes('Target does not support metrics override')) {
                                debugError(err);
                                return;
                            }
                            throw err;
                        }),
                        client.send('Emulation.setTouchEmulationEnabled', {
                            enabled: hasTouch,
                        }),
                    ]);
                }, "#applyViewport") }, _private_applyViewport_decorators, { kind: "method", name: "#applyViewport", static: false, private: true, access: { has: obj => #applyViewport in obj, get: obj => obj.#applyViewport }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateIdleState_descriptor = { value: __setFunctionName(async function (client, idleStateState) {
                    if (!idleStateState.active) {
                        return;
                    }
                    if (idleStateState.overrides) {
                        await client.send('Emulation.setIdleOverride', {
                            isUserActive: idleStateState.overrides.isUserActive,
                            isScreenUnlocked: idleStateState.overrides.isScreenUnlocked,
                        });
                    }
                    else {
                        await client.send('Emulation.clearIdleOverride');
                    }
                }, "#emulateIdleState") }, _private_emulateIdleState_decorators, { kind: "method", name: "#emulateIdleState", static: false, private: true, access: { has: obj => #emulateIdleState in obj, get: obj => obj.#emulateIdleState }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateTimezone_descriptor = { value: __setFunctionName(async function (client, timezoneState) {
                    if (!timezoneState.active) {
                        return;
                    }
                    try {
                        await client.send('Emulation.setTimezoneOverride', {
                            timezoneId: timezoneState.timezoneId || '',
                        });
                    }
                    catch (error) {
                        if (isErrorLike(error) && error.message.includes('Invalid timezone')) {
                            throw new Error(`Invalid timezone ID: ${timezoneState.timezoneId}`);
                        }
                        throw error;
                    }
                }, "#emulateTimezone") }, _private_emulateTimezone_decorators, { kind: "method", name: "#emulateTimezone", static: false, private: true, access: { has: obj => #emulateTimezone in obj, get: obj => obj.#emulateTimezone }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateVisionDeficiency_descriptor = { value: __setFunctionName(async function (client, visionDeficiency) {
                    if (!visionDeficiency.active) {
                        return;
                    }
                    await client.send('Emulation.setEmulatedVisionDeficiency', {
                        type: visionDeficiency.visionDeficiency || 'none',
                    });
                }, "#emulateVisionDeficiency") }, _private_emulateVisionDeficiency_decorators, { kind: "method", name: "#emulateVisionDeficiency", static: false, private: true, access: { has: obj => #emulateVisionDeficiency in obj, get: obj => obj.#emulateVisionDeficiency }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateCpuThrottling_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setCPUThrottlingRate', {
                        rate: state.factor ?? 1,
                    });
                }, "#emulateCpuThrottling") }, _private_emulateCpuThrottling_decorators, { kind: "method", name: "#emulateCpuThrottling", static: false, private: true, access: { has: obj => #emulateCpuThrottling in obj, get: obj => obj.#emulateCpuThrottling }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateMediaFeatures_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setEmulatedMedia', {
                        features: state.mediaFeatures,
                    });
                }, "#emulateMediaFeatures") }, _private_emulateMediaFeatures_decorators, { kind: "method", name: "#emulateMediaFeatures", static: false, private: true, access: { has: obj => #emulateMediaFeatures in obj, get: obj => obj.#emulateMediaFeatures }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateMediaType_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setEmulatedMedia', {
                        media: state.type || '',
                    });
                }, "#emulateMediaType") }, _private_emulateMediaType_decorators, { kind: "method", name: "#emulateMediaType", static: false, private: true, access: { has: obj => #emulateMediaType in obj, get: obj => obj.#emulateMediaType }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_setGeolocation_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setGeolocationOverride', state.geoLocation
                        ? {
                            longitude: state.geoLocation.longitude,
                            latitude: state.geoLocation.latitude,
                            accuracy: state.geoLocation.accuracy,
                        }
                        : undefined);
                }, "#setGeolocation") }, _private_setGeolocation_decorators, { kind: "method", name: "#setGeolocation", static: false, private: true, access: { has: obj => #setGeolocation in obj, get: obj => obj.#setGeolocation }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_setDefaultBackgroundColor_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setDefaultBackgroundColorOverride', {
                        color: state.color,
                    });
                }, "#setDefaultBackgroundColor") }, _private_setDefaultBackgroundColor_decorators, { kind: "method", name: "#setDefaultBackgroundColor", static: false, private: true, access: { has: obj => #setDefaultBackgroundColor in obj, get: obj => obj.#setDefaultBackgroundColor }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_setJavaScriptEnabled_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setScriptExecutionDisabled', {
                        value: !state.javaScriptEnabled,
                    });
                }, "#setJavaScriptEnabled") }, _private_setJavaScriptEnabled_decorators, { kind: "method", name: "#setJavaScriptEnabled", static: false, private: true, access: { has: obj => #setJavaScriptEnabled in obj, get: obj => obj.#setJavaScriptEnabled }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, _private_emulateFocus_descriptor = { value: __setFunctionName(async function (client, state) {
                    if (!state.active) {
                        return;
                    }
                    await client.send('Emulation.setFocusEmulationEnabled', {
                        enabled: state.enabled,
                    });
                }, "#emulateFocus") }, _private_emulateFocus_decorators, { kind: "method", name: "#emulateFocus", static: false, private: true, access: { has: obj => #emulateFocus in obj, get: obj => obj.#emulateFocus }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #client = __runInitializers(this, _instanceExtraInitializers);
        #emulatingMobile = false;
        #hasTouch = false;
        #states = [];
        #viewportState = new EmulatedState({
            active: false,
        }, this, this.#applyViewport);
        #idleOverridesState = new EmulatedState({
            active: false,
        }, this, this.#emulateIdleState);
        #timezoneState = new EmulatedState({
            active: false,
        }, this, this.#emulateTimezone);
        #visionDeficiencyState = new EmulatedState({
            active: false,
        }, this, this.#emulateVisionDeficiency);
        #cpuThrottlingState = new EmulatedState({
            active: false,
        }, this, this.#emulateCpuThrottling);
        #mediaFeaturesState = new EmulatedState({
            active: false,
        }, this, this.#emulateMediaFeatures);
        #mediaTypeState = new EmulatedState({
            active: false,
        }, this, this.#emulateMediaType);
        #geoLocationState = new EmulatedState({
            active: false,
        }, this, this.#setGeolocation);
        #defaultBackgroundColorState = new EmulatedState({
            active: false,
        }, this, this.#setDefaultBackgroundColor);
        #javascriptEnabledState = new EmulatedState({
            javaScriptEnabled: true,
            active: false,
        }, this, this.#setJavaScriptEnabled);
        #focusState = new EmulatedState({
            enabled: true,
            active: false,
        }, this, this.#emulateFocus);
        #secondaryClients = new Set();
        constructor(client) {
            this.#client = client;
        }
        updateClient(client) {
            this.#client = client;
            this.#secondaryClients.delete(client);
        }
        registerState(state) {
            this.#states.push(state);
        }
        clients() {
            return [this.#client, ...Array.from(this.#secondaryClients)];
        }
        async registerSpeculativeSession(client) {
            this.#secondaryClients.add(client);
            client.once(CDPSessionEvent.Disconnected, () => {
                this.#secondaryClients.delete(client);
            });
            // We don't await here because we want to register all state changes before
            // the target is unpaused.
            void Promise.all(this.#states.map(s => {
                return s.sync().catch(debugError);
            }));
        }
        get javascriptEnabled() {
            return this.#javascriptEnabledState.state.javaScriptEnabled;
        }
        async emulateViewport(viewport) {
            const currentState = this.#viewportState.state;
            if (!viewport && !currentState.active) {
                return false;
            }
            await this.#viewportState.setState(viewport
                ? {
                    viewport,
                    active: true,
                }
                : {
                    active: false,
                });
            const mobile = viewport?.isMobile || false;
            const hasTouch = viewport?.hasTouch || false;
            const reloadNeeded = this.#emulatingMobile !== mobile || this.#hasTouch !== hasTouch;
            this.#emulatingMobile = mobile;
            this.#hasTouch = hasTouch;
            return reloadNeeded;
        }
        get #applyViewport() { return _private_applyViewport_descriptor.value; }
        async emulateIdleState(overrides) {
            await this.#idleOverridesState.setState({
                active: true,
                overrides,
            });
        }
        get #emulateIdleState() { return _private_emulateIdleState_descriptor.value; }
        get #emulateTimezone() { return _private_emulateTimezone_descriptor.value; }
        async emulateTimezone(timezoneId) {
            await this.#timezoneState.setState({
                timezoneId,
                active: true,
            });
        }
        get #emulateVisionDeficiency() { return _private_emulateVisionDeficiency_descriptor.value; }
        async emulateVisionDeficiency(type) {
            const visionDeficiencies = new Set([
                'none',
                'achromatopsia',
                'blurredVision',
                'deuteranopia',
                'protanopia',
                'reducedContrast',
                'tritanopia',
            ]);
            assert(!type || visionDeficiencies.has(type), `Unsupported vision deficiency: ${type}`);
            await this.#visionDeficiencyState.setState({
                active: true,
                visionDeficiency: type,
            });
        }
        get #emulateCpuThrottling() { return _private_emulateCpuThrottling_descriptor.value; }
        async emulateCPUThrottling(factor) {
            assert(factor === null || factor >= 1, 'Throttling rate should be greater or equal to 1');
            await this.#cpuThrottlingState.setState({
                active: true,
                factor: factor ?? undefined,
            });
        }
        get #emulateMediaFeatures() { return _private_emulateMediaFeatures_descriptor.value; }
        async emulateMediaFeatures(features) {
            if (Array.isArray(features)) {
                for (const mediaFeature of features) {
                    const name = mediaFeature.name;
                    assert(/^(?:prefers-(?:color-scheme|reduced-motion)|color-gamut)$/.test(name), 'Unsupported media feature: ' + name);
                }
            }
            await this.#mediaFeaturesState.setState({
                active: true,
                mediaFeatures: features,
            });
        }
        get #emulateMediaType() { return _private_emulateMediaType_descriptor.value; }
        async emulateMediaType(type) {
            assert(type === 'screen' ||
                type === 'print' ||
                (type ?? undefined) === undefined, 'Unsupported media type: ' + type);
            await this.#mediaTypeState.setState({
                type,
                active: true,
            });
        }
        get #setGeolocation() { return _private_setGeolocation_descriptor.value; }
        async setGeolocation(options) {
            const { longitude, latitude, accuracy = 0 } = options;
            if (longitude < -180 || longitude > 180) {
                throw new Error(`Invalid longitude "${longitude}": precondition -180 <= LONGITUDE <= 180 failed.`);
            }
            if (latitude < -90 || latitude > 90) {
                throw new Error(`Invalid latitude "${latitude}": precondition -90 <= LATITUDE <= 90 failed.`);
            }
            if (accuracy < 0) {
                throw new Error(`Invalid accuracy "${accuracy}": precondition 0 <= ACCURACY failed.`);
            }
            await this.#geoLocationState.setState({
                active: true,
                geoLocation: {
                    longitude,
                    latitude,
                    accuracy,
                },
            });
        }
        get #setDefaultBackgroundColor() { return _private_setDefaultBackgroundColor_descriptor.value; }
        /**
         * Resets default white background
         */
        async resetDefaultBackgroundColor() {
            await this.#defaultBackgroundColorState.setState({
                active: true,
                color: undefined,
            });
        }
        /**
         * Hides default white background
         */
        async setTransparentBackgroundColor() {
            await this.#defaultBackgroundColorState.setState({
                active: true,
                color: { r: 0, g: 0, b: 0, a: 0 },
            });
        }
        get #setJavaScriptEnabled() { return _private_setJavaScriptEnabled_descriptor.value; }
        async setJavaScriptEnabled(enabled) {
            await this.#javascriptEnabledState.setState({
                active: true,
                javaScriptEnabled: enabled,
            });
        }
        get #emulateFocus() { return _private_emulateFocus_descriptor.value; }
        async emulateFocus(enabled) {
            await this.#focusState.setState({
                active: true,
                enabled,
            });
        }
    };
})();

/**
 * @license
 * Copyright 2026 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpIssue {
    #code;
    #details;
    constructor(issue) {
        this.#code = issue.code;
        this.#details = issue.details;
    }
    get code() {
        return this.#code;
    }
    get details() {
        return this.#details;
    }
}

/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpPreloadScript {
    /**
     * This is the ID of the preload script returned by
     * Page.addScriptToEvaluateOnNewDocument in the main frame.
     *
     * Sub-frames would get a different CDP ID because
     * addScriptToEvaluateOnNewDocument is called for each subframe. But
     * users only see this ID and subframe IDs are internal to Puppeteer.
     */
    #id;
    #source;
    #frameToId = new WeakMap();
    constructor(mainFrame, id, source) {
        this.#id = id;
        this.#source = source;
        this.#frameToId.set(mainFrame, id);
    }
    get id() {
        return this.#id;
    }
    get source() {
        return this.#source;
    }
    getIdForFrame(frame) {
        return this.#frameToId.get(frame);
    }
    setIdForFrame(frame, identifier) {
        this.#frameToId.set(frame, identifier);
    }
}

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpDeviceRequestPrompt extends DeviceRequestPrompt {
    #client;
    #timeoutSettings;
    #id;
    #handled = false;
    #updateDevicesHandle = this.#updateDevices.bind(this);
    #waitForDevicePromises = new Set();
    constructor(client, timeoutSettings, firstEvent) {
        super();
        this.#client = client;
        this.#timeoutSettings = timeoutSettings;
        this.#id = firstEvent.id;
        this.#client.on('DeviceAccess.deviceRequestPrompted', this.#updateDevicesHandle);
        this.#client.on('Target.detachedFromTarget', () => {
            this.#client = null;
        });
        this.#updateDevices(firstEvent);
    }
    #updateDevices(event) {
        if (event.id !== this.#id) {
            return;
        }
        for (const rawDevice of event.devices) {
            if (this.devices.some(device => {
                return device.id === rawDevice.id;
            })) {
                continue;
            }
            const newDevice = { id: rawDevice.id, name: rawDevice.name };
            this.devices.push(newDevice);
            for (const waitForDevicePromise of this.#waitForDevicePromises) {
                if (waitForDevicePromise.filter(newDevice)) {
                    waitForDevicePromise.promise.resolve(newDevice);
                }
            }
        }
    }
    async waitForDevice(filter, options = {}) {
        for (const device of this.devices) {
            if (filter(device)) {
                return device;
            }
        }
        const { timeout = this.#timeoutSettings.timeout() } = options;
        const deferred = Deferred.create({
            message: `Waiting for \`DeviceRequestPromptDevice\` failed: ${timeout}ms exceeded`,
            timeout,
        });
        if (options.signal) {
            options.signal.addEventListener('abort', () => {
                deferred.reject(options.signal?.reason);
            }, { once: true });
        }
        const handle = { filter, promise: deferred };
        this.#waitForDevicePromises.add(handle);
        try {
            return await deferred.valueOrThrow();
        }
        finally {
            this.#waitForDevicePromises.delete(handle);
        }
    }
    async select(device) {
        assert(this.#client !== null, 'Cannot select device through detached session!');
        assert(this.devices.includes(device), 'Cannot select unknown device!');
        assert(!this.#handled, 'Cannot select DeviceRequestPrompt which is already handled!');
        this.#client.off('DeviceAccess.deviceRequestPrompted', this.#updateDevicesHandle);
        this.#handled = true;
        return await this.#client.send('DeviceAccess.selectPrompt', {
            id: this.#id,
            deviceId: device.id,
        });
    }
    async cancel() {
        assert(this.#client !== null, 'Cannot cancel prompt through detached session!');
        assert(!this.#handled, 'Cannot cancel DeviceRequestPrompt which is already handled!');
        this.#client.off('DeviceAccess.deviceRequestPrompted', this.#updateDevicesHandle);
        this.#handled = true;
        return await this.#client.send('DeviceAccess.cancelPrompt', { id: this.#id });
    }
}
/**
 * @internal
 */
class CdpDeviceRequestPromptManager {
    #client;
    #timeoutSettings;
    #deviceRequestPromptDeferreds = new Set();
    constructor(client, timeoutSettings) {
        this.#client = client;
        this.#timeoutSettings = timeoutSettings;
        this.#client.on('DeviceAccess.deviceRequestPrompted', event => {
            this.#onDeviceRequestPrompted(event);
        });
        this.#client.on('Target.detachedFromTarget', () => {
            this.#client = null;
        });
    }
    async waitForDevicePrompt(options = {}) {
        assert(this.#client !== null, 'Cannot wait for device prompt through detached session!');
        const needsEnable = this.#deviceRequestPromptDeferreds.size === 0;
        let enablePromise;
        if (needsEnable) {
            enablePromise = this.#client.send('DeviceAccess.enable');
        }
        const { timeout = this.#timeoutSettings.timeout() } = options;
        const deferred = Deferred.create({
            message: `Waiting for \`DeviceRequestPrompt\` failed: ${timeout}ms exceeded`,
            timeout,
        });
        if (options.signal) {
            options.signal.addEventListener('abort', () => {
                deferred.reject(options.signal?.reason);
            }, { once: true });
        }
        this.#deviceRequestPromptDeferreds.add(deferred);
        try {
            const [result] = await Promise.all([
                deferred.valueOrThrow(),
                enablePromise,
            ]);
            return result;
        }
        finally {
            this.#deviceRequestPromptDeferreds.delete(deferred);
        }
    }
    #onDeviceRequestPrompted(event) {
        if (!this.#deviceRequestPromptDeferreds.size) {
            return;
        }
        assert(this.#client !== null);
        const devicePrompt = new CdpDeviceRequestPrompt(this.#client, this.#timeoutSettings, event);
        for (const promise of this.#deviceRequestPromptDeferreds) {
            promise.resolve(devicePrompt);
        }
        this.#deviceRequestPromptDeferreds.clear();
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
function createConsoleMessage(event, values, targetId) {
    const textTokens = [];
    // eslint-disable-next-line max-len -- The comment is long.
    // eslint-disable-next-line @puppeteer/use-using -- These are not owned by this function.
    for (const arg of values) {
        textTokens.push(valueFromJSHandle(arg));
    }
    const stackTraceLocations = [];
    if (event.stackTrace) {
        for (const callFrame of event.stackTrace.callFrames) {
            stackTraceLocations.push({
                url: callFrame.url,
                lineNumber: callFrame.lineNumber,
                columnNumber: callFrame.columnNumber,
            });
        }
    }
    return new ConsoleMessage(convertConsoleMessageLevel(event.type), textTokens.join(' '), values, stackTraceLocations, undefined, event.stackTrace, targetId);
}
/**
 * @internal
 */
function createEvaluationError(details) {
    let name;
    let message;
    if (!details.exception) {
        name = 'Error';
        message = details.text;
    }
    else if ((details.exception.type !== 'object' ||
        details.exception.subtype !== 'error') &&
        !details.exception.objectId) {
        return valueFromPrimitiveRemoteObject(details.exception);
    }
    else {
        const detail = getErrorDetails(details);
        name = detail.name;
        message = detail.message;
    }
    const messageHeight = message.split('\n').length;
    const error = new Error(message);
    error.name = name;
    const stackLines = error.stack.split('\n');
    const messageLines = stackLines.splice(0, messageHeight);
    // The first line is this function which we ignore.
    stackLines.shift();
    if (details.stackTrace && stackLines.length < Error.stackTraceLimit) {
        for (const frame of details.stackTrace.callFrames.reverse()) {
            if (PuppeteerURL.isPuppeteerURL(frame.url) &&
                frame.url !== PuppeteerURL.INTERNAL_URL) {
                const url = PuppeteerURL.parse(frame.url);
                stackLines.unshift(`    at ${frame.functionName || url.functionName} (${url.functionName} at ${url.siteString}, <anonymous>:${frame.lineNumber}:${frame.columnNumber})`);
            }
            else {
                stackLines.push(`    at ${frame.functionName || '<anonymous>'} (${frame.url}:${frame.lineNumber}:${frame.columnNumber})`);
            }
            if (stackLines.length >= Error.stackTraceLimit) {
                break;
            }
        }
    }
    error.stack = [...messageLines, ...stackLines].join('\n');
    return error;
}
const getErrorDetails = (details) => {
    let name = '';
    let message;
    const lines = details.exception?.description?.split('\n    at ') ?? [];
    const size = Math.min(details.stackTrace?.callFrames.length ?? 0, lines.length - 1);
    lines.splice(-size, size);
    if (details.exception?.className) {
        name = details.exception.className;
    }
    message = lines.join('\n');
    if (name && message.startsWith(`${name}: `)) {
        message = message.slice(name.length + 2);
    }
    return { message, name };
};
/**
 * @internal
 */
function createClientError(details) {
    let name;
    let message;
    if (!details.exception) {
        name = 'Error';
        message = details.text;
    }
    else if ((details.exception.type !== 'object' ||
        details.exception.subtype !== 'error') &&
        !details.exception.objectId) {
        return valueFromPrimitiveRemoteObject(details.exception);
    }
    else {
        const detail = getErrorDetails(details);
        name = detail.name;
        message = detail.message;
    }
    const error = new Error(message);
    error.name = name;
    const messageHeight = error.message.split('\n').length;
    const messageLines = error.stack.split('\n').splice(0, messageHeight);
    const stackLines = [];
    if (details.stackTrace) {
        for (const frame of details.stackTrace.callFrames) {
            // Note we need to add `1` because the values are 0-indexed.
            stackLines.push(`    at ${frame.functionName || '<anonymous>'} (${frame.url}:${frame.lineNumber + 1}:${frame.columnNumber + 1})`);
            if (stackLines.length >= Error.stackTraceLimit) {
                break;
            }
        }
    }
    error.stack = [...messageLines, ...stackLines].join('\n');
    return error;
}
/**
 * @internal
 */
function valueFromJSHandle(handle) {
    const remoteObject = handle.remoteObject();
    if (remoteObject.objectId) {
        return valueFromRemoteObjectReference(handle);
    }
    else {
        return valueFromPrimitiveRemoteObject(remoteObject);
    }
}
/**
 * @internal
 */
function valueFromRemoteObjectReference(handle) {
    const remoteObject = handle.remoteObject();
    assert(remoteObject.objectId, 'Cannot extract value when no objectId is given');
    const description = remoteObject.description ?? '';
    if (remoteObject.subtype === 'error' && description) {
        const newlineIdx = description.indexOf('\n');
        if (newlineIdx === -1) {
            return description;
        }
        return description.slice(0, newlineIdx);
    }
    return `[${remoteObject.subtype || remoteObject.type} ${remoteObject.className}]`;
}
/**
 * @internal
 */
function valueFromPrimitiveRemoteObject(remoteObject) {
    assert(!remoteObject.objectId, 'Cannot extract value when objectId is given');
    if (remoteObject.unserializableValue) {
        if (remoteObject.type === 'bigint') {
            return BigInt(remoteObject.unserializableValue.replace('n', ''));
        }
        switch (remoteObject.unserializableValue) {
            case '-0':
                return -0;
            case 'NaN':
                return NaN;
            case 'Infinity':
                return Infinity;
            case '-Infinity':
                return -Infinity;
            default:
                throw new Error('Unsupported unserializable value: ' +
                    remoteObject.unserializableValue);
        }
    }
    return remoteObject.value;
}
/**
 * @internal
 */
function addPageBinding(type, name, prefix) {
    // Depending on the frame loading state either Runtime.evaluate or
    // Page.addScriptToEvaluateOnNewDocument might succeed. Let's check that we
    // don't re-wrap Puppeteer's binding.
    // @ts-expect-error: In a different context.
    if (globalThis[name]) {
        return;
    }
    // We replace the CDP binding with a Puppeteer binding.
    Object.assign(globalThis, {
        [name](...args) {
            // This is the Puppeteer binding.
            // @ts-expect-error: In a different context.
            const callPuppeteer = globalThis[name];
            callPuppeteer.args ??= new Map();
            callPuppeteer.callbacks ??= new Map();
            const seq = (callPuppeteer.lastSeq ?? 0) + 1;
            callPuppeteer.lastSeq = seq;
            callPuppeteer.args.set(seq, args);
            // @ts-expect-error: In a different context.
            // Needs to be the same as CDP_BINDING_PREFIX.
            globalThis[prefix + name](JSON.stringify({
                type,
                name,
                seq,
                args,
                isTrivial: !args.some(value => {
                    return value instanceof Node;
                }),
            }));
            return new Promise((resolve, reject) => {
                callPuppeteer.callbacks.set(seq, {
                    resolve(value) {
                        callPuppeteer.args.delete(seq);
                        resolve(value);
                    },
                    reject(value) {
                        callPuppeteer.args.delete(seq);
                        reject(value);
                    },
                });
            });
        },
    });
}
/**
 * @internal
 */
const CDP_BINDING_PREFIX = 'puppeteer_';
/**
 * @internal
 */
function pageBindingInitString(type, name) {
    return evaluationString(addPageBinding, type, name, CDP_BINDING_PREFIX);
}
/**
 * @internal
 */
function convertConsoleMessageLevel(method) {
    switch (method) {
        case 'warning':
            return 'warn';
        default:
            return method;
    }
}

/**
 * @license
 * Copyright 2019 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpJSHandle extends JSHandle {
    #disposed = false;
    #remoteObject;
    #world;
    constructor(world, remoteObject) {
        super();
        this.#world = world;
        this.#remoteObject = remoteObject;
    }
    get disposed() {
        return this.#disposed;
    }
    get realm() {
        return this.#world;
    }
    get client() {
        return this.realm.environment.client;
    }
    async jsonValue() {
        if (!this.#remoteObject.objectId) {
            return valueFromPrimitiveRemoteObject(this.#remoteObject);
        }
        const value = await this.evaluate(object => {
            return object;
        });
        if (value === undefined) {
            throw new Error('Could not serialize referenced object');
        }
        return value;
    }
    /**
     * Either `null` or the handle itself if the handle is an
     * instance of {@link ElementHandle}.
     */
    asElement() {
        return null;
    }
    async dispose() {
        if (this.#disposed) {
            return;
        }
        this.#disposed = true;
        await releaseObject(this.client, this.#remoteObject);
    }
    toString() {
        if (!this.#remoteObject.objectId) {
            return 'JSHandle:' + valueFromPrimitiveRemoteObject(this.#remoteObject);
        }
        const type = this.#remoteObject.subtype || this.#remoteObject.type;
        return 'JSHandle@' + type;
    }
    get id() {
        return this.#remoteObject.objectId;
    }
    remoteObject() {
        return this.#remoteObject;
    }
    async getProperties() {
        // We use Runtime.getProperties rather than iterative version for
        // improved performance as it allows getting everything at once.
        const response = await this.client.send('Runtime.getProperties', {
            objectId: this.#remoteObject.objectId,
            ownProperties: true,
        });
        const result = new Map();
        for (const property of response.result) {
            if (!property.enumerable || !property.value) {
                continue;
            }
            result.set(property.name, this.#world.createCdpHandle(property.value));
        }
        return result;
    }
}
/**
 * @internal
 */
async function releaseObject(client, remoteObject) {
    if (!remoteObject.objectId) {
        return;
    }
    await client
        .send('Runtime.releaseObject', { objectId: remoteObject.objectId })
        .catch(error => {
        // Exceptions might happen in case of a page been navigated or closed.
        // Swallow these since they are harmless and we don't leak anything in this case.
        debugError(error);
    });
}

export { CdpJSHandle as C, EmulationManager as E, CDP_BINDING_PREFIX as a, addPageBinding as b, createEvaluationError as c, createConsoleMessage as d, CdpIssue as e, CdpPreloadScript as f, CdpDeviceRequestPromptManager as g, ConsoleMessage as h, convertConsoleMessageLevel as i, createClientError as j, pageBindingInitString as p, releaseObject as r, valueFromPrimitiveRemoteObject as v };
