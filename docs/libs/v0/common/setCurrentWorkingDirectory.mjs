import { pipe, when, instanceOf, E, P } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/setCurrentWorkingDirectory/index.md}
 */
const setCurrentWorkingDirectory = implementFunction("setCurrentWorkingDirectory", {
    NODE: (path) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => E.safeCallback(() => void process.chdir(path)), P.when(E.isLeft, E.fail), P.otherwise(E.ok)),
    DENO: (path) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => E.safeCallback(() => void Deno.chdir(path)), P.when(E.isLeft, E.fail), P.otherwise(E.ok)),
});

export { setCurrentWorkingDirectory };
