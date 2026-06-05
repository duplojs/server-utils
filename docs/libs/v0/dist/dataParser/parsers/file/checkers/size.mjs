import { detachObjectMethod, callThen, unwrap, stringToBytes } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import { createDataParserKind } from '../../../kind.mjs';

const checkerFileSizeKind = createDataParserKind("checker-file-size");
class DataParserCheckerFileSize extends DDP.DataParserCheckerBase.init(checkerFileSizeKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserCheckerFileSize);
    }
    isAsynchronous() {
        return true;
    }
    static execCheck(value, error, self, dataParser) {
        return callThen(value.stat(), (fileStatResult) => {
            if (EE.isLeft(fileStatResult)) {
                return DDP.addIssue(error, "existing file", value, self.definition.errorMessage ?? dataParser.definition.errorMessage);
            }
            const fileStat = unwrap(fileStatResult);
            if (!fileStat.isFile) {
                return DDP.addIssue(error, "file", value, self.definition.errorMessage ?? dataParser.definition.errorMessage);
            }
            if (self.definition.max !== undefined
                && fileStat.sizeBytes > self.definition.max) {
                return DDP.addIssue(error, `file with sizeBytes <= ${self.definition.max}`, fileStat.sizeBytes, self.definition.errorMessage ?? dataParser.definition.errorMessage);
            }
            if (self.definition.min !== undefined
                && fileStat.sizeBytes < self.definition.min) {
                return DDP.addIssue(error, `file with sizeBytes >= ${self.definition.min}`, fileStat.sizeBytes, self.definition.errorMessage ?? dataParser.definition.errorMessage);
            }
            return value;
        });
    }
    /**
     * {@include dataParser/file/checkers/size/index.md}
     */
    static create(input, definition = {}) {
        return new DataParserCheckerFileSize({
            ...definition,
            min: input.min && stringToBytes(input.min),
            max: input.max && stringToBytes(input.max),
        });
    }
}
const checkerFileSize = detachObjectMethod(DataParserCheckerFileSize, "create");

export { DataParserCheckerFileSize, checkerFileSize, checkerFileSizeKind };
