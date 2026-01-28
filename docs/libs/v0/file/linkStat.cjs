'use strict';

var utils = require('@duplojs/utils');
var implementor = require('../implementor.cjs');

function createStatInfoWithFsSource(source) {
    return {
        isFile: source.isFile(),
        isDirectory: source.isDirectory(),
        isSymlink: source.isSymbolicLink(),
        sizeBytes: source.size,
        modifiedAt: utils.D.isSafeTimestamp(source.mtime.getTime()) ? utils.D.createOrThrow(source.mtime) : null,
        accessedAt: utils.D.isSafeTimestamp(source.atime.getTime()) ? utils.D.createOrThrow(source.atime) : null,
        createdAt: utils.D.isSafeTimestamp(source.birthtime.getTime()) ? utils.D.createOrThrow(source.birthtime) : null,
        changedAt: utils.D.isSafeTimestamp(source.ctime.getTime()) ? utils.D.createOrThrow(source.ctime) : null,
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
            && utils.D.isSafeTimestamp(source.mtime.getTime())
            ? utils.D.createOrThrow(source.mtime)
            : null,
        accessedAt: source.atime
            && utils.D.isSafeTimestamp(source.atime.getTime())
            ? utils.D.createOrThrow(source.atime)
            : null,
        createdAt: source.birthtime
            && utils.D.isSafeTimestamp(source.birthtime.getTime())
            ? utils.D.createOrThrow(source.birthtime)
            : null,
        changedAt: source.ctime
            && utils.D.isSafeTimestamp(source.ctime.getTime())
            ? utils.D.createOrThrow(source.ctime)
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
 * {@include file/linkStat/index.md}
 */
const linkStat = implementor.implementFunction("linkStat", {
    NODE: async (path) => {
        const fs = await implementor.nodeFileSystem.value;
        return fs.lstat(path)
            .then(utils.innerPipe(createStatInfoWithFsSource, utils.E.success))
            .catch((value) => utils.E.left("file-system", value));
    },
    DENO: (path) => Deno
        .lstat(path)
        .then(utils.innerPipe(createStatInfoWithDeno, utils.E.success))
        .catch((value) => utils.E.left("file-system", value)),
});

exports.linkStat = linkStat;
