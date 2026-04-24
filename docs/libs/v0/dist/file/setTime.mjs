import * as EE from '@duplojs/utils/either';
import * as DD from '@duplojs/utils/date';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/setTime/index.md}
 */
const setTime = implementFunction("setTime", {
    NODE: async (path, { accessTime, modifiedTime }) => {
        const fs = await nodeFileSystem.value;
        return fs.utimes(path, DD.toTimestamp(accessTime), DD.toTimestamp(modifiedTime))
            .then(EE.ok)
            .catch((value) => EE.left("file-system-set-time", value));
    },
    DENO: (path, { accessTime, modifiedTime }) => Deno
        .utime(path, DD.toTimestamp(accessTime), DD.toTimestamp(modifiedTime))
        .then(EE.ok)
        .catch((value) => EE.left("file-system-set-time", value)),
});

export { setTime };
