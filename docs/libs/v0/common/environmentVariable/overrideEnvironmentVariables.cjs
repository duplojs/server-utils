'use strict';

var utils = require('@duplojs/utils');

function overrideEnvironmentVariables(arrayEnv, override) {
    return utils.pipe(arrayEnv, utils.A.map(utils.O.entries), utils.A.flat, (entries) => override
        ? entries
        : utils.A.reverse(entries), utils.O.fromEntries);
}

exports.overrideEnvironmentVariables = overrideEnvironmentVariables;
