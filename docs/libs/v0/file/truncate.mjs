import { pipe, when, instanceOf, E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/truncate/index.md}
 */
const truncate = implementFunction("truncate", {
    NODE: async (path, size) => {
        const fs = await nodeFileSystem.value;
        return fs.truncate(path, size)
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, size) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (stringPath) => Deno
        .truncate(stringPath, size)
        .then(E.ok)
        .catch((value) => E.left("file-system", value))),
});

export { truncate };
