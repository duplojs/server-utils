'use strict';

var utils = require('@duplojs/utils');
var EE = require('@duplojs/utils/either');
var DD = require('@duplojs/utils/date');
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
var DD__namespace = /*#__PURE__*/_interopNamespaceDefault(DD);

function createStatInfoWithFsSource(source) {
    return {
        isFile: source.isFile(),
        isDirectory: source.isDirectory(),
        isSymlink: source.isSymbolicLink(),
        sizeBytes: source.size,
        modifiedAt: DD__namespace.isSafeTimestamp(source.mtime.getTime()) ? DD__namespace.createOrThrow(source.mtime) : null,
        accessedAt: DD__namespace.isSafeTimestamp(source.atime.getTime()) ? DD__namespace.createOrThrow(source.atime) : null,
        createdAt: DD__namespace.isSafeTimestamp(source.birthtime.getTime()) ? DD__namespace.createOrThrow(source.birthtime) : null,
        changedAt: DD__namespace.isSafeTimestamp(source.ctime.getTime()) ? DD__namespace.createOrThrow(source.ctime) : null,
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
            && DD__namespace.isSafeTimestamp(source.mtime.getTime())
            ? DD__namespace.createOrThrow(source.mtime)
            : null,
        accessedAt: source.atime
            && DD__namespace.isSafeTimestamp(source.atime.getTime())
            ? DD__namespace.createOrThrow(source.atime)
            : null,
        createdAt: source.birthtime
            && DD__namespace.isSafeTimestamp(source.birthtime.getTime())
            ? DD__namespace.createOrThrow(source.birthtime)
            : null,
        changedAt: source.ctime
            && DD__namespace.isSafeTimestamp(source.ctime.getTime())
            ? DD__namespace.createOrThrow(source.ctime)
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
            .then(utils.innerPipe(createStatInfoWithFsSource, EE__namespace.success))
            .catch((value) => EE__namespace.left("file-system-link-stat", value));
    },
    DENO: (path) => Deno
        .lstat(path)
        .then(utils.innerPipe(createStatInfoWithDeno, EE__namespace.success))
        .catch((value) => EE__namespace.left("file-system-link-stat", value)),
});

exports.linkStat = linkStat;
