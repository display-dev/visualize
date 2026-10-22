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

const chunk007 = require('./chunk-007.cjs');
const chunk006 = require('./chunk-006.cjs');
require('./chunk-008.cjs');
const chunk003 = require('./chunk-003.cjs');
const chunk000 = require('./chunk-000.cjs');
const chunk009 = require('./chunk-009.cjs');
const chunk002 = require('./chunk-002.cjs');

/**
 * Converts array-like (numerical indicies and `length` property) structures to actual, real arrays
 * @param	{Mixed} thing Array-like thing to convert
 * @return {Array}
 */
function toArray(thing) {
  return Array.prototype.slice.call(thing);
}

/* eslint no-script-url:0 */
/**
 * Check if a string contains mostly numbers
 */
function isMostlyNumbers(str = '') {
  return (
    str.length !== 0 && (str.match(/[0-9]/g) || '').length >= str.length / 2
  );
}

/**
 * Spit a string into an array with two pieces, at a given index
 * @param String	string to split
 * @param Number	index at which to split
 * @return Array
 */
function splitString(str, splitIndex) {
  return [str.substring(0, splitIndex), str.substring(splitIndex)];
}

function trimRight(str) {
  return str.replace(/\s+$/, '');
}

/**
 * Take a relative or absolute URL and pull it into it's indivisual pieces
 *
 * @param url (string)
 * @return urlPieces
 *	 .protocol	The protocol used, e.g. 'https://'
 *	 .domain		Domain name including sub domains and TLD, e.g. 'docs.deque.com'
 *	 .port			The port number, e.g. ':8080'
 *	 .path			Path after the domain, e.g. '/home.html'
 *	 .query		 Query string, e.g. '?user=admin&password=pass'
 *	 .hash			Hash / internal reference, e.g. '#footer'
 */
function uriParser(url) {
  const original = url;
  let protocol = '',
    domain = '',
    port = '',
    path = '',
    query = '',
    hash = '';
  if (url.includes('#')) {
    [url, hash] = splitString(url, url.indexOf('#'));
  }

  if (url.includes('?')) {
    [url, query] = splitString(url, url.indexOf('?'));
  }

  if (url.includes('://')) {
    [protocol, url] = url.split('://');
    [domain, url] = splitString(url, url.indexOf('/'));
  } else if (url.substr(0, 2) === '//') {
    url = url.substr(2);
    [domain, url] = splitString(url, url.indexOf('/'));
  }

  if (domain.substr(0, 4) === 'www.') {
    domain = domain.substr(4);
  }

  if (domain && domain.includes(':')) {
    [domain, port] = splitString(domain, domain.indexOf(':'));
  }

  path = url; // Whatever is left, must be the path
  return { original, protocol, domain, port, path, query, hash };
}

/**
 * Try to, at the end of the URI, find a string that a user can identify the URI by
 *
 * @param uri			 The URI to use
 * @param options
 *	 .currentDomain	The current domain name (optional)
 *	 .maxLength			Max length of the returned string (default: 25)
 * @return string	 A portion at the end of the uri, no longer than maxLength
 */
function getFriendlyUriEnd(uri = '', options = {}) {
  if (
    // Skip certain URIs:
    uri.length <= 1 || // very short
    uri.substr(0, 5) === 'data:' || // data URIs are unreadable
    uri.substr(0, 11) === 'javascript:' || // JS isn't a URL
    uri.includes('?') // query strings aren't very readable either
  ) {
    return;
  }

  const { currentDomain, maxLength = 25 } = options;
  const { path, domain, hash } = uriParser(uri);
  // Split the path at the last / that has text after it
  const pathEnd = path.substr(
    path.substr(0, path.length - 2).lastIndexOf('/') + 1
  );

  if (hash) {
    if (pathEnd && (pathEnd + hash).length <= maxLength) {
      return trimRight(pathEnd + hash);
    } else if (
      pathEnd.length < 2 &&
      hash.length > 2 &&
      hash.length <= maxLength
    ) {
      return trimRight(hash);
    } else {
      return;
    }
  } else if (domain && domain.length < maxLength && path.length <= 1) {
    // '' or '/'
    return trimRight(domain + path);
  }

  // See if the domain should be returned
  if (
    path === '/' + pathEnd &&
    domain &&
    currentDomain &&
    domain !== currentDomain &&
    (domain + path).length <= maxLength
  ) {
    return trimRight(domain + path);
  }

  const lastDotIndex = pathEnd.lastIndexOf('.');
  if (
    // Exclude very short or very long string
    (lastDotIndex === -1 || lastDotIndex > 1) &&
    (lastDotIndex !== -1 || pathEnd.length > 2) &&
    pathEnd.length <= maxLength &&
    // Exclude index files
    !pathEnd.match(/index(\.[a-zA-Z]{2-4})?/) &&
    // Exclude files that are likely to be database IDs
    !isMostlyNumbers(pathEnd)
  ) {
    return trimRight(pathEnd);
  }
}

/**
 * Polyfill for Element#matches
 * @param {HTMLElement} node The element to test
 * @param {String} selector The selector to test element against
 * @return {Boolean}
 */
const matchesSelector = (() => {
  let method;

  function getMethod(node) {
    const candidates = [
      'matches',
      'matchesSelector',
      'mozMatchesSelector',
      'webkitMatchesSelector',
      'msMatchesSelector'
    ];
    const length = candidates.length;
    let index, candidate;

    for (index = 0; index < length; index++) {
      candidate = candidates[index];
      if (node[candidate]) {
        return candidate;
      }
    }
  }

  return (node, selector) => {
    if (!method || !node[method]) {
      method = getMethod(node);
    }

    if (node[method]) {
      return node[method](selector);
    }

    return false;
  };
})();

const emojiRegexText = () => {
	// https://mths.be/emoji
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

// prevent striping newline characters from strings (e.g. failure
// summaries). value must be synced with build/configure.js
chunk000.doT.templateSettings.strip = false;

const imports = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ArrayFrom: chunk002.ArrayFrom,
  Colorjs: chunk009.Color,
  CssSelectorParser: chunk003.libExports.CssSelectorParser,
  doT: chunk000.doT,
  emojiRegexText,
  memoize: chunk006.memoize
}, Symbol.toStringTag, { value: 'Module' }));

// FYI: memoize does not always play nice with esbuild
// and sometimes is built out of order.
// See: https://github.com/evanw/esbuild/issues/1433
//
// To get around this, you may need to import this
// file directly in the file you want to memoize.
//
// For example:
// import memoize from '../../core/utils/memoize';
// vs
// import memoize from '../../core/utils';

/**
 * Memoize a function.
 * @method memoize
 * @memberof axe.utils
 * @param {Function} fn Function to memoize
 * @return {Function}
 */
// TODO: es-modules._memoziedFns
chunk007.axe._memoizedFns = [];
function memoizeImplementation(fn) {
  // keep track of each function that is memoized so it can be cleared at
  // the end of a run. each memoized function has its own cache, so there is
  // no method to clear all memoized caches. instead, we have to clear each
  // individual memoized function ourselves.
  const memoized = chunk006.memoize(fn);
  chunk007.axe._memoizedFns.push(memoized);
  return memoized;
}

/**
 * Determines if a document node is XHTML
 * @method isXHTML
 * @memberof axe.utils
 * @param {Node} doc a document node
 * @return {Boolean}
 */
const isXHTML = memoizeImplementation(doc => {
  if (!doc?.createElement) {
    return false;
  }
  return doc.createElement('A').localName === 'A';
});

const ignoredAttributes = [
  'class',
  'style',
  'id',
  'selected',
  'checked',
  'disabled',
  'tabindex',
  'aria-checked',
  'aria-selected',
  'aria-invalid',
  'aria-activedescendant',
  'aria-busy',
  'aria-disabled',
  'aria-expanded',
  'aria-grabbed',
  'aria-pressed',
  'aria-valuenow',
  'xmlns'
];

const MAXATTRIBUTELENGTH = 31;
const attrCharsRegex = /([\\"])/g;
const newlineChars = /(\r\n|\r|\n)/g;

/**
 * Escape an attribute selector string.
 * @param {String} str
 * @return {String}
 */
function escapeAttribute(str) {
  return (
    str
      // @see https://www.py4u.net/discuss/286669
      .replace(attrCharsRegex, '\\$1')
      // @see https://stackoverflow.com/a/20354013/2124254
      .replace(newlineChars, '\\a ')
  );
}

/**
 * get the attribute name and value as a string
 * @param {Element} node		The element that has the attribute
 * @param {Attribute} at		The attribute
 * @return {String}
 */
function getAttributeNameValue(node, at) {
  const name = at.name;
  let atnv;

  if (name.indexOf('href') !== -1 || name.indexOf('src') !== -1) {
    const friendly = getFriendlyUriEnd(node.getAttribute(name));
    if (friendly) {
      atnv = chunk007.escapeSelector(at.name) + '$="' + escapeAttribute(friendly) + '"';
    } else {
      atnv =
        chunk007.escapeSelector(at.name) +
        '="' +
        escapeAttribute(node.getAttribute(name)) +
        '"';
    }
  } else {
    atnv = chunk007.escapeSelector(name) + '="' + escapeAttribute(at.value) + '"';
  }
  return atnv;
}

function countSort(a, b) {
  return a.count < b.count ? -1 : a.count === b.count ? 0 : 1;
}

/**
 * Filter the attributes
 * @param {Attribute}		The potential attribute
 * @return {Boolean}		 Whether to include or exclude
 */
function filterAttributes(at) {
  return (
    !ignoredAttributes.includes(at.name) &&
    at.name.indexOf(':') === -1 &&
    (!at.value || at.value.length < MAXATTRIBUTELENGTH)
  );
}

/**
 * Calculate the statistics for the classes, attributes and tags on the page, using
 * the virtual DOM tree
 * @param {Object} domTree		The root node of the virtual DOM tree
 * @returns {Object}					The statistics consisting of three maps, one for classes,
 *														one for tags and one for attributes. The map values are
 *														the counts for how many elements with that feature exist
 */
function getSelectorData(domTree) {
  // Initialize the return structure with the three maps
  const data = {
    classes: {},
    tags: {},
    attributes: {}
  };

  domTree = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = domTree.slice();
  const stack = [];
  while (currentLevel.length) {
    const current = currentLevel.pop();
    const node = current.actualNode;

    if (!!node.querySelectorAll) {
      // ignore #text nodes

      // count the tag
      const tag = node.nodeName;
      if (data.tags[tag]) {
        data.tags[tag]++;
      } else {
        data.tags[tag] = 1;
      }

      // count all the classes
      if (node.classList) {
        Array.from(node.classList).forEach(cl => {
          const ind = chunk007.escapeSelector(cl);
          if (data.classes[ind]) {
            data.classes[ind]++;
          } else {
            data.classes[ind] = 1;
          }
        });
      }

      // count all the filtered attributes
      if (node.hasAttributes()) {
        Array.from(chunk007.getNodeAttributes(node))
          .filter(filterAttributes)
          .forEach(at => {
            const atnv = getAttributeNameValue(node, at);
            if (atnv) {
              if (data.attributes[atnv]) {
                data.attributes[atnv]++;
              } else {
                data.attributes[atnv] = 1;
              }
            }
          });
      }
    }
    if (current.children.length) {
      // "recurse"
      stack.push(currentLevel);
      currentLevel = current.children.slice();
    }
    while (!currentLevel.length && stack.length) {
      currentLevel = stack.pop();
    }
  }
  return data;
}

/**
 * Given a node and the statistics on class frequency on the page,
 * return all its uncommon class data sorted in order of decreasing uniqueness
 * @param {Element} node			The node
 * @param {Object} classData	The map of classes to counts
 * @return {Array}						The sorted array of uncommon class data
 */
function uncommonClasses(node, selectorData) {
  // eslint no-loop-func:false
  const retVal = [];
  const classData = selectorData.classes;
  const tagData = selectorData.tags;

  if (node.classList) {
    Array.from(node.classList).forEach(cl => {
      const ind = chunk007.escapeSelector(cl);
      if (classData[ind] < tagData[node.nodeName]) {
        retVal.push({
          name: ind,
          count: classData[ind],
          species: 'class'
        });
      }
    });
  }
  return retVal.sort(countSort);
}

/**
 * Given an element and a selector that finds that element (but possibly other sibling elements)
 * return the :nth-child(n) pseudo selector that uniquely finds the node within its siblings
 * @param {Element} elm			 The Element
 * @param {String} selector	 The selector
 * @return {String}					 The nth-child selector
 */
function getNthChildString(elm, selector) {
  const siblings =
    (elm.parentNode && Array.from(elm.parentNode.children || '')) || [];
  const hasMatchingSiblings = siblings.find(
    sibling => sibling !== elm && matchesSelector(sibling, selector)
  );
  if (hasMatchingSiblings) {
    const nthChild = 1 + siblings.indexOf(elm);
    return ':nth-child(' + nthChild + ')';
  } else {
    return '';
  }
}

/**
 * Get ID selector
 */
function getElmId(elm) {
  if (!elm.getAttribute('id')) {
    return;
  }
  const doc = (elm.getRootNode && elm.getRootNode()) || document;
  const id = '#' + chunk007.escapeSelector(elm.getAttribute('id') || '');
  if (
    // Don't include youtube's uid values, they change	on reload
    !id.match(/player_uid_/) &&
    // Don't include IDs that occur more then once on the page
    doc.querySelectorAll(id).length === 1
  ) {
    return id;
  }
}

/**
 * Return the base CSS selector for a given element
 * @param	{HTMLElement} elm				 The element to get the selector for
 * @return {String|Array<String>}	Base CSS selector for the node
 */
function getBaseSelector(elm) {
  const xhtml = isXHTML(document);
  return chunk007.escapeSelector(xhtml ? elm.localName : elm.nodeName.toLowerCase());
}

/**
 * Given a node and the statistics on attribute frequency on the page,
 * return all its uncommon attribute data sorted in order of decreasing uniqueness
 * @param {Element} node			The node
 * @param {Object} attData		The map of attributes to counts
 * @return {Array}						The sorted array of uncommon attribute data
 */
function uncommonAttributes(node, selectorData) {
  const retVal = [];
  const attData = selectorData.attributes;
  const tagData = selectorData.tags;

  if (node.hasAttributes()) {
    Array.from(chunk007.getNodeAttributes(node))
      .filter(filterAttributes)
      .forEach(at => {
        const atnv = getAttributeNameValue(node, at);

        if (atnv && attData[atnv] < tagData[node.nodeName]) {
          retVal.push({
            name: atnv,
            count: attData[atnv],
            species: 'attribute'
          });
        }
      });
  }
  return retVal.sort(countSort);
}

/**
 * generates a selector fragment for an element based on the statistics of the page in
 * which the element exists. This function takes into account the fact that selectors that
 * use classes and tags are much faster than universal selectors. It also tries to use a
 * unique class selector before a unique attribute selector (with the tag), followed by
 * a selector made up of the three least common features statistically. A feature will
 * also only be used if it is less common than the tag of the element itself.
 *
 * @param {Element} elm			The element for which to generate a selector
 * @param {Object} options	 Options for how to generate the selector
 * @param {RootNode} doc		 The root node of the document or document fragment
 * @returns {String}				 The selector
 */

function getThreeLeastCommonFeatures(elm, selectorData) {
  let selector = '';
  let features;
  const clss = uncommonClasses(elm, selectorData);
  const atts = uncommonAttributes(elm, selectorData);

  if (clss.length && clss[0].count === 1) {
    // only use the unique class
    features = [clss[0]];
  } else if (atts.length && atts[0].count === 1) {
    // only use the unique attribute value
    features = [atts[0]];
    // if no class, add the tag
    selector = getBaseSelector(elm);
  } else {
    features = clss.concat(atts);
    // sort by least common
    features.sort(countSort);

    // select three least common features
    features = features.slice(0, 3);

    // if no class, add the tag
    if (
      !features.some(feat => {
        return feat.species === 'class';
      })
    ) {
      // has no class
      selector = getBaseSelector(elm);
    } else {
      // put the classes at the front of the selector
      features.sort((a, b) => {
        return a.species !== b.species && a.species === 'class'
          ? -1
          : a.species === b.species
            ? 0
            : 1;
      });
    }
  }

  // construct the return value
  return (selector += features.reduce((val, feat) => {
    /*eslint indent: 0*/
    switch (feat.species) {
      case 'class':
        return val + '.' + feat.name;
      case 'attribute':
        return val + '[' + feat.name + ']';
    }
    return val; // should never happen
  }, ''));
}

/**
 * generates a single selector for an element
 * @param {Element} elm			The element for which to generate a selector
 * @param {Object} options	 Options for how to generate the selector
 * @param {RootNode} doc		 The root node of the document or document fragment
 * @returns {String}				 The selector
 */
function generateSelector(elm, options, doc) {
  /*eslint no-loop-func:0*/
  // TODO: es-modules_selectorData
  if (!chunk007.axe._selectorData) {
    throw new Error('Expect axe._selectorData to be set up');
  }
  const { toRoot = false } = options;
  let selector;
  let similar;

  /**
   * Try to find a unique selector by filtering out all the clashing
   * nodes by adding ancestor selectors iteratively.
   * This loop is much faster than recursing and using querySelectorAll
   */
  do {
    let features = getElmId(elm);
    if (!features) {
      features = getThreeLeastCommonFeatures(elm, chunk007.axe._selectorData);
      features += getNthChildString(elm, features);
    }
    if (selector) {
      selector = features + ' > ' + selector;
    } else {
      selector = features;
    }
    // If there are too many similar element running QSA again is faster
    if (!similar || similar.length > chunk007.constants.selectorSimilarFilterLimit) {
      similar = findSimilar(doc, selector);
    } else {
      similar = similar.filter(item => {
        return matchesSelector(item, selector);
      });
    }
    elm = elm.parentElement;
  } while ((similar.length > 1 || toRoot) && elm && elm.nodeType !== 11);

  if (similar.length === 1) {
    return selector;
  } else if (selector.indexOf(' > ') !== -1) {
    // For the odd case that document doesn't have a unique selector
    return ':root' + selector.substring(selector.indexOf(' > '));
  }
  return ':root';
}

/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getSelector(elm, options) {
  return chunk007.getShadowSelector(generateSelector, elm, options);
}

// Axe can call getSelector more than once for the same element because
// the same element can end up on multiple DqElements.
const getSelector$1 = memoizeImplementation(getSelector);

// Similar elements create similar selectors. If there are lots of similar elements on the page,
// axe ends up needing to run that same selector many times. We can memoize for a huge perf boost.
const findSimilar = memoizeImplementation((doc, selector) =>
  Array.from(doc.querySelectorAll(selector))
);

function getXPathArray(node, path) {
  let sibling, count;
  // Gets an XPath for an element which describes its hierarchical location.
  if (!node) {
    return [];
  }
  if (!path && node.nodeType === 9) {
    // special case for when we are called and give the document itself as the starting node
    path = [
      {
        str: 'html'
      }
    ];
    return path;
  }
  path = path || [];
  if (node.parentNode && node.parentNode !== node) {
    path = getXPathArray(node.parentNode, path);
  }

  if (node.previousSibling) {
    count = 1;
    sibling = node.previousSibling;
    do {
      if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
        count++;
      }
      sibling = sibling.previousSibling;
    } while (sibling);
    if (count === 1) {
      count = null;
    }
  } else if (node.nextSibling) {
    sibling = node.nextSibling;
    do {
      if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
        count = 1;
        sibling = null;
      } else {
        count = null;
        sibling = sibling.previousSibling;
      }
    } while (sibling);
  }

  if (node.nodeType === 1) {
    const element = {};
    element.str = node.nodeName.toLowerCase();
    // add the id and the count so we can construct robust versions of the xpath
    const id = node.getAttribute && chunk007.escapeSelector(node.getAttribute('id'));
    if (id && node.ownerDocument.querySelectorAll('#' + id).length === 1) {
      element.id = node.getAttribute('id');
    }
    if (count > 1) {
      element.count = count;
    }
    path.push(element);
  }
  return path;
}

// Robust is intended to allow xpaths to be robust to changes in the HTML structure of the page
// This means always use the id when present
// Non robust means always use the count (i.e. the exact position of the element)
// Ironically this is a bit of a misnomer because in very, very dynamic pages (e.g. where ids are generated on the fly)
// the non-ribust Xpaths will work whereas the robust ones will not work
function xpathToString(xpathArray) {
  return xpathArray.reduce((str, elm) => {
    if (elm.id) {
      return `//${elm.str}[@id='${elm.id}']`;
    } else {
      return str + `/${elm.str}` + (elm.count > 0 ? `[${elm.count}]` : '');
    }
  }, '');
}

function getXpath(node) {
  const xpathArray = getXPathArray(node);
  return xpathToString(xpathArray);
}

/**
 * Return a single node from the virtual dom tree
 *
 * @param {Object} vNode The flattened, virtual DOM tree
 * @param {Node}   node  The HTML DOM node
 */
function getNodeFromTree(vNode, node) {
  const el = node || vNode;
  return chunk007.cache.get('nodeMap') ? chunk007.cache.get('nodeMap').get(el) : null;
}

/**
 * Gets the truncated HTML source of an element, or nodeValue for non-element nodes
 * @param  {Node}   node the DOM node (element, text, comment, etc.)
 * @param  {Object} options truncation options
 * @param  {Number} [options.maxLength=300] maximum length of the output
 * @param  {Number} [options.attrLimit=20] maximum length for attribute names and values
 * @returns {String} The outerHTML, truncated representation, or nodeValue for non-elements
 */
function getElementSource(
  node,
  { maxLength = 300, attrLimit = 20 } = {}
) {
  if (!node) {
    return '';
  }
  // non-element nodes
  if (node.nodeType !== 1) {
    const value = node.nodeValue ?? '';
    return truncate(value, maxLength);
  }

  const deepStr = getOuterHtml(node);
  if (deepStr.length > maxLength) {
    return getTruncatedElementSource(node, { maxLength, attrLimit });
  }

  return deepStr;
}

/**
 * Gets the outerHTML of an element, using XMLSerializer as fallback for SVG/MathML
 * @param  {Element} element the DOM element
 * @returns {String} The serialized HTML or empty string
 */
function getOuterHtml(element) {
  let source = element.outerHTML;
  if (!source && typeof window.XMLSerializer === 'function') {
    source = new window.XMLSerializer().serializeToString(element);
  }
  return source || '';
}

/**
 * Builds a truncated HTML representation of an element when outerHTML exceeds maxLength.
 * Note: attribute order may differ from the original source as node.attributes order is not guaranteed.
 * @param  {Element} elm the DOM element
 * @param  {Object} options truncation options
 * @param  {Number} options.maxLength maximum length of the output
 * @param  {Number} options.attrLimit maximum length for attribute names and values
 * @returns {String} Truncated opening tag (e.g. '<div id="foo" ...>')
 */
function getTruncatedElementSource(elm, { maxLength, attrLimit }) {
  const nodeName = isXHTML(elm.ownerDocument || document)
    ? elm.nodeName
    : elm.nodeName.toLowerCase();

  // Get a mutable attribute map, and work out their rendered length
  const nodeAttrs = Array.from(chunk007.getNodeAttributes(elm)).map(
    ({ name, value }) => ({ name, value })
  );
  const attrsLength = nodeAttrs.reduce((acc, { name, value }) => {
    // 4 = space before name + equals sign + opening quote + closing quote
    return acc + name.length + value.length + 4;
  }, 0);

  // 2 = opening "<" + space before first attribute
  if (2 + nodeName.length + attrsLength > maxLength) {
    nodeAttrs.forEach(attr => {
      attr.name = truncate(attr.name, attrLimit);
      attr.value = truncate(attr.value, attrLimit);
    });
  }

  let source = `<${nodeName}`;
  let tagEnd = '>';
  const truncateEnd = ' ...>';
  // Must check every attribute: an attr that doesn't fit may be followed by one that does
  for (const attr of nodeAttrs) {
    const attrStr = ` ${attr.name}="${attr.value}"`;
    if (source.length + attrStr.length > maxLength - truncateEnd.length) {
      tagEnd = truncateEnd;
      continue;
    }
    source += attrStr;
  }

  return source + tagEnd;
}

/**
 * Truncates a string to max length, appending '...' when truncated
 * @param  {String} str the string to truncate
 * @param  {Number} attrLimit maximum length before truncation
 * @returns {String} The original string or truncated version with '...' suffix
 */
function truncate(str, attrLimit) {
  return str.length <= attrLimit ? str : str.substring(0, attrLimit) + '...';
}

const CACHE_KEY = 'DqElm.RunOptions';

/**
 * "Serialized" `HTMLElement`. It will calculate the CSS selector,
 * grab the source (outerHTML) and offer an array for storing frame paths
 * @param {HTMLElement} element The element to serialize
 * @param {Object} options Propagated from axe.run/etc
 * @param {Object} spec Properties to use in place of the element when instantiated on Elements from other frames
 */
const DqElement = memoizeImplementation(function DqElement(elm, options, spec) {
  options ??= null;
  spec ??= {};

  if (!options) {
    options = chunk007.cache.get(CACHE_KEY) ?? {};
  }

  this.spec = spec;
  if (elm instanceof chunk007.AbstractVirtualNode) {
    this._virtualNode = elm;
    this._element = elm.actualNode;
  } else {
    this._element = elm;
    this._virtualNode = getNodeFromTree(elm);
  }

  /**
   * Whether DqElement was created from an iframe
   * @type {boolean}
   */
  this.fromFrame = this.spec.selector?.length > 1;

  this._includeElementInJson = options.elementRef;

  if (options.absolutePaths) {
    this._options = { toRoot: true };
  }

  /**
   * Number by which nodes in the flat tree can be sorted
   * @type {Number}
   */
  this.nodeIndexes = [];
  if (Array.isArray(this.spec.nodeIndexes)) {
    this.nodeIndexes = this.spec.nodeIndexes;
  } else if (typeof this._virtualNode?.nodeIndex === 'number') {
    this.nodeIndexes = [this._virtualNode.nodeIndex];
  }

  /**
   * The generated HTML source code of the element
   * @type {String|null}
   */
  this.source = null;
  // TODO: es-modules_audit
  if (!chunk007.axe._audit.noHtml) {
    this.source = this.spec.source ?? getElementSource(this._element);
  }

  return this;
});

DqElement.prototype = {
  /**
   * A unique CSS selector for the element, designed for readability
   * @return {String}
   */
  get selector() {
    return this.spec.selector || [getSelector$1(this.element, this._options)];
  },

  /**
   * A unique CSS selector for the element, including its ancestors down to the root node
   * @return {String}
   */
  get ancestry() {
    return this.spec.ancestry || [chunk007.getAncestry(this.element)];
  },

  /**
   * Xpath to the element
   * @return {String}
   */
  get xpath() {
    return this.spec.xpath || [getXpath(this.element)];
  },

  /**
   * Direct reference to the `HTMLElement` wrapped by this `DQElement`.
   */
  get element() {
    return this._element;
  },

  /**
   * Converts to a "spec", a form suitable for use with JSON.stringify
   * (*not* to pre-stringified JSON)
   * @returns {Object}
   */
  toJSON() {
    const spec = {
      selector: this.selector,
      source: this.source,
      xpath: this.xpath,
      ancestry: this.ancestry,
      nodeIndexes: this.nodeIndexes,
      fromFrame: this.fromFrame
    };
    if (this._includeElementInJson) {
      spec.element = this._element;
    }
    return spec;
  }
};

/** @deprecated */
DqElement.fromFrame = function fromFrame(node, options, frame) {
  const spec = DqElement.mergeSpecs(node, frame);
  return new DqElement(frame.element, options, spec);
};

DqElement.mergeSpecs = function mergeSpecs(child, parentFrame) {
  // Parameter order reversed for backcompat
  return {
    ...child,
    selector: [...parentFrame.selector, ...child.selector],
    ancestry: [...parentFrame.ancestry, ...child.ancestry],
    xpath: [...parentFrame.xpath, ...child.xpath],
    nodeIndexes: [...parentFrame.nodeIndexes, ...child.nodeIndexes],
    fromFrame: true
  };
};

/**
 * Set the default options to be used
 * @param {Object} RunOptions Options passed to axe.run()
 * @property {boolean} elementRef Add element when toJSON is called
 * @property {boolean} absolutePaths Use absolute path fro selectors
 */
DqElement.setRunOptions = function setRunOptions({
  elementRef,
  absolutePaths
}) {
  chunk007.cache.set(CACHE_KEY, { elementRef, absolutePaths });
};

/**
 * Helper to denote which checks are asyncronous and provide callbacks and pass data back to the CheckResult
 * @param  {CheckResult}   checkResult The target object
 * @param  {Function} callback    The callback to expose when `this.async()` is called
 * @return {Object}               Bound to `this` for a check's fn
 */
function checkHelper(checkResult, options, resolve, reject) {
  return {
    isAsync: false,
    async() {
      this.isAsync = true;
      return result => {
        if (result instanceof Error === false) {
          checkResult.result = result;
          resolve(checkResult);
        } else {
          reject(result);
        }
      };
    },
    data(data) {
      checkResult.data = data;
    },
    relatedNodes(nodes) {
      if (!window.Node) {
        return;
      }
      if (
        nodes instanceof window.Node ||
        nodes instanceof chunk007.AbstractVirtualNode
      ) {
        nodes = [nodes];
      } else {
        nodes = toArray(nodes);
      }
      checkResult.relatedNodes = [];
      nodes.forEach(node => {
        if (node instanceof chunk007.AbstractVirtualNode) {
          node = node.actualNode;
        }
        if (node instanceof window.Node) {
          const dqElm = new DqElement(node);
          checkResult.relatedNodes.push(dqElm);
        }
      });
    }
  };
}

/**
 * Deeply clones an object or array. DOM nodes or collections of DOM nodes are not deeply cloned and are instead returned as is.
 * @param  {Mixed} obj The object/array to clone
 * @return {Mixed} A clone of the initial object or array
 */
function clone(obj) {
  return cloneRecused(obj, new Map());
}

// internal function to hide non-user facing parameters
function cloneRecused(obj, seen) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // don't clone DOM nodes. since we can pass nodes from different window contexts
  // we'll also use duck typing to determine what is a DOM node
  if (
    (window?.Node && obj instanceof window.Node) ||
    (window?.HTMLCollection && obj instanceof window.HTMLCollection) ||
    ('nodeName' in obj && 'nodeType' in obj && 'ownerDocument' in obj)
  ) {
    return obj;
  }

  // handle circular references by caching the cloned object and returning it
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  if (Array.isArray(obj)) {
    const out = [];
    seen.set(obj, out);
    obj.forEach(value => {
      out.push(cloneRecused(value, seen));
    });
    return out;
  }

  const out = {};
  seen.set(obj, out);
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    out[key] = cloneRecused(obj[key], seen);
  }
  return out;
}

const parser = new chunk003.libExports.CssSelectorParser();
parser.registerSelectorPseudos('not');
parser.registerSelectorPseudos('is');
parser.registerNestingOperators('>');
parser.registerAttrEqualityMods('^', '$', '*', '~');

exports.DqElement = DqElement;
exports.checkHelper = checkHelper;
exports.clone = clone;
exports.emojiRegexText = emojiRegexText;
exports.getElementSource = getElementSource;
exports.getFriendlyUriEnd = getFriendlyUriEnd;
exports.getNodeFromTree = getNodeFromTree;
exports.getSelector = getSelector$1;
exports.getSelectorData = getSelectorData;
exports.getXpath = getXpath;
exports.imports = imports;
exports.isXHTML = isXHTML;
exports.matchesSelector = matchesSelector;
exports.memoizeImplementation = memoizeImplementation;
exports.parser = parser;
exports.toArray = toArray;
