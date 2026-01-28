'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/readFile/index.md}
 */
const readFile = implementor.implementFunction("readFile", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readFile(path)
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path) => Deno
        .readFile(path)
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system", value)),
    BUN: (path) => Bun.file(path)
        .bytes()
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.readFile = readFile;
