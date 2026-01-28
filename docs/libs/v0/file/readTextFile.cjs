'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/readTextFile/index.md}
 */
const readTextFile = implementor.implementFunction("readTextFile", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readFile(path, { encoding: "utf-8" })
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path) => Deno
        .readTextFile(path)
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system", value)),
    BUN: (path) => Bun.file(path)
        .text()
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.readTextFile = readTextFile;
