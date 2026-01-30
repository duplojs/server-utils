import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readTextFile/index.md}
 */
const readTextFile = implementFunction("readTextFile", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.readFile(path, { encoding: "utf-8" })
            .then(E.success)
            .catch((value) => E.left("file-system-read-text-file", value));
    },
    DENO: (path) => Deno
        .readTextFile(path)
        .then(E.success)
        .catch((value) => E.left("file-system-read-text-file", value)),
    BUN: (path) => Bun.file(path)
        .text()
        .then(E.success)
        .catch((value) => E.left("file-system-read-text-file", value)),
});

export { readTextFile };
