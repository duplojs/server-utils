import { pipe, when, instanceOf, S, A, isType, justReturn, asyncPipe, E } from '@duplojs/utils';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { move } from './move.mjs';
import { exists } from './exists.mjs';
import { rename } from './rename.mjs';
import { remove } from './remove.mjs';
import { readDirectory } from './readDirectory.mjs';
import { stat } from './stat.mjs';
import { walkDirectory } from './walkDirectory.mjs';

const folderInterfaceKind = createDuplojsServerUtilsKind("folderInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;
function createFolderInterface(path) {
    const localPath = pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), when(S.endsWith("/"), S.slice(0, -1)));
    const name = pipe(localPath, S.split("/"), A.last, when(isType("undefined"), justReturn("")));
    function getParentPath() {
        return S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
    }
    function localRename(newName) {
        return asyncPipe(rename(localPath, newName), E.whenIsRight(() => pipe(getParentPath(), (parentPath) => `${parentPath}/${newName}`, createFolderInterface, E.success)));
    }
    function exist() {
        return exists(localPath);
    }
    function relocate(parentPath) {
        const newPath = pipe(localPath, getParentPath, (localParentPath) => `${localParentPath}/${name}`);
        return asyncPipe(parentPath, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (parentPath) => move(parentPath, newPath), E.whenIsRight(() => pipe(newPath, createFolderInterface, E.success)));
    }
    function localRemove() {
        return remove(localPath, { recursive: true });
    }
    function getChildren() {
        return readDirectory(localPath);
    }
    function localStat() {
        return stat(localPath);
    }
    function walk() {
        return walkDirectory(localPath);
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

export { createFolderInterface, isFolderInterface };
