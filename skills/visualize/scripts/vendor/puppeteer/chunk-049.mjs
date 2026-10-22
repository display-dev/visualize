// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { g as Deferred, h as DeviceRequestPrompt, D as DisposableStack, E as EventEmitter, d as disposeSymbol } from './chunk-017.mjs';
import { U as UnsupportedOperation, c as TouchError } from './chunk-015.mjs';
import { a as inertIfDisposed, t as throwIfDisposed } from './chunk-018.mjs';
import { K as Keyboard, M as Mouse, a as MouseButton, b as Touchscreen } from './chunk-022.mjs';

/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class BidiBluetoothEmulation {
    #session;
    #contextId;
    constructor(contextId, session) {
        this.#contextId = contextId;
        this.#session = session;
    }
    async emulateAdapter(state, leSupported = true) {
        await this.#session.send('bluetooth.simulateAdapter', {
            context: this.#contextId,
            state,
            leSupported,
        });
    }
    async disableEmulation() {
        await this.#session.send('bluetooth.disableSimulation', {
            context: this.#contextId,
        });
    }
    async simulatePreconnectedPeripheral(preconnectedPeripheral) {
        await this.#session.send('bluetooth.simulatePreconnectedPeripheral', {
            context: this.#contextId,
            address: preconnectedPeripheral.address,
            name: preconnectedPeripheral.name,
            manufacturerData: preconnectedPeripheral.manufacturerData,
            knownServiceUuids: preconnectedPeripheral.knownServiceUuids,
        });
    }
}

/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class BidiDeviceRequestPromptManager {
    #session;
    #contextId;
    #enabled = false;
    constructor(contextId, session) {
        this.#session = session;
        this.#contextId = contextId;
    }
    async #enableIfNeeded() {
        if (!this.#enabled) {
            this.#enabled = true;
            await this.#session.subscribe(['bluetooth.requestDevicePromptUpdated'], [this.#contextId]);
        }
    }
    async waitForDevicePrompt(timeout, signal) {
        const deferred = Deferred.create({
            message: `Waiting for \`DeviceRequestPrompt\` failed: ${timeout}ms exceeded`,
            timeout,
        });
        const onRequestDevicePromptUpdated = (params) => {
            if (params.context === this.#contextId) {
                deferred.resolve(new BidiDeviceRequestPrompt(this.#contextId, params.prompt, this.#session, params.devices));
                this.#session.off('bluetooth.requestDevicePromptUpdated', onRequestDevicePromptUpdated);
            }
        };
        this.#session.on('bluetooth.requestDevicePromptUpdated', onRequestDevicePromptUpdated);
        if (signal) {
            signal.addEventListener('abort', () => {
                deferred.reject(signal.reason);
            }, { once: true });
        }
        await this.#enableIfNeeded();
        return await deferred.valueOrThrow();
    }
}
/**
 * @internal
 */
class BidiDeviceRequestPrompt extends DeviceRequestPrompt {
    #session;
    #promptId;
    #contextId;
    constructor(contextId, promptId, session, devices) {
        super();
        this.#session = session;
        this.#promptId = promptId;
        this.#contextId = contextId;
        this.devices.push(...devices.map(d => {
            return {
                id: d.id,
                name: d.name ?? 'UNKNOWN',
            };
        }));
    }
    async cancel() {
        await this.#session.send('bluetooth.handleRequestDevicePrompt', {
            context: this.#contextId,
            prompt: this.#promptId,
            accept: false,
        });
    }
    async select(device) {
        await this.#session.send('bluetooth.handleRequestDevicePrompt', {
            context: this.#contextId,
            prompt: this.#promptId,
            accept: true,
            device: device.id,
        });
    }
    waitForDevice() {
        throw new UnsupportedOperation();
    }
}

/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var __runInitializers$1 = (undefined && undefined.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate$1 = (undefined && undefined.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
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
/**
 * @internal
 */
let Navigation = (() => {
    let _classSuper = EventEmitter;
    let _instanceExtraInitializers = [];
    let _dispose_decorators;
    return class Navigation extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate$1(this, null, _dispose_decorators, { kind: "method", name: "dispose", static: false, private: false, access: { has: obj => "dispose" in obj, get: obj => obj.dispose }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static from(context) {
            const navigation = new Navigation(context);
            navigation.#initialize();
            return navigation;
        }
        #request = __runInitializers$1(this, _instanceExtraInitializers);
        #navigation;
        #browsingContext;
        #disposables = new DisposableStack();
        #id;
        constructor(context) {
            super();
            this.#browsingContext = context;
        }
        #initialize() {
            const browsingContextEmitter = this.#disposables.use(new EventEmitter(this.#browsingContext));
            browsingContextEmitter.once('closed', () => {
                this.emit('failed', {
                    url: this.#browsingContext.url,
                    timestamp: new Date(),
                });
                this.dispose();
            });
            browsingContextEmitter.on('request', request => {
                if (request.navigation === undefined ||
                    // If a request with a navigation ID comes in, then the navigation ID is
                    // for this navigation.
                    !this.#matches(request.navigation)) {
                    return;
                }
                this.#request = request;
                this.emit('request', request);
                const requestEmitter = this.#disposables.use(new EventEmitter(this.#request));
                requestEmitter.on('redirect', request => {
                    this.#request = request;
                });
            });
            const sessionEmitter = this.#disposables.use(new EventEmitter(this.#session));
            sessionEmitter.on('browsingContext.navigationStarted', info => {
                if (info.context !== this.#browsingContext.id ||
                    this.#navigation !== undefined) {
                    return;
                }
                this.#navigation = Navigation.from(this.#browsingContext);
            });
            for (const eventName of [
                'browsingContext.domContentLoaded',
                'browsingContext.load',
                'browsingContext.navigationCommitted',
            ]) {
                sessionEmitter.on(eventName, info => {
                    if (info.context !== this.#browsingContext.id ||
                        info.navigation === null ||
                        !this.#matches(info.navigation)) {
                        return;
                    }
                    this.dispose();
                });
            }
            for (const [eventName, event] of [
                ['browsingContext.fragmentNavigated', 'fragment'],
                ['browsingContext.navigationFailed', 'failed'],
                ['browsingContext.navigationAborted', 'aborted'],
            ]) {
                sessionEmitter.on(eventName, info => {
                    if (info.context !== this.#browsingContext.id ||
                        // Note we don't check if `navigation` is null since `null` means the
                        // fragment navigated.
                        !this.#matches(info.navigation)) {
                        return;
                    }
                    this.emit(event, {
                        url: info.url,
                        timestamp: new Date(info.timestamp),
                    });
                    this.dispose();
                });
            }
        }
        #matches(navigation) {
            if (this.#navigation !== undefined && !this.#navigation.disposed) {
                return false;
            }
            if (this.#id === undefined) {
                this.#id = navigation;
                return true;
            }
            return this.#id === navigation;
        }
        get #session() {
            return this.#browsingContext.userContext.browser.session;
        }
        get disposed() {
            return this.#disposables.disposed;
        }
        get request() {
            return this.#request;
        }
        get navigation() {
            return this.#navigation;
        }
        dispose() {
            this[disposeSymbol]();
        }
        [(_dispose_decorators = [inertIfDisposed], disposeSymbol)]() {
            this.#disposables.dispose();
            super[disposeSymbol]();
        }
    };
})();

/**
 * @license
 * Copyright 2024 Google Inc.
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
var _a;
/**
 * @internal
 */
let Realm = (() => {
    let _classSuper = EventEmitter;
    let _instanceExtraInitializers = [];
    let _dispose_decorators;
    let _disown_decorators;
    let _callFunction_decorators;
    let _evaluate_decorators;
    let _resolveExecutionContextId_decorators;
    return class Realm extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(this, null, _dispose_decorators, { kind: "method", name: "dispose", static: false, private: false, access: { has: obj => "dispose" in obj, get: obj => obj.dispose }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _disown_decorators, { kind: "method", name: "disown", static: false, private: false, access: { has: obj => "disown" in obj, get: obj => obj.disown }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _callFunction_decorators, { kind: "method", name: "callFunction", static: false, private: false, access: { has: obj => "callFunction" in obj, get: obj => obj.callFunction }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _evaluate_decorators, { kind: "method", name: "evaluate", static: false, private: false, access: { has: obj => "evaluate" in obj, get: obj => obj.evaluate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _resolveExecutionContextId_decorators, { kind: "method", name: "resolveExecutionContextId", static: false, private: false, access: { has: obj => "resolveExecutionContextId" in obj, get: obj => obj.resolveExecutionContextId }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #reason = __runInitializers(this, _instanceExtraInitializers);
        disposables = new DisposableStack();
        id;
        origin;
        executionContextId;
        constructor(id, origin) {
            super();
            this.id = id;
            this.origin = origin;
        }
        get disposed() {
            return this.#reason !== undefined;
        }
        get target() {
            return { realm: this.id };
        }
        dispose(reason) {
            this.#reason = reason;
            this[disposeSymbol]();
        }
        async disown(handles) {
            await this.session.send('script.disown', {
                target: this.target,
                handles,
            });
        }
        async callFunction(functionDeclaration, awaitPromise, options = {}) {
            const { result } = await this.session.send('script.callFunction', {
                functionDeclaration,
                awaitPromise,
                target: this.target,
                ...options,
            });
            return result;
        }
        async evaluate(expression, awaitPromise, options = {}) {
            const { result } = await this.session.send('script.evaluate', {
                expression,
                awaitPromise,
                target: this.target,
                ...options,
            });
            return result;
        }
        async resolveExecutionContextId() {
            if (!this.executionContextId) {
                const { result } = await this.session.connection.send('goog:cdp.resolveRealm', { realm: this.id });
                this.executionContextId = result.executionContextId;
            }
            return this.executionContextId;
        }
        [(_dispose_decorators = [inertIfDisposed], _disown_decorators = [throwIfDisposed(realm => {
                // SAFETY: Disposal implies this exists.
                return realm.#reason;
            })], _callFunction_decorators = [throwIfDisposed(realm => {
                // SAFETY: Disposal implies this exists.
                return realm.#reason;
            })], _evaluate_decorators = [throwIfDisposed(realm => {
                // SAFETY: Disposal implies this exists.
                return realm.#reason;
            })], _resolveExecutionContextId_decorators = [throwIfDisposed(realm => {
                // SAFETY: Disposal implies this exists.
                return realm.#reason;
            })], disposeSymbol)]() {
            this.#reason ??=
                'Realm already destroyed, probably because all associated browsing contexts closed.';
            this.emit('destroyed', this.#reason);
            this.disposables.dispose();
            super[disposeSymbol]();
        }
    };
})();
/**
 * @internal
 */
class WindowRealm extends Realm {
    static from(context, sandbox) {
        const realm = new WindowRealm(context, sandbox);
        realm.#initialize();
        return realm;
    }
    browsingContext;
    sandbox;
    #workers = new Map();
    constructor(context, sandbox) {
        super('', '');
        this.browsingContext = context;
        this.sandbox = sandbox;
    }
    #initialize() {
        const browsingContextEmitter = this.disposables.use(new EventEmitter(this.browsingContext));
        browsingContextEmitter.on('closed', reason => {
            this.dispose(reason);
        });
        const sessionEmitter = this.disposables.use(new EventEmitter(this.session));
        sessionEmitter.on('script.realmCreated', info => {
            if (info.type !== 'window' ||
                info.context !== this.browsingContext.id ||
                info.sandbox !== this.sandbox) {
                return;
            }
            this.id = info.realm;
            this.origin = info.origin;
            this.executionContextId = undefined;
            this.emit('updated', this);
        });
        sessionEmitter.on('script.realmCreated', info => {
            if (info.type !== 'dedicated-worker') {
                return;
            }
            if (!info.owners.includes(this.id)) {
                return;
            }
            const realm = DedicatedWorkerRealm.from(this, info.realm, info.origin);
            this.#workers.set(realm.id, realm);
            const realmEmitter = this.disposables.use(new EventEmitter(realm));
            realmEmitter.once('destroyed', () => {
                realmEmitter.removeAllListeners();
                this.#workers.delete(realm.id);
            });
            this.emit('worker', realm);
        });
        sessionEmitter.on('log.entryAdded', entry => {
            if (entry.source.realm !== this.id) {
                return;
            }
            this.emit('log', entry);
        });
    }
    get session() {
        return this.browsingContext.userContext.browser.session;
    }
    get target() {
        return { context: this.browsingContext.id, sandbox: this.sandbox };
    }
}
/**
 * @internal
 */
class DedicatedWorkerRealm extends Realm {
    static from(owner, id, origin) {
        const realm = new _a(owner, id, origin);
        realm.#initialize();
        return realm;
    }
    #workers = new Map();
    owners;
    constructor(owner, id, origin) {
        super(id, origin);
        this.owners = new Set([owner]);
    }
    #initialize() {
        const sessionEmitter = this.disposables.use(new EventEmitter(this.session));
        sessionEmitter.on('script.realmDestroyed', info => {
            if (info.realm !== this.id) {
                return;
            }
            this.dispose('Realm already destroyed.');
        });
        sessionEmitter.on('script.realmCreated', info => {
            if (info.type !== 'dedicated-worker') {
                return;
            }
            if (!info.owners.includes(this.id)) {
                return;
            }
            const realm = _a.from(this, info.realm, info.origin);
            this.#workers.set(realm.id, realm);
            const realmEmitter = this.disposables.use(new EventEmitter(realm));
            realmEmitter.once('destroyed', () => {
                this.#workers.delete(realm.id);
            });
            this.emit('worker', realm);
        });
        sessionEmitter.on('log.entryAdded', entry => {
            if (entry.source.realm !== this.id) {
                return;
            }
            this.emit('log', entry);
        });
    }
    get session() {
        // SAFETY: At least one owner will exist.
        return this.owners.values().next().value.session;
    }
}
_a = DedicatedWorkerRealm;
/**
 * @internal
 */
class SharedWorkerRealm extends Realm {
    static from(browser, id, origin) {
        const realm = new SharedWorkerRealm(browser, id, origin);
        realm.#initialize();
        return realm;
    }
    #workers = new Map();
    browser;
    constructor(browser, id, origin) {
        super(id, origin);
        this.browser = browser;
    }
    #initialize() {
        const sessionEmitter = this.disposables.use(new EventEmitter(this.session));
        sessionEmitter.on('script.realmDestroyed', info => {
            if (info.realm !== this.id) {
                return;
            }
            this.dispose('Realm already destroyed.');
        });
        sessionEmitter.on('script.realmCreated', info => {
            if (info.type !== 'dedicated-worker') {
                return;
            }
            if (!info.owners.includes(this.id)) {
                return;
            }
            const realm = DedicatedWorkerRealm.from(this, info.realm, info.origin);
            this.#workers.set(realm.id, realm);
            const realmEmitter = this.disposables.use(new EventEmitter(realm));
            realmEmitter.once('destroyed', () => {
                this.#workers.delete(realm.id);
            });
            this.emit('worker', realm);
        });
        sessionEmitter.on('log.entryAdded', entry => {
            if (entry.source.realm !== this.id) {
                return;
            }
            this.emit('log', entry);
        });
    }
    get session() {
        return this.browser.session;
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
var SourceActionsType;
(function (SourceActionsType) {
    SourceActionsType["None"] = "none";
    SourceActionsType["Key"] = "key";
    SourceActionsType["Pointer"] = "pointer";
    SourceActionsType["Wheel"] = "wheel";
})(SourceActionsType || (SourceActionsType = {}));
var ActionType;
(function (ActionType) {
    ActionType["Pause"] = "pause";
    ActionType["KeyDown"] = "keyDown";
    ActionType["KeyUp"] = "keyUp";
    ActionType["PointerUp"] = "pointerUp";
    ActionType["PointerDown"] = "pointerDown";
    ActionType["PointerMove"] = "pointerMove";
    ActionType["Scroll"] = "scroll";
})(ActionType || (ActionType = {}));
const getBidiKeyValue = (key) => {
    switch (key) {
        case '\r':
        case '\n':
            key = 'Enter';
            break;
    }
    // Measures the number of code points rather than UTF-16 code units.
    if ([...key].length === 1) {
        return key;
    }
    switch (key) {
        case 'Cancel':
            return '\uE001';
        case 'Help':
            return '\uE002';
        case 'Backspace':
            return '\uE003';
        case 'Tab':
            return '\uE004';
        case 'Clear':
            return '\uE005';
        case 'Enter':
            return '\uE007';
        case 'Shift':
        case 'ShiftLeft':
            return '\uE008';
        case 'Control':
        case 'ControlLeft':
            return '\uE009';
        case 'Alt':
        case 'AltLeft':
            return '\uE00A';
        case 'Pause':
            return '\uE00B';
        case 'Escape':
            return '\uE00C';
        case 'PageUp':
            return '\uE00E';
        case 'PageDown':
            return '\uE00F';
        case 'End':
            return '\uE010';
        case 'Home':
            return '\uE011';
        case 'ArrowLeft':
            return '\uE012';
        case 'ArrowUp':
            return '\uE013';
        case 'ArrowRight':
            return '\uE014';
        case 'ArrowDown':
            return '\uE015';
        case 'Insert':
            return '\uE016';
        case 'Delete':
            return '\uE017';
        case 'NumpadEqual':
            return '\uE019';
        case 'Numpad0':
            return '\uE01A';
        case 'Numpad1':
            return '\uE01B';
        case 'Numpad2':
            return '\uE01C';
        case 'Numpad3':
            return '\uE01D';
        case 'Numpad4':
            return '\uE01E';
        case 'Numpad5':
            return '\uE01F';
        case 'Numpad6':
            return '\uE020';
        case 'Numpad7':
            return '\uE021';
        case 'Numpad8':
            return '\uE022';
        case 'Numpad9':
            return '\uE023';
        case 'NumpadMultiply':
            return '\uE024';
        case 'NumpadAdd':
            return '\uE025';
        case 'NumpadSubtract':
            return '\uE027';
        case 'NumpadDecimal':
            return '\uE028';
        case 'NumpadDivide':
            return '\uE029';
        case 'F1':
            return '\uE031';
        case 'F2':
            return '\uE032';
        case 'F3':
            return '\uE033';
        case 'F4':
            return '\uE034';
        case 'F5':
            return '\uE035';
        case 'F6':
            return '\uE036';
        case 'F7':
            return '\uE037';
        case 'F8':
            return '\uE038';
        case 'F9':
            return '\uE039';
        case 'F10':
            return '\uE03A';
        case 'F11':
            return '\uE03B';
        case 'F12':
            return '\uE03C';
        case 'Meta':
        case 'MetaLeft':
            return '\uE03D';
        case 'ShiftRight':
            return '\uE050';
        case 'ControlRight':
            return '\uE051';
        case 'AltRight':
            return '\uE052';
        case 'MetaRight':
            return '\uE053';
        case 'Digit0':
            return '0';
        case 'Digit1':
            return '1';
        case 'Digit2':
            return '2';
        case 'Digit3':
            return '3';
        case 'Digit4':
            return '4';
        case 'Digit5':
            return '5';
        case 'Digit6':
            return '6';
        case 'Digit7':
            return '7';
        case 'Digit8':
            return '8';
        case 'Digit9':
            return '9';
        case 'KeyA':
            return 'a';
        case 'KeyB':
            return 'b';
        case 'KeyC':
            return 'c';
        case 'KeyD':
            return 'd';
        case 'KeyE':
            return 'e';
        case 'KeyF':
            return 'f';
        case 'KeyG':
            return 'g';
        case 'KeyH':
            return 'h';
        case 'KeyI':
            return 'i';
        case 'KeyJ':
            return 'j';
        case 'KeyK':
            return 'k';
        case 'KeyL':
            return 'l';
        case 'KeyM':
            return 'm';
        case 'KeyN':
            return 'n';
        case 'KeyO':
            return 'o';
        case 'KeyP':
            return 'p';
        case 'KeyQ':
            return 'q';
        case 'KeyR':
            return 'r';
        case 'KeyS':
            return 's';
        case 'KeyT':
            return 't';
        case 'KeyU':
            return 'u';
        case 'KeyV':
            return 'v';
        case 'KeyW':
            return 'w';
        case 'KeyX':
            return 'x';
        case 'KeyY':
            return 'y';
        case 'KeyZ':
            return 'z';
        case 'Semicolon':
            return ';';
        case 'Equal':
            return '=';
        case 'Comma':
            return ',';
        case 'Minus':
            return '-';
        case 'Period':
            return '.';
        case 'Slash':
            return '/';
        case 'Backquote':
            return '`';
        case 'BracketLeft':
            return '[';
        case 'Backslash':
            return '\\';
        case 'BracketRight':
            return ']';
        case 'Quote':
            return '"';
        default:
            throw new Error(`Unknown key: "${key}"`);
    }
};
/**
 * @internal
 */
class BidiKeyboard extends Keyboard {
    #page;
    constructor(page) {
        super();
        this.#page = page;
    }
    async down(key, _options) {
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Key,
                id: "__puppeteer_keyboard" /* InputId.Keyboard */,
                actions: [
                    {
                        type: ActionType.KeyDown,
                        value: getBidiKeyValue(key),
                    },
                ],
            },
        ]);
    }
    async up(key) {
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Key,
                id: "__puppeteer_keyboard" /* InputId.Keyboard */,
                actions: [
                    {
                        type: ActionType.KeyUp,
                        value: getBidiKeyValue(key),
                    },
                ],
            },
        ]);
    }
    async press(key, options = {}) {
        const { delay = 0 } = options;
        const actions = [
            {
                type: ActionType.KeyDown,
                value: getBidiKeyValue(key),
            },
        ];
        if (delay > 0) {
            actions.push({
                type: ActionType.Pause,
                duration: delay,
            });
        }
        actions.push({
            type: ActionType.KeyUp,
            value: getBidiKeyValue(key),
        });
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Key,
                id: "__puppeteer_keyboard" /* InputId.Keyboard */,
                actions,
            },
        ]);
    }
    async type(text, options = {}) {
        const { delay = 0 } = options;
        // This spread separates the characters into code points rather than UTF-16
        // code units.
        const values = [...text].map(getBidiKeyValue);
        const actions = [];
        if (delay <= 0) {
            for (const value of values) {
                actions.push({
                    type: ActionType.KeyDown,
                    value,
                }, {
                    type: ActionType.KeyUp,
                    value,
                });
            }
        }
        else {
            for (const value of values) {
                actions.push({
                    type: ActionType.KeyDown,
                    value,
                }, {
                    type: ActionType.Pause,
                    duration: delay,
                }, {
                    type: ActionType.KeyUp,
                    value,
                });
            }
        }
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Key,
                id: "__puppeteer_keyboard" /* InputId.Keyboard */,
                actions,
            },
        ]);
    }
    async sendCharacter(char) {
        // Measures the number of code points rather than UTF-16 code units.
        if ([...char].length > 1) {
            throw new Error('Cannot send more than 1 character.');
        }
        const frame = await this.#page.focusedFrame();
        await frame.isolatedRealm().evaluate(async (char) => {
            document.execCommand('insertText', false, char);
        }, char);
    }
}
const getBidiButton = (button) => {
    switch (button) {
        case MouseButton.Left:
            return 0;
        case MouseButton.Middle:
            return 1;
        case MouseButton.Right:
            return 2;
        case MouseButton.Back:
            return 3;
        case MouseButton.Forward:
            return 4;
    }
};
/**
 * @internal
 */
class BidiMouse extends Mouse {
    #page;
    #lastMovePoint = { x: 0, y: 0 };
    constructor(page) {
        super();
        this.#page = page;
    }
    async reset() {
        this.#lastMovePoint = { x: 0, y: 0 };
        await this.#page.mainFrame().browsingContext.releaseActions();
    }
    async move(x, y, options = {}) {
        const from = this.#lastMovePoint;
        const to = {
            x: Math.round(x),
            y: Math.round(y),
        };
        const actions = [];
        const steps = options.steps ?? 0;
        for (let i = 0; i < steps; ++i) {
            actions.push({
                type: ActionType.PointerMove,
                x: from.x + (to.x - from.x) * (i / steps),
                y: from.y + (to.y - from.y) * (i / steps),
                origin: options.origin,
            });
        }
        actions.push({
            type: ActionType.PointerMove,
            ...to,
            origin: options.origin,
        });
        // https://w3c.github.io/webdriver-bidi/#command-input-performActions:~:text=input.PointerMoveAction%20%3D%20%7B%0A%20%20type%3A%20%22pointerMove%22%2C%0A%20%20x%3A%20js%2Dint%2C
        this.#lastMovePoint = to;
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: "__puppeteer_mouse" /* InputId.Mouse */,
                actions,
            },
        ]);
    }
    async down(options = {}) {
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: "__puppeteer_mouse" /* InputId.Mouse */,
                actions: [
                    {
                        type: ActionType.PointerDown,
                        button: getBidiButton(options.button ?? MouseButton.Left),
                    },
                ],
            },
        ]);
    }
    async up(options = {}) {
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: "__puppeteer_mouse" /* InputId.Mouse */,
                actions: [
                    {
                        type: ActionType.PointerUp,
                        button: getBidiButton(options.button ?? MouseButton.Left),
                    },
                ],
            },
        ]);
    }
    async click(x, y, options = {}) {
        const actions = [
            {
                type: ActionType.PointerMove,
                x: Math.round(x),
                y: Math.round(y),
                origin: options.origin,
            },
        ];
        const pointerDownAction = {
            type: ActionType.PointerDown,
            button: getBidiButton(options.button ?? MouseButton.Left),
        };
        const pointerUpAction = {
            type: ActionType.PointerUp,
            button: pointerDownAction.button,
        };
        for (let i = 1; i < (options.count ?? 1); ++i) {
            actions.push(pointerDownAction, pointerUpAction);
        }
        actions.push(pointerDownAction);
        if (options.delay) {
            actions.push({
                type: ActionType.Pause,
                duration: options.delay,
            });
        }
        actions.push(pointerUpAction);
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: "__puppeteer_mouse" /* InputId.Mouse */,
                actions,
            },
        ]);
    }
    async wheel(options = {}) {
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Wheel,
                id: "__puppeteer_wheel" /* InputId.Wheel */,
                actions: [
                    {
                        type: ActionType.Scroll,
                        ...(this.#lastMovePoint ?? {
                            x: 0,
                            y: 0,
                        }),
                        deltaX: options.deltaX ?? 0,
                        deltaY: options.deltaY ?? 0,
                    },
                ],
            },
        ]);
    }
    drag() {
        throw new UnsupportedOperation();
    }
    dragOver() {
        throw new UnsupportedOperation();
    }
    dragEnter() {
        throw new UnsupportedOperation();
    }
    drop() {
        throw new UnsupportedOperation();
    }
    dragAndDrop() {
        throw new UnsupportedOperation();
    }
}
/**
 * @internal
 */
class BidiTouchHandle {
    #started = false;
    #x;
    #y;
    #bidiId;
    #page;
    #touchScreen;
    #properties;
    constructor(page, touchScreen, id, x, y, properties) {
        this.#page = page;
        this.#touchScreen = touchScreen;
        this.#x = Math.round(x);
        this.#y = Math.round(y);
        this.#properties = properties;
        this.#bidiId = `${"__puppeteer_finger" /* InputId.Finger */}_${id}`;
    }
    async start(options = {}) {
        if (this.#started) {
            throw new TouchError('Touch has already started');
        }
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: this.#bidiId,
                parameters: {
                    pointerType: "touch" /* Bidi.Input.PointerType.Touch */,
                },
                actions: [
                    {
                        type: ActionType.PointerMove,
                        x: this.#x,
                        y: this.#y,
                        origin: options.origin,
                    },
                    {
                        ...this.#properties,
                        type: ActionType.PointerDown,
                        button: 0,
                    },
                ],
            },
        ]);
        this.#started = true;
    }
    move(x, y) {
        const newX = Math.round(x);
        const newY = Math.round(y);
        return this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: this.#bidiId,
                parameters: {
                    pointerType: "touch" /* Bidi.Input.PointerType.Touch */,
                },
                actions: [
                    {
                        ...this.#properties,
                        type: ActionType.PointerMove,
                        x: newX,
                        y: newY,
                    },
                ],
            },
        ]);
    }
    async end() {
        await this.#page.mainFrame().browsingContext.performActions([
            {
                type: SourceActionsType.Pointer,
                id: this.#bidiId,
                parameters: {
                    pointerType: "touch" /* Bidi.Input.PointerType.Touch */,
                },
                actions: [
                    {
                        type: ActionType.PointerUp,
                        button: 0,
                    },
                ],
            },
        ]);
        this.#touchScreen.removeHandle(this);
    }
}
/**
 * @internal
 */
class BidiTouchscreen extends Touchscreen {
    #page;
    constructor(page) {
        super();
        this.#page = page;
    }
    async touchStart(x, y, options = {}) {
        const id = this.idGenerator();
        const properties = {
            width: 0.5 * 2, // 2 times default touch radius.
            height: 0.5 * 2, // 2 times default touch radius.
            pressure: 0.5,
        };
        const touch = new BidiTouchHandle(this.#page, this, id, x, y, properties);
        await touch.start(options);
        this.touches.push(touch);
        return touch;
    }
}

export { BidiKeyboard as B, Navigation as N, SharedWorkerRealm as S, WindowRealm as W, BidiMouse as a, BidiTouchscreen as b, BidiBluetoothEmulation as c, BidiDeviceRequestPromptManager as d };
