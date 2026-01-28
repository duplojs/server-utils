'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/appendTextFile/index.md}
 */
const appendTextFile = implementor.implementFunction("appendTextFile", {
    NODE: async (path, data) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.appendFile(path, data)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path, data) => Deno.writeTextFile(path, data, { append: true })
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.appendTextFile = appendTextFile;
