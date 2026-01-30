'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/rename/index.md}
 */
const rename = implementor.implementFunction("rename", {
    NODE: async (path, newName) => {
        const fs = await implementor.nodeFileSystem.value;
        const parentPath = utils.Path.getParentFolderPath(path);
        if (!parentPath) {
            return utils.E.left("file-system-rename", new Error(`Invalid parent path ${parentPath}.`));
        }
        if (newName.includes("/")) {
            return utils.E.left("file-system-rename", new Error(`Invalid new name ${newName}.`));
        }
        const newPath = utils.Path.resolveRelative([parentPath, newName]);
        return fs.rename(path, newPath)
            .then(() => utils.E.success(newPath))
            .catch((value) => utils.E.left("file-system-rename", value));
    },
    DENO: (path, newName) => {
        const parentPath = utils.Path.getParentFolderPath(path);
        if (!parentPath) {
            return Promise.resolve(utils.E.left("file-system-rename", new Error(`Invalid parent path ${parentPath}.`)));
        }
        if (newName.includes("/")) {
            return Promise.resolve(utils.E.left("file-system-rename", new Error(`Invalid new name ${newName}.`)));
        }
        const newPath = utils.Path.resolveRelative([parentPath, newName]);
        return Deno.rename(path, newPath)
            .then(() => utils.E.success(newPath))
            .catch((value) => utils.E.left("file-system-rename", value));
    },
});

exports.rename = rename;
