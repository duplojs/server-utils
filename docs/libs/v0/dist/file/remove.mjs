import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/remove/index.md}
 */
const remove = implementFunction("remove", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.rm(path, {
            recursive: params?.recursive ?? false,
            force: true,
        })
            .then(EE.ok)
            .catch((value) => EE.left("file-system-remove", value));
    },
    DENO: (path, params) => Deno.remove(path, {
        recursive: params?.recursive,
    })
        .then(EE.ok)
        .catch((value) => EE.left("file-system-remove", value)),
});

export { remove };
