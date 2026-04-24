'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var rename = require('./rename.cjs');
var exists = require('./exists.cjs');
var move = require('./move.cjs');
var remove = require('./remove.cjs');
var stat = require('./stat.cjs');
var relocate = require('./relocate.cjs');

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

const fileInterfaceKind = kind.createDuplojsServerUtilsKind("fileInterface");
/**
 * {@include file/createFileInterface/index.md}
 */
function createFileInterface(path) {
    function getName() {
        return utils.Path.getBaseName(path);
    }
    function getExtension(params) {
        return utils.Path.getExtensionName(path, params);
    }
    function getMimeType() {
        const extension = getExtension();
        if (!extension) {
            return null;
        }
        return utils.mimeType.get(extension) ?? null;
    }
    function getParentPath() {
        return utils.Path.getParentFolderPath(path);
    }
    function localExists() {
        return exists.exists(path);
    }
    function localRename(newName) {
        return utils.asyncPipe(rename.rename(path, newName), EE__namespace.whenIsRight(utils.innerPipe(createFileInterface, EE__namespace.success)));
    }
    function localRelocate(newParentPath) {
        return utils.asyncPipe(relocate.relocate(path, newParentPath), EE__namespace.whenIsRight(utils.innerPipe(createFileInterface, EE__namespace.success)));
    }
    function localMove(newPath) {
        return utils.asyncPipe(move.move(path, newPath), EE__namespace.whenIsRight(() => EE__namespace.success(createFileInterface(newPath))));
    }
    function localRemove() {
        return remove.remove(path);
    }
    function localStat() {
        return stat.stat(path);
    }
    return fileInterfaceKind.addTo({
        path,
        getName,
        getExtension,
        getMimeType,
        getParentPath,
        rename: localRename,
        exists: localExists,
        relocate: localRelocate,
        remove: localRemove,
        move: localMove,
        stat: localStat,
    });
}
/**
 * {@include file/isFileInterface/index.md}
 */
function isFileInterface(input) {
    return fileInterfaceKind.has(input);
}

exports.createFileInterface = createFileInterface;
exports.isFileInterface = isFileInterface;
