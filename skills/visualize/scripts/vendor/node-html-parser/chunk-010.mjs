// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { K as dist } from './chunk-000.mjs';
import { g as requireComment, f as requireNode, e as requireType } from './chunk-002.mjs';
import { r as requireHtml, a as requireParse, b as requireValid } from './chunk-009.mjs';
import { d as requireText } from './chunk-008.mjs';

var hasRequiredDist;

function requireDist () {
	if (hasRequiredDist) return dist;
	hasRequiredDist = 1;
	var __importDefault = (dist && dist.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(dist, "__esModule", { value: true });
	dist.NodeType = dist.TextNode = dist.Node = dist.valid = dist.CommentNode = dist.HTMLElement = dist.parse = void 0;
	const comment_1 = __importDefault(/*@__PURE__*/ requireComment());
	dist.CommentNode = comment_1.default;
	const html_1 = __importDefault(/*@__PURE__*/ requireHtml());
	dist.HTMLElement = html_1.default;
	const node_1 = __importDefault(/*@__PURE__*/ requireNode());
	dist.Node = node_1.default;
	const text_1 = __importDefault(/*@__PURE__*/ requireText());
	dist.TextNode = text_1.default;
	const type_1 = __importDefault(/*@__PURE__*/ requireType());
	dist.NodeType = type_1.default;
	const parse_1 = __importDefault(/*@__PURE__*/ requireParse());
	const valid_1 = __importDefault(/*@__PURE__*/ requireValid());
	dist.valid = valid_1.default;
	function parse(data, options = {}) {
	    return (0, parse_1.default)(data, options);
	}
	dist.default = parse;
	dist.parse = parse;
	parse.parse = parse_1.default;
	parse.HTMLElement = html_1.default;
	parse.CommentNode = comment_1.default;
	parse.valid = valid_1.default;
	parse.Node = node_1.default;
	parse.TextNode = text_1.default;
	parse.NodeType = type_1.default;
	return dist;
}

var distExports = /*@__PURE__*/ requireDist();

export { distExports as d };
