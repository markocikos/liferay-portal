import getValues from './getValues.es';

export default function getAll(keys, callback) {
	getValues('getAll', keys, callback);
}
