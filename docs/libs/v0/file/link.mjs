import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/link/index.md}
 */
const link = implementFunction("link", {
    NODE: async (existingPath, newPath) => {
        const fs = await import('node:fs/promises');
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
