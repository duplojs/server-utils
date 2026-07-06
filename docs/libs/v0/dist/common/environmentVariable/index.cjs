'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../../implementor.cjs');
var parseEnvironmentFiles = require('./parseEnvironmentFiles.cjs');
var expandEnvironmentVariables = require('./expandEnvironmentVariables.cjs');
var overrideEnvironmentVariables = require('./overrideEnvironmentVariables.cjs');

/**
 * {@include common/environmentVariable/index.md}
 */
const environmentVariable = implementor.implementFunction("environmentVariable", {
    NODE: async (shape, envFileParams) => {
        const baseEnv = utils.pipe(process.env, utils.O.entries, utils.A.filter((entry) => entry[1] !== undefined), utils.O.fromEntries);
        const parseEnvFileResult = await parseEnvironmentFiles.parseEnvironmentFiles(baseEnv, envFileParams?.includedFiles ?? envFileParams?.paths ?? []);
        if (utils.E.isLeft(parseEnvFileResult)) {
            return parseEnvFileResult;
        }
        const overrideEnvResult = overrideEnvironmentVariables.overrideEnvironmentVariables(parseEnvFileResult, envFileParams?.override ?? false);
        const expandEnvResult = expandEnvironmentVariables.expandEnvironmentVariables(overrideEnvResult);
        const schema = utils.DP.object(shape);
        const parsedEnvResult = schema.parse(expandEnvResult);
        if (utils.E.isLeft(parsedEnvResult)) {
            return parsedEnvResult;
        }
        if (envFileParams?.justRead !== true) {
            process.env = utils.unwrap(expandEnvResult);
        }
        return parsedEnvResult;
    },
    DENO: async (shape, envFileParams) => {
        const parseEnvFileResult = await parseEnvironmentFiles.parseEnvironmentFiles(Deno.env.toObject(), envFileParams?.includedFiles ?? envFileParams?.paths ?? []);
        if (utils.E.isLeft(parseEnvFileResult)) {
            return parseEnvFileResult;
        }
        const overrideEnvResult = overrideEnvironmentVariables.overrideEnvironmentVariables(parseEnvFileResult, envFileParams?.override ?? false);
        const expandEnvResult = expandEnvironmentVariables.expandEnvironmentVariables(overrideEnvResult);
        const schema = utils.DP.object(shape);
        const parsedEnvResult = schema.parse(expandEnvResult);
        if (utils.E.isLeft(parsedEnvResult)) {
            return parsedEnvResult;
        }
        if (envFileParams?.justRead !== true) {
            for (const [key, value] of utils.O.entries(expandEnvResult)) {
                if (value) {
                    Deno.env.set(key, value);
                }
            }
        }
        return parsedEnvResult;
    },
});

exports.environmentVariable = environmentVariable;
