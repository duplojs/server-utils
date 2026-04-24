import * as EE from '@duplojs/utils/either';
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
            .then(EE.ok)
            .catch((value) => EE.left("file-system-ensure-directory", value));
    },
    DENO: (path) => Deno.mkdir(path, {
        recursive: true,
    })
        .then(EE.ok)
        .catch((value) => EE.left("file-system-ensure-directory", value)),
});

export { ensureDirectory };
