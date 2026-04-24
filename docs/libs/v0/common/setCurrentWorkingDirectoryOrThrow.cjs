'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var setCurrentWorkingDirectory = require('./setCurrentWorkingDirectory.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

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
    if (EE__namespace.isLeft(result)) {
        throw new SetCurrentWorkingDirectoryError();
    }
    return;
}

exports.SetCurrentWorkingDirectoryError = SetCurrentWorkingDirectoryError;
exports.setCurrentWorkingDirectoryOrThrow = setCurrentWorkingDirectoryOrThrow;
