// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { N as NEVER, f as fromEvent, m as map, t as timer, O as Observable, a as mergeMap, b as from, c as filter, d as firstValueFrom, e as merge, r as raceWith } from './chunk-016.mjs';
import { d as debug, p as paperFormats, a as assert, s as stringToTypedArray, e as environment, m as mergeUint8Arrays, b as packageVersion, T as TimeoutError } from './chunk-015.mjs';

/**
MIT License

Copyright (c) 2021 Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
Symbol.dispose ??= Symbol('dispose');
Symbol.asyncDispose ??= Symbol('asyncDispose');
/**
 * @internal
 */
const disposeSymbol = Symbol.dispose;
/**
 * @internal
 */
const asyncDisposeSymbol = Symbol.asyncDispose;
/**
 * @internal
 */
class DisposableStackPolyfill {
    #disposed = false;
    #stack = [];
    /**
     * Returns a value indicating whether the stack has been disposed.
     */
    get disposed() {
        return this.#disposed;
    }
    /**
     * Alias for `[Symbol.dispose]()`.
     */
    dispose() {
        this[disposeSymbol]();
    }
    /**
     * Adds a disposable resource to the top of stack, returning the resource.
     * Has no effect if provided `null` or `undefined`.
     *
     * @param value - A `Disposable` object, `null`, or `undefined`.
     * `null` and `undefined` will not be added, but will be returned.
     * @returns The provided `value`.
     */
    use(value) {
        if (value && typeof value[disposeSymbol] === 'function') {
            this.#stack.push(value);
        }
        return value;
    }
    /**
     * Adds a non-disposable resource and a disposal callback to the top of the stack.
     *
     * @param value - A resource to be disposed.
     * @param onDispose - A callback invoked to dispose the provided value.
     * Will be invoked with `value` as the first parameter.
     * @returns The provided `value`.
     */
    adopt(value, onDispose) {
        this.#stack.push({
            [disposeSymbol]() {
                onDispose(value);
            },
        });
        return value;
    }
    /**
     * Add a disposal callback to the top of the stack to be invoked when stack is disposed.
     * @param onDispose - A callback to invoke when this object is disposed.
     */
    defer(onDispose) {
        this.#stack.push({
            [disposeSymbol]() {
                onDispose();
            },
        });
    }
    /**
     * Move all resources out of this stack and into a new `DisposableStack`, and
     * marks this stack as disposed.
     * @returns The new `DisposableStack`.
     *
     * @example
     *
     * ```ts
     * class C {
     *   #res1: Disposable;
     *   #res2: Disposable;
     *   #disposables: DisposableStack;
     *   constructor() {
     *     // stack will be disposed when exiting constructor for any reason
     *     using stack = new DisposableStack();
     *
     *     // get first resource
     *     this.#res1 = stack.use(getResource1());
     *
     *     // get second resource. If this fails, both `stack` and `#res1` will be disposed.
     *     this.#res2 = stack.use(getResource2());
     *
     *     // all operations succeeded, move resources out of `stack` so that
     *     // they aren't disposed when constructor exits
     *     this.#disposables = stack.move();
     *   }
     *
     *   [disposeSymbol]() {
     *     this.#disposables.dispose();
     *   }
     * }
     * ```
     */
    move() {
        if (this.#disposed) {
            throw new ReferenceError('A disposed stack can not use anything new');
        }
        const stack = new DisposableStackPolyfill();
        stack.#stack = this.#stack;
        this.#stack = [];
        this.#disposed = true;
        return stack;
    }
    /**
     * Disposes each resource in the stack in last-in-first-out (LIFO) manner.
     */
    [disposeSymbol]() {
        if (this.#disposed) {
            return;
        }
        this.#disposed = true;
        const errors = [];
        for (const resource of this.#stack.reverse()) {
            try {
                resource[disposeSymbol]();
            }
            catch (e) {
                errors.push(e);
            }
        }
        if (errors.length === 1) {
            throw errors[0];
        }
        else if (errors.length > 1) {
            let suppressed = null;
            for (const error of errors) {
                if (suppressed === null) {
                    suppressed = error;
                }
                else {
                    suppressed = new SuppressedErrorPolyfill(error, suppressed);
                }
            }
            throw suppressed;
        }
    }
    [Symbol.toStringTag] = 'DisposableStack';
}
/**
 * @internal
 */
const DisposableStack = globalThis.DisposableStack ?? DisposableStackPolyfill;
/**
 * @internal
 */
class AsyncDisposableStackPolyfill {
    #disposed = false;
    #stack = [];
    /**
     * Returns a value indicating whether the stack has been disposed.
     */
    get disposed() {
        return this.#disposed;
    }
    /**
     * Alias for `[Symbol.asyncDispose]()`.
     */
    async disposeAsync() {
        await this[asyncDisposeSymbol]();
    }
    /**
     * Adds a AsyncDisposable resource to the top of stack, returning the resource.
     * Has no effect if provided `null` or `undefined`.
     *
     * @param value - A `AsyncDisposable` object, `null`, or `undefined`.
     * `null` and `undefined` will not be added, but will be returned.
     * @returns The provided `value`.
     */
    use(value) {
        if (value) {
            const asyncDispose = value[asyncDisposeSymbol];
            const dispose = value[disposeSymbol];
            if (typeof asyncDispose === 'function') {
                this.#stack.push(value);
            }
            else if (typeof dispose === 'function') {
                this.#stack.push({
                    [asyncDisposeSymbol]: async () => {
                        value[disposeSymbol]();
                    },
                });
            }
        }
        return value;
    }
    /**
     * Adds a non-disposable resource and a disposal callback to the top of the stack.
     *
     * @param value - A resource to be disposed.
     * @param onDispose - A callback invoked to dispose the provided value.
     * Will be invoked with `value` as the first parameter.
     * @returns The provided `value`.
     */
    adopt(value, onDispose) {
        this.#stack.push({
            [asyncDisposeSymbol]() {
                return onDispose(value);
            },
        });
        return value;
    }
    /**
     * Add a disposal callback to the top of the stack to be invoked when stack is disposed.
     * @param onDispose - A callback to invoke when this object is disposed.
     */
    defer(onDispose) {
        this.#stack.push({
            [asyncDisposeSymbol]() {
                return onDispose();
            },
        });
    }
    /**
     * Move all resources out of this stack and into a new `DisposableStack`, and
     * marks this stack as disposed.
     * @returns The new `AsyncDisposableStack`.
     *
     * @example
     *
     * ```ts
     * class C {
     *   #res1: Disposable;
     *   #res2: Disposable;
     *   #disposables: DisposableStack;
     *   constructor() {
     *     // stack will be disposed when exiting constructor for any reason
     *     using stack = new DisposableStack();
     *
     *     // get first resource
     *     this.#res1 = stack.use(getResource1());
     *
     *     // get second resource. If this fails, both `stack` and `#res1` will be disposed.
     *     this.#res2 = stack.use(getResource2());
     *
     *     // all operations succeeded, move resources out of `stack` so that
     *     // they aren't disposed when constructor exits
     *     this.#disposables = stack.move();
     *   }
     *
     *   [disposeSymbol]() {
     *     this.#disposables.dispose();
     *   }
     * }
     * ```
     */
    move() {
        if (this.#disposed) {
            throw new ReferenceError('A disposed stack can not use anything new');
        }
        const stack = new AsyncDisposableStackPolyfill();
        stack.#stack = this.#stack;
        this.#stack = [];
        this.#disposed = true;
        return stack;
    }
    /**
     * Disposes each resource in the stack in last-in-first-out (LIFO) manner.
     */
    async [asyncDisposeSymbol]() {
        if (this.#disposed) {
            return;
        }
        this.#disposed = true;
        const errors = [];
        for (const resource of this.#stack.reverse()) {
            try {
                await resource[asyncDisposeSymbol]();
            }
            catch (e) {
                errors.push(e);
            }
        }
        if (errors.length === 1) {
            throw errors[0];
        }
        else if (errors.length > 1) {
            let suppressed = null;
            for (const error of errors) {
                if (suppressed === null) {
                    suppressed = error;
                }
                else {
                    suppressed = new SuppressedErrorPolyfill(error, suppressed);
                }
            }
            throw suppressed;
        }
    }
    [Symbol.toStringTag] = 'AsyncDisposableStack';
}
/**
 * @internal
 */
const AsyncDisposableStack = globalThis.AsyncDisposableStack ?? AsyncDisposableStackPolyfill;
/**
 * @internal
 * Represents an error that occurs when multiple errors are thrown during
 * the disposal of resources. This class encapsulates the primary error and
 * any suppressed errors that occurred subsequently.
 */
class SuppressedErrorPolyfill extends Error {
    #error;
    #suppressed;
    constructor(error, suppressed, message = 'An error was suppressed during disposal') {
        super(message);
        this.name = 'SuppressedError';
        this.#error = error;
        this.#suppressed = suppressed;
    }
    /**
     * The primary error that occurred during disposal.
     */
    get error() {
        return this.#error;
    }
    /**
     * The suppressed error i.e. the error that was suppressed
     * because it occurred later in the flow after the original error.
     */
    get suppressed() {
        return this.#suppressed;
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
const debugError = debug('puppeteer:error');
/**
 * @internal
 */
const DEFAULT_VIEWPORT = Object.freeze({ width: 800, height: 600 });
/**
 * @internal
 */
const SOURCE_URL = Symbol('Source URL for Puppeteer evaluation scripts');
/**
 * @internal
 */
class PuppeteerURL {
    static INTERNAL_URL = 'pptr:internal';
    static fromCallSite(functionName, site) {
        const url = new PuppeteerURL();
        url.#functionName = functionName;
        url.#siteString = site.toString();
        return url;
    }
    static parse = (url) => {
        url = url.slice('pptr:'.length);
        const [functionName = '', siteString = ''] = url.split(';');
        const puppeteerUrl = new PuppeteerURL();
        puppeteerUrl.#functionName = functionName;
        puppeteerUrl.#siteString = decodeURIComponent(siteString);
        return puppeteerUrl;
    };
    static isPuppeteerURL = (url) => {
        return url.startsWith('pptr:');
    };
    #functionName;
    #siteString;
    get functionName() {
        return this.#functionName;
    }
    get siteString() {
        return this.#siteString;
    }
    toString() {
        return `pptr:${[
            this.#functionName,
            encodeURIComponent(this.#siteString),
        ].join(';')}`;
    }
}
/**
 * @internal
 */
const withSourcePuppeteerURLIfNone = (functionName, object) => {
    if (Object.prototype.hasOwnProperty.call(object, SOURCE_URL)) {
        return object;
    }
    const original = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => {
        // First element is the function.
        // Second element is the caller of this function.
        // Third element is the caller of the caller of this function
        // which is precisely what we want.
        return stack[2];
    };
    const site = new Error().stack;
    Error.prepareStackTrace = original;
    return Object.assign(object, {
        [SOURCE_URL]: PuppeteerURL.fromCallSite(functionName, site),
    });
};
/**
 * @internal
 */
const getSourcePuppeteerURLIfAvailable = (object) => {
    if (Object.prototype.hasOwnProperty.call(object, SOURCE_URL)) {
        return object[SOURCE_URL];
    }
    return undefined;
};
/**
 * @internal
 */
const isString = (obj) => {
    return typeof obj === 'string' || obj instanceof String;
};
/**
 * @internal
 */
const isNumber = (obj) => {
    return typeof obj === 'number' || obj instanceof Number;
};
/**
 * @internal
 */
const isPlainObject = (obj) => {
    return typeof obj === 'object' && obj?.constructor === Object;
};
/**
 * @internal
 */
const isRegExp = (obj) => {
    return typeof obj === 'object' && obj?.constructor === RegExp;
};
/**
 * @internal
 */
const isDate = (obj) => {
    return typeof obj === 'object' && obj?.constructor === Date;
};
/**
 * @internal
 */
function evaluationString(
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
fun, ...args) {
    if (isString(fun)) {
        assert(args.length === 0, 'Cannot evaluate a string with arguments');
        return fun;
    }
    function serializeArgument(arg) {
        if (Object.is(arg, undefined)) {
            return 'undefined';
        }
        return JSON.stringify(arg);
    }
    return `(${fun})(${args.map(serializeArgument).join(',')})`;
}
/**
 * @internal
 */
async function getReadableAsTypedArray(readable, path) {
    const buffers = [];
    const reader = readable.getReader();
    if (path) {
        const fileHandle = await environment.value.fs.promises.open(path, 'w+');
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                buffers.push(value);
                await fileHandle.writeFile(value);
            }
        }
        finally {
            await fileHandle.close();
        }
    }
    else {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            buffers.push(value);
        }
    }
    try {
        const concat = mergeUint8Arrays(buffers);
        if (concat.length === 0) {
            return null;
        }
        return concat;
    }
    catch (error) {
        debugError(error);
        return null;
    }
}
/**
 * @internal
 */
async function getReadableFromProtocolStream(client, handle) {
    return new ReadableStream({
        async pull(controller) {
            const { data, base64Encoded, eof } = await client.send('IO.read', {
                handle,
            });
            controller.enqueue(stringToTypedArray(data, base64Encoded ?? false));
            if (eof) {
                await client.send('IO.close', { handle });
                controller.close();
            }
        },
    });
}
const VALID_DIALOG_TYPES = new Set([
    'alert',
    'confirm',
    'prompt',
    'beforeunload',
]);
/**
 * @internal
 */
function validateDialogType(type) {
    let dialogType = null;
    if (VALID_DIALOG_TYPES.has(type)) {
        dialogType = type;
    }
    assert(dialogType, `Unknown javascript dialog type: ${type}`);
    return dialogType;
}
/**
 * @internal
 */
function timeout(ms, cause) {
    return ms === 0
        ? NEVER
        : timer(ms).pipe(map(() => {
            throw new TimeoutError(`Timed out after waiting ${ms}ms`, { cause });
        }));
}
/**
 * @internal
 */
const UTILITY_WORLD_NAME = '__puppeteer_utility_world__' + packageVersion;
/**
 * @internal
 */
const SOURCE_URL_REGEX = /^[\x20\t]*\/\/[@#] sourceURL=\s{0,10}(\S*?)\s{0,10}$/m;
/**
 * @internal
 */
function getSourceUrlComment(url) {
    return `//# sourceURL=${url}`;
}
/**
 * @internal
 */
const NETWORK_IDLE_TIME = 500;
/**
 * @internal
 */
function parsePDFOptions(options = {}, lengthUnit = 'in') {
    const defaults = {
        scale: 1,
        displayHeaderFooter: false,
        headerTemplate: '',
        footerTemplate: '',
        printBackground: false,
        landscape: false,
        pageRanges: '',
        preferCSSPageSize: false,
        omitBackground: false,
        outline: false,
        tagged: true,
        waitForFonts: true,
    };
    let width = 8.5;
    let height = 11;
    if (options.format) {
        const format = paperFormats[options.format.toLowerCase()][lengthUnit];
        assert(format, 'Unknown paper format: ' + options.format);
        width = format.width;
        height = format.height;
    }
    else {
        width = convertPrintParameterToInches(options.width, lengthUnit) ?? width;
        height =
            convertPrintParameterToInches(options.height, lengthUnit) ?? height;
    }
    const margin = {
        top: convertPrintParameterToInches(options.margin?.top, lengthUnit) || 0,
        left: convertPrintParameterToInches(options.margin?.left, lengthUnit) || 0,
        bottom: convertPrintParameterToInches(options.margin?.bottom, lengthUnit) || 0,
        right: convertPrintParameterToInches(options.margin?.right, lengthUnit) || 0,
    };
    // Quirk https://bugs.chromium.org/p/chromium/issues/detail?id=840455#c44
    if (options.outline) {
        options.tagged = true;
    }
    return {
        ...defaults,
        ...options,
        width,
        height,
        margin,
    };
}
/**
 * @internal
 */
const unitToPixels = {
    px: 1,
    in: 96,
    cm: 37.8,
    mm: 3.78,
};
function convertPrintParameterToInches(parameter, lengthUnit = 'in') {
    if (typeof parameter === 'undefined') {
        return undefined;
    }
    let pixels;
    if (isNumber(parameter)) {
        // Treat numbers as pixel values to be aligned with phantom's paperSize.
        pixels = parameter;
    }
    else if (isString(parameter)) {
        const text = parameter;
        let unit = text.substring(text.length - 2).toLowerCase();
        let valueText = '';
        if (unit in unitToPixels) {
            valueText = text.substring(0, text.length - 2);
        }
        else {
            // In case of unknown unit try to parse the whole parameter as number of pixels.
            // This is consistent with phantom's paperSize behavior.
            unit = 'px';
            valueText = text;
        }
        const value = Number(valueText);
        assert(!isNaN(value), 'Failed to parse parameter value: ' + text);
        pixels = value * unitToPixels[unit];
    }
    else {
        throw new Error('page.pdf() Cannot handle parameter type: ' + typeof parameter);
    }
    return pixels / unitToPixels[lengthUnit];
}
/**
 * @internal
 */
function fromEmitterEvent(emitter, eventName) {
    return new Observable(subscriber => {
        const listener = (event) => {
            subscriber.next(event);
        };
        emitter.on(eventName, listener);
        return () => {
            emitter.off(eventName, listener);
        };
    });
}
/**
 * @internal
 */
function fromAbortSignal(signal, cause) {
    return signal
        ? fromEvent(signal, 'abort').pipe(map(() => {
            if (signal.reason instanceof Error) {
                signal.reason.cause = cause;
                throw signal.reason;
            }
            throw new Error(signal.reason, { cause });
        }))
        : NEVER;
}
/**
 * @internal
 */
function filterAsync(predicate) {
    return mergeMap((value) => {
        return from(Promise.resolve(predicate(value))).pipe(filter(isMatch => {
            return isMatch;
        }), map(() => {
            return value;
        }));
    });
}

/**
 * @license
 * Copyright 2022 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The EventEmitter class that many Puppeteer classes extend.
 *
 * @remarks
 *
 * This allows you to listen to events that Puppeteer classes fire and act
 * accordingly. Therefore you'll mostly use {@link EventEmitter.on | on} and
 * {@link EventEmitter.off | off} to bind
 * and unbind to event listeners.
 *
 * @public
 */
class EventEmitter {
    #emitter;
    #handlers = new Map();
    /**
     * If you pass an emitter, the returned emitter will wrap the passed emitter.
     *
     * @internal
     */
    constructor(emitter = mitt_default(new Map())) {
        this.#emitter = emitter;
    }
    /**
     * Bind an event listener to fire when an event occurs.
     * @param type - the event type you'd like to listen to. Can be a string or symbol.
     * @param handler - the function to be called when the event occurs.
     * @returns `this` to enable you to chain method calls.
     */
    on(type, handler) {
        const handlers = this.#handlers.get(type);
        if (handlers === undefined) {
            this.#handlers.set(type, [handler]);
        }
        else {
            handlers.push(handler);
        }
        this.#emitter.on(type, handler);
        return this;
    }
    /**
     * Remove an event listener from firing.
     * @param type - the event type you'd like to stop listening to.
     * @param handler - the function that should be removed.
     * @returns `this` to enable you to chain method calls.
     */
    off(type, handler) {
        const handlers = this.#handlers.get(type) ?? [];
        if (handler === undefined) {
            for (const handler of handlers) {
                this.#emitter.off(type, handler);
            }
            this.#handlers.delete(type);
            return this;
        }
        const index = handlers.lastIndexOf(handler);
        if (index > -1) {
            this.#emitter.off(type, ...handlers.splice(index, 1));
        }
        return this;
    }
    /**
     * Emit an event and call any associated listeners.
     *
     * @param type - the event you'd like to emit
     * @param eventData - any data you'd like to emit with the event
     * @returns `true` if there are any listeners, `false` if there are not.
     */
    emit(type, event) {
        this.#emitter.emit(type, event);
        return this.listenerCount(type) > 0;
    }
    /**
     * Like `on` but the listener will only be fired once and then it will be removed.
     * @param type - the event you'd like to listen to
     * @param handler - the handler function to run when the event occurs
     * @returns `this` to enable you to chain method calls.
     */
    once(type, handler) {
        const onceHandler = eventData => {
            handler(eventData);
            this.off(type, onceHandler);
        };
        return this.on(type, onceHandler);
    }
    /**
     * Gets the number of listeners for a given event.
     *
     * @param type - the event to get the listener count for
     * @returns the number of listeners bound to the given event
     */
    listenerCount(type) {
        return this.#handlers.get(type)?.length || 0;
    }
    /**
     * Removes all listeners. If given an event argument, it will remove only
     * listeners for that event.
     *
     * @param type - the event to remove listeners for.
     * @returns `this` to enable you to chain method calls.
     */
    removeAllListeners(type) {
        if (type !== undefined) {
            return this.off(type);
        }
        this[disposeSymbol]();
        return this;
    }
    /**
     * @internal
     */
    [disposeSymbol]() {
        return void this[asyncDisposeSymbol]().catch(debugError);
    }
    /**
     * @internal
     */
    async [asyncDisposeSymbol]() {
        for (const [type, handlers] of this.#handlers) {
            for (const handler of handlers) {
                this.#emitter.off(type, handler);
            }
        }
        this.#handlers.clear();
    }
}

/**
 * @internal
 */
const WEB_PERMISSION_TO_PROTOCOL_PERMISSION = new Map([
    ['accelerometer', 'sensors'],
    ['ambient-light-sensor', 'sensors'],
    ['background-sync', 'backgroundSync'],
    ['camera', 'videoCapture'],
    ['clipboard-read', 'clipboardReadWrite'],
    ['clipboard-sanitized-write', 'clipboardSanitizedWrite'],
    ['clipboard-write', 'clipboardReadWrite'],
    ['geolocation', 'geolocation'],
    ['gyroscope', 'sensors'],
    ['idle-detection', 'idleDetection'],
    ['keyboard-lock', 'keyboardLock'],
    ['magnetometer', 'sensors'],
    ['microphone', 'audioCapture'],
    ['midi', 'midi'],
    ['notifications', 'notifications'],
    ['payment-handler', 'paymentHandler'],
    ['persistent-storage', 'durableStorage'],
    ['pointer-lock', 'pointerLock'],
    // chrome-specific permissions we have.
    ['midi-sysex', 'midiSysex'],
]);
/**
 * {@link Browser} represents a browser instance that is either:
 *
 * - connected to via {@link Puppeteer.connect} or
 * - launched by {@link PuppeteerNode.launch}.
 *
 * {@link Browser} {@link EventEmitter.emit | emits} various events which are
 * documented in the {@link BrowserEvent} enum.
 *
 * @example Using a {@link Browser} to create a {@link Page}:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * await page.goto('https://example.com');
 * await browser.close();
 * ```
 *
 * @example Disconnecting from and reconnecting to a {@link Browser}:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * const browser = await puppeteer.launch();
 * // Store the endpoint to be able to reconnect to the browser.
 * const browserWSEndpoint = browser.wsEndpoint();
 * // Disconnect puppeteer from the browser.
 * await browser.disconnect();
 *
 * // Use the endpoint to reestablish a connection
 * const browser2 = await puppeteer.connect({browserWSEndpoint});
 * // Close the browser.
 * await browser2.close();
 * ```
 *
 * @public
 */
class Browser extends EventEmitter {
    /**
     * @internal
     */
    constructor() {
        super();
    }
    /**
     * Waits until a {@link Target | target} matching the given `predicate`
     * appears and returns it.
     *
     * This will look all open {@link BrowserContext | browser contexts}.
     *
     * @example Finding a target for a page opened via `window.open`:
     *
     * ```ts
     * await page.evaluate(() => window.open('https://www.example.com/'));
     * const newWindowTarget = await browser.waitForTarget(
     *   target => target.url() === 'https://www.example.com/',
     * );
     * ```
     */
    async waitForTarget(predicate, options = {}) {
        const { timeout: ms = 30000, signal } = options;
        return await firstValueFrom(merge(fromEmitterEvent(this, "targetcreated" /* BrowserEvent.TargetCreated */), fromEmitterEvent(this, "targetchanged" /* BrowserEvent.TargetChanged */), from(this.targets())).pipe(filterAsync(predicate), raceWith(fromAbortSignal(signal), timeout(ms))));
    }
    /**
     * Gets a list of all open {@link Page | pages} inside this {@link Browser}.
     *
     * If there are multiple {@link BrowserContext | browser contexts}, this
     * returns all {@link Page | pages} in all
     * {@link BrowserContext | browser contexts}.
     *
     * @param includeAll - experimental, setting to true includes all kinds of pages.
     *
     * @remarks Non-visible {@link Page | pages}, such as `"background_page"`,
     * will not be listed here. You can find them using {@link Target.page}.
     */
    async pages(includeAll = false) {
        const contextPages = await Promise.all(this.browserContexts().map(context => {
            return context.pages(includeAll);
        }));
        // Flatten array.
        return contextPages.reduce((acc, x) => {
            return acc.concat(x);
        }, []);
    }
    /**
     * Returns all cookies in the default {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.cookies | browser.defaultBrowserContext().cookies()}.
     */
    async cookies() {
        return await this.defaultBrowserContext().cookies();
    }
    /**
     * Sets cookies in the default {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.setCookie | browser.defaultBrowserContext().setCookie()}.
     */
    async setCookie(...cookies) {
        return await this.defaultBrowserContext().setCookie(...cookies);
    }
    /**
     * Removes cookies from the default {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.deleteCookie | browser.defaultBrowserContext().deleteCookie()}.
     */
    async deleteCookie(...cookies) {
        return await this.defaultBrowserContext().deleteCookie(...cookies);
    }
    /**
     * Deletes cookies matching the provided filters from the default
     * {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.deleteMatchingCookies |
     * browser.defaultBrowserContext().deleteMatchingCookies()}.
     */
    async deleteMatchingCookies(...filters) {
        return await this.defaultBrowserContext().deleteMatchingCookies(...filters);
    }
    /**
     * Sets the permission for a specific origin in the default
     * {@link BrowserContext}.
     *
     * @remarks
     *
     * Shortcut for
     * {@link BrowserContext.setPermission |
     * browser.defaultBrowserContext().setPermission()}.
     *
     * @param origin - The origin to set the permission for.
     * @param permission - The permission descriptor.
     * @param state - The state of the permission.
     *
     * @public
     */
    async setPermission(origin, ...permissions) {
        return await this.defaultBrowserContext().setPermission(origin, ...permissions);
    }
    /** @internal */
    [disposeSymbol]() {
        return void this[asyncDisposeSymbol]().catch(debugError);
    }
    /** @internal */
    async [asyncDisposeSymbol]() {
        if (this.process()) {
            await this.close();
        }
        else {
            await this.disconnect();
        }
        await super[asyncDisposeSymbol]();
    }
}

/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Creates and returns a deferred object along with the resolve/reject functions.
 *
 * If the deferred has not been resolved/rejected within the `timeout` period,
 * the deferred gets resolves with a timeout error. `timeout` has to be greater than 0 or
 * it is ignored.
 *
 * @internal
 */
class Deferred {
    static create(opts) {
        return new Deferred(opts);
    }
    static async race(awaitables) {
        const deferredWithTimeout = new Set();
        try {
            const promises = awaitables.map(value => {
                if (value instanceof Deferred) {
                    if (value.#timeoutId) {
                        deferredWithTimeout.add(value);
                    }
                    return value.valueOrThrow();
                }
                return value;
            });
            // eslint-disable-next-line no-restricted-syntax
            return await Promise.race(promises);
        }
        finally {
            for (const deferred of deferredWithTimeout) {
                // We need to stop the timeout else
                // Node.JS will keep running the event loop till the
                // timer executes
                deferred.reject(new Error('Timeout cleared'));
            }
        }
    }
    #isResolved = false;
    #isRejected = false;
    #value;
    // SAFETY: This is ensured by #taskPromise.
    #resolve;
    // TODO: Switch to Promise.withResolvers with Node 22
    #taskPromise = new Promise(resolve => {
        this.#resolve = resolve;
    });
    #timeoutId;
    #timeoutError;
    constructor(opts) {
        if (opts && opts.timeout > 0) {
            this.#timeoutError = new TimeoutError(opts.message);
            this.#timeoutId = setTimeout(() => {
                this.reject(this.#timeoutError);
            }, opts.timeout);
        }
    }
    #finish(value) {
        clearTimeout(this.#timeoutId);
        this.#value = value;
        this.#resolve();
    }
    resolve(value) {
        if (this.#isRejected || this.#isResolved) {
            return;
        }
        this.#isResolved = true;
        this.#finish(value);
    }
    reject(error) {
        if (this.#isRejected || this.#isResolved) {
            return;
        }
        this.#isRejected = true;
        this.#finish(error);
    }
    resolved() {
        return this.#isResolved;
    }
    finished() {
        return this.#isResolved || this.#isRejected;
    }
    value() {
        return this.#value;
    }
    #promise;
    valueOrThrow() {
        if (!this.#promise) {
            this.#promise = (async () => {
                await this.#taskPromise;
                if (this.#isRejected) {
                    throw this.#value;
                }
                return this.#value;
            })();
        }
        return this.#promise;
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
class Mutex {
    static Guard = class Guard {
        #mutex;
        #onRelease;
        constructor(mutex, onRelease) {
            this.#mutex = mutex;
            this.#onRelease = onRelease;
        }
        [disposeSymbol]() {
            this.#onRelease?.();
            return this.#mutex.release();
        }
    };
    #locked = false;
    #acquirers = [];
    // This is FIFO.
    async acquire(onRelease) {
        if (!this.#locked) {
            this.#locked = true;
            return new Mutex.Guard(this, onRelease);
        }
        const deferred = Deferred.create();
        this.#acquirers.push(deferred.resolve.bind(deferred));
        await deferred.valueOrThrow();
        return new Mutex.Guard(this, onRelease);
    }
    release() {
        const resolve = this.#acquirers.shift();
        if (!resolve) {
            this.#locked = false;
            return;
        }
        resolve();
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * {@link BrowserContext} represents individual user contexts within a
 * {@link Browser | browser}.
 *
 * When a {@link Browser | browser} is launched, it has at least one default
 * {@link BrowserContext | browser context}. Others can be created
 * using {@link Browser.createBrowserContext}. Each context has isolated storage
 * (cookies/localStorage/etc.)
 *
 * {@link BrowserContext} {@link EventEmitter | emits} various events which are
 * documented in the {@link BrowserContextEvent} enum.
 *
 * If a {@link Page | page} opens another {@link Page | page}, e.g. using
 * `window.open`, the popup will belong to the parent {@link Page.browserContext
 * | page's browser context}.
 *
 * @example Creating a new {@link BrowserContext | browser context}:
 *
 * ```ts
 * // Create a new browser context
 * const context = await browser.createBrowserContext();
 * // Create a new page inside context.
 * const page = await context.newPage();
 * // ... do stuff with page ...
 * await page.goto('https://example.com');
 * // Dispose context once it's no longer needed.
 * await context.close();
 * ```
 *
 * @remarks
 *
 * In Chrome all non-default contexts are incognito,
 * and {@link Browser.defaultBrowserContext | default browser context}
 * might be incognito if you provide the `--incognito` argument when launching
 * the browser.
 *
 * @public
 */
class BrowserContext extends EventEmitter {
    /**
     * @internal
     */
    constructor() {
        super();
    }
    /**
     * If defined, indicates an ongoing screenshot opereation.
     */
    #pageScreenshotMutex;
    #screenshotOperationsCount = 0;
    /**
     * @internal
     */
    startScreenshot() {
        const mutex = this.#pageScreenshotMutex || new Mutex();
        this.#pageScreenshotMutex = mutex;
        this.#screenshotOperationsCount++;
        return mutex.acquire(() => {
            this.#screenshotOperationsCount--;
            if (this.#screenshotOperationsCount === 0) {
                // Remove the mutex to indicate no ongoing screenshot operation.
                this.#pageScreenshotMutex = undefined;
            }
        });
    }
    /**
     * @internal
     */
    waitForScreenshotOperations() {
        return this.#pageScreenshotMutex?.acquire();
    }
    /**
     * Waits until a {@link Target | target} matching the given `predicate`
     * appears and returns it.
     *
     * This will look all open {@link BrowserContext | browser contexts}.
     *
     * @example Finding a target for a page opened via `window.open`:
     *
     * ```ts
     * await page.evaluate(() => window.open('https://www.example.com/'));
     * const newWindowTarget = await browserContext.waitForTarget(
     *   target => target.url() === 'https://www.example.com/',
     * );
     * ```
     */
    async waitForTarget(predicate, options = {}) {
        const { timeout: ms = 30000 } = options;
        return await firstValueFrom(merge(fromEmitterEvent(this, "targetcreated" /* BrowserContextEvent.TargetCreated */), fromEmitterEvent(this, "targetchanged" /* BrowserContextEvent.TargetChanged */), from(this.targets())).pipe(filterAsync(predicate), raceWith(timeout(ms))));
    }
    /**
     * Removes cookie in this browser context.
     *
     * @param cookies - Complete {@link Cookie | cookie} object to be removed.
     */
    async deleteCookie(...cookies) {
        return await this.setCookie(...cookies.map(cookie => {
            return {
                ...cookie,
                expires: 1,
            };
        }));
    }
    /**
     * Deletes cookies matching the provided filters in this browser context.
     *
     * @param filters - {@link DeleteCookiesRequest}
     */
    async deleteMatchingCookies(...filters) {
        const cookies = await this.cookies();
        const cookiesToDelete = cookies.filter(cookie => {
            return filters.some(filter => {
                if (filter.name === cookie.name) {
                    if (filter.domain !== undefined && filter.domain === cookie.domain) {
                        return true;
                    }
                    if (filter.path !== undefined && filter.path === cookie.path) {
                        return true;
                    }
                    if (filter.partitionKey !== undefined &&
                        cookie.partitionKey !== undefined) {
                        if (typeof cookie.partitionKey !== 'object') {
                            throw new Error('Unexpected string partition key');
                        }
                        if (typeof filter.partitionKey === 'string') {
                            if (filter.partitionKey === cookie.partitionKey?.sourceOrigin) {
                                return true;
                            }
                        }
                        else {
                            if (filter.partitionKey.sourceOrigin ===
                                cookie.partitionKey?.sourceOrigin) {
                                return true;
                            }
                        }
                    }
                    if (filter.url !== undefined) {
                        const url = new URL(filter.url);
                        if (url.hostname === cookie.domain &&
                            url.pathname === cookie.path) {
                            return true;
                        }
                    }
                    return true;
                }
                return false;
            });
        });
        await this.deleteCookie(...cookiesToDelete);
    }
    /**
     * Whether this {@link BrowserContext | browser context} is closed.
     */
    get closed() {
        return !this.browser().browserContexts().includes(this);
    }
    /**
     * Identifier for this {@link BrowserContext | browser context}.
     */
    get id() {
        return undefined;
    }
    /** @internal */
    [disposeSymbol]() {
        return void this[asyncDisposeSymbol]().catch(debugError);
    }
    /** @internal */
    async [asyncDisposeSymbol]() {
        await this.close();
        await super[asyncDisposeSymbol]();
    }
}

/**
 * Events that the CDPSession class emits.
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var CDPSessionEvent;
(function (CDPSessionEvent) {
    /** @internal */
    CDPSessionEvent.Disconnected = Symbol('CDPSession.Disconnected');
    /** @internal */
    CDPSessionEvent.Swapped = Symbol('CDPSession.Swapped');
    /**
     * Emitted when the session is ready to be configured during the auto-attach
     * process. Right after the event is handled, the session will be resumed.
     *
     * @internal
     */
    CDPSessionEvent.Ready = Symbol('CDPSession.Ready');
    CDPSessionEvent.SessionAttached = 'sessionattached';
    CDPSessionEvent.SessionDetached = 'sessiondetached';
})(CDPSessionEvent || (CDPSessionEvent = {}));
/**
 * The `CDPSession` instances are used to talk raw Chrome Devtools Protocol.
 *
 * @remarks
 *
 * Protocol methods can be called with {@link CDPSession.send} method and protocol
 * events can be subscribed to with `CDPSession.on` method.
 *
 * Useful links: {@link https://chromedevtools.github.io/devtools-protocol/ | DevTools Protocol Viewer}
 * and {@link https://github.com/aslushnikov/getting-started-with-cdp/blob/HEAD/README.md | Getting Started with DevTools Protocol}.
 *
 * @example
 *
 * ```ts
 * const client = await page.createCDPSession();
 * await client.send('Animation.enable');
 * client.on('Animation.animationCreated', () =>
 *   console.log('Animation created!'),
 * );
 * const response = await client.send('Animation.getPlaybackRate');
 * console.log('playback rate is ' + response.playbackRate);
 * await client.send('Animation.setPlaybackRate', {
 *   playbackRate: response.playbackRate / 2,
 * });
 * ```
 *
 * @public
 */
class CDPSession extends EventEmitter {
    /**
     * @internal
     */
    constructor() {
        super();
    }
    /**
     * Parent session in terms of CDP's auto-attach mechanism.
     *
     * @internal
     */
    parentSession() {
        return undefined;
    }
}

/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Device request prompts let you respond to the page requesting for a device
 * through an API like WebBluetooth.
 *
 * @remarks
 * `DeviceRequestPrompt` instances are returned via the
 * {@link Page.waitForDevicePrompt} method.
 *
 * @example
 *
 * ```ts
 * const [devicePrompt] = Promise.all([
 *   page.waitForDevicePrompt(),
 *   page.click('#connect-bluetooth'),
 * ]);
 * await devicePrompt.select(
 *   await devicePrompt.waitForDevice(({name}) => name.includes('My Device')),
 * );
 * ```
 *
 * @public
 */
class DeviceRequestPrompt {
    /**
     * Current list of selectable devices.
     */
    devices = [];
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Dialog instances are dispatched by the {@link Page} via the `dialog` event.
 *
 * @remarks
 *
 * @example
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * page.on('dialog', async dialog => {
 *   console.log(dialog.message());
 *   await dialog.dismiss();
 *   await browser.close();
 * });
 * await page.evaluate(() => alert('1'));
 * ```
 *
 * @public
 */
class Dialog {
    #type;
    #message;
    #defaultValue;
    /**
     * @internal
     */
    handled = false;
    /**
     * @internal
     */
    constructor(type, message, defaultValue = '') {
        this.#type = type;
        this.#message = message;
        this.#defaultValue = defaultValue;
    }
    /**
     * The type of the dialog.
     */
    type() {
        return this.#type;
    }
    /**
     * The message displayed in the dialog.
     */
    message() {
        return this.#message;
    }
    /**
     * The default value of the prompt, or an empty string if the dialog
     * is not a `prompt`.
     */
    defaultValue() {
        return this.#defaultValue;
    }
    /**
     * A promise that resolves when the dialog has been accepted.
     *
     * @param promptText - optional text that will be entered in the dialog
     * prompt. Has no effect if the dialog's type is not `prompt`.
     *
     */
    async accept(promptText) {
        assert(!this.handled, 'Cannot accept dialog which is already handled!');
        this.handled = true;
        await this.handle({
            accept: true,
            text: promptText,
        });
    }
    /**
     * A promise which will resolve once the dialog has been dismissed
     */
    async dismiss() {
        assert(!this.handled, 'Cannot dismiss dialog which is already handled!');
        this.handled = true;
        await this.handle({
            accept: false,
        });
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
const _isElementHandle = Symbol('_isElementHandle');

export { AsyncDisposableStack as A, BrowserContext as B, CDPSessionEvent as C, DisposableStack as D, EventEmitter as E, Mutex as M, NETWORK_IDLE_TIME as N, PuppeteerURL as P, SOURCE_URL_REGEX as S, UTILITY_WORLD_NAME as U, WEB_PERMISSION_TO_PROTOCOL_PERMISSION as W, _isElementHandle as _, asyncDisposeSymbol as a, debugError as b, fromEmitterEvent as c, disposeSymbol as d, filterAsync as e, fromAbortSignal as f, Deferred as g, DeviceRequestPrompt as h, isString as i, evaluationString as j, getReadableFromProtocolStream as k, getReadableAsTypedArray as l, getSourceUrlComment as m, getSourcePuppeteerURLIfAvailable as n, CDPSession as o, Dialog as p, parsePDFOptions as q, Browser as r, DEFAULT_VIEWPORT as s, timeout as t, isPlainObject as u, validateDialogType as v, withSourcePuppeteerURLIfNone as w, isRegExp as x, isDate as y };
