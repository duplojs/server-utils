import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readFile/index.md}
 */
const readFile = implementFunction("readFile", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.readFile(path)
            .then(E.success)
            .catch((value) => E.left("file-system-read-file", value));
    },
    DENO: (path) => Deno
        .readFile(path)
        .then(E.success)
        .catch((value) => E.left("file-system-read-file", value)),
    BUN: (path) => Bun.file(path)
        .bytes()
        .then(E.success)
        .catch((value) => E.left("file-system-read-file", value)),
});

export { readFile };
