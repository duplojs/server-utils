'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include common/getCurrentWorkDirectory/index.md}
 */
const getCurrentWorkDirectory = implementor.implementFunction("getCurrentWorkDirectory", {
    NODE: () => utils.pipe(utils.E.safeCallback(() => process.cwd()), utils.P.when(utils.E.isLeft, utils.E.fail), utils.P.otherwise((result) => utils.E.success(utils.unwrap(result)))),
    DENO: () => utils.pipe(utils.E.safeCallback(() => Deno.cwd()), utils.P.when(utils.E.isLeft, utils.E.fail), utils.P.otherwise((result) => utils.E.success(utils.unwrap(result)))),
});

exports.getCurrentWorkDirectory = getCurrentWorkDirectory;
