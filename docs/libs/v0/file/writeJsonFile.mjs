import { asyncPipe, E, pipe } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/writeJsonFile/index.md}
 */
const writeJsonFile = implementFunction("writeJsonFile", {
    NODE: async (path, data, params) => {
        const fs = await nodeFileSystem.value;
        return pipe(E.safeCallback(() => JSON.stringify(data, null, params?.space)), E.whenIsRight((value) => fs.writeFile(path, value, { encoding: "utf-8" })
            .then(E.ok)
            .catch((value) => E.left("file-system-write-json-file", value))), E.whenIsLeft((value) => E.left("file-system-write-json-file", value)));
    },
    DENO: (path, data, params) => asyncPipe(E.safeCallback(() => JSON.stringify(data, null, params?.space)), E.whenIsRight((value) => Deno.writeTextFile(path, value)
        .then(E.ok)
        .catch((value) => E.left("file-system-write-json-file", value))), E.whenIsLeft((value) => E.left("file-system-write-json-file", value))),
    BUN: (path, data, params) => asyncPipe(E.safeCallback(() => JSON.stringify(data, null, params?.space)), E.whenIsRight((value) => Bun.file(path)
        .write(value)
        .then(E.ok)
        .catch((value) => E.left("file-system-write-json-file", value))), E.whenIsLeft((value) => E.left("file-system-write-json-file", value))),
});

export { writeJsonFile };
