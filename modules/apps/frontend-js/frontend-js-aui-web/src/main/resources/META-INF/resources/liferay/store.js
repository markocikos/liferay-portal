AUI.add(
	'liferay-store',
	function() {
		Liferay.Store = function (key, value) {
			Liferay.Util.Store(key, value);
		};
	}
);