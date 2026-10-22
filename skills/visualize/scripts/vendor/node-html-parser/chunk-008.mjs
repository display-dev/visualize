// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { C as stringify, D as traversal, E as manipulation, F as helpers, G as feeds, H as lib, I as lib$1, J as back } from './chunk-000.mjs';
import { a as requireLib$3, b as requireLib$4, r as requireQuerying, c as requireCompile } from './chunk-003.mjs';
import { r as requireLib$2 } from './chunk-007.mjs';
import { b as requireLegacy } from './chunk-004.mjs';
import { b as requireBoolbase, d as requireSubselects, a as requirePseudoSelectors, e as requireType, f as requireNode } from './chunk-002.mjs';
import { r as requireHe } from './chunk-001.mjs';

var hasRequiredStringify;

function requireStringify () {
	if (hasRequiredStringify) return stringify;
	hasRequiredStringify = 1;
	var __importDefault = (stringify && stringify.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(stringify, "__esModule", { value: true });
	stringify.getOuterHTML = getOuterHTML;
	stringify.getInnerHTML = getInnerHTML;
	stringify.getText = getText;
	stringify.textContent = textContent;
	stringify.innerText = innerText;
	var domhandler_1 = /*@__PURE__*/ requireLib$3();
	var dom_serializer_1 = __importDefault(/*@__PURE__*/ requireLib$2());
	var domelementtype_1 = /*@__PURE__*/ requireLib$4();
	/**
	 * @category Stringify
	 * @deprecated Use the `dom-serializer` module directly.
	 * @param node Node to get the outer HTML of.
	 * @param options Options for serialization.
	 * @returns `node`'s outer HTML.
	 */
	function getOuterHTML(node, options) {
	    return (0, dom_serializer_1.default)(node, options);
	}
	/**
	 * @category Stringify
	 * @deprecated Use the `dom-serializer` module directly.
	 * @param node Node to get the inner HTML of.
	 * @param options Options for serialization.
	 * @returns `node`'s inner HTML.
	 */
	function getInnerHTML(node, options) {
	    return (0, domhandler_1.hasChildren)(node)
	        ? node.children.map(function (node) { return getOuterHTML(node, options); }).join("")
	        : "";
	}
	/**
	 * Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags. Ignores comments.
	 *
	 * @category Stringify
	 * @deprecated Use `textContent` instead.
	 * @param node Node to get the inner text of.
	 * @returns `node`'s inner text.
	 */
	function getText(node) {
	    if (Array.isArray(node))
	        return node.map(getText).join("");
	    if ((0, domhandler_1.isTag)(node))
	        return node.name === "br" ? "\n" : getText(node.children);
	    if ((0, domhandler_1.isCDATA)(node))
	        return getText(node.children);
	    if ((0, domhandler_1.isText)(node))
	        return node.data;
	    return "";
	}
	/**
	 * Get a node's text content. Ignores comments.
	 *
	 * @category Stringify
	 * @param node Node to get the text content of.
	 * @returns `node`'s text content.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
	 */
	function textContent(node) {
	    if (Array.isArray(node))
	        return node.map(textContent).join("");
	    if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
	        return textContent(node.children);
	    }
	    if ((0, domhandler_1.isText)(node))
	        return node.data;
	    return "";
	}
	/**
	 * Get a node's inner text, ignoring `<script>` and `<style>` tags. Ignores comments.
	 *
	 * @category Stringify
	 * @param node Node to get the inner text of.
	 * @returns `node`'s inner text.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
	 */
	function innerText(node) {
	    if (Array.isArray(node))
	        return node.map(innerText).join("");
	    if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
	        return innerText(node.children);
	    }
	    if ((0, domhandler_1.isText)(node))
	        return node.data;
	    return "";
	}
	
	return stringify;
}

var hasRequiredTraversal;

function requireTraversal () {
	if (hasRequiredTraversal) return traversal;
	hasRequiredTraversal = 1;
	Object.defineProperty(traversal, "__esModule", { value: true });
	traversal.getChildren = getChildren;
	traversal.getParent = getParent;
	traversal.getSiblings = getSiblings;
	traversal.getAttributeValue = getAttributeValue;
	traversal.hasAttrib = hasAttrib;
	traversal.getName = getName;
	traversal.nextElementSibling = nextElementSibling;
	traversal.prevElementSibling = prevElementSibling;
	var domhandler_1 = /*@__PURE__*/ requireLib$3();
	/**
	 * Get a node's children.
	 *
	 * @category Traversal
	 * @param elem Node to get the children of.
	 * @returns `elem`'s children, or an empty array.
	 */
	function getChildren(elem) {
	    return (0, domhandler_1.hasChildren)(elem) ? elem.children : [];
	}
	/**
	 * Get a node's parent.
	 *
	 * @category Traversal
	 * @param elem Node to get the parent of.
	 * @returns `elem`'s parent node, or `null` if `elem` is a root node.
	 */
	function getParent(elem) {
	    return elem.parent || null;
	}
	/**
	 * Gets an elements siblings, including the element itself.
	 *
	 * Attempts to get the children through the element's parent first. If we don't
	 * have a parent (the element is a root node), we walk the element's `prev` &
	 * `next` to get all remaining nodes.
	 *
	 * @category Traversal
	 * @param elem Element to get the siblings of.
	 * @returns `elem`'s siblings, including `elem`.
	 */
	function getSiblings(elem) {
	    var _a, _b;
	    var parent = getParent(elem);
	    if (parent != null)
	        return getChildren(parent);
	    var siblings = [elem];
	    var prev = elem.prev, next = elem.next;
	    while (prev != null) {
	        siblings.unshift(prev);
	        (_a = prev, prev = _a.prev);
	    }
	    while (next != null) {
	        siblings.push(next);
	        (_b = next, next = _b.next);
	    }
	    return siblings;
	}
	/**
	 * Gets an attribute from an element.
	 *
	 * @category Traversal
	 * @param elem Element to check.
	 * @param name Attribute name to retrieve.
	 * @returns The element's attribute value, or `undefined`.
	 */
	function getAttributeValue(elem, name) {
	    var _a;
	    return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
	}
	/**
	 * Checks whether an element has an attribute.
	 *
	 * @category Traversal
	 * @param elem Element to check.
	 * @param name Attribute name to look for.
	 * @returns Returns whether `elem` has the attribute `name`.
	 */
	function hasAttrib(elem, name) {
	    return (elem.attribs != null &&
	        Object.prototype.hasOwnProperty.call(elem.attribs, name) &&
	        elem.attribs[name] != null);
	}
	/**
	 * Get the tag name of an element.
	 *
	 * @category Traversal
	 * @param elem The element to get the name for.
	 * @returns The tag name of `elem`.
	 */
	function getName(elem) {
	    return elem.name;
	}
	/**
	 * Returns the next element sibling of a node.
	 *
	 * @category Traversal
	 * @param elem The element to get the next sibling of.
	 * @returns `elem`'s next sibling that is a tag, or `null` if there is no next
	 * sibling.
	 */
	function nextElementSibling(elem) {
	    var _a;
	    var next = elem.next;
	    while (next !== null && !(0, domhandler_1.isTag)(next))
	        (_a = next, next = _a.next);
	    return next;
	}
	/**
	 * Returns the previous element sibling of a node.
	 *
	 * @category Traversal
	 * @param elem The element to get the previous sibling of.
	 * @returns `elem`'s previous sibling that is a tag, or `null` if there is no
	 * previous sibling.
	 */
	function prevElementSibling(elem) {
	    var _a;
	    var prev = elem.prev;
	    while (prev !== null && !(0, domhandler_1.isTag)(prev))
	        (_a = prev, prev = _a.prev);
	    return prev;
	}
	
	return traversal;
}

var hasRequiredManipulation;

function requireManipulation () {
	if (hasRequiredManipulation) return manipulation;
	hasRequiredManipulation = 1;
	Object.defineProperty(manipulation, "__esModule", { value: true });
	manipulation.removeElement = removeElement;
	manipulation.replaceElement = replaceElement;
	manipulation.appendChild = appendChild;
	manipulation.append = append;
	manipulation.prependChild = prependChild;
	manipulation.prepend = prepend;
	/**
	 * Remove an element from the dom
	 *
	 * @category Manipulation
	 * @param elem The element to be removed
	 */
	function removeElement(elem) {
	    if (elem.prev)
	        elem.prev.next = elem.next;
	    if (elem.next)
	        elem.next.prev = elem.prev;
	    if (elem.parent) {
	        var childs = elem.parent.children;
	        var childsIndex = childs.lastIndexOf(elem);
	        if (childsIndex >= 0) {
	            childs.splice(childsIndex, 1);
	        }
	    }
	    elem.next = null;
	    elem.prev = null;
	    elem.parent = null;
	}
	/**
	 * Replace an element in the dom
	 *
	 * @category Manipulation
	 * @param elem The element to be replaced
	 * @param replacement The element to be added
	 */
	function replaceElement(elem, replacement) {
	    var prev = (replacement.prev = elem.prev);
	    if (prev) {
	        prev.next = replacement;
	    }
	    var next = (replacement.next = elem.next);
	    if (next) {
	        next.prev = replacement;
	    }
	    var parent = (replacement.parent = elem.parent);
	    if (parent) {
	        var childs = parent.children;
	        childs[childs.lastIndexOf(elem)] = replacement;
	        elem.parent = null;
	    }
	}
	/**
	 * Append a child to an element.
	 *
	 * @category Manipulation
	 * @param parent The element to append to.
	 * @param child The element to be added as a child.
	 */
	function appendChild(parent, child) {
	    removeElement(child);
	    child.next = null;
	    child.parent = parent;
	    if (parent.children.push(child) > 1) {
	        var sibling = parent.children[parent.children.length - 2];
	        sibling.next = child;
	        child.prev = sibling;
	    }
	    else {
	        child.prev = null;
	    }
	}
	/**
	 * Append an element after another.
	 *
	 * @category Manipulation
	 * @param elem The element to append after.
	 * @param next The element be added.
	 */
	function append(elem, next) {
	    removeElement(next);
	    var parent = elem.parent;
	    var currNext = elem.next;
	    next.next = currNext;
	    next.prev = elem;
	    elem.next = next;
	    next.parent = parent;
	    if (currNext) {
	        currNext.prev = next;
	        if (parent) {
	            var childs = parent.children;
	            childs.splice(childs.lastIndexOf(currNext), 0, next);
	        }
	    }
	    else if (parent) {
	        parent.children.push(next);
	    }
	}
	/**
	 * Prepend a child to an element.
	 *
	 * @category Manipulation
	 * @param parent The element to prepend before.
	 * @param child The element to be added as a child.
	 */
	function prependChild(parent, child) {
	    removeElement(child);
	    child.parent = parent;
	    child.prev = null;
	    if (parent.children.unshift(child) !== 1) {
	        var sibling = parent.children[1];
	        sibling.prev = child;
	        child.next = sibling;
	    }
	    else {
	        child.next = null;
	    }
	}
	/**
	 * Prepend an element before another.
	 *
	 * @category Manipulation
	 * @param elem The element to prepend before.
	 * @param prev The element be added.
	 */
	function prepend(elem, prev) {
	    removeElement(prev);
	    var parent = elem.parent;
	    if (parent) {
	        var childs = parent.children;
	        childs.splice(childs.indexOf(elem), 0, prev);
	    }
	    if (elem.prev) {
	        elem.prev.next = prev;
	    }
	    prev.parent = parent;
	    prev.prev = elem.prev;
	    prev.next = elem;
	    elem.prev = prev;
	}
	
	return manipulation;
}

var hasRequiredHelpers;

function requireHelpers () {
	if (hasRequiredHelpers) return helpers;
	hasRequiredHelpers = 1;
	Object.defineProperty(helpers, "__esModule", { value: true });
	helpers.DocumentPosition = void 0;
	helpers.removeSubsets = removeSubsets;
	helpers.compareDocumentPosition = compareDocumentPosition;
	helpers.uniqueSort = uniqueSort;
	var domhandler_1 = /*@__PURE__*/ requireLib$3();
	/**
	 * Given an array of nodes, remove any member that is contained by another
	 * member.
	 *
	 * @category Helpers
	 * @param nodes Nodes to filter.
	 * @returns Remaining nodes that aren't contained by other nodes.
	 */
	function removeSubsets(nodes) {
	    var idx = nodes.length;
	    /*
	     * Check if each node (or one of its ancestors) is already contained in the
	     * array.
	     */
	    while (--idx >= 0) {
	        var node = nodes[idx];
	        /*
	         * Remove the node if it is not unique.
	         * We are going through the array from the end, so we only
	         * have to check nodes that preceed the node under consideration in the array.
	         */
	        if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
	            nodes.splice(idx, 1);
	            continue;
	        }
	        for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
	            if (nodes.includes(ancestor)) {
	                nodes.splice(idx, 1);
	                break;
	            }
	        }
	    }
	    return nodes;
	}
	/**
	 * @category Helpers
	 * @see {@link http://dom.spec.whatwg.org/#dom-node-comparedocumentposition}
	 */
	var DocumentPosition;
	(function (DocumentPosition) {
	    DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
	    DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
	    DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
	    DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
	    DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
	})(DocumentPosition || (helpers.DocumentPosition = DocumentPosition = {}));
	/**
	 * Compare the position of one node against another node in any other document,
	 * returning a bitmask with the values from {@link DocumentPosition}.
	 *
	 * Document order:
	 * > There is an ordering, document order, defined on all the nodes in the
	 * > document corresponding to the order in which the first character of the
	 * > XML representation of each node occurs in the XML representation of the
	 * > document after expansion of general entities. Thus, the document element
	 * > node will be the first node. Element nodes occur before their children.
	 * > Thus, document order orders element nodes in order of the occurrence of
	 * > their start-tag in the XML (after expansion of entities). The attribute
	 * > nodes of an element occur after the element and before its children. The
	 * > relative order of attribute nodes is implementation-dependent.
	 *
	 * Source:
	 * http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
	 *
	 * @category Helpers
	 * @param nodeA The first node to use in the comparison
	 * @param nodeB The second node to use in the comparison
	 * @returns A bitmask describing the input nodes' relative position.
	 *
	 * See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
	 * a description of these values.
	 */
	function compareDocumentPosition(nodeA, nodeB) {
	    var aParents = [];
	    var bParents = [];
	    if (nodeA === nodeB) {
	        return 0;
	    }
	    var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
	    while (current) {
	        aParents.unshift(current);
	        current = current.parent;
	    }
	    current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
	    while (current) {
	        bParents.unshift(current);
	        current = current.parent;
	    }
	    var maxIdx = Math.min(aParents.length, bParents.length);
	    var idx = 0;
	    while (idx < maxIdx && aParents[idx] === bParents[idx]) {
	        idx++;
	    }
	    if (idx === 0) {
	        return DocumentPosition.DISCONNECTED;
	    }
	    var sharedParent = aParents[idx - 1];
	    var siblings = sharedParent.children;
	    var aSibling = aParents[idx];
	    var bSibling = bParents[idx];
	    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
	        if (sharedParent === nodeB) {
	            return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
	        }
	        return DocumentPosition.FOLLOWING;
	    }
	    if (sharedParent === nodeA) {
	        return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
	    }
	    return DocumentPosition.PRECEDING;
	}
	/**
	 * Sort an array of nodes based on their relative position in the document,
	 * removing any duplicate nodes. If the array contains nodes that do not belong
	 * to the same document, sort order is unspecified.
	 *
	 * @category Helpers
	 * @param nodes Array of DOM nodes.
	 * @returns Collection of unique nodes, sorted in document order.
	 */
	function uniqueSort(nodes) {
	    nodes = nodes.filter(function (node, i, arr) { return !arr.includes(node, i + 1); });
	    nodes.sort(function (a, b) {
	        var relative = compareDocumentPosition(a, b);
	        if (relative & DocumentPosition.PRECEDING) {
	            return -1;
	        }
	        else if (relative & DocumentPosition.FOLLOWING) {
	            return 1;
	        }
	        return 0;
	    });
	    return nodes;
	}
	
	return helpers;
}

var hasRequiredFeeds;

function requireFeeds () {
	if (hasRequiredFeeds) return feeds;
	hasRequiredFeeds = 1;
	Object.defineProperty(feeds, "__esModule", { value: true });
	feeds.getFeed = getFeed;
	var stringify_js_1 = /*@__PURE__*/ requireStringify();
	var legacy_js_1 = /*@__PURE__*/ requireLegacy();
	/**
	 * Get the feed object from the root of a DOM tree.
	 *
	 * @category Feeds
	 * @param doc - The DOM to to extract the feed from.
	 * @returns The feed.
	 */
	function getFeed(doc) {
	    var feedRoot = getOneElement(isValidFeed, doc);
	    return !feedRoot
	        ? null
	        : feedRoot.name === "feed"
	            ? getAtomFeed(feedRoot)
	            : getRssFeed(feedRoot);
	}
	/**
	 * Parse an Atom feed.
	 *
	 * @param feedRoot The root of the feed.
	 * @returns The parsed feed.
	 */
	function getAtomFeed(feedRoot) {
	    var _a;
	    var childs = feedRoot.children;
	    var feed = {
	        type: "atom",
	        items: (0, legacy_js_1.getElementsByTagName)("entry", childs).map(function (item) {
	            var _a;
	            var children = item.children;
	            var entry = { media: getMediaElements(children) };
	            addConditionally(entry, "id", "id", children);
	            addConditionally(entry, "title", "title", children);
	            var href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
	            if (href) {
	                entry.link = href;
	            }
	            var description = fetch("summary", children) || fetch("content", children);
	            if (description) {
	                entry.description = description;
	            }
	            var pubDate = fetch("updated", children);
	            if (pubDate) {
	                entry.pubDate = new Date(pubDate);
	            }
	            return entry;
	        }),
	    };
	    addConditionally(feed, "id", "id", childs);
	    addConditionally(feed, "title", "title", childs);
	    var href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
	    if (href) {
	        feed.link = href;
	    }
	    addConditionally(feed, "description", "subtitle", childs);
	    var updated = fetch("updated", childs);
	    if (updated) {
	        feed.updated = new Date(updated);
	    }
	    addConditionally(feed, "author", "email", childs, true);
	    return feed;
	}
	/**
	 * Parse a RSS feed.
	 *
	 * @param feedRoot The root of the feed.
	 * @returns The parsed feed.
	 */
	function getRssFeed(feedRoot) {
	    var _a, _b;
	    var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
	    var feed = {
	        type: feedRoot.name.substr(0, 3),
	        id: "",
	        items: (0, legacy_js_1.getElementsByTagName)("item", feedRoot.children).map(function (item) {
	            var children = item.children;
	            var entry = { media: getMediaElements(children) };
	            addConditionally(entry, "id", "guid", children);
	            addConditionally(entry, "title", "title", children);
	            addConditionally(entry, "link", "link", children);
	            addConditionally(entry, "description", "description", children);
	            var pubDate = fetch("pubDate", children) || fetch("dc:date", children);
	            if (pubDate)
	                entry.pubDate = new Date(pubDate);
	            return entry;
	        }),
	    };
	    addConditionally(feed, "title", "title", childs);
	    addConditionally(feed, "link", "link", childs);
	    addConditionally(feed, "description", "description", childs);
	    var updated = fetch("lastBuildDate", childs);
	    if (updated) {
	        feed.updated = new Date(updated);
	    }
	    addConditionally(feed, "author", "managingEditor", childs, true);
	    return feed;
	}
	var MEDIA_KEYS_STRING = ["url", "type", "lang"];
	var MEDIA_KEYS_INT = [
	    "fileSize",
	    "bitrate",
	    "framerate",
	    "samplingrate",
	    "channels",
	    "duration",
	    "height",
	    "width",
	];
	/**
	 * Get all media elements of a feed item.
	 *
	 * @param where Nodes to search in.
	 * @returns Media elements.
	 */
	function getMediaElements(where) {
	    return (0, legacy_js_1.getElementsByTagName)("media:content", where).map(function (elem) {
	        var attribs = elem.attribs;
	        var media = {
	            medium: attribs["medium"],
	            isDefault: !!attribs["isDefault"],
	        };
	        for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
	            var attrib = MEDIA_KEYS_STRING_1[_i];
	            if (attribs[attrib]) {
	                media[attrib] = attribs[attrib];
	            }
	        }
	        for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a < MEDIA_KEYS_INT_1.length; _a++) {
	            var attrib = MEDIA_KEYS_INT_1[_a];
	            if (attribs[attrib]) {
	                media[attrib] = parseInt(attribs[attrib], 10);
	            }
	        }
	        if (attribs["expression"]) {
	            media.expression = attribs["expression"];
	        }
	        return media;
	    });
	}
	/**
	 * Get one element by tag name.
	 *
	 * @param tagName Tag name to look for
	 * @param node Node to search in
	 * @returns The element or null
	 */
	function getOneElement(tagName, node) {
	    return (0, legacy_js_1.getElementsByTagName)(tagName, node, true, 1)[0];
	}
	/**
	 * Get the text content of an element with a certain tag name.
	 *
	 * @param tagName Tag name to look for.
	 * @param where Node to search in.
	 * @param recurse Whether to recurse into child nodes.
	 * @returns The text content of the element.
	 */
	function fetch(tagName, where, recurse) {
	    if (recurse === void 0) { recurse = false; }
	    return (0, stringify_js_1.textContent)((0, legacy_js_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
	}
	/**
	 * Adds a property to an object if it has a value.
	 *
	 * @param obj Object to be extended
	 * @param prop Property name
	 * @param tagName Tag name that contains the conditionally added property
	 * @param where Element to search for the property
	 * @param recurse Whether to recurse into child nodes.
	 */
	function addConditionally(obj, prop, tagName, where, recurse) {
	    if (recurse === void 0) { recurse = false; }
	    var val = fetch(tagName, where, recurse);
	    if (val)
	        obj[prop] = val;
	}
	/**
	 * Checks if an element is a feed root node.
	 *
	 * @param value The name of the element to check.
	 * @returns Whether an element is a feed root node.
	 */
	function isValidFeed(value) {
	    return value === "rss" || value === "feed" || value === "rdf:RDF";
	}
	
	return feeds;
}

var hasRequiredLib$1;

function requireLib$1 () {
	if (hasRequiredLib$1) return lib;
	hasRequiredLib$1 = 1;
	(function (exports) {
		var __createBinding = (lib && lib.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (lib && lib.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.hasChildren = exports.isDocument = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
		__exportStar(/*@__PURE__*/ requireStringify(), exports);
		__exportStar(/*@__PURE__*/ requireTraversal(), exports);
		__exportStar(/*@__PURE__*/ requireManipulation(), exports);
		__exportStar(/*@__PURE__*/ requireQuerying(), exports);
		__exportStar(/*@__PURE__*/ requireLegacy(), exports);
		__exportStar(/*@__PURE__*/ requireHelpers(), exports);
		__exportStar(/*@__PURE__*/ requireFeeds(), exports);
		/** @deprecated Use these methods from `domhandler` directly. */
		var domhandler_1 = /*@__PURE__*/ requireLib$3();
		Object.defineProperty(exports, "isTag", { enumerable: true, get: function () { return domhandler_1.isTag; } });
		Object.defineProperty(exports, "isCDATA", { enumerable: true, get: function () { return domhandler_1.isCDATA; } });
		Object.defineProperty(exports, "isText", { enumerable: true, get: function () { return domhandler_1.isText; } });
		Object.defineProperty(exports, "isComment", { enumerable: true, get: function () { return domhandler_1.isComment; } });
		Object.defineProperty(exports, "isDocument", { enumerable: true, get: function () { return domhandler_1.isDocument; } });
		Object.defineProperty(exports, "hasChildren", { enumerable: true, get: function () { return domhandler_1.hasChildren; } });
		
	} (lib));
	return lib;
}

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib$1;
	hasRequiredLib = 1;
	(function (exports) {
		var __createBinding = (lib$1 && lib$1.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (lib$1 && lib$1.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (lib$1 && lib$1.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __importDefault = (lib$1 && lib$1.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.aliases = exports.pseudos = exports.filters = exports.is = exports.selectOne = exports.selectAll = exports.prepareContext = exports._compileToken = exports._compileUnsafe = exports.compile = void 0;
		var DomUtils = __importStar(/*@__PURE__*/ requireLib$1());
		var boolbase_1 = __importDefault(requireBoolbase());
		var compile_js_1 = requireCompile();
		var subselects_js_1 = requireSubselects();
		var defaultEquals = function (a, b) { return a === b; };
		var defaultOptions = {
		    adapter: DomUtils,
		    equals: defaultEquals,
		};
		function convertOptionFormats(options) {
		    var _a, _b, _c, _d;
		    /*
		     * We force one format of options to the other one.
		     */
		    // @ts-expect-error Default options may have incompatible `Node` / `ElementNode`.
		    var opts = options !== null && options !== void 0 ? options : defaultOptions;
		    // @ts-expect-error Same as above.
		    (_a = opts.adapter) !== null && _a !== void 0 ? _a : (opts.adapter = DomUtils);
		    // @ts-expect-error `equals` does not exist on `Options`
		    (_b = opts.equals) !== null && _b !== void 0 ? _b : (opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals);
		    return opts;
		}
		function wrapCompile(func) {
		    return function addAdapter(selector, options, context) {
		        var opts = convertOptionFormats(options);
		        return func(selector, opts, context);
		    };
		}
		/**
		 * Compiles the query, returns a function.
		 */
		exports.compile = wrapCompile(compile_js_1.compile);
		exports._compileUnsafe = wrapCompile(compile_js_1.compileUnsafe);
		exports._compileToken = wrapCompile(compile_js_1.compileToken);
		function getSelectorFunc(searchFunc) {
		    return function select(query, elements, options) {
		        var opts = convertOptionFormats(options);
		        if (typeof query !== "function") {
		            query = (0, compile_js_1.compileUnsafe)(query, opts, elements);
		        }
		        var filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
		        return searchFunc(query, filteredElements, opts);
		    };
		}
		function prepareContext(elems, adapter, shouldTestNextSiblings) {
		    if (shouldTestNextSiblings === void 0) { shouldTestNextSiblings = false; }
		    /*
		     * Add siblings if the query requires them.
		     * See https://github.com/fb55/css-select/pull/43#issuecomment-225414692
		     */
		    if (shouldTestNextSiblings) {
		        elems = appendNextSiblings(elems, adapter);
		    }
		    return Array.isArray(elems)
		        ? adapter.removeSubsets(elems)
		        : adapter.getChildren(elems);
		}
		exports.prepareContext = prepareContext;
		function appendNextSiblings(elem, adapter) {
		    // Order matters because jQuery seems to check the children before the siblings
		    var elems = Array.isArray(elem) ? elem.slice(0) : [elem];
		    var elemsLength = elems.length;
		    for (var i = 0; i < elemsLength; i++) {
		        var nextSiblings = (0, subselects_js_1.getNextSiblings)(elems[i], adapter);
		        elems.push.apply(elems, nextSiblings);
		    }
		    return elems;
		}
		/**
		 * @template Node The generic Node type for the DOM adapter being used.
		 * @template ElementNode The Node type for elements for the DOM adapter being used.
		 * @param elems Elements to query. If it is an element, its children will be queried..
		 * @param query can be either a CSS selector string or a compiled query function.
		 * @param [options] options for querying the document.
		 * @see compile for supported selector queries.
		 * @returns All matching elements.
		 *
		 */
		exports.selectAll = getSelectorFunc(function (query, elems, options) {
		    return query === boolbase_1.default.falseFunc || !elems || elems.length === 0
		        ? []
		        : options.adapter.findAll(query, elems);
		});
		/**
		 * @template Node The generic Node type for the DOM adapter being used.
		 * @template ElementNode The Node type for elements for the DOM adapter being used.
		 * @param elems Elements to query. If it is an element, its children will be queried..
		 * @param query can be either a CSS selector string or a compiled query function.
		 * @param [options] options for querying the document.
		 * @see compile for supported selector queries.
		 * @returns the first match, or null if there was no match.
		 */
		exports.selectOne = getSelectorFunc(function (query, elems, options) {
		    return query === boolbase_1.default.falseFunc || !elems || elems.length === 0
		        ? null
		        : options.adapter.findOne(query, elems);
		});
		/**
		 * Tests whether or not an element is matched by query.
		 *
		 * @template Node The generic Node type for the DOM adapter being used.
		 * @template ElementNode The Node type for elements for the DOM adapter being used.
		 * @param elem The element to test if it matches the query.
		 * @param query can be either a CSS selector string or a compiled query function.
		 * @param [options] options for querying the document.
		 * @see compile for supported selector queries.
		 * @returns
		 */
		function is(elem, query, options) {
		    var opts = convertOptionFormats(options);
		    return (typeof query === "function" ? query : (0, compile_js_1.compile)(query, opts))(elem);
		}
		exports.is = is;
		/**
		 * Alias for selectAll(query, elems, options).
		 * @see [compile] for supported selector queries.
		 */
		exports.default = exports.selectAll;
		// Export filters, pseudos and aliases to allow users to supply their own.
		/** @deprecated Use the `pseudos` option instead. */
		var index_js_1 = requirePseudoSelectors();
		Object.defineProperty(exports, "filters", { enumerable: true, get: function () { return index_js_1.filters; } });
		Object.defineProperty(exports, "pseudos", { enumerable: true, get: function () { return index_js_1.pseudos; } });
		Object.defineProperty(exports, "aliases", { enumerable: true, get: function () { return index_js_1.aliases; } });
		
	} (lib$1));
	return lib$1;
}

var hasRequiredBack;

function requireBack () {
	if (hasRequiredBack) return back;
	hasRequiredBack = 1;
	Object.defineProperty(back, "__esModule", { value: true });
	function arr_back(arr) {
	    return arr[arr.length - 1];
	}
	back.default = arr_back;
	return back;
}

var matcher = {};

var hasRequiredMatcher;

function requireMatcher () {
	if (hasRequiredMatcher) return matcher;
	hasRequiredMatcher = 1;
	var __importDefault = (matcher && matcher.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(matcher, "__esModule", { value: true });
	const type_1 = __importDefault(/*@__PURE__*/ requireType());
	function isTag(node) {
	    return node && node.nodeType === type_1.default.ELEMENT_NODE;
	}
	function getAttributeValue(elem, name) {
	    return isTag(elem) ? elem.getAttribute(name) : undefined;
	}
	function getName(elem) {
	    return ((elem && elem.rawTagName) || '').toLowerCase();
	}
	function getChildren(node) {
	    return node && node.childNodes;
	}
	function getParent(node) {
	    return node ? node.parentNode : null;
	}
	function getText(node) {
	    return node.text;
	}
	function removeSubsets(nodes) {
	    let idx = nodes.length;
	    let node;
	    let ancestor;
	    let replace;
	    // Check if each node (or one of its ancestors) is already contained in the
	    // array.
	    while (--idx > -1) {
	        node = ancestor = nodes[idx];
	        // Temporarily remove the node under consideration
	        nodes[idx] = null;
	        replace = true;
	        while (ancestor) {
	            if (nodes.indexOf(ancestor) > -1) {
	                replace = false;
	                nodes.splice(idx, 1);
	                break;
	            }
	            ancestor = getParent(ancestor);
	        }
	        // If the node has been found to be unique, re-insert it.
	        if (replace) {
	            nodes[idx] = node;
	        }
	    }
	    return nodes;
	}
	function existsOne(test, elems) {
	    return elems.some((elem) => {
	        return isTag(elem) ? test(elem) || existsOne(test, getChildren(elem)) : false;
	    });
	}
	function getSiblings(node) {
	    const parent = getParent(node);
	    return parent ? getChildren(parent) : [];
	}
	function hasAttrib(elem, name) {
	    return getAttributeValue(elem, name) !== undefined;
	}
	function findOne(test, elems) {
	    let elem = null;
	    for (let i = 0, l = elems === null || elems === void 0 ? void 0 : elems.length; i < l && !elem; i++) {
	        const el = elems[i];
	        if (test(el)) {
	            elem = el;
	        }
	        else {
	            const childs = getChildren(el);
	            if (childs && childs.length > 0) {
	                elem = findOne(test, childs);
	            }
	        }
	    }
	    return elem;
	}
	function findAll(test, nodes) {
	    let result = [];
	    for (let i = 0, j = nodes.length; i < j; i++) {
	        if (!isTag(nodes[i]))
	            continue;
	        if (test(nodes[i]))
	            result.push(nodes[i]);
	        const childs = getChildren(nodes[i]);
	        if (childs)
	            result = result.concat(findAll(test, childs));
	    }
	    return result;
	}
	matcher.default = {
	    isTag,
	    getAttributeValue,
	    getName,
	    getChildren,
	    getParent,
	    getText,
	    removeSubsets,
	    existsOne,
	    getSiblings,
	    hasAttrib,
	    findOne,
	    findAll
	};
	return matcher;
}

var voidTag = {};

var hasRequiredVoidTag;

function requireVoidTag () {
	if (hasRequiredVoidTag) return voidTag;
	hasRequiredVoidTag = 1;
	Object.defineProperty(voidTag, "__esModule", { value: true });
	class VoidTag {
	    constructor(addClosingSlash = false, tags) {
	        this.addClosingSlash = addClosingSlash;
	        if (Array.isArray(tags)) {
	            this.voidTags = tags.reduce((set, tag) => {
	                return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
	            }, new Set());
	        }
	        else {
	            this.voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].reduce((set, tag) => {
	                return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
	            }, new Set());
	        }
	    }
	    formatNode(tag, attrs, innerHTML) {
	        const addClosingSlash = this.addClosingSlash;
	        const closingSpace = (addClosingSlash && attrs && !attrs.endsWith(' ')) ? ' ' : '';
	        const closingSlash = addClosingSlash ? `${closingSpace}/` : '';
	        return this.isVoidElement(tag.toLowerCase()) ? `<${tag}${attrs}${closingSlash}>` : `<${tag}${attrs}>${innerHTML}</${tag}>`;
	    }
	    isVoidElement(tag) {
	        return this.voidTags.has(tag);
	    }
	}
	voidTag.default = VoidTag;
	return voidTag;
}

var text = {};

var hasRequiredText;

function requireText () {
	if (hasRequiredText) return text;
	hasRequiredText = 1;
	var __importDefault = (text && text.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(text, "__esModule", { value: true });
	const he_1 = requireHe();
	const node_1 = __importDefault(/*@__PURE__*/ requireNode());
	const type_1 = __importDefault(/*@__PURE__*/ requireType());
	/**
	 * TextNode to contain a text element in DOM tree.
	 * @param {string} value [description]
	 */
	class TextNode extends node_1.default {
	    clone() {
	        return new TextNode(this._rawText, null);
	    }
	    constructor(rawText, parentNode = null, range) {
	        super(parentNode, range);
	        /**
	         * Node Type declaration.
	         * @type {Number}
	         */
	        this.nodeType = type_1.default.TEXT_NODE;
	        this.rawTagName = '';
	        this._rawText = rawText;
	    }
	    get rawText() {
	        return this._rawText;
	    }
	    /**
	     * Set rawText and invalidate trimmed caches
	     */
	    set rawText(text) {
	        this._rawText = text;
	        this._trimmedRawText = void 0;
	        this._trimmedText = void 0;
	    }
	    /**
	     * Returns raw text with all whitespace trimmed except single leading/trailing non-breaking space
	     */
	    get trimmedRawText() {
	        if (this._trimmedRawText !== undefined)
	            return this._trimmedRawText;
	        this._trimmedRawText = trimText(this.rawText);
	        return this._trimmedRawText;
	    }
	    /**
	     * Returns text with all whitespace trimmed except single leading/trailing non-breaking space
	     */
	    get trimmedText() {
	        if (this._trimmedText !== undefined)
	            return this._trimmedText;
	        this._trimmedText = trimText(this.text);
	        return this._trimmedText;
	    }
	    /**
	     * Get unescaped text value of current node and its children.
	     * @return {string} text content
	     */
	    get text() {
	        return (0, he_1.decode)(this.rawText);
	    }
	    /**
	     * Detect if the node contains only white space.
	     * @return {boolean}
	     */
	    get isWhitespace() {
	        return /^(\s|&nbsp;)*$/.test(this.rawText);
	    }
	    toString() {
	        return this.rawText;
	    }
	}
	text.default = TextNode;
	/**
	 * Trim whitespace except single leading/trailing non-breaking space
	 */
	function trimText(text) {
	    let i = 0;
	    let startPos;
	    let endPos;
	    while (i >= 0 && i < text.length) {
	        if (/\S/.test(text[i])) {
	            if (startPos === undefined) {
	                startPos = i;
	                i = text.length;
	            }
	            else {
	                endPos = i;
	                i = void 0;
	            }
	        }
	        if (startPos === undefined)
	            i++;
	        else
	            i--;
	    }
	    if (startPos === undefined)
	        startPos = 0;
	    if (endPos === undefined)
	        endPos = text.length - 1;
	    const hasLeadingSpace = startPos > 0 && /[^\S\r\n]/.test(text[startPos - 1]);
	    const hasTrailingSpace = endPos < (text.length - 1) && /[^\S\r\n]/.test(text[endPos + 1]);
	    return (hasLeadingSpace ? ' ' : '') + text.slice(startPos, endPos + 1) + (hasTrailingSpace ? ' ' : '');
	}
	return text;
}

export { requireBack as a, requireMatcher as b, requireVoidTag as c, requireText as d, requireLib as r };
