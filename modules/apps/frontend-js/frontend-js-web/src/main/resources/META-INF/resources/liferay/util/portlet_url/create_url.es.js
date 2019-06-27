import {isObject, isDef, isNull} from 'metal';

export default function createURL(basePortletURL, parameters) {
	let internalParameters = {};

	let reservedParameters = {
		doAsGroupId: null,
		doAsUserId: null,
		doAsUserLanguageId: null,
		p_auth: null,
		p_auth_secret: null,
		p_f_id: null,
		p_j_a_id: null,
		p_l_id: null,
		p_l_reset: null,
		p_p_auth: null,
		p_p_cacheability: null,
		p_p_i_id: null,
		p_p_id: null,
		p_p_isolated: null,
		p_p_lifecycle: null,
		p_p_mode: null,
		p_p_resource_id: null,
		p_p_state: null,
		p_p_state_rcv: null,
		p_p_static: null,
		p_p_url_type: null,
		p_p_width: null,
		p_t_lifecycle: null,
		p_v_l_s_g_id: null,
		refererGroupId: null,
		refererPlid: null,
		saveLastPath: null,
		scroll: null
	};

	let options = {
		basePortletURL,
		escapeXML: null,
		secure: null
	};

	let portletURL = new URL(basePortletURL);

	if (isObject(parameters)) {
		Object.keys(parameters).map(key => {
			const item = parameters[key];

			if (isDef(item)) {
				if (Object.keys(reservedParameters).includes(key)) {
					reservedParameters[key] = item;
				} else {
					internalParameters[key] = item;
				}
			}
		});
	}

	Object.keys(reservedParameters).forEach(key => {
		const item = reservedParameters[key];

		if (!isNull(item)) {
			setParameter(portletURL, key, parameters, reservedParameters);
		}
	});

	Object.keys(internalParameters).forEach(key => {
		const item = internalParameters[key];

		if (!isNull(item)) {
			setParameter(
				portletURL,
				key,
				internalParameters,
				reservedParameters
			);
		}
	});

	if (options.secure) {
		portletURL.protocol = 'https';
	}

	if (options.escapeXML) {
		portletURL = portletURL.escapeHTML();
	}

	return portletURL.toString();
}

function setParameter(url, key, parameters, reservedParameters) {
	let resultURL = url;

	let urlSearchParams = new URLSearchParams(resultURL.search);

	const portletId =
		reservedParameters.p_p_id || resultURL.searchParams.get('p_p_id');

	const namespacePrefix = Liferay.Util.getPortletNamespace(portletId);

	if (Object.keys(reservedParameters).includes(key)) {
		if (!isNull(reservedParameters[key])) {
			urlSearchParams.append(key, reservedParameters[key]);
		}
	} else {
		if (!isNull(parameters[key])) {
			if (Object.keys(parameters).includes(key)) {
				urlSearchParams.set(
					`${namespacePrefix}${key}`,
					parameters[key]
				);
			} else {
				urlSearchParams.append(
					`${namespacePrefix}${key}`,
					parameters[key]
				);
			}
		}
	}

	resultURL.search = urlSearchParams.toString();

	return resultURL;
}
