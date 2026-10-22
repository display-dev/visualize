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
const chunk003 = require('./chunk-003.cjs');

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */
var es6Promise = chunk003.es6Promise.exports;

var hasRequiredEs6Promise;

function requireEs6Promise () {
	if (hasRequiredEs6Promise) return chunk003.es6Promise.exports;
	hasRequiredEs6Promise = 1;
	(function (module, exports) {
		(function (global, factory) {
			module.exports = factory() ;
		}(es6Promise, (function () {
		function objectOrFunction(x) {
		  var type = typeof x;
		  return x !== null && (type === 'object' || type === 'function');
		}

		function isFunction(x) {
		  return typeof x === 'function';
		}



		var _isArray = void 0;
		if (Array.isArray) {
		  _isArray = Array.isArray;
		} else {
		  _isArray = function (x) {
		    return Object.prototype.toString.call(x) === '[object Array]';
		  };
		}

		var isArray = _isArray;

		var len = 0;
		var vertxNext = void 0;
		var customSchedulerFn = void 0;

		var asap = function asap(callback, arg) {
		  queue[len] = callback;
		  queue[len + 1] = arg;
		  len += 2;
		  if (len === 2) {
		    // If len is 2, that means that we need to schedule an async flush.
		    // If additional callbacks are queued before the queue is flushed, they
		    // will be processed by this flush that we are scheduling.
		    if (customSchedulerFn) {
		      customSchedulerFn(flush);
		    } else {
		      scheduleFlush();
		    }
		  }
		};

		function setScheduler(scheduleFn) {
		  customSchedulerFn = scheduleFn;
		}

		function setAsap(asapFn) {
		  asap = asapFn;
		}

		var browserWindow = typeof window !== 'undefined' ? window : undefined;
		var browserGlobal = browserWindow || {};
		var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
		var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

		// test for web worker but not in IE10
		var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

		// node
		function useNextTick() {
		  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
		  // see https://github.com/cujojs/when/issues/410 for details
		  return function () {
		    return process.nextTick(flush);
		  };
		}

		// vertx
		function useVertxTimer() {
		  if (typeof vertxNext !== 'undefined') {
		    return function () {
		      vertxNext(flush);
		    };
		  }

		  return useSetTimeout();
		}

		function useMutationObserver() {
		  var iterations = 0;
		  var observer = new BrowserMutationObserver(flush);
		  var node = document.createTextNode('');
		  observer.observe(node, { characterData: true });

		  return function () {
		    node.data = iterations = ++iterations % 2;
		  };
		}

		// web worker
		function useMessageChannel() {
		  var channel = new MessageChannel();
		  channel.port1.onmessage = flush;
		  return function () {
		    return channel.port2.postMessage(0);
		  };
		}

		function useSetTimeout() {
		  // Store setTimeout reference so es6-promise will be unaffected by
		  // other code modifying setTimeout (like sinon.useFakeTimers())
		  var globalSetTimeout = setTimeout;
		  return function () {
		    return globalSetTimeout(flush, 1);
		  };
		}

		var queue = new Array(1000);
		function flush() {
		  for (var i = 0; i < len; i += 2) {
		    var callback = queue[i];
		    var arg = queue[i + 1];

		    callback(arg);

		    queue[i] = undefined;
		    queue[i + 1] = undefined;
		  }

		  len = 0;
		}

		function attemptVertx() {
		  try {
		    var vertx = Function('return this')().require('vertx');
		    vertxNext = vertx.runOnLoop || vertx.runOnContext;
		    return useVertxTimer();
		  } catch (e) {
		    return useSetTimeout();
		  }
		}

		var scheduleFlush = void 0;
		// Decide what async method to use to triggering processing of queued callbacks:
		if (isNode) {
		  scheduleFlush = useNextTick();
		} else if (BrowserMutationObserver) {
		  scheduleFlush = useMutationObserver();
		} else if (isWorker) {
		  scheduleFlush = useMessageChannel();
		} else if (browserWindow === undefined && typeof chunk003.commonjsRequire === 'function') {
		  scheduleFlush = attemptVertx();
		} else {
		  scheduleFlush = useSetTimeout();
		}

		function then(onFulfillment, onRejection) {
		  var parent = this;

		  var child = new this.constructor(noop);

		  if (child[PROMISE_ID] === undefined) {
		    makePromise(child);
		  }

		  var _state = parent._state;


		  if (_state) {
		    var callback = arguments[_state - 1];
		    asap(function () {
		      return invokeCallback(_state, child, callback, parent._result);
		    });
		  } else {
		    subscribe(parent, child, onFulfillment, onRejection);
		  }

		  return child;
		}

		/**
		  `Promise.resolve` returns a promise that will become resolved with the
		  passed `value`. It is shorthand for the following:

		  ```javascript
		  let promise = new Promise(function(resolve, reject){
		    resolve(1);
		  });

		  promise.then(function(value){
		    // value === 1
		  });
		  ```

		  Instead of writing the above, your code now simply becomes the following:

		  ```javascript
		  let promise = Promise.resolve(1);

		  promise.then(function(value){
		    // value === 1
		  });
		  ```

		  @method resolve
		  @static
		  @param {Any} value value that the returned promise will be resolved with
		  Useful for tooling.
		  @return {Promise} a promise that will become fulfilled with the given
		  `value`
		*/
		function resolve$1(object) {
		  /*jshint validthis:true */
		  var Constructor = this;

		  if (object && typeof object === 'object' && object.constructor === Constructor) {
		    return object;
		  }

		  var promise = new Constructor(noop);
		  resolve(promise, object);
		  return promise;
		}

		var PROMISE_ID = Math.random().toString(36).substring(2);

		function noop() {}

		var PENDING = void 0;
		var FULFILLED = 1;
		var REJECTED = 2;

		function selfFulfillment() {
		  return new TypeError("You cannot resolve a promise with itself");
		}

		function cannotReturnOwn() {
		  return new TypeError('A promises callback cannot return that same promise.');
		}

		function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
		  try {
		    then$$1.call(value, fulfillmentHandler, rejectionHandler);
		  } catch (e) {
		    return e;
		  }
		}

		function handleForeignThenable(promise, thenable, then$$1) {
		  asap(function (promise) {
		    var sealed = false;
		    var error = tryThen(then$$1, thenable, function (value) {
		      if (sealed) {
		        return;
		      }
		      sealed = true;
		      if (thenable !== value) {
		        resolve(promise, value);
		      } else {
		        fulfill(promise, value);
		      }
		    }, function (reason) {
		      if (sealed) {
		        return;
		      }
		      sealed = true;

		      reject(promise, reason);
		    }, 'Settle: ' + (promise._label || ' unknown promise'));

		    if (!sealed && error) {
		      sealed = true;
		      reject(promise, error);
		    }
		  }, promise);
		}

		function handleOwnThenable(promise, thenable) {
		  if (thenable._state === FULFILLED) {
		    fulfill(promise, thenable._result);
		  } else if (thenable._state === REJECTED) {
		    reject(promise, thenable._result);
		  } else {
		    subscribe(thenable, undefined, function (value) {
		      return resolve(promise, value);
		    }, function (reason) {
		      return reject(promise, reason);
		    });
		  }
		}

		function handleMaybeThenable(promise, maybeThenable, then$$1) {
		  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
		    handleOwnThenable(promise, maybeThenable);
		  } else {
		    if (then$$1 === undefined) {
		      fulfill(promise, maybeThenable);
		    } else if (isFunction(then$$1)) {
		      handleForeignThenable(promise, maybeThenable, then$$1);
		    } else {
		      fulfill(promise, maybeThenable);
		    }
		  }
		}

		function resolve(promise, value) {
		  if (promise === value) {
		    reject(promise, selfFulfillment());
		  } else if (objectOrFunction(value)) {
		    var then$$1 = void 0;
		    try {
		      then$$1 = value.then;
		    } catch (error) {
		      reject(promise, error);
		      return;
		    }
		    handleMaybeThenable(promise, value, then$$1);
		  } else {
		    fulfill(promise, value);
		  }
		}

		function publishRejection(promise) {
		  if (promise._onerror) {
		    promise._onerror(promise._result);
		  }

		  publish(promise);
		}

		function fulfill(promise, value) {
		  if (promise._state !== PENDING) {
		    return;
		  }

		  promise._result = value;
		  promise._state = FULFILLED;

		  if (promise._subscribers.length !== 0) {
		    asap(publish, promise);
		  }
		}

		function reject(promise, reason) {
		  if (promise._state !== PENDING) {
		    return;
		  }
		  promise._state = REJECTED;
		  promise._result = reason;

		  asap(publishRejection, promise);
		}

		function subscribe(parent, child, onFulfillment, onRejection) {
		  var _subscribers = parent._subscribers;
		  var length = _subscribers.length;


		  parent._onerror = null;

		  _subscribers[length] = child;
		  _subscribers[length + FULFILLED] = onFulfillment;
		  _subscribers[length + REJECTED] = onRejection;

		  if (length === 0 && parent._state) {
		    asap(publish, parent);
		  }
		}

		function publish(promise) {
		  var subscribers = promise._subscribers;
		  var settled = promise._state;

		  if (subscribers.length === 0) {
		    return;
		  }

		  var child = void 0,
		      callback = void 0,
		      detail = promise._result;

		  for (var i = 0; i < subscribers.length; i += 3) {
		    child = subscribers[i];
		    callback = subscribers[i + settled];

		    if (child) {
		      invokeCallback(settled, child, callback, detail);
		    } else {
		      callback(detail);
		    }
		  }

		  promise._subscribers.length = 0;
		}

		function invokeCallback(settled, promise, callback, detail) {
		  var hasCallback = isFunction(callback),
		      value = void 0,
		      error = void 0,
		      succeeded = true;

		  if (hasCallback) {
		    try {
		      value = callback(detail);
		    } catch (e) {
		      succeeded = false;
		      error = e;
		    }

		    if (promise === value) {
		      reject(promise, cannotReturnOwn());
		      return;
		    }
		  } else {
		    value = detail;
		  }

		  if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
		    resolve(promise, value);
		  } else if (succeeded === false) {
		    reject(promise, error);
		  } else if (settled === FULFILLED) {
		    fulfill(promise, value);
		  } else if (settled === REJECTED) {
		    reject(promise, value);
		  }
		}

		function initializePromise(promise, resolver) {
		  try {
		    resolver(function resolvePromise(value) {
		      resolve(promise, value);
		    }, function rejectPromise(reason) {
		      reject(promise, reason);
		    });
		  } catch (e) {
		    reject(promise, e);
		  }
		}

		var id = 0;
		function nextId() {
		  return id++;
		}

		function makePromise(promise) {
		  promise[PROMISE_ID] = id++;
		  promise._state = undefined;
		  promise._result = undefined;
		  promise._subscribers = [];
		}

		function validationError() {
		  return new Error('Array Methods must be provided an Array');
		}

		var Enumerator = function () {
		  function Enumerator(Constructor, input) {
		    this._instanceConstructor = Constructor;
		    this.promise = new Constructor(noop);

		    if (!this.promise[PROMISE_ID]) {
		      makePromise(this.promise);
		    }

		    if (isArray(input)) {
		      this.length = input.length;
		      this._remaining = input.length;

		      this._result = new Array(this.length);

		      if (this.length === 0) {
		        fulfill(this.promise, this._result);
		      } else {
		        this.length = this.length || 0;
		        this._enumerate(input);
		        if (this._remaining === 0) {
		          fulfill(this.promise, this._result);
		        }
		      }
		    } else {
		      reject(this.promise, validationError());
		    }
		  }

		  Enumerator.prototype._enumerate = function _enumerate(input) {
		    for (var i = 0; this._state === PENDING && i < input.length; i++) {
		      this._eachEntry(input[i], i);
		    }
		  };

		  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
		    var c = this._instanceConstructor;
		    var resolve$$1 = c.resolve;


		    if (resolve$$1 === resolve$1) {
		      var _then = void 0;
		      var error = void 0;
		      var didError = false;
		      try {
		        _then = entry.then;
		      } catch (e) {
		        didError = true;
		        error = e;
		      }

		      if (_then === then && entry._state !== PENDING) {
		        this._settledAt(entry._state, i, entry._result);
		      } else if (typeof _then !== 'function') {
		        this._remaining--;
		        this._result[i] = entry;
		      } else if (c === Promise$1) {
		        var promise = new c(noop);
		        if (didError) {
		          reject(promise, error);
		        } else {
		          handleMaybeThenable(promise, entry, _then);
		        }
		        this._willSettleAt(promise, i);
		      } else {
		        this._willSettleAt(new c(function (resolve$$1) {
		          return resolve$$1(entry);
		        }), i);
		      }
		    } else {
		      this._willSettleAt(resolve$$1(entry), i);
		    }
		  };

		  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
		    var promise = this.promise;


		    if (promise._state === PENDING) {
		      this._remaining--;

		      if (state === REJECTED) {
		        reject(promise, value);
		      } else {
		        this._result[i] = value;
		      }
		    }

		    if (this._remaining === 0) {
		      fulfill(promise, this._result);
		    }
		  };

		  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
		    var enumerator = this;

		    subscribe(promise, undefined, function (value) {
		      return enumerator._settledAt(FULFILLED, i, value);
		    }, function (reason) {
		      return enumerator._settledAt(REJECTED, i, reason);
		    });
		  };

		  return Enumerator;
		}();

		/**
		  `Promise.all` accepts an array of promises, and returns a new promise which
		  is fulfilled with an array of fulfillment values for the passed promises, or
		  rejected with the reason of the first passed promise to be rejected. It casts all
		  elements of the passed iterable to promises as it runs this algorithm.

		  Example:

		  ```javascript
		  let promise1 = resolve(1);
		  let promise2 = resolve(2);
		  let promise3 = resolve(3);
		  let promises = [ promise1, promise2, promise3 ];

		  Promise.all(promises).then(function(array){
		    // The array here would be [ 1, 2, 3 ];
		  });
		  ```

		  If any of the `promises` given to `all` are rejected, the first promise
		  that is rejected will be given as an argument to the returned promises's
		  rejection handler. For example:

		  Example:

		  ```javascript
		  let promise1 = resolve(1);
		  let promise2 = reject(new Error("2"));
		  let promise3 = reject(new Error("3"));
		  let promises = [ promise1, promise2, promise3 ];

		  Promise.all(promises).then(function(array){
		    // Code here never runs because there are rejected promises!
		  }, function(error) {
		    // error.message === "2"
		  });
		  ```

		  @method all
		  @static
		  @param {Array} entries array of promises
		  @param {String} label optional string for labeling the promise.
		  Useful for tooling.
		  @return {Promise} promise that is fulfilled when all `promises` have been
		  fulfilled, or rejected if any of them become rejected.
		  @static
		*/
		function all(entries) {
		  return new Enumerator(this, entries).promise;
		}

		/**
		  `Promise.race` returns a new promise which is settled in the same way as the
		  first passed promise to settle.

		  Example:

		  ```javascript
		  let promise1 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 1');
		    }, 200);
		  });

		  let promise2 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 2');
		    }, 100);
		  });

		  Promise.race([promise1, promise2]).then(function(result){
		    // result === 'promise 2' because it was resolved before promise1
		    // was resolved.
		  });
		  ```

		  `Promise.race` is deterministic in that only the state of the first
		  settled promise matters. For example, even if other promises given to the
		  `promises` array argument are resolved, but the first settled promise has
		  become rejected before the other promises became fulfilled, the returned
		  promise will become rejected:

		  ```javascript
		  let promise1 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      resolve('promise 1');
		    }, 200);
		  });

		  let promise2 = new Promise(function(resolve, reject){
		    setTimeout(function(){
		      reject(new Error('promise 2'));
		    }, 100);
		  });

		  Promise.race([promise1, promise2]).then(function(result){
		    // Code here never runs
		  }, function(reason){
		    // reason.message === 'promise 2' because promise 2 became rejected before
		    // promise 1 became fulfilled
		  });
		  ```

		  An example real-world use case is implementing timeouts:

		  ```javascript
		  Promise.race([ajax('foo.json'), timeout(5000)])
		  ```

		  @method race
		  @static
		  @param {Array} promises array of promises to observe
		  Useful for tooling.
		  @return {Promise} a promise which settles in the same way as the first passed
		  promise to settle.
		*/
		function race(entries) {
		  /*jshint validthis:true */
		  var Constructor = this;

		  if (!isArray(entries)) {
		    return new Constructor(function (_, reject) {
		      return reject(new TypeError('You must pass an array to race.'));
		    });
		  } else {
		    return new Constructor(function (resolve, reject) {
		      var length = entries.length;
		      for (var i = 0; i < length; i++) {
		        Constructor.resolve(entries[i]).then(resolve, reject);
		      }
		    });
		  }
		}

		/**
		  `Promise.reject` returns a promise rejected with the passed `reason`.
		  It is shorthand for the following:

		  ```javascript
		  let promise = new Promise(function(resolve, reject){
		    reject(new Error('WHOOPS'));
		  });

		  promise.then(function(value){
		    // Code here doesn't run because the promise is rejected!
		  }, function(reason){
		    // reason.message === 'WHOOPS'
		  });
		  ```

		  Instead of writing the above, your code now simply becomes the following:

		  ```javascript
		  let promise = Promise.reject(new Error('WHOOPS'));

		  promise.then(function(value){
		    // Code here doesn't run because the promise is rejected!
		  }, function(reason){
		    // reason.message === 'WHOOPS'
		  });
		  ```

		  @method reject
		  @static
		  @param {Any} reason value that the returned promise will be rejected with.
		  Useful for tooling.
		  @return {Promise} a promise rejected with the given `reason`.
		*/
		function reject$1(reason) {
		  /*jshint validthis:true */
		  var Constructor = this;
		  var promise = new Constructor(noop);
		  reject(promise, reason);
		  return promise;
		}

		function needsResolver() {
		  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
		}

		function needsNew() {
		  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
		}

		/**
		  Promise objects represent the eventual result of an asynchronous operation. The
		  primary way of interacting with a promise is through its `then` method, which
		  registers callbacks to receive either a promise's eventual value or the reason
		  why the promise cannot be fulfilled.

		  Terminology
		  -----------

		  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
		  - `thenable` is an object or function that defines a `then` method.
		  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
		  - `exception` is a value that is thrown using the throw statement.
		  - `reason` is a value that indicates why a promise was rejected.
		  - `settled` the final resting state of a promise, fulfilled or rejected.

		  A promise can be in one of three states: pending, fulfilled, or rejected.

		  Promises that are fulfilled have a fulfillment value and are in the fulfilled
		  state.  Promises that are rejected have a rejection reason and are in the
		  rejected state.  A fulfillment value is never a thenable.

		  Promises can also be said to *resolve* a value.  If this value is also a
		  promise, then the original promise's settled state will match the value's
		  settled state.  So a promise that *resolves* a promise that rejects will
		  itself reject, and a promise that *resolves* a promise that fulfills will
		  itself fulfill.


		  Basic Usage:
		  ------------

		  ```js
		  let promise = new Promise(function(resolve, reject) {
		    // on success
		    resolve(value);

		    // on failure
		    reject(reason);
		  });

		  promise.then(function(value) {
		    // on fulfillment
		  }, function(reason) {
		    // on rejection
		  });
		  ```

		  Advanced Usage:
		  ---------------

		  Promises shine when abstracting away asynchronous interactions such as
		  `XMLHttpRequest`s.

		  ```js
		  function getJSON(url) {
		    return new Promise(function(resolve, reject){
		      let xhr = new XMLHttpRequest();

		      xhr.open('GET', url);
		      xhr.onreadystatechange = handler;
		      xhr.responseType = 'json';
		      xhr.setRequestHeader('Accept', 'application/json');
		      xhr.send();

		      function handler() {
		        if (this.readyState === this.DONE) {
		          if (this.status === 200) {
		            resolve(this.response);
		          } else {
		            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
		          }
		        }
		      };
		    });
		  }

		  getJSON('/posts.json').then(function(json) {
		    // on fulfillment
		  }, function(reason) {
		    // on rejection
		  });
		  ```

		  Unlike callbacks, promises are great composable primitives.

		  ```js
		  Promise.all([
		    getJSON('/posts'),
		    getJSON('/comments')
		  ]).then(function(values){
		    values[0] // => postsJSON
		    values[1] // => commentsJSON

		    return values;
		  });
		  ```

		  @class Promise
		  @param {Function} resolver
		  Useful for tooling.
		  @constructor
		*/

		var Promise$1 = function () {
		  function Promise(resolver) {
		    this[PROMISE_ID] = nextId();
		    this._result = this._state = undefined;
		    this._subscribers = [];

		    if (noop !== resolver) {
		      typeof resolver !== 'function' && needsResolver();
		      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
		    }
		  }

		  /**
		  The primary way of interacting with a promise is through its `then` method,
		  which registers callbacks to receive either a promise's eventual value or the
		  reason why the promise cannot be fulfilled.
		   ```js
		  findUser().then(function(user){
		    // user is available
		  }, function(reason){
		    // user is unavailable, and you are given the reason why
		  });
		  ```
		   Chaining
		  --------
		   The return value of `then` is itself a promise.  This second, 'downstream'
		  promise is resolved with the return value of the first promise's fulfillment
		  or rejection handler, or rejected if the handler throws an exception.
		   ```js
		  findUser().then(function (user) {
		    return user.name;
		  }, function (reason) {
		    return 'default name';
		  }).then(function (userName) {
		    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
		    // will be `'default name'`
		  });
		   findUser().then(function (user) {
		    throw new Error('Found user, but still unhappy');
		  }, function (reason) {
		    throw new Error('`findUser` rejected and we're unhappy');
		  }).then(function (value) {
		    // never reached
		  }, function (reason) {
		    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
		    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
		  });
		  ```
		  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
		   ```js
		  findUser().then(function (user) {
		    throw new PedagogicalException('Upstream error');
		  }).then(function (value) {
		    // never reached
		  }).then(function (value) {
		    // never reached
		  }, function (reason) {
		    // The `PedgagocialException` is propagated all the way down to here
		  });
		  ```
		   Assimilation
		  ------------
		   Sometimes the value you want to propagate to a downstream promise can only be
		  retrieved asynchronously. This can be achieved by returning a promise in the
		  fulfillment or rejection handler. The downstream promise will then be pending
		  until the returned promise is settled. This is called *assimilation*.
		   ```js
		  findUser().then(function (user) {
		    return findCommentsByAuthor(user);
		  }).then(function (comments) {
		    // The user's comments are now available
		  });
		  ```
		   If the assimliated promise rejects, then the downstream promise will also reject.
		   ```js
		  findUser().then(function (user) {
		    return findCommentsByAuthor(user);
		  }).then(function (comments) {
		    // If `findCommentsByAuthor` fulfills, we'll have the value here
		  }, function (reason) {
		    // If `findCommentsByAuthor` rejects, we'll have the reason here
		  });
		  ```
		   Simple Example
		  --------------
		   Synchronous Example
		   ```javascript
		  let result;
		   try {
		    result = findResult();
		    // success
		  } catch(reason) {
		    // failure
		  }
		  ```
		   Errback Example
		   ```js
		  findResult(function(result, err){
		    if (err) {
		      // failure
		    } else {
		      // success
		    }
		  });
		  ```
		   Promise Example;
		   ```javascript
		  findResult().then(function(result){
		    // success
		  }, function(reason){
		    // failure
		  });
		  ```
		   Advanced Example
		  --------------
		   Synchronous Example
		   ```javascript
		  let author, books;
		   try {
		    author = findAuthor();
		    books  = findBooksByAuthor(author);
		    // success
		  } catch(reason) {
		    // failure
		  }
		  ```
		   Errback Example
		   ```js
		   function foundBooks(books) {
		   }
		   function failure(reason) {
		   }
		   findAuthor(function(author, err){
		    if (err) {
		      failure(err);
		      // failure
		    } else {
		      try {
		        findBoooksByAuthor(author, function(books, err) {
		          if (err) {
		            failure(err);
		          } else {
		            try {
		              foundBooks(books);
		            } catch(reason) {
		              failure(reason);
		            }
		          }
		        });
		      } catch(error) {
		        failure(err);
		      }
		      // success
		    }
		  });
		  ```
		   Promise Example;
		   ```javascript
		  findAuthor().
		    then(findBooksByAuthor).
		    then(function(books){
		      // found books
		  }).catch(function(reason){
		    // something went wrong
		  });
		  ```
		   @method then
		  @param {Function} onFulfilled
		  @param {Function} onRejected
		  Useful for tooling.
		  @return {Promise}
		  */

		  /**
		  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
		  as the catch block of a try/catch statement.
		  ```js
		  function findAuthor(){
		  throw new Error('couldn't find that author');
		  }
		  // synchronous
		  try {
		  findAuthor();
		  } catch(reason) {
		  // something went wrong
		  }
		  // async with promises
		  findAuthor().catch(function(reason){
		  // something went wrong
		  });
		  ```
		  @method catch
		  @param {Function} onRejection
		  Useful for tooling.
		  @return {Promise}
		  */


		  Promise.prototype.catch = function _catch(onRejection) {
		    return this.then(null, onRejection);
		  };

		  /**
		    `finally` will be invoked regardless of the promise's fate just as native
		    try/catch/finally behaves
		  
		    Synchronous example:
		  
		    ```js
		    findAuthor() {
		      if (Math.random() > 0.5) {
		        throw new Error();
		      }
		      return new Author();
		    }
		  
		    try {
		      return findAuthor(); // succeed or fail
		    } catch(error) {
		      return findOtherAuther();
		    } finally {
		      // always runs
		      // doesn't affect the return value
		    }
		    ```
		  
		    Asynchronous example:
		  
		    ```js
		    findAuthor().catch(function(reason){
		      return findOtherAuther();
		    }).finally(function(){
		      // author was either found, or not
		    });
		    ```
		  
		    @method finally
		    @param {Function} callback
		    @return {Promise}
		  */


		  Promise.prototype.finally = function _finally(callback) {
		    var promise = this;
		    var constructor = promise.constructor;

		    if (isFunction(callback)) {
		      return promise.then(function (value) {
		        return constructor.resolve(callback()).then(function () {
		          return value;
		        });
		      }, function (reason) {
		        return constructor.resolve(callback()).then(function () {
		          throw reason;
		        });
		      });
		    }

		    return promise.then(callback, callback);
		  };

		  return Promise;
		}();

		Promise$1.prototype.then = then;
		Promise$1.all = all;
		Promise$1.race = race;
		Promise$1.resolve = resolve$1;
		Promise$1.reject = reject$1;
		Promise$1._setScheduler = setScheduler;
		Promise$1._setAsap = setAsap;
		Promise$1._asap = asap;

		/*global self*/
		function polyfill() {
		  var local = void 0;

		  if (typeof chunk000.commonjsGlobal !== 'undefined') {
		    local = chunk000.commonjsGlobal;
		  } else if (typeof self !== 'undefined') {
		    local = self;
		  } else {
		    try {
		      local = Function('return this')();
		    } catch (e) {
		      throw new Error('polyfill failed because global object is unavailable in this environment');
		    }
		  }

		  var P = local.Promise;

		  if (P) {
		    var promiseToString = null;
		    try {
		      promiseToString = Object.prototype.toString.call(P.resolve());
		    } catch (e) {
		      // silently ignored
		    }

		    if (promiseToString === '[object Promise]' && !P.cast) {
		      return;
		    }
		  }

		  local.Promise = Promise$1;
		}

		// Strange compat..
		Promise$1.polyfill = polyfill;
		Promise$1.Promise = Promise$1;

		return Promise$1;

		})));



		
	} (chunk003.es6Promise));
	return chunk003.es6Promise.exports;
}

var es6PromiseExports = requireEs6Promise();
const es6promise = /*@__PURE__*/chunk000.getDefaultExportFromCjs(es6PromiseExports);

var noop;
var hasRequiredNoop;

function requireNoop () {
	if (hasRequiredNoop) return noop;
	hasRequiredNoop = 1;

	// eslint-disable-next-line no-empty-function
	noop = function () {};
	return noop;
}

var isValue;
var hasRequiredIsValue;

function requireIsValue () {
	if (hasRequiredIsValue) return isValue;
	hasRequiredIsValue = 1;

	var _undefined = requireNoop()(); // Support ES3 engines

	isValue = function (val) { return val !== _undefined && val !== null; };
	return isValue;
}

var normalizeOptions;
var hasRequiredNormalizeOptions;

function requireNormalizeOptions () {
	if (hasRequiredNormalizeOptions) return normalizeOptions;
	hasRequiredNormalizeOptions = 1;

	var isValue = requireIsValue();

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	normalizeOptions = function (opts1 /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};
	return normalizeOptions;
}

var isImplemented$6;
var hasRequiredIsImplemented$6;

function requireIsImplemented$6 () {
	if (hasRequiredIsImplemented$6) return isImplemented$6;
	hasRequiredIsImplemented$6 = 1;

	isImplemented$6 = function () {
		var sign = Math.sign;
		if (typeof sign !== "function") return false;
		return sign(10) === 1 && sign(-20) === -1;
	};
	return isImplemented$6;
}

var shim$3;
var hasRequiredShim$3;

function requireShim$3 () {
	if (hasRequiredShim$3) return shim$3;
	hasRequiredShim$3 = 1;

	shim$3 = function (value) {
		value = Number(value);
		if (isNaN(value) || value === 0) return value;
		return value > 0 ? 1 : -1;
	};
	return shim$3;
}

var sign;
var hasRequiredSign;

function requireSign () {
	if (hasRequiredSign) return sign;
	hasRequiredSign = 1;

	sign = requireIsImplemented$6()() ? Math.sign : requireShim$3();
	return sign;
}

var toInteger;
var hasRequiredToInteger;

function requireToInteger () {
	if (hasRequiredToInteger) return toInteger;
	hasRequiredToInteger = 1;

	var sign  = requireSign()
	  , abs   = Math.abs
	  , floor = Math.floor;

	toInteger = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if (value === 0 || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};
	return toInteger;
}

var toPosInteger;
var hasRequiredToPosInteger;

function requireToPosInteger () {
	if (hasRequiredToPosInteger) return toPosInteger;
	hasRequiredToPosInteger = 1;

	var toInteger = requireToInteger()
	  , max       = Math.max;

	toPosInteger = function (value) { return max(0, toInteger(value)); };
	return toPosInteger;
}

var validCallable;
var hasRequiredValidCallable;

function requireValidCallable () {
	if (hasRequiredValidCallable) return validCallable;
	hasRequiredValidCallable = 1;

	validCallable = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};
	return validCallable;
}

var validValue;
var hasRequiredValidValue;

function requireValidValue () {
	if (hasRequiredValidValue) return validValue;
	hasRequiredValidValue = 1;

	var isValue = requireIsValue();

	validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};
	return validValue;
}

var isImplemented$5;
var hasRequiredIsImplemented$5;

function requireIsImplemented$5 () {
	if (hasRequiredIsImplemented$5) return isImplemented$5;
	hasRequiredIsImplemented$5 = 1;

	isImplemented$5 = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
	};
	return isImplemented$5;
}

var isImplemented$4;
var hasRequiredIsImplemented$4;

function requireIsImplemented$4 () {
	if (hasRequiredIsImplemented$4) return isImplemented$4;
	hasRequiredIsImplemented$4 = 1;

	isImplemented$4 = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
			return false;
		}
	};
	return isImplemented$4;
}

var shim$2;
var hasRequiredShim$2;

function requireShim$2 () {
	if (hasRequiredShim$2) return shim$2;
	hasRequiredShim$2 = 1;

	var isValue = requireIsValue();

	var keys = Object.keys;

	shim$2 = function (object) { return keys(isValue(object) ? Object(object) : object); };
	return shim$2;
}

var keys;
var hasRequiredKeys;

function requireKeys () {
	if (hasRequiredKeys) return keys;
	hasRequiredKeys = 1;

	keys = requireIsImplemented$4()() ? Object.keys : requireShim$2();
	return keys;
}

var shim$1;
var hasRequiredShim$1;

function requireShim$1 () {
	if (hasRequiredShim$1) return shim$1;
	hasRequiredShim$1 = 1;

	var keys  = requireKeys()
	  , value = requireValidValue()
	  , max   = Math.max;

	shim$1 = function (dest, src /*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};
	return shim$1;
}

var assign;
var hasRequiredAssign;

function requireAssign () {
	if (hasRequiredAssign) return assign;
	hasRequiredAssign = 1;

	assign = requireIsImplemented$5()() ? Object.assign : requireShim$1();
	return assign;
}

var is$2;
var hasRequiredIs$2;

function requireIs$2 () {
	if (hasRequiredIs$2) return is$2;
	hasRequiredIs$2 = 1;

	// ES3 safe
	var _undefined = void 0;

	is$2 = function (value) { return value !== _undefined && value !== null; };
	return is$2;
}

var is$1;
var hasRequiredIs$1;

function requireIs$1 () {
	if (hasRequiredIs$1) return is$1;
	hasRequiredIs$1 = 1;

	var isValue = requireIs$2();

	// prettier-ignore
	var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

	is$1 = function (value) {
		if (!isValue(value)) return false;
		return hasOwnProperty.call(possibleTypes, typeof value);
	};
	return is$1;
}

var is;
var hasRequiredIs;

function requireIs () {
	if (hasRequiredIs) return is;
	hasRequiredIs = 1;

	var isObject = requireIs$1();

	is = function (value) {
		if (!isObject(value)) return false;
		try {
			if (!value.constructor) return false;
			return value.constructor.prototype === value;
		} catch (error) {
			return false;
		}
	};
	return is;
}

var isImplemented$3;
var hasRequiredIsImplemented$3;

function requireIsImplemented$3 () {
	if (hasRequiredIsImplemented$3) return isImplemented$3;
	hasRequiredIsImplemented$3 = 1;

	var str = "razdwatrzy";

	isImplemented$3 = function () {
		if (typeof str.contains !== "function") return false;
		return str.contains("dwa") === true && str.contains("foo") === false;
	};
	return isImplemented$3;
}

var shim;
var hasRequiredShim;

function requireShim () {
	if (hasRequiredShim) return shim;
	hasRequiredShim = 1;

	var indexOf = String.prototype.indexOf;

	shim = function (searchString /*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};
	return shim;
}

var contains;
var hasRequiredContains;

function requireContains () {
	if (hasRequiredContains) return contains;
	hasRequiredContains = 1;

	contains = requireIsImplemented$3()() ? String.prototype.contains : requireShim();
	return contains;
}

var eventEmitter = {exports: {}};

var isImplemented$2;
var hasRequiredIsImplemented$2;

function requireIsImplemented$2 () {
	if (hasRequiredIsImplemented$2) return isImplemented$2;
	hasRequiredIsImplemented$2 = 1;

	isImplemented$2 = function () {
		var from = Array.from, arr, result;
		if (typeof from !== "function") return false;
		arr = ["raz", "dwa"];
		result = from(arr);
		return Boolean(result && result !== arr && result[1] === "dwa");
	};
	return isImplemented$2;
}

var isImplemented$1;
var hasRequiredIsImplemented$1;

function requireIsImplemented$1 () {
	if (hasRequiredIsImplemented$1) return isImplemented$1;
	hasRequiredIsImplemented$1 = 1;

	isImplemented$1 = function () {
		if (typeof globalThis !== "object") return false;
		if (!globalThis) return false;
		return globalThis.Array === Array;
	};
	return isImplemented$1;
}

var implementation;
var hasRequiredImplementation;

function requireImplementation () {
	if (hasRequiredImplementation) return implementation;
	hasRequiredImplementation = 1;
	var naiveFallback = function () {
		if (typeof self === "object" && self) return self;
		if (typeof window === "object" && window) return window;
		throw new Error("Unable to resolve global `this`");
	};

	implementation = (function () {
		if (this) return this;

		// Unexpected strict mode (may happen if e.g. bundled into ESM module)

		// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
		// In all ES5+ engines global object inherits from Object.prototype
		// (if you approached one that doesn't please report)
		try {
			Object.defineProperty(Object.prototype, "__global__", {
				get: function () { return this; },
				configurable: true
			});
		} catch (error) {
			// Unfortunate case of Object.prototype being sealed (via preventExtensions, seal or freeze)
			return naiveFallback();
		}
		try {
			// Safari case (window.__global__ is resolved with global context, but __global__ does not)
			if (!__global__) return naiveFallback();
			return __global__;
		} finally {
			delete Object.prototype.__global__;
		}
	})();
	return implementation;
}

var globalThis_1;
var hasRequiredGlobalThis;

function requireGlobalThis () {
	if (hasRequiredGlobalThis) return globalThis_1;
	hasRequiredGlobalThis = 1;

	globalThis_1 = requireIsImplemented$1()() ? globalThis : requireImplementation();
	return globalThis_1;
}

var isImplemented;
var hasRequiredIsImplemented;

function requireIsImplemented () {
	if (hasRequiredIsImplemented) return isImplemented;
	hasRequiredIsImplemented = 1;

	var global     = requireGlobalThis()
	  , validTypes = { object: true, symbol: true };

	isImplemented = function () {
		var Symbol = global.Symbol;
		var symbol;
		if (typeof Symbol !== "function") return false;
		symbol = Symbol("test symbol");
		try { String(symbol); }
		catch (e) { return false; }

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};
	return isImplemented;
}

var isArguments;
var hasRequiredIsArguments;

function requireIsArguments () {
	if (hasRequiredIsArguments) return isArguments;
	hasRequiredIsArguments = 1;

	var objToString = Object.prototype.toString
	  , id = objToString.call((function () { return arguments; })());

	isArguments = function (value) { return objToString.call(value) === id; };
	return isArguments;
}

var isFunction;
var hasRequiredIsFunction;

function requireIsFunction () {
	if (hasRequiredIsFunction) return isFunction;
	hasRequiredIsFunction = 1;

	var objToString = Object.prototype.toString
	  , isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);

	isFunction = function (value) {
		return typeof value === "function" && isFunctionStringTag(objToString.call(value));
	};
	return isFunction;
}

var isString;
var hasRequiredIsString;

function requireIsString () {
	if (hasRequiredIsString) return isString;
	hasRequiredIsString = 1;

	var objToString = Object.prototype.toString, id = objToString.call("");

	isString = function (value) {
		return (
			typeof value === "string" ||
			(value &&
				typeof value === "object" &&
				(value instanceof String || objToString.call(value) === id)) ||
			false
		);
	};
	return isString;
}

var async = {};

var promise = {};

var isPromise = {exports: {}};

var dispose = {};

var maxAge = {};

var max = {};

var refCounter = {};

exports.async = async;
exports.dispose = dispose;
exports.es6promise = es6promise;
exports.eventEmitter = eventEmitter;
exports.isPromise = isPromise;
exports.max = max;
exports.maxAge = maxAge;
exports.promise = promise;
exports.refCounter = refCounter;
exports.requireAssign = requireAssign;
exports.requireContains = requireContains;
exports.requireGlobalThis = requireGlobalThis;
exports.requireIs = requireIs;
exports.requireIs$1 = requireIs$2;
exports.requireIsArguments = requireIsArguments;
exports.requireIsFunction = requireIsFunction;
exports.requireIsImplemented = requireIsImplemented;
exports.requireIsImplemented$1 = requireIsImplemented$2;
exports.requireIsString = requireIsString;
exports.requireIsValue = requireIsValue;
exports.requireNormalizeOptions = requireNormalizeOptions;
exports.requireToPosInteger = requireToPosInteger;
exports.requireValidCallable = requireValidCallable;
exports.requireValidValue = requireValidValue;
