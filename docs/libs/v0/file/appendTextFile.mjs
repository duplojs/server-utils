import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/appendTextFile/index.md}
 */
const appendTextFile = implementFunction("appendTextFile", {
    NODE: async (path, data) => {
        const fs = await nodeFileSystem.value;
        return fs.appendFile(path, data)
            .then(E.ok)
            .catch((value) => E.left("file-system-append-text-file", value));
    },
    DENO: (path, data) => Deno.writeTextFile(path, data, { append: true })
        .then(E.ok)
        .catch((value) => E.left("file-system-append-text-file", value)),
});

export { appendTextFile };
