'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/writeTextFile/index.md}
 */
const writeTextFile = implementor.implementFunction("writeTextFile", {
    NODE: async (path, data) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.writeFile(path, data, { encoding: "utf-8" })
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path, data) => Deno
        .writeTextFile(path, data)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
    BUN: (path, data) => Bun
        .file(path)
        .write(data)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.writeTextFile = writeTextFile;
