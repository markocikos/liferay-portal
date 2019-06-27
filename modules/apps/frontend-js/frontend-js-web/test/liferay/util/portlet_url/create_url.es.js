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

import createURL from '../../../../src/main/resources/META-INF/resources/liferay/util/portlet_url/create_url.es';

describe('Liferay.Util.PortletURL.createURL', () => {
	it('returns a url in form of a string', () => {
		expect(
			createURL(
				'http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_roles_admin_web_portlet_RolesAdminPortlet',
				{foo: 'bar'}
			).toEqual(
				'http://localhost:8080/group/control_panel/manage?p_p_id=com_liferay_roles_admin_web_portlet_RolesAdminPortlet&_com_liferay_roles_admin_web_portlet_RolesAdminPortlet_key=value'
			)
		);
	});
});
