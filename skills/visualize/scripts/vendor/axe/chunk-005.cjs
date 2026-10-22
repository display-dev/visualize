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

const chunk004 = require('./chunk-004.cjs');
const chunk003 = require('./chunk-003.cjs');

var _iterate;
var hasRequired_iterate;

function require_iterate () {
	if (hasRequired_iterate) return _iterate;
	hasRequired_iterate = 1;

	var callable                = chunk004.requireValidCallable()
	  , value                   = chunk004.requireValidValue()
	  , bind                    = Function.prototype.bind
	  , call                    = Function.prototype.call
	  , keys                    = Object.keys
	  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

	_iterate = function (method, defVal) {
		return function (obj, cb /*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);

			list = keys(obj);
			if (compareFn) {
				list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== "function") method = list[method];
			return call.call(method, list, function (key, index) {
				if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};
	return _iterate;
}

var forEach;
var hasRequiredForEach;

function requireForEach () {
	if (hasRequiredForEach) return forEach;
	hasRequiredForEach = 1;

	forEach = require_iterate()("forEach");
	return forEach;
}

var registeredExtensions = {};

var hasRequiredRegisteredExtensions;

function requireRegisteredExtensions () {
	if (hasRequiredRegisteredExtensions) return registeredExtensions;
	hasRequiredRegisteredExtensions = 1;
	return registeredExtensions;
}

var mixin;
var hasRequiredMixin;

function requireMixin () {
	if (hasRequiredMixin) return mixin;
	hasRequiredMixin = 1;

	var value                    = chunk004.requireValidValue()
	  , defineProperty           = Object.defineProperty
	  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
	  , getOwnPropertyNames      = Object.getOwnPropertyNames
	  , getOwnPropertySymbols    = Object.getOwnPropertySymbols;

	mixin = function (target, source) {
		var error, sourceObject = Object(value(source));
		target = Object(value(target));
		getOwnPropertyNames(sourceObject).forEach(function (name) {
			try {
				defineProperty(target, name, getOwnPropertyDescriptor(source, name));
			} catch (e) { error = e; }
		});
		if (typeof getOwnPropertySymbols === "function") {
			getOwnPropertySymbols(sourceObject).forEach(function (symbol) {
				try {
					defineProperty(target, symbol, getOwnPropertyDescriptor(source, symbol));
				} catch (e) { error = e; }
			});
		}
		if (error !== undefined) throw error;
		return target;
	};
	return mixin;
}

var hasRequired_defineLength;

function require_defineLength () {
	if (hasRequired_defineLength) return chunk003._defineLength.exports;
	hasRequired_defineLength = 1;

	var toPosInt = chunk004.requireToPosInteger();

	var test = function (arg1, arg2) { return arg2; };

	var desc, defineProperty, generate, mixin;

	try {
		Object.defineProperty(test, "length", {
			configurable: true,
			writable: false,
			enumerable: false,
			value: 1
		});
	}
	catch (ignore) {}

	if (test.length === 1) {
		// ES6
		desc = { configurable: true, writable: false, enumerable: false };
		defineProperty = Object.defineProperty;
		chunk003._defineLength.exports = function (fn, length) {
			length = toPosInt(length);
			if (fn.length === length) return fn;
			desc.value = length;
			return defineProperty(fn, "length", desc);
		};
	} else {
		mixin = requireMixin();
		generate = (function () {
			var cache = [];
			return function (length) {
				var args, i = 0;
				if (cache[length]) return cache[length];
				args = [];
				while (length--) args.push("a" + (++i).toString(36));
				// eslint-disable-next-line no-new-func
				return new Function(
					"fn",
					"return function (" + args.join(", ") + ") { return fn.apply(this, arguments); };"
				);
			};
		})();
		chunk003._defineLength.exports = function (src, length) {
			var target;
			length = toPosInt(length);
			if (src.length === length) return src;
			target = generate(length)(src);
			try { mixin(target, src); }
			catch (ignore) {}
			return target;
		};
	}
	return chunk003._defineLength.exports;
}

var is$1;
var hasRequiredIs$1;

function requireIs$1 () {
	if (hasRequiredIs$1) return is$1;
	hasRequiredIs$1 = 1;

	var isPrototype = chunk004.requireIs();

	is$1 = function (value) {
		if (typeof value !== "function") return false;

		if (!hasOwnProperty.call(value, "length")) return false;

		try {
			if (typeof value.length !== "number") return false;
			if (typeof value.call !== "function") return false;
			if (typeof value.apply !== "function") return false;
		} catch (error) {
			return false;
		}

		return !isPrototype(value);
	};
	return is$1;
}

var is;
var hasRequiredIs;

function requireIs () {
	if (hasRequiredIs) return is;
	hasRequiredIs = 1;

	var isFunction = requireIs$1();

	var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

	is = function (value) {
		if (!isFunction(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};
	return is;
}

var hasRequiredD;

function requireD () {
	if (hasRequiredD) return chunk003.d.exports;
	hasRequiredD = 1;

	var isValue         = chunk004.requireIs$1()
	  , isPlainFunction = requireIs()
	  , assign          = chunk004.requireAssign()
	  , normalizeOpts   = chunk004.requireNormalizeOptions()
	  , contains        = chunk004.requireContains();

	var d = (chunk003.d.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== "string") {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (isValue(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
			w = contains.call(dscr, "w");
		} else {
			c = w = true;
			e = false;
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	});

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== "string") {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (!isValue(get)) {
			get = undefined;
		} else if (!isPlainFunction(get)) {
			options = get;
			get = set = undefined;
		} else if (!isValue(set)) {
			set = undefined;
		} else if (!isPlainFunction(set)) {
			options = set;
			set = undefined;
		}
		if (isValue(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
		} else {
			c = true;
			e = false;
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	return chunk003.d.exports;
}

var isSymbol;
var hasRequiredIsSymbol;

function requireIsSymbol () {
	if (hasRequiredIsSymbol) return isSymbol;
	hasRequiredIsSymbol = 1;

	isSymbol = function (value) {
		if (!value) return false;
		if (typeof value === "symbol") return true;
		if (!value.constructor) return false;
		if (value.constructor.name !== "Symbol") return false;
		return value[value.constructor.toStringTag] === "Symbol";
	};
	return isSymbol;
}

var validateSymbol;
var hasRequiredValidateSymbol;

function requireValidateSymbol () {
	if (hasRequiredValidateSymbol) return validateSymbol;
	hasRequiredValidateSymbol = 1;

	var isSymbol = requireIsSymbol();

	validateSymbol = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};
	return validateSymbol;
}

var generateName;
var hasRequiredGenerateName;

function requireGenerateName () {
	if (hasRequiredGenerateName) return generateName;
	hasRequiredGenerateName = 1;

	var d = requireD();

	var create = Object.create, defineProperty = Object.defineProperty, objPrototype = Object.prototype;

	var created = create(null);
	generateName = function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || "")]) ++postfix;
		desc += postfix || "";
		created[desc] = true;
		name = "@@" + desc;
		defineProperty(
			objPrototype, name,
			d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			})
		);
		return name;
	};
	return generateName;
}

var standardSymbols;
var hasRequiredStandardSymbols;

function requireStandardSymbols () {
	if (hasRequiredStandardSymbols) return standardSymbols;
	hasRequiredStandardSymbols = 1;

	var d            = requireD()
	  , NativeSymbol = chunk004.requireGlobalThis().Symbol;

	standardSymbols = function (SymbolPolyfill) {
		return Object.defineProperties(SymbolPolyfill, {
			// To ensure proper interoperability with other native functions (e.g. Array.from)
			// fallback to eventual native implementation of given symbol
			hasInstance: d(
				"", (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill("hasInstance")
			),
			isConcatSpreadable: d(
				"",
				(NativeSymbol && NativeSymbol.isConcatSpreadable) ||
					SymbolPolyfill("isConcatSpreadable")
			),
			iterator: d("", (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill("iterator")),
			match: d("", (NativeSymbol && NativeSymbol.match) || SymbolPolyfill("match")),
			replace: d("", (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill("replace")),
			search: d("", (NativeSymbol && NativeSymbol.search) || SymbolPolyfill("search")),
			species: d("", (NativeSymbol && NativeSymbol.species) || SymbolPolyfill("species")),
			split: d("", (NativeSymbol && NativeSymbol.split) || SymbolPolyfill("split")),
			toPrimitive: d(
				"", (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill("toPrimitive")
			),
			toStringTag: d(
				"", (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill("toStringTag")
			),
			unscopables: d(
				"", (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill("unscopables")
			)
		});
	};
	return standardSymbols;
}

var symbolRegistry;
var hasRequiredSymbolRegistry;

function requireSymbolRegistry () {
	if (hasRequiredSymbolRegistry) return symbolRegistry;
	hasRequiredSymbolRegistry = 1;

	var d              = requireD()
	  , validateSymbol = requireValidateSymbol();

	var registry = Object.create(null);

	symbolRegistry = function (SymbolPolyfill) {
		return Object.defineProperties(SymbolPolyfill, {
			for: d(function (key) {
				if (registry[key]) return registry[key];
				return (registry[key] = SymbolPolyfill(String(key)));
			}),
			keyFor: d(function (symbol) {
				var key;
				validateSymbol(symbol);
				for (key in registry) {
					if (registry[key] === symbol) return key;
				}
				return undefined;
			})
		});
	};
	return symbolRegistry;
}

var polyfill;
var hasRequiredPolyfill;

function requirePolyfill () {
	if (hasRequiredPolyfill) return polyfill;
	hasRequiredPolyfill = 1;

	var d                    = requireD()
	  , validateSymbol       = requireValidateSymbol()
	  , NativeSymbol         = chunk004.requireGlobalThis().Symbol
	  , generateName         = requireGenerateName()
	  , setupStandardSymbols = requireStandardSymbols()
	  , setupSymbolRegistry  = requireSymbolRegistry();

	var create = Object.create
	  , defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty;

	var SymbolPolyfill, HiddenSymbol, isNativeSafe;

	if (typeof NativeSymbol === "function") {
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	} else {
		NativeSymbol = null;
	}

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	polyfill = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = description === undefined ? "" : String(description);
		return defineProperties(symbol, {
			__description__: d("", description),
			__name__: d("", generateName(description))
		});
	};

	setupStandardSymbols(SymbolPolyfill);
	setupSymbolRegistry(SymbolPolyfill);

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d("", function () { return this.__name__; })
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return "Symbol (" + validateSymbol(this).__description__ + ")"; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(
		SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive,
		d("", function () {
			var symbol = validateSymbol(this);
			if (typeof symbol === "symbol") return symbol;
			return symbol.toString();
		})
	);
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(
		HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
	);

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(
		HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
	);
	return polyfill;
}

var es6Symbol;
var hasRequiredEs6Symbol;

function requireEs6Symbol () {
	if (hasRequiredEs6Symbol) return es6Symbol;
	hasRequiredEs6Symbol = 1;

	es6Symbol = chunk004.requireIsImplemented()()
		? chunk004.requireGlobalThis().Symbol
		: requirePolyfill();
	return es6Symbol;
}

var shim;
var hasRequiredShim;

function requireShim () {
	if (hasRequiredShim) return shim;
	hasRequiredShim = 1;

	var iteratorSymbol = requireEs6Symbol().iterator
	  , isArguments    = chunk004.requireIsArguments()
	  , isFunction     = chunk004.requireIsFunction()
	  , toPosInt       = chunk004.requireToPosInteger()
	  , callable       = chunk004.requireValidCallable()
	  , validValue     = chunk004.requireValidValue()
	  , isValue        = chunk004.requireIsValue()
	  , isString       = chunk004.requireIsString()
	  , isArray        = Array.isArray
	  , call           = Function.prototype.call
	  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
	  , defineProperty = Object.defineProperty;

	// eslint-disable-next-line complexity, max-lines-per-function
	shim = function (arrayLike /*, mapFn, thisArg*/) {
		var mapFn = arguments[1]
		  , thisArg = arguments[2]
		  , Context
		  , i
		  , j
		  , arr
		  , length
		  , code
		  , iterator
		  , result
		  , getIterator
		  , value;

		arrayLike = Object(validValue(arrayLike));

		if (isValue(mapFn)) callable(mapFn);
		if (!this || this === Array || !isFunction(this)) {
			// Result: Plain array
			if (!mapFn) {
				if (isArguments(arrayLike)) {
					// Source: Arguments
					length = arrayLike.length;
					if (length !== 1) return Array.apply(null, arrayLike);
					arr = new Array(1);
					arr[0] = arrayLike[0];
					return arr;
				}
				if (isArray(arrayLike)) {
					// Source: Array
					arr = new Array((length = arrayLike.length));
					for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
					return arr;
				}
			}
			arr = [];
		} else {
			// Result: Non plain array
			Context = this;
		}

		if (!isArray(arrayLike)) {
			if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
				// Source: Iterator
				iterator = callable(getIterator).call(arrayLike);
				if (Context) arr = new Context();
				result = iterator.next();
				i = 0;
				while (!result.done) {
					value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
					if (Context) {
						desc.value = value;
						defineProperty(arr, i, desc);
					} else {
						arr[i] = value;
					}
					result = iterator.next();
					++i;
				}
				length = i;
			} else if (isString(arrayLike)) {
				// Source: String
				length = arrayLike.length;
				if (Context) arr = new Context();
				for (i = 0, j = 0; i < length; ++i) {
					value = arrayLike[i];
					if (i + 1 < length) {
						code = value.charCodeAt(0);
						// eslint-disable-next-line max-depth
						if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
					}
					value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
					if (Context) {
						desc.value = value;
						defineProperty(arr, j, desc);
					} else {
						arr[j] = value;
					}
					++j;
				}
				length = j;
			}
		}
		if (length === undefined) {
			// Source: array or array-like
			length = toPosInt(arrayLike.length);
			if (Context) arr = new Context(length);
			for (i = 0; i < length; ++i) {
				value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
			}
		}
		if (Context) {
			desc.value = null;
			arr.length = length;
		}
		return arr;
	};
	return shim;
}

var from;
var hasRequiredFrom;

function requireFrom () {
	if (hasRequiredFrom) return from;
	hasRequiredFrom = 1;

	from = chunk004.requireIsImplemented$1()() ? Array.from : requireShim();
	return from;
}

var map;
var hasRequiredMap;

function requireMap () {
	if (hasRequiredMap) return map;
	hasRequiredMap = 1;

	var callable = chunk004.requireValidCallable()
	  , forEach  = requireForEach()
	  , call     = Function.prototype.call;

	map = function (obj, cb /*, thisArg*/) {
		var result = {}, thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, targetObj, index) {
			result[key] = call.call(cb, thisArg, value, key, targetObj, index);
		});
		return result;
	};
	return map;
}

var nextTick;
var hasRequiredNextTick;

function requireNextTick () {
	if (hasRequiredNextTick) return nextTick;
	hasRequiredNextTick = 1;

	var ensureCallable = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};

	var byObserver = function (Observer) {
		var node = document.createTextNode(''), queue, currentQueue, i = 0;
		new Observer(function () {
			var callback;
			if (!queue) {
				if (!currentQueue) return;
				queue = currentQueue;
			} else if (currentQueue) {
				queue = currentQueue.concat(queue);
			}
			currentQueue = queue;
			queue = null;
			if (typeof currentQueue === 'function') {
				callback = currentQueue;
				currentQueue = null;
				callback();
				return;
			}
			node.data = (i = ++i % 2); // Invoke other batch, to handle leftover callbacks in case of crash
			while (currentQueue) {
				callback = currentQueue.shift();
				if (!currentQueue.length) currentQueue = null;
				callback();
			}
		}).observe(node, { characterData: true });
		return function (fn) {
			ensureCallable(fn);
			if (queue) {
				if (typeof queue === 'function') queue = [queue, fn];
				else queue.push(fn);
				return;
			}
			queue = fn;
			node.data = (i = ++i % 2);
		};
	};

	nextTick = (function () {
		// Node.js
		if ((typeof process === 'object') && process && (typeof process.nextTick === 'function')) {
			return process.nextTick;
		}

		// queueMicrotask
		if (typeof queueMicrotask === "function") {
			return function (cb) { queueMicrotask(ensureCallable(cb)); };
		}

		// MutationObserver
		if ((typeof document === 'object') && document) {
			if (typeof MutationObserver === 'function') return byObserver(MutationObserver);
			if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver);
		}

		// W3C Draft
		// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
		if (typeof setImmediate === 'function') {
			return function (cb) { setImmediate(ensureCallable(cb)); };
		}

		// Wide available standard
		if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
			return function (cb) { setTimeout(ensureCallable(cb), 0); };
		}

		return null;
	}());
	return nextTick;
}

/* eslint consistent-this: 0, no-shadow:0, no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */

var hasRequiredAsync;

function requireAsync () {
	if (hasRequiredAsync) return chunk004.async;
	hasRequiredAsync = 1;

	var aFrom        = requireFrom()
	  , objectMap    = requireMap()
	  , mixin        = requireMixin()
	  , defineLength = require_defineLength()
	  , nextTick     = requireNextTick();

	var slice = Array.prototype.slice, apply = Function.prototype.apply, create = Object.create;

	requireRegisteredExtensions().async = function (tbi, conf) {
		var waiting = create(null)
		  , cache = create(null)
		  , base = conf.memoized
		  , original = conf.original
		  , currentCallback
		  , currentContext
		  , currentArgs;

		// Initial
		conf.memoized = defineLength(function (arg) {
			var args = arguments, last = args[args.length - 1];
			if (typeof last === "function") {
				currentCallback = last;
				args = slice.call(args, 0, -1);
			}
			return base.apply((currentContext = this), (currentArgs = args));
		}, base);
		try { mixin(conf.memoized, base); }
		catch (ignore) {}

		// From cache (sync)
		conf.on("get", function (id) {
			var cb, context, args;
			if (!currentCallback) return;

			// Unresolved
			if (waiting[id]) {
				if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback];
				else waiting[id].push(currentCallback);
				currentCallback = null;
				return;
			}

			// Resolved, assure next tick invocation
			cb = currentCallback;
			context = currentContext;
			args = currentArgs;
			currentCallback = currentContext = currentArgs = null;
			nextTick(function () {
				var data;
				if (hasOwnProperty.call(cache, id)) {
					data = cache[id];
					conf.emit("getasync", id, args, context);
					apply.call(cb, data.context, data.args);
				} else {
					// Purged in a meantime, we shouldn't rely on cached value, recall
					currentCallback = cb;
					currentContext = context;
					currentArgs = args;
					base.apply(context, args);
				}
			});
		});

		// Not from cache
		conf.original = function () {
			var args, cb, origCb, result;
			if (!currentCallback) return apply.call(original, this, arguments);
			args = aFrom(arguments);
			cb = function self(err) {
				var cb, args, id = self.id;
				if (id == null) {
					// Shouldn't happen, means async callback was called sync way
					nextTick(apply.bind(self, this, arguments));
					return undefined;
				}
				delete self.id;
				cb = waiting[id];
				delete waiting[id];
				if (!cb) {
					// Already processed,
					// outcome of race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
					return undefined;
				}
				args = aFrom(arguments);
				if (conf.has(id)) {
					if (err) {
						conf.delete(id);
					} else {
						cache[id] = { context: this, args: args };
						conf.emit("setasync", id, typeof cb === "function" ? 1 : cb.length);
					}
				}
				if (typeof cb === "function") {
					result = apply.call(cb, this, args);
				} else {
					cb.forEach(function (cb) { result = apply.call(cb, this, args); }, this);
				}
				return result;
			};
			origCb = currentCallback;
			currentCallback = currentContext = currentArgs = null;
			args.push(cb);
			result = apply.call(original, this, args);
			cb.cb = origCb;
			currentCallback = cb;
			return result;
		};

		// After not from cache call
		conf.on("set", function (id) {
			if (!currentCallback) {
				conf.delete(id);
				return;
			}
			if (waiting[id]) {
				// Race condition: asyncFn(1, cb), asyncFn.clear(), asyncFn(1, cb)
				if (typeof waiting[id] === "function") waiting[id] = [waiting[id], currentCallback.cb];
				else waiting[id].push(currentCallback.cb);
			} else {
				waiting[id] = currentCallback.cb;
			}
			delete currentCallback.cb;
			currentCallback.id = id;
			currentCallback = null;
		});

		// On delete
		conf.on("delete", function (id) {
			var result;
			// If false, we don't have value yet, so we assume that intention is not
			// to memoize this call. After value is obtained we don't cache it but
			// gracefully pass to callback
			if (hasOwnProperty.call(waiting, id)) return;
			if (!cache[id]) return;
			result = cache[id];
			delete cache[id];
			conf.emit("deleteasync", id, slice.call(result.args, 1));
		});

		// On clear
		conf.on("clear", function () {
			var oldCache = cache;
			cache = create(null);
			conf.emit(
				"clearasync", objectMap(oldCache, function (data) { return slice.call(data.args, 1); })
			);
		});
	};
	return chunk004.async;
}

var primitiveSet;
var hasRequiredPrimitiveSet;

function requirePrimitiveSet () {
	if (hasRequiredPrimitiveSet) return primitiveSet;
	hasRequiredPrimitiveSet = 1;

	var forEach = Array.prototype.forEach, create = Object.create;

	// eslint-disable-next-line no-unused-vars
	primitiveSet = function (arg /*, …args*/) {
		var set = create(null);
		forEach.call(arguments, function (name) { set[name] = true; });
		return set;
	};
	return primitiveSet;
}

var isCallable;
var hasRequiredIsCallable;

function requireIsCallable () {
	if (hasRequiredIsCallable) return isCallable;
	hasRequiredIsCallable = 1;

	isCallable = function (obj) { return typeof obj === "function"; };
	return isCallable;
}

var validateStringifiable;
var hasRequiredValidateStringifiable;

function requireValidateStringifiable () {
	if (hasRequiredValidateStringifiable) return validateStringifiable;
	hasRequiredValidateStringifiable = 1;

	var isCallable = requireIsCallable();

	validateStringifiable = function (stringifiable) {
		try {
			if (stringifiable && isCallable(stringifiable.toString)) return stringifiable.toString();
			return String(stringifiable);
		} catch (e) {
			throw new TypeError("Passed argument cannot be stringifed");
		}
	};
	return validateStringifiable;
}

var validateStringifiableValue;
var hasRequiredValidateStringifiableValue;

function requireValidateStringifiableValue () {
	if (hasRequiredValidateStringifiableValue) return validateStringifiableValue;
	hasRequiredValidateStringifiableValue = 1;

	var ensureValue   = chunk004.requireValidValue()
	  , stringifiable = requireValidateStringifiable();

	validateStringifiableValue = function (value) { return stringifiable(ensureValue(value)); };
	return validateStringifiableValue;
}

var safeToString;
var hasRequiredSafeToString;

function requireSafeToString () {
	if (hasRequiredSafeToString) return safeToString;
	hasRequiredSafeToString = 1;

	var isCallable = requireIsCallable();

	safeToString = function (value) {
		try {
			if (value && isCallable(value.toString)) return value.toString();
			return String(value);
		} catch (e) {
			return "<Non-coercible to string value>";
		}
	};
	return safeToString;
}

var toShortStringRepresentation;
var hasRequiredToShortStringRepresentation;

function requireToShortStringRepresentation () {
	if (hasRequiredToShortStringRepresentation) return toShortStringRepresentation;
	hasRequiredToShortStringRepresentation = 1;

	var safeToString = requireSafeToString();

	var reNewLine = /[\n\r\u2028\u2029]/g;

	toShortStringRepresentation = function (value) {
		var string = safeToString(value);
		// Trim if too long
		if (string.length > 100) string = string.slice(0, 99) + "…";
		// Replace eventual new lines
		string = string.replace(reNewLine, function (char) {
			return JSON.stringify(char).slice(1, -1);
		});
		return string;
	};
	return toShortStringRepresentation;
}

var hasRequiredIsPromise;

function requireIsPromise () {
	if (hasRequiredIsPromise) return chunk004.isPromise.exports;
	hasRequiredIsPromise = 1;
	chunk004.isPromise.exports = isPromise;
	chunk004.isPromise.exports.default = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}
	return chunk004.isPromise.exports;
}

var hasRequiredDispose;

function requireDispose () {
	if (hasRequiredDispose) return chunk004.dispose;
	hasRequiredDispose = 1;

	var callable   = chunk004.requireValidCallable()
	  , forEach    = requireForEach()
	  , extensions = requireRegisteredExtensions()
	  , apply      = Function.prototype.apply;

	extensions.dispose = function (dispose, conf, options) {
		var del;
		callable(dispose);
		if ((options.async && extensions.async) || (options.promise && extensions.promise)) {
			conf.on(
				"deleteasync",
				(del = function (id, resultArray) { apply.call(dispose, null, resultArray); })
			);
			conf.on("clearasync", function (cache) {
				forEach(cache, function (result, id) { del(id, result); });
			});
			return;
		}
		conf.on("delete", (del = function (id, result) { dispose(result); }));
		conf.on("clear", function (cache) {
			forEach(cache, function (result, id) { del(id, result); });
		});
	};
	return chunk004.dispose;
}

var maxTimeout;
var hasRequiredMaxTimeout;

function requireMaxTimeout () {
	if (hasRequiredMaxTimeout) return maxTimeout;
	hasRequiredMaxTimeout = 1;

	maxTimeout = 2147483647;
	return maxTimeout;
}

var validTimeout;
var hasRequiredValidTimeout;

function requireValidTimeout () {
	if (hasRequiredValidTimeout) return validTimeout;
	hasRequiredValidTimeout = 1;

	var toPosInt   = chunk004.requireToPosInteger()
	  , maxTimeout = requireMaxTimeout();

	validTimeout = function (value) {
		value = toPosInt(value);
		if (value > maxTimeout) throw new TypeError(value + " exceeds maximum possible timeout");
		return value;
	};
	return validTimeout;
}

/* eslint consistent-this: 0 */

var hasRequiredMaxAge;

function requireMaxAge () {
	if (hasRequiredMaxAge) return chunk004.maxAge;
	hasRequiredMaxAge = 1;

	var aFrom      = requireFrom()
	  , forEach    = requireForEach()
	  , nextTick   = requireNextTick()
	  , isPromise  = requireIsPromise()
	  , timeout    = requireValidTimeout()
	  , extensions = requireRegisteredExtensions();

	var noop = Function.prototype, max = Math.max, min = Math.min, create = Object.create;

	extensions.maxAge = function (maxAge, conf, options) {
		var timeouts, postfix, preFetchAge, preFetchTimeouts;

		maxAge = timeout(maxAge);
		if (!maxAge) return;

		timeouts = create(null);
		postfix =
			(options.async && extensions.async) || (options.promise && extensions.promise)
				? "async"
				: "";
		conf.on("set" + postfix, function (id) {
			timeouts[id] = setTimeout(function () { conf.delete(id); }, maxAge);
			if (typeof timeouts[id].unref === "function") timeouts[id].unref();
			if (!preFetchTimeouts) return;
			if (preFetchTimeouts[id]) {
				if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
			}
			preFetchTimeouts[id] = setTimeout(function () {
				delete preFetchTimeouts[id];
			}, preFetchAge);
			if (typeof preFetchTimeouts[id].unref === "function") preFetchTimeouts[id].unref();
		});
		conf.on("delete" + postfix, function (id) {
			clearTimeout(timeouts[id]);
			delete timeouts[id];
			if (!preFetchTimeouts) return;
			if (preFetchTimeouts[id] !== "nextTick") clearTimeout(preFetchTimeouts[id]);
			delete preFetchTimeouts[id];
		});

		if (options.preFetch) {
			if (options.preFetch === true || isNaN(options.preFetch)) {
				preFetchAge = 0.333;
			} else {
				preFetchAge = max(min(Number(options.preFetch), 1), 0);
			}
			if (preFetchAge) {
				preFetchTimeouts = {};
				preFetchAge = (1 - preFetchAge) * maxAge;
				conf.on("get" + postfix, function (id, args, context) {
					if (!preFetchTimeouts[id]) {
						preFetchTimeouts[id] = "nextTick";
						nextTick(function () {
							var result;
							if (preFetchTimeouts[id] !== "nextTick") return;
							delete preFetchTimeouts[id];
							conf.delete(id);
							if (options.async) {
								args = aFrom(args);
								args.push(noop);
							}
							result = conf.memoized.apply(context, args);
							if (options.promise) {
								// Supress eventual error warnings
								if (isPromise(result)) {
									if (typeof result.done === "function") result.done(noop, noop);
									else result.then(noop, noop);
								}
							}
						});
					}
				});
			}
		}

		conf.on("clear" + postfix, function () {
			forEach(timeouts, function (id) { clearTimeout(id); });
			timeouts = {};
			if (preFetchTimeouts) {
				forEach(preFetchTimeouts, function (id) { if (id !== "nextTick") clearTimeout(id); });
				preFetchTimeouts = {};
			}
		});
	};
	return chunk004.maxAge;
}

var lruQueue;
var hasRequiredLruQueue;

function requireLruQueue () {
	if (hasRequiredLruQueue) return lruQueue;
	hasRequiredLruQueue = 1;

	var toPosInt = chunk004.requireToPosInteger()

	  , create = Object.create, hasOwnProperty = Object.prototype.hasOwnProperty;

	lruQueue = function (limit) {
		var size = 0, base = 1, queue = create(null), map = create(null), index = 0, del;
		limit = toPosInt(limit);
		return {
			hit: function (id) {
				var oldIndex = map[id], nuIndex = ++index;
				queue[nuIndex] = id;
				map[id] = nuIndex;
				if (!oldIndex) {
					++size;
					if (size <= limit) return;
					id = queue[base];
					del(id);
					return id;
				}
				delete queue[oldIndex];
				if (base !== oldIndex) return;
				while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
			},
			delete: del = function (id) {
				var oldIndex = map[id];
				if (!oldIndex) return;
				delete queue[oldIndex];
				delete map[id];
				--size;
				if (base !== oldIndex) return;
				if (!size) {
					index = 0;
					base = 1;
					return;
				}
				while (!hasOwnProperty.call(queue, ++base)) continue; //jslint: skip
			},
			clear: function () {
				size = 0;
				base = 1;
				queue = create(null);
				map = create(null);
				index = 0;
			}
		};
	};
	return lruQueue;
}

var hasRequiredMax;

function requireMax () {
	if (hasRequiredMax) return chunk004.max;
	hasRequiredMax = 1;

	var toPosInteger = chunk004.requireToPosInteger()
	  , lruQueue     = requireLruQueue()
	  , extensions   = requireRegisteredExtensions();

	extensions.max = function (max, conf, options) {
		var postfix, queue, hit;

		max = toPosInteger(max);
		if (!max) return;

		queue = lruQueue(max);
		postfix =
			(options.async && extensions.async) || (options.promise && extensions.promise)
				? "async"
				: "";

		conf.on(
			"set" + postfix,
			(hit = function (id) {
				id = queue.hit(id);
				if (id === undefined) return;
				conf.delete(id);
			})
		);
		conf.on("get" + postfix, hit);
		conf.on("delete" + postfix, queue.delete);
		conf.on("clear" + postfix, queue.clear);
	};
	return chunk004.max;
}

exports.requireAsync = requireAsync;
exports.requireD = requireD;
exports.requireDispose = requireDispose;
exports.requireForEach = requireForEach;
exports.requireFrom = requireFrom;
exports.requireIsPromise = requireIsPromise;
exports.requireMap = requireMap;
exports.requireMax = requireMax;
exports.requireMaxAge = requireMaxAge;
exports.requireNextTick = requireNextTick;
exports.requirePrimitiveSet = requirePrimitiveSet;
exports.requireRegisteredExtensions = requireRegisteredExtensions;
exports.requireToShortStringRepresentation = requireToShortStringRepresentation;
exports.requireValidateStringifiableValue = requireValidateStringifiableValue;
exports.require_defineLength = require_defineLength;
