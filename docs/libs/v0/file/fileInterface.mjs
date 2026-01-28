import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { pipe, when, instanceOf, S, A, isType, justReturn, P, whenElse, forward, asyncPipe, E } from '@duplojs/utils';
import { rename } from './rename.mjs';
import { exists } from './exists.mjs';
import { move } from './move.mjs';
import { remove } from './remove.mjs';
import { stat } from './stat.mjs';
import { isSupportedExtensionFile } from './mimeType/isSupportedExtensionFile.mjs';
import { mimeType } from './mimeType/database.mjs';

const fileInterfaceKind = createDuplojsServerUtilsKind("fileInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;
function createFileInterface(path) {
    const localPath = pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)));
    const name = pipe(localPath, S.split("/"), A.last, when(isType("undefined"), justReturn("")));
    const extension = pipe(name, S.split("."), A.last, P.when(isType("string"), whenElse(isSupportedExtensionFile, forward, justReturn(null))), P.otherwise(justReturn(null)));
    const mimeType$1 = extension
        ? mimeType.get(extension)
        : null;
    function getParentPath() {
        return S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
    }
    function localRename(newName) {
        return asyncPipe(rename(localPath, newName), E.whenIsRight(() => pipe(getParentPath(), (parentPath) => createFileInterface(`${parentPath}/${newName}`), E.success)));
    }
    function exist() {
        return exists(localPath);
    }
    function relocate(parentPath) {
        const newPath = pipe(localPath, getParentPath, (localParentPath) => `${localParentPath}/${name}`);
        return asyncPipe(parentPath, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (parentPath) => move(parentPath, newPath), E.whenIsRight(() => pipe(newPath, createFileInterface, E.success)));
    }
    function localRemove() {
        return remove(localPath);
    }
    function localStat() {
        return stat(localPath);
    }
    return fileInterfaceKind.addTo({
        extension,
        name,
        path: localPath,
        mimeType: mimeType$1,
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

export { createFileInterface, isFileInterface };
