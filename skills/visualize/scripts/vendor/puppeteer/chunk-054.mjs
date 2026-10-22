// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { l as launch, T as TimeoutError, C as CDP_WEBSOCKET_ENDPOINT_REGEX, W as WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX, c as computeExecutablePath, a as computeSystemExecutablePath, g as getInstalledBrowsers, u as uninstall } from './chunk-010.mjs';
import { c as createProfile, d as detectBrowserPlatform, a as resolveBuildId } from './chunk-009.mjs';
import 'node:child_process';
import fs, { existsSync } from 'node:fs';
import os, { tmpdir } from 'node:os';
import path__default, { join } from 'node:path';
import 'node:process';
import 'node:readline';
import { B as Browser } from './chunk-008.mjs';
import { a as assertSupportedUrlRestrictions, P as Puppeteer } from './chunk-053.mjs';
import { N as NodeWebSocketTransport, c as convertPuppeteerChannelToBrowsersChannel, P as PUPPETEER_REVISIONS } from './chunk-052.mjs';
import { mkdtemp, unlink, rename } from 'node:fs/promises';
import { D as DisposableStack, E as EventEmitter, b as debugError, s as DEFAULT_VIEWPORT } from './chunk-017.mjs';
import { a as assert, T as TimeoutError$1 } from './chunk-015.mjs';
import { d as firstValueFrom, n as race, t as timer, m as map, b as from } from './chunk-016.mjs';
import { C as CdpBrowser } from './chunk-033.mjs';
import { c as Connection } from './chunk-025.mjs';
import { c as createIncrementalIdGenerator } from './chunk-022.mjs';

/**
 * @internal
 */
class PipeTransport {
    #pipeWrite;
    #subscriptions = new DisposableStack();
    #isClosed = false;
    #pendingMessage = [];
    onclose;
    onmessage;
    constructor(pipeWrite, pipeRead) {
        this.#pipeWrite = pipeWrite;
        const pipeReadEmitter = this.#subscriptions.use(
        // NodeJS event emitters don't support `*` so we need to typecast
        // As long as we don't use it we should be OK.
        new EventEmitter(pipeRead));
        pipeReadEmitter.on('data', buffer => {
            return this.#dispatch(buffer);
        });
        pipeReadEmitter.on('close', () => {
            if (this.onclose) {
                this.onclose.call(null);
            }
        });
        pipeReadEmitter.on('error', debugError);
        const pipeWriteEmitter = this.#subscriptions.use(
        // NodeJS event emitters don't support `*` so we need to typecast
        // As long as we don't use it we should be OK.
        new EventEmitter(pipeWrite));
        pipeWriteEmitter.on('error', debugError);
    }
    send(message) {
        assert(!this.#isClosed, '`PipeTransport` is closed.');
        this.#pipeWrite.write(message);
        this.#pipeWrite.write('\0');
    }
    #dispatch(buffer) {
        assert(!this.#isClosed, '`PipeTransport` is closed.');
        this.#pendingMessage.push(buffer);
        if (buffer.indexOf('\0') === -1) {
            return;
        }
        const concatBuffer = Buffer.concat(this.#pendingMessage);
        let start = 0;
        let end = concatBuffer.indexOf('\0');
        while (end !== -1) {
            const message = concatBuffer.toString(undefined, start, end);
            setImmediate(() => {
                if (this.onmessage) {
                    this.onmessage.call(null, message);
                }
            });
            start = end + 1;
            end = concatBuffer.indexOf('\0', start);
        }
        if (start >= concatBuffer.length) {
            this.#pendingMessage = [];
        }
        else {
            this.#pendingMessage = [concatBuffer.subarray(start)];
        }
    }
    close() {
        this.#isClosed = true;
        this.#subscriptions.dispose();
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Describes a launcher - a class that is able to create and launch a browser instance.
 *
 * @public
 */
class BrowserLauncher {
    #browser;
    /**
     * @internal
     */
    puppeteer;
    /**
     * @internal
     */
    constructor(puppeteer, browser) {
        this.puppeteer = puppeteer;
        this.#browser = browser;
    }
    get browser() {
        return this.#browser;
    }
    async launch(options = {}) {
        const { dumpio = false, enableExtensions = false, env = process.env, handleSIGINT = true, handleSIGTERM = true, handleSIGHUP = true, acceptInsecureCerts = false, networkEnabled = true, issuesEnabled = true, defaultViewport = DEFAULT_VIEWPORT, downloadBehavior, slowMo = 0, timeout = 30000, waitForInitialPage = true, protocolTimeout, handleDevToolsAsPage, idGenerator = createIncrementalIdGenerator(), blocklist, allowlist, } = options;
        let { protocol } = options;
        // Default to 'webDriverBiDi' for Firefox.
        if (this.#browser === 'firefox' && protocol === undefined) {
            protocol = 'webDriverBiDi';
        }
        assertSupportedUrlRestrictions({
            allowlist,
            blocklist,
            protocol,
        });
        if (this.#browser === 'firefox' && protocol === 'cdp') {
            throw new Error('Connecting to Firefox using CDP is no longer supported');
        }
        const launchArgs = await this.computeLaunchArguments({
            ...options,
            protocol,
        });
        if (!existsSync(launchArgs.executablePath)) {
            throw new Error(`Browser was not found at the configured executablePath (${launchArgs.executablePath})`);
        }
        const usePipe = launchArgs.args.includes('--remote-debugging-pipe');
        const onProcessExit = async () => {
            await this.cleanUserDataDir(launchArgs.userDataDir, {
                isTemp: launchArgs.isTempUserDataDir,
            });
        };
        if (this.#browser === 'firefox' &&
            protocol === 'webDriverBiDi' &&
            usePipe) {
            throw new Error('Pipe connections are not supported with Firefox and WebDriver BiDi');
        }
        const browserProcess = launch({
            executablePath: launchArgs.executablePath,
            args: launchArgs.args,
            handleSIGHUP,
            handleSIGTERM,
            handleSIGINT,
            dumpio,
            env,
            pipe: usePipe,
            onExit: onProcessExit,
            signal: options.signal,
        });
        let browser;
        let cdpConnection;
        let closing = false;
        const browserCloseCallback = async () => {
            if (closing) {
                return;
            }
            closing = true;
            await this.closeBrowser(browserProcess, cdpConnection);
        };
        try {
            if (this.#browser === 'firefox') {
                browser = await this.createBiDiBrowser(browserProcess, browserCloseCallback, {
                    timeout,
                    protocolTimeout,
                    slowMo,
                    defaultViewport,
                    acceptInsecureCerts,
                    networkEnabled,
                    idGenerator,
                });
            }
            else {
                if (usePipe) {
                    cdpConnection = await this.createCdpPipeConnection(browserProcess, {
                        timeout,
                        protocolTimeout,
                        slowMo,
                        idGenerator,
                    });
                }
                else {
                    cdpConnection = await this.createCdpSocketConnection(browserProcess, {
                        timeout,
                        protocolTimeout,
                        slowMo,
                        idGenerator,
                    });
                }
                if (protocol === 'webDriverBiDi') {
                    browser = await this.createBiDiOverCdpBrowser(browserProcess, cdpConnection, browserCloseCallback, {
                        defaultViewport,
                        acceptInsecureCerts,
                        networkEnabled,
                        issuesEnabled,
                    });
                }
                else {
                    browser = await CdpBrowser._create(cdpConnection, [], acceptInsecureCerts, defaultViewport, downloadBehavior, browserProcess.nodeProcess, browserCloseCallback, options.targetFilter, undefined, undefined, networkEnabled, issuesEnabled, handleDevToolsAsPage, blocklist, allowlist);
                }
            }
        }
        catch (error) {
            void browserCloseCallback();
            const logs = browserProcess.getRecentLogs().join('\n');
            if (logs.includes('Failed to create a ProcessSingleton for your profile directory') ||
                // On Windows we will not get logs due to the singleton process handover. See
                // https://source.chromium.org/chromium/chromium/src/+/main:chrome/browser/process_singleton_win.cc;l=46;drc=fc7952f0422b5073515a205a04ec9c3a1ae81658
                (process.platform === 'win32' &&
                    existsSync(join(launchArgs.userDataDir, 'lockfile')))) {
                throw new Error(`The browser is already running for ${launchArgs.userDataDir}. Use a different \`userDataDir\` or stop the running browser first.`);
            }
            if (logs.includes('Missing X server') && options.headless === false) {
                throw new Error(`Missing X server to start the headful browser. Either set headless to true or use xvfb-run to run your Puppeteer script.`);
            }
            if (error instanceof TimeoutError) {
                throw new TimeoutError$1(error.message);
            }
            throw error;
        }
        if (Array.isArray(enableExtensions)) {
            if (this.#browser === 'chrome' && !usePipe) {
                throw new Error('To use `enableExtensions` with a list of paths in Chrome, you must be connected with `--remote-debugging-pipe` (`pipe: true`).');
            }
            await Promise.all([
                enableExtensions.map(path => {
                    return browser.installExtension(path);
                }),
            ]);
        }
        if (waitForInitialPage) {
            await this.waitForPageTarget(browser, timeout);
        }
        return browser;
    }
    /**
     * @internal
     */
    async closeBrowser(browserProcess, cdpConnection) {
        if (cdpConnection) {
            // Attempt to close the browser gracefully
            try {
                await cdpConnection.closeBrowser();
                await browserProcess.hasClosed();
            }
            catch (error) {
                debugError(error);
                await browserProcess.close();
            }
        }
        else {
            // Wait for a possible graceful shutdown.
            await firstValueFrom(race(from(browserProcess.hasClosed()), timer(5000).pipe(map(() => {
                return from(browserProcess.close());
            }))));
        }
    }
    /**
     * @internal
     */
    async waitForPageTarget(browser, timeout) {
        try {
            await browser.waitForTarget(t => {
                return t.type() === 'page';
            }, { timeout });
        }
        catch (error) {
            await browser.close();
            throw error;
        }
    }
    /**
     * @internal
     */
    async createCdpSocketConnection(browserProcess, opts) {
        const browserWSEndpoint = await browserProcess.waitForLineOutput(CDP_WEBSOCKET_ENDPOINT_REGEX, opts.timeout);
        const transport = await NodeWebSocketTransport.create(browserWSEndpoint);
        return new Connection(browserWSEndpoint, transport, opts.slowMo, opts.protocolTimeout, 
        /* rawErrors */ false, opts.idGenerator);
    }
    /**
     * @internal
     */
    async createCdpPipeConnection(browserProcess, opts) {
        // stdio was assigned during start(), and the 'pipe' option there adds the
        // 4th and 5th items to stdio array
        const { 3: pipeWrite, 4: pipeRead } = browserProcess.nodeProcess.stdio;
        const transport = new PipeTransport(pipeWrite, pipeRead);
        return new Connection('', transport, opts.slowMo, opts.protocolTimeout, 
        /* rawErrors */ false, opts.idGenerator);
    }
    /**
     * @internal
     */
    async createBiDiOverCdpBrowser(browserProcess, cdpConnection, closeCallback, opts) {
        const bidiOnly = process.env['PUPPETEER_WEBDRIVER_BIDI_ONLY'] === 'true';
        const BiDi = await import(/* webpackIgnore: true */ './chunk-053.mjs').then(n => n.b);
        const bidiConnection = await BiDi.connectBidiOverCdp(cdpConnection);
        return await BiDi.BidiBrowser.create({
            connection: bidiConnection,
            // Do not provide CDP connection to Browser, if BiDi-only mode is enabled. This
            // would restrict Browser to use only BiDi endpoint.
            cdpConnection: bidiOnly ? undefined : cdpConnection,
            closeCallback,
            process: browserProcess.nodeProcess,
            defaultViewport: opts.defaultViewport,
            acceptInsecureCerts: opts.acceptInsecureCerts,
            networkEnabled: opts.networkEnabled,
            issuesEnabled: opts.issuesEnabled,
        });
    }
    /**
     * @internal
     */
    async createBiDiBrowser(browserProcess, closeCallback, opts) {
        const browserWSEndpoint = (await browserProcess.waitForLineOutput(WEBDRIVER_BIDI_WEBSOCKET_ENDPOINT_REGEX, opts.timeout)) + '/session';
        const transport = await NodeWebSocketTransport.create(browserWSEndpoint);
        const BiDi = await import(/* webpackIgnore: true */ './chunk-053.mjs').then(n => n.b);
        const bidiConnection = new BiDi.BidiConnection(browserWSEndpoint, transport, opts.idGenerator, opts.slowMo, opts.protocolTimeout);
        return await BiDi.BidiBrowser.create({
            connection: bidiConnection,
            closeCallback,
            process: browserProcess.nodeProcess,
            defaultViewport: opts.defaultViewport,
            acceptInsecureCerts: opts.acceptInsecureCerts,
            networkEnabled: opts.networkEnabled ?? true,
            issuesEnabled: opts.issuesEnabled ?? true,
        });
    }
    /**
     * @internal
     */
    async getProfilePath() {
        const config = await this.puppeteer.configuration();
        return join(config.temporaryDirectory ?? tmpdir(), `puppeteer_dev_${this.browser}_profile-`);
    }
    /**
     * @internal
     */
    async resolveExecutablePath(headless, validatePath = true) {
        const config = await this.puppeteer.configuration();
        let executablePath = config.executablePath;
        if (executablePath) {
            if (validatePath && !existsSync(executablePath)) {
                throw new Error(`Tried to find the browser at the configured path (${executablePath}), but no executable was found.`);
            }
            return executablePath;
        }
        function puppeteerBrowserToInstalledBrowser(browser, headless) {
            switch (browser) {
                case 'chrome':
                    if (headless === 'shell') {
                        return Browser.CHROMEHEADLESSSHELL;
                    }
                    return Browser.CHROME;
                case 'firefox':
                    return Browser.FIREFOX;
            }
            return Browser.CHROME;
        }
        const browserType = puppeteerBrowserToInstalledBrowser(this.browser, headless);
        const defaultDownloadPath = await this.puppeteer.defaultDownloadPath();
        const browserVersion = await this.puppeteer.browserVersion();
        executablePath = computeExecutablePath({
            cacheDir: defaultDownloadPath,
            browser: browserType,
            buildId: browserVersion,
        });
        if (validatePath && !existsSync(executablePath)) {
            const configVersion = config?.[this.browser]?.version;
            if (configVersion) {
                throw new Error(`Tried to find the browser at the configured path (${executablePath}) for version ${configVersion}, but no executable was found.`);
            }
            switch (this.browser) {
                case 'chrome':
                    throw new Error(`Could not find Chrome (ver. ${browserVersion}). This can occur if either\n` +
                        ` 1. you did not perform an installation before running the script (e.g. \`npx puppeteer browsers install ${browserType}\`) or\n` +
                        ` 2. your cache path is incorrectly configured (which is: ${config.cacheDirectory}).\n` +
                        'For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.');
                case 'firefox':
                    throw new Error(`Could not find Firefox (rev. ${browserVersion}). This can occur if either\n` +
                        ' 1. you did not perform an installation for Firefox before running the script (e.g. `npx puppeteer browsers install firefox`) or\n' +
                        ` 2. your cache path is incorrectly configured (which is: ${config.cacheDirectory}).\n` +
                        'For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.');
            }
        }
        return executablePath;
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const rmOptions = {
    force: true,
    recursive: true,
    maxRetries: 5,
};
/**
 * @internal
 */
async function rm(path) {
    await fs.promises.rm(path, rmOptions);
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class ChromeLauncher extends BrowserLauncher {
    constructor(puppeteer) {
        super(puppeteer, 'chrome');
    }
    async launch(options = {}) {
        const config = await this.puppeteer.configuration();
        if (config.logLevel === 'warn' &&
            process.platform === 'darwin' &&
            process.arch === 'x64') {
            const cpus = os.cpus();
            if (cpus[0]?.model.includes('Apple')) {
                console.warn([
                    '\x1B[1m\x1B[43m\x1B[30m',
                    'Degraded performance warning:\x1B[0m\x1B[33m',
                    'Launching Chrome on Mac Silicon (arm64) from an x64 Node installation results in',
                    'Rosetta translating the Chrome binary, even if Chrome is already arm64. This would',
                    'result in huge performance issues. To resolve this, you must run Puppeteer with',
                    'a version of Node built for arm64.',
                ].join('\n  '));
            }
        }
        return await super.launch(options);
    }
    /**
     * @internal
     */
    async computeLaunchArguments(options = {}) {
        const { ignoreDefaultArgs = false, args = [], pipe = false, debuggingPort, channel, executablePath, } = options;
        const chromeArguments = [];
        if (!ignoreDefaultArgs) {
            chromeArguments.push(...this.defaultArgs(options));
        }
        else if (Array.isArray(ignoreDefaultArgs)) {
            chromeArguments.push(...this.defaultArgs(options).filter(arg => {
                return !ignoreDefaultArgs.includes(arg);
            }));
        }
        else {
            chromeArguments.push(...args);
        }
        if (!chromeArguments.some(argument => {
            return argument.startsWith('--remote-debugging-');
        })) {
            if (pipe) {
                assert(!debuggingPort, 'Browser should be launched with either pipe or debugging port - not both.');
                chromeArguments.push('--remote-debugging-pipe');
            }
            else {
                chromeArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
            }
        }
        let isTempUserDataDir = false;
        // Check for the user data dir argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        let userDataDirIndex = chromeArguments.findIndex(arg => {
            return arg.startsWith('--user-data-dir');
        });
        if (userDataDirIndex < 0) {
            isTempUserDataDir = true;
            chromeArguments.push(`--user-data-dir=${await mkdtemp(await this.getProfilePath())}`);
            userDataDirIndex = chromeArguments.length - 1;
        }
        const userDataDir = chromeArguments[userDataDirIndex].split('=', 2)[1];
        assert(typeof userDataDir === 'string', '`--user-data-dir` is malformed');
        let chromeExecutable = executablePath;
        if (!chromeExecutable) {
            assert(channel || !this.puppeteer._isPuppeteerCore, `An \`executablePath\` or \`channel\` must be specified for \`puppeteer-core\``);
            chromeExecutable = channel
                ? await this.executablePath(channel)
                : await this.resolveExecutablePath(options.headless ?? true);
        }
        return {
            executablePath: chromeExecutable,
            args: chromeArguments,
            isTempUserDataDir,
            userDataDir,
        };
    }
    /**
     * @internal
     */
    async cleanUserDataDir(path, opts) {
        if (opts.isTemp) {
            try {
                await rm(path);
            }
            catch (error) {
                debugError(error);
                throw error;
            }
        }
    }
    defaultArgs(options = {}) {
        // See https://github.com/GoogleChrome/chrome-launcher/blob/main/docs/chrome-flags-for-tools.md
        const userDisabledFeatures = getFeatures('--disable-features', options.args);
        if (options.args && userDisabledFeatures.length > 0) {
            removeMatchingFlags(options.args, '--disable-features');
        }
        const turnOnExperimentalFeaturesForTesting = process.env['PUPPETEER_TEST_EXPERIMENTAL_CHROME_FEATURES'] === 'true';
        const userEnabledFeatures = getFeatures('--enable-features', options.args);
        if (options.args && userEnabledFeatures.length > 0) {
            removeMatchingFlags(options.args, '--enable-features');
        }
        // Merge default enabled features with user-provided ones, if any.
        const enabledFeatures = [
            'PdfOopif',
            // Add features to enable by default here.
            ...userEnabledFeatures,
        ].filter(feature => {
            return feature !== '';
        });
        // Merge default disabled features with user-provided ones, if any.
        const disabledFeatures = [
            'Translate',
            // AcceptCHFrame disabled because of crbug.com/1348106.
            'AcceptCHFrame',
            'MediaRouter',
            'OptimizationHints',
            'WebUIReloadButton',
            ...(turnOnExperimentalFeaturesForTesting
                ? []
                : [
                    // https://crbug.com/1492053
                    'ProcessPerSiteUpToMainFrameThreshold',
                    // https://github.com/puppeteer/puppeteer/issues/10715
                    'IsolateSandboxedIframes',
                ]),
            ...userDisabledFeatures,
        ]
            .filter(feature => {
            return feature !== '';
        })
            .filter(disabledFeature => {
            return !enabledFeatures.includes(disabledFeature);
        });
        const chromeArguments = [
            '--allow-pre-commit-input',
            '--disable-background-networking',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-client-side-phishing-detection',
            '--disable-component-extensions-with-background-pages',
            '--disable-crash-reporter', // No crash reporting in CfT.
            '--disable-default-apps',
            '--disable-dev-shm-usage',
            '--disable-hang-monitor',
            '--disable-infobars',
            '--disable-ipc-flooding-protection',
            '--disable-popup-blocking',
            '--disable-prompt-on-repost',
            '--disable-renderer-backgrounding',
            '--disable-search-engine-choice-screen',
            '--disable-sync',
            '--enable-automation',
            '--export-tagged-pdf',
            '--force-color-profile=srgb',
            '--generate-pdf-document-outline',
            '--metrics-recording-only',
            '--no-first-run',
            '--password-store=basic',
            '--use-mock-keychain',
            `--disable-features=${disabledFeatures.join(',')}`,
            `--enable-features=${enabledFeatures.join(',')}`,
        ].filter(arg => {
            return arg !== '';
        });
        const { devtools = false, headless = !devtools, args = [], userDataDir, enableExtensions = false, } = options;
        if (process.env['PUPPETEER_DANGEROUS_NO_SANDBOX'] === 'true' &&
            !args.includes('--no-sandbox')) {
            chromeArguments.push('--no-sandbox');
        }
        if (userDataDir) {
            // If absolute (for any platform) path is given, we should not resolve it.
            chromeArguments.push(`--user-data-dir=${path__default.posix.isAbsolute(userDataDir) || path__default.win32.isAbsolute(userDataDir) ? userDataDir : path__default.resolve(userDataDir)}`);
        }
        if (devtools) {
            chromeArguments.push('--auto-open-devtools-for-tabs');
        }
        if (headless) {
            chromeArguments.push(headless === 'shell' ? '--headless' : '--headless=new', '--hide-scrollbars', '--mute-audio');
        }
        chromeArguments.push(enableExtensions
            ? '--enable-unsafe-extension-debugging'
            : '--disable-extensions');
        if (args.every(arg => {
            return arg.startsWith('-');
        })) {
            chromeArguments.push('about:blank');
        }
        chromeArguments.push(...args);
        return chromeArguments;
    }
    async executablePath(channel, validatePath = true) {
        if (channel) {
            return computeSystemExecutablePath({
                browser: Browser.CHROME,
                channel: convertPuppeteerChannelToBrowsersChannel(channel),
            });
        }
        else {
            return await this.resolveExecutablePath(undefined, validatePath);
        }
    }
}
/**
 * Extracts all features from the given command-line flag
 * (e.g. `--enable-features`, `--enable-features=`).
 *
 * Example input:
 * ["--enable-features=NetworkService,NetworkServiceInProcess", "--enable-features=Foo"]
 *
 * Example output:
 * ["NetworkService", "NetworkServiceInProcess", "Foo"]
 *
 * @internal
 */
function getFeatures(flag, options = []) {
    const prefix = flag.endsWith('=') ? flag : `${flag}=`;
    return options
        .filter(s => {
        return s.startsWith(prefix);
    })
        .flatMap(s => {
        return s
            .substring(s.indexOf('=') + 1)
            .trim()
            .split(',')
            .map(feature => {
            return feature.trim();
        });
    })
        .filter(s => {
        return s;
    });
}
/**
 * Removes all elements in-place from the given string array
 * that match the given command-line flag.
 *
 * @internal
 */
function removeMatchingFlags(array, flag) {
    const prefix = flag.endsWith('=') ? flag : `${flag}=`;
    let i = 0;
    while (i < array.length) {
        if (array[i].startsWith(prefix)) {
            array.splice(i, 1);
        }
        else {
            i++;
        }
    }
    return array;
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class FirefoxLauncher extends BrowserLauncher {
    constructor(puppeteer) {
        super(puppeteer, 'firefox');
    }
    static getPreferences(extraPrefsFirefox) {
        return {
            ...extraPrefsFirefox,
            // Force all web content to use a single content process. TODO: remove
            // this once Firefox supports mouse event dispatch from the main frame
            // context. See https://bugzilla.mozilla.org/show_bug.cgi?id=1773393.
            'fission.webContentIsolationStrategy': 0,
        };
    }
    /**
     * @internal
     */
    async computeLaunchArguments(options = {}) {
        const { ignoreDefaultArgs = false, args = [], executablePath, pipe = false, extraPrefsFirefox = {}, debuggingPort = null, } = options;
        const firefoxArguments = [];
        if (!ignoreDefaultArgs) {
            firefoxArguments.push(...this.defaultArgs(options));
        }
        else if (Array.isArray(ignoreDefaultArgs)) {
            firefoxArguments.push(...this.defaultArgs(options).filter(arg => {
                return !ignoreDefaultArgs.includes(arg);
            }));
        }
        else {
            firefoxArguments.push(...args);
        }
        if (!firefoxArguments.some(argument => {
            return argument.startsWith('--remote-debugging-');
        })) {
            if (pipe) {
                assert(debuggingPort === null, 'Browser should be launched with either pipe or debugging port - not both.');
            }
            firefoxArguments.push(`--remote-debugging-port=${debuggingPort || 0}`);
        }
        let userDataDir;
        let isTempUserDataDir = true;
        // Check for the profile argument, which will always be set even
        // with a custom directory specified via the userDataDir option.
        const profileArgIndex = firefoxArguments.findIndex(arg => {
            return ['-profile', '--profile'].includes(arg);
        });
        if (profileArgIndex !== -1) {
            userDataDir = firefoxArguments[profileArgIndex + 1];
            if (!userDataDir) {
                throw new Error(`Missing value for profile command line argument`);
            }
            // When using a custom Firefox profile it needs to be populated
            // with required preferences.
            isTempUserDataDir = false;
        }
        else {
            const profilePath = await this.getProfilePath();
            userDataDir = await mkdtemp(profilePath);
            firefoxArguments.push('--profile');
            firefoxArguments.push(userDataDir);
        }
        await createProfile(Browser.FIREFOX, {
            path: userDataDir,
            preferences: FirefoxLauncher.getPreferences(extraPrefsFirefox),
        });
        let firefoxExecutable;
        if (this.puppeteer._isPuppeteerCore || executablePath) {
            assert(executablePath, `An \`executablePath\` must be specified for \`puppeteer-core\``);
            firefoxExecutable = executablePath;
        }
        else {
            firefoxExecutable = await this.executablePath(undefined);
        }
        return {
            isTempUserDataDir,
            userDataDir,
            args: firefoxArguments,
            executablePath: firefoxExecutable,
        };
    }
    /**
     * @internal
     */
    async cleanUserDataDir(userDataDir, opts) {
        if (opts.isTemp) {
            try {
                await rm(userDataDir);
            }
            catch (error) {
                debugError(error);
                throw error;
            }
        }
        else {
            try {
                const backupSuffix = '.puppeteer';
                const backupFiles = ['prefs.js', 'user.js'];
                const results = await Promise.allSettled(backupFiles.map(async (file) => {
                    const prefsBackupPath = path__default.join(userDataDir, file + backupSuffix);
                    if (fs.existsSync(prefsBackupPath)) {
                        const prefsPath = path__default.join(userDataDir, file);
                        await unlink(prefsPath);
                        await rename(prefsBackupPath, prefsPath);
                    }
                }));
                for (const result of results) {
                    if (result.status === 'rejected') {
                        throw result.reason;
                    }
                }
            }
            catch (error) {
                debugError(error);
            }
        }
    }
    async executablePath(_, validatePath = true) {
        return await this.resolveExecutablePath(undefined, 
        /* validatePath=*/ validatePath);
    }
    defaultArgs(options = {}) {
        const { devtools = false, headless = !devtools, args = [], userDataDir = null, } = options;
        const firefoxArguments = [];
        switch (os.platform()) {
            case 'darwin':
                firefoxArguments.push('--foreground');
                break;
            case 'win32':
                firefoxArguments.push('--wait-for-browser');
                break;
        }
        if (userDataDir) {
            firefoxArguments.push('--profile');
            firefoxArguments.push(userDataDir);
        }
        if (headless) {
            firefoxArguments.push('--headless');
        }
        if (devtools) {
            firefoxArguments.push('--devtools');
        }
        if (args.every(arg => {
            return arg.startsWith('-');
        })) {
            firefoxArguments.push('about:blank');
        }
        firefoxArguments.push(...args);
        return firefoxArguments;
    }
}

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Extends the main {@link Puppeteer} class with Node specific behaviour for
 * fetching and downloading browsers.
 *
 * If you're using Puppeteer in a Node environment, this is the class you'll get
 * when you run `require('puppeteer')` (or the equivalent ES `import`).
 *
 * @remarks
 * The most common method to use is {@link PuppeteerNode.launch | launch}, which
 * is used to launch and connect to a new browser instance.
 *
 * See {@link Puppeteer | the main Puppeteer class} for methods common to all
 * environments, such as {@link Puppeteer.connect}.
 *
 * @example
 * The following is a typical example of using Puppeteer to drive automation:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * await page.goto('https://www.google.com');
 * // other actions...
 * await browser.close();
 * ```
 *
 * Once you have created a `page` you have access to a large API to interact
 * with the page, navigate, or find certain elements in that page.
 * The {@link Page | `page` documentation} lists all the available methods.
 *
 * @public
 */
class PuppeteerNode extends Puppeteer {
    #launcher;
    #lastLaunchedBrowser;
    configuration;
    /**
     * @internal
     */
    constructor(settings) {
        const { configuration, ...commonSettings } = settings;
        super(commonSettings);
        if (configuration) {
            this.configuration = configuration;
        }
        else {
            this.configuration = () => {
                return Promise.resolve({});
            };
        }
        this.connect = this.connect.bind(this);
        this.launch = this.launch.bind(this);
        this.executablePath = this.executablePath.bind(this);
        this.defaultArgs = this.defaultArgs.bind(this);
        this.trimCache = this.trimCache.bind(this);
    }
    /**
     * This method attaches Puppeteer to an existing browser instance.
     *
     * @param options - Set of configurable options to set on the browser.
     * @returns Promise which resolves to browser instance.
     */
    connect(options) {
        return super.connect(options);
    }
    /**
     * Launches a browser instance with given arguments and options when
     * specified.
     *
     * When using with `puppeteer-core`,
     * {@link LaunchOptions.executablePath | options.executablePath} or
     * {@link LaunchOptions.channel | options.channel} must be provided.
     *
     * @example
     * You can use {@link LaunchOptions.ignoreDefaultArgs | options.ignoreDefaultArgs}
     * to filter out `--mute-audio` from default arguments:
     *
     * ```ts
     * const browser = await puppeteer.launch({
     *   ignoreDefaultArgs: ['--mute-audio'],
     * });
     * ```
     *
     * @remarks
     * Puppeteer can also be used to control the Chrome browser, but it works best
     * with the version of Chrome for Testing downloaded by default.
     * There is no guarantee it will work with any other version. If Google Chrome
     * (rather than Chrome for Testing) is preferred, a
     * {@link https://www.google.com/chrome/browser/canary.html | Chrome Canary}
     * or
     * {@link https://www.chromium.org/getting-involved/dev-channel | Dev Channel}
     * build is suggested. See
     * {@link https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/ | this article}
     * for a description of the differences between Chromium and Chrome.
     * {@link https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md | This article}
     * describes some differences for Linux users. See
     * {@link https://developer.chrome.com/blog/chrome-for-testing/ | this doc} for the description
     * of Chrome for Testing.
     *
     * @param options - Options to configure launching behavior.
     */
    async launch(options = {}) {
        const { browser = await this.defaultBrowser() } = options;
        this.#lastLaunchedBrowser = browser;
        if (!['chrome', 'firefox'].includes(browser)) {
            throw new Error(`Unknown product: ${browser}`);
        }
        this.#launcher = this.#getLauncher(browser);
        return await this.#launcher.launch(options);
    }
    /**
     * @internal
     */
    #getLauncher(browser) {
        if (this.#launcher && this.#launcher.browser === browser) {
            return this.#launcher;
        }
        switch (browser) {
            case 'chrome':
                return new ChromeLauncher(this);
            case 'firefox':
                return new FirefoxLauncher(this);
            default:
                throw new Error(`Unknown product: ${browser}`);
        }
    }
    async executablePath(optsOrChannel) {
        if (optsOrChannel === undefined) {
            return await this.#getLauncher(await this.lastLaunchedBrowser()).executablePath(undefined, /* validatePath= */ false);
        }
        if (typeof optsOrChannel === 'string') {
            return await this.#getLauncher('chrome').executablePath(optsOrChannel, 
            /* validatePath= */ false);
        }
        return await this.#getLauncher(optsOrChannel.browser ?? (await this.lastLaunchedBrowser())).resolveExecutablePath(optsOrChannel.headless, /* validatePath= */ false);
    }
    /**
     * @internal
     */
    async browserVersion() {
        const config = await this.configuration();
        const lastLaunched = await this.lastLaunchedBrowser();
        return config?.[lastLaunched]?.version ?? PUPPETEER_REVISIONS[lastLaunched];
    }
    /**
     * The default download path for puppeteer. For puppeteer-core, this
     * code should never be called as it is never defined.
     *
     * @internal
     */
    async defaultDownloadPath() {
        const config = await this.configuration();
        return config.cacheDirectory;
    }
    /**
     * The name of the browser that was last launched.
     */
    async lastLaunchedBrowser() {
        return this.#lastLaunchedBrowser ?? (await this.defaultBrowser());
    }
    /**
     * The name of the browser that will be launched by default. For
     * `puppeteer`, this is influenced by your configuration. Otherwise, it's
     * `chrome`.
     */
    async defaultBrowser() {
        const config = await this.configuration();
        return config.defaultBrowser ?? 'chrome';
    }
    /**
     * @param options - Set of configurable options to set on the browser.
     *
     * @returns The default arguments that the browser will be launched with.
     */
    async defaultArgs(options = {}) {
        return this.#getLauncher(options.browser ?? (await this.lastLaunchedBrowser())).defaultArgs(options);
    }
    /**
     * Removes all non-current Firefox and Chrome binaries in the cache directory
     * identified by the provided Puppeteer configuration. The current browser
     * version is determined by resolving PUPPETEER_REVISIONS from Puppeteer
     * unless `configuration.browserRevision` is provided.
     *
     * @remarks
     *
     * Note that the method does not check if any other Puppeteer versions
     * installed on the host that use the same cache directory require the
     * non-current binaries.
     *
     * @public
     */
    async trimCache() {
        const platform = detectBrowserPlatform();
        if (!platform) {
            throw new Error('The current platform is not supported.');
        }
        const config = await this.configuration();
        const cacheDir = config.cacheDirectory;
        const installedBrowsers = await getInstalledBrowsers({
            cacheDir,
        });
        const puppeteerBrowsers = [
            {
                product: 'chrome',
                browser: Browser.CHROME,
                currentBuildId: '',
            },
            {
                product: 'firefox',
                browser: Browser.FIREFOX,
                currentBuildId: '',
            },
        ];
        // Resolve current buildIds.
        await Promise.all(puppeteerBrowsers.map(async (item) => {
            const tag = config?.[item.product]?.version ?? PUPPETEER_REVISIONS[item.product];
            item.currentBuildId = await resolveBuildId(item.browser, platform, tag);
        }));
        const currentBrowserBuilds = new Set(puppeteerBrowsers.map(browser => {
            return `${browser.browser}_${browser.currentBuildId}`;
        }));
        const currentBrowsers = new Set(puppeteerBrowsers.map(browser => {
            return browser.browser;
        }));
        for (const installedBrowser of installedBrowsers) {
            // Don't uninstall browsers that are not managed by Puppeteer yet.
            if (!currentBrowsers.has(installedBrowser.browser)) {
                continue;
            }
            // Keep the browser build used by the current Puppeteer installation.
            if (currentBrowserBuilds.has(`${installedBrowser.browser}_${installedBrowser.buildId}`)) {
                continue;
            }
            await uninstall({
                browser: installedBrowser.browser,
                platform,
                cacheDir,
                buildId: installedBrowser.buildId,
            });
        }
    }
}

export { PuppeteerNode as P };
