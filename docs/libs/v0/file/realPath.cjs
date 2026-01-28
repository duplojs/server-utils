'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/realPath/index.md}
 */
const realPath = implementor.implementFunction("realPath", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.realpath(path)
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path) => Deno
        .realPath(path)
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.realPath = realPath;
