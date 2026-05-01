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
 * {@include common/getCurrentWorkDirectory/index.md}
 */
const getCurrentWorkDirectory = implementor.implementFunction("getCurrentWorkDirectory", {
    NODE: () => utils.pipe(EE__namespace.safeCallback(() => EE__namespace.success(process.cwd())), EE__namespace.whenIsLeft(EE__namespace.error)),
    DENO: () => utils.pipe(EE__namespace.safeCallback(() => EE__namespace.success(Deno.cwd())), EE__namespace.whenIsLeft(EE__namespace.error)),
});

exports.getCurrentWorkDirectory = getCurrentWorkDirectory;
