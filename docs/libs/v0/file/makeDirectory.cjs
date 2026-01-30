'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/makeDirectory/index.md}
 */
const makeDirectory = implementor.implementFunction("makeDirectory", {
    NODE: async (path, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.mkdir(path, {
            recursive: params?.recursive,
        })
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-make-directory", value));
    },
    DENO: (path, params) => Deno.mkdir(path, {
        recursive: params?.recursive,
    })
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-make-directory", value)),
});

exports.makeDirectory = makeDirectory;
