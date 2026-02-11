'use strict';

var utils = require('@duplojs/utils');

const envVarRegex = /(?<!\\)\${(?<value>[^{}]+)}/g;
const escapedDollarRegex = /\\\$/g;
function expandValue(value, env, stack = new Set()) {
    return utils.S.replace(value, envVarRegex, ({ namedGroups }) => {
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
    return utils.G.reduce(utils.O.entries(env), utils.G.reduceFrom(env), ({ element: [key, value], lastValue, nextWithObject }) => nextWithObject(lastValue, {
        [key]: utils.S.replaceAll(expandValue(value, lastValue), escapedDollarRegex, "$"),
    }));
}

exports.expandEnvironmentVariables = expandEnvironmentVariables;
exports.expandValue = expandValue;
