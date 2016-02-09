(function (Filter) {
    'use strict';

    var database   = require('./database');
    var settings   = require('./settings');


    var findRank = function(points) {
        var currentSettings = settings.get();
        var number = 1;
        var keyPoints = "rankPoints";
        var keyTitle = "rankTitle";
        var rank = currentSettings["rankPoints1"];
        while (currentSettings[keyPoints+number.toString()]) {
            if (currentSettings[keyPoints+number.toString()] > points) {
                return rank;
            }
            rank = currentSettings[keyTitle+number.toString()];
            number++;
        }

        return rank;
    }

    /**
     * Hook to render user profile.
     * 'userData' will be used as payload in hook handler.
     * @param params {object} Payload :{userData: userData, uid: callerUID}
     * @param callback {function}
     */
    Filter.account = function (params, callback) {
        var currentSettings = settings.get();
        database.getPoints(params.userData.uid, function (error, points) {
            if (error) {
                return callback(error);
            }
            params.userData.points = points || 0;
            params.userData.rank = findRank(points);
            callback(null, params);
        });
    };

    Filter.topic = function(params, callback) {
        params.topic.posts.forEach(function(post) {
            database.getPoints(post.uid, function (error, points) {
                if (error) {
                    return callback(error);
                }
                post.user.points = points || 0;
                post.user.rank = findRank(points);
            });
        });
        callback(null, params);
    }

})(module.exports);