import { innerPipe } from '@duplojs/utils';
import * as GG from '@duplojs/utils/generator';
import * as EE from '@duplojs/utils/either';
import * as PP from '@duplojs/utils/pattern';
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
            .then(innerPipe(GG.map(innerPipe(PP.when((dirent) => dirent.isFile(), ({ parentPath, name }) => createFileInterface(`${parentPath}/${name}`)), PP.when((dirent) => dirent.isDirectory(), ({ parentPath, name }) => createFolderInterface(`${parentPath}/${name}`)), PP.otherwise(({ parentPath, name }) => createUnknownInterface(`${parentPath}/${name}`)))), EE.success))
            .catch((value) => EE.left("file-system-walk-directory", value));
    },
});

export { walkDirectory };
