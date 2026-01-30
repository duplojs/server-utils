'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/link/index.md}
 */
const link = implementor.implementFunction("link", {
    NODE: async (existingPath, newPath) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.link(existingPath, newPath)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-link", value));
    },
    DENO: (existingPath, newPath) => Deno
        .link(existingPath, newPath)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-link", value)),
});

exports.link = link;
