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
 * {@include file/truncate/index.md}
 */
const truncate = implementor.implementFunction("truncate", {
    NODE: async (path, size) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.truncate(path, size)
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-truncate", value));
    },
    DENO: (path, size) => utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (stringPath) => Deno
        .truncate(stringPath, size)
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-truncate", value))),
});

exports.truncate = truncate;
