'use strict';

import formatXMLToString from '../../../../src/main/resources/META-INF/resources/liferay/util/xmlformatter/format_xml_to_string.es';

describe(
	'Liferay.Util.formatXMLToString',
	() => {
		it(
			'should return null if content parameter is not a string',
			() => {
				let content = {};
				
				expect(formatXMLToString(content)).toEqual(null);
			}
		);

		it(
			'should return a string if content parameter is a string',
			() => {
				let content = 'foo';

				expect(formatXMLToString(content)).toEqual('foo');
			}
		);
	}
);