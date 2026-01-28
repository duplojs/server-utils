import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/ensureFile/index.md}
 */
const ensureFile = implementFunction("ensureFile", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.open(path, "a")
            .then((fh) => fh.close())
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path) => Deno.open(path, {
        write: true,
        create: true,
        append: true,
    })
        .then((fh) => void fh.close())
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { ensureFile };
