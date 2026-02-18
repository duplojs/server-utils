import { pipe, E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
const getCurrentWorkDirectory = implementFunction("getCurrentWorkDirectory", {
    NODE: () => pipe(E.safeCallback(() => E.success(process.cwd())), E.whenIsLeft(E.error)),
    DENO: () => pipe(E.safeCallback(() => E.success(Deno.cwd())), E.whenIsLeft(E.error)),
});

export { getCurrentWorkDirectory };
