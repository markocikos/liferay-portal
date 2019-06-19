import getValues from './getValues.es';

export default function get(key, callback) {
	getValues('get', key, callback);
}
