'use strict';
/* globals $, app, socket */

define('admin/plugins/points', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.load('points', $('.points-settings'));

		$('#save').on('click', function() {
			Settings.save('points', $('.points-settings'), function() {
				socket.emit('admin.settings.syncMyPlugin');
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
	};

	return ACP;
});