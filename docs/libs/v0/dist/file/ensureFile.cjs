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
 * {@include file/ensureFile/index.md}
 */
const ensureFile = implementor.implementFunction("ensureFile", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.open(path, "a")
            .then((fh) => fh.close())
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-ensure-file", value));
    },
    DENO: (path) => Deno.open(path, {
        write: true,
        create: true,
        append: true,
    })
        .then((fh) => void fh.close())
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-ensure-file", value)),
});

exports.ensureFile = ensureFile;
