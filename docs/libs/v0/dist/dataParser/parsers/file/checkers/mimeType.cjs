'use strict';

var utils = require('@duplojs/utils');
var DDP = require('@duplojs/utils/dataParser');
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

const checkerFileMimeTypeKind = kind.createDataParserKind("checker-file-mime-type");
class DataParserCheckerFileMimeType extends DDP__namespace.DataParserCheckerBase.init(checkerFileMimeTypeKind) {
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
            return DDP__namespace.addIssue(error, `file with mime type matching ${self.definition.mimeType.source}`, value, self.definition.errorMessage ?? dataParser.definition.errorMessage);
        }
        return value;
    }
    /**
     * {@include dataParser/file/checkers/mimeType/index.md}
     */
    static create(mimeType, definition = {}) {
        return new DataParserCheckerFileMimeType({
            ...definition,
            mimeType,
        });
    }
}
const checkerFileMimeType = utils.detachObjectMethod(DataParserCheckerFileMimeType, "create");

exports.DataParserCheckerFileMimeType = DataParserCheckerFileMimeType;
exports.checkerFileMimeType = checkerFileMimeType;
exports.checkerFileMimeTypeKind = checkerFileMimeTypeKind;
