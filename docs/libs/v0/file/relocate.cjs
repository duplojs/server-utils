'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/relocate/index.md}
 */
const relocate = implementor.implementFunction("relocate", {
    NODE: async (fromPath, newParentPath) => {
        const fs = await implementor.nodeFileSystem.value;
        const baseName = utils.Path.getBaseName(fromPath);
        if (!baseName) {
            return utils.E.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`));
        }
        const newPath = utils.Path.resolveRelative([newParentPath, baseName]);
        return fs.rename(fromPath, newPath)
            .then(() => utils.E.success(newPath))
            .catch((value) => utils.E.left("file-system-relocate", value));
    },
    DENO: (fromPath, newParentPath) => {
        const baseName = utils.Path.getBaseName(fromPath);
        if (!baseName) {
            return Promise.resolve(utils.E.left("file-system-relocate", new Error(`Invalid base name ${fromPath}`)));
        }
        const newPath = utils.Path.resolveRelative([newParentPath, baseName]);
        return Deno.rename(fromPath, newPath)
            .then(() => utils.E.success(newPath))
            .catch((value) => utils.E.left("file-system-relocate", value));
    },
});

exports.relocate = relocate;
