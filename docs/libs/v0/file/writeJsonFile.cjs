'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/writeJsonFile/index.md}
 */
const writeJsonFile = implementor.implementFunction("writeJsonFile", {
    NODE: async (path, data, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return utils.pipe(utils.E.safeCallback(() => JSON.stringify(data, null, params?.space)), utils.E.whenIsRight((value) => fs.writeFile(path, value, { encoding: "utf-8" })
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system", value))), utils.E.whenIsLeft((value) => utils.E.left("file-system", value)));
    },
    DENO: (path, data, params) => utils.asyncPipe(utils.E.safeCallback(() => JSON.stringify(data, null, params?.space)), utils.E.whenIsRight((value) => Deno.writeTextFile(path, value)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value))), utils.E.whenIsLeft((value) => utils.E.left("file-system", value))),
    BUN: (path, data, params) => utils.asyncPipe(utils.E.safeCallback(() => JSON.stringify(data, null, params?.space)), utils.E.whenIsRight((value) => Bun.file(path)
        .write(value)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system", value))), utils.E.whenIsLeft((value) => utils.E.left("file-system", value))),
});

exports.writeJsonFile = writeJsonFile;
