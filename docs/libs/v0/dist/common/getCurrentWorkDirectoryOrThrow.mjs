import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/getCurrentWorkDirectoryOrThrow/index.md}
 */
const getCurrentWorkDirectoryOrThrow = implementFunction("getCurrentWorkDirectoryOrThrow", {
    NODE: () => process.cwd(),
    DENO: () => Deno.cwd(),
});

export { getCurrentWorkDirectoryOrThrow };
