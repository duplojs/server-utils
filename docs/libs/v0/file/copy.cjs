'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/copy/index.md}
 */
const copy = implementor.implementFunction("copy", {
    NODE: async (fromPath, toPath) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.cp(fromPath, toPath, { recursive: true })
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-copy", value));
    },
});

exports.copy = copy;
