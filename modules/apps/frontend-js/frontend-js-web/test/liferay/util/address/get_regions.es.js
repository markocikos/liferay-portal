'use strict';

import getRegions from '../../../../src/main/resources/META-INF/resources/liferay/util/address/get_regions.es';

describe(
	'Liferay.Address.getRegions',
	() => {
		it(
			'should throw an error if the callback parameter is not a function',
			() => {
				const callback = '';

				const testFn = () => {
					getRegions(callback);
				};

				expect(testFn).toThrow();
			}
		);

		it(
			'should throw an error if the selectKey parameter is not a string',
			() => {
				function callback() {
					console.log('foo');
				}

				const testFn = () => {
					getRegions(callback, {});
				};

				expect(testFn).toThrow();
			}
		)
	}
);