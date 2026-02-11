import { G, O, S } from '@duplojs/utils';

const envVarRegex = /(?<!\\)\${(?<value>[^{}]+)}/g;
const escapedDollarRegex = /\\\$/g;
function expandValue(value, env, stack = new Set()) {
    return S.replace(value, envVarRegex, ({ namedGroups }) => {
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
    return G.reduce(O.entries(env), G.reduceFrom(env), ({ element: [key, value], lastValue, nextWithObject }) => nextWithObject(lastValue, {
        [key]: S.replaceAll(expandValue(value, lastValue), escapedDollarRegex, "$"),
    }));
}

export { expandEnvironmentVariables, expandValue };
