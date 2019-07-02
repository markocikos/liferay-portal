import createURL from './create_url.es';

/**
 * Returns a render portlet URL in form of a string by setting the lifecycle parameter
 * @param {!string} basePortletURL The base portlet URL to be modified in this utility
 * @param {object} parameters Search parameters to be added or changed in the base URL
 * @return {string} Render Portlet URL
 */
export default function createRenderURL(basePortletURL, parameters = {}) {
	parameters.p_p_lifecycle = '0';

	return createURL(basePortletURL, parameters);
}
