import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/ensureFile/index.md}
 */
const ensureFile = implementFunction("ensureFile", {
    NODE: async (path) => {
        const fs = await import('node:fs/promises');
        return fs.open(path, "a")
            .then((fh) => fh.close())
            .then(E.ok)
            .catch((value) => E.left("file-system-ensure-file", value));
    },
    DENO: (path) => Deno.open(path, {
        write: true,
        create: true,
        append: true,
    })
        .then((fh) => void fh.close())
        .then(E.ok)
        .catch((value) => E.left("file-system-ensure-file", value)),
});

export { ensureFile };
