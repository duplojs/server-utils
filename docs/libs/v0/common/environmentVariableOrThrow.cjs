'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var index = require('./environmentVariable/index.cjs');

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
    if (utils.E.isLeft(result)) {
        throw new EnvironmentVariableError(result);
    }
    return utils.unwrap(result);
}

exports.EnvironmentVariableError = EnvironmentVariableError;
exports.environmentVariableOrThrow = environmentVariableOrThrow;
