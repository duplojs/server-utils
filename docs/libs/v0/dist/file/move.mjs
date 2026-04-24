import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/move/index.md}
 */
const move = implementFunction("move", {
    NODE: async (fromPath, toPath) => {
        const fs = await nodeFileSystem.value;
        return fs.rename(fromPath, toPath)
            .then(EE.ok)
            .catch((value) => EE.left("file-system-move", value));
    },
    DENO: (fromPath, toPath) => Deno.rename(fromPath, toPath)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-move", value)),
});

export { move };
