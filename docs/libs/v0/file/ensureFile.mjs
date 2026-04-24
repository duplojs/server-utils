import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/ensureFile/index.md}
 */
const ensureFile = implementFunction("ensureFile", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.open(path, "a")
            .then((fh) => fh.close())
            .then(EE.ok)
            .catch((value) => EE.left("file-system-ensure-file", value));
    },
    DENO: (path) => Deno.open(path, {
        write: true,
        create: true,
        append: true,
    })
        .then((fh) => void fh.close())
        .then(EE.ok)
        .catch((value) => EE.left("file-system-ensure-file", value)),
});

export { ensureFile };
