'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/ensureDirectory/index.md}
 */
const ensureDirectory = implementor.implementFunction("ensureDirectory", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.mkdir(path, {
            recursive: true,
        })
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path) => Deno.mkdir(path, {
        recursive: true,
    })
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.ensureDirectory = ensureDirectory;
