import { D, E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/setTime/index.md}
 */
const setTime = implementFunction("setTime", {
    NODE: async (path, { accessTime, modifiedTime }) => {
        const fs = await import('node:fs/promises');
        return fs.utimes(path, D.toTimestamp(accessTime), D.toTimestamp(modifiedTime))
            .then(E.ok)
            .catch((value) => E.left("file-system-set-time", value));
    },
    DENO: (path, { accessTime, modifiedTime }) => Deno
        .utime(path, D.toTimestamp(accessTime), D.toTimestamp(modifiedTime))
        .then(E.ok)
        .catch((value) => E.left("file-system-set-time", value)),
});

export { setTime };
