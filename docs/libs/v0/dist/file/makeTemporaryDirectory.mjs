import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/makeTemporaryDirectory/index.md}
 */
const makeTemporaryDirectory = implementFunction("makeTemporaryDirectory", {
    NODE: async (prefix) => {
        const fs = await nodeFileSystem.value;
        return fs.mkdtemp(prefix)
            .then(EE.success)
            .catch((value) => EE.left("file-system-make-temporary-directory", value));
    },
    DENO: (prefix) => Deno.makeTempDir({ prefix })
        .then(EE.success)
        .catch((value) => EE.left("file-system-make-temporary-directory", value)),
});

export { makeTemporaryDirectory };
