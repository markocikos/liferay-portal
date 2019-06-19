import {isString} from 'metal';
import ioRequest from './ioRequest.es';

const TOKEN_SERIALIZE = 'serialize://';

export default function getValues(cmd, key, callback) {
	let config = {
		after: {
			success: function(event) {
				var responseData = this.get('responseData');

				if (
					isString(responseData) &&
					responseData.indexOf(TOKEN_SERIALIZE) === 0
				) {
					try {
						responseData = JSON.parse(
							responseData.substring(TOKEN_SERIALIZE.length)
						);
					} catch (e) {}
				}

				callback(responseData);
			}
		},
		data: {
			cmd: cmd
		}
	};

	config.data.key = key;

	if (cmd === 'getAll') {
		config.dataType = 'json';
	}

	ioRequest(config);
}
