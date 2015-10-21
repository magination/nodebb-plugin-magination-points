(function (Action) {
    'use strict';

    var async    = require('async'),
        _        = require('lodash'),
        settings = require('./settings'),
        database = require('./database');

    var debug = function (id, delta, total) {
        console.log('User %d changed amount of points on %d, total: %d', id, delta, total);
    };

    var groupChange = function (users, done) {
        async.each(users, function (user, next) {
            incrementPoints(user.uid, user.points, next);
        }, done);
    };

    var incrementPoints = function (uid, increment, done) {
        done = done || _.noop;
        database.incrementBy(uid, increment, function (error, points) {
            if (error) {
                return done(error);
            }
            //TODO Today Statistics
            debug(uid, increment, points);
            done(null);
        });
    };

    /**
     * Adding post
     * @param postData {object} Post with signature - { pid:3, uid:1, tid:'1', content:'text', timestamp:1429974406764, reputation:0, votes: 0, edited: 0, deleted: 0, cid:2 }
     */
    Action.postSave = function (postData) {
        var value = settings.get().postWeight;
        incrementPoints(postData.uid, value);
    };

})(module.exports);