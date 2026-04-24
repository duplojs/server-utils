import { asyncPipe, innerPipe, Path, mimeType } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { rename } from './rename.mjs';
import { exists } from './exists.mjs';
import { move } from './move.mjs';
import { remove } from './remove.mjs';
import { stat } from './stat.mjs';
import { relocate } from './relocate.mjs';

const fileInterfaceKind = createDuplojsServerUtilsKind("fileInterface");
/**
 * {@include file/createFileInterface/index.md}
 */
function createFileInterface(path) {
    function getName() {
        return Path.getBaseName(path);
    }
    function getExtension(params) {
        return Path.getExtensionName(path, params);
    }
    function getMimeType() {
        const extension = getExtension();
        if (!extension) {
            return null;
        }
        return mimeType.get(extension) ?? null;
    }
    function getParentPath() {
        return Path.getParentFolderPath(path);
    }
    function localExists() {
        return exists(path);
    }
    function localRename(newName) {
        return asyncPipe(rename(path, newName), EE.whenIsRight(innerPipe(createFileInterface, EE.success)));
    }
    function localRelocate(newParentPath) {
        return asyncPipe(relocate(path, newParentPath), EE.whenIsRight(innerPipe(createFileInterface, EE.success)));
    }
    function localMove(newPath) {
        return asyncPipe(move(path, newPath), EE.whenIsRight(() => EE.success(createFileInterface(newPath))));
    }
    function localRemove() {
        return remove(path);
    }
    function localStat() {
        return stat(path);
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

export { createFileInterface, isFileInterface };
