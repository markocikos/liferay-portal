import {isObject, isString, isNull} from 'metal';
import getPortletNamespace from './../get_portlet_namespace.es';

/**
 * Returns a portlet URL in form of a string
 * @param {!string} basePortletURL The base portlet URL to be modified in this utility
 * @param {object} parameters Search parameters to be added or changed in the base URL
 * @return {string} Portlet URL
 */
export default function createURL(basePortletURL, parameters = {}) {
	if (!isString(basePortletURL)) {
		throw new TypeError('basePortletURL parameter must be a string');
	}

	if (!isObject(parameters)) {
		throw new TypeError('parameters argument must be an object');
	}

	const reservedParameters = [
		'doAsGroupId',
		'doAsUserId',
		'doAsUserLanguageId',
		'p_auth',
		'p_auth_secret',
		'p_f_id',
		'p_j_a_id',
		'p_l_id',
		'p_l_reset',
		'p_p_auth',
		'p_p_cacheability',
		'p_p_i_id',
		'p_p_id',
		'p_p_isolated',
		'p_p_lifecycle',
		'p_p_mode',
		'p_p_resource_id',
		'p_p_state',
		'p_p_state_rcv',
		'p_p_static',
		'p_p_url_type',
		'p_p_width',
		'p_t_lifecycle',
		'p_v_l_s_g_id',
		'refererGroupId',
		'refererPlid',
		'saveLastPath',
		'scroll'
	];

	const portletURL = new URL(basePortletURL);

	const urlSearchParams = new URLSearchParams(portletURL.search);

	const portletID = parameters.p_p_id || urlSearchParams.get('p_p_id');

	if (isNull(portletID)) {
		throw new TypeError('Portlet ID must not be null');
	}

	const namespace = getPortletNamespace(portletID);

	Object.keys(parameters).forEach(key => {
		let param = key;

		if (!reservedParameters.includes(key)) {
			param = `${namespace}${key}`;
		}

		urlSearchParams.set(param, parameters[key]);
	});

	portletURL.search = urlSearchParams.toString();

	return portletURL.toString();
}
