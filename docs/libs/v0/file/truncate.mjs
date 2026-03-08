import { pipe, when, instanceOf, E } from '@duplojs/utils';
import { implementFunction } from '../implementor.mjs';

/**
 * {@include file/truncate/index.md}
 */
const truncate = implementFunction("truncate", {
    NODE: async (path, size) => {
        const fs = await import('node:fs/promises');
        return fs.truncate(path, size)
            .then(E.ok)
            .catch((value) => E.left("file-system-truncate", value));
    },
    DENO: (path, size) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (stringPath) => Deno
        .truncate(stringPath, size)
        .then(E.ok)
        .catch((value) => E.left("file-system-truncate", value))),
});

export { truncate };
