import {isString} from 'metal';

/**
 * Returns the portlet namespace with underscores prepended and appended to it
 * @param {!string} portletId The portlet Id to modify
 * @return {string} Underscorified portlet namespace
 */
export default function getPortletNamespace(portletId) {
	if (!isString(portletId)) {
		throw new TypeError('portletId must be a string');
	}
	return '_' + portletId + '_';
}
