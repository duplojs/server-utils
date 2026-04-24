import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/setOwner/index.md}
 */
const setOwner = implementFunction("setOwner", {
    NODE: async (path, { userId, groupId }) => {
        const fs = await nodeFileSystem.value;
        return fs.chown(path, userId, groupId)
            .then(EE.ok)
            .catch((value) => EE.left("file-system-set-owner", value));
    },
    DENO: (path, { userId, groupId }) => Deno
        .chown(path, userId, groupId)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-set-owner", value)),
});

export { setOwner };
