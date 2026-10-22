// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import 'node:child_process';
import 'node:fs';
import 'node:os';
import 'node:path';
import 'node:process';
import 'node:readline';
import { d as detectBrowserPlatform, r as resolveDefaultUserDataDir, C as Cache, D as DefaultProvider, I as InstalledBrowser, c as createProfile, g as getVersionComparator, a as resolveBuildId } from './chunk-009.mjs';
import { C as CDP_WEBSOCKET_ENDPOINT_REGEX, P as Process, T as TimeoutError$1, W as WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX, c as computeExecutablePath, a as computeSystemExecutablePath, g as getInstalledBrowsers, i as install, l as launch, u as uninstall } from './chunk-010.mjs';
import { B as Browser, a as BrowserPlatform, b as BrowserTag, C as ChromeReleaseChannel } from './chunk-008.mjs';
import 'assert';
import 'path';
import 'fs';
import 'util';
import 'url';

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
const isNode = !!(typeof process !== 'undefined' && process.version);
/**
 * Holder for environment dependencies. These dependencies cannot
 * be used during the module instantiation.
 */
const environment = {
    value: {
        get fs() {
            throw new Error('fs is not available in this environment');
        },
        get ScreenRecorder() {
            throw new Error('ScreenRecorder is not available in this environment');
        },
    },
};

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Asserts that the given value is truthy.
 * @param value - some conditional statement
 * @param message - the error message to throw if the value is not truthy.
 *
 * @internal
 */
const assert = (value, message) => {
    if (!value) {
        throw new Error(message);
    }
};

/**
 * @license
 * Copyright 2024 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
function stringToTypedArray(string, base64Encoded = false) {
    if (base64Encoded) {
        if ('fromBase64' in Uint8Array) {
            // @ts-expect-error fromBase64 is newer than the types we use.
            return Uint8Array.fromBase64(string);
        }
        // TODO: remove Buffer in v26 when it becomes LTS.
        if (typeof Buffer === 'function') {
            return Buffer.from(string, 'base64');
        }
        return Uint8Array.from(atob(string), m => {
            return m.codePointAt(0);
        });
    }
    return new TextEncoder().encode(string);
}
/**
 * @internal
 */
function stringToBase64(str) {
    return typedArrayToBase64(new TextEncoder().encode(str));
}
/**
 * @internal
 */
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
/**
 * @internal
 */
function mergeUint8Arrays(items) {
    let length = 0;
    for (const item of items) {
        length += item.length;
    }
    // Create a new array with total length and merge all source arrays.
    const result = new Uint8Array(length);
    let offset = 0;
    for (const item of items) {
        result.set(item, offset);
        offset += item.length;
    }
    return result;
}

/**
 * @license
 * Copyright 2025 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
// If moved update release-please config
// x-release-please-start-version
const packageVersion = '25.0.4';
// x-release-please-end

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
let debugModule = null;
/**
 * @internal
 */
async function importDebug() {
    if (!debugModule) {
        debugModule = (await import('./chunk-000.mjs').then(n => n.i)).default;
    }
    return debugModule;
}
/**
 * A debug function that can be used in any environment.
 *
 * @remarks
 * If used in Node, it falls back to the
 * {@link https://www.npmjs.com/package/debug | debug module}. In the browser it
 * uses `console.log`.
 *
 * In Node, use the `DEBUG` environment variable to control logging:
 *
 * ```
 * DEBUG=* // logs all channels
 * DEBUG=foo // logs the `foo` channel
 * DEBUG=foo* // logs any channels starting with `foo`
 * ```
 *
 * In the browser, set `window.__PUPPETEER_DEBUG` to a string:
 *
 * ```
 * window.__PUPPETEER_DEBUG='*'; // logs all channels
 * window.__PUPPETEER_DEBUG='foo'; // logs the `foo` channel
 * window.__PUPPETEER_DEBUG='foo*'; // logs any channels starting with `foo`
 * ```
 *
 * @example
 *
 * ```
 * const log = debug('Page');
 *
 * log('new page created')
 * // logs "Page: new page created"
 * ```
 *
 * @param prefix - this will be prefixed to each log.
 * @returns a function that can be called to log to that debug channel.
 *
 * @internal
 */
const debug = (prefix) => {
    if (isNode) {
        return async (...logArgs) => {
            (await importDebug())(prefix)(logArgs);
        };
    }
    return (...logArgs) => {
        const debugLevel = globalThis.__PUPPETEER_DEBUG;
        if (!debugLevel) {
            return;
        }
        const everythingShouldBeLogged = debugLevel === '*';
        const prefixMatchesDebugLevel = everythingShouldBeLogged ||
            /**
             * If the debug level is `foo*`, that means we match any prefix that
             * starts with `foo`. If the level is `foo`, we match only the prefix
             * `foo`.
             */
            (debugLevel.endsWith('*')
                ? prefix.startsWith(debugLevel)
                : prefix === debugLevel);
        if (!prefixMatchesDebugLevel) {
            return;
        }
        console.log(`${prefix}:`, ...logArgs);
    };
};

/**
 * @license
 * Copyright 2018 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The base class for all Puppeteer-specific errors
 *
 * @public
 */
class PuppeteerError extends Error {
    /**
     * @internal
     */
    constructor(message, options) {
        super(message, options);
        this.name = this.constructor.name;
    }
    /**
     * @internal
     */
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}
/**
 * TimeoutError is emitted whenever certain operations are terminated due to
 * timeout.
 *
 * @remarks
 * Example operations are {@link Page.waitForSelector | page.waitForSelector} or
 * {@link PuppeteerNode.launch | puppeteer.launch}.
 *
 * @public
 */
class TimeoutError extends PuppeteerError {
}
/**
 * TouchError is thrown when an attempt is made to move or end a touch that does
 * not exist.
 * @public
 */
class TouchError extends PuppeteerError {
}
/**
 * ProtocolError is emitted whenever there is an error from the protocol.
 *
 * @public
 */
class ProtocolError extends PuppeteerError {
    #code;
    #originalMessage = '';
    set code(code) {
        this.#code = code;
    }
    /**
     * @readonly
     * @public
     */
    get code() {
        return this.#code;
    }
    set originalMessage(originalMessage) {
        this.#originalMessage = originalMessage;
    }
    /**
     * @readonly
     * @public
     */
    get originalMessage() {
        return this.#originalMessage;
    }
}
/**
 * Puppeteer will throw this error if a method is not
 * supported by the currently used protocol
 *
 * @public
 */
class UnsupportedOperation extends PuppeteerError {
}
/**
 * @internal
 */
class TargetCloseError extends ProtocolError {
}
/**
 * Thrown if underlying protocol connection has been closed.
 *
 * @public
 */
class ConnectionClosedError extends ProtocolError {
}

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 *
 * @remarks All A series paper format sizes in inches are calculated from centimeters
 * rounded mathematically to four decimal places.
 */
const paperFormats = {
    letter: {
        cm: { width: 21.59, height: 27.94 },
        in: { width: 8.5, height: 11 },
    },
    legal: {
        cm: { width: 21.59, height: 35.56 },
        in: { width: 8.5, height: 14 },
    },
    tabloid: {
        cm: { width: 27.94, height: 43.18 },
        in: { width: 11, height: 17 },
    },
    ledger: {
        cm: { width: 43.18, height: 27.94 },
        in: { width: 17, height: 11 },
    },
    a0: {
        cm: { width: 84.1, height: 118.9 },
        in: { width: 33.1102, height: 46.811 },
    },
    a1: {
        cm: { width: 59.4, height: 84.1 },
        in: { width: 23.3858, height: 33.1102 },
    },
    a2: {
        cm: { width: 42, height: 59.4 },
        in: { width: 16.5354, height: 23.3858 },
    },
    a3: {
        cm: { width: 29.7, height: 42 },
        in: { width: 11.6929, height: 16.5354 },
    },
    a4: {
        cm: { width: 21, height: 29.7 },
        in: { width: 8.2677, height: 11.6929 },
    },
    a5: {
        cm: { width: 14.8, height: 21 },
        in: { width: 5.8268, height: 8.2677 },
    },
    a6: {
        cm: { width: 10.5, height: 14.8 },
        in: { width: 4.1339, height: 5.8268 },
    },
};

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

const main = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    get Browser () { return Browser; },
    get BrowserPlatform () { return BrowserPlatform; },
    get BrowserTag () { return BrowserTag; },
    CDP_WEBSOCKET_ENDPOINT_REGEX,
    Cache,
    get ChromeReleaseChannel () { return ChromeReleaseChannel; },
    DefaultProvider,
    InstalledBrowser,
    Process,
    TimeoutError: TimeoutError$1,
    WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX,
    computeExecutablePath,
    computeSystemExecutablePath,
    createProfile,
    detectBrowserPlatform,
    getInstalledBrowsers,
    getVersionComparator,
    install,
    launch,
    resolveBuildId,
    resolveDefaultUserDataDir,
    uninstall
}, Symbol.toStringTag, { value: 'Module' }));

export { ConnectionClosedError as C, ProtocolError as P, TimeoutError as T, UnsupportedOperation as U, assert as a, packageVersion as b, TouchError as c, debug as d, environment as e, TargetCloseError as f, stringToBase64 as g, main as h, isNode as i, mergeUint8Arrays as m, paperFormats as p, stringToTypedArray as s, typedArrayToBase64 as t };
