// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { u as decode_codepoint, v as foreignNames, w as legacy } from './chunk-000.mjs';
import { r as requireQuerying, a as requireLib } from './chunk-003.mjs';

var hasRequiredDecode_codepoint;

function requireDecode_codepoint () {
	if (hasRequiredDecode_codepoint) return decode_codepoint;
	hasRequiredDecode_codepoint = 1;
	(function (exports) {
		// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
		var _a;
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.replaceCodePoint = exports.fromCodePoint = void 0;
		var decodeMap = new Map([
		    [0, 65533],
		    // C1 Unicode control character reference replacements
		    [128, 8364],
		    [130, 8218],
		    [131, 402],
		    [132, 8222],
		    [133, 8230],
		    [134, 8224],
		    [135, 8225],
		    [136, 710],
		    [137, 8240],
		    [138, 352],
		    [139, 8249],
		    [140, 338],
		    [142, 381],
		    [145, 8216],
		    [146, 8217],
		    [147, 8220],
		    [148, 8221],
		    [149, 8226],
		    [150, 8211],
		    [151, 8212],
		    [152, 732],
		    [153, 8482],
		    [154, 353],
		    [155, 8250],
		    [156, 339],
		    [158, 382],
		    [159, 376],
		]);
		/**
		 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
		 */
		exports.fromCodePoint = 
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
		(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function (codePoint) {
		    var output = "";
		    if (codePoint > 0xffff) {
		        codePoint -= 0x10000;
		        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
		        codePoint = 0xdc00 | (codePoint & 0x3ff);
		    }
		    output += String.fromCharCode(codePoint);
		    return output;
		};
		/**
		 * Replace the given code point with a replacement character if it is a
		 * surrogate or is outside the valid range. Otherwise return the code
		 * point unchanged.
		 */
		function replaceCodePoint(codePoint) {
		    var _a;
		    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
		        return 0xfffd;
		    }
		    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
		}
		exports.replaceCodePoint = replaceCodePoint;
		/**
		 * Replace the code point if relevant, then convert it to a string.
		 *
		 * @deprecated Use `fromCodePoint(replaceCodePoint(codePoint))` instead.
		 * @param codePoint The code point to decode.
		 * @returns The decoded code point.
		 */
		function decodeCodePoint(codePoint) {
		    return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
		}
		exports.default = decodeCodePoint;
		
	} (decode_codepoint));
	return decode_codepoint;
}

var hasRequiredForeignNames;

function requireForeignNames () {
	if (hasRequiredForeignNames) return foreignNames;
	hasRequiredForeignNames = 1;
	Object.defineProperty(foreignNames, "__esModule", { value: true });
	foreignNames.attributeNames = foreignNames.elementNames = void 0;
	foreignNames.elementNames = new Map([
	    "altGlyph",
	    "altGlyphDef",
	    "altGlyphItem",
	    "animateColor",
	    "animateMotion",
	    "animateTransform",
	    "clipPath",
	    "feBlend",
	    "feColorMatrix",
	    "feComponentTransfer",
	    "feComposite",
	    "feConvolveMatrix",
	    "feDiffuseLighting",
	    "feDisplacementMap",
	    "feDistantLight",
	    "feDropShadow",
	    "feFlood",
	    "feFuncA",
	    "feFuncB",
	    "feFuncG",
	    "feFuncR",
	    "feGaussianBlur",
	    "feImage",
	    "feMerge",
	    "feMergeNode",
	    "feMorphology",
	    "feOffset",
	    "fePointLight",
	    "feSpecularLighting",
	    "feSpotLight",
	    "feTile",
	    "feTurbulence",
	    "foreignObject",
	    "glyphRef",
	    "linearGradient",
	    "radialGradient",
	    "textPath",
	].map(function (val) { return [val.toLowerCase(), val]; }));
	foreignNames.attributeNames = new Map([
	    "definitionURL",
	    "attributeName",
	    "attributeType",
	    "baseFrequency",
	    "baseProfile",
	    "calcMode",
	    "clipPathUnits",
	    "diffuseConstant",
	    "edgeMode",
	    "filterUnits",
	    "glyphRef",
	    "gradientTransform",
	    "gradientUnits",
	    "kernelMatrix",
	    "kernelUnitLength",
	    "keyPoints",
	    "keySplines",
	    "keyTimes",
	    "lengthAdjust",
	    "limitingConeAngle",
	    "markerHeight",
	    "markerUnits",
	    "markerWidth",
	    "maskContentUnits",
	    "maskUnits",
	    "numOctaves",
	    "pathLength",
	    "patternContentUnits",
	    "patternTransform",
	    "patternUnits",
	    "pointsAtX",
	    "pointsAtY",
	    "pointsAtZ",
	    "preserveAlpha",
	    "preserveAspectRatio",
	    "primitiveUnits",
	    "refX",
	    "refY",
	    "repeatCount",
	    "repeatDur",
	    "requiredExtensions",
	    "requiredFeatures",
	    "specularConstant",
	    "specularExponent",
	    "spreadMethod",
	    "startOffset",
	    "stdDeviation",
	    "stitchTiles",
	    "surfaceScale",
	    "systemLanguage",
	    "tableValues",
	    "targetX",
	    "targetY",
	    "textLength",
	    "viewBox",
	    "viewTarget",
	    "xChannelSelector",
	    "yChannelSelector",
	    "zoomAndPan",
	].map(function (val) { return [val.toLowerCase(), val]; }));
	return foreignNames;
}

var hasRequiredLegacy;

function requireLegacy () {
	if (hasRequiredLegacy) return legacy;
	hasRequiredLegacy = 1;
	Object.defineProperty(legacy, "__esModule", { value: true });
	legacy.testElement = testElement;
	legacy.getElements = getElements;
	legacy.getElementById = getElementById;
	legacy.getElementsByTagName = getElementsByTagName;
	legacy.getElementsByClassName = getElementsByClassName;
	legacy.getElementsByTagType = getElementsByTagType;
	var domhandler_1 = /*@__PURE__*/ requireLib();
	var querying_js_1 = /*@__PURE__*/ requireQuerying();
	/**
	 * A map of functions to check nodes against.
	 */
	var Checks = {
	    tag_name: function (name) {
	        if (typeof name === "function") {
	            return function (elem) { return (0, domhandler_1.isTag)(elem) && name(elem.name); };
	        }
	        else if (name === "*") {
	            return domhandler_1.isTag;
	        }
	        return function (elem) { return (0, domhandler_1.isTag)(elem) && elem.name === name; };
	    },
	    tag_type: function (type) {
	        if (typeof type === "function") {
	            return function (elem) { return type(elem.type); };
	        }
	        return function (elem) { return elem.type === type; };
	    },
	    tag_contains: function (data) {
	        if (typeof data === "function") {
	            return function (elem) { return (0, domhandler_1.isText)(elem) && data(elem.data); };
	        }
	        return function (elem) { return (0, domhandler_1.isText)(elem) && elem.data === data; };
	    },
	};
	/**
	 * Returns a function to check whether a node has an attribute with a particular
	 * value.
	 *
	 * @param attrib Attribute to check.
	 * @param value Attribute value to look for.
	 * @returns A function to check whether the a node has an attribute with a
	 *   particular value.
	 */
	function getAttribCheck(attrib, value) {
	    if (typeof value === "function") {
	        return function (elem) { return (0, domhandler_1.isTag)(elem) && value(elem.attribs[attrib]); };
	    }
	    return function (elem) { return (0, domhandler_1.isTag)(elem) && elem.attribs[attrib] === value; };
	}
	/**
	 * Returns a function that returns `true` if either of the input functions
	 * returns `true` for a node.
	 *
	 * @param a First function to combine.
	 * @param b Second function to combine.
	 * @returns A function taking a node and returning `true` if either of the input
	 *   functions returns `true` for the node.
	 */
	function combineFuncs(a, b) {
	    return function (elem) { return a(elem) || b(elem); };
	}
	/**
	 * Returns a function that executes all checks in `options` and returns `true`
	 * if any of them match a node.
	 *
	 * @param options An object describing nodes to look for.
	 * @returns A function that executes all checks in `options` and returns `true`
	 *   if any of them match a node.
	 */
	function compileTest(options) {
	    var funcs = Object.keys(options).map(function (key) {
	        var value = options[key];
	        return Object.prototype.hasOwnProperty.call(Checks, key)
	            ? Checks[key](value)
	            : getAttribCheck(key, value);
	    });
	    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
	}
	/**
	 * Checks whether a node matches the description in `options`.
	 *
	 * @category Legacy Query Functions
	 * @param options An object describing nodes to look for.
	 * @param node The element to test.
	 * @returns Whether the element matches the description in `options`.
	 */
	function testElement(options, node) {
	    var test = compileTest(options);
	    return test ? test(node) : true;
	}
	/**
	 * Returns all nodes that match `options`.
	 *
	 * @category Legacy Query Functions
	 * @param options An object describing nodes to look for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes that match `options`.
	 */
	function getElements(options, nodes, recurse, limit) {
	    if (limit === void 0) { limit = Infinity; }
	    var test = compileTest(options);
	    return test ? (0, querying_js_1.filter)(test, nodes, recurse, limit) : [];
	}
	/**
	 * Returns the node with the supplied ID.
	 *
	 * @category Legacy Query Functions
	 * @param id The unique ID attribute value to look for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @returns The node with the supplied ID.
	 */
	function getElementById(id, nodes, recurse) {
	    if (recurse === void 0) { recurse = true; }
	    if (!Array.isArray(nodes))
	        nodes = [nodes];
	    return (0, querying_js_1.findOne)(getAttribCheck("id", id), nodes, recurse);
	}
	/**
	 * Returns all nodes with the supplied `tagName`.
	 *
	 * @category Legacy Query Functions
	 * @param tagName Tag name to search for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes with the supplied `tagName`.
	 */
	function getElementsByTagName(tagName, nodes, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    return (0, querying_js_1.filter)(Checks["tag_name"](tagName), nodes, recurse, limit);
	}
	/**
	 * Returns all nodes with the supplied `className`.
	 *
	 * @category Legacy Query Functions
	 * @param className Class name to search for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes with the supplied `className`.
	 */
	function getElementsByClassName(className, nodes, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    return (0, querying_js_1.filter)(getAttribCheck("class", className), nodes, recurse, limit);
	}
	/**
	 * Returns all nodes with the supplied `type`.
	 *
	 * @category Legacy Query Functions
	 * @param type Element type to look for.
	 * @param nodes Nodes to search through.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes with the supplied `type`.
	 */
	function getElementsByTagType(type, nodes, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    return (0, querying_js_1.filter)(Checks["tag_type"](type), nodes, recurse, limit);
	}
	
	return legacy;
}

export { requireForeignNames as a, requireLegacy as b, requireDecode_codepoint as r };
