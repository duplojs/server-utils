'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/setTime/index.md}
 */
const setTime = implementor.implementFunction("setTime", {
    NODE: async (path, { accessTime, modifiedTime }) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.utimes(path, utils.D.toTimestamp(accessTime), utils.D.toTimestamp(modifiedTime))
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-set-time", value));
    },
    DENO: (path, { accessTime, modifiedTime }) => Deno
        .utime(path, utils.D.toTimestamp(accessTime), utils.D.toTimestamp(modifiedTime))
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-set-time", value)),
});

exports.setTime = setTime;
