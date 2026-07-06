'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
var EE = require('@duplojs/utils/either');
var kind = require('../../../kind.cjs');

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

const checkerFileSizeKind = kind.createDataParserKind("checker-file-size");
class DataParserCheckerFileSize extends DDP__namespace.DataParserCheckerBase.init(checkerFileSizeKind) {
    get classConstructor() {
        return this.checkConstructor(DataParserCheckerFileSize);
    }
    isAsynchronous() {
        return true;
    }
    static execCheck(value, error, self, dataParser) {
        return utils.callThen(value.stat(), (fileStatResult) => {
            if (EE__namespace.isLeft(fileStatResult)) {
                return DDP__namespace.addIssue(error, "existing file", value, self.definition.errorMessage ?? dataParser.definition.errorMessage, self);
            }
            const fileStat = utils.unwrap(fileStatResult);
            if (!fileStat.isFile) {
                return DDP__namespace.addIssue(error, "file", value, self.definition.errorMessage ?? dataParser.definition.errorMessage, self);
            }
            if (self.definition.max !== undefined
                && fileStat.sizeBytes > self.definition.max) {
                return DDP__namespace.addIssue(error, `file with sizeBytes <= ${self.definition.max}`, fileStat.sizeBytes, self.definition.errorMessage ?? dataParser.definition.errorMessage, self);
            }
            if (self.definition.min !== undefined
                && fileStat.sizeBytes < self.definition.min) {
                return DDP__namespace.addIssue(error, `file with sizeBytes >= ${self.definition.min}`, fileStat.sizeBytes, self.definition.errorMessage ?? dataParser.definition.errorMessage, self);
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
            min: input.min && utils.stringToBytes(input.min),
            max: input.max && utils.stringToBytes(input.max),
        });
    }
}
const checkerFileSize = utils.detachObjectMethod(DataParserCheckerFileSize, "create");

exports.DataParserCheckerFileSize = DataParserCheckerFileSize;
exports.checkerFileSize = checkerFileSize;
exports.checkerFileSizeKind = checkerFileSizeKind;
