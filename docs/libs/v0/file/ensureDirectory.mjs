import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/ensureDirectory/index.md}
 */
const ensureDirectory = implementFunction("ensureDirectory", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.mkdir(path, {
            recursive: true,
        })
            .then(E.ok)
            .catch((value) => E.left("file-system-ensure-directory", value));
    },
    DENO: (path) => Deno.mkdir(path, {
        recursive: true,
    })
        .then(E.ok)
        .catch((value) => E.left("file-system-ensure-directory", value)),
});

export { ensureDirectory };
