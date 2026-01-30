'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/truncate/index.md}
 */
const truncate = implementor.implementFunction("truncate", {
    NODE: async (path, size) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.truncate(path, size)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-truncate", value));
    },
    DENO: (path, size) => utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), (stringPath) => Deno
        .truncate(stringPath, size)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-truncate", value))),
});

exports.truncate = truncate;
