'use strict';

var implementor = require('../implementor.cjs');

/**
 * {@include common/getCurrentWorkDirectoryOrThrow/index.md}
 */
const getCurrentWorkDirectoryOrThrow = implementor.implementFunction("getCurrentWorkDirectoryOrThrow", {
    NODE: () => process.cwd(),
    DENO: () => Deno.cwd(),
});

exports.getCurrentWorkDirectoryOrThrow = getCurrentWorkDirectoryOrThrow;
