import { asyncPipe, E, innerPipe, Path } from '@duplojs/utils';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { move } from './move.mjs';
import { exists } from './exists.mjs';
import { rename } from './rename.mjs';
import { remove } from './remove.mjs';
import { readDirectory } from './readDirectory.mjs';
import { stat } from './stat.mjs';
import { walkDirectory } from './walkDirectory.mjs';
import { relocate } from './relocate.mjs';

const folderInterfaceKind = createDuplojsServerUtilsKind("folderInterface");
/**
 * {@include file/createFolderInterface/index.md}
 */
function createFolderInterface(path) {
    function getName() {
        return Path.getBaseName(path);
    }
    function getParentPath() {
        return Path.getParentFolderPath(path);
    }
    function localRename(newName) {
        return asyncPipe(rename(path, newName), E.whenIsRight(innerPipe(createFolderInterface, E.success)));
    }
    function localRelocate(newParentPath) {
        return asyncPipe(relocate(path, newParentPath), E.whenIsRight(innerPipe(createFolderInterface, E.success)));
    }
    function localMove(newPath) {
        return asyncPipe(move(path, newPath), E.whenIsRight(() => E.success(createFolderInterface(newPath))));
    }
    function localExists() {
        return exists(path);
    }
    function localRemove() {
        return remove(path);
    }
    function localStat() {
        return stat(path);
    }
    function getChildren() {
        return readDirectory(path);
    }
    function walk() {
        return walkDirectory(path);
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

export { createFolderInterface, isFolderInterface };
