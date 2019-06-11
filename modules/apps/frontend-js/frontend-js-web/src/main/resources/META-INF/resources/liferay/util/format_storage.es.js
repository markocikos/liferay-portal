const DEFAULT_OPTIONS = {
	addSpaceBeforeSuffix: false,
	decimalSeparator: '',
	denominator: 1024.0,
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
		denominator,
		suffixGB,
		suffixKB,
		suffixMB
	} = {
		...DEFAULT_OPTIONS,
		...options
	};

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

	let convertedSize = size.toFixed(decimalPlaces);

	if (decimalSeparator.length !== 0) {
		convertedSize = convertedSize.replace(/\./, decimalSeparator);
	}

	return convertedSize + (addSpaceBeforeSuffix ? ' ' : '') + suffix;
}
