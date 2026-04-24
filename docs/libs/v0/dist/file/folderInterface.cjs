'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var move = require('./move.cjs');
var exists = require('./exists.cjs');
var rename = require('./rename.cjs');
var remove = require('./remove.cjs');
var readDirectory = require('./readDirectory.cjs');
var stat = require('./stat.cjs');
var walkDirectory = require('./walkDirectory.cjs');
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
        return utils.asyncPipe(rename.rename(path, newName), EE__namespace.whenIsRight(utils.innerPipe(createFolderInterface, EE__namespace.success)));
    }
    function localRelocate(newParentPath) {
        return utils.asyncPipe(relocate.relocate(path, newParentPath), EE__namespace.whenIsRight(utils.innerPipe(createFolderInterface, EE__namespace.success)));
    }
    function localMove(newPath) {
        return utils.asyncPipe(move.move(path, newPath), EE__namespace.whenIsRight(() => EE__namespace.success(createFolderInterface(newPath))));
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
