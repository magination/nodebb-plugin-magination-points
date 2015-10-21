(function (Settings) {
    'use strict';

    var objectAssign  = require('object-assign'),
        fs            = require('fs'),
        path          = require('path'),

        meta          = require('./nodebb').meta,
        constants     = require('./constants'),

        //Memory cache
        settingsCache = null,
        userTemplate  = null,
        defaults      = {
            postWeight            : 1,
            topicWeight           : 4,
            reputationWeight      : 2,
            reputationActionWeight: 1,
            maxUsers              : 20,

            basePoints: 10,
            baseGrow  : 4
        };

    Settings.init = function (done) {
        meta.settings.get(constants.NAMESPACE, function (error, settings) {
            if (error) {
                return done(error);
            }
            settingsCache = objectAssign(defaults, settings);

            done();
        });
    };

    Settings.get = function () {
        return settingsCache;
    };

    Settings.save = function (settings, done) {
        settingsCache = objectAssign(settingsCache, settings);
        meta.settings.set(constants.NAMESPACE, settingsCache, function (error) {
            done(error, settingsCache);
        });
    };

})(module.exports);