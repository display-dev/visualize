// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { execSync } from 'node:child_process';
import os from 'node:os';
import path__default from 'node:path';
import { s as semver } from './chunk-002.mjs';
import { createWriteStream } from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import { urlToHttpOptions, URL as URL$1 } from 'node:url';
import { g as getDefaultExportFromCjs } from './chunk-000.mjs';
import { r as requireWebsocket, a as requireSubprotocol } from './chunk-007.mjs';
import require$$0$1 from 'events';
import require$$2 from 'http';
import require$$0 from 'stream';
import require$$1 from 'crypto';
import { r as requireExtension, a as requirePermessageDeflate } from './chunk-005.mjs';
import { r as requireConstants } from './chunk-004.mjs';

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Supported browsers.
 *
 * @public
 */
var Browser;
(function (Browser) {
    Browser["CHROME"] = "chrome";
    Browser["CHROMEHEADLESSSHELL"] = "chrome-headless-shell";
    Browser["CHROMIUM"] = "chromium";
    Browser["FIREFOX"] = "firefox";
    Browser["CHROMEDRIVER"] = "chromedriver";
})(Browser || (Browser = {}));
/**
 * Platform names used to identify a OS platform x architecture combination in the way
 * that is relevant for the browser download.
 *
 * @public
 */
var BrowserPlatform;
(function (BrowserPlatform) {
    BrowserPlatform["LINUX"] = "linux";
    BrowserPlatform["LINUX_ARM"] = "linux_arm";
    BrowserPlatform["MAC"] = "mac";
    BrowserPlatform["MAC_ARM"] = "mac_arm";
    BrowserPlatform["WIN32"] = "win32";
    BrowserPlatform["WIN64"] = "win64";
})(BrowserPlatform || (BrowserPlatform = {}));
/**
 * Enum describing a release channel for a browser.
 *
 * You can use this in combination with {@link resolveBuildId} to resolve
 * a build ID based on a release channel.
 *
 * @public
 */
var BrowserTag;
(function (BrowserTag) {
    BrowserTag["CANARY"] = "canary";
    BrowserTag["NIGHTLY"] = "nightly";
    BrowserTag["BETA"] = "beta";
    BrowserTag["DEV"] = "dev";
    BrowserTag["DEVEDITION"] = "devedition";
    BrowserTag["STABLE"] = "stable";
    BrowserTag["ESR"] = "esr";
    BrowserTag["LATEST"] = "latest";
})(BrowserTag || (BrowserTag = {}));
/**
 * @public
 */
var ChromeReleaseChannel;
(function (ChromeReleaseChannel) {
    ChromeReleaseChannel["STABLE"] = "stable";
    ChromeReleaseChannel["DEV"] = "dev";
    ChromeReleaseChannel["CANARY"] = "canary";
    ChromeReleaseChannel["BETA"] = "beta";
})(ChromeReleaseChannel || (ChromeReleaseChannel = {}));

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
async function httpRequest(url, method, response, keepAlive = true) {
    let agent;
    try {
        const { ProxyAgent } = await import('proxy-agent');
        agent = new ProxyAgent();
    }
    catch {
        // Standard Node.js agents will be used.
    }
    const options = {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        method,
        headers: keepAlive ? { Connection: 'keep-alive' } : undefined,
        auth: urlToHttpOptions(url).auth,
        agent,
    };
    const requestCallback = (res) => {
        if (res.statusCode &&
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location) {
            void httpRequest(new URL$1(res.headers.location), method, response);
            // consume response data to free up memory
            // And prevents the connection from being kept alive
            res.resume();
        }
        else {
            response(res);
        }
    };
    const request = options.protocol === 'https:'
        ? https.request(options, requestCallback)
        : http.request(options, requestCallback);
    request.end();
    return request;
}
/**
 * @internal
 */
function downloadFile(url, destinationPath, progressCallback) {
    return new Promise(async (resolve, reject) => {
        let downloadedBytes = 0;
        let totalBytes = 0;
        function onData(chunk) {
            downloadedBytes += chunk.length;
            progressCallback(downloadedBytes, totalBytes);
        }
        try {
            const request = await httpRequest(url, 'GET', response => {
                if (response.statusCode !== 200) {
                    const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
                    // consume response data to free up memory
                    response.resume();
                    reject(error);
                    return;
                }
                const file = createWriteStream(destinationPath);
                file.on('close', () => {
                    // The 'close' event is emitted when the stream and any of its
                    // underlying resources (a file descriptor, for example) have been
                    // closed. The event indicates that no more events will be emitted, and
                    // no further computation will occur.
                    return resolve();
                });
                file.on('error', error => {
                    // The 'error' event may be emitted by a Readable implementation at any
                    // time. Typically, this may occur if the underlying stream is unable to
                    // generate data due to an underlying internal failure, or when a stream
                    // implementation attempts to push an invalid chunk of data.
                    return reject(error);
                });
                response.pipe(file);
                totalBytes = parseInt(response.headers['content-length'], 10);
                if (progressCallback) {
                    response.on('data', onData);
                }
            });
            request.on('error', error => {
                return reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
async function getJSON(url) {
    const text = await getText(url);
    try {
        return JSON.parse(text);
    }
    catch {
        throw new Error('Could not parse JSON from ' + url.toString());
    }
}
function getText(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await httpRequest(url, 'GET', response => {
                let data = '';
                if (response.statusCode && response.statusCode >= 400) {
                    return reject(new Error(`Got status code ${response.statusCode}`));
                }
                response.on('data', chunk => {
                    data += chunk;
                });
                response.on('end', () => {
                    try {
                        return resolve(String(data));
                    }
                    catch {
                        return reject(new Error(`Failed to read text response from ${url}`));
                    }
                });
            }, false);
            request.on('error', err => {
                reject(err);
            });
        }
        catch (err) {
            reject(err);
        }
    });
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function folder$3(platform) {
    switch (platform) {
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return 'linux64';
        case BrowserPlatform.MAC_ARM:
            return 'mac-arm64';
        case BrowserPlatform.MAC:
            return 'mac-x64';
        case BrowserPlatform.WIN32:
            return 'win32';
        case BrowserPlatform.WIN64:
            return 'win64';
    }
}
function resolveDownloadUrl$3(platform, buildId, baseUrl = 'https://storage.googleapis.com/chrome-for-testing-public') {
    return `${baseUrl}/${resolveDownloadPath$3(platform, buildId).join('/')}`;
}
function resolveDownloadPath$3(platform, buildId) {
    return [buildId, folder$3(platform), `chrome-${folder$3(platform)}.zip`];
}
function relativeExecutablePath$3(platform, _buildId) {
    switch (platform) {
        case BrowserPlatform.MAC:
        case BrowserPlatform.MAC_ARM:
            return path__default.join('chrome-' + folder$3(platform), 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing');
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return path__default.join('chrome-linux64', 'chrome');
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return path__default.join('chrome-' + folder$3(platform), 'chrome.exe');
    }
}
let baseVersionUrl = 'https://googlechromelabs.github.io/chrome-for-testing';
async function getLastKnownGoodReleaseForChannel(channel) {
    const data = (await getJSON(new URL(`${baseVersionUrl}/last-known-good-versions.json`)));
    for (const channel of Object.keys(data.channels)) {
        data.channels[channel.toLowerCase()] = data.channels[channel];
        delete data.channels[channel];
    }
    return data.channels[channel];
}
async function getLastKnownGoodReleaseForMilestone(milestone) {
    const data = (await getJSON(new URL(`${baseVersionUrl}/latest-versions-per-milestone.json`)));
    return data.milestones[milestone];
}
async function getLastKnownGoodReleaseForBuild(
/**
 * @example `112.0.23`,
 */
buildPrefix) {
    const data = (await getJSON(new URL(`${baseVersionUrl}/latest-patch-versions-per-build.json`)));
    return data.builds[buildPrefix];
}
async function resolveBuildId$1(channel) {
    if (Object.values(ChromeReleaseChannel).includes(channel)) {
        return (await getLastKnownGoodReleaseForChannel(channel)).version;
    }
    if (channel.match(/^\d+$/)) {
        // Potentially a milestone.
        return (await getLastKnownGoodReleaseForMilestone(channel))?.version;
    }
    if (channel.match(/^\d+\.\d+\.\d+$/)) {
        // Potentially a build prefix without the patch version.
        return (await getLastKnownGoodReleaseForBuild(channel))?.version;
    }
    return;
}
const WINDOWS_ENV_PARAM_NAMES = [
    'PROGRAMFILES',
    'ProgramW6432',
    'ProgramFiles(x86)',
    // https://source.chromium.org/chromium/chromium/src/+/main:chrome/installer/mini_installer/README.md
    'LOCALAPPDATA',
];
function getChromeWindowsLocation(channel, locationsPrefixes) {
    if (locationsPrefixes.size === 0) {
        throw new Error('Non of the common Windows Env variables were set');
    }
    let suffix;
    switch (channel) {
        case ChromeReleaseChannel.STABLE:
            suffix = 'Google\\Chrome\\Application\\chrome.exe';
            break;
        case ChromeReleaseChannel.BETA:
            suffix = 'Google\\Chrome Beta\\Application\\chrome.exe';
            break;
        case ChromeReleaseChannel.CANARY:
            suffix = 'Google\\Chrome SxS\\Application\\chrome.exe';
            break;
        case ChromeReleaseChannel.DEV:
            suffix = 'Google\\Chrome Dev\\Application\\chrome.exe';
            break;
    }
    return [...locationsPrefixes.values()].map(l => {
        return path__default.win32.join(l, suffix);
    });
}
function getWslVariable(variable) {
    try {
        // The Windows env for the paths are not passed down
        // to WSL, so we evoke `cmd.exe` which is usually on the PATH
        // from which the env can be access with all uppercase names.
        // The return value is a Windows Path - `C:\Program Files`.
        const result = execSync(`cmd.exe /c echo %${variable.toLocaleUpperCase()}%`, {
            // We need to ignore the stderr as cmd.exe
            // prints a message about wrong UNC path not supported.
            stdio: ['ignore', 'pipe', 'ignore'],
            encoding: 'utf-8',
        }).trim();
        if (result) {
            return result;
        }
    }
    catch { }
    return;
}
function getWslLocation(channel) {
    const wslVersion = execSync('wslinfo --version', {
        stdio: ['ignore', 'pipe', 'ignore'],
        encoding: 'utf-8',
    }).trim();
    if (!wslVersion) {
        throw new Error('Not in WSL or unsupported version of WSL.');
    }
    const wslPrefixes = new Set();
    for (const name of WINDOWS_ENV_PARAM_NAMES) {
        const wslPrefix = getWslVariable(name);
        if (wslPrefix) {
            wslPrefixes.add(wslPrefix);
        }
    }
    const windowsPath = getChromeWindowsLocation(channel, wslPrefixes);
    return windowsPath.map(path => {
        // The above command returned the Windows paths `C:\Program Files\...\chrome.exe`
        // Use the `wslpath` utility tool to transform into the mounted disk
        return execSync(`wslpath "${path}"`).toString().trim();
    });
}
function getChromeLinuxOrWslLocation(channel) {
    const locations = [];
    switch (channel) {
        case ChromeReleaseChannel.STABLE:
            locations.push('/opt/google/chrome/chrome');
            break;
        case ChromeReleaseChannel.BETA:
            locations.push('/opt/google/chrome-beta/chrome');
            break;
        case ChromeReleaseChannel.CANARY:
            locations.push('/opt/google/chrome-canary/chrome');
            break;
        case ChromeReleaseChannel.DEV:
            locations.push('/opt/google/chrome-unstable/chrome');
            break;
    }
    try {
        const wslPath = getWslLocation(channel);
        if (wslPath) {
            locations.push(...wslPath);
        }
    }
    catch {
        // Ignore WSL errors
    }
    return locations;
}
function resolveSystemExecutablePaths(platform, channel) {
    switch (platform) {
        case BrowserPlatform.WIN64:
        case BrowserPlatform.WIN32:
            const prefixLocation = new Set(WINDOWS_ENV_PARAM_NAMES.map(name => {
                return process.env[name];
            }).filter((l) => {
                return !!l;
            }));
            // Fallbacks in case env vars are misconfigured.
            prefixLocation.add('C:\\Program Files');
            prefixLocation.add('C:\\Program Files (x86)');
            prefixLocation.add('D:\\Program Files');
            prefixLocation.add('D:\\Program Files (x86)');
            return getChromeWindowsLocation(channel, prefixLocation);
        case BrowserPlatform.MAC_ARM:
        case BrowserPlatform.MAC:
            switch (channel) {
                case ChromeReleaseChannel.STABLE:
                    return [
                        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                    ];
                case ChromeReleaseChannel.BETA:
                    return [
                        '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta',
                    ];
                case ChromeReleaseChannel.CANARY:
                    return [
                        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
                    ];
                case ChromeReleaseChannel.DEV:
                    return [
                        '/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev',
                    ];
            }
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return getChromeLinuxOrWslLocation(channel);
    }
}
function resolveDefaultUserDataDir(platform, channel) {
    switch (platform) {
        case BrowserPlatform.WIN64:
        case BrowserPlatform.WIN32:
            // https://source.chromium.org/chromium/chromium/src/+/main:chrome/common/chrome_paths_win.cc;l=42;drc=4c86c7940a47c36b8bf52c134483ef2da86caa62
            switch (channel) {
                case ChromeReleaseChannel.STABLE:
                    return path__default.join(getLocalAppDataWin(), 'Google', 'Chrome', 'User Data');
                case ChromeReleaseChannel.BETA:
                    return path__default.join(getLocalAppDataWin(), 'Google', 'Chrome Beta', 'User Data');
                case ChromeReleaseChannel.CANARY:
                    return path__default.join(getLocalAppDataWin(), 'Google', 'Chrome SxS', 'User Data');
                case ChromeReleaseChannel.DEV:
                    return path__default.join(getLocalAppDataWin(), 'Google', 'Chrome Dev', 'User Data');
            }
        case BrowserPlatform.MAC_ARM:
        case BrowserPlatform.MAC:
            // https://source.chromium.org/chromium/chromium/src/+/main:chrome/common/chrome_paths_mac.mm;l=86;drc=4c86c7940a47c36b8bf52c134483ef2da86caa62
            switch (channel) {
                case ChromeReleaseChannel.STABLE:
                    return path__default.join(getBaseUserDataDirPathMac(), 'Chrome');
                case ChromeReleaseChannel.BETA:
                    return path__default.join(getBaseUserDataDirPathMac(), 'Chrome Beta');
                case ChromeReleaseChannel.DEV:
                    return path__default.join(getBaseUserDataDirPathMac(), 'Chrome Dev');
                case ChromeReleaseChannel.CANARY:
                    return path__default.join(getBaseUserDataDirPathMac(), 'Chrome Canary');
            }
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            // https://source.chromium.org/chromium/chromium/src/+/main:chrome/common/chrome_paths_linux.cc;l=80;drc=4c86c7940a47c36b8bf52c134483ef2da86caa62
            switch (channel) {
                case ChromeReleaseChannel.STABLE:
                    return path__default.join(getConfigHomeLinux(), 'google-chrome');
                case ChromeReleaseChannel.BETA:
                    return path__default.join(getConfigHomeLinux(), 'google-chrome-beta');
                case ChromeReleaseChannel.CANARY:
                    return path__default.join(getConfigHomeLinux(), 'google-chrome-canary');
                case ChromeReleaseChannel.DEV:
                    return path__default.join(getConfigHomeLinux(), 'google-chrome-unstable');
            }
    }
}
function getLocalAppDataWin() {
    return (process.env['LOCALAPPDATA'] || path__default.join(os.homedir(), 'AppData', 'Local'));
}
function getConfigHomeLinux() {
    return (process.env['CHROME_CONFIG_HOME'] ||
        process.env['XDG_CONFIG_HOME'] ||
        path__default.join(os.homedir(), '.config'));
}
function getBaseUserDataDirPathMac() {
    return path__default.join(os.homedir(), 'Library', 'Application Support', 'Google');
}
function compareVersions$1(a, b) {
    if (!semver.valid(a)) {
        throw new Error(`Version ${a} is not a valid semver version`);
    }
    if (!semver.valid(b)) {
        throw new Error(`Version ${b} is not a valid semver version`);
    }
    if (semver.gt(a, b)) {
        return 1;
    }
    else if (semver.lt(a, b)) {
        return -1;
    }
    else {
        return 0;
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function folder$2(platform) {
    switch (platform) {
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return 'linux64';
        case BrowserPlatform.MAC_ARM:
            return 'mac-arm64';
        case BrowserPlatform.MAC:
            return 'mac-x64';
        case BrowserPlatform.WIN32:
            return 'win32';
        case BrowserPlatform.WIN64:
            return 'win64';
    }
}
function resolveDownloadUrl$2(platform, buildId, baseUrl = 'https://storage.googleapis.com/chrome-for-testing-public') {
    return `${baseUrl}/${resolveDownloadPath$2(platform, buildId).join('/')}`;
}
function resolveDownloadPath$2(platform, buildId) {
    return [
        buildId,
        folder$2(platform),
        `chrome-headless-shell-${folder$2(platform)}.zip`,
    ];
}
function relativeExecutablePath$2(platform, _buildId) {
    switch (platform) {
        case BrowserPlatform.MAC:
        case BrowserPlatform.MAC_ARM:
            return path__default.join('chrome-headless-shell-' + folder$2(platform), 'chrome-headless-shell');
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return path__default.join('chrome-headless-shell-linux64', 'chrome-headless-shell');
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return path__default.join('chrome-headless-shell-' + folder$2(platform), 'chrome-headless-shell.exe');
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function folder$1(platform) {
    switch (platform) {
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return 'linux64';
        case BrowserPlatform.MAC_ARM:
            return 'mac-arm64';
        case BrowserPlatform.MAC:
            return 'mac-x64';
        case BrowserPlatform.WIN32:
            return 'win32';
        case BrowserPlatform.WIN64:
            return 'win64';
    }
}
function resolveDownloadUrl$1(platform, buildId, baseUrl = 'https://storage.googleapis.com/chrome-for-testing-public') {
    return `${baseUrl}/${resolveDownloadPath$1(platform, buildId).join('/')}`;
}
function resolveDownloadPath$1(platform, buildId) {
    return [buildId, folder$1(platform), `chromedriver-${folder$1(platform)}.zip`];
}
function relativeExecutablePath$1(platform, _buildId) {
    switch (platform) {
        case BrowserPlatform.MAC:
        case BrowserPlatform.MAC_ARM:
            return path__default.join('chromedriver-' + folder$1(platform), 'chromedriver');
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return path__default.join('chromedriver-linux64', 'chromedriver');
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return path__default.join('chromedriver-' + folder$1(platform), 'chromedriver.exe');
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function archive(platform, buildId) {
    switch (platform) {
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return 'chrome-linux';
        case BrowserPlatform.MAC_ARM:
        case BrowserPlatform.MAC:
            return 'chrome-mac';
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            // Windows archive name changed at r591479.
            return parseInt(buildId, 10) > 591479 ? 'chrome-win' : 'chrome-win32';
    }
}
function folder(platform) {
    switch (platform) {
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return 'Linux_x64';
        case BrowserPlatform.MAC_ARM:
            return 'Mac_Arm';
        case BrowserPlatform.MAC:
            return 'Mac';
        case BrowserPlatform.WIN32:
            return 'Win';
        case BrowserPlatform.WIN64:
            return 'Win_x64';
    }
}
function resolveDownloadUrl(platform, buildId, baseUrl = 'https://storage.googleapis.com/chromium-browser-snapshots') {
    return `${baseUrl}/${resolveDownloadPath(platform, buildId).join('/')}`;
}
function resolveDownloadPath(platform, buildId) {
    return [folder(platform), buildId, `${archive(platform, buildId)}.zip`];
}
function relativeExecutablePath(platform, _buildId) {
    switch (platform) {
        case BrowserPlatform.MAC:
        case BrowserPlatform.MAC_ARM:
            return path__default.join('chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium');
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return path__default.join('chrome-linux', 'chrome');
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return path__default.join('chrome-win', 'chrome.exe');
    }
}
async function resolveBuildId(platform) {
    return await getText(new URL(`https://storage.googleapis.com/chromium-browser-snapshots/${folder(platform)}/LAST_CHANGE`));
}
function compareVersions(a, b) {
    return Number(a) - Number(b);
}

var websocketExports = requireWebsocket();
const WebSocket = /*@__PURE__*/getDefaultExportFromCjs(websocketExports);

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Duplex$", "caughtErrors": "none" }] */

var websocketServer;
var hasRequiredWebsocketServer;

function requireWebsocketServer () {
	if (hasRequiredWebsocketServer) return websocketServer;
	hasRequiredWebsocketServer = 1;

	const EventEmitter = require$$0$1;
	const http = require$$2;
	const { Duplex } = require$$0;
	const { createHash } = require$$1;

	const extension = requireExtension();
	const PerMessageDeflate = requirePermessageDeflate();
	const subprotocol = requireSubprotocol();
	const WebSocket = requireWebsocket();
	const { CLOSE_TIMEOUT, GUID, kWebSocket } = requireConstants();

	const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

	const RUNNING = 0;
	const CLOSING = 1;
	const CLOSED = 2;

	/**
	 * Class representing a WebSocket server.
	 *
	 * @extends EventEmitter
	 */
	class WebSocketServer extends EventEmitter {
	  /**
	   * Create a `WebSocketServer` instance.
	   *
	   * @param {Object} options Configuration options
	   * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
	   *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
	   *     multiple times in the same tick
	   * @param {Boolean} [options.autoPong=true] Specifies whether or not to
	   *     automatically send a pong in response to a ping
	   * @param {Number} [options.backlog=511] The maximum length of the queue of
	   *     pending connections
	   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
	   *     track clients
	   * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
	   *     wait for the closing handshake to finish after `websocket.close()` is
	   *     called
	   * @param {Function} [options.handleProtocols] A hook to handle protocols
	   * @param {String} [options.host] The hostname where to bind the server
	   * @param {Number} [options.maxBufferedChunks=262144] The maximum number of
	   *     buffered data chunks
	   * @param {Number} [options.maxFragments=16384] The maximum number of message
	   *     fragments
	   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
	   *     size
	   * @param {Boolean} [options.noServer=false] Enable no server mode
	   * @param {String} [options.path] Accept only connections matching this path
	   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
	   *     permessage-deflate
	   * @param {Number} [options.port] The port where to bind the server
	   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
	   *     server to use
	   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
	   *     not to skip UTF-8 validation for text and close messages
	   * @param {Function} [options.verifyClient] A hook to reject connections
	   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
	   *     class to use. It must be the `WebSocket` class or class that extends it
	   * @param {Function} [callback] A listener for the `listening` event
	   */
	  constructor(options, callback) {
	    super();

	    options = {
	      allowSynchronousEvents: true,
	      autoPong: true,
	      maxBufferedChunks: 256 * 1024,
	      maxFragments: 16 * 1024,
	      maxPayload: 100 * 1024 * 1024,
	      skipUTF8Validation: false,
	      perMessageDeflate: false,
	      handleProtocols: null,
	      clientTracking: true,
	      closeTimeout: CLOSE_TIMEOUT,
	      verifyClient: null,
	      noServer: false,
	      backlog: null, // use default (511 as implemented in net.js)
	      server: null,
	      host: null,
	      path: null,
	      port: null,
	      WebSocket,
	      ...options
	    };

	    if (
	      (options.port == null && !options.server && !options.noServer) ||
	      (options.port != null && (options.server || options.noServer)) ||
	      (options.server && options.noServer)
	    ) {
	      throw new TypeError(
	        'One and only one of the "port", "server", or "noServer" options ' +
	          'must be specified'
	      );
	    }

	    if (options.port != null) {
	      this._server = http.createServer((req, res) => {
	        const body = http.STATUS_CODES[426];

	        res.writeHead(426, {
	          'Content-Length': body.length,
	          'Content-Type': 'text/plain'
	        });
	        res.end(body);
	      });
	      this._server.listen(
	        options.port,
	        options.host,
	        options.backlog,
	        callback
	      );
	    } else if (options.server) {
	      this._server = options.server;
	    }

	    if (this._server) {
	      const emitConnection = this.emit.bind(this, 'connection');

	      this._removeListeners = addListeners(this._server, {
	        listening: this.emit.bind(this, 'listening'),
	        error: this.emit.bind(this, 'error'),
	        upgrade: (req, socket, head) => {
	          this.handleUpgrade(req, socket, head, emitConnection);
	        }
	      });
	    }

	    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
	    if (options.clientTracking) {
	      this.clients = new Set();
	      this._shouldEmitClose = false;
	    }

	    this.options = options;
	    this._state = RUNNING;
	  }

	  /**
	   * Returns the bound address, the address family name, and port of the server
	   * as reported by the operating system if listening on an IP socket.
	   * If the server is listening on a pipe or UNIX domain socket, the name is
	   * returned as a string.
	   *
	   * @return {(Object|String|null)} The address of the server
	   * @public
	   */
	  address() {
	    if (this.options.noServer) {
	      throw new Error('The server is operating in "noServer" mode');
	    }

	    if (!this._server) return null;
	    return this._server.address();
	  }

	  /**
	   * Stop the server from accepting new connections and emit the `'close'` event
	   * when all existing connections are closed.
	   *
	   * @param {Function} [cb] A one-time listener for the `'close'` event
	   * @public
	   */
	  close(cb) {
	    if (this._state === CLOSED) {
	      if (cb) {
	        this.once('close', () => {
	          cb(new Error('The server is not running'));
	        });
	      }

	      process.nextTick(emitClose, this);
	      return;
	    }

	    if (cb) this.once('close', cb);

	    if (this._state === CLOSING) return;
	    this._state = CLOSING;

	    if (this.options.noServer || this.options.server) {
	      if (this._server) {
	        this._removeListeners();
	        this._removeListeners = this._server = null;
	      }

	      if (this.clients) {
	        if (!this.clients.size) {
	          process.nextTick(emitClose, this);
	        } else {
	          this._shouldEmitClose = true;
	        }
	      } else {
	        process.nextTick(emitClose, this);
	      }
	    } else {
	      const server = this._server;

	      this._removeListeners();
	      this._removeListeners = this._server = null;

	      //
	      // The HTTP/S server was created internally. Close it, and rely on its
	      // `'close'` event.
	      //
	      server.close(() => {
	        emitClose(this);
	      });
	    }
	  }

	  /**
	   * See if a given request should be handled by this server instance.
	   *
	   * @param {http.IncomingMessage} req Request object to inspect
	   * @return {Boolean} `true` if the request is valid, else `false`
	   * @public
	   */
	  shouldHandle(req) {
	    if (this.options.path) {
	      const index = req.url.indexOf('?');
	      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

	      if (pathname !== this.options.path) return false;
	    }

	    return true;
	  }

	  /**
	   * Handle a HTTP Upgrade request.
	   *
	   * @param {http.IncomingMessage} req The request object
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Function} cb Callback
	   * @public
	   */
	  handleUpgrade(req, socket, head, cb) {
	    socket.on('error', socketOnError);

	    const key = req.headers['sec-websocket-key'];
	    const upgrade = req.headers.upgrade;
	    const version = +req.headers['sec-websocket-version'];

	    if (req.method !== 'GET') {
	      const message = 'Invalid HTTP method';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
	      return;
	    }

	    if (upgrade === undefined || upgrade.toLowerCase() !== 'websocket') {
	      const message = 'Invalid Upgrade header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }

	    if (key === undefined || !keyRegex.test(key)) {
	      const message = 'Missing or invalid Sec-WebSocket-Key header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	      return;
	    }

	    if (version !== 13 && version !== 8) {
	      const message = 'Missing or invalid Sec-WebSocket-Version header';
	      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
	        'Sec-WebSocket-Version': '13, 8'
	      });
	      return;
	    }

	    if (!this.shouldHandle(req)) {
	      abortHandshake(socket, 400);
	      return;
	    }

	    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
	    let protocols = new Set();

	    if (secWebSocketProtocol !== undefined) {
	      try {
	        protocols = subprotocol.parse(secWebSocketProtocol);
	      } catch (err) {
	        const message = 'Invalid Sec-WebSocket-Protocol header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }

	    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
	    const extensions = {};

	    if (
	      this.options.perMessageDeflate &&
	      secWebSocketExtensions !== undefined
	    ) {
	      const perMessageDeflate = new PerMessageDeflate({
	        ...this.options.perMessageDeflate,
	        isServer: true,
	        maxPayload: this.options.maxPayload
	      });

	      try {
	        const offers = extension.parse(secWebSocketExtensions);

	        if (offers[PerMessageDeflate.extensionName]) {
	          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
	          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
	        }
	      } catch (err) {
	        const message =
	          'Invalid or unacceptable Sec-WebSocket-Extensions header';
	        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
	        return;
	      }
	    }

	    //
	    // Optionally call external client verification handler.
	    //
	    if (this.options.verifyClient) {
	      const info = {
	        origin:
	          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
	        secure: !!(req.socket.authorized || req.socket.encrypted),
	        req
	      };

	      if (this.options.verifyClient.length === 2) {
	        this.options.verifyClient(info, (verified, code, message, headers) => {
	          if (!verified) {
	            return abortHandshake(socket, code || 401, message, headers);
	          }

	          this.completeUpgrade(
	            extensions,
	            key,
	            protocols,
	            req,
	            socket,
	            head,
	            cb
	          );
	        });
	        return;
	      }

	      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
	    }

	    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
	  }

	  /**
	   * Upgrade the connection to WebSocket.
	   *
	   * @param {Object} extensions The accepted extensions
	   * @param {String} key The value of the `Sec-WebSocket-Key` header
	   * @param {Set} protocols The subprotocols
	   * @param {http.IncomingMessage} req The request object
	   * @param {Duplex} socket The network socket between the server and client
	   * @param {Buffer} head The first packet of the upgraded stream
	   * @param {Function} cb Callback
	   * @throws {Error} If called more than once with the same socket
	   * @private
	   */
	  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
	    //
	    // Destroy the socket if the client has already sent a FIN packet.
	    //
	    if (!socket.readable || !socket.writable) return socket.destroy();

	    if (socket[kWebSocket]) {
	      throw new Error(
	        'server.handleUpgrade() was called more than once with the same ' +
	          'socket, possibly due to a misconfiguration'
	      );
	    }

	    if (this._state > RUNNING) return abortHandshake(socket, 503);

	    const digest = createHash('sha1')
	      .update(key + GUID)
	      .digest('base64');

	    const headers = [
	      'HTTP/1.1 101 Switching Protocols',
	      'Upgrade: websocket',
	      'Connection: Upgrade',
	      `Sec-WebSocket-Accept: ${digest}`
	    ];

	    const ws = new this.options.WebSocket(null, undefined, this.options);

	    if (protocols.size) {
	      //
	      // Optionally call external protocol selection handler.
	      //
	      const protocol = this.options.handleProtocols
	        ? this.options.handleProtocols(protocols, req)
	        : protocols.values().next().value;

	      if (protocol) {
	        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
	        ws._protocol = protocol;
	      }
	    }

	    if (extensions[PerMessageDeflate.extensionName]) {
	      const params = extensions[PerMessageDeflate.extensionName].params;
	      const value = extension.format({
	        [PerMessageDeflate.extensionName]: [params]
	      });
	      headers.push(`Sec-WebSocket-Extensions: ${value}`);
	      ws._extensions = extensions;
	    }

	    //
	    // Allow external modification/inspection of handshake headers.
	    //
	    this.emit('headers', headers, req);

	    socket.write(headers.concat('\r\n').join('\r\n'));
	    socket.removeListener('error', socketOnError);

	    ws.setSocket(socket, head, {
	      allowSynchronousEvents: this.options.allowSynchronousEvents,
	      maxBufferedChunks: this.options.maxBufferedChunks,
	      maxFragments: this.options.maxFragments,
	      maxPayload: this.options.maxPayload,
	      skipUTF8Validation: this.options.skipUTF8Validation
	    });

	    if (this.clients) {
	      this.clients.add(ws);
	      ws.on('close', () => {
	        this.clients.delete(ws);

	        if (this._shouldEmitClose && !this.clients.size) {
	          process.nextTick(emitClose, this);
	        }
	      });
	    }

	    cb(ws, req);
	  }
	}

	websocketServer = WebSocketServer;

	/**
	 * Add event listeners on an `EventEmitter` using a map of <event, listener>
	 * pairs.
	 *
	 * @param {EventEmitter} server The event emitter
	 * @param {Object.<String, Function>} map The listeners to add
	 * @return {Function} A function that will remove the added listeners when
	 *     called
	 * @private
	 */
	function addListeners(server, map) {
	  for (const event of Object.keys(map)) server.on(event, map[event]);

	  return function removeListeners() {
	    for (const event of Object.keys(map)) {
	      server.removeListener(event, map[event]);
	    }
	  };
	}

	/**
	 * Emit a `'close'` event on an `EventEmitter`.
	 *
	 * @param {EventEmitter} server The event emitter
	 * @private
	 */
	function emitClose(server) {
	  server._state = CLOSED;
	  server.emit('close');
	}

	/**
	 * Handle socket errors.
	 *
	 * @private
	 */
	function socketOnError() {
	  this.destroy();
	}

	/**
	 * Close the connection when preconditions are not fulfilled.
	 *
	 * @param {Duplex} socket The socket of the upgrade request
	 * @param {Number} code The HTTP response status code
	 * @param {String} [message] The HTTP response body
	 * @param {Object} [headers] Additional HTTP response headers
	 * @private
	 */
	function abortHandshake(socket, code, message, headers) {
	  //
	  // The socket is writable unless the user destroyed or ended it before calling
	  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
	  // error. Handling this does not make much sense as the worst that can happen
	  // is that some of the data written by the user might be discarded due to the
	  // call to `socket.end()` below, which triggers an `'error'` event that in
	  // turn causes the socket to be destroyed.
	  //
	  message = message || http.STATUS_CODES[code];
	  headers = {
	    Connection: 'close',
	    'Content-Type': 'text/html',
	    'Content-Length': Buffer.byteLength(message),
	    ...headers
	  };

	  socket.once('finish', socket.destroy);

	  socket.end(
	    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
	      Object.keys(headers)
	        .map((h) => `${h}: ${headers[h]}`)
	        .join('\r\n') +
	      '\r\n\r\n' +
	      message
	  );
	}

	/**
	 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
	 * one listener for it, otherwise call `abortHandshake()`.
	 *
	 * @param {WebSocketServer} server The WebSocket server
	 * @param {http.IncomingMessage} req The request object
	 * @param {Duplex} socket The socket of the upgrade request
	 * @param {Number} code The HTTP response status code
	 * @param {String} message The HTTP response body
	 * @param {Object} [headers] The HTTP response headers
	 * @private
	 */
	function abortHandshakeOrEmitwsClientError(
	  server,
	  req,
	  socket,
	  code,
	  message,
	  headers
	) {
	  if (server.listenerCount('wsClientError')) {
	    const err = new Error(message);
	    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

	    server.emit('wsClientError', err, socket, req);
	  } else {
	    abortHandshake(socket, code, message, headers);
	  }
	}
	return websocketServer;
}

requireWebsocketServer();

export { Browser as B, ChromeReleaseChannel as C, WebSocket as W, BrowserPlatform as a, BrowserTag as b, resolveDownloadUrl$3 as c, resolveDownloadUrl$2 as d, resolveDownloadUrl$1 as e, resolveDownloadPath as f, getJSON as g, resolveDownloadPath$3 as h, resolveDownloadPath$2 as i, resolveDownloadPath$1 as j, relativeExecutablePath as k, relativeExecutablePath$3 as l, relativeExecutablePath$2 as m, relativeExecutablePath$1 as n, compareVersions as o, compareVersions$1 as p, resolveBuildId$1 as q, resolveDownloadUrl as r, resolveBuildId as s, resolveSystemExecutablePaths as t, resolveDefaultUserDataDir as u, downloadFile as v };
