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

'use strict';

import getStoreValues from '../../../../src/main/resources/META-INF/resources/liferay/util/store/get_store_values.es';

describe('Liferay.Util.Store.getStoreValues', () => {
	beforeEach(() => {
		Liferay.authToken = 'abcd';

		Liferay.ThemeDisplay = {};
		Liferay.ThemeDisplay.getPathMain = jest.fn(() => {
			return 'http://sampleurl.com/';
		});

		Liferay.ThemeDisplay.getDoAsUserIdEncoded = jest.fn(() => {
			return 'efgh';
		});
	});

	it('throws error if keys parameter is not an array', () => {
		expect(() => getStoreValues(0)).toThrow('must be an array');
	});

	it('throws error if callback parameter is not a function', () => {
		expect(() => getStoreValues(['foo'], 0)).toThrow('must be a function');
	});

	it('applies default settings if none are given', () => {
		global.fetch = jest.fn((resource, init) => {
			const formData = new FormData();

			expect(resource).toEqual(
				'http://sampleurl.com/portal/session_click?_a_cmd=getAll&p_auth=abcd&doAsUserId=efgh'
			);

			expect(init).toEqual({
				body: formData,
				method: 'POST'
			});
		});

		getStoreValues(['aa', 'bb']);
	});
});
