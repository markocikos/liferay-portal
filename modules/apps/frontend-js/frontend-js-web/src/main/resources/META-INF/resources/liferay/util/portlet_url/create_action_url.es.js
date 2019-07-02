/**
 * Returns an action portlet URL in form of a string by setting the lifecycle parameter
 * @param {!string} basePortletURL The base portlet URL to be modified in this utility
 * @param {object} parameters Search parameters to be added or changed in the base URL
 * @return {string} Action Portlet URL
 */
export default function createActionURL(basePortletURL, parameters = {}) {
	parameters.p_p_lifecycle = '1';

	return Liferay.Util.PortletURL.createURL(basePortletURL, parameters);
}
