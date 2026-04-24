import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/realPath/index.md}
 */
const realPath = implementFunction("realPath", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.realpath(path)
            .then(EE.success)
            .catch((value) => EE.left("file-system-real-path", value));
    },
    DENO: (path) => Deno
        .realPath(path)
        .then(EE.success)
        .catch((value) => EE.left("file-system-real-path", value)),
});

export { realPath };
