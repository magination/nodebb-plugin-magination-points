function define(name, value) {
    Object.defineProperty(exports, name, {
        value     : value,
        enumerable: true
    });
}

define('NAMESPACE', 'points');
define('CREATEPOST', 'createPost');
define('CREATETOPIC', 'createTopic');
define('VOTE', 'upvote');
define('DOWNVOTE', 'downvote');
define('BADGETITLE', 'badgeTitle');
//define('SOCKETS', 'ns-points');