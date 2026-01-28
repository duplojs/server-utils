import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/exists/index.md}
 */
const exists = implementFunction("exists", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.access(path)
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path) => Deno
        .stat(path)
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
    BUN: (path) => Bun.file(path)
        .exists()
        .then((value) => value
        ? E.ok()
        : E.left("file-system", new Error("Path does not exist")))
        .catch((value) => E.left("file-system", value)),
});

export { exists };
