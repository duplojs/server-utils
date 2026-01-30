'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

function calculatePermissions(permissions) {
    if (!permissions) {
        return 0;
    }
    return (permissions.read ? 4 : 0)
        + (permissions.write ? 2 : 0)
        + (permissions.exec ? 1 : 0);
}
function toMode(mode) {
    if (utils.isType(mode, "number")) {
        return mode;
    }
    const special = (mode.setUserId ? 4 : 0)
        + (mode.setGroupId ? 2 : 0)
        + (mode.sticky ? 1 : 0);
    const user = calculatePermissions(mode.user);
    const group = calculatePermissions(mode.group);
    const other = calculatePermissions(mode.other);
    return (special * 512) + (user * 64) + (group * 8) + other;
}
/**
 * {@include file/setMode/index.md}
 */
const setMode = implementor.implementFunction("setMode", {
    NODE: async (path, mode) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.chmod(path, toMode(mode))
            .then(utils.E.ok)
            .catch((value) => utils.E.left("file-system-set-mode", value));
    },
    DENO: (path, mode) => Deno
        .chmod(path, toMode(mode))
        .then(utils.E.ok)
        .catch((value) => utils.E.left("file-system-set-mode", value)),
});

exports.setMode = setMode;
