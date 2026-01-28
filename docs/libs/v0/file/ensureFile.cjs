'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/ensureFile/index.md}
 */
const ensureFile = implementor.implementFunction("ensureFile", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.open(path, "a")
            .then((fh) => fh.close())
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path) => Deno.open(path, {
        write: true,
        create: true,
        append: true,
    })
        .then((fh) => void fh.close())
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.ensureFile = ensureFile;
