'use strict';
/* globals $, app, socket */

define('admin/plugins/points', ['settings'], function(Settings) {

	var ACP = {};

	ACP.init = function() {
		Settings.sync('points', $('.points-settings'));

		$('#save').on('click', function() {
			Settings.persist('points', $('.points-settings'), function() {
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