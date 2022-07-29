<%--
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
--%>

<%@ include file="/init.jsp" %>

<%
CommerceShipmentDisplayContext commerceShipmentDisplayContext = (CommerceShipmentDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommerceShipment commerceShipment = commerceShipmentDisplayContext.getCommerceShipment();
%>

<portlet:actionURL name="/commerce_shipment/edit_commerce_shipment" var="editCommerceShipmentURL" />

<aui:form
	action="<%= editCommerceShipmentURL %>"
	method="post"
	name="fm"
	onSubmit='<%= "event.preventDefault(); " + liferayPortletResponse.getNamespace() + "submitAndRefresh();" %>'
>
	<aui:input name="<%= Constants.CMD %>" type="hidden" value="addShipmentItems" />
	<aui:input name="redirect" type="hidden" value="<%= currentURL %>" />
	<aui:input name="commerceShipmentId" type="hidden" value="<%= commerceShipment.getCommerceShipmentId() %>" />

	<commerce-ui:modal-content
		contentCssClasses="p-0"
		title='<%= LanguageUtil.get(request, "add-shipment-items") %>'
	>
		<frontend-data-set:classic-display
			bulkActionDropdownItems="<%= commerceShipmentDisplayContext.getShipmentItemBulkActions() %>"
			contextParams='<%=
				HashMapBuilder.<String, String>put(
					"commerceShipmentId", String.valueOf(commerceShipment.getCommerceShipmentId())
				).build()
			%>'
			dataProviderKey="<%= CommerceShipmentFDSNames.SHIPPABLE_ORDER_ITEMS %>"
			formName="fm"
			id="<%= CommerceShipmentFDSNames.SHIPPABLE_ORDER_ITEMS %>"
			itemsPerPage="<%= 10 %>"
			selectedItemsKey="orderItemId"
			selectionType="multiple"
			showManagementBar="<%= false %>"
		/>
	</commerce-ui:modal-content>
</aui:form>
<aui:script require="commerce-frontend-js/utilities/eventsDefinitions as events, commerce-frontend-js/utilities/forms/index as FormUtils">
	var <portlet:namespace />form = document.getElementById(
		'<portlet:namespace />fm'
	);
	function <portlet:namespace />submitAndRefresh() {
		submitForm(<portlet:namespace />form);
		window.parent.Liferay.fire(events.CLOSE_MODAL, {
			redirectURL: redirectURL.toString(),
			successNotification: {
				showSuccessNotification: true,
				message:
					'<liferay-ui:message key="your-request-completed-successfully" />',
			},
		});
	}
</aui:script>