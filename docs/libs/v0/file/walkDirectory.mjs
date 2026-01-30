import { innerPipe, G, P, E } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';
import { createFileInterface } from './fileInterface.mjs';
import { createFolderInterface } from './folderInterface.mjs';
import { createUnknownInterface } from './unknownInterface.mjs';

/**
 * {@include file/walkDirectory/index.md}
 */
const walkDirectory = implementFunction("walkDirectory", {
    NODE: async (path, params) => {
        const fs = await nodeFileSystem.value;
        return fs.readdir(path, {
            recursive: params?.recursive ?? false,
            withFileTypes: true,
        })
            .then(innerPipe(G.map(innerPipe(P.when((dirent) => dirent.isFile(), ({ parentPath, name }) => createFileInterface(`${parentPath}/${name}`)), P.when((dirent) => dirent.isDirectory(), ({ parentPath, name }) => createFolderInterface(`${parentPath}/${name}`)), P.otherwise(({ parentPath, name }) => createUnknownInterface(`${parentPath}/${name}`)))), E.success))
            .catch((value) => E.left("file-system-walk-directory", value));
    },
});

export { walkDirectory };
