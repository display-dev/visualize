// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { a as assert, c as TouchError } from './chunk-015.mjs';
import { K as Keyboard, M as Mouse, a as MouseButton, b as Touchscreen } from './chunk-022.mjs';
import { g as Deferred, k as getReadableFromProtocolStream, l as getReadableAsTypedArray, E as EventEmitter, b as debugError } from './chunk-017.mjs';
import { i as isErrorLike } from './chunk-019.mjs';
import { F as FrameManagerEvent, M as MAIN_WORLD } from './chunk-027.mjs';

/**
 * @license
 * Copyright 2020 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * File choosers let you react to the page requesting for a file.
 *
 * @remarks
 * `FileChooser` instances are returned via the {@link Page.waitForFileChooser} method.
 *
 * In browsers, only one file chooser can be opened at a time.
 * All file choosers must be accepted or canceled. Not doing so will prevent
 * subsequent file choosers from appearing.
 *
 * @example
 *
 * ```ts
 * const [fileChooser] = await Promise.all([
 *   page.waitForFileChooser(),
 *   page.click('#upload-file-button'), // some button that triggers file selection
 * ]);
 * await fileChooser.accept(['/tmp/myfile.pdf']);
 * ```
 *
 * @public
 */
class FileChooser {
    #element;
    #multiple;
    #handled = false;
    /**
     * @internal
     */
    constructor(element, multiple) {
        this.#element = element;
        this.#multiple = multiple;
    }
    /**
     * Whether file chooser allow for
     * {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple | multiple}
     * file selection.
     */
    isMultiple() {
        return this.#multiple;
    }
    /**
     * Accept the file chooser request with the given file paths.
     *
     * @remarks This will not validate whether the file paths exists. Also, if a
     * path is relative, then it is resolved against the
     * {@link https://nodejs.org/api/process.html#process_process_cwd | current working directory}.
     * For locals script connecting to remote chrome environments, paths must be
     * absolute.
     */
    async accept(paths) {
        assert(!this.#handled, 'Cannot accept FileChooser which is already handled!');
        this.#handled = true;
        await this.#element.uploadFile(...paths);
    }
    /**
     * Closes the file chooser without selecting any files.
     */
    async cancel() {
        assert(!this.#handled, 'Cannot cancel FileChooser which is already handled!');
        this.#handled = true;
        // XXX: These events should converted to trusted events. Perhaps do this
        // in `DOM.setFileInputFiles`?
        await this.#element.evaluate(element => {
            element.dispatchEvent(new Event('cancel', { bubbles: true }));
        });
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
const _keyDefinitions = {
    '0': { keyCode: 48, key: '0', code: 'Digit0' },
    '1': { keyCode: 49, key: '1', code: 'Digit1' },
    '2': { keyCode: 50, key: '2', code: 'Digit2' },
    '3': { keyCode: 51, key: '3', code: 'Digit3' },
    '4': { keyCode: 52, key: '4', code: 'Digit4' },
    '5': { keyCode: 53, key: '5', code: 'Digit5' },
    '6': { keyCode: 54, key: '6', code: 'Digit6' },
    '7': { keyCode: 55, key: '7', code: 'Digit7' },
    '8': { keyCode: 56, key: '8', code: 'Digit8' },
    '9': { keyCode: 57, key: '9', code: 'Digit9' },
    Power: { key: 'Power', code: 'Power' },
    Eject: { key: 'Eject', code: 'Eject' },
    Abort: { keyCode: 3, code: 'Abort', key: 'Cancel' },
    Help: { keyCode: 6, code: 'Help', key: 'Help' },
    Backspace: { keyCode: 8, code: 'Backspace', key: 'Backspace' },
    Tab: { keyCode: 9, code: 'Tab', key: 'Tab' },
    Numpad5: {
        keyCode: 12,
        shiftKeyCode: 101,
        key: 'Clear',
        code: 'Numpad5',
        shiftKey: '5',
        location: 3,
    },
    NumpadEnter: {
        keyCode: 13,
        code: 'NumpadEnter',
        key: 'Enter',
        text: '\r',
        location: 3,
    },
    Enter: { keyCode: 13, code: 'Enter', key: 'Enter', text: '\r' },
    '\r': { keyCode: 13, code: 'Enter', key: 'Enter', text: '\r' },
    '\n': { keyCode: 13, code: 'Enter', key: 'Enter', text: '\r' },
    ShiftLeft: { keyCode: 16, code: 'ShiftLeft', key: 'Shift', location: 1 },
    ShiftRight: { keyCode: 16, code: 'ShiftRight', key: 'Shift', location: 2 },
    ControlLeft: {
        keyCode: 17,
        code: 'ControlLeft',
        key: 'Control',
        location: 1,
    },
    ControlRight: {
        keyCode: 17,
        code: 'ControlRight',
        key: 'Control',
        location: 2,
    },
    AltLeft: { keyCode: 18, code: 'AltLeft', key: 'Alt', location: 1 },
    AltRight: { keyCode: 18, code: 'AltRight', key: 'Alt', location: 2 },
    Pause: { keyCode: 19, code: 'Pause', key: 'Pause' },
    CapsLock: { keyCode: 20, code: 'CapsLock', key: 'CapsLock' },
    Escape: { keyCode: 27, code: 'Escape', key: 'Escape' },
    Convert: { keyCode: 28, code: 'Convert', key: 'Convert' },
    NonConvert: { keyCode: 29, code: 'NonConvert', key: 'NonConvert' },
    Space: { keyCode: 32, code: 'Space', key: ' ' },
    Numpad9: {
        keyCode: 33,
        shiftKeyCode: 105,
        key: 'PageUp',
        code: 'Numpad9',
        shiftKey: '9',
        location: 3,
    },
    PageUp: { keyCode: 33, code: 'PageUp', key: 'PageUp' },
    Numpad3: {
        keyCode: 34,
        shiftKeyCode: 99,
        key: 'PageDown',
        code: 'Numpad3',
        shiftKey: '3',
        location: 3,
    },
    PageDown: { keyCode: 34, code: 'PageDown', key: 'PageDown' },
    End: { keyCode: 35, code: 'End', key: 'End' },
    Numpad1: {
        keyCode: 35,
        shiftKeyCode: 97,
        key: 'End',
        code: 'Numpad1',
        shiftKey: '1',
        location: 3,
    },
    Home: { keyCode: 36, code: 'Home', key: 'Home' },
    Numpad7: {
        keyCode: 36,
        shiftKeyCode: 103,
        key: 'Home',
        code: 'Numpad7',
        shiftKey: '7',
        location: 3,
    },
    ArrowLeft: { keyCode: 37, code: 'ArrowLeft', key: 'ArrowLeft' },
    Numpad4: {
        keyCode: 37,
        shiftKeyCode: 100,
        key: 'ArrowLeft',
        code: 'Numpad4',
        shiftKey: '4',
        location: 3,
    },
    Numpad8: {
        keyCode: 38,
        shiftKeyCode: 104,
        key: 'ArrowUp',
        code: 'Numpad8',
        shiftKey: '8',
        location: 3,
    },
    ArrowUp: { keyCode: 38, code: 'ArrowUp', key: 'ArrowUp' },
    ArrowRight: { keyCode: 39, code: 'ArrowRight', key: 'ArrowRight' },
    Numpad6: {
        keyCode: 39,
        shiftKeyCode: 102,
        key: 'ArrowRight',
        code: 'Numpad6',
        shiftKey: '6',
        location: 3,
    },
    Numpad2: {
        keyCode: 40,
        shiftKeyCode: 98,
        key: 'ArrowDown',
        code: 'Numpad2',
        shiftKey: '2',
        location: 3,
    },
    ArrowDown: { keyCode: 40, code: 'ArrowDown', key: 'ArrowDown' },
    Select: { keyCode: 41, code: 'Select', key: 'Select' },
    Open: { keyCode: 43, code: 'Open', key: 'Execute' },
    PrintScreen: { keyCode: 44, code: 'PrintScreen', key: 'PrintScreen' },
    Insert: { keyCode: 45, code: 'Insert', key: 'Insert' },
    Numpad0: {
        keyCode: 45,
        shiftKeyCode: 96,
        key: 'Insert',
        code: 'Numpad0',
        shiftKey: '0',
        location: 3,
    },
    Delete: { keyCode: 46, code: 'Delete', key: 'Delete' },
    NumpadDecimal: {
        keyCode: 46,
        shiftKeyCode: 110,
        code: 'NumpadDecimal',
        key: '\u0000',
        shiftKey: '.',
        location: 3,
    },
    Digit0: { keyCode: 48, code: 'Digit0', shiftKey: ')', key: '0' },
    Digit1: { keyCode: 49, code: 'Digit1', shiftKey: '!', key: '1' },
    Digit2: { keyCode: 50, code: 'Digit2', shiftKey: '@', key: '2' },
    Digit3: { keyCode: 51, code: 'Digit3', shiftKey: '#', key: '3' },
    Digit4: { keyCode: 52, code: 'Digit4', shiftKey: '$', key: '4' },
    Digit5: { keyCode: 53, code: 'Digit5', shiftKey: '%', key: '5' },
    Digit6: { keyCode: 54, code: 'Digit6', shiftKey: '^', key: '6' },
    Digit7: { keyCode: 55, code: 'Digit7', shiftKey: '&', key: '7' },
    Digit8: { keyCode: 56, code: 'Digit8', shiftKey: '*', key: '8' },
    Digit9: { keyCode: 57, code: 'Digit9', shiftKey: '(', key: '9' },
    KeyA: { keyCode: 65, code: 'KeyA', shiftKey: 'A', key: 'a' },
    KeyB: { keyCode: 66, code: 'KeyB', shiftKey: 'B', key: 'b' },
    KeyC: { keyCode: 67, code: 'KeyC', shiftKey: 'C', key: 'c' },
    KeyD: { keyCode: 68, code: 'KeyD', shiftKey: 'D', key: 'd' },
    KeyE: { keyCode: 69, code: 'KeyE', shiftKey: 'E', key: 'e' },
    KeyF: { keyCode: 70, code: 'KeyF', shiftKey: 'F', key: 'f' },
    KeyG: { keyCode: 71, code: 'KeyG', shiftKey: 'G', key: 'g' },
    KeyH: { keyCode: 72, code: 'KeyH', shiftKey: 'H', key: 'h' },
    KeyI: { keyCode: 73, code: 'KeyI', shiftKey: 'I', key: 'i' },
    KeyJ: { keyCode: 74, code: 'KeyJ', shiftKey: 'J', key: 'j' },
    KeyK: { keyCode: 75, code: 'KeyK', shiftKey: 'K', key: 'k' },
    KeyL: { keyCode: 76, code: 'KeyL', shiftKey: 'L', key: 'l' },
    KeyM: { keyCode: 77, code: 'KeyM', shiftKey: 'M', key: 'm' },
    KeyN: { keyCode: 78, code: 'KeyN', shiftKey: 'N', key: 'n' },
    KeyO: { keyCode: 79, code: 'KeyO', shiftKey: 'O', key: 'o' },
    KeyP: { keyCode: 80, code: 'KeyP', shiftKey: 'P', key: 'p' },
    KeyQ: { keyCode: 81, code: 'KeyQ', shiftKey: 'Q', key: 'q' },
    KeyR: { keyCode: 82, code: 'KeyR', shiftKey: 'R', key: 'r' },
    KeyS: { keyCode: 83, code: 'KeyS', shiftKey: 'S', key: 's' },
    KeyT: { keyCode: 84, code: 'KeyT', shiftKey: 'T', key: 't' },
    KeyU: { keyCode: 85, code: 'KeyU', shiftKey: 'U', key: 'u' },
    KeyV: { keyCode: 86, code: 'KeyV', shiftKey: 'V', key: 'v' },
    KeyW: { keyCode: 87, code: 'KeyW', shiftKey: 'W', key: 'w' },
    KeyX: { keyCode: 88, code: 'KeyX', shiftKey: 'X', key: 'x' },
    KeyY: { keyCode: 89, code: 'KeyY', shiftKey: 'Y', key: 'y' },
    KeyZ: { keyCode: 90, code: 'KeyZ', shiftKey: 'Z', key: 'z' },
    MetaLeft: { keyCode: 91, code: 'MetaLeft', key: 'Meta', location: 1 },
    MetaRight: { keyCode: 92, code: 'MetaRight', key: 'Meta', location: 2 },
    ContextMenu: { keyCode: 93, code: 'ContextMenu', key: 'ContextMenu' },
    NumpadMultiply: {
        keyCode: 106,
        code: 'NumpadMultiply',
        key: '*',
        location: 3,
    },
    NumpadAdd: { keyCode: 107, code: 'NumpadAdd', key: '+', location: 3 },
    NumpadSubtract: {
        keyCode: 109,
        code: 'NumpadSubtract',
        key: '-',
        location: 3,
    },
    NumpadDivide: { keyCode: 111, code: 'NumpadDivide', key: '/', location: 3 },
    F1: { keyCode: 112, code: 'F1', key: 'F1' },
    F2: { keyCode: 113, code: 'F2', key: 'F2' },
    F3: { keyCode: 114, code: 'F3', key: 'F3' },
    F4: { keyCode: 115, code: 'F4', key: 'F4' },
    F5: { keyCode: 116, code: 'F5', key: 'F5' },
    F6: { keyCode: 117, code: 'F6', key: 'F6' },
    F7: { keyCode: 118, code: 'F7', key: 'F7' },
    F8: { keyCode: 119, code: 'F8', key: 'F8' },
    F9: { keyCode: 120, code: 'F9', key: 'F9' },
    F10: { keyCode: 121, code: 'F10', key: 'F10' },
    F11: { keyCode: 122, code: 'F11', key: 'F11' },
    F12: { keyCode: 123, code: 'F12', key: 'F12' },
    F13: { keyCode: 124, code: 'F13', key: 'F13' },
    F14: { keyCode: 125, code: 'F14', key: 'F14' },
    F15: { keyCode: 126, code: 'F15', key: 'F15' },
    F16: { keyCode: 127, code: 'F16', key: 'F16' },
    F17: { keyCode: 128, code: 'F17', key: 'F17' },
    F18: { keyCode: 129, code: 'F18', key: 'F18' },
    F19: { keyCode: 130, code: 'F19', key: 'F19' },
    F20: { keyCode: 131, code: 'F20', key: 'F20' },
    F21: { keyCode: 132, code: 'F21', key: 'F21' },
    F22: { keyCode: 133, code: 'F22', key: 'F22' },
    F23: { keyCode: 134, code: 'F23', key: 'F23' },
    F24: { keyCode: 135, code: 'F24', key: 'F24' },
    NumLock: { keyCode: 144, code: 'NumLock', key: 'NumLock' },
    ScrollLock: { keyCode: 145, code: 'ScrollLock', key: 'ScrollLock' },
    AudioVolumeMute: {
        keyCode: 173,
        code: 'AudioVolumeMute',
        key: 'AudioVolumeMute',
    },
    AudioVolumeDown: {
        keyCode: 174,
        code: 'AudioVolumeDown',
        key: 'AudioVolumeDown',
    },
    AudioVolumeUp: { keyCode: 175, code: 'AudioVolumeUp', key: 'AudioVolumeUp' },
    MediaTrackNext: {
        keyCode: 176,
        code: 'MediaTrackNext',
        key: 'MediaTrackNext',
    },
    MediaTrackPrevious: {
        keyCode: 177,
        code: 'MediaTrackPrevious',
        key: 'MediaTrackPrevious',
    },
    MediaStop: { keyCode: 178, code: 'MediaStop', key: 'MediaStop' },
    MediaPlayPause: {
        keyCode: 179,
        code: 'MediaPlayPause',
        key: 'MediaPlayPause',
    },
    Semicolon: { keyCode: 186, code: 'Semicolon', shiftKey: ':', key: ';' },
    Equal: { keyCode: 187, code: 'Equal', shiftKey: '+', key: '=' },
    NumpadEqual: { keyCode: 187, code: 'NumpadEqual', key: '=', location: 3 },
    Comma: { keyCode: 188, code: 'Comma', shiftKey: '<', key: ',' },
    Minus: { keyCode: 189, code: 'Minus', shiftKey: '_', key: '-' },
    Period: { keyCode: 190, code: 'Period', shiftKey: '>', key: '.' },
    Slash: { keyCode: 191, code: 'Slash', shiftKey: '?', key: '/' },
    Backquote: { keyCode: 192, code: 'Backquote', shiftKey: '~', key: '`' },
    BracketLeft: { keyCode: 219, code: 'BracketLeft', shiftKey: '{', key: '[' },
    Backslash: { keyCode: 220, code: 'Backslash', shiftKey: '|', key: '\\' },
    BracketRight: { keyCode: 221, code: 'BracketRight', shiftKey: '}', key: ']' },
    Quote: { keyCode: 222, code: 'Quote', shiftKey: '"', key: "'" },
    AltGraph: { keyCode: 225, code: 'AltGraph', key: 'AltGraph' },
    Props: { keyCode: 247, code: 'Props', key: 'CrSel' },
    Cancel: { keyCode: 3, key: 'Cancel', code: 'Abort' },
    Clear: { keyCode: 12, key: 'Clear', code: 'Numpad5', location: 3 },
    Shift: { keyCode: 16, key: 'Shift', code: 'ShiftLeft', location: 1 },
    Control: { keyCode: 17, key: 'Control', code: 'ControlLeft', location: 1 },
    Alt: { keyCode: 18, key: 'Alt', code: 'AltLeft', location: 1 },
    Accept: { keyCode: 30, key: 'Accept' },
    ModeChange: { keyCode: 31, key: 'ModeChange' },
    ' ': { keyCode: 32, key: ' ', code: 'Space' },
    Print: { keyCode: 42, key: 'Print' },
    Execute: { keyCode: 43, key: 'Execute', code: 'Open' },
    '\u0000': { keyCode: 46, key: '\u0000', code: 'NumpadDecimal', location: 3 },
    a: { keyCode: 65, key: 'a', code: 'KeyA' },
    b: { keyCode: 66, key: 'b', code: 'KeyB' },
    c: { keyCode: 67, key: 'c', code: 'KeyC' },
    d: { keyCode: 68, key: 'd', code: 'KeyD' },
    e: { keyCode: 69, key: 'e', code: 'KeyE' },
    f: { keyCode: 70, key: 'f', code: 'KeyF' },
    g: { keyCode: 71, key: 'g', code: 'KeyG' },
    h: { keyCode: 72, key: 'h', code: 'KeyH' },
    i: { keyCode: 73, key: 'i', code: 'KeyI' },
    j: { keyCode: 74, key: 'j', code: 'KeyJ' },
    k: { keyCode: 75, key: 'k', code: 'KeyK' },
    l: { keyCode: 76, key: 'l', code: 'KeyL' },
    m: { keyCode: 77, key: 'm', code: 'KeyM' },
    n: { keyCode: 78, key: 'n', code: 'KeyN' },
    o: { keyCode: 79, key: 'o', code: 'KeyO' },
    p: { keyCode: 80, key: 'p', code: 'KeyP' },
    q: { keyCode: 81, key: 'q', code: 'KeyQ' },
    r: { keyCode: 82, key: 'r', code: 'KeyR' },
    s: { keyCode: 83, key: 's', code: 'KeyS' },
    t: { keyCode: 84, key: 't', code: 'KeyT' },
    u: { keyCode: 85, key: 'u', code: 'KeyU' },
    v: { keyCode: 86, key: 'v', code: 'KeyV' },
    w: { keyCode: 87, key: 'w', code: 'KeyW' },
    x: { keyCode: 88, key: 'x', code: 'KeyX' },
    y: { keyCode: 89, key: 'y', code: 'KeyY' },
    z: { keyCode: 90, key: 'z', code: 'KeyZ' },
    Meta: { keyCode: 91, key: 'Meta', code: 'MetaLeft', location: 1 },
    '*': { keyCode: 106, key: '*', code: 'NumpadMultiply', location: 3 },
    '+': { keyCode: 107, key: '+', code: 'NumpadAdd', location: 3 },
    '-': { keyCode: 109, key: '-', code: 'NumpadSubtract', location: 3 },
    '/': { keyCode: 111, key: '/', code: 'NumpadDivide', location: 3 },
    ';': { keyCode: 186, key: ';', code: 'Semicolon' },
    '=': { keyCode: 187, key: '=', code: 'Equal' },
    ',': { keyCode: 188, key: ',', code: 'Comma' },
    '.': { keyCode: 190, key: '.', code: 'Period' },
    '`': { keyCode: 192, key: '`', code: 'Backquote' },
    '[': { keyCode: 219, key: '[', code: 'BracketLeft' },
    '\\': { keyCode: 220, key: '\\', code: 'Backslash' },
    ']': { keyCode: 221, key: ']', code: 'BracketRight' },
    "'": { keyCode: 222, key: "'", code: 'Quote' },
    Attn: { keyCode: 246, key: 'Attn' },
    CrSel: { keyCode: 247, key: 'CrSel', code: 'Props' },
    ExSel: { keyCode: 248, key: 'ExSel' },
    EraseEof: { keyCode: 249, key: 'EraseEof' },
    Play: { keyCode: 250, key: 'Play' },
    ZoomOut: { keyCode: 251, key: 'ZoomOut' },
    ')': { keyCode: 48, key: ')', code: 'Digit0' },
    '!': { keyCode: 49, key: '!', code: 'Digit1' },
    '@': { keyCode: 50, key: '@', code: 'Digit2' },
    '#': { keyCode: 51, key: '#', code: 'Digit3' },
    $: { keyCode: 52, key: '$', code: 'Digit4' },
    '%': { keyCode: 53, key: '%', code: 'Digit5' },
    '^': { keyCode: 54, key: '^', code: 'Digit6' },
    '&': { keyCode: 55, key: '&', code: 'Digit7' },
    '(': { keyCode: 57, key: '(', code: 'Digit9' },
    A: { keyCode: 65, key: 'A', code: 'KeyA' },
    B: { keyCode: 66, key: 'B', code: 'KeyB' },
    C: { keyCode: 67, key: 'C', code: 'KeyC' },
    D: { keyCode: 68, key: 'D', code: 'KeyD' },
    E: { keyCode: 69, key: 'E', code: 'KeyE' },
    F: { keyCode: 70, key: 'F', code: 'KeyF' },
    G: { keyCode: 71, key: 'G', code: 'KeyG' },
    H: { keyCode: 72, key: 'H', code: 'KeyH' },
    I: { keyCode: 73, key: 'I', code: 'KeyI' },
    J: { keyCode: 74, key: 'J', code: 'KeyJ' },
    K: { keyCode: 75, key: 'K', code: 'KeyK' },
    L: { keyCode: 76, key: 'L', code: 'KeyL' },
    M: { keyCode: 77, key: 'M', code: 'KeyM' },
    N: { keyCode: 78, key: 'N', code: 'KeyN' },
    O: { keyCode: 79, key: 'O', code: 'KeyO' },
    P: { keyCode: 80, key: 'P', code: 'KeyP' },
    Q: { keyCode: 81, key: 'Q', code: 'KeyQ' },
    R: { keyCode: 82, key: 'R', code: 'KeyR' },
    S: { keyCode: 83, key: 'S', code: 'KeyS' },
    T: { keyCode: 84, key: 'T', code: 'KeyT' },
    U: { keyCode: 85, key: 'U', code: 'KeyU' },
    V: { keyCode: 86, key: 'V', code: 'KeyV' },
    W: { keyCode: 87, key: 'W', code: 'KeyW' },
    X: { keyCode: 88, key: 'X', code: 'KeyX' },
    Y: { keyCode: 89, key: 'Y', code: 'KeyY' },
    Z: { keyCode: 90, key: 'Z', code: 'KeyZ' },
    ':': { keyCode: 186, key: ':', code: 'Semicolon' },
    '<': { keyCode: 188, key: '<', code: 'Comma' },
    _: { keyCode: 189, key: '_', code: 'Minus' },
    '>': { keyCode: 190, key: '>', code: 'Period' },
    '?': { keyCode: 191, key: '?', code: 'Slash' },
    '~': { keyCode: 192, key: '~', code: 'Backquote' },
    '{': { keyCode: 219, key: '{', code: 'BracketLeft' },
    '|': { keyCode: 220, key: '|', code: 'Backslash' },
    '}': { keyCode: 221, key: '}', code: 'BracketRight' },
    '"': { keyCode: 222, key: '"', code: 'Quote' },
    SoftLeft: { key: 'SoftLeft', code: 'SoftLeft', location: 4 },
    SoftRight: { key: 'SoftRight', code: 'SoftRight', location: 4 },
    Camera: { keyCode: 44, key: 'Camera', code: 'Camera', location: 4 },
    Call: { key: 'Call', code: 'Call', location: 4 },
    EndCall: { keyCode: 95, key: 'EndCall', code: 'EndCall', location: 4 },
    VolumeDown: {
        keyCode: 182,
        key: 'VolumeDown',
        code: 'VolumeDown',
        location: 4,
    },
    VolumeUp: { keyCode: 183, key: 'VolumeUp', code: 'VolumeUp', location: 4 },
};

/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @internal
 */
class CdpKeyboard extends Keyboard {
    #client;
    #pressedKeys = new Set();
    _modifiers = 0;
    constructor(client) {
        super();
        this.#client = client;
    }
    updateClient(client) {
        this.#client = client;
    }
    async down(key, options = {
        text: undefined,
        commands: [],
    }) {
        const description = this.#keyDescriptionForString(key);
        const autoRepeat = this.#pressedKeys.has(description.code);
        this.#pressedKeys.add(description.code);
        this._modifiers |= this.#modifierBit(description.key);
        const text = options.text === undefined ? description.text : options.text;
        await this.#client.send('Input.dispatchKeyEvent', {
            type: text ? 'keyDown' : 'rawKeyDown',
            modifiers: this._modifiers,
            windowsVirtualKeyCode: description.keyCode,
            code: description.code,
            key: description.key,
            text: text,
            unmodifiedText: text,
            autoRepeat,
            location: description.location,
            isKeypad: description.location === 3,
            commands: options.commands,
        });
    }
    #modifierBit(key) {
        if (key === 'Alt') {
            return 1;
        }
        if (key === 'Control') {
            return 2;
        }
        if (key === 'Meta') {
            return 4;
        }
        if (key === 'Shift') {
            return 8;
        }
        return 0;
    }
    #keyDescriptionForString(keyString) {
        const shift = this._modifiers & 8;
        const description = {
            key: '',
            keyCode: 0,
            code: '',
            text: '',
            location: 0,
        };
        const definition = _keyDefinitions[keyString];
        assert(definition, `Unknown key: "${keyString}"`);
        if (definition.key) {
            description.key = definition.key;
        }
        if (shift && definition.shiftKey) {
            description.key = definition.shiftKey;
        }
        if (definition.keyCode) {
            description.keyCode = definition.keyCode;
        }
        if (shift && definition.shiftKeyCode) {
            description.keyCode = definition.shiftKeyCode;
        }
        if (definition.code) {
            description.code = definition.code;
        }
        if (definition.location) {
            description.location = definition.location;
        }
        if (description.key.length === 1) {
            description.text = description.key;
        }
        if (definition.text) {
            description.text = definition.text;
        }
        if (shift && definition.shiftText) {
            description.text = definition.shiftText;
        }
        // if any modifiers besides shift are pressed, no text should be sent
        if (this._modifiers & -9) {
            description.text = '';
        }
        return description;
    }
    async up(key) {
        const description = this.#keyDescriptionForString(key);
        this._modifiers &= ~this.#modifierBit(description.key);
        this.#pressedKeys.delete(description.code);
        await this.#client.send('Input.dispatchKeyEvent', {
            type: 'keyUp',
            modifiers: this._modifiers,
            key: description.key,
            windowsVirtualKeyCode: description.keyCode,
            code: description.code,
            location: description.location,
        });
    }
    async sendCharacter(char) {
        await this.#client.send('Input.insertText', { text: char });
    }
    charIsKey(char) {
        return !!_keyDefinitions[char];
    }
    async type(text, options = {}) {
        const delay = options.delay || undefined;
        for (const char of text) {
            if (this.charIsKey(char)) {
                await this.press(char, { delay });
            }
            else {
                if (delay) {
                    await new Promise(f => {
                        return setTimeout(f, delay);
                    });
                }
                await this.sendCharacter(char);
            }
        }
    }
    async press(key, options = {}) {
        const { delay = null } = options;
        await this.down(key, options);
        if (delay) {
            await new Promise(f => {
                return setTimeout(f, options.delay);
            });
        }
        await this.up(key);
    }
}
const getFlag = (button) => {
    switch (button) {
        case MouseButton.Left:
            return 1 /* MouseButtonFlag.Left */;
        case MouseButton.Right:
            return 2 /* MouseButtonFlag.Right */;
        case MouseButton.Middle:
            return 4 /* MouseButtonFlag.Middle */;
        case MouseButton.Back:
            return 8 /* MouseButtonFlag.Back */;
        case MouseButton.Forward:
            return 16 /* MouseButtonFlag.Forward */;
    }
};
/**
 * This should match
 * https://source.chromium.org/chromium/chromium/src/+/refs/heads/main:content/browser/renderer_host/input/web_input_event_builders_mac.mm;drc=a61b95c63b0b75c1cfe872d9c8cdf927c226046e;bpv=1;bpt=1;l=221.
 */
const getButtonFromPressedButtons = (buttons) => {
    if (buttons & 1 /* MouseButtonFlag.Left */) {
        return MouseButton.Left;
    }
    else if (buttons & 2 /* MouseButtonFlag.Right */) {
        return MouseButton.Right;
    }
    else if (buttons & 4 /* MouseButtonFlag.Middle */) {
        return MouseButton.Middle;
    }
    else if (buttons & 8 /* MouseButtonFlag.Back */) {
        return MouseButton.Back;
    }
    else if (buttons & 16 /* MouseButtonFlag.Forward */) {
        return MouseButton.Forward;
    }
    return 'none';
};
/**
 * @internal
 */
class CdpMouse extends Mouse {
    #client;
    #keyboard;
    constructor(client, keyboard) {
        super();
        this.#client = client;
        this.#keyboard = keyboard;
    }
    updateClient(client) {
        this.#client = client;
    }
    #_state = {
        position: { x: 0, y: 0 },
        buttons: 0 /* MouseButtonFlag.None */,
    };
    get #state() {
        return Object.assign({ ...this.#_state }, ...this.#transactions);
    }
    // Transactions can run in parallel, so we store each of thme in this array.
    #transactions = [];
    #createTransaction() {
        const transaction = {};
        this.#transactions.push(transaction);
        const popTransaction = () => {
            this.#transactions.splice(this.#transactions.indexOf(transaction), 1);
        };
        return {
            update: (updates) => {
                Object.assign(transaction, updates);
            },
            commit: () => {
                this.#_state = { ...this.#_state, ...transaction };
                popTransaction();
            },
            rollback: popTransaction,
        };
    }
    /**
     * This is a shortcut for a typical update, commit/rollback lifecycle based on
     * the error of the action.
     */
    async #withTransaction(action) {
        const { update, commit, rollback } = this.#createTransaction();
        try {
            await action(update);
            commit();
        }
        catch (error) {
            rollback();
            throw error;
        }
    }
    async reset() {
        const actions = [];
        for (const [flag, button] of [
            [1 /* MouseButtonFlag.Left */, MouseButton.Left],
            [4 /* MouseButtonFlag.Middle */, MouseButton.Middle],
            [2 /* MouseButtonFlag.Right */, MouseButton.Right],
            [16 /* MouseButtonFlag.Forward */, MouseButton.Forward],
            [8 /* MouseButtonFlag.Back */, MouseButton.Back],
        ]) {
            if (this.#state.buttons & flag) {
                actions.push(this.up({ button: button }));
            }
        }
        if (this.#state.position.x !== 0 || this.#state.position.y !== 0) {
            actions.push(this.move(0, 0));
        }
        await Promise.all(actions);
    }
    async move(x, y, options = {}) {
        const { steps = 1 } = options;
        const from = this.#state.position;
        const to = { x, y };
        for (let i = 1; i <= steps; i++) {
            await this.#withTransaction(updateState => {
                updateState({
                    position: {
                        x: from.x + (to.x - from.x) * (i / steps),
                        y: from.y + (to.y - from.y) * (i / steps),
                    },
                });
                const { buttons, position } = this.#state;
                return this.#client.send('Input.dispatchMouseEvent', {
                    type: 'mouseMoved',
                    modifiers: this.#keyboard._modifiers,
                    buttons,
                    button: getButtonFromPressedButtons(buttons),
                    ...position,
                });
            });
        }
    }
    async down(options = {}) {
        const { button = MouseButton.Left, clickCount = 1 } = options;
        const flag = getFlag(button);
        if (!flag) {
            throw new Error(`Unsupported mouse button: ${button}`);
        }
        if (this.#state.buttons & flag) {
            throw new Error(`'${button}' is already pressed.`);
        }
        await this.#withTransaction(updateState => {
            updateState({
                buttons: this.#state.buttons | flag,
            });
            const { buttons, position } = this.#state;
            return this.#client.send('Input.dispatchMouseEvent', {
                type: 'mousePressed',
                modifiers: this.#keyboard._modifiers,
                clickCount,
                buttons,
                button,
                ...position,
            });
        });
    }
    async up(options = {}) {
        const { button = MouseButton.Left, clickCount = 1 } = options;
        const flag = getFlag(button);
        if (!flag) {
            throw new Error(`Unsupported mouse button: ${button}`);
        }
        if (!(this.#state.buttons & flag)) {
            throw new Error(`'${button}' is not pressed.`);
        }
        await this.#withTransaction(updateState => {
            updateState({
                buttons: this.#state.buttons & ~flag,
            });
            const { buttons, position } = this.#state;
            return this.#client.send('Input.dispatchMouseEvent', {
                type: 'mouseReleased',
                modifiers: this.#keyboard._modifiers,
                clickCount,
                buttons,
                button,
                ...position,
            });
        });
    }
    async click(x, y, options = {}) {
        const { delay, count = 1 } = options;
        if (count < 1) {
            throw new Error('Click must occur a positive number of times.');
        }
        const actions = [this.move(x, y)];
        for (let i = 1; i < count; ++i) {
            actions.push(this.down({ ...options, clickCount: i }), this.up({ ...options, clickCount: i }));
        }
        actions.push(this.down({ ...options, clickCount: count }));
        if (typeof delay === 'number') {
            await Promise.all(actions);
            actions.length = 0;
            await new Promise(resolve => {
                setTimeout(resolve, delay);
            });
        }
        actions.push(this.up({ ...options, clickCount: count }));
        await Promise.all(actions);
    }
    async wheel(options = {}) {
        const { deltaX = 0, deltaY = 0 } = options;
        const { position, buttons } = this.#state;
        await this.#client.send('Input.dispatchMouseEvent', {
            type: 'mouseWheel',
            pointerType: 'mouse',
            modifiers: this.#keyboard._modifiers,
            deltaY,
            deltaX,
            buttons,
            ...position,
        });
    }
    async drag(start, target) {
        const promise = new Promise(resolve => {
            this.#client.once('Input.dragIntercepted', event => {
                return resolve(event.data);
            });
        });
        await this.move(start.x, start.y);
        await this.down();
        await this.move(target.x, target.y);
        return await promise;
    }
    async dragEnter(target, data) {
        await this.#client.send('Input.dispatchDragEvent', {
            type: 'dragEnter',
            x: target.x,
            y: target.y,
            modifiers: this.#keyboard._modifiers,
            data,
        });
    }
    async dragOver(target, data) {
        await this.#client.send('Input.dispatchDragEvent', {
            type: 'dragOver',
            x: target.x,
            y: target.y,
            modifiers: this.#keyboard._modifiers,
            data,
        });
    }
    async drop(target, data) {
        await this.#client.send('Input.dispatchDragEvent', {
            type: 'drop',
            x: target.x,
            y: target.y,
            modifiers: this.#keyboard._modifiers,
            data,
        });
    }
    async dragAndDrop(start, target, options = {}) {
        const { delay = null } = options;
        const data = await this.drag(start, target);
        await this.dragEnter(target, data);
        await this.dragOver(target, data);
        if (delay) {
            await new Promise(resolve => {
                return setTimeout(resolve, delay);
            });
        }
        await this.drop(target, data);
        await this.up();
    }
}
/**
 * @internal
 */
class CdpTouchHandle {
    #started = false;
    #touchScreen;
    #touchPoint;
    #client;
    #keyboard;
    constructor(client, touchScreen, keyboard, touchPoint) {
        this.#client = client;
        this.#touchScreen = touchScreen;
        this.#keyboard = keyboard;
        this.#touchPoint = touchPoint;
    }
    updateClient(client) {
        this.#client = client;
    }
    async start() {
        if (this.#started) {
            throw new TouchError('Touch has already started');
        }
        await this.#client.send('Input.dispatchTouchEvent', {
            type: 'touchStart',
            touchPoints: [this.#touchPoint],
            modifiers: this.#keyboard._modifiers,
        });
        this.#started = true;
    }
    move(x, y) {
        this.#touchPoint.x = Math.round(x);
        this.#touchPoint.y = Math.round(y);
        return this.#client.send('Input.dispatchTouchEvent', {
            type: 'touchMove',
            touchPoints: [this.#touchPoint],
            modifiers: this.#keyboard._modifiers,
        });
    }
    async end() {
        await this.#client.send('Input.dispatchTouchEvent', {
            type: 'touchEnd',
            touchPoints: [this.#touchPoint],
            modifiers: this.#keyboard._modifiers,
        });
        this.#touchScreen.removeHandle(this);
    }
}
/**
 * @internal
 */
class CdpTouchscreen extends Touchscreen {
    #client;
    #keyboard;
    constructor(client, keyboard) {
        super();
        this.#client = client;
        this.#keyboard = keyboard;
    }
    updateClient(client) {
        this.#client = client;
        this.touches.forEach(t => {
            t.updateClient(client);
        });
    }
    async touchStart(x, y) {
        const id = this.idGenerator();
        const touchPoint = {
            x: Math.round(x),
            y: Math.round(y),
            radiusX: 0.5,
            radiusY: 0.5,
            force: 0.5,
            id,
        };
        const touch = new CdpTouchHandle(this.#client, this, this.#keyboard, touchPoint);
        await touch.start();
        this.touches.push(touch);
        return touch;
    }
}

/**
 * The Tracing class exposes the tracing audit interface.
 * @remarks
 * You can use `tracing.start` and `tracing.stop` to create a trace file
 * which can be opened in Chrome DevTools or {@link https://chromedevtools.github.io/timeline-viewer/ | timeline viewer}.
 *
 * @example
 *
 * ```ts
 * await page.tracing.start({path: 'trace.json'});
 * await page.goto('https://www.google.com');
 * await page.tracing.stop();
 * ```
 *
 * @public
 */
class Tracing {
    #client;
    #recording = false;
    #path;
    /**
     * @internal
     */
    constructor(client) {
        this.#client = client;
    }
    /**
     * @internal
     */
    updateClient(client) {
        this.#client = client;
    }
    /**
     * Starts a trace for the current page.
     * @remarks
     * Only one trace can be active at a time per browser.
     *
     * @param options - Optional `TracingOptions`.
     */
    async start(options = {}) {
        assert(!this.#recording, 'Cannot start recording trace while already recording trace.');
        const defaultCategories = [
            '-*',
            'devtools.timeline',
            'v8.execute',
            'disabled-by-default-devtools.timeline',
            'disabled-by-default-devtools.timeline.frame',
            'toplevel',
            'blink.console',
            'blink.user_timing',
            'latencyInfo',
            'disabled-by-default-devtools.timeline.stack',
            'disabled-by-default-v8.cpu_profiler',
        ];
        const { path, screenshots = false, categories = defaultCategories } = options;
        if (screenshots) {
            categories.push('disabled-by-default-devtools.screenshot');
        }
        const excludedCategories = categories
            .filter(cat => {
            return cat.startsWith('-');
        })
            .map(cat => {
            return cat.slice(1);
        });
        const includedCategories = categories.filter(cat => {
            return !cat.startsWith('-');
        });
        this.#path = path;
        this.#recording = true;
        await this.#client.send('Tracing.start', {
            transferMode: 'ReturnAsStream',
            traceConfig: {
                excludedCategories,
                includedCategories,
            },
        });
    }
    /**
     * Stops a trace started with the `start` method.
     * @returns Promise which resolves to buffer with trace data.
     */
    async stop() {
        const contentDeferred = Deferred.create();
        this.#client.once('Tracing.tracingComplete', async (event) => {
            try {
                assert(event.stream, 'Missing "stream"');
                const readable = await getReadableFromProtocolStream(this.#client, event.stream);
                const typedArray = await getReadableAsTypedArray(readable, this.#path);
                contentDeferred.resolve(typedArray ?? undefined);
            }
            catch (error) {
                if (isErrorLike(error)) {
                    contentDeferred.reject(error);
                }
                else {
                    contentDeferred.reject(new Error(`Unknown error: ${error}`));
                }
            }
        });
        await this.#client.send('Tracing.end');
        this.#recording = false;
        return await contentDeferred.valueOrThrow();
    }
}

/**
 * @license
 * Copyright 2026 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Represents a registered WebMCP tool available on the page.
 *
 * @public
 */
class WebMCPTool extends EventEmitter {
    #webmcp;
    #backendNodeId;
    #formElement;
    /**
     * Tool name.
     */
    name;
    /**
     * Tool description.
     */
    description;
    /**
     * Schema for the tool's input parameters.
     */
    inputSchema;
    /**
     * Optional annotations for the tool.
     */
    annotations;
    /**
     * Frame the tool was defined for.
     */
    frame;
    /**
     * Source location that defined the tool (if available).
     */
    location;
    /**
     * @internal
     */
    rawStackTrace;
    /**
     * @internal
     */
    constructor(webmcp, tool, frame) {
        super();
        this.#webmcp = webmcp;
        this.name = tool.name;
        this.description = tool.description;
        this.inputSchema = tool.inputSchema;
        this.annotations = tool.annotations;
        this.frame = frame;
        this.#backendNodeId = tool.backendNodeId;
        if (tool.stackTrace?.callFrames.length) {
            this.location = {
                url: tool.stackTrace.callFrames[0].url,
                lineNumber: tool.stackTrace.callFrames[0].lineNumber,
                columnNumber: tool.stackTrace.callFrames[0].columnNumber,
            };
        }
        this.rawStackTrace = tool.stackTrace;
    }
    /**
     * The corresponding ElementHandle when tool was registered via a form.
     */
    get formElement() {
        return (async () => {
            if (this.#formElement && !this.#formElement.disposed) {
                return this.#formElement;
            }
            if (!this.#backendNodeId) {
                return undefined;
            }
            this.#formElement = (await this.frame.worlds[MAIN_WORLD].adoptBackendNode(this.#backendNodeId));
            return this.#formElement;
        })();
    }
    /**
     * Executes tool with input parameters, matching tool's `inputSchema`.
     */
    async execute(input = {}) {
        const { invocationId } = await this.#webmcp.invokeTool(this, input);
        return await new Promise(resolve => {
            const handler = (event) => {
                if (event.id === invocationId) {
                    this.#webmcp.off('toolresponded', handler);
                    resolve(event);
                }
            };
            this.#webmcp.on('toolresponded', handler);
        });
    }
}
/**
 * @public
 */
class WebMCPToolCall {
    /**
     * Tool invocation identifier.
     */
    id;
    /**
     * Tool that was called.
     */
    tool;
    /**
     * The input parameters used for the call.
     */
    input;
    /**
     * @internal
     */
    constructor(invocationId, tool, input) {
        this.id = invocationId;
        this.tool = tool;
        try {
            this.input = JSON.parse(input);
        }
        catch (error) {
            this.input = {};
            debugError(error);
        }
    }
}
/**
 * The experimental WebMCP class provides an API for the WebMCP API.
 *
 * See the
 * {@link https://pptr.dev/guides/webmcp|WebMCP guide}
 * for more details.
 *
 * @example
 *
 * ```ts
 * await page.goto('https://www.example.com');
 * const tools = page.webmcp.tools();
 * for (const tool of tools) {
 *   console.log(`Tool found: ${tool.name} - ${tool.description}`);
 * }
 * ```
 *
 * @experimental
 * @public
 */
class WebMCP extends EventEmitter {
    #client;
    #frameManager;
    #tools = new Map();
    #pendingCalls = new Map();
    #onToolsAdded = (event) => {
        const tools = [];
        for (const tool of event.tools) {
            const frame = this.#frameManager.frame(tool.frameId);
            if (!frame) {
                continue;
            }
            const frameTools = this.#tools.get(tool.frameId) ?? new Map();
            if (!this.#tools.has(tool.frameId)) {
                this.#tools.set(tool.frameId, frameTools);
            }
            const addedTool = new WebMCPTool(this, tool, frame);
            frameTools.set(tool.name, addedTool);
            tools.push(addedTool);
        }
        this.emit('toolsadded', { tools });
    };
    #onToolsRemoved = (event) => {
        const tools = [];
        event.tools.forEach(tool => {
            const removedTool = this.#tools.get(tool.frameId)?.get(tool.name);
            if (removedTool) {
                tools.push(removedTool);
            }
            this.#tools.get(tool.frameId)?.delete(tool.name);
        });
        this.emit('toolsremoved', { tools });
    };
    #onToolInvoked = (event) => {
        const tool = this.#tools.get(event.frameId)?.get(event.toolName);
        if (!tool) {
            return;
        }
        const call = new WebMCPToolCall(event.invocationId, tool, event.input);
        this.#pendingCalls.set(call.id, call);
        tool.emit('toolinvoked', call);
        this.emit('toolinvoked', call);
    };
    #onToolResponded = (event) => {
        const call = this.#pendingCalls.get(event.invocationId);
        if (call) {
            this.#pendingCalls.delete(event.invocationId);
        }
        const response = {
            id: event.invocationId,
            call: call,
            status: event.status,
            output: event.output,
            errorText: event.errorText,
            exception: event.exception,
        };
        this.emit('toolresponded', response);
    };
    #onFrameNavigated = (frame) => {
        this.#pendingCalls.clear();
        const frameTools = this.#tools.get(frame._id);
        if (!frameTools) {
            return;
        }
        const tools = Array.from(frameTools.values());
        this.#tools.delete(frame._id);
        if (tools.length) {
            this.emit('toolsremoved', { tools });
        }
    };
    /**
     * @internal
     */
    constructor(client, frameManager) {
        super();
        this.#client = client;
        this.#frameManager = frameManager;
        this.#frameManager.on(FrameManagerEvent.FrameNavigated, this.#onFrameNavigated);
        this.#bindListeners();
    }
    /**
     * @internal
     */
    async initialize() {
        return await this.#client.send('WebMCP.enable').catch(debugError);
    }
    /**
     * @internal
     */
    async invokeTool(tool, input) {
        // @ts-expect-error WebMCP is not yet in the Protocol types.
        return await this.#client.send('WebMCP.invokeTool', {
            frameId: tool.frame._id,
            toolName: tool.name,
            input,
        });
    }
    /**
     * Gets all WebMCP tools defined by the page.
     */
    tools() {
        return Array.from(this.#tools.values()).flatMap(toolMap => {
            return Array.from(toolMap.values());
        });
    }
    #bindListeners() {
        this.#client.on('WebMCP.toolsAdded', this.#onToolsAdded);
        this.#client.on('WebMCP.toolsRemoved', this.#onToolsRemoved);
        this.#client.on('WebMCP.toolInvoked', this.#onToolInvoked);
        // @ts-expect-error M148 has non-final status type, update expected in M149
        this.#client.on('WebMCP.toolResponded', this.#onToolResponded);
    }
    /**
     * @internal
     */
    updateClient(client) {
        this.#client.off('WebMCP.toolsAdded', this.#onToolsAdded);
        this.#client.off('WebMCP.toolsRemoved', this.#onToolsRemoved);
        this.#client.off('WebMCP.toolInvoked', this.#onToolInvoked);
        // @ts-expect-error M148 has non-final status type, update expected in M149
        this.#client.off('WebMCP.toolResponded', this.#onToolResponded);
        this.#client = client;
        this.#bindListeners();
    }
}

export { CdpKeyboard as C, FileChooser as F, Tracing as T, WebMCP as W, CdpMouse as a, CdpTouchscreen as b };
