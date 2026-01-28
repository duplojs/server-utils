'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/appendFile/index.md}
 */
const appendFile = implementor.implementFunction("appendFile", {
    NODE: async (path, data) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.appendFile(path, data)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path, data) => Deno.writeFile(path, data, { append: true })
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.appendFile = appendFile;
