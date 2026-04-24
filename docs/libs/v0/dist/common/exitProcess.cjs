'use strict';

var implementor = require('../implementor.cjs');

/**
 * {@include common/exitProcess/index.md}
 */
const exitProcess = implementor.implementFunction("exitProcess", {
    NODE: (code) => process.exit(code),
    DENO: (code) => Deno.exit(code),
});

exports.exitProcess = exitProcess;
