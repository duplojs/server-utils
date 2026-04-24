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
 * {@include file/readFile/index.md}
 */
const readFile = implementor.implementFunction("readFile", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readFile(path)
            .then(EE__namespace.success)
            .catch((value) => EE__namespace.left("file-system-read-file", value));
    },
    DENO: (path) => Deno
        .readFile(path)
        .then(EE__namespace.success)
        .catch((value) => EE__namespace.left("file-system-read-file", value)),
    BUN: (path) => Bun.file(path)
        .bytes()
        .then(EE__namespace.success)
        .catch((value) => EE__namespace.left("file-system-read-file", value)),
});

exports.readFile = readFile;
