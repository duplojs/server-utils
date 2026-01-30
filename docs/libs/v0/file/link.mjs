import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/link/index.md}
 */
const link = implementFunction("link", {
    NODE: async (existingPath, newPath) => {
        const fs = await nodeFileSystem.value;
        return fs.link(existingPath, newPath)
            .then(E.ok)
            .catch((value) => E.left("file-system-link", value));
    },
    DENO: (existingPath, newPath) => Deno
        .link(existingPath, newPath)
        .then(E.ok)
        .catch((value) => E.left("file-system-link", value)),
});

export { link };
