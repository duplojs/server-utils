import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/realPath/index.md}
 */
const realPath = implementFunction("realPath", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.realpath(path)
            .then(E.success)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path) => Deno
        .realPath(path)
        .then(E.success)
        .catch((value) => E.left("file-system", value)),
});

export { realPath };
