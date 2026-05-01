'use strict';

var utils = require('@duplojs/utils');
var OO = require('@duplojs/utils/object');
var AA = require('@duplojs/utils/array');

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

var OO__namespace = /*#__PURE__*/_interopNamespaceDefault(OO);
var AA__namespace = /*#__PURE__*/_interopNamespaceDefault(AA);

function overrideEnvironmentVariables(arrayEnv, override) {
    return utils.pipe(arrayEnv, AA__namespace.map(OO__namespace.entries), AA__namespace.flat, (entries) => override
        ? entries
        : AA__namespace.reverse(entries), OO__namespace.fromEntries);
}

exports.overrideEnvironmentVariables = overrideEnvironmentVariables;
