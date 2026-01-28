import { E, isType } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

function calculatePermissions(permissions) {
    if (!permissions) {
        return 0;
    }
    return (permissions.read ? 4 : 0)
        + (permissions.write ? 2 : 0)
        + (permissions.exec ? 1 : 0);
}
function toMode(mode) {
    if (isType(mode, "number")) {
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
const setMode = implementFunction("setMode", {
    NODE: async (path, mode) => {
        const fs = await nodeFileSystem.value;
        return fs.chmod(path, toMode(mode))
            .then(E.ok)
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path, mode) => Deno
        .chmod(path, toMode(mode))
        .then(E.ok)
        .catch((value) => E.left("file-system", value)),
});

export { setMode };
