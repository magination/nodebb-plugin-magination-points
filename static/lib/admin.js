'use strict';
/* globals $, app, socket */

define('admin/plugins/points', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('points', $('.points-settings'));

		$('#save').on('click', function() {
			Settings.save('points', $('.points-settings'), function() {
				app.alert({
					type: 'success',
					alert_id: 'points-saved',
					title: 'Settings Saved',
					message: 'Please reload your NodeBB to apply these settings',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});

		console.log("Settings");
		console.log(Settings);
		console.log(Settings.get('postWeight'));
		console.log(meta.settings.get('points'));
		document.darksouls = Settings;

		$('#addRank').on('click', function(event) {
			event.preventDefault();
			$('#inputList').append('<input type="text" placeholder="rank"/> <input type="number" placeholder="points"/> <br />');
		});
	};

	return ACP;
});