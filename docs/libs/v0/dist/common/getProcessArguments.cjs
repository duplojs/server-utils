'use strict';

var implementor = require('../implementor.cjs');

let args = undefined;
/**
 * {@include common/getProcessArguments/index.md}
 */
const getProcessArguments = implementor.implementFunction("getProcessArguments", {
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

exports.getProcessArguments = getProcessArguments;
