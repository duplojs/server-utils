import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/copy/index.md}
 */
const copy = implementFunction("copy", {
    NODE: async (fromPath, toPath) => {
        const fs = await nodeFileSystem.value;
        return fs.cp(fromPath, toPath, { recursive: true })
            .then(EE.ok)
            .catch((value) => EE.left("file-system-copy", value));
    },
});

export { copy };
