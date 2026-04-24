import { pipe } from '@duplojs/utils';
import * as OO from '@duplojs/utils/object';
import * as AA from '@duplojs/utils/array';

function overrideEnvironmentVariables(arrayEnv, override) {
    return pipe(arrayEnv, AA.map(OO.entries), AA.flat, (entries) => override
        ? entries
        : AA.reverse(entries), OO.fromEntries);
}

export { overrideEnvironmentVariables };
