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

const folderInterfaceKind = kind.createDuplojsServerUtilsKind("folderInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;
function createFolderInterface(path) {
    const localPath = utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), utils.when(utils.S.endsWith("/"), utils.S.slice(0, -1)));
    const name = utils.pipe(localPath, utils.S.split("/"), utils.A.last, utils.when(utils.isType("undefined"), utils.justReturn("")));
    function getParentPath() {
        return utils.S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
    }
    function localRename(newName) {
        return utils.asyncPipe(rename.rename(localPath, newName), utils.E.whenIsRight(() => utils.pipe(getParentPath(), (parentPath) => `${parentPath}/${newName}`, createFolderInterface, utils.E.success)));
    }
    function exist() {
        return exists.exists(localPath);
    }
    function relocate(parentPath) {
        const newPath = utils.pipe(localPath, getParentPath, (localParentPath) => `${localParentPath}/${name}`);
        return utils.asyncPipe(parentPath, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (parentPath) => move.move(parentPath, newPath), utils.E.whenIsRight(() => utils.pipe(newPath, createFolderInterface, utils.E.success)));
    }
    function localRemove() {
        return remove.remove(localPath, { recursive: true });
    }
    function getChildren() {
        return readDirectory.readDirectory(localPath);
    }
    function localStat() {
        return stat.stat(localPath);
    }
    function walk() {
        return walkDirectory.walkDirectory(localPath);
    }
    return folderInterfaceKind.addTo({
        path: localPath,
        name,
        getParentPath,
        rename: localRename,
        exist,
        relocate,
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
