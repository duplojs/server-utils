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
 * {@include file/link/index.md}
 */
const link = implementor.implementFunction("link", {
    NODE: async (existingPath, newPath) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.link(existingPath, newPath)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-link", value));
    },
    DENO: (existingPath, newPath) => Deno
        .link(existingPath, newPath)
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-link", value)),
});

exports.link = link;
