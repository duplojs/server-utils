import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/copy/index.md}
 */
const copy = implementFunction("copy", {
    NODE: async (fromPath, toPath) => {
        const fs = await nodeFileSystem.value;
        return fs.cp(fromPath, toPath, { recursive: true })
            .then(E.ok)
            .catch((value) => E.left("file-system-copy", value));
    },
});

export { copy };
