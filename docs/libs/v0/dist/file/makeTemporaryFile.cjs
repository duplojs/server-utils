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
 * {@include file/makeTemporaryFile/index.md}
 */
const makeTemporaryFile = implementor.implementFunction("makeTemporaryFile", {
    NODE: async (prefix, suffix) => {
        const fs = await implementor.nodeFileSystem.value;
        const os = await implementor.nodeOs.value;
        const crypto = await implementor.nodeCrypto.value;
        const fileTemporaryPath = utils.Path.resolveRelative([
            os.tmpdir(),
            `${prefix}${crypto.randomUUID()}${suffix ?? ""}`,
        ]);
        return fs.open(fileTemporaryPath, "wx")
            .then((fh) => fh.close())
            .then(() => EE__namespace.success(fileTemporaryPath))
            .catch((value) => EE__namespace.left("file-system-make-temporary-file", value));
    },
    DENO: (prefix, suffix) => Deno.makeTempFile({
        prefix,
        suffix,
    })
        .then(EE__namespace.success)
        .catch((value) => EE__namespace.left("file-system-make-temporary-file", value)),
});

exports.makeTemporaryFile = makeTemporaryFile;
