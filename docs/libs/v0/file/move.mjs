import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/move/index.md}
 */
const move = implementFunction("move", {
    NODE: async (fromPath, toPath) => {
        const fs = await import('node:fs/promises');
        return fs.rename(fromPath, toPath)
            .then(E.ok)
            .catch((value) => E.left("file-system-move", value));
    },
    DENO: (fromPath, toPath) => Deno.rename(fromPath, toPath)
        .then(E.ok)
        .catch((value) => E.left("file-system-move", value)),
});

export { move };
