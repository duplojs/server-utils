import * as GG from '@duplojs/utils/generator';
import * as OO from '@duplojs/utils/object';
import * as SS from '@duplojs/utils/string';

const envVarRegex = /(?<!\\)\${(?<value>[^{}]+)}/g;
const escapedDollarRegex = /\\\$/g;
function expandValue(value, env, stack = new Set()) {
    return SS.replace(value, envVarRegex, ({ namedGroups }) => {
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
    return GG.reduce(OO.entries(env), GG.reduceFrom(env), ({ element: [key, value], lastValue, nextWithObject }) => nextWithObject(lastValue, {
        [key]: SS.replaceAll(expandValue(value, lastValue), escapedDollarRegex, "$"),
    }));
}

export { expandEnvironmentVariables, expandValue };
