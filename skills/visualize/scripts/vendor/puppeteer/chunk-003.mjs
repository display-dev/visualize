// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { f as commonjsGlobal } from './chunk-000.mjs';
import { r as requireB4a, d as requirePassThroughDecoder, e as require_default, f as requireErrors, a as requireFastFifo } from './chunk-002.mjs';

var utf8Decoder;
var hasRequiredUtf8Decoder;

function requireUtf8Decoder () {
	if (hasRequiredUtf8Decoder) return utf8Decoder;
	hasRequiredUtf8Decoder = 1;
	const b4a = requireB4a();

	/**
	 * https://encoding.spec.whatwg.org/#utf-8-decoder
	 */
	utf8Decoder = class UTF8Decoder {
	  constructor() {
	    this._reset();
	  }

	  get remaining() {
	    return this.bytesSeen
	  }

	  decode(data) {
	    if (data.byteLength === 0) return ''

	    if (this.bytesNeeded === 0 && trailingIncomplete(data, 0) === 0) {
	      this.bytesSeen = trailingBytesSeen(data);
	      return b4a.toString(data, 'utf8')
	    }

	    let result = '';
	    let start = 0;

	    if (this.bytesNeeded > 0) {
	      while (start < data.byteLength) {
	        const byte = data[start];

	        if (byte < this.lowerBoundary || byte > this.upperBoundary) {
	          result += '\ufffd';
	          this._reset();
	          break
	        }

	        this.lowerBoundary = 0x80;
	        this.upperBoundary = 0xbf;
	        this.codePoint = (this.codePoint << 6) | (byte & 0x3f);
	        this.bytesSeen++;
	        start++;

	        if (this.bytesSeen === this.bytesNeeded) {
	          result += String.fromCodePoint(this.codePoint);
	          this._reset();
	          break
	        }
	      }

	      if (this.bytesNeeded > 0) return result
	    }

	    const trailing = trailingIncomplete(data, start);
	    const end = data.byteLength - trailing;

	    if (end > start) result += b4a.toString(data, 'utf8', start, end);

	    for (let i = end; i < data.byteLength; i++) {
	      const byte = data[i];

	      if (this.bytesNeeded === 0) {
	        if (byte <= 0x7f) {
	          this.bytesSeen = 0;
	          result += String.fromCharCode(byte);
	        } else if (byte >= 0xc2 && byte <= 0xdf) {
	          this.bytesNeeded = 2;
	          this.bytesSeen = 1;
	          this.codePoint = byte & 0x1f;
	        } else if (byte >= 0xe0 && byte <= 0xef) {
	          if (byte === 0xe0) this.lowerBoundary = 0xa0;
	          else if (byte === 0xed) this.upperBoundary = 0x9f;
	          this.bytesNeeded = 3;
	          this.bytesSeen = 1;
	          this.codePoint = byte & 0xf;
	        } else if (byte >= 0xf0 && byte <= 0xf4) {
	          if (byte === 0xf0) this.lowerBoundary = 0x90;
	          else if (byte === 0xf4) this.upperBoundary = 0x8f;
	          this.bytesNeeded = 4;
	          this.bytesSeen = 1;
	          this.codePoint = byte & 0x7;
	        } else {
	          this.bytesSeen = 1;
	          result += '\ufffd';
	        }

	        continue
	      }

	      if (byte < this.lowerBoundary || byte > this.upperBoundary) {
	        result += '\ufffd';
	        i--;
	        this._reset();

	        continue
	      }

	      this.lowerBoundary = 0x80;
	      this.upperBoundary = 0xbf;

	      this.codePoint = (this.codePoint << 6) | (byte & 0x3f);
	      this.bytesSeen++;

	      if (this.bytesSeen === this.bytesNeeded) {
	        result += String.fromCodePoint(this.codePoint);
	        this._reset();
	      }
	    }

	    return result
	  }

	  flush() {
	    const result = this.bytesNeeded > 0 ? '\ufffd' : '';
	    this._reset();
	    return result
	  }

	  _reset() {
	    this.codePoint = 0;
	    this.bytesNeeded = 0;
	    this.bytesSeen = 0;
	    this.lowerBoundary = 0x80;
	    this.upperBoundary = 0xbf;
	  }
	};

	function trailingIncomplete(data, start) {
	  const len = data.byteLength;
	  if (len <= start) return 0

	  const limit = Math.max(start, len - 4);

	  let i = len - 1;
	  while (i > limit && (data[i] & 0xc0) === 0x80) i--;

	  if (i < start) return 0

	  const byte = data[i];

	  let needed;
	  if (byte <= 0x7f) return 0
	  if (byte >= 0xc2 && byte <= 0xdf) needed = 2;
	  else if (byte >= 0xe0 && byte <= 0xef) needed = 3;
	  else if (byte >= 0xf0 && byte <= 0xf4) needed = 4;
	  else return 0

	  const available = len - i;
	  return available < needed ? available : 0
	}

	function trailingBytesSeen(data) {
	  const len = data.byteLength;
	  if (len === 0) return 0

	  const last = data[len - 1];

	  if (last <= 0x7f) return 0
	  if ((last & 0xc0) !== 0x80) return 1

	  const limit = Math.max(0, len - 4);

	  let i = len - 2;
	  while (i >= limit && (data[i] & 0xc0) === 0x80) i--;

	  if (i < 0) return 1

	  const first = data[i];

	  let needed;
	  if (first >= 0xc2 && first <= 0xdf) needed = 2;
	  else if (first >= 0xe0 && first <= 0xef) needed = 3;
	  else if (first >= 0xf0 && first <= 0xf4) needed = 4;
	  else return 1

	  if (len - i !== needed) return 1

	  if (needed >= 3) {
	    const second = data[i + 1];
	    if (first === 0xe0 && second < 0xa0) return 1
	    if (first === 0xed && second > 0x9f) return 1
	    if (first === 0xf0 && second < 0x90) return 1
	    if (first === 0xf4 && second > 0x8f) return 1
	  }

	  return 0
	}
	return utf8Decoder;
}

var textDecoder;
var hasRequiredTextDecoder;

function requireTextDecoder () {
	if (hasRequiredTextDecoder) return textDecoder;
	hasRequiredTextDecoder = 1;
	const PassThroughDecoder = requirePassThroughDecoder();
	const UTF8Decoder = requireUtf8Decoder();

	textDecoder = class TextDecoder {
	  constructor(encoding = 'utf8') {
	    this.encoding = normalizeEncoding(encoding);

	    switch (this.encoding) {
	      case 'utf8':
	        this.decoder = new UTF8Decoder();
	        break
	      case 'utf16le':
	      case 'base64':
	        throw new Error('Unsupported encoding: ' + this.encoding)
	      default:
	        this.decoder = new PassThroughDecoder(this.encoding);
	    }
	  }

	  get remaining() {
	    return this.decoder.remaining
	  }

	  push(data) {
	    if (typeof data === 'string') return data
	    return this.decoder.decode(data)
	  }

	  // For Node.js compatibility
	  write(data) {
	    return this.push(data)
	  }

	  end(data) {
	    let result = '';
	    if (data) result = this.push(data);
	    result += this.decoder.flush();
	    return result
	  }
	};

	function normalizeEncoding(encoding) {
	  encoding = encoding.toLowerCase();

	  switch (encoding) {
	    case 'utf8':
	    case 'utf-8':
	      return 'utf8'
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return 'utf16le'
	    case 'latin1':
	    case 'binary':
	      return 'latin1'
	    case 'base64':
	    case 'ascii':
	    case 'hex':
	      return encoding
	    default:
	      throw new Error('Unknown encoding: ' + encoding)
	  }
	}
	return textDecoder;
}

var streamx;
var hasRequiredStreamx;

function requireStreamx () {
	if (hasRequiredStreamx) return streamx;
	hasRequiredStreamx = 1;
	const { EventEmitter } = require_default();
	const FIFO = requireFastFifo();
	const TextDecoder = requireTextDecoder();

	const StreamError = requireErrors();

	// if we do a future major, expect queue microtask to be there always, for now a bit defensive
	const qmt =
	  typeof queueMicrotask === 'undefined' ? (fn) => commonjsGlobal.process.nextTick(fn) : queueMicrotask;

	// 29 bits used total (4 from shared, 14 from read, and 11 from write)
	const MAX = (1 << 29) - 1;

	// Shared state
	const OPENING = 0b0001;
	const PREDESTROYING = 0b0010;
	const DESTROYING = 0b0100;
	const DESTROYED = 0b1000;

	const NOT_OPENING = MAX ^ OPENING;
	const NOT_PREDESTROYING = MAX ^ PREDESTROYING;

	// Read state (4 bit offset from shared state)
	const READ_ACTIVE = 0b00000000000001 << 4;
	const READ_UPDATING = 0b00000000000010 << 4;
	const READ_PRIMARY = 0b00000000000100 << 4;
	const READ_QUEUED = 0b00000000001000 << 4;
	const READ_RESUMED = 0b00000000010000 << 4;
	const READ_PIPE_DRAINED = 0b00000000100000 << 4;
	const READ_ENDING = 0b00000001000000 << 4;
	const READ_EMIT_DATA = 0b00000010000000 << 4;
	const READ_EMIT_READABLE = 0b00000100000000 << 4;
	const READ_EMITTED_READABLE = 0b00001000000000 << 4;
	const READ_DONE = 0b00010000000000 << 4;
	const READ_NEXT_TICK = 0b00100000000000 << 4;
	const READ_NEEDS_PUSH = 0b01000000000000 << 4;
	const READ_READ_AHEAD = 0b10000000000000 << 4;

	// Combined read state
	const READ_FLOWING = READ_RESUMED | READ_PIPE_DRAINED;
	const READ_ACTIVE_AND_NEEDS_PUSH = READ_ACTIVE | READ_NEEDS_PUSH;
	const READ_PRIMARY_AND_ACTIVE = READ_PRIMARY | READ_ACTIVE;
	const READ_EMIT_READABLE_AND_QUEUED = READ_EMIT_READABLE | READ_QUEUED;
	const READ_RESUMED_READ_AHEAD = READ_RESUMED | READ_READ_AHEAD;

	const READ_NOT_ACTIVE = MAX ^ READ_ACTIVE;
	const READ_NON_PRIMARY = MAX ^ READ_PRIMARY;
	const READ_NON_PRIMARY_AND_PUSHED = MAX ^ (READ_PRIMARY | READ_NEEDS_PUSH);
	const READ_PUSHED = MAX ^ READ_NEEDS_PUSH;
	const READ_PAUSED = MAX ^ READ_RESUMED;
	const READ_NOT_QUEUED = MAX ^ (READ_QUEUED | READ_EMITTED_READABLE);
	const READ_NOT_ENDING = MAX ^ READ_ENDING;
	const READ_PIPE_NOT_DRAINED = MAX ^ READ_FLOWING;
	const READ_NOT_NEXT_TICK = MAX ^ READ_NEXT_TICK;
	const READ_NOT_UPDATING = MAX ^ READ_UPDATING;
	const READ_NO_READ_AHEAD = MAX ^ READ_READ_AHEAD;
	const READ_PAUSED_NO_READ_AHEAD = MAX ^ READ_RESUMED_READ_AHEAD;

	// Write state (18 bit offset, 4 bit offset from shared state and 14 from read state)
	const WRITE_ACTIVE = 0b00000000001 << 18;
	const WRITE_UPDATING = 0b00000000010 << 18;
	const WRITE_PRIMARY = 0b00000000100 << 18;
	const WRITE_QUEUED = 0b00000001000 << 18;
	const WRITE_UNDRAINED = 0b00000010000 << 18;
	const WRITE_DONE = 0b00000100000 << 18;
	const WRITE_EMIT_DRAIN = 0b00001000000 << 18;
	const WRITE_NEXT_TICK = 0b00010000000 << 18;
	const WRITE_WRITING = 0b00100000000 << 18;
	const WRITE_FINISHING = 0b01000000000 << 18;
	const WRITE_CORKED = 0b10000000000 << 18;

	const WRITE_NOT_ACTIVE = MAX ^ (WRITE_ACTIVE | WRITE_WRITING);
	const WRITE_NON_PRIMARY = MAX ^ WRITE_PRIMARY;
	const WRITE_NOT_FINISHING = MAX ^ (WRITE_ACTIVE | WRITE_FINISHING);
	const WRITE_DRAINED = MAX ^ WRITE_UNDRAINED;
	const WRITE_NOT_QUEUED = MAX ^ WRITE_QUEUED;
	const WRITE_NOT_NEXT_TICK = MAX ^ WRITE_NEXT_TICK;
	const WRITE_NOT_UPDATING = MAX ^ WRITE_UPDATING;
	const WRITE_NOT_CORKED = MAX ^ WRITE_CORKED;

	// Combined shared state
	const ACTIVE = READ_ACTIVE | WRITE_ACTIVE;
	const NOT_ACTIVE = MAX ^ ACTIVE;
	const DONE = READ_DONE | WRITE_DONE;
	const DESTROY_STATUS = DESTROYING | DESTROYED | PREDESTROYING;
	const OPEN_STATUS = DESTROY_STATUS | OPENING;
	const AUTO_DESTROY = DESTROY_STATUS | DONE;
	const NON_PRIMARY = WRITE_NON_PRIMARY & READ_NON_PRIMARY;
	const ACTIVE_OR_TICKING = WRITE_NEXT_TICK | READ_NEXT_TICK;
	const TICKING = ACTIVE_OR_TICKING & NOT_ACTIVE;
	const IS_OPENING = OPEN_STATUS | TICKING;

	// Combined shared state and read state
	const READ_PRIMARY_STATUS = OPEN_STATUS | READ_ENDING | READ_DONE;
	const READ_STATUS = OPEN_STATUS | READ_DONE | READ_QUEUED;
	const READ_ENDING_STATUS = OPEN_STATUS | READ_ENDING | READ_QUEUED;
	const READ_READABLE_STATUS = OPEN_STATUS | READ_EMIT_READABLE | READ_QUEUED | READ_EMITTED_READABLE;
	const SHOULD_NOT_READ =
	  OPEN_STATUS | READ_ACTIVE | READ_ENDING | READ_DONE | READ_NEEDS_PUSH | READ_READ_AHEAD;
	const READ_BACKPRESSURE_STATUS = DESTROY_STATUS | READ_ENDING | READ_DONE;
	const READ_UPDATE_SYNC_STATUS = READ_UPDATING | OPEN_STATUS | READ_NEXT_TICK | READ_PRIMARY;
	const READ_NEXT_TICK_OR_OPENING = READ_NEXT_TICK | OPENING;

	// Combined write state
	const WRITE_PRIMARY_STATUS = OPEN_STATUS | WRITE_FINISHING | WRITE_DONE;
	const WRITE_QUEUED_AND_UNDRAINED = WRITE_QUEUED | WRITE_UNDRAINED;
	const WRITE_QUEUED_AND_ACTIVE = WRITE_QUEUED | WRITE_ACTIVE;
	const WRITE_DRAIN_STATUS = WRITE_QUEUED | WRITE_UNDRAINED | OPEN_STATUS | WRITE_ACTIVE;
	const WRITE_STATUS = OPEN_STATUS | WRITE_ACTIVE | WRITE_QUEUED | WRITE_CORKED;
	const WRITE_PRIMARY_AND_ACTIVE = WRITE_PRIMARY | WRITE_ACTIVE;
	const WRITE_ACTIVE_AND_WRITING = WRITE_ACTIVE | WRITE_WRITING;
	const WRITE_FINISHING_STATUS = OPEN_STATUS | WRITE_FINISHING | WRITE_QUEUED_AND_ACTIVE | WRITE_DONE;
	const WRITE_BACKPRESSURE_STATUS = WRITE_UNDRAINED | DESTROY_STATUS | WRITE_FINISHING | WRITE_DONE;
	const WRITE_UPDATE_SYNC_STATUS = WRITE_UPDATING | OPEN_STATUS | WRITE_NEXT_TICK | WRITE_PRIMARY;
	const WRITE_DROP_DATA = WRITE_FINISHING | WRITE_DONE | DESTROY_STATUS;

	const asyncIterator = Symbol.asyncIterator || Symbol('asyncIterator');

	class WritableState {
	  constructor(
	    stream,
	    { highWaterMark = 16384, map = null, mapWritable, byteLength, byteLengthWritable } = {}
	  ) {
	    this.stream = stream;
	    this.queue = new FIFO();
	    this.highWaterMark = highWaterMark;
	    this.buffered = 0;
	    this.error = null;
	    this.pipeline = null;
	    this.drains = null; // if we add more seldomly used helpers we might them into a subobject so its a single ptr
	    this.byteLength = byteLengthWritable || byteLength || defaultByteLength;
	    this.map = mapWritable || map;
	    this.afterWrite = afterWrite.bind(this);
	    this.afterUpdateNextTick = updateWriteNT.bind(this);
	  }

	  get ending() {
	    return (this.stream._duplexState & WRITE_FINISHING) !== 0
	  }

	  get ended() {
	    return (this.stream._duplexState & WRITE_DONE) !== 0
	  }

	  push(data) {
	    if ((this.stream._duplexState & WRITE_DROP_DATA) !== 0) return false
	    if (this.map !== null) data = this.map(data);

	    this.buffered += this.byteLength(data);
	    this.queue.push(data);

	    if (this.buffered < this.highWaterMark) {
	      this.stream._duplexState |= WRITE_QUEUED;
	      return true
	    }

	    this.stream._duplexState |= WRITE_QUEUED_AND_UNDRAINED;
	    return false
	  }

	  shift() {
	    const data = this.queue.shift();

	    this.buffered -= this.byteLength(data);
	    if (this.buffered === 0) this.stream._duplexState &= WRITE_NOT_QUEUED;

	    return data
	  }

	  end(data) {
	    if (typeof data === 'function') {
	      this.stream.once('finish', data);
	    } else if (data !== undefined && data !== null) {
	      this.push(data);
	    }

	    this.stream._duplexState = (this.stream._duplexState | WRITE_FINISHING) & WRITE_NON_PRIMARY;
	  }

	  autoBatch(data, cb) {
	    const buffer = [];
	    const stream = this.stream;

	    buffer.push(data);
	    while ((stream._duplexState & WRITE_STATUS) === WRITE_QUEUED_AND_ACTIVE) {
	      buffer.push(stream._writableState.shift());
	    }

	    if ((stream._duplexState & OPEN_STATUS) !== 0) return cb(null)
	    stream._writev(buffer, cb);
	  }

	  update() {
	    const stream = this.stream;

	    stream._duplexState |= WRITE_UPDATING;

	    do {
	      while ((stream._duplexState & WRITE_STATUS) === WRITE_QUEUED) {
	        const data = this.shift();
	        stream._duplexState |= WRITE_ACTIVE_AND_WRITING;
	        stream._write(data, this.afterWrite);
	      }

	      if ((stream._duplexState & WRITE_PRIMARY_AND_ACTIVE) === 0) this.updateNonPrimary();
	    } while (this.continueUpdate() === true)

	    stream._duplexState &= WRITE_NOT_UPDATING;
	  }

	  updateNonPrimary() {
	    const stream = this.stream;

	    if ((stream._duplexState & WRITE_FINISHING_STATUS) === WRITE_FINISHING) {
	      stream._duplexState = stream._duplexState | WRITE_ACTIVE;
	      stream._final(afterFinal.bind(this));
	      return
	    }

	    if ((stream._duplexState & DESTROY_STATUS) === DESTROYING) {
	      if ((stream._duplexState & ACTIVE_OR_TICKING) === 0) {
	        stream._duplexState |= ACTIVE;
	        stream._destroy(afterDestroy.bind(this));
	      }
	      return
	    }

	    if ((stream._duplexState & IS_OPENING) === OPENING) {
	      stream._duplexState = (stream._duplexState | ACTIVE) & NOT_OPENING;
	      stream._open(afterOpen.bind(this));
	    }
	  }

	  continueUpdate() {
	    if ((this.stream._duplexState & WRITE_NEXT_TICK) === 0) return false
	    this.stream._duplexState &= WRITE_NOT_NEXT_TICK;
	    return true
	  }

	  updateCallback() {
	    if ((this.stream._duplexState & WRITE_UPDATE_SYNC_STATUS) === WRITE_PRIMARY) {
	      this.update();
	    } else {
	      this.updateNextTick();
	    }
	  }

	  updateNextTick() {
	    if ((this.stream._duplexState & WRITE_NEXT_TICK) !== 0) return
	    this.stream._duplexState |= WRITE_NEXT_TICK;
	    if ((this.stream._duplexState & WRITE_UPDATING) === 0) qmt(this.afterUpdateNextTick);
	  }
	}

	class ReadableState {
	  constructor(
	    stream,
	    { highWaterMark = 16384, map = null, mapReadable, byteLength, byteLengthReadable } = {}
	  ) {
	    this.stream = stream;
	    this.queue = new FIFO();
	    this.highWaterMark = highWaterMark === 0 ? 1 : highWaterMark;
	    this.buffered = 0;
	    this.readAhead = highWaterMark > 0;
	    this.error = null;
	    this.pipeline = null;
	    this.byteLength = byteLengthReadable || byteLength || defaultByteLength;
	    this.map = mapReadable || map;
	    this.pipeTo = null;
	    this.afterRead = afterRead.bind(this);
	    this.afterUpdateNextTick = updateReadNT.bind(this);
	  }

	  get ending() {
	    return (this.stream._duplexState & READ_ENDING) !== 0
	  }

	  get ended() {
	    return (this.stream._duplexState & READ_DONE) !== 0
	  }

	  pipe(pipeTo, cb) {
	    if (this.pipeTo !== null) throw StreamError.BAD_ARGUMENT('Can only pipe to one destination')
	    if (typeof cb !== 'function') cb = null;

	    this.stream._duplexState |= READ_PIPE_DRAINED;
	    this.pipeTo = pipeTo;
	    this.pipeline = new Pipeline(this.stream, pipeTo, cb);

	    if (cb) this.stream.on('error', noop); // We already error handle this so supress crashes

	    if (isStreamx(pipeTo)) {
	      pipeTo._writableState.pipeline = this.pipeline;
	      if (cb) pipeTo.on('error', noop); // We already error handle this so supress crashes
	      pipeTo.on('finish', this.pipeline.finished.bind(this.pipeline)); // TODO: just call finished from pipeTo itself
	    } else {
	      const onerror = this.pipeline.done.bind(this.pipeline, pipeTo);
	      const onclose = this.pipeline.done.bind(this.pipeline, pipeTo, null); // onclose has a weird bool arg
	      pipeTo.on('error', onerror);
	      pipeTo.on('close', onclose);
	      pipeTo.on('finish', this.pipeline.finished.bind(this.pipeline));
	    }

	    pipeTo.on('drain', afterDrain.bind(this));
	    this.stream.emit('piping', pipeTo);
	    pipeTo.emit('pipe', this.stream);
	  }

	  push(data) {
	    const stream = this.stream;

	    if (data === null) {
	      this.highWaterMark = 0;
	      stream._duplexState = (stream._duplexState | READ_ENDING) & READ_NON_PRIMARY_AND_PUSHED;
	      return false
	    }

	    if (this.map !== null) {
	      data = this.map(data);
	      if (data === null) {
	        stream._duplexState &= READ_PUSHED;
	        return this.buffered < this.highWaterMark
	      }
	    }

	    this.buffered += this.byteLength(data);
	    this.queue.push(data);

	    stream._duplexState = (stream._duplexState | READ_QUEUED) & READ_PUSHED;

	    return this.buffered < this.highWaterMark
	  }

	  shift() {
	    const data = this.queue.shift();

	    this.buffered -= this.byteLength(data);
	    if (this.buffered === 0) {
	      this.stream._duplexState &= READ_NOT_QUEUED;
	    }

	    return data
	  }

	  unshift(data) {
	    const pending = [this.map !== null ? this.map(data) : data];
	    while (this.buffered > 0) pending.push(this.shift());

	    for (let i = 0; i < pending.length - 1; i++) {
	      const data = pending[i];
	      this.buffered += this.byteLength(data);
	      this.queue.push(data);
	    }

	    this.push(pending[pending.length - 1]);
	  }

	  read() {
	    const stream = this.stream;

	    if ((stream._duplexState & READ_STATUS) === READ_QUEUED) {
	      const data = this.shift();

	      if (this.pipeTo !== null && this.pipeTo.write(data) === false) {
	        stream._duplexState &= READ_PIPE_NOT_DRAINED;
	      }

	      if ((stream._duplexState & READ_EMIT_DATA) !== 0) {
	        stream.emit('data', data);
	      }

	      return data
	    }

	    if (this.readAhead === false) {
	      stream._duplexState |= READ_READ_AHEAD;
	      this.updateNextTick();
	    }

	    return null
	  }

	  drain() {
	    const stream = this.stream;

	    while (
	      (stream._duplexState & READ_STATUS) === READ_QUEUED &&
	      (stream._duplexState & READ_FLOWING) !== 0
	    ) {
	      const data = this.shift();

	      if (this.pipeTo !== null && this.pipeTo.write(data) === false) {
	        stream._duplexState &= READ_PIPE_NOT_DRAINED;
	      }

	      if ((stream._duplexState & READ_EMIT_DATA) !== 0) {
	        stream.emit('data', data);
	      }
	    }
	  }

	  update() {
	    const stream = this.stream;

	    stream._duplexState |= READ_UPDATING;

	    do {
	      this.drain();

	      while (
	        this.buffered < this.highWaterMark &&
	        (stream._duplexState & SHOULD_NOT_READ) === READ_READ_AHEAD
	      ) {
	        stream._duplexState |= READ_ACTIVE_AND_NEEDS_PUSH;
	        stream._read(this.afterRead);
	        this.drain();
	      }

	      if ((stream._duplexState & READ_READABLE_STATUS) === READ_EMIT_READABLE_AND_QUEUED) {
	        stream._duplexState |= READ_EMITTED_READABLE;
	        stream.emit('readable');
	      }

	      if ((stream._duplexState & READ_PRIMARY_AND_ACTIVE) === 0) {
	        this.updateNonPrimary();
	      }
	    } while (this.continueUpdate() === true)

	    stream._duplexState &= READ_NOT_UPDATING;
	  }

	  updateNonPrimary() {
	    const stream = this.stream;

	    if ((stream._duplexState & READ_ENDING_STATUS) === READ_ENDING) {
	      stream._duplexState = (stream._duplexState | READ_DONE) & READ_NOT_ENDING;
	      stream.emit('end');

	      if ((stream._duplexState & AUTO_DESTROY) === DONE) {
	        stream._duplexState |= DESTROYING;
	      }

	      if (this.pipeTo !== null) {
	        this.pipeTo.end();
	      }
	    }

	    if ((stream._duplexState & DESTROY_STATUS) === DESTROYING) {
	      if ((stream._duplexState & ACTIVE_OR_TICKING) === 0) {
	        stream._duplexState |= ACTIVE;
	        stream._destroy(afterDestroy.bind(this));
	      }
	      return
	    }

	    if ((stream._duplexState & IS_OPENING) === OPENING) {
	      stream._duplexState = (stream._duplexState | ACTIVE) & NOT_OPENING;
	      stream._open(afterOpen.bind(this));
	    }
	  }

	  continueUpdate() {
	    if ((this.stream._duplexState & READ_NEXT_TICK) === 0) return false
	    this.stream._duplexState &= READ_NOT_NEXT_TICK;
	    return true
	  }

	  updateCallback() {
	    if ((this.stream._duplexState & READ_UPDATE_SYNC_STATUS) === READ_PRIMARY) {
	      this.update();
	    } else {
	      this.updateNextTick();
	    }
	  }

	  updateNextTickIfOpen() {
	    if ((this.stream._duplexState & READ_NEXT_TICK_OR_OPENING) !== 0) return
	    this.stream._duplexState |= READ_NEXT_TICK;
	    if ((this.stream._duplexState & READ_UPDATING) === 0) qmt(this.afterUpdateNextTick);
	  }

	  updateNextTick() {
	    if ((this.stream._duplexState & READ_NEXT_TICK) !== 0) return
	    this.stream._duplexState |= READ_NEXT_TICK;
	    if ((this.stream._duplexState & READ_UPDATING) === 0) qmt(this.afterUpdateNextTick);
	  }
	}

	class TransformState {
	  constructor(stream) {
	    this.data = null;
	    this.afterTransform = afterTransform.bind(stream);
	    this.afterFinal = null;
	  }
	}

	class Pipeline {
	  constructor(src, dst, cb) {
	    this.from = src;
	    this.to = dst;
	    this.afterPipe = cb;
	    this.error = null;
	    this.pipeToFinished = false;
	  }

	  finished() {
	    this.pipeToFinished = true;
	  }

	  done(stream, err) {
	    if (err) this.error = err;

	    if (stream === this.to) {
	      this.to = null;

	      if (this.from !== null) {
	        if ((this.from._duplexState & READ_DONE) === 0 || !this.pipeToFinished) {
	          this.from.destroy(this.error || StreamError.PREMATURE_CLOSE('Writable stream closed'));
	        }
	        return
	      }
	    }

	    if (stream === this.from) {
	      this.from = null;

	      if (this.to !== null) {
	        if ((stream._duplexState & READ_DONE) === 0) {
	          this.to.destroy(this.error || StreamError.PREMATURE_CLOSE('Readable stream closed'));
	        }
	        return
	      }
	    }

	    if (this.afterPipe !== null) this.afterPipe(this.error);
	    this.to = this.from = this.afterPipe = null;
	  }
	}

	function afterDrain() {
	  this.stream._duplexState |= READ_PIPE_DRAINED;
	  this.updateCallback();
	}

	function afterFinal(err) {
	  const stream = this.stream;
	  if (err) stream.destroy(err);

	  if ((stream._duplexState & DESTROY_STATUS) === 0) {
	    stream._duplexState |= WRITE_DONE;
	    stream.emit('finish');
	  }

	  if ((stream._duplexState & AUTO_DESTROY) === DONE) {
	    stream._duplexState |= DESTROYING;
	  }

	  stream._duplexState &= WRITE_NOT_FINISHING;

	  // no need to wait the extra tick here, so we short circuit that
	  if ((stream._duplexState & WRITE_UPDATING) === 0) {
	    this.update();
	  } else {
	    this.updateNextTick();
	  }
	}

	function afterDestroy(err) {
	  const stream = this.stream;

	  if (!err && !StreamError.isStreamDestroyed(this.error)) err = this.error;
	  if (err) stream.emit('error', err);

	  stream._duplexState |= DESTROYED;
	  stream.emit('close');

	  const rs = stream._readableState;
	  const ws = stream._writableState;

	  if (rs !== null && rs.pipeline !== null) {
	    rs.pipeline.done(stream, err);
	  }

	  if (ws !== null) {
	    while (ws.drains !== null && ws.drains.length > 0) {
	      ws.drains.shift().resolve(false);
	    }

	    if (ws.pipeline !== null) {
	      ws.pipeline.done(stream, err);
	    }
	  }
	}

	function afterWrite(err) {
	  const stream = this.stream;

	  if (err) stream.destroy(err);
	  stream._duplexState &= WRITE_NOT_ACTIVE;

	  if (this.drains !== null) tickDrains(this.drains);

	  if ((stream._duplexState & WRITE_DRAIN_STATUS) === WRITE_UNDRAINED) {
	    stream._duplexState &= WRITE_DRAINED;

	    if ((stream._duplexState & WRITE_EMIT_DRAIN) === WRITE_EMIT_DRAIN) {
	      stream.emit('drain');
	    }
	  }

	  this.updateCallback();
	}

	function afterRead(err) {
	  if (err) this.stream.destroy(err);
	  this.stream._duplexState &= READ_NOT_ACTIVE;

	  if (this.readAhead === false && (this.stream._duplexState & READ_RESUMED) === 0) {
	    this.stream._duplexState &= READ_NO_READ_AHEAD;
	  }

	  this.updateCallback();
	}

	function updateReadNT() {
	  if ((this.stream._duplexState & READ_UPDATING) === 0) {
	    this.stream._duplexState &= READ_NOT_NEXT_TICK;
	    this.update();
	  }
	}

	function updateWriteNT() {
	  if ((this.stream._duplexState & WRITE_UPDATING) === 0) {
	    this.stream._duplexState &= WRITE_NOT_NEXT_TICK;
	    this.update();
	  }
	}

	function tickDrains(drains) {
	  for (let i = 0; i < drains.length; i++) {
	    // drains.writes are monotonic, so if one is 0 its always the first one
	    if (--drains[i].writes === 0) {
	      drains.shift().resolve(true);
	      i--;
	    }
	  }
	}

	function afterOpen(err) {
	  const stream = this.stream;

	  if (err) stream.destroy(err);

	  if ((stream._duplexState & DESTROYING) === 0) {
	    if ((stream._duplexState & READ_PRIMARY_STATUS) === 0) {
	      stream._duplexState |= READ_PRIMARY;
	    }

	    if ((stream._duplexState & WRITE_PRIMARY_STATUS) === 0) {
	      stream._duplexState |= WRITE_PRIMARY;
	    }

	    stream.emit('open');
	  }

	  stream._duplexState &= NOT_ACTIVE;

	  if (stream._writableState !== null) {
	    stream._writableState.updateCallback();
	  }

	  if (stream._readableState !== null) {
	    stream._readableState.updateCallback();
	  }
	}

	function afterTransform(err, data) {
	  if (data !== undefined && data !== null) this.push(data);
	  this._writableState.afterWrite(err);
	}

	function newListener(name) {
	  if (this._readableState !== null) {
	    if (name === 'data') {
	      this._duplexState |= READ_EMIT_DATA | READ_RESUMED_READ_AHEAD;
	      this._readableState.updateNextTick();
	    }
	    if (name === 'readable') {
	      this._duplexState |= READ_EMIT_READABLE;
	      this._readableState.updateNextTick();
	    }
	  }

	  if (this._writableState !== null) {
	    if (name === 'drain') {
	      this._duplexState |= WRITE_EMIT_DRAIN;
	      this._writableState.updateNextTick();
	    }
	  }
	}

	class Stream extends EventEmitter {
	  constructor(opts) {
	    super();

	    this._duplexState = 0;
	    this._readableState = null;
	    this._writableState = null;

	    if (opts) {
	      if (opts.open) this._open = opts.open;
	      if (opts.destroy) this._destroy = opts.destroy;
	      if (opts.predestroy) this._predestroy = opts.predestroy;
	      if (opts.signal) opts.signal.addEventListener('abort', abort.bind(this));
	    }

	    this.on('newListener', newListener);
	  }

	  _open(cb) {
	    cb(null);
	  }

	  _destroy(cb) {
	    cb(null);
	  }

	  _predestroy() {
	    // does nothing
	  }

	  get readable() {
	    return this._readableState !== null ? true : undefined
	  }

	  get writable() {
	    return this._writableState !== null ? true : undefined
	  }

	  get destroyed() {
	    return (this._duplexState & DESTROYED) !== 0
	  }

	  get destroying() {
	    return (this._duplexState & DESTROY_STATUS) !== 0
	  }

	  destroy(err) {
	    if ((this._duplexState & DESTROY_STATUS) === 0) {
	      if (!err) err = StreamError.STREAM_DESTROYED();
	      this._duplexState = (this._duplexState | DESTROYING) & NON_PRIMARY;

	      if (this._readableState !== null) {
	        this._readableState.highWaterMark = 0;
	        this._readableState.error = err;
	      }

	      if (this._writableState !== null) {
	        this._writableState.highWaterMark = 0;
	        this._writableState.error = err;
	      }

	      this._duplexState |= PREDESTROYING;
	      this._predestroy();
	      this._duplexState &= NOT_PREDESTROYING;

	      if (this._readableState !== null) {
	        this._readableState.updateNextTick();
	      }

	      if (this._writableState !== null) {
	        this._writableState.updateNextTick();
	      }
	    }
	  }
	}

	class Readable extends Stream {
	  constructor(opts) {
	    super(opts);

	    this._duplexState |= OPENING | WRITE_DONE | READ_READ_AHEAD;
	    this._readableState = new ReadableState(this, opts);

	    if (opts) {
	      if (this._readableState.readAhead === false) this._duplexState &= READ_NO_READ_AHEAD;
	      if (opts.read) this._read = opts.read;
	      if (opts.eagerOpen) this._readableState.updateNextTick();
	      if (opts.encoding) this.setEncoding(opts.encoding);
	    }
	  }

	  static deferred(fn, opts) {
	    const out = new PassThrough(opts);

	    fn()
	      .then((src) => {
	        if (src === null) return out.end()
	        if (out.destroying) return
	        pipeline(src, out, noop);
	      })
	      .catch((err) => out.destroy(err));

	    return out
	  }

	  setEncoding(encoding) {
	    const dec = new TextDecoder(encoding);
	    const map = this._readableState.map || echo;
	    this._readableState.map = mapOrSkip;
	    return this

	    function mapOrSkip(data) {
	      const next = dec.push(data);
	      return next === '' && (data.byteLength !== 0 || dec.remaining > 0) ? null : map(next)
	    }
	  }

	  _read(cb) {
	    cb(null);
	  }

	  pipe(dest, cb) {
	    this._readableState.updateNextTick();
	    this._readableState.pipe(dest, cb);
	    return dest
	  }

	  read() {
	    this._readableState.updateNextTick();
	    return this._readableState.read()
	  }

	  push(data) {
	    this._readableState.updateNextTickIfOpen();
	    return this._readableState.push(data)
	  }

	  unshift(data) {
	    this._readableState.updateNextTickIfOpen();
	    return this._readableState.unshift(data)
	  }

	  resume() {
	    this._duplexState |= READ_RESUMED_READ_AHEAD;
	    this._readableState.updateNextTick();
	    return this
	  }

	  pause() {
	    this._duplexState &=
	      this._readableState.readAhead === false ? READ_PAUSED_NO_READ_AHEAD : READ_PAUSED;
	    return this
	  }

	  static _fromAsyncIterator(ite, opts) {
	    let destroy;

	    const rs = new Readable({
	      ...opts,
	      read(cb) {
	        ite.next().then(push).then(cb.bind(null, null)).catch(cb);
	      },
	      predestroy() {
	        destroy = ite.return();
	      },
	      destroy(cb) {
	        if (!destroy) return cb(null)
	        destroy.then(cb.bind(null, null)).catch(cb);
	      }
	    });

	    return rs

	    function push(data) {
	      if (data.done) rs.push(null);
	      else rs.push(data.value);
	    }
	  }

	  static from(data, opts) {
	    if (isReadStreamx(data)) return data
	    if (data[asyncIterator]) return this._fromAsyncIterator(data[asyncIterator](), opts)
	    if (!Array.isArray(data)) data = data === undefined ? [] : [data];

	    let i = 0;
	    return new Readable({
	      ...opts,
	      read(cb) {
	        this.push(i === data.length ? null : data[i++]);
	        cb(null);
	      }
	    })
	  }

	  static isBackpressured(rs) {
	    return (
	      (rs._duplexState & READ_BACKPRESSURE_STATUS) !== 0 ||
	      rs._readableState.buffered >= rs._readableState.highWaterMark
	    )
	  }

	  static isPaused(rs) {
	    return (rs._duplexState & READ_RESUMED) === 0
	  }

	  [asyncIterator]() {
	    const stream = this;

	    let error = null;
	    let promiseResolve = null;
	    let promiseReject = null;

	    this.on('error', (err) => {
	      error = err;
	    });
	    this.on('readable', onreadable);
	    this.on('close', onclose);

	    return {
	      [asyncIterator]() {
	        return this
	      },
	      next() {
	        return new Promise(function (resolve, reject) {
	          promiseResolve = resolve;
	          promiseReject = reject;
	          const data = stream.read();
	          if (data !== null) ondata(data);
	          else if ((stream._duplexState & DESTROYED) !== 0) ondata(null);
	        })
	      },
	      return() {
	        return destroy(null)
	      },
	      throw(err) {
	        return destroy(err)
	      }
	    }

	    function onreadable() {
	      if (promiseResolve !== null) ondata(stream.read());
	    }

	    function onclose() {
	      if (promiseResolve !== null) ondata(null);
	    }

	    function ondata(data) {
	      if (promiseReject === null) return
	      if (error) {
	        promiseReject(error);
	      } else if (data === null && (stream._duplexState & READ_DONE) === 0) {
	        promiseReject(StreamError.STREAM_DESTROYED());
	      } else {
	        promiseResolve({ value: data, done: data === null });
	      }
	      promiseReject = promiseResolve = null;
	    }

	    function destroy(err) {
	      stream.destroy(err);
	      return new Promise((resolve, reject) => {
	        if (stream._duplexState & DESTROYED) return resolve({ value: undefined, done: true })
	        stream.once('close', function () {
	          if (err) reject(err);
	          else resolve({ value: undefined, done: true });
	        });
	      })
	    }
	  }
	}

	class Writable extends Stream {
	  constructor(opts) {
	    super(opts);

	    this._duplexState |= OPENING | READ_DONE;
	    this._writableState = new WritableState(this, opts);

	    if (opts) {
	      if (opts.writev) this._writev = opts.writev;
	      if (opts.write) this._write = opts.write;
	      if (opts.final) this._final = opts.final;
	      if (opts.eagerOpen) this._writableState.updateNextTick();
	    }
	  }

	  cork() {
	    this._duplexState |= WRITE_CORKED;
	  }

	  uncork() {
	    this._duplexState &= WRITE_NOT_CORKED;
	    this._writableState.updateNextTick();
	  }

	  _writev(batch, cb) {
	    cb(null);
	  }

	  _write(data, cb) {
	    this._writableState.autoBatch(data, cb);
	  }

	  _final(cb) {
	    cb(null);
	  }

	  static isBackpressured(ws) {
	    return (ws._duplexState & WRITE_BACKPRESSURE_STATUS) !== 0
	  }

	  static drained(ws) {
	    if (ws.destroyed) return Promise.resolve(false)

	    const state = ws._writableState;
	    const pending = isWritev(ws) ? Math.min(1, state.queue.length) : state.queue.length;
	    const writes = pending + (ws._duplexState & WRITE_WRITING ? 1 : 0);
	    if (writes === 0) return Promise.resolve(true)

	    if (state.drains === null) state.drains = [];
	    return new Promise((resolve) => {
	      state.drains.push({ writes, resolve });
	    })
	  }

	  write(data) {
	    this._writableState.updateNextTick();
	    return this._writableState.push(data)
	  }

	  end(data) {
	    this._writableState.updateNextTick();
	    this._writableState.end(data);
	    return this
	  }
	}

	class Duplex extends Readable {
	  // and Writable
	  constructor(opts) {
	    super(opts);

	    this._duplexState = OPENING | (this._duplexState & READ_READ_AHEAD);
	    this._writableState = new WritableState(this, opts);

	    if (opts) {
	      if (opts.writev) this._writev = opts.writev;
	      if (opts.write) this._write = opts.write;
	      if (opts.final) this._final = opts.final;
	    }
	  }

	  cork() {
	    this._duplexState |= WRITE_CORKED;
	  }

	  uncork() {
	    this._duplexState &= WRITE_NOT_CORKED;
	    this._writableState.updateNextTick();
	  }

	  _writev(batch, cb) {
	    cb(null);
	  }

	  _write(data, cb) {
	    this._writableState.autoBatch(data, cb);
	  }

	  _final(cb) {
	    cb(null);
	  }

	  write(data) {
	    this._writableState.updateNextTick();
	    return this._writableState.push(data)
	  }

	  end(data) {
	    this._writableState.updateNextTick();
	    this._writableState.end(data);
	    return this
	  }
	}

	class Transform extends Duplex {
	  constructor(opts) {
	    super(opts);
	    this._transformState = new TransformState(this);

	    if (opts) {
	      if (opts.transform) this._transform = opts.transform;
	      if (opts.flush) this._flush = opts.flush;
	    }
	  }

	  _write(data, cb) {
	    if (this._readableState.buffered >= this._readableState.highWaterMark) {
	      this._transformState.data = data;
	    } else {
	      this._transform(data, this._transformState.afterTransform);
	    }
	  }

	  _read(cb) {
	    if (this._transformState.data !== null) {
	      const data = this._transformState.data;
	      this._transformState.data = null;
	      cb(null);
	      this._transform(data, this._transformState.afterTransform);
	    } else {
	      cb(null);
	    }
	  }

	  destroy(err) {
	    super.destroy(err);
	    if (this._transformState.data !== null) {
	      this._transformState.data = null;
	      this._transformState.afterTransform();
	    }
	  }

	  _transform(data, cb) {
	    cb(null, data);
	  }

	  _flush(cb) {
	    cb(null);
	  }

	  _final(cb) {
	    this._transformState.afterFinal = cb;
	    this._flush(transformAfterFlush.bind(this));
	  }
	}

	class PassThrough extends Transform {}

	function transformAfterFlush(err, data) {
	  const cb = this._transformState.afterFinal;
	  if (err) return cb(err)

	  if (data !== null && data !== undefined) this.push(data);
	  this.push(null);
	  cb(null);
	}

	function pipelinePromise(...streams) {
	  return new Promise((resolve, reject) => {
	    return pipeline(...streams, (err) => {
	      if (err) return reject(err)
	      resolve();
	    })
	  })
	}

	function pipeline(stream, ...streams) {
	  const all = Array.isArray(stream) ? [...stream, ...streams] : [stream, ...streams];
	  const done = all.length && typeof all[all.length - 1] === 'function' ? all.pop() : null;

	  if (all.length < 2) throw StreamError.BAD_ARGUMENT('Pipeline requires at least 2 streams')

	  let src = all[0];
	  let dest = null;
	  let error = null;

	  for (let i = 1; i < all.length; i++) {
	    dest = all[i];

	    if (isStreamx(src)) {
	      src.pipe(dest, onerror);
	    } else {
	      errorHandle(src, true, i > 1, onerror);
	      src.pipe(dest);
	    }

	    src = dest;
	  }

	  if (done) {
	    let fin = false;

	    const autoDestroy =
	      isStreamx(dest) || !!(dest._writableState && dest._writableState.autoDestroy);

	    dest.on('error', (err) => {
	      if (error === null) error = err;
	    });

	    dest.on('finish', () => {
	      fin = true;
	      if (!autoDestroy) done(error);
	    });

	    if (autoDestroy) {
	      dest.on('close', () => done(error || (fin ? null : StreamError.PREMATURE_CLOSE())));
	    }
	  }

	  return dest

	  function errorHandle(s, rd, wr, onerror) {
	    s.on('error', onerror);
	    s.on('close', onclose);

	    function onclose() {
	      if (s._readableState && !s._readableState.ended) {
	        return onerror(StreamError.PREMATURE_CLOSE())
	      }
	      if (wr && s._writableState && !s._writableState.ended) {
	        return onerror(StreamError.PREMATURE_CLOSE())
	      }
	    }
	  }

	  function onerror(err) {
	    if (!err || error) return
	    error = err;

	    for (const s of all) {
	      s.destroy(err);
	    }
	  }
	}

	function echo(s) {
	  return s
	}

	function isStream(stream) {
	  return !!stream._readableState || !!stream._writableState
	}

	function isStreamx(stream) {
	  return typeof stream._duplexState === 'number' && isStream(stream)
	}

	function isEnding(stream) {
	  return !!stream._readableState && stream._readableState.ending
	}

	function isEnded(stream) {
	  return !!stream._readableState && stream._readableState.ended
	}

	function isFinishing(stream) {
	  return !!stream._writableState && stream._writableState.ending
	}

	function isFinished(stream) {
	  return !!stream._writableState && stream._writableState.ended
	}

	function getStreamError(stream, opts = {}) {
	  const err =
	    (stream._readableState && stream._readableState.error) ||
	    (stream._writableState && stream._writableState.error);

	  // avoid implicit errors by default
	  return !opts.all && StreamError.isStreamDestroyed(err) ? null : err
	}

	function isReadStreamx(stream) {
	  return isStreamx(stream) && stream.readable
	}

	function isDisturbed(stream) {
	  return (
	    (stream._duplexState & OPENING) !== OPENING ||
	    (stream._duplexState & DESTROYING) === DESTROYING ||
	    (stream._duplexState & ACTIVE_OR_TICKING) !== 0
	  )
	}

	function isTypedArray(data) {
	  return typeof data === 'object' && data !== null && typeof data.byteLength === 'number'
	}

	function defaultByteLength(data) {
	  return isTypedArray(data) ? data.byteLength : 1024
	}

	function noop() {}

	function abort() {
	  this.destroy(StreamError.ABORTED());
	}

	function isWritev(s) {
	  return s._writev !== Writable.prototype._writev && s._writev !== Duplex.prototype._writev
	}

	streamx = {
	  pipeline,
	  pipelinePromise,
	  isStream,
	  isStreamx,
	  isEnding,
	  isEnded,
	  isFinishing,
	  isFinished,
	  isDisturbed,
	  getStreamError,
	  Stream,
	  Writable,
	  Readable,
	  Duplex,
	  Transform,
	  // Export PassThrough for compatibility with Node.js core's stream module
	  PassThrough
	};
	return streamx;
}

var headers = {};

export { headers as h, requireStreamx as r };
