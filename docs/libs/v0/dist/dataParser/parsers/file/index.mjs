import { detachObjectMethod } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import { createDataParserKind } from '../../kind.mjs';
import { createFileInterface, isFileInterface } from '../../../file/fileInterface.mjs';

const fileKind = createDataParserKind("file");
class DataParserFile extends DDP.DataParserBase.init(fileKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserFile);
    }
    static execParse(self, data, error) {
        let fileInterface = data;
        if (self.definition.coerce && typeof fileInterface === "string") {
            fileInterface = createFileInterface(fileInterface);
        }
        if (!isFileInterface(fileInterface)) {
            return DDP.addIssue(error, "file", data, self.definition.errorMessage);
        }
        return fileInterface;
    }
    static dataParserIsAsynchronous(self) {
        return false;
    }
    static prepareDefinition(definition) {
        return {
            ...definition,
            coerce: definition?.coerce ?? false,
            checkers: definition?.checkers ?? [],
            errorMessage: definition?.errorMessage,
        };
    }
    /**
     * {@include dataParser/file/index.md}
     */
    static create(definition) {
        return new DataParserFile(this.prepareDefinition(definition));
    }
}
const file = detachObjectMethod(DataParserFile, "create");

export { DataParserFile, file, fileKind };
