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
const chunk004 = require('./chunk-004.cjs');
const chunk005 = require('./chunk-005.cjs');
const chunk003 = require('./chunk-003.cjs');

var typedarray = {};

var resolveLength;
var hasRequiredResolveLength;

function requireResolveLength () {
	if (hasRequiredResolveLength) return resolveLength;
	hasRequiredResolveLength = 1;

	var toPosInt = chunk004.requireToPosInteger();

	resolveLength = function (optsLength, fnLength, isAsync) {
		var length;
		if (isNaN(optsLength)) {
			length = fnLength;
			if (!(length >= 0)) return 1;
			if (isAsync && length) return length - 1;
			return length;
		}
		if (optsLength === false) return false;
		return toPosInt(optsLength);
	};
	return resolveLength;
}

var isObject;
var hasRequiredIsObject;

function requireIsObject () {
	if (hasRequiredIsObject) return isObject;
	hasRequiredIsObject = 1;

	var isValue = chunk004.requireIsValue();

	var map = { function: true, object: true };

	isObject = function (value) { return (isValue(value) && map[typeof value]) || false; };
	return isObject;
}

var hasRequiredCustom;

function requireCustom () {
	if (hasRequiredCustom) return chunk003.custom.exports;
	hasRequiredCustom = 1;
	(function (module) {

		var assign            = chunk004.requireAssign()
		  , isObject          = requireIsObject()
		  , isValue           = chunk004.requireIsValue()
		  , captureStackTrace = Error.captureStackTrace;

		module.exports = function (message /*, code, ext*/) {
			var err = new Error(message), code = arguments[1], ext = arguments[2];
			if (!isValue(ext)) {
				if (isObject(code)) {
					ext = code;
					code = null;
				}
			}
			if (isValue(ext)) assign(err, ext);
			if (isValue(code)) err.code = code;
			if (captureStackTrace) captureStackTrace(err, module.exports);
			return err;
		}; 
	} (chunk003.custom));
	return chunk003.custom.exports;
}

var hasRequiredEventEmitter;

function requireEventEmitter () {
	if (hasRequiredEventEmitter) return chunk004.eventEmitter.exports;
	hasRequiredEventEmitter = 1;
	(function (module, exports) {

		var d        = chunk005.requireD()
		  , callable = chunk004.requireValidCallable()

		  , apply = Function.prototype.apply, call = Function.prototype.call
		  , create = Object.create, defineProperty = Object.defineProperty
		  , defineProperties = Object.defineProperties
		  , hasOwnProperty = Object.prototype.hasOwnProperty
		  , descriptor = { configurable: true, enumerable: false, writable: true }

		  , on, once, off, emit, methods, descriptors, base;

		on = function (type, listener) {
			var data;

			callable(listener);

			if (!hasOwnProperty.call(this, '__ee__')) {
				data = descriptor.value = create(null);
				defineProperty(this, '__ee__', descriptor);
				descriptor.value = null;
			} else {
				data = this.__ee__;
			}
			if (!data[type]) data[type] = listener;
			else if (typeof data[type] === 'object') data[type].push(listener);
			else data[type] = [data[type], listener];

			return this;
		};

		once = function (type, listener) {
			var once, self;

			callable(listener);
			self = this;
			on.call(this, type, once = function () {
				off.call(self, type, once);
				apply.call(listener, this, arguments);
			});

			once.__eeOnceListener__ = listener;
			return this;
		};

		off = function (type, listener) {
			var data, listeners, candidate, i;

			callable(listener);

			if (!hasOwnProperty.call(this, '__ee__')) return this;
			data = this.__ee__;
			if (!data[type]) return this;
			listeners = data[type];

			if (typeof listeners === 'object') {
				for (i = 0; (candidate = listeners[i]); ++i) {
					if ((candidate === listener) ||
							(candidate.__eeOnceListener__ === listener)) {
						if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
						else listeners.splice(i, 1);
					}
				}
			} else {
				if ((listeners === listener) ||
						(listeners.__eeOnceListener__ === listener)) {
					delete data[type];
				}
			}

			return this;
		};

		emit = function (type) {
			var i, l, listener, listeners, args;

			if (!hasOwnProperty.call(this, '__ee__')) return;
			listeners = this.__ee__[type];
			if (!listeners) return;

			if (typeof listeners === 'object') {
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

				listeners = listeners.slice();
				for (i = 0; (listener = listeners[i]); ++i) {
					apply.call(listener, this, args);
				}
			} else {
				switch (arguments.length) {
				case 1:
					call.call(listeners, this);
					break;
				case 2:
					call.call(listeners, this, arguments[1]);
					break;
				case 3:
					call.call(listeners, this, arguments[1], arguments[2]);
					break;
				default:
					l = arguments.length;
					args = new Array(l - 1);
					for (i = 1; i < l; ++i) {
						args[i - 1] = arguments[i];
					}
					apply.call(listeners, this, args);
				}
			}
		};

		methods = {
			on: on,
			once: once,
			off: off,
			emit: emit
		};

		descriptors = {
			on: d(on),
			once: d(once),
			off: d(off),
			emit: d(emit)
		};

		base = defineProperties({}, descriptors);

		module.exports = exports = function (o) {
			return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
		};
		exports.methods = methods; 
	} (chunk004.eventEmitter, chunk004.eventEmitter.exports));
	return chunk004.eventEmitter.exports;
}

var toArray;
var hasRequiredToArray;

function requireToArray () {
	if (hasRequiredToArray) return toArray;
	hasRequiredToArray = 1;

	var from    = chunk005.requireFrom()
	  , isArray = Array.isArray;

	toArray = function (arrayLike) { return isArray(arrayLike) ? arrayLike : from(arrayLike); };
	return toArray;
}

var resolveResolve;
var hasRequiredResolveResolve;

function requireResolveResolve () {
	if (hasRequiredResolveResolve) return resolveResolve;
	hasRequiredResolveResolve = 1;

	var toArray  = requireToArray()
	  , isValue  = chunk004.requireIsValue()
	  , callable = chunk004.requireValidCallable();

	var slice = Array.prototype.slice, resolveArgs;

	resolveArgs = function (args) {
		return this.map(function (resolve, i) { return resolve ? resolve(args[i]) : args[i]; }).concat(
			slice.call(args, this.length)
		);
	};

	resolveResolve = function (resolvers) {
		resolvers = toArray(resolvers);
		resolvers.forEach(function (resolve) { if (isValue(resolve)) callable(resolve); });
		return resolveArgs.bind(resolvers);
	};
	return resolveResolve;
}

var resolveNormalize;
var hasRequiredResolveNormalize;

function requireResolveNormalize () {
	if (hasRequiredResolveNormalize) return resolveNormalize;
	hasRequiredResolveNormalize = 1;

	var callable = chunk004.requireValidCallable();

	resolveNormalize = function (userNormalizer) {
		var normalizer;
		if (typeof userNormalizer === "function") return { set: userNormalizer, get: userNormalizer };
		normalizer = { get: callable(userNormalizer.get) };
		if (userNormalizer.set !== undefined) {
			normalizer.set = callable(userNormalizer.set);
			if (userNormalizer.delete) normalizer.delete = callable(userNormalizer.delete);
			if (userNormalizer.clear) normalizer.clear = callable(userNormalizer.clear);
			return normalizer;
		}
		normalizer.set = normalizer.get;
		return normalizer;
	};
	return resolveNormalize;
}

/* eslint no-eq-null: 0, eqeqeq: 0, no-unused-vars: 0 */

var configureMap;
var hasRequiredConfigureMap;

function requireConfigureMap () {
	if (hasRequiredConfigureMap) return configureMap;
	hasRequiredConfigureMap = 1;

	var customError      = requireCustom()
	  , defineLength     = chunk005.require_defineLength()
	  , d                = chunk005.requireD()
	  , ee               = requireEventEmitter().methods
	  , resolveResolve   = requireResolveResolve()
	  , resolveNormalize = requireResolveNormalize();

	var apply = Function.prototype.apply
	  , call = Function.prototype.call
	  , create = Object.create
	  , defineProperties = Object.defineProperties
	  , on = ee.on
	  , emit = ee.emit;

	configureMap = function (original, length, options) {
		var cache = create(null)
		  , conf
		  , memLength
		  , get
		  , set
		  , del
		  , clear
		  , extDel
		  , extGet
		  , extHas
		  , normalizer
		  , getListeners
		  , setListeners
		  , deleteListeners
		  , memoized
		  , resolve;
		if (length !== false) memLength = length;
		else if (isNaN(original.length)) memLength = 1;
		else memLength = original.length;

		if (options.normalizer) {
			normalizer = resolveNormalize(options.normalizer);
			get = normalizer.get;
			set = normalizer.set;
			del = normalizer.delete;
			clear = normalizer.clear;
		}
		if (options.resolvers != null) resolve = resolveResolve(options.resolvers);

		if (get) {
			memoized = defineLength(function (arg) {
				var id, result, args = arguments;
				if (resolve) args = resolve(args);
				id = get(args);
				if (id !== null) {
					if (hasOwnProperty.call(cache, id)) {
						if (getListeners) conf.emit("get", id, args, this);
						return cache[id];
					}
				}
				if (args.length === 1) result = call.call(original, this, args[0]);
				else result = apply.call(original, this, args);
				if (id === null) {
					id = get(args);
					if (id !== null) throw customError("Circular invocation", "CIRCULAR_INVOCATION");
					id = set(args);
				} else if (hasOwnProperty.call(cache, id)) {
					throw customError("Circular invocation", "CIRCULAR_INVOCATION");
				}
				cache[id] = result;
				if (setListeners) conf.emit("set", id, null, result);
				return result;
			}, memLength);
		} else if (length === 0) {
			memoized = function () {
				var result;
				if (hasOwnProperty.call(cache, "data")) {
					if (getListeners) conf.emit("get", "data", arguments, this);
					return cache.data;
				}
				if (arguments.length) result = apply.call(original, this, arguments);
				else result = call.call(original, this);
				if (hasOwnProperty.call(cache, "data")) {
					throw customError("Circular invocation", "CIRCULAR_INVOCATION");
				}
				cache.data = result;
				if (setListeners) conf.emit("set", "data", null, result);
				return result;
			};
		} else {
			memoized = function (arg) {
				var result, args = arguments, id;
				if (resolve) args = resolve(arguments);
				id = String(args[0]);
				if (hasOwnProperty.call(cache, id)) {
					if (getListeners) conf.emit("get", id, args, this);
					return cache[id];
				}
				if (args.length === 1) result = call.call(original, this, args[0]);
				else result = apply.call(original, this, args);
				if (hasOwnProperty.call(cache, id)) {
					throw customError("Circular invocation", "CIRCULAR_INVOCATION");
				}
				cache[id] = result;
				if (setListeners) conf.emit("set", id, null, result);
				return result;
			};
		}
		conf = {
			original: original,
			memoized: memoized,
			profileName: options.profileName,
			get: function (args) {
				if (resolve) args = resolve(args);
				if (get) return get(args);
				return String(args[0]);
			},
			has: function (id) { return hasOwnProperty.call(cache, id); },
			delete: function (id) {
				var result;
				if (!hasOwnProperty.call(cache, id)) return;
				if (del) del(id);
				result = cache[id];
				delete cache[id];
				if (deleteListeners) conf.emit("delete", id, result);
			},
			clear: function () {
				var oldCache = cache;
				if (clear) clear();
				cache = create(null);
				conf.emit("clear", oldCache);
			},
			on: function (type, listener) {
				if (type === "get") getListeners = true;
				else if (type === "set") setListeners = true;
				else if (type === "delete") deleteListeners = true;
				return on.call(this, type, listener);
			},
			emit: emit,
			updateEnv: function () { original = conf.original; },
		};
		if (get) {
			extDel = defineLength(function (arg) {
				var id, args = arguments;
				if (resolve) args = resolve(args);
				id = get(args);
				if (id === null) return;
				conf.delete(id);
			}, memLength);
		} else if (length === 0) {
			extDel = function () { return conf.delete("data"); };
		} else {
			extDel = function (arg) {
				if (resolve) arg = resolve(arguments)[0];
				return conf.delete(arg);
			};
		}
		extGet = defineLength(function () {
			var id, args = arguments;
			if (length === 0) return cache.data;
			if (resolve) args = resolve(args);
			if (get) id = get(args);
			else id = String(args[0]);
			return cache[id];
		});
		extHas = defineLength(function () {
			var id, args = arguments;
			if (length === 0) return conf.has("data");
			if (resolve) args = resolve(args);
			if (get) id = get(args);
			else id = String(args[0]);
			if (id === null) return false;
			return conf.has(id);
		});
		defineProperties(memoized, {
			__memoized__: d(true),
			delete: d(extDel),
			clear: d(conf.clear),
			_get: d(extGet),
			_has: d(extHas),
		});
		return conf;
	};
	return configureMap;
}

var plain;
var hasRequiredPlain;

function requirePlain () {
	if (hasRequiredPlain) return plain;
	hasRequiredPlain = 1;

	var callable      = chunk004.requireValidCallable()
	  , forEach       = chunk005.requireForEach()
	  , extensions    = chunk005.requireRegisteredExtensions()
	  , configure     = requireConfigureMap()
	  , resolveLength = requireResolveLength();

	plain = function self(fn/*, options */) {
		var options, length, conf;

		callable(fn);
		options = Object(arguments[1]);

		if (options.async && options.promise) {
			throw new Error("Options 'async' and 'promise' cannot be used together");
		}

		// Do not memoize already memoized function
		if (hasOwnProperty.call(fn, "__memoized__") && !options.force) return fn;

		// Resolve length;
		length = resolveLength(options.length, fn.length, options.async && extensions.async);

		// Configure cache map
		conf = configure(fn, length, options);

		// Bind eventual extensions
		forEach(extensions, function (extFn, name) {
			if (options[name]) extFn(options[name], conf, options);
		});

		if (self.__profiler__) self.__profiler__(conf);

		conf.updateEnv();
		return conf.memoized;
	};
	return plain;
}

var primitive;
var hasRequiredPrimitive;

function requirePrimitive () {
	if (hasRequiredPrimitive) return primitive;
	hasRequiredPrimitive = 1;

	primitive = function (args) {
		var id, i, length = args.length;
		if (!length) return "\u0002";
		id = String(args[(i = 0)]);
		while (--length) id += "\u0001" + args[++i];
		return id;
	};
	return primitive;
}

var getPrimitiveFixed;
var hasRequiredGetPrimitiveFixed;

function requireGetPrimitiveFixed () {
	if (hasRequiredGetPrimitiveFixed) return getPrimitiveFixed;
	hasRequiredGetPrimitiveFixed = 1;

	getPrimitiveFixed = function (length) {
		if (!length) {
			return function () { return ""; };
		}
		return function (args) {
			var id = String(args[0]), i = 0, currentLength = length;
			while (--currentLength) {
				id += "\u0001" + args[++i];
			}
			return id;
		};
	};
	return getPrimitiveFixed;
}

var isImplemented;
var hasRequiredIsImplemented;

function requireIsImplemented () {
	if (hasRequiredIsImplemented) return isImplemented;
	hasRequiredIsImplemented = 1;

	isImplemented = function () {
		var numberIsNaN = Number.isNaN;
		if (typeof numberIsNaN !== "function") return false;
		return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);
	};
	return isImplemented;
}

var shim;
var hasRequiredShim;

function requireShim () {
	if (hasRequiredShim) return shim;
	hasRequiredShim = 1;

	shim = function (value) {
		// eslint-disable-next-line no-self-compare
		return value !== value;
	};
	return shim;
}

var isNan;
var hasRequiredIsNan;

function requireIsNan () {
	if (hasRequiredIsNan) return isNan;
	hasRequiredIsNan = 1;

	isNan = requireIsImplemented()() ? Number.isNaN : requireShim();
	return isNan;
}

var eIndexOf;
var hasRequiredEIndexOf;

function requireEIndexOf () {
	if (hasRequiredEIndexOf) return eIndexOf;
	hasRequiredEIndexOf = 1;

	var numberIsNaN       = requireIsNan()
	  , toPosInt          = chunk004.requireToPosInteger()
	  , value             = chunk004.requireValidValue()
	  , indexOf           = Array.prototype.indexOf
	  , objHasOwnProperty = Object.prototype.hasOwnProperty
	  , abs               = Math.abs
	  , floor             = Math.floor;

	eIndexOf = function (searchElement /*, fromIndex*/) {
		var i, length, fromIndex, val;
		if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);

		length = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

		for (i = fromIndex; i < length; ++i) {
			if (objHasOwnProperty.call(this, i)) {
				val = this[i];
				if (numberIsNaN(val)) return i; // Jslint: ignore
			}
		}
		return -1;
	};
	return eIndexOf;
}

/* eslint max-statements: 0 */

var get;
var hasRequiredGet;

function requireGet () {
	if (hasRequiredGet) return get;
	hasRequiredGet = 1;

	var indexOf = requireEIndexOf();

	var create = Object.create;

	get = function () {
		var lastId = 0, map = [], cache = create(null);
		return {
			get: function (args) {
				var index = 0, set = map, i, length = args.length;
				if (length === 0) return set[length] || null;
				if ((set = set[length])) {
					while (index < length - 1) {
						i = indexOf.call(set[0], args[index]);
						if (i === -1) return null;
						set = set[1][i];
						++index;
					}
					i = indexOf.call(set[0], args[index]);
					if (i === -1) return null;
					return set[1][i] || null;
				}
				return null;
			},
			set: function (args) {
				var index = 0, set = map, i, length = args.length;
				if (length === 0) {
					set[length] = ++lastId;
				} else {
					if (!set[length]) {
						set[length] = [[], []];
					}
					set = set[length];
					while (index < length - 1) {
						i = indexOf.call(set[0], args[index]);
						if (i === -1) {
							i = set[0].push(args[index]) - 1;
							set[1].push([[], []]);
						}
						set = set[1][i];
						++index;
					}
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
					}
					set[1][i] = ++lastId;
				}
				cache[lastId] = args;
				return lastId;
			},
			delete: function (id) {
				var index = 0, set = map, i, args = cache[id], length = args.length, path = [];
				if (length === 0) {
					delete set[length];
				} else if ((set = set[length])) {
					while (index < length - 1) {
						i = indexOf.call(set[0], args[index]);
						if (i === -1) {
							return;
						}
						path.push(set, i);
						set = set[1][i];
						++index;
					}
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					id = set[1][i];
					set[0].splice(i, 1);
					set[1].splice(i, 1);
					while (!set[0].length && path.length) {
						i = path.pop();
						set = path.pop();
						set[0].splice(i, 1);
						set[1].splice(i, 1);
					}
				}
				delete cache[id];
			},
			clear: function () {
				map = [];
				cache = create(null);
			},
		};
	};
	return get;
}

var get1;
var hasRequiredGet1;

function requireGet1 () {
	if (hasRequiredGet1) return get1;
	hasRequiredGet1 = 1;

	var indexOf = requireEIndexOf();

	get1 = function () {
		var lastId = 0, argsMap = [], cache = [];
		return {
			get: function (args) {
				var index = indexOf.call(argsMap, args[0]);
				return index === -1 ? null : cache[index];
			},
			set: function (args) {
				argsMap.push(args[0]);
				cache.push(++lastId);
				return lastId;
			},
			delete: function (id) {
				var index = indexOf.call(cache, id);
				if (index !== -1) {
					argsMap.splice(index, 1);
					cache.splice(index, 1);
				}
			},
			clear: function () {
				argsMap = [];
				cache = [];
			},
		};
	};
	return get1;
}

var getFixed;
var hasRequiredGetFixed;

function requireGetFixed () {
	if (hasRequiredGetFixed) return getFixed;
	hasRequiredGetFixed = 1;

	var indexOf = requireEIndexOf()
	  , create  = Object.create;

	getFixed = function (length) {
		var lastId = 0, map = [[], []], cache = create(null);
		return {
			get: function (args) {
				var index = 0, set = map, i;
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) return null;
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) return null;
				return set[1][i] || null;
			},
			set: function (args) {
				var index = 0, set = map, i;
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						i = set[0].push(args[index]) - 1;
						set[1].push([[], []]);
					}
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					i = set[0].push(args[index]) - 1;
				}
				set[1][i] = ++lastId;
				cache[lastId] = args;
				return lastId;
			},
			delete: function (id) {
				var index = 0, set = map, i, path = [], args = cache[id];
				while (index < length - 1) {
					i = indexOf.call(set[0], args[index]);
					if (i === -1) {
						return;
					}
					path.push(set, i);
					set = set[1][i];
					++index;
				}
				i = indexOf.call(set[0], args[index]);
				if (i === -1) {
					return;
				}
				id = set[1][i];
				set[0].splice(i, 1);
				set[1].splice(i, 1);
				while (!set[0].length && path.length) {
					i = path.pop();
					set = path.pop();
					set[0].splice(i, 1);
					set[1].splice(i, 1);
				}
				delete cache[id];
			},
			clear: function () {
				map = [[], []];
				cache = create(null);
			},
		};
	};
	return getFixed;
}

/* eslint max-statements: 0 */

var hasRequiredPromise;

function requirePromise () {
	if (hasRequiredPromise) return chunk004.promise;
	hasRequiredPromise = 1;

	var objectMap     = chunk005.requireMap()
	  , primitiveSet  = chunk005.requirePrimitiveSet()
	  , ensureString  = chunk005.requireValidateStringifiableValue()
	  , toShortString = chunk005.requireToShortStringRepresentation()
	  , isPromise     = chunk005.requireIsPromise()
	  , nextTick      = chunk005.requireNextTick();

	var create = Object.create
	  , supportedModes = primitiveSet("then", "then:finally", "done", "done:finally");

	chunk005.requireRegisteredExtensions().promise = function (mode, conf) {
		var waiting = create(null), cache = create(null), promises = create(null);

		if (mode === true) {
			mode = null;
		} else {
			mode = ensureString(mode);
			if (!supportedModes[mode]) {
				throw new TypeError("'" + toShortString(mode) + "' is not valid promise mode");
			}
		}

		// After not from cache call
		conf.on("set", function (id, ignore, promise) {
			var isFailed = false;

			if (!isPromise(promise)) {
				// Non promise result
				cache[id] = promise;
				conf.emit("setasync", id, 1);
				return;
			}
			waiting[id] = 1;
			promises[id] = promise;
			var onSuccess = function (result) {
				var count = waiting[id];
				if (isFailed) {
					throw new Error(
						"Memoizee error: Detected unordered then|done & finally resolution, which " +
							"in turn makes proper detection of success/failure impossible (when in " +
							"'done:finally' mode)\n" +
							"Consider to rely on 'then' or 'done' mode instead."
					);
				}
				if (!count) return; // Deleted from cache before resolved
				delete waiting[id];
				cache[id] = result;
				conf.emit("setasync", id, count);
			};
			var onFailure = function () {
				isFailed = true;
				if (!waiting[id]) return; // Deleted from cache (or succeed in case of finally)
				delete waiting[id];
				delete promises[id];
				conf.delete(id);
			};

			var resolvedMode = mode;
			if (!resolvedMode) resolvedMode = "then";

			if (resolvedMode === "then") {
				var nextTickFailure = function () { nextTick(onFailure); };
				// Eventual finally needs to be attached to non rejected promise
				// (so we not force propagation of unhandled rejection)
				promise = promise.then(function (result) {
					nextTick(onSuccess.bind(this, result));
				}, nextTickFailure);
				// If `finally` is a function we attach to it to remove cancelled promises.
				if (typeof promise.finally === "function") {
					promise.finally(nextTickFailure);
				}
			} else if (resolvedMode === "done") {
				// Not recommended, as it may mute any eventual "Unhandled error" events
				if (typeof promise.done !== "function") {
					throw new Error(
						"Memoizee error: Retrieved promise does not implement 'done' " +
							"in 'done' mode"
					);
				}
				promise.done(onSuccess, onFailure);
			} else if (resolvedMode === "done:finally") {
				// The only mode with no side effects assuming library does not throw unconditionally
				// for rejected promises.
				if (typeof promise.done !== "function") {
					throw new Error(
						"Memoizee error: Retrieved promise does not implement 'done' " +
							"in 'done:finally' mode"
					);
				}
				if (typeof promise.finally !== "function") {
					throw new Error(
						"Memoizee error: Retrieved promise does not implement 'finally' " +
							"in 'done:finally' mode"
					);
				}
				promise.done(onSuccess);
				promise.finally(onFailure);
			}
		});

		// From cache (sync)
		conf.on("get", function (id, args, context) {
			var promise;
			if (waiting[id]) {
				++waiting[id]; // Still waiting
				return;
			}
			promise = promises[id];
			var emit = function () { conf.emit("getasync", id, args, context); };
			if (isPromise(promise)) {
				if (typeof promise.done === "function") promise.done(emit);
				else {
					promise.then(function () { nextTick(emit); });
				}
			} else {
				emit();
			}
		});

		// On delete
		conf.on("delete", function (id) {
			delete promises[id];
			if (waiting[id]) {
				delete waiting[id];
				return; // Not yet resolved
			}
			if (!hasOwnProperty.call(cache, id)) return;
			var result = cache[id];
			delete cache[id];
			conf.emit("deleteasync", id, [result]);
		});

		// On clear
		conf.on("clear", function () {
			var oldCache = cache;
			cache = create(null);
			waiting = create(null);
			promises = create(null);
			conf.emit("clearasync", objectMap(oldCache, function (data) { return [data]; }));
		});
	};
	return chunk004.promise;
}

var hasRequiredRefCounter;

function requireRefCounter () {
	if (hasRequiredRefCounter) return chunk004.refCounter;
	hasRequiredRefCounter = 1;

	var d                = chunk005.requireD()
	  , extensions       = chunk005.requireRegisteredExtensions()
	  , create           = Object.create
	  , defineProperties = Object.defineProperties;

	extensions.refCounter = function (ignore, conf, options) {
		var cache, postfix;

		cache = create(null);
		postfix =
			(options.async && extensions.async) || (options.promise && extensions.promise)
				? "async"
				: "";

		conf.on("set" + postfix, function (id, length) { cache[id] = length || 1; });
		conf.on("get" + postfix, function (id) { ++cache[id]; });
		conf.on("delete" + postfix, function (id) { delete cache[id]; });
		conf.on("clear" + postfix, function () { cache = {}; });

		defineProperties(conf.memoized, {
			deleteRef: d(function () {
				var id = conf.get(arguments);
				if (id === null) return null;
				if (!cache[id]) return null;
				if (!--cache[id]) {
					conf.delete(id);
					return true;
				}
				return false;
			}),
			getRefCount: d(function () {
				var id = conf.get(arguments);
				if (id === null) return 0;
				if (!cache[id]) return 0;
				return cache[id];
			}),
		});
	};
	return chunk004.refCounter;
}

var memoizee;
var hasRequiredMemoizee;

function requireMemoizee () {
	if (hasRequiredMemoizee) return memoizee;
	hasRequiredMemoizee = 1;

	var normalizeOpts = chunk004.requireNormalizeOptions()
	  , resolveLength = requireResolveLength()
	  , plain         = requirePlain();

	memoizee = function (fn/*, options*/) {
		var options = normalizeOpts(arguments[1]), length;

		if (!options.normalizer) {
			length = options.length = resolveLength(options.length, fn.length, options.async);
			if (length !== 0) {
				if (options.primitive) {
					if (length === false) {
						options.normalizer = requirePrimitive();
					} else if (length > 1) {
						options.normalizer = requireGetPrimitiveFixed()(length);
					}
				} else if (length === false) options.normalizer = requireGet()();
				else if (length === 1) options.normalizer = requireGet1()();
				else options.normalizer = requireGetFixed()(length);
			}
		}

		// Assure extensions
		if (options.async) chunk005.requireAsync();
		if (options.promise) requirePromise();
		if (options.dispose) chunk005.requireDispose();
		if (options.maxAge) chunk005.requireMaxAge();
		if (options.max) chunk005.requireMax();
		if (options.refCounter) requireRefCounter();

		return plain(fn, options);
	};
	return memoizee;
}

var memoizeeExports = requireMemoizee();
const memoize = /*@__PURE__*/chunk000.getDefaultExportFromCjs(memoizeeExports);

exports.memoize = memoize;
exports.typedarray = typedarray;
