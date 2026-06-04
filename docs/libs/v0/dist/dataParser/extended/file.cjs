'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var index = require('../parsers/file/index.cjs');
var size = require('../parsers/file/checkers/size.cjs');
var exist = require('../parsers/file/checkers/exist.cjs');
var mimeType = require('../parsers/file/checkers/mimeType.cjs');

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

class DataParserFileExtended extends DDP__namespace.DataParserBaseExtended.initExtended(index.DataParserFile) {
    get classConstructor() {
        return this.checkConstructor(DataParserFileExtended);
    }
    /**
     * {@include dataParserExtended/file/size/index.md}
     */
    size(input, definition) {
        return this.addChecker(size.checkerFileSize(input, definition));
    }
    /**
     * {@include dataParserExtended/file/exist/index.md}
     */
    exist(definition) {
        return this.addChecker(exist.checkerFileExist(definition));
    }
    /**
     * {@include dataParserExtended/file/mimeType/index.md}
     */
    mimeType(mimeType$1, definition) {
        return this.addChecker(mimeType.checkerFileMimeType(mimeType$1, definition));
    }
    /**
     * {@include dataParserExtended/file/index.md}
     */
    static create(definition) {
        return new DataParserFileExtended(this.prepareDefinition(definition));
    }
}
const file = utils.detachObjectMethod(DataParserFileExtended, "create");

exports.DataParserFileExtended = DataParserFileExtended;
exports.file = file;
