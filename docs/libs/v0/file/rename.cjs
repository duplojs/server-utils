'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

const parentFolderRegex = /^(.*?)\/+[^/]+\/*$/;
/**
 * {@include file/rename/index.md}
 */
const rename = implementor.implementFunction("rename", {
    NODE: async (path, newName) => {
        const fs = await implementor.nodeFileSystem.value;
        const parentPathResult = utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), utils.when(utils.S.endsWith("/"), utils.S.slice(0, -1)), utils.S.extract(parentFolderRegex));
        if (parentPathResult && utils.A.minElements(parentPathResult.groups, 1)) {
            return fs.rename(path, `${parentPathResult.groups[0]}/${newName}`)
                .then(utils.E.ok)
                .catch((value) => utils.E.left("file-system", value));
        }
        return utils.E.left("file-system", new Error("Invalid path"));
    },
    DENO: async (path, newName) => {
        const parentPathResult = utils.pipe(path, utils.when(utils.instanceOf(URL), ({ pathname }) => decodeURIComponent(pathname)), utils.when(utils.S.endsWith("/"), utils.S.slice(0, -1)), utils.S.extract(parentFolderRegex));
        if (parentPathResult && utils.A.minElements(parentPathResult.groups, 1)) {
            return Deno.rename(path, `${parentPathResult.groups[0]}/${newName}`)
                .then(utils.E.ok)
                .catch((value) => utils.E.left("file-system", value));
        }
        return utils.E.left("file-system", new Error("Invalid path"));
    },
});

exports.rename = rename;
