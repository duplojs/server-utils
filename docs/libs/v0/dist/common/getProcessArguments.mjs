import { implementFunction } from '../implementor.mjs';

let args = undefined;
/**
 * {@include common/getProcessArguments/index.md}
 */
const getProcessArguments = implementFunction("getProcessArguments", {
    NODE: () => {
        if (args) {
            return args;
        }
        args = process.argv.slice(2);
        return args;
    },
    DENO: () => Deno.args,
    BUN: () => {
        if (args) {
            return args;
        }
        args = Bun.argv.slice(2);
        return args;
    },
});

export { getProcessArguments };
