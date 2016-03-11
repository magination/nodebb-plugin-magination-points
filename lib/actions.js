(function (Action) {
    'use strict';

    var async       = require('async'),
        _           = require('lodash'),
        settings    = require('./settings'),
        constants   = require('./constants'),
        database    = require('./database'),
        nodebb      = require('./nodebb'),
        User        = nodebb.user;


    /**
    * Adding methods for user badges
    * 1: For adding your first post
    * 2: For having 50 posts
    * 3: For having 100 posts
    */

    var userHasBadge = function(uid, badgeTitle, done) {
        var userHasBadge = false;
        database.getUserBadges(uid, function(err, badges) {
            if (!badges) {
                done(uid, badgeTitle);
            } else {
                badges.forEach(function(dbBadgeTitle) {
                    if (badgeTitle === dbBadgeTitle) {
                        userHasBadge = true;
                    }
                })

                if(!userHasBadge) {
                    done(uid, badgeTitle);
                };
            }
        });
    };

    var addBadgeToUser = function(uid, badge, done) {
        database.addUserBadge(uid, badge, function(err, badge) {
        });
    };

    var writtenPostBadge = function(uid) {
        var badgeTitle = constants.BADGETITLE + '1';
        userHasBadge(uid, badgeTitle, addBadgeToUser);
    };

    var numberOfPostBadge = function(id) {
        User.getUserFields(id, ['postcount'], function(err, res) {
            if (err) {
                return;
            }
            var badgeTitle = constants.BADGETITLE;
            var postCount = res.postcount;

            if (postCount < 50) {
                return;
            } else if (postCount < 100) {
                userHasBadge(id, badgeTitle + '2', addBadgeToUser);
            } else {
                userHasBadge(id, badgeTitle + '3', addBadgeToUser);
            }
        });
    };

    /**
    * Methods for handeling user points
    */

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

    var addActionToLog = function (uid, action, done) {
        done = done || _.noop;
        database.addActionToLog(uid, action, function (error, stuff) {
            if (error) {
                return done(error);
            }
            //console.log("User %d did action %s and is there more %s",uid, action, stuff);
            database.getActionLog(uid, function(err, allActions) {
                //console.log(allActions);
            })
            /*database.getUserPostCount(uid, function(err, res) {
                console.log("Post count");
                console.log(err);
                console.log(res);
                console.log(c);
            })*/
            done(null);
        });
    }

    /**
     * Adding post
     * @param postData {object} Post with signature - { pid:3, uid:1, tid:'1', content:'text', timestamp:1429974406764, reputation:0, votes: 0, edited: 0, deleted: 0, cid:2 }
     */
    Action.postSave = function (postData) {
        writtenPostBadge(postData.uid);
        numberOfPostBadge(postData.uid);
        var value = settings.get().postWeight;
        incrementPoints(postData.uid, value);
        addActionToLog(postData.uid, constants.CREATEPOST);
    };

    Action.topicSave = function (topicData) {
        var value = settings.get().topicWeight;
        incrementPoints(topicData.uid, value);
        addActionToLog(topicData.uid, constants.CREATETOPIC);
    }

    Action.upvote = function(vote) {
        var value = settings.get().upvoteWeight;
        incrementPoints(vote.owner, value);
        addActionToLog(vote.owner, constants.UPVOTE);
    }

    Action.downvote = function(vote) {
        var value = -settings.get().upvoteWeight;
        incrementPoints(vote.owner, value);
        addActionToLog(vote.owner, constants.DOWNVOTE);
    }

})(module.exports);