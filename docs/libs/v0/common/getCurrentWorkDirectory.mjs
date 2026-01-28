import { pipe, E, P, unwrap } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
const getCurrentWorkDirectory = implementFunction("getCurrentWorkDirectory", {
    NODE: () => pipe(E.safeCallback(() => process.cwd()), P.when(E.isLeft, E.fail), P.otherwise((result) => E.success(unwrap(result)))),
    DENO: () => pipe(E.safeCallback(() => Deno.cwd()), P.when(E.isLeft, E.fail), P.otherwise((result) => E.success(unwrap(result)))),
});

export { getCurrentWorkDirectory };
