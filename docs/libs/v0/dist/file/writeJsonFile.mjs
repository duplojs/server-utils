import { asyncPipe, pipe } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/writeJsonFile/index.md}
 */
const writeJsonFile = implementFunction("writeJsonFile", {
    NODE: async (path, data, params) => {
        const fs = await nodeFileSystem.value;
        return pipe(EE.safeCallback(() => JSON.stringify(data, null, params?.space)), EE.whenIsRight((value) => fs.writeFile(path, value, { encoding: "utf-8" })
            .then(EE.ok)
            .catch((value) => EE.left("file-system-write-json-file", value))), EE.whenIsLeft((value) => EE.left("file-system-write-json-file", value)));
    },
    DENO: (path, data, params) => asyncPipe(EE.safeCallback(() => JSON.stringify(data, null, params?.space)), EE.whenIsRight((value) => Deno.writeTextFile(path, value)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-write-json-file", value))), EE.whenIsLeft((value) => EE.left("file-system-write-json-file", value))),
    BUN: (path, data, params) => asyncPipe(EE.safeCallback(() => JSON.stringify(data, null, params?.space)), EE.whenIsRight((value) => Bun.file(path)
        .write(value)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-write-json-file", value))), EE.whenIsLeft((value) => EE.left("file-system-write-json-file", value))),
});

export { writeJsonFile };
