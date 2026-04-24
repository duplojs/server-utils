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
 * {@include file/writeFile/index.md}
 */
const writeFile = implementor.implementFunction("writeFile", {
    NODE: async (path, data) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.writeFile(path, data)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-write-file", value));
    },
    DENO: (path, data) => Deno
        .writeFile(path, data)
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-write-file", value)),
    BUN: (path, data) => Bun
        .file(path)
        .write(data)
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-write-file", value)),
});

exports.writeFile = writeFile;
