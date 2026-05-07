'use strict';

var argument = require('./argument.cjs');
var create = require('./create.cjs');
var exec = require('./exec.cjs');
var execOptions = require('./execOptions.cjs');
var base = require('./options/base.cjs');
var boolean = require('./options/boolean.cjs');
var simple = require('./options/simple.cjs');
var array = require('./options/array.cjs');

/**
 * {@include command/index.md}
 */

exports.argumentKind = argument.argumentKind;
exports.createArgument = argument.createArgument;
exports.create = create.create;
exports.isCommands = create.isCommands;
exports.exec = exec.exec;
exports.execOptions = execOptions.execOptions;
exports.initOption = base.initOption;
exports.optionKind = base.optionKind;
exports.booleanOptionKind = boolean.booleanOptionKind;
exports.createBooleanOption = boolean.createBooleanOption;
exports.createOption = simple.createOption;
exports.simpleOptionKind = simple.simpleOptionKind;
exports.arrayOptionKind = array.arrayOptionKind;
exports.createArrayOption = array.createArrayOption;
