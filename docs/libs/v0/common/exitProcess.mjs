import { implementFunction } from '../implementor.mjs';

/**
 * {@include common/exitProcess/index.md}
 */
const exitProcess = implementFunction("exitProcess", {
    NODE: (code) => process.exit(code),
    DENO: (code) => Deno.exit(code),
});

export { exitProcess };
