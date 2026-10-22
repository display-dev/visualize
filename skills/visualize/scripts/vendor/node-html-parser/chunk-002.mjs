// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { n as node, a as comment, s as sort, r as require$$0, b as attributes, f as filters, p as pseudos, d as aliases, e as subselects, g as pseudoSelectors } from './chunk-000.mjs';
import { r as requireHe } from './chunk-001.mjs';

var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node;
	hasRequiredNode = 1;
	Object.defineProperty(node, "__esModule", { value: true });
	const he_1 = requireHe();
	/**
	 * Node Class as base class for TextNode and HTMLElement.
	 */
	class Node {
	    constructor(parentNode = null, range) {
	        this.parentNode = parentNode;
	        this.childNodes = [];
	        Object.defineProperty(this, 'range', {
	            enumerable: false,
	            writable: true,
	            configurable: true,
	            value: range !== null && range !== void 0 ? range : [-1, -1]
	        });
	    }
	    /**
	     * Remove current node
	     */
	    remove() {
	        if (this.parentNode) {
	            const children = this.parentNode.childNodes;
	            this.parentNode.childNodes = children.filter((child) => {
	                return this !== child;
	            });
	            this.parentNode = null;
	        }
	        return this;
	    }
	    get innerText() {
	        return this.rawText;
	    }
	    get textContent() {
	        return (0, he_1.decode)(this.rawText);
	    }
	    set textContent(val) {
	        this.rawText = (0, he_1.encode)(val);
	    }
	}
	node.default = Node;
	return node;
}

var type = {};

var hasRequiredType;

function requireType () {
	if (hasRequiredType) return type;
	hasRequiredType = 1;
	Object.defineProperty(type, "__esModule", { value: true });
	var NodeType;
	(function (NodeType) {
	    NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
	    NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
	    NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
	})(NodeType || (NodeType = {}));
	type.default = NodeType;
	return type;
}

var hasRequiredComment;

function requireComment () {
	if (hasRequiredComment) return comment;
	hasRequiredComment = 1;
	var __importDefault = (comment && comment.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(comment, "__esModule", { value: true });
	const node_1 = __importDefault(/*@__PURE__*/ requireNode());
	const type_1 = __importDefault(/*@__PURE__*/ requireType());
	class CommentNode extends node_1.default {
	    clone() {
	        return new CommentNode(this.rawText, null, undefined, this.rawTagName);
	    }
	    constructor(rawText, parentNode = null, range, rawTagName = '!--') {
	        super(parentNode, range);
	        this.rawText = rawText;
	        this.rawTagName = rawTagName;
	        /**
	         * Node Type declaration.
	         * @type {Number}
	         */
	        this.nodeType = type_1.default.COMMENT_NODE;
	    }
	    /**
	     * Get unescaped text value of current node and its children.
	     * @return {string} text content
	     */
	    get text() {
	        return this.rawText;
	    }
	    toString() {
	        return `<!--${this.rawText}-->`;
	    }
	}
	comment.default = CommentNode;
	return comment;
}

var html = {};

var boolbase;
var hasRequiredBoolbase;

function requireBoolbase () {
	if (hasRequiredBoolbase) return boolbase;
	hasRequiredBoolbase = 1;
	boolbase = {
		trueFunc: function trueFunc(){
			return true;
		},
		falseFunc: function falseFunc(){
			return false;
		}
	};
	return boolbase;
}

var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort;
	hasRequiredSort = 1;
	Object.defineProperty(sort, "__esModule", { value: true });
	sort.isTraversal = void 0;
	var css_what_1 = require$$0;
	var procedure = new Map([
	    [css_what_1.SelectorType.Universal, 50],
	    [css_what_1.SelectorType.Tag, 30],
	    [css_what_1.SelectorType.Attribute, 1],
	    [css_what_1.SelectorType.Pseudo, 0],
	]);
	function isTraversal(token) {
	    return !procedure.has(token.type);
	}
	sort.isTraversal = isTraversal;
	var attributes = new Map([
	    [css_what_1.AttributeAction.Exists, 10],
	    [css_what_1.AttributeAction.Equals, 8],
	    [css_what_1.AttributeAction.Not, 7],
	    [css_what_1.AttributeAction.Start, 6],
	    [css_what_1.AttributeAction.End, 6],
	    [css_what_1.AttributeAction.Any, 5],
	]);
	/**
	 * Sort the parts of the passed selector,
	 * as there is potential for optimization
	 * (some types of selectors are faster than others)
	 *
	 * @param arr Selector to sort
	 */
	function sortByProcedure(arr) {
	    var procs = arr.map(getProcedure);
	    for (var i = 1; i < arr.length; i++) {
	        var procNew = procs[i];
	        if (procNew < 0)
	            continue;
	        for (var j = i - 1; j >= 0 && procNew < procs[j]; j--) {
	            var token = arr[j + 1];
	            arr[j + 1] = arr[j];
	            arr[j] = token;
	            procs[j + 1] = procs[j];
	            procs[j] = procNew;
	        }
	    }
	}
	sort.default = sortByProcedure;
	function getProcedure(token) {
	    var _a, _b;
	    var proc = (_a = procedure.get(token.type)) !== null && _a !== void 0 ? _a : -1;
	    if (token.type === css_what_1.SelectorType.Attribute) {
	        proc = (_b = attributes.get(token.action)) !== null && _b !== void 0 ? _b : 4;
	        if (token.action === css_what_1.AttributeAction.Equals && token.name === "id") {
	            // Prefer ID selectors (eg. #ID)
	            proc = 9;
	        }
	        if (token.ignoreCase) {
	            /*
	             * IgnoreCase adds some overhead, prefer "normal" token
	             * this is a binary operation, to ensure it's still an int
	             */
	            proc >>= 1;
	        }
	    }
	    else if (token.type === css_what_1.SelectorType.Pseudo) {
	        if (!token.data) {
	            proc = 3;
	        }
	        else if (token.name === "has" || token.name === "contains") {
	            proc = 0; // Expensive in any case
	        }
	        else if (Array.isArray(token.data)) {
	            // Eg. :matches, :not
	            proc = Math.min.apply(Math, token.data.map(function (d) { return Math.min.apply(Math, d.map(getProcedure)); }));
	            // If we have traversals, try to avoid executing this selector
	            if (proc < 0) {
	                proc = 0;
	            }
	        }
	        else {
	            proc = 2;
	        }
	    }
	    return proc;
	}
	
	return sort;
}

var hasRequiredAttributes;

function requireAttributes () {
	if (hasRequiredAttributes) return attributes;
	hasRequiredAttributes = 1;
	var __importDefault = (attributes && attributes.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(attributes, "__esModule", { value: true });
	attributes.attributeRules = void 0;
	var boolbase_1 = __importDefault(requireBoolbase());
	/**
	 * All reserved characters in a regex, used for escaping.
	 *
	 * Taken from XRegExp, (c) 2007-2020 Steven Levithan under the MIT license
	 * https://github.com/slevithan/xregexp/blob/95eeebeb8fac8754d54eafe2b4743661ac1cf028/src/xregexp.js#L794
	 */
	var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
	function escapeRegex(value) {
	    return value.replace(reChars, "\\$&");
	}
	/**
	 * Attributes that are case-insensitive in HTML.
	 *
	 * @private
	 * @see https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors
	 */
	var caseInsensitiveAttributes = new Set([
	    "accept",
	    "accept-charset",
	    "align",
	    "alink",
	    "axis",
	    "bgcolor",
	    "charset",
	    "checked",
	    "clear",
	    "codetype",
	    "color",
	    "compact",
	    "declare",
	    "defer",
	    "dir",
	    "direction",
	    "disabled",
	    "enctype",
	    "face",
	    "frame",
	    "hreflang",
	    "http-equiv",
	    "lang",
	    "language",
	    "link",
	    "media",
	    "method",
	    "multiple",
	    "nohref",
	    "noresize",
	    "noshade",
	    "nowrap",
	    "readonly",
	    "rel",
	    "rev",
	    "rules",
	    "scope",
	    "scrolling",
	    "selected",
	    "shape",
	    "target",
	    "text",
	    "type",
	    "valign",
	    "valuetype",
	    "vlink",
	]);
	function shouldIgnoreCase(selector, options) {
	    return typeof selector.ignoreCase === "boolean"
	        ? selector.ignoreCase
	        : selector.ignoreCase === "quirks"
	            ? !!options.quirksMode
	            : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
	}
	/**
	 * Attribute selectors
	 */
	attributes.attributeRules = {
	    equals: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name;
	        var value = data.value;
	        if (shouldIgnoreCase(data, options)) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    attr.length === value.length &&
	                    attr.toLowerCase() === value &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            return adapter.getAttributeValue(elem, name) === value && next(elem);
	        };
	    },
	    hyphen: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name;
	        var value = data.value;
	        var len = value.length;
	        if (shouldIgnoreCase(data, options)) {
	            value = value.toLowerCase();
	            return function hyphenIC(elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    (attr.length === len || attr.charAt(len) === "-") &&
	                    attr.substr(0, len).toLowerCase() === value &&
	                    next(elem));
	            };
	        }
	        return function hyphen(elem) {
	            var attr = adapter.getAttributeValue(elem, name);
	            return (attr != null &&
	                (attr.length === len || attr.charAt(len) === "-") &&
	                attr.substr(0, len) === value &&
	                next(elem));
	        };
	    },
	    element: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name, value = data.value;
	        if (/\s/.test(value)) {
	            return boolbase_1.default.falseFunc;
	        }
	        var regex = new RegExp("(?:^|\\s)".concat(escapeRegex(value), "(?:$|\\s)"), shouldIgnoreCase(data, options) ? "i" : "");
	        return function element(elem) {
	            var attr = adapter.getAttributeValue(elem, name);
	            return (attr != null &&
	                attr.length >= value.length &&
	                regex.test(attr) &&
	                next(elem));
	        };
	    },
	    exists: function (next, _a, _b) {
	        var name = _a.name;
	        var adapter = _b.adapter;
	        return function (elem) { return adapter.hasAttrib(elem, name) && next(elem); };
	    },
	    start: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name;
	        var value = data.value;
	        var len = value.length;
	        if (len === 0) {
	            return boolbase_1.default.falseFunc;
	        }
	        if (shouldIgnoreCase(data, options)) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    attr.length >= len &&
	                    attr.substr(0, len).toLowerCase() === value &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            var _a;
	            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.startsWith(value)) &&
	                next(elem);
	        };
	    },
	    end: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name;
	        var value = data.value;
	        var len = -value.length;
	        if (len === 0) {
	            return boolbase_1.default.falseFunc;
	        }
	        if (shouldIgnoreCase(data, options)) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var _a;
	                return ((_a = adapter
	                    .getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.substr(len).toLowerCase()) === value && next(elem);
	            };
	        }
	        return function (elem) {
	            var _a;
	            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.endsWith(value)) &&
	                next(elem);
	        };
	    },
	    any: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name, value = data.value;
	        if (value === "") {
	            return boolbase_1.default.falseFunc;
	        }
	        if (shouldIgnoreCase(data, options)) {
	            var regex_1 = new RegExp(escapeRegex(value), "i");
	            return function anyIC(elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return (attr != null &&
	                    attr.length >= value.length &&
	                    regex_1.test(attr) &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            var _a;
	            return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.includes(value)) &&
	                next(elem);
	        };
	    },
	    not: function (next, data, options) {
	        var adapter = options.adapter;
	        var name = data.name;
	        var value = data.value;
	        if (value === "") {
	            return function (elem) {
	                return !!adapter.getAttributeValue(elem, name) && next(elem);
	            };
	        }
	        else if (shouldIgnoreCase(data, options)) {
	            value = value.toLowerCase();
	            return function (elem) {
	                var attr = adapter.getAttributeValue(elem, name);
	                return ((attr == null ||
	                    attr.length !== value.length ||
	                    attr.toLowerCase() !== value) &&
	                    next(elem));
	            };
	        }
	        return function (elem) {
	            return adapter.getAttributeValue(elem, name) !== value && next(elem);
	        };
	    },
	};
	
	return attributes;
}

var lib = {};

var parse = {};

var hasRequiredParse;

function requireParse () {
	if (hasRequiredParse) return parse;
	hasRequiredParse = 1;
	// Following http://www.w3.org/TR/css3-selectors/#nth-child-pseudo
	Object.defineProperty(parse, "__esModule", { value: true });
	parse.parse = void 0;
	// Whitespace as per https://www.w3.org/TR/selectors-3/#lex is " \t\r\n\f"
	var whitespace = new Set([9, 10, 12, 13, 32]);
	var ZERO = "0".charCodeAt(0);
	var NINE = "9".charCodeAt(0);
	/**
	 * Parses an expression.
	 *
	 * @throws An `Error` if parsing fails.
	 * @returns An array containing the integer step size and the integer offset of the nth rule.
	 * @example nthCheck.parse("2n+3"); // returns [2, 3]
	 */
	function parse$1(formula) {
	    formula = formula.trim().toLowerCase();
	    if (formula === "even") {
	        return [2, 0];
	    }
	    else if (formula === "odd") {
	        return [2, 1];
	    }
	    // Parse [ ['-'|'+']? INTEGER? {N} [ S* ['-'|'+'] S* INTEGER ]?
	    var idx = 0;
	    var a = 0;
	    var sign = readSign();
	    var number = readNumber();
	    if (idx < formula.length && formula.charAt(idx) === "n") {
	        idx++;
	        a = sign * (number !== null && number !== void 0 ? number : 1);
	        skipWhitespace();
	        if (idx < formula.length) {
	            sign = readSign();
	            skipWhitespace();
	            number = readNumber();
	        }
	        else {
	            sign = number = 0;
	        }
	    }
	    // Throw if there is anything else
	    if (number === null || idx < formula.length) {
	        throw new Error("n-th rule couldn't be parsed ('".concat(formula, "')"));
	    }
	    return [a, sign * number];
	    function readSign() {
	        if (formula.charAt(idx) === "-") {
	            idx++;
	            return -1;
	        }
	        if (formula.charAt(idx) === "+") {
	            idx++;
	        }
	        return 1;
	    }
	    function readNumber() {
	        var start = idx;
	        var value = 0;
	        while (idx < formula.length &&
	            formula.charCodeAt(idx) >= ZERO &&
	            formula.charCodeAt(idx) <= NINE) {
	            value = value * 10 + (formula.charCodeAt(idx) - ZERO);
	            idx++;
	        }
	        // Return `null` if we didn't read anything.
	        return idx === start ? null : value;
	    }
	    function skipWhitespace() {
	        while (idx < formula.length &&
	            whitespace.has(formula.charCodeAt(idx))) {
	            idx++;
	        }
	    }
	}
	parse.parse = parse$1;
	
	return parse;
}

var compile = {};

var hasRequiredCompile;

function requireCompile () {
	if (hasRequiredCompile) return compile;
	hasRequiredCompile = 1;
	var __importDefault = (compile && compile.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(compile, "__esModule", { value: true });
	compile.generate = compile.compile = void 0;
	var boolbase_1 = __importDefault(requireBoolbase());
	/**
	 * Returns a function that checks if an elements index matches the given rule
	 * highly optimized to return the fastest solution.
	 *
	 * @param parsed A tuple [a, b], as returned by `parse`.
	 * @returns A highly optimized function that returns whether an index matches the nth-check.
	 * @example
	 *
	 * ```js
	 * const check = nthCheck.compile([2, 3]);
	 *
	 * check(0); // `false`
	 * check(1); // `false`
	 * check(2); // `true`
	 * check(3); // `false`
	 * check(4); // `true`
	 * check(5); // `false`
	 * check(6); // `true`
	 * ```
	 */
	function compile$1(parsed) {
	    var a = parsed[0];
	    // Subtract 1 from `b`, to convert from one- to zero-indexed.
	    var b = parsed[1] - 1;
	    /*
	     * When `b <= 0`, `a * n` won't be lead to any matches for `a < 0`.
	     * Besides, the specification states that no elements are
	     * matched when `a` and `b` are 0.
	     *
	     * `b < 0` here as we subtracted 1 from `b` above.
	     */
	    if (b < 0 && a <= 0)
	        return boolbase_1.default.falseFunc;
	    // When `a` is in the range -1..1, it matches any element (so only `b` is checked).
	    if (a === -1)
	        return function (index) { return index <= b; };
	    if (a === 0)
	        return function (index) { return index === b; };
	    // When `b <= 0` and `a === 1`, they match any element.
	    if (a === 1)
	        return b < 0 ? boolbase_1.default.trueFunc : function (index) { return index >= b; };
	    /*
	     * Otherwise, modulo can be used to check if there is a match.
	     *
	     * Modulo doesn't care about the sign, so let's use `a`s absolute value.
	     */
	    var absA = Math.abs(a);
	    // Get `b mod a`, + a if this is negative.
	    var bMod = ((b % absA) + absA) % absA;
	    return a > 1
	        ? function (index) { return index >= b && index % absA === bMod; }
	        : function (index) { return index <= b && index % absA === bMod; };
	}
	compile.compile = compile$1;
	/**
	 * Returns a function that produces a monotonously increasing sequence of indices.
	 *
	 * If the sequence has an end, the returned function will return `null` after
	 * the last index in the sequence.
	 *
	 * @param parsed A tuple [a, b], as returned by `parse`.
	 * @returns A function that produces a sequence of indices.
	 * @example <caption>Always increasing (2n+3)</caption>
	 *
	 * ```js
	 * const gen = nthCheck.generate([2, 3])
	 *
	 * gen() // `1`
	 * gen() // `3`
	 * gen() // `5`
	 * gen() // `8`
	 * gen() // `11`
	 * ```
	 *
	 * @example <caption>With end value (-2n+10)</caption>
	 *
	 * ```js
	 *
	 * const gen = nthCheck.generate([-2, 5]);
	 *
	 * gen() // 0
	 * gen() // 2
	 * gen() // 4
	 * gen() // null
	 * ```
	 */
	function generate(parsed) {
	    var a = parsed[0];
	    // Subtract 1 from `b`, to convert from one- to zero-indexed.
	    var b = parsed[1] - 1;
	    var n = 0;
	    // Make sure to always return an increasing sequence
	    if (a < 0) {
	        var aPos_1 = -a;
	        // Get `b mod a`
	        var minValue_1 = ((b % aPos_1) + aPos_1) % aPos_1;
	        return function () {
	            var val = minValue_1 + aPos_1 * n++;
	            return val > b ? null : val;
	        };
	    }
	    if (a === 0)
	        return b < 0
	            ? // There are no result — always return `null`
	                function () { return null; }
	            : // Return `b` exactly once
	                function () { return (n++ === 0 ? b : null); };
	    if (b < 0) {
	        b += a * Math.ceil(-b / a);
	    }
	    return function () { return a * n++ + b; };
	}
	compile.generate = generate;
	
	return compile;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.sequence = exports.generate = exports.compile = exports.parse = void 0;
		var parse_js_1 = /*@__PURE__*/ requireParse();
		Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_js_1.parse; } });
		var compile_js_1 = /*@__PURE__*/ requireCompile();
		Object.defineProperty(exports, "compile", { enumerable: true, get: function () { return compile_js_1.compile; } });
		Object.defineProperty(exports, "generate", { enumerable: true, get: function () { return compile_js_1.generate; } });
		/**
		 * Parses and compiles a formula to a highly optimized function.
		 * Combination of {@link parse} and {@link compile}.
		 *
		 * If the formula doesn't match any elements,
		 * it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
		 * Otherwise, a function accepting an _index_ is returned, which returns
		 * whether or not the passed _index_ matches the formula.
		 *
		 * Note: The nth-rule starts counting at `1`, the returned function at `0`.
		 *
		 * @param formula The formula to compile.
		 * @example
		 * const check = nthCheck("2n+3");
		 *
		 * check(0); // `false`
		 * check(1); // `false`
		 * check(2); // `true`
		 * check(3); // `false`
		 * check(4); // `true`
		 * check(5); // `false`
		 * check(6); // `true`
		 */
		function nthCheck(formula) {
		    return (0, compile_js_1.compile)((0, parse_js_1.parse)(formula));
		}
		exports.default = nthCheck;
		/**
		 * Parses and compiles a formula to a generator that produces a sequence of indices.
		 * Combination of {@link parse} and {@link generate}.
		 *
		 * @param formula The formula to compile.
		 * @returns A function that produces a sequence of indices.
		 * @example <caption>Always increasing</caption>
		 *
		 * ```js
		 * const gen = nthCheck.sequence('2n+3')
		 *
		 * gen() // `1`
		 * gen() // `3`
		 * gen() // `5`
		 * gen() // `8`
		 * gen() // `11`
		 * ```
		 *
		 * @example <caption>With end value</caption>
		 *
		 * ```js
		 *
		 * const gen = nthCheck.sequence('-2n+5');
		 *
		 * gen() // 0
		 * gen() // 2
		 * gen() // 4
		 * gen() // null
		 * ```
		 */
		function sequence(formula) {
		    return (0, compile_js_1.generate)((0, parse_js_1.parse)(formula));
		}
		exports.sequence = sequence;
		
	} (lib));
	return lib;
}

var hasRequiredFilters;

function requireFilters () {
	if (hasRequiredFilters) return filters;
	hasRequiredFilters = 1;
	(function (exports) {
		var __importDefault = (filters && filters.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.filters = void 0;
		var nth_check_1 = __importDefault(/*@__PURE__*/ requireLib());
		var boolbase_1 = __importDefault(requireBoolbase());
		function getChildFunc(next, adapter) {
		    return function (elem) {
		        var parent = adapter.getParent(elem);
		        return parent != null && adapter.isTag(parent) && next(elem);
		    };
		}
		exports.filters = {
		    contains: function (next, text, _a) {
		        var adapter = _a.adapter;
		        return function contains(elem) {
		            return next(elem) && adapter.getText(elem).includes(text);
		        };
		    },
		    icontains: function (next, text, _a) {
		        var adapter = _a.adapter;
		        var itext = text.toLowerCase();
		        return function icontains(elem) {
		            return (next(elem) &&
		                adapter.getText(elem).toLowerCase().includes(itext));
		        };
		    },
		    // Location specific methods
		    "nth-child": function (next, rule, _a) {
		        var adapter = _a.adapter, equals = _a.equals;
		        var func = (0, nth_check_1.default)(rule);
		        if (func === boolbase_1.default.falseFunc)
		            return boolbase_1.default.falseFunc;
		        if (func === boolbase_1.default.trueFunc)
		            return getChildFunc(next, adapter);
		        return function nthChild(elem) {
		            var siblings = adapter.getSiblings(elem);
		            var pos = 0;
		            for (var i = 0; i < siblings.length; i++) {
		                if (equals(elem, siblings[i]))
		                    break;
		                if (adapter.isTag(siblings[i])) {
		                    pos++;
		                }
		            }
		            return func(pos) && next(elem);
		        };
		    },
		    "nth-last-child": function (next, rule, _a) {
		        var adapter = _a.adapter, equals = _a.equals;
		        var func = (0, nth_check_1.default)(rule);
		        if (func === boolbase_1.default.falseFunc)
		            return boolbase_1.default.falseFunc;
		        if (func === boolbase_1.default.trueFunc)
		            return getChildFunc(next, adapter);
		        return function nthLastChild(elem) {
		            var siblings = adapter.getSiblings(elem);
		            var pos = 0;
		            for (var i = siblings.length - 1; i >= 0; i--) {
		                if (equals(elem, siblings[i]))
		                    break;
		                if (adapter.isTag(siblings[i])) {
		                    pos++;
		                }
		            }
		            return func(pos) && next(elem);
		        };
		    },
		    "nth-of-type": function (next, rule, _a) {
		        var adapter = _a.adapter, equals = _a.equals;
		        var func = (0, nth_check_1.default)(rule);
		        if (func === boolbase_1.default.falseFunc)
		            return boolbase_1.default.falseFunc;
		        if (func === boolbase_1.default.trueFunc)
		            return getChildFunc(next, adapter);
		        return function nthOfType(elem) {
		            var siblings = adapter.getSiblings(elem);
		            var pos = 0;
		            for (var i = 0; i < siblings.length; i++) {
		                var currentSibling = siblings[i];
		                if (equals(elem, currentSibling))
		                    break;
		                if (adapter.isTag(currentSibling) &&
		                    adapter.getName(currentSibling) === adapter.getName(elem)) {
		                    pos++;
		                }
		            }
		            return func(pos) && next(elem);
		        };
		    },
		    "nth-last-of-type": function (next, rule, _a) {
		        var adapter = _a.adapter, equals = _a.equals;
		        var func = (0, nth_check_1.default)(rule);
		        if (func === boolbase_1.default.falseFunc)
		            return boolbase_1.default.falseFunc;
		        if (func === boolbase_1.default.trueFunc)
		            return getChildFunc(next, adapter);
		        return function nthLastOfType(elem) {
		            var siblings = adapter.getSiblings(elem);
		            var pos = 0;
		            for (var i = siblings.length - 1; i >= 0; i--) {
		                var currentSibling = siblings[i];
		                if (equals(elem, currentSibling))
		                    break;
		                if (adapter.isTag(currentSibling) &&
		                    adapter.getName(currentSibling) === adapter.getName(elem)) {
		                    pos++;
		                }
		            }
		            return func(pos) && next(elem);
		        };
		    },
		    // TODO determine the actual root element
		    root: function (next, _rule, _a) {
		        var adapter = _a.adapter;
		        return function (elem) {
		            var parent = adapter.getParent(elem);
		            return (parent == null || !adapter.isTag(parent)) && next(elem);
		        };
		    },
		    scope: function (next, rule, options, context) {
		        var equals = options.equals;
		        if (!context || context.length === 0) {
		            // Equivalent to :root
		            return exports.filters["root"](next, rule, options);
		        }
		        if (context.length === 1) {
		            // NOTE: can't be unpacked, as :has uses this for side-effects
		            return function (elem) { return equals(context[0], elem) && next(elem); };
		        }
		        return function (elem) { return context.includes(elem) && next(elem); };
		    },
		    hover: dynamicStatePseudo("isHovered"),
		    visited: dynamicStatePseudo("isVisited"),
		    active: dynamicStatePseudo("isActive"),
		};
		/**
		 * Dynamic state pseudos. These depend on optional Adapter methods.
		 *
		 * @param name The name of the adapter method to call.
		 * @returns Pseudo for the `filters` object.
		 */
		function dynamicStatePseudo(name) {
		    return function dynamicPseudo(next, _rule, _a) {
		        var adapter = _a.adapter;
		        var func = adapter[name];
		        if (typeof func !== "function") {
		            return boolbase_1.default.falseFunc;
		        }
		        return function active(elem) {
		            return func(elem) && next(elem);
		        };
		    };
		}
		
	} (filters));
	return filters;
}

var hasRequiredPseudos;

function requirePseudos () {
	if (hasRequiredPseudos) return pseudos;
	hasRequiredPseudos = 1;
	Object.defineProperty(pseudos, "__esModule", { value: true });
	pseudos.verifyPseudoArgs = pseudos.pseudos = void 0;
	// While filters are precompiled, pseudos get called when they are needed
	pseudos.pseudos = {
	    empty: function (elem, _a) {
	        var adapter = _a.adapter;
	        return !adapter.getChildren(elem).some(function (elem) {
	            // FIXME: `getText` call is potentially expensive.
	            return adapter.isTag(elem) || adapter.getText(elem) !== "";
	        });
	    },
	    "first-child": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        if (adapter.prevElementSibling) {
	            return adapter.prevElementSibling(elem) == null;
	        }
	        var firstChild = adapter
	            .getSiblings(elem)
	            .find(function (elem) { return adapter.isTag(elem); });
	        return firstChild != null && equals(elem, firstChild);
	    },
	    "last-child": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var siblings = adapter.getSiblings(elem);
	        for (var i = siblings.length - 1; i >= 0; i--) {
	            if (equals(elem, siblings[i]))
	                return true;
	            if (adapter.isTag(siblings[i]))
	                break;
	        }
	        return false;
	    },
	    "first-of-type": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var siblings = adapter.getSiblings(elem);
	        var elemName = adapter.getName(elem);
	        for (var i = 0; i < siblings.length; i++) {
	            var currentSibling = siblings[i];
	            if (equals(elem, currentSibling))
	                return true;
	            if (adapter.isTag(currentSibling) &&
	                adapter.getName(currentSibling) === elemName) {
	                break;
	            }
	        }
	        return false;
	    },
	    "last-of-type": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var siblings = adapter.getSiblings(elem);
	        var elemName = adapter.getName(elem);
	        for (var i = siblings.length - 1; i >= 0; i--) {
	            var currentSibling = siblings[i];
	            if (equals(elem, currentSibling))
	                return true;
	            if (adapter.isTag(currentSibling) &&
	                adapter.getName(currentSibling) === elemName) {
	                break;
	            }
	        }
	        return false;
	    },
	    "only-of-type": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        var elemName = adapter.getName(elem);
	        return adapter
	            .getSiblings(elem)
	            .every(function (sibling) {
	            return equals(elem, sibling) ||
	                !adapter.isTag(sibling) ||
	                adapter.getName(sibling) !== elemName;
	        });
	    },
	    "only-child": function (elem, _a) {
	        var adapter = _a.adapter, equals = _a.equals;
	        return adapter
	            .getSiblings(elem)
	            .every(function (sibling) { return equals(elem, sibling) || !adapter.isTag(sibling); });
	    },
	};
	function verifyPseudoArgs(func, name, subselect, argIndex) {
	    if (subselect === null) {
	        if (func.length > argIndex) {
	            throw new Error("Pseudo-class :".concat(name, " requires an argument"));
	        }
	    }
	    else if (func.length === argIndex) {
	        throw new Error("Pseudo-class :".concat(name, " doesn't have any arguments"));
	    }
	}
	pseudos.verifyPseudoArgs = verifyPseudoArgs;
	
	return pseudos;
}

var hasRequiredAliases;

function requireAliases () {
	if (hasRequiredAliases) return aliases;
	hasRequiredAliases = 1;
	Object.defineProperty(aliases, "__esModule", { value: true });
	aliases.aliases = void 0;
	/**
	 * Aliases are pseudos that are expressed as selectors.
	 */
	aliases.aliases = {
	    // Links
	    "any-link": ":is(a, area, link)[href]",
	    link: ":any-link:not(:visited)",
	    // Forms
	    // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
	    disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
	    enabled: ":not(:disabled)",
	    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
	    required: ":is(input, select, textarea)[required]",
	    optional: ":is(input, select, textarea):not([required])",
	    // JQuery extensions
	    // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
	    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
	    checkbox: "[type=checkbox]",
	    file: "[type=file]",
	    password: "[type=password]",
	    radio: "[type=radio]",
	    reset: "[type=reset]",
	    image: "[type=image]",
	    submit: "[type=submit]",
	    parent: ":not(:empty)",
	    header: ":is(h1, h2, h3, h4, h5, h6)",
	    button: ":is(button, input[type=button])",
	    input: ":is(input, textarea, select, button)",
	    text: "input:is(:not([type!='']), [type=text])",
	};
	
	return aliases;
}

var hasRequiredSubselects;

function requireSubselects () {
	if (hasRequiredSubselects) return subselects;
	hasRequiredSubselects = 1;
	(function (exports) {
		var __spreadArray = (subselects && subselects.__spreadArray) || function (to, from, pack) {
		    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
		        if (ar || !(i in from)) {
		            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
		            ar[i] = from[i];
		        }
		    }
		    return to.concat(ar || Array.prototype.slice.call(from));
		};
		var __importDefault = (subselects && subselects.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.subselects = exports.getNextSiblings = exports.ensureIsTag = exports.PLACEHOLDER_ELEMENT = void 0;
		var boolbase_1 = __importDefault(requireBoolbase());
		var sort_js_1 = requireSort();
		/** Used as a placeholder for :has. Will be replaced with the actual element. */
		exports.PLACEHOLDER_ELEMENT = {};
		function ensureIsTag(next, adapter) {
		    if (next === boolbase_1.default.falseFunc)
		        return boolbase_1.default.falseFunc;
		    return function (elem) { return adapter.isTag(elem) && next(elem); };
		}
		exports.ensureIsTag = ensureIsTag;
		function getNextSiblings(elem, adapter) {
		    var siblings = adapter.getSiblings(elem);
		    if (siblings.length <= 1)
		        return [];
		    var elemIndex = siblings.indexOf(elem);
		    if (elemIndex < 0 || elemIndex === siblings.length - 1)
		        return [];
		    return siblings.slice(elemIndex + 1).filter(adapter.isTag);
		}
		exports.getNextSiblings = getNextSiblings;
		function copyOptions(options) {
		    // Not copied: context, rootFunc
		    return {
		        xmlMode: !!options.xmlMode,
		        lowerCaseAttributeNames: !!options.lowerCaseAttributeNames,
		        lowerCaseTags: !!options.lowerCaseTags,
		        quirksMode: !!options.quirksMode,
		        cacheResults: !!options.cacheResults,
		        pseudos: options.pseudos,
		        adapter: options.adapter,
		        equals: options.equals,
		    };
		}
		var is = function (next, token, options, context, compileToken) {
		    var func = compileToken(token, copyOptions(options), context);
		    return func === boolbase_1.default.trueFunc
		        ? next
		        : func === boolbase_1.default.falseFunc
		            ? boolbase_1.default.falseFunc
		            : function (elem) { return func(elem) && next(elem); };
		};
		/*
		 * :not, :has, :is, :matches and :where have to compile selectors
		 * doing this in src/pseudos.ts would lead to circular dependencies,
		 * so we add them here
		 */
		exports.subselects = {
		    is: is,
		    /**
		     * `:matches` and `:where` are aliases for `:is`.
		     */
		    matches: is,
		    where: is,
		    not: function (next, token, options, context, compileToken) {
		        var func = compileToken(token, copyOptions(options), context);
		        return func === boolbase_1.default.falseFunc
		            ? next
		            : func === boolbase_1.default.trueFunc
		                ? boolbase_1.default.falseFunc
		                : function (elem) { return !func(elem) && next(elem); };
		    },
		    has: function (next, subselect, options, _context, compileToken) {
		        var adapter = options.adapter;
		        var opts = copyOptions(options);
		        opts.relativeSelector = true;
		        var context = subselect.some(function (s) { return s.some(sort_js_1.isTraversal); })
		            ? // Used as a placeholder. Will be replaced with the actual element.
		                [exports.PLACEHOLDER_ELEMENT]
		            : undefined;
		        var compiled = compileToken(subselect, opts, context);
		        if (compiled === boolbase_1.default.falseFunc)
		            return boolbase_1.default.falseFunc;
		        var hasElement = ensureIsTag(compiled, adapter);
		        // If `compiled` is `trueFunc`, we can skip this.
		        if (context && compiled !== boolbase_1.default.trueFunc) {
		            /*
		             * `shouldTestNextSiblings` will only be true if the query starts with
		             * a traversal (sibling or adjacent). That means we will always have a context.
		             */
		            var _a = compiled.shouldTestNextSiblings, shouldTestNextSiblings_1 = _a === void 0 ? false : _a;
		            return function (elem) {
		                if (!next(elem))
		                    return false;
		                context[0] = elem;
		                var childs = adapter.getChildren(elem);
		                var nextElements = shouldTestNextSiblings_1
		                    ? __spreadArray(__spreadArray([], childs, true), getNextSiblings(elem, adapter), true) : childs;
		                return adapter.existsOne(hasElement, nextElements);
		            };
		        }
		        return function (elem) {
		            return next(elem) &&
		                adapter.existsOne(hasElement, adapter.getChildren(elem));
		        };
		    },
		};
		
	} (subselects));
	return subselects;
}

var hasRequiredPseudoSelectors;

function requirePseudoSelectors () {
	if (hasRequiredPseudoSelectors) return pseudoSelectors;
	hasRequiredPseudoSelectors = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.compilePseudoSelector = exports.aliases = exports.pseudos = exports.filters = void 0;
		var css_what_1 = require$$0;
		var filters_js_1 = requireFilters();
		Object.defineProperty(exports, "filters", { enumerable: true, get: function () { return filters_js_1.filters; } });
		var pseudos_js_1 = requirePseudos();
		Object.defineProperty(exports, "pseudos", { enumerable: true, get: function () { return pseudos_js_1.pseudos; } });
		var aliases_js_1 = requireAliases();
		Object.defineProperty(exports, "aliases", { enumerable: true, get: function () { return aliases_js_1.aliases; } });
		var subselects_js_1 = requireSubselects();
		function compilePseudoSelector(next, selector, options, context, compileToken) {
		    var _a;
		    var name = selector.name, data = selector.data;
		    if (Array.isArray(data)) {
		        if (!(name in subselects_js_1.subselects)) {
		            throw new Error("Unknown pseudo-class :".concat(name, "(").concat(data, ")"));
		        }
		        return subselects_js_1.subselects[name](next, data, options, context, compileToken);
		    }
		    var userPseudo = (_a = options.pseudos) === null || _a === void 0 ? void 0 : _a[name];
		    var stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases_js_1.aliases[name];
		    if (typeof stringPseudo === "string") {
		        if (data != null) {
		            throw new Error("Pseudo ".concat(name, " doesn't have any arguments"));
		        }
		        // The alias has to be parsed here, to make sure options are respected.
		        var alias = (0, css_what_1.parse)(stringPseudo);
		        return subselects_js_1.subselects["is"](next, alias, options, context, compileToken);
		    }
		    if (typeof userPseudo === "function") {
		        (0, pseudos_js_1.verifyPseudoArgs)(userPseudo, name, data, 1);
		        return function (elem) { return userPseudo(elem, data) && next(elem); };
		    }
		    if (name in filters_js_1.filters) {
		        return filters_js_1.filters[name](next, data, options, context);
		    }
		    if (name in pseudos_js_1.pseudos) {
		        var pseudo_1 = pseudos_js_1.pseudos[name];
		        (0, pseudos_js_1.verifyPseudoArgs)(pseudo_1, name, data, 2);
		        return function (elem) { return pseudo_1(elem, options, data) && next(elem); };
		    }
		    throw new Error("Unknown pseudo-class :".concat(name));
		}
		exports.compilePseudoSelector = compilePseudoSelector;
		
	} (pseudoSelectors));
	return pseudoSelectors;
}

export { requirePseudoSelectors as a, requireBoolbase as b, requireSort as c, requireSubselects as d, requireType as e, requireNode as f, requireComment as g, html as h, requireAttributes as r };
