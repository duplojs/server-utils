import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/link/index.md}
 */
const link = implementFunction("link", {
    NODE: async (existingPath, newPath) => {
        const fs = await nodeFileSystem.value;
        return fs.link(existingPath, newPath)
            .then(EE.ok)
            .catch((value) => EE.left("file-system-link", value));
    },
    DENO: (existingPath, newPath) => Deno
        .link(existingPath, newPath)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-link", value)),
});

export { link };
