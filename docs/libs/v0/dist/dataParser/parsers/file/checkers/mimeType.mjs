import { detachObjectMethod, toRegExp } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import { createDataParserKind } from '../../../kind.mjs';

const checkerFileMimeTypeKind = createDataParserKind("checker-file-mime-type");
class DataParserCheckerFileMimeType extends DDP.DataParserCheckerBase.init(checkerFileMimeTypeKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserCheckerFileMimeType);
    }
    isAsynchronous() {
        return false;
    }
    static execCheck(value, error, self, dataParser) {
        if (self.definition.mimeType
            && !self
                .definition
                .mimeType
                .test(value.getMimeType() ?? "")) {
            return DDP.addIssue(error, `file with mime type matching ${self.definition.mimeType.source}`, value, self.definition.errorMessage ?? dataParser.definition.errorMessage);
        }
        return value;
    }
    /**
     * {@include dataParser/file/checkers/mimeType/index.md}
     */
    static create(mimeType, definition = {}) {
        return new DataParserCheckerFileMimeType({
            ...definition,
            mimeType: toRegExp(mimeType),
        });
    }
}
const checkerFileMimeType = detachObjectMethod(DataParserCheckerFileMimeType, "create");

export { DataParserCheckerFileMimeType, checkerFileMimeType, checkerFileMimeTypeKind };
