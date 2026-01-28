'use strict';

var getCurrentWorkDirectory = require('./getCurrentWorkDirectory.cjs');
var setCurrentWorkingDirectory = require('./setCurrentWorkingDirectory.cjs');

/**
 * {@include common/index.md}
 */

exports.getCurrentWorkDirectory = getCurrentWorkDirectory.getCurrentWorkDirectory;
exports.setCurrentWorkingDirectory = setCurrentWorkingDirectory.setCurrentWorkingDirectory;
