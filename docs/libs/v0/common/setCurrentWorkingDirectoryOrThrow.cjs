'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var setCurrentWorkingDirectory = require('./setCurrentWorkingDirectory.cjs');

class SetCurrentWorkingDirectoryError extends utils.kindHeritage("set-working-directory-error", kind.createDuplojsServerUtilsKind("set-working-directory-error"), Error) {
    constructor() {
        super({}, ["Failed to set current working directory"]);
    }
}
/**
 * {@include common/setCurrentWorkingDirectoryOrThrow/index.md}
 */
function setCurrentWorkingDirectoryOrThrow(path) {
    const result = setCurrentWorkingDirectory.setCurrentWorkingDirectory(path);
    if (utils.E.isLeft(result)) {
        throw new SetCurrentWorkingDirectoryError();
    }
    return;
}

exports.SetCurrentWorkingDirectoryError = SetCurrentWorkingDirectoryError;
exports.setCurrentWorkingDirectoryOrThrow = setCurrentWorkingDirectoryOrThrow;
