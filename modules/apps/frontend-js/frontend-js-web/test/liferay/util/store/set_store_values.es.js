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

import setStoreValues from '../../../../src/main/resources/META-INF/resources/liferay/util/store/set_store_values.es';

describe('Liferay.Util.Store.setStoreValues', () => {
	it('throws error if key parameter is not an object', () => {
		expect(() => setStoreValues(0)).toThrow('must be an object');
	});

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

	it('applies default settings if none are given', () => {
		global.fetch = jest.fn((resource, init) => {
			const formData = new FormData();

			expect(resource).toEqual(
				'http://sampleurl.com/portal/session_click?p_auth=abcd&doAsUserId=efgh'
			);

			expect(init).toEqual({
				body: formData,
				method: 'POST'
			});
		});

		setStoreValues({foo: 'bar'});
	});
});
