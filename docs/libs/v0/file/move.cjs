'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/move/index.md}
 */
const move = implementor.implementFunction("move", {
    NODE: async (fromPath, toPath) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.rename(fromPath, toPath)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-move", value));
    },
    DENO: (fromPath, toPath) => Deno.rename(fromPath, toPath)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-move", value)),
});

exports.move = move;
