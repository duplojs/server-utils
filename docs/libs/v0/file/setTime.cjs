'use strict';

var EE = require('@duplojs/utils/either');
var DD = require('@duplojs/utils/date');
var implementor = require('../implementor.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);
var DD__namespace = /*#__PURE__*/_interopNamespaceDefault(DD);

/**
 * {@include file/setTime/index.md}
 */
const setTime = implementor.implementFunction("setTime", {
    NODE: async (path, { accessTime, modifiedTime }) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.utimes(path, DD__namespace.toTimestamp(accessTime), DD__namespace.toTimestamp(modifiedTime))
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-set-time", value));
    },
    DENO: (path, { accessTime, modifiedTime }) => Deno
        .utime(path, DD__namespace.toTimestamp(accessTime), DD__namespace.toTimestamp(modifiedTime))
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-set-time", value)),
});

exports.setTime = setTime;
