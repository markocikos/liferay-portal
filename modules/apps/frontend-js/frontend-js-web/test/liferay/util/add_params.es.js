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

import addParams from '../../../src/main/resources/META-INF/resources/liferay/util/add_params.es';

describe('Liferay.Util.addParams', () => {
	it('throws error if size parameter is not an object or string', () => {
		expect(() => addParams(0)).toThrow(
			'Parameter params must be an object or string'
		);
	});

	it('throws error if url parameter is not a string', () => {
		expect(() => addParams('foo', 0)).toThrow(
			'Parameter url must be a strin'
		);
	});

	it('Adds the parameters to the portlet URL', () => {
		expect(addParams('bar', 'foo')).toEqual('foo?bar');
	});
});
