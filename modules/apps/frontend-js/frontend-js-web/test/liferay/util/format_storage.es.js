'use strict';

import formatStorage from '../../../src/main/resources/META-INF/resources/liferay/util/format_storage.es';

describe('Liferay.Util.formatStorage', () => {
	it('should return formatted string with size and suffix type KB if size input type is number <= 1048575 and options is default value', () => {
		expect(formatStorage(10400)).toEqual('10KB');
	});

	it('should return formatted string with negative size and suffix type KB if size input type is negative number and options is default value', () => {
		expect(formatStorage(-10400)).toEqual('-10KB');
	});

	it('should return formatted string with zero and suffix type KB if size input type is 0 and options is default value', () => {
		expect(formatStorage(0)).toEqual('0KB');
	});

	it('should return formatted string with size and suffix type MB if size input type is number >= 1048576 and options is default value', () => {
		expect(formatStorage(1048576)).toEqual('1.0MB');
	});

	it('should return NaN with suffix type KB if size input type is String and options is default value', () => {
		expect(formatStorage('Test')).toEqual('NaNKB');
	});

	it('should return formatted string with size, added space before suffix type and suffix type KB if size input type is number = 1458 and options key addSpaceBeforeSuffix = true', () => {
		expect(formatStorage(1458, {addSpaceBeforeSuffix: true})).toEqual(
			'1 KB'
		);
	});

	it('should return formatted string with size, decimal separator replaced by comma and suffix type MB if size input type is number >= 1048576', () => {
		expect(formatStorage(1048576, {decimalSeparator: ','})).toEqual(
			'1,0MB'
		);
	});

	it('should return formatted string with size and suffix KB without space when options is wrong parameter type because default option values are taken', () => {
		expect(formatStorage(1458, 'Test')).toEqual('1KB');
	});
});
