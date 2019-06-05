const ADD_SPACE_BEFORE_SUFFIX = false;
const DENOMINATOR = 1024.0;
const STR_SPACE = ' ';
const SUFFIX_GB = 'GB';
const SUFFIX_KB = 'KB';
const SUFFIX_MB = 'MB';

const DEFAULT_OPTIONS = {
	addSpaceBeforeSuffix: ADD_SPACE_BEFORE_SUFFIX,
	denominator: DENOMINATOR,
	strSpace: STR_SPACE,
	suffixGB: SUFFIX_GB,
	suffixKB: SUFFIX_KB,
	suffixMB: SUFFIX_MB
};

/**
 * Returns storage number formatted as a String
 * @param {!Number} size Storage size to be formatted
 * @param {!Object} options Object representing optional parameters for
 * formatting storage size
 * @return {String} formattedStorage Final formatted storage outputted as a String
 */
export default function formatStorage(size, options = {}) {
	const {addSpaceBeforeSuffix, denominator, strSpace, suffixGB, suffixKB, suffixMB} = {
		...DEFAULT_OPTIONS,
		...options
	};

	let suffix = suffixKB;

	size /= denominator;

	if (size >= denominator) {
		suffix = suffixMB;

		size /= denominator;
	}

	if (size >= denominator) {
		suffix = suffixGB;

		size /= denominator;
	}

	let decimalPlaces = _getDecimalPlaces(size, suffix);

	return size.toFixed(decimalPlaces).toString() + (addSpaceBeforeSuffix ? strSpace + suffix : suffix);
}

/**
 * Returns decimal places to round storage size number according to storage size
 * suffix type
 * @param {!Number} size Storage size to be formatted
 * @param {!String} suffix Storage suffix String required for rounding storage
 * size
 * @param {!Object} options Object representing optional parameters for
 * formatting storage size
 * @return {number} decimalPlaces Number used to format
 */
function _getDecimalPlaces(size, suffix, options = {}) {
	const {suffixKB} = {
		...DEFAULT_OPTIONS,
		...options
	};

	let decimalPlaces = 1;

	if (suffix === suffixKB) {
		decimalPlaces = 0;
	}

	return decimalPlaces;
}