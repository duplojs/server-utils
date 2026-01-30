'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/readLink/index.md}
 */
const readLink = implementor.implementFunction("readLink", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readlink(path, { encoding: "utf-8" })
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system-read-link", value));
    },
    DENO: (path) => Deno
        .readLink(path)
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system-read-link", value)),
});

exports.readLink = readLink;
