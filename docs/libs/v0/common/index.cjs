'use strict';

var getCurrentWorkDirectory = require('./getCurrentWorkDirectory.cjs');
var setCurrentWorkingDirectory = require('./setCurrentWorkingDirectory.cjs');
var index = require('./environmentVariable/index.cjs');
var environmentVariableOrThrow = require('./environmentVariableOrThrow.cjs');

/**
 * {@include common/index.md}
 */

exports.getCurrentWorkDirectory = getCurrentWorkDirectory.getCurrentWorkDirectory;
exports.getCurrentWorkDirectoryOrThrow = getCurrentWorkDirectory.getCurrentWorkDirectoryOrThrow;
exports.setCurrentWorkingDirectory = setCurrentWorkingDirectory.setCurrentWorkingDirectory;
exports.environmentVariable = index.environmentVariable;
exports.EnvironmentVariableError = environmentVariableOrThrow.EnvironmentVariableError;
exports.environmentVariableOrThrow = environmentVariableOrThrow.environmentVariableOrThrow;
