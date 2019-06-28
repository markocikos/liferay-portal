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

const TOKEN_SERIALIZE = 'serialize://';

export default function get(key, callback) {
	getFetchValues(cmd, key, callback);
}

function getFetchValues(cmd, key, callback) {
	var formData = Liferay.Util.objectToFormData({
		cmd,
		key
	});

	const doAsUserIdEncoded = Liferay.ThemeDisplay.getDoAsUserIdEncoded();

	Liferay.Util.fetch(
		`${Liferay.ThemeDisplay.getPathMain()}/portal/session_click?p_auth=${
			Liferay.authToken
		}${doAsUserIdEncoded ? '&doAsUserId=' + doAsUserIdEncoded : ''}`,
		{
			body: formData,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'GET'
		}
	)
		.then(function(event) {
			let responseData = this.get('responseData');

			if (
				isString(responseData) &&
				responseData.indexOf(TOKEN_SERIALIZE) === 0
			) {
				try {
					responseData = JSON.parse(
						responseData.substring(TOKEN_SERIALIZE.length)
					);
				} catch (e) {}
			}

			callback(responseData);
		})
		.then(function(response) {
			return response.json();
		});
}
