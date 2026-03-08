import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/makeDirectory/index.md}
 */
const makeDirectory = implementFunction("makeDirectory", {
    NODE: async (path, params) => {
        const fs = await import('node:fs/promises');
        return fs.mkdir(path, {
            recursive: params?.recursive,
        })
            .then(E.ok)
            .catch((value) => E.left("file-system-make-directory", value));
    },
    DENO: (path, params) => Deno.mkdir(path, {
        recursive: params?.recursive,
    })
        .then(E.ok)
        .catch((value) => E.left("file-system-make-directory", value)),
});

export { makeDirectory };
