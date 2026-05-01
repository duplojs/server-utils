import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/symlink/index.md}
 */
const symlink = implementFunction("symlink", {
    NODE: async (oldPath, newPath, params) => {
        const fs = await nodeFileSystem.value;
        return fs.symlink(oldPath, newPath, params?.type)
            .then(EE.ok)
            .catch((value) => EE.left("file-system-symlink", value));
    },
    DENO: (oldPath, newPath, params) => Deno
        .symlink(oldPath, newPath, params)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-symlink", value)),
});

export { symlink };
