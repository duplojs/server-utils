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
 * {@include file/relocate/index.md}
 */
const relocate = implementor.implementFunction("relocate", {
    NODE: async (fromPath, newParentPath) => {
        const fs = await implementor.nodeFileSystem.value;
        const baseName = utils.Path.getBaseName(fromPath);
        if (!baseName) {
            return EE__namespace.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`));
        }
        const newPath = utils.Path.resolveRelative([newParentPath, baseName]);
        return fs.rename(fromPath, newPath)
            .then(() => EE__namespace.success(newPath))
            .catch((value) => EE__namespace.left("file-system-relocate", value));
    },
    DENO: (fromPath, newParentPath) => {
        const baseName = utils.Path.getBaseName(fromPath);
        if (!baseName) {
            return Promise.resolve(EE__namespace.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`)));
        }
        const newPath = utils.Path.resolveRelative([newParentPath, baseName]);
        return Deno.rename(fromPath, newPath)
            .then(() => EE__namespace.success(newPath))
            .catch((value) => EE__namespace.left("file-system-relocate", value));
    },
});

exports.relocate = relocate;
