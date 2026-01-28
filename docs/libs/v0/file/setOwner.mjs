import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/setOwner/index.md}
 */
const setOwner = implementFunction("setOwner", {
    NODE: async (path, { userId, groupId }) => {
        const fs = await nodeFileSystem.value;
        return fs.chown(path, userId, groupId)
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, { userId, groupId }) => Deno
        .chown(path, userId, groupId)
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { setOwner };
