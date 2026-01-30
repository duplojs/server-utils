'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/makeTemporaryDirectory/index.md}
 */
const makeTemporaryDirectory = implementor.implementFunction("makeTemporaryDirectory", {
    NODE: async (prefix) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.mkdtemp(prefix)
            .then(utils.E.success)
            .catch((value) => utils.E.left("file-system-make-temporary-directory", value));
    },
    DENO: (prefix) => Deno.makeTempDir({ prefix })
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system-make-temporary-directory", value)),
});

exports.makeTemporaryDirectory = makeTemporaryDirectory;
