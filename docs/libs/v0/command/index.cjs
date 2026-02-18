'use strict';

var errors = require('./errors.cjs');
var create = require('./create.cjs');
var exec = require('./exec.cjs');
var printer = require('./printer.cjs');
var help = require('./help.cjs');
var base = require('./options/base.cjs');
var boolean = require('./options/boolean.cjs');
var simple = require('./options/simple.cjs');
var array = require('./options/array.cjs');

/**
 * {@include command/index.md}
 */

exports.CommandManyArgumentsError = errors.CommandManyArgumentsError;
exports.CommandOptionRequiredError = errors.CommandOptionRequiredError;
exports.CommandOptionValueLooksLikeOptionError = errors.CommandOptionValueLooksLikeOptionError;
exports.CommandOptionValueNotRequiredError = errors.CommandOptionValueNotRequiredError;
exports.create = create.create;
exports.exec = exec.exec;
Object.defineProperty(exports, "Printer", {
	enumerable: true,
	get: function () { return printer.Printer; }
});
exports.logHelp = help.logHelp;
exports.initOption = base.initOption;
exports.createBooleanOption = boolean.createBooleanOption;
exports.createOption = simple.createOption;
exports.createArrayOption = array.createArrayOption;
