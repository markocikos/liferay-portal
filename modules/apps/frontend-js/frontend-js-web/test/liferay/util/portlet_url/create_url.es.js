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

import createURL from '../../../../src/main/resources/META-INF/resources/liferay/util/portlet_url/create_url.es';

describe('Liferay.Util.PortletURL.createURL', () => {
	beforeEach(() => {
		Liferay = {
			Util: {
				getPortletNamespace: jest.fn(
					() =>
						'_com_liferay_roles_admin_web_portlet_RolesAdminPortlet_'
				)
			}
		};
	});

	it('throws an error if basePortletURL is not a string', () => {
		expect(() => createURL({portlet: 'url'}, {foo: 'bar'})).toThrow(
			'basePortletURL parameter must be a string'
		);
	});

	it('throws an error if parameters is not an object', () => {
		expect(() =>
			createURL(
				'http://localhost:8080/group/control_panel/manage',
				'foo:bar'
			)
		).toThrow('parameters argument must be an object');
	});

	it('throws an error if portlet ID is null', () => {
		expect(() =>
			createURL('http://localhost:8080/group/control_panel/manage', {
				foo: 'bar'
			})
		).toThrow('Portlet ID must not be null');
	});

	it('returns a string with namespaced parameters if p_p_id is provided as part of the base URL', () => {
		expect(
			createURL(
				'http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_roles_admin_web_portlet_RolesAdminPortlet',
				{
					foo: 'bar'
				}
			)
		).toEqual(
			'http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_roles_admin_web_portlet_RolesAdminPortlet&_com_liferay_roles_admin_web_portlet_RolesAdminPortlet_foo=bar'
		);
	});

	it('returns a string with namespaced parameters if p_p_id is sent as a parameter', () => {
		expect(
			createURL('http://localhost:8080/group/control_panel/manage', {
				p_p_id: 'com_liferay_roles_admin_web_portlet_RolesAdminPortlet',
				foo: 'bar'
			})
		).toEqual(
			'http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_roles_admin_web_portlet_RolesAdminPortlet&_com_liferay_roles_admin_web_portlet_RolesAdminPortlet_foo=bar'
		);
	});
});
