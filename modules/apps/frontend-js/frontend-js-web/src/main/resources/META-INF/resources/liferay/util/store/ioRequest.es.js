export default function ioRequest(config) {
	let doAsUserIdEncoded = Liferay.ThemeDisplay.getDoAsUserIdEncoded();

	fetch(
		`${Liferay.ThemeDisplay.getPathMain()}/portal/session_click?p_auth=${
			Liferay.authToken
		}${doAsUserIdEncoded ? '&doAsUserId=' + doAsUserIdEncoded : ''}`,
		{
			credentials: 'include'
		}
	).then(function(response) {
		return response.text();
	});
}
