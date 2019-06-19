import {isFunction, isObject} from 'metal';
import get from './store/get.es';
import getAll from './store/getAll.es';
import set from './store/set.es';
import setAll from './store/setAll.es';

export default function Store(key, value) {
	let method;

	if (isFunction(value)) {
		method = get(key, callback);

		if (Array.isArray(key)) {
			method = getAll(keys, callback);
		}
	} else {
		method = set(key, value);

		if (isObject(key)) {
			method = setAll(obj);
		} else if (arguments.length === 1) {
			method = null;
		}
	}

	if (method) {
		Store[method].apply(Store, arguments);
	}
}
