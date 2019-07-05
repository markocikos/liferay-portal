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

/**
 * Gets the Store utility fetch value for 'get' case
 * @param key {!String}
 * @param callback
 * @review
 */

export default function getStoreValue(key, callback) {
	const doAsUserIdEncoded = Liferay.ThemeDisplay.getDoAsUserIdEncoded();

	const url = `${Liferay.ThemeDisplay.getPathMain()}/portal/session_click?p_auth=${
		Liferay.authToken
	}${
		doAsUserIdEncoded ? '&doAsUserId=' + doAsUserIdEncoded : ''
	}&cmd=${'get'}&key=${key}`;

	fetch(url)
		.then(response => {
			return response.text();
		})
		.then(response => {
			callback(response);
		});
}
