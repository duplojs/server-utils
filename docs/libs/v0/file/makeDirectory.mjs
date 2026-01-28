import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/makeDirectory/index.md}
 */
const makeDirectory = implementFunction("makeDirectory", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.mkdir(path, {
            recursive: params?.recursive,
        })
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, params) => Deno.mkdir(path, {
        recursive: params?.recursive,
    })
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { makeDirectory };
