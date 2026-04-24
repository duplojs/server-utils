'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var kind = require('../kind.cjs');
var fileInterface = require('../../file/fileInterface.cjs');

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

var DDP__namespace = /*#__PURE__*/_interopNamespaceDefault(DDP);
var EE__namespace = /*#__PURE__*/_interopNamespaceDefault(EE);

const fileKind = kind.createDataParserKind("file");
/**
 * {@include dataParser/file/index.md}
 */
function file(params, definition) {
    const self = DDP__namespace.dataParserInit(fileKind, {
        errorMessage: definition?.errorMessage,
        checkers: definition?.checkers ?? [],
        coerce: definition?.coerce ?? false,
        checkExist: params?.checkExist ?? false,
        maxSize: params?.maxSize !== undefined
            ? utils.stringToBytes(params.maxSize)
            : undefined,
        minSize: params?.minSize !== undefined
            ? utils.stringToBytes(params.minSize)
            : undefined,
        mimeType: params?.mimeType
            ? utils.toRegExp(params.mimeType)
            : undefined,
    }, {
        sync: (data, error, self) => {
            if (self.definition.checkExist
                || self.definition.maxSize !== undefined
                || self.definition.minSize !== undefined) {
                return DDP__namespace.addIssue(error, "async data parser", data, self.definition.errorMessage);
            }
            let fileInterface$1 = data;
            if (self.definition.coerce && typeof fileInterface$1 === "string") {
                fileInterface$1 = fileInterface.createFileInterface(fileInterface$1);
            }
            if (!fileInterface.isFileInterface(fileInterface$1)) {
                return DDP__namespace.addIssue(error, "file", data, self.definition.errorMessage);
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface$1.getMimeType() ?? "")) {
                return DDP__namespace.addIssue(error, `file with mime type matching ${self.definition.mimeType.source}`, data, "Wrong mimeType.");
            }
            return fileInterface$1;
        },
        async: async (data, error, self) => {
            let fileInterface$1 = data;
            if (self.definition.coerce && typeof fileInterface$1 === "string") {
                fileInterface$1 = fileInterface.createFileInterface(fileInterface$1);
            }
            if (!fileInterface.isFileInterface(fileInterface$1)) {
                return DDP__namespace.addIssue(error, "file", data, self.definition.errorMessage);
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface$1.getMimeType() ?? "")) {
                return DDP__namespace.addIssue(error, `file with mime type matching ${self.definition.mimeType.source}`, fileInterface$1, "Wrong mimeType.");
            }
            if (self.definition.checkExist
                || self.definition.maxSize !== undefined
                || self.definition.minSize !== undefined) {
                const resultStats = await fileInterface$1.stat();
                if (EE__namespace.isLeft(resultStats)) {
                    return DDP__namespace.addIssue(error, "existing file", fileInterface$1, "File not exist.");
                }
                const stat = utils.unwrap(resultStats);
                if (!stat.isFile) {
                    return DDP__namespace.addIssue(error, "file", stat, "Is not file.");
                }
                if (self.definition.maxSize !== undefined
                    && stat.sizeBytes > self.definition.maxSize) {
                    return DDP__namespace.addIssue(error, `file with sizeBytes <= ${self.definition.maxSize}`, stat.sizeBytes, "File is to large.");
                }
                if (self.definition.minSize !== undefined
                    && stat.sizeBytes < self.definition.minSize) {
                    return DDP__namespace.addIssue(error, `file with sizeBytes >= ${self.definition.minSize}`, stat.sizeBytes, "File is to small.");
                }
            }
            return fileInterface$1;
        },
        isAsynchronous: (self) => self.definition.checkExist
            || self.definition.maxSize !== undefined
            || self.definition.minSize !== undefined,
    }, file.overrideHandler);
    return self;
}
file.overrideHandler = utils.createOverride("@duplojs/server-utils/data-parser/file");

exports.file = file;
exports.fileKind = fileKind;
