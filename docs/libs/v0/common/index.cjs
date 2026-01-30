'use strict';

var getCurrentWorkDirectory = require('./getCurrentWorkDirectory.cjs');
var setCurrentWorkingDirectory = require('./setCurrentWorkingDirectory.cjs');

/**
 * {@include common/index.md}
 */

exports.getCurrentWorkDirectory = getCurrentWorkDirectory.getCurrentWorkDirectory;
exports.getCurrentWorkDirectoryOrThrow = getCurrentWorkDirectory.getCurrentWorkDirectoryOrThrow;
exports.setCurrentWorkingDirectory = setCurrentWorkingDirectory.setCurrentWorkingDirectory;
