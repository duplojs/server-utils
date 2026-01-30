import { Path, E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

/**
 * {@include file/rename/index.md}
 */
const rename = implementFunction("rename", {
    NODE: async (path, newName) => {
        const fs = await nodeFileSystem.value;
        const parentPath = Path.getParentFolderPath(path);
        if (!parentPath) {
            return E.left("file-system-rename", new Error(`Invalid parent path ${parentPath}.`));
        }
        if (newName.includes("/")) {
            return E.left("file-system-rename", new Error(`Invalid new name ${newName}.`));
        }
        const newPath = Path.resolveRelative([parentPath, newName]);
        return fs.rename(path, newPath)
            .then(() => E.success(newPath))
            .catch((value) => E.left("file-system-rename", value));
    },
    DENO: (path, newName) => {
        const parentPath = Path.getParentFolderPath(path);
        if (!parentPath) {
            return Promise.resolve(E.left("file-system-rename", new Error(`Invalid parent path ${parentPath}.`)));
        }
        if (newName.includes("/")) {
            return Promise.resolve(E.left("file-system-rename", new Error(`Invalid new name ${newName}.`)));
        }
        const newPath = Path.resolveRelative([parentPath, newName]);
        return Deno.rename(path, newPath)
            .then(() => E.success(newPath))
            .catch((value) => E.left("file-system-rename", value));
    },
});

export { rename };
