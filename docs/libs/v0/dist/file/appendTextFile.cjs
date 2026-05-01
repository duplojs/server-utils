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
 * {@include file/appendTextFile/index.md}
 */
const appendTextFile = implementor.implementFunction("appendTextFile", {
    NODE: async (path, data) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.appendFile(path, data)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-append-text-file", value));
    },
    DENO: (path, data) => Deno.writeTextFile(path, data, { append: true })
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-append-text-file", value)),
});

exports.appendTextFile = appendTextFile;
