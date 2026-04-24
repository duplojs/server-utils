import { pipe } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
const getCurrentWorkDirectory = implementFunction("getCurrentWorkDirectory", {
    NODE: () => pipe(EE.safeCallback(() => EE.success(process.cwd())), EE.whenIsLeft(EE.error)),
    DENO: () => pipe(EE.safeCallback(() => EE.success(Deno.cwd())), EE.whenIsLeft(EE.error)),
});

export { getCurrentWorkDirectory };
