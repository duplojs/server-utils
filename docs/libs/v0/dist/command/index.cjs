'use strict';

var index = require('./create/index.cjs');
var exec = require('./exec.cjs');
var execOptions = require('./execOptions.cjs');
var base = require('./options/base.cjs');
var boolean = require('./options/boolean.cjs');
var simple = require('./options/simple.cjs');
var array = require('./options/array.cjs');

/**
 * {@include command/index.md}
 */

exports.create = index.create;
exports.isCommand = index.isCommand;
exports.exec = exec.exec;
exports.execOptions = execOptions.execOptions;
exports.initOption = base.initOption;
exports.createBooleanOption = boolean.createBooleanOption;
exports.createOption = simple.createOption;
exports.createArrayOption = array.createArrayOption;
