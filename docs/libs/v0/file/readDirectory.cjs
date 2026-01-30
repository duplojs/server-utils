'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/readDirectory/index.md}
 */
const readDirectory = implementor.implementFunction("readDirectory", {
    NODE: async (path, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readdir(path, { recursive: params?.recursive })
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system-read-directory", value));
    },
});

exports.readDirectory = readDirectory;
