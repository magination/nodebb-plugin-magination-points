(function (Filter) {
    'use strict';

    var database   = require('./database'),
        controller = require('./controller'),
        constants  = require('./constants');

    /**
     * Hook to render user profile.
     * 'userData' will be used as payload in hook handler.
     * @param params {object} Payload :{userData: userData, uid: callerUID}
     * @param callback {function}
     */
    Filter.account = function (params, callback) {
        database.getPoints(params.userData.uid, function (error, points) {
            if (error) {
                return callback(error);
            }
            params.userData.points = points || 0;
            callback(null, params);
        });
    };

})(module.exports);