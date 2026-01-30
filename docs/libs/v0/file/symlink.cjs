'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/symlink/index.md}
 */
const symlink = implementor.implementFunction("symlink", {
    NODE: async (oldPath, newPath, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.symlink(oldPath, newPath, params?.type)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-symlink", value));
    },
    DENO: (oldPath, newPath, params) => Deno
        .symlink(oldPath, newPath, params)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-symlink", value)),
});

exports.symlink = symlink;
