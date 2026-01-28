import { pipe, when, instanceOf, S, A, isType, justReturn } from '@duplojs/utils';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { stat } from './stat.mjs';
import { exists } from './exists.mjs';

const unknownInterfaceKind = createDuplojsServerUtilsKind("unknownInterface");
const parentPathRegex = /^(.*?)\/+[^/]+\/*$/;
function createUnknownInterface(path) {
    const localPath = pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), when(S.endsWith("/"), S.slice(0, -1)));
    const name = pipe(localPath, S.split("/"), A.last, when(isType("undefined"), justReturn("")));
    function getParentPath() {
        return S.extract(localPath, parentPathRegex)?.groups.at(0) ?? "";
    }
    function localStat() {
        return stat(localPath);
    }
    function exist() {
        return exists(localPath);
    }
    return unknownInterfaceKind.addTo({
        path: localPath,
        name,
        getParentPath,
        stat: localStat,
        exist,
    });
}
/**
 * {@include file/isUnknownInterface/index.md}
 */
function isUnknownInterface(input) {
    return unknownInterfaceKind.has(input);
}

export { createUnknownInterface, isUnknownInterface };
