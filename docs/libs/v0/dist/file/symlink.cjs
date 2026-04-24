'use strict';

var EE = require('@duplojs/utils/either');
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

/**
 * {@include file/symlink/index.md}
 */
const symlink = implementor.implementFunction("symlink", {
    NODE: async (oldPath, newPath, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.symlink(oldPath, newPath, params?.type)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-symlink", value));
    },
    DENO: (oldPath, newPath, params) => Deno
        .symlink(oldPath, newPath, params)
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-symlink", value)),
});

exports.symlink = symlink;
