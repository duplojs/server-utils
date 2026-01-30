import { Path, E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/relocate/index.md}
 */
const relocate = implementFunction("relocate", {
    NODE: async (fromPath, newParentPath) => {
        const fs = await nodeFileSystem.value;
        const baseName = Path.getBaseName(fromPath);
        if (!baseName) {
            return E.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`));
        }
        const newPath = Path.resolveRelative([newParentPath, baseName]);
        return fs.rename(fromPath, newPath)
            .then(() => E.success(newPath))
            .catch((value) => E.left("file-system-relocate", value));
    },
    DENO: (fromPath, newParentPath) => {
        const baseName = Path.getBaseName(fromPath);
        if (!baseName) {
            return Promise.resolve(E.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`)));
        }
        const newPath = Path.resolveRelative([newParentPath, baseName]);
        return Deno.rename(fromPath, newPath)
            .then(() => E.success(newPath))
            .catch((value) => E.left("file-system-relocate", value));
    },
});

export { relocate };
