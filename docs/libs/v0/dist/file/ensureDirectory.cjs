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
 * {@include file/ensureDirectory/index.md}
 */
const ensureDirectory = implementor.implementFunction("ensureDirectory", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.mkdir(path, {
            recursive: true,
        })
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-ensure-directory", value));
    },
    DENO: (path) => Deno.mkdir(path, {
        recursive: true,
    })
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-ensure-directory", value)),
});

exports.ensureDirectory = ensureDirectory;
