import { innerPipe, E, D } from '@duplojs/utils';
import { implementFunction, nodeFileSystem } from '../implementor.mjs';

function createStatInfoWithFsSource(source) {
    return {
        isFile: source.isFile(),
        isDirectory: source.isDirectory(),
        isSymlink: source.isSymbolicLink(),
        sizeBytes: source.size,
        modifiedAt: D.isSafeTimestamp(source.mtime.getTime()) ? D.createOrThrow(source.mtime) : null,
        accessedAt: D.isSafeTimestamp(source.atime.getTime()) ? D.createOrThrow(source.atime) : null,
        createdAt: D.isSafeTimestamp(source.birthtime.getTime()) ? D.createOrThrow(source.birthtime) : null,
        changedAt: D.isSafeTimestamp(source.ctime.getTime()) ? D.createOrThrow(source.ctime) : null,
        deviceId: source.dev,
        inode: source.ino,
        permissionsMode: source.mode,
        hardLinkCount: source.nlink,
        ownerUserId: source.uid,
        ownerGroupId: source.gid,
        specialDeviceId: source.rdev,
        ioBlockSize: source.blksize,
        allocatedBlockCount: source.blocks,
        isBlockDevice: source.isBlockDevice(),
        isCharacterDevice: source.isCharacterDevice(),
        isFifo: source.isFIFO(),
        isSocket: source.isSocket(),
    };
}
function createStatInfoWithDeno(source) {
    return {
        isFile: source.isFile,
        isDirectory: source.isDirectory,
        isSymlink: source.isSymlink,
        sizeBytes: source.size,
        modifiedAt: source.mtime
            && D.isSafeTimestamp(source.mtime.getTime())
            ? D.createOrThrow(source.mtime)
            : null,
        accessedAt: source.atime
            && D.isSafeTimestamp(source.atime.getTime())
            ? D.createOrThrow(source.atime)
            : null,
        createdAt: source.birthtime
            && D.isSafeTimestamp(source.birthtime.getTime())
            ? D.createOrThrow(source.birthtime)
            : null,
        changedAt: source.ctime
            && D.isSafeTimestamp(source.ctime.getTime())
            ? D.createOrThrow(source.ctime)
            : null,
        deviceId: source.dev,
        inode: source.ino,
        permissionsMode: source.mode,
        hardLinkCount: source.nlink,
        ownerUserId: source.uid,
        ownerGroupId: source.gid,
        specialDeviceId: source.rdev,
        ioBlockSize: source.blksize,
        allocatedBlockCount: source.blocks,
        isBlockDevice: source.isBlockDevice,
        isCharacterDevice: source.isCharDevice,
        isFifo: source.isFifo,
        isSocket: source.isSocket,
    };
}
/**
 * {@include file/stat/index.md}
 */
const stat = implementFunction("stat", {
    NODE: async (path) => {
        const fs = await nodeFileSystem.value;
        return fs.stat(path)
            .then(innerPipe(createStatInfoWithFsSource, E.success))
            .catch((value) => E.left("file-system", value));
    },
    DENO: (path) => Deno
        .stat(path)
        .then(innerPipe(createStatInfoWithDeno, E.success))
        .catch((value) => E.left("file-system", value)),
    BUN: (path) => Bun.file(path)
        .stat()
        .then(innerPipe(createStatInfoWithFsSource, E.success))
        .catch((value) => E.left("file-system", value)),
});

export { stat };
