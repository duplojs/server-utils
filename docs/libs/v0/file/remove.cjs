'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/remove/index.md}
 */
const remove = implementor.implementFunction("remove", {
    NODE: async (path, params) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.rm(path, {
            recursive: params?.recursive ?? false,
            force: true,
        })
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-remove", value));
    },
    DENO: (path, params) => Deno.remove(path, {
        recursive: params?.recursive,
    })
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-remove", value)),
});

exports.remove = remove;
