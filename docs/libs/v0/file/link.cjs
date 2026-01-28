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
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (existingPath, newPath) => Deno
        .link(utils.instanceOf(existingPath, URL)
        ? decodeURIComponent(existingPath.pathname)
        : existingPath, utils.instanceOf(newPath, URL)
        ? decodeURIComponent(newPath.pathname)
        : newPath)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.link = link;
