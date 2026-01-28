import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/remove/index.md}
 */
const remove = implementFunction("remove", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.rm(path, {
            recursive: params?.recursive ?? false,
            force: true,
        })
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, params) => Deno.remove(path, {
        recursive: params?.recursive,
    })
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { remove };
