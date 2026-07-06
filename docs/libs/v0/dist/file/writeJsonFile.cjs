'use strict';

var utils = require('@duplojs/utils');
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
 * {@include file/writeJsonFile/index.md}
 */
const writeJsonFile = implementor.implementFunction("writeJsonFile", {
    NODE: async (path, data, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return utils.pipe(EE__namespace.safeCallback(() => JSON.stringify(data, null, params?.space)), EE__namespace.matchInformation({
            "safe-callback-error": (value) => EE__namespace.left("file-system-write-json-file", value),
            "safe-callback-success": (value) => fs
                .writeFile(path, value, { encoding: "utf-8" })
                .then(EE__namespace.ok)
                .catch((value) => EE__namespace.left("file-system-write-json-file", value)),
        }));
    },
    DENO: async (path, data, params) => utils.pipe(EE__namespace.safeCallback(() => JSON.stringify(data, null, params?.space)), EE__namespace.matchInformation({
        "safe-callback-error": (value) => EE__namespace.left("file-system-write-json-file", value),
        "safe-callback-success": (value) => Deno
            .writeTextFile(path, value)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-write-json-file", value)),
    })),
    BUN: async (path, data, params) => utils.pipe(EE__namespace.safeCallback(() => JSON.stringify(data, null, params?.space)), EE__namespace.matchInformation({
        "safe-callback-error": (value) => EE__namespace.left("file-system-write-json-file", value),
        "safe-callback-success": (value) => Bun.file(path)
            .write(value)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-write-json-file", value)),
    })),
});

exports.writeJsonFile = writeJsonFile;
