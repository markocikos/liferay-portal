import ioRequest from './ioRequest.es';

export default function setValues(data) {
	ioRequest({
		data: data
	});
}
