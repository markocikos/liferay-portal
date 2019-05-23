AUI.add(
	'liferay-address',
	function(A) {
		Liferay.Address = {
			getCountries: function(callback) {
				if (Liferay.Address.getCountries) {
					Liferay.Address.getCountries(callback);
				}
				else {
					Liferay.Service(
						'/country/get-countries',
						{
							active: true
						},
						callback
					);
				}
			},

			getRegions: function(callback, selectKey) {
				if (Liferay.Address.getRegions) {
					Liferay.Address.getRegions(callback, selectKey);
				}
				else {
					Liferay.Service(
						'/region/get-regions',
						{
							active: true,
							countryId: Number(selectKey)
						},
						callback
					);
				}
			}
		};
	},
	'',
	{
		requires: []
	}
);