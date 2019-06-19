import {isObject} from 'metal';
import setValues from './setValues.es';

const TOKEN_SERIALIZE = 'serialize://';

export default function set(key, value) {
	let obj = {};

	if (isObject(value)) {
		value = TOKEN_SERIALIZE + JSON.stringify(value);
	}

	obj[key] = value;

	setValues(obj);
}
