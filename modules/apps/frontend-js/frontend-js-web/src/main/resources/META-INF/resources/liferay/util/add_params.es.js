/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

/**
 * Adds the parameters included in the path to the portlet URL and returns finalURL
 * @param {String | Object} params
 * @param {String} url 
 * @return {String} finalUrl Final url returned as a String
 * @review
 */
export default function addParams(params, url) {
	if (typeof params !== 'object' && typeof params !== 'string') {
		throw new TypeError('Parameter params must be an object or string');
	}

	if (typeof url !== 'string') {
		throw new TypeError('Parameter url must be a string');
	}

	if (typeof params === 'object') {
		const paramKeys = Object.keys(params);

		params = paramKeys
			.map(function(key) {
				return (
					encodeURIComponent(key) +
					'=' +
					encodeURIComponent(params[key])
				);
			})
			.join('&');
	} else {
		params = String(params).trim();
	}

	let loc = url || location.href;

	let finalUrl = loc;

	if (params) {
		let anchorHash;

		if (loc.indexOf('#') > -1) {
			const locationPieces = loc.split('#');

			loc = locationPieces[0];
			anchorHash = locationPieces[1];
		}

		if (loc.indexOf('?') === -1) {
			params = '?' + params;
		} else {
			params = '&' + params;
		}

		if (loc.indexOf(params) === -1) {
			finalUrl = loc + params;

			if (anchorHash) {
				finalUrl += '#' + anchorHash;
			}
			if (!url) {
				location.href = finalUrl;
			}
		}
	}

	return finalUrl;
}
