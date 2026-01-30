import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readLink/index.md}
 */
const readLink = implementFunction("readLink", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.readlink(path, { encoding: "utf-8" })
            .then(E.success)
            .catch((value) => E.left("file-system-read-link", value));
    },
    DENO: (path) => Deno
        .readLink(path)
        .then(E.success)
        .catch((value) => E.left("file-system-read-link", value)),
});

export { readLink };
