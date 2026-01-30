'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/exists/index.md}
 */
const exists = implementor.implementFunction("exists", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.access(path)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-exists", value));
    },
    DENO: (path) => Deno
        .stat(path)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-exists", value)),
    BUN: (path) => Bun.file(path)
        .exists()
        .then((value) => value
        ? utils.E.ok()
        : utils.E.left("file-system-exists", new Error("Path does not exist")))
        .catch((value) => utils.E.left("file-system-exists", value)),
});

exports.exists = exists;
