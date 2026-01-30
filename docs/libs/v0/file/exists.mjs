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
            .catch((value) => E.left("file-system-exists", value));
    },
    DENO: (path) => Deno
        .stat(path)
        .then(E.ok)
        .catch((value) => E.left("file-system-exists", value)),
    BUN: (path) => Bun.file(path)
        .exists()
        .then((value) => value
        ? E.ok()
        : E.left("file-system-exists", new Error("Path does not exist")))
        .catch((value) => E.left("file-system-exists", value)),
});

export { exists };
