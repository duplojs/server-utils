import { E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/makeTemporaryDirectory/index.md}
 */
const makeTemporaryDirectory = implementFunction("makeTemporaryDirectory", {
    NODE: async (prefix) => {
        const fs = await import('node:fs/promises');
        return fs.mkdtemp(prefix)
            .then(E.success)
            .catch((value) => E.left("file-system-make-temporary-directory", value));
    },
    DENO: (prefix) => Deno.makeTempDir({ prefix })
        .then(E.success)
        .catch((value) => E.left("file-system-make-temporary-directory", value)),
});

export { makeTemporaryDirectory };
