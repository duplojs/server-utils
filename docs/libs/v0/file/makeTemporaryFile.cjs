'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/makeTemporaryFile/index.md}
 */
const makeTemporaryFile = implementor.implementFunction("makeTemporaryFile", {
    NODE: async (prefix, suffix) => {
        const fs = await implementor.nodeFileSystem.value;
        const os = await implementor.nodeOs.value;
        const crypto = await implementor.nodeCrypto.value;
        const fileTemporaryPath = utils.Path.resolveRelative([
            os.tmpdir(),
            `${prefix}${crypto.randomUUID()}${suffix ?? ""}`,
        ]);
        return fs.open(fileTemporaryPath, "wx")
            .then((fh) => fh.close())
            .then(() => utils.E.success(fileTemporaryPath))
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (prefix, suffix) => Deno.makeTempFile({
        prefix,
        suffix,
    })
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system", value)),
});

exports.makeTemporaryFile = makeTemporaryFile;
