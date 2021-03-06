"use strict";

var controllers = require('./lib/controllers'),
	settings    = require('./lib/settings'),
	actions     = require('./lib/actions'),
	constants 	= require('./lib/constants'),
	filters 	= require('./lib/filters'),
//	meta 		= module.parent.require('./meta'),
	plugin 		= {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/points', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/points', controllers.renderAdminPage);
	
	settings.init(callback);
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/points',
		icon: 'fa-tint',
		name: 'Points'
	});

	callback(null, header);
};

plugin.addPost = actions.postSave;
plugin.addTopic = actions.topicSave;
plugin.account = filters.account;
plugin.topic = filters.topic;
plugin.upvote = actions.upvote;
plugin.downvote = actions.downvote;

module.exports = plugin;