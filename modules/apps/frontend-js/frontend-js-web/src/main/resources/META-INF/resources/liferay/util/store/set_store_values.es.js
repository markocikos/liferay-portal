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

import objectToFormData from '../form/object_to_form_data.es';
import fetch from '../fetch.es';

/**
 * Sets the Store utility fetch values
 * @param data
 * @review
 */

export default function setStoreValues(data) {
	const doAsUserIdEncoded = Liferay.ThemeDisplay.getDoAsUserIdEncoded();

	const formData = objectToFormData(data);

	const url = `${Liferay.ThemeDisplay.getPathMain()}/portal/session_click?p_auth=${
		Liferay.authToken
	}${doAsUserIdEncoded ? '&doAsUserId=' + doAsUserIdEncoded : ''}`;

	fetch(url, {
		body: formData,
		method: 'POST'
	});
}
