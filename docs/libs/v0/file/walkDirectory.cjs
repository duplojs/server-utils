'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');
var fileInterface = require('./fileInterface.cjs');
var folderInterface = require('./folderInterface.cjs');
var unknownInterface = require('./unknownInterface.cjs');

/**
 * {@include file/walkDirectory/index.md}
 */
const walkDirectory = implementor.implementFunction("walkDirectory", {
    NODE: async (path, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readdir(path, {
            recursive: params?.recursive ?? false,
            withFileTypes: true,
        })
            .then(utils.innerPipe(utils.G.map(utils.innerPipe(utils.P.when((dirent) => dirent.isFile(), ({ parentPath, name }) => fileInterface.createFileInterface(`${parentPath}/${name}`)), utils.P.when((dirent) => dirent.isDirectory(), ({ parentPath, name }) => folderInterface.createFolderInterface(`${parentPath}/${name}`)), utils.P.otherwise(({ parentPath, name }) => unknownInterface.createUnknownInterface(`${parentPath}/${name}`)))), utils.E.success))
            .catch((value) => utils.E.left("file-system-walk-directory", value));
    },
});

exports.walkDirectory = walkDirectory;
