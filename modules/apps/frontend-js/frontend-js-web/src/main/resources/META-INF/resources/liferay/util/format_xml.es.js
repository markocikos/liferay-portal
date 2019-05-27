import {isString} from 'metal';

/**
 * Returns a formatted XML
 * @param content String to format
 * @return {!String} Formatted content
 */

export default function formatXML(content) {
	if (!isString(content)) {
		throw new TypeError('Parameter content must be a string');
	}

	const LINE_INDENT = '\r\n';

	const REGEX_DECLARATIVE_CLOSE = /-->|\]>/;

	const REGEX_DECLARATIVE_OPEN = /<!/;

	const REGEX_DIRECTIVE = /<\?/;

	const REGEX_DOCTYPE = /!DOCTYPE/;

	const REGEX_ELEMENT = /^<\w/;

	const REGEX_ELEMENT_CLOSE = /^<\/\w/;

	const REGEX_ELEMENT_NAMESPACED = /^<[\w:\-\.\,]+/;

	const REGEX_ELEMENT_NAMESPACED_CLOSE = /^<\/[\w:\-\.\,]+/;

	const REGEX_ELEMENT_OPEN = /<\w/;

	const REGEX_NAMESPACE_XML = /xmlns(?:\:|\=)/g;

	const REGEX_NAMESPACE_XML_ATTR = /\s*(xmlns)(\:|\=)/g;

	const REGEX_TAG_CLOSE = /<\//;

	const REGEX_TAG_OPEN = /</g;

	const REGEX_TAG_SINGLE_CLOSE = /\/>/;

	const REGEX_WHITESPACE_BETWEEN_TAGS = />\s+</g;

	const STR_BLANK = '';

	const STR_TOKEN = '~::~';

	const TAG_INDENT = '\t';

	content = content.replace(REGEX_WHITESPACE_BETWEEN_TAGS, '><');
	content = content.replace(REGEX_TAG_OPEN, STR_TOKEN + '<');
	content = content.replace(REGEX_NAMESPACE_XML_ATTR, STR_TOKEN + '$1$2');

	let commentCounter = 0;
	let inComment = false;
	let items = content.split(STR_TOKEN);
	let level = 0;
	let result = '';

	items.forEach(
		(item, index) => {
			if (REGEX_DECLARATIVE_OPEN.test(item)) {
				result += _indent(LINE_INDENT, TAG_INDENT, level) + item;

				commentCounter++;

				inComment = true;

				if (REGEX_DECLARATIVE_CLOSE.test(item) || REGEX_DOCTYPE.test(item)) {
					commentCounter--;

					inComment = commentCounter !== 0;
				}
			}
			else if (REGEX_DECLARATIVE_CLOSE.test(item)) {
				result += item;

				commentCounter--;

				inComment = commentCounter !== 0;
			}
			else if (REGEX_ELEMENT.exec(items[index - 1]) && REGEX_ELEMENT_CLOSE.exec(item) &&
				REGEX_ELEMENT_NAMESPACED.exec(items[index - 1]) == REGEX_ELEMENT_NAMESPACED_CLOSE.exec(item)[0].replace('/', STR_BLANK)) {
				result += item;

				!inComment && --level;
			}
			else if (REGEX_ELEMENT_OPEN.test(item) && !REGEX_TAG_CLOSE.test(item) && !REGEX_TAG_SINGLE_CLOSE.test(item)) {
				if (inComment) {
					result += item;
				}
				else {
					result += _indent(LINE_INDENT, TAG_INDENT, level++) + item;
				}
			}
			else if (REGEX_ELEMENT_OPEN.test(item) && REGEX_TAG_CLOSE.test(item)) {
				if (inComment) {
					result += item;
				}
				else {
					result += _indent(LINE_INDENT, TAG_INDENT, level) + item;
				}
			}
			else if (REGEX_TAG_CLOSE.test(item)) {
				if (inComment) {
					result += item;
				}
				else {
					result += _indent(LINE_INDENT, TAG_INDENT, --level) + item;
				}
			}
			else if (REGEX_TAG_SINGLE_CLOSE.test(item)) {
				if (inComment) {
					result += item;
				}
				else {
					result += _indent(LINE_INDENT, TAG_INDENT, level) + item;
				}
			}
			else if (REGEX_DIRECTIVE.test(item)) {
				result += _indent(LINE_INDENT, TAG_INDENT, level) + item;
			}
			else if (REGEX_NAMESPACE_XML) {
				result += _indent(LINE_INDENT, TAG_INDENT, level) + item;
			}
			else {
				result += item;
			}
		}
	);

	if (new RegExp('^' + LINE_INDENT).test(result)) {
		result = result.slice(LINE_INDENT.length);
	}

	return result;
}

/**
 * Returns an indented string
 * @param lineIndent Line indentation
 * @param separator Line separator
 * @param times How many times to indent
 * @return {String} Indented String
 */
function _indent(lineIndent, separator, times) {
	return lineIndent + new Array(times + 1).join(separator);
}