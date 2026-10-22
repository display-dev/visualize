/*! axe v4.11.4
 * Copyright (c) 2015 - 2026 Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */
// Adapted for readable module packaging; sources and licenses: ../manifest.json and ../LICENSES.txt.

'use strict';

const chunk000 = require('./chunk-000.cjs');
const chunk002 = require('./chunk-002.cjs');

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var es6Promise = {exports: {}};

var values$2;
var hasRequiredValues$1;

function requireValues$1 () {
	if (hasRequiredValues$1) return values$2;
	hasRequiredValues$1 = 1;
	var parent = /*@__PURE__*/ chunk002.requireValues();

	values$2 = parent;
	return values$2;
}

var values$1;
var hasRequiredValues;

function requireValues () {
	if (hasRequiredValues) return values$1;
	hasRequiredValues = 1;
	var parent = /*@__PURE__*/ requireValues$1();

	values$1 = parent;
	return values$1;
}

var valuesExports = /*@__PURE__*/ requireValues();
const values = /*@__PURE__*/chunk000.getDefaultExportFromCjs(valuesExports);

var lib = {};

var parserContext = {};

var utils = {};

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		function isIdentStart(c) {
		    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c === '-') || (c === '_');
		}
		exports.isIdentStart = isIdentStart;
		function isIdent(c) {
		    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '-' || c === '_';
		}
		exports.isIdent = isIdent;
		function isHex(c) {
		    return (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || (c >= '0' && c <= '9');
		}
		exports.isHex = isHex;
		function escapeIdentifier(s) {
		    var len = s.length;
		    var result = '';
		    var i = 0;
		    while (i < len) {
		        var chr = s.charAt(i);
		        if (exports.identSpecialChars[chr]) {
		            result += '\\' + chr;
		        }
		        else {
		            if (!(chr === '_' || chr === '-' ||
		                (chr >= 'A' && chr <= 'Z') ||
		                (chr >= 'a' && chr <= 'z') ||
		                (i !== 0 && chr >= '0' && chr <= '9'))) {
		                var charCode = chr.charCodeAt(0);
		                if ((charCode & 0xF800) === 0xD800) {
		                    var extraCharCode = s.charCodeAt(i++);
		                    if ((charCode & 0xFC00) !== 0xD800 || (extraCharCode & 0xFC00) !== 0xDC00) {
		                        throw Error('UCS-2(decode): illegal sequence');
		                    }
		                    charCode = ((charCode & 0x3FF) << 10) + (extraCharCode & 0x3FF) + 0x10000;
		                }
		                result += '\\' + charCode.toString(16) + ' ';
		            }
		            else {
		                result += chr;
		            }
		        }
		        i++;
		    }
		    return result;
		}
		exports.escapeIdentifier = escapeIdentifier;
		function escapeStr(s) {
		    var len = s.length;
		    var result = '';
		    var i = 0;
		    var replacement;
		    while (i < len) {
		        var chr = s.charAt(i);
		        if (chr === '"') {
		            chr = '\\"';
		        }
		        else if (chr === '\\') {
		            chr = '\\\\';
		        }
		        else if ((replacement = exports.strReplacementsRev[chr]) !== undefined) {
		            chr = replacement;
		        }
		        result += chr;
		        i++;
		    }
		    return "\"" + result + "\"";
		}
		exports.escapeStr = escapeStr;
		exports.identSpecialChars = {
		    '!': true,
		    '"': true,
		    '#': true,
		    '$': true,
		    '%': true,
		    '&': true,
		    '\'': true,
		    '(': true,
		    ')': true,
		    '*': true,
		    '+': true,
		    ',': true,
		    '.': true,
		    '/': true,
		    ';': true,
		    '<': true,
		    '=': true,
		    '>': true,
		    '?': true,
		    '@': true,
		    '[': true,
		    '\\': true,
		    ']': true,
		    '^': true,
		    '`': true,
		    '{': true,
		    '|': true,
		    '}': true,
		    '~': true
		};
		exports.strReplacementsRev = {
		    '\n': '\\n',
		    '\r': '\\r',
		    '\t': '\\t',
		    '\f': '\\f',
		    '\v': '\\v'
		};
		exports.singleQuoteEscapeChars = {
		    n: '\n',
		    r: '\r',
		    t: '\t',
		    f: '\f',
		    '\\': '\\',
		    '\'': '\''
		};
		exports.doubleQuotesEscapeChars = {
		    n: '\n',
		    r: '\r',
		    t: '\t',
		    f: '\f',
		    '\\': '\\',
		    '"': '"'
		}; 
	} (utils));
	return utils;
}

var hasRequiredParserContext;

function requireParserContext () {
	if (hasRequiredParserContext) return parserContext;
	hasRequiredParserContext = 1;
	Object.defineProperty(parserContext, "__esModule", { value: true });
	var utils_1 = requireUtils();
	function parseCssSelector(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
	    var l = str.length;
	    var chr = '';
	    function getStr(quote, escapeTable) {
	        var result = '';
	        pos++;
	        chr = str.charAt(pos);
	        while (pos < l) {
	            if (chr === quote) {
	                pos++;
	                return result;
	            }
	            else if (chr === '\\') {
	                pos++;
	                chr = str.charAt(pos);
	                var esc = void 0;
	                if (chr === quote) {
	                    result += quote;
	                }
	                else if ((esc = escapeTable[chr]) !== undefined) {
	                    result += esc;
	                }
	                else if (utils_1.isHex(chr)) {
	                    var hex = chr;
	                    pos++;
	                    chr = str.charAt(pos);
	                    while (utils_1.isHex(chr)) {
	                        hex += chr;
	                        pos++;
	                        chr = str.charAt(pos);
	                    }
	                    if (chr === ' ') {
	                        pos++;
	                        chr = str.charAt(pos);
	                    }
	                    result += String.fromCharCode(parseInt(hex, 16));
	                    continue;
	                }
	                else {
	                    result += chr;
	                }
	            }
	            else {
	                result += chr;
	            }
	            pos++;
	            chr = str.charAt(pos);
	        }
	        return result;
	    }
	    function getIdent() {
	        var result = '';
	        chr = str.charAt(pos);
	        while (pos < l) {
	            if (utils_1.isIdent(chr)) {
	                result += chr;
	            }
	            else if (chr === '\\') {
	                pos++;
	                if (pos >= l) {
	                    throw Error('Expected symbol but end of file reached.');
	                }
	                chr = str.charAt(pos);
	                if (utils_1.identSpecialChars[chr]) {
	                    result += chr;
	                }
	                else if (utils_1.isHex(chr)) {
	                    var hex = chr;
	                    pos++;
	                    chr = str.charAt(pos);
	                    while (utils_1.isHex(chr)) {
	                        hex += chr;
	                        pos++;
	                        chr = str.charAt(pos);
	                    }
	                    if (chr === ' ') {
	                        pos++;
	                        chr = str.charAt(pos);
	                    }
	                    result += String.fromCharCode(parseInt(hex, 16));
	                    continue;
	                }
	                else {
	                    result += chr;
	                }
	            }
	            else {
	                return result;
	            }
	            pos++;
	            chr = str.charAt(pos);
	        }
	        return result;
	    }
	    function skipWhitespace() {
	        chr = str.charAt(pos);
	        var result = false;
	        while (chr === ' ' || chr === "\t" || chr === "\n" || chr === "\r" || chr === "\f") {
	            result = true;
	            pos++;
	            chr = str.charAt(pos);
	        }
	        return result;
	    }
	    function parse() {
	        var res = parseSelector();
	        if (pos < l) {
	            throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
	        }
	        return res;
	    }
	    function parseSelector() {
	        var selector = parseSingleSelector();
	        if (!selector) {
	            return null;
	        }
	        var res = selector;
	        chr = str.charAt(pos);
	        while (chr === ',') {
	            pos++;
	            skipWhitespace();
	            if (res.type !== 'selectors') {
	                res = {
	                    type: 'selectors',
	                    selectors: [selector]
	                };
	            }
	            selector = parseSingleSelector();
	            if (!selector) {
	                throw Error('Rule expected after ",".');
	            }
	            res.selectors.push(selector);
	        }
	        return res;
	    }
	    function parseSingleSelector() {
	        skipWhitespace();
	        var selector = {
	            type: 'ruleSet'
	        };
	        var rule = parseRule();
	        if (!rule) {
	            return null;
	        }
	        var currentRule = selector;
	        while (rule) {
	            rule.type = 'rule';
	            currentRule.rule = rule;
	            currentRule = rule;
	            skipWhitespace();
	            chr = str.charAt(pos);
	            if (pos >= l || chr === ',' || chr === ')') {
	                break;
	            }
	            if (ruleNestingOperators[chr]) {
	                var op = chr;
	                pos++;
	                skipWhitespace();
	                rule = parseRule();
	                if (!rule) {
	                    throw Error('Rule expected after "' + op + '".');
	                }
	                rule.nestingOperator = op;
	            }
	            else {
	                rule = parseRule();
	                if (rule) {
	                    rule.nestingOperator = null;
	                }
	            }
	        }
	        return selector;
	    }
	    // @ts-ignore no-overlap
	    function parseRule() {
	        var rule = null;
	        while (pos < l) {
	            chr = str.charAt(pos);
	            if (chr === '*') {
	                pos++;
	                (rule = rule || {}).tagName = '*';
	            }
	            else if (utils_1.isIdentStart(chr) || chr === '\\') {
	                (rule = rule || {}).tagName = getIdent();
	            }
	            else if (chr === '.') {
	                pos++;
	                rule = rule || {};
	                (rule.classNames = rule.classNames || []).push(getIdent());
	            }
	            else if (chr === '#') {
	                pos++;
	                (rule = rule || {}).id = getIdent();
	            }
	            else if (chr === '[') {
	                pos++;
	                skipWhitespace();
	                var attr = {
	                    name: getIdent()
	                };
	                skipWhitespace();
	                // @ts-ignore
	                if (chr === ']') {
	                    pos++;
	                }
	                else {
	                    var operator = '';
	                    if (attrEqualityMods[chr]) {
	                        operator = chr;
	                        pos++;
	                        chr = str.charAt(pos);
	                    }
	                    if (pos >= l) {
	                        throw Error('Expected "=" but end of file reached.');
	                    }
	                    if (chr !== '=') {
	                        throw Error('Expected "=" but "' + chr + '" found.');
	                    }
	                    attr.operator = operator + '=';
	                    pos++;
	                    skipWhitespace();
	                    var attrValue = '';
	                    attr.valueType = 'string';
	                    // @ts-ignore
	                    if (chr === '"') {
	                        attrValue = getStr('"', utils_1.doubleQuotesEscapeChars);
	                        // @ts-ignore
	                    }
	                    else if (chr === '\'') {
	                        attrValue = getStr('\'', utils_1.singleQuoteEscapeChars);
	                        // @ts-ignore
	                    }
	                    else if (substitutesEnabled && chr === '$') {
	                        pos++;
	                        attrValue = getIdent();
	                        attr.valueType = 'substitute';
	                    }
	                    else {
	                        while (pos < l) {
	                            if (chr === ']') {
	                                break;
	                            }
	                            attrValue += chr;
	                            pos++;
	                            chr = str.charAt(pos);
	                        }
	                        attrValue = attrValue.trim();
	                    }
	                    skipWhitespace();
	                    if (pos >= l) {
	                        throw Error('Expected "]" but end of file reached.');
	                    }
	                    if (chr !== ']') {
	                        throw Error('Expected "]" but "' + chr + '" found.');
	                    }
	                    pos++;
	                    attr.value = attrValue;
	                }
	                rule = rule || {};
	                (rule.attrs = rule.attrs || []).push(attr);
	            }
	            else if (chr === ':') {
	                pos++;
	                var pseudoName = getIdent();
	                var pseudo = {
	                    name: pseudoName
	                };
	                // @ts-ignore
	                if (chr === '(') {
	                    pos++;
	                    var value = '';
	                    skipWhitespace();
	                    if (pseudos[pseudoName] === 'selector') {
	                        pseudo.valueType = 'selector';
	                        value = parseSelector();
	                    }
	                    else {
	                        pseudo.valueType = pseudos[pseudoName] || 'string';
	                        // @ts-ignore
	                        if (chr === '"') {
	                            value = getStr('"', utils_1.doubleQuotesEscapeChars);
	                            // @ts-ignore
	                        }
	                        else if (chr === '\'') {
	                            value = getStr('\'', utils_1.singleQuoteEscapeChars);
	                            // @ts-ignore
	                        }
	                        else if (substitutesEnabled && chr === '$') {
	                            pos++;
	                            value = getIdent();
	                            pseudo.valueType = 'substitute';
	                        }
	                        else {
	                            while (pos < l) {
	                                if (chr === ')') {
	                                    break;
	                                }
	                                value += chr;
	                                pos++;
	                                chr = str.charAt(pos);
	                            }
	                            value = value.trim();
	                        }
	                        skipWhitespace();
	                    }
	                    if (pos >= l) {
	                        throw Error('Expected ")" but end of file reached.');
	                    }
	                    if (chr !== ')') {
	                        throw Error('Expected ")" but "' + chr + '" found.');
	                    }
	                    pos++;
	                    pseudo.value = value;
	                }
	                rule = rule || {};
	                (rule.pseudos = rule.pseudos || []).push(pseudo);
	            }
	            else {
	                break;
	            }
	        }
	        return rule;
	    }
	    return parse();
	}
	parserContext.parseCssSelector = parseCssSelector;
	return parserContext;
}

var render = {};

var hasRequiredRender;

function requireRender () {
	if (hasRequiredRender) return render;
	hasRequiredRender = 1;
	Object.defineProperty(render, "__esModule", { value: true });
	var utils_1 = requireUtils();
	function renderEntity(entity) {
	    var res = '';
	    switch (entity.type) {
	        case 'ruleSet':
	            var currentEntity = entity.rule;
	            var parts = [];
	            while (currentEntity) {
	                if (currentEntity.nestingOperator) {
	                    parts.push(currentEntity.nestingOperator);
	                }
	                parts.push(renderEntity(currentEntity));
	                currentEntity = currentEntity.rule;
	            }
	            res = parts.join(' ');
	            break;
	        case 'selectors':
	            res = entity.selectors.map(renderEntity).join(', ');
	            break;
	        case 'rule':
	            if (entity.tagName) {
	                if (entity.tagName === '*') {
	                    res = '*';
	                }
	                else {
	                    res = utils_1.escapeIdentifier(entity.tagName);
	                }
	            }
	            if (entity.id) {
	                res += "#" + utils_1.escapeIdentifier(entity.id);
	            }
	            if (entity.classNames) {
	                res += entity.classNames.map(function (cn) {
	                    return "." + (utils_1.escapeIdentifier(cn));
	                }).join('');
	            }
	            if (entity.attrs) {
	                res += entity.attrs.map(function (attr) {
	                    if ('operator' in attr) {
	                        if (attr.valueType === 'substitute') {
	                            return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
	                        }
	                        else {
	                            return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + utils_1.escapeStr(attr.value) + "]";
	                        }
	                    }
	                    else {
	                        return "[" + utils_1.escapeIdentifier(attr.name) + "]";
	                    }
	                }).join('');
	            }
	            if (entity.pseudos) {
	                res += entity.pseudos.map(function (pseudo) {
	                    if (pseudo.valueType) {
	                        if (pseudo.valueType === 'selector') {
	                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "(" + renderEntity(pseudo.value) + ")";
	                        }
	                        else if (pseudo.valueType === 'substitute') {
	                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "($" + pseudo.value + ")";
	                        }
	                        else if (pseudo.valueType === 'numeric') {
	                            return ":" + utils_1.escapeIdentifier(pseudo.name) + "(" + pseudo.value + ")";
	                        }
	                        else {
	                            return (":" + utils_1.escapeIdentifier(pseudo.name) +
	                                "(" + utils_1.escapeIdentifier(pseudo.value) + ")");
	                        }
	                    }
	                    else {
	                        return ":" + utils_1.escapeIdentifier(pseudo.name);
	                    }
	                }).join('');
	            }
	            break;
	        default:
	            throw Error('Unknown entity type: "' + entity.type + '".');
	    }
	    return res;
	}
	render.renderEntity = renderEntity;
	return render;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	Object.defineProperty(lib, "__esModule", { value: true });
	var parser_context_1 = requireParserContext();
	var render_1 = requireRender();
	var CssSelectorParser = /** @class */ (function () {
	    function CssSelectorParser() {
	        this.pseudos = {};
	        this.attrEqualityMods = {};
	        this.ruleNestingOperators = {};
	        this.substitutesEnabled = false;
	    }
	    CssSelectorParser.prototype.registerSelectorPseudos = function () {
	        var pseudos = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            pseudos[_i] = arguments[_i];
	        }
	        for (var _a = 0, pseudos_1 = pseudos; _a < pseudos_1.length; _a++) {
	            var pseudo = pseudos_1[_a];
	            this.pseudos[pseudo] = 'selector';
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.unregisterSelectorPseudos = function () {
	        var pseudos = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            pseudos[_i] = arguments[_i];
	        }
	        for (var _a = 0, pseudos_2 = pseudos; _a < pseudos_2.length; _a++) {
	            var pseudo = pseudos_2[_a];
	            delete this.pseudos[pseudo];
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.registerNumericPseudos = function () {
	        var pseudos = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            pseudos[_i] = arguments[_i];
	        }
	        for (var _a = 0, pseudos_3 = pseudos; _a < pseudos_3.length; _a++) {
	            var pseudo = pseudos_3[_a];
	            this.pseudos[pseudo] = 'numeric';
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.unregisterNumericPseudos = function () {
	        var pseudos = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            pseudos[_i] = arguments[_i];
	        }
	        for (var _a = 0, pseudos_4 = pseudos; _a < pseudos_4.length; _a++) {
	            var pseudo = pseudos_4[_a];
	            delete this.pseudos[pseudo];
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.registerNestingOperators = function () {
	        var operators = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            operators[_i] = arguments[_i];
	        }
	        for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
	            var operator = operators_1[_a];
	            this.ruleNestingOperators[operator] = true;
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.unregisterNestingOperators = function () {
	        var operators = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            operators[_i] = arguments[_i];
	        }
	        for (var _a = 0, operators_2 = operators; _a < operators_2.length; _a++) {
	            var operator = operators_2[_a];
	            delete this.ruleNestingOperators[operator];
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.registerAttrEqualityMods = function () {
	        var mods = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            mods[_i] = arguments[_i];
	        }
	        for (var _a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
	            var mod = mods_1[_a];
	            this.attrEqualityMods[mod] = true;
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.unregisterAttrEqualityMods = function () {
	        var mods = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            mods[_i] = arguments[_i];
	        }
	        for (var _a = 0, mods_2 = mods; _a < mods_2.length; _a++) {
	            var mod = mods_2[_a];
	            delete this.attrEqualityMods[mod];
	        }
	        return this;
	    };
	    CssSelectorParser.prototype.enableSubstitutes = function () {
	        this.substitutesEnabled = true;
	        return this;
	    };
	    CssSelectorParser.prototype.disableSubstitutes = function () {
	        this.substitutesEnabled = false;
	        return this;
	    };
	    CssSelectorParser.prototype.parse = function (str) {
	        return parser_context_1.parseCssSelector(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
	    };
	    CssSelectorParser.prototype.render = function (path) {
	        return render_1.renderEntity(path).trim();
	    };
	    return CssSelectorParser;
	}());
	lib.CssSelectorParser = CssSelectorParser;
	return lib;
}

var libExports = requireLib();

var custom = {exports: {}};

var _defineLength = {exports: {}};

var d = {exports: {}};

exports._defineLength = _defineLength;
exports.commonjsRequire = commonjsRequire;
exports.custom = custom;
exports.d = d;
exports.es6Promise = es6Promise;
exports.libExports = libExports;
exports.values = values;
