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

import fetch from './../../util/fetch.es';
import {isString} from 'metal';

const TOKEN_SERIALIZE = 'serialize://';

/**
 * Gets the Store utility fetch values
 * @param {!String} cmd
 * @param keys
 * @param callback
 * @review
 */

export default function getStoreValues(cmd, keys, callback) {
	cmd = 'getAll';

	const doAsUserIdEncoded = Liferay.ThemeDisplay.getDoAsUserIdEncoded();

	const url = `${Liferay.ThemeDisplay.getPathMain()}/portal/session_click?p_auth=${
		Liferay.authToken
	}${
		doAsUserIdEncoded ? '&doAsUserId=' + doAsUserIdEncoded : ''
	}&cmd=${cmd}&key=${keys}`;

	fetch(url, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then(response => {
			return response.text();
		})
		.then(response => {
			if (!isString(response)) {
				throw new TypeError('Response must be a string');
			}

			if (response && response.indexOf(TOKEN_SERIALIZE) === 0) {
				try {
					response = JSON.parse(
						response.substring(TOKEN_SERIALIZE.length)
					);
				} catch (e) {
					// do nothing
				}
			}

			callback(response);
		});
}
