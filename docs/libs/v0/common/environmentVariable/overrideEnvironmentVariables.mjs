import { pipe, A, O } from '@duplojs/utils';

function overrideEnvironmentVariables(arrayEnv, override) {
    return pipe(arrayEnv, A.map(O.entries), A.flat, (entries) => override
        ? entries
        : A.reverse(entries), O.fromEntries);
}

export { overrideEnvironmentVariables };
