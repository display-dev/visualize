// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import fs, { createReadStream } from 'node:fs';
import os from 'node:os';
import * as path from 'node:path';
import path__default from 'node:path';
import { a as BrowserPlatform, g as getJSON, B as Browser, r as resolveDownloadUrl$1, c as resolveDownloadUrl$2, d as resolveDownloadUrl$3, e as resolveDownloadUrl$4, f as resolveDownloadPath$1, h as resolveDownloadPath$2, i as resolveDownloadPath$3, j as resolveDownloadPath$4, k as relativeExecutablePath$1, l as relativeExecutablePath$2, m as relativeExecutablePath$3, n as relativeExecutablePath$4, o as compareVersions$1, p as compareVersions$2, b as BrowserTag, q as resolveBuildId$2, s as resolveBuildId$3, C as ChromeReleaseChannel, t as resolveSystemExecutablePaths$1, u as resolveDefaultUserDataDir$1 } from './chunk-008.mjs';
import { execFile, spawnSync, spawn } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import { Stream } from 'node:stream';
import { promisify } from 'node:util';
import { h as debugModule } from './chunk-000.mjs';

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
function getFormat(buildId) {
    const majorVersion = Number(buildId.split('.').shift());
    return majorVersion >= 135 ? 'xz' : 'bz2';
}
function archiveNightly(platform, buildId) {
    switch (platform) {
        case BrowserPlatform.LINUX:
            return `firefox-${buildId}.en-US.linux-x86_64.tar.${getFormat(buildId)}`;
        case BrowserPlatform.LINUX_ARM:
            return `firefox-${buildId}.en-US.linux-aarch64.tar.${getFormat(buildId)}`;
        case BrowserPlatform.MAC_ARM:
        case BrowserPlatform.MAC:
            return `firefox-${buildId}.en-US.mac.dmg`;
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return `firefox-${buildId}.en-US.${platform}.zip`;
    }
}
function archive(platform, buildId) {
    switch (platform) {
        case BrowserPlatform.LINUX_ARM:
        case BrowserPlatform.LINUX:
            return `firefox-${buildId}.tar.${getFormat(buildId)}`;
        case BrowserPlatform.MAC_ARM:
        case BrowserPlatform.MAC:
            return `Firefox ${buildId}.dmg`;
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return `Firefox Setup ${buildId}.exe`;
    }
}
function platformName(platform) {
    switch (platform) {
        case BrowserPlatform.LINUX:
            return `linux-x86_64`;
        case BrowserPlatform.LINUX_ARM:
            return `linux-aarch64`;
        case BrowserPlatform.MAC_ARM:
        case BrowserPlatform.MAC:
            return `mac`;
        case BrowserPlatform.WIN32:
        case BrowserPlatform.WIN64:
            return platform;
    }
}
function parseBuildId(buildId) {
    for (const value of Object.values(FirefoxChannel)) {
        if (buildId.startsWith(value + '_')) {
            buildId = buildId.substring(value.length + 1);
            return [value, buildId];
        }
    }
    // Older versions do not have channel as the prefix.«
    return [FirefoxChannel.NIGHTLY, buildId];
}
function resolveDownloadUrl(platform, buildId, baseUrl) {
    const [channel] = parseBuildId(buildId);
    switch (channel) {
        case FirefoxChannel.NIGHTLY:
            baseUrl ??=
                'https://archive.mozilla.org/pub/firefox/nightly/latest-mozilla-central';
            break;
        case FirefoxChannel.DEVEDITION:
            baseUrl ??= 'https://archive.mozilla.org/pub/devedition/releases';
            break;
        case FirefoxChannel.BETA:
        case FirefoxChannel.STABLE:
        case FirefoxChannel.ESR:
            baseUrl ??= 'https://archive.mozilla.org/pub/firefox/releases';
            break;
    }
    return `${baseUrl}/${resolveDownloadPath(platform, buildId).join('/')}`;
}
function resolveDownloadPath(platform, buildId) {
    const [channel, resolvedBuildId] = parseBuildId(buildId);
    switch (channel) {
        case FirefoxChannel.NIGHTLY:
            return [archiveNightly(platform, resolvedBuildId)];
        case FirefoxChannel.DEVEDITION:
        case FirefoxChannel.BETA:
        case FirefoxChannel.STABLE:
        case FirefoxChannel.ESR:
            return [
                resolvedBuildId,
                platformName(platform),
                'en-US',
                archive(platform, resolvedBuildId),
            ];
    }
}
function relativeExecutablePath(platform, buildId) {
    const [channel] = parseBuildId(buildId);
    switch (channel) {
        case FirefoxChannel.NIGHTLY:
            switch (platform) {
                case BrowserPlatform.MAC_ARM:
                case BrowserPlatform.MAC:
                    return path__default.join('Firefox Nightly.app', 'Contents', 'MacOS', 'firefox');
                case BrowserPlatform.LINUX_ARM:
                case BrowserPlatform.LINUX:
                    return path__default.join('firefox', 'firefox');
                case BrowserPlatform.WIN32:
                case BrowserPlatform.WIN64:
                    return path__default.join('firefox', 'firefox.exe');
            }
        case FirefoxChannel.BETA:
        case FirefoxChannel.DEVEDITION:
        case FirefoxChannel.ESR:
        case FirefoxChannel.STABLE:
            switch (platform) {
                case BrowserPlatform.MAC_ARM:
                case BrowserPlatform.MAC:
                    return path__default.join('Firefox.app', 'Contents', 'MacOS', 'firefox');
                case BrowserPlatform.LINUX_ARM:
                case BrowserPlatform.LINUX:
                    return path__default.join('firefox', 'firefox');
                case BrowserPlatform.WIN32:
                case BrowserPlatform.WIN64:
                    return path__default.join('core', 'firefox.exe');
            }
    }
}
var FirefoxChannel;
(function (FirefoxChannel) {
    FirefoxChannel["STABLE"] = "stable";
    FirefoxChannel["ESR"] = "esr";
    FirefoxChannel["DEVEDITION"] = "devedition";
    FirefoxChannel["BETA"] = "beta";
    FirefoxChannel["NIGHTLY"] = "nightly";
})(FirefoxChannel || (FirefoxChannel = {}));
let baseVersionUrl = 'https://product-details.mozilla.org/1.0';
async function resolveBuildId$1(channel = FirefoxChannel.NIGHTLY) {
    const channelToVersionKey = {
        [FirefoxChannel.ESR]: 'FIREFOX_ESR',
        [FirefoxChannel.STABLE]: 'LATEST_FIREFOX_VERSION',
        [FirefoxChannel.DEVEDITION]: 'FIREFOX_DEVEDITION',
        [FirefoxChannel.BETA]: 'FIREFOX_DEVEDITION',
        [FirefoxChannel.NIGHTLY]: 'FIREFOX_NIGHTLY',
    };
    const versions = (await getJSON(new URL(`${baseVersionUrl}/firefox_versions.json`)));
    const version = versions[channelToVersionKey[channel]];
    if (!version) {
        throw new Error(`Channel ${channel} is not found.`);
    }
    return channel + '_' + version;
}
async function createProfile$1(options) {
    if (!fs.existsSync(options.path)) {
        await fs.promises.mkdir(options.path, {
            recursive: true,
        });
    }
    await syncPreferences({
        preferences: {
            ...defaultProfilePreferences(options.preferences),
            ...options.preferences,
        },
        path: options.path,
    });
}
function defaultProfilePreferences(extraPrefs) {
    const server = 'dummy.test';
    const defaultPrefs = {
        // Make sure Shield doesn't hit the network.
        'app.normandy.api_url': '',
        // Disable Firefox old build background check
        'app.update.checkInstallTime': false,
        // Disable automatically upgrading Firefox
        'app.update.disabledForTesting': true,
        // Increase the APZ content response timeout to 1 minute
        'apz.content_response_timeout': 60000,
        // Prevent various error message on the console
        // jest-puppeteer asserts that no error message is emitted by the console
        'browser.contentblocking.features.standard': '-tp,tpPrivate,cookieBehavior0,-cryptoTP,-fp',
        // Enable the dump function: which sends messages to the system
        // console
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1543115
        'browser.dom.window.dump.enabled': true,
        // Disable topstories
        'browser.newtabpage.activity-stream.feeds.system.topstories': false,
        // Always display a blank page
        'browser.newtabpage.enabled': false,
        // Background thumbnails in particular cause grief: and disabling
        // thumbnails in general cannot hurt
        'browser.pagethumbnails.capturing_disabled': true,
        // Disable safebrowsing components.
        'browser.safebrowsing.blockedURIs.enabled': false,
        'browser.safebrowsing.downloads.enabled': false,
        'browser.safebrowsing.malware.enabled': false,
        'browser.safebrowsing.phishing.enabled': false,
        // Disable updates to search engines.
        'browser.search.update': false,
        // Do not restore the last open set of tabs if the browser has crashed
        'browser.sessionstore.resume_from_crash': false,
        // Skip check for default browser on startup
        'browser.shell.checkDefaultBrowser': false,
        // Disable newtabpage
        'browser.startup.homepage': 'about:blank',
        // Do not redirect user when a milstone upgrade of Firefox is detected
        'browser.startup.homepage_override.mstone': 'ignore',
        // Start with a blank page about:blank
        'browser.startup.page': 0,
        // Do not allow background tabs to be zombified on Android: otherwise for
        // tests that open additional tabs: the test harness tab itself might get
        // unloaded
        'browser.tabs.disableBackgroundZombification': false,
        // Do not warn when closing all other open tabs
        'browser.tabs.warnOnCloseOtherTabs': false,
        // Do not warn when multiple tabs will be opened
        'browser.tabs.warnOnOpen': false,
        // Do not automatically offer translations, as tests do not expect this.
        'browser.translations.automaticallyPopup': false,
        // Disable the UI tour.
        'browser.uitour.enabled': false,
        // Turn off search suggestions in the location bar so as not to trigger
        // network connections.
        'browser.urlbar.suggest.searches': false,
        // Disable first run splash page on Windows 10
        'browser.usedOnWindows10.introURL': '',
        // Do not warn on quitting Firefox
        'browser.warnOnQuit': false,
        // Defensively disable data reporting systems
        'datareporting.healthreport.documentServerURI': `http://${server}/dummy/healthreport/`,
        'datareporting.healthreport.logging.consoleEnabled': false,
        'datareporting.healthreport.service.enabled': false,
        'datareporting.healthreport.service.firstRun': false,
        'datareporting.healthreport.uploadEnabled': false,
        // Do not show datareporting policy notifications which can interfere with tests
        'datareporting.policy.dataSubmissionEnabled': false,
        'datareporting.policy.dataSubmissionPolicyBypassNotification': true,
        // DevTools JSONViewer sometimes fails to load dependencies with its require.js.
        // This doesn't affect Puppeteer but spams console (Bug 1424372)
        'devtools.jsonview.enabled': false,
        // Disable popup-blocker
        'dom.disable_open_during_load': false,
        // Enable the support for File object creation in the content process
        // Required for |Page.setFileInputFiles| protocol method.
        'dom.file.createInChild': true,
        // Disable the ProcessHangMonitor
        'dom.ipc.reportProcessHangs': false,
        // Disable slow script dialogues
        'dom.max_chrome_script_run_time': 0,
        'dom.max_script_run_time': 0,
        // Only load extensions from the application and user profile
        // AddonManager.SCOPE_PROFILE + AddonManager.SCOPE_APPLICATION
        'extensions.autoDisableScopes': 0,
        'extensions.enabledScopes': 5,
        // Disable metadata caching for installed add-ons by default
        'extensions.getAddons.cache.enabled': false,
        // Disable installing any distribution extensions or add-ons.
        'extensions.installDistroAddons': false,
        // Turn off extension updates so they do not bother tests
        'extensions.update.enabled': false,
        // Turn off extension updates so they do not bother tests
        'extensions.update.notifyUser': false,
        // Make sure opening about:addons will not hit the network
        'extensions.webservice.discoverURL': `http://${server}/dummy/discoveryURL`,
        // Allow the application to have focus even it runs in the background
        'focusmanager.testmode': true,
        // Disable useragent updates
        'general.useragent.updates.enabled': false,
        // Always use network provider for geolocation tests so we bypass the
        // macOS dialog raised by the corelocation provider
        'geo.provider.testing': true,
        // Do not scan Wifi
        'geo.wifi.scan': false,
        // No hang monitor
        'hangmonitor.timeout': 0,
        // Show chrome errors and warnings in the error console
        'javascript.options.showInConsole': true,
        // Disable download and usage of OpenH264: and Widevine plugins
        'media.gmp-manager.updateEnabled': false,
        // Disable the GFX sanity window
        'media.sanity-test.disabled': true,
        // Disable experimental feature that is only available in Nightly
        'network.cookie.sameSite.laxByDefault': false,
        // Do not prompt for temporary redirects
        'network.http.prompt-temp-redirect': false,
        // Disable speculative connections so they are not reported as leaking
        // when they are hanging around
        'network.http.speculative-parallel-limit': 0,
        // Do not automatically switch between offline and online
        'network.manage-offline-status': false,
        // Make sure SNTP requests do not hit the network
        'network.sntp.pools': server,
        // Disable Flash.
        'plugin.state.flash': 0,
        'privacy.trackingprotection.enabled': false,
        // Can be removed once Firefox 89 is no longer supported
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1710839
        'remote.enabled': true,
        // Until Bug 1999693 is resolved, this preference needs to be set to allow
        // Webdriver BiDi to automatically dismiss file pickers.
        'remote.bidi.dismiss_file_pickers.enabled': true,
        // Disabled screenshots component
        'screenshots.browser.component.enabled': false,
        // Don't do network connections for mitm priming
        'security.certerrors.mitm.priming.enabled': false,
        // Local documents have access to all other local documents,
        // including directory listings
        'security.fileuri.strict_origin_policy': false,
        // Do not wait for the notification button security delay
        'security.notification_enable_delay': 0,
        // Ensure blocklist updates do not hit the network
        'services.settings.server': `http://${server}/dummy/blocklist/`,
        // Do not automatically fill sign-in forms with known usernames and
        // passwords
        'signon.autofillForms': false,
        // Disable password capture, so that tests that include forms are not
        // influenced by the presence of the persistent doorhanger notification
        'signon.rememberSignons': false,
        // Disable first-run welcome page
        'startup.homepage_welcome_url': 'about:blank',
        // Disable first-run welcome page
        'startup.homepage_welcome_url.additional': '',
        // Disable browser animations (tabs, fullscreen, sliding alerts)
        'toolkit.cosmeticAnimations.enabled': false,
        // Prevent starting into safe mode after application crashes
        'toolkit.startup.max_resumed_crashes': -1,
    };
    return Object.assign(defaultPrefs, extraPrefs);
}
async function backupFile(input) {
    if (!fs.existsSync(input)) {
        return;
    }
    await fs.promises.copyFile(input, input + '.puppeteer');
}
/**
 * Populates the user.js file with custom preferences as needed to allow
 * Firefox's support to properly function. These preferences will be
 * automatically copied over to prefs.js during startup of Firefox. To be
 * able to restore the original values of preferences a backup of prefs.js
 * will be created.
 */
async function syncPreferences(options) {
    const prefsPath = path__default.join(options.path, 'prefs.js');
    const userPath = path__default.join(options.path, 'user.js');
    const lines = Object.entries(options.preferences).map(([key, value]) => {
        return `user_pref(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
    });
    // Use allSettled to prevent corruption.
    const result = await Promise.allSettled([
        backupFile(userPath).then(async () => {
            await fs.promises.writeFile(userPath, lines.join('\n'));
        }),
        backupFile(prefsPath),
    ]);
    for (const command of result) {
        if (command.status === 'rejected') {
            throw command.reason;
        }
    }
}
function compareVersions(a, b) {
    // TODO: this is a not very reliable check.
    return parseInt(a.replace('.', ''), 16) - parseInt(b.replace('.', ''), 16);
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const downloadUrls = {
    [Browser.CHROMEDRIVER]: resolveDownloadUrl$4,
    [Browser.CHROMEHEADLESSSHELL]: resolveDownloadUrl$3,
    [Browser.CHROME]: resolveDownloadUrl$2,
    [Browser.CHROMIUM]: resolveDownloadUrl$1,
    [Browser.FIREFOX]: resolveDownloadUrl,
};
({
    [Browser.CHROMEDRIVER]: resolveDownloadPath$4,
    [Browser.CHROMEHEADLESSSHELL]: resolveDownloadPath$3,
    [Browser.CHROME]: resolveDownloadPath$2,
    [Browser.CHROMIUM]: resolveDownloadPath$1,
    [Browser.FIREFOX]: resolveDownloadPath,
});
const executablePathByBrowser = {
    [Browser.CHROMEDRIVER]: relativeExecutablePath$4,
    [Browser.CHROMEHEADLESSSHELL]: relativeExecutablePath$3,
    [Browser.CHROME]: relativeExecutablePath$2,
    [Browser.CHROMIUM]: relativeExecutablePath$1,
    [Browser.FIREFOX]: relativeExecutablePath,
};
const versionComparators = {
    [Browser.CHROMEDRIVER]: compareVersions$2,
    [Browser.CHROMEHEADLESSSHELL]: compareVersions$2,
    [Browser.CHROME]: compareVersions$2,
    [Browser.CHROMIUM]: compareVersions$1,
    [Browser.FIREFOX]: compareVersions,
};
/**
 * @internal
 */
async function resolveBuildIdForBrowserTag(browser, platform, tag) {
    switch (browser) {
        case Browser.FIREFOX:
            switch (tag) {
                case BrowserTag.LATEST:
                    return await resolveBuildId$1(FirefoxChannel.NIGHTLY);
                case BrowserTag.BETA:
                    return await resolveBuildId$1(FirefoxChannel.BETA);
                case BrowserTag.NIGHTLY:
                    return await resolveBuildId$1(FirefoxChannel.NIGHTLY);
                case BrowserTag.DEVEDITION:
                    return await resolveBuildId$1(FirefoxChannel.DEVEDITION);
                case BrowserTag.STABLE:
                    return await resolveBuildId$1(FirefoxChannel.STABLE);
                case BrowserTag.ESR:
                    return await resolveBuildId$1(FirefoxChannel.ESR);
                case BrowserTag.CANARY:
                case BrowserTag.DEV:
                    throw new Error(`${tag.toUpperCase()} is not available for Firefox`);
            }
        case Browser.CHROME: {
            switch (tag) {
                case BrowserTag.LATEST:
                    return await resolveBuildId$2(ChromeReleaseChannel.CANARY);
                case BrowserTag.BETA:
                    return await resolveBuildId$2(ChromeReleaseChannel.BETA);
                case BrowserTag.CANARY:
                    return await resolveBuildId$2(ChromeReleaseChannel.CANARY);
                case BrowserTag.DEV:
                    return await resolveBuildId$2(ChromeReleaseChannel.DEV);
                case BrowserTag.STABLE:
                    return await resolveBuildId$2(ChromeReleaseChannel.STABLE);
                case BrowserTag.NIGHTLY:
                case BrowserTag.DEVEDITION:
                case BrowserTag.ESR:
                    throw new Error(`${tag.toUpperCase()} is not available for Chrome`);
            }
        }
        case Browser.CHROMEDRIVER: {
            switch (tag) {
                case BrowserTag.LATEST:
                case BrowserTag.CANARY:
                    return await resolveBuildId$2(ChromeReleaseChannel.CANARY);
                case BrowserTag.BETA:
                    return await resolveBuildId$2(ChromeReleaseChannel.BETA);
                case BrowserTag.DEV:
                    return await resolveBuildId$2(ChromeReleaseChannel.DEV);
                case BrowserTag.STABLE:
                    return await resolveBuildId$2(ChromeReleaseChannel.STABLE);
                case BrowserTag.NIGHTLY:
                case BrowserTag.DEVEDITION:
                case BrowserTag.ESR:
                    throw new Error(`${tag.toUpperCase()} is not available for ChromeDriver`);
            }
        }
        case Browser.CHROMEHEADLESSSHELL: {
            switch (tag) {
                case BrowserTag.LATEST:
                case BrowserTag.CANARY:
                    return await resolveBuildId$2(ChromeReleaseChannel.CANARY);
                case BrowserTag.BETA:
                    return await resolveBuildId$2(ChromeReleaseChannel.BETA);
                case BrowserTag.DEV:
                    return await resolveBuildId$2(ChromeReleaseChannel.DEV);
                case BrowserTag.STABLE:
                    return await resolveBuildId$2(ChromeReleaseChannel.STABLE);
                case BrowserTag.NIGHTLY:
                case BrowserTag.DEVEDITION:
                case BrowserTag.ESR:
                    throw new Error(`${tag} is not available for chrome-headless-shell`);
            }
        }
        case Browser.CHROMIUM:
            switch (tag) {
                case BrowserTag.LATEST:
                    return await resolveBuildId$3(platform);
                case BrowserTag.NIGHTLY:
                case BrowserTag.CANARY:
                case BrowserTag.DEV:
                case BrowserTag.DEVEDITION:
                case BrowserTag.BETA:
                case BrowserTag.STABLE:
                case BrowserTag.ESR:
                    throw new Error(`${tag} is not supported for Chromium. Use 'latest' instead.`);
            }
    }
}
/**
 * @public
 */
async function resolveBuildId(browser, platform, tag) {
    const browserTag = tag;
    if (Object.values(BrowserTag).includes(browserTag)) {
        return await resolveBuildIdForBrowserTag(browser, platform, browserTag);
    }
    switch (browser) {
        case Browser.FIREFOX:
            return tag;
        case Browser.CHROME:
            const chromeResult = await resolveBuildId$2(tag);
            if (chromeResult) {
                return chromeResult;
            }
            return tag;
        case Browser.CHROMEDRIVER:
            const chromeDriverResult = await resolveBuildId$2(tag);
            if (chromeDriverResult) {
                return chromeDriverResult;
            }
            return tag;
        case Browser.CHROMEHEADLESSSHELL:
            const chromeHeadlessShellResult = await resolveBuildId$2(tag);
            if (chromeHeadlessShellResult) {
                return chromeHeadlessShellResult;
            }
            return tag;
        case Browser.CHROMIUM:
            return tag;
    }
}
/**
 * @public
 */
async function createProfile(browser, opts) {
    switch (browser) {
        case Browser.FIREFOX:
            return await createProfile$1(opts);
        case Browser.CHROME:
        case Browser.CHROMIUM:
            throw new Error(`Profile creation is not support for ${browser} yet`);
    }
}
/**
 * Returns the expected default user data dir for the given channel. It does not
 * check if the dir actually exists.
 *
 * @public
 */
function resolveDefaultUserDataDir(browser, platform, channel) {
    switch (browser) {
        case Browser.CHROMEDRIVER:
        case Browser.CHROMEHEADLESSSHELL:
        case Browser.FIREFOX:
        case Browser.CHROMIUM:
            throw new Error(`Default user dir detection is not supported for ${browser} yet.`);
        case Browser.CHROME:
            return resolveDefaultUserDataDir$1(platform, channel);
    }
}
/**
 * @internal
 *
 * Returns multiple paths where the executable may be located at on the current system
 * ordered by likelihood (based on heuristics).
 */
function resolveSystemExecutablePaths(browser, platform, channel) {
    switch (browser) {
        case Browser.CHROMEDRIVER:
        case Browser.CHROMEHEADLESSSHELL:
        case Browser.FIREFOX:
        case Browser.CHROMIUM:
            throw new Error(`System browser detection is not supported for ${browser} yet.`);
        case Browser.CHROME:
            return resolveSystemExecutablePaths$1(platform, channel);
    }
}
/**
 * Returns a version comparator for the given browser that can be used to sort
 * browser versions.
 *
 * @public
 */
function getVersionComparator(browser) {
    return versionComparators[browser];
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const debug = (prefix) => {
    const log = debugModule(prefix);
    return log.enabled ? log : undefined;
};

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @public
 */
function detectBrowserPlatform() {
    const platform = os.platform();
    const arch = os.arch();
    switch (platform) {
        case 'darwin':
            return arch === 'arm64' ? BrowserPlatform.MAC_ARM : BrowserPlatform.MAC;
        case 'linux':
            return arch === 'arm64'
                ? BrowserPlatform.LINUX_ARM
                : BrowserPlatform.LINUX;
        case 'win32':
            return arch === 'x64' ||
                // Windows 11 for ARM supports x64 emulation
                (arch === 'arm64' && isWindows11(os.release()))
                ? BrowserPlatform.WIN64
                : BrowserPlatform.WIN32;
        default:
            return undefined;
    }
}
/**
 * Windows 11 is identified by the version 10.0.22000 or greater
 * @internal
 */
function isWindows11(version) {
    const parts = version.split('.');
    if (parts.length > 2) {
        const major = parseInt(parts[0], 10);
        const minor = parseInt(parts[1], 10);
        const patch = parseInt(parts[2], 10);
        return (major > 10 ||
            (major === 10 && minor > 0) ||
            (major === 10 && minor === 0 && patch >= 22000));
    }
    return false;
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const debugCache = debug('puppeteer:browsers:cache');
/**
 * @public
 */
class InstalledBrowser {
    browser;
    buildId;
    platform;
    executablePath;
    #cache;
    /**
     * @internal
     */
    constructor(cache, browser, buildId, platform) {
        this.#cache = cache;
        this.browser = browser;
        this.buildId = buildId;
        this.platform = platform;
        this.executablePath = cache.computeExecutablePath({
            browser,
            buildId,
            platform,
        });
    }
    /**
     * Path to the root of the installation folder. Use
     * {@link computeExecutablePath} to get the path to the executable binary.
     */
    get path() {
        return this.#cache.installationDir(this.browser, this.platform, this.buildId);
    }
    readMetadata() {
        return this.#cache.readMetadata(this.browser);
    }
    writeMetadata(metadata) {
        this.#cache.writeMetadata(this.browser, metadata);
    }
}
/**
 * The cache used by Puppeteer relies on the following structure:
 *
 * - rootDir
 *   -- <browser1> | browserRoot(browser1)
 *   ---- <platform>-<buildId> | installationDir()
 *   ------ the browser-platform-buildId
 *   ------ specific structure.
 *   -- <browser2> | browserRoot(browser2)
 *   ---- <platform>-<buildId> | installationDir()
 *   ------ the browser-platform-buildId
 *   ------ specific structure.
 *   @internal
 */
class Cache {
    #rootDir;
    constructor(rootDir) {
        this.#rootDir = rootDir;
    }
    /**
     * @internal
     */
    get rootDir() {
        return this.#rootDir;
    }
    browserRoot(browser) {
        return path__default.join(this.#rootDir, browser);
    }
    metadataFile(browser) {
        return path__default.join(this.browserRoot(browser), '.metadata');
    }
    readMetadata(browser) {
        const metatadaPath = this.metadataFile(browser);
        if (!fs.existsSync(metatadaPath)) {
            return { aliases: {} };
        }
        // TODO: add type-safe parsing.
        const data = JSON.parse(fs.readFileSync(metatadaPath, 'utf8'));
        if (typeof data !== 'object') {
            throw new Error('.metadata is not an object');
        }
        return data;
    }
    writeMetadata(browser, metadata) {
        const metatadaPath = this.metadataFile(browser);
        fs.mkdirSync(path__default.dirname(metatadaPath), { recursive: true });
        fs.writeFileSync(metatadaPath, JSON.stringify(metadata, null, 2));
    }
    readExecutablePath(browser, platform, buildId) {
        const metadata = this.readMetadata(browser);
        const key = `${platform}-${buildId}`;
        return metadata.executablePaths?.[key] ?? null;
    }
    writeExecutablePath(browser, platform, buildId, executablePath) {
        const metadata = this.readMetadata(browser);
        if (!metadata.executablePaths) {
            metadata.executablePaths = {};
        }
        const key = `${platform}-${buildId}`;
        metadata.executablePaths[key] = executablePath;
        this.writeMetadata(browser, metadata);
    }
    resolveAlias(browser, alias) {
        const metadata = this.readMetadata(browser);
        if (alias === 'latest') {
            return Object.values(metadata.aliases || {})
                .sort(getVersionComparator(browser))
                .at(-1);
        }
        return metadata.aliases[alias];
    }
    installationDir(browser, platform, buildId) {
        return path__default.join(this.browserRoot(browser), `${platform}-${buildId}`);
    }
    clear() {
        fs.rmSync(this.#rootDir, {
            force: true,
            recursive: true,
            maxRetries: 10,
            retryDelay: 500,
        });
    }
    uninstall(browser, platform, buildId) {
        const metadata = this.readMetadata(browser);
        for (const alias of Object.keys(metadata.aliases)) {
            if (metadata.aliases[alias] === buildId) {
                delete metadata.aliases[alias];
            }
        }
        // Clean up executable path entry
        const key = `${platform}-${buildId}`;
        if (metadata.executablePaths?.[key]) {
            delete metadata.executablePaths[key];
            this.writeMetadata(browser, metadata);
        }
        fs.rmSync(this.installationDir(browser, platform, buildId), {
            force: true,
            recursive: true,
            maxRetries: 10,
            retryDelay: 500,
        });
    }
    getInstalledBrowsers() {
        if (!fs.existsSync(this.#rootDir)) {
            return [];
        }
        const types = fs.readdirSync(this.#rootDir);
        const browsers = types.filter((t) => {
            return Object.values(Browser).includes(t);
        });
        return browsers.flatMap(browser => {
            const files = fs.readdirSync(this.browserRoot(browser));
            return files
                .map(file => {
                const result = parseFolderPath(path__default.join(this.browserRoot(browser), file));
                if (!result) {
                    return null;
                }
                return new InstalledBrowser(this, browser, result.buildId, result.platform);
            })
                .filter((item) => {
                return item !== null;
            });
        });
    }
    computeExecutablePath(options) {
        options.platform ??= detectBrowserPlatform();
        if (!options.platform) {
            throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
        }
        try {
            options.buildId =
                this.resolveAlias(options.browser, options.buildId) ?? options.buildId;
        }
        catch {
            debugCache?.('could not read .metadata file for the browser');
        }
        const installationDir = this.installationDir(options.browser, options.platform, options.buildId);
        const storedExecutablePath = this.readExecutablePath(options.browser, options.platform, options.buildId);
        if (storedExecutablePath) {
            // The metadata contains a resolved relative path from the installation dir
            return path__default.join(installationDir, storedExecutablePath);
        }
        return path__default.join(installationDir, executablePathByBrowser[options.browser](options.platform, options.buildId));
    }
}
function parseFolderPath(folderPath) {
    const name = path__default.basename(folderPath);
    const splits = name.split('-');
    if (splits.length !== 2) {
        return;
    }
    const [platform, buildId] = splits;
    if (!buildId || !platform) {
        return;
    }
    return { platform, buildId };
}

/**
 * @license
 * Copyright 2026 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Default provider implementation that uses default sources.
 * This is the standard provider used by Puppeteer.
 *
 * @public
 */
class DefaultProvider {
    #baseUrl;
    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }
    supports(_options) {
        // Default provider supports all browsers
        return true;
    }
    getDownloadUrl(options) {
        return this.#getDownloadUrl(options.browser, options.platform, options.buildId);
    }
    #getDownloadUrl(browser, platform, buildId) {
        return new URL(downloadUrls[browser](platform, buildId, this.#baseUrl));
    }
    getExecutablePath(options) {
        return executablePathByBrowser[options.browser](options.platform, options.buildId);
    }
    getName() {
        return 'DefaultProvider';
    }
}

/**
 * @license
 * Copyright 2023 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
const execFileAsync = promisify(execFile);
const debugFileUtil = debug('puppeteer:browsers:fileUtil');
/**
 * @internal
 */
async function unpackArchive(archivePath, folderPath) {
    if (!path.isAbsolute(folderPath)) {
        folderPath = path.resolve(process.cwd(), folderPath);
    }
    if (archivePath.endsWith('.zip')) {
        await mkdir(folderPath, { recursive: true });
        await extractZip(archivePath, folderPath);
    }
    else if (archivePath.endsWith('.tar.bz2')) {
        await extractTar(archivePath, folderPath, 'bzip2');
    }
    else if (archivePath.endsWith('.dmg')) {
        await mkdir(folderPath);
        await installDMG(archivePath, folderPath);
    }
    else if (archivePath.endsWith('.exe')) {
        // Firefox on Windows.
        const result = spawnSync(archivePath, [`/ExtractDir=${folderPath}`], {
            env: {
                __compat_layer: 'RunAsInvoker',
            },
        });
        if (result.status !== 0) {
            throw new Error(`Failed to extract ${archivePath} to ${folderPath}: ${result.output}`);
        }
    }
    else if (archivePath.endsWith('.tar.xz')) {
        await extractTar(archivePath, folderPath, 'xz');
    }
    else {
        throw new Error(`Unsupported archive format: ${archivePath}`);
    }
}
function createTransformStream(child) {
    const stream = new Stream.Transform({
        transform(chunk, encoding, callback) {
            if (!child.stdin.write(chunk, encoding)) {
                child.stdin.once('drain', callback);
            }
            else {
                callback();
            }
        },
        flush(callback) {
            if (child.stdout.destroyed) {
                callback();
            }
            else {
                child.stdin.end();
                child.stdout.on('close', callback);
            }
        },
    });
    child.stdin.on('error', e => {
        if ('code' in e && e.code === 'EPIPE') {
            // finished before reading the file finished (i.e. head)
            stream.emit('end');
        }
        else {
            stream.destroy(e);
        }
    });
    child.stdout
        .on('data', data => {
        return stream.push(data);
    })
        .on('error', e => {
        return stream.destroy(e);
    });
    child.once('close', () => {
        return stream.end();
    });
    return stream;
}
/**
 * @internal
 */
const internalConstantsForTesting = {
    xz: 'xz',
    bzip2: 'bzip2',
};
/**
 * @internal
 */
async function extractTar(tarPath, folderPath, decompressUtilityName) {
    const tarFs = await import('./chunk-004.mjs').then(n => n.i);
    return await new Promise((fulfill, reject) => {
        function handleError(utilityName) {
            return (error) => {
                if ('code' in error && error.code === 'ENOENT') {
                    error = new Error(`\`${utilityName}\` utility is required to unpack this archive`, {
                        cause: error,
                    });
                }
                reject(error);
            };
        }
        const unpack = spawn(internalConstantsForTesting[decompressUtilityName], ['-d'], {
            stdio: ['pipe', 'pipe', 'inherit'],
        })
            .once('error', handleError(decompressUtilityName))
            .once('exit', code => {
            debugFileUtil?.(`${decompressUtilityName} exited, code=${code}`);
        });
        const tar = tarFs.extract(folderPath);
        tar.once('error', handleError('tar'));
        tar.once('finish', fulfill);
        createReadStream(tarPath).pipe(createTransformStream(unpack)).pipe(tar);
    });
}
/**
 * @internal
 */
async function installDMG(dmgPath, folderPath) {
    const { stdout } = spawnSync(`hdiutil`, [
        'attach',
        '-nobrowse',
        '-noautoopen',
        dmgPath,
    ]);
    const volumes = stdout.toString('utf8').match(/\/Volumes\/(.*)/m);
    if (!volumes) {
        throw new Error(`Could not find volume path in ${stdout}`);
    }
    const mountPath = volumes[0];
    try {
        const fileNames = await readdir(mountPath);
        const appName = fileNames.find(item => {
            return typeof item === 'string' && item.endsWith('.app');
        });
        if (!appName) {
            throw new Error(`Cannot find app in ${mountPath}`);
        }
        const mountedPath = path.join(mountPath, appName);
        spawnSync('cp', ['-R', mountedPath, folderPath]);
    }
    finally {
        spawnSync('hdiutil', ['detach', mountPath, '-quiet']);
    }
}
/**
 * @internal
 */
async function extractZip(archivePath, folderPath) {
    try {
        if (process.platform === 'win32') {
            // -x: extract files
            // -f: specify the archive file
            // -C: extract to the specified directory
            const systemRoot = process.env['SystemRoot'] ?? process.env['SYSTEMROOT'] ?? 'C:\\Windows';
            const systemTar = `${systemRoot}\\System32\\tar.exe`;
            await execFileAsync(systemTar, ['-xf', archivePath, '-C', folderPath]);
        }
        else {
            // -o: overwrite existing files without prompting
            // -d: extract files into the specified directory
            await execFileAsync('unzip', ['-o', archivePath, '-d', folderPath]);
        }
    }
    catch (error) {
        if (error?.code === 'ENOENT') {
            throw new Error(`Extraction failed: Required native binary ('tar.exe' or 'unzip') was not found in the system PATH.`);
        }
        throw new Error(`Extraction failed: ${error?.stderr?.toString() || error?.message}`);
    }
}

export { Cache as C, DefaultProvider as D, InstalledBrowser as I, resolveBuildId as a, debug as b, createProfile as c, detectBrowserPlatform as d, resolveSystemExecutablePaths as e, executablePathByBrowser as f, getVersionComparator as g, resolveDefaultUserDataDir as r, unpackArchive as u };
