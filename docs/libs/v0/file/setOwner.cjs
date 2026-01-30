'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/setOwner/index.md}
 */
const setOwner = implementor.implementFunction("setOwner", {
    NODE: async (path, { userId, groupId }) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.chown(path, userId, groupId)
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-set-owner", value));
    },
    DENO: (path, { userId, groupId }) => Deno
        .chown(path, userId, groupId)
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-set-owner", value)),
});

exports.setOwner = setOwner;
