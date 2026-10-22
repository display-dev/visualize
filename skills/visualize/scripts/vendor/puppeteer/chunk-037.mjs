// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { M as MoveTargetOutOfBoundsException, I as InvalidArgumentException, f as NoSuchElementException, i as UnknownErrorException } from './chunk-035.mjs';
import { P as PointerSource, K as KeyToKeyCode, W as WheelSource, a as KeySource, N as NoneSource } from './chunk-036.mjs';

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
function assert(predicate, message) {
    if (!predicate) {
        throw new Error(message ?? 'Internal assertion failed.');
    }
}

/*
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
/**
 * Check if the given string is a single complex grapheme. A complex grapheme is one that
 * is made up of multiple characters.
 */
function isSingleComplexGrapheme(value) {
    return isSingleGrapheme(value) && value.length > 1;
}
/**
 * Check if the given string is a single grapheme.
 */
function isSingleGrapheme(value) {
    // Theoretically there can be some strings considered a grapheme in some locales, like
    // slovak "ch" digraph. Use english locale for consistency.
    // https://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundaries
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return [...segmenter.segment(value)].length === 1;
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
/**
 * Returns the normalized key value for a given key according to the table:
 * https://w3c.github.io/webdriver/#dfn-normalized-key-value
 */
function getNormalizedKey(value) {
    switch (value) {
        case '\uE000':
            return 'Unidentified';
        case '\uE001':
            return 'Cancel';
        case '\uE002':
            return 'Help';
        case '\uE003':
            return 'Backspace';
        case '\uE004':
            return 'Tab';
        case '\uE005':
            return 'Clear';
        // Specification declares the '\uE006' to be `Return`, but it is not supported by
        // Chrome, so fall back to `Enter`, which aligns with WPT.
        case '\uE006':
        case '\uE007':
            return 'Enter';
        case '\uE008':
            return 'Shift';
        case '\uE009':
            return 'Control';
        case '\uE00A':
            return 'Alt';
        case '\uE00B':
            return 'Pause';
        case '\uE00C':
            return 'Escape';
        case '\uE00D':
            return ' ';
        case '\uE00E':
            return 'PageUp';
        case '\uE00F':
            return 'PageDown';
        case '\uE010':
            return 'End';
        case '\uE011':
            return 'Home';
        case '\uE012':
            return 'ArrowLeft';
        case '\uE013':
            return 'ArrowUp';
        case '\uE014':
            return 'ArrowRight';
        case '\uE015':
            return 'ArrowDown';
        case '\uE016':
            return 'Insert';
        case '\uE017':
            return 'Delete';
        case '\uE018':
            return ';';
        case '\uE019':
            return '=';
        case '\uE01A':
            return '0';
        case '\uE01B':
            return '1';
        case '\uE01C':
            return '2';
        case '\uE01D':
            return '3';
        case '\uE01E':
            return '4';
        case '\uE01F':
            return '5';
        case '\uE020':
            return '6';
        case '\uE021':
            return '7';
        case '\uE022':
            return '8';
        case '\uE023':
            return '9';
        case '\uE024':
            return '*';
        case '\uE025':
            return '+';
        case '\uE026':
            return ',';
        case '\uE027':
            return '-';
        case '\uE028':
            return '.';
        case '\uE029':
            return '/';
        case '\uE031':
            return 'F1';
        case '\uE032':
            return 'F2';
        case '\uE033':
            return 'F3';
        case '\uE034':
            return 'F4';
        case '\uE035':
            return 'F5';
        case '\uE036':
            return 'F6';
        case '\uE037':
            return 'F7';
        case '\uE038':
            return 'F8';
        case '\uE039':
            return 'F9';
        case '\uE03A':
            return 'F10';
        case '\uE03B':
            return 'F11';
        case '\uE03C':
            return 'F12';
        case '\uE03D':
            return 'Meta';
        case '\uE040':
            return 'ZenkakuHankaku';
        case '\uE050':
            return 'Shift';
        case '\uE051':
            return 'Control';
        case '\uE052':
            return 'Alt';
        case '\uE053':
            return 'Meta';
        case '\uE054':
            return 'PageUp';
        case '\uE055':
            return 'PageDown';
        case '\uE056':
            return 'End';
        case '\uE057':
            return 'Home';
        case '\uE058':
            return 'ArrowLeft';
        case '\uE059':
            return 'ArrowUp';
        case '\uE05A':
            return 'ArrowRight';
        case '\uE05B':
            return 'ArrowDown';
        case '\uE05C':
            return 'Insert';
        case '\uE05D':
            return 'Delete';
        default:
            return value;
    }
}
/**
 * Returns the key code for a given key according to the table:
 * https://w3c.github.io/webdriver/#dfn-shifted-character
 */
function getKeyCode(key) {
    switch (key) {
        case '`':
        case '~':
            return 'Backquote';
        case '\\':
        case '|':
            return 'Backslash';
        case '\uE003':
            return 'Backspace';
        case '[':
        case '{':
            return 'BracketLeft';
        case ']':
        case '}':
            return 'BracketRight';
        case ',':
        case '<':
            return 'Comma';
        case '0':
        case ')':
            return 'Digit0';
        case '1':
        case '!':
            return 'Digit1';
        case '2':
        case '@':
            return 'Digit2';
        case '3':
        case '#':
            return 'Digit3';
        case '4':
        case '$':
            return 'Digit4';
        case '5':
        case '%':
            return 'Digit5';
        case '6':
        case '^':
            return 'Digit6';
        case '7':
        case '&':
            return 'Digit7';
        case '8':
        case '*':
            return 'Digit8';
        case '9':
        case '(':
            return 'Digit9';
        case '=':
        case '+':
            return 'Equal';
        // The spec declares the '<' to be `IntlBackslash` as well, but it is already covered
        // in the `Comma` above.
        case '>':
            return 'IntlBackslash';
        case 'a':
        case 'A':
            return 'KeyA';
        case 'b':
        case 'B':
            return 'KeyB';
        case 'c':
        case 'C':
            return 'KeyC';
        case 'd':
        case 'D':
            return 'KeyD';
        case 'e':
        case 'E':
            return 'KeyE';
        case 'f':
        case 'F':
            return 'KeyF';
        case 'g':
        case 'G':
            return 'KeyG';
        case 'h':
        case 'H':
            return 'KeyH';
        case 'i':
        case 'I':
            return 'KeyI';
        case 'j':
        case 'J':
            return 'KeyJ';
        case 'k':
        case 'K':
            return 'KeyK';
        case 'l':
        case 'L':
            return 'KeyL';
        case 'm':
        case 'M':
            return 'KeyM';
        case 'n':
        case 'N':
            return 'KeyN';
        case 'o':
        case 'O':
            return 'KeyO';
        case 'p':
        case 'P':
            return 'KeyP';
        case 'q':
        case 'Q':
            return 'KeyQ';
        case 'r':
        case 'R':
            return 'KeyR';
        case 's':
        case 'S':
            return 'KeyS';
        case 't':
        case 'T':
            return 'KeyT';
        case 'u':
        case 'U':
            return 'KeyU';
        case 'v':
        case 'V':
            return 'KeyV';
        case 'w':
        case 'W':
            return 'KeyW';
        case 'x':
        case 'X':
            return 'KeyX';
        case 'y':
        case 'Y':
            return 'KeyY';
        case 'z':
        case 'Z':
            return 'KeyZ';
        case '-':
        case '_':
            return 'Minus';
        case '.':
            return 'Period';
        case "'":
        case '"':
            return 'Quote';
        case ';':
        case ':':
            return 'Semicolon';
        case '/':
        case '?':
            return 'Slash';
        case '\uE00A':
            return 'AltLeft';
        case '\uE052':
            return 'AltRight';
        case '\uE009':
            return 'ControlLeft';
        case '\uE051':
            return 'ControlRight';
        case '\uE006':
            return 'Enter';
        case '\uE00B':
            return 'Pause';
        case '\uE03D':
            return 'MetaLeft';
        case '\uE053':
            return 'MetaRight';
        case '\uE008':
            return 'ShiftLeft';
        case '\uE050':
            return 'ShiftRight';
        case ' ':
        case '\uE00D':
            return 'Space';
        case '\uE004':
            return 'Tab';
        case '\uE017':
            return 'Delete';
        case '\uE010':
            return 'End';
        case '\uE002':
            return 'Help';
        case '\uE011':
            return 'Home';
        case '\uE016':
            return 'Insert';
        case '\uE00F':
            return 'PageDown';
        case '\uE00E':
            return 'PageUp';
        case '\uE015':
            return 'ArrowDown';
        case '\uE012':
            return 'ArrowLeft';
        case '\uE014':
            return 'ArrowRight';
        case '\uE013':
            return 'ArrowUp';
        case '\uE00C':
            return 'Escape';
        case '\uE031':
            return 'F1';
        case '\uE032':
            return 'F2';
        case '\uE033':
            return 'F3';
        case '\uE034':
            return 'F4';
        case '\uE035':
            return 'F5';
        case '\uE036':
            return 'F6';
        case '\uE037':
            return 'F7';
        case '\uE038':
            return 'F8';
        case '\uE039':
            return 'F9';
        case '\uE03A':
            return 'F10';
        case '\uE03B':
            return 'F11';
        case '\uE03C':
            return 'F12';
        case '\uE019':
            return 'NumpadEqual';
        case '\uE01A':
        case '\uE05C':
            return 'Numpad0';
        case '\uE01B':
        case '\uE056':
            return 'Numpad1';
        case '\uE01C':
        case '\uE05B':
            return 'Numpad2';
        case '\uE01D':
        case '\uE055':
            return 'Numpad3';
        case '\uE01E':
        case '\uE058':
            return 'Numpad4';
        case '\uE01F':
            return 'Numpad5';
        case '\uE020':
        case '\uE05A':
            return 'Numpad6';
        case '\uE021':
        case '\uE057':
            return 'Numpad7';
        case '\uE022':
        case '\uE059':
            return 'Numpad8';
        case '\uE023':
        case '\uE054':
            return 'Numpad9';
        case '\uE025':
            return 'NumpadAdd';
        case '\uE026':
            return 'NumpadComma';
        case '\uE028':
        case '\uE05D':
            return 'NumpadDecimal';
        case '\uE029':
            return 'NumpadDivide';
        case '\uE007':
            return 'NumpadEnter';
        case '\uE024':
            return 'NumpadMultiply';
        case '\uE027':
            return 'NumpadSubtract';
        default:
            return;
    }
}
/**
 * Returns the location of the key according to the table:
 * https://w3c.github.io/webdriver/#dfn-key-location
 */
function getKeyLocation(key) {
    switch (key) {
        case '\uE007':
        case '\uE008':
        case '\uE009':
        case '\uE00A':
        case '\uE03D':
            return 1;
        case '\uE019':
        case '\uE01A':
        case '\uE01B':
        case '\uE01C':
        case '\uE01D':
        case '\uE01E':
        case '\uE01F':
        case '\uE020':
        case '\uE021':
        case '\uE022':
        case '\uE023':
        case '\uE024':
        case '\uE025':
        case '\uE026':
        case '\uE027':
        case '\uE028':
        case '\uE029':
        case '\uE054':
        case '\uE055':
        case '\uE056':
        case '\uE057':
        case '\uE058':
        case '\uE059':
        case '\uE05A':
        case '\uE05B':
        case '\uE05C':
        case '\uE05D':
            return 3;
        case '\uE050':
        case '\uE051':
        case '\uE052':
        case '\uE053':
            return 2;
        default:
            return 0;
    }
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
/** https://w3c.github.io/webdriver/#dfn-center-point */
const CALCULATE_IN_VIEW_CENTER_PT_DECL = ((i) => {
    const t = i.getClientRects()[0], e = Math.max(0, Math.min(t.x, t.x + t.width)), n = Math.min(window.innerWidth, Math.max(t.x, t.x + t.width)), h = Math.max(0, Math.min(t.y, t.y + t.height)), m = Math.min(window.innerHeight, Math.max(t.y, t.y + t.height));
    return [e + ((n - e) >> 1), h + ((m - h) >> 1)];
}).toString();
const IS_MAC_DECL = (() => {
    return navigator.platform.toLowerCase().includes('mac');
}).toString();
async function getElementCenter(context, element) {
    const hiddenSandboxRealm = await context.getOrCreateHiddenSandbox();
    const result = await hiddenSandboxRealm.callFunction(CALCULATE_IN_VIEW_CENTER_PT_DECL, false, { type: 'undefined' }, [element]);
    if (result.type === 'exception') {
        throw new NoSuchElementException(`Origin element ${element.sharedId} was not found`);
    }
    assert(result.result.type === 'array');
    assert(result.result.value?.[0]?.type === 'number');
    assert(result.result.value?.[1]?.type === 'number');
    const { result: { value: [{ value: x }, { value: y }], }, } = result;
    return { x: x, y: y };
}
class ActionDispatcher {
    static isMacOS = async (context) => {
        const hiddenSandboxRealm = await context.getOrCreateHiddenSandbox();
        const result = await hiddenSandboxRealm.callFunction(IS_MAC_DECL, false);
        assert(result.type !== 'exception');
        assert(result.result.type === 'boolean');
        return result.result.value;
    };
    #browsingContextStorage;
    #tickStart = 0;
    #tickDuration = 0;
    #inputState;
    #contextId;
    #isMacOS;
    constructor(inputState, browsingContextStorage, contextId, isMacOS) {
        this.#browsingContextStorage = browsingContextStorage;
        this.#inputState = inputState;
        this.#contextId = contextId;
        this.#isMacOS = isMacOS;
    }
    /**
     * The context can be disposed between action ticks, so need to get it each time.
     */
    get #context() {
        return this.#browsingContextStorage.getContext(this.#contextId);
    }
    async dispatchActions(optionsByTick) {
        await this.#inputState.queue.run(async () => {
            for (const options of optionsByTick) {
                await this.dispatchTickActions(options);
            }
        });
    }
    async dispatchTickActions(options) {
        this.#tickStart = performance.now();
        this.#tickDuration = 0;
        for (const { action } of options) {
            if ('duration' in action && action.duration !== undefined) {
                this.#tickDuration = Math.max(this.#tickDuration, action.duration);
            }
        }
        const promises = [
            new Promise((resolve) => setTimeout(resolve, this.#tickDuration)),
        ];
        for (const option of options) {
            // In theory we have to wait for each action to happen, but CDP is serial,
            // so as an optimization, we queue all CDP commands at once and await all
            // of them.
            promises.push(this.#dispatchAction(option));
        }
        await Promise.all(promises);
    }
    async #dispatchAction({ id, action }) {
        const source = this.#inputState.get(id);
        const keyState = this.#inputState.getGlobalKeyState();
        switch (action.type) {
            case 'keyDown': {
                // SAFETY: The source is validated before.
                await this.#dispatchKeyDownAction(source, action);
                this.#inputState.cancelList.push({
                    id,
                    action: {
                        ...action,
                        type: 'keyUp',
                    },
                });
                break;
            }
            case 'keyUp': {
                // SAFETY: The source is validated before.
                await this.#dispatchKeyUpAction(source, action);
                break;
            }
            case 'pause': {
                // TODO: Implement waiting on the input source.
                break;
            }
            case 'pointerDown': {
                // SAFETY: The source is validated before.
                await this.#dispatchPointerDownAction(source, keyState, action);
                this.#inputState.cancelList.push({
                    id,
                    action: {
                        ...action,
                        type: 'pointerUp',
                    },
                });
                break;
            }
            case 'pointerMove': {
                // SAFETY: The source is validated before.
                await this.#dispatchPointerMoveAction(source, keyState, action);
                break;
            }
            case 'pointerUp': {
                // SAFETY: The source is validated before.
                await this.#dispatchPointerUpAction(source, keyState, action);
                break;
            }
            case 'scroll': {
                // SAFETY: The source is validated before.
                await this.#dispatchScrollAction(source, keyState, action);
                break;
            }
        }
    }
    async #dispatchPointerDownAction(source, keyState, action) {
        const { button } = action;
        if (source.pressed.has(button)) {
            return;
        }
        source.pressed.add(button);
        const { x, y, subtype: pointerType } = source;
        const { width, height, pressure, twist, tangentialPressure } = action;
        const { tiltX, tiltY } = getTilt(action);
        // --- Platform-specific code begins here ---
        const { modifiers } = keyState;
        const { radiusX, radiusY } = getRadii(width ?? 1, height ?? 1);
        switch (pointerType) {
            case "mouse" /* Input.PointerType.Mouse */:
            case "pen" /* Input.PointerType.Pen */:
                // TODO: Implement width and height when available.
                await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                    type: 'mousePressed',
                    x,
                    y,
                    modifiers,
                    button: getCdpButton(button),
                    buttons: source.buttons,
                    clickCount: source.setClickCount(button, new PointerSource.ClickContext(x, y, performance.now())),
                    pointerType,
                    tangentialPressure,
                    tiltX,
                    tiltY,
                    twist,
                    force: pressure,
                });
                break;
            case "touch" /* Input.PointerType.Touch */:
                await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchTouchEvent', {
                    type: 'touchStart',
                    touchPoints: [
                        {
                            x,
                            y,
                            radiusX,
                            radiusY,
                            tangentialPressure,
                            tiltX,
                            tiltY,
                            twist,
                            force: pressure,
                            id: source.pointerId,
                        },
                    ],
                    modifiers,
                });
                break;
        }
        source.radiusX = radiusX;
        source.radiusY = radiusY;
        source.force = pressure;
        // --- Platform-specific code ends here ---
    }
    #dispatchPointerUpAction(source, keyState, action) {
        const { button } = action;
        if (!source.pressed.has(button)) {
            return;
        }
        source.pressed.delete(button);
        const { x, y, force, radiusX, radiusY, subtype: pointerType } = source;
        // --- Platform-specific code begins here ---
        const { modifiers } = keyState;
        switch (pointerType) {
            case "mouse" /* Input.PointerType.Mouse */:
            case "pen" /* Input.PointerType.Pen */:
                // TODO: Implement width and height when available.
                return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                    type: 'mouseReleased',
                    x,
                    y,
                    modifiers,
                    button: getCdpButton(button),
                    buttons: source.buttons,
                    clickCount: source.getClickCount(button),
                    pointerType,
                });
            case "touch" /* Input.PointerType.Touch */:
                return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchTouchEvent', {
                    type: 'touchEnd',
                    touchPoints: [
                        {
                            x,
                            y,
                            id: source.pointerId,
                            force,
                            radiusX,
                            radiusY,
                        },
                    ],
                    modifiers,
                });
        }
        // --- Platform-specific code ends here ---
    }
    async #dispatchPointerMoveAction(source, keyState, action) {
        const { x: startX, y: startY, subtype: pointerType } = source;
        const { width, height, pressure, twist, tangentialPressure, x: offsetX, y: offsetY, origin = 'viewport', duration = this.#tickDuration, } = action;
        const { tiltX, tiltY } = getTilt(action);
        const { radiusX, radiusY } = getRadii(width ?? 1, height ?? 1);
        const { targetX, targetY } = await this.#getCoordinateFromOrigin(origin, offsetX, offsetY, startX, startY);
        if (targetX < 0 || targetY < 0) {
            throw new MoveTargetOutOfBoundsException(`Cannot move beyond viewport (x: ${targetX}, y: ${targetY})`);
        }
        let last;
        do {
            const ratio = duration > 0 ? (performance.now() - this.#tickStart) / duration : 1;
            last = ratio >= 1;
            let x;
            let y;
            if (last) {
                x = targetX;
                y = targetY;
            }
            else {
                x = Math.round(ratio * (targetX - startX) + startX);
                y = Math.round(ratio * (targetY - startY) + startY);
            }
            if (source.x !== x || source.y !== y) {
                // --- Platform-specific code begins here ---
                const { modifiers } = keyState;
                switch (pointerType) {
                    case "mouse" /* Input.PointerType.Mouse */:
                        // TODO: Implement width and height when available.
                        await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                            type: 'mouseMoved',
                            x,
                            y,
                            modifiers,
                            clickCount: 0,
                            button: getCdpButton(source.pressed.values().next().value ?? 5),
                            buttons: source.buttons,
                            pointerType,
                            tangentialPressure,
                            tiltX,
                            tiltY,
                            twist,
                            force: pressure,
                        });
                        break;
                    case "pen" /* Input.PointerType.Pen */:
                        if (source.pressed.size !== 0) {
                            // Empty `source.pressed.size` means the pen is not detected by digitizer.
                            // Dispatch a mouse event for the pen only if either:
                            // 1. the pen is hovering over the digitizer (0);
                            // 2. the pen is in contact with the digitizer (1);
                            // 3. the pen has at least one button pressed (2, 4, etc).
                            // https://www.w3.org/TR/pointerevents/#the-buttons-property
                            // TODO: Implement width and height when available.
                            await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                                type: 'mouseMoved',
                                x,
                                y,
                                modifiers,
                                clickCount: 0,
                                button: getCdpButton(source.pressed.values().next().value ?? 5),
                                buttons: source.buttons,
                                pointerType,
                                tangentialPressure,
                                tiltX,
                                tiltY,
                                twist,
                                force: pressure ?? 0.5,
                            });
                        }
                        break;
                    case "touch" /* Input.PointerType.Touch */:
                        if (source.pressed.size !== 0) {
                            await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchTouchEvent', {
                                type: 'touchMove',
                                touchPoints: [
                                    {
                                        x,
                                        y,
                                        radiusX,
                                        radiusY,
                                        tangentialPressure,
                                        tiltX,
                                        tiltY,
                                        twist,
                                        force: pressure,
                                        id: source.pointerId,
                                    },
                                ],
                                modifiers,
                            });
                        }
                        break;
                }
                // --- Platform-specific code ends here ---
                source.x = x;
                source.y = y;
                source.radiusX = radiusX;
                source.radiusY = radiusY;
                source.force = pressure;
            }
        } while (!last);
    }
    async #getFrameOffset() {
        if (this.#context.id === this.#context.cdpTarget.id) {
            return { x: 0, y: 0 };
        }
        // https://github.com/w3c/webdriver/pull/1847 proposes dispatching events from
        // the top-level browsing context. This implementation dispatches it on the top-most
        // same-target frame, which is not top-level one in case of OOPiF.
        // TODO: switch to the top-level browsing context.
        const { backendNodeId } = await this.#context.cdpTarget.cdpClient.sendCommand('DOM.getFrameOwner', { frameId: this.#context.id });
        const { model: frameBoxModel } = await this.#context.cdpTarget.cdpClient.sendCommand('DOM.getBoxModel', {
            backendNodeId,
        });
        return { x: frameBoxModel.content[0], y: frameBoxModel.content[1] };
    }
    async #getCoordinateFromOrigin(origin, offsetX, offsetY, startX, startY) {
        let targetX;
        let targetY;
        const frameOffset = await this.#getFrameOffset();
        switch (origin) {
            case 'viewport':
                targetX = offsetX + frameOffset.x;
                targetY = offsetY + frameOffset.y;
                break;
            case 'pointer':
                targetX = startX + offsetX + frameOffset.x;
                targetY = startY + offsetY + frameOffset.y;
                break;
            default: {
                const { x: posX, y: posY } = await getElementCenter(this.#context, origin.element);
                // SAFETY: These can never be special numbers.
                targetX = posX + offsetX + frameOffset.x;
                targetY = posY + offsetY + frameOffset.y;
                break;
            }
        }
        return { targetX, targetY };
    }
    async #dispatchScrollAction(_source, keyState, action) {
        const { deltaX: targetDeltaX, deltaY: targetDeltaY, x: offsetX, y: offsetY, origin = 'viewport', duration = this.#tickDuration, } = action;
        if (origin === 'pointer') {
            throw new InvalidArgumentException('"pointer" origin is invalid for scrolling.');
        }
        const { targetX, targetY } = await this.#getCoordinateFromOrigin(origin, offsetX, offsetY, 0, 0);
        if (targetX < 0 || targetY < 0) {
            throw new MoveTargetOutOfBoundsException(`Cannot move beyond viewport (x: ${targetX}, y: ${targetY})`);
        }
        let currentDeltaX = 0;
        let currentDeltaY = 0;
        let last;
        do {
            const ratio = duration > 0 ? (performance.now() - this.#tickStart) / duration : 1;
            last = ratio >= 1;
            let deltaX;
            let deltaY;
            if (last) {
                deltaX = targetDeltaX - currentDeltaX;
                deltaY = targetDeltaY - currentDeltaY;
            }
            else {
                deltaX = Math.round(ratio * targetDeltaX - currentDeltaX);
                deltaY = Math.round(ratio * targetDeltaY - currentDeltaY);
            }
            if (deltaX !== 0 || deltaY !== 0) {
                // --- Platform-specific code begins here ---
                const { modifiers } = keyState;
                await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                    type: 'mouseWheel',
                    deltaX,
                    deltaY,
                    x: targetX,
                    y: targetY,
                    modifiers,
                });
                // --- Platform-specific code ends here ---
                currentDeltaX += deltaX;
                currentDeltaY += deltaY;
            }
        } while (!last);
    }
    async #dispatchKeyDownAction(source, action) {
        const rawKey = action.value;
        if (!isSingleGrapheme(rawKey)) {
            // https://w3c.github.io/webdriver/#dfn-process-a-key-action
            // WebDriver spec allows a grapheme to be used.
            throw new InvalidArgumentException(`Invalid key value: ${rawKey}`);
        }
        const isGrapheme = isSingleComplexGrapheme(rawKey);
        const key = getNormalizedKey(rawKey);
        const repeat = source.pressed.has(key);
        const code = getKeyCode(rawKey);
        const location = getKeyLocation(rawKey);
        switch (key) {
            case 'Alt':
                source.alt = true;
                break;
            case 'Shift':
                source.shift = true;
                break;
            case 'Control':
                source.ctrl = true;
                break;
            case 'Meta':
                source.meta = true;
                break;
        }
        source.pressed.add(key);
        const { modifiers } = source;
        // --- Platform-specific code begins here ---
        // The spread is a little hack so JS gives us an array of unicode characters
        // to measure.
        const unmodifiedText = getKeyEventUnmodifiedText(key, source, isGrapheme);
        const text = getKeyEventText(code ?? '', source) ?? unmodifiedText;
        let command;
        // The following commands need to be declared because Chromium doesn't
        // handle them. See
        // https://source.chromium.org/chromium/chromium/src/+/refs/heads/main:third_party/blink/renderer/core/editing/editing_behavior.cc;l=169;drc=b8143cf1dfd24842890fcd831c4f5d909bef4fc4;bpv=0;bpt=1.
        if (this.#isMacOS && source.meta) {
            switch (code) {
                case 'KeyA':
                    command = 'SelectAll';
                    break;
                case 'KeyC':
                    command = 'Copy';
                    break;
                case 'KeyV':
                    command = source.shift ? 'PasteAndMatchStyle' : 'Paste';
                    break;
                case 'KeyX':
                    command = 'Cut';
                    break;
                case 'KeyZ':
                    command = source.shift ? 'Redo' : 'Undo';
                    break;
                // Intentionally empty.
            }
        }
        const promises = [
            this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchKeyEvent', {
                type: text ? 'keyDown' : 'rawKeyDown',
                windowsVirtualKeyCode: KeyToKeyCode[key],
                key,
                code,
                text,
                unmodifiedText,
                autoRepeat: repeat,
                isSystemKey: source.alt || undefined,
                location: location < 3 ? location : undefined,
                isKeypad: location === 3,
                modifiers,
                commands: command ? [command] : undefined,
            }),
        ];
        // Drag cancelling happens on escape.
        if (key === 'Escape') {
            if (!source.alt &&
                ((this.#isMacOS && !source.ctrl && !source.meta) || !this.#isMacOS)) {
                promises.push(this.#context.cdpTarget.cdpClient.sendCommand('Input.cancelDragging'));
            }
        }
        await Promise.all(promises);
        // --- Platform-specific code ends here ---
    }
    #dispatchKeyUpAction(source, action) {
        const rawKey = action.value;
        if (!isSingleGrapheme(rawKey)) {
            // https://w3c.github.io/webdriver/#dfn-process-a-key-action
            // WebDriver spec allows a grapheme to be used.
            throw new InvalidArgumentException(`Invalid key value: ${rawKey}`);
        }
        const isGrapheme = isSingleComplexGrapheme(rawKey);
        const key = getNormalizedKey(rawKey);
        if (!source.pressed.has(key)) {
            return;
        }
        const code = getKeyCode(rawKey);
        const location = getKeyLocation(rawKey);
        switch (key) {
            case 'Alt':
                source.alt = false;
                break;
            case 'Shift':
                source.shift = false;
                break;
            case 'Control':
                source.ctrl = false;
                break;
            case 'Meta':
                source.meta = false;
                break;
        }
        source.pressed.delete(key);
        const { modifiers } = source;
        // --- Platform-specific code begins here ---
        // The spread is a little hack so JS gives us an array of unicode characters
        // to measure.
        const unmodifiedText = getKeyEventUnmodifiedText(key, source, isGrapheme);
        const text = getKeyEventText(code ?? '', source) ?? unmodifiedText;
        return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchKeyEvent', {
            type: 'keyUp',
            windowsVirtualKeyCode: KeyToKeyCode[key],
            key,
            code,
            text,
            unmodifiedText,
            location: location < 3 ? location : undefined,
            isSystemKey: source.alt || undefined,
            isKeypad: location === 3,
            modifiers,
        });
        // --- Platform-specific code ends here ---
    }
}
/**
 * Translates a non-grapheme key to either an `undefined` for a special keys, or a single
 * character modified by shift if needed.
 */
const getKeyEventUnmodifiedText = (key, source, isGrapheme) => {
    if (isGrapheme) {
        // Graphemes should be presented as text in the CDP command.
        return key;
    }
    if (key === 'Enter') {
        return '\r';
    }
    // If key is not a single character, it is a normalized key value, and should be
    // presented as key, not text in the CDP command.
    return [...key].length === 1
        ? source.shift
            ? key.toLocaleUpperCase('en-US')
            : key
        : undefined;
};
const getKeyEventText = (code, source) => {
    if (source.ctrl) {
        switch (code) {
            case 'Digit2':
                if (source.shift) {
                    return '\x00';
                }
                break;
            case 'KeyA':
                return '\x01';
            case 'KeyB':
                return '\x02';
            case 'KeyC':
                return '\x03';
            case 'KeyD':
                return '\x04';
            case 'KeyE':
                return '\x05';
            case 'KeyF':
                return '\x06';
            case 'KeyG':
                return '\x07';
            case 'KeyH':
                return '\x08';
            case 'KeyI':
                return '\x09';
            case 'KeyJ':
                return '\x0A';
            case 'KeyK':
                return '\x0B';
            case 'KeyL':
                return '\x0C';
            case 'KeyM':
                return '\x0D';
            case 'KeyN':
                return '\x0E';
            case 'KeyO':
                return '\x0F';
            case 'KeyP':
                return '\x10';
            case 'KeyQ':
                return '\x11';
            case 'KeyR':
                return '\x12';
            case 'KeyS':
                return '\x13';
            case 'KeyT':
                return '\x14';
            case 'KeyU':
                return '\x15';
            case 'KeyV':
                return '\x16';
            case 'KeyW':
                return '\x17';
            case 'KeyX':
                return '\x18';
            case 'KeyY':
                return '\x19';
            case 'KeyZ':
                return '\x1A';
            case 'BracketLeft':
                return '\x1B';
            case 'Backslash':
                return '\x1C';
            case 'BracketRight':
                return '\x1D';
            case 'Digit6':
                if (source.shift) {
                    return '\x1E';
                }
                break;
            case 'Minus':
                return '\x1F';
        }
        return '';
    }
    if (source.alt) {
        return '';
    }
    return;
};
function getCdpButton(button) {
    // https://www.w3.org/TR/pointerevents/#the-button-property
    switch (button) {
        case 0:
            return 'left';
        case 1:
            return 'middle';
        case 2:
            return 'right';
        case 3:
            return 'back';
        case 4:
            return 'forward';
        default:
            return 'none';
    }
}
function getTilt(action) {
    // https://w3c.github.io/pointerevents/#converting-between-tiltx-tilty-and-altitudeangle-azimuthangle
    const altitudeAngle = action.altitudeAngle ?? Math.PI / 2;
    const azimuthAngle = action.azimuthAngle ?? 0;
    let tiltXRadians = 0;
    let tiltYRadians = 0;
    if (altitudeAngle === 0) {
        // the pen is in the X-Y plane
        if (azimuthAngle === 0 || azimuthAngle === 2 * Math.PI) {
            // pen is on positive X axis
            tiltXRadians = Math.PI / 2;
        }
        if (azimuthAngle === Math.PI / 2) {
            // pen is on positive Y axis
            tiltYRadians = Math.PI / 2;
        }
        if (azimuthAngle === Math.PI) {
            // pen is on negative X axis
            tiltXRadians = -Math.PI / 2;
        }
        if (azimuthAngle === (3 * Math.PI) / 2) {
            // pen is on negative Y axis
            tiltYRadians = -Math.PI / 2;
        }
        if (azimuthAngle > 0 && azimuthAngle < Math.PI / 2) {
            tiltXRadians = Math.PI / 2;
            tiltYRadians = Math.PI / 2;
        }
        if (azimuthAngle > Math.PI / 2 && azimuthAngle < Math.PI) {
            tiltXRadians = -Math.PI / 2;
            tiltYRadians = Math.PI / 2;
        }
        if (azimuthAngle > Math.PI && azimuthAngle < (3 * Math.PI) / 2) {
            tiltXRadians = -Math.PI / 2;
            tiltYRadians = -Math.PI / 2;
        }
        if (azimuthAngle > (3 * Math.PI) / 2 && azimuthAngle < 2 * Math.PI) {
            tiltXRadians = Math.PI / 2;
            tiltYRadians = -Math.PI / 2;
        }
    }
    if (altitudeAngle !== 0) {
        const tanAlt = Math.tan(altitudeAngle);
        tiltXRadians = Math.atan(Math.cos(azimuthAngle) / tanAlt);
        tiltYRadians = Math.atan(Math.sin(azimuthAngle) / tanAlt);
    }
    const factor = 180 / Math.PI;
    return {
        tiltX: Math.round(tiltXRadians * factor),
        tiltY: Math.round(tiltYRadians * factor),
    };
}
function getRadii(width, height) {
    return {
        radiusX: width ? width / 2 : 0.5,
        radiusY: height ? height / 2 : 0.5,
    };
}

/**
 * Copyright 2023 Google LLC.
 * Copyright (c) Microsoft Corporation.
 * Copyright 2022 The Chromium Authors.
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
 * Use Mutex class to coordinate local concurrent operations.
 * Once `acquire` promise resolves, you hold the lock and must
 * call `release` function returned by `acquire` to release the
 * lock. Failing to `release` the lock may lead to deadlocks.
 */
class Mutex {
    #locked = false;
    #acquirers = [];
    // This is FIFO.
    acquire() {
        const state = { resolved: false };
        if (this.#locked) {
            return new Promise((resolve) => {
                this.#acquirers.push(() => resolve(this.#release.bind(this, state)));
            });
        }
        this.#locked = true;
        return Promise.resolve(this.#release.bind(this, state));
    }
    #release(state) {
        if (state.resolved) {
            throw new Error('Cannot release more than once.');
        }
        state.resolved = true;
        const resolve = this.#acquirers.shift();
        if (!resolve) {
            this.#locked = false;
            return;
        }
        resolve();
    }
    async run(action) {
        const release = await this.acquire();
        try {
            // Note we need to await here because we want the await to release AFTER
            // that await happens. Returning action() will trigger the release
            // immediately which is counter to what we want.
            const result = await action();
            return result;
        }
        finally {
            release();
        }
    }
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
class InputState {
    cancelList = [];
    #sources = new Map();
    #mutex = new Mutex();
    getOrCreate(id, type, subtype) {
        let source = this.#sources.get(id);
        if (!source) {
            switch (type) {
                case "none" /* SourceType.None */:
                    source = new NoneSource();
                    break;
                case "key" /* SourceType.Key */:
                    source = new KeySource();
                    break;
                case "pointer" /* SourceType.Pointer */: {
                    let pointerId = subtype === "mouse" /* Input.PointerType.Mouse */ ? 0 : 2;
                    const pointerIds = new Set();
                    for (const [, source] of this.#sources) {
                        if (source.type === "pointer" /* SourceType.Pointer */) {
                            pointerIds.add(source.pointerId);
                        }
                    }
                    while (pointerIds.has(pointerId)) {
                        ++pointerId;
                    }
                    source = new PointerSource(pointerId, subtype);
                    break;
                }
                case "wheel" /* SourceType.Wheel */:
                    source = new WheelSource();
                    break;
                default:
                    throw new InvalidArgumentException(`Expected "${"none" /* SourceType.None */}", "${"key" /* SourceType.Key */}", "${"pointer" /* SourceType.Pointer */}", or "${"wheel" /* SourceType.Wheel */}". Found unknown source type ${type}.`);
            }
            this.#sources.set(id, source);
            return source;
        }
        if (source.type !== type) {
            throw new InvalidArgumentException(`Input source type of ${id} is ${source.type}, but received ${type}.`);
        }
        return source;
    }
    get(id) {
        const source = this.#sources.get(id);
        if (!source) {
            throw new UnknownErrorException(`Internal error.`);
        }
        return source;
    }
    getGlobalKeyState() {
        const state = new KeySource();
        for (const [, source] of this.#sources) {
            if (source.type !== "key" /* SourceType.Key */) {
                continue;
            }
            for (const pressed of source.pressed) {
                state.pressed.add(pressed);
            }
            state.alt ||= source.alt;
            state.ctrl ||= source.ctrl;
            state.meta ||= source.meta;
            state.shift ||= source.shift;
        }
        return state;
    }
    get queue() {
        return this.#mutex;
    }
}

export { ActionDispatcher as A, InputState as I, assert as a };
