// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { l as lib, i as node, j as lib$1, q as querying, k as general, r as require$$0, m as compile } from './chunk-000.mjs';
import { r as requireAttributes, a as requirePseudoSelectors, b as requireBoolbase, c as requireSort, d as requireSubselects } from './chunk-002.mjs';

var hasRequiredLib$1;

function requireLib$1 () {
	if (hasRequiredLib$1) return lib;
	hasRequiredLib$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.Doctype = exports.CDATA = exports.Tag = exports.Style = exports.Script = exports.Comment = exports.Directive = exports.Text = exports.Root = exports.isTag = exports.ElementType = void 0;
		/** Types of elements found in htmlparser2's DOM */
		var ElementType;
		(function (ElementType) {
		    /** Type for the root element of a document */
		    ElementType["Root"] = "root";
		    /** Type for Text */
		    ElementType["Text"] = "text";
		    /** Type for <? ... ?> */
		    ElementType["Directive"] = "directive";
		    /** Type for <!-- ... --> */
		    ElementType["Comment"] = "comment";
		    /** Type for <script> tags */
		    ElementType["Script"] = "script";
		    /** Type for <style> tags */
		    ElementType["Style"] = "style";
		    /** Type for Any tag */
		    ElementType["Tag"] = "tag";
		    /** Type for <![CDATA[ ... ]]> */
		    ElementType["CDATA"] = "cdata";
		    /** Type for <!doctype ...> */
		    ElementType["Doctype"] = "doctype";
		})(ElementType = exports.ElementType || (exports.ElementType = {}));
		/**
		 * Tests whether an element is a tag or not.
		 *
		 * @param elem Element to test
		 */
		function isTag(elem) {
		    return (elem.type === ElementType.Tag ||
		        elem.type === ElementType.Script ||
		        elem.type === ElementType.Style);
		}
		exports.isTag = isTag;
		// Exports for backwards compatibility
		/** Type for the root element of a document */
		exports.Root = ElementType.Root;
		/** Type for Text */
		exports.Text = ElementType.Text;
		/** Type for <? ... ?> */
		exports.Directive = ElementType.Directive;
		/** Type for <!-- ... --> */
		exports.Comment = ElementType.Comment;
		/** Type for <script> tags */
		exports.Script = ElementType.Script;
		/** Type for <style> tags */
		exports.Style = ElementType.Style;
		/** Type for Any tag */
		exports.Tag = ElementType.Tag;
		/** Type for <![CDATA[ ... ]]> */
		exports.CDATA = ElementType.CDATA;
		/** Type for <!doctype ...> */
		exports.Doctype = ElementType.Doctype; 
	} (lib));
	return lib;
}

var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node;
	hasRequiredNode = 1;
	var __extends = (node && node.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        if (typeof b !== "function" && b !== null)
	            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (node && node.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};
	Object.defineProperty(node, "__esModule", { value: true });
	node.cloneNode = node.hasChildren = node.isDocument = node.isDirective = node.isComment = node.isText = node.isCDATA = node.isTag = node.Element = node.Document = node.CDATA = node.NodeWithChildren = node.ProcessingInstruction = node.Comment = node.Text = node.DataNode = node.Node = void 0;
	var domelementtype_1 = /*@__PURE__*/ requireLib$1();
	/**
	 * This object will be used as the prototype for Nodes when creating a
	 * DOM-Level-1-compliant structure.
	 */
	var Node = /** @class */ (function () {
	    function Node() {
	        /** Parent of the node */
	        this.parent = null;
	        /** Previous sibling */
	        this.prev = null;
	        /** Next sibling */
	        this.next = null;
	        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
	        this.startIndex = null;
	        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
	        this.endIndex = null;
	    }
	    Object.defineProperty(Node.prototype, "parentNode", {
	        // Read-write aliases for properties
	        /**
	         * Same as {@link parent}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.parent;
	        },
	        set: function (parent) {
	            this.parent = parent;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "previousSibling", {
	        /**
	         * Same as {@link prev}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.prev;
	        },
	        set: function (prev) {
	            this.prev = prev;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Node.prototype, "nextSibling", {
	        /**
	         * Same as {@link next}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.next;
	        },
	        set: function (next) {
	            this.next = next;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    /**
	     * Clone this node, and optionally its children.
	     *
	     * @param recursive Clone child nodes as well.
	     * @returns A clone of the node.
	     */
	    Node.prototype.cloneNode = function (recursive) {
	        if (recursive === void 0) { recursive = false; }
	        return cloneNode(this, recursive);
	    };
	    return Node;
	}());
	node.Node = Node;
	/**
	 * A node that contains some data.
	 */
	var DataNode = /** @class */ (function (_super) {
	    __extends(DataNode, _super);
	    /**
	     * @param data The content of the data node
	     */
	    function DataNode(data) {
	        var _this = _super.call(this) || this;
	        _this.data = data;
	        return _this;
	    }
	    Object.defineProperty(DataNode.prototype, "nodeValue", {
	        /**
	         * Same as {@link data}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.data;
	        },
	        set: function (data) {
	            this.data = data;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return DataNode;
	}(Node));
	node.DataNode = DataNode;
	/**
	 * Text within the document.
	 */
	var Text = /** @class */ (function (_super) {
	    __extends(Text, _super);
	    function Text() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.Text;
	        return _this;
	    }
	    Object.defineProperty(Text.prototype, "nodeType", {
	        get: function () {
	            return 3;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Text;
	}(DataNode));
	node.Text = Text;
	/**
	 * Comments within the document.
	 */
	var Comment = /** @class */ (function (_super) {
	    __extends(Comment, _super);
	    function Comment() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.Comment;
	        return _this;
	    }
	    Object.defineProperty(Comment.prototype, "nodeType", {
	        get: function () {
	            return 8;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Comment;
	}(DataNode));
	node.Comment = Comment;
	/**
	 * Processing instructions, including doc types.
	 */
	var ProcessingInstruction = /** @class */ (function (_super) {
	    __extends(ProcessingInstruction, _super);
	    function ProcessingInstruction(name, data) {
	        var _this = _super.call(this, data) || this;
	        _this.name = name;
	        _this.type = domelementtype_1.ElementType.Directive;
	        return _this;
	    }
	    Object.defineProperty(ProcessingInstruction.prototype, "nodeType", {
	        get: function () {
	            return 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return ProcessingInstruction;
	}(DataNode));
	node.ProcessingInstruction = ProcessingInstruction;
	/**
	 * A `Node` that can have children.
	 */
	var NodeWithChildren = /** @class */ (function (_super) {
	    __extends(NodeWithChildren, _super);
	    /**
	     * @param children Children of the node. Only certain node types can have children.
	     */
	    function NodeWithChildren(children) {
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
	        // Aliases
	        /** First child of the node. */
	        get: function () {
	            var _a;
	            return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
	        /** Last child of the node. */
	        get: function () {
	            return this.children.length > 0
	                ? this.children[this.children.length - 1]
	                : null;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
	        /**
	         * Same as {@link children}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.children;
	        },
	        set: function (children) {
	            this.children = children;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return NodeWithChildren;
	}(Node));
	node.NodeWithChildren = NodeWithChildren;
	var CDATA = /** @class */ (function (_super) {
	    __extends(CDATA, _super);
	    function CDATA() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.CDATA;
	        return _this;
	    }
	    Object.defineProperty(CDATA.prototype, "nodeType", {
	        get: function () {
	            return 4;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return CDATA;
	}(NodeWithChildren));
	node.CDATA = CDATA;
	/**
	 * The root node of the document.
	 */
	var Document = /** @class */ (function (_super) {
	    __extends(Document, _super);
	    function Document() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = domelementtype_1.ElementType.Root;
	        return _this;
	    }
	    Object.defineProperty(Document.prototype, "nodeType", {
	        get: function () {
	            return 9;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Document;
	}(NodeWithChildren));
	node.Document = Document;
	/**
	 * An element within the DOM.
	 */
	var Element = /** @class */ (function (_super) {
	    __extends(Element, _super);
	    /**
	     * @param name Name of the tag, eg. `div`, `span`.
	     * @param attribs Object mapping attribute names to attribute values.
	     * @param children Children of the node.
	     */
	    function Element(name, attribs, children, type) {
	        if (children === void 0) { children = []; }
	        if (type === void 0) { type = name === "script"
	            ? domelementtype_1.ElementType.Script
	            : name === "style"
	                ? domelementtype_1.ElementType.Style
	                : domelementtype_1.ElementType.Tag; }
	        var _this = _super.call(this, children) || this;
	        _this.name = name;
	        _this.attribs = attribs;
	        _this.type = type;
	        return _this;
	    }
	    Object.defineProperty(Element.prototype, "nodeType", {
	        get: function () {
	            return 1;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Element.prototype, "tagName", {
	        // DOM Level 1 aliases
	        /**
	         * Same as {@link name}.
	         * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
	         */
	        get: function () {
	            return this.name;
	        },
	        set: function (name) {
	            this.name = name;
	        },
	        enumerable: false,
	        configurable: true
	    });
	    Object.defineProperty(Element.prototype, "attributes", {
	        get: function () {
	            var _this = this;
	            return Object.keys(this.attribs).map(function (name) {
	                var _a, _b;
	                return ({
	                    name: name,
	                    value: _this.attribs[name],
	                    namespace: (_a = _this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
	                    prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name],
	                });
	            });
	        },
	        enumerable: false,
	        configurable: true
	    });
	    return Element;
	}(NodeWithChildren));
	node.Element = Element;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node is a `Element`, `false` otherwise.
	 */
	function isTag(node) {
	    return (0, domelementtype_1.isTag)(node);
	}
	node.isTag = isTag;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `CDATA`, `false` otherwise.
	 */
	function isCDATA(node) {
	    return node.type === domelementtype_1.ElementType.CDATA;
	}
	node.isCDATA = isCDATA;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Text`, `false` otherwise.
	 */
	function isText(node) {
	    return node.type === domelementtype_1.ElementType.Text;
	}
	node.isText = isText;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `Comment`, `false` otherwise.
	 */
	function isComment(node) {
	    return node.type === domelementtype_1.ElementType.Comment;
	}
	node.isComment = isComment;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDirective(node) {
	    return node.type === domelementtype_1.ElementType.Directive;
	}
	node.isDirective = isDirective;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
	 */
	function isDocument(node) {
	    return node.type === domelementtype_1.ElementType.Root;
	}
	node.isDocument = isDocument;
	/**
	 * @param node Node to check.
	 * @returns `true` if the node has children, `false` otherwise.
	 */
	function hasChildren(node) {
	    return Object.prototype.hasOwnProperty.call(node, "children");
	}
	node.hasChildren = hasChildren;
	/**
	 * Clone a node, and optionally its children.
	 *
	 * @param recursive Clone child nodes as well.
	 * @returns A clone of the node.
	 */
	function cloneNode(node, recursive) {
	    if (recursive === void 0) { recursive = false; }
	    var result;
	    if (isText(node)) {
	        result = new Text(node.data);
	    }
	    else if (isComment(node)) {
	        result = new Comment(node.data);
	    }
	    else if (isTag(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
	        children.forEach(function (child) { return (child.parent = clone_1); });
	        if (node.namespace != null) {
	            clone_1.namespace = node.namespace;
	        }
	        if (node["x-attribsNamespace"]) {
	            clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
	        }
	        if (node["x-attribsPrefix"]) {
	            clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
	        }
	        result = clone_1;
	    }
	    else if (isCDATA(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_2 = new CDATA(children);
	        children.forEach(function (child) { return (child.parent = clone_2); });
	        result = clone_2;
	    }
	    else if (isDocument(node)) {
	        var children = recursive ? cloneChildren(node.children) : [];
	        var clone_3 = new Document(children);
	        children.forEach(function (child) { return (child.parent = clone_3); });
	        if (node["x-mode"]) {
	            clone_3["x-mode"] = node["x-mode"];
	        }
	        result = clone_3;
	    }
	    else if (isDirective(node)) {
	        var instruction = new ProcessingInstruction(node.name, node.data);
	        if (node["x-name"] != null) {
	            instruction["x-name"] = node["x-name"];
	            instruction["x-publicId"] = node["x-publicId"];
	            instruction["x-systemId"] = node["x-systemId"];
	        }
	        result = instruction;
	    }
	    else {
	        throw new Error("Not implemented yet: ".concat(node.type));
	    }
	    result.startIndex = node.startIndex;
	    result.endIndex = node.endIndex;
	    if (node.sourceCodeLocation != null) {
	        result.sourceCodeLocation = node.sourceCodeLocation;
	    }
	    return result;
	}
	node.cloneNode = cloneNode;
	function cloneChildren(childs) {
	    var children = childs.map(function (child) { return cloneNode(child, true); });
	    for (var i = 1; i < children.length; i++) {
	        children[i].prev = children[i - 1];
	        children[i - 1].next = children[i];
	    }
	    return children;
	}
	return node;
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
		var __exportStar = (lib$1 && lib$1.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.DomHandler = void 0;
		var domelementtype_1 = /*@__PURE__*/ requireLib$1();
		var node_js_1 = /*@__PURE__*/ requireNode();
		__exportStar(/*@__PURE__*/ requireNode(), exports);
		// Default options
		var defaultOpts = {
		    withStartIndices: false,
		    withEndIndices: false,
		    xmlMode: false,
		};
		var DomHandler = /** @class */ (function () {
		    /**
		     * @param callback Called once parsing has completed.
		     * @param options Settings for the handler.
		     * @param elementCB Callback whenever a tag is closed.
		     */
		    function DomHandler(callback, options, elementCB) {
		        /** The elements of the DOM */
		        this.dom = [];
		        /** The root element for the DOM */
		        this.root = new node_js_1.Document(this.dom);
		        /** Indicated whether parsing has been completed. */
		        this.done = false;
		        /** Stack of open tags. */
		        this.tagStack = [this.root];
		        /** A data node that is still being written to. */
		        this.lastNode = null;
		        /** Reference to the parser instance. Used for location information. */
		        this.parser = null;
		        // Make it possible to skip arguments, for backwards-compatibility
		        if (typeof options === "function") {
		            elementCB = options;
		            options = defaultOpts;
		        }
		        if (typeof callback === "object") {
		            options = callback;
		            callback = undefined;
		        }
		        this.callback = callback !== null && callback !== void 0 ? callback : null;
		        this.options = options !== null && options !== void 0 ? options : defaultOpts;
		        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
		    }
		    DomHandler.prototype.onparserinit = function (parser) {
		        this.parser = parser;
		    };
		    // Resets the handler back to starting state
		    DomHandler.prototype.onreset = function () {
		        this.dom = [];
		        this.root = new node_js_1.Document(this.dom);
		        this.done = false;
		        this.tagStack = [this.root];
		        this.lastNode = null;
		        this.parser = null;
		    };
		    // Signals the handler that parsing is done
		    DomHandler.prototype.onend = function () {
		        if (this.done)
		            return;
		        this.done = true;
		        this.parser = null;
		        this.handleCallback(null);
		    };
		    DomHandler.prototype.onerror = function (error) {
		        this.handleCallback(error);
		    };
		    DomHandler.prototype.onclosetag = function () {
		        this.lastNode = null;
		        var elem = this.tagStack.pop();
		        if (this.options.withEndIndices) {
		            elem.endIndex = this.parser.endIndex;
		        }
		        if (this.elementCB)
		            this.elementCB(elem);
		    };
		    DomHandler.prototype.onopentag = function (name, attribs) {
		        var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
		        var element = new node_js_1.Element(name, attribs, undefined, type);
		        this.addNode(element);
		        this.tagStack.push(element);
		    };
		    DomHandler.prototype.ontext = function (data) {
		        var lastNode = this.lastNode;
		        if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
		            lastNode.data += data;
		            if (this.options.withEndIndices) {
		                lastNode.endIndex = this.parser.endIndex;
		            }
		        }
		        else {
		            var node = new node_js_1.Text(data);
		            this.addNode(node);
		            this.lastNode = node;
		        }
		    };
		    DomHandler.prototype.oncomment = function (data) {
		        if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
		            this.lastNode.data += data;
		            return;
		        }
		        var node = new node_js_1.Comment(data);
		        this.addNode(node);
		        this.lastNode = node;
		    };
		    DomHandler.prototype.oncommentend = function () {
		        this.lastNode = null;
		    };
		    DomHandler.prototype.oncdatastart = function () {
		        var text = new node_js_1.Text("");
		        var node = new node_js_1.CDATA([text]);
		        this.addNode(node);
		        text.parent = node;
		        this.lastNode = text;
		    };
		    DomHandler.prototype.oncdataend = function () {
		        this.lastNode = null;
		    };
		    DomHandler.prototype.onprocessinginstruction = function (name, data) {
		        var node = new node_js_1.ProcessingInstruction(name, data);
		        this.addNode(node);
		    };
		    DomHandler.prototype.handleCallback = function (error) {
		        if (typeof this.callback === "function") {
		            this.callback(error, this.dom);
		        }
		        else if (error) {
		            throw error;
		        }
		    };
		    DomHandler.prototype.addNode = function (node) {
		        var parent = this.tagStack[this.tagStack.length - 1];
		        var previousSibling = parent.children[parent.children.length - 1];
		        if (this.options.withStartIndices) {
		            node.startIndex = this.parser.startIndex;
		        }
		        if (this.options.withEndIndices) {
		            node.endIndex = this.parser.endIndex;
		        }
		        parent.children.push(node);
		        if (previousSibling) {
		            node.prev = previousSibling;
		            previousSibling.next = node;
		        }
		        node.parent = parent;
		        this.lastNode = null;
		    };
		    return DomHandler;
		}());
		exports.DomHandler = DomHandler;
		exports.default = DomHandler; 
	} (lib$1));
	return lib$1;
}

var hasRequiredQuerying;

function requireQuerying () {
	if (hasRequiredQuerying) return querying;
	hasRequiredQuerying = 1;
	Object.defineProperty(querying, "__esModule", { value: true });
	querying.filter = filter;
	querying.find = find;
	querying.findOneChild = findOneChild;
	querying.findOne = findOne;
	querying.existsOne = existsOne;
	querying.findAll = findAll;
	var domhandler_1 = /*@__PURE__*/ requireLib();
	/**
	 * Search a node and its children for nodes passing a test function. If `node` is not an array, it will be wrapped in one.
	 *
	 * @category Querying
	 * @param test Function to test nodes on.
	 * @param node Node to search. Will be included in the result set if it matches.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes passing `test`.
	 */
	function filter(test, node, recurse, limit) {
	    if (recurse === void 0) { recurse = true; }
	    if (limit === void 0) { limit = Infinity; }
	    return find(test, Array.isArray(node) ? node : [node], recurse, limit);
	}
	/**
	 * Search an array of nodes and their children for nodes passing a test function.
	 *
	 * @category Querying
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @param recurse Also consider child nodes.
	 * @param limit Maximum number of nodes to return.
	 * @returns All nodes passing `test`.
	 */
	function find(test, nodes, recurse, limit) {
	    var result = [];
	    /** Stack of the arrays we are looking at. */
	    var nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
	    /** Stack of the indices within the arrays. */
	    var indexStack = [0];
	    for (;;) {
	        // First, check if the current array has any more elements to look at.
	        if (indexStack[0] >= nodeStack[0].length) {
	            // If we have no more arrays to look at, we are done.
	            if (indexStack.length === 1) {
	                return result;
	            }
	            // Otherwise, remove the current array from the stack.
	            nodeStack.shift();
	            indexStack.shift();
	            // Loop back to the start to continue with the next array.
	            continue;
	        }
	        var elem = nodeStack[0][indexStack[0]++];
	        if (test(elem)) {
	            result.push(elem);
	            if (--limit <= 0)
	                return result;
	        }
	        if (recurse && (0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
	            /*
	             * Add the children to the stack. We are depth-first, so this is
	             * the next array we look at.
	             */
	            indexStack.unshift(0);
	            nodeStack.unshift(elem.children);
	        }
	    }
	}
	/**
	 * Finds the first element inside of an array that matches a test function. This is an alias for `Array.prototype.find`.
	 *
	 * @category Querying
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @returns The first node in the array that passes `test`.
	 * @deprecated Use `Array.prototype.find` directly.
	 */
	function findOneChild(test, nodes) {
	    return nodes.find(test);
	}
	/**
	 * Finds one element in a tree that passes a test.
	 *
	 * @category Querying
	 * @param test Function to test nodes on.
	 * @param nodes Node or array of nodes to search.
	 * @param recurse Also consider child nodes.
	 * @returns The first node that passes `test`.
	 */
	function findOne(test, nodes, recurse) {
	    if (recurse === void 0) { recurse = true; }
	    var searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
	    for (var i = 0; i < searchedNodes.length; i++) {
	        var node = searchedNodes[i];
	        if ((0, domhandler_1.isTag)(node) && test(node)) {
	            return node;
	        }
	        if (recurse && (0, domhandler_1.hasChildren)(node) && node.children.length > 0) {
	            var found = findOne(test, node.children, true);
	            if (found)
	                return found;
	        }
	    }
	    return null;
	}
	/**
	 * Checks if a tree of nodes contains at least one node passing a test.
	 *
	 * @category Querying
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @returns Whether a tree of nodes contains at least one node passing the test.
	 */
	function existsOne(test, nodes) {
	    return (Array.isArray(nodes) ? nodes : [nodes]).some(function (node) {
	        return ((0, domhandler_1.isTag)(node) && test(node)) ||
	            ((0, domhandler_1.hasChildren)(node) && existsOne(test, node.children));
	    });
	}
	/**
	 * Search an array of nodes and their children for elements passing a test function.
	 *
	 * Same as `find`, but limited to elements and with less options, leading to reduced complexity.
	 *
	 * @category Querying
	 * @param test Function to test nodes on.
	 * @param nodes Array of nodes to search.
	 * @returns All nodes passing `test`.
	 */
	function findAll(test, nodes) {
	    var result = [];
	    var nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
	    var indexStack = [0];
	    for (;;) {
	        if (indexStack[0] >= nodeStack[0].length) {
	            if (nodeStack.length === 1) {
	                return result;
	            }
	            // Otherwise, remove the current array from the stack.
	            nodeStack.shift();
	            indexStack.shift();
	            // Loop back to the start to continue with the next array.
	            continue;
	        }
	        var elem = nodeStack[0][indexStack[0]++];
	        if ((0, domhandler_1.isTag)(elem) && test(elem))
	            result.push(elem);
	        if ((0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
	            indexStack.unshift(0);
	            nodeStack.unshift(elem.children);
	        }
	    }
	}
	
	return querying;
}

var hasRequiredGeneral;

function requireGeneral () {
	if (hasRequiredGeneral) return general;
	hasRequiredGeneral = 1;
	Object.defineProperty(general, "__esModule", { value: true });
	general.compileGeneralSelector = void 0;
	var attributes_js_1 = requireAttributes();
	var index_js_1 = requirePseudoSelectors();
	var css_what_1 = require$$0;
	function getElementParent(node, adapter) {
	    var parent = adapter.getParent(node);
	    if (parent && adapter.isTag(parent)) {
	        return parent;
	    }
	    return null;
	}
	/*
	 * All available rules
	 */
	function compileGeneralSelector(next, selector, options, context, compileToken) {
	    var adapter = options.adapter, equals = options.equals;
	    switch (selector.type) {
	        case css_what_1.SelectorType.PseudoElement: {
	            throw new Error("Pseudo-elements are not supported by css-select");
	        }
	        case css_what_1.SelectorType.ColumnCombinator: {
	            throw new Error("Column combinators are not yet supported by css-select");
	        }
	        case css_what_1.SelectorType.Attribute: {
	            if (selector.namespace != null) {
	                throw new Error("Namespaced attributes are not yet supported by css-select");
	            }
	            if (!options.xmlMode || options.lowerCaseAttributeNames) {
	                selector.name = selector.name.toLowerCase();
	            }
	            return attributes_js_1.attributeRules[selector.action](next, selector, options);
	        }
	        case css_what_1.SelectorType.Pseudo: {
	            return (0, index_js_1.compilePseudoSelector)(next, selector, options, context, compileToken);
	        }
	        // Tags
	        case css_what_1.SelectorType.Tag: {
	            if (selector.namespace != null) {
	                throw new Error("Namespaced tag names are not yet supported by css-select");
	            }
	            var name_1 = selector.name;
	            if (!options.xmlMode || options.lowerCaseTags) {
	                name_1 = name_1.toLowerCase();
	            }
	            return function tag(elem) {
	                return adapter.getName(elem) === name_1 && next(elem);
	            };
	        }
	        // Traversal
	        case css_what_1.SelectorType.Descendant: {
	            if (options.cacheResults === false ||
	                typeof WeakSet === "undefined") {
	                return function descendant(elem) {
	                    var current = elem;
	                    while ((current = getElementParent(current, adapter))) {
	                        if (next(current)) {
	                            return true;
	                        }
	                    }
	                    return false;
	                };
	            }
	            // @ts-expect-error `ElementNode` is not extending object
	            var isFalseCache_1 = new WeakSet();
	            return function cachedDescendant(elem) {
	                var current = elem;
	                while ((current = getElementParent(current, adapter))) {
	                    if (!isFalseCache_1.has(current)) {
	                        if (adapter.isTag(current) && next(current)) {
	                            return true;
	                        }
	                        isFalseCache_1.add(current);
	                    }
	                }
	                return false;
	            };
	        }
	        case "_flexibleDescendant": {
	            // Include element itself, only used while querying an array
	            return function flexibleDescendant(elem) {
	                var current = elem;
	                do {
	                    if (next(current))
	                        return true;
	                } while ((current = getElementParent(current, adapter)));
	                return false;
	            };
	        }
	        case css_what_1.SelectorType.Parent: {
	            return function parent(elem) {
	                return adapter
	                    .getChildren(elem)
	                    .some(function (elem) { return adapter.isTag(elem) && next(elem); });
	            };
	        }
	        case css_what_1.SelectorType.Child: {
	            return function child(elem) {
	                var parent = adapter.getParent(elem);
	                return parent != null && adapter.isTag(parent) && next(parent);
	            };
	        }
	        case css_what_1.SelectorType.Sibling: {
	            return function sibling(elem) {
	                var siblings = adapter.getSiblings(elem);
	                for (var i = 0; i < siblings.length; i++) {
	                    var currentSibling = siblings[i];
	                    if (equals(elem, currentSibling))
	                        break;
	                    if (adapter.isTag(currentSibling) && next(currentSibling)) {
	                        return true;
	                    }
	                }
	                return false;
	            };
	        }
	        case css_what_1.SelectorType.Adjacent: {
	            if (adapter.prevElementSibling) {
	                return function adjacent(elem) {
	                    var previous = adapter.prevElementSibling(elem);
	                    return previous != null && next(previous);
	                };
	            }
	            return function adjacent(elem) {
	                var siblings = adapter.getSiblings(elem);
	                var lastElement;
	                for (var i = 0; i < siblings.length; i++) {
	                    var currentSibling = siblings[i];
	                    if (equals(elem, currentSibling))
	                        break;
	                    if (adapter.isTag(currentSibling)) {
	                        lastElement = currentSibling;
	                    }
	                }
	                return !!lastElement && next(lastElement);
	            };
	        }
	        case css_what_1.SelectorType.Universal: {
	            if (selector.namespace != null && selector.namespace !== "*") {
	                throw new Error("Namespaced universal selectors are not yet supported by css-select");
	            }
	            return next;
	        }
	    }
	}
	general.compileGeneralSelector = compileGeneralSelector;
	
	return general;
}

var hasRequiredCompile;

function requireCompile () {
	if (hasRequiredCompile) return compile;
	hasRequiredCompile = 1;
	var __createBinding = (compile && compile.__createBinding) || (Object.create ? (function(o, m, k, k2) {
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
	var __setModuleDefault = (compile && compile.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (compile && compile.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (compile && compile.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(compile, "__esModule", { value: true });
	compile.compileToken = compile.compileUnsafe = compile.compile = void 0;
	var css_what_1 = require$$0;
	var boolbase_1 = __importDefault(requireBoolbase());
	var sort_js_1 = __importStar(requireSort());
	var general_js_1 = requireGeneral();
	var subselects_js_1 = requireSubselects();
	/**
	 * Compiles a selector to an executable function.
	 *
	 * @param selector Selector to compile.
	 * @param options Compilation options.
	 * @param context Optional context for the selector.
	 */
	function compile$1(selector, options, context) {
	    var next = compileUnsafe(selector, options, context);
	    return (0, subselects_js_1.ensureIsTag)(next, options.adapter);
	}
	compile.compile = compile$1;
	function compileUnsafe(selector, options, context) {
	    var token = typeof selector === "string" ? (0, css_what_1.parse)(selector) : selector;
	    return compileToken(token, options, context);
	}
	compile.compileUnsafe = compileUnsafe;
	function includesScopePseudo(t) {
	    return (t.type === css_what_1.SelectorType.Pseudo &&
	        (t.name === "scope" ||
	            (Array.isArray(t.data) &&
	                t.data.some(function (data) { return data.some(includesScopePseudo); }))));
	}
	var DESCENDANT_TOKEN = { type: css_what_1.SelectorType.Descendant };
	var FLEXIBLE_DESCENDANT_TOKEN = {
	    type: "_flexibleDescendant",
	};
	var SCOPE_TOKEN = {
	    type: css_what_1.SelectorType.Pseudo,
	    name: "scope",
	    data: null,
	};
	/*
	 * CSS 4 Spec (Draft): 3.4.1. Absolutizing a Relative Selector
	 * http://www.w3.org/TR/selectors4/#absolutizing
	 */
	function absolutize(token, _a, context) {
	    var adapter = _a.adapter;
	    // TODO Use better check if the context is a document
	    var hasContext = !!(context === null || context === void 0 ? void 0 : context.every(function (e) {
	        var parent = adapter.isTag(e) && adapter.getParent(e);
	        return e === subselects_js_1.PLACEHOLDER_ELEMENT || (parent && adapter.isTag(parent));
	    }));
	    for (var _i = 0, token_1 = token; _i < token_1.length; _i++) {
	        var t = token_1[_i];
	        if (t.length > 0 &&
	            (0, sort_js_1.isTraversal)(t[0]) &&
	            t[0].type !== css_what_1.SelectorType.Descendant) ;
	        else if (hasContext && !t.some(includesScopePseudo)) {
	            t.unshift(DESCENDANT_TOKEN);
	        }
	        else {
	            continue;
	        }
	        t.unshift(SCOPE_TOKEN);
	    }
	}
	function compileToken(token, options, context) {
	    var _a;
	    token.forEach(sort_js_1.default);
	    context = (_a = options.context) !== null && _a !== void 0 ? _a : context;
	    var isArrayContext = Array.isArray(context);
	    var finalContext = context && (Array.isArray(context) ? context : [context]);
	    // Check if the selector is relative
	    if (options.relativeSelector !== false) {
	        absolutize(token, options, finalContext);
	    }
	    else if (token.some(function (t) { return t.length > 0 && (0, sort_js_1.isTraversal)(t[0]); })) {
	        throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
	    }
	    var shouldTestNextSiblings = false;
	    var query = token
	        .map(function (rules) {
	        if (rules.length >= 2) {
	            var first = rules[0], second = rules[1];
	            if (first.type !== css_what_1.SelectorType.Pseudo ||
	                first.name !== "scope") ;
	            else if (isArrayContext &&
	                second.type === css_what_1.SelectorType.Descendant) {
	                rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
	            }
	            else if (second.type === css_what_1.SelectorType.Adjacent ||
	                second.type === css_what_1.SelectorType.Sibling) {
	                shouldTestNextSiblings = true;
	            }
	        }
	        return compileRules(rules, options, finalContext);
	    })
	        .reduce(reduceRules, boolbase_1.default.falseFunc);
	    query.shouldTestNextSiblings = shouldTestNextSiblings;
	    return query;
	}
	compile.compileToken = compileToken;
	function compileRules(rules, options, context) {
	    var _a;
	    return rules.reduce(function (previous, rule) {
	        return previous === boolbase_1.default.falseFunc
	            ? boolbase_1.default.falseFunc
	            : (0, general_js_1.compileGeneralSelector)(previous, rule, options, context, compileToken);
	    }, (_a = options.rootFunc) !== null && _a !== void 0 ? _a : boolbase_1.default.trueFunc);
	}
	function reduceRules(a, b) {
	    if (b === boolbase_1.default.falseFunc || a === boolbase_1.default.trueFunc) {
	        return a;
	    }
	    if (a === boolbase_1.default.falseFunc || b === boolbase_1.default.trueFunc) {
	        return b;
	    }
	    return function combine(elem) {
	        return a(elem) || b(elem);
	    };
	}
	
	return compile;
}

export { requireLib as a, requireLib$1 as b, requireCompile as c, requireQuerying as r };
