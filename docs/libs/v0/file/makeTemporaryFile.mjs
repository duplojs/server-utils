import { E, Path } from '@duplojs/utils';
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
            .then(() => E.success(fileTemporaryPath))
            .catch((value) => E.left("file-system", value));
    },
    DENO: (prefix, suffix) => Deno.makeTempFile({
        prefix,
        suffix,
    })
        .then(E.success)
        .catch((value) => E.left("file-system", value)),
});

export { makeTemporaryFile };
