import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readLink/index.md}
 */
const readLink = implementFunction("readLink", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.readlink(path, { encoding: "utf-8" })
            .then(EE.success)
            .catch((value) => EE.left("file-system-read-link", value));
    },
    DENO: (path) => Deno
        .readLink(path)
        .then(EE.success)
        .catch((value) => EE.left("file-system-read-link", value)),
});

export { readLink };
