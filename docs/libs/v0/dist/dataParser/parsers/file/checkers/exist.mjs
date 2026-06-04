import { detachObjectMethod, callThen, unwrap } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import * as EE from '@duplojs/utils/either';
import { createDataParserKind } from '../../../kind.mjs';

const checkerFileExistKind = createDataParserKind("checker-file-exist");
class DataParserCheckerFileExist extends DDP.DataParserCheckerBase.init(checkerFileExistKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserCheckerFileExist);
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
            return value;
        });
    }
    /**
     * {@include dataParser/file/checkers/exist/index.md}
     */
    static create(definition = {}) {
        return new DataParserCheckerFileExist(definition);
    }
}
const checkerFileExist = detachObjectMethod(DataParserCheckerFileExist, "create");

export { DataParserCheckerFileExist, checkerFileExist, checkerFileExistKind };
