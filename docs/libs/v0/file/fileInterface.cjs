'use strict';

var kind = require('../kind.cjs');
var utils = require('@duplojs/utils');
var rename = require('./rename.cjs');
var exists = require('./exists.cjs');
var move = require('./move.cjs');
var remove = require('./remove.cjs');
var stat = require('./stat.cjs');
var isSupportedExtensionFile = require('./mimeType/isSupportedExtensionFile.cjs');
var database = require('./mimeType/database.cjs');

const fileInterfaceKind = kind.createDuplojsServerUtilsKind("fileInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;
function createFileInterface(path) {
    const localPath = utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)));
    const name = utils.pipe(localPath, utils.S.split("/"), utils.A.last, utils.when(utils.isType("undefined"), utils.justReturn("")));
    const extension = utils.pipe(name, utils.S.split("."), utils.A.last, utils.P.when(utils.isType("string"), utils.whenElse(isSupportedExtensionFile.isSupportedExtensionFile, utils.forward, utils.justReturn(null))), utils.P.otherwise(utils.justReturn(null)));
    const mimeType = extension
        ? database.mimeType.get(extension)
        : null;
    function getParentPath() {
        return utils.S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
    }
    function localRename(newName) {
        return utils.asyncPipe(rename.rename(localPath, newName), utils.E.whenIsRight(() => utils.pipe(getParentPath(), (parentPath) => createFileInterface(`${parentPath}/${newName}`), utils.E.success)));
    }
    function exist() {
        return exists.exists(localPath);
    }
    function relocate(parentPath) {
        const newPath = utils.pipe(localPath, getParentPath, (localParentPath) => `${localParentPath}/${name}`);
        return utils.asyncPipe(parentPath, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (parentPath) => move.move(parentPath, newPath), utils.E.whenIsRight(() => utils.pipe(newPath, createFileInterface, utils.E.success)));
    }
    function localRemove() {
        return remove.remove(localPath);
    }
    function localStat() {
        return stat.stat(localPath);
    }
    return fileInterfaceKind.addTo({
        extension,
        name,
        path: localPath,
        mimeType,
        getParentPath,
        rename: localRename,
        exist,
        relocate,
        remove: localRemove,
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
