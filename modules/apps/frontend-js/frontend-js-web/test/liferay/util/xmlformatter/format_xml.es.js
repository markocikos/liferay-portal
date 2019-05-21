'use strict';

import formatXML from '../../../../src/main/resources/META-INF/resources/liferay/util/xmlformatter/format_xml.es';
import 'jest-xml-matcher';

describe(
	'Liferay.Util.formatXML',
	() => {
		it(
			'should return null if content parameter is not a string',
			() => {				
				expect(formatXML({})).toEqual(null);
			}
		);

		it(
			'should return an XML string if content parameter is an XML string',
			() => {
				const content = `
					<?xml xlmns:a="http://www.w3.org/TR/html4/" version="1.0" encoding="UTF-8"?>
					<!DOCTYPE note>

					<a:note>  					<a:to>Foo</a:to>
						<a:from>Bar</a:from><a:heading>FooBar</a:heading>
							<a:body>FooBarBaz!</a:body>
					</a:note>
				`;

				expect(formatXML(content)).toEqualXML(`
					<?xml xlmns:a="http://www.w3.org/TR/html4/" version="1.0" encoding="UTF-8"?>
					<!DOCTYPE note>
					<a:note>
						<a:to>Foo</a:to>
						<a:from>Bar</a:from>
						<a:heading>FooBar</a:heading>
						<a:body>FooBarBaz!</a:body>
					</a:note>
				`);
			}
		);
	}
);