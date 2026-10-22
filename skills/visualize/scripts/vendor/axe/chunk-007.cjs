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

const chunk006 = require('./chunk-006.cjs');
const chunk000 = require('./chunk-000.cjs');

const axe = { version: '4.11.4' };

const definitions = [
  {
    name: 'NA',
    value: 'inapplicable',
    priority: 0,
    group: 'inapplicable'
  },
  {
    name: 'PASS',
    value: 'passed',
    priority: 1,
    group: 'passes'
  },
  {
    name: 'CANTTELL',
    value: 'cantTell',
    priority: 2,
    group: 'incomplete'
  },
  {
    name: 'FAIL',
    value: 'failed',
    priority: 3,
    group: 'violations'
  }
];

const constants = {
  helpUrlBase: 'https://dequeuniversity.com/rules/',
  // Size of a grid square in pixels
  gridSize: 200,
  // At a certain point, looping over an array of elements and using .match on them
  // is slower than just running querySelectorAll again.
  selectorSimilarFilterLimit: 700,
  results: [],
  resultGroups: [],
  resultGroupMap: {},
  impact: Object.freeze(['minor', 'moderate', 'serious', 'critical']),
  preload: Object.freeze({
    /**
     * array of supported & preload(able) asset types.
     */
    assets: ['cssom', 'media'],
    /**
     * timeout value when resolving preload(able) assets
     */
    timeout: 10000
  }),
  allOrigins: '<unsafe_all_origins>',
  sameOrigin: '<same_origin>',
  serializableErrorProps: Object.freeze([
    'message',
    'stack',
    'name',
    'code',
    'ruleId',
    'method'
  ])
};

definitions.forEach(definition => {
  const name = definition.name;
  const value = definition.value;
  const priority = definition.priority;
  const group = definition.group;

  constants[name] = value;
  constants[name + '_PRIO'] = priority;
  constants[name + '_GROUP'] = group;

  constants.results[priority] = value;
  constants.resultGroups[priority] = group;

  constants.resultGroupMap[value] = group;
});

// Freeze everything
Object.freeze(constants.results);
Object.freeze(constants.resultGroups);
Object.freeze(constants.resultGroupMap);
Object.freeze(constants);

const whitespaceRegex = /[\t\r\n\f]/g;

class AbstractVirtualNode {
  constructor() {
    this.parent = undefined;
  }

  get props() {
    throw new Error(
      'VirtualNode class must have a "props" object consisting ' +
        'of "nodeType" and "nodeName" properties'
    );
  }

  get attrNames() {
    throw new Error('VirtualNode class must have an "attrNames" property');
  }

  attr() {
    throw new Error('VirtualNode class must have an "attr" function');
  }

  hasAttr() {
    throw new Error('VirtualNode class must have a "hasAttr" function');
  }

  hasClass(className) {
    // get the value of the class attribute as svgs return a SVGAnimatedString
    // if you access the className property
    const classAttr = this.attr('class');
    if (!classAttr) {
      return false;
    }

    const selector = ' ' + className + ' ';
    return (
      (' ' + classAttr + ' ').replace(whitespaceRegex, ' ').indexOf(selector) >=
      0
    );
  }
}

/**
 * From a list of values, find the one with the greatest weight according to
 * the supplied map
 * @param  {object} params Contains 3 properties:
 * - map: a map indicating the order of values to run in
 *        example: ['small', 'medium', 'large']
 * - values: Array of values to take the highest from
 * - initial: optional starting value
 */
function aggregate(map, values, initial) {
  values = values.slice();
  if (initial) {
    values.push(initial);
  }

  const sorting = values.map(val => map.indexOf(val)).sort(); // Stupid NodeJS array.sort functor doesn't work!!

  return map[sorting.pop()];
}

const { CANTTELL_PRIO, FAIL_PRIO } = constants;
const checkMap = [];
checkMap[constants.PASS_PRIO] = true;
checkMap[constants.CANTTELL_PRIO] = null;
checkMap[constants.FAIL_PRIO] = false;

/**
 * Map over the any / all / none properties
 */
const checkTypes = ['any', 'all', 'none'];
function anyAllNone(obj, functor) {
  return checkTypes.reduce((out, type) => {
    out[type] = (obj[type] || []).map(val => functor(val, type));
    return out;
  }, {});
}

function aggregateChecks(nodeResOriginal) {
  // Create a copy
  const nodeResult = Object.assign({}, nodeResOriginal);

  // map each result value to a priority
  anyAllNone(nodeResult, (check, type) => {
    const i =
      typeof check.result === 'undefined' ? -1 : checkMap.indexOf(check.result);
    // default to cantTell
    check.priority = i !== -1 ? i : constants.CANTTELL_PRIO;

    if (type === 'none') {
      // For none, swap pass and fail outcomes.
      // none-type checks should pass when result is false rather than true.
      if (check.priority === constants.PASS_PRIO) {
        check.priority = constants.FAIL_PRIO;
      } else if (check.priority === constants.FAIL_PRIO) {
        check.priority = constants.PASS_PRIO;
      }
    }
  });

  // Find the result with the highest priority
  const priorities = {
    all: nodeResult.all.reduce((a, b) => Math.max(a, b.priority), 0),
    none: nodeResult.none.reduce((a, b) => Math.max(a, b.priority), 0),
    // get the lowest passing of 'any' defaulting
    // to 0 by wrapping around 4 to 0 (inapplicable)
    any: nodeResult.any.reduce((a, b) => Math.min(a, b.priority), 4) % 4
  };

  nodeResult.priority = Math.max(
    priorities.all,
    priorities.none,
    priorities.any
  );

  // Of each type, filter out all results not matching the final priority
  const impacts = [];
  checkTypes.forEach(type => {
    nodeResult[type] = nodeResult[type].filter(check => {
      return (
        check.priority === nodeResult.priority &&
        check.priority === priorities[type]
      );
    });
    nodeResult[type].forEach(check => impacts.push(check.impact));
  });

  // for failed nodes, define the impact
  if ([CANTTELL_PRIO, FAIL_PRIO].includes(nodeResult.priority)) {
    nodeResult.impact = aggregate(constants.impact, impacts);
  } else {
    nodeResult.impact = null;
  }

  // Delete the old result and priority properties
  anyAllNone(nodeResult, c => {
    delete c.result;
    delete c.priority;
  });

  // Convert the index to a result string value
  nodeResult.result = constants.results[nodeResult.priority];
  delete nodeResult.priority;

  return nodeResult;
}

/**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
function finalizeRuleResult(ruleResult) {
  // we don't use getRule so that this code does not throw but returns
  // the results
  const rule = axe._audit.rules.find(({ id }) => id === ruleResult.id);
  if (rule && rule.impact) {
    ruleResult.nodes.forEach(node => {
      ['any', 'all', 'none'].forEach(checkType => {
        (node[checkType] || []).forEach(checkResult => {
          checkResult.impact = rule.impact;
        });
      });
    });
  }

  Object.assign(ruleResult, aggregateNodeResults(ruleResult.nodes));
  delete ruleResult.nodes;

  return ruleResult;
}

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param	{Array} nodeResults The array of nodes tested by the Rule
 */
function aggregateNodeResults(nodeResults) {
  const ruleResult = {};

  // For each node, retrieve the result and impact
  nodeResults = nodeResults.map(nodeResult => {
    // Known result
    if (nodeResult.any && nodeResult.all && nodeResult.none) {
      return aggregateChecks(nodeResult);
    } else if (Array.isArray(nodeResult.node)) {
      return finalizeRuleResult(nodeResult);
    } else {
      throw new TypeError('Invalid Result type');
    }
  });

  // Aggregate the result
  // If there were no nodes passed in, mark the test as inapplicable
  if (nodeResults && nodeResults.length) {
    const resultList = nodeResults.map(node => node.result);
    ruleResult.result = aggregate(
      constants.results,
      resultList,
      ruleResult.result
    );
  } else {
    ruleResult.result = 'inapplicable';
  }

  // Create an array for each type
  constants.resultGroups.forEach(group => (ruleResult[group] = []));

  // Fill the array with nodes
  nodeResults.forEach(nodeResult => {
    const groupName = constants.resultGroupMap[nodeResult.result];
    ruleResult[groupName].push(nodeResult);
  });

  // Take the highest impact of failed or canttell rules
  let impactGroup = constants.FAIL_GROUP;
  if (ruleResult[impactGroup].length === 0) {
    impactGroup = constants.CANTTELL_GROUP;
  }

  if (ruleResult[impactGroup].length > 0) {
    // Get the impact of all issues
    const impactList = ruleResult[impactGroup].map(failure => failure.impact);

    ruleResult.impact = aggregate(constants.impact, impactList) || null;
  } else {
    ruleResult.impact = null;
  }

  return ruleResult;
}

function copyToGroup(resultObject, subResult, group) {
  const resultCopy = Object.assign({}, subResult);
  resultCopy.nodes = (resultCopy[group] || []).concat();
  constants.resultGroups.forEach(resultGroup => {
    delete resultCopy[resultGroup];
  });
  resultObject[group].push(resultCopy);
}

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
function aggregateResult(results) {
  const resultObject = {};

  // Create an array for each type
  constants.resultGroups.forEach(groupName => (resultObject[groupName] = []));

  // Fill the array with nodes
  results.forEach(subResult => {
    if (subResult.error) {
      copyToGroup(resultObject, subResult, constants.CANTTELL_GROUP);
    } else if (subResult.result === constants.NA) {
      copyToGroup(resultObject, subResult, constants.NA_GROUP);
    } else {
      constants.resultGroups.forEach(group => {
        if (Array.isArray(subResult[group]) && subResult[group].length > 0) {
          copyToGroup(resultObject, subResult, group);
        }
      });
    }
  });
  return resultObject;
}

function areStylesSet(el, styles, stopAt) {
  const styl = window.getComputedStyle(el, null);
  if (!styl) {
    return false;
  }
  for (let i = 0; i < styles.length; ++i) {
    const att = styles[i];
    if (styl.getPropertyValue(att.property) === att.value) {
      return true;
    }
  }
  if (!el.parentNode || el.nodeName.toUpperCase() === stopAt.toUpperCase()) {
    return false;
  }
  return areStylesSet(el.parentNode, styles, stopAt);
}

/**
 * If the first argument is falsy, throw an error using the second argument as a message.
 * @param {boolean} bool
 * @param {string} message
 */
function assert(bool, message) {
  if (!bool) {
    throw new Error(message);
  }
}

/**
 * Escapes a property value of a CSS selector
 * @see https://github.com/mathiasbynens/CSS.escape/
 * @see http://dev.w3.org/csswg/cssom/#serialize-an-identifier
 * @param  {String} value The piece of the selector to escape
 * @return {String}        The escaped selector
 */
function escapeSelector(value) {
  /*eslint no-bitwise: 0, eqeqeq: 0, one-var: 0 */
  const string = String(value);
  const length = string.length;
  let index = -1;
  let codeUnit;
  let result = '';
  const firstCodeUnit = string.charCodeAt(0);
  while (++index < length) {
    codeUnit = string.charCodeAt(index);
    // Note: there’s no need to special-case astral symbols, surrogate
    // pairs, or lone surrogates.

    // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
    // (U+FFFD).
    if (codeUnit == 0x0000) {
      result += '\uFFFD';
      continue;
    }

    if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit == 0x007f ||
      // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      (index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
      (index == 1 &&
        codeUnit >= 0x0030 &&
        codeUnit <= 0x0039 &&
        firstCodeUnit == 0x002d)
    ) {
      // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
      result += '\\' + codeUnit.toString(16) + ' ';
      continue;
    }

    // If the character is the first character and is a `-` (U+002D), and
    // there is no second character, […]
    if (index == 0 && length == 1 && codeUnit == 0x002d) {
      result += '\\' + string.charAt(index);
      continue;
    }

    // If the character is not handled by one of the above rules and is
    // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
    // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
    // U+005A), or [a-z] (U+0061 to U+007A), […]
    if (
      codeUnit >= 0x0080 ||
      codeUnit == 0x002d ||
      codeUnit == 0x005f ||
      (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
      (codeUnit >= 0x0061 && codeUnit <= 0x007a)
    ) {
      // the character itself
      result += string.charAt(index);
      continue;
    }

    // Otherwise, the escaped character.
    // https://drafts.csswg.org/cssom/#escape-a-character
    result += '\\' + string.charAt(index);
  }
  return result;
}

/**
 * Return the list of attributes of a node.
 * @method getNodeAttributes
 * @memberof axe.utils
 * @param {Element} node
 * @deprecated
 * @returns {NamedNodeMap}
 */
function getNodeAttributes(node) {
  // eslint-disable-next-line no-restricted-syntax
  if (node.attributes instanceof window.NamedNodeMap) {
    // eslint-disable-next-line no-restricted-syntax
    return node.attributes;
  }

  // if the attributes property is not of type NamedNodeMap then the DOM
  // has been clobbered. E.g. <form><input name="attributes"></form>.
  // We can clone the node to isolate it and then return the attributes
  return node.cloneNode(false).attributes;
}

var hasRequiredTypedarray;

function requireTypedarray () {
	if (hasRequiredTypedarray) return chunk006.typedarray;
	hasRequiredTypedarray = 1;
	(function (exports) {
		// Beyond this value, index getters/setters (i.e. array[0], array[1]) are so slow to
		// create, and consume so much memory, that the browser appears frozen.
		var MAX_ARRAY_LENGTH = 1e5;

		// Approximations of internal ECMAScript conversion functions
		var ECMAScript = (function () {
			// Stash a copy in case other scripts modify these
			var opts = Object.prototype.toString;
			var ophop = Object.prototype.hasOwnProperty;

			return {
				// Class returns internal [[Class]] property, used to avoid cross-frame instanceof issues:
				Class: function (v) { return opts.call(v).replace(/^\[object *|\]$/g, ''); },
				HasProperty: function (o, p) { return p in o; },
				HasOwnProperty: function (o, p) { return ophop.call(o, p); },
				IsCallable: function (o) { return typeof o === 'function'; },
				ToInt32: function (v) { return v >> 0; },
				ToUint32: function (v) { return v >>> 0; }
			};
		}());

		// Snapshot intrinsics
		var LN2 = Math.LN2;
		var abs = Math.abs;
		var floor = Math.floor;
		var log = Math.log;
		var min = Math.min;
		var pow = Math.pow;
		var round = Math.round;

		function clamp(v, minimum, max) { return v < minimum ? minimum : v > max ? max : v; }

		var getOwnPropNames = Object.getOwnPropertyNames || function (o) {
			if (o !== Object(o)) {
				throw new TypeError('Object.getOwnPropertyNames called on non-object');
			}
			var props = [],
				p;
			for (p in o) {
				if (ECMAScript.HasOwnProperty(o, p)) {
					props.push(p);
				}
			}
			return props;
		};

		// emulate ES5 getter/setter API using legacy APIs
		// http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
		// (second clause tests for Object.defineProperty() in IE<9 that only supports extending DOM prototypes, but
		// note that IE<9 does not support __defineGetter__ or __defineSetter__ so it just renders the method harmless)
		var defineProp;
		if (Object.defineProperty && (function () {
			try {
				Object.defineProperty({}, 'x', {});
				return true;
			} catch (e) {
				return false;
			}
		}())) {
			defineProp = Object.defineProperty;
		} else {
			defineProp = function (o, p, desc) {
				if (!o === Object(o)) {
					throw new TypeError('Object.defineProperty called on non-object');
				}
				if (ECMAScript.HasProperty(desc, 'get') && Object.prototype.__defineGetter__) {
					Object.prototype.__defineGetter__.call(o, p, desc.get);
				}
				if (ECMAScript.HasProperty(desc, 'set') && Object.prototype.__defineSetter__) {
					Object.prototype.__defineSetter__.call(o, p, desc.set);
				}
				if (ECMAScript.HasProperty(desc, 'value')) {
					o[p] = desc.value;
				}
				return o;
			};
		}

		// ES5: lock down object properties
		function configureProperties(obj) {
			if (getOwnPropNames && defineProp) {
				var props = getOwnPropNames(obj),
					i;
				for (i = 0; i < props.length; i += 1) {
					defineProp(obj, props[i], {
						value: obj[props[i]],
						writable: false,
						enumerable: false,
						configurable: false
					});
				}
			}
		}

		// ES5: Make obj[index] an alias for obj._getter(index)/obj._setter(index, value)
		// for index in 0 ... obj.length
		function makeArrayAccessors(obj) {
			if (!defineProp) { return; }

			if (obj.length > MAX_ARRAY_LENGTH) { throw new RangeError('Array too large for polyfill'); }

			function makeArrayAccessor(index) {
				defineProp(obj, index, {
					get: function () { return obj._getter(index); },
					set: function (v) { obj._setter(index, v); },
					enumerable: true,
					configurable: false
				});
			}

			var i;
			for (i = 0; i < obj.length; i += 1) {
				makeArrayAccessor(i);
			}
		}

		// Internal conversion functions:
		//    pack<Type>()   - take a number (interpreted as Type), output a byte array
		//    unpack<Type>() - take a byte array, output a Type-like number

		function as_signed(value, bits) { var s = 32 - bits; return (value << s) >> s; }
		function as_unsigned(value, bits) { var s = 32 - bits; return (value << s) >>> s; }

		function packI8(n) { return [n & 0xff]; }
		function unpackI8(bytes) { return as_signed(bytes[0], 8); }

		function packU8(n) { return [n & 0xff]; }
		function unpackU8(bytes) { return as_unsigned(bytes[0], 8); }

		function packU8Clamped(n) { n = round(Number(n)); return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff]; }

		function packI16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
		function unpackI16(bytes) { return as_signed(bytes[0] << 8 | bytes[1], 16); }

		function packU16(n) { return [(n >> 8) & 0xff, n & 0xff]; }
		function unpackU16(bytes) { return as_unsigned(bytes[0] << 8 | bytes[1], 16); }

		function packI32(n) {
			return [
				(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff
			];
		}
		function unpackI32(bytes) { return as_signed(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

		function packU32(n) {
			return [
				(n >> 24) & 0xff, (n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff
			];
		}
		function unpackU32(bytes) { return as_unsigned(bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], 32); }

		function packIEEE754(v, ebits, fbits) {

			var bias = (1 << (ebits - 1)) - 1;
			var s, e, f,
				i, bits, str, bytes;

			function roundToEven(n) {
				var w = floor(n);
				var fl = n - w;
				if (fl < 0.5) { return w; }
				if (fl > 0.5) { return w + 1; }
				return w % 2 ? w + 1 : w;
			}

			// Compute sign, exponent, fraction
			if (v !== v) {
				// NaN
				// http://dev.w3.org/2006/webapi/WebIDL/#es-type-mapping
				e = (1 << ebits) - 1; f = pow(2, fbits - 1); s = 0;
			} else if (v === Infinity || v === -Infinity) {
				e = (1 << ebits) - 1; f = 0; s = v < 0 ? 1 : 0;
			} else if (v === 0) {
				e = 0; f = 0; s = 1 / v === -Infinity ? 1 : 0;
			} else {
				s = v < 0;
				v = abs(v);

				if (v >= pow(2, 1 - bias)) {
					e = min(floor(log(v) / LN2), 1023);
					f = roundToEven(v / pow(2, e) * pow(2, fbits));
					if (f / pow(2, fbits) >= 2) {
						e = e + 1;
						f = 1;
					}
					if (e > bias) {
						// Overflow
						e = (1 << ebits) - 1;
						f = 0;
					} else {
						// Normalized
						e = e + bias;
						f = f - pow(2, fbits);
					}
				} else {
					// Denormalized
					e = 0;
					f = roundToEven(v / pow(2, 1 - bias - fbits));
				}
			}

			// Pack sign, exponent, fraction
			bits = [];
			for (i = fbits; i; i -= 1) { bits.push(f % 2 ? 1 : 0); f = floor(f / 2); }
			for (i = ebits; i; i -= 1) { bits.push(e % 2 ? 1 : 0); e = floor(e / 2); }
			bits.push(s ? 1 : 0);
			bits.reverse();
			str = bits.join('');

			// Bits to bytes
			bytes = [];
			while (str.length) {
				bytes.push(parseInt(str.substring(0, 8), 2));
				str = str.substring(8);
			}
			return bytes;
		}

		function unpackIEEE754(bytes, ebits, fbits) {

			// Bytes to bits
			var bits = [],
				i, j, b, str,
				bias, s, e, f;

			for (i = bytes.length; i; i -= 1) {
				b = bytes[i - 1];
				for (j = 8; j; j -= 1) {
					bits.push(b % 2 ? 1 : 0); b = b >> 1;
				}
			}
			bits.reverse();
			str = bits.join('');

			// Unpack sign, exponent, fraction
			bias = (1 << (ebits - 1)) - 1;
			s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
			e = parseInt(str.substring(1, 1 + ebits), 2);
			f = parseInt(str.substring(1 + ebits), 2);

			// Produce number
			if (e === (1 << ebits) - 1) {
				return f === 0 ? s * Infinity : NaN;
			} else if (e > 0) {
				// Normalized
				return s * pow(2, e - bias) * (1 + (f / pow(2, fbits)));
			} else if (f !== 0) {
				// Denormalized
				return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
			}
			return s < 0 ? -0 : 0;

		}

		function unpackF64(b) { return unpackIEEE754(b, 11, 52); }
		function packF64(v) { return packIEEE754(v, 11, 52); }
		function unpackF32(b) { return unpackIEEE754(b, 8, 23); }
		function packF32(v) { return packIEEE754(v, 8, 23); }

		//
		// 3 The ArrayBuffer Type
		//

		(function () {

			/** @constructor */
			function ArrayBuffer(length) {
				length = ECMAScript.ToInt32(length);
				if (length < 0) { throw new RangeError('ArrayBuffer size is not a small enough positive integer'); }

				this.byteLength = length;
				this._bytes = [];
				this._bytes.length = length;

				var i;
				for (i = 0; i < this.byteLength; i += 1) {
					this._bytes[i] = 0;
				}

				configureProperties(this);
			}

			exports.ArrayBuffer = exports.ArrayBuffer || ArrayBuffer;

			//
			// 4 The ArrayBufferView Type
			//

			// NOTE: this constructor is not exported
			/** @constructor */
			function ArrayBufferView() {
				// this.buffer = null;
				// this.byteOffset = 0;
				// this.byteLength = 0;
			}

			//
			// 5 The Typed Array View Types
			//

			function makeConstructor(bytesPerElement, pack, unpack) {
				// Each TypedArray type requires a distinct constructor instance with
				// identical logic, which this produces.

				var ctor;
				ctor = function (buffer, byteOffset, length) {
					var array, sequence, i, s;

					if (!arguments.length || typeof arguments[0] === 'number') {
						// Constructor(unsigned long length)
						this.length = ECMAScript.ToInt32(arguments[0]);
						if (length < 0) { throw new RangeError('ArrayBufferView size is not a small enough positive integer'); }

						this.byteLength = this.length * this.BYTES_PER_ELEMENT;
						this.buffer = new ArrayBuffer(this.byteLength);
						this.byteOffset = 0;
					} else if (typeof arguments[0] === 'object' && arguments[0].constructor === ctor) {
						// Constructor(TypedArray array)
						array = arguments[0];

						this.length = array.length;
						this.byteLength = this.length * this.BYTES_PER_ELEMENT;
						this.buffer = new ArrayBuffer(this.byteLength);
						this.byteOffset = 0;

						for (i = 0; i < this.length; i += 1) {
							this._setter(i, array._getter(i));
						}
					} else if (typeof arguments[0] === 'object'
		                 && !(arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
						// Constructor(sequence<type> array)
						sequence = arguments[0];

						this.length = ECMAScript.ToUint32(sequence.length);
						this.byteLength = this.length * this.BYTES_PER_ELEMENT;
						this.buffer = new ArrayBuffer(this.byteLength);
						this.byteOffset = 0;

						for (i = 0; i < this.length; i += 1) {
							s = sequence[i];
							this._setter(i, Number(s));
						}
					} else if (typeof arguments[0] === 'object'
		                 && (arguments[0] instanceof ArrayBuffer || ECMAScript.Class(arguments[0]) === 'ArrayBuffer')) {
						// Constructor(ArrayBuffer buffer,
						//             optional unsigned long byteOffset, optional unsigned long length)
						this.buffer = buffer;

						this.byteOffset = ECMAScript.ToUint32(byteOffset);
						if (this.byteOffset > this.buffer.byteLength) {
							throw new RangeError('byteOffset out of range');
						}

						if (this.byteOffset % this.BYTES_PER_ELEMENT) {
							// The given byteOffset must be a multiple of the element
							// size of the specific type, otherwise an exception is raised.
							throw new RangeError('ArrayBuffer length minus the byteOffset is not a multiple of the element size.');
						}

						if (arguments.length < 3) {
							this.byteLength = this.buffer.byteLength - this.byteOffset;

							if (this.byteLength % this.BYTES_PER_ELEMENT) {
								throw new RangeError('length of buffer minus byteOffset not a multiple of the element size');
							}
							this.length = this.byteLength / this.BYTES_PER_ELEMENT;
						} else {
							this.length = ECMAScript.ToUint32(length);
							this.byteLength = this.length * this.BYTES_PER_ELEMENT;
						}

						if ((this.byteOffset + this.byteLength) > this.buffer.byteLength) {
							throw new RangeError('byteOffset and length reference an area beyond the end of the buffer');
						}
					} else {
						throw new TypeError('Unexpected argument type(s)');
					}

					this.constructor = ctor;

					configureProperties(this);
					makeArrayAccessors(this);
				};

				ctor.prototype = new ArrayBufferView();
				ctor.prototype.BYTES_PER_ELEMENT = bytesPerElement;
				ctor.prototype._pack = pack;
				ctor.prototype._unpack = unpack;
				ctor.BYTES_PER_ELEMENT = bytesPerElement;

				// getter type (unsigned long index);
				ctor.prototype._getter = function (index) {
					if (arguments.length < 1) { throw new SyntaxError('Not enough arguments'); }

					index = ECMAScript.ToUint32(index);
					if (index >= this.length) {
						return undefined;
					}

					var bytes = [];
					for (var i = 0, o = this.byteOffset + (index * this.BYTES_PER_ELEMENT);
						i < this.BYTES_PER_ELEMENT;
						i += 1, o += 1) {
						bytes.push(this.buffer._bytes[o]);
					}
					return this._unpack(bytes);
				};

				// NONSTANDARD: convenience alias for getter: type get(unsigned long index);
				ctor.prototype.get = ctor.prototype._getter;

				// setter void (unsigned long index, type value);
				ctor.prototype._setter = function (index, value) {
					if (arguments.length < 2) { throw new SyntaxError('Not enough arguments'); }

					index = ECMAScript.ToUint32(index);
					if (index < this.length) {
						var bytes = this._pack(value);
						var i;
						var o;
						for (i = 0, o = this.byteOffset + (index * this.BYTES_PER_ELEMENT);
							i < this.BYTES_PER_ELEMENT;
							i += 1, o += 1) {
							this.buffer._bytes[o] = bytes[i];
						}
					}
				};

				// void set(TypedArray array, optional unsigned long offset);
				// void set(sequence<type> array, optional unsigned long offset);
				ctor.prototype.set = function (index, value) { // eslint-disable-line no-unused-vars
					if (arguments.length < 1) { throw new SyntaxError('Not enough arguments'); }
					var array, sequence, offset, len,
						i, s, d,
						byteOffset, byteLength, tmp;

					if (typeof arguments[0] === 'object' && arguments[0].constructor === this.constructor) {
						// void set(TypedArray array, optional unsigned long offset);
						array = arguments[0];
						offset = ECMAScript.ToUint32(arguments[1]);

						if (offset + array.length > this.length) {
							throw new RangeError('Offset plus length of array is out of range');
						}

						byteOffset = this.byteOffset + (offset * this.BYTES_PER_ELEMENT);
						byteLength = array.length * this.BYTES_PER_ELEMENT;

						if (array.buffer === this.buffer) {
							tmp = [];
							for (i = 0, s = array.byteOffset; i < byteLength; i += 1, s += 1) {
								tmp[i] = array.buffer._bytes[s];
							}
							for (i = 0, d = byteOffset; i < byteLength; i += 1, d += 1) {
								this.buffer._bytes[d] = tmp[i];
							}
						} else {
							for (i = 0, s = array.byteOffset, d = byteOffset;
								i < byteLength; i += 1, s += 1, d += 1) {
								this.buffer._bytes[d] = array.buffer._bytes[s];
							}
						}
					} else if (typeof arguments[0] === 'object' && typeof arguments[0].length !== 'undefined') {
						// void set(sequence<type> array, optional unsigned long offset);
						sequence = arguments[0];
						len = ECMAScript.ToUint32(sequence.length);
						offset = ECMAScript.ToUint32(arguments[1]);

						if (offset + len > this.length) {
							throw new RangeError('Offset plus length of array is out of range');
						}

						for (i = 0; i < len; i += 1) {
							s = sequence[i];
							this._setter(offset + i, Number(s));
						}
					} else {
						throw new TypeError('Unexpected argument type(s)');
					}
				};

				// TypedArray subarray(long begin, optional long end);
				ctor.prototype.subarray = function (start, end) {

					start = ECMAScript.ToInt32(start);
					end = ECMAScript.ToInt32(end);

					if (arguments.length < 1) { start = 0; }
					if (arguments.length < 2) { end = this.length; }

					if (start < 0) { start = this.length + start; }
					if (end < 0) { end = this.length + end; }

					start = clamp(start, 0, this.length);
					end = clamp(end, 0, this.length);

					var len = end - start;
					if (len < 0) {
						len = 0;
					}

					return new this.constructor(this.buffer, this.byteOffset + (start * this.BYTES_PER_ELEMENT), len);
				};

				return ctor;
			}

			var Int8Array = makeConstructor(1, packI8, unpackI8);
			var Uint8Array = makeConstructor(1, packU8, unpackU8);
			var Uint8ClampedArray = makeConstructor(1, packU8Clamped, unpackU8);
			var Int16Array = makeConstructor(2, packI16, unpackI16);
			var Uint16Array = makeConstructor(2, packU16, unpackU16);
			var Int32Array = makeConstructor(4, packI32, unpackI32);
			var Uint32Array = makeConstructor(4, packU32, unpackU32);
			var Float32Array = makeConstructor(4, packF32, unpackF32);
			var Float64Array = makeConstructor(8, packF64, unpackF64);

			exports.Int8Array = exports.Int8Array || Int8Array;
			exports.Uint8Array = exports.Uint8Array || Uint8Array;
			exports.Uint8ClampedArray = exports.Uint8ClampedArray || Uint8ClampedArray;
			exports.Int16Array = exports.Int16Array || Int16Array;
			exports.Uint16Array = exports.Uint16Array || Uint16Array;
			exports.Int32Array = exports.Int32Array || Int32Array;
			exports.Uint32Array = exports.Uint32Array || Uint32Array;
			exports.Float32Array = exports.Float32Array || Float32Array;
			exports.Float64Array = exports.Float64Array || Float64Array;
		}());

		//
		// 6 The DataView View Type
		//

		(function () {
			function r(array, index) {
				return ECMAScript.IsCallable(array.get) ? array.get(index) : array[index];
			}

			var IS_BIG_ENDIAN = (function () {
				var u16array = new exports.Uint16Array([0x1234]),
					u8array = new exports.Uint8Array(u16array.buffer);
				return r(u8array, 0) === 0x12;
			}());

			// Constructor(ArrayBuffer buffer,
			//             optional unsigned long byteOffset,
			//             optional unsigned long byteLength)
			/** @constructor */
			function DataView(buffer, byteOffset, byteLength) {
				if (arguments.length === 0) {
					buffer = new exports.ArrayBuffer(0);
				} else if (!(buffer instanceof exports.ArrayBuffer || ECMAScript.Class(buffer) === 'ArrayBuffer')) {
					throw new TypeError('TypeError');
				}

				this.buffer = buffer || new exports.ArrayBuffer(0);

				this.byteOffset = ECMAScript.ToUint32(byteOffset);
				if (this.byteOffset > this.buffer.byteLength) {
					throw new RangeError('byteOffset out of range');
				}

				if (arguments.length < 3) {
					this.byteLength = this.buffer.byteLength - this.byteOffset;
				} else {
					this.byteLength = ECMAScript.ToUint32(byteLength);
				}

				if ((this.byteOffset + this.byteLength) > this.buffer.byteLength) {
					throw new RangeError('byteOffset and length reference an area beyond the end of the buffer');
				}

				configureProperties(this);
			}

			function makeGetter(arrayType) {
				return function (byteOffset, littleEndian) {

					byteOffset = ECMAScript.ToUint32(byteOffset);

					if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
						throw new RangeError('Array index out of range');
					}
					byteOffset += this.byteOffset;

					var uint8Array = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT),
						bytes = [],
						i;
					for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
						bytes.push(r(uint8Array, i));
					}

					if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
						bytes.reverse();
					}

					return r(new arrayType(new exports.Uint8Array(bytes).buffer), 0);
				};
			}

			DataView.prototype.getUint8 = makeGetter(exports.Uint8Array);
			DataView.prototype.getInt8 = makeGetter(exports.Int8Array);
			DataView.prototype.getUint16 = makeGetter(exports.Uint16Array);
			DataView.prototype.getInt16 = makeGetter(exports.Int16Array);
			DataView.prototype.getUint32 = makeGetter(exports.Uint32Array);
			DataView.prototype.getInt32 = makeGetter(exports.Int32Array);
			DataView.prototype.getFloat32 = makeGetter(exports.Float32Array);
			DataView.prototype.getFloat64 = makeGetter(exports.Float64Array);

			function makeSetter(arrayType) {
				return function (byteOffset, value, littleEndian) {

					byteOffset = ECMAScript.ToUint32(byteOffset);
					if (byteOffset + arrayType.BYTES_PER_ELEMENT > this.byteLength) {
						throw new RangeError('Array index out of range');
					}

					// Get bytes
					var typeArray = new arrayType([value]),
						byteArray = new exports.Uint8Array(typeArray.buffer),
						bytes = [],
						i, byteView;

					for (i = 0; i < arrayType.BYTES_PER_ELEMENT; i += 1) {
						bytes.push(r(byteArray, i));
					}

					// Flip if necessary
					if (Boolean(littleEndian) === Boolean(IS_BIG_ENDIAN)) {
						bytes.reverse();
					}

					// Write them
					byteView = new exports.Uint8Array(this.buffer, byteOffset, arrayType.BYTES_PER_ELEMENT);
					byteView.set(bytes);
				};
			}

			DataView.prototype.setUint8 = makeSetter(exports.Uint8Array);
			DataView.prototype.setInt8 = makeSetter(exports.Int8Array);
			DataView.prototype.setUint16 = makeSetter(exports.Uint16Array);
			DataView.prototype.setInt16 = makeSetter(exports.Int16Array);
			DataView.prototype.setUint32 = makeSetter(exports.Uint32Array);
			DataView.prototype.setInt32 = makeSetter(exports.Int32Array);
			DataView.prototype.setFloat32 = makeSetter(exports.Float32Array);
			DataView.prototype.setFloat64 = makeSetter(exports.Float64Array);

			exports.DataView = exports.DataView || DataView;

		}()); 
	} (chunk006.typedarray));
	return chunk006.typedarray;
}

var typedarrayExports = requireTypedarray();

var weakmapPolyfill = {};

/*!
 * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
 * https://github.com/polygonplanet/weakmap-polyfill
 * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
 * @license MIT
 */

var hasRequiredWeakmapPolyfill;

function requireWeakmapPolyfill () {
	if (hasRequiredWeakmapPolyfill) return weakmapPolyfill;
	hasRequiredWeakmapPolyfill = 1;
	(function(self) {

	  if (self.WeakMap) {
	    return;
	  }

	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var hasDefine = Object.defineProperty && (function() {
	    try {
	      // Avoid IE8's broken Object.defineProperty
	      return Object.defineProperty({}, 'x', { value: 1 }).x === 1;
	    } catch (e) {}
	  })();

	  var defineProperty = function(object, name, value) {
	    if (hasDefine) {
	      Object.defineProperty(object, name, {
	        configurable: true,
	        writable: true,
	        value: value
	      });
	    } else {
	      object[name] = value;
	    }
	  };

	  self.WeakMap = (function() {

	    // ECMA-262 23.3 WeakMap Objects
	    function WeakMap() {
	      if (this === void 0) {
	        throw new TypeError("Constructor WeakMap requires 'new'");
	      }

	      defineProperty(this, '_id', genId('_WeakMap'));

	      // ECMA-262 23.3.1.1 WeakMap([iterable])
	      if (arguments.length > 0) {
	        // Currently, WeakMap `iterable` argument is not supported
	        throw new TypeError('WeakMap iterable is not supported');
	      }
	    }

	    // ECMA-262 23.3.3.2 WeakMap.prototype.delete(key)
	    defineProperty(WeakMap.prototype, 'delete', function(key) {
	      checkInstance(this, 'delete');

	      if (!isObject(key)) {
	        return false;
	      }

	      var entry = key[this._id];
	      if (entry && entry[0] === key) {
	        delete key[this._id];
	        return true;
	      }

	      return false;
	    });

	    // ECMA-262 23.3.3.3 WeakMap.prototype.get(key)
	    defineProperty(WeakMap.prototype, 'get', function(key) {
	      checkInstance(this, 'get');

	      if (!isObject(key)) {
	        return void 0;
	      }

	      var entry = key[this._id];
	      if (entry && entry[0] === key) {
	        return entry[1];
	      }

	      return void 0;
	    });

	    // ECMA-262 23.3.3.4 WeakMap.prototype.has(key)
	    defineProperty(WeakMap.prototype, 'has', function(key) {
	      checkInstance(this, 'has');

	      if (!isObject(key)) {
	        return false;
	      }

	      var entry = key[this._id];
	      if (entry && entry[0] === key) {
	        return true;
	      }

	      return false;
	    });

	    // ECMA-262 23.3.3.5 WeakMap.prototype.set(key, value)
	    defineProperty(WeakMap.prototype, 'set', function(key, value) {
	      checkInstance(this, 'set');

	      if (!isObject(key)) {
	        throw new TypeError('Invalid value used as weak map key');
	      }

	      var entry = key[this._id];
	      if (entry && entry[0] === key) {
	        entry[1] = value;
	        return this;
	      }

	      defineProperty(key, this._id, [key, value]);
	      return this;
	    });

	    function checkInstance(x, methodName) {
	      if (!isObject(x) || !hasOwnProperty.call(x, '_id')) {
	        throw new TypeError(
	          methodName + ' method called on incompatible receiver ' +
	          typeof x
	        );
	      }
	    }

	    function genId(prefix) {
	      return prefix + '_' + rand() + '.' + rand();
	    }

	    function rand() {
	      return Math.random().toString().substring(2);
	    }

	    defineProperty(WeakMap, '_polyfill', true);
	    return WeakMap;
	  })();

	  function isObject(x) {
	    return Object(x) === x;
	  }

	})(
	  typeof globalThis !== 'undefined' ? globalThis :
	  typeof self !== 'undefined' ? self :
	  typeof window !== 'undefined' ? window :
	  typeof chunk000.commonjsGlobal !== 'undefined' ? chunk000.commonjsGlobal : weakmapPolyfill
	);
	return weakmapPolyfill;
}

requireWeakmapPolyfill();

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getShadowSelector(generateSelector, elm, options = {}) {
  if (!elm) {
    return '';
  }
  let doc = (elm.getRootNode && elm.getRootNode()) || document;
  // Not a DOCUMENT_FRAGMENT - shadow DOM
  if (doc.nodeType !== 11) {
    return generateSelector(elm, options, doc);
  }

  const stack = [];
  while (doc.nodeType === 11) {
    if (!doc.host) {
      return '';
    }
    stack.unshift({ elm, doc });
    elm = doc.host;
    doc = elm.getRootNode();
  }

  stack.unshift({ elm, doc });
  return stack.map(item => generateSelector(item.elm, options, item.doc));
}

function generateAncestry(node) {
  const nodeName = escapeSelector(node.nodeName.toLowerCase());
  const parentElement = node.parentElement;
  const parentNode = node.parentNode;

  let nthChild = '';
  if (
    nodeName !== 'head' &&
    nodeName !== 'body' &&
    parentNode?.children.length > 1
  ) {
    const index = Array.prototype.indexOf.call(parentNode.children, node) + 1;
    nthChild = `:nth-child(${index})`;
  }

  if (!parentElement) {
    return nodeName + nthChild;
  }

  return generateAncestry(parentElement) + ' > ' + nodeName + nthChild;
}

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getAncestry(elm, options) {
  return getShadowSelector(generateAncestry, elm, options);
}

let _cache = {};

const cache = {
  /**
   * Set an item in the cache.
   * @param {String} key - Name of the key.
   * @param {*} value - Value to store.
   */
  set(key, value) {
    validateKey(key);

    _cache[key] = value;
  },

  /**
   * Retrieve an item from the cache.
   * @param {String} key - Name of the key the value was stored as.
   * @param {Function} [creator] - Default value to set if there is a cache miss. Functions are evaluated before caching. To override a value already saved, use `set()`.
   * @returns {*} The item stored
   */
  get(key, creator) {
    validateCreator(creator);

    if (key in _cache) {
      return _cache[key];
    }

    if (typeof creator === 'function') {
      const value = creator();
      assert(
        value !== undefined,
        'Cache creator function should not return undefined'
      );
      this.set(key, value);
      return _cache[key];
    }
  },

  /**
   * Clear the cache.
   */
  clear() {
    _cache = {};
  }
};

/**
 * Validates a cache key or throws an error.
 * @param {String} key - The key to validate.
 * @throws {Error} If the key is not a string.
 */
function validateKey(key) {
  assert(
    typeof key === 'string',
    'key must be a string, ' + typeof key + ' given'
  );
  assert(key !== '', 'key must not be empty');
}

/**
 * Validates a cache creator by throwing if it is not a function or undefined.
 * @param {Function|undefined} creator - The creator function to validate.
 * @throws {Error} If the creator is not a function or undefined.
 */
function validateCreator(creator) {
  assert(
    typeof creator === 'function' || typeof creator === 'undefined',
    'creator must be a function or undefined, ' + typeof creator + ' given'
  );
}

exports.AbstractVirtualNode = AbstractVirtualNode;
exports.aggregate = aggregate;
exports.aggregateChecks = aggregateChecks;
exports.aggregateNodeResults = aggregateNodeResults;
exports.aggregateResult = aggregateResult;
exports.areStylesSet = areStylesSet;
exports.assert = assert;
exports.axe = axe;
exports.cache = cache;
exports.constants = constants;
exports.escapeSelector = escapeSelector;
exports.finalizeRuleResult = finalizeRuleResult;
exports.getAncestry = getAncestry;
exports.getNodeAttributes = getNodeAttributes;
exports.getShadowSelector = getShadowSelector;
exports.typedarrayExports = typedarrayExports;
