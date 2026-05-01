import { Path } from '@duplojs/utils';
import { createDuplojsServerUtilsKind } from '../kind.mjs';
import { stat } from './stat.mjs';
import { exists } from './exists.mjs';

const unknownInterfaceKind = createDuplojsServerUtilsKind("unknownInterface");
/**
 * {@include file/createUnknownInterface/index.md}
 */
function createUnknownInterface(path) {
    function getName() {
        return Path.getBaseName(path);
    }
    function getParentPath() {
        return Path.getParentFolderPath(path);
    }
    function localStat() {
        return stat(path);
    }
    function exist() {
        return exists(path);
    }
    return unknownInterfaceKind.addTo({
        path,
        getName,
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
