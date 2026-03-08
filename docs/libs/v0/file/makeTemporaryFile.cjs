'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

/**
 * {@include file/makeTemporaryFile/index.md}
 */
const makeTemporaryFile = implementor.implementFunction("makeTemporaryFile", {
    NODE: async (prefix, suffix) => {
        const fs = await import('node:fs/promises');
        const os = await import('node:os');
        const crypto = await import('node:crypto');
        const fileTemporaryPath = utils.Path.resolveRelative([
            os.tmpdir(),
            `${prefix}${crypto.randomUUID()}${suffix ?? ""}`,
        ]);
        return fs.open(fileTemporaryPath, "wx")
            .then((fh) => fh.close())
            .then(() => utils.E.success(fileTemporaryPath))
            .catch((value) => utils.E.left("file-system-make-temporary-file", value));
    },
    DENO: (prefix, suffix) => Deno.makeTempFile({
        prefix,
        suffix,
    })
        .then(utils.E.success)
        .catch((value) => utils.E.left("file-system-make-temporary-file", value)),
});

exports.makeTemporaryFile = makeTemporaryFile;
