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
 * {@include file/rename/index.md}
 */
const rename = implementor.implementFunction("rename", {
    NODE: async (path, newName) => {
        const fs = await implementor.nodeFileSystem.value;
        const parentPath = utils.Path.getParentFolderPath(path);
        if (!parentPath) {
            return EE__namespace.left("file-system-rename", new Error(`Invalid parent path ${parentPath}.`));
        }
        if (newName.includes("/")) {
            return EE__namespace.left("file-system-rename", new Error(`Invalid new name ${newName}.`));
        }
        const newPath = utils.Path.resolveRelative([parentPath, newName]);
        return fs.rename(path, newPath)
            .then(() => EE__namespace.success(newPath))
            .catch((value) => EE__namespace.left("file-system-rename", value));
    },
    DENO: (path, newName) => {
        const parentPath = utils.Path.getParentFolderPath(path);
        if (!parentPath) {
            return Promise.resolve(EE__namespace.left("file-system-rename", new Error(`Invalid parent path ${parentPath}.`)));
        }
        if (newName.includes("/")) {
            return Promise.resolve(EE__namespace.left("file-system-rename", new Error(`Invalid new name ${newName}.`)));
        }
        const newPath = utils.Path.resolveRelative([parentPath, newName]);
        return Deno.rename(path, newPath)
            .then(() => EE__namespace.success(newPath))
            .catch((value) => EE__namespace.left("file-system-rename", value));
    },
});

exports.rename = rename;
