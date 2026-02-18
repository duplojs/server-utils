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

exports.getCurrentWorkDirectory = getCurrentWorkDirectory;
