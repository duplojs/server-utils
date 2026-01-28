'use strict';

var database = require('./database.cjs');

/**
 * {@include file/mimeType/isSupportedExtensionFile/index.md}
 */
function isSupportedExtensionFile(input) {
    return database.mimeType.has(input);
}

exports.isSupportedExtensionFile = isSupportedExtensionFile;
