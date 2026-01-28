import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/writeFile/index.md}
 */
const writeFile = implementFunction("writeFile", {
    NODE: async (path, data) => {
        const fs = await nodeFileSystem.value;
        return fs.writeFile(path, data)
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, data) => Deno
        .writeFile(path, data)
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
    BUN: (path, data) => Bun
        .file(path)
        .write(data)
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { writeFile };
