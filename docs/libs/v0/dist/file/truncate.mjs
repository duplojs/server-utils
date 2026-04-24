import { pipe, when, instanceOf } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/truncate/index.md}
 */
const truncate = implementFunction("truncate", {
    NODE: async (path, size) => {
        const fs = await nodeFileSystem.value;
        return fs.truncate(path, size)
            .then(EE.ok)
            .catch((value) => EE.left("file-system-truncate", value));
    },
    DENO: (path, size) => pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (stringPath) => Deno
        .truncate(stringPath, size)
        .then(EE.ok)
        .catch((value) => EE.left("file-system-truncate", value))),
});

export { truncate };
