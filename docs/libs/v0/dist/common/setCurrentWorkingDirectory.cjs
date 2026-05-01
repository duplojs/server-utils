'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var PP = require('@duplojs/utils/pattern');
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
var PP__namespace = /*#__PURE__*/_interopNamespaceDefault(PP);

/**
 * {@include common/setCurrentWorkingDirectory/index.md}
 */
const setCurrentWorkingDirectory = implementor.implementFunction("setCurrentWorkingDirectory", {
    NODE: (path) => utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => EE__namespace.safeCallback(() => void process.chdir(path)), PP__namespace.when(EE__namespace.isLeft, EE__namespace.fail), PP__namespace.otherwise(EE__namespace.ok)),
    DENO: (path) => utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => EE__namespace.safeCallback(() => void Deno.chdir(path)), PP__namespace.when(EE__namespace.isLeft, EE__namespace.fail), PP__namespace.otherwise(EE__namespace.ok)),
});

exports.setCurrentWorkingDirectory = setCurrentWorkingDirectory;
