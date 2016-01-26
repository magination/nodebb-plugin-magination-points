function define(name, value) {
    Object.defineProperty(exports, name, {
        value     : value,
        enumerable: true
    });
}

define('NAMESPACE', 'points');
define('CREATEPOST', 'createPost');
define('CREATETOPIC', 'createTopic');
//define('SOCKETS', 'ns-points');