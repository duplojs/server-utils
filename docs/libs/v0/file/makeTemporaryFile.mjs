import { Path } from '@duplojs/utils';
import * as EE from '@duplojs/utils/either';
import { implementFunction, nodeFileSystem, nodeOs, nodeCrypto } from '../implementor.mjs';

/**
 * {@include file/makeTemporaryFile/index.md}
 */
const makeTemporaryFile = implementFunction("makeTemporaryFile", {
    NODE: async (prefix, suffix) => {
        const fs = await nodeFileSystem.value;
        const os = await nodeOs.value;
        const crypto = await nodeCrypto.value;
        const fileTemporaryPath = Path.resolveRelative([
            os.tmpdir(),
            `${prefix}${crypto.randomUUID()}${suffix ?? ""}`,
        ]);
        return fs.open(fileTemporaryPath, "wx")
            .then((fh) => fh.close())
            .then(() => EE.success(fileTemporaryPath))
            .catch((value) => EE.left("file-system-make-temporary-file", value));
    },
    DENO: (prefix, suffix) => Deno.makeTempFile({
        prefix,
        suffix,
    })
        .then(EE.success)
        .catch((value) => EE.left("file-system-make-temporary-file", value)),
});

export { makeTemporaryFile };
