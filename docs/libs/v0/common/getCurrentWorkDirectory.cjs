'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
const getCurrentWorkDirectory = implementor.implementFunction("getCurrentWorkDirectory", {
    NODE: () => utils.pipe(utils.E.safeCallback(() => utils.E.success(process.cwd())), utils.E.whenIsLeft(utils.E.error)),
    DENO: () => utils.pipe(utils.E.safeCallback(() => utils.E.success(Deno.cwd())), utils.E.whenIsLeft(utils.E.error)),
});
/**
 * {@include common/getCurrentWorkDirectoryOrThrow/index.md}
 */
const getCurrentWorkDirectoryOrThrow = implementor.implementFunction("getCurrentWorkDirectoryOrThrow", {
    NODE: () => process.cwd(),
    DENO: () => Deno.cwd(),
});

exports.getCurrentWorkDirectory = getCurrentWorkDirectory;
exports.getCurrentWorkDirectoryOrThrow = getCurrentWorkDirectoryOrThrow;
