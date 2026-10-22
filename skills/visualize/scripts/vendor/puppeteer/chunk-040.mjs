// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { j as BidiNoOpParser, k as BrowserProcessor, C as CdpProcessor, a as UnsupportedOperationException, l as UnknownCommandException, O as OutgoingMessage, E as Exception, m as NoSuchFrameException, i as UnknownErrorException, I as InvalidArgumentException, N as NoSuchUserContextException } from './chunk-035.mjs';
import { E as EventEmitter, S as ScriptProcessor, a as SessionProcessor, b as StorageProcessor, W as WebExtensionProcessor } from './chunk-039.mjs';
import { I as InputProcessor, N as NetworkProcessor, P as PermissionsProcessor, L as LogType } from './chunk-038.mjs';
import { B as BrowsingContextProcessor, E as EmulationProcessor } from './chunk-036.mjs';

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
class CommandProcessor extends EventEmitter {
    // keep-sorted start
    #bluetoothProcessor;
    #browserCdpClient;
    #browserProcessor;
    #browsingContextProcessor;
    #cdpProcessor;
    #emulationProcessor;
    #inputProcessor;
    #networkProcessor;
    #permissionsProcessor;
    #scriptProcessor;
    #sessionProcessor;
    #storageProcessor;
    #webExtensionProcessor;
    // keep-sorted end
    #parser;
    #logger;
    constructor(cdpConnection, browserCdpClient, eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, networkStorage, contextConfigStorage, bluetoothProcessor, userContextStorage, parser = new BidiNoOpParser(), initConnection, logger) {
        super();
        this.#browserCdpClient = browserCdpClient;
        this.#parser = parser;
        this.#logger = logger;
        this.#bluetoothProcessor = bluetoothProcessor;
        // keep-sorted start block=yes
        this.#browserProcessor = new BrowserProcessor(browserCdpClient, browsingContextStorage, contextConfigStorage, userContextStorage);
        this.#browsingContextProcessor = new BrowsingContextProcessor(browserCdpClient, browsingContextStorage, userContextStorage, contextConfigStorage, eventManager);
        this.#cdpProcessor = new CdpProcessor(browsingContextStorage, realmStorage, cdpConnection, browserCdpClient);
        this.#emulationProcessor = new EmulationProcessor(browsingContextStorage, userContextStorage, contextConfigStorage);
        this.#inputProcessor = new InputProcessor(browsingContextStorage);
        this.#networkProcessor = new NetworkProcessor(browsingContextStorage, networkStorage, userContextStorage, contextConfigStorage);
        this.#permissionsProcessor = new PermissionsProcessor(browserCdpClient);
        this.#scriptProcessor = new ScriptProcessor(eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, userContextStorage, logger);
        this.#sessionProcessor = new SessionProcessor(eventManager, browserCdpClient, initConnection);
        this.#storageProcessor = new StorageProcessor(browserCdpClient, browsingContextStorage, logger);
        this.#webExtensionProcessor = new WebExtensionProcessor(browserCdpClient);
        // keep-sorted end
    }
    async #processCommand(command) {
        switch (command.method) {
            // Bluetooth module
            // keep-sorted start block=yes
            case 'bluetooth.disableSimulation':
                return await this.#bluetoothProcessor.disableSimulation(this.#parser.parseDisableSimulationParameters(command.params));
            case 'bluetooth.handleRequestDevicePrompt':
                return await this.#bluetoothProcessor.handleRequestDevicePrompt(this.#parser.parseHandleRequestDevicePromptParams(command.params));
            case 'bluetooth.simulateAdapter':
                return await this.#bluetoothProcessor.simulateAdapter(this.#parser.parseSimulateAdapterParameters(command.params));
            case 'bluetooth.simulateAdvertisement':
                return await this.#bluetoothProcessor.simulateAdvertisement(this.#parser.parseSimulateAdvertisementParameters(command.params));
            case 'bluetooth.simulateCharacteristic':
                return await this.#bluetoothProcessor.simulateCharacteristic(this.#parser.parseSimulateCharacteristicParameters(command.params));
            case 'bluetooth.simulateCharacteristicResponse':
                return await this.#bluetoothProcessor.simulateCharacteristicResponse(this.#parser.parseSimulateCharacteristicResponseParameters(command.params));
            case 'bluetooth.simulateDescriptor':
                return await this.#bluetoothProcessor.simulateDescriptor(this.#parser.parseSimulateDescriptorParameters(command.params));
            case 'bluetooth.simulateDescriptorResponse':
                return await this.#bluetoothProcessor.simulateDescriptorResponse(this.#parser.parseSimulateDescriptorResponseParameters(command.params));
            case 'bluetooth.simulateGattConnectionResponse':
                return await this.#bluetoothProcessor.simulateGattConnectionResponse(this.#parser.parseSimulateGattConnectionResponseParameters(command.params));
            case 'bluetooth.simulateGattDisconnection':
                return await this.#bluetoothProcessor.simulateGattDisconnection(this.#parser.parseSimulateGattDisconnectionParameters(command.params));
            case 'bluetooth.simulatePreconnectedPeripheral':
                return await this.#bluetoothProcessor.simulatePreconnectedPeripheral(this.#parser.parseSimulatePreconnectedPeripheralParameters(command.params));
            case 'bluetooth.simulateService':
                return await this.#bluetoothProcessor.simulateService(this.#parser.parseSimulateServiceParameters(command.params));
            // keep-sorted end
            // Browser module
            // keep-sorted start block=yes
            case 'browser.close':
                return this.#browserProcessor.close();
            case 'browser.createUserContext':
                return await this.#browserProcessor.createUserContext(this.#parser.parseCreateUserContextParameters(command.params));
            case 'browser.getClientWindows':
                return await this.#browserProcessor.getClientWindows();
            case 'browser.getUserContexts':
                return await this.#browserProcessor.getUserContexts();
            case 'browser.removeUserContext':
                return await this.#browserProcessor.removeUserContext(this.#parser.parseRemoveUserContextParameters(command.params));
            case 'browser.setClientWindowState':
                return await this.#browserProcessor.setClientWindowState(this.#parser.parseSetClientWindowStateParameters(command.params));
            case 'browser.setDownloadBehavior':
                return await this.#browserProcessor.setDownloadBehavior(this.#parser.parseSetDownloadBehaviorParameters(command.params));
            // keep-sorted end
            // Browsing Context module
            // keep-sorted start block=yes
            case 'browsingContext.activate':
                return await this.#browsingContextProcessor.activate(this.#parser.parseActivateParams(command.params));
            case 'browsingContext.captureScreenshot':
                return await this.#browsingContextProcessor.captureScreenshot(this.#parser.parseCaptureScreenshotParams(command.params));
            case 'browsingContext.close':
                return await this.#browsingContextProcessor.close(this.#parser.parseCloseParams(command.params));
            case 'browsingContext.create':
                return await this.#browsingContextProcessor.create(this.#parser.parseCreateParams(command.params));
            case 'browsingContext.getTree':
                return this.#browsingContextProcessor.getTree(this.#parser.parseGetTreeParams(command.params));
            case 'browsingContext.handleUserPrompt':
                return await this.#browsingContextProcessor.handleUserPrompt(this.#parser.parseHandleUserPromptParams(command.params));
            case 'browsingContext.locateNodes':
                return await this.#browsingContextProcessor.locateNodes(this.#parser.parseLocateNodesParams(command.params));
            case 'browsingContext.navigate':
                return await this.#browsingContextProcessor.navigate(this.#parser.parseNavigateParams(command.params));
            case 'browsingContext.print':
                return await this.#browsingContextProcessor.print(this.#parser.parsePrintParams(command.params));
            case 'browsingContext.reload':
                return await this.#browsingContextProcessor.reload(this.#parser.parseReloadParams(command.params));
            case 'browsingContext.setBypassCSP':
                this.#parser.parseSetBypassCspParams(command.params);
                throw new UnsupportedOperationException(`Method ${command.method} is not implemented.`);
            case 'browsingContext.setViewport':
                return await this.#browsingContextProcessor.setViewport(this.#parser.parseSetViewportParams(command.params));
            case 'browsingContext.traverseHistory':
                return await this.#browsingContextProcessor.traverseHistory(this.#parser.parseTraverseHistoryParams(command.params));
            // keep-sorted end
            // CDP module
            // keep-sorted start block=yes
            case 'goog:cdp.getSession':
                return this.#cdpProcessor.getSession(this.#parser.parseGetSessionParams(command.params));
            case 'goog:cdp.resolveRealm':
                return this.#cdpProcessor.resolveRealm(this.#parser.parseResolveRealmParams(command.params));
            case 'goog:cdp.sendCommand':
                return await this.#cdpProcessor.sendCommand(this.#parser.parseSendCommandParams(command.params));
            // keep-sorted end
            // Emulation module
            // keep-sorted start block=yes
            case 'emulation.setForcedColorsModeThemeOverride':
                this.#parser.parseSetForcedColorsModeThemeOverrideParams(command.params);
                throw new UnsupportedOperationException(`Method ${command.method} is not implemented.`);
            case 'emulation.setGeolocationOverride':
                return await this.#emulationProcessor.setGeolocationOverride(this.#parser.parseSetGeolocationOverrideParams(command.params));
            case 'emulation.setLocaleOverride':
                return await this.#emulationProcessor.setLocaleOverride(this.#parser.parseSetLocaleOverrideParams(command.params));
            case 'emulation.setNetworkConditions':
                return await this.#emulationProcessor.setNetworkConditions(this.#parser.parseSetNetworkConditionsParams(command.params));
            case 'emulation.setScreenOrientationOverride':
                return await this.#emulationProcessor.setScreenOrientationOverride(this.#parser.parseSetScreenOrientationOverrideParams(command.params));
            case 'emulation.setScreenSettingsOverride':
                return await this.#emulationProcessor.setScreenSettingsOverride(this.#parser.parseSetScreenSettingsOverrideParams(command.params));
            case 'emulation.setScriptingEnabled':
                return await this.#emulationProcessor.setScriptingEnabled(this.#parser.parseSetScriptingEnabledParams(command.params));
            case 'emulation.setScrollbarTypeOverride':
                return await this.#emulationProcessor.setScrollbarTypeOverride(this.#parser.parseSetScrollbarTypeOverrideParams(command.params));
            case 'emulation.setTimezoneOverride':
                return await this.#emulationProcessor.setTimezoneOverride(this.#parser.parseSetTimezoneOverrideParams(command.params));
            case 'emulation.setTouchOverride':
                return await this.#emulationProcessor.setTouchOverride(this.#parser.parseSetTouchOverrideParams(command.params));
            case 'emulation.setUserAgentOverride':
                return await this.#emulationProcessor.setUserAgentOverrideParams(this.#parser.parseSetUserAgentOverrideParams(command.params));
            case 'userAgentClientHints.setClientHintsOverride':
                return await this.#emulationProcessor.setClientHintsOverride(this.#parser.parseSetClientHintsOverrideParams(command.params));
            // keep-sorted end
            // Input module
            // keep-sorted start block=yes
            case 'input.performActions':
                return await this.#inputProcessor.performActions(this.#parser.parsePerformActionsParams(command.params));
            case 'input.releaseActions':
                return await this.#inputProcessor.releaseActions(this.#parser.parseReleaseActionsParams(command.params));
            case 'input.setFiles':
                return await this.#inputProcessor.setFiles(this.#parser.parseSetFilesParams(command.params));
            // keep-sorted end
            // Network module
            // keep-sorted start block=yes
            case 'network.addDataCollector':
                return await this.#networkProcessor.addDataCollector(this.#parser.parseAddDataCollectorParams(command.params));
            case 'network.addIntercept':
                return await this.#networkProcessor.addIntercept(this.#parser.parseAddInterceptParams(command.params));
            case 'network.continueRequest':
                return await this.#networkProcessor.continueRequest(this.#parser.parseContinueRequestParams(command.params));
            case 'network.continueResponse':
                return await this.#networkProcessor.continueResponse(this.#parser.parseContinueResponseParams(command.params));
            case 'network.continueWithAuth':
                return await this.#networkProcessor.continueWithAuth(this.#parser.parseContinueWithAuthParams(command.params));
            case 'network.disownData':
                return this.#networkProcessor.disownData(this.#parser.parseDisownDataParams(command.params));
            case 'network.failRequest':
                return await this.#networkProcessor.failRequest(this.#parser.parseFailRequestParams(command.params));
            case 'network.getData':
                return await this.#networkProcessor.getData(this.#parser.parseGetDataParams(command.params));
            case 'network.provideResponse':
                return await this.#networkProcessor.provideResponse(this.#parser.parseProvideResponseParams(command.params));
            case 'network.removeDataCollector':
                return await this.#networkProcessor.removeDataCollector(this.#parser.parseRemoveDataCollectorParams(command.params));
            case 'network.removeIntercept':
                return await this.#networkProcessor.removeIntercept(this.#parser.parseRemoveInterceptParams(command.params));
            case 'network.setCacheBehavior':
                return await this.#networkProcessor.setCacheBehavior(this.#parser.parseSetCacheBehaviorParams(command.params));
            case 'network.setExtraHeaders':
                return await this.#networkProcessor.setExtraHeaders(this.#parser.parseSetExtraHeadersParams(command.params));
            // keep-sorted end
            // Permissions module
            // keep-sorted start block=yes
            case 'permissions.setPermission':
                return await this.#permissionsProcessor.setPermissions(this.#parser.parseSetPermissionsParams(command.params));
            // keep-sorted end
            // Script module
            // keep-sorted start block=yes
            case 'script.addPreloadScript':
                return await this.#scriptProcessor.addPreloadScript(this.#parser.parseAddPreloadScriptParams(command.params));
            case 'script.callFunction':
                return await this.#scriptProcessor.callFunction(this.#parser.parseCallFunctionParams(this.#processTargetParams(command.params)));
            case 'script.disown':
                return await this.#scriptProcessor.disown(this.#parser.parseDisownParams(this.#processTargetParams(command.params)));
            case 'script.evaluate':
                return await this.#scriptProcessor.evaluate(this.#parser.parseEvaluateParams(this.#processTargetParams(command.params)));
            case 'script.getRealms':
                return this.#scriptProcessor.getRealms(this.#parser.parseGetRealmsParams(command.params));
            case 'script.removePreloadScript':
                return await this.#scriptProcessor.removePreloadScript(this.#parser.parseRemovePreloadScriptParams(command.params));
            // keep-sorted end
            // Session module
            // keep-sorted start block=yes
            case 'session.end':
                throw new UnsupportedOperationException(`Method ${command.method} is not implemented.`);
            case 'session.new':
                return await this.#sessionProcessor.new(command.params);
            case 'session.status':
                return this.#sessionProcessor.status();
            case 'session.subscribe':
                return await this.#sessionProcessor.subscribe(this.#parser.parseSubscribeParams(command.params), command['goog:channel']);
            case 'session.unsubscribe':
                return await this.#sessionProcessor.unsubscribe(this.#parser.parseUnsubscribeParams(command.params), command['goog:channel']);
            // keep-sorted end
            // Storage module
            // keep-sorted start block=yes
            case 'storage.deleteCookies':
                return await this.#storageProcessor.deleteCookies(this.#parser.parseDeleteCookiesParams(command.params));
            case 'storage.getCookies':
                return await this.#storageProcessor.getCookies(this.#parser.parseGetCookiesParams(command.params));
            case 'storage.setCookie':
                return await this.#storageProcessor.setCookie(this.#parser.parseSetCookieParams(command.params));
            // keep-sorted end
            // WebExtension module
            // keep-sorted start block=yes
            case 'webExtension.install':
                return await this.#webExtensionProcessor.install(this.#parser.parseInstallParams(command.params));
            case 'webExtension.uninstall':
                return await this.#webExtensionProcessor.uninstall(this.#parser.parseUninstallParams(command.params));
            // keep-sorted end
        }
        // Intentionally kept outside the switch statement to ensure that
        // ESLint @typescript-eslint/switch-exhaustiveness-check triggers if a new
        // command is added.
        throw new UnknownCommandException(`Unknown command '${command?.method}'.`);
    }
    // Workaround for as zod.union always take the first schema
    // https://github.com/w3c/webdriver-bidi/issues/635
    #processTargetParams(params) {
        if (typeof params === 'object' &&
            params &&
            'target' in params &&
            typeof params.target === 'object' &&
            params.target &&
            'context' in params.target) {
            delete params.target['realm'];
        }
        return params;
    }
    async processCommand(command) {
        try {
            const result = await this.#processCommand(command);
            const response = {
                type: 'success',
                id: command.id,
                result,
            };
            this.emit("response" /* CommandProcessorEvents.Response */, {
                message: OutgoingMessage.createResolved(response, command['goog:channel']),
                event: command.method,
            });
        }
        catch (e) {
            if (e instanceof Exception) {
                this.emit("response" /* CommandProcessorEvents.Response */, {
                    message: OutgoingMessage.createResolved(e.toErrorResponse(command.id), command['goog:channel']),
                    event: command.method,
                });
            }
            else {
                const error = e;
                this.#logger?.(LogType.bidi, error);
                // Heuristic required for processing cases when a browsing context is gone
                // during the command processing, e.g. like in test
                // `test_input_keyDown_closes_browsing_context`.
                const errorException = this.#browserCdpClient.isCloseError(e)
                    ? new NoSuchFrameException(`Browsing context is gone`)
                    : new UnknownErrorException(error.message, error.stack);
                this.emit("response" /* CommandProcessorEvents.Response */, {
                    message: OutgoingMessage.createResolved(errorException.toErrorResponse(command.id), command['goog:channel']),
                    event: command.method,
                });
            }
        }
    }
}

/**
 * Copyright 2024 Google LLC.
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
/** Represents a base Bluetooth GATT item. */
class BluetoothGattItem {
    id;
    uuid;
    constructor(id, uuid) {
        this.id = id;
        this.uuid = uuid;
    }
}
/** Represents a Bluetooth descriptor. */
class BluetoothDescriptor extends BluetoothGattItem {
    characteristic;
    constructor(id, uuid, characteristic) {
        super(id, uuid);
        this.characteristic = characteristic;
    }
}
/** Represents a Bluetooth characteristic. */
class BluetoothCharacteristic extends BluetoothGattItem {
    descriptors = new Map();
    service;
    constructor(id, uuid, service) {
        super(id, uuid);
        this.service = service;
    }
}
/** Represents a Bluetooth service. */
class BluetoothService extends BluetoothGattItem {
    characteristics = new Map();
    device;
    constructor(id, uuid, device) {
        super(id, uuid);
        this.device = device;
    }
}
/** Represents a Bluetooth device. */
class BluetoothDevice {
    address;
    services = new Map();
    constructor(address) {
        this.address = address;
    }
}
class BluetoothProcessor {
    #eventManager;
    #browsingContextStorage;
    #bluetoothDevices = new Map();
    // A map from a characteristic id from CDP to its BluetoothCharacteristic object.
    #bluetoothCharacteristics = new Map();
    // A map from a descriptor id from CDP to its BluetoothDescriptor object.
    #bluetoothDescriptors = new Map();
    constructor(eventManager, browsingContextStorage) {
        this.#eventManager = eventManager;
        this.#browsingContextStorage = browsingContextStorage;
    }
    #getDevice(address) {
        const device = this.#bluetoothDevices.get(address);
        if (!device) {
            throw new InvalidArgumentException(`Bluetooth device with address ${address} does not exist`);
        }
        return device;
    }
    #getService(device, serviceUuid) {
        const service = device.services.get(serviceUuid);
        if (!service) {
            throw new InvalidArgumentException(`Service with UUID ${serviceUuid} on device ${device.address} does not exist`);
        }
        return service;
    }
    #getCharacteristic(service, characteristicUuid) {
        const characteristic = service.characteristics.get(characteristicUuid);
        if (!characteristic) {
            throw new InvalidArgumentException(`Characteristic with UUID ${characteristicUuid} does not exist for service ${service.uuid} on device ${service.device.address}`);
        }
        return characteristic;
    }
    #getDescriptor(characteristic, descriptorUuid) {
        const descriptor = characteristic.descriptors.get(descriptorUuid);
        if (!descriptor) {
            throw new InvalidArgumentException(`Descriptor with UUID ${descriptorUuid} does not exist for characteristic ${characteristic.uuid} on service ${characteristic.service.uuid} on device ${characteristic.service.device.address}`);
        }
        return descriptor;
    }
    async simulateAdapter(params) {
        if (params.state === undefined) {
            // The bluetooth.simulateAdapter Command
            // Step 4.2. If params["state"] does not exist, return error with error code invalid argument.
            // https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-simulateAdapter-command
            throw new InvalidArgumentException(`Parameter "state" is required for creating a Bluetooth adapter`);
        }
        const context = this.#browsingContextStorage.getContext(params.context);
        // Bluetooth spec requires overriding the existing adapter (step 6). From the CDP
        // perspective, we need to disable the emulation first.
        // https://webbluetoothcg.github.io/web-bluetooth/#bluetooth-simulateAdapter-command
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.disable');
        this.#bluetoothDevices.clear();
        this.#bluetoothCharacteristics.clear();
        this.#bluetoothDescriptors.clear();
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.enable', {
            state: params.state,
            leSupported: params.leSupported ?? true,
        });
        return {};
    }
    async disableSimulation(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.disable');
        this.#bluetoothDevices.clear();
        this.#bluetoothCharacteristics.clear();
        this.#bluetoothDescriptors.clear();
        return {};
    }
    async simulatePreconnectedPeripheral(params) {
        if (this.#bluetoothDevices.has(params.address)) {
            throw new InvalidArgumentException(`Bluetooth device with address ${params.address} already exists`);
        }
        const context = this.#browsingContextStorage.getContext(params.context);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulatePreconnectedPeripheral', {
            address: params.address,
            name: params.name,
            knownServiceUuids: params.knownServiceUuids,
            manufacturerData: params.manufacturerData,
        });
        this.#bluetoothDevices.set(params.address, new BluetoothDevice(params.address));
        return {};
    }
    async simulateAdvertisement(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulateAdvertisement', {
            entry: params.scanEntry,
        });
        return {};
    }
    async simulateCharacteristic(params) {
        const device = this.#getDevice(params.address);
        const service = this.#getService(device, params.serviceUuid);
        const context = this.#browsingContextStorage.getContext(params.context);
        switch (params.type) {
            case 'add': {
                if (params.characteristicProperties === undefined) {
                    throw new InvalidArgumentException(`Parameter "characteristicProperties" is required for adding a Bluetooth characteristic`);
                }
                if (service.characteristics.has(params.characteristicUuid)) {
                    throw new InvalidArgumentException(`Characteristic with UUID ${params.characteristicUuid} already exists`);
                }
                const response = await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.addCharacteristic', {
                    serviceId: service.id,
                    characteristicUuid: params.characteristicUuid,
                    properties: params.characteristicProperties,
                });
                const characteristic = new BluetoothCharacteristic(response.characteristicId, params.characteristicUuid, service);
                service.characteristics.set(params.characteristicUuid, characteristic);
                this.#bluetoothCharacteristics.set(characteristic.id, characteristic);
                return {};
            }
            case 'remove': {
                if (params.characteristicProperties !== undefined) {
                    throw new InvalidArgumentException(`Parameter "characteristicProperties" should not be provided for removing a Bluetooth characteristic`);
                }
                const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
                await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.removeCharacteristic', {
                    characteristicId: characteristic.id,
                });
                service.characteristics.delete(params.characteristicUuid);
                this.#bluetoothCharacteristics.delete(characteristic.id);
                return {};
            }
            default:
                throw new InvalidArgumentException(`Parameter "type" of ${params.type} is not supported`);
        }
    }
    async simulateCharacteristicResponse(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        const device = this.#getDevice(params.address);
        const service = this.#getService(device, params.serviceUuid);
        const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulateCharacteristicOperationResponse', {
            characteristicId: characteristic.id,
            type: params.type,
            code: params.code,
            ...(params.data && {
                data: btoa(String.fromCharCode(...params.data)),
            }),
        });
        return {};
    }
    async simulateDescriptor(params) {
        const device = this.#getDevice(params.address);
        const service = this.#getService(device, params.serviceUuid);
        const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
        const context = this.#browsingContextStorage.getContext(params.context);
        switch (params.type) {
            case 'add': {
                if (characteristic.descriptors.has(params.descriptorUuid)) {
                    throw new InvalidArgumentException(`Descriptor with UUID ${params.descriptorUuid} already exists`);
                }
                const response = await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.addDescriptor', {
                    characteristicId: characteristic.id,
                    descriptorUuid: params.descriptorUuid,
                });
                const descriptor = new BluetoothDescriptor(response.descriptorId, params.descriptorUuid, characteristic);
                characteristic.descriptors.set(params.descriptorUuid, descriptor);
                this.#bluetoothDescriptors.set(descriptor.id, descriptor);
                return {};
            }
            case 'remove': {
                const descriptor = this.#getDescriptor(characteristic, params.descriptorUuid);
                await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.removeDescriptor', {
                    descriptorId: descriptor.id,
                });
                characteristic.descriptors.delete(params.descriptorUuid);
                this.#bluetoothDescriptors.delete(descriptor.id);
                return {};
            }
            default:
                throw new InvalidArgumentException(`Parameter "type" of ${params.type} is not supported`);
        }
    }
    async simulateDescriptorResponse(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        const device = this.#getDevice(params.address);
        const service = this.#getService(device, params.serviceUuid);
        const characteristic = this.#getCharacteristic(service, params.characteristicUuid);
        const descriptor = this.#getDescriptor(characteristic, params.descriptorUuid);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulateDescriptorOperationResponse', {
            descriptorId: descriptor.id,
            type: params.type,
            code: params.code,
            ...(params.data && {
                data: btoa(String.fromCharCode(...params.data)),
            }),
        });
        return {};
    }
    async simulateGattConnectionResponse(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulateGATTOperationResponse', {
            address: params.address,
            type: 'connection',
            code: params.code,
        });
        return {};
    }
    async simulateGattDisconnection(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulateGATTDisconnection', {
            address: params.address,
        });
        return {};
    }
    async simulateService(params) {
        const device = this.#getDevice(params.address);
        const context = this.#browsingContextStorage.getContext(params.context);
        switch (params.type) {
            case 'add': {
                if (device.services.has(params.uuid)) {
                    throw new InvalidArgumentException(`Service with UUID ${params.uuid} already exists`);
                }
                const response = await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.addService', {
                    address: params.address,
                    serviceUuid: params.uuid,
                });
                device.services.set(params.uuid, new BluetoothService(response.serviceId, params.uuid, device));
                return {};
            }
            case 'remove': {
                const service = this.#getService(device, params.uuid);
                await context.cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.removeService', {
                    serviceId: service.id,
                });
                device.services.delete(params.uuid);
                return {};
            }
            default:
                throw new InvalidArgumentException(`Parameter "type" of ${params.type} is not supported`);
        }
    }
    onCdpTargetCreated(cdpTarget) {
        cdpTarget.cdpClient.on('DeviceAccess.deviceRequestPrompted', (event) => {
            this.#eventManager.registerEvent({
                type: 'event',
                method: 'bluetooth.requestDevicePromptUpdated',
                params: {
                    context: cdpTarget.id,
                    prompt: event.id,
                    devices: event.devices,
                },
            }, cdpTarget.id);
        });
        cdpTarget.browserCdpClient.on('BluetoothEmulation.gattOperationReceived', async (event) => {
            switch (event.type) {
                case 'connection':
                    this.#eventManager.registerEvent({
                        type: 'event',
                        method: 'bluetooth.gattConnectionAttempted',
                        params: {
                            context: cdpTarget.id,
                            address: event.address,
                        },
                    }, cdpTarget.id);
                    return;
                case 'discovery':
                    // Chromium Web Bluetooth simulation generates this GATT discovery event when
                    // a page attempts to get services for a given Bluetooth device for the first time.
                    // This 'get services' operation is put on hold until a GATT discovery response
                    // is sent to the simulation.
                    // Note: Web Bluetooth automation (see https://webbluetoothcg.github.io/web-bluetooth/#automated-testing)
                    // does not support simulating a GATT discovery response. This is because simulated services, characteristics,
                    // or descriptors are immediately visible to the simulation, meaning it doesn't have a distinct
                    // DISCOVERY state. Therefore, this code simulates a successful GATT discovery
                    // response upon receiving this event.
                    await cdpTarget.browserCdpClient.sendCommand('BluetoothEmulation.simulateGATTOperationResponse', {
                        address: event.address,
                        type: 'discovery',
                        code: 0x0,
                    });
            }
        });
        cdpTarget.browserCdpClient.on('BluetoothEmulation.characteristicOperationReceived', (event) => {
            if (!this.#bluetoothCharacteristics.has(event.characteristicId)) {
                return;
            }
            let type;
            if (event.type === 'write') {
                // write-default-deprecated comes from
                // https://webbluetoothcg.github.io/web-bluetooth/#dom-bluetoothremotegattcharacteristic-writevalue,
                // which is deprecated so not supported.
                if (event.writeType === 'write-default-deprecated') {
                    return;
                }
                type = event.writeType;
            }
            else {
                type = event.type;
            }
            const characteristic = this.#bluetoothCharacteristics.get(event.characteristicId);
            this.#eventManager.registerEvent({
                type: 'event',
                method: 'bluetooth.characteristicEventGenerated',
                params: {
                    context: cdpTarget.id,
                    address: characteristic.service.device.address,
                    serviceUuid: characteristic.service.uuid,
                    characteristicUuid: characteristic.uuid,
                    type,
                    ...(event.data && {
                        data: Array.from(atob(event.data), (c) => c.charCodeAt(0)),
                    }),
                },
            }, cdpTarget.id);
        });
        cdpTarget.browserCdpClient.on('BluetoothEmulation.descriptorOperationReceived', (event) => {
            if (!this.#bluetoothDescriptors.has(event.descriptorId)) {
                return;
            }
            const descriptor = this.#bluetoothDescriptors.get(event.descriptorId);
            this.#eventManager.registerEvent({
                type: 'event',
                method: 'bluetooth.descriptorEventGenerated',
                params: {
                    context: cdpTarget.id,
                    address: descriptor.characteristic.service.device.address,
                    serviceUuid: descriptor.characteristic.service.uuid,
                    characteristicUuid: descriptor.characteristic.uuid,
                    descriptorUuid: descriptor.uuid,
                    type: event.type,
                    ...(event.data && {
                        data: Array.from(atob(event.data), (c) => c.charCodeAt(0)),
                    }),
                },
            }, cdpTarget.id);
        });
    }
    async handleRequestDevicePrompt(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        if (params.accept) {
            await context.cdpTarget.cdpClient.sendCommand('DeviceAccess.selectPrompt', {
                id: params.prompt,
                deviceId: params.device,
            });
        }
        else {
            await context.cdpTarget.cdpClient.sendCommand('DeviceAccess.cancelPrompt', {
                id: params.prompt,
            });
        }
        return {};
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
/**
 * Represents a context configurations. It can be global, per User Context, or per
 * Browsing Context. The undefined value means the config will be taken from the upstream
 * config. `null` values means the value should be default regardless of the upstream.
 */
class ContextConfig {
    // keep-sorted start block=yes
    acceptInsecureCerts;
    clientHints;
    devicePixelRatio;
    disableNetworkDurableMessages;
    downloadBehavior;
    emulatedNetworkConditions;
    // Extra headers are kept in CDP format.
    extraHeaders;
    geolocation;
    locale;
    maxTouchPoints;
    prerenderingDisabled;
    screenArea;
    screenOrientation;
    scriptingEnabled;
    scrollbarType;
    // Timezone is kept in CDP format with GMT prefix for offset values.
    timezone;
    userAgent;
    userPromptHandler;
    viewport;
    // keep-sorted end
    /**
     * Merges multiple `ContextConfig` objects. The configs are merged in the order they are
     * provided. For each property, the value from the last config that defines it will be
     * used. The final result will not contain any `undefined` or `null` properties.
     * `undefined` values are ignored. `null` values remove the already set value.
     */
    static merge(...configs) {
        const result = new ContextConfig();
        for (const config of configs) {
            if (!config) {
                continue;
            }
            for (const key in config) {
                const value = config[key];
                if (value === null) {
                    delete result[key];
                }
                else if (value !== undefined) {
                    result[key] = value;
                }
            }
        }
        return result;
    }
}

/*
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
/**
 * Manages context-specific configurations. This class allows setting
 * configurations at three levels: global, user context, and browsing context.
 *
 * When `getActiveConfig` is called, it merges the configurations in a specific
 * order of precedence: `global -> user context -> browsing context`. For each
 * configuration property, the value from the highest-precedence level that has a
 * non-`undefined` value is used.
 *
 * The `update` methods (`updateGlobalConfig`, `updateUserContextConfig`,
 * `updateBrowsingContextConfig`) merge the provided configuration with the
 * existing one at the corresponding level. Properties with `undefined` values in
 * the provided configuration are ignored, preserving the existing value.
 */
class ContextConfigStorage {
    #global = new ContextConfig();
    #userContextConfigs = new Map();
    #browsingContextConfigs = new Map();
    /**
     * Updates the global configuration. Properties with `undefined` values in the
     * provided `config` are ignored.
     */
    updateGlobalConfig(config) {
        this.#global = ContextConfig.merge(this.#global, config);
    }
    /**
     * Updates the configuration for a specific browsing context. Properties with
     * `undefined` values in the provided `config` are ignored.
     */
    updateBrowsingContextConfig(browsingContextId, config) {
        this.#browsingContextConfigs.set(browsingContextId, ContextConfig.merge(this.#browsingContextConfigs.get(browsingContextId), config));
    }
    /**
     * Updates the configuration for a specific user context. Properties with
     * `undefined` values in the provided `config` are ignored.
     */
    updateUserContextConfig(userContext, config) {
        this.#userContextConfigs.set(userContext, ContextConfig.merge(this.#userContextConfigs.get(userContext), config));
    }
    /**
     * Returns the current global configuration.
     */
    getGlobalConfig() {
        return this.#global;
    }
    /**
     * Extra headers is a special case. The headers from the different levels have to be
     * merged instead of being overridden.
     */
    #getExtraHeaders(topLevelBrowsingContextId, userContext) {
        const globalHeaders = this.#global.extraHeaders ?? {};
        const userContextHeaders = this.#userContextConfigs.get(userContext)?.extraHeaders ?? {};
        const browsingContextHeaders = topLevelBrowsingContextId === undefined
            ? {}
            : (this.#browsingContextConfigs.get(topLevelBrowsingContextId)
                ?.extraHeaders ?? {});
        return { ...globalHeaders, ...userContextHeaders, ...browsingContextHeaders };
    }
    /**
     * Calculates the active configuration by merging global, user context, and
     * browsing context settings.
     */
    getActiveConfig(topLevelBrowsingContextId, userContext) {
        let result = ContextConfig.merge(this.#global, this.#userContextConfigs.get(userContext));
        if (topLevelBrowsingContextId !== undefined) {
            result = ContextConfig.merge(result, this.#browsingContextConfigs.get(topLevelBrowsingContextId));
        }
        // Extra headers is a special case which have to be treated in a special way.
        const extraHeaders = this.#getExtraHeaders(topLevelBrowsingContextId, userContext);
        result.extraHeaders =
            Object.keys(extraHeaders).length > 0 ? extraHeaders : undefined;
        return result;
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
class UserContextStorage {
    #browserClient;
    constructor(browserClient) {
        this.#browserClient = browserClient;
    }
    async getUserContexts() {
        const result = await this.#browserClient.sendCommand('Target.getBrowserContexts');
        return [
            {
                userContext: 'default',
            },
            ...result.browserContextIds.map((id) => {
                return {
                    userContext: id,
                };
            }),
        ];
    }
    async verifyUserContextIdList(userContextIds) {
        const foundContexts = new Set();
        if (!userContextIds.length) {
            return foundContexts;
        }
        const userContexts = await this.getUserContexts();
        const knownUserContextIds = new Set(userContexts.map((userContext) => userContext.userContext));
        for (const userContextId of userContextIds) {
            if (!knownUserContextIds.has(userContextId)) {
                throw new NoSuchUserContextException(`User context ${userContextId} not found`);
            }
            foundContexts.add(userContextId);
        }
        return foundContexts;
    }
}

export { BluetoothProcessor as B, CommandProcessor as C, UserContextStorage as U, ContextConfigStorage as a };
