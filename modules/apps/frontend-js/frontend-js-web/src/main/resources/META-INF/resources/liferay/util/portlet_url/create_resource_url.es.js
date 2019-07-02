import createURL from './create_url.es';

/**
 * Returns a resource portlet URL in form of a string by setting the lifecycle parameter
 * @param {!string} basePortletURL The base portlet URL to be modified in this utility
 * @param {object} parameters Search parameters to be added or changed in the base URL
 * @return {string} Resource Portlet URL
 */
export default function createResourceURL(basePortletURL, parameters = {}) {
	parameters.p_p_lifecycle = '2';

	return createURL(basePortletURL, parameters);
}
