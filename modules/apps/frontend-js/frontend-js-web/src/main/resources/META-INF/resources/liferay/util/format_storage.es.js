import {isNumber} from 'metal';
import {isObject} from 'metal';

const DEFAULT_OPTIONS = {
	addSpaceBeforeSuffix: false,
	decimalSeparator: '.',
	suffixGB: 'GB',
	suffixKB: 'KB',
	suffixMB: 'MB'
};

/**
 * Returns storage number formatted as a String
 * @param {!Number} size Storage size to be formatted
 * @param {Object} options Object representing optional parameters for
 * formatting storage size
 * @return {String} formattedStorage Final formatted storage outputted as a String
 * @review
 */
export default function formatStorage(size, options = {}) {
	const {
		addSpaceBeforeSuffix,
		decimalSeparator,
		suffixGB,
		suffixKB,
		suffixMB
	} = {
		...DEFAULT_OPTIONS,
		...options
	};

	if (!isNumber(size)) {
		throw new TypeError('Parameter size must be a string');
	}

	if (!isObject(options)) {
		throw new TypeError('Parameter options must be a object');
	}

	const denominator = 1024.0;
	let decimalPlaces = 0;
	let suffix = suffixKB;

	size /= denominator;

	if (size >= denominator) {
		suffix = suffixMB;

		size /= denominator;
		decimalPlaces = 1;
	}

	if (size >= denominator) {
		suffix = suffixGB;

		size /= denominator;
		decimalPlaces = 1;
	}

	let fixedSize = size.toFixed(decimalPlaces);

	if (decimalSeparator !== '.') {
		fixedSize = fixedSize.replace(/\./, decimalSeparator);
	}

	return fixedSize + (addSpaceBeforeSuffix ? ' ' : '') + suffix;
}
