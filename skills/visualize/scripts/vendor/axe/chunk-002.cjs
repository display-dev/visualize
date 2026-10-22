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
const chunk001 = require('./chunk-001.cjs');

var es_object_hasOwn = {};

var hasRequiredEs_object_hasOwn;

function requireEs_object_hasOwn () {
	if (hasRequiredEs_object_hasOwn) return es_object_hasOwn;
	hasRequiredEs_object_hasOwn = 1;
	var $ = /*@__PURE__*/ chunk001.require_export();
	var hasOwn = /*@__PURE__*/ chunk000.requireHasOwnProperty();

	// `Object.hasOwn` method
	// https://tc39.es/ecma262/#sec-object.hasown
	$({ target: 'Object', stat: true }, {
	  hasOwn: hasOwn
	});
	return es_object_hasOwn;
}

var hasOwn$3;
var hasRequiredHasOwn$2;

function requireHasOwn$2 () {
	if (hasRequiredHasOwn$2) return hasOwn$3;
	hasRequiredHasOwn$2 = 1;
	requireEs_object_hasOwn();
	var path = /*@__PURE__*/ chunk000.requirePath();

	hasOwn$3 = path.Object.hasOwn;
	return hasOwn$3;
}

var hasOwn$2;
var hasRequiredHasOwn$1;

function requireHasOwn$1 () {
	if (hasRequiredHasOwn$1) return hasOwn$2;
	hasRequiredHasOwn$1 = 1;
	var parent = /*@__PURE__*/ requireHasOwn$2();

	hasOwn$2 = parent;
	return hasOwn$2;
}

var hasOwn$1;
var hasRequiredHasOwn;

function requireHasOwn () {
	if (hasRequiredHasOwn) return hasOwn$1;
	hasRequiredHasOwn = 1;
	var parent = /*@__PURE__*/ requireHasOwn$1();

	hasOwn$1 = parent;
	return hasOwn$1;
}

var hasOwnExports = /*@__PURE__*/ requireHasOwn();
const hasOwn = /*@__PURE__*/chunk000.getDefaultExportFromCjs(hasOwnExports);

var es_object_values = {};

var correctPrototypeGetter;
var hasRequiredCorrectPrototypeGetter;

function requireCorrectPrototypeGetter () {
	if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
	hasRequiredCorrectPrototypeGetter = 1;
	var fails = /*@__PURE__*/ chunk000.requireFails();

	correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});
	return correctPrototypeGetter;
}

var objectGetPrototypeOf;
var hasRequiredObjectGetPrototypeOf;

function requireObjectGetPrototypeOf () {
	if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
	hasRequiredObjectGetPrototypeOf = 1;
	var hasOwn = /*@__PURE__*/ chunk000.requireHasOwnProperty();
	var isCallable = /*@__PURE__*/ chunk000.requireIsCallable();
	var toObject = /*@__PURE__*/ chunk000.requireToObject();
	var sharedKey = /*@__PURE__*/ chunk001.requireSharedKey();
	var CORRECT_PROTOTYPE_GETTER = /*@__PURE__*/ requireCorrectPrototypeGetter();

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject(O);
	  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype : null;
	};
	return objectGetPrototypeOf;
}

var toAbsoluteIndex;
var hasRequiredToAbsoluteIndex;

function requireToAbsoluteIndex () {
	if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
	hasRequiredToAbsoluteIndex = 1;
	var toIntegerOrInfinity = /*@__PURE__*/ chunk001.requireToIntegerOrInfinity();

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	toAbsoluteIndex = function (index, length) {
	  var integer = toIntegerOrInfinity(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};
	return toAbsoluteIndex;
}

var arrayIncludes;
var hasRequiredArrayIncludes;

function requireArrayIncludes () {
	if (hasRequiredArrayIncludes) return arrayIncludes;
	hasRequiredArrayIncludes = 1;
	var toIndexedObject = /*@__PURE__*/ chunk001.requireToIndexedObject();
	var toAbsoluteIndex = /*@__PURE__*/ requireToAbsoluteIndex();
	var lengthOfArrayLike = /*@__PURE__*/ chunk001.requireLengthOfArrayLike();

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = lengthOfArrayLike(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};
	return arrayIncludes;
}

var objectKeysInternal;
var hasRequiredObjectKeysInternal;

function requireObjectKeysInternal () {
	if (hasRequiredObjectKeysInternal) return objectKeysInternal;
	hasRequiredObjectKeysInternal = 1;
	var uncurryThis = /*@__PURE__*/ chunk000.requireFunctionUncurryThis();
	var hasOwn = /*@__PURE__*/ chunk000.requireHasOwnProperty();
	var toIndexedObject = /*@__PURE__*/ chunk001.requireToIndexedObject();
	var indexOf = /*@__PURE__*/ requireArrayIncludes().indexOf;
	var hiddenKeys = /*@__PURE__*/ chunk001.requireHiddenKeys();

	var push = uncurryThis([].push);

	objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
	  }
	  return result;
	};
	return objectKeysInternal;
}

var enumBugKeys;
var hasRequiredEnumBugKeys;

function requireEnumBugKeys () {
	if (hasRequiredEnumBugKeys) return enumBugKeys;
	hasRequiredEnumBugKeys = 1;
	// IE8- don't enum bug keys
	enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];
	return enumBugKeys;
}

var objectKeys;
var hasRequiredObjectKeys;

function requireObjectKeys () {
	if (hasRequiredObjectKeys) return objectKeys;
	hasRequiredObjectKeys = 1;
	var internalObjectKeys = /*@__PURE__*/ requireObjectKeysInternal();
	var enumBugKeys = /*@__PURE__*/ requireEnumBugKeys();

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	objectKeys = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys);
	};
	return objectKeys;
}

var objectToArray;
var hasRequiredObjectToArray;

function requireObjectToArray () {
	if (hasRequiredObjectToArray) return objectToArray;
	hasRequiredObjectToArray = 1;
	var DESCRIPTORS = /*@__PURE__*/ chunk000.requireDescriptors();
	var fails = /*@__PURE__*/ chunk000.requireFails();
	var uncurryThis = /*@__PURE__*/ chunk000.requireFunctionUncurryThis();
	var objectGetPrototypeOf = /*@__PURE__*/ requireObjectGetPrototypeOf();
	var objectKeys = /*@__PURE__*/ requireObjectKeys();
	var toIndexedObject = /*@__PURE__*/ chunk001.requireToIndexedObject();
	var $propertyIsEnumerable = /*@__PURE__*/ chunk001.requireObjectPropertyIsEnumerable().f;

	var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
	var push = uncurryThis([].push);

	// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
	// of `null` prototype objects
	var IE_BUG = DESCRIPTORS && fails(function () {
	  // eslint-disable-next-line es/no-object-create -- safe
	  var O = Object.create(null);
	  O[2] = 2;
	  return !propertyIsEnumerable(O, 2);
	});

	// `Object.{ entries, values }` methods implementation
	var createMethod = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
	        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod(false)
	};
	return objectToArray;
}

var hasRequiredEs_object_values;

function requireEs_object_values () {
	if (hasRequiredEs_object_values) return es_object_values;
	hasRequiredEs_object_values = 1;
	var $ = /*@__PURE__*/ chunk001.require_export();
	var $values = /*@__PURE__*/ requireObjectToArray().values;

	// `Object.values` method
	// https://tc39.es/ecma262/#sec-object.values
	$({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return $values(O);
	  }
	});
	return es_object_values;
}

var values;
var hasRequiredValues;

function requireValues () {
	if (hasRequiredValues) return values;
	hasRequiredValues = 1;
	requireEs_object_values();
	var path = /*@__PURE__*/ chunk000.requirePath();

	values = path.Object.values;
	return values;
}

var toString;
var hasRequiredToString;

function requireToString () {
	if (hasRequiredToString) return toString;
	hasRequiredToString = 1;
	var classof = /*@__PURE__*/ chunk001.requireClassof();

	var $String = String;

	toString = function (argument) {
	  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};
	return toString;
}

var stringMultibyte;
var hasRequiredStringMultibyte;

function requireStringMultibyte () {
	if (hasRequiredStringMultibyte) return stringMultibyte;
	hasRequiredStringMultibyte = 1;
	var uncurryThis = /*@__PURE__*/ chunk000.requireFunctionUncurryThis();
	var toIntegerOrInfinity = /*@__PURE__*/ chunk001.requireToIntegerOrInfinity();
	var toString = /*@__PURE__*/ requireToString();
	var requireObjectCoercible = /*@__PURE__*/ chunk000.requireRequireObjectCoercible();

	var charAt = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var stringSlice = uncurryThis(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString(requireObjectCoercible($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};
	return stringMultibyte;
}

var functionName;
var hasRequiredFunctionName;

function requireFunctionName () {
	if (hasRequiredFunctionName) return functionName;
	hasRequiredFunctionName = 1;
	var DESCRIPTORS = /*@__PURE__*/ chunk000.requireDescriptors();
	var hasOwn = /*@__PURE__*/ chunk000.requireHasOwnProperty();

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

	functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};
	return functionName;
}

var objectDefineProperties = {};

var hasRequiredObjectDefineProperties;

function requireObjectDefineProperties () {
	if (hasRequiredObjectDefineProperties) return objectDefineProperties;
	hasRequiredObjectDefineProperties = 1;
	var DESCRIPTORS = /*@__PURE__*/ chunk000.requireDescriptors();
	var V8_PROTOTYPE_DEFINE_BUG = /*@__PURE__*/ chunk000.requireV8PrototypeDefineBug();
	var definePropertyModule = /*@__PURE__*/ chunk001.requireObjectDefineProperty();
	var anObject = /*@__PURE__*/ chunk000.requireAnObject();
	var toIndexedObject = /*@__PURE__*/ chunk001.requireToIndexedObject();
	var objectKeys = /*@__PURE__*/ requireObjectKeys();

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};
	return objectDefineProperties;
}

var html;
var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html;
	hasRequiredHtml = 1;
	var getBuiltIn = /*@__PURE__*/ chunk000.requireGetBuiltIn();

	html = getBuiltIn('document', 'documentElement');
	return html;
}

var objectCreate;
var hasRequiredObjectCreate;

function requireObjectCreate () {
	if (hasRequiredObjectCreate) return objectCreate;
	hasRequiredObjectCreate = 1;
	/* global ActiveXObject -- old IE, WSH */
	var anObject = /*@__PURE__*/ chunk000.requireAnObject();
	var definePropertiesModule = /*@__PURE__*/ requireObjectDefineProperties();
	var enumBugKeys = /*@__PURE__*/ requireEnumBugKeys();
	var hiddenKeys = /*@__PURE__*/ chunk001.requireHiddenKeys();
	var html = /*@__PURE__*/ requireHtml();
	var documentCreateElement = /*@__PURE__*/ chunk000.requireDocumentCreateElement();
	var sharedKey = /*@__PURE__*/ chunk001.requireSharedKey();

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
	  activeXDocument = null;
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};
	return objectCreate;
}

var iteratorsCore;
var hasRequiredIteratorsCore;

function requireIteratorsCore () {
	if (hasRequiredIteratorsCore) return iteratorsCore;
	hasRequiredIteratorsCore = 1;
	var fails = /*@__PURE__*/ chunk000.requireFails();
	var isCallable = /*@__PURE__*/ chunk000.requireIsCallable();
	var isObject = /*@__PURE__*/ chunk000.requireIsObject();
	var create = /*@__PURE__*/ requireObjectCreate();
	var getPrototypeOf = /*@__PURE__*/ requireObjectGetPrototypeOf();
	var defineBuiltIn = /*@__PURE__*/ chunk001.requireDefineBuiltIn();
	var wellKnownSymbol = /*@__PURE__*/ chunk000.requireWellKnownSymbol();
	var IS_PURE = /*@__PURE__*/ chunk000.requireIsPure();

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype[ITERATOR].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
	else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable(IteratorPrototype[ITERATOR])) {
	  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
	    return this;
	  });
	}

	iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};
	return iteratorsCore;
}

var objectToString;
var hasRequiredObjectToString;

function requireObjectToString () {
	if (hasRequiredObjectToString) return objectToString;
	hasRequiredObjectToString = 1;
	var TO_STRING_TAG_SUPPORT = /*@__PURE__*/ chunk001.requireToStringTagSupport();
	var classof = /*@__PURE__*/ chunk001.requireClassof();

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	objectToString = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};
	return objectToString;
}

var setToStringTag;
var hasRequiredSetToStringTag;

function requireSetToStringTag () {
	if (hasRequiredSetToStringTag) return setToStringTag;
	hasRequiredSetToStringTag = 1;
	var TO_STRING_TAG_SUPPORT = /*@__PURE__*/ chunk001.requireToStringTagSupport();
	var defineProperty = /*@__PURE__*/ chunk001.requireObjectDefineProperty().f;
	var createNonEnumerableProperty = /*@__PURE__*/ chunk001.requireCreateNonEnumerableProperty();
	var hasOwn = /*@__PURE__*/ chunk000.requireHasOwnProperty();
	var toString = /*@__PURE__*/ requireObjectToString();
	var wellKnownSymbol = /*@__PURE__*/ chunk000.requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  var target = STATIC ? it : it && it.prototype;
	  if (target) {
	    if (!hasOwn(target, TO_STRING_TAG)) {
	      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty(target, 'toString', toString);
	    }
	  }
	};
	return setToStringTag;
}

var iteratorCreateConstructor;
var hasRequiredIteratorCreateConstructor;

function requireIteratorCreateConstructor () {
	if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
	hasRequiredIteratorCreateConstructor = 1;
	var IteratorPrototype = /*@__PURE__*/ requireIteratorsCore().IteratorPrototype;
	var create = /*@__PURE__*/ requireObjectCreate();
	var createPropertyDescriptor = /*@__PURE__*/ chunk000.requireCreatePropertyDescriptor();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var Iterators = /*@__PURE__*/ chunk001.requireIterators();

	var returnThis = function () { return this; };

	iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};
	return iteratorCreateConstructor;
}

var functionUncurryThisAccessor;
var hasRequiredFunctionUncurryThisAccessor;

function requireFunctionUncurryThisAccessor () {
	if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
	hasRequiredFunctionUncurryThisAccessor = 1;
	var uncurryThis = /*@__PURE__*/ chunk000.requireFunctionUncurryThis();
	var aCallable = /*@__PURE__*/ chunk000.requireACallable();

	functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};
	return functionUncurryThisAccessor;
}

var isPossiblePrototype;
var hasRequiredIsPossiblePrototype;

function requireIsPossiblePrototype () {
	if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
	hasRequiredIsPossiblePrototype = 1;
	var isObject = /*@__PURE__*/ chunk000.requireIsObject();

	isPossiblePrototype = function (argument) {
	  return isObject(argument) || argument === null;
	};
	return isPossiblePrototype;
}

var aPossiblePrototype;
var hasRequiredAPossiblePrototype;

function requireAPossiblePrototype () {
	if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
	hasRequiredAPossiblePrototype = 1;
	var isPossiblePrototype = /*@__PURE__*/ requireIsPossiblePrototype();

	var $String = String;
	var $TypeError = TypeError;

	aPossiblePrototype = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
	};
	return aPossiblePrototype;
}

var objectSetPrototypeOf;
var hasRequiredObjectSetPrototypeOf;

function requireObjectSetPrototypeOf () {
	if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
	hasRequiredObjectSetPrototypeOf = 1;
	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = /*@__PURE__*/ requireFunctionUncurryThisAccessor();
	var isObject = /*@__PURE__*/ chunk000.requireIsObject();
	var requireObjectCoercible = /*@__PURE__*/ chunk000.requireRequireObjectCoercible();
	var aPossiblePrototype = /*@__PURE__*/ requireAPossiblePrototype();

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    requireObjectCoercible(O);
	    aPossiblePrototype(proto);
	    if (!isObject(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);
	return objectSetPrototypeOf;
}

var iteratorDefine;
var hasRequiredIteratorDefine;

function requireIteratorDefine () {
	if (hasRequiredIteratorDefine) return iteratorDefine;
	hasRequiredIteratorDefine = 1;
	var $ = /*@__PURE__*/ chunk001.require_export();
	var call = /*@__PURE__*/ chunk000.requireFunctionCall();
	var IS_PURE = /*@__PURE__*/ chunk000.requireIsPure();
	var FunctionName = /*@__PURE__*/ requireFunctionName();
	var isCallable = /*@__PURE__*/ chunk000.requireIsCallable();
	var createIteratorConstructor = /*@__PURE__*/ requireIteratorCreateConstructor();
	var getPrototypeOf = /*@__PURE__*/ requireObjectGetPrototypeOf();
	var setPrototypeOf = /*@__PURE__*/ requireObjectSetPrototypeOf();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var createNonEnumerableProperty = /*@__PURE__*/ chunk001.requireCreateNonEnumerableProperty();
	var defineBuiltIn = /*@__PURE__*/ chunk001.requireDefineBuiltIn();
	var wellKnownSymbol = /*@__PURE__*/ chunk000.requireWellKnownSymbol();
	var Iterators = /*@__PURE__*/ chunk001.requireIterators();
	var IteratorsCore = /*@__PURE__*/ requireIteratorsCore();

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    }

	    return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf) {
	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
	          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call(nativeIterator, this); };
	    }
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators[NAME] = defaultIterator;

	  return methods;
	};
	return iteratorDefine;
}

var hasRequiredEs_string_iterator;

function requireEs_string_iterator () {
	if (hasRequiredEs_string_iterator) return chunk001.es_string_iterator;
	hasRequiredEs_string_iterator = 1;
	var charAt = /*@__PURE__*/ requireStringMultibyte().charAt;
	var toString = /*@__PURE__*/ requireToString();
	var InternalStateModule = /*@__PURE__*/ chunk001.requireInternalState();
	var defineIterator = /*@__PURE__*/ requireIteratorDefine();
	var createIterResultObject = /*@__PURE__*/ chunk001.requireCreateIterResultObject();

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject(undefined, true);
	  point = charAt(string, index);
	  state.index += point.length;
	  return createIterResultObject(point, false);
	});
	return chunk001.es_string_iterator;
}

var from$2;
var hasRequiredFrom$2;

function requireFrom$2 () {
	if (hasRequiredFrom$2) return from$2;
	hasRequiredFrom$2 = 1;
	requireEs_string_iterator();
	chunk001.requireEs_array_from();
	var path = /*@__PURE__*/ chunk000.requirePath();

	from$2 = path.Array.from;
	return from$2;
}

var from$1;
var hasRequiredFrom$1;

function requireFrom$1 () {
	if (hasRequiredFrom$1) return from$1;
	hasRequiredFrom$1 = 1;
	var parent = /*@__PURE__*/ requireFrom$2();

	from$1 = parent;
	return from$1;
}

var from;
var hasRequiredFrom;

function requireFrom () {
	if (hasRequiredFrom) return from;
	hasRequiredFrom = 1;
	var parent = /*@__PURE__*/ requireFrom$1();

	from = parent;
	return from;
}

var fromExports = /*@__PURE__*/ requireFrom();
const ArrayFrom = /*@__PURE__*/chunk000.getDefaultExportFromCjs(fromExports);

exports.ArrayFrom = ArrayFrom;
exports.hasOwn = hasOwn;
exports.requireValues = requireValues;
