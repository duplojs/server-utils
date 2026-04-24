import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/readDirectory/index.md}
 */
const readDirectory = implementFunction("readDirectory", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.readdir(path, { recursive: params?.recursive })
            .then(EE.success)
            .catch((value) => EE.left("file-system-read-directory", value));
    },
});

export { readDirectory };
