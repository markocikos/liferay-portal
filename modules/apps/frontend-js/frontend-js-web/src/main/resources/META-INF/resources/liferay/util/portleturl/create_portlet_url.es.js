import {isObject, isDef, isNull} from 'metal';

export default function createPortletURL(
	lifecycle,
	parameters,
	basePortletURL
) {
	const ACTION_PHASE = '1';

	const RENDER_PHASE = '0';

	const RESOURCE_PHASE = '2';

	let params = {};

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

	basePortletURL =
		basePortletURL ||
		`${themeDisplay.getPathMain()}/portal/layout?p_id=${themeDisplay.getPlid()}`;

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
					params[key] = item;
				}
			}
		});

		portletURL.params = params;
	}

	if (lifecycle) {
		if (lifecycle === ACTION_PHASE) {
			reservedParameters.p_auth = Liferay.authToken;
			reservedParameters.p_p_lifecycle = ACTION_PHASE;
		} else if (lifecycle === RENDER_PHASE) {
			reservedParameters.p_p_lifecycle = RENDER_PHASE;
		} else if (lifecycle === RESOURCE_PHASE) {
			reservedParameters.p_p_lifecycle = RESOURCE_PHASE;
			reservedParameters.p_p_cacheability = 'cacheLevelPage';
		}
	}

	portletURL = _toString(options, params, reservedParameters, portletURL);

	return portletURL;
}

function _toString(options, parameters, reservedParameters, basePortletURL) {
	Object.keys(reservedParameters).map(key => {
		const item = reservedParameters[key];

		if (!isNull(item)) {
			_setParameter(
				basePortletURL,
				key,
				item,
				parameters,
				reservedParameters
			);
		}
	});

	Object.keys(parameters).map(key => {
		const item = parameters[key];

		if (!isNull(item)) {
			_setParameter(
				basePortletURL,
				key,
				item,
				parameters,
				reservedParameters
			);
		}
	});

	if (options.secure) {
		basePortletURL.protocol = 'https';
	}

	let resultURL = basePortletURL.toString();

	if (options.escapeXML) {
		resultURL = resultURL.escapeHTML();
	}

	return resultURL;
}

function _setParameter(url, key, value, parameters, reservedParameters) {
	let resultURL = url;

	let urlSearchParams = new URLSearchParams(url.search);

	if (Object.keys(reservedParameters).includes(key)) {
		if (!isNull(reservedParameters[key])) {
			urlSearchParams.append(key, reservedParameters[key]);

			resultURL.search = urlSearchParams.toString();

			reservedParameters[key] = value;
		}
	} else {
		if (!isNull(parameters[key])) {
			const portletId =
				reservedParameters.p_p_id ||
				resultURL.searchParams.get('p_p_id');

			const namespacePrefix = Liferay.Util.getPortletNamespace(portletId);

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

			resultURL.search = urlSearchParams.toString();
		}
	}

	return resultURL;
}
