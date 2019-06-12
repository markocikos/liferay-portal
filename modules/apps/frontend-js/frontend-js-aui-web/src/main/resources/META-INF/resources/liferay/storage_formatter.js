AUI.add(
	'liferay-storage-formatter',
	function() {
		var StorageFormatter = function() {};

		StorageFormatter.NAME = 'storageformatter';

		StorageFormatter.prototype = {
			formatStorage: function(size) {
				return Liferay.Util.formatStorage(size);
			}
		};

		Liferay.StorageFormatter = StorageFormatter;
	},
	'',
	{
		requires: ['aui-base', 'datatype-number-format']
	}
);
