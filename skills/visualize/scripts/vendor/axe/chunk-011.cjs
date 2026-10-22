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

const chunk010 = require('./chunk-010.cjs');
const chunk007 = require('./chunk-007.cjs');

/*eslint no-console: 0 */

/**
 * Logs a message to the developer console (if it exists and is active).
 */
function log() {
  if (typeof console === 'object' && console.log) {
    // IE does not support console.log.apply
    Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * matches implementation that operates on a VirtualNode
 *
 * @method matches
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {String} selector CSS selector string
 * @return {Boolean}
 */
function matches(vNode, selector) {
  const expressions = convertSelector(selector);
  return expressions.some(expression => matchesExpression(vNode, expression));
}

function matchesTag(vNode, exp) {
  return (
    vNode.props.nodeType === 1 &&
    (exp.tag === '*' || vNode.props.nodeName === exp.tag)
  );
}

function matchesClasses(vNode, exp) {
  return !exp.classes || exp.classes.every(cl => vNode.hasClass(cl.value));
}

function matchesAttributes(vNode, exp) {
  return (
    !exp.attributes ||
    exp.attributes.every(att => {
      const nodeAtt = vNode.attr(att.key);
      return nodeAtt !== null && att.test(nodeAtt);
    })
  );
}

function matchesId(vNode, exp) {
  return !exp.id || vNode.props.id === exp.id;
}

function matchesPseudos(target, exp) {
  if (
    !exp.pseudos ||
    exp.pseudos.every(pseudo => {
      if (pseudo.name === 'not') {
        return !pseudo.expressions.some(expression => {
          return matchesExpression(target, expression);
        });
      } else if (pseudo.name === 'is') {
        return pseudo.expressions.some(expression => {
          return matchesExpression(target, expression);
        });
      }
      throw new Error(
        'the pseudo selector ' + pseudo.name + ' has not yet been implemented'
      );
    })
  ) {
    return true;
  }
  return false;
}

function matchExpression(vNode, expression) {
  return (
    matchesTag(vNode, expression) &&
    matchesClasses(vNode, expression) &&
    matchesAttributes(vNode, expression) &&
    matchesId(vNode, expression) &&
    matchesPseudos(vNode, expression)
  );
}

const escapeRegExp = (() => {
  /*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
  const from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
  const to = '\\';
  return string => {
    return string.replace(from, to);
  };
})();

const reUnescape = /\\/g;
function convertAttributes(atts) {
  /*! Credit Mootools Copyright Mootools, MIT License */
  if (!atts) {
    return;
  }
  return atts.map(att => {
    const attributeKey = att.name.replace(reUnescape, '');
    const attributeValue = (att.value || '').replace(reUnescape, '');
    let test, regexp;

    switch (att.operator) {
      case '^=':
        regexp = new RegExp('^' + escapeRegExp(attributeValue));
        break;
      case '$=':
        regexp = new RegExp(escapeRegExp(attributeValue) + '$');
        break;
      case '~=':
        regexp = new RegExp(
          '(^|\\s)' + escapeRegExp(attributeValue) + '(\\s|$)'
        );
        break;
      case '|=':
        regexp = new RegExp('^' + escapeRegExp(attributeValue) + '(-|$)');
        break;
      case '=':
        test = value => {
          return attributeValue === value;
        };
        break;
      case '*=':
        test = value => {
          return value && value.includes(attributeValue);
        };
        break;
      case '!=':
        test = value => {
          return attributeValue !== value;
        };
        break;
      // attribute existence
      default:
        test = value => {
          return value !== null;
        };
    }

    if (attributeValue === '' && /^[*$^]=$/.test(att.operator)) {
      test = () => {
        return false;
      };
    }

    if (!test) {
      test = value => {
        return value && regexp.test(value);
      };
    }
    return {
      key: attributeKey,
      value: attributeValue,
      type: typeof att.value === 'undefined' ? 'attrExist' : 'attrValue',
      test: test
    };
  });
}

function convertClasses(classes) {
  if (!classes) {
    return;
  }
  return classes.map(className => {
    className = className.replace(reUnescape, '');

    return {
      value: className,
      regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
    };
  });
}

function convertPseudos(pseudos) {
  if (!pseudos) {
    return;
  }
  return pseudos.map(p => {
    let expressions;

    if (['is', 'not'].includes(p.name)) {
      expressions = p.value;
      expressions = expressions.selectors
        ? expressions.selectors
        : [expressions];
      expressions = convertExpressions(expressions);
    }
    return {
      name: p.name,
      expressions: expressions,
      value: p.value
    };
  });
}

/**
 * convert the css-selector-parser format into the Slick format
 * @private
 * @param Array {Object} expressions
 * @return Array {Object}
 *
 */
function convertExpressions(expressions) {
  return expressions.map(exp => {
    const newExp = [];
    let rule = exp.rule;
    while (rule) {
      /* eslint no-restricted-syntax: 0 */
      // `.tagName` is a property coming from the `CSSSelectorParser` library
      newExp.push({
        tag: rule.tagName ? rule.tagName.toLowerCase() : '*',
        combinator: rule.nestingOperator ? rule.nestingOperator : ' ',
        id: rule.id,
        attributes: convertAttributes(rule.attrs),
        classes: convertClasses(rule.classNames),
        pseudos: convertPseudos(rule.pseudos)
      });
      rule = rule.rule;
    }
    return newExp;
  });
}

/**
 * Convert a CSS selector to the Slick format expression
 *
 * @private
 * @param {String} selector CSS selector to convert
 * @returns {Object[]} Array of Slick format expressions
 */
function convertSelector(selector) {
  let expressions = chunk010.parser.parse(selector);
  expressions = expressions.selectors ? expressions.selectors : [expressions];
  return convertExpressions(expressions);
}

/**
 * Determine if a virtual node matches a Slick format CSS expression.
 *
 * Note: this function is in the hot path, avoid memory allocation.
 *
 * @private
 * @method optimizedMatchesExpression
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {Object|Object[]} expressions CSS selector expression or array of expressions
 * @param {Number|NaN} index index of expression to match on if expressions is array
 * @returns {Boolean}
 */
function optimizedMatchesExpression(vNode, expressions, index, matchAnyParent) {
  if (!vNode) {
    return false;
  }

  const isArray = Array.isArray(expressions);
  const expression = isArray ? expressions[index] : expressions;
  let machedExpression = matchExpression(vNode, expression);

  while (!machedExpression && matchAnyParent && vNode.parent) {
    vNode = vNode.parent;
    machedExpression = matchExpression(vNode, expression);
  }

  if (index > 0) {
    if ([' ', '>'].includes(expression.combinator) === false) {
      throw new Error(
        'axe.utils.matchesExpression does not support the combinator: ' +
          expression.combinator
      );
    }

    machedExpression =
      machedExpression &&
      optimizedMatchesExpression(
        vNode.parent,
        expressions,
        index - 1,
        expression.combinator === ' '
      );
  }

  return machedExpression;
}

/**
 * Determine if a virtual node matches a Slick format CSS expression
 *
 * @private
 * @method matchesExpression
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {Object|Object[]} expressions CSS selector expression or array of expressions
 * @returns {Boolean}
 */
function matchesExpression(vNode, expressions, matchAnyParent) {
  return optimizedMatchesExpression(
    vNode,
    expressions,
    expressions.length - 1,
    matchAnyParent
  );
}

/**
 * closest implementation that operates on a VirtualNode
 *
 * @method closest
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {String} selector CSS selector string
 * @return {VirtualNode | null}
 */
function closest(vNode, selector) {
  while (vNode) {
    if (matches(vNode, selector)) {
      return vNode;
    }

    // the top node of the tree will have parent === null, so a
    // undefined parent means we are in a disconnected tree
    if (typeof vNode.parent === 'undefined') {
      throw new TypeError('Cannot resolve parent for non-DOM nodes');
    }

    vNode = vNode.parent;
  }

  return null;
}

function noop() {}
function funcGuard(f) {
  if (typeof f !== 'function') {
    throw new TypeError('Queue methods require functions as arguments');
  }
}

/**
 * Create an asynchronous "queue", list of functions to be invoked in parallel, but not necessarily returned in order
 * @return {Queue} The newly generated "queue"
 */
function queue() {
  const tasks = [];
  let started = 0;
  let remaining = 0; // number of tasks not yet finished
  let completeQueue = noop;
  let complete = false;
  let err;

  // By default, wait until the next tick,
  // if no catch was set, throw to console.
  const defaultFail = e => {
    err = e;
    setTimeout(() => {
      if (err !== undefined && err !== null) {
        log('Uncaught error (of queue)', err);
      }
    }, 1);
  };
  let failed = defaultFail;

  function createResolve(i) {
    return r => {
      tasks[i] = r;
      remaining -= 1;
      if (!remaining && completeQueue !== noop) {
        complete = true;
        completeQueue(tasks);
      }
    };
  }

  function abort(msg) {
    // reset tasks
    completeQueue = noop;

    // notify catch
    failed(msg);
    // return unfinished work
    return tasks;
  }

  function pop() {
    const length = tasks.length;
    for (; started < length; started++) {
      const task = tasks[started];

      try {
        task.call(null, createResolve(started), abort);
      } catch (e) {
        abort(e);
      }
    }
  }

  const q = {
    /**
     * Defer a function that may or may not run asynchronously.
     *
     * First parameter should be the function to execute with subsequent
     * parameters being passed as arguments to that function
     */
    defer(fn) {
      if (typeof fn === 'object' && fn.then && fn.catch) {
        const defer = fn;
        fn = (resolve, reject) => {
          defer.then(resolve).catch(reject);
        };
      }
      funcGuard(fn);
      if (err !== undefined) {
        return;
      } else if (complete) {
        throw new Error('Queue already completed');
      }

      tasks.push(fn);
      ++remaining;
      pop();
      return q;
    },

    /**
     * The callback to execute once all "deferred" functions have completed.  Will only be invoked once.
     * @param  {Function} f The callback, receives an array of the return/callbacked
     * values of each of the "deferred" functions
     */
    then(fn) {
      funcGuard(fn);
      if (completeQueue !== noop) {
        throw new Error('queue `then` already set');
      }
      if (!err) {
        completeQueue = fn;
        if (!remaining) {
          complete = true;
          completeQueue(tasks);
        }
      }
      return q;
    },

    catch: function (fn) {
      funcGuard(fn);
      if (failed !== defaultFail) {
        throw new Error('queue `catch` already set');
      }
      if (!err) {
        failed = fn;
      } else {
        fn(err);
        err = null;
      }
      return q;
    },
    /**
     * Abort the "queue" and prevent `then` function from firing
     * @param  {Function} fn The callback to execute; receives an array of the results which have completed
     */
    abort: abort
  };
  return q;
}

/*eslint no-bitwise: 0, eqeqeq: 0, curly: 0, strict: 0, no-eq-null: 0, no-shadow: 0, no-undef: 0 */
//		 uuid.js
//
//		 Copyright (c) 2010-2012 Robert Kieffer
//		 MIT License - http://opensource.org/licenses/mit-license.php
let uuid;
// Unique ID creation requires a high quality random # generator.	We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
let _rng;

// Allow for MSIE11 msCrypto
let _crypto = window.crypto || window.msCrypto;

if (!_rng && _crypto && _crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  //
  // Moderately fast, high quality
  let _rnds8 = new Uint8Array(16);
  _rng = function whatwgRNG() {
    _crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!_rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().	It's fast, but is of unspecified
  // quality.
  let _rnds = new Array(16);
  _rng = () => {
    for (let i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
    }

    return _rnds;
  };
}

// Buffer class to use
let BufferClass = typeof window.Buffer == 'function' ? window.Buffer : Array;

// Maps for number <-> hex string conversion
let _byteToHex = [];
let _hexToByte = {};
for (let i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  let i = (buf && offset) || 0,
    ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, oct => {
    if (ii < 16) {
      // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  let i = offset || 0,
    bth = _byteToHex;
  return (
    bth[buf[i++]] +
    bth[buf[i++]] +
    bth[buf[i++]] +
    bth[buf[i++]] +
    '-' +
    bth[buf[i++]] +
    bth[buf[i++]] +
    '-' +
    bth[buf[i++]] +
    bth[buf[i++]] +
    '-' +
    bth[buf[i++]] +
    bth[buf[i++]] +
    '-' +
    bth[buf[i++]] +
    bth[buf[i++]] +
    bth[buf[i++]] +
    bth[buf[i++]] +
    bth[buf[i++]] +
    bth[buf[i++]]
  );
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
let _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
let _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1],
  _seedBytes[2],
  _seedBytes[3],
  _seedBytes[4],
  _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
let _clockseq = ((_seedBytes[6] << 8) | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
let _lastMSecs = 0,
  _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  let i = (buf && offset) || 0;
  let b = buf || [];

  options = options || {};

  let clockseq = options.clockseq != null ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).	JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  let msecs = options.msecs != null ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  let nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  let dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq == null) {
    clockseq = (clockseq + 1) & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  let tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = (tl >>> 24) & 0xff;
  b[i++] = (tl >>> 16) & 0xff;
  b[i++] = (tl >>> 8) & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  let tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
  b[i++] = (tmh >>> 8) & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
  b[i++] = (tmh >>> 16) & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = (clockseq >>> 8) | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  let node = options.node || _nodeId;
  for (let n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  let i = (buf && offset) || 0;

  if (typeof options == 'string') {
    buf = options == 'binary' ? new BufferClass(16) : null;
    options = null;
  }
  options = options || {};

  let rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (let ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;
uuid.BufferClass = BufferClass;

// assign a unique id to this axe instance
chunk007.axe._uuid = v1();

const errorTypes = Object.freeze([
  'EvalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError'
]);

function stringifyMessage({
  topic,
  channelId,
  message,
  messageId,
  keepalive
}) {
  const data = {
    channelId,
    topic,
    messageId,
    keepalive: !!keepalive,
    source: getSource()
  };

  if (message instanceof Error) {
    data.error = {
      name: message.name,
      message: message.message,
      stack: message.stack
    };
  } else {
    data.payload = message;
  }
  return JSON.stringify(data);
}

/**
 * Parse the received message for processing
 * @param  {string} dataString Message received
 * @return {object}            Object to be used for pub/sub
 */
function parseMessage(dataString) {
  let data;
  try {
    data = JSON.parse(dataString);
  } catch {
    return; // Wasn't meant for us.
  }
  if (!isRespondableMessage(data)) {
    return;
  }

  const { topic, channelId, messageId, keepalive } = data;
  const message =
    typeof data.error === 'object'
      ? buildErrorObject(data.error)
      : data.payload;

  return { topic, message, messageId, channelId, keepalive: !!keepalive };
}

/**
 * Verify the received message is from the "respondable" module
 * @private
 * @param  {Object} postedMessage The message received via postMessage
 * @return {Boolean}              `true` if the message is verified from respondable
 */
function isRespondableMessage(postedMessage) {
  return (
    postedMessage !== null &&
    typeof postedMessage === 'object' &&
    typeof postedMessage.channelId === 'string' &&
    postedMessage.source === getSource()
  );
}

/**
 * Convert a javascript Error into something that can be stringified
 * @param  {Error} error  Any type of error
 * @return {Object}       Processable object
 */
function buildErrorObject(error) {
  let msg = error.message || 'Unknown error occurred';
  const errorName = errorTypes.includes(error.name) ? error.name : 'Error';
  const ErrConstructor = window[errorName] || Error;

  if (error.stack) {
    msg += '\n' + error.stack.replace(error.message, '');
  }
  return new ErrConstructor(msg);
}

/**
 * get the unique string to be used to identify our instance of axe
 * @private
 */
function getSource() {
  let application = 'axeAPI';
  let version = '';

  // TODO: es-modules_audit
  if (typeof chunk007.axe !== 'undefined' && chunk007.axe._audit && chunk007.axe._audit.application) {
    application = chunk007.axe._audit.application;
  }
  if (typeof chunk007.axe !== 'undefined') {
    // TODO: es-modules-version
    version = chunk007.axe.version;
  }
  return application + '.' + version;
}

function assertIsParentWindow(win) {
  assetNotGlobalWindow(win);
  chunk007.assert(
    window.parent === win,
    'Source of the response must be the parent window.'
  );
}

function assertIsFrameWindow(win) {
  assetNotGlobalWindow(win);
  chunk007.assert(
    win.parent === window,
    'Respondable target must be a frame in the current window'
  );
}

function assetNotGlobalWindow(win) {
  chunk007.assert(window !== win, 'Messages can not be sent to the same window.');
}

const channels = {};

function storeReplyHandler(
  channelId,
  replyHandler,
  sendToParent = true
) {
  chunk007.assert(
    !Object.prototype.hasOwnProperty.call(channels, channelId),
    `A replyHandler already exists for this message channel.`
  );
  channels[channelId] = { replyHandler, sendToParent };
}

function getReplyHandler(channelId) {
  return Object.prototype.hasOwnProperty.call(channels, channelId)
    ? channels[channelId]
    : undefined;
}

function deleteReplyHandler(channelId) {
  delete channels[channelId];
}

// No cache, so that this can persist across axe.run calls
const messageIds = [];

function createMessageId() {
  const uuid = `${v4()}:${v4()}`;
  // Prevent repeats
  if (messageIds.includes(uuid)) {
    return createMessageId();
  }

  messageIds.push(uuid);
  return uuid;
}

function isNewMessage(uuid) {
  if (messageIds.includes(uuid)) {
    return false;
  }
  messageIds.push(uuid);
  return true;
}

/**
 * Posts the message to correct frame.
 * This abstraction necessary because IE9 & 10 do not support posting Objects; only strings
 * @private
 * @param  {Window}   win         The `window` to post the message to
 * @param  {Object}   data        Payload with topic, message, channelId & keepalive
 * @param  {Boolean}  sendToParent Whether the message goes to the parent or the child frame
 * @param  {Function} replyNandler Function to call with the response
 *
 * @return {Boolean} true if the message was sent
 */
function postMessage$1(win, data, sendToParent, replyHandler) {
  // Prevent messaging to an inappropriate window
  sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
  if (data.message instanceof Error && !sendToParent) {
    chunk007.axe.log(data.message);
    return false;
  }

  const dataString = stringifyMessage({
    messageId: createMessageId(),
    ...data
  });

  // TODO: es_modules_audit
  const { allowedOrigins } = chunk007.axe._audit;
  if (!allowedOrigins || !allowedOrigins.length) {
    return false;
  }

  if (typeof replyHandler === 'function') {
    storeReplyHandler(data.channelId, replyHandler, sendToParent);
  }
  // There is no way to know the origin of `win`, so we'll try them all.
  allowedOrigins.forEach(origin => {
    try {
      win.postMessage(dataString, origin);
    } catch (err) {
      if (err instanceof win.DOMException) {
        throw new Error(
          `allowedOrigins value "${origin}" is not a valid origin`
        );
      }
      throw err;
    }
  });
  return true;
}

/**
 * Log, or post an error to the parent window
 * @param {window} win
 * @param {object} messageData
 */
function processError(win, error, channelId) {
  if (!win.parent !== window) {
    return chunk007.axe.log(error);
  }

  try {
    postMessage$1(
      win,
      {
        topic: null,
        channelId,
        message: error,
        messageId: createMessageId(),
        keepalive: true
      },
      true
    );
  } catch (err) {
    // Last resort, logging
    return chunk007.axe.log(err);
  }
}

/**
 * Helper closure to create a function that may be used to respond to a message
 * @private
 * @param  {Window} win    The window from which the message originated
 * @param  {String} channelId   The "unique" ID of the original message
 * @return {Function}      A function that may be invoked to respond to the message
 */
function createResponder(win, channelId, sendToParent = true) {
  return function respond(message, keepalive, replyHandler) {
    const data = { channelId, message, keepalive };
    postMessage$1(win, data, sendToParent, replyHandler);
  };
}

function originIsAllowed(origin) {
  // TODO: es_modules_audit
  const { allowedOrigins } = chunk007.axe._audit;
  return (
    (allowedOrigins && allowedOrigins.includes('*')) ||
    allowedOrigins.includes(origin)
  );
}

/**
 * Handle incoming window messages
 * @param  {MessageEvent}
 * @param  {Function} topicHandler
 */
function messageHandler(
  { origin, data: dataString, source: win },
  topicHandler
) {
  try {
    const data = parseMessage(dataString) || {};
    const { channelId, message, messageId } = data;

    if (!originIsAllowed(origin) || !isNewMessage(messageId)) {
      return;
    }

    // An error should never come from a parent. Log it and exit.
    if (message instanceof Error && win.parent !== window) {
      chunk007.axe.log(message);
      return false;
    }

    try {
      if (data.topic) {
        const responder = createResponder(win, channelId);
        assertIsParentWindow(win);
        topicHandler(data, responder);
      } else {
        callReplyHandler(win, data);
      }
    } catch (error) {
      processError(win, error, channelId);
    }
  } catch (error) {
    chunk007.axe.log(error);
    return false;
  }
}

function callReplyHandler(win, data) {
  const { channelId, message, keepalive } = data;
  const { replyHandler, sendToParent } = getReplyHandler(channelId) || {};

  if (!replyHandler) {
    return;
  }
  sendToParent ? assertIsParentWindow(win) : assertIsFrameWindow(win);
  const responder = createResponder(win, channelId, sendToParent);

  if (!keepalive && channelId) {
    deleteReplyHandler(channelId);
  }

  try {
    replyHandler(message, keepalive, responder);
  } catch (error) {
    chunk007.axe.log(error);
    responder(error, keepalive);
  }
}

/**
 * Setup default axe frame messenger (make a function so we can
 * call it during tests to reset respondable to default state).
 * @param {Object} respondable
 */
const frameMessenger = {
  open(topicHandler) {
    if (typeof window.addEventListener !== 'function') {
      return;
    }

    const handler = function (messageEvent) {
      messageHandler(messageEvent, topicHandler);
    };
    window.addEventListener('message', handler, false);

    return () => {
      window.removeEventListener('message', handler, false);
    };
  },

  post(win, data, replyHandler) {
    if (typeof window.addEventListener !== 'function') {
      return false;
    }
    return postMessage$1(win, data, false, replyHandler);
  }
};

/**
 * Setup default axe frame messenger (make a function so we can
 * call it during tests to reset respondable to default state).
 * @param {Object} respondable
 */
function setDefaultFrameMessenger(respondable) {
  respondable.updateMessenger(frameMessenger);
}

let closeHandler;
let postMessage;

const topicHandlers = {};

/**
 * Post a message to a window who may or may not respond to it.
 * @param  {Window}   win      The window to post the message to
 * @param  {String}   topic    The topic of the message
 * @param  {Object}   message  The message content
 * @param  {Boolean}  keepalive Whether to allow multiple responses - default is false
 * @param  {Function} replyHandler The function to invoke when/if the message is responded to
 */
function respondable(
  win,
  topic,
  message,
  keepalive,
  replyHandler
) {
  const data = {
    topic,
    message,
    channelId: `${v4()}:${v4()}`,
    keepalive
  };

  return postMessage(win, data, replyHandler);
}

/**
 * Handle incoming window messages
 * @param  {Object} data
 * @param {Function} responder
 */
function messageListener(data, responder) {
  const { topic, message, keepalive } = data;
  const topicHandler = Object.prototype.hasOwnProperty.call(
    topicHandlers,
    topic
  )
    ? topicHandlers[topic]
    : undefined;

  if (!topicHandler) {
    return;
  }

  try {
    topicHandler(message, keepalive, responder);
  } catch (error) {
    chunk007.axe.log(error);
    responder(error, keepalive);
  }
}

/**
 * Update how respondable communicates with iframes.
 * @param {Function} frameHandler  Object with open, post, and close functions
 */
respondable.updateMessenger = function updateMessenger({ open, post }) {
  chunk007.assert(typeof open === 'function', 'open callback must be a function');
  chunk007.assert(typeof post === 'function', 'post callback must be a function');

  if (closeHandler) {
    closeHandler();
  }

  const close = open(messageListener);

  if (close) {
    chunk007.assert(
      typeof close === 'function',
      'open callback must return a cleanup function'
    );
    closeHandler = close;
  } else {
    closeHandler = null;
  }

  postMessage = post;
};

/**
 * Subscribe to messages sent via the `respondable` module.
 *
 * Axe._load uses this to listen for messages from other frames
 *
 * @param  {String}   topic    The topic to listen to
 * @param  {Function} topicHandler The function to invoke when a message is received
 */
respondable.subscribe = function subscribe(topic, topicHandler) {
  chunk007.assert(
    typeof topicHandler === 'function',
    'Subscriber callback must be a function'
  );
  chunk007.assert(
    !Object.prototype.hasOwnProperty.call(topicHandlers, topic),
    `Topic ${topic} is already registered to.`
  );

  topicHandlers[topic] = topicHandler;
};

/**
 * checks if the current context is inside a frame
 * @return {Boolean}
 */
respondable.isInFrame = function isInFrame(win = window) {
  return !!win.frameElement;
};

setDefaultFrameMessenger(respondable);

/**
 * Sends a command to an instance of axe in the specified frame
 * @param  {Element}  node       The frame element to send the message to
 * @param  {Object}   parameters Parameters to pass to the frame
 * @param  {Function} callback   Function to call when results from the frame has returned
 */
function sendCommandToFrame(node, parameters, resolve, reject) {
  const win = node.contentWindow;
  const pingWaitTime = parameters.options?.pingWaitTime ?? 500;
  if (!win) {
    log('Frame does not have a content window', node);
    resolve(null);
    return;
  }

  // Skip ping
  if (pingWaitTime === 0) {
    callAxeStart(node, parameters, resolve, reject);
    return;
  }

  // give the frame .5s to respond to 'axe.ping', else log failed response
  let timeout = setTimeout(() => {
    // This double timeout is important for allowing iframes to respond
    // DO NOT REMOVE
    timeout = setTimeout(() => {
      if (!parameters.debug) {
        resolve(null);
      } else {
        reject(err('No response from frame', node));
      }
    }, 0);
  }, pingWaitTime);

  // send 'axe.ping' to the frame
  respondable(win, 'axe.ping', null, undefined, () => {
    clearTimeout(timeout);
    callAxeStart(node, parameters, resolve, reject);
  });
}

function callAxeStart(node, parameters, resolve, reject) {
  // Give axe 60s (or user-supplied value) to respond to 'axe.start'
  const frameWaitTime = parameters.options?.frameWaitTime ?? 60000;
  const win = node.contentWindow;
  const timeout = setTimeout(function collectResultFramesTimeout() {
    reject(err('Axe in frame timed out', node));
  }, frameWaitTime);

  // send 'axe.start' and send the callback if it responded
  respondable(win, 'axe.start', parameters, undefined, data => {
    clearTimeout(timeout);
    if (data instanceof Error === false) {
      resolve(data);
    } else {
      reject(data);
    }
  });
}

function err(message, node) {
  let selector;
  // TODO: es-modules_tree
  if (chunk007.axe._tree) {
    selector = chunk010.getSelector(node);
  }
  return new Error(message + ': ' + (selector || node));
}

let customSerializer = null;

const nodeSerializer = {
  /**
   * @param {Object} newSerializer
   * @property {Function} toSpec (Optional) Converts a DqElement to a "spec", a form
   * suitable for JSON.stringify to consume. Output must include all properties
   * that DqElement.toJSON() would have. Will always be invoked from the
   * input element's original page context.
   * @property {Function} mergeSpecs (Optional) Merges two specs (produced by toSpec) which
   * represent element's parent frame and an element, respectively. Will
   * *not* necessarily be invoked from *either* node's original page context.
   * This operation must be associative, that is, these two expressions must
   * produce the same result:
   * - mergeSpecs(a, mergeSpecs(b, c))
   * - mergeSpecs(mergeSpecs(a, b), c)
   */
  update(serializer) {
    chunk007.assert(typeof serializer === 'object', 'serializer must be an object');
    customSerializer = serializer;
  },

  /**
   * Converts an Element or VirtualNode to something that can be serialized.
   * @param {Element|VirtualNode} node
   * @return {Object} A "spec", a form suitable for JSON.stringify to consume.
   */
  toSpec(node) {
    return nodeSerializer.dqElmToSpec(new chunk010.DqElement(node));
  },

  /**
   * Converts an DqElement to a serializable object. Optionally provide runOptions
   * to limit which properties are included.
   * @param {DqElement|SpecObject} dqElm
   * @param {Object} runOptions (Optional) Set of options passed into rules or checks
   * @param {Boolean} runOptions.selectors (Optional) Include selector in output
   * @param {Boolean} runOptions.ancestry (Optional) Include ancestry in output
   * @param {Boolean} runOptions.xpath (Optional) Include xpath in output
   * @return {SpecObject} A "spec", a form suitable for JSON.stringify to consume.
   */
  dqElmToSpec(dqElm, runOptions) {
    if (dqElm instanceof chunk010.DqElement === false) {
      return dqElm;
    }
    // Optionally remove selector, ancestry, xpath
    // to prevent unnecessary calculations
    if (runOptions) {
      dqElm = cloneLimitedDqElement(dqElm, runOptions);
    }

    if (typeof customSerializer?.toSpec === 'function') {
      return customSerializer.toSpec(dqElm);
    }
    return dqElm.toJSON();
  },

  /**
   * Merges two specs (produced by toSpec) which represent
   * element's parent frame and an element,
   * @param {Object} nodeSpec
   * @param {Object} parentFrameSpec
   * @returns {Object} The merged spec
   */
  mergeSpecs(nodeSpec, parentFrameSpec) {
    if (typeof customSerializer?.mergeSpecs === 'function') {
      return customSerializer.mergeSpecs(nodeSpec, parentFrameSpec);
    }
    return chunk010.DqElement.mergeSpecs(nodeSpec, parentFrameSpec);
  },

  /**
   * Convert DqElements in RawResults to serialized nodes
   * @param {undefined|RawNodeResult[]} rawResults
   * @returns {undefined|RawNodeResult[]}
   */
  mapRawResults(rawResults) {
    return rawResults.map(rawResult => ({
      ...rawResult,
      nodes: nodeSerializer.mapRawNodeResults(rawResult.nodes)
    }));
  },

  /**
   * Convert DqElements in RawNodeResults to serialized nodes
   * @param {undefined|RawNodeResult[]} rawResults
   * @returns {undefined|RawNodeResult[]}
   */
  mapRawNodeResults(nodeResults) {
    return nodeResults?.map(({ node, ...nodeResult }) => {
      nodeResult.node = nodeSerializer.dqElmToSpec(node);

      for (const type of ['any', 'all', 'none']) {
        nodeResult[type] = nodeResult[type].map(
          ({ relatedNodes, ...checkResult }) => {
            checkResult.relatedNodes = relatedNodes.map(
              nodeSerializer.dqElmToSpec
            );
            return checkResult;
          }
        );
      }
      return nodeResult;
    });
  }
};

/**
 * Create a new DqElement with only the properties we actually want serialized
 * This prevents nodeSerializer from generating selectors / xpath / ancestry
 * when it's not needed. The rest is dummy data to prevent possible errors.
 */
function cloneLimitedDqElement(dqElm, runOptions) {
  const fromFrame = dqElm.fromFrame;
  const { ancestry: hasAncestry, xpath: hasXpath } = runOptions;
  const hasSelectors = runOptions.selectors !== false || fromFrame;

  dqElm = new chunk010.DqElement(dqElm.element, runOptions, {
    source: dqElm.source,
    nodeIndexes: dqElm.nodeIndexes,
    selector: hasSelectors ? dqElm.selector : [':root'],
    ancestry: hasAncestry ? dqElm.ancestry : [':root'],
    xpath: hasXpath ? dqElm.xpath : '/'
  });

  dqElm.fromFrame = fromFrame;
  return dqElm;
}

/**
 * Gets all Checks (or CheckResults) for a given Rule or RuleResult
 * @param {RuleResult|Rule} rule
 */
function getAllChecks(object) {
  const result = [];
  return result
    .concat(object.any || [])
    .concat(object.all || [])
    .concat(object.none || []);
}

/**
 * Iterates an array of objects looking for a property with a specific value
 * @method findBy
 * @memberof axe.utils
 * @param  {Array} array  The array of objects to iterate
 * @param  {String} key   The property name to test against
 * @param  {Mixed} value  The value to find
 * @return {Object}       The first matching object or `undefined` if no match
 */
function findBy(array, key, value) {
  if (Array.isArray(array)) {
    return array.find(
      obj =>
        obj !== null &&
        typeof obj === 'object' &&
        Object.hasOwn(obj, key) &&
        obj[key] === value
    );
  }
}

/**
 * Adds the owning frame's CSS selector onto each instance of DqElement
 * @private
 * @param	{Array} resultSet `nodes` array on a `RuleResult`
 * @param {Object} options Propagated from axe.run/etc
 * @param	{Object} frameSpec The spec describing the owning frame (see nodeSerializer.toSpec)
 */
function pushFrame(resultSet, options, frameSpec) {
  resultSet.forEach(res => {
    res.node = nodeSerializer.mergeSpecs(res.node, frameSpec);
    const checks = getAllChecks(res);

    checks.forEach(check => {
      check.relatedNodes = check.relatedNodes.map(node =>
        nodeSerializer.mergeSpecs(node, frameSpec)
      );
    });
  });
}

/**
 * Adds `to` to `from` and then re-sorts by DOM order
 * @private
 * @param	{Array} target	`nodes` array on a `RuleResult`
 * @param	{Array} to	 `nodes` array on a `RuleResult`
 * @return {Array}			The merged and sorted result
 */
function spliceNodes(target, to) {
  const firstFromFrame = to[0].node;
  let node;
  for (let i = 0; i < target.length; i++) {
    node = target[i].node;
    const resultSort = nodeIndexSort(
      node.nodeIndexes,
      firstFromFrame.nodeIndexes
    );
    if (
      resultSort > 0 ||
      (resultSort === 0 &&
        firstFromFrame.selector.length < node.selector.length)
    ) {
      target.splice(i, 0, ...to);
      return;
    }
  }
  target.push(...to);
}

function normalizeResult(result) {
  if (!result || !result.results) {
    return null;
  }

  if (!Array.isArray(result.results)) {
    return [result.results];
  }

  if (!result.results.length) {
    return null;
  }

  return result.results;
}

/**
 * Merges one or more RuleResults (possibly from different frames) into one RuleResult
 * @private
 * @param	{Array} frameResults Array of objects including the RuleResults as `results` and
 * owning frame as either an Element `frameElement` or a spec `frameSpec` (see nodeSerializer.toSpec)
 * @param {Object} options Propagated from axe.run/etc
 * @return {Array} The merged RuleResults; should only have one result per rule
 */
function mergeResults(frameResults, options) {
  const mergedResult = [];
  frameResults.forEach(frameResult => {
    const results = normalizeResult(frameResult);
    if (!results || !results.length) {
      return;
    }

    const frameSpec = getFrameSpec(frameResult);
    results.forEach(ruleResult => {
      if (ruleResult.nodes && frameSpec) {
        pushFrame(ruleResult.nodes, options, frameSpec);
      }

      const res = findBy(mergedResult, 'id', ruleResult.id);
      if (!res) {
        mergedResult.push(ruleResult);
      } else {
        if (ruleResult.nodes.length) {
          spliceNodes(res.nodes, ruleResult.nodes);
        }
        if (ruleResult.error) {
          res.error ??= ruleResult.error;
        }
      }
    });
  });

  // Sort results in DOM order
  mergedResult.forEach(result => {
    if (result.nodes) {
      result.nodes.sort((nodeA, nodeB) => {
        return nodeIndexSort(nodeA.node.nodeIndexes, nodeB.node.nodeIndexes);
      });
    }
  });
  return mergedResult;
}

function nodeIndexSort(nodeIndexesA = [], nodeIndexesB = []) {
  const length = Math.max(nodeIndexesA?.length, nodeIndexesB?.length);
  for (let i = 0; i < length; i++) {
    const indexA = nodeIndexesA?.[i];
    const indexB = nodeIndexesB?.[i];
    if (typeof indexA !== 'number' || isNaN(indexA)) {
      // Empty arrays go at the end, otherwise shortest array first
      return i === 0 ? 1 : -1;
    }
    if (typeof indexB !== 'number' || isNaN(indexB)) {
      return i === 0 ? -1 : 1;
    }
    if (indexA !== indexB) {
      return indexA - indexB;
    }
  }
  return 0;
}

function getFrameSpec(frameResult) {
  if (frameResult.frameElement) {
    return nodeSerializer.toSpec(frameResult.frameElement);
  } else if (frameResult.frameSpec) {
    return frameResult.frameSpec;
  }
  return null;
}

/**
 * Sends a message to axe running in frames to start analysis and collate results (via `mergeResults`)
 * @private
 * @param  {Context}  parentContent   The resolved Context object
 * @param  {Object}   options   Options object (as passed to `runRules`)
 * @param  {string}   command   Command sent to all frames
 * @param  {Array}    parameter Array of values to be passed along side the command
 * @param  {Function} callback  Function to call when results from all frames have returned
 */
function collectResultsFromFrames(
  parentContent,
  options,
  command,
  parameter,
  resolve,
  reject
) {
  // elementRefs can't be passed across frame boundaries
  options = { ...options, elementRef: false };

  const q = queue();
  const frames = parentContent.frames;

  // Tell each axe running in each frame to collect results
  frames.forEach(({ node: frameElement, ...context }) => {
    q.defer((res, rej) => {
      const params = { options, command, parameter, context };
      function callback(results) {
        if (!results) {
          return res(null);
        }
        return res({ results, frameElement });
      }

      sendCommandToFrame(frameElement, params, callback, rej);
    });
  });

  // Combine results from all frames and give it back
  q.then(data => {
    resolve(mergeResults(data, options));
  }).catch(reject);
}

/**
 * Wrapper for Node#contains
 * @method contains
 * @memberof axe.utils
 * @param  {VirtualNode} vNode     The candidate container VirtualNode
 * @param  {VirtualNode} otherVNode The vNode to test is contained by `vNode`
 * @return {Boolean}           Whether `vNode` contains `otherVNode`
 */
function contains(vNode, otherVNode) {
  // Native light DOM method
  if (
    !vNode.shadowId &&
    !otherVNode.shadowId &&
    vNode.actualNode &&
    // eslint-disable-next-line no-restricted-syntax
    typeof vNode.actualNode.contains === 'function'
  ) {
    // eslint-disable-next-line no-restricted-syntax
    return vNode.actualNode.contains(otherVNode.actualNode);
  }

  // Alternative method for shadow DOM / virtual tree tests
  do {
    if (vNode === otherVNode) {
      return true;
    } else if (otherVNode.nodeIndex < vNode.nodeIndex) {
      return false;
    }
    otherVNode = otherVNode.parent;
  } while (otherVNode);

  return false;
}

/**
 * Deeply merge two objects into a new object without changing any of the source objects.
 * @see https://medium.com/javascript-in-plain-english/how-to-merge-objects-in-javascript-98f2209710e3
 * @param {...Object} sources
 * @return {Object}
 */
function deepMerge(...sources) {
  const target = {};

  sources.forEach(source => {
    if (!source || typeof source !== 'object' || Array.isArray(source)) {
      return;
    }

    for (const key of Object.keys(source)) {
      if (
        !target.hasOwnProperty(key) ||
        typeof source[key] !== 'object' ||
        Array.isArray(target[key])
      ) {
        target[key] = source[key];
      } else {
        target[key] = deepMerge(target[key], source[key]);
      }
    }
  });

  return target;
}

/**
 * Extends metadata onto result object and executes any functions
 * @param  {Object} to   The target of the extend
 * @param  {Object} from Metadata to extend
 */
function extendMetaData(to, from) {
  Object.assign(to, from);
  Object.keys(from)
    .filter(prop => typeof from[prop] === 'function')
    .forEach(prop => {
      to[prop] = null;
      try {
        to[prop] = from[prop](to);
      } catch {
        // Ignore
      }
    });
}

exports.closest = closest;
exports.collectResultsFromFrames = collectResultsFromFrames;
exports.contains = contains;
exports.convertSelector = convertSelector;
exports.deepMerge = deepMerge;
exports.extendMetaData = extendMetaData;
exports.findBy = findBy;
exports.getAllChecks = getAllChecks;
exports.log = log;
exports.matches = matches;
exports.matchesExpression = matchesExpression;
exports.mergeResults = mergeResults;
exports.nodeSerializer = nodeSerializer;
exports.queue = queue;
exports.respondable = respondable;
exports.sendCommandToFrame = sendCommandToFrame;
exports.setDefaultFrameMessenger = setDefaultFrameMessenger;
exports.v4 = v4;
