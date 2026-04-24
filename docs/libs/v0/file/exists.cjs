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
 * {@include file/exists/index.md}
 */
const exists = implementor.implementFunction("exists", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.access(path)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-exists", value));
    },
    DENO: (path) => Deno
        .stat(path)
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-exists", value)),
    BUN: (path) => Bun.file(path)
        .exists()
        .then((value) => value
        ? EE__namespace.ok()
        : EE__namespace.left("file-system-exists", new Error("Path does not exist")))
        .catch((value) => EE__namespace.left("file-system-exists", value)),
});

exports.exists = exists;
