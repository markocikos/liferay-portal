'use strict';

import formatStorage from '../../../src/main/resources/META-INF/resources/liferay/util/format_storage.es';

describe('Liferay.Util.formatStorage', () => {
	it('should format size under 1048575 bytes to kilobytes, with the default KB suffix', () => {
		expect(formatStorage(10400)).toEqual('10KB');
	});

	it('should format size 0 bytes to kilobytes, with the default KB suffix', () => {
		expect(formatStorage(0)).toEqual('0KB');
	});

	it('should format size over 1048575 bytes to megabytes, with the default MB suffix', () => {
		expect(formatStorage(1048576)).toEqual('1.0MB');
	});

	it('should format size over 1048575 bytes to megabytes with custom space, decimal separator, and suffix type parameters', () => {
		expect(formatStorage(1048576, {addSpaceBeforeSuffix: true, decimalSeparator: ',', suffixMB: 'megabytes'})).toEqual(
			'1,0 megabytes'
		);
	});
});
