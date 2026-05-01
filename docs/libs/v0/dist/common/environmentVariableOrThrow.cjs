'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var index = require('./environmentVariable/index.cjs');

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

class EnvironmentVariableError extends utils.kindHeritage("environment-variable-error", kind.createDuplojsServerUtilsKind("environment-variable-error"), Error) {
    error;
    constructor(error) {
        super({}, ["Failed to load environment variables: one env file could not be read or parsed values do not match the provided schema."]);
        this.error = error;
    }
}
/**
 * {@include common/environmentVariableOrThrow/index.md}
 */
async function environmentVariableOrThrow(shape, params) {
    const result = await index.environmentVariable(shape, params);
    if (EE__namespace.isLeft(result)) {
        throw new EnvironmentVariableError(result);
    }
    return utils.unwrap(result);
}

exports.EnvironmentVariableError = EnvironmentVariableError;
exports.environmentVariableOrThrow = environmentVariableOrThrow;
