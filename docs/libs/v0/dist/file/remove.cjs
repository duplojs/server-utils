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
 * {@include file/remove/index.md}
 */
const remove = implementor.implementFunction("remove", {
    NODE: async (path, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.rm(path, {
            recursive: params?.recursive ?? false,
            force: true,
        })
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-remove", value));
    },
    DENO: (path, params) => Deno.remove(path, {
        recursive: params?.recursive,
    })
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-remove", value)),
});

exports.remove = remove;
