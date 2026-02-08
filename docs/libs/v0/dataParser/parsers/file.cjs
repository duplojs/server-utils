'use strict';

var utils = require('@duplojs/utils');
var kind = require('../kind.cjs');
var fileInterface = require('../../file/fileInterface.cjs');

const fileKind = kind.createDataParserKind("file");
/**
 * {@include dataParser/file/index.md}
 */
function file(params, definition) {
    const self = utils.DP.dataParserInit(fileKind, {
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
                return utils.DP.SymbolDataParserErrorPromiseIssue;
            }
            let fileInterface$1 = data;
            if (self.definition.coerce && typeof fileInterface$1 === "string") {
                fileInterface$1 = fileInterface.createFileInterface(fileInterface$1);
            }
            if (!fileInterface.isFileInterface(fileInterface$1)) {
                return utils.DP.SymbolDataParserErrorIssue;
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface$1.getMimeType() ?? "")) {
                utils.DP.addIssue(error, self, data, "Wrong mimeType.");
                return utils.DP.SymbolDataParserError;
            }
            return fileInterface$1;
        },
        async: async (data, error, self) => {
            let fileInterface$1 = data;
            if (self.definition.coerce && typeof fileInterface$1 === "string") {
                fileInterface$1 = fileInterface.createFileInterface(fileInterface$1);
            }
            if (!fileInterface.isFileInterface(fileInterface$1)) {
                return utils.DP.SymbolDataParserErrorIssue;
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface$1.getMimeType() ?? "")) {
                utils.DP.addIssue(error, self, data, "Wrong mimeType.");
                return utils.DP.SymbolDataParserError;
            }
            if (self.definition.checkExist
                || self.definition.maxSize !== undefined
                || self.definition.minSize !== undefined) {
                const resultStats = await fileInterface$1.stat();
                if (utils.E.isLeft(resultStats)) {
                    utils.DP.addIssue(error, self, data, "File not exist.");
                    return utils.DP.SymbolDataParserError;
                }
                const stat = utils.unwrap(resultStats);
                if (!stat.isFile) {
                    utils.DP.addIssue(error, self, data, "Is not file.");
                    return utils.DP.SymbolDataParserError;
                }
                if (self.definition.maxSize !== undefined
                    && stat.sizeBytes > self.definition.maxSize) {
                    utils.DP.addIssue(error, self, data, "File is to large.");
                    return utils.DP.SymbolDataParserError;
                }
                if (self.definition.minSize !== undefined
                    && stat.sizeBytes < self.definition.minSize) {
                    utils.DP.addIssue(error, self, data, "File is to small.");
                    return utils.DP.SymbolDataParserError;
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
