import { E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/makeTemporaryDirectory/index.md}
 */
const makeTemporaryDirectory = implementFunction("makeTemporaryDirectory", {
    NODE: async (prefix) => {
        const fs = await nodeFileSystem.value;
        return fs.mkdtemp(prefix)
            .then(E.success)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (prefix) => Deno.makeTempDir({ prefix })
        .then(E.success)
        .catch((value) => E.left("file-system", value)),
});

export { makeTemporaryDirectory };
