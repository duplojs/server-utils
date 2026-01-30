import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readJsonFile/index.md}
 */
const readJsonFile = implementFunction("readJsonFile", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.readFile(path, { encoding: "utf-8" })
            .then(JSON.parse)
            .then(E.success)
            .catch((value) => E.left("file-system-read-json-file", value));
    },
    DENO: (path) => Deno.readTextFile(path)
        .then(JSON.parse)
        .then(E.success)
        .catch((value) => E.left("file-system-read-json-file", value)),
    BUN: (path) => Bun.file(path)
        .text()
        .then(JSON.parse)
        .then(E.success)
        .catch((value) => E.left("file-system-read-json-file", value)),
});

export { readJsonFile };
