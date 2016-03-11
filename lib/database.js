(function (Database) {
    'use strict';

    var async     = require('async'),

        nodebb    = require('./nodebb'),
        db        = nodebb.db,
        user      = nodebb.user,
        constants = require('./constants'),
        namespace = constants.NAMESPACE,
        scoreLogKey = namespace + ':action:',
        badgeKey = namespace + ':badges:';

    //FIXME Remove Points object if User is deleted or create utility method for ACP
    Database.delete = function (uid, done) {
        db.sortedSetRemove(namespace, uid, done);
    };

    Database.getPoints = function (uid, done) {
        db.sortedSetScore(namespace, uid, done);
    };

    Database.getUsers = function (limit, done) {
        async.waterfall([
            async.apply(db.getSortedSetRevRangeWithScores, namespace, 0, limit),
            function (scoredUsers, next) {
                var scores = {};
                var ids = scoredUsers.map(function (scoredUser) {
                    scores[scoredUser.value] = scoredUser.score;
                    return scoredUser.value;
                });
                user.getUsersData(ids, function (error, users) {
                    if (error) {
                        return next(error);
                    }
                    var usersWithScores = users.map(function (userData) {
                        userData.points = scores[userData.uid] || 0;
                        return userData;
                    });
                    next(null, usersWithScores);
                });
            }
        ], done);
    };

    Database.incrementBy = function (uid, increment, done) {
        db.sortedSetIncrBy(namespace, increment, uid, done);
    };

    Database.addActionToLog = function (uid, action, done) {
        var key = scoreLogKey + uid;
        action += ':' + new Date().getTime();
        db.listAppend(key, action, done);
        //prev used set
    };

    Database.getActionLog = function (uid, done) {
        var key = scoreLogKey + uid;
        db.getArray(key, done);
        //prev used get
    };

    Database.getUserBadges = function(uid, done) {
        var key = badgeKey + uid;
        db.getArray(key, done);
    };

    Database.addUserBadge = function(uid, badge, done) {
        var key = badgeKey + uid;
        db.listAppend(key, badge, done);
    }

    Database.removeAllBadges = function(uid, done) {
        var key = badgeKey + uid;
        db.listRemoveAll(key, done);
    }

    Database.getUserPostCount = function(uid, done) {
        var key = "users:postcount";
        db.get(key, done);
    }

})(module.exports);