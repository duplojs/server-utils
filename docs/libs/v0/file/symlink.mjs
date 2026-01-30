import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/symlink/index.md}
 */
const symlink = implementFunction("symlink", {
    NODE: async (oldPath, newPath, params) => {
        const fs = await nodeFileSystem.value;
        return fs.symlink(oldPath, newPath, params?.type)
            .then(E.ok)
            .catch((value) => E.left("file-system-symlink", value));
    },
    DENO: (oldPath, newPath, params) => Deno
        .symlink(oldPath, newPath, params)
        .then(E.ok)
        .catch((value) => E.left("file-system-symlink", value)),
});

export { symlink };
