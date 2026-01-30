'use strict';

var kind = require('../kind.cjs');
var utils = require('@duplojs/utils');
var rename = require('./rename.cjs');
var exists = require('./exists.cjs');
var move = require('./move.cjs');
var remove = require('./remove.cjs');
var stat = require('./stat.cjs');
var relocate = require('./relocate.cjs');

const fileInterfaceKind = kind.createDuplojsServerUtilsKind("fileInterface");
/**
 * {@include file/createFileInterface/index.md}
 */
function createFileInterface(path) {
    function getName() {
        return utils.Path.getBaseName(path);
    }
    function getExtension() {
        return utils.Path.getExtensionName(path);
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
        return utils.asyncPipe(rename.rename(path, newName), utils.E.whenIsRight(utils.innerPipe(createFileInterface, utils.E.success)));
    }
    function localRelocate(newParentPath) {
        return utils.asyncPipe(relocate.relocate(path, newParentPath), utils.E.whenIsRight(utils.innerPipe(createFileInterface, utils.E.success)));
    }
    function localMove(newPath) {
        return utils.asyncPipe(move.move(path, newPath), utils.E.whenIsRight(() => utils.E.success(createFileInterface(newPath))));
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
