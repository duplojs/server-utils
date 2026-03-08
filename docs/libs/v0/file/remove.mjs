import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/remove/index.md}
 */
const remove = implementFunction("remove", {
    NODE: async (path, params) => {
        const fs = await import('node:fs/promises');
        return fs.rm(path, {
            recursive: params?.recursive ?? false,
            force: true,
        })
            .then(E.ok)
            .catch((value) => E.left("file-system-remove", value));
    },
    DENO: (path, params) => Deno.remove(path, {
        recursive: params?.recursive,
    })
        .then(E.ok)
        .catch((value) => E.left("file-system-remove", value)),
});

export { remove };
