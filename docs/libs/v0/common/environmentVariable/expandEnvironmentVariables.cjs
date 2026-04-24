'use strict';

var GG = require('@duplojs/utils/generator');
var OO = require('@duplojs/utils/object');
var SS = require('@duplojs/utils/string');

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

var GG__namespace = /*#__PURE__*/_interopNamespaceDefault(GG);
var OO__namespace = /*#__PURE__*/_interopNamespaceDefault(OO);
var SS__namespace = /*#__PURE__*/_interopNamespaceDefault(SS);

const envVarRegex = /(?<!\\)\${(?<value>[^{}]+)}/g;
const escapedDollarRegex = /\\\$/g;
function expandValue(value, env, stack = new Set()) {
    return SS__namespace.replace(value, envVarRegex, ({ namedGroups }) => {
        const value = namedGroups.value;
        const rawEnvValue = env[value];
        if (rawEnvValue === undefined || stack.has(value)) {
            return "";
        }
        stack.add(value);
        const resolved = expandValue(rawEnvValue, env, stack);
        stack.delete(value);
        return resolved;
    });
}
function expandEnvironmentVariables(env) {
    return GG__namespace.reduce(OO__namespace.entries(env), GG__namespace.reduceFrom(env), ({ element: [key, value], lastValue, nextWithObject }) => nextWithObject(lastValue, {
        [key]: SS__namespace.replaceAll(expandValue(value, lastValue), escapedDollarRegex, "$"),
    }));
}

exports.expandEnvironmentVariables = expandEnvironmentVariables;
exports.expandValue = expandValue;
