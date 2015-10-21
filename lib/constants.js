function define(name, value) {
    Object.defineProperty(exports, name, {
        value     : value,
        enumerable: true
    });
}

define('NAMESPACE', 'points');
//define('SOCKETS', 'ns-points');