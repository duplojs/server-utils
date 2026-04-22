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
                return DP.addIssue(error, "async data parser", data, self.definition.errorMessage);
            }
            let fileInterface = data;
            if (self.definition.coerce && typeof fileInterface === "string") {
                fileInterface = createFileInterface(fileInterface);
            }
            if (!isFileInterface(fileInterface)) {
                return DP.addIssue(error, "file", data, self.definition.errorMessage);
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface.getMimeType() ?? "")) {
                return DP.addIssue(error, `file with mime type matching ${self.definition.mimeType.source}`, data, "Wrong mimeType.");
            }
            return fileInterface;
        },
        async: async (data, error, self) => {
            let fileInterface = data;
            if (self.definition.coerce && typeof fileInterface === "string") {
                fileInterface = createFileInterface(fileInterface);
            }
            if (!isFileInterface(fileInterface)) {
                return DP.addIssue(error, "file", data, self.definition.errorMessage);
            }
            if (self.definition.mimeType
                && !self
                    .definition
                    .mimeType
                    .test(fileInterface.getMimeType() ?? "")) {
                return DP.addIssue(error, `file with mime type matching ${self.definition.mimeType.source}`, fileInterface, "Wrong mimeType.");
            }
            if (self.definition.checkExist
                || self.definition.maxSize !== undefined
                || self.definition.minSize !== undefined) {
                const resultStats = await fileInterface.stat();
                if (E.isLeft(resultStats)) {
                    return DP.addIssue(error, "existing file", fileInterface, "File not exist.");
                }
                const stat = unwrap(resultStats);
                if (!stat.isFile) {
                    return DP.addIssue(error, "file", stat, "Is not file.");
                }
                if (self.definition.maxSize !== undefined
                    && stat.sizeBytes > self.definition.maxSize) {
                    return DP.addIssue(error, `file with sizeBytes <= ${self.definition.maxSize}`, stat.sizeBytes, "File is to large.");
                }
                if (self.definition.minSize !== undefined
                    && stat.sizeBytes < self.definition.minSize) {
                    return DP.addIssue(error, `file with sizeBytes >= ${self.definition.minSize}`, stat.sizeBytes, "File is to small.");
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
