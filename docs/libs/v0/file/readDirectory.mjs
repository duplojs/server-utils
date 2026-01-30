import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readDirectory/index.md}
 */
const readDirectory = implementFunction("readDirectory", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.readdir(path, { recursive: params?.recursive })
            .then(E.success)
            .catch((value) => E.left("file-system-read-directory", value));
    },
});

export { readDirectory };
