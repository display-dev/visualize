// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import childProcess, { spawnSync } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { accessSync, existsSync, readFileSync } from 'node:fs';
import os from 'node:os';
import readline from 'node:readline';
import { b as debug, d as detectBrowserPlatform, e as resolveSystemExecutablePaths, f as executablePathByBrowser, C as Cache, D as DefaultProvider, I as InstalledBrowser, u as unpackArchive } from './chunk-009.mjs';
import assert from 'node:assert';
import { mkdir, unlink } from 'node:fs/promises';
import path__default from 'node:path';
import { v as downloadFile, a as BrowserPlatform, B as Browser } from './chunk-008.mjs';

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const debugLaunch = debug('puppeteer:browsers:launcher');
/**
 * @public
 */
function computeExecutablePath(options) {
    if (options.cacheDir === null) {
        options.platform ??= detectBrowserPlatform();
        if (options.platform === undefined) {
            throw new Error(`No platform specified. Couldn't auto-detect browser platform.`);
        }
        return executablePathByBrowser[options.browser](options.platform, options.buildId);
    }
    return new Cache(options.cacheDir).computeExecutablePath(options);
}
/**
 * Returns a path to a system-wide Chrome installation given a release channel
 * name by checking known installation locations (using
 * {@link https://pptr.dev/browsers-api/browsers.computesystemexecutablepath}).
 * If Chrome instance is not found at the expected path, an error is thrown.
 *
 * @public
 */
function computeSystemExecutablePath(options) {
    options.platform ??= detectBrowserPlatform();
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
    }
    const paths = resolveSystemExecutablePaths(options.browser, options.platform, options.channel);
    for (const path of paths) {
        try {
            accessSync(path);
            return path;
        }
        catch { }
    }
    throw new Error(`Could not find Google Chrome executable for channel '${options.channel}' at:${paths.map(path => {
        return `\n - ${path}`;
    })}.`);
}
/**
 * Launches a browser process according to {@link LaunchOptions}.
 *
 * @public
 */
function launch(opts) {
    return new Process(opts);
}
/**
 * @public
 */
const CDP_WEBSOCKET_ENDPOINT_REGEX = /^DevTools listening on (ws:\/\/.*)$/;
/**
 * @public
 */
const WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX = /^WebDriver BiDi listening on (ws:\/\/.*)$/;
const processListeners = new Map();
const dispatchers = {
    exit: (...args) => {
        processListeners.get('exit')?.forEach(handler => {
            return handler(...args);
        });
    },
    SIGINT: (...args) => {
        processListeners.get('SIGINT')?.forEach(handler => {
            return handler(...args);
        });
    },
    SIGHUP: (...args) => {
        processListeners.get('SIGHUP')?.forEach(handler => {
            return handler(...args);
        });
    },
    SIGTERM: (...args) => {
        processListeners.get('SIGTERM')?.forEach(handler => {
            return handler(...args);
        });
    },
};
function subscribeToProcessEvent(event, handler) {
    const listeners = processListeners.get(event) || [];
    if (listeners.length === 0) {
        process.on(event, dispatchers[event]);
    }
    listeners.push(handler);
    processListeners.set(event, listeners);
}
function unsubscribeFromProcessEvent(event, handler) {
    const listeners = processListeners.get(event) || [];
    const existingListenerIdx = listeners.indexOf(handler);
    if (existingListenerIdx === -1) {
        return;
    }
    listeners.splice(existingListenerIdx, 1);
    processListeners.set(event, listeners);
    if (listeners.length === 0) {
        process.off(event, dispatchers[event]);
    }
}
/**
 * @public
 */
class Process {
    #executablePath;
    #args;
    #browserProcess;
    #exited = false;
    // The browser process can be closed externally or from the driver process. We
    // need to invoke the hooks only once though but we don't know how many times
    // we will be invoked.
    #hooksRan = false;
    #onExitHook = async () => { };
    #browserProcessExiting;
    #logs = [];
    #maxLogLinesSize = 1000;
    #lineEmitter = new EventEmitter();
    #onAbort = () => {
        this.kill();
    };
    #signal;
    constructor(opts) {
        this.#executablePath = opts.executablePath;
        this.#args = opts.args ?? [];
        this.#signal = opts.signal;
        if (this.#signal?.aborted) {
            throw new Error(this.#signal.reason ? this.#signal.reason : 'Launch aborted');
        }
        this.#signal?.addEventListener('abort', this.#onAbort, { once: true });
        opts.pipe ??= false;
        opts.dumpio ??= false;
        opts.handleSIGINT ??= true;
        opts.handleSIGTERM ??= true;
        opts.handleSIGHUP ??= true;
        // On non-windows platforms, `detached: true` makes child process a
        // leader of a new process group, making it possible to kill child
        // process tree with `.kill(-pid)` command. @see
        // https://nodejs.org/api/child_process.html#child_process_options_detached
        opts.detached ??= process.platform !== 'win32';
        const stdio = this.#configureStdio({
            pipe: opts.pipe,
        });
        const env = opts.env || {};
        debugLaunch?.(`Launching ${this.#executablePath} ${this.#args.join(' ')}`, {
            detached: opts.detached,
            env: Object.keys(env).reduce((res, key) => {
                if (key.toLowerCase().startsWith('puppeteer_')) {
                    res[key] = env[key];
                }
                return res;
            }, {}),
            stdio,
        });
        this.#browserProcess = childProcess.spawn(this.#executablePath, this.#args, {
            detached: opts.detached,
            env,
            stdio,
        });
        this.#recordStream(this.#browserProcess.stderr);
        this.#recordStream(this.#browserProcess.stdout);
        debugLaunch?.(`Launched ${this.#browserProcess.pid}`);
        if (opts.dumpio) {
            this.#browserProcess.stderr?.pipe(process.stderr);
            this.#browserProcess.stdout?.pipe(process.stdout);
        }
        subscribeToProcessEvent('exit', this.#onDriverProcessExit);
        if (opts.handleSIGINT) {
            subscribeToProcessEvent('SIGINT', this.#onDriverProcessSignal);
        }
        if (opts.handleSIGTERM) {
            subscribeToProcessEvent('SIGTERM', this.#onDriverProcessSignal);
        }
        if (opts.handleSIGHUP) {
            subscribeToProcessEvent('SIGHUP', this.#onDriverProcessSignal);
        }
        if (opts.onExit) {
            this.#onExitHook = opts.onExit;
        }
        this.#browserProcessExiting = new Promise((resolve, reject) => {
            this.#browserProcess.once('exit', async () => {
                debugLaunch?.(`Browser process ${this.#browserProcess.pid} onExit`);
                this.#clearListeners();
                this.#exited = true;
                try {
                    await this.#runHooks();
                }
                catch (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    async #runHooks() {
        if (this.#hooksRan) {
            return;
        }
        this.#hooksRan = true;
        await this.#onExitHook();
    }
    get nodeProcess() {
        return this.#browserProcess;
    }
    #configureStdio(opts) {
        if (opts.pipe) {
            return ['pipe', 'pipe', 'pipe', 'pipe', 'pipe'];
        }
        else {
            return ['pipe', 'pipe', 'pipe'];
        }
    }
    #clearListeners() {
        unsubscribeFromProcessEvent('exit', this.#onDriverProcessExit);
        unsubscribeFromProcessEvent('SIGINT', this.#onDriverProcessSignal);
        unsubscribeFromProcessEvent('SIGTERM', this.#onDriverProcessSignal);
        unsubscribeFromProcessEvent('SIGHUP', this.#onDriverProcessSignal);
        this.#signal?.removeEventListener('abort', this.#onAbort);
    }
    #onDriverProcessExit = (_code) => {
        this.kill();
    };
    #onDriverProcessSignal = (signal) => {
        switch (signal) {
            case 'SIGINT':
                this.kill();
                process.exit(130);
            case 'SIGTERM':
            case 'SIGHUP':
                void this.close();
                break;
        }
    };
    async close() {
        await this.#runHooks();
        if (!this.#exited) {
            this.kill();
        }
        return await this.#browserProcessExiting;
    }
    hasClosed() {
        return this.#browserProcessExiting;
    }
    kill() {
        debugLaunch?.(`Trying to kill ${this.#browserProcess.pid}`);
        // If the process failed to launch (for example if the browser executable path
        // is invalid), then the process does not get a pid assigned. A call to
        // `proc.kill` would error, as the `pid` to-be-killed can not be found.
        if (this.#browserProcess &&
            this.#browserProcess.pid &&
            pidExists(this.#browserProcess.pid)) {
            try {
                debugLaunch?.(`Browser process ${this.#browserProcess.pid} exists`);
                if (process.platform === 'win32') {
                    try {
                        childProcess.execSync(`taskkill /pid ${this.#browserProcess.pid} /T /F`);
                    }
                    catch (error) {
                        debugLaunch?.(`Killing ${this.#browserProcess.pid} using taskkill failed`, error);
                        // taskkill can fail to kill the process e.g. due to missing permissions.
                        // Let's kill the process via Node API. This delays killing of all child
                        // processes of `this.proc` until the main Node.js process dies.
                        this.#browserProcess.kill();
                    }
                }
                else {
                    // on linux the process group can be killed with the group id prefixed with
                    // a minus sign. The process group id is the group leader's pid.
                    const processGroupId = -this.#browserProcess.pid;
                    try {
                        process.kill(processGroupId, 'SIGKILL');
                    }
                    catch (error) {
                        debugLaunch?.(`Killing ${this.#browserProcess.pid} using process.kill failed`, error);
                        // Killing the process group can fail due e.g. to missing permissions.
                        // Let's kill the process via Node API. This delays killing of all child
                        // processes of `this.proc` until the main Node.js process dies.
                        this.#browserProcess.kill('SIGKILL');
                    }
                }
            }
            catch (error) {
                throw new Error(`${PROCESS_ERROR_EXPLANATION}\nError cause: ${isErrorLike(error) ? error.stack : error}`);
            }
        }
        this.#clearListeners();
    }
    #recordStream(stream) {
        const rl = readline.createInterface(stream);
        const cleanup = () => {
            rl.off('line', onLine);
            rl.off('close', onClose);
            try {
                rl.close();
            }
            catch { }
        };
        const onLine = (line) => {
            if (line.trim() === '') {
                return;
            }
            this.#logs.push(line);
            const delta = this.#logs.length - this.#maxLogLinesSize;
            if (delta) {
                this.#logs.splice(0, delta);
            }
            this.#lineEmitter.emit('line', line);
        };
        const onClose = () => {
            cleanup();
        };
        rl.on('line', onLine);
        rl.on('close', onClose);
    }
    /**
     * Get recent logs (stderr + stdout) emitted by the browser.
     *
     * @public
     */
    getRecentLogs() {
        return [...this.#logs];
    }
    waitForLineOutput(regex, timeout = 0) {
        return new Promise((resolve, reject) => {
            const onClose = (errorOrCode) => {
                cleanup();
                reject(new Error([
                    `Failed to launch the browser process: ${errorOrCode instanceof Error
                        ? ` ${errorOrCode.message}`
                        : ` Code: ${errorOrCode}`}`,
                    '',
                    `stderr:`,
                    this.getRecentLogs().join('\n'),
                    '',
                    'TROUBLESHOOTING: https://pptr.dev/troubleshooting',
                    '',
                ].join('\n')));
            };
            this.#browserProcess.on('exit', onClose);
            this.#browserProcess.on('error', onClose);
            const timeoutId = timeout > 0 ? setTimeout(onTimeout, timeout) : undefined;
            this.#lineEmitter.on('line', onLine);
            const cleanup = () => {
                clearTimeout(timeoutId);
                this.#lineEmitter.off('line', onLine);
                this.#browserProcess.off('exit', onClose);
                this.#browserProcess.off('error', onClose);
            };
            function onTimeout() {
                cleanup();
                reject(new TimeoutError(`Timed out after ${timeout} ms while waiting for the WS endpoint URL to appear in stdout!`));
            }
            for (const line of this.#logs) {
                onLine(line);
            }
            function onLine(line) {
                const match = line.match(regex);
                if (!match) {
                    return;
                }
                cleanup();
                // The RegExp matches, so this will obviously exist.
                resolve(match[1]);
            }
        });
    }
}
const PROCESS_ERROR_EXPLANATION = `Puppeteer was unable to kill the process which ran the browser binary.
This means that, on future Puppeteer launches, Puppeteer might not be able to launch the browser.
Please check your open processes and ensure that the browser processes that Puppeteer launched have been killed.
If you think this is a bug, please report it on the Puppeteer issue tracker.`;
/**
 * @internal
 */
function pidExists(pid) {
    try {
        return process.kill(pid, 0);
    }
    catch (error) {
        if (isErrnoException(error)) {
            if (error.code && error.code === 'ESRCH') {
                return false;
            }
        }
        throw error;
    }
}
/**
 * @internal
 */
function isErrorLike(obj) {
    return (typeof obj === 'object' && obj !== null && 'name' in obj && 'message' in obj);
}
/**
 * @internal
 */
function isErrnoException(obj) {
    return (isErrorLike(obj) &&
        ('errno' in obj || 'code' in obj || 'path' in obj || 'syscall' in obj));
}
/**
 * @public
 */
class TimeoutError extends Error {
    /**
     * @internal
     */
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const debugInstall = debug('puppeteer:browsers:install');
const times = new Map();
function debugTime(label) {
    times.set(label, process.hrtime());
}
function debugTimeEnd(label) {
    const end = process.hrtime();
    const start = times.get(label);
    if (!start) {
        return;
    }
    const duration = end[0] * 1000 + end[1] / 1e6 - (start[0] * 1000 + start[1] / 1e6); // calculate duration in milliseconds
    debugInstall?.(`Duration for ${label}: ${duration}ms`);
}
/**
 * Install using custom provider plugins.
 * Tries each provider in order until one succeeds.
 * Falls back to default provider if all custom providers fail.
 *
 * @internal
 */
async function installWithProviders(options) {
    if (!options.platform) {
        throw new Error('Platform must be defined');
    }
    const cache = new Cache(options.cacheDir);
    const browserRoot = cache.browserRoot(options.browser);
    // Build provider list with proper fallback behavior
    const providers = [...(options.providers || [])];
    // If custom baseUrl is provided, add it as a provider
    if (options.baseUrl) {
        providers.push(new DefaultProvider(options.baseUrl));
    }
    // Always add default provider as final fallback
    // (unless custom baseUrl is provided and forceFallbackForTesting is false)
    if (!options.baseUrl || options.forceFallbackForTesting) {
        providers.push(new DefaultProvider());
    }
    const downloadOptions = {
        browser: options.browser,
        platform: options.platform,
        buildId: options.buildId,
        progressCallback: options.downloadProgressCallback === 'default'
            ? await makeProgressCallback(options.browser, options.buildIdAlias ?? options.buildId)
            : options.downloadProgressCallback,
    };
    const errors = [];
    for (const provider of providers) {
        try {
            // Check: does this provider support this browser/platform?
            if (!(await provider.supports(downloadOptions))) {
                debugInstall?.(`Provider ${provider.getName()} does not support ${options.browser} on ${options.platform}`);
                continue;
            }
            // Warn if using non-default provider
            if (!(provider instanceof DefaultProvider)) {
                debugInstall?.(`⚠️  Using custom downloader: ${provider.getName()}`);
                debugInstall?.(`⚠️  Puppeteer does not guarantee compatibility with non-default providers`);
            }
            debugInstall?.(`Trying provider: ${provider.getName()} for ${options.browser} ${options.buildId}`);
            // Get download URL from provider
            const url = await provider.getDownloadUrl(downloadOptions);
            if (!url) {
                debugInstall?.(`Provider ${provider.getName()} returned no URL for ${options.browser} ${options.buildId}`);
                continue;
            }
            debugInstall?.(`Successfully got URL from ${provider.getName()}: ${url}`);
            if (!existsSync(browserRoot)) {
                await mkdir(browserRoot, { recursive: true });
            }
            // Download and install using the URL from the provider
            return await installUrl(url, options, provider);
        }
        catch (err) {
            debugInstall?.(`Provider ${provider.getName()} failed: ${err.message}`);
            errors.push({
                providerName: provider.getName(),
                error: err,
            });
            // Continue to next provider
        }
    }
    // All providers failed
    const errorDetails = errors
        .map(e => {
        return `  - ${e.providerName}: ${e.error.message}`;
    })
        .join('\n');
    throw new Error(`All providers failed for ${options.browser} ${options.buildId}:\n${errorDetails}`);
}
async function install(options) {
    options.platform ??= detectBrowserPlatform();
    options.unpack ??= true;
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
    }
    // Always use plugin architecture (uses default provider if none specified)
    options.providers ??= [];
    return await installWithProviders(options);
}
async function installDeps(installedBrowser) {
    if (process.platform !== 'linux' ||
        installedBrowser.platform !== BrowserPlatform.LINUX) {
        return;
    }
    // Currently, only Debian-like deps are supported.
    const depsPath = path__default.join(path__default.dirname(installedBrowser.executablePath), 'deb.deps');
    if (!existsSync(depsPath)) {
        debugInstall?.(`deb.deps file was not found at ${depsPath}`);
        return;
    }
    const data = readFileSync(depsPath, 'utf-8').split('\n').join(',');
    if (process.getuid?.() !== 0) {
        throw new Error('Installing system dependencies requires root privileges');
    }
    let result = spawnSync('apt-get', ['-v']);
    if (result.status !== 0) {
        throw new Error('Failed to install system dependencies: apt-get does not seem to be available');
    }
    debugInstall?.(`Trying to install dependencies: ${data}`);
    result = spawnSync('apt-get', [
        'satisfy',
        '-y',
        data,
        '--no-install-recommends',
    ]);
    if (result.status !== 0) {
        throw new Error(`Failed to install system dependencies: status=${result.status},error=${result.error},stdout=${result.stdout.toString('utf8')},stderr=${result.stderr.toString('utf8')}`);
    }
    debugInstall?.(`Installed system dependencies ${data}`);
}
async function installUrl(url, options, provider) {
    if (!provider) {
        throw new Error('Provider is required for installation');
    }
    options.platform ??= detectBrowserPlatform();
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
    }
    let downloadProgressCallback = options.downloadProgressCallback;
    if (downloadProgressCallback === 'default') {
        downloadProgressCallback = await makeProgressCallback(options.browser, options.buildIdAlias ?? options.buildId);
    }
    const fileName = decodeURIComponent(url.toString()).split('/').pop();
    assert(fileName, `A malformed download URL was found: ${url}.`);
    const cache = new Cache(options.cacheDir);
    const browserRoot = cache.browserRoot(options.browser);
    const archivePath = path__default.join(browserRoot, `${options.buildId}-${fileName}`);
    if (!existsSync(browserRoot)) {
        await mkdir(browserRoot, { recursive: true });
    }
    if (!options.unpack) {
        if (existsSync(archivePath)) {
            return archivePath;
        }
        debugInstall?.(`Downloading binary from ${url}`);
        debugTime('download');
        await downloadFile(url, archivePath, downloadProgressCallback);
        debugTimeEnd('download');
        return archivePath;
    }
    const outputPath = cache.installationDir(options.browser, options.platform, options.buildId);
    // Get executable path from provider once (used for both cached and new installations)
    const relativeExecutablePath = await provider.getExecutablePath({
        browser: options.browser,
        buildId: options.buildId,
        platform: options.platform,
    });
    debugInstall?.(`Using executable path from provider: ${relativeExecutablePath}`);
    const installedBrowser = new InstalledBrowser(cache, options.browser, options.buildId, options.platform);
    // Write metadata for the installation (only for non-default providers)
    if (!(provider instanceof DefaultProvider)) {
        cache.writeExecutablePath(options.browser, options.platform, options.buildId, relativeExecutablePath);
    }
    try {
        if (existsSync(outputPath)) {
            if (!existsSync(installedBrowser.executablePath)) {
                throw new Error(`The browser folder (${outputPath}) exists but the executable (${installedBrowser.executablePath}) is missing`);
            }
            await runSetup(installedBrowser);
            if (options.installDeps) {
                await installDeps(installedBrowser);
            }
            return installedBrowser;
        }
        // Check if archive already exists (e.g., from a custom provider)
        if (!existsSync(archivePath)) {
            debugInstall?.(`Downloading binary from ${url}`);
            try {
                debugTime('download');
                await downloadFile(url, archivePath, downloadProgressCallback);
            }
            finally {
                debugTimeEnd('download');
            }
        }
        else {
            debugInstall?.(`Using existing archive at ${archivePath}`);
        }
        debugInstall?.(`Installing ${archivePath} to ${outputPath}`);
        try {
            debugTime('extract');
            await unpackArchive(archivePath, outputPath);
        }
        finally {
            debugTimeEnd('extract');
        }
        if (options.buildIdAlias) {
            const metadata = installedBrowser.readMetadata();
            metadata.aliases[options.buildIdAlias] = options.buildId;
            installedBrowser.writeMetadata(metadata);
        }
        await runSetup(installedBrowser);
        if (options.installDeps) {
            await installDeps(installedBrowser);
        }
        return installedBrowser;
    }
    finally {
        if (existsSync(archivePath)) {
            await unlink(archivePath);
        }
    }
}
async function runSetup(installedBrowser) {
    // On Windows for Chrome invoke setup.exe to configure sandboxes.
    if ((installedBrowser.platform === BrowserPlatform.WIN32 ||
        installedBrowser.platform === BrowserPlatform.WIN64) &&
        installedBrowser.browser === Browser.CHROME &&
        installedBrowser.platform === detectBrowserPlatform()) {
        try {
            debugTime('permissions');
            const browserDir = path__default.dirname(installedBrowser.executablePath);
            const setupExePath = path__default.join(browserDir, 'setup.exe');
            if (!existsSync(setupExePath)) {
                return;
            }
            spawnSync(path__default.join(browserDir, 'setup.exe'), [`--configure-browser-in-directory=` + browserDir], {
                shell: false,
            });
            // TODO: Handle error here. Currently the setup.exe sometimes
            // errors although it sets the permissions correctly.
        }
        finally {
            debugTimeEnd('permissions');
        }
    }
}
/**
 *
 * @public
 */
async function uninstall(options) {
    options.platform ??= detectBrowserPlatform();
    if (!options.platform) {
        throw new Error(`Cannot detect the browser platform for: ${os.platform()} (${os.arch()})`);
    }
    new Cache(options.cacheDir).uninstall(options.browser, options.platform, options.buildId);
}
/**
 * Returns metadata about browsers installed in the cache directory.
 *
 * @public
 */
async function getInstalledBrowsers(options) {
    return new Cache(options.cacheDir).getInstalledBrowsers();
}
let ProgressBarClass;
const importProgressBarIfNeeded = async () => {
    if (!ProgressBarClass) {
        ProgressBarClass = (await import('./chunk-000.mjs').then(n => n.a)).default;
    }
    return ProgressBarClass;
};
/**
 * @internal
 */
async function makeProgressCallback(browser, buildId) {
    const ProgressBarClass = await importProgressBarIfNeeded();
    let progressBar;
    let lastDownloadedBytes = 0;
    return (downloadedBytes, totalBytes) => {
        if (!progressBar) {
            progressBar = new ProgressBarClass(`Downloading ${browser} ${buildId} - ${toMegabytes(totalBytes)} [:bar] :percent :etas `, {
                complete: '=',
                incomplete: ' ',
                width: 20,
                total: totalBytes,
            });
        }
        const delta = downloadedBytes - lastDownloadedBytes;
        lastDownloadedBytes = downloadedBytes;
        progressBar.tick(delta);
    };
}
function toMegabytes(bytes) {
    const mb = bytes / 1000 / 1000;
    return `${Math.round(mb * 10) / 10} MB`;
}

export { CDP_WEBSOCKET_ENDPOINT_REGEX as C, Process as P, TimeoutError as T, WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX as W, computeSystemExecutablePath as a, computeExecutablePath as c, getInstalledBrowsers as g, install as i, launch as l, uninstall as u };
