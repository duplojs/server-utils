'use strict';

var create = require('./create.cjs');
var exec = require('./exec.cjs');
var help = require('./help.cjs');
var error = require('./error.cjs');
var execOptions = require('./execOptions.cjs');
var base = require('./options/base.cjs');
var boolean = require('./options/boolean.cjs');
var simple = require('./options/simple.cjs');
var array = require('./options/array.cjs');

/**
 * {@include command/index.md}
 */

exports.create = create.create;
exports.exec = exec.exec;
exports.formatSubject = help.formatSubject;
exports.logCommandHelp = help.logCommandHelp;
exports.logExecOptionHelp = help.logExecOptionHelp;
exports.renderCommandHelp = help.renderCommandHelp;
exports.renderExecOptionHelp = help.renderExecOptionHelp;
exports.renderOptionsHelp = help.renderOptionsHelp;
exports.SymbolCommandError = error.SymbolCommandError;
exports.addDataParserError = error.addDataParserError;
exports.addIssue = error.addIssue;
exports.createError = error.createError;
exports.interpretCommandError = error.interpretCommandError;
exports.interpretExecOptionError = error.interpretExecOptionError;
exports.popErrorPath = error.popErrorPath;
exports.setErrorPath = error.setErrorPath;
exports.execOptions = execOptions.execOptions;
exports.initOption = base.initOption;
exports.createBooleanOption = boolean.createBooleanOption;
exports.createOption = simple.createOption;
exports.createArrayOption = array.createArrayOption;
