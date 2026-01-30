'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/readJsonFile/index.md}
 */
const readJsonFile = implementor.implementFunction("readJsonFile", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.readFile(path, { encoding: "utf-8" })
            .then(JSON.parse)
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system-read-json-file", value));
    },
    DENO: (path) => Deno.readTextFile(path)
        .then(JSON.parse)
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system-read-json-file", value)),
    BUN: (path) => Bun.file(path)
        .text()
        .then(JSON.parse)
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system-read-json-file", value)),
});

exports.readJsonFile = readJsonFile;
