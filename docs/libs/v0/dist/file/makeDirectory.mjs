import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/makeDirectory/index.md}
 */
const makeDirectory = implementFunction("makeDirectory", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.mkdir(path, {
            recursive: params?.recursive,
        })
            .then(EE.ok)
            .catch((value) => EE.left("file-system-make-directory", value));
    },
    DENO: (path, params) => Deno.mkdir(path, {
        recursive: params?.recursive,
    })
        .then(EE.ok)
        .catch((value) => EE.left("file-system-make-directory", value)),
});

export { makeDirectory };
