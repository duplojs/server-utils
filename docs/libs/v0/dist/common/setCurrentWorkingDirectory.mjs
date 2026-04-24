import { pipe, when, instanceOf } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import * as PP from '@duplojs/utils/pattern';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/setCurrentWorkingDirectory/index.md}
 */
const setCurrentWorkingDirectory = implementFunction("setCurrentWorkingDirectory", {
    NODE: (path) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => EE.safeCallback(() => void process.chdir(path)), PP.when(EE.isLeft, EE.fail), PP.otherwise(EE.ok)),
    DENO: (path) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => EE.safeCallback(() => void Deno.chdir(path)), PP.when(EE.isLeft, EE.fail), PP.otherwise(EE.ok)),
});

export { setCurrentWorkingDirectory };
