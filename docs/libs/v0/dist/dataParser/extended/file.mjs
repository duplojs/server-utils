import { detachObjectMethod } from '@duplojs/utils';
import * as DDP from '@duplojs/utils/dataParser';
import { DataParserFile } from '../parsers/file/index.mjs';
import { checkerFileSize } from '../parsers/file/checkers/size.mjs';
import { checkerFileExist } from '../parsers/file/checkers/exist.mjs';
import { checkerFileMimeType } from '../parsers/file/checkers/mimeType.mjs';

class DataParserFileExtended extends DDP.DataParserBaseExtended.initExtended(DataParserFile) {
    get classConstructor() {
        return this.checkConstructor(DataParserFileExtended);
    }
    /**
     * {@include dataParserExtended/file/size/index.md}
     */
    size(input, definition) {
        return this.addChecker(checkerFileSize(input, definition));
    }
    /**
     * {@include dataParserExtended/file/exist/index.md}
     */
    exist(definition) {
        return this.addChecker(checkerFileExist(definition));
    }
    /**
     * {@include dataParserExtended/file/mimeType/index.md}
     */
    mimeType(mimeType, definition) {
        return this.addChecker(checkerFileMimeType(mimeType, definition));
    }
    /**
     * {@include dataParserExtended/file/index.md}
     */
    static create(definition) {
        return new DataParserFileExtended(this.prepareDefinition(definition));
    }
}
const file = detachObjectMethod(DataParserFileExtended, "create");

export { DataParserFileExtended, file };
