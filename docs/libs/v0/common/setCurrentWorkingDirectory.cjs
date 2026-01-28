'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include common/setCurrentWorkingDirectory/index.md}
 */
const setCurrentWorkingDirectory = implementor.implementFunction("setCurrentWorkingDirectory", {
    NODE: (path) => utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => utils.E.safeCallback(() => void process.chdir(path)), utils.P.when(utils.E.isLeft, utils.E.fail), utils.P.otherwise(utils.E.ok)),
    DENO: (path) => utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (path) => utils.E.safeCallback(() => void Deno.chdir(path)), utils.P.when(utils.E.isLeft, utils.E.fail), utils.P.otherwise(utils.E.ok)),
});

exports.setCurrentWorkingDirectory = setCurrentWorkingDirectory;
