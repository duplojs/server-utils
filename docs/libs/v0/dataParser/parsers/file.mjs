import { DP, toRegExp, stringToBytes, E, unwrap, createOverride } from '@duplojs/utils';
import { createDataParserKind } from '../kind.mjs';
import { createFileInterface, isFileInterface } from '../../file/fileInterface.mjs';

const fileKind = createDataParserKind("file");
/**
 * {@include dataParser/file/index.md}
 */
function file(params, definition) {
    const self = DP.dataParserInit(fileKind, {
        errorMessage: definition?.errorMessage,
        checkers: definition?.checkers ?? [],
        coerce: definition?.coerce ?? false,
        checkExist: params?.checkExist ?? false,
        maxSize: params?.maxSize !== undefined
            ? stringToBytes(params.maxSize)
            : undefined,
        minSize: params?.minSize !== undefined
            ? stringToBytes(params.minSize)
            : undefined,
        mimeType: params?.mimeType
            ? toRegExp(params.mimeType)
            : undefined,
    }, {
        sync: (data, error, self) => {
            if (self.definition.checkExist
                || self.definition.maxSize !== undefined
                || self.definition.minSize !== undefined) {
                return DP.SymbolDataParserErrorPromiseIssue;
            }
            let fileInterface = data;
            if (self.definition.coerce && typeof fileInterface === "string") {
                fileInterface = createFileInterface(fileInterface);
            }
            if (!isFileInterface(fileInterface)) {
                return DP.SymbolDataParserErrorIssue;
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface.getMimeType() ?? "")) {
                DP.addIssue(error, self, data, "Wrong mimeType.");
                return DP.SymbolDataParserError;
            }
            return fileInterface;
        },
        async: async (data, error, self) => {
            let fileInterface = data;
            if (self.definition.coerce && typeof fileInterface === "string") {
                fileInterface = createFileInterface(fileInterface);
            }
            if (!isFileInterface(fileInterface)) {
                return DP.SymbolDataParserErrorIssue;
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface.getMimeType() ?? "")) {
                DP.addIssue(error, self, data, "Wrong mimeType.");
                return DP.SymbolDataParserError;
            }
            if (self.definition.checkExist
                || self.definition.maxSize !== undefined
                || self.definition.minSize !== undefined) {
                const resultStats = await fileInterface.stat();
                if (E.isLeft(resultStats)) {
                    DP.addIssue(error, self, data, "File not exist.");
                    return DP.SymbolDataParserError;
                }
                const stat = unwrap(resultStats);
                if (!stat.isFile) {
                    DP.addIssue(error, self, data, "Is not file.");
                    return DP.SymbolDataParserError;
                }
                if (self.definition.maxSize !== undefined
                    && stat.sizeBytes > self.definition.maxSize) {
                    DP.addIssue(error, self, data, "File is to large.");
                    return DP.SymbolDataParserError;
                }
                if (self.definition.minSize !== undefined
                    && stat.sizeBytes < self.definition.minSize) {
                    DP.addIssue(error, self, data, "File is to small.");
                    return DP.SymbolDataParserError;
                }
            }
            return fileInterface;
        },
        isAsynchronous: (self) => self.definition.checkExist
            || self.definition.maxSize !== undefined
            || self.definition.minSize !== undefined,
    }, file.overrideHandler);
    return self;
}
file.overrideHandler = createOverride("@duplojs/server-utils/data-parser/file");

export { file, fileKind };
