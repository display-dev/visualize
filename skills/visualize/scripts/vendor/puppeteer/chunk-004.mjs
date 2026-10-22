// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import require$$0 from 'buffer';
import { f as commonjsGlobal, g as getDefaultExportFromCjs } from './chunk-000.mjs';
import { r as requireB4a, a as requireFastFifo, t as tarStream, b as requirePump, c as tarFs } from './chunk-002.mjs';
import { h as headers, r as requireStreamx } from './chunk-003.mjs';
import require$$2 from 'fs';
import require$$3 from 'path';

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    } }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

var bufferUtil = {exports: {}};

var constants$1;
var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$1;
	hasRequiredConstants$1 = 1;

	const BINARY_TYPES = ['nodebuffer', 'arraybuffer', 'fragments'];
	const hasBlob = typeof Blob !== 'undefined';

	if (hasBlob) BINARY_TYPES.push('blob');

	constants$1 = {
	  BINARY_TYPES,
	  CLOSE_TIMEOUT: 30000,
	  EMPTY_BUFFER: Buffer.alloc(0),
	  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
	  hasBlob,
	  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
	  kListener: Symbol('kListener'),
	  kStatusCode: Symbol('status-code'),
	  kWebSocket: Symbol('websocket'),
	  NOOP: () => {}
	};
	return constants$1;
}

var validation = {exports: {}};

var hasRequiredValidation;

function requireValidation () {
	if (hasRequiredValidation) return validation.exports;
	hasRequiredValidation = 1;

	const { isUtf8 } = require$$0;

	const { hasBlob } = requireConstants$1();

	//
	// Allowed token characters:
	//
	// '!', '#', '$', '%', '&', ''', '*', '+', '-',
	// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
	//
	// tokenChars[32] === 0 // ' '
	// tokenChars[33] === 1 // '!'
	// tokenChars[34] === 0 // '"'
	// ...
	//
	// prettier-ignore
	const tokenChars = [
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
	  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
	  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
	  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
	];

	/**
	 * Checks if a status code is allowed in a close frame.
	 *
	 * @param {Number} code The status code
	 * @return {Boolean} `true` if the status code is valid, else `false`
	 * @public
	 */
	function isValidStatusCode(code) {
	  return (
	    (code >= 1000 &&
	      code <= 1014 &&
	      code !== 1004 &&
	      code !== 1005 &&
	      code !== 1006) ||
	    (code >= 3000 && code <= 4999)
	  );
	}

	/**
	 * Checks if a given buffer contains only correct UTF-8.
	 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
	 * Markus Kuhn.
	 *
	 * @param {Buffer} buf The buffer to check
	 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
	 * @public
	 */
	function _isValidUTF8(buf) {
	  const len = buf.length;
	  let i = 0;

	  while (i < len) {
	    if ((buf[i] & 0x80) === 0) {
	      // 0xxxxxxx
	      i++;
	    } else if ((buf[i] & 0xe0) === 0xc0) {
	      // 110xxxxx 10xxxxxx
	      if (
	        i + 1 === len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i] & 0xfe) === 0xc0 // Overlong
	      ) {
	        return false;
	      }

	      i += 2;
	    } else if ((buf[i] & 0xf0) === 0xe0) {
	      // 1110xxxx 10xxxxxx 10xxxxxx
	      if (
	        i + 2 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
	        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
	      ) {
	        return false;
	      }

	      i += 3;
	    } else if ((buf[i] & 0xf8) === 0xf0) {
	      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
	      if (
	        i + 3 >= len ||
	        (buf[i + 1] & 0xc0) !== 0x80 ||
	        (buf[i + 2] & 0xc0) !== 0x80 ||
	        (buf[i + 3] & 0xc0) !== 0x80 ||
	        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
	        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
	        buf[i] > 0xf4 // > U+10FFFF
	      ) {
	        return false;
	      }

	      i += 4;
	    } else {
	      return false;
	    }
	  }

	  return true;
	}

	/**
	 * Determines whether a value is a `Blob`.
	 *
	 * @param {*} value The value to be tested
	 * @return {Boolean} `true` if `value` is a `Blob`, else `false`
	 * @private
	 */
	function isBlob(value) {
	  return (
	    hasBlob &&
	    typeof value === 'object' &&
	    typeof value.arrayBuffer === 'function' &&
	    typeof value.type === 'string' &&
	    typeof value.stream === 'function' &&
	    (value[Symbol.toStringTag] === 'Blob' ||
	      value[Symbol.toStringTag] === 'File')
	  );
	}

	validation.exports = {
	  isBlob,
	  isValidStatusCode,
	  isValidUTF8: _isValidUTF8,
	  tokenChars
	};

	if (isUtf8) {
	  validation.exports.isValidUTF8 = function (buf) {
	    return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
	  };
	} /* istanbul ignore else  */ else if (!process.env.WS_NO_UTF_8_VALIDATE) {
	  try {
	    const isValidUTF8 = require('utf-8-validate');

	    validation.exports.isValidUTF8 = function (buf) {
	      return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
	    };
	  } catch (e) {
	    // Continue regardless of the error.
	  }
	}
	return validation.exports;
}

var hasRequiredHeaders;

function requireHeaders () {
	if (hasRequiredHeaders) return headers;
	hasRequiredHeaders = 1;
	const b4a = requireB4a();

	const ZEROS = '0000000000000000000';
	const SEVENS = '7777777777777777777';
	const ZERO_OFFSET = '0'.charCodeAt(0);
	const USTAR_MAGIC = b4a.from([0x75, 0x73, 0x74, 0x61, 0x72, 0x00]); // ustar\x00
	const USTAR_VER = b4a.from([ZERO_OFFSET, ZERO_OFFSET]);
	const GNU_MAGIC = b4a.from([0x75, 0x73, 0x74, 0x61, 0x72, 0x20]); // ustar\x20
	const GNU_VER = b4a.from([0x20, 0x00]);
	const MASK = 0o7777;
	const MAGIC_OFFSET = 257;
	const VERSION_OFFSET = 263;

	headers.decodeLongPath = function decodeLongPath (buf, encoding) {
	  return decodeStr(buf, 0, buf.length, encoding)
	};

	headers.encodePax = function encodePax (opts) { // TODO: encode more stuff in pax
	  let result = '';
	  if (opts.name) result += addLength(' path=' + opts.name + '\n');
	  if (opts.linkname) result += addLength(' linkpath=' + opts.linkname + '\n');
	  const pax = opts.pax;
	  if (pax) {
	    for (const key in pax) {
	      result += addLength(' ' + key + '=' + pax[key] + '\n');
	    }
	  }
	  return b4a.from(result)
	};

	headers.decodePax = function decodePax (buf) {
	  const result = {};

	  while (buf.length) {
	    let i = 0;
	    while (i < buf.length && buf[i] !== 32) i++;
	    const len = parseInt(b4a.toString(buf.subarray(0, i)), 10);
	    if (!len) return result

	    const b = b4a.toString(buf.subarray(i + 1, len - 1));
	    const keyIndex = b.indexOf('=');
	    if (keyIndex === -1) return result
	    result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);

	    buf = buf.subarray(len);
	  }

	  return result
	};

	headers.encode = function encode (opts) {
	  const buf = b4a.alloc(512);
	  let name = opts.name;
	  let prefix = '';

	  if (opts.typeflag === 5 && name[name.length - 1] !== '/') name += '/';
	  if (b4a.byteLength(name) !== name.length) return null // utf-8

	  while (b4a.byteLength(name) > 100) {
	    const i = name.indexOf('/');
	    if (i === -1) return null
	    prefix += prefix ? '/' + name.slice(0, i) : name.slice(0, i);
	    name = name.slice(i + 1);
	  }

	  if (b4a.byteLength(name) > 100 || b4a.byteLength(prefix) > 155) return null
	  if (opts.linkname && b4a.byteLength(opts.linkname) > 100) return null

	  b4a.write(buf, name);
	  b4a.write(buf, encodeOct(opts.mode & MASK, 6), 100);
	  b4a.write(buf, encodeOct(opts.uid, 6), 108);
	  b4a.write(buf, encodeOct(opts.gid, 6), 116);
	  encodeSize(opts.size, buf, 124);
	  b4a.write(buf, encodeOct((opts.mtime.getTime() / 1000) | 0, 11), 136);

	  buf[156] = ZERO_OFFSET + toTypeflag(opts.type);

	  if (opts.linkname) b4a.write(buf, opts.linkname, 157);

	  b4a.copy(USTAR_MAGIC, buf, MAGIC_OFFSET);
	  b4a.copy(USTAR_VER, buf, VERSION_OFFSET);
	  if (opts.uname) b4a.write(buf, opts.uname, 265);
	  if (opts.gname) b4a.write(buf, opts.gname, 297);
	  b4a.write(buf, encodeOct(opts.devmajor || 0, 6), 329);
	  b4a.write(buf, encodeOct(opts.devminor || 0, 6), 337);

	  if (prefix) b4a.write(buf, prefix, 345);

	  b4a.write(buf, encodeOct(cksum(buf), 6), 148);

	  return buf
	};

	headers.decode = function decode (buf, filenameEncoding, allowUnknownFormat) {
	  let typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;

	  let name = decodeStr(buf, 0, 100, filenameEncoding);
	  const mode = decodeOct(buf, 100, 8);
	  const uid = decodeOct(buf, 108, 8);
	  const gid = decodeOct(buf, 116, 8);
	  const size = decodeOct(buf, 124, 12);
	  const mtime = decodeOct(buf, 136, 12);
	  const type = toType(typeflag);
	  const linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
	  const uname = decodeStr(buf, 265, 32);
	  const gname = decodeStr(buf, 297, 32);
	  const devmajor = decodeOct(buf, 329, 8);
	  const devminor = decodeOct(buf, 337, 8);

	  const c = cksum(buf);

	  // checksum is still initial value if header was null.
	  if (c === 8 * 32) return null

	  // valid checksum
	  if (c !== decodeOct(buf, 148, 8)) throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?')

	  if (isUSTAR(buf)) {
	    // ustar (posix) format.
	    // prepend prefix, if present.
	    if (buf[345]) name = decodeStr(buf, 345, 155, filenameEncoding) + '/' + name;
	  } else if (isGNU(buf)) ; else {
	    if (!allowUnknownFormat) {
	      throw new Error('Invalid tar header: unknown format.')
	    }
	  }

	  // to support old tar versions that use trailing / to indicate dirs
	  if (typeflag === 0 && name && name[name.length - 1] === '/') typeflag = 5;

	  return {
	    name,
	    mode,
	    uid,
	    gid,
	    size,
	    byteOffset: 0,
	    mtime: new Date(1000 * mtime),
	    type,
	    linkname,
	    uname,
	    gname,
	    devmajor,
	    devminor,
	    pax: null
	  }
	};

	function isUSTAR (buf) {
	  return b4a.equals(USTAR_MAGIC, buf.subarray(MAGIC_OFFSET, MAGIC_OFFSET + 6))
	}

	function isGNU (buf) {
	  return b4a.equals(GNU_MAGIC, buf.subarray(MAGIC_OFFSET, MAGIC_OFFSET + 6)) &&
	    b4a.equals(GNU_VER, buf.subarray(VERSION_OFFSET, VERSION_OFFSET + 2))
	}

	function clamp (index, len, defaultValue) {
	  if (typeof index !== 'number') return defaultValue
	  index = ~~index; // Coerce to integer.
	  if (index >= len) return len
	  if (index >= 0) return index
	  index += len;
	  if (index >= 0) return index
	  return 0
	}

	function toType (flag) {
	  switch (flag) {
	    case 0:
	      return 'file'
	    case 1:
	      return 'link'
	    case 2:
	      return 'symlink'
	    case 3:
	      return 'character-device'
	    case 4:
	      return 'block-device'
	    case 5:
	      return 'directory'
	    case 6:
	      return 'fifo'
	    case 7:
	      return 'contiguous-file'
	    case 72:
	      return 'pax-header'
	    case 55:
	      return 'pax-global-header'
	    case 27:
	      return 'gnu-long-link-path'
	    case 28:
	    case 30:
	      return 'gnu-long-path'
	  }

	  return null
	}

	function toTypeflag (flag) {
	  switch (flag) {
	    case 'file':
	      return 0
	    case 'link':
	      return 1
	    case 'symlink':
	      return 2
	    case 'character-device':
	      return 3
	    case 'block-device':
	      return 4
	    case 'directory':
	      return 5
	    case 'fifo':
	      return 6
	    case 'contiguous-file':
	      return 7
	    case 'pax-header':
	      return 72
	  }

	  return 0
	}

	function indexOf (block, num, offset, end) {
	  for (; offset < end; offset++) {
	    if (block[offset] === num) return offset
	  }
	  return end
	}

	function cksum (block) {
	  let sum = 8 * 32;
	  for (let i = 0; i < 148; i++) sum += block[i];
	  for (let j = 156; j < 512; j++) sum += block[j];
	  return sum
	}

	function encodeOct (val, n) {
	  val = val.toString(8);
	  if (val.length > n) return SEVENS.slice(0, n) + ' '
	  return ZEROS.slice(0, n - val.length) + val + ' '
	}

	function encodeSizeBin (num, buf, off) {
	  buf[off] = 0x80;
	  for (let i = 11; i > 0; i--) {
	    buf[off + i] = num & 0xff;
	    num = Math.floor(num / 0x100);
	  }
	}

	function encodeSize (num, buf, off) {
	  if (num.toString(8).length > 11) {
	    encodeSizeBin(num, buf, off);
	  } else {
	    b4a.write(buf, encodeOct(num, 11), off);
	  }
	}

	/* Copied from the node-tar repo and modified to meet
	 * tar-stream coding standard.
	 *
	 * Source: https://github.com/npm/node-tar/blob/51b6627a1f357d2eb433e7378e5f05e83b7aa6cd/lib/header.js#L349
	 */
	function parse256 (buf) {
	  // first byte MUST be either 80 or FF
	  // 80 for positive, FF for 2's comp
	  let positive;
	  if (buf[0] === 0x80) positive = true;
	  else if (buf[0] === 0xFF) positive = false;
	  else return null

	  // build up a base-256 tuple from the least sig to the highest
	  const tuple = [];
	  let i;
	  for (i = buf.length - 1; i > 0; i--) {
	    const byte = buf[i];
	    if (positive) tuple.push(byte);
	    else tuple.push(0xFF - byte);
	  }

	  let sum = 0;
	  const l = tuple.length;
	  for (i = 0; i < l; i++) {
	    sum += tuple[i] * Math.pow(256, i);
	  }

	  return positive ? sum : -1 * sum
	}

	function decodeOct (val, offset, length) {
	  val = val.subarray(offset, offset + length);
	  offset = 0;

	  // If prefixed with 0x80 then parse as a base-256 integer
	  if (val[offset] & 0x80) {
	    return parse256(val)
	  } else {
	    // Older versions of tar can prefix with spaces
	    while (offset < val.length && val[offset] === 32) offset++;
	    const end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
	    while (offset < end && val[offset] === 0) offset++;
	    if (end === offset) return 0
	    return parseInt(b4a.toString(val.subarray(offset, end)), 8)
	  }
	}

	function decodeStr (val, offset, length, encoding) {
	  return b4a.toString(val.subarray(offset, indexOf(val, 0, offset, offset + length)), encoding)
	}

	function addLength (str) {
	  const len = b4a.byteLength(str);
	  let digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
	  if (len + digits >= Math.pow(10, digits)) digits++;

	  return (len + digits) + str
	}
	return headers;
}

var extract;
var hasRequiredExtract;

function requireExtract () {
	if (hasRequiredExtract) return extract;
	hasRequiredExtract = 1;
	const { Writable, Readable, getStreamError } = requireStreamx();
	const FIFO = requireFastFifo();
	const b4a = requireB4a();
	const headers = requireHeaders();

	const EMPTY = b4a.alloc(0);
	const MAX_HEADER_SIZE = 4 * 1024 * 1024; // arbitrary big number

	class BufferList {
	  constructor () {
	    this.buffered = 0;
	    this.shifted = 0;
	    this.queue = new FIFO();

	    this._offset = 0;
	  }

	  push (buffer) {
	    this.buffered += buffer.byteLength;
	    this.queue.push(buffer);
	  }

	  shiftFirst (size) {
	    return this.buffered === 0 ? null : this._next(size)
	  }

	  shift (size) {
	    if (size > this.buffered) return null
	    if (size === 0) return EMPTY

	    let chunk = this._next(size);

	    if (size === chunk.byteLength) return chunk // likely case

	    const chunks = [chunk];

	    while ((size -= chunk.byteLength) > 0) {
	      chunk = this._next(size);
	      chunks.push(chunk);
	    }

	    return b4a.concat(chunks)
	  }

	  _next (size) {
	    const buf = this.queue.peek();
	    const rem = buf.byteLength - this._offset;

	    if (size >= rem) {
	      const sub = this._offset ? buf.subarray(this._offset, buf.byteLength) : buf;
	      this.queue.shift();
	      this._offset = 0;
	      this.buffered -= rem;
	      this.shifted += rem;
	      return sub
	    }

	    this.buffered -= size;
	    this.shifted += size;

	    return buf.subarray(this._offset, (this._offset += size))
	  }
	}

	class Source extends Readable {
	  constructor (self, header, offset) {
	    super();

	    this.header = header;
	    this.offset = offset;

	    this._parent = self;
	  }

	  _read (cb) {
	    if (this.header.size === 0) {
	      this.push(null);
	    }
	    if (this._parent._stream === this) {
	      this._parent._update();
	    }
	    cb(null);
	  }

	  _predestroy () {
	    this._parent.destroy(getStreamError(this));
	  }

	  _detach () {
	    if (this._parent._stream === this) {
	      this._parent._stream = null;
	      this._parent._missing = overflow(this.header.size);
	      this._parent._update();
	    }
	  }

	  _destroy (cb) {
	    this._detach();
	    cb(null);
	  }
	}

	class Extract extends Writable {
	  constructor (opts) {
	    super(opts);

	    if (!opts) opts = {};

	    this._buffer = new BufferList();
	    this._offset = 0;
	    this._header = null;
	    this._stream = null;
	    this._missing = 0;
	    this._longHeader = false;
	    this._callback = noop;
	    this._locked = false;
	    this._finished = false;
	    this._pax = null;
	    this._paxGlobal = null;
	    this._gnuLongPath = null;
	    this._gnuLongLinkPath = null;
	    this._filenameEncoding = opts.filenameEncoding || 'utf-8';
	    this._allowUnknownFormat = !!opts.allowUnknownFormat;
	    this._unlockBound = this._unlock.bind(this);
	  }

	  _unlock (err) {
	    this._locked = false;

	    if (err) {
	      this.destroy(err);
	      this._continueWrite(err);
	      return
	    }

	    this._update();
	  }

	  _consumeHeader () {
	    if (this._locked) return false

	    this._offset = this._buffer.shifted;

	    try {
	      this._header = headers.decode(this._buffer.shift(512), this._filenameEncoding, this._allowUnknownFormat);
	    } catch (err) {
	      this._continueWrite(err);
	      return false
	    }

	    if (!this._header) return true

	    this._header.byteOffset = this._buffer.shifted;

	    switch (this._header.type) {
	      case 'gnu-long-path':
	      case 'gnu-long-link-path':
	      case 'pax-global-header':
	      case 'pax-header':
	        this._longHeader = true;
	        this._missing = this._header.size;
	        if (this._missing > MAX_HEADER_SIZE) {
	          this._continueWrite(new Error('Header exceeds max size'));
	          return false
	        }
	        return true
	    }

	    this._locked = true;
	    this._applyLongHeaders();

	    if (!(this._header.size >= 0)) {
	      this._continueWrite(new Error('Invalid header'));
	      return false
	    }

	    if (this._header.size === 0 || this._header.type === 'directory') {
	      this.emit('entry', this._header, this._createStream(), this._unlockBound);
	      return true
	    }

	    this._stream = this._createStream();
	    this._missing = this._header.size;

	    this.emit('entry', this._header, this._stream, this._unlockBound);
	    return true
	  }

	  _applyLongHeaders () {
	    if (this._gnuLongPath) {
	      this._header.name = this._gnuLongPath;
	      this._gnuLongPath = null;
	    }

	    if (this._gnuLongLinkPath) {
	      this._header.linkname = this._gnuLongLinkPath;
	      this._gnuLongLinkPath = null;
	    }

	    if (this._pax) {
	      if (this._pax.path) this._header.name = this._pax.path;
	      if (this._pax.linkpath) this._header.linkname = this._pax.linkpath;
	      if (this._pax.size) this._header.size = parseInt(this._pax.size, 10);
	      this._header.pax = this._pax;
	      this._pax = null;
	    }
	  }

	  _decodeLongHeader (buf) {
	    switch (this._header.type) {
	      case 'gnu-long-path':
	        this._gnuLongPath = headers.decodeLongPath(buf, this._filenameEncoding);
	        break
	      case 'gnu-long-link-path':
	        this._gnuLongLinkPath = headers.decodeLongPath(buf, this._filenameEncoding);
	        break
	      case 'pax-global-header':
	        this._paxGlobal = headers.decodePax(buf);
	        break
	      case 'pax-header':
	        this._pax = this._paxGlobal === null
	          ? headers.decodePax(buf)
	          : Object.assign({}, this._paxGlobal, headers.decodePax(buf));
	        break
	    }
	  }

	  _consumeLongHeader () {
	    this._longHeader = false;
	    this._missing = overflow(this._header.size);

	    const buf = this._buffer.shift(this._header.size);

	    try {
	      this._decodeLongHeader(buf);
	    } catch (err) {
	      this._continueWrite(err);
	      return false
	    }

	    return true
	  }

	  _consumeStream () {
	    const buf = this._buffer.shiftFirst(this._missing);
	    if (buf === null) return false

	    this._missing -= buf.byteLength;
	    const drained = this._stream.push(buf);

	    if (this._missing === 0) {
	      this._stream.push(null);
	      if (drained) this._stream._detach();
	      return drained && this._locked === false
	    }

	    return drained
	  }

	  _createStream () {
	    return new Source(this, this._header, this._offset)
	  }

	  _update () {
	    while (this._buffer.buffered > 0 && !this.destroying) {
	      if (this._missing > 0) {
	        if (this._stream !== null) {
	          if (this._consumeStream() === false) return
	          continue
	        }

	        if (this._longHeader === true) {
	          if (this._missing > this._buffer.buffered) break
	          if (this._consumeLongHeader() === false) return false
	          continue
	        }

	        const ignore = this._buffer.shiftFirst(this._missing);
	        if (ignore !== null) this._missing -= ignore.byteLength;
	        continue
	      }

	      if (this._buffer.buffered < 512) break
	      if (this._stream !== null || this._consumeHeader() === false) return
	    }

	    this._continueWrite(null);
	  }

	  _continueWrite (err) {
	    const cb = this._callback;
	    this._callback = noop;
	    cb(err);
	  }

	  _write (data, cb) {
	    this._callback = cb;
	    this._buffer.push(data);
	    this._update();
	  }

	  _final (cb) {
	    this._finished = this._missing === 0 && this._buffer.buffered === 0;
	    cb(this._finished ? null : new Error('Unexpected end of data'));
	  }

	  _predestroy () {
	    this._continueWrite(null);
	  }

	  _destroy (cb) {
	    if (this._stream) this._stream.destroy(getStreamError(this));
	    cb(null);
	  }

	  [Symbol.asyncIterator] () {
	    let error = null;

	    let promiseResolve = null;
	    let promiseReject = null;

	    let entryStream = null;
	    let entryCallback = null;

	    const extract = this;

	    this.on('entry', onentry);
	    this.on('error', (err) => { error = err; });
	    this.on('close', onclose);

	    return {
	      [Symbol.asyncIterator] () {
	        return this
	      },
	      next () {
	        return new Promise(onnext)
	      },
	      return () {
	        return destroy(null)
	      },
	      throw (err) {
	        return destroy(err)
	      }
	    }

	    function consumeCallback (err) {
	      if (!entryCallback) return
	      const cb = entryCallback;
	      entryCallback = null;
	      cb(err);
	    }

	    function onnext (resolve, reject) {
	      if (error) {
	        return reject(error)
	      }

	      if (entryStream) {
	        resolve({ value: entryStream, done: false });
	        entryStream = null;
	        return
	      }

	      promiseResolve = resolve;
	      promiseReject = reject;

	      consumeCallback(null);

	      if (extract._finished && promiseResolve) {
	        promiseResolve({ value: undefined, done: true });
	        promiseResolve = promiseReject = null;
	      }
	    }

	    function onentry (header, stream, callback) {
	      entryCallback = callback;
	      stream.on('error', noop); // no way around this due to tick sillyness

	      if (promiseResolve) {
	        promiseResolve({ value: stream, done: false });
	        promiseResolve = promiseReject = null;
	      } else {
	        entryStream = stream;
	      }
	    }

	    function onclose () {
	      consumeCallback(error);
	      if (!promiseResolve) return
	      if (error) promiseReject(error);
	      else promiseResolve({ value: undefined, done: true });
	      promiseResolve = promiseReject = null;
	    }

	    function destroy (err) {
	      extract.destroy(err);
	      consumeCallback(err);
	      return new Promise((resolve, reject) => {
	        if (extract.destroyed) return resolve({ value: undefined, done: true })
	        extract.once('close', function () {
	          if (err) reject(err);
	          else resolve({ value: undefined, done: true });
	        });
	      })
	    }
	  }
	}

	extract = function extract (opts) {
	  return new Extract(opts)
	};

	function noop () {}

	function overflow (size) {
	  size &= 511;
	  return size && 512 - size
	}
	return extract;
}

var constants = {exports: {}};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants.exports;
	hasRequiredConstants = 1;
	const constants$1 = { // just for envs without fs
	  S_IFMT: 61440,
	  S_IFDIR: 16384,
	  S_IFCHR: 8192,
	  S_IFBLK: 24576,
	  S_IFIFO: 4096,
	  S_IFLNK: 40960
	};

	try {
	  constants.exports = require('fs').constants || constants$1;
	} catch {
	  constants.exports = constants$1;
	}
	return constants.exports;
}

var pack;
var hasRequiredPack;

function requirePack () {
	if (hasRequiredPack) return pack;
	hasRequiredPack = 1;
	const { Readable, Writable, getStreamError } = requireStreamx();
	const b4a = requireB4a();

	const constants = requireConstants();
	const headers = requireHeaders();

	const DMODE = 0o755;
	const FMODE = 0o644;

	const END_OF_TAR = b4a.alloc(1024);

	class Sink extends Writable {
	  constructor (pack, header, callback) {
	    super({ mapWritable, eagerOpen: true });

	    this.written = 0;
	    this.header = header;

	    this._callback = callback;
	    this._linkname = null;
	    this._isLinkname = header.type === 'symlink' && !header.linkname;
	    this._isVoid = header.type !== 'file' && header.type !== 'contiguous-file';
	    this._finished = false;
	    this._pack = pack;
	    this._openCallback = null;

	    if (this._pack._stream === null) this._pack._stream = this;
	    else this._pack._pending.push(this);
	  }

	  _open (cb) {
	    this._openCallback = cb;
	    if (this._pack._stream === this) this._continueOpen();
	  }

	  _continuePack (err) {
	    if (this._callback === null) return

	    const callback = this._callback;
	    this._callback = null;

	    callback(err);
	  }

	  _continueOpen () {
	    if (this._pack._stream === null) this._pack._stream = this;

	    const cb = this._openCallback;
	    this._openCallback = null;
	    if (cb === null) return

	    if (this._pack.destroying) return cb(new Error('pack stream destroyed'))
	    if (this._pack._finalized) return cb(new Error('pack stream is already finalized'))

	    this._pack._stream = this;

	    if (!this._isLinkname) {
	      this._pack._encode(this.header);
	    }

	    if (this._isVoid) {
	      this._finish();
	      this._continuePack(null);
	    }

	    cb(null);
	  }

	  _write (data, cb) {
	    if (this._isLinkname) {
	      this._linkname = this._linkname ? b4a.concat([this._linkname, data]) : data;
	      return cb(null)
	    }

	    if (this._isVoid) {
	      if (data.byteLength > 0) {
	        return cb(new Error('No body allowed for this entry'))
	      }
	      return cb()
	    }

	    this.written += data.byteLength;
	    if (this._pack.push(data)) return cb()
	    this._pack._drain = cb;
	  }

	  _finish () {
	    if (this._finished) return
	    this._finished = true;

	    if (this._isLinkname) {
	      this.header.linkname = this._linkname ? b4a.toString(this._linkname, 'utf-8') : '';
	      this._pack._encode(this.header);
	    }

	    overflow(this._pack, this.header.size);

	    this._pack._done(this);
	  }

	  _final (cb) {
	    if (this.written !== this.header.size) { // corrupting tar
	      return cb(new Error('Size mismatch'))
	    }

	    this._finish();
	    cb(null);
	  }

	  _getError () {
	    return getStreamError(this) || new Error('tar entry destroyed')
	  }

	  _predestroy () {
	    this._pack.destroy(this._getError());
	  }

	  _destroy (cb) {
	    this._pack._done(this);

	    this._continuePack(this._finished ? null : this._getError());

	    cb();
	  }
	}

	class Pack extends Readable {
	  constructor (opts) {
	    super(opts);
	    this._drain = noop;
	    this._finalized = false;
	    this._finalizing = false;
	    this._pending = [];
	    this._stream = null;
	  }

	  entry (header, buffer, callback) {
	    if (this._finalized || this.destroying) throw new Error('already finalized or destroyed')

	    if (typeof buffer === 'function') {
	      callback = buffer;
	      buffer = null;
	    }

	    if (!callback) callback = noop;

	    if (!header.size || header.type === 'symlink') header.size = 0;
	    if (!header.type) header.type = modeToType(header.mode);
	    if (!header.mode) header.mode = header.type === 'directory' ? DMODE : FMODE;
	    if (!header.uid) header.uid = 0;
	    if (!header.gid) header.gid = 0;
	    if (!header.mtime) header.mtime = new Date();

	    if (typeof buffer === 'string') buffer = b4a.from(buffer);

	    const sink = new Sink(this, header, callback);

	    if (b4a.isBuffer(buffer)) {
	      header.size = buffer.byteLength;
	      sink.write(buffer);
	      sink.end();
	      return sink
	    }

	    if (sink._isVoid) {
	      return sink
	    }

	    return sink
	  }

	  finalize () {
	    if (this._stream || this._pending.length > 0) {
	      this._finalizing = true;
	      return
	    }

	    if (this._finalized) return
	    this._finalized = true;

	    this.push(END_OF_TAR);
	    this.push(null);
	  }

	  _done (stream) {
	    if (stream !== this._stream) return

	    this._stream = null;

	    if (this._finalizing) this.finalize();
	    if (this._pending.length) this._pending.shift()._continueOpen();
	  }

	  _encode (header) {
	    if (!header.pax) {
	      const buf = headers.encode(header);
	      if (buf) {
	        this.push(buf);
	        return
	      }
	    }
	    this._encodePax(header);
	  }

	  _encodePax (header) {
	    const paxHeader = headers.encodePax({
	      name: header.name,
	      linkname: header.linkname,
	      pax: header.pax
	    });

	    const newHeader = {
	      name: 'PaxHeader',
	      mode: header.mode,
	      uid: header.uid,
	      gid: header.gid,
	      size: paxHeader.byteLength,
	      mtime: header.mtime,
	      type: 'pax-header',
	      linkname: header.linkname && 'PaxHeader',
	      uname: header.uname,
	      gname: header.gname,
	      devmajor: header.devmajor,
	      devminor: header.devminor
	    };

	    this.push(headers.encode(newHeader));
	    this.push(paxHeader);
	    overflow(this, paxHeader.byteLength);

	    newHeader.size = header.size;
	    newHeader.type = header.type;
	    this.push(headers.encode(newHeader));
	  }

	  _doDrain () {
	    const drain = this._drain;
	    this._drain = noop;
	    drain();
	  }

	  _predestroy () {
	    const err = getStreamError(this);

	    if (this._stream) this._stream.destroy(err);

	    while (this._pending.length) {
	      const stream = this._pending.shift();
	      stream.destroy(err);
	      stream._continueOpen();
	    }

	    this._doDrain();
	  }

	  _read (cb) {
	    this._doDrain();
	    cb();
	  }
	}

	pack = function pack (opts) {
	  return new Pack(opts)
	};

	function modeToType (mode) {
	  switch (mode & constants.S_IFMT) {
	    case constants.S_IFBLK: return 'block-device'
	    case constants.S_IFCHR: return 'character-device'
	    case constants.S_IFDIR: return 'directory'
	    case constants.S_IFIFO: return 'fifo'
	    case constants.S_IFLNK: return 'symlink'
	  }

	  return 'file'
	}

	function noop () {}

	function overflow (self, size) {
	  size &= 511;
	  if (size) self.push(END_OF_TAR.subarray(0, 512 - size));
	}

	function mapWritable (buf) {
	  return b4a.isBuffer(buf) ? buf : b4a.from(buf)
	}
	return pack;
}

var hasRequiredTarStream;

function requireTarStream () {
	if (hasRequiredTarStream) return tarStream;
	hasRequiredTarStream = 1;
	tarStream.extract = requireExtract();
	tarStream.pack = requirePack();
	return tarStream;
}

var hasRequiredTarFs;

function requireTarFs () {
	if (hasRequiredTarFs) return tarFs;
	hasRequiredTarFs = 1;
	const tar = requireTarStream();
	const pump = requirePump();
	const fs = require$$2;
	const path = require$$3;

	const win32 = (commonjsGlobal.Bare ? commonjsGlobal.Bare.platform : process.platform) === 'win32';

	tarFs.pack = function pack (cwd, opts) {
	  if (!cwd) cwd = '.';
	  if (!opts) opts = {};

	  const xfs = opts.fs || fs;
	  const ignore = opts.ignore || opts.filter || noop;
	  const mapStream = opts.mapStream || echo;
	  const statNext = statAll(xfs, opts.dereference ? xfs.stat : xfs.lstat, cwd, ignore, opts.entries, opts.sort);
	  const strict = opts.strict !== false;
	  const umask = typeof opts.umask === 'number' ? ~opts.umask : ~processUmask();
	  const pack = opts.pack || tar.pack();
	  const finish = opts.finish || noop;

	  let map = opts.map || noop;
	  let dmode = typeof opts.dmode === 'number' ? opts.dmode : 0;
	  let fmode = typeof opts.fmode === 'number' ? opts.fmode : 0;

	  if (opts.strip) map = strip(map, opts.strip);

	  if (opts.readable) {
	    dmode |= parseInt(555, 8);
	    fmode |= parseInt(444, 8);
	  }
	  if (opts.writable) {
	    dmode |= parseInt(333, 8);
	    fmode |= parseInt(222, 8);
	  }

	  onnextentry();

	  function onsymlink (filename, header) {
	    xfs.readlink(path.join(cwd, filename), function (err, linkname) {
	      if (err) return pack.destroy(err)
	      header.linkname = normalize(linkname);
	      pack.entry(header, onnextentry);
	    });
	  }

	  function onstat (err, filename, stat) {
	    if (pack.destroyed) return
	    if (err) return pack.destroy(err)
	    if (!filename) {
	      if (opts.finalize !== false) pack.finalize();
	      return finish(pack)
	    }

	    if (stat.isSocket()) return onnextentry() // tar does not support sockets...

	    let header = {
	      name: normalize(filename),
	      mode: (stat.mode | (stat.isDirectory() ? dmode : fmode)) & umask,
	      mtime: stat.mtime,
	      size: stat.size,
	      type: 'file',
	      uid: stat.uid,
	      gid: stat.gid
	    };

	    if (stat.isDirectory()) {
	      header.size = 0;
	      header.type = 'directory';
	      header = map(header) || header;
	      return pack.entry(header, onnextentry)
	    }

	    if (stat.isSymbolicLink()) {
	      header.size = 0;
	      header.type = 'symlink';
	      header = map(header) || header;
	      return onsymlink(filename, header)
	    }

	    // TODO: add fifo etc...

	    header = map(header) || header;

	    if (!stat.isFile()) {
	      if (strict) return pack.destroy(new Error('unsupported type for ' + filename))
	      return onnextentry()
	    }

	    const entry = pack.entry(header, onnextentry);
	    const rs = mapStream(xfs.createReadStream(path.join(cwd, filename), { start: 0, end: header.size > 0 ? header.size - 1 : header.size }), header);

	    rs.on('error', function (err) { // always forward errors on destroy
	      entry.destroy(err);
	    });

	    pump(rs, entry);
	  }

	  function onnextentry (err) {
	    if (err) return pack.destroy(err)
	    statNext(onstat);
	  }

	  return pack
	};

	function head (list) {
	  return list.length ? list[list.length - 1] : null
	}

	function processGetuid () {
	  return (!commonjsGlobal.Bare && process.getuid) ? process.getuid() : -1
	}

	function processUmask () {
	  return (!commonjsGlobal.Bare && process.umask) ? process.umask() : 0
	}

	tarFs.extract = function extract (cwd, opts) {
	  if (!cwd) cwd = '.';
	  if (!opts) opts = {};

	  cwd = path.resolve(cwd);

	  const xfs = opts.fs || fs;
	  const ignore = opts.ignore || opts.filter || noop;
	  const mapStream = opts.mapStream || echo;
	  const own = opts.chown !== false && !win32 && processGetuid() === 0;
	  const extract = opts.extract || tar.extract();
	  const stack = [];
	  const now = new Date();
	  const umask = typeof opts.umask === 'number' ? ~opts.umask : ~processUmask();
	  const strict = opts.strict !== false;
	  const validateSymLinks = opts.validateSymlinks !== false;

	  let map = opts.map || noop;
	  let dmode = typeof opts.dmode === 'number' ? opts.dmode : 0;
	  let fmode = typeof opts.fmode === 'number' ? opts.fmode : 0;

	  if (opts.strip) map = strip(map, opts.strip);

	  if (opts.readable) {
	    dmode |= parseInt(555, 8);
	    fmode |= parseInt(444, 8);
	  }
	  if (opts.writable) {
	    dmode |= parseInt(333, 8);
	    fmode |= parseInt(222, 8);
	  }

	  extract.on('entry', onentry);

	  if (opts.finish) extract.on('finish', opts.finish);

	  return extract

	  function onentry (header, stream, next) {
	    header = map(header) || header;
	    header.name = normalize(header.name);

	    const name = path.join(cwd, path.join('/', header.name));

	    if (ignore(name, header)) {
	      stream.resume();
	      return next()
	    }

	    const dir = path.join(name, '.') === path.join(cwd, '.') ? cwd : path.dirname(name);

	    validate(xfs, dir, path.join(cwd, '.'), function (err, valid) {
	      if (err) return next(err)
	      if (!valid) return next(new Error(dir + ' is not a valid path'))

	      if (header.type === 'directory') {
	        stack.push([name, header.mtime]);
	        return mkdirfix(name, {
	          uid: header.uid,
	          gid: header.gid,
	          mode: header.mode
	        }, stat)
	      }

	      mkdirfix(dir, {
	        uid: header.uid,
	        gid: header.gid,
	        // normally, the folders with rights and owner should be part of the TAR file
	        // if this is not the case, create folder for same user as file and with
	        // standard permissions of 0o755 (rwxr-xr-x)
	        mode: 0o755
	      }, function (err) {
	        if (err) return next(err)

	        switch (header.type) {
	          case 'file': return onfile()
	          case 'link': return onlink()
	          case 'symlink': return onsymlink()
	        }

	        if (strict) return next(new Error('unsupported type for ' + name + ' (' + header.type + ')'))

	        stream.resume();
	        next();
	      });
	    });

	    function stat (err) {
	      if (err) return next(err)
	      if (path.join(name, '.') === path.join(cwd, '.')) return next() // do not touch the extraction root itself
	      utimes(name, header, function (err) {
	        if (err) return next(err)
	        if (win32) return next()
	        chperm(name, header, next);
	      });
	    }

	    function onsymlink () {
	      if (win32) return next() // skip symlinks on win for now before it can be tested
	      xfs.unlink(name, function () {
	        const dst = path.resolve(path.dirname(name), header.linkname);
	        // strip shifts the resolution anchor, so a relative linkname may now escape - reject regardless of validateSymlinks
	        if (!inCwd(dst) && (validateSymLinks || opts.strip)) return next(new Error(name + ' is not a valid symlink'))

	        validateNotSymlink(xfs, dst, path.join(cwd, '.'), function (err, valid) {
	          if (err) return next(err)
	          if (!valid && validateSymLinks) return next(new Error(name + ' is not a valid symlink'))
	          xfs.symlink(header.linkname, name, stat);
	        });
	      });
	    }

	    function onlink () {
	      if (win32) return next() // skip links on win for now before it can be tested
	      xfs.unlink(name, function () {
	        const link = path.join(cwd, path.join('/', header.linkname));

	        xfs.realpath(link, function (err, dst) {
	          if (err || !inCwd(dst)) return next(new Error(name + ' is not a valid hardlink'))

	          xfs.link(dst, name, function (err) {
	            if (err && err.code === 'EPERM' && opts.hardlinkAsFilesFallback) {
	              stream = xfs.createReadStream(dst);
	              return onfile()
	            }

	            stat(err);
	          });
	        });
	      });
	    }

	    function inCwd (dst) {
	      return dst === cwd || dst.startsWith(cwd + path.sep)
	    }

	    function onfile () {
	      xfs.lstat(name, function (err, st) {
	        if (!err && st.isSymbolicLink()) return xfs.unlink(name, onwrite) // never write through an existing symlink
	        onwrite();
	      });

	      function onwrite (err) {
	        if (err) return next(err)

	        const ws = xfs.createWriteStream(name);
	        const rs = mapStream(stream, header);

	        ws.on('error', function (err) { // always forward errors on destroy
	          rs.destroy(err);
	        });

	        pump(rs, ws, function (err) {
	          if (err) return next(err)
	          ws.on('close', stat);
	        });
	      }
	    }
	  }

	  function utimesParent (name, cb) { // we just set the mtime on the parent dir again everytime we write an entry
	    let top;
	    while ((top = head(stack)) && name.slice(0, top[0].length) !== top[0]) stack.pop();
	    if (!top) return cb()
	    xfs.utimes(top[0], now, top[1], cb);
	  }

	  function utimes (name, header, cb) {
	    if (opts.utimes === false) return cb()

	    if (header.type === 'directory') return xfs.utimes(name, now, header.mtime, cb)
	    if (header.type === 'symlink') return utimesParent(name, cb) // TODO: how to set mtime on link?

	    xfs.utimes(name, now, header.mtime, function (err) {
	      if (err) return cb(err)
	      utimesParent(name, cb);
	    });
	  }

	  function chperm (name, header, cb) {
	    const link = header.type === 'symlink';

	    /* eslint-disable n/no-deprecated-api */
	    const chmod = link ? xfs.lchmod : xfs.chmod;
	    const chown = link ? xfs.lchown : xfs.chown;
	    /* eslint-enable n/no-deprecated-api */

	    if (!chmod) return cb()

	    const mode = (header.mode | (header.type === 'directory' ? dmode : fmode)) & umask & 0o777; // never extract setuid/setgid/sticky bits

	    if (chown && own) chown.call(xfs, name, header.uid, header.gid, onchown);
	    else onchown(null);

	    function onchown (err) {
	      if (err) return cb(err)
	      if (!chmod) return cb()
	      chmod.call(xfs, name, mode, cb);
	    }
	  }

	  function mkdirfix (name, opts, cb) {
	    // when mkdir is called on an existing directory, the permissions
	    // will be overwritten (?), to avoid this we check for its existance first
	    xfs.stat(name, function (err) {
	      if (!err) return cb(null)
	      if (err.code !== 'ENOENT') return cb(err)
	      xfs.mkdir(name, { mode: opts.mode, recursive: true }, function (err, made) {
	        if (err) return cb(err)
	        chperm(name, opts, cb);
	      });
	    });
	  }
	};

	function validateNotSymlink (fs, name, root, cb) {
	  if (name === root) return cb(null, true)
	  if (!name.startsWith(root + path.sep)) return cb(null, false)

	  fs.lstat(name, function (err, st) {
	    if (err && err.code !== 'ENOENT' && err.code !== 'EPERM') return cb(err)
	    if (err || !st.isSymbolicLink()) return validateNotSymlink(fs, path.join(name, '..'), root, cb)
	    cb(null, false);
	  });
	}

	function validate (fs, name, root, cb) {
	  if (name === root) return cb(null, true)

	  fs.lstat(name, function (err, st) {
	    if (err && err.code !== 'ENOENT' && err.code !== 'EPERM') return cb(err)
	    if (err || st.isDirectory()) return validate(fs, path.join(name, '..'), root, cb)
	    cb(null, false);
	  });
	}

	function inside (root, name) {
	  return name === root || name.startsWith(root + path.sep)
	}

	function noop () {}

	function echo (name) {
	  return name
	}

	function normalize (name) {
	  return win32 ? name.replace(/\\/g, '/').replace(/[:?<>|]/g, '_') : name
	}

	function statAll (fs, stat, cwd, ignore, entries, sort) {
	  if (!entries) entries = ['.'];
	  const queue = entries.slice(0);
	  const root = path.resolve(cwd);

	  return function loop (callback) {
	    if (!queue.length) return callback(null)

	    const next = queue.shift();
	    const nextAbs = path.join(cwd, next);

	    if (!inside(root, path.resolve(cwd, next))) return callback(new Error(next + ' is not a valid path')) // do not pack outside cwd

	    stat.call(fs, nextAbs, function (err, stat) {
	      // ignore errors if the files were deleted while buffering
	      if (err) return callback(entries.indexOf(next) === -1 && err.code === 'ENOENT' ? null : err)

	      if (!stat.isDirectory()) return callback(null, next, stat)

	      fs.readdir(nextAbs, function (err, files) {
	        if (err) return callback(err)

	        if (sort) files.sort();

	        for (let i = 0; i < files.length; i++) {
	          if (!ignore(path.join(cwd, next, files[i]))) queue.push(path.join(next, files[i]));
	        }

	        callback(null, next, stat);
	      });
	    });
	  }
	}

	function strip (map, level) {
	  return function (header) {
	    header.name = header.name.split('/').slice(level).join('/');

	    const linkname = header.linkname;
	    if (linkname && (header.type === 'link' || path.isAbsolute(linkname))) {
	      header.linkname = linkname.split('/').slice(level).join('/');
	    }

	    return map(header)
	  }
	}
	return tarFs;
}

var tarFsExports = requireTarFs();
const index = /*@__PURE__*/getDefaultExportFromCjs(tarFsExports);

const index$1 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: index
}, [tarFsExports]);

export { requireValidation as a, bufferUtil as b, index$1 as i, requireConstants$1 as r };
