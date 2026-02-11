import { E, DP, O, pipe, A, unwrap } from '@duplojs/utils';
import { implementFunction } from '../../implementor.mjs';
import { parseEnvironmentFiles } from './parseEnvironmentFiles.mjs';
import { expandEnvironmentVariables } from './expandEnvironmentVariables.mjs';
import { overrideEnvironmentVariables } from './overrideEnvironmentVariables.mjs';

/**
 * {@include common/environmentVariable/index.md}
 */
const environmentVariable = implementFunction("environmentVariable", {
    NODE: async (shape, params) => {
        const baseEnv = pipe(process.env, O.entries, A.filter((entry) => entry[1] !== undefined), O.fromEntries);
        const parseEnvFileResult = await parseEnvironmentFiles(baseEnv, params?.paths ?? []);
        if (E.isLeft(parseEnvFileResult)) {
            return parseEnvFileResult;
        }
        const overrideEnvResult = overrideEnvironmentVariables(parseEnvFileResult, params?.override ?? false);
        const expandEnvResult = expandEnvironmentVariables(overrideEnvResult);
        const schema = DP.object(shape);
        const parsedEnvResult = schema.parse(expandEnvResult);
        if (E.isLeft(parsedEnvResult)) {
            return parsedEnvResult;
        }
        if (params?.justRead !== true) {
            process.env = unwrap(expandEnvResult);
        }
        return parsedEnvResult;
    },
    DENO: async (shape, params) => {
        const parseEnvFileResult = await parseEnvironmentFiles(Deno.env.toObject(), params?.paths ?? []);
        if (E.isLeft(parseEnvFileResult)) {
            return parseEnvFileResult;
        }
        const overrideEnvResult = overrideEnvironmentVariables(parseEnvFileResult, params?.override ?? false);
        const expandEnvResult = expandEnvironmentVariables(overrideEnvResult);
        const schema = DP.object(shape);
        const parsedEnvResult = schema.parse(expandEnvResult);
        if (E.isLeft(parsedEnvResult)) {
            return parsedEnvResult;
        }
        if (params?.justRead !== true) {
            for (const [key, value] of O.entries(expandEnvResult)) {
                if (value) {
                    Deno.env.set(key, value);
                }
            }
        }
        return parsedEnvResult;
    },
});

export { environmentVariable };
