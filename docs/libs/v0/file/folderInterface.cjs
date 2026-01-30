'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var move = require('./move.cjs');
var exists = require('./exists.cjs');
var rename = require('./rename.cjs');
var remove = require('./remove.cjs');
var readDirectory = require('./readDirectory.cjs');
var stat = require('./stat.cjs');
var walkDirectory = require('./walkDirectory.cjs');
var relocate = require('./relocate.cjs');

const folderInterfaceKind = kind.createDuplojsServerUtilsKind("folderInterface");
/**
 * {@include file/createFolderInterface/index.md}
 */
function createFolderInterface(path) {
    function getName() {
        return utils.Path.getBaseName(path);
    }
    function getParentPath() {
        return utils.Path.getParentFolderPath(path);
    }
    function localRename(newName) {
        return utils.asyncPipe(rename.rename(path, newName), utils.E.whenIsRight(utils.innerPipe(createFolderInterface, utils.E.success)));
    }
    function localRelocate(newParentPath) {
        return utils.asyncPipe(relocate.relocate(path, newParentPath), utils.E.whenIsRight(utils.innerPipe(createFolderInterface, utils.E.success)));
    }
    function localMove(newPath) {
        return utils.asyncPipe(move.move(path, newPath), utils.E.whenIsRight(() => utils.E.success(createFolderInterface(newPath))));
    }
    function localExists() {
        return exists.exists(path);
    }
    function localRemove() {
        return remove.remove(path);
    }
    function localStat() {
        return stat.stat(path);
    }
    function getChildren() {
        return readDirectory.readDirectory(path);
    }
    function walk() {
        return walkDirectory.walkDirectory(path);
    }
    return folderInterfaceKind.addTo({
        path,
        getName,
        getParentPath,
        move: localMove,
        rename: localRename,
        exists: localExists,
        relocate: localRelocate,
        remove: localRemove,
        getChildren,
        stat: localStat,
        walk,
    });
}
/**
 * {@include file/isFolderInterface/index.md}
 */
function isFolderInterface(input) {
    return folderInterfaceKind.has(input);
}

exports.createFolderInterface = createFolderInterface;
exports.isFolderInterface = isFolderInterface;
