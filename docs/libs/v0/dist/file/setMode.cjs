'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var implementor = require('../implementor.cjs');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

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
            .then(EE__namespace.ok)
            .catch((value) => EE__namespace.left("file-system-set-mode", value));
    },
    DENO: (path, mode) => Deno
        .chmod(path, toMode(mode))
        .then(EE__namespace.ok)
        .catch((value) => EE__namespace.left("file-system-set-mode", value)),
});

exports.setMode = setMode;
