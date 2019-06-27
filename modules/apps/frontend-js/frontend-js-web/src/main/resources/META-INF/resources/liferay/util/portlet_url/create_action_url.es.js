export default function createActionURL(basePortletURL, parameters) {
	parameters.p_p_lifecycle = '1';

	return Liferay.Util.PortletURL.createURL(basePortletURL, parameters);
}
