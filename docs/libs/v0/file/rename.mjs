import { pipe, when, instanceOf, S, A, E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

const parentFolderRegex = /^(.*?)\/+[^/]+\/*$/;
/**
 * {@include file/rename/index.md}
 */
const rename = implementFunction("rename", {
    NODE: async (path, newName) => {
        const fs = await nodeFileSystem.value;
        const parentPathResult = pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), when(S.endsWith("/"), S.slice(0, -1)), S.extract(parentFolderRegex));
        if (parentPathResult && A.minElements(parentPathResult.groups, 1)) {
            return fs.rename(path, `${parentPathResult.groups[0]}/${newName}`)
                .then(E.ok)
                .catch((value) => E.left("file-system", value));
        }
        return E.left("file-system", new Error("Invalid path"));
    },
    DENO: async (path, newName) => {
        const parentPathResult = pipe(path, when(instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), when(S.endsWith("/"), S.slice(0, -1)), S.extract(parentFolderRegex));
        if (parentPathResult && A.minElements(parentPathResult.groups, 1)) {
            return Deno.rename(path, `${parentPathResult.groups[0]}/${newName}`)
                .then(E.ok)
                .catch((value) => E.left("file-system", value));
        }
        return E.left("file-system", new Error("Invalid path"));
    },
});

export { rename };
