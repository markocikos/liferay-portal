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
import objectToFormData from '../form/object_to_form_data.es';

/**
 * Gets the Store utility fetch values for 'getAll' case
 * @param keys {!Array}
 * @param callback
 * @review
 */

export default function getStoreValues(keys, callback) {
	const doAsUserIdEncoded = Liferay.ThemeDisplay.getDoAsUserIdEncoded();

	const formData = objectToFormData({
		cmd: 'getAll',
		p_auth: Liferay.authToken
	});

	formData.append('key', JSON.stringify(keys));

	if (doAsUserIdEncoded) {
		formData.append('doAsUserId', doAsUserIdEncoded);
	}

	const url = `${Liferay.ThemeDisplay.getPathMain()}/portal/session_click?p_auth=${
		Liferay.authToken
	}`;

	fetch(url, {
		method: 'POST',
		body: formData
	})
		.then(response => {
			response.json();
		})
		.then(response => {
			callback(response);
		});
}
