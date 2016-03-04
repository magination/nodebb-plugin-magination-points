(function (Action) {
    'use strict';

    var async       = require('async'),
        _           = require('lodash'),
        settings    = require('./settings'),
        constants   = require('./constants'),
        database    = require('./database');


    /**
    * Adding methods for user badges
    * 1: For adding your first post
    */

    var userHasBadge = function(uid, badgeTitle, done) {
        var userHasBadge = false;
        database.getUserBadges(uid, function(err, badges) {
            console.log("found badges");
            console.log(badges)
            if (!badges) {
                done(uid, badgeTitle);
            } else {
                badges.forEach(function(dbBadgeTitle) {
                    console.log(dbBadgeTitle);
                    console.log("Not DB: " + badgeTitle)
                    console.log(badgeTitle === dbBadgeTitle)
                    if (badgeTitle === dbBadgeTitle) {
                        console.log("Im in");
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
            console.log("Badge added");
        });
    };

    var writtenPostBadge = function(uid) {
        var badgeTitle = constants.BADGETITLE + '2';
        console.log("writtenPostBadge");
        userHasBadge(uid, badgeTitle, addBadgeToUser);
    }

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
            console.log("User %d did action %s and is there more %s",uid, action, stuff);
            database.getActionLog(uid, function(a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            })
            done(null);
        });
    }

    /**
     * Adding post
     * @param postData {object} Post with signature - { pid:3, uid:1, tid:'1', content:'text', timestamp:1429974406764, reputation:0, votes: 0, edited: 0, deleted: 0, cid:2 }
     */
    Action.postSave = function (postData) {
        writtenPostBadge(postData.uid);
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