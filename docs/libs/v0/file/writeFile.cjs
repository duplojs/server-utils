'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/writeFile/index.md}
 */
const writeFile = implementor.implementFunction("writeFile", {
    NODE: async (path, data) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.writeFile(path, data)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-write-file", value));
    },
    DENO: (path, data) => Deno
        .writeFile(path, data)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-write-file", value)),
    BUN: (path, data) => Bun
        .file(path)
        .write(data)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-write-file", value)),
});

exports.writeFile = writeFile;
