import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/move/index.md}
 */
const move = implementFunction("move", {
    NODE: async (fromPath, toPath) => {
        const fs = await nodeFileSystem.value;
        return fs.rename(fromPath, toPath)
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (fromPath, toPath) => Deno.rename(fromPath, toPath)
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { move };
