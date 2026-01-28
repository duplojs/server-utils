import { D, E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/setTime/index.md}
 */
const setTime = implementFunction("setTime", {
    NODE: async (path, { accessTime, modifiedTime }) => {
        const fs = await nodeFileSystem.value;
        return fs.utimes(path, D.toTimestamp(accessTime), D.toTimestamp(modifiedTime))
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, { accessTime, modifiedTime }) => Deno
        .utime(path, D.toTimestamp(accessTime), D.toTimestamp(modifiedTime))
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { setTime };
