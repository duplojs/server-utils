import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/writeFile/index.md}
 */
const writeFile = implementFunction("writeFile", {
    NODE: async (path, data) => {
        const fs = await import('node:fs/promises');
        return fs.writeFile(path, data)
            .then(E.ok)
            .catch((value) => E.left("file-system-write-file", value));
    },
    DENO: (path, data) => Deno
        .writeFile(path, data)
        .then(E.ok)
        .catch((value) => E.left("file-system-write-file", value)),
    BUN: (path, data) => Bun
        .file(path)
        .write(data)
        .then(E.ok)
        .catch((value) => E.left("file-system-write-file", value)),
});

export { writeFile };
