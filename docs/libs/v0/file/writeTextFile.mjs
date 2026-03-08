import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/writeTextFile/index.md}
 */
const writeTextFile = implementFunction("writeTextFile", {
    NODE: async (path, data) => {
        const fs = await import('node:fs/promises');
        return fs.writeFile(path, data, { encoding: "utf-8" })
            .then(E.ok)
            .catch((value) => E.left("file-system-write-text-file", value));
    },
    DENO: (path, data) => Deno
        .writeTextFile(path, data)
        .then(E.ok)
        .catch((value) => E.left("file-system-write-text-file", value)),
    BUN: (path, data) => Bun
        .file(path)
        .write(data)
        .then(E.ok)
        .catch((value) => E.left("file-system-write-text-file", value)),
});

export { writeTextFile };
