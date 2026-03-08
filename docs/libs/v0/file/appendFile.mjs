import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/appendFile/index.md}
 */
const appendFile = implementFunction("appendFile", {
    NODE: async (path, data) => {
        const fs = await import('node:fs/promises');
        return fs.appendFile(path, data)
            .then(E.ok)
            .catch((value) => E.left("file-system-append-file", value));
    },
    DENO: (path, data) => Deno.writeFile(path, data, { append: true })
        .then(E.ok)
        .catch((value) => E.left("file-system-append-file", value)),
});

export { appendFile };
