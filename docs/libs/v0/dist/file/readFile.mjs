import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readFile/index.md}
 */
const readFile = implementFunction("readFile", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.readFile(path)
            .then(EE.success)
            .catch((value) => EE.left("file-system-read-file", value));
    },
    DENO: (path) => Deno
        .readFile(path)
        .then(EE.success)
        .catch((value) => EE.left("file-system-read-file", value)),
    BUN: (path) => Bun.file(path)
        .bytes()
        .then(EE.success)
        .catch((value) => EE.left("file-system-read-file", value)),
});

export { readFile };
