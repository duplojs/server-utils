import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/appendFile/index.md}
 */
const appendFile = implementFunction("appendFile", {
    NODE: async (path, data) => {
        const fs = await nodeFileSystem.value;
        return fs.appendFile(path, data)
            .then(EE.ok)
            .catch((value) => EE.left("file-system-append-file", value));
    },
    DENO: (path, data) => Deno.writeFile(path, data, { append: true })
        .then(EE.ok)
        .catch((value) => EE.left("file-system-append-file", value)),
});

export { appendFile };
